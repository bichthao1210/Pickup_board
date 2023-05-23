/*version=1.41*/
// <!-- Log here -->
// 2021/01/13
// 差分グラフの不具合を修正

/**
    Webの制御のJSファイル

    COPYRIGHT 2018 HAKARU PLUS CORPORATION

    修正履歴
        2018/06/19     N.T.THANH       新規作成


*/

/*
    デバッグ用の定義変数
 */

/* 定数 */
const DEBUG_FEEDBACK = false;
const localhost = 'localhost:5000/api/v1.0'; // location.host + "/api/v1.0"; // 
const UnitCode = {
  HLR_A4C4: 1,
  HLR_RS485: 2,
  HLR_C1: 3,
  HLR_C2: 4,
  HLR_A1: 5,
  HLR_A8: 6,
  HLR_C8_IN: 7,
  HR_A4C4: 100,
  TWP8C: 101,
  TWPM_1P2W: 102,
  TWPM_1P3W: 103,
  TWPM_3P3W: 104,
  TWPM_3P4W: 105,
  TWPP: 106,
  XM2_1P2W: 107,
  XM2_1P3W: 108,
  XM2_3P3W: 109,
  XM2_3P4W: 110,
  XS2_1P2W: 111,
  XS2_1P3W: 112,
  XS2_3P3W: 113,
  TWPS: 115,
  HR_A8: 116,
  HR_C8_IN: 117,
  XM2_1P3W_Io_Ior: 118,
  XM2_3P3W_Io_Ior: 119,
  KMN1:800,
  KM50:801,
  KW1M:810,
  KW2G:811,
  EMU4: 820,
  EMU4_2: 821,
  EMU4_3: 822,
  EMU4_4: 823,
  EMU4_5: 824,
  EMU4_6: 825,
  EMU4_7: 826,
};

var MitsubishiUnitCode = [820, 821, 822, 823, 824, 825, 826]

// 入力タイプ
const INPUTTYPE = [
  '不使用',
  '0.0～1.0V',
  '0.0～1.2V',
  '0.0～5.0V',
  '0.0～10.0V',
  '1.0～5.0V',
  '1.0～10.0V',
  '0.0～20.0mA',
  '4.0～20.0mA'
];

const UnitSts = {
  STS_COMM_ERR: "1000",
  STS_WARN: "0001",
  STS_SUCCESS: "0000",
};

const ActiveType = {
  Atv_AllGroup: 0,
  Atv_Group: 1,
  Atv_Unit: 2,
  Atv_SubUnit: 3,
  Atv_Combigraph: 4,
  Atv_CSVPattern: 5
};

const MAXINPUTVALUE = 999999999999;
const MAXINPUTVALUE_OMRON = 999999999;
const MAXINPUTVALUE_EMU4 = 99999999999;
const COMBIGRAPH_GET_LISTGROUP_QUERY = apigateway + "path=graphcombine&GetListGroup";
const COMBIGRAPH_GET_QUERY = apigateway + "path=graphcombine&GetS";
const COMBIGRAPH_SET_QUERY = apigatewaypost + "path=ChangeGraphcombine"; // "http://" + localhost + "/graphcombine?";
const PERIODCOMPARISONGRAPH_GET_QUERY = apigateway + "path=periodcomparisongraph&GetS"; // "http://" + localhost + "/periodcomparisongraph?GetS";

// グラフの変数
var gGraphStartTime;
var gGraphPeriod;
var grpXAxisPeriod;
var gGrphRequestingId;
var gGraphEndTime;
var gCurtime;
var fnccallbackpnt;
var fnccallbackpnt2;
// 線を繋がるかどうかの定義
var gShowLineGraphTable = [
  [true, false, false, false, false, false, false, false, false, false],
  [true, true, true, true, false, false, false, false, false, false],
  [true, true, true, true, true, false, false, false, false, false],
  [true, true, true, true, true, false, false, false, false, false],
  [true, true, true, true, true, true, false, false, false, false],
  [true, true, true, true, true, true, true, false, false, false],
  [true, true, true, true, true, true, true, true, false, false],
  [true, true, true, true, true, true, true, true, true, true],
  [true, true, true, true, true, true, true, true, true, true]
];

// MODBUSユニットの変数
const RS_SETTING_SET = apigatewaypost + "path=ChangeItemSetting"; // "http://" + localhost + "/unitsetting?";
const RS_SETTING_QUERY = apigateway + "path=unitsetting"; // "http://" + localhost + "/unitsetting?";
const RS_GETR_QUERY = apigateway + "path=realtimedata&UnitNo="; // "http://" + localhost + "/realtimedata?UnitNo=";
const RS_GETG_QUERY = apigateway + "path=graphdata"; // "http://" + localhost + "/graphdata?";
const CONTROL_QUERY = apigateway + "path=control"; // "http://" + localhost + "/control?";
const CONTROL_SETDO = apigatewaypost + "path=control&changeType=SetDo";
const CONTROL_PRESET = apigatewaypost + "path=control&changeType=Preset";


// NETWORKの変数
const SYSTIME_CHG_QUERY = apigateway + "path=clock&0000_StTm"; // "http://" + localhost + "/clock?0000_StTm";
const SYSTIME_GET_QUERY = apigateway + "path=clock&0000_GtTm"; // "http://" + localhost + "/clock?0000_GtTm";
const NETWORK_SETDATALOGGING_QUERY = apigateway + "path=logging_set&0000_StLg_"; // "http://" + localhost + "/logging_set?0000_StLg_";
const NETWORK_GETTCPTIMER_QUERY = apigateway + "path=network&0000_GetModbusTCP"; // "http://" + localhost + "/network?0000_GetModbusTCP";
const DATA_DELETE_HISTORY_QUERY = apigateway + "path=logging_set&0000_DelS"; // "http://" + localhost + "/logging_set?0000_DelS";
const SET_MODBUSTCP_QUERY = apigateway + "path=network&0000_SetModbusTCP"; // "http://" + localhost + "/network?0000_SetModbusTCP";
const CSVSETTING_QUERY = apigateway + "path=logging_set&Type=Basic"; // "http://" + localhost + "/logging_set?Type=Basic";
const ANALOGABNORMAL_QUERY = apigateway + "path=logging_set&Type=Analog"; // "http://" + localhost + "/logging_set?Type=Analog";
const STORAGECLEAR_QUERY = apigateway + "path=logging_set&Type=AutoCleanup"; // http://" + localhost + "/logging_set?Type=AutoCleanup";
const SYSTIME_GET_CAPACITY_QUERY = apigateway + "path=logging_set&0000_Used"; // "http://" + localhost + "/logging_set?0000_Used";
const SYSTIME_GET_LASTLOGDATE_QUERY = apigateway + "path=logging_set&0000_From"; // "http://" + localhost + "/logging_set?0000_From";
const DATA_DELETE_GET_QUERY = apigateway + "path=logging_set&0000_DelA"; // "http://" + localhost + "/logging_set?0000_DelA";
const CHECK_STORAGE_QUERY = apigateway + "path=logging_set&Type=StorageFull"; // "http://" + localhost + "/logging_set?Type=StorageFull";
const NETWORK_IPCHG_QUERY = apigateway + "path=network&0000_SetIP"; // "http://" + localhost + "/network?0000_SetIP";
const NETWORK_IPGET_QUERY = apigateway + "path=network&0000_GetIP"; // "http://" + localhost + "/network?0000_GetIP";
const NETWORK_GETDATALOGGING_QUERY = apigateway + "path=logging_set&0000_GtLg"; // "http://" + localhost + "/logging_set?0000_GtLg";
const UNIT_QUERY = apigateway + "path=unit"; // "http://" + localhost + "/unit?";
const UNIT_SET = apigatewaypost + "path=ChangeUnitName";
const SEND_ALLSETTING_TOGW = apigatewaypost + "path=SendAllSettingToGW";
const REQUEST_DATA_FROMGW = apigatewaypost + "path=requestdata";
const STOP_REQUEST_DATA_FROMGW = apigatewaypost + "path=StopRequestdata";
const REQUEST_DATASTATUS_FROMGW = apigateway + "path=getSaveDataStatus";

// Profile
const REQUEST_USER_PROFILE = apigateway + "path=profile";
// const REQUEST_OTP_PROFILE = apigateway + "path=profile-otp-code";

// DIOBoard Status
var gDIOBoardStatus = false;

// VERSION
const VERSION_QUERY = apigateway + "path=version"; // "http://" + localhost + "/version?";
const VERSION_SET = apigatewaypost + "path=version";

// BACKUP
const BACKUP_SET = apigatewaypost + "path=version";

/*
    MAINページ
    DOとDIのON・OFF状態の丸
*/
//丸の色                      0: OFF,     1: ON,     2: 不明
const DO_DI_ONOFF_BGCOLOR = ["#B4A2A2", "#E7DA12", "#EADCDC"];
//丸のコンテンツの色              0: ON,     1: OFF
const DO_DI_ONOFF_TEXTCOLOR = ["#212121", "#FDFDFD"];

/*
    Chartjsライブラリを使用、グラフを描画
    グラフ用のオブジェクト
*/
//電波強度
var chart_dBm;
//電波強度グラフ用のデータ配列
var graph_data_dBm = [];

// 任意選択CSV
const CSVLISTGROUP_QUERY = apigateway + "path=logging_set&GetListGroup";
const CSVLIST_QUERY = apigateway + "path=logging_set&0000_BuncheDataSet";
const CSVLIST_SET = apigatewaypost + "path=logging_set&changeType=BuncheDataSet";

// 係数CSV
const CALCCSVLISTGROUP_QUERY = apigateway + "path=calc_set&getGroupList";
const CALCCSVLIST_QUERY = apigateway + "path=calc_set&getSettingList";
const CALCCSVLIST_SET = apigatewaypost + "path=ChangeCalcSetting";

// ピックアップボードの取得
const PICKUPLISTGROUP_QUERY = apigateway + "path=pickup&type=getGroupList";
const PICKUPGGROUP_QUERY = apigateway + "path=pickup&type=getGroupSetting&pickupNo=";
const PICKUPMEASURE_QUERY = apigateway + "path=pickup&type=getMeasurementSetting&pickupNo=";
const PICKUPSTATE_QUERY = apigateway + "path=pickup&type=getStateSetting&pickupNo=";
// 更新API
const PICKUPGGROUP_SET = apigatewaypost + "path=changePickup&changeType=GroupCardSetting";
const PICKUPMEASURE_SETQUERY = apigatewaypost + "path=changePickup&changeType=MeasurementSetting";
const PICKUPTENKI_SETQUERY = apigatewaypost + "path=changePickup&changeType=WeatherSetting";
const PICKUPSTATE_SETQUERY = apigatewaypost + "path=changePickup&changeType=StateSetting";

const CARD_TILTE_COLOR = "#55A3EC";

// 選択しているゲートウェイID
var lstidGateway = "idGatewaymenu1";
var lstidPickupNo = "idPickupNo1";
// GW名のリスト
var gGwNameList;

// 通信できたフラグ
var connectedWithGW = true;

// グラフ更新周期
var gGetGraphInTerval = undefined;
var gGetInstanceInTerval = undefined;



/**
 *
 * @param {*} callbackfnc
 */
function fncRegCallback(callbackfnc) {
  fnccallbackpnt = callbackfnc;
}

/**
 *
 * @param {*} callbackfnc2
 */
function fncRegCallback2(callbackfnc2) {
  fnccallbackpnt2 = callbackfnc2;
}

/**
 *
 */
function fncDoCallback() {
  if (fnccallbackpnt !== null) {
    fnccallbackpnt();
  }
}

/* データ整理の後、更新する */
function fncDo_DeleteCallback() {
  if (fnccallbackpnt2 !== null) {
    fnccallbackpnt2();
  }
}


/************************************************************************************************************** */
/* システムタイマー設定 */
/************************************************************************************************************** */

// システムの時間を取得、表示する
function get_time() {
  systime_get_data(fncTmUpdate);

  function fncTmUpdate(nobj) {
    // console.log(nobj);
    if (nobj.Status == 200) {
      gCurtime = new Date(parseInt(nobj.Respons.Time[0]), parseInt(nobj.Respons.Time[1]) - 1, parseInt(nobj.Respons.Time[2]), parseInt(nobj.Respons.Time[3]), parseInt(nobj.Respons.Time[4]), 0);
      var strdate = nobj.Respons.Time[0] + "-" + ("00" + nobj.Respons.Time[1]).substr(-2) + "-" + ("00" +
        nobj.Respons.Time[2]).substr(-2);
      var strtime = ("00" + nobj.Respons.Time[3]).substr(-2) + ":" + ("00" + nobj.Respons.Time[4]).substr(-2);
      document.getElementById('idtimedisplay').innerHTML = strdate + " " + strtime;
    }

  }
}


//----------------システム時刻取得----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function systime_get_data(fncTmCallback) {
  var obj;

  //GET電文を作成
  var strGetQuery = SYSTIME_GET_QUERY;
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery)
    // $.getJSON(strGetQuery, function (obj) {
    //     fncTmCallback(obj);
    // });
    http.get(strGetQuery, function (obj) {
      //正常
      fncTmCallback(obj);
    }, function (error) {
      /* エラー状態チェック */
      console.log('systime_get_data: ' + error);
    });
  }
  else {
    obj = {
      "Status": 200,
      "Respons":
      {
        "Time": "[2018,07,20,14,15]"
      }
    };
  }

  return obj;
}

//----------------ユニットリストを取得----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function get_unit_list(fncCallback) {
  var obj;

  //GET電文を作成
  var strGetQuery = UNIT_QUERY + getIotGatewayIdParam();
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery)
    // $.getJSON(strGetQuery, function (obj) {
    //     fncCallback(obj);
    // });
    http.get(
      strGetQuery,
      function (obj) {
        //正常
        fncCallback(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("get_unit_list: " + error);
      }
    );
  }
  /*
  else {
      obj = {
          "Status": 200,
          "Respons":
          {
              "Time": "[2018,07,20,14,15]"
          }
      };
  }
  */

  return obj;
}

