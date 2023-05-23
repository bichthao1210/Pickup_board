// version=1.00
// 2022/02/25
// ログイン

const MAX_INPUT_LENGTH = 20;
const MAX_DATA_LENGTH = 20;

const cookieList = new Array ('company_id','login_id');

$(document).ready(function () {
    delete_cookie('session_id');
    cookieGetID(cookieList);
});

/*
    ログインボタンをクリックするイベント
    id, password
*/
function sendLoginInformation() {
  // 再送信を非表示
  $("#idResendFrame").addClass("d-none");
  $("#error").html("");
  $("#idloginbtn").prop("disabled", true);

  // 組織ID  
  var company_id = document.getElementById('company_id').value;
    if (company_id.trim() == "") {
      $("#error").html("組織IDを入力してください。");
      $('#company_id').select();
      $("#idloginbtn").prop("disabled", false);
      return;
    }
    // ログインID
    var login_id = document.getElementById('login_id').value;
    if (login_id.trim() == "") {
      $("#error").html("ログインIDを入力してください。");
      $('#login_id').select();
      $("#idloginbtn").prop("disabled", false);
      return;
    }
    // パスワード
    var password = document.getElementById('password').value;
    if (password.trim() == "") {
      $("#error").html("パスワードを入力してください。");
      $('#password').select();
      $("#idloginbtn").prop("disabled", false);
      return;
    }
    var data = {
        "companyId": company_id,
        "loginId": login_id,
        "password": password
    };

    const session_id = getCookie("session_id");
    if (!isNaN(parseInt(session_id))) {
      data["sessionId"] = parseInt(session_id);
    }

    if($(".checkbox-input").prop("checked")) {
      cookieSetID(cookieList);
    } else {
      cookieReset(cookieList);
    }

    return http.login(apigatewayaccesstoken, data, function(result) {
        // Tokenの保持
        if (result.Respons.otpEnable == 1) {
          $("#idLoginForm").addClass("d-none");
          $("#idOtpForm").removeClass("d-none");
          $("#otp_code").val("");
          $("#idloginbtn").prop("disabled", false);
          setCookie("session_id", result.Respons.sessionId);
          setTimeout(function() {
            $("#idResendFrame").removeClass("d-none");
          }, 30000);
        } else {
          token = result.Respons.authToken;
          setCookie("access_token", token);
          setCookie("admin_name", result.Respons.userName);
          $("#idloginbtn").prop("disabled", false);
  
          // 確証が正しい場合、管理リストの画面へ移動する
          if (!!getCookie("access_token")) {
            window.location = "/index.html";
          }
        }
      }, function(result) {
        $("#idloginbtn").prop("disabled", false);
        $("#error").html("IDまたはパスワードが正しくありません。");
      });
}

function CheckOtp() {
  const accessToken = getCookie("access_token");
  if (!!accessToken) {
    window.location = "/index.html";
  }

  $("#error").html("");

  // 組織ID  
  var company_id = document.getElementById('company_id').value;
    if (company_id.trim() == "") {
      $('#company_id').select();
      return;
    }
    // ログインID
    var login_id = document.getElementById('login_id').value;
    if (login_id.trim() == "") {
      $('#login_id').select();
      return;
    }
    // パスワード
    var password = document.getElementById('password').value;
    if (password.trim() == "") {
      $('#password').select();
      return;
    }
    // OTPコード
    var otp_code = document.getElementById('otp_code').value;
    if (otp_code.trim() == "") {
      $("#error").html("OTPコードを入力してください。");
      $('#otp_code').select();
      return;
    }

    var session_id = parseInt(getCookie("session_id"));
    if (isNaN(session_id)) {
      return;
    }

    var data = {
        "companyId": company_id,
        "loginId": login_id,
        "password": password,
        "otp": otp_code,
        "sessionId": session_id
    };

    return http.login(apigatewayaccesstoken, data, function(result) {
        // Tokenの保持
        token = result.Respons.authToken;
        setCookie("access_token", token);
        setCookie("admin_name", result.Respons.userName);

        // 確証が正しい場合、管理リストの画面へ移動する
        if (!!getCookie("access_token")) {
          window.location = "/index.html";
        }
      }, function(result) {
        if (result.Respons.errorType=="04"){
          swal({
            title: "エラー！",
            text: "OTPコードが3回以上間違いました。再ログインしてください。",
            icon: "error",
            buttons: "はい"
           }).then(function() {
            window.location = "/index.html";
           });





        }
        if (result.Respons.errorType=="02"){
          $("#error").html("OTPコードの有効期間が切れました。");
          return
        }
        $("#error").html("OTPコードが正しくありません。");
      });
}
