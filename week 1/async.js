function findSum(n){
    let ans=0;
    for(let i=0;i<n;i++){
        ans+=i;
    }
    return ans;
}

function sum(n){
    console.log(findSum(n));
}
console.log("This is before function");
setTimeout(sum,500,1000);
console.log("This is after function");

// sum(10000);
// sum(100);
// sum(100);
// sum(100);
// sum(1000000000);
// // sum(1000000000);

// console.log("This is async");

// console.log("This is before function");

// const fs = require('fs');
// fs.readFile("a.txt","utf8", function(err,data){
//     console.log(data);
// })

// console.log("This is after function");