/*************************************************************************************************************** */
/*                                                        組織名設定                                             */
/*************************************************************************************************************** */
const COMPANY_NAME_CHG_QUERY = apigatewaypost + "path=ChangeCorp"; // "http://" + localhost + "/corp?Corp_SetN_";
const COMPANY_NAME_GET_QUERY = apigateway + "path=corp&Corp_GetN"; // "http://" + localhost + "/corp?Corp_GetN";
const IOTGATEWAY_NAME_GET_QUERY = apigateway + "path=iot-gateways"; // "http://" + localhost + "/corp?Corp_GetN";
//---------------組織名を保存----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function corp_name_chg_data(corpName, strCoprName, strCorpNameID, strCorpID) {
  var obj;
  // var strGetQuery = COMPANY_NAME_CHG_QUERY + corpName + '_' + strCorpID;
  const PostQuery = COMPANY_NAME_CHG_QUERY + getIotGatewayIdParam();
  //ダイアログの制御
  swal({
    title: "設定を変更しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          console.log(PostQuery);
          const jsStrData = 'CorpName=' + corpName + '&CorpID=' + strCorpID; // JSON.stringify(jsData)
          console.log(jsStrData);
          return http.post(PostQuery, jsStrData, function (obj) {
            return obj;
          }, function (obj) {
            return obj;
          });
          // return $.getJSON(strGetQuery, function (obj) {
          //     return obj;
          // });
        }
        else {
          obj = { "status": 200, CorpName: "68616B6172202020202020202020202020202020" };
          return obj;
        }
      } else {
        throw null;
      }
    })
    .then(function (json) {
      const term = json.Status;
      //正常
      console.log(json);
      if (term == 200) {
        if (document.getElementById(strCorpNameID)) document.getElementById(strCorpNameID).innerHTML = strCoprName;
        // GWタッブ名を更新する
        if (document.getElementById("idtab" + gintIotGatewayId)) {
          document.getElementById("idtab" + gintIotGatewayId).labels[0].textContent = strCoprName;
        }
        swal({
          title: "設定を変更しました。",
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

      fncDoCallback();
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

//-----------------組織名ゲット----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function corp_getname_data(fncNwCallback) {
  var obj;

  //GET電文を作成
  var strGetQuery = COMPANY_NAME_GET_QUERY;
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    http.get(
      strGetQuery,
      function (result) {
        //正常
        fncNwCallback(result);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("corp_getname_data: " + error);
        // alert(
        //   "組織名が取得できません。OKを押すと再度、組織名の取得を行います。"
        // );
        // Reload the current document
        location.reload();
      }
    );

    // $.getJSON(strGetQuery, function (obj) {
    //     fncNwCallback(obj);
    // });
  } else {
    obj = {
      Status: 200,
      Respons: {
        CorpName: "unknown",
      },
    };
    //console.log(strGetQuery);
    //console.log(JSON.stringify(obj));
  }
  return obj;
}

//-----------------GW名ゲット----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function iotgateway_getname_data(fncGwCallback) {
  const gwId = getIotGatewayId();

  if (gwId < 0) return;

  //GET電文を作成
  var strGetQuery = apigateway + "path=iot-gateways&id=" + gwId;
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    http.get(
      strGetQuery,
      function (result) {
        // gGwNameList = result;
        //正常
        fncGwCallback(result);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("iotgateway_getname_data: " + error);
        // Reload the current document
        location.reload();
      }
    );
  } else {
    obj = {
      Status: 200,
      Respons: [
        {
          "id": 1,
          "companyId": 1,
          "name": "hlr-gw-01",
          "nameId": "1",
          "macAdr": "1"
        },
        {
          "id": 3,
          "companyId": 1,
          "name": "hlr-gw-03",
          "nameId": "3",
          "macAdr": "3",
          "ipAdr": "3",
        },
        {
          "id": 4,
          "companyId": 1,
          "name": "836E834A838B8376838983583132332020202020",
          "nameId": "Soshiki1",
          "macAdr": "12:34:56:78:90:12"
        },
        {
          "id": 5,
          "companyId": 1,
          "name": "9167904482502020202020202020202020202020",
          "nameId": "Soshiki1",
          "macAdr": "00:11:0C:21:82:41"
        }
      ],
    };
  }
}

/************************************************************************************************************** */
/* グループ機能 */
/************************************************************************************************************** */
const GROUP_QUERY = apigateway + "path=group"; // http://" + localhost + "/group?";
const GROUP_SET = apigatewaypost + "path=ChangeGroupName";
const ITEMORDER_SET = apigatewaypost + "path=DisplaySet";

//----------------グループ追加----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function grp_add_data(grpName) {
  var obj;

  //GET電文を作成
  var strGetQuery = GROUP_QUERY + getIotGatewayIdParam();
  // JavascriptDataを作成
  var jsDat = new Object();
  // [GroupTitleCode]
  jsDat.GroupTitleCode = grpName;

  //ダイアログの制御
  swal({
    title: "グループを追加しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          return $.ajax({
            url: strGetQuery,
            data: jsDat,
            type: 'PUT'

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
    .then(function (jsonstr) {
      var term = jsonstr.Status;
      //正常
      if (term == 200) {
        swal({
          title: "グループを追加しました。",
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

      fncDoCallback();
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


//----------------グループ変更----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function grp_chg_data(grpNo, grpName) {
  var obj;

  //GET電文を作成
  var strGetQuery = GROUP_SET + getIotGatewayIdParam();
  console.log(strGetQuery);

  // JavascriptDataを作成
  var jsDat = new Object();
  // [GroupNo]
  jsDat.GroupNo = grpNo;
  // [GroupTitleCode]
  jsDat.GroupTitleCode = grpName;

  //ダイアログの制御
  swal({
    title: "グループ名を変更しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          const jsStrData = 'GroupNo=' + grpNo + '&GroupTitleCode=' + grpName; // JSON.stringify(jsData)
          console.log(jsStrData);
          return http.post(strGetQuery, jsStrData, function (obj) {
            return obj;
          }, function (obj) {
            return obj;
          });
          // return $.post(strGetQuery,
          //     jsDat,
          //     function (obj) {
          //         return obj;
          //     });
        }
        else {
          obj = { "Status": 200 };
          return obj;
        }
      } else {
        throw null;
      }
    })
    .then(function (jsonstr) {
      var term = jsonstr.Status;
      //正常
      if (term == 200) {
        swal({
          title: "グループ名を変更しました。",
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

      fncDoCallback();
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

//----------------グループ変更----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function change_group_name(url, jsData) {
  var obj;

  //ダイアログの制御
  swal({
    title: "グループ名を変更しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          return http.post(url, JSON.stringify(jsData), function (obj) {
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
    .then(function (jsonstr) {
      var term = jsonstr.Status;
      //正常
      if (term == 200) {
        swal({
          title: "グループ名を変更しました。",
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

      fncDoCallback();
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

//----------------グループ削除----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function grp_del_data(grpNo, callbackfnc) {
  var obj;

  //GET電文を作成
  var strGetQuery = GROUP_QUERY + getIotGatewayIdParam();

  // JavascriptDataを作成
  var jsDat = new Object();
  // [GroupNo]
  jsDat.GroupNo = grpNo;

  /*
      "sweetalert.min.js"ライブラリを使用
  */
  //ダイアログの制御
  swal({
    title: "グループを削除しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          return $.ajax({
            url: strGetQuery,
            data: jsDat,
            type: 'DELETE'
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
    .then(function (jsonstr) {
      var term = jsonstr.Status;
      //正常
      if (term == 200) {
        swal({
          title: "グループを削除しました。",
          icon: "success",
          buttons: "はい"
        });
        callbackfnc();
      }
      //
      else {
        swal("エラー！ コード：" + term, {
          icon: "error",
          buttons: "はい"
        });
      }

      fncDoCallback();
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
*/
function fncSendSettingPost(PostQuery, jsData) {
  //ダイアログを表示
  swal({
    title: "設定を保存しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        return http.post(PostQuery + getIotGatewayIdParam(),
          typeof jsData === 'string' || jsData instanceof String ? jsData : fncJson2String(jsData),
          function (obj) {
            return obj;
          }, function (obj) {
            return obj;
          });
        // return $.post(PostQuery,
        //     jsData,
        //     function (obj) {
        //         return obj;
        //     });
      } else {
        throw null;
      }
    })
    .then(function (jsonstr) {
      // var jsonobj = JSON.parse(jsonstr);
      const term = jsonstr.Status;
      //正常
      if (term == 200) {
        swal({
          title: "設定を保存しました。",
          icon: "success",
          buttons: "はい"
        });
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


//----------------グループリスト----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function grp_load_list(fncCallback) {
  var obj;
  var strQuery = GROUP_QUERY + getIotGatewayIdParam() + '&Info=Basic';

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strQuery);
    // return $.getJSON(strQuery, function (obj) {
    //     fncCallback(obj);
    // });
    return http.get(strQuery, function (obj) {
      //正常
      fncCallback(obj);
    }, function (error) {
      /* エラー状態チェック */
      console.log('grp_load_list: ' + error);
    });
  }
  else {
    obj = {
      "Status": 200,
      "Respons": {
        "GroupNum": 1,
        "GroupList": [
          {
            "Title": "第一工場",
            "UnitNum": 3,
            "LoRaUnitList": [
              {
                "No": 1,
                "TitleU": "HLR-A4C4_1"
              },
              {
                "No": 2,
                "TitleU": "HLR-A4C4_2"
              },
              {
                "No": 3,
                "TitleU": "HLR-A4C4_3"
              },
            ]
          },

          {
            "Title": "第二工場",
            "UnitNum": 2,
            "LoRaUnitList": [
              {
                "No": 1,
                "TitleU": "HLR-A4C4_1"
              },
              {
                "No": 2,
                "TitleU": "HLR-A4C4_2"
              },
            ]
          },

          {
            "Title": "第三工場",
            "UnitNum": 0,
            "LoRaUnitList": [
              null
            ]
          },

          {
            "Title": "第四工場",
            "UnitNum": 4,
            "LoRaUnitList": [
              {
                "No": 1,
                "TitleU": "HLR-A4C4_1"
              },
              {
                "No": 2,
                "TitleU": "HLR-A4C4_2"
              },
              {
                "No": 3,
                "TitleU": "HLR-A4C4_3"
              },
              {
                "No": 4,
                "TitleU": "HLR-A4C4_4"
              },
            ]
          },

        ]
      }


    };

    return obj;
  }
}


//----------------index.htmlグループリスト----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function grp_index_load_list(fncCallback) {
  if (gintIotGatewayId < 0) {
    strQuery = GROUP_QUERY + '&Info=CSVPattern' + '&Info=CombineGraph' + '&Info=RealtimeData';
  }
  else {
    strQuery = GROUP_QUERY + getIotGatewayIdParam() + ['&Info=Basic', 'Info=Status', 'Info=Setting', 'Info=RealtimeData', 'Info=CombineGraph'].join('&');
  }
  // var obj;
  // var strQuery1 = GROUP_QUERY + 'Info=Basic' + '&Info=Status' + '&Info=CombineGraph' + '&Info=Setting' + '&Info=RealtimeData';
  // console.log(strQuery1);

  // const gwId = getIotGatewayId();
  // if (gwId >= 0) {
  //     strQuery = strQuery + '&IotGatewayId=' + gwId;
  // }
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strQuery);
    // $.getJSON(strQuery, function (obj) {
    //     //正常
    //     if (obj.Status == 200) {
    //         //return obj;
    //         console.log(obj);
    //         fncCallback(obj);
    //     } else {
    //         /* エラー状態チェック */
    //         console.log('grp_index_load_list: ' + obj);
    //         alert("ユニットの状態が取得できません。OKを押すと再度、状態の取得を行います。");
    //         // Reload the current document
    //         location.reload();
    //     }
    // });
    return http.get(strQuery, function (result) {
      //正常
      fncCallback(result);
    }, function (error) {
      /* エラー状態チェック */
      console.log('grp_index_load_list: ' + error);
      // alert("ユニットの状態が取得できません。OKを押すと再度、状態の取得を行います。");
      // Reload the current document
      // location.reload();
    });
  }
  else {
    const obj = {
      "Status": 200,
      "Respons": {
        "GroupNum": 4,
        "GroupList": [{
          "GroupNo": 1,
          "GroupTitleCode": "第一工場",
          "UnitNum": 1,
          "LoRaUnitList": [{
            "UnitNo": 1,
            "UnitSTOP": 0,
            "UnitType": 0,
            "UnitAddr": 0,
            "UnitTitleCode": "HLR-A4C4_1"
          },
          {
            "UnitNo": 1,
            "UnitSTOP": 0,
            "UnitType": 0,
            "UnitAddr": 0,
            "UnitTitleCode": "HLR-A4C4_2"
          },
          {
            "UnitNo": 1,
            "UnitSTOP": 1,
            "UnitType": 0,
            "UnitAddr": 0,
            "UnitTitleCode": "HLR-A4C4_3"
          }
          ]
        },
        {
          "GroupNo": 3,
          "GroupTitleCode": "第二工場",
          "UnitNum": 0,
          "LoRaUnitList": [
            null
          ]
        },
        {
          "GroupNo": 4,
          "GroupTitleCode": "第三工場",
          "UnitNum": 0,
          "LoRaUnitList": [
            {
              "UnitNo": 1,
              "UnitSTOP": 0,
              "UnitType": 0,
              "UnitAddr": 0,
              "UnitTitleCode": "HLR-A4C4_1"
            }
          ]
        },
        {
          "GroupNo": 5,
          "GroupTitleCode": "第四工場",
          "UnitNum": 0,
          "LoRaUnitList": [
            {
              "UnitNo": 1,
              "UnitSTOP": 0,
              "UnitType": 0,
              "UnitAddr": 0,
              "UnitTitleCode": "HLR-A4C4_1"
            },
            {
              "UnitNo": 1,
              "UnitSTOP": 1,
              "UnitType": 0,
              "UnitAddr": 0,
              "UnitTitleCode": "HLR-A4C4_2"
            }
          ]
        }
        ]
      }
    };

    return obj;
  }
}


/************************************************************************************************************** */
/* LoRa通信 */
/************************************************************************************************************** */
const LORA_CMDREAD_QUERY = apigateway + "path=lora"; // "http://" + localhost + "/lora?";
const LORA_CMDWRITE_QUERY = apigateway + "path=lora&AutoSet="; // "http://" + localhost + "/lora?AutoSet=";

//----------------LoRa通信コマンド読み込み----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function lora_cmdread_data(fncLoraCmdCallBack) {
  var obj;

  //GET電文を作成
  var strGetQuery = LORA_CMDREAD_QUERY + getIotGatewayIdParam();
  //サーバーに要求を送信
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    // return $.getJSON(strGetQuery, function (obj) {
    //     console.log(obj);
    //     fncLoraCmdCallBack(obj);
    // });
    return http.get(
      strGetQuery,
      function (obj) {
        //正常
        fncLoraCmdCallBack(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("lora_cmdread_data: " + error);
      }
    );
  }
  else {
    obj = {
      "Status": 200,
      "Respons":
      {
        "LoRa":
        {
          "Ver.": "1.00",
          "Cmd":
            [
              {
                "Code": "g",
                "Param": [
                  "0001", "0002", "0003", "0004"
                ]
              },
              {
                "Code": "g",
                "Param": [
                  "0002", "0002", "0003", "0004"
                ]
              },
              {
                "Code": "g",
                "Param": [
                  "0003", "0002", "0003", "0004"
                ]
              },
              {
                "Code": "m",
                "Param": [
                  "0001", "0002", "0003", "0004"
                ]
              },
            ]
        },
        "Tusin":
        {
          "respwait": 0.1,
          "nextwait": 0.2,
          "retrynum": 3
        }
      }

    };

    fncLoraCmdCallBack(obj);
  }
}

/*
    LoRa通信設定を実行。
*/
function lora_cmdregister_data(objCmd, auto) {
  var obj;

  //ダイアログの制御
  swal({
    title: "設定を保存しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        var strQuery = LORA_CMDWRITE_QUERY + auto;
        strQuery = strQuery + getIotGatewayIdParam();
        return $.post(strQuery,
          {
            group_id: objCmd[0],
            network_key: objCmd[1],
            min_tusin_time: objCmd[2],
            response_waiting_time: objCmd[3],
            tusin_retry_num: objCmd[4],
            send_retry_waiting_base_time: objCmd[5],
            send_retry_waiting_random_time: objCmd[6],
            sendok_waiting_time: objCmd[7],
            tx_power: objCmd[8],
            carrier_sense_time: objCmd[9],
            carrier_sense_retry_num: objCmd[10],
            error_coding_rate: objCmd[11],
            sf_factor: objCmd[12],
            bandwidth: objCmd[13],
            optimize: objCmd[14],
            ComErrDoE: objCmd[15],
            all_unit_tusin_timeout: objCmd[16],
            repeater_waiting_time: objCmd[17],
            repeater_min_tusin_time: objCmd[18],
            repeater_response_waiting_time: objCmd[19],
            LoRaTusinLog: objCmd[20],
            LoRaModuleReset: objCmd[21]
          },
          function (obj) {
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
        var title = "設定を保存しました。";
        var contenthtml = '<span style="color:red">LoRa通信設定を変更した場合は、装置を再起動してください。\n変更後の設定値は、再起動後に有効になります。<span>';
        callSwalWithHTML(contenthtml, title, "success");
      }
      //失敗
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

  return obj;
}

/*
    SweetAlertの内容をHTMLで表示する
*/
function callSwalWithHTML(html, ititle, iicon) {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = html;
  swal({
    title: ititle,
    content: wrapper,
    icon: iicon
  });
}


/************************************************************************************************************** */
/* ユニット（共通） */
/************************************************************************************************************** */

//----------------ユニット新規登録----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function unitcmm_add_data(grpNo, unitCode, comAdr, unitName, rbid) {
  var obj;

  //GET電文を作成
  var strGetQuery = UNIT_QUERY;
  // JavascriptDataを作成
  var jsDat = new Object();
  // [GroupNo]
  jsDat.GroupNo = grpNo;
  // [UnitCode]
  jsDat.UnitCode = unitCode;
  // [ComAdr]
  jsDat.ComAdr = comAdr;
  // [UnitTitleCode]
  jsDat.UnitTitleCode = unitName;
  // [RepeaterID]
  jsDat.RepeaterID = rbid;

  console.log(strGetQuery);

  //ダイアログの制御
  swal({
    title: "ユニットを追加しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          return $.ajax({
            url: strGetQuery,
            data: jsDat,
            type: 'PUT'

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
          title: "ユニットを追加しました。",
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
      fncDoCallback();
    })
    .catch(function (err) {
      console.log("From Catch: Add Unit Error" + err);
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


//----------------ユニットこ編集登録----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function unitcmm_chg_data(unitNo, unitCode, comAdr, unitName, rbid) {
  var obj;
  //GET電文を作成
  var strGetQuery = UNIT_SET + getIotGatewayIdParam();
  console.log(strGetQuery);

  // JavascriptDataを作成
  var jsDat = new Object();
  // [UnitNo]
  jsDat.UnitNo = unitNo;
  // [UnitCode]
  jsDat.UnitCode = unitCode;
  // [ComAdr]
  jsDat.ComAdr = comAdr;
  // [UnitTitleCode]
  jsDat.UnitTitleCode = unitName;
  // [RepeaterID]
  jsDat.RepeaterID = rbid;

  //ダイアログの制御
  swal({
    title: "設定を保存しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          const jsStrData = 'UnitNo=' + unitNo + '&UnitCode=' + unitCode + '&UnitTitleCode=' + unitName;
          console.log(jsStrData);
          return http.post(strGetQuery, jsStrData, function (obj) {
            return obj;
          }, function (obj) {
            return obj;
          });
          // return $.post(strGetQuery,
          //     jsDat,
          //     function (obj) {
          //         console.log(strGetQuery);
          //         return obj;
          //     });
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
          title: "設定を保存しました。",
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
      fncDoCallback();
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


//----------------ユニットこ編集登録----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function unitcmm_del_data(unitNo, callbackfnc) {
  var obj;

  //GET電文を作成
  var strGetQuery = UNIT_QUERY;

  // JavascriptDataを作成
  var jsDat = new Object();
  // [UnitNo]
  jsDat.UnitNo = unitNo;

  //ダイアログの制御
  swal({
    title: "ユニットを削除しますか？",
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
          return $.ajax({
            url: strGetQuery,
            data: jsDat,
            type: 'DELETE'
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
          title: "ユニットを削除しました。",
          icon: "success",
          buttons: "はい"
        });
        // 成功ならIDを更新
        if (typeof (callbackfnc) == "function") {
          callbackfnc();
        }
      }
      //
      else {
        swal("エラー！ コード：" + term, {
          icon: "error",
          buttons: "はい"
        });
      }
      fncDoCallback();
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


/* TWPMのグラフを表示 */
function fncGet_GraphData_RS485(setting, strUnitNo, date, timeidx, fncDispGrp) {
  var datearr = date.split("/");
  var tmpdate = new Date(date + " " + ("0" + dropdowntime[itime]).slice(-2) + ":" + ("0" + iminuteval[iminuteidx]).slice(-2));

  gGraphStartTime = moment(tmpdate, "YYYY-MM-DD HH:mm:ss");
  gGraphEndTime = moment(gGraphStartTime).add(iperiodminutevalue[iperiodtime], 'minutes').format("YYYY-MM-DD HH:mm");
  gGraphPeriod = iperiodminutevalue[iperiodtime];
  grpXAxisPeriod = graphstepSize[iperiodtime];
  gShowLineFlg = gShowLineGraphTable[iperiodtime][gLoggingTime];
  rs485_grpread_data(strUnitNo, datearr[0], datearr[1], datearr[2], dropdowntime[itime], iminuteval[iminuteidx], gGraphPeriod, fncDispGrp,
    setting, gGrphRequestingId);
  // グラフ幅内に現在時刻があるかチェックする
  fncDoGraphTransition(gGraphStartTime, gGraphEndTime, gCurtime, timeidx, setting);
}

//----------------RS-485ユニットのグラフ値取得----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function rs485_grpread_data(unitNo, year, month, day, hour, min, Num, fncCallBack, setdata, unitId) {
  var obj;
  var tmpunitId = new String();
  tmpunitId = unitId;

  //GET電文を作成
  var strUnitNo = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);
  var strGetQuery = RS_GETG_QUERY + '&UnitNo=' + strUnitNo + "&" + 'Year=' + year + "&" + 'Month=' + month + "&" + 'Day=' + day + "&" + 'Hour=' + hour + "&" + 'Minute=' + min + "&" + 'Period=' + Num;
  strGetQuery += getIotGatewayIdParam();

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    // $.getJSON(strGetQuery, function (obj) {

    //     // if(tmpunitId != gGrphRequestingId){
    //     //     return;
    //     // }
    //     fncCallBack(obj, setdata);
    // });
    http.get(strGetQuery, function (obj) {
      fncCallBack(obj, setdata);
    }, function (error) {
      /* エラー状態チェック */
      console.log("rs485_grpread_data: " + error);
    });
  }
  else {
    return obj;
  }

  return obj;

}


//----------------HLRA4C4のDO制御----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function hlra4c4_doctrl_data(unitNo, DoVal) {
  var obj;
  var modaltitle;
  var modalsuccess;
  var untstr = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);
  //GET電文を作成
  var PostQuery = CONTROL_SETDO + getIotGatewayIdParam(); // CONTROL_QUERY;
  // JavascriptDataを作成
  var jsDat = new Object();
  // [UnitNo]
  jsDat.UnitNo = untstr;
  // [DoVal]
  jsDat.DoVal = DoVal;

  if (DoVal == "FF00") {
    modaltitle = "DOの状態をONしますか？";
    modalsuccess = "ONにします！";
  }
  else {
    modaltitle = "DOの状態をOFFしますか？";
    modalsuccess = "OFFにします！";
  }

  swal({
    title: modaltitle,
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
          title: modalsuccess,
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

//----------------HLRA4C4のDO制御----------------
/*  機能： サーバーへ設定値の要求を送信、そして受信データを格納
                受信データはJSON型
                正常のコード：200
*/
function hlrc_doctrl_data(unitNo, DoVal, e) {
  var obj;
  var modaltitle;
  var modalsuccess;
  var untstr = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);
  var ch = e.target.id;
  var item = ch.split("_")[1] + "_" + 'output';

  //GET電文を作成
  const PostQuery = CONTROL_SETDO + getIotGatewayIdParam(); // CONTROL_QUERY;
  // JavascriptDataを作成
  var jsDat = new Object();
  // [UnitNo]
  jsDat.UnitNo = untstr;
  // [Item]
  jsDat.Item = item;
  // [DoVal]
  jsDat.DoVal = DoVal;

  /*
      "sweetalert.min.js"ライブラリを使用
  */
  //ダイアログの制御
  if (DoVal == "FF00") {
    modaltitle = "DOの状態をONしますか？";
    modalsuccess = "ONにします！";
  }
  else {
    modaltitle = "DOの状態をOFFしますか？";
    modalsuccess = "OFFにします！";
  }

  swal({
    title: modaltitle,
    icon: "warning",
    buttons: ["いいえ", "はい"],
    dangerMode: true,
  })
    .then(function (yes) {
      if (yes) {
        //サーバーに要求を送信
        if (DEBUG_FEEDBACK !== true) {
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
          title: modalsuccess,
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



var gstrCorpName = "";
function fncGetCorpName() {
  return gstrCorpName;
}

/*
    機能： 組織名を表示する
*/
function fncDispCorpName(nobj) {
  if (nobj.Status == 200) {
    gstrCorpName = nobj.Respons.CorpName;
    // 一番上の会社「ハカルプラス株式会社」を表示する
    if (document.getElementById("company_name_nav")) document.getElementById("company_name_nav").innerHTML = gstrCorpName;
    // 電力量表示画面で組織名を表示する
    if (document.getElementById("idCorpName") != null) document.getElementById("idCorpName").innerHTML = gstrCorpName;

      if (document.getElementById("idloginnamedisplay")) {
        const admin_name = getCookie("admin_name");
        if (admin_name) {
          document.getElementById("idloginnamedisplay").innerHTML = "[" + admin_name + "]";
          // document.getElementById("idloginnamedisplay").innerHTML = "<a href='./admin/profile.html' class='username'>[" + admin_name + "]</a>";
        } else {
          fncUpdateUsername();
        }
      }
  }
}

/*
    機能： 組織名を表示する
*/
function fnGetGWName() {
  let gwname = "";
  if (gGwNameList == null) return "";
  let obj = gGwNameList.Respons.items.find(o => o.id === parseInt(gintIotGatewayId));
  gwname = obj.name;
  return jis2chr(gwname);
}

function fncIoTGatewayMenuClick(idGatewaymenu) {
  if (gintIotGatewayId < 0) {
    document.getElementById("mainAlarmShow").style.display = "block";
    document.getElementById("idgraphcontent").style.display = "none";
    document.getElementById("idcompanycontent").style.display = "none";
    document.getElementById("garphlist_content").style.display = "none";
    document.getElementById("CSVmain").style.display = "none";

    if (idGatewaymenu === lstidGateway) {
      const eleCurrentGatewayMenu = document.getElementById(idGatewaymenu);
      eleCurrentGatewayMenu.classList.add("active");
    } else {
      const eleCurrentGatewayMenu = document.getElementById(idGatewaymenu);
      eleCurrentGatewayMenu.classList.add("active");

      const eleCurrentGateway = document.getElementById(lstidGateway);
      eleCurrentGateway.classList.remove("active");
      lstidGateway = idGatewaymenu;
    }
  }
}

// 警報件数
function fncUpdateAlarmCount(nobj) {
  let gw_err_count = 0;
  for (i in nobj.Respons.IotGateways) {
    const SystemStatus = nobj.Respons.IotGateways[i].SystemStatus;
    // ２時間以上GWと通信しないこと
    if (SystemStatus === "1000") {
      gw_err_count +=1;
    }
    else if (SystemStatus === "0000") {
    }
    else if (SystemStatus === "0001") {
      for (j in nobj.Respons.IotGateways[i].UnitStates) {
        gw_err_count +=1;
      }
    }
    // 状態がNull
    else {
      gw_err_count +=1;
    }
  }
  
  if (document.getElementById("idItemStatusText")) {
      document.getElementById("idItemStatusText").innerHTML = gw_err_count.toString() + " 件";
  }
  return gw_err_count;
}

/*
    機能： ゲートウェイ名メニューのHTMLを作成する
*/
function fncDispGwNameMenu(nobj) {
  // 警報件数
  fncUpdateAlarmCount(nobj);

  // 表示中画面はホームのタブではない時→戻る
  if (gintIotGatewayId >= 0) {
    if (document.getElementById("indexiotgatewaymenu")) {
      document.getElementById("indexiotgatewaymenu").innerHTML = "";
      document.getElementById("indexiotgatewaymenu").style.display = "none";
    }
    if (document.getElementById("mainAlarmShow")) {
      document.getElementById("mainAlarmShow").style.display = "none";
    }
    return;
  }
  // ツリーを無効/有効する
  document.getElementById("indextreeviewmenu").style.display = "none";
  if (document.getElementById("garphlist_content")) document.getElementById("garphlist_content").style.display = "none";
  if (document.getElementById("CSVmain")) document.getElementById("CSVmain").style.display = "none";
  if (document.getElementById("idgraphcontent")) document.getElementById("idgraphcontent").style.display = "none";

  // if ((window.location.href).indexOf("logging") == -1) {
  //   // 警報等表示する
  //   // document.getElementById("mainAlarmShow").style.display = "none";
  //   fncAlarmShow(nobj);
  // }

  // メニューのHTML-Templateを作成する
  if (document.getElementById("indexiotgatewaymenu")) {
    document.getElementById("indexiotgatewaymenu").style.display = "block";
  }
  let strIotGateway = "";
  // 機器一覧
  strIotGateway += '<button ';
  strIotGateway += 'class="list-group-item list-group-item-action pl-3 pr-2 d-inline-flex align-items-center">';
  strIotGateway += '<span class="tv-resize">'
  strIotGateway += '<img id="idGatewayImgDark" src="/img/list_dark.png" alt="" height="22" class="d-inline-block align-text-top">';
  strIotGateway += '<strong class="pl-2">機器一覧</strong>';
  strIotGateway += '</span>'
  strIotGateway += '</button>';

  for (i in nobj.Respons.IotGateways) {
    let tmpGateway = "";
    if (nobj.Respons.IotGateways[i] !== "NULL") {
      tmpGateway +=
        '<button class="list-group-item list-group-item-action pl-3 pr-2 d-flex align-items-center" id="';
      tmpGateway += "idGatewaymenu" + i + '"';
      tmpGateway += ' ondblclick="fncShowGateway(';
      tmpGateway += nobj.Respons.IotGateways[i].Id;
      tmpGateway += ')"';
      tmpGateway += 'onclick="fncIoTGatewayMenuClick(';
      tmpGateway += "'" + "idGatewaymenu" + i + "'";
      tmpGateway += ')">';
      const SystemStatus = nobj.Respons.IotGateways[i].SystemStatus;
      if (SystemStatus === "1000") {
        tmpGateway +=
          '<span style="width: 0.7rem">　</span><span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0"><img id="idiconiotgateway0${id}" src="/img/circle-x.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon"></span><span  class="tv-resize">';
      } else if (nobj.Respons.IotGateways[i].UnitStates.length === 0) {
        tmpGateway +=
          '<span style="width: 0.7rem">　</span><span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0"><img id="idiconiotgateway0${id}" src="/img/circle-check.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon"></span><span  class="tv-resize">';
      } else {
        let isItemEmpty = true;
        let UnitStates = nobj.Respons.IotGateways[i].UnitStates;
        for (j in UnitStates) {
          const ItemStates = UnitStates[j].ItemStates;
          if (ItemStates.length === 0) {
          } else {
            isItemEmpty = false;
          }
        }
        if (isItemEmpty) {
          tmpGateway +=
            '<span style="width: 0.7rem">　</span><span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0"><img id="idiconiotgateway0${id}" src="/img/circle-check.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon"></span><span  class="tv-resize">';
        } else {
          tmpGateway +=
            '<span style="width: 0.7rem">　</span><span style="width: 0.7rem" class="d-inline-flex align-middle m-0 mr-2 pb-0"><img id="idiconiotgateway0${id}" src="/img/warning.svg" width="14" height="14" class="d-inline-block align-items-center m-0 p-0" alt="icon"></span><span  class="tv-resize">';
        }
      }
      tmpGateway += "${name}</span></button>";
      strIotGateway += tmpGateway
        .replaceAll("${name}", escapeHtml(jis2chr(nobj.Respons.IotGateways[i].Name)))
        .replaceAll("${id}", nobj.Respons.IotGateways[i].Id);
    }
  }
  if (document.getElementById("indexiotgatewaymenu")) {
    document.getElementById("indexiotgatewaymenu").innerHTML = strIotGateway;
  }


}

function fncShowGateway(id) {
  window.location = "/index.html?id=" + id;
}

/*
    機能： GW名を表示する
*/
function fncDispGwName(nobj) {
  // 左サイドバーGW警報
  if (document.getElementById("iotgateway_name_nav")) {
    document.getElementById("iotgateway_name_nav").innerHTML = escapeHtml(jis2chr(nobj.Respons.items[0].name));
  };
  // system.htmlページで組織名を表示する
  if (document.getElementById("idcompanyname")) {
    document.getElementById("idcompanyname").value = jis2chr(nobj.Respons.items[0].name);
  };
  // system.htmlページで組織IDを表示する
  if (document.getElementById("idcompanyID")) {
    document.getElementById("idcompanyID").value = (nobj.Respons.items[0].nameId);
  }
  if (!nobj.Respons.items[0].connectedWithGW) {
    $("#iddispmenu").prop("disabled", true);
    $("#idsettingmenu").prop("disabled", true);
  }

  // 設定メニュー権限
  fncUpdateSettingMenuRole();


}

/*
    機能：機種の画面を無効にする
*/
function DisableMachineType() {
  document.getElementById("hlra4c4_content").style.display = "none";
  document.getElementById("hlrrs485_content").style.display = "none";
  document.getElementById("hlra1_content").style.display = "none";
  document.getElementById("hlrc2_content").style.display = "none";
  document.getElementById("hlrc8in_content").style.display = "none";
  document.getElementById("hlra8_content").style.display = "none";
  document.getElementById("twpp_content").style.display = "none";
  document.getElementById("twpm").style.display = "none";
  document.getElementById("twpm_3p4w").style.display = "none";
  document.getElementById("twpm_1p3w").style.display = "none";
  document.getElementById("twpm_1p2w").style.display = "none";
  document.getElementById("twps").style.display = "none";
  document.getElementById("twp8c").style.display = "none";
  document.getElementById("xm2").style.display = "none";
  document.getElementById("xm2_3p4w").style.display = "none";
  document.getElementById("xm2_1p3w").style.display = "none";
  document.getElementById("xm2_1p2w").style.display = "none";
  document.getElementById("xs2").style.display = "none";
  document.getElementById("xs2_3p4w").style.display = "none";
  document.getElementById("xs2_1p3w").style.display = "none";
  document.getElementById("xs2_1p2w").style.display = "none";
  document.getElementById("xm2_3p3w_io_ior").style.display = "none";
  document.getElementById("xm2_1p3w_io_ior").style.display = "none";
  document.getElementById("kmn1").style.display = "none";
  document.getElementById("km50").style.display = "none";
  document.getElementById("kw1m").style.display = "none";
  document.getElementById("kw2g").style.display = "none";
  document.getElementById("xs2").style.display = "none";
};


/*
    機能： ホームタブのメイン画面に警報リストを表示する。現在、まだ警報リストデータがない。
*/
/*
    機能： ホームタブのメイン画面に警報リストを表示する。現在、まだ警報リストデータがない。
*/
function fncAlarmShow(nobj) {
  // 各GWツリーと状態を表示する
  fncDispGwNameMenu(nobj);
  
  // 不要内容を無効する
  if (document.getElementById("idLoading")) document.getElementById("idLoading").style.display = "none";
  if (document.getElementById("mainAlarmShow").style.display == "none") {
    return;
  }
  if (document.getElementById("idcompanycontent")) document.getElementById("idcompanycontent").style.display = "none";
  if (document.getElementById("idgroupcontent")) document.getElementById("idgroupcontent").style.display = "none";
  // 各機種のコンテンツを無効にする
  DisableMachineType();

  // HTML-Templateを作成する
  let str = "";
  let gw_err_count = 0;
  for (i in nobj.Respons.IotGateways) {
    // GW名称＋更新時間
    let tmp = "";
    let id = nobj.Respons.IotGateways[i].Id;
    let strDatetime = nobj.Respons.IotGateways[i].Datetime ? nobj.Respons.IotGateways[i].Datetime : '----/--/-- --:--:--';
    tmp +=
      '<div onclick="Alarm_click(${id})" class="backLoRa card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-dark rounded-0">';
    tmp += '<p id="id_title${id}" class="h5 m-0">${gatewayname}　${itemcount}</p>';
    tmp += '<p id="updated_time" class="border-0 pb-0">データ更新：${Year}/${Month}/${Day} ${Hour}:${Minute}</p> </div>';
    str += tmp
      .replaceAll(
        "${gatewayname}",
        escapeHtml(jis2chr(nobj.Respons.IotGateways[i].Name))
      )
      .replaceAll("${id}", nobj.Respons.IotGateways[i].Id)
      .replaceAll(
        "${Year}",
        strDatetime.substr(0, 4)
      )
      .replaceAll(
        "${Month}",
        strDatetime.substr(5, 2)
      )
      .replaceAll(
        "${Day}",
        strDatetime.substr(8, 2)
      )
      .replaceAll(
        "${Hour}",
        strDatetime.substr(11, 2)
      )
      .replaceAll(
        "${Minute}",
        strDatetime.substr(14, 2)
      );

    // 警報メッセージ
    let item_err_count = 0;
    let UnitStates = nobj.Respons.IotGateways[i].UnitStates;
    let SystemStatus = nobj.Respons.IotGateways[i].SystemStatus;
    str += '<div class="card-body px-0 pt-0 pb-3">';
    // ２時間以上GWと通信しないこと
    if (SystemStatus === "1000") {
      gw_err_count +=1;
      str += '<button type="button" class="btn-systemstatus" onclick="Alarm_click(';
      str += id + ')"';
      str += '>最終データ更新時刻から２時間以上経過しましたが、データが上がってきません</button>';
    }
    else if (SystemStatus === "0000") {
      str += '<button type="button" class="btnexample" onclick="Alarm_click(';
      str += id + ')"';
      str += '>' + '<span style="background-color: #d7dcb7; padding-left:1rem; padding-right:1rem; padding-top:0.1rem; padding-bottom:0.1rem;color:green;font-weight:bold">正常</span>'+ '</button>';
    }
    else if (SystemStatus === "0001") {
      for (j in UnitStates) {
        gw_err_count +=1;
        item_err_count += 1;
        let alertmessage = fncGetAlarmText(UnitStates[j].UnitCode, UnitStates[j].UnitName, UnitStates[j].ItemStates, UnitStates[j].SystemStatus);
        if (alertmessage == "") continue;
        let str1 = '<button type="button" class="btnexample" onclick="Alarm_click(';
        str1 += id + ',' + UnitStates[j].UnitNo + ')"';
        str1 += '>' + '<span style="background-color: #f1dce8; padding-left:1rem; padding-right:1rem; padding-top:0.1rem; padding-bottom:0.1rem;color:red;font-weight:bold">異常</span>　' + alertmessage + '</button>';
        str += str1;
      }
    }
    // 状態がNull
    else {
      gw_err_count +=1;
      str += '<button type="button" class="btnexample" onclick="Alarm_click(';
      str += id + ')"';
      str += '>--</button>';
    }
    str += "</div>";

    // GWツリーのアイコンを更新
    fncDispStatusGatewayNodeTreeView(id, SystemStatus);
    // GWの警報件数を更新
    // str = str.replaceAll("${itemcount}",item_err_count > 0 ? '<span class="numberCircle" style="font-weight:bold">'+item_err_count+'</span>' : '');
    str = str.replaceAll("${itemcount}",item_err_count > 0 ? '<span class="badge badge-pill badge-danger">' + item_err_count + '</span>' : '');
  }
  
  // 警報メッセージ
  document.getElementById("mainAlarmShow").innerHTML = str;
  // 警報件数
  document.getElementById("idItemStatusText").innerHTML = gw_err_count.toString() + " 件";
}

function fncGetAlarmText(unitCode, Unitname, ItemStates, UnitStatus) {
  var alert_exist = 0;// 0: success; 1; danger; 2: warning
  var alert_str = "";
  var unknown = false;
  var itemcode;
  var item;
  var state;
  var title = "";
  var value;
  var unit = "";

  if (UnitStatus == "1000") {
    alert_str = jis2chr(Unitname) + 'は通信異常が発生しています！　';
  }
  else if (UnitStatus == "0000") {
    alert_str = "";
  }
  else if (UnitStatus == "0001") {
    // HLR-A4C4, HR-A4C4
    if ((unitCode == UnitCode.HLR_A4C4) || (unitCode == UnitCode.HR_A4C4)) {
      //An
      for (var i = 0; i < 4 && alert_exist == 0; i++) {
        itemcode = 'an' + (i + 1).toString() + '_analog';
        item = ItemStates.find(x => x.Item === itemcode);
        state = item.State;

        if (state == null) {
          unknown = true;
        }

        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
        }
        //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
        // xxxx 01xx xxxx xxxx
        else if (((state & 0x0800) == 0) && ((state & 0x0400) == 0x0400)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 2;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }
      }
      // 最大・最小警報
      for (var i = 0; i < 4; i++) {
        itemcode = 'an' + (i + 1).toString() + '_analog';
        item = ItemStates.find(x => x.Item === itemcode);
        state = item.State;
        // 最大警報
        // xxxx xxxx 1xxx xxxx
        if ((state & 0x0080) == 0x0080) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 5;
          break;
        }
        // 最小警報
        // xxxx xxxx x1xx xxxx
        if ((state & 0x0040) == 0x0040) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 4;
          break;
        }
      }

      // アナログ入力異常
      for (var i = 0; i < 4; i++) {
        itemcode = 'an' + (i + 1).toString() + '_analog';
        item = ItemStates.find(x => x.Item === itemcode);
        state = item.State;
        if ((state & 0x0001) == 0x0001) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 3;
          break;
        }
      }

      //DI
      for (var i = 0; i < 4 && alert_exist == 0; i++) {
        itemcode = 'di' + (i + 1).toString() + '_counter';
        item = ItemStates.find(x => x.Item === itemcode);
        state = item.State;
        timercode = 'di' + (i + 1).toString() + '_timer';
        timer_item = ItemStates.find(x => x.Item === timercode);
        // State
        if (state == null) {
          unknown = true;
        }
        // DI-Timer
        if ((timer_item.DiTimerEnable !== 0)) {
          //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
          // xxxx 10xx xxxx xxxx
          if ((state & 0x8000) == 0x8000) {
            title = item.Title;
            value = item.Value;
            unit = item.Unit;
            alert_exist = 1;
          }
        }

        // DI
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if ((state & 0x0800) == 0x0800) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
        }
      }
    }
    // TWP8C
    else if (unitCode == UnitCode.TWP8C) {
      //DI
      for (var i = 0; i < 8 && alert_exist == 0; i++) {
        itemcode = 'di' + (i + 1).toString() + '_counter';
        item = ItemStates.find(x => x.Item === itemcode);
        state = item.State;
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
        }
        //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
        // xxxx 01xx xxxx xxxx
        else if (((state & 0x0800) == 0) && ((state & 0x0400) == 0x0400)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 2;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }
      }
    }
    // HR-A8
    else if ((unitCode == UnitCode.HLR_A8) || (unitCode == UnitCode.HLR_A1) || (unitCode == UnitCode.HR_A8)) {
      //An
      for (var i = 0; i < 8 && alert_exist == 0; i++) {
        itemcode = 'an' + (i + 1).toString() + '_analog';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) break;
        state = item.State;

        if (state == null) {
          unknown = true;
        }

        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
        }
        //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
        // xxxx 01xx xxxx xxxx
        else if (((state & 0x0800) == 0) && ((state & 0x0400) == 0x0400)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 2;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }
      }
      // 最大・最小警報
      for (var i = 0; i < 8; i++) {
        itemcode = 'an' + (i + 1).toString() + '_analog';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) break;
        state = item.State;
        // 最大警報
        // xxxx xxxx 1xxx xxxx
        if ((state & 0x0080) == 0x0080) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 5;
          break;
        }
        // 最小警報
        // xxxx xxxx x1xx xxxx
        if ((state & 0x0040) == 0x0040) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 4;
          break;
        }
      }

      // アナログ入力異常
      for (var i = 0; i < 8; i++) {
        itemcode = 'an' + (i + 1).toString() + '_analog';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) break;
        state = item.State;
        if ((state & 0x0001) == 0x0001) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 3;
          break;
        }
      }
    }
    else if ((unitCode == UnitCode.HLR_C8_IN) || (unitCode == UnitCode.HR_C8_IN)) {
      for (var i = 0; i < 8 && alert_exist == 0; i++) {
        //DI
        itemcode = 'di' + (i + 1).toString() + '_counter';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) break;
        state = item.State;
        // State
        if (state == null) {
          unknown = true;
        }
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
          break;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }

        //DI Timer
        itemcode = 'di' + (i + 1).toString() + '_timer';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) continue;
        state = item.State;

        if (state == null) {
          unknown = true;
        }
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x8000) == 0x8000) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
          break;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x8000) == 0x8000) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }
      }
    }
    else if ((unitCode == UnitCode.HLR_C1) || (unitCode == UnitCode.HLR_C2)) {
      for (var i = 0; i < 2 && alert_exist == 0; i++) {
        //DI
        itemcode = 'di' + (i + 1).toString() + '_counter';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) break;
        state = item.State;
        // State
        if (state == null) {
          unknown = true;
        }
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
          break;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }

        //DI Timer
        itemcode = 'di' + (i + 1).toString() + '_timer';
        item = ItemStates.find(x => x.Item === itemcode);
        if (item == null) continue;
        state = item.State;

        if (state == null) {
          unknown = true;
        }
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          title = item.Title;
          value = item.Value;
          unit = item.Unit;
          alert_exist = 1;
          break;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }
      }
    }
    else {
      for (var i = 0; i < ItemStates.length && alert_exist == 0; i++) {
        state = ItemStates[i].State;
        title = ItemStates[i].Title;
        value = ItemStates[i].Value;
        unit = ItemStates[i].Unit;

        if (state == null) {
          unknown = true;
        }
        //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
        // xxxx 10xx xxxx xxxx
        if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
          alert_exist = 1;
        }
        //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
        // xxxx 01xx xxxx xxxx
        else if (((state & 0x0800) == 0) && ((state & 0x0400) == 0x0400)) {
          alert_exist = 2;
        }
        //不明
        // xxxx 11xx xxxx xxxx
        else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0x0400)) {
          unknown = true;
        }
      }
    }

    if (alert_exist == 1) {
      alert_str = "が上限警報発生値を超えています！　";
    } else if (alert_exist == 2) {
      alert_str = "が下限警報発生値を下回っています！　";
    } else if (alert_exist == 3) {
      alert_str = " アナログ入力異常が発生しています！　";
    } else if (alert_exist == 4) {
      alert_str = "（最小値）が下限警報発生値を下回っています！　";
    } else if (alert_exist == 5) {
      alert_str = "（最大値）が上限警報発生値を超えています！　";
    }
    else if (unknown == true) {
      alert_str = "が警報不明です。　";
    }
    // else {
    //   alert_str = ("が正常です。　");
    // }

    alert_str = jis2chr(Unitname) + "の" + jis2chr(title) + alert_str + value + "[" + jis2chr(unit) + "]";
  }

  return alert_str;
}


