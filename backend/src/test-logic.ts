import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testGetTeamsLogic() {
    try {
        console.log('Testing /get-teams logic...\n');
        
        // Get all teams with their completed progress
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

        console.log('All teams with progress:');
        teams.forEach(team => {
            console.log(`- ${team.team_name}: ${team.team_progress.length} completed questions`);
        });
        console.log();

        // Filter teams that completed ALL 15 questions
        const completedTeams = teams.filter(team => team.team_progress.length === 15);

        console.log('Teams that completed ALL 15 questions:');
        completedTeams.forEach(team => {
            console.log(`- ${team.team_name}`);
        });
        console.log();

        // Get Question 15 completion time for each team to determine ranking
        const teamsWithCompletionTime = await Promise.all(
            completedTeams.map(async (team) => {
                const q15Progress = await prisma.teamProgress.findFirst({
                    where: {
                        team_name: team.team_name,
                        is_completed: true,
                        question: {
                            question_text: {
                                contains: '15'
                            }
                        }
                    }
                });

                return {
                    team_name: team.team_name,
                    solved_at: q15Progress?.solved_at || new Date(),
                    users: team.users.map((user: any) => ({
                        EnrollNo: user.EnrollNo,
                    }))
                };
            })
        );

        // Sort by completion time (earliest first)
        teamsWithCompletionTime.sort((a, b) => 
            new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime()
        );

        // Add rank numbers
        const result = teamsWithCompletionTime.map((team, index) => ({
            rank: index + 1,
            ...team
        }));

        console.log('Final result (what API should return):');
        console.log(JSON.stringify(result, null, 2));

        await prisma.$disconnect();
    } catch (error) {
        console.error('Error:', error);
        await prisma.$disconnect();
    }
}

testGetTeamsLogic();
