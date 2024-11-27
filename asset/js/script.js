gsap.defaults({
  ease: "none",
});
const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
const MAX_WIDTH = 767;
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
    targetX = e.clientX;
    targetY = e.clientY;
  }

  // 마우스 이동 시 cursor 함수 호출
  window.addEventListener("mousemove", cursor);

  // 커서에 애니메이션 적용
  // https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame
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

  $(".sub-item a").click(function (e) {
    $(".header").removeClass("active");
    $("body").removeClass("hidden");
  });

  gsap.set(".header .nav", { autoAlpha: 0 });
  gsap.set(".sc-intro .group-intro .headline .box", { yPercent: 100 });
  gsap.set(".sc-intro .group-intro .top-area .space img", { yPercent: -150 });
  ScrollTrigger.create({
    trigger: ".sc-intro",
    start: "-1% top",
    end: "bottom bottom",
    // markers:true,
    onEnter: function () {
      gsap.to(".sc-intro .group-intro .headline .box", {
        yPercent: 0,
        duration: 1,
      });
      gsap.to(".sc-intro .group-intro .top-area .space img", {
        yPercent: 0,
        ease: "power3.out",
        delay: 0.4,
        duration: 1,
      });
      gsap.to(".header .nav", {
        autoAlpha: 1,
        duration: 1,
        delay: 0.4,
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".sc-intro .group-intro .top-area",
    start: "80% top",
    end: "bottom bottom",
    // markers:true,
    onEnter: function () {
      $(".header .logo").removeClass("active");
    },
    onLeaveBack: function () {
      $(".header .logo").addClass("active");
    },
  });

  
  let mm = gsap.matchMedia();

  mm.add(`(min-width: ${MAX_WIDTH}px)`, () => {
    const introBottom = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-intro",
        start: "top top",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
      },
    });

    gsap.set('.sc-intro .group-intro .media-wrap .box',{yPercent:400});
    gsap.set('.sc-intro .group-intro .media-wrap .box2',{rotate:20});
    gsap.set('.sc-intro .group-intro .media-wrap .box3',{rotate:-20});
    introBottom
      .to(".sc-intro .group-intro .top-area",1, { "--height": 0 },'a')
      .to(".sc-intro .group-intro .bottom-area",1, { "--width": 0 }, "a+=0.5")
      .to('.sc-intro .group-intro .media-wrap .box1',1.2,{
        xPercent:30,
        yPercent:-300,
        rotate:30},'a+=0.2')
      .to('.sc-intro .group-intro .media-wrap .box2',1.2,{
        xPercent:20,
        yPercent:-300,
        rotate:-30},'a+=0.2')
      .to('.sc-intro .group-intro .media-wrap .box3',1.2,{
        xPercent:-90,
        yPercent:-300,
        rotate:20},'a+=0.2')
        
    const introRight = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-right",
        start: "top top",
        end: "+=100%",
        scrub: 0,
        //markers: true,
				pin:true,
				invalidateOnRefresh:true,
      },
    });

    introRight
		.to(".sc-intro .group-right", {x:0})

    const introRight2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-intro",
        start: `100%+=${window.innerHeight} 0%`,
        endTrigger: ".group-garder",
        end: "top bottom",
        scrub: 0,
      },
    });

    introRight2
		.to(".sc-intro .group-right p .char", {
      opacity: 1,
      stagger: 1,
    });

    const introGarder = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-intro .group-garder",
        start: "-10% top",
        end: "bottom -50%",
        scrub: 1,
        markers: false,
        onLeaveBack:function(){
          $('.sc-intro .group-garder').removeClass('on')
        }
      },
    });
		$('.sc-intro .group-garder .char').each(function(i,el){
			gsap.set(this,{x:1655*(i+1),rotate:25*(i+1)});
		})

    introGarder
		.to(".sc-intro .group-garder svg", { rotate: 0,

		},'a')
      .to(".sc-intro .group-garder .char", { rotate: 0,x:0,stagger:0.001,
				onComplete: function() {
					$('.sc-intro .group-garder').addClass('on')
				},
			},'a')
      .to(".sc-intro .group-garder svg", { rotate:-180,scale:4,
				onReverseComplete: function() {
					$('.sc-intro .group-garder').removeClass('on')
				},
			 },'b')
      .to(".sc-intro .group-garder h3", { scale:1.5 },'b')
      .to('.sc-intro .group-garder .char',{visibility:'hidden',stagger:0.1});
      
      const introChange = gsap.timeline({
        scrollTrigger: {
          trigger: ".sc-intro .group-change",
          start: "top center",
          end: "bottom bottom",
          scrub: 0,
          markers: false,
        },
      });
      introChange.to(".sc-intro .group-change .line", { 
        '--wordY':'0',
        stagger:0.1,
        duration: 0.1, 
        ease: "power2.out", 
      })
    ScrollTrigger.create({
      trigger: ".sc-part",
      start: "top center",
      end: "bottom center",
      onUpdate: (self) => {
        const index = Math.floor(self.progress * (181 - 1));

        seq1.setCurrentIndex(index);
				// self.progress*3
				//
        // $(".part-wrap").removeClass("on");
        // if (index < 60) {
        //   $(".part-wrap1").addClass("on");
        // } else if (index >= 60 && index < 120) {
				// 	$(".part-wrap2").addClass("on");
        // } else if (index >= 120) {
				// 	$(".part-wrap3").addClass("on");
        // }

				// 초기화
$(".part-wrap").removeClass("on");

// index 값에 따라 처리
const sections = [
  { min: 0, max: 60, class: ".part-wrap1" },
  { min: 60, max: 120, class: ".part-wrap2" },
  { min: 120, max: Infinity, class: ".part-wrap3" }
];

// 반복문으로 클래스 추가
sections.forEach(section => {
  if (index >= section.min && index < section.max) {
    $(section.class).addClass("on");
  }
});
      },
    });

    ScrollTrigger.create({
      trigger: ".sc-vous",
      start: "top 20%",
      end: "bottom bottom",
      // markers:true,
      onEnter: function () {
        gsap.to(".trans1, .trans2", { top: "-120%" });
      },
      onLeaveBack: function () {
        gsap.to(".trans1, .trans2", { top: 0 });
      },
    });
    gsap.set(".sc-free .tant span", {
      y: 94,
      rotate: -8.7636,
      scale: "1,1.4",
      opacity: 0,
    });
    const free = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-free",
        start: "top -40%",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
        onUpdate: (self) => {
          const index = Math.floor(self.progress * (141 - 1));
          seq2.setCurrentIndex(index);
        },
      },
    });

    free
      .to(".sc-free .clip", {
        "--width": "100%",
        "--height": "100%",
        "border-radius": 0,
        duration: 3,
      })
      .to(".sc-free .clip-area .up", { "--y": "-80vh", duration: 2 }, "-=0.1")
      .to(".sc-free .tant span", {
        y: 0,
        rotate: 0,
        scale: "1,1",
        opacity: 1,
        stagger: 1,
				// stagger: {
				// 	each:1,
				// 	amount:1,
				// },
      })
      .to(
        ".sc-free .tant",
        {
          "--line": "100%",
          duration: 20,
        },
        "<"
      );
    const company = gsap.timeline({
      scrollTrigger: {
        trigger: ".sc-company",
        start: "top 20%",
        end: "bottom bottom",
        scrub: 0,
        markers: false,
      },
    });
    company.to(".sc-company .card-list", {
      xPercent: -100,
      x: function () {
        return window.outerWidth;
      },
    });
  });

  const footer = gsap.timeline({
    scrollTrigger: {
      trigger: ".footer",
      start: "top 30%",
      end: "bottom bottom",
      scrub: 0,
      markers: false,
    },
  });
  footer.to(".footer h3 span", { "--y": 0 });

  $(".sc-fait .tab-item button").click(function (e) {
    e.preventDefault();
    const tabName = $(this).parent().data("tab");
    console.log(tabName);
    $(this).parent().addClass("active").siblings().removeClass("active");
    $(tabName).addClass("on").siblings().removeClass("on");
  });

}); // document ready

let headerOriginalTxt = new SplitType(".header .sub-item .original", {
  type: "chars",
});
let headerDummyTxt = new SplitType(".header .sub-item .dummy", {
  type: "chars",
});
let introRightTxt = new SplitType(".sc-intro .group-right p", {
  type: "chars",
});
let introChangeTxt = new SplitType(".sc-intro .group-change .ok", {
  type: "line",
});

$(".sc-intro .group-right .line").each(function() {
  $(this).css({
    "display": "inline-block",
    "width": "auto"
  });
});
$(".btn-top").click(function (e) {
  $("html, body").animate({ scrollTop: 0 }, 400);
  return false; // 클릭 시 기본 동작 방지
});
