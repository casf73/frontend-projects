class controller{
    constructor($canvas){
        this.$canvas = $canvas

        this.pressed_key = new Set();
        this.start();
    }

    start(){
        this.$canvas.keydown(e =>{
            this.pressed_key.add(e.key)
        })
        this.$canvas.keyup(e =>{
            this.pressed_key.delete(e.key)
        })
    }
}

export{
    controller
}