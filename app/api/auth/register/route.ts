import { prisma } from "@/app/lib/db";
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
            
        }




    }
    catch(error)
    {

    }

}