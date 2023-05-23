/*version=1.11*/
// <!-- 2021/01/13 -->
// <!-- ソースコード修正 -->

// 変数の定義
const HLRA4C4_ADVAL = "#idvalad";
const HLRA4C4_ADTITLE = "#id-title-ad";
const HLRA4C4_DIVAL = "#idvaldi";
const HLRA4C4_DITITLE = "#id-title-di";
const HLRA4C4_DISTSTITLE = "#idstatus_title_di";
const HLRA4C4_DOVAL = "#idvaldo1";
const HLRA4C4_DISTS = "#idstatusdi";
const HLRA4C4_DOSTS = "#idstatusdo1";
const HRLA4C4_GRPADUNIT = "#idgrpunitad";
const HRLA4C4_GRPADTITLE = "#idgrptitlead";
const HRLA4C4_GRPADHALRM = "#idgrphalrmad";
const HRLA4C4_GRPADLALRM = "#idgrplalrmad";
const HRLA4C4_GRPADHEALRM = "#idgrphealrmad";
const HRLA4C4_GRPADLEALRM = "#idgrplealrmad";
const HRLA4C4_GRPDIUNIT = "#idgrpunitdi";
const HRLA4C4_GRPDIRST = "#idbtndireset";
const HRLA4C4_GRPDITITLE = "#idgrptitledi";
const HRLA4C4_GRPDIHALRM = "#idgrphalrmdi";
const HRLA4C4_GRPDIHEALRM = "#idgrphalrmdi";
const HRLA4C4_HISTOGRAM_ADUNIT = "#idgrpunit_histogramad";
const HRLA4C4_HISTOGRAM_ADTITLE = "#idgrptitle_histogramad";
const HLRA4C4_TIMEVAL = "#idvaltimer";
const HLRA4C4_TIMETITLE = "#id-title-timer";
const HRLA4C4_GRPTIMEUNIT = "#idhlra4c4grpunit_timer";
const HRLA4C4_GRPTIMEHALRM = "#idhlra4c4grphalrm_timer";
const HRLA4C4_GRPTIMETITLE = "#idhlra4c4grptitle_timer";
const HRLA4C4_GRPTIMEHEALRM = "#idhlra4c4grphalrm_timer";
const HRLA4C4_GRPTIMERST = "#idbtntimerreset";

//AD
var chart_ad1;
var chart_ad2;
var chart_ad3;
var chart_ad4;
//AD Max-Min-Avg
var chart_histogram_ad1;
var chart_histogram_ad2;
var chart_histogram_ad3;
var chart_histogram_ad4;
//DI
var chart_di1;
var chart_di2;
var chart_di3;
var chart_di4;
//DI Timer
var chart_timer1;
var chart_timer2;
var chart_timer3;
var chart_timer4;

//ADグラフ用のデータ配列
var graph_data_ad1 = [];
var graph_data_ad2 = [];
var graph_data_ad3 = [];
var graph_data_ad4 = [];
//AD最大、最小、平均のグラフ用のデータ配列
// AD1~AD4の最大値
var histogram_maxdata_ad1 = [];
var histogram_maxdata_ad2 = [];
var histogram_maxdata_ad3 = [];
var histogram_maxdata_ad4 = [];
// AD1~AD4の最小値
var histogram_mindata_ad1 = [];
var histogram_mindata_ad2 = [];
var histogram_mindata_ad3 = [];
var histogram_mindata_ad4 = [];
// AD1~AD4の平均値
var histogram_meddata_ad1 = [];
var histogram_meddata_ad2 = [];
var histogram_meddata_ad3 = [];
var histogram_meddata_ad4 = [];

//グラフ用のデータ数
var graph_dat_num = 0;
//グラフ用の時間配列
var graph_time = [];
var graph_date;

//DIグラフ用のデータ配列
var graph_data_di1 = [];
var graph_data_di2 = [];
var graph_data_di3 = [];
var graph_data_di4 = [];

var graph_time_di1 = [];
var graph_time_di2 = [];
var graph_time_di3 = [];
var graph_time_di4 = [];

//DITimerグラフ用のデータ配列
var graph_data_timer1 = [];
var graph_data_timer2 = [];
var graph_data_timer3 = [];
var graph_data_timer4 = [];

var graph_timer1_exist = false;
var graph_timer2_exist = false;
var graph_timer3_exist = false;
var graph_timer4_exist = false;

var graph_time_timer1 = [];
var graph_time_timer2 = [];
var graph_time_timer3 = [];
var graph_time_timer4 = [];

//グラフ描画済み
var graph_exist = false;
var graph_ad1_exist = false;
var graph_ad2_exist = false;
var graph_ad3_exist = false;
var graph_ad4_exist = false;

var histogram_exist = false;
var histogram_ad1_exist = false;
var histogram_ad2_exist = false;
var histogram_ad3_exist = false;
var histogram_ad4_exist = false;

// HTMLの要素のID 
//An
const J_AD_GRAPH_TITLE_ID_TERM = "set_title_ad";
const AD_INPUT_RANGE_ID_TERM = "set_input_range_ad";
const AD_DEC_ID_TERM = "set_decimal_ad";
const AD_ZERO_ID_TERM = "set_zero_ad";
const AD_SPAN_ID_TERM = "set_span_ad";
const AD_UNIT_ID_TERM = "set_unit_ad";
const AD_GRAPHL_ID_TERM = "set_graphL_ad";
const AD_GRAPHH_ID_TERM = "set_graphH_ad";
const J_AD_GRAPH_ALARML_ID_TERM = "set_alarmL_ad";
const J_AD_GRAPH_ALARMH_ID_TERM = "set_alarmH_ad";
const J_AD_GRAPH_ALARMLE_ID_TERM = "set_alarmLE_ad";
const J_AD_GRAPH_ALARMHE_ID_TERM = "set_alarmHE_ad";
const J_AD_GRAPH_ALARMMINE_ID_TERM = "set_alarmMinE_ad";
const J_AD_GRAPH_ALARMMAXE_ID_TERM = "set_alarmMaxE_ad";
const J_AD_GRAPH_CLALARML_ID_TERM = "set_ClAlarmL_ad";
const J_AD_GRAPH_CLALARMH_ID_TERM = "set_ClAlarmH_ad";
const J_AD_HISTOGRAME_ID_TERM = "set_MaxMinMed_ad";
const J_AD_ALARMDELAYE_ID_TERM = "idDelayAlarmE_ad";
const J_AD_ALARMDELAYVAL_ID_TERM = "idDelayAlarmVal_ad";
//Di
const J_DI_GRAPH_TITLE_ID_TERM = "set_title_di";
const DI_INPUT_MULTI_ID_TERM = "set_input_multi_di";
const DI_DEC_ID_TERM = "set_decimal_di";
const DI_UNIT_ID_TERM = "set_unit_di";
const DI_GRAPH_TYPE_ID_TERM = "set_graphType_di";
const DI_GRAPHH_ID_TERM = "set_graphH_di";
const J_DI_GRAPH_ALARMH_ID_TERM = "set_alarmH_di";
const J_DI_GRAPH_ALARMHE_ID_TERM = "set_alarmHE_di";
const J_DI_GRAPH_LMALARME_ID_TERM = "A4C4_InputRateChange_di";
const J_DI_GRAPH_LSTATETOONMALARME_ID_TERM = "A4C4_InputStateChangeToOn_di";
const J_DI_GRAPH_LSTATETOOFFMALARME_ID_TERM = "A4C4_InputStateChangeToOff_di";

// DI-TIMER
const A4C4_TIMER_TITLE_ID = "a4c4set_title_";
const A4C4_TIMER_INPUT_MULTI_ID = "a4c4set_input_multi_";
const A4C4_TIMER_DEC_ID = "a4c4set_decimal_";
const A4C4_TIMER_UNIT_ID = "a4c4set_unit_";
const A4C4_TIMER_GRAPH_TYPE_ID = "a4c4set_graphType_";
const A4C4_TIMER_GRAPHH_ID = "a4c4set_graphH_";
const A4C4_TIMER_ALARMH_ID = "a4c4set_alarmH_";
const A4C4_TIMER_ALARMHE_ID_TERM = "a4c4set_alarmHE_";
const A4C4_TIMER_ENABLED_ID = "a4c4_isGetdi_";
const A4C4_TIMER_LMALARME_ID = "a4c4_InputRateChange_";
const A4C4_TIMER_LSTATETOONMALARME_ID = "a4c4_InputStateChangeToOn_";
const A4C4_TIMER_LSTATETOOFFMALARME_ID = "a4c4_InputStateChangeToOff_";

