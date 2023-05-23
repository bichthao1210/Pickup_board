/*version=1.00*/
//Log here
// <!-- 2020/10/23 -->
// <!-- moment.jsの警告を対応する -->

var xm21p3wioior_graph_exist = false;
var xm23p3wioior_graph_exist = false;
var xm2ioior_graph_type = false;

//グラフ用の時間配
var xm2ioior_graph_time_AR = [];
var xm2ioior_graph_time_AS = [];
var xm2ioior_graph_time_AT = [];
var xm2ioior_graph_time_AN = [];
var xm2ioior_graph_time_VRS = [];
var xm2ioior_graph_time_VST = [];
var xm2ioior_graph_time_VTR = [];
var xm2ioior_graph_time_VRN = [];
var xm2ioior_graph_time_VSN = [];
var xm2ioior_graph_time_VTN = [];
var xm2ioior_graph_time_W = [];
var xm2ioior_graph_time_Wh = [];
var xm2ioior_graph_time_Io = [];
var xm2ioior_graph_time_Ior = [];
var xm2ioior_graph_time_IoMAX = [];
var xm2ioior_graph_time_IorMAX = [];

var xm2ioior_graph_date;
var xm2ioior_graph_dat_num;
//DIグラフ用のデータ配
var xm2ioior_graph_data_AR = [];
var xm2ioior_graph_data_AS = [];
var xm2ioior_graph_data_AT = [];
var xm2ioior_graph_data_AN = [];
var xm2ioior_graph_data_VRS = [];
var xm2ioior_graph_data_VST = [];
var xm2ioior_graph_data_VTR = [];
var xm2ioior_graph_data_VRN = [];
var xm2ioior_graph_data_VSN = [];
var xm2ioior_graph_data_VTN = [];
var xm2ioior_graph_data_W = [];
var xm2ioior_graph_data_Wh = [];
var xm2ioior_graph_data_Io = [];
var xm2ioior_graph_data_Ior = [];
var xm2ioior_graph_data_IoMAX = [];
var xm2ioior_graph_data_IorMAX = [];

var xm21p3wioior_chart_AR;
var xm21p3wioior_chart_AS;
var xm21p3wioior_chart_AT;
var xm21p3wioior_chart_AN;
var xm21p3wioior_chart_VRS;
var xm21p3wioior_chart_VST;
var xm21p3wioior_chart_VTR;
var xm21p3wioior_chart_VRN;
var xm21p3wioior_chart_VSN;
var xm21p3wioior_chart_VTN;
var xm21p3wioior_chart_W;
var xm21p3wioior_chart_Wh;
var xm21p3wioior_chart_Io;
var xm21p3wioior_chart_Ior;
var xm21p3wioior_chart_IoMAX;
var xm21p3wioior_chart_IorMAX;

var xm23p3wioior_chart_AR;
var xm23p3wioior_chart_AS;
var xm23p3wioior_chart_AT;
var xm23p3wioior_chart_AN;
var xm23p3wioior_chart_VRS;
var xm23p3wioior_chart_VST;
var xm23p3wioior_chart_VTR;
var xm23p3wioior_chart_VRN;
var xm23p3wioior_chart_VSN;
var xm23p3wioior_chart_VTN;
var xm23p3wioior_chart_W;
var xm23p3wioior_chart_Wh;
var xm23p3wioior_chart_Io;
var xm23p3wioior_chart_Ior;
var xm23p3wioior_chart_IoMAX;
var xm23p3wioior_chart_IorMAX;


function xm2ioior_get_graph_data(obj, setdata) {

    // Leave if setting data still not come
    if (setdata.setting == null) {
        return;
    }

    // Graph date
    xm2ioior_graph_date = ("0" + gGraphStartTime.year()).slice(-4) + "/" + ("0" + (gGraphStartTime.month() + 1)).slice(-2) + "/" + ("0" + gGraphStartTime.date()).slice(-2);

    //サーバーへ要求を送信して、受信データをJSON型に変換
    //正常
    if (obj.Status == 200) {
        //**********グラフ描画用変数を初期化**********
        xm2ioior_graph_time_AR.length = 0;
        xm2ioior_graph_time_AS.length = 0;
        xm2ioior_graph_time_AT.length = 0;
        xm2ioior_graph_time_AN.length = 0;
        xm2ioior_graph_time_VRS.length = 0;
        xm2ioior_graph_time_VST.length = 0;
        xm2ioior_graph_time_VTR.length = 0;
        xm2ioior_graph_time_VRN.length = 0;
        xm2ioior_graph_time_VSN.length = 0;
        xm2ioior_graph_time_VTN.length = 0;
        xm2ioior_graph_time_W.length = 0;
        xm2ioior_graph_time_Wh.length = 0;
        xm2ioior_graph_time_Io.length = 0;
        xm2ioior_graph_time_Ior.length = 0;
        xm2ioior_graph_time_IoMAX.length = 0;
        xm2ioior_graph_time_IorMAX.length = 0;

        //
        xm2ioior_graph_data_AR.length = 0;
        xm2ioior_graph_data_AS.length = 0;
        xm2ioior_graph_data_AT.length = 0;
        xm2ioior_graph_data_AN.length = 0;
        xm2ioior_graph_data_VRS.length = 0;
        xm2ioior_graph_data_VST.length = 0;
        xm2ioior_graph_data_VTR.length = 0;
        xm2ioior_graph_data_VRN.length = 0;
        xm2ioior_graph_data_VSN.length = 0;
        xm2ioior_graph_data_VTN.length = 0;
        xm2ioior_graph_data_W.length = 0;
        xm2ioior_graph_data_Wh.length = 0;
        xm2ioior_graph_data_Io.length = 0;
        xm2ioior_graph_data_Ior.length = 0;
        xm2ioior_graph_data_IoMAX.length = 0;
        xm2ioior_graph_data_IorMAX.length = 0;

        if (setdata.type == UnitCode.XM2_1P3W_Io_Ior) {
            //A1データ格納
            for (var i = 0; i < obj.Respons.A1_Current.Num; i++) {
                //時間
                xm2ioior_graph_time_AR[i] = moment(obj.Respons.A1_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A1_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_AR[i] = obj.Respons.A1_Current.Data[i].Value;
                }
            }

            //ANデータ格納
            for (var i = 0; i < obj.Respons.AN_Current.Num; i++) {
                //時間
                xm2ioior_graph_time_AS[i] = moment(obj.Respons.AN_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AN_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_AS[i] = obj.Respons.AN_Current.Data[i].Value;
                }
            }

            //A2データ格納
            for (var i = 0; i < obj.Respons.A2_Current.Num; i++) {
                //時間
                xm2ioior_graph_time_AT[i] = moment(obj.Respons.A2_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.A2_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_AT[i] = obj.Respons.A2_Current.Data[i].Value;
                }
            }


            //V1Nデータ格納
            for (var i = 0; i < obj.Respons.V1N_Voltage.Num; i++) {
                //時間
                xm2ioior_graph_time_VRS[i] = moment(obj.Respons.V1N_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V1N_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_VRS[i] = obj.Respons.V1N_Voltage.Data[i].Value;
                }
            }

            //V2Nデータ格納
            for (var i = 0; i < obj.Respons.V2N_Voltage.Num; i++) {
                //時間
                xm2ioior_graph_time_VST[i] = moment(obj.Respons.V2N_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V2N_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_VST[i] = obj.Respons.V2N_Voltage.Data[i].Value;
                }
            }

            //V12データ格納
            for (var i = 0; i < obj.Respons.V12_Voltage.Num; i++) {
                //時間
                xm2ioior_graph_time_VTR[i] = moment(obj.Respons.V12_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.V12_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_VTR[i] = obj.Respons.V12_Voltage.Data[i].Value;
                }
            }


        }
        else if (setdata.type == UnitCode.XM2_3P3W_Io_Ior) {
            //AR-データ格納
            for (var i = 0; i < obj.Respons.AR_Current.Num; i++) {
                //時間
                xm2ioior_graph_time_AR[i] = moment(obj.Respons.AR_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AR_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_AR[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_AR[i] = obj.Respons.AR_Current.Data[i].Value;
                }
            }

            //AS-データ格納
            for (var i = 0; i < obj.Respons.AS_Current.Num; i++) {
                //時間
                xm2ioior_graph_time_AS[i] = moment(obj.Respons.AS_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AS_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_AS[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_AS[i] = obj.Respons.AS_Current.Data[i].Value;
                }
            }

            //AT-データ格納
            for (var i = 0; i < obj.Respons.AT_Current.Num; i++) {
                //時間
                xm2ioior_graph_time_AT[i] = moment(obj.Respons.AT_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.AT_Current.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_AT[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_AT[i] = obj.Respons.AT_Current.Data[i].Value;
                }
            }


            //VRSデータ格納
            for (var i = 0; i < obj.Respons.VRS_Voltage.Num; i++) {
                //時間
                xm2ioior_graph_time_VRS[i] = moment(obj.Respons.VRS_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VRS_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_VRS[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_VRS[i] = obj.Respons.VRS_Voltage.Data[i].Value;
                }
            }

            //VST-データ格納
            for (var i = 0; i < obj.Respons.VST_Voltage.Num; i++) {
                //時間
                xm2ioior_graph_time_VST[i] = moment(obj.Respons.VST_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VST_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_VST[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_VST[i] = obj.Respons.VST_Voltage.Data[i].Value;
                }
            }

            //VTR-データ格納
            for (var i = 0; i < obj.Respons.VTR_Voltage.Num; i++) {
                //時間
                xm2ioior_graph_time_VTR[i] = moment(obj.Respons.VTR_Voltage.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

                //データが無い場合
                if (parseInt(obj.Respons.VTR_Voltage.Data[i].RSSI) == 0) {
                    //Nullならグラフに表示しない
                    xm2ioior_graph_data_VTR[i] = null;
                }
                //データがある
                else {
                    xm2ioior_graph_data_VTR[i] = obj.Respons.VTR_Voltage.Data[i].Value;
                }
            }
        }


        //電力データ格納
        for (var i = 0; i < obj.Respons.W_Power.Num; i++) {
            //時間
            xm2ioior_graph_time_W[i] = moment(obj.Respons.W_Power.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.W_Power.Data[i].RSSI) == 0) {
                //Nullならグラフに表示しない
                xm2ioior_graph_data_W[i] = null;
            }
            //データがある
            else {
                xm2ioior_graph_data_W[i] = obj.Respons.W_Power.Data[i].Value;
            }
        }

        //電力量データ格納
        for (var i = 0; i < obj.Respons.Wh_Energy.Num; i++) {
            //時間
            xm2ioior_graph_time_Wh[i] = moment(obj.Respons.Wh_Energy.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Wh_Energy.Data[i].RSSI) == 0) {
                xm2ioior_graph_data_Wh[i] = null;
            }
            //データがある
            else {
                xm2ioior_graph_data_Wh[i] = obj.Respons.Wh_Energy.Data[i].Value;
            }
        }


        //Ioデータ格納
        for (var i = 0; i < obj.Respons.Io_Current.Num; i++) {
            //時間
            xm2ioior_graph_time_Io[i] = moment(obj.Respons.Io_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Io_Current.Data[i].RSSI) == 0) {
                xm2ioior_graph_data_Io[i] = null;
            }
            //データがある
            else {
                xm2ioior_graph_data_Io[i] = obj.Respons.Io_Current.Data[i].Value;
            }
        }

        //IoMAXデータ格納
        for (var i = 0; i < obj.Respons.IoMAX_Current.Num; i++) {
            //時間
            xm2ioior_graph_time_IoMAX[i] = moment(obj.Respons.IoMAX_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.IoMAX_Current.Data[i].RSSI) == 0) {
                xm2ioior_graph_data_IoMAX[i] = null;
            }
            //データがある
            else {
                xm2ioior_graph_data_IoMAX[i] = obj.Respons.IoMAX_Current.Data[i].Value;
            }
        }

        //Iorデータ格納
        for (var i = 0; i < obj.Respons.Ior_Current.Num; i++) {
            //時間
            xm2ioior_graph_time_Ior[i] = moment(obj.Respons.Ior_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.Ior_Current.Data[i].RSSI) == 0) {
                xm2ioior_graph_data_Ior[i] = null;
            }
            //データがある
            else {
                xm2ioior_graph_data_Ior[i] = obj.Respons.Ior_Current.Data[i].Value;
            }
        }

        //IorMAXデータ格納
        for (var i = 0; i < obj.Respons.IorMAX_Current.Num; i++) {
            //時間
            xm2ioior_graph_time_IorMAX[i] = moment(obj.Respons.IorMAX_Current.Data[i].Time, "YYYY-MM-DD HH:mm:ss");

            //データが無い場合
            if (parseInt(obj.Respons.IorMAX_Current.Data[i].RSSI) == 0) {
                xm2ioior_graph_data_IorMAX[i] = null;
            }
            //データがある
            else {
                xm2ioior_graph_data_IorMAX[i] = obj.Respons.IorMAX_Current.Data[i].Value;
            }
        }


        // グラフの更新
        switch (setdata.type) {
            case UnitCode.XM2_1P3W_Io_Ior:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xm21p3wioior_graph_exist == false) {
                    xm21p3wioior_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xm21p3wioior_graph_exist = true;
                }
                else {
                    xm21p3wioior_update_graph(setdata);
                }
                break;
            case UnitCode.XM2_3P3W_Io_Ior:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xm23p3wioior_graph_exist == false) {
                    xm23p3wioior_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xm23p3wioior_graph_exist = true;
                }
                else {
                    xm23p3wioior_update_graph(setdata);
                }
                break;
        }


        /* chart time update */
        if (setdata.type == UnitCode.XM2_1P3W_Io_Ior) {
            document.getElementById("xm21p3wioior_A1_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_AN_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_A2_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_V1N_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_V2N_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_V12_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_W_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_Wh_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_Io_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_Ior_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_IoMAX_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_IorMAX_chart_time").innerHTML = xm2ioior_graph_date;
        }
        else if (setdata.type == UnitCode.XM2_3P3W_Io_Ior) {
            document.getElementById("xm23p3wioior_AR_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_AS_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_AT_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_VRS_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_VST_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_VTR_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_W_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_Wh_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_Io_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_Ior_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_IoMAX_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_IorMAX_chart_time").innerHTML = xm2ioior_graph_date;

        }

    }
    //データ無し
    else if (obj.Status == 400) {
        xm2ioior_graph_data_AR[i] = null;
        xm2ioior_graph_data_AS[i] = null;
        xm2ioior_graph_data_AT[i] = null;
        xm2ioior_graph_data_AN[i] = null;
        xm2ioior_graph_data_VRS[i] = null;
        xm2ioior_graph_data_VST[i] = null;
        xm2ioior_graph_data_VTR[i] = null;
        xm2ioior_graph_data_VRN[i] = null;
        xm2ioior_graph_data_VSN[i] = null;
        xm2ioior_graph_data_VTN[i] = null;
        xm2ioior_graph_data_W[i] = null;
        xm2ioior_graph_data_Wh[i] = null;
        xm2ioior_graph_data_Io[i] = null;
        xm2ioior_graph_data_Ior[i] = null;
        xm2ioior_graph_data_IoMAX[i] = null;
        xm2ioior_graph_data_IorMAX[i] = null;

        //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
        switch (setdata.type) {
            case UnitCode.XM2_1P3W_Io_Ior:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xm21p3wioior_graph_exist == false) {
                    xm21p3wioior_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xm21p3wioior_graph_exist = true;
                }
                else {
                    xm21p3wioior_update_graph(setdata);
                }
                break;
            case UnitCode.XM2_3P3W_Io_Ior:
                //新しいグラフオブジェクトを作成するかあるグラフオブジェクトでデータ更新だけ
                if (xm23p3wioior_graph_exist == false) {
                    xm23p3wioior_draw_graph(setdata);
                    //グラフオブジェクトが作成済み
                    xm23p3wioior_graph_exist = true;
                }
                else {
                    xm23p3wioior_update_graph(setdata);
                }
                break;
        }

        /* graph chart time update */

        if (setdata.type == UnitCode.XM2_1P3W_Io_Ior) {
            document.getElementById("xm21p3wioior_A1_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_AN_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_A2_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_V1N_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_V2N_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_V12_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_W_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_Wh_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_Io_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_Ior_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_IoMAX_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm21p3wioior_IorMAX_chart_time").innerHTML = xm2ioior_graph_date;

        }
        else if (setdata.type == UnitCode.XM2_3P3W_Io_Ior) {
            document.getElementById("xm23p3wioior_AR_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_AS_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_AT_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_VRS_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_VST_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_VTR_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_W_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_Wh_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_Io_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_Ior_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_IoMAX_chart_time").innerHTML = xm2ioior_graph_date;
            document.getElementById("xm23p3wioior_IorMAX_chart_time").innerHTML = xm2ioior_graph_date;
        }
    }
    else {

    }
}


