// Test new get-teams logic
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testNewLogic() {
    try {
        console.log('🧪 Testing NEW /get-teams logic...\n');
        
        // New query - directly get completed Q15 progress
        const completedQ15Progress = await prisma.teamProgress.findMany({
            where: {
                is_completed: true,
                question: {
                    question_text: {
                        contains: '15'
                    }
                }
            },
            include: {
                team: {
                    include: {
                        users: true
                    }
                },
                question: true
            },
            orderBy: {
                solved_at: 'asc'
            }
        });

        console.log(`✅ Found ${completedQ15Progress.length} teams that completed Q15\n`);

        // Map to result format
        const result = completedQ15Progress.map((progress: any, index: number) => ({
            rank: index + 1,
            team_name: progress.team.team_name,
            solved_at: progress.solved_at,
            users: progress.team.users.map((user: any) => ({
                EnrollNo: user.EnrollNo,
            }))
        }));

        console.log('🏆 API RESPONSE:\n');
        console.log(JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testNewLogic();
