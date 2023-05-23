/*version=1.01*/


/*  機能：  力率グラフを描画
                    "pwchartjs.js"ライブラリを使用して、グラフを描画
            引数：
                    ctx：       canvas 2d content オブジェクト
                    data_x：    時間
                    data_y：    計測値
                    data_num：  データ数
                    setting：DIの設定値
            戻り値： グラフオブジェクト
        */
function pw_draw_graph_line(ctx, data_x, data_y, data_num, setting) {
    var data_y_time = [];
    var min, max;
    var tmpLineType;

    // Draw Point without Lines
    tmpLineType = (gShowLineFlg == false ? 3 : 0);

    min = gGraphStartTime;
    max = moment(min, "YYYY-MM-DD HH:mm").add(gGraphPeriod, 'minutes');

    for (i = 0; i < data_num; i++) {
        data_y_time[i] = { x: moment(data_x[i], "YYYY-MM-DD HH:mm:ss"), y: data_y[i] };
    }

    var myChart = new PowerFactorChart(ctx,
        {
            //canvas: myCanvas,
            paddingLeft: 66,
            paddingBot: 50,
            paddingTop: 5,
            padding: 20,
            gridScale: 6,
            gridColor: "#666",
            linetype: tmpLineType,
            data: null,
            databytime: data_y_time,
            Point: setting.Point,
            pointRadius: 1.5,
            pointHitRadius: 3,
            pointHoverBorderWidth: 2,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2,
            dots: null,
            showLine: gShowLineFlg,
            min: min,
            max: max,
            stepSize: grpXAxisPeriod,    // Step size in minutes
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                borderColor: 'rgba(0, 0, 0, 1)',
                TitleColor: 'rgba(255, 255, 255, 1)',
                titleFontSize: 11,
                titleAlign: 'left',
                bodyFontColor: 'white',
                bodyFontSize: 12,
                xPadding: 4,
                yPadding: 4
            }
        }
    );
    myChart.draw();

    return myChart;
}


/*  機能：  力率グラフを再描画
            "pwchartjs.js"ライブラリを使用して、グラフを描画
    引数：
            ctx：       canvas 2d content オブジェクト
            data_x：    時間
            data_y：    計測値
            data_num：  データ数
            setting：DIの設定値
    戻り値： グラフオブジェクト
*/
function pw_update_graph_line(myChart, data_x, data_y, data_num, setting) {
    var data_y_time = [];
    var min, max;

    min = gGraphStartTime;
    max = moment(min, "YYYY-MM-DD HH:mm").add(gGraphPeriod, 'minutes');

    for (i = 0; i < data_num; i++) {
        data_y_time[i] = { x: moment(data_x[i], "YYYY-MM-DD HH:mm:ss"), y: data_y[i] };
    }

    myChart.options.databytime = data_y_time;
    myChart.options.max = max;
    myChart.options.min = min;
    myChart.options.stepSize = grpXAxisPeriod;
    myChart.options.linetype = (gShowLineFlg == false ? 3 : 0);
    myChart.draw();
}



/**
* 力率グラフ描画スクリプト
*/

/*　機能：
*/
function drawLine(ctx, startX, startY, endX, endY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(upperLeftCornerX + (width * 0.05), upperLeftCornerY, width * 0.9, height);
    //ctx.fillRect(upperLeftCornerX + (width * 0),upperLeftCornerY,width,height);
    ctx.restore();
}

