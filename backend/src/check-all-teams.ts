import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkAllTeams() {
    try {
        console.log('Checking all teams...\n');
        
        const teams = await prisma.team.findMany({
            include: {
                users: true,
                team_progress: {
                    where: {
                        is_completed: true
                    }
                }
            }
        });

        for (const team of teams) {
            console.log(`Team: ${team.team_name}`);
            console.log(`Completed questions: ${team.team_progress.length}`);
            console.log(`Should be in elite page: ${team.team_progress.length === 15 ? 'YES' : 'NO'}`);
            console.log('---');
        }

        await prisma.$disconnect();
    } catch (error) {
        console.error('Error:', error);
        await prisma.$disconnect();
    }
}

checkAllTeams();
