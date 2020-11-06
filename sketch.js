var  dog, dogImg, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var fod, milk, milkImg;

function preload()
{
  dogImg = loadImage("images/dog.png");
  happyDog = loadImage("images/dog1.png");
  milkImg = loadImage("images/milk.png")
}

function setup() {
  createCanvas(1000, 500);

  dog = createSprite(800,250);
  dog.addImage(dogImg);
  dog.scale= 0.3;

  fod = new Food(10,100);

  feed = createButton("Feed the dog");
  feed.position(700, 80);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,80);
  addFood.mousePressed(addFoods);

  database = firebase.database();
  
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  fedTime=database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed=data.val();
  })

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM", 300, 50);
  } else if(lastFed===0){
     text("Last Feed : 12AM", 350, 50);
  }else{
    text("Last Feed : "+ lastFed + "AM", 300, 50);
  }

  fod.display();

  drawSprites();

  textSize(17);
  fill("white");
  text("Food Remaining : " + foodS, 10,30);
}

function feedDog(){
  dog.addImage(happyDog);
  updateFood(foodS-1);
    FeedTime: hour();
    if(foodS<=0){
      foodS = 0;
    }
}

function addFoods(){
  dog.addImage(dogImg);
  foodS++;
  database.ref('/').update({
    Food : foodS
  })
}

function readStock(data){
  foodS = data.val();
}

function updateFood(food){
  database.ref('/').update({
    Food : food
  });
}

function writeStock(x){

  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}
