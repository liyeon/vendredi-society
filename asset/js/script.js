// 커서
let mouseCursor = document.querySelector(".cursor");
let links = document.querySelectorAll("a, button")
// 커서의 목표 위치와 현재 위치 변수 정의
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
const followSpeed = 0.1; // 커서가 목표 위치로 다가가는 속도

// 커스텀 커서의 left값과 top값을 커서의 XY 좌표값과 일치시킴
function cursor(e) {
	targetX = e.pageX;
	targetY = e.pageY - scrollY;
}

// window 객체에 scroll & mouse 이벤트를 추가하고 cursor함수 실행되도록 함
window.addEventListener("mousemove", cursor);
window.addEventListener("scroll", cursor); // 스크롤 시에도 커서 위치 업데이트



// 커서에 애니메이션 적용
// https://developer.mozilla.org/ko/docs/Web/API/Window/rㅋequestAnimationFrame
function animateCursor() {
	currentX += (targetX - currentX) * followSpeed;
	currentY += (targetY - currentY) * followSpeed;
	
	mouseCursor.style.left = currentX + "px";
	mouseCursor.style.top = currentY + "px";
	
	// 반복
	requestAnimationFrame(animateCursor);
}
animateCursor(); 

links.forEach(link => {
	link.addEventListener("mouseenter", () => {
			mouseCursor.classList.add("cursor-hover");
	});
	link.addEventListener("mouseleave", () => {
			mouseCursor.classList.remove("cursor-hover");
	});
});
