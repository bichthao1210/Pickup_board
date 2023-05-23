/*version=1.02*/
// 2021/08/05
// HLR-C8-INとHR-C8-IN追加を対応

/* グロバール変数宣伝 */
var lstId = "Dummy";
var objTreeView = null;
var i, j, k, x = "";
var gcurgroupidx;
var gcurunitidx;
var gcurrsidx;
var gcrurbranch = 1;
var gActivedType = 0;    /* 選択したオブジェクトタイプ */
var gobjPreId;
var gobjSettingValue;
var gItemStatus = new Object;

// グラフ表示用の時間変数
var itime = 0;
var iminuteidx = 0;
var iminuteval = [0, 10, 20, 30, 40, 50];
var iperiodtime = 1;
var iperiodtimevalue = [10, 1, 2, 4, 6, 12, 24, 744];
var iperiodminutevalue = [10, 60, 120, 240, 360, 720, 1440, 44640];
var graphstepSize = [1, 10, 10, 30, 30, 60, 120, 7200];
var dropdowntime = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
var gShowLineFlg;
var gLoggingTime;
var gbtnID = 30;

// ストレージ容量逼迫時
var checkStorageLoop;
var gAutoClearStorage;
var objCSVSetting = null;

// インタバルクリア
var updateAlarmInterval = undefined;

$(function () {
    // DatePickerをデフォルトにセット
    $.datepicker.setDefaults($.datepicker.regional["ja"]);
    var daypicker = document.getElementsByName("datatimechange");
    for (var i = 0; i < daypicker.length; i++) {
        $('#' + daypicker[i].getAttribute('id')).datepicker({
            changeMonth: true,
            changeYear: true,
            yearRange: "c-100:c+100",
            showButtonPanel: true,
            minDate: new Date(2013, 1 - 1, 1),
            maxDate: new Date(2999, 12 - 1, 31),
            onSelect: function (d, i) {
                if (d !== i.lastVal) {
                    fncUpdateGraphDay(this.value);
                }
            }
        });

        //$('#'+daypicker[i].getAttribute('id')).val($.datepicker.formatDate('yy/mm/dd', new Date()));
    }

    // url変更時、IoTゲートウェイIDを取得
    const gwId = locationChanged();

    // 初期化
    initIotGateway(gwId);

    /* 瞬時値要求 */
    fncInstallDataRead();

    // グラフタイマーバーリセット
    fncGraphTimerBarInit();

    // GRID
    if (gwId < 0) {
        initPickupBoard();
    }
});


// 今日を押す処理
$.datepicker._gotoToday = function (id) {
    var target = $(id);
    var inst = this._getInst(target[0]);
    var date = new Date();
    this._setDate(inst, date);
    this._hideDatepicker();
    fncUpdateGraphDay(moment(date).format('YYYY/MM/DD'));
};

function fncClearData() {
    gActivedType = 0;    /* 選択したオブジェクトタイプ */
    gcurgroupidx = 0;
    gcurunitidx = 0;
    gcurrsidx = 0;
    gcrurbranch = 1;
    gActivedType = 0;    /* 選択したオブジェクトタイプ */
    gobjPreId = null;
    gobjSettingValue = null;
    gItemStatus = new Object;
    gObjCombiGrahpSettingValue = [];

    gcombigraph_date = "";
    // gcombigraph_exist = false;
    gcombigraph_time = [];      //グラフ用の時間配列
    gcombigraph_data = [];      //ADグラフ用のデータ配列
    gcombigraph_dat_num = [];   //グラフ用のデータ数

    // gGraphE = false;                 //複合グラフがあるかどうかフラグ
    gCurCombiGrapIdx = 0;                   //現在の複合グラフのインデックス
    gCombiGraphLstId = "Dummy";                     //最後の複合グラフのID
    gCombiGraphCurId = "Dummy";                     //最後の複合グラフのID
    gCombiGraphListbyUnit = [];
    gObjCombiGraphInstanceVals = {};      //表示用の複合グラフの瞬時値
    gObjCombiGraphData = [];        //表示用の複合グラフのグラフ値
    gObjCombiGrahpStatus = [];
    lstId = "Dummy";
    objTreeView = null;

    // グラフデータクリア
    fncCombiGrpClr();
    
}

/**
* JQuery DOM loaded
*/
function initIotGateway(id) {
    // ツリービューとデータ内容をクリアする。
    fncClearMenu();

    // 前のデータをクリアする。
    fncClearData();

    // Tree view data update
    if (id >= 0) {
        fncIndexTreeViewUpdate();
    }

    // 表示メニュー
    initMenu(id);

    // メニューバーに時間を表示する
    get_time();

    // 組織名表面
    corp_name_disp();

    // // グラフタイマーバーリセット
    // fncGraphTimerBarInit();

    // ロギング時間を取得
    datalogging_get_data(function (obj) {
        if (obj.Status == 200) {
            gLoggingTime = obj.Respons.Index;
        }
        else {
            gLoggingTime = 0;
        }
    });

    //DIOボードを自動認識して表示するか否かを切り替えます。
    fncUpdateDIOBoardStatus();

    // 各GWツリーと状態を表示する
    update_alarm(fncDispGwNameMenu);

    // ピックアップサイバーメニュー
    apiPickup(showPickup);

    // /* 瞬時値要求 */
    // fncInstallDataRead();

    // // 30sごとに、警報を更新する
    // if (updateAlarmInterval !== undefined) {
    //     clearInterval(updateAlarmInterval);
    // }
    // updateAlarmInterval = setInterval(function () {
    //     update_alarm(fncAlarmShow);
    // }, FETCH_INTERVAL.TREEVIEW_STATUS);
}


/**
 * // DO ON ボタン
 */
var btndoon = document.getElementsByName("doon_button");
for (var i = 0; i < btndoon.length; i++) {
    btndoon[i].addEventListener("click", function (e) {
        var unit;
        /* グループ選択による処理 */
        switch (gActivedType) {
            case ActiveType.Atv_AllGroup:
                break;
            case ActiveType.Atv_Group:
                break;
            case ActiveType.Atv_Unit:
                unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitNo;
                switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode) {
                    case UnitCode.HLR_A4C4:
                        hlra4c4_doctrl_data(unit, "FF00");
                        break;
                    case UnitCode.HLR_C1:
                    case UnitCode.HLR_C2:
                        hlrc_doctrl_data(unit, "FF00", e);
                        break;
                    case UnitCode.HLR_C8_IN:
                    case UnitCode.HR_C8_IN:
                    case UnitCode.HLR_A8:
                        break;
                    default:
                        break;
                }
                break;
            case ActiveType.Atv_SubUnit:
                switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitTypeCode) {
                    case UnitCode.HR_A4C4:
                        //HR-A4C4
                        unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitNo;
                        hlra4c4_doctrl_data(unit, "FF00");
                        break;
                    case UnitCode.HR_A8:
                    case UnitCode.HR_C8_IN:
                    case UnitCode.TWPM_1P2W:
                    case UnitCode.TWPM_1P3W:
                    case UnitCode.TWPM_3P3W:
                    case UnitCode.TWPM_3P4W:
                    case UnitCode.TWP8C:
                    case UnitCode.XM2_1P2W:
                    case UnitCode.XM2_1P3W:
                    case UnitCode.XM2_3P3W:
                    case UnitCode.XM2_3P4W:
                    case UnitCode.XS2_1P2W:
                    case UnitCode.XS2_1P3W:
                    case UnitCode.XS2_3P3W:
                    case UnitCode.TWPS:
                    case UnitCode.TWPP:
                    case UnitCode.XM2_1P3W_Io_Ior:
                    case UnitCode.XM2_3P3W_Io_Ior:
                    case UnitCode.KMN1:
                    case UnitCode.KM50:
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

    });
}

/**
 * // DO OFF ボタン
 */
var btndooff = document.getElementsByName("dooff_button");
for (var i = 0; i < btndooff.length; i++) {
    btndooff[i].addEventListener("click", function (e) {
        var unit;
        /* グループ選択による処理 */
        switch (gActivedType) {
            case ActiveType.Atv_AllGroup:
                break;
            case ActiveType.Atv_Group:
                break;
            case ActiveType.Atv_Unit:
                unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitNo;
                switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode) {
                    case UnitCode.HLR_A4C4:
                        hlra4c4_doctrl_data(unit, "0000");
                        break;
                    case UnitCode.HLR_C1:
                    case UnitCode.HLR_C2:
                        hlrc_doctrl_data(unit, "0000", e);
                        break;
                    case UnitCode.HLR_C8_IN:
                    case UnitCode.HR_C8_IN:
                    case UnitCode.HLR_A8:
                        break;
                }
                break;
            case ActiveType.Atv_SubUnit:
                switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitTypeCode) {
                    case UnitCode.HR_A4C4:
                        //HR-A4C4
                        unit = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitNo;
                        hlra4c4_doctrl_data(unit, "0000");
                        break;
                    case UnitCode.HR_A8:
                    case UnitCode.HR_C8_IN:
                    case UnitCode.TWPM_1P2W:
                    case UnitCode.TWPM_1P3W:
                    case UnitCode.TWPM_3P3W:
                    case UnitCode.TWPM_3P4W:
                    case UnitCode.XM2_1P2W:
                    case UnitCode.XM2_1P3W:
                    case UnitCode.XM2_3P3W:
                    case UnitCode.XM2_3P4W:
                    case UnitCode.XS2_1P2W:
                    case UnitCode.XS2_1P3W:
                    case UnitCode.XS2_3P3W:
                    case UnitCode.TWP8C:
                    case UnitCode.TWPS:
                    case UnitCode.TWPP:
                    case UnitCode.XM2_1P3W_Io_Ior:
                    case UnitCode.XM2_3P3W_Io_Ior:
                    case UnitCode.KMN1:
                    case UnitCode.KM50:
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
    });

}

/**
 * 組織名にクリックされた時の処理
 */
var btnHakaruCom = document.getElementById("company_name_nav");
btnHakaruCom.addEventListener("click", function (e) {
    if (gintIotGatewayId < 0) {
        document.getElementById("mainAlarmShow").style.display = "block";
        document.getElementById("idgraphcontent").style.display = "none";
        document.getElementById("garphlist_content").style.display = "none";

        if (lstidGateway != "Dummy") {
            var eleLast = document.getElementById(lstidGateway);
            if (eleLast) {
                eleLast.classList.remove("active");
            }
        }

        // Deactive GraphCombine node tree
        if (gCombiGraphLstId != "Dummy") {
            var eleGrpLast = document.getElementById(gCombiGraphLstId);
            if (eleLast) {
                eleGrpLast.classList.remove("active");
                gCombiGraphLstId = "Dummy";
            }
        }
    } else {
        window.location = "../index.html";
    }
});

//GW名をクリックする処理
var iotgw_name = document.getElementById("iotgateway_name_nav");
iotgw_name.addEventListener("click", function (e) {
    document.getElementById("mainAlarmShow").style.display = "none";
    document.getElementById("device_path").innerHTML = "";
    document.getElementById("hlra4c4_content").style.display = "none";
    document.getElementById("hlrrs485_content").style.display = "none";
    document.getElementById("hlra1_content").style.display = "none";
    document.getElementById("hlrc1_content").style.display = "none";
    document.getElementById("hlrc2_content").style.display = "none";
    document.getElementById("hlrc8in_content").style.display = "none";
    document.getElementById("hlra8_content").style.display = "none";

    document.getElementById("twpm").style.display = "none";
    document.getElementById("twp8c").style.display = "none";
    document.getElementById("twpm_1p2w").style.display = "none";
    document.getElementById("twpm_1p3w").style.display = "none";
    document.getElementById("twpm_3p4w").style.display = "none";
    document.getElementById("twpp_content").style.display = "none";
    document.getElementById("xm2").style.display = "none";
    document.getElementById("xm2_1p2w").style.display = "none";
    document.getElementById("xm2_1p3w").style.display = "none";
    document.getElementById("xm2_3p4w").style.display = "none";
    document.getElementById("xs2").style.display = "none";
    document.getElementById("xs2_1p2w").style.display = "none";
    document.getElementById("xs2_1p3w").style.display = "none";
    document.getElementById("twps").style.display = "none";
    document.getElementById("xm2_1p3w_io_ior").style.display = "none";
    document.getElementById("xm2_3p3w_io_ior").style.display = "none";
    document.getElementById("kmn1").style.display = "none";
    document.getElementById("km50").style.display = "none";
    document.getElementById("kw1m").style.display = "none";
    document.getElementById("kw2g").style.display = "none";
    document.getElementById("emu4").style.display = "none";
    document.getElementById("idgroupcontent").style.display = "none";
    document.getElementById("idgroupcontent").innerHTML = "";
    document.getElementById("idcompanycontent").style.display = "block";
    document.getElementById("idgraphcontent").style.display = "block";
    document.getElementById("garphlist_content").style.display = "none";
    iotgw_name.classList.add("navbar-brand-active");
    // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

    grp_index_load_list(function (obj) {
        objTreeView = obj;
        gItemStatus = obj;
        fncMakeAlldataDspContent();
    });

    if (lstId != "Dummy") {
        var eleLast = document.getElementById(lstId);
        eleLast.classList.remove("active");
        lstId = "Dummy";
    }

    // Deactive GraphCombine node tree
    if (gCombiGraphLstId != "Dummy") {
        var eleGrpLast = document.getElementById(gCombiGraphLstId);
        eleGrpLast.classList.remove("active");
        gCombiGraphLstId = "Dummy";
    }

    gActivedType = ActiveType.Atv_AllGroup;
});

