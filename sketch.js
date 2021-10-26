var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;

var plinkos = [];
var divisions =[];

var divisionHeight=300;

var Count = 0;

var gameState = "start";

var Score = 0;

function preload(){

  backgroundImg = loadImage("Images/Background.jpg");

  getTime();
}

function setup() {
  createCanvas(800, 800);

  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //create division objects
  for (var k = 0; k <=800; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //create 1st row of plinko objects
 for (var j = 25; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //create 2nd row of plinko objects
  for (var j = 25; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //create 3rd row of plinko objects
  for (var j = 25; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }
  
  //create 4th row of plinko objects
  for (var j = 25; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

  wall1 = new Ground(797,400,10,1000);
  wall2 = new Ground(1,400,10,1000);
  
}

 function draw() {
  background(backgroundImg);

 
  Engine.update(engine);
  ground.display();
  
  //display the plinkos 
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //display the divisions
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  wall1.display();
  wall2.display();


  textSize(25);
  strokeWeight(0);
  fill("red");
  text("Score: " + Score, 20,30);
  text("You have only 5 chances to score the maximum score",  20,60);

  text("500", 20, 600);

  text("500", 100, 600);

  text("500", 180, 600);

  text("500", 260, 600);

  text("100", 330, 600);

  text("100", 410, 600);

  text("100", 490, 600);

  text("200", 575, 600);

  text("200", 655, 600);

  text("200",735, 600);


  if(particle!=null)
  {
    particle.display();

    if(particle.body.position.y > 750 && particle.body.position.x < 300 ){
        Score = Score + 500;
        particle = null;
        if(Count >5){
        gameState = "end";
        }
    } else if(particle.body.position.y > 750 && particle.body.position.x < 600){
        Score = Score + 100;
        particle = null;
        if(Count >5){
          gameState = "end";
        }
    } else if(particle.body.position.y > 750 && particle.body.position.x < 900){
        Score = Score + 200;
        particle = null;
        if(Count >5){
        gameState = "end";
        }
      }
    }

  if(gameState === "end"){

    textSize(40);
    fill("black");
    text("Game Over", 300,250);
  }
}

async function getTime (){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();
  console.log(responseJSON);

  var datetime = responseJSON.datetime;
  console.log(datetime);

  var hour = datetime.slice(11,13);
  console.log(hour);

  if(hour >= 06 && hour <= 19){
      bg = "Images/Background.jpg";
  }
  else {
      bg = "Images/background2.jpg";
  }
  backgroundImg = loadImage(bg);
}

function mousePressed()
{
  if(gameState!== "end"){
    particle = new Particles(mouseX,10);
    Count = Count + 1;
    gameState = "play";
  }
}