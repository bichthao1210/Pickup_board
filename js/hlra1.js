/*version=1.11*/
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

//HLR-A1のグラフ
var hlra1_chart_ad1;
var hlra1_graph_exist = false;
var hlra1_chart_dBm;            //電波強度
var hlra1_graph_dat_num = 0;    //グラフ用のデータ数
var hlra1_graph_time = [];      //グラフ用の時間配列
var hlra1_graph_date;
var hlra1_graph_data_ad1 = [];  //ADグラフ用のデータ配列
var hlra1_graph_data_dBm = [];  //電波強度グラフ用のデータ配列

// A1の最大、最小、平均値
var hlra1_histogram_exist = false;
var hlra1_histogram_ad1;            //AD
var hlra1_graph_max_ad1 = [];  //ADグラフ用のデータ配列
var hlra1_graph_min_ad1 = [];  //ADグラフ用のデータ配列
var hlra1_graph_med_ad1 = [];  //ADグラフ用のデータ配列

// ID
const A1_AD_GRAPH_TITLE_ID_TERM = "a1set_title_ad1";
const A1_AD_INPUT_RANGE_ID_TERM = "a1set_input_range_ad1";
const A1_AD_DEC_ID_TERM = "a1set_decimal_ad1";
const A1_AD_ZERO_ID_TERM = "a1set_zero_ad1";
const A1_AD_SPAN_ID_TERM = "a1set_span_ad1";
const A1_AD_UNIT_ID_TERM = "a1set_unit_ad1";
const A1_AD_GRAPHL_ID_TERM = "a1set_graphL_ad1";
const A1_AD_GRAPHH_ID_TERM = "a1set_graphH_ad1";
const A1_AD_GRAPH_ALARML_ID_TERM = "a1set_alarmL_ad1";
const A1_AD_GRAPH_ALARMH_ID_TERM = "a1set_alarmH_ad1";
const A1_AD_GRAPH_ALARMLE_ID_TERM = "a1set_alarmLE_ad1";
const A1_AD_GRAPH_ALARMHE_ID_TERM = "a1set_alarmHE_ad1";
const A1_AD_GRAPH_ALARMMAXE_ID_TERM = "a1set_alarmMaxE_ad1";
const A1_AD_GRAPH_ALARMMINE_ID_TERM = "a1set_alarmMinE_ad1";
const A1_AD_GRAPH_CLALARML_ID_TERM = "a1set_ClAlarmL_ad1";
const A1_AD_GRAPH_CLALARMH_ID_TERM = "a1set_ClAlarmH_ad1";
const A1_AD_HISTOGRAME_ID_TERM = "a1set_MaxMinMed_ad1";
const A1_AD_ALARMDELAYE_ID_TERM = "a1_DelayAlarmE_ad1";
const A1_AD_ALARMDELAYVAL_ID_TERM = "a1_DelayAlarmVal_ad1";

const HLRA1INPUT = [
    { value: 1 },
    { value: 2 },
    { value: 3 },
    { value: 4 },
    { value: 5 },
    { value: 6 },
    { value: 7 },
    { value: 8 }
]


/**
 * HLR-A1ユニットの瞬時値を表示する
 * 
 */
function get_InsDatHLRA1(setting, unitNo, unitSts) {
    var isNoRequest = false;
    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        //瞬時値テーブルでのADデータ
        $("#idhlra1valad").html("--");
        // 電波強度
        $("#idhlra1valdbm").html("--");
        $("#hlra1updated_time").html("データ更新：----/--/-- --:--");

        //警報状態
        var term = "#alertH_hlra1";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }

    //設定値を表示
    displayhlra1setting(setting);

    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if ((isNoRequest == true) || (setting.setting == null)) {
        return;
    }
    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        displayhlra1data(obj, setting);
    }, setting);
}

/**
 * hlr instance data display
 */
