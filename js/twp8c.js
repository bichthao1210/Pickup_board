/*version=1.08*/
// Log here
// <!-- 2021/01/13 -->
// <!-- moment.jsの警告を対応する -->
/**
* TWP8C グラフ
*/
/*　機能： twp8cグラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
*/
//DI
var twp8c_chart_di1;
var twp8c_chart_di2;
var twp8c_chart_di3;
var twp8c_chart_di4;
var twp8c_chart_di5;
var twp8c_chart_di6;
var twp8c_chart_di7;
var twp8c_chart_di8;
var twp8c_graph_exist = false;

//グラフ用の時間配列
var twp8c_graph_time1 = [];
var twp8c_graph_time2 = [];
var twp8c_graph_time3 = [];
var twp8c_graph_time4 = [];
var twp8c_graph_time5 = [];
var twp8c_graph_time6 = [];
var twp8c_graph_time7 = [];
var twp8c_graph_time8 = [];
var twp8c_graph_date;
var twp8c_graph_dat_num;

//DIグラフ用のデータ配列
var twp8c_graph_data_di1 = [];
var twp8c_graph_data_di2 = [];
var twp8c_graph_data_di3 = [];
var twp8c_graph_data_di4 = [];
var twp8c_graph_data_di5 = [];
var twp8c_graph_data_di6 = [];
var twp8c_graph_data_di7 = [];
var twp8c_graph_data_di8 = [];

const IDTWP8CVAL1CH = "#idtwp8cval1ch";
const IDTWP8CSTATCH = "#idtwp8cstatch";
const IDTWP8C_TITLECH = "#idtwp8c_titlech";
const IDTWP8C_ALARMCH = "#idtwp8c_alarmch";
const IDTWP8C_EALARMCH = "#idtwp8c_ealarmch";
const IDTWP8C_GRPHUNIT = "#idtwp8c_grphunit";

const TWP8C_TITLE_ = "twp8c_title_";
const TWP8C_MULTI_ = "twp8c_multi_";
const TWP8C_DEC_ = "twp8c_decimal_";
const TWP8C_UNIT_ = "twp8c_unit_";
const TWP8C_GRAPHTYPE_ = "twp8c_graphType_";
const TWP8C_GRAPHH_ = "twp8c_graphH_";
const TWP8C_ALARMH_ = "twp8c_alarmH_";
const TWP8C_ALARMHE_ = "twp8c_alarmHE_";
const TWP8C_LMALARME = "twp8c_InputRateChange_";
const TWP8C_LSTATETOONMALARME = "twp8c_InputStateChangeToOn_";
const TWP8C_LSTATETOOFFMALARME = "twp8c_InputStateChangeToOff_";

/**
 * TWP8Cグラフデータクリア
 */
function clear_graph_twp8c() {
    for (var i = 0; i < twp8c_graph_dat_num; i++) {
        //DI1～DI8
        twp8c_graph_data_di1[i] = null;
        twp8c_graph_data_di2[i] = null;
        twp8c_graph_data_di3[i] = null;
        twp8c_graph_data_di4[i] = null;
        twp8c_graph_data_di5[i] = null;
        twp8c_graph_data_di6[i] = null;
        twp8c_graph_data_di7[i] = null;
        twp8c_graph_data_di8[i] = null;
    }

    if (twp8c_graph_exist == true) {
        twp8c_chart_di1.destroy();
        twp8c_chart_di2.destroy();
        twp8c_chart_di3.destroy();
        twp8c_chart_di4.destroy();
        twp8c_chart_di5.destroy();
        twp8c_chart_di6.destroy();
        twp8c_chart_di7.destroy();
        twp8c_chart_di8.destroy();

        twp8c_graph_exist = false;
    }

    $("#twp8cupdated_time").text("データ更新：----/--/-- --:--");

    for (var i = 1; i < 9; i++) {
        $(IDTWP8CVAL1CH + i).text("--");
        $(IDTWP8CSTATCH + i).html("");
        $(IDTWP8CSTATCH + i).removeClass("text-light shadow");
        $(IDTWP8CSTATCH + i).css({
            "color": DO_DI_ONOFF_TEXTCOLOR[0],
            "background-color": DO_DI_ONOFF_BGCOLOR[2]
        });
    }
    var term = "#alertH_twp8c";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
}

