//새로운 데이터 추가하기 
const listUl = document.querySelector(".todo-lists");
const newInput = document.querySelector("#newInput");
const newBtn = document.querySelector(".addBtn");
const listArr = [];

function createDomNewList (newTodo) {
    const li = document.createElement("li");
    const checkBox = document.createElement("input");
    const p = document.createElement("p");
    const deleteButton = document.createElement("button");
    const amendButton = document.createElement("button");
    p.textContent = newTodo;
    deleteButton.textContent = "삭제";
    amendButton.textContent = "수정"; //innerHTML
    
    // Event 추가 
    deleteButton.addEventListener("click", deleteData);
    amendButton.addEventListener("click", amendData);
    checkBox.addEventListener("change", clearList)
    

    //클래스 추가
    li.classList.add("list");
    checkBox.classList.add("checkItem");
    checkBox.type = "checkbox";
    checkBox.id = `listCheckBox${listArr.length + 1}`
    p.classList.add("list-text");
    deleteButton.classList.add("listBtn", "deleteList");
    amendButton.classList.add("listBtn", "amendList");

    li.appendChild(checkBox);
    li.appendChild(p);
    li.appendChild(deleteButton);
    li.appendChild(amendButton);
    listUl.appendChild(li);

}

function clickAddNewBtn (e) {
    e.preventDefault();
    const newTodo = newInput.value;
    createDomNewList(newTodo);
    listArr.push(newTodo);
    checkEmptyList(); 
    newInput.value = "";
}

newBtn.addEventListener("click", clickAddNewBtn);

//데이터가 없을 경우 
const listContainer = document.querySelector(".todo-datas");

function checkEmptyList () {
    const emptyMsg = document.querySelector(".emptyList");
    if(listArr.length === 0) {
        const div = document.createElement("div");
        div.textContent = "새로운 할일을 등록해주세요! :) ";
        div.classList.add("emptyList");
        listContainer.appendChild(div);
    } else {
        //css 속성 없애기 
        if(emptyMsg){
            emptyMsg.remove();
        }

    }
};

//페이지 첫 로드 될 때 리스트 확인 
document.addEventListener("DOMContentLoaded", function(){
    checkEmptyList();
    prevList();
});


//기존 배열에 데이터가 있을 경우 
function prevList(){
    listArr.forEach(todo => {
        createDomNewList(todo);
    })
}

//데이터 수정 및 삭제
function deleteData (e){
    e.preventDefault();
    const clickListItem = e.target.parentElement; //눌려진 버튼의 부모 요소. 
    const result = confirm("정말 삭제하시겠습니까?"); 
    console.log("삭제 버튼 클릭");
    if(result){
        //확인
        clickListItem.remove();
    } else if (!result){
        //취소
        return;
    }

};

//수정 기능 보류 
function amendData (e){
    e.preventDefault();
    console.log("수정 버튼 클릭");
    const listItem = e.target.closest(".list");
    const textElement = listItem.querySelector(".list-text");
    const previousText = textElement.textContent;
    const inputElement = document.createElement("input");
    inputElement.value = textElement.textContent;

    //p 태그를 감추고 input 태그 보이도록 
    textElement.classList.add("edit-mode");
    textElement.after(inputElement);
    textElement.style.display = "none";

    //input 태그에 포커스를 주고 완료 이벤트 설정 
    inputElement.focus();

    //input 태그의 값이 변경되면 newText에 새로운 값이 할당 
    inputElement.addEventListener("input", () => {
        newText = inputElement.value;
    });

    //Enter 시 빈 텍스트의 할일이 추가되어서 이를 막아주는 코드 작성 
    inputElement.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            inputElement.blur(); //수정을 완료하고 포커스를 해제 
        }
    })

    //input에서 focus 빠져나가면 
    inputElement.addEventListener("blur", () => {
        const newText = inputElement.value;
        if(newText !== null && newText !== ""){
            textElement.textContent = newText;
            
        }else {
            //수정을 취소하거나 빈 문자열을 입력 한 경우 
            textElement.textContent = previousText;
        };


        //input -> p 태그로 변환 
        inputElement.remove();
        textElement.style.display = "block";

    });  

};


//할 일 클리어 - 체크박스
function clearList (e) {
    // e.preventDefault();
    const isCheck = e.target.checked;
    const relatedList = e.target.closest(".list");
    const relatedText = relatedList.querySelector(".list-text");

    if(isCheck){
        relatedText.classList.add("clearList");
    } else if(!isCheck){

        relatedText.classList.remove("clearList")


    }
};