function drawCurve(myctx, points, tension, borderColor, pointRadius, borderWidth, index, linetype) {
    myctx.save();
    myctx.fillStyle = 'red';
    myctx.strokeStyle = borderColor;
    myctx.lineWidth = borderWidth;

    var twowayArray = [];

    var itwasNull = true;
    var childIdx = 0;
    var arrIdx = 0;
    var childArray = new Array(0);
    for (var iCnt = 0; iCnt < points.length; iCnt++) {

        if ((itwasNull == true) && (points[iCnt].y !== null)) {
            itwasNull = false;
            childIdx = 0;
            //childArray.length = 0;
            childArray = new Array(0);
            childArray[childIdx] = points[iCnt];
            childIdx++;
        }
        else if ((itwasNull == false) && (points[iCnt].y !== null)) {
            childArray[childIdx] = points[iCnt];
            childIdx++;
        }
        else if ((itwasNull == false) && (points[iCnt].y == null)) {
            twowayArray[arrIdx] = childArray;
            arrIdx++;
            itwasNull = true;
        }
    }

    if (childArray.length !== 0) {
        twowayArray[arrIdx] = childArray;
    }

    //console.log("IMP>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    //console.log(twowayArray);

    for (var iMainArray = 0; iMainArray < twowayArray.length; iMainArray++) {
        var subArray = twowayArray[iMainArray];

        myctx.beginPath();
        myctx.moveTo(subArray[0].x, subArray[0].y);

        var t = (tension != null) ? tension : 1;
        var i;
        if (linetype == 1) {
            for (i = 0; i < subArray.length - 1; i++) {
                var p0 = (i > 0) ? subArray[i - 1] : subArray[0];
                var p1 = subArray[i];
                var p2 = subArray[i + 1];
                var p3 = ((i != subArray.length - 2) && (subArray[i + 2].y !== null)) ? subArray[i + 2] : p2;

                var cp1x = p1.x + (p2.x - p0.x) / 6 * t;
                var cp1y = p1.y + (p2.y - p0.y) / 6 * t;

                var cp2x = p2.x - (p3.x - p1.x) / 6 * t;
                var cp2y = p2.y - (p3.y - p1.y) / 6 * t;

                myctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
            }
        }
        else if (linetype == 0) {
            for (i = 0; i < subArray.length; i++) {
                var pnext = subArray[i];
                myctx.lineTo(pnext.x, pnext.y);
                myctx.stroke();
                myctx.beginPath();
                myctx.moveTo(pnext.x, pnext.y);
            }
        }

        myctx.stroke();
    }


    /*
    myctx.beginPath();
    myctx.moveTo(points[0].x, points[0].y);

    var t = (tension != null) ? tension : 1;
    for (var i = 0; i < points.length - 1; i++) {
        if(points[i + 1].y == null){
            break;
        }

        var p0 = (i > 0) ? points[i - 1] : points[0];
        var p1 = points[i];
        var p2 = points[i + 1];
        var p3 = ((i != points.length - 2) && (points[i + 2].y !== null)) ? points[i + 2] : p2;

        var cp1x = p1.x + (p2.x - p0.x) / 6 * t;
        var cp1y = p1.y + (p2.y - p0.y) / 6 * t;

        var cp2x = p2.x - (p3.x - p1.x) / 6 * t;
        var cp2y = p2.y - (p3.y - p1.y) / 6 * t;

        myctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
    }

    myctx.stroke();
    */

    for (var i = 0; i < points.length; i++) {
        var p = points[i];

        if (p.y != null) {
            myctx.beginPath();
            if (i !== index) {
                myctx.arc(p.x, p.y, pointRadius, 0 * Math.PI, 2 * Math.PI);
            }
            else {
                myctx.arc(p.x, p.y, pointRadius * 2, 0 * Math.PI, 2 * Math.PI);
            }
            myctx.stroke();
        }
    }

    myctx.restore();

}

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var devicePixelRatio = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    canvas.width = Math.round(devicePixelRatio * rect.right) - Math.round(devicePixelRatio * rect.left);
    canvas.height = Math.round(devicePixelRatio * rect.bottom) - Math.round(devicePixelRatio * rect.top);

    console.log(devicePixelRatio);
    var ctx = canvas.getContext('2d');
    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.
    ctx.scale(devicePixelRatio, devicePixelRatio);
}


function handleResize(thectx) {
    try {
        var me = thectx;

        setupCanvas(me.ctx.canvas);

        me.ctx.canvas.width = $(me.ctx.canvas).parent().outerWidth();
        me.ctx.canvas.height = $(me.ctx.canvas).parent().outerHeight();

        me.offsetX = $(me.ctx.canvas).offset().left;
        me.offsetY = $(me.ctx.canvas).offset().top;

        me.draw();
    } catch (error) {
        //console.log(error);
    }
}

