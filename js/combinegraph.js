/*version=1.06*/
//Log here
// 2021/08/05
// HLR-C8-INとHR-C8-IN追加を対応

// 複合グラフ用変数
var gcombigraph_date;
var gcombigraph_exist = false;
var gcombigraph_chart;
var gcombigraph_time = [];      //グラフ用の時間配列
var gcombigraph_data = [];      //ADグラフ用のデータ配列
var gcombigraph_dat_num = [];   //グラフ用のデータ数

var gGraphE = false;                 //複合グラフがあるかどうかフラグ
var gCurCombiGrapIdx;                   //現在の複合グラフのインデックス
var gCombiGraphLstId = "Dummy";                     //最後の複合グラフのID
var gCombiGraphCurId = "Dummy";                     //最後の複合グラフのID
var gCombiGraphListbyUnit = [];
var gObjCombiGraphInstanceVals = {};      //表示用の複合グラフの瞬時値
var gObjCombiGraphInstanceFinished = {};      //表示用の複合グラフの瞬時値のフェッチ完了
var gObjCombiGraphInstanceIntervalID = -1;
var gObjCombiGraphData = {};        //表示用の複合グラフのグラフ値
var gObjCombiGrahpSettingValue;
var gObjCombiGrahpStatus = [];

// グラフの色
var colours = [
    { name: '赤', hex: '#fa3932' },
    { name: '青', hex: '#3271fa' },
    { name: '黄色', hex: '#f5f10a' },
    { name: '緑', hex: '#25f50a' },
    { name: 'オレンジ', hex: '#ff9035' },
    { name: '水色', hex: '#08d7fc' },
    { name: '紫', hex: '#af08fc' },
    { name: '桃色', hex: '#ee29bd' },
    { name: '黒', hex: '#000000' },
    { name: '茶色', hex: '#a7642e' }
];

var GRAPHINDEX = [
    '不使用',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
]

/**
* 複合グラフの瞬時値HTMLを作成する
* isNewloadflg: = true in the first load and 組名称 click
*               = false when 複合グラフ click -> reload the setting is unnessary
*/
function fncMakeCombiGraphInstanHtml(isNewloadflg) {
    var strGraphAllDsp = "";

    // If no Combine Graph to display
    if (gGraphE == false) return;
    // Allow to display graph content
    if (!isNewloadflg) {
        document.getElementById("idgraphcontent").style.display = "block";
    }

    // Combine Graph Setting data clear
    if (gObjCombiGrahpSettingValue.length == 0) {
        gObjCombiGrahpSettingValue = [];
        var grpValSet = []; //Setting Data
        var grpUnitValSet = []; //GraphList setting
        var grpAllGrpSet = []; //CombineGraph setting
        var Unitlist = [];
    }

    // [複合グラフ]テキスト
    strGraphAllDsp =
        '<div class="card px-0 py-0 pr-0 border-0"> \
                    <div class="card-header d-flex justify-content-between border p-2 text-dark bg-light"> \
                        <h4 class="h3 m-0 ">複合グラフ</h4> \
                    </div> \
                </div>';
    // 設定したグラフ(１～１０)の瞬時値テーブル
    for (i in objTreeView.Respons.GraphCombine) {
        grpUnitValSet = [];
        Unitlist = [];
        // グラフの名称
        var strTitle = objTreeView.Respons.GraphCombine[i].GraphName;
        strGraphAllDsp += fncComBiGraphInstValDsnMake('idcombigraph' + i, strTitle, i, grpUnitValSet, isNewloadflg, Unitlist);

        // if (isNewloadflg == true) {
        if (gObjCombiGrahpSettingValue.length == 0) {
            grpAllGrpSet.push({ "GraphName": strTitle, "GraphList": grpUnitValSet });
            gCombiGraphListbyUnit.push({ "GraphName": strTitle, "Unitlist": Unitlist });
        }
    }

    // if (isNewloadflg == true) {
    if (gObjCombiGrahpSettingValue.length == 0) {
        // 複合グラフの設定の配列を作成する
        grpValSet.push({ "Status": 200, "GraphCombine": grpAllGrpSet });
        gObjCombiGrahpSettingValue = grpValSet[0];
        console.log(gObjCombiGrahpSettingValue);
    }

    document.getElementById("idgraphcontent").innerHTML = strGraphAllDsp;
}

/**
 * 複合グラフの瞬時値HTMLを毎に作成する
 * tvid：複合のグラフID
 * title：複合の名称
 */
function fncComBiGraphInstValDsnMake(tvid, title, graphindex, grpUnitValSet, isNewloadflg, Unitlist) {
    var rtnval;
    var sndRowFlg = false;

    if (objTreeView.Respons.GraphCombine[graphindex].GraphList.length == 0) {
        // DISPLAY NODATA
        return '';
    }

    rtnval =
        '<div class="card pb-0 pr-0 border-0"> \
                <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0"> \
                    <h4 id="idcgraphtitle" class="h5 m-0">graphtitlestring \
                    </h4> \
                    <h6 id="cograph_updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
                </div> \
                <div class="card-body px-0 pt-0 pb-3"> \
                    <div class="table-responsive border border-bottom-0 border-left-0 border-right-0 border-top-0 bg-white">';

    rtnval += '<table class="table table-bordered mb-0"> \
                            <tbody> \
                                <tr>';
    for (i in objTreeView.Respons.GraphCombine[graphindex].GraphList) {
        if (objTreeView.Respons.GraphCombine[graphindex].GraphList[i] !== "NULL") {
            if ((i > 4) && (sndRowFlg == false)) {
                rtnval += '</tr>';
                rtnval += '<tr>';
                sndRowFlg = true;
            }
            rtnval += '<th id="id-title-graph' + i + "\"" + ' class="text-center table-active"></th>';
            rtnval += '<td id="idvalgraph' + i + "\"" + ' colspan="2" class="text-right">--</td>';
        }
        // if (isNewloadflg == true) {
        var tmpUnitSetting = null;
        if (objTreeView.Respons.GraphCombine[graphindex].GraphList[i].Setting) {
            tmpUnitSetting = fncProcessSetting(objTreeView.Respons.GraphCombine[graphindex].GraphList[i].UnitTypeCode, objTreeView.Respons.GraphCombine[graphindex].GraphList[i].Setting, objTreeView.Respons.GraphCombine[graphindex].GraphList[i].UnitNo);
        }
        grpUnitValSet.push({
            "GraphSetting": tmpUnitSetting, "UnitTypeCode": objTreeView.Respons.GraphCombine[graphindex].GraphList[i].UnitTypeCode,
            "UnitNo": objTreeView.Respons.GraphCombine[graphindex].GraphList[i].UnitNo,
            "ChannelId": objTreeView.Respons.GraphCombine[graphindex].GraphList[i].ChannelId,
            "Color": objTreeView.Respons.GraphCombine[graphindex].GraphList[i].Color,
            "IotGatewayName": objTreeView.Respons.GraphCombine[graphindex].GraphList[i].IotGatewayName
        });
        // }

        fncSorttheUnitlist(Unitlist, objTreeView.Respons.GraphCombine[graphindex].GraphList[i].IotGatewayId, objTreeView.Respons.GraphCombine[graphindex].GraphList[i].UnitNo, objTreeView.Respons.GraphCombine[graphindex].GraphList[i].UnitTypeCode);

    }
    rtnval += '</tr>';
    rtnval += '</table>';
    rtnval += '</div> \
                        \
                </div> \
            </div>';

    rtnval = rtnval.replace(/idcgraph/g, tvid + "idcgraph");
    rtnval = rtnval.replace(/graphtitlestring/g, title);
    rtnval = rtnval.replace(/cograph_updated_time/g, tvid + "cograph_updated_time");
    rtnval = rtnval.replace(/idvalgraph/g, tvid + "idvalgraph");
    rtnval = rtnval.replace(/id-title-graph/g, tvid + "id-title-graph");

    return rtnval;
}

/**
 * 複合グラフが表示するユニットリスト
 */
function fncSorttheUnitlist(Unitlist, IotGatewayId, UnitNo, UnitTypeCode) {
    // Check Unit No is exist
    for (i in Unitlist) {
        if (Unitlist[i].IotGatewayId == IotGatewayId && Unitlist[i].UnitNo == UnitNo) {
            return;
        }
    }

    // Add new Unitno
    Unitlist.push({
        "IotGatewayId": IotGatewayId,
        "UnitNo": UnitNo,
        "UnitTypeCode": UnitTypeCode
    })
}

/**
 * 複合の設定値と瞬時値を表示処理
 */
function fncDisplayAllCombiGraphRealtime(isUnitChg) {
    // Render待ちをクリア
    if (gObjCombiGraphInstanceIntervalID !== -1) {
        clearInterval(gObjCombiGraphInstanceIntervalID);
        gObjCombiGraphInstanceIntervalID = -1;
    }

    gObjCombiGraphInstanceFinished = {};
    if (gGraphE == false) return;
    let tmprequestid = [];
    const promises = [];
    // Load setting
    for (i in objTreeView.Respons.GraphCombine) {
        var tmpgraphid = 'idcombigraph' + i;

        for (j in objTreeView.Respons.GraphCombine[i].GraphList) {
            // UnitNo
            var tmpUnitNo = objTreeView.Respons.GraphCombine[i].GraphList[j].UnitNo;
            // UnitTypCode
            var tmpUniTypeCode = objTreeView.Respons.GraphCombine[i].GraphList[j].UnitTypeCode;
            // Title ID
            var tmpTileId = 'id-title-graph' + j;
            // RealTimeVal ID
            var tmpValId = 'idvalgraph' + j;
            // ChannelId
            var tmpChannelId = objTreeView.Respons.GraphCombine[i].GraphList[j].ChannelId;
            // Setting Values
            var tmpSettingVals = gObjCombiGrahpSettingValue.GraphCombine[i].GraphList[j].GraphSetting;

            // 設定値がない場合
            if (tmpSettingVals == null) {
                $('#' + tmpgraphid + tmpValId).text('--');
                $('#' + tmpgraphid + "cograph_updated_time").text('データ更新：----/--/-- --:--');
                continue;
            }
            else {
                let strTitle = jis2chr(tmpSettingVals[tmpChannelId].Title);
                if (getIotGatewayId() < 0) {
                    strTitle = jis2chr(gObjCombiGrahpSettingValue.GraphCombine[i].GraphList[j].IotGatewayName) + "：" + strTitle;
                }
                $('#' + tmpgraphid + tmpTileId).text(strTitle);
            }
        }
    }

    // 瞬時値を取得する
    if (isUnitChg == false) {
        for (m in objTreeView.Respons.GraphCombine) {
            for (n in objTreeView.Respons.GraphCombine[m].GraphList) {
                // UnitNo
                var tmpUnitNo = objTreeView.Respons.GraphCombine[m].GraphList[n].UnitNo;
                // UnitTypCode
                var tmpUniTypeCode = objTreeView.Respons.GraphCombine[m].GraphList[n].UnitTypeCode;
                // IOTGWのID
                var gwid = objTreeView.Respons.GraphCombine[m].GraphList[n].IotGatewayId;
                // 管理組織リストを取得する
                // Check if unitno already requested
                if ((tmprequestid.indexOf(gwid) !== -1) && (tmprequestid[gwid].indexOf(tmpUnitNo) !== -1)) {
                    continue;
                }
                tmprequestid[gwid] = tmpUnitNo;
                gObjCombiGraphInstanceFinished[gwid] = {};
                gObjCombiGraphInstanceFinished[gwid][tmpUnitNo] = 10;
                fncGetInstanceDat(tmpUniTypeCode, tmpUnitNo, gwid);
            }
        }

        // [複合グラフ]をクリックする場合、wait 1s for get all instance done
        if (gCombiGraphCurId == "idcombigrp0") {
            gObjCombiGraphInstanceIntervalID = setInterval(fncCheckDoRender, 1000);

            // setTimeout(() => {
            //     fncDoRender();
            // }, 1000);
        }
        else {
            fncDoRender();
        }
    }
    else {
        fncDoRender();
    }


}

