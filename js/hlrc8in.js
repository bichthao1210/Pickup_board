/*version=1.00*/
// Log here
// <!-- 2021/08/05 -->
// <!-- 新規作成 -->

//HLR-C8用定数
const HLRC8IN_DIVAL = "#idhlrc8inval";
const HLRC8IN_DISTS = "#hlrc8inidstatus";
const HLRC8IN_GRPDIUNIT = "#idhlrc8ingrpunit_";
const HLRC8IN_GRPDIRST = "#idhlrc8inbtnreset_";
const HLRC8IN_GRPDITITLE = "#idhlrc8ingrptitle_";
const HLRC8IN_GRPDIHALRM = "#idhlrc8ingrphalrm_";
const HLRC8IN_GRPDIHEALRM = "#idhlrc8ingrphalrm_";
const HLRC8IN_DITITLE = "#idhlrc8in_title_";
const HLRC8IN_DISTTTITLE = "#hlrc8inidstatustitle";

// グラフ用変数
var hlrc8in_graph_exist = false;
//グラフ用の時間配
var hlrc8in_graph_date;

//DIグラフ用のデータ配列
var hlrc8in_graph_data_di1_counter = [];
var hlrc8in_graph_data_di2_counter = [];
var hlrc8in_graph_data_di3_counter = [];
var hlrc8in_graph_data_di4_counter = [];
var hlrc8in_graph_data_di5_counter = [];
var hlrc8in_graph_data_di6_counter = [];
var hlrc8in_graph_data_di7_counter = [];
var hlrc8in_graph_data_di8_counter = [];
var hlrc8in_graph_data_di1_timer = [];
var hlrc8in_graph_data_di2_timer = [];
var hlrc8in_graph_data_di3_timer = [];
var hlrc8in_graph_data_di4_timer = [];
var hlrc8in_graph_data_di5_timer = [];
var hlrc8in_graph_data_di6_timer = [];
var hlrc8in_graph_data_di7_timer = [];
var hlrc8in_graph_data_di8_timer = [];
var hlrc8in_graph_data_dBm = [];

var hlrc8in_graph_time_di1_counter = [];
var hlrc8in_graph_time_di2_counter = [];
var hlrc8in_graph_time_di3_counter = [];
var hlrc8in_graph_time_di4_counter = [];
var hlrc8in_graph_time_di5_counter = [];
var hlrc8in_graph_time_di6_counter = [];
var hlrc8in_graph_time_di7_counter = [];
var hlrc8in_graph_time_di8_counter = [];
var hlrc8in_graph_time_di1_timer = [];
var hlrc8in_graph_time_di2_timer = [];
var hlrc8in_graph_time_di3_timer = [];
var hlrc8in_graph_time_di4_timer = [];
var hlrc8in_graph_time_di5_timer = [];
var hlrc8in_graph_time_di6_timer = [];
var hlrc8in_graph_time_di7_timer = [];
var hlrc8in_graph_time_di8_timer = [];

var hlrc8in_chart_di1_counter;
var hlrc8in_chart_di2_counter;
var hlrc8in_chart_di3_counter;
var hlrc8in_chart_di4_counter;
var hlrc8in_chart_di5_counter;
var hlrc8in_chart_di6_counter;
var hlrc8in_chart_di7_counter;
var hlrc8in_chart_di8_counter;
var hlrc8in_chart_di1_timer;
var hlrc8in_chart_di2_timer;
var hlrc8in_chart_di3_timer;
var hlrc8in_chart_di4_timer;
var hlrc8in_chart_di5_timer;
var hlrc8in_chart_di6_timer;
var hlrc8in_chart_di7_timer;
var hlrc8in_chart_di8_timer;
var hlrc8in_chart_dBm;

/**
 * HLR-Cxのグラフデータをクリア
 */
function clear_grp_hlrc8in(type) {
    for (var i = 0; i < hlrc8in_graph_data_di1_counter.length; i++) {
        //強度
        hlrc8in_graph_data_dBm[i] = null;
        hlrc8in_graph_data_di1_counter[i] = null;
        hlrc8in_graph_data_di2_counter[i] = null;
        hlrc8in_graph_data_di3_counter[i] = null;
        hlrc8in_graph_data_di4_counter[i] = null;
        hlrc8in_graph_data_di5_counter[i] = null;
        hlrc8in_graph_data_di6_counter[i] = null;
        hlrc8in_graph_data_di7_counter[i] = null;
        hlrc8in_graph_data_di8_counter[i] = null;
        hlrc8in_graph_data_di1_timer[i] = null;
        hlrc8in_graph_data_di2_timer[i] = null;
        hlrc8in_graph_data_di3_timer[i] = null;
        hlrc8in_graph_data_di4_timer[i] = null;
        hlrc8in_graph_data_di5_timer[i] = null;
        hlrc8in_graph_data_di6_timer[i] = null;
        hlrc8in_graph_data_di7_timer[i] = null;
        hlrc8in_graph_data_di8_timer[i] = null;
    }
    if (hlrc8in_graph_exist == true) {
        hlrc8in_chart_di1_counter.destroy();
        hlrc8in_chart_di2_counter.destroy();
        hlrc8in_chart_di3_counter.destroy();
        hlrc8in_chart_di4_counter.destroy();
        hlrc8in_chart_di5_counter.destroy();
        hlrc8in_chart_di6_counter.destroy();
        hlrc8in_chart_di7_counter.destroy();
        hlrc8in_chart_di8_counter.destroy();
        hlrc8in_chart_di1_timer.destroy();
        hlrc8in_chart_di2_timer.destroy();
        hlrc8in_chart_di3_timer.destroy();
        hlrc8in_chart_di4_timer.destroy();
        hlrc8in_chart_di5_timer.destroy();
        hlrc8in_chart_di6_timer.destroy();
        hlrc8in_chart_di7_timer.destroy();
        hlrc8in_chart_di8_timer.destroy();
        if (type==UnitCode.HLR_C8_IN){
            hlrc8in_chart_dBm.destroy();
        }
        hlrc8in_graph_exist = false;
    }
    else {

    }

    //データ更新日
    $("#hlrc8inupdated_time").html("データ更新：----/--/-- --:--");

    //警報メッセージ
    var term = "#alertH_hlrc8in";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");

    // DI ********************************************************************
    var suffix;
    var term;
    for (let index = 1; index < 9; index++) {
        //DI
        //グラフのタイトル
        suffix = "di" + index;
        term = HLRC8IN_GRPDITITLE + suffix;
        $(term).html('--');
        //グラフの単位
        term = HLRC8IN_GRPDIUNIT + suffix;
        $(term).html('--');
        term = HLRC8IN_GRPDIHALRM + suffix;
        $(term).css({ "display": "none" });

        //カウンター
        //瞬時値テーブルで
        term = HLRC8IN_DIVAL + suffix;
        $(term).html("--");

        //オン・オフバーで
        term = HLRC8IN_DISTS + suffix;
        $(term).html("");
        $(term).removeClass("text-light shadow");
        $(term).css({
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });

        // DI timer
        suffix = "timer" + index;
        //グラフのタイトル
        term = HLRC8IN_GRPDITITLE + suffix;
        $(term).html('--');
        //グラフの単位
        term = HLRC8IN_GRPDIUNIT + suffix;
        $(term).html('--');
        term = HLRC8IN_GRPDIHALRM + suffix;
        $(term).css({ "display": "none" });
        //カウンター
        //瞬時値テーブルで
        term = HLRC8IN_DIVAL + suffix;
        $(term).html("--");
    }
    //電波強度
    $("#idhlrc8invaldbm").html("--");
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrcsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 * isUnitChg: true→初めての表示
 */
function fncLoadRealtimeDataHlrc8in(hlrcsetting, tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        for (let index = 1; index < 9; index++) {
            $('#' + tvid + 'idhlrc8invaldi' + index).text("--");
            $('#' + tvid + 'idhlrc8invaltimer' + index).text("--");
            $('#' + tvid + "hlrc8inidstatusdi" + index).text("");
            $('#' + tvid + "hlrc8inidstatusdi" + index).removeClass("text-light shadow");
            $('#' + tvid + "hlrc8inidstatusdi" + index).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        $('#' + tvid + 'hlrc8inupdated_time').text('データ更新：----/--/-- --:--');
        $('#' + tvid + 'idhlrc8invaldbm').text('--');
    }
    else {
        // 通信正常、瞬時値がある場合
        var termdata;
        $('#' + tvid + 'hlrc8inupdated_time').text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + 'idhlrc8invaldbm').text(realtimeObj.RSSI + " [dBm]");
        $('#' + tvid + 'idhlrc8invaldi1').text(parseFloat(realtimeObj.Data.di1_counter.Value).toFixed(hlrcsetting.setting.diset.DI1.Point) + " [" + hlrcsetting.setting.diset.DI1.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer1').text(parseFloat(realtimeObj.Data.di1_timer.Value).toFixed(hlrcsetting.setting.diset.DI1_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI1_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi2').text(parseFloat(realtimeObj.Data.di2_counter.Value).toFixed(hlrcsetting.setting.diset.DI2.Point) + " [" + hlrcsetting.setting.diset.DI2.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer2').text(parseFloat(realtimeObj.Data.di2_timer.Value).toFixed(hlrcsetting.setting.diset.DI2_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI2_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi3').text(parseFloat(realtimeObj.Data.di3_counter.Value).toFixed(hlrcsetting.setting.diset.DI3.Point) + " [" + hlrcsetting.setting.diset.DI3.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer3').text(parseFloat(realtimeObj.Data.di3_timer.Value).toFixed(hlrcsetting.setting.diset.DI3_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI3_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi4').text(parseFloat(realtimeObj.Data.di4_counter.Value).toFixed(hlrcsetting.setting.diset.DI4.Point) + " [" + hlrcsetting.setting.diset.DI4.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer4').text(parseFloat(realtimeObj.Data.di4_timer.Value).toFixed(hlrcsetting.setting.diset.DI4_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI4_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi5').text(parseFloat(realtimeObj.Data.di5_counter.Value).toFixed(hlrcsetting.setting.diset.DI5.Point) + " [" + hlrcsetting.setting.diset.DI5.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer5').text(parseFloat(realtimeObj.Data.di5_timer.Value).toFixed(hlrcsetting.setting.diset.DI5_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI5_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi6').text(parseFloat(realtimeObj.Data.di6_counter.Value).toFixed(hlrcsetting.setting.diset.DI6.Point) + " [" + hlrcsetting.setting.diset.DI6.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer6').text(parseFloat(realtimeObj.Data.di6_timer.Value).toFixed(hlrcsetting.setting.diset.DI6_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI6_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi7').text(parseFloat(realtimeObj.Data.di7_counter.Value).toFixed(hlrcsetting.setting.diset.DI7.Point) + " [" + hlrcsetting.setting.diset.DI7.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer7').text(parseFloat(realtimeObj.Data.di7_timer.Value).toFixed(hlrcsetting.setting.diset.DI7_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI7_TIMER.Unit + "]");
        $('#' + tvid + 'idhlrc8invaldi8').text(parseFloat(realtimeObj.Data.di8_counter.Value).toFixed(hlrcsetting.setting.diset.DI8.Point) + " [" + hlrcsetting.setting.diset.DI8.Unit + "]");
        $('#' + tvid + 'idhlrc8invaltimer8').text(parseFloat(realtimeObj.Data.di8_timer.Value).toFixed(hlrcsetting.setting.diset.DI8_TIMER.Point) + " [" + hlrcsetting.setting.diset.DI8_TIMER.Unit + "]");

        /**************************************DI1****************************/
        var di_status_list = []
        di_status_list.push(parseInt(realtimeObj.Data.di1_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di2_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di3_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di4_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di5_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di6_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di7_status.State, 16));
        di_status_list.push(parseInt(realtimeObj.Data.di8_status.State, 16));
        for (let index = 1; index < 9; index++) {
            termdata = di_status_list[index - 1];
            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $('#' + tvid + "hlrc8inidstatusdi" + index).html("OFF");
                $('#' + tvid + "hlrc8inidstatusdi" + index).removeClass("text-light shadow");
                $('#' + tvid + "hlrc8inidstatusdi" + index).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }
            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $('#' + tvid + "hlrc8inidstatusdi" + index).html("ON");
                $('#' + tvid + "hlrc8inidstatusdi" + index).addClass("text-light shadow");
                $('#' + tvid + "hlrc8inidstatusdi" + index).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx xx11 xxxx
            // xxxx xxxx xx00 xxxx
            else {
                $('#' + tvid + "hlrc8inidstatusdi" + index).html("--");
                $('#' + tvid + "hlrc8inidstatusdi" + index).removeClass("text-light shadow");
                $('#' + tvid + "hlrc8inidstatusdi" + index).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }

        }
    }
}

