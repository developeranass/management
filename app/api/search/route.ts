import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request): Promise<any> => {

    try {
        const { query } = await request.json();

        const data = await prisma.user.findMany({
            where: { email: { contains: query } },
        });

        return NextResponse.json({ data });
    }
    catch (error) {
        console.error(error); // full message + stack in the server terminal
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }


}