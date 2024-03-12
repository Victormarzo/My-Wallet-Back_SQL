import { prisma } from "../config/database";
import { CreateUser, NewSession } from "../protocols";

async function findByEmail (email:string){
    return prisma.user.findUnique({
        where:{
            email
        }
    })
}

async function createUser(data:CreateUser) {
    return prisma.user.create({
        data
    })
}

async function createSession(data:NewSession){
    return prisma.session.create({
        data
    })
}

async function deleteSession(userId:number,token:string) {
    const session = await findSession(userId,token)
    if (session){
        const id = session.id
        return prisma.session.delete({
            where:{
                id,
            }
        })
    }
  
}

async function findSession (userId:number,token:string) {
    return prisma.session.findFirst({
        where:{
            userId,
            token
        }
    })
}
const userRepository = {
    findByEmail,
    createUser,
    createSession,
    deleteSession
}
export default userRepository