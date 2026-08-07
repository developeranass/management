import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
const adapter = new PrismaMariaDb(
  process.env.DATABASE_URL! + "?allowPublicKeyRetrieval=true",
);

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function checkDatabaseConnection() : Promise<boolean> {

    try{
        await prisma.$queryRaw `Select 1`;
        return true;
    }
    catch(error)
    {
        console.error(`Database connection failed : ${error} `);
        return false;

    }    
}



// import { PrismaClient } from "@prisma/client";
// import { PrismaPg } from "@prisma/adapter-pg";

// const connectionString = process.env.DATABASE_URL;

// const schema = connectionString
//     ? new URL(connectionString).searchParams.get("schema") ?? undefined
//     : undefined;

// const adapter = new PrismaPg({ connectionString }, schema ? { schema } : undefined);

// export const prisma = new PrismaClient({ adapter });

// export async function checkDatabaseConnection(): Promise<boolean> {
 
//     try{

//         await prisma.$queryRaw`Select 1`;
//         return true;

//     }
//     catch(error)
//     {
//         console.log(`Database connection failed: ${error} `);
//         return false;

//     }
// }