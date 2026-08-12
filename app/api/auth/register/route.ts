import { prisma } from "@/app/lib/db";
import bcrypt from "bcryptjs";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)
{
    try{

        const {name, email, password} = await request.json();
        if(!name || !email || !password)
        {
            return NextResponse.json({
                error : "name , email & password is required or not valid"
            }, {status : 400});
        }

        const existingUser = await prisma.user.findUnique({
            where: {email},
        });

        if(existingUser)
        {
            return NextResponse.json({
                "error" : "User Already exist"

            },{status : 409 })
            
        }

        const pass = await bcrypt.hash(password,10);

        const user = await prisma.user.create({
            data: {
              name,
              email,
              password : pass
            },
            select : {
                id : true,
                name : true,
                email : true,
                role : true,
                password : true                
            }
        })
        return NextResponse.json(user, {status: 201});

    }
    catch(error)
    {

        return NextResponse.json({
            "error" : error
        })

    }

}