/**
* HLR-C8in瞬時値データを表示。
*/
function fncHlrc8inDspData(tvid, UnitNo, isUnitChg, hlrcsetting, unitSts, settingObj, realtimeObj) {

    if (isUnitChg == true) {
        var hlrcdi_set_tmp = {
            DI1: {
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
            DI2: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI2_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI3: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI3_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI4: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI4_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI5: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI5_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI6: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI6_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI7: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI7_TIMER: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI8: {
                "Title": "",
                "Multi": 1,
                "Point": 0,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            DI8_TIMER: {
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

        var rssi = {
            'Title': "電波強度",
            'Unit': chr2sjis("dBm"),
            'Graph': [-140, 0],
            'Point': 0
        };


        hlrcsetting.setting = { "diset": hlrcdi_set_tmp, "rssi": rssi };
        //DI設定
        if (settingObj.di1_counter) {
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
        }

        if (settingObj.di1_timer) {
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
        }
        
        if (settingObj.di2_counter) {
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
        }
        
        if (settingObj.di2_timer) {
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
        }

        if (settingObj.di3_counter) {
            hlrcsetting.setting.diset.DI3.Title = jis2chr(settingObj.di3_counter.Title);
            hlrcsetting.setting.diset.DI3.Multi = parseInt(settingObj.di3_counter.Multi, 16);
            hlrcsetting.setting.diset.DI3.Point = settingObj.di3_counter.Point;
            hlrcsetting.setting.diset.DI3.Unit = jis2chr(settingObj.di3_counter.Unit);
            hlrcsetting.setting.diset.DI3.GraphType = parseInt(settingObj.di3_counter.GraphType, 16)
            hlrcsetting.setting.diset.DI3.Graph[0] = settingObj.di3_counter.Graph[0];
            hlrcsetting.setting.diset.DI3.Graph[1] = settingObj.di3_counter.Graph[1];
            hlrcsetting.setting.diset.DI3.Alarm[0] = settingObj.di3_counter.Alarm[0];
            hlrcsetting.setting.diset.DI3.Alarm[1] = settingObj.di3_counter.Alarm[1];
            hlrcsetting.setting.diset.DI3.AlarmE[0] = settingObj.di3_counter.AlarmE[0];
            hlrcsetting.setting.diset.DI3.AlarmE[1] = settingObj.di3_counter.AlarmE[1];
        }

        if (settingObj.di3_timer) {
            hlrcsetting.setting.diset.DI3_TIMER.Title = jis2chr(settingObj.di3_timer.Title);
            hlrcsetting.setting.diset.DI3_TIMER.Multi = parseInt(settingObj.di3_timer.Multi, 16);
            hlrcsetting.setting.diset.DI3_TIMER.Point = settingObj.di3_timer.Point;
            hlrcsetting.setting.diset.DI3_TIMER.Unit = jis2chr(settingObj.di3_timer.Unit);
            hlrcsetting.setting.diset.DI3_TIMER.GraphType = parseInt(settingObj.di3_timer.GraphType, 16)
            hlrcsetting.setting.diset.DI3_TIMER.Graph[0] = settingObj.di3_timer.Graph[0];
            hlrcsetting.setting.diset.DI3_TIMER.Graph[1] = settingObj.di3_timer.Graph[1];
            hlrcsetting.setting.diset.DI3_TIMER.Alarm[0] = settingObj.di3_timer.Alarm[0];
            hlrcsetting.setting.diset.DI3_TIMER.Alarm[1] = settingObj.di3_timer.Alarm[1];
            hlrcsetting.setting.diset.DI3_TIMER.AlarmE[0] = settingObj.di3_timer.AlarmE[0];
            hlrcsetting.setting.diset.DI3_TIMER.AlarmE[1] = settingObj.di3_timer.AlarmE[1];
        }

        if (settingObj.di4_counter) {
            hlrcsetting.setting.diset.DI4.Title = jis2chr(settingObj.di4_counter.Title);
            hlrcsetting.setting.diset.DI4.Multi = parseInt(settingObj.di4_counter.Multi, 16);
            hlrcsetting.setting.diset.DI4.Point = settingObj.di4_counter.Point;
            hlrcsetting.setting.diset.DI4.Unit = jis2chr(settingObj.di4_counter.Unit);
            hlrcsetting.setting.diset.DI4.GraphType = parseInt(settingObj.di4_counter.GraphType, 16)
            hlrcsetting.setting.diset.DI4.Graph[0] = settingObj.di4_counter.Graph[0];
            hlrcsetting.setting.diset.DI4.Graph[1] = settingObj.di4_counter.Graph[1];
            hlrcsetting.setting.diset.DI4.Alarm[0] = settingObj.di4_counter.Alarm[0];
            hlrcsetting.setting.diset.DI4.Alarm[1] = settingObj.di4_counter.Alarm[1];
            hlrcsetting.setting.diset.DI4.AlarmE[0] = settingObj.di4_counter.AlarmE[0];
            hlrcsetting.setting.diset.DI4.AlarmE[1] = settingObj.di4_counter.AlarmE[1];
        }

        if (settingObj.di4_timer) {
            hlrcsetting.setting.diset.DI4_TIMER.Title = jis2chr(settingObj.di4_timer.Title);
            hlrcsetting.setting.diset.DI4_TIMER.Multi = parseInt(settingObj.di4_timer.Multi, 16);
            hlrcsetting.setting.diset.DI4_TIMER.Point = settingObj.di4_timer.Point;
            hlrcsetting.setting.diset.DI4_TIMER.Unit = jis2chr(settingObj.di4_timer.Unit);
            hlrcsetting.setting.diset.DI4_TIMER.GraphType = parseInt(settingObj.di4_timer.GraphType, 16)
            hlrcsetting.setting.diset.DI4_TIMER.Graph[0] = settingObj.di4_timer.Graph[0];
            hlrcsetting.setting.diset.DI4_TIMER.Graph[1] = settingObj.di4_timer.Graph[1];
            hlrcsetting.setting.diset.DI4_TIMER.Alarm[0] = settingObj.di4_timer.Alarm[0];
            hlrcsetting.setting.diset.DI4_TIMER.Alarm[1] = settingObj.di4_timer.Alarm[1];
            hlrcsetting.setting.diset.DI4_TIMER.AlarmE[0] = settingObj.di4_timer.AlarmE[0];
            hlrcsetting.setting.diset.DI4_TIMER.AlarmE[1] = settingObj.di4_timer.AlarmE[1];
        }

        if (settingObj.di5_counter) {
            hlrcsetting.setting.diset.DI5.Title = jis2chr(settingObj.di5_counter.Title);
            hlrcsetting.setting.diset.DI5.Multi = parseInt(settingObj.di5_counter.Multi, 16);
            hlrcsetting.setting.diset.DI5.Point = settingObj.di5_counter.Point;
            hlrcsetting.setting.diset.DI5.Unit = jis2chr(settingObj.di5_counter.Unit);
            hlrcsetting.setting.diset.DI5.GraphType = parseInt(settingObj.di5_counter.GraphType, 16)
            hlrcsetting.setting.diset.DI5.Graph[0] = settingObj.di5_counter.Graph[0];
            hlrcsetting.setting.diset.DI5.Graph[1] = settingObj.di5_counter.Graph[1];
            hlrcsetting.setting.diset.DI5.Alarm[0] = settingObj.di5_counter.Alarm[0];
            hlrcsetting.setting.diset.DI5.Alarm[1] = settingObj.di5_counter.Alarm[1];
            hlrcsetting.setting.diset.DI5.AlarmE[0] = settingObj.di5_counter.AlarmE[0];
            hlrcsetting.setting.diset.DI5.AlarmE[1] = settingObj.di5_counter.AlarmE[1];
        }

        if (settingObj.di5_timer) {
            hlrcsetting.setting.diset.DI5_TIMER.Title = jis2chr(settingObj.di5_timer.Title);
            hlrcsetting.setting.diset.DI5_TIMER.Multi = parseInt(settingObj.di5_timer.Multi, 16);
            hlrcsetting.setting.diset.DI5_TIMER.Point = settingObj.di5_timer.Point;
            hlrcsetting.setting.diset.DI5_TIMER.Unit = jis2chr(settingObj.di5_timer.Unit);
            hlrcsetting.setting.diset.DI5_TIMER.GraphType = parseInt(settingObj.di5_timer.GraphType, 16)
            hlrcsetting.setting.diset.DI5_TIMER.Graph[0] = settingObj.di5_timer.Graph[0];
            hlrcsetting.setting.diset.DI5_TIMER.Graph[1] = settingObj.di5_timer.Graph[1];
            hlrcsetting.setting.diset.DI5_TIMER.Alarm[0] = settingObj.di5_timer.Alarm[0];
            hlrcsetting.setting.diset.DI5_TIMER.Alarm[1] = settingObj.di5_timer.Alarm[1];
            hlrcsetting.setting.diset.DI5_TIMER.AlarmE[0] = settingObj.di5_timer.AlarmE[0];
            hlrcsetting.setting.diset.DI5_TIMER.AlarmE[1] = settingObj.di5_timer.AlarmE[1];
        }

        if (settingObj.di6_counter) {
            hlrcsetting.setting.diset.DI6.Title = jis2chr(settingObj.di6_counter.Title);
            hlrcsetting.setting.diset.DI6.Multi = parseInt(settingObj.di6_counter.Multi, 16);
            hlrcsetting.setting.diset.DI6.Point = settingObj.di6_counter.Point;
            hlrcsetting.setting.diset.DI6.Unit = jis2chr(settingObj.di6_counter.Unit);
            hlrcsetting.setting.diset.DI6.GraphType = parseInt(settingObj.di6_counter.GraphType, 16)
            hlrcsetting.setting.diset.DI6.Graph[0] = settingObj.di6_counter.Graph[0];
            hlrcsetting.setting.diset.DI6.Graph[1] = settingObj.di6_counter.Graph[1];
            hlrcsetting.setting.diset.DI6.Alarm[0] = settingObj.di6_counter.Alarm[0];
            hlrcsetting.setting.diset.DI6.Alarm[1] = settingObj.di6_counter.Alarm[1];
            hlrcsetting.setting.diset.DI6.AlarmE[0] = settingObj.di6_counter.AlarmE[0];
            hlrcsetting.setting.diset.DI6.AlarmE[1] = settingObj.di6_counter.AlarmE[1];
        }

        if (settingObj.di6_timer) {
            hlrcsetting.setting.diset.DI6_TIMER.Title = jis2chr(settingObj.di6_timer.Title);
            hlrcsetting.setting.diset.DI6_TIMER.Multi = parseInt(settingObj.di6_timer.Multi, 16);
            hlrcsetting.setting.diset.DI6_TIMER.Point = settingObj.di6_timer.Point;
            hlrcsetting.setting.diset.DI6_TIMER.Unit = jis2chr(settingObj.di6_timer.Unit);
            hlrcsetting.setting.diset.DI6_TIMER.GraphType = parseInt(settingObj.di6_timer.GraphType, 16)
            hlrcsetting.setting.diset.DI6_TIMER.Graph[0] = settingObj.di6_timer.Graph[0];
            hlrcsetting.setting.diset.DI6_TIMER.Graph[1] = settingObj.di6_timer.Graph[1];
            hlrcsetting.setting.diset.DI6_TIMER.Alarm[0] = settingObj.di6_timer.Alarm[0];
            hlrcsetting.setting.diset.DI6_TIMER.Alarm[1] = settingObj.di6_timer.Alarm[1];
            hlrcsetting.setting.diset.DI6_TIMER.AlarmE[0] = settingObj.di6_timer.AlarmE[0];
            hlrcsetting.setting.diset.DI6_TIMER.AlarmE[1] = settingObj.di6_timer.AlarmE[1];
        }

        if (settingObj.di7_counter) {
            hlrcsetting.setting.diset.DI7.Title = jis2chr(settingObj.di7_counter.Title);
            hlrcsetting.setting.diset.DI7.Multi = parseInt(settingObj.di7_counter.Multi, 16);
            hlrcsetting.setting.diset.DI7.Point = settingObj.di7_counter.Point;
            hlrcsetting.setting.diset.DI7.Unit = jis2chr(settingObj.di7_counter.Unit);
            hlrcsetting.setting.diset.DI7.GraphType = parseInt(settingObj.di7_counter.GraphType, 16)
            hlrcsetting.setting.diset.DI7.Graph[0] = settingObj.di7_counter.Graph[0];
            hlrcsetting.setting.diset.DI7.Graph[1] = settingObj.di7_counter.Graph[1];
            hlrcsetting.setting.diset.DI7.Alarm[0] = settingObj.di7_counter.Alarm[0];
            hlrcsetting.setting.diset.DI7.Alarm[1] = settingObj.di7_counter.Alarm[1];
            hlrcsetting.setting.diset.DI7.AlarmE[0] = settingObj.di7_counter.AlarmE[0];
            hlrcsetting.setting.diset.DI7.AlarmE[1] = settingObj.di7_counter.AlarmE[1];
        }

        if (settingObj.di7_timer) {
            hlrcsetting.setting.diset.DI7_TIMER.Title = jis2chr(settingObj.di7_timer.Title);
            hlrcsetting.setting.diset.DI7_TIMER.Multi = parseInt(settingObj.di7_timer.Multi, 16);
            hlrcsetting.setting.diset.DI7_TIMER.Point = settingObj.di7_timer.Point;
            hlrcsetting.setting.diset.DI7_TIMER.Unit = jis2chr(settingObj.di7_timer.Unit);
            hlrcsetting.setting.diset.DI7_TIMER.GraphType = parseInt(settingObj.di7_timer.GraphType, 16)
            hlrcsetting.setting.diset.DI7_TIMER.Graph[0] = settingObj.di7_timer.Graph[0];
            hlrcsetting.setting.diset.DI7_TIMER.Graph[1] = settingObj.di7_timer.Graph[1];
            hlrcsetting.setting.diset.DI7_TIMER.Alarm[0] = settingObj.di7_timer.Alarm[0];
            hlrcsetting.setting.diset.DI7_TIMER.Alarm[1] = settingObj.di7_timer.Alarm[1];
            hlrcsetting.setting.diset.DI7_TIMER.AlarmE[0] = settingObj.di7_timer.AlarmE[0];
            hlrcsetting.setting.diset.DI7_TIMER.AlarmE[1] = settingObj.di7_timer.AlarmE[1];
        }

        if (settingObj.di8_counter) {
            hlrcsetting.setting.diset.DI8.Title = jis2chr(settingObj.di8_counter.Title);
            hlrcsetting.setting.diset.DI8.Multi = parseInt(settingObj.di8_counter.Multi, 16);
            hlrcsetting.setting.diset.DI8.Point = settingObj.di8_counter.Point;
            hlrcsetting.setting.diset.DI8.Unit = jis2chr(settingObj.di8_counter.Unit);
            hlrcsetting.setting.diset.DI8.GraphType = parseInt(settingObj.di8_counter.GraphType, 16)
            hlrcsetting.setting.diset.DI8.Graph[0] = settingObj.di8_counter.Graph[0];
            hlrcsetting.setting.diset.DI8.Graph[1] = settingObj.di8_counter.Graph[1];
            hlrcsetting.setting.diset.DI8.Alarm[0] = settingObj.di8_counter.Alarm[0];
            hlrcsetting.setting.diset.DI8.Alarm[1] = settingObj.di8_counter.Alarm[1];
            hlrcsetting.setting.diset.DI8.AlarmE[0] = settingObj.di8_counter.AlarmE[0];
            hlrcsetting.setting.diset.DI8.AlarmE[1] = settingObj.di8_counter.AlarmE[1];
        }

        if (settingObj.di8_timer) {
            hlrcsetting.setting.diset.DI8_TIMER.Title = jis2chr(settingObj.di8_timer.Title);
            hlrcsetting.setting.diset.DI8_TIMER.Multi = parseInt(settingObj.di8_timer.Multi, 16);
            hlrcsetting.setting.diset.DI8_TIMER.Point = settingObj.di8_timer.Point;
            hlrcsetting.setting.diset.DI8_TIMER.Unit = jis2chr(settingObj.di8_timer.Unit);
            hlrcsetting.setting.diset.DI8_TIMER.GraphType = parseInt(settingObj.di8_timer.GraphType, 16)
            hlrcsetting.setting.diset.DI8_TIMER.Graph[0] = settingObj.di8_timer.Graph[0];
            hlrcsetting.setting.diset.DI8_TIMER.Graph[1] = settingObj.di8_timer.Graph[1];
            hlrcsetting.setting.diset.DI8_TIMER.Alarm[0] = settingObj.di8_timer.Alarm[0];
            hlrcsetting.setting.diset.DI8_TIMER.Alarm[1] = settingObj.di8_timer.Alarm[1];
            hlrcsetting.setting.diset.DI8_TIMER.AlarmE[0] = settingObj.di8_timer.AlarmE[0];
            hlrcsetting.setting.diset.DI8_TIMER.AlarmE[1] = settingObj.di8_timer.AlarmE[1];
        }

        if (settingObj) {
            hlrcsetting.setting.rssi.Title = (settingObj.RSSI_Title) ? (settingObj.RSSI_Title) : '';
        }

        $('#' + tvid + 'idhlrc8in_title_di1').text(hlrcsetting.setting.diset.DI1.Title);
        $('#' + tvid + 'idhlrc8in_title_timer1').text(hlrcsetting.setting.diset.DI1_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di2').text(hlrcsetting.setting.diset.DI2.Title);
        $('#' + tvid + 'idhlrc8in_title_timer2').text(hlrcsetting.setting.diset.DI2_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di3').text(hlrcsetting.setting.diset.DI3.Title);
        $('#' + tvid + 'idhlrc8in_title_timer3').text(hlrcsetting.setting.diset.DI3_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di4').text(hlrcsetting.setting.diset.DI4.Title);
        $('#' + tvid + 'idhlrc8in_title_timer4').text(hlrcsetting.setting.diset.DI4_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di5').text(hlrcsetting.setting.diset.DI5.Title);
        $('#' + tvid + 'idhlrc8in_title_timer5').text(hlrcsetting.setting.diset.DI5_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di6').text(hlrcsetting.setting.diset.DI6.Title);
        $('#' + tvid + 'idhlrc8in_title_timer6').text(hlrcsetting.setting.diset.DI6_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di7').text(hlrcsetting.setting.diset.DI7.Title);
        $('#' + tvid + 'idhlrc8in_title_timer7').text(hlrcsetting.setting.diset.DI7_TIMER.Title);
        $('#' + tvid + 'idhlrc8in_title_di8').text(hlrcsetting.setting.diset.DI8.Title);
        $('#' + tvid + 'idhlrc8in_title_timer8').text(hlrcsetting.setting.diset.DI8_TIMER.Title);

        $('#' + tvid + 'hlrc8inidstatustitledi1').text(hlrcsetting.setting.diset.DI1.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi2').text(hlrcsetting.setting.diset.DI2.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi3').text(hlrcsetting.setting.diset.DI3.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi4').text(hlrcsetting.setting.diset.DI4.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi5').text(hlrcsetting.setting.diset.DI5.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi6').text(hlrcsetting.setting.diset.DI6.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi7').text(hlrcsetting.setting.diset.DI7.Title);
        $('#' + tvid + 'hlrc8inidstatustitledi8').text(hlrcsetting.setting.diset.DI8.Title);

        if (hlrcsetting.type == UnitCode.HLR_C8_IN) {
            $('#' + tvid + 'idhlrc8intitledbm').text(jis2chr(hlrcsetting.setting.rssi.Title));
        }

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlrcsetting.type, settingObj, UnitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrcsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            // Save the realtime data for combine group display
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc8in(hlrcsetting, tvid, retobj);
        }
        else {
            // Save the realtime data for combine group display
            var tmpObj = new Object;
            tmpObj["Status"] = 400;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancehlrc8(tmpObj, UnitNo);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc8in(hlrcsetting, tvid, realtimeObj);
        }
    }
    else {
        if (hlrcsetting.setting !== null) {
            /* Title */
            $('#' + tvid + 'idhlrc8in_title_di1').text(hlrcsetting.setting.diset.DI1.Title);
            $('#' + tvid + 'idhlrc8in_title_timer1').text(hlrcsetting.setting.diset.DI1_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di2').text(hlrcsetting.setting.diset.DI2.Title);
            $('#' + tvid + 'idhlrc8in_title_timer2').text(hlrcsetting.setting.diset.DI2_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di3').text(hlrcsetting.setting.diset.DI3.Title);
            $('#' + tvid + 'idhlrc8in_title_timer3').text(hlrcsetting.setting.diset.DI3_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di4').text(hlrcsetting.setting.diset.DI4.Title);
            $('#' + tvid + 'idhlrc8in_title_timer4').text(hlrcsetting.setting.diset.DI4_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di5').text(hlrcsetting.setting.diset.DI5.Title);
            $('#' + tvid + 'idhlrc8in_title_timer5').text(hlrcsetting.setting.diset.DI5_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di6').text(hlrcsetting.setting.diset.DI6.Title);
            $('#' + tvid + 'idhlrc8in_title_timer6').text(hlrcsetting.setting.diset.DI6_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di7').text(hlrcsetting.setting.diset.DI7.Title);
            $('#' + tvid + 'idhlrc8in_title_timer7').text(hlrcsetting.setting.diset.DI7_TIMER.Title);
            $('#' + tvid + 'idhlrc8in_title_di8').text(hlrcsetting.setting.diset.DI8.Title);
            $('#' + tvid + 'idhlrc8in_title_timer8').text(hlrcsetting.setting.diset.DI8_TIMER.Title);


            $('#' + tvid + 'hlrc8inidstatustitledi1').text(hlrcsetting.setting.diset.DI1.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi2').text(hlrcsetting.setting.diset.DI2.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi3').text(hlrcsetting.setting.diset.DI3.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi4').text(hlrcsetting.setting.diset.DI4.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi5').text(hlrcsetting.setting.diset.DI5.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi6').text(hlrcsetting.setting.diset.DI6.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi7').text(hlrcsetting.setting.diset.DI7.Title);
            $('#' + tvid + 'hlrc8inidstatustitledi8').text(hlrcsetting.setting.diset.DI8.Title);
            // rssi
            if (hlrcsetting.type == UnitCode.HLR_C8_IN) {
                $('#' + tvid + 'idhlrc8intitledbm').text(jis2chr(hlrcsetting.setting.rssi.Title));
            }
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlrcsetting.setting == null)) {
            // Save the realtime data for combine group display
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc8in(hlrcsetting, tvid, retobj);
            return;
        }

        rs485_insread_data(UnitNo, function (obj, hlrcsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlrc8(obj, UnitNo);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataHlrc8in(hlrcsetting, tvid, obj.Respons);

        }, hlrcsetting);

    }
}

/**
 * hlr8 instance save
 */
function fncDoSaveInstancehlrc8(obj, UnitNo) {
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

    fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
}

/* HLR-C8INダイナミク瞬時データ表示作成 */
function fncHlrc8inInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlrctitle" class="h5 m-0">hlrctitlestring \
            </h4> \
            <h6 id="hlrc8inupdated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> '
    for (let index = 1; index < 9;index = index + 2) {
        rtnval += '\
                        <tr>\
                            <th id="idhlrc8in_title_di' + index + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaldi' + index + '" colspan="2" class="text-right">--</td>\
                            <th id="idhlrc8in_title_timer' + index + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaltimer' + index + '" colspan="2" class="text-right">--</td>\
                            <th id="idhlrc8in_title_di' + (index + 1) + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaldi' + (index + 1) + '" colspan="2" class="text-right">--</td>\
                            <th id="idhlrc8in_title_timer' + (index + 1) + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaltimer' + (index + 1) + '" colspan="2" class="text-right">--</td>\
                            </tr>'
    }
    rtnval += '\
                        <tr>\
                            <th id="idhlrc8intitledbm" class="text-center table-active">電波強度</th>\
                            <td id="idhlrc8invaldbm" colspan="2" class="text-right">--</td>\
                         </tr>\
                    \
                    </tbody>\
                </table> \
            </div> \
                \
            <!-- DI ON/OFF --> \
            <div class="no-gutters border border-top-0 rounded-bottom"> \
                <div class="col-lg d-flex align-items-center justify-content-around p-1 border-0 flex-wrap"> '
    for (let index = 1; index < 9; index++) {
        rtnval += '\
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="hlrc8inidstatustitledi' + index + '" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">--</div> \
                        <div id="hlrc8inidstatusdi' + index + '" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> '
    }
    rtnval += '\
                </div> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlrctitle/g, tvid + "idhlrctitle");
    rtnval = rtnval.replace(/idhlrc8invaldi/g, tvid + "idhlrc8invaldi");
    rtnval = rtnval.replace(/idhlrc8invaltimer/g, tvid + "idhlrc8invaltimer");
    rtnval = rtnval.replace(/idhlrc8in_title_di/g, tvid + "idhlrc8in_title_di");
    rtnval = rtnval.replace(/hlrc8inidstatustitledi/g, tvid + "hlrc8inidstatustitledi");
    rtnval = rtnval.replace(/idhlrc8in_title_timer/g, tvid + "idhlrc8in_title_timer");
    rtnval = rtnval.replace(/idhlrc8intitledbm/g, tvid + "idhlrc8intitledbm");
    rtnval = rtnval.replace(/idhlrc8invaldbm/g, tvid + "idhlrc8invaldbm");
    rtnval = rtnval.replace(/hlrc8inidstatusdo/g, tvid + "hlrc8inidstatusdo");
    rtnval = rtnval.replace(/hlrc8inidstatusdi/g, tvid + "hlrc8inidstatusdi");
    rtnval = rtnval.replace(/hlrc8inupdated_time/g, tvid + "hlrc8inupdated_time");
    rtnval = rtnval.replace(/hlrctitlestring/g, title);

    return rtnval;
}
/* HR-C8INダイナミク瞬時データ表示作成 */
function fncHrc8inInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval =
    '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlrctitle" class="h5 m-0">hlrctitlestring \
            </h4> \
            <h6 id="hlrc8inupdated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body py-0 px-0 pb-0"> \
            <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> '
    for (let index = 1; index < 9; index = index + 2) {
        rtnval += '\
                        <tr>\
                            <th id="idhlrc8in_title_di' + index + '"class="text-center table-active">--</th>\
                            <td id="idhlrc8invaldi' + index + '" colspan="2" class="text-right">--</td>\
                            <th id="idhlrc8in_title_timer' + index + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaltimer' + index + '" colspan="2" class="text-right">--</td>\
                            <th id="idhlrc8in_title_di' + (index + 1) + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaldi' + (index + 1) + '" colspan="2" class="text-right">--</td>\
                            <th id="idhlrc8in_title_timer' + (index + 1) + '" class="text-center table-active">--</th>\
                            <td id="idhlrc8invaltimer' + (index + 1) + '" colspan="2" class="text-right">--</td>\
                        </tr>'
    }
    rtnval += '\
                    </tbody>\
                </table> \
            </div> \
                \
            <!-- DI ON/OFF --> \
            <div class="no-gutters border border-top-0 rounded-bottom"> \
                <div class="col-lg d-flex align-items-center justify-content-around p-1 border-0 flex-wrap"> '
    for (let index = 1; index < 9; index++) {
        rtnval += '\
                    <div class="d-flex flex-row align-items-center ml-3"> \
                        <div id="hlrc8inidstatustitledi' + index + '" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">--</div> \
                        <div id="hlrc8inidstatusdi' + index + '" class="onoff_status text-center rounded-circle" style="background: #B4A2A2"></div> \
                    </div> '
    }
    rtnval += '\
                </div> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlrctitle/g, tvid + "idhlrctitle");
    rtnval = rtnval.replace(/idhlrc8invaldi/g, tvid + "idhlrc8invaldi");
    rtnval = rtnval.replace(/idhlrc8invaltimer/g, tvid + "idhlrc8invaltimer");
    rtnval = rtnval.replace(/idhlrc8in_title_di/g, tvid + "idhlrc8in_title_di");
    rtnval = rtnval.replace(/hlrc8inidstatustitledi/g, tvid + "hlrc8inidstatustitledi");
    rtnval = rtnval.replace(/idhlrc8in_title_timer/g, tvid + "idhlrc8in_title_timer");
    rtnval = rtnval.replace(/idhlrc8invaldbm/g, tvid + "idhlrc8invaldbm");
    rtnval = rtnval.replace(/hlrc8inidstatusdo/g, tvid + "hlrc8inidstatusdo");
    rtnval = rtnval.replace(/hlrc8inidstatusdi/g, tvid + "hlrc8inidstatusdi");
    rtnval = rtnval.replace(/hlrc8inupdated_time/g, tvid + "hlrc8inupdated_time");
    rtnval = rtnval.replace(/hlrctitlestring/g, title);

    return rtnval;
}

/**
 * HLR-C8IN instance setting display
 */
function displayhlrc8insetting(setdata) {
    // 設定値データを表示させる
    if (setdata.setting !== null) {
        var term;
        var term2;
        var suffix;

        // DI ********************************************************************
        for (let index = 1; index < 9; index++) {
            suffix = "di" + index;
            //グラフのタイトル
            term = HLRC8IN_GRPDITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index].Title;
            $(term).html(term2);
            //グラフの単位
            term = HLRC8IN_GRPDIUNIT + suffix;
            term2 = " [" + setdata.setting.diset["DI" + index].Unit + "]";
            $(term).html(term2);
            //瞬時値タイトル
            term = HLRC8IN_DITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index].Title;
            $(term).html(term2);
            //DI状態のタイトル
            term = HLRC8IN_DISTTTITLE + suffix;
            term2 = setdata.setting.diset["DI" + index].Title;
            $(term).html(term2);
            // 上限警報発生値
            term = HLRC8IN_GRPDIHALRM + suffix;
            term2 = "上限警報発生値 " + setdata.setting.diset["DI" + index].Alarm[1].toFixed(setdata.setting.diset["DI" + index].Point) + " [" + setdata.setting.diset["DI" + index].Unit + "]";
            $(term).html(term2);
            $(term).css({ "display": "block" });
            // 警報上限有無
            term = HLRC8IN_GRPDIHEALRM + suffix;
            if ((setdata.setting.diset["DI" + index].AlarmE[1] == 1) && (setdata.setting.diset["DI" + index].GraphType == 0)) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }

            // Preset
            suffix = 'di' + index + '_counter';
            if (setdata.setting.diset["DI" + index].GraphType == 0) {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "block" });
            }
            else {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "none" });
            }

            // DI1 Time ********************************************************************
            suffix = "timer" + index;
            //グラフのタイトル
            term = HLRC8IN_GRPDITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index + "_TIMER"].Title;
            $(term).html(term2);
            //グラフの単位
            term = HLRC8IN_GRPDIUNIT + suffix;
            term2 = " [" + setdata.setting.diset["DI" + index + "_TIMER"].Unit + "]";
            $(term).html(term2);

            //瞬時値タイトル
            term = HLRC8IN_DITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index + "_TIMER"].Title;
            $(term).html(term2);

            // 上限警報発生値
            term = HLRC8IN_GRPDIHALRM + suffix;
            term2 = "上限警報発生値 " + setdata.setting.diset["DI" + index + "_TIMER"].Alarm[1].toFixed(setdata.setting.diset["DI" + index + "_TIMER"].Point) + " [" + setdata.setting.diset["DI" + index + "_TIMER"].Unit + "]";
            $(term).html(term2);
            $(term).css({ "display": "block" });

            // 警報上限有無
            term = HLRC8IN_GRPDIHEALRM + suffix;
            if ((setdata.setting.diset["DI" + index + "_TIMER"].AlarmE[1] == 1) && (setdata.setting.diset["DI" + index + "_TIMER"].GraphType == 0)) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }
            // Preset
            suffix = 'di' + index + '_timer';
            if (setdata.setting.diset["DI" + index + "_TIMER"].GraphType == 0) {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "block" });
            }
            else {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "none" });
            }
        }
        //dBmのタイトル
        term2 = jis2chr(setdata.setting.rssi.Title);
        $('#idhlrc8intitledbm').html(term2);
        $('#idhlrc8ingrptitledbm').html(term2);
    }
}

