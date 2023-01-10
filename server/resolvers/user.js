import { UserModel } from "../models/index.js";
import { ROLE_USER } from "../constants/index.js";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username, fullname, role } = user;
  return await jwt.sign({ id, email, fullname, username, role }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    users: async () => {
      const users = await UserModel.find({ role: ROLE_USER });
      return users;
    },
  },
  Mutation: {
    signUp: async (parent, { userName, password }) => {
      const user = await UserModel.create({
        userName,
        password,
      });

      return {
        token: createToken(user, process.env.ENCRYPT_SECRET_KEY, "30m"),
      };
    },

    signIn: async (parent, { login, password }) => {
      console.log(login);
      const user = await UserModel.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return {
        token: createToken(user, process.env.ENCRYPT_SECRET_KEY, "30m"),
      };
    },
    deleteUser: async (parent, { id }, { models }) => {
      const user = await UserModel.findById(id);

      if (user) {
        await user.remove();
        return true;
      } else {
        return false;
      }
    },
    changePassword: async (parent, { id, password }) => {
      const result = await UserModel.findByIdAndUpdate(id, {
        password: password,
      });
      if (result != null) {
        return true;
      } else {
        return false;
      }
    },
  },
};