/**
 * ツリービューのHTMLをクリアする
 */
function fncClearMenu() {
    document.getElementById("indexpickupmenu").innerHTML = "";
    if (document.getElementById("indexiotgatewaymenu")) {
        document.getElementById("indexiotgatewaymenu").innerHTML = "";
    }
    document.getElementById("indextreeviewmenu").innerHTML = "";
    document.getElementById("indexgraphmenu").innerHTML = "";
    document.getElementById("indexcsvmenuhome").innerHTML = "";
    document.getElementById("idgraphcontent").innerHTML = "";
    document.getElementById("mainAlarmShow").innerHTML = "";
    document.getElementById("idcompanycontent").innerHTML = "";
    fncMainDspLoad();
}

/**
 * 初期表示のアクティブ処理
 */
function fncMainDspLoad() {
    document.getElementById("device_path").innerHTML = "";
    document.getElementById("hlra4c4_content").style.display = "none";
    document.getElementById("hlrrs485_content").style.display = "none";
    document.getElementById("hlra1_content").style.display = "none";
    document.getElementById("hlrc1_content").style.display = "none";
    document.getElementById("hlrc2_content").style.display = "none";
    document.getElementById("hlrc8in_content").style.display = "none";
    document.getElementById("hlra8_content").style.display = "none";
    document.getElementById("twpm").style.display = "none";
    document.getElementById("twp8c").style.display = "none";
    document.getElementById("xm2").style.display = "none";
    document.getElementById("xs2").style.display = "none";
    document.getElementById("kmn1").style.display = "none";
    document.getElementById("km50").style.display = "none";
    document.getElementById("kw1m").style.display = "none";
    document.getElementById("kw2g").style.display = "none";
    document.getElementById("emu4").style.display = "none";
    document.getElementById("idgroupcontent").style.display = "none";
    document.getElementById("idcompanycontent").style.display = "block";
    document.getElementById("garphlist_content").style.display = "none";
    document.getElementById("idLoading").style.display = "block";
    gActivedType = ActiveType.Atv_AllGroup;
}

/**
 * Index treeview menu load
 */
function fncIndexTreeViewUpdate() {
    /* Reload data*/
    grp_index_load_list(function (obj) {
        console.log(obj);
        objTreeView = obj;
        gItemStatus = obj;

        // CSVTreeView作成
        fncMakeCSVPatternTreeview(objTreeView);
        if ((window.location.href).indexOf("logging") != -1) {
            console.log("graph.html");
        } else {
            /* TreeView作成 */
            fncMakeIndexTreeview(objTreeView);
        }
        // 複合グラフを作成
        fncMakeCombiGraphTreeview(objTreeView);

        /* 状態反映 */
        fncDispStatusNodeTreeView(gItemStatus);

        // Save Status unit for graph combine
        if (gintIotGatewayId < 0) {
            fncGetItemStatus();
        }
        else {
            fncSaveStatusCombineUnits(gintIotGatewayId, gItemStatus);
        }

        /* すべてデータ表示作成 */
        fncMakeAlldataDspContent();
    });

}

/**
 * Index treeview menu のHTMLを作成する
 */
function fncMakeIndexTreeview(objTreeView) {
    document.getElementById("idLoading").style.display = "none";
    if (gintIotGatewayId < 0) {
        document.getElementById("indextreeviewmenu").style.display = "none";
        document.getElementById("indextreeviewmenu").innerHTML = "";
        document.getElementById("idgraphcontent").style.display = "none";
        document.getElementById("garphlist_content").style.display = "none";
        document.getElementById("idcompanycontent").style.display = "none";
        document.getElementById("mainAlarmShow").style.display = "block";
        // deleted 2022/10/13 btnHakaruCom.classList.add("navbar-brand-active");
    }
    else {
        var str = "";
        document.getElementById("CSVmain").style.display = "none";
        document.getElementById("mainAlarmShow").style.display = "none";
        document.getElementById("indextreeviewmenu").style.display = "block";
        document.getElementById("indextreeviewmenu").innerHTML = "";
        if (document.getElementById("indexiotgatewaymenu")) {
            document.getElementById("indexiotgatewaymenu").innerHTML = "";
            document.getElementById("indexiotgatewaymenu").style.display = "none";
        }
        document.getElementById("idcompanycontent").innerHTML = "";
        // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");
        var bSelectFlg = false;

        for (i in objTreeView.Respons.GroupList) {
            str +=
                '<button class="list-group-item list-group-item-action pl-3 pr-2 d-inline-flex align-items-center font-weight-bold"';
            str += 'id="';
            str += "idgrp" + i + '"';
            str += 'onclick="treeview_click(';

            str += "'" + "idgrp" + i + "'" + "," + 0 + "," + i + "," + 0 + "," + 0;
            str += ')">';
            str +=
                '<span id = "idicongrp' +
                i +
                '" class="badge badge-success mr-1">' +
                0 +
                "</span>";
            str += '<span class="tv-resize">';
            str += escapeHtml(jis2chr(objTreeView.Respons.GroupList[i].GroupTitleCode));
            strTitle = jis2chr(objTreeView.Respons.GroupList[i].GroupTitleCode);
            str += "</span>";
            str += "</button>";

            for (j in objTreeView.Respons.GroupList[i].LoRaUnitList) {
                if (objTreeView.Respons.GroupList[i].LoRaUnitList[j] !== "NULL") {
                    if (bSelectFlg == false) {
                        str +=
                            '<button  class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center"';
                        bSelectFlg = true;
                        gcurgroupidx = i;
                        gcurunitidx = j;
                        lstId = "idunit" + i + j;
                    } else {
                        str +=
                            '<button  class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center"';
                    }

                    str += 'id="';
                    str += "idunit" + i + j + '"';
                    str += 'onclick="treeview_click(';
                    str +=
                        "'" +
                        "idunit" +
                        i +
                        j +
                        "'" +
                        "," +
                        1 +
                        "," +
                        i +
                        "," +
                        j +
                        "," +
                        "0";
                    str += ')">';
                    str += '<span style="width: 0.7rem">　</span>';
                    str +=
                        '<span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0">';
                    if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitStop == 0) {
                        str +=
                            '<img id = "idiconunit' +
                            i +
                            j +
                            '" src="/img/circle-x.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon">';
                    } else {
                        str +=
                            '<img id = "idiconunit' +
                            i +
                            j +
                            '"src="/img/circle-x.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon">';
                    }
                    str += "</span>";
                    str += '<span class="tv-resize">';
                    str += escapeHtml(jis2chr(
                        objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTitleCode
                    ));
                    strTitle = jis2chr(
                        objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTitleCode
                    );
                    str += "</span>";
                    str += "</button>";
                } else {
                    if (bSelectFlg == false) {
                    }
                }

                for (k in objTreeView.Respons.GroupList[i].LoRaUnitList[j]
                    .ModbusUnitList) {
                    if (
                        objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[
                        k
                        ] !== "NULL"
                    ) {
                        str +=
                            '<button  class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center"';
                        str += 'id="';
                        str += "idrs" + i + j + k + '"';
                        str += 'onclick="treeview_click(';
                        str +=
                            "'" +
                            "idrs" +
                            i +
                            j +
                            k +
                            "'" +
                            "," +
                            2 +
                            "," +
                            i +
                            "," +
                            j +
                            "," +
                            k;
                        str += ')">';

                        str +=
                            '<span style="width: 0.7rem">　</span><span style="width: 0.7rem">　</span>';
                        str +=
                            '<span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0">';
                        if (
                            objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k]
                                .UnitStop == 0
                        ) {
                            str +=
                                '<img id = "idiconrs' +
                                i +
                                j +
                                k +
                                '" src="/img/circle-x.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon">';
                        } else {
                            str +=
                                '<img id = "idiconrs' +
                                i +
                                j +
                                k +
                                '" src="/img/circle-x.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon">';
                        }
                        str += "</span>";
                        str += '<span class="tv-resize">';
                        str += escapeHtml(jis2chr(
                            objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k]
                                .UnitTitleCode
                        ));
                        strTitle = jis2chr(
                            objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k]
                                .UnitTitleCode
                        );
                        str += "</span>";
                        str += "</button>";
                    }
                }
            }
        }

        /* TreeView　作成 */
        document.getElementById("indextreeviewmenu").innerHTML = str;
    }
}

/**
 * Index treeview menu のHTMLを作成する
 */
function fncMakeCombiGraphTreeview(objTreeView) {
    // Check the Enable Graph
    if (objTreeView.Respons.GraphCombine.length == 0) {
        document.getElementById('indexgraphmenu').innerHTML = "";
        document.getElementById("indexgraphmenu").style.display = "none";
        return;
    }

    gGraphE = true;
    // 複合グラフリストをクリアする
    document.getElementById('indexgraphmenu').innerHTML = "";
    document.getElementById("indexgraphmenu").style.display = "block";
    var i;
    var str = "";
    var bSelectFlg = false;

    // ツーリのHTML-Templateを作成する
    str += '<button id="';
    str += 'idcombigrp0' + "\"";
    if (gintIotGatewayId < 0) {
        str += 'class="list-group-item list-group-item-action pl-3 pr-2 d-inline-flex align-items-center" onclick="graphtreeviewclk(';
    } else {
        str += 'class="list-group-item list-group-item-action pl-3 pr-2 d-inline-flex align-items-center" onclick="graphtreeviewclk(';
    }
    str += "'" + 'idcombigrp0' + "'" + ',' + 0 + ')">';
    str += '<span class="tv-resize">'
    str += '<strong>' + escapeHtml(objTreeView.Respons.CombineGroupName) +'</strong>';
    str += '</span>'
    str += '</button>';

    for (i in objTreeView.Respons.GraphCombine) {
        if (objTreeView.Respons.GraphCombine[i] !== "NULL") {
            str += '<button id="';
            str += 'idunit' + i + '"';
            if (gintIotGatewayId < 0) {
                str += 'class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center" onclick="graphtreeviewclk(';
            } else {
                str += 'class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center" onclick="graphtreeviewclk(';
            }
            str += "'" + 'idunit' + i + "'" + ',' + i + ')"';
            str += '><span style="width: 0.7rem"> </span>';
            str += '<span class="tv-resize"> ';
            str += escapeHtml(objTreeView.Respons.GraphCombine[i].GraphName);
            str += '</span>'
            str += '</button>';
        }

        // ページをロードすると、最初のグラフを指定する
        if (bSelectFlg == false) {
            bSelectFlg = true;
            gCurCombiGrapIdx = i; //0
            gCombiGraphLstId = 'idunit' + i; //idunit0
        }

    }

    document.getElementById('indexgraphmenu').innerHTML = str;

}

/**
* HomeGraphTreeView イベント
*/
function HomeGraphTreeViewClick(id, grpIndex) {
    // window.location.assign("graph.html?idGraphChoice=" + id);
    graphtreeviewclk(id, grpIndex);
}



