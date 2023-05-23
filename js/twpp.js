/*version=1.18*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->
/**
* TWPP グラフ
*/
/*　機能： twppグラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
*/


var twpp_graph_exist = false;
var twpp_graph_type = false;

//グラフ用の時間配
var twpp_graph_time_Wh = [];
var twpp_graph_date;
var twpp_graph_dat_num;
//DIグラフ用のデータ配
var twpp_graph_data_Wh = [];
//TWPPのチャート用定義
var twpp_chart_Wh;

function twpp_get_graph_data(obj, setdata) {

    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }

    // Graph date
    twpp_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        twpp_graph_time_Wh.length = 0;
        twpp_graph_data_Wh.length = 0;

        //データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間
            twpp_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                twpp_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                twpp_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }

        //
        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (twpp_graph_exist == false) {
            twpp_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            twpp_graph_exist = true;
        }
        else {
            twpp_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("twpp_Wh_chart_time").innerHTML = twpp_graph_date;
    }
    else if (obj.Status == 400) {
        twpp_graph_data_Wh[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (twpp_graph_exist == false) {
            twpp_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            twpp_graph_exist = true;
        }
        else {
            twpp_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("twpp_Wh_chart_time").innerHTML = twpp_graph_date;
    }
    else {

    }
}

/*  機能：
*/
function twpp_draw_graph(setdata) {
    //CANVAS 2d content オブジェクトを取得   グラフ用
    var canvas_Wh = document.getElementById("twpp_Wh_chart_canvas").getContext("2d");

    //グラフを描画
    twpp_chart_Wh = draw_graph_bar(canvas_Wh, twpp_graph_time_Wh, twpp_graph_data_Wh, twpp_graph_time_Wh.length, setdata.setting.set.Wh);
}

/*  機能：  AD、DI、電波強度のグラフを更新
*/
function twpp_update_graph(setdata) {
    //
    graph_bar_update(twpp_chart_Wh, twpp_graph_time_Wh, twpp_graph_data_Wh, twpp_graph_time_Wh.length, setdata.setting.set.Wh);
}

/**
 * グラフデータを削除
 */
function fncTwppGrpClr(type) {

    try {
        twpp_graph_data_Wh.length = 0;
    } catch (error) {

    }

    try {
        twpp_graph_time_Wh.length = 0;
    } catch (error) {

    }


    /**
     *
     */
    if (twpp_graph_exist == true) {
        twpp_chart_Wh.destroy();

        twpp_graph_exist = false;
    }
    else {

    }

    term = "#alertH_twpp";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#twppupdated_time").text("データ更新：----/--/-- --:--");
    $("#twpp_Wh_Energy").text("--");

    twpp_graph_type = type;
}



//const RS_twppCHG_QUERY = ""
const twpp_TITLE_ = "title_";
const twpp_GRAPHH_ = "graphH_";
const twpp_GRAPHL_ = "graphL_";
const twpp_ALARMH_ = "alarmH_";
const twpp_ALARML_ = "alarmL_";
const twpp_ALARMHE_ = "alarmHE_";
const twpp_ALARMLE_ = "alarmLE_";
/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：twppの価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_twpp_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var prefix;
    var suffix;

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + twpp_TITLE_ + suffix;
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

    //グラフの上限値
    ID_temp = prefix + twpp_GRAPHH_ + suffix;
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

    return true;
}

/**
 * TWPP設定ボタンをクリックの処理
 * 入力値をチェックしてから、サーバーに保存する
 */
function fncSaveSetting_TWPP(e) {
    if (check_twpp_input(e) == true) {
        var unitNo = ("000" + setTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[
            gcurrs].UnitNo.toString(16).toUpperCase()).substr(-4);
        set_twpp_setting(unitNo, e);
    };
}

/*  機能：  TWPP設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            e: 設定ボータン
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_twpp_setting(unitNo, e) {
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
    jsDat.Title = chr2sjis(document.getElementById(prefix + twpp_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + twpp_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + twpp_GRAPHH_ + suffix).value, settingpoint);
    //[AlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + twpp_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + twpp_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + twpp_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + twpp_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    jsDat.ClAlarmL = "000000000000";
    //[ClAlarmH]
    jsDat.ClAlarmH = "000000000000";
    jsDat.MODEL_CHECK = 0;
    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}


/*  機能：  TWP8C設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            i: TWP8Cの設定ボタンの順番
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function create_twpp_setting(unitNo, e) {
    var ch = e.target.id;
    var strGetQuery = unitNo;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "varh"];
    var iPoint;
    var settingpoint = 4;

    prefix = ch.split("_")[0] + "_";
    suffix = ch.split("_")[1];

    iPoint = gtwppSettingPointArray[prefix + suffix + "_Point"];
    console.log(prefix + suffix + "_Point");

    if (iPoint == undefined) {
        console.log(iPoint)
        iPoint = 0;
    }

    // ユニット計測要素
    strGetQuery += "_" + ch.split("_")[2] + "_" + ch.split("_")[3];
    // タイトル
    console.log(prefix + twpp_TITLE_ + suffix)
    strGetQuery += "_" + chr2sjis(document.getElementById(prefix + twpp_TITLE_ + suffix).value, 20);
    // グラフ下限
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + twpp_GRAPHL_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // グラフ上限
    strGetQuery += "_" + dec2hex(document.getElementById(prefix + twpp_GRAPHH_ + suffix).value * Math.pow(10, settingpoint), 0);
    // 警報下限
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + twpp_ALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // 警報上限
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + dec2hex(document.getElementById(prefix + twpp_ALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        strGetQuery += "_000000000000";
    }
    // 警報下限有無
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + ((document.getElementById(prefix + twpp_ALARMLE_ + suffix).checked == true) ? "1" : "0");
    }
    else {
        strGetQuery += "_0";
    }
    // 警報上限有無
    if (chkExclude.includes(suffix) == false) {
        strGetQuery += "_" + ((document.getElementById(prefix + twpp_ALARMHE_ + suffix).checked == true) ? "1" : "0");
    }
    else {
        strGetQuery += "_0";
    }
    // 下限警報解除値
    strGetQuery += "_000000000000";
    // 上限警報解除値
    strGetQuery += "_000000000000";

    return strGetQuery;
}


/**
 * twppの設定値を表示する
 *
 */