/*
    機能：警報をクリックするイベントの処理
*/
function Alarm_click(id, UnitNo) {
  iotgateway_click(id);
  CheckUnitNo(UnitNo, id);
}

/*
    機能：警報リストのクリック通りにそのユニットのデータ表示画面に遷移することを処理します。
*/
function CheckUnitNo(UnitNo) {
  grp_index_load_list(function (obj) {
    console.log("ReLoad Data!");
    console.log(obj)
    let objTreeView = obj
    for (i in objTreeView.Respons.GroupList) {
      for (j in objTreeView.Respons.GroupList[i].LoRaUnitList) {
        if (objTreeView.Respons.GroupList[i].LoRaUnitList[j] !== "NULL") {
          if (objTreeView.Respons.GroupList[i].LoRaUnitList[j].UnitNo == UnitNo) {
            idLorainitNo = "idunit" + i + j;
            treeview_click(idLorainitNo, 1, i, j, 0);

          }
        } else {
          return;
        }
        for (k in objTreeView.Respons.GroupList[i].LoRaUnitList[j]
          .ModbusUnitList) {
          if (
            objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[
            k
            ] !== "NULL"
          ) {
            if (
              objTreeView.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k]
                .UnitNo == UnitNo
            ) {
              idModbusunitNo = "idrs" + i + j + k;
              treeview_click(idModbusunitNo, 2, i, j, k);
            }
          }
        }
      }
    }
  })
}

