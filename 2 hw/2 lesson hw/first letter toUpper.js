
let ord = letter => String.prototype.codePointAt.call(letter, 0);
let chr = String.fromCharCode;

let text = 'hElLo WoRlEd 33AbcfdgYYYgdsa aBcsdadD AbdsadasCd';

let word =  text.split(' ');
let result = '';

let i = 0;
while (i < word.length){
  let letter = word[i];
  
  let ii = 0;
  while (ii < letter.length){
    
    let letterIndex = ord(letter[ii]);
    
    if (ii === 0){
      if(letterIndex > 96){
        letterIndex -= 32;
      } 
    } else if (letterIndex < 96 && letterIndex > 64 ){
      letterIndex += 32;
    }

    result += chr(letterIndex);
    ++ii;
  }
  result += ' ';
  ++i;
}
console.log(result);








