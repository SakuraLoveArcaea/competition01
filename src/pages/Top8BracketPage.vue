<script setup lang="ts">
import {ref, watch, onMounted} from 'vue';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../firebase';
// import Tabs from 'primevue/tabs';
// import TabList from 'primevue/tablist';
// import Tab from 'primevue/tab';
// import TabPanels from 'primevue/tabpanels';
// import TabPanel from 'primevue/tabpanel';
// import Dialog from 'primevue/dialog';
// import Button from 'primevue/button'; // 引入 Button 元件

// --- 更新後的介面 ---
interface MatchData {
    winner: string;
    score: (number | null)[];
    songImg: (string | null)[];
}

interface Match {
    p1: string;
    p2: string;
    matchdata: MatchData;
}

interface Bracket {
    quarterfinals: Match[];
    semifinals: Match[];
    final: Match;
    champion: string;
}

const bracketData = ref<Bracket | null>(null);

// --- Dialog 狀態 ---
// const isDialogVisible = ref(false);
// const selectedMatch = ref<Match | null>(null);

// const showMatchDetails = (match: Match) => {
//     if (match && match.p1 && match.p2) { // 只有當比賽存在且有選手時才顯示
//         selectedMatch.value = match;
//         isDialogVisible.value = true;
//     }
// };

// --- 資料讀取 ---
const fetchBracketData = async (gameId: string) => {
    try {
        const docRef = doc(db, 'tournaments', gameId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().bracket) {
            bracketData.value = docSnap.data().bracket as Bracket;
        } else {
            bracketData.value = null;
        }
    } catch (e) {
        console.error("Error fetching bracket data: ", e);
    }
};

// --- Component State ---
const activeTab = ref('0');
const games = [
    {id: 'arcaea', name: 'Arcaea(5/9)'},
    {id: 'maimai', name: 'maimai(5/10)'},
    {id: 'chunithm', name: 'Chunithm(5/10)'},
    {id: 'ProjectSakai-jp', name: 'Project Sakai 日服(5/9)'},
    {id: 'ProjectSakai-in', name: 'Project Sakai 台/國際服(5/9)'}
];

// --- Lifecycle and Watchers ---

onMounted(() => {
    const initialGameId = games[parseInt(activeTab.value)].id;
    fetchBracketData(initialGameId);
});

watch(activeTab, (newVal) => {
    const gameId = games[parseInt(newVal)].id;
    fetchBracketData(gameId);
});
</script>

<template>
    <div v-if="true">
        新版八強淘汰賽賽程圖開發中
    </div>
<!--    <div v-if="false" class="container">-->
<!--        <h1>八強淘汰賽</h1>-->

<!--        <Tabs v-model:value="activeTab">-->
<!--            <TabList>-->
<!--                <Tab v-for="(game, index) in games" :key="game.id" :value="index.toString()" class="p-tab">-->
<!--                    {{ game.name }}-->
<!--                </Tab>-->
<!--            </TabList>-->
<!--            <TabPanels>-->
<!--                <TabPanel v-for="(game, index) in games" :key="game.id" :value="index.toString()">-->
<!--                    <div class="bracket-container" v-if="bracketData">-->
<!--                        <div class="bracket">-->
<!--                            &lt;!&ndash; Quarterfinals &ndash;&gt;-->
<!--                            <div class="round quarterfinals">-->
<!--                                <div class="round__title">八強賽</div>-->
<!--                                <div class="round__matches">-->
<!--                                    <div class="round__match" v-for="(match, matchIndex) in bracketData.quarterfinals" :key="`qf-${matchIndex}`" @click="showMatchDetails(match)">-->
<!--                                        <div class="participant"><span>{{ match.p1 }}</span></div>-->
<!--                                        <div class="participant"><span>{{ match.p2 }}</span></div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            &lt;!&ndash; Semifinals &ndash;&gt;-->
<!--                            <div class="round semifinals">-->
<!--                                <div class="round-title">準決賽</div>-->
<!--                                <Button class="match" v-for="(match, matchIndex) in bracketData.semifinals"-->
<!--                                        :key="`sf-${matchIndex}`" @click="showMatchDetails(match)">-->
<!--                                    <div class="participant"><span>{{ match.p1 }}</span></div>-->
<!--                                    <div class="participant"><span>{{ match.p2 }}</span></div>-->
<!--                                </Button>-->
<!--                            </div>-->
<!--                            &lt;!&ndash; Final &ndash;&gt;-->
<!--                            <div class="round final">-->
<!--                                <div class="round-title">決賽</div>-->
<!--                                <Button class="match" @click="showMatchDetails(bracketData.final)">-->
<!--                                    <div class="participant"><span>{{ bracketData.final.p1 }}</span></div>-->
<!--                                    <div class="participant"><span>{{ bracketData.final.p2 }}</span></div>-->
<!--                                </Button>-->
<!--                            </div>-->
<!--                            &lt;!&ndash; Winner &ndash;&gt;-->
<!--                            <div class="round winner">-->
<!--                                <div class="round-title">冠軍</div>-->
<!--                                <div class="match">-->
<!--                                    <div class="participant winner-box"><span>{{ bracketData.champion }}</span></div>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </TabPanel>-->
<!--            </TabPanels>-->
<!--        </Tabs>-->

<!--        &lt;!&ndash; Match Details Dialog &ndash;&gt;-->
<!--        <Dialog v-model:visible="isDialogVisible" modal header="比賽詳情" :style="{ width: '50vw' }"-->
<!--                :breakpoints="{ '960px': '75vw', '641px': '100vw' }">-->
<!--            <div v-if="selectedMatch" class="match-details">-->
<!--                <h3 class="match-title">{{ selectedMatch.p1 }} vs {{ selectedMatch.p2 }}</h3>-->
<!--                <p v-if="selectedMatch.matchdata && selectedMatch.matchdata.winner"><strong>勝者:</strong>-->
<!--                    {{ selectedMatch.matchdata.winner }}</p>-->

<!--                <div v-if="selectedMatch.matchdata" class="song-list">-->
<!--                    <div v-for="(song, index) in selectedMatch.matchdata.songImg" :key="index" class="song-item">-->
<!--                        <img :src="song" alt="Song cover" class="song-img" v-if="song"/>-->
<!--                        <div class="song-info">-->
<!--                            <p><strong>歌曲 {{ index + 1 }}</strong></p>-->
<!--                            <p>-->
<!--                                分數: {{-->
<!--                                    formatSingleScore(selectedMatch.matchdata.score[index], games[parseInt(activeTab)].id)-->
<!--                                }}-->
<!--                            </p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div v-else>-->
<!--                    <p>暫無詳細比賽數據。</p>-->
<!--                </div>-->
<!--            </div>-->
<!--        </Dialog>-->
<!--    </div>-->
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

.p-tab {
    border-radius: 0;
    flex: 1;
    justify-content: center; /* 讓文字在 Tab 內也居中 */
}

.p-tab:focus,
.p-tab:focus-visible {
    outline: none !important;
    box-shadow: none !important;
}

/* bracket */

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
    gap: 30px;
}

.round__title {
    font-size: 24px;
    font-weight: bold;
}

.round__matches {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    gap: 1rem;
}

.round__match {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.participant {
    border: 1px gray solid;
    border-radius: 5px;
}



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