/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：TWP8Cの価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_twp8c_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;

    //タイトル
    ID_temp = TWP8C_TITLE_ + strch;
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
    if (string_len_check(document.getElementById(ID_temp).value, 20, ("DI" + strch[2] + "のタイトルは"), true) == false) return false;
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
    ID_temp = TWP8C_UNIT_ + strch;
    if (string_len_check(document.getElementById(ID_temp).value, 15, ("DI" + strch[2] + "の単位は"), true) == false) return false;

    //グラフの上限値
    ID_temp = TWP8C_GRAPHH_ + strch;
    var strGH = document.getElementById(ID_temp).value;
    if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "DI" + strch[2] + "のグラフ上限値は数値のみです。",
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
                text: "DI" + strch[2] + "のグラフ上限値を0より大きな値で入力してください。",
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
            var txtmess = "DI" + strch[2] + "のグラフ上限値は、次の範囲で入力してください。" +
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

    //警報値
    ID_temp = TWP8C_ALARMH_ + strch;
    var strAH = document.getElementById(ID_temp).value;
    if ((isNaN(strAH) == true) || (strAH.trim() == "")) {
        swal({
            title: "設定エラー！",
            text: "DI" + strch[2] + "の警報値は数値のみです。",
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
                text: "DI" + strch[2] + "の上限警報発生値を0より大きな値で入力してください。",
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
            var txtmess = "DI" + strch[2] + "の上限警報発生値は、次の範囲で入力してください。" +
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


/*  機能：  TWP8C設定の要求電文を送信
            ホストのアドレスを含まない
    引数：
            unitNo: 現在のユニットの順番
            e: 操作しているボータンID
    戻り値： 要求電文
*/
function set_twp8c_setting(unitNo, e) {
    var ch = e.target.id;
    var settingpoint = 4;
    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    // [DiCH]
    jsDat.DiCH = "000" + ch.toString(16).substr(-1);
    // [Title]
    jsDat.Title = chr2sjis(document.getElementById(TWP8C_TITLE_ + ch).value, 20);
    // [Multi]
    jsDat.Multi = ("0000" + document.getElementById(TWP8C_MULTI_ + ch).selectedIndex.toString(16)).substr(-4);
    // [Point]
    jsDat.Point = ("0000" + document.getElementById(TWP8C_DEC_ + ch).selectedIndex.toString(16)).substr(-4);
    // [Unit]
    jsDat.Unit = chr2sjis(document.getElementById(TWP8C_UNIT_ + ch).value, 10);
    // [GraphType]
    jsDat.GraphType = ("0000" + document.getElementById(TWP8C_GRAPHTYPE_ + ch).selectedIndex.toString(16)).substr(-4);
    // [GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(TWP8C_GRAPHH_ + ch).value, settingpoint);
    // [AlarmH]
    jsDat.AlarmH = dec2hex(document.getElementById(TWP8C_ALARMH_ + ch).value, settingpoint);
    // [AlarmHE]
    jsDat.AlarmHE = ((document.getElementById(TWP8C_ALARMHE_ + ch).checked == true) ? 1 : 0);
    // [SendMailE]
    jsDat.SendMailE = ((document.getElementById(TWP8C_LMALARME + ch).checked == true) ? 1 : 0);
    jsDat.StateToOnSendMailE = ((document.getElementById(TWP8C_LSTATETOONMALARME + ch).checked == true) ? 1 : 0);
    jsDat.StateToOffSendMailE = ((document.getElementById(TWP8C_LSTATETOOFFMALARME + ch).checked == true) ? 1 : 0);

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);

}

/**
* TWP8Cの設定値を表示、瞬時値を更新
*/
function get_InsDatTWP8C(setting, unitNo, unitSts) {
    var isNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twp8cupdated_time").text("データ更新：----/--/-- --:--");
        // DI1~8
        for (var i = 1; i < 9; i++) {
            $(IDTWP8CVAL1CH + i).text("--");
            $(IDTWP8CSTATCH + i).html("");
            $(IDTWP8CSTATCH + i).removeClass("text-light shadow");
            $(IDTWP8CSTATCH + i).css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }

        var term = "#alertH_twp8c";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        for (var i = 0; i < 8; i++) {
            j = i + 1;
            $(IDTWP8C_TITLECH + j).html(setting.setting.diset[i].Title);
            $(IDTWP8C_ALARMCH + j).html("上限警報発生値：" + setting.setting.diset[i].Alarm[1].toFixed(setting.setting.diset[i].Point) + " [" + setting.setting.diset[i].Unit + "]");
            $(IDTWP8C_ALARMCH + j).addClass("border");

            //有無
            if ((setting.setting.diset[i].AlarmE[1] == 1) && (setting.setting.diset[i].GraphType == 0)) {
                $(IDTWP8C_ALARMCH + j).css({ "display": "block" });
            }
            else {
                $(IDTWP8C_ALARMCH + j).css({ "display": "none" });
            }

            $(IDTWP8C_GRPHUNIT + j).html(" [" + setting.setting.diset[i].Unit + "]");

            //瞬時値タイトル
            $('#' + "idtwp8cch" + (i + 1) + "title").text(setting.setting.diset[i].Title);
            $('#' + "idtwp8c_status_title_di" + (i + 1)).text(setting.setting.diset[i].Title);
        }
    }
    else {
        for (var i = 0; i < 8; i++) {
            var j = (i + 1).toString();
            $(IDTWP8C_TITLECH + j).html("--");
            $(IDTWP8C_ALARMCH + j).html("上限警報発生値：-- [--]");
            $(IDTWP8C_ALARMCH + j).addClass("border");
            $(IDTWP8C_GRPHUNIT + j).html(" [--]");
        }

        isNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (isNoRequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#twp8cupdated_time").text("データ更新：----/--/-- --:--");

                for (var i = 1; i < 9; i++) {
                    $(IDTWP8CVAL1CH + i).text("--");
                    $(IDTWP8CSTATCH + i).html("");
                    $(IDTWP8CSTATCH + i).removeClass("text-light shadow");
                    $(IDTWP8CSTATCH + i).css({
                        "color": DO_DI_ONOFF_TEXTCOLOR[0],
                        "background-color": DO_DI_ONOFF_BGCOLOR[2]
                    });
                }
            }
            else {
                var termdata;
                $("#twp8cupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                for (var i = 1; i < 9; i++) {
                    $(IDTWP8CVAL1CH + i).text(parseFloat(obj.Respons.Data.Di[i - 1].Value).toFixed(setting.setting.diset[i - 1].Point) + " [" + setting.setting.diset[i - 1].Unit + "]");
                    termdata = parseInt(obj.Respons.Data.Di[i - 1].State, 16);

                    //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
                    // xxxx xxxx 01xx xxxx
                    if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                        $(IDTWP8CSTATCH + i).html("OFF");
                        $(IDTWP8CSTATCH + i).removeClass("text-light shadow");
                        $(IDTWP8CSTATCH + i).css({
                            "color": DO_DI_ONOFF_TEXTCOLOR[0],
                            "background-color": DO_DI_ONOFF_BGCOLOR[0]
                        });
                    }

                    //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
                    // xxxx xxxx 10xx xxxx
                    else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                        $(IDTWP8CSTATCH + i).html("ON");
                        $(IDTWP8CSTATCH + i).addClass("text-light shadow");
                        $(IDTWP8CSTATCH + i).css({
                            "color": DO_DI_ONOFF_TEXTCOLOR[1],
                            "background-color": DO_DI_ONOFF_BGCOLOR[1]
                        });
                    }

                    //不明
                    // xxxx xxxx xx11 xxxx
                    // xxxx xxxx xx00 xxxx
                    else {
                        $(IDTWP8CSTATCH + i).html("--");
                        $(IDTWP8CSTATCH + i).removeClass("text-light shadow");
                        $(IDTWP8CSTATCH + i).css({
                            "color": DO_DI_ONOFF_TEXTCOLOR[0],
                            "background-color": DO_DI_ONOFF_BGCOLOR[2]
                        });
                    }
                }

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twp8c";
                var alert_str1 = "";
                var unknown = false;
                //DI
                for (var i = 0; i < 8 && alert_exist == 0; i++) {
                    if (obj.Respons.Data.Di[i].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data.Di[i].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = setting.setting.diset[i].Title;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = setting.setting.diset[i].Title;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = setting.setting.diset[i].Title;
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
            $("#twp8cupdated_time").text("データ更新：----/--/-- --:--");

            for (var i = 1; i < 9; i++) {
                $(IDTWP8CVAL1CH + i).text("--");
                $(IDTWP8CSTATCH + i).html("");
                $(IDTWP8CSTATCH + i).removeClass("text-light shadow");
                $(IDTWP8CSTATCH + i).css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }

            //警報状態
            term = "#alertH_twp8c";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
            $(HLRA4C4_DOVAL).html("--");
        }
    }, setting);
}


