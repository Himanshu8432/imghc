import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
export interface IUser{
    name:string;
    email:string;
    password:string;
    _id?:mongoose.Types.ObjectId;
    createdAt?:Date;
    updatedAt?:Date;
}
const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
},

{timestamps:true}
);
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
    next();
});

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;