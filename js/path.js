var gintIotGatewayId = -1;

function getIotGatewayId() {
  return gintIotGatewayId;
}

function getIotGatewayIdParam() {
  if (gintIotGatewayId >= 0) {
    return "&IotGatewayId=" + gintIotGatewayId;
  }
  return "";
}
//urlからidgatewayを取得する
function locationChanged() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const gwId = urlParams.get("id");
  // console.log("id = ", gwId);
  gintIotGatewayId = gwId !== null ? gwId : -1;
  http.abort();
  return gintIotGatewayId;
}

/**
 * Iot Gateway イベント
 */
function iotgateway_click(id) {
  if (btnHakaruCom) {
    btnHakaruCom.classList.remove("navbar-brand-active");
  }
  // 履歴表示
  if ((window.location.href).indexOf("history") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/history.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitHistory(id);
  }
  // ダウンロード画面
  else if ((window.location.href).indexOf("logging") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/logging.html?id=" + id)
      : window.history.pushState(id, "ハカルプラスクラウド", "/logging.html")
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitLogging(id);
  }
  else if ((window.location.href).indexOf("WhReport") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/WhReport.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitWhReport(id);
  }
  else if ((window.location.href).indexOf("RepeaterSystem.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/RepeaterSystem.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitRepeaterSys(id);
  }
  // 比較グラフ
  else if ((window.location.href).indexOf("PeriodComparisonGraph.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/PeriodComparisonGraph.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitPeriodGraph(id);
  }
  else if ((window.location.href).indexOf("CalcReport.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/CalcReport.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    // fncInitWhReport(id);
  }
  //  複合グラフ設定ページ
  else if ((window.location.href).indexOf("setting1.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/setting1.html?id=" + id)
      : window.history.pushState(id, "ハカルプラスクラウド", "/admin/setting1.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitSetting1(id);
  }
  // 任意選択CSV設定ページ
  else if ((window.location.href).indexOf("csvsetting.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/csvsetting.html?id=" + id)
      : window.history.pushState(id, "ハカルプラスクラウド", "/admin/csvsetting.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitCSVSetting(id);
  }
  // 電力量帳票設定
  else if ((window.location.href).indexOf("setting2.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/setting2.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitSetting2(id);
  }
  // ユニット追加
  else if ((window.location.href).indexOf("system.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/system.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitSystem(id);
  }
  // ユニット設定
  else if ((window.location.href).indexOf("setting.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/setting.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitSetting(id);
  }
  // Ethernet設定
  else if ((window.location.href).indexOf("ethernet.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/ethernet.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitEthernet(id);
  }
  // lora2設定
  else if ((window.location.href).indexOf("lora2.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/lora2.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitLora2(id);
  }
  // lora設定
  else if ((window.location.href).indexOf("lora.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/lora.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitLora(id);
  }
  // mail設定
  else if ((window.location.href).indexOf("mail.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/mail.html?id=" + id)
      : window.history.pushState(id, "ハカルプラスクラウド", "/admin/mail.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitMail(id);
  }
  // backup設定
  else if ((window.location.href).indexOf("backup.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/backup.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitBackup(id);
  }
  // password
  else if ((window.location.href).indexOf("password.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/admin/password.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitPW(id);
  }
  // version
  else if ((window.location.href).indexOf("version.html") != -1) {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/version.html?id=" + id)
      : window.location.replace("/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    fncInitVersion(id);
  }
  else if ((window.location.href).indexOf("gateway.html") != -1) {
    // URL更新
    id >= 0
      ? window.location.replace("/index.html?id=" + id)
      : window.history.pushState(id, "ハカルプラスクラウド", "/gateway.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    // initIotGateway(id);
  }
  else {
    // URL更新
    id >= 0
      ? window.history.pushState(id, "ハカルプラスクラウド", "/index.html?id=" + id)
      : window.history.pushState(id, "ハカルプラスクラウド", "/index.html");
    // url変更時、IoTゲートウェイIDを取得
    locationChanged();
    // メイン画面を初期値
    initIotGateway(id);
  }

}

/**
 * メニュー
 */
function initMenu(id) {
  // 表示メニュー
  if (id >= 0) {
    $("#idtopdisplay").prop("href", "/index.html?id=" + id);
    $("#idtopdisplay").show();

    $("#idhistorydisplay").prop("href", "/history.html?id=" + id);
    $("#idhistorydisplay").show();

    $("#idloggingdisplay").prop("href", "/logging.html?id=" + id);
    $("#idloggingdisplay").show();

    $("#idrepeatersystemdisplay").prop("href", "/RepeaterSystem.html?id=" + id);
    $("#idrepeatersystemdisplay").show();

    $("#idwhreportdisplay").prop("href", "/WhReport.html?id=" + id);
    $("#idwhreportdisplay").show();

    $("#idperiodcomparisongraphdisplay").prop(
      "href", "/PeriodComparisonGraph.html?id=" + id
    );
    $("#idperiodcomparisongraphdisplay").show();

    $("#idversiondisplay").prop("href", "/version.html?id=" + id);
    $("#idversiondisplay").show();

    $("#idCalcreportdisplay").prop("href", "/CalcReport.html?id=" + id);
    $("#idCalcreportdisplay").show();
  }

  // 設定メニュー
  if (id >= 0) {
    $("#idadminsystem").prop("href", "/admin/system.html?id=" + id);
    $("#idadminsystem").show();

    $("#idadminsetting").prop("href", "/admin/setting.html?id=" + id);
    $("#idadminsetting").show();

    $("#idadminsetting1").prop("href", "/admin/setting1.html?id=" + id);
    $("#idadminsetting1").show();

    $("#idadmincsvsetting").prop("href", "/admin/csvsetting.html?id=" + id);
    $("#idadmincsvsetting").show();

    $("#idadminsetting2").prop("href", "/admin/setting2.html?id=" + id);
    $("#idadminsetting2").show();

    $("#idadminsetting3").prop("href", "/admin/setting3.html?id=" + id);
    $("#idadminsetting3").show();

    $("#idadminitemordersetting").prop("href", "/admin/itemordersetting.html?id=" + id);
    $("#idadminitemordersetting").show();

    $("#idadminethernet").prop("href", "/admin/ethernet.html?id=" + id);
    $("#idadminethernet").show();

    $("#idadminlora2").prop("href", "/admin/lora2.html?id=" + id);
    $("#idadminlora2").show();

    $("#idadminmail").prop("href", "/admin/mail.html?id=" + id);
    $("#idadminmail").show();

    $("#idadminbackup").prop("href", "/admin/backup.html?id=" + id);
    $("#idadminbackup").show();

    $("#idadminpassword").prop("href", "/admin/password.html?id=" + id);
    $("#idadminpassword").show();

    $("#idadminotp").prop("href", "/admin/profile.html");
    $("#idadminotp").show();

  }
  else {
    $("#idadminotp").prop("href", "/admin/profile.html");
    $("#idadminotp").show();
  }

  // メニューバー
  if (id >= 0) {
    $("#idNavbarItems").show();
    $("#idMaincontainer").css("top", "9.5rem");
    $("#idSideBar").css("top", "3rem");
    // $("#idtab" + id).prop("checked", true)
    $(".sidebar-sticky-index").css("height", "calc(100vh - 143px)");
  }
  else {
    $("#idNavbarItems").hide();
    // $("#idtabhome").prop("checked", true);
    $(".sidebar-sticky-index").css("height", "calc(100vh - 95px)");
  }

}


/**
 * 設定メニュー権限
 */
function fncUpdateSettingMenuRole() {
  var strQuery = apigateway + "path=id";
  http.get(
    strQuery,
    function (obj) {
      //正常
      if (obj.Status == 200) {
        if ("user" == obj.Respons.general) {
          $("#idsettingmenu").prop("disabled", true);
        } else {
          // メニューバーの設定が押せないようにする
          $("#idsettingmenu").prop("disabled", connectedWithGW !== true);
        }
        $("#iddispmenu").prop("disabled", connectedWithGW !== true);
      }
    },
    function (error) {
      /* エラー状態チェック */
      console.log("fncUpdateSettingMenuRole: " + error);
    }
  );
}

/**
 * ユーザー名更新
 */
function fncUpdateUsername() {
  var strQuery = apigateway + "path=id";
  http.get(
    strQuery,
    function (obj) {
      //正常
      if (obj.Status == 200) {
        if (obj.Respons.userName) {
          if (document.getElementById("idloginnamedisplay")) {
            document.getElementById("idloginnamedisplay").innerHTML = "[" + obj.Respons.userName + "]";
          }
        }
      }
    },
    function (error) {
      /* エラー状態チェック */
      console.log("fncUpdateUsername: " + error);
    }
  );
}

/**
 * ユーザー権限
 */
function fncUpdateUserRole(fncUpdate) {
  var strQuery = apigateway + "path=id";
  http.get(
    strQuery,
    function (obj) {
      //正常
      if (obj.Status == 200) {
        if ("user" == obj.Respons.general) {
          fncUpdate();
        }
      }
    },
    function (error) {
      /* エラー状態チェック */
      console.log("fncUpdateUserRole: " + error);
    }
  );
}

$("#idHomesettingmenu").focus(function () {
  $("#idHomesettingmenu").parent().addClass("bg-secondary");
  $("#idHomesettingmenu").parent().addClass("rounded");

});

$("#idHomesettingmenu").blur(function () {
  $("#idHomesettingmenu").parent().removeClass("bg-secondary");
  $("#idHomesettingmenu").parent().removeClass("rounded");
});

$("#iddispmenu").focus(function () {
  $("#iddispmenu").parent().addClass("bg-secondary");
  $("#iddispmenu").parent().addClass("rounded");
});

$("#iddispmenu").blur(function () {
  $("#iddispmenu").parent().removeClass("bg-secondary");
  $("#iddispmenu").parent().removeClass("rounded");
});

$("#idsettingmenu").focus(function () {
  $("#idsettingmenu").parent().addClass("bg-secondary");
  $("#idsettingmenu").parent().addClass("rounded");

});

$("#idsettingmenu").blur(function () {
  $("#idsettingmenu").parent().removeClass("bg-secondary");
  $("#idsettingmenu").parent().removeClass("rounded");
});


/*
    Get referrer domain
    戻り：

*/
function GetReferrerDomain() {
  var preUrl = document.referrer;
  if ((preUrl == null) || (preUrl == "")) {
    return "";
  }
  else {
    var tmp = preUrl.split('/')
    return "/" + tmp[tmp.length-2] + "/" + tmp[tmp.length-1];
  }
}