/* TWP8Cダイナミク瞬時データ表示作成 */
function fncTWP8CInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwp8ctitle" class="h5 m-0 ">twp8ctitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <td id="twp8cch1title" class="text-center table-active font-weight-bold">CH1</td> \
                            <td id="twp8cch1val2" colspan="2" class="text-right">--</td> \
                            <td id="twp8cch3title" class="text-center table-active font-weight-bold">CH3</td> \
                            <td id="twp8cch3val2" colspan="2" class="text-right">--</td> \
                            <td id="twp8cch5title" class="text-center table-active font-weight-bold">CH5</td> \
                            <td id="twp8cch5val2" colspan="2" class="text-right">--</td> \
                            <td id="twp8cch7title" class="text-center table-active font-weight-bold">CH7</td> \
                            <td id="twp8cch7val2" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="twp8cch2title" class="text-center table-active font-weight-bold">CH2</td> \
                            <td id="twp8cch2val2" colspan="2" class="text-right">--</td> \
                            <td id="twp8cch4title" class="text-center table-active font-weight-bold">CH4</td> \
                            <td id="twp8cch4val2" colspan="2" class="text-right">--</td> \
                            <td id="twp8cch6title" class="text-center table-active font-weight-bold">CH6</td> \
                            <td id="twp8cch6val2" colspan="2" class="text-right">--</td> \
                            <td id="twp8cch8title" class="text-center table-active font-weight-bold">CH8</td> \
                            <td id="twp8cch8val2" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
        <!-- DI ON/OFF --> \
        <div class="table-responsive row mx-0 my-0 px-1 py-1 border d-flex flex-wrap justify-content-around border-top-0 rounded-bottom"> \
            <div class="col-xl d-flex flex-row justify-content-md-around justify-content-xl-between"> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch1stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI1</div> \
                    <div id="twp8cch1stat" class="onoff_status text-center rounded-circle " style="background: #B4A2A2"></div> \
                </div> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch2stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI2</div> \
                    <div id="twp8cch2stat" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                </div> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch3stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI3</div> \
                    <div id="twp8cch3stat" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                </div> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch4stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI4</div> \
                    <div id="twp8cch4stat" class="onoff_status text-center rounded-circle " style="background: #B4A2A2"></div> \
                </div> \
            </div> \
            <div class="col-xl d-flex flex-row justify-content-md-around justify-content-xl-between"> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch5stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI5</div> \
                    <div id="twp8cch5stat" class="onoff_status text-center rounded-circle " style="background: #B4A2A2"></div> \
                </div> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch6stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI6</div> \
                    <div id="twp8cch6stat" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                </div> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch7stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI7</div> \
                    <div id="twp8cch7stat" class="onoff_status text-center rounded-circle text-light " style="background: #B4A2A2"></div> \
                </div> \
                <div class="d-flex flex-row align-items-center ml-3"> \
                    <div id="twp8cch8stat_title" class="mt-2  mr-1 border rounded text-dark h6 p-1 text-center" style="min-width: 4rem;">DI8</div> \
                    <div id="twp8cch8stat" class="onoff_status text-center rounded-circle " style="background: #B4A2A2"></div> \
                </div> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idtwp8c/g, tvid + "idtwp8c");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");
    rtnval = rtnval.replace(/twp8cch/g, tvid + "twp8cch");
    rtnval = rtnval.replace(/twp8ctitlestring/g, title);

    return rtnval;
}

