/*version=1.20*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->


/**
* XS2 グラフ
*/
/*　機能： xs2グラフデータ取得サーバーへグラフ用のデータの要求を送信して、そして受信データを表示
                    受信データはJSON型
                    正常コード：200
    History:    新規作成 H.T.M.Huong 2018-10-12
*/

var xs21p2w_graph_exist = false;
var xs21p3w_graph_exist = false;
var xs23p3w_graph_exist = false;
var xs2_graph_type = false;

//グラフ用の時間配
var xs2_graph_time_AR = [];
var xs2_graph_time_AS = [];
var xs2_graph_time_AT = [];
var xs2_graph_time_AN = [];
var xs2_graph_time_VRS = [];
var xs2_graph_time_VST = [];
var xs2_graph_time_VTR = [];
var xs2_graph_time_VRN = [];
var xs2_graph_time_VSN = [];
var xs2_graph_time_VTN = [];
var xs2_graph_time_F = [];
var xs2_graph_time_PF = [];
var xs2_graph_time_W = [];
var xs2_graph_time_Wh = [];
var xs2_graph_time_var = [];
var xs2_graph_time_varh = [];
var xs2_graph_time_varhlead = [];

var xs2_graph_date;
var xs2_graph_dat_num;
//DIグラフ用のデータ配
var xs2_graph_data_AR = [];
var xs2_graph_data_AS = [];
var xs2_graph_data_AT = [];
var xs2_graph_data_AN = [];
var xs2_graph_data_VRS = [];
var xs2_graph_data_VST = [];
var xs2_graph_data_VTR = [];
var xs2_graph_data_VRN = [];
var xs2_graph_data_VSN = [];
var xs2_graph_data_VTN = [];
var xs2_graph_data_F = [];
var xs2_graph_data_PF = [];
var xs2_graph_data_W = [];
var xs2_graph_data_Wh = [];
var xs2_graph_data_var = [];
var xs2_graph_data_varh = [];
var xs2_graph_data_varhlead = [];

//XS2のチャート用定義
var xs21p2w_chart_AR;
var xs21p2w_chart_AS;
var xs21p2w_chart_AT;
var xs21p2w_chart_AN;
var xs21p2w_chart_VRS;
var xs21p2w_chart_VST;
var xs21p2w_chart_VTR;
var xs21p2w_chart_VRN;
var xs21p2w_chart_VSN;
var xs21p2w_chart_VTN;
var xs21p2w_chart_F;
var xs21p2w_chart_PF;
var xs21p2w_chart_W;
var xs21p2w_chart_Wh;
var xs21p2w_chart_var;
var xs21p2w_chart_varh;
var xs21p2w_chart_varhlead;

var xs21p3w_chart_AR;
var xs21p3w_chart_AS;
var xs21p3w_chart_AT;
var xs21p3w_chart_AN;
var xs21p3w_chart_VRS;
var xs21p3w_chart_VST;
var xs21p3w_chart_VTR;
var xs21p3w_chart_VRN;
var xs21p3w_chart_VSN;
var xs21p3w_chart_VTN;
var xs21p3w_chart_F;
var xs21p3w_chart_PF;
var xs21p3w_chart_W;
var xs21p3w_chart_Wh;
var xs21p3w_chart_var;
var xs21p3w_chart_varh;
var xs21p3w_chart_varhlead;

var xs23p3w_chart_AR;
var xs23p3w_chart_AS;
var xs23p3w_chart_AT;
var xs23p3w_chart_AN;
var xs23p3w_chart_VRS;
var xs23p3w_chart_VST;
var xs23p3w_chart_VTR;
var xs23p3w_chart_VRN;
var xs23p3w_chart_VSN;
var xs23p3w_chart_VTN;
var xs23p3w_chart_F;
var xs23p3w_chart_PF;
var xs23p3w_chart_W;
var xs23p3w_chart_Wh;
var xs23p3w_chart_var;
var xs23p3w_chart_varh;
var xs23p3w_chart_varhlead;

const XS2_TITLE_ = "title_";
const XS2_GRAPHH_ = "graphH_";
const XS2_GRAPHL_ = "graphL_";
const XS2_ALARMH_ = "alarmH_";
const XS2_ALARML_ = "alarmL_";
const XS2_ALARMHE_ = "alarmHE_";
const XS2_ALARMLE_ = "alarmLE_";
const XS2_CLALARMH_ = "ClAlarmH_";
const XS2_CLALARML_ = "ClAlarmL_";

function xs2_get_graph_data(obj, setdata) {

    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }

    // Graph date
    xs2_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        xs2_graph_time_AR.length = 0;
        xs2_graph_time_AS.length = 0;
        xs2_graph_time_AT.length = 0;
        xs2_graph_time_AN.length = 0;
        xs2_graph_time_VRS.length = 0;
        xs2_graph_time_VST.length = 0;
        xs2_graph_time_VTR.length = 0;
        xs2_graph_time_VRN.length = 0;
        xs2_graph_time_VSN.length = 0;
        xs2_graph_time_VTN.length = 0;
        xs2_graph_time_F.length = 0;
        xs2_graph_time_PF.length = 0;
        xs2_graph_time_W.length = 0;
        xs2_graph_time_Wh.length = 0;
        xs2_graph_time_var.length = 0;
        xs2_graph_time_varh.length = 0;
        xs2_graph_time_varhlead.length = 0;

        xs2_graph_data_AR.length = 0;
        xs2_graph_data_AS.length = 0;
        xs2_graph_data_AT.length = 0;
        xs2_graph_data_AN.length = 0;
        xs2_graph_data_VRS.length = 0;
        xs2_graph_data_VST.length = 0;
        xs2_graph_data_VTR.length = 0;
        xs2_graph_data_VRN.length = 0;
        xs2_graph_data_VSN.length = 0;
        xs2_graph_data_VTN.length = 0;
        xs2_graph_data_F.length = 0;
        xs2_graph_data_PF.length = 0;
        xs2_graph_data_W.length = 0;
        xs2_graph_data_Wh.length = 0;
        xs2_graph_data_var.length = 0;
        xs2_graph_data_varh.length = 0;
        xs2_graph_data_varhlead.length = 0;

        //電流と電圧データ格納
        if (setdata.type == UnitCode.XS2_1P2W) {
            // 電流データ格納
            for (var i = 0; i < obj.Respons.A_Current.Num; i++) {
                //時間
                xs2_graph_time_AR[i] = moment(obj.Respons.A_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AR[i] = obj.Respons.A_Current.Data[i].Value;
                }
            }

            //電圧データ格納
            for (var i = 0; i < obj.Respons.V_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VRS[i] = moment(obj.Respons.V_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VRS[i] = obj.Respons.V_Voltage.Data[i].Value;
                }
            }
        }
        else if (setdata.type == UnitCode.XS2_1P3W) {
            //A1データ格納
            for (var i = 0; i < obj.Respons.A1_Current.Num; i++) {
                //時間
                xs2_graph_time_AR[i] = moment(obj.Respons.A1_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A1_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AR[i] = obj.Respons.A1_Current.Data[i].Value;
                }
            }

            //ANデータ格納
            for (var i = 0; i < obj.Respons.AN_Current.Num; i++) {
                //時間
                xs2_graph_time_AS[i] = moment(obj.Respons.AN_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AN_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AS[i] = obj.Respons.AN_Current.Data[i].Value;
                }
            }

            //A2データ格納
            for (var i = 0; i < obj.Respons.A2_Current.Num; i++) {
                //時間
                xs2_graph_time_AT[i] = moment(obj.Respons.A2_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A2_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AT[i] = obj.Respons.A2_Current.Data[i].Value;
                }
            }


            //V1Nデータ格納
            for (var i = 0; i < obj.Respons.V1N_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VRS[i] = moment(obj.Respons.V1N_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V1N_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VRS[i] = obj.Respons.V1N_Voltage.Data[i].Value;
                }
            }

            //V2Nデータ格納
            for (var i = 0; i < obj.Respons.V2N_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VST[i] = moment(obj.Respons.V2N_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V2N_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VST[i] = obj.Respons.V2N_Voltage.Data[i].Value;
                }
            }

            //V12データ格納
            for (var i = 0; i < obj.Respons.V12_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VTR[i] = moment(obj.Respons.V12_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V12_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VTR[i] = obj.Respons.V12_Voltage.Data[i].Value;
                }
            }


        }
        else if (setdata.type == UnitCode.XS2_3P3W) {
            //AR-データ格納
            for (var i = 0; i < obj.Respons.AR_Current.Num; i++) {
                //時間
                xs2_graph_time_AR[i] = moment(obj.Respons.AR_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AR_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AR[i] = obj.Respons.AR_Current.Data[i].Value;
                }
            }

            //AS-データ格納
            for (var i = 0; i < obj.Respons.AS_Current.Num; i++) {
                //時間
                xs2_graph_time_AS[i] = moment(obj.Respons.AS_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AS_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AS[i] = obj.Respons.AS_Current.Data[i].Value;
                }
            }

            //AT-データ格納
            for (var i = 0; i < obj.Respons.AT_Current.Num; i++) {
                //時間
                xs2_graph_time_AT[i] = moment(obj.Respons.AT_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AT_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_AT[i] = obj.Respons.AT_Current.Data[i].Value;
                }
            }


            //VRSデータ格納
            for (var i = 0; i < obj.Respons.VRS_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VRS[i] = moment(obj.Respons.VRS_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VRS_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VRS[i] = obj.Respons.VRS_Voltage.Data[i].Value;
                }
            }

            //VST-データ格納
            for (var i = 0; i < obj.Respons.VST_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VST[i] = moment(obj.Respons.VST_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VST_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VST[i] = obj.Respons.VST_Voltage.Data[i].Value;
                }
            }

            //VTR-データ格納
            for (var i = 0; i < obj.Respons.VTR_Voltage.Num; i++) {
                //時間
                xs2_graph_time_VTR[i] = moment(obj.Respons.VTR_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VTR_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xs2_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    xs2_graph_data_VTR[i] = obj.Respons.VTR_Voltage.Data[i].Value;
                }
            }

        }

        //周波数データ格納
        for (var i = 0; i < obj.Respons.F_Frequency.Num; i++) {
            //時間
            xs2_graph_time_F[i] = moment(obj.Respons.F_Frequency.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.F_Frequency.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                xs2_graph_data_F[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_F[i] = obj.Respons.F_Frequency.Data[i].Value;
            }
        }

        //力率データ格納
        for (var i = 0; i < obj.Respons.PF_PowerFactor.Num; i++) {
            //時間
            xs2_graph_time_PF[i] = moment(obj.Respons.PF_PowerFactor.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.PF_PowerFactor.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                xs2_graph_data_PF[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_PF[i] = obj.Respons.PF_PowerFactor.Data[i].Value;
            }
        }


        //電力データ格納
        for (var i = 0; i < obj.Respons.W_Power.Num; i++) {
            //時間
            xs2_graph_time_W[i] = moment(obj.Respons.W_Power.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.W_Power.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                xs2_graph_data_W[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_W[i] = obj.Respons.W_Power.Data[i].Value;
            }
        }

        //電力量データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間
            xs2_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                xs2_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }

        //無効電力データ格納
        for (var i = 0; i < obj.Respons.var_Power.Num; i++) {
            //時間
            xs2_graph_time_var[i] = moment(obj.Respons.var_Power.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.var_Power.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                xs2_graph_data_var[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_var[i] = obj.Respons.var_Power.Data[i].Value;
            }
        }

        //無効電力量データ格納(LAG)
        for (var i = 0; i < obj.Respons.varh_Energy.Num; i++) {
            //時間
            xs2_graph_time_varh[i] = moment(obj.Respons.varh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varh_Energy.Data[i].RSSI) == 0) {
                xs2_graph_data_varh[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_varh[i] = obj.Respons.varh_Energy.Data[i].Value;
            }
        }

        //無効電力量データ格納(LEAD)
        for (var i = 0; i < obj.Respons.varhlead_Energy.Num; i++) {
            //時間
            xs2_graph_time_varhlead[i] = moment(obj.Respons.varhlead_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.varhlead_Energy.Data[i].RSSI) == 0) {
                xs2_graph_data_varhlead[i] = null;
            }
            //データがある
            else {
                xs2_graph_data_varhlead[i] = obj.Respons.varhlead_Energy.Data[i].Value;
            }
        }


        // グラフの更新
        switch (setdata.type) {
            case UnitCode.XS2_1P2W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xs21p2w_graph_exist == false) {
                    xs21p2w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xs21p2w_graph_exist = true;
                }
                else {
                    xs21p2w_update_graph(setdata);
                }
                break;
            case UnitCode.XS2_1P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xs21p3w_graph_exist == false) {
                    xs21p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xs21p3w_graph_exist = true;
                }
                else {
                    xs21p3w_update_graph(setdata);
                }
                break;
            case UnitCode.XS2_3P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xs23p3w_graph_exist == false) {
                    xs23p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xs23p3w_graph_exist = true;
                }
                else {
                    xs23p3w_update_graph(setdata);
                }
                break;

        }


        /* chart time update */
        if (setdata.type == UnitCode.XS2_1P2W) {
            document.getElementById("xs21p2w_A_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_V_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_F_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_PF_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_W_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_Wh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_var_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_varh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_varhlead_chart_time").innerHTML = xs2_graph_date;
        }
        else if (setdata.type == UnitCode.XS2_1P3W) {
            document.getElementById("xs21p3w_A1_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_AN_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_A2_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_V1N_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_V2N_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_V12_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_F_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_PF_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_W_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_Wh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_var_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_varh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_varhlead_chart_time").innerHTML = xs2_graph_date;
        }
        else if (setdata.type == UnitCode.XS2_3P3W) {
            document.getElementById("xs23p3w_AR_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_AS_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_AT_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_VRS_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_VST_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_VTR_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_F_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_PF_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_W_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_Wh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_var_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_varh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_varhlead_chart_time").innerHTML = xs2_graph_date;

        }


    }
    //データ無し
    else if (obj.Status == 400) {
        xs2_graph_data_AR[i] = null;
        xs2_graph_data_AS[i] = null;
        xs2_graph_data_AT[i] = null;
        xs2_graph_data_AN[i] = null;
        xs2_graph_data_VRS[i] = null;
        xs2_graph_data_VST[i] = null;
        xs2_graph_data_VTR[i] = null;
        xs2_graph_data_VRN[i] = null;
        xs2_graph_data_VSN[i] = null;
        xs2_graph_data_VTN[i] = null;
        xs2_graph_data_F[i] = null;
        xs2_graph_data_PF[i] = null;
        xs2_graph_data_W[i] = null;
        xs2_graph_data_Wh[i] = null;
        xs2_graph_data_var[i] = null;
        xs2_graph_data_varh[i] = null;
        xs2_graph_data_varhlead[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        switch (setdata.type) {
            case UnitCode.XS2_1P2W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xs21p2w_graph_exist == false) {
                    xs21p2w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xs21p2w_graph_exist = true;
                }
                else {
                    xs21p2w_update_graph(setdata);
                }
                break;
            case UnitCode.XS2_1P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xs21p3w_graph_exist == false) {
                    xs21p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xs21p3w_graph_exist = true;
                }
                else {
                    xs21p3w_update_graph(setdata);
                }
                break;
            case UnitCode.XS2_3P3W:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xs23p3w_graph_exist == false) {
                    xs23p3w_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xs23p3w_graph_exist = true;
                }
                else {
                    xs23p3w_update_graph(setdata);
                }
                break;
        }

        /* graph chart time update */
        if (setdata.type == UnitCode.XS2_1P2W) {
            document.getElementById("xs21p2w_A_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_V_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_F_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_PF_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_W_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_Wh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_var_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_varh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p2w_varhlead_chart_time").innerHTML = xs2_graph_date;
        }
        else if (setdata.type == UnitCode.XS2_1P3W) {
            document.getElementById("xs21p3w_A1_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_AN_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_A2_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_V1N_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_V2N_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_V12_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_F_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_PF_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_W_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_Wh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_var_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_varh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs21p3w_varhlead_chart_time").innerHTML = xs2_graph_date;
        }
        else if (setdata.type == UnitCode.XS2_3P3W) {
            document.getElementById("xs23p3w_AR_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_AS_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_AT_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_VRS_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_VST_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_VTR_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_F_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_PF_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_W_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_Wh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_var_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_varh_chart_time").innerHTML = xs2_graph_date;
            document.getElementById("xs23p3w_varhlead_chart_time").innerHTML = xs2_graph_date;

        }

    }
    else {

    }
}

