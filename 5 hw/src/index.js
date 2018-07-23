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
    let homePage = createTag('div', {class: 'container'}, '', [
        createTag('div', {class: 'mainDiv mainLeft'}, '', [
            createTag('div', {class: 'content', id: 'menuLeft'}, '', []),
            createTag('div', {class: 'footer'}, '', [
                createTag('div', {class: 'footerBox'}, '', [
                    createTag('input', {id: 'textField'}, '', []),
                    createTag('button', {class: 'button', id: 'setText'}, 'Set text', []),
                    createTag('button', {class: 'button', id: 'createTag'}, 'Create tag', []),
                    createTag('button', {class: 'button', id: 'remove'}, 'Remove', []),
                ])
            ]),
        ]),
        createTag('div', {class: 'mainDiv mainRight'}, '', [
            createTag('div', {class: 'contentBox'}, '', [
                createTag('div', {class: 'content', id: 'menuRight'}, '', [])
            ]),
            createTag('div', {class: 'footer'}, '', [
                createTag('div', {class: ''}, '', [
                    createTag('h3', {id: 'currentElement'}, 'Current tag: ', [])
                ])
            ]),
        ]),   
    ]);

    return insertStatic(homePage);
}

function showDefMenu(){
    let menuRightDiv = document.getElementById('menuRight');
    let menuRight = createTag('ul', {class: 'menuItem', contenteditable: true}, '', [
    createTag('li', {class: 'menuItem', contenteditable: true}, 'hello', []),
    createTag('li', {class: 'menuItem', contenteditable: true}, 'world', []),
    ]);

    return insert(menuRight, menuRightDiv);
}

function showMenuInHtml(){
    let menuLeftDiv = document.getElementById('menuLeft');
    menuLeftDiv.textContent = document.querySelector('.contentBox').innerHTML;
    return menuLeftDiv;
}


showHomePage();
showDefMenu();
showMenuInHtml();