/**
 * TreeView イベント
 */
function treeview_click(curId, branch, type, subType, chdType) {
    gcurgroupidx = type;
    gcurunitidx = subType;
    gcurrsidx = chdType;
    gcrurbranch = branch;

    // グラフ要求時間バー初期化
    // if ((lstId != curId)) {
    // fncGraphTimerBarInit();
    // }
    //現在ユニットIDを保存する
    gGrphRequestingId = curId;

    // クリックされたアイテムの処理
    if (branch == 0) {
        document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode);
        document.getElementById("hlra4c4_content").style.display = "none";
        document.getElementById("hlrrs485_content").style.display = "none";
        document.getElementById("hlra1_content").style.display = "none";
        document.getElementById("hlra8_content").style.display = "none";
        document.getElementById("hlrc1_content").style.display = "none";
        document.getElementById("hlrc2_content").style.display = "none";
        document.getElementById("hlrc8in_content").style.display = "none";
        document.getElementById("twpm").style.display = "none";
        document.getElementById("twpm_1p2w").style.display = "none";
        document.getElementById("twpm_1p3w").style.display = "none";
        document.getElementById("twpm_3p4w").style.display = "none";
        document.getElementById("twp8c").style.display = "none";
        document.getElementById("xm2").style.display = "none";
        document.getElementById("xm2_1p2w").style.display = "none";
        document.getElementById("xm2_1p3w").style.display = "none";
        document.getElementById("xm2_3p4w").style.display = "none";
        document.getElementById("xs2").style.display = "none";
        document.getElementById("xs2_1p2w").style.display = "none";
        document.getElementById("xs2_1p3w").style.display = "none";
        document.getElementById("twps").style.display = "none";
        document.getElementById("xm2_1p3w_io_ior").style.display = "none";
        document.getElementById("xm2_3p3w_io_ior").style.display = "none";
        document.getElementById("kmn1").style.display = "none";
        document.getElementById("km50").style.display = "none";
        document.getElementById("kw1m").style.display = "none";
        document.getElementById("kw2g").style.display = "none";
        document.getElementById("emu4").style.display = "none";
        document.getElementById("twpp_content").style.display = "none";
        document.getElementById("idgroupcontent").style.display = "block";
        document.getElementById("idcompanycontent").style.display = "none";
        document.getElementById("idgraphcontent").style.display = "none";
        document.getElementById("garphlist_content").style.display = "none";
        iotgw_name.classList.remove("navbar-brand-active");
        // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

        /* グループ選択 */
        gActivedType = ActiveType.Atv_Group;
        /*グループTEMPLATEを作成。 */
        fncMakeGroupDspContent(type);
    }
    if (branch == 1) {
        document.getElementById("garphlist_content").style.display = "none";
        if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A4C4) {
            clear_grp_hlr();
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "block";
            document.getElementById("idvaldbm_title").style.display = "";
            document.getElementById("idvaldbm").style.display = "";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("denpakyoudo").style.display = "block";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
            // /* 設定データ読み込み */
            // readhlralldatasetting(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx]);
        }
        else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_RS485) {
            clear_grp_hlr_rs485();
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "block";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
        }
        else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A1) {
            clear_grp_hlra1();
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "block";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
        }
        else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C1) {
            clear_grp_hlrc(objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode);
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "block";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
        }
        else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C2) {
            clear_grp_hlrc(objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode);
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "block";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
        }
        else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C8_IN) {
            clear_grp_hlrc8in(UnitCode.HLR_C8_IN);
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "block";
            document.getElementById("idhlrc8intitledbm").style.display = "";
            document.getElementById("idhlrc8invaldbm").style.display = "";
            document.getElementById("c8denpakyoudo").style.display = "block";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
        }
        else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A8) {
            clear_grp_hlra8();
            document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlra8valdbm_title").style.display = "";
            document.getElementById("hlra8valdbm").style.display = "";
            document.getElementById("a8denpakyoudo").style.display = "block";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "block";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            document.getElementById("idgroupcontent").style.display = "none";
            document.getElementById("idcompanycontent").style.display = "none";
            document.getElementById("idgraphcontent").style.display = "none";
            // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

            /* ユニット選択 */
            gActivedType = ActiveType.Atv_Unit;
        }
    }
    if (branch == 2) {
        /* サブユニット選択 */
        gActivedType = ActiveType.Atv_SubUnit;
        document.getElementById("device_path").innerHTML = jis2chr(objTreeView.Respons.GroupList[type].GroupTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].UnitTitleCode) + ">" + jis2chr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTitleCode);

        if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.HLR_A4C4) {         // HR-A4C4
            clear_grp_hlr();
            document.getElementById("hlra4c4_content").style.display = "block";
            document.getElementById("idvaldbm_title").style.display = "";
            document.getElementById("idvaldbm").style.display = "";
            document.getElementById("denpakyoudo").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.HR_A4C4) {    // HR-A4C4
            clear_grp_hlr();
            document.getElementById("hlra4c4_content").style.display = "block";
            document.getElementById("idvaldbm_title").style.display = "none";
            document.getElementById("idvaldbm").style.display = "none";
            document.getElementById("denpakyoudo").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.HR_A8) {    // HR-A8
            clear_grp_hlra8();
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "block";
            document.getElementById("hlra8valdbm_title").style.display = "none";
            document.getElementById("hlra8valdbm").style.display = "none";
            document.getElementById("a8denpakyoudo").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.HR_C8_IN) {    // HR-C8-IN
            clear_grp_hlrc8in(UnitCode.HR_C8_IN);
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            //document.getElementById("hlra8valdbm_title").style.display = "none";
            //document.getElementById("hlra8valdbm").style.display = "none";
            document.getElementById("a8denpakyoudo").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "block";
            document.getElementById("idhlrc8intitledbm").style.display = "none";
            document.getElementById("idhlrc8invaldbm").style.display = "none";
            document.getElementById("c8denpakyoudo").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";

        }

        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWPM_1P3W) {    // TWPM-1P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "block";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncTwpmGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWPM_3P3W) {    // TWPM-3P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "block";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncTwpmGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWPM_3P4W) {    // TWPM-3P4W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "block";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncTwpmGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWPM_1P2W) {    // TWPM-1P2W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "block";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncTwpmGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWP8C) {    // TWP8C
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "block";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            clear_graph_twp8c();    // グラフデータクリア
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWPP) {    // TWPP
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "block";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncTwppGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XM2_1P3W) {    // XM2-1P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "block";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXm2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XM2_3P3W) {    // XM2-3P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "block";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXm2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XM2_3P4W) {    // XM2-3P4W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "block";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXm2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XM2_1P2W) {    // XM2-1P2W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "block";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXm2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XS2_1P3W) {    // XS2-1P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "block";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXs2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XS2_3P3W) {    // XS2-3P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "block";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXs2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XS2_1P2W) {    // XS2-1P2W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "block";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXs2GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.TWPS) {   // TWPS
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "block";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncTwpsGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XM2_1P3W_Io_Ior) {    // XM2-1P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "block";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXm2IoIorGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.XM2_3P3W_Io_Ior) {    // XM2-3P3W
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "block";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncXm2IoIorGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.KMN1) {    // KMN1
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "block";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncKmn1GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.KM50) {    // KM50
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "block";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncKm50GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.KW1M) {    // KW1M
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "block";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
            fncKw1mGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.KW2G) {    // KW2G
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "block";
            document.getElementById("emu4").style.display = "none";
            fncKw2gGrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4_2) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4_3) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4_4) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4_5) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4_6) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else if (objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode == UnitCode.EMU4_7) {    // EMU4
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "block";
            fncEmu4GrpClr(objTreeView.Respons.GroupList[type].LoRaUnitList[subType].ModbusUnitList[chdType].UnitTypeCode);
        }
        else {
            document.getElementById("hlra4c4_content").style.display = "none";
            document.getElementById("hlrrs485_content").style.display = "none";
            document.getElementById("hlra1_content").style.display = "none";
            document.getElementById("hlrc1_content").style.display = "none";
            document.getElementById("hlrc2_content").style.display = "none";
            document.getElementById("hlrc8in_content").style.display = "none";
            document.getElementById("hlra8_content").style.display = "none";
            document.getElementById("twpm").style.display = "none";
            document.getElementById("twpm_1p2w").style.display = "none";
            document.getElementById("twpm_1p3w").style.display = "none";
            document.getElementById("twpm_3p4w").style.display = "none";
            document.getElementById("twp8c").style.display = "none";
            document.getElementById("xm2").style.display = "none";
            document.getElementById("xm2_1p2w").style.display = "none";
            document.getElementById("xm2_1p3w").style.display = "none";
            document.getElementById("xm2_3p4w").style.display = "none";
            document.getElementById("xs2").style.display = "none";
            document.getElementById("xs2_1p2w").style.display = "none";
            document.getElementById("xs2_1p3w").style.display = "none";
            document.getElementById("twps").style.display = "none";
            document.getElementById("twpp_content").style.display = "none";
            document.getElementById("xm2_1p3w_io_ior").style.display = "none";
            document.getElementById("xm2_3p3w_io_ior").style.display = "none";
            document.getElementById("kmn1").style.display = "none";
            document.getElementById("km50").style.display = "none";
            document.getElementById("kw1m").style.display = "none";
            document.getElementById("kw2g").style.display = "none";
            document.getElementById("emu4").style.display = "none";
        }

        document.getElementById("idgroupcontent").style.display = "none";
        document.getElementById("idcompanycontent").style.display = "none";
        // document.getElementById("idgraphcontent").innerHTML = "";
        document.getElementById("idgraphcontent").style.display = "none";
        document.getElementById("garphlist_content").style.display = "none";
        // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");

    }

    // Active Current Node Tree
    var eleCurrent = document.getElementById(curId);
    console.log(curId);
    eleCurrent.classList.add("active");
    // DeActive Previous Selected Node Tree
    if ((lstId != "Dummy") && (lstId != curId)) {
        var eleLast = document.getElementById(lstId);
        eleLast.classList.remove("active");
    }
    // Update the Current selected ID
    lstId = curId;

    // Deactive GraphCombine node tree
    if (gCombiGraphLstId != "Dummy") {
        var eleGrpLast = document.getElementById(gCombiGraphLstId);
        eleGrpLast.classList.remove("active");
        gCombiGraphLstId = "Dummy";
    }

    // Display Reload
    if (objTreeView !== null) {
        fncDataReload();
    }
}

/**
 * //すべての要素がロードしてあれば
 */
function fncInstallDataRead() {
    //5s 間隔, 瞬時値 ➡　30s
    gGetInstanceInTerval = setInterval(function () {
        get_instance_dat();
    }, FETCH_INTERVAL.INSTANCE);

    //5s 間隔, グラフ ➡　30s
    gGetGraphInTerval = setInterval(function () {
        get_graph_dat();
    }, FETCH_INTERVAL.GRAPH);

    //5s 間隔, get icon status ➡　30s
    setInterval(function () {
        fncGetItemStatus();
    }, FETCH_INTERVAL.TREEVIEW_STATUS);

    //30s 間隔, 接点入出力ボードがGWに付いているかどうかチェック ➡　60s
    setInterval(function () {
        fncGetAlarmStatus();
    }, FETCH_INTERVAL.DIO_ALARM);

    // システム時刻表示
    setInterval(function () {
        get_time();
    }, FETCH_INTERVAL.DATETIME_SYSTEM);

//     // 30sごとに、警報を更新する
//     if (updateAlarmInterval !== undefined) {
//         clearInterval(updateAlarmInterval);
//     }
//     updateAlarmInterval = setInterval(function () {
//         update_alarm(fncUpdateAlarmCount);
//     }, FETCH_INTERVAL.TREEVIEW_STATUS);
}

/**
 * データリロード
 */
function fncDataReload() {
    get_instance_dat();
    get_graph_dat();
}

/**
 * イアコル状態を取得して、表示を更新する
 */