/**
 * 複合グラフの表示用に設定値を保存する
 */
function fncSaveSettingforCombiGraph(settingobj, UnitNo) {
    if (gGraphE == false) return;

    if ((gObjCombiGrahpSettingValue) || (gObjCombiGrahpSettingValue.GraphCombine.length > 0)) {
        // Save Setting for Graph Combine
        for (m in gObjCombiGrahpSettingValue.GraphCombine) {
            for (n in gObjCombiGrahpSettingValue.GraphCombine[m].GraphList) {
                if (UnitNo == gObjCombiGrahpSettingValue.GraphCombine[m].GraphList[n].UnitNo) {
                    gObjCombiGrahpSettingValue.GraphCombine[m].GraphList[n].GraphSetting = settingobj;
                }
            }
        }
    };

}

/**
 * 複合グラフの表示用に設定値を処理して、保存する
 */
function fncProcessSetting(unitcode, settingObj, UnitNo) {
    var setobj = [];
    if ((unitcode == UnitCode.HLR_A4C4) || (unitcode == UnitCode.HR_A4C4)) {
        for (var i = 0; i < 4; i++) {
            // Di
            var strprop = "di" + (i + 1).toString() + "_counter";
            setobj[strprop] = settingObj.Di[i];
            // Di TImer
            var strprop = "di" + (i + 1).toString() + "_timer";
            setobj[strprop] = settingObj.DiTimer[i];
            // An
            strprop = "an" + (i + 1).toString();
            setobj[strprop] = settingObj.An[i];
            // An-Max
            var dbmobj1 = {
                Title: settingObj.An[i].Title + chr2sjis(" 最大値"),
                Unit: settingObj.An[i].Unit,
                Graph: settingObj.An[i].Graph,
                Point: settingObj.An[i].Point
            };
            setobj[strprop + "_max"] = dbmobj1;
            // An-Min
            var dbmobj2 = {
                Title: settingObj.An[i].Title + chr2sjis(" 最小値"),
                Unit: settingObj.An[i].Unit,
                Graph: settingObj.An[i].Graph,
                Point: settingObj.An[i].Point
            };
            setobj[strprop + "_min"] = dbmobj2;
            // An-Avg
            var dbmobj3 = {
                Title: settingObj.An[i].Title + chr2sjis(" 平均値"),
                Unit: settingObj.An[i].Unit,
                Graph: settingObj.An[i].Graph,
                Point: settingObj.An[i].Point
            };
            setobj[strprop + "_ave"] = dbmobj3;

        }

        var rssi = {
            "Title": settingObj ? settingObj.RSSI_Title : '',
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };

        setobj["rssi"] = rssi;
    }
    else if ((unitcode == UnitCode.HLR_C1) || (unitcode == UnitCode.HLR_C2) || (unitcode == UnitCode.HLR_C8_IN) || (unitcode == UnitCode.HR_C8_IN)) {
        setobj = settingObj;
        var rssi = {
            "Title": settingObj ? settingObj.RSSI_Title : '',
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };

        setobj["rssi"] = rssi;
    }
    else if (unitcode == UnitCode.HLR_RS485) {
        var rssi = {
            "Title": settingObj ? settingObj.RSSI_Title : '',
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };

        setobj["rssi"] = rssi;
    }
    else if (unitcode == UnitCode.HLR_A1) {
        setobj = settingObj;
        // An-Max
        var dbmobj1 = {
            Title: settingObj.an1_analog.Title + chr2sjis(" 最大値"),
            Unit: settingObj.an1_analog.Unit,
            Graph: settingObj.an1_analog.Graph,
            Point: settingObj.an1_analog.Point
        };
        setobj["an1_analog_max"] = dbmobj1;
        // An-Min
        var dbmobj2 = {
            Title: settingObj.an1_analog.Title + chr2sjis(" 最小値"),
            Unit: settingObj.an1_analog.Unit,
            Graph: settingObj.an1_analog.Graph,
            Point: settingObj.an1_analog.Point
        };
        setobj["an1_analog_min"] = dbmobj2;
        // An-Avg
        var dbmobj3 = {
            Title: settingObj.an1_analog.Title + chr2sjis(" 平均値"),
            Unit: settingObj.an1_analog.Unit,
            Graph: settingObj.an1_analog.Graph,
            Point: settingObj.an1_analog.Point
        };
        setobj["an1_analog_ave"] = dbmobj3;
        // rssi
        var rssi = {
            "Title": settingObj ? settingObj.RSSI_Title : '',
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };
        setobj["rssi"] = rssi;
    }
    else if ((unitcode == UnitCode.HLR_A8) || (unitcode == UnitCode.HR_A8)) {
        setobj = settingObj;

        for (var i = 0; i < 8; i++) {
            var strprop = "an" + (i + 1).toString() + "_analog";

            // An-Max
            var dbmobj1 = {
                Title: settingObj[strprop].Title + chr2sjis(" 最大値"),
                Unit: settingObj[strprop].Unit,
                Graph: settingObj[strprop].Graph,
                Point: settingObj[strprop].Point
            };
            setobj[strprop + "_max"] = dbmobj1;
            // An-Min
            var dbmobj2 = {
                Title: settingObj[strprop].Title + chr2sjis(" 最小値"),
                Unit: settingObj[strprop].Unit,
                Graph: settingObj[strprop].Graph,
                Point: settingObj[strprop].Point
            };
            setobj[strprop + "_min"] = dbmobj2;
            // An-Min
            var dbmobj3 = {
                Title: settingObj[strprop].Title + chr2sjis(" 平均値"),
                Unit: settingObj[strprop].Unit,
                Graph: settingObj[strprop].Graph,
                Point: settingObj[strprop].Point
            };
            setobj[strprop + "_ave"] = dbmobj3;

        }

        var rssi = {
            "Title": settingObj ? settingObj.RSSI_Title : '',
            "Unit": chr2sjis('dBm'),
            'Graph': [-140, 0],
            'Point': 0
        };
        setobj["rssi"] = rssi;
    }
    else if (unitcode == UnitCode.TWPM_1P2W) {
        setobj = settingObj;
        setobj.A_Current["Unit"] = chr2sjis("A");
        setobj.V_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.TWPM_1P3W) {
        setobj = settingObj;
        setobj.A1_Current["Unit"] = chr2sjis("A");
        setobj.AN_Current["Unit"] = chr2sjis("A");
        setobj.A2_Current["Unit"] = chr2sjis("A");
        setobj.V1N_Voltage["Unit"] = chr2sjis("V");
        setobj.V2N_Voltage["Unit"] = chr2sjis("V");
        setobj.V12_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.TWPM_3P3W) {
        setobj = settingObj;
        setobj.AR_Current["Unit"] = chr2sjis("A");
        setobj.AS_Current["Unit"] = chr2sjis("A");
        setobj.AT_Current["Unit"] = chr2sjis("A");
        setobj.VRS_Voltage["Unit"] = chr2sjis("V");
        setobj.VST_Voltage["Unit"] = chr2sjis("V");
        setobj.VTR_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.TWPM_3P4W) {
        setobj = settingObj;
        setobj.AR_Current["Unit"] = chr2sjis("A");
        setobj.AS_Current["Unit"] = chr2sjis("A");
        setobj.AT_Current["Unit"] = chr2sjis("A");
        setobj.AN_Current["Unit"] = chr2sjis("A");
        setobj.VRS_Voltage["Unit"] = chr2sjis("V");
        setobj.VST_Voltage["Unit"] = chr2sjis("V");
        setobj.VTR_Voltage["Unit"] = chr2sjis("V");
        setobj.VRN_Voltage["Unit"] = chr2sjis("V");
        setobj.VSN_Voltage["Unit"] = chr2sjis("V");
        setobj.VTN_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.XM2_1P2W) {
        setobj = settingObj;
        setobj.A_Current["Unit"] = chr2sjis("A");
        setobj.V_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.XM2_1P3W) {
        setobj = settingObj;
        setobj.A1_Current["Unit"] = chr2sjis("A");
        setobj.AN_Current["Unit"] = chr2sjis("A");
        setobj.A2_Current["Unit"] = chr2sjis("A");
        setobj.V1N_Voltage["Unit"] = chr2sjis("V");
        setobj.V2N_Voltage["Unit"] = chr2sjis("V");
        setobj.V12_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.XM2_3P3W) {
        setobj = settingObj;
        setobj.AR_Current["Unit"] = chr2sjis("A");
        setobj.AS_Current["Unit"] = chr2sjis("A");
        setobj.AT_Current["Unit"] = chr2sjis("A");
        setobj.VRS_Voltage["Unit"] = chr2sjis("V");
        setobj.VST_Voltage["Unit"] = chr2sjis("V");
        setobj.VTR_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.XM2_3P4W) {
        setobj = settingObj;
        setobj.AR_Current["Unit"] = chr2sjis("A");
        setobj.AS_Current["Unit"] = chr2sjis("A");
        setobj.AT_Current["Unit"] = chr2sjis("A");
        setobj.AN_Current["Unit"] = chr2sjis("A");
        setobj.VRS_Voltage["Unit"] = chr2sjis("V");
        setobj.VST_Voltage["Unit"] = chr2sjis("V");
        setobj.VTR_Voltage["Unit"] = chr2sjis("V");
        setobj.VRN_Voltage["Unit"] = chr2sjis("V");
        setobj.VSN_Voltage["Unit"] = chr2sjis("V");
        setobj.VTN_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");

    }
    else if (unitcode == UnitCode.TWP8C) {
        for (var i = 0; i < 8; i++) {
            var strprop = "di" + (i + 1).toString();
            setobj[strprop] = settingObj.Di[i];
        }
    }
    else if (unitcode == UnitCode.XS2_1P2W) {
        setobj = settingObj;
        setobj.A_Current["Unit"] = chr2sjis("A");
        setobj.V_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.XS2_1P3W) {
        setobj = settingObj;
        setobj.A1_Current["Unit"] = chr2sjis("A");
        setobj.AN_Current["Unit"] = chr2sjis("A");
        setobj.A2_Current["Unit"] = chr2sjis("A");
        setobj.V1N_Voltage["Unit"] = chr2sjis("V");
        setobj.V2N_Voltage["Unit"] = chr2sjis("V");
        setobj.V12_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.XS2_3P3W) {
        setobj = settingObj;
        setobj.AR_Current["Unit"] = chr2sjis("A");
        setobj.AS_Current["Unit"] = chr2sjis("A");
        setobj.AT_Current["Unit"] = chr2sjis("A");
        setobj.VRS_Voltage["Unit"] = chr2sjis("V");
        setobj.VST_Voltage["Unit"] = chr2sjis("V");
        setobj.VTR_Voltage["Unit"] = chr2sjis("V");
        setobj.F_Frequency["Unit"] = chr2sjis("Hz");
        setobj.PF_PowerFactor["Unit"] = chr2sjis("%");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.var_Power["Unit"] = chr2sjis("kvar");
    }
    else if (unitcode == UnitCode.TWPS) {
        setobj = settingObj;
        setobj.W_Power["Unit"] = chr2sjis("kW");
    }
    else if (unitcode == UnitCode.TWPP) {
        return null;
    }
    else if (unitcode == UnitCode.XM2_1P3W_Io_Ior) {
        setobj = settingObj;
        setobj.A1_Current["Unit"] = chr2sjis("A");
        setobj.AN_Current["Unit"] = chr2sjis("A");
        setobj.A2_Current["Unit"] = chr2sjis("A");
        setobj.V1N_Voltage["Unit"] = chr2sjis("V");
        setobj.V2N_Voltage["Unit"] = chr2sjis("V");
        setobj.V12_Voltage["Unit"] = chr2sjis("V");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.Io_Current["Unit"] = chr2sjis("mA");
        setobj.Ior_Current["Unit"] = chr2sjis("mA");
        setobj.IoMAX_Current["Unit"] = chr2sjis("mA");
        setobj.IorMAX_Current["Unit"] = chr2sjis("mA");
    }
    else if (unitcode == UnitCode.XM2_3P3W_Io_Ior) {
        setobj = settingObj;
        setobj.AR_Current["Unit"] = chr2sjis("A");
        setobj.AS_Current["Unit"] = chr2sjis("A");
        setobj.AT_Current["Unit"] = chr2sjis("A");
        setobj.VRS_Voltage["Unit"] = chr2sjis("V");
        setobj.VST_Voltage["Unit"] = chr2sjis("V");
        setobj.VTR_Voltage["Unit"] = chr2sjis("V");
        setobj.W_Power["Unit"] = chr2sjis("kW");
        setobj.Io_Current["Unit"] = chr2sjis("mA");
        setobj.Ior_Current["Unit"] = chr2sjis("mA");
        setobj.IoMAX_Current["Unit"] = chr2sjis("mA");
        setobj.IorMAX_Current["Unit"] = chr2sjis("mA");
    }
    else {
        return null;
    }

    fncSaveSettingforCombiGraph(setobj, UnitNo);
    return setobj;
}

