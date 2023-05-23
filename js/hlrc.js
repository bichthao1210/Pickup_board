/*version=1.08*/
// Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

//HLR-C1用定数
const HLRC1_DIVAL = "#idhlrc1val";
const HLRC1_DISTS = "#hlrc1idstatus";
const HLRC1_GRPDIUNIT = "#idhlrc1grpunit_";
const HLRC1_GRPDIRST = "#idhlrc1btnreset_";
const HLRC1_GRPDITITLE = "#idhlrc1grptitle_";
const HLRC1_GRPDIHALRM = "#idhlrc1grphalrm_";
const HLRC1_GRPDIHEALRM = "#idhlrc1grphalrm_";
const HLRC1_DITITLE = "#idhlrc1_title_";
const HLRC1_DISTTTITLE = "#hlrc1idstatustitle";
const HLRC1_DOONBTN = "#hlrc1btndoon_";
const HLRC1_DOOFFBTN = "#hlrc1btndooff_";
const HLRC1_DOINTERLCKBTN = "#hlrc1btndointerlock_";

//HLR-C2用定数
const HLRC2_DIVAL = "#idhlrc2val";
const HLRC2_DISTS = "#hlrc2idstatus";
const HLRC2_GRPDIUNIT = "#idhlrc2grpunit_";
const HLRC2_GRPDIRST = "#idhlrc2btnreset_";
const HLRC2_GRPDITITLE = "#idhlrc2grptitle_";
const HLRC2_GRPDIHALRM = "#idhlrc2grphalrm_";
const HLRC2_GRPDIHEALRM = "#idhlrc2grphalrm_";
const HLRC2_DITITLE = "#idhlrc2_title_";
const HLRC2_DISTTTITLE = "#hlrc2idstatustitle";
const HLRC2_DOONBTN = "#hlrc2btndoon_";
const HLRC2_DOOFFBTN = "#hlrc2btndooff_";
const HLRC2_DOINTERLCKBTN = "#hlrc2btndointerlock_";

// ID
const HLRC_GRAPH_TITLE_ID_TERM = "set_title_";
const HLRC_INPUT_MULTI_ID_TERM = "set_input_multi_";
const HLRC_DEC_ID_TERM = "set_decimal_";
const HLRC_UNIT_ID_TERM = "set_unit_";
const HLRC_GRAPH_TYPE_ID_TERM = "set_graphType_";
const HLRC_GRAPHH_ID_TERM = "set_graphH_";
const HLRC_GRAPH_ALARMH_ID_TERM = "set_alarmH_";
const HLRC_GRAPH_ALARMHE_ID_TERM = "set_alarmHE_";
const HLRC_GRAPH_LMALARME_ID_TERM = "_InputRateChange_";
const HLRC_GRAPH_LSTATETOONMALARME_ID_TERM = "_InputStateChangeToOn_";
const HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM = "_InputStateChangeToOff_";

// グラフ用変数
var hlrc1_graph_exist = false;
var hlrc2_graph_exist = false;
//グラフ用の時間配
var hlrc_graph_date;

//DIグラフ用のデータ配
var hlrc_graph_data_di1_counter = [];
var hlrc_graph_data_di2_counter = [];
var hlrc_graph_data_di1_timer = [];
var hlrc_graph_data_di2_timer = [];
var hlrc_graph_data_dBm = [];

var hlrc_graph_time_di1_counter = [];
var hlrc_graph_time_di2_counter = [];
var hlrc_graph_time_di1_timer = [];
var hlrc_graph_time_di2_timer = [];
var hlrc_graph_time_do1_counter = [];

var hlrc1_chart_di1_counter;
var hlrc1_chart_di1_counter;
var hlrc1_chart_di1_timer;
var hlrc1_chart_dBm;
var hlrc2_chart_di1_counter;
var hlrc2_chart_di1_timer;
var hlrc2_chart_di2_counter;
var hlrc2_chart_di2_timer;
var hlrc2_chart_dBm;

/**
 * HLR-Cxのグラフデータをクリア
 */
function clear_grp_hlrc(type) {
    for (var i = 0; i < hlrc_graph_data_di1_counter.length; i++) {
        //強度
        hlrc_graph_data_dBm[i] = null;
        hlrc_graph_data_di1_counter[i] = null;
        hlrc_graph_data_di2_counter[i] = null;
        hlrc_graph_data_di1_timer[i] = null;
        hlrc_graph_data_di2_timer[i] = null;
    }

    switch (type) {
        case UnitCode.HLR_C1:
            if (hlrc1_graph_exist == true) {
                hlrc1_chart_di1_counter.destroy();
                hlrc1_chart_di1_timer.destroy();
                chart_dBm.destroy();
                hlrc1_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.HLR_C2:
            if (hlrc2_graph_exist == true) {
                hlrc2_chart_di1_counter.destroy();
                hlrc2_chart_di1_timer.destroy();
                hlrc2_chart_di2_counter.destroy();
                hlrc2_chart_di2_timer.destroy();
                chart_dBm.destroy();
                hlrc2_graph_exist = false;
            }
            else {

            }
            break;
    }

    // DI1 ********************************************************************
    var suffix = "di1";
    var term;
    //グラフのタイトル
    term = HLRC1_GRPDITITLE + suffix;
    $(term).html('--');
    //グラフの単位
    term = HLRC1_GRPDIUNIT + suffix;
    $(term).html('--');
    term = HLRC1_GRPDIHALRM + suffix;
    $(term).css({ "display": "none" });

    //カウンター
    //瞬時値テーブルで
    term = HLRC1_DIVAL + suffix;
    $(term).html("--");

    //オン・オフバーで
    term = HLRC1_DISTS + suffix;
    $(term).html("");
    $(term).removeClass("text-light shadow");
    $(term).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });
    // DI1 timer
    var suffix = "timer1";
    var term;
    //グラフのタイトル
    term = HLRC1_GRPDITITLE + suffix;
    $(term).html('--');
    //グラフの単位
    term = HLRC1_GRPDIUNIT + suffix;
    $(term).html('--');
    term = HLRC1_GRPDIHALRM + suffix;
    $(term).css({ "display": "none" });
    $("#hlrc1updated_time").html("データ更新：----/--/-- --:--");
    //カウンター
    //瞬時値テーブルで
    term = HLRC1_DIVAL + suffix;
    $(term).html("--");

    //電波強度
    $("#idhlrc1valdbm").html("--");
    //オン・オフバーで
    suffix = 'do1';
    $(HLRC1_DISTS + suffix).html("");
    $(HLRC1_DISTS + suffix).removeClass("text-light");
    $(HLRC1_DISTS + suffix).removeClass("text-light shadow");
    $(HLRC1_DISTS + suffix).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });

    var term = "#alertH_hlrc1";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");

    // HLR-C2 DI1 ********************************************************************
    var suffix = "di1";
    var term;
    //グラフのタイトル
    term = HLRC2_GRPDITITLE + suffix;
    $(term).html('--');
    //グラフの単位
    term = HLRC2_GRPDIUNIT + suffix;
    $(term).html('--');
    term = HLRC2_GRPDIHALRM + suffix;
    $(term).css({ "display": "none" });

    //カウンター
    //瞬時値テーブルで
    term = HLRC2_DIVAL + suffix;
    $(term).html("--");

    //オン・オフバーで
    term = HLRC2_DISTS + suffix;
    $(term).html("");
    $(term).removeClass("text-light shadow");
    $(term).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });

    // DI1 timer
    var suffix = "timer1";
    var term;
    //グラフのタイトル
    term = HLRC2_GRPDITITLE + suffix;
    $(term).html('--');
    //グラフの単位
    term = HLRC2_GRPDIUNIT + suffix;
    $(term).html('--');
    term = HLRC2_GRPDIHALRM + suffix;
    $(term).css({ "display": "none" });
    $("#hlrc2updated_time").html("データ更新：----/--/-- --:--");

    // DI2 ********************************************************************
    var suffix = "di2";
    var term;
    //グラフのタイトル
    term = HLRC2_GRPDITITLE + suffix;
    $(term).html('--');
    //グラフの単位
    term = HLRC2_GRPDIUNIT + suffix;
    $(term).html('--');
    term = HLRC2_GRPDIHALRM + suffix;
    $(term).css({ "display": "none" });

    //カウンター
    //瞬時値テーブルで
    term = HLRC2_DIVAL + suffix;
    $(term).html("--");

    //オン・オフバーで
    term = HLRC2_DISTS + suffix;
    $(term).html("");
    $(term).removeClass("text-light shadow");
    $(term).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });

    // DI2 timer
    var suffix = "timer2";
    var term;
    //グラフのタイトル
    term = HLRC2_GRPDITITLE + suffix;
    $(term).html('--');
    //グラフの単位
    term = HLRC2_GRPDIUNIT + suffix;
    $(term).html('--');
    term = HLRC2_GRPDIHALRM + suffix;
    $(term).css({ "display": "none" });

    //電波強度
    $("#idhlrc2valdbm").html("--");
    //オン・オフバーで
    suffix = 'do2';
    $(HLRC2_DISTS + suffix).html("");
    $(HLRC2_DISTS + suffix).removeClass("text-light");
    $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
    $(HLRC2_DISTS + suffix).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });

    //オン・オフバーで
    suffix = 'do1';
    $(HLRC2_DISTS + suffix).html("");
    $(HLRC2_DISTS + suffix).removeClass("text-light");
    $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
    $(HLRC2_DISTS + suffix).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });

    var term = "#alertH_hlrc2";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");

}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 * isUnitChg: true→初めての表示
 */
