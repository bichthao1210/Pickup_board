/*version=1.09*/
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

// グローバルの変数を定義する
const A8_AD_GRAPH_TITLE_ID_TERM = "a8_title_ad";
const A8_AD_INPUT_RANGE_ID_TERM = "a8_input_range_ad";
const A8_AD_DEC_ID_TERM = "a8_decimal_ad";
const A8_AD_ZERO_ID_TERM = "a8_zero_ad";
const A8_AD_SPAN_ID_TERM = "a8_span_ad";
const A8_AD_UNIT_ID_TERM = "a8_unit_ad";
const A8_AD_GRAPHL_ID_TERM = "a8_graphL_ad";
const A8_AD_GRAPHH_ID_TERM = "a8_graphH_ad";
const A8_AD_GRAPH_ALARML_ID_TERM = "a8_alarmL_ad";
const A8_AD_GRAPH_ALARMH_ID_TERM = "a8_alarmH_ad";
const A8_AD_GRAPH_ALARMLE_ID_TERM = "a8_alarmLE_ad";
const A8_AD_GRAPH_ALARMHE_ID_TERM = "a8_alarmHE_ad";
const A8_AD_GRAPH_ALARMMINE_ID_TERM = "a8_alarmMinE_ad";
const A8_AD_GRAPH_ALARMMAXE_ID_TERM = "a8_alarmMaxE_ad";
const A8_AD_GRAPH_CLALARML_ID_TERM = "a8_ClAlarmL_ad";
const A8_AD_GRAPH_CLALARMH_ID_TERM = "a8_ClAlarmH_ad";
const A8_AD_HISTOGRAME_ID_TERM = "a8_MaxMinMed_ad";
const A8_AD_ALARMDELAYE_ID_TERM = "a8_DelayAlarmE_ad";
const A8_AD_ALARMDELAYVAL_ID_TERM = "a8_DelayAlarmVal_ad";

// TemplateのID
const HLRA8_ADVAL = "#hlra8valad";
const HLRA8_ADTITLE = "#hlra8-title-ad";
const HLRA8_GRPADUNIT = "#idhlra8grpunitad";
const HLRA8_GRPADTITLE = "#idhlra8grptitlead";
const HLRA8_GRPADHALRM = "#idhlra8grphalrmad";
const HLRA8_GRPADLALRM = "#idhlra8grplalrmad";
const HLRA8_GRPADHEALRM = "#idhlra8grphealrmad";
const HLRA8_GRPADLEALRM = "#idhlra8grplealrmad";
const HLRA8_HISTOGRAM_ADUNIT = "#idhlra8_grpunit_histogramad";
const HLRA8_HISTOGRAM_ADTITLE = "#idhlra8_title_histogramad";
const HLRA8_ALARM_CONTENT = "#alertH_hlra8";

//グラフ描画済み
//AD
var hlra8_chart_ad1;
var hlra8_chart_ad2;
var hlra8_chart_ad3;
var hlra8_chart_ad4;
var hlra8_chart_ad5;
var hlra8_chart_ad6;
var hlra8_chart_ad7;
var hlra8_chart_ad8;
//電波強度
var hlra8_chart_dBm;

//AD Max-Min-Avg
var hlra8_chart_histogram_ad1;
var hlra8_chart_histogram_ad2;
var hlra8_chart_histogram_ad3;
var hlra8_chart_histogram_ad4;
var hlra8_chart_histogram_ad5;
var hlra8_chart_histogram_ad6;
var hlra8_chart_histogram_ad7;
var hlra8_chart_histogram_ad8;

//ADグラフ用のデータ配列
var hlra8_graph_data_ad1 = [];
var hlra8_graph_data_ad2 = [];
var hlra8_graph_data_ad3 = [];
var hlra8_graph_data_ad4 = [];
var hlra8_graph_data_ad5 = [];
var hlra8_graph_data_ad6 = [];
var hlra8_graph_data_ad7 = [];
var hlra8_graph_data_ad8 = [];

//電波強度グラフ用のデータ配列
var hlra8_graph_data_dBm = [];

//AD最大、最小、平均のグラフ用のデータ配列
// AD1~AD4の最大値
var hlra8_histogram_maxdata_ad1 = [];
var hlra8_histogram_maxdata_ad2 = [];
var hlra8_histogram_maxdata_ad3 = [];
var hlra8_histogram_maxdata_ad4 = [];
var hlra8_histogram_maxdata_ad5 = [];
var hlra8_histogram_maxdata_ad6 = [];
var hlra8_histogram_maxdata_ad7 = [];
var hlra8_histogram_maxdata_ad8 = [];
// AD1~AD4の最小値
var hlra8_histogram_mindata_ad1 = [];
var hlra8_histogram_mindata_ad2 = [];
var hlra8_histogram_mindata_ad3 = [];
var hlra8_histogram_mindata_ad4 = [];
var hlra8_histogram_mindata_ad5 = [];
var hlra8_histogram_mindata_ad6 = [];
var hlra8_histogram_mindata_ad7 = [];
var hlra8_histogram_mindata_ad8 = [];
// AD1~AD4の平均値
var hlra8_histogram_meddata_ad1 = [];
var hlra8_histogram_meddata_ad2 = [];
var hlra8_histogram_meddata_ad3 = [];
var hlra8_histogram_meddata_ad4 = [];
var hlra8_histogram_meddata_ad5 = [];
var hlra8_histogram_meddata_ad6 = [];
var hlra8_histogram_meddata_ad7 = [];
var hlra8_histogram_meddata_ad8 = [];

//グラフ用のデータ数
var hlra8_graph_dat_num = 0;
//グラフ用の時間配列
var hlra8_graph_time = [];
var hlra8_graph_date;

var hlra8_graph_exist = false;
var hlra8_graph_ad1_exist = false;
var hlra8_graph_ad2_exist = false;
var hlra8_graph_ad3_exist = false;
var hlra8_graph_ad4_exist = false;
var hlra8_graph_ad5_exist = false;
var hlra8_graph_ad6_exist = false;
var hlra8_graph_ad7_exist = false;
var hlra8_graph_ad8_exist = false;

var hlra8_histogram_exist = false;
var hlra8_histogram_ad1_exist = false;
var hlra8_histogram_ad2_exist = false;
var hlra8_histogram_ad3_exist = false;
var hlra8_histogram_ad4_exist = false;
var hlra8_histogram_ad5_exist = false;
var hlra8_histogram_ad6_exist = false;
var hlra8_histogram_ad7_exist = false;
var hlra8_histogram_ad8_exist = false;

const HLRA8INPUT = [
    { value: 0 },
    { value: 5 },
    { value: 8 }
]

/*  
    機能：  ＨＬＲ－Ａ８の設定値を表示する
            
*/
function hlra8_dispdata_setting(obj, type) {
    if (obj.Status == 200) {
        //ADx8
        fncAsignSetting(obj.Respons.an1_analog, "1");
        fncAsignSetting(obj.Respons.an2_analog, "2");
        fncAsignSetting(obj.Respons.an3_analog, "3");
        fncAsignSetting(obj.Respons.an4_analog, "4");
        fncAsignSetting(obj.Respons.an5_analog, "5");
        fncAsignSetting(obj.Respons.an6_analog, "6");
        fncAsignSetting(obj.Respons.an7_analog, "7");
        fncAsignSetting(obj.Respons.an8_analog, "8");

        // dBmタイトル
        if (type == UnitCode.HLR_A8) {
            $("#a8_title_dbm").val(jis2chr(obj.Respons.RSSI_Title));
        }

    } else {
        //Debug
        console.log(obj);
    }
}

/*  
    機能：  設定値を割り当てる
            
*/
function fncAsignSetting(input, index) {
    var j = index;
    var settingpoint = 4;
    var term, dec_p;
    //タイトル
    term = "#" + A8_AD_GRAPH_TITLE_ID_TERM + j;
    $(term).val(jis2chr(input.Title));

    //入力タイプ
    term = A8_AD_INPUT_RANGE_ID_TERM + j;
    dec_p = parseInt(input.Range, 16);
    for (i = 0; i < HLRA8INPUT.length; i++) {
        if (dec_p == HLRA8INPUT[i].value) {
            document.getElementById(term).options.selectedIndex = i;
            $("#" + term).prop('disabled', true);
            break;
        }
    }

    //少数以下桁数
    term = A8_AD_DEC_ID_TERM + j;
    dec_p = parseInt(input.Point, 16);
    document.getElementById(term).options.selectedIndex = dec_p;
    //ゼロ
    term = "#" + A8_AD_ZERO_ID_TERM + j;
    $(term).val(input.Out[0].toFixed(settingpoint));
    $(term).prop('disabled', true); // ゼロ値を無効
    //スパン
    term = "#" + A8_AD_SPAN_ID_TERM + j;
    $(term).val(input.Out[1].toFixed(settingpoint));
    $(term).prop('disabled', true); // スパン値を無効
    //単位
    term = "#" + A8_AD_UNIT_ID_TERM + j;
    $(term).val(jis2chr(input.Unit));
    //グラフ：上限と下限
    //下限
    term = "#" + A8_AD_GRAPHL_ID_TERM + j;
    $(term).val(input.Graph[0].toFixed(settingpoint));
    //上限
    term = "#" + A8_AD_GRAPHH_ID_TERM + j;
    $(term).val(input.Graph[1].toFixed(settingpoint));
    //警報出力上限値解除
    term = "#" + A8_AD_GRAPH_CLALARML_ID_TERM + j;
    $(term).val(input.ClAlarm[0].toFixed(settingpoint));
    //警報出力下限値解除
    term = "#" + A8_AD_GRAPH_CLALARMH_ID_TERM + j;
    $(term).val(input.ClAlarm[1].toFixed(settingpoint));
    //警報下限限警報発生値
    term = "#" + A8_AD_GRAPH_ALARML_ID_TERM + j;
    $(term).val(input.Alarm[0].toFixed(settingpoint));
    //上限警報発生値
    term = "#" + A8_AD_GRAPH_ALARMH_ID_TERM + j;
    $(term).val(input.Alarm[1].toFixed(settingpoint));
    //警報下限警報出力
    term = A8_AD_GRAPH_ALARMLE_ID_TERM + j;
    document.getElementById(term).checked = (input.AlarmE[0]);
    //上限警報出力
    term = A8_AD_GRAPH_ALARMHE_ID_TERM + j;
    document.getElementById(term).checked = (input.AlarmE[1]);
    // 最小の警報出力
    term = A8_AD_GRAPH_ALARMMINE_ID_TERM + j;
    document.getElementById(term).checked = (input.AlarmMinMaxE[0]);
    // 最大の警報出力
    term = A8_AD_GRAPH_ALARMMAXE_ID_TERM + j;
    document.getElementById(term).checked = (input.AlarmMinMaxE[1]);
    //最大、最小、平均表示
    term = A8_AD_HISTOGRAME_ID_TERM + j;
    document.getElementById(term).checked = (input.HistogramE);
    // 警報発生遅延
    term = A8_AD_ALARMDELAYE_ID_TERM + j;
    document.getElementById(term).checked = (input.AlarmDelayE);
    // 警報発生遅延
    term = "#" + A8_AD_ALARMDELAYVAL_ID_TERM + j;
    $(term).val(input.AlarmDelayTime);
}