/**
 * グラフ用イアコル状態を格納する
 */
function fncSaveStatusCombineUnits(gwid, obj) {
    if (gwid < 0) return;
    if (gGraphE == false) return;
    var unitno;
    gObjCombiGrahpStatus[gwid] = [];

    if (obj.Status == 200) {
        if (objTreeView.Respons.GraphCombine.length > 0) {
            for (var i in obj.Respons.GroupList) {
                for (var j in obj.Respons.GroupList[i].LoRaUnitList) {
                    unitno = obj.Respons.GroupList[i].LoRaUnitList[j].UnitNo;

                    // var listPropertyNames = Object.keys(gObjCombiGrahpStatus[gwid]);
                    // var strUniNo = unitno.toString();
                    gObjCombiGrahpStatus[gwid][unitno] = obj.Respons.GroupList[i].LoRaUnitList[j].Status;
                    // If the status values of current UnitNo-Unit not get yet -> Save
                    // if (listPropertyNames.includes(strUniNo) == false) {
                    //     gObjCombiGrahpStatus[gwid][unitno] = obj.Respons.GroupList[i].LoRaUnitList[j].Status;
                    // }

                    for (var k in obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList) {
                        unitno = obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].UnitNo;
                        gObjCombiGrahpStatus[gwid][unitno] = obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status;
                        // var listPropertyNames = Object.keys(gObjCombiGrahpStatus[gwid]);
                        // var strUniNo = unitno.toString();
                        // // If the status values of current UnitNo-Unit not get yet -> Save
                        // if (listPropertyNames.includes(strUniNo) == false) {
                        //     gObjCombiGrahpStatus[gwid][unitno] = obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status;
                        // }
                    }
                }
            }
        }
    }
}

/**
 * 複合グラフの表示用に瞬時値を保存する
 */
function fncSaveInstanceforCombiGraph(instanceObj, UnitNo, gwid) {
    if (gGraphE == false) return;

    // Make a dictionary to save Instance Values by UnitNo
    //  {UnitNo1: Value1, UnitNo2: Value2,.....}
    var listPropertyNames = Object.keys(gObjCombiGraphInstanceVals);
    var strUniNo = UnitNo.toString();

    if (gObjCombiGraphInstanceVals.hasOwnProperty(gwid) == false) {
        gObjCombiGraphInstanceVals[gwid] = [];
    }
    gObjCombiGraphInstanceVals[gwid][UnitNo] = instanceObj;
}

function fncCheckDoRender() {
    if (gObjCombiGraphInstanceFinished) {
        let allFinished = true;
        const gwids = Object.keys(gObjCombiGraphInstanceFinished);
        for (i in gwids) {
            const keyGW = gwids[i];
            const unitNos = Object.keys(gObjCombiGraphInstanceFinished[keyGW]);
            for (j in unitNos) {
                const keyUNIT = unitNos[j];
                if (gObjCombiGraphInstanceFinished[keyGW][keyUNIT] > 0) {
                    allFinished = false;
                }
                gObjCombiGraphInstanceFinished[keyGW][keyUNIT] -= 1;
            }
        }
        if (allFinished) {
            if (gObjCombiGraphInstanceIntervalID !== -1) {
                clearInterval(gObjCombiGraphInstanceIntervalID);
                gObjCombiGraphInstanceIntervalID = -1;
            }
            fncDoRender();
        }
    }
}

/*  機能：  「複合グラフ」の表示を更新する

*/
function fncDoRender() {
    var timeflg = false;

    for (i in objTreeView.Respons.GraphCombine) {
        var tmpgraphid = 'idcombigraph' + i;

        for (j in objTreeView.Respons.GraphCombine[i].GraphList) {
            // UnitNo
            var tmpUnitNo = objTreeView.Respons.GraphCombine[i].GraphList[j].UnitNo;
            // RealTimeVal ID
            var tmpValId = 'idvalgraph' + j;
            // ChannelId
            var tmpChannelId = objTreeView.Respons.GraphCombine[i].GraphList[j].ChannelId;
            // Setting Values
            var tmpSettingVals = gObjCombiGrahpSettingValue.GraphCombine[i].GraphList[j].GraphSetting;

            // 設定値がない場合
            if (tmpSettingVals == null) {
                $('#' + tmpgraphid + tmpValId).text('--');
                if (timeflg == false) {
                    $('#' + tmpgraphid + "cograph_updated_time").text('データ更新：----/--/-- --:--');
                }
                continue;
            }
            // GW iD
            var gwId = objTreeView.Respons.GraphCombine[i].GraphList[j].IotGatewayId;

            // 瞬時値を表示する
            var instanceObj = gObjCombiGraphInstanceVals[gwId][tmpUnitNo];
            // 通信エラーの時
            if ((instanceObj == null) || (instanceObj.Respons.Data == null)) {
                $('#' + tmpgraphid + tmpValId).text("--");
                if (timeflg == false) {
                    $('#' + tmpgraphid + "cograph_updated_time").text('データ更新：----/--/-- --:--');
                }
                continue;
            }

            // 正常の場合
            if (instanceObj.Status == 200) {
                // 時刻を更新
                $('#' + tmpgraphid + "cograph_updated_time").text("データ更新：" + instanceObj.Respons.Time[0] + "/" + ("0" + instanceObj.Respons.Time[1]).slice(-2) + "/" + ("0" + instanceObj.Respons.Time[2]).slice(-2) + " " + ("00" + instanceObj.Respons.Time[3]).slice(-2) + ":" + ("00" + instanceObj.Respons.Time[4]).slice(-2));
                timeflg = true;

                // 瞬時値を更新
                if (parseInt(instanceObj.Respons.RSSI) == 0) {
                    $('#' + tmpgraphid + tmpValId).text("--");
                }
                else {
                    var listPropertyNames = Object.keys(instanceObj.Respons.Data);
                    if (listPropertyNames.includes(tmpChannelId) == true) {
                        var val = instanceObj.Respons.Data[tmpChannelId].Value;
                        var point = tmpSettingVals[tmpChannelId].Point;

                        if (val == null) {
                            val = "";
                        }
                        else {
                            strdata = parseFloat(val).toFixed(point);
                            val = strdata + " [" + jis2chr(tmpSettingVals[tmpChannelId].Unit) + "]";
                        }
                        $('#' + tmpgraphid + tmpValId).text(val);
                    }
                }
            }
            // 異常の場合
            else {
                $('#' + tmpgraphid + tmpValId).text("--");
            }
        }
    }

}

function GetInstantValue(gwid, strGetQuery, fncCallback) {
    var obj;
    //サーバーから設定値の要求を送信、受信データをJSON型に変換
    if (DEBUG_FEEDBACK !== true) {
        console.log(strGetQuery);
        http.get(strGetQuery, function (obj) {
            //正常
            fncCallback(obj, gwid);
        }, function (error) {
            /* エラー状態チェック */
            console.log('GetInstantValue: ' + error);
        });
    }
    else {
        return null;
    }
    return obj;
}

/*  機能：  ユニットの瞬時値の要求電文を作成
            ホストのアドレスを含まない
    引数：
            unitno: 現在のユニットの順番
            unittype: ユニットのパイプコード
    戻り値： Jsonオブジェクト
*/

function fncGetInstanceDat(unittype, unitno, gwid) {
    var strUnitNoq = ("000" + unitno.toString(16).toUpperCase()).substr(-4);
    // var Realtimedata;
    if (gObjCombiGraphInstanceVals.hasOwnProperty(gwid) == false) {
        gObjCombiGraphInstanceVals[gwid] = [];
    }
    // 通信異常→NULL
    if ((gObjCombiGrahpStatus[gwid][unitno] == UnitSts.STS_COMM_ERR) || (gObjCombiGrahpStatus[gwid][unitno] == null)) {
        gObjCombiGraphInstanceVals[gwid][unitno] = null;
        gObjCombiGraphInstanceFinished[gwid][unitno] = 0;
        return;
    }

    // If the instance values of current UnitNo-Unit not get yet -> make a new Request
    let strquery = RS_GETR_QUERY + strUnitNoq;
    // strquery += getIotGatewayIdParam();
    strquery += "&IotGatewayId=" + gwid;

    switch (unittype) {
        case UnitCode.HLR_A4C4:
        case UnitCode.HR_A4C4:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                fncDoSavehlrInstance(obj, unitno, cbgwid);
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;
        case UnitCode.HLR_RS485:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlrrs485(obj, unitno, cbgwid);
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;

        case UnitCode.HLR_A1:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlra1(obj, unitno, cbgwid);
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;

        case UnitCode.HLR_A8:
        case UnitCode.HR_A8:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlra8(obj, unitno, cbgwid);
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;

        case UnitCode.HLR_C1:
        case UnitCode.HLR_C2:
        case UnitCode.HLR_C8_IN:
        case UnitCode.HR_C8_IN:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancehlrc(obj, unitno, cbgwid);
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;
        case UnitCode.TWP8C:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                fncDoSaveInstancetwp8c(obj, unitno, cbgwid);
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;

        default:
            GetInstantValue(gwid, strquery, function (obj, cbgwid) {
                // Save Instance Data for Combine Graph
                gObjCombiGraphInstanceVals[cbgwid][unitno] = obj;
                gObjCombiGraphInstanceFinished[cbgwid][unitno] = 0;
            });
            // setTimeout(function () { Realtimedata.abort(); }, 60000);
            break;
    }
}

