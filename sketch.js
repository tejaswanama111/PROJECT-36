var  dog, dogImg, happyDog, database, foodS, foodStock;
var fedTime, Lastfeed;
var fod, milk, milkImg;
var foodObj;

function preload()
{
  dogImg = loadImage("images/dog.png");
  happyDog = loadImage("images/dog1.png");
  milkImg = loadImage("images/milk.png")
}

function setup() {
	createCanvas(700, 700);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food();
  dog = createSprite(550,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED DRAGO MILK")
  feed.position(600,100);
  feed.mousePressed(FeedDog);
  add = createButton("ADD FOOD");
  
  add.position(400,100);
  add.mousePressed(AddFood);

} 

function draw(){
 background(46,139,87);

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);


 fedtime = database.ref('FeedTime')
 fedtime.on("value",function(data){ Lastfeed=data.val(); });
 if(Lastfeed>=12)
 {
   text("Last Fed :" + Lastfeed%12 + "PM", 150,100);
 }else if(Lastfeed ===0 )
 {
   text("Last Fed : 12 AM" , 150,100)
 }else
 {
   text("Last Fed :" + Lastfeed + "AM", 150,100);
 }

}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}
function AddFood(){
  dog.addImage(happyDog);
position++
database.ref('/').update({
  Food:position
}

)
}
function FeedDog(){

dog.addImage(dogImg);
foodobject.updateFoodStock(foodobject.getFoodStock()-1);
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime: hour()
 })
}