/**
 * TWP8Cの設定値を表示する
 * 
 */
function twp8c_loaddata_setting(obj) {
    var settingpoint = 4;

    if (obj.Status == 200) {
        var j;
        for (var i = 0; i < 8; i++) {
            //1～8
            j = "ch" + (i + 1).toString();
            // タイトル
            $("#" + TWP8C_TITLE_ + j).val(jis2chr(obj.Respons.Di[i].Title));
            // 乗数
            document.getElementById(TWP8C_MULTI_ + j).selectedIndex = parseInt(obj.Respons.Di[i].Multi, 16);
            // 少数点以下桁数
            document.getElementById(TWP8C_DEC_ + j).selectedIndex = obj.Respons.Di[i].Point;
            // 単位
            $("#" + TWP8C_UNIT_ + j).val(jis2chr(obj.Respons.Di[i].Unit));
            // グラフ種類
            document.getElementById(TWP8C_GRAPHTYPE_ + j).selectedIndex = parseInt(obj.Respons.Di[i].GraphType, 16);
            // グラフH
            $("#" + TWP8C_GRAPHH_ + j).val(obj.Respons.Di[i].Graph[1].toFixed(settingpoint));
            // 警報上限値
            $("#" + TWP8C_ALARMH_ + j).val(obj.Respons.Di[i].Alarm[1].toFixed(settingpoint));
            // 警報上限値有無
            document.getElementById("" + TWP8C_ALARMHE_ + j).checked = (obj.Respons.Di[i].AlarmE[1]);
            //接点入力回数変化
            document.getElementById(TWP8C_LMALARME + j).checked = (obj.Respons.Di[i].SendMailE);
            document.getElementById(TWP8C_LSTATETOONMALARME + j).checked = (obj.Respons.Di[i].StateToOnSendMailE);
            document.getElementById(TWP8C_LSTATETOOFFMALARME + j).checked = (obj.Respons.Di[i].StateToOffSendMailE);
        }

    } else {
        //Debug
    }
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataTwp8c(twp8csetting, tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        for (var i = 1; i < 9; i++) {
            $('#' + tvid + "twp8cch" + i + "val1").text("--");
            $('#' + tvid + "twp8cch" + i + "val2").text("--");
            $('#' + tvid + "twp8cch" + i + "stat").html("");
            $('#' + tvid + "twp8cch" + i + "stat").removeClass("text-light shadow");
            $('#' + tvid + "twp8cch" + i + "stat").css({
                "color": DO_DI_ONOFF_TEXTCOLOR[0],
                "background-color": DO_DI_ONOFF_BGCOLOR[2]
            });
        }
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {
        var termdata;
        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));

        for (var i = 1; i < 9; i++) {
            $('#' + tvid + "twp8cch" + i + "val2").text(parseFloat(realtimeObj.Data.Di[i - 1].Value).toFixed(twp8csetting.setting.diset[i - 1].Point) + " [" + twp8csetting.setting.diset[i - 1].Unit + "]");
            termdata = parseInt(realtimeObj.Data.Di[i - 1].State, 16);

            //OFF状態： OFFフラグ ＝ 1, ONフラグ ＝ 0
            // xxxx xxxx 01xx xxxx
            if (((termdata & 64) == 64) && ((termdata & 128) == 0)) {
                $('#' + tvid + "twp8cch" + i + "stat").html("OFF");
                $('#' + tvid + "twp8cch" + i + "stat").removeClass("text-light shadow");
                $('#' + tvid + "twp8cch" + i + "stat").css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[0]
                });
            }
            //ON状態： OFFフラグ ＝ 0, ONフラグ ＝ 1
            // xxxx xxxx 10xx xxxx
            else if (((termdata & 64) == 0) && ((termdata & 128) == 128)) {
                $('#' + tvid + "twp8cch" + i + "stat").html("ON");
                $('#' + tvid + "twp8cch" + i + "stat").addClass("text-light shadow");
                $('#' + tvid + "twp8cch" + i + "stat").css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[1],
                    "background-color": DO_DI_ONOFF_BGCOLOR[1]
                });
            }
            //不明
            // xxxx xxxx xx11 xxxx
            // xxxx xxxx xx00 xxxx
            else {
                $('#' + tvid + "twp8cch" + i + "stat").html("--");
                $('#' + tvid + "twp8cch" + i + "stat").removeClass("text-light shadow");
                $('#' + tvid + "twp8cch" + i + "stat").css({
                    "color": DO_DI_ONOFF_TEXTCOLOR[0],
                    "background-color": DO_DI_ONOFF_BGCOLOR[2]
                });
            }
        }

    }

}

