class Player {
    constructor() {
        this.index = null;
        this.distance = 0;
        this.name = null;
        this.score =0   
    }

    getCount() {
        var playerCountRef = database.ref('playerCount');
        playerCountRef.on("value", (data) => {
            playerCount = data.val();
        })
    }
    async getPlayerCount(){
        var playerCountRef = await database.ref('playerCount').once("value");
        if (playerCountRef.exists()) {
            playerCount = playerCountRef.val();
        }
    }
    updateCount(count) {
        database.ref('/').update({
            playerCount: count
        });
    }

    update(i) {
        var playerIndex = "players/player" + i;
        database.ref(playerIndex).set({
            name: this.name,
            distance: this.distance,
            score:this.score
        
        });
    }
    resetUpdate(i) {
        var playerIndex = "players/player" + i;
        database.ref(playerIndex).update({
            distance:0,
            name:"",
            score:0 
        });
    }
    
    static getPlayerInfo() {
        var playerInfoRef = database.ref('players');
        playerInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }

    
}