var gtwppSettingPointArray = {};
function twpp_loaddata_setting(obj, Type) {
    var settingpoint = 4;

    if (obj.Status == 200) {
        // Setting point clear
        gtwppSettingPointArray = {};
        console.log("TYPE:" + Type);
        prefix = "twpp_";
        suffix = "Wh";

        // タイトル
        $("#" + prefix + twpp_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
        // グラフ上限
        $("#" + prefix + twpp_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
        // 小数点値
        gtwppSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

    } else {
        //Debug
    }
}


/**
* TWPPデータ
*/
function get_InsDatTWPP(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twpp_Wh_Energy").text("--");
        $("#twppupdated_time").text("データ更新：----/--/-- --:--");

        var term = "#alertH_twpp";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "twpp";
        $("#twpp_Wh_Energy_Title").text(setting.setting.set.Wh.Title);

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title);
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });

    }
    else {
        unitNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (unitNoRequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {

        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                // 瞬時値＋更新時間を[--]に表示する
                $("#twpp_Wh_Energy").text("--");
                $("#twppupdated_time").text("データ更新：----/--/-- --:--");
            }
            // データがある
            else {
                var termdata;
                // 瞬時値＋更新時間を更新する
                $("#twppupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                if ((isNaN(obj.Respons.Data.Wh_Energy.Value) == true) || (obj.Respons.Data.Wh_Energy.Value === '') || (obj.Respons.Data.Wh_Energy.Value == null)) {
                    termdata = '';
                } else {
                    termdata = obj.Respons.Data.Wh_Energy.Value;
                }
                $("#twpp_Wh_Energy").text(termdata + " [kWh]");

                //*******************警報状態の更新*******************
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twpp";
                var alert_str1 = "";
                var unknown = false;
                var twppwarncheck = {
                    checkitem: [
                        {
                            ele: "Wh_Energy",
                            content: "電力量"
                        }
                    ]
                }

                for (i in twppwarncheck.checkitem) {
                    if (obj.Respons.Data[twppwarncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[twppwarncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_str1 = setting.setting.set.Wh.Title;
                        alert_exist = 1;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_str1 = setting.setting.set.Wh.Title;
                        alert_exist = 2;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        alert_str1 = setting.setting.set.Wh.Title;
                        //alert_exist = 3;
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
            // 瞬時値＋更新時間を[--]に表示する
            $("#twpp_Wh_Energy").text("--");
            $("#twppupdated_time").text("データ更新：----/--/-- --:--");

            //警報状態
            term = "#alertH_twpp";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}

/* TWPP ダイナミク瞬時データ表示作成 */
function fncTWPPInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwpptitle" class="h5 m-0 ">twpptitlestring \
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
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';


    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/twpptitlestring/g, title);
    return rtnval;
}

/* TWPPの設定値を表示 */
function fncTWPPDspData(tvid, unitNo, isUnitChg, twppsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twpp_set_tmp = {
            Wh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            }
        };

        twppsetting.setting = { "set": twpp_set_tmp };

        twppsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        twppsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        twppsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        twppsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        twppsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        twppsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        twppsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        twppsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        $('#' + tvid + "Wh_Energy_Title").text(twppsetting.setting.set.Wh.Title);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (twppsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null) || (unitSts == null)) {
            $('#' + tvid + "Wh_Energy").text("--");
            $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
        }
        else {
            $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
            $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        }

    }
    // isUnitChg == false
    else {
        if (twppsetting.setting != null) {
            $('#' + tvid + "Wh_Energy_Title").text(twppsetting.setting.set.Wh.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (twppsetting.setting == null) || (unitSts == null)) {
            $('#' + tvid + "Wh_Energy").text("--");
            $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
            return;
        }

        // 瞬時値を取得して、更新する
        rs485_insread_data(unitNo, function (obj, twppsetting) {
            if (obj.Status == 200) {
                if (obj.Respons.Data == null) {
                    // 瞬時値＋更新時間を[--]に表示する
                    $('#' + tvid + "Wh_Energy").text("--");
                    $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
                }
                else {
                    // 瞬時値＋更新時間を更新する
                    $('#' + tvid + "updated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                    $('#' + tvid + "Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                }
            }
            else {
                // 瞬時値＋更新時間を[--]に表示する
                $('#' + tvid + "Wh_Energy").text("--");
                $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
            }

        }, twppsetting);
    }
}

// TWPP設定画面を表示
function dispTwpp() {
    document.getElementById("rstype_twpp").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_twpp').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_twpp').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}