/**
* Group+AllDisplayにTWP8Cの設定値を表示、瞬時値を更新
*/
function fncTW8CDspData(tvid, unitNo, isUnitChg, twp8csetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twp8c_set_tmp = [
            {
                "Title": "CH1",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH2",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH3",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH4",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH5",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH6",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH7",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            {
                "Title": "CH8",
                "Multi": 1,
                "Point": 1,
                "Unit": "--",
                "GraphType": 0,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            }
        ];
        twp8csetting.setting = { "diset": twp8c_set_tmp };

        for (var i = 0; i < 8; i++) {
            twp8csetting.setting.diset[i].Title = jis2chr(settingObj.Di[i].Title);
            twp8csetting.setting.diset[i].Multi = settingObj.Di[i].Multi;
            twp8csetting.setting.diset[i].Point = settingObj.Di[i].Point;
            twp8csetting.setting.diset[i].Unit = jis2chr(settingObj.Di[i].Unit);
            twp8csetting.setting.diset[i].GraphType = parseInt(settingObj.Di[i].GraphType, 16);
            twp8csetting.setting.diset[i].Graph[0] = settingObj.Di[i].Graph[0];
            twp8csetting.setting.diset[i].Graph[1] = settingObj.Di[i].Graph[1];
            twp8csetting.setting.diset[i].Alarm[0] = settingObj.Di[i].Alarm[0];
            twp8csetting.setting.diset[i].Alarm[1] = settingObj.Di[i].Alarm[1];
            twp8csetting.setting.diset[i].AlarmE[0] = settingObj.Di[i].AlarmE[0];
            twp8csetting.setting.diset[i].AlarmE[1] = settingObj.Di[i].AlarmE[1];

            $('#' + tvid + "twp8cch" + (i + 1) + "title").text(twp8csetting.setting.diset[i].Title);
            // DI状態のタイトル
            $('#' + tvid + "twp8cch" + (i + 1) + "stat_title").text(twp8csetting.setting.diset[i].Title);
        }

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(twp8csetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twp8csetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTwp8c(twp8csetting, tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancetwp8c(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTwp8c(twp8csetting, tvid, realtimeObj);
        }
    }
    else {
        if (twp8csetting.setting !== null) {
            for (var i = 1; i < 9; i++) {
                // 瞬時値タイトル
                $('#' + tvid + "twp8cch" + i + "title").text(twp8csetting.setting.diset[i - 1].Title);
                // DI状態のタイトル
                $('#' + tvid + "twp8cch" + i + "stat_title").text(twp8csetting.setting.diset[i - 1].Title);
            }
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twp8csetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTwp8c(twp8csetting, tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, twp8csetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancetwp8c(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataTwp8c(twp8csetting, tvid, obj.Respons);

        }, twp8csetting);
    }
}

/**
 * hlr instance save
 */
function fncDoSaveInstancetwp8c(obj, unitNo, gwid) {
    var retobj = [];
    if (obj.Status == 200) {
        if (obj.Respons.Data == null) {
            retobj = null;
        }
        else {
            var dataobj = [];
            var tmpVal = [];
            for (var i = 0; i < 8; i++) {
                var strprop = "di" + (i + 1).toString();
                tmpVal[strprop] = obj.Respons.Data.Di[i];
            }
            dataobj["Data"] = tmpVal;
            dataobj["Time"] = obj.Respons.Time;
            dataobj["RSSI"] = obj.Respons.RSSI;
            dataobj["Flag"] = obj.Respons.Flag;
            retobj["Respons"] = dataobj;
            retobj["Status"] = obj.Status;
        }

    }
    else {
        retobj = null;
    }

    fncSaveInstanceforCombiGraph(retobj, unitNo, gwid);
}

/**
* TWP8Cのグラフを更新
*/
function twp8c_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // Graph date
    twp8c_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        twp8c_graph_time1.length = 0;
        twp8c_graph_time2.length = 0;
        twp8c_graph_time3.length = 0;
        twp8c_graph_time4.length = 0;
        twp8c_graph_time5.length = 0;
        twp8c_graph_time6.length = 0;
        twp8c_graph_time7.length = 0;
        twp8c_graph_time8.length = 0;
        //DI1～DI7
        twp8c_graph_data_di1.length = 0;
        twp8c_graph_data_di2.length = 0;
        twp8c_graph_data_di3.length = 0;
        twp8c_graph_data_di4.length = 0;
        twp8c_graph_data_di5.length = 0;
        twp8c_graph_data_di6.length = 0;
        twp8c_graph_data_di7.length = 0;
        twp8c_graph_data_di8.length = 0;

        twp8c_graph_time1.length = 0;
        twp8c_graph_time2.length = 0;
        twp8c_graph_time3.length = 0;
        twp8c_graph_time4.length = 0;
        twp8c_graph_time5.length = 0;
        twp8c_graph_time6.length = 0;
        twp8c_graph_time7.length = 0;
        twp8c_graph_time8.length = 0;

        //データ格納
        // DI1
        for (var i = 0; i < obj.Respons.Di1.Num; i++) {
            //時間
            twp8c_graph_time1[i] = moment(obj.Respons.Di1.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di1.Data[i].RSSI) == 0) {
                twp8c_graph_data_di1[i] = null;
            }
            //データがある
            else {
                twp8c_graph_data_di1[i] = obj.Respons.Di1.Data[i].Value;
            }
        }

        // DI2
        for (var i = 0; i < obj.Respons.Di2.Num; i++) {
            //時間
            twp8c_graph_time2[i] = moment(obj.Respons.Di2.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di2.Data[i].RSSI) == 0) {
                twp8c_graph_data_di2[i] = null;
            }
            //データがある
            else {
                //DI1～DI8
                twp8c_graph_data_di2[i] = obj.Respons.Di2.Data[i].Value;
            }
        }

        // DI3
        for (var i = 0; i < obj.Respons.Di3.Num; i++) {
            //時間
            twp8c_graph_time3[i] = moment(obj.Respons.Di3.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Di3.Data[i].RSSI) == 0) {
                twp8c_graph_data_di3[i] = null;
            }
            //データがある
            else {
                //DI1～DI8
                twp8c_graph_data_di3[i] = obj.Respons.Di3.Data[i].Value;
            }
        }

        // DI4
        for (var i = 0; i < obj.Respons.Di4.Num; i++) {
            //時間
            twp8c_graph_time4[i] = moment(obj.Respons.Di4.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
           
            //データが無い場合
            if (parseInt(obj.Respons.Di4.Data[i].RSSI) == 0) {
                twp8c_graph_data_di4[i] = null;
            }
            //データがある
            else {
                //DI1～DI8
                twp8c_graph_data_di4[i] = obj.Respons.Di4.Data[i].Value;
            }
        }

        // DI5
        for (var i = 0; i < obj.Respons.Di5.Num; i++) {
            //時間
            twp8c_graph_time5[i] = moment(obj.Respons.Di5.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
           
            //データが無い場合
            if (parseInt(obj.Respons.Di5.Data[i].RSSI) == 0) {
                //DI1～DI8
                twp8c_graph_data_di5[i] = null;
            }
            //データがある
            else {
                //DI1～DI8
                twp8c_graph_data_di5[i] = obj.Respons.Di5.Data[i].Value;
            }
        }

        //データ格納
        // DI6
        for (var i = 0; i < obj.Respons.Di6.Num; i++) {
            //時間
            twp8c_graph_time6[i] = moment(obj.Respons.Di6.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
           
            //データが無い場合
            if (parseInt(obj.Respons.Di6.Data[i].RSSI) == 0) {
                twp8c_graph_data_di6[i] = null;
            }
            //データがある
            else {
                twp8c_graph_data_di6[i] = obj.Respons.Di6.Data[i].Value;
            }
        }

        //データ格納
        // DI7
        for (var i = 0; i < obj.Respons.Di7.Num; i++) {
            //時間
            twp8c_graph_time7[i] = moment(obj.Respons.Di7.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
           
            //データが無い場合
            if (parseInt(obj.Respons.Di7.Data[i].RSSI) == 0) {
                twp8c_graph_data_di7[i] = null;
            }
            //データがある
            else {
               twp8c_graph_data_di7[i] = obj.Respons.Di7.Data[i].Value;
            }
        }

        //データ格納
        // DI8
        for (var i = 0; i < obj.Respons.Di8.Num; i++) {
            //時間
            twp8c_graph_time8[i] = moment(obj.Respons.Di8.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
           
            //データが無い場合
            if (parseInt(obj.Respons.Di8.Data[i].RSSI) == 0) {
                twp8c_graph_data_di8[i] = null;
            }
            //データがある
            else {
                twp8c_graph_data_di8[i] = obj.Respons.Di8.Data[i].Value;
            }
        }


        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (twp8c_graph_exist == false) {
            twp8c_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            twp8c_graph_exist = true;
        }
        else {
            twp8c_update_graph(setdata);
        }


        /* graph data update */
        document.getElementById("idtwp8cgraphtimedi1").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi2").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi3").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi4").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi5").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi6").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi7").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi8").innerHTML = twp8c_graph_date;

    }
    else if (obj.Status == 400) {
        //DI1～DI8
        twp8c_graph_data_di1[i] = null;
        twp8c_graph_data_di2[i] = null;
        twp8c_graph_data_di3[i] = null;
        twp8c_graph_data_di4[i] = null;
        twp8c_graph_data_di5[i] = null;
        twp8c_graph_data_di6[i] = null;
        twp8c_graph_data_di7[i] = null;
        twp8c_graph_data_di8[i] = null;

        twp8c_graph_dat_num = 0;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (twp8c_graph_exist == false) {
            twp8c_draw_graph(setdata);
            //グラフオブジェクトが作成済み
            twp8c_graph_exist = true;
        }
        else {
            twp8c_update_graph(setdata);
        }

        /* graph data update */
        document.getElementById("idtwp8cgraphtimedi1").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi2").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi3").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi4").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi5").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi6").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi7").innerHTML = twp8c_graph_date;
        document.getElementById("idtwp8cgraphtimedi8").innerHTML = twp8c_graph_date;
    }
    else {

    }
}

