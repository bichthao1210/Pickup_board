/*version=1.20*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

/**
* KMN1 グラフ
*/
/*　機能： kmn1グラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
*/
var kmn1_chart_Wh;
var kmn1_chart_WhRegenerative;
var kmn1_chart_varh;
var kmn1_chart_varhlag;
var kmn1_chart_varhlead;

var kmn1_graph_exist = false;
var kmn1_graph_exist = false;
var kmn1_graph_type = false;

//グラフ用の時間配
var kmn1_graph_time_Wh = [];
var kmn1_graph_time_WhRegenerative = [];
var kmn1_graph_time_varh = [];
var kmn1_graph_time_varhlag = [];
var kmn1_graph_time_varhlead = [];

var kmn1_graph_date;
var kmn1_graph_dat_num;
//DIグラフ用のデータ配
var kmn1_graph_data_Wh = [];
var kmn1_graph_data_WhRegenerative = [];
var kmn1_graph_data_varh = [];
var kmn1_graph_data_varhlag = [];
var kmn1_graph_data_varhlead = [];

function kmn1_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // Graph date
    kmn1_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        kmn1_graph_time_Wh.length = 0;
        kmn1_graph_time_WhRegenerative.length = 0;
        kmn1_graph_time_varh.length = 0;
        kmn1_graph_time_varhlag.length = 0;
        kmn1_graph_time_varhlead.length = 0;

        kmn1_graph_data_Wh.length = 0;
        kmn1_graph_data_WhRegenerative.length = 0;
        kmn1_graph_data_varh.length = 0;
        kmn1_graph_data_varhlag.length = 0;
        kmn1_graph_data_varhlead.length = 0;



        //データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間          "分：秒"
            kmn1_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                kmn1_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                kmn1_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }
        //データ格納
        for (var i = 0; i < obj.Respons.WhRegenerative_Energy.Num; i++) {
            //時間          "分：秒"
            kmn1_graph_time_WhRegenerative[i] = moment(obj.Respons.WhRegenerative_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.WhRegenerative_Energy.Data[i].RSSI) == 0) {
                kmn1_graph_data_WhRegenerative[i] = null;
            }
            //データがある
            else {
                kmn1_graph_data_WhRegenerative[i] = obj.Respons.WhRegenerative_Energy.Data[i].Value;
            }
        }
        //データ格納
        for (var i = 0; i < obj.Respons.varh_Energy.Num; i++) {
            //時間          "分：秒"
            kmn1_graph_time_varh[i] = moment(obj.Respons.varh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varh_Energy.Data[i].RSSI) == 0) {
                kmn1_graph_data_varh[i] = null;
            }
            //データがある
            else {
                kmn1_graph_data_varh[i] = obj.Respons.varh_Energy.Data[i].Value;
            }
        }
        //データ格納(LAG)
        for (var i = 0; i < obj.Respons.varhlag_Energy.Num; i++) {
            //時間          "分：秒"
            kmn1_graph_time_varhlag[i] = moment(obj.Respons.varhlag_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varhlag_Energy.Data[i].RSSI) == 0) {
                kmn1_graph_data_varhlag[i] = null;
            }
            //データがある
            else {
                //DI1～DI8
                kmn1_graph_data_varhlag[i] = obj.Respons.varhlag_Energy.Data[i].Value;
            }
        }
        //データ格納(LEAD)
        for (var i = 0; i < obj.Respons.varhlead_Energy.Num; i++) {
            //時間          "分：秒"
            kmn1_graph_time_varhlead[i] = moment(obj.Respons.varhlead_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varhlead_Energy.Data[i].RSSI) == 0) {
                kmn1_graph_data_varhlead[i] = null;
            }
            //データがある
            else {
                kmn1_graph_data_varhlead[i] = obj.Respons.varhlead_Energy.Data[i].Value;
            }
        }

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (kmn1_graph_exist == false) {
            kmn1_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            kmn1_graph_exist = true;
        }
        else {
            kmn1_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("kmn1_Wh_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_WhRegenerative_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_varh_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_varhlag_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_varhlead_chart_time").innerHTML = kmn1_graph_date;

    }
    else if (obj.Status == 400) {
        kmn1_graph_data_Wh[i] = null;
        kmn1_graph_data_WhRegenerative[i] = null;
        kmn1_graph_data_varh[i] = null;
        kmn1_graph_data_varhlag[i] = null;
        kmn1_graph_data_varhlead[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (kmn1_graph_exist == false) {
            kmn1_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            kmn1_graph_exist = true;
        }
        else {
            kmn1_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("kmn1_Wh_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_WhRegenerative_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_varh_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_varhlag_chart_time").innerHTML = kmn1_graph_date;
        document.getElementById("kmn1_varhlead_chart_time").innerHTML = kmn1_graph_date;


    }
    else {

    }
}


/*  機能：
*/
function kmn1_draw_graph(setdata) {

    //CANVAS 2d content オブジェクトを取得   グラフ用
    var canvas_Wh = document.getElementById("kmn1_Wh_chart_canvas").getContext("2d");
    var canvas_WhRegenerative = document.getElementById("kmn1_WhRegenerative_chart_canvas").getContext("2d");
    var canvas_varh = document.getElementById("kmn1_varh_chart_canvas").getContext("2d");
    var canvas_varhlag = document.getElementById("kmn1_varhlag_chart_canvas").getContext("2d");
    var canvas_varhlead = document.getElementById("kmn1_varhlead_chart_canvas").getContext("2d");

    kmn1_chart_Wh = draw_graph_bar(canvas_Wh, kmn1_graph_time_Wh, kmn1_graph_data_Wh, kmn1_graph_time_Wh.length, setdata.setting.set.Wh);
    kmn1_chart_WhRegenerative = draw_graph_bar(canvas_WhRegenerative, kmn1_graph_time_WhRegenerative, kmn1_graph_data_WhRegenerative, kmn1_graph_time_WhRegenerative.length, setdata.setting.set.WhRegenerative);
    kmn1_chart_varh = draw_graph_bar(canvas_varh, kmn1_graph_time_varh, kmn1_graph_data_varh, kmn1_graph_time_varh.length, setdata.setting.set.varh);
    kmn1_chart_varhlag = draw_graph_bar(canvas_varhlag, kmn1_graph_time_varhlag, kmn1_graph_data_varhlag, kmn1_graph_time_varhlag.length, setdata.setting.set.varhlag);
    kmn1_chart_varhlead = draw_graph_bar(canvas_varhlead, kmn1_graph_time_varhlead, kmn1_graph_data_varhlead, kmn1_graph_time_varhlead.length, setdata.setting.set.varhlead);

}


/*  機能：  AD、DI、電波強度のグラフを更新
*/
function kmn1_update_graph(setdata) {
    //
    graph_bar_update(kmn1_chart_Wh, kmn1_graph_time_Wh, kmn1_graph_data_Wh, kmn1_graph_time_Wh.length, setdata.setting.set.Wh);
    graph_bar_update(kmn1_chart_WhRegenerative, kmn1_graph_time_WhRegenerative, kmn1_graph_data_WhRegenerative, kmn1_graph_time_WhRegenerative.length, setdata.setting.set.WhRegenerative);
    graph_bar_update(kmn1_chart_varh, kmn1_graph_time_varh, kmn1_graph_data_varh, kmn1_graph_time_varh.length, setdata.setting.set.varh);
    graph_bar_update(kmn1_chart_varhlag, kmn1_graph_time_varhlag, kmn1_graph_data_varhlag, kmn1_graph_time_varhlag.length, setdata.setting.set.varhlag);
    graph_bar_update(kmn1_chart_varhlead, kmn1_graph_time_varhlead, kmn1_graph_data_varhlead, kmn1_graph_time_varhlead.length, setdata.setting.set.varhlead);

}

/**
 *
 */
function fncKmn1GrpClr(type) {

    try {
        kmn1_graph_data_Wh.length = 0;
        kmn1_graph_data_WhRegenerative.length = 0;
        kmn1_graph_data_varh.length = 0;
        kmn1_graph_data_varhlag.length = 0;
        kmn1_graph_data_varhlead.length = 0;
    } catch (error) {

    }

    try {
        kmn1_graph_time_Wh.length = 0;
        kmn1_graph_time_WhRegenerative.length = 0;
        kmn1_graph_time_varh.length = 0;
        kmn1_graph_time_varhlag.length = 0;
        kmn1_graph_time_varhlead.length = 0;
    } catch (error) {

    }


    if (kmn1_graph_exist == true) {
        kmn1_chart_Wh.destroy();
        kmn1_chart_WhRegenerative.destroy();
        kmn1_chart_varh.destroy();
        kmn1_chart_varhlag.destroy();
        kmn1_chart_varhlead.destroy();
        kmn1_graph_exist = false;
    }
    else {

    }

    var term = "#alertH_kmn1";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#kmn1updated_time").text("データ更新：----/--/-- --:--");
    $("#kmn1_Wh_Energy").text("--");
    $("#kmn1_WhRegenerative_Energy").text("--");
    $("#kmn1_varh_Energy").text("--");
    $("#kmn1_varhlag_Energy").text("--");
    $("#kmn1_varhlead_Energy").text("--");


    kmn1_graph_type = type;
}


const KMN1_TITLE_ = "title_";
const KMN1_GRAPHH_ = "graphH_";
const KMN1_GRAPHL_ = "graphL_";
const KMN1_ALARMH_ = "alarmH_";
const KMN1_ALARML_ = "alarmL_";
const KMN1_ALARMHE_ = "alarmHE_";
const KMN1_ALARMLE_ = "alarmLE_";
const KMN1_CLALARMH_ = "ClAlarmH_";
const KMN1_CLALARML_ = "ClAlarmL_";


/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：KMN1の価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_kmn1_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var termL;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "WhRegenerative", "varh", "varhlag", "varhlead"];

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + KMN1_TITLE_ + suffix;
    console.log(ID_temp)
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
    if (string_len_check(document.getElementById(ID_temp).value, 20, ("タイトルを"), true) == false) return false;
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

    // グラフの上限値、下限値
    if (chkExclude.includes(suffix) == false) {
        //グラフの上限値
        ID_temp = prefix + KMN1_GRAPHH_ + suffix;
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

            if (dpNum1 > 0) {
                bFlag = false;
            }
            else {
                if ((term > MAXINPUTVALUE_OMRON) || (term < (MAXINPUTVALUE_OMRON * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
                    "\n整数部：9桁以下"
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
        ID_temp = prefix + KMN1_GRAPHL_ + suffix;
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

            if (dpNum1 > 0) {
                bFlag = false;
            }
            else {
                if ((termL > MAXINPUTVALUE_OMRON) || (termL < (MAXINPUTVALUE_OMRON * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ下限値は、次の範囲で入力してください。" +
                    "\n整数部：9桁以下"
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
                text: "グラフ上限をグラフ下限値より大きいな値を入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }
    }
    else {
        //グラフの上限値
        ID_temp = prefix + KMN1_GRAPHH_ + suffix;
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

            if (dpNum1 > 0) {
                bFlag = false;
            }
            else {
                if ((term > MAXINPUTVALUE_OMRON) || (term < (MAXINPUTVALUE_OMRON * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
                    "\n整数部：9桁以下"
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

/*  機能：  KMN1設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            e: 設定ボータン
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_kmn1_setting(unitNo, e) {
    var ch = e.target.id;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "WhRegenerative", "varh", "varhlag", "varhlead"];
    var settingpoint = 0;

    prefix = ch.split("_")[0] + "_";
    suffix = ch.split("_")[1];
    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Item]
    jsDat.Item = ch.split("_")[2] + "_" + ch.split("_")[3];
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(prefix + KMN1_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + KMN1_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + KMN1_GRAPHH_ + suffix).value, settingpoint);

    //[AlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + KMN1_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + KMN1_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + KMN1_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + KMN1_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmL = dec2hex(document.getElementById(prefix + KMN1_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmL = "000000000000";
    }
    //[ClAlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmH = dec2hex(document.getElementById(prefix + KMN1_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmH = "000000000000";
    }

    jsDat.MODEL_CHECK = 0;
    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/**
 * XS2設定ボタンをクリックの処理
 * 入力値をチェックしてから、サーバーに保存する
 */
function fncSaveSetting_KMN1(e) {
    if (check_kmn1_input(e) == true) {
        var unitNo = ("000" + setTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[
            gcurrs].UnitNo.toString(16).toUpperCase()).substr(-4);
        set_kmn1_setting(unitNo, e);
    };
}




/**
 * KMN1の設定値を表示する
 *
 */
var gkm50SettingPointArray = {};
function kmn1_loaddata_setting(obj, Type) {

    if (obj.Status == 200) {
        // Setting point clear
        gkm50SettingPointArray = {};
        var settingpoint = 0;
        prefix = "kmn1_";
        suffix = "Wh";
        // タイトル
        $("#" + prefix + KMN1_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
        // グラフ上限
        $("#" + prefix + KMN1_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));

        suffix = "WhRegenerative";
        // タイトル
        $("#" + prefix + KMN1_TITLE_ + suffix).val(jis2chr(obj.Respons.WhRegenerative_Energy.Title));
        // グラフ上限
        $("#" + prefix + KMN1_GRAPHH_ + suffix).val((obj.Respons.WhRegenerative_Energy.Graph[1]).toFixed(settingpoint));

        suffix = "varh";
        // タイトル
        $("#" + prefix + KMN1_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
        // グラフ上限
        $("#" + prefix + KMN1_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));

        //無効電力量（LAG）
        suffix = "varhlag";
        // タイトル
        $("#" + prefix + KMN1_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlag_Energy.Title));
        // グラフ上限
        $("#" + prefix + KMN1_GRAPHH_ + suffix).val((obj.Respons.varhlag_Energy.Graph[1]).toFixed(settingpoint));

        suffix = "varhlead";
        // タイトル
        $("#" + prefix + KMN1_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
        // グラフ上限
        $("#" + prefix + KMN1_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));

    } else {
        //Debug
    }
}

/**
* KMN1データ
*/
function get_InsDatKMN1(setting, unitNo, unitSts) {
    var isNoRequest = false;

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#kmn1updated_time").text("データ更新：----/--/-- --:--");
        $("#kmn1_Wh_Energy").text("--");
        $("#kmn1_WhRegenerative_Energy").text("--");
        $("#kmn1_varh_Energy").text("--");
        $("#kmn1_varhlag_Energy").text("--");
        $("#kmn1_varhlead_Energy").text("--");

        var term = "#alertH_kmn1";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }
    // 設定値を表示する
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "kmn1";

        // 瞬時値タイトル
        $('#' + prefix + "_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $('#' + prefix + "_WhRegenerative_Energy_Title").text(setting.setting.set.WhRegenerative.Title);
        $('#' + prefix + "_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $('#' + prefix + "_varhlag_Energy_Title").text(setting.setting.set.varhlag.Title);
        $('#' + prefix + "_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);


        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title)
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        $("#" + prefix + "_Title_WhRegenerative").text(setting.setting.set.WhRegenerative.Title);
        $("#" + prefix + "_aHE_WhRegenerative").css({ "display": "none" });
        $("#" + prefix + "_aLE_WhRegenerative").css({ "display": "none" });

        $("#" + prefix + "_Title_varh").text(setting.setting.set.varh.Title);
        $("#" + prefix + "_aHE_varh").css({ "display": "none" });
        $("#" + prefix + "_aLE_varh").css({ "display": "none" });

        $("#" + prefix + "_Title_varhlag").text(setting.setting.set.varhlag.Title)
        $("#" + prefix + "_aHE_varhlag").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlag").css({ "display": "none" });

        $(kmn1_Title_varhlag).text(setting.setting.set.varhlag.Title)

        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });

    }
    else {
        isNoRequest = true;
    }

    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if (isNoRequest == true) {
        return;
    }

    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#kmn1updated_time").text("データ更新：----/--/-- --:--");
                $("#kmn1_Wh_Energy").text("--");
                $("#kmn1_WhRegenerative_Energy").text("--");
                $("#kmn1_varhlag_Energy").text("--");
                $("#kmn1_varh_Energy").text("--");
                $("#kmn1_varhlead_Energy").text("--");
            }
            else {
                var termdata;
                $("#kmn1updated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#kmn1_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#kmn1_WhRegenerative_Energy").text(obj.Respons.Data.WhRegenerative_Energy.Value + " [kWh]");
                $("#kmn1_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#kmn1_varhlag_Energy").text(obj.Respons.Data.varhlag_Energy.Value + " [kvarh]");
                $("#kmn1_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_kmn1";
                var alert_str1 = "";
                var unknown = false;

                var kmn1warncheck = {
                    checkitem: [
                        {
                            ele: "Wh_Energy",
                            content: "電力量"
                        },

                        {
                            ele: "WhRegenerative_Energy",
                            content: "回生電力量"
                        },

                        {
                            ele: "varhlead_Energy",
                            content: "無効電力量(Lead)"
                        },

                        {
                            ele: "varhlag_Energy",
                            content: "無効電力量(Lag)"
                        },

                        {
                            ele: "varhlag_Energy",
                            content: "総合無効電力量"
                        }

                    ]
                }

                //DI
                for (var i = 0; i < kmn1warncheck.checkitem.length && alert_exist == 0; i++) {
                    termdata = parseInt(obj.Respons.Data[kmn1warncheck.checkitem[i].ele].State, 16);
                    //不明
                    // xxxx 11xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = kmn1warncheck.checkitem[i].content;
                        unknown = true;
                    }
                }

                $(term).removeClass("alert-success");
                $(term).removeClass("alert-danger");
                $(term).removeClass("alert-warning");
                if (unknown == true) {
                    $(term).html("<strong>" + alert_str1 + "</strong>" + "-----　");
                } else {
                    $(term).addClass("alert-success");
                    $(term).html("<strong>正常</strong>　");
                }

            }

        }
        // 瞬時値要求の状態!=200、瞬時値＋更新時間を[--]に表示する
        else {
            $("#kmn1updated_time").text("データ更新：----/--/-- --:--");
            $("#kmn1_Wh_Energy").text("--");
            $("#kmn1_WhRegenerative_Energy").text("--");
            $("#kmn1_varh_Energy").text("--");
            $("#kmn1_varhlag_Energy").text("--");
            $("#kmn1_varhlead_Energy").text("--");

            //警報状態
            term = "#alertH_kmn1";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}


/**
* KMN1 Data display clear
*/
function fncKMN1DspClr(tvid) {
    $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
    $('#' + tvid + "Wh_Energy").text("");
    $('#' + tvid + "WhRegenerative_Energy").text("");
    $('#' + tvid + "varh_Energy").text("");
    $('#' + tvid + "varhlag_Energy").text("");
    $('#' + tvid + "varhlead_Energy").text("");
}


/* KMN1 ダイナミク瞬時データ表示作成 */
function fncKMN1InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idkmn1title" class="h5 m-0 ">kmn1titlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                        <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                        <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="WhRegenerative_Energy_Title" class="text-center table-active font-weight-bold">回生電力量</td> \
                            <td id="WhRegenerative_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varh_Energy_Title" class="text-center table-active font-weight-bold">総合無効電力量</td> \
                            <td id="varh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varhlag_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lag)</td> \
                            <td id="varhlag_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varhlead_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lead)</td> \
                            <td id="varhlead_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/WhRegenerative_Energy/g, tvid + "WhRegenerative_Energy");
    rtnval = rtnval.replace(/varh_Energy/g, tvid + "varh_Energy");
    rtnval = rtnval.replace(/varhlag_Energy/g, tvid + "varhlag_Energy");
    rtnval = rtnval.replace(/varhlead_Energy/g, tvid + "varhlead_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/kmn1titlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataKMN1(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {

        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "WhRegenerative_Energy").text("--");
        $('#' + tvid + "varh_Energy").text("--");
        $('#' + tvid + "varhlag_Energy").text("--");
        $('#' + tvid + "varhlead_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {

        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "WhRegenerative_Energy").text(realtimeObj.Data.WhRegenerative_Energy.Value + " [kWh]");
        $('#' + tvid + "varh_Energy").text(realtimeObj.Data.varh_Energy.Value + " [kvarh]");
        $('#' + tvid + "varhlag_Energy").text(realtimeObj.Data.varhlag_Energy.Value + " [kvarh]");
        $('#' + tvid + "varhlead_Energy").text(realtimeObj.Data.varhlead_Energy.Value + " [kvarh]");
    }

}

function fncKMN1DspData(tvid, unitNo, isUnitChg, km50Setting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var kmn1_set_tmp = {
            Wh: {
                "Title": "",
                "Point": 0,
                "Graph": [0, 0],
            },
            WhRegenerative: {
                "Title": "",
                "Point": 0,
                "Graph": [0, 0],
            },
            varh: {
                "Title": "",
                "Point": 0,
                "Graph": [0, 0],
            },
            varhlag: {
                "Title": "",
                "Point": 0,
                "Graph": [0, 0],
            },
            varhlead: {
                "Title": "",
                "Point": 0,
                "Graph": [0, 0],
            },

        };

        km50Setting.setting = { "set": kmn1_set_tmp };

        km50Setting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        km50Setting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        km50Setting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];

        km50Setting.setting.set.WhRegenerative.Title = jis2chr(settingObj.WhRegenerative_Energy.Title);
        km50Setting.setting.set.WhRegenerative.Graph[0] = settingObj.WhRegenerative_Energy.Graph[0];
        km50Setting.setting.set.WhRegenerative.Graph[1] = settingObj.WhRegenerative_Energy.Graph[1];

        km50Setting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        km50Setting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        km50Setting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];

        km50Setting.setting.set.varhlag.Title = jis2chr(settingObj.varhlag_Energy.Title);
        km50Setting.setting.set.varhlag.Graph[0] = settingObj.varhlag_Energy.Graph[0];
        km50Setting.setting.set.varhlag.Graph[1] = settingObj.varhlag_Energy.Graph[1];

        km50Setting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        km50Setting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        km50Setting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];



        $('#' + tvid + "Wh_Energy_Title").text(km50Setting.setting.set.Wh.Title);
        $('#' + tvid + "WhRegenerative_Energy_Title").text(km50Setting.setting.set.WhRegenerative.Title);
        $('#' + tvid + "varhlag_Energy_Title").text(km50Setting.setting.set.varhlag.Title);
        $('#' + tvid + "varh_Energy_Title").text(km50Setting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(km50Setting.setting.set.varhlead.Title);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (km50Setting.setting == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            // 瞬時値を表示する
            fncLoadRealtimeDataKMN1(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            // 瞬時値を表示する
            fncLoadRealtimeDataKMN1(tvid, realtimeObj);
        }
    }
    else {
        if (km50Setting.setting !== null) {
            $('#' + tvid + "Wh_Energy_Title").text(km50Setting.setting.set.Wh.Title);
            $('#' + tvid + "WhRegenerative_Energy_Title").text(km50Setting.setting.set.WhRegenerative.Title);
            $('#' + tvid + "varh_Energy_Title").text(km50Setting.setting.set.varh.Title);
            $('#' + tvid + "varhlag_Energy_Title").text(km50Setting.setting.set.varhlag.Title);

            $('#' + tvid + "varhlead_Energy_Title").text(km50Setting.setting.set.varhlead.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (km50Setting.setting == null)) {
            var retobj = null;
            // 瞬時値を表示する
            fncLoadRealtimeDataKMN1(tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, km50Setting) {

            // 瞬時値を表示する
            fncLoadRealtimeDataKMN1(tvid, obj.Respons);

        }, km50Setting);
    }
}

// KMN1設定画面を表示
function dispKmn1() {
    document.getElementById("rstype_kmn1").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_kmn1').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_kmn1').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}


