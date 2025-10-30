// Script to check database contents
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
    try {
        console.log('📊 DATABASE CONTENTS:\n');
        
        // Check Teams
        const teams = await prisma.team.findMany({
            include: {
                users: true
            }
        });
        console.log('👥 TEAMS:', teams.length);
        teams.forEach((team, i) => {
            console.log(`\n${i + 1}. Team: ${team.team_name}`);
            console.log(`   Password: ${team.team_password}`);
            console.log(`   Locked: ${team.locked}`);
            console.log(`   Users: ${team.users.length}`);
            team.users.forEach(user => {
                console.log(`      - ${user.name} (${user.EnrollNo})`);
            });
        });

        // Check Questions
        const questions = await prisma.question.findMany();
        console.log(`\n\n📝 QUESTIONS: ${questions.length}`);
        questions.forEach((q, i) => {
            console.log(`${i + 1}. ${q.question_text}: ${q.question_description}`);
            console.log(`   Answer: ${q.answer}`);
        });

        // Check Team Progress
        const progress = await prisma.teamProgress.findMany({
            include: {
                team: true,
                question: true
            }
        });
        console.log(`\n\n✅ TEAM PROGRESS: ${progress.length}`);
        progress.forEach((p, i) => {
            console.log(`${i + 1}. ${p.team_name} - ${p.question.question_text}`);
            console.log(`   Completed: ${p.is_completed}`);
            console.log(`   Solved at: ${p.solved_at}`);
        });

        // Check Hints
        const hints = await prisma.hint.findMany();
        console.log(`\n\n💡 HINTS: ${hints.length}`);
        hints.forEach((h, i) => {
            console.log(`${i + 1}. ${h.hintText} (${h.createdAt})`);
        });

        console.log('\n\n✅ Database check complete!');

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

checkDatabase();
