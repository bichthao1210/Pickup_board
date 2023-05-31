var gs = undefined;
var gsItems = {};
var gGetInstanceInTerval = undefined; 
var gSavelayoutFlag = false;
// モバイル確認
var isMobile = navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i);

  var glocationFixFlag=0;


function setContrast(hex) {
  let textColour = 'black';
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const brightness = Math.round(((parseInt(result[1], 16) * 299) +
      (parseInt(result[2], 16) * 587) +
      (parseInt(result[3], 16) * 114)) / 1000);
    textColour = (brightness > 125) ? 'black' : 'white';
  }
  return textColour;
}

/**
 * 字数をカウント
 */
$.getByteLength = function (str) {
  let len = 0;
  for (let i = 0; i < str.length; i++) {
      // 全角文字は2文字で半角文字は1文字としてカウント
      (str[i].match(/[ -~]/)) ? len += 1 : len += 2;
  }
  return len;
};

function generateCard(card) {
  let textColour = setContrast(card.colorCode);
  var itemElem = document.createElement("div");
  var tbl = '<div id="idDrag' + card.cardNo + '" class="grid-item" data-id="' + card.viewIdx + '" card-no="' + card.cardNo + '" >';
  tbl += '<div class="grid-item-content">';
  tbl += '<table class="table table-bordered grid-item-content">';
  tbl += '<thead class="table-primary panel-heading" style="background-color:' + card.colorCode + ';">';
  tbl += '<tr style="height:36px;">';
  tbl += '<th colspan="4" class="py-0">';
  tbl += '<div class="d-flex justify-content-between" style="height:100%;align-items: center;">';
  tbl += '<div id="idHeader' + card.cardNo + '" class="py-0" style="color:' + textColour + ';white-space:nowrap;">' + escapeHtml(card.name) + "</div>";
  // tbl += '<img id="idCardImg' + card.cardNo + '" src="" alt="" height="36px">';
  tbl += "</div>";
  tbl += "</th>";
  tbl += "</tr>";
  tbl += "</thead>";

  tbl += '<tbody id="idCardBody' + card.cardNo + '">';

  var dataIdxMax;
  if (card.cardType === 0) {
  // 計測カード 
    dataIdxMax=card.outputDataIdxMax;
    if (card.outputData && dataIdxMax > 5) {
      var cardItems = Math.ceil(dataIdxMax/2)     
      for (let index = 1; index <= cardItems; index++) {
        var element1Id ="";
        var element1Name = "";
        var element1Value ="";
        var element1Unit = "";
        var background1 = "#fff";
        var color1 = "#000";
        var element2Id ="";
        var element2Name = "";
        var element2Value ="";
        var element2Unit = "";
        var background2 = "#fff";
        var color2 = "#000";
        var flgExist01=false;
        var flgExist02=false;
        for (j in card.outputData){
          outputData=card.outputData[j];
          if (index ==outputData.viewIdx){
            var element1 = outputData;
            element1Id = element1 ? card.cardNo + "_" + element1.csvpatternId : "";
            element1Name = element1 ? element1.outputName : "";
            element1Value = element1 ? element1.value : "";
            element1Unit = element1 && element1.unitTitle ? '[' + element1.unitTitle + ']' : '';
            background1 = element1 && element1.backColor ? element1.backColor : "#fff";
            color1 = element1 && element1.foreColor ? element1.foreColor : "#000";
            flgExist01=true;
            if (flgExist02){
              break;    
            }
          }
          if (index+cardItems ==outputData.viewIdx){
            var  element2 = outputData;
            element2Id = element2 ? card.cardNo + "_" + element2.csvpatternId : "";
            element2Name = element2 ? element2.outputName : "";
            element2Value = element2 ? element2.value : "";
            element2Unit = element2 && element2.unitTitle ? '[' + element2.unitTitle + ']' : '';
            background2 = element2 && element2.backColor ? element2.backColor : "#fff";
            color2 = element2 && element2.foreColor ? element2.foreColor : "#000";
            flgExist02=true;
            if (flgExist01){
              break;    
            }
          }
        }
        tbl += '<tr style="height:32px;">';
        tbl +=
          '<td id="idItemTitle" class="text-left table-active measurement-title py-0" style="width:30%;vertical-align:middle;">' +
          escapeHtml(element1Name) +
          "</td>";
        tbl +=
          '<td class="text-right p-0" style="width:20%;vertical-align:middle;background-color:' + background1 + ';color:' + color1 + ';"><div class="d-flex justify-content-end">' +
          '<div id="idItemVal' + element1Id + '" class="measurement-value">' + parseValue(element1Value) + '</div>' +
          '<div id="idItemUnit' + element1Id + '" class="text-left measurement-unit">' + escapeHtml(element1Unit) + '</div>' +
          "</div></td>";
        tbl +=
          '<td id="idItemTitle" class="text-left table-active measurement-title py-0" style="width:30%;vertical-align:middle;">' +
          escapeHtml(element2Name) +
          "</td>";
        tbl +=
          '<td class="text-right p-0" style="vertical-align:middle;background-color:' + background2 + ';color:' + color2 + ';"><div class="d-flex justify-content-end">' +
          '<div id="idItemVal' + element2Id + '" class="measurement-value">' + parseValue(element2Value) + '</div>' +
          '<div id="idItemUnit' + element2Id + '" class="text-left measurement-unit">' + escapeHtml(element2Unit) + '</div>' +
          "</div></td>";
        tbl += "</tr>";
      }
    } else {
      for (let index = 1; index <= dataIdxMax; index++) {
        var elementId ="";
        var elementName = "";
        var elementValue ="";
        var elementUnit = "";
        var background = "#fff";
        var color1 = "#000";
        for (j in card.outputData){
          outputData=card.outputData[j];
          if (index ==outputData.viewIdx){
            var element = outputData;
            elementId = element ? card.cardNo + "_" + element.csvpatternId : "";
            elementName = element ? element.outputName : "";
            elementValue = element ? element.value : "";
            elementUnit = element && element.unitTitle ? '[' + element.unitTitle + ']' : '';
            background = element && element.backColor ? element.backColor : "#fff";
            color = element && element.foreColor ? element.foreColor : "#000";
            break;    
          }
        }
        tbl += '<tr style="height:32px;vertical-align:middle;">';
        tbl +=
          '<td id="idItemTitle" class="text-left table-active measurement-title py-0" style="width:60%;vertical-align:middle;">' +
          escapeHtml(elementName) +
          "</td>";
        tbl +=
          '<td class="text-right p-0" style="vertical-align:middle;background-color:' + background + ';color:' + color + ';"><div class="d-flex justify-content-end">' +
          '<div id="idItemVal' + elementId + '" class="measurement-value">' + parseValue(elementValue) + '</div>' +
          '<div id="idItemUnit' + elementId + '" class="text-left measurement-unit">' + escapeHtml(elementUnit) + '</div>' +
          "</div></td>";
        tbl += "</tr>";
      }
    }
  } else if (card.cardType === 1) {
    tbl += '<tr id="idForecast' + card.cardNo + '">';
    tbl += "</tr>";
    fncFetchForecast(card.areaNo, card.cardNo, function update(id, obj) {
      var forecast = '<td id="idItemTitle" class="text-left" style="height:100%;padding: 0;">';
      forecast += '<div class="d-flex">';
      forecast += '<div class="item-container1">';
      forecast += '<div class="centered-element">';

      forecast += '<img src="' + obj.image + '" alt="" width="70px">';
      forecast += '</div>';
      forecast += '</div>';
      forecast += '<div class="item-container2">';
      forecast += '<div class="centered-element">';

      forecast += '<div class="temp"><span class="temp-minval">' +
        parseValue(obj.temperature.min, "--") + '℃</span>～<span class="temp-maxval">' + parseValue(obj.temperature.max, "--") + '℃</span></div>';
      forecast += '<div class="rain"><span class="rain-title">降水確率</span><span class="rain-value">' + obj.chanceOfRain + '</span></div>';
      forecast += '</div>';
      forecast += '</div>';
      forecast += '</div>';
      if (obj.weather.length <= 15) {
        forecast += '<div class="item-container3"> <div class="centered-weather">' + obj.weather + '</div> </div>';
      } else if (obj.weather.length <= 28) {
        forecast += '<div class="item-container3"> <div class="centered-weather centered-weather-longtext">' + obj.weather + '</div> </div>';
      } else if (obj.weather.length <= 42) {
        forecast += '<div class="item-container3"> <div class="centered-weather centered-weather-ultratext">' + obj.weather + '</div> </div>';
      } else {
        const weather_short = obj.weather.substring(0, 41) + '...';
        forecast += '<div class="item-container3"> <div class="centered-weather centered-weather-ultratext">' + weather_short +
          '<span class="tooltiptext">' + obj.weather + '</span>' + '</div> </div>';
      }
      forecast += '</td>';

      if (document.getElementById("idCardBody" + id)) {
        document.getElementById("idCardBody" + id).innerHTML = forecast;
      }
      var element = document.getElementById("idHeader"+card.cardNo);
      if (element) {
        const byteLength = $.getByteLength(element.textContent);
        if (byteLength > 22) {
          element.style.fontSize = "13px";
          element.style.lineHeight = "1rem";
          element.style.whiteSpace = "normal";
          element.style.textOverflow = "ellipsis";
          element.style.overflow = "hidden";
          element.style.height = "36px";
          element.style.alignItems = "center";
          element.style.display = "flex";
        }
      }
      // $("#idCardImg" + id).attr("src", obj.image);
    });
  } else if (card.cardType === 3) {
    tbl += '<tr id="chart' + card.cardNo + '">';
    tbl += '<td id="idItemTitle" class="panel-body" style="padding:0;">';
    tbl += '<div class="chart-container" >';
    tbl += '<canvas id="myChart"></canvas>'; 
    tbl += "</div>";
    tbl += "</td>";
    tbl += "</tr>";
    let myChart;
    let filteredData;
    function createChart() {
    const url = 'https://qtucgrun66.execute-api.ap-northeast-1.amazonaws.com/v1/api-hlrgwl-web?path=pickup&type=getRealtimeData&pickupNo=1';
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiaGFrYXJ1MDEiLCJ1c2VyX25hbWUiOiJoYWthcnUwMiIsInVzZXJfdHlwZSI6MSwiZXhwIjoxNzE0MTE1MjM4LCJpYXQiOjE2ODI1NzkyMzh9.dg5vkF66NOsYs1o9VFr38v1VyjkvWWJB3wDHk1ieyP8';
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios.get(url, config)
    .then((response) => {
      const filteredData = response.data.Respons.filter((item) => item.cardType === 3
      );  
      
      // check cardType and set chart type accordingly
      let chartType = 'line';
      if (filteredData[0].cardType === 0) {
        chartType = 'line';
      } else if (filteredData[0].cardType === 1) {
        chartType = 'bar'; 
      }

      // get the data for each output in the outputData array
      const dataset1 = {
        label: filteredData[0].outputData[0].outputName,
        data: filteredData[0].outputData[0].data.map((dataItem) => dataItem.Value),
        backgroundColor: filteredData[0].outputData[0].backColor,
        borderColor: filteredData[0].outputData[0].foreColor,
        borderWidth: 1,
        fill: false, // thêm fill: false để tắt chức năng tô màu cho khu vực dưới đường biểu đồ
        spanGaps: true, // thêm spanGaps: true để cho phép vẽ đường thẳng nối các điểm của biểu đồ
      };

      const dataset2 = {
        label: filteredData[0].outputData[1].outputName,
        data: filteredData[0].outputData[1].data,
        backgroundColor: filteredData[0].outputData[1].backColor,
        borderColor: filteredData[0].outputData[1].foreColor,
        borderWidth: 1,
        fill: false, // thêm fill: false để tắt chức năng tô màu cho khu vực dưới đường biểu đồ
        spanGaps: true, // thêm spanGaps: true để cho phép vẽ đường thẳng nối các điểm của biểu đồ
      };
      

      // create a new chart instance
      const ctx = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(ctx, {
        type: chartType, // set the chart type based on the cardType
        data: {
          labels: filteredData[0].outputData[0].data.map((dataItem) => moment(dataItem.time).format("HH:mm")),
          datasets: [dataset1, dataset2],
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  min: -50,
                  max: 50,
                  beginAtZero: true,
                },
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 0, // Vô hiệu hóa hiệu ứng animation
          }, 
        },
      });
    })

    .catch((error) => {
      console.error(error);
    });
    }

    // Gọi hàm tạo biểu đồ và lấy dữ liệu từ API khi trang được tải lần đầu
    createChart();
    
    // Refresh biểu đồ và lấy dữ liệu từ API khi kích thước cửa sổ thay đổi
    window.addEventListener("resize", function () {
      if (myChart) {
        myChart.destroy(); // Hủy bỏ biểu đồ hiện tại
      }
      createChart(); // Tạo lại biểu đồ và lấy dữ liệu từ API
    });
  // } else if (card.cardType === 4) {
  //     tbl += '<tr>';
  //     tbl += '<td colspan="4" style="padding: 0;">';
  //     tbl += '<textarea id="textarea' + card.cardNo + '" class="form-control" placeholder="Enter text"></textarea>';
  //     tbl += '</td>';
  //     tbl += '</tr>';   
  // }
  } else if (card.cardType === 4) {
    tbl += '<tr class="card-type-4">';
    tbl += '</tr>'; 
}
  // 状態カード
  else {
    dataIdxMax=card.outputDataIdxMax;
    let rowheight = 240/dataIdxMax;
    
    if (card.outputData && dataIdxMax > 5) {
      rowheight = 240 / Math.ceil(dataIdxMax/2);
      const cardItems = Math.ceil(dataIdxMax/2)
      for (let index = 1; index <= cardItems; index++) {
        var element1Id ="";
        var element1Name = "";
        var value1 ="";
        var element1Unit = "";
        var background1 = "#fff";
        var color1 = "#000";
        var element2Id ="";
        var element2Name = "";
        var value2 ="";
        var element2Unit = "";
        var background2 = "#fff";
        var color2 = "#000";
        var flgExist01=false;
        var flgExist02=false;
        for (j in card.outputData){
          outputData=card.outputData[j];
          if (index ==outputData.viewIdx){
            var element1 = outputData;
            element1Id = element1 ? card.cardNo + "_" + element1.csvpatternId : "";
            element1Name = element1 ? element1.outputName : "";
            background1 = element1 && element1.backColor ? element1.backColor : "#fff";
            color1 = element1 && element1.foreColor ? element1.foreColor : "#000";
            value1 = element1 && element1.value ? element1.value : "";
            flgExist01=true;
            if (flgExist02){
              break;    
            }
          }
          if (index+cardItems ==outputData.viewIdx){
            var element2 = outputData;
            element2Id = element2 ? card.cardNo + "_" + element2.csvpatternId : "";
            element2Name = element2 ? element2.outputName : "";
            background2 = element2 && element2.backColor ? element2.backColor : "#fff";
            color2 = element2 && element2.foreColor ? element2.foreColor : "#000";
            value2 = element2 && element2.value ? element2.value : "";
            flgExist02=true;
            if (flgExist01){
              break;    
            }
          }
        }
        tbl += '<tr style="height:32px;">';
        tbl +=
          '<td id="idItemTitle" class="text-left table-active measurement-title py-0" style="width:30%;vertical-align:middle;">' +
          escapeHtml(element1Name) +
          "</td>";
        tbl +=
          '<td id="idItemMessage' + element1Id +
          '" class="text-left table-active measurement-title py-0" style="width:20%;vertical-align:middle;background-color:' + background1 + ';color:' + color1 + ';">' +
          '<div id="idcardstate" class="cardstate measurement-value" style="height:'+rowheight+'px;"><div class="cardstatecontent">' + escapeHtml(jis2chr(value1)).replaceAll("\\n", "<br>") + '</div></div>' +
          "</td>";
        tbl +=
          '<td id="idItemTitle" class="text-left table-active measurement-title py-0" style="width:30%;vertical-align:middle;">' +
          escapeHtml(element2Name) +
          "</td>";
        tbl +=
          '<td id="idItemMessage' + element2Id +
          '" class="text-left table-active measurement-title py-0" style="vertical-align:middle;background-color:' + background2 + ';color:' + color2 + ';">' +
          '<div id="idcardstate" class="cardstate measurement-value" style="height:'+rowheight+'px;"><div class="cardstatecontent">' + escapeHtml(jis2chr(value2)).replaceAll("\\n", "<br>") + '</div></div>' +
          "</td>";
        tbl += "</tr>";
      }
    } 
    else {
      rowheight = (dataIdxMax > 2) ? (240 / dataIdxMax) : (90 / dataIdxMax);
      for (let index = 1; index <= dataIdxMax; index++) {
        var elementId ="";
        var elementName = "";
        var elementValue ="";
        var elementUnit = "";
        var background = "#fff";
        var color1 = "#000";
        for (j in card.outputData){
          outputData=card.outputData[j];
          if (index ==outputData.viewIdx){
            var element = outputData;
            elementId = element ? card.cardNo + "_" + element.csvpatternId : "";
            elementName = element ? element.outputName : "";
            elementValue = element ? element.value : "";
            elementUnit = element && element.unitTitle ? '[' + element.unitTitle + ']' : '';
            background = element && element.backColor ? element.backColor : "#fff";
            color = element && element.foreColor ? element.foreColor : "#000";
            break;    
          }
        }
        tbl += '<tr style="height:32px;vertical-align:middle;">';
        tbl +=
          '<td id="idItemTitle" class="text-left table-active measurement-title py-0" style="padding-top:0;padding-bottom:0;width:60%;vertical-align:middle;">' +
          escapeHtml(elementName) +
          "</td>";
        tbl +=
          '<td id="idItemMessage' + elementId +
          '" class="text-left table-active measurement-title py-0" style="vertical-align:middle;background-color:' + background + ';color:' + color + ';">' +
          '<div id="idcardstate" class="cardstate" style="height:'+rowheight+'px;"><div class="cardstatecontent">' + escapeHtml(jis2chr(elementValue)).replaceAll("\\n", "<br>") + '</div></div>' +
          "</td>";
        tbl += "</tr>";
      }
    }
  }
  tbl += "</tbody>";
  tbl += "</table>";
  tbl += "</div>";
  tbl += "</div>";
  
  
  itemElem.innerHTML = tbl;
  return itemElem.firstChild;
}