var PowerFactorChart = function (context, options) {
    this.options = options;
    this.ctx = context;
    this.colors = options.colors;
    this.index = -1;
    this.max = options.max;
    this.min = options.min;
    this._view = null;
    this.offsetX = 0;
    this.offsetY = 0;
    this.dots = [];

    var handleResizeEvent = function () {
        var me = this;
        handleResize(me.ctx);
    };

    this.Init = function () {
        var me = this;

        me.ctx.canvas.width = $(me.ctx.canvas).parent().outerWidth();
        me.ctx.canvas.height = $(me.ctx.canvas).parent().outerHeight();

        me.offsetX = $(me.ctx.canvas).offset().left;
        me.offsetY = $(me.ctx.canvas).offset().top;

        handleResize(this);
        window.addEventListener("resize", function () { handleResize(me); });
        //window.addEventListener("resize", handleResizeEvent);
        //$(this.ctx.canvas).parent().resize(function () { handleResize(me); });

        $(this.ctx.canvas).parent().mousemove(function (e) { me.handleMouseMove(e); });
    };

    this.Init();

    this.destroy = function () {
        var me = this;
        if (me.options) {
            me.options.databytime = null;
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.restore();
            //window.removeEventListener("resize", handleResizeEvent);

            $(this.ctx.canvas).parent().unbind('mousemove');
        }
    };

    this.draw = function () {
        var dfFontSize = 10;
        var dfFontStyle = 'normal';
        var dfFontFamily = "sans-serif";
        var dfFontColor = '#0';
        this.colors = options.colors;
        this.max = options.max;
        this.min = options.min;
        var me = this;

        me.offsetX = $(me.ctx.canvas).offset().left;
        me.offsetY = $(me.ctx.canvas).offset().top;
        var canvasActualHeight = this.ctx.canvas.height - this.options.paddingTop - this.options.paddingBot;
        var canvasActualWidth = this.ctx.canvas.width - (this.options.padding + this.options.paddingLeft);

        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.lineWidth = 0.3;
        var yGrinLineNo;
        var yAxislabel;
        var zero = "000000000000";
        if (canvasActualHeight > 200) {
            yAxislabel = ['  75','  80', '  85', '  90','  95', '±100', ' -95',' -90',' -85', ' -80', ' -75'];
            yGrinLineNo = 10;
        }
        else {
            yAxislabel = ['  75', '±100', ' -75'];
            yGrinLineNo = 2;
        }
        /* Y縦を描画 */
        for (var iCnt = 0; iCnt <= yGrinLineNo; iCnt++) {
            var gridY = Math.round(canvasActualHeight * (iCnt / (yGrinLineNo)) + this.options.paddingTop);
            //writing grid markers
            this.ctx.save();
            //this.ctx.fillStyle = this.options.gridColor;
            //this.ctx.font = "12px Gothic-UI normal";
            this.ctx.fillStyle = dfFontColor;
            this.ctx.font = this.fontString(dfFontSize, dfFontStyle, dfFontFamily);
            this.ctx.textAlign = 'right';
            if ((iCnt == (yGrinLineNo / 2)) || (iCnt == (yGrinLineNo))|| iCnt == 0) {
                this.ctx.strokeWidth = 0.5;
                this.ctx.lineWidth = 0.5;
            }
            else {
                this.ctx.strokeWidth = 0.3;
                this.ctx.lineWidth = 0.3
            }

            drawLine(
                this.ctx,
                this.options.paddingLeft - 8,
                gridY,
                this.ctx.canvas.width - this.options.padding,
                gridY,
                this.options.gridColor
            );

            this.ctx.fillText((this.options.Point == 0) ? yAxislabel[iCnt] : (yAxislabel[iCnt] + "." + zero.slice(-this.options.Point)), this.options.paddingLeft - 10, gridY + 4);
            this.ctx.restore();
        }

        // Drawing the x gird lines
        var d = parseInt(this.max.diff(this.min) / 60000);
        var xAxisElement;
        var xAxisEgment;
        if (typeof (this.options.stepSize) == "undefined") {
            if (d <= 60) {
                if ((d % 6) == 0) {
                    xAxisElement = 6;
                }
                else if ((d % 5) == 0) {
                    xAxisElement = 5;
                }
                else if (d % 4) {
                    xAxisElement = 4;
                }
                else if (d % 3) {
                    xAxisElement = 3;
                }
                else if (d % 2) {
                    xAxisElement = 2;
                }
                else {
                    xAxisElement = 1;
                }
                xAxisEgment = d / xAxisElement;
            }
            else {
                var hour = d / 60;
                var modhour = d % 60;

                if (hour <= 2) {
                    xAxisEgment = 30;
                    xAxisElement = d / 30;
                }
                else if (hour <= 4) {
                    xAxisEgment = 30;
                    xAxisElement = d / 30;
                }
                else if (hour <= 6) {
                    xAxisEgment = 60;
                    xAxisElement = d / 60;
                }
                else if (hour <= 12) {
                    xAxisEgment = 60;
                    xAxisElement = d / 60;
                }
                else if (hour <= 24) {
                    xAxisEgment = 120;
                    xAxisElement = d / 120;
                }
                else {
                    xAxisEgment = 120;
                    xAxisElement = d / 120;
                }
            }
        }
        else {
            xAxisElement = Math.floor(d / this.options.stepSize);
            xAxisEgment = d / xAxisElement;
        }

        var xAxis;
        var xLabel;
        var scaleWidth = Math.round(((xAxisEgment) / d) * canvasActualWidth);
        this.ctx.save();
        for (var iCnt = 0; iCnt < xAxisElement; iCnt++) {
            xAxis = Math.round(((xAxisEgment * iCnt) / d) * canvasActualWidth + this.options.paddingLeft);
            drawLine(
                this.ctx,
                xAxis,
                this.options.paddingTop,
                xAxis,
                this.ctx.canvas.height - (this.options.paddingBot) + 10,
                this.options.gridColor
            );

            if (iperiodtime <= 6){
                xLabel = moment(this.min, "YYYY-MM-DD HH:mm").add(xAxisEgment * iCnt, 'minutes').format('HH:mm');
            }else{
                xLabel = moment(this.min, "YYYY-MM-DD HH:mm").add(xAxisEgment * iCnt, 'minutes').format('MM/DD');
            }

            // this.ctx.fillStyle = options.fontColor;
            // this.ctx.font = this.fontString(options.fontSize,options.fontStyle, options.fontFamily);
            this.ctx.fillStyle = dfFontColor;
            this.ctx.font = this.fontString(dfFontSize, dfFontStyle, dfFontFamily);
            this.ctx.textAlign = 'center';
            var textWidth = this.ctx.measureText('00:00').width;
            if (textWidth >= scaleWidth) {
                this.ctx.save();
                this.ctx.translate(xAxis, this.ctx.canvas.height - (this.options.paddingBot) + 25);
                this.ctx.rotate(-45 / 180 * Math.PI);
                this.ctx.translate(-xAxis, -(this.ctx.canvas.height - (this.options.paddingBot) + 25));
                this.ctx.fillText(xLabel, xAxis, this.ctx.canvas.height - (this.options.paddingBot) + 25);
                this.ctx.restore();
            }
            else {
                this.ctx.fillText(xLabel, xAxis, this.ctx.canvas.height - (this.options.paddingBot) + 25);
            }
        }
        xAxis = canvasActualWidth + this.options.paddingLeft;
        drawLine(
            this.ctx,
            xAxis,
            this.options.paddingTop,
            xAxis,
            this.ctx.canvas.height - (this.options.paddingBot) + 10,
            this.options.gridColor
        );

        /* X縦を描画 */
        if (iperiodtime <= 6){
            xLabel = moment(this.max, "YYYY-MM-DD HH:mm").format('HH:mm');
        }else{
            xLabel = moment(this.max, "YYYY-MM-DD HH:mm").format('MM/DD');
        }


        this.ctx.fillStyle = dfFontColor;
        this.ctx.font = this.fontString(dfFontSize, dfFontStyle, dfFontFamily);
        this.ctx.textAlign = 'center';
        var textWidth = this.ctx.measureText('00:00').width;
        if (textWidth >= scaleWidth) {
            this.ctx.save();
            this.ctx.translate(xAxis, this.ctx.canvas.height - (this.options.paddingBot) + 25);
            this.ctx.rotate(-45 / 180 * Math.PI);
            this.ctx.translate(-xAxis, -(this.ctx.canvas.height - (this.options.paddingBot) + 25));
            this.ctx.fillText(xLabel, xAxis, this.ctx.canvas.height - (this.options.paddingBot) + 25);
            this.ctx.restore();
        }
        else {
            this.ctx.fillText(xLabel, xAxis, this.ctx.canvas.height - (this.options.paddingBot) + 25);
        }
        this.ctx.restore();

        // Draw data by time axis
        var calculatePointY = function (value, canvasActualHeight) {
            var val = null;
            if (value === null) {
            }
            else if ((value >= 75) && (value <= 100)) {
                val = Math.round((value - 75) / (50) * canvasActualHeight);
                val += options.paddingTop;
            }
            else if ((value >= -100) && (value <= -75)) {
                val = Math.round((100 - Math.abs(value)) / (50) * canvasActualHeight + (canvasActualHeight / 2));
                val += options.paddingTop;
            }

            return val;
        };

        var iIdx = 0;
        var grppoint = [];
        this.dots.length = 0;
        for (categ in this.options.databytime) {
            var point = { 'x': 0, 'y': 0, 'rXr': 10 };
            var val = this.options.databytime[categ].y;
            var deltaX;
            var dtime = (this.options.databytime[categ].x.diff(this.min) / 60000);
            deltaX = Math.round(canvasActualWidth * (dtime / d));
            point.x = this.options.paddingLeft + deltaX;
            point.y = calculatePointY(val, canvasActualHeight);

            grppoint[iIdx] = point;
            this.dots[iIdx] = point;
            iIdx++;
        }
        this.ctx.save();
        drawCurve(this.ctx, grppoint, 1, options.borderColor, options.pointRadius, options.borderWidth, this.index, this.options.linetype);
        this.ctx.restore();
    };

    this.drawToolTip = function (x, y, index, r) {
        this.index = index;
        this.draw();

        var alignment = {
            xAlign: '',
            yAlign: ''
        };

        var model = {
            _model: {
                x: x,
                y: y,
                title: this.options.databytime[index].x.format("YYYY/MM/DD HH:mm:ss"),
                titleFontColor: this.options.tooltip.TitleColor,
                titleFontSize: this.options.tooltip.titleFontSize,
                titleSpacing: 2,
                titleFontStyle: 'Boid',
                titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                bodySpacing: 2,
                bodyFontColor: this.options.tooltip.bodyFontColor,
                bodyFontSize: this.options.tooltip.bodyFontSize,
                bodyFontStyle: 'normal',
                bodyFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
                bodytitle: ((this.options.databytime[index].y !== null) ? parseFloat(this.options.databytime[index].y).toFixed(this.options.Point) : ""),
                xPadding: (this.options.tooltip.xPadding ? this.options.tooltip.xPadding : 4),
                yPadding: (this.options.tooltip.yPadding ? this.options.tooltip.yPadding : 2),
                caretSize: 6,
                caretPadding: 1,
                cornerRadius: 3,
                caretX: x,
                caretY: y
            },
            _chart: getContextChart(this.ctx),
            _options: {
                //xAlign:'left',
                //yAlign:'center'
            }
        };

        var tooltipSize = {
            width: 100,
            height: 35
        };

        tooltipSize = this.getTooltipSize(this.ctx, model._model);
        alignment = determineAlignment(model, tooltipSize);
        backgroundPoint = getBackgroundPoint(model._model, tooltipSize, alignment, model._chart);

        this._view = {
            width: tooltipSize.width,
            height: tooltipSize.height,
            x: backgroundPoint.x,
            y: backgroundPoint.y,
            title: this.options.databytime[index].x.format("YYYY/MM/DD HH:mm:ss"),
            backgroundColor: this.options.tooltip.backgroundColor,
            borderColor: this.options.tooltip.borderColor,
            borderWidth: 1,
            xAlign: alignment.xAlign,
            yAlign: alignment.yAlign,
            cornerRadius: 3,
            opacity: 1,
            _titleAlign: this.options.tooltip.titleAlign,
            titleFontColor: this.options.tooltip.TitleColor,
            titleFontSize: this.options.tooltip.titleFontSize,
            titleSpacing: 2,
            titleFontStyle: 'Boid',
            titleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            legendColorBackground: 'white',
            labelColors: {
                borderColor: this.options.borderColor,
                backgroundColor: this.options.backgroundColor,
                labelTextColors: 'rgba(255,255,255,1)',
            },
            displayColors: true,
            bodySpacing: 2,
            bodyFontColor: this.options.tooltip.bodyFontColor,
            bodyFontSize: this.options.tooltip.bodyFontSize,
            bodyFontStyle: 'normal',
            bodyFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            bodytitle: ((this.options.databytime[index].y !== null) ? parseFloat(this.options.databytime[index].y).toFixed(this.options.Point) : ""),
            xPadding: (this.options.tooltip.xPadding ? this.options.tooltip.xPadding : 4),
            yPadding: (this.options.tooltip.yPadding ? this.options.tooltip.yPadding : 2),
            caretSize: 6,
            caretX: x,
            caretY: y
        };
        this.ctx.save();
        this.drawToolTipMain();
        this.ctx.restore();
    };


    this.handleMouseMove = function (e) {
        var mouseX = parseInt(e.pageX - this.offsetX);
        var mouseY = parseInt(e.pageY - this.offsetY);
        var hit = false;
        for (var i = 0; i < this.dots.length; i++) {
            var dot = this.dots[i];
            var dx = mouseX - dot.x;
            var dy = mouseY - dot.y;
            if (dx * dx + dy * dy < dot.rXr) {
                /*
                tipCanvas.style.left = (dot.x) + "px";
                tipCanvas.style.top = (dot.y - 40) + "px";
                tipCtx.clearRect(0, 0, tipCanvas.width, tipCanvas.height);
                tipCtx.fillText($(dot.tip).val(), 5, 15);
                */
                hit = true;
                this.drawToolTip(dot.x, dot.y, i, 10);

                /*
                ctx.save();
                ctx.fillStyle = 'blue';
                ctx.lineWidth  = 2;
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, 10, 0, 2*Math.PI);
                ctx.restore();
                */
            }
        }

        if (!hit) {
            //tipCanvas.style.left = "-200px";
            this.index = -1;
            this.draw();
        }

        //console.log(hit)

    };


    /**
     * Creates a "path" for a rectangle with rounded corners at position (x, y) with a
     * given size (width, height) and the same `radius` for all corners.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D Context.
     * @param {Number} x - The x axis of the coordinate for the rectangle starting point.
     * @param {Number} y - The y axis of the coordinate for the rectangle starting point.
     * @param {Number} width - The rectangle's width.
     * @param {Number} height - The rectangle's height.
     * @param {Number} radius - The rounded amount (in pixels) for the four corners.
     * @todo handle `radius` as top-left, top-right, bottom-right, bottom-left array/object?
     */
    this.roundedRect = function (ctx, x, y, width, height, radius) {
        if (radius) {
            var rx = Math.min(radius, width / 2);
            var ry = Math.min(radius, height / 2);

            this.ctx.moveTo(x + rx, y);
            this.ctx.lineTo(x + width - rx, y);
            this.ctx.quadraticCurveTo(x + width, y, x + width, y + ry);
            this.ctx.lineTo(x + width, y + height - ry);
            this.ctx.quadraticCurveTo(x + width, y + height, x + width - rx, y + height);
            this.ctx.lineTo(x + rx, y + height);
            this.ctx.quadraticCurveTo(x, y + height, x, y + height - ry);
            this.ctx.lineTo(x, y + ry);
            this.ctx.quadraticCurveTo(x, y, x + rx, y);
        } else {
            this.ctx.rect(x, y, width, height);
        }
    };

    this.drawCaret = function (tooltipPoint, size) {
        var ctx = this.ctx;
        var vm = this._view;
        var caretPosition = this.getCaretPosition(tooltipPoint, size, vm);

        ctx.lineTo(caretPosition.x1, caretPosition.y1);
        ctx.lineTo(caretPosition.x2, caretPosition.y2);
        ctx.lineTo(caretPosition.x3, caretPosition.y3);

        //console.log(caretPosition);
    };

    this.getCaretPosition = function (tooltipPoint, size, vm) {
        var x1, x2, x3, y1, y2, y3;
        var caretSize = vm.caretSize;
        var cornerRadius = vm.cornerRadius;
        var xAlign = vm.xAlign;
        var yAlign = vm.yAlign;
        var ptX = tooltipPoint.x;
        var ptY = tooltipPoint.y;
        var width = size.width;
        var height = size.height;

        if (yAlign === 'center') {
            y2 = ptY + (height / 2);

            if (xAlign === 'left') {
                x1 = ptX;
                x2 = x1 - caretSize;
                x3 = x1;

                y1 = y2 + caretSize;
                y3 = y2 - caretSize;
            } else {
                x1 = ptX + width;
                x2 = x1 + caretSize;
                x3 = x1;

                y1 = y2 - caretSize;
                y3 = y2 + caretSize;
            }
        } else {
            if (xAlign === 'left') {
                x2 = ptX + cornerRadius + (caretSize);
                x1 = x2 - caretSize;
                x3 = x2 + caretSize;
            } else if (xAlign === 'right') {
                x2 = ptX + width - cornerRadius - caretSize;
                x1 = x2 - caretSize;
                x3 = x2 + caretSize;
            } else {
                x2 = vm.caretX;
                x1 = x2 - caretSize;
                x3 = x2 + caretSize;
            }
            if (yAlign === 'top') {
                y1 = ptY;
                y2 = y1 - caretSize;
                y3 = y1;
            } else {
                y1 = ptY + height;
                y2 = y1 + caretSize;
                y3 = y1;
                // invert drawing order
                var tmp = x3;
                x3 = x1;
                x1 = tmp;
            }
        }
        return { x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3 };
    };

    /**
    * Get the size of the tooltip
    */
    this.getTooltipSize = function (thisctx, model) {
        var ctx = thisctx;
        //console.log(model)

        var height = model.yPadding * 2;     // Tooltip Padding
        var width = 0;

        var titleFontSize = model.titleFontSize;
        var bodyFontSize = model.bodyFontSize;

        height += titleFontSize;             // Title Lines
        height += model.titleSpacing * 2;    // Title Line Spacing
        height += bodyFontSize;              // Body Lines
        height += model.bodySpacing * 2;     // Body Line Spacing

        // Title width
        ctx.font = this.fontString(titleFontSize, model.titleFontStyle, model.titleFontFamily);
        var titlewidth = ctx.measureText(model.title).width;

        // Body width
        ctx.font = this.fontString(bodyFontSize, model.bodyFontStyle, model.bodyFontFamily);
        var bodywidth = ctx.measureText(model.bodytitle).width + bodyFontSize;

        width = Math.max(titlewidth, bodywidth);

        // Add padding
        width += 2 * model.xPadding;

        return {
            width: width,
            height: height
        };
    };

    this.drawTitle = function (pt, vm, ctx, opacity) {
        var title = vm.title;

        ctx.textAlign = vm._titleAlign;
        ctx.textBaseline = 'top';

        var titleFontSize = vm.titleFontSize;
        var titleSpacing = vm.titleSpacing;

        ctx.fillStyle = vm.titleFontColor;
        //ctx.fillStyle = this.color(vm.titleFontColor, opacity);
        ctx.font = this.fontString(vm.titleFontSize, vm.titleFontStyle, vm.titleFontFamily);

        ctx.fillText(title, pt.x, pt.y);
        pt.y += titleFontSize + titleSpacing + vm.yPadding; // Line Height and spacing
    };

    this.fontString = function (pixelSize, fontStyle, fontFamily) {
        return fontStyle + ' ' + pixelSize + 'px ' + fontFamily;
    };


    this.drawBody = function (pt, vm, ctx, opacity) {
        var bodyFontSize = vm.bodyFontSize;

        ctx.textAlign = vm._bodyAlign;
        ctx.textBaseline = 'top';
        ctx.font = this.fontString(bodyFontSize, vm.bodyFontStyle, vm.bodyFontFamily);

        // Before Body
        var xLinePadding = 0;

        // Before body lines
        ctx.fillStyle = mergeOpacity(vm.bodyFontColor, opacity);

        var drawColorBoxes = vm.displayColors;
        xLinePadding = drawColorBoxes ? (bodyFontSize + 2) : 0;

        var line = vm.bodytitle;
        ctx.fillText(line, pt.x + xLinePadding, pt.y);

        // Draw body lines now
        var textColor = vm.labelTextColors;
        ctx.fillStyle = textColor;

        // Draw Legend-like boxes if needed
        if (drawColorBoxes) {
            // Fill a white rect so that colours merge nicely if the opacity is < 1
            ctx.fillStyle = mergeOpacity(vm.legendColorBackground, opacity);
            ctx.fillRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

            // Border
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = mergeOpacity(vm.labelColors.borderColor, opacity);
            ctx.strokeRect(pt.x, pt.y, bodyFontSize, bodyFontSize);

            // Inner square
            ctx.fillStyle = mergeOpacity(vm.labelColors.backgroundColor, opacity);
            ctx.fillRect(pt.x + 1, pt.y + 1, bodyFontSize - 2, bodyFontSize - 2);
            ctx.fillStyle = textColor;
        }

    };

    this.drawFooter = function (pt, vm, ctx, opacity) {
        var footer = vm.footer;

        if (footer.length) {
            pt.y += vm.footerMarginTop;

            ctx.textAlign = vm._footerAlign;
            ctx.textBaseline = 'top';

            ctx.fillStyle = vm.footerFontColor;
            ctx.font = this.fontString(vm.footerFontSize, vm._footerFontStyle, vm._footerFontFamily);

            helpers.each(footer, function (line) {
                ctx.fillText(line, pt.x, pt.y);
                pt.y += vm.footerFontSize + vm.footerSpacing;
            });
        }
    };

    this.drawBackground = function (pt, vm, ctx, tooltipSize, opacity) {
        this.ctx.fillStyle = vm.backgroundColor;
        this.ctx.strokeStyle = vm.borderColor;
        this.ctx.lineWidth = vm.borderWidth;
        var xAlign = vm.xAlign;
        var yAlign = vm.yAlign;
        var x = pt.x;
        var y = pt.y;
        var width = tooltipSize.width;
        var height = tooltipSize.height;
        var radius = vm.cornerRadius;

        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        if (yAlign === 'top') {
            this.drawCaret(pt, tooltipSize);
            //console.log("!");
        }
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        if (yAlign === 'center' && xAlign === 'right') {
            this.drawCaret(pt, tooltipSize);
            //console.log("A");
        }
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        if (yAlign === 'bottom') {
            this.drawCaret(pt, tooltipSize);
            //console.log("B");
        }
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        if (yAlign === 'center' && xAlign === 'left') {
            this.drawCaret(pt, tooltipSize);
            //console.log("C");
        }
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();

        this.ctx.fill();

        if (vm.borderWidth > 0) {
            this.ctx.stroke();
        }
        //console.log("Draw background end");
    };

    this.drawToolTipMain = function () {
        var ctx = this.ctx;
        var vm = this._view;

        if (vm.opacity === 0) {
            return;
        }

        var tooltipSize = {
            width: vm.width,
            height: vm.height
        };
        var pt = {
            x: vm.x,
            y: vm.y
        };

        // IE11/Edge does not like very small opacities, so snap to 0
        var opacity = Math.abs(vm.opacity < 1e-3) ? 0 : vm.opacity;

        // Truthy/falsey value for empty tooltip
        var hasTooltipContent = vm.title.length || vm.beforeBody.length || vm.body.length || vm.afterBody.length || vm.footer.length;

        if (hasTooltipContent) {
            // Draw Background
            this.drawBackground(pt, vm, ctx, tooltipSize, opacity);

            // Draw Title, Body, and Footer
            pt.x += vm.xPadding;
            pt.y += vm.yPadding;

            // Titles
            this.drawTitle(pt, vm, ctx, opacity);

            // Body
            this.drawBody(pt, vm, ctx, opacity);

            // Footer
            //this.drawFooter(pt, vm, ctx, opacity);
        }
    };
};