/**
* HLR Data display clear
*/
function fncHlrDspData(tvid, UnitNo, isUnitChg, hlrsetting, unitSts, settingObj, realtimeObj) {

    // 最初、ALLDATA表示で設定値、瞬時値を表示する
    if (isUnitChg == true) {
        // 設定値を取得して、バックアップする
        var hlrad_set_tmp = [{
            "Title": "",
            "Range": 0,
            "Point": 0,
            "Out": [0, 0],
            "Unit": "--",
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "AlarmMinMaxE": [0, 0],
            "HistogramE": 0
        },
        {
            "Title": "",
            "Range": 0,
            "Point": 0,
            "Out": [0, 0],
            "Unit": "--",
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "AlarmMinMaxE": [0, 0],
            "HistogramE": 0
        },
        {
            "Title": "",
            "Range": 0,
            "Point": 0,
            "Out": [0, 0],
            "Unit": "--",
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "AlarmMinMaxE": [0, 0],
            "HistogramE": 0
        },
        {
            "Title": "",
            "Range": 0,
            "Point": 0,
            "Out": [0, 0],
            "Unit": "--",
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "AlarmMinMaxE": [0, 0],
            "HistogramE": 0
        }
        ];

        var hlrdi_set_tmp = [{
            "Title": "",
            "Multi": 1,
            "Point": 0,
            "Unit": "--",
            "GraphType": 0,
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0]
        },
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
        ];

        var hlrtime_set_tmp = [{
            "Title": "",
            "Multi": 1,
            "Point": 0,
            "Unit": "--",
            "GraphType": 0,
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "Enable": 0
        },
        {
            "Title": "",
            "Multi": 1,
            "Point": 0,
            "Unit": "--",
            "GraphType": 0,
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "Enable": 0
        },
        {
            "Title": "",
            "Multi": 1,
            "Point": 0,
            "Unit": "--",
            "GraphType": 0,
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "Enable": 0
        },
        {
            "Title": "",
            "Multi": 1,
            "Point": 0,
            "Unit": "--",
            "GraphType": 0,
            "Graph": [0, 0],
            "Alarm": [0, 0],
            "AlarmE": [0, 0],
            "Enable": 0
        }
        ];

        var hlrdo_set_tmp = [{
            "Title": "DO1",
            "Alarm": [0, 0],
            "Control": 0
        }
        ];

        var rssi = {
            "Title": "電波強度",
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };

        hlrsetting.setting = { "adset": hlrad_set_tmp, "diset": hlrdi_set_tmp, "DiTimer": hlrtime_set_tmp, "doset": hlrdo_set_tmp, 'rssi': rssi };

        for (var i = 0; i < 4; i++) {
            hlrsetting.setting.adset[i].Title = jis2chr(settingObj.An[i].Title);
            hlrsetting.setting.adset[i].Range = settingObj.An[i].Range;
            hlrsetting.setting.adset[i].Point = settingObj.An[i].Point;
            hlrsetting.setting.adset[i].Out[0] = settingObj.An[i].Out[0];
            hlrsetting.setting.adset[i].Out[1] = settingObj.An[i].Out[1];
            hlrsetting.setting.adset[i].Unit = jis2chr(settingObj.An[i].Unit);
            hlrsetting.setting.adset[i].Graph[0] = settingObj.An[i].Graph[0];
            hlrsetting.setting.adset[i].Graph[1] = settingObj.An[i].Graph[1];
            hlrsetting.setting.adset[i].Alarm[0] = settingObj.An[i].Alarm[0];
            hlrsetting.setting.adset[i].Alarm[1] = settingObj.An[i].Alarm[1];
            hlrsetting.setting.adset[i].AlarmE[0] = settingObj.An[i].AlarmE[0];
            hlrsetting.setting.adset[i].AlarmE[1] = settingObj.An[i].AlarmE[1];
            hlrsetting.setting.adset[i].AlarmMinMaxE[0] = settingObj.An[i].AlarmMinMaxE[0];
            hlrsetting.setting.adset[i].AlarmMinMaxE[1] = settingObj.An[i].AlarmMinMaxE[1];
            hlrsetting.setting.adset[i].HistogramE = settingObj.An[i].HistogramE;

            hlrsetting.setting.diset[i].Title = jis2chr(settingObj.Di[i].Title);
            hlrsetting.setting.diset[i].Multi = parseInt(settingObj.Di[i].Multi, 16);
            hlrsetting.setting.diset[i].Point = settingObj.Di[i].Point;
            hlrsetting.setting.diset[i].Unit = jis2chr(settingObj.Di[i].Unit);
            hlrsetting.setting.diset[i].GraphType = parseInt(settingObj.Di[i].GraphType, 16);
            hlrsetting.setting.diset[i].Graph[0] = settingObj.Di[i].Graph[0];
            hlrsetting.setting.diset[i].Graph[1] = settingObj.Di[i].Graph[1];
            hlrsetting.setting.diset[i].Alarm[0] = settingObj.Di[i].Alarm[0];
            hlrsetting.setting.diset[i].Alarm[1] = settingObj.Di[i].Alarm[1];
            hlrsetting.setting.diset[i].AlarmE[0] = settingObj.Di[i].AlarmE[0];
            hlrsetting.setting.diset[i].AlarmE[1] = settingObj.Di[i].AlarmE[1];

            hlrsetting.setting.DiTimer[i].Title = jis2chr(settingObj.DiTimer[i].Title);
            hlrsetting.setting.DiTimer[i].Multi = parseInt(settingObj.DiTimer[i].Multi, 16);
            hlrsetting.setting.DiTimer[i].Point = settingObj.DiTimer[i].Point;
            hlrsetting.setting.DiTimer[i].Unit = jis2chr(settingObj.DiTimer[i].Unit);
            hlrsetting.setting.DiTimer[i].GraphType = parseInt(settingObj.DiTimer[i].GraphType, 16);
            hlrsetting.setting.DiTimer[i].Graph[0] = settingObj.DiTimer[i].Graph[0];
            hlrsetting.setting.DiTimer[i].Graph[1] = settingObj.DiTimer[i].Graph[1];
            hlrsetting.setting.DiTimer[i].Alarm[0] = settingObj.DiTimer[i].Alarm[0];
            hlrsetting.setting.DiTimer[i].Alarm[1] = settingObj.DiTimer[i].Alarm[1];
            hlrsetting.setting.DiTimer[i].AlarmE[0] = settingObj.DiTimer[i].AlarmE[0];
            hlrsetting.setting.DiTimer[i].AlarmE[1] = settingObj.DiTimer[i].AlarmE[1];
            hlrsetting.setting.DiTimer[i].Enable = settingObj.DiTimer[i].Enable;
        }

        hlrsetting.setting.doset.Title = "DO";
        hlrsetting.setting.doset.Control = settingObj.Do.Ctrol;

        if (hlrsetting.type == UnitCode.HLR_A4C4) {
            hlrsetting.setting.rssi.Title = (settingObj) ? (settingObj.RSSI_Title) : '';
        }

        if (hlrsetting.setting !== null) {
            /* Title */
            $('#' + tvid + "id-title-ad1").text(hlrsetting.setting.adset[0].Title);
            $('#' + tvid + "id-title-ad2").text(hlrsetting.setting.adset[1].Title);
            $('#' + tvid + "id-title-ad3").text(hlrsetting.setting.adset[2].Title);
            $('#' + tvid + "id-title-ad4").text(hlrsetting.setting.adset[3].Title);
            $('#' + tvid + "id-title-di1").text(hlrsetting.setting.diset[0].Title);
            $('#' + tvid + "id-title-di2").text(hlrsetting.setting.diset[1].Title);
            $('#' + tvid + "id-title-di3").text(hlrsetting.setting.diset[2].Title);
            $('#' + tvid + "id-title-di4").text(hlrsetting.setting.diset[3].Title);
            $('#' + tvid + "idstatus_title_di1").text(hlrsetting.setting.diset[0].Title);
            $('#' + tvid + "idstatus_title_di2").text(hlrsetting.setting.diset[1].Title);
            $('#' + tvid + "idstatus_title_di3").text(hlrsetting.setting.diset[2].Title);
            $('#' + tvid + "idstatus_title_di4").text(hlrsetting.setting.diset[3].Title);
            $('#' + tvid + "id-title-timer1").text(hlrsetting.setting.DiTimer[0].Title);
            $('#' + tvid + "id-title-timer2").text(hlrsetting.setting.DiTimer[1].Title);
            $('#' + tvid + "id-title-timer3").text(hlrsetting.setting.DiTimer[2].Title);
            $('#' + tvid + "id-title-timer4").text(hlrsetting.setting.DiTimer[3].Title);
            // dBm
            if (hlrsetting.type == UnitCode.HLR_A4C4) {
                $('#' + tvid + "iddbm_title").text(jis2chr(hlrsetting.setting.rssi.Title));
            }
        }

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlrsetting.type, settingObj, UnitNo);

        // 最初、ALLDATA表示で瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrsetting.setting == null) || (realtimeObj == null)) {
            var retobj = null;
            // 複合グラフ表示のように瞬時値をバックアップする
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra4c4(hlrsetting, tvid, retobj);
        }
        else {
            // 複合グラフ表示のように瞬時値をバックアップする
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSavehlrInstance(tmpObj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra4c4(hlrsetting, tvid, realtimeObj);
        }
    }
    else {
        if (hlrsetting.setting !== null) {
            /* Title */
            $('#' + tvid + "id-title-ad1").text(hlrsetting.setting.adset[0].Title);
            $('#' + tvid + "id-title-ad2").text(hlrsetting.setting.adset[1].Title);
            $('#' + tvid + "id-title-ad3").text(hlrsetting.setting.adset[2].Title);
            $('#' + tvid + "id-title-ad4").text(hlrsetting.setting.adset[3].Title);
            $('#' + tvid + "id-title-di1").text(hlrsetting.setting.diset[0].Title);
            $('#' + tvid + "id-title-di2").text(hlrsetting.setting.diset[1].Title);
            $('#' + tvid + "id-title-di3").text(hlrsetting.setting.diset[2].Title);
            $('#' + tvid + "id-title-di4").text(hlrsetting.setting.diset[3].Title);
            $('#' + tvid + "idstatus_title_di1").text(hlrsetting.setting.diset[0].Title);
            $('#' + tvid + "idstatus_title_di2").text(hlrsetting.setting.diset[1].Title);
            $('#' + tvid + "idstatus_title_di3").text(hlrsetting.setting.diset[2].Title);
            $('#' + tvid + "idstatus_title_di4").text(hlrsetting.setting.diset[3].Title);
            $('#' + tvid + "id-title-timer1").text(hlrsetting.setting.DiTimer[0].Title);
            $('#' + tvid + "id-title-timer2").text(hlrsetting.setting.DiTimer[1].Title);
            $('#' + tvid + "id-title-timer3").text(hlrsetting.setting.DiTimer[2].Title);
            $('#' + tvid + "id-title-timer4").text(hlrsetting.setting.DiTimer[3].Title);

            if (hlrsetting.type == UnitCode.HLR_A4C4) {
                $('#' + tvid + "iddbm_title").text(jis2chr(hlrsetting.setting.rssi.Title));
            }
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrsetting.setting == null)) {
            var retobj = null;
            // 複合グラフ表示のように瞬時値をバックアップする
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra4c4(hlrsetting, tvid, retobj);
            return;
        }

        // 通信OK、瞬時値を取得してから、表示する
        rs485_insread_data(UnitNo, function (obj, hlrsetting) {
            // 複合グラフ表示のように瞬時値をバックアップする
            if (gActivedType == ActiveType.Atv_AllGroup) {
                fncDoSavehlrInstance(obj, UnitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataHlra4c4(hlrsetting, tvid, obj.Respons);

        }, hlrsetting);

    }
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 * isUnitChg: true→初めての表示
 */
function fncLoadRealtimeDataHlra4c4(hlrsetting, tvid, realtimeObj) {

    // 通信異常と瞬時値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "idvalad1").text("--");
        $('#' + tvid + "idvalad2").text("--");
        $('#' + tvid + "idvalad3").text("--");
        $('#' + tvid + "idvalad4").text("--");
        $('#' + tvid + "idvaldi1").text("--");
        $('#' + tvid + "idvaldi2").text("--");
        $('#' + tvid + "idvaldi3").text("--");
        $('#' + tvid + "idvaldi4").text("--");
        $('#' + tvid + "idvaldo1").text("--");
        $('#' + tvid + "idstatusdo1").text("");
        $('#' + tvid + "idstatusdi1").text("");
        $('#' + tvid + "idstatusdi2").text("");
        $('#' + tvid + "idstatusdi3").text("");
        $('#' + tvid + "idstatusdi4").text("");
        $('#' + tvid + "idvaldbm").text("--");

        $('#' + tvid + "idvaltimer1").text("--");
        $('#' + tvid + "idvaltimer2").text("--");
        $('#' + tvid + "idvaltimer3").text("--");
        $('#' + tvid + "idvaltimer4").text("--");

        $('#' + tvid + "idstatusdo1").removeClass("text-light shadow");
        $('#' + tvid + "idstatusdo1").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "idstatusdi1").removeClass("text-light shadow");
        $('#' + tvid + "idstatusdi1").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "idstatusdi2").removeClass("text-light shadow");
        $('#' + tvid + "idstatusdi2").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "idstatusdi3").removeClass("text-light shadow");
        $('#' + tvid + "idstatusdi3").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        $('#' + tvid + "idstatusdi4").removeClass("text-light shadow");
        $('#' + tvid + "idstatusdi4").css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');


    }
    else {
        // 通信正常、瞬時値がある場合
        var termdata;
        // 時刻を更新
        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        // 電波強度の表示を更新
        if (hlrsetting.type == UnitCode.HLR_A4C4) {
            $('#' + tvid + "idvaldbm").text(realtimeObj.RSSI + " [dBm]");
        }
        else {
            $('#' + tvid + "idvaldbm").text("");
        }

        $('#' + tvid + "idvaldo1").text(realtimeObj.Data.Do[0].Value + " [回]");
        termdata = parseInt(realtimeObj.Data.Do[0].State, 16);

        //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
        // xxxx xxxx 01xx xxxx               
        if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
            $('#' + tvid + "idstatusdo1").html("OFF");
            $('#' + tvid + "idstatusdo1").removeClass("text-light shadow");
            $('#' + tvid + "idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[0]
            });
        }

        //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
        // xxxx xxxx 10xx xxxx
        else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
            $('#' + tvid + "idstatusdo1").html("ON");
            $('#' + tvid + "idstatusdo1").addClass("text-light shadow");
            $('#' + tvid + "idstatusdo1").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[1],
                "background-color": DO_DI_ONOFF_BGCOLOR[1]
            });
        }

        //不明
        // xxxx xxxx xx11 xxxx
        // xxxx xxxx xx00 xxxx
        else {
            $('#' + tvid + "idstatusdo1" + m).html("--");
            $('#' + tvid + "idstatusdo1" + m).removeClass("text-light shadow");
            $('#' + tvid + "idstatusdo1" + m).css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }

        for (var m = 1; m < 5; m++) {
            // AD
            if (hlrsetting.setting.adset[m - 1].Range != 0) {
                if ((isNaN(realtimeObj.Data.An[m - 1].Value) == true) || (realtimeObj.Data.An[m - 1].Value === '') || (realtimeObj.Data.An[m - 1].Value == null)) {
                    $('#' + tvid + "idvalad" + m).text("");
                }
                else {
                    $('#' + tvid + "idvalad" + m).text(parseFloat(realtimeObj.Data.An[m - 1].Value).toFixed(hlrsetting.setting.adset[m - 1].Point) + " [" + hlrsetting.setting.adset[m - 1].Unit + "]");
                }
            }
            else {
                $('#' + tvid + "idvalad" + m).text("");
            }
            // Di
            if ((isNaN(realtimeObj.Data.Di[m - 1].Value) == true) || (realtimeObj.Data.Di[m - 1].Value === '') || (realtimeObj.Data.Di[m - 1].Value == null)) {
                $('#' + tvid + "idvaldi" + m).text("");
            }
            else {
                $('#' + tvid + "idvaldi" + m).text(parseFloat(realtimeObj.Data.Di[m - 1].Value).toFixed(hlrsetting.setting.diset[m - 1].Point) + " [" + hlrsetting.setting.diset[m - 1].Unit + "]");
            }

            // DI-Timer
            if (hlrsetting.setting.DiTimer[m - 1].Enable == 0) {
                $('#' + tvid + "idvaltimer" + m).text("");
            }
            else {
                if ((isNaN(realtimeObj.Data.Di[m - 1].Timer) == true) || (realtimeObj.Data.Di[m - 1].Timer === '') || (realtimeObj.Data.Di[m - 1].Timer == null)) {
                    $('#' + tvid + "idvaltimer" + m).text("");
                }
                else {
                    $('#' + tvid + "idvaltimer" + m).text(parseFloat(realtimeObj.Data.Di[m - 1].Timer).toFixed(hlrsetting.setting.DiTimer[m - 1].Point) + " [" + hlrsetting.setting.DiTimer[m - 1].Unit + "]");
                }
            }

            termdata = parseInt(realtimeObj.Data.Di[m - 1].State, 16);

            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $('#' + tvid + "idstatusdi" + m).html("OFF");
                $('#' + tvid + "idstatusdi" + m).removeClass("text-light shadow");
                $('#' + tvid + "idstatusdi" + m).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }

            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $('#' + tvid + "idstatusdi" + m).html("ON");
                $('#' + tvid + "idstatusdi" + m).addClass("text-light shadow");
                $('#' + tvid + "idstatusdi" + m).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }

            //不明
            // xxxx xxxx xx11 xxxx
            // xxxx xxxx xx00 xxxx
            else {
                $('#' + tvid + "idstatusdi" + m).html("--");
                $('#' + tvid + "idstatusdi" + m).removeClass("text-light shadow");
                $('#' + tvid + "idstatusdi" + m).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }
        }
    }

}

/**
 * hlr instance save
 */
function fncDoSavehlrInstance(obj, UnitNo, gwid) {
    var retobj = [];
    if (obj.Status == 200) {
        if (obj.Respons.Data == null) {
            retobj = null;
        }
        else {
            var dataobj = [];
            var tmpVal = [];
            var strprop;
            for (var i = 0; i < 4; i++) {
                strprop = "an" + (i + 1).toString();
                // An
                tmpVal[strprop] = {
                    Value: obj.Respons.Data.An[i].Value,
                    State: obj.Respons.Data.An[i].State
                };

                // An-Max-Min-Avg
                tmpVal[strprop + "_max"] = {
                    Value: obj.Respons.Data.An[i].Max,
                    State: obj.Respons.Data.An[i].State
                };
                tmpVal[strprop + "_min"] = {
                    Value: obj.Respons.Data.An[i].Min,
                    State: obj.Respons.Data.An[i].State
                };
                tmpVal[strprop + "_ave"] = {
                    Value: obj.Respons.Data.An[i].Avg,
                    State: obj.Respons.Data.An[i].State
                };

                // Di
                strprop = "di" + (i + 1).toString() + "_counter";
                tmpVal[strprop] = {
                    Value: obj.Respons.Data.Di[i].Value,
                    State: obj.Respons.Data.Di[i].State
                };

                // Di Timer
                strprop = "di" + (i + 1).toString() + "_timer";
                tmpVal[strprop] = {
                    Value: obj.Respons.Data.Di[i].Timer,
                    State: obj.Respons.Data.Di[i].State
                };
            }
            tmpVal["rssi"] = { Value: obj.Respons.RSSI };

            dataobj["Data"] = tmpVal;
            dataobj["Time"] = obj.Respons.Time;
            dataobj["RSSI"] = obj.Respons.RSSI;
            // dataobj["Flag"] = obj.Respons.Flag;
            retobj["Respons"] = dataobj;
            retobj["Status"] = obj.Status;
        }
    }
    else {
        var retobj = null;
    }
    // Save Instance Data for Combine Graph
    fncSaveInstanceforCombiGraph(retobj, UnitNo, gwid);
}

/**
 * hlr instance data display
 */
