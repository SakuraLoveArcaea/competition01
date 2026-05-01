<script setup lang="ts">
import { ref, watch } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

// --- Convenient Place to Input Hardcoded Data ---
// Instructions:
// 1. The quarterfinals are pre-filled based on seedings.
// 2. To advance a winner, replace the placeholder (e.g., 'QF1 勝者') with the actual player's name.
const bracketData = {
  arcaea: {
    quarterfinals: [
      { p1: 'ArcaeaPlayer1 (1)', p2: 'ArcaeaPlayer8 (8)' }, // QF1
      { p1: 'ArcaeaPlayer4 (4)', p2: 'ArcaeaPlayer5 (5)' }, // QF2
      { p1: 'ArcaeaPlayer3 (3)', p2: 'ArcaeaPlayer6 (6)' }, // QF3
      { p1: 'ArcaeaPlayer2 (2)', p2: 'ArcaeaPlayer7 (7)' }, // QF4
    ],
    semifinals: [
      { p1: 'ArcaeaPlayer1 (1)', p2: 'ArcaeaPlayer4 (4)' }, // SF1
      { p1: 'ArcaeaPlayer6 (6)', p2: 'ArcaeaPlayer2 (2)' }, // SF2
    ],
    final: { p1: 'ArcaeaPlayer1 (1)', p2: 'ArcaeaPlayer2 (2)' },
    champion: 'ArcaeaPlayer1 (1)',
  },
  maimai: {
    quarterfinals: [
      { p1: 'MaimaiPlayer1 (1)', p2: 'MaimaiPlayer8 (8)' },
      { p1: 'MaimaiPlayer4 (4)', p2: 'MaimaiPlayer5 (5)' },
      { p1: 'MaimaiPlayer3 (3)', p2: 'MaimaiPlayer6 (6)' },
      { p1: 'MaimaiPlayer2 (2)', p2: 'MaimaiPlayer7 (7)' },
    ],
    semifinals: [
      { p1: 'MaimaiPlayer8 (8)', p2: 'MaimaiPlayer4 (4)' },
      { p1: 'MaimaiPlayer3 (3)', p2: 'MaimaiPlayer7 (7)' },
    ],
    final: { p1: 'MaimaiPlayer4 (4)', p2: 'MaimaiPlayer7 (7)' },
    champion: 'MaimaiPlayer7 (7)',
  },
  chunithm: {
    quarterfinals: [
      { p1: 'ChunithmPlayer1 (1)', p2: 'ChunithmPlayer8 (8)' },
      { p1: 'ChunithmPlayer4 (4)', p2: 'ChunithmPlayer5 (5)' },
      { p1: 'ChunithmPlayer3 (3)', p2: 'ChunithmPlayer6 (6)' },
      { p1: 'ChunithmPlayer2 (2)', p2: 'ChunithmPlayer7 (7)' },
    ],
    semifinals: [
      { p1: 'ChunithmPlayer1 (1)', p2: 'ChunithmPlayer5 (5)' },
      { p1: 'ChunithmPlayer3 (3)', p2: 'ChunithmPlayer2 (2)' },
    ],
    final: { p1: 'ChunithmPlayer5 (5)', p2: 'ChunithmPlayer3 (3)' },
    champion: 'ChunithmPlayer3 (3)',
  },
  'ProjectSakai-jp': {
    quarterfinals: [
      { p1: 'PSJPPlayer1 (1)', p2: 'PSJPPlayer8 (8)' },
      { p1: 'PSJPPlayer4 (4)', p2: 'PSJPPlayer5 (5)' },
      { p1: 'PSJPPlayer3 (3)', p2: 'PSJPPlayer6 (6)' },
      { p1: 'PSJPPlayer2 (2)', p2: 'PSJPPlayer7 (7)' },
    ],
    semifinals: [
      { p1: 'PSJPPlayer1 (1)', p2: 'PSJPPlayer4 (4)' },
      { p1: 'PSJPPlayer6 (6)', p2: 'PSJPPlayer7 (7)' },
    ],
    final: { p1: 'PSJPPlayer1 (1)', p2: 'PSJPPlayer6 (6)' },
    champion: 'PSJPPlayer6 (6)',
  },
  'ProjectSakai-in': {
    quarterfinals: [
      { p1: 'PSINPlayer1 (1)', p2: 'PSINPlayer8 (8)' },
      { p1: 'PSINPlayer4 (4)', p2: 'PSINPlayer5 (5)' },
      { p1: 'PSINPlayer3 (3)', p2: 'PSINPlayer6 (6)' },
      { p1: 'PSINPlayer2 (2)', p2: 'PSINPlayer7 (7)' },
    ],
    semifinals: [
      { p1: 'PSINPlayer8 (8)', p2: 'PSINPlayer5 (5)' },
      { p1: 'PSINPlayer3 (3)', p2: 'PSINPlayer2 (2)' },
    ],
    final: { p1: 'PSINPlayer8 (8)', p2: 'PSINPlayer2 (2)' },
    champion: 'PSINPlayer8 (8)',
  },
};
// --- End of Data Input Area ---

