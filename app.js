/**
 * openScoreBoard - Main Logic
 */

class ScoreBoard {
    constructor() {
        this.gameState = {
            isRunning: false,
            currentTime: 0, // in seconds (calculated from timestamps)
            startTimestamp: null, // When timer started (ms)
            elapsedTime: 0, // Time consumed before current run (seconds)
            phaseStartTime: 0, // Initial time for current phase (seconds)
            phaseIndex: 0,

            teamA: {
                name: 'HOME',
                score: 0,
                fouls: 0,
                timeoutsUsed: 0,
                timeoutsMax: 2,
                isPenaltyManual: false,
                color: '#e74c3c',
                players: [] // Pro Mode: [{id, number, name, points, fouls}]
            },
            teamB: {
                name: 'GUEST',
                score: 0,
                fouls: 0,
                timeoutsUsed: 0,
                timeoutsMax: 2,
                isPenaltyManual: false,
                color: '#3498db',
                players: []
            },

            settings: {
                maxFouls: 5, // Default FIBA
                proMode: false,
                maxPlayerFouls: 5,
                phases: [
                    { id: 'i1', type: 'interval', duration: 20 * 60, label: 'PRE' },
                    { id: 'p1', type: 'period', duration: 10 * 60, label: 'Q1' },
                    { id: 'i2', type: 'interval', duration: 2 * 60, label: 'INT' },
                    { id: 'p2', type: 'period', duration: 10 * 60, label: 'Q2' },
                    { id: 'i3', type: 'interval', duration: 10 * 60, label: 'HALFTIME' },
                    { id: 'p3', type: 'period', duration: 10 * 60, label: 'Q3' },
                    { id: 'i2', type: 'interval', duration: 2 * 60, label: 'INT' },
                    { id: 'p4', type: 'period', duration: 10 * 60, label: 'Q4' }
                ]
            }
        };

        this.timerInterval = null;
        this.init();
    }

    init() {
        this.loadState();
        if (this.gameState.currentTime === 0 && this.gameState.phaseIndex === 0 && !this.gameState.isRunning) {
            this.resetTimerPhase();
        }
        this.startTimerLoop();
        this.updateConsoleUI();
        this.updateSettingsUI();
    }