/*  機能：  AD、DI、DOのグラフを描画  
    */
function twp8c_draw_graph(setting) {
    //             CANVAS 2d content オブジェクトを取得   グラフ用
    //DI
    var canvas_di1 = document.getElementById("chart10").getContext("2d");
    var canvas_di2 = document.getElementById("chart11").getContext("2d");
    var canvas_di3 = document.getElementById("chart12").getContext("2d");
    var canvas_di4 = document.getElementById("chart13").getContext("2d");
    var canvas_di5 = document.getElementById("chart14").getContext("2d");
    var canvas_di6 = document.getElementById("chart15").getContext("2d");
    var canvas_di7 = document.getElementById("chart16").getContext("2d");
    var canvas_di8 = document.getElementById("chart17").getContext("2d");

    //DI                             グラフを描画 
    twp8c_chart_di1 = twp8c_draw_graph_di(canvas_di1, twp8c_graph_time1, twp8c_graph_data_di1, twp8c_graph_time1.length, setting.setting.diset[0]);
    twp8c_chart_di2 = twp8c_draw_graph_di(canvas_di2, twp8c_graph_time2, twp8c_graph_data_di2, twp8c_graph_time2.length, setting.setting.diset[1]);
    twp8c_chart_di3 = twp8c_draw_graph_di(canvas_di3, twp8c_graph_time3, twp8c_graph_data_di3, twp8c_graph_time3.length, setting.setting.diset[2]);
    twp8c_chart_di4 = twp8c_draw_graph_di(canvas_di4, twp8c_graph_time4, twp8c_graph_data_di4, twp8c_graph_time4.length, setting.setting.diset[3]);
    twp8c_chart_di5 = twp8c_draw_graph_di(canvas_di5, twp8c_graph_time5, twp8c_graph_data_di5, twp8c_graph_time5.length, setting.setting.diset[4]);
    twp8c_chart_di6 = twp8c_draw_graph_di(canvas_di6, twp8c_graph_time6, twp8c_graph_data_di6, twp8c_graph_time6.length, setting.setting.diset[5]);
    twp8c_chart_di7 = twp8c_draw_graph_di(canvas_di7, twp8c_graph_time7, twp8c_graph_data_di7, twp8c_graph_time7.length, setting.setting.diset[6]);
    twp8c_chart_di8 = twp8c_draw_graph_di(canvas_di8, twp8c_graph_time8, twp8c_graph_data_di8, twp8c_graph_time8.length, setting.setting.diset[7]);
}