function fncLoadRealtimeDataHlrc1(hlrcsetting, tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + 'idhlrc1valdi1').text("--");
        $('#' + tvid + 'idhlrc1valtimer1').text("--");
        $('#' + tvid + "hlrc1idstatusdo1").text("");
        $('#' + tvid + "hlrc1idstatusdi1").text("");

        $('#' + tvid + "hlrc1idstatusdo1").removeClass("text-light shadow");
        $('#' + tvid + "hlrc1idstatusdo1").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "hlrc1idstatusdi1").removeClass("text-light shadow");
        $('#' + tvid + "hlrc1idstatusdi1").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "idhlrc1valdbm").text("--");
        $('#' + tvid + 'hlrc1updated_time').text('データ更新：----/--/-- --:--');
    }
    else {

        // 通信正常、瞬時値がある場合
        var termdata;
        $('#' + tvid + 'hlrc1updated_time').text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + 'idhlrc1valdbm').text(realtimeObj.RSSI + " [dBm]");

        termdata = parseInt(realtimeObj.Data.do1_output.State, 16);
        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "hlrc1idstatusdo1").html("OFF");
            $('#' + tvid + "hlrc1idstatusdo1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc1idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "hlrc1idstatusdo1").html("ON");
            $('#' + tvid + "hlrc1idstatusdo1").addClass("text-light shadow");
            $('#' + tvid + "hlrc1idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "hlrc1idstatusdo1").html("--");
            $('#' + tvid + "hlrc1idstatusdo1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc1idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }


        $('#' + tvid + "idhlrc1valdi1").text(parseFloat(realtimeObj.Data.di1_counter.Value).toFixed(hlrcsetting.setting.diset.DI1.Point) + " [" + hlrcsetting.setting.diset.DI1.Unit + "]");
        $('#' + tvid + 'idhlrc1valtimer1').text(parseFloat(realtimeObj.Data.di1_timer.Value).toFixed(hlrcsetting.setting.diset.DI1_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI1_TIMER.Unit + "]");

        termdata = parseInt(realtimeObj.Data.di1_status.State, 16);

        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "hlrc1idstatusdi1").html("OFF");
            $('#' + tvid + "hlrc1idstatusdi1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc1idstatusdi1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "hlrc1idstatusdi1").html("ON");
            $('#' + tvid + "hlrc1idstatusdi1").addClass("text-light shadow");
            $('#' + tvid + "hlrc1idstatusdi1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "hlrc1idstatusdi1").html("--");
            $('#' + tvid + "hlrc1idstatusdi1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc1idstatusdi1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }

    }

}

/**
* HLR-C1瞬時値データを表示。
*/
function fncHlrc1DspData(tvid, UnitNo, isUnitChg, hlrcsetting, unitSts, settingObj, realtimeObj) {
    // 最初、ALLDATA表示で設定値、瞬時値を表示する
    if (isUnitChg == true) {
        // 設定値を取得して、バックアップする
        var hlrcdi_set_tmp = {
            DI1:
            {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI1_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI2:
            {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI2_TIMER:
            {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            }
        };

        var hlrcdo_set_tmp = {
            DO1:
            {
                "Title": "DO1",
                "Alarm": [0, 0],
                "Control": 0
            },
            DO2:
            {
                "Title": "DO2",
                "Alarm": [0, 0],
                "Control": 0
            }
        };
        
        var rssi = {
            'Title': "電波強度",
            'Unit': chr2sjis("dBm"),
            'Graph': [-140, 0],
            'Point': 0
        };


        hlrcsetting.setting = { "diset": hlrcdi_set_tmp, "doset": hlrcdo_set_tmp, "rssi": rssi};

        hlrcsetting.setting.diset.DI1.Title = jis2chr(settingObj.di1_counter.Title);
        hlrcsetting.setting.diset.DI1.Multi = parseInt(settingObj.di1_counter.Multi, 16);
        hlrcsetting.setting.diset.DI1.Point = settingObj.di1_counter.Point;
        hlrcsetting.setting.diset.DI1.Unit = jis2chr(settingObj.di1_counter.Unit);
        hlrcsetting.setting.diset.DI1.GraphType = parseInt(settingObj.di1_counter.GraphType, 16)
        hlrcsetting.setting.diset.DI1.Graph[0] = settingObj.di1_counter.Graph[0];
        hlrcsetting.setting.diset.DI1.Graph[1] = settingObj.di1_counter.Graph[1];
        hlrcsetting.setting.diset.DI1.Alarm[0] = settingObj.di1_counter.Alarm[0];
        hlrcsetting.setting.diset.DI1.Alarm[1] = settingObj.di1_counter.Alarm[1];
        hlrcsetting.setting.diset.DI1.AlarmE[0] = settingObj.di1_counter.AlarmE[0];
        hlrcsetting.setting.diset.DI1.AlarmE[1] = settingObj.di1_counter.AlarmE[1];

        hlrcsetting.setting.diset.DI1_TIMER.Title = jis2chr(settingObj.di1_timer.Title);
        hlrcsetting.setting.diset.DI1_TIMER.Multi = parseInt(settingObj.di1_timer.Multi, 16);
        hlrcsetting.setting.diset.DI1_TIMER.Point = settingObj.di1_timer.Point;
        hlrcsetting.setting.diset.DI1_TIMER.Unit = jis2chr(settingObj.di1_timer.Unit);
        hlrcsetting.setting.diset.DI1_TIMER.GraphType = parseInt(settingObj.di1_timer.GraphType, 16)
        hlrcsetting.setting.diset.DI1_TIMER.Graph[0] = settingObj.di1_timer.Graph[0];
        hlrcsetting.setting.diset.DI1_TIMER.Graph[1] = settingObj.di1_timer.Graph[1];
        hlrcsetting.setting.diset.DI1_TIMER.Alarm[0] = settingObj.di1_timer.Alarm[0];
        hlrcsetting.setting.diset.DI1_TIMER.Alarm[1] = settingObj.di1_timer.Alarm[1];
        hlrcsetting.setting.diset.DI1_TIMER.AlarmE[0] = settingObj.di1_timer.AlarmE[0];
        hlrcsetting.setting.diset.DI1_TIMER.AlarmE[1] = settingObj.di1_timer.AlarmE[1];

        hlrcsetting.setting.doset.DO1.Title = "DO1";
        hlrcsetting.setting.doset.DO1.Control = settingObj.do1_output.Ctrol;

        hlrcsetting.setting.rssi.Title = (settingObj) ? (settingObj.RSSI_Title) : '';

        $('#' + tvid + 'idhlrc1_title_di1').text(hlrcsetting.setting.diset.DI1.Title);
        $('#' + tvid + 'idhlrc1_title_timer1').text(hlrcsetting.setting.diset.DI1_TIMER.Title);
        $('#' + tvid + 'hlrc1idstatustitledi1').text(hlrcsetting.setting.diset.DI1.Title);
        $('#' + tvid + 'idhlrc1titledbm').text(jis2chr(hlrcsetting.setting.rssi.Title));

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlrcsetting.type, settingObj, UnitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrcsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            // 複合グラフ表示のように瞬時値をバックアップする
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc1(hlrcsetting, tvid, retobj);
        }
        else {
            // 複合グラフ表示のように瞬時値をバックアップする
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancehlrc(tmpObj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc1(hlrcsetting, tvid, realtimeObj);
        }

    }
    else {
        if (hlrcsetting.setting !== null) {
            /* Title */
            $('#' + tvid + 'idhlrc1_title_di1').text(hlrcsetting.setting.diset.DI1.Title);
            $('#' + tvid + 'idhlrc1_title_timer1').text(hlrcsetting.setting.diset.DI1_TIMER.Title);
            $('#' + tvid + 'hlrc1idstatustitledi1').text(hlrcsetting.setting.diset.DI1.Title);
            // rssi
            $('#' + tvid + 'idhlrc1titledbm').text(jis2chr(hlrcsetting.setting.rssi.Title));
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrcsetting.setting == null)) {
            // 複合グラフ表示のように瞬時値をバックアップする
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc1(hlrcsetting, tvid, retobj);
            return;
        }

        rs485_insread_data(UnitNo, function (obj, hlrcsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // 複合グラフ表示のように瞬時値をバックアップする
                fncDoSaveInstancehlrc(obj, UnitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc1(hlrcsetting, tvid, obj.Respons);

        }, hlrcsetting);

    }
}


/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrcsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 * isUnitChg: true→初めての表示
 */
function fncLoadRealtimeDataHlrc2(hlrcsetting, tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + 'idhlrc2valdi1').text("--");
        $('#' + tvid + 'idhlrc2valtimer1').text("--");
        $('#' + tvid + 'idhlrc2valdi2').text("--");
        $('#' + tvid + 'idhlrc2valtimer2').text("--");
        $('#' + tvid + "hlrc2idstatusdo1").text("");
        $('#' + tvid + "hlrc2idstatusdi1").text("");
        $('#' + tvid + "hlrc2idstatusdo2").text("");
        $('#' + tvid + "hlrc2idstatusdi2").text("");

        $('#' + tvid + "hlrc2idstatusdo1").removeClass("text-light shadow");
        $('#' + tvid + "hlrc2idstatusdo1").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "hlrc2idstatusdo2").removeClass("text-light shadow");
        $('#' + tvid + "hlrc2idstatusdo2").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "hlrc2idstatusdi1").removeClass("text-light shadow");
        $('#' + tvid + "hlrc2idstatusdi1").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "hlrc2idstatusdi2").removeClass("text-light shadow");
        $('#' + tvid + "hlrc2idstatusdi2").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + 'hlrc2updated_time').text('データ更新：----/--/-- --:--');
        $('#' + tvid + 'idhlrc2valdbm').text('--');
    }
    else {

        // 通信正常、瞬時値がある場合
        var termdata;
        $('#' + tvid + 'hlrc2updated_time').text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + 'idhlrc2valdbm').text(realtimeObj.RSSI + " [dBm]");

        $('#' + tvid + 'idhlrc2valdi1').text(parseFloat(realtimeObj.Data.di1_counter.Value).toFixed(hlrcsetting.setting.diset.DI1.Point) + " [" + hlrcsetting.setting.diset.DI1.Unit + "]");
        $('#' + tvid + 'idhlrc2valtimer1').text(parseFloat(realtimeObj.Data.di1_timer.Value).toFixed(hlrcsetting.setting.diset.DI1_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI1_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc2valdi2').text(parseFloat(realtimeObj.Data.di2_counter.Value).toFixed(hlrcsetting.setting.diset.DI2.Point) + " [" + hlrcsetting.setting.diset.DI2.Unit + "]");
        $('#' + tvid + 'idhlrc2valtimer2').text(parseFloat(realtimeObj.Data.di2_timer.Value).toFixed(hlrcsetting.setting.diset.DI2_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI2_TIMER.Unit + "]");

        /**************************************DO1****************************/
        termdata = parseInt(realtimeObj.Data.do1_output.State, 16);
        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "hlrc2idstatusdo1").html("OFF");
            $('#' + tvid + "hlrc2idstatusdo1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "hlrc2idstatusdo1").html("ON");
            $('#' + tvid + "hlrc2idstatusdo1").addClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "hlrc2idstatusdo1").html("--");
            $('#' + tvid + "hlrc2idstatusdo1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }

        /**************************************DI1****************************/
        termdata = parseInt(realtimeObj.Data.di1_status.State, 16);
        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "hlrc2idstatusdi1").html("OFF");
            $('#' + tvid + "hlrc2idstatusdi1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdi1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "hlrc2idstatusdi1").html("ON");
            $('#' + tvid + "hlrc2idstatusdi1").addClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdi1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "hlrc2idstatusdi1").html("--");
            $('#' + tvid + "hlrc2idstatusdi1").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdi1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        /**************************************DO2****************************/
        termdata = parseInt(realtimeObj.Data.do2_output.State, 16);
        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "hlrc2idstatusdo2").html("OFF");
            $('#' + tvid + "hlrc2idstatusdo2").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdo2").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "hlrc2idstatusdo2").html("ON");
            $('#' + tvid + "hlrc2idstatusdo2").addClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdo2").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "hlrc2idstatusdo2").html("--");
            $('#' + tvid + "hlrc2idstatusdo2").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdo2").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        /**************************************DI2****************************/
        termdata = parseInt(realtimeObj.Data.di2_status.State, 16);

        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "hlrc2idstatusdi2").html("OFF");
            $('#' + tvid + "hlrc2idstatusdi2").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdi2").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "hlrc2idstatusdi2").html("ON");
            $('#' + tvid + "hlrc2idstatusdi2").addClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdi2").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "hlrc2idstatusdi2").html("--");
            $('#' + tvid + "hlrc2idstatusdi2").removeClass("text-light shadow");
            $('#' + tvid + "hlrc2idstatusdi2").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
    }

}