function displayhlra1data(hlra1insdat, setdata) {
    var term, term2;
    //正常
    if (hlra1insdat.Status == 200) {

        //データがあるかどうかチェック
        //データが無い場合
        if (hlra1insdat.Respons.Data == null) {
            //瞬時値テーブルでのADデータ
            $("#idhlra1valad").html("--");
            // 電波強度
            $("#idhlra1valdbm").html("--");
            $("#hlra1updated_time").html("データ更新：----/--/-- --:--");
        }
        //データがある場合
        else {
            //---------------------Data - Show out---------------------
            //最新の時間を取得
            term = "データ更新：" + hlra1insdat.Respons.Time[0] + "/" + ("00" + hlra1insdat.Respons.Time[1]).slice(-2) + "/" + ("00" + hlra1insdat.Respons.Time[2]).slice(-2) + " " + ("00" + hlra1insdat.Respons.Time[3]).slice(-2) + ":" + ("0" + hlra1insdat.Respons.Time[4]).slice(-2);
            $("#hlra1updated_time").html(term);

            //瞬時値テーブルでのADデータ
            term = "#idhlra1valad";
            if ((isNaN(hlra1insdat.Respons.Data.an1_analog.Value) == true) || (hlra1insdat.Respons.Data.an1_analog.Value === '') || (hlra1insdat.Respons.Data.an1_analog.Value == null)) {
                term2 = "";
            }
            else {
                strdata = parseFloat(hlra1insdat.Respons.Data.an1_analog.Value).toFixed(setdata.setting.adset.Point);
                term2 = strdata + " [" + setdata.setting.adset.Unit + "]";
            }
            $(term).html(term2);

            // 電波強度
            $("#idhlra1valdbm").html(hlra1insdat.Respons.RSSI + " [dBm]");

            //警報状態
            var alert_exist = 0;// 0: success; 1: danger; 2: warning
            term = "#alertH_hlra1";
            var alert_str1 = "";
            var unknown = false;
            if (hlra1insdat.Respons.Data.an1_analog.State == null) {
                unknown = true;
            }
            //A1
            termdata = parseInt(hlra1insdat.Respons.Data.an1_analog.State, 16);
            // アナログ入力異常
            if ((termdata & 0x0001) == 0x0001) {
                alert_exist = 3;
                alert_str1 = setdata.setting.adset.Title;
            }
            // 最大警報
            // xxxx xxxx 1xxx xxxx
            else if ((termdata & 0x0080) == 0x0080) {
                alert_exist = 5;
                alert_str1 = setdata.setting.adset.Title;
            }
            // 最小警報
            // xxxx xxxx x1xx xxxx
            else if ((termdata & 0x0040) == 0x0040) {
                alert_exist = 4;
                alert_str1 = setdata.setting.adset.Title;
            }
            //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
            // xxxx 10xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                alert_exist = 1;
                alert_str1 = setdata.setting.adset.Title;
            }
            //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
            // xxxx 01xx xxxx xxxx
            else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                alert_exist = 2;
                alert_str1 = setdata.setting.adset.Title;
            }
            //不明
            // xxxx 11xx xxxx xxxx
            else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                //alert_exist = 2;
                alert_str1 = setdata.setting.adset.Title;
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
            } else if (alert_exist == 3) {
                $(term).addClass("alert-danger");
                $(term).html("<strong>" + alert_str1 + "</strong>" + " アナログ入力異常が発生しています！　");
            } else if (alert_exist == 4) {
                $(term).addClass("alert-warning");
                $(term).html("<strong>" + alert_str1 + "</strong>" + "（最小値）が下限警報発生値を下回っています！　");
            } else if (alert_exist == 5) {
                $(term).addClass("alert-danger");
                $(term).html("<strong>" + alert_str1 + "</strong>" + "（最大値）が上限警報発生値を超えています！　");
            } else if (unknown == true) {
                $(term).html("<strong>" + alert_str1 + "</strong>" + "-----　");
            } else {
                $(term).addClass("alert-success");
                $(term).html("<strong>正常</strong>　");
            }

        }
    }
    else {
        $("#hlra1updated_time").html("データ更新：----/--/-- --:--");
        $("#idhlra1valad").html("--");
        $("#idhlra1valdbm").html("--");

        //警報状態
        term = "#alertH_hlra1";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).html("<strong>NO DATA</strong>　");
    }
}


/**
 * hrla1 グラフデータクリア
 */
