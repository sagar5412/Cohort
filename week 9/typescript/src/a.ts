// const x : number = 1;
// console.log(x);


// function greet(firstName:string){
//     console.log("Hello "+firstName);
// }

// greet("sagar");


//type inference
// function sum(a:number,b:number): number{
//     return a+b;
// }

// const value = sum(1,2);
// console.log(value);

// function after1S(fn:()=> void){
//     setTimeout(fn,1000);
// }
// after1S(()=>{
//     console.log("Hi there");
// })


// Interfaces

// interface User{
//     firstName:string,
//     lastName:string,
//     age:number,
//     email?:string // optional '?'
// }

// function checkAge(user:User){
//     if(user.age>18){

//         console.log("eligible")
//     }else{
//         console.log("not eligible")

//     }
// }

// checkAge({
//     firstName:"sagar",
//     lastName:"gk",
//     age:21
// })



// Types

// type GreetArg = number | string
// function greet(id:GreetArg){

// }

// greet(1);
// greet("hi");

// what is difference between type and interface
// -- type let you do unions,intersection and interface let you do extend in the class,implements the class


// enum

// enum Direction{
//     up,  //up=1,
//     down,
//     right,
//     left
// }

// function doSomething(keyPressed : Direction){
//     if(keyPressed == Direction.down){

//     }
// }

// doSomething(Direction.left);
// console.log(Direction.down)
// console.log(Direction.up)


// Generics

function getfirst<T>(arr:T[]){
    return arr;
}

const el1 = getfirst<string>(["hi"]);
const el2 = getfirst([123]);

console.log(typeof(el1));
console.log(el1);
console.log(el2);