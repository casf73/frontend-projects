import { game_object } from "../game_objects/game_objects.js";

class player extends game_object{
    constructor(root,info){
        super();

        this.hp = info.hp;
        this.id = info.id;
        this.x = info.x;
        this.y = info.y;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;
        this.vx = 0;
        this.vy = 0;
        this.direction = info.direction //1表示向右，-1表示向左
        this.status = 3 //0表示静止，1表示向前，2表示向后，3表示跳跃，4表示攻击，5表示被攻击，6表示死亡
        this.animations = new Map();
        this.last_status = null;
        
        this.root =root
        this.ctx = this.root.gamemap.ctx;

        this.speedx = 400; //左右移动时，给人物的速度
        this.speedy = 1500;//跳起时，给人物的速度
        this.gravity = 50; 
        this.pressed_key = this.root.gamemap.controller.pressed_key

        this.$hp = this.root.$kof.find(`.gamebox-head-hp-${this.id}-detail`)
    }

    start(){

    }

    update(){
        this.update_direction()
        this.update_control();
        this.update_move();
        this.update_attack()
        this.render();
        this.game_over();
    }

    update_control(){
        let w,a,d,space
        if(this.id === 0){
            w = this.pressed_key.has('w')
            a = this.pressed_key.has('a')
            d = this.pressed_key.has('d')
            space = this.pressed_key.has(' ')
        }
        else{
            w = this.pressed_key.has('ArrowUp')
            a = this.pressed_key.has('ArrowLeft')
            d = this.pressed_key.has('ArrowRight')
            space = this.pressed_key.has('Enter')
        }

        if(space && this.status !== 3 && this.status !== 6){
            this.status = 4;
            this.vx = 0;
        }

        else if(this.hp <= 0){
            this.status = 6;
        }

        else if(this.status === 0 || this.status === 1 || this.status === 2 && this.status !== 6){
            if(w){
                if(d){
                    this.vx = this.speedx;
                }
                else if(a){
                    this.vx = -this.speedx;
                }
                else this.vx = 0;
                this.vy = -this.speedy;
                this.status = 3;
            }else if(d){
                this.vx = this.speedx;
                if(this.direction === 1) this.status = 1
                else this.status = 2
            }
            else if(a){
                this.vx = -this.speedx;
                if(this.direction === 1) this.status = 2
                else this.status = 1
            }
            else{
                this.vx = 0;
                this.status = 0;
            }
        }
        else if(this.status === 3 && this.status !== 6){
            if(this.y >= this.ctx.canvas.height - this.height-75){
                if(a){
                    this.vx = -this.speedx;
                    if(this.direction === 1) this.status = 2
                    else this.status = 1
                }
                else if(d){
                    this.vx = this.speedx;
                    if(this.direction === 1) this.status = 1
                    else this.status = 2
                }
                else{
                    this.vx = 0;
                    this.status = 0;
                }
            }
        }
        else if(this.status === 4 && this.status !== 6){
            setTimeout(()=>{
                this.status = 0;
            },150)
        }
        else if(this.status === 5 && this.status !== 6){
            setTimeout(()=>{
                this.status = 0;
            },100)
        }
    }

    update_move(){
        this.x += this.timedelta/1000 * this.vx;
        this.y += this.timedelta/1000 * this.vy;

        if(this.y < this.ctx.canvas.height - this.height -75) this.vy += this.gravity;
        else if(this.y >= this.ctx.canvas.height - this.height -75){
            this.vy = 0;
            this.y = this.ctx.canvas.height - this.height-75;
        }
        if(this.x <= 0){
            this.x = 0;
        }
        else if(this.x >= this.ctx.canvas.width - this.width){
            this.x = this.ctx.canvas.width - this.width
        }
    }

    update_attack(){
        if(this.status === 4 && this.animations.get(4).frame_current_cnt === 18){
            let me = this;
            let you = this.root.player[1 - this.id];
            let rectme = me.get_render_rect()
            let rectyou = you.get_render_rect()
            if(me.direction === 1){
                if(rectme.w + rectme.x >= rectyou.x &&  rectme.w + rectme.x <= rectyou.x + rectyou.w){
                    you.status = 5;
                    me.status = 0;
                    you.hp -= 50;
                    you.$hp.animate({
                        width:you.$hp.parent().width() * you.hp /200
                    },300)
                }
            }
            else{
                if(rectme.x<= rectyou.x + rectyou.w &&  rectme.x>= rectyou.x){
                    you.status = 5;
                    me.status = 0;
                    you.hp -= 50;
                    you.$hp.animate({
                        width:you.$hp.parent().width() * you.hp /200
                    },300)
                }
            }
        }
    }

    update_direction(){
        let me = this;
        let you = this.root.player[1- this.id];
        let player = this.root.player;
        if(player[0] && player[1]){
            if(this.x < you.x){
                this.direction = 1
                you.direction = -1
            }
            else{
                you.direction = 1
                this.direction = -1
            }
        }
    }

    get_render_rect() {
        let obj = this.animations.get(this.status);
        if (!obj || !obj.loaded) return null;

        let k = parseInt(obj.frame_current_cnt / obj.frame_rate + 1) % obj.frame_cnt;
        let image = obj.gif.frames[k].image;

        let drawW = image.width * obj.scale;
        let drawH = image.height * obj.scale;
        let drawX = this.x + (this.width - drawW) / 2;
        let drawY = this.y + this.height - drawH;

        return {
            x: drawX,
            y: drawY,
            w: drawW,
            h: drawH,
            image: image,
            obj: obj
        };
    }

    game_over(){
        let me = this;
        let you = this.root.player[1- this.id];
        if(me.status === 6 || you.status === 6){
            you.vx = 0;
            setTimeout(() => {
                alert('游戏结束')
            }, 1000);
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    }

    render(){
        let rect = this.get_render_rect();
        if(rect){
            if(this.direction === 1){
                this.ctx.drawImage(rect.image, rect.x, rect.y,rect.w, rect.h);
            }
            else{
                this.ctx.save();
                this.ctx.translate(this.ctx.canvas.width,0);
                this.ctx.scale(-1,1);
                this.ctx.drawImage(
                    rect.image,
                    this.ctx.canvas.width - rect.x - rect.w,
                    rect.y,
                    rect.w,
                    rect.h,
                );
                this.ctx.restore();
            }
            if(this.status === 6){
                if(rect.obj.frame_current_cnt !== rect.obj.frame_cnt + 40) rect.obj.frame_current_cnt++
            }
            else rect.obj.frame_current_cnt++
        }
        if(this.last_status == null) this.last_status = this.status;
        else if(this.status !== this.last_status){
            this.animations.get(this.last_status).frame_current_cnt = 0;
            this.last_status = this.status;
        }
    }
}

export{
    player
}