$(document).ready(function () {
  // 커서
  let mouseCursor = document.querySelector(".cursor");
  let links = document.querySelectorAll("a, button");

  // 목표
  let targetX = 0,
    targetY = 0;
  // 현재
  let currentX = 0,
    currentY = 0;
  const followSpeed = 0.1; // 커서 속도

  // 커서의 left값과 top값을 커서의 XY 좌표값과 일치시킴
  function cursor(e) {
    targetX = e.pageX;
    targetY = e.pageY;
  }

  // 마우스 이동 시 cursor 함수 호출
  window.addEventListener("mousemove", cursor);

  // 커서에 애니메이션 적용
  // https://developer.mozilla.org/ko/docs/Web/API/Window/rㅋequestAnimationFrame
  function animateCursor() {
    currentX += (targetX - currentX) * followSpeed;
    currentY += (targetY - currentY) * followSpeed;

    // 스크롤 위치를 포함하여 커서 위치를 설정
    mouseCursor.style.left = currentX + "px";
    mouseCursor.style.top = currentY + "px";

    // 반복
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // 링크 및 버튼 호버 효과
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      mouseCursor.classList.add("cursor-hover");
    });
    link.addEventListener("mouseleave", () => {
      mouseCursor.classList.remove("cursor-hover");
    });
  });

  // header
  $(".btn-menu .open");

  $(".btn-menu .open").click(function (e) {
    $(".header").addClass("active");
    $("body").addClass("hidden");
  });

  $(".btn-menu .close").click(function (e) {
    $(".header").removeClass("active");
    $("body").removeClass("hidden");
  });

  let headerOriginal = new SplitType(".header .sub-item .original", {
    type: "chars",
  });
  let headerDummy = new SplitType(".header .sub-item .dummy", {
    type: "chars",
  });

  gsap.set('.header .nav',{autoAlpha:0})
  gsap.set('.sc-intro .group-top .headline .box', { yPercent: 100 });
  gsap.set('.sc-intro .group-top .space img', { yPercent: -150 });
  ScrollTrigger.create({
    trigger: '.sc-intro', 
    start: "-1% top", 
    end: "bottom bottom", 
    // markers:true,
    onEnter:function(){
      gsap.to('.sc-intro .group-top .headline .box', {
        yPercent: 0,
        duration: 1, 
      });
      gsap.to('.sc-intro .group-top .space img', {
        yPercent: 0,
        ease: "power3.out",
        delay: .4,
        duration: 1
      });
      gsap.to('.header .nav', {
        autoAlpha: 1,
        duration: 1,
        delay:.4,
      });
    },
  });
  ScrollTrigger.create({
    trigger: '.sc-intro', 
    start: "30% top", 
    end: "bottom bottom", 
    // markers:true,
    onEnter:function(){
      $('.header .logo').removeClass('active');
    },
    onLeaveBack:function(){
      $('.header .logo').addClass('active');
    }
  });

  ScrollTrigger.create({
    trigger: '.bright', 
    start: "top top", 
    end: "+=400%",
    markers:false, 
    toggleClass:{
      targets:".header",
      className:"convert"
    },
  });
}); // document ready
