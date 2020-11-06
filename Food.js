class Food {
    constructor(){
      this.foodStock = foodStock;
      this.lastFed = lastFed;
      this.image = loadImage("images/milk.png");
    }

    display(){
        var x=80;
        var y=100;
        imageMode(CENTER);
        image(this.image, 50, 180, 70, 70);

        for(var i=50; i <=500; i=i+50){
          milk = createSprite(i, 180);
          milk.addImage("milk", milkImg);
          milk.scale= 0.1;
        }

        for(var i=50; i <=500; i=i+50){
          milk = createSprite(i, 280);
          milk.addImage("milk", milkImg);
          milk.scale= 0.1;
        }
          
      }
}