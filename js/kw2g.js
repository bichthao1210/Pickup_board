/*version=1.20*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

/**
* KW2G グラフ
*/
/*　機能： kw2gグラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
*/
var kw2g_chart_Wh;
var kw2g_chart_Wh2;

var kw2g_graph_exist = false;
var kw2g_graph_exist = false;
var kw2g_graph_type = false;

//グラフ用の時間配
var kw2g_graph_time_Wh = [];
var kw2g_graph_time_Wh2 = [];

var kw2g_graph_date;
var kw2g_graph_dat_num;
//DIグラフ用のデータ配
var kw2g_graph_data_Wh = [];
var kw2g_graph_data_Wh2 = [];

function kw2g_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // Graph date
    kw2g_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        kw2g_graph_time_Wh.length = 0;
        kw2g_graph_time_Wh.length = 0;

        kw2g_graph_data_Wh2.length = 0;
        kw2g_graph_data_Wh2.length = 0;


        //データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間          "分：秒"
            kw2g_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                kw2g_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                kw2g_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }

        //データ格納
        for (var i = 0; i < obj.Respons.Wh2_Energy.Num; i++) {
            //時間          "分：秒"
            kw2g_graph_time_Wh2[i] = moment(obj.Respons.Wh2_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh2_Energy.Data[i].RSSI) == 0) {
                kw2g_graph_data_Wh2[i] = null;
            }
            //データがある
            else {
                kw2g_graph_data_Wh2[i] = obj.Respons.Wh2_Energy.Data[i].Value;
            }
        }

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (kw2g_graph_exist == false) {
            kw2g_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            kw2g_graph_exist = true;
        }
        else {
            kw2g_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("kw2g_Wh_chart_time").innerHTML = kw2g_graph_date;
        document.getElementById("kw2g_Wh2_chart_time").innerHTML = kw2g_graph_date;

    }
    else if (obj.Status == 400) {
        kw2g_graph_data_Wh[i] = null;
        kw2g_graph_data_Wh2[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (kw2g_graph_exist == false) {
            kw2g_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            kw2g_graph_exist = true;
        }
        else {
            kw2g_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("kw2g_Wh_chart_time").innerHTML = kw2g_graph_date;
        document.getElementById("kw2g_Wh2_chart_time").innerHTML = kw2g_graph_date;

    }
    else {

    }
}


/*  機能：
*/
function kw2g_draw_graph(setdata) {

    //CANVAS 2d content オブジェクトを取得   グラフ用
    var canvas_Wh = document.getElementById("kw2g_Wh_chart_canvas").getContext("2d");
    var canvas_Wh2 = document.getElementById("kw2g_Wh2_chart_canvas").getContext("2d");

    kw2g_chart_Wh = draw_graph_bar(canvas_Wh, kw2g_graph_time_Wh, kw2g_graph_data_Wh, kw2g_graph_time_Wh.length, setdata.setting.set.Wh);
    kw2g_chart_Wh2 = draw_graph_bar(canvas_Wh2, kw2g_graph_time_Wh2, kw2g_graph_data_Wh2, kw2g_graph_time_Wh2.length, setdata.setting.set.Wh2);

}


/*  機能：  AD、DI、電波強度のグラフを更新
*/
function kw2g_update_graph(setdata) {
    //
    graph_bar_update(kw2g_chart_Wh, kw2g_graph_time_Wh, kw2g_graph_data_Wh, kw2g_graph_time_Wh.length, setdata.setting.set.Wh);
    graph_bar_update(kw2g_chart_Wh2, kw2g_graph_time_Wh2, kw2g_graph_data_Wh2, kw2g_graph_time_Wh2.length, setdata.setting.set.Wh2);

}

/**
 *
 */
function fncKw2gGrpClr(type) {

    try {
        kw2g_graph_data_Wh.length = 0;
        kw2g_graph_data_Wh2.length = 0;
    } catch (error) {

    }

    try {
        kw2g_graph_time_Wh.length = 0;
        kw2g_graph_time_Wh2.length = 0;
    } catch (error) {

    }


    if (kw2g_graph_exist == true) {
        kw2g_chart_Wh.destroy();
        kw2g_chart_Wh2.destroy();
        kw2g_graph_exist = false;
    }
    else {

    }

    var term = "#alertH_kw2g";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#kw2gupdated_time").text("データ更新：----/--/-- --:--");
    $("#kw2g_Wh_Energy").text("--");
    $("#kw2g_Wh2_Energy").text("--");

    kw2g_graph_type = type;
}


const KW2G_TITLE_ = "title_";
const KW2G_GRAPHH_ = "graphH_";
const KW2G_GRAPHL_ = "graphL_";
const KW2G_ALARMH_ = "alarmH_";
const KW2G_ALARML_ = "alarmL_";
const KW2G_ALARMHE_ = "alarmHE_";
const KW2G_ALARMLE_ = "alarmLE_";
const KW2G_CLALARMH_ = "ClAlarmH_";
const KW2G_CLALARML_ = "ClAlarmL_";


/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：KW2Gの価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_kw2g_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var termL;
    var prefix;
    var suffix;
    var chkExclude = ["Wh","Wh2"];

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + KW2G_TITLE_ + suffix;
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
        ID_temp = prefix + KW2G_GRAPHH_ + suffix;
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

            if (dpNum1 > 2) {
                bFlag = false;
            }
            else {
                term = Math.round(term * 100)
                if ((term > MAXINPUTVALUE_OMRON) || (term < (MAXINPUTVALUE_OMRON * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
                    "\n整数部：７桁以下" + "\n小数部：２桁以下"
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
        ID_temp = prefix + KW2G_GRAPHL_ + suffix;
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

            if (dpNum1 > 2) {
                bFlag = false;
            }
            else {
                termL = Math.round(term * 100)
                if ((termL > MAXINPUTVALUE_OMRON) || (termL < (MAXINPUTVALUE_OMRON * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ下限値は、次の範囲で入力してください。" +
                    "\n整数部：７桁以下" + "\n小数部：２桁以下"
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
        ID_temp = prefix + KW2G_GRAPHH_ + suffix;
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

            if (dpNum1 > 2) {
                bFlag = false;
            }
            else {
                term = Math.round(term * 100)
                if ((term > MAXINPUTVALUE_OMRON) || (term < (MAXINPUTVALUE_OMRON * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
                    "\n整数部：７桁以下" + "\n小数部：２桁以下"
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

/*  機能：  KW2G設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            e: 設定ボータン
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_kw2g_setting(unitNo, e) {
    var ch = e.target.id;
    var prefix;
    var suffix;
    var chkExclude = ["Wh","Wh2"];
    var settingpoint = 2;

    prefix = ch.split("_")[0] + "_";
    suffix = ch.split("_")[1];
    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Item]
    jsDat.Item = ch.split("_")[2] + "_" + ch.split("_")[3];
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(prefix + KW2G_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + KW2G_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + KW2G_GRAPHH_ + suffix).value, settingpoint);

    //[AlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + KW2G_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + KW2G_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + KW2G_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + KW2G_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmL = dec2hex(document.getElementById(prefix + KW2G_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmL = "000000000000";
    }
    //[ClAlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmH = dec2hex(document.getElementById(prefix + KW2G_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
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
function fncSaveSetting_KW2G(e) {
    if (check_kw2g_input(e) == true) {
        var unitNo = ("000" + setTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[
            gcurrs].UnitNo.toString(16).toUpperCase()).substr(-4);
        set_kw2g_setting(unitNo, e);
    };
}




/**
 * KW2Gの設定値を表示する
 *
 */
var gkw2gSettingPointArray = {};
function kw2g_loaddata_setting(obj, Type) {

    if (obj.Status == 200) {
        // Setting point clear
        gkw2gSettingPointArray = {};
        var settingpoint = 2;
        prefix = "kw2g_";
        suffix = "Wh";
        // タイトル
        $("#" + prefix + KW2G_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
        // グラフ上限
        $("#" + prefix + KW2G_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));

        suffix = "Wh2";
        // タイトル
        $("#" + prefix + KW2G_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh2_Energy.Title));
        // グラフ上限
        $("#" + prefix + KW2G_GRAPHH_ + suffix).val((obj.Respons.Wh2_Energy.Graph[1]).toFixed(settingpoint));


    } else {
        //Debug
    }
}

/**
* KW2Gデータ
*/
function get_InsDatKW2G(setting, unitNo, unitSts) {
    var isNoRequest = false;

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#kw2gupdated_time").text("データ更新：----/--/-- --:--");
        $("#kw2g_Wh_Energy").text("--");
        $("#kw2g_Wh2_Energy").text("--");

        var term = "#alertH_kw2g";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }
    // 設定値を表示する
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "kw2g";

        // 瞬時値タイトル
        $('#' + prefix + "_Wh_Energy_Title").text(setting.setting.set.Wh.Title);

        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title)
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        // 瞬時値タイトル
        $('#' + prefix + "_Wh2_Energy_Title").text(setting.setting.set.Wh2.Title);

        $("#" + prefix + "_Title_Wh2").text(setting.setting.set.Wh2.Title)
        $("#" + prefix + "_aHE_Wh2").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh2").css({ "display": "none" });
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
                $("#kw2gupdated_time").text("データ更新：----/--/-- --:--");
                $("#kw2g_Wh_Energy").text("--");
                $("#kw2g_Wh2_Energy").text("--");
            }
            else {
                var termdata;
                $("#kw2gupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#kw2g_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#kw2g_Wh2_Energy").text(obj.Respons.Data.Wh2_Energy.Value + " [kWh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_kw2g";
                var alert_str1 = "";
                var unknown = false;

                var kw2gwarncheck = {
                    checkitem: [
                        {
                            ele: "Wh_Energy",
                            content: "電力量"
                        },
                        {
                            ele: "Wh2_Energy",
                            content: "電力量"
                        }

                    ]
                }

                //DI
                for (var i = 0; i < kw2gwarncheck.checkitem.length && alert_exist == 0; i++) {
                    termdata = parseInt(obj.Respons.Data[kw2gwarncheck.checkitem[i].ele].State, 16);
                    //不明
                    // xxxx 11xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;kw2g_Wh_Energ
                        alert_str1 = kw2gwarncheck.checkitem[i].content;
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
            $("#kw2gupdated_time").text("データ更新：----/--/-- --:--");
            $("#kw2g_Wh_Energy").text("--");
            $("#kw2g_Wh2_Energy").text("--");

            //警報状態
            term = "#alertH_kw2g";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}


/**
* KW2G Data display clear
*/
function fncKW2GDspClr(tvid) {
    $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
    $('#' + tvid + "Wh_Energy").text("");
    $('#' + tvid + "Wh2_Energy").text("");
}


/* KW2G ダイナミク瞬時データ表示作成 */
function fncKW2GInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idkw2gtitle" class="h5 m-0 ">kw2gtitlestring \
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
                        <td id="Wh2_Energy_Title" class="text-center table-active font-weight-bold">電力量2</td> \
                        <td id="Wh2_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/Wh2_Energy/g, tvid + "Wh2_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/kw2gtitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataKW2G(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {

        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
        $('#' + tvid + "Wh2_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {

        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "Wh2_Energy").text(realtimeObj.Data.Wh2_Energy.Value + " [kWh]");
    }

}

function fncKW2GDspData(tvid, unitNo, isUnitChg, kw2gSetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var kw2g_set_tmp = {
            Wh: {
                "Title": "",
                "Point": 2,
                "Graph": [0, 0],
            },
            Wh2: {
                "Title": "",
                "Point": 2,
                "Graph": [0, 0],
            }
        };

        kw2gSetting.setting = { "set": kw2g_set_tmp };

        kw2gSetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        kw2gSetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        kw2gSetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];

        $('#' + tvid + "Wh_Energy_Title").text(kw2gSetting.setting.set.Wh.Title);

        kw2gSetting.setting.set.Wh2.Title = jis2chr(settingObj.Wh2_Energy.Title);
        kw2gSetting.setting.set.Wh2.Graph[0] = settingObj.Wh2_Energy.Graph[0];
        kw2gSetting.setting.set.Wh2.Graph[1] = settingObj.Wh2_Energy.Graph[1];

        $('#' + tvid + "Wh2_Energy_Title").text(kw2gSetting.setting.set.Wh2.Title);
        

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (kw2gSetting.setting == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            // 瞬時値を表示する
            fncLoadRealtimeDataKW2G(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            // 瞬時値を表示する
            fncLoadRealtimeDataKW2G(tvid, realtimeObj);
        }
    }
    else {
        if (kw2gSetting.setting !== null) {
            $('#' + tvid + "Wh_Energy_Title").text(kw2gSetting.setting.set.Wh.Title);
            $('#' + tvid + "Wh2_Energy_Title").text(kw2gSetting.setting.set.Wh2.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (kw2gSetting.setting == null)) {
            var retobj = null;
            // 瞬時値を表示する
            fncLoadRealtimeDataKW2G(tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, kw2gSetting) {

            // 瞬時値を表示する
            fncLoadRealtimeDataKW2G(tvid, obj.Respons);

        }, kw2gSetting);
    }
}

// KW2G設定画面を表示
function dispKw2g() {
    document.getElementById("rstype_kw2g").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_kw2g').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_kw2g').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}


