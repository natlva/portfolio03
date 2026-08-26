
//animation interaction on the home page

'use strict';

var tileCount = 7;
var actRandomSeed = 100;

var circleAlpha = 40;
var circleColor;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  noFill();

  canvas.position(0,0);
  canvas.style('z-index', '-4');

//  circleColor = color(0, 255, 0, circleAlpha);
// circleColor = color(0, 55, 180, circleAlpha);
 circleColor = color(0, 0, 76, circleAlpha);

 
 }



function draw() {
  translate(width / tileCount / 2, height / tileCount / 2);

  // background (254, 248, 234); 
   background(255 ,255, 255);

  randomSeed(actRandomSeed);

  stroke(circleColor);
  strokeWeight(mouseY / 90);

  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {

      var posX = width / tileCount * gridX +random(-20,20) ;
      var posY = height / tileCount * gridY +random(-20,20) ;



      var shiftX = random(-mouseX, mouseX) / 20;
      var shiftY = random(-mouseX, mouseX) / 20;

      ellipse(posX + shiftX, posY + shiftY, mouseY / random(5,15), mouseY / random(5,15));

    }
  }
}

function mousePressed() {
  actRandomSeed = random(100000);
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}
 



 

 // horozontal scroll
let options = document.querySelectorAll('.option')
  post1 = document.querySelector('#post1')
  post2 = document.querySelector('#post2')
  post3 = document.querySelector('#post3')
  post4 = document.querySelector('#post4')
    post5 = document.querySelector('#post5')
      post6 = document.querySelector('#post6')


 