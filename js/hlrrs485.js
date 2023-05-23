/*version=1.06*/
// Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->


/**
 * HLR-RS485データ表示
 */

//DI
var hlrrs485_chart_dbm;
var hlrrs485_graph_exist = false;

//グラフ用の時間配列
var hlrrs485_graph_time = [];
var hlrrs485_graph_date;

//DIグラフ用のデータ配列
var hlrrs485_graph_data_dbm = [];

/* 
 機能：  グラフデータを格納する
*/
function hlrrs485_get_graph_data(obj) {
    // グラフ日付作成
    hlrrs485_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //サーバーへ要求を送信して、受信データをJSON型に変換
    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        hlrrs485_graph_time.length = 0;
        //強度
        hlrrs485_graph_data_dbm.length = 0;

        //データ格納
        for (var i = 0; i < obj.Respons.RSSI.Num; i++) {
            //時間          "分：秒"
            hlrrs485_graph_time[i] = moment(obj.Respons.RSSI.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                
            //データが無い場合
            if (parseInt(obj.Respons.RSSI.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                hlrrs485_graph_data_dbm[i] = null;
            }
            //データがある
            else {
                //dbm
                hlrrs485_graph_data_dbm[i] = obj.Respons.RSSI.Data[i].RSSI;
            }
        }

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlrrs485_graph_exist == false) {
            hlrrs485_draw_graph();
            //グラフオブジェクトが作成済み
            hlrrs485_graph_exist = true;
        }
        else {
            hlrrs485_update_graph();
        }
        /* graph data update */
        document.getElementById("idhlrrs485graphtimedbm").innerHTML = hlrrs485_graph_date;

    }
    else if (obj.Status == 400) {
        //DI1～DI8
        hlrrs485_graph_data_dbm[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        if (hlrrs485_graph_exist == false) {
            hlrrs485_draw_graph();
            //グラフオブジェクトが作成済み
            hlrrs485_graph_exist = true;
        }
        else {
            hlrrs485_update_graph();
        }

        /* graph data update */
        document.getElementById("idhlrrs485graphtimedbm").innerHTML = hlrrs485_graph_date;
    }
    else {

    }
}

/* 
 機能：  グラフを描画  
*/
function hlrrs485_draw_graph() {
    // CANVAS 2d content オブジェクトを取得   グラフ用
    var canvas_dbm = document.getElementById("charthlrrs485dbm").getContext("2d");
    // グラフを描画 
    hlrrs485_chart_dbm = draw_graph_dbm(canvas_dbm, hlrrs485_graph_time, hlrrs485_graph_data_dbm);
}


/*  機能： 電波強度のグラフを更新
*/
function hlrrs485_update_graph() {
    //dbm
    graph_dbm_update(hlrrs485_chart_dbm, hlrrs485_graph_time, hlrrs485_graph_data_dbm);
}

/**
 * hrl-rs485 グラフデータクリア
 */
function clear_grp_hlr_rs485() {
    hlrrs485_graph_time.length = 0
    hlrrs485_graph_data_dbm.length = 0

    if (hlrrs485_graph_exist == true) {
        hlrrs485_chart_dbm.destroy();
        hlrrs485_graph_exist = false
    }

    var term = "#alertH_hlrrs485";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");

    $("#idhlrrs485valdbm").html("--");
    $("#hlrrs485updated_time").text("データ更新：----/--/-- --:--");
}

/**
 * HLR-RS485 instance setting display
 */
function displayhlrrs485setting(setdata) {
    // 設定値データを表示させる
    if (setdata.setting !== null) {
        //dBmのタイトル
        var term2 = jis2chr(setdata.setting.rssi.Title);
        $('#idhlrrs485dbm_title').html(term2);
        $('#idhlrrs485grpdbm_title').html(term2);
    }
    else {
        $('#idhlrrs485dbm_title').html('--');
        $('#idhlrrs485grpdbm_title').html('--');
    }
}

/**
* HLR-RS485データ要求
*/
function get_InsDatHLRRS485(setting, unitNo, unitSts) {
    var isNoRequest = false;

    // 設定値を表示する
    displayhlrrs485setting(setting);

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#hlrrs485updated_time").text("データ更新：----/--/-- --:--");
        $("#idhlrrs485valdbm").html('--');

        var term = "#alertH_hlrrs485";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (isNoRequest == true) {
        return;
    }

    // 瞬時値を取得して、表示を更新する
    rs485_insread_data(unitNo, function (obj) {
        if (obj.Status == 200) {
            if (obj.Respons.Data == null) {
                $("#hlrrs485updated_time").text("データ更新：----/--/-- --:--");
                $("#idhlrrs485valdbm").html('--');
            }
            else {
                // 時間バーに更新
                $("#hlrrs485updated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                // 電波強度
                $("#idhlrrs485valdbm").html(obj.Respons.RSSI + " [dBm]");

                //警報状態
                var term = "#alertH_hlrrs485";
                $(term).removeClass("alert-success");
                $(term).removeClass("alert-danger");
                $(term).removeClass("alert-warning");
                $(term).addClass("alert-success");
                $(term).html("<strong>正常</strong>　");

            }

        }
        else if (obj.Status == 400) {
            $("#hlrrs485updated_time").text("データ更新：----/--/-- --:--");
            $("#idhlrrs485valdbm").html('--');

            //警報状態
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
        else {
            //obj !=200
        }
    });
}


/* HLR-RS485ダイナミク瞬時データ表示作成 */
function fncHlrRs485InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
            <h4 id="idhlrtitle" class="h5 m-0">hlrtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-3"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <th id="idrs485dbm_title" class="text-center table-active" style="width:6rem" >電波強度</th> \
                            <td id="idvaldbm" class="text-right">--</td> \
                        </tr> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/idhlr/g, tvid + "idhlr");
    rtnval = rtnval.replace(/idvaldbm/g, tvid + "idvaldbm");
    rtnval = rtnval.replace(/idrs485dbm_title/g, tvid + "idrs485dbm_title");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");
    rtnval = rtnval.replace(/hlrtitlestring/g, title);

    return rtnval;
}

/**
* HLR RS485 Data display clear
*/
function fncHlrRs485DspData(tvid, UnitNo, isUnitChg, hlrsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        // Save Setting Data for Combine Graph
        var setobj = [];
        // rssi
        var rssi = {
            Title: chr2sjis("電波強度"),
            Unit: chr2sjis("dBm"),
            Graph: [-140, 0],
            Point: 0
        };

        hlrsetting.setting = { "rssi": rssi };

        hlrsetting.setting.rssi.Title = (settingObj) ? (settingObj.RSSI_Title) : '';

        // dBmのタイトル表示
        $('#' + tvid + "idrs485dbm_title").text(jis2chr(hlrsetting.setting.rssi.Title));

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(hlrsetting.type, settingObj, UnitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);

            // 瞬時値を表示する
            $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
            $('#' + tvid + "idvaldbm").text("--");
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncDoSaveInstancehlrrs485(tmpObj, UnitNo, gintIotGatewayId);

            // 瞬時値を表示する
            $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
            $('#' + tvid + "idvaldbm").text(realtimeObj.RSSI + " [dBm]");
        }

    }
    else {
        if (hlrsetting.setting !== null) {
            // rssi
            $('#' + tvid + "idrs485dbm_title").text(jis2chr(hlrsetting.setting.rssi.Title));
        }

        if((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)){
            // 瞬時値を表示する
            $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
            $('#' + tvid + "idvaldbm").text("--");

            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, UnitNo, gintIotGatewayId);
            return;
        }

        rs485_insread_data(UnitNo, function (obj) {
            // Save Instance Data for Combine Graph
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlrrs485(obj, UnitNo, gintIotGatewayId);
            }

            if (obj.Status == 200) {
                $('#' + tvid + "updated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $('#' + tvid + "idvaldbm").text(obj.Respons.RSSI + " [dBm]");
            }
            else {
                $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
                $('#' + tvid + "idvaldbm").text("--");
            }


        });

    }
}

/**
 * hlr-RS485 instance save
 */
function fncDoSaveInstancehlrrs485(obj, UnitNo, gwid) {
    // Save Instance Data for Combine Graph
    var retobj = obj;
    if (obj.Status == 200) {
        if (obj.Respons.Data == null) {
            retobj = null;
        }
        else {
            var dataobj = [];
            retobj.Respons.Data["rssi"] = { Value: obj.Respons.RSSI };

            dataobj["Time"] = obj.Respons.Time;
            dataobj["RSSI"] = obj.Respons.RSSI;
            retobj["Status"] = obj.Status;
        }
    }

    fncSaveInstanceforCombiGraph(retobj, UnitNo, gwid);
}                                

/**
 * HLR-A4C4の設定値を表示する
 * 
 */
function hlrrs485_dispdata_setting(obj) {
    //要求が成功する場合
    if (obj.Status == 200) {
        // dBmタイトル
        $("#hlrrs485_title_dbm").val(jis2chr(obj.Respons.RSSI_Title));

    } else {
        //Debug
        console.log(obj);
    }
}