/**
 *
 */
function xs21p2w_draw_graph(setdata) {
    xs2_draw_graph(setdata)
}

/**
 *
 */
function xs21p3w_draw_graph(setdata) {
    xs2_draw_graph(setdata)
}

/**
 *
 */
function xs23p3w_draw_graph(setdata) {
    xs2_draw_graph(setdata)
}

/*  機能：
*/
function xs2_draw_graph(setdata) {
    //CANVAS 2d content オブジェクトを取得   グラフ用
    if (setdata.type == UnitCode.XS2_1P2W) {
        var canvas_AR = document.getElementById("xs21p2w_A_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("xs21p2w_V_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("xs21p2w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("xs21p2w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("xs21p2w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("xs21p2w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("xs21p2w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("xs21p2w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("xs21p2w_varhlead_chart_canvas").getContext("2d");
    }
    else if (setdata.type == UnitCode.XS2_1P3W) {
        var canvas_AR = document.getElementById("xs21p3w_A1_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("xs21p3w_AN_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("xs21p3w_A2_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("xs21p3w_V1N_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("xs21p3w_V2N_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("xs21p3w_V12_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("xs21p3w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("xs21p3w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("xs21p3w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("xs21p3w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("xs21p3w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("xs21p3w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("xs21p3w_varhlead_chart_canvas").getContext("2d");
    }
    else if (setdata.type == UnitCode.XS2_3P3W) {
        var canvas_AR = document.getElementById("xs23p3w_AR_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("xs23p3w_AS_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("xs23p3w_AT_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("xs23p3w_VRS_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("xs23p3w_VST_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("xs23p3w_VTR_chart_canvas").getContext("2d");
        var canvas_F = document.getElementById("xs23p3w_F_chart_canvas").getContext("2d");
        var canvas_PF = document.getElementById("xs23p3w_PF_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("xs23p3w_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("xs23p3w_Wh_chart_canvas").getContext("2d");
        var canvas_var = document.getElementById("xs23p3w_var_chart_canvas").getContext("2d");
        var canvas_varh = document.getElementById("xs23p3w_varh_chart_canvas").getContext("2d");
        var canvas_varhlead = document.getElementById("xs23p3w_varhlead_chart_canvas").getContext("2d");
    }

    //グラフを描画
    if (setdata.type == UnitCode.XS2_1P2W) {
        xs21p2w_chart_AR = draw_graph_line(canvas_AR, xs2_graph_time_AR, xs2_graph_data_AR, xs2_graph_time_AR.length, setdata.setting.set.AR);
        xs21p2w_chart_VRS = draw_graph_line(canvas_VRS, xs2_graph_time_VRS, xs2_graph_data_VRS, xs2_graph_time_VRS.length, setdata.setting.set.VRS);
        xs21p2w_chart_F = draw_graph_line(canvas_F, xs2_graph_time_F, xs2_graph_data_F, xs2_graph_time_F.length, setdata.setting.set.F);
        xs21p2w_chart_PF = pw_draw_graph_line(canvas_PF, xs2_graph_time_PF, xs2_graph_data_PF, xs2_graph_time_PF.length, setdata.setting.set.PF);
        xs21p2w_chart_W = draw_graph_line(canvas_W, xs2_graph_time_W, xs2_graph_data_W, xs2_graph_time_W.length, setdata.setting.set.W);
        xs21p2w_chart_Wh = draw_graph_bar(canvas_Wh, xs2_graph_time_Wh, xs2_graph_data_Wh, xs2_graph_time_Wh.length, setdata.setting.set.Wh);
        xs21p2w_chart_var = draw_graph_line(canvas_var, xs2_graph_time_var, xs2_graph_data_var, xs2_graph_time_var.length, setdata.setting.set.var);
        xs21p2w_chart_varh = draw_graph_bar(canvas_varh, xs2_graph_time_varh, xs2_graph_data_varh, xs2_graph_time_varh.length, setdata.setting.set.varh);
        xs21p2w_chart_varhlead = draw_graph_bar(canvas_varhlead, xs2_graph_time_varhlead, xs2_graph_data_varhlead, xs2_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.XS2_1P3W) {
        xs21p3w_chart_AR = draw_graph_line(canvas_AR, xs2_graph_time_AR, xs2_graph_data_AR, xs2_graph_time_AR.length, setdata.setting.set.AR);
        xs21p3w_chart_AS = draw_graph_line(canvas_AS, xs2_graph_time_AS, xs2_graph_data_AS, xs2_graph_time_AS.length, setdata.setting.set.AS);
        xs21p3w_chart_AT = draw_graph_line(canvas_AT, xs2_graph_time_AT, xs2_graph_data_AT, xs2_graph_time_AT.length, setdata.setting.set.AT);
        xs21p3w_chart_VRS = draw_graph_line(canvas_VRS, xs2_graph_time_VRS, xs2_graph_data_VRS, xs2_graph_time_VRS.length, setdata.setting.set.VRS);
        xs21p3w_chart_VST = draw_graph_line(canvas_VST, xs2_graph_time_VST, xs2_graph_data_VST, xs2_graph_time_VST.length, setdata.setting.set.VST);
        xs21p3w_chart_VTR = draw_graph_line(canvas_VTR, xs2_graph_time_VTR, xs2_graph_data_VTR, xs2_graph_time_VTR.length, setdata.setting.set.VTR);
        xs21p3w_chart_F = draw_graph_line(canvas_F, xs2_graph_time_F, xs2_graph_data_F, xs2_graph_time_F.length, setdata.setting.set.F);
        xs21p3w_chart_PF = pw_draw_graph_line(canvas_PF, xs2_graph_time_PF, xs2_graph_data_PF, xs2_graph_time_PF.length, setdata.setting.set.PF);
        xs21p3w_chart_W = draw_graph_line(canvas_W, xs2_graph_time_W, xs2_graph_data_W, xs2_graph_time_W.length, setdata.setting.set.W);
        xs21p3w_chart_Wh = draw_graph_bar(canvas_Wh, xs2_graph_time_Wh, xs2_graph_data_Wh, xs2_graph_time_Wh.length, setdata.setting.set.Wh);
        xs21p3w_chart_var = draw_graph_line(canvas_var, xs2_graph_time_var, xs2_graph_data_var, xs2_graph_time_var.length, setdata.setting.set.var);
        xs21p3w_chart_varh = draw_graph_bar(canvas_varh, xs2_graph_time_varh, xs2_graph_data_varh, xs2_graph_time_varh.length, setdata.setting.set.varh);
        xs21p3w_chart_varhlead = draw_graph_bar(canvas_varhlead, xs2_graph_time_varhlead, xs2_graph_data_varhlead, xs2_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.XS2_3P3W) {
        xs23p3w_chart_AR = draw_graph_line(canvas_AR, xs2_graph_time_AR, xs2_graph_data_AR, xs2_graph_time_AR.length, setdata.setting.set.AR);
        xs23p3w_chart_AS = draw_graph_line(canvas_AS, xs2_graph_time_AS, xs2_graph_data_AS, xs2_graph_time_AS.length, setdata.setting.set.AS);
        xs23p3w_chart_AT = draw_graph_line(canvas_AT, xs2_graph_time_AT, xs2_graph_data_AT, xs2_graph_time_AT.length, setdata.setting.set.AT);
        xs23p3w_chart_VRS = draw_graph_line(canvas_VRS, xs2_graph_time_VRS, xs2_graph_data_VRS, xs2_graph_time_VRS.length, setdata.setting.set.VRS);
        xs23p3w_chart_VST = draw_graph_line(canvas_VST, xs2_graph_time_VST, xs2_graph_data_VST, xs2_graph_time_VST.length, setdata.setting.set.VST);
        xs23p3w_chart_VTR = draw_graph_line(canvas_VTR, xs2_graph_time_VTR, xs2_graph_data_VTR, xs2_graph_time_VTR.length, setdata.setting.set.VTR);
        xs23p3w_chart_F = draw_graph_line(canvas_F, xs2_graph_time_F, xs2_graph_data_F, xs2_graph_time_F.length, setdata.setting.set.F);
        xs23p3w_chart_PF = pw_draw_graph_line(canvas_PF, xs2_graph_time_PF, xs2_graph_data_PF, xs2_graph_time_PF.length, setdata.setting.set.PF);
        xs23p3w_chart_W = draw_graph_line(canvas_W, xs2_graph_time_W, xs2_graph_data_W, xs2_graph_time_W.length, setdata.setting.set.W);
        xs23p3w_chart_Wh = draw_graph_bar(canvas_Wh, xs2_graph_time_Wh, xs2_graph_data_Wh, xs2_graph_time_Wh.length, setdata.setting.set.Wh);
        xs23p3w_chart_var = draw_graph_line(canvas_var, xs2_graph_time_var, xs2_graph_data_var, xs2_graph_time_var.length, setdata.setting.set.var);
        xs23p3w_chart_varh = draw_graph_bar(canvas_varh, xs2_graph_time_varh, xs2_graph_data_varh, xs2_graph_time_varh.length, setdata.setting.set.varh);
        xs23p3w_chart_varhlead = draw_graph_bar(canvas_varhlead, xs2_graph_time_varhlead, xs2_graph_data_varhlead, xs2_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
}


/**
 *
 */
function xs21p2w_update_graph(setdata) {
    xs2_update_graph(setdata)
}

/**
 *
 */
function xs21p3w_update_graph(setdata) {
    xs2_update_graph(setdata)
}

/**
 *
 */
function xs23p3w_update_graph(setdata) {
    xs2_update_graph(setdata)
}

/*  機能：  AD、DI、電波強度のグラフを更新
*/
function xs2_update_graph(setdata) {
    //
    if (setdata.type == UnitCode.XS2_1P2W) {
        graph_line_update(xs21p2w_chart_AR, xs2_graph_time_AR, xs2_graph_data_AR, xs2_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(xs21p2w_chart_VRS, xs2_graph_time_VRS, xs2_graph_data_VRS, xs2_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(xs21p2w_chart_F, xs2_graph_time_F, xs2_graph_data_F, xs2_graph_time_F.length, setdata.setting.set.F);
        pw_update_graph_line(xs21p2w_chart_PF, xs2_graph_time_PF, xs2_graph_data_PF, xs2_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(xs21p2w_chart_W, xs2_graph_time_W, xs2_graph_data_W, xs2_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(xs21p2w_chart_Wh, xs2_graph_time_Wh, xs2_graph_data_Wh, xs2_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(xs21p2w_chart_var, xs2_graph_time_var, xs2_graph_data_var, xs2_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(xs21p2w_chart_varh, xs2_graph_time_varh, xs2_graph_data_varh, xs2_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(xs21p2w_chart_varhlead, xs2_graph_time_varhlead, xs2_graph_data_varhlead, xs2_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }
    else if (setdata.type == UnitCode.XS2_1P3W) {
        graph_line_update(xs21p3w_chart_AR, xs2_graph_time_AR, xs2_graph_data_AR, xs2_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(xs21p3w_chart_AS, xs2_graph_time_AS, xs2_graph_data_AS, xs2_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(xs21p3w_chart_AT, xs2_graph_time_AT, xs2_graph_data_AT, xs2_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(xs21p3w_chart_VRS, xs2_graph_time_VRS, xs2_graph_data_VRS, xs2_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(xs21p3w_chart_VST, xs2_graph_time_VST, xs2_graph_data_VST, xs2_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(xs21p3w_chart_VTR, xs2_graph_time_VTR, xs2_graph_data_VTR, xs2_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(xs21p3w_chart_F, xs2_graph_time_F, xs2_graph_data_F, xs2_graph_time_F.length, setdata.setting.set.F);
        pw_update_graph_line(xs21p3w_chart_PF, xs2_graph_time_PF, xs2_graph_data_PF, xs2_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(xs21p3w_chart_W, xs2_graph_time_W, xs2_graph_data_W, xs2_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(xs21p3w_chart_Wh, xs2_graph_time_Wh, xs2_graph_data_Wh, xs2_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(xs21p3w_chart_var, xs2_graph_time_var, xs2_graph_data_var, xs2_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(xs21p3w_chart_varh, xs2_graph_time_varh, xs2_graph_data_varh, xs2_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(xs21p3w_chart_varhlead, xs2_graph_time_varhlead, xs2_graph_data_varhlead, xs2_graph_time_varhlead.length, setdata.setting.set.varhlead);

    }
    else if (setdata.type == UnitCode.XS2_3P3W) {
        graph_line_update(xs23p3w_chart_AR, xs2_graph_time_AR, xs2_graph_data_AR, xs2_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(xs23p3w_chart_AS, xs2_graph_time_AS, xs2_graph_data_AS, xs2_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(xs23p3w_chart_AT, xs2_graph_time_AT, xs2_graph_data_AT, xs2_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(xs23p3w_chart_VRS, xs2_graph_time_VRS, xs2_graph_data_VRS, xs2_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(xs23p3w_chart_VST, xs2_graph_time_VST, xs2_graph_data_VST, xs2_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(xs23p3w_chart_VTR, xs2_graph_time_VTR, xs2_graph_data_VTR, xs2_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(xs23p3w_chart_F, xs2_graph_time_F, xs2_graph_data_F, xs2_graph_time_F.length, setdata.setting.set.F);
        pw_update_graph_line(xs23p3w_chart_PF, xs2_graph_time_PF, xs2_graph_data_PF, xs2_graph_time_PF.length, setdata.setting.set.PF);
        graph_line_update(xs23p3w_chart_W, xs2_graph_time_W, xs2_graph_data_W, xs2_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(xs23p3w_chart_Wh, xs2_graph_time_Wh, xs2_graph_data_Wh, xs2_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(xs23p3w_chart_var, xs2_graph_time_var, xs2_graph_data_var, xs2_graph_time_var.length, setdata.setting.set.var);
        graph_bar_update(xs23p3w_chart_varh, xs2_graph_time_varh, xs2_graph_data_varh, xs2_graph_time_varh.length, setdata.setting.set.varh);
        graph_bar_update(xs23p3w_chart_varhlead, xs2_graph_time_varhlead, xs2_graph_data_varhlead, xs2_graph_time_varhlead.length, setdata.setting.set.varhlead);
    }

}

/**
 * グラフデータを削除
 */
function fncXs2GrpClr(type) {

    try {
        xs2_graph_data_AR.length = 0;
        xs2_graph_data_VRS.length = 0;
        xs2_graph_data_VST.length = 0;
        xs2_graph_data_VTR.length = 0;
        xs2_graph_data_F.length = 0;
        xs2_graph_data_PF.length = 0;
        xs2_graph_data_W.length = 0;
        xs2_graph_data_Wh.length = 0;
        xs2_graph_data_var.length = 0;
        xs2_graph_data_varh.length = 0;
        xs2_graph_data_varhlead.length = 0;
        xs2_graph_data_AS.length = 0;
        xs2_graph_data_AT.length = 0;
        xs2_graph_data_AN.length = 0;
        xs2_graph_data_VRN.length = 0;
        xs2_graph_data_VSN.length = 0;
        xs2_graph_data_VTN.length = 0;
    } catch (error) {

    }

    try {
        xs2_graph_time_AR.length = 0;
        xs2_graph_time_VRS.length = 0;
        xs2_graph_time_VST.length = 0;
        xs2_graph_time_VTR.length = 0;
        xs2_graph_time_F.length = 0;
        xs2_graph_time_PF.length = 0;
        xs2_graph_time_W.length = 0;
        xs2_graph_time_Wh.length = 0;
        xs2_graph_time_var.length = 0;
        xs2_graph_time_varh.length = 0;
        xs2_graph_time_varhlead.length = 0;
        xs2_graph_time_AS.length = 0;
        xs2_graph_time_AT.length = 0;
        xs2_graph_time_AN.length = 0;
        xs2_graph_time_VRN.length = 0;
        xs2_graph_time_VSN.length = 0;
        xs2_graph_time_VTN.length = 0;
    } catch (error) {

    }


    /**
     *
     */
    switch (type) {
        case UnitCode.XS2_1P2W:
            if (xs21p2w_graph_exist == true) {
                xs21p2w_chart_AR.destroy();
                xs21p2w_chart_VRS.destroy();
                xs21p2w_chart_F.destroy();
                xs21p2w_chart_PF.destroy();
                xs21p2w_chart_W.destroy();
                xs21p2w_chart_Wh.destroy();
                xs21p2w_chart_var.destroy();
                xs21p2w_chart_varh.destroy();
                xs21p2w_chart_varhlead.destroy();

                xs21p2w_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.XS2_1P3W:
            if (xs21p3w_graph_exist == true) {
                xs21p3w_chart_AR.destroy();
                xs21p3w_chart_AS.destroy();
                xs21p3w_chart_AT.destroy();
                xs21p3w_chart_VRS.destroy();
                xs21p3w_chart_VST.destroy();
                xs21p3w_chart_VTR.destroy();
                xs21p3w_chart_F.destroy();
                xs21p3w_chart_PF.destroy();
                xs21p3w_chart_W.destroy();
                xs21p3w_chart_Wh.destroy();
                xs21p3w_chart_var.destroy();
                xs21p3w_chart_varh.destroy();
                xs21p3w_chart_varhlead.destroy();

                xs21p3w_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.XS2_3P3W:
            if (xs23p3w_graph_exist == true) {
                xs23p3w_chart_AR.destroy();
                xs23p3w_chart_AS.destroy();
                xs23p3w_chart_AT.destroy();
                xs23p3w_chart_VRS.destroy();
                xs23p3w_chart_VST.destroy();
                xs23p3w_chart_VTR.destroy();
                xs23p3w_chart_F.destroy();
                xs23p3w_chart_PF.destroy();
                xs23p3w_chart_W.destroy();
                xs23p3w_chart_Wh.destroy();
                xs23p3w_chart_var.destroy();
                xs23p3w_chart_varh.destroy();
                xs23p3w_chart_varhlead.destroy();

                xs23p3w_graph_exist = false;
            }
            else {

            }
            break;
    }

    term = "#alertH_xs21p3w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#xs21p3wupdated_time").text("データ更新：----/--/-- --:--");
    $("#xs21p3w_A1_Current").text("--");
    $("#xs21p3w_AN_Current").text("--");
    $("#xs21p3w_A2_Current").text("--");
    $("#xs21p3w_V1N_Voltage").text("--");
    $("#xs21p3w_V2N_Voltage").text("--");
    $("#xs21p3w_V12_Voltage").text("--");
    $("#xs21p3w_F_Frequency").text("--");
    $("#xs21p3w_PF_PowerFactor").text("--");
    $("#xs21p3w_W_Power").text("--");
    $("#xs21p3w_Wh_Energy").text("--");
    $("#xs21p3w_var_Power").text("--");
    $("#xs21p3w_varh_Energy").text("--");
    $("#xs21p3w_varhlead_Energy").text("--");

    term = "#alertH_xs23p3w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#xs23p3wupdated_time").text("データ更新：----/--/-- --:--");
    $("#xs23p3w_AR_Current").text("--");
    $("#xs23p3w_AS_Current").text("--");
    $("#xs23p3w_AT_Current").text("--");
    $("#xs23p3w_VRS_Voltage").text("--");
    $("#xs23p3w_VST_Voltage").text("--");
    $("#xs23p3w_VTR_Voltage").text("--");
    $("#xs23p3w_F_Frequency").text("--");
    $("#xs23p3w_PF_PowerFactor").text("--");
    $("#xs23p3w_W_Power").text("--");
    $("#xs23p3w_Wh_Energy").text("--");
    $("#xs23p3w_var_Power").text("--");
    $("#xs23p3w_varh_Energy").text("--");
    $("#xs23p3w_varhlead_Energy").text("--");


    term = "#alertH_xs21p2w";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#xs21p2wupdated_time").text("データ更新：----/--/-- --:--");
    $("#xs21p2w_A_Current").text("--");
    $("#xs21p2w_V_Voltage").text("--");
    $("#xs21p2w_F_Frequency").text("--");
    $("#xs21p2w_PF_PowerFactor").text("--");
    $("#xs21p2w_W_Power").text("--");
    $("#xs21p2w_Wh_Energy").text("--");
    $("#xs21p2w_var_Power").text("--");
    $("#xs21p2w_varh_Energy").text("--");
    $("#xs21p2w_varhlead_Energy").text("--");

    xs2_graph_type = type;
}

/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：XS2の価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_xs2_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var termL;
    var prefix;
    var suffix;
    var chkExclude = ["Wh", "varh", "varhlead", "PF"];
    var strIn;
    var termClH;
    var termClL;

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + XS2_TITLE_ + suffix;
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
    if (string_len_check(document.getElementById(ID_temp).value, 20, ("タイトルは"), true) == false) return false;
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

    if (chkExclude.includes(suffix) == false) {
        //グラフの上限値
        ID_temp = prefix + XS2_GRAPHH_ + suffix;
        console.log(ID_temp);
        strIn = document.getElementById(ID_temp).value;
        if ((isNaN(strIn) == true) || (strIn.trim() == "")) {
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
        ID_temp = prefix + XS2_GRAPHL_ + suffix;
        console.log(ID_temp);
        strIn = document.getElementById(ID_temp).value;
        if ((isNaN(strIn) == true) || (strIn.trim() == "")) {
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
                text: "グラフ下限値はグラフ上限値より大きな値を入力しないでください。",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        //上限警報発生値
        ID_temp = prefix + XS2_ALARMH_ + suffix;
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
        ID_temp = prefix + XS2_CLALARMH_ + suffix;
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
        ID_temp = prefix + XS2_ALARML_ + suffix;
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
        ID_temp = prefix + XS2_CLALARML_ + suffix;
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
        ID_temp = prefix + XS2_GRAPHH_ + suffix;
        console.log(ID_temp);
        strIn = document.getElementById(ID_temp).value;
        if ((isNaN(strIn) == true) || (strIn.trim() == "")) {
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

/*  機能：  XS2設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            i: XS2の設定ボタンの順番
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_xs2_setting(unitNo, e) {
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
    jsDat.Title = chr2sjis(document.getElementById(prefix + XS2_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + XS2_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + XS2_GRAPHH_ + suffix).value, settingpoint);
    //[AlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + XS2_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + XS2_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmL = dec2hex(document.getElementById(prefix + XS2_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmL = "000000000000";
    }
    //[ClAlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmH = dec2hex(document.getElementById(prefix + XS2_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmH = "000000000000";
    }

    jsDat.MODEL_CHECK = 0;

    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}

/**
 * XS2設定ボタンをクリックの処理
 * 入力値をチェックしてから、サーバーに保存する
 */
function fncSaveSetting_XS2(e) {
    if (check_xs2_input(e) == true) {
        var unitNo = ("000" + setTreeViewJson.Respons.GroupList[gcurgrp].LoRaUnitList[gcurunit].ModbusUnitList[
            gcurrs].UnitNo.toString(16).toUpperCase()).substr(-4);
        set_xs2_setting(unitNo, e);
    };
}

/**
 * XS2の設定値を表示する
 *
 */
var gxs2SettingPointArray = {};
function xs2_loaddata_setting(obj, Type) {
    var settingpoint = 4;
    if (obj.Status == 200) {
        // Setting point clear
        gxs2SettingPointArray = {};
        console.log("TYPE:" + Type);

        switch (Type) {
            case UnitCode.XS2_1P2W:
                prefix = "xs21p2w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.A_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.A_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.A_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.A_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.A_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.A_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.A_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.A_Current.AlarmE[1]) == 1) ? true : false;
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.A_Current.AlarmE[0]) == 1) ? true : false;
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.V_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.V_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.V_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.V_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.V_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.V_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.V_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.V_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.V_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V_Voltage.Point;


                suffix = "F";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;


                suffix = "PF";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;


                suffix = "W";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;


                suffix = "Wh";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;


                suffix = "var";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;


                suffix = "varh";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;

                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy ){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }
/*

                suffix = "varhlead";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
*/
                break;

            case UnitCode.XS2_1P3W:
                prefix = "xs21p3w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.A1_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.A1_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.A1_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.A1_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.A1_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.A1_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.A1_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.A1_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.A1_Current.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A1_Current.Point;

                suffix = "AS";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.AN_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.AN_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.AN_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.AN_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.AN_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.AN_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.AN_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AN_Current.Point;

                suffix = "AT";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.A2_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.A2_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.A2_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.A2_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.A2_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.A2_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.A2_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.A2_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.A2_Current.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A2_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.V1N_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.V1N_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.V1N_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.V1N_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.V1N_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.V1N_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.V1N_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.V1N_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.V1N_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V1N_Voltage.Point;

                suffix = "VST"
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.V2N_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.V2N_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.V2N_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.V2N_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.V2N_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.V2N_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.V2N_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.V2N_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.V2N_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V2N_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.V12_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.V12_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.V12_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.V12_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.V12_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.V12_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.V12_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.V12_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.V12_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V12_Voltage.Point;

                suffix = "F";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;

                suffix = "PF";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;

                suffix = "W";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "var"
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;

                suffix = "varh";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;
                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy ){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }
/*
              suffix = "varhlead";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
*/
                break;

            case UnitCode.XS2_3P3W:
                prefix = "xs23p3w_";
                suffix = "AR";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.AR_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.AR_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.AR_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.AR_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.AR_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.AR_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.AR_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AR_Current.Point;


                suffix = "AS";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.AS_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.AS_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.AS_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.AS_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.AS_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.AS_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.AS_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AS_Current.Point;


                suffix = "AT";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.AT_Current.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.AT_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.AT_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.AT_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.AT_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.AT_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.AT_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AT_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.VRS_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.VRS_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.VRS_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VRS_Voltage.Point;

                suffix = "VST";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.VST_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.VST_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.VST_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.VST_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.VST_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VST_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.VTR_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.VTR_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.VTR_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VTR_Voltage.Point;

                suffix = "F";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.F_Frequency.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.F_Frequency.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.F_Frequency.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.F_Frequency.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.F_Frequency.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.F_Frequency.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.F_Frequency.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.F_Frequency.Point;

                suffix = "PF";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.PF_PowerFactor.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.PF_PowerFactor.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.PF_PowerFactor.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.PF_PowerFactor.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.PF_PowerFactor.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.PF_PowerFactor.Point;

                suffix = "W";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "var";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.var_Power.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.var_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XS2_GRAPHL_ + suffix).val((obj.Respons.var_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.var_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XS2_ALARML_ + suffix).val((obj.Respons.var_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XS2_CLALARMH_ + suffix).val((obj.Respons.var_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XS2_CLALARML_ + suffix).val((obj.Respons.var_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XS2_ALARMHE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XS2_ALARMLE_ + suffix).checked = ((obj.Respons.var_Power.AlarmE[0]));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.var_Power.Point;

                suffix = "varh";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varh_Energy.Point;

                //無効電力量（LEAD）
                if (obj.Respons.varhlead_Energy ){
                    suffix = "varhlead";
                    // タイトル
                    $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                    // グラフ上限
                    $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                    // 警報上限
                    $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                    // 小数点値
                    gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
                }
/*
                suffix = "varhlead";
                // タイトル
                $("#" + prefix + XS2_TITLE_ + suffix).val(jis2chr(obj.Respons.varhlead_Energy.Title));
                // グラフ上限
                $("#" + prefix + XS2_GRAPHH_ + suffix).val((obj.Respons.varhlead_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XS2_ALARMH_ + suffix).val((obj.Respons.varhlead_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxs2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.varhlead_Energy.Point;
*/
                break;
        }

    } else {
        //Debug
    }
}

/**
* XS21P2Wデータ
*/
function get_InsDatXS21P2W(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#xs21p2wupdated_time").text("データ更新：----/--/-- --:--");
        $("#xs21p2w_A_Current").text("--");
        $("#xs21p2w_V_Voltage").text("--");
        $("#xs21p2w_F_Frequency").text("--");
        $("#xs21p2w_PF_PowerFactor").text("--");
        $("#xs21p2w_W_Power").text("--");
        $("#xs21p2w_Wh_Energy").text("--");
        $("#xs21p2w_var_Power").text("--");
        $("#xs21p2w_varh_Energy").text("--");
        $("#xs21p2w_varhlead_Energy").text("--");

        var term = "#alertH_xs21p2w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "xs21p2w";

        $("#xs21p2w_A_Current_Title").text(setting.setting.set.AR.Title);
        $("#xs21p2w_V_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#xs21p2w_F_Frequency_Title").text(setting.setting.set.F.Title);
        $("#xs21p2w_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $("#xs21p2w_W_Power_Title").text(setting.setting.set.W.Title);
        $("#xs21p2w_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#xs21p2w_var_Power_Title").text(setting.setting.set.var.Title);
        $("#xs21p2w_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $("#xs21p2w_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);


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

        //無効電力量
        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });
    }
    else {
        unitNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (unitNoRequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#xs21p2wupdated_time").text("データ更新：----/--/-- --:--");
                $("#xs21p2w_A_Current").text("--");
                $("#xs21p2w_V_Voltage").text("--");
                $("#xs21p2w_F_Frequency").text("--");
                $("#xs21p2w_PF_PowerFactor").text("--");
                $("#xs21p2w_W_Power").text("--");
                $("#xs21p2w_Wh_Energy").text("--");
                $("#xs21p2w_var_Power").text("--");
                $("#xs21p2w_varh_Energy").text("--");
                $("#xs21p2w_varhlead_Energy").text("--");
            }
            // データがある
            else {
                var termdata;
                $("#xs21p2wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#xs21p2w_A_Current").text(obj.Respons.Data.A_Current.Value + " [A]");
                $("#xs21p2w_V_Voltage").text(obj.Respons.Data.V_Voltage.Value + " [V]");
                $("#xs21p2w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#xs21p2w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#xs21p2w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#xs21p2w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#xs21p2w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#xs21p2w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#xs21p2w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_xs21p2w";
                var alert_str1 = "";
                var unknown = false;
                var xs2warncheck = {
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
                for (var i = 0; i < xs2warncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[xs2warncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[xs2warncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = xs2warncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = xs2warncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = xs2warncheck.checkitem[i].content;
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
        // Status!=200
        else {
            $("#xs21p2wupdated_time").text("データ更新：----/--/-- --:--");
            $("#xs21p2w_A_Current").text("--");
            $("#xs21p2w_V_Voltage").text("--");
            $("#xs21p2w_F_Frequency").text("--");
            $("#xs21p2w_PF_PowerFactor").text("--");
            $("#xs21p2w_W_Power").text("--");
            $("#xs21p2w_Wh_Energy").text("--");
            $("#xs21p2w_var_Power").text("--");
            $("#xs21p2w_varh_Energy").text("--");
            $("#xs21p2w_varhlead_Energy").text("--");

            //警報状態
            term = "#alertH_xs21p2w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}


/**
* XS21P3Wデータ
*/
function get_InsDatXS21P3W(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#xs21p3w_A1_Current").text("--");
        $("#xs21p3w_AN_Current").text("--");
        $("#xs21p3w_A2_Current").text("--");
        $("#xs21p3w_V1N_Voltage").text("--");
        $("#xs21p3w_V2N_Voltage").text("--");
        $("#xs21p3w_V12_Voltage").text("--");
        $("#xs21p3w_F_Frequency").text("--");
        $("#xs21p3w_PF_PowerFactor").text("--");
        $("#xs21p3w_W_Power").text("--");
        $("#xs21p3w_Wh_Energy").text("--");
        $("#xs21p3w_var_Power").text("--");
        $("#xs21p3w_varh_Energy").text("--");
        $("#xs21p3w_varhlead_Energy").text("--");
        $("#xs21p3wupdated_time").text("データ更新：----/--/-- --:--");

        var term = "#alertH_xs21p3w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "xs21p3w";

        $("#xs21p3w_A1_Current_Title").text(setting.setting.set.AR.Title);
        $("#xs21p3w_AN_Current_Title").text(setting.setting.set.AS.Title);
        $("#xs21p3w_A2_Current_Title").text(setting.setting.set.AT.Title);
        $("#xs21p3w_V1N_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#xs21p3w_V2N_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#xs21p3w_V12_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#xs21p3w_F_Frequency_Title").text(setting.setting.set.F.Title);
        $("#xs21p3w_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $("#xs21p3w_W_Power_Title").text(setting.setting.set.W.Title);
        $("#xs21p3w_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#xs21p3w_var_Power_Title").text(setting.setting.set.var.Title);
        $("#xs21p3w_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $("#xs21p3w_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);

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
        $("#" + prefix + "_Title_AN").text(setting.setting.set.AS.Title)
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

        //無効電力量
        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });
    }
    else {
        unitNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (unitNoRequest == true) {
        return
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#xs21p3w_A1_Current").text("--");
                $("#xs21p3w_AN_Current").text("--");
                $("#xs21p3w_A2_Current").text("--");
                $("#xs21p3w_V1N_Voltage").text("--");
                $("#xs21p3w_V2N_Voltage").text("--");
                $("#xs21p3w_V12_Voltage").text("--");
                $("#xs21p3w_F_Frequency").text("--");
                $("#xs21p3w_PF_PowerFactor").text("--");
                $("#xs21p3w_W_Power").text("--");
                $("#xs21p3w_Wh_Energy").text("--");
                $("#xs21p3w_var_Power").text("--");
                $("#xs21p3w_varh_Energy").text("--");
                $("#xs21p3w_varhlead_Energy").text("--");
                $("#xs21p3wupdated_time").text("データ更新：----/--/-- --:--");
            }
            // データがある
            else {
                var termdata;
                $("#xs21p3wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#xs21p3w_A1_Current").text(obj.Respons.Data.A1_Current.Value + " [A]");
                $("#xs21p3w_AN_Current").text(obj.Respons.Data.AN_Current.Value + " [A]");
                $("#xs21p3w_A2_Current").text(obj.Respons.Data.A2_Current.Value + " [A]");
                $("#xs21p3w_V1N_Voltage").text(obj.Respons.Data.V1N_Voltage.Value + " [V]");
                $("#xs21p3w_V2N_Voltage").text(obj.Respons.Data.V2N_Voltage.Value + " [V]");
                $("#xs21p3w_V12_Voltage").text(obj.Respons.Data.V12_Voltage.Value + " [V]");
                $("#xs21p3w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#xs21p3w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#xs21p3w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#xs21p3w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#xs21p3w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#xs21p3w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#xs21p3w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_xs21p3w";
                var alert_str1 = "";
                var unknown = false;
                var xs2warncheck = {
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
                for (var i = 0; i < xs2warncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[xs2warncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[xs2warncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = xs2warncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = xs2warncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = xs2warncheck.checkitem[i].content;
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
        // Status!=200
        else {
            $("#xs21p3w_A1_Current").text("--");
            $("#xs21p3w_AN_Current").text("--");
            $("#xs21p3w_A2_Current").text("--");
            $("#xs21p3w_V1N_Voltage").text("--");
            $("#xs21p3w_V2N_Voltage").text("--");
            $("#xs21p3w_V12_Voltage").text("--");
            $("#xs21p3w_F_Frequency").text("--");
            $("#xs21p3w_PF_PowerFactor").text("--");
            $("#xs21p3w_W_Power").text("--");
            $("#xs21p3w_Wh_Energy").text("--");
            $("#xs21p3w_var_Power").text("--");
            $("#xs21p3w_varh_Energy").text("--");
            $("#xs21p3w_varhlead_Energy").text("--");
            $("#xs21p3wupdated_time").text("データ更新：----/--/-- --:--");

            //警報状態
            term = "#alertH_xs21p3w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}


/**
* XS23P3Wデータ
*/
function get_InsDatXS23P3W(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#xs23p3w_AR_Current").text("--");
        $("#xs23p3w_AS_Current").text("--");
        $("#xs23p3w_AT_Current").text("--");
        $("#xs23p3w_VRS_Voltage").text("--");
        $("#xs23p3w_VST_Voltage").text("--");
        $("#xs23p3w_VTR_Voltage").text("--");
        $("#xs23p3w_F_Frequency").text("--");
        $("#xs23p3w_PF_PowerFactor").text("--");
        $("#xs23p3w_W_Power").text("--");
        $("#xs23p3w_Wh_Energy").text("--");
        $("#xs23p3w_var_Power").text("--");
        $("#xs23p3w_varh_Energy").text("--");
        $("#xs23p3w_varhlead_Energy").text("--");
        $("#xs23p3wupdated_time").text("データ更新：----/--/-- --:--");

        var term = "#alertH_xs23p3w";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "xs23p3w";

        $("#xs23p3w_AR_Current_Title").text(setting.setting.set.AR.Title);
        $("#xs23p3w_AS_Current_Title").text(setting.setting.set.AS.Title);
        $("#xs23p3w_AT_Current_Title").text(setting.setting.set.AT.Title);
        $("#xs23p3w_VRS_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#xs23p3w_VST_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#xs23p3w_VTR_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#xs23p3w_F_Frequency_Title").text(setting.setting.set.F.Title);
        $("#xs23p3w_PF_PowerFactor_Title").text(setting.setting.set.PF.Title);
        $("#xs23p3w_W_Power_Title").text(setting.setting.set.W.Title);
        $("#xs23p3w_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#xs23p3w_var_Power_Title").text(setting.setting.set.var.Title);
        $("#xs23p3w_varh_Energy_Title").text(setting.setting.set.varh.Title);
        $("#xs23p3w_varhlead_Energy_Title").text(setting.setting.set.varhlead.Title);

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
            $("#" + prefix + "_aHE_VTR").css({ "display": "none" })
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

        //無効電力量
        $("#" + prefix + "_Title_varhlead").text(setting.setting.set.varhlead.Title);
        $("#" + prefix + "_aHE_varhlead").css({ "display": "none" });
        $("#" + prefix + "_aLE_varhlead").css({ "display": "none" });

    }
    else {
        unitNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (unitNoRequest == true) {
        return;
    }

    // 瞬時値を取得する
    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#xs23p3w_AR_Current").text("--");
                $("#xs23p3w_AS_Current").text("--");
                $("#xs23p3w_AT_Current").text("--");
                $("#xs23p3w_VRS_Voltage").text("--");
                $("#xs23p3w_VST_Voltage").text("--");
                $("#xs23p3w_VTR_Voltage").text("--");
                $("#xs23p3w_F_Frequency").text("--");
                $("#xs23p3w_PF_PowerFactor").text("--");
                $("#xs23p3w_W_Power").text("--");
                $("#xs23p3w_Wh_Energy").text("--");
                $("#xs23p3w_var_Power").text("--");
                $("#xs23p3w_varh_Energy").text("--");
                $("#xs23p3w_varhlead_Energy").text("--");
                $("#xs23p3wupdated_time").text("データ更新：----/--/-- --:--");
            }
            // データがある
            else {
                var termdata;
                $("#xs23p3wupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#xs23p3w_AR_Current").text(obj.Respons.Data.AR_Current.Value + " [A]");
                $("#xs23p3w_AS_Current").text(obj.Respons.Data.AS_Current.Value + " [A]");
                $("#xs23p3w_AT_Current").text(obj.Respons.Data.AT_Current.Value + " [A]");
                $("#xs23p3w_VRS_Voltage").text(obj.Respons.Data.VRS_Voltage.Value + " [V]");
                $("#xs23p3w_VST_Voltage").text(obj.Respons.Data.VST_Voltage.Value + " [V]");
                $("#xs23p3w_VTR_Voltage").text(obj.Respons.Data.VTR_Voltage.Value + " [V]");
                $("#xs23p3w_F_Frequency").text(obj.Respons.Data.F_Frequency.Value + " [Hz]");
                $("#xs23p3w_PF_PowerFactor").text(obj.Respons.Data.PF_PowerFactor.Value + " [%]");
                $("#xs23p3w_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#xs23p3w_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#xs23p3w_var_Power").text(obj.Respons.Data.var_Power.Value + " [kvar]");
                $("#xs23p3w_varh_Energy").text(obj.Respons.Data.varh_Energy.Value + " [kvarh]");
                $("#xs23p3w_varhlead_Energy").text(obj.Respons.Data.varhlead_Energy.Value + " [kvarh]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_xs23p3w";
                var alert_str1 = "";
                var unknown = false;
                var xs2warncheck = {
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
                for (var i = 0; i < xs2warncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[xs2warncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[xs2warncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = xs2warncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = xs2warncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = xs2warncheck.checkitem[i].content;
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
            $("#xs23p3w_AR_Current").text("--");
            $("#xs23p3w_AS_Current").text("--");
            $("#xs23p3w_AT_Current").text("--");
            $("#xs23p3w_VRS_Voltage").text("--");
            $("#xs23p3w_VST_Voltage").text("--");
            $("#xs23p3w_VTR_Voltage").text("--");
            $("#xs23p3w_F_Frequency").text("--");
            $("#xs23p3w_PF_PowerFactor").text("--");
            $("#xs23p3w_W_Power").text("--");
            $("#xs23p3w_Wh_Energy").text("--");
            $("#xs23p3w_var_Power").text("--");
            $("#xs23p3w_varh_Energy").text("--");
            $("#xs23p3w_varhlead_Energy").text("--");
            $("#xs23p3wupdated_time").text("データ更新：----/--/-- --:--");

            //警報状態
            term = "#alertH_xs23p3w";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }

    }, setting);
}


/* XS2 3P3Wダイナミク瞬時データ表示作成 */
function fncXS23P3WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idxs2title" class="h5 m-0 ">xs2titlestring \
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
    rtnval = rtnval.replace(/xs2titlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataXs23p3w(tvid, realtimeObj) {

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


function fncXS23P3WDspData(tvid, unitNo, isUnitChg, xs2setting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var xs2_set_tmp = {
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

        xs2setting.setting = { "set": xs2_set_tmp };

        xs2setting.setting.set.AR.Title = jis2chr(settingObj.AR_Current.Title);
        xs2setting.setting.set.AR.Point = settingObj.AR_Current.Point;
        xs2setting.setting.set.AR.Graph[0] = settingObj.AR_Current.Graph[0];
        xs2setting.setting.set.AR.Graph[1] = settingObj.AR_Current.Graph[1];
        xs2setting.setting.set.AR.Alarm[0] = settingObj.AR_Current.Alarm[0];
        xs2setting.setting.set.AR.Alarm[1] = settingObj.AR_Current.Alarm[1];
        xs2setting.setting.set.AR.AlarmE[0] = settingObj.AR_Current.AlarmE[0];
        xs2setting.setting.set.AR.AlarmE[1] = settingObj.AR_Current.AlarmE[1];

        xs2setting.setting.set.AS.Title = jis2chr(settingObj.AS_Current.Title);
        xs2setting.setting.set.AS.Point = settingObj.AS_Current.Point;
        xs2setting.setting.set.AS.Graph[0] = settingObj.AS_Current.Graph[0];
        xs2setting.setting.set.AS.Graph[1] = settingObj.AS_Current.Graph[1];
        xs2setting.setting.set.AS.Alarm[0] = settingObj.AS_Current.Alarm[0];
        xs2setting.setting.set.AS.Alarm[1] = settingObj.AS_Current.Alarm[1];
        xs2setting.setting.set.AS.AlarmE[0] = settingObj.AS_Current.AlarmE[0];
        xs2setting.setting.set.AS.AlarmE[1] = settingObj.AS_Current.AlarmE[1];

        xs2setting.setting.set.AT.Title = jis2chr(settingObj.AT_Current.Title);
        xs2setting.setting.set.AT.Point = settingObj.AT_Current.Point;
        xs2setting.setting.set.AT.Graph[0] = settingObj.AT_Current.Graph[0];
        xs2setting.setting.set.AT.Graph[1] = settingObj.AT_Current.Graph[1];
        xs2setting.setting.set.AT.Alarm[0] = settingObj.AT_Current.Alarm[0];
        xs2setting.setting.set.AT.Alarm[1] = settingObj.AT_Current.Alarm[1];
        xs2setting.setting.set.AT.AlarmE[0] = settingObj.AT_Current.AlarmE[0];
        xs2setting.setting.set.AT.AlarmE[1] = settingObj.AT_Current.AlarmE[1];

        xs2setting.setting.set.VRS.Title = jis2chr(settingObj.VRS_Voltage.Title);
        xs2setting.setting.set.VRS.Point = settingObj.VRS_Voltage.Point;
        xs2setting.setting.set.VRS.Graph[0] = settingObj.VRS_Voltage.Graph[0];
        xs2setting.setting.set.VRS.Graph[1] = settingObj.VRS_Voltage.Graph[1];
        xs2setting.setting.set.VRS.Alarm[0] = settingObj.VRS_Voltage.Alarm[0];
        xs2setting.setting.set.VRS.Alarm[1] = settingObj.VRS_Voltage.Alarm[1];
        xs2setting.setting.set.VRS.AlarmE[0] = settingObj.VRS_Voltage.AlarmE[0];
        xs2setting.setting.set.VRS.AlarmE[1] = settingObj.VRS_Voltage.AlarmE[1];

        xs2setting.setting.set.VST.Title = jis2chr(settingObj.VST_Voltage.Title);
        xs2setting.setting.set.VST.Point = settingObj.VST_Voltage.Point;
        xs2setting.setting.set.VST.Graph[0] = settingObj.VST_Voltage.Graph[0];
        xs2setting.setting.set.VST.Graph[1] = settingObj.VST_Voltage.Graph[1];
        xs2setting.setting.set.VST.Alarm[0] = settingObj.VST_Voltage.Alarm[0];
        xs2setting.setting.set.VST.Alarm[1] = settingObj.VST_Voltage.Alarm[1];
        xs2setting.setting.set.VST.AlarmE[0] = settingObj.VST_Voltage.AlarmE[0];
        xs2setting.setting.set.VST.AlarmE[1] = settingObj.VST_Voltage.AlarmE[1];

        xs2setting.setting.set.VTR.Title = jis2chr(settingObj.VTR_Voltage.Title);
        xs2setting.setting.set.VTR.Point = settingObj.VTR_Voltage.Point;
        xs2setting.setting.set.VTR.Graph[0] = settingObj.VTR_Voltage.Graph[0];
        xs2setting.setting.set.VTR.Graph[1] = settingObj.VTR_Voltage.Graph[1];
        xs2setting.setting.set.VTR.Alarm[0] = settingObj.VTR_Voltage.Alarm[0];
        xs2setting.setting.set.VTR.Alarm[1] = settingObj.VTR_Voltage.Alarm[1];
        xs2setting.setting.set.VTR.AlarmE[0] = settingObj.VTR_Voltage.AlarmE[0];
        xs2setting.setting.set.VTR.AlarmE[1] = settingObj.VTR_Voltage.AlarmE[1];

        xs2setting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        xs2setting.setting.set.F.Point = settingObj.F_Frequency.Point;
        xs2setting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        xs2setting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        xs2setting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        xs2setting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        xs2setting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        xs2setting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        xs2setting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        xs2setting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        xs2setting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        xs2setting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        xs2setting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        xs2setting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        xs2setting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        xs2setting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        xs2setting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        xs2setting.setting.set.W.Point = settingObj.W_Power.Point;
        xs2setting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        xs2setting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        xs2setting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        xs2setting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        xs2setting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        xs2setting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        xs2setting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        xs2setting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        xs2setting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        xs2setting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        xs2setting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        xs2setting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        xs2setting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        xs2setting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1]

        xs2setting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title)
        xs2setting.setting.set.var.Point = settingObj.var_Power.Point
        xs2setting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0]
        xs2setting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1]
        xs2setting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0]
        xs2setting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1]
        xs2setting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0]
        xs2setting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1]

        xs2setting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title)
        xs2setting.setting.set.varh.Point = settingObj.varh_Energy.Point
        xs2setting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0]
        xs2setting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1]
        xs2setting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0]
        xs2setting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1]
        xs2setting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0]
        xs2setting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1]

        xs2setting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title)
        xs2setting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point
        xs2setting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0]
        xs2setting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1]
        xs2setting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0]
        xs2setting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1]
        xs2setting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0]
        xs2setting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1]

        $('#' + tvid + "AR_Current_Title").text(xs2setting.setting.set.AR.Title);
        $('#' + tvid + "AS_Current_Title").text(xs2setting.setting.set.AS.Title);
        $('#' + tvid + "AT_Current_Title").text(xs2setting.setting.set.AT.Title);
        $('#' + tvid + "VRS_Voltage_Title").text(xs2setting.setting.set.VRS.Title);
        $('#' + tvid + "VST_Voltage_Title").text(xs2setting.setting.set.VST.Title);
        $('#' + tvid + "VTR_Voltage_Title").text(xs2setting.setting.set.VTR.Title);
        $('#' + tvid + "F_Frequency_Title").text(xs2setting.setting.set.F.Title);
        $('#' + tvid + "PF_PowerFactor_Title").text(xs2setting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(xs2setting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(xs2setting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(xs2setting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(xs2setting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(xs2setting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(xs2setting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (xs2setting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null) || (unitSts == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs23p3w(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs23p3w(tvid, realtimeObj);
        }

    }
    else {
        if (xs2setting.setting != null) {
            $('#' + tvid + "AR_Current_Title").text(xs2setting.setting.set.AR.Title);
            $('#' + tvid + "AS_Current_Title").text(xs2setting.setting.set.AS.Title);
            $('#' + tvid + "AT_Current_Title").text(xs2setting.setting.set.AT.Title);
            $('#' + tvid + "VRS_Voltage_Title").text(xs2setting.setting.set.VRS.Title);
            $('#' + tvid + "VST_Voltage_Title").text(xs2setting.setting.set.VST.Title);
            $('#' + tvid + "VTR_Voltage_Title").text(xs2setting.setting.set.VTR.Title);
            $('#' + tvid + "F_Frequency_Title").text(xs2setting.setting.set.F.Title);
            $('#' + tvid + "PF_PowerFactor_Title").text(xs2setting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(xs2setting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(xs2setting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(xs2setting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(xs2setting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(xs2setting.setting.set.varhlead.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (xs2setting.setting == null) || (unitSts == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs23p3w(tvid, retobj);

            return;
        }

        rs485_insread_data(unitNo, function (obj, xs2setting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataXs23p3w(tvid, obj.Respons);

        }, xs2setting);
    }
}

/* XS2 1P3Wダイナミク瞬時データ表示作成 */
function fncXS21P3WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idxs2title" class="h5 m-0 ">xs2titlestring \
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
    rtnval = rtnval.replace(/xs2titlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataXs21p3w(tvid, realtimeObj) {

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


function fncXS21P3WDspData(tvid, unitNo, isUnitChg, xs2setting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var xs2_set_tmp = {
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

        xs2setting.setting = { "set": xs2_set_tmp };

        xs2setting.setting.set.AR.Title = jis2chr(settingObj.A1_Current.Title);
        xs2setting.setting.set.AR.Point = settingObj.A1_Current.Point;
        xs2setting.setting.set.AR.Graph[0] = settingObj.A1_Current.Graph[0];
        xs2setting.setting.set.AR.Graph[1] = settingObj.A1_Current.Graph[1];
        xs2setting.setting.set.AR.Alarm[0] = settingObj.A1_Current.Alarm[0];
        xs2setting.setting.set.AR.Alarm[1] = settingObj.A1_Current.Alarm[1];
        xs2setting.setting.set.AR.AlarmE[0] = settingObj.A1_Current.AlarmE[0];
        xs2setting.setting.set.AR.AlarmE[1] = settingObj.A1_Current.AlarmE[1];

        xs2setting.setting.set.AS.Title = jis2chr(settingObj.AN_Current.Title);
        xs2setting.setting.set.AS.Point = settingObj.AN_Current.Point;
        xs2setting.setting.set.AS.Graph[0] = settingObj.AN_Current.Graph[0];
        xs2setting.setting.set.AS.Graph[1] = settingObj.AN_Current.Graph[1];
        xs2setting.setting.set.AS.Alarm[0] = settingObj.AN_Current.Alarm[0];
        xs2setting.setting.set.AS.Alarm[1] = settingObj.AN_Current.Alarm[1];
        xs2setting.setting.set.AS.AlarmE[0] = settingObj.AN_Current.AlarmE[0];
        xs2setting.setting.set.AS.AlarmE[1] = settingObj.AN_Current.AlarmE[1];

        xs2setting.setting.set.AT.Title = jis2chr(settingObj.A2_Current.Title);
        xs2setting.setting.set.AT.Point = settingObj.A2_Current.Point;
        xs2setting.setting.set.AT.Graph[0] = settingObj.A2_Current.Graph[0];
        xs2setting.setting.set.AT.Graph[1] = settingObj.A2_Current.Graph[1];
        xs2setting.setting.set.AT.Alarm[0] = settingObj.A2_Current.Alarm[0];
        xs2setting.setting.set.AT.Alarm[1] = settingObj.A2_Current.Alarm[1];
        xs2setting.setting.set.AT.AlarmE[0] = settingObj.A2_Current.AlarmE[0];
        xs2setting.setting.set.AT.AlarmE[1] = settingObj.A2_Current.AlarmE[1];

        xs2setting.setting.set.VRS.Title = jis2chr(settingObj.V1N_Voltage.Title);
        xs2setting.setting.set.VRS.Point = settingObj.V1N_Voltage.Point;
        xs2setting.setting.set.VRS.Graph[0] = settingObj.V1N_Voltage.Graph[0];
        xs2setting.setting.set.VRS.Graph[1] = settingObj.V1N_Voltage.Graph[1];
        xs2setting.setting.set.VRS.Alarm[0] = settingObj.V1N_Voltage.Alarm[0];
        xs2setting.setting.set.VRS.Alarm[1] = settingObj.V1N_Voltage.Alarm[1];
        xs2setting.setting.set.VRS.AlarmE[0] = settingObj.V1N_Voltage.AlarmE[0];
        xs2setting.setting.set.VRS.AlarmE[1] = settingObj.V1N_Voltage.AlarmE[1];

        xs2setting.setting.set.VST.Title = jis2chr(settingObj.V2N_Voltage.Title);
        xs2setting.setting.set.VST.Point = settingObj.V2N_Voltage.Point;
        xs2setting.setting.set.VST.Graph[0] = settingObj.V2N_Voltage.Graph[0];
        xs2setting.setting.set.VST.Graph[1] = settingObj.V2N_Voltage.Graph[1];
        xs2setting.setting.set.VST.Alarm[0] = settingObj.V2N_Voltage.Alarm[0];
        xs2setting.setting.set.VST.Alarm[1] = settingObj.V2N_Voltage.Alarm[1];
        xs2setting.setting.set.VST.AlarmE[0] = settingObj.V2N_Voltage.AlarmE[0];
        xs2setting.setting.set.VST.AlarmE[1] = settingObj.V2N_Voltage.AlarmE[1];

        xs2setting.setting.set.VTR.Title = jis2chr(settingObj.V12_Voltage.Title);
        xs2setting.setting.set.VTR.Point = settingObj.V12_Voltage.Point;
        xs2setting.setting.set.VTR.Graph[0] = settingObj.V12_Voltage.Graph[0];
        xs2setting.setting.set.VTR.Graph[1] = settingObj.V12_Voltage.Graph[1];
        xs2setting.setting.set.VTR.Alarm[0] = settingObj.V12_Voltage.Alarm[0];
        xs2setting.setting.set.VTR.Alarm[1] = settingObj.V12_Voltage.Alarm[1];
        xs2setting.setting.set.VTR.AlarmE[0] = settingObj.V12_Voltage.AlarmE[0];
        xs2setting.setting.set.VTR.AlarmE[1] = settingObj.V12_Voltage.AlarmE[1];

        xs2setting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        xs2setting.setting.set.F.Point = settingObj.F_Frequency.Point;
        xs2setting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        xs2setting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        xs2setting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        xs2setting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        xs2setting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        xs2setting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        xs2setting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        xs2setting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        xs2setting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        xs2setting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        xs2setting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        xs2setting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        xs2setting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        xs2setting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        xs2setting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        xs2setting.setting.set.W.Point = settingObj.W_Power.Point;
        xs2setting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        xs2setting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        xs2setting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        xs2setting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        xs2setting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        xs2setting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        xs2setting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        xs2setting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        xs2setting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        xs2setting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        xs2setting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        xs2setting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        xs2setting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        xs2setting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        xs2setting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title);
        xs2setting.setting.set.var.Point = settingObj.var_Power.Point;
        xs2setting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0];
        xs2setting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1];
        xs2setting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0];
        xs2setting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1];
        xs2setting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0];
        xs2setting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1];

        xs2setting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        xs2setting.setting.set.varh.Point = settingObj.varh_Energy.Point;
        xs2setting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        xs2setting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];
        xs2setting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0];
        xs2setting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1];
        xs2setting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0];
        xs2setting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1];

        xs2setting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        xs2setting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point;
        xs2setting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        xs2setting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];
        xs2setting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0];
        xs2setting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1];
        xs2setting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0];
        xs2setting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1];


        $('#' + tvid + "A1_Current_Title").text(xs2setting.setting.set.AR.Title);
        $('#' + tvid + "AN_Current_Title").text(xs2setting.setting.set.AS.Title);
        $('#' + tvid + "A2_Current_Title").text(xs2setting.setting.set.AT.Title);
        $('#' + tvid + "V1N_Voltage_Title").text(xs2setting.setting.set.VRS.Title);
        $('#' + tvid + "V2N_Voltage_Title").text(xs2setting.setting.set.VST.Title);
        $('#' + tvid + "V12_Voltage_Title").text(xs2setting.setting.set.VTR.Title);
        $('#' + tvid + "F_Frequency_Title").text(xs2setting.setting.set.F.Title);
        $('#' + tvid + "PF_PowerFactor_Title").text(xs2setting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(xs2setting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(xs2setting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(xs2setting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(xs2setting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(xs2setting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(xs2setting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (xs2setting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null) || (unitSts == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p3w(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p3w(tvid, realtimeObj);
        }

    }
    else {
        if (xs2setting.setting != null) {
            $('#' + tvid + "A1_Current_Title").text(xs2setting.setting.set.AR.Title);
            $('#' + tvid + "AN_Current_Title").text(xs2setting.setting.set.AS.Title);
            $('#' + tvid + "A2_Current_Title").text(xs2setting.setting.set.AT.Title);
            $('#' + tvid + "V1N_Voltage_Title").text(xs2setting.setting.set.VRS.Title);
            $('#' + tvid + "V2N_Voltage_Title").text(xs2setting.setting.set.VST.Title);
            $('#' + tvid + "V12_Voltage_Title").text(xs2setting.setting.set.VTR.Title);
            $('#' + tvid + "F_Frequency_Title").text(xs2setting.setting.set.F.Title);
            $('#' + tvid + "PF_PowerFactor_Title").text(xs2setting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(xs2setting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(xs2setting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(xs2setting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(xs2setting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(xs2setting.setting.set.varhlead.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (xs2setting.setting == null) || (unitSts == null)) {
            // Save Instance Data for Combine Graph
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);

            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p3w(tvid, retobj);

            return;
        }

        rs485_insread_data(unitNo, function (obj, xs2setting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p3w(tvid, obj.Respons);

        }, xs2setting);
    }
}

/*
* XS2 1P2Wダイナミク瞬時データ表示作成
*/
function fncXS21P2WInstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idxs2title" class="h5 m-0 ">xs2titlestring \
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
    rtnval = rtnval.replace(/xs2titlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataXs21p2w(tvid, realtimeObj) {

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

function fncXS21P2WDspData(tvid, unitNo, isUnitChg, xs2setting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var xs2_set_tmp = {
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

        xs2setting.setting = { "set": xs2_set_tmp };

        xs2setting.setting.set.AR.Title = jis2chr(settingObj.A_Current.Title);
        xs2setting.setting.set.AR.Point = settingObj.A_Current.Point;
        xs2setting.setting.set.AR.Graph[0] = settingObj.A_Current.Graph[0];
        xs2setting.setting.set.AR.Graph[1] = settingObj.A_Current.Graph[1];
        xs2setting.setting.set.AR.Alarm[0] = settingObj.A_Current.Alarm[0];
        xs2setting.setting.set.AR.Alarm[1] = settingObj.A_Current.Alarm[1];
        xs2setting.setting.set.AR.AlarmE[0] = settingObj.A_Current.AlarmE[0];
        xs2setting.setting.set.AR.AlarmE[1] = settingObj.A_Current.AlarmE[1];

        xs2setting.setting.set.VRS.Title = jis2chr(settingObj.V_Voltage.Title);
        xs2setting.setting.set.VRS.Point = settingObj.V_Voltage.Point;
        xs2setting.setting.set.VRS.Graph[0] = settingObj.V_Voltage.Graph[0];
        xs2setting.setting.set.VRS.Graph[1] = settingObj.V_Voltage.Graph[1];
        xs2setting.setting.set.VRS.Alarm[0] = settingObj.V_Voltage.Alarm[0];
        xs2setting.setting.set.VRS.Alarm[1] = settingObj.V_Voltage.Alarm[1];
        xs2setting.setting.set.VRS.AlarmE[0] = settingObj.V_Voltage.AlarmE[0];
        xs2setting.setting.set.VRS.AlarmE[1] = settingObj.V_Voltage.AlarmE[1];

        xs2setting.setting.set.F.Title = jis2chr(settingObj.F_Frequency.Title);
        xs2setting.setting.set.F.Point = settingObj.F_Frequency.Point;
        xs2setting.setting.set.F.Graph[0] = settingObj.F_Frequency.Graph[0];
        xs2setting.setting.set.F.Graph[1] = settingObj.F_Frequency.Graph[1];
        xs2setting.setting.set.F.Alarm[0] = settingObj.F_Frequency.Alarm[0];
        xs2setting.setting.set.F.Alarm[1] = settingObj.F_Frequency.Alarm[1];
        xs2setting.setting.set.F.AlarmE[0] = settingObj.F_Frequency.AlarmE[0];
        xs2setting.setting.set.F.AlarmE[1] = settingObj.F_Frequency.AlarmE[1];

        xs2setting.setting.set.PF.Title = jis2chr(settingObj.PF_PowerFactor.Title);
        xs2setting.setting.set.PF.Point = settingObj.PF_PowerFactor.Point;
        xs2setting.setting.set.PF.Graph[0] = settingObj.PF_PowerFactor.Graph[0];
        xs2setting.setting.set.PF.Graph[1] = settingObj.PF_PowerFactor.Graph[1];
        xs2setting.setting.set.PF.Alarm[0] = settingObj.PF_PowerFactor.Alarm[0];
        xs2setting.setting.set.PF.Alarm[1] = settingObj.PF_PowerFactor.Alarm[1];
        xs2setting.setting.set.PF.AlarmE[0] = settingObj.PF_PowerFactor.AlarmE[0];
        xs2setting.setting.set.PF.AlarmE[1] = settingObj.PF_PowerFactor.AlarmE[1];

        xs2setting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        xs2setting.setting.set.W.Point = settingObj.W_Power.Point;
        xs2setting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        xs2setting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        xs2setting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        xs2setting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        xs2setting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        xs2setting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        xs2setting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        xs2setting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        xs2setting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        xs2setting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        xs2setting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        xs2setting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        xs2setting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        xs2setting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        xs2setting.setting.set.var.Title = jis2chr(settingObj.var_Power.Title);
        xs2setting.setting.set.var.Point = settingObj.var_Power.Point;
        xs2setting.setting.set.var.Graph[0] = settingObj.var_Power.Graph[0];
        xs2setting.setting.set.var.Graph[1] = settingObj.var_Power.Graph[1];
        xs2setting.setting.set.var.Alarm[0] = settingObj.var_Power.Alarm[0];
        xs2setting.setting.set.var.Alarm[1] = settingObj.var_Power.Alarm[1];
        xs2setting.setting.set.var.AlarmE[0] = settingObj.var_Power.AlarmE[0];
        xs2setting.setting.set.var.AlarmE[1] = settingObj.var_Power.AlarmE[1];

        xs2setting.setting.set.varh.Title = jis2chr(settingObj.varh_Energy.Title);
        xs2setting.setting.set.varh.Point = settingObj.varh_Energy.Point;
        xs2setting.setting.set.varh.Graph[0] = settingObj.varh_Energy.Graph[0];
        xs2setting.setting.set.varh.Graph[1] = settingObj.varh_Energy.Graph[1];
        xs2setting.setting.set.varh.Alarm[0] = settingObj.varh_Energy.Alarm[0];
        xs2setting.setting.set.varh.Alarm[1] = settingObj.varh_Energy.Alarm[1];
        xs2setting.setting.set.varh.AlarmE[0] = settingObj.varh_Energy.AlarmE[0];
        xs2setting.setting.set.varh.AlarmE[1] = settingObj.varh_Energy.AlarmE[1];

        xs2setting.setting.set.varhlead.Title = jis2chr(settingObj.varhlead_Energy.Title);
        xs2setting.setting.set.varhlead.Point = settingObj.varhlead_Energy.Point;
        xs2setting.setting.set.varhlead.Graph[0] = settingObj.varhlead_Energy.Graph[0];
        xs2setting.setting.set.varhlead.Graph[1] = settingObj.varhlead_Energy.Graph[1];
        xs2setting.setting.set.varhlead.Alarm[0] = settingObj.varhlead_Energy.Alarm[0];
        xs2setting.setting.set.varhlead.Alarm[1] = settingObj.varhlead_Energy.Alarm[1];
        xs2setting.setting.set.varhlead.AlarmE[0] = settingObj.varhlead_Energy.AlarmE[0];
        xs2setting.setting.set.varhlead.AlarmE[1] = settingObj.varhlead_Energy.AlarmE[1];


        $('#' + tvid + "A_Curr_Title").text(xs2setting.setting.set.AR.Title);
        $('#' + tvid + "V_Voltage_Title").text(xs2setting.setting.set.VRS.Title);
        $('#' + tvid + "F_Frequency_Title").text(xs2setting.setting.set.F.Title);
        $('#' + tvid + "PF_Title").text(xs2setting.setting.set.PF.Title);
        $('#' + tvid + "W_Power_Title").text(xs2setting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(xs2setting.setting.set.Wh.Title);
        $('#' + tvid + "var_Power_Title").text(xs2setting.setting.set.var.Title);
        $('#' + tvid + "varh_Energy_Title").text(xs2setting.setting.set.varh.Title);
        $('#' + tvid + "varhlead_Energy_Title").text(xs2setting.setting.set.varhlead.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(xs2setting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (xs2setting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null) || (unitSts == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p2w(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p2w(tvid, realtimeObj);
        }

    }
    else {
        if (xs2setting.setting != null) {
            $('#' + tvid + "A_Curr_Title").text(xs2setting.setting.set.AR.Title);
            $('#' + tvid + "V_Voltage_Title").text(xs2setting.setting.set.VRS.Title);
            $('#' + tvid + "F_Frequency_Title").text(xs2setting.setting.set.F.Title);
            $('#' + tvid + "PF_Title").text(xs2setting.setting.set.PF.Title);
            $('#' + tvid + "W_Power_Title").text(xs2setting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(xs2setting.setting.set.Wh.Title);
            $('#' + tvid + "var_Power_Title").text(xs2setting.setting.set.var.Title);
            $('#' + tvid + "varh_Energy_Title").text(xs2setting.setting.set.varh.Title);
            $('#' + tvid + "varhlead_Energy_Title").text(xs2setting.setting.set.varhlead.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (xs2setting.setting == null) || (unitSts == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p2w(tvid, retobj);

            return;
        }

        rs485_insread_data(unitNo, function (obj, xs2setting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataXs21p2w(tvid, obj.Respons);

        }, xs2setting);
    }
}

// XS2設定画面を表示
function dispXs2() {
    document.getElementById("rstype_xs2").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_xs2').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_xs2').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}

