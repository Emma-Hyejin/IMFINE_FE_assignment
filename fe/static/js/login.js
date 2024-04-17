// 버튼 클릭 
//submit는 form에다가 Event 추가
//제출 버튼은 input이어야함 
const loginFrom = document.querySelector("#loginForm");
const id = document.querySelector("#loginId1");
const pwd = document.querySelector("#loginPwd2");
const div = document.createElement("div");


function clickLogin (e) {
    e.preventDefault();
    console.log("로그인 버튼 클릭")
    const idValid = isValidId(id.value);
    const pwdValid = isValidPwd(pwd.value);
    console.log(idValid, pwdValid);

    if(!idValid && !pwdValid){
        console.log("둘다 실패")
        noneValidText("!둘다 실패")
    } else if (!pwdValid){
        console.log("비번 실패")
        noneValidText("!비번 실패")
    } else if (!idValid ){
        console.log("아이디 실패 ")
        noneValidText("!비번 실패")
    } else {
        console.log("로그인 성공")
        const validText = document.querySelector(".validText");
        validText.remove();
    }


};



function noneValidText (text) {
    //유효성 문구 출력 
    const h3Element = document.querySelector(".login-H3");
    div.classList.add("validText");
    div.textContent = text;

    h3Element.insertAdjacentElement("afterend", div); // 바로 근처 후방에 위치 

}

loginFrom.addEventListener("submit", clickLogin)

//아이디 유효성 
const idInput = document.querySelector(".login-Input");

function isValidId ( id ) {
    // 메일 형태 여부 확인 : /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{5,8}$/;
    const idResult = regex.test(id);
    console.log("ID 유효성 검증 ", idResult)
    return idResult;

}


function isValidPwd ( pwd ) {
    // 대문자 영문자로 시작하고, 총 5~8글자인지 확인합니다.
    const regex = /^[A-Za-z][A-Za-z0-9]{4,7}$/
    const isResult = regex.test(pwd);
    console.log("비밀번호 유효성 검증 ", isResult);
    return isResult;

}