/**
 * Get Graph's Setting Content by Click on Treeview
 * id: 複合グラフのID
 * grpIndex:　複合グラフのインデックス
 */
function graphtreeviewclk(id, grpIndex) {
    // 複合グラフを選択する　→Update Instance + graph for Combine Graph Only
    gActivedType = ActiveType.Atv_Combigraph;
    // 現在のグラフのインデックスを更新する
    gCurCombiGrapIdx = grpIndex;

    // Clear the All realtime data of Combine graph
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
    document.getElementById("idgroupcontent").style.display = "none";
    document.getElementById("idgroupcontent").innerHTML = "";
    document.getElementById("idcompanycontent").style.display = "none";
    document.getElementById("idgraphcontent").style.display = "none";
    document.getElementById("garphlist_content").style.display = "none";
    document.getElementById("CSVmain").style.display = "none";
    btnHakaruCom.classList.remove("navbar-brand-active");
    // 各GWの状態を無効にする
    document.getElementById("mainAlarmShow").style.display = "none";

    // [複合グラフ]をクリックする場合
    if (id == "idcombigrp0") {
        // 登録したグラフの瞬時値のTEMPLATEを作成する
        fncMakeCombiGraphInstanHtml(false);

    }
    // グラフ「１～１０」をクリックする時
    else {
        // グラフ要求時間バー初期化
        if ((gCombiGraphLstId != id)) {
            gObjCombiGraphData = {};
            // fncGraphTimerBarInit();
            console.log("Change Graph -> Clear Data");
        }

        // Clear the combi graph + // Clear the instance data + the last time
        fncCombiGrpClr();

        /* 選択している複合グラフのTEMPLATEを作成。 */
        fncMakeGraphItemsContent(grpIndex);

        /* 色設定のTEMPLATEを作成。 */
        fncMakeColorSettingHtml(grpIndex);
        //  設定値を更新する
        fncLoadSettingItems(gObjCombiGrahpSettingValue.GraphCombine[grpIndex], grpIndex);
    }

    // 選択しているグラフをアクティブにする
    gCombiGraphCurId = id;
    var eleCurrent = document.getElementById(gCombiGraphCurId);
    eleCurrent.classList.add("active");
    console.log(eleCurrent.classList);
    console.log(gCombiGraphCurId);

    if (gintIotGatewayId < 0) {
        if (lstidGateway != gCombiGraphCurId) {
            const eleLast = document.getElementById(lstidGateway);
            if (eleLast) {
                eleLast.classList.remove("active");
            }
        }
        lstidGateway = gCombiGraphCurId;
    }

    // 前の選択グラフを外します
    if ((gCombiGraphLstId != "Dummy") && (gCombiGraphLstId != gCombiGraphCurId)) {
        const eleLast = document.getElementById(gCombiGraphLstId);
        if (eleLast) {
            eleLast.classList.remove("active");
        }
    }
    gCombiGraphLstId = gCombiGraphCurId;

    // Deactive treeview node tree
    if (lstId != "Dummy") {
        const eleLast = document.getElementById(lstId);
        if (eleLast) {
            eleLast.classList.remove("active");
        }
        lstId = "Dummy";
    }

    // Display Reload
    if (objTreeView !== null) {
        fncDataReload();
    }
}

/**
 * グラフデータクリア
 */
function fncCombiGrpClr() {
    gcombigraph_data = [];
    gcombigraph_time = [];
    gcombigraph_dat_num = [];

    if (gcombigraph_exist == true) {
        gcombigraph_chart.destroy();
        gcombigraph_exist = false;
        var myLegendContainer = document.getElementById("idGraphCombine_legend");
        myLegendContainer.innerHTML = '';
        console.log("Destroy Chart");
    }

    // グラフのタイトル
    $("#idGraphCombine_Title").html("--");

    // 瞬時値の時間
    $("#garphlist_updated_time").html("データ更新：----/--/-- --:--");


}

/**
 * グループダイナミク瞬時データ表示作成
 * grphidx: current combine graph index
 */
function fncMakeGraphItemsContent(grphidx) {

    // If no Combine Graph to display
    if (gGraphE == false) return;

    var strGraphAllDsp = "";
    var tvid = "";
    // Allow to display graph content
    document.getElementById("garphlist_content").style.display = "block";
    // そのグラフは表示したい項目はない時
    if (objTreeView.Respons.GraphCombine[grphidx].GraphList.length == 0) {
        strGraphAllDsp = '<div class="alert alert-danger h5 mb-0"> \
                            <strong>表示データがありません<strong> \
                        </div>';
    }
    else {
        // 設定したグラフ(１～１０)の瞬時値テーブル
        var sndRowFlg = false;

        strGraphAllDsp =
            '<div class="card pb-0 pr-0 border-0"> \
                    <div class="card-body px-0 pt-0 pb-0"> \
                        <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 border-right-0 bg-white">';

        strGraphAllDsp += '<table class="table table-bordered mb-0"> \
                                <tbody> \
                                    <tr>';
        for (i in objTreeView.Respons.GraphCombine[grphidx].GraphList) {
            if (objTreeView.Respons.GraphCombine[grphidx].GraphList[i] !== "NULL") {
                if ((i > 4) && (sndRowFlg == false)) {
                    strGraphAllDsp += '</tr>';
                    strGraphAllDsp += '<tr>';
                    sndRowFlg = true;
                }
                strGraphAllDsp += '<th id="id-title-graph' + i + "\"" + ' class="text-center table-active"></th>';
                strGraphAllDsp += '<td id="idvalgraph' + i + "\"" + ' colspan="2" class="text-right">--</td>';
            }
        }
        strGraphAllDsp += '</tr>';
        strGraphAllDsp += '</table>';
        strGraphAllDsp += '</div> \
                            \
                    </div> \
                </div>';

        strGraphAllDsp = strGraphAllDsp.replace(/idvalgraph/g, tvid + "idvalgraph");
        strGraphAllDsp = strGraphAllDsp.replace(/id-title-graph/g, tvid + "id-title-graph");
    }

    document.getElementById("idgraphlist_instance").innerHTML = strGraphAllDsp;
}

/**
 * 色設定のテンプレートを作成
 * grphidx: current combine graph index
 */
function fncMakeColorSettingHtml(grphidx) {
    // If no Combine Graph to display
    if (gGraphE == false) return;

    var strGraphAllDsp = "";

    // そのグラフは表示したい項目はない時
    if (objTreeView.Respons.GraphCombine[grphidx].GraphList.length > 0) {
        // Allow to display graph content
        document.getElementById("idgraphlist_color").style.display = "block";

        // 設定したグラフ(１～１０)の瞬時値テーブル
        var sndRowFlg = false;

        strGraphAllDsp =
            '<div class="card pb-0 pr-0 border-0"> \
                    <div class="card-body px-0 pt-0 pb-0"> \
                        <div class="table-responsive border border-bottom-0 border-left-0 border-top-0 border-right-0 bg-white">';

        strGraphAllDsp += '<table class="table table-bordered mb-0"> \
                                <tbody> \
                                    <tr>';
        for (i in objTreeView.Respons.GraphCombine[grphidx].GraphList) {
            if (objTreeView.Respons.GraphCombine[grphidx].GraphList[i] !== "NULL") {
                if ((i > 4) && (sndRowFlg == false)) {
                    strGraphAllDsp += '</tr>';
                    strGraphAllDsp += '<tr>';
                    sndRowFlg = true;
                }
                if (getIotGatewayId() < 0) {
                    strGraphAllDsp += '<th id="id-company-title2-graph' + i + '"' + 'class="text-center table-active">' + + '</th>';
                }
                strGraphAllDsp += '<th id="id-title2-graph' + i + "\"" + ' class="text-center table-active"></th>';
                strGraphAllDsp += '<td colspan="2" class="text-center px-0"> \
                                      <input type="color" id="idcolorgraph_' + i + "\"" + ' class="p-0"> \
                                      </input> \
                                   </td>';
            }
        }
        strGraphAllDsp += '</tr>';
        strGraphAllDsp += '</table>';
        strGraphAllDsp += '</div> \
                            \
                    </div> \
                </div>';

    }

    document.getElementById("idgraphlist_color").innerHTML = strGraphAllDsp;
}

/**
* グラフ１～１０設定値を更新する
* graphidx: 選択している複合グラフ
*/
function fncLoadSettingItems(setting, graphidx) {
    if (setting.GraphList.length == 0) return;

    // 設定値をロードする
    for (i in setting.GraphList) {
        // Setting Values
        var tmpSettingVals = setting.GraphList[i].GraphSetting;
        // Title ID
        var tmpTileId = 'id-title-graph' + i;
        var tmpTileId2 = 'id-title2-graph' + i;
        // RealTimeVal ID
        var tmpValId = 'idvalgraph' + i;
        // ChannelId
        var tmpChannelId = setting.GraphList[i].ChannelId;
        // ColorID
        var tmpColorId = 'idcolorgraph_' + i;

        // 設定値がない場合
        if (tmpSettingVals == null) {
            $('#' + tmpValId).text('--');
            continue;
        }
        else {
            // 瞬時値のタイトル
            console.log(tmpChannelId);
            console.log(tmpSettingVals);
            let strTitle = jis2chr(tmpSettingVals[tmpChannelId].Title);
            if (getIotGatewayId() < 0) {
                $('#id-company-title2-graph' + i).text(jis2chr(setting.GraphList[i].IotGatewayName));
            }
            // else {
            //     strTitle = jis2chr(setting.GraphList[i].IotGatewayName) + "：" + strTitle;
            // }
            $('#' + tmpTileId).text(strTitle); // tmpSettingVals[tmpChannelId].Title)
            $('#' + tmpTileId2).text(strTitle);

            $("#idGraphCombine_Title").html(setting.GraphName);

            // 色選択
            var colorinput = document.getElementById(tmpColorId);
            colorinput.value = setting.GraphList[i].Color;

            colorinput.addEventListener("change", function (e) {
                // 項目の順番
                var ch = e.target.id;
                var itemidx = ch.split("_")[1];
                var newcl = $(this).val();

                // グラフの色を保存する
                var graphObj = objTreeView.Respons.GraphCombine[graphidx];
                fncSetGraphColor(graphObj, setting, itemidx, newcl);

            });

        }

    }
}