function clear_grp_hlra1() {
    for (var i = 0; i < hlra1_graph_data_ad1.length; i++) {
        hlra1_graph_data_ad1[i] = null;
        //強度
        hlra1_graph_data_dBm[i] = null;
    }

    if (hlra1_graph_exist == true) {
        hlra1_chart_ad1.destroy();
        hlra1_chart_dBm.destroy();
        hlra1_graph_exist = false;
    }

    if (hlra1_histogram_exist == true) {
        hlra1_histogram_ad1.destroy();
        hlra1_histogram_exist = false;
    }

    //グラフの単位
    $("#idhlra1grpunitad1").html("--");

    //グラフのタイトル
    $("#idhlra1grptitlead1").html("--");

    // 最大、最小、平均のグラフのタイトル
    $("#idhlra1_title_histogramad1").html("--");

    //最大、最小、平均のグラフの単位
    $("#idhlra1_grpunit_histogramad1").html("--");

    // 上限警報発生値
    $("#idhlra1grphalrmad1").html("上限警報発生値 -- [--]");

    // 下限警報発生値
    $("#idhlra1grplalrmad1").html("下限警報発生値 -- [--]");

    $("#hlra1updated_time").html("データ更新：----/--/-- --:--");

    //ADデータ
    //瞬時値テーブルで
    $("#idhlra1valad").html("--");

    //電波強度
    $("#idhlra1valdbm").html("--");

    var term = "#alertH_hlra1";
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
function fncLoadRealtimeDataHlra1(hlra1setting, tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "idhlra1valad").text("--");
        $('#' + tvid + "idhlra1valdbm").text("--");
        $('#' + tvid + "hlra1updated_time").text('データ更新：----/--/-- --:--');
    }
    else {
        // 通信正常、瞬時値がある場合
        $('#' + tvid + "hlra1updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "idhlra1valdbm").text(realtimeObj.RSSI + " [dBm]");

        if ((isNaN(realtimeObj.Data.an1_analog.Value) == true) || (realtimeObj.Data.an1_analog.Value === '') || (realtimeObj.Data.an1_analog.Value == null)) {
            $('#' + tvid + "idhlra1valad").text("");
        }
        else {
            $('#' + tvid + "idhlra1valad").text(parseFloat(realtimeObj.Data.an1_analog.Value).toFixed(hlra1setting.setting.adset.Point) + " [" + hlra1setting.setting.adset.Unit + "]");
        }

    }

}

