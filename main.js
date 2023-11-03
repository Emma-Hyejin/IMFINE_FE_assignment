//js 파일
//더미데이터
let dummyDatas = [
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
//최초 모든 함수 호출 
function renderTotal () {
    renderGraph();
    renderTable();
    // console.log(dummyDatas);
};

renderTotal();

function renderGraph(){
    const yHeight = 14.5;
    const xList = document.getElementById('xList');
    xList.innerHTML = '';

    dummyDatas.forEach( (data) => {
        const xItem = document.createElement('li');
        xItem.className = 'x_item';
    
        const xText = document.createElement('span');
        xText.className = 'x_text';
        xText.textContent = data.id;
    
        const xBar = document.createElement('div');
        xBar.className = 'x_bar';
    
        const barItem = document.createElement('span');
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
};


// 2. 값 변경 로직
function renderTable(){
    const tbody = document.querySelector('.chart_table tbody');
    tbody.innerHTML = '';

    dummyDatas.forEach( (data) => {
    
        const row = document.createElement('tr');
        row.className = "chart_contents";
        row.setAttribute('data-id', data.id);
    
        const idPart = document.createElement('td');
        idPart.className = "chart_content id";
        idPart.textContent = data.id;
    
        const valuePart = document.createElement('td');
        valuePart.className = "chart_content value";
        valuePart.textContent = data.value;
    
        const etcPart = document.createElement('td');
        etcPart.className = "char_content etc";
        
    
        const deleteBtn = document.createElement('button');
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "삭제";
    
        etcPart.appendChild(deleteBtn);
    
        //row > idPart,valuePArt, etcPart
        row.appendChild(idPart);
        row.appendChild(valuePart);
        row.appendChild(etcPart);
    
        tbody.appendChild(row);
    }); 

};

const deleteBtn = document.querySelectorAll('.deleteBtn');
const applyBtn = document.querySelector('.applyBtn');
const deleteArr = [];

deleteBtn.forEach((button) => {
    button.addEventListener('click', function(){
        const row = button.closest('tr');
        if(row){
            const id = parseInt(row.getAttribute('data-id'));
            deleteArr.push(id);
            row.remove();
        }
    });
});

applyBtn.addEventListener('click', function(){
    if(dummyDatas.length > 0 ){
        dummyDatas = dummyDatas.filter(data => !deleteArr.includes(data.id));
    } else {
        console.error('데이터가 없습니다. ');
    };

    renderTotal();
})

//3. 값 추가 로직
// const addBtn = document.querySelector('.applyBtn');
const form = document.querySelector('form');
const addIdInput = document.getElementById('addId');
const addValueInput = document.getElementById('addValue');

form.addEventListener('submit', function(event){
    event.preventDefault();

    //입력 값 가져오기 
    const id = addIdInput.value;
    const value = addValueInput.value;

    const numId = parseInt(id, 10);
    const numValue = parseInt(value, 10);

    if( !id || !value ){
        alert('ID와 VALUE 를 입력하세요.');
        return;
    } else if ( isNaN(numId) || isNaN(numValue)){
        alert('숫자를 입력하세요.');
        return;
    }

    console.log(`${id} , ${value}`);

    dummyDatas.push({id: id, value: value});

    addIdInput.value = '';
    addValueInput.value = '';


    renderTotal();
});