/**
* HLR-C2瞬時値データを表示。
*/
function fncHlrc2DspData(tvid, UnitNo, isUnitChg, hlrcsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var hlrcdi_set_tmp = {
            DI1:
            {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI1_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI2:
            {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI2_TIMER:
            {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
        };

        var hlrcdo_set_tmp = {
            DO1:
            {
                "Title": "DO1",
                "Alarm": [0, 0],
                "Control": 0
            },
            DO2:
            {
                "Title": "DO2",
                "Alarm": [0, 0],
                "Control": 0
            }
        };

        var rssi = {
            'Title': "電波強度",
            'Unit': chr2sjis("dBm"),
            'Graph': [-140, 0],
            'Point': 0
        };


        hlrcsetting.setting = { "diset": hlrcdi_set_tmp, "doset": hlrcdo_set_tmp, "rssi": rssi };

        hlrcsetting.setting.diset.DI1.Title = jis2chr(settingObj.di1_counter.Title);
        hlrcsetting.setting.diset.DI1.Multi = parseInt(settingObj.di1_counter.Multi, 16);
        hlrcsetting.setting.diset.DI1.Point = settingObj.di1_counter.Point;
        hlrcsetting.setting.diset.DI1.Unit = jis2chr(settingObj.di1_counter.Unit);
        hlrcsetting.setting.diset.DI1.GraphType = parseInt(settingObj.di1_counter.GraphType, 16)
        hlrcsetting.setting.diset.DI1.Graph[0] = settingObj.di1_counter.Graph[0];
        hlrcsetting.setting.diset.DI1.Graph[1] = settingObj.di1_counter.Graph[1];
        hlrcsetting.setting.diset.DI1.Alarm[0] = settingObj.di1_counter.Alarm[0];
        hlrcsetting.setting.diset.DI1.Alarm[1] = settingObj.di1_counter.Alarm[1];
        hlrcsetting.setting.diset.DI1.AlarmE[0] = settingObj.di1_counter.AlarmE[0];
        hlrcsetting.setting.diset.DI1.AlarmE[1] = settingObj.di1_counter.AlarmE[1];

        hlrcsetting.setting.diset.DI1_TIMER.Title = jis2chr(settingObj.di1_timer.Title);
        hlrcsetting.setting.diset.DI1_TIMER.Multi = parseInt(settingObj.di1_timer.Multi, 16);
        hlrcsetting.setting.diset.DI1_TIMER.Point = settingObj.di1_timer.Point;
        hlrcsetting.setting.diset.DI1_TIMER.Unit = jis2chr(settingObj.di1_timer.Unit);
        hlrcsetting.setting.diset.DI1_TIMER.GraphType = parseInt(settingObj.di1_timer.GraphType, 16)
        hlrcsetting.setting.diset.DI1_TIMER.Graph[0] = settingObj.di1_timer.Graph[0];
        hlrcsetting.setting.diset.DI1_TIMER.Graph[1] = settingObj.di1_timer.Graph[1];
        hlrcsetting.setting.diset.DI1_TIMER.Alarm[0] = settingObj.di1_timer.Alarm[0];
        hlrcsetting.setting.diset.DI1_TIMER.Alarm[1] = settingObj.di1_timer.Alarm[1];
        hlrcsetting.setting.diset.DI1_TIMER.AlarmE[0] = settingObj.di1_timer.AlarmE[0];
        hlrcsetting.setting.diset.DI1_TIMER.AlarmE[1] = settingObj.di1_timer.AlarmE[1];

        hlrcsetting.setting.diset.DI2.Title = jis2chr(settingObj.di2_counter.Title);
        hlrcsetting.setting.diset.DI2.Multi = parseInt(settingObj.di2_counter.Multi, 16);
        hlrcsetting.setting.diset.DI2.Point = settingObj.di2_counter.Point;
        hlrcsetting.setting.diset.DI2.Unit = jis2chr(settingObj.di2_counter.Unit);
        hlrcsetting.setting.diset.DI2.GraphType = parseInt(settingObj.di2_counter.GraphType, 16)
        hlrcsetting.setting.diset.DI2.Graph[0] = settingObj.di2_counter.Graph[0];
        hlrcsetting.setting.diset.DI2.Graph[1] = settingObj.di2_counter.Graph[1];
        hlrcsetting.setting.diset.DI2.Alarm[0] = settingObj.di2_counter.Alarm[0];
        hlrcsetting.setting.diset.DI2.Alarm[1] = settingObj.di2_counter.Alarm[1];
        hlrcsetting.setting.diset.DI2.AlarmE[0] = settingObj.di2_counter.AlarmE[0];
        hlrcsetting.setting.diset.DI2.AlarmE[1] = settingObj.di2_counter.AlarmE[1];

        hlrcsetting.setting.diset.DI2_TIMER.Title = jis2chr(settingObj.di2_timer.Title);
        hlrcsetting.setting.diset.DI2_TIMER.Multi = parseInt(settingObj.di2_timer.Multi, 16);
        hlrcsetting.setting.diset.DI2_TIMER.Point = settingObj.di2_timer.Point;
        hlrcsetting.setting.diset.DI2_TIMER.Unit = jis2chr(settingObj.di2_timer.Unit);
        hlrcsetting.setting.diset.DI2_TIMER.GraphType = parseInt(settingObj.di2_timer.GraphType, 16)
        hlrcsetting.setting.diset.DI2_TIMER.Graph[0] = settingObj.di2_timer.Graph[0];
        hlrcsetting.setting.diset.DI2_TIMER.Graph[1] = settingObj.di2_timer.Graph[1];
        hlrcsetting.setting.diset.DI2_TIMER.Alarm[0] = settingObj.di2_timer.Alarm[0];
        hlrcsetting.setting.diset.DI2_TIMER.Alarm[1] = settingObj.di2_timer.Alarm[1];
        hlrcsetting.setting.diset.DI2_TIMER.AlarmE[0] = settingObj.di2_timer.AlarmE[0];
        hlrcsetting.setting.diset.DI2_TIMER.AlarmE[1] = settingObj.di2_timer.AlarmE[1];

        hlrcsetting.setting.doset.DO1.Title = "DO1";
        hlrcsetting.setting.doset.DO1.Control = settingObj.do1_output.Ctrol;

        hlrcsetting.setting.doset.DO2.Title = "DO2";
        hlrcsetting.setting.doset.DO2.Control = settingObj.do2_output.Ctrol;

        hlrcsetting.setting.rssi.Title = (settingObj) ? (settingObj.RSSI_Title) : '';

        $('#' + tvid + 'idhlrc2_title_di1').text(hlrcsetting.setting.diset.DI1.Title);
        $('#' + tvid + 'idhlrc2_title_timer1').text(hlrcsetting.setting.diset.DI1_TIMER.Title);
        $('#' + tvid + 'idhlrc2_title_di2').text(hlrcsetting.setting.diset.DI2.Title);
        $('#' + tvid + 'idhlrc2_title_timer2').text(hlrcsetting.setting.diset.DI2_TIMER.Title);
        $('#' + tvid + 'hlrc2idstatustitledi1').text(hlrcsetting.setting.diset.DI1.Title);
        $('#' + tvid + 'hlrc2idstatustitledi2').text(hlrcsetting.setting.diset.DI2.Title);
        $('#' + tvid + 'idhlrc2titledbm').text(jis2chr(hlrcsetting.setting.rssi.Title));

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlrcsetting.type, settingObj, UnitNo);


        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrcsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            // Save the realtime data for combine group display
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc2(hlrcsetting, tvid, retobj);
        }
        else {
            // Save the realtime data for combine group display
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancehlrc(tmpObj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc2(hlrcsetting, tvid, realtimeObj);
        }
    }
    else {
        if (hlrcsetting.setting !== null) {
            /* Title */
            $('#' + tvid + 'idhlrc2_title_di1').text(hlrcsetting.setting.diset.DI1.Title);
            $('#' + tvid + 'idhlrc2_title_timer1').text(hlrcsetting.setting.diset.DI1_TIMER.Title);
            $('#' + tvid + 'idhlrc2_title_di2').text(hlrcsetting.setting.diset.DI2.Title);
            $('#' + tvid + 'idhlrc2_title_timer2').text(hlrcsetting.setting.diset.DI2_TIMER.Title);
            $('#' + tvid + 'hlrc2idstatustitledi1').text(hlrcsetting.setting.diset.DI1.Title);
            $('#' + tvid + 'hlrc2idstatustitledi2').text(hlrcsetting.setting.diset.DI2.Title);
            // rssi
            $('#' + tvid + 'idhlrc2titledbm').text(jis2chr(hlrcsetting.setting.rssi.Title));
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrcsetting.setting == null)) {
            // Save the realtime data for combine group display
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc2(hlrcsetting, tvid, retobj);
            return;
        }

        rs485_insread_data(UnitNo, function (obj, hlrcsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlrc(obj, UnitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc2(hlrcsetting, tvid, obj.Respons);

        }, hlrcsetting);

    }
}

/**
 * hlr instance save
 */
function fncDoSaveInstancehlrc(obj, UnitNo, gwid) {
    // Save Instance Data for Combine Graph
    var retobj = obj;
    if (obj.Status == 200) {
        if (obj.Respons.Data == null) {
            retobj = null;
        }
        else {
            retobj.Respons.Data["rssi"] = { Value: obj.Respons.RSSI };
        }
    }

    fncSaveInstanceforCombiGraph(retobj, UnitNo, gwid);
}

/* HLR-C1ダイナミク瞬時データ表示作成 */
function fncHlrc1InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlrctitle" class="h5 m-0">hlrctitlestring \
            </h4> \
            <h6 id="hlrc1updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="idhlrc1_title_di1" class="text-center table-active" ></th> \
                            <td id="idhlrc1valdi1" colspan="2" class="text-right">--</td> \
                            <th id="idhlrc1_title_timer1" class="text-center table-active"></th> \
                            <td id="idhlrc1valtimer1" colspan="2" class="text-right">--</td> \
                            <th id="idhlrc1titledbm" class="text-center table-active">電波強度</th> \
                            <td id="idhlrc1valdbm" colspan="2" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
                \
            <!-- DI/DO ON/OFF --> \
            <div class="no-gutters border border-top-0 rounded-bottom"> \
                <div class="col-lg d-flex align-items-center justify-content-around p-1 border-0 flex-wrap"> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div class="mt-2  mr-1 border rounded text-dark h6 p-1 text-nowrap">DO1出力</div> \
                        <div id="hlrc1idstatusdo1" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="hlrc1idstatustitledi1" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI1</div> \
                        <div id="hlrc1idstatusdi1" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlrctitle/g, tvid + "idhlrctitle");
    rtnval = rtnval.replace(/idhlrc1valdi1/g, tvid + "idhlrc1valdi1");
    rtnval = rtnval.replace(/idhlrc1valtimer1/g, tvid + "idhlrc1valtimer1");
    rtnval = rtnval.replace(/idhlrc1_title_di1/g, tvid + "idhlrc1_title_di1");
    rtnval = rtnval.replace(/hlrc1idstatustitledi/g, tvid + "hlrc1idstatustitledi");
    rtnval = rtnval.replace(/idhlrc1_title_timer1/g, tvid + "idhlrc1_title_timer1");
    rtnval = rtnval.replace(/idhlrc1titledbm/g, tvid + "idhlrc1titledbm");
    rtnval = rtnval.replace(/idhlrc1valdbm/g, tvid + "idhlrc1valdbm");
    rtnval = rtnval.replace(/hlrc1idstatusdo/g, tvid + "hlrc1idstatusdo");
    rtnval = rtnval.replace(/hlrc1idstatusdi/g, tvid + "hlrc1idstatusdi");
    rtnval = rtnval.replace(/hlrc1updated_time/g, tvid + "hlrc1updated_time");
    rtnval = rtnval.replace(/hlrctitlestring/g, title);

    return rtnval;
}