    loadState() {
        const saved = localStorage.getItem('osb_state');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.gameState = { ...this.gameState, ...parsed };
        }
    }

    saveState() {
        localStorage.setItem('osb_state', JSON.stringify(this.gameState));
    }

    // --- TIMER LOGIC ---

    startTimerLoop() {
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            // ABSOLUTE TIME CALCULATION
            if (this.gameState.isRunning && this.gameState.startTimestamp) {
                // Calculate time running in current session
                const timeRunningNow = (Date.now() - this.gameState.startTimestamp) / 1000;

                // Calculate current time from absolute measurements
                this.gameState.currentTime = Math.max(0,
                    this.gameState.phaseStartTime - this.gameState.elapsedTime - timeRunningNow
                );

                // Stop if time reaches zero
                if (this.gameState.currentTime <= 0) {
                    this.gameState.currentTime = 0;
                    this.gameState.isRunning = false;
                    this.gameState.elapsedTime = this.gameState.phaseStartTime;
                    this.gameState.startTimestamp = null;
                }

                this.updateConsoleUI();
                this.saveState();
            }
        }, 100);
    }

    checkAutoTimeoutReduction(team) {
        // Logic: if remaining = 3 (so used = 0), set used = 1.
        // Assuming max is 3 in 4th quarter.
        const t = this.gameState['team' + team];
        if (t.timeoutsMax === 3 && t.timeoutsUsed === 0) {
            t.timeoutsUsed = 1;
            console.log(`Auto deducted timeout for Team ${team}`);
            // Note: This logic repeats every 100ms if < 120s. 
            // Once used is 1, it won't trigger again (because used !== 0). Correct.
        }
    }

    toggleTimer() {
        if (this.gameState.isRunning) {
            // STOPPING: Record elapsed time
            if (this.gameState.startTimestamp) {
                const timeRunningNow = (Date.now() - this.gameState.startTimestamp) / 1000;
                this.gameState.elapsedTime += timeRunningNow;
                this.gameState.startTimestamp = null;
            }
            this.gameState.isRunning = false;
        } else {
            // STARTING: Record start timestamp
            this.gameState.startTimestamp = Date.now();
            this.gameState.isRunning = true;
        }
        this.updateConsoleUI();
        this.saveState();
    }


    resetTimerPhase() {
        this.gameState.isRunning = false;
        const phase = this.getPhaseInfo();
        if (phase) {
            // Initialize absolute time tracking for new phase
            this.gameState.phaseStartTime = phase.duration;
            this.gameState.currentTime = phase.duration;
            this.gameState.elapsedTime = 0;
            this.gameState.startTimestamp = null;
        }
        this.updateRecalcTimeoutLimits();
        this.updateConsoleUI();
        this.saveState();
    }

    nextPhase() {
        // Handle transitions logic BEFORE switching
        const currentId = this.getPhaseInfo().id;

        // FOUL RESET: "quando si esce da un periodo di gioco... resettati. Non vale per il 4 (p4)"
        // If current is p1, p2, p3 -> Reset. 
        // If p4 -> Do NOT reset (carry to OT).
        if (['p1', 'p2', 'p3'].includes(currentId)) {
            this.gameState.teamA.fouls = 0;
            this.gameState.teamB.fouls = 0;
            this.gameState.teamA.isPenaltyManual = false;
            this.gameState.teamB.isPenaltyManual = false;
        }

        // TIMEOUT RESET: "time out resettati a fine 2 quarto e fine 4 quarto"
        // If finishing p2 (half time incoming) -> Reset used to 0?
        // Actually, user said:
        // "2 TO in 1st/2nd Q (combined)" -> So reset at start of game.
        // "3 TO in 3rd/4th Q (combined)" -> So reset at Halftime?
        // "Reset at end of p2 and p4".

        if (currentId === 'p2') {
            // Ending 2nd quarter (Half Time)
            // Prepare for 2nd half.
            // Reset used to 0. Update Max will happen in loop/updates.
            this.gameState.teamA.timeoutsUsed = 0;
            this.gameState.teamB.timeoutsUsed = 0;
        }

        if (currentId === 'p4') {
            // Ending Reg time. 
            this.gameState.teamA.timeoutsUsed = 0;
            this.gameState.teamB.timeoutsUsed = 0;
        }

        if (this.gameState.phaseIndex < this.gameState.settings.phases.length - 1) {
            this.gameState.phaseIndex++;
        } else {
            // Add OT
            const otCount = Math.floor((this.gameState.settings.phases.length - 8) / 2) + 1;
            this.gameState.settings.phases.push({ id: `i_ot${otCount}`, type: 'interval', duration: 2 * 60, label: 'INT' });
            this.gameState.settings.phases.push({ id: `ot${otCount}`, type: 'period', duration: 5 * 60, label: 'OT' });
            this.gameState.phaseIndex++;
        }

        this.resetTimerPhase();
    }

    prevPhase() {
        if (this.gameState.phaseIndex > 0) {
            this.gameState.phaseIndex--;
            this.resetTimerPhase();
        }
    }

    updateRecalcTimeoutLimits() {
        const pId = this.getPhaseInfo().id;

        // Logic:
        // 1st Half (p1, p2, i1..i3?): 2 Timeouts.
        // 2nd Half (p3, p4..): 3 Timeouts.
        // OT: 1 Timeout? User didn't specify OT limit, but said "reset at end of 4th". 
        // Most rules = 1 per OT. I will set 1 for now if OT.

        let max = 0;
        if (['i1', 'p1', 'i2', 'p2', 'i3'].includes(pId)) {
            // First half + halftime
            max = 2;
        } else if (pId.startsWith('ot') || pId.startsWith('i_ot')) {
            max = 1; // Standard FIBA/NBA OT rule usually
        } else {
            // p3, p4
            max = 3;
        }

        this.gameState.teamA.timeoutsMax = max;
        this.gameState.teamB.timeoutsMax = max;
    }

    // --- SCORE & STATS LOGIC ---

    adjustScore(team, delta) {
        const teamObj = this.gameState['team' + team];
        teamObj.score += delta;
        if (teamObj.score < 0) teamObj.score = 0;
        this.updateConsoleUI();
        this.saveState();
    }

    adjustFouls(team, delta) {
        const teamObj = this.gameState['team' + team];
        teamObj.fouls += delta;
        if (teamObj.fouls < 0) teamObj.fouls = 0;
        this.updateConsoleUI();
        this.saveState();
    }

    togglePenalty(team) {
        const teamObj = this.gameState['team' + team];
        teamObj.isPenaltyManual = !teamObj.isPenaltyManual;
        this.updateConsoleUI();
        this.saveState();
    }

    adjustTimeouts(team, delta) {
        // Delta +1 means ADDING A USED TIMEOUT (calling one)
        // Delta -1 means removing a used timeout (correction)
        const teamObj = this.gameState['team' + team];

        teamObj.timeoutsUsed += delta;
        if (teamObj.timeoutsUsed < 0) teamObj.timeoutsUsed = 0;
        if (teamObj.timeoutsUsed > teamObj.timeoutsMax) teamObj.timeoutsUsed = teamObj.timeoutsMax;

        this.updateConsoleUI();
        this.saveState();
    }

    // --- SETTINGS / TIME ADJUST ---

    setTimeComponents(mins, secs, tenths) {
        const total = (parseInt(mins || 0) * 60) + parseInt(secs || 0) + (parseInt(tenths || 0) / 10);

        // Update current time and adjust elapsedTime to maintain timestamp integrity
        this.gameState.currentTime = total;

        // If timer is running, we need to adjust elapsedTime to reflect the manual change
        if (this.gameState.isRunning && this.gameState.startTimestamp) {
            const timeRunningNow = (Date.now() - this.gameState.startTimestamp) / 1000;
            this.gameState.elapsedTime = this.gameState.phaseStartTime - total - timeRunningNow;
        } else {
            // If stopped, adjust elapsedTime directly
            this.gameState.elapsedTime = this.gameState.phaseStartTime - total;
        }

        this.saveState();
        this.updateSettingsUI();
    }

    updateSettings() {
        // Called from settings page
        const maxFoulsInput = document.getElementById('setting-max-fouls');
        if (maxFoulsInput) {
            this.gameState.settings.maxFouls = parseInt(maxFoulsInput.value);
        }

        const colA = document.getElementById('setting-color-a');
        if (colA) this.gameState.teamA.color = colA.value;

        const colB = document.getElementById('setting-color-b');
        if (colB) this.gameState.teamB.color = colB.value;

        // Pro Mode Settings
        const proMode = document.getElementById('setting-pro-mode');
        if (proMode) this.gameState.settings.proMode = proMode.checked;

        const maxPlayerFouls = document.getElementById('setting-max-player-fouls');
        if (maxPlayerFouls) this.gameState.settings.maxPlayerFouls = parseInt(maxPlayerFouls.value);

        this.saveState();
    }

    // --- PRO MODE METHODS ---

    addPlayer(team, number, name) {
        const teamObj = this.gameState['team' + team];

        // Ensure players array exists
        if (!teamObj.players) {
            teamObj.players = [];
        }

        const id = Date.now(); // Simple unique ID
        const newPlayer = {
            id: id,
            number: parseInt(number),
            name: name,
            points: 0,
            fouls: 0
        };

        teamObj.players.push(newPlayer);
        console.log(`Added player to Team ${team}:`, newPlayer);
        console.log(`Team ${team} now has ${teamObj.players.length} players`);

        this.saveState();
    }

    removePlayer(team, playerId) {
        const teamObj = this.gameState['team' + team];
        teamObj.players = teamObj.players.filter(p => p.id !== playerId);
        this.recalculateTeamTotals(team);
        this.saveState();
    }

    adjustPlayerPoints(team, playerId, delta) {
        const teamObj = this.gameState['team' + team];
        const player = teamObj.players.find(p => p.id === playerId);
        if (player) {
            player.points += delta;
            if (player.points < 0) player.points = 0;
            // First recalculate team totals
            this.recalculateTeamTotals(team);
            this.updateConsoleUI();
            this.saveState();
        }
    }

    adjustPlayerFouls(team, playerId, delta) {
        const teamObj = this.gameState['team' + team];
        const player = teamObj.players.find(p => p.id === playerId);
        if (player) {
            player.fouls += delta;
            if (player.fouls < 0) player.fouls = 0;
            // First recalculate team totals
            this.recalculateTeamTotals(team);
            this.updateConsoleUI();
            this.saveState();
        }
    }

    recalculateTeamTotals(team) {
        const teamObj = this.gameState['team' + team];
        teamObj.score = teamObj.players.reduce((sum, p) => sum + p.points, 0);
        teamObj.fouls = teamObj.players.reduce((sum, p) => sum + p.fouls, 0);
    }

    // --- HELPER ---
    getPhaseInfo() {
        return this.gameState.settings.phases[this.gameState.phaseIndex] || { label: 'UNK', id: 'unk' };
    }

    formatTime(seconds) {
        if (seconds <= 0) return '0.0';
        // Always show Tenths if < 60s
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        const t = Math.floor((seconds % 1).toFixed(1) * 10);

        if (seconds < 60) {
            return `${s}.${t}`;
        } else {
            return `${m}:${s.toString().padStart(2, '0')}`;
        }
    }

    // --- UI UPDATES ---

    updateAllUI() {
        // Update control console if we're on that page
        this.updateConsoleUI();
        // This can be extended for other pages as needed
    }


    updateConsoleUI() {

        // Only run if elements exist (control.html)
        if (!document.getElementById('main-timer')) return;

        const timerEl = document.getElementById('main-timer');
        const btn = document.getElementById('btn-start-stop');

        timerEl.textContent = this.formatTime(this.gameState.currentTime);

        if (this.gameState.isRunning) {
            btn.textContent = 'STOP';
            btn.className = 'btn-large btn-danger';
            timerEl.style.color = 'var(--running-color)';
        } else {
            btn.textContent = 'START';
            btn.className = 'btn-large btn-success';
            timerEl.style.color = 'var(--stopped-color)';
        }

        document.getElementById('period-display').textContent = this.getPhaseInfo().label;

        // Teams
        ['A', 'B'].forEach(team => {
            const t = this.gameState['team' + team];
            document.getElementById(`team${team}-score`).textContent = t.score;
            document.getElementById(`team${team}-fouls`).textContent = t.fouls;

            // Timeout Display on Console: Show Used / Max
            document.getElementById(`team${team}-timeouts`).textContent = `${t.timeoutsUsed} / ${t.timeoutsMax}`;

            // Penalty Button
            const pBtn = document.getElementById(`btn-penalty-${team}`);
            if (t.isPenaltyManual || t.fouls >= this.gameState.settings.maxFouls) {
                pBtn.classList.add('active');
            } else {
                pBtn.classList.remove('active');
            }
        });
    }

    updateSettingsUI() {
        // Only run if elements exist (settings.html)
        const mInput = document.getElementById('adjust-min');
        if (!mInput) return; // Not on settings page

        // Update current time in inputs if not focused? 
        // Actually better to just show current values on load or manual refresh, 
        // automatic update while typing is annoying.
        // We'll leave inputs blank until user fills them.
    }
}

const scoreboard = new ScoreBoard();

// Bindings for console inputs
const bindInput = (id, team) => {
    const el = document.getElementById(id);
    if (el) {
        el.value = scoreboard.gameState['team' + team].name;
        el.addEventListener('input', (e) => {
            scoreboard.gameState['team' + team].name = e.target.value;
            scoreboard.saveState();
        });
    }
};
bindInput('teamA-name', 'A');
bindInput('teamB-name', 'B');
