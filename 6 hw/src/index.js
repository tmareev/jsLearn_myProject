function createTag(tagName, attrs={}, text, children=[]){
    let element = document.createElement(tagName);
    for (let attr in attrs){
        element.setAttribute(attr, attrs[attr]);
    } 
    if(text){
        element.textContent = text;
    }
    for(let i = 0; i < children.length; i++){
        element.appendChild(children[i]);
    }
    return element;
}
function insertStatic(element){
    let body = document.body;
    let script = body.querySelector('script');
    return body.insertBefore(element, script);
}
function showHomePage(){
    let homePage = createTag('div', {id: 'root'}, '', [
        createTag('div', {id: 'container'}, '', [
            createTag('canvas', {id: 'canv', width: '700', height: '700'}, '', []),
            createTag('div', {id: 'container'}, '', []),
            createTag('button', {id: 'btnNewGame'}, 'New Game', []),
        ]),        
    ]);
    
    return insertStatic(homePage);
}
showHomePage();

const ctx = canv.getContext('2d');
const canvasHeight = canv.height;
const canvasWidth = canv.width;
const columns = 10;
const rows = 5;
let scoreCount = 0;
let idInterval;

let platform = {
    width:  canvasWidth / 7,
    height: canvasHeight / 60, 
    padd: 0,
    x: canvasWidth / 2 - canvasWidth / 7,
    y: canvasHeight / 10 * 9,
    color: 'rgb(95, 128, 46)',
}

let ball = {
    x: canvasWidth / 2 , y: canvasHeight / 5 * 3,
    radius: 8, color: 'rgb(117, 117, 235)',
    dx: 3, dy: 1,
}


// вопрос !!
// let tile = {
//     width:  canvasWidth / 10,
//     height: canvasHeight / 2 / 6, 
//     padd: 30,
//     x: 0,
//     y: 0,
//     color: 'rgb(95, 128, 46)',
//     showTile: 1,
// }

let allTiles = [];
for(let i = 0; i < rows; i++){
    allTiles[i] = [];
    for(let k = 0; k < columns; k++){
        allTiles[i][k] = {x: 0, y: 0, showTile: true};
    }
}

document.getElementById('btnNewGame').addEventListener('click', function(){
    location.reload();
});

function drawTiles(){
    tileWidth = canvasWidth / 10;
    tileHeight = canvasHeight / 2 / 10;
    tilePadd = tileWidth / 10;
    for(let i = 0; i < rows; i++){
        for(let k = 0; k < columns; k++){
            if(allTiles[i][k].showTile == true){
                let tileX = tileWidth * k + tilePadd / 2;
                let tileY = tileHeight * i + tilePadd / 2;
                allTiles[i][k].x = tileX;
                allTiles[i][k].y = tileY;
                ctx.beginPath();
                ctx.save();
                ctx.fillStyle = 'rgb(95, 128, 46)';
                ctx.fillRect(tileX, tileY, tileWidth - tilePadd, tileHeight - tilePadd);
                ctx.restore();
                ctx.closePath();
            }
        }
    }
}

function showScore(item){
    ctx.save();
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(item, 10, canvasHeight - 10);
    ctx.restore();
}

function hideTiles(){
    for(let i = 0; i < rows; i++){
        for(let k = 0; k < columns; k++){
            let t = allTiles[i][k];
            if(t.showTile == true){
                if(ball.x > t.x && 
                    ball.x < t.x + tileWidth &&
                    ball.y > t.y  &&
                    ball.y < t.y + tileHeight){
                        ball.dy *= -1;
                        t.showTile = false;
                        ++scoreCount; 
                }
            }
        }
    }
}

function createRect(rect){
    ctx.beginPath();
    ctx.save();
    ctx.fillStyle = rect.color;
    ctx.fillRect(rect.x, rect.y, rect.width - rect.padd, rect.height - rect.padd);
    ctx.restore();
    ctx.closePath();
}

function drawPlatform(){
    createRect(platform);
}

canv.addEventListener('mousemove', function(e){
    platform.x = e.clientX - platform.width / 2;
    if(e.clientX < platform.width / 2){
        platform.x = 0;
    } 
    if(e.clientX > canvasWidth - platform.width / 2){
        platform.x = canvasWidth - platform.width;
    }
});

function createBall(arc){
    ctx.save();
    ctx.fillStyle = arc.color;
    ctx.beginPath();
    ctx.moveTo(arc.x, arc.y);
    ctx.arc(arc.x, arc.y, arc.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

function drawBall(arc){
    createBall(arc);
    arc.x += arc.dx;
    arc.y += arc.dy;
    if(arc.y < 0){
        arc.dy *= -1;
    }
    if(arc.x > canvasWidth || arc.x < 0){
        arc.dx *= -1;
    }

    if(arc.y === platform.y - ball.radius &&
        arc.x >= platform.x - 5 && 
        arc.x <= platform.x + platform.width + 5){
            arc.dy *= -1;
        }        
        //вопрос!!!!
        // if(arc.y === platform.y - ball.radius){
        //     if(arc.x >= platform.x && arc.x < platform.width / 6){
        //         arc.dy *= -1;
        //         arc.dx -= 6; 
        //     }
            
        //     if(arc.x > platform.x / 6 && arc.x < platform.width / 6 * 2){
        //         arc.dy *= -1;
        //         arc.dx -= 3; 
        //     }

        //     if(arc.x > platform.width / 6 * 2 && arc.x < platform.width / 6 * 4){
        //         arc.dy *= -1;
        //     }
            
        //     if(arc.x > platform.width / 6 * 4 && arc.x < platform.width / 6 * 5){
        //         arc.dy *= -1;
        //         arc.dx += 3; 
        //     }

        //     if(arc.x > platform.width / 6 * 5 && arc.x <= platform.width){
        //         arc.dy *= -1;
        //         arc.dx += 6; 
        //     }
        // }   
            
    if(arc.y > canvasHeight){
        gameOver();
    }
}


function gameOver(){
    ctx.save();
    ctx.font = '60px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('Game Over', canvasWidth/4, canvasHeight/2);
    ctx.restore();
    clearInterval(idInterval);
}

function gameWin(){
    if(scoreCount == rows * columns){
        ctx.save();
        ctx.font = '60px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Congratulations!', canvasWidth/5, canvasHeight/2);
        ctx.restore();
        if(ball.y > canvasHeight / 2);
        clearInterval(idInterval);
    }
}

function launchGame(){
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawTiles();
    drawBall(ball);
    drawPlatform();
    hideTiles();
    showScore(scoreCount);
    gameWin();
}

idInterval = setInterval(launchGame, 5);