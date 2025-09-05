// let count = 30;

// const timer = setInterval(() => {
//   console.log(count);
//   count--;

//   if (count < 0) {
//     clearInterval(timer);
//     console.log("Time's up!");
//   }
// }, 1000);


let count=30;
const timer=setInterval(fnc,1000);
function fnc(){
    console.log(count);
    count--;
    if(count<0){
        clearInterval(timer);
        console.log("Time's up!");
    }
}