function createWidgetCardElement(card) { 
  const SIZE_UNIT = 1;
  const itemElem = generateCard(card);
  let item = {
    x: card.viewIdx,
    y: card.lineIdx,
    w: 1,
    h: 1,
    text: card.name,
    content: '',
    noResize: true,
    id: card.cardNo
  }; 

  if (card.cardType === 0) {
    if (card.outputData && card.outputDataIdxMax > 5) {
      itemElem.classList.add("card-large");
      item.w = SIZE_UNIT * 4;
      item.h = SIZE_UNIT * 2;
    } else if (card.outputData && card.outputDataIdxMax >= 3) {
      itemElem.classList.add("card-medium");
      item.w = SIZE_UNIT * 2;
      item.h = SIZE_UNIT * 2;
    } else {
      itemElem.classList.add("card-small");
      item.w = SIZE_UNIT * 2;
      item.h = SIZE_UNIT * 1;
    }
  } else if (card.cardType === 1) {
    itemElem.classList.add("card-tiny");
    item.w = SIZE_UNIT;
    item.h = SIZE_UNIT;
  }  else if (card.cardType === 3) {
    itemElem.classList.add("card-large");
    item.w = SIZE_UNIT * 4;
    item.h = SIZE_UNIT * 4;
  }
    else if (card.cardType === 4) {
      itemElem.classList.add("card-type4");
      item.w = SIZE_UNIT * card.cardSize;
      item.h = SIZE_UNIT * card.cardSize;
    }
  else {
    if (card.outputData && card.outputDataIdxMax > 5) {
      itemElem.classList.add("card-large");
      item.w = SIZE_UNIT * 4;
      item.h = SIZE_UNIT * 2;
    } else if (card.outputData && card.outputDataIdxMax >= 3) {
      itemElem.classList.add("card-medium");
      item.w = SIZE_UNIT * 2;
      item.h = SIZE_UNIT * 2;
    } else {
      itemElem.classList.add("card-small");
      item.w = SIZE_UNIT * 2;
      item.h = SIZE_UNIT * 1;
    }
  }

  itemElem.setAttribute("data-id", card.viewIdx);
  itemElem.setAttribute("data-title", card.name);
  item.content = itemElem.innerHTML;
  return item;
}

