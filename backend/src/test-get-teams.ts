// Test the /get-teams endpoint directly
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testGetTeams() {
    try {
        console.log('🧪 Testing /get-teams logic...\n');
        
        // Simulate the exact query from /get-teams endpoint
        const teams = await prisma.team.findMany({
            include: {
                users: true,
                team_progress: {
                    where: {
                        is_completed: true,
                        question: {
                            question_text: {
                                contains: '15'
                            }
                        }
                    },
                    orderBy: { solved_at: 'asc' },
                    take: 1
                }
            }
        });

        console.log(`📊 Total teams in database: ${teams.length}\n`);

        teams.forEach(team => {
            console.log(`Team: ${team.team_name}`);
            console.log(`  Q15 Completed: ${team.team_progress.length > 0 ? 'YES' : 'NO'}`);
            if (team.team_progress.length > 0) {
                console.log(`  Solved at: ${team.team_progress[0].solved_at}`);
            }
            console.log('');
        });

        // Apply the filter
        const completedTeams = teams.filter((team: any) => team.team_progress.length > 0);
        
        console.log(`\n✅ Teams that will show in Elite page: ${completedTeams.length}\n`);
        
        const sortedTeams = completedTeams.sort((a: any, b: any) => {
            return new Date(a.team_progress[0].solved_at).getTime() - new Date(b.team_progress[0].solved_at).getTime();
        });
        
        const result = sortedTeams.map((team: any, index: number) => ({
            rank: index + 1,
            team_name: team.team_name,
            solved_at: team.team_progress[0].solved_at,
            users: team.users.map((user: any) => ({
                EnrollNo: user.EnrollNo,
            }))
        }));

        console.log('🏆 FINAL RESULT (what API returns):\n');
        console.log(JSON.stringify(result, null, 2));

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testGetTeams();