/* HLR-C2ダイナミク瞬時データ表示作成 */
function fncHlrc2InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlrctitle" class="h5 m-0">hlrctitlestring \
            </h4> \
            <h6 id="hlrc2updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="idhlrc2_title_di1" class="text-center table-active"></th> \
                            <td id="idhlrc2valdi1" colspan="2" class="text-right">--</td> \
                            <th id="idhlrc2_title_timer1" class="text-center table-active"></th> \
                            <td id="idhlrc2valtimer1" colspan="2" class="text-right">--</td> \
                            <th id="idhlrc2titledbm" class="text-center table-active">電波強度</th> \
                            <td id="idhlrc2valdbm" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <th id="idhlrc2_title_di2" class="text-center table-active"></th> \
                            <td id="idhlrc2valdi2" colspan="2" class="text-right">--</td> \
                            <th id="idhlrc2_title_timer2" class="text-center table-active"></th> \
                            <td id="idhlrc2valtimer2" colspan="2" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
                \
            <!-- DI/DO ON/OFF --> \
            <div class="no-gutters border border-top-0 rounded-bottom"> \
                <div class="col-lg d-flex align-items-center justify-content-around p-1 border-0 flex-wrap"> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div class="mt-2  mr-1 border rounded text-dark h6 p-1 text-nowrap">DO1出力</div> \
                        <div id="hlrc2idstatusdo1" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div class="mt-2  mr-1 border rounded text-dark h6 p-1 text-nowrap">DO2出力</div> \
                        <div id="hlrc2idstatusdo2" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="hlrc2idstatustitledi1" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI1</div> \
                        <div id="hlrc2idstatusdi1" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="hlrc2idstatustitledi2" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI2</div> \
                        <div id="hlrc2idstatusdi2" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlrctitle/g, tvid + "idhlrctitle");
    rtnval = rtnval.replace(/idhlrc2valdi/g, tvid + "idhlrc2valdi");
    rtnval = rtnval.replace(/idhlrc2valtimer/g, tvid + "idhlrc2valtimer");
    rtnval = rtnval.replace(/idhlrc2_title_di/g, tvid + "idhlrc2_title_di");
    rtnval = rtnval.replace(/hlrc2idstatustitledi/g, tvid + "hlrc2idstatustitledi");
    rtnval = rtnval.replace(/idhlrc2_title_timer/g, tvid + "idhlrc2_title_timer");
    rtnval = rtnval.replace(/idhlrc2titledbm/g, tvid + "idhlrc2titledbm");
    rtnval = rtnval.replace(/idhlrc2valdbm/g, tvid + "idhlrc2valdbm");
    rtnval = rtnval.replace(/hlrc2idstatusdo/g, tvid + "hlrc2idstatusdo");
    rtnval = rtnval.replace(/hlrc2idstatusdi/g, tvid + "hlrc2idstatusdi");
    rtnval = rtnval.replace(/hlrc2updated_time/g, tvid + "hlrc2updated_time");
    rtnval = rtnval.replace(/hlrctitlestring/g, title);

    return rtnval;
}


/**
 * HLR-C1 instance setting display
 */
function displayhlrc1setting(setdata) {
    // 設定値データを表示させる
    if (setdata.setting !== null) {
        var term;
        var term2;

        // DI1 ********************************************************************
        var suffix = "di1";
        //グラフのタイトル
        term = HLRC1_GRPDITITLE + suffix;
        term2 = setdata.setting.diset.DI1.Title;
        $(term).html(term2);

        //グラフの単位
        term = HLRC1_GRPDIUNIT + suffix;
        term2 = " [" + setdata.setting.diset.DI1.Unit + "]";
        $(term).html(term2);

        //瞬時値タイトル
        term = HLRC1_DITITLE + suffix;
        term2 = setdata.setting.diset.DI1.Title;
        $(term).html(term2);

        //DI状態のタイトル
        term = HLRC1_DISTTTITLE + suffix;
        term2 = setdata.setting.diset.DI1.Title;
        $(term).html(term2);

        // 上限警報発生値
        term = HLRC1_GRPDIHALRM + suffix;
        term2 = "上限警報発生値 " + setdata.setting.diset.DI1.Alarm[1].toFixed(setdata.setting.diset.DI1.Point) + " [" + setdata.setting.diset.DI1.Unit + "]";
        $(term).html(term2);
        $(term).css({ "display": "block" });

        // 警報上限有無
        term = HLRC1_GRPDIHEALRM + suffix;
        if ((setdata.setting.diset.DI1.AlarmE[1] == 1) && (setdata.setting.diset.DI1.GraphType == 0)) {
            $(term).css({ "display": "block" })
        }
        else {
            $(term).css({ "display": "none" })
        }
        // Preset
        suffix = 'di1_counter';
        if (setdata.setting.diset.DI1.GraphType == 0) {
            term = HLRC1_GRPDIRST + suffix;
            $(term).css({ "display": "block" });
        }
        else {
            term = HLRC1_GRPDIRST + suffix;
            $(term).css({ "display": "none" });
        }

        // DI1 Time ********************************************************************
        var suffix = "timer1";
        //グラフのタイトル
        term = HLRC1_GRPDITITLE + suffix;
        term2 = setdata.setting.diset.DI1_TIMER.Title;
        $(term).html(term2);

        //グラフの単位
        term = HLRC1_GRPDIUNIT + suffix;
        term2 = " [" + setdata.setting.diset.DI1_TIMER.Unit + "]";
        $(term).html(term2);

        //瞬時値タイトル
        term = HLRC1_DITITLE + suffix;
        term2 = setdata.setting.diset.DI1_TIMER.Title;
        $(term).html(term2);

        // 上限警報発生値
        term = HLRC1_GRPDIHALRM + suffix;
        term2 = "上限警報発生値 " + setdata.setting.diset.DI1_TIMER.Alarm[1].toFixed(setdata.setting.diset.DI1_TIMER.Point) + " [" + setdata.setting.diset.DI1_TIMER.Unit + "]";
        $(term).html(term2);
        $(term).css({ "display": "block" });

        // 警報上限有無
        term = HLRC1_GRPDIHEALRM + suffix;
        if ((setdata.setting.diset.DI1_TIMER.AlarmE[1] == 1) && (setdata.setting.diset.DI1_TIMER.GraphType == 0)) {
            $(term).css({ "display": "block" })
        }
        else {
            $(term).css({ "display": "none" })
        }

        // Preset
        suffix = 'di1_timer';
        if (setdata.setting.diset.DI1_TIMER.GraphType == 0) {
            term = HLRC1_GRPDIRST + suffix;
            $(term).css({ "display": "block" });
        }
        else {
            term = HLRC1_GRPDIRST + suffix;
            $(term).css({ "display": "none" });
        }

        //dBmのタイトル
        term2 = jis2chr(setdata.setting.rssi.Title);
        $('#idhlrc1titledbm').html(term2);
        $('#idhlrc1grptitledbm').html(term2);

        // DO1 ********************************************************************
        suffix = "do1";
        if (setdata.setting.doset.DO1.Control == 0) {
            $(HLRC1_DOONBTN + suffix).css({ "display": "none" });
            $(HLRC1_DOOFFBTN + suffix).css({ "display": "none" });
            $(HLRC1_DOINTERLCKBTN + suffix).css({ "display": "none" });
        } else if (setdata.setting.doset.DO1.Control == 65280) {
            $(HLRC1_DOONBTN + suffix).css({ "display": "none" });
            $(HLRC1_DOOFFBTN + suffix).css({ "display": "none" });
            $(HLRC1_DOINTERLCKBTN + suffix).css({ "display": "block" });
        }
    }
}

/**
 * HLR-C2 instance setting display
 */
function displayhlrc2setting(setdata) {
    // 設定値データを表示させる
    if (setdata.setting !== null) {
        var term;
        var term2;

        // DI1 ********************************************************************
        var suffix = "di1";
        //グラフのタイトル
        term = HLRC2_GRPDITITLE + suffix;
        term2 = setdata.setting.diset.DI1.Title;
        $(term).html(term2);

        //グラフの単位
        term = HLRC2_GRPDIUNIT + suffix;
        term2 = " [" + setdata.setting.diset.DI1.Unit + "]";
        $(term).html(term2);

        //瞬時値タイトル
        term = HLRC2_DITITLE + suffix;
        term2 = setdata.setting.diset.DI1.Title;
        $(term).html(term2);

        //DI状態のタイトル
        term = HLRC2_DISTTTITLE + suffix;
        term2 = setdata.setting.diset.DI1.Title;
        $(term).html(term2);

        // 上限警報発生値
        term = HLRC2_GRPDIHALRM + suffix;
        term2 = "上限警報発生値 " + setdata.setting.diset.DI1.Alarm[1].toFixed(setdata.setting.diset.DI1.Point) + " [" + setdata.setting.diset.DI1.Unit + "]";
        $(term).html(term2);
        $(term).css({ "display": "block" });

        // 警報上限有無
        term = HLRC2_GRPDIHEALRM + suffix;
        if ((setdata.setting.diset.DI1.AlarmE[1] == 1) && (setdata.setting.diset.DI1.GraphType == 0)) {
            $(term).css({ "display": "block" });
        }
        else {
            $(term).css({ "display": "none" });
        }
        // Preset
        suffix = 'di1_counter';
        if (setdata.setting.diset.DI1.GraphType == 0) {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "block" });
        }
        else {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "none" });
        }

        // DI1 Time ********************************************************************
        var suffix = "timer1";
        //グラフのタイトル
        term = HLRC2_GRPDITITLE + suffix;
        term2 = setdata.setting.diset.DI1_TIMER.Title;
        $(term).html(term2);

        //グラフの単位
        term = HLRC2_GRPDIUNIT + suffix;
        term2 = " [" + setdata.setting.diset.DI1_TIMER.Unit + "]";
        $(term).html(term2);

        //瞬時値タイトル
        term = HLRC2_DITITLE + suffix;
        term2 = setdata.setting.diset.DI1_TIMER.Title;
        $(term).html(term2);

        // 上限警報発生値
        term = HLRC2_GRPDIHALRM + suffix;
        term2 = "上限警報発生値 " + setdata.setting.diset.DI1_TIMER.Alarm[1].toFixed(setdata.setting.diset.DI1_TIMER.Point) + " [" + setdata.setting.diset.DI1_TIMER.Unit + "]";
        $(term).html(term2);
        $(term).css({ "display": "block" });

        // 警報上限有無
        term = HLRC2_GRPDIHEALRM + suffix;
        if ((setdata.setting.diset.DI1_TIMER.AlarmE[1] == 1) && (setdata.setting.diset.DI1_TIMER.GraphType == 0)) {
            $(term).css({ "display": "block" });
        }
        else {
            $(term).css({ "display": "none" });
        }

        // Preset
        suffix = 'di1_timer';
        if (setdata.setting.diset.DI1_TIMER.GraphType == 0) {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "block" });
        }
        else {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "none" });
        }

        // DI2 ********************************************************************
        var suffix = "di2";
        //グラフのタイトル
        term = HLRC2_GRPDITITLE + suffix;
        term2 = setdata.setting.diset.DI2.Title;
        $(term).html(term2);

        //グラフの単位
        term = HLRC2_GRPDIUNIT + suffix;
        term2 = " [" + setdata.setting.diset.DI2.Unit + "]";
        $(term).html(term2);

        //瞬時値タイトル
        term = HLRC2_DITITLE + suffix;
        term2 = setdata.setting.diset.DI2.Title;
        $(term).html(term2);

        //DI状態のタイトル
        term = HLRC2_DISTTTITLE + suffix;
        term2 = setdata.setting.diset.DI2.Title;
        $(term).html(term2);

        // 上限警報発生値
        term = HLRC2_GRPDIHALRM + suffix;
        term2 = "上限警報発生値 " + setdata.setting.diset.DI2.Alarm[1].toFixed(setdata.setting.diset.DI2.Point) + " [" + setdata.setting.diset.DI2.Unit + "]";
        $(term).html(term2);
        $(term).css({ "display": "block" });

        // 警報上限有無
        term = HLRC2_GRPDIHEALRM + suffix;
        if ((setdata.setting.diset.DI2.AlarmE[1] == 1) && (setdata.setting.diset.DI2.GraphType == 0)) {
            $(term).css({ "display": "block" });
        }
        else {
            $(term).css({ "display": "none" });
        }

        // Preset
        suffix = 'di2_counter';
        if (setdata.setting.diset.DI2.GraphType == 0) {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "block" });
        }
        else {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "none" });
        }

        // DI2 Time ********************************************************************
        var suffix = "timer2";
        //グラフのタイトル
        term = HLRC2_GRPDITITLE + suffix;
        term2 = setdata.setting.diset.DI2_TIMER.Title;
        $(term).html(term2);

        //グラフの単位
        term = HLRC2_GRPDIUNIT + suffix;
        term2 = " [" + setdata.setting.diset.DI2_TIMER.Unit + "]";
        $(term).html(term2);

        //瞬時値タイトル
        term = HLRC2_DITITLE + suffix;
        term2 = setdata.setting.diset.DI2_TIMER.Title;
        $(term).html(term2);

        // 上限警報発生値
        term = HLRC2_GRPDIHALRM + suffix;
        term2 = "上限警報発生値 " + setdata.setting.diset.DI2_TIMER.Alarm[1].toFixed(setdata.setting.diset.DI2_TIMER.Point) + " [" + setdata.setting.diset.DI2_TIMER.Unit + "]";
        $(term).html(term2);
        $(term).css({ "display": "block" });

        // 警報上限有無
        term = HLRC2_GRPDIHEALRM + suffix;
        if ((setdata.setting.diset.DI2_TIMER.AlarmE[1] == 1) && (setdata.setting.diset.DI2_TIMER.GraphType == 0)) {
            $(term).css({ "display": "block" })
        }
        else {
            $(term).css({ "display": "none" })
        }

        // Preset
        suffix = 'di2_timer';
        if (setdata.setting.diset.DI2_TIMER.GraphType == 0) {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "block" });
        }
        else {
            term = HLRC2_GRPDIRST + suffix;
            $(term).css({ "display": "none" });
        }

        //dBmのタイトル
        term2 = jis2chr(setdata.setting.rssi.Title);
        $('#idhlrc2titledbm').html(term2);
        $('#idhlrc2grptitledbm').html(term2);

        // DO1 ********************************************************************
        suffix = "do1";
        if (setdata.setting.doset.DO1.Control == 0) {
            $(HLRC2_DOONBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOOFFBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOINTERLCKBTN + suffix).css({ "display": "none" });
        } else if (setdata.setting.doset.DO1.Control == 65280) {
            $(HLRC2_DOONBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOOFFBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOINTERLCKBTN + suffix).css({ "display": "block" });
        }

        // DO2 ********************************************************************
        suffix = "do2";
        if (setdata.setting.doset.DO2.Control == 0) {
            $(HLRC2_DOONBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOOFFBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOINTERLCKBTN + suffix).css({ "display": "none" });
        } else if (setdata.setting.doset.DO2.Control == 65280) {
            $(HLRC2_DOONBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOOFFBTN + suffix).css({ "display": "none" });
            $(HLRC2_DOINTERLCKBTN + suffix).css({ "display": "block" });
        }
    }
}