/*  説明： ボタンのイベントに応じてダイアログを表示
    サーバーへ要求を送信して、成功かどうか確認する
    引数：
            PostQuery  ：  url
            jsData     ：  Javascript Object
*/
function fncSendSettingPostString(jsData, fncCallback) {
    var PostQuery = COMBIGRAPH_SET_QUERY + "&SetColor=OFF" + getIotGatewayIdParam();

    //ダイアログを表示
    swal({
        title: "設定を保存しますか？",
        icon: "warning",
        buttons: ["いいえ", "はい"],
        dangerMode: true,
    })
        .then(function (yes) {
            if (yes) {
                var jsStrData = JSON.stringify(jsData)
                // return $.post(PostQuery,
                //     jsStrData,
                //     function (obj) {
                //         return obj;
                //     });
                // http.post = async function (url, data, fncCallback, fncError)
                console.log(jsStrData);
                return http.post(PostQuery, jsStrData, function (obj) {
                    return obj;
                }, function (obj) {
                    return obj;
                });
            } else {
                throw null;
            }
        })
        .then(function (jsonstr) {
            const term = jsonstr.Status;
            //正常
            if (term == 200) {
                swal({
                    title: "設定を保存しました。",
                    icon: "success",
                    buttons: "はい"
                });
                // Update treeview display
                fncCallback();
            }
            //エラー
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

/*  説明： ボタンのイベントに応じてダイアログを表示
    サーバーへ要求を送信して、成功かどうか確認する
    引数：
            PostQuery  ：  url
            jsData     ：  Javascript Object
    (jsDat, itemidx, newcolor, newcoloridx, setting, graphObj, fncUpdateGraphColor)
*/
function fncSendSettingPostString2(jsData, itemidx, newcolor, setting, graphObj, fncCallback) {
    var jsStrData = JSON.stringify(jsData);
    var PostQuery = COMBIGRAPH_SET_QUERY + "&SetColor=ON" + getIotGatewayIdParam();

    return http.post(PostQuery, jsStrData, function (obj) {
        const term = obj.Status;
        //正常
        if (term == 200) {
            // Update graph display
            fncCallback(setting, graphObj, itemidx, newcolor);
        }
        //エラー
        else {
            swal("エラー！ コード：" + term, {
                icon: "error",
                buttons: "はい"
            });
            fncCallback(setting, graphObj, itemidx, newcolor);
        }
    }, function (err) {
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

    // $.post(strQuery,
    //     jsStrData,
    //     function (obj) {
    //         return obj;
    //     }).then(function (jsonstr) {
    //         const term = jsonstr.Status;
    //         //正常
    //         if (term == 200) {
    //             // Update graph display
    //             fncCallback(setting, graphObj, itemidx, newcolor);
    //         }
    //         //エラー
    //         else {
    //             swal("エラー！ コード：" + term, {
    //                 icon: "error",
    //                 buttons: "はい"
    //             });
    //             fncCallback(setting, graphObj, itemidx, newcolor);
    //         }
    //     })
    //     .catch(function (err) {
    //         if (err) {
    //             swal("エラー！", {
    //                 icon: "error",
    //                 buttons: "はい"
    //             });
    //         } else {
    //             swal.stopLoading();
    //             swal.close();
    //         }
    //     });


}


/*  機能： 複合グラフ編集登録
*  graphObj：複合グラフの情報
*  itemidx: 項目のインデックス
*/
function fncSetGraphColor(graphObj, setting, itemidx, newcolor) {
    if ((graphObj == null)) {
        return;
    }

    // JavascriptDataを作成
    var jsDat = new Object();
    //[Id]
    jsDat.Id = graphObj.Id;
    //[Enable]
    jsDat.Enable = 1;
    //[GraphName]
    jsDat.GraphName = graphObj.GraphName;
    //[UnitList]
    var UnitListArray = new Array();
    var unitlistItem = new Object();
    var ChannelListArray = new Array();

    // 変更の項目を作成する
    var item = new Object();
    item.ChannelId = graphObj.GraphList[itemidx].ChannelId;
    item.Enable = 1;
    item.Order = graphObj.GraphList[itemidx].Order;
    item.Color = newcolor;
    ChannelListArray.push(item);

    // 作成した項目をChannelListに追加する
    unitlistItem = {
        IotGatewayId: graphObj.GraphList[itemidx].IotGatewayId,
        UnitNo: graphObj.GraphList[itemidx].UnitNo,
        ChannelList: ChannelListArray
    };
    UnitListArray.push(unitlistItem);

    jsDat.UnitList = UnitListArray;

    // ダイアログを表示
    fncSendSettingPostString2(jsDat, itemidx, newcolor, setting, graphObj, fncUpdateGraphColor);
}


/**
* グラフ１～１０瞬時値のデータを更新する
* myChart: チャットのオブジェクト
* itemidx: グラフのインデックス
* newcolor: 変更の色
  fncCallback(setting, graphObj, itemidx, newcolor, newcoloridx);
*/
function fncUpdateGraphColor(setting, graphObj, itemidx, newcolor) {
    // 色の変数を更新する
    setting.GraphList[itemidx].Color = newcolor;
    graphObj.GraphList[itemidx].UnitNo.Color = newcolor;

    // 背景色
    gcombigraph_chart.data.datasets[itemidx].backgroundColor = newcolor;
    gcombigraph_chart.data.datasets[itemidx].borderColor = newcolor;

    // Legendの色を更新
    var id = "idlabel" + itemidx + gcombigraph_chart.id;
    if (gcombigraph_chart.isDatasetVisible(itemidx)) {
        document.getElementById(id).style.backgroundColor = newcolor;
    }

    //グラフを更新
    gcombigraph_chart.update();
}

function fncCheckInsDatCombiGraphItemsRender() {
    if (gObjCombiGraphInstanceFinished) {
        let allFinished = true;
        const gwids = Object.keys(gObjCombiGraphInstanceFinished);
        for (i in gwids) {
            const keyGW = gwids[i];
            const unitNos = Object.keys(gObjCombiGraphInstanceFinished[keyGW]);
            for (j in unitNos) {
                const keyUNIT = unitNos[j];
                if (gObjCombiGraphInstanceFinished[keyGW][keyUNIT] > 0) {
                    allFinished = false;
                }
                gObjCombiGraphInstanceFinished[keyGW][keyUNIT] -= 1;
            }
        }
        if (allFinished) {
            if (gObjCombiGraphInstanceIntervalID !== -1) {
                clearInterval(gObjCombiGraphInstanceIntervalID);
                gObjCombiGraphInstanceIntervalID = -1;
            }

            // 選択しているグラフ
            const setting = gObjCombiGrahpSettingValue.GraphCombine[gCurCombiGrapIdx];
            const grphidx = gCurCombiGrapIdx;

            var timeflg = false;
            for (i in objTreeView.Respons.GraphCombine[grphidx].GraphList) {
                // Setting
                var tmpSettingVals = setting.GraphList[i].GraphSetting;
                // IOTGWのID
                let gwid = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].IotGatewayId;

                // 設定値がない場合
                if (tmpSettingVals == null) {
                    $('#' + tmpValId).text('--');
                    if (timeflg == false) {
                        $('#garphlist_updated_time').text('データ更新：----/--/-- --:--');
                    }
                    continue;
                }
                // UnitNo
                var tmpUnitNo = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].UnitNo;
                // RealTimeVal ID
                var tmpValId = 'idvalgraph' + i;
                // ChannelId
                var tmpChannelId = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].ChannelId;
                // GWId
                var tmpChannelId = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].ChannelId;
                // 瞬時値を表示する
                var instanceObj = gObjCombiGraphInstanceVals[gwid][tmpUnitNo];

                // 通信エラーの時
                if ((instanceObj == null) || (instanceObj.Respons.Data == null)) {
                    $('#' + tmpValId).text("--");
                    if (timeflg == false) {
                        $('#garphlist_updated_time').text('データ更新：----/--/-- --:--');
                    }
                    continue;
                }
                if (gCurCombiGrapIdx == grphidx) {
                    // 正常の場合
                    if (instanceObj.Status == 200) {
                        // 時刻を更新
                        $('#garphlist_updated_time').text("データ更新：" + instanceObj.Respons.Time[0] + "/" + ("0" + instanceObj.Respons.Time[1]).slice(-2) + "/" + ("0" + instanceObj.Respons.Time[2]).slice(-2) + " " + ("00" + instanceObj.Respons.Time[3]).slice(-2) + ":" + ("00" + instanceObj.Respons.Time[4]).slice(-2));
                        timeflg = true;

                        // 瞬時値を更新
                        if (parseInt(instanceObj.Respons.RSSI) == 0) {
                            $('#' + tmpValId).text("--");
                        }
                        else {
                            var listPropertyNames = Object.keys(instanceObj.Respons.Data);
                            if (listPropertyNames.includes(tmpChannelId) == true) {
                                var val = instanceObj.Respons.Data[tmpChannelId].Value;
                                var point = tmpSettingVals[tmpChannelId].Point;

                                if (val == null) {
                                    val = "";
                                }
                                else {
                                    strdata = parseFloat(val).toFixed(point);
                                    val = strdata + " [" + jis2chr(tmpSettingVals[tmpChannelId].Unit) + "]";
                                }
                                $('#' + tmpValId).text(val);
                            }
                        }
                    }
                    // 異常の場合
                    else {

                    }
                }

            }
        }
    }
}

/**
* グラフ１～１０瞬時値のデータを更新する
*/
function fncGet_InsDatCombiGraphItems(setting, grphidx) {
    var timeout = 10000;
    let tmprequestid = [];

    // Render待ちをクリア
    if (gObjCombiGraphInstanceIntervalID !== -1) {
        clearInterval(gObjCombiGraphInstanceIntervalID);
        gObjCombiGraphInstanceIntervalID = -1;
    }

    if (gGraphE == false) return;
    if ((setting.GraphList.length == 0) || (gObjCombiGraphInstanceVals == undefined) || (objTreeView == null)) return;

    // 瞬時値を取得する
    for (i in objTreeView.Respons.GraphCombine[grphidx].GraphList) {
        // UnitNo
        let tmpUnitNo = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].UnitNo;
        // UnitTypCode
        let tmpUniTypeCode = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].UnitTypeCode;
        // IOTGWのID
        let gwid = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].IotGatewayId;
        // Check if unitno already requested
        if ((tmprequestid.indexOf(gwid) !== -1) && (tmprequestid[gwid].indexOf(tmpUnitNo) !== -1)) {
            continue;
        }
        tmprequestid[gwid] = tmpUnitNo;
        gObjCombiGraphInstanceFinished[gwid] = {};
        gObjCombiGraphInstanceFinished[gwid][tmpUnitNo] = 10;
        fncGetInstanceDat(tmpUniTypeCode, tmpUnitNo, gwid);
    }

    gObjCombiGraphInstanceIntervalID = setInterval(fncCheckInsDatCombiGraphItemsRender, 1000);
    // After timeout, update the realtime
    // setTimeout(() => {
    //     var timeflg = false;
    //     for (i in objTreeView.Respons.GraphCombine[grphidx].GraphList) {
    //         // Setting
    //         var tmpSettingVals = setting.GraphList[i].GraphSetting;
    //         // IOTGWのID
    //         let gwid = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].IotGatewayId;

    //         // 設定値がない場合
    //         if (tmpSettingVals == null) {
    //             $('#' + tmpValId).text('--');
    //             if (timeflg == false) {
    //                 $('#garphlist_updated_time').text('データ更新：----/--/-- --:--');
    //             }
    //             continue;
    //         }
    //         // UnitNo
    //         var tmpUnitNo = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].UnitNo;
    //         // RealTimeVal ID
    //         var tmpValId = 'idvalgraph' + i;
    //         // ChannelId
    //         var tmpChannelId = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].ChannelId;
    //         // GWId
    //         var tmpChannelId = objTreeView.Respons.GraphCombine[grphidx].GraphList[i].ChannelId;
    //         // 瞬時値を表示する
    //         var instanceObj = gObjCombiGraphInstanceVals[gwid][tmpUnitNo];

    //         // 通信エラーの時
    //         if ((instanceObj == null) || (instanceObj.Respons.Data == null)) {
    //             $('#' + tmpValId).text("--");
    //             if (timeflg == false) {
    //                 $('#garphlist_updated_time').text('データ更新：----/--/-- --:--');
    //             }
    //             continue;
    //         }
    //         if (gCurCombiGrapIdx == grphidx) {
    //             // 正常の場合
    //             if (instanceObj.Status == 200) {
    //                 // 時刻を更新
    //                 $('#garphlist_updated_time').text("データ更新：" + instanceObj.Respons.Time[0] + "/" + ("0" + instanceObj.Respons.Time[1]).slice(-2) + "/" + ("0" + instanceObj.Respons.Time[2]).slice(-2) + " " + ("00" + instanceObj.Respons.Time[3]).slice(-2) + ":" + ("00" + instanceObj.Respons.Time[4]).slice(-2));
    //                 timeflg = true;

    //                 // 瞬時値を更新
    //                 if (parseInt(instanceObj.Respons.RSSI) == 0) {
    //                     $('#' + tmpValId).text("--");
    //                 }
    //                 else {
    //                     var listPropertyNames = Object.keys(instanceObj.Respons.Data);
    //                     if (listPropertyNames.includes(tmpChannelId) == true) {
    //                         var val = instanceObj.Respons.Data[tmpChannelId].Value;
    //                         var point = tmpSettingVals[tmpChannelId].Point;

    //                         if (val == null) {
    //                             val = "";
    //                         }
    //                         else {
    //                             strdata = parseFloat(val).toFixed(point);
    //                             val = strdata + " [" + jis2chr(tmpSettingVals[tmpChannelId].Unit) + "]";
    //                         }
    //                         $('#' + tmpValId).text(val);
    //                     }
    //                 }
    //             }
    //             // 異常の場合
    //             else {

    //             }
    //         }

    //     }

    // }, timeout);

}

