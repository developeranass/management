import { getMaxAge } from "next/dist/server/image-optimizer";
import { NextRequest, NextResponse } from "next/server"

export async function POST(request : NextRequest) {

   const response = NextResponse.json({
        "message" : "User Logged out successfully",


    }, {status : 200});

        response.cookies.set("token","",{
            httpOnly: true,
            secure : process.env.NODE_ENV === "production",
            sameSite : "lax",
            maxAge : 0,
        }
    )

    return response;

}