const activeTab = ref('0');
const games = [
  { id: 'arcaea', name: 'Arcaea' },
  { id: 'maimai', name: 'maimai' },
  { id: 'chunithm', name: 'Chunithm' },
  { id: 'ProjectSakai-jp', name: 'Project Sakai 日服' },
  { id: 'ProjectSakai-in', name: 'Project Sakai 台/國際服' }
];

const currentBracket = ref(bracketData.arcaea);

watch(activeTab, (newVal) => {
  const gameId = games[parseInt(newVal)].id as keyof typeof bracketData;
  currentBracket.value = bracketData[gameId];
});
</script>

<template>
  <div class="container">
    <h1>八強淘汰賽</h1>
    <p>此為根據預選賽成績排出的八強對戰組合。</p>

    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab v-for="(game, index) in games" :key="game.id" :value="index.toString()">
          {{ game.name }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="(game, index) in games" :key="game.id" :value="index.toString()">
          <div class="bracket-container">
            <div class="bracket">
              <!-- Quarterfinals -->
              <div class="round quarterfinals">
                <div class="round-title">八強賽</div>
                <div class="match" v-for="(match, matchIndex) in currentBracket.quarterfinals" :key="`qf-${matchIndex}`">
                  <div class="participant"><span>{{ match.p1 }}</span></div>
                  <div class="participant"><span>{{ match.p2 }}</span></div>
                </div>
              </div>
              <!-- Semifinals -->
              <div class="round semifinals">
                <div class="round-title">準決賽</div>
                <div class="match">
                  <div class="participant"><span>{{ currentBracket.semifinals[0].p1 }}</span></div>
                  <div class="participant"><span>{{ currentBracket.semifinals[0].p2 }}</span></div>
                </div>
                <div class="match">
                  <div class="participant"><span>{{ currentBracket.semifinals[1].p1 }}</span></div>
                  <div class="participant"><span>{{ currentBracket.semifinals[1].p2 }}</span></div>
                </div>
              </div>
              <!-- Final -->
              <div class="round final">
                <div class="round-title">決賽</div>
                <div class="match">
                  <div class="participant"><span>{{ currentBracket.final.p1 }}</span></div>
                  <div class="participant"><span>{{ currentBracket.final.p2 }}</span></div>
                </div>
              </div>
              <!-- Winner -->
              <div class="round winner">
                <div class="round-title">冠軍</div>
                <div class="match">
                  <div class="participant winner-box"><span>{{ currentBracket.champion }}</span></div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>

<style scoped>
/* --- Base and Light Mode Styles --- */
:root {
  --bracket-text-color: #213547;
  --bracket-bg-color: #ffffff;
  --participant-bg: #f9f9f9;
  --participant-hover-bg: #f0f0f0;
  --connector-color: #ccc;
  --winner-border-color: #f9a825;
  --winner-bg-color: #fffbeb;
  --subtitle-color: #666;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}
h1 {
  text-align: center;
  margin-bottom: 0.5rem;
}
p {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--subtitle-color);
}

.bracket-container {
  margin-top: 1rem;
  overflow-x: auto;
}

.bracket {
  display: flex;
  flex-direction: row;
  min-width: 900px;
}

.round {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 25%;
  flex-grow: 1;
}

.round-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.match {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  flex-grow: 1;
  padding: 10px 0;
}

.round.quarterfinals .match { margin: 5px 0; }
.round.semifinals .match { margin: 40px 0; }
.round.final .match { margin: 115px 0; }
.round.winner .match {
  margin: 115px 0;
  justify-content: center;
  align-items: center;
}

.participant {
  background-color: var(--participant-bg);
  padding: 8px 12px;
  border-radius: 4px;
  margin: 4px 10px;
  font-size: 0.9em;
  transition: background-color 0.2s;
  white-space: nowrap;
  border: 1px solid var(--connector-color);
}
.participant:hover {
  background-color: var(--participant-hover-bg);
}

.winner-box {
  width: 80%;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  padding: 28px 12px;
  border: 2px dashed var(--winner-border-color);
  background-color: var(--winner-bg-color);
}

/* --- Connectors --- */
.match::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  width: 10px;
  height: 2px;
  background-color: var(--connector-color);
}
.round:last-child .match::after { display: none; }

.match > .participant:first-child { margin-bottom: 8px; }

.match > .participant::before {
  content: '';
  position: absolute;
  left: 100%;
  top: 50%;
  width: 5px;
  height: 50%;
  border-left: 2px solid var(--connector-color);
}
.match > .participant:first-child::before {
  border-bottom: 2px solid var(--connector-color);
  transform: translateY(-100%);
  border-bottom-left-radius: 6px;
}
.match > .participant:last-child::before {
  border-top: 2px solid var(--connector-color);
  border-top-left-radius: 6px;
}
.round.winner .match .participant::before { display: none; }

/* --- Dark Mode Styles --- */
@media (prefers-color-scheme: dark) {
  :root {
    --bracket-text-color: rgba(255, 255, 255, 0.87);
    --bracket-bg-color: #242424;
    --participant-bg: #3a3a3a;
    --participant-hover-bg: #4f4f4f;
    --connector-color: #555;
    --winner-border-color: #f9a825;
    --winner-bg-color: #4a4432;
    --subtitle-color: #aaa;
  }
}
</style>
