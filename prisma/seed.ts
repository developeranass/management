import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { hashPassword } from "@/app/lib/auth";

async function main() {

    console.log("Starting database seed...");

    // Make the seed re-runnable: `name`, `code` and `email` are all unique.
    await prisma.user.deleteMany();
    await prisma.team.deleteMany();

    const teams = await Promise.all([

      prisma.team.create({
        data : {
          name : "Engineering",
          description : "Software development team",
          code : "ENG-2024"
        }
      }),
      prisma.team.create({
        data : {
          name : "Marketing",
          description : "Marketing and sales team",
          code : "MKT-2024"
        }
      }),
      prisma.team.create({
        data : {
          name : "Operations",
          description : "Business operations team",
          code : "OPS-2024"
        }
      })

    ]);

    const sampleUsers = [
    {
      name : "John developer",
      email : "john@company.com",
      team  : teams[0],
      role  : Role.MANAGER
    },
    {
      name : "Jane Designer",
      email : "jane@company.com",
      team  : teams[0],
      role  : Role.USER
    },
    {
      name : "Bob marketer",
      email : "bob@company.com",
      team  : teams[1],
      role  : Role.USER
    },
    {
      name : "Alice Sales",
      email : "alice@company.com",
      team  : teams[1],
      role  : Role.USER
    }
  ];

  for (const userData of sampleUsers)
  {
    await prisma.user.create({
      data : {
        email    : userData.email,
        name     : userData.name,
        password : await hashPassword("123456"),
        role     : userData.role,
        teamId   : userData.team.id
      }
    });
  }

  console.log(`Seeded ${teams.length} teams and ${sampleUsers.length} users.`);

}

main()
.catch((e) => {

  console.error("seeding failed", e);
  process.exit(1);

}).finally(async () => {

  await prisma.$disconnect();

})
