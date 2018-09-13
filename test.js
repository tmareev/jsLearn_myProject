// let arr1 = ['test', 'test'];

// function test(arr){
//     let prom = new Promise(function(onResolved, onRejected){
//         let result = 0;
//         let error = `there's no number in array` ;
//         for(let i = 0; i < arr.length; i++){
//             // if(isFinite(arr[i])){
//                 result *= arr[i];
//             // }
//             // console.log(result);
//         }

//         if(result !== 0 && !result){
//             onRejected(error);
//         } else {
//             onResolved(result);
//         }
//     });
//     return prom;
// }

// test(arr1).then(func111, (error) => console.log(error + 11111)).then(func222, (error) => console.log(error + 2));

// function func111(value){
//     console.log('first', value + 1) 
//     return value;
// }

// function func222(value){
//     console.log('second', value + 1)
// }

// function test2(){
//     return new Promise(function(resolve, reject){
//         resolve('hiii');
//     })
// }

// test2().then(console.log);


async function test(){
    return 'hello';
}

async function test3(){
    let ff = await test();
    console.log(ff);
}
test3();
// console.log(test());




// res.then(first, errFirst).then(second, errSecond).then(third, errThird);

// function first(data){
//     // console.log(data, 'first')
//     return data + 1;
// }
// function errFirst(data){
//     console.log(data, 'error in first')
//     return data;
// }

// function second(data){
//     console.log(data, "second");
//     return data;
// }
// function errSecond(data){
//     console.log(data, 'error in second');
//     return data;
// }



// function third(){
//     console.log('fourth');
// }
// function errThird(){
//     console.log('error in third')
// }