/**
 * hlrc1 instance data display
 */
function displayhlrc1data(hlrc1insdat, setdata) {
    var suffix, term, term2;

    //正常
    if (hlrc1insdat.Status == 200) {
        //データがあるかどうかチェック
        //データが無い場合
        if (hlrc1insdat.Respons.Data == null) {
            $("#hlrc1updated_time").html("データ更新：----/--/-- --:--");

            //カウンター
            var suffix = "di1";
            var term = HLRC1_DIVAL + suffix;
            $(term).html("--");

            //DIオン・オフバーで
            var term2 = HLRC1_DISTS + suffix;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });

            //DI1 Timer
            suffix = "timer1";
            term = HLRC1_DIVAL + suffix;
            $(term).html("--");

            //DO オン・オフバーで
            suffix = "do1";
            $(HLRC1_DISTS + suffix).html("");
            $(HLRC1_DISTS + suffix).removeClass("text-light");
            $(HLRC1_DISTS + suffix).removeClass("text-light shadow");
            $(HLRC1_DISTS + suffix).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });

            //電波強度
            $("#idhlrc1valdbm").html("--");
        }
        //データがある場合
        else {
            //---------------------Data - Show out---------------------
            //時間
            //最新の時間を取得
            term = "データ更新：" + hlrc1insdat.Respons.Time[0] + "/" + ("00" + hlrc1insdat.Respons.Time[1]).slice(-2) + "/" + ("00" + hlrc1insdat.Respons.Time[2]).slice(-2) + " " + ("00" + hlrc1insdat.Respons.Time[3]).slice(-2) + ":" + ("0" + hlrc1insdat.Respons.Time[4]).slice(-2);
            //時間バーに更新
            $("#hlrc1updated_time").html(term);

            //表示
            //---------------------DI1---------------------
            suffix = "di1";
            //データを表示
            //瞬時値テーブルで
            term = HLRC1_DIVAL + suffix;
            termdata = parseFloat(parseFloat(hlrc1insdat.Respons.Data.di1_counter.Value).toFixed(setdata.setting.diset.DI1.Point)).toFixed(setdata.setting.diset.DI1.Point);
            strdata = termdata.toString() + " [" + setdata.setting.diset.DI1.Unit + "]";
            $(term).html(strdata);

            //瞬時値テーブルで
            //オン・オフバーで
            term2 = HLRC1_DISTS + suffix;
            termdata = parseInt(hlrc1insdat.Respons.Data.di1_status.State, 16);

            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(term2).html("OFF");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }

            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(term2).html("ON");
                $(term2).addClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx xx11 xxxx
            // xxxx xxxx xx00 xxxx
            else {
                $(term2).html("--");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }
            //---------------------DI1 Timer---------------------
            suffix = "timer1";
            //データを表示
            //瞬時値テーブルで
            term = HLRC1_DIVAL + suffix;
            termdata = parseFloat(hlrc1insdat.Respons.Data.di1_timer.Value).toFixed(setdata.setting.diset.DI1_TIMER.Point);
            strdata = termdata.toString() + " [" + setdata.setting.diset.DI1_TIMER.Unit + "]";
            $(term).html(strdata);

            //--------------------電波強度--------------------------
            if (gcrurbranch == 1) {
                $("#idhlrc1valdbm").html(hlrc1insdat.Respons.RSSI + " [dBm]");
            }
            else {
                $("#idhlrc1valdbm").html("");
            }

            //DOのオン・オフ状態
            suffix = "do1";
            term2 = HLRC1_DISTS + suffix;
            termdata = parseInt(hlrc1insdat.Respons.Data.do1_output.State, 16);
            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(term2).html("OFF");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }
            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(term2).html("ON");
                $(term2).addClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx 11xx xxxx
            // xxxx xxxx 00xx xxxx
            else {
                $(term2).html("--");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }

            //警報状態
            var alert_exist = 0;// 0: success; 1; danger; 2: warning
            term = "#alertH_hlrc1";
            var alert_str1 = "";
            var unknown = false;

            //DI1 Timer
            if (hlrc1insdat.Respons.Data.di1_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc1insdat.Respons.Data.di1_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_exist = 1;
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_exist = 2;
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                //alert_exist = 3;
                unknown = true;
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
            }

            //DI1
            if (hlrc1insdat.Respons.Data.di1_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc1insdat.Respons.Data.di1_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_exist = 1;
                alert_str1 = setdata.setting.diset.DI1.Title;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_exist = 2;
                alert_str1 = setdata.setting.diset.DI1.Title;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI1.Title;
                //alert_exist = 3;
                unknown = true;
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
    else {
        $("#hlrc1updated_time").html("データ更新：----/--/-- --:--");

        //カウンター
        suffix = "di1";
        //瞬時値テーブルで
        term = HLRC1_DIVAL + suffix;
        $(term).html("--");

        //オン・オフバーで
        term2 = HLRC1_DISTS + suffix;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DI1 Timer
        suffix = "timer1";
        //瞬時値テーブルで
        term = HLRC1_DIVAL + suffix;
        $(term).html("--");

        //DO
        //瞬時値テーブルで
        //オン・オフバーで
        suffix = "do1";
        $(HLRC1_DISTS + suffix).html("");
        $(HLRC1_DISTS + suffix).removeClass("text-light");
        $(HLRC1_DISTS + suffix).removeClass("text-light shadow");
        $(HLRC1_DISTS + suffix).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //電波強度
        $("#idhlrc1valdbm").html("--");

        //警報状態
        term = "#alertH_hlrc1";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).html("<strong>NO DATA</strong>　");
    }
}

/**
 * hlrc2 instance data display
 */