function displayhlradata(hlra4c4insdat, setdata) {
    var j;
    var term, term2;

    //正常
    if (hlra4c4insdat.Status == 200) {
        //データが無い場合
        if (hlra4c4insdat.Respons.Data == null) {
            $("#hlrupdated_time").html("データ更新：----/--/-- --:--");
            //各ADと各DI
            //瞬時値テーブルで
            for (var i = 0; i < 4; i++) {
                //1～4
                j = (i + 1).toString()

                //---------------------AD---------------------
                term = HLRA4C4_ADVAL + j;
                $(term).html("--");

                //---------------------DI---------------------
                term = HLRA4C4_DIVAL + j;
                $(term).html("--");

                //---------------------DI Timer---------------------
                term = HLRA4C4_TIMEVAL + j;
                $(term).html("--");

                //オン・オフバーで
                term2 = HLRA4C4_DISTS + j;
                $(term2).html("");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }
            $("#idvaldbm").html("--");

            //オン・オフバーで
            $(HLRA4C4_DOSTS).html("");
            $(HLRA4C4_DOSTS).removeClass("text-light");
            $(HLRA4C4_DOSTS).removeClass("text-light shadow");
            $(HLRA4C4_DOSTS).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        //データがある場合
        else {
            //---------------------Data - Show out---------------------
            //時間
            //最新の時間を取得
            term = "データ更新：" + hlra4c4insdat.Respons.Time[0] + "/" + ("0" + hlra4c4insdat.Respons.Time[1]).slice(-2) + "/" + ("0" + hlra4c4insdat.Respons.Time[2]).slice(-2) + " " + ("00" + hlra4c4insdat.Respons.Time[3]).slice(-2) + ":" + ("0" + hlra4c4insdat.Respons.Time[4]).slice(-2);
            //時間バーに更新
            $("#hlrupdated_time").html(term);

            //表示
            for (var i = 0; i < 4; i++) {
                //1～4
                j = (i + 1).toString()

                //---------------------AD---------------------
                //瞬時値テーブル
                term = HLRA4C4_ADVAL + j;
                if (setdata.setting.adset[i].Range != 0) {
                    if ((isNaN(hlra4c4insdat.Respons.Data.An[i].Value) == true) || (hlra4c4insdat.Respons.Data.An[i].Value === '') || (hlra4c4insdat.Respons.Data.An[i].Value == null)) {
                        term2 = '';
                    }
                    else {
                        strdata = parseFloat(hlra4c4insdat.Respons.Data.An[i].Value).toFixed(setdata.setting.adset[i].Point);
                        term2 = strdata + " [" + setdata.setting.adset[i].Unit + "]";
                    }
                    $(term).html(term2);
                }
                else {
                    $(term).html("");
                }

                //---------------------DI---------------------
                //瞬時値テーブルで
                term = HLRA4C4_DIVAL + j;
                if ((isNaN(hlra4c4insdat.Respons.Data.Di[i].Value) == true) || (hlra4c4insdat.Respons.Data.Di[i].Value === '') || (hlra4c4insdat.Respons.Data.Di[i].Value == null)) {
                    term2 = '';
                }
                else {
                    termdata = parseFloat(hlra4c4insdat.Respons.Data.Di[i].Value).toFixed(setdata.setting.diset[i].Point);
                    term2 = termdata.toString() + " [" + setdata.setting.diset[i].Unit + "]";
                }
                $(term).html(term2);

                //オン・オフバーで
                term2 = HLRA4C4_DISTS + j;
                termdata = parseInt(hlra4c4insdat.Respons.Data.Di[i].State, 16);

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

                //---------------------DI-Timer---------------------
                term = HLRA4C4_TIMEVAL + j;
                if (setdata.setting.DiTimer[i].Enable != 0) {
                    if ((isNaN(hlra4c4insdat.Respons.Data.Di[i].Timer) == true) || (hlra4c4insdat.Respons.Data.Di[i].Timer === '') || (hlra4c4insdat.Respons.Data.Di[i].Timer == null)) {
                        term2 = '';
                    }
                    else {
                        strdata = parseFloat(hlra4c4insdat.Respons.Data.Di[i].Timer).toFixed(setdata.setting.DiTimer[i].Point);
                        term2 = strdata.toString() + " [" + setdata.setting.DiTimer[i].Unit + "]";
                    }
                    $(term).html(term2);
                }
                else {
                    $(term).html("");
                }


            }

            //--------------------電波強度--------------------------
            if (gcrurbranch == 1) {
                $("#idvaldbm").html(hlra4c4insdat.Respons.RSSI + " [dBm]");
            }
            else {
                $("#idvaldbm").html("");
            }
            //---------------------DO---------------------
            //データを表示
            //瞬時値テーブルで
            term = HLRA4C4_DOVAL;
            termdata = parseInt(hlra4c4insdat.Respons.Data.Do[0].Value, 10);
            strdata = termdata.toString() + " [回]";
            $(term).html(strdata);

            //DOのオン・オフ状態
            termdata = parseInt(hlra4c4insdat.Respons.Data.Do[0].State, 16);
            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx               
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $(HLRA4C4_DOSTS).html("OFF");
                $(HLRA4C4_DOSTS).removeClass("text-light shadow");
                $(HLRA4C4_DOSTS).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }
            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx                
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $(HLRA4C4_DOSTS).html("ON");
                $(HLRA4C4_DOSTS).addClass("text-light shadow");
                $(HLRA4C4_DOSTS).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx 11xx xxxx
            // xxxx xxxx 00xx xxxx                
            else {
                $(HLRA4C4_DOSTS).html("--");
                $(HLRA4C4_DOSTS).removeClass("text-light shadow");
                $(HLRA4C4_DOSTS).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }

            //警報状態
            var alert_exist = 0;// 0: success; 1; danger; 2: warning
            term = "#alertH_hlr";
            var alert_str1 = "";
            var unknown = false;
            //An
            for (var i = 0; i < 4 && alert_exist == 0; i++) {
                if (hlra4c4insdat.Respons.Data.An[i].State == null) {
                    unknown = true;
                }
                termdata = parseInt(hlra4c4insdat.Respons.Data.An[i].State, 16);

                //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                // xxxx 10xx xxxx xxxx
                if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                    alert_exist = 1;
                    alert_str1 = setdata.setting.adset[i].Title;
                }
                //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                // xxxx 01xx xxxx xxxx
                else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                    alert_exist = 2;
                    alert_str1 = setdata.setting.adset[i].Title;
                }
                //不明
                // xxxx 11xx xxxx xxxx
                else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                    //alert_exist = 2;
                    alert_str1 = setdata.setting.adset[i].Title;
                    unknown = true;
                }
            }
            // 最大・最小警報
            for (var i = 0; i < 4; i++) {
                termdata = parseInt(hlra4c4insdat.Respons.Data.An[i].State, 16);
                // 最大警報
                // xxxx xxxx 1xxx xxxx
                if ((termdata & 0x0080) == 0x0080) {
                    alert_exist = 5;
                    alert_str1 = setdata.setting.adset[i].Title;
                    break;
                }
                // 最小警報
                // xxxx xxxx x1xx xxxx
                if ((termdata & 0x0040) == 0x0040) {
                    alert_exist = 4;
                    alert_str1 = setdata.setting.adset[i].Title;
                    break;
                }
            }

            // アナログ入力異常
            for (var i = 0; i < 4; i++) {
                termdata = parseInt(hlra4c4insdat.Respons.Data.An[i].State, 16);
                if ((termdata & 0x0001) == 0x0001) {
                    alert_exist = 3;
                    alert_str1 = setdata.setting.adset[i].Title;
                    break;
                }
            }

            //DI
            for (var i = 0; i < 4 && alert_exist == 0; i++) {
                // State
                if (hlra4c4insdat.Respons.Data.Di[i].State == null) {
                    unknown = true;
                }
                termdata = parseInt(hlra4c4insdat.Respons.Data.Di[i].State, 16);
                // DI-Timer
                if ((setdata.setting.DiTimer[i].Enable !== 0)) {
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if ((termdata & 0x8000) == 0x8000) {
                        alert_exist = 1;
                        alert_str1 = setdata.setting.DiTimer[i].Title;
                    }
                }

                // DI
                //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                // xxxx 10xx xxxx xxxx
                if ((termdata & 0x0800) == 0x0800) {
                    alert_exist = 1;
                    alert_str1 = setdata.setting.diset[i].Title;
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
            } else if (alert_exist == 3) {
                $(term).addClass("alert-danger");
                $(term).html("<strong>" + alert_str1 + "</strong>" + " アナログ入力異常が発生しています！　");
            } else if (alert_exist == 4) {
                $(term).addClass("alert-warning");
                $(term).html("<strong>" + alert_str1 + "</strong>" + "（最小値）が下限警報発生値を下回っています！　");
            } else if (alert_exist == 5) {
                $(term).addClass("alert-danger");
                $(term).html("<strong>" + alert_str1 + "</strong>" + "（最大値）が上限警報発生値を超えています！　");
            }
            else if (unknown == true) {
                $(term).html("<strong>" + alert_str1 + "</strong>" + "-----　");
            } else {
                $(term).addClass("alert-success");
                $(term).html("<strong>正常</strong>　");
            }
        }
    }
    else {
        $("#hlrupdated_time").html("データ更新：----/--/-- --:--");
        //各ADと各DI
        for (var i = 0; i < 4; i++) {
            //1～4
            //瞬時値テーブルで
            j = (i + 1).toString()

            //---------------------AD---------------------
            term = HLRA4C4_ADVAL + j;
            $(term).html("--");

            //---------------------DI---------------------
            term = HLRA4C4_DIVAL + j;
            $(term).html("--");

            //---------------------DI Timer---------------------
            term = HLRA4C4_TIMEVAL + j;
            $(term).html("--");

            //オン・オフバーで
            term2 = HLRA4C4_DISTS + j;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        $("#idvaldbm").html("--");

        //オン・オフバーで
        $(HLRA4C4_DOSTS).html("");
        $(HLRA4C4_DOSTS).removeClass("text-light");
        $(HLRA4C4_DOSTS).removeClass("text-light shadow");
        $(HLRA4C4_DOSTS).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //警報状態
        term = "#alertH_hlr";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).html("<strong>NO DATA</strong>　");
        $(HLRA4C4_DOVAL).html("--");
    }
}

/*******************HLR-A4C4表示*****************************/
/* HLRダイナミク瞬時データ表示作成 */
function fncHlrInstValDsnMake(tvid, title) {

    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlrtitle" class="h5 m-0">hlrtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="id-title-ad1" class="text-center table-active"></th> \
                            <td id="idvalad1" colspan="2" class="text-right">--</td> \
                            <th id="id-title-ad2" class="text-center table-active"></th> \
                            <td id="idvalad2" colspan="2" class="text-right">--</td> \
                            <th id="id-title-ad3" class="text-center table-active"></th> \
                            <td id="idvalad3" colspan="2" class="text-right">--</td> \
                            <th id="id-title-ad4" class="text-center table-active"></th> \
                            <td id="idvalad4" colspan="2" class="text-right">--</td> \
                            <th id="iddbm_title" class="text-center table-active" ></th> \
                            <td id="idvaldbm" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <th id="id-title-di1" class="text-center table-active"></th> \
                            <td id="idvaldi1" colspan="2" class="text-right">--</td> \
                            <th id="id-title-di2" class="text-center table-active"></th> \
                            <td id="idvaldi2" colspan="2" class="text-right">--</td> \
                            <th id="id-title-di3" class="text-center table-active"></th> \
                            <td id="idvaldi3" colspan="2" class="text-right">--</td> \
                            <th id="id-title-di4" class="text-center table-active"></th> \
                            <td id="idvaldi4" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <th id="id-title-timer1" class="text-center table-active"></th> \
                            <td id="idvaltimer1" colspan="2" class="text-right">--</td> \
                            <th id="id-title-timer2" class="text-center table-active"></th> \
                            <td id="idvaltimer2" colspan="2" class="text-right">--</td> \
                            <th id="id-title-timer3" class="text-center table-active"></th> \
                            <td id="idvaltimer3" colspan="2" class="text-right">--</td> \
                            <th id="id-title-timer4" class="text-center table-active"></th> \
                            <td id="idvaltimer4" colspan="2" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
                \
            <!-- DI/DO ON/OFF --> \
            <div class="no-gutters border border-top-0 rounded-bottom"> \
                <div class="col-lg d-flex align-items-center justify-content-around p-1 border-0 flex-wrap"> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div class="mt-2  mr-1 border rounded text-dark h6 p-1 text-nowrap">DO出力</div> \
                        <div id="idstatusdo1" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di1" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI1</div> \
                        <div id="idstatusdi1" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di2" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI2</div> \
                        <div id="idstatusdi2" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di3" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI3</div> \
                        <div id="idstatusdi3" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di4" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI4</div> \
                        <div id="idstatusdi4" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                </div> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlr/g, tvid + "idhlr");
    rtnval = rtnval.replace(/idvalad/g, tvid + "idvalad");
    rtnval = rtnval.replace(/id-title-ad/g, tvid + "id-title-ad");
    rtnval = rtnval.replace(/idvaldi/g, tvid + "idvaldi");
    rtnval = rtnval.replace(/id-title-di/g, tvid + "id-title-di");
    rtnval = rtnval.replace(/idstatus_title_di/g, tvid + "idstatus_title_di");
    rtnval = rtnval.replace(/iddbm_title/g, tvid + "iddbm_title");
    rtnval = rtnval.replace(/idvaldbm/g, tvid + "idvaldbm");
    rtnval = rtnval.replace(/idvaldo/g, tvid + "idvaldo");
    rtnval = rtnval.replace(/idstatusdo/g, tvid + "idstatusdo");
    rtnval = rtnval.replace(/idstatusdi/g, tvid + "idstatusdi");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");
    rtnval = rtnval.replace(/idvaltimer/g, tvid + "idvaltimer");
    rtnval = rtnval.replace(/id-title-timer/g, tvid + "id-title-timer");

    rtnval = rtnval.replace(/hlrtitlestring/g, title)

    return rtnval;
}

