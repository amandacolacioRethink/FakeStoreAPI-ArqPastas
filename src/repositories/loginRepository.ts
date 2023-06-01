import knex from "knex";
import config from "../../knexfile";
import { Knex } from "knex";
import {User} from "../types/types"

const knexInstance: Knex = knex(config);

const getUsers = () => knexInstance("users").select("*");

const findIdUser= (user:User)=> knexInstance("users").select("id").where({ "users.user": user });

const findUser= (user:User)=> knexInstance("users").select("*").where({ "users.user": user.user });

const getUserById = (id: number) => knexInstance("users").select("*").where({ "users.id": id });

const createUser =  (user:User) => knexInstance("users").insert({
    user: user.user,
    senha:user.senha
});

const updateUser =  (user: User, id: number) => knexInstance("users").update( user ).where({ id });

const deleteUser =  (id: number) => knexInstance("users").delete().where({ id });

export default {
  getUsers,
  findIdUser, 
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findUser
};