//LEGEND
const EMPTY = 0;
const PACMAN = 1;
const CHERRY = 2;
const BOMB = 3;
const COIN = 4;
// PACMAN DIRECTION
var pac_direction = "right";
var pac_explosion = "false";
// AT HOME!
var health = 100; //-50hp on bomb and +50hp on cherry game over on 0
var score = 0; //+5 points on coin
function end_explosion() {
  pac_explosion=false;
  m.render();
}
class GameMap {
  constructor() {
    this.grid = [EMPTY,CHERRY,EMPTY,COIN,EMPTY,PACMAN ,EMPTY,EMPTY,BOMB,EMPTY];
  }
  render(){
    var div = document.getElementById('map');
    var html = ``;
    for(var i =0; i<this.grid.length; i++){
      var c = '';
      switch (this.grid[i]) {
        case EMPTY: break;
        case PACMAN: c='pacman';
          if(pac_direction=="left"){
            c+=' left';
          }
          if(pac_explosion==true){
            c+=' explosion';
            // TIMER 1SECOND
            setTimeout(end_explosion, 1000);
          }
          break;
        case CHERRY: c='cherry'; break;
        case BOMB: c='bomb'; break;
        case COIN: c='coin'; break;
      }
      html+=`<div class="${c}"></div>`;
    }
    div.innerHTML = html;
  }
  action(){
    if(event.code=="ArrowLeft"){
      pac_direction="left";
      this.moveLeft();
    }
    if(event.code=="ArrowRight"){
      pac_direction="right";
      this.moveRight();
    }
    // console.log(event.code);
  }
  moveLeft(){
    //  1) FIND PACMAN
    var index = this.grid.indexOf(PACMAN);
    // alert(index);
    // 2)DELETE PACMAN FROM CURRENT POSITION
    this.grid[index]=EMPTY;
    // x)CHEKING WHATS IN THERE?
    if(this.grid[index-1]==BOMB){
      pac_explosion = true;
    }
    // 3)SET PACMAN TO NEXT POSITION
    this.grid[index-1]=PACMAN;
    // 4)RENDER RESULT
    this.render();
  }
  moveRight(){
  //  1) FIND PACMAN
  var index = this.grid.indexOf(PACMAN);
  // alert(index);
  // 2)DELETE PACMAN FROM CURRENT POSITION
  this.grid[index]=EMPTY;
  // 3)SET PACMAN TO NEXT POSITION
  if(this.grid[index+1]==BOMB){
    pac_explosion = true;
  }
  this.grid[index+1]=PACMAN;
  // 4)RENDER RESULT
  this.render();
  }
}
