// Script to add sample questions and manage locks
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function setupQuestions() {
    try {
        console.log('🔓 Unlocking all teams...');
        await prisma.team.updateMany({
            data: { locked: false }
        });
        console.log('✅ All teams unlocked!');

        console.log('\n📝 Adding sample questions...');
        
        const questions = [
            {
                question_id: uuidv4(),
                question_text: 'Question 1',
                question_description: 'What is 2 + 2?',
                answer: '4'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 2',
                question_description: 'What is the capital of France?',
                answer: 'Paris'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 3',
                question_description: 'What color is the sky?',
                answer: 'blue'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 4',
                question_description: 'How many days are in a week?',
                answer: '7'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 5',
                question_description: 'What is the largest planet in our solar system?',
                answer: 'Jupiter'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 6',
                question_description: 'What is 10 x 10?',
                answer: '100'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 7',
                question_description: 'What programming language is this app written in?',
                answer: 'TypeScript'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 8',
                question_description: 'What is the square root of 64?',
                answer: '8'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 9',
                question_description: 'What year did World War 2 end?',
                answer: '1945'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 10',
                question_description: 'How many continents are there?',
                answer: '7'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 11',
                question_description: 'What is the smallest prime number?',
                answer: '2'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 12',
                question_description: 'What does HTTP stand for?',
                answer: 'HyperText Transfer Protocol'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 13',
                question_description: 'How many sides does a hexagon have?',
                answer: '6'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 14',
                question_description: 'What is the boiling point of water in Celsius?',
                answer: '100'
            },
            {
                question_id: uuidv4(),
                question_text: 'Question 15',
                question_description: 'What is the chemical symbol for gold?',
                answer: 'Au'
            }
        ];

        // Check if questions already exist
        const existingQuestions = await prisma.question.findMany();
        
        if (existingQuestions.length > 0) {
            console.log(`⚠️  Found ${existingQuestions.length} existing questions. Delete them? (y/n)`);
            console.log('Clearing old questions...');
            await prisma.question.deleteMany();
            console.log('✅ Old questions cleared!');
        }

        // Add questions
        for (const question of questions) {
            await prisma.question.create({
                data: question
            });
            console.log(`✅ Added: ${question.question_text} - ${question.question_description}`);
        }

        console.log('\n🎉 Setup complete!');
        console.log(`✅ Added ${questions.length} questions`);
        console.log('✅ All teams unlocked');
        
        // Show current status
        const totalQuestions = await prisma.question.count();
        const totalTeams = await prisma.team.count();
        const lockedTeams = await prisma.team.count({ where: { locked: true } });
        
        console.log('\n📊 Database Status:');
        console.log(`   Questions: ${totalQuestions}`);
        console.log(`   Teams: ${totalTeams}`);
        console.log(`   Locked Teams: ${lockedTeams}`);
        console.log(`   Unlocked Teams: ${totalTeams - lockedTeams}`);

    } catch (error) {
        console.error('❌ Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

setupQuestions();
