import { getCurrentUser } from "@/app/lib/auth";
import { Prisma } from "@prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";
import { Role , User } from "@/app/types";
import { prisma } from "@/app/lib/db";

export async function GET(request : NextRequest) {
 
    try{

        const user = await getCurrentUser();
        if(!user)
        {
            return NextResponse.json(
                { 
                    error : "You are not authorized to access user information" },
                    {status : 401}
            );
            
        }
       
        const searchParams = request.nextUrl.searchParams;
        const teamId = searchParams.get("teamId");
        const role = searchParams.get("role");

        const where: Prisma.UserWhereInput = {};
        if(user.role === Role.ADMIN)
        {
            //Manager can see users in their team or in cross team users but
            
        }
        else if(user.role == Role.MANAGER)
        {
            where.OR = [{teamId : user.teamId } , {role: Role.USER}];
        }
        else
        {
            where.teamId = user.teamId;
            where.role = {not : Role.ADMIN}
        }

        if(teamId)
        {
            where.teamId = teamId;
        }
        // if(role)
        // {
        //     where.role = role;
        // }


        const users = await prisma.user.findMany({
            where,
            select : {
                id : true,
                name : true,
                email : true,
                role : true,
                //createdAt : true,
            },
            orderBy : { createdAt : "desc" }
        });
        
        
        return NextResponse.json({users});

    }
    catch(error)
    {
        console.error("Get users error", error);
    }
    
}