import { gamemap } from "./map/GameMap.js"
import { kyo } from "./player/kyo.js";

class KOF{
    constructor(id){
        this.$kof = $('#' + id)
        this.gamemap = new gamemap(this);
        this.player = [
            new kyo(this,{
                hp:200,
                id:0,
                x:200,
                y:0,
                width:120,
                height:200,
                color:'red',
                direction:1
            }),
            new kyo(this,{
                hp:200,
                id:1,
                x:1000,
                y:0,
                width:120,
                height:200,
                color:'blue',
                direction:-1
            })
        ]
    }
}

export{
    KOF
}