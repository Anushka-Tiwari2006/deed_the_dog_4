var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var readState,changeState
var bed,wash,gar
var gameState = 0;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happydog.png");
mImage = loadImage("women3.png");
fImage = loadImage("father3.png");
bImage = loadImage("boy.png");
babyImg = loadImage("baby.png");
back = loadImage("back.jpg");
milk = loadImage("milky.png");
bed = loadImage("Bed Room.png");
wash = loadImage("Washroom.png");
gar = loadImage("Garden.png");
milk2 = loadImage("milk.png");
living = loadImage("Living Room.png")
}

function setup() {
  database=firebase.database();
  createCanvas(700,700);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(480,600,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  mom = createSprite(80,420,30,30);
  mom.addImage(mImage);
  mom.scale =0.7;

  baby = createSprite(100,600,30,30);
  baby.addImage(babyImg);
  baby.scale =0.5;

  boy = createSprite(300,600,30,30);
  boy.addImage(bImage);
  boy.scale =0.65;

   papa = createSprite(350,400,30,30);
  papa.addImage(fImage);
  papa.scale =0.8;

  milky = createSprite(450,650,30,30)
  milky.visible = false
  
  
   stroke("black")
   strokeWeight(2)

 
  readState = database.ref('gameState')
  readState.on("value",function(data){
    gameState = data.val()
  })
  
  

}

function draw() {
  background(back);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(20);
  if(lastFed>=12){
    textFont("oblique")
    fill("magenta");
    text("Last Feed : "+ lastFed%12 + "PM", 10,100);
   }else if(lastFed==0){
    textFont("oblique")
     fill("magenta")
     text("Last Feed : 12 AM",10,100);
   }else{
    textFont("oblique")
     fill("magenta");
     text("Last Feed : "+ lastFed + "AM", 10,100);
   }
   fill("lightgreen")
   textSize(30);
   text("Pet Care",300,30)
   stroke("white")
   line(280,35,440,35)

   




  if(foodS == 0){
    dog.addImage(happyDog)
    milk2.visible = false;
  }
  else{
    dog.addImage(sadDog)
    milk2.visible = true;
  }

  if(gameState === 1){
    dog.addImage(happyDog)
    dog.scale = 0.175
    dog.y = 650
    milk2.visible = true;
    mom.visible = true
     papa.visible = true
     boy.visible = true
     baby.visible = true
  }

  if(gameState === 2){
    dog.addImage(sadDog)
    dog.scale = 0.175
    milk2.visible = true;
    dog.y = 650;
    milk2.visible = true;
    mom.visible = true
     papa.visible = true
     boy.visible = true
     baby.visible = true
  }

  var Bath = createButton("I want to take bath")
  Bath.position(580,125)
  if(Bath.mousePressed(function(){
    gameState = 3
    database.ref("/").update({"gameState":gameState})
    mom.visible = false
     papa.visible = false
     boy.visible = false
     baby.visible = false
    
  }));
  if(gameState ===3){
    dog.addImage(wash)
    dog.scale = 1;
    milk2.visible = false;
    mom.visible = false
     papa.visible = false
     boy.visible = false
     baby.visible = false
     background("black")
  }

  var Sleep = createButton("I am very Sleepy")
  Sleep.position(720,125)
  if(Sleep.mousePressed(function(){
    gameState = 4
    database.ref("/").update({"gameState":gameState})
    mom.visible = false
     papa.visible = false
     boy.visible = false
     baby.visible = false
     
    
  }));
  if(gameState === 4){
    dog.addImage(bed)
    dog.scale = 1;
    milk2.visible = false;
    mom.visible = false
     papa.visible = false
     boy.visible = false
     baby.visible = false
     background("black")
  }

  var Play = createButton("Let's Play!!!")
  Play.position(850,125)
  if(Play.mousePressed(function(){
    gameState = 5
    database.ref("/").update({"gameState":gameState})
    mom.visible = false
     papa.visible = false
     boy.visible = false
     baby.visible = false
     background("black")
     
    
  }));
  if(gameState === 5){
    dog.addImage(living)
    dog.scale = 1;
    milk2.visible = false;
    background("black")
  }

  var Play2 = createButton("Let's play in park")
  Play2.position(580,165)
  if(Play2.mousePressed(function(){
    gameState = 6
    database.ref("/").update({"gameState":gameState})
     background("black")
    
  }));
  if(gameState === 6){
    dog.addImage(gar)
    dog.y = 175;
    dog.scale = 1;
    milk2.visible = false;
     background("black")
  }
  text("Food : ",+ foodS, 500,300)
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  milky.addImage(milk)
  milky.scale = 0.12
  milky.visible = true


  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref("/").update({
    gameState:state});

}

function readStock(){
  foodS = data.val();
}

function writeStock(){
  database.ref("/").update({
    food:x
  })
}