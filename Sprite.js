function Sprite(){
  this.grav = 0;
  this.x = 0;
  this.y = 0;
  this.vx = 0;
  this.vy = 0;
  this.ax = 0;
  this.ay = 0;
  this.am = 0;
  this.width = 32;
  this.height = 32;
  this.angle = 0;
  this.vang = 0;
  this.color = "blue";
  this.cooldown = 0;
}

Sprite.prototype.desenhar = function (ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.fillStyle = this.color;
  ctx.fillRect(-this.width/2, -this.height/2, this.width,this.height)
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  ctx.restore();
};

Sprite.prototype.desenharImg = function (ctx, img) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle*2*Math.PI/360);
  ctx.rotate(Math.PI/2);
  ctx.fillStyle = this.color;
  ctx.drawImage(img, -this.width/2, -this.height/2, this.width, this.height);
  if(this.debug){
    ctx.strokeStyle = "grey";
    ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
  }
  ctx.restore();
};

Sprite.prototype.mover = function (dt) {
  this.vx = this.vx + this.ax*dt;
  this.vy = this.vy + (this.ay+this.grav)*dt;
  this.x = this.x + this.vx*dt;
  this.y = this.y + this.vy*dt;
  if(this.vy < -130) this.vy+=5+(this.vx/this.grav) // resistencia do "ar"
  if(this.cooldown>0) {
    this.cooldown -= dt;
  } else {
    this.cooldown = 0;
  }
};




Sprite.prototype.colidiuCom = function (alvo) {
  if((this.x+this.width/2) < alvo.x-alvo.width/2) return false;
  if(this.x-this.width/2 > (alvo.x+alvo.width/2)) return false;
  if((this.y+this.height/2) < alvo.y-alvo.height/2) return false;
  if(this.y-this.height/2 > (alvo.y+alvo.height/2)) return false;
  return true;
};









//
