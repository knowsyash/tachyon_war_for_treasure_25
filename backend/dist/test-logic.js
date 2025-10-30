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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function testGetTeamsLogic() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Testing /get-teams logic...\n');
            // Get all teams with their completed progress
            const teams = yield prisma.team.findMany({
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
            const teamsWithCompletionTime = yield Promise.all(completedTeams.map((team) => __awaiter(this, void 0, void 0, function* () {
                const q15Progress = yield prisma.teamProgress.findFirst({
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
                    solved_at: (q15Progress === null || q15Progress === void 0 ? void 0 : q15Progress.solved_at) || new Date(),
                    users: team.users.map((user) => ({
                        EnrollNo: user.EnrollNo,
                    }))
                };
            })));
            // Sort by completion time (earliest first)
            teamsWithCompletionTime.sort((a, b) => new Date(a.solved_at).getTime() - new Date(b.solved_at).getTime());
            // Add rank numbers
            const result = teamsWithCompletionTime.map((team, index) => (Object.assign({ rank: index + 1 }, team)));
            console.log('Final result (what API should return):');
            console.log(JSON.stringify(result, null, 2));
            yield prisma.$disconnect();
        }
        catch (error) {
            console.error('Error:', error);
            yield prisma.$disconnect();
        }
    });
}
testGetTeamsLogic();
