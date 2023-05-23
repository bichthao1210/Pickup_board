// グローバルの変数を定義
const GETACCOUNT_QUERY = apigateway + "path=id"; // "http://" + localhost + "/id";
const CHANGEPW_QUERY = apigateway + "path=id/admin"; // "http://" + localhost + "/id/admin";
const CHANGE_GENERAL_PW_QUERY = apigateway + "path=id/general"; // "http://" + localhost + "/id/general";
const CHANGE_FTP_PW_QUERY = apigateway + "path=id/ftp&0000_ChangeFTPPW"; // "http://" + localhost + "/id/ftp?0000_ChangeFTPPW";
var currentUser, adminUser, generalUser;

// ストレージ容量逼迫時
var checkStorageLoop;
var gAutoClearStorage;

// 警報件数表示インタバル
var updateAlarmInterval = undefined;

/**
* ページ内容を取得する
*/
function fncInitPW(gwId) {
    // 表示メニュー
    initMenu(gwId);

    // 組織名表面
    corp_name_disp();
    // 時間を表示する
    get_time();
    // メニューバーにDIO警報＋ブザーを表示する
    fncUpdateDIOBoardStatus();

    // Display ID
    fncDispAccountInf();

    // 30sごとに、警報を更新する
    update_alarm(fncUpdateAlarmCount);
    if (updateAlarmInterval !== undefined) {
        clearInterval(updateAlarmInterval);
    }
    updateAlarmInterval = setInterval(function () {
        update_alarm(fncUpdateAlarmCount);
    }, FETCH_INTERVAL.TREEVIEW_STATUS);
}


// When DOM full load
$(document).ready(function () {
    // url変更時、IoTゲートウェイIDを取得
    const gwId = locationChanged();

    fncInitPW(gwId);

    /*
        30sごとに、時刻を更新する
    */
    setInterval(function () {
        get_time();
    }, FETCH_INTERVAL.DATETIME_SYSTEM);

    /*
        5sごとに、警報＋ブザーの表示を更新する
    */
    setInterval(function () {
        fncGetAlarmStatus();
    }, FETCH_INTERVAL.DIO_ALARM);

    checkStorageLoop = setInterval(function () {
        fncCheckStorageState(fncGetStorageCallback);
    }, FETCH_INTERVAL.CHECK_STORAGEFULL);
});

/*
    ID情報を更新する。
*/
function fncDispAccountInf() {
    let strGetQuery = GETACCOUNT_QUERY + getIotGatewayIdParam();
    // Get ID + PW
    // $.getJSON(GETACCOUNT_QUERY, function (obj) {
    //     if (obj.Status == 200) {
    //         // ADMINアカウント
    //         $("#idGwAccount").val(obj.Respons.admin);
    //         $("#idGenAccount").val(obj.Respons.general);
    //         currentUser = obj.Respons.currentUser;
    //         adminUser = obj.Respons.admin;
    //         generalUser = obj.Respons.general;
    //     }
    // });
    http.get(strGetQuery, function (obj) {
        // ADMINアカウント
        $("#idGwAccount").val(obj.Respons.admin);
        $("#idGenAccount").val(obj.Respons.general);
        currentUser = obj.Respons.currentUser;
        adminUser = obj.Respons.admin;
        generalUser = obj.Respons.general;
    }, function (error) {
        /* エラー状態チェック */
        console.log("fncDispAccountInf: " + error);
    });
};

/*
    ADMIN
    パスワードの変更を送信設定 -> 保存button
*/
var ChangePWbtn = document.getElementById("idbtnPassWChange");
ChangePWbtn.addEventListener("click", function (e) {
    var id = document.getElementById("idGwAccount").value;
    var nowpass = document.getElementById("idNowPWord").value;
    var pass1 = document.getElementById("idGwPWord").value;
    var pass2 = document.getElementById("idGwPWordCheck").value;

    if (fncValidateForm(id, nowpass, pass1, pass2, true) == false) {
        return null;
    }

    // パスワードを変更する
    fncChangeGWPass(CHANGEPW_QUERY, id, nowpass, pass1);
});

/*
    GENERAL USER
    パスワードの変更を送信設定 -> 保存button
*/
var ChangeGenPWbtn = document.getElementById("idbtnGenPassWChange");
ChangeGenPWbtn.addEventListener("click", function (e) {
    var id = document.getElementById("idGenAccount").value;
    var nowpass = document.getElementById("idGenNowPWord").value;
    var pass1 = document.getElementById("idGenGwPWord").value;
    var pass2 = document.getElementById("idGenGwPWordCheck").value;

    if (fncValidateForm(id, nowpass, pass1, pass2, false) == false) {
        return null;
    }

    // パスワードを変更する
    fncChangeGWPass(CHANGE_GENERAL_PW_QUERY, id, nowpass, pass1);
});


/*
    入力のユーザーをチェックする
    id：ユーザー名
    nowPass：現在のパスワード
    newPass： 新しいパスワード
    newPassTemp：新しいパスワード（確認用）
    adminflg: 管理ユーザーの設定フラグ（管理ユーザー：true、一番ユーザー：false）
*/
function fncValidateForm(id, nowPass, newPass, newPassTemp, adminflg) {
    // ID入力値をチェック
    if (fncCheckID(id) == false) {
        return false;
    }

    if (nowPass == "") {
        swal({
            title: "設定エラー！",
            text: "新しいパスワードを入力してください。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }

    if ((newPass == "") || (newPassTemp == "")) {
        swal({
            title: "設定エラー！",
            text: "新しいパスワードを入力してください。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }

    // 確認欄
    if (newPass !== newPassTemp) {
        swal({
            title: "設定エラー！",
            text: "「新しいパスワード」に入力した値が「新しいパスワード（確認用）」に入力した値と一致しません。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }

    // 新しいパスワードをチェックする
    if (fncCheckPW(newPass) == false) {
        return false;
    };

    // 管理ユーザー名と同一名称かどうかチェックする
    if ((adminflg && (id == generalUser)) || ((id == adminUser) && (adminflg == false))) {
        swal({
            title: "設定エラー！",
            text: "一般ユーザー名は管理ユーザー名と同一に入力できません。",
            icon: "warning",
            button: "はい",
        });
        return false;
    }

    return true;
}

/*
    FTPのパースワードを変更するイベント。
*/
var ChangeFTPPWbtn = document.getElementById("idbtnFTPPassWChange");
ChangeFTPPWbtn.addEventListener("click", function (e) {
    var id = document.getElementById("idFTPGwAccount").value;
    var pass1 = document.getElementById("idFTPGwPWord").value;
    var pass2 = document.getElementById("idFTPGwPWordCheck").value;

    if ((pass1 == "") && (pass2 == "")) {
        swal({
            title: "設定エラー！",
            text: "パスワードを入力してください",
            icon: "warning",
            button: "はい",
        });
        return;
    }
    else {
        // 確認欄
        if (pass1 !== pass2) {
            swal({
                title: "設定エラー！",
                text: "「新しいパスワード」に入力した値が「新しいパスワード（確認用）」に入力した値と一致しません。",
                icon: "warning",
                button: "はい",
            });
            return;
        }

        // 新しいパスワードをチェックする
        if (fncCheckPW(pass1) == false) {
            return;
        };
    }

    // パスワードを変更する
    fncChangeFTPGWPass(id, pass1)

});

/*
    ID値をチェック。
*/
function fncCheckID(strid) {
    var illegalChars = /^[a-zA-Z0-9_-]{4,16}$/;
    var lastIdx, firstIdx;
    if (strid == "") {
        swal({
            title: "設定エラー！",
            text: "ユーザー名を入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    else if (illegalChars.test(strid) == false) {
        swal({
            title: "設定エラー！",
            text: "ユーザー名は4～16文字の半角英数字と記号「_ -」で入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    return true;
}

/*
    パスワード値をチェック。
*/
function fncCheckPW(pass) {
    // var illegalChars = /[a-zA-Z0-9!@#$%^&*\+_-]$/g;
    var illegalChars = /^[a-zA-Z0-9!@#$%^&*\+_-]*$/g;

    if (pass == "") {
        swal({
            title: "設定エラー！",
            text: "パスワードを入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    else if (illegalChars.test(pass) == false) {
        swal({
            title: "設定エラー！",
            text: "パスワードは4～16文字の半角英数字と一部の記号(! @ # $ % ^ & * + - _)を入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    else if ((pass.length < 4) || (pass.length > 16)) {
        swal({
            title: "設定エラー！",
            text: "パスワードは4～16文字の半角英数字と一部の記号(! @ # $ % ^ & * + - _)を入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    return true;
}

/*
    IDとPWの変更を実行。
*/
function fncChangeGWPass(path, strID, currentPW, newPW) {
    //ダイアログの制御
    swal({
        title: "設定を保存しますか？",
        icon: "warning",
        buttons: ["いいえ", "はい"],
        dangerMode: true,
    })
        .then(function (yes) {
            if (yes) {
                return $.post(path,
                    {
                        NewAccount: strID,
                        Password: currentPW,
                        NewPassword: newPW
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
                swal({
                    title: "設定を保存しました。",
                    icon: "success",
                    buttons: "はい"
                })
                    .then(function (yes) {
                        if (path.includes("admin")) {
                            window.location.replace("/logout.html");
                            // logout();
                        };
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


};

/*
    FTPのPWの変更を実行。
*/
function fncChangeFTPGWPass(strID, strNewPW) {
    //ダイアログの制御
    swal({
        title: "設定を保存しますか？",
        icon: "warning",
        buttons: ["いいえ", "はい"],
        dangerMode: true,
    })
        .then(function (yes) {
            if (yes) {
                return $.post(CHANGE_FTP_PW_QUERY,
                    {
                        Account: strID,
                        Password: strNewPW
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


};

/**
 * 組織名にクリックされた時の処理
 */
 var btnHakaruCom = document.getElementById("company_name_nav");
 btnHakaruCom.addEventListener("click", function (e) {
    //  if (gintIotGatewayId < 0) {
    //      window.location = "../index.html";
    //  } else {
    //      window.location = "../index.html?id=" + gintIotGatewayId;
    //  }
    window.location = "../index.html";
 })