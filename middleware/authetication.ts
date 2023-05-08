import { Request, Response,NextFunction } from "express";
import jwt from "jsonwebtoken"
import { makeError  } from "../middleware/erroHandler"

const authToken =async (req: Request, res: Response,next:NextFunction) => {
    try{
        const userToken = req.headers.authorization?.split(" ")[1]!;
    
        const tokenVerify = jwt.verify(userToken, process.env.SECRET_TOKEN!);
        if(!tokenVerify) throw makeError({ message: "Invalid Token", status: 400 });
        next();
        
    }catch(error:any){
        next(error);
    }
}

export default {authToken}