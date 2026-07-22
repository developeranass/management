import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    const { id, name } = body;

    return NextResponse.json({
        id,
        name,
    });
}