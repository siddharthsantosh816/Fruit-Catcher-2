class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    start() {
        player = new Player();
            if (gameState === 0 ) {
               // player = new Player();
               form = new Form;
                // var playerCountRef = await database.ref('playerCount').once("value");
                // if (playerCountRef.exists()) {
                //     playerCount = playerCountRef.val();
                //     console.log(playerCount)
                //     player.getCount();
                //   console.log(playerCount)
                // }
               
                  //  console.log(playerCount)
                    form.display();
                
            }
    basket1 = createSprite(200,500);
    basket1.addImage("basket1",basket_img);
    
    basket2 = createSprite(800,500);
    basket2.addImage("basket2", basket_img);
  //  players=[basket1,basket2];

    }
    
    play(){
        if(form) {
            form.hide();
        }
        players=[basket1,basket2];
        Player.getPlayerInfo();
       
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();

        for(var plr in allPlayers){
        
            index = index+1;
            x = allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x+500;
            players[index - 1].y = y;
            var playerIndex= "player"+[index];
            //console.log(plr, playerIndex);
            if(plr === playerIndex){
                // console.log(allPlayers[plr].name)
                   fill("black");
                   textSize(25);
                   textAlign(CENTER)           
                   text(allPlayers[plr].name,x+500,y+20);          
               }
            textSize(20);
            fill("white");  
            Name1 =  allPlayers.player1.name;
            Name2 = allPlayers.player2.name  ;     
            text(Name1 +" : " +allPlayers.player1.score,70,40);
            text(Name2 +" : " +allPlayers.player2.score,70,80);
        }
        
    
        // Give movements for the players using arrow keys
        if(keyIsDown(RIGHT_ARROW) && player.index!==null){
            player.distance+=10;
            player.update(player.index );
        }

        if(keyIsDown(LEFT_ARROW) && player.index!==null){
            player.distance-=10;
            player.update(player.index );
        }


        // Create and spawn fruits randomly
        if(frameCount % 30===0){
            fruits=createSprite(random(100,1000),0,100,100);
            fruits.velocityY=6;
            var rand=Math.round(random(1,5));
            switch(rand){
                case 1: fruits.addImage("fruit1",fruit1_img);
                break;
                case 2: fruits.addImage("fruit1",fruit2_img);
                break;
                case 3: fruits.addImage("fruit1",fruit3_img);
                break;
                case 4: fruits.addImage("fruit1",fruit4_img);
                break;
                case 5: fruits.addImage("fruit1",fruit5_img);
                break;
                
            }
            fruitGroup.add(fruits);
        }
        if (player.index !== null) {
            for(var i = 0; i < fruitGroup.length; i++){
                if(fruitGroup.get(i).isTouching(players)){
                    fruitGroup.get(i).destroy();
                    player.score++
                    player.update(player.index );
                }
            }
        }          
      if(player.score>=10){
         // this.end();
         gameState = 2;
         basket1.destroy();
         basket2.destroy();
      }     
    }

    end(){
        game.update(2);
        clear();
        for (var i=1; i<=2;i++){
            var playerIndex = "players/player"+i;
            database.ref(playerIndex).on("value",(data) => {
                score[i-1] = data.val();
            })
        }
        if (score[0]> score[1]) {
            winner = Name1
        } else {
            winner = Name2
        }
        playerCount=0
        form.show();
        fill("blue");
        textSize(40);
        text("Game Over",350,200);
        fil("green");
        text("The Winner is: "+winner,220,300)
        textSize(30);
        fill("red");
        text("Press Reset button to Reset the Database",190,400);
        text("Refresh the screen before starting the game", 180,460);
               
      // console.log("Game Ended");
    }
}