/*
    機能： 警報タイトルを表示する
*/
function DisplayTitleAlarm(AlarmState) {
  state = AlarmState;
  let AlarmTitle = "";

  // アナログ入力異常
  if ((state & 0x0001) == 0x0001) {
    alert_exist = 3;
  }
  // 最大警報
  // xxxx xxxx 1xxx xxxx
  else if ((state & 0x0080) == 0x0080) {
    alert_exist = 5;
  }
  // 最小警報
  // xxxx xxxx x1xx xxxx
  else if ((state & 0x0040) == 0x0040) {
    alert_exist = 4;
  }
  //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
  // xxxx 10xx xxxx xxxx
  else if (((state & 0x0800) == 0x0800) && ((state & 0x0400) == 0)) {
    alert_exist = 1;
  }
  //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
  // xxxx 01xx xxxx xxxx
  else if (((state & 0x0800) == 0) && ((state & 0x0400) == 0x0400)) {
    alert_exist = 2;
  }
  //警報上限値： 警報上限値 ＝ 1
  // 1xxx xxxx xxxx xxxx
  else if ((state & 0x8000) == 0x8000) {
    alert_exist = 1;
  }
  else {
    alert_exist = 0;
  }

  if (alert_exist == 1) {
    AlarmTitle = "が上限警報発生値を超えています！　";
  } else if (alert_exist == 2) {
    AlarmTitle = "が下限警報発生値を下回っています！　";
  } else if (alert_exist == 3) {
    AlarmTitle = " アナログ入力異常が発生しています！　";
  } else if (alert_exist == 4) {
    AlarmTitle = "（最小値）が下限警報発生値を下回っています！　";
  } else if (alert_exist == 5) {
    AlarmTitle = "（最大値）が上限警報発生値を超えています！　";
  } else if (alert_exist == 0) {
    AlarmTitle = "　が正常です。　";
  }
  return AlarmTitle
}


/*
    機能： 組織名を取得して、表示する
*/
function corp_name_disp() {
  // 
  corp_getname_data(fncDispCorpName);

  // IotGwタブ
  iotgateway_getname_data(fncDispGwName);
}

/*  機能： 16進数の文字列から10進数の数値または10進数の文字列に変換
  引数:
      hexvalue:   16進数の文字列
      dec:        少数点以下桁数
      num_fl:     戻り値は文字列か数値が選択できる
                  false   : 文字列
                  true    : 数値
  戻り値:
      10進数の数値または10進数の文字列
*/
function hex2dec(hexvalue, dec, num_fl) {
  var ret, term;

  //16進数から10進数に変換
  ret = parseInt(hexvalue, 16);
  //マイナス値チェック
  //if ((ret & 0x10000000)) {
  //    ret = ret - 0x100000000;
  //}

  ret /= Math.pow(10, 4);

  term = Math.pow(10, dec);

  ret *= term;
  ret = Math.round(ret);
  ret /= term;

  if (num_fl == false) {
    ret = ret.toFixed(dec);
  }

  return ret;
}

/*  機能： 表示用の 16進数の文字列 → 10進数の文字列 変換処理
  引数:
      hexvalue:   16進数の文字列
      dec:        少数点以下桁数
  戻り値:
      小数点以下桁数を指定した10進数の数値
*/
function hex2dec4Disp(hexvalue, dec) {
  var ret, term;

  //16進数から10進数に変換
  ret = parseInt(hexvalue, 16);

  //マイナス値チェック
  if (ret & 0x80000000) {
    ret = ret - 0x100000000;
  }

  //小数点以下桁数指定
  ret /= Math.pow(10, 4);
  ret = ret.toFixed(dec);

  return ret;
}

/*  機能： 10進数の文字列小数点つける
  引数:
      value:   10進数の文字列
      dec:        少数点以下桁数
      num_fl:     戻り値は文字列か数値が選択できる
                  false   : 文字列
                  true    : 数値
  戻り値:
      10進数の数値または10進数の文字列
*/
function value2decstr(value, dec, num_fl) {
  var ret, term;

  //値取得
  ret = parseInt(value, 10);
  //マイナス値チェック
  if (ret & 0x10000000) {
    ret = ret - 0x100000000;
  }

  ret /= Math.pow(10, 4);

  term = Math.pow(10, dec);

  ret *= term;
  ret = Math.round(ret);
  ret /= term;

  if (num_fl == false) {
    ret = ret.toFixed(dec);
  }

  return ret;
}

/*  機能： 表示用の 14進数の文字列を小数点付け
  引数:
      value:   10進数の文字列
      dec:        少数点以下桁数
  戻り値:
      小数点以下桁数を指定した10進数の数値
*/
function value2decstr4Disp(value, dec) {
  var ret, term;

  //値取得
  ret = parseInt(value, 10);

  //マイナス値チェック
  if (ret & 0x80000000) {
    ret = ret - 0x100000000;
  }

  //小数点以下桁数指定
  ret /= Math.pow(10, dec);
  ret = ret.toFixed(dec);

  return ret;
}

/*  機能： 10進数の文字列から16進数の文字列に変換
  引数:
      decvalue:   10進数の文字列
      dec:        >>
  戻り値:
      16進数の文字列
*/
function dec2hex(decvalue, dec) {
  var str = "";
  var term = parseFloat(decvalue, 10);
  //少数以下桁数により
  term *= Math.pow(10, dec);
  //Convert float to integer
  term = Math.round(term);
  //マイナス値なら
  if (term < 0) {
    term = 0xffffffffffff + term + 1;
  }
  //Convert integer to hex
  str = term.toString(16).toUpperCase();
  //8桁 -> 12桁
  while (str.length < 12) {
    str = "0" + str;
  }

  return str;
}

/*  機能： 文字列からShift-JISコードのHEX文字列に変換
  引数    ：
              input_string:   文字列
              byteNum     :   バイト数指定
  戻り値  ：Shift-JISコードのHEX文字列
*/
function chr2sjis(input_string, byteNum) {
  var strTerm = "";
  var arUni = [],
    arSjis = [];
  var term;
  var i;

  /*
      "encoding.js"ライブラリを使用
  */
  //文字列からUnicodeの配列に変換
  arUni = Encoding.stringToCode(input_string);

  //Unicodeの配列からShift-JIS(10進数値)の配列に変換
  arSjis = Encoding.convert(arUni, {
    to: "SJIS",
    from: "UNICODE",
  });

  //10進数値の配列からHex文字列に変換
  for (i = 0; i < arSjis.length; i++) {
    term = parseInt(arSjis[i], 10).toString(16).toUpperCase();
    if (term.length < 2) {
      term = "0" + term;
    }
    strTerm += term;
  }

  //バイト指定の長さまで0x"20"で埋める
  if (byteNum > strTerm.length / 2) {
    var add_len = byteNum - strTerm.length / 2;
    for (i = 0; i < add_len; i++) {
      strTerm += "20";
    }
  }
  return strTerm;
}

/*  機能： SHIFT-JISコードのHEX文字列から文字列に変換
  引数    ：
              HEX_string  : SHIFT-JISコードのHEX文字列
  戻り値  ：文字列
*/
function jis2chr(HEX_string) {
  var arSjis = [];
  var arUni = [];
  var cnt = 0;

  //HEX文字列からShift-JIS(10進数)配列に変換
  for (var i = 0; i < HEX_string.length - 1; i += 2) {
    arSjis[cnt] = parseInt(HEX_string[i] + HEX_string[i + 1], 16);
    cnt++;
  }
  //Shift-JIS配列からUnicode配列に変換
  arUni = Encoding.convert(arSjis, {
    to: "UNICODE",
    from: "SJIS",
  });
  //Unicode配列から文字列に変換、そして戻す
  return Encoding.codeToString(arUni).trim();
}

/*
  ----------------設定ページ----------------
*/

/**
 * 電波強度の設定ボタンをクリックの時
 * titleid：タイトルID
 * unitNo: 設定しているのユニットNo
 */
