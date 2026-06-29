let game_objects = [];

class game_object{
    constructor(){
        game_objects.push(this);

        this.timedelta = 0;
        this.has_call_start = false;
    }

    start(){ //仅在初始阶段执行一次

    }

    update(){ //除第一帧以外，每一帧都会执行

    }

    destore(){ //用来删除当前对象
        for(let i of game_objects){
            if(this === game_objects[i]){
                game_objects.splice(i,1);
                break;
            }
        }
    }
}

let last_timestamp = 0
let step = (timestamp) =>{
    for( let obj of game_objects){
        if(obj.has_call_start){
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
        else{
            obj.start();
            obj.has_call_start = true;
            last_timestamp = timestamp;
        }
    }
    last_timestamp = timestamp;
    requestAnimationFrame(step);
}

requestAnimationFrame(step);

export{
    game_object
}