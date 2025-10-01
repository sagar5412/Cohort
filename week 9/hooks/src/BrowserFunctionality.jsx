import { useEffect, useState } from "react";

export function CheckStatus(){
    const [isOnline, setOnline] = useState(window.navigator.onLine);

    useEffect(()=>{
        window.addEventListener("online", ()=>{
            setOnline(true);
        })
        window.addEventListener("offline", ()=>{
            setOnline(false);
        })
    },[])
    // if(isOnline){
    //     return <div>You are online</div>
    // }
    // return <div>You are offline</div>
    return isOnline
}

