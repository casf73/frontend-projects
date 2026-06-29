import { player } from "./player.js";
import {GIF} from "/static/js/utils/gif.js"

class kyo extends player{
    constructor(root,info){
        super(root,info);

        this.init_animations();
    }

    init_animations(){
        let outer = this;
        for(let i = 0; i<7 ;i++){
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`)
            this.animations.set(i,{
                gif:gif,
                frame_cnt:0,
                frame_rate:5,
                loaded:false,
                scale:2.5,
                frame_current_cnt:0,
            });
            gif.onload = ()=>{
                let obj = outer.animations.get(i);
                obj.frame_cnt = gif.frames.length;
                obj.loaded = true;
                if(i === 3) obj.frame_rate = 8;
            }
        }
    }
}



export{
    kyo
}