/* HRダイナミク瞬時データ表示作成 */
function fncHrInstValDsnMake(tvid, title) {

    var rtnval;

    rtnval = '<!-- HR--> \
    <div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idhrtitle" class="h5 m-0">hrtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="id-title-ad1" class="text-center table-active"></th> \
                            <td id="idvalad1" colspan="2" class="text-right">--</td> \
                            <th id="id-title-ad2" class="text-center table-active"></th> \
                            <td id="idvalad2" colspan="2" class="text-right">--</td> \
                            <th id="id-title-ad3" class="text-center table-active"></th> \
                            <td id="idvalad3" colspan="2" class="text-right">--</td> \
                            <th id="id-title-ad4" class="text-center table-active"></th> \
                            <td id="idvalad4" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <th id="id-title-di1" class="text-center table-active"></th> \
                            <td id="idvaldi1" colspan="2" class="text-right">--</td> \
                            <th id="id-title-di2" class="text-center table-active"></th> \
                            <td id="idvaldi2" colspan="2" class="text-right">--</td> \
                            <th id="id-title-di3" class="text-center table-active"></th> \
                            <td id="idvaldi3" colspan="2" class="text-right">--</td> \
                            <th id="id-title-di4" class="text-center table-active"></th> \
                            <td id="idvaldi4" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <th id="id-title-timer1" class="text-center table-active"></th> \
                            <td id="idvaltimer1" colspan="2" class="text-right">--</td> \
                            <th id="id-title-timer2" class="text-center table-active"></th> \
                            <td id="idvaltimer2" colspan="2" class="text-right">--</td> \
                            <th id="id-title-timer3" class="text-center table-active"></th> \
                            <td id="idvaltimer3" colspan="2" class="text-right">--</td> \
                            <th id="id-title-timer4" class="text-center table-active"></th> \
                            <td id="idvaltimer4" colspan="2" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
                \
            <!-- DI/DO ON/OFF --> \
            <div class="no-gutters border border-top-0 rounded-bottom"> \
                <div class="col-lg d-flex align-items-center justify-content-around p-1 border-0 flex-wrap"> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div class="mt-2  mr-1 border rounded text-dark h6 p-1 text-nowrap">DO出力</div> \
                        <div id="idstatusdo1" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di1" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI1</div> \
                        <div id="idstatusdi1" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di2" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI2</div> \
                        <div id="idstatusdi2" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di3" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI3</div> \
                        <div id="idstatusdi3" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                    </div> \
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="idstatus_title_di4" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI4</div> \
                        <div id="idstatusdi4" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> \
                </div> \
            </div> \
        </div> \
        \
    </div>';

    rtnval = rtnval.replace(/idhr/g, tvid + "idhr");
    rtnval = rtnval.replace(/idvalad/g, tvid + "idvalad");
    rtnval = rtnval.replace(/id-title-ad/g, tvid + "id-title-ad");
    rtnval = rtnval.replace(/idvaldi/g, tvid + "idvaldi");
    rtnval = rtnval.replace(/id-title-di/g, tvid + "id-title-di");
    rtnval = rtnval.replace(/idstatus_title_di/g, tvid + "idstatus_title_di");
    rtnval = rtnval.replace(/idstatusdo/g, tvid + "idstatusdo");
    rtnval = rtnval.replace(/idstatusdi/g, tvid + "idstatusdi");
    rtnval = rtnval.replace(/idvaldo/g, tvid + "idvaldo");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");
    rtnval = rtnval.replace(/hrtitlestring/g, title);
    rtnval = rtnval.replace(/idvaltimer/g, tvid + "idvaltimer");
    rtnval = rtnval.replace(/id-title-timer/g, tvid + "id-title-timer");

    return rtnval;
}

/**
 * hrl グラフデータクリア
 */
function clear_grp_hlr() {
    for (var i = 0; i < graph_data_ad1.length; i++) {
        // AD1~A4
        graph_data_ad1[i] = null;
        graph_data_ad2[i] = null;
        graph_data_ad3[i] = null;
        graph_data_ad4[i] = null;
        // AD1~AD4の最大値
        histogram_maxdata_ad1[i] = null;
        histogram_maxdata_ad2[i] = null;
        histogram_maxdata_ad3[i] = null;
        histogram_maxdata_ad4[i] = null;
        // AD1~AD4の最小値
        histogram_mindata_ad1[i] = null;
        histogram_mindata_ad2[i] = null;
        histogram_mindata_ad3[i] = null;
        histogram_mindata_ad4[i] = null;
        // AD1~AD4の平均値
        histogram_meddata_ad1[i] = null;
        histogram_meddata_ad2[i] = null;
        histogram_meddata_ad3[i] = null;
        histogram_meddata_ad4[i] = null;
        //DI1～DI4
        graph_data_di1[i] = null;
        graph_data_di2[i] = null;
        graph_data_di3[i] = null;
        graph_data_di4[i] = null;
        //強度
        graph_data_dBm[i] = null;
    }

    if (graph_exist == true) {
        if (graph_ad1_exist == true) {
            chart_ad1.destroy();
            graph_ad1_exist = false;
        }
        if (graph_ad2_exist == true) {
            chart_ad2.destroy();
            graph_ad2_exist = false;
        }
        if (graph_ad3_exist == true) {
            chart_ad3.destroy();
            graph_ad3_exist = false;
        }
        if (graph_ad4_exist == true) {
            chart_ad4.destroy();
            graph_ad4_exist = false;
        }

        if (histogram_ad1_exist == true) {
            chart_histogram_ad1.destroy();
            histogram_ad1_exist = false;
        }
        if (histogram_ad2_exist == true) {
            chart_histogram_ad2.destroy();
            histogram_ad2_exist = false;
        }
        if (histogram_ad3_exist == true) {
            chart_histogram_ad3.destroy();
            histogram_ad3_exist = false;
        }
        if (histogram_ad4_exist == true) {
            chart_histogram_ad4.destroy();
            histogram_ad4_exist = false;
        }

        chart_di1.destroy();
        chart_di2.destroy();
        chart_di3.destroy();
        chart_di4.destroy();

        if (graph_timer1_exist == true) {
            chart_timer1.destroy();
            graph_timer1_exist = false;
        }
        if (graph_timer2_exist == true) {
            chart_timer2.destroy();
            graph_timer2_exist = false;
        }
        if (graph_timer3_exist == true) {
            chart_timer3.destroy();
            graph_timer3_exist = false;
        }
        if (graph_timer4_exist == true) {
            chart_timer4.destroy();
            graph_timer4_exist = false;
        }

        chart_dBm.destroy();

        graph_exist = false;
        histogram_exist = false;
    }

    for (var i = 0; i < 4; i++) {
        var j = (i + 1).toString();
        //グラフの単位
        term = HRLA4C4_GRPADUNIT + j.toString();
        $(term).html("--");

        //グラフのタイトル
        term = HRLA4C4_GRPADTITLE + j;
        $(term).html("--");

        // 最大、最小、平均のグラフの単位
        term = HRLA4C4_HISTOGRAM_ADUNIT + j.toString();
        $(term).html("--");

        //最大、最小、平均のグラフのタイトル
        term = HRLA4C4_HISTOGRAM_ADTITLE + j;
        $(term).html("--");

        // 上限警報発生値
        term = HRLA4C4_GRPADHALRM + j;
        $(term).html("上限警報発生値 -- [--]");

        // 下限警報発生値
        term = HRLA4C4_GRPADLALRM + j;
        $(term).html("下限警報発生値 -- [--]");

        //DIグラフの単位
        term = HRLA4C4_GRPDIUNIT + j;
        $(term).html("--");

        //DIグラフのタイトル
        term = HRLA4C4_GRPDITITLE + j;
        $(term).html("--");

        // DI上限警報発生値
        term = HRLA4C4_GRPDIHALRM + j;
        $(term).css({ "display": "none" });

        //DI TImerグラフの単位
        term = HRLA4C4_GRPTIMEUNIT + j;
        $(term).html("--");

        //DI TImerグラフのタイトル
        term = HRLA4C4_GRPTIMETITLE + j;
        $(term).html("--");

        // DI Timer上限警報発生値
        term = HRLA4C4_GRPTIMEHALRM + j;
        $(term).css({ "display": "none" });

    }

    $("#idgrptitledBm").html("--");

    $("#hlrupdated_time").html("データ更新：----/--/-- --:--");

    //各ADと各DIの瞬時値
    for (var i = 0; i < 4; i++) {
        //1～4
        j = (i + 1).toString()

        //---------------------AD---------------------
        //瞬時値テーブルで
        term = HLRA4C4_ADVAL + j;
        $(term).html("--");

        //---------------------DI---------------------
        //瞬時値テーブルで
        term = HLRA4C4_DIVAL + j;
        $(term).html("--");

        //---------------------DI Timer---------------------
        //瞬時値テーブルで
        term = HLRA4C4_TIMEVAL + j;
        $(term).html("--");

        //オン・オフバーで
        term2 = HLRA4C4_DISTS + j;
        $(term2).html("");
        $(term2).removeClass("text-light shadow");
        $(term2).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });
    }

    //電波強度
    $("#idvaldbm").html("--");

    //オン・オフバーで
    $(HLRA4C4_DOSTS).html("");
    $(HLRA4C4_DOSTS).removeClass("text-light");
    $(HLRA4C4_DOSTS).removeClass("text-light shadow");
    $(HLRA4C4_DOSTS).css({
        "background-color": DO_DI_ONOFF_BGCOLOR[2]
    });
    $(HLRA4C4_DOVAL).html("--");

    var term = "#alertH_hlr";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");

}

/**
 * HLR-A4C4の設定値をすべてに表示する
 * （瞬時値タイトル、グラフのタイトルのユニット、タイトル）
 */
function displayhlrasetting(setdata) {
    var term;
    var term2;
    // 設定値が有効
    if (setdata.setting !== null) {
        for (var i = 0; i < 4; i++) {
            var j = (i + 1).toString();

            //瞬時値タイトル
            term = HLRA4C4_ADTITLE + j;
            term2 = setdata.setting.adset[i].Title;
            $(term).html(term2);

            //グラフの単位
            term = HRLA4C4_GRPADUNIT + j;
            term2 = " [" + setdata.setting.adset[i].Unit + "]";
            $(term).html(term2);
            // 最大、最小、平均のグラフの単位
            term = HRLA4C4_HISTOGRAM_ADUNIT + j;
            $(term).html(term2);

            //グラフのタイトル
            term = HRLA4C4_GRPADTITLE + j;
            term2 = setdata.setting.adset[i].Title;
            $(term).html(term2);

            //最大、最小、平均のグラフのタイトル
            term = HRLA4C4_HISTOGRAM_ADTITLE + j;
            term2 = setdata.setting.adset[i].Title + "(最大値、最小値、平均値)";
            $(term).html(term2);

            // 上限警報発生値
            term = HRLA4C4_GRPADHALRM + j;
            term2 = "上限警報発生値 " + setdata.setting.adset[i].Alarm[1].toFixed(setdata.setting.adset[i].Point) + " [" + setdata.setting.adset[i].Unit + "]";
            $(term).html(term2);

            // 警報上限有無
            term = HRLA4C4_GRPADHEALRM + j;
            if (setdata.setting.adset[i].AlarmE[1] == 0) {
                $(term).css({ "display": "none" })
            }
            else {
                $(term).css({ "display": "block" })
            }

            // 下限警報発生値
            term = HRLA4C4_GRPADLALRM + j;
            term2 = "下限警報発生値 " + setdata.setting.adset[i].Alarm[0].toFixed(setdata.setting.adset[i].Point) + " [" + setdata.setting.adset[i].Unit + "]";
            $(term).html(term2);
            // 警報下限有無
            term = HRLA4C4_GRPADLEALRM + j;
            if (setdata.setting.adset[i].AlarmE[0] == 0) {
                $(term).css({ "display": "none" })
            }
            else {
                $(term).css({ "display": "block" })
            }

            // DI ********************************************************************
            //グラフの単位
            term = HRLA4C4_GRPDIUNIT + j;
            term2 = " [" + setdata.setting.diset[i].Unit + "]";
            $(term).html(term2);

            //グラフのタイトル
            term = HRLA4C4_GRPDITITLE + j;
            term2 = setdata.setting.diset[i].Title;
            $(term).html(term2);

            //瞬時値タイトル
            term = HLRA4C4_DITITLE + j;
            term2 = setdata.setting.diset[i].Title;
            $(term).html(term2);

            //瞬時値タイトル
            term = HLRA4C4_DISTSTITLE + j;
            term2 = setdata.setting.diset[i].Title;
            $(term).html(term2);

            // 上限警報発生値
            term = HRLA4C4_GRPDIHALRM + j;
            term2 = "上限警報発生値 " + setdata.setting.diset[i].Alarm[1].toFixed(setdata.setting.diset[i].Point) + " [" + setdata.setting.diset[i].Unit + "]";
            $(term).html(term2);
            $(term).css({ "display": "block" });
            // 警報上限有無
            term = HRLA4C4_GRPDIHEALRM + j;
            if ((setdata.setting.diset[i].AlarmE[1] == 1) && (setdata.setting.diset[i].GraphType == 0)) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }

            // Preset
            if (setdata.setting.diset[i].GraphType == 0) {
                term = HRLA4C4_GRPDIRST + j;
                $(term).css({ "display": "block" });
            }
            else {
                term = HRLA4C4_GRPDIRST + j;
                $(term).css({ "display": "none" });
            }

            // DI Timer********************************************************************
            //グラフの単位
            term = HRLA4C4_GRPTIMEUNIT + j;
            term2 = " [" + setdata.setting.DiTimer[i].Unit + "]";
            $(term).html(term2);

            //グラフのタイトル
            term = HRLA4C4_GRPTIMETITLE + j;
            term2 = setdata.setting.DiTimer[i].Title;
            $(term).html(term2);

            //瞬時値タイトル
            term = HLRA4C4_TIMETITLE + j;
            term2 = setdata.setting.DiTimer[i].Title;
            $(term).html(term2);

            // 上限警報発生値
            term = HRLA4C4_GRPTIMEHALRM + j;
            term2 = "上限警報発生値 " + setdata.setting.DiTimer[i].Alarm[1].toFixed(setdata.setting.DiTimer[i].Point) + " [" + setdata.setting.DiTimer[i].Unit + "]";
            $(term).html(term2);
            $(term).css({ "display": "block" });
            // 警報上限有無
            term = HRLA4C4_GRPTIMEHEALRM + j;
            if ((setdata.setting.DiTimer[i].AlarmE[1] == 1) && (setdata.setting.DiTimer[i].GraphType == 0)) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }

            // Preset
            term = HRLA4C4_GRPTIMERST + j;
            if (setdata.setting.DiTimer[i].GraphType == 0) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }
        }

        if (setdata.type == UnitCode.HLR_A4C4) {
            // 瞬時値のdBmタイトル
            $("#idvaldbm_title").text(jis2chr(setdata.setting.rssi.Title));
            // グラフのdBmタイトル
            $("#idgrptitledBm").html(jis2chr(setdata.setting.rssi.Title));
        }

        /* DO */
        if (setdata.setting.doset.Control == 0) {
            $("#btndoonid").css({ "display": "none" });
            $("#btndooffid").css({ "display": "none" });
            $("#btndointerlock").css({ "display": "none" });
        } else if (setdata.setting.doset.Control == 65280) {
            $("#btndoonid").css({ "display": "none" });
            $("#btndooffid").css({ "display": "none" });
            $("#btndointerlock").css({ "display": "block" });
        }
    }
    // 設定値が有効ではない
    else {
        for (var i = 0; i < 4; i++) {
            var j = (i + 1).toString();

            //グラフの単位
            term = HRLA4C4_GRPADUNIT + j;
            $(term).html("--");

            //グラフのタイトル
            term = HRLA4C4_GRPADTITLE + j;
            $(term).html("--");

            //最大、最小、平均のグラフのタイトル
            term = HRLA4C4_HISTOGRAM_ADTITLE + j;
            $(term).html("--");

            // 最大、最小、平均のグラフの単位
            term = HRLA4C4_HISTOGRAM_ADUNIT + j;
            $(term).html(term2);

            // 上限警報発生値
            term = HRLA4C4_GRPADHALRM + j;
            $(term).html("上限警報発生値 -- [--]");

            // 下限警報発生値
            term = HRLA4C4_GRPADLALRM + j;
            $(term).html("下限警報発生値 -- [--]");

            //グラフの単位
            term = HRLA4C4_GRPDIUNIT + j;
            $(term).html("--");

            //グラフのタイトル
            term = HRLA4C4_GRPDITITLE + j;
            $(term).html("--");

            // DI Timer********************************************************************
            //グラフの単位
            term = HRLA4C4_GRPTIMEUNIT + j;
            $(term).html("--");

            //グラフのタイトル
            term = HRLA4C4_GRPTIMETITLE + j;
            $(term).html("--");

            //瞬時値タイトル
            term = HLRA4C4_TIMETITLE + j;
            $(term).html("--");

            // 上限警報発生値
            term = HRLA4C4_GRPTIMEHALRM + j;
            term2 = "上限警報発生値 " + "--" + " [--]";
            $(term).html(term2);
            $(term).css({ "display": "block" });

            term = HRLA4C4_GRPTIMERST + j;
            $(term).css({ "display": "none" });

            term = HRLA4C4_GRPDIHALRM + j;
            term2 = "上限警報発生値 " + "--" + " [--]";
            $(term).html(term2);
            $(term).css({ "display": "block" });

            term = HRLA4C4_GRPDIRST + j;
            $(term).css({ "display": "none" });
        }

        if (setdata.type == UnitCode.HLR_A4C4) {
            // 瞬時値のdBmタイトル
            $("#idvaldbm_title").text('--');
            // グラフのdBmタイトル
            $("#idgrptitledBm").html('--');
        }
    }
}

