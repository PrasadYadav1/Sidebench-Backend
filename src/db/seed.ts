import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await Promise.all(
        [
            { id: 1, name: 'Super Admin' },
            { id: 2, name: 'Admin' },
        ].map(r =>
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
            { id: 1, name: 'Invited' },
            { id: 2, name: 'Active' },
            { id: 3, name: 'Deactivated' },
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
    await Promise.all(
        [
            { id: 1, name: 'To Do' },
            { id: 2, name: 'In Progress' },
            { id: 3, name: 'Queued' },
            { id: 4, name: 'Completed' },
        ].map(r =>
            prisma.lookbookStatus.upsert({
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