/**
 * HLR-A8の設定値をクリアする
 */
function fncHlra8SettingClear() {
    for (var i = 1; i < 9; i++) {
        document.getElementById("a8_title_ad" + i).value = "";
        document.getElementById(A8_AD_INPUT_RANGE_ID_TERM + i).selectedIndex = 0;
        document.getElementById("a8_decimal_ad" + i).selectedIndex = 0;
        document.getElementById("a8_zero_ad" + i).value = "";
        document.getElementById("a8_span_ad" + i).value = "";
        document.getElementById("a8_unit_ad" + i).value = "";
        document.getElementById("a8_graphL_ad" + i).value = "";
        document.getElementById("a8_graphH_ad" + i).value = "";
        document.getElementById("a8_alarmL_ad" + i).value = "";
        document.getElementById("a8_alarmH_ad" + i).value = "";
    }
}


/**
 * HR-A4C4の設定画面では設定値を表示
 * 設定値：接続機種設定、名称、RS-485アドレス
 */
function fncdispHra8() {
    // 設定項目のラベルを更新する
    document.getElementById("a4c4address").innerHTML = "RS-485 Address";
    document.getElementById("a4c4type").innerHTML = "機種";
    document.getElementById("a4c4name").innerHTML = "名称";

    // RS-485アドレスを０ｘ０１～０ｘFFに追加する
    var x = document.getElementById('idunitaddress');
    while (x.options.length) x.remove(0);
    addLoraAdrOption("idunitaddress", 1, 255);

    // 接続機種設定、名称、RS-485アドレスを格納する
    document.getElementById("a4c4title").innerHTML = "HR-A8設定";
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
 * HLR-A8設定ボタンをクリックの処理
 * 入力値をチェックしてから、サーバーに保存する
 */
function fncSaveSetting_ADA8(e) {
    if (check_a8_input(e) == true) {
        if (document.getElementById("a4c4title").innerHTML == "HLR-A8設定") {
            var unitNo = ("000"
                + setTreeViewJson.Respons
                    .GroupList[gcurgrp]
                    .LoRaUnitList[gcurunit]
                    .UnitNo
                    .toString(16).toUpperCase()).substr(-4);
            set_a8_setting(e, unitNo);
        } else if (document.getElementById("a4c4title").innerHTML == "HR-A8設定") {
            var unitNo = ("000"
                + setTreeViewJson.Respons
                    .GroupList[gcurgrp]
                    .LoRaUnitList[gcurunit]
                    .ModbusUnitList[gcurrs]
                    .UnitNo
                    .toString(16).toUpperCase()).substr(-4);
            set_a8_setting(e, unitNo);
        }
    };
}

/*  機能：  AD設定の要求電文を作成、ダイアログを表示
    引数：
            event_obj：ADの設定ボタンのイベントオブジェクト
            unitNo: 現在のユニットの順番
*/
function set_a8_setting(event_obj, unitNo) {
    //ボタンのIDを取る
    var id = event_obj.target.id;
    var ad_ch = parseInt(id.split("_")[0]);
    var item = id.split("_")[1] + "_" + id.split("_")[2];

    //設定している小数点
    var settingpoint = 4;
    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Item]
    jsDat.Item = item;
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(A8_AD_GRAPH_TITLE_ID_TERM + ad_ch).value, 20);
    //[Range]
    var element = document.getElementById(A8_AD_INPUT_RANGE_ID_TERM + ad_ch).value;
    var strType = element.toString(16).toUpperCase();
    while (strType.length < 4) { //4桁まで埋める
        strType = "0" + strType;
    }
    jsDat.Range = strType;
    //[Point]
    var strdecNum = document.getElementById(A8_AD_DEC_ID_TERM + ad_ch).selectedIndex.toString(16).toUpperCase();
    while (strdecNum.length < 4) { //4桁まで埋める
        strdecNum = "0" + strdecNum;
    }
    jsDat.Point = strdecNum;
    //[OutZero]
    jsDat.OutZero = dec2hex(document.getElementById(A8_AD_ZERO_ID_TERM + ad_ch).value, settingpoint);
    //[OutSpan]
    jsDat.OutSpan = dec2hex(document.getElementById(A8_AD_SPAN_ID_TERM + ad_ch).value, settingpoint);
    //[Unit]
    jsDat.Unit = chr2sjis(document.getElementById(A8_AD_UNIT_ID_TERM + ad_ch).value, 10);
    //[GraphL]
    jsDat.GraphL = dec2hex(document.getElementById(A8_AD_GRAPHL_ID_TERM + ad_ch).value, settingpoint);
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(A8_AD_GRAPHH_ID_TERM + ad_ch).value, settingpoint);
    //[AlarmL]
    jsDat.AlarmL = dec2hex(document.getElementById(A8_AD_GRAPH_ALARML_ID_TERM + ad_ch).value, settingpoint);
    //[AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(A8_AD_GRAPH_ALARMH_ID_TERM + ad_ch).value, settingpoint);
    //[AlarmLE]
    jsDat.AlarmLE = ((document.getElementById(A8_AD_GRAPH_ALARMLE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(A8_AD_GRAPH_ALARMHE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[AlarmMinE]
    jsDat.AlarmMinE = ((document.getElementById(A8_AD_GRAPH_ALARMMINE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[AlarmMaxE]
    jsDat.AlarmMaxE = ((document.getElementById(A8_AD_GRAPH_ALARMMAXE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    //[ClAlarmL]
    jsDat.ClAlarmL = dec2hex(document.getElementById(A8_AD_GRAPH_CLALARML_ID_TERM + ad_ch).value, settingpoint);
    //[ClAlarmH]
    jsDat.ClAlarmH = dec2hex(document.getElementById(A8_AD_GRAPH_CLALARMH_ID_TERM + ad_ch).value, settingpoint);
    //[HistogramE]
    jsDat.HistogramE = ((document.getElementById(A8_AD_HISTOGRAME_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    // [AlarmDelayE]
    jsDat.AlarmDelayE = ((document.getElementById(A8_AD_ALARMDELAYE_ID_TERM + ad_ch).checked == true) ? 1 : 0);
    // [AlarmDelayTime]
    jsDat.AlarmDelayTime = document.getElementById(A8_AD_ALARMDELAYVAL_ID_TERM + ad_ch).value;

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}


/*  機能    ：HLR-A8アナログ設定の入力値をチェックして、警報を出す
    引数    ：ADの設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_a8_input(obj) {
    var id = obj.target.id;
    var num = parseInt(id.split("_")[0]);

    var id_term = "";
    var term, termL;
    var termClH;
    var termClL;

    //タイトル
    id_term = A8_AD_GRAPH_TITLE_ID_TERM + num;
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
    id_term = A8_AD_UNIT_ID_TERM + num;
    if (string_len_check(document.getElementById(id_term).value, 15, ("AD" + num.toString() + "の単位は"), false) == false) return false;

    //スパン値
    id_term = A8_AD_SPAN_ID_TERM + num;
    // console.log(id_term)
    var strSpan = document.getElementById(id_term).value;
    if ((isNaN(strSpan) == true) || (strSpan.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "スパン値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        term = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_ZERO_ID_TERM + num;
    // console.log(id_term);
    var strZero = document.getElementById(id_term).value;
    if ((isNaN(strZero) == true) || (strZero.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "ゼロ値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        termL = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_GRAPHH_ID_TERM + num;
    // console.log(id_term);
    var strGH = document.getElementById(id_term).value;
    if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "グラフ上限値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        term = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_GRAPHL_ID_TERM + num;
    // console.log(id_term);
    var strGL = document.getElementById(id_term).value;
    if ((isNaN(strGL) == true) || (strGL.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "グラフ下限値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        termL = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_GRAPH_ALARMH_ID_TERM + num;
    // console.log(id_term);
    var strAH = document.getElementById(id_term).value;
    if ((isNaN(strAH) == true) || (strAH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "上限警報発生値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        term = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_GRAPH_CLALARMH_ID_TERM + num;
    // console.log(id_term);
    var strClAH = document.getElementById(id_term).value;
    if ((isNaN(strClAH) == true) || (strClAH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "上限警報解除値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        termClH = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_GRAPH_ALARML_ID_TERM + num;
    // console.log(id_term);
    var strAL = document.getElementById(id_term).value;
    if ((isNaN(strAL) == true) || (strAL.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "下限警報発生値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        termL = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_GRAPH_CLALARML_ID_TERM + num;
    // console.log(id_term);
    var strClAL = document.getElementById(id_term).value;
    if ((isNaN(strClAL) == true) || (strClAL.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "下限警報解除値は数値のみです。",
            icon: "warning",
            button: "はい",
        });
        return false;
    } else {
        termClL = parseFloat(document.getElementById(id_term).value);
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
    id_term = A8_AD_ALARMDELAYVAL_ID_TERM + num;
    var dDelayAlm = document.getElementById(id_term).value;
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
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlra8setting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataHlra8(hlra8setting, tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {

        $('#' + tvid + "hlra8valad1").text("--");
        $('#' + tvid + "hlra8valad2").text("--");
        $('#' + tvid + "hlra8valad3").text("--");
        $('#' + tvid + "hlra8valad4").text("--");
        $('#' + tvid + "hlra8valad5").text("--");
        $('#' + tvid + "hlra8valad6").text("--");
        $('#' + tvid + "hlra8valad7").text("--");
        $('#' + tvid + "hlra8valad8").text("--");
        $('#' + tvid + "hlra8valdbm").text("--");
        $('#' + tvid + "a8updated_time").text('データ更新：----/--/-- --:--');

    }
    else {
        // 時刻を更新
        $('#' + tvid + "a8updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        // 電波強度の表示を更新
        if (hlra8setting.type == UnitCode.HLR_A8) {
            $('#' + tvid + "hlra8valdbm").text(realtimeObj.RSSI + " [dBm]");
        }
        else {
            $('#' + tvid + "hlra8valdbm").text("");
        }
        // 瞬時値を更新
        var hlra8_value = [realtimeObj.Data.an1_analog.Value,
        realtimeObj.Data.an2_analog.Value,
        realtimeObj.Data.an3_analog.Value,
        realtimeObj.Data.an4_analog.Value,
        realtimeObj.Data.an5_analog.Value,
        realtimeObj.Data.an6_analog.Value,
        realtimeObj.Data.an7_analog.Value,
        realtimeObj.Data.an8_analog.Value];

        for (var m = 1; m < 9; m++) {
            if (hlra8setting.setting.adset[m - 1].Range != 0) {
                if ((isNaN(hlra8_value[m - 1]) == true) || (hlra8_value[m - 1] === '') || (hlra8_value[m - 1] == null)) {
                    $('#' + tvid + "hlra8valad" + m).text("");
                }
                else {
                    $('#' + tvid + "hlra8valad" + m).text(parseFloat(hlra8_value[m - 1]).toFixed(hlra8setting.setting.adset[m - 1].Point) + " [" + hlra8setting.setting.adset[m - 1].Unit + "]");
                }
            }
            else {
                $('#' + tvid + "hlra8valad" + m).text("");
            }
        }

    }

}

/**
* HLR-A8タイトルと瞬時値の更新
*/
function fncHlra8DspData(tvid, UnitNo, isUnitChg, hlra8setting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
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

        var rssi = {
            'Title': "",
            'Unit': chr2sjis("dBm"),
            'Graph': [-140, 0],
            'Point': 0
        };

        hlra8setting.setting = { "adset": hlrad_set_tmp, "rssi": rssi };
        // 瞬時値を取得
        // AD1
        hlra8setting.setting.adset[0].Title = jis2chr(settingObj.an1_analog.Title);
        hlra8setting.setting.adset[0].Range = settingObj.an1_analog.Range;
        hlra8setting.setting.adset[0].Point = settingObj.an1_analog.Point;
        hlra8setting.setting.adset[0].Out[0] = settingObj.an1_analog.Out[0];
        hlra8setting.setting.adset[0].Out[1] = settingObj.an1_analog.Out[1];
        hlra8setting.setting.adset[0].Unit = jis2chr(settingObj.an1_analog.Unit);
        hlra8setting.setting.adset[0].Graph[0] = settingObj.an1_analog.Graph[0];
        hlra8setting.setting.adset[0].Graph[1] = settingObj.an1_analog.Graph[1];
        hlra8setting.setting.adset[0].Alarm[0] = settingObj.an1_analog.Alarm[0];
        hlra8setting.setting.adset[0].Alarm[1] = settingObj.an1_analog.Alarm[1];
        hlra8setting.setting.adset[0].AlarmE[0] = settingObj.an1_analog.AlarmE[0];
        hlra8setting.setting.adset[0].AlarmE[1] = settingObj.an1_analog.AlarmE[1];
        hlra8setting.setting.adset[0].AlarmMinMaxE[0] = settingObj.an1_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[0].AlarmMinMaxE[1] = settingObj.an1_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[0].HistogramE = settingObj.an1_analog.HistogramE;

        // AD2
        hlra8setting.setting.adset[1].Title = jis2chr(settingObj.an2_analog.Title);
        hlra8setting.setting.adset[1].Range = settingObj.an2_analog.Range;
        hlra8setting.setting.adset[1].Point = settingObj.an2_analog.Point;
        hlra8setting.setting.adset[1].Out[0] = settingObj.an2_analog.Out[0];
        hlra8setting.setting.adset[1].Out[1] = settingObj.an2_analog.Out[1];
        hlra8setting.setting.adset[1].Unit = jis2chr(settingObj.an2_analog.Unit);
        hlra8setting.setting.adset[1].Graph[0] = settingObj.an2_analog.Graph[0];
        hlra8setting.setting.adset[1].Graph[1] = settingObj.an2_analog.Graph[1];
        hlra8setting.setting.adset[1].Alarm[0] = settingObj.an2_analog.Alarm[0];
        hlra8setting.setting.adset[1].Alarm[1] = settingObj.an2_analog.Alarm[1];
        hlra8setting.setting.adset[1].AlarmE[0] = settingObj.an2_analog.AlarmE[0];
        hlra8setting.setting.adset[1].AlarmE[1] = settingObj.an2_analog.AlarmE[1];
        hlra8setting.setting.adset[1].AlarmMinMaxE[0] = settingObj.an2_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[1].AlarmMinMaxE[1] = settingObj.an2_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[1].HistogramE = settingObj.an2_analog.HistogramE;

        // AD3
        hlra8setting.setting.adset[2].Title = jis2chr(settingObj.an3_analog.Title);
        hlra8setting.setting.adset[2].Range = settingObj.an3_analog.Range;
        hlra8setting.setting.adset[2].Point = settingObj.an3_analog.Point;
        hlra8setting.setting.adset[2].Out[0] = settingObj.an3_analog.Out[0];
        hlra8setting.setting.adset[2].Out[1] = settingObj.an3_analog.Out[1];
        hlra8setting.setting.adset[2].Unit = jis2chr(settingObj.an3_analog.Unit);
        hlra8setting.setting.adset[2].Graph[0] = settingObj.an3_analog.Graph[0];
        hlra8setting.setting.adset[2].Graph[1] = settingObj.an3_analog.Graph[1];
        hlra8setting.setting.adset[2].Alarm[0] = settingObj.an3_analog.Alarm[0];
        hlra8setting.setting.adset[2].Alarm[1] = settingObj.an3_analog.Alarm[1];
        hlra8setting.setting.adset[2].AlarmE[0] = settingObj.an3_analog.AlarmE[0];
        hlra8setting.setting.adset[2].AlarmE[1] = settingObj.an3_analog.AlarmE[1];
        hlra8setting.setting.adset[2].AlarmMinMaxE[0] = settingObj.an3_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[2].AlarmMinMaxE[1] = settingObj.an3_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[2].HistogramE = settingObj.an3_analog.HistogramE;

        // AD4
        hlra8setting.setting.adset[3].Title = jis2chr(settingObj.an4_analog.Title);
        hlra8setting.setting.adset[3].Range = settingObj.an4_analog.Range;
        hlra8setting.setting.adset[3].Point = settingObj.an4_analog.Point;
        hlra8setting.setting.adset[3].Out[0] = settingObj.an4_analog.Out[0];
        hlra8setting.setting.adset[3].Out[1] = settingObj.an4_analog.Out[1];
        hlra8setting.setting.adset[3].Unit = jis2chr(settingObj.an4_analog.Unit);
        hlra8setting.setting.adset[3].Graph[0] = settingObj.an4_analog.Graph[0];
        hlra8setting.setting.adset[3].Graph[1] = settingObj.an4_analog.Graph[1];
        hlra8setting.setting.adset[3].Alarm[0] = settingObj.an4_analog.Alarm[0];
        hlra8setting.setting.adset[3].Alarm[1] = settingObj.an4_analog.Alarm[1];
        hlra8setting.setting.adset[3].AlarmE[0] = settingObj.an4_analog.AlarmE[0];
        hlra8setting.setting.adset[3].AlarmE[1] = settingObj.an4_analog.AlarmE[1];
        hlra8setting.setting.adset[3].AlarmMinMaxE[0] = settingObj.an4_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[3].AlarmMinMaxE[1] = settingObj.an4_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[3].HistogramE = settingObj.an4_analog.HistogramE;

        // AD5
        hlra8setting.setting.adset[4].Title = jis2chr(settingObj.an5_analog.Title);
        hlra8setting.setting.adset[4].Range = settingObj.an5_analog.Range;
        hlra8setting.setting.adset[4].Point = settingObj.an5_analog.Point;
        hlra8setting.setting.adset[4].Out[0] = settingObj.an5_analog.Out[0];
        hlra8setting.setting.adset[4].Out[1] = settingObj.an5_analog.Out[1];
        hlra8setting.setting.adset[4].Unit = jis2chr(settingObj.an5_analog.Unit);
        hlra8setting.setting.adset[4].Graph[0] = settingObj.an5_analog.Graph[0];
        hlra8setting.setting.adset[4].Graph[1] = settingObj.an5_analog.Graph[1];
        hlra8setting.setting.adset[4].Alarm[0] = settingObj.an5_analog.Alarm[0];
        hlra8setting.setting.adset[4].Alarm[1] = settingObj.an5_analog.Alarm[1];
        hlra8setting.setting.adset[4].AlarmE[0] = settingObj.an5_analog.AlarmE[0];
        hlra8setting.setting.adset[4].AlarmE[1] = settingObj.an5_analog.AlarmE[1];
        hlra8setting.setting.adset[4].AlarmMinMaxE[0] = settingObj.an5_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[4].AlarmMinMaxE[1] = settingObj.an5_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[4].HistogramE = settingObj.an5_analog.HistogramE;

        // AD6
        hlra8setting.setting.adset[5].Title = jis2chr(settingObj.an6_analog.Title);
        hlra8setting.setting.adset[5].Range = settingObj.an6_analog.Range;
        hlra8setting.setting.adset[5].Point = settingObj.an6_analog.Point;
        hlra8setting.setting.adset[5].Out[0] = settingObj.an6_analog.Out[0];
        hlra8setting.setting.adset[5].Out[1] = settingObj.an6_analog.Out[1];
        hlra8setting.setting.adset[5].Unit = jis2chr(settingObj.an6_analog.Unit);
        hlra8setting.setting.adset[5].Graph[0] = settingObj.an6_analog.Graph[0];
        hlra8setting.setting.adset[5].Graph[1] = settingObj.an6_analog.Graph[1];
        hlra8setting.setting.adset[5].Alarm[0] = settingObj.an6_analog.Alarm[0];
        hlra8setting.setting.adset[5].Alarm[1] = settingObj.an6_analog.Alarm[1];
        hlra8setting.setting.adset[5].AlarmE[0] = settingObj.an6_analog.AlarmE[0];
        hlra8setting.setting.adset[5].AlarmE[1] = settingObj.an6_analog.AlarmE[1];
        hlra8setting.setting.adset[5].AlarmMinMaxE[0] = settingObj.an6_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[5].AlarmMinMaxE[1] = settingObj.an6_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[5].HistogramE = settingObj.an6_analog.HistogramE;

        // AD7
        hlra8setting.setting.adset[6].Title = jis2chr(settingObj.an7_analog.Title);
        hlra8setting.setting.adset[6].Range = settingObj.an7_analog.Range;
        hlra8setting.setting.adset[6].Point = settingObj.an7_analog.Point;
        hlra8setting.setting.adset[6].Out[0] = settingObj.an7_analog.Out[0];
        hlra8setting.setting.adset[6].Out[1] = settingObj.an7_analog.Out[1];
        hlra8setting.setting.adset[6].Unit = jis2chr(settingObj.an7_analog.Unit);
        hlra8setting.setting.adset[6].Graph[0] = settingObj.an7_analog.Graph[0];
        hlra8setting.setting.adset[6].Graph[1] = settingObj.an7_analog.Graph[1];
        hlra8setting.setting.adset[6].Alarm[0] = settingObj.an7_analog.Alarm[0];
        hlra8setting.setting.adset[6].Alarm[1] = settingObj.an7_analog.Alarm[1];
        hlra8setting.setting.adset[6].AlarmE[0] = settingObj.an7_analog.AlarmE[0];
        hlra8setting.setting.adset[6].AlarmE[1] = settingObj.an7_analog.AlarmE[1];
        hlra8setting.setting.adset[6].AlarmMinMaxE[0] = settingObj.an7_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[6].AlarmMinMaxE[1] = settingObj.an7_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[6].HistogramE = settingObj.an7_analog.HistogramE;

        // AD8
        hlra8setting.setting.adset[7].Title = jis2chr(settingObj.an8_analog.Title);
        hlra8setting.setting.adset[7].Range = settingObj.an8_analog.Range;
        hlra8setting.setting.adset[7].Point = settingObj.an8_analog.Point;
        hlra8setting.setting.adset[7].Out[0] = settingObj.an8_analog.Out[0];
        hlra8setting.setting.adset[7].Out[1] = settingObj.an8_analog.Out[1];
        hlra8setting.setting.adset[7].Unit = jis2chr(settingObj.an8_analog.Unit);
        hlra8setting.setting.adset[7].Graph[0] = settingObj.an8_analog.Graph[0];
        hlra8setting.setting.adset[7].Graph[1] = settingObj.an8_analog.Graph[1];
        hlra8setting.setting.adset[7].Alarm[0] = settingObj.an8_analog.Alarm[0];
        hlra8setting.setting.adset[7].Alarm[1] = settingObj.an8_analog.Alarm[1];
        hlra8setting.setting.adset[7].AlarmE[0] = settingObj.an8_analog.AlarmE[0];
        hlra8setting.setting.adset[7].AlarmE[1] = settingObj.an8_analog.AlarmE[1];
        hlra8setting.setting.adset[7].AlarmMinMaxE[0] = settingObj.an8_analog.AlarmMinMaxE[0];
        hlra8setting.setting.adset[7].AlarmMinMaxE[1] = settingObj.an8_analog.AlarmMinMaxE[1];
        hlra8setting.setting.adset[7].HistogramE = settingObj.an8_analog.HistogramE;

        if (hlra8setting.type == UnitCode.HLR_A8) {
            hlra8setting.setting.rssi.Title = (settingObj) ? (settingObj.RSSI_Title) : '';
        }

        //ADのタイトル表示
        $('#' + tvid + "hlra8-title-ad1").text(hlra8setting.setting.adset[0].Title);
        $('#' + tvid + "hlra8-title-ad2").text(hlra8setting.setting.adset[1].Title);
        $('#' + tvid + "hlra8-title-ad3").text(hlra8setting.setting.adset[2].Title);
        $('#' + tvid + "hlra8-title-ad4").text(hlra8setting.setting.adset[3].Title);
        $('#' + tvid + "hlra8-title-ad5").text(hlra8setting.setting.adset[4].Title);
        $('#' + tvid + "hlra8-title-ad6").text(hlra8setting.setting.adset[5].Title);
        $('#' + tvid + "hlra8-title-ad7").text(hlra8setting.setting.adset[6].Title);
        $('#' + tvid + "hlra8-title-ad8").text(hlra8setting.setting.adset[7].Title);
        // rssi
        if (hlra8setting.type == UnitCode.HLR_A8) {
            $('#' + tvid + "hlra8dbm_title").text(jis2chr(hlra8setting.setting.rssi.Title));
        }

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlra8setting.type, settingObj, UnitNo);


        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlra8setting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            // Save Instance Data for Combine Graph
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra8(hlra8setting, tvid, retobj);
        }
        else {
            // Save Instance Data for Combine Graph
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancehlra8(tmpObj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra8(hlra8setting, tvid, realtimeObj);
        }
    }
    else {
        if (hlra8setting.setting !== null) {
            /* Title */
            $('#' + tvid + "hlra8-title-ad1").text(hlra8setting.setting.adset[0].Title);
            $('#' + tvid + "hlra8-title-ad2").text(hlra8setting.setting.adset[1].Title);
            $('#' + tvid + "hlra8-title-ad3").text(hlra8setting.setting.adset[2].Title);
            $('#' + tvid + "hlra8-title-ad4").text(hlra8setting.setting.adset[3].Title);
            $('#' + tvid + "hlra8-title-ad5").text(hlra8setting.setting.adset[4].Title);
            $('#' + tvid + "hlra8-title-ad6").text(hlra8setting.setting.adset[5].Title);
            $('#' + tvid + "hlra8-title-ad7").text(hlra8setting.setting.adset[6].Title);
            $('#' + tvid + "hlra8-title-ad8").text(hlra8setting.setting.adset[7].Title);
            // rssi
            if (hlra8setting.type == UnitCode.HLR_A8) {
                $('#' + tvid + "hlra8dbm_title").text(jis2chr(hlra8setting.setting.rssi.Title));
            }
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (hlra8setting.setting == null)) {
            // Save Instance Data for Combine Graph
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataHlra8(hlra8setting, tvid, retobj);
            return;
        }

        rs485_insread_data(UnitNo, function (obj, hlra8setting) {
            // Save Instance Data for Combine Graph
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlra8(obj, UnitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataHlra8(hlra8setting, tvid, obj.Respons);

        }, hlra8setting);

    }
}


function fncDoSaveInstancehlra8(obj, UnitNo, gwid) {
    var retobj = obj;
    if (obj.Status == 200) {
        if (obj.Respons.Data == null) {
            retobj = null;
        }
        else {
            // rssi
            retobj.Respons.Data["rssi"] = { Value: obj.Respons.RSSI };
            // AD1~8
            for (var i = 0; i < 8; i++) {
                var strprop = "an" + (i + 1).toString() + "_analog";

                // An-Max
                retobj.Respons.Data[strprop + "_max"] = {
                    Value: obj.Respons.Data[strprop].Max,
                    State: obj.Respons.Data[strprop].State
                };
                retobj.Respons.Data[strprop + "_min"] = {
                    Value: obj.Respons.Data[strprop].Min,
                    State: obj.Respons.Data[strprop].State
                };
                retobj.Respons.Data[strprop + "_ave"] = {
                    Value: obj.Respons.Data[strprop].Avg,
                    State: obj.Respons.Data[strprop].State
                };
            }
        }
    }
    fncSaveInstanceforCombiGraph(retobj, UnitNo, gwid);
}

/**
 * hlr instance data display
 */
function displayhlra8data(hlra8insdat, setdata, unitSts) {
    var term;
    var term2;
    var j;
    //正常
    if (hlra8insdat.Status == 200) {
        //データが無い場合
        if (hlra8insdat.Respons.Data == null) {
            $("#hlra8updated_time").html("データ更新：----/--/-- --:--");
            //各AD
            for (var i = 0; i < 8; i++) {
                j = (i + 1).toString();
                term = HLRA8_ADVAL + j;
                $(term).html("--");
            }
            //--------------------電波強度--------------------------
            if (gcrurbranch == 1) {
                $("#hlra8valdbm").html("--");
            }
            else {
                $("#hlra8valdbm").html("");
            }
        }
        //データがある場合
        else {
            //---------------------Data - Show out---------------------
            //時間
            //最新の時間を取得
            term = "データ更新：" + hlra8insdat.Respons.Time[0] + "/" + ("0" + hlra8insdat.Respons.Time[1]).slice(-2) + "/" + ("0" + hlra8insdat.Respons.Time[2]).slice(-2) + " " + ("00" + hlra8insdat.Respons.Time[3]).slice(-2) + ":" + ("0" + hlra8insdat.Respons.Time[4]).slice(-2);
            //時間バーに更新
            $("#hlra8updated_time").html(term);

            //表示
            var hlra8_value = [hlra8insdat.Respons.Data.an1_analog.Value,
            hlra8insdat.Respons.Data.an2_analog.Value,
            hlra8insdat.Respons.Data.an3_analog.Value,
            hlra8insdat.Respons.Data.an4_analog.Value,
            hlra8insdat.Respons.Data.an5_analog.Value,
            hlra8insdat.Respons.Data.an6_analog.Value,
            hlra8insdat.Respons.Data.an7_analog.Value,
            hlra8insdat.Respons.Data.an8_analog.Value];

            for (var i = 0; i < 8; i++) {
                j = (i + 1).toString();
                term = HLRA8_ADVAL + j;
                if (setdata.setting.adset[i].Range != 0) {
                    if ((isNaN(hlra8_value[i]) == true) || (hlra8_value[i] === '') || (hlra8_value[i] == null)) {
                        term2 = '';
                    }
                    else {
                        strdata = parseFloat(hlra8_value[i]).toFixed(setdata.setting.adset[i].Point);
                        term2 = strdata + " [" + setdata.setting.adset[i].Unit + "]";
                    }
                    $(term).html(term2);
                }
                else {
                    $(term).html("");
                }
            }
            //--------------------電波強度--------------------------
            if (gcrurbranch == 1) {
                $("#hlra8valdbm").html(hlra8insdat.Respons.RSSI + " [dBm]");
            }
            else {
                $("#hlra8valdbm").html("");
            }

            //警報状態
            var alert_exist = 0;// 0: success; 1; danger; 2: warning
            term = HLRA8_ALARM_CONTENT;
            var alert_str1 = "";
            var unknown = false;
            var hlra8_state = [hlra8insdat.Respons.Data.an1_analog.State,
            hlra8insdat.Respons.Data.an2_analog.State,
            hlra8insdat.Respons.Data.an3_analog.State,
            hlra8insdat.Respons.Data.an4_analog.State,
            hlra8insdat.Respons.Data.an5_analog.State,
            hlra8insdat.Respons.Data.an6_analog.State,
            hlra8insdat.Respons.Data.an7_analog.State,
            hlra8insdat.Respons.Data.an8_analog.State];

            //An
            for (var i = 0; i < 8 && alert_exist == 0; i++) {
                if (hlra8_state[i] == null) {
                    unknown = true;
                }
                termdata = parseInt(hlra8_state[i], 16);

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
            for (var i = 0; i < 8; i++) {
                termdata = parseInt(hlra8_state[i], 16);
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
            for (var i = 0; i < 8; i++) {
                termdata = parseInt(hlra8_state[i], 16);
                if ((termdata & 0x0001) == 0x0001) {
                    alert_exist = 3;
                    alert_str1 = setdata.setting.adset[i].Title;
                    break;
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
        $("#hlra8updated_time").html("データ更新：----/--/-- --:--");

        for (var i = 0; i < 8; i++) {
            //1～8
            j = (i + 1).toString();
            term = HLRA8_ADVAL + j;
            $(term).html("--");
        }
        $("#hlra8valdbm").html("--");

        //警報状態
        term = HLRA8_ALARM_CONTENT;
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).html("<strong>NO DATA</strong>　");
    }
}

/**
 *　グループ瞬時データ表示用のHLR-A8のTemplateを作成する
 */
function fncHlra8InstValDsnMake(tvid, title) {

    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlra8title" class="h5 m-0">hlra8titlestring \
            </h4> \
            <h6 id="a8updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="hlra8-title-ad1" class="text-center table-active"></th> \
                            <td id="hlra8valad1" colspan="2" class="text-right">--</td> \
                            <th id="hlra8-title-ad2" class="text-center table-active"></th> \
                            <td id="hlra8valad2" colspan="2" class="text-right">--</td> \
                            <th id="hlra8-title-ad3" class="text-center table-active"></th> \
                            <td id="hlra8valad3" colspan="2" class="text-right">--</td> \
                            <th id="hlra8-title-ad4" class="text-center table-active"></th> \
                            <td id="hlra8valad4" colspan="2" class="text-right">--</td> \
                            <th id="hlra8dbm_title" class="text-center table-active" >電波強度</th> \
                            <td id="hlra8valdbm" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <th id="hlra8-title-ad5" class="text-center table-active"></th> \
                            <td id="hlra8valad5" colspan="2" class="text-right">--</td> \
                            <th id="hlra8-title-ad6" class="text-center table-active"></th> \
                            <td id="hlra8valad6" colspan="2" class="text-right">--</td> \
                            <th id="hlra8-title-ad7" class="text-center table-active"></th> \
                            <td id="hlra8valad7" colspan="2" class="text-right">--</td> \
                            <th id="hlra8-title-ad8" class="text-center table-active"></th> \
                            <td id="hlra8valad8" colspan="2" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlra8title/g, tvid + "idhlra8title");
    rtnval = rtnval.replace(/hlra8valad/g, tvid + "hlra8valad");
    rtnval = rtnval.replace(/hlra8-title-ad/g, tvid + "hlra8-title-ad");
    rtnval = rtnval.replace(/hlra8dbm_title/g, tvid + "hlra8dbm_title");
    rtnval = rtnval.replace(/hlra8valdbm/g, tvid + "hlra8valdbm");
    rtnval = rtnval.replace(/a8updated_time/g, tvid + "a8updated_time");
    rtnval = rtnval.replace(/hlra8titlestring/g, title);

    return rtnval;
}

/**
 *　グループ瞬時データ表示用のHR-A8のTemplateを作成する
 */
function fncHrA8InstValDsnMake(tvid, title) {

    var rtnval;

    rtnval = '<!-- HR-A8--> \
    <div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idhlra8title" class="h5 m-0">hlra8titlestring \
            </h4> \
            <h6 id="a8updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body py-0 px-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                        <th id="hlra8-title-ad1" class="text-center table-active"></th> \
                        <td id="hlra8valad1" colspan="2" class="text-right">--</td> \
                        <th id="hlra8-title-ad2" class="text-center table-active"></th> \
                        <td id="hlra8valad2" colspan="2" class="text-right">--</td> \
                        <th id="hlra8-title-ad3" class="text-center table-active"></th> \
                        <td id="hlra8valad3" colspan="2" class="text-right">--</td> \
                        <th id="hlra8-title-ad4" class="text-center table-active"></th> \
                        <td id="hlra8valad4" colspan="2" class="text-right">--</td> \
                    </tr> \
                    <tr> \
                        <th id="hlra8-title-ad5" class="text-center table-active"></th> \
                        <td id="hlra8valad5" colspan="2" class="text-right">--</td> \
                        <th id="hlra8-title-ad6" class="text-center table-active"></th> \
                        <td id="hlra8valad6" colspan="2" class="text-right">--</td> \
                        <th id="hlra8-title-ad7" class="text-center table-active"></th> \
                        <td id="hlra8valad7" colspan="2" class="text-right">--</td> \
                        <th id="hlra8-title-ad8" class="text-center table-active"></th> \
                        <td id="hlra8valad8" colspan="2" class="text-right">--</td> \
                    </tr> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlra8title/g, tvid + "idhlra8title");
    rtnval = rtnval.replace(/hlra8valad/g, tvid + "hlra8valad");
    rtnval = rtnval.replace(/hlra8-title-ad/g, tvid + "hlra8-title-ad");
    rtnval = rtnval.replace(/a8updated_time/g, tvid + "a8updated_time");
    rtnval = rtnval.replace(/hlra8titlestring/g, title);

    return rtnval;
}

/**
 * hrla8 グラフデータクリア
 */
function clear_grp_hlra8() {
    for (var i = 0; i < hlra8_graph_data_ad1.length; i++) {
        // AD1~AD8
        hlra8_graph_data_ad1[i] = null;
        hlra8_graph_data_ad2[i] = null;
        hlra8_graph_data_ad3[i] = null;
        hlra8_graph_data_ad4[i] = null;
        hlra8_graph_data_ad5[i] = null;
        hlra8_graph_data_ad6[i] = null;
        hlra8_graph_data_ad7[i] = null;
        hlra8_graph_data_ad8[i] = null;
        // AD1~AD8の最大値
        hlra8_histogram_maxdata_ad1[i] = null;
        hlra8_histogram_maxdata_ad2[i] = null;
        hlra8_histogram_maxdata_ad3[i] = null;
        hlra8_histogram_maxdata_ad4[i] = null;
        hlra8_histogram_maxdata_ad5[i] = null;
        hlra8_histogram_maxdata_ad6[i] = null;
        hlra8_histogram_maxdata_ad7[i] = null;
        hlra8_histogram_maxdata_ad8[i] = null;
        // AD1~AD8の最小値
        hlra8_histogram_mindata_ad1[i] = null;
        hlra8_histogram_mindata_ad2[i] = null;
        hlra8_histogram_mindata_ad3[i] = null;
        hlra8_histogram_mindata_ad4[i] = null;
        hlra8_histogram_mindata_ad5[i] = null;
        hlra8_histogram_mindata_ad6[i] = null;
        hlra8_histogram_mindata_ad7[i] = null;
        hlra8_histogram_mindata_ad8[i] = null;
        // AD1~AD8の平均値
        hlra8_histogram_meddata_ad1[i] = null;
        hlra8_histogram_meddata_ad2[i] = null;
        hlra8_histogram_meddata_ad3[i] = null;
        hlra8_histogram_meddata_ad4[i] = null;
        hlra8_histogram_meddata_ad5[i] = null;
        hlra8_histogram_meddata_ad6[i] = null;
        hlra8_histogram_meddata_ad7[i] = null;
        hlra8_histogram_meddata_ad8[i] = null;
        //強度
        hlra8_graph_data_dBm[i] = null;
    }

    if (hlra8_graph_exist == true) {
        // AD1~8のグラフをクリアする
        if (hlra8_graph_ad1_exist == true) {
            hlra8_chart_ad1.destroy();
            hlra8_graph_ad1_exist = false;
        }
        if (hlra8_graph_ad2_exist == true) {
            hlra8_chart_ad2.destroy();
            hlra8_graph_ad2_exist = false;
        }
        if (hlra8_graph_ad3_exist == true) {
            hlra8_chart_ad3.destroy();
            hlra8_graph_ad3_exist = false;
        }
        if (hlra8_graph_ad4_exist == true) {
            hlra8_chart_ad4.destroy();
            hlra8_graph_ad4_exist = false;
        }
        if (hlra8_graph_ad5_exist == true) {
            hlra8_chart_ad5.destroy();
            hlra8_graph_ad5_exist = false;
        }
        if (hlra8_graph_ad6_exist == true) {
            hlra8_chart_ad6.destroy();
            hlra8_graph_ad6_exist = false;
        }
        if (hlra8_graph_ad7_exist == true) {
            hlra8_chart_ad7.destroy();
            hlra8_graph_ad7_exist = false;
        }
        if (hlra8_graph_ad8_exist == true) {
            hlra8_chart_ad8.destroy();
            hlra8_graph_ad8_exist = false;
        }
        // 最大、最小、平均のグラフをクリアする
        if (hlra8_histogram_ad1_exist == true) {
            hlra8_chart_histogram_ad1.destroy();
            hlra8_histogram_ad1_exist = false;
        }
        if (hlra8_histogram_ad2_exist == true) {
            hlra8_chart_histogram_ad2.destroy();
            hlra8_histogram_ad2_exist = false;
        }
        if (hlra8_histogram_ad3_exist == true) {
            hlra8_chart_histogram_ad3.destroy();
            hlra8_histogram_ad3_exist = false;
        }
        if (hlra8_histogram_ad4_exist == true) {
            hlra8_chart_histogram_ad4.destroy();
            hlra8_histogram_ad4_exist = false;
        }
        if (hlra8_histogram_ad5_exist == true) {
            hlra8_chart_histogram_ad5.destroy();
            hlra8_histogram_ad5_exist = false;
        }
        if (hlra8_histogram_ad6_exist == true) {
            hlra8_chart_histogram_ad6.destroy();
            hlra8_histogram_ad6_exist = false;
        }
        if (hlra8_histogram_ad7_exist == true) {
            hlra8_chart_histogram_ad7.destroy();
            hlra8_histogram_ad7_exist = false;
        }
        if (hlra8_histogram_ad8_exist == true) {
            hlra8_chart_histogram_ad8.destroy();
            hlra8_histogram_ad8_exist = false;
        }
        // 強度
        hlra8_chart_dBm.destroy();
        // フラグをクリアする
        hlra8_graph_exist = false;
        hlra8_histogram_exist = false;
    }

    for (var i = 0; i < 8; i++) {
        var j = (i + 1).toString();
        //グラフの単位
        term = HLRA8_GRPADUNIT + j;
        $(term).html("--");

        //グラフのタイトル
        term = HLRA8_GRPADTITLE + j;
        $(term).html("--");

        // 最大、最小、平均のグラフの単位
        term = HLRA8_HISTOGRAM_ADUNIT + j;
        $(term).html("--");

        //最大、最小、平均のグラフのタイトル
        term = HLRA8_HISTOGRAM_ADTITLE + j;
        $(term).html("--");

        // 上限警報発生値
        term = HLRA8_GRPADHALRM + j;
        $(term).html("上限警報発生値 -- [--]");

        // 下限警報発生値
        term = HLRA8_GRPADLALRM + j;
        $(term).html("下限警報発生値 -- [--]");
    }

    $("#hlra8updated_time").html("データ更新：----/--/-- --:--");

    //各AD
    for (var i = 0; i < 8; i++) {
        //1～8
        j = (i + 1).toString();
        //瞬時値テーブルで
        term = HLRA8_ADVAL + j;
        $(term).html("--");
    }

    //電波強度
    $("#hlra8valdbm").html("--");
    var term = HLRA8_ALARM_CONTENT;
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");

}

/**
 * HLR-A8の設定値をすべてに表示する
 * （瞬時値タイトル、グラフのタイトルのユニット、タイトル）
 */
function displayhlra8setting(setdata) {
    var term;
    var term2;
    // 設定値が有効
    if (setdata.setting !== null) {
        for (var i = 0; i < 8; i++) {
            var j = (i + 1).toString();

            //瞬時値タイトル
            term = HLRA8_ADTITLE + j;
            term2 = setdata.setting.adset[i].Title;
            $(term).html(term2);

            //グラフの単位
            term = HLRA8_GRPADUNIT + j;
            term2 = " [" + setdata.setting.adset[i].Unit + "]";
            $(term).html(term2);
            // 最大、最小、平均のグラフの単位
            term = HLRA8_HISTOGRAM_ADUNIT + j;
            $(term).html(term2);

            //グラフのタイトル
            term = HLRA8_GRPADTITLE + j;
            term2 = setdata.setting.adset[i].Title;
            $(term).html(term2);

            //最大、最小、平均のグラフのタイトル
            term = HLRA8_HISTOGRAM_ADTITLE + j;
            term2 = setdata.setting.adset[i].Title + "(最大値、最小値、平均値)";
            $(term).html(term2);

            // 上限警報発生値
            term = HLRA8_GRPADHALRM + j;
            term2 = "上限警報発生値 " + setdata.setting.adset[i].Alarm[1].toFixed(setdata.setting.adset[i].Point) + " [" + setdata.setting.adset[i].Unit + "]";
            $(term).html(term2);

            // 警報上限有無
            term = HLRA8_GRPADHEALRM + j;
            if (setdata.setting.adset[i].AlarmE[1] == 0) {
                $(term).css({ "display": "none" });
            }
            else {
                $(term).css({ "display": "block" });
            }

            // 下限警報発生値
            term = HLRA8_GRPADLALRM + j;
            term2 = "下限警報発生値 " + setdata.setting.adset[i].Alarm[0].toFixed(setdata.setting.adset[i].Point) + " [" + setdata.setting.adset[i].Unit + "]";
            $(term).html(term2);
            // 警報下限有無
            term = HLRA8_GRPADLEALRM + j;
            if (setdata.setting.adset[i].AlarmE[0] == 0) {
                $(term).css({ "display": "none" });
            }
            else {
                $(term).css({ "display": "block" });
            }


        }

        if (gcrurbranch == 1) {
            //dBmのタイトル
            $('#hlra8valdbm_title').html(jis2chr(setdata.setting.rssi.Title));
            $('#idhlra8grptitledbm').html(jis2chr(setdata.setting.rssi.Title));
        }

    }
    // 設定値が有効ではない
    else {
        for (var i = 0; i < 8; i++) {
            var j = (i + 1).toString();

            //グラフの単位
            term = HLRA8_GRPADUNIT + j;
            $(term).html("--");

            //グラフのタイトル
            term = HLRA8_GRPADTITLE + j;
            $(term).html("--");

            //最大、最小、平均のグラフのタイトル
            term = HLRA8_HISTOGRAM_ADTITLE + j;
            $(term).html("--");

            // 最大、最小、平均のグラフの単位
            term = HLRA8_HISTOGRAM_ADUNIT + j;
            $(term).html(term2);

            // 上限警報発生値
            term = HLRA8_GRPADHALRM + j;
            $(term).html("上限警報発生値 -- [--]");

            // 下限警報発生値
            term = HLRA8_GRPADLALRM + j;
            $(term).html("下限警報発生値 -- [--]");
        }

        //dBmのタイトル
        if (gcrurbranch == 1) {
            $('#hlra8valdbm_title').html('--');
            $('#idhlra8grptitledbm').html('--');
        }
    }
}

/**
 * HR-A8のユニットの瞬時値を表示する
 */
function get_InsDatHRA8(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var j;
    var term;

    //設定値を表示
    displayhlra8setting(setting);

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#hlra8updated_time").html("データ更新：----/--/-- --:--");
        //各AD
        for (var i = 0; i < 8; i++) {
            j = (i + 1).toString();
            term = HLRA8_ADVAL + j;
            $(term).html("--");
        }
        //--------------------電波強度--------------------------
        if (gcrurbranch == 1) {
            $("#hlra8valdbm").html("--");
        }
        else {
            $("#hlra8valdbm").html("");
        }

        var term = HLRA8_ALARM_CONTENT;
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
        displayhlra8data(obj, setting, unitSts);
    }, setting);
}

/**
 * HLR-A8ユニットの瞬時値を表示する
 */
function get_InsDatHLRA8(setting, unitNo, unitSts) {
    var isNoRequest = false;
    var term;
    var j;

    // 設定値を表示する
    displayhlra8setting(setting);

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#hlra8updated_time").html("データ更新：----/--/-- --:--");
        //各AD
        for (var i = 0; i < 8; i++) {
            j = (i + 1).toString();
            term = HLRA8_ADVAL + j;
            $(term).html("--");
        }
        //--------------------電波強度--------------------------
        if (gcrurbranch == 1) {
            $("#hlra8valdbm").html("--");
        }
        else {
            $("#hlra8valdbm").html("");
        }

        //警報状態
        var term = HLRA8_ALARM_CONTENT;
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
        displayhlra8data(obj, setting, unitSts);
    }, setting);
}

/*　機能： hlra8グラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
    受信データはJSON型
    正常コード：200
*/
function displayhlra8grph(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // グラフ日付作成
    hlra8_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        hlra8_graph_dat_num = obj.Respons.an1_analog.Num;
        hlra8_graph_time.length = 0;
        //AD1～AD8
        hlra8_graph_data_ad1.length = 0;
        hlra8_graph_data_ad2.length = 0;
        hlra8_graph_data_ad3.length = 0;
        hlra8_graph_data_ad4.length = 0;
        hlra8_graph_data_ad5.length = 0;
        hlra8_graph_data_ad6.length = 0;
        hlra8_graph_data_ad7.length = 0;
        hlra8_graph_data_ad8.length = 0;
        // AD1~AD8の最大値
        hlra8_histogram_maxdata_ad1.length = 0;
        hlra8_histogram_maxdata_ad2.length = 0;
        hlra8_histogram_maxdata_ad3.length = 0;
        hlra8_histogram_maxdata_ad4.length = 0;
        hlra8_histogram_maxdata_ad5.length = 0;
        hlra8_histogram_maxdata_ad6.length = 0;
        hlra8_histogram_maxdata_ad7.length = 0;
        hlra8_histogram_maxdata_ad8.length = 0;
        // AD1~AD8の最小値
        hlra8_histogram_mindata_ad1.length = 0;
        hlra8_histogram_mindata_ad2.length = 0;
        hlra8_histogram_mindata_ad3.length = 0;
        hlra8_histogram_mindata_ad4.length = 0;
        hlra8_histogram_mindata_ad5.length = 0;
        hlra8_histogram_mindata_ad6.length = 0;
        hlra8_histogram_mindata_ad7.length = 0;
        hlra8_histogram_mindata_ad8.length = 0;
        // AD1~AD8の平均値
        hlra8_histogram_meddata_ad1.length = 0;
        hlra8_histogram_meddata_ad2.length = 0;
        hlra8_histogram_meddata_ad3.length = 0;
        hlra8_histogram_meddata_ad4.length = 0;
        hlra8_histogram_meddata_ad5.length = 0;
        hlra8_histogram_meddata_ad6.length = 0;
        hlra8_histogram_meddata_ad7.length = 0;
        hlra8_histogram_meddata_ad8.length = 0;

        //強度
        hlra8_graph_data_dBm.length = 0;

        //**********データ格納**********
        for (var i = 0; i < hlra8_graph_dat_num; i++) {
            //時間          "年：月：日 時：分"
            hlra8_graph_time[i] = moment(obj.Respons.an1_analog.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                
            //データが無い場合
            if (parseInt(obj.Respons.an1_analog.Data[i].RSSI) == 0) {
                //AD1～AD8
                hlra8_graph_data_ad1[i] = null;
                hlra8_graph_data_ad2[i] = null;
                hlra8_graph_data_ad3[i] = null;
                hlra8_graph_data_ad4[i] = null;
                hlra8_graph_data_ad5[i] = null;
                hlra8_graph_data_ad6[i] = null;
                hlra8_graph_data_ad7[i] = null;
                hlra8_graph_data_ad8[i] = null;
                // AD1~AD8の最大値
                hlra8_histogram_maxdata_ad1[i] = null;
                hlra8_histogram_maxdata_ad2[i] = null;
                hlra8_histogram_maxdata_ad3[i] = null;
                hlra8_histogram_maxdata_ad4[i] = null;
                hlra8_histogram_maxdata_ad5[i] = null;
                hlra8_histogram_maxdata_ad6[i] = null;
                hlra8_histogram_maxdata_ad7[i] = null;
                hlra8_histogram_maxdata_ad8[i] = null;
                // AD1~AD8の最小値
                hlra8_histogram_mindata_ad1[i] = null;
                hlra8_histogram_mindata_ad2[i] = null;
                hlra8_histogram_mindata_ad3[i] = null;
                hlra8_histogram_mindata_ad4[i] = null;
                hlra8_histogram_mindata_ad5[i] = null;
                hlra8_histogram_mindata_ad6[i] = null;
                hlra8_histogram_mindata_ad7[i] = null;
                hlra8_histogram_mindata_ad8[i] = null;
                // AD1~AD8の平均値
                hlra8_histogram_meddata_ad1[i] = null;
                hlra8_histogram_meddata_ad2[i] = null;
                hlra8_histogram_meddata_ad3[i] = null;
                hlra8_histogram_meddata_ad4[i] = null;
                hlra8_histogram_meddata_ad5[i] = null;
                hlra8_histogram_meddata_ad6[i] = null;
                hlra8_histogram_meddata_ad7[i] = null;
                hlra8_histogram_meddata_ad8[i] = null;
                //強度
                hlra8_graph_data_dBm[i] = null;

            }
            //データがある
            else {
                //AD1～AD8
                hlra8_graph_data_ad1[i] = obj.Respons.an1_analog.Data[i].Value;
                hlra8_graph_data_ad2[i] = obj.Respons.an2_analog.Data[i].Value;
                hlra8_graph_data_ad3[i] = obj.Respons.an3_analog.Data[i].Value;
                hlra8_graph_data_ad4[i] = obj.Respons.an4_analog.Data[i].Value;
                hlra8_graph_data_ad5[i] = obj.Respons.an5_analog.Data[i].Value;
                hlra8_graph_data_ad6[i] = obj.Respons.an6_analog.Data[i].Value;
                hlra8_graph_data_ad7[i] = obj.Respons.an7_analog.Data[i].Value;
                hlra8_graph_data_ad8[i] = obj.Respons.an8_analog.Data[i].Value;
                // AD1~AD8の最大値
                hlra8_histogram_maxdata_ad1[i] = obj.Respons.an1_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad2[i] = obj.Respons.an2_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad3[i] = obj.Respons.an3_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad4[i] = obj.Respons.an4_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad5[i] = obj.Respons.an5_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad6[i] = obj.Respons.an6_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad7[i] = obj.Respons.an7_analog.Data[i].Max;
                hlra8_histogram_maxdata_ad8[i] = obj.Respons.an8_analog.Data[i].Max;
                // AD1~AD8の最小値
                hlra8_histogram_mindata_ad1[i] = obj.Respons.an1_analog.Data[i].Min;
                hlra8_histogram_mindata_ad2[i] = obj.Respons.an2_analog.Data[i].Min;
                hlra8_histogram_mindata_ad3[i] = obj.Respons.an3_analog.Data[i].Min;
                hlra8_histogram_mindata_ad4[i] = obj.Respons.an4_analog.Data[i].Min;
                hlra8_histogram_mindata_ad5[i] = obj.Respons.an5_analog.Data[i].Min;
                hlra8_histogram_mindata_ad6[i] = obj.Respons.an6_analog.Data[i].Min;
                hlra8_histogram_mindata_ad7[i] = obj.Respons.an7_analog.Data[i].Min;
                hlra8_histogram_mindata_ad8[i] = obj.Respons.an8_analog.Data[i].Min;
                // AD1~AD8の平均値
                hlra8_histogram_meddata_ad1[i] = obj.Respons.an1_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad2[i] = obj.Respons.an2_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad3[i] = obj.Respons.an3_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad4[i] = obj.Respons.an4_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad5[i] = obj.Respons.an5_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad6[i] = obj.Respons.an6_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad7[i] = obj.Respons.an7_analog.Data[i].Avg;
                hlra8_histogram_meddata_ad8[i] = obj.Respons.an8_analog.Data[i].Avg;

                //強度
                if (gcrurbranch == 2) {
                    hlra8_graph_data_dBm[i] = null;
                }
                else {
                    hlra8_graph_data_dBm[i] = obj.Respons.an1_analog.Data[i].RSSI;
                }
            }
        }
        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlra8_graph_exist == false) {
            draw_graph_hlra8(setdata);
            //グラフオブジェクトが作成済み
            hlra8_graph_exist = true;
        }
        else {
            update_graph_hlra8(setdata);
        }

        // Histogram Draw/Update
        if (hlra8_histogram_exist == false) {
            hlra8_draw_histogram(setdata);
        }
        else {
            hlra8_update_histogram(setdata);
        }

        /* Graph TIME update */
        // AD Graph
        if (hlra8_graph_ad1_exist == true) {
            document.getElementById("idhlra8graphtimead1").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad2_exist == true) {
            document.getElementById("idhlra8graphtimead2").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad3_exist == true) {
            document.getElementById("idhlra8graphtimead3").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad4_exist == true) {
            document.getElementById("idhlra8graphtimead4").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad5_exist == true) {
            document.getElementById("idhlra8graphtimead5").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad6_exist == true) {
            document.getElementById("idhlra8graphtimead6").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad7_exist == true) {
            document.getElementById("idhlra8graphtimead7").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad8_exist == true) {
            document.getElementById("idhlra8graphtimead8").innerHTML = hlra8_graph_date;
        }

        // Histogramの時間を更新
        if (hlra8_histogram_ad1_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad1").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad2_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad2").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad3_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad3").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad4_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad4").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad5_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad5").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad6_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad6").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad7_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad7").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad8_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad8").innerHTML = hlra8_graph_date;
        }

        if (gcrurbranch == 2) {
            document.getElementById("idhlra8graphtimedbm").innerHTML = "";
        }
        else {
            document.getElementById("idhlra8graphtimedbm").innerHTML = hlra8_graph_date;
        }

    }
    else if (obj.Status == 400) {
        hlra8_graph_dat_num = 0;
        hlra8_graph_time.length = 0;
        //AD1～AD8
        hlra8_graph_data_ad1.length = 0;
        hlra8_graph_data_ad2.length = 0;
        hlra8_graph_data_ad3.length = 0;
        hlra8_graph_data_ad4.length = 0;
        hlra8_graph_data_ad5.length = 0;
        hlra8_graph_data_ad6.length = 0;
        hlra8_graph_data_ad7.length = 0;
        hlra8_graph_data_ad8.length = 0;
        // AD1~AD8の最大値
        hlra8_histogram_maxdata_ad1.length = 0;
        hlra8_histogram_maxdata_ad2.length = 0;
        hlra8_histogram_maxdata_ad3.length = 0;
        hlra8_histogram_maxdata_ad4.length = 0;
        hlra8_histogram_maxdata_ad5.length = 0;
        hlra8_histogram_maxdata_ad6.length = 0;
        hlra8_histogram_maxdata_ad7.length = 0;
        hlra8_histogram_maxdata_ad8.length = 0;
        // AD1~AD8の最小値
        hlra8_histogram_mindata_ad1.length = 0;
        hlra8_histogram_mindata_ad2.length = 0;
        hlra8_histogram_mindata_ad3.length = 0;
        hlra8_histogram_mindata_ad4.length = 0;
        hlra8_histogram_mindata_ad5.length = 0;
        hlra8_histogram_mindata_ad6.length = 0;
        hlra8_histogram_mindata_ad7.length = 0;
        hlra8_histogram_mindata_ad8.length = 0;
        // AD1~AD8の平均値
        hlra8_histogram_meddata_ad1.length = 0;
        hlra8_histogram_meddata_ad2.length = 0;
        hlra8_histogram_meddata_ad3.length = 0;
        hlra8_histogram_meddata_ad4.length = 0;
        hlra8_histogram_meddata_ad5.length = 0;
        hlra8_histogram_meddata_ad6.length = 0;
        hlra8_histogram_meddata_ad7.length = 0;
        hlra8_histogram_meddata_ad8.length = 0;
        //強度
        hlra8_graph_data_dBm.length = 0;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlra8_graph_exist == false) {
            draw_graph_hlra8(setdata);
            //グラフオブジェクトが作成済み
            hlra8_graph_exist = true;
        }
        else {
            update_graph_hlra8(setdata);
        }

        // Histogram Draw/Update
        if (hlra8_histogram_exist == false) {
            hlra8_draw_histogram(setdata);
            hlra8_histogram_exist = true;//グラフオブジェクトが作成済み
        }
        else {
            hlra8_update_histogram(setdata);
        }

        /* Graph TIME update */
        // AD Graph
        if (hlra8_graph_ad1_exist == true) {
            document.getElementById("idhlra8graphtimead1").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad2_exist == true) {
            document.getElementById("idhlra8graphtimead2").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad3_exist == true) {
            document.getElementById("idhlra8graphtimead3").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad4_exist == true) {
            document.getElementById("idhlra8graphtimead4").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad5_exist == true) {
            document.getElementById("idhlra8graphtimead5").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad6_exist == true) {
            document.getElementById("idhlra8graphtimead6").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad7_exist == true) {
            document.getElementById("idhlra8graphtimead7").innerHTML = hlra8_graph_date;
        }
        if (hlra8_graph_ad8_exist == true) {
            document.getElementById("idhlra8graphtimead8").innerHTML = hlra8_graph_date;
        }

        // Histogramの時間を更新
        if (hlra8_histogram_ad1_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad1").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad2_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad2").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad3_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad3").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad4_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad4").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad5_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad5").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad6_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad6").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad7_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad7").innerHTML = hlra8_graph_date;
        }
        if (hlra8_histogram_ad8_exist == true) {
            document.getElementById("hlra8_graphtime_histogramad8").innerHTML = hlra8_graph_date;
        }

        if (gcrurbranch == 2) {
            document.getElementById("idhlra8graphtimedbm").innerHTML = "";
        } else {
            document.getElementById("idhlra8graphtimedbm").innerHTML = hlra8_graph_date;
        }
    }
    else {
        // do nothing
    }
}

/*  
    機能：  AD、DI、電波強度のグラフを更新
*/
function update_graph_hlra8(setdata) {
    //AD
    if (setdata.setting.adset[0].Range != 0) {
        graph_ad_update(hlra8_chart_ad1, hlra8_graph_time, hlra8_graph_data_ad1, hlra8_graph_dat_num, setdata.setting.adset[0]);

    }
    if (setdata.setting.adset[1].Range != 0) {
        graph_ad_update(hlra8_chart_ad2, hlra8_graph_time, hlra8_graph_data_ad2, hlra8_graph_dat_num, setdata.setting.adset[1]);

    }
    if (setdata.setting.adset[2].Range != 0) {
        graph_ad_update(hlra8_chart_ad3, hlra8_graph_time, hlra8_graph_data_ad3, hlra8_graph_dat_num, setdata.setting.adset[2]);

    }
    if (setdata.setting.adset[3].Range != 0) {
        graph_ad_update(hlra8_chart_ad4, hlra8_graph_time, hlra8_graph_data_ad4, hlra8_graph_dat_num, setdata.setting.adset[3]);
    }
    if (setdata.setting.adset[4].Range != 0) {
        graph_ad_update(hlra8_chart_ad5, hlra8_graph_time, hlra8_graph_data_ad5, hlra8_graph_dat_num, setdata.setting.adset[4]);

    }
    if (setdata.setting.adset[5].Range != 0) {
        graph_ad_update(hlra8_chart_ad6, hlra8_graph_time, hlra8_graph_data_ad6, hlra8_graph_dat_num, setdata.setting.adset[5]);

    }
    if (setdata.setting.adset[6].Range != 0) {
        graph_ad_update(hlra8_chart_ad7, hlra8_graph_time, hlra8_graph_data_ad7, hlra8_graph_dat_num, setdata.setting.adset[6]);

    }
    if (setdata.setting.adset[7].Range != 0) {
        graph_ad_update(hlra8_chart_ad8, hlra8_graph_time, hlra8_graph_data_ad8, hlra8_graph_dat_num, setdata.setting.adset[7]);
    }

    //電波強度
    graph_dbm_update(hlra8_chart_dBm, hlra8_graph_time, hlra8_graph_data_dBm);
}

/*  
    機能：  AD、DI、DOのグラフを描画  

*/
function draw_graph_hlra8(setdata) {
    // CANVAS 2d content オブジェクトを取得
    // AD
    var hlra8_canvas_ad1 = document.getElementById("hlra8_chart1").getContext("2d");
    var hlra8_canvas_ad2 = document.getElementById("hlra8_chart2").getContext("2d");
    var hlra8_canvas_ad3 = document.getElementById("hlra8_chart3").getContext("2d");
    var hlra8_canvas_ad4 = document.getElementById("hlra8_chart4").getContext("2d");
    var hlra8_canvas_ad5 = document.getElementById("hlra8_chart5").getContext("2d");
    var hlra8_canvas_ad6 = document.getElementById("hlra8_chart6").getContext("2d");
    var hlra8_canvas_ad7 = document.getElementById("hlra8_chart7").getContext("2d");
    var hlra8_canvas_ad8 = document.getElementById("hlra8_chart8").getContext("2d");

    //rssi
    var hlra8_canvas_dBm = document.getElementById("charthlra8dbm").getContext("2d");

    //ADのグラフを描画
    // AD1
    if (setdata.setting.adset[0].Range != 0) {
        document.getElementById("idhlra8_ADChart1").style.display = "block";
        hlra8_chart_ad1 = draw_graph_ad(hlra8_canvas_ad1, hlra8_graph_time, hlra8_graph_data_ad1, hlra8_graph_dat_num, setdata.setting.adset[0]);
        hlra8_graph_ad1_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart1").style.display = "none";
    }
    // AD2
    if (setdata.setting.adset[1].Range != 0) {
        document.getElementById("idhlra8_ADChart2").style.display = "block";
        hlra8_chart_ad2 = draw_graph_ad(hlra8_canvas_ad2, hlra8_graph_time, hlra8_graph_data_ad2, hlra8_graph_dat_num, setdata.setting.adset[1]);
        hlra8_graph_ad2_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart2").style.display = "none";
    }
    // AD3
    if (setdata.setting.adset[2].Range != 0) {
        document.getElementById("idhlra8_ADChart3").style.display = "block";
        hlra8_chart_ad3 = draw_graph_ad(hlra8_canvas_ad3, hlra8_graph_time, hlra8_graph_data_ad3, hlra8_graph_dat_num, setdata.setting.adset[2]);
        hlra8_graph_ad3_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart3").style.display = "none";
    }
    // AD4
    if (setdata.setting.adset[3].Range != 0) {
        document.getElementById("idhlra8_ADChart4").style.display = "block";
        hlra8_chart_ad4 = draw_graph_ad(hlra8_canvas_ad4, hlra8_graph_time, hlra8_graph_data_ad4, hlra8_graph_dat_num, setdata.setting.adset[3]);
        hlra8_graph_ad4_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart4").style.display = "none";
    }
    // AD5
    if (setdata.setting.adset[4].Range != 0) {
        document.getElementById("idhlra8_ADChart5").style.display = "block";
        hlra8_chart_ad5 = draw_graph_ad(hlra8_canvas_ad5, hlra8_graph_time, hlra8_graph_data_ad5, hlra8_graph_dat_num, setdata.setting.adset[4]);
        hlra8_graph_ad5_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart5").style.display = "none";
    }
    // AD6
    if (setdata.setting.adset[5].Range != 0) {
        document.getElementById("idhlra8_ADChart6").style.display = "block";
        hlra8_chart_ad6 = draw_graph_ad(hlra8_canvas_ad6, hlra8_graph_time, hlra8_graph_data_ad6, hlra8_graph_dat_num, setdata.setting.adset[5]);
        hlra8_graph_ad6_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart6").style.display = "none";
    }
    // AD7
    if (setdata.setting.adset[6].Range != 0) {
        document.getElementById("idhlra8_ADChart7").style.display = "block";
        hlra8_chart_ad7 = draw_graph_ad(hlra8_canvas_ad7, hlra8_graph_time, hlra8_graph_data_ad7, hlra8_graph_dat_num, setdata.setting.adset[6]);
        hlra8_graph_ad7_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart7").style.display = "none";
    }
    // AD8
    if (setdata.setting.adset[7].Range != 0) {
        document.getElementById("idhlra8_ADChart8").style.display = "block";
        hlra8_chart_ad8 = draw_graph_ad(hlra8_canvas_ad8, hlra8_graph_time, hlra8_graph_data_ad8, hlra8_graph_dat_num, setdata.setting.adset[7]);
        hlra8_graph_ad8_exist = true;
    }
    else {
        document.getElementById("idhlra8_ADChart8").style.display = "none";
    }

    //電波強度                  単位を表示して、グラ愚を描画
    hlra8_chart_dBm = draw_graph_dbm(hlra8_canvas_dBm, hlra8_graph_time, hlra8_graph_data_dBm);
}

/*  
        機能：  HLR-A8のAD最大・最小・平均のグラフを描画  
*/
function hlra8_draw_histogram(setdata) {
    //AD Max-Min-Avg CANVAS 2d content オブジェクトを取得
    var hlra8_canvas_histogram_ad1 = document.getElementById("hlra8_histogramad1").getContext("2d");
    var hlra8_canvas_histogram_ad2 = document.getElementById("hlra8_histogramad2").getContext("2d");
    var hlra8_canvas_histogram_ad3 = document.getElementById("hlra8_histogramad3").getContext("2d");
    var hlra8_canvas_histogram_ad4 = document.getElementById("hlra8_histogramad4").getContext("2d");
    var hlra8_canvas_histogram_ad5 = document.getElementById("hlra8_histogramad5").getContext("2d");
    var hlra8_canvas_histogram_ad6 = document.getElementById("hlra8_histogramad6").getContext("2d");
    var hlra8_canvas_histogram_ad7 = document.getElementById("hlra8_histogramad7").getContext("2d");
    var hlra8_canvas_histogram_ad8 = document.getElementById("hlra8_histogramad8").getContext("2d");

    //ADの単位を表示して、グラフを描画
    if ((setdata.setting.adset[0].Range != 0) && (setdata.setting.adset[0].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram1").style.display = "block";
        hlra8_chart_histogram_ad1 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad1, hlra8_graph_time, hlra8_histogram_maxdata_ad1, hlra8_histogram_mindata_ad1, hlra8_histogram_meddata_ad1, hlra8_graph_dat_num, setdata.setting.adset[0]);
        hlra8_histogram_ad1_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend1_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad1.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad1);
            });

        }
    }
    else {
        document.getElementById("idhlra8_Histogram1").style.display = "none";
    }
    // AD2
    if ((setdata.setting.adset[1].Range != 0) && (setdata.setting.adset[1].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram2").style.display = "block";
        hlra8_chart_histogram_ad2 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad2, hlra8_graph_time, hlra8_histogram_maxdata_ad2, hlra8_histogram_mindata_ad2, hlra8_histogram_meddata_ad2, hlra8_graph_dat_num, setdata.setting.adset[1]);
        hlra8_histogram_ad2_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend2_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad2.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad2);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram2").style.display = "none";
    }
    // AD3
    if ((setdata.setting.adset[2].Range != 0) && (setdata.setting.adset[2].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram3").style.display = "block";
        hlra8_chart_histogram_ad3 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad3, hlra8_graph_time, hlra8_histogram_maxdata_ad3, hlra8_histogram_mindata_ad3, hlra8_histogram_meddata_ad3, hlra8_graph_dat_num, setdata.setting.adset[2]);
        hlra8_histogram_ad3_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend3_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad3.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad3);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram3").style.display = "none";
    }
    // AD4
    if ((setdata.setting.adset[3].Range != 0) && (setdata.setting.adset[3].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram4").style.display = "block";
        hlra8_chart_histogram_ad4 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad4, hlra8_graph_time, hlra8_histogram_maxdata_ad4, hlra8_histogram_mindata_ad4, hlra8_histogram_meddata_ad4, hlra8_graph_dat_num, setdata.setting.adset[3]);
        hlra8_histogram_ad4_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend4_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad4.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad4);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram4").style.display = "none";
    }

    // AD5
    if ((setdata.setting.adset[4].Range != 0) && (setdata.setting.adset[4].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram5").style.display = "block";
        hlra8_chart_histogram_ad5 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad5, hlra8_graph_time, hlra8_histogram_maxdata_ad5, hlra8_histogram_mindata_ad5, hlra8_histogram_meddata_ad5, hlra8_graph_dat_num, setdata.setting.adset[4]);
        hlra8_histogram_ad5_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend5_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad5.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad5);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram5").style.display = "none";
    }

    // AD6
    if ((setdata.setting.adset[5].Range != 0) && (setdata.setting.adset[5].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram6").style.display = "block";
        hlra8_chart_histogram_ad6 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad6, hlra8_graph_time, hlra8_histogram_maxdata_ad6, hlra8_histogram_mindata_ad6, hlra8_histogram_meddata_ad6, hlra8_graph_dat_num, setdata.setting.adset[5]);
        hlra8_histogram_ad6_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend6_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad6.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad6);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram6").style.display = "none";
    }
    // AD7
    if ((setdata.setting.adset[6].Range != 0) && (setdata.setting.adset[6].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram7").style.display = "block";
        hlra8_chart_histogram_ad7 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad7, hlra8_graph_time, hlra8_histogram_maxdata_ad7, hlra8_histogram_mindata_ad7, hlra8_histogram_meddata_ad7, hlra8_graph_dat_num, setdata.setting.adset[6]);
        hlra8_histogram_ad7_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend7_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad7.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad7);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram7").style.display = "none";
    }

    // AD8
    if ((setdata.setting.adset[7].Range != 0) && (setdata.setting.adset[7].HistogramE != 0)) {
        document.getElementById("idhlra8_Histogram8").style.display = "block";
        hlra8_chart_histogram_ad8 = draw_minmaxavg_ad(hlra8_canvas_histogram_ad8, hlra8_graph_time, hlra8_histogram_maxdata_ad8, hlra8_histogram_mindata_ad8, hlra8_histogram_meddata_ad8, hlra8_graph_dat_num, setdata.setting.adset[7]);
        hlra8_histogram_ad8_exist = true;
        hlra8_histogram_exist = true;

        // generate HTML legend
        var myLegendContainer = document.getElementById("idlegend8_a8");
        myLegendContainer.innerHTML = hlra8_chart_histogram_ad8.generateLegend();

        // bind onClick event to all LI-tags of the legend
        var legendItems = myLegendContainer.getElementsByTagName('li');
        for (var i = 0; i < legendItems.length; i += 1) {
            legendItems[i].addEventListener("click", function (e) {
                legendClickCallback(e, hlra8_chart_histogram_ad8);
            });
        }
    }
    else {
        document.getElementById("idhlra8_Histogram8").style.display = "none";
    }
}