/* グラフ１～１０を取得する */
function fncGetCombiGraphDat(unittype, unitno, date, timeidx, setting, curgrpIdx, gwid) {
    var datearr = date.split("/");
    var year = datearr[0];
    console.log(year);
    var month = datearr[1];
    var day = datearr[2];
    var hour = dropdowntime[itime];
    var min = iminuteval[iminuteidx];

    // If the instance values of current UnitNo-Unit not get yet -> make a new Request
    // var listPropertyNames = Object.keys(gObjCombiGraphData);
    // if (listPropertyNames.includes(unitno.toString()) == false) {
    //     gObjCombiGraphData[unitno] = null;

    var strUnitNo = ("000" + unitno.toString(16).toUpperCase()).substr(-4);

    switch (unittype) {
        case UnitCode.HLR_A4C4:
        case UnitCode.HR_A4C4:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncDoSaveGraphDatHlra4, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;
        case UnitCode.HLR_RS485:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncDoSaveGraphDatHlrRs485, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;
        case UnitCode.HLR_A1:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncDoSaveGraphDatHlra1, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;
        case UnitCode.HLR_A8:
        case UnitCode.HR_A8:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncDoSaveGraphDatHlra8, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;
        case UnitCode.HLR_C1:
        case UnitCode.HLR_C2:
        case UnitCode.HLR_C8_IN:
        case UnitCode.HR_C8_IN:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncDoSaveGraphDatHlrc, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;
        case UnitCode.TWP8C:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncDoSaveGraphDatTwp8c, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;
        default:
            rs485_grpread_data2(strUnitNo, year, month, day, hour, min, gGraphPeriod,
                fncSaveGraphData, unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx, gwid);
            break;

    }
    // }

}

//----------------RS-485ユニットのグラフ値取得----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
                unitno, gCombiGraphCurId, timeidx, setting, curgrpIdx
*/
function rs485_grpread_data2(unitNo, year, month, day, hour, min, Num, fncCallBack, setdata, unitId, timeidx, setting, curgrpIdx, gwid) {
    var obj;
    var tmpunitId = new String();
    tmpunitId = unitId;

    //GET電文を作成
    var strUnitNo = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);
    var strGetQuery = RS_GETG_QUERY + '&UnitNo=' + strUnitNo + "&" + 'Year=' + year + "&" + 'Month=' + month + "&" + 'Day=' + day + "&" + 'Hour=' + hour + "&" + 'Minute=' + min + "&" + 'Period=' + Num;
    // strGetQuery += getIotGatewayIdParam();
    strGetQuery += "&IotGatewayId=" + gwid;
    //サーバーから設定値の要求を送信、受信データをJSON型に変換
    if (DEBUG_FEEDBACK !== true) {
        console.log(strGetQuery);
        // $.getJSON(strGetQuery, function (nobj) {

        //     fncCallBack(nobj, setdata, timeidx, setting, curgrpIdx);
        // });
        http.get(strGetQuery, function (nobj) {
            fncCallBack(nobj, setdata, timeidx, setting, curgrpIdx, gwid);
        }, function (error) {
            /* エラー状態チェック */
            console.log("rs485_grpread_data2: " + error);
        });
    }
    else {
        return obj;
    }

    return obj;

}

/**
 * RS485Unitのグラフデータを保存する
 */
function fncSaveGraphData(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = obj;

    console.log("Save Graph Respond from RS485Units");
    fncDoRenderGraph(setting, curgrpIdx, timeidx);
}


/**
 * 取得したTWP8Cのグラフデータを保存する
 */
function fncDoSaveGraphDatTwp8c(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    var rtnobj = [];
    if (obj.Status == 200) {
        var setobj = [];
        for (var i = 0; i < 8; i++) {
            var strprop = "di" + (i + 1).toString();
            setobj[strprop] = obj.Respons["Di" + (i + 1).toString()];
        }
        rtnobj["Respons"] = setobj;
    }
    rtnobj["Status"] = obj.Status;
    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = rtnobj;

    console.log("Save Graph Respond from TWP8C");
    fncDoRenderGraph(setting, curgrpIdx, timeidx);
}

/**
 * 取得したHLRCのグラフデータを保存する
 */
function fncDoSaveGraphDatHlrc(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    // Save Instance Data for Combine Graph
    var retobj = obj;
    if (obj.Status == 200) {
        //強度
        var datitem = [];
        for (var i = 0; i < obj.Respons.di1_counter.Num; i++) {
            var tmpval = [];
            tmpval['Time'] = obj.Respons.di1_counter.Data[i].Time;
            tmpval['RSSI'] = obj.Respons.di1_counter.Data[i].RSSI;
            tmpval['Value'] = obj.Respons.di1_counter.Data[i].RSSI;
            datitem.push(tmpval);
        }
        retobj.Respons["rssi"] = {
            Num: obj.Respons.di1_counter.Num,
            Data: datitem
        };
    }

    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = retobj;
    console.log("Save Graph Respond from HLR_C1, c2,c8");
    fncDoRenderGraph(setting, curgrpIdx, timeidx);
}

/**
 * 取得したHLR-A8のグラフデータを保存する
 */
function fncDoSaveGraphDatHlra8(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    var retobj = obj;
    if (obj.Status == 200) {
        //強度
        var datitem = [];
        for (var i = 0; i < obj.Respons.an1_analog.Num; i++) {
            var tmpval = [];
            tmpval['Time'] = obj.Respons.an1_analog.Data[i].Time;
            tmpval['RSSI'] = obj.Respons.an1_analog.Data[i].RSSI;
            tmpval['Value'] = obj.Respons.an1_analog.Data[i].RSSI;
            datitem.push(tmpval);
        }
        retobj.Respons["rssi"] = {
            Num: obj.Respons.an1_analog.Num,
            Data: datitem
        };

        // AN1-8 Max-Min-Avg
        for (var i = 0; i < 8; i++) {
            var strprop1 = "an" + (i + 1).toString() + "_analog";

            var maxitem = [];
            var minitem = [];
            var avgitem = [];
            for (var j = 0; j < obj.Respons[strprop1].Num; j++) {
                // Max
                var tmpval = [];
                tmpval["Time"] = obj.Respons[strprop1].Data[j].Time;
                tmpval["RSSI"] = obj.Respons[strprop1].Data[j].RSSI;
                tmpval["Value"] = obj.Respons[strprop1].Data[j].Max;
                maxitem.push(tmpval);
                // Min
                var tmpval2 = [];
                tmpval2["Time"] = obj.Respons[strprop1].Data[j].Time;
                tmpval2["RSSI"] = obj.Respons[strprop1].Data[j].RSSI;
                tmpval2["Value"] = obj.Respons[strprop1].Data[j].Min;
                minitem.push(tmpval2);
                // Avg
                var tmpval3 = [];
                tmpval3["Time"] = obj.Respons[strprop1].Data[j].Time;
                tmpval3["RSSI"] = obj.Respons[strprop1].Data[j].RSSI;
                tmpval3["Value"] = obj.Respons[strprop1].Data[j].Avg;
                avgitem.push(tmpval3);
            }

            var strprop2 = strprop1 + "_max";
            retobj.Respons[strprop2] = {
                Num: obj.Respons[strprop1].Num,
                Data: maxitem
            };
            strprop2 = strprop1 + "_min";
            retobj.Respons[strprop2] = {
                Num: obj.Respons[strprop1].Num,
                Data: minitem
            };
            strprop2 = strprop1 + "_ave";
            retobj.Respons[strprop2] = {
                Num: obj.Respons[strprop1].Num,
                Data: avgitem
            };
        }
    }

    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = retobj;

    console.log("Save Graph Respond from HLR_A8");
    fncDoRenderGraph(setting, curgrpIdx, timeidx);
}

/**
 * 取得したHLR-A4C4のグラフデータを保存する
 * fncCallBack(nobj, setdata, timeidx, setting, curgrpIdx);
 */