function fncCheckdBmTitle(titleid, unitNo) {
  //タイトル
  var strTitle = document.getElementById(titleid).value;
  if (strTitle.trim() == "") {
    swal({
      title: "設定エラー！",
      text: "タイトル入力をしてください。",
      icon: "warning",
      buttons: "はい",
    });
    return;
  }
  if (
    string_len_check(
      document.getElementById(titleid).value,
      20,
      "電波強度のタイトルは",
      true
    ) == false
  )
    return;
  // Check if title contains comma [,]
  if (strTitle.indexOf(",") > -1) {
    swal({
      title: "設定エラー！",
      text: "タイトルに「,」を入力しないでください。",
      icon: "warning",
      buttons: "はい",
    });
    return;
  }
  // JavascriptDataを作成
  var jsDat = new Object();
  // [UnitNo]
  jsDat.UnitNo = unitNo;
  // [RSSI_Title]
  jsDat.RSSI_Title = chr2sjis(document.getElementById(titleid).value, 20);

  //ダイアログを表示
  fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/*  説明： 文字列の長さをチェックして、ダイアログを表示
  引数    ：
              input_string　：    文字列
              len           ：    長さ、単位はバイト
              alarm_content ：    ダイアログ用のコンテンツ
  戻り値  ：
              正常    ：  TRUE
              異常    ：  FALSE
*/
function string_len_check(input_string, len, alarm_content, btitle) {
  var cnt = 0;
  var strContent;

  //タイトル
  if (btitle == true) {
    strContent =
      alarm_content +
      len.toString() +
      "バイト以下で入力してください。" +
      "\n（半角" +
      len.toString() +
      "文字または全角" +
      (len / 2).toString() +
      "文字以内）";
  }
  //単位
  else {
    strContent =
      alarm_content +
      len.toString() +
      "バイト以下で入力してください。" +
      "\n（半角" +
      len.toString() +
      "文字以内）";
  }
  cnt = getLen(input_string);
  if (cnt > len) {
    swal({
      title: "設定エラー！",
      text: strContent,
      icon: "warning",
      button: "はい",
    });
    return false;
  }

  if (containsSpecialChars(input_string)==true) {
    swal({
        title: "設定エラー！",
        text: '名称は(\\ / : * ? " < > |)の記号を入力しないでください。',
        icon: "warning",
        button: "はい",
    });
    return false;
  }

  return true;
}

/*  機能： 入力した文字の文字数をカウントする（半角文字は1文字、全角文字は2文字として文字数をカウントする）
  引数    ：  文字
*/
function getLen(str) {
  var result = 0;
  for (var i = 0; i < str.length; i++) {
    var chr = str.charCodeAt(i);
    if (
      (chr >= 0x00 && chr < 0x81) ||
      chr === 0xf8f0 ||
      (chr >= 0xff61 && chr < 0xffa0) ||
      (chr >= 0xf8f1 && chr < 0xf8f4)
    ) {
      //半角文字の場合は1を加算
      result += 1;
    } else {
      //それ以外の文字の場合は2を加算
      result += 2;
    }
  }
  //結果を返す
  return result;
}

/*  機能： 入力テキストは数字しかない、マイナス値も出来る
  引数    ：  キーイベントのオブジェクト
*/
function textbox_number(e) {
  //有効 ：  Backspace, Delete, Tab, Escape, Enter, ".", "-" | Bug Firefox "-" = 173, Chrome: "-" = 189
  if (
    $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 173, 189, 190, 109]) !==
    -1 ||
    //有効 ：  Ctrl/cmd+A
    (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
    //有効 ：  Ctrl/cmd+C
    (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
    //有効 ：  Ctrl/cmd+V
    (e.keyCode == 86 && (e.ctrlKey === true || e.metaKey === true)) ||
    //有効 ：  Ctrl/cmd+X
    (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
    //有効 ：  Ctrl/cmd+Z
    (e.keyCode == 90 && (e.ctrlKey === true || e.metaKey === true)) ||
    //有効 ：  home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)
  ) {
    // 有効にして、何もしない
    return;
  }
  // 無効にする
  if (
    (e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
    (e.keyCode < 96 || e.keyCode > 105)
  ) {
    e.preventDefault();
  }
}

/*  機能：  RS485の用サーバーへ設定値の要求を送信して、受信データを表示
          受信データはJSON型
          正常コード：200
*/
function rs485_load_setting(UnitNo, fncCallBack, Type) {
  var strGetQuery;

  /* CGI要求作成 */
  strGetQuery = RS_SETTING_QUERY + "&UnitNo=" + UnitNo;
  strGetQuery += getIotGatewayIdParam();
  console.log(strGetQuery);
  //サーバーへ要求を送信して、受信データをJSON型に変更
  // $.getJSON(strGetQuery, function (obj) {
  //   //正常  -> コルバック関数
  //   fncCallBack(obj, Type);
  // });
  http.get(
    strGetQuery,
    function (obj) {
      //正常  -> コルバック関数
      fncCallBack(obj, Type);
    },
    function (error) {
      /* エラー状態チェック */
      console.log("rs485_load_setting: " + error);
    }
  );
}

/*  機能：  RS485ユニットの瞬時値の要求電文を作成
          ホストのアドレスを含まない
  引数：
          unitNo: 現在のユニットの順番
          fncCallBack: 表示Callback関数
  戻り値： 要求電文
*/
function rs485_insread_data(unitNo, fncCallBack, setting) {
  let obj;
  const unit = ("000" + unitNo.toString(16).toUpperCase()).substr(-4);
  let strGetQuery = RS_GETR_QUERY + unit;
  strGetQuery += getIotGatewayIdParam();

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    // $.getJSON(strGetQuery, function (obj) {
    //   fncCallBack(obj, setting);
    // });
    http.get(strGetQuery, function (obj) {
      fncCallBack(obj, setting);
    }, function (error) {
      /* エラー状態チェック */
      console.log("rs485_insread_data: " + error);
    });
  } else {
    fncCallBack(obj, setting);
    return obj;
  }
  return obj;
}

function addLoraAdrOption(id, adrStart, adrEnd) {
  var selectObj = document.getElementById(id);
  for (var i = adrStart; i <= adrEnd; i++) {
    var option = document.createElement("option");
    var strNum1 = ("00" + i.toString()).substr(-3);
    var strNum2 = ("00" + i.toString(16).toUpperCase()).substr(-2);
    option.text = strNum1 + " (" + strNum2 + "H)";
    selectObj.add(option);
  }
}

/* 最大ユニット数のチェック関数 */
function fncUnitNumCheck() {
  var i, j;
  var unitnumber = 0;
  for (i in sysTreeViewJson.Respons.GroupList) {
    unitnumber =
      unitnumber + sysTreeViewJson.Respons.GroupList[i].LoRaUnitList.length;
    for (j in sysTreeViewJson.Respons.GroupList[i].LoRaUnitList) {
      unitnumber =
        unitnumber +
        sysTreeViewJson.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList
          .length;
    }
  }
  console.log("ユニット数：" + unitnumber);
  if (unitnumber >= 128) {
    return false;
  }
  return true;
}

function loraAdrAddCheck(loraAdr, sysTreeViewJson) {
  var i, j;
  for (i in sysTreeViewJson.Respons.GroupList) {
    for (j in sysTreeViewJson.Respons.GroupList[i].LoRaUnitList) {
      if (
        sysTreeViewJson.Respons.GroupList[i].LoRaUnitList[j].UnitAdr ==
        loraAdr
      )
        return false;
    }
  }
  return true;
}

function loraAdrChgCheck(loraAdr, sysTreeViewJson, gcurgrp, gcurunit) {
  if (
    sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit]
      .UnitAdr == loraAdr
  )
    return true;
  var i, j;
  for (i in sysTreeViewJson.Respons.GroupList) {
    for (j in sysTreeViewJson.Respons.GroupList[i].LoRaUnitList) {
      if (
        sysTreeViewJson.Respons.GroupList[i].LoRaUnitList[j].UnitAdr ==
        loraAdr
      )
        return false;
    }
  }
  return true;
}

function rsAdrAddCheck(loraAdr, sysTreeViewJson, AddUnitCode) {
  var i;

  var iAddUnitCode = Number(AddUnitCode)
  for (i in sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList) {
      if (MitsubishiUnitCode.indexOf(iAddUnitCode) != -1) {
          if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitAdr == loraAdr) {
              if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitTypeCode == iAddUnitCode) {
                  return false;
              }

              if (MitsubishiUnitCode.indexOf(sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitTypeCode)==-1 ){
                  return false;
              }
          }
      } else {
          if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitAdr == loraAdr) return false;
      }
  }
  return true;
}

function rsAdrChgCheck(loraAdr, sysTreeViewJson, gcurunit, gcurunit, gcurrs,AddUnitCode) {

  if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[gcurrs].UnitAdr == loraAdr) return true;
  var i;
  for (i in sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList) {

      if (MitsubishiUnitCode.indexOf(AddUnitCode) != -1) {
          if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitAdr == loraAdr) {
              if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitTypeCode == AddUnitCode) {
                  return false;
              }
              if (MitsubishiUnitCode.indexOf(sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitTypeCode)==-1 ){
                  return false;
              }
          }
      } else {
          if (sysTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[i].UnitAdr == loraAdr) return false;
      }
  }
  return true;
}

// *******************************************************************************************
// *                               DIOボードの対応                                            *
// *******************************************************************************************

/**
 * 接点入出力ボードがGWに付いているかどうかチェック
 */
function fncUpdateDIOBoardStatus() {
  // 表示中画面はホームのタブではない時→戻る
  if (gintIotGatewayId < 0) {
    $(idAlarmDisp).addClass("d-none");
    $(idBuzzerDisp).removeClass("d-flex");
    $(idBuzzerDisp).addClass("d-none");
    return;
  }

  fncIsDIOBoardOn(function (obj) {
    if (obj.Status == 200) {
      // ボード有り
      if (obj.Respons.DioBoardE == 1) {
        gDIOBoardStatus = true;
        // 警報状態を取得
        fncGetAlarmStatus();
      }
      // ボード無しー＞警報状態＋ブザーは表示しない。
      else {
        $(idAlarmDisp).addClass("d-none");
        $(idBuzzerDisp).removeClass("d-flex");
        $(idBuzzerDisp).addClass("d-none");
        gDIOBoardStatus = false;
      }
    } else {
      console.log("fncUpdateDIOBoardStatus: " + obj.Status);
    }
  });
}

/**
 * ボードの有無状態を取得
 */
function fncIsDIOBoardOn(fncCallBack) {
  var obj;
  let strGetQuery = apigateway + "path=dio&0000_GetDIOBoardS";
  strGetQuery += getIotGatewayIdParam()

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    // $.getJSON(strGetQuery, function (obj) {
    //   fncCallBack(obj);
    // });
    http.get(
      strGetQuery,
      function (obj) {
        //正常
        fncCallBack(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("fncIsDIOBoardOn: " + error);
      }
    );
  } else {
  }

  return obj;
}

/**
 * 警報の状態を取得
 */
function fncGetAlarmStatus() {
  // 表示中画面はホームのタブではない時→戻る
  if (gintIotGatewayId < 0) {
    $(idAlarmDisp).addClass("d-none");
    $(idBuzzerDisp).addClass("d-none");
    return;
  }

  var obj;
  // var strGetQuery = "http://" + localhost + "/dio?0000_GetDIOAlarmS";
  let strGetQuery = apigateway + "path=dio&0000_GetDIOAlarmS";
  strGetQuery += getIotGatewayIdParam()

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    if (gDIOBoardStatus == true) {
      console.log(strGetQuery);
      // $.getJSON(strGetQuery, function (obj) {
      //   fncUpdateAlarmBar(obj);
      // });
      http.get(
        strGetQuery,
        function (obj) {
          //正常
          fncUpdateAlarmBar(obj);
        },
        function (error) {
          /* エラー状態チェック */
          console.log("fncGetAlarmStatus: " + error);
        }
      );
    }
  } else {
  }

  return obj;
}

/**
 * メニューバーの表示での警報状態を更新
 */
function fncUpdateAlarmBar(subobj) {
  if (subobj.Status == 200) {
    // 警報有り
    if (subobj.Respons.DIOAlarmState == 1) {
      document.getElementById("idAlarmImg").src = "/img/lamp-on.svg";
      document.getElementById("idAlarmStatus").innerHTML = "警報発生中";
      $("#idAlarmStatus").removeClass("text-muted");
      $("#idAlarmStatus").addClass("text-warning");

      document.getElementById("idBuzzerImg").src = "/img/buzzer-on.svg";
      $("#idBuzzertxt").removeClass("text-muted");
      $("#idBuzzertxt").addClass("text-light");

      $("#idBuzzerStopBtn").prop("disabled", false);
    }
    // ランプのみ点灯
    else if (subobj.Respons.DIOAlarmState == 2) {
      document.getElementById("idAlarmImg").src = "/img/lamp-on.svg";
      document.getElementById("idAlarmStatus").innerHTML = "警報発生中";
      $("#idAlarmStatus").removeClass("text-muted");
      $("#idAlarmStatus").addClass("text-warning");

      document.getElementById("idBuzzerImg").src = "/img/buzzer-off.svg";
      $("#idBuzzertxt").removeClass("text-light");
      $("#idBuzzertxt").addClass("text-muted");

      $("#idBuzzerStopBtn").prop("disabled", true);
    }
    // 警報無し
    else {
      document.getElementById("idAlarmImg").src = "/img/lamp-off.svg";
      document.getElementById("idAlarmStatus").innerHTML = "警報無し";
      $("#idAlarmStatus").removeClass("text-warning");
      $("#idAlarmStatus").addClass("text-muted");

      document.getElementById("idBuzzerImg").src = "/img/buzzer-off.svg";
      $("#idBuzzertxt").removeClass("text-light");
      $("#idBuzzertxt").addClass("text-muted");

      $("#idBuzzerStopBtn").prop("disabled", true);
    }

    $(idAlarmDisp).removeClass("d-none");
    $(idBuzzerDisp).removeClass("d-none");
    $(idBuzzerDisp).addClass("d-flex");
  }
}

/**
 * 警報解除
 */
function doStopAlarm() {
  // GET電文を作成
  // var strGetQuery = "http://" + localhost + "/dio?ALM_SetBuzzerOff";
  let PostQuery = apigatewaypost + "path=dio&changeType=ALM_SetBuzzerOff";
  PostQuery += getIotGatewayIdParam()
  return http.post(PostQuery, {}, function (obj) {
    console.log(PostQuery);
    console.log(JSON.stringify(obj));
    swal({
      title: "ブザーを停止しました。",
      icon: "success",
      buttons: "はい",
    });
    // ブザー画像を更新
    document.getElementById("idBuzzerImg").src = "/img/buzzer-off.svg";
    $("#idBuzzertxt").removeClass("text-light");
    $("#idBuzzertxt").addClass("text-muted");
    $("#idBuzzerStopBtn").prop("disabled", true);
  }, function (obj) {
    swal("エラー！ コード：" + obj.Status, {
      icon: "error",
      buttons: "はい",
    });
  });
  // $.getJSON(strGetQuery, function (objresp) {
  //   console.log(strGetQuery);
  //   console.log(JSON.stringify(objresp));
  //   const term = objresp.Status;
  //   // 正常
  //   if (objresp.Status == 200) {
  //     swal({
  //       title: "ブザーを停止しました。",
  //       icon: "success",
  //       buttons: "はい",
  //     });
  //     // ブザー画像を更新
  //     document.getElementById("idBuzzerImg").src = "/img/buzzer-off.svg";
  //     $("#idBuzzertxt").removeClass("text-light");
  //     $("#idBuzzertxt").addClass("text-muted");
  //     $("#idBuzzerStopBtn").prop("disabled", true);
  //   }
  //   //エラー
  //   else {
  //     swal("エラー！ コード：" + term, {
  //       icon: "error",
  //       buttons: "はい",
  //     });
  //   }
  // });
}

// *******************************************************************************************
// *                               LogOutの対応                                               *
// *******************************************************************************************
// Delete All Cookies
function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var spcook = cookies[i].split("=");
    deleteCookie(spcook[0]);
  }
  function deleteCookie(cookiename) {
    var d = new Date();
    d.setDate(d.getDate() - 1);
    var expires = ";expires=" + d;
    var name = cookiename;
    var value = "";
    document.cookie = name + "=" + value + expires + "; path=./index.html";
  }

  // var cookies = document.cookie.split(";");
  // for (var i = 0; i < cookies.length; i++) {
  //     var cookie = cookies[i];
  //     var eqPos = cookie.indexOf("=");
  //     var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
  //     document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  // }
}

/**
 * Get URL parameter
 */
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// *******************************************************************************************
// *                               グラフの対応                                               *
// *******************************************************************************************

/*  機能：  AD用のグラフを描画
          "chartjs.js"ライブラリを使用して、グラフを描画
  引数：
          ctx：       canvas 2d content オブジェクト
          data_x：    時間
          data_y：    計測値
          data_num：  データ数
          ad_setting：ADの設定値
  戻り値： グラフオブジェクト
*/
function draw_graph_ad(ctx, data_x, data_y, data_num, ad_setting) {
  var data_y_time = [];
  var data_y_warnH = [];
  var data_y_warnL = [];
  var min, max;

  min = gGraphStartTime;
  max = gGraphEndTime;

  // 瞬時値を格納する
  for (i = 0; i < data_num; i++) {
    data_y_time[i] = { x: data_x[i], y: data_y[i] };
  }

  //  警報上下限のデータを格納
  data_y_warnH[0] = { x: min, y: ad_setting.Alarm[1] };
  data_y_warnH[1] = { x: max, y: ad_setting.Alarm[1] };
  data_y_warnL[0] = { x: min, y: ad_setting.Alarm[0] };
  data_y_warnL[1] = { x: max, y: ad_setting.Alarm[0] };

  //警報有無条件チェック
  var tmpdatasets;
  if (ad_setting.AlarmE[1] == 1 && ad_setting.AlarmE[0] == 1) {
    tmpdatasets = [
      {
        //縦軸のデータ
        data: data_y_time,
        //データポイントの設定
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverBorderWidth: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        //データがNULLなら描画しない
        spanGaps: false,
        //ラインの下の背景着色
        fill: false,
        showLine: gShowLineFlg,
      },
      //警報上限値ライン
      {
        data: data_y_warnH,
        //データポイント表示しない
        pointRadius: 0,
        //データポイントを触ると何も表示しない
        pointHitRadius: 0,
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#EB5757",
        borderWidth: 2,
        //ラインの下の背景着色
        type: "line",
        fill: false,
      },
      {
        data: data_y_warnL,
        //データポイント表示しない
        pointRadius: 0,
        //データポイントを触ると何も表示しない
        pointHitRadius: 0,
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#F2C94C",
        borderWidth: 2,
        //ラインの下に背景着色
        type: "line",
        fill: false,
      },
    ];
  } else if (ad_setting.AlarmE[1] == 1 && ad_setting.AlarmE[0] == 0) {
    tmpdatasets = [
      {
        //縦軸のデータ
        data: data_y_time,
        //データポイントの設定
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverBorderWidth: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        //データがNULLなら描画しない
        spanGaps: false,
        //ラインの下の背景着色
        fill: false,
        showLine: gShowLineFlg,
      },
      //警報上限値ライン
      {
        data: data_y_warnH,
        //データポイント表示しない
        pointRadius: 0,
        //データポイントを触ると何も表示しない
        pointHitRadius: 0,
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#EB5757",
        borderWidth: 2,
        //ラインの下の背景着色
        type: "line",
        fill: false,
      },
    ];
  } else if (ad_setting.AlarmE[1] == 0 && ad_setting.AlarmE[0] == 1) {
    tmpdatasets = [
      {
        //縦軸のデータ
        data: data_y_time,
        //データポイントの設定
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverBorderWidth: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        //データがNULLなら描画しない
        spanGaps: false,
        //ラインの下の背景着色
        fill: false,
        showLine: gShowLineFlg,
      },
      {
        data: data_y_warnL,
        //データポイント表示しない
        pointRadius: 0,
        //データポイントを触ると何も表示しない
        pointHitRadius: 0,
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#F2C94C",
        borderWidth: 2,
        //ラインの下に背景着色
        type: "line",
        fill: false,
      },
    ];
  } else {
    tmpdatasets = [
      {
        //縦軸のデータ
        data: data_y_time,
        //データポイントの設定
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverBorderWidth: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        //データがNULLなら描画しない
        spanGaps: false,
        //ラインの下の背景着色
        fill: false,
        showLine: gShowLineFlg,
      },
    ];
  }

  // Scale decimals points
  var decpnt = ad_setting.Point;

  if (iperiodtime <= 6) {
    stime = "HH:mm";
  } else {
    stime = "MM/DD";
  }

  //グラフオブジェクト作成
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      //横軸のデータ
      //labels: data_x,
      datasets: tmpdatasets,
    },
    options: {
      //すぐに描画
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      //ラインのラベル表示しない
      legend: {
        display: false,
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
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 31,
              max: max,
              min: min,
            },

            scaleLabel: {
              display: true,
            },
            type: "time",
            time: {
              unit: "minute",
              displayFormats: {
                minute: stime,
              },

              stepSize: grpXAxisPeriod,
              tooltipFormat: "YYYY/MM/DD HH:mm:ss",
            },
            position: "bottom",
          },
        ],
        yAxes: [
          {
            ticks: {
              scaleBeginAtZero: false,
              min: ad_setting.Graph[0],
              max: ad_setting.Graph[1],

              callback: function (label, index, labels) {
                return label.toFixed(decpnt);
              },
            },
          },
        ],
      },
      Responsive: true,
      maintainAspectRatio: false,
    },
  });

  return myChart;
}