/*  
    機能：  HLR-A8ADの最大・最小・平均値 のグラフを更新
*/
function hlra8_update_histogram(setdata) {
    if (hlra8_histogram_ad1_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad1, hlra8_graph_time, hlra8_histogram_maxdata_ad1, hlra8_histogram_mindata_ad1, hlra8_histogram_meddata_ad1, hlra8_graph_dat_num, setdata.setting.adset[0]);
    }
    if (hlra8_histogram_ad2_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad2, hlra8_graph_time, hlra8_histogram_maxdata_ad2, hlra8_histogram_mindata_ad2, hlra8_histogram_meddata_ad2, hlra8_graph_dat_num, setdata.setting.adset[1]);
    }
    if (hlra8_histogram_ad3_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad3, hlra8_graph_time, hlra8_histogram_maxdata_ad3, hlra8_histogram_mindata_ad3, hlra8_histogram_meddata_ad3, hlra8_graph_dat_num, setdata.setting.adset[2]);
    }
    if (hlra8_histogram_ad4_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad4, hlra8_graph_time, hlra8_histogram_maxdata_ad4, hlra8_histogram_mindata_ad4, hlra8_histogram_meddata_ad4, hlra8_graph_dat_num, setdata.setting.adset[3]);
    }
    if (hlra8_histogram_ad5_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad5, hlra8_graph_time, hlra8_histogram_maxdata_ad5, hlra8_histogram_mindata_ad5, hlra8_histogram_meddata_ad5, hlra8_graph_dat_num, setdata.setting.adset[4]);
    }
    if (hlra8_histogram_ad6_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad6, hlra8_graph_time, hlra8_histogram_maxdata_ad6, hlra8_histogram_mindata_ad6, hlra8_histogram_meddata_ad6, hlra8_graph_dat_num, setdata.setting.adset[5]);
    }
    if (hlra8_histogram_ad7_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad7, hlra8_graph_time, hlra8_histogram_maxdata_ad7, hlra8_histogram_mindata_ad7, hlra8_histogram_meddata_ad7, hlra8_graph_dat_num, setdata.setting.adset[6]);
    }
    if (hlra8_histogram_ad8_exist == true) {
        histogram_ad_update(hlra8_chart_histogram_ad8, hlra8_graph_time, hlra8_histogram_maxdata_ad8, hlra8_histogram_mindata_ad8, hlra8_histogram_meddata_ad8, hlra8_graph_dat_num, setdata.setting.adset[7]);
    }
}