/**
* HLR-A1全て表示では更新する。
*/
function fncHlra1DspData(tvid, UnitNo, isUnitChg, hlra1setting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var hlrad_set_tmp = {
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
        };

        var rssi = {
            "Title": "電波強度",
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };

        hlra1setting.setting = { "adset": hlrad_set_tmp, "rssi": rssi };
        hlra1setting.setting.adset.Title = jis2chr(settingObj.an1_analog.Title);
        hlra1setting.setting.adset.Range = settingObj.an1_analog.Range;
        hlra1setting.setting.adset.Point = settingObj.an1_analog.Point;
        hlra1setting.setting.adset.Out[0] = settingObj.an1_analog.Out[0];
        hlra1setting.setting.adset.Out[1] = settingObj.an1_analog.Out[1];
        hlra1setting.setting.adset.Unit = jis2chr(settingObj.an1_analog.Unit);
        hlra1setting.setting.adset.Graph[0] = settingObj.an1_analog.Graph[0];
        hlra1setting.setting.adset.Graph[1] = settingObj.an1_analog.Graph[1];
        hlra1setting.setting.adset.Alarm[0] = settingObj.an1_analog.Alarm[0];
        hlra1setting.setting.adset.Alarm[1] = settingObj.an1_analog.Alarm[1];
        hlra1setting.setting.adset.AlarmE[0] = settingObj.an1_analog.AlarmE[0];
        hlra1setting.setting.adset.AlarmE[1] = settingObj.an1_analog.AlarmE[1];
        hlra1setting.setting.adset.AlarmMinMaxE[0] = settingObj.an1_analog.AlarmMinMaxE[0];
        hlra1setting.setting.adset.AlarmMinMaxE[1] = settingObj.an1_analog.AlarmMinMaxE[1];
        hlra1setting.setting.adset.HistogramE = settingObj.an1_analog.HistogramE;

        hlra1setting.setting.rssi.Title = (settingObj) ? (settingObj.RSSI_Title) : '';

        // ADのタイトル表示
        $('#' + tvid + "idhlra1titlead").text(hlra1setting.setting.adset.Title);
        $('#' + tvid + "idhlra1titledbm").text(jis2chr(hlra1setting.setting.rssi.Title));

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlra1setting.type, settingObj, UnitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlra1setting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra1(hlra1setting, tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancehlra1(tmpObj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra1(hlra1setting, tvid, realtimeObj);
        }
    }
    else {
        if (hlra1setting.setting !== null) {
            // ADのタイトル表示
            $('#' + tvid + "idhlra1titlead").text(hlra1setting.setting.adset.Title);
            // rssi
            $('#' + tvid + "idhlra1titledbm").text(jis2chr(hlra1setting.setting.rssi.Title));
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlra1setting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra1(hlra1setting, tvid, retobj);
            
            return;
        }
        // 通信OK、瞬時値を取得してから、表示する
        rs485_insread_data(UnitNo, function (obj, hlra1setting) {
            // Save Instance Data for Combine Graph
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlra1(obj, UnitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataHlra1(hlra1setting, tvid, obj.Respons);

        }, hlra1setting);

    }
}

/**
 * hlra1 instance save
 */
function fncDoSaveInstancehlra1(obj, UnitNo, gwid) {
    // Save Instance Data for Combine Graph
    var retobj = obj;
    if (obj.Status == 200) {
        if (obj.Respons.Data == null) {
            retobj = null;
        }
        else {
            retobj.Respons.Data["rssi"] = { Value: obj.Respons.RSSI };
            retobj.Respons.Data["an1_analog_max"] = {
                Value: obj.Respons.Data.an1_analog.Max,
                State: obj.Respons.Data.an1_analog.State
            };
            retobj.Respons.Data["an1_analog_min"] = {
                Value: obj.Respons.Data.an1_analog.Min,
                State: obj.Respons.Data.an1_analog.State
            };
            retobj.Respons.Data["an1_analog_ave"] = {
                Value: obj.Respons.Data.an1_analog.Avg,
                State: obj.Respons.Data.an1_analog.State
            };
        }
    }

    fncSaveInstanceforCombiGraph(retobj, UnitNo, gwid);
}


/**
* HLR-A1ダイナミク瞬時データ表示作成
*/
function fncHlrA1InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlra1_title" class="h5 m-0">hlra1titlestring \
            </h4> \
            <h6 id="hlra1updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="idhlra1titlead" class="text-center table-active" style="width:12rem" ></th> \
                            <td id="idhlra1valad" class="text-right">--</td> \
                            <th id="idhlra1titledbm" class="text-center table-active" style="width:12rem" ></th> \
                            <td id="idhlra1valdbm" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlra1_title/g, tvid + "idhlra1_title");
    rtnval = rtnval.replace(/idhlra1titledbm/g, tvid + "idhlra1titledbm");
    rtnval = rtnval.replace(/idhlra1valdbm/g, tvid + "idhlra1valdbm");
    rtnval = rtnval.replace(/idhlra1valad/g, tvid + "idhlra1valad");
    rtnval = rtnval.replace(/idhlra1titlead/g, tvid + "idhlra1titlead");
    rtnval = rtnval.replace(/hlra1updated_time/g, tvid + "hlra1updated_time");
    rtnval = rtnval.replace(/hlra1titlestring/g, title);

    return rtnval;
}

/**
 * HLR-A1ユニットのグラフ値を取得して、描画する
 * 
 */