/*  機能：  AD用のグラフを描画
          "chartjs.js"ライブラリを使用して、グラフを描画
  引数：
          ctx：       canvas 2d content オブジェクト
          data_x：    時間
          data_y：    計測値
          data_num：  データ数
          ad_setting：ADの設定値
  戻り値： グラフオブジェクト
*/
function draw_minmaxavg_ad(
  ctx,
  data_x,
  max_data,
  min_data,
  med_data,
  data_num,
  ad_setting
) {
  var data_max_time = [];
  var data_min_time = [];
  var data_med_time = [];
  var data_y_warnH = [];
  var data_y_warnL = [];
  var min, max;

  min = gGraphStartTime;
  max = gGraphEndTime;

  // ADの最大、最小、平均を格納
  for (i = 0; i < data_num; i++) {
    data_max_time[i] = { x: data_x[i], y: max_data[i] };
    data_min_time[i] = { x: data_x[i], y: min_data[i] };
    data_med_time[i] = { x: data_x[i], y: med_data[i] };
  }

  // 警報の上下限値を格納
  data_y_warnH[0] = { x: min, y: ad_setting.Alarm[1] };
  data_y_warnH[1] = { x: max, y: ad_setting.Alarm[1] };
  data_y_warnL[0] = { x: min, y: ad_setting.Alarm[0] };
  data_y_warnL[1] = { x: max, y: ad_setting.Alarm[0] };

  //警報有無条件チェック
  var tmpdatasets;
  if (ad_setting.AlarmMinMaxE[1] == 1 && ad_setting.AlarmMinMaxE[0] == 1) {
    tmpdatasets = [
      {
        //ADの最大値
        label: "最大",
        data: data_max_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        spanGaps: false, //データがNULLなら描画しない
        fill: false,
        showLine: gShowLineFlg,
      },
      //ADの最小値
      {
        label: "最小",
        data: data_min_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(50, 115, 220, 0.1)",
        borderColor: "#2753ea",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      // ADの平均値
      {
        label: "平均",
        data: data_med_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgb(204, 255, 153)",
        borderColor: "#00cc00",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      //警報上限値ライン
      {
        data: data_y_warnH,
        pointRadius: 0, //データポイント表示しない
        pointHitRadius: 0, //データポイントを触ると何も表示しない
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#EB5757",
        borderWidth: 2,
        //ラインの下の背景着色
        type: "line",
        fill: false,
      },
      //警報下限値ライン
      {
        data: data_y_warnL,
        //データポイント表示しない
        pointRadius: 0,
        //データポイントを触ると何も表示しない
        pointHitRadius: 0,
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#F2C94C",
        borderWidth: 2,
        //ラインの下に背景着色
        type: "line",
        fill: false,
      },
    ];
  } else if (
    ad_setting.AlarmMinMaxE[1] == 1 &&
    ad_setting.AlarmMinMaxE[0] == 0
  ) {
    tmpdatasets = [
      {
        //ADの最大値
        label: "最大",
        data: data_max_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        spanGaps: false, //データがNULLなら描画しない
        fill: false,
        showLine: gShowLineFlg,
      },
      //ADの最小値
      {
        label: "最小",
        data: data_min_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(50, 115, 220, 0.1)",
        borderColor: "#2753ea",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      // ADの平均値
      {
        label: "平均",
        data: data_med_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgb(204, 255, 153)",
        borderColor: "#00cc00",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      //警報上限値ライン
      {
        data: data_y_warnH,
        pointRadius: 0, //データポイント表示しない
        pointHitRadius: 0, //データポイントを触ると何も表示しない
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#EB5757",
        borderWidth: 2,
        //ラインの下の背景着色
        type: "line",
        fill: false,
      },
    ];
  } else if (
    ad_setting.AlarmMinMaxE[1] == 0 &&
    ad_setting.AlarmMinMaxE[0] == 1
  ) {
    tmpdatasets = [
      {
        //ADの最大値
        label: "最大",
        data: data_max_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        spanGaps: false, //データがNULLなら描画しない
        fill: false,
        showLine: gShowLineFlg,
      },
      //ADの最小値
      {
        label: "最小",
        data: data_min_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(50, 115, 220, 0.1)",
        borderColor: "#2753ea",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      // ADの平均値
      {
        label: "平均",
        data: data_med_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgb(204, 255, 153)",
        borderColor: "#00cc00",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      //警報下限値ライン
      {
        data: data_y_warnL,
        //データポイント表示しない
        pointRadius: 0,
        //データポイントを触ると何も表示しない
        pointHitRadius: 0,
        pointHoverRadius: 0,
        //ラインの設定
        backgroundColor: "rgba(0,0,0,0.2)",
        borderColor: "#F2C94C",
        borderWidth: 2,
        //ラインの下に背景着色
        type: "line",
        fill: false,
      },
    ];
  } else {
    tmpdatasets = [
      {
        //ADの最大値
        label: "最大",
        data: data_max_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        spanGaps: false, //データがNULLなら描画しない
        fill: false,
        showLine: gShowLineFlg,
      },
      //ADの最小値
      {
        label: "最小",
        data: data_min_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgba(50, 115, 220, 0.1)",
        borderColor: "#2753ea",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
      // ADの平均値
      {
        label: "平均",
        data: data_med_time,
        pointRadius: 1.5,
        pointHitRadius: 2.5,
        pointHoverRadius: 2,
        //ラインの設定
        backgroundColor: "rgb(204, 255, 153)",
        borderColor: "#00cc00",
        borderWidth: 2,
        spanGaps: false,
        fill: false,
        showLine: gShowLineFlg,
      },
    ];
  }
  // Scale decimals points
  var decpnt = ad_setting.Point;

  if (iperiodtime <= 6) {
    stime = "HH:mm";
  } else {
    stime = "MM/DD";
  }

  //グラフオブジェクト作成
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      //横軸のデータ
      datasets: tmpdatasets,
    },
    options: {
      //すぐに描画
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      // ラインのラベル表示しない
      legend: {
        display: false,
      },
      legendCallback: function (chart) {
        var text = [];
        text.push('<ul class="chart-legend" >');
        for (var i = 0; i < 3; i++) {
          text.push(
            '<li><input id="idlabel' +
            i +
            chart.id +
            '" type="checkbox" class= "checkbox' +
            i +
            '" checked="checked" style="border: 1px solid ' +
            chart.data.datasets[i].borderColor +
            "; background-color:" +
            chart.data.datasets[i].borderColor +
            '">'
          );
          if (chart.data.datasets[i].label) {
            text.push(chart.data.datasets[i].label);
          }
          text.push("</li>");
        }
        text.push("</ul>");
        return text.join("");
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
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 31,
              max: max,
              min: min,
            },

            scaleLabel: {
              display: true,
            },
            type: "time",
            time: {
              unit: "minute",
              displayFormats: {
                minute: stime,
              },
              stepSize: grpXAxisPeriod,
              tooltipFormat: "YYYY/MM/DD HH:mm:ss",
            },
            position: "bottom",
          },
        ],
        yAxes: [
          {
            //グラフ下限と上限
            ticks: {
              scaleBeginAtZero: false,
              min: ad_setting.Graph[0],
              max: ad_setting.Graph[1],

              callback: function (label, index, labels) {
                return label.toFixed(decpnt);
              },
            },
          },
        ],
      },
      //自動的にサイズ変更なし
      Responsive: true,
      maintainAspectRatio: false,
    },
  });

  return myChart;
}

/*  機能：  DI用のグラフを描画
          "chartjs.js"ライブラリを使用して、グラフを描画
  引数：
          ctx：       canvas 2d content オブジェクト
          data_x：    時間
          data_y：    計測値
          data_num：  データ数
          di_setting：DIの設定値
          ptimeidx:   時間幅
  戻り値： グラフオブジェクト
*/
function draw_graph_di(ctx, data_x, data_y, data_num, di_setting) {
  var grptype;
  var tmpdatashet;
  var data_y_time = [];
  var data_y_warnH = [];
  var min, max;
  var labeltime = [];
  var tmpxAxes;

  min = gGraphStartTime;
  max = gGraphEndTime;

  //  警報上限のデータを格納
  data_y_warnH[0] = { x: min, y: di_setting.Alarm[1] };
  data_y_warnH[1] = { x: max, y: di_setting.Alarm[1] };

  if (di_setting.GraphType == 0) {
    // 瞬時値を格納する
    for (i = 0; i < data_num; i++) {
      labeltime[i] =
        ("00" + moment(data_x[i]).hour().toString()).slice(-2) +
        ":" +
        ("00" + moment(data_x[i]).minute().toString()).slice(-2);
      data_y_time[i] = { x: data_x[i], y: data_y[i] };
    }

    if (iperiodtime <= 6) {
      stime = "HH:mm";
    } else {
      stime = "MM/DD";
    }

    grptype = "line";
    labeltime = null;
    if (di_setting.AlarmE[1] == 1) {
      tmpdatashet = [
        {
          data: data_y_time,
          //データポイントの設定
          pointRadius: 1.5,
          pointHitRadius: 3,
          pointHoverBorderWidth: 2,
          //ラインの設定
          lineTension: 0,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          //データがNULLなら表示しない
          spanGaps: false,
          //ラインの下に着色しない
          fill: false,
          showLine: gShowLineFlg,
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
          type: "line",
          fill: false,
        },
      ];
    } else {
      tmpdatashet = [
        {
          data: data_y_time,
          //データポイントの設定
          pointRadius: 1.5,
          pointHitRadius: 3,
          pointHoverBorderWidth: 2,
          //ラインの設定
          lineTension: 0,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          //データがNULLなら表示しない
          spanGaps: false,
          //ラインの下に着色しない
          fill: false,
          showLine: gShowLineFlg,
        },
      ];
    }

    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: stime,
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
        },
        position: "bottom",
      },
    ];
  } else {
    if (iperiodtime <= 6) {
      // 瞬時値を格納する
      for (i = 0; i < data_num; i++) {
        labeltime[i] =
          ("00" + moment(data_x[i]).hour().toString()).slice(-2) +
          ":" +
          ("00" + moment(data_x[i]).minute().toString()).slice(-2);
        data_y_time[i] = { x: data_x[i], y: data_y[i] };
      }
    } else {
      for (i = 0; i < data_num; i++) {
        labeltime[i] =
          ("00" + (moment(data_x[i]).month() + 1).toString()).slice(-2) +
          "/" +
          ("00" + moment(data_x[i]).date().toString()).slice(-2);
        data_y_time[i] = { x: data_x[i], y: data_y[i] };
      }
    }

    // Check sabun value before draw
    let dataLen = data_y_time.length;
    for (i = 0; i < dataLen; i++) {
      // Why did set sabun value = null!!
      if (data_y_time[i].y === null) {
        data_y_time[i].y = "0";
      } else if (Number(data_y_time[i].y) > di_setting.Graph[1] * 1.5) {
        data_y_time[i].y = (di_setting.Graph[1] * 1.5).toFixed(
          di_setting.Point
        );
      }
    }
    grptype = "bar";
    /*  警報上限値の有効にチェックが入っていても、警報上限値のラインもグラフに描画しない。 */
    tmpdatashet = [
      {
        labels: labeltime,
        data: data_y_time,
        //データポイントの設定
        pointRadius: 1.5,
        pointHitRadius: 3,
        pointHoverBorderWidth: 2,
        //ラインの設定
        lineTension: 0,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 2,
        //データがNULLなら表示しない
        spanGaps: false,
        //ラインの下に着色しない
        fill: false,
      },
    ];

    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
        },
      },
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
      datasets: tmpdatashet,
    },
    options: {
      //すぐに描画
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      //ラインのラベルを表示しない
      legend: {
        display: false,
      },
      // Tooltips decimals points format
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
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              max: di_setting.Graph[1],
              callback: function (label, index, labels) {
                return label.toFixed(decpnt);
              },
            },
          },
        ],
      },
      //自動的にサイズを変更機能を無効にする
      Responsive: true,
      maintainAspectRatio: false,
    },
  });

  return myChart;
}

/*  機能：  電波強度用のグラフを描画
          "chartjs.js"ライブラリを使用して、グラフを描画
  引数：
          ctx：       canvas 2d content オブジェクト
          data_x：    時間
          data_y：    計測値
          periodtimeidx: 時間幅
  戻り値： グラフオブジェクト
*/
function draw_graph_dbm(ctx, data_x, data_y) {
  var data_y_time = [];
  var min, max;

  min = gGraphStartTime;
  max = gGraphEndTime;

  for (i = 0; i < data_x.length; i++) {
    data_y_time[i] = { x: data_x[i], y: data_y[i] };
  }

  if (iperiodtime <= 6) {
    stime = "HH:mm";
  } else {
    stime = "MM/DD";
  }

  //グラフオブジェクトを作成
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      //labels: data_x,
      datasets: [
        {
          data: data_y_time,
          //データポイントの設定
          pointRadius: 1.5,
          pointHitRadius: 3,
          pointHoverBorderWidth: 2,
          //ラインの設定
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 3,
          //データがNULLなら表示しない
          spanGaps: false,
          //ラインの下に着色しない
          fill: false,
          showLine: gShowLineFlg,
        },
      ],
    },
    options: {
      //すぐに描画
      animation: {
        duration: 0,
      },
      hover: {
        animationDuration: 0,
      },
      //ラインのラベルを表示しない
      legend: {
        display: false,
      },
      //軸の設定
      scales: {
        xAxes: [
          {
            position: "top",
            ticks: {
              autoSkip: true,
              maxTicksLimit: 31,
              max: max,
              min: min,
            },
            scaleLabel: {
              display: true,
            },
            type: "time",
            time: {
              unit: "minute",
              displayFormats: {
                minute: stime,
              },
              stepSize: grpXAxisPeriod,
              tooltipFormat: "YYYY/MM/DD HH:mm:ss",
              //reversed:  false
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: -140,
              max: 0,
            },
          },
        ],
      },
      Responsive: true,
      maintainAspectRatio: false,
    },
  });

  return myChart;
}

/*
  JavaScript legend onClick callback
*/
function legendClickCallback(event, chart) {
  event = event || window.event;

  var target = event.target || event.srcElement;
  while (target.nodeName !== "LI") {
    target = target.parentElement;
  }
  var parent = target.parentElement;
  // var chartId = parseInt(parent.classList[0].split("-")[0], 10);
  // var chart = chart_histogram_ad1;
  var index = Array.prototype.slice.call(parent.children).indexOf(target);

  chart.legend.options.onClick.call(
    chart,
    event,
    chart.legend.legendItems[index]
  );
  var id = "idlabel" + index + chart.id;
  if (chart.isDatasetVisible(index)) {
    target.classList.remove("hidden");
    document.getElementById(id).checked = true;
    document.getElementById(id).style.backgroundColor =
      chart.data.datasets[index].borderColor;
  } else {
    target.classList.add("hidden");
    document.getElementById(id).checked = false;
    document.getElementById(id).style.backgroundColor =
      chart.data.datasets[index].backgroundColor;
  }
}

/*  機能：  ADのグラフを更新
  引数：
          myChart：   グラフオブジェクト
          data_x：    横軸のデータ        時間
          data_y：    縦軸のデータ
          data_num：  データ数
          ad_setting：設定値
*/
function graph_ad_update(myChart, data_x, data_y, data_num, ad_setting) {
  var data_y_time = [];
  var data_y_warnH = [];
  var data_y_warnL = [];
  var min, max;
  min = gGraphStartTime;
  max = gGraphEndTime;

  for (i = 0; i < data_num; i++) {
    data_y_time[i] = { x: data_x[i], y: data_y[i] };
  }

  //警報上下限値を格納
  data_y_warnH[0] = { x: min, y: ad_setting.Alarm[1] };
  data_y_warnH[1] = { x: max, y: ad_setting.Alarm[1] };
  data_y_warnL[0] = { x: min, y: ad_setting.Alarm[0] };
  data_y_warnL[1] = { x: max, y: ad_setting.Alarm[0] };

  //計測値
  myChart.data.datasets[0].data = data_y_time;
  myChart.data.datasets[0].showLine = gShowLineFlg;

  if (ad_setting.AlarmE[1] == 1 && ad_setting.AlarmE[0] == 1) {
    //警報上限値
    myChart.data.datasets[1].data = data_y_warnH;
    //下限警報発生値
    myChart.data.datasets[2].data = data_y_warnL;
  } else if (ad_setting.AlarmE[1] == 1 && ad_setting.AlarmE[0] == 0) {
    //警報上限値
    myChart.data.datasets[1].data = data_y_warnH;
  } else if (ad_setting.AlarmE[1] == 0 && ad_setting.AlarmE[0] == 1) {
    //下限警報発生値
    myChart.data.datasets[1].data = data_y_warnL;
  } else {
  }

  //グラフ下限
  myChart.options.scales.yAxes[0].ticks.min = ad_setting.Graph[0];
  //グラフ上限
  myChart.options.scales.yAxes[0].ticks.max = ad_setting.Graph[1];
  //時軸
  if (iperiodtime <= 6) {
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "HH:mm",
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "bottom",
      },
    ];
  } else {
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "MM/DD",
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "bottom",
      },
    ];
  }
  myChart.options.scales.xAxes = tmpxAxes;

  //グラフ更新
  myChart.update();
}

/*  機能：  ADのグラフを更新
  引数：
          myChart：   グラフオブジェクト
          data_x：    横軸のデータ        時間
          data_y：    縦軸のデータ
          data_num：  データ数
          ad_setting：設定値
*/
function histogram_ad_update(
  myChart,
  data_x,
  data_max,
  data_min,
  data_med,
  data_num,
  ad_setting
) {
  var data_max_time = [];
  var data_min_time = [];
  var data_med_time = [];
  var data_y_warnH = [];
  var data_y_warnL = [];
  var min, max;
  min = gGraphStartTime;
  max = gGraphEndTime;

  // 最大、最小、平均を格納
  for (i = 0; i < data_num; i++) {
    data_max_time[i] = { x: data_x[i], y: data_max[i] };
    data_min_time[i] = { x: data_x[i], y: data_min[i] };
    data_med_time[i] = { x: data_x[i], y: data_med[i] };
  }

  // 警報上下限を格納
  data_y_warnH[0] = { x: min, y: ad_setting.Alarm[1] };
  data_y_warnH[1] = { x: max, y: ad_setting.Alarm[1] };
  data_y_warnL[0] = { x: min, y: ad_setting.Alarm[0] };
  data_y_warnL[1] = { x: max, y: ad_setting.Alarm[0] };

  //計測値
  myChart.data.datasets[0].data = data_max_time;
  myChart.data.datasets[1].data = data_min_time;
  myChart.data.datasets[2].data = data_med_time;
  myChart.data.datasets[0].showLine = gShowLineFlg;
  myChart.data.datasets[1].showLine = gShowLineFlg;
  myChart.data.datasets[2].showLine = gShowLineFlg;

  if (ad_setting.AlarmMinMaxE[1] == 1 && ad_setting.AlarmMinMaxE[0] == 1) {
    //警報上限値
    myChart.data.datasets[3].data = data_y_warnH;
    //下限警報発生値
    myChart.data.datasets[4].data = data_y_warnL;
  } else if (
    ad_setting.AlarmMinMaxE[1] == 1 &&
    ad_setting.AlarmMinMaxE[0] == 0
  ) {
    //警報上限値
    myChart.data.datasets[3].data = data_y_warnH;
  } else if (
    ad_setting.AlarmMinMaxE[1] == 0 &&
    ad_setting.AlarmMinMaxE[0] == 1
  ) {
    //下限警報発生値
    myChart.data.datasets[3].data = data_y_warnL;
  } else {
  }

  //グラフ下限
  myChart.options.scales.yAxes[0].ticks.min = ad_setting.Graph[0];
  //グラフ上限
  myChart.options.scales.yAxes[0].ticks.max = ad_setting.Graph[1];
  //時軸
  if (iperiodtime <= 6) {
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "HH:mm",
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "bottom",
      },
    ];
  } else {
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "MM/DD",
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "bottom",
      },
    ];
  }
  myChart.options.scales.xAxes = tmpxAxes;

  //グラフ更新
  myChart.update();
}