function get_InsDatHRA4C4(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var j;
    var term, term2;

    //設定値を表示
    displayhlrasetting(setting);

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#hlrupdated_time").html("データ更新：----/--/-- --:--");
        //各ADと各DI
        //データ 瞬時値テーブルで
        for (var i = 0; i < 4; i++) {
            //1～4
            j = (i + 1).toString()

            //---------------------AD---------------------
            term = HLRA4C4_ADVAL + j;
            $(term).html("--");

            //---------------------DI---------------------
            term = HLRA4C4_DIVAL + j;
            $(term).html("--");

            //オン・オフバーで
            term2 = HLRA4C4_DISTS + j;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
            //---------------------DI Time---------------------
            term = HLRA4C4_TIMEVAL + j;
            $(term).html("--");

        }
        $("#idvaldbm").html("--");

        //オン・オフバーで
        $(HLRA4C4_DOSTS).html("");
        $(HLRA4C4_DOSTS).removeClass("text-light");
        $(HLRA4C4_DOSTS).removeClass("text-light shadow");
        $(HLRA4C4_DOSTS).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //警報状態
        var term = "#alertH_hlr";
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
        displayhlradata(obj, setting);
    }, setting);
}

function get_InsDatHLRA4C4(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var j;
    var term, term2;

    // 設定値を表示する
    displayhlrasetting(setting);

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#hlrupdated_time").html("データ更新：----/--/-- --:--");
        //各ADと各DI
        for (var i = 0; i < 4; i++) {
            //1～4
            j = (i + 1).toString()

            //---------------------AD---------------------
            //データ
            //瞬時値テーブルで
            term = HLRA4C4_ADVAL + j;
            $(term).html("--");

            //---------------------DI---------------------
            //カウンター
            //瞬時値テーブルで
            term = HLRA4C4_DIVAL + j;
            $(term).html("--");

            //---------------------DI TIMER---------------------
            //タイマー
            term = HLRA4C4_TIMEVAL + j;
            $(term).html("--");

            //オン・オフバーで
            term2 = HLRA4C4_DISTS + j;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        $("#idvaldbm").html("--");

        //オン・オフバーで
        $(HLRA4C4_DOSTS).html("");
        $(HLRA4C4_DOSTS).removeClass("text-light");
        $(HLRA4C4_DOSTS).removeClass("text-light shadow");
        $(HLRA4C4_DOSTS).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        //警報状態
        var term = "#alertH_hlr";
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
        displayhlradata(obj, setting);
    }, setting);
}

/**
 * HLR-A4C4の設定値を表示する
 * 
 */
function hlra4c4_dispdata_setting(obj, type) {
    var settingpoint = 4;
    //要求が成功する場合
    if (obj.Status == 200) {
        var term, j, dec_p;
        //ADとDI    x4
        for (var i = 0; i < 4; i++) {
            j = (i + 1).toString(); //1～4

            // ***********AD***********
            if (obj.Respons.An.length > i) {
                //タイトル
                term = "#" + J_AD_GRAPH_TITLE_ID_TERM + j;
                $(term).val(jis2chr(obj.Respons.An[i].Title));
                //入力タイプ
                term = AD_INPUT_RANGE_ID_TERM + j;
                document.getElementById(term).options.selectedIndex = parseInt(obj.Respons.An[i].Range, 16);
                $("#" + term).prop('disabled', true);
                //少数以下桁数
                term = AD_DEC_ID_TERM + j;
                dec_p = parseInt(obj.Respons.An[i].Point, 16);
                document.getElementById(term).options.selectedIndex = dec_p;
                //ゼロ
                term = "#" + AD_ZERO_ID_TERM + j;
                $(term).val(obj.Respons.An[i].Out[0].toFixed(settingpoint));
                $(term).prop('disabled', true); // ゼロ値を無効
                //スパン
                term = "#" + AD_SPAN_ID_TERM + j;
                $(term).val(obj.Respons.An[i].Out[1].toFixed(settingpoint));
                $(term).prop('disabled', true); // スパンを無効
                //単位
                term = "#" + AD_UNIT_ID_TERM + j;
                $(term).val(jis2chr(obj.Respons.An[i].Unit));
                //グラフ：上限と下限
                //下限
                term = "#" + AD_GRAPHL_ID_TERM + j;
                $(term).val(obj.Respons.An[i].Graph[0].toFixed(settingpoint));
                //上限
                term = "#" + AD_GRAPHH_ID_TERM + j;
                $(term).val(obj.Respons.An[i].Graph[1].toFixed(settingpoint));
                //警報出力上限値解除
                term = "#" + J_AD_GRAPH_CLALARML_ID_TERM + j;
                $(term).val(obj.Respons.An[i].ClAlarm[0].toFixed(settingpoint));
                //警報出力下限値解除
                term = "#" + J_AD_GRAPH_CLALARMH_ID_TERM + j;
                $(term).val(obj.Respons.An[i].ClAlarm[1].toFixed(settingpoint));
                //警報下限限警報発生値
                term = "#" + J_AD_GRAPH_ALARML_ID_TERM + j;
                $(term).val(obj.Respons.An[i].Alarm[0].toFixed(settingpoint));
                //上限警報発生値
                term = "#" + J_AD_GRAPH_ALARMH_ID_TERM + j;
                $(term).val(obj.Respons.An[i].Alarm[1].toFixed(settingpoint));
                //警報下限警報出力
                term = "" + J_AD_GRAPH_ALARMLE_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.An[i].AlarmE[0]);
                //上限警報出力
                term = "" + J_AD_GRAPH_ALARMHE_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.An[i].AlarmE[1]);
                // 最小の警報出力
                term = "" + J_AD_GRAPH_ALARMMINE_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.An[i].AlarmMinMaxE[0]);
                // 最大の警報出力
                term = "" + J_AD_GRAPH_ALARMMAXE_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.An[i].AlarmMinMaxE[1]);
                //最大、最小、平均表示
                term = "" + J_AD_HISTOGRAME_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.An[i].HistogramE);
                // 警報発生遅延
                term = J_AD_ALARMDELAYE_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.An[i].AlarmDelayE);
                // 警報発生遅延
                term = "#" + J_AD_ALARMDELAYVAL_ID_TERM + j;
                $(term).val(obj.Respons.An[i].AlarmDelayTime);
            }
            // ***********DI***********
            if (obj.Respons.Di.length > i) {
                //タイトル
                term = "#" + J_DI_GRAPH_TITLE_ID_TERM + j;
                $(term).val(jis2chr(obj.Respons.Di[i].Title, 0));
                //乗数
                term = DI_INPUT_MULTI_ID_TERM + j;
                document.getElementById(term).selectedIndex = parseInt(obj.Respons.Di[i].Multi, 16);
                //少数点以下桁数
                term = DI_DEC_ID_TERM + j;
                document.getElementById(term).selectedIndex = parseInt(obj.Respons.Di[i].Point, 16);
                //単位
                term = "#" + DI_UNIT_ID_TERM + j;
                $(term).val(jis2chr(obj.Respons.Di[i].Unit));
                //グラフ種類
                term = DI_GRAPH_TYPE_ID_TERM + j;
                document.getElementById(term).selectedIndex = parseInt(obj.Respons.Di[i].GraphType, 16);
                //グラフ：上限
                term = "#" + DI_GRAPHH_ID_TERM + j;
                $(term).val(obj.Respons.Di[i].Graph[1].toFixed(settingpoint));
                //上限警報発生値
                term = "#" + J_DI_GRAPH_ALARMH_ID_TERM + j;
                $(term).val(obj.Respons.Di[i].Alarm[1].toFixed(settingpoint));
                //上限警報発生値
                term = "" + J_DI_GRAPH_ALARMHE_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.Di[i].AlarmE[1]);
                //接点入力回数変化
                term = J_DI_GRAPH_LMALARME_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.Di[i].SendMailE);

                term = J_DI_GRAPH_LSTATETOONMALARME_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.Di[i].StateToOnSendMailE);

                term = J_DI_GRAPH_LSTATETOOFFMALARME_ID_TERM + j;
                document.getElementById(term).checked = (obj.Respons.Di[i].StateToOffSendMailE);

            }
            // ***********DI Timer***********
            if (obj.Respons.DiTimer.length > i) {
                //タイトル
                term = "#" + A4C4_TIMER_TITLE_ID + "timer" + j;
                $(term).val(jis2chr(obj.Respons.DiTimer[i].Title, 0));
                //乗数
                term = A4C4_TIMER_INPUT_MULTI_ID + "timer" + j;
                document.getElementById(term).selectedIndex = parseInt(obj.Respons.DiTimer[i].Multi, 16);
                //少数点以下桁数
                term = A4C4_TIMER_DEC_ID + "timer" + j;
                document.getElementById(term).selectedIndex = parseInt(obj.Respons.DiTimer[i].Point, 16);
                //単位
                term = "#" + A4C4_TIMER_UNIT_ID + "timer" + j;
                $(term).val(jis2chr(obj.Respons.DiTimer[i].Unit));
                //グラフ種類
                term = A4C4_TIMER_GRAPH_TYPE_ID + "timer" + j;
                document.getElementById(term).selectedIndex = parseInt(obj.Respons.DiTimer[i].GraphType, 16);
                //グラフ：上限
                term = "#" + A4C4_TIMER_GRAPHH_ID + "timer" + j;
                $(term).val(obj.Respons.DiTimer[i].Graph[1].toFixed(settingpoint));
                // 稼働時間を取得する
                term = A4C4_TIMER_ENABLED_ID + "timer" + j;
                document.getElementById(term).checked = (obj.Respons.DiTimer[i].Enable);
                //上限警報発生値
                term = "#" + A4C4_TIMER_ALARMH_ID + "timer" + j;
                $(term).val(obj.Respons.DiTimer[i].Alarm[1].toFixed(settingpoint));
                //上限警報発生値有効／無効
                term = A4C4_TIMER_ALARMHE_ID_TERM + "timer" + j;
                document.getElementById(term).checked = (obj.Respons.DiTimer[i].AlarmE[1]);
                //接点入力回数変化
                term = A4C4_TIMER_LMALARME_ID + "timer" + j;
                document.getElementById(term).checked = (obj.Respons.DiTimer[i].SendMailE);
                term = A4C4_TIMER_LSTATETOONMALARME_ID + "timer" + j;
                document.getElementById(term).checked = (obj.Respons.DiTimer[i].StateToOnSendMailE);
                term = A4C4_TIMER_LSTATETOOFFMALARME_ID + "timer" + j;
                document.getElementById(term).checked = (obj.Respons.DiTimer[i].StateToOffSendMailE);
            }
        }

        // dBmタイトル
        if (type == UnitCode.HLR_A4C4) {
            $("#a4c4_title_dbm").val(jis2chr(obj.Respons.RSSI_Title));
        }

        //**********************
        //連動する
        if (obj.Respons.Do.Ctrol == 65280) {
            document.getElementById("rendo_on").checked = true;
        }
        //連動しない
        else if (obj.Respons.Do.Ctrol == 0) {
            document.getElementById("rendo_off").checked = true;
        }
        //不明
        else {
            document.getElementById("rendo_on").checked = false;
            document.getElementById("rendo_off").checked = false;
        }

    } else {
        //Debug
        console.log(obj);
    }
}