function displayhlrc2data(hlrc2insdat, setdata) {
    var suffix;
    var term, term2;
    //正常
    if (hlrc2insdat.Status == 200) {
        //データがあるかどうかチェック
        //データが無い場合
        if (hlrc2insdat.Respons.Data == null) {
            // 更新時間
            $("#hlrc2updated_time").html("データ更新：----/--/-- --:--");
            //カウンター2
            suffix = "di1";
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            $(term).html("--");

            //オン・オフバーで
            term2 = HLRC2_DISTS + suffix;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });

            //DI1 Timer
            suffix = "timer1";
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            $(term).html("--");

            //カウンター2
            suffix = "di2";
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            $(term).html("--");

            //オン・オフバーで
            term2 = HLRC2_DISTS + suffix;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });

            //DI2 Timer
            suffix = "timer2";
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            $(term).html("--");

            //DO1
            //オン・オフバーで
            suffix = "do1";
            $(HLRC2_DISTS + suffix).html("");
            $(HLRC2_DISTS + suffix).removeClass("text-light");
            $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
            $(HLRC2_DISTS + suffix).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });

            //DO2
            //オン・オフバーで
            suffix = "do2";
            $(HLRC2_DISTS + suffix).html("");
            $(HLRC2_DISTS + suffix).removeClass("text-light");
            $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
            $(HLRC2_DISTS + suffix).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        //データがある場合
        else {
            //---------------------Data - Show out---------------------
            //時間
            //最新の時間を取得
            term = "データ更新：" + hlrc2insdat.Respons.Time[0] + "/" + ("00" + hlrc2insdat.Respons.Time[1]).slice(-2) + "/" + ("00" + hlrc2insdat.Respons.Time[2]).slice(-2) + " " + ("00" + hlrc2insdat.Respons.Time[3]).slice(-2) + ":" + ("0" + hlrc2insdat.Respons.Time[4]).slice(-2);
            //時間バーに更新
            $("#hlrc2updated_time").html(term);

            //表示
            //---------------------DI1---------------------
            suffix = "di1";
            //データを表示
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            termdata = parseFloat(hlrc2insdat.Respons.Data.di1_counter.Value).toFixed(setdata.setting.diset.DI1.Point);
            strdata = termdata.toString() + " [" + setdata.setting.diset.DI1.Unit + "]";
            $(term).html(strdata);

            //瞬時値テーブルで
            //オン・オフバーで
            term2 = HLRC2_DISTS + suffix;
            termdata = parseInt(hlrc2insdat.Respons.Data.di1_status.State, 16);

            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(term2).html("OFF");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }

            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(term2).html("ON");
                $(term2).addClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx xx11 xxxx
            // xxxx xxxx xx00 xxxx
            else {
                $(term2).html("--");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }
            //---------------------DI2---------------------
            suffix = "di2";
            //データを表示
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            termdata = parseFloat(hlrc2insdat.Respons.Data.di2_counter.Value).toFixed(setdata.setting.diset.DI2.Point);
            strdata = termdata.toString() + " [" + setdata.setting.diset.DI2.Unit + "]";
            $(term).html(strdata);

            //瞬時値テーブルで
            //オン・オフバーで
            term2 = HLRC2_DISTS + suffix;
            termdata = parseInt(hlrc2insdat.Respons.Data.di2_status.State, 16);

            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(term2).html("OFF");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }

            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(term2).html("ON");
                $(term2).addClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx xx11 xxxx
            // xxxx xxxx xx00 xxxx
            else {
                $(term2).html("--");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }
            //---------------------DI1 Timer---------------------
            suffix = "timer1";
            //データを表示
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            termdata = parseFloat(hlrc2insdat.Respons.Data.di1_timer.Value).toFixed(setdata.setting.diset.DI1_TIMER.Point);
            strdata = termdata.toString() + " [" + setdata.setting.diset.DI1_TIMER.Unit + "]";
            $(term).html(strdata);

            //---------------------DI2 Timer---------------------
            suffix = "timer2";
            //データを表示
            //瞬時値テーブルで
            term = HLRC2_DIVAL + suffix;
            termdata = parseFloat(hlrc2insdat.Respons.Data.di2_timer.Value).toFixed(setdata.setting.diset.DI2_TIMER.Point);
            strdata = termdata.toString() + " [" + setdata.setting.diset.DI2_TIMER.Unit + "]";
            $(term).html(strdata);

            //--------------------電波強度--------------------------
            if (gcrurbranch == 1) {
                $("#idhlrc2valdbm").html(hlrc2insdat.Respons.RSSI + " [dBm]");
            }
            else {
                $("#idhlrc2valdbm").html("");
            }

            //DOのオン・オフ状態
            suffix = "do1";
            term2 = HLRC2_DISTS + suffix;
            termdata = parseInt(hlrc2insdat.Respons.Data.do1_output.State, 16);
            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(term2).html("OFF");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }
            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(term2).html("ON");
                $(term2).addClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx 11xx xxxx
            // xxxx xxxx 00xx xxxx
            else {
                $(term2).html("--");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }

            //DOのオン・オフ状態
            suffix = "do2";
            term2 = HLRC2_DISTS + suffix;
            termdata = parseInt(hlrc2insdat.Respons.Data.do2_output.State, 16);
            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(term2).html("OFF");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }
            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(term2).html("ON");
                $(term2).addClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx 11xx xxxx
            // xxxx xxxx 00xx xxxx
            else {
                $(term2).html("--");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }

            //警報状態
            var alert_exist = 0;// 0: success; 1; danger; 2: warning
            term = "#alertH_hlrc2";
            var alert_str1 = "";
            var unknown = false;

            //DI2 Timer
            if (hlrc2insdat.Respons.Data.di2_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc2insdat.Respons.Data.di2_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI2_TIMER.Title;
                alert_exist = 1;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI2_TIMER.Title;
                alert_exist = 2;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI2_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI2
            if (hlrc2insdat.Respons.Data.di2_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc2insdat.Respons.Data.di2_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI2.Title;
                alert_exist = 1;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI2.Title;
                alert_exist = 2;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI2.Title;
                //alert_exist = 3;
                unknown = true;
            }


            //DI1 Timer
            if (hlrc2insdat.Respons.Data.di1_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc2insdat.Respons.Data.di1_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
                alert_exist = 1;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
                alert_exist = 2;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI1
            if (hlrc2insdat.Respons.Data.di1_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc2insdat.Respons.Data.di1_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI1.Title;
                alert_exist = 1;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI1.Title;
                alert_exist = 2;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                //alert_exist = 3;
                alert_str1 = setdata.setting.diset.DI1.Title;
                unknown = true;
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
    else {
        // 更新時間
        $("#hlrc2updated_time").html("データ更新：----/--/-- --:--");

        //カウンター
        suffix = "di1";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //オン・オフバーで
        term2 = HLRC2_DISTS + suffix;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DI1 Timer
        suffix = "timer1";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //カウンター2
        suffix = "di2";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //オン・オフバーで
        term2 = HLRC2_DISTS + suffix;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DI2 Timer
        suffix = "timer2";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //DO1
        //オン・オフバーで
        suffix = "do1";
        $(HLRC2_DISTS + suffix).html("");
        $(HLRC2_DISTS + suffix).removeClass("text-light");
        $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
        $(HLRC2_DISTS + suffix).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });
        //DO2
        //オン・オフバーで
        suffix = "do2";
        $(HLRC2_DISTS + suffix).html("");
        $(HLRC2_DISTS + suffix).removeClass("text-light");
        $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
        $(HLRC2_DISTS + suffix).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //--------------------電波強度--------------------------
        $("#idhlrc2valdbm").html("--");

        //警報状態
        term = "#alertH_hlrc2";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).html("<strong>NO DATA</strong>　");
    }
}

/**
 * HLR-C1, HLR-C2の設定値を表示する
 *
 */
function hlrc_loaddata_setting(obj, Type) {
    if (obj.Status == 200) {
        var prefix;
        var suffix;
        var settingpoint = 4;

        switch (Type) {
            case UnitCode.HLR_C1:
                prefix = "c1";
                /************DI1**************/
                suffix = "di1";
                //タイトル
                $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_counter.Title));
                //乗数
                document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_counter.Multi, 16);
                //少数点以下桁数
                document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_counter.Point, 16);
                //単位
                $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_counter.Unit));
                //グラフ種類
                document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_counter.GraphType, 16);
                //グラフ：上限
                $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons.di1_counter.Graph[1].toFixed(settingpoint));
                //上限警報発生値
                $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons.di1_counter.Alarm[1].toFixed(settingpoint));
                //上限警報発生値
                document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons.di1_counter.AlarmE[1]);
                //接点入力回数変化
                document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_counter.SendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_counter.StateToOnSendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_counter.StateToOffSendMailE);

                /************稼働時間**************/
                suffix = "timer1";
                //タイトル
                $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_timer.Title, 0));
                //乗数
                document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_timer.Multi, 16);
                //少数点以下桁数
                document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_timer.Point, 16);
                //単位
                $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_timer.Unit));
                //グラフ種類
                document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_timer.GraphType, 16);
                //グラフ：上限
                $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons.di1_timer.Graph[1].toFixed(settingpoint));
                //上限警報発生値
                $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons.di1_timer.Alarm[1].toFixed(settingpoint));
                //上限警報発生値
                document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons.di1_timer.AlarmE[1]);
                //接点入力回数変化
                document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_timer.SendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_timer.StateToOnSendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_timer.StateToOffSendMailE);

                /************DO1**************/
                //連動する
                if (obj.Respons.do1_output.Ctrol == 65280) {
                    document.getElementById(prefix + "_" + "do1_rendo_on").checked = true;
                }
                //連動しない
                else if (obj.Respons.do1_output.Ctrol == 0) {
                    document.getElementById(prefix + "_" + "do1_rendo_off").checked = true;
                }
                //不明
                else {
                    document.getElementById(prefix + "_" + "do1_rendo_on").checked = false;
                    document.getElementById(prefix + "_" + "do1_rendo_off").checked = false;
                }

                // dBmタイトル
                $("#c1_title_dbm").val(jis2chr(obj.Respons.RSSI_Title));

                break;
            case UnitCode.HLR_C2:
                prefix = "c2";
                /************DI1**************/
                suffix = "di1";
                //タイトル
                $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_counter.Title, 0));
                //乗数
                document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_counter.Multi, 16);
                //少数点以下桁数
                document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_counter.Point, 16);
                //単位
                $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_counter.Unit));
                //グラフ種類
                document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_counter.GraphType, 16);
                //グラフ：上限
                $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons.di1_counter.Graph[1].toFixed(settingpoint));
                //上限警報発生値
                $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons.di1_counter.Alarm[1].toFixed(settingpoint));
                //上限警報発生値
                document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons.di1_counter.AlarmE[1]);
                //接点入力回数変化
                document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_counter.SendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_counter.StateToOnSendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_counter.StateToOffSendMailE);

                /************DI2**************/
                suffix = "di2";
                //タイトル
                $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons.di2_counter.Title, 0));
                //乗数
                document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di2_counter.Multi, 16);
                //少数点以下桁数
                document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di2_counter.Point, 16);
                //単位
                $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons.di2_counter.Unit));
                //グラフ種類
                document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di2_counter.GraphType, 16);
                //グラフ：上限
                $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons.di2_counter.Graph[1].toFixed(settingpoint));
                //上限警報発生値
                $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons.di2_counter.Alarm[1].toFixed(settingpoint));
                //上限警報発生値
                document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons.di2_counter.AlarmE[1]);
                //接点入力回数変化
                document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons.di2_counter.SendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons.di2_counter.StateToOnSendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons.di2_counter.StateToOffSendMailE);

                /************稼働時間1**************/
                suffix = "timer1";
                //タイトル
                $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_timer.Title, 0));
                //乗数
                document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_timer.Multi, 16);
                //少数点以下桁数
                document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_timer.Point, 16);
                //単位
                $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons.di1_timer.Unit));
                //グラフ種類
                document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di1_timer.GraphType, 16);
                //グラフ：上限
                $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons.di1_timer.Graph[1].toFixed(settingpoint));
                //警報上限値
                $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons.di1_timer.Alarm[1].toFixed(settingpoint));
                //警報上限値
                document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons.di1_timer.AlarmE[1]);
                //接点入力回数変化
                document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_timer.SendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_timer.StateToOnSendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons.di1_timer.StateToOffSendMailE);

                /************稼働時間2**************/
                suffix = "timer2";
                //タイトル
                $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons.di2_timer.Title, 0));
                //乗数
                document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di2_timer.Multi, 16);
                //少数点以下桁数
                document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di2_timer.Point, 16);
                //単位
                $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons.di2_timer.Unit));
                //グラフ種類
                document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons.di2_timer.GraphType, 16);
                //グラフ：上限
                $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons.di2_timer.Graph[1].toFixed(settingpoint));
                //警報上限値
                $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons.di2_timer.Alarm[1].toFixed(settingpoint));
                //警報上限値
                document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons.di2_timer.AlarmE[1]);
                //接点入力回数変化
                document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons.di2_timer.SendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons.di2_timer.StateToOnSendMailE);
                document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons.di2_timer.StateToOffSendMailE);

                /************DO1**************/
                //連動する
                if (obj.Respons.do1_output.Ctrol == 65280) {
                    document.getElementById(prefix + "_" + "do1_rendo_on").checked = true;
                }
                //連動しない
                else if (obj.Respons.do1_output.Ctrol == 0) {
                    document.getElementById(prefix + "_" + "do1_rendo_off").checked = true;
                }
                //不明
                else {
                    document.getElementById(prefix + "_" + "do1_rendo_on").checked = false;
                    document.getElementById(prefix + "_" + "do1_rendo_off").checked = false;
                }

                /************DO2**************/
                //連動する
                if (obj.Respons.do2_output.Ctrol == 65280) {
                    document.getElementById(prefix + "_" + "do2_rendo_on").checked = true;
                }
                //連動しない
                else if (obj.Respons.do2_output.Ctrol == 0) {
                    document.getElementById(prefix + "_" + "do2_rendo_off").checked = true;
                }
                //不明
                else {
                    document.getElementById(prefix + "_" + "do2_rendo_on").checked = false;
                    document.getElementById(prefix + "_" + "do2_rendo_off").checked = false;
                }

                // dBmタイトル
                $("#c2_title_dbm").val(jis2chr(obj.Respons.RSSI_Title));

                break;
        }
    } else {
        //Debug
    }
}

