// seq1Canvas 코드
const canvas = document.getElementById('seq1Canvas');
const ctx = canvas.getContext('2d');
const images = [];
const totalImages = 181;
let currentIndex = 0;

// 이미지 로드 함수
function preloadImages() {
  let loadedImagesCount = 0;

  for (let i = 0; i < totalImages; i++) {
    const img = new Image();
    img.src = `./asset/images/webp/seq1/${String(i).padStart(3, '0')}.webp`;
    images.push(img);

    // 이미지가 로드될 때마다 체크
    img.onload = () => {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages) {
        updateImage();
      }
    };
  }
}

// 이미지 업데이트 함수
function updateImage() {
  if (!images[currentIndex]) return; // 이미지가 로드되지 않았으면 리턴

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = images[currentIndex];
  const imgRatio = img.width / img.height;

  let newWidth = canvas.width;
  let newHeight = canvas.width / imgRatio;

  if (newHeight > canvas.height) {
    newHeight = canvas.height;
    newWidth = canvas.height * imgRatio;
  }

  const offsetX = (canvas.width - newWidth) / 2;
  const offsetY = (canvas.height - newHeight) / 2;

  ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
}

// GSAP ScrollTrigger 설정
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.create({
  trigger: '.sc-part',
  start: 'top center',
  end: 'bottom center',
  scrub: true,
  onUpdate: (self) => {
    currentIndex = Math.floor(self.progress * (totalImages - 1));
    updateImage();
  }
});

preloadImages();

// seq2Canvas 코드
const canvas2 = document.getElementById('seq2Canvas');
const ctx2 = canvas2.getContext('2d');
const images2 = [];
const totalImages2 = 141;
let currentIndex2 = 0;

// 이미지 로드 함수
function preloadImages2() {
  let loadedImagesCount = 0;

  for (let i = 0; i < totalImages2; i++) {
    const img = new Image();
    img.src = `./asset/images/webp/seq2/${String(i).padStart(3, '0')}.webp`;
    images2.push(img);

    // 이미지가 로드될 때마다 체크
    img.onload = () => {
      loadedImagesCount++;
      if (loadedImagesCount === totalImages2) {
        updateImage2();
      }
    };
  }
}

// 이미지 업데이트 함수
function updateImage2() {
  if (!images2[currentIndex2]) return; // 이미지가 로드되지 않았으면 리턴

  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

  const img = images2[currentIndex2];
  const imgRatio = img.width / img.height;

  let newWidth = canvas2.width;
  let newHeight = canvas2.width / imgRatio;

  if (newHeight > canvas2.height) {
    newHeight = canvas2.height;
    newWidth = canvas2.height * imgRatio;
  }

  const offsetX = (canvas2.width - newWidth) / 2;
  const offsetY = (canvas2.height - newHeight) / 2;

  ctx2.drawImage(img, offsetX, offsetY, newWidth, newHeight);
}

// GSAP ScrollTrigger 설정
ScrollTrigger.create({
  trigger: '.sc-free',
  start: 'top center',
  end: 'bottom center',
  scrub: true,
  onUpdate: (self) => {
    currentIndex2 = Math.floor(self.progress * (totalImages2 - 1));
    updateImage2();
  }
});

preloadImages2();