/**
 * HR-C8IN instance setting display
 */
function displayhrc8insetting(setdata) {
    // 設定値データを表示させる
    if (setdata.setting !== null) {
        var term;
        var term2;
        var suffix;
        // DI********************************************************************
        for (let index = 1; index < 9; index++) {
            suffix = "di" + index;
            //グラフのタイトル
            term = HLRC8IN_GRPDITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index].Title;
            $(term).html(term2);
            //グラフの単位
            term = HLRC8IN_GRPDIUNIT + suffix;
            term2 = " [" + setdata.setting.diset["DI" + index].Unit + "]";
            $(term).html(term2);
            //瞬時値タイトル
            term = HLRC8IN_DITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index].Title;
            $(term).html(term2);
            //DI状態のタイトル
            term = HLRC8IN_DISTTTITLE + suffix;
            term2 = setdata.setting.diset["DI" + index].Title;
            $(term).html(term2);
            // 上限警報発生値
            term = HLRC8IN_GRPDIHALRM + suffix;
            term2 = "上限警報発生値 " + setdata.setting.diset["DI" + index].Alarm[1].toFixed(setdata.setting.diset["DI" + index].Point) + " [" + setdata.setting.diset["DI" + index].Unit + "]";
            $(term).html(term2);
            $(term).css({ "display": "block" });
            // 警報上限有無
            term = HLRC8IN_GRPDIHEALRM + suffix;
            if ((setdata.setting.diset["DI" + index].AlarmE[1] == 1) && (setdata.setting.diset["DI" + index].GraphType == 0)) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }

            // Preset
            suffix = 'di' + index + '_counter';
            if (setdata.setting.diset["DI" + index].GraphType == 0) {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "block" });
            }
            else {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "none" });
            }

            // DI1 Time ********************************************************************
            suffix = "timer" + index;
            //グラフのタイトル
            term = HLRC8IN_GRPDITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index + "_TIMER"].Title;
            $(term).html(term2);
            //グラフの単位
            term = HLRC8IN_GRPDIUNIT + suffix;
            term2 = " [" + setdata.setting.diset["DI" + index + "_TIMER"].Unit + "]";
            $(term).html(term2);

            //瞬時値タイトル
            term = HLRC8IN_DITITLE + suffix;
            term2 = setdata.setting.diset["DI" + index + "_TIMER"].Title;
            $(term).html(term2);

            // 上限警報発生値
            term = HLRC8IN_GRPDIHALRM + suffix;
            term2 = "上限警報発生値 " + setdata.setting.diset["DI" + index + "_TIMER"].Alarm[1].toFixed(setdata.setting.diset["DI" + index + "_TIMER"].Point) + " [" + setdata.setting.diset["DI" + index + "_TIMER"].Unit + "]";
            $(term).html(term2);
            $(term).css({ "display": "block" });

            // 警報上限有無
            term = HLRC8IN_GRPDIHEALRM + suffix;
            if ((setdata.setting.diset["DI" + index + "_TIMER"].AlarmE[1] == 1) && (setdata.setting.diset["DI" + index + "_TIMER"].GraphType == 0)) {
                $(term).css({ "display": "block" });
            }
            else {
                $(term).css({ "display": "none" });
            }
            // Preset
            suffix = 'di' + index + '_timer';
            if (setdata.setting.diset["DI" + index + "_TIMER"].GraphType == 0) {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "block" });
            }
            else {
                term = HLRC8IN_GRPDIRST + suffix;
                $(term).css({ "display": "none" });
            }
        }
    }
}


