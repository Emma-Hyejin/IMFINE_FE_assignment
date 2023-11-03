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
function renderTotal () {
    renderGraph();
    renderTable();
    renderTextBox();
    console.log(dummyDatas);
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
        barItem.setAttribute('data-value', data.value);
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

//마우스 hover 시 해당 data.value 값 보이기 
document.getElementById('xList').addEventListener('mouseover', function(event){
    const target = event.target;
    if(target.classList.contains('bar_item')){
        //각 그래프 바의 data 값 가져오기
        const dataValue = target.getAttribute('data-value');

        //hover 시 data 표시 
        const hoverValue = document.getElementById('hoverValue');
        hoverValue.textContent = dataValue;
        hoverValue.style.left = event.clientX + 'px';
        hoverValue.style.top = (event.clientY + 30) + 'px'; 

        // console.log(hoverValue.style.left, hoverValue.style.top)
        hoverValue.classList.add('show');

    }
});

document.getElementById('xList').addEventListener('mouseout', function(event){
    const hoverValue = document.getElementById('hoverValue');
    hoverValue.classList.remove('show');
})


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
const addForm = document.getElementById('addForm');
const addIdInput = document.getElementById('addId');
const addValueInput = document.getElementById('addValue');

addForm.addEventListener('submit', function(event){
    event.preventDefault();

    //입력 값 가져오기 
    const id = addIdInput.value;
    const value = addValueInput.value;

    const numId = parseInt(id, 10);
    const numValue = parseInt(value, 10);

    //중복 ID 입력 방지
    const existingData = dummyDatas.find(data => data.id === numId);

    if( !id || !value ){
        alert('ID와 VALUE 를 입력하세요.');
        return;
    } else if ( isNaN(numId) || isNaN(numValue)){
        alert('숫자를 입력하세요.');
        return;
    }

    if(existingData){
        alert('이미 존재하는 ID 입니다.');
        return;
    }

    console.log(`${id} , ${value}`);

    dummyDatas.push({id: id, value: value});

    addIdInput.value = '';
    addValueInput.value = '';


    renderTotal();
});


//4. 값 고급 편집
const amendForm = document.getElementById('amendForm');
const amendInput = document.querySelector('.advanced_contents');

function renderTextBox () {
    const amendInput = document.querySelector('.advanced_contents');
    amendInput.textContent = JSON.stringify(dummyDatas, null, 4);
};


amendForm.addEventListener('submit', function(event){
    event.preventDefault();
    const contents = amendInput.value;

    try {
        const amendNewDatas = JSON.parse(`${contents}`);

        //유효성 검증
        if(!Array.isArray(amendNewDatas)){
            throw new Error('배열 에러');
        }

        amendNewDatas.forEach((data) => {
            //중복 ID 입력 방지
            const existingData = dummyDatas.find(element => element.id === data.id);

            //유효성 검증
            if(typeof data.id !== 'number' || typeof data.value !== 'number'){
                throw new Error ('숫자 데이터 에러');
            }

            if(!data.id && !data.value){
                throw new Error('미입력 에러');
            }

            if(existingData === data.id){
                throw new Error('중복 에러');
            }
        });

        dummyDatas = amendNewDatas;
        console.log('유효한 데이터', contents);

        renderTotal();
    } catch (err) {
       if(err.message === '숫자 데이터 에러') alert('ID와 VALUE 는 숫자로 입력해주세요.');
       if(err.message === '미입력 에러') alert('ID와 VALUE 모두 작성해주세요.');
       if(err.message === '중복 에러') alert('중복된 ID 입니다. ');
       if(err.message === '배열 에러') alert('데이터는 배열 형태여야 합니다. ');

       alert(`에러: ${err.message}`);
    }


});