function fncGetItemStatus() {
    if (gintIotGatewayId >= 0) {
        get_data_icon(gintIotGatewayId, function (obj) {
            gItemStatus = obj;
            // イアコル状態表示
            fncDispStatusNodeTreeView(obj);

            // Save Status unit for graph combine
            fncSaveStatusCombineUnits(gintIotGatewayId, obj);
        });
    }
    // ホームページでユニット状態を取得する
    else {
        var tmpgwlist = [];
        if (objTreeView) {
            for (m in objTreeView.Respons.GraphCombine) {
                for (n in objTreeView.Respons.GraphCombine[m].GraphList) {
                    // IOTGWのID
                    var gwid = objTreeView.Respons.GraphCombine[m].GraphList[n].IotGatewayId;
                    if (tmpgwlist.indexOf(gwid) !== -1) {
                        continue
                    }
                    tmpgwlist.push(gwid);
                    // 状態を取得する
                    get_data_icon(gwid, function (obj, tmpgwid) {
                        gItemStatus = obj;
                        // Save Status unit for graph combine
                        fncSaveStatusCombineUnits(tmpgwid, obj);
                    });
                }
            }
        }
    }
}

/**
 * 選択しているユニットの瞬時値を取得
 */
function get_instance_dat() {
    try {
        // Clear the Instance Values for Combine Graph
        /* グループ選択による処理 */
        switch (gActivedType) {
            // すべてユニットの表示
            case ActiveType.Atv_AllGroup:
                fncGetAllData(false);
                break;
            // 選択しているグループの表示
            case ActiveType.Atv_Group:
                fncGetGroupData(false);
                break;
            // 洗濯しているLoRaユニットの表示
            case ActiveType.Atv_Unit:
                var unitSts = gItemStatus.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].Status;
                var unitNo = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitNo;
                var UnitRealtimeObj = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].RealtimeData;
                // Check if Main Process not ready
                if (gItemStatus.Respons == null) {
                    return;
                }
                //HLR-A4C4
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A4C4) {
                    get_InsDatHLRA4C4(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts, UnitRealtimeObj);
                }
                // HLR-C1
                else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C1) {
                    get_InsDatHLRC1(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts);
                }
                // HLR-C2
                else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C2) {
                    get_InsDatHLRC2(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts);
                }
                // HLR-C8-IN
                else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C8_IN) {
                    get_InsDatHLRC8IN(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts);
                }

                // HLR-RS485
                else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_RS485) {
                    get_InsDatHLRRS485(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts);
                }
                // HLR-A1
                else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A1) {
                    get_InsDatHLRA1(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts);
                }
                // HLR-A8
                else if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A8) {
                    get_InsDatHLRA8(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx], unitNo, unitSts);
                }
                break;
            // 選択しているRS-485ユニットの表示
            case ActiveType.Atv_SubUnit:
                var unitNo = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitNo;
                var unitSts = gItemStatus.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].Status;
                // Check if Main Process not ready
                if ((gItemStatus.Respons == null)) {
                    return;
                }

                switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitTypeCode) {
                    case UnitCode.HR_A4C4:
                        get_InsDatHRA4C4(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.HR_A8:
                        get_InsDatHRA8(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.HR_C8_IN:
                        get_InsDatHRC8IN(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWPM_1P2W:
                        get_InsDatTWPM1P2W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWPM_1P3W:
                        get_InsDatTWPM1P3W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWPM_3P3W:
                        get_InsDatTWPM3P3W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWPM_3P4W:
                        get_InsDatTWPM3P4W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWP8C:
                        get_InsDatTWP8C(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XM2_1P2W:
                        get_InsDatXM21P2W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XM2_1P3W:
                        get_InsDatXM21P3W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XM2_3P3W:
                        get_InsDatXM23P3W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XM2_3P4W:
                        get_InsDatXM23P4W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XS2_1P2W:
                        get_InsDatXS21P2W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XS2_1P3W:
                        get_InsDatXS21P3W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XS2_3P3W:
                        get_InsDatXS23P3W(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWPS:
                        get_InsDatTWPS(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.TWPP:
                        get_InsDatTWPP(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XM2_1P3W_Io_Ior:
                        get_InsDatXM21P3W_Io_Ior(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.XM2_3P3W_Io_Ior:
                        get_InsDatXM23P3W_Io_Ior(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.KMN1:
                        get_InsDatKMN1(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.KM50:
                        get_InsDatKM50(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.KW1M:
                        get_InsDatKW1M(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.KW2G:
                        get_InsDatKW2G(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    case UnitCode.EMU4:
                    case UnitCode.EMU4_2:
                    case UnitCode.EMU4_3:
                    case UnitCode.EMU4_4:
                    case UnitCode.EMU4_5:
                    case UnitCode.EMU4_6:
                    case UnitCode.EMU4_7:
                        get_InsDatEMU4(gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx], unitNo, unitSts);
                        break;
                    default:
                        break;
                }
                break;
            // 複合グラフの表示
            case ActiveType.Atv_Combigraph:
                // [複合グラフ]をクリックする場合
                if (gCombiGraphCurId == "idcombigrp0") {
                    fncDisplayAllCombiGraphRealtime(false);
                }
                // グラフ１～１０を選択する場合
                else {
                    fncGet_InsDatCombiGraphItems(gObjCombiGrahpSettingValue.GraphCombine[gCurCombiGrapIdx], gCurCombiGrapIdx);
                }
                break;
            default:
                break;
        }
    }
    catch (error) {

    }
}

/**
 * 選択しているユニットのグラフ値を取得
 */
function get_graph_dat() {
    var date;
    var timeidx;
    try {
        /* グループ選択による処理 */
        switch (gActivedType) {
            case ActiveType.Atv_AllGroup:
                break;
            case ActiveType.Atv_Group:
                break;
            case ActiveType.Atv_Unit:
                // Check if Main Process not ready
                if (gItemStatus.Respons == null) {
                    return;
                }
                var strUnitNo = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitNo;
                var unitSetting = gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx];
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A4C4) {
                    date = document.getElementById("idGrpTimeInterval0").value;
                    timeidx = 0;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, displayhlra4c4grph);
                }
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C1) {
                    date = document.getElementById("idGrpTimeInterval17").value;
                    timeidx = 17;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, hlrc_get_graph_data);
                }
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C2) {
                    date = document.getElementById("idGrpTimeInterval18").value;
                    timeidx = 18;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, hlrc_get_graph_data);
                }
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_C8_IN) {
                    date = document.getElementById("idGrpTimeInterval24").value;
                    timeidx = 24;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, hlrc8_get_graph_data);
                }

                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_RS485) {
                    date = document.getElementById("idGrpTimeInterval3").value;
                    timeidx = 3;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, hlrrs485_get_graph_data);
                }
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A1) {
                    date = document.getElementById("idGrpTimeInterval19").value;
                    timeidx = 19;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, hlra1_get_graph_data);
                }
                if (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].UnitTypeCode == UnitCode.HLR_A8) { //HLR-A8
                    date = document.getElementById("idGrpTimeInterval20").value;
                    timeidx = 20;
                    fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, displayhlra8grph);
                }
                break;
            case ActiveType.Atv_SubUnit:
                var strUnitNo = objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitNo;
                var unitSetting = gobjSettingValue.groups[gcurgroupidx].units[gcurunitidx].subunits[gcurrsidx];

                switch (objTreeView.Respons.GroupList[gcurgroupidx].LoRaUnitList[gcurunitidx].ModbusUnitList[gcurrsidx].UnitTypeCode) {
                    case UnitCode.HR_A4C4:
                        //HR-A4C4
                        date = document.getElementById("idGrpTimeInterval0").value;
                        timeidx = 0;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, displayhlra4c4grph);
                        break;
                    case UnitCode.HR_A8:
                        date = document.getElementById("idGrpTimeInterval20").value;
                        timeidx = 20;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, displayhlra8grph);
                        break;
                    case UnitCode.HR_C8_IN:
                        date = document.getElementById("idGrpTimeInterval24").value;
                        timeidx = 24;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, hlrc8_get_graph_data);
                        break;
                    case UnitCode.TWPM_1P2W:
                        date = document.getElementById("idGrpTimeInterval4").value;
                        timeidx = 4;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twpm_get_graph_data);
                        break;
                    case UnitCode.TWPM_1P3W:
                        date = document.getElementById("idGrpTimeInterval5").value;
                        timeidx = 5;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twpm_get_graph_data);
                        break;
                    case UnitCode.TWPM_3P3W:
                        date = document.getElementById("idGrpTimeInterval6").value;
                        timeidx = 6;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twpm_get_graph_data);
                        break;
                    case UnitCode.TWPM_3P4W:
                        date = document.getElementById("idGrpTimeInterval7").value;
                        timeidx = 7;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twpm_get_graph_data);
                        break;
                    case UnitCode.TWP8C:
                        //TWP8C
                        date = document.getElementById("idGrpTimeInterval2").value;
                        timeidx = 2;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twp8c_get_graph_data);
                        break;
                    case UnitCode.XM2_1P2W:
                        date = document.getElementById("idGrpTimeInterval8").value;
                        timeidx = 8;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xm2_get_graph_data);
                        break;
                    case UnitCode.XM2_1P3W:
                        date = document.getElementById("idGrpTimeInterval9").value;
                        timeidx = 9;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xm2_get_graph_data);
                        break;
                    case UnitCode.XM2_3P3W:
                        date = document.getElementById("idGrpTimeInterval10").value;
                        timeidx = 10;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xm2_get_graph_data);
                        break;
                    case UnitCode.XM2_3P4W:
                        date = document.getElementById("idGrpTimeInterval11").value;
                        timeidx = 11;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xm2_get_graph_data);
                        break;
                    case UnitCode.XS2_1P2W:
                        date = document.getElementById("idGrpTimeInterval12").value;
                        timeidx = 12;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xs2_get_graph_data);
                        break;
                    case UnitCode.XS2_1P3W:
                        date = document.getElementById("idGrpTimeInterval13").value;
                        timeidx = 13;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xs2_get_graph_data);
                        break;
                    case UnitCode.XS2_3P3W:
                        date = document.getElementById("idGrpTimeInterval14").value;
                        timeidx = 14;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xs2_get_graph_data);
                        break;
                    case UnitCode.TWPS:
                        date = document.getElementById("idGrpTimeInterval16").value;
                        timeidx = 16;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twps_get_graph_data);
                        break;
                    case UnitCode.TWPP:
                        date = document.getElementById("idGrpTimeInterval1").value;
                        timeidx = 1;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, twpp_get_graph_data);
                        break;
                    case UnitCode.XM2_1P3W_Io_Ior:
                        date = document.getElementById("idGrpTimeInterval22").value;
                        timeidx = 22;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xm2ioior_get_graph_data);
                        break;
                    case UnitCode.XM2_3P3W_Io_Ior:
                        date = document.getElementById("idGrpTimeInterval23").value;
                        timeidx = 23;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, xm2ioior_get_graph_data);
                        break;
                    case UnitCode.KMN1:
                        date = document.getElementById("idGrpTimeInterval26").value;
                        timeidx = 26;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, kmn1_get_graph_data);
                        break;
                    case UnitCode.KM50:
                        date = document.getElementById("idGrpTimeInterval27").value;
                        timeidx = 27;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, km50_get_graph_data);
                        break;
                    case UnitCode.KW1M:
                        date = document.getElementById("idGrpTimeInterval28").value;
                        timeidx = 28;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, kw1m_get_graph_data);
                        break;
                    case UnitCode.KW2G:
                        date = document.getElementById("idGrpTimeInterval29").value;
                        timeidx = 29;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, kw2g_get_graph_data);
                        break;
                    case UnitCode.EMU4:
                    case UnitCode.EMU4_2:
                    case UnitCode.EMU4_3:
                    case UnitCode.EMU4_4:
                    case UnitCode.EMU4_5:
                    case UnitCode.EMU4_6:
                    case UnitCode.EMU4_7:
                        date = document.getElementById("idGrpTimeInterval30").value;
                        timeidx = 30;
                        fncGet_GraphData_RS485(unitSetting, strUnitNo, date, timeidx, emu4_get_graph_data);
                        break;
                    default:
                        break;
                }
                break;
            // 複合グラフの表示
            case ActiveType.Atv_Combigraph:
                // グラフ１～１０を選択する場合
                if (gCombiGraphCurId !== "idcombigrp0") {
                    date = document.getElementById("idGrpTimeInterval21").value;
                    timeidx = 21;
                    fncGet_GraphData_GraphCombine(gObjCombiGrahpSettingValue.GraphCombine[gCurCombiGrapIdx], gCurCombiGrapIdx, date, timeidx);
                }

                break;
            default:
                break;
        }
    }
    catch (error) {

    }
}

