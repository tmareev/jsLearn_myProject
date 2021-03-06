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
                    createTag('input', {type: 'text', id: 'textField', value: ''}, '', []),
                    createTag('button', {class: 'button', id: 'setText'}, 'Set text', []),
                    createTag('button', {class: 'button', id: 'createTag'}, 'Create tag', []),
                    createTag('button', {class: 'button', id: 'remove'}, 'Remove', []),
                ])
            ]),
        ]),
        createTag('div', {class: 'mainDiv mainRight'}, '', [
            createTag('div', {class: 'content', id: 'menuRight'}, '', []),
            createTag('div', {class: 'footer'}, '', [
                createTag('div', {class: ''}, '', [
                    createTag('h3', {id: 'currentTag'}, `Current tag: `, [])
                ])
            ]),
        ]),   
    ]);
    return insertStatic(homePage);
}

function showDefMenu(){
    let menuRightDiv = document.getElementById('menuRight');
    let menuRight = createTag('div', {class: 'menuItem'}, '', [
        createTag('ul', {class: 'menuItem'}, '', [
            createTag('li', {class: 'menuItem'}, 'hello', []),
            createTag('li', {class: 'menuItem'}, 'world', []),
        ])
    ]); 
    
    return insert(menuRight, menuRightDiv);
}


function showMenuInHtml(){
    let menuLeft = document.getElementById('menuLeft'); 
    let menuRight = document.querySelector('.mainRight > .content');
    let generateHtmlFromRightMenu = showChildren();
    if(menuRight){
        return menuLeft.textContent = generateHtmlFromRightMenu(menuRight);
    }else{
        return menuLeft.textContent = '';
    }
}

function showChildren(){
    let count = 0;
    let allChildrenInString = '';
    return function func(element){
        
        let elementChildren = element.children;
        for (let i = 0; i < elementChildren.length; i++){
            let parentOpenTag = `${'\t'.repeat(count)}<${elementChildren[i].tagName}> \n`;
            let parentCloseTag = `${'\t'.repeat(count)}</${elementChildren[i].tagName}> \n`; 
            allChildrenInString += parentOpenTag;
            if(elementChildren[i].textContent && elementChildren[i].children.length == 0){
                allChildrenInString += '\t'.repeat(count + 1) + elementChildren[i].textContent + '\n'; 
            }
            if(elementChildren[i].children.length !== 0){
                ++count;
                func(elementChildren[i]);
            }
            allChildrenInString += parentCloseTag;
        }
        count = 1;
        return allChildrenInString;
    }
}

showHomePage();
showDefMenu();
showMenuInHtml();

function touchButtons(selector, func){
    let button = document.querySelector(selector);
    return button.addEventListener('click', func); 
}






function findActive(){
    return document.querySelector('.active');
}
function activeExists(){
    if(findActive()){
        return true;
    }
    return false;
}

function clickOnItem(){
    let tempActive;

    return function myClick(event){
        let currentActive = event.target;
        if(currentActive != tempActive && activeExists()){
            let activeElement = findActive();
            activeElement.classList.remove('active');
        }
        event.target.classList.toggle('active');
        addToCurrentTag(event.target);
        tempActive = event.target;
    }
}


function addToCurrentTag(target){
    let active = findActive();
    if (!active){
        return document.getElementById('currentTag').textContent = 'Current tag: ';
    }
    return document.getElementById('currentTag').textContent = 'Current tag: ' + target.tagName;
}

touchButtons('#menuRight', clickOnItem());


function toRemove(){
    if(activeExists()){
        let activeElement = findActive();
        let parentOfActive = activeElement.parentElement;
        parentOfActive.removeChild(activeElement);
        document.getElementById('currentTag').textContent = 'Current tag: ';
    }
}





function toSetText(){
    let text = getTextFromInput();
    if(activeExists()){
        findActive().textContent = text;
    }
}

function getTextFromInput(){
    return document.getElementById('textField').value;
}



function addChildToActive(tagName){
    let def = 'DEFAULT TEXT';
    return findActive().appendChild(createTag(tagName, {class: 'menuItem'}, def, []));
}

function resetTextInActive(){
    let hasTag;
    for(let i = 0; i < findActive().childNodes.length; i++){
        if(findActive().childNodes[i].nodeType == 1){
            hasTag = true;
            break;
        }
    }
    if(!hasTag){
        return findActive().textContent = '';
    }
}

function toCreateTag(){
    if(activeExists){
        resetTextInActive();
        let text = getTextFromInput();
        let errorText = text + ' tag is not allowed. Choose one of: li, div, h1, h2, h3, h4, h5, h6, ul, ol, p';
        
        switch(text){
            case 'div': 
                addChildToActive('div');
                break;
            case 'p': 
                addChildToActive('p'); 
                break;   
            case 'h1': 
                addChildToActive('h1');
                break;    
            case 'h2': 
                addChildToActive('h2');
                break; 
            case 'h3': 
                addChildToActive('h3');
                break; 
            case 'h4': 
                addChildToActive('h4');
                break; 
            case 'h5': 
                addChildToActive('h5'); 
                break;
            case 'h6': 
                addChildToActive('h6');
                break; 
            case 'ul': 
                addChildToActive('ul');
                break;
            case 'ol': 
                addChildToActive('ol');
                break;
            case 'li': 
                addChildToActive('li'); 
                break;
            default:
                alert(errorText);
                break;
        }
    }
}

function addSync(func){
    return function wrapper(){
        let res = func();
        showMenuInHtml();
        return res;
    }
}

toRemove = addSync(toRemove);
toSetText = addSync(toSetText);
toCreateTag = addSync(toCreateTag);


touchButtons('#remove', toRemove);
touchButtons('#setText', toSetText);
touchButtons('#createTag', toCreateTag);
