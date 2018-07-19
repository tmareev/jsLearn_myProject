let read = require('readline-sync');
let a = +read.question('Enter the first value: ');
let result = a;

while(true){

    let op = read.question('Choose an operation: ');
    
    // verify if the chosen operation is valid
    while(true){
        if(op !== '+' && op !== '-' &&
            op !== '*' && op !== '/' && op !== '='){
            op = read.question('Invalid operation!! Try once more: '); 
        }else{
            break;
        }
    }
    // quit the calculation with the total number
    if(op === '='){
        console.log('your total is - ' + result);
        break;
    }

    let b = +read.question('Next value: ');
      
    
    if(!isNaN(a) && !isNaN(b)){
        switch (op){
            case '+': 
                result +=  b;
                console.log('current result is: ' + result);
                break;
            case '-': 
                result -= b;
                console.log('current result is: ' + result);
                break; 
            case '*': 
                result *= b;
                console.log('current result is: ' + result);
                break; 
            case '/': 
                if(b !== 0){
                    result /= b;
                    console.log('current result is: ' + result);
                    break;
                }else{
                    console.log('cannot divide by 0');
                    console.log('current result is: ' + result);
                }
        }        
    }else{
        console.log('enter the numbers please');
    }
}
