/**
 * すべてのグループとユニットにて
 * 設定値を表示してから、すべて瞬時値を表示する
 */
function fncGetAllData(isUnitChg) {
    var unitSts;
    var i, j, k;
    var unitsettingobj;
    var UnitRealtimeObj;
    // Check if Home Tab is selected
    if (gintIotGatewayId < 0) return;
    // Check if Main Process not ready
    if (gItemStatus.Respons == null) {
        return;
    }
    for (i in objTreeView.Respons.GroupList) {
        // LoRaユニット
        for (j = 0; j < objTreeView.Respons.GroupList[i].LoRaUnitList.length; j++) {
            unitSts = gItemStatus.Respons.GroupList[i].LoRaUnitList[j].Status;
            unitsettingobj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].Setting;
            UnitRealtimeObj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].RealtimeData;

            if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A4C4) {
                fncHlrDspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }
            else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C1) {
                fncHlrc1DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }
            else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C2) {
                fncHlrc2DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }
            else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C8_IN) {
                fncHlrc8inDspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }
            else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_RS485) {
                fncHlrRs485DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }
            else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A1) {
                fncHlra1DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }
            else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A8) {
                fncHlra8DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                    gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
            }


            // RS-485ユニット
            for (k = 0; k < objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList.length; k++) {
                unitSts = gItemStatus.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status;
                unitsettingobj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Setting;
                UnitRealtimeObj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].RealtimeData;

                switch (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode) {
                    case UnitCode.HR_A4C4:
                        fncHlrDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.HR_A8:
                        fncHlra8DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.HR_C8_IN:
                        fncHlrc8inDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWPM_1P2W:
                        fncTWPM1P2WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWPM_1P3W:
                        fncTWPM1P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWPM_3P3W:
                        fncTWPM3P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWPM_3P4W:
                        fncTWPM3P4WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XM2_1P2W:
                        fncXM21P2WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XM2_1P3W:
                        fncXM21P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XM2_3P3W:
                        fncXM23P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XM2_3P4W:
                        fncXM23P4WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWP8C:
                        fncTW8CDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XS2_1P2W:
                        fncXS21P2WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XS2_1P3W:
                        fncXS21P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XS2_3P3W:
                        fncXS23P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWPS:
                        fncTWPSDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.TWPP:
                        fncTWPPDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XM2_1P3W_Io_Ior:
                        fncXM21P3W_Io_Ior_DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.XM2_3P3W_Io_Ior:
                        fncXM23P3W_Io_Ior_DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.KMN1:
                        fncKMN1DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.KM50:
                        fncKM50DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.KW1M:
                        fncKW1MDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.KW2G:
                        fncKW2GDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    case UnitCode.EMU4:
                    case UnitCode.EMU4_2:
                    case UnitCode.EMU4_3:
                    case UnitCode.EMU4_4:
                    case UnitCode.EMU4_5:
                    case UnitCode.EMU4_6:
                    case UnitCode.EMU4_7:
                        fncEMU4DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                            gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                        break;
                    default:
                        break;
                }

            }
        }
    }

    if (isUnitChg) {
        fncDisplayAllCombiGraphRealtime(isUnitChg);
    }
    else {
        // 複合の設定値と瞬時値を表示する
        setTimeout(function () {
            fncDisplayAllCombiGraphRealtime(isUnitChg);
        }, 10000);
    }
}

/**
 * グループ瞬時値データ表示処理
 */
function fncGetGroupData(isUnitChg) {
    var i, j, k;
    var unitSts;
    var unitsettingobj;
    var UnitRealtimeObj;
    i = gcurgroupidx;
    // Check if Main Process not ready
    if (gItemStatus.Respons == null) {
        return;
    }
    for (j = 0; j < objTreeView.Respons.GroupList[i].LoRaUnitList.length; j++) {
        unitSts = gItemStatus.Respons.GroupList[i].LoRaUnitList[j].Status;
        unitsettingobj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].Setting;
        UnitRealtimeObj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].RealtimeData;

        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A4C4) {
            fncHlrDspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C1) {
            fncHlrc1DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C2) {
            fncHlrc2DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C8_IN) {
            fncHlrc8inDspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_RS485) {
            fncHlrRs485DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A1) {
            fncHlra1DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A8) {
            fncHlra8DspData(gobjPreId.groups[i].units[j].unitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo, isUnitChg,
                gobjSettingValue.groups[i].units[j], unitSts, unitsettingobj, UnitRealtimeObj);
        }

        for (k = 0; k < objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList.length; k++) {
            unitSts = gItemStatus.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status;
            unitsettingobj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Setting;
            UnitRealtimeObj = objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].RealtimeData;

            switch (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode) {
                case UnitCode.HR_A4C4:
                    fncHlrDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.HR_A8:
                    fncHlra8DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.HR_C8_IN:
                    fncHlrc8inDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWPM_1P2W:
                    fncTWPM1P2WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWPM_1P3W:
                    fncTWPM1P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWPM_3P3W:
                    fncTWPM3P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWPM_3P4W:
                    fncTWPM3P4WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWP8C:
                    fncTW8CDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XM2_1P2W:
                    fncXM21P2WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XM2_1P3W:
                    fncXM21P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XM2_3P3W:
                    fncXM23P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XM2_3P4W:
                    fncXM23P4WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XS2_1P2W:
                    fncXS21P2WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XS2_1P3W:
                    fncXS21P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XS2_3P3W:
                    fncXS23P3WDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWPS:
                    fncTWPSDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.TWPP:
                    fncTWPPDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XM2_1P3W_Io_Ior:
                    fncXM21P3W_Io_Ior_DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.XM2_3P3W_Io_Ior:
                    fncXM23P3W_Io_Ior_DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.KMN1:
                    fncKMN1DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.KM50:
                    fncKM50DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.KW1M:
                    fncKW1MDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.KW2G:
                    fncKW2GDspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                case UnitCode.EMU4:
                case UnitCode.EMU4_2:
                case UnitCode.EMU4_3:
                case UnitCode.EMU4_4:
                case UnitCode.EMU4_5:
                case UnitCode.EMU4_6:
                case UnitCode.EMU4_7:
                    fncEMU4DspData(gobjPreId.groups[i].units[j].subunits[k].subunitpreid, objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo, isUnitChg,
                        gobjSettingValue.groups[i].units[j].subunits[k], unitSts, unitsettingobj, UnitRealtimeObj);
                    break;
                default:
                    break;
            }
        }
    }
}


/**
 * グループダイナミク瞬時データ表示タイトル作成
 */
function fncGrpInstValDsnMake(tvid, title) {
    var rtnval;
    rtnval =
        '<div class="card  px-0 py-0 mb-3pr-0 border-0"> \
                <div class="card-header d-flex justify-content-between border p-2 text-dark bg-light"> \
                    <h4 id="idgrptitle" class="h3 m-0 ">grptitlestring \
                    </h4> \
                </div> \
            </div>';

    rtnval = rtnval.replace(/idgrp/g, tvid + "idgrp");
    rtnval = rtnval.replace(/grptitlestring/g, title);

    return rtnval;

}

/**
 * グループダイナミク瞬時データ表示タイトル作成
 */
function fncGrpInstValDsnMake4Grp(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-header d-flex justify-content-between p-2 text-dark border bg-light"> \
                    <h4 id="idgrptitle" class="h3 m-0 ">grptitlestring \
                    </h4> \
                </div>';

    rtnval = rtnval.replace(/idgrp/g, tvid + "idgrp");
    rtnval = rtnval.replace(/grptitlestring/g, title);
    return rtnval;
}

/**
 * 会社名ダイナミク瞬時データ表示作成
 */
function fncCompanyTitleDspMake(strCompTitle) {
    if (strCompTitle !== '') {
        rtnval = '<div class="pb-2"> \
                            <h1 class="h1 m-0 text-green" style="color:green">strcompanytitle \
                            </h1> \
                        </div>';
        rtnval = rtnval.replace(/strcompanytitle/g, strCompTitle);
        return rtnval;
    }
    return strCompTitle;
}

/**
 * グループダイナミク瞬時データ表示作成
 */
function fncMakeGroupDspContent(grpidx) {
    var str = "";
    var strPreId;
    var strCompanyAllDsp = "";
    var strTitle = "";

    var i = grpidx;
    if (objTreeView.Respons.GroupList[grpidx] != "NULL") {
        strTitle = jis2chr(objTreeView.Respons.GroupList[i].GroupTitleCode);
        strPreId = 'idgrp' + i;
        strCompanyAllDsp += fncGrpInstValDsnMake4Grp('idgrp' + i, strTitle);

        for (j in objTreeView.Respons.GroupList[i].LoRaUnitList) {
            if (objTreeView.Respons.GroupList[i].LoRaUnitList[j] !== "NULL") {

                strTitle = jis2chr(objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTitleCode);

                if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A4C4) {
                    strCompanyAllDsp += fncHlrInstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C1) {
                    strCompanyAllDsp += fncHlrc1InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C2) {
                    strCompanyAllDsp += fncHlrc2InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C8_IN) {
                    strCompanyAllDsp += fncHlrc8inInstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_RS485) {
                    strCompanyAllDsp += fncHlrRs485InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A1) {
                    strCompanyAllDsp += fncHlrA1InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A8) {
                    strCompanyAllDsp += fncHlra8InstValDsnMake('idunit' + i + j, strTitle);
                }
            }
            else {
            }
            for (k in objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList) {
                if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k] !== "NULL") {
                    strTitle = jis2chr(objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTitleCode);

                    if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HLR_A4C4) {         // HR-A4C4
                        strCompanyAllDsp += fncHrInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HR_A4C4) {    // HR-A4C4
                        strCompanyAllDsp += fncHrInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HR_A8) {      // HR-A8
                        strCompanyAllDsp += fncHrA8InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HR_C8_IN) {      // HR-C8_IN
                        strCompanyAllDsp += fncHrc8inInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_1P3W) {    // TWPM-1P3W
                        strCompanyAllDsp += fncTWPM1P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_3P3W) {    // TWPM-3P3W
                        strCompanyAllDsp += fncTWPM3P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_3P4W) {    // TWPM-3P4W
                        strCompanyAllDsp += fncTWPM3P4WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_1P2W) {    // TWPM-1P2W
                        strCompanyAllDsp += fncTWPM1P2WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWP8C) {    // TWP8C
                        strCompanyAllDsp += fncTWP8CInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_1P3W) {    // XM2-1P3W
                        strCompanyAllDsp += fncXM21P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_3P3W) {    // XM2-3P3W
                        strCompanyAllDsp += fncXM23P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_3P4W) {    // XM2-3P4W
                        strCompanyAllDsp += fncXM23P4WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_1P2W) {    // XM2-1P2W
                        strCompanyAllDsp += fncXM21P2WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XS2_1P3W) {    // XS2-1P3W
                        strCompanyAllDsp += fncXS21P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XS2_3P3W) {    // XS2-3P3W
                        strCompanyAllDsp += fncXS23P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XS2_1P2W) {    // XS2-1P2W
                        strCompanyAllDsp += fncXS21P2WInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPS) {    // TWPS
                        strCompanyAllDsp += fncTWPSInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPP) {    // TWPP
                        strCompanyAllDsp += fncTWPPInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_1P3W_Io_Ior) {    // XM2-3P3W
                        strCompanyAllDsp += fncXM21P3W_Io_Ior_InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_3P3W_Io_Ior) {    // XM2-3P4W
                        strCompanyAllDsp += fncXM23P3W_Io_Ior_InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KMN1) {    // KMN1
                        strCompanyAllDsp += fncKMN1InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KM50) {    // KM50
                        strCompanyAllDsp += fncKM50InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KW1M) {    // KW1M
                        strCompanyAllDsp += fncKW1MInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KW2G) {    // KW2G
                        strCompanyAllDsp += fncKW2GInstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_2) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_3) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_4) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_5) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_6) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_7) {    // EMU4
                        strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                    }
                    else {

                    }
                }
            }

            strCompanyAllDsp += '</div>';
        }
    }

    document.getElementById("idgroupcontent").innerHTML = strCompanyAllDsp;
    document.getElementById("idcompanycontent").innerHTML = "";
    document.getElementById("idgraphcontent").innerHTML = "";
    fncGetGroupData(false);
}