/**
 * hlrc8in instance data display
 */
function displayhlrc8indata(hlrc8ininsdat, setdata) {
    var suffix;
    var term, term2;
    //正常
    if (hlrc8ininsdat.Status == 200) {
        //データがあるかどうかチェック
        //データが無い場合
        if (hlrc8ininsdat.Respons.Data == null) {
            // 更新時間
            $("#hlrc8inupdated_time").html("データ更新：----/--/-- --:--");
            for (let index = 1; index < 9; index++) {
                //カウンター2
                suffix = "di" + index;
                //瞬時値テーブルで
                term = HLRC8IN_DIVAL + suffix;
                $(term).html("--");
                //オン・オフバーで
                term2 = HLRC8IN_DISTS + suffix;
                $(term2).html("");
                $(term2).removeClass("text-light shadow");
                $(term2).css({
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
                //DI Timer
                suffix = "timer" + index;
                //瞬時値テーブルで
                term = HLRC8IN_DIVAL + suffix;
                $(term).html("--");
            }
        }
        //データがある場合
        else {
            //---------------------Data - Show out---------------------
            //時間
            //最新の時間を取得
            term = "データ更新：" + hlrc8ininsdat.Respons.Time[0] + "/" + ("00" + hlrc8ininsdat.Respons.Time[1]).slice(-2) + "/" + ("00" + hlrc8ininsdat.Respons.Time[2]).slice(-2) + " " + ("00" + hlrc8ininsdat.Respons.Time[3]).slice(-2) + ":" + ("0" + hlrc8ininsdat.Respons.Time[4]).slice(-2);
            //時間バーに更新
            $("#hlrc8inupdated_time").html(term);
            for (let index = 1; index < 9; index++) {
                //---------------------DI---------------------
                suffix = "di" + index;
                //データを表示
                //瞬時値テーブルで
                term = HLRC8IN_DIVAL + suffix;
                termdata = parseFloat(hlrc8ininsdat.Respons.Data[suffix + "_counter"].Value).toFixed(setdata.setting.diset["DI" + index].Point);
                strdata = termdata.toString() + " [" + setdata.setting.diset["DI" + index].Unit + "]";
                $(term).html(strdata);

                //瞬時値テーブルで
                //オン・オフバーで
                term2 = HLRC8IN_DISTS + suffix;
                termdata = parseInt(hlrc8ininsdat.Respons.Data[suffix + "_status"].State, 16);

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
                //---------------------DI Timer---------------------
                suffix = "timer" + index;
                //データを表示
                //瞬時値テーブルで
                term = HLRC8IN_DIVAL + suffix;
                termdata = parseFloat(hlrc8ininsdat.Respons.Data["di" + index + "_timer"].Value).toFixed(setdata.setting.diset["DI" + index + "_TIMER"].Point);
                strdata = termdata.toString() + " [" + setdata.setting.diset["DI" + index + "_TIMER"].Unit + "]";
                $(term).html(strdata);
            }

            //--------------------電波強度--------------------------
            if (gcrurbranch == 1) {
                $("#idhlrc8invaldbm").html(hlrc8ininsdat.Respons.RSSI + " [dBm]");
            }
            else {
                $("#idhlrc8invaldbm").html("");
            }
            //警報状態
            var alert_exist = 0;// 0: success; 1; danger; 2: warning
            term = "#alertH_hlrc8in";
            var alert_str1 = "";
            var unknown = false;

            //DI8 Timer
            if (hlrc8ininsdat.Respons.Data.di8_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di8_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI8_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI8_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI8
            if (hlrc8ininsdat.Respons.Data.di8_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di8_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI8.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI8.Title;
                //alert_exist = 3;
                unknown = true;
            }


            //DI7 Timer
            if (hlrc8ininsdat.Respons.Data.di7_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di7_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI7_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI7_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI7
            if (hlrc8ininsdat.Respons.Data.di7_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di7_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI7.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                //alert_exist = 3;
                alert_str1 = setdata.setting.diset.DI7.Title;
                unknown = true;
            }

            //DI6 Timer
            if (hlrc8ininsdat.Respons.Data.di6_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di6_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI6_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI6_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI6
            if (hlrc8ininsdat.Respons.Data.di6_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di6_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI6.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI6.Title;
                //alert_exist = 3;
                unknown = true;
            }


            //DI5 Timer
            if (hlrc8ininsdat.Respons.Data.di5_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di5_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI5_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI5_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI5
            if (hlrc8ininsdat.Respons.Data.di5_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di5_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI5.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                //alert_exist = 3;
                alert_str1 = setdata.setting.diset.DI5.Title;
                unknown = true;
            }

            //DI4 Timer
            if (hlrc8ininsdat.Respons.Data.di4_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di4_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI4_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI4_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI4
            if (hlrc8ininsdat.Respons.Data.di4_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di4_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI4.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI4.Title;
                //alert_exist = 3;
                unknown = true;
            }


            //DI3 Timer
            if (hlrc8ininsdat.Respons.Data.di3_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di3_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI3_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI3_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI3
            if (hlrc8ininsdat.Respons.Data.di3_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di3_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI3.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                //alert_exist = 3;
                alert_str1 = setdata.setting.diset.DI3.Title;
                unknown = true;
            }
            //DI2 Timer
            if (hlrc8ininsdat.Respons.Data.di2_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di2_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI2_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI2_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI2
            if (hlrc8ininsdat.Respons.Data.di2_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di2_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI2.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI2.Title;
                //alert_exist = 3;
                unknown = true;
            }


            //DI1 Timer
            if (hlrc8ininsdat.Respons.Data.di1_timer.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di1_timer.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
                alert_exist = 1;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x8000) == 0x8000) && ((termdata & 0x0400) == 0x0400)) {
                alert_str1 = setdata.setting.diset.DI1_TIMER.Title;
                //alert_exist = 3;
                unknown = true;
            }

            //DI1
            if (hlrc8ininsdat.Respons.Data.di1_counter.State == null) {
                unknown = true;
            }
            termdata = parseInt(hlrc8ininsdat.Respons.Data.di1_counter.State, 16);
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_str1 = setdata.setting.diset.DI1.Title;
                alert_exist = 1;
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
        $("#hlrc8inupdated_time").html("データ更新：----/--/-- --:--");
        for (let index = 1; index < 9; index++) {
            //カウンター
            suffix = "di" + index;
            //瞬時値テーブルで
            term = HLRC8IN_DIVAL + suffix;
            $(term).html("--");
            //オン・オフバーで
            term2 = HLRC8IN_DISTS + suffix;
            $(term2).html("");
            $(term2).removeClass("text-light shadow");
            $(term2).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
            //DI Timer
            suffix = "timer" + index;
            //瞬時値テーブルで
            term = HLRC8IN_DIVAL + suffix;
            $(term).html("--");
        }
        //--------------------電波強度--------------------------
        $("#idhlrc8invaldbm").html("--");
        //警報状態
        term = "#alertH_hlrc8in";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).html("<strong>NO DATA</strong>　");
    }
}


/**
 *  HLR-C8-INの設定値を表示する
 *
 */
function hlrc8_loaddata_setting(obj, Type) {
    if (obj.Status == 200) {
        var prefix;
        var suffix;
        var settingpoint = 4;


        prefix = "c8in";
        /************DI1**************/
        for (let index = 1; index < 9; index++) {
            /************DI**************/
            suffix = "di" + index.toString();
            //タイトル
            $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix).val(jis2chr(obj.Respons[suffix +"_counter"].Title));
            //乗数
            document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons[suffix +"_counter"].Multi, 16);
            //少数点以下桁数
            document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons[suffix +"_counter"].Point, 16);
            //単位
            $("#" + prefix + HLRC_UNIT_ID_TERM + suffix).val(jis2chr(obj.Respons[suffix +"_counter"].Unit));
            //グラフ種類
            document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix).selectedIndex = parseInt(obj.Respons[suffix +"_counter"].GraphType, 16);
            //グラフ：上限
            $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix).val(obj.Respons[suffix +"_counter"].Graph[1].toFixed(settingpoint));
            //上限警報発生値
            $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix).val(obj.Respons[suffix +"_counter"].Alarm[1].toFixed(settingpoint));
            //上限警報発生値
            document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix).checked = (obj.Respons[suffix +"_counter"].AlarmE[1]);
            //接点入力回数変化
            document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix).checked = (obj.Respons[suffix +"_counter"].SendMailE);
            document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix).checked = (obj.Respons[suffix +"_counter"].StateToOnSendMailE);
            document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix).checked = (obj.Respons[suffix +"_counter"].StateToOffSendMailE);

            /************稼働時間**************/
            suffix02 = "timer" + index.toString();
            //タイトル
            $("#" + prefix + HLRC_GRAPH_TITLE_ID_TERM + suffix02).val(jis2chr(obj.Respons[suffix +"_timer"].Title, 0));
            //乗数
            document.getElementById(prefix + HLRC_INPUT_MULTI_ID_TERM + suffix02).selectedIndex = parseInt(obj.Respons[suffix +"_timer"].Multi, 16);
            //少数点以下桁数
            document.getElementById(prefix + HLRC_DEC_ID_TERM + suffix02).selectedIndex = parseInt(obj.Respons[suffix +"_timer"].Point, 16);
            //単位
            $("#" + prefix + HLRC_UNIT_ID_TERM + suffix02).val(jis2chr(obj.Respons[suffix +"_timer"].Unit));
            //グラフ種類
            document.getElementById(prefix + HLRC_GRAPH_TYPE_ID_TERM + suffix02).selectedIndex = parseInt(obj.Respons[suffix +"_timer"].GraphType, 16);
            //グラフ：上限
            $("#" + prefix + HLRC_GRAPHH_ID_TERM + suffix02).val(obj.Respons[suffix +"_timer"].Graph[1].toFixed(settingpoint));
            //警報上限値
            $("#" + prefix + HLRC_GRAPH_ALARMH_ID_TERM + suffix02).val(obj.Respons[suffix +"_timer"].Alarm[1].toFixed(settingpoint));
            //警報上限値
            document.getElementById(prefix + HLRC_GRAPH_ALARMHE_ID_TERM + suffix02).checked = (obj.Respons[suffix +"_timer"].AlarmE[1]);
            //接点入力回数変化
            document.getElementById(prefix + HLRC_GRAPH_LMALARME_ID_TERM + suffix02).checked = (obj.Respons[suffix +"_timer"].SendMailE);
            document.getElementById(prefix + HLRC_GRAPH_LSTATETOONMALARME_ID_TERM + suffix02).checked = (obj.Respons[suffix +"_timer"].StateToOnSendMailE);
            document.getElementById(prefix + HLRC_GRAPH_LSTATETOOFFMALARME_ID_TERM + suffix02).checked = (obj.Respons[suffix +"_timer"].StateToOffSendMailE);
        }
        // dBmタイトル
        if (Type ==UnitCode.HLR_C8_IN){
            $("#c8in_title_dbm").val(jis2chr(obj.Respons.RSSI_Title));
        }
    } else {
        //Debug
    }
}

