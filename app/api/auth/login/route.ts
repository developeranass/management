import { generateToken, hashPassword, verifyPassword } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Role } from "@/app/types";
import { error } from "console";
import { verify } from "crypto";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // Validate required fields
        if ( !email || !password) {
            return NextResponse.json(
                { error: "Name, email and password are required" },
                { status: 400 }
            );
        }

        // Reject duplicate email
        const userFromDb = await prisma.user.findUnique({
            where: { email },
            include: {team : true}
        });

        if(!userFromDb)
        {
            return NextResponse.json({
                error : "Invalid Credientials"
            },
            {"status": 401}
        );
        }
        
        const isValidPassord = await verifyPassword(password, userFromDb.password);
        if(!isValidPassord)
        {
            return NextResponse.json({
                error : "Invalid Credientials"
            },
            {"status": 401}
        );
        }



        const token = generateToken(userFromDb.id);

        const response = NextResponse.json({
            user: {
                id: userFromDb.id,
                email: userFromDb.email,
                name: userFromDb.name,
                role: userFromDb.role,
                teamId: userFromDb.teamId,
                team: userFromDb.team,
            },
            token,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return response;
    } catch (error) {
        console.error("Login failed:", error);
        return NextResponse.json(
            { error: error },
            { status: 500 }
        );
    }
}
