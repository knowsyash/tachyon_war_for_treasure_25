"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Script to check database contents
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function checkDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('📊 DATABASE CONTENTS:\n');
            // Check Teams
            const teams = yield prisma.team.findMany({
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
            const questions = yield prisma.question.findMany();
            console.log(`\n\n📝 QUESTIONS: ${questions.length}`);
            questions.forEach((q, i) => {
                console.log(`${i + 1}. ${q.question_text}: ${q.question_description}`);
                console.log(`   Answer: ${q.answer}`);
            });
            // Check Team Progress
            const progress = yield prisma.teamProgress.findMany({
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
            const hints = yield prisma.hint.findMany();
            console.log(`\n\n💡 HINTS: ${hints.length}`);
            hints.forEach((h, i) => {
                console.log(`${i + 1}. ${h.hintText} (${h.createdAt})`);
            });
            console.log('\n\n✅ Database check complete!');
        }
        catch (error) {
            console.error('❌ Error:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
checkDatabase();
