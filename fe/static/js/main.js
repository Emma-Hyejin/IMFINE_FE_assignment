//새로운 데이터 추가하기 
const listUl = document.querySelector(".todo-lists");
const newInput = document.querySelector("#newInput");
const newBtn = document.querySelector(".addBtn");
const listArr = [];

function createDomNewList (newTodo) {
    console.log(newTodo);
    const li = document.createElement("li");
    const p = document.createElement("p");
    const deleteButton = document.createElement("button");
    const amendButton = document.createElement("button");
    p.textContent = newTodo;
    deleteButton.textContent = "삭제";
    amendButton.textContent = "수정";
    
    //클래스 추가
    li.classList.add("list");
    p.classList.add("list-text");
    deleteButton.classList.add("listBtn", "deleteList");
    amendButton.classList.add("listBtn", "amendList");

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
        emptyMsg.remove();
    }
};

//페이지 첫 로드 될 때 리스트 확인 
document.addEventListener("DOMContentLoaded", function(){
    checkEmptyList();
});
