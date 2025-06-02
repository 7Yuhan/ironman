let imgs = [];
let imgPaths = ['1.png', '2.png', '3.png', '4.png','5.png','6.png','7.png','8.png','9.png']; // 替换为你自己的图片路径
let currentIndex = 0;
let nextIndex = 1;

let alphaCurrent = 255;
let alphaNext = 0;
let isTransitioning = false;

let started = false;

let pressedS = false;
let ellipseX = 0;
let ellipseY = 0;

function preload() {
  for (let path of imgPaths) {
    imgs.push(loadImage(path));
  }
}

function setup() {
  createCanvas(600, 900);
  noCursor();
}

function draw() {
  if (started)
  {
    background(0, 20);
  
  textAlign(CENTER, TOP);
  fill(100,100,100);
  textSize(60);
  text("MARK " + currentIndex.toString(), width/2, 20);

  if (imgs[currentIndex]) {
    tint(255, alphaCurrent);
    image(imgs[currentIndex], 0, 0, width, height);
  }

  if (isTransitioning && imgs[nextIndex]) {
    tint(255, alphaNext);
    image(imgs[nextIndex], 0, 0, width, height);

    alphaCurrent -= 5;
    alphaNext += 5;

    if (alphaCurrent <= 0 && alphaNext >= 255) {
      // 完成切换
      alphaCurrent = 255;
      alphaNext = 0;
      currentIndex = nextIndex;
      nextIndex = (currentIndex + 1) % imgs.length;
      isTransitioning = false;
    }
  }
  }
  else
  {
    background(0, 20);
    textAlign(CENTER, TOP);
    fill(255,255,255);
    textSize(50);
    text("Press To Start! \n Press [S] To Fix Light!", width/2, 20);
  }

  // Lightight
      
  noStroke();

  blendMode(ADD);

  if (!pressedS) {
    ellipseX = mouseX;
    ellipseY = mouseY;
  }

  for (let r = 100; r > 0; r -= 10) {
    let alpha = map(r, 100, 0, 0, 200);
    if (pressedS) {
      fill(0, 173, 216, alpha);
    }
    else
    {
      fill(255, 0, 0, alpha);
    }
    
    ellipse(ellipseX, ellipseY, r, r);
  }

  blendMode(BLEND);
}

function mousePressed() {
  if (! started)
  {
    started = true;
  }
  
  if (!isTransitioning && started) {
    isTransitioning = true;
    pressedS = false;
  }
}

function keyPressed() {
  if (key === 's' || key === 'S') { // 检测小写或大写 S
    pressedS = true;
  }
}