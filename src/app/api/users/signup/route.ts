import { connect } from "@/dbConfig/dbConfig";

import User from '@/models/userModel'
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password}= reqBody

        const user = await User.findOne({email})

        console.log(email )
        if(user){
            return NextResponse.json({error:"User aleady exists"},{status:400})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)

        // storing new user in DB

        const newUser = new User({
            email,
            username,
            password:hashedPass
        })
        
        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email

        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        },{status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},
        {status : 500})
    }
}