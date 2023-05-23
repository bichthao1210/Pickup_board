/*version=1.15*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

/**
* TWPS グラフ
*/
/* 機能： twpsグラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
*/

var twps_graph_exist = false;
var twps_graph_type = false;

//グラフ用の時間配
var twps_graph_time_W = [];
var twps_graph_time_Wh = [];
var twps_graph_date;
var twps_graph_dat_num;
//DIグラフ用のデータ配
var twps_graph_data_W = [];
var twps_graph_data_Wh = [];

//TWPSのチャート用定義
var twps_chart_W;
var twps_chart_Wh;

const TWPS_TITLE_ = "title_";
const TWPS_GRAPHH_ = "graphH_";
const TWPS_GRAPHL_ = "graphL_";
const TWPS_ALARMH_ = "alarmH_";
const TWPS_ALARML_ = "alarmL_";
const TWPS_ALARMHE_ = "alarmHE_";
const TWPS_ALARMLE_ = "alarmLE_";
const TWPS_CLALARMH_ = "ClAlarmH_";
const TWPS_CLALARML_ = "ClAlarmL_";

/**
 * TWPSのグラフデータを取得、更新する
 */
function twps_get_graph_data(obj, setdata) {

    // Leave if setting data still not come
    if (setdata.setting == null) {
        return
    }

    // Graph date
    twps_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        twps_graph_time_W.length = 0;
        twps_graph_time_Wh.length = 0;

        twps_graph_data_W.length = 0;
        twps_graph_data_Wh.length = 0;

        //データ格納
        for (var i = 0; i < obj.Respons.W_Power.Num; i++) {
            //時間          "年：月：日 時：分"
            twps_graph_time_W[i] = moment(obj.Respons.W_Power.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.W_Power.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                twps_graph_data_W[i] = null;
            }
            //データがある
            else {
                twps_graph_data_W[i] = obj.Respons.W_Power.Data[i].Value;
            }
        }

        //データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間          "年：月：日 時：分"
            twps_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                twps_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                twps_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }

        //
        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (twps_graph_exist == false) {
            twps_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            twps_graph_exist = true;
        }
        else {
            twps_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("twps_W_chart_time").innerHTML = twps_graph_date;
        document.getElementById("twps_Wh_chart_time").innerHTML = twps_graph_date;

    }
    else if (obj.Status == 400) {
        twps_graph_data_W[i] = null;
        twps_graph_data_Wh[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (twps_graph_exist == false) {
            twps_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            twps_graph_exist = true;
        }
        else {
            twps_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("twps_W_chart_time").innerHTML = twps_graph_date;
        document.getElementById("twps_Wh_chart_time").innerHTML = twps_graph_date;
    }
    else {

    }
}


/*
* 機能：TWPSのグラフを作成する
*/
function twps_draw_graph(setdata) {
    //CANVAS 2d content オブジェクトを取得   グラフ用
    var canvas_W = document.getElementById("twps_W_chart_canvas").getContext("2d");
    var canvas_Wh = document.getElementById("twps_Wh_chart_canvas").getContext("2d");

    //グラフを描画
    twps_chart_W = draw_graph_line(canvas_W, twps_graph_time_W, twps_graph_data_W, twps_graph_time_W.length, setdata.setting.set.W);
    twps_chart_Wh = draw_graph_bar(canvas_Wh, twps_graph_time_Wh, twps_graph_data_Wh, twps_graph_time_Wh.length, setdata.setting.set.Wh);
}


/*
 機能：  AD、DI、電波強度のグラフを更新
*/
function twps_update_graph(setdata) {
    //
    graph_line_update(twps_chart_W, twps_graph_time_W, twps_graph_data_W, twps_graph_time_W.length, setdata.setting.set.W);
    graph_bar_update(twps_chart_Wh, twps_graph_time_Wh, twps_graph_data_Wh, twps_graph_time_Wh.length, setdata.setting.set.Wh);
}

/**
 * グラフデータを削除
 */
function fncTwpsGrpClr(type) {

    try {
        twps_graph_data_W.length = 0;
        twps_graph_data_Wh.length = 0;
    } catch (error) {

    }

    try {
        twps_graph_time_W.length = 0;
        twps_graph_time_Wh.length = 0;
    } catch (error) {

    }

    if (twps_graph_exist == true) {
        twps_chart_W.destroy();
        twps_chart_Wh.destroy();
        twps_graph_exist = false;
    }
    else {

    }

    term = "#alertH_twps";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#twpsupdated_time").text("データ更新：----/--/-- --:--");
    $("#twps_W_Power").text("--");
    $("#twps_Wh_Energy").text("--");


    twps_graph_type = type;
}

/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：TWPSの価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_twps_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var prefix;
    var suffix;
    var chkExclude = ["Wh"];
    var termClH;
    var termClL;

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + TWPS_TITLE_ + suffix;
    console.log(ID_temp);
    var strTitle = document.getElementById(ID_temp).value;
    if (strTitle.trim() == "") {
        swal({
            title: "設定エラー！",
            text: "タイトルを入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    if (string_len_check(document.getElementById(ID_temp).value, 20, ("タイトルは"), true) == false) return false;
    // Check if title contains comma [,]
    if (strTitle.indexOf(',') > -1) {
        swal({
            title: "設定エラー！",
            text: "タイトルに「,」を入力しないでください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }

    //グラフの上限値、グラフの下限値
    if (chkExclude.includes(suffix) == false) {
        //グラフの上限値
        ID_temp = prefix + TWPS_GRAPHH_ + suffix;
        console.log(ID_temp);
        var strGH = document.getElementById(ID_temp).value;
        if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "グラフ上限値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            term = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = term + '',
                dpNum1 = !!(term % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                term = Math.round(term * 10000);
                if ((term > MAXINPUTVALUE) || (term < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }
        //グラフの下限値
        ID_temp = prefix + TWPS_GRAPHL_ + suffix;
        console.log(ID_temp);
        var strGL = document.getElementById(ID_temp).value;
        if ((isNaN(strGL) == true) || (strGL.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "グラフ下限値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termL = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termL + '',
                dpNum1 = !!(termL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termL = Math.round(termL * 10000);
                if ((termL > MAXINPUTVALUE) || (termL < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ下限値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }

        if (termL >= term) {
            swal({
                title: "設定エラー！",
                text: "グラフ下限値はグラフ上限値より大きな値を入力しないでください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        //上限警報発生値
        ID_temp = prefix + TWPS_ALARMH_ + suffix;
        console.log(ID_temp);
        var strAH = document.getElementById(ID_temp).value;
        if ((isNaN(strAH) == true) || (strAH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            term = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = term + '',
                dpNum1 = !!(term % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                term = Math.round(term * 10000);
                if ((term > MAXINPUTVALUE) || (term < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "上限警報発生値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }

        //上限警報解除値
        ID_temp = prefix + TWPS_CLALARMH_ + suffix;
        console.log(ID_temp);
        var strClAH = document.getElementById(ID_temp).value;
        if ((isNaN(strClAH) == true) || (strClAH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "上限警報解除値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termClH = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termClH + '',
                dpNum1 = !!(termClH % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termClH = Math.round(termClH * 10000);
                if ((termClH > MAXINPUTVALUE) || (termClH < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "上限警報解除値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }

        if (term < termClH) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値を上限警報解除値以上で入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        //下限警報発生値
        ID_temp = prefix + TWPS_ALARML_ + suffix;
        console.log(ID_temp);
        var strAL = document.getElementById(ID_temp).value;
        if ((isNaN(strAL) == true) || (strAL.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "下限警報発生値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termL = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termL + '',
                dpNum1 = !!(termL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termL = Math.round(termL * 10000);
                if ((termL > MAXINPUTVALUE) || (termL < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "下限警報発生値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }

        //下限警報解除値
        ID_temp = prefix + TWPS_CLALARML_ + suffix;
        console.log(ID_temp);
        var strClAL = document.getElementById(ID_temp).value;
        if ((isNaN(strClAL) == true) || (strClAL.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "下限警報解除値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termClL = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termClL + '',
                dpNum1 = !!(termClL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termClL = Math.round(termClL * 10000);
                if ((termClL > MAXINPUTVALUE) || (termClL < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "下限警報解除値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }

        if (termL > termClL) {
            swal({
                title: "設定エラー！",
                text: "下限警報解除値を下限警報発生値以上で入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        if (termClL >= termClH) {
            swal({
                title: "設定エラー！",
                text: "上限警報解除値を下限警報解除値より大きい値を入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        if (termL >= term) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値を下限警報発生値より大きい値を入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }
    }
    else {
        //グラフの上限値
        ID_temp = prefix + TWPS_GRAPHH_ + suffix;
        console.log(ID_temp);
        var strGH = document.getElementById(ID_temp).value;
        if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "グラフ上限値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            term = parseFloat(document.getElementById(ID_temp).value);
            // 入力値は0以下
            if (term <= 0) {
                swal({
                    title: "設定エラー！",
                    text: "グラフ上限値を0より大きな値で入力してください。",
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
            var strNum1 = term + '',
                dpNum1 = !!(term % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                term = Math.round(term * 10000);
                if ((term > MAXINPUTVALUE) || (term < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
                    "\n整数部：８桁以下" + "\n小数部：４桁以下";
                swal({
                    title: "設定エラー！",
                    text: txtmess,
                    icon: "warning",
                    button: "はい",
                });
                return false;
            }
        }
    }

    return true;
}

/*  機能：  TWPS設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            i: TWPSの設定ボタンの順番
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_twps_setting(unitNo, e) {
    var ch = e.target.id;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "varh"];
    var settingpoint = 4;

    prefix = ch.split("_")[0] + "_";
    suffix = ch.split("_")[1];

    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Item]
    jsDat.Item = ch.split("_")[2] + "_" + ch.split("_")[3];
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(prefix + TWPS_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + TWPS_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + TWPS_GRAPHH_ + suffix).value, settingpoint);
    //[AlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + TWPS_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + TWPS_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + TWPS_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + TWPS_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmL = dec2hex(document.getElementById(prefix + TWPS_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmL = "000000000000";
    }
    //[ClAlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmH = dec2hex(document.getElementById(prefix + TWPS_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmH = "000000000000";
    }

    jsDat.MODEL_CHECK = 0;

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}


/*  機能：  TWPS設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            i: TWPSの設定ボタンの順番
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function create_twps_setting(unitNo, e) {
    var ch = e.target.id;
    var strGetQuery = unitNo;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "varh"];
    var iPoint;
    var settingpoint = 4;

    prefix = ch.split("_")[0] + "_";
    suffix = ch.split("_")[1];

    iPoint = gtwpsSettingPointArray[prefix + suffix + "_Point"];
    console.log(prefix + suffix + "_Point");

    if (iPoint == undefined) {
        console.log(iPoint);
        iPoint = 0;
    }

    // ユニット計測要素
    strGetQuery += "_" + ch.split("_")[2] + "_" + ch.split("_")[3];
    // タイトル
    console.log(prefix + TWPS_TITLE_ + suffix);
    strGetQuery += "_" + chr2sjis(document.getElementById(prefix + TWPS_TITLE_ + suffix).value, 20);
    // グラフ下限
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + TWPS_GRAPHL_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // グラフ上限
    strGetQuery += "_" + dec2hex(document.getElementById(prefix + TWPS_GRAPHH_ + suffix).value * Math.pow(10, settingpoint), 0);
    // 警報下限
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + TWPS_ALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // 警報上限
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + TWPS_ALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // 警報下限有無
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + ((document.getElementById(prefix + TWPS_ALARMLE_ + suffix).checked == true) ? "1" : "0");
    }
    else {
        strGetQuery += "_0";
    }
    // 警報上限有無
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + ((document.getElementById(prefix + TWPS_ALARMHE_ + suffix).checked == true) ? "1" : "0");
    }
    else {
        strGetQuery += "_0";
    }
    // 下限警報解除値
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + TWPS_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // 上限警報解除値
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + TWPS_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }

    return strGetQuery;
}

/**
 * TWPS設定ボタンをクリックの処理
 * 入力値をチェックしてから、サーバーに保存する
 */
function fncSaveSetting_TWPS(e) {
    if (check_twps_input(e) == true) {
        var unitNo = ("000" + setTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[
            gcurrs].UnitNo.toString(16).toUpperCase()).substr(-4);
        set_twps_setting(unitNo, e);
    };
}

/**
 * TWPSの設定値を表示する
 *
 */
var gtwpsSettingPointArray = {};
function twps_loaddata_setting(obj, Type) {
    var settingpoint = 4;

    if (obj.Status == 200) {
        // Setting point clear
        gtwpsSettingPointArray = {};
        console.log("TYPE:" + Type);
        prefix = "twps_";
        suffix = "W";
        // タイトル
        $("#" + prefix + TWPS_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
        // グラフ上限
        $("#" + prefix + TWPS_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
        // グラフ下限
        $("#" + prefix + TWPS_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
        // 警報上限
        $("#" + prefix + TWPS_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
        // 警報下限
        $("#" + prefix + TWPS_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
        // 警報出力上限値解除
        $("#" + prefix + TWPS_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
        // 警報出力下限値解除
        $("#" + prefix + TWPS_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
        // 警報上限有無
        document.getElementById(prefix + TWPS_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
        // 警報下限有無
        document.getElementById(prefix + TWPS_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
        // 小数点値
        gtwpsSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

        suffix = "Wh"
        // タイトル
        $("#" + prefix + TWPS_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
        // グラフ上限
        $("#" + prefix + TWPS_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
        // 警報上限
        $("#" + prefix + TWPS_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
        // 小数点値
        gtwpsSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

    } else {
        //Debug
    }
}

/**
* TWPS瞬時値のデータを更新する
*/
function get_InsDatTWPS(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twps_W_Power").text("--");
        $("#twps_Wh_Energy").text("--");
        $("#twpsupdated_time").text("データ更新：----/--/-- --:--");

        var term = "#alertH_twps";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "twps";
        $("#twps_W_Power_Title").text(setting.setting.set.W.Title);
        $("#twps_Wh_Energy_Title").text(setting.setting.set.Wh.Title);

        //電力
        $("#" + prefix + "_Title_W").text(setting.setting.set.W.Title);
        if (setting.setting.set.W.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_W").css({ "display": "block" });
            $("#" + prefix + "_aH_W").text("上限警報発生値:" + setting.setting.set.W.Alarm[1].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aHE_W").css({ "display": "none" });
        }

        if (setting.setting.set.W.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_W").css({ "display": "block" });
            $("#" + prefix + "_aL_W").text("下限警報発生値:" + setting.setting.set.W.Alarm[0].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aLE_W").css({ "display": "none" });
        }

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title);
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

    }
    else {
        unitNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (unitNoRequest == true) {
        return;
    }

    // 瞬時値を取得して、表示を更新する
    rs485_insread_data(unitNo, function (obj, setting) {

        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                // 瞬時値＋更新時間を[--]に表示する
                $("#twps_Wh_Energy").text("--");
                $("#twps_W_Power").text("--");
                $("#twpsupdated_time").text("データ更新：----/--/-- --:--");
            }
            // データがある
            else {
                var termdata;
                // 瞬時値＋更新時間更新
                $("#twpsupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#twps_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#twps_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");

                //*******************警報状態の更新*******************
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twps";
                var alert_str1 = "";
                var unknown = false;
                var twpswarncheck = {
                    checkitem: [
                        {
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        }
                    ]
                }

                //DI
                for (i in twpswarncheck.checkitem) {
                    if (obj.Respons.Data[twpswarncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[twpswarncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = twpswarncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = twpswarncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = twpswarncheck.checkitem[i].content;
                        unknown = true;
                    }
                }

                $(term).removeClass("alert-success");
                $(term).removeClass("alert-danger");
                $(term).removeClass("alert-warning");
                if (alert_exist == 1) {
                    $(term).addClass("alert-danger");
                    $(term).html("<strong>" + alert_str1 + "</strong>" + "が上限警報発生値を超えています！　");
                } else if (alert_exist == 2) {
                    $(term).addClass("alert-warning");
                    $(term).html("<strong>" + alert_str1 + "</strong>" + "が下限警報発生値を下回っています！　");
                } else if (unknown == true) {
                    $(term).html("<strong>" + alert_str1 + "</strong>" + "-----　");
                } else {
                    $(term).addClass("alert-success");
                    $(term).html("<strong>正常</strong>　");
                }

            }

        }
        // 瞬時値要求の状態!=200、瞬時値＋更新時間を[--]に表示する
        else {
            $("#twps_Wh_Energy").text("--");
            $("#twps_W_Power").text("--");
            $("#twpsupdated_time").text("データ更新：----/--/-- --:--");

            //警報状態
            term = "#alertH_twps";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}


/* TWPS ダイナミク瞬時データ表示作成 */
function fncTWPSInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwpstitle" class="h5 m-0 ">twpstitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';


    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");
    rtnval = rtnval.replace(/twpstitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataTWPS(tvid, realtimeObj) {

    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {
        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
    }

}

/**
* TWPSの設定値を表示
*/
function fncTWPSDspData(tvid, unitNo, isUnitChg, twpssetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twps_set_tmp = {
            W: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Wh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
        };

        twpssetting.setting = { "set": twps_set_tmp };

        if (!settingObj.W_Power) {
            settingObj.W_Power = {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            }
        }

        twpssetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        twpssetting.setting.set.W.Point = settingObj.W_Power.Point;
        twpssetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        twpssetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        twpssetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        twpssetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        twpssetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        twpssetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        if (!settingObj.Wh_Energy) {
            settingObj.Wh_Energy = {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            }
        }

        twpssetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        twpssetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        twpssetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        twpssetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        twpssetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        twpssetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        twpssetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        twpssetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        $('#' + tvid + "W_Power_Title").text(twpssetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(twpssetting.setting.set.Wh.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(twpssetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (twpssetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null) || (unitSts == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPS(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPS(tvid, realtimeObj);
        }

    }
    else {
        if (twpssetting.setting != null) {
            $('#' + tvid + "W_Power_Title").text(twpssetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(twpssetting.setting.set.Wh.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpssetting.setting == null)) {
            // Save Instance Data for Combine Graph
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);

            // 瞬時値を表示する
            fncLoadRealtimeDataTWPS(tvid, retobj);

            return;
        }

        rs485_insread_data(unitNo, function (obj, twpssetting) {
            // Save Instance Data for Combine Graph
            if (gActivedType == ActiveType.Atv_AllGroup) {
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataTWPS(tvid, obj.Respons);

        }, twpssetting);
    }
}

/**
* TWPS設定画面を表示
*/
function dispTwps() {
    document.getElementById("rstype_twps").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_twps').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_twps').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}

