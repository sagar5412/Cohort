import { NextRequest } from "next/server"

export function GET(){
    return Response.json({
        email: "sagar@gmail.com",
        name : "sagar"
    })
}

export async function POST(req:NextRequest){
    const body = await req.json();
    console.log(body);
    return Response.json({
        msg:"you are logged in"
    })
}