/*
 * 機能：  AD、DI、電波強度のグラフを更新
*/
function hlrc8in_update_graph(setdata) {
    //DIグラフを描画
    graph_di_update(hlrc8in_chart_di1_counter, hlrc8in_graph_time_di1_counter, hlrc8in_graph_data_di1_counter, hlrc8in_graph_time_di1_counter.length, setdata.setting.diset.DI1);
    graph_di_update(hlrc8in_chart_di1_timer, hlrc8in_graph_time_di1_timer, hlrc8in_graph_data_di1_timer, hlrc8in_graph_time_di1_timer.length, setdata.setting.diset.DI1_TIMER);
    graph_di_update(hlrc8in_chart_di2_counter, hlrc8in_graph_time_di2_counter, hlrc8in_graph_data_di2_counter, hlrc8in_graph_time_di2_counter.length, setdata.setting.diset.DI2);
    graph_di_update(hlrc8in_chart_di2_timer, hlrc8in_graph_time_di2_timer, hlrc8in_graph_data_di2_timer, hlrc8in_graph_time_di2_timer.length, setdata.setting.diset.DI2_TIMER);
    graph_di_update(hlrc8in_chart_di3_counter, hlrc8in_graph_time_di3_counter, hlrc8in_graph_data_di3_counter, hlrc8in_graph_time_di3_counter.length, setdata.setting.diset.DI3);
    graph_di_update(hlrc8in_chart_di3_timer, hlrc8in_graph_time_di3_timer, hlrc8in_graph_data_di3_timer, hlrc8in_graph_time_di3_timer.length, setdata.setting.diset.DI3_TIMER);
    graph_di_update(hlrc8in_chart_di4_counter, hlrc8in_graph_time_di4_counter, hlrc8in_graph_data_di4_counter, hlrc8in_graph_time_di4_counter.length, setdata.setting.diset.DI4);
    graph_di_update(hlrc8in_chart_di4_timer, hlrc8in_graph_time_di4_timer, hlrc8in_graph_data_di4_timer, hlrc8in_graph_time_di4_timer.length, setdata.setting.diset.DI4_TIMER);
    graph_di_update(hlrc8in_chart_di5_counter, hlrc8in_graph_time_di5_counter, hlrc8in_graph_data_di5_counter, hlrc8in_graph_time_di5_counter.length, setdata.setting.diset.DI5);
    graph_di_update(hlrc8in_chart_di5_timer, hlrc8in_graph_time_di5_timer, hlrc8in_graph_data_di5_timer, hlrc8in_graph_time_di5_timer.length, setdata.setting.diset.DI5_TIMER);
    graph_di_update(hlrc8in_chart_di6_counter, hlrc8in_graph_time_di6_counter, hlrc8in_graph_data_di6_counter, hlrc8in_graph_time_di6_counter.length, setdata.setting.diset.DI6);
    graph_di_update(hlrc8in_chart_di6_timer, hlrc8in_graph_time_di6_timer, hlrc8in_graph_data_di6_timer, hlrc8in_graph_time_di6_timer.length, setdata.setting.diset.DI6_TIMER);
    graph_di_update(hlrc8in_chart_di7_counter, hlrc8in_graph_time_di7_counter, hlrc8in_graph_data_di7_counter, hlrc8in_graph_time_di7_counter.length, setdata.setting.diset.DI7);
    graph_di_update(hlrc8in_chart_di7_timer, hlrc8in_graph_time_di7_timer, hlrc8in_graph_data_di7_timer, hlrc8in_graph_time_di7_timer.length, setdata.setting.diset.DI7_TIMER);
    graph_di_update(hlrc8in_chart_di8_counter, hlrc8in_graph_time_di8_counter, hlrc8in_graph_data_di8_counter, hlrc8in_graph_time_di8_counter.length, setdata.setting.diset.DI8);
    graph_di_update(hlrc8in_chart_di8_timer, hlrc8in_graph_time_di8_timer, hlrc8in_graph_data_di8_timer, hlrc8in_graph_time_di8_timer.length, setdata.setting.diset.DI8_TIMER);

    //電波強度
    if (setdata.type == UnitCode.HLR_C8_IN) {
        graph_dbm_update(hlrc8in_chart_dBm, hlrc8in_graph_time_di1_counter, hlrc8in_graph_data_dBm);
    }
}