/**
* Helper method to merge the opacity into a color
*/
function mergeOpacity(colorString, opacity) {
    return colorString;
}


function mergeOpacity_(colorString, opacity) {
    var color = helpers.color(colorString);
    return color.alpha(opacity * color.alpha()).rgbaString();
}


/**
 * Helper to get the alignment of a tooltip given the size
 */
function determineAlignment(tooltip, size) {
    var model = tooltip._model;
    var chart = tooltip._chart;
    var chartArea = tooltip._chart.chartArea;
    //console.log(chartArea)
    var xAlign = 'center';
    var yAlign = 'center';

    if (model.y < size.height) {
        yAlign = 'top';
    } else if (model.y > (chart.height - size.height)) {
        yAlign = 'bottom';
    }

    var lf, rf; // functions to determine left, right alignment
    var olf, orf; // functions to determine if left/right alignment causes tooltip to go outside chart
    var yf; // function to get the y alignment if the tooltip goes outside of the left or right edges
    var midX = (chartArea.left + chartArea.right) / 2;
    var midY = (chartArea.top + chartArea.bottom) / 2;

    if (yAlign === 'center') {
        lf = function (x) {
            return x <= midX;
        };
        rf = function (x) {
            return x > midX;
        };
    } else {
        lf = function (x) {
            return x <= (size.width / 2);
        };
        rf = function (x) {
            return x >= (chart.width - (size.width / 2));
        };
    }

    olf = function (x) {
        return x + size.width + model.caretSize + model.caretPadding > chart.width;
    };
    orf = function (x) {
        return x - size.width - model.caretSize - model.caretPadding < 0;
    };
    yf = function (y) {
        return y <= midY ? 'top' : 'bottom';
    };

    if (lf(model.x)) {
        xAlign = 'left';

        // Is tooltip too wide and goes over the right side of the chart.?
        if (olf(model.x)) {
            xAlign = 'center';
            yAlign = yf(model.y);
        }
    } else if (rf(model.x)) {
        xAlign = 'right';

        // Is tooltip too wide and goes outside left edge of canvas?
        if (orf(model.x)) {
            xAlign = 'center';
            yAlign = yf(model.y);
        }
    }

    var opts = tooltip._options;
    return {
        xAlign: opts.xAlign ? opts.xAlign : xAlign,
        yAlign: opts.yAlign ? opts.yAlign : yAlign
    };
}


