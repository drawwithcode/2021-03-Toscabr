let capture;
let mySong;
var analyzer;
var text


function preload(){
  mySong = loadSound("./assets/sound.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide();

  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);
}

function draw() {
var volume = 0;
background("pink")
fill(255)
noStroke()
ellipse(mouseX, mouseY, 260)

translate(windowWidth/2 + capture.width/2, windowHeight/2 - capture.height/2)
scale(-1,1);



// sound ------------------------

if (mySong.isPlaying() == false) {
  text = "Play"
} else {
text = "Stop"
}

button = createButton(text);
button.position(130, 320);
button.size(120, 80);
button.style('background-color', 'black');
button.style('stroke', 'none');
button.style('font-size', '40px');
button.style('color', 'white')
button.mousePressed(soundOn);

function soundOn() {
  if (mySong.isPlaying() == false) {
    mySong.play();
    text = "play"
  }
 else {
  mySong.stop();
  text = "stop"
}
}
volume = analyzer.getLevel();
volume = map(volume,0,1, 5, 280);

// end sound ------------------------





// webcam ------------------------

let gridSize = 10; // size of the image's "pixels" used as the increment in the for loop

capture.loadPixels() 

  for (let y=0; y<capture.height; y+=gridSize){
    for (let x=0; x<capture.width; x+=gridSize){
    
    let index = (y*capture.width + x) *4 //*pixels positions; 4= red, green, blue, alpha
    let r =capture.pixels[index]; //*
    let dia = map (r, 0, 255, gridSize, 0) //*
    let color = map (r, 50, 255, 0, 255) //*

    // *da tutorial https://www.youtube.com/watch?v=VYg-YdGpW1o&t=151s
    
    // white circle mode
    if (dist (-x+windowWidth/2 + capture.width/2, y+windowHeight/2 - capture.height/2,mouseX,mouseY) < 130){
    noFill()
      stroke("black")
      strokeWeight(dia)
      ellipseMode(CENTER)
    ellipse(x,y, 15, dia)
    }
    // music off mode
    else if (mySong.isPlaying() == false){
      fill("salmon")
      noStroke()
      ellipseMode(CENTER)
    ellipse(x,y, dia)
    }
    // music on mode
    else{
      fill(color)
      noStroke()
      ellipseMode(CENTER)
      ellipse(x+random(-volume, volume),y+random(-volume, volume), volume)
    }
  }
}

// end webcam ------------------------



}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }


 