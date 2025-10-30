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
// Test the /get-teams endpoint directly
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function testGetTeams() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('🧪 Testing /get-teams logic...\n');
            // Simulate the exact query from /get-teams endpoint
            const teams = yield prisma.team.findMany({
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
            const completedTeams = teams.filter((team) => team.team_progress.length > 0);
            console.log(`\n✅ Teams that will show in Elite page: ${completedTeams.length}\n`);
            const sortedTeams = completedTeams.sort((a, b) => {
                return new Date(a.team_progress[0].solved_at).getTime() - new Date(b.team_progress[0].solved_at).getTime();
            });
            const result = sortedTeams.map((team, index) => ({
                rank: index + 1,
                team_name: team.team_name,
                solved_at: team.team_progress[0].solved_at,
                users: team.users.map((user) => ({
                    EnrollNo: user.EnrollNo,
                }))
            }));
            console.log('🏆 FINAL RESULT (what API returns):\n');
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
testGetTeams();