/*　機能： hlra4c4グラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
    受信データはJSON型
    正常コード：200
*/
function displayhlra4c4grph(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // グラフ日付作成
    graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        graph_dat_num = obj.Respons.An.Num;
        graph_time.length = 0;
        //AD1～AD4
        graph_data_ad1.length = 0;
        graph_data_ad2.length = 0;
        graph_data_ad3.length = 0;
        graph_data_ad4.length = 0;
        // AD1~AD4の最大値
        histogram_maxdata_ad1.length = 0;
        histogram_maxdata_ad2.length = 0;
        histogram_maxdata_ad3.length = 0;
        histogram_maxdata_ad4.length = 0;
        // AD1~AD4の最小値
        histogram_mindata_ad1.length = 0;
        histogram_mindata_ad2.length = 0;
        histogram_mindata_ad3.length = 0;
        histogram_mindata_ad4.length = 0;
        // AD1~AD4の平均値
        histogram_meddata_ad1.length = 0;
        histogram_meddata_ad2.length = 0;
        histogram_meddata_ad3.length = 0;
        histogram_meddata_ad4.length = 0;
        // DI1～DI4
        graph_data_di1.length = 0;
        graph_data_di2.length = 0;
        graph_data_di3.length = 0;
        graph_data_di4.length = 0;
        // DI Timer 1~4
        graph_data_timer1.length = 0;
        graph_data_timer2.length = 0;
        graph_data_timer3.length = 0;
        graph_data_timer4.length = 0;

        graph_time_timer1.length = 0;
        graph_time_timer2.length = 0;
        graph_time_timer3.length = 0;
        graph_time_timer4.length = 0;
        // 強度
        graph_data_dBm.length = 0;
        // Times
        graph_time_di1.length = 0;
        graph_time_di2.length = 0;
        graph_time_di3.length = 0;
        graph_time_di4.length = 0;

        //**********ADデータ格納**********
        for (var i = 0; i < graph_dat_num; i++) {
            //時間
            graph_time[i] = moment(obj.Respons.An.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.An.Data[i].RSSI) == 0) {
                //AD1～AD4
                graph_data_ad1[i] = null;
                graph_data_ad2[i] = null;
                graph_data_ad3[i] = null;
                graph_data_ad4[i] = null;
                // AD1~AD4の最大値
                histogram_maxdata_ad1[i] = null;
                histogram_maxdata_ad2[i] = null;
                histogram_maxdata_ad3[i] = null;
                histogram_maxdata_ad4[i] = null;
                // AD1~AD4の最小値
                histogram_mindata_ad1[i] = null;
                histogram_mindata_ad2[i] = null;
                histogram_mindata_ad3[i] = null;
                histogram_mindata_ad4[i] = null;
                // AD1~AD4の平均値
                histogram_meddata_ad1[i] = null;
                histogram_meddata_ad2[i] = null;
                histogram_meddata_ad3[i] = null;
                histogram_meddata_ad4[i] = null;
                //強度
                graph_data_dBm[i] = null;

            }
            //データがある
            else {
                //AD1～AD4
                graph_data_ad1[i] = obj.Respons.An.Data[i].Value[0];
                graph_data_ad2[i] = obj.Respons.An.Data[i].Value[1];
                graph_data_ad3[i] = obj.Respons.An.Data[i].Value[2];
                graph_data_ad4[i] = obj.Respons.An.Data[i].Value[3];
                // AD1~AD4の最大値
                histogram_maxdata_ad1[i] = obj.Respons.An.Data[i].Max[0];
                histogram_maxdata_ad2[i] = obj.Respons.An.Data[i].Max[1];
                histogram_maxdata_ad3[i] = obj.Respons.An.Data[i].Max[2];
                histogram_maxdata_ad4[i] = obj.Respons.An.Data[i].Max[3];
                // AD1~AD4の最小値
                histogram_mindata_ad1[i] = obj.Respons.An.Data[i].Min[0];
                histogram_mindata_ad2[i] = obj.Respons.An.Data[i].Min[1];
                histogram_mindata_ad3[i] = obj.Respons.An.Data[i].Min[2];
                histogram_mindata_ad4[i] = obj.Respons.An.Data[i].Min[3];
                // AD1~AD4の平均値
                histogram_meddata_ad1[i] = obj.Respons.An.Data[i].Avg[0];
                histogram_meddata_ad2[i] = obj.Respons.An.Data[i].Avg[1];
                histogram_meddata_ad3[i] = obj.Respons.An.Data[i].Avg[2];
                histogram_meddata_ad4[i] = obj.Respons.An.Data[i].Avg[3];

                //強度
                if (gcrurbranch == 2) {
                    graph_data_dBm[i] = null;
                }
                else {
                    graph_data_dBm[i] = obj.Respons.An.Data[i].RSSI;
                }
            }
        }

        //DI1 データ格納
        for (var i = 0; i < obj.Respons.Di1.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_di1[i] = moment(obj.Respons.Di1.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di1.Data[i].RSSI) == 0) {
                graph_data_di1[i] = null;
            }
            //データがある
            else {
                graph_data_di1[i] = obj.Respons.Di1.Data[i].Value;
            }
        }

        //DI1 Timer データ格納
        for (var i = 0; i < obj.Respons.DiTimer1.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_timer1[i] = moment(obj.Respons.DiTimer1.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.DiTimer1.Data[i].RSSI) == 0) {
                graph_data_timer1[i] = null;
            }
            //データがある
            else {
                graph_data_timer1[i] = obj.Respons.DiTimer1.Data[i].Value;
            }
        }

        //DI2 データ格納
        for (var i = 0; i < obj.Respons.Di2.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_di2[i] = moment(obj.Respons.Di2.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di2.Data[i].RSSI) == 0) {
                graph_data_di2[i] = null;
            }
            //データがある
            else {
                graph_data_di2[i] = obj.Respons.Di2.Data[i].Value;
            }
        }

        //DI2 Timer データ格納
        for (var i = 0; i < obj.Respons.DiTimer2.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_timer2[i] = moment(obj.Respons.DiTimer2.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.DiTimer2.Data[i].RSSI) == 0) {
                graph_data_timer2[i] = null;
            }
            //データがある
            else {
                graph_data_timer2[i] = obj.Respons.DiTimer2.Data[i].Value;
            }
        }

        //DI3 データ格納
        for (var i = 0; i < obj.Respons.Di3.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_di3[i] = moment(obj.Respons.Di3.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di3.Data[i].RSSI) == 0) {
                graph_data_di3[i] = null;
            }
            //データがある
            else {
                graph_data_di3[i] = obj.Respons.Di3.Data[i].Value;
            }
        }

        //DI3 Timer データ格納
        for (var i = 0; i < obj.Respons.DiTimer3.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_timer3[i] = moment(obj.Respons.DiTimer3.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.DiTimer3.Data[i].RSSI) == 0) {
                graph_data_timer3[i] = null;
            }
            //データがある
            else {
                graph_data_timer3[i] = obj.Respons.DiTimer3.Data[i].Value;
            }
        }

        //DI4 データ格納
        for (var i = 0; i < obj.Respons.Di4.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_di4[i] = moment(obj.Respons.Di4.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di4.Data[i].RSSI) == 0) {
                graph_data_di4[i] = null;
            }
            //データがある
            else {
                graph_data_di4[i] = obj.Respons.Di4.Data[i].Value;
            }
        }

        //DI4 Timer データ格納
        for (var i = 0; i < obj.Respons.DiTimer4.Num; i++) {
            //時間          "年：月：日 時：分"
            graph_time_timer4[i] = moment(obj.Respons.DiTimer4.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.DiTimer4.Data[i].RSSI) == 0) {
                graph_data_timer4[i] = null;
            }
            //データがある
            else {
                graph_data_timer4[i] = obj.Respons.DiTimer4.Data[i].Value;
            }
        }

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (graph_exist == false) {
            draw_graph(setdata);
            //グラフオブジェクトが作成済み
            graph_exist = true;
        }
        else {
            update_graph(setdata);
        }

        // Histogram Draw/Update
        if (histogram_exist == false) {
            draw_histogram(setdata);
        }
        else {
            update_histogram(setdata);
        }

        /* Graph TIME update */
        // AD Graph
        if (graph_ad1_exist == true) {
            document.getElementById("idhlrgraphtimead1").innerHTML = graph_date;
        }
        if (graph_ad2_exist == true) {
            document.getElementById("idhlrgraphtimead2").innerHTML = graph_date;
        }
        if (graph_ad3_exist == true) {
            document.getElementById("idhlrgraphtimead3").innerHTML = graph_date;
        }
        if (graph_ad4_exist == true) {
            document.getElementById("idhlrgraphtimead4").innerHTML = graph_date;
        }

        // Histogramの時間を更新
        if (histogram_ad1_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad1").innerHTML = graph_date;
        }
        if (histogram_ad2_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad2").innerHTML = graph_date;
        }
        if (histogram_ad3_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad3").innerHTML = graph_date;
        }
        if (histogram_ad4_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad4").innerHTML = graph_date;
        }

        // DI Graph
        document.getElementById("idhlrgraphtimedi1").innerHTML = graph_date;
        document.getElementById("idhlrgraphtimedi2").innerHTML = graph_date;
        document.getElementById("idhlrgraphtimedi3").innerHTML = graph_date;
        document.getElementById("idhlrgraphtimedi4").innerHTML = graph_date;

        // DI Timer Graph
        if (graph_timer1_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer1").innerHTML = graph_date;
        }
        if (graph_timer2_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer2").innerHTML = graph_date;
        }
        if (graph_timer3_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer3").innerHTML = graph_date;
        }
        if (graph_timer4_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer4").innerHTML = graph_date;
        }

        if (gcrurbranch == 2) {
            document.getElementById("idhlrgraphtimedbm").innerHTML = "";
        }
        else {
            document.getElementById("idhlrgraphtimedbm").innerHTML = graph_date;
        }

    }
    else if (obj.Status == 400) {
        graph_dat_num = 0;
        graph_time.length = 0;
        //AD1～AD4
        graph_data_ad1.length = 0;
        graph_data_ad2.length = 0;
        graph_data_ad3.length = 0;
        graph_data_ad4.length = 0;
        // AD1~AD4の最大値
        histogram_maxdata_ad1.length = 0;
        histogram_maxdata_ad2.length = 0;
        histogram_maxdata_ad3.length = 0;
        histogram_maxdata_ad4.length = 0;
        // AD1~AD4の最小値
        histogram_mindata_ad1.length = 0;
        histogram_mindata_ad2.length = 0;
        histogram_mindata_ad3.length = 0;
        histogram_mindata_ad4.length = 0;
        // AD1~AD4の平均値
        histogram_meddata_ad1.length = 0;
        histogram_meddata_ad2.length = 0;
        histogram_meddata_ad3.length = 0;
        histogram_meddata_ad4.length = 0;
        //DI1～DI4
        graph_data_di1.length = 0;
        graph_data_di2.length = 0;
        graph_data_di3.length = 0;
        graph_data_di4.length = 0;

        //DI1～DI4 Timer
        graph_data_timer1.length = 0;
        graph_data_timer2.length = 0;
        graph_data_timer3.length = 0;
        graph_data_timer4.length = 0;

        //強度
        graph_data_dBm.length = 0;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (graph_exist == false) {
            draw_graph(setdata);
            //グラフオブジェクトが作成済み
            graph_exist = true;
        }
        else {
            update_graph(setdata);
        }

        // Histogram Draw/Update
        if (histogram_exist == false) {
            draw_histogram(setdata);
            histogram_exist = true;//グラフオブジェクトが作成済み
        }
        else {
            update_histogram(setdata);
        }

        /* Graph TIME update */
        // AD Graph
        if (graph_ad1_exist == true) {
            document.getElementById("idhlrgraphtimead1").innerHTML = graph_date;
        }
        if (graph_ad2_exist == true) {
            document.getElementById("idhlrgraphtimead2").innerHTML = graph_date;
        }
        if (graph_ad3_exist == true) {
            document.getElementById("idhlrgraphtimead3").innerHTML = graph_date;
        }
        if (graph_ad4_exist == true) {
            document.getElementById("idhlrgraphtimead4").innerHTML = graph_date;
        }

        // Histogramの時間を更新
        if (histogram_ad1_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad1").innerHTML = graph_date;
        }
        if (histogram_ad2_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad2").innerHTML = graph_date;
        }
        if (histogram_ad3_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad3").innerHTML = graph_date;
        }
        if (histogram_ad4_exist == true) {
            document.getElementById("idhlrgraphtime_histogramad4").innerHTML = graph_date;
        }

        // DI Graph
        document.getElementById("idhlrgraphtimedi1").innerHTML = graph_date;
        document.getElementById("idhlrgraphtimedi2").innerHTML = graph_date;
        document.getElementById("idhlrgraphtimedi3").innerHTML = graph_date;
        document.getElementById("idhlrgraphtimedi4").innerHTML = graph_date;

        // DI Timer Graph
        if (graph_timer1_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer1").innerHTML = graph_date;
        }
        if (graph_timer2_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer2").innerHTML = graph_date;
        }
        if (graph_timer3_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer3").innerHTML = graph_date;
        }
        if (graph_timer4_exist == true) {
            document.getElementById("idhlra4c4graphtime_timer4").innerHTML = graph_date;
        }

        if (gcrurbranch == 2) {
            document.getElementById("idhlrgraphtimedbm").innerHTML = "";
        } else {
            document.getElementById("idhlrgraphtimedbm").innerHTML = graph_date;
        }
    }
    else {
        // do nothing
    }
}

/*  
    機能：  AD、DI、電波強度のグラフを更新
*/
function update_graph(setdata) {
    //AD
    if (setdata.setting.adset[0].Range != 0) {
        graph_ad_update(chart_ad1, graph_time, graph_data_ad1, graph_dat_num, setdata.setting.adset[0], 0);

    }
    if (setdata.setting.adset[1].Range != 0) {
        graph_ad_update(chart_ad2, graph_time, graph_data_ad2, graph_dat_num, setdata.setting.adset[1], 0);

    }
    if (setdata.setting.adset[2].Range != 0) {
        graph_ad_update(chart_ad3, graph_time, graph_data_ad3, graph_dat_num, setdata.setting.adset[2], 0);

    }
    if (setdata.setting.adset[3].Range != 0) {
        graph_ad_update(chart_ad4, graph_time, graph_data_ad4, graph_dat_num, setdata.setting.adset[3], 0);
    }

    //DI
    graph_di_update(chart_di1, graph_time_di1, graph_data_di1, graph_time_di1.length, setdata.setting.diset[0]);
    graph_di_update(chart_di2, graph_time_di2, graph_data_di2, graph_time_di2.length, setdata.setting.diset[1]);
    graph_di_update(chart_di3, graph_time_di3, graph_data_di3, graph_time_di3.length, setdata.setting.diset[2]);
    graph_di_update(chart_di4, graph_time_di4, graph_data_di4, graph_time_di4.length, setdata.setting.diset[3]);

    // DI Timer
    if (setdata.setting.DiTimer[0].Enable != 0) {
        graph_di_update(chart_timer1, graph_time_timer1, graph_data_timer1, graph_time_timer1.length, setdata.setting.DiTimer[0]);
    }
    if (setdata.setting.DiTimer[1].Enable != 0) {
        graph_di_update(chart_timer2, graph_time_timer2, graph_data_timer2, graph_time_timer2.length, setdata.setting.DiTimer[1]);
    }
    if (setdata.setting.DiTimer[2].Enable != 0) {
        graph_di_update(chart_timer3, graph_time_timer3, graph_data_timer3, graph_time_timer3.length, setdata.setting.DiTimer[2]);
    }
    if (setdata.setting.DiTimer[3].Enable != 0) {
        graph_di_update(chart_timer4, graph_time_timer4, graph_data_timer4, graph_time_timer4.length, setdata.setting.DiTimer[3]);
    }

    //電波強度
    graph_dbm_update(chart_dBm, graph_time, graph_data_dBm);
}