/**
 * すべてデータ表示関数の作成
 */
function fncMakeAlldataDspContent() {
    // 登録したユニットの瞬時値のHTMLを作成する
    fncMakeInstantHtml();

    // 登録したグラフの瞬時値のHTMLを作成する
    fncMakeCombiGraphInstanHtml(true);

    // 瞬時値を格納する
    fncGetAllData(true);
}

/**
 * ユニットの瞬時値のHTMLを作成する
 */
function fncMakeInstantHtml() {
    // ホームタブの表示中、瞬時値テーブルを表示しない
    if (gintIotGatewayId < 0) return;

    var strCompanyAllDsp = "";
    var strTitle = "";

    /* PreId make */
    gobjPreId = [];
    /* Setting data clear */
    gobjSettingValue = [];
    /* エラー状態チェック */
    if (objTreeView.Status !== 200) {
        return;
    }

    /* TreeView作成 */
    // strCompanyAllDsp = fncCompanyTitleDspMake(fncGetCorpName());
    strCompanyAllDsp = fncCompanyTitleDspMake(fnGetGWName());
    var grpAllGrp = [];
    var grpVal = [];
    var grpUnitVal = [];
    var grpSubUnitVal;
    var grpAllGrpSet = [];
    var grpValSet = [];
    var grpUnitValSet = [];
    var grpSubUnitValSet;

    for (i in objTreeView.Respons.GroupList) {
        strTitle = escapeHtml(jis2chr(objTreeView.Respons.GroupList[i].GroupTitleCode));
        strCompanyAllDsp += fncGrpInstValDsnMake('idgrp' + i, strTitle);
        tmp = { "grppreid": 'idgrp' + i }
        grpVal = [];
        grpValSet = [];

        grpUnitVal = [];
        grpUnitValSet = [];
        for (j in objTreeView.Respons.GroupList[i].LoRaUnitList) {

            if (objTreeView.Respons.GroupList[i].LoRaUnitList[j] !== "NULL") {
                strTitle = escapeHtml(jis2chr(objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTitleCode));
                if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A4C4) {
                    strCompanyAllDsp += fncHlrInstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C1) {
                    strCompanyAllDsp += fncHlrc1InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C2) {
                    strCompanyAllDsp += fncHlrc2InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_C8_IN) {
                    strCompanyAllDsp += fncHlrc8inInstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_RS485) {
                    strCompanyAllDsp += fncHlrRs485InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A1) {
                    strCompanyAllDsp += fncHlrA1InstValDsnMake('idunit' + i + j, strTitle);
                }
                else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode == UnitCode.HLR_A8) {
                    strCompanyAllDsp += fncHlra8InstValDsnMake('idunit' + i + j, strTitle);
                }

                grpSubUnitVal = [];
                grpSubUnitValSet = [];
                for (k in objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList) {
                    if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k] !== "NULL") {
                        strTitle = escapeHtml(jis2chr(objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTitleCode));

                        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HLR_A4C4) {          // HR-A4C4
                            strCompanyAllDsp += fncHrInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HR_A4C4) {      // HR-A4C4
                            strCompanyAllDsp += fncHrInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HR_A8) {        // HR-A8
                            strCompanyAllDsp += fncHrA8InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.HR_C8_IN) {        // HR-C8_IN
                            strCompanyAllDsp += fncHrc8inInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_1P3W) {    // TWPM-1P3W
                            strCompanyAllDsp += fncTWPM1P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_3P3W) {    // TWPM-3P3W
                            strCompanyAllDsp += fncTWPM3P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_3P4W) {    // TWPM-3P4W
                            strCompanyAllDsp += fncTWPM3P4WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPM_1P2W) {    // TWPM-1P2W
                            strCompanyAllDsp += fncTWPM1P2WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_1P3W) {    // XM2-1P3W
                            strCompanyAllDsp += fncXM21P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_3P3W) {    // XM2-3P3W
                            strCompanyAllDsp += fncXM23P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_3P4W) {    // XM2-3P4W
                            strCompanyAllDsp += fncXM23P4WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_1P2W) {    // XM2-1P2W
                            strCompanyAllDsp += fncXM21P2WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWP8C) {    // TWP8C
                            strCompanyAllDsp += fncTWP8CInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XS2_1P3W) {    // XS2-1P3W
                            strCompanyAllDsp += fncXS21P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XS2_3P3W) {    // XS2-3P3W
                            strCompanyAllDsp += fncXS23P3WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XS2_1P2W) {    // XS2-1P2W
                            strCompanyAllDsp += fncXS21P2WInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPS) {    // TWPS
                            strCompanyAllDsp += fncTWPSInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.TWPP) {    // TWPP
                            strCompanyAllDsp += fncTWPPInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_1P3W_Io_Ior) {    // XM2-3P3W
                            strCompanyAllDsp += fncXM21P3W_Io_Ior_InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.XM2_3P3W_Io_Ior) {    // XM2-3P4W
                            strCompanyAllDsp += fncXM23P3W_Io_Ior_InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KMN1) {    // KMN1
                            strCompanyAllDsp += fncKMN1InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KM50) {    // KM50
                            strCompanyAllDsp += fncKM50InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KW1M) {    // KW1M
                            strCompanyAllDsp += fncKW1MInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.KW2G) {    // KW2G
                            strCompanyAllDsp += fncKW2GInstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_2) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_3) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_4) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_5) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_6) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode == UnitCode.EMU4_7) {    // EMU4
                            strCompanyAllDsp += fncEMU4InstValDsnMake('idrs' + i + j + k, strTitle);
                        }
                        else {

                        }
                        grpSubUnitValSet.push({ "setting": null, "type": objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitTypeCode });
                        grpSubUnitVal.push({ "subunitpreid": 'idrs' + i + j + k });
                    }
                }

                grpUnitVal.push({ "unitpreid": 'idunit' + i + j, "subunits": grpSubUnitVal });
                grpUnitValSet.push({ "setting": null, "type": objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitTypeCode, "subunits": grpSubUnitValSet });
                strCompanyAllDsp += '</div>';
            }
            else {

            }
        }

        strCompanyAllDsp += '</div>';
        grpAllGrp.push({ "grppreid": 'idgrp' + i, "units": grpUnitVal });
        grpAllGrpSet.push({ "setting": null, "units": grpUnitValSet });

    }

    grpVal.push({ "Status": 200, "groups": grpAllGrp });
    grpValSet.push({ "Status": 200, "groups": grpAllGrpSet });
    gobjPreId = grpVal[0];
    gobjSettingValue = grpValSet[0];
    document.getElementById("idcompanycontent").innerHTML = strCompanyAllDsp;

}

/*  機能：  積算グラフを描画
            "chartjs.js"ライブラリを使用して、グラフを描画
    引数：
            ctx：       canvas 2d content オブジェクト
            data_x：    時間
            data_y：    計測値
            data_num：  データ数
            di_setting：DIの設定値
    戻り値： グラフオブジェクト
*/
function draw_graph_line(ctx, data_x, data_y, data_num, di_setting) {
    var grptype;
    var tmpdatashet;
    var data_y_time = [];
    var data_y_warnH = [];
    var data_y_warnL = [];
    var min, max;
    var tmpxAxes;
    var labeltime = [];

    min = gGraphStartTime;
    max = gGraphEndTime;
    if (iperiodtime <= 6) {
        for (i = 0; i < data_num; i++) {
            var tmplabeltime = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            labeltime[i] = moment(tmplabeltime, "HH:mm:ss");
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 14,
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
                    minute: "HH:mm"
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"

        }];

    } else {
        for (i = 0; i < data_num; i++) {
            var tmplabeltime = ("00" + moment(data_x[i]).month().toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2) + " " + ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            labeltime[i] = moment(tmplabeltime, "MM/DD HH:mm:ss");
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 14,
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
                    minute: "MM/DD"
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"

        }];
    }

    data_y_warnH[0] = { x: (min), y: di_setting.Alarm[1] };
    data_y_warnH[1] = { x: (max), y: di_setting.Alarm[1] };
    data_y_warnL[0] = { x: (min), y: di_setting.Alarm[0] };
    data_y_warnL[1] = { x: (max), y: di_setting.Alarm[0] };

    if ((di_setting.AlarmE[1] == 1) && (di_setting.AlarmE[0] == 1)) {
        grptype = 'line';
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
        },
        {
            data: data_y_warnL,
            //データポイントの設定          表示しない
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            //ラインの設定
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "#F2C94C",
            borderWidth: 2,
            //ラインの下に着色しない
            type: 'line',
            fill: false
        }
        ];
    }
    else if ((di_setting.AlarmE[1] == 1) && (di_setting.AlarmE[0] == 0)) {
        grptype = 'line';
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
    else if ((di_setting.AlarmE[1] == 0) && (di_setting.AlarmE[0] == 1)) {
        grptype = 'line';
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
            data: data_y_warnL,
            //データポイントの設定          表示しない
            pointRadius: 0,
            pointHoverRadius: 0,
            pointHitRadius: 0,
            //ラインの設定
            backgroundColor: "rgba(0,0,0,0.2)",
            borderColor: "#F2C94C",
            borderWidth: 2,
            //ラインの下に着色しない
            type: 'line',
            fill: false
        }
        ];
    }
    else {
        grptype = 'line';
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
        }
        ];
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
                        beginAtZero: false,
                        max: di_setting.Graph[1],
                        min: di_setting.Graph[0],
                        callback: function (label, index, labels) {
                            return label.toFixed(decpnt);
                        }
                    }
                }]
            },
            //自動的にサイズを変更機能を無効にする
            Responsive: true,
            maintainAspectRatio: false
        }
    });

    return myChart;
}


