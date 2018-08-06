// let arr = [7, 2, 3, 0, 5, 4, 9, 0];
// let temp;

// for(let i = 0; i < arr.length - 2; i++){
//     for(let ii = 1; ii < arr.length; ii++){
        
//         let first = arr[ii];
//         let second = arr[ii - 1];
        
//         if(arr[ii] < arr[ii - 1]){
//             temp = arr[ii];
//             arr[ii] = arr[ii - 1];
//             arr[ii - 1] = temp;
//         }
//         console.log(arr);
//     }
//     console.log('_'.repeat(100));
// }


// for(let i = 0; i < arr.length - 1; i++){
//     for(let ii = i + 1; ii < arr.length; ii++){
//         if(arr[i] > arr[ii]){
//             let l = arr[i];
//             let iI = arr[ii];
            
//             temp = arr[ii];
//             arr[ii] = arr[i];
//             arr[i] = temp;
//         }
//         console.log(arr);
//     }
// }


// let arr1 = [2, 4, 5, 6, 67, 23, 2, 1];

// function main(arr, func){
//     let result = [];
//     for(let i = 0; i < arr.length; i++){
//         let temp = func(arr[i]);
//         if(temp){
//             result.push(temp);
//         }
//     }
//     return result;
// }

// let g = main(arr1, function(anyItem){
//                         if (anyItem < 6) {
//                             return anyItem *= 2;
//                         }
//                     });
// console.log(g);

let arr1 = [2, 4, 5, 6, 67, 23, 2, 1];
arr1 = Array(5).fill(7).map();