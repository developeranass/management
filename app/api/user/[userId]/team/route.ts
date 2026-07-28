import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("starting database seed...");

  const teams = await Promise.all([
    prisma.team.create({
      data: {
        name: "Team A",
        description: "First seeded team",
        code: "TEAM-A",
      },
    }),
    prisma.team.create({
      data: {
        name: "Team B",
        description: "Second seeded team",
        code: "TEAM-B",
      },
    }),
  ]);

  console.log(teams);
}

main()
  .catch((e) => {
    console.error("seeding failed", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });