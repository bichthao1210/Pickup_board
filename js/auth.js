/*
    ""00"":OTPコードが正しい
    ""01"":OTP コードが間違った
    ""02"":OTP コードの有効期限が切れました。
    ""03"":ユーザ情報がない
    ""04"":OTP コードが3以上間違った
*/
const OTP_ERROR_CODE = {
    "00":"OTPコードが正しい",
    "01":"OTPコードが正しくありません。",
    "02":"OTPコードの有効期限が切れました。",
    "03":"ユーザ情報がありません。",
    "04":"連続してOTPコード認証に失敗しました。"
};

// TOKEN取得
function getAccessToken() {
    let token;
    // //セッションからTOKEN取得
    // if (sessionStorage.getItem("access_token")) {
    //     token = sessionStorage.getItem("access_token");
    //     // token = JSON.parse(token);
    // }
    token = getCookie("access_token");
    return token;
}

// ログインしているAdminの情報を取得する
function getAccessAdminValue(field) {
    let returnvalue;
    //セッションからTOKEN取得
    if (getCookie(field)) {
        return getCookie(field);
    }
    return returnvalue;
}

// GET要求のヘッダーを取得する
function GetAuthHeader() {
    let token = getAccessToken();
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        };
    } else {
        return {};
    }
}

/*
    パスワード値をチェック。
*/
function fncCheckPW(pass) {
    var illegalChars = /[a-zA-Z0-9!@#$%^&*\+_-]$/g;

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
    ID値をチェック。
*/
function fncCheckID(strid, title) {
    var illegalChars = /^[a-zA-Z0-9_-]{4,16}$/;
    if (strid == "") {
        swal({
            title: "設定エラー！",
            text: title + "を入力してください。",
            icon: "warning",
            buttons: "はい"
        });
        return false;
    }
    else if (illegalChars.test(strid) == false) {
        swal({
            title: "設定エラー！",
            text: title + "は4～16文字の半角英数字と記号「_ -」で入力してください。",
            icon: "warning",
            buttons: "はい"
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
        if ((chr >= 0x00 && chr < 0x81) ||
            (chr === 0xf8f0) ||
            (chr >= 0xff61 && chr < 0xffa0) ||
            (chr >= 0xf8f1 && chr < 0xf8f4)) {
            //半角文字の場合は1を加算
            result += 1;
        } else {
            //それ以外の文字の場合は2を加算
            result += 2;
        }
    }
    //結果を返す
    return result;
};

/*  説明： 文字列の長さをチェックして、ダイアログを表示
    引数    ：
                input_string　：    文字列
                len           ：    長さ、単位はバイト
                alarm_content ：    ダイアログ用のコンテンツ
    戻り値  ：
                正常    ：  TRUE
                異常    ：  FALSE
*/
function string_len_check(input_string, len, alarm_content) {
    var cnt = 0;
    var strContent;

    strContent = alarm_content + len.toString() + "バイト以下で入力してください。" +
        "\n（半角" + len.toString() + "文字または全角" + (len / 2).toString() + "文字以内）";

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

    return true;
}

/*
    管理組織リストを格納する
    sParam:項目の名（AdminId）

*/
function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    console.log('sURLVariables: ' + sURLVariables);
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return (sParameterName[1]);
        }
    }
}


/*
    Get referrer domain
    戻り：

*/
function GetReferrerDomain() {
    var preUrl = document.referrer;
    if (preUrl == null) {
        return "Failed to get the domain name of the previous page";
    }
    else {
        var tmp = preUrl.split('/')
        return "/" + tmp[3];
    }
}

/*
    ログアウト
*/
function logout() {
    // cookieをクリアする
    delete_cookie('access_token');
    delete_cookie('admin_name');
    delete_cookie('session_id');
    delete_cookie('profile_session_id');

    // ログイン画面遷移
    // window.location = '/login.html';
}

//cookie取得
function cookieGetID(cookieList){

    var checkFlg = false;

    for (i in cookieList){

        var Cookies = document.cookie.replace(/ /g,'');
        //クッキ登録がなければ終了
        if (!Cookies) {
            return false;
        }

        var Cookie = Cookies.split(';');
        var ret = '';
        var key = null;
        var value = null;

        for (n in Cookie){

            if (Cookie[n].indexOf('=') < 0){
                Cookie[n]+='=';
            }

            chop = Cookie[n].split('=');
            checkList = cookieList[i]

            //一致しなければ処理を抜ける
            if (chop[0] != checkList) {
                continue;
            }

            //key value取得
            if (cookieList.indexOf(chop[0])>= 0) {
                key = unescape(chop[0]);
                value = unescape(chop[1]);
                break;
            }
        }

         //データがあれば格納
         if (key) {
            $("#"+key).val(value);
            checkFlg = true;
         }
    }

    if (checkFlg) {
        $("input[type='checkbox']").prop("checked",true);
    }
}

//cookieセット
function cookieSetID(cookieList){

    for (i in cookieList){

        var name = cookieList[i];
        var value = $("#"+cookieList[i]).val();

        if(cookieList[i] != null){
            var setDay = new Date();
            document.cookie = escape(name) + '=' + escape(value) + ";expires='31-Dec-2037 23:59:59 GMT'";
        }
    }

}

//cookieリセット
function cookieReset(cookieList){

    for (i in cookieList){

        var name = cookieList[i];
        var value = $("#"+cookieList[i]).val();

        if(cookieList[i] != null){
            document.cookie = escape(name) + '=' + escape(value) + "; max-age=0";
        }
      }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    let setValue = value;
    if ( (value === undefined) || (value === null) ) {
        setValue = "";
    }
    document.cookie = name + "=" + (setValue)  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/**
 * 正常のIPアドレスかどうか確認
 */
 function isIPadress(ip) {
    for (var i = 0; i < ip.length; i++) {
        if (ip[i] != "." && isNaN(ip[i])) return false;
    }
    var ipp = ip.split('.');
    if (ipp.length != 4) return false;
    for (var i = 0; i < 4; i++) {
        if (ipp[i] == "") return false
        var dec = parseInt(ipp[i]);
        if (dec > 255 || dec < 0) return false;
    }
    return true;
}