/*  機能：  積算グラフを更新
    引数：
            myChart：   グラフオブジェクト
            data_x：    横軸のデータ        時間
            data_y：    縦軸のデータ
            data_num：  データ数
            di_setting：設定値
*/
function graph_line_update(myChart, data_x, data_y, data_num, di_setting) {
    var data_y_time = [];
    var data_y_warnH = [];
    var data_y_warnL = [];
    var min, max;
    var labeltime = [];

    min = gGraphStartTime;
    max = gGraphEndTime;

    if (iperiodtime <= 6) {
        for (i = 0; i < data_num; i++) {
            var tmplabeltime = ("00" + moment(data_x[i]).month().toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2) + " " + ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            labeltime[i] = moment(tmplabeltime, "MM/DD HH:mm:ss");
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 14,
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
                    minute: "HH:mm"
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"

        }];
    } else {
        for (i = 0; i < data_num; i++) {
            var tmplabeltime = ("00" + moment(data_x[i]).month().toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2) + " " + ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            labeltime[i] = moment(tmplabeltime, "MM/DD HH:mm:ss");
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
        tmpxAxes = [{
            ticks: {
                autoSkip: true,
                maxTicksLimit: 14,
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
                    minute: "MM/DD"
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"

        }];
    }

    myChart.options.scales.xAxes = tmpxAxes;

    // 線を繋がる事を更新する
    myChart.data.datasets[0].showLine = gShowLineFlg;

    if (di_setting.AlarmE[1] == 1 && di_setting.AlarmE[0] == 1) {

        data_y_warnH[0] = { x: (min), y: di_setting.Alarm[1] };
        data_y_warnH[1] = { x: (max), y: di_setting.Alarm[1] };
        data_y_warnL[0] = { x: (min), y: di_setting.Alarm[0] };
        data_y_warnL[1] = { x: (max), y: di_setting.Alarm[0] };

        //横軸のデータ          時間
        //縦軸のデータ          カウンター値
        myChart.data.datasets[0].data = data_y_time;

        //グラフタイプ
        myChart.data.datasets[1].data = data_y_warnH;

        //グラフタイプ
        myChart.data.datasets[2].data = data_y_warnL;

        //グラフ上限
        myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];
        myChart.options.scales.yAxes[0].ticks.min = di_setting.Graph[0];

        //時軸
        myChart.options.scales.xAxes[0].ticks.max = max;
        myChart.options.scales.xAxes[0].ticks.min = min;
        myChart.options.scales.xAxes[0].time.stepSize = grpXAxisPeriod;

        //グラフを更新
        myChart.update();
    }
    else if (di_setting.AlarmE[1] == 1 && di_setting.AlarmE[0] == 0) {

        data_y_warnH[0] = { x: (min), y: di_setting.Alarm[1] };
        data_y_warnH[1] = { x: (max), y: di_setting.Alarm[1] };

        //横軸のデータ          時間
        //縦軸のデータ          カウンター値
        myChart.data.datasets[0].data = data_y_time;

        //グラフタイプ
        myChart.data.datasets[1].data = data_y_warnH;

        //グラフ上限
        myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];
        myChart.options.scales.yAxes[0].ticks.min = di_setting.Graph[0];

        //時軸
        myChart.options.scales.xAxes[0].ticks.max = max;
        myChart.options.scales.xAxes[0].ticks.min = min;
        myChart.options.scales.xAxes[0].time.stepSize = grpXAxisPeriod;

        //グラフを更新
        myChart.update();
    }
    else if (di_setting.AlarmE[1] == 0 && di_setting.AlarmE[0] == 1) {

        data_y_warnL[0] = { x: (min), y: di_setting.Alarm[0] };
        data_y_warnL[1] = { x: (max), y: di_setting.Alarm[0] };

        //横軸のデータ          時間
        //縦軸のデータ          カウンター値
        myChart.data.datasets[0].data = data_y_time;

        //グラフタイプ
        myChart.data.datasets[1].data = data_y_warnL;

        //グラフ上限
        myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];
        myChart.options.scales.yAxes[0].ticks.min = di_setting.Graph[0];

        //時軸
        myChart.options.scales.xAxes[0].ticks.max = max;
        myChart.options.scales.xAxes[0].ticks.min = min;
        myChart.options.scales.xAxes[0].time.stepSize = grpXAxisPeriod;

        //グラフを更新
        myChart.update();
    }
    else {
        //縦軸のデータ          カウンター値
        myChart.data.datasets[0].data = data_y_time;

        //グラフ上限
        myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];
        myChart.options.scales.yAxes[0].ticks.min = di_setting.Graph[0];

        //時軸
        myChart.options.scales.xAxes[0].ticks.max = max;
        myChart.options.scales.xAxes[0].ticks.min = min;
        myChart.options.scales.xAxes[0].time.stepSize = grpXAxisPeriod;

        //グラフを更新
        myChart.update();
    }
}

/*  機能：  差分グラフを描画
            "chartjs.js"ライブラリを使用して、グラフを描画
    引数：
            ctx：       canvas 2d content オブジェクト
            data_x：    時間
            data_y：    計測値
            data_num：  データ数
            di_setting：DIの設定値
    戻り値： グラフオブジェクト
*/
function draw_graph_bar(ctx, data_x, data_y, data_num, di_setting) {
    var grptype;
    var tmpdatashet;
    var tmpxAxes;
    var labeltime = [];
    var data_y_time = [];


    if (iperiodtime <= 6) {
        for (i = 0; i < data_num; i++) {
            labeltime[i] = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
    } else {
        for (i = 0; i < data_num; i++) {
            labeltime[i] = ("00" + (moment(data_x[i]).month() + 1).toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2);
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

    // Scale decimals points
    var decpnt = di_setting.Point;

    /*電力量、無効電力量は警報対象から外す*/
    grptype = 'bar';
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
    }
    ];

    tmpxAxes = [{
        ticks: {
            autoSkip: true,
            maxTicksLimit: 31
        }
    }];


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
            //自動的にサイズを変更機能を無効にする
            Responsive: true,
            maintainAspectRatio: false
        }
    });

    return myChart;
}