/*  
    機能：  AD、DI、DOのグラフを描画  

*/
function draw_graph(setdata) {
    // CANVAS 2d content オブジェクトを取得
    // AD
    var canvas_ad1 = document.getElementById("chart1").getContext("2d");
    var canvas_ad2 = document.getElementById("chart2").getContext("2d");
    var canvas_ad3 = document.getElementById("chart3").getContext("2d");
    var canvas_ad4 = document.getElementById("chart4").getContext("2d");

    //DI
    var canvas_di1 = document.getElementById("chart5").getContext("2d");
    var canvas_di2 = document.getElementById("chart6").getContext("2d");
    var canvas_di3 = document.getElementById("chart7").getContext("2d");
    var canvas_di4 = document.getElementById("chart8").getContext("2d");

    //DI Timer
    var canvas_timer1 = document.getElementById("hlra4c4_chart_timer1").getContext("2d");
    var canvas_timer2 = document.getElementById("hlra4c4_chart_timer2").getContext("2d");
    var canvas_timer3 = document.getElementById("hlra4c4_chart_timer3").getContext("2d");
    var canvas_timer4 = document.getElementById("hlra4c4_chart_timer4").getContext("2d");

    //dBm
    var canvas_dBm = document.getElementById("chart9").getContext("2d");

    //ADのグラフを描画
    if (setdata.setting.adset[0].Range != 0) {
        document.getElementById("idADChart1").style.display = "block";
        chart_ad1 = draw_graph_ad(canvas_ad1, graph_time, graph_data_ad1, graph_dat_num, setdata.setting.adset[0]);
        graph_ad1_exist = true;
    }
    else {
        document.getElementById("idADChart1").style.display = "none";
    }
    if (setdata.setting.adset[1].Range != 0) {
        document.getElementById("idADChart2").style.display = "block";
        chart_ad2 = draw_graph_ad(canvas_ad2, graph_time, graph_data_ad2, graph_dat_num, setdata.setting.adset[1]);
        graph_ad2_exist = true;
    }
    else {
        document.getElementById("idADChart2").style.display = "none";
    }
    if (setdata.setting.adset[2].Range != 0) {
        document.getElementById("idADChart3").style.display = "block";
        chart_ad3 = draw_graph_ad(canvas_ad3, graph_time, graph_data_ad3, graph_dat_num, setdata.setting.adset[2]);
        graph_ad3_exist = true;
    }
    else {
        document.getElementById("idADChart3").style.display = "none";
    }
    if (setdata.setting.adset[3].Range != 0) {
        document.getElementById("idADChart4").style.display = "block";
        chart_ad4 = draw_graph_ad(canvas_ad4, graph_time, graph_data_ad4, graph_dat_num, setdata.setting.adset[3]);
        graph_ad4_exist = true;
    }
    else {
        document.getElementById("idADChart4").style.display = "none";
    }

    //DI                             グラフを描画 
    chart_di1 = draw_graph_di(canvas_di1, graph_time_di1, graph_data_di1, graph_time_di1.length, setdata.setting.diset[0]);
    chart_di2 = draw_graph_di(canvas_di2, graph_time_di2, graph_data_di2, graph_time_di2.length, setdata.setting.diset[1]);
    chart_di3 = draw_graph_di(canvas_di3, graph_time_di3, graph_data_di3, graph_time_di3.length, setdata.setting.diset[2]);
    chart_di4 = draw_graph_di(canvas_di4, graph_time_di4, graph_data_di4, graph_time_di4.length, setdata.setting.diset[3]);

    //DI1 Timer のグラフを描画
    if (setdata.setting.DiTimer[0].Enable != 0) {
        document.getElementById("idA4C4GraphTimer1").style.display = "block";
        chart_timer1 = draw_graph_di(canvas_timer1, graph_time_timer1, graph_data_timer1, graph_time_timer1.length, setdata.setting.DiTimer[0]);
        graph_timer1_exist = true;
    }
    else {
        document.getElementById("idA4C4GraphTimer1").style.display = "none";
    }

    //DI2 Timer のグラフを描画
    if (setdata.setting.DiTimer[1].Enable != 0) {
        document.getElementById("idA4C4GraphTimer2").style.display = "block";
        chart_timer2 = draw_graph_di(canvas_timer2, graph_time_timer2, graph_data_timer2, graph_time_timer2.length, setdata.setting.DiTimer[1]);
        graph_timer2_exist = true;
    }
    else {
        document.getElementById("idA4C4GraphTimer2").style.display = "none";
    }

    //DI3 Timer のグラフを描画
    if (setdata.setting.DiTimer[2].Enable != 0) {
        document.getElementById("idA4C4GraphTimer3").style.display = "block";
        chart_timer3 = draw_graph_di(canvas_timer3, graph_time_timer3, graph_data_timer3, graph_time_timer3.length, setdata.setting.DiTimer[2]);
        graph_timer3_exist = true;
    }
    else {
        document.getElementById("idA4C4GraphTimer3").style.display = "none";
    }

    //DI4 Timer のグラフを描画
    if (setdata.setting.DiTimer[3].Enable != 0) {
        document.getElementById("idA4C4GraphTimer4").style.display = "block";
        chart_timer4 = draw_graph_di(canvas_timer4, graph_time_timer4, graph_data_timer4, graph_time_timer4.length, setdata.setting.DiTimer[3]);
        graph_timer4_exist = true;
    }
    else {
        document.getElementById("idA4C4GraphTimer4").style.display = "none";
    }

    //電波強度                  単位を表示して、グラ愚を描画
    chart_dBm = draw_graph_dbm(canvas_dBm, graph_time, graph_data_dBm);
}

/*  
        機能：  AD最大・最小・平均のグラフを描画  
*/
function draw_histogram(setdata) {
    //AD Max-Min-Avg CANVAS 2d content オブジェクトを取得
    var canvas_histogram_ad1 = document.getElementById("histogramad1").getContext("2d");
    var canvas_histogram_ad2 = document.getElementById("histogramad2").getContext("2d");
    var canvas_histogram_ad3 = document.getElementById("histogramad3").getContext("2d");
    var canvas_histogram_ad4 = document.getElementById("histogramad4").getContext("2d");

    //ADの単位を表示して、グラフを描画
    if ((setdata.setting.adset[0].Range != 0) && (setdata.setting.adset[0].HistogramE != 0)) {
        document.getElementById("idADHistogram1").style.display = "block";
        chart_histogram_ad1 = draw_minmaxavg_ad(canvas_histogram_ad1, graph_time, histogram_maxdata_ad1, histogram_mindata_ad1, histogram_meddata_ad1, graph_dat_num, setdata.setting.adset[0]);
        histogram_ad1_exist = true;
        histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend");
        myLegendContainer.innerHTML = chart_histogram_ad1.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, chart_histogram_ad1);
            });

        }
    }
    else {
        document.getElementById("idADHistogram1").style.display = "none";
    }
    // AD2
    if ((setdata.setting.adset[1].Range != 0) && (setdata.setting.adset[1].HistogramE != 0)) {
        document.getElementById("idADHistogram2").style.display = "block";
        chart_histogram_ad2 = draw_minmaxavg_ad(canvas_histogram_ad2, graph_time, histogram_maxdata_ad2, histogram_mindata_ad2, histogram_meddata_ad2, graph_dat_num, setdata.setting.adset[1]);
        histogram_ad2_exist = true;
        histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend2");
        myLegendContainer.innerHTML = chart_histogram_ad2.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, chart_histogram_ad2);
            });
        }
    }
    else {
        document.getElementById("idADHistogram2").style.display = "none";
    }
    // AD3
    if ((setdata.setting.adset[2].Range != 0) && (setdata.setting.adset[2].HistogramE != 0)) {
        document.getElementById("idADHistogram3").style.display = "block";
        chart_histogram_ad3 = draw_minmaxavg_ad(canvas_histogram_ad3, graph_time, histogram_maxdata_ad3, histogram_mindata_ad3, histogram_meddata_ad3, graph_dat_num, setdata.setting.adset[2]);
        histogram_ad3_exist = true;
        histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend3");
        myLegendContainer.innerHTML = chart_histogram_ad3.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, chart_histogram_ad3);
            });
        }
    }
    else {
        document.getElementById("idADHistogram3").style.display = "none";
    }
    // AD4
    if ((setdata.setting.adset[3].Range != 0) && (setdata.setting.adset[3].HistogramE != 0)) {
        document.getElementById("idADHistogram4").style.display = "block";
        chart_histogram_ad4 = draw_minmaxavg_ad(canvas_histogram_ad4, graph_time, histogram_maxdata_ad4, histogram_mindata_ad4, histogram_meddata_ad4, graph_dat_num, setdata.setting.adset[3]);
        histogram_ad4_exist = true;
        histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend4");
        myLegendContainer.innerHTML = chart_histogram_ad4.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, chart_histogram_ad4);
            });
        }
    }
    else {
        document.getElementById("idADHistogram4").style.display = "none";
    }
}


/*  
    機能：  ADの最大・最小・平均値 のグラフを更新
*/
function update_histogram(setdata) {
    if (histogram_ad1_exist == true) {
        histogram_ad_update(chart_histogram_ad1, graph_time, histogram_maxdata_ad1, histogram_mindata_ad1, histogram_meddata_ad1, graph_dat_num, setdata.setting.adset[0]);
    }
    if (histogram_ad2_exist == true) {
        histogram_ad_update(chart_histogram_ad2, graph_time, histogram_maxdata_ad2, histogram_mindata_ad2, histogram_meddata_ad2, graph_dat_num, setdata.setting.adset[1]);
    }
    if (histogram_ad3_exist == true) {
        histogram_ad_update(chart_histogram_ad3, graph_time, histogram_maxdata_ad3, histogram_mindata_ad3, histogram_meddata_ad3, graph_dat_num, setdata.setting.adset[2]);
    }
    if (histogram_ad4_exist == true) {
        histogram_ad_update(chart_histogram_ad4, graph_time, histogram_maxdata_ad4, histogram_mindata_ad4, histogram_meddata_ad4, graph_dat_num, setdata.setting.adset[3]);
    }
}

/**
 * // DI リセット ボタン
 */
function fncDiReset(diidx) {
    var unit;
    var type = "000" + diidx.toString();

    /* グループ選択による処理 */
    switch (gActivedType) {
        case ActiveType.Atv_AllGroup:
            break;
        case ActiveType.Atv_Group:
            break;
        case ActiveType.Atv_Unit:
            // HLR-A4C4
            unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitNo;
            break;
        case ActiveType.Atv_SubUnit:
            switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitTypeCode) {
                case UnitCode.HR_A4C4:
                    //HR-A4C4
                    unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitNo;
                    break;
                case UnitCode.TWPM_1P2W:
                case UnitCode.TWPM_1P3W:
                case UnitCode.TWPM_3P3W:
                case UnitCode.TWPM_3P4W:
                    //TWPM
                    break;
                case UnitCode.TWP8C:
                    //TWP8C
                    break;
                case UnitCode.XM2_1P2W:
                case UnitCode.XM2_1P3W:
                case UnitCode.XM2_3P3W:
                case UnitCode.XM2_3P4W:
                    //XM2
                    break;
                case UnitCode.XS2_1P2W:
                case UnitCode.XS2_1P3W:
                case UnitCode.XS2_3P3W:
                    //XS2
                    break;
                case UnitCode.TWPS:
                    //TWPS
                    break;
                case UnitCode.TWPP:
                    //TWPP
                    break;
                case UnitCode.KMN1:
                case UnitCode.KM50:
                    break;
                case UnitCode.KW1M:
                case UnitCode.KW2G:
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }

    hlra4c4_preset_data(unit, type, "00000000");
}


// HLR-A4C4入力設定値をリセット
function hlrDelInput() {
    for (var i = 1; i < 5; i++) {
        document.getElementById("set_title_ad" + i).value = "";
        document.getElementById("set_input_range_ad" + i).selectedIndex = 0;
        document.getElementById("set_decimal_ad" + i).selectedIndex = 0;
        document.getElementById("set_zero_ad" + i).value = "";
        document.getElementById("set_span_ad" + i).value = "";
        document.getElementById("set_unit_ad" + i).value = "";
        document.getElementById("set_graphL_ad" + i).value = "";
        document.getElementById("set_graphH_ad" + i).value = "";
        document.getElementById("set_alarmL_ad" + i).value = "";
        document.getElementById("set_alarmH_ad" + i).value = "";

        document.getElementById("set_title_di" + i).value = "";
        document.getElementById("set_input_multi_di" + i).selectedIndex = "";
        document.getElementById("set_decimal_di" + i).selectedIndex = "";
        document.getElementById("set_unit_di" + i).selectedIndex = "";
        document.getElementById("set_graphType_di" + i).selectedIndex = "";
        document.getElementById("set_graphH_di" + i).value = "";
        document.getElementById("set_alarmH_di" + i).value = "";
    }
    document.getElementById("rendo_on").checked = false;
    document.getElementById("rendo_off").checked = false;
}

/**
 * HR-A4C4設定画面を表示
 */
function dispHlA4C4() {
    document.getElementById("a4c4address").innerHTML = "RS-485 Address";
    document.getElementById("a4c4type").innerHTML = "機種";
    document.getElementById("a4c4name").innerHTML = "ユニット名";
    var x = document.getElementById('idunitaddress');
    while (x.options.length) x.remove(0);
    addLoraAdrOption("idunitaddress", 1, 255);
    document.getElementById("a4c4title").innerHTML = "HR-A4C4設定";
    document.getElementById("idunittyppe").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('idunitname').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('idunitaddress').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}

