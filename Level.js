function Level (){
  this.sprites = [];
  this.paredeCooldown = 4;
  this.anterior = null
}

Level.prototype.init = function (w,h) {
  this.width = w
  this.height = h
  this.spawnY = 0
  this.distMinima = 80
  this.distMaxima = 128
};

Level.prototype.mover = function (dt, player) {
    for (var i = this.sprites.length-1;i>=0; i--) {
      this.sprites[i].mover(dt);
	  if(this.sprites[i].pontuar && this.sprites[i].x < player.x) {
		player.score+=1
		this.sprites[i].pontuar = false
	  }
      if(
        this.sprites[i].x >  this.width+500 ||
        this.sprites[i].x < -100 ||
        this.sprites[i].y >  3000 ||
        this.sprites[i].y < -3000
      ){
        this.sprites.splice(i, 1);
      }
    }
};


Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenhar(ctx);
    }
};
/*
Level.prototype.desenharImg = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenharImg(ctx, this.imageLib.images[this.sprites[i].imgkey]);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenharImg(ctx, this.imageLib.images[this.shots[i].imgkey]);
    }
};
*/

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};


Level.prototype.boost = function (alvo){
  if(alvo.cooldown>0) return;
  alvo.vy = -200
  alvo.cooldown = 0.5;
}

Level.prototype.spawnParedes = function(score) {
	if(this.paredesCooldown > 0) {
		this.paredesCooldown -= dt
		return
	}
	
  var mod = score/100
  if(mod > 25) mod = 25
  var modHeight = 0
  if(this.anterior != null) {
    if(Math.random() < 0.5) modHeight = this.anterior.y*0.5
    else modHeight = -this.anterior.y*0.5
  }

	var paredeCima = new Sprite()
	paredeCima.pontuar = true
	paredeCima.x = this.width + 30
	paredeCima.y = modHeight+this.height*0.35*(-1+1*Math.random())
	paredeCima.width = 20
	paredeCima.height = this.height
	paredeCima.vx = -75-mod

	var paredeBaixo = new Sprite()
	paredeBaixo.pontuar = false
	paredeBaixo.x = paredeCima.x
	paredeBaixo.y = (paredeCima.y + paredeCima.height + this.distMinima*(1+Math.random()))
	paredeBaixo.width = paredeCima.width
	paredeBaixo.height = paredeCima.height
	paredeBaixo.vx = paredeCima.vx

  this.anterior = paredeCima

	this.sprites.push(paredeCima)
	this.sprites.push(paredeBaixo)
  var modCd = score/50
  if(modCd > 2) modCd = 2
	this.paredesCooldown = 4// - modCd


}

Level.prototype.desenharInfo = function(ctx, player, colidiu) {
	ctx.fillText("Pontos: " + player.score, 250,10)
	ctx.fillText(colidiu, 300,10)
}

/*
Level.prototype.colidiuComTiros = function(al, key){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
          return function(alvo){
            al.play(key, 0.7)
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
          }
        }
      )(this));
  }
}
*/

//
