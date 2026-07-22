import { getCurrentUser } from "@/app/lib/auth";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

export async function GET(request : NextRequest)
{
    try{

        const user = await getCurrentUser();
        if(!user)
        {
            return NextResponse.json({
                "error" : "You are not authenticated"
                
            }, {status: 401});
        }
        return NextResponse.json(user);

    }
    catch(error)
    {
        console.log("error : ", error);
        return NextResponse.json({
            error : "Internal server error, Internal server error"
        },
        {"status" : 500}
    );

    }

}