/*  機能    ：A4C4のアナログ設定の入力値をチェックして、警報を出す
    引数    ：ADの設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_ad_input(obj) {
    var num = parseInt(obj.target.id);
    var id_term = "";
    var term, termL;
    var termClH;
    var termClL;

    //タイトル
    id_term = J_AD_GRAPH_TITLE_ID_TERM + num;
    var strTitle = document.getElementById(id_term).value;
    if (strTitle.trim() == "") {
        swal({
            title: "設定エラー！",
            text: "タイトル入力をしてください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    if (string_len_check(document.getElementById(id_term).value, 20, ("AD" + num.toString() + "のタイトルを"), true) == false) return false;
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
    //単位
    id_term = AD_UNIT_ID_TERM + num;
    if (string_len_check(document.getElementById(id_term).value, 15, ("AD" + num.toString() + "の単位は"), false) == false) return false;

    // 小数点位置
    ID_temp = AD_DEC_ID_TERM + num;
    // iPoint = document.getElementById(ID_temp).selectedIndex;

    //スパン値
    ID_temp = AD_SPAN_ID_TERM + num;
    console.log(ID_temp)
    var strSpan = document.getElementById(ID_temp).value;
    if ((isNaN(strSpan) == true) || (strSpan.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "スパン値は数値のみです。",
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
            var txtmess = "スパン値は、次の範囲で入力してください。" +
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

    //ゼロ
    ID_temp = AD_ZERO_ID_TERM + num;
    console.log(ID_temp);
    var strZero = document.getElementById(ID_temp).value;
    if ((isNaN(strZero) == true) || (strZero.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "ゼロ値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        termL = parseFloat(document.getElementById(ID_temp).value);
        var strNum1 = termL + '',
            dpNum1 = !!(termL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
            bFlag = true;
        //　入力値の小数点＞４
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
            var txtmess = "ゼロ値は、次の範囲で入力してください。" +
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
            text: "スパン値をゼロ値より大きな値を入力してください。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }


    //グラフの上限値
    ID_temp = AD_GRAPHH_ID_TERM + num;
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
        //　入力値の小数点＞４
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
    ID_temp = AD_GRAPHL_ID_TERM + num;
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
        //　入力値の小数点＞４
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
            text: "グラフ上限値をグラフ下限値より大きい値を入力してください。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }

    //上限警報発生値
    ID_temp = J_AD_GRAPH_ALARMH_ID_TERM + num;
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
        //　入力値の小数点＞４
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
    ID_temp = J_AD_GRAPH_CLALARMH_ID_TERM + num;
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
        //　入力値の小数点＞４
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
    ID_temp = J_AD_GRAPH_ALARML_ID_TERM + num;
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
        //　入力値の小数点＞４
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
    ID_temp = J_AD_GRAPH_CLALARML_ID_TERM + num;
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
        //　入力値の小数点＞４
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

    // 警報発生遅延時間
    ID_temp = J_AD_ALARMDELAYVAL_ID_TERM + num;
    var dDelayAlm = document.getElementById(ID_temp).value;
    if ((dDelayAlm < 1) || (dDelayAlm > 1800)) {
        swal({
            title: "設定エラー！",
            text: "警報発生遅延時間は１～１８００の範囲で入力してください。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }

    return true;
}

/*  機能    ：A4C4のカウンター設定の入力値をチェックして、警報を出す
    引数    ：DIの設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_di_input(obj) {
    var num = parseInt(obj.target.id) - 4;
    var ID_temp = "";
    var term;
    var iPoint;
    var valMax;
    var valMin;

    //タイトル
    ID_temp = J_DI_GRAPH_TITLE_ID_TERM + num;
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
    ID_temp = DI_UNIT_ID_TERM + num;
    if (string_len_check(document.getElementById(ID_temp).value, 15, ("DI" + num.toString() + "の単位を"), true) == false) return false;

    // 小数点位置
    ID_temp = DI_DEC_ID_TERM + num;
    iPoint = document.getElementById(ID_temp).selectedIndex;
    valMax = MAXINPUTVALUE / Math.pow(10, iPoint);
    valMin = 1 / Math.pow(10, 4);

    //グラフの上限値
    ID_temp = DI_GRAPHH_ID_TERM + num;
    var strGH = document.getElementById(ID_temp).value;
    if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "DI" + num.toString() + "のグラフ上限値は数値のみです。",
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
                text: "DI" + num.toString() + "のグラフ上限値を0より大きな値で入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        var strNum1 = term + '',
            dpNum1 = !!(term % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
            bFlag = true;
        // 小数点＞４
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
            var txtmess = "DI" + num.toString() + "のグラフ上限値は、次の範囲で入力してください。" +
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
    ID_temp = J_DI_GRAPH_ALARMH_ID_TERM + num;
    var strAH = document.getElementById(ID_temp).value;
    if ((isNaN(strAH) == true) || (strAH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "DI" + num.toString() + "の警報値は数値のみです。",
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
                text: "DI" + num.toString() + "の上限警報発生値を0より大きな値で入力してください。",
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
            var txtmess = "DI" + num.toString() + "の上限警報発生値は、次の範囲で入力してください。" +
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

/*  機能    ：HLR-A4C4用稼働時間設定の入力値をチェックして、警報を出す
            引数    ：DIの設定ボタンの押しイベントオブジェクト
            戻り値  ：
                        正しい入力値なら    TRUE
                        正しくない入力値    FALSE
*/
function check_a4c4_timer_input(obj) {
    var strch = obj.target.id; //a4c4_timer1_di1_timer
    var ID_temp = "";
    var term;
    var suffix;
    var num;

    suffix = strch.split("_")[1];
    num = (strch.split("_")[1]).substr(-1);

    //タイトル
    ID_temp = A4C4_TIMER_TITLE_ID + suffix;
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
    ID_temp = A4C4_TIMER_UNIT_ID + suffix;
    if (string_len_check(document.getElementById(ID_temp).value, 15, ("DI" + num.toString() + "の単位を"), true) == false) return false;

    //グラフの上限値
    ID_temp = A4C4_TIMER_GRAPHH_ID + suffix;
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
    ID_temp = A4C4_TIMER_ALARMH_ID + suffix;
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


/*  機能：  AD設定の要求電文を作成、ダイアログを表示
    引数：
            event_obj：ADの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_ad_setting(event_obj, unitNo) {
    var ad_ch = parseInt(event_obj.target.id); //ボタンのIDを取る
    var settingpoint = 4; //設定している小数点

    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Analog Channel]
    jsDat.AnCH = ("000" + ad_ch.toString(16)).substr(-4).toUpperCase();
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(J_AD_GRAPH_TITLE_ID_TERM + ad_ch).value, 20);
    //[Range]
    var strType = document.getElementById(AD_INPUT_RANGE_ID_TERM + ad_ch).selectedIndex.toString(16).toUpperCase();
    while (strType.length < 4) { //4桁まで埋める
        strType = "0" + strType;
    }
    jsDat.Range = strType;
    //[Point]
    var strdecNum = document.getElementById(AD_DEC_ID_TERM + ad_ch).selectedIndex.toString(16).toUpperCase();
    while (strdecNum.length < 4) { //4桁まで埋める
        strdecNum = "0" + strdecNum;
    }
    jsDat.Point = strdecNum;
    //[OutZero]
    jsDat.OutZero = dec2hex(document.getElementById(AD_ZERO_ID_TERM + ad_ch).value, settingpoint);
    //[OutSpan]
    jsDat.OutSpan = dec2hex(document.getElementById(AD_SPAN_ID_TERM + ad_ch).value, settingpoint);
    //[Unit]
    jsDat.Unit = chr2sjis(document.getElementById(AD_UNIT_ID_TERM + ad_ch).value, 10);
    //[GraphL]
    jsDat.GraphL = dec2hex(document.getElementById(AD_GRAPHL_ID_TERM + ad_ch).value, settingpoint);
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(AD_GRAPHH_ID_TERM + ad_ch).value, settingpoint);
    //[AlarmL]
    jsDat.AlarmL = dec2hex(document.getElementById(J_AD_GRAPH_ALARML_ID_TERM + ad_ch).value, settingpoint);
    //[AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(J_AD_GRAPH_ALARMH_ID_TERM + ad_ch).value, settingpoint);
    //[AlarmLE]
    jsDat.AlarmLE = ((document.getElementById(J_AD_GRAPH_ALARMLE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(J_AD_GRAPH_ALARMHE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[AlarmMinE]
    jsDat.AlarmMinE = ((document.getElementById(J_AD_GRAPH_ALARMMINE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[AlarmMaxE]
    jsDat.AlarmMaxE = ((document.getElementById(J_AD_GRAPH_ALARMMAXE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[ClAlarmL]
    jsDat.ClAlarmL = dec2hex(document.getElementById(J_AD_GRAPH_CLALARML_ID_TERM + ad_ch).value, settingpoint);
    //[ClAlarmH]
    jsDat.ClAlarmH = dec2hex(document.getElementById(J_AD_GRAPH_CLALARMH_ID_TERM + ad_ch).value, settingpoint);
    //[HistogramE]
    jsDat.HistogramE = ((document.getElementById(J_AD_HISTOGRAME_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    // [AlarmDelayE]
    jsDat.AlarmDelayE = ((document.getElementById(J_AD_ALARMDELAYE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    // [AlarmDelayTime]
    jsDat.AlarmDelayTime = document.getElementById(J_AD_ALARMDELAYVAL_ID_TERM + ad_ch).value;

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/*  機能：  DI設定の要求電文を作成、ダイアログを表示
    引数：
            event_obj：DIの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_di_setting(event_obj, unitNo) {
    var di_ch = parseInt(event_obj.target.id) - 4; //ボタンのIDを取る   
    var settingpoint = 4; // 小数点

    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Digital Channel]
    jsDat.DiCH = ("000" + di_ch.toString(16)).substr(-4).toUpperCase();
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(J_DI_GRAPH_TITLE_ID_TERM + di_ch).value, 20);
    //[Multi]
    var strMulti = document.getElementById("set_input_multi_di" + di_ch).selectedIndex.toString(16).toUpperCase();
    jsDat.Multi = ("000" + strMulti).substr(-4);
    //[Point]
    var strPoint = document.getElementById("set_decimal_di" + di_ch).selectedIndex.toString(16).toUpperCase();
    jsDat.Point = ("000" + strPoint).substr(-4);
    //[Unit]
    jsDat.Unit = chr2sjis(document.getElementById("set_unit_di" + di_ch).value, 10);
    //[GraphType]
    var strGraphType = document.getElementById("set_graphType_di" + di_ch).selectedIndex.toString(16).toUpperCase();
    jsDat.GraphType = ("000" + strGraphType).substr(-4);
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(DI_GRAPHH_ID_TERM + di_ch).value, settingpoint);
    //[AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(J_DI_GRAPH_ALARMH_ID_TERM + di_ch).value, settingpoint);
    //[AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(J_DI_GRAPH_ALARMHE_ID_TERM + di_ch).checked == true) ? 1 : 0);
    //[SendMailE]
    jsDat.SendMailE = ((document.getElementById(J_DI_GRAPH_LMALARME_ID_TERM + di_ch).checked == true) ? 1 : 0);
    //[StateToOnSendMailE]
    jsDat.StateToOnSendMailE = ((document.getElementById(J_DI_GRAPH_LSTATETOONMALARME_ID_TERM + di_ch).checked == true) ? 1 : 0);
    jsDat.StateToOffSendMailE = ((document.getElementById(J_DI_GRAPH_LSTATETOOFFMALARME_ID_TERM + di_ch).checked == true) ? 1 : 0);

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);

}


/*  機能：  DI稼働時間設定の要求電文を作成、ダイアログを表示
    引数：
            event_obj：DIの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_a4c4_timer_setting(event_obj, unitNo) {
    var ch = event_obj.target.id;
    var suffix = ch.split("_")[1];
    di_ch = suffix.substr(-1);
    var settingpoint = 4; // 小数点

    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[DiTimerCH]
    jsDat.DiTimerCH = ("000" + di_ch.toString(16)).substr(-4).toUpperCase();
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(A4C4_TIMER_TITLE_ID + suffix).value, 20);
    //[Multi]
    var strMulti = document.getElementById(A4C4_TIMER_INPUT_MULTI_ID + suffix).selectedIndex.toString(16).toUpperCase();
    jsDat.Multi = ("000" + strMulti).substr(-4);
    //[Point]
    var strPoint = document.getElementById(A4C4_TIMER_DEC_ID + suffix).selectedIndex.toString(16).toUpperCase();
    jsDat.Point = ("000" + strPoint).substr(-4);
    //[Unit]
    jsDat.Unit = chr2sjis(document.getElementById(A4C4_TIMER_UNIT_ID + suffix).value, 10);
    //[GraphType]
    var strGraphType = document.getElementById(A4C4_TIMER_GRAPH_TYPE_ID + suffix).selectedIndex.toString(16).toUpperCase();
    jsDat.GraphType = ("000" + strGraphType).substr(-4);
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(A4C4_TIMER_GRAPHH_ID + suffix).value, settingpoint);
    //[AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(A4C4_TIMER_ALARMH_ID + suffix).value, settingpoint);
    //[AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(A4C4_TIMER_ALARMHE_ID_TERM + suffix).checked == true) ? 1 : 0);
    //[SendMailE]
    jsDat.SendMailE = ((document.getElementById(A4C4_TIMER_LMALARME_ID + suffix).checked == true) ? 1 : 0);
    //[StateToOnSendMailE]
    jsDat.StateToOnSendMailE = ((document.getElementById(A4C4_TIMER_LSTATETOONMALARME_ID + suffix).checked == true) ? 1 : 0);
    //[StateToOnSendMailE]
    jsDat.StateToOffSendMailE = ((document.getElementById(A4C4_TIMER_LSTATETOOFFMALARME_ID + suffix).checked == true) ? 1 : 0);
    //[Enable]
    jsDat.Enable = ((document.getElementById(A4C4_TIMER_ENABLED_ID + suffix).checked == true) ? 1 : 0);

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}


/*  機能：  DO設定の要求電文を作成、ダイアログを表示
    引数：
            event_obj：DOの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_do_setting(unitNo) {
    // JavascriptDataを作成
    var jsDat = new Object();

    // [UnitNo]
    jsDat.UnitNo = unitNo;
    // [DoCH]
    jsDat.DoCH = "0001";

    // [LinkFlg]
    if (document.getElementById("rendo_on").checked == true) {
        jsDat.LinkFlg = "FF00";
    }
    else { //連動しない
        jsDat.LinkFlg = "0000";
    }

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/**
 * // HLR-A4C4 リセット ボタン
 */
//----------------HLRA4C4のプリセット制御----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function hlra4c4_preset_data(unitNo, type, PresetValue) {
    var obj;
    var untstr = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);
    //GET電文を作成
    const PostQuery = CONTROL_PRESET + getIotGatewayIdParam(); // CONTROL_QUERY;
    // JavascriptDataを作成
    var jsDat = new Object();
    // [UnitNo]
    jsDat.UnitNo = untstr;
    // [Type]
    jsDat.Type = type;
    // [PresetValue]
    jsDat.PresetValue = PresetValue;

    var modalTitle = "";
    var modalSucess = "";

    if (type == "0000") {
        modalTitle = "DI1のカウント値をリセットしますか？";
        modalSucess = "DI1のカウント値をリセットします！";
    }
    else if (type == "0001") {
        modalTitle = "DI2のカウント値をリセットしますか？";
        modalSucess = "DI2のカウント値をリセットします！";
    }
    else if (type == "0002") {
        modalTitle = "DI3のカウント値をリセットしますか？";
        modalSucess = "DI3のカウント値をリセットします！";
    }
    else if (type == "0003") {
        modalTitle = "DI4のカウント値をリセットしますか？";
        modalSucess = "DI4のカウント値をリセットします！";
    }
    else if (type == "0006") {
        modalTitle = "DI1のON時間値をリセットしますか？";
        modalSucess = "DI1のON時間値をリセットします！";
    }
    else if (type == "0007") {
        modalTitle = "DI2のON時間値をリセットしますか？";
        modalSucess = "DI2のON時間値をリセットします！";
    }
    else if (type == "0008") {
        modalTitle = "DI3のON時間値をリセットしますか？";
        modalSucess = "DI3のON時間値をリセットします！";
    }
    else if (type == "0009") {
        modalTitle = "DI4のON時間値をリセットしますか？";
        modalSucess = "DI4のON時間値をリセットします！";
    }

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











