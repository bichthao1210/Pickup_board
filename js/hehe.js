let gsXCounter = 0; // Biến đếm cho gs-x
let gsYCounter = 0; // Biến đếm cho gs-y
let gsIdCounter = 1; // Biến đếm cho gs-id (bắt đầu từ 1)

applySettingsButton.addEventListener('click', function() {
    getUniqueGsXY();
    var uniqueGsId = getUniqueGsId(); // Lấy giá trị gs-id duy nhất
  
    // Lấy các giá trị từ phần nhập liệu trong popup
    var cardTitle = document.getElementById('cardTitle').value;
    var headerColor = document.getElementById('headerColor').value;
    var cardSize = document.getElementById('cardSize').value;
    var codeToAdd = `
        <div class="grid-stack-item ui-draggable ui-resizable-disabled" gs-x="${gsXCounter}" gs-y="${gsYCounter}" gs-w="${cardSize}" gs-h="${cardSize}" gs-no-resize="true" gs-id="${uniqueGsId}">
            <div class="grid-stack-item-content">
                <div class="grid-item-content">
                    <table class="table table-bordered grid-item-content">
                        <thead class="table-primary panel-heading" style="background-color: ${headerColor};">
                            <tr style="height:36px;">
                                <th colspan="4" class="py-0">
                                    <div class="d-flex justify-content-between" style="height:100%;align-items: center;">
                                        <div id="idHeader${uniqueGsId}" class="py-0" style="color:black;white-space:nowrap;">${cardTitle}</div>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="idCardBody${uniqueGsId}">
  
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="ui-resizable-handle ui-resizable-se" style="z-index: 100; user-select: none;">
            </div>
        </div>
    `;
  
    var gridStack = document.querySelector('.grid-stack');
    gridStack.innerHTML += codeToAdd;
    // Tăng giá trị biến đếm cho gs-x và gs-y
    gsXCounter++;
    gsYCounter++;  
  
    popup.style.display = 'none';
  });
  
  function getUniqueGsId() {
    var gsId = gsIdCounter.toString();
    var existingGsIds = Array.from(document.querySelectorAll('.grid-stack-item')).map(item => item.getAttribute('gs-id'));
  
    while (existingGsIds.includes(gsId)) {
        gsIdCounter++;
        gsId = gsIdCounter.toString();
    }
  
    return gsId;
  }
  
  function getUniqueGsXY() {
    var existingGsXValues = Array.from(document.querySelectorAll('.grid-stack-item')).map(item => parseInt(item.getAttribute('gs-x')));
    var existingGsYValues = Array.from(document.querySelectorAll('.grid-stack-item')).map(item => parseInt(item.getAttribute('gs-y')));
  
    while (existingGsXValues.includes(gsXCounter) && existingGsYValues.includes(gsYCounter)) {
        gsXCounter++;
        gsYCounter++;
    }
  }