function fncDoSaveGraphDatHlra4(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    var retobj = obj;
    if (obj.Status == 200) {
        //強度
        var datitem = [];
        for (var i = 0; i < obj.Respons.An.Num; i++) {
            var tmpval = [];
            tmpval["Time"] = obj.Respons.An.Data[i].Time;
            tmpval["RSSI"] = obj.Respons.An.Data[i].RSSI;
            tmpval["Value"] = obj.Respons.An.Data[i].RSSI;
            datitem.push(tmpval);
        }
        retobj.Respons["rssi"] = {
            Num: obj.Respons.An.Num,
            Data: datitem
        };

        // AN1-4 Max-Min-Avg
        for (var i = 0; i < 4; i++) {
            var strprop1 = "an" + (i + 1).toString();
            var ad = [];
            var maxitem = [];
            var minitem = [];
            var avgitem = [];
            for (var j = 0; j < obj.Respons.An.Num; j++) {
                // Ad
                var tmpval = [];
                tmpval["Time"] = obj.Respons.An.Data[j].Time;
                tmpval["RSSI"] = obj.Respons.An.Data[j].RSSI;
                tmpval["Value"] = obj.Respons.An.Data[j].Value[i];
                ad.push(tmpval);

                // Max
                var tmpval2 = [];
                tmpval2["Time"] = obj.Respons.An.Data[j].Time;
                tmpval2["RSSI"] = obj.Respons.An.Data[j].RSSI;
                tmpval2["Value"] = obj.Respons.An.Data[j].Max[i];
                maxitem.push(tmpval2);

                // Min
                var tmpval3 = [];
                tmpval3["Time"] = obj.Respons.An.Data[j].Time;
                tmpval3["RSSI"] = obj.Respons.An.Data[j].RSSI;
                tmpval3["Value"] = obj.Respons.An.Data[j].Min[i];
                minitem.push(tmpval3);

                // Avg
                var tmpval4 = [];
                tmpval4["Time"] = obj.Respons.An.Data[j].Time;
                tmpval4["RSSI"] = obj.Respons.An.Data[j].RSSI;
                tmpval4["Value"] = obj.Respons.An.Data[j].Avg[i];
                avgitem.push(tmpval4);
            }

            var strprop2 = strprop1;
            retobj.Respons[strprop2] = {
                Num: obj.Respons.An.Num,
                Data: ad
            };
            strprop2 = strprop1 + "_max";
            retobj.Respons[strprop2] = {
                Num: obj.Respons.An.Num,
                Data: maxitem
            };
            strprop2 = strprop1 + "_min";
            retobj.Respons[strprop2] = {
                Num: obj.Respons.An.Num,
                Data: minitem
            };
            strprop2 = strprop1 + "_ave";
            retobj.Respons[strprop2] = {
                Num: obj.Respons.An.Num,
                Data: avgitem
            };

            // DI
            var strprop = "di" + (i + 1).toString() + "_counter";
            retobj.Respons[strprop] = obj.Respons["Di" + (i + 1).toString()];

            // DI Timer
            var strprop = "di" + (i + 1).toString() + "_timer";
            retobj.Respons[strprop] = obj.Respons["DiTimer" + (i + 1).toString()];
        }
    }

    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = retobj;
    console.log("Saved Graph Respond from A4c4");
    fncDoRenderGraph(setting, curgrpIdx, timeidx);

}

/**
 * 取得したHLR-RS485のグラフデータを保存する
 */
function fncDoSaveGraphDatHlrRs485(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    var retobj = obj;
    if (obj.Status == 200) {
        //強度
        var datitem = [];
        for (var i = 0; i < obj.Respons.RSSI.Num; i++) {
            var tmpval = [];
            tmpval["Time"] = obj.Respons.RSSI.Data[i].Time;
            tmpval["RSSI"] = obj.Respons.RSSI.Data[i].RSSI;
            tmpval["Value"] = obj.Respons.RSSI.Data[i].RSSI;
            datitem.push(tmpval);
        }
        retobj.Respons["rssi"] = {
            Num: obj.Respons.RSSI.Num,
            Data: datitem
        };
    }

    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = retobj;

    console.log("Save Graph Respond from HLR_RS485");
    fncDoRenderGraph(setting, curgrpIdx, timeidx);
}

/**
 * 取得したHLR-A8のグラフデータを保存する
 */
function fncDoSaveGraphDatHlra1(obj, unitno, timeidx, setting, curgrpIdx, gwid) {
    var retobj = obj;
    if (obj.Status == 200) {
        //強度
        var datitem = [];
        for (var i = 0; i < obj.Respons.an1_analog.Num; i++) {
            var tmpval = [];
            tmpval["Time"] = obj.Respons.an1_analog.Data[i].Time;
            tmpval["RSSI"] = obj.Respons.an1_analog.Data[i].RSSI;
            tmpval["Value"] = obj.Respons.an1_analog.Data[i].RSSI;
            datitem.push(tmpval);
        }
        retobj.Respons["rssi"] = {
            Num: obj.Respons.an1_analog.Num,
            Data: datitem
        };

        // AN1 Max-Min-Avg
        var maxitem = [];
        var minitem = [];
        var avgitem = [];
        for (var i = 0; i < obj.Respons.an1_analog.Num; i++) {
            // Max
            var tmpval = [];
            tmpval["Time"] = obj.Respons.an1_analog.Data[i].Time;
            tmpval["RSSI"] = obj.Respons.an1_analog.Data[i].RSSI;
            tmpval["Value"] = obj.Respons.an1_analog.Data[i].Max;
            maxitem.push(tmpval);
            // Min
            var tmpval2 = [];
            tmpval2["Time"] = obj.Respons.an1_analog.Data[i].Time;
            tmpval2["RSSI"] = obj.Respons.an1_analog.Data[i].RSSI;
            tmpval2["Value"] = obj.Respons.an1_analog.Data[i].Min;
            minitem.push(tmpval2);
            // Avg
            var tmpval3 = [];
            tmpval3["Time"] = obj.Respons.an1_analog.Data[i].Time;
            tmpval3["RSSI"] = obj.Respons.an1_analog.Data[i].RSSI;
            tmpval3["Value"] = obj.Respons.an1_analog.Data[i].Avg;
            avgitem.push(tmpval3);
        }

        retobj.Respons["an1_analog_max"] = {
            Num: obj.Respons.an1_analog.Num,
            Data: maxitem
        };

        retobj.Respons["an1_analog_min"] = {
            Num: obj.Respons.an1_analog.Num,
            Data: minitem
        };

        retobj.Respons["an1_analog_ave"] = {
            Num: obj.Respons.an1_analog.Num,
            Data: avgitem
        };
    }

    if (gObjCombiGraphData.hasOwnProperty(gwid) === false) {
        gObjCombiGraphData[gwid] = [];
    }
    gObjCombiGraphData[gwid][unitno] = retobj;
    console.log("Saved Graph Respond from A1");

    fncDoRenderGraph(setting, curgrpIdx, timeidx);
}

/**
* グラフ１～１０グラフ値のデータを更新する
* setting: setting value of current graphcombine
*/
function fncGet_GraphData_GraphCombine(setting, curgrpIdx, date, timeidx) {
    // var timeout = 800;
    if (gGraphE == false) return;
    if (setting.GraphList.length == 0) return;

    // 時間幅が変更する場合、グラフデータをクリアする
    if (gGraphPeriod != iperiodminutevalue[iperiodtime]) {
        gObjCombiGraphData = {};
        console.log("Time Period Changed -> Clear graph data");
    }

    // グラフ値を取得する
    var tmpdate = new Date(date + " " + ("0" + dropdowntime[itime]).slice(-2) + ":" + ("0" + iminuteval[iminuteidx]).slice(-2));

    gGraphStartTime = moment(tmpdate, "YYYY-MM-DD HH:mm:ss");
    gGraphEndTime = moment(gGraphStartTime).add(iperiodminutevalue[iperiodtime], 'minutes').format("YYYY-MM-DD HH:mm");
    gGraphPeriod = iperiodminutevalue[iperiodtime];
    grpXAxisPeriod = graphstepSize[iperiodtime];
    gShowLineFlg = gShowLineGraphTable[iperiodtime][gLoggingTime];

    for (i = 0; i < gCombiGraphListbyUnit[curgrpIdx].Unitlist.length; i++) {
        // UnitNo
        let tmpUnitNo = gCombiGraphListbyUnit[curgrpIdx].Unitlist[i].UnitNo;
        // UnitTypCode
        let tmpUniTypeCode = gCombiGraphListbyUnit[curgrpIdx].Unitlist[i].UnitTypeCode;
        // IOTGWのID
        let gwid = gCombiGraphListbyUnit[curgrpIdx].Unitlist[i].IotGatewayId; // objTreeView.Respons.GraphCombine[curgrpIdx].GraphList[i].IotGatewayId;

        fncGetCombiGraphDat(tmpUniTypeCode, tmpUnitNo, date, timeidx, setting, curgrpIdx, gwid);
    }

}

function fncDoRenderGraph(setting, curgrpIdx, timeidx) {
    if (curgrpIdx == gCurCombiGrapIdx) {
        fncDisp_combigraph_data(gObjCombiGraphData, setting);

        // グラフ幅内に現在時刻があるかチェックする
        var date = document.getElementById("idGrpTimeInterval21").value;
        var tmpdate = new Date(date + " " + ("0" + dropdowntime[itime]).slice(-2) + ":" + ("0" + iminuteval[iminuteidx]).slice(-2));

        gGraphStartTime = moment(tmpdate, "YYYY-MM-DD HH:mm:ss");
        gGraphEndTime = moment(gGraphStartTime).add(iperiodminutevalue[iperiodtime], 'minutes');
        gGraphPeriod = iperiodminutevalue[iperiodtime];
        grpXAxisPeriod = graphstepSize[iperiodtime];
        gShowLineFlg = gShowLineGraphTable[iperiodtime][gLoggingTime];
        fncDoGraphTransition(gGraphStartTime, gGraphEndTime, gCurtime, timeidx, setting);
    }
}

/**
 * グラフデータを格納してから、描画する
 * obj: Dictionary of Graph data by Unitno (key: unitno, value: graph values)
 * setdata: current graph settingobject
 */
