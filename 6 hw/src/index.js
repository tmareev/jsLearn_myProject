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

function insert(element, parent){
    return parent.appendChild(element);
}

function showHomePage(){
    let homePage = createTag('div', {id: 'root'}, '', [
        // createTag('p', {}, 'p1 text', []),
        // createTag('form', {}, '', [
        //     createTag('input', {id: 'inp', value: 'prefilled field'}, '', []),
        //     createTag('button', {id: 'btn-play'}, 'PLAY', []),
        //     createTag('button', {id: 'btn-stop'}, 'STOP', []),
        // ]),
        createTag('canvas', {id: 'canv', width: '700', height: '700'}, '', []),
    ]);
    
    return insertStatic(homePage);
}

showHomePage();


// let i = 5;
//  function test(event){
//     console.log('test loaded! count = ' + i);
//     --i;
//     if(i < 1){
//         event.target.removeEventListener('click', test);
//     }
// }
// function reWrap(){
//     i = 5;
//     btnPlay.removeEventListener('click', test);
//     btnPlay.addEventListener('click', test);
// }
// let btnPlay = document.getElementById('btn-play');
// btnPlay.addEventListener('click', test);
// btnPlay.addEventListener('click', (function(){
//     let ff = 100;
//     return function(){
//         --ff;
//         console.log(ff);
//     }
// })());
// let btnStop = document.getElementById('btn-stop');
// btnStop.addEventListener('click', reWrap);




// function test(event){
//     if (event.currentTarget == document.getElementById('btn-play')){
//         event.stopPropagation();
//     }
//     console.log('click!', event.currentTarget);
// }




// document.getElementById('btn-play').addEventListener('click', test);
// document.getElementById('root').addEventListener('click', test);
// document.body.addEventListener('click', test);
// document.addEventListener('click', test);


// document.getElementById('root').addEventListener('mousedown', function(e){
//     e.target.classList.add('chosen');
// });
// document.getElementById('root').addEventListener('mouseup', function(e){
//     e.target.classList.remove('chosen');
// });

// document.getElementById('root').addEventListener('mousemove', function(e){
//     if(document.querySelector('.chosen')){
//         e.target.style.top = e.clientY - 10 + 'px';
//         e.target.style.left = e.clientX - 10 + 'px';
//     }
// });





/**************************************
 *  двигает кнопку стоп по всему полю 
 * *************************************
 * 
document.getElementById('root').addEventListener('mousemove', function(e){
    document.getElementById('btn-stop').style.top = e.clientY - 10 + 'px';
    document.getElementById('btn-stop').style.left = e.clientX - 10 + 'px';
    
});
*/






// ************************************************
// РИСУЕМ КВАДРАТИКИ
// **********************************************
// let ctx = canv.getContext('2d');
// let h = canv.height;
// let w = canv.width;

// let rows = 10;
// let cols = 10;
// let pad = 20;
// let sw = w / cols;
// let sh = h / rows;

// for(let i = 0; i < rows; i++){
//     for(let k = 0; k < cols; k++){
//         let x = sw * k + pad / 2;
//         let y = sh * i + pad / 2;
//         let red = Math.floor(255 / rows * (i + 1));
//         let green = Math.floor(255 / cols * (k + 1));
//         ctx.fillStyle = `rgb(${red}, ${255 - green}, 0)`;
//         ctx.fillRect(x, y, sw - pad, sh - pad);
//     }
// }


// ************************************************
// РИСУЕМ КРУГИ
// **********************************************
let ctx = canv.getContext('2d');
let h = canv.height;
let w = canv.width;

let rows = 10;
let cols = 10;
let pad = 20;
let rad = w / cols;


for(let i = 0; i < rows; i++){
    for(let k = 0; k < cols; k++){
        let x = rad * k + rad / 2;
        let y = rad * i + rad / 2;
        let red = Math.floor(255 / rows * (i + 1));
        let green = Math.floor(255 / cols * (k + 1));
        
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.fillStyle = `rgb(${red}, ${255 - green}, 0)`;
        ctx.arc(x, y, rad / 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.closePath();
    }
}