/*  機能：  HLR-C1, HLR-C2用カウンタまたはタイマ設定変更の要求電文を作成、ダイアログを表示
    引数：
            event_obj：DIの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_hlrc_di_timer_setting(unitNo, event_obj) {
    var ch = event_obj.target.id;
    var prefix = ch.split("_")[0];
    var suffix = ch.split("_")[1];
    var settingpoint = 4;
    var chkExclude = ["timer1", "timer2"];

    // JavascriptDataを作成
    var jsDat = new Object();

    // [UnitNo]
    jsDat.UnitNo = unitNo;
    // [Item]
    jsDat.Item = ch.split("_")[2] + "_" + ch.split("_")[3];
    // [Title]
    jsDat.Title = chr2sjis(document.getElementById(prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).value, 20);
    // [Multi]
    var strTerm = document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex.toString(16).toUpperCase();
    jsDat.Multi = ("000" + strTerm).substr(-4);
    // [Point]
    strTerm = strTerm = document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex.toString(16).toUpperCase();
    jsDat.Point = ("000" + strTerm).substr(-4);
    // [Unit]
    var unitname = document.getElementById(prefix + HLRC_UNIT_ID_TERM + suffix);
    jsDat.Unit = chr2sjis(unitname.value, 10);
    // [GraphType]
    strTerm = document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex.toString(16).toUpperCase();
    jsDat.GraphType = ("000" + strTerm).substr(-4);
    // [GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + HLRC_GRAPHH_ID_TERM + suffix).value, settingpoint);
    // [AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).value, settingpoint);
    // [AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked == true) ? 1 : 0);
    // [SendMailE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.SendMailE = ((document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.SendMailE = 0;
    }
    // [SendMailE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.StateToOnSendMailE = ((document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.StateToOnSendMailE = 0;
    }

    if (chkExclude.includes(suffix) == false) {
        jsDat.StateToOffSendMailE = ((document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.StateToOffSendMailE = 0;
    }

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/*  機能：  HLR-C1, HLR-C2用DO設定の要求電文を作成、ダイアログを表示
    引数：
            unitNo: 現在のユニットの順番
            event_obj：DIの設定ボタンのイベントオブジェクト
*/
function set_hlrc_do_setting(unitNo, event_obj) {
    //GET電文を作成
    var ch = event_obj.target.id;
    var prefix = ch.split("_")[0] + "_";

    // JavascriptDataを作成
    var jsDat = new Object();

    // [UnitNo]
    jsDat.UnitNo = unitNo;
    // [Item]
    jsDat.Item = ch.split("_")[1] + "_" + ch.split("_")[2];

    // [LinkFlg]
    if (document.getElementById(prefix + ch.split("_")[1] + "_" + "rendo_on").checked == true) { //連動する
        jsDat.LinkFlg = "FF00";
    }
    else { //連動しない
        jsDat.LinkFlg = "0000";
    }

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/*  機能    ：HLR-C1, HLR-C2用カウンター設定の入力値をチェックして、警報を出す
    引数    ：DIの設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_hlrc_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var prefix;
    var suffix;
    var num;

    prefix = strch.split("_")[0];
    suffix = strch.split("_")[1];
    num = (strch.split("_")[2]).substr(-1);

    //タイトル
    ID_temp = prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix;
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
    if (string_len_check(document.getElementById(ID_temp).value, 20, ("DI" + num.toString() + "のタイトルを"), true) == false) return false;
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

    // 単位
    ID_temp = prefix + HLRC_UNIT_ID_TERM + suffix;
    if (string_len_check(document.getElementById(ID_temp).value, 15, ("DI" + num.toString() + "の単位を"), true) == false) return false;

    //グラフの上限値
    ID_temp = prefix + HLRC_GRAPHH_ID_TERM + suffix;
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

    //警報上限値
    ID_temp = prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix;
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
        // 入力値は0以下
        if (term <= 0) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値を0より大きな値で入力してください。",
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

    return true;
}

/*
 * 機能：  AD、DI、電波強度のグラフを更新
*/
function hlrc_update_graph(setdata) {
    //DIグラフを描画
    if (setdata.type == UnitCode.HLR_C1) {
        graph_di_update(hlrc1_chart_di1_counter, hlrc_graph_time_di1_counter, hlrc_graph_data_di1_counter, hlrc_graph_time_di1_counter.length, setdata.setting.diset.DI1);
        graph_di_update(hlrc1_chart_di1_timer, hlrc_graph_time_di1_timer, hlrc_graph_data_di1_timer, hlrc_graph_time_di1_timer.length, setdata.setting.diset.DI1_TIMER);
        //電波強度
        graph_dbm_update(chart_dBm, hlrc_graph_time_do1_counter, hlrc_graph_data_dBm);
    }
    else if (setdata.type == UnitCode.HLR_C2) {
        graph_di_update(hlrc2_chart_di1_counter, hlrc_graph_time_di1_counter, hlrc_graph_data_di1_counter, hlrc_graph_time_di1_counter.length, setdata.setting.diset.DI1);
        graph_di_update(hlrc2_chart_di1_timer, hlrc_graph_time_di1_timer, hlrc_graph_data_di1_timer, hlrc_graph_time_di1_timer.length, setdata.setting.diset.DI1_TIMER);
        graph_di_update(hlrc2_chart_di2_counter, hlrc_graph_time_di2_counter, hlrc_graph_data_di2_counter, hlrc_graph_time_di2_counter.length, setdata.setting.diset.DI2);
        graph_di_update(hlrc2_chart_di2_timer, hlrc_graph_time_di2_timer, hlrc_graph_data_di2_timer, hlrc_graph_time_di2_timer.length, setdata.setting.diset.DI2_TIMER);
        //電波強度
        graph_dbm_update(chart_dBm, hlrc_graph_time_do1_counter, hlrc_graph_data_dBm);
    }

}

/*
 * 機能：  AD、DI、DOのグラフを描画
*/
function hlrc_draw_graph(setdata) {
    if (setdata.type == UnitCode.HLR_C1) {
        var canvas_di1_counter = document.getElementById("hlrc1_chart_di1_counter").getContext("2d");
        var canvas_di1_timer = document.getElementById("hlrc1_chart_di1_timer").getContext("2d");
        //rssi
        var canvas_hlrc_dBm = document.getElementById("charthlrc1dbm").getContext("2d");
    }
    else if (setdata.type == UnitCode.HLR_C2) {
        var canvas_di1_counter = document.getElementById("hlrc2_chart_di1_counter").getContext("2d");
        var canvas_di1_timer = document.getElementById("hlrc2_chart_di1_timer").getContext("2d");
        var canvas_di2_counter = document.getElementById("hlrc2_chart_di2_counter").getContext("2d");
        var canvas_di2_timer = document.getElementById("hlrc2_chart_di2_timer").getContext("2d");
        //rssi
        var canvas_hlrc_dBm = document.getElementById("charthlrc2dbm").getContext("2d");
    }

    //DIグラフを描画
    if (setdata.type == UnitCode.HLR_C1) {
        hlrc1_chart_di1_counter = draw_graph_di(canvas_di1_counter, hlrc_graph_time_di1_counter, hlrc_graph_data_di1_counter, hlrc_graph_time_di1_counter.length, setdata.setting.diset.DI1);
        hlrc1_chart_di1_timer = draw_graph_di(canvas_di1_timer, hlrc_graph_time_di1_timer, hlrc_graph_data_di1_timer, hlrc_graph_time_di1_timer.length, setdata.setting.diset.DI1_TIMER);
        //電波強度                  単位を表示して、グラ愚を描画
        chart_dBm = draw_graph_dbm(canvas_hlrc_dBm, hlrc_graph_time_do1_counter, hlrc_graph_data_dBm);
    }
    else if (setdata.type == UnitCode.HLR_C2) {
        hlrc2_chart_di1_counter = draw_graph_di(canvas_di1_counter, hlrc_graph_time_di1_counter, hlrc_graph_data_di1_counter, hlrc_graph_time_di1_counter.length, setdata.setting.diset.DI1);
        hlrc2_chart_di1_timer = draw_graph_di(canvas_di1_timer, hlrc_graph_time_di1_timer, hlrc_graph_data_di1_timer, hlrc_graph_time_di1_timer.length, setdata.setting.diset.DI1_TIMER);
        hlrc2_chart_di2_counter = draw_graph_di(canvas_di2_counter, hlrc_graph_time_di2_counter, hlrc_graph_data_di2_counter, hlrc_graph_time_di2_counter.length, setdata.setting.diset.DI2);
        hlrc2_chart_di2_timer = draw_graph_di(canvas_di2_timer, hlrc_graph_time_di2_timer, hlrc_graph_data_di2_timer, hlrc_graph_time_di2_timer.length, setdata.setting.diset.DI2_TIMER);
        //電波強度                  単位を表示して、グラ愚を描画
        chart_dBm = draw_graph_dbm(canvas_hlrc_dBm, hlrc_graph_time_do1_counter, hlrc_graph_data_dBm);
    }
}

/**
 * HLRC1のグラフデータを取得、更新する
 */
function hlrc_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }

    // グラフ日付作成
    hlrc_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        hlrc_graph_data_di1_counter.length = 0;
        hlrc_graph_data_di2_counter.length = 0;
        hlrc_graph_data_di1_timer.length = 0;
        hlrc_graph_data_di2_timer.length = 0;
        //強度
        hlrc_graph_data_dBm.length = 0;
        hlrc_graph_time_do1_counter.length = 0;

        hlrc_graph_time_di1_counter.length = 0;
        hlrc_graph_time_di2_counter.length = 0;
        hlrc_graph_time_di1_timer.length = 0;
        hlrc_graph_time_di2_timer.length = 0;

        //データ格納
        //DI1
        for (var i = 0; i < obj.Respons.di1_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc_graph_time_di1_counter[i] = moment(obj.Respons.di1_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                
            //データが無い場合
            if (parseInt(obj.Respons.di1_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc_graph_data_di1_counter[i] = null;
            }
            //データがある
            else {
                hlrc_graph_data_di1_counter[i] = obj.Respons.di1_counter.Data[i].Value;
            }
        }

        //DI1 TImer
        for (var i = 0; i < obj.Respons.di1_timer.Num; i++) {
            //時間          "分：秒"
            hlrc_graph_time_di1_timer[i] = moment(obj.Respons.di1_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                
            //データが無い場合
            if (parseInt(obj.Respons.di1_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc_graph_data_di1_timer[i] = null;
            }
            //データがある
            else {
                hlrc_graph_data_di1_timer[i] = obj.Respons.di1_timer.Data[i].Value;
            }
        }

        //強度
        for (var i = 0; i < obj.Respons.do1_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc_graph_time_do1_counter[i] = moment(obj.Respons.do1_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                
            //データが無い場合
            if (parseInt(obj.Respons.do1_counter.Data[i].RSSI) == 0) {
                //強度
                hlrc_graph_data_dBm[i] = null;
            }
            //データがある
            else {
                //強度
                hlrc_graph_data_dBm[i] = obj.Respons.do1_counter.Data[i].RSSI;
            }
        }

        //**********HLR-C2**********
        if (setdata.type == UnitCode.HLR_C2) {
            //DI2
            for (var i = 0; i < obj.Respons.di2_counter.Num; i++) {
                //時間          "年：月：日 時：分"
                hlrc_graph_time_di2_counter[i] = moment(obj.Respons.di2_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                
                //データが無い場合
                if (parseInt(obj.Respons.di2_counter.Data[i].RSSI) == 0) {
                    hlrc_graph_data_di2_counter[i] = null;
                }
                //データがある
                else {
                    hlrc_graph_data_di2_counter[i] = obj.Respons.di2_counter.Data[i].Value;
                }
            }

            //DI2 TImer
            for (var i = 0; i < obj.Respons.di2_timer.Num; i++) {
                //時間          "分：秒"
                hlrc_graph_time_di2_timer[i] = moment(obj.Respons.di2_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.di2_timer.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    hlrc_graph_data_di2_timer[i] = null;
                }
                //データがある
                else {
                    hlrc_graph_data_di2_timer[i] = obj.Respons.di2_timer.Data[i].Value;
                }
            }
        }

        switch (setdata.type) {
            case UnitCode.HLR_C1:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (hlrc1_graph_exist == false) {
                    hlrc_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    hlrc1_graph_exist = true;
                }
                else {
                    hlrc_update_graph(setdata);
                }
                /* graph data update */
                document.getElementById("idhlrc1graphtime_di1").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc1graphtime_timer1").innerHTML = hlrc_graph_date;
                if (gcrurbranch == 2) {
                    document.getElementById("idhlrc1graphtimedbm").innerHTML = "";
                }
                else {
                    document.getElementById("idhlrc1graphtimedbm").innerHTML = hlrc_graph_date;
                }
                break;
            case UnitCode.HLR_C2:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (hlrc2_graph_exist == false) {
                    hlrc_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    hlrc2_graph_exist = true;
                }
                else {
                    hlrc_update_graph(setdata);
                }
                /* graph data update */
                document.getElementById("idhlrc2graphtime_di1").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc2graphtime_di2").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc2graphtime_timer1").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc2graphtime_timer2").innerHTML = hlrc_graph_date;
                if (gcrurbranch == 2) {
                    document.getElementById("idhlrc2graphtimedbm").innerHTML = "";
                }
                else {
                    document.getElementById("idhlrc2graphtimedbm").innerHTML = hlrc_graph_date;
                }
                break;
        }
    }
    else if (obj.Status == 400) {

        //データの要素数 60
        //グラフが最適に表示できるように, 60 -> 57
        hlrc_graph_data_di1_counter.length = null;
        hlrc_graph_data_di1_timer.length = null;
        hlrc_graph_data_di2_counter.length = null;
        hlrc_graph_data_di2_timer.length = null;
        //強度
        hlrc_graph_data_dBm.length = 0;
        hlrc_graph_time_do1_counter.length = 0;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        switch (setdata.type) {
            case UnitCode.HLR_C1:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (hlrc1_graph_exist == false) {
                    hlrc_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    hlrc1_graph_exist = true;
                }
                else {
                    hlrc_update_graph(setdata);
                }
                /* graph data update */
                document.getElementById("idhlrc1graphtime_di1").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc1graphtime_timer1").innerHTML = hlrc_graph_date;
                if (gcrurbranch == 2) {
                    document.getElementById("idhlrc1graphtimedbm").innerHTML = "";
                }
                else {
                    document.getElementById("idhlrc1graphtimedbm").innerHTML = hlrc_graph_date;
                }
                break;
            case UnitCode.HLR_C2:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (hlrc2_graph_exist == false) {
                    hlrc_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    hlrc2_graph_exist = true;
                }
                else {
                    hlrc_update_graph(setdata);
                }
                /* graph data update */
                document.getElementById("idhlrc2graphtime_di1").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc2graphtime_di2").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc2graphtime_timer1").innerHTML = hlrc_graph_date;
                document.getElementById("idhlrc2graphtime_timer2").innerHTML = hlrc_graph_date;
                if (gcrurbranch == 2) {
                    document.getElementById("idhlrc2graphtimedbm").innerHTML = "";
                }
                else {
                    document.getElementById("idhlrc2graphtimedbm").innerHTML = hlrc_graph_date;
                }
                break;
        }

    }
    else {

    }
}

/**
 * HLRC1の瞬時値を取得、更新する
 */
function get_InsDatHLRC1(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var suffix, term, term2;

    // 設定値を表示する
    displayhlrc1setting(setting);

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#hlrc1updated_time").html("データ更新：----/--/-- --:--");

        //カウンター
        var suffix = "di1";
        var term = HLRC1_DIVAL + suffix;
        $(term).html("--");

        //DIオン・オフバーで
        var term2 = HLRC1_DISTS + suffix;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DI1 Timer
        suffix = "timer1";
        term = HLRC1_DIVAL + suffix;
        $(term).html("--");

        //DO オン・オフバーで
        suffix = "do1";
        $(HLRC1_DISTS + suffix).html("");
        $(HLRC1_DISTS + suffix).removeClass("text-light");
        $(HLRC1_DISTS + suffix).removeClass("text-light shadow");
        $(HLRC1_DISTS + suffix).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //電波強度
        $("#idhlrc1valdbm").html("--");

        //警報状態
        term = "#alertH_hlrc1";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }

    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if ((isNoRequest == true) || (setting.setting == null)) {
        return;
    }
    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        displayhlrc1data(obj, setting);
    }, setting);
}