function hlra1_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return
    }
    // グラフ日付作成
    hlra1_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //サーバーへ要求を送信して、受信データをJSON型に変換
    //正常
    if (obj.Status == 200) {
        // ****************初期化する****************
        // AD
        hlra1_graph_dat_num = obj.Respons.an1_analog.Num;
        hlra1_graph_time.length = 0;
        hlra1_graph_data_ad1.length = 0;
        hlra1_graph_data_dBm.length = 0;
        // 最大、最小、平均
        hlra1_graph_max_ad1.length = 0;
        hlra1_graph_min_ad1.length = 0;
        hlra1_graph_med_ad1.length = 0;

        // ****************データ格納****************
        // AD
        for (var i = 0; i < hlra1_graph_dat_num; i++) {
            //時間          "年：月：日 時：分"
            hlra1_graph_time[i] = moment(obj.Respons.an1_analog.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
               
            //データが無い場合
            if (obj.Respons.an1_analog.Data[i].RSSI == 0) {
                //Nullならグラフに表示しない
                hlra1_graph_data_ad1[i] = null;
                hlra1_graph_data_dBm[i] = null;
                // 最大値、最小値、平均値
                hlra1_graph_max_ad1[i] = null;
                hlra1_graph_min_ad1[i] = null;
                hlra1_graph_med_ad1[i] = null;
            }
            //データがある
            else {
                //AD1
                hlra1_graph_data_ad1[i] = obj.Respons.an1_analog.Data[i].Value;
                //強度
                if (gcrurbranch == 2) {
                    hlra1_graph_data_dBm[i] = null;
                }
                else {
                    hlra1_graph_data_dBm[i] = obj.Respons.an1_analog.Data[i].RSSI;
                }

                // 最大値
                hlra1_graph_max_ad1[i] = obj.Respons.an1_analog.Data[i].Max;
                //最小値
                hlra1_graph_min_ad1[i] = obj.Respons.an1_analog.Data[i].Min;
                // 平均値
                hlra1_graph_med_ad1[i] = obj.Respons.an1_analog.Data[i].Avg;
            }
        }

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlra1_graph_exist == false) {
            hlra1_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            hlra1_graph_exist = true;
        }
        else {
            hlra1_update_graph(setdata);
        }

        // 最大、最小、平均グラフの表示
        if (hlra1_histogram_exist == false) {
            hlra1_draw_histogram(setdata);
        }
        else {
            hlra1_update_histogram(setdata);
        }

        /* graph data update */
        document.getElementById("idhlra1graphtimead1").innerHTML = hlra1_graph_date;
        // Histogram Time Updates
        if (hlra1_histogram_exist == true) {
            document.getElementById("hlra1_graphtime_histogramad1").innerHTML = hlra1_graph_date;
        }

        if (gcrurbranch == 2) {
            document.getElementById("idhlra1graphtimedbm").innerHTML = "";
        }
        else {
            document.getElementById("idhlra1graphtimedbm").innerHTML = hlra1_graph_date;
        }

    }
    else if (obj.Status == 400) {
        hlra1_graph_dat_num = 0;
        hlra1_graph_time.length = 0;
        hlra1_graph_data_ad1.length = 0;
        hlra1_graph_data_dBm.length = 0;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlra1_graph_exist == false) {
            hlra1_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            hlra1_graph_exist = true;
        }
        else {
            hlra1_update_graph(setdata);
        }

        // 最大、最小、平均グラフの表示
        if (hlra1_histogram_exist == false) {
            hlra1_draw_histogram(setdata);
        }
        else {
            hlra1_update_histogram(setdata);
        }

        /* graph data update */
        document.getElementById("idhlra1graphtimead1").innerHTML = hlra1_graph_date;
        // Histogram Time Updates
        if (hlra1_histogram_exist == true) {
            document.getElementById("hlra1_graphtime_histogramad1").innerHTML = hlra1_graph_date;
        }

        if (gcrurbranch == 2) {
            document.getElementById("idhlra1graphtimedbm").innerHTML = "";
        } else {
            document.getElementById("idhlra1graphtimedbm").innerHTML = hlra1_graph_date;
        }
    }
    else {

    }
}

/*  機能：  HLR-A1のADのグラフを描画  

*/
function hlra1_draw_graph(setdata) {
    //AD
    var hlra1_canvas_ad1 = document.getElementById("hlra1_chart1").getContext("2d");
    //rssi
    var hlra1_canvas_dBm = document.getElementById("charthlra1dbm").getContext("2d");

    //AD                     単位を表示して、グラフを描画
    hlra1_chart_ad1 = draw_graph_ad(hlra1_canvas_ad1, hlra1_graph_time, hlra1_graph_data_ad1, hlra1_graph_dat_num, setdata.setting.adset);

    //電波強度                  単位を表示して、グラ愚を描画
    hlra1_chart_dBm = draw_graph_dbm(hlra1_canvas_dBm, hlra1_graph_time, hlra1_graph_data_dBm);

}

/*  機能：  AD、DI、電波強度のグラフを更新
*/
function hlra1_update_graph(setdata) {
    //AD
    graph_ad_update(hlra1_chart_ad1, hlra1_graph_time, hlra1_graph_data_ad1, hlra1_graph_dat_num, setdata.setting.adset);
    //電波強度
    graph_dbm_update(hlra1_chart_dBm, hlra1_graph_time, hlra1_graph_data_dBm);
}