/*  機能：  DIのグラフを更新
  引数：
          myChart：   グラフオブジェクト
          data_x：    横軸のデータ        時間
          data_y：    縦軸のデータ
          data_num：  データ数
          di_setting：設定値
*/
function graph_di_update(myChart, data_x, data_y, data_num, di_setting) {
  var data_y_time = [];
  var data_y_warnH = [];
  var labeltime = [];
  var min, max;

  min = gGraphStartTime;
  max = gGraphEndTime;

  if (di_setting.GraphType == 0) {
    for (i = 0; i < data_num; i++) {
      labeltime[i] =
        ("00" + moment(data_x[i]).hour().toString()).slice(-2) +
        ":" +
        ("00" + moment(data_x[i]).minute().toString()).slice(-2);
      data_y_time[i] = { x: data_x[i], y: data_y[i] };
    }

    if (iperiodtime <= 6) {
      stime = "HH:mm";
    } else {
      stime = "MM/DD";
    }

    data_y_warnH[0] = { x: moment(min), y: di_setting.Alarm[1] };
    data_y_warnH[1] = { x: moment(max), y: di_setting.Alarm[1] };

    //縦軸のデータ          カウンター値
    myChart.data.datasets[0].data = data_y_time;
    myChart.data.datasets[0].showLine = gShowLineFlg;

    //警報上限値
    if (di_setting.AlarmE[1] == 1) {
      myChart.data.datasets[1].data = data_y_warnH;
    }

    //グラフ上限
    myChart.options.scales.yAxes[0].ticks.max = di_setting.Graph[1];

    //時軸
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: stime,
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "bottom",
      },
    ];

    myChart.options.scales.xAxes = tmpxAxes;

    //グラフを更新
    myChart.update();
  } else {
    if (iperiodtime <= 6) {
      // 瞬時値を格納する
      for (i = 0; i < data_num; i++) {
        labeltime[i] =
          ("00" + moment(data_x[i]).hour().toString()).slice(-2) +
          ":" +
          ("00" + moment(data_x[i]).minute().toString()).slice(-2);
        data_y_time[i] = { x: data_x[i], y: data_y[i] };
      }
    } else {
      for (i = 0; i < data_num; i++) {
        labeltime[i] =
          ("00" + (moment(data_x[i]).month() + 1).toString()).slice(-2) +
          "/" +
          ("00" + moment(data_x[i]).date().toString()).slice(-2);
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
      } else if (Number(data_y_time[i].y) > di_setting.Graph[1] * 1.5) {
        data_y_time[i].y = (di_setting.Graph[1] * 1.5).toFixed(
          di_setting.Point
        );
      }
    }
    myChart.data.datasets[0].data = data_y_time;

    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
        },
      },
    ];

    //グラフ上限
    myChart.options.scales.xAxes = tmpxAxes;

    //グラフを更新
    myChart.update();
  }
}

/*  機能：  電波強度のグラフを更新
  引数：
          myChart：   グラフオブジェクト
          data_x：    横軸のデータ        時間
          data_y：    縦軸のデータ
          ptimeidx:   時間幅
*/
function graph_dbm_update(myChart, data_x, data_y) {
  var data_y_time = [];
  var min, max;

  min = gGraphStartTime;
  max = gGraphEndTime;

  for (i = 0; i < data_x.length; i++) {
    data_y_time[i] = { x: data_x[i], y: data_y[i] };
  }

  //縦軸のデータ
  myChart.data.datasets[0].data = data_y_time;
  myChart.data.datasets[0].showLine = gShowLineFlg;

  //時軸
  if (iperiodtime <= 6) {
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "HH:mm",
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "top",
      },
    ];
  } else {
    tmpxAxes = [
      {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 31,
          max: max,
          min: min,
        },

        scaleLabel: {
          display: true,
        },
        type: "time",
        time: {
          unit: "minute",
          displayFormats: {
            minute: "MM/DD",
          },
          stepSize: grpXAxisPeriod,
          tooltipFormat: "YYYY/MM/DD HH:mm:ss",
          //reversed:  false
        },
        position: "top",
      },
    ];
  }
  myChart.options.scales.xAxes = tmpxAxes;

  //グラフを更新
  myChart.update();
}

/**
 * 画面遷移を処理
 */
function fncDoGraphTransition(startTime, endTime, currentTime, i, setdata) {
  var id = "dropdownbtn" + i;
  var idmin = "dropdownminutebtn" + i;
  var tempST = startTime.toDate();
  var tempET = moment(endTime, "YYYY-MM-DD HH:mm").toDate();

  //current time is between start and end
  if (
    currentTime.getTime() >= tempST.getTime() &&
    currentTime.getTime() <= tempET.getTime()
  ) {
    // グラフが右端まで描画後 -> 画面上部の開始時間を更新
    if (currentTime.getTime() >= tempET.getTime()) {
      // 時間幅 = 10分
      if (iperiodtime == 0) {
        var iRet = fncMinusChange(idmin, i, 1);
        if (iRet !== 0) {
          itime_change(id, itime + iRet);
        }
      }
      // 時間幅 = 1時間
      else if (iperiodtime == 1) {
        var step = 3;
        var iRet = fncMinusChange(idmin, i, step);
        if (iRet !== 0) {
          itime_change(id, itime + iRet);
        }
      } else if (iperiodtime >= 2 && iperiodtime <= 6) {
        itime_change(id, itime + iperiodtimevalue[iperiodtime] / 2);
      }
      // その他
      else {
        automonth_change(id, 1);
      }
    }
  }
}

function automonth_change(idtimer, num) {
  var timer = ListTimeID.indexOf(idtimer);
  var date = document.getElementById("idGrpTimeInterval" + timer).value;
  var datetime = new Date(date);

  // 「＜」・「＞」ボタンで時間を変更する場合、時間と日付を調整する
  if (num < 0) {
    datetime.setDate(datetime.getDate() - 15);
  }

  if (num > 0) {
    datetime.setDate(datetime.getDate() + 15);
  }

  // グラフ表示の日付、時を更新する
  var day = ("00" + datetime.getDate()).slice(-2);
  var month = ("00" + (datetime.getMonth() + 1).toString()).slice(-2);
  var year = ("0000" + datetime.getFullYear()).slice(-4);
  var datval = year + "/" + month + "/" + day;

  for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {
    // 年月日
    $("#idGrpTimeInterval" + iCnt).val(datval);
  }

  // data refresh
  if (objTreeView !== null) {
    fncDataReload();
  }
}

// Check Career sensor Time
Number.prototype.isInteger = function () {
  return (this ^ 0) === +this;
};

// *******************************************************************************************
// *                               ストレージ容量削除の対応                                    *
// *******************************************************************************************

/**
 *   ストレージ容量削除の設定値を更新。
 */
function fncGetAutoStorageClearSetting() {
  //GET電文を作成
  var strGetQuery = STORAGECLEAR_QUERY;
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    // $.getJSON(strGetQuery, function (obj) {
    //     if (obj.Status == 200) {
    //         gAutoClearStorage = obj.Respons.AutoCleanup;
    //     }
    // });
    http.get(
      strGetQuery,
      function (obj) {
        //正常
        if (obj.Status == 200) {
          gAutoClearStorage = obj.Respons.AutoCleanup;
        }
      },
      function (error) {
        /* エラー状態チェック */
        console.log("systime_get_data: " + error);
      }
    );
  }
  // DEBUG
  else {
  }
}

/**
 * ストレージ容量が逼迫かどうか確認する関数
 */
function fncCheckStorageState(fncCallBack) {
  // 自動削除機能がOFFの時だけチェックする
  if (gAutoClearStorage) return;

  var obj;
  var strGetQuery = CHECK_STORAGE_QUERY;

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    // console.log(strGetQuery);
    // $.getJSON(strGetQuery, function (obj) {
    //     fncCallBack(obj);
    // });
    // Disable check StorageState
    // http.get(
    //   strGetQuery,
    //   function (obj) {
    //     //正常
    //     fncCallBack(obj);
    //   },
    //   function (error) {
    //     /* エラー状態チェック */
    //     console.log("fncCheckStorageState: " + error);
    //   }
    // );
  } else {
  }

  return obj;
}

/**
 * ストレージ容量が逼迫かどうか確認する関数
 */
function fncGetStorageCallback(obj) {
  if (obj.Status == 200) {
    // ストレージは容量が逼迫場合
    if (obj.Respons.StorageFull) {
      if (!document.hasFocus()) {
        console.log("no focus");
      } else {
        // チェックのループを停止
        clearInterval(checkStorageLoop);
      }

      // OKボータンを押す
      var confirm = window.confirm(
        "ストレージ容量が逼迫しました。ログデータを削除してください"
      );
      if (confirm == true) {
        document.location.href = "./ethernet.html";
      } else {
        // キャンセルボタンを押す
      }
    }
  }
}

// *******************************************************************************************
// *                               ETHERNETの対応                                    *
// *******************************************************************************************

/**
 *   データロギングを取得
 */
function datalogging_get_data(fncNwCallback) {
  var obj;
  //GET電文を作成
  var strGetQuery = NETWORK_GETDATALOGGING_QUERY + getIotGatewayIdParam();

  if (getIotGatewayId() < 0) {
    return;
  }
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    // $.getJSON(strGetQuery, function (obj) {
    //     fncNwCallback(obj);
    // });
    http.get(
      strGetQuery,
      function (obj) {
        //正常
        fncNwCallback(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("datalogging_get_data: " + error);
      }
    );
  }
  // DEBUG
  else {
    obj = {
      Status: 200,
      Respons: {
        Index: 0,
      },
    };
  }
  return obj;
}

// *******************************************************************************************
// *                               一般ユーザーの対応                                            *
// *******************************************************************************************

/**
 * 接点入出力ボードがGWに付いているかどうかチェック
 */
function fncUpdateMenuByUser() {
  var strQuery = apigateway + "path=id"; // "http://" + localhost + "/id";
  // Get User
  // $.getJSON(strQuery, function (obj) {
  //     if (obj.Status == 200) {
  //         if (obj.Respons.currentUser == obj.Respons.general) {
  //             // バージョン画面の初期化と再起動ボタンを無効にする
  //             if ((document.getElementById("reset_btn") != null) && (document.getElementById("restart_btn") != null)) {
  //                 $("#reset_btn").prop("disabled", true);
  //                 $("#restart_btn").prop("disabled", true);
  //             }
  //             $("#idsettingmenu").prop("disabled", true);
  //         }
  //         else {
  //             // バージョン画面の初期化と再起動ボタンを有効にする
  //             if ((document.getElementById("reset_btn") != null) && (document.getElementById("restart_btn") != null)) {
  //                 $("#reset_btn").prop("disabled", false);
  //                 $("#restart_btn").prop("disabled", false);
  //             }
  //             // メニューバーの設定が押せないようにする
  //             $("#idsettingmenu").prop("disabled", false);
  //         }
  //     }
  // });
  http.get(
    strQuery,
    function (obj) {
      //正常
      if (obj.Status == 200) {
        if ("user" == obj.Respons.general) {
          // バージョン画面の初期化と再起動ボタンを無効にする
          if (
            document.getElementById("reset_btn") != null &&
            document.getElementById("restart_btn") != null
          ) {
            $("#reset_btn").prop("disabled", true);
            $("#restart_btn").prop("disabled", true);
          }
          // $("#idsettingmenu").prop("disabled", true);
        } else {
          // バージョン画面の初期化と再起動ボタンを有効にする
          if (
            document.getElementById("reset_btn") != null &&
            document.getElementById("restart_btn") != null
          ) {
            $("#reset_btn").prop("disabled", false);
            $("#restart_btn").prop("disabled", false);
          }
          // メニューバーの設定が押せないようにする
          // $("#idsettingmenu").prop("disabled", false);
        }
        if (document.getElementById("idloginnamedisplay"))
          document.getElementById("idloginnamedisplay").innerHTML = "[" + obj.Respons.currentUser + "]";
        // document.getElementById("idloginnamedisplay").innerHTML = "<a href='./admin/profile.html' class='text-light nav-link'>[" + obj.Respons.currentUser + "]</a>";
      }
    },
    function (error) {
      /* エラー状態チェック */
      console.log("fncUpdateMenuByUser: " + error);
    }
  );

  fncIsDIOBoardOn(function (obj) {
    if (obj.Status == 200) {
      // ボード有り
      if (obj.Respons.DioBoardE == 1) {
        gDIOBoardStatus = true;
        // 警報状態を取得
        fncGetAlarmStatus();
      }
      // ボード無しー＞警報状態＋ブザーは表示しない。
      else {
        $(idAlarmDisp).addClass("d-none");
        $(idBuzzerDisp).removeClass("d-flex");
        $(idBuzzerDisp).addClass("d-none");
        gDIOBoardStatus = false;
      }
    } else {
      console.log("fncUpdateDIOBoardStatus: " + obj.Status);
    }
  });
}

// *******************************************************************************************
// *                               一般ユーザーの対応                                          *
// *******************************************************************************************
/*  機能： 任意選択CSVの設定を取得する
      fncCallback: 表示するようにCallback関数
*/
function fncLoadCSVPatternList(GroupId, fncCallback) {
  // var obj;
  const strQuery = CSVLIST_QUERY + '&GroupId=' + GroupId + getIotGatewayIdParam();

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strQuery);
    // return $.getJSON(strQuery, function (obj) {
    //     fncCallback(obj);
    // });
    return http.get(
      strQuery,
      function (obj) {
        fncCallback(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("fncLoadCSVPatternList: " + error);
      }
    );
  } else {
    const obj = {
      Status: 200,
      Respons: [
        {
          Enable: 0,
          PatternName: "\u51fa\u529b1",
          Id: 1,
          UnitList: [
            {
              UnitTitleCode: "484c522d41344334202020202020202020202020",
              UnitNo: 1,
              UnitTypeCode: 1,
              UnitAdr: ["01", "00"],
              ChannelList: [
                {
                  ChannelId: "rssi",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "\u96fb\u6ce2\u5f37\u5ea6",
                },
                {
                  ChannelId: "di1_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI1.State",
                },
                {
                  ChannelId: "di1_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI1.Count",
                },
                {
                  ChannelId: "di2_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI2.State",
                },
                {
                  ChannelId: "di2_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI2.Count",
                },
                {
                  ChannelId: "di3_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI3.State",
                },
                {
                  ChannelId: "di3_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI3.Count",
                },
                {
                  ChannelId: "di4_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI4.State",
                },
                {
                  ChannelId: "di4_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI4.Count",
                },
              ],
            },
          ],
        },
      ],
    };
    fncCallback(obj);
    return obj;
  }
}

/*  機能： 係数演算の設定を取得する
        fncCallback: 表示するようにCallback関数
*/
function fncLoadCalcPatternList(fncCallback) {
  const strQuery = CALCCSVLISTGROUP_QUERY + getIotGatewayIdParam();

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
      console.log(strQuery);
      return http.get(
        strQuery,
        function (obj) {
          fncCallback(obj);
        },
        function (error) {
          /* エラー状態チェック */
          console.log("fncLoadCalcPatternList: " + error);
        }
      );
  }
}


/*  機能： 任意選択CSVの設定を取得する
      fncCallback: 表示するようにCallback関数
*/
function fncLoadCSVPatternSettingData(GroupId, fncCallback) {
  // var obj;
  // path=logging_set&0000_BuncheDataSet&GroupId=1
  const strQuery = CSVLIST_QUERY + '&GroupId=' + GroupId + getIotGatewayIdParam();

  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strQuery);
    return http.get(
      strQuery,
      function (obj) {
        fncCallback(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("fncLoadCSVPatternSettingData: " + error);
      }
    );
  } else {
    const obj = {
      Status: 200,
      Respons: [
        {
          Enable: 0,
          PatternName: "\u51fa\u529b1",
          Id: 1,
          UnitList: [
            {
              UnitTitleCode: "484c522d41344334202020202020202020202020",
              UnitNo: 1,
              UnitTypeCode: 1,
              UnitAdr: ["01", "00"],
              ChannelList: [
                {
                  ChannelId: "rssi",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "\u96fb\u6ce2\u5f37\u5ea6",
                },
                {
                  ChannelId: "di1_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI1.State",
                },
                {
                  ChannelId: "di1_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI1.Count",
                },
                {
                  ChannelId: "di2_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI2.State",
                },
                {
                  ChannelId: "di2_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI2.Count",
                },
                {
                  ChannelId: "di3_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI3.State",
                },
                {
                  ChannelId: "di3_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI3.Count",
                },
                {
                  ChannelId: "di4_state",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI4.State",
                },
                {
                  ChannelId: "di4_counter_scale",
                  Order: null,
                  Enable: 0,
                  ChannelTitle: "DI4.Count",
                },
              ],
            },
          ],
        },
      ],
    };
    fncCallback(obj);
    return obj;
  }
}

function update_alarm(fncCallback) {
  //GET電文を作成
  var strGetQuery = apigateway + "path=alert";
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    // $.getJSON(strGetQuery, function (obj) {
    //     fncTmCallback(obj);
    // });
    http.get(
      strGetQuery,
      function (obj) {
        //正常
        // console.log(obj);
        fncCallback(obj);
      },
      function (error) {
        /* エラー状態チェック */
        console.log("update_alarm: " + error);
      }
    );
  }
}

/**
 * 登録したユニットの状態を取得する
 */
