let ord = letter => String.prototype.codePointAt.call(letter, 0);
let chr = String.fromCharCode;

let text = '-.f43 fd e4 - vd nj45490 ';

let isDotExists = false;
let acceptValues = '';
let result = '';

let i = 0;
while (i < text.length){
    let symb = text[i];
    let difference = ord(symb) - ord(0);
    
    if(difference >= 0 && difference <= 9){
        acceptValues += difference;
        result += difference;
    } 

    if(symb === '-'){
        acceptValues += symb;
    }

    if(symb === '.'){
        if(isDotExists === false){
            result += symb; 
            acceptValues += symb; 
            isDotExists = true;
        } else {
            acceptValues = acceptValues;
            result = result;
        }
    } 
    ++i;
}

if(acceptValues[0] === '.'){
    result = 0 + result;
}else if(acceptValues[0] === '-'){
    result *= -1;
} else if(acceptValues[0] === '-' && acceptValues[1] === '.'){
    result = '-0' + result;
}
console.log(result);









