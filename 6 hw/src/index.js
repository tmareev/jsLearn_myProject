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
        createTag('div', {class: 'row'}, '', [
            createTag('div', {class: 'col'}, 'div1', []),
            createTag('div', {class: 'col'}, 'div2', []),
        ]),
        createTag('div', {class: 'row'}, '', [
            createTag('div', {class: 'col'}, 'div3', []),
            createTag('div', {class: 'col'}, 'div4', []),
        ]),   
    ]);
    return insertStatic(homePage);
}

showHomePage();



let menuBox = document.querySelector('#root');
menuBox.addEventListener('click', clickOnItem);
menuBox.addEventListener('mouseover', mouseOver());

function clickOnItem(event){
    let chosen = event.target;
    chosen.classList.toggle('active');
}

function hoveredExists(){
    return document.querySelector('.hovered');
}
function mouseOver(){
    let temp;
    return function(event){

        let chosen = event.target;
        if(chosen != temp && hoveredExists()){
            document.querySelector('.hovered').classList.remove('hovered');
        }
        chosen.classList.add('hovered');
        temp = chosen;
    }
    
}