/*  機能：  DI用のグラフを描画
            "chartjs.js"ライブラリを使用して、グラフを描画
    引数： 
            ctx：       canvas 2d content オブジェクト
            data_x：    時間
            data_y：    計測値
            data_num：  データ数
            di_setting：DIの設定値
    戻り値： グラフオブジェクト
*/
function twp8c_draw_graph_di(ctx, data_x, data_y, data_num, di_setting) {
    var grptype;
    var tmpdatashet;
    var data_y_time = [];
    var data_y_warnH = [];
    var min, max;
    var tmpxAxes;
    var labeltime = [];

    min = gGraphStartTime;
    max = gGraphEndTime;

    if (di_setting.GraphType == 0) {
        for (i = 0; i < data_num; i++) {
            labeltime[i] = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            data_y_time[i] = { x: (data_x[i]), y: data_y[i] };
        }
    
        data_y_warnH[0] = { x: (min), y: di_setting.Alarm[1] };
        data_y_warnH[1] = { x: (max), y: di_setting.Alarm[1] };
        grptype = 'line';
        labeltime = null;
        if (di_setting.AlarmE[1] == 1) {
            tmpdatashet = [{
                data: data_y_time,
                //データポイントの設定
                pointRadius: 1.5,
                pointHitRadius: 3,
                pointHoverBorderWidth: 2,
                //ラインの設定
                lineTension: 0,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                //データがNULLなら表示しない
                spanGaps: false,
                //ラインの下に着色しない
                fill: false,
                showLine: gShowLineFlg
            },
            {
                data: data_y_warnH,
                //データポイントの設定          表示しない
                pointRadius: 0,
                pointHoverRadius: 0,
                pointHitRadius: 0,
                //ラインの設定
                backgroundColor: "rgba(0,0,0,0.2)",
                borderColor: "#EB5757",
                borderWidth: 2,
                //ラインの下に着色しない
                type: 'line',
                fill: false
            }
            ];
        }
        else {
            tmpdatashet = [{
                data: data_y_time,
                //データポイントの設定
                pointRadius: 1.5,
                pointHitRadius: 3,
                pointHoverBorderWidth: 2,
                //ラインの設定
                lineTension: 0,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 2,
                //データがNULLなら表示しない
                spanGaps: false,
                //ラインの下に着色しない
                fill: false,
                showLine: gShowLineFlg
            }]
        }

        if (iperiodtime <= 6){
            stime = "HH:mm"
        }else{
            stime = "MM/DD"
        }

        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 31,
                max: max,
                min: min
            },

            scaleLabel: {
                display: true
            },
            type: "time",
            time: {
                unit: "minute",
                displayFormats: {
                    minute: stime
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"

        }];
    }
    else {
        if (iperiodtime <= 6){
            // 瞬時値を格納する
            for (i = 0; i < data_num; i++) {
                labeltime[i] = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
                data_y_time[i] = { x: data_x[i], y: data_y[i] };
            }
        }else{
            for (i = 0; i < data_num; i++) {
                labeltime[i] = ("00" + (moment(data_x[i]).month()+1).toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2);
                data_y_time[i] = { x: data_x[i], y: data_y[i] };
            }
        }
        // Check sabun value before draw
        let dataLen = data_y_time.length;
        for (i = 0; i < dataLen; i++) {
            // Why did set sabun value = null!!
            if (data_y_time[i].y === null) {
                data_y_time[i].y = "0";
            }
            else if (Number(data_y_time[i].y) > di_setting.Graph[1] * 1.5) {
                data_y_time[i].y = (di_setting.Graph[1] * 1.5).toFixed(di_setting.Point);
            }
        }
        grptype = 'bar';
        /* 警報上限値の有効にチェックが入っていても、警報上限値のラインもグラフに描画しない。 */
        tmpdatashet = [{
            labels: labeltime,
            data: data_y_time,
            //データポイントの設定
            pointRadius: 1.5,
            pointHitRadius: 3,
            pointHoverBorderWidth: 2,
            //ラインの設定
            lineTension: 0,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2,
            //データがNULLなら表示しない
            spanGaps: false,
            //ラインの下に着色しない
            fill: false
        }];

        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 31
            }
        }];

    }

    // Scale decimals points
    var decpnt = di_setting.Point;

    //グラフオブジェクトを作成
    var myChart = new Chart(ctx, {
        type: grptype,
        data: {
            //横軸のデータ
            labels: labeltime,
            datasets: tmpdatashet
        },
        options: {
            //すぐに描画
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            //ラインのラベルを表示しない
            legend: {
                display: false
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return tooltipItem.yLabel.toFixed(decpnt);
                    },
                },
            },
            //軸の設定
            scales: {
                xAxes: tmpxAxes,
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: di_setting.Graph[1],

                        callback: function (label, index, labels) {
                            return label.toFixed(decpnt);
                        }
                    }
                }]
            },
            Responsive: true,
            maintainAspectRatio: false
        }
    });

    return myChart;
}


