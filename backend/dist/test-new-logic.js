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
// Test new get-teams logic
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function testNewLogic() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🧪 Testing NEW /get-teams logic...\n');
            // New query - directly get completed Q15 progress
            const completedQ15Progress = yield prisma.teamProgress.findMany({
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
            const result = completedQ15Progress.map((progress, index) => ({
                rank: index + 1,
                team_name: progress.team.team_name,
                solved_at: progress.solved_at,
                users: progress.team.users.map((user) => ({
                    EnrollNo: user.EnrollNo,
                }))
            }));
            console.log('🏆 API RESPONSE:\n');
            console.log(JSON.stringify(result, null, 2));
        }
        catch (error) {
            console.error('❌ Error:', error);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
testNewLogic();