/**
* @Helper to get the location a tooltip needs to be placed at given the initial position (via the vm) and the size and alignment
*/
function getBackgroundPoint(vm, size, alignment, chart) {
    // Background Position
    var x = vm.x;
    var y = vm.y;

    var caretSize = vm.caretSize;
    var caretPadding = vm.caretPadding;
    var cornerRadius = vm.cornerRadius;
    var xAlign = alignment.xAlign;
    var yAlign = alignment.yAlign;
    var paddingAndSize = caretSize + caretPadding;
    var radiusAndPadding = cornerRadius + caretPadding;

    //console.log(vm);

    if (xAlign === 'right') {
        x -= size.width;
    } else if (xAlign === 'center') {
        x -= (size.width / 2);
        if (x + size.width > chart.width) {
            x = chart.width - size.width;
        }
        if (x < 0) {
            x = 0;
        }
    }

    if (yAlign === 'top') {
        y += paddingAndSize;
    } else if (yAlign === 'bottom') {
        y -= size.height + paddingAndSize;
    } else {
        y -= (size.height / 2);
    }

    if (yAlign === 'center') {
        if (xAlign === 'left') {
            x += paddingAndSize;
        } else if (xAlign === 'right') {
            x -= paddingAndSize;
        }
    } else if (xAlign === 'left') {
        x -= radiusAndPadding;
    } else if (xAlign === 'right') {
        x += radiusAndPadding;
    }

    return {
        x: x,
        y: y
    };
}


/**
 * Helper to get the context chart;
 *
 */
function getContextChart(context) {
    /*
    console.log($(context.canvas).offset().top);
    console.log($(context.canvas).offset().left);
    console.log($(context.canvas).parent().outerWidth());
    console.log($(context.canvas).parent().outerHeight());
    */

    /*
    console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    console.log(context);
    console.log(context.canvas.getBoundingClientRect());
    */

    return {
        //_chart : {
        height: $(context.canvas).parent().outerHeight(),
        width: $(context.canvas).parent().outerWidth(),
        /*
        chartArea: {
            left: $(context.canvas).offset().left,
            right: $(context.canvas).offset().left + $(context.canvas).parent().outerWidth(),
            top: $(context.canvas).offset().top,
            bottom: $(context.canvas).offset().top + $(context.canvas).parent().outerHeight()
        }
        */
        chartArea: context.canvas.getBoundingClientRect()
        //}
    };
}