function updateRealtimeData(obj) {
  for (i in obj.Respons) {
    const card = obj.Respons[i];
    if (card.cardType === 0) {
      for (j in card.outputData) {
        const measurementData = card.outputData[j];
        const elementValue = measurementData ? measurementData.value : "";
        const elementUnit = measurementData && measurementData.unitTitle ? "[" + measurementData.unitTitle + "]" : "";
        const elementId = measurementData ? "idItemVal" + card.cardNo + "_" + measurementData.csvpatternId : "";
        const elementIdUnit = measurementData ? "idItemUnit" + card.cardNo + "_" + measurementData.csvpatternId : "";
        const eleCurrentPickup = document.getElementById(elementId);
        if (eleCurrentPickup) {
          eleCurrentPickup.textContent = parseValue(elementValue); // + elementUnit;
        }
        const eleCurrentUnit = document.getElementById(elementIdUnit);
        if (eleCurrentUnit) {
          eleCurrentUnit.textContent = parseValue(elementUnit);
        }
      }
    } else if (card.cardType === 1) {
      ;
    } else {
      for (j in card.outputData) {
        const element = card.outputData[j];
        const elementId = element ? card.cardNo + "_" + element.csvpatternId : "";
        const eleCurrentPickup = document.getElementById(elementId);
        if (eleCurrentPickup) {
          eleCurrentPickup.textContent = parseValue(element.value);
        }
      }
    }
  }
}