/*
 * 機能：  AD、DI、DOのグラフを描画
*/
function hlrc8_draw_graph(setdata) {
    var canvas_di1_counter = document.getElementById("hlrc8in_chart_di1_counter").getContext("2d");
    var canvas_di2_counter = document.getElementById("hlrc8in_chart_di2_counter").getContext("2d");
    var canvas_di3_counter = document.getElementById("hlrc8in_chart_di3_counter").getContext("2d");
    var canvas_di4_counter = document.getElementById("hlrc8in_chart_di4_counter").getContext("2d");
    var canvas_di5_counter = document.getElementById("hlrc8in_chart_di5_counter").getContext("2d");
    var canvas_di6_counter = document.getElementById("hlrc8in_chart_di6_counter").getContext("2d");
    var canvas_di7_counter = document.getElementById("hlrc8in_chart_di7_counter").getContext("2d");
    var canvas_di8_counter = document.getElementById("hlrc8in_chart_di8_counter").getContext("2d");
    var canvas_di1_timer = document.getElementById("hlrc8in_chart_di1_timer").getContext("2d");
    var canvas_di2_timer = document.getElementById("hlrc8in_chart_di2_timer").getContext("2d");
    var canvas_di3_timer = document.getElementById("hlrc8in_chart_di3_timer").getContext("2d");
    var canvas_di4_timer = document.getElementById("hlrc8in_chart_di4_timer").getContext("2d");
    var canvas_di5_timer = document.getElementById("hlrc8in_chart_di5_timer").getContext("2d");
    var canvas_di6_timer = document.getElementById("hlrc8in_chart_di6_timer").getContext("2d");
    var canvas_di7_timer = document.getElementById("hlrc8in_chart_di7_timer").getContext("2d");
    var canvas_di8_timer = document.getElementById("hlrc8in_chart_di8_timer").getContext("2d");
    //rssi
    var canvas_hlrc_dBm = document.getElementById("charthlrc8indbm").getContext("2d");

    //DIグラフを描画
    hlrc8in_chart_di1_counter = draw_graph_di(canvas_di1_counter, hlrc8in_graph_time_di1_counter, hlrc8in_graph_data_di1_counter, hlrc8in_graph_time_di1_counter.length, setdata.setting.diset.DI1);
    hlrc8in_chart_di1_timer = draw_graph_di(canvas_di1_timer, hlrc8in_graph_time_di1_timer, hlrc8in_graph_data_di1_timer, hlrc8in_graph_time_di1_timer.length, setdata.setting.diset.DI1_TIMER);
    hlrc8in_chart_di2_counter = draw_graph_di(canvas_di2_counter, hlrc8in_graph_time_di2_counter, hlrc8in_graph_data_di2_counter, hlrc8in_graph_time_di2_counter.length, setdata.setting.diset.DI2);
    hlrc8in_chart_di2_timer = draw_graph_di(canvas_di2_timer, hlrc8in_graph_time_di2_timer, hlrc8in_graph_data_di2_timer, hlrc8in_graph_time_di2_timer.length, setdata.setting.diset.DI2_TIMER);
    hlrc8in_chart_di3_counter = draw_graph_di(canvas_di3_counter, hlrc8in_graph_time_di3_counter, hlrc8in_graph_data_di3_counter, hlrc8in_graph_time_di3_counter.length, setdata.setting.diset.DI3);
    hlrc8in_chart_di3_timer = draw_graph_di(canvas_di3_timer, hlrc8in_graph_time_di3_timer, hlrc8in_graph_data_di3_timer, hlrc8in_graph_time_di3_timer.length, setdata.setting.diset.DI3_TIMER);
    hlrc8in_chart_di4_counter = draw_graph_di(canvas_di4_counter, hlrc8in_graph_time_di4_counter, hlrc8in_graph_data_di4_counter, hlrc8in_graph_time_di4_counter.length, setdata.setting.diset.DI4);
    hlrc8in_chart_di4_timer = draw_graph_di(canvas_di4_timer, hlrc8in_graph_time_di4_timer, hlrc8in_graph_data_di4_timer, hlrc8in_graph_time_di4_timer.length, setdata.setting.diset.DI4_TIMER);
    hlrc8in_chart_di5_counter = draw_graph_di(canvas_di5_counter, hlrc8in_graph_time_di5_counter, hlrc8in_graph_data_di5_counter, hlrc8in_graph_time_di5_counter.length, setdata.setting.diset.DI5);
    hlrc8in_chart_di5_timer = draw_graph_di(canvas_di5_timer, hlrc8in_graph_time_di5_timer, hlrc8in_graph_data_di5_timer, hlrc8in_graph_time_di5_timer.length, setdata.setting.diset.DI5_TIMER);
    hlrc8in_chart_di6_counter = draw_graph_di(canvas_di6_counter, hlrc8in_graph_time_di6_counter, hlrc8in_graph_data_di6_counter, hlrc8in_graph_time_di6_counter.length, setdata.setting.diset.DI6);
    hlrc8in_chart_di6_timer = draw_graph_di(canvas_di6_timer, hlrc8in_graph_time_di6_timer, hlrc8in_graph_data_di6_timer, hlrc8in_graph_time_di6_timer.length, setdata.setting.diset.DI6_TIMER);
    hlrc8in_chart_di7_counter = draw_graph_di(canvas_di7_counter, hlrc8in_graph_time_di7_counter, hlrc8in_graph_data_di7_counter, hlrc8in_graph_time_di7_counter.length, setdata.setting.diset.DI7);
    hlrc8in_chart_di7_timer = draw_graph_di(canvas_di7_timer, hlrc8in_graph_time_di7_timer, hlrc8in_graph_data_di7_timer, hlrc8in_graph_time_di7_timer.length, setdata.setting.diset.DI7_TIMER);
    hlrc8in_chart_di8_counter = draw_graph_di(canvas_di8_counter, hlrc8in_graph_time_di8_counter, hlrc8in_graph_data_di8_counter, hlrc8in_graph_time_di8_counter.length, setdata.setting.diset.DI8);
    hlrc8in_chart_di8_timer = draw_graph_di(canvas_di8_timer, hlrc8in_graph_time_di8_timer, hlrc8in_graph_data_di8_timer, hlrc8in_graph_time_di8_timer.length, setdata.setting.diset.DI8_TIMER);
    //電波強度                  単位を表示して、グラ愚を描画
    //if (setdata.type == UnitCode.HLR_C8_IN) {
    hlrc8in_chart_dBm = draw_graph_dbm(canvas_hlrc_dBm, hlrc8in_graph_time_di1_counter, hlrc8in_graph_data_dBm);
    //}
}

