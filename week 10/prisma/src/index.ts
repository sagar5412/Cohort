import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

async function insertUser(email: string, password: string, firstName: string, lastName: string) {
    const res = await prisma.user.create({
        data: {
            email,
            password,
            firstName,
            lastName
        }
    })
    console.log(res);
}

interface UpdateParams{
    email:string;
    firstName:string;
    lastName:string;
}

async function updateUser(id:number,{email,firstName,lastName}:UpdateParams) {
    const res = await prisma.user.update({
        where:{
            id
        },
        data:{
            email,
            firstName,
            lastName
        }
    })
    console.log("User updated", res);
}

async function findUser() {
    const res = await prisma.user.findMany({

    })
    console.log(res);
}

// insertUser("sagar1@gmail.com","sagar","sagar","gk");
// updateUser(4,{
//     email:"shwetha@gmail.com",
//     firstName:"shwetha",
//     lastName:"gk"
// });

findUser();