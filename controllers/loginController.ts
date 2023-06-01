import { Request, Response,NextFunction } from "express";
import userService from "../services/loginService"
import {User} from "../types/types"
import loginService from "../services/loginService";

const index = async (_req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const user = await userService.getUsers();
    res.status(200).send(user);
  } catch (error: unknown) {
    next(error)
  }
};

const show = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);;
    const showUser: User = await userService.getUserById(id);
    res.status(200).send(showUser);
  } catch (error: unknown) {
    next(error)
  }
};

const insert = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const user = req.body;
    const createdUser = await userService.createUser(user);
    res.status(200).send(createdUser);
  } catch (error: unknown) {
    next(error)
  }
};
const login = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const user : User  = req.body;
      const verifiedUser = await userService.verifyUser(user);
      res.status(200).send(verifiedUser);
    } catch (error: unknown) {
      next(error)
    }
  };

const update = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const id : string = req.params.id
    const user: User = req.body
    const updatedUser = await loginService.updateUser(user,Number(id))
    res.status(201).send(updatedUser);
  } catch (error: unknown) {
    next(error)
  }
};

const remove = async (req: Request, res: Response,next:NextFunction): Promise<void> => {
  try {
    const id: number = parseInt(req.params.id);
    const deletedUser = await userService.deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error: unknown) {
    next(error)
  }
};

export default { index, show, insert, update, remove,login };