import { getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role, User } from "@/app/types";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

    try{
        const user = getCurrentUser();
        if(!user)
        {
            return NextResponse.json(
                {
                    "error" : "you are not authorized to access user information"
                }, {"status" : 401 }                
            );
        }

        const searchParams = request.nextUrl.searchParams;
        const teamId = searchParams.get("teamId");
        const role = searchParams.get("role");

        const where: Prisma.UserWhereInput = {};
        if(user.role === Role.ADMIN)
        {


        }
        else if(user.role == Role.MANAGER)
        {

            where.OR = [{ teamId : user.teamId}, {role : Role.USER}];

        }
        else
        {
            where.teamId = user.teamId;
            where.role = {not : Role.ADMIN};
        }


        if(teamId)
        {
            where.teamId = teamId;
        }    
        if(role)
        {
            where.role = role;
        }    

        const users = await prisma.user.findMany({
            where,
            select :{
                id : true,
                email : true,
                name : true,
                role: role,
                team: {
                    select : {
                        id : true,
                        name : true
                    },
                },
             createdAt : true,
             orderBy : { createdAt : "desc"}       
            },
            return NextResponse.json({users});

    });
        
    }
    catch(error)
    {
        console.error("Get user error", error);
        return NextResponse.json({
            error : "internal server error, something went wrong"
        }, {"status" : 500});


    }
    
}