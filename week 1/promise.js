// const fs = require('fs');

// // my own asynchronous function
// function kiratsReadFile() {
//   return new Promise(function(resolve) {
//     fs.readFile("a.txt", "utf-8", function(err, data) {
//       resolve(data);
//     });
//   })
// }

// // callback function to call
// function onDone(data) {
//   console.log(data)
// }

// kiratsReadFile().then(onDone);



// // const fs = require('fs');

// // // my own asynchronous function
// // function kiratsReadFile(cb) {
// //   fs.readFile("a.txt", "utf-8", function(err, data) {
// //     cb(data);
// //   });
// // }

// // function onDone(data) {
// //   console.log(data)
// // }

// // kiratsReadFile(onDone)


// const fs=require('fs');

// function sagarAsync(){
//     return new Promise(function(resolve){
//         fs.readFile("a.txt","utf8",function(err,data){
//             resolve(data);
//         })
//     })
// }

// async function call(){
//     const val=await sagarAsync();
//     console.log(val);
// }
// call();















const fs=require('fs');

function sagarAsync(){
    return new Promise(function(resolve,reject){
        fs.readFile('a.txt','utf8',function(err,data){
            if(err){
                reject(err);
            }else{

                resolve(data);
            }
        })
    })
}

async function main() {
    try{
        const val=await sagarAsync();
        console.log(val);
    }
    catch(err){
        console.log("Error  reading file: ", err);
    }
}

main();



// function sagarAsync(){
//     return new Promise(function(resolve){
//         setTimeout(function(){
//             resolve("hello this is under set timeout");
//         },1000)
//     })
// }

// async function main() {
//     const val=await sagarAsync();
//     console.log(val);
// }

// main();

// const fs=require('fs');
// fs.readFile('a.txt');
// console.log("hello");

// function myfunc(data){
//     return new Promise(function(resolve){
//         setTimeout(()=>{
//             resolve("time waited is "+data);
//         },data)
//     })
// }

// async function waitfor(data) {
//     const val= await myfunc(data);
//     console.log(val);
// }
// waitfor(10000);
// console.log("Hi there");
// waitfor(2000);
// console.log("Hi there");
// waitfor(3000);
// console.log("Hi there");