function getRealtimeData(callback) {
  const eleCurrentPickup = document.getElementById(lstidPickupNo);
  if (!eleCurrentPickup) {
    return;
  }
  const pickupNo = parseFloat(eleCurrentPickup.getAttribute("data-id"));
  var strQuery = apigateway + "path=pickup&type=getRealtimeData&pickupNo=" + pickupNo;
  http.get(
    strQuery,
    function (result) {
      callback(result)
    },
    function (error) {
      /* エラー状態チェック */
    }
  );
}

function gridEvent() {
  gs.on('change', function (e, items) {
    if (gSavelayoutFlag === false) {
      return;
    }
    if (!!isMobile || (getGridColumns() <= 4)) {
      return;
    }
    gSavelayoutFlag = false;
    const itemIds = items.map(function (item, index) {
      gsItems[item.id].x = item.x;
      gsItems[item.id].y = item.y;
      return {
        "cardNo": item.id,
        "viewIdx": item.x,
        "lineIdx": item.y,
      }
    });
    if (itemIds.length === 0) {
      return;
    }
    const eleCurrentPickup = document.getElementById(lstidPickupNo);
    if (!eleCurrentPickup) {
      return;
    }
    const pickupNo = parseFloat(eleCurrentPickup.getAttribute("data-id"));

    const jsData = {
      "pickupNo": pickupNo,
      "viewIdxList": itemIds
    };

    // カードの順番を保存
    const jsStrData = JSON.stringify(jsData);
    const postUrl = apigatewaypost + "path=changePickup&changeType=CardViewIdx";
    return http.post(postUrl, jsStrData, function (obj) {
      return obj;
    }, function (obj) {
      return obj;
    });

  });

  gs.on('dragstop', function (event, el) {
    gSavelayoutFlag = true;
  });
}

