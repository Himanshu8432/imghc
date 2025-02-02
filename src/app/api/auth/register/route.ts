import { NextRequest,NextResponse } from "next/server";
import { dbConnect } from "../../../../../lib/db";
import User from "../../../../../models/user";


export async  function POST(req:NextRequest){
    try{
        const {email,password} = await req.json()
   console.log(email,password)
        if(!email||!password){
            return NextResponse.json({error:"Email and password are required"},{status:400});
        }
        await dbConnect();
        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json({error:"User already exists"},{status:400});
        }
        await User.create({
            email,
            password,
        });
        return NextResponse.json({message:"User created successfully"},{status:201});
    } catch(err){
        return NextResponse.json({error:err},{status:500});
    }
}