/*  機能：  差分のグラフを更新
    引数：
            myChart：   グラフオブジェクト
            data_x：    横軸のデータ        時間
            data_y：    縦軸のデータ
            data_num：  データ数
            di_setting：設定値
*/
function graph_bar_update(myChart, data_x, data_y, data_num, di_setting) {
    var labeltime = [];
    var data_y_time = [];

    if (iperiodtime <= 6) {
        for (i = 0; i < data_num; i++) {
            labeltime[i] = ("00" + moment(data_x[i]).hour().toString()).slice(-2) + ":" + ("00" + moment(data_x[i]).minute().toString()).slice(-2);
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
    } else {
        for (i = 0; i < data_num; i++) {
            labeltime[i] = ("00" + (moment(data_x[i]).month() + 1).toString()).slice(-2) + "/" + ("00" + moment(data_x[i]).date().toString()).slice(-2);
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
    }

    if (typeof di_setting.AlarmE !== 'undefined') {
        if (di_setting.AlarmE[1] == 1) {
            //グラフタイプ
            myChart.data.datasets[1].data = Array.apply(null, new Array(data_num)).map(Number.prototype.valueOf, di_setting.Alarm[1])
            data_y_time[i] = { x: data_x[i], y: data_y[i] };
        }
    }
    //横軸のデータ          時間
    myChart.data.labels = labeltime;
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
    myChart.data.datasets[0].data = data_y_time;
    //グラフ上限
    myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];
    //グラフを更新
    myChart.update();
}


// =====================================================================================================================
/**
 * Index CSVPattern menu のHTMLを作成する
 */
function fncMakeCSVPatternTreeview(obj) {
    if (obj == null) return;
    //ホームタブにのみSCVメニューを表示する
    if (gintIotGatewayId < 0) {
        // Check the Enable Graph
        if (obj.Respons.CSVPattern.length == 0) return;

        document.getElementById("indexcsvmenuhome").innerHTML = "";
        document.getElementById("indexcsvmenuhome").style.display = "block";

        var i;
        var str = "";
        var bSelectFlg = false;

        // ツーリのHTML-Templateを作成する
        str += '<button id="';
        str += "idcsvpAll" + '\"';
        str +=
            'class="list-group-item list-group-item-action pl-3 pr-2 d-inline-flex align-items-center" onclick="csvpatterntvclk(';
        str += "'" + "idcsvpAll" + "'" + "," + 0 + ')">';
        str += '<span class="tv-resize">';
        str += "<strong>" + obj.Respons.CSVGroupName + "</strong>";
        str += "</span>";
        str += "</button>";

        for (i in obj.Respons.CSVPattern) {
            if (obj.Respons.CSVPattern[i] !== null) {
                str += '<button id="';
                str += "idcsvp" + i + '"';
                str +=
                    'class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center" onclick="csvpatterntvclk(';
                str += "'" + "idcsvp" + i + "'" + "," + i + ')"';
                str += '><span style="width: 0.7rem"> </span>';
                str += '<span class="tv-resize"> ';
                str += obj.Respons.CSVPattern[i].PatternName;
                str += "</span>";
                str += "</button>";
            }

            // ページをロードすると、最初のグラフを指定する
            if (bSelectFlg == false) {
                bSelectFlg = true;
                gCurCSVPatternIdx = i; //0
                gCSVPatternLstId = "idcsvp" + i; //idcsvp0
            }
        }

        document.getElementById("indexcsvmenuhome").innerHTML = str;
    }
    //他のタブにはCSVメニューを表示しない
    else {
        document.getElementById("indexcsvmenuhome").innerHTML = "";
    }
}

var gCurCSVPatternIdx;                   //任意選択CSVのインデックス
function csvpatterntvclk(curId, csvpIndex) {
    // TOP画面表示の時
    if (gintIotGatewayId < 0) {
        document.getElementById("CSVmain").style.display = "block";
        document.getElementById("mainAlarmShow").style.display = "none";
        document.getElementById("idgraphcontent").style.display = "none";
        document.getElementById("garphlist_content").style.display = "none";
        // deleted 2022/10/13 btnHakaruCom.classList.remove("navbar-brand-active");
        if ((lstidGateway != curId)) {

            // Clear the the device path       
            document.getElementById("device_path").innerHTML = "";
            // グラフ要求時間バー初期化
            // fncGraphTimerBarInit();
            /*テーブルのTEMPLATEをクリアする*/
            $("#tblLogging").empty();
            document.getElementById("headerrow").innerHTML = "";
            // 「表示更新」ボタン
            $("#idbtnDispLog").prop("disabled", false);
            // 「表示更新」ボタンのspinnerがあれば外す
            $("#idbtnDispLog").html(
                '<span ></span> 表示更新'
            );

            // 「ダウンロード」ボタンを有効する
            $("#idbtnDownload").prop("disabled", false);
            // 「ダウンロード」ボタンからスピンナーを外す
            $("#idbtnDownload").html(
                '<span ></span> ダウンロード'
            );

            // Reset Hscroll position
            var elmnt = document.getElementById("idTableContent");
            elmnt.scrollLeft = 0;
            elmnt.scrollTop = 0;
            $(window).scrollTop(0);
        }

        // 現在のCSVパターンのインデックスを更新する
        gCurCSVPatternIdx = csvpIndex;

        // [ＣＳＶ出力]をクリックする場合
        if (curId == "idcsvpAll") {
            console.log(" csvpatterntvclk2");
            // Select to the「出力１」
            var idfirstunit = "idcsvp0";
            if (document.getElementById(idfirstunit)) {
                csvpatterntvclk(idfirstunit, 0);
                return;
            }
        }
        // 出力１～５をクリックする時
        else {
            gunit = objTreeView.Respons.CSVPattern[gCurCSVPatternIdx].Id;
        }

        // 現在のCSVパターンをアクティブする
        var eleCurrent = document.getElementById(curId);
        eleCurrent.classList.add("active");

        // 前の選択グラフを外します
        if ((lstidGateway != "Dummy") && (lstidGateway != curId)) {
            var eleLast = document.getElementById(lstidGateway);
            eleLast.classList.remove("active");
        }
        // 選択しているユニットのＩＤを更新する
        lstidGateway = curId;
        window.location = "/logging.html?idcsv=" + curId;
    } else {
        document.getElementById("CSVmain").style.display = "none";
    }

}

function showPickup(nobj) {
    // メニューのHTML-Templateを作成する
    document.getElementById("idLoading").style.display = "none";
    document.getElementById("indexpickupmenu").style.display = "block";
    document.getElementById("mainPickupShow").style.display = "block";
    let strIotGateway = "";
    // 機器一覧
    strIotGateway += '<button class="list-group-item list-group-item-action pl-3 pr-2 d-inline-flex align-items-center">';
    strIotGateway += '<span id="titleMenu" class="tv-resize">';
    strIotGateway += '<strong>' + escapeHtml(nobj.Respons.GroupName) +'</strong>';
    strIotGateway += '</span>';
    strIotGateway += '<i class="bi bi-list" id="show-sidebar" style="display: none; position: absolute"></i>';
    strIotGateway += '</button>';


    strIotGateway += '<button class="ml-auto" id="idPickupMenuBtn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="z-index: 9999;">';
    strIotGateway += '<i class="bi bi-three-dots-vertical submenu-icon"></i>';
    strIotGateway += '<ul class="dropdown-menu dropdown-menu-left">';
    strIotGateway += '<li><a id="idSortableBtn" class="dropdown-item" href="#">並び替え</a></li>';
    strIotGateway += '</ul>';
    strIotGateway += '</button>';

    strIotGateway += '<button id="close-sidebar" class="sidebar-toggle">';
    strIotGateway += '<i class="bi bi-x-lg"></i>';
    strIotGateway += '</button>';


    strIotGateway += '<button id="pin-sidebar" style="display: none;">';
    strIotGateway += '<i class="bi bi-pin-angle"></i>';
    strIotGateway += '</button>';


    lstidPickupNo = "";
    let indexTemp =0;
    strIotGateway += '<div id="sortable-list">';
    strIotGateway += '<div class="btn-container">';
    strIotGateway += '<button id="saveBtn">保存</button>';
    strIotGateway += '<button id="closeBtn">X</button>';
    strIotGateway += '</div>';
    for (i in nobj.Respons.GroupList) {
        let tmpGateway = "";
        if (nobj.Respons.GroupList[i] !== undefined && nobj.Respons.GroupList[i].enable === 1) {
            tmpGateway +=
            '<button class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center" id="';
            tmpGateway += "idPickupNo" + nobj.Respons.GroupList[i].pickupNo + '"';
            tmpGateway += ' data-id="' + nobj.Respons.GroupList[i].pickupNo + '"';
            tmpGateway += ' onclick="fncPickupMenuClick(';
            tmpGateway += "'idPickupNo" + nobj.Respons.GroupList[i].pickupNo + "'," +nobj.Respons.GroupList[i].locationFixFlag ;
            tmpGateway += ')">';
            
            tmpGateway += '<span style="width: 0.7rem">　</span>';
            // tmpGateway += '<span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0"></span>';
            tmpGateway += '<span  class="tv-resize">${name}</span>';
            tmpGateway += '<span class="sortable-handle" style="display:none;cursor:pointer;margin-left:auto;">';
            tmpGateway += '<i class="bi bi-list"></i>';
            tmpGateway += '</span></button>';

            strIotGateway += tmpGateway
            .replaceAll("${name}", escapeHtml(nobj.Respons.GroupList[i].name))
            .replaceAll("${id}", nobj.Respons.GroupList[i].pickupNo);
        
            // 最初のID
            if (lstidPickupNo === "") {
                lstidPickupNo = "idPickupNo" + nobj.Respons.GroupList[i].pickupNo;
                indexTemp=i;
            }
        }
    }
    strIotGateway += '</div>';

    if (document.getElementById("indexpickupmenu")) {
        document.getElementById("indexpickupmenu").innerHTML = strIotGateway;
        fncPickupMenuClick(lstidPickupNo,nobj.Respons.GroupList[indexTemp].locationFixFlag)
    }
    $(document).ready(function() {
        let saved = true; // Đặt giá trị ban đầu là true để không hiển thị hộp thoại xác nhận đóng
        let originalOrder = [];
      
        // Bắt sự kiện khi nhấp vào nút "並び替え"
        $("#idSortableBtn").click(function() {
          // Hiển thị icon sắp xếp trên các phần tử
          let elementArray = [];
          const element = document.querySelector('#sortable-list');
          const sortable = Sortable.create(element, {
            animation: 150,
            handle: ".sortable-handle",
            onUpdate: function(evt) {
              elementArray = [];
              evt.to.childNodes.forEach(element => {
                elementArray.push(element.innerText);
              });
              console.log(elementArray);
              saved = false; // Cập nhật lại giá trị saved khi có thay đổi trên danh sách
            },
          });
      
          // Ẩn dấu ba chấm và hiển thị hai nút "保存" và "X"
          $("#idPickupMenuBtn").hide();
          $("#close-sidebar").hide();
          $("#saveBtn").show();
          $("#closeBtn").show();
      
          // Lưu lại trạng thái ban đầu của các phần tử trước khi sắp xếp
          originalOrder = $("#sortable-list").children().toArray();
          console.log(originalOrder);
      
          // Hiển thị icon sắp xếp trên các phần tử
          $(".sortable-handle").show();
        });
      
        // Bắt sự kiện khi nhấp vào nút "保存"
        $("#saveBtn").click(function() {
          // Thực hiện lưu dữ liệu ở đây
          saved = true;
          alert("Đã lưu thành công!");
          $("#idPickupMenuBtn").show();
          $("#close-sidebar").show();
          $("#saveBtn").hide();
          $("#closeBtn").hide();
          $(".sortable-handle").hide();
        });
      
        $("#closeBtn").click(function() {
          // Kiểm tra xem đã sắp xếp các phần tử chưa
          if (JSON.stringify(originalOrder) !== JSON.stringify($("#sortable-list").children().toArray())) {
            if (!saved) { // Nếu có thay đổi trên danh sách
              // Hiển thị hộp thoại xác nhận đóng
              if (confirm("Bạn có chắc chắn muốn đóng?")) {
                // Cập nhật lại các phần tử theo thứ tự ban đầu khi chưa sắp xếp chúng
                $("#sortable-list").empty();
                originalOrder.forEach(element => {
                  $("#sortable-list").append(element);
                });
                console.log(originalOrder);
                saved = true; // Cập nhật lại giá trị saved sau khi đã đóng form
                $("#idPickupMenuBtn").show();
                $("#close-sidebar").show();
                $("#saveBtn").hide();
                $("#closeBtn").hide();
                $(".sortable-handle").hide();
              }
            } else {
              // Đóng form và phục hồi trạng thái ban đầu của danh sách
              sortable.destroy();
                $("#sortable-list").empty();
              originalOrder.forEach(element => {
                $("#sortable-list").append(element);
              }); 
              console.log(originalOrder);
              $("#idPickupMenuBtn").show();
              $("#close-sidebar").show();
              $("#saveBtn").hide();
              $("#closeBtn").hide();
              $(".sortable-handle").hide();
            }
          } else {
            // Nếu chưa sắp xếp, đóng form ngay lập tức
            $("#idPickupMenuBtn").show();
            $("#close-sidebar").show();
            $("#saveBtn").hide();
            $("#closeBtn").hide();
            $(".sortable-handle").hide();
          }
        });
      });

    var isSidebarMinimized = false;

    document.getElementById("close-sidebar").addEventListener("click", function () {
    // Kiểm tra xem sidebar có đang ở chế độ thu gọn hay không
    if (!isSidebarMinimized) {
        // Thu gọn sidebar
        document.getElementById("idSideBar").style.maxWidth = "4%";
        document.getElementById("main").style.flex = "0 0 96%";
        document.getElementById("main").style.maxWidth = "96%";
        document.getElementById("main").style.marginTop = "-16px";
        document.getElementById("idSidebarButton").style.display = "none";
        $("#idPickupMenuBtn").hide();
        $("#close-sidebar").hide();
        $("#titleMenu.tv-resize").hide();
        var spans = document.querySelectorAll("#sortable-list span.tv-resize");
        for (var i = 0; i < spans.length; i++) {
        spans[i].setAttribute("data-initial-value", spans[i].textContent);
        spans[i].textContent = i + 1;
        spans[i].classList.add("minimized");
        }
        $("#show-sidebar").show();
        isSidebarMinimized = true; // Đánh dấu sidebar đang ở chế độ thu gọn
    }
    });

    document.getElementById("show-sidebar").addEventListener("click", function () {
    // Mở rộng sidebar
    document.getElementById("idSideBar").style.maxWidth = "16.666667%";
    document.getElementById("main").style.flex = "0 0 83.333333%";
    document.getElementById("main").style.maxWidth = "83.333333%";
    document.getElementById("main").style.marginTop = "0";
    document.getElementById("idSidebarButton").style.display = "none";
    $("#idPickupMenuBtn").show();
    $("#close-sidebar").show();
    $(".tv-resize").show();
    $("#show-sidebar").hide();
    var spans = document.querySelectorAll("#sortable-list span.tv-resize");
    for (var i = 0; i < spans.length; i++) {
        var initialValue = spans[i].getAttribute("data-initial-value");
        if (initialValue) {
        spans[i].textContent = initialValue;
        spans[i].classList.remove("minimized");
        }
    }
    isSidebarMinimized = false; // Đánh dấu sidebar không còn ở chế độ thu gọn
    });

    // Xử lý sự kiện hover vào sortable-list khi sidebar đang ở chế độ thu gọn
    document.getElementById("sortable-list").addEventListener("mouseenter", function () {
    if (isSidebarMinimized) {
        document.getElementById("idSideBar").style.maxWidth = "16.666667%";
        document.getElementById("idSidebarButton").style.display = "none";
        $("#idPickupMenuBtn").hide();
        $('#pin-sidebar').show();
        $("#close-sidebar").hide();
        $(".tv-resize").show();
        $("#show-sidebar").hide();
        var spans = document.querySelectorAll("#sortable-list span.tv-resize");
    for (var i = 0; i < spans.length; i++) {
        var initialValue = spans[i].getAttribute("data-initial-value");
        if (initialValue) {
        spans[i].textContent = initialValue;
        spans[i].classList.remove("minimized");
        }
    }
    }
    });

    document.getElementById("pin-sidebar").addEventListener("click", function () {
        // Mở rộng sidebar
        document.getElementById("idSideBar").style.maxWidth = "16.666667%";
        document.getElementById("main").style.flex = "0 0 83.333333%";
        document.getElementById("main").style.maxWidth = "83.333333%";
        document.getElementById("main").style.marginTop = "0";
        document.getElementById("idSidebarButton").style.display = "none";
        $("#idPickupMenuBtn").show();
        $("#close-sidebar").show();
        $(".tv-resize").show();
        $("#show-sidebar").hide();
        $("#pin-sidebar").hide();
        var spans = document.querySelectorAll("#sortable-list span.tv-resize");
        for (var i = 0; i < spans.length; i++) {
        var initialValue = spans[i].getAttribute("data-initial-value");
        if (initialValue) {
            spans[i].textContent = initialValue;
            spans[i].classList.remove("minimized");
        }
        }
        isSidebarMinimized = false; // Đánh dấu sidebar không còn ở chế độ thu gọn
    });
  
    // Xử lý sự kiện hover ra khỏi sortable-list khi sidebar đang ở chế độ thu gọn
    document.getElementById("idSideBar").addEventListener("mouseleave", function () {
        if (isSidebarMinimized) {
        document.getElementById("idSideBar").style.maxWidth = "4%";
        document.getElementById("main").style.flex = "0 0 96%";
        document.getElementById("main").style.maxWidth = "96%";
        document.getElementById("main").style.marginTop = "-16px";
        document.getElementById("idSidebarButton").style.display = "none";
        $('#pin-sidebar').hide();
        $("#idPickupMenuBtn").hide();
        $("#close-sidebar").hide();
        $("#titleMenu.tv-resize").hide();
        var spans = document.querySelectorAll("#sortable-list span.tv-resize");
        for (var i = 0; i < spans.length; i++) {
            spans[i].textContent = i + 1;
            spans[i].classList.add("minimized");
        }
        $("#show-sidebar").show();
        isSidebarMinimized = true; // Đánh dấu sidebar đang ở chế độ thu gọn
        }
    });
}

function apiPickup(fncCallback) {
    if (gintIotGatewayId >= 0) {
        if (document.getElementById("indexpickupmenu")) {
            document.getElementById("indexpickupmenu").innerHTML = "";
        }
        if (document.getElementById("mainPickupShow")) {
            document.getElementById("mainPickupShow").style.display = "none";
        }
        return;
    }

    var strQuery = apigateway + "path=pickup&type=getGroupList";
    return http.get(strQuery, function (result) {
        //正常
        // console.log(result);
        fncCallback(result);
      }, function (error) {
        /* エラー状態チェック */
        console.log('apiPickup: ' + error);
      });
}

function apiCards(pickupNo, fncCallback) {
    // var strQuery = apigateway + "path=pickup&type=getGroupSetting&pickupNo=" + pickupNo;
    var strQuery = apigateway + "path=pickup&type=getRealtimeData&pickupNo=" + pickupNo;
    return http.get(strQuery, function (result) {
        //正常
        console.log(result);
        fncCallback(result);
      }, function (error) {
        /* エラー状態チェック */
        console.log('apiCards: ' + error);
      });
}

  
// ドラッグアンドドロップ
// function allowDrop(ev) {
//     ev.preventDefault();
// }
  
// function drag(ev) {
//     ev.dataTransfer.setData("card-id", ev.target.id);
// }
  
// function drop(ev) {
//     ev.preventDefault();
//     var data = ev.dataTransfer.getData("card-id");
//     var parent = ev.target;
//     while (parent && data.includes('idDrag')) {
//         console.log(parent.parentNode.className);
//         if (parent.className && parent.className.includes('pickup-card-container')) {
//             parent.appendChild(document.getElementById(data));
//             break;
//         } else if (parent.parentNode.className && parent.parentNode.className.includes('pickup-card-container')) {
//             if (parent.nextSibling) {
//                 parent.parentNode.insertBefore(document.getElementById(data), parent.nextSibling);
//             } else {
//                 parent.parentNode.appendChild(document.getElementById(data));
//             }
//             break;
//         }
//         parent = parent.parentNode;
//     }
// }