/**
 * HLRC8のグラフデータを取得、更新する
 */
function hlrc8_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // グラフ日付作成
    hlrc8in_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);
    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        hlrc8in_graph_data_di1_counter.length = 0;
        hlrc8in_graph_data_di2_counter.length = 0;
        hlrc8in_graph_data_di3_counter.length = 0;
        hlrc8in_graph_data_di4_counter.length = 0;
        hlrc8in_graph_data_di5_counter.length = 0;
        hlrc8in_graph_data_di6_counter.length = 0;
        hlrc8in_graph_data_di7_counter.length = 0;
        hlrc8in_graph_data_di8_counter.length = 0;
        hlrc8in_graph_data_di1_timer.length = 0;
        hlrc8in_graph_data_di2_timer.length = 0;
        hlrc8in_graph_data_di3_timer.length = 0;
        hlrc8in_graph_data_di4_timer.length = 0;
        hlrc8in_graph_data_di5_timer.length = 0;
        hlrc8in_graph_data_di6_timer.length = 0;
        hlrc8in_graph_data_di7_timer.length = 0;
        hlrc8in_graph_data_di8_timer.length = 0;
        //強度
        hlrc8in_graph_data_dBm.length = 0;

        hlrc8in_graph_time_di1_counter.length = 0;
        hlrc8in_graph_time_di2_counter.length = 0;
        hlrc8in_graph_time_di3_counter.length = 0;
        hlrc8in_graph_time_di4_counter.length = 0;
        hlrc8in_graph_time_di5_counter.length = 0;
        hlrc8in_graph_time_di6_counter.length = 0;
        hlrc8in_graph_time_di7_counter.length = 0;
        hlrc8in_graph_time_di8_counter.length = 0;
        hlrc8in_graph_time_di1_timer.length = 0;
        hlrc8in_graph_time_di2_timer.length = 0;
        hlrc8in_graph_time_di3_timer.length = 0;
        hlrc8in_graph_time_di4_timer.length = 0;
        hlrc8in_graph_time_di5_timer.length = 0;
        hlrc8in_graph_time_di6_timer.length = 0;
        hlrc8in_graph_time_di7_timer.length = 0;
        hlrc8in_graph_time_di8_timer.length = 0;
        //*******************データ格納*******************
        //DI1
        for (var i = 0; i < obj.Respons.di1_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di1_counter[i] = moment(obj.Respons.di1_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di1_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di1_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di1_counter[i] = obj.Respons.di1_counter.Data[i].Value;
            }
        }
        //DI1 TImer
        for (var i = 0; i < obj.Respons.di1_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di1_timer[i] = moment(obj.Respons.di1_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di1_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di1_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di1_timer[i] = obj.Respons.di1_timer.Data[i].Value;
            }
        }
        //DI2
        for (var i = 0; i < obj.Respons.di2_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di2_counter[i] = moment(obj.Respons.di2_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di2_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di2_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di2_counter[i] = obj.Respons.di2_counter.Data[i].Value;
            }
        }
        //DI2 TImer
        for (var i = 0; i < obj.Respons.di2_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di2_timer[i] = moment(obj.Respons.di2_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di2_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di2_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di2_timer[i] = obj.Respons.di2_timer.Data[i].Value;
            }
        }
        //DI3
        for (var i = 0; i < obj.Respons.di3_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di3_counter[i] = moment(obj.Respons.di3_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di3_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di3_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di3_counter[i] = obj.Respons.di3_counter.Data[i].Value;
            }
        }
        //DI3 TImer
        for (var i = 0; i < obj.Respons.di3_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di3_timer[i] = moment(obj.Respons.di3_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di3_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di3_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di3_timer[i] = obj.Respons.di3_timer.Data[i].Value;
            }
        }
        //DI4
        for (var i = 0; i < obj.Respons.di4_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di4_counter[i] = moment(obj.Respons.di4_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di4_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di4_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di4_counter[i] = obj.Respons.di4_counter.Data[i].Value;
            }
        }
        //DI4 TImer
        for (var i = 0; i < obj.Respons.di4_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di4_timer[i] = moment(obj.Respons.di4_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di4_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di4_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di4_timer[i] = obj.Respons.di4_timer.Data[i].Value;
            }
        }
        //DI5
        for (var i = 0; i < obj.Respons.di5_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di5_counter[i] = moment(obj.Respons.di5_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di5_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di5_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di5_counter[i] = obj.Respons.di5_counter.Data[i].Value;
            }
        }
        //DI5 TImer
        for (var i = 0; i < obj.Respons.di5_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di5_timer[i] = moment(obj.Respons.di5_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di5_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di5_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di5_timer[i] = obj.Respons.di5_timer.Data[i].Value;
            }
        }
        //DI6
        for (var i = 0; i < obj.Respons.di6_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di6_counter[i] = moment(obj.Respons.di6_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di6_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di6_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di6_counter[i] = obj.Respons.di6_counter.Data[i].Value;
            }
        }
        //DI6 TImer
        for (var i = 0; i < obj.Respons.di6_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di6_timer[i] = moment(obj.Respons.di6_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di6_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di6_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di6_timer[i] = obj.Respons.di6_timer.Data[i].Value;
            }
        }
        //DI7
        for (var i = 0; i < obj.Respons.di7_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di7_counter[i] = moment(obj.Respons.di7_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di7_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di7_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di7_counter[i] = obj.Respons.di7_counter.Data[i].Value;
            }
        }
        //DI7 TImer
        for (var i = 0; i < obj.Respons.di7_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di7_timer[i] = moment(obj.Respons.di7_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di7_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di7_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di7_timer[i] = obj.Respons.di7_timer.Data[i].Value;
            }
        }
        //DI8
        for (var i = 0; i < obj.Respons.di8_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di8_counter[i] = moment(obj.Respons.di8_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di8_counter.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di8_counter[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di8_counter[i] = obj.Respons.di8_counter.Data[i].Value;
            }
        }
        //DI8 TImer
        for (var i = 0; i < obj.Respons.di8_timer.Num; i++) {
            //時間          "分：秒"
            hlrc8in_graph_time_di8_timer[i] = moment(obj.Respons.di8_timer.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di8_timer.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrc8in_graph_data_di8_timer[i] = null;
            }
            //データがある
            else {
                hlrc8in_graph_data_di8_timer[i] = obj.Respons.di8_timer.Data[i].Value;
            }
        }
        //強度
        for (var i = 0; i < obj.Respons.di1_counter.Num; i++) {
            //時間          "年：月：日 時：分"
            hlrc8in_graph_time_di1_counter[i] = moment(obj.Respons.di1_counter.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
            //データが無い場合
            if (parseInt(obj.Respons.di1_counter.Data[i].RSSI) == 0) {
                //強度
                hlrc8in_graph_data_dBm[i] = null;
            }
            //データがある
            else {
                //強度
                hlrc8in_graph_data_dBm[i] = obj.Respons.di1_counter.Data[i].RSSI;
            }
        }

        switch (setdata.type) {
            //case UnitCode.HLR_C8_IN, UnitCode.HR_C8_IN:
            case UnitCode.HLR_C8_IN:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (hlrc8in_graph_exist == false) {
                    hlrc8_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    hlrc8in_graph_exist = true;
                }
                else {
                    hlrc8in_update_graph(setdata);
                }
                /* graph data update */
                document.getElementById("idhlrc8ingraphtime_di1").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di2").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di3").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di4").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di5").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di6").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di7").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di8").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer1").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer2").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer3").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer4").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer5").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer6").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer7").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer8").innerHTML = hlrc8in_graph_date;
                if (gcrurbranch == 2) {
                    document.getElementById("idhlrc8ingraphtimedbm").innerHTML = "";
                }
                else {
                    document.getElementById("idhlrc8ingraphtimedbm").innerHTML = hlrc8in_graph_date;
                }
                break;
            case UnitCode.HR_C8_IN:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (hlrc8in_graph_exist == false) {
                    hlrc8_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    hlrc8in_graph_exist = true;
                }
                else {
                    hlrc8in_update_graph(setdata);
                }
                /* graph data update */
                document.getElementById("idhlrc8ingraphtime_di1").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di2").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di3").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di4").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di5").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di6").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di7").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_di8").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer1").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer2").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer3").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer4").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer5").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer6").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer7").innerHTML = hlrc8in_graph_date;
                document.getElementById("idhlrc8ingraphtime_timer8").innerHTML = hlrc8in_graph_date;
                if (gcrurbranch == 2) {
                    document.getElementById("idhlrc8ingraphtimedbm").innerHTML = "";
                }
                else {
                    document.getElementById("idhlrc8ingraphtimedbm").innerHTML = hlrc8in_graph_date;
                }
                break;
        }
    }
    else if (obj.Status == 400) {

        //データの要素数 60
        //グラフが最適に表示できるように, 60 -> 57
        hlrc8in_graph_data_di1_counter.length = null;
        hlrc8in_graph_data_di1_timer.length = null;
        hlrc8in_graph_data_di2_counter.length = null;
        hlrc8in_graph_data_di2_timer.length = null;
        hlrc8in_graph_data_di3_counter.length = null;
        hlrc8in_graph_data_di3_timer.length = null;
        hlrc8in_graph_data_di4_counter.length = null;
        hlrc8in_graph_data_di4_timer.length = null;
        hlrc8in_graph_data_di5_counter.length = null;
        hlrc8in_graph_data_di5_timer.length = null;
        hlrc8in_graph_data_di6_counter.length = null;
        hlrc8in_graph_data_di6_timer.length = null;
        hlrc8in_graph_data_di7_counter.length = null;
        hlrc8in_graph_data_di7_timer.length = null;
        hlrc8in_graph_data_di8_counter.length = null;
        hlrc8in_graph_data_di8_timer.length = null;
        //強度
        hlrc8in_graph_data_dBm.length = 0;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlrc8in_graph_exist == false) {
            hlrc8_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            hlrc8in_graph_exist = true;
        }
        else {
            hlrc8in_update_graph(setdata);
        }
        /* graph data update */
        document.getElementById("idhlrc8ingraphtime_di1").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di2").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di3").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di4").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di5").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di6").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di7").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_di8").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer1").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer2").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer3").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer4").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer5").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer6").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer7").innerHTML = hlrc8in_graph_date;
        document.getElementById("idhlrc8ingraphtime_timer8").innerHTML = hlrc8in_graph_date;
        if (gcrurbranch == 2) {
            document.getElementById("idhlrc8ingraphtimedbm").innerHTML = "";
        }
        else {
            document.getElementById("idhlrc8ingraphtimedbm").innerHTML = hlrc8in_graph_date;
        }
    }
    else {

    }
}

