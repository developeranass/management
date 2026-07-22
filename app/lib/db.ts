import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

// The `pg` driver ignores Prisma's `?schema=` connection param, so read it from
// the URL and pass it to the adapter — otherwise queries default to `public`.
const schema = connectionString
    ? new URL(connectionString).searchParams.get("schema") ?? undefined
    : undefined;

const adapter = new PrismaPg({ connectionString }, schema ? { schema } : undefined);

export const prisma = new PrismaClient({ adapter });

export async function checkDatabaseConnection(): Promise<boolean> {
 
    try{

        await prisma.$queryRaw`Select 1`;
        return true;

    }
    catch(error)
    {
        console.log(`Database connection failed: ${error} `);
        return false;

    }
}