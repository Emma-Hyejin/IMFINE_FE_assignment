// 드롭다운 버튼을 클릭했을 때 이벤트 핸들러
document.querySelector(".dropdown-btn").addEventListener("click", function() {
    // 드롭다운 내용 요소를 가져옴
    var dropdownContent = document.querySelector(".dropdown-content");
    // 드롭다운 내용이 숨겨져 있는지 확인
    if (dropdownContent.style.display === "none") {
        // 숨겨져 있다면 보이게 변경
        dropdownContent.style.display = "block";
    } else {
        // 보이는 상태라면 숨김 block -> none;
        dropdownContent.style.display = "none";
    }
});