function initPickupBoard(locationFixFlag) {
  gsItems = {};
  const column = getGridColumns();
  glocationFixFlag=locationFixFlag;
  if (gs) {
    gs.removeAll();
  } else {
    gs = GridStack.init({
      // min_width: 768,
      minRow: 1,
      // oneColumnSize: 768,
      column: column,
      cellHeight: 152,
      // cellWidth: 180,
      animate: true, // show immediate (animate: true is nice for user dragging though)
      draggable: {
        handle: '.panel-heading, thead', 
        scroll: false, 
      },
      disableOneColumnMode: true, // will manually do 1 column
      float: true,
      disableResize: true,
      // if `true` turns grid to RTL. 
      // Possible values are `true`, `false`, `'auto'`
      rtl: 'auto',
      // noMove: !!isMobile || (column <= 4),
    });
    window.addEventListener('resize', function () { resizeGrid() });
  }

  getRealtimeData(function (obj) {
    gs.removeAll();
    gs.batchUpdate();
    let items = obj.Respons;
    items.sort(function (a, b) {
      if (a.lineIdx > b.lineIdx) return 1;
      if (a.lineIdx < b.lineIdx) return -1;
      if (a.viewIdx < b.viewIdx) return -1;
      if (a.viewIdx > b.viewIdx) return 1;
      return 0;
    });
    // // モバイル確認
    // var isMobile = navigator.userAgent.match(/Android/i) || 
    //             navigator.userAgent.match(/webOS/i) || 
    //             navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || // navigator.userAgent.match(/iPad/i) || 
    //             navigator.userAgent.match(/BlackBerry/i) || 
    //             navigator.userAgent.match(/Windows Phone/i);
    for (i in obj.Respons) {
      let n = createWidgetCardElement(obj.Respons[i]);
      n.noMove = !!isMobile || (column <= 4) || (glocationFixFlag==1);
      gs.addWidget(n);
      // console.log('id=' + n.id + ' x=' + n.x + ' y=' + n.y + ' text=' + n.text );
      const cloneN = JSON.parse(JSON.stringify(n));
      gsItems[cloneN.id] = cloneN;
    }
    gs.batchUpdate(false);
    resizeGrid();
  });

  if (gGetInstanceInTerval !== undefined) {
    clearInterval(gGetInstanceInTerval);
    gGetInstanceInTerval = undefined;
  }
  gGetInstanceInTerval = setInterval(function () {
    getRealtimeData(updateRealtimeData);
  }, FETCH_INTERVAL.INSTANCE);
}