function fncDisp_combigraph_data(objCombiGraphData, setdata) {
    // Leave if setting data still not come
    if ((setdata == null) || (objTreeView == null)) {
        return;
    }
    var settinglist = [];
    // Graph date
    gcombigraph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);
    // データ格納
    // Items 1~10
    for (i in objTreeView.Respons.GraphCombine[gCurCombiGrapIdx].GraphList) {
        gcombigraph_data[i] = [];
        gcombigraph_time[i] = [];
        gcombigraph_dat_num[i] = 0;
        var tmpChannelId = objTreeView.Respons.GraphCombine[gCurCombiGrapIdx].GraphList[i].ChannelId;
        var unitno = objTreeView.Respons.GraphCombine[gCurCombiGrapIdx].GraphList[i].UnitNo;
        var gwid = objTreeView.Respons.GraphCombine[gCurCombiGrapIdx].GraphList[i].IotGatewayId;
        var obj = objCombiGraphData[gwid];
        // Check If the Item values is available
        var listPropertyNames = obj ? Object.keys(obj) : [];
        var setval = {
            label: jis2chr(setdata.GraphList[i].GraphSetting[tmpChannelId].Title),
            Point: setdata.GraphList[i].GraphSetting[tmpChannelId].Point,
            backgroundColor: setdata.GraphList[i].Color,
            Graph: [setdata.GraphList[i].GraphSetting[tmpChannelId].Graph[0], setdata.GraphList[i].GraphSetting[tmpChannelId].Graph[1]],
            Unit: jis2chr(setdata.GraphList[i].GraphSetting[tmpChannelId].Unit)
        };
        settinglist.push(setval);
        if (setdata.GraphList[i].GraphSetting[tmpChannelId].GraphType != 1) {
            // No graph data of Unit
            if (obj == undefined || obj[unitno] == null || (listPropertyNames.includes(unitno.toString()) == false)) {
                gcombigraph_data[i].length = 0;
                gcombigraph_dat_num[i] = 0;
                gcombigraph_time[i].length = 0;
            }
            else {
                var itemObj = obj[unitno];

                //正常
                if (itemObj.Status == 200) {
                    // 初期化する
                    gcombigraph_data[i].length = 0;
                    gcombigraph_dat_num[i] = itemObj.Respons[tmpChannelId].Num;
                    gcombigraph_time[i].length = 0;

                    // y-Dat No 0~60
                    for (var j = 0; j < gcombigraph_dat_num[i]; j++) {
                        //最新時間
                        var datetime = itemObj.Respons[tmpChannelId].Data[j].Time.split(' ');
                        var date = datetime[0].split('-');
                        var time = datetime[1].split(':');
                        var time_term = new Date(parseInt(date[0]), parseInt(date[1]) - 1, parseInt(date[2]), parseInt(time[0]), parseInt(time[1]), parseInt(time[2]));

                        //データがあるかチェック
                        //データが無い場合
                        if (itemObj.Respons[tmpChannelId].Data[j].RSSI == 0) {
                            //時間          "年：月：日 時：分"
                            gcombigraph_time[i].push(("000" + time_term.getFullYear()).slice(-4) + ":" + ("0" + (time_term.getMonth() + 1)).slice(-2) + ":" + ("0" + time_term.getDate()).slice(-2) + ":" + time_term.getHours() + ":" + ("0" + time_term.getMinutes()).slice(-2) + ":" + ("0" + time_term.getSeconds()).slice(-2));
                            //Nullならグラフに表示しない
                            gcombigraph_data[i].push(null);
                        }
                        else {
                            //時間          "年：月：日 時：分"
                            gcombigraph_time[i].push(("000" + time_term.getFullYear()).slice(-4) + ":" + ("0" + (time_term.getMonth() + 1)).slice(-2) + ":" + ("0" + time_term.getDate()).slice(-2) + ":" + time_term.getHours() + ":" + ("0" + time_term.getMinutes()).slice(-2) + ":" + ("0" + time_term.getSeconds()).slice(-2));
                            //AD1
                            gcombigraph_data[i].push(itemObj.Respons[tmpChannelId].Data[j].Value);
                        }
                    }

                }
                else if (itemObj.Status == 400) {
                    gcombigraph_data[i].length = 0;
                    gcombigraph_dat_num[i] = 0;
                    gcombigraph_time[i].length = 0;

                }
            }
        }
    }


    // グラフの表示
    if (gcombigraph_exist == false) {
        // console.log("Start draw " + gCurCombiGrapIdx);
        fncDraw_CombineGraph(settinglist);
    }
    else {
        // console.log("Start update ");
        fncUpdate_CombineGraph(settinglist);
    }

    /* graph data update */
    document.getElementById("idGraphCombine_Time").innerHTML = gcombigraph_date;


}


/*
 機能：  複合のグラフを描画
*/
function fncDraw_CombineGraph(setdata) {

    var canvas_graphcombine = document.getElementById("idGraphCombine_Canvas").getContext("2d");
    gcombigraph_exist = true;

    //ADの単位を表示して、グラフを描画
    gcombigraph_chart = fncDraw_MultilineGraph(canvas_graphcombine, gcombigraph_time, gcombigraph_data, gcombigraph_dat_num, setdata);

    // generate HTML legend
    var myLegendContainer = document.getElementById("idGraphCombine_legend");
    myLegendContainer.innerHTML = gcombigraph_chart.generateLegend();

    // bind onClick event to all LI-tags of the legend
    var legendItems = myLegendContainer.getElementsByTagName('li');
    for (var i = 0; i < legendItems.length; i += 1) {
        legendItems[i].addEventListener("click", function (e) {
            legendClickCallback2(e, gcombigraph_chart);
        });

    }

}

// Y-axis Scale decimals points
var gdecpntlst = [];

/*
* 機能：グラフ値の小数点を取得する
*/
function fncGetPoint(id_y) {
    var idx = id_y.split('_')[1];
    if (gdecpntlst[idx] == null) return '';
    return gdecpntlst[idx];
}

/*
* 機能：マルチのＹ軸のライングラフを描画する
*/
function fncDraw_MultilineGraph(ctx, data_x_in, data_y_in, data_num, setting) {
    var min, max;
    var inputdata = [];
    gdecpntlst = [];

    min = gGraphStartTime;
    max = gGraphEndTime;

    for (j = 0; j < data_y_in.length; j++) {
        var data_x = data_x_in[j];
        var data_y = data_y_in[j];
        var data_y_time = [];
        var tmpDatnum = data_num[j];
        for (i = 0; i < tmpDatnum; i++) {
            data_y_time[i] = { x: moment(data_x[i], "YYYY-MM-DD HH:mm:ss"), y: data_y[i] };
        }
        inputdata.push(data_y_time);
    }

    // Data sets
    var tmpdatasets = [];
    for (i = 0; i < inputdata.length; i++) {
        var idval = 'id_' + i;
        gdecpntlst.push(setting[i].Point);
        var tmpdata = {
            yAxisID: idval,
            //ADの最大値
            label: setting[i].label,
            data: inputdata[i],
            pointRadius: 1.5,
            pointHitRadius: 1.5,
            pointHoverRadius: 2,
            //ラインの設定
            backgroundColor: setting[i].backgroundColor,
            borderColor: setting[i].backgroundColor,
            borderWidth: 2,
            spanGaps: false, //データがNULLなら描画しない
            fill: false,
            showLine: gShowLineFlg
        };
        tmpdatasets.push(tmpdata);
    }

    // Y scales set
    var tmpyscales = [];
    var halft = Math.ceil(setting.length / 2);

    // left hand
    for (i = halft - 1; i >= 0; i--) {
        var idval = 'id_' + i;
        var minG = setting[i].Graph[0];
        var maxG = setting[i].Graph[1];
        var tmpdata = {
            display: true,
            position: 'left',
            type: "linear",
            id: idval,
            ticks: {
                scaleBeginAtZero: false,
                min: minG,
                max: maxG,
                callback: function (value, index, values) {
                    var decpnt = fncGetPoint(this.id);
                    return value.toFixed(decpnt);
                }
            }
        }
        tmpyscales.push(tmpdata);
    }

    // right hand
    for (i = halft; i < inputdata.length; i++) {
        var idval = 'id_' + i;
        var minG = setting[i].Graph[0];
        var maxG = setting[i].Graph[1];
        var tmpdata = {
            display: true,
            position: 'right',
            type: "linear",
            id: idval,
            ticks: {
                scaleBeginAtZero: false,
                min: minG,
                max: maxG,
                callback: function (value, index, values) {
                    var decpnt = fncGetPoint(this.id);
                    return value.toFixed(decpnt);
                }
            }
        }

        tmpyscales.push(tmpdata);
    }

    if (iperiodtime <= 6) {
        stime = "HH:mm";
    } else {
        stime = "MM/DD";
    }

    //グラフオブジェクト作成
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            //横軸のデータ
            datasets: tmpdatasets
        },
        options: {
            //すぐに描画
            animation: {
                duration: 0
            },
            hover: {
                animationDuration: 0
            },
            // ラインのラベル表示しない
            legend: {
                display: false,
            },
            legendCallback: function (chart) {
                var text = [];
                var length = chart.data.datasets.length;
                text.push('<ul class="chart-legend" >');
                for (var i = 0; i < length; i++) {
                    text.push('<li><input id="idlabel' + i + chart.id + '" type="checkbox" class= "checkbox' + i + '" checked="checked" style="border: 1px solid #ffffff; background-color:' + chart.data.datasets[i].backgroundColor + '">');
                    if (chart.data.datasets[i].label) {
                        text.push(chart.data.datasets[i].label);
                    }
                    text.push('</li>');
                }
                text.push('</ul>');
                return text.join('');
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        // return tooltipItem.yLabel.toFixed(decpnt);
                        decpnt = gdecpntlst[tooltipItem.datasetIndex];
                        return tooltipItem.yLabel.toFixed(decpnt);

                    },
                },
            },
            //軸の設定
            scales: {
                xAxes: [{
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
                    },
                    position: "bottom"

                }],
                yAxes: tmpyscales
            },
            //自動的にサイズ変更なし
            Responsive: true,
            maintainAspectRatio: false
        }
    });

    return myChart;
}

function fncUpdate_CombineGraph(setdata) {
    fncUpdate_MultilineGraph(gcombigraph_chart, gcombigraph_time, gcombigraph_data, gcombigraph_dat_num, setdata);
}


function fncUpdate_MultilineGraph(myChart, data_x_in, data_y_in, data_num, setting) {
    var data_y_time = [];
    var min, max;
    var inputdata = [];
    var data_y;

    min = gGraphStartTime;
    max = gGraphEndTime;

    // j = 0~10
    for (j = 0; j < data_y_in.length; j++) {
        var data_y = data_y_in[j];
        var data_x = data_x_in[j];
        var tmpDatnum = data_num[j];
        var data_y_time = [];
        for (i = 0; i < tmpDatnum; i++) {
            data_y_time[i] = { x: moment(data_x[i], "YYYY-MM-DD HH:mm:ss"), y: data_y[i] };
        }
        inputdata.push(data_y_time);
    }

    for (i = 0; i < inputdata.length; i++) {
        myChart.data.datasets[i].data = inputdata[i];
        myChart.data.datasets[i].showLine = gShowLineFlg;

        //グラフ上限
        // myChart.options.scales.yAxes[i].ticks.max = setting[i].Graph[1];
        // myChart.options.scales.yAxes[i].ticks.min = setting[i].Graph[0];
    }

    //時軸
    if (iperiodtime <= 6) {
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
                    minute: "HH:mm"
                },
                stepSize: grpXAxisPeriod,
                tooltipFormat: "YYYY/MM/DD HH:mm:ss"
                //reversed:  false
            },
            position: "bottom"

        }];
    } else {
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

    //グラフを更新
    myChart.update();
}

/*
    JavaScript legend onClick callback
    Hide the multy Y axis
*/
function legendClickCallback2(event, chart) {
    event = event || window.event;

    var target = event.target || event.srcElement;
    while (target.nodeName !== 'LI') {
        target = target.parentElement;
    }
    var parent = target.parentElement;
    // var chartId = parseInt(parent.classList[0].split("-")[0], 10);
    // var chart = chart_histogram_ad1;
    var index = Array.prototype.slice.call(parent.children).indexOf(target);

    chart.legend.options.onClick.call(chart, event, chart.legend.legendItems[index]);
    var id = "idlabel" + index + chart.id;
    if (chart.isDatasetVisible(index)) {
        target.classList.remove('hidden');
        document.getElementById(id).checked = true;
        document.getElementById(id).style.backgroundColor = chart.data.datasets[index].backgroundColor;
    } else {
        target.classList.add('hidden');
        document.getElementById(id).checked = false;
        document.getElementById(id).style.backgroundColor = '#ebecf3';

    }
    // hide the labels
    //toggle the related labels' visibility
    var yidx = index;
    if (index < Math.ceil(chart.options.scales.yAxes.length / 2)) {
        yidx = Math.ceil(chart.options.scales.yAxes.length / 2) - index - 1;
    }
    chart.options.scales.yAxes[yidx].display =
        !chart.options.scales.yAxes[yidx].display;
    chart.update();

}
