// URL
const apigatewayaccesstoken = "https://qtucgrun66.execute-api.ap-northeast-1.amazonaws.com/v1/login-users"; // ログイン
const apigateway = 'https://qtucgrun66.execute-api.ap-northeast-1.amazonaws.com/v1/api-hlrgwl-web?';
const apigatewaypost = 'https://qtucgrun66.execute-api.ap-northeast-1.amazonaws.com/v1/api-hlrgwl-dbmqtt?';
const apigatewaymail = 'https://qtucgrun66.execute-api.ap-northeast-1.amazonaws.com/v1/send-mail?';

/*
    警報ブザー表示　5s　→　30s
    ストレージ容量逼迫処理　5s　→　60s
    瞬時値更新処理　5s　→　30s
    グラフ更新処理　5s　→　30s
    ツリービュー状態表示　５→30s
    接点入力ボード確認処理　30s　→　60s
    状態バーの更新　30s　→　60s
*/

const FETCH_INTERVAL = {
    INSTANCE: 30000, //  30s 瞬時値更新処理
    GRAPH: 30000, //  30s グラフ更新処理
    TREEVIEW_STATUS: 30000, //  30s ツリービュー状態表示
    DIO_ALARM: 60000, // 60s 接点入力ボード確認処理
    DATETIME_SYSTEM: 30000, //  30s システム時刻表示
    CHECK_STORAGEFULL: 60000, // 60s ストレージ容量逼迫処理
};
var controller = new AbortController();
var http = {get: null, post: null, login: null, abort: null};

http.get = async function (url, fncCallback, fncError) {
    if (controller === null) {
        controller = new AbortController();
    }
    const API_GET_SETTINGS = {
        method: 'GET',
        headers: GetAuthHeader(),
        signal: controller.signal
    };

    // 要求をサーバーに送信する
    return fetch(url, API_GET_SETTINGS)
        .then(response => response.json())
        .then(result => {
            // console.log(result);
            if (result.Status == 200 || result.status == 200) {
                // 正常に返信
                result.Status = 200;
                fncCallback(result);
            } else {
                console.error('Error:', url, result);
                if (fncError) fncError(result);
            }
        })
        .catch(error => {
            console.error('Except:', url, error);
            if (fncError) fncError(error);
        });
}

http.login = async function (url, data, fncCallback, fncError) {
    const API_SETTINGS = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // APIゲートウェイに送信する
    try {
        const response = await fetch(url, API_SETTINGS);
        const result = await response.json();
        console.log("response:", result);
        if (result.Status == 200 || result.status == 200) {
            // 正常に返信
            fncCallback(result);
        } else {
            console.error('Error:', result);
            fncError(result);
        }
    } catch (error) {
        console.error('Except:', error);
        fncError(error);
    }
}

http.post = async function (url, data, fncCallback, fncError) {
    const API_SETTINGS = {
        method: 'POST',
        headers: GetAuthHeader(),
        body: data
    };

    // APIゲートウェイに送信する
    try {
        const response = await fetch(url, API_SETTINGS);
        const result = await response.json();
        // console.log("response:", result);
        if (result.Status == 200 || result.status == 200) {
            // 正常に返信
            return fncCallback(result);
        } else {
            console.error('Error:', result);
            return fncError(result);
        }
    } catch (error) {
        console.error('Except:', error);
        return fncError(error);
    }
}

function fncJson2String(jsData) {
    let aryData = [];
    for ( var key in jsData ) {
        aryData.push(key + "=" + jsData[key])
    }
    return aryData.join("&");
}

http.abort = function() {
    if (controller !== null) {
        controller.abort();
    }
    controller = null;
}