function getGridColumns() {
  let columns = 8;
  let width = document.body.clientWidth;
  if (width < 500) {
    columns = 1; // gs.column(2, layout);
  } else {
    columns = 16; // gs.column(12, layout);
  }
  return columns;
}

function resizeGrid() {
  let layout = 'moveScale';
  let columns = getGridColumns();
  gs.column(columns, layout);

  setTimeout(function () {
    let column = gs.getColumn();
    let serializedData = gs.save();
    let serializedFull = gs.save(true, true);
    serializedData = serializedFull.children;
    // serializedFull.width = column;
    serializedFull.column = column;
    // serializedData = GridStack.Utils.sort(serializedData, 1, column);
    for (const gridItem of serializedData) {
      item = gsItems[gridItem.id];
      gridItem.x = item.x;
      gridItem.y = item.y;
      gridItem.w = (item.w > column) ? column : item.w;
      gridItem.noMove = !!isMobile || (column <= 4) || (glocationFixFlag==1);
    }
    if (!serializedFull) return;
    gs.destroy(true);
    gs = GridStack.addGrid(document.querySelector('#idPickupBoardGS'), serializedFull)
    gridEvent();
  }, 100);
}

// Lấy các phần tử cần sử dụng
const openPopupButton = document.getElementById('openPopup');
const popup = document.getElementById('popup');
const applySettingsButton = document.getElementById('applySettings');
const titleInput = document.getElementById('cardTitle');
const headerColorInput = document.getElementById('headerColor');
const cardSizeInput = document.getElementById('cardSize');

let textEditMode = false;
let locked = false;
let textEditModeLocked = false;

// Xử lý khi click vào nút mở popup
openPopupButton.addEventListener('click', function () {
  popup.style.display = 'block';
});

document.getElementById('openPopup').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'block';
});

document.getElementById('closePopup').addEventListener('click', function() {
  document.getElementById('popup').style.display = 'none';
});

let cardCounter = 1;

applySettingsButton.addEventListener('click', handleApplySettings);

function handleApplySettings() {
  const title = titleInput.value;
  const headerColor = headerColorInput.value;
  const cardSize = cardSizeInput.value;

  const newData = {
    areaNo: '',
    cardNo: cardCounter,
    cardType: 4,
    colorCode: headerColor,
    lineIdx: 0,
    cardSize: cardSize,
    name: title,
  };

  cardCounter++;

  let newItem = createWidgetCardElement(newData);
  newItemElement = gs.addWidget(newItem);

  popup.style.display = 'none';

  // Tìm các phần tử DOM có class "card-type-4" trong phần tử newItemElement
  const cardType4Elements = newItemElement.getElementsByClassName("card-type-4");
  
  // Lặp qua các phần tử DOM và thêm nút X vào thẻ tr có class "card-type-4"
  Array.from(cardType4Elements).forEach((cardType4Element) => {
    cardType4Element.addEventListener('dblclick', function() {
      if (!locked) { // Kiểm tra khóa có bật hay không
        textEditMode = true;
        const textElement = this.querySelector('.text-input');
        textElement.disabled = false;
        textElement.focus();
  
        textElement.addEventListener('blur', function() {
          textEditMode = false;
          textElement.disabled = true;
        });
  
        textElement.addEventListener('keydown', function(event) {
          if (event.key === 'Escape') {
            textEditMode = false;
            textElement.disabled = true;
          }
        });
      }
    });
      // Thêm phần tử nhập văn bản
    const textInput = document.createElement('textarea');
    textInput.type = 'text';
    textInput.className = 'text-input';
    textInput.disabled = true;

  cardType4Element.appendChild(textInput);
    const trElement = cardType4Element.closest("tr");
  
    if (trElement) {
      // Tạo phần tử span cho nút X
      const deleteIcon = document.createElement("span");
      deleteIcon.className = "delete-icon";
      deleteIcon.innerHTML = "&#10006;"; // Mã HTML cho ký tự X
  
      const lockIcon = document.createElement('span');
      lockIcon.className = 'lock-icon';
      lockIcon.innerHTML = '&#128275;'; // Mã HTML cho icon khóa
  
      // Thêm sự kiện click vào nút X để xóa card
      deleteIcon.addEventListener("click", function () {
        // Hiển thị hộp thoại xác nhận
        const confirmDelete = confirm("Are you sure?");

        // Kiểm tra xem người dùng đã xác nhận xóa hay chưa
        if (confirmDelete) {
          // Tìm phần tử cha (card) chứa nút X
          const cardElement = this.closest(".grid-stack-item");

          // Kiểm tra xem có tìm thấy phần tử cha hay không
          if (cardElement) {
            // Xóa phần tử cha (card)
            cardElement.remove();
          }
        }
      });

  
      lockIcon.addEventListener('click', function () {
        locked = !locked;
        if (locked) {
          lockIcon.innerHTML = '&#128274;'; // Mã HTML cho icon đóng khóa
          disableCardActions(deleteIcon);
          textEditModeLocked = true;
        } else {
          lockIcon.innerHTML = '&#128275;'; // Mã HTML cho icon khóa
          enableCardActions(deleteIcon);
          textEditModeLocked = false;
        }
      });
      
      // Thêm nút X vào thẻ tr
      trElement.appendChild(deleteIcon);
      trElement.appendChild(lockIcon);
    }
  });
  
}
    function disableCardActions(deleteIcon) {
      deleteIcon.style.pointerEvents = 'none';
    }

    function enableCardActions(deleteIcon) {
      deleteIcon.style.pointerEvents = 'auto';
    }