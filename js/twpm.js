/*version=1.20*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

/**
* TWPM グラフ
*/
/*　機能： twpmグラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
*/
var twpm1p2w_chart_AR;
var twpm1p2w_chart_AS;
var twpm1p2w_chart_AT;
var twpm1p2w_chart_AN;
var twpm1p2w_chart_VRS;
var twpm1p2w_chart_VST;
var twpm1p2w_chart_VTR;
var twpm1p2w_chart_VRN;
var twpm1p2w_chart_VSN;
var twpm1p2w_chart_VTN;
var twpm1p2w_chart_F;
var twpm1p2w_chart_PF;
var twpm1p2w_chart_W;
var twpm1p2w_chart_Wh;
var twpm1p2w_chart_var;
var twpm1p2w_chart_varh;
var twpm1p2w_chart_varhlead;

var twpm1p3w_chart_AR;
var twpm1p3w_chart_AS;
var twpm1p3w_chart_AT;
var twpm1p3w_chart_AN;
var twpm1p3w_chart_VRS;
var twpm1p3w_chart_VST;
var twpm1p3w_chart_VTR;
var twpm1p3w_chart_VRN;
var twpm1p3w_chart_VSN;
var twpm1p3w_chart_VTN;
var twpm1p3w_chart_F;
var twpm1p3w_chart_PF;
var twpm1p3w_chart_W;
var twpm1p3w_chart_Wh;
var twpm1p3w_chart_var;
var twpm1p3w_chart_varh;
var twpm1p3w_chart_varhlead;

var twpm3p3w_chart_AR;
var twpm3p3w_chart_AS;
var twpm3p3w_chart_AT;
var twpm3p3w_chart_AN;
var twpm3p3w_chart_VRS;
var twpm3p3w_chart_VST;
var twpm3p3w_chart_VTR;
var twpm3p3w_chart_VRN;
var twpm3p3w_chart_VSN;
var twpm3p3w_chart_VTN;
var twpm3p3w_chart_F;
var twpm3p3w_chart_PF;
var twpm3p3w_chart_W;
var twpm3p3w_chart_Wh;
var twpm3p3w_chart_var;
var twpm3p3w_chart_varh;
var twpm3p3w_chart_varhlead;

var twpm3p4w_chart_AR;
var twpm3p4w_chart_AS;
var twpm3p4w_chart_AT;
var twpm3p4w_chart_AN;
var twpm3p4w_chart_VRS;
var twpm3p4w_chart_VST;
var twpm3p4w_chart_VTR;
var twpm3p4w_chart_VRN;
var twpm3p4w_chart_VSN;
var twpm3p4w_chart_VTN;
var twpm3p4w_chart_F;
var twpm3p4w_chart_PF;
var twpm3p4w_chart_W;
var twpm3p4w_chart_Wh;
var twpm3p4w_chart_var;
var twpm3p4w_chart_varh;
var twpm3p4w_chart_varhlead;

var twpm_graph_exist = false;

var twpm1p2w_graph_exist = false;
var twpm1p3w_graph_exist = false;
var twpm3p3w_graph_exist = false;
var twpm3p4w_graph_exist = false;

var twpm_graph_type = false;

//グラフ用の時間配
var twpm_graph_time_AR = [];
var twpm_graph_time_AS = [];
var twpm_graph_time_AT = [];
var twpm_graph_time_AN = [];
var twpm_graph_time_VRS = [];
var twpm_graph_time_VST = [];
var twpm_graph_time_VTR = [];
var twpm_graph_time_VRN = [];
var twpm_graph_time_VSN = [];
var twpm_graph_time_VTN = [];
var twpm_graph_time_F = [];
var twpm_graph_time_PF = [];
var twpm_graph_time_W = [];
var twpm_graph_time_Wh = [];
var twpm_graph_time_var = [];
var twpm_graph_time_varh = [];
var twpm_graph_time_varhlead = [];

var twpm_graph_date;
var twpm_graph_dat_num;
//DIグラフ用のデータ配
var twpm_graph_data_AR = [];
var twpm_graph_data_AS = [];
var twpm_graph_data_AT = [];
var twpm_graph_data_AN = [];
var twpm_graph_data_VRS = [];
var twpm_graph_data_VST = [];
var twpm_graph_data_VTR = [];
var twpm_graph_data_VRN = [];
var twpm_graph_data_VSN = [];
var twpm_graph_data_VTN = [];
var twpm_graph_data_F = [];
var twpm_graph_data_PF = [];
var twpm_graph_data_W = [];
var twpm_graph_data_Wh = [];
var twpm_graph_data_var = [];
var twpm_graph_data_varh = [];
var twpm_graph_data_varhlead = [];