/*  機能：  HLR-A1の最大、最小、平均のグラフを描画  

*/
function hlra1_draw_histogram(setdata) {
    var hlra1_canvas_histogram = document.getElementById("hlra1_histogramad1").getContext("2d");
    if (setdata.setting.adset.HistogramE != 0) {
        document.getElementById("idhlra1_Histogram1").style.display = "block";
        hlra1_histogram_exist = true;

        //ADの単位を表示して、グラフを描画
        hlra1_histogram_ad1 = draw_minmaxavg_ad(hlra1_canvas_histogram, hlra1_graph_time, hlra1_graph_max_ad1, hlra1_graph_min_ad1, hlra1_graph_med_ad1, hlra1_graph_dat_num, setdata.setting.adset);

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend_a1");
        myLegendContainer.innerHTML = hlra1_histogram_ad1.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra1_histogram_ad1);
            });

        }
    }
    else {
        document.getElementById("idhlra1_Histogram1").style.display = "none";
    }
}

/*  機能：  AD、DI、電波強度のグラフを更新
*/
function hlra1_update_histogram(setdata) {
    //AD
    histogram_ad_update(hlra1_histogram_ad1, hlra1_graph_time, hlra1_graph_max_ad1, hlra1_graph_min_ad1, hlra1_graph_med_ad1, hlra1_graph_dat_num, setdata.setting.adset);
}

/*  機能：  AD設定の要求電文を作成、ダイアログを表示
    引数：
            event_obj：ADの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_hlra1_ad_setting(event_obj, unitNo) {
    var ch = event_obj.target.id;
    var item = ch.split("_")[1] + "_" + ch.split("_")[2];
    var settingpoint = 4;

    // JavascriptDataを作成
    var jsDat = new Object();

    // [UnitNo]
    jsDat.UnitNo = unitNo;
    // [Item]
    jsDat.Item = item;
    // [Title]
    jsDat.Title = chr2sjis(document.getElementById(A1_AD_GRAPH_TITLE_ID_TERM).value, 20);
    // [Range]
    var element = document.getElementById(A1_AD_INPUT_RANGE_ID_TERM).value;
    var strTerm = element.toString(16).toUpperCase();

    while (strTerm.length < 4) { //4桁まで埋める
        strTerm = "0" + strTerm;
    }
    jsDat.Range = strTerm;
    // [Point]
    strTerm = document.getElementById(A1_AD_DEC_ID_TERM).selectedIndex.toString(16).toUpperCase();
    while (strTerm.length < 4) { //4桁まで埋める
        strTerm = "0" + strTerm;
    }
    jsDat.Point = strTerm;
    // [OutZero]
    jsDat.OutZero = dec2hex(document.getElementById(A1_AD_ZERO_ID_TERM).value, settingpoint);
    // [OutSpan]
    jsDat.OutSpan = dec2hex(document.getElementById(A1_AD_SPAN_ID_TERM).value, settingpoint);
    // [Unit]
    jsDat.Unit = chr2sjis(document.getElementById(A1_AD_UNIT_ID_TERM).value, 10);
    // [GraphL]
    jsDat.GraphL = dec2hex(document.getElementById(A1_AD_GRAPHL_ID_TERM).value, settingpoint);
    // [GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(A1_AD_GRAPHH_ID_TERM).value, settingpoint);
    // [AlarmL]
    jsDat.AlarmL = dec2hex(document.getElementById(A1_AD_GRAPH_ALARML_ID_TERM).value, settingpoint);
    // [AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(A1_AD_GRAPH_ALARMH_ID_TERM).value, settingpoint);
    // [AlarmLE]
    jsDat.AlarmLE = ((document.getElementById(A1_AD_GRAPH_ALARMLE_ID_TERM).checked == true) ? 1 : 0);
    // [AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(A1_AD_GRAPH_ALARMHE_ID_TERM).checked == true) ? 1 : 0);
    // [AlarmMinE]
    jsDat.AlarmMinE = ((document.getElementById(A1_AD_GRAPH_ALARMMINE_ID_TERM).checked == true) ? 1 : 0);
    // [AlarmMaxE]
    jsDat.AlarmMaxE = ((document.getElementById(A1_AD_GRAPH_ALARMMAXE_ID_TERM).checked == true) ? 1 : 0);
    // [ClAlarmL]
    jsDat.ClAlarmL = dec2hex(document.getElementById(A1_AD_GRAPH_CLALARML_ID_TERM).value, settingpoint);
    // [ClAlarmH]
    jsDat.ClAlarmH = dec2hex(document.getElementById(A1_AD_GRAPH_CLALARMH_ID_TERM).value, settingpoint);
    // [HistogramE]
    jsDat.HistogramE = ((document.getElementById(A1_AD_HISTOGRAME_ID_TERM).checked == true) ? 1 : 0);
    // [AlarmDelayE]
    jsDat.AlarmDelayE = ((document.getElementById(A1_AD_ALARMDELAYE_ID_TERM).checked == true) ? 1 : 0);
    // [AlarmDelayTime]
    jsDat.AlarmDelayTime = document.getElementById(A1_AD_ALARMDELAYVAL_ID_TERM).value;

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);

}

/**
 * HLR-C1, HLR-C2の設定値を表示する
 * 
 */
