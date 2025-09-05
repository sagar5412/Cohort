function add(){
    let a=0;
    for(let i=0;i<100000000;i++){
        a+=i;
    }
    return a;
}

const beforeTime= new Date();
let Before=beforeTime.getTime();
add();
const afterTime=new Date();
const After=afterTime.getTime();

console.log(afterTime-beforeTime);
