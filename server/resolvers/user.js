import { UserModel } from "../models/index.js";
import { ROLE_USER } from "../constants/index.js";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";
import path from "path";
import fs from "fs";
import CryptoJS from "crypto-js";

function encrypt(text) {
  return CryptoJS.HmacSHA256(text, process.env.ENCRYPT_SECRET_KEY).toString(
    CryptoJS.enc.Hex
  );
}


const createToken = async (user, secret, expiresIn) => {
  const { id, email, userName, fullName, role } = user;
  return await jwt.sign({ id, email, fullName, userName, role }, secret, {
    expiresIn,
  });
};

export default {
  Query: {
    users: async () => {
      const users = await UserModel.find({ role: ROLE_USER });
      console.log("user",users);
      return users;
    },
    user: async (parent, { id}) => {
      console.log("id",id)
      const user = await UserModel.findOne({ _id: id });
      console.log("id",user)
      return user;
    },
    fileUpload : () =>"heloo anh em "
  },
  Mutation: {
    signUp: async (parent, { userName, password ,role}) => {
      const user = await UserModel.create({
        userName,
        password,
        role
      });

      return {
        token: createToken(user, process.env.ENCRYPT_SECRET_KEY, "30m"),
      };
    },

    signIn: async (parent, { login, password }) => {
      console.log(login,password);
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
      const password_hash = await encrypt(password);
      const result = await UserModel.findByIdAndUpdate(id, {
        password: password_hash,
      });
      if (result != null) {
        return true;
      } else {
        return false;
      }
    },
    
    addUser: async (parent, args) => {
      const password_hash =  await encrypt(args.password);
      console.log("pa",password_hash)
      const user = await UserModel.create({
        userName:args.userName,
        password:args.password,
        role:args.role,
        code:args.code,
        birthday:args.birthday,
        address:args.address,
        fullName:args.fullName,
        createdAt:args.createdAt,
        image:args.image
      });
      return user;
    },
    updateUser: async (parent, args) => {
      const driverId = args._id;
      const result = await UserModel.findByIdAndUpdate(driverId, {
        fullName: args.fullName,
        code: args.code,
        birthday: args.birthday,
        userName: args.userName,
        password:args.password,
        address:args.address,
        image:args.image
      });
      return result;
    },
    updateProfile: async (parent, args) => {
      const driverId = args._id;
      const result = await UserModel.findByIdAndUpdate(driverId, {
        fullName: args.fullName,
        code: args.code,
        birthday: args.birthday,
        address:args.address,
        image:args.image
      });
      return result;
    },
    // uploadFile: async (_, { file }) => {
    //   const { createReadStream, filename } = await file;

    //   await new Promise(res =>
    //     createReadStream()
    //       .pipe(createWriteStream(path.join(__dirname, "../images", filename)))
    //       .on("close", res)
    //   );

    //   files.push(filename);

    //   return true;
    // },
    uploadFile: async (_,{file}) =>{
      console.log("fileBE",file)
      const {filename,mimetype,encoding,createReadStream} = await file;
      
      const stream = createReadStream();
      const pathName = path.join(__dirname,`/public/images/${filename}`);
      await stream.pipe(fs.createWriteStream(pathName));
      return{
        url:`http://localhost:5000/images/${filename}`
      }
    }
  },
};