/*  機能：  DIのグラフを更新
    引数：  
            myChart：   グラフオブジェクト
            data_x：    横軸のデータ        時間
            data_y：    縦軸のデータ
            data_num：  データ数
            di_setting：設定値
*/
function twp8c_graph_di_update(myChart, data_x, data_y, data_num, di_setting) {
    var data_y_time = [];
    var data_y_warnH = [];
    var min, max;
    var labeltime = [];

    min = gGraphStartTime;
    max = gGraphEndTime;

    if (di_setting.GraphType == 0) {
        for (i = 0; i < data_num; i++) {
            labeltime[i] = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            data_y_time[i] = { x: (data_x[i]), y: data_y[i] };
        }
    
        if (iperiodtime <= 6){
            stime = "HH:mm"
        }else{
            stime = "MM/DD"
        }

        // 線を繋がる事を更新する
        myChart.data.datasets[0].showLine = gShowLineFlg;

        data_y_warnH[0] = { x: (min), y: di_setting.Alarm[1] };
        data_y_warnH[1] = { x: (max), y: di_setting.Alarm[1] };

        //横軸のデータ          時間
        //縦軸のデータ          カウンター値
        myChart.data.datasets[0].data = data_y_time;

        //グラフタイプ
        if (di_setting.AlarmE[1] == 1) {
            myChart.data.datasets[1].data = data_y_warnH;
        }
        else {

        }

        //グラフ上限
        myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];

        //時軸
        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 31,
                max: max,
                min: min
            },
    
            scaleLabel: {
                display: true
            },
            type: "time",
            time: {
                unit: "minute",
                displayFormats: {
                    minute: stime
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"
        }];

        myChart.options.scales.xAxes = tmpxAxes;

        

        //グラフを更新
        myChart.update();
    }
    else {
        if (iperiodtime <= 6){
            // 瞬時値を格納する
            for (i = 0; i < data_num; i++) {
                labeltime[i] = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
                data_y_time[i] = { x: data_x[i], y: data_y[i] };
            }
        }else{
            for (i = 0; i < data_num; i++) {
                labeltime[i] = ("00" + (moment(data_x[i]).month()+1).toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2);
                data_y_time[i] = { x: data_x[i], y: data_y[i] };
            }
        }
        //横軸のデータ          時間
        myChart.data.labels = labeltime;

        myChart.update();

        //縦軸のデータ          カウンター値
        // Check sabun value before draw
        let dataLen = data_y_time.length;
        for (i = 0; i < dataLen; i++) {
            // Why did set sabun value = null!!
            if (data_y_time[i].y === null) {
                data_y_time[i].y = "0";
            }
            else if (Number(data_y_time[i].y) > di_setting.Graph[1] * 1.5) {
                data_y_time[i].y = (di_setting.Graph[1] * 1.5).toFixed(di_setting.Point);
            }
        }

        myChart.update();

        myChart.data.datasets[0].data = data_y_time;

        myChart.update();

        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 31
            }
        }];

        myChart.options.scales.xAxes = tmpxAxes;

        myChart.update();

        //グラフ上限
        myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];

        //グラフを更新
        myChart.update();
    }
}


/*  機能：  AD、DI、電波強度のグラフを更新
*/
function twp8c_update_graph(setting) {
    //DI
    twp8c_graph_di_update(twp8c_chart_di1, twp8c_graph_time1, twp8c_graph_data_di1, twp8c_graph_time1.length, setting.setting.diset[0]);
    twp8c_graph_di_update(twp8c_chart_di2, twp8c_graph_time2, twp8c_graph_data_di2, twp8c_graph_time2.length, setting.setting.diset[1]);
    twp8c_graph_di_update(twp8c_chart_di3, twp8c_graph_time3, twp8c_graph_data_di3, twp8c_graph_time3.length, setting.setting.diset[2]);
    twp8c_graph_di_update(twp8c_chart_di4, twp8c_graph_time4, twp8c_graph_data_di4, twp8c_graph_time4.length, setting.setting.diset[3]);
    twp8c_graph_di_update(twp8c_chart_di5, twp8c_graph_time5, twp8c_graph_data_di5, twp8c_graph_time5.length, setting.setting.diset[4]);
    twp8c_graph_di_update(twp8c_chart_di6, twp8c_graph_time6, twp8c_graph_data_di6, twp8c_graph_time6.length, setting.setting.diset[5]);
    twp8c_graph_di_update(twp8c_chart_di7, twp8c_graph_time7, twp8c_graph_data_di7, twp8c_graph_time7.length, setting.setting.diset[6]);
    twp8c_graph_di_update(twp8c_chart_di8, twp8c_graph_time8, twp8c_graph_data_di8, twp8c_graph_time8.length, setting.setting.diset[7]);
}

// TWP8C設定画面を表示
function dispTwp8c() {
    document.getElementById("rstype_twp8c").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_twp8c').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_twp8c').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}



