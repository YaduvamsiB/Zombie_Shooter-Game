var gameState = 0;
var shooter, shooterImg;
var bg;
var bullet, bulletImg;
var zombie, zombie1Img, zombie2Img, zombie3Img;
var zombieGroup, bulletGroup;
var score = 0;
var h1, h2, h3;
var h1Img, h2Img, h3Img;
var explosionSound, winSound, loseSound;
var zombieWonImg,shooterWonIMg;

function preload() {
  shooterImg = loadImage("images/shooter_2.png");
  shootingImg = loadImage("images/shooter_3.png");

  bg = loadImage("images/bg.jpeg");

  zombie1Img = loadImage("images/z1.png");
  zombie2Img = loadImage("images/z2.png");
  zombie3Img = loadImage("images/z3.png");

  bulletImg = loadImage("images/bullet.png");

  h1Img = loadImage("images/heart_1.png");
  h2Img = loadImage("images/heart_2.png");
  h3Img = loadImage("images/heart_3.png");

  explosionSound = loadSound("images/explosion.mp3");
  winSound = loadSound("images/win.mp3");
  loseSound = loadSound("images/lose.mp3");

  zombieWonImg = loadImage("images/zombieWon.jpg");
  shooterWonIMg = loadImage("images/shooterWon.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  zombieGroup = createGroup();
  bulletGroup = createGroup();
  shooter = createSprite(100, 200, 50, 50);
  shooter.addImage("Shooter", shooterImg);
  shooter.scale = 0.3;

  h3 = createSprite(width - 150, 40, 20, 20);
  h3.addImage("h3Img", h3Img);
  h3.scale = 0.3;

  h2 = createSprite(width - 150, 40, 20, 20);
  h2.addImage("h2Img", h2Img);
  h2.scale = 0.3;
  h2.visible = false;
  h1 = createSprite(width - 150, 40, 20, 20);
  h1.addImage("h1Img", h1Img);
  h1.scale = 0.3;
  h1.visible = false;
}

function draw() {
  background(bg);

  if (keyDown("UP_ARROW")) {
    shooter.y = shooter.y - 5;
  }
  if (keyDown("DOWN_ARROW")) {
    shooter.y = shooter.y + 5;
  }
  if (keyWentDown("space")) {
    shooter.addImage("Shooter", shootingImg);
    createBullet();
  }
  if (keyWentUp("space")) {
    shooter.addImage("Shooter", shooterImg);
  }

  fill("red");
  textSize(20);
  text("Score: " + score, 50, 50);
  if (bulletGroup.isTouching(zombieGroup)) {
    for (var i = 0; i < zombieGroup.length; i++) {
      if (zombieGroup[i].isTouching(bulletGroup)) {
        zombieGroup[i].destroy();
        bulletGroup.destroyEach();
        score = score + 5;
        winSound.play();
      }
    }
  }
  createZombie();

  if (gameState === 0) {
    if (shooter.isTouching(zombieGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(shooter)) {
          zombieGroup[i].destroy();
          gameState = 1;
          h3.visible = false;
          h2.visible = true;
          h1.visible = false;
          explosionSound.play();
        }
      }
    }
  }

  if (gameState === 1) {
    if (shooter.isTouching(zombieGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(shooter)) {
          zombieGroup[i].destroy();
          gameState = 2;
          h3.visible = false;
          h2.visible = false;
          h1.visible = true;
          explosionSound.play();
        }
      }
    }
  }

  if (gameState === 2) {
    if (shooter.isTouching(zombieGroup)) {
      for (var i = 0; i < zombieGroup.length; i++) {
        if (zombieGroup[i].isTouching(shooter)) {
          zombieGroup[i].destroy();
          loseSound.play();
          gameState = 3;
          h3.visible = false;
          h2.visible = false;
          h1.visible = false;
        }
      }
    }
  }
  if (gameState === 3) {
    background(zombieWonImg);
    zombieGroup.destroyEach();
    shooter.destroy();
    bulletGroup.destroyEach();

    push();
    fill("yellow");
    textSize(25);
    text("GAME OVER!!", width / 2 - 100, height / 2);
    text("Your Score: " + score, width / 2 - 110, height / 2 + 50);
    text("Press 'r' to restart", width / 2 - 120, height / 2 + 100);

    pop();
    if (keyDown("r")) {
      window.location.reload();
    }
  }
  if (score === 50) {
    background(shooterWonIMg);
    zombieGroup.destroyEach();
    shooter.destroy();
    bulletGroup.destroyEach();
    fill("green");
    textSize(250);
    text("YOU WON", width / 2 - 600, height / 2);
  }

  drawSprites();
}

function createBullet() {
  bullet = createSprite(shooter.x + 45, shooter.y - 25, 10, 10);
  bullet.velocityX = 5;
  bullet.scale = 0.07;
  bullet.addImage("bullet", bulletImg);
  bulletGroup.add(bullet);
}

function createZombie() {
  if (frameCount % 100 === 0) {
    zombie = createSprite(
      Math.round(random(width / 2, width)),
      Math.round(random(40, height - 40)),
      20,
      20
    );

    zombie.velocityX = -2;
    zombieGroup.add(zombie);
    var r = Math.round(random(1, 3));

    switch (r) {
      case 1:
        zombie.addImage("1", zombie1Img);
        zombie.scale = 0.05;
        break;
      case 2:
        zombie.addImage("2", zombie2Img);
        zombie.scale = 0.1;
        break;
      case 3:
        zombie.addImage("3", zombie3Img);
        zombie.scale = 0.16;
        break;
      default:
        break;
    }
  }
}
