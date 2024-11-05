let canvas,context;
function createCanvas(){
  canvas = document.createElement ("canvas");
  context = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = "black";
  canvas.style.margin = 0;
  canvas.style.padding = 0;
 document.body.style.padding = 0;
 document.body.style.margin= 0;
  document.body.appendChild(canvas);
}

createCanvas();



let snake = {
  blocks : [[10,10,"down"]], 
  colour : "green", 
  directions : []
};

let GameArea = {
  xBlocks : 25,
  yBlocks : Math.round((window.innerHeight/window.innerWidth)*25)
};


let apple = {
  x : 20,
  y : 20, 
  colour : "red"
};

let score = 0;




function drawSnake(){
  for(i in snake.blocks){
    let x = (snake.blocks[i][0]/GameArea.xBlocks)*window.innerWidth;
    let y = (snake.blocks[i][1]/GameArea.yBlocks)*window.innerHeight;
    context.fillStyle = snake.colour;
    context.fillRect(x,y, window.innerWidth/GameArea.xBlocks,window.innerHeight/GameArea.yBlocks);
  } 
}
function moveSnake(){
  for(i in snake.blocks){
    if(snake.blocks[i][2] == "right"){
      snake.blocks[i][0] += 1;
    } else if(snake.blocks[i][2] == "left"){
      snake.blocks[i][0] -= 1;
    } else if(snake.blocks[i][2] == "up"){
      snake.blocks[i][1] -= 1;
    } else if(snake.blocks[i][2] == "down"){
      snake.blocks[i][1] += 1;
    }  
  }
}

function clearCanvas(){
  context.clearRect(0,0,canvas.width,canvas.height);
}

function increaseSnake(no){
  for(let i=0; i < no; i++){
    let block = snake.blocks;
    let newBlock;
    let lE = block[block.length-1];
    if(lE[2] == "right"){
      newBlock = [lE[0]-1,lE[1],"right"];
      block.push(newBlock);
    } else if (lE[2] == "left"){
      newBlock = [lE[0]+1,lE[1],"left"];
      block.push(newBlock);
    } else if (lE[2] == "up"){
      newBlock = [lE[0],lE[1]+1,"up"];
      block.push(newBlock);
    } else if (lE[2] == "down") {
      newBlock = [lE[0],lE[1]-1,"down"];
      block.push(newBlock);
    }
  }
}

increaseSnake(18);

function detectCollision(){
  let fB = snake.blocks[0];
  if((fB[2] == "right")&&(fB[0] == GameArea.xBlocks)){
    alert("Snake Collided");
    clearInterval(frame);
  } else if((fB[2] == "left")&&(fB[0] == 0)){
    alert("Snake Collided");
    clearInterval(frame);
  } else if((fB[2] == "up")&&(fB[1] == 0)){
    alert("Snake Collided");
    clearInterval(frame);
  } else if((fB[2] == "down")&&(fB[1] == GameArea.yBlocks)){
    alert("Snake Collided");
    clearInterval(frame);
  }
  for(i=0;i < (snake.blocks.length-1);i++){
    if((fB[0] == snake.blocks[i+1][0])&&(fB[1] == snake.blocks[i+1][1])){
      alert("Snake Collided");
      clearInterval(frame);
    }
    
  }
}
 

function turnSnake(){
  let dir = snake.directions;
  let blocks = snake.blocks;
  let x = false;
  for (i in dir){
    for(j in blocks){
      //console.log(j)
      if((dir[i][0] == blocks[j][0])&&(dir[i][1] == blocks[j][1])){
        blocks[j][2] = dir[i][2];
        if(j == (blocks.length - 1)){
          x = true;
        }
      } 
    }
  }
  if(x){
    dir.shift();
  }
}

function addTurn(direction){
  let s = snake.blocks;
  let block = [s[0][0],s[0][1],direction];
  snake.directions.push(block); 
}

async function addSwipeDetect(){
  let d = snake.blocks[0];
  document.addEventListener('swiped-right',function(){
    if(d[2] != "left"){
      addTurn("right")
    } 
  });
  document.addEventListener('swiped-left', function() {
    if(d[2] != "right"){
      addTurn("left")
    } 
  });
  document.addEventListener('swiped-up', function() {
    if(d[2] != "down"){
      addTurn("up")
    } 
  });
  document.addEventListener('swiped-down', function() {
    if(d[2] != "up"){
      addTurn("down");
    }
  });
} 
addSwipeDetect();


function randomBlock(){
  let x = Math.round(Math.random()*(GameArea.xBlocks-3))+1;
  let y = Math.round(Math.random()*(GameArea.yBlocks-3))+1;
  return [x, y];
}
 function newApple(){
   let a = randomBlock();
   apple.x = a[0];
   apple.y = a[1];
 }
 
 newApple();

function drawApple(){
    let x = (apple.x/GameArea.xBlocks)*window.innerWidth;
    let y = (apple.y/GameArea.yBlocks)*window.innerHeight;
    context.fillStyle = apple.colour;
    context.fillRect(x,y, window.innerWidth/GameArea.xBlocks,window.innerHeight/GameArea.yBlocks);
}


function detectSnakeAppleCollision(){
  if((snake.blocks[0][0] == apple.x)&&(snake.blocks[0][1] == apple.y)){
    newApple();
    increaseSnake(2);
    score += 1;
  }
}


function drawScore(){
  context.font = "20px Comic Sans MS";
  context.fillStyle = "white";
  context.textAlign = "center";
  context.fillText(("Score : "+score),(canvas.width/8),(canvas.height/16));
}


function update(){
  clearCanvas();
  turnSnake();
  moveSnake(); 
  drawSnake();
  drawApple();
  drawScore();
  detectCollision();
  detectSnakeAppleCollision();
}


document.addEventListener("click", () => {
  canvas.requestFullscreen();
  document.documentElement.requestFullscreen();
});


let frame = setInterval(update, (1000/10));

//Object.entries(window).forEach(a => (console.log("Value of "+a[0]+" is "+a[1])))