function hlra1_loaddata_setting(obj) {
    //要求が成功する場合
    if (obj.Status == 200) {
        var settingpoint = 4;

        //タイトル
        term = "#" + A1_AD_GRAPH_TITLE_ID_TERM;
        $(term).val(jis2chr(obj.Respons.an1_analog.Title));
        //入力タイプ
        term = A1_AD_INPUT_RANGE_ID_TERM;
        var inputidx = parseInt(obj.Respons.an1_analog.Range, 16);
        for (i = 0; i < HLRA1INPUT.length; i++) {
            if (inputidx == HLRA1INPUT[i].value) {
                document.getElementById(term).options.selectedIndex = i;
                $("#" + term).prop('disabled', true);
                break;
            }
        }

        //少数以下桁数
        term = A1_AD_DEC_ID_TERM;
        dec_p = parseInt(obj.Respons.an1_analog.Point, 16);
        document.getElementById(term).options.selectedIndex = dec_p;
        //ゼロ
        term = "#" + A1_AD_ZERO_ID_TERM;
        $(term).val(obj.Respons.an1_analog.Out[0].toFixed(settingpoint));
        $(term).prop('disabled', true); // ゼロ値を無効
        //スパン
        term = "#" + A1_AD_SPAN_ID_TERM;
        $(term).val(obj.Respons.an1_analog.Out[1].toFixed(settingpoint));
        $(term).prop('disabled', true); // スパン値を無効
        //単位
        term = "#" + A1_AD_UNIT_ID_TERM;
        $(term).val(jis2chr(obj.Respons.an1_analog.Unit));
        //グラフ下限
        term = "#" + A1_AD_GRAPHL_ID_TERM;
        $(term).val(obj.Respons.an1_analog.Graph[0].toFixed(settingpoint));
        //グラフ上限
        term = "#" + A1_AD_GRAPHH_ID_TERM;
        $(term).val(obj.Respons.an1_analog.Graph[1].toFixed(settingpoint));
        //警報出力下限値解除
        term = "#" + A1_AD_GRAPH_CLALARML_ID_TERM;
        $(term).val(obj.Respons.an1_analog.ClAlarm[0].toFixed(settingpoint));
        //警報出力上限値解除
        term = "#" + A1_AD_GRAPH_CLALARMH_ID_TERM;
        $(term).val(obj.Respons.an1_analog.ClAlarm[1].toFixed(settingpoint));
        //下限警報発生値
        term = "#" + A1_AD_GRAPH_ALARML_ID_TERM;
        $(term).val(obj.Respons.an1_analog.Alarm[0].toFixed(settingpoint));
        //上限警報発生値
        term = "#" + A1_AD_GRAPH_ALARMH_ID_TERM;
        $(term).val(obj.Respons.an1_analog.Alarm[1].toFixed(settingpoint));
        //警報下限警報出力
        term = A1_AD_GRAPH_ALARMLE_ID_TERM;
        document.getElementById(term).checked = (obj.Respons.an1_analog.AlarmE[0]);
        //上限警報出力
        term = A1_AD_GRAPH_ALARMHE_ID_TERM;
        document.getElementById(term).checked = (obj.Respons.an1_analog.AlarmE[1]);
        // 警報出力-最小値
        term = A1_AD_GRAPH_ALARMMINE_ID_TERM;
        document.getElementById(term).checked = (obj.Respons.an1_analog.AlarmMinMaxE[0]);
        // 警報出力-最大値
        term = A1_AD_GRAPH_ALARMMAXE_ID_TERM;
        document.getElementById(term).checked = (obj.Respons.an1_analog.AlarmMinMaxE[1]);
        //最大、最小、平均表示
        term = A1_AD_HISTOGRAME_ID_TERM;
        document.getElementById(term).checked = (obj.Respons.an1_analog.HistogramE);
        // 警報発生遅延
        term = A1_AD_ALARMDELAYE_ID_TERM;
        document.getElementById(term).checked = (obj.Respons.an1_analog.AlarmDelayE);
        // 警報発生遅延
        term = "#" + A1_AD_ALARMDELAYVAL_ID_TERM;
        $(term).val(obj.Respons.an1_analog.AlarmDelayTime);

        //電波強度タイトル
        $('#a1_title_dbm').val(jis2chr(obj.Respons.RSSI_Title));

    } else {
        //Debug
    }
}

