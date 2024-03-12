//import { JWT_SECRET } from "../config/constants";
import { conflictError, loginError, notFoundError } from "../errors";
import { CreateUser, LogUser } from "../protocols";
import userRepository from "../repositories/user-repository";
import bcrypt from "bcrypt";
import jwt  from "jsonwebtoken";

export async function createUser ({email,password,name}:CreateUser) {
    const emailCheck = await checkEmail(email);
    if (emailCheck) throw conflictError('Email já cadastrado')
    const hashedPassword= await bcrypt.hash(password,10);
    return await userRepository.createUser({email,password:hashedPassword,name});
}

async function checkEmail(email:string) {
    const userEmail = await userRepository.findByEmail(email);
    if (userEmail) return userEmail;
}

export async function signIn({email,password}:LogUser) {
    const user = await checkEmail(email);
    if (!user) throw loginError('Usuario ou senha incorretos');
    const userId=user.id;
    const name= user.name;
    const correctPassword = await bcrypt.compare(password,user.password);
    if(!correctPassword) throw loginError('Usuario ou senha incorretos')
    const token = jwt.sign({userId},process.env.JWT_SECRET as string);
    await userRepository.createSession({token,userId});
    return {token,userId,name};
}

export async function logUserOut (userId:number, token:string){
    const logout = await userRepository.deleteSession(userId,token)
    return logout;
}

const userService = {
    createUser,
    signIn,
    logUserOut
}

export default userService;
