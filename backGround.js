class Layer{
    constructor(game,width,height,speedModifier,image){
        this.game=game
        this.width=width
        this.height=height
        this.speedModifier=speedModifier
        this.image=image
        this.x=0
        this.y=0
    }
    update(){
        if(this.x<-this.width) this.x=0
        else this.x-=this.game.speed*this.speedModifier
    }
    draw(context){
        context.drawImage(this.image,this.x,this.y,this.width,this.height)
        context.drawImage(this.image,this.x+this.width,this.y,this.width,this.height)
    }
}

export class BackGround{
    constructor(game,level){
        this.game=game
        this.width=1667
        this.height=500
        this.layerImage1=document.getElementById('level_'+level+'_layer1')
        this.layerImage2=document.getElementById('level_'+level+'_layer2')
        this.layerImage3=document.getElementById('level_'+level+'_layer3')
        this.layerImage4=document.getElementById('level_'+level+'_layer4')
        this.layerImage5=document.getElementById('level_'+level+'_layer5')
        console.log(this.layerImage1,this.layerImage2,this.layerImage3,this.layerImage4,this.layerImage5)
        this.layer1=new Layer(this.game,this.width,this.height,0,this.layerImage1)
        this.layer2=new Layer(this.game,this.width,this.height,0.2,this.layerImage2)
        this.layer3=new Layer(this.game,this.width,this.height,0.4,this.layerImage3)
        this.layer4=new Layer(this.game,this.width,this.height,0.6,this.layerImage4)
        this.layer5=new Layer(this.game,this.width,this.height,0.8,this.layerImage5)
        this.BackGroundLayers=[this.layer1,this.layer2,this.layer3,this.layer4,this.layer5] // 添加所有层
    }
    update(){
        this.BackGroundLayers.forEach(layer=>{
            layer.update()
        })
    }
    draw(context){
        this.BackGroundLayers.forEach(layer=>{
            layer.draw(context)
        })
    }
}