/**
 * HLRC8INの瞬時値を取得、更新する
 */
function get_InsDatHLRC8IN(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var suffix, term, term2;

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        // 更新時間
        $("#hlrc8inupdated_time").html("データ更新：----/--/-- --:--");

        var suffix;
        var term;
        for (let index = 1; index < 9; index++) {
            //DI COUNTER
            suffix = "di" + index;
            //瞬時値テーブルで
            term = HLRC8IN_DIVAL + suffix;
            $(term).html('--');

            //オン・オフバーで
            term = HLRC8IN_DISTS + suffix;
            $(term).html("");
            $(term).removeClass("text-light shadow");
            $(term).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });

            //DI Timer
            suffix = "timer" + index;
            //瞬時値テーブルで
            term = HLRC8IN_DIVAL + suffix;
            $(term).html("--");
        }
        //電波強度
        $("#idhlrc8invaldbm").html("--");
        //警報状態
        term = "#alertH_hlrc8in";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");
        isNoRequest = true;
    }
    // 設定値を表示する
    displayhlrc8insetting(setting);
    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if ((isNoRequest == true) || (setting.setting == null)) {
        return;
    }
    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        displayhlrc8indata(obj, setting);
    }, setting);
}

/**
 * HRC8INの瞬時値を取得、更新する
 */
function get_InsDatHRC8IN(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var suffix, term, term2;

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        // 更新時間
        $("#hlrc8inupdated_time").html("データ更新：----/--/-- --:--");

        var suffix;
        var term;
        for (let index = 1; index < 9; index++) {
            //DI COUNTER
            suffix = "di" + index;
            //瞬時値テーブルで
            term = HLRC8IN_DIVAL + suffix;
            $(term).html('--');

            //オン・オフバーで
            term = HLRC8IN_DISTS + suffix;
            $(term).html("");
            $(term).removeClass("text-light shadow");
            $(term).css({
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
            //DI Timer
            suffix = "timer" + index;
            //瞬時値テーブルで
            term = HLRC8IN_DIVAL + suffix;
            $(term).html("--");
        }
        //警報状態
        term = "#alertH_hlrc8in";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");
        isNoRequest = true;
    }
    // 設定値を表示する
    displayhrc8insetting(setting);

    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if ((isNoRequest == true) || (setting.setting == null)) {
        return;
    }

    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        displayhlrc8indata(obj, setting);
    }, setting);
}

/**
 * HR-C8INの設定画面では設定値を表示
 * 設定値：接続機種設定、名称、RS-485アドレス
 */
function fncdispHrc8in() {
    // 設定項目のラベルを更新する
    document.getElementById("a4c4address").innerHTML = "RS-485 Address";
    document.getElementById("a4c4type").innerHTML = "機種";
    document.getElementById("a4c4name").innerHTML = "名称";

    // RS-485アドレスを０ｘ０１～０ｘFFに追加する
    var x = document.getElementById('idunitaddress');
    while (x.options.length) x.remove(0);
    addLoraAdrOption("idunitaddress", 1, 255);

    // 接続機種設定、名称、RS-485アドレスを格納する
    document.getElementById("a4c4title").innerHTML = "HR-C8-IN設定";
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

/**
 * HLR-C8-INの設定値をクリアする
 */
function fncHlrC8inSettingClear() {
    for (var i = 1; i < 9; i++) {
        //DI
        document.getElementById("c8inset_title_di" + i).value = "";                     //タイトル
        document.getElementById("c8inset_input_multi_di" + i).selectedIndex = 0;        //乗数設定
        document.getElementById("c8inset_decimal_di" + i).selectedIndex = 0;            //小数点以下桁数
        document.getElementById("c8inset_unit_di" + i).value = "";                      //単位設定
        document.getElementById("c8inset_graphType_di" + i).selectedIndex = 0;          //グラフ種類
        document.getElementById("c8inset_graphH_di" + i).value = "";                    //グラフ上限値
        document.getElementById("c8inset_alarmH_di" + i).value = "";                    //Alarm 上限値

        //Timer
        document.getElementById("c8inset_title_timer" + i).value = "";                  //タイトル
        document.getElementById("c8inset_input_multi_timer" + i).selectedIndex = 0;     //乗数設定
        document.getElementById("c8inset_decimal_timer" + i).selectedIndex = 0;         //小数点以下桁数
        document.getElementById("c8inset_unit_timer" + i).value = "";                   //単位設定
        document.getElementById("c8inset_graphType_timer" + i).selectedIndex = 0;       //グラフ種類
        document.getElementById("c8inset_graphH_timer" + i).value = "";                 //グラフ上限値
        document.getElementById("c8inset_alarmH_timer" + i).value = "";                 //Alarm 上限値
    }
}