/**
 *
 */
function xm21p3wioior_draw_graph(setdata) {
    xm2ioior_draw_graph(setdata)
}

/**
 *
 */
function xm23p3wioior_draw_graph(setdata) {
    xm2ioior_draw_graph(setdata)
}


/*  機能：
*/
function xm2ioior_draw_graph(setdata) {
    //CANVAS 2d content オブジェクトを取得   グラフ用
    if (setdata.type == UnitCode.XM2_1P3W_Io_Ior) {
        var canvas_AR = document.getElementById("xm21p3wioior_A1_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("xm21p3wioior_AN_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("xm21p3wioior_A2_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("xm21p3wioior_V1N_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("xm21p3wioior_V2N_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("xm21p3wioior_V12_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("xm21p3wioior_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("xm21p3wioior_Wh_chart_canvas").getContext("2d");
        var canvas_Io = document.getElementById("xm21p3wioior_Io_chart_canvas").getContext("2d");
        var canvas_Ior = document.getElementById("xm21p3wioior_Ior_chart_canvas").getContext("2d");
        var canvas_IoMAX = document.getElementById("xm21p3wioior_IoMAX_chart_canvas").getContext("2d");
        var canvas_IorMAX = document.getElementById("xm21p3wioior_IorMAX_chart_canvas").getContext("2d");
    }
    else if (setdata.type == UnitCode.XM2_3P3W_Io_Ior) {
        var canvas_AR = document.getElementById("xm23p3wioior_AR_chart_canvas").getContext("2d");
        var canvas_AS = document.getElementById("xm23p3wioior_AS_chart_canvas").getContext("2d");
        var canvas_AT = document.getElementById("xm23p3wioior_AT_chart_canvas").getContext("2d");
        var canvas_VRS = document.getElementById("xm23p3wioior_VRS_chart_canvas").getContext("2d");
        var canvas_VST = document.getElementById("xm23p3wioior_VST_chart_canvas").getContext("2d");
        var canvas_VTR = document.getElementById("xm23p3wioior_VTR_chart_canvas").getContext("2d");
        var canvas_W = document.getElementById("xm23p3wioior_W_chart_canvas").getContext("2d");
        var canvas_Wh = document.getElementById("xm23p3wioior_Wh_chart_canvas").getContext("2d");
        var canvas_Io = document.getElementById("xm23p3wioior_Io_chart_canvas").getContext("2d");
        var canvas_Ior = document.getElementById("xm23p3wioior_Ior_chart_canvas").getContext("2d");
        var canvas_IoMAX = document.getElementById("xm23p3wioior_IoMAX_chart_canvas").getContext("2d");
        var canvas_IorMAX = document.getElementById("xm23p3wioior_IorMAX_chart_canvas").getContext("2d");
    }

    if (setdata.type == UnitCode.XM2_1P3W_Io_Ior) {
        xm21p3wioior_chart_AR = draw_graph_line(canvas_AR, xm2ioior_graph_time_AR, xm2ioior_graph_data_AR, xm2ioior_graph_time_AR.length, setdata.setting.set.AR);
        xm21p3wioior_chart_AS = draw_graph_line(canvas_AS, xm2ioior_graph_time_AS, xm2ioior_graph_data_AS, xm2ioior_graph_time_AS.length, setdata.setting.set.AS);
        xm21p3wioior_chart_AT = draw_graph_line(canvas_AT, xm2ioior_graph_time_AT, xm2ioior_graph_data_AT, xm2ioior_graph_time_AT.length, setdata.setting.set.AT);
        xm21p3wioior_chart_VRS = draw_graph_line(canvas_VRS, xm2ioior_graph_time_VRS, xm2ioior_graph_data_VRS, xm2ioior_graph_time_VRS.length, setdata.setting.set.VRS);
        xm21p3wioior_chart_VST = draw_graph_line(canvas_VST, xm2ioior_graph_time_VST, xm2ioior_graph_data_VST, xm2ioior_graph_time_VST.length, setdata.setting.set.VST);
        xm21p3wioior_chart_VTR = draw_graph_line(canvas_VTR, xm2ioior_graph_time_VTR, xm2ioior_graph_data_VTR, xm2ioior_graph_time_VTR.length, setdata.setting.set.VTR);
        xm21p3wioior_chart_W = draw_graph_line(canvas_W, xm2ioior_graph_time_W, xm2ioior_graph_data_W, xm2ioior_graph_time_W.length, setdata.setting.set.W);
        xm21p3wioior_chart_Wh = draw_graph_bar(canvas_Wh, xm2ioior_graph_time_Wh, xm2ioior_graph_data_Wh, xm2ioior_graph_time_Wh.length, setdata.setting.set.Wh);
        xm21p3wioior_chart_Io = draw_graph_line(canvas_Io, xm2ioior_graph_time_Io, xm2ioior_graph_data_Io, xm2ioior_graph_time_Io.length, setdata.setting.set.Io);
        xm21p3wioior_chart_Ior = draw_graph_line(canvas_Ior, xm2ioior_graph_time_Ior, xm2ioior_graph_data_Ior, xm2ioior_graph_time_Ior.length, setdata.setting.set.Ior);
        xm21p3wioior_chart_IoMAX = draw_graph_line(canvas_IoMAX, xm2ioior_graph_time_IoMAX, xm2ioior_graph_data_IoMAX, xm2ioior_graph_time_IoMAX.length, setdata.setting.set.IoMAX);
        xm21p3wioior_chart_IorMAX = draw_graph_line(canvas_IorMAX, xm2ioior_graph_time_IorMAX, xm2ioior_graph_data_IorMAX, xm2ioior_graph_time_IorMAX.length, setdata.setting.set.IorMAX);

    }
    else if (setdata.type == UnitCode.XM2_3P3W_Io_Ior) {
        xm23p3wioior_chart_AR = draw_graph_line(canvas_AR, xm2ioior_graph_time_AR, xm2ioior_graph_data_AR, xm2ioior_graph_time_AR.length, setdata.setting.set.AR);
        xm23p3wioior_chart_AS = draw_graph_line(canvas_AS, xm2ioior_graph_time_AS, xm2ioior_graph_data_AS, xm2ioior_graph_time_AS.length, setdata.setting.set.AS);
        xm23p3wioior_chart_AT = draw_graph_line(canvas_AT, xm2ioior_graph_time_AT, xm2ioior_graph_data_AT, xm2ioior_graph_time_AT.length, setdata.setting.set.AT);
        xm23p3wioior_chart_VRS = draw_graph_line(canvas_VRS, xm2ioior_graph_time_VRS, xm2ioior_graph_data_VRS, xm2ioior_graph_time_VRS.length, setdata.setting.set.VRS);
        xm23p3wioior_chart_VST = draw_graph_line(canvas_VST, xm2ioior_graph_time_VST, xm2ioior_graph_data_VST, xm2ioior_graph_time_VST.length, setdata.setting.set.VST);
        xm23p3wioior_chart_VTR = draw_graph_line(canvas_VTR, xm2ioior_graph_time_VTR, xm2ioior_graph_data_VTR, xm2ioior_graph_time_VTR.length, setdata.setting.set.VTR);
        xm23p3wioior_chart_W = draw_graph_line(canvas_W, xm2ioior_graph_time_W, xm2ioior_graph_data_W, xm2ioior_graph_time_W.length, setdata.setting.set.W);
        xm23p3wioior_chart_Wh = draw_graph_bar(canvas_Wh, xm2ioior_graph_time_Wh, xm2ioior_graph_data_Wh, xm2ioior_graph_time_Wh.length, setdata.setting.set.Wh);
        xm23p3wioior_chart_Io = draw_graph_line(canvas_Io, xm2ioior_graph_time_Io, xm2ioior_graph_data_Io, xm2ioior_graph_time_Io.length, setdata.setting.set.Io);
        xm23p3wioior_chart_Ior = draw_graph_line(canvas_Ior, xm2ioior_graph_time_Ior, xm2ioior_graph_data_Ior, xm2ioior_graph_time_Ior.length, setdata.setting.set.Ior);
        xm23p3wioior_chart_IoMAX = draw_graph_line(canvas_IoMAX, xm2ioior_graph_time_IoMAX, xm2ioior_graph_data_IoMAX, xm2ioior_graph_time_IoMAX.length, setdata.setting.set.IoMAX);
        xm23p3wioior_chart_IorMAX = draw_graph_line(canvas_IorMAX, xm2ioior_graph_time_IorMAX, xm2ioior_graph_data_IorMAX, xm2ioior_graph_time_IorMAX.length, setdata.setting.set.IorMAX);

    }
}

/**
 *
 */
function xm21p3wioior_update_graph(setdata) {
    xm2ioior_update_graph(setdata)
}

/**
 *
 */
function xm23p3wioior_update_graph(setdata) {
    xm2ioior_update_graph(setdata)
}


/*  機能：  AD、DI、電波強度のグラフを更新
*/
function xm2ioior_update_graph(setdata) {
    //
    if (setdata.type == UnitCode.XM2_1P3W_Io_Ior) {
        graph_line_update(xm21p3wioior_chart_AR, xm2ioior_graph_time_AR, xm2ioior_graph_data_AR, xm2ioior_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(xm21p3wioior_chart_AS, xm2ioior_graph_time_AS, xm2ioior_graph_data_AS, xm2ioior_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(xm21p3wioior_chart_AT, xm2ioior_graph_time_AT, xm2ioior_graph_data_AT, xm2ioior_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(xm21p3wioior_chart_VRS, xm2ioior_graph_time_VRS, xm2ioior_graph_data_VRS, xm2ioior_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(xm21p3wioior_chart_VST, xm2ioior_graph_time_VST, xm2ioior_graph_data_VST, xm2ioior_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(xm21p3wioior_chart_VTR, xm2ioior_graph_time_VTR, xm2ioior_graph_data_VTR, xm2ioior_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(xm21p3wioior_chart_W, xm2ioior_graph_time_W, xm2ioior_graph_data_W, xm2ioior_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(xm21p3wioior_chart_Wh, xm2ioior_graph_time_Wh, xm2ioior_graph_data_Wh, xm2ioior_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(xm21p3wioior_chart_Io, xm2ioior_graph_time_Io, xm2ioior_graph_data_Io, xm2ioior_graph_time_Io.length, setdata.setting.set.Io);
        graph_line_update(xm21p3wioior_chart_Ior, xm2ioior_graph_time_Ior, xm2ioior_graph_data_Ior, xm2ioior_graph_time_Ior.length, setdata.setting.set.Ior);
        graph_line_update(xm21p3wioior_chart_IoMAX, xm2ioior_graph_time_IoMAX, xm2ioior_graph_data_IoMAX, xm2ioior_graph_time_IoMAX.length, setdata.setting.set.IoMAX);
        graph_line_update(xm21p3wioior_chart_IorMAX, xm2ioior_graph_time_IorMAX, xm2ioior_graph_data_IorMAX, xm2ioior_graph_time_IorMAX.length, setdata.setting.set.IorMAX);

    }
    else if (setdata.type == UnitCode.XM2_3P3W_Io_Ior) {
        graph_line_update(xm23p3wioior_chart_AR, xm2ioior_graph_time_AR, xm2ioior_graph_data_AR, xm2ioior_graph_time_AR.length, setdata.setting.set.AR);
        graph_line_update(xm23p3wioior_chart_AS, xm2ioior_graph_time_AS, xm2ioior_graph_data_AS, xm2ioior_graph_time_AS.length, setdata.setting.set.AS);
        graph_line_update(xm23p3wioior_chart_AT, xm2ioior_graph_time_AT, xm2ioior_graph_data_AT, xm2ioior_graph_time_AT.length, setdata.setting.set.AT);
        graph_line_update(xm23p3wioior_chart_VRS, xm2ioior_graph_time_VRS, xm2ioior_graph_data_VRS, xm2ioior_graph_time_VRS.length, setdata.setting.set.VRS);
        graph_line_update(xm23p3wioior_chart_VST, xm2ioior_graph_time_VST, xm2ioior_graph_data_VST, xm2ioior_graph_time_VST.length, setdata.setting.set.VST);
        graph_line_update(xm23p3wioior_chart_VTR, xm2ioior_graph_time_VTR, xm2ioior_graph_data_VTR, xm2ioior_graph_time_VTR.length, setdata.setting.set.VTR);
        graph_line_update(xm23p3wioior_chart_W, xm2ioior_graph_time_W, xm2ioior_graph_data_W, xm2ioior_graph_time_W.length, setdata.setting.set.W);
        graph_bar_update(xm23p3wioior_chart_Wh, xm2ioior_graph_time_Wh, xm2ioior_graph_data_Wh, xm2ioior_graph_time_Wh.length, setdata.setting.set.Wh);
        graph_line_update(xm23p3wioior_chart_Io, xm2ioior_graph_time_Io, xm2ioior_graph_data_Io, xm2ioior_graph_time_Io.length, setdata.setting.set.Io);
        graph_line_update(xm23p3wioior_chart_Ior, xm2ioior_graph_time_Ior, xm2ioior_graph_data_Ior, xm2ioior_graph_time_Ior.length, setdata.setting.set.Ior);
        graph_line_update(xm23p3wioior_chart_IoMAX, xm2ioior_graph_time_IoMAX, xm2ioior_graph_data_IoMAX, xm2ioior_graph_time_IoMAX.length, setdata.setting.set.IoMAX);
        graph_line_update(xm23p3wioior_chart_IorMAX, xm2ioior_graph_time_IorMAX, xm2ioior_graph_data_IorMAX, xm2ioior_graph_time_IorMAX.length, setdata.setting.set.IorMAX);
    }
}

/**
 * グラフデータを削除
 */
function fncXm2IoIorGrpClr(type) {

    try {
        xm2ioior_graph_data_AR.length = 0;
        xm2ioior_graph_data_VRS.length = 0;
        xm2ioior_graph_data_VST.length = 0;
        xm2ioior_graph_data_VTR.length = 0;
        xm2ioior_graph_data_Io.length = 0;
        xm2ioior_graph_data_Ior.length = 0;
        xm2ioior_graph_data_IoMAX.length = 0;
        xm2ioior_graph_data_IorMAX.length = 0;
        xm2ioior_graph_data_AS.length = 0;
        xm2ioior_graph_data_AT.length = 0;
        xm2ioior_graph_data_AN.length = 0;
        xm2ioior_graph_data_VRN.length = 0;
        xm2ioior_graph_data_VSN.length = 0;
        xm2ioior_graph_data_VTN.length = 0;
    } catch (error) {

    }

    try {
        xm2ioior_graph_time_AR.length = 0;
        xm2ioior_graph_time_VRS.length = 0;
        xm2ioior_graph_time_VST.length = 0;
        xm2ioior_graph_time_VTR.length = 0;
        xm2ioior_graph_time_W.length = 0;
        xm2ioior_graph_time_Wh.length = 0;
        xm2ioior_graph_time_Io.length = 0;
        xm2ioior_graph_time_Ior.length = 0;
        xm2ioior_graph_time_IoMAX.length = 0;
        xm2ioior_graph_time_IorMAX.length = 0;
        xm2ioior_graph_time_AS.length = 0;
        xm2ioior_graph_time_AT.length = 0;
        xm2ioior_graph_time_AN.length = 0;
        xm2ioior_graph_time_VRN.length = 0;
        xm2ioior_graph_time_VSN.length = 0;
        xm2ioior_graph_time_VTN.length = 0;
    } catch (error) {

    }


    /**
     *
     */
    switch (type) {

        case UnitCode.XM2_1P3W_Io_Ior:
            if (xm21p3wioior_graph_exist == true) {
                xm21p3wioior_chart_AR.destroy();
                xm21p3wioior_chart_AS.destroy();
                xm21p3wioior_chart_AT.destroy();
                xm21p3wioior_chart_VRS.destroy();
                xm21p3wioior_chart_VST.destroy();
                xm21p3wioior_chart_VTR.destroy();
                xm21p3wioior_chart_W.destroy();
                xm21p3wioior_chart_Wh.destroy();
                xm21p3wioior_chart_Io.destroy();
                xm21p3wioior_chart_Ior.destroy();
                xm21p3wioior_chart_IoMAX.destroy();
                xm21p3wioior_chart_IorMAX.destroy();
                xm21p3wioior_graph_exist = false;
            }
            else {

            }
            break;
        case UnitCode.XM2_3P3W_Io_Ior:
            if (xm23p3wioior_graph_exist == true) {
                xm23p3wioior_chart_AR.destroy();
                xm23p3wioior_chart_AS.destroy();
                xm23p3wioior_chart_AT.destroy();
                xm23p3wioior_chart_VRS.destroy();
                xm23p3wioior_chart_VST.destroy();
                xm23p3wioior_chart_VTR.destroy();
                xm23p3wioior_chart_W.destroy();
                xm23p3wioior_chart_Wh.destroy();
                xm23p3wioior_chart_Io.destroy();
                xm23p3wioior_chart_Ior.destroy();
                xm23p3wioior_chart_IoMAX.destroy();
                xm23p3wioior_chart_IorMAX.destroy();
                xm23p3wioior_graph_exist = false;
            }
            else {

            }
            break;
    }


    term = "#alertH_xm21p3wioior";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#xm21p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
    $("#xm21p3wioior_A1_Current").text("--");
    $("#xm21p3wioior_AN_Current").text("--");
    $("#xm21p3wioior_A2_Current").text("--");
    $("#xm21p3wioior_V1N_Voltage").text("--");
    $("#xm21p3wioior_V2N_Voltage").text("--");
    $("#xm21p3wioior_V12_Voltage").text("--");
    $("#xm21p3wioior_W_Power").text("--");
    $("#xm21p3wioior_Wh_Energy").text("--");
    $("#xm21p3wioior_Io_Current").text("--");
    $("#xm21p3wioior_Ior_Current").text("--");
    $("#xm21p3wioior_IoMAX_Current").text("--");
    $("#xm21p3wioior_IorMAX_Current").text("--");

    term = "#alertH_xm23p3wioior";
    $(term).removeClass("alert-success");
    $(term).removeClass("alert-danger");
    $(term).removeClass("alert-warning");
    $(term).html("");
    $("#xm23p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
    $("#xm23p3wioior_AR_Current").text("--");
    $("#xm23p3wioior_AS_Current").text("--");
    $("#xm23p3wioior_AT_Current").text("--");
    $("#xm23p3wioior_VRS_Voltage").text("--");
    $("#xm23p3wioior_VST_Voltage").text("--");
    $("#xm23p3wioior_VTR_Voltage").text("--");
    $("#xm23p3wioior_W_Power").text("--");
    $("#xm23p3wioior_Wh_Energy").text("--");
    $("#xm23p3wioior_Io_Current").text("--");
    $("#xm23p3wioior_Ior_Current").text("--");
    $("#xm23p3wioior_IoMAX_Current").text("--");
    $("#xm23p3wioior_IorMAX_Current").text("--");

    xm2ioior_graph_type = type;
}


const XM2IOIOR_TITLE_ = "title_";
const XM2IOIOR_GRAPHH_ = "graphH_";
const XM2IOIOR_GRAPHL_ = "graphL_";
const XM2IOIOR_ALARMH_ = "alarmH_";
const XM2IOIOR_ALARML_ = "alarmL_";
const XM2IOIOR_ALARMHE_ = "alarmHE_";
const XM2IOIOR_ALARMLE_ = "alarmLE_";
const XM2IOIOR_CLALARMH_ = "ClAlarmH_";
const XM2IOIOR_CLALARML_ = "ClAlarmL_";
/*  機能    ：チャネルの入力値をチェックしする、
    引数    ：XM2の価値の設定ボタンの押しイベントオブジェクト
    戻り値  ：
                正しい入力値なら    TRUE
                正しくない入力値    FALSE
*/
function check_xm2ioior_input(obj) {
    var strch = obj.target.id;
    var ID_temp = "";
    var term;
    var termL;
    var prefix;
    var suffix;
    var chkExclude = ["Wh"];
    var chkExclude2 = ["Io", "IoMAX", "Ior", "IorMAX"];
    var strIn;
    var termClH;
    var termClL;

    prefix = strch.split("_")[0] + "_";
    suffix = strch.split("_")[1];

    //タイトル
    ID_temp = prefix + XM2IOIOR_TITLE_ + suffix;
    console.log(ID_temp)
    var strTitle = document.getElementById(ID_temp).value;
    if (strTitle.trim() == "") {
        swal({
            title: "設定エラー！",
            text: "タイトルを入力してください",
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

    //グラフの上限値、グラフの下限値
    if (chkExclude.includes(suffix) == false) {
        //グラフの上限値
        ID_temp = prefix + XM2IOIOR_GRAPHH_ + suffix;
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
        ID_temp = prefix + XM2IOIOR_GRAPHL_ + suffix;
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
                text: "グラフ下限値はグラフ上限値より大きな値を入力しないでください",
                icon: "warning",
                button: "はい",
            });
            return false;
        }

        //上限警報発生値
        ID_temp = prefix + XM2IOIOR_ALARMH_ + suffix;
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
        ID_temp = prefix + XM2IOIOR_CLALARMH_ + suffix;
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
        if (chkExclude2.includes(suffix) == false) {
            //下限警報発生値
            ID_temp = prefix + XM2IOIOR_ALARML_ + suffix;
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
            ID_temp = prefix + XM2IOIOR_CLALARML_ + suffix;
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
    }
    else {
        //グラフの上限値
        ID_temp = prefix + XM2IOIOR_GRAPHH_ + suffix;
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

/*  機能：  XM2設定の要求電文を作成
            ホストのアドレスを含まない
    引数：
            i: XM2の設定ボタンの順番
            unitNo: 現在のユニットの順番
    戻り値： 要求電文
*/
function set_xm2ioior_setting(unitNo, e) {
    var ch = e.target.id;
    var prefix;
    var suffix;
    var chkExclude = ["Wh"];
    var chkExclude2 = ["Io", "IoMAX", "Ior", "IorMAX"];
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
    jsDat.Title = chr2sjis(document.getElementById(prefix + XM2IOIOR_TITLE_ + suffix).value, 20);
    //[GraphL]
    if (chkExclude.includes(suffix) == false) {
        jsDat.GraphL = dec2hex(document.getElementById(prefix + XM2IOIOR_GRAPHL_ + suffix).value, settingpoint);
    }
    else {
        jsDat.GraphL = "000000000000";
    }
    //[GraphH]
    jsDat.GraphH = dec2hex(document.getElementById(prefix + XM2IOIOR_GRAPHH_ + suffix).value, settingpoint);
    //[AlarmL]
    if (chkExclude.includes(suffix) == false && chkExclude2.includes(suffix) == false) {
        jsDat.AlarmL = dec2hex(document.getElementById(prefix + XM2IOIOR_ALARML_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmL = "000000000000";
    }
    //[AlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmH = dec2hex(document.getElementById(prefix + XM2IOIOR_ALARMH_ + suffix).value, settingpoint);
    }
    else {
        jsDat.AlarmH = "000000000000";
    }
    //[AlarmLE]
    if (chkExclude.includes(suffix) == false && chkExclude2.includes(suffix) == false) {
        jsDat.AlarmLE = ((document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmLE = 0;
    }
    //[AlarmHE]
    if (chkExclude.includes(suffix) == false) {
        jsDat.AlarmHE = ((document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked == true) ? 1 : 0);
    }
    else {
        jsDat.AlarmHE = 0;
    }
    //[ClAlarmL]
    if (chkExclude.includes(suffix) == false && chkExclude2.includes(suffix) == false) {
        jsDat.ClAlarmL = dec2hex(document.getElementById(prefix + XM2IOIOR_CLALARML_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmL = "000000000000";
    }
    //[ClAlarmH]
    if (chkExclude.includes(suffix) == false) {
        jsDat.ClAlarmH = dec2hex(document.getElementById(prefix + XM2IOIOR_CLALARMH_ + suffix).value * Math.pow(10, settingpoint), 0);
    }
    else {
        jsDat.ClAlarmH = "000000000000";
    }

    jsDat.MODEL_CHECK = 0;
    
    //ダイアログを表示
    fncSendSettingPost(RS_SETTING_SET, jsDat);
}


/**
 * XM2の設定値を表示する
 *
 */
var gxm2SettingPointArray = {};
function xm2ioior_loaddata_setting(obj, Type) {
    var settingpoint = 4;
    if (obj.Status == 200) {

        // Setting point clear
        gxm2SettingPointArray = {};
        console.log("TYPE:" + Type);

        switch (Type) {
            case UnitCode.XM2_1P3W_Io_Ior:
                prefix = "xm21p3wioior_";

                suffix = "AR";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.A1_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.A1_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.A1_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.A1_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.A1_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.A1_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.A1_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.A1_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.A1_Current.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A1_Current.Point;

                suffix = "AS";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.AN_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.AN_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.AN_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.AN_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.AN_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.AN_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.AN_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.AN_Current.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AN_Current.Point;

                suffix = "AT";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.A2_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.A2_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.A2_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.A2_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.A2_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.A2_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.A2_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.A2_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.A2_Current.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.A2_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.V1N_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.V1N_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.V1N_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.V1N_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.V1N_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.V1N_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.V1N_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.V1N_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.V1N_Voltage.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V1N_Voltage.Point;

                suffix = "VST";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.V2N_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.V2N_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.V2N_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.V2N_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.V2N_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.V2N_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.V2N_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.V2N_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.V2N_Voltage.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V2N_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.V12_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.V12_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.V12_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.V12_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.V12_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.V12_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.V12_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.V12_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.V12_Voltage.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.V12_Voltage.Point;

                suffix = "W";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "Io";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.Io_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.Io_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.Io_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.Io_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.Io_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.Io_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Io_Current.Point;

                suffix = "IoMAX";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.IoMAX_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.IoMAX_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.IoMAX_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.IoMAX_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.IoMAX_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.IoMAX_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.IoMAX_Current.Point;

                //Ior
                suffix = "Ior";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.Ior_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.Ior_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.Ior_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.Ior_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.Ior_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.Ior_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Ior_Current.Point;

                //IorMAX
                suffix = "IorMAX";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.IorMAX_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.IorMAX_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.IorMAX_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.IorMAX_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.IorMAX_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.IorMAX_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.IorMAX_Current.Point;

                break;

            case UnitCode.XM2_3P3W_Io_Ior:
                prefix = "xm23p3wioior_";

                suffix = "AR";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.AR_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.AR_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.AR_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.AR_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.AR_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.AR_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.AR_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.AR_Current.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AR_Current.Point;


                suffix = "AS";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.AS_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.AS_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.AS_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.AS_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.AS_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.AS_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.AS_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.AS_Current.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AS_Current.Point;

                suffix = "AT";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.AT_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.AT_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.AT_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.AT_Current.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.AT_Current.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.AT_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.AT_Current.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.AT_Current.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.AT_Current.Point;

                suffix = "VRS";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.VRS_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.VRS_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.VRS_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.VRS_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.VRS_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.VRS_Voltage.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VRS_Voltage.Point;

                suffix = "VST";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.VST_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.VST_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.VST_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.VST_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.VST_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.VST_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.VST_Voltage.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VST_Voltage.Point;

                suffix = "VTR";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.VTR_Voltage.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.VTR_Voltage.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.VTR_Voltage.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.VTR_Voltage.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.VTR_Voltage.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.VTR_Voltage.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.VTR_Voltage.Point;

                suffix = "W";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.W_Power.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.W_Power.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.W_Power.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.W_Power.Alarm[1]).toFixed(settingpoint));
                // 警報下限
                $("#" + prefix + XM2IOIOR_ALARML_ + suffix).val((obj.Respons.W_Power.Alarm[0]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.W_Power.ClAlarm[1]).toFixed(settingpoint));
                // 警報出力下限値解除
                $("#" + prefix + XM2IOIOR_CLALARML_ + suffix).val((obj.Respons.W_Power.ClAlarm[0]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[1]));
                // 警報下限有無
                document.getElementById(prefix + XM2IOIOR_ALARMLE_ + suffix).checked = ((obj.Respons.W_Power.AlarmE[0]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.W_Power.Point;

                suffix = "Wh";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.Wh_Energy.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.Wh_Energy.Graph[1]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.Wh_Energy.Alarm[1]).toFixed(settingpoint));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Wh_Energy.Point;

                suffix = "Io";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.Io_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.Io_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.Io_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.Io_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.Io_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.Io_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Io_Current.Point;

                suffix = "IoMAX";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.IoMAX_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.IoMAX_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.IoMAX_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.IoMAX_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.IoMAX_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.IoMAX_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.IoMAX_Current.Point;


                suffix = "Ior";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.Ior_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.Ior_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.Ior_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.Ior_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.Ior_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.Ior_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.Ior_Current.Point;

                suffix = "IorMAX";
                // タイトル
                $("#" + prefix + XM2IOIOR_TITLE_ + suffix).val(jis2chr(obj.Respons.IorMAX_Current.Title));
                // グラフ上限
                $("#" + prefix + XM2IOIOR_GRAPHH_ + suffix).val((obj.Respons.IorMAX_Current.Graph[1]).toFixed(settingpoint));
                // グラフ下限
                $("#" + prefix + XM2IOIOR_GRAPHL_ + suffix).val((obj.Respons.IorMAX_Current.Graph[0]).toFixed(settingpoint));
                // 警報上限
                $("#" + prefix + XM2IOIOR_ALARMH_ + suffix).val((obj.Respons.IorMAX_Current.Alarm[1]).toFixed(settingpoint));
                // 警報出力上限値解除
                $("#" + prefix + XM2IOIOR_CLALARMH_ + suffix).val((obj.Respons.IorMAX_Current.ClAlarm[1]).toFixed(settingpoint));
                // 警報上限有無
                document.getElementById(prefix + XM2IOIOR_ALARMHE_ + suffix).checked = ((obj.Respons.IorMAX_Current.AlarmE[1]));
                // 小数点値
                gxm2SettingPointArray[prefix + suffix + "_Point"] = obj.Respons.IorMAX_Current.Point;

                break;
        }

    } else {
        //Debug
    }
}


/**
* XM21P3Wデータ
*/
function get_InsDatXM21P3W_Io_Ior(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#xm21p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
        $("#xm21p3wioior_A1_Current").text("--");
        $("#xm21p3wioior_AN_Current").text("--");
        $("#xm21p3wioior_A2_Current").text("--");
        $("#xm21p3wioior_V1N_Voltage").text("--");
        $("#xm21p3wioior_V2N_Voltage").text("--");
        $("#xm21p3wioior_V12_Voltage").text("--");
        $("#xm21p3wioior_W_Power").text("--");
        $("#xm21p3wioior_Wh_Energy").text("--");
        $("#xm21p3wioior_Io_Current").text("--");
        $("#xm21p3wioior_Ior_Current").text("--");
        $("#xm21p3wioior_IoMAX_Current").text("--");
        $("#xm21p3wioior_IorMAX_Current").text("--");

        var term = "#alertH_xm21p3wioior";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    // 設定値をロードする
    if (setting.setting !== null) {
        // 設定値データを表示させる
        var prefix = "xm21p3wioior"
        $("#xm21p3wioior_A1_Current_Title").text(setting.setting.set.AR.Title);
        $("#xm21p3wioior_AN_Current_Title").text(setting.setting.set.AS.Title);
        $("#xm21p3wioior_A2_Current_Title").text(setting.setting.set.AT.Title);
        $("#xm21p3wioior_V1N_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#xm21p3wioior_V2N_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#xm21p3wioior_V12_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#xm21p3wioior_W_Power_Title").text(setting.setting.set.W.Title);
        $("#xm21p3wioior_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#xm21p3wioior_Io_Current_Title").text(setting.setting.set.Io.Title);
        $("#xm21p3wioior_Ior_Current_Title").text(setting.setting.set.Ior.Title);
        $("#xm21p3wioior_IoMAX_Current_Title").text(setting.setting.set.IoMAX.Title);
        $("#xm21p3wioior_IorMAX_Current_Title").text(setting.setting.set.IorMAX.Title);

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

        //Io
        $("#" + prefix + "_Title_Io").text(setting.setting.set.Io.Title);
        if (setting.setting.set.Io.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_Io").css({ "display": "block" });
            $("#" + prefix + "_aH_Io").text("上限警報発生値:" + setting.setting.set.Io.Alarm[1].toFixed(setting.setting.set.Io.Point) + " [mA]")
        }
        else {
            $("#" + prefix + "_aHE_Io").css({ "display": "none" });
        }

        //IoMAX
        $("#" + prefix + "_Title_IoMAX").text(setting.setting.set.IoMAX.Title);
        if (setting.setting.set.IoMAX.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_IoMAX").css({ "display": "block" });
            $("#" + prefix + "_aH_IoMAX").text("上限警報発生値:" + setting.setting.set.IoMAX.Alarm[1].toFixed(setting.setting.set.IoMAX.Point) + " [mA]")
        }
        else {
            $("#" + prefix + "_aHE_IoMAX").css({ "display": "none" });
        }

        //Ior
        $("#" + prefix + "_Title_Ior").text(setting.setting.set.Ior.Title);
        if (setting.setting.set.Ior.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_Ior").css({ "display": "block" });
            $("#" + prefix + "_aH_Ior").text("上限警報発生値:" + setting.setting.set.Ior.Alarm[1].toFixed(setting.setting.set.Ior.Point) + " [mA]")
        }
        else {
            $("#" + prefix + "_aHE_Ior").css({ "display": "none" });
        }

        //Ior
        $("#" + prefix + "_Title_IorMAX").text(setting.setting.set.IorMAX.Title);
        if (setting.setting.set.IorMAX.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_IorMAX").css({ "display": "block" });
            $("#" + prefix + "_aH_IorMAX").text("上限警報発生値:" + setting.setting.set.IorMAX.Alarm[1].toFixed(setting.setting.set.IorMAX.Point) + " [mA]")
        }
        else {
            $("#" + prefix + "_aHE_IorMAX").css({ "display": "none" });
        }
    }
    else {
        unitNoRequest = true;
    }

    // 通信異常又は設定無しの場合、瞬時値を取得しない
    if (unitNoRequest == true) {
        return;
    }

    rs485_insread_data(unitNo, function (obj, setting) {
        if (obj.Status == 200) {
            // データがない
            if (obj.Respons.Data == null) {
                $("#xm21p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
                $("#xm21p3wioior_A1_Current").text("--");
                $("#xm21p3wioior_AN_Current").text("--");
                $("#xm21p3wioior_A2_Current").text("--");
                $("#xm21p3wioior_V1N_Voltage").text("--");
                $("#xm21p3wioior_V2N_Voltage").text("--");
                $("#xm21p3wioior_V12_Voltage").text("--");
                $("#xm21p3wioior_W_Power").text("--");
                $("#xm21p3wioior_Wh_Energy").text("--");
                $("#xm21p3wioior_Io_Current").text("--");
                $("#xm21p3wioior_Ior_Current").text("--");
                $("#xm21p3wioior_IoMAX_Current").text("--");
                $("#xm21p3wioior_IorMAX_Current").text("--");
            }
            // データがある
            else {
                var termdata;
                $("#xm21p3wioiorupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#xm21p3wioior_A1_Current").text(obj.Respons.Data.A1_Current.Value + " [A]");
                $("#xm21p3wioior_AN_Current").text(obj.Respons.Data.AN_Current.Value + " [A]");
                $("#xm21p3wioior_A2_Current").text(obj.Respons.Data.A2_Current.Value + " [A]");
                $("#xm21p3wioior_V1N_Voltage").text(obj.Respons.Data.V1N_Voltage.Value + " [V]");
                $("#xm21p3wioior_V2N_Voltage").text(obj.Respons.Data.V2N_Voltage.Value + " [V]");
                $("#xm21p3wioior_V12_Voltage").text(obj.Respons.Data.V12_Voltage.Value + " [V]");
                $("#xm21p3wioior_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#xm21p3wioior_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#xm21p3wioior_Io_Current").text(obj.Respons.Data.Io_Current.Value + " [mA]");
                $("#xm21p3wioior_Ior_Current").text(obj.Respons.Data.Ior_Current.Value + " [mA]");
                $("#xm21p3wioior_IoMAX_Current").text(obj.Respons.Data.IoMAX_Current.Value + " [mA]");
                $("#xm21p3wioior_IorMAX_Current").text(obj.Respons.Data.IorMAX_Current.Value + " [mA]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_xm21p3wioior";
                var alert_str1 = "";
                var unknown = false;
                var xm2warncheck = {
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
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        },
                        {
                            ele: "Io_Current",
                            content: setting.setting.set.Io.Title
                        },
                        {
                            ele: "Ior_Current",
                            content: setting.setting.set.Ior.Title
                        },
                        {
                            ele: "IoMAX_Current",
                            content: setting.setting.set.IoMAX.Title
                        },
                        {
                            ele: "IorMAX_Current",
                            content: setting.setting.set.IorMAX.Title
                        }
                    ]
                }

                //DI
                for (var i = 0; i < xm2warncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[xm2warncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[xm2warncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = xm2warncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = xm2warncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = xm2warncheck.checkitem[i].content;
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

        } else {
            $("#xm21p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
            $("#xm21p3wioior_A1_Current").text("--");
            $("#xm21p3wioior_AN_Current").text("--");
            $("#xm21p3wioior_A2_Current").text("--");
            $("#xm21p3wioior_V1N_Voltage").text("--");
            $("#xm21p3wioior_V2N_Voltage").text("--");
            $("#xm21p3wioior_V12_Voltage").text("--");
            $("#xm21p3wioior_W_Power").text("--");
            $("#xm21p3wioior_Wh_Energy").text("--");
            $("#xm21p3wioior_Io_Current").text("--");
            $("#xm21p3wioior_Ior_Current").text("--");
            $("#xm21p3wioior_IoMAX_Current").text("--");
            $("#xm21p3wioior_IorMAX_Current").text("--");

            //警報状態
            term = "#alertH_xm21p3wioior";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}

/**
* xm23p3wioiorデータ
*/
function get_InsDatXM23P3W_Io_Ior(setting, unitNo, unitSts) {
    var unitNoRequest = false;

    // 通信異常の時、「--」のに表示する
    if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null)) {
        $("#xm23p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
        $("#xm23p3wioior_AR_Current").text("--");
        $("#xm23p3wioior_AS_Current").text("--");
        $("#xm23p3wioior_AT_Current").text("--");
        $("#xm23p3wioior_VRS_Voltage").text("--");
        $("#xm23p3wioior_VST_Voltage").text("--");
        $("#xm23p3wioior_VTR_Voltage").text("--");
        $("#xm23p3wioior_W_Power").text("--");
        $("#xm23p3wioior_Wh_Energy").text("--");
        $("#xm23p3wioior_Io_Current").text("--");
        $("#xm23p3wioior_Ior_Current").text("--");
        $("#xm23p3wioior_IoMAX_Current").text("--");
        $("#xm23p3wioior_IorMAX_Current").text("--");

        var term = "#alertH_xm23p3wioior";
        $(term).removeClass("alert-success");
        $(term).removeClass("alert-warning");
        $(term).addClass("alert-danger");
        $(term).html("<strong>通信異常</strong>" + "が発生しています！　");

        unitNoRequest = true;
    }

    // 設定値データを表示させる
    if (setting.setting !== null) {
        var prefix = "xm23p3wioior";

        $("#xm23p3wioior_AR_Current_Title").text(setting.setting.set.AR.Title);
        $("#xm23p3wioior_AS_Current_Title").text(setting.setting.set.AS.Title);
        $("#xm23p3wioior_AT_Current_Title").text(setting.setting.set.AT.Title);
        $("#xm23p3wioior_VRS_Voltage_Title").text(setting.setting.set.VRS.Title);
        $("#xm23p3wioior_VST_Voltage_Title").text(setting.setting.set.VST.Title);
        $("#xm23p3wioior_VTR_Voltage_Title").text(setting.setting.set.VTR.Title);
        $("#xm23p3wioior_W_Power_Title").text(setting.setting.set.W.Title);
        $("#xm23p3wioior_Wh_Energy_Title").text(setting.setting.set.Wh.Title);
        $("#xm23p3wioior_Io_Current_Title").text(setting.setting.set.Io.Title);
        $("#xm23p3wioior_Ior_Current_Title").text(setting.setting.set.Ior.Title);
        $("#xm23p3wioior_IoMAX_Current_Title").text(setting.setting.set.IoMAX.Title);
        $("#xm23p3wioior_IorMAX_Current_Title").text(setting.setting.set.IorMAX.Title);

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
            $("#" + prefix + "_aL_AT").text("下限警報発生値:" + setting.setting.set.AT.Alarm[0].toFixed(setting.setting.set.AT.Point) + " [A]")
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
            $("#" + prefix + "_aLE_W").css({ "display": "none" })
        }

        //電力量
        $("#" + prefix + "_Title_Wh").text(setting.setting.set.Wh.Title);
        $("#" + prefix + "_aHE_Wh").css({ "display": "none" });
        $("#" + prefix + "_aLE_Wh").css({ "display": "none" });

        //Io
        $("#" + prefix + "_Title_Io").text(setting.setting.set.Io.Title);
        if (setting.setting.set.Io.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_Io").css({ "display": "block" });
            $("#" + prefix + "_aH_Io").text("上限警報発生値:" + setting.setting.set.Io.Alarm[1].toFixed(setting.setting.set.Io.Point) + " [mA]");
        }
        else {
            $("#" + prefix + "_aHE_Io").css({ "display": "none" });
        }

        //IoMAX
        $("#" + prefix + "_Title_IoMAX").text(setting.setting.set.IoMAX.Title);
        if (setting.setting.set.IoMAX.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_IoMAX").css({ "display": "block" });
            $("#" + prefix + "_aH_IoMAX").text("上限警報発生値:" + setting.setting.set.IoMAX.Alarm[1].toFixed(setting.setting.set.IoMAX.Point) + " [mA]");
        }
        else {
            $("#" + prefix + "_aHE_IoMAX").css({ "display": "none" });
        }

        //Ior
        $("#" + prefix + "_Title_Ior").text(setting.setting.set.Ior.Title);
        if (setting.setting.set.Io.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_Ior").css({ "display": "block" });
            $("#" + prefix + "_aH_Ior").text("上限警報発生値:" + setting.setting.set.Ior.Alarm[1].toFixed(setting.setting.set.Ior.Point) + " [mA]");
        }
        else {
            $("#" + prefix + "_aHE_Ior").css({ "display": "none" });
        }

        //IorMAX
        $("#" + prefix + "_Title_IorMAX").text(setting.setting.set.IorMAX.Title);
        if (setting.setting.set.Io.AlarmE[1] !== 0) {
            $("#" + prefix + "_aHE_IorMAX").css({ "display": "block" });
            $("#" + prefix + "_aH_IorMAX").text("上限警報発生値:" + setting.setting.set.IorMAX.Alarm[1].toFixed(setting.setting.set.IorMAX.Point) + " [mA]");
        }
        else {
            $("#" + prefix + "_aHE_IorMAX").css({ "display": "none" });
        }
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
                $("#xm23p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
                $("#xm23p3wioior_AR_Current").text("--");
                $("#xm23p3wioior_AS_Current").text("--");
                $("#xm23p3wioior_AT_Current").text("--");
                $("#xm23p3wioior_VRS_Voltage").text("--");
                $("#xm23p3wioior_VST_Voltage").text("--");
                $("#xm23p3wioior_VTR_Voltage").text("--");
                $("#xm23p3wioior_W_Power").text("--");
                $("#xm23p3wioior_Wh_Energy").text("--");
                $("#xm23p3wioior_Io_Current").text("--");
                $("#xm23p3wioior_Ior_Current").text("--");
                $("#xm23p3wioior_IoMAX_Current").text("--");
                $("#xm23p3wioior_IorMAX_Current").text("--");
            }
            // データがある
            else {
                var termdata;
                $("#xm23p3wioiorupdated_time").text("データ更新：" + obj.Respons.Time[0] + "/" + ("0" + obj.Respons.Time[1]).slice(-2) + "/" + ("0" + obj.Respons.Time[2]).slice(-2) + " " + ("00" + obj.Respons.Time[3]).slice(-2) + ":" + ("00" + obj.Respons.Time[4]).slice(-2));
                $("#xm23p3wioior_AR_Current").text(obj.Respons.Data.AR_Current.Value + " [A]");
                $("#xm23p3wioior_AS_Current").text(obj.Respons.Data.AS_Current.Value + " [A]");
                $("#xm23p3wioior_AT_Current").text(obj.Respons.Data.AT_Current.Value + " [A]");
                $("#xm23p3wioior_VRS_Voltage").text(obj.Respons.Data.VRS_Voltage.Value + " [V]");
                $("#xm23p3wioior_VST_Voltage").text(obj.Respons.Data.VST_Voltage.Value + " [V]");
                $("#xm23p3wioior_VTR_Voltage").text(obj.Respons.Data.VTR_Voltage.Value + " [V]");
                $("#xm23p3wioior_W_Power").text(obj.Respons.Data.W_Power.Value + " [kW]");
                $("#xm23p3wioior_Wh_Energy").text(obj.Respons.Data.Wh_Energy.Value + " [kWh]");
                $("#xm23p3wioior_Io_Current").text(obj.Respons.Data.Io_Current.Value + " [mA]");
                $("#xm23p3wioior_Ior_Current").text(obj.Respons.Data.Ior_Current.Value + " [mA]");
                $("#xm23p3wioior_IoMAX_Current").text(obj.Respons.Data.IoMAX_Current.Value + " [mA]");
                $("#xm23p3wioior_IorMAX_Current").text(obj.Respons.Data.IorMAX_Current.Value + " [mA]");

                //警報状態
                var alert_exist = 0;// 0: success; 1; danger; 2: warning
                term = "#alertH_xm23p3wioior";
                var alert_str1 = "";
                var unknown = false;
                var xm2warncheck = {
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
                            ele: "W_Power",
                            content: setting.setting.set.W.Title
                        },
                        {
                            ele: "Io_Current",
                            content: setting.setting.set.Io.Title
                        },
                        {
                            ele: "Ior_Current",
                            content: setting.setting.set.Ior.Title
                        },
                        {
                            ele: "IoMAX_Current",
                            content: setting.setting.set.IoMAX.Title
                        },
                        {
                            ele: "IorMAX_Current",
                            content: setting.setting.set.IorMAX.Title
                        }
                    ]
                }

                //DI
                for (var i = 0; i < xm2warncheck.checkitem.length && alert_exist == 0; i++) {
                    if (obj.Respons.Data[xm2warncheck.checkitem[i].ele].State == null) {
                        unknown = true;
                    }
                    termdata = parseInt(obj.Respons.Data[xm2warncheck.checkitem[i].ele].State, 16);
                    //警報上限値： 警報下限値 ＝ 0, 警報上限値 ＝ 1
                    // xxxx 10xx xxxx xxxx
                    if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0)) {
                        alert_exist = 1;
                        alert_str1 = xm2warncheck.checkitem[i].content;
                    }
                    //警報下限値： 警報下限値フラグ ＝ 1, 警報上限値フラグ ＝ 0
                    // xxxx 01xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0) && ((termdata & 0x0400) == 0x0400)) {
                        alert_exist = 2;
                        alert_str1 = xm2warncheck.checkitem[i].content;
                    }
                    //不明
                    // xxxx 11xx xxxx xxxx
                    else if (((termdata & 0x0800) == 0x0800) && ((termdata & 0x0400) == 0x0400)) {
                        //alert_exist = 3;
                        alert_str1 = xm2warncheck.checkitem[i].content;
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
            $("#xm23p3wioiorupdated_time").text("データ更新：----/--/-- --:--");
            $("#xm23p3wioior_AR_Current").text("--");
            $("#xm23p3wioior_AS_Current").text("--");
            $("#xm23p3wioior_AT_Current").text("--");
            $("#xm23p3wioior_VRS_Voltage").text("--");
            $("#xm23p3wioior_VST_Voltage").text("--");
            $("#xm23p3wioior_VTR_Voltage").text("--");
            $("#xm23p3wioior_W_Power").text("--");
            $("#xm23p3wioior_Wh_Energy").text("--");
            $("#xm23p3wioior_Io_Current").text("--");
            $("#xm23p3wioior_Ior_Current").text("--");
            $("#xm23p3wioior_IoMAX_Current").text("--");
            $("#xm23p3wioior_IorMAX_Current").text("--");

            //警報状態
            term = "#alertH_xm23p3wioior";
            $(term).removeClass("alert-success");
            $(term).removeClass("alert-danger");
            $(term).removeClass("alert-warning");
            $(term).html("<strong>NO DATA</strong>　");
        }
    }, setting);
}




/* XM2 3P3Wダイナミク瞬時データ表示作成 */
function fncXM23P3W_Io_Ior_InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idxm2ioiortitle" class="h5 m-0 ">xm2ioiortitlestring \
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
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="Io_Current_Title" class="text-center table-active font-weight-bold">Io</td> \
                            <td id="Io_Current" colspan="2" class="text-right">--</td> \
                            <td id="IoMAX_Current_Title" class="text-center table-active font-weight-bold">IoMAX</td> \
                            <td id="IoMAX_Current" colspan="2" class="text-right">--</td> \
                            <td id="Ior_Current_Title" class="text-center table-active font-weight-bold">Ior</td> \
                            <td id="Ior_Current" colspan="2" class="text-right">--</td> \
                            <td id="IorMAX_Current_Title" class="text-center table-active font-weight-bold">IorMAX</td> \
                            <td id="IorMAX_Current" colspan="2" class="text-right">--</td> \
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
    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/Io_Current/g, tvid + "Io_Current");
    rtnval = rtnval.replace(/Ior_Current/g, tvid + "Ior_Current");
    rtnval = rtnval.replace(/IoMAX_Current/g, tvid + "IoMAX_Current");
    rtnval = rtnval.replace(/IorMAX_Current/g, tvid + "IorMAX_Current");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/xm2ioiortitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataXm23p3w_Io_Ior(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "AR_Current").text("--");
        $('#' + tvid + "AS_Current").text("--");
        $('#' + tvid + "VRS_Voltage").text("--");
        $('#' + tvid + "AT_Current").text("--");
        $('#' + tvid + "VST_Voltage").text("--");
        $('#' + tvid + "VTR_Voltage").text("--");
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "Io_Current").text("--");
        $('#' + tvid + "Ior_Current").text("--");
        $('#' + tvid + "IoMAX_Current").text("--");
        $('#' + tvid + "IorMAX_Current").text("--");
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
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "Io_Current").text(realtimeObj.Data.Io_Current.Value + " [mA]");
        $('#' + tvid + "Ior_Current").text(realtimeObj.Data.Ior_Current.Value + " [mA]");
        $('#' + tvid + "IoMAX_Current").text(realtimeObj.Data.IoMAX_Current.Value + " [mA]");
        $('#' + tvid + "IorMAX_Current").text(realtimeObj.Data.IorMAX_Current.Value + " [mA]");
    }
}

function fncXM23P3W_Io_Ior_DspData(tvid, unitNo, isUnitChg, xm2ioiorsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var xm2ioior_set_tmp = {
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
            Io: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Ior: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            IoMAX: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            IorMAX: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },

        };

        xm2ioiorsetting.setting = { "set": xm2ioior_set_tmp };

        xm2ioiorsetting.setting.set.AR.Title = jis2chr(settingObj.AR_Current.Title);
        xm2ioiorsetting.setting.set.AR.Point = settingObj.AR_Current.Point;
        xm2ioiorsetting.setting.set.AR.Graph[0] = settingObj.AR_Current.Graph[0];
        xm2ioiorsetting.setting.set.AR.Graph[1] = settingObj.AR_Current.Graph[1];
        xm2ioiorsetting.setting.set.AR.Alarm[0] = settingObj.AR_Current.Alarm[0];
        xm2ioiorsetting.setting.set.AR.Alarm[1] = settingObj.AR_Current.Alarm[1];
        xm2ioiorsetting.setting.set.AR.AlarmE[0] = settingObj.AR_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.AR.AlarmE[1] = settingObj.AR_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.AS.Title = jis2chr(settingObj.AS_Current.Title);
        xm2ioiorsetting.setting.set.AS.Point = settingObj.AS_Current.Point;
        xm2ioiorsetting.setting.set.AS.Graph[0] = settingObj.AS_Current.Graph[0];
        xm2ioiorsetting.setting.set.AS.Graph[1] = settingObj.AS_Current.Graph[1];
        xm2ioiorsetting.setting.set.AS.Alarm[0] = settingObj.AS_Current.Alarm[0];
        xm2ioiorsetting.setting.set.AS.Alarm[1] = settingObj.AS_Current.Alarm[1];
        xm2ioiorsetting.setting.set.AS.AlarmE[0] = settingObj.AS_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.AS.AlarmE[1] = settingObj.AS_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.AT.Title = jis2chr(settingObj.AT_Current.Title);
        xm2ioiorsetting.setting.set.AT.Point = settingObj.AT_Current.Point;
        xm2ioiorsetting.setting.set.AT.Graph[0] = settingObj.AT_Current.Graph[0];
        xm2ioiorsetting.setting.set.AT.Graph[1] = settingObj.AT_Current.Graph[1];
        xm2ioiorsetting.setting.set.AT.Alarm[0] = settingObj.AT_Current.Alarm[0];
        xm2ioiorsetting.setting.set.AT.Alarm[1] = settingObj.AT_Current.Alarm[1];
        xm2ioiorsetting.setting.set.AT.AlarmE[0] = settingObj.AT_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.AT.AlarmE[1] = settingObj.AT_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.VRS.Title = jis2chr(settingObj.VRS_Voltage.Title);
        xm2ioiorsetting.setting.set.VRS.Point = settingObj.VRS_Voltage.Point;
        xm2ioiorsetting.setting.set.VRS.Graph[0] = settingObj.VRS_Voltage.Graph[0];
        xm2ioiorsetting.setting.set.VRS.Graph[1] = settingObj.VRS_Voltage.Graph[1];
        xm2ioiorsetting.setting.set.VRS.Alarm[0] = settingObj.VRS_Voltage.Alarm[0];
        xm2ioiorsetting.setting.set.VRS.Alarm[1] = settingObj.VRS_Voltage.Alarm[1];
        xm2ioiorsetting.setting.set.VRS.AlarmE[0] = settingObj.VRS_Voltage.AlarmE[0];
        xm2ioiorsetting.setting.set.VRS.AlarmE[1] = settingObj.VRS_Voltage.AlarmE[1];

        xm2ioiorsetting.setting.set.VST.Title = jis2chr(settingObj.VST_Voltage.Title);
        xm2ioiorsetting.setting.set.VST.Point = settingObj.VST_Voltage.Point;
        xm2ioiorsetting.setting.set.VST.Graph[0] = settingObj.VST_Voltage.Graph[0];
        xm2ioiorsetting.setting.set.VST.Graph[1] = settingObj.VST_Voltage.Graph[1];
        xm2ioiorsetting.setting.set.VST.Alarm[0] = settingObj.VST_Voltage.Alarm[0];
        xm2ioiorsetting.setting.set.VST.Alarm[1] = settingObj.VST_Voltage.Alarm[1];
        xm2ioiorsetting.setting.set.VST.AlarmE[0] = settingObj.VST_Voltage.AlarmE[0];
        xm2ioiorsetting.setting.set.VST.AlarmE[1] = settingObj.VST_Voltage.AlarmE[1];

        xm2ioiorsetting.setting.set.VTR.Title = jis2chr(settingObj.VTR_Voltage.Title);
        xm2ioiorsetting.setting.set.VTR.Point = settingObj.VTR_Voltage.Point;
        xm2ioiorsetting.setting.set.VTR.Graph[0] = settingObj.VTR_Voltage.Graph[0];
        xm2ioiorsetting.setting.set.VTR.Graph[1] = settingObj.VTR_Voltage.Graph[1];
        xm2ioiorsetting.setting.set.VTR.Alarm[0] = settingObj.VTR_Voltage.Alarm[0];
        xm2ioiorsetting.setting.set.VTR.Alarm[1] = settingObj.VTR_Voltage.Alarm[1];
        xm2ioiorsetting.setting.set.VTR.AlarmE[0] = settingObj.VTR_Voltage.AlarmE[0];
        xm2ioiorsetting.setting.set.VTR.AlarmE[1] = settingObj.VTR_Voltage.AlarmE[1];


        xm2ioiorsetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        xm2ioiorsetting.setting.set.W.Point = settingObj.W_Power.Point;
        xm2ioiorsetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        xm2ioiorsetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        xm2ioiorsetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        xm2ioiorsetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        xm2ioiorsetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        xm2ioiorsetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        xm2ioiorsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        xm2ioiorsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        xm2ioiorsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        xm2ioiorsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        xm2ioiorsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        xm2ioiorsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        xm2ioiorsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        xm2ioiorsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        xm2ioiorsetting.setting.set.Io.Title = jis2chr(settingObj.Io_Current.Title);
        xm2ioiorsetting.setting.set.Io.Point = settingObj.Io_Current.Point;
        xm2ioiorsetting.setting.set.Io.Graph[0] = settingObj.Io_Current.Graph[0];
        xm2ioiorsetting.setting.set.Io.Graph[1] = settingObj.Io_Current.Graph[1];
        xm2ioiorsetting.setting.set.Io.Alarm[0] = settingObj.Io_Current.Alarm[0];
        xm2ioiorsetting.setting.set.Io.Alarm[1] = settingObj.Io_Current.Alarm[1];
        xm2ioiorsetting.setting.set.Io.AlarmE[0] = settingObj.Io_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.Io.AlarmE[1] = settingObj.Io_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.Ior.Title = jis2chr(settingObj.Ior_Current.Title);
        xm2ioiorsetting.setting.set.Ior.Point = settingObj.Ior_Current.Point;
        xm2ioiorsetting.setting.set.Ior.Graph[0] = settingObj.Ior_Current.Graph[0];
        xm2ioiorsetting.setting.set.Ior.Graph[1] = settingObj.Ior_Current.Graph[1];
        xm2ioiorsetting.setting.set.Ior.Alarm[0] = settingObj.Ior_Current.Alarm[0];
        xm2ioiorsetting.setting.set.Ior.Alarm[1] = settingObj.Ior_Current.Alarm[1];
        xm2ioiorsetting.setting.set.Ior.AlarmE[0] = settingObj.Ior_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.Ior.AlarmE[1] = settingObj.Ior_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.IoMAX.Title = jis2chr(settingObj.IoMAX_Current.Title);
        xm2ioiorsetting.setting.set.IoMAX.Point = settingObj.IoMAX_Current.Point;
        xm2ioiorsetting.setting.set.IoMAX.Graph[0] = settingObj.IoMAX_Current.Graph[0];
        xm2ioiorsetting.setting.set.IoMAX.Graph[1] = settingObj.IoMAX_Current.Graph[1];
        xm2ioiorsetting.setting.set.IoMAX.Alarm[0] = settingObj.IoMAX_Current.Alarm[0];
        xm2ioiorsetting.setting.set.IoMAX.Alarm[1] = settingObj.IoMAX_Current.Alarm[1];
        xm2ioiorsetting.setting.set.IoMAX.AlarmE[0] = settingObj.IoMAX_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.IoMAX.AlarmE[1] = settingObj.IoMAX_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.IorMAX.Title = jis2chr(settingObj.IorMAX_Current.Title);
        xm2ioiorsetting.setting.set.IorMAX.Point = settingObj.IorMAX_Current.Point;
        xm2ioiorsetting.setting.set.IorMAX.Graph[0] = settingObj.IorMAX_Current.Graph[0];
        xm2ioiorsetting.setting.set.IorMAX.Graph[1] = settingObj.IorMAX_Current.Graph[1];
        xm2ioiorsetting.setting.set.IorMAX.Alarm[0] = settingObj.IorMAX_Current.Alarm[0];
        xm2ioiorsetting.setting.set.IorMAX.Alarm[1] = settingObj.IorMAX_Current.Alarm[1];
        xm2ioiorsetting.setting.set.IorMAX.AlarmE[0] = settingObj.IorMAX_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.IorMAX.AlarmE[1] = settingObj.IorMAX_Current.AlarmE[1];

        $('#' + tvid + "AR_Current_Title").text(xm2ioiorsetting.setting.set.AR.Title);
        $('#' + tvid + "AS_Current_Title").text(xm2ioiorsetting.setting.set.AS.Title);
        $('#' + tvid + "AT_Current_Title").text(xm2ioiorsetting.setting.set.AT.Title);
        $('#' + tvid + "VRS_Voltage_Title").text(xm2ioiorsetting.setting.set.VRS.Title);
        $('#' + tvid + "VST_Voltage_Title").text(xm2ioiorsetting.setting.set.VST.Title);
        $('#' + tvid + "VTR_Voltage_Title").text(xm2ioiorsetting.setting.set.VTR.Title);
        $('#' + tvid + "W_Power_Title").text(xm2ioiorsetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(xm2ioiorsetting.setting.set.Wh.Title);
        $('#' + tvid + "Io_Current_Title").text(xm2ioiorsetting.setting.set.Io.Title);
        $('#' + tvid + "Ior_Current_Title").text(xm2ioiorsetting.setting.set.Ior.Title);
        $('#' + tvid + "IoMAX_Current_Title").text(xm2ioiorsetting.setting.set.IoMAX.Title);
        $('#' + tvid + "IorMAX_Current_Title").text(xm2ioiorsetting.setting.set.IorMAX.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(xm2ioiorsetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (xm2ioiorsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXm23p3w_Io_Ior(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXm23p3w_Io_Ior(tvid, realtimeObj);
        }

    }
    else {
        if (xm2ioiorsetting.setting !== null) {
            $('#' + tvid + "AR_Current_Title").text(xm2ioiorsetting.setting.set.AR.Title);
            $('#' + tvid + "AS_Current_Title").text(xm2ioiorsetting.setting.set.AS.Title);
            $('#' + tvid + "AT_Current_Title").text(xm2ioiorsetting.setting.set.AT.Title);
            $('#' + tvid + "VRS_Voltage_Title").text(xm2ioiorsetting.setting.set.VRS.Title);
            $('#' + tvid + "VST_Voltage_Title").text(xm2ioiorsetting.setting.set.VST.Title);
            $('#' + tvid + "VTR_Voltage_Title").text(xm2ioiorsetting.setting.set.VTR.Title);
            $('#' + tvid + "W_Power_Title").text(xm2ioiorsetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(xm2ioiorsetting.setting.set.Wh.Title);
            $('#' + tvid + "Io_Current_Title").text(xm2ioiorsetting.setting.set.Io.Title);
            $('#' + tvid + "Ior_Current_Title").text(xm2ioiorsetting.setting.set.Ior.Title);
            $('#' + tvid + "IoMAX_Current_Title").text(xm2ioiorsetting.setting.set.IoMAX.Title);
            $('#' + tvid + "IorMAX_Current_Title").text(xm2ioiorsetting.setting.set.IorMAX.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (xm2ioiorsetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXm23p3w_Io_Ior(tvid, retobj);

            return;
        }

        rs485_insread_data(unitNo, function (obj, xm2ioiorsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            // 瞬時値を表示する
            fncLoadRealtimeDataXm23p3w_Io_Ior(tvid, obj.Respons);

        }, xm2ioiorsetting);
    }
}


/* XM2 1P3Wダイナミク瞬時データ表示作成 */
function fncXM21P3W_Io_Ior_InstValDsnMake(tvid, title) {
    var rtnval;

    rtnval = '<div class="card-body my-0 mx-0 pl-5 pr-0 pb-3 pt-0 border-0"> \
        <div class="card-header d-flex d-inline-flex justify-content-between justify-content-sm-between flex-sm-row flex-column w-100 pr-3 text-white bg-secondary"> \
            <h4 id="idxm2ioiortitle" class="h5 m-0 ">xm2ioiortitlestring \
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
                            <td id="W_Power_Title" class="text-center table-active font-weight-bold">電力</td> \
                            <td id="W_Power" colspan="2" class="text-right">--</td> \
                            <td id="Wh_Energy_Title" class="text-center table-active font-weight-bold">電力量</td> \
                            <td id="Wh_Energy" colspan="2" class="text-right">--</td> \
                        </tr> \
                        <tr> \
                            <td id="Io_Current_Title" class="text-center table-active font-weight-bold">Io</td> \
                            <td id="Io_Current" colspan="2" class="text-right">--</td> \
                            <td id="IoMAX_Current_Title" class="text-center table-active font-weight-bold">IoMAX</td> \
                            <td id="IoMAX_Current" colspan="2" class="text-right">--</td> \
                            <td id="Ior_Current_Title" class="text-center table-active font-weight-bold">Ior</td> \
                            <td id="Ior_Current" colspan="2" class="text-right">--</td> \
                            <td id="IorMAX_Current_Title" class="text-center table-active font-weight-bold">IorMAX</td> \
                            <td id="IorMAX_Current" colspan="2" class="text-right">--</td> \
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
    rtnval = rtnval.replace(/W_Power/g, tvid + "W_Power");
    rtnval = rtnval.replace(/Wh_Energy/g, tvid + "Wh_Energy");
    rtnval = rtnval.replace(/Io_Current/g, tvid + "Io_Current");
    rtnval = rtnval.replace(/Ior_Current/g, tvid + "Ior_Current");
    rtnval = rtnval.replace(/IoMAX_Current/g, tvid + "IoMAX_Current");
    rtnval = rtnval.replace(/IorMAX_Current/g, tvid + "IorMAX_Current");
    rtnval = rtnval.replace(/updated_time/g, tvid + "updated_time");

    rtnval = rtnval.replace(/xm2ioiortitlestring/g, title);
    return rtnval;
}

/**
 * 全てユニットの瞬時値テーブルでは瞬時値をロードする
 * hlrsetting: ユニットの設定値
 * tvid: ユニットのTemplate ID
 * realtimeObj：瞬時値のJsonData
 * errorFlg: 表示データがない、通信異常の場合→True
 */
function fncLoadRealtimeDataXm21p3w_Io_Ior(tvid, realtimeObj) {

    // 通信異常と設定値が無し場合
    if ((realtimeObj == null) || (realtimeObj.Data == null)) {
        $('#' + tvid + "A1_Current").text("--");
        $('#' + tvid + "AN_Current").text("--");
        $('#' + tvid + "A2_Current").text("--");
        $('#' + tvid + "V1N_Voltage").text("--");
        $('#' + tvid + "V2N_Voltage").text("--");
        $('#' + tvid + "V12_Voltage").text("--");
        $('#' + tvid + "W_Power").text("--");
        $('#' + tvid + "Wh_Energy").text("--");
        $('#' + tvid + "Io_Current").text("--");
        $('#' + tvid + "Ior_Current").text("--");
        $('#' + tvid + "IoMAX_Current").text("--");
        $('#' + tvid + "IorMAX_Current").text("--");
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
        $('#' + tvid + "W_Power").text(realtimeObj.Data.W_Power.Value + " [kW]");
        $('#' + tvid + "Wh_Energy").text(realtimeObj.Data.Wh_Energy.Value + " [kWh]");
        $('#' + tvid + "Io_Current").text(realtimeObj.Data.Io_Current.Value + " [mA]");
        $('#' + tvid + "Ior_Current").text(realtimeObj.Data.Ior_Current.Value + " [mA]");
        $('#' + tvid + "IoMAX_Current").text(realtimeObj.Data.IoMAX_Current.Value + " [mA]");
        $('#' + tvid + "IorMAX_Current").text(realtimeObj.Data.IorMAX_Current.Value + " [mA]");
    }

}

function fncXM21P3W_Io_Ior_DspData(tvid, unitNo, isUnitChg, xm2ioiorsetting, unitSts, settingObj, realtimeObj) {
    if (isUnitChg == true) {
        var xm2ioior_set_tmp = {
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
            Io: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            Ior: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            IoMAX: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
            IorMAX: {
                "Title": "",
                "Point": 1,
                "Graph": [0, 0],
                "Alarm": [0, 0],
                "AlarmE": [0, 0]
            },
        };

        xm2ioiorsetting.setting = { "set": xm2ioior_set_tmp };

        xm2ioiorsetting.setting.set.AR.Title = jis2chr(settingObj.A1_Current.Title);
        xm2ioiorsetting.setting.set.AR.Point = settingObj.A1_Current.Point;
        xm2ioiorsetting.setting.set.AR.Graph[0] = settingObj.A1_Current.Graph[0];
        xm2ioiorsetting.setting.set.AR.Graph[1] = settingObj.A1_Current.Graph[1];
        xm2ioiorsetting.setting.set.AR.Alarm[0] = settingObj.A1_Current.Alarm[0];
        xm2ioiorsetting.setting.set.AR.Alarm[1] = settingObj.A1_Current.Alarm[1];
        xm2ioiorsetting.setting.set.AR.AlarmE[0] = settingObj.A1_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.AR.AlarmE[1] = settingObj.A1_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.AS.Title = jis2chr(settingObj.AN_Current.Title);
        xm2ioiorsetting.setting.set.AS.Point = settingObj.AN_Current.Point;
        xm2ioiorsetting.setting.set.AS.Graph[0] = settingObj.AN_Current.Graph[0];
        xm2ioiorsetting.setting.set.AS.Graph[1] = settingObj.AN_Current.Graph[1];
        xm2ioiorsetting.setting.set.AS.Alarm[0] = settingObj.AN_Current.Alarm[0];
        xm2ioiorsetting.setting.set.AS.Alarm[1] = settingObj.AN_Current.Alarm[1];
        xm2ioiorsetting.setting.set.AS.AlarmE[0] = settingObj.AN_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.AS.AlarmE[1] = settingObj.AN_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.AT.Title = jis2chr(settingObj.A2_Current.Title);
        xm2ioiorsetting.setting.set.AT.Point = settingObj.A2_Current.Point;
        xm2ioiorsetting.setting.set.AT.Graph[0] = settingObj.A2_Current.Graph[0];
        xm2ioiorsetting.setting.set.AT.Graph[1] = settingObj.A2_Current.Graph[1];
        xm2ioiorsetting.setting.set.AT.Alarm[0] = settingObj.A2_Current.Alarm[0];
        xm2ioiorsetting.setting.set.AT.Alarm[1] = settingObj.A2_Current.Alarm[1];
        xm2ioiorsetting.setting.set.AT.AlarmE[0] = settingObj.A2_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.AT.AlarmE[1] = settingObj.A2_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.VRS.Title = jis2chr(settingObj.V1N_Voltage.Title);
        xm2ioiorsetting.setting.set.VRS.Point = settingObj.V1N_Voltage.Point;
        xm2ioiorsetting.setting.set.VRS.Graph[0] = settingObj.V1N_Voltage.Graph[0];
        xm2ioiorsetting.setting.set.VRS.Graph[1] = settingObj.V1N_Voltage.Graph[1];
        xm2ioiorsetting.setting.set.VRS.Alarm[0] = settingObj.V1N_Voltage.Alarm[0];
        xm2ioiorsetting.setting.set.VRS.Alarm[1] = settingObj.V1N_Voltage.Alarm[1];
        xm2ioiorsetting.setting.set.VRS.AlarmE[0] = settingObj.V1N_Voltage.AlarmE[0];
        xm2ioiorsetting.setting.set.VRS.AlarmE[1] = settingObj.V1N_Voltage.AlarmE[1];

        xm2ioiorsetting.setting.set.VST.Title = jis2chr(settingObj.V2N_Voltage.Title);
        xm2ioiorsetting.setting.set.VST.Point = settingObj.V2N_Voltage.Point;
        xm2ioiorsetting.setting.set.VST.Graph[0] = settingObj.V2N_Voltage.Graph[0];
        xm2ioiorsetting.setting.set.VST.Graph[1] = settingObj.V2N_Voltage.Graph[1];
        xm2ioiorsetting.setting.set.VST.Alarm[0] = settingObj.V2N_Voltage.Alarm[0];
        xm2ioiorsetting.setting.set.VST.Alarm[1] = settingObj.V2N_Voltage.Alarm[1];
        xm2ioiorsetting.setting.set.VST.AlarmE[0] = settingObj.V2N_Voltage.AlarmE[0];
        xm2ioiorsetting.setting.set.VST.AlarmE[1] = settingObj.V2N_Voltage.AlarmE[1];

        xm2ioiorsetting.setting.set.VTR.Title = jis2chr(settingObj.V12_Voltage.Title);
        xm2ioiorsetting.setting.set.VTR.Point = settingObj.V12_Voltage.Point;
        xm2ioiorsetting.setting.set.VTR.Graph[0] = settingObj.V12_Voltage.Graph[0];
        xm2ioiorsetting.setting.set.VTR.Graph[1] = settingObj.V12_Voltage.Graph[1];
        xm2ioiorsetting.setting.set.VTR.Alarm[0] = settingObj.V12_Voltage.Alarm[0];
        xm2ioiorsetting.setting.set.VTR.Alarm[1] = settingObj.V12_Voltage.Alarm[1];
        xm2ioiorsetting.setting.set.VTR.AlarmE[0] = settingObj.V12_Voltage.AlarmE[0];
        xm2ioiorsetting.setting.set.VTR.AlarmE[1] = settingObj.V12_Voltage.AlarmE[1];


        xm2ioiorsetting.setting.set.W.Title = jis2chr(settingObj.W_Power.Title);
        xm2ioiorsetting.setting.set.W.Point = settingObj.W_Power.Point;
        xm2ioiorsetting.setting.set.W.Graph[0] = settingObj.W_Power.Graph[0];
        xm2ioiorsetting.setting.set.W.Graph[1] = settingObj.W_Power.Graph[1];
        xm2ioiorsetting.setting.set.W.Alarm[0] = settingObj.W_Power.Alarm[0];
        xm2ioiorsetting.setting.set.W.Alarm[1] = settingObj.W_Power.Alarm[1];
        xm2ioiorsetting.setting.set.W.AlarmE[0] = settingObj.W_Power.AlarmE[0];
        xm2ioiorsetting.setting.set.W.AlarmE[1] = settingObj.W_Power.AlarmE[1];

        xm2ioiorsetting.setting.set.Wh.Title = jis2chr(settingObj.Wh_Energy.Title);
        xm2ioiorsetting.setting.set.Wh.Point = settingObj.Wh_Energy.Point;
        xm2ioiorsetting.setting.set.Wh.Graph[0] = settingObj.Wh_Energy.Graph[0];
        xm2ioiorsetting.setting.set.Wh.Graph[1] = settingObj.Wh_Energy.Graph[1];
        xm2ioiorsetting.setting.set.Wh.Alarm[0] = settingObj.Wh_Energy.Alarm[0];
        xm2ioiorsetting.setting.set.Wh.Alarm[1] = settingObj.Wh_Energy.Alarm[1];
        xm2ioiorsetting.setting.set.Wh.AlarmE[0] = settingObj.Wh_Energy.AlarmE[0];
        xm2ioiorsetting.setting.set.Wh.AlarmE[1] = settingObj.Wh_Energy.AlarmE[1];

        xm2ioiorsetting.setting.set.Io.Title = jis2chr(settingObj.Io_Current.Title);
        xm2ioiorsetting.setting.set.Io.Point = settingObj.Io_Current.Point;
        xm2ioiorsetting.setting.set.Io.Graph[0] = settingObj.Io_Current.Graph[0];
        xm2ioiorsetting.setting.set.Io.Graph[1] = settingObj.Io_Current.Graph[1];
        xm2ioiorsetting.setting.set.Io.Alarm[0] = settingObj.Io_Current.Alarm[0];
        xm2ioiorsetting.setting.set.Io.Alarm[1] = settingObj.Io_Current.Alarm[1];
        xm2ioiorsetting.setting.set.Io.AlarmE[0] = settingObj.Io_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.Io.AlarmE[1] = settingObj.Io_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.Ior.Title = jis2chr(settingObj.Ior_Current.Title);
        xm2ioiorsetting.setting.set.Ior.Point = settingObj.Ior_Current.Point;
        xm2ioiorsetting.setting.set.Ior.Graph[0] = settingObj.Ior_Current.Graph[0];
        xm2ioiorsetting.setting.set.Ior.Graph[1] = settingObj.Ior_Current.Graph[1];
        xm2ioiorsetting.setting.set.Ior.Alarm[0] = settingObj.Ior_Current.Alarm[0];
        xm2ioiorsetting.setting.set.Ior.Alarm[1] = settingObj.Ior_Current.Alarm[1];
        xm2ioiorsetting.setting.set.Ior.AlarmE[0] = settingObj.Ior_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.Ior.AlarmE[1] = settingObj.Ior_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.IoMAX.Title = jis2chr(settingObj.IoMAX_Current.Title);
        xm2ioiorsetting.setting.set.IoMAX.Point = settingObj.IoMAX_Current.Point;
        xm2ioiorsetting.setting.set.IoMAX.Graph[0] = settingObj.IoMAX_Current.Graph[0];
        xm2ioiorsetting.setting.set.IoMAX.Graph[1] = settingObj.IoMAX_Current.Graph[1];
        xm2ioiorsetting.setting.set.IoMAX.Alarm[0] = settingObj.IoMAX_Current.Alarm[0];
        xm2ioiorsetting.setting.set.IoMAX.Alarm[1] = settingObj.IoMAX_Current.Alarm[1];
        xm2ioiorsetting.setting.set.IoMAX.AlarmE[0] = settingObj.IoMAX_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.IoMAX.AlarmE[1] = settingObj.IoMAX_Current.AlarmE[1];

        xm2ioiorsetting.setting.set.IorMAX.Title = jis2chr(settingObj.IorMAX_Current.Title);
        xm2ioiorsetting.setting.set.IorMAX.Point = settingObj.IorMAX_Current.Point;
        xm2ioiorsetting.setting.set.IorMAX.Graph[0] = settingObj.IorMAX_Current.Graph[0];
        xm2ioiorsetting.setting.set.IorMAX.Graph[1] = settingObj.IorMAX_Current.Graph[1];
        xm2ioiorsetting.setting.set.IorMAX.Alarm[0] = settingObj.IorMAX_Current.Alarm[0];
        xm2ioiorsetting.setting.set.IorMAX.Alarm[1] = settingObj.IorMAX_Current.Alarm[1];
        xm2ioiorsetting.setting.set.IorMAX.AlarmE[0] = settingObj.IorMAX_Current.AlarmE[0];
        xm2ioiorsetting.setting.set.IorMAX.AlarmE[1] = settingObj.IorMAX_Current.AlarmE[1];

        $('#' + tvid + "A1_Current_Title").text(xm2ioiorsetting.setting.set.AR.Title);
        $('#' + tvid + "AN_Current_Title").text(xm2ioiorsetting.setting.set.AS.Title);
        $('#' + tvid + "A2_Current_Title").text(xm2ioiorsetting.setting.set.AT.Title);
        $('#' + tvid + "V1N_Voltage_Title").text(xm2ioiorsetting.setting.set.VRS.Title);
        $('#' + tvid + "V2N_Voltage_Title").text(xm2ioiorsetting.setting.set.VST.Title);
        $('#' + tvid + "V12_Voltage_Title").text(xm2ioiorsetting.setting.set.VTR.Title);
        $('#' + tvid + "W_Power_Title").text(xm2ioiorsetting.setting.set.W.Title);
        $('#' + tvid + "Wh_Energy_Title").text(xm2ioiorsetting.setting.set.Wh.Title);
        $('#' + tvid + "Io_Current_Title").text(xm2ioiorsetting.setting.set.Io.Title);
        $('#' + tvid + "Ior_Current_Title").text(xm2ioiorsetting.setting.set.Ior.Title);
        $('#' + tvid + "IoMAX_Current_Title").text(xm2ioiorsetting.setting.set.IoMAX.Title);
        $('#' + tvid + "IorMAX_Current_Title").text(xm2ioiorsetting.setting.set.IorMAX.Title);

        //  複合グラフ表示のように設定値をバックアップする
        fncProcessSetting(xm2ioiorsetting.type, settingObj, unitNo);

        // 最初、瞬時値を表示する
        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (xm2ioiorsetting.setting == null) || (realtimeObj == null) || (realtimeObj.Data == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXm21p3w_Io_Ior(tvid, retobj);
        }
        else {
            var tmpObj = new Object;
            tmpObj["Status"] = 200;
            tmpObj["Respons"] = realtimeObj;
            fncSaveInstanceforCombiGraph(tmpObj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXm21p3w_Io_Ior(tvid, realtimeObj);
        }

    }
    else {
        if (xm2ioiorsetting.setting != null) {
            $('#' + tvid + "A1_Current_Title").text(xm2ioiorsetting.setting.set.AR.Title);
            $('#' + tvid + "AN_Current_Title").text(xm2ioiorsetting.setting.set.AS.Title);
            $('#' + tvid + "A2_Current_Title").text(xm2ioiorsetting.setting.set.AT.Title);
            $('#' + tvid + "V1N_Voltage_Title").text(xm2ioiorsetting.setting.set.VRS.Title);
            $('#' + tvid + "V2N_Voltage_Title").text(xm2ioiorsetting.setting.set.VST.Title);
            $('#' + tvid + "V12_Voltage_Title").text(xm2ioiorsetting.setting.set.VTR.Title);
            $('#' + tvid + "W_Power_Title").text(xm2ioiorsetting.setting.set.W.Title);
            $('#' + tvid + "Wh_Energy_Title").text(xm2ioiorsetting.setting.set.Wh.Title);
            $('#' + tvid + "Io_Current_Title").text(xm2ioiorsetting.setting.set.Io.Title);
            $('#' + tvid + "Ior_Current_Title").text(xm2ioiorsetting.setting.set.Ior.Title);
            $('#' + tvid + "IoMAX_Current_Title").text(xm2ioiorsetting.setting.set.IoMAX.Title);
            $('#' + tvid + "IorMAX_Current_Title").text(xm2ioiorsetting.setting.set.IorMAX.Title);
        }

        if ((unitSts == UnitSts.STS_COMM_ERR) || (unitSts == null) || (xm2ioiorsetting.setting == null)) {
            var retobj = null;
            fncSaveInstanceforCombiGraph(retobj, unitNo, gintIotGatewayId);
            // 瞬時値を表示する
            fncLoadRealtimeDataXm21p3w_Io_Ior(tvid, retobj);
            return;
        }

        rs485_insread_data(unitNo, function (obj, xm2ioiorsetting) {
            if (gActivedType == ActiveType.Atv_AllGroup) {
                // Save Instance Data for Combine Graph
                fncSaveInstanceforCombiGraph(obj, unitNo, gintIotGatewayId);
            }

            fncLoadRealtimeDataXm21p3w_Io_Ior(tvid, obj.Respons);
        }, xm2ioiorsetting);
    }
}

// XM2設定画面を表示
function dispXm2_Io_Ior() {
    document.getElementById("rstype_xm2ioior").value =
        MODBUS_UNIT_TYPE[setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTypeCode];
    document.getElementById('rsname_xm2ioior').value =
        jis2chr(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitTitleCode);
    document.getElementById('rsadr_xm2ioior').selectedIndex =
        parseInt(setTreeViewJson.Respons
            .GroupList[gcurgrp]
            .LoRaUnitList[gcurunit]
            .ModbusUnitList[gcurrs].UnitAdr, 16) - 1;
}
