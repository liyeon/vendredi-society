// 캔버스 및 이미지 설정 함수
function setupCanvas(canvasId, imagePath, totalImages) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');
  const images = [];
  let currentIndex = 0;

  // 이미지 로드 함수
  function preloadImages() {
    let loadedImagesCount = 0;

    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      img.src = `${imagePath}/${String(i).padStart(3, '0')}.webp`;
      images.push(img);

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
    if (!images[currentIndex]) return;

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

  // 외부에서 접근 가능한 함수 반환
  return {
    preloadImages,
    updateImage,
    setCurrentIndex(index) {
      currentIndex = index;
      updateImage();
    }
  };
}

const seq1 = setupCanvas('seq1Canvas', './asset/images/webp/seq1', 181);
const seq2 = setupCanvas('seq2Canvas', './asset/images/webp/seq2', 141);

// 이미지 호출
seq1.preloadImages();
seq2.preloadImages();


ScrollTrigger.create({
  trigger: '.sc-part',
  start: 'top center',
  end: 'bottom center',
  scrub: true,
  onUpdate: (self) => {
    const index = Math.floor(self.progress * (181 - 1));
    seq1.setCurrentIndex(index);
  }
});

ScrollTrigger.create({
  trigger: '.sc-free',
  start: 'top center',
  end: 'bottom center',
  scrub: true,
  onUpdate: (self) => {
    const index = Math.floor(self.progress * (141 - 1));
    seq2.setCurrentIndex(index);
  }
});