function twpm_get_graph_data(obj, setdata) {
    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }
    // Graph date
    twpm_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        twpm_graph_time_AR.length = 0;
        twpm_graph_time_AS.length = 0;
        twpm_graph_time_AT.length = 0;
        twpm_graph_time_AN.length = 0;
        twpm_graph_time_VRS.length = 0;
        twpm_graph_time_VST.length = 0;
        twpm_graph_time_VTR.length = 0;
        twpm_graph_time_VRN.length = 0;
        twpm_graph_time_VSN.length = 0;
        twpm_graph_time_VTN.length = 0;
        twpm_graph_time_F.length = 0;
        twpm_graph_time_PF.length = 0;
        twpm_graph_time_W.length = 0;
        twpm_graph_time_Wh.length = 0;
        twpm_graph_time_var.length = 0;
        twpm_graph_time_varh.length = 0;
        twpm_graph_time_varhlead.length = 0;

        //
        twpm_graph_data_AR.length = 0;
        twpm_graph_data_AS.length = 0;
        twpm_graph_data_AT.length = 0;
        twpm_graph_data_AN.length = 0;
        twpm_graph_data_VRS.length = 0;
        twpm_graph_data_VST.length = 0;
        twpm_graph_data_VTR.length = 0;
        twpm_graph_data_VRN.length = 0;
        twpm_graph_data_VSN.length = 0;
        twpm_graph_data_VTN.length = 0;
        twpm_graph_data_F.length = 0;
        twpm_graph_data_PF.length = 0;
        twpm_graph_data_W.length = 0;
        twpm_graph_data_Wh.length = 0;
        twpm_graph_data_var.length = 0;
        twpm_graph_data_varh.length = 0;
        twpm_graph_data_varhlead.length = 0;

        //********************1P2W********************
        if (setdata.type == UnitCode.TWPM_1P2W) {
            //データ格納
            for (var i = 0; i < obj.Respons.A_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AR[i] = moment(obj.Respons.A_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AR[i] = obj.Respons.A_Current.Data[i].Value;
                }
            }


            //データ格納
            for (var i = 0; i < obj.Respons.V_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VRS[i] = moment(obj.Respons.V_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VRS[i] = obj.Respons.V_Voltage.Data[i].Value;
                }
            }
        }
        //********************1P3W********************
        else if (setdata.type == UnitCode.TWPM_1P3W) {
            //A1
            for (var i = 0; i < obj.Respons.A1_Current.Num; i++) {
                twpm_graph_time_AR[i] = moment(obj.Respons.A1_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A1_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AR[i] = obj.Respons.A1_Current.Data[i].Value;
                }
            }

            //AN
            for (var i = 0; i < obj.Respons.AN_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AS[i] = moment(obj.Respons.AN_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AN_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AS[i] = obj.Respons.AN_Current.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.A2_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AT[i] = moment(obj.Respons.A2_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A2_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AT[i] = obj.Respons.A2_Current.Data[i].Value;
                }
            }


            //データ格納
            for (var i = 0; i < obj.Respons.V1N_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VRS[i] = moment(obj.Respons.V1N_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V1N_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VRS[i] = obj.Respons.V1N_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.V2N_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VST[i] = moment(obj.Respons.V2N_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V2N_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VST[i] = obj.Respons.V2N_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.V12_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VTR[i] = moment(obj.Respons.V12_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V12_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VTR[i] = obj.Respons.V12_Voltage.Data[i].Value;
                }
            }


        }
        else if (setdata.type == UnitCode.TWPM_3P3W) {
            //データ格納
            for (var i = 0; i < obj.Respons.AR_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AR[i] = moment(obj.Respons.AR_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AR_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AR[i] = obj.Respons.AR_Current.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.AS_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AS[i] = moment(obj.Respons.AS_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AS_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AS[i] = obj.Respons.AS_Current.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.AT_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AT[i] = moment(obj.Respons.AT_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データがあるかチェック
                //データが無い場合
                if (parseInt(obj.Respons.AT_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AT[i] = obj.Respons.AT_Current.Data[i].Value;
                }
            }


            //データ格納
            for (var i = 0; i < obj.Respons.VRS_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VRS[i] = moment(obj.Respons.VRS_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");
                //データが無い場合
                if (parseInt(obj.Respons.VRS_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VRS[i] = obj.Respons.VRS_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VST_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VST[i] = moment(obj.Respons.VST_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VST_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VST[i] = obj.Respons.VST_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VTR_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VTR[i] = moment(obj.Respons.VTR_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VTR_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VTR[i] = obj.Respons.VTR_Voltage.Data[i].Value;
                }
            }

        } else if (setdata.type == UnitCode.TWPM_3P4W) {
            //データ格納
            for (var i = 0; i < obj.Respons.AR_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AR[i] = moment(obj.Respons.AR_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AR_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AR[i] = obj.Respons.AR_Current.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.AS_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AS[i] = moment(obj.Respons.AS_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AS_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AS[i] = obj.Respons.AS_Current.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.AT_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AT[i] = moment(obj.Respons.AT_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AT_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AT[i] = obj.Respons.AT_Current.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.AN_Current.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_AN[i] = moment(obj.Respons.AN_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AN_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_AN[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_AN[i] = obj.Respons.AN_Current.Data[i].Value;
                }
            }


            //データ格納
            for (var i = 0; i < obj.Respons.VRS_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VRS[i] = moment(obj.Respons.VRS_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VRS_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VRS[i] = obj.Respons.VRS_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VST_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VST[i] = moment(obj.Respons.VST_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VST_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VST[i] = obj.Respons.VST_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VTR_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VTR[i] = moment(obj.Respons.VTR_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VTR_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VTR[i] = obj.Respons.VTR_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VRN_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VRN[i] = moment(obj.Respons.VRN_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VRN_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VRN[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VRN[i] = obj.Respons.VRN_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VSN_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VSN[i] = moment(obj.Respons.VSN_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VSN_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VSN[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VSN[i] = obj.Respons.VSN_Voltage.Data[i].Value;
                }
            }

            //データ格納
            for (var i = 0; i < obj.Respons.VTN_Voltage.Num; i++) {
                //時間          "分：秒"
                twpm_graph_time_VTN[i] = moment(obj.Respons.VTN_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VTN_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    twpm_graph_data_VTN[i] = null;
                }
                //データがある
                else {
                    twpm_graph_data_VTN[i] = obj.Respons.VTN_Voltage.Data[i].Value;
                }
            }

        }

        //データ格納
        for (var i = 0; i < obj.Respons.F_Frequency.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_F[i] = moment(obj.Respons.F_Frequency.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.F_Frequency.Data[i].RSSI) == 0) {
                twpm_graph_data_F[i] = null;
            }
            //データがある
            else {
                twpm_graph_data_F[i] = obj.Respons.F_Frequency.Data[i].Value;
            }
        }

        //データ格納
        for (var i = 0; i < obj.Respons.PF_PowerFactor.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_PF[i] = moment(obj.Respons.PF_PowerFactor.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.PF_PowerFactor.Data[i].RSSI) == 0) {
                twpm_graph_data_PF[i] = null;
            }
            //データがある
            else {
                twpm_graph_data_PF[i] = obj.Respons.PF_PowerFactor.Data[i].Value;
            }
        }


        //データ格納
        for (var i = 0; i < obj.Respons.W_Power.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_W[i] = moment(obj.Respons.W_Power.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.W_Power.Data[i].RSSI) == 0) {
                twpm_graph_data_W[i] = null;
            }
            //データがある
            else {
                twpm_graph_data_W[i] = obj.Respons.W_Power.Data[i].Value;
            }
        }

        //データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                twpm_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                twpm_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }

        //データ格納
        for (var i = 0; i < obj.Respons.var_Power.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_var[i] = moment(obj.Respons.var_Power.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.var_Power.Data[i].RSSI) == 0) {
                twpm_graph_data_var[i] = null;
            }
            //データがある
            else {
                //DI1～DI8
                twpm_graph_data_var[i] = obj.Respons.var_Power.Data[i].Value;
            }
        }

        //データ格納(LAG)
        for (var i = 0; i < obj.Respons.varh_Energy.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_varh[i] = moment(obj.Respons.varh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varh_Energy.Data[i].RSSI) == 0) {
                twpm_graph_data_varh[i] = null;
            }
            //データがある
            else {
                twpm_graph_data_varh[i] = obj.Respons.varh_Energy.Data[i].Value;
            }
        }

        //データ格納(LEAD)
        for (var i = 0; i < obj.Respons.varhlead_Energy.Num; i++) {
            //時間          "分：秒"
            twpm_graph_time_varhlead[i] = moment(obj.Respons.varhlead_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varhlead_Energy.Data[i].RSSI) == 0) {
                twpm_graph_data_varhlead[i] = null;
            }
            //データがある
            else {
                twpm_graph_data_varhlead[i] = obj.Respons.varhlead_Energy.Data[i].Value;
            }
        }

        //
        switch (setdata.type) {
            case UnitCode.TWPM_1P2W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm1p2w_graph_exist == false) {
                    twpm1p2w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm1p2w_graph_exist = true;
                }
                else {
                    twpm1p2w_update_graph(setdata);
                }
                break;
            case UnitCode.TWPM_1P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm1p3w_graph_exist == false) {
                    twpm1p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm1p3w_graph_exist = true;
                }
                else {
                    twpm1p3w_update_graph(setdata);
                }
                break;
            case UnitCode.TWPM_3P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm3p3w_graph_exist == false) {
                    twpm3p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm3p3w_graph_exist = true;
                }
                else {
                    twpm3p3w_update_graph(setdata);
                }
                break;
            case UnitCode.TWPM_3P4W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm3p4w_graph_exist == false) {
                    twpm3p4w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm3p4w_graph_exist = true;
                }
                else {
                    twpm3p4w_update_graph(setdata);
                }
                break;
        }


        /* graph data update */
        if (setdata.type == UnitCode.TWPM_1P2W) {
            document.getElementById("twpm1p2w_A_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_V_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }
        else if (setdata.type == UnitCode.TWPM_1P3W) {
            document.getElementById("twpm1p3w_A1_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_AN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_A2_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_V1N_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_V2N_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_V12_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }
        else if (setdata.type == UnitCode.TWPM_3P3W) {
            document.getElementById("twpm3p3w_AR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_AS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_AT_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_VRS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_VST_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_VTR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }
        else if (setdata.type == UnitCode.TWPM_3P4W) {
            document.getElementById("twpm3p4w_AR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_AS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_AT_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_AN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VRS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VST_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VTR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VRN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VSN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VTN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }

    }
    else if (obj.Status == 400) {
        twpm_graph_data_AR[i] = null;
        twpm_graph_data_AS[i] = null;
        twpm_graph_data_AT[i] = null;
        twpm_graph_data_AN[i] = null;
        twpm_graph_data_VRS[i] = null;
        twpm_graph_data_VST[i] = null;
        twpm_graph_data_VTR[i] = null;
        twpm_graph_data_VRN[i] = null;
        twpm_graph_data_VSN[i] = null;
        twpm_graph_data_VTN[i] = null;
        twpm_graph_data_F[i] = null;
        twpm_graph_data_PF[i] = null;
        twpm_graph_data_W[i] = null;
        twpm_graph_data_Wh[i] = null;
        twpm_graph_data_var[i] = null;
        twpm_graph_data_varh[i] = null;
        twpm_graph_data_varhlead[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        switch (setdata.type) {
            case UnitCode.TWPM_1P2W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm1p2w_graph_exist == false) {
                    twpm1p2w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm1p2w_graph_exist = true;
                }
                else {
                    twpm1p2w_update_graph(setdata);
                }
                break;
            case UnitCode.TWPM_1P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm1p3w_graph_exist == false) {
                    twpm1p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm1p3w_graph_exist = true;
                }
                else {
                    twpm1p3w_update_graph(setdata);
                }
                break;
            case UnitCode.TWPM_3P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm3p3w_graph_exist == false) {
                    twpm3p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm3p3w_graph_exist = true;
                }
                else {
                    twpm3p3w_update_graph(setdata);
                }
                break;
            case UnitCode.TWPM_3P4W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (twpm3p4w_graph_exist == false) {
                    twpm3p4w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    twpm3p4w_graph_exist = true;
                }
                else {
                    twpm3p4w_update_graph(setdata);
                }
                break;
        }

        /* graph data update */
        if (setdata.type == UnitCode.TWPM_1P2W) {
            document.getElementById("twpm1p2w_A_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_V_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p2w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }
        else if (setdata.type == UnitCode.TWPM_1P3W) {
            document.getElementById("twpm1p3w_A1_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_AN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_A2_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_V1N_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_V2N_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_V12_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm1p3w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }
        else if (setdata.type == UnitCode.TWPM_3P3W) {
            document.getElementById("twpm3p3w_AR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_AS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_AT_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_VRS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_VST_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_VTR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p3w_varhlead_chart_time").innerHTML = twpm_graph_date;

        }
        else if (setdata.type == UnitCode.TWPM_3P4W) {
            document.getElementById("twpm3p4w_AR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_AS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_AT_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_AN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VRS_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VST_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VTR_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VRN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VSN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_VTN_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_F_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_PF_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_W_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_Wh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_var_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_varh_chart_time").innerHTML = twpm_graph_date;
            document.getElementById("twpm3p4w_varhlead_chart_time").innerHTML = twpm_graph_date;
        }

    }
    else {

    }
}

/**
 *
 */
function twpm1p2w_draw_graph(setdata) {
    twpm_draw_graph(setdata)
}

/**
 *
 */
function twpm1p3w_draw_graph(setdata) {
    twpm_draw_graph(setdata)
}

/**
 *
 */
function twpm3p3w_draw_graph(setdata) {
    twpm_draw_graph(setdata)
}

/**
 *
 */
function twpm3p4w_draw_graph(setdata) {
    twpm_draw_graph(setdata)
}

/*  機能：
*/
function twpm_draw_graph(setdata) {
    //CANVAS 2d content オブジェクトを取得   グラフ用
    if (setdata.type == UnitCode.TWPM_1P2W) {
        var canvas_AR = document.getElementById("twpm1p2w_A_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("twpm1p2w_V_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("twpm1p2w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("twpm1p2w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("twpm1p2w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("twpm1p2w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("twpm1p2w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("twpm1p2w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("twpm1p2w_varhlead_chart_canvas").getContext("2d");
    }
    else if (setdata.type == UnitCode.TWPM_1P3W) {
        var canvas_AR = document.getElementById("twpm1p3w_A1_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("twpm1p3w_AN_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("twpm1p3w_A2_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("twpm1p3w_V1N_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("twpm1p3w_V2N_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("twpm1p3w_V12_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("twpm1p3w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("twpm1p3w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("twpm1p3w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("twpm1p3w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("twpm1p3w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("twpm1p3w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("twpm1p3w_varhlead_chart_canvas").getContext("2d");
    }
    else if (setdata.type == UnitCode.TWPM_3P3W) {
        var canvas_AR = document.getElementById("twpm3p3w_AR_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("twpm3p3w_AS_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("twpm3p3w_AT_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("twpm3p3w_VRS_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("twpm3p3w_VST_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("twpm3p3w_VTR_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("twpm3p3w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("twpm3p3w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("twpm3p3w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("twpm3p3w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("twpm3p3w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("twpm3p3w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("twpm3p3w_varhlead_chart_canvas").getContext("2d");
    }
    else if (setdata.type == UnitCode.TWPM_3P4W) {
        var canvas_AR = document.getElementById("twpm3p4w_AR_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("twpm3p4w_AS_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("twpm3p4w_AT_chart_canvas").getContext("2d");
        var canvas_AN = document.getElementById("twpm3p4w_AN_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("twpm3p4w_VRS_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("twpm3p4w_VST_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("twpm3p4w_VTR_chart_canvas").getContext("2d");
        var canvas_VRN = document.getElementById("twpm3p4w_VRN_chart_canvas").getContext("2d");
        var canvas_VSN = document.getElementById("twpm3p4w_VSN_chart_canvas").getContext("2d");
        var canvas_VTN = document.getElementById("twpm3p4w_VTN_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("twpm3p4w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("twpm3p4w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("twpm3p4w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("twpm3p4w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("twpm3p4w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("twpm3p4w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("twpm3p4w_varhlead_chart_canvas").getContext("2d");
    }

    //グラフを描画
    if (setdata.type == UnitCode.TWPM_1P2W) {
        twpm1p2w_chart_AR = draw_graph_line(canvas_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        twpm1p2w_chart_VRS = draw_graph_line(canvas_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        twpm1p2w_chart_F = draw_graph_line(canvas_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        twpm1p2w_chart_PF = pw_draw_graph_line(canvas_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        twpm1p2w_chart_W = draw_graph_line(canvas_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        twpm1p2w_chart_Wh = draw_graph_bar(canvas_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        twpm1p2w_chart_var = draw_graph_line(canvas_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        twpm1p2w_chart_varh = draw_graph_bar(canvas_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        twpm1p2w_chart_varhlead = draw_graph_bar(canvas_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.TWPM_1P3W) {
        twpm1p3w_chart_AR = draw_graph_line(canvas_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        twpm1p3w_chart_AS = draw_graph_line(canvas_AS, twpm_graph_time_AS, twpm_graph_data_AS, twpm_graph_time_AS.length, setdata.setting.set.AS);
        twpm1p3w_chart_AT = draw_graph_line(canvas_AT, twpm_graph_time_AT, twpm_graph_data_AT, twpm_graph_time_AT.length, setdata.setting.set.AT);
        twpm1p3w_chart_VRS = draw_graph_line(canvas_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        twpm1p3w_chart_VST = draw_graph_line(canvas_VST, twpm_graph_time_VST, twpm_graph_data_VST, twpm_graph_time_VST.length, setdata.setting.set.VST);
        twpm1p3w_chart_VTR = draw_graph_line(canvas_VTR, twpm_graph_time_VTR, twpm_graph_data_VTR, twpm_graph_time_VTR.length, setdata.setting.set.VTR);
        twpm1p3w_chart_F = draw_graph_line(canvas_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        twpm1p3w_chart_PF = pw_draw_graph_line(canvas_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        twpm1p3w_chart_W = draw_graph_line(canvas_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        twpm1p3w_chart_Wh = draw_graph_bar(canvas_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        twpm1p3w_chart_var = draw_graph_line(canvas_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        twpm1p3w_chart_varh = draw_graph_bar(canvas_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        twpm1p3w_chart_varhlead = draw_graph_bar(canvas_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.TWPM_3P3W) {
        twpm3p3w_chart_AR = draw_graph_line(canvas_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        twpm3p3w_chart_AS = draw_graph_line(canvas_AS, twpm_graph_time_AS, twpm_graph_data_AS, twpm_graph_time_AS.length, setdata.setting.set.AS);
        twpm3p3w_chart_AT = draw_graph_line(canvas_AT, twpm_graph_time_AT, twpm_graph_data_AT, twpm_graph_time_AT.length, setdata.setting.set.AT);
        twpm3p3w_chart_VRS = draw_graph_line(canvas_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        twpm3p3w_chart_VST = draw_graph_line(canvas_VST, twpm_graph_time_VST, twpm_graph_data_VST, twpm_graph_time_VST.length, setdata.setting.set.VST);
        twpm3p3w_chart_VTR = draw_graph_line(canvas_VTR, twpm_graph_time_VTR, twpm_graph_data_VTR, twpm_graph_time_VTR.length, setdata.setting.set.VTR);
        twpm3p3w_chart_F = draw_graph_line(canvas_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        twpm3p3w_chart_PF = pw_draw_graph_line(canvas_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        twpm3p3w_chart_W = draw_graph_line(canvas_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        twpm3p3w_chart_Wh = draw_graph_bar(canvas_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        twpm3p3w_chart_var = draw_graph_line(canvas_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        twpm3p3w_chart_varh = draw_graph_bar(canvas_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        twpm3p3w_chart_varhlead = draw_graph_bar(canvas_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.TWPM_3P4W) {
        twpm3p4w_chart_AR = draw_graph_line(canvas_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        twpm3p4w_chart_AS = draw_graph_line(canvas_AS, twpm_graph_time_AS, twpm_graph_data_AS, twpm_graph_time_AS.length, setdata.setting.set.AS);
        twpm3p4w_chart_AT = draw_graph_line(canvas_AT, twpm_graph_time_AT, twpm_graph_data_AT, twpm_graph_time_AT.length, setdata.setting.set.AT);
        twpm3p4w_chart_AN = draw_graph_line(canvas_AN, twpm_graph_time_AN, twpm_graph_data_AN, twpm_graph_time_AN.length, setdata.setting.set.AN);
        twpm3p4w_chart_VRS = draw_graph_line(canvas_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        twpm3p4w_chart_VST = draw_graph_line(canvas_VST, twpm_graph_time_VST, twpm_graph_data_VST, twpm_graph_time_VST.length, setdata.setting.set.VST);
        twpm3p4w_chart_VTR = draw_graph_line(canvas_VTR, twpm_graph_time_VTR, twpm_graph_data_VTR, twpm_graph_time_VTR.length, setdata.setting.set.VTR);
        twpm3p4w_chart_VRN = draw_graph_line(canvas_VRN, twpm_graph_time_VRN, twpm_graph_data_VRN, twpm_graph_time_VRN.length, setdata.setting.set.VRN);
        twpm3p4w_chart_VSN = draw_graph_line(canvas_VSN, twpm_graph_time_VSN, twpm_graph_data_VSN, twpm_graph_time_VSN.length, setdata.setting.set.VSN);
        twpm3p4w_chart_VTN = draw_graph_line(canvas_VTN, twpm_graph_time_VTN, twpm_graph_data_VTN, twpm_graph_time_VTN.length, setdata.setting.set.VTN);
        twpm3p4w_chart_F = draw_graph_line(canvas_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        twpm3p4w_chart_PF = pw_draw_graph_line(canvas_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        twpm3p4w_chart_W = draw_graph_line(canvas_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        twpm3p4w_chart_Wh = draw_graph_bar(canvas_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        twpm3p4w_chart_var = draw_graph_line(canvas_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        twpm3p4w_chart_varh = draw_graph_bar(canvas_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        twpm3p4w_chart_varhlead = draw_graph_bar(canvas_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
}


/**
 *
 */
function twpm1p2w_update_graph(setdata) {
    twpm_update_graph(setdata)
}

/**
 *
 */
function twpm1p3w_update_graph(setdata) {
    twpm_update_graph(setdata)
}

/**
 *
 */
function twpm3p3w_update_graph(setdata) {
    twpm_update_graph(setdata)
}

/**
 *
 */
function twpm3p4w_update_graph(setdata) {
    twpm_update_graph(setdata)
}

/*  機能：  AD、DI、電波強度のグラフを更新
*/
function twpm_update_graph(setdata) {
    //
    if (setdata.type == UnitCode.TWPM_1P2W) {
        graph_line_update(twpm1p2w_chart_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(twpm1p2w_chart_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(twpm1p2w_chart_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        //graph_line_update(twpm1p2w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        pw_update_graph_line(twpm1p2w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(twpm1p2w_chart_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(twpm1p2w_chart_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(twpm1p2w_chart_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(twpm1p2w_chart_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(twpm1p2w_chart_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.TWPM_1P3W) {
        graph_line_update(twpm1p3w_chart_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(twpm1p3w_chart_AS, twpm_graph_time_AS, twpm_graph_data_AS, twpm_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(twpm1p3w_chart_AT, twpm_graph_time_AT, twpm_graph_data_AT, twpm_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(twpm1p3w_chart_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(twpm1p3w_chart_VST, twpm_graph_time_VST, twpm_graph_data_VST, twpm_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(twpm1p3w_chart_VTR, twpm_graph_time_VTR, twpm_graph_data_VTR, twpm_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(twpm1p3w_chart_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        //graph_line_update(twpm1p3w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        pw_update_graph_line(twpm1p3w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(twpm1p3w_chart_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(twpm1p3w_chart_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(twpm1p3w_chart_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(twpm1p3w_chart_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(twpm1p3w_chart_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);

    }
    else if (setdata.type == UnitCode.TWPM_3P3W) {
        graph_line_update(twpm3p3w_chart_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(twpm3p3w_chart_AS, twpm_graph_time_AS, twpm_graph_data_AS, twpm_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(twpm3p3w_chart_AT, twpm_graph_time_AT, twpm_graph_data_AT, twpm_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(twpm3p3w_chart_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(twpm3p3w_chart_VST, twpm_graph_time_VST, twpm_graph_data_VST, twpm_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(twpm3p3w_chart_VTR, twpm_graph_time_VTR, twpm_graph_data_VTR, twpm_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(twpm3p3w_chart_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        //graph_line_update(twpm3p3w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        pw_update_graph_line(twpm3p3w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(twpm3p3w_chart_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(twpm3p3w_chart_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(twpm3p3w_chart_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(twpm3p3w_chart_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(twpm3p3w_chart_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.TWPM_3P4W) {
        graph_line_update(twpm3p4w_chart_AR, twpm_graph_time_AR, twpm_graph_data_AR, twpm_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(twpm3p4w_chart_AS, twpm_graph_time_AS, twpm_graph_data_AS, twpm_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(twpm3p4w_chart_AT, twpm_graph_time_AT, twpm_graph_data_AT, twpm_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(twpm3p4w_chart_AN, twpm_graph_time_AN, twpm_graph_data_AN, twpm_graph_time_AN.length, setdata.setting.set.AN);
        graph_line_update(twpm3p4w_chart_VRS, twpm_graph_time_VRS, twpm_graph_data_VRS, twpm_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(twpm3p4w_chart_VST, twpm_graph_time_VST, twpm_graph_data_VST, twpm_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(twpm3p4w_chart_VTR, twpm_graph_time_VTR, twpm_graph_data_VTR, twpm_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(twpm3p4w_chart_VRN, twpm_graph_time_VRN, twpm_graph_data_VRN, twpm_graph_time_VRN.length, setdata.setting.set.VRN);
        graph_line_update(twpm3p4w_chart_VSN, twpm_graph_time_VSN, twpm_graph_data_VSN, twpm_graph_time_VSN.length, setdata.setting.set.VSN);
        graph_line_update(twpm3p4w_chart_VTN, twpm_graph_time_VTN, twpm_graph_data_VTN, twpm_graph_time_VTN.length, setdata.setting.set.VTN);
        graph_line_update(twpm3p4w_chart_F, twpm_graph_time_F, twpm_graph_data_F, twpm_graph_time_F.length, setdata.setting.set.F);
        //graph_line_update(twpm3p4w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        pw_update_graph_line(twpm3p4w_chart_PF, twpm_graph_time_PF, twpm_graph_data_PF, twpm_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(twpm3p4w_chart_W, twpm_graph_time_W, twpm_graph_data_W, twpm_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(twpm3p4w_chart_Wh, twpm_graph_time_Wh, twpm_graph_data_Wh, twpm_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(twpm3p4w_chart_var, twpm_graph_time_var, twpm_graph_data_var, twpm_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(twpm3p4w_chart_varh, twpm_graph_time_varh, twpm_graph_data_varh, twpm_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(twpm3p4w_chart_varhlead, twpm_graph_time_varhlead, twpm_graph_data_varhlead, twpm_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
}

/**
 *
 */
function fncTwpmGrpClr(type) {

    try {
        twpm_graph_data_AR.length = 0;
        twpm_graph_data_VRS.length = 0;
        twpm_graph_data_VST.length = 0;
        twpm_graph_data_VTR.length = 0;
        twpm_graph_data_F.length = 0;
        twpm_graph_data_PF.length = 0;
        twpm_graph_data_W.length = 0;
        twpm_graph_data_Wh.length = 0;
        twpm_graph_data_var.length = 0;
        twpm_graph_data_varh.length = 0;
        twpm_graph_data_varhlead.length = 0;
        twpm_graph_data_AS.length = 0;
        twpm_graph_data_AT.length = 0;
        twpm_graph_data_AN.length = 0;
        twpm_graph_data_VRN.length = 0;
        twpm_graph_data_VSN.length = 0;
        twpm_graph_data_VTN.length = 0;
    } catch (error) {

    }

    try {
        twpm_graph_time_AR.length = 0;
        twpm_graph_time_VRS.length = 0;
        twpm_graph_time_VST.length = 0;
        twpm_graph_time_VTR.length = 0;
        twpm_graph_time_F.length = 0;
        twpm_graph_time_PF.length = 0;
        twpm_graph_time_W.length = 0;
        twpm_graph_time_Wh.length = 0;
        twpm_graph_time_var.length = 0;
        twpm_graph_time_varh.length = 0;
        twpm_graph_time_varhlead.length = 0;
        twpm_graph_time_AS.length = 0;
        twpm_graph_time_AT.length = 0;
        twpm_graph_time_AN.length = 0;
        twpm_graph_time_VRN.length = 0;
        twpm_graph_time_VSN.length = 0;
        twpm_graph_time_VTN.length = 0;
    } catch (error) {

    }


    /**
     *
     */
    switch (type) {
        case UnitCode.TWPM_1P2W:
            if (twpm1p2w_graph_exist == true) {
                twpm1p2w_chart_AR.destroy();
                twpm1p2w_chart_VRS.destroy();
                twpm1p2w_chart_F.destroy();
                twpm1p2w_chart_PF.destroy();
                twpm1p2w_chart_W.destroy();
                twpm1p2w_chart_Wh.destroy();
                twpm1p2w_chart_var.destroy();
                twpm1p2w_chart_varh.destroy();
                twpm1p2w_chart_varhlead.destroy();

                twpm1p2w_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.TWPM_1P3W:
            if (twpm1p3w_graph_exist == true) {
                twpm1p3w_chart_AR.destroy();
                twpm1p3w_chart_AS.destroy();
                twpm1p3w_chart_AT.destroy();
                twpm1p3w_chart_VRS.destroy();
                twpm1p3w_chart_VST.destroy();
                twpm1p3w_chart_VTR.destroy();
                twpm1p3w_chart_F.destroy();
                twpm1p3w_chart_PF.destroy();
                twpm1p3w_chart_W.destroy();
                twpm1p3w_chart_Wh.destroy();
                twpm1p3w_chart_var.destroy();
                twpm1p3w_chart_varh.destroy();
                twpm1p3w_chart_varhlead.destroy();

                twpm1p3w_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.TWPM_3P3W:
            if (twpm3p3w_graph_exist == true) {
                twpm3p3w_chart_AR.destroy();
                twpm3p3w_chart_AS.destroy();
                twpm3p3w_chart_AT.destroy();
                twpm3p3w_chart_VRS.destroy();
                twpm3p3w_chart_VST.destroy();
                twpm3p3w_chart_VTR.destroy();
                twpm3p3w_chart_F.destroy();
                twpm3p3w_chart_PF.destroy();
                twpm3p3w_chart_W.destroy();
                twpm3p3w_chart_Wh.destroy();
                twpm3p3w_chart_var.destroy();
                twpm3p3w_chart_varh.destroy();
                twpm3p3w_chart_varhlead.destroy();

                twpm3p3w_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.TWPM_3P4W:
            if (twpm3p4w_graph_exist == true) {
                twpm3p4w_chart_AR.destroy();
                twpm3p4w_chart_AS.destroy();
                twpm3p4w_chart_AT.destroy();
                twpm3p4w_chart_AN.destroy();
                twpm3p4w_chart_VRS.destroy();
                twpm3p4w_chart_VST.destroy();
                twpm3p4w_chart_VTR.destroy();
                twpm3p4w_chart_VRN.destroy();
                twpm3p4w_chart_VSN.destroy();
                twpm3p4w_chart_VTN.destroy();
                twpm3p4w_chart_F.destroy();
                twpm3p4w_chart_PF.destroy();
                twpm3p4w_chart_W.destroy();
                twpm3p4w_chart_Wh.destroy();
                twpm3p4w_chart_var.destroy();
                twpm3p4w_chart_varh.destroy();
                twpm3p4w_chart_varhlead.destroy();

                twpm3p4w_graph_exist = false;
            }
            else {

            }
            break;
    }

    var term = "#alertH_twpm3p4w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#twpm3p4wupdated_time").text("データ更新：----/--/-- --:--");
    $("#twpm3p4w_AR_Current").text("--");
    $("#twpm3p4w_AS_Current").text("--");
    $("#twpm3p4w_AT_Current").text("--");
    $("#twpm3p4w_AN_Current").text("--");
    $("#twpm3p4w_VRS_Voltage").text("--");
    $("#twpm3p4w_VST_Voltage").text("--");
    $("#twpm3p4w_VTR_Voltage").text("--");
    $("#twpm3p4w_VRN_Voltage").text("--");
    $("#twpm3p4w_VSN_Voltage").text("--");
    $("#twpm3p4w_VTN_Voltage").text("--");
    $("#twpm3p4w_F_Frequency").text("--");
    $("#twpm3p4w_PF_PowerFactor").text("--");
    $("#twpm3p4w_W_Power").text("--");
    $("#twpm3p4w_Wh_Energy").text("--");
    $("#twpm3p4w_var_Power").text("--");
    $("#twpm3p4w_varh_Energy").text("--");
    $("#twpm3p4w_varhlead_Energy").text("--");


    term = "#alertH_twpm1p3w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#twpm1p3wupdated_time").text("データ更新：----/--/-- --:--");
    $("#twpm1p3w_A1_Current").text("--");
    $("#twpm1p3w_AN_Current").text("--");
    $("#twpm1p3w_A2_Current").text("--");
    $("#twpm1p3w_V1N_Voltage").text("--");
    $("#twpm1p3w_V2N_Voltage").text("--");
    $("#twpm1p3w_V12_Voltage").text("--");
    $("#twpm1p3w_F_Frequency").text("--");
    $("#twpm1p3w_PF_PowerFactor").text("--");
    $("#twpm1p3w_W_Power").text("--");
    $("#twpm1p3w_Wh_Energy").text("--");
    $("#twpm1p3w_var_Power").text("--");
    $("#twpm1p3w_varh_Energy").text("--");
    $("#twpm1p3w_varhlead_Energy").text("--");

    term = "#alertH_twpm3p3w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#twpm3p3wupdated_time").text("データ更新：----/--/-- --:--");
    $("#twpm3p3w_AR_Current").text("--");
    $("#twpm3p3w_AS_Current").text("--");
    $("#twpm3p3w_AT_Current").text("--");
    $("#twpm3p3w_VRS_Voltage").text("--");
    $("#twpm3p3w_VST_Voltage").text("--");
    $("#twpm3p3w_VTR_Voltage").text("--");
    $("#twpm3p3w_F_Frequency").text("--");
    $("#twpm3p3w_PF_PowerFactor").text("--");
    $("#twpm3p3w_W_Power").text("--");
    $("#twpm3p3w_Wh_Energy").text("--");
    $("#twpm3p3w_var_Power").text("--");
    $("#twpm3p3w_varh_Energy").text("--");
    $("#twpm3p3w_varhlead_Energy").text("--");

    term = "#alertH_twpm1p2w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#twpm1p2wupdated_time").text("データ更新：----/--/-- --:--");
    $("#twpm1p2w_A_Current").text("--");
    $("#twpm1p2w_V_Voltage").text("--");
    $("#twpm1p2w_F_Frequency").text("--");
    $("#twpm1p2w_PF_PowerFactor").text("--");
    $("#twpm1p2w_W_Power").text("--");
    $("#twpm1p2w_Wh_Energy").text("--");
    $("#twpm1p2w_var_Power").text("--");
    $("#twpm1p2w_varh_Energy").text("--");
    $("#twpm1p2w_varhlead_Energy").text("--");


    twpm_graph_type = type;
}


const TWPM_TITLE_ = "title_";
const TWPM_GRAPHH_ = "graphH_";
const TWPM_GRAPHL_ = "graphL_";
const TWPM_ALARMH_ = "alarmH_";
const TWPM_ALARML_ = "alarmL_";
const TWPM_ALARMHE_ = "alarmHE_";
const TWPM_ALARMLE_ = "alarmLE_";
const TWPM_CLALARMH_ = "ClAlarmH_";
const TWPM_CLALARML_ = "ClAlarmL_";
const TWPM_MODEL_CHECK_  = "MODEL_";

/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：TWPMの価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_twpm_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var termL;
    var termClH;
    var termClL;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "varh", "varhlead", "PF"];

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + TWPM_TITLE_ + suffix;
    console.log(ID_temp)
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
    if (string_len_check(document.getElementById(ID_temp).value, 20, ("タイトルを"), true) == false) return false;
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

    // グラフの上限値、下限値
    if (chkExclude.includes(suffix) == false) {
        //グラフの上限値
        ID_temp = prefix + TWPM_GRAPHH_ + suffix;
        console.log(ID_temp);
        var strGH = document.getElementById(ID_temp).value;
        if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "グラフ上限値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            term = parseFloat(document.getElementById(ID_temp).value);
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
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
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
        //グラフの下限値
        ID_temp = prefix + TWPM_GRAPHL_ + suffix;
        console.log(ID_temp);
        var strGL = document.getElementById(ID_temp).value;
        if ((isNaN(strGL) == true) || (strGL.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "グラフ下限値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termL = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termL + '',
                dpNum1 = !!(termL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termL = Math.round(termL * 10000);
                if ((termL > MAXINPUTVALUE) || (termL < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "グラフ下限値は、次の範囲で入力してください。" +
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

        if (termL >= term) {
            swal({
                title: "設定エラー！",
                text: "グラフ上限をグラフ下限値より大きいな値を入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        //上限警報発生値
        ID_temp = prefix + TWPM_ALARMH_ + suffix;
        console.log(ID_temp);
        var strAH = document.getElementById(ID_temp).value;
        if ((isNaN(strAH) == true) || (strAH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            term = parseFloat(document.getElementById(ID_temp).value);
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
                var txtmess = "上限警報発生値は、次の範囲で入力してください。" +
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

        //上限警報解除値
        ID_temp = prefix + TWPM_CLALARMH_ + suffix;
        console.log(ID_temp);
        var strClAH = document.getElementById(ID_temp).value;
        if ((isNaN(strClAH) == true) || (strClAH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "上限警報解除値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termClH = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termClH + '',
                dpNum1 = !!(termClH % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termClH = Math.round(termClH * 10000);
                if ((termClH > MAXINPUTVALUE) || (termClH < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "上限警報解除値は、次の範囲で入力してください。" +
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

        if (term < termClH) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値を上限警報解除値以上で入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        //下限警報発生値
        ID_temp = prefix + TWPM_ALARML_ + suffix;
        console.log(ID_temp);
        var strAL = document.getElementById(ID_temp).value;
        if ((isNaN(strAL) == true) || (strAL.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "下限警報発生値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termL = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termL + '',
                dpNum1 = !!(termL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termL = Math.round(termL * 10000);
                if ((termL > MAXINPUTVALUE) || (termL < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "下限警報発生値は、次の範囲で入力してください。" +
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

        //下限警報解除値
        ID_temp = prefix + TWPM_CLALARML_ + suffix;
        console.log(ID_temp);
        var strClAL = document.getElementById(ID_temp).value;
        if ((isNaN(strClAL) == true) || (strClAL.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "下限警報解除値は数値のみです。",
                icon: "warning",
                button: "はい",
            });
            return false;
        } else {
            termClL = parseFloat(document.getElementById(ID_temp).value);
            var strNum1 = termClL + '',
                dpNum1 = !!(termClL % 1) ? (strNum1.length - strNum1.indexOf('.') - 1) : 0,
                bFlag = true;

            if (dpNum1 > 4) {
                bFlag = false;
            }
            else {
                termClL = Math.round(termClL * 10000);
                if ((termClL > MAXINPUTVALUE) || (termClL < (MAXINPUTVALUE * (-1)))) {
                    bFlag = false;
                }
            }

            //大きすぎなら
            if (bFlag == false) {
                var txtmess = "下限警報解除値は、次の範囲で入力してください。" +
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

        if (termL > termClL) {
            swal({
                title: "設定エラー！",
                text: "下限警報解除値を下限警報発生値以上で入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        if (termClL >= termClH) {
            swal({
                title: "設定エラー！",
                text: "上限警報解除値を下限警報解除値より大きい値を入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        if (termL >= term) {
            swal({
                title: "設定エラー！",
                text: "上限警報発生値を下限警報発生値より大きい値を入力してください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }
    }
    else {
        //グラフの上限値
        ID_temp = prefix + TWPM_GRAPHH_ + suffix;
        console.log(ID_temp);
        var strGH = document.getElementById(ID_temp).value;
        if ((isNaN(strGH) == true) || (strGH.trim() == "")) {
            swal({
                title: "設定エラー！",
                text: "グラフ上限値は数値のみです。",
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
                    text: "グラフ上限値を0より大きな値で入力してください。",
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
                var txtmess = "グラフ上限値は、次の範囲で入力してください。" +
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
    }

    return true;
}

/*  機能：  TWPM設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            e: 設定ボータン
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_twpm_setting(unitNo, e) {
    var ch = e.target.id;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "varh", "varhlead", "PF"];
    var settingpoint = 4;

    prefix = ch.split("_")[0] + "_";
    suffix = ch.split("_")[1];
    // JavascriptDataを作成
    var jsDat = new Object();

    //[UnitNo]
    jsDat.UnitNo = unitNo;
    //[Item]
    jsDat.Item = ch.split("_")[2] + "_" + ch.split("_")[3];
    //[Title]
    jsDat.Title = chr2sjis(document.getElementById(prefix + TWPM_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + TWPM_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + TWPM_GRAPHH_ + suffix).value, settingpoint);
    //[AlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + TWPM_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + TWPM_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmL = dec2hex(document.getElementById(prefix + TWPM_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmL = "000000000000";
    }
    //[ClAlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmH = dec2hex(document.getElementById(prefix + TWPM_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmH = "000000000000";
    }

    //[MODEL_CHECK]
    if (suffix == "PF") {
        jsDat.MODEL_CHECK = ((document.getElementById(prefix + TWPM_MODEL_CHECK_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.MODEL_CHECK = 0;
    }

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}


/**
 * TWPMの設定値を表示する
 *
 */
var gtwpmSettingPointArray = {};
function twpm_loaddata_setting(obj, Type) {

    if (obj.Status == 200) {
        // Setting point clear
        gtwpmSettingPointArray = {};
        var settingpoint = 4;
        switch (Type) {
            case UnitCode.TWPM_1P2W:
                prefix = "twpm1p2w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.A_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.A_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.A_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.A_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.A_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.A_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.A_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.A_Current.AlarmE[1]) == 1) ? true : false;
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.A_Current.AlarmE[0]) == 1) ? true : false;
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.V_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.V_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.V_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.V_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.V_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.V_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.V_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.V_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.V_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V_Voltage.Point;


                suffix = "F";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;


                suffix = "PF";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;
                //TWP5M
                document.getElementById(prefix + TWPM_MODEL_CHECK_ + suffix).checked = ((obj.Respons.PF_PowerFactor.MODEL) == 1) ? true : false;


                suffix = "W";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;


                suffix = "Wh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;


                suffix = "var";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;

                //無効電力量（LAG）
                suffix = "varh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;
                

                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }


                break;

            case UnitCode.TWPM_1P3W:
                prefix = "twpm1p3w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.A1_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.A1_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.A1_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.A1_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.A1_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.A1_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.A1_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.A1_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.A1_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A1_Current.Point;

                suffix = "AS"
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AN_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AN_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AN_Current.Graph[0]).toFixed(settingpoint))
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AN_Current.Alarm[1]).toFixed(settingpoint))
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AN_Current.Alarm[0]).toFixed(settingpoint))
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AN_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AN_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AN_Current.Point;

                suffix = "AT";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.A2_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.A2_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.A2_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.A2_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.A2_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.A2_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.A2_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.A2_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.A2_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A2_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.V1N_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.V1N_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.V1N_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.V1N_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.V1N_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.V1N_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.V1N_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.V1N_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.V1N_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V1N_Voltage.Point;

                suffix = "VST";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.V2N_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.V2N_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.V2N_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.V2N_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.V2N_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.V2N_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.V2N_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.V2N_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.V2N_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V2N_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.V12_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.V12_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.V12_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.V12_Voltage.Alarm[1]).toFixed(settingpoint))
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.V12_Voltage.Alarm[0]).toFixed(settingpoint))
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.V12_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.V12_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.V12_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.V12_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V12_Voltage.Point;

                suffix = "F";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;

                suffix = "PF";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;
                //TWP5M
                document.getElementById(prefix + TWPM_MODEL_CHECK_ + suffix).checked = ((obj.Respons.PF_PowerFactor.MODEL) == 1) ? true : false;

                suffix = "W";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "var";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;

                //無効電力量（LAG）
                suffix = "varh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;

                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }

                /*
                //無効電力量（LEAD）
                suffix = "varhlead";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                */
                break;

            case UnitCode.TWPM_3P3W:
                prefix = "twpm3p3w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AR_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AR_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AR_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AR_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AR_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AR_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AR_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AR_Current.Point;


                suffix = "AS";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AS_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AS_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AS_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AS_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AS_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AS_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AS_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AS_Current.Point;


                suffix = "AT";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AT_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AT_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AT_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AT_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AT_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AT_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AT_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AT_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VRS_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VRS_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VRS_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VRS_Voltage.Point;

                suffix = "VST";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VST_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VST_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VST_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VST_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VST_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VST_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VTR_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VTR_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VTR_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VTR_Voltage.Point;

                suffix = "F";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;

                suffix = "PF";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;
                //TWP5M
                document.getElementById(prefix + TWPM_MODEL_CHECK_ + suffix).checked = ((obj.Respons.PF_PowerFactor.MODEL) == 1) ? true : false;

                suffix = "W";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "var";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;

                //無効電力量（LAG）
                suffix = "varh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;

                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }
/*                //無効電力量（LEAD）
                suffix = "varhlead";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
  */

                break
            case UnitCode.TWPM_3P4W:
                prefix = "twpm3p4w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AR_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AR_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AR_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AR_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AR_Current.Alarm[0]).toFixed(settingpoint));;
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AR_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AR_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AR_Current.Point;

                suffix = "AS";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AS_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AS_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AS_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AS_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AS_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AS_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AS_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AS_Current.Point;

                suffix = "AT";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AT_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AT_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AT_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AT_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AT_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AT_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AT_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AT_Current.Point;

                suffix = "AN";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.AN_Current.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.AN_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.AN_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.AN_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.AN_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.AN_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.AN_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AN_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VRS_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VRS_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VRS_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VRS_Voltage.Point;

                suffix = "VST";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VST_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VST_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VST_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VST_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VST_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VST_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VTR_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VTR_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VTR_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VTR_Voltage.Point;



                suffix = "VRN";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VRN_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VRN_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VRN_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VRN_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VRN_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VRN_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VRN_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VRN_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VRN_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VRN_Voltage.Point;

                suffix = "VSN";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VSN_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VSN_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VSN_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VSN_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VSN_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VSN_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VSN_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VSN_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VSN_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VSN_Voltage.Point;

                suffix = "VTN";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.VTN_Voltage.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.VTN_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.VTN_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.VTN_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.VTN_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.VTN_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.VTN_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.VTN_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.VTN_Voltage.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VTN_Voltage.Point;

                suffix = "F";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;

                suffix = "PF";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;
                //TWP5M
                document.getElementById(prefix + TWPM_MODEL_CHECK_ + suffix).checked = ((obj.Respons.PF_PowerFactor.MODEL) == 1) ? true : false;

                suffix = "W";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "var";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + TWPM_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + TWPM_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + TWPM_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + TWPM_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + TWPM_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + TWPM_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;

                //無効電力量（LAG）
                suffix = "varh";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;

                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }
/*
                //無効電力量（LEAD）
                suffix = "varhlead";
                // タイトル
                $("#" + prefix + TWPM_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                // グラフ上限
                $("#" + prefix + TWPM_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + TWPM_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gtwpmSettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
 */

                break;
        }

    } else {
        //Debug
    }
}

/**
* TWPM1P2Wデータ
*/
function get_InsDatTWPM1P2W(setting, unitNo, unitSts) {
    var isNoRequest = false;

    // 通信異常の時、瞬時値を「--」に表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twpm1p2wupdated_time").text("データ更新：----/--/-- --:--");
        $("#twpm1p2w_A_Current").text("--");
        $("#twpm1p2w_V_Voltage").text("--");
        $("#twpm1p2w_F_Frequency").text("--");
        $("#twpm1p2w_PF_PowerFactor").text("--");
        $("#twpm1p2w_W_Power").text("--");
        $("#twpm1p2w_Wh_Energy").text("--");
        $("#twpm1p2w_var_Power").text("--");
        $("#twpm1p2w_varh_Energy").text("--");
        $("#twpm1p2w_varhlead_Energy").text("--");

        var term = "#alertH_twpm1p2w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNoRequest = true;
    }
    // 設定値を表示する
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "twpm1p2w";

        // 瞬時値タイトル
        $('#' + prefix + "_A_Current_Title").text(setting.setting.set.AR.Title);
        $('#' + prefix + "_V_Voltage_Title").text(setting.setting.set.VRS.Title);
        $('#' + prefix + "_F_Frequency_Title").text(setting.setting.set.F.Title);
        $('#' + prefix + "_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $('#' + prefix + "_W_Power_Title").text(setting.setting.set.W.Title);
        $('#' + prefix + "_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $('#' + prefix + "_var_Power_Title").text(setting.setting.set.var.Title);
        $('#' + prefix + "_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $('#' + prefix + "_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);

        //電流
        $("#" + prefix + "_Title_A").text(setting.setting.set.AR.Title);
        if (setting.setting.set.AR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_A").css({ "display": "block" });
            $("#" + prefix + "_aH_A").text("上限警報発生値:" + setting.setting.set.AR.Alarm[1].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_A").css({ "display": "none" });
        }

        if (setting.setting.set.AR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_A").css({ "display": "block" });
            $("#" + prefix + "_aL_A").text("下限警報発生値:" + setting.setting.set.AR.Alarm[0].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_A").css({ "display": "none" });
        }

        //電圧
        $("#" + prefix + "_Title_V").text(setting.setting.set.VRS.Title);
        if (setting.setting.set.VRS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_V").css({ "display": "block" });
            $("#" + prefix + "_aH_V").text("上限警報発生値:" + setting.setting.set.VRS.Alarm[1].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_V").css({ "display": "none" });
        }

        if (setting.setting.set.VRS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_V").css({ "display": "block" });
            $("#" + prefix + "_aL_V").text("下限警報発生値:" + setting.setting.set.VRS.Alarm[0].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_V").css({ "display": "none" });
        }

        //周波数
        $("#" + prefix + "_Title_F").text(setting.setting.set.F.Title);
        if (setting.setting.set.F.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_F").css({ "display": "block" });
            $("#" + prefix + "_aH_F").text("上限警報発生値:" + setting.setting.set.F.Alarm[1].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aHE_F").css({ "display": "none" });
        }

        if (setting.setting.set.F.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_F").css({ "display": "block" });
            $("#" + prefix + "_aL_F").text("下限警報発生値:" + setting.setting.set.F.Alarm[0].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aLE_F").css({ "display": "none" });
        }

        //力率
        $("#" + prefix + "_Title_PF").text(setting.setting.set.PF.Title);
        if (setting.setting.set.PF.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_PF").css({ "display": "block" });
            $("#" + prefix + "_aH_PF").text("上限警報発生値:" + setting.setting.set.PF.Alarm[1].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aHE_PF").css({ "display": "none" });
        }

        if (setting.setting.set.PF.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_PF").css({ "display": "block" });
            $("#" + prefix + "_aL_PF").text("下限警報発生値:" + setting.setting.set.PF.Alarm[0].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aLE_PF").css({ "display": "none" });
        }

        //電力
        $("#" + prefix + "_Title_W").text(setting.setting.set.W.Title);
        if (setting.setting.set.W.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_W").css({ "display": "block" });
            $("#" + prefix + "_aH_W").text("上限警報発生値:" + setting.setting.set.W.Alarm[1].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aHE_W").css({ "display": "none" });
        }

        if (setting.setting.set.W.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_W").css({ "display": "block" });
            $("#" + prefix + "_aL_W").text("下限警報発生値:" + setting.setting.set.W.Alarm[0].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aLE_W").css({ "display": "none" });
        }

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title)
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        //無効電力
        $("#" + prefix + "_Title_var").text(setting.setting.set.var.Title)
        if (setting.setting.set.var.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_var").css({ "display": "block" });
            $("#" + prefix + "_aH_var").text("上限警報発生値:" + setting.setting.set.var.Alarm[1].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aHE_var").css({ "display": "none" });
        }

        if (setting.setting.set.var.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_var").css({ "display": "block" });
            $("#" + prefix + "_aL_var").text("下限警報発生値:" + setting.setting.set.var.Alarm[0].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aLE_var").css({ "display": "none" });
        }

        //無効電力量(LAG)
        $("#" + prefix + "_Title_varh").text(setting.setting.set.varh.Title);
        //電力量及び無効電力量は、警報対象外(LAG)
        $("#" + prefix + "_aHE_varh").css({ "display": "none" });
        $("#" + prefix + "_aLE_varh").css({ "display": "none" });

        //無効電力量(LEAD)
        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        //電力量及び無効電力量は、警報対象外(LEAD)
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });

    }
    else {
        isNoRequest = true;
    }

    // 通信異常＋設定値が無効　→　瞬時値を更新しない
    if (isNoRequest == true) {
        return;
    }

    // 通信OKの時、瞬時値を更新する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#twpm1p2wupdated_time").text("データ更新：----/--/-- --:--");
                $("#twpm1p2w_A_Current").text("--");
                $("#twpm1p2w_V_Voltage").text("--");
                $("#twpm1p2w_F_Frequency").text("--");
                $("#twpm1p2w_PF_PowerFactor").text("--");
                $("#twpm1p2w_W_Power").text("--");
                $("#twpm1p2w_Wh_Energy").text("--");
                $("#twpm1p2w_var_Power").text("--");
                $("#twpm1p2w_varh_Energy").text("--");
                $("#twpm1p2w_varhlead_Energy").text("--");
            }
            else {
                var termdata;
                $("#twpm1p2wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#twpm1p2w_A_Current").text(obj.Respons.Data.A_Current.Value + " [A]");
                $("#twpm1p2w_V_Voltage").text(obj.Respons.Data.V_Voltage.Value + " [V]");
                $("#twpm1p2w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#twpm1p2w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#twpm1p2w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#twpm1p2w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#twpm1p2w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#twpm1p2w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#twpm1p2w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twpm1p2w";
                var alert_str1 = "";
                var unknown = false;
                var twpmwarncheck = {
                    checkitem: [
                        {
                            ele: "A_Current",
                            content: setting.setting.set.AR.Title
                        },
                        {
                            ele: "V_Voltage",
                            content: setting.setting.set.VRS.Title
                        },
                        {
                            ele: "F_Frequency",
                            content: setting.setting.set.F.Title
                        },
                        {
                            ele: "PF_PowerFactor",
                            content: setting.setting.set.PF.Title
                        },
                        {
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        },
                        {
                            ele: "var_Power",
                            content: setting.setting.set.var.Title
                        }
                    ]
                }

                //DI
                for (var i = 0; i < twpmwarncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = twpmwarncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = twpmwarncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = twpmwarncheck.checkitem[i].content;
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
            $("#twpm1p2wupdated_time").text("データ更新：----/--/-- --:--");
            $("#twpm1p2w_A_Current").text("--");
            $("#twpm1p2w_V_Voltage").text("--");
            $("#twpm1p2w_F_Frequency").text("--");
            $("#twpm1p2w_PF_PowerFactor").text("--");
            $("#twpm1p2w_W_Power").text("--");
            $("#twpm1p2w_Wh_Energy").text("--");
            $("#twpm1p2w_var_Power").text("--");
            $("#twpm1p2w_varh_Energy").text("--");
            $("#twpm1p2w_varhlead_Energy").text("--");

            //警報状態
            term = "#alertH_twpm1p2w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}

/**
* TWPM1P3Wデータ
*/
function get_InsDatTWPM1P3W(setting, unitNo, unitSts) {
    var isNorequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twpm1p3wupdated_time").text("データ更新：----/--/-- --:--");
        $("#twpm1p3w_A1_Current").text("--");
        $("#twpm1p3w_AN_Current").text("--");
        $("#twpm1p3w_A2_Current").text("--");
        $("#twpm1p3w_V1N_Voltage").text("--");
        $("#twpm1p3w_V2N_Voltage").text("--");
        $("#twpm1p3w_V12_Voltage").text("--");
        $("#twpm1p3w_F_Frequency").text("--");
        $("#twpm1p3w_PF_PowerFactor").text("--");
        $("#twpm1p3w_W_Power").text("--");
        $("#twpm1p3w_Wh_Energy").text("--");
        $("#twpm1p3w_var_Power").text("--");
        $("#twpm1p3w_varh_Energy").text("--");
        $("#twpm1p3w_varhlead_Energy").text("--");

        var term = "#alertH_twpm1p3w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNorequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "twpm1p3w";

        $("#twpm1p3w_A1_Current_Title").text(setting.setting.set.AR.Title);
        $("#twpm1p3w_AN_Current_Title").text(setting.setting.set.AS.Title);
        $("#twpm1p3w_A2_Current_Title").text(setting.setting.set.AT.Title);
        $("#twpm1p3w_V1N_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#twpm1p3w_V2N_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#twpm1p3w_V12_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#twpm1p3w_F_Frequency_Title").text(setting.setting.set.F.Title);
        $("#twpm1p3w_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $("#twpm1p3w_W_Power_Title").text(setting.setting.set.W.Title);
        $("#twpm1p3w_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#twpm1p3w_var_Power_Title").text(setting.setting.set.var.Title);
        $("#twpm1p3w_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $("#twpm1p3w_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);

        //電流
        // A1
        $("#" + prefix + "_Title_A1").text(setting.setting.set.AR.Title);
        if (setting.setting.set.AR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_A1").css({ "display": "block" });
            $("#" + prefix + "_aH_A1").text("上限警報発生値:" + setting.setting.set.AR.Alarm[1].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_A1").css({ "display": "none" });
        }

        if (setting.setting.set.AR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_A1").css({ "display": "block" });
            $("#" + prefix + "_aL_A1").text("下限警報発生値:" + setting.setting.set.AR.Alarm[0].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_A1").css({ "display": "none" });
        }

        // AN
        $("#" + prefix + "_Title_AN").text(setting.setting.set.AS.Title);
        if (setting.setting.set.AS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AN").css({ "display": "block" });
            $("#" + prefix + "_aH_AN").text("上限警報発生値:" + setting.setting.set.AS.Alarm[1].toFixed(setting.setting.set.AS.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AN").css({ "display": "none" });
        }

        if (setting.setting.set.AS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AN").css({ "display": "block" });
            $("#" + prefix + "_aL_AN").text("下限警報発生値:" + setting.setting.set.AS.Alarm[0].toFixed(setting.setting.set.AS.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AN").css({ "display": "none" });
        }

        // A2
        $("#" + prefix + "_Title_A2").text(setting.setting.set.AT.Title);
        if (setting.setting.set.AT.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_A2").css({ "display": "block" });
            $("#" + prefix + "_aH_A2").text("上限警報発生値:" + setting.setting.set.AT.Alarm[1].toFixed(setting.setting.set.AT.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_A2").css({ "display": "none" });
        }

        if (setting.setting.set.AT.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_A2").css({ "display": "block" });
            $("#" + prefix + "_aL_A2").text("下限警報発生値:" + setting.setting.set.AT.Alarm[0].toFixed(setting.setting.set.AT.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_A2").css({ "display": "none" });
        }

        //電圧
        //V1N
        $("#" + prefix + "_Title_V1N").text(setting.setting.set.VRS.Title);
        if (setting.setting.set.VRS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_V1N").css({ "display": "block" });
            $("#" + prefix + "_aH_V1N").text("上限警報発生値:" + setting.setting.set.VRS.Alarm[1].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_V1N").css({ "display": "none" });
        }

        if (setting.setting.set.VRS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_V1N").css({ "display": "block" });
            $("#" + prefix + "_aL_V1N").text("下限警報発生値:" + setting.setting.set.VRS.Alarm[0].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_V1N").css({ "display": "none" });
        }

        //V2N
        $("#" + prefix + "_Title_V2N").text(setting.setting.set.VST.Title);
        if (setting.setting.set.VST.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_V2N").css({ "display": "block" });
            $("#" + prefix + "_aH_V2N").text("上限警報発生値:" + setting.setting.set.VST.Alarm[1].toFixed(setting.setting.set.VST.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_V2N").css({ "display": "none" });
        }

        if (setting.setting.set.VST.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_V2N").css({ "display": "block" });
            $("#" + prefix + "_aL_V2N").text("下限警報発生値:" + setting.setting.set.VST.Alarm[0].toFixed(setting.setting.set.VST.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_V2N").css({ "display": "none" });
        }

        // V12
        $("#" + prefix + "_Title_V12").text(setting.setting.set.VTR.Title);
        if (setting.setting.set.VTR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_V12").css({ "display": "block" });
            $("#" + prefix + "_aH_V12").text("上限警報発生値:" + setting.setting.set.VTR.Alarm[1].toFixed(setting.setting.set.VTR.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_V12").css({ "display": "none" });
        }

        if (setting.setting.set.VTR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_V12").css({ "display": "block" });
            $("#" + prefix + "_aL_V12").text("下限警報発生値:" + setting.setting.set.VTR.Alarm[0].toFixed(setting.setting.set.VTR.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_V12").css({ "display": "none" });
        }

        //周波数
        $("#" + prefix + "_Title_F").text(setting.setting.set.F.Title);
        if (setting.setting.set.F.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_F").css({ "display": "block" });
            $("#" + prefix + "_aH_F").text("上限警報発生値:" + setting.setting.set.F.Alarm[1].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aHE_F").css({ "display": "none" });
        }

        if (setting.setting.set.F.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_F").css({ "display": "block" });
            $("#" + prefix + "_aL_F").text("下限警報発生値:" + setting.setting.set.F.Alarm[0].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aLE_F").css({ "display": "none" });
        }

        //力率
        $("#" + prefix + "_Title_PF").text(setting.setting.set.PF.Title);
        if (setting.setting.set.PF.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_PF").css({ "display": "block" });
            $("#" + prefix + "_aH_PF").text("上限警報発生値:" + setting.setting.set.PF.Alarm[1].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aHE_PF").css({ "display": "none" });
        }

        if (setting.setting.set.PF.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_PF").css({ "display": "block" });
            $("#" + prefix + "_aL_PF").text("下限警報発生値:" + setting.setting.set.PF.Alarm[0].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aLE_PF").css({ "display": "none" });
        }

        //電力
        $("#" + prefix + "_Title_W").text(setting.setting.set.W.Title);
        if (setting.setting.set.W.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_W").css({ "display": "block" });
            $("#" + prefix + "_aH_W").text("上限警報発生値:" + setting.setting.set.Wh.Alarm[1].toFixed(setting.setting.set.Wh.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aHE_W").css({ "display": "none" });
        }

        if (setting.setting.set.W.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_W").css({ "display": "block" });
            $("#" + prefix + "_aL_W").text("下限警報発生値:" + setting.setting.set.W.Alarm[0].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aLE_W").css({ "display": "none" });
        }

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title);

        //電力量及び無効電力量は、警報対象外
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        //無効電力
        $("#" + prefix + "_Title_var").text(setting.setting.set.var.Title);
        if (setting.setting.set.var.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_var").css({ "display": "block" });
            $("#" + prefix + "_aH_var").text("上限警報発生値:" + setting.setting.set.var.Alarm[1].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aHE_var").css({ "display": "none" });
        }

        if (setting.setting.set.var.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_var").css({ "display": "block" });
            $("#" + prefix + "_aL_var").text("下限警報発生値:" + setting.setting.set.var.Alarm[0].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aLE_var").css({ "display": "none" });
        }

        //無効電力量
        $("#" + prefix + "_Title_varh").text(setting.setting.set.varh.Title);
        //電力量及び無効電力量は、警報対象外
        $("#" + prefix + "_aHE_varh").css({ "display": "none" });
        $("#" + prefix + "_aLE_varh").css({ "display": "none" });

        //無効電力量
        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        //電力量及び無効電力量は、警報対象外
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });
    }
    else {
        isNorequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (isNorequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#twpm1p3wupdated_time").text("データ更新：----/--/-- --:--");
                $("#twpm1p3w_A1_Current").text("--");
                $("#twpm1p3w_AN_Current").text("--");
                $("#twpm1p3w_A2_Current").text("--");
                $("#twpm1p3w_V1N_Voltage").text("--");
                $("#twpm1p3w_V2N_Voltage").text("--");
                $("#twpm1p3w_V12_Voltage").text("--");
                $("#twpm1p3w_F_Frequency").text("--");
                $("#twpm1p3w_PF_PowerFactor").text("--");
                $("#twpm1p3w_W_Power").text("--");
                $("#twpm1p3w_Wh_Energy").text("--");
                $("#twpm1p3w_var_Power").text("--");
                $("#twpm1p3w_varh_Energy").text("--");
                $("#twpm1p3w_varhlead_Energy").text("--");
            }
            // データがある
            else {
                var termdata;
                $("#twpm1p3wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#twpm1p3w_A1_Current").text(obj.Respons.Data.A1_Current.Value + " [A]");
                $("#twpm1p3w_AN_Current").text(obj.Respons.Data.AN_Current.Value + " [A]");
                $("#twpm1p3w_A2_Current").text(obj.Respons.Data.A2_Current.Value + " [A]");
                $("#twpm1p3w_V1N_Voltage").text(obj.Respons.Data.V1N_Voltage.Value + " [V]");
                $("#twpm1p3w_V2N_Voltage").text(obj.Respons.Data.V2N_Voltage.Value + " [V]");
                $("#twpm1p3w_V12_Voltage").text(obj.Respons.Data.V12_Voltage.Value + " [V]");
                $("#twpm1p3w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#twpm1p3w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#twpm1p3w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#twpm1p3w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#twpm1p3w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#twpm1p3w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#twpm1p3w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twpm1p3w";
                var alert_str1 = "";
                var unknown = false;
                var twpmwarncheck = {
                    checkitem: [
                        {
                            ele: "A1_Current",
                            content: setting.setting.set.AR.Title
                        },
                        {
                            ele: "AN_Current",
                            content: setting.setting.set.AS.Title
                        },
                        {
                            ele: "A2_Current",
                            content: setting.setting.set.AT.Title
                        },
                        {
                            ele: "V1N_Voltage",
                            content: setting.setting.set.VRS.Title
                        },
                        {
                            ele: "V2N_Voltage",
                            content: setting.setting.set.VST.Title
                        },
                        {
                            ele: "V12_Voltage",
                            content: setting.setting.set.VTR.Title
                        },
                        {
                            ele: "F_Frequency",
                            content: setting.setting.set.F.Title
                        },
                        {
                            ele: "PF_PowerFactor",
                            content: setting.setting.set.PF.Title
                        },
                        {
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        },
                        {
                            ele: "var_Power",
                            content: setting.setting.set.var.Title
                        }
                    ]
                }

                //DI
                for (var i = 0; i < twpmwarncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = twpmwarncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = twpmwarncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = twpmwarncheck.checkitem[i].content;
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
            $("#twpm1p3wupdated_time").text("データ更新：----/--/-- --:--");
            $("#twpm1p3w_A1_Current").text("--");
            $("#twpm1p3w_AN_Current").text("--");
            $("#twpm1p3w_A2_Current").text("--");
            $("#twpm1p3w_V1N_Voltage").text("--");
            $("#twpm1p3w_V2N_Voltage").text("--");
            $("#twpm1p3w_V12_Voltage").text("--");
            $("#twpm1p3w_F_Frequency").text("--");
            $("#twpm1p3w_PF_PowerFactor").text("--");
            $("#twpm1p3w_W_Power").text("--");
            $("#twpm1p3w_Wh_Energy").text("--");
            $("#twpm1p3w_var_Power").text("--");
            $("#twpm1p3w_varh_Energy").text("--");
            $("#twpm1p3w_varhlead_Energy").text("--");

            //警報状態
            term = "#alertH_twpm1p3w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}

/**
* TWPM3P3Wデータ
*/
function get_InsDatTWPM3P3W(setting, unitNo, unitSts) {
    var isNorequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twpm3p3wupdated_time").text("データ更新：----/--/-- --:--");
        $("#twpm3p3w_AR_Current").text("--");
        $("#twpm3p3w_AS_Current").text("--");
        $("#twpm3p3w_AT_Current").text("--");
        $("#twpm3p3w_VRS_Voltage").text("--");
        $("#twpm3p3w_VST_Voltage").text("--");
        $("#twpm3p3w_VTR_Voltage").text("--");
        $("#twpm3p3w_F_Frequency").text("--");
        $("#twpm3p3w_PF_PowerFactor").text("--");
        $("#twpm3p3w_W_Power").text("--");
        $("#twpm3p3w_Wh_Energy").text("--");
        $("#twpm3p3w_var_Power").text("--");
        $("#twpm3p3w_varh_Energy").text("--");
        $("#twpm3p3w_varhlead_Energy").text("--");

        var term = "#alertH_twpm3p3w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNorequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "twpm3p3w";

        $("#twpm3p3w_AR_Current_Title").text(setting.setting.set.AR.Title);
        $("#twpm3p3w_AS_Current_Title").text(setting.setting.set.AS.Title);
        $("#twpm3p3w_AT_Current_Title").text(setting.setting.set.AT.Title);
        $("#twpm3p3w_VRS_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#twpm3p3w_VST_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#twpm3p3w_VTR_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#twpm3p3w_F_Frequency_Title").text(setting.setting.set.F.Title);
        $("#twpm3p3w_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $("#twpm3p3w_W_Power_Title").text(setting.setting.set.W.Title);
        $("#twpm3p3w_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#twpm3p3w_var_Power_Title").text(setting.setting.set.var.Title);
        $("#twpm3p3w_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $("#twpm3p3w_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);

        //電流
        $("#" + prefix + "_Title_AR").text(setting.setting.set.AR.Title);
        if (setting.setting.set.AR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AR").css({ "display": "block" });
            $("#" + prefix + "_aH_AR").text("上限警報発生値:" + setting.setting.set.AR.Alarm[1].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AR").css({ "display": "none" });
        }

        if (setting.setting.set.AR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AR").css({ "display": "block" });
            $("#" + prefix + "_aL_AR").text("下限警報発生値:" + setting.setting.set.AR.Alarm[0].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AR").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_AS").text(setting.setting.set.AS.Title);
        if (setting.setting.set.AS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AS").css({ "display": "block" });
            $("#" + prefix + "_aH_AS").text("上限警報発生値:" + setting.setting.set.AS.Alarm[1].toFixed(setting.setting.set.AS.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AS").css({ "display": "none" });
        }

        if (setting.setting.set.AS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AS").css({ "display": "block" });
            $("#" + prefix + "_aL_AS").text("下限警報発生値:" + setting.setting.set.AS.Alarm[0].toFixed(setting.setting.set.AS.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AS").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_AT").text(setting.setting.set.AT.Title);
        if (setting.setting.set.AT.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AT").css({ "display": "block" });
            $("#" + prefix + "_aH_AT").text("上限警報発生値:" + setting.setting.set.AT.Alarm[1].toFixed(setting.setting.set.AT.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AT").css({ "display": "none" });
        }

        if (setting.setting.set.AT.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AT").css({ "display": "block" });
            $("#" + prefix + "_aL_AT").text("下限警報発生値:" + setting.setting.set.AT.Alarm[0].toFixed(setting.setting.set.AT.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AT").css({ "display": "none" });
        }

        //電圧
        $("#" + prefix + "_Title_VRS").text(setting.setting.set.VRS.Title);
        if (setting.setting.set.VRS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VRS").css({ "display": "block" });
            $("#" + prefix + "_aH_VRS").text("上限警報発生値:" + setting.setting.set.VRS.Alarm[1].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VRS").css({ "display": "none" });
        }

        if (setting.setting.set.VRS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VRS").css({ "display": "block" });
            $("#" + prefix + "_aL_VRS").text("下限警報発生値:" + setting.setting.set.VRS.Alarm[0].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VRS").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_VST").text(setting.setting.set.VST.Title);
        if (setting.setting.set.VST.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VST").css({ "display": "block" });
            $("#" + prefix + "_aH_VST").text("上限警報発生値:" + setting.setting.set.VST.Alarm[1].toFixed(setting.setting.set.VST.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VST").css({ "display": "none" });
        }

        if (setting.setting.set.VST.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VST").css({ "display": "block" });
            $("#" + prefix + "_aL_VST").text("下限警報発生値:" + setting.setting.set.VST.Alarm[0].toFixed(setting.setting.set.VST.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VST").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_VTR").text(setting.setting.set.VTR.Title);
        if (setting.setting.set.VTR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VTR").css({ "display": "block" });
            $("#" + prefix + "_aH_VTR").text("上限警報発生値:" + setting.setting.set.VTR.Alarm[1].toFixed(setting.setting.set.VTR.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VTR").css({ "display": "none" });
        }

        if (setting.setting.set.VTR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VTR").css({ "display": "block" });
            $("#" + prefix + "_aL_VTR").text("下限警報発生値:" + setting.setting.set.VTR.Alarm[0].toFixed(setting.setting.set.VTR.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VTR").css({ "display": "none" });
        }

        //周波数
        $("#" + prefix + "_Title_F").text(setting.setting.set.F.Title);
        if (setting.setting.set.F.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_F").css({ "display": "block" });
            $("#" + prefix + "_aH_F").text("上限警報発生値:" + setting.setting.set.F.Alarm[1].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aHE_F").css({ "display": "none" });
        }

        if (setting.setting.set.F.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_F").css({ "display": "block" });
            $("#" + prefix + "_aL_F").text("下限警報発生値:" + setting.setting.set.F.Alarm[0].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aLE_F").css({ "display": "none" });
        }

        //力率
        $("#" + prefix + "_Title_PF").text(setting.setting.set.PF.Title);
        if (setting.setting.set.PF.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_PF").css({ "display": "block" });
            $("#" + prefix + "_aH_PF").text("上限警報発生値:" + setting.setting.set.PF.Alarm[1].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aHE_PF").css({ "display": "none" });
        }

        if (setting.setting.set.PF.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_PF").css({ "display": "block" });
            $("#" + prefix + "_aL_PF").text("下限警報発生値:" + setting.setting.set.PF.Alarm[0].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aLE_PF").css({ "display": "none" });
        }

        //電力
        $("#" + prefix + "_Title_W").text(setting.setting.set.W.Title);
        if (setting.setting.set.W.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_W").css({ "display": "block" });
            $("#" + prefix + "_aH_W").text("上限警報発生値:" + setting.setting.set.W.Alarm[1].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aHE_W").css({ "display": "none" });
        }

        if (setting.setting.set.W.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_W").css({ "display": "block" });
            $("#" + prefix + "_aL_W").text("下限警報発生値:" + setting.setting.set.W.Alarm[0].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aLE_W").css({ "display": "none" });
        }

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title);
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        //無効電力
        $("#" + prefix + "_Title_var").text(setting.setting.set.var.Title);
        if (setting.setting.set.var.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_var").css({ "display": "block" });
            $("#" + prefix + "_aH_var").text("上限警報発生値:" + setting.setting.set.var.Alarm[1].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aHE_var").css({ "display": "none" });
        }

        if (setting.setting.set.var.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_var").css({ "display": "block" });
            $("#" + prefix + "_aL_var").text("下限警報発生値:" + setting.setting.set.var.Alarm[0].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aLE_var").css({ "display": "none" });
        }

        //無効電力量
        $("#" + prefix + "_Title_varh").text(setting.setting.set.varh.Title);
        $("#" + prefix + "_aHE_varh").css({ "display": "none" });
        $("#" + prefix + "_aLE_varh").css({ "display": "none" });

        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });
    }
    else {
        isNorequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (isNorequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#twpm3p3wupdated_time").text("データ更新：----/--/-- --:--");
                $("#twpm3p3w_AR_Current").text("--");
                $("#twpm3p3w_AS_Current").text("--");
                $("#twpm3p3w_AT_Current").text("--");
                $("#twpm3p3w_VRS_Voltage").text("--");
                $("#twpm3p3w_VST_Voltage").text("--");
                $("#twpm3p3w_VTR_Voltage").text("--");
                $("#twpm3p3w_F_Frequency").text("--");
                $("#twpm3p3w_PF_PowerFactor").text("--");
                $("#twpm3p3w_W_Power").text("--");
                $("#twpm3p3w_Wh_Energy").text("--");
                $("#twpm3p3w_var_Power").text("--");
                $("#twpm3p3w_varh_Energy").text("--");
                $("#twpm3p3w_varhlead_Energy").text("--");
            }
            else {
                var termdata;
                $("#twpm3p3wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#twpm3p3w_AR_Current").text(obj.Respons.Data.AR_Current.Value + " [A]");
                $("#twpm3p3w_AS_Current").text(obj.Respons.Data.AS_Current.Value + " [A]");
                $("#twpm3p3w_AT_Current").text(obj.Respons.Data.AT_Current.Value + " [A]");
                $("#twpm3p3w_VRS_Voltage").text(obj.Respons.Data.VRS_Voltage.Value + " [V]");
                $("#twpm3p3w_VST_Voltage").text(obj.Respons.Data.VST_Voltage.Value + " [V]");
                $("#twpm3p3w_VTR_Voltage").text(obj.Respons.Data.VTR_Voltage.Value + " [V]");
                $("#twpm3p3w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#twpm3p3w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#twpm3p3w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#twpm3p3w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#twpm3p3w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#twpm3p3w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#twpm3p3w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twpm3p3w";
                var alert_str1 = "";
                var unknown = false;
                var twpmwarncheck = {
                    checkitem: [
                        {
                            ele: "AR_Current",
                            content: setting.setting.set.AR.Title
                        },
                        {
                            ele: "AS_Current",
                            content: setting.setting.set.AS.Title
                        },
                        {
                            ele: "AT_Current",
                            content: setting.setting.set.AT.Title
                        },
                        {
                            ele: "VRS_Voltage",
                            content: setting.setting.set.VRS.Title
                        },
                        {
                            ele: "VST_Voltage",
                            content: setting.setting.set.VST.Title
                        },
                        {
                            ele: "VTR_Voltage",
                            content: setting.setting.set.VTR.Title
                        },
                        {
                            ele: "F_Frequency",
                            content: setting.setting.set.F.Title
                        },
                        {
                            ele: "PF_PowerFactor",
                            content: setting.setting.set.PF.Title
                        },
                        {
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        },
                        {
                            ele: "var_Power",
                            content: setting.setting.set.var.Title
                        }
                    ]
                }

                //DI
                for (var i = 0; i < twpmwarncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = twpmwarncheck.checkitem[i].content
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = twpmwarncheck.checkitem[i].content
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = twpmwarncheck.checkitem[i].content
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
            $("#twpm3p3wupdated_time").text("データ更新：----/--/-- --:--");
            $("#twpm3p3w_AR_Current").text("--");
            $("#twpm3p3w_AS_Current").text("--");
            $("#twpm3p3w_AT_Current").text("--");
            $("#twpm3p3w_VRS_Voltage").text("--");
            $("#twpm3p3w_VST_Voltage").text("--");
            $("#twpm3p3w_VTR_Voltage").text("--");
            $("#twpm3p3w_F_Frequency").text("--");
            $("#twpm3p3w_PF_PowerFactor").text("--");
            $("#twpm3p3w_W_Power").text("--");
            $("#twpm3p3w_Wh_Energy").text("--");
            $("#twpm3p3w_var_Power").text("--");
            $("#twpm3p3w_varh_Energy").text("--");
            $("#twpm3p3w_varhlead_Energy").text("--");

            //警報状態
            term = "#alertH_twpm3p3w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");

        }
    }, setting);
}

/**
* TWPM3P4Wデータ
*/
function get_InsDatTWPM3P4W(setting, unitNo, unitSts) {
    var isNorequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#twpm3p4wupdated_time").text("データ更新：----/--/-- --:--");
        $("#twpm3p4w_AR_Current").text("--");
        $("#twpm3p4w_AS_Current").text("--");
        $("#twpm3p4w_AT_Current").text("--");
        $("#twpm3p4w_AN_Current").text("--");
        $("#twpm3p4w_VRS_Voltage").text("--");
        $("#twpm3p4w_VST_Voltage").text("--");
        $("#twpm3p4w_VTR_Voltage").text("--");
        $("#twpm3p4w_VRN_Voltage").text("--");
        $("#twpm3p4w_VSN_Voltage").text("--");
        $("#twpm3p4w_VTN_Voltage").text("--");
        $("#twpm3p4w_F_Frequency").text("--");
        $("#twpm3p4w_PF_PowerFactor").text("--");
        $("#twpm3p4w_W_Power").text("--");
        $("#twpm3p4w_Wh_Energy").text("--");
        $("#twpm3p4w_var_Power").text("--");
        $("#twpm3p4w_varh_Energy").text("--");
        $("#twpm3p4w_varhlead_Energy").text("--");

        var term = "#alertH_twpm3p4w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        isNorequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "twpm3p4w";

        $("#twpm3p4w_AR_Current_Title").text(setting.setting.set.AR.Title);
        $("#twpm3p4w_AS_Current_Title").text(setting.setting.set.AS.Title);
        $("#twpm3p4w_AT_Current_Title").text(setting.setting.set.AT.Title);
        $("#twpm3p4w_AN_Current_Title").text(setting.setting.set.AN.Title);
        $("#twpm3p4w_VRS_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#twpm3p4w_VST_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#twpm3p4w_VTR_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#twpm3p4w_VRN_Voltage_Title").text(setting.setting.set.VRN.Title);
        $("#twpm3p4w_VSN_Voltage_Title").text(setting.setting.set.VSN.Title);
        $("#twpm3p4w_VTN_Voltage_Title").text(setting.setting.set.VTN.Title);
        $("#twpm3p4w_F_Frequency_Title").text(setting.setting.set.F.Title);
        $("#twpm3p4w_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $("#twpm3p4w_W_Power_Title").text(setting.setting.set.W.Title);
        $("#twpm3p4w_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#twpm3p4w_var_Power_Title").text(setting.setting.set.var.Title);
        $("#twpm3p4w_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $("#twpm3p4w_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);

        //電流
        $("#" + prefix + "_Title_AR").text(setting.setting.set.AR.Title);
        if (setting.setting.set.AR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AR").css({ "display": "block" });
            $("#" + prefix + "_aH_AR").text("上限警報発生値:" + setting.setting.set.AR.Alarm[1].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AR").css({ "display": "none" });
        }

        if (setting.setting.set.AR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AR").css({ "display": "block" });
            $("#" + prefix + "_aL_AR").text("下限警報発生値:" + setting.setting.set.AR.Alarm[0].toFixed(setting.setting.set.AR.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AR").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_AS").text(setting.setting.set.AS.Title);
        if (setting.setting.set.AS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AS").css({ "display": "block" });
            $("#" + prefix + "_aH_AS").text("上限警報発生値:" + setting.setting.set.AS.Alarm[1].toFixed(setting.setting.set.AS.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AS").css({ "display": "none" });
        }

        if (setting.setting.set.AS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AS").css({ "display": "block" });
            $("#" + prefix + "_aL_AS").text("下限警報発生値:" + setting.setting.set.AS.Alarm[0].toFixed(setting.setting.set.AS.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AS").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_AT").text(setting.setting.set.AT.Title);
        if (setting.setting.set.AT.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AT").css({ "display": "block" });
            $("#" + prefix + "_aH_AT").text("上限警報発生値:" + setting.setting.set.AT.Alarm[1].toFixed(setting.setting.set.AT.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AT").css({ "display": "none" });
        }

        if (setting.setting.set.AT.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AT").css({ "display": "block" });
            $("#" + prefix + "_aL_AT").text("下限警報発生値:" + setting.setting.set.AT.Alarm[0].toFixed(setting.setting.set.AT.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AT").css({ "display": "none" });
        }

        $("#" + prefix + "_Title_AN").text(setting.setting.set.AN.Title);
        if (setting.setting.set.AN.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_AN").css({ "display": "block" });
            $("#" + prefix + "_aH_AN").text("上限警報発生値:" + setting.setting.set.AN.Alarm[1].toFixed(setting.setting.set.AN.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aHE_AN").css({ "display": "none" });
        }

        if (setting.setting.set.AN.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_AN").css({ "display": "block" });
            $("#" + prefix + "_aL_AN").text("下限警報発生値:" + setting.setting.set.AN.Alarm[0].toFixed(setting.setting.set.AN.Point) + " [A]");
        }
        else {
            $("#" + prefix + "_aLE_AN").css({ "display": "none" });
        }

        //電圧
        //RS
        $("#" + prefix + "_Title_VRS").text(setting.setting.set.VRS.Title);
        if (setting.setting.set.VRS.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VRS").css({ "display": "block" });
            $("#" + prefix + "_aH_VRS").text("上限警報発生値:" + setting.setting.set.VRS.Alarm[1].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VRS").css({ "display": "none" });
        }

        if (setting.setting.set.VRS.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VRS").css({ "display": "block" });
            $("#" + prefix + "_aL_VRS").text("下限警報発生値:" + setting.setting.set.VRS.Alarm[0].toFixed(setting.setting.set.VRS.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VRS").css({ "display": "none" });
        }

        //ST
        $("#" + prefix + "_Title_VST").text(setting.setting.set.VST.Title);
        if (setting.setting.set.VST.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VST").css({ "display": "block" });
            $("#" + prefix + "_aH_VST").text("上限警報発生値:" + setting.setting.set.VST.Alarm[1].toFixed(setting.setting.set.VST.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VST").css({ "display": "none" });
        }

        if (setting.setting.set.VST.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VST").css({ "display": "block" });
            $("#" + prefix + "_aL_VST").text("下限警報発生値:" + setting.setting.set.VST.Alarm[0].toFixed(setting.setting.set.VST.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VST").css({ "display": "none" });
        }

        //TR
        $("#" + prefix + "_Title_VTR").text(setting.setting.set.VTR.Title);
        if (setting.setting.set.VTR.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VTR").css({ "display": "block" });
            $("#" + prefix + "_aH_VTR").text("上限警報発生値:" + setting.setting.set.VTR.Alarm[1].toFixed(setting.setting.set.VTR.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VTR").css({ "display": "none" });
        }

        if (setting.setting.set.VTR.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VTR").css({ "display": "block" });
            $("#" + prefix + "_aL_VTR").text("下限警報発生値:" + setting.setting.set.VTR.Alarm[0].toFixed(setting.setting.set.VTR.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VTR").css({ "display": "none" });
        }

        //RN
        $("#" + prefix + "_Title_VRN").text(setting.setting.set.VRN.Title);
        if (setting.setting.set.VRN.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VRN").css({ "display": "block" });
            $("#" + prefix + "_aH_VRN").text("上限警報発生値:" + setting.setting.set.VRN.Alarm[1].toFixed(setting.setting.set.VRN.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VRN").css({ "display": "none" });
        }

        if (setting.setting.set.VRN.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VRN").css({ "display": "block" });
            $("#" + prefix + "_aL_VRN").text("下限警報発生値:" + setting.setting.set.VRN.Alarm[0].toFixed(setting.setting.set.VRN.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VRN").css({ "display": "none" });
        }

        //SN
        $("#" + prefix + "_Title_VSN").text(setting.setting.set.VSN.Title);
        if (setting.setting.set.VSN.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VSN").css({ "display": "block" });
            $("#" + prefix + "_aH_VSN").text("上限警報発生値:" + setting.setting.set.VSN.Alarm[1].toFixed(setting.setting.set.VSN.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VSN").css({ "display": "none" });
        }

        if (setting.setting.set.VSN.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VSN").css({ "display": "block" });
            $("#" + prefix + "_aL_VSN").text("下限警報発生値:" + setting.setting.set.VSN.Alarm[0].toFixed(setting.setting.set.VSN.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VSN").css({ "display": "none" });
        }

        //TN
        $("#" + prefix + "_Title_VTN").text(setting.setting.set.VTN.Title);
        if (setting.setting.set.VTN.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_VTN").css({ "display": "block" });
            $("#" + prefix + "_aH_VTN").text("上限警報発生値:" + setting.setting.set.VTN.Alarm[1].toFixed(setting.setting.set.VTN.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aHE_VTN").css({ "display": "none" });
        }

        if (setting.setting.set.VTN.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_VTN").css({ "display": "block" });
            $("#" + prefix + "_aL_VTN").text("下限警報発生値:" + setting.setting.set.VTN.Alarm[0].toFixed(setting.setting.set.VTN.Point) + " [V]");
        }
        else {
            $("#" + prefix + "_aLE_VTN").css({ "display": "none" });
        }


        //周波数
        $("#" + prefix + "_Title_F").text(setting.setting.set.F.Title);
        if (setting.setting.set.F.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_F").css({ "display": "block" });
            $("#" + prefix + "_aH_F").text("上限警報発生値:" + setting.setting.set.F.Alarm[1].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aHE_F").css({ "display": "none" });
        }

        if (setting.setting.set.F.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_F").css({ "display": "block" });
            $("#" + prefix + "_aL_F").text("下限警報発生値:" + setting.setting.set.F.Alarm[0].toFixed(setting.setting.set.F.Point) + " [Hz]");
        }
        else {
            $("#" + prefix + "_aLE_F").css({ "display": "none" });
        }

        //力率
        $("#" + prefix + "_Title_PF").text(setting.setting.set.PF.Title);
        if (setting.setting.set.PF.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_PF").css({ "display": "block" });
            $("#" + prefix + "_aH_PF").text("上限警報発生値:" + setting.setting.set.PF.Alarm[1].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aHE_PF").css({ "display": "none" });
        }

        if (setting.setting.set.PF.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_PF").css({ "display": "block" });
            $("#" + prefix + "_aL_PF").text("下限警報発生値:" + setting.setting.set.PF.Alarm[0].toFixed(setting.setting.set.PF.Point) + " [%]");
        }
        else {
            $("#" + prefix + "_aLE_PF").css({ "display": "none" });
        }

        //電力
        $("#" + prefix + "_Title_W").text(setting.setting.set.W.Title);
        if (setting.setting.set.W.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_W").css({ "display": "block" });
            $("#" + prefix + "_aH_W").text("上限警報発生値:" + setting.setting.set.W.Alarm[1].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aHE_W").css({ "display": "none" });
        }

        if (setting.setting.set.W.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_W").css({ "display": "block" });
            $("#" + prefix + "_aL_W").text("下限警報発生値:" + setting.setting.set.W.Alarm[0].toFixed(setting.setting.set.W.Point) + " [kW]");
        }
        else {
            $("#" + prefix + "_aLE_W").css({ "display": "none" });
        }

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title);
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        //無効電力
        $("#" + prefix + "_Title_var").text(setting.setting.set.var.Title);
        if (setting.setting.set.var.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_var").css({ "display": "block" })
            $("#" + prefix + "_aH_var").text("上限警報発生値:" + setting.setting.set.var.Alarm[1].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aHE_var").css({ "display": "none" });
        }

        if (setting.setting.set.var.AlarmE[0] !== 0) {
            $("#" + prefix + "_aLE_var").css({ "display": "block" });
            $("#" + prefix + "_aL_var").text("下限警報発生値:" + setting.setting.set.var.Alarm[0].toFixed(setting.setting.set.var.Point) + " [kvar]");
        }
        else {
            $("#" + prefix + "_aLE_var").css({ "display": "none" });
        }

        //無効電力量
        $("#" + prefix + "_Title_varh").text(setting.setting.set.varh.Title);
        $("#" + prefix + "_aHE_varh").css({ "display": "none" });
        $("#" + prefix + "_aLE_varh").css({ "display": "none" });

        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });
    }
    else {
        isNorequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (isNorequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#twpm3p4wupdated_time").text("データ更新：----/--/-- --:--");
                $("#twpm3p4w_AR_Current").text("--");
                $("#twpm3p4w_AS_Current").text("--");
                $("#twpm3p4w_AT_Current").text("--");
                $("#twpm3p4w_AN_Current").text("--");
                $("#twpm3p4w_VRS_Voltage").text("--");
                $("#twpm3p4w_VST_Voltage").text("--");
                $("#twpm3p4w_VTR_Voltage").text("--");
                $("#twpm3p4w_VRN_Voltage").text("--");
                $("#twpm3p4w_VSN_Voltage").text("--");
                $("#twpm3p4w_VTN_Voltage").text("--");
                $("#twpm3p4w_F_Frequency").text("--");
                $("#twpm3p4w_PF_PowerFactor").text("--");
                $("#twpm3p4w_W_Power").text("--");
                $("#twpm3p4w_Wh_Energy").text("--");
                $("#twpm3p4w_var_Power").text("--");
                $("#twpm3p4w_varh_Energy").text("--");
                $("#twpm3p4w_varhlead_Energy").text("--");
            }
            // データがある
            else {
                var termdata;
                $("#twpm3p4wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#twpm3p4w_AR_Current").text(obj.Respons.Data.AR_Current.Value + " [A]");
                $("#twpm3p4w_AS_Current").text(obj.Respons.Data.AS_Current.Value + " [A]");
                $("#twpm3p4w_AT_Current").text(obj.Respons.Data.AT_Current.Value + " [A]");
                $("#twpm3p4w_AN_Current").text(obj.Respons.Data.AN_Current.Value + " [A]");
                $("#twpm3p4w_VRS_Voltage").text(obj.Respons.Data.VRS_Voltage.Value + " [V]");
                $("#twpm3p4w_VST_Voltage").text(obj.Respons.Data.VST_Voltage.Value + " [V]");
                $("#twpm3p4w_VTR_Voltage").text(obj.Respons.Data.VTR_Voltage.Value + " [V]");
                $("#twpm3p4w_VRN_Voltage").text(obj.Respons.Data.VRN_Voltage.Value + " [V]");
                $("#twpm3p4w_VSN_Voltage").text(obj.Respons.Data.VSN_Voltage.Value + " [V]");
                $("#twpm3p4w_VTN_Voltage").text(obj.Respons.Data.VTN_Voltage.Value + " [V]");
                $("#twpm3p4w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#twpm3p4w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#twpm3p4w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#twpm3p4w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#twpm3p4w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#twpm3p4w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#twpm3p4w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_twpm3p4w";
                var alert_str1 = "";
                var unknown = false;

                var twpmwarncheck = {
                    checkitem: [
                        {
                            ele: "AR_Current",
                            content: setting.setting.set.AR.Title
                        },
                        {
                            ele: "AS_Current",
                            content: setting.setting.set.AS.Title
                        },
                        {
                            ele: "AT_Current",
                            content: setting.setting.set.AT.Title
                        },
                        {
                            ele: "AN_Current",
                            content: setting.setting.set.AN.Title
                        },
                        {
                            ele: "VRS_Voltage",
                            content: setting.setting.set.VRS.Title
                        },
                        {
                            ele: "VST_Voltage",
                            content: setting.setting.set.VST.Title
                        },
                        {
                            ele: "VTR_Voltage",
                            content: setting.setting.set.VTR.Title
                        },
                        {
                            ele: "VRN_Voltage",
                            content: setting.setting.set.VRN.Title
                        },
                        {
                            ele: "VSN_Voltage",
                            content: setting.setting.set.VSN.Title
                        },
                        {
                            ele: "VTN_Voltage",
                            content: setting.setting.set.VTN.Title
                        },
                        {
                            ele: "F_Frequency",
                            content: setting.setting.set.F.Title
                        },
                        {
                            ele: "PF_PowerFactor",
                            content: setting.setting.set.PF.Title
                        },
                        {
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        },
                        {
                            ele: "var_Power",
                            content: setting.setting.set.var.Title
                        }
                    ]
                }

                //DI
                for (var i = 0; i < twpmwarncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[twpmwarncheck.checkitem[i].ele].State, 16);
                    //上限警報発生値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = twpmwarncheck.checkitem[i].content
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = twpmwarncheck.checkitem[i].content
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = twpmwarncheck.checkitem[i].content
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
            $("#twpm3p4wupdated_time").text("データ更新：----/--/-- --:--");
            $("#twpm3p4w_AR_Current").text("--");
            $("#twpm3p4w_AS_Current").text("--");
            $("#twpm3p4w_AT_Current").text("--");
            $("#twpm3p4w_AN_Current").text("--");
            $("#twpm3p4w_VRS_Voltage").text("--");
            $("#twpm3p4w_VST_Voltage").text("--");
            $("#twpm3p4w_VTR_Voltage").text("--");
            $("#twpm3p4w_VRN_Voltage").text("--");
            $("#twpm3p4w_VSN_Voltage").text("--");
            $("#twpm3p4w_VTN_Voltage").text("--");
            $("#twpm3p4w_F_Frequency").text("--");
            $("#twpm3p4w_PF_PowerFactor").text("--");
            $("#twpm3p4w_W_Power").text("--");
            $("#twpm3p4w_Wh_Energy").text("--");
            $("#twpm3p4w_var_Power").text("--");
            $("#twpm3p4w_varh_Energy").text("--");
            $("#twpm3p4w_varhlead_Energy").text("--");

            //警報状態
            term = "#alertH_twpm3p4w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}


/**
* TWPM Data display clear
*/
function fncTWPMDspClr(tvid) {
    $('#' + tvid + "updated_time").text("データ更新：----/--/-- --:--");
    $('#' + tvid + "A_Curr").text("");
    $('#' + tvid + "V_Voltage").text("");
    $('#' + tvid + "F_Frequency").text("");
    $('#' + tvid + "PF").text("");
    $('#' + tvid + "W_Power").text("");
    $('#' + tvid + "Wh_Energy").text("");
    $('#' + tvid + "var_Power").text("");
    $('#' + tvid + "varh_Energy").text("");
    $('#' + tvid + "varhlead_Energy").text("");
}


/* TWPM 3P4Wダイナミク瞬時データ表示作成 */
function fncTWPM3P4WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwpmtitle" class="h5 m-0 ">twpmtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
            \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <td id="AR_Current_Title" class="text-center table-active font-weight-bold">R相電流</td> \
                            <td id="AR_Current" colspan="2" class="text-right">--</td> \
                            <td id="AS_Current_Title" class="text-center table-active font-weight-bold">S相電流</td> \
                            <td id="AS_Current" colspan="2" class="text-right">--</td> \
                            <td id="AT_Current_Title" class="text-center table-active font-weight-bold">T相電流</td> \
                            <td id="AT_Current" colspan="2" class="text-right">--</td> \
                            <td id="AN_Current_Title" class="text-center table-active font-weight-bold">N相電流</td> \
                            <td id="AN_Current" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="VRS_Voltage_Title" class="text-center table-active font-weight-bold">R-S線間電圧</td> \
                            <td id="VRS_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="VST_Voltage_Title" class="text-center table-active font-weight-bold">S-T線間電圧</td> \
                            <td id="VST_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="VTR_Voltage_Title" class="text-center table-active font-weight-bold">T-R線間電圧</td> \
                            <td id="VTR_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="VRN_Voltage_Title" class="text-center table-active font-weight-bold">R-N相電圧</td> \
                            <td id="VRN_Voltage" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="VSN_Voltage_Title" class="text-center table-active font-weight-bold">S-N相電圧</td> \
                            <td id="VSN_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="VTN_Voltage_Title" class="text-center table-active font-weight-bold">T-N相電圧</td> \
                            <td id="VTN_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="F_Frequency_Title" class="text-center table-active font-weight-bold">周波数</td> \
                            <td id="F_Frequency" colspan="2" class="text-right">--</td> \
                            <td id="PF_PowerFactor_Title" class="text-center table-active font-weight-bold">力率</td> \
                            <td id="PF_PowerFactor" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="var_Power_Title" class="text-center table-active font-weight-bold">無効電力</td> \
                            <td id="var_Power" colspan="2" class="text-right">--</td> \
                            <td id="varh_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lag)</td> \
                            <td id="varh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varhlead_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lead)</td> \
                            <td id="varhlead_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/AR_Current/g, tvid + "AR_Current");
    rtnval = rtnval.replace(/AS_Current/g, tvid + "AS_Current");
    rtnval = rtnval.replace(/AT_Current/g, tvid + "AT_Current");
    rtnval = rtnval.replace(/AN_Current/g, tvid + "AN_Current");
    rtnval = rtnval.replace(/VRS_Voltage/g, tvid + "VRS_Voltage");
    rtnval = rtnval.replace(/VST_Voltage/g, tvid + "VST_Voltage");
    rtnval = rtnval.replace(/VTR_Voltage/g, tvid + "VTR_Voltage");
    rtnval = rtnval.replace(/VRN_Voltage/g, tvid + "VRN_Voltage");
    rtnval = rtnval.replace(/VSN_Voltage/g, tvid + "VSN_Voltage");
    rtnval = rtnval.replace(/VTN_Voltage/g, tvid + "VTN_Voltage");
    rtnval = rtnval.replace(/F_Frequency/g, tvid + "F_Frequency");
    rtnval = rtnval.replace(/PF_PowerFactor/g, tvid + "PF_PowerFactor");
    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/var_Power/g, tvid + "var_Power");
    rtnval = rtnval.replace(/varh_Energy/g, tvid + "varh_Energy");
    rtnval = rtnval.replace(/varhlead_Energy/g, tvid + "varhlead_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/twpmtitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataTWPM3P4W(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "AR_Current").text("--");
        $('#' + tvid + "AS_Current").text("--");
        $('#' + tvid + "AT_Current").text("--");
        $('#' + tvid + "AN_Current").text("--");
        $('#' + tvid + "VRS_Voltage").text("--");
        $('#' + tvid + "VST_Voltage").text("--");
        $('#' + tvid + "VTR_Voltage").text("--");
        $('#' + tvid + "VRN_Voltage").text("--");
        $('#' + tvid + "VSN_Voltage").text("--");
        $('#' + tvid + "VTN_Voltage").text("--");
        $('#' + tvid + "F_Frequency").text("--");
        $('#' + tvid + "PF_PowerFactor").text("--");
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "var_Power").text("--");
        $('#' + tvid + "varh_Energy").text("--");
        $('#' + tvid + "varhlead_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {

        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "AR_Current").text(realtimeObj.Data.AR_Current.Value + " [A]");
        $('#' + tvid + "AS_Current").text(realtimeObj.Data.AS_Current.Value + " [A]");
        $('#' + tvid + "AT_Current").text(realtimeObj.Data.AT_Current.Value + " [A]");
        $('#' + tvid + "AN_Current").text(realtimeObj.Data.AN_Current.Value + " [A]");
        $('#' + tvid + "VRS_Voltage").text(realtimeObj.Data.VRS_Voltage.Value + " [V]");
        $('#' + tvid + "VST_Voltage").text(realtimeObj.Data.VST_Voltage.Value + " [V]");
        $('#' + tvid + "VTR_Voltage").text(realtimeObj.Data.VTR_Voltage.Value + " [V]");
        $('#' + tvid + "VRN_Voltage").text(realtimeObj.Data.VRN_Voltage.Value + " [V]");
        $('#' + tvid + "VSN_Voltage").text(realtimeObj.Data.VSN_Voltage.Value + " [V]");
        $('#' + tvid + "VTN_Voltage").text(realtimeObj.Data.VTN_Voltage.Value + " [V]");
        $('#' + tvid + "F_Frequency").text(realtimeObj.Data.F_Frequency.Value + " [Hz]");
        $('#' + tvid + "PF_PowerFactor").text(realtimeObj.Data.PF_PowerFactor.Value + " [%]");
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "var_Power").text(realtimeObj.Data.var_Power.Value + " [kvar]");
        $('#' + tvid + "varh_Energy").text(realtimeObj.Data.varh_Energy.Value + " [kvarh]");
        $('#' + tvid + "varhlead_Energy").text(realtimeObj.Data.varhlead_Energy.Value + " [kvarh]");
    }

}

function fncTWPM3P4WDspData(tvid, unitNo, isUnitChg, twpmsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twpm_set_tmp = {
            AR:
            {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AT: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VST: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTR: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VSN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            F: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            PF: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            W: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Wh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            var: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varhlead: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },

        };

        twpmsetting.setting = { "set": twpm_set_tmp };

        twpmsetting.setting.set.AR.Title = jis2chr(settingObj.AR_Current.Title);
        twpmsetting.setting.set.AR.Point = settingObj.AR_Current.Point;
        twpmsetting.setting.set.AR.Graph[0] = settingObj.AR_Current.Graph[0];
        twpmsetting.setting.set.AR.Graph[1] = settingObj.AR_Current.Graph[1];
        twpmsetting.setting.set.AR.Alarm[0] = settingObj.AR_Current.Alarm[0];
        twpmsetting.setting.set.AR.Alarm[1] = settingObj.AR_Current.Alarm[1];
        twpmsetting.setting.set.AR.AlarmE[0] = settingObj.AR_Current.AlarmE[0];
        twpmsetting.setting.set.AR.AlarmE[1] = settingObj.AR_Current.AlarmE[1];

        twpmsetting.setting.set.AS.Title = jis2chr(settingObj.AS_Current.Title);
        twpmsetting.setting.set.AS.Point = settingObj.AS_Current.Point;
        twpmsetting.setting.set.AS.Graph[0] = settingObj.AS_Current.Graph[0];
        twpmsetting.setting.set.AS.Graph[1] = settingObj.AS_Current.Graph[1];
        twpmsetting.setting.set.AS.Alarm[0] = settingObj.AS_Current.Alarm[0];
        twpmsetting.setting.set.AS.Alarm[1] = settingObj.AS_Current.Alarm[1];
        twpmsetting.setting.set.AS.AlarmE[0] = settingObj.AS_Current.AlarmE[0];
        twpmsetting.setting.set.AS.AlarmE[1] = settingObj.AS_Current.AlarmE[1];

        twpmsetting.setting.set.AT.Title = jis2chr(settingObj.AT_Current.Title);
        twpmsetting.setting.set.AT.Point = settingObj.AT_Current.Point;
        twpmsetting.setting.set.AT.Graph[0] = settingObj.AT_Current.Graph[0];
        twpmsetting.setting.set.AT.Graph[1] = settingObj.AT_Current.Graph[1];
        twpmsetting.setting.set.AT.Alarm[0] = settingObj.AT_Current.Alarm[0];
        twpmsetting.setting.set.AT.Alarm[1] = settingObj.AT_Current.Alarm[1];
        twpmsetting.setting.set.AT.AlarmE[0] = settingObj.AT_Current.AlarmE[0];
        twpmsetting.setting.set.AT.AlarmE[1] = settingObj.AT_Current.AlarmE[1];

        twpmsetting.setting.set.AN.Title = jis2chr(settingObj.AN_Current.Title);
        twpmsetting.setting.set.AN.Point = settingObj.AN_Current.Point;
        twpmsetting.setting.set.AN.Graph[0] = settingObj.AN_Current.Graph[0];
        twpmsetting.setting.set.AN.Graph[1] = settingObj.AN_Current.Graph[1];
        twpmsetting.setting.set.AN.Alarm[0] = settingObj.AN_Current.Alarm[0];
        twpmsetting.setting.set.AN.Alarm[1] = settingObj.AN_Current.Alarm[1];
        twpmsetting.setting.set.AN.AlarmE[0] = settingObj.AN_Current.AlarmE[0];
        twpmsetting.setting.set.AN.AlarmE[1] = settingObj.AN_Current.AlarmE[1];

        twpmsetting.setting.set.VRS.Title = jis2chr(settingObj.VRS_Voltage.Title);
        twpmsetting.setting.set.VRS.Point = settingObj.VRS_Voltage.Point;
        twpmsetting.setting.set.VRS.Graph[0] = settingObj.VRS_Voltage.Graph[0];
        twpmsetting.setting.set.VRS.Graph[1] = settingObj.VRS_Voltage.Graph[1];
        twpmsetting.setting.set.VRS.Alarm[0] = settingObj.VRS_Voltage.Alarm[0];
        twpmsetting.setting.set.VRS.Alarm[1] = settingObj.VRS_Voltage.Alarm[1];
        twpmsetting.setting.set.VRS.AlarmE[0] = settingObj.VRS_Voltage.AlarmE[0];
        twpmsetting.setting.set.VRS.AlarmE[1] = settingObj.VRS_Voltage.AlarmE[1];

        twpmsetting.setting.set.VST.Title = jis2chr(settingObj.VST_Voltage.Title);
        twpmsetting.setting.set.VST.Point = settingObj.VST_Voltage.Point;
        twpmsetting.setting.set.VST.Graph[0] = settingObj.VST_Voltage.Graph[0];
        twpmsetting.setting.set.VST.Graph[1] = settingObj.VST_Voltage.Graph[1];
        twpmsetting.setting.set.VST.Alarm[0] = settingObj.VST_Voltage.Alarm[0];
        twpmsetting.setting.set.VST.Alarm[1] = settingObj.VST_Voltage.Alarm[1];
        twpmsetting.setting.set.VST.AlarmE[0] = settingObj.VST_Voltage.AlarmE[0];
        twpmsetting.setting.set.VST.AlarmE[1] = settingObj.VST_Voltage.AlarmE[1];

        twpmsetting.setting.set.VTR.Title = jis2chr(settingObj.VTR_Voltage.Title);
        twpmsetting.setting.set.VTR.Point = settingObj.VTR_Voltage.Point;
        twpmsetting.setting.set.VTR.Graph[0] = settingObj.VTR_Voltage.Graph[0];
        twpmsetting.setting.set.VTR.Graph[1] = settingObj.VTR_Voltage.Graph[1];
        twpmsetting.setting.set.VTR.Alarm[0] = settingObj.VTR_Voltage.Alarm[0];
        twpmsetting.setting.set.VTR.Alarm[1] = settingObj.VTR_Voltage.Alarm[1];
        twpmsetting.setting.set.VTR.AlarmE[0] = settingObj.VTR_Voltage.AlarmE[0];
        twpmsetting.setting.set.VTR.AlarmE[1] = settingObj.VTR_Voltage.AlarmE[1];

        twpmsetting.setting.set.VRN.Title = jis2chr(settingObj.VRN_Voltage.Title);
        twpmsetting.setting.set.VRN.Point = settingObj.VRN_Voltage.Point;
        twpmsetting.setting.set.VRN.Graph[0] = settingObj.VRN_Voltage.Graph[0];
        twpmsetting.setting.set.VRN.Graph[1] = settingObj.VRN_Voltage.Graph[1];
        twpmsetting.setting.set.VRN.Alarm[0] = settingObj.VRN_Voltage.Alarm[0];
        twpmsetting.setting.set.VRN.Alarm[1] = settingObj.VRN_Voltage.Alarm[1];
        twpmsetting.setting.set.VRN.AlarmE[0] = settingObj.VRN_Voltage.AlarmE[0];
        twpmsetting.setting.set.VRN.AlarmE[1] = settingObj.VRN_Voltage.AlarmE[1];

        twpmsetting.setting.set.VSN.Title = jis2chr(settingObj.VSN_Voltage.Title);
        twpmsetting.setting.set.VSN.Point = settingObj.VSN_Voltage.Point;
        twpmsetting.setting.set.VSN.Graph[0] = settingObj.VSN_Voltage.Graph[0];
        twpmsetting.setting.set.VSN.Graph[1] = settingObj.VSN_Voltage.Graph[1];
        twpmsetting.setting.set.VSN.Alarm[0] = settingObj.VSN_Voltage.Alarm[0];
        twpmsetting.setting.set.VSN.Alarm[1] = settingObj.VSN_Voltage.Alarm[1];
        twpmsetting.setting.set.VSN.AlarmE[0] = settingObj.VSN_Voltage.AlarmE[0];
        twpmsetting.setting.set.VSN.AlarmE[1] = settingObj.VSN_Voltage.AlarmE[1];

        twpmsetting.setting.set.VTN.Title = jis2chr(settingObj.VTN_Voltage.Title);
        twpmsetting.setting.set.VTN.Point = settingObj.VTN_Voltage.Point;
        twpmsetting.setting.set.VTN.Graph[0] = settingObj.VTN_Voltage.Graph[0];
        twpmsetting.setting.set.VTN.Graph[1] = settingObj.VTN_Voltage.Graph[1];
        twpmsetting.setting.set.VTN.Alarm[0] = settingObj.VTN_Voltage.Alarm[0];
        twpmsetting.setting.set.VTN.Alarm[1] = settingObj.VTN_Voltage.Alarm[1];
        twpmsetting.setting.set.VTN.AlarmE[0] = settingObj.VTN_Voltage.AlarmE[0];
        twpmsetting.setting.set.VTN.AlarmE[1] = settingObj.VTN_Voltage.AlarmE[1];

        twpmsetting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        twpmsetting.setting.set.F.Point = settingObj.F_Frequency.Point;
        twpmsetting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        twpmsetting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        twpmsetting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        twpmsetting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        twpmsetting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        twpmsetting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        twpmsetting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        twpmsetting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        twpmsetting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        twpmsetting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        twpmsetting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        twpmsetting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        twpmsetting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        twpmsetting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        twpmsetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        twpmsetting.setting.set.W.Point = settingObj.W_Power.Point;
        twpmsetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        twpmsetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        twpmsetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        twpmsetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        twpmsetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        twpmsetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        twpmsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        twpmsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        twpmsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        twpmsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        twpmsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        twpmsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        twpmsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        twpmsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        twpmsetting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title);
        twpmsetting.setting.set.var.Point = settingObj.var_Power.Point;
        twpmsetting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0];
        twpmsetting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1];
        twpmsetting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0];
        twpmsetting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1];
        twpmsetting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0];
        twpmsetting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1];

        twpmsetting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        twpmsetting.setting.set.varh.Point = settingObj.varh_Energy.Point;
        twpmsetting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        twpmsetting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];
        twpmsetting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0];
        twpmsetting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1];
        twpmsetting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0];
        twpmsetting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1];


        twpmsetting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        twpmsetting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point;
        twpmsetting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        twpmsetting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];
        twpmsetting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0];
        twpmsetting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1];
        twpmsetting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0];
        twpmsetting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1];


        $('#' + tvid + "AR_Current_Title").text(twpmsetting.setting.set.AR.Title);
        $('#' + tvid + "AS_Current_Title").text(twpmsetting.setting.set.AS.Title);
        $('#' + tvid + "AT_Current_Title").text(twpmsetting.setting.set.AT.Title);
        $('#' + tvid + "AN_Current_Title").text(twpmsetting.setting.set.AN.Title);
        $('#' + tvid + "VRS_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
        $('#' + tvid + "VST_Voltage_Title").text(twpmsetting.setting.set.VST.Title);
        $('#' + tvid + "VTR_Voltage_Title").text(twpmsetting.setting.set.VTR.Title);
        $('#' + tvid + "VRN_Voltage_Title").text(twpmsetting.setting.set.VRN.Title);
        $('#' + tvid + "VSN_Voltage_Title").text(twpmsetting.setting.set.VSN.Title);
        $('#' + tvid + "VTN_Voltage_Title").text(twpmsetting.setting.set.VTN.Title);
        $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
        $('#' + tvid + "PF_PowerFactor_Title").text(twpmsetting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(twpmsetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P4W(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P4W(tvid, realtimeObj);
        }

    }
    else {
        if (twpmsetting.setting) {
            $('#' + tvid + "AR_Current_Title").text(twpmsetting.setting.set.AR.Title);
            $('#' + tvid + "AS_Current_Title").text(twpmsetting.setting.set.AS.Title);
            $('#' + tvid + "AT_Current_Title").text(twpmsetting.setting.set.AT.Title);
            $('#' + tvid + "AN_Current_Title").text(twpmsetting.setting.set.AN.Title);
            $('#' + tvid + "VRS_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
            $('#' + tvid + "VST_Voltage_Title").text(twpmsetting.setting.set.VST.Title);
            $('#' + tvid + "VTR_Voltage_Title").text(twpmsetting.setting.set.VTR.Title);
            $('#' + tvid + "VRN_Voltage_Title").text(twpmsetting.setting.set.VRN.Title);
            $('#' + tvid + "VSN_Voltage_Title").text(twpmsetting.setting.set.VSN.Title);
            $('#' + tvid + "VTN_Voltage_Title").text(twpmsetting.setting.set.VTN.Title);
            $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
            $('#' + tvid + "PF_PowerFactor_Title").text(twpmsetting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P4W(tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, twpmsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P4W(tvid, obj.Respons);

        }, twpmsetting);
    }
}


/* TWPM 3P3Wダイナミク瞬時データ表示作成 */
function fncTWPM3P3WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwpmtitle" class="h5 m-0 ">twpmtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
            \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <td id="AR_Current_Title" class="text-center table-active font-weight-bold">R相電流</td> \
                            <td id="AR_Current" colspan="2" class="text-right">--</td> \
                            <td id="AS_Current_Title" class="text-center table-active font-weight-bold">S相電流</td> \
                            <td id="AS_Current" colspan="2" class="text-right">--</td> \
                            <td id="AT_Current_Title" class="text-center table-active font-weight-bold">T相電流</td> \
                            <td id="AT_Current" colspan="2" class="text-right">--</td> \
                            <td id="VRS_Voltage_Title" class="text-center table-active font-weight-bold">R-S線間電圧</td> \
                            <td id="VRS_Voltage" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="VST_Voltage_Title" class="text-center table-active font-weight-bold">S-T線間電圧</td> \
                            <td id="VST_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="VTR_Voltage_Title" class="text-center table-active font-weight-bold">T-R線間電圧</td> \
                            <td id="VTR_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="F_Frequency_Title" class="text-center table-active font-weight-bold">周波数</td> \
                            <td id="F_Frequency" colspan="2" class="text-right">--</td> \
                            <td id="PF_PowerFactor_Title" class="text-center table-active font-weight-bold">力率</td> \
                            <td id="PF_PowerFactor" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="var_Power_Title" class="text-center table-active font-weight-bold">無効電力</td> \
                            <td id="var_Power" colspan="2" class="text-right">--</td> \
                            <td id="varh_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lag)</td> \
                            <td id="varh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varhlead_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lead)</td> \
                            <td id="varhlead_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/AR_Current/g, tvid + "AR_Current");
    rtnval = rtnval.replace(/AS_Current/g, tvid + "AS_Current");
    rtnval = rtnval.replace(/AT_Current/g, tvid + "AT_Current");
    rtnval = rtnval.replace(/VRS_Voltage/g, tvid + "VRS_Voltage");
    rtnval = rtnval.replace(/VST_Voltage/g, tvid + "VST_Voltage");
    rtnval = rtnval.replace(/VTR_Voltage/g, tvid + "VTR_Voltage");
    rtnval = rtnval.replace(/F_Frequency/g, tvid + "F_Frequency");
    rtnval = rtnval.replace(/PF_PowerFactor/g, tvid + "PF_PowerFactor");
    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/var_Power/g, tvid + "var_Power");
    rtnval = rtnval.replace(/varh_Energy/g, tvid + "varh_Energy");
    rtnval = rtnval.replace(/varhlead_Energy/g, tvid + "varhlead_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/twpmtitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataTWPM3P3W(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "AR_Current").text("--");
        $('#' + tvid + "AS_Current").text("--");
        $('#' + tvid + "VRS_Voltage").text("--");
        $('#' + tvid + "AT_Current").text("--");
        $('#' + tvid + "VST_Voltage").text("--");
        $('#' + tvid + "VTR_Voltage").text("--");
        $('#' + tvid + "F_Frequency").text("--");
        $('#' + tvid + "PF_PowerFactor").text("--");
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "var_Power").text("--");
        $('#' + tvid + "varh_Energy").text("--");
        $('#' + tvid + "varhlead_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {
        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "AR_Current").text(realtimeObj.Data.AR_Current.Value + " [A]");
        $('#' + tvid + "AS_Current").text(realtimeObj.Data.AS_Current.Value + " [A]");
        $('#' + tvid + "AT_Current").text(realtimeObj.Data.AT_Current.Value + " [A]");
        $('#' + tvid + "VRS_Voltage").text(realtimeObj.Data.VRS_Voltage.Value + " [V]");
        $('#' + tvid + "VST_Voltage").text(realtimeObj.Data.VST_Voltage.Value + " [V]");
        $('#' + tvid + "VTR_Voltage").text(realtimeObj.Data.VTR_Voltage.Value + " [V]");
        $('#' + tvid + "F_Frequency").text(realtimeObj.Data.F_Frequency.Value + " [Hz]");
        $('#' + tvid + "PF_PowerFactor").text(realtimeObj.Data.PF_PowerFactor.Value + " [%]");
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "var_Power").text(realtimeObj.Data.var_Power.Value + " [kvar]");
        $('#' + tvid + "varh_Energy").text(realtimeObj.Data.varh_Energy.Value + " [kvarh]");
        $('#' + tvid + "varhlead_Energy").text(realtimeObj.Data.varhlead_Energy.Value + " [kvarh]");
    }
}

function fncTWPM3P3WDspData(tvid, unitNo, isUnitChg, twpmsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twpm_set_tmp = {
            AR:
            {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AT: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VST: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTR: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VSN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            F: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            PF: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            W: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Wh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            var: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varhlead: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },

        };

        twpmsetting.setting = { "set": twpm_set_tmp };

        twpmsetting.setting.set.AR.Title = jis2chr(settingObj.AR_Current.Title);
        twpmsetting.setting.set.AR.Point = settingObj.AR_Current.Point;
        twpmsetting.setting.set.AR.Graph[0] = settingObj.AR_Current.Graph[0];
        twpmsetting.setting.set.AR.Graph[1] = settingObj.AR_Current.Graph[1];
        twpmsetting.setting.set.AR.Alarm[0] = settingObj.AR_Current.Alarm[0];
        twpmsetting.setting.set.AR.Alarm[1] = settingObj.AR_Current.Alarm[1];
        twpmsetting.setting.set.AR.AlarmE[0] = settingObj.AR_Current.AlarmE[0];
        twpmsetting.setting.set.AR.AlarmE[1] = settingObj.AR_Current.AlarmE[1];

        twpmsetting.setting.set.AS.Title = jis2chr(settingObj.AS_Current.Title);
        twpmsetting.setting.set.AS.Point = settingObj.AS_Current.Point;
        twpmsetting.setting.set.AS.Graph[0] = settingObj.AS_Current.Graph[0];
        twpmsetting.setting.set.AS.Graph[1] = settingObj.AS_Current.Graph[1];
        twpmsetting.setting.set.AS.Alarm[0] = settingObj.AS_Current.Alarm[0];
        twpmsetting.setting.set.AS.Alarm[1] = settingObj.AS_Current.Alarm[1];
        twpmsetting.setting.set.AS.AlarmE[0] = settingObj.AS_Current.AlarmE[0];
        twpmsetting.setting.set.AS.AlarmE[1] = settingObj.AS_Current.AlarmE[1];

        twpmsetting.setting.set.AT.Title = jis2chr(settingObj.AT_Current.Title);
        twpmsetting.setting.set.AT.Point = settingObj.AT_Current.Point;
        twpmsetting.setting.set.AT.Graph[0] = settingObj.AT_Current.Graph[0];
        twpmsetting.setting.set.AT.Graph[1] = settingObj.AT_Current.Graph[1];
        twpmsetting.setting.set.AT.Alarm[0] = settingObj.AT_Current.Alarm[0];
        twpmsetting.setting.set.AT.Alarm[1] = settingObj.AT_Current.Alarm[1];
        twpmsetting.setting.set.AT.AlarmE[0] = settingObj.AT_Current.AlarmE[0];
        twpmsetting.setting.set.AT.AlarmE[1] = settingObj.AT_Current.AlarmE[1];

        twpmsetting.setting.set.VRS.Title = jis2chr(settingObj.VRS_Voltage.Title);
        twpmsetting.setting.set.VRS.Point = settingObj.VRS_Voltage.Point;
        twpmsetting.setting.set.VRS.Graph[0] = settingObj.VRS_Voltage.Graph[0];
        twpmsetting.setting.set.VRS.Graph[1] = settingObj.VRS_Voltage.Graph[1];
        twpmsetting.setting.set.VRS.Alarm[0] = settingObj.VRS_Voltage.Alarm[0];
        twpmsetting.setting.set.VRS.Alarm[1] = settingObj.VRS_Voltage.Alarm[1];
        twpmsetting.setting.set.VRS.AlarmE[0] = settingObj.VRS_Voltage.AlarmE[0];
        twpmsetting.setting.set.VRS.AlarmE[1] = settingObj.VRS_Voltage.AlarmE[1];

        twpmsetting.setting.set.VST.Title = jis2chr(settingObj.VST_Voltage.Title);
        twpmsetting.setting.set.VST.Point = settingObj.VST_Voltage.Point;
        twpmsetting.setting.set.VST.Graph[0] = settingObj.VST_Voltage.Graph[0];
        twpmsetting.setting.set.VST.Graph[1] = settingObj.VST_Voltage.Graph[1];
        twpmsetting.setting.set.VST.Alarm[0] = settingObj.VST_Voltage.Alarm[0];
        twpmsetting.setting.set.VST.Alarm[1] = settingObj.VST_Voltage.Alarm[1];
        twpmsetting.setting.set.VST.AlarmE[0] = settingObj.VST_Voltage.AlarmE[0];
        twpmsetting.setting.set.VST.AlarmE[1] = settingObj.VST_Voltage.AlarmE[1];

        twpmsetting.setting.set.VTR.Title = jis2chr(settingObj.VTR_Voltage.Title);
        twpmsetting.setting.set.VTR.Point = settingObj.VTR_Voltage.Point;
        twpmsetting.setting.set.VTR.Graph[0] = settingObj.VTR_Voltage.Graph[0];
        twpmsetting.setting.set.VTR.Graph[1] = settingObj.VTR_Voltage.Graph[1];
        twpmsetting.setting.set.VTR.Alarm[0] = settingObj.VTR_Voltage.Alarm[0];
        twpmsetting.setting.set.VTR.Alarm[1] = settingObj.VTR_Voltage.Alarm[1];
        twpmsetting.setting.set.VTR.AlarmE[0] = settingObj.VTR_Voltage.AlarmE[0];
        twpmsetting.setting.set.VTR.AlarmE[1] = settingObj.VTR_Voltage.AlarmE[1];

        twpmsetting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        twpmsetting.setting.set.F.Point = settingObj.F_Frequency.Point;
        twpmsetting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        twpmsetting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        twpmsetting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        twpmsetting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        twpmsetting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        twpmsetting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        twpmsetting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        twpmsetting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        twpmsetting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        twpmsetting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        twpmsetting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        twpmsetting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        twpmsetting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        twpmsetting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        twpmsetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        twpmsetting.setting.set.W.Point = settingObj.W_Power.Point;
        twpmsetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        twpmsetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        twpmsetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        twpmsetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        twpmsetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        twpmsetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        twpmsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        twpmsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        twpmsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        twpmsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        twpmsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        twpmsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        twpmsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        twpmsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        twpmsetting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title);
        twpmsetting.setting.set.var.Point = settingObj.var_Power.Point;
        twpmsetting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0];
        twpmsetting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1];
        twpmsetting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0];
        twpmsetting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1];
        twpmsetting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0];
        twpmsetting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1];

        twpmsetting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        twpmsetting.setting.set.varh.Point = settingObj.varh_Energy.Point;
        twpmsetting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        twpmsetting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];
        twpmsetting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0];
        twpmsetting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1];
        twpmsetting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0];
        twpmsetting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1];

        twpmsetting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        twpmsetting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point;
        twpmsetting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        twpmsetting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];
        twpmsetting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0];
        twpmsetting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1];
        twpmsetting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0];
        twpmsetting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1];


        $('#' + tvid + "AR_Current_Title").text(twpmsetting.setting.set.AR.Title);
        $('#' + tvid + "AS_Current_Title").text(twpmsetting.setting.set.AS.Title);
        $('#' + tvid + "AT_Current_Title").text(twpmsetting.setting.set.AT.Title);
        $('#' + tvid + "VRS_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
        $('#' + tvid + "VST_Voltage_Title").text(twpmsetting.setting.set.VST.Title);
        $('#' + tvid + "VTR_Voltage_Title").text(twpmsetting.setting.set.VTR.Title);
        $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
        $('#' + tvid + "PF_PowerFactor_Title").text(twpmsetting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(twpmsetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P3W(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P3W(tvid, realtimeObj);
        }
    }
    else {
        if (twpmsetting.setting) {
            $('#' + tvid + "AR_Current_Title").text(twpmsetting.setting.set.AR.Title);
            $('#' + tvid + "AS_Current_Title").text(twpmsetting.setting.set.AS.Title);
            $('#' + tvid + "AT_Current_Title").text(twpmsetting.setting.set.AT.Title);
            $('#' + tvid + "VRS_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
            $('#' + tvid + "VST_Voltage_Title").text(twpmsetting.setting.set.VST.Title);
            $('#' + tvid + "VTR_Voltage_Title").text(twpmsetting.setting.set.VTR.Title);
            $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
            $('#' + tvid + "PF_PowerFactor_Title").text(twpmsetting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P3W(tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, twpmsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // Display the reatime tables
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM3P3W(tvid, obj.Respons);

        }, twpmsetting);
    }
}


/* TWPM 1P3Wダイナミク瞬時データ表示作成 */
function fncTWPM1P3WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwpmtitle" class="h5 m-0 ">twpmtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
            \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <td id="A1_Current_Title" class="text-center table-active font-weight-bold">1相電流</td> \
                            <td id="A1_Current" colspan="2" class="text-right">--</td> \
                            <td id="AN_Current_Title" class="text-center table-active font-weight-bold">N相電流</td> \
                            <td id="AN_Current" colspan="2" class="text-right">--</td> \
                            <td id="A2_Current_Title" class="text-center table-active font-weight-bold">2相電流</td> \
                            <td id="A2_Current" colspan="2" class="text-right">--</td> \
                            <td id="V1N_Voltage_Title" class="text-center table-active font-weight-bold">1-N線間電圧</td> \
                            <td id="V1N_Voltage" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="V2N_Voltage_Title" class="text-center table-active font-weight-bold">2-N線間電圧</td> \
                            <td id="V2N_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="V12_Voltage_Title" class="text-center table-active font-weight-bold">1-2線間電圧</td> \
                            <td id="V12_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="F_Frequency_Title" class="text-center table-active font-weight-bold">周波数</td> \
                            <td id="F_Frequency" colspan="2" class="text-right">--</td> \
                            <td id="PF_PowerFactor_Title" class="text-center table-active font-weight-bold">力率</td> \
                            <td id="PF_PowerFactor" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="var_Power_Title" class="text-center table-active font-weight-bold">無効電力</td> \
                            <td id="var_Power" colspan="2" class="text-right">--</td> \
                            <td id="varh_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lag)</td> \
                            <td id="varh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varhlead_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lead)</td> \
                            <td id="varhlead_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/A1_Current/g, tvid + "A1_Current");
    rtnval = rtnval.replace(/AN_Current/g, tvid + "AN_Current");
    rtnval = rtnval.replace(/A2_Current/g, tvid + "A2_Current");
    rtnval = rtnval.replace(/V1N_Voltage/g, tvid + "V1N_Voltage");
    rtnval = rtnval.replace(/V2N_Voltage/g, tvid + "V2N_Voltage");
    rtnval = rtnval.replace(/V12_Voltage/g, tvid + "V12_Voltage");
    rtnval = rtnval.replace(/F_Frequency/g, tvid + "F_Frequency");
    rtnval = rtnval.replace(/PF_PowerFactor/g, tvid + "PF_PowerFactor");
    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/var_Power/g, tvid + "var_Power");
    rtnval = rtnval.replace(/varh_Energy/g, tvid + "varh_Energy");
    rtnval = rtnval.replace(/varhlead_Energy/g, tvid + "varhlead_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/twpmtitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataTWPM1P3W(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "A1_Current").text("--");
        $('#' + tvid + "AN_Current").text("--");
        $('#' + tvid + "A2_Current").text("--");
        $('#' + tvid + "V1N_Voltage").text("--");
        $('#' + tvid + "V2N_Voltage").text("--");
        $('#' + tvid + "V12_Voltage").text("--");
        $('#' + tvid + "F_Frequency").text("--");
        $('#' + tvid + "PF_PowerFactor").text("--");
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "var_Power").text("--");
        $('#' + tvid + "varh_Energy").text("--");
        $('#' + tvid + "varhlead_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {
        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));
        $('#' + tvid + "A1_Current").text(realtimeObj.Data.A1_Current.Value + " [A]");
        $('#' + tvid + "AN_Current").text(realtimeObj.Data.AN_Current.Value + " [A]");
        $('#' + tvid + "A2_Current").text(realtimeObj.Data.A2_Current.Value + " [A]");
        $('#' + tvid + "V1N_Voltage").text(realtimeObj.Data.V1N_Voltage.Value + " [V]");
        $('#' + tvid + "V2N_Voltage").text(realtimeObj.Data.V2N_Voltage.Value + " [V]");
        $('#' + tvid + "V12_Voltage").text(realtimeObj.Data.V12_Voltage.Value + " [V]");
        $('#' + tvid + "F_Frequency").text(realtimeObj.Data.F_Frequency.Value + " [Hz]");
        $('#' + tvid + "PF_PowerFactor").text(realtimeObj.Data.PF_PowerFactor.Value + " [%]");
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "var_Power").text(realtimeObj.Data.var_Power.Value + " [kvar]");
        $('#' + tvid + "varh_Energy").text(realtimeObj.Data.varh_Energy.Value + " [kvarh]");
        $('#' + tvid + "varhlead_Energy").text(realtimeObj.Data.varhlead_Energy.Value + " [kvarh]");
    }
}

function fncTWPM1P3WDspData(tvid, unitNo, isUnitChg, twpmsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twpm_set_tmp = {
            AR:
            {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AT: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VST: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTR: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VSN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            F: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            PF: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            W: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Wh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            var: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varhlead: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },

        };

        twpmsetting.setting = { "set": twpm_set_tmp };

        twpmsetting.setting.set.AR.Title = jis2chr(settingObj.A1_Current.Title);
        twpmsetting.setting.set.AR.Point = settingObj.A1_Current.Point;
        twpmsetting.setting.set.AR.Graph[0] = settingObj.A1_Current.Graph[0];
        twpmsetting.setting.set.AR.Graph[1] = settingObj.A1_Current.Graph[1];
        twpmsetting.setting.set.AR.Alarm[0] = settingObj.A1_Current.Alarm[0];
        twpmsetting.setting.set.AR.Alarm[1] = settingObj.A1_Current.Alarm[1];
        twpmsetting.setting.set.AR.AlarmE[0] = settingObj.A1_Current.AlarmE[0];
        twpmsetting.setting.set.AR.AlarmE[1] = settingObj.A1_Current.AlarmE[1];

        twpmsetting.setting.set.AS.Title = jis2chr(settingObj.AN_Current.Title);
        twpmsetting.setting.set.AS.Point = settingObj.AN_Current.Point;
        twpmsetting.setting.set.AS.Graph[0] = settingObj.AN_Current.Graph[0];
        twpmsetting.setting.set.AS.Graph[1] = settingObj.AN_Current.Graph[1];
        twpmsetting.setting.set.AS.Alarm[0] = settingObj.AN_Current.Alarm[0];
        twpmsetting.setting.set.AS.Alarm[1] = settingObj.AN_Current.Alarm[1];
        twpmsetting.setting.set.AS.AlarmE[0] = settingObj.AN_Current.AlarmE[0];
        twpmsetting.setting.set.AS.AlarmE[1] = settingObj.AN_Current.AlarmE[1];

        twpmsetting.setting.set.AT.Title = jis2chr(settingObj.A2_Current.Title);
        twpmsetting.setting.set.AT.Point = settingObj.A2_Current.Point;
        twpmsetting.setting.set.AT.Graph[0] = settingObj.A2_Current.Graph[0];
        twpmsetting.setting.set.AT.Graph[1] = settingObj.A2_Current.Graph[1];
        twpmsetting.setting.set.AT.Alarm[0] = settingObj.A2_Current.Alarm[0];
        twpmsetting.setting.set.AT.Alarm[1] = settingObj.A2_Current.Alarm[1];
        twpmsetting.setting.set.AT.AlarmE[0] = settingObj.A2_Current.AlarmE[0];
        twpmsetting.setting.set.AT.AlarmE[1] = settingObj.A2_Current.AlarmE[1];

        twpmsetting.setting.set.VRS.Title = jis2chr(settingObj.V1N_Voltage.Title);
        twpmsetting.setting.set.VRS.Point = settingObj.V1N_Voltage.Point;
        twpmsetting.setting.set.VRS.Graph[0] = settingObj.V1N_Voltage.Graph[0];
        twpmsetting.setting.set.VRS.Graph[1] = settingObj.V1N_Voltage.Graph[1];
        twpmsetting.setting.set.VRS.Alarm[0] = settingObj.V1N_Voltage.Alarm[0];
        twpmsetting.setting.set.VRS.Alarm[1] = settingObj.V1N_Voltage.Alarm[1];
        twpmsetting.setting.set.VRS.AlarmE[0] = settingObj.V1N_Voltage.AlarmE[0];
        twpmsetting.setting.set.VRS.AlarmE[1] = settingObj.V1N_Voltage.AlarmE[1];

        twpmsetting.setting.set.VST.Title = jis2chr(settingObj.V2N_Voltage.Title);
        twpmsetting.setting.set.VST.Point = settingObj.V2N_Voltage.Point;
        twpmsetting.setting.set.VST.Graph[0] = settingObj.V2N_Voltage.Graph[0];
        twpmsetting.setting.set.VST.Graph[1] = settingObj.V2N_Voltage.Graph[1];
        twpmsetting.setting.set.VST.Alarm[0] = settingObj.V2N_Voltage.Alarm[0];
        twpmsetting.setting.set.VST.Alarm[1] = settingObj.V2N_Voltage.Alarm[1];
        twpmsetting.setting.set.VST.AlarmE[0] = settingObj.V2N_Voltage.AlarmE[0];
        twpmsetting.setting.set.VST.AlarmE[1] = settingObj.V2N_Voltage.AlarmE[1];

        twpmsetting.setting.set.VTR.Title = jis2chr(settingObj.V12_Voltage.Title);
        twpmsetting.setting.set.VTR.Point = settingObj.V12_Voltage.Point;
        twpmsetting.setting.set.VTR.Graph[0] = settingObj.V12_Voltage.Graph[0];
        twpmsetting.setting.set.VTR.Graph[1] = settingObj.V12_Voltage.Graph[1];
        twpmsetting.setting.set.VTR.Alarm[0] = settingObj.V12_Voltage.Alarm[0];
        twpmsetting.setting.set.VTR.Alarm[1] = settingObj.V12_Voltage.Alarm[1];
        twpmsetting.setting.set.VTR.AlarmE[0] = settingObj.V12_Voltage.AlarmE[0];
        twpmsetting.setting.set.VTR.AlarmE[1] = settingObj.V12_Voltage.AlarmE[1];

        twpmsetting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        twpmsetting.setting.set.F.Point = settingObj.F_Frequency.Point;
        twpmsetting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        twpmsetting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        twpmsetting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        twpmsetting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        twpmsetting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        twpmsetting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        twpmsetting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        twpmsetting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        twpmsetting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        twpmsetting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        twpmsetting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        twpmsetting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        twpmsetting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        twpmsetting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        twpmsetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        twpmsetting.setting.set.W.Point = settingObj.W_Power.Point;
        twpmsetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        twpmsetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        twpmsetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        twpmsetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        twpmsetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        twpmsetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        twpmsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        twpmsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        twpmsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        twpmsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        twpmsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        twpmsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        twpmsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        twpmsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        twpmsetting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title);
        twpmsetting.setting.set.var.Point = settingObj.var_Power.Point;
        twpmsetting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0];
        twpmsetting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1];
        twpmsetting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0];
        twpmsetting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1];
        twpmsetting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0];
        twpmsetting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1];

        twpmsetting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        twpmsetting.setting.set.varh.Point = settingObj.varh_Energy.Point;
        twpmsetting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        twpmsetting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];
        twpmsetting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0];
        twpmsetting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1];
        twpmsetting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0];
        twpmsetting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1];

        twpmsetting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        twpmsetting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point;
        twpmsetting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        twpmsetting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];
        twpmsetting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0];
        twpmsetting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1];
        twpmsetting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0];
        twpmsetting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1];


        $('#' + tvid + "A1_Current_Title").text(twpmsetting.setting.set.AR.Title);
        $('#' + tvid + "AN_Current_Title").text(twpmsetting.setting.set.AS.Title);
        $('#' + tvid + "A2_Current_Title").text(twpmsetting.setting.set.AT.Title);
        $('#' + tvid + "V1N_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
        $('#' + tvid + "V2N_Voltage_Title").text(twpmsetting.setting.set.VST.Title);
        $('#' + tvid + "V12_Voltage_Title").text(twpmsetting.setting.set.VTR.Title);
        $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
        $('#' + tvid + "PF_PowerFactor_Title").text(twpmsetting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(twpmsetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P3W(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P3W(tvid, realtimeObj);
        }

    }
    else {
        if (twpmsetting.setting !== null) {
            $('#' + tvid + "A1_Current_Title").text(twpmsetting.setting.set.AR.Title);
            $('#' + tvid + "AN_Current_Title").text(twpmsetting.setting.set.AS.Title);
            $('#' + tvid + "A2_Current_Title").text(twpmsetting.setting.set.AT.Title);
            $('#' + tvid + "V1N_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
            $('#' + tvid + "V2N_Voltage_Title").text(twpmsetting.setting.set.VST.Title);
            $('#' + tvid + "V12_Voltage_Title").text(twpmsetting.setting.set.VTR.Title);
            $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
            $('#' + tvid + "PF_PowerFactor_Title").text(twpmsetting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);
        }
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P3W(tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, twpmsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P3W(tvid, obj.Respons);

        }, twpmsetting);
    }
}


/* TWPM 1P2Wダイナミク瞬時データ表示作成 */
function fncTWPM1P2WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idtwpmtitle" class="h5 m-0 ">twpmtitlestring \
            </h4> \
            <h6 id="updated_time" class="border-0 pb-0">データ更新：----/--/-- --:--</h6> \
        </div> \
        <div class="card-body px-0 pt-0 pb-0"> \
            <div class="table-responsive bg-white"> \
                <table class="table table-bordered mb-0"> \
                    <tbody> \
                        <tr> \
                            <td id="A_Curr_Title" class="text-center table-active font-weight-bold">電流</td> \
                            <td id="A_Curr" colspan="2" class="text-right">--</td> \
                            <td id="V_Voltage_Title" class="text-center table-active font-weight-bold">電圧</td> \
                            <td id="V_Voltage" colspan="2" class="text-right">--</td> \
                            <td id="F_Frequency_Title" class="text-center table-active font-weight-bold">周波数</td> \
                            <td id="F_Frequency" colspan="2" class="text-right">--</td> \
                            <td id="PF_Title" class="text-center table-active font-weight-bold">力率</td> \
                            <td id="PF" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="var_Power_Title" class="text-center table-active font-weight-bold">無効電力</td> \
                            <td id="var_Power" colspan="2" class="text-right">--</td> \
                            <td id="varh_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lag)</td> \
                            <td id="varh_Energy" colspan="2" class="text-right">--</td> \
                            <td id="varhlead_Energy_Title" class="text-center table-active font-weight-bold">無効電力量(Lead)</td> \
                            <td id="varhlead_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                    </tbody> \
                </table> \
            </div> \
        </div> \
    </div>';

    rtnval = rtnval.replace(/A_Curr/g, tvid + "A_Curr");
    rtnval = rtnval.replace(/V_Voltage/g, tvid + "V_Voltage");
    rtnval = rtnval.replace(/F_Frequency/g, tvid + "F_Frequency");
    rtnval = rtnval.replace(/PF/g, tvid + "PF");
    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/var_Power/g, tvid + "var_Power");
    rtnval = rtnval.replace(/varh_Energy/g, tvid + "varh_Energy");
    rtnval = rtnval.replace(/varhlead_Energy/g, tvid + "varhlead_Energy");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/twpmtitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataTWPM1P2W(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "A_Curr").text("--");
        $('#' + tvid + "V_Voltage").text("--");
        $('#' + tvid + "F_Frequency").text("--");
        $('#' + tvid + "PF").text("--");
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "var_Power").text("--");
        $('#' + tvid + "varh_Energy").text("--");
        $('#' + tvid + "varhlead_Energy").text("--");
        $('#' + tvid + "updated_time").text('データ更新：----/--/-- --:--');
    }
    else {

        $('#' + tvid + "updated_time").text("データ更新：" + realtimeObj.Time[0] + "/" + ("0" + realtimeObj.Time[1]).slice(-2) + "/" + ("0" + realtimeObj.Time[2]).slice(-2) + " " + ("00" + realtimeObj.Time[3]).slice(-2) + ":" + ("00" + realtimeObj.Time[4]).slice(-2));

        $('#' + tvid + "A_Curr").text(realtimeObj.Data.A_Current.Value + " [A]");
        $('#' + tvid + "V_Voltage").text(realtimeObj.Data.V_Voltage.Value + " [V]");
        $('#' + tvid + "F_Frequency").text(realtimeObj.Data.F_Frequency.Value + " [Hz]");
        $('#' + tvid + "PF").text(realtimeObj.Data.PF_PowerFactor.Value + " [%]");
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "var_Power").text(realtimeObj.Data.var_Power.Value + " [kvar]");
        $('#' + tvid + "varh_Energy").text(realtimeObj.Data.varh_Energy.Value + " [kvarh]");
        $('#' + tvid + "varhlead_Energy").text(realtimeObj.Data.varhlead_Energy.Value + " [kvarh]");
    }

}

function fncTWPM1P2WDspData(tvid, unitNo, isUnitChg, twpmsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var twpm_set_tmp = {
            AR:
            {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AT: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            AN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRS: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VST: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTR: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VRN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VSN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            VTN: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            F: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            PF: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            W: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Wh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            var: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varh: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            varhlead: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },

        };

        twpmsetting.setting = { "set": twpm_set_tmp };

        twpmsetting.setting.set.AR.Title = jis2chr(settingObj.A_Current.Title);
        twpmsetting.setting.set.AR.Point = settingObj.A_Current.Point;
        twpmsetting.setting.set.AR.Graph[0] = settingObj.A_Current.Graph[0];
        twpmsetting.setting.set.AR.Graph[1] = settingObj.A_Current.Graph[1];
        twpmsetting.setting.set.AR.Alarm[0] = settingObj.A_Current.Alarm[0];
        twpmsetting.setting.set.AR.Alarm[1] = settingObj.A_Current.Alarm[1];
        twpmsetting.setting.set.AR.AlarmE[0] = settingObj.A_Current.AlarmE[0];
        twpmsetting.setting.set.AR.AlarmE[1] = settingObj.A_Current.AlarmE[1];

        twpmsetting.setting.set.VRS.Title = jis2chr(settingObj.V_Voltage.Title);
        twpmsetting.setting.set.VRS.Point = settingObj.V_Voltage.Point;
        twpmsetting.setting.set.VRS.Graph[0] = settingObj.V_Voltage.Graph[0];
        twpmsetting.setting.set.VRS.Graph[1] = settingObj.V_Voltage.Graph[1];
        twpmsetting.setting.set.VRS.Alarm[0] = settingObj.V_Voltage.Alarm[0];
        twpmsetting.setting.set.VRS.Alarm[1] = settingObj.V_Voltage.Alarm[1];
        twpmsetting.setting.set.VRS.AlarmE[0] = settingObj.V_Voltage.AlarmE[0];
        twpmsetting.setting.set.VRS.AlarmE[1] = settingObj.V_Voltage.AlarmE[1];

        twpmsetting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        twpmsetting.setting.set.F.Point = settingObj.F_Frequency.Point;
        twpmsetting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        twpmsetting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        twpmsetting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        twpmsetting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        twpmsetting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        twpmsetting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        twpmsetting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        twpmsetting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        twpmsetting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        twpmsetting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        twpmsetting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        twpmsetting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        twpmsetting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        twpmsetting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        twpmsetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        twpmsetting.setting.set.W.Point = settingObj.W_Power.Point;
        twpmsetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        twpmsetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        twpmsetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        twpmsetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        twpmsetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        twpmsetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        twpmsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        twpmsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        twpmsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        twpmsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        twpmsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        twpmsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        twpmsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        twpmsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        twpmsetting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title);
        twpmsetting.setting.set.var.Point = settingObj.var_Power.Point;
        twpmsetting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0];
        twpmsetting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1];
        twpmsetting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0];
        twpmsetting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1];
        twpmsetting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0];
        twpmsetting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1];

        twpmsetting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        twpmsetting.setting.set.varh.Point = settingObj.varh_Energy.Point;
        twpmsetting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        twpmsetting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];
        twpmsetting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0];
        twpmsetting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1];
        twpmsetting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0];
        twpmsetting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1];

        twpmsetting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        twpmsetting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point;
        twpmsetting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        twpmsetting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];
        twpmsetting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0];
        twpmsetting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1];
        twpmsetting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0];
        twpmsetting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1];


        $('#' + tvid + "A_Curr_Title").text(twpmsetting.setting.set.AR.Title);
        $('#' + tvid + "V_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
        $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
        $('#' + tvid + "PF_Title").text(twpmsetting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(twpmsetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P2W(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P2W(tvid, realtimeObj);
        }
    }
    else {
        if (twpmsetting.setting !== null) {
            $('#' + tvid + "A_Curr_Title").text(twpmsetting.setting.set.AR.Title);
            $('#' + tvid + "V_Voltage_Title").text(twpmsetting.setting.set.VRS.Title);
            $('#' + tvid + "F_Frequency_Title").text(twpmsetting.setting.set.F.Title);
            $('#' + tvid + "PF_Title").text(twpmsetting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(twpmsetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(twpmsetting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(twpmsetting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(twpmsetting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(twpmsetting.setting.set.varhlead.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (twpmsetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P2W(tvid, retobj);

            return;
        }

        rs485_insread_data(unitNo, function (obj, twpmsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataTWPM1P2W(tvid, obj.Respons);

        }, twpmsetting);
    }
}

// TWPM設定画面を表示
function dispTwpm() {
    document.getElementById("rstype_twpm").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_twpm').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_twpm').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}


