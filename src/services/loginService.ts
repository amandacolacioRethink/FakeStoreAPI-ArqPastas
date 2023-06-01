import loginRepository from "../repositories/loginRepository";
import { makeError  } from "../middleware/erroHandler"
import bcrypt from "bcrypt"
import {User} from "../types/types"
import jwt from "jsonwebtoken"

const getUsers = async () => await loginRepository.getUsers();

const getUserById = async (id: number) => {
    const user = await loginRepository.getUserById(id);
    if (!user.length) throw makeError({ message: "User not found", status: 400 });
    return user[0];
  }
  
const createUser = async (user: any) => {
    const saltRounds = process.env.SALT!
    const hash = await bcrypt.hash(user.senha, Number(saltRounds));
    user.senha=hash;
    const createUser = await loginRepository.createUser(user);
    return {id: createUser[0], ...user}  
};

const updateUser = async (user: User, id: number) => {
    const saltRounds = process.env.SALT!
    const hash = await bcrypt.hash(user.senha, Number(saltRounds));
    user.senha=hash;
    const updatedUser = await loginRepository.updateUser(user, id);
    if (!updatedUser) throw makeError({ message: "Couldn't no update this user", status: 400 })
    return { id:id, user:user.user, senha:user.senha };
};

const deleteUser = async (id: number) => {
    const deletedUser = await loginRepository.deleteUser(id);
    if (!deletedUser) throw makeError({ message: "User doesn't exists", status: 400 });
    return { message: "User deleted" };
};

const verifyUser = async (user:User) => {
  const userExists  = await loginRepository.findUser(user);
  const userPasswordCorrect:string = userExists[0].senha;
  if (!userExists) throw makeError({ message: "User doesn't exists", status: 400 });
  const verifyPassword = await bcrypt.compare(user.senha, userPasswordCorrect); 
  if(verifyPassword) return await createToken(userExists);
  return { message: "Incorrect Password" }
};

const createToken =async (user:any) => {
  const token = jwt.sign(
    {
      id: user.id,
      user: user.user,
      senha: user.senha
    },
    process.env.SECRET_TOKEN!,
    { expiresIn: "7 days" }
  );

  return token;
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  verifyUser
};