function get_data_icon(gwid, fncCallback) {
  var obj;
  let strGetQuery = GROUP_QUERY + '&Info=Status';
  // strGetQuery += getIotGatewayIdParam();
  strGetQuery += "&IotGatewayId=" + gwid
  //サーバーから設定値の要求を送信、受信データをJSON型に変換
  if (DEBUG_FEEDBACK !== true) {
    console.log(strGetQuery);
    // $.getJSON(strGetQuery, function (obj) {
    //     fncCallback(obj);
    // });
    http.get(strGetQuery, function (obj) {
      //正常
      fncCallback(obj, gwid);
    }, function (error) {
      /* エラー状態チェック */
      console.log('get_data_icon: ' + error);
    });
  }
  else {
    obj = {
      "Status": 200,
      "Respons": {
        "GroupList":
          [
            {
              "GroupNo": 1,
              "LoRaUnitList": [{
                "UnitNo": 1,
                "Val": "0000",
                "ModbusUnitList":
                  [
                    {
                      "UnitNo": 2,
                      "Val": "0000",
                    }
                  ]
              },
              ]
            },
            {
              "GroupNo": 4,
              "LoRaUnitList": [
                {
                  "UnitNo": 3,
                  "Val": "0000",
                  "ModbusUnitList": [
                    {
                      "UnitNo": 5,
                      "Val": "0000",
                    }
                  ]
                }
              ]
            },
          ]
      }
    };
    fncCallBack(obj);
    return obj;
  }

  return obj;
}

/**
 * イアコル状態表示
 * obj:　状態のJSONオブジェクト
 */
function fncDispStatusNodeTreeView(obj) {
  if (obj.Status == 200) {
    for (var i in obj.Respons.GroupList) {
      var num_err = 0;
      for (var j in obj.Respons.GroupList[i].LoRaUnitList) {
        termid = "idiconunit" + i + j;
        if (obj.Respons.GroupList[i].LoRaUnitList[j].Status == "0000") {
          if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-check.svg";
        }
        else if (obj.Respons.GroupList[i].LoRaUnitList[j].Status == "0001") {
          if (document.getElementById(termid)) document.getElementById(termid).src = "/img/warning.svg";
          num_err++;
        }
        else if (obj.Respons.GroupList[i].LoRaUnitList[j].Status == "1000") {
          if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-x.svg";
          num_err++;
        }
        // 状態がNull
        else {
          if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-x.svg";
          num_err++;
        }
        for (var k in obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList) {
          termid = "idiconrs" + i + j + k;
          if (obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status == "0000") {
            if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-check.svg";
          }
          else if (obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status == "0001") {
            if (document.getElementById(termid)) document.getElementById(termid).src = "/img/warning.svg";
            num_err++;
          }
          else if (obj.Respons.GroupList[i].LoRaUnitList[j].ModbusUnitList[k].Status == "1000") {
            if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-x.svg";
            num_err++;
          }
          // 状態がNull
          else {
            if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-x.svg";
            num_err++;
          }
        }
      }
      termid = "idicongrp" + i;
      if (document.getElementById(termid)) document.getElementById(termid).innerHTML = num_err;
      if (num_err == 0) {
        if (document.getElementById(termid)) document.getElementById(termid).classList.remove("badge-danger");
        if (document.getElementById(termid)) document.getElementById(termid).classList.add("badge-success");
      } else {
        if (document.getElementById(termid)) document.getElementById(termid).classList.remove("badge-success");
        if (document.getElementById(termid)) document.getElementById(termid).classList.add("badge-danger");
      }
    }
  }
}

/**
 * アイコン状態表示
 * gwId:　IoTゲートウェイID
 * Status: 正常[0000] 警報[0001] エラー[1000]
 */
function fncDispStatusGatewayNodeTreeView(gwId, Status) {
  termid = "idiconiotgateway0" + gwId;
  // OK
  if (Status == "0000") {
    if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-check.svg";
  }
  // 警報あり
  else if (Status == "0001") {
    if (document.getElementById(termid)) document.getElementById(termid).src = "/img/warning.svg";
  }
  // 通信異常
  else if (Status == "1000") {
    if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-x.svg";
  }
  // 状態なし
  else {
    if (document.getElementById(termid)) document.getElementById(termid).src = "/img/circle-x.svg";
  }
}

function parseValue(value, defaultValue = "") {
  if (value !== null && value !== undefined && value !== "") {
    return value;
  }
  return defaultValue;
}


function fncPickupMenuClick(idPickupNo,locationFixFlag) {
  if (gintIotGatewayId < 0) {
    document.getElementById("mainPickupShow").style.display = "block";
    document.getElementById("mainAlarmShow").style.display = "none";
    document.getElementById("idgraphcontent").style.display = "none";
    document.getElementById("idcompanycontent").style.display = "none";
    document.getElementById("garphlist_content").style.display = "none";
    document.getElementById("CSVmain").style.display = "none";

    if (idPickupNo === lstidPickupNo) {
      const eleCurrentGatewayMenu = document.getElementById(idPickupNo);
      if (eleCurrentGatewayMenu) {
        eleCurrentGatewayMenu.classList.add("active");
      }
    } else {
      const eleCurrentGatewayMenu = document.getElementById(idPickupNo);
      if (eleCurrentGatewayMenu) {
        eleCurrentGatewayMenu.classList.add("active");
      }

      const eleCurrentGateway = document.getElementById(lstidPickupNo);
      if (eleCurrentGateway) {
        eleCurrentGateway.classList.remove("active");
      }
      
      lstidPickupNo = idPickupNo;
    }

    // GRID
    if (gintIotGatewayId < 0) {
      initPickupBoard(locationFixFlag);
    }
  }
}


/**
* 「＞」ボタンで開始時間を変更する
   i：時間コントロールのインデックス
*/
function onClkGrpIntPlus(i) {
  var id = "dropdownbtn" + i;
  var idmin = "dropdownminutebtn" + i;

  // 時間幅＝１０分
  if (iperiodtime == 0) {
    var iRet = fncMinusChange(idmin, i, 1);
    if (iRet !== 0) {
      itime_change(id, itime + iRet);
    }
  }
  //時間幅=1時間～24時間
  else if (iperiodtime <= 6) {
    itime_change(id, itime + iperiodtimevalue[iperiodtime]);
  }
  //時間幅＝1か月
  else {
    month_change(id, 1)
  }
}

/**
* 「＜」ボタンで開始時間を変更する
  i：時間コントロールのインデックス
*/
function onClkGrpIntMinus(i) {
  var id = "dropdownbtn" + i;
  var idmin = "dropdownminutebtn" + i;

  // 時間幅＝１０分
  if (iperiodtime == 0) {
    var iRet = fncMinusChange(idmin, i, -1);
    if (iRet !== 0) {
      itime_change(id, itime + iRet);
    }
  }
  //時間幅=1時間～24時間
  else if (iperiodtime <= 6) {
    itime_change(id, itime - iperiodtimevalue[iperiodtime]);
  }
  //時間幅＝1か月
  else {
    month_change(id, -1)
  }
}

/**
* 開始分
*/
function fncMinusChange(id, idx, step) {
  var nowidx = iminuteidx + step;
  var iRet = 0;

  if (nowidx < 0) {
    iminuteidx = iminuteval.length + nowidx;
    iRet = -1;
  }
  else if (nowidx >= iminuteval.length) {
    iminuteidx = nowidx - iminuteval.length;
    iRet = 1;
  }
  else {
    iminuteidx = nowidx;
  }

  for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {

    document.getElementById("dropdownminutebtn" + iCnt.toString()).innerHTML = ("0" + iminuteval[iminuteidx].toString()).slice(-2) + "分";
  }

  return iRet;
}

/**
* 開始時間
*/
function itime_change(idtimer, num) {
  var newhour = num;
  var timer = ListTimeID.indexOf(idtimer);
  var date = document.getElementById("idGrpTimeInterval" + timer).value;
  var datetime = new Date(date);

  // 「＜」・「＞」ボタンで時間を変更する場合、時間と日付を調整する
  if (num < 0) {
    newhour = dropdowntime[dropdowntime.length - 1] + num + 1;
    datetime.setDate(datetime.getDate() - 1);
  }

  if (num > dropdowntime[dropdowntime.length - 1]) {
    newhour = num - (dropdowntime[dropdowntime.length - 1] + 1);
    datetime.setDate(datetime.getDate() + 1);
  }

  // グラフ表示の日付、時を更新する
  var day = ('00' + datetime.getDate()).slice(-2);
  var month = ('00' + (datetime.getMonth() + 1).toString()).slice(-2);
  var year = ('0000' + datetime.getFullYear()).slice(-4);
  var datval = year + '/' + month + '/' + day;

  for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {

    // 時
    itime = newhour;
    if (document.getElementById("dropdownbtn" + iCnt.toString())) {
      document.getElementById("dropdownbtn" + iCnt.toString()).innerHTML = ("0" + itime.toString()).slice(-2) + "時";
    }
    // 年月日
    $('#idGrpTimeInterval' + iCnt).val(datval);
  }




  // data refresh
  if (objTreeView !== null) {
    fncDataReload();
  }
}

function month_change(idtimer, num) {
  var newmonth = num;
  var timer = ListTimeID.indexOf(idtimer);
  var date = document.getElementById("idGrpTimeInterval" + timer).value;
  var datetime = new Date(date);

  // 「＜」・「＞」ボタンで時間を変更する場合、時間と日付を調整する
  if (num < 0) {
    datetime.setDate(datetime.getDate() - 31);
  }

  if (num > 0) {
    datetime.setDate(datetime.getDate() + 31);
  }

  // グラフ表示の日付、時を更新する
  var day = ('00' + datetime.getDate()).slice(-2);
  var month = ('00' + (datetime.getMonth() + 1).toString()).slice(-2);
  var year = ('0000' + datetime.getFullYear()).slice(-4);
  var datval = year + '/' + month + '/' + day;

  for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {
    // 年月日
    $('#idGrpTimeInterval' + iCnt).val(datval);
  }

  // data refresh
  if (objTreeView !== null) {
    fncDataReload();
  }
}


/**
* 時間幅を変更すると、すべてのユニットの時間幅を更新する
*/
function iperiodtime_change(content, num) {
  iperiodtime = num;
  for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {
    if (document.getElementById("dropdownwith" + iCnt.toString())) {
      document.getElementById("dropdownwith" + iCnt.toString()).innerHTML = content;
    }
  }

  clearInterval(gGetGraphInTerval);
  clearInterval(gGetInstanceInTerval);
  if (iperiodtime <= 1) {
    //5s毎にグラフ更新
    gGetGraphInTerval = setInterval(function () {
      get_graph_dat();
    }, FETCH_INTERVAL.GRAPH);

    gGetInstanceInTerval = setInterval(function () {
      get_instance_dat();
    }, FETCH_INTERVAL.INSTANCE);
  } else if (iperiodtime <= 5) {
    //30s毎にグラフ更新
    gGetGraphInTerval = setInterval(function () {
      get_graph_dat();
    }, 30000);
    gGetInstanceInTerval = setInterval(function () {
      get_instance_dat();
    }, FETCH_INTERVAL.INSTANCE);
  } else {
    //60s毎にグラフ更新
    gGetGraphInTerval = setInterval(function () {
      get_graph_dat();
    }, 60000);
    // 15s ➡ 30s
    let kInstanceInterval = 15000;
    if (kInstanceInterval < FETCH_INTERVAL.INSTANCE) {
      kInstanceInterval = FETCH_INTERVAL.INSTANCE;
    }
    gGetInstanceInTerval = setInterval(function () {
      get_instance_dat();
    }, kInstanceInterval);
  }

  // data refresh
  if (objTreeView !== null) {
    fncDataReload();
  }
}

/**
* 日付を変更すると、すべてのユニットの日付を更新する
*/
function fncUpdateGraphDay(content) {
  for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {
    $('#idGrpTimeInterval' + iCnt).val(content);
  }

  // data refresh
  if (objTreeView !== null) {
    fncDataReload();
  }
}

var dropdownclick = document.getElementsByClassName("dropdown-item");
for (var i = 0; i < dropdownclick.length; i++) {
  dropdownclick[i].addEventListener("click", function (e) {
    var name = e.target.name;
    var content = e.target.innerHTML;
    var btnobj = name.split("-");
    var ii = parseInt(btnobj[1]);
    var id = btnobj[0];
    var idx = ii;
    var idindex;

    /* 開始時間 */
    idindex = ListTimeID.indexOf(id);
    if (idindex >= 0) {
      itime_change(id, ii, content);
    }

    /* 時間幅 */
    idindex = ListPeriodID.indexOf(id);
    if (idindex >= 0) {
      iperiodtime_change(content, idx);
    }

    /* 開始分 */
    idindex = ListMinuteID.indexOf(id);
    if (idindex >= 0) {
      iminuteidx = idx;
      for (var iCnt = 0; iCnt <= gbtnID; iCnt++) {
        if (document.getElementById("dropdownminutebtn" + iCnt.toString())) {
          document.getElementById("dropdownminutebtn" + iCnt.toString()).innerHTML = content;
        }
      }
      // data refresh
      if (objTreeView !== null) {
        fncDataReload();
      }
    }

    document.getElementById(id).innerHTML = content;
  })
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
*　グラフバーリセット
*/

const ListMinuteID = ["dropdownminutebtn0", "dropdownminutebtn1", "dropdownminutebtn2", "dropdownminutebtn3", "dropdownminutebtn4",
    "dropdownminutebtn5", "dropdownminutebtn6", "dropdownminutebtn7", "dropdownminutebtn8", "dropdownminutebtn9", "dropdownminutebtn10",
    "dropdownminutebtn11", "dropdownminutebtn12", "dropdownminutebtn13", "dropdownminutebtn14", "dropdownminutebtn15", "dropdownminutebtn16",
    "dropdownminutebtn17", "dropdownminutebtn18", "dropdownminutebtn19", "dropdownminutebtn20", "dropdownminutebtn21", "dropdownminutebtn22",
    "dropdownminutebtn23", "dropdownminutebtn24", "dropdownminutebtn25", "dropdownminutebtn26", "dropdownminutebtn27", "dropdownminutebtn28",
    "dropdownminutebtn29", "dropdownminutebtn30"];

const ListTimeID = ["dropdownbtn0", "dropdownbtn1", "dropdownbtn2", "dropdownbtn3", "dropdownbtn4",
    "dropdownbtn5", "dropdownbtn6", "dropdownbtn7", "dropdownbtn8", "dropdownbtn9", "dropdownbtn10",
    "dropdownbtn11", "dropdownbtn12", "dropdownbtn13", "dropdownbtn14", "dropdownbtn15", "dropdownbtn16",
    "dropdownbtn17", "dropdownbtn18", "dropdownbtn19", "dropdownbtn20", "dropdownbtn21", "dropdownbtn22",
    "dropdownbtn23", "dropdownbtn24", "dropdownbtn25", "dropdownbtn26", "dropdownbtn27", "dropdownbtn28",
    "dropdownbtn29", "dropdownbtn30"];

const ListPeriodID = ["dropdownwith0", "dropdownwith1", "dropdownwith2", "dropdownwith3", "dropdownwith4",
    "dropdownwith5", "dropdownwith6", "dropdownwith7", "dropdownwith8", "dropdownwith9", "dropdownwith10",
    "dropdownwith11", "dropdownwith12", "dropdownwith13", "dropdownwith14", "dropdownwith15", "dropdownwith16",
    "dropdownwith17", "dropdownwith18", "dropdownwith19", "dropdownwith20", "dropdownwith21", "dropdownwith22",
    "dropdownwith23", "dropdownwith24", "dropdownwith25", "dropdownwith26", "dropdownwith27", "dropdownwith28",
    "dropdownwith29", "dropdownwith30"];

function fncGraphTimerBarInit(idx = 0) {
  const kPeriodTimeValue = ['10分', '1時間', '2時間', '4時間', '6時間', '12時間', '24時間', '31日'];
  // 各計測ユニットグラフ表示デフォルト年月日時分を当日 ００時００分とし、時間幅は２４時間にする
  var iHour = 0; // new Date().getHours();

  for (var iCnt = idx; iCnt <= gbtnID; iCnt++) {
    // 時間幅
    iperiodtime = 6; // 1(1時間) -> 6(24時間) 
    document.getElementById("dropdownwith" + iCnt.toString()).innerHTML = kPeriodTimeValue[iperiodtime];
    // 開始の分
    iminuteidx = 0;
    document.getElementById("dropdownminutebtn" + iCnt.toString()).innerHTML = ("0" + iminuteval[iminuteidx].toString()).slice(-2) + "分"; // '00分';
    // 時間
    itime = iHour;
    document.getElementById("dropdownbtn" + iCnt.toString()).innerHTML = ("0" + dropdowntime[iHour].toString()).slice(-2) + "時"; // ("0" + dropdowntime[new Date().getHours()].toString()).slice(-2) + "時";
    // デフォールト年月日表示
    $('#idGrpTimeInterval' + iCnt.toString()).val(getCurrentDateTimeMySql());
  }
};


/**
 * 現在時刻を「YYYY-MM-DD」形式で取得する
 */
function getCurrentDateTimeMySql() {
  var datetime = new Date();
  var day = ('00' + datetime.getDate()).slice(-2);
  var month = ('00' + (datetime.getMonth() + 1).toString()).slice(-2);
  var year = ('0000' + datetime.getFullYear()).slice(-4);
  var datval = year + '/' + month + '/' + day;

  return datval;
};

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

function containsSpecialChars(str) {
  const specialChars = /[\\\/:*?"<>|]+/;
  return specialChars.test(str);
}


function isPositive(num) {
  if (typeof num === 'number' && Math.sign(num) === 1) {
    return true;
  }

  return false;
}

/**
 * キープレース 数字入力しかない
 */
function onKeyPressInputNumber(e) {
  // if(e.keyCode == 101 || e.keyCode == 46) {
  //     return false;
  // }
  // return e.charCode >= 48;
  switch (e.type) {
      case 'keypress': /// 半角文字が入力されたとき
          if(e.keyCode == 101 || e.keyCode == 46) {
              return false;
          }
          return e.charCode >= 48;
      case 'paste': /// 貼り付けが反映される前
          const pasted = (window.clipboardData && window.clipboardData.getData)
              ? window.clipboardData.getData('Text')
              : e.originalEvent.clipboardData.getData('text/plain');
          return isPositive(pasted);
      case 'drop': /// ドロップが反映される前
          const dropped = e.originalEvent.dataTransfer.getData("text/plain");
          return isPositive(dropped);
      case 'compositionend': /// IMEでの入力が確定したとき
          const imeData = e.originalEvent.data;
          if (isPositive(imeData) == false) {
              this.value = "";
          }
          break;
  }
}

function checkSelectedItemAndOrder(settingObject) {
  if (settingObject === null) {
      return false;
  }

  const rowCount = settingObject.itemList.length;
  for (let i = 0; i < rowCount; i++) {
      if (settingObject.itemList[i].viewIdx > 0 && !settingObject.itemList[i].enable) {
          swal({
              title: "設定エラー！",
              text: 'チェックボックスにチェックを入れてください。',
              icon: "warning",
              button: "はい",
          });
          return false;
      }
  }

  return true;
}
