import mongoose from "mongoose";
import CryptoJS from "crypto-js";

function encrypt(text) {
  return CryptoJS.HmacSHA256(text, process.env.ENCRYPT_SECRET_KEY).toString(
    CryptoJS.enc.Hex
  );
}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    userName: {
      type: String,
    },
    role: {
      type: String,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
    },
    taxCode: {
      type: String,
    },
    phone: {
      type: String,
    },
    fax: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: String,
    },
    birthday: {
      type: Date,
    },
    workingAt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    userName: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

userSchema.pre("remove", function (next) {
  this.model("Message").deleteMany({ userId: this._id }, next);
});

userSchema.pre("save", async function () {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function () {
  return await encrypt(this.password);
};

userSchema.methods.validatePassword = async function (password) {
  const password_hash = encrypt(password);
  if (password_hash === this.password) {
    return true;
  }
  return false;
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