/**
 * HLRC2の瞬時値を取得、更新する
 */
function get_InsDatHLRC2(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var suffix, term, term2;

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        // 更新時間
        $("#hlrc2updated_time").html("データ更新：----/--/-- --:--");
        //カウンター2
        suffix = "di1";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //オン・オフバーで
        term2 = HLRC2_DISTS + suffix;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DI1 Timer
        suffix = "timer1";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //カウンター2
        suffix = "di2";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //オン・オフバーで
        term2 = HLRC2_DISTS + suffix;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DI2 Timer
        suffix = "timer2";
        //瞬時値テーブルで
        term = HLRC2_DIVAL + suffix;
        $(term).html("--");

        //DO1
        //オン・オフバーで
        suffix = "do1";
        $(HLRC2_DISTS + suffix).html("");
        $(HLRC2_DISTS + suffix).removeClass("text-light");
        $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
        $(HLRC2_DISTS + suffix).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //DO2
        //オン・オフバーで
        suffix = "do2";
        $(HLRC2_DISTS + suffix).html("");
        $(HLRC2_DISTS + suffix).removeClass("text-light");
        $(HLRC2_DISTS + suffix).removeClass("text-light shadow");
        $(HLRC2_DISTS + suffix).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //電波強度
        $("#idhlrc2valdbm").html("--");

        //警報状態
        term = "#alertH_hlrc2";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }

    // 設定値を表示する
    displayhlrc2setting(setting);

    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if ((isNoRequest == true) || (setting.setting == null)) {
        return;
    }

    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        displayhlrc2data(obj, setting);
    }, setting);
}

/**
 * HLRC-DI1, DI2 リセット ボタン
 */
function fncResetDiHlrc(buttonid) {
    var ch = buttonid;
    var item = ch.split("_")[1] + "_" + ch.split("_")[2];
    var unit;
    /* グループ選択による処理 */
    switch (gActivedType) {
        case ActiveType.Atv_AllGroup:
            break;
        case ActiveType.Atv_Group:
            break;
        case ActiveType.Atv_Unit:
            // HLR-C
            unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitNo;
            break;
        case ActiveType.Atv_SubUnit:
            switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitTypeCode) {
                case UnitCode.HR_C8_IN:
                    //HR-C8
                    unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitNo;
                    break;
            }
            break;
        default:
            break;
    }

    hlrc_preset_data(unit, item, "00000000");
}

//----------------HLR-Cのプリセット制御----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function hlrc_preset_data(unitNo, type, PresetValue) {
    var obj;
    var untstr = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);

    //GET電文を作成
    const PostQuery = CONTROL_PRESET + getIotGatewayIdParam(); // CONTROL_QUERY;
    // JavascriptDataを作成
    var jsDat = new Object();
    // [UnitNo]
    jsDat.UnitNo = untstr;
    // [Item]
    jsDat.Item = type;
    // [PresetValue]
    jsDat.PresetValue = PresetValue;

    var modalTitle = "";
    var modalSucess = "";
    switch (type) {
        case "di1_counter":
            modalTitle = "DI1のカウント値をリセットしますか？";
            modalSucess = "DI1のカウント値をリセットします！";
            break;
        case "di2_counter":
            modalTitle = "DI2のカウント値をリセットしますか？";
            modalSucess = "DI2のカウント値をリセットします！";
            break;
        case "di3_counter":
            modalTitle = "DI3のカウント値をリセットしますか？";
            modalSucess = "DI3のカウント値をリセットします！";
            break;
        case "di4_counter":
            modalTitle = "DI4のカウント値をリセットしますか？";
            modalSucess = "DI4のカウント値をリセットします！";
            break;
        case "di5_counter":
            modalTitle = "DI5のカウント値をリセットしますか？";
            modalSucess = "DI5のカウント値をリセットします！";
            break;
        case "di6_counter":
            modalTitle = "DI6のカウント値をリセットしますか？";
            modalSucess = "DI6のカウント値をリセットします！";
            break;
        case "di7_counter":
            modalTitle = "DI7のカウント値をリセットしますか？";
            modalSucess = "DI7のカウント値をリセットします！";
            break;
        case "di8_counter":
            modalTitle = "DI8のカウント値をリセットしますか？";
            modalSucess = "DI8のカウント値をリセットします！";
            break;
        case "di1_timer":
            modalTitle = "DI1のON時間値をリセットしますか？";
            modalSucess = "DI1のON時間値をリセットします！";
            break;
        case "di2_timer":
            modalTitle = "DI2のON時間値をリセットしますか？";
            modalSucess = "DI2のON時間値をリセットします！";
            break;
        case "di3_timer":
            modalTitle = "DI3のON時間値をリセットしますか？";
            modalSucess = "DI3のON時間値をリセットします！";
            break;
        case "di4_timer":
            modalTitle = "DI4のON時間値をリセットしますか？";
            modalSucess = "DI4のON時間値をリセットします！";
            break;
        case "di5_timer":
            modalTitle = "DI5のON時間値をリセットしますか？";
            modalSucess = "DI5のON時間値をリセットします！";
            break;
        case "di6_timer":
            modalTitle = "DI6のON時間値をリセットしますか？";
            modalSucess = "DI6のON時間値をリセットします！";
            break;
        case "di7_timer":
            modalTitle = "DI7のON時間値をリセットしますか？";
            modalSucess = "DI7のON時間値をリセットします！";
            break;
        case "di8_timer":
            modalTitle = "DI8のON時間値をリセットしますか？";
            modalSucess = "DI8のON時間値をリセットします！";
            break;
    }
    /*
        "sweetalert.min.js"ライブラリを使用
    */
    //ダイアログの制御
    swal({
        title: modalTitle,
        icon: "warning",
        buttons: ["いいえ", "はい"],
        dangerMode: true,
    })
        .then(function (yes) {
            if (yes) {
                //サーバーに要求を送信
                if (DEBUG_FEEDBACK !== true) {
                    // console.log(strGetQuery);
                    // return $.post(strGetQuery,
                    //     jsDat,
                    //     function (obj) {
                    //         return obj;
                    //     });
                    console.log(PostQuery);
                    const jsStrData = fncJson2String(jsDat)
                    console.log(jsStrData);
                    return http.post(PostQuery, jsStrData, function (obj) {
                        return obj;
                    }, function (obj) {
                        return obj;
                    });
                }
                else {
                    obj = { "Status": 200 };
                    return obj;
                }
            } else {
                throw null;
            }
        })
        .then(function (json) {
            const term = json.Status;
            //正常
            if (term == 200) {
                swal({
                    title: modalSucess,
                    icon: "success",
                    buttons: "はい"
                });
            }
            //
            else {
                swal("エラー！ コード：" + term, {
                    icon: "error",
                    buttons: "はい"
                });
            }
        })
        .catch(function (err) {
            if (err) {
                swal("エラー！", {
                    icon: "error",
                    buttons: "はい"
                });
            } else {
                swal.stopLoading();
                swal.close();
            }
        });
}
