import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await Promise.all(
        [{ id: 1, name: 'Admin' }].map(r =>
            prisma.adminRole.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );
    await Promise.all(
        [
            { id: 1, name: 'pending' },
            { id: 2, name: 'verified' },
            { id: 3, name: 'deleted' },
        ].map(r =>
            prisma.adminStatus.upsert({
                where: { id: r.id },
                update: {},
                create: {
                    id: r.id,
                    name: r.name,
                },
            }),
        ),
    );
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
