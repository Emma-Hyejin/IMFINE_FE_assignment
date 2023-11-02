//js 파일
//더미데이터
const dummyDatas = [
    {
        "id" : 0,
        "value" : 75,
    },
    {
        "id" : 1,
        "value" : 20,
    },
    {
        "id" : 2,
        "value" : 80,
    },
    {
        "id" : 3,
        "value" : 100,
    },
    {
        "id" : 4,
        "value" : 70,
    }
];

let yHeight = 14.5;
let xList = document.getElementById('xList');

dummyDatas.forEach( function(data) {
    let xItem = document.createElement('li');
    xItem.className = 'x_item';

    let xText = document.createElement('span');
    xText.className = 'x_text';
    xText.textContent = data.id;

    let xBar = document.createElement('div');
    xBar.className = 'x_bar';

    let barItem = document.createElement('span');
    barItem.className = 'bar_item';
    barItem.style.height = (data.value / yHeight * 100) + '%';
    // barItem.style.top = 100 - data.value + '%';

    //xItem >x_text
    //      >x_bar > bar_item
    xBar.appendChild(barItem);
    xItem.appendChild(xText);
    xItem.appendChild(xBar);

    xList.appendChild(xItem);
});


// 2. 값 변경 로직
dummyDatas.forEach( (data) => {
    let tbody = document.querySelector('.chart_table tbody');
    let row = document.createElement('tr');
    row.className = "chart_contents";

    let idPart = document.createElement('td');
    idPart.className = "chart_content id";
    idPart.textContent = data.id;

    let valuePart = document.createElement('td');
    valuePart.className = "chart_content value";
    valuePart.textContent = data.value;

    let etcPart = document.createElement('td');
    etcPart.className = "char_content etc";
    

    let deleteBtn = document.createElement('button');
    deleteBtn.className = "deleteBtn";
    deleteBtn.textContent = "삭제";

    etcPart.appendChild(deleteBtn);

    //row > idPart,valuePArt, etcPart
    row.appendChild(idPart);
    row.appendChild(valuePart);
    row.appendChild(etcPart);

    tbody.appendChild(row);
}); 

const deleteBtn = document.querySelectorAll('.deleteBtn');

deleteBtn.forEach((button) => {
    button.addEventListener('click', function(){
        const row = button.closest('tr');
        if(row){
            row.remove();
        }
    });
});