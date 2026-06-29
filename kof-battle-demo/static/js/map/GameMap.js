import { game_object } from "../game_objects/game_objects.js";
import { controller } from "../controller/controller.js";

class gamemap extends game_object{
    constructor(root){
        super();

        this.root = root;
        this.$canvas = $(`<canvas  tabindex='0' width="1280" height="720"></canvas>`)
        this.root.$kof.append(this.$canvas);//把画布挂载到容器上
        this.$canvas.focus();
        this.ctx = this.$canvas[0].getContext('2d');
        this.controller = new controller(this.$canvas)

        this.time_left = 61000
        this.$time = this.root.$kof.find(`.gamebox-head-timer`)
    }

    start(){

    }

    update(){
        this.time_left -= this.timedelta;
        if(this.time_left <= 0 ){
            this.time_left = 0;
            setTimeout(() => {
                alert('游戏结束')
            }, 10);
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
        this.$time.text(parseInt(this.time_left / 1000));
        this.render();
    }

    render(){ //每一帧的操作
        this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
    }
}

export{
    gamemap
}