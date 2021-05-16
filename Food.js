class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Milk.png');
    }
  
   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }
  
   getFedTime(lastFed){
     this.lastFed=lastFed;
   }
  
   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }
  
    getFoodStock(){
      return this.foodStock;
    }
  
    display(){
      var x=80,y=100;

      var button = createButton("feed the dog")
      button.position(720,165)

      if(button.mousePressed(function(){
        foodS = foodS-1
        gameState = 1;
        database.ref("/").update({"gameState":gameState})
      }));

      var addFood = createButton("Add food ")
      addFood.position(830,165)
      if(addFood.mousePressed(function(){
        foodS = foodS+1
        gameState = 2;
        database.ref("/").update({"gameState":gameState})
      }));




      imageMode(CENTER);
      image(this.image,720,220,70,70);
      
     
    }
    bedroom(){
      background(bed,100,200)
    }

    garden(){
      background(gar,100,200)
    }

    washroom(){
      background(wash,100,200)

    }
  }