/*  機能    ：HLR-A1アナログ設定の入力値をチェックして、警報を出す
    引数    ：ADの設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_hlra1_ad_input() {
    var id_term = "";
    var term, termL;
    var termClH;
    var termClL;

    //タイトル
    id_term = A1_AD_GRAPH_TITLE_ID_TERM;
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
    if (string_len_check(document.getElementById(id_term).value, 20, ("AD1のタイトルは"), true) == false) return false;
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
    id_term = A1_AD_UNIT_ID_TERM;
    if (string_len_check(document.getElementById(id_term).value, 15, ("AD1の単位は"), false) == false) return false;

    // 小数点位置
    ID_temp = A1_AD_DEC_ID_TERM;

    //スパン値
    ID_temp = A1_AD_SPAN_ID_TERM;
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
    ID_temp = A1_AD_ZERO_ID_TERM;
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
    ID_temp = A1_AD_GRAPHH_ID_TERM;
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
    ID_temp = A1_AD_GRAPHL_ID_TERM;
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
    ID_temp = A1_AD_GRAPH_ALARMH_ID_TERM;
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
    ID_temp = A1_AD_GRAPH_CLALARMH_ID_TERM;
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
    ID_temp = A1_AD_GRAPH_ALARML_ID_TERM;
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
    ID_temp = A1_AD_GRAPH_CLALARML_ID_TERM;
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
    ID_temp = A1_AD_ALARMDELAYVAL_ID_TERM;
    var dDelayAlm = document.getElementById(ID_temp).value;
    if ((dDelayAlm < 1) || (dDelayAlm > 1800) ) {
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


/**
 * HLR-A1 instance setting display
 */
function displayhlra1setting(setdata) {
    if (setdata.setting !== null) {
        var term;
        var term2;

        //瞬時値タイトル
        $("#idhlra1titlead").html(setdata.setting.adset.Title);

        //グラフの単位
        term = "#idhlra1grpunitad1";
        term2 = " [" + setdata.setting.adset.Unit + "]";
        $(term).html(term2);

        //グラフのタイトル
        term = "#idhlra1grptitlead1";
        term2 = setdata.setting.adset.Title;
        $(term).html(term2);

        // /最大、最小、平均のグラフのタイトル
        term = "#idhlra1_title_histogramad1";
        term2 = setdata.setting.adset.Title + "(最大値、最小値、平均値)";
        $(term).html(term2);

        //グラフの単位
        term = "#idhlra1_grpunit_histogramad1";
        term2 = " [" + setdata.setting.adset.Unit + "]";
        $(term).html(term2);

        //dBmのタイトル
        $('#idhlra1titledbm').html(jis2chr(setdata.setting.rssi.Title));
        $('#idhlra1grptitledbm').html(jis2chr(setdata.setting.rssi.Title));

        // 上限警報発生値
        term = "#idhlra1grphalrmad1";
        term2 = "上限警報発生値 " + setdata.setting.adset.Alarm[1].toFixed(setdata.setting.adset.Point) + " [" + setdata.setting.adset.Unit + "]";
        $(term).html(term2);

        // 警報上限有無
        term = "#idhlra1grphealrmad1";
        if (setdata.setting.adset.AlarmE[1] == 0) {
            $(term).css({ "display": "none" });
        }
        else {
            $(term).css({ "display": "block" });
        }

        // 下限警報発生値
        term = "#idhlra1grplalrmad1";
        term2 = "下限警報発生値 " + setdata.setting.adset.Alarm[0].toFixed(setdata.setting.adset.Point) + " [" + setdata.setting.adset.Unit + "]";
        $(term).html(term2);

        // 警報下限有無
        term = "#idhlra1grplealrmad1";
        if (setdata.setting.adset.AlarmE[0] == 0) {
            $(term).css({ "display": "none" });
        }
        else {
            $(term).css({ "display": "block" });
        }

    }
}


