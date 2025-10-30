// Check specific team progress
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkTeam() {
    try {
        const teamName = 'lala'; // or whatever the team name is
        
        console.log(`\n🔍 Checking team: ${teamName}\n`);
        
        // Get team with all progress
        const team = await prisma.team.findUnique({
            where: { team_name: teamName },
            include: {
                users: true,
                team_progress: {
                    where: { is_completed: true },
                    include: { question: true },
                    orderBy: { solved_at: 'asc' }
                }
            }
        });

        if (!team) {
            console.log('❌ Team not found!');
            return;
        }

        console.log('👥 Team:', team.team_name);
        console.log('🔒 Locked:', team.locked);
        console.log('📊 Total Questions Solved:', team.team_progress.length);
        
        console.log('\n✅ Solved Questions:');
        team.team_progress.forEach((progress, i) => {
            console.log(`${i + 1}. ${progress.question.question_text}`);
            console.log(`   Solved at: ${progress.solved_at}`);
        });

        // Check specifically for Question 15
        const q15 = team.team_progress.find(p => p.question.question_text.includes('15'));
        console.log('\n🎯 Question 15 Status:');
        if (q15) {
            console.log('✅ COMPLETED');
            console.log(`   Solved at: ${q15.solved_at}`);
        } else {
            console.log('❌ NOT COMPLETED');
        }

        // Check what /get-teams would return for this team
        console.log('\n🔍 What /get-teams sees:');
        const teamsQuery = await prisma.team.findMany({
            where: { team_name: teamName },
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

        console.log('team_progress length:', teamsQuery[0]?.team_progress.length);
        console.log('Should show in elite page?', teamsQuery[0]?.team_progress.length > 0 ? 'YES' : 'NO');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkTeam();
