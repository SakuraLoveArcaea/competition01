<script setup lang="ts">
import {ref, onMounted, watch} from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Card from 'primevue/card';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Message from 'primevue/message';

// --- Data Management (Moved from external file) ---
interface Top16PlayerResult {
    rank: number;
    player: string;
    score: (number | null)[];
}

interface Top16SongInfo {
    image: string;
    title: string;
    artist: string;
    diff: string;
}

interface Top16GameData {
    courses: number;
    songInfo: Top16SongInfo[];
    players: Top16PlayerResult[];
}

const top16ResultsData: { [key: string]: Top16GameData } = {
    arcaea: {
        courses: 3,
        songInfo: [
            {
                image: '/competition01/arcaea/01.jpeg',
                title: 'ENERGY SYNERGY MATRIX',
                artist: 'Tanchiky',
                diff: 'BYD 10',
            },
            {
                image: '/competition01/arcaea/02.jpeg',
                title: 'Dantalion',
                artist: 'Team Grimoire',
                diff: 'FTR 10+',
            },
            {
                image: '/competition01/arcaea/03.jpeg',
                title: 'Callima Karma',
                artist: 't+pazolite vs Feryquitous',
                diff: 'FTR 9+',
            },
        ],
        players: [
            {rank: 1, player: "XiaoHong", score: [null, null, null]},
            {rank: 2, player: "CLH", score: [null, null, null]},
            {rank: 3, player: "爺家森測試", score: [null, null, null]},
            {rank: 4, player: "關注永雛塔菲謝謝喵", score: [null, null, null]},
            {rank: 5, player: "拉格蘭我婆", score: [null, null, null]},
            {rank: 6, player: "郝鎊謗", score: [null, null, null]},
            {rank: 7, player: "三木", score: [null, null, null]},
            {rank: 8, player: "Bot14", score: [null, null, null]},
            {rank: 9, player: "七尾", score: [null, null, null]},
            {rank: 10, player: "咖啡", score: [null, null, null]},
            {rank: 11, player: "想睡覺", score: [null, null, null]},
            {rank: 12, player: "niniagibye", score: [null, null, null]}
        ],
    },
    maimai: {
        courses: 3,
        songInfo: [
            {
                image: '/competition01/maimai/01.jpeg',
                title: '前衛的Landscape',
                artist: 'HiTECH NINJA feat. RANASOL',
                diff: 'MAS 13+',
            },
            {
                image: '/competition01/maimai/02.jpeg',
                title: 'FFT',
                artist: 'cybermiso',
                diff: 'MAS 14',
            },
            {
                image: '/competition01/maimai/03.jpeg',
                title: '天火明命',
                artist: '削除',
                diff: 'MAS 14',
            },

        ],
        players: [
            {rank: 1, player: "maimai__0528", score: [null, null, null]},
            {rank: 2, player: "moyu5945", score: [null, null, null]},
            {rank: 3, player: "bobo0804", score: [null, null, null]},
            {rank: 4, player: "kkkmr45322", score: [null, null, null]},
            {rank: 5, player: "crimsrk", score: [null, null, null]},
            {rank: 6, player: "foam_0.0", score: [null, null, null]},
            {rank: 7, player: "gdren.", score: [null, null, null]},
            {rank: 8, player: "strwng", score: [null, null, null]},
            {rank: 9, player: "blackcatt._72", score: [null, null, null]},
            {rank: 10, player: "loin0201", score: [null, null, null]},
            {rank: 11, player: "tailcoat_", score: [null, null, null]},
            {rank: 12, player: "p72toast", score: [null, null, null]},
            {rank: 13, player: "manju9487", score: [null, null, null]},
            {rank: 14, player: "blackpeaktw", score: [null, null, null]},
            {rank: 15, player: "ax_eri.a", score: [null, null, null]},
            {rank: 16, player: "stitch_0412", score: [null, null, null]}
        ],
    },
    chunithm: {
        courses: 3,
        songInfo: [
            {
                image: '/competition01/chunithm/01.jpeg',
                title: 'Superbia',
                artist: 'Team Grimoire',
                diff: 'MAS 14+',

            },
            {
                image: '/competition01/chunithm/02.jpeg',
                title: 'Calamity Fortune',
                artist: 'LeaF',
                diff: 'MAS 14+',
            },
            {
                image: '/competition01/chunithm/03.jpeg',
                title: '蜘蛛の糸',
                artist: 'きくお×cosMo＠暴走P feat.影縫英',
                diff: 'MAS 15',
            },
        ],
        players: [
            {rank: 1, player: "magnet_.", score: [10009832, 1009456, 1008840]},
            {rank: 2, player: "halcybody", score: [null, null, null]},
            {rank: 3, player: "thaumaturxy", score: [null, null, null]},
            {rank: 4, player: "sean6095", score: [null, null, null]},
            {rank: 5, player: "ric3cat", score: [null, null, null]},
            {rank: 6, player: "xv16_tensixho", score: [null, null, null]},
            {rank: 7, player: "thomas86llk", score: [null, null, null]},
            {rank: 8, player: "meikungloveayame", score: [null, null, null]},
            {rank: 9, player: "dddayo_1", score: [null, null, null]},
            {rank: 10, player: "coffee0929", score: [null, null, null]},
            {rank: 11, player: "_justinchang_", score: [null, null, null]},
            {rank: 12, player: "boxes1010", score: [null, null, null]},
            {rank: 13, player: "shoyu.1217", score: [null, null, null]},
            {rank: 14, player: "mary_1108_chunithmplayer", score: [null, null, null]},
            {rank: 15, player: "joleehigh", score: [null, null, null]},
            {rank: 16, player: "lyc_1234", score: [null, null, null]}
        ],
    },
    'ProjectSakai-jp': {
        courses: 4,
        songInfo: [
            {
                image: '/competition01/pjskjp/01.jpeg',
                title: 'SAN値直葬',
                artist: 'STEAKA.',
                diff: 'MAS 33',
            },
            {
                image: '/competition01/pjskjp/02.jpeg',
                title: '0.0000034',
                artist: 'Musanuriyu.',
                diff: 'MAS 34',
            },
            {
                image: '/competition01/pjskjp/03.jpeg',
                title: 'folern',
                artist: 'nulut.',
                diff: 'APD 35',
            },
            {
                image: '/competition01/pjskjp/04.jpeg',
                title: 'the EmpErroR',
                artist: 'sasakure.UK',
                diff: 'MAS 36',
            },
        ],
        players: [
            { rank: 1, player: "luna_with_clh", score: [null, null, null, null]},
            { rank: 2, player: "blackcatt._72", score: [null, null, null, null]}
        ],
    },
    'ProjectSakai-in': {
        courses: 5,
        songInfo: [
            {
                image: '/competition01/pjskin/01.jpeg',
                title: 'ノンブレス・オブリージュ',
                artist: 'Pinocchio-P',
                diff: 'MAS 31',
            },
            {
                image: '/competition01/pjskin/02.jpeg',
                title: '熱異常',
                artist: 'iyowa covered by 25-ji, Nightcord de.',
                diff: 'MAS 32',
            },
            {
                image: '/competition01/pjskin/03.jpeg',
                title: 'folern',
                artist: 'nulut.',
                diff: 'MAS 32',
            },
            {
                image: '/competition01/pjskin/04.jpeg',
                title: 'トンデモワンダーズ',
                artist: 'sasakure.UK',
                diff: 'APD 33',
            },
            {
                image: '/competition01/pjskin/05.jpeg',
                title: '孃王',
                artist: 'HachiojiP',
                diff: 'MAS 33',
            },
        ],
        players: [
            {rank: 1, player: "blackcatt._72", score: [null, null, null]},
            {rank: 2, player: "rumi_0527", score: [null, null, null]},
            {rank: 3, player: "jackyang0623", score: [null, null, null]},
            {rank: 4, player: "105269", score: [null, null, null]},
            {rank: 5, player: "ye_yu_940520", score: [null, null, null]},
            {rank: 6, player: "dddayo_1", score: [null, null, null]},
            {rank: 7, player: "pisces314", score: [null, null, null]},
            {rank: 8, player: "n0359._86780", score: [null, null, null]},
            {rank: 9, player: "lyc_1234", score: [null, null, null]},
            {rank: 10, player: "choroowo", score: [null, null, null]},
            {rank: 11, player: "samtsai0428", score: [null, null, null]}
        ],
    },
};
// --- End of Data ---

const activeTab = ref('0');
const games = [
    {id: 'arcaea', name: 'Arcaea'},
    {id: 'maimai', name: 'maimai でらっくす'},
    {id: 'chunithm', name: 'CHUNITHM'},
    {id: 'ProjectSakai-jp', name: 'Project Sakai 日服'},
    {id: 'ProjectSakai-in', name: 'Project Sakai 台/國際服'}
];

const currentSongs = ref<Top16SongInfo[]>([]);
const currentPlayers = ref<Top16PlayerResult[]>([]);
const currentGameId = ref<string>(games[0].id);

const updateContent = (gameId: string) => {
    currentGameId.value = gameId;
    const gameData = top16ResultsData[gameId];
    if (gameData) {
        currentSongs.value = gameData.songInfo;
        currentPlayers.value = gameData.players;
    } else {
        currentSongs.value = [];
        currentPlayers.value = [];
    }
};

watch(activeTab, (newVal) => {
    const gameId = games[parseInt(newVal)].id;
    updateContent(gameId);
});

onMounted(() => {
    updateContent(games[0].id);
});

const formatSingleScore = (score: number | null, gameId: string) => {
    if (score === null || score === undefined) {
        return '未有成績';
    }
    if (gameId === 'maimai') {
        return score.toFixed(4);
    }
    return score % 1 === 0 ? score.toLocaleString() : score.toFixed(4);
};
</script>

<template>
    <div class="container">
        <h1>十六強成績排行榜</h1>
        <h2>十六強比賽時間：5/3 12:00 - 5/6 23:59</h2>

        <Tabs v-model:value="activeTab">
            <TabList class="p-tablist">
                <Tab v-for="(game, index) in games" :key="game.id" :value="index.toString()" class="p-tab">
                    {{ game.name }}
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel v-for="(game, index) in games" :key="game.id" :value="index.toString()">
                    <div class="content-wrapper">
                        <div v-if="activeTab == '0'">
                            <Message severity="info" :closable="true">
                                <template #default>
                                    <p>八強的選手必須擁有以下曲包/曲目，並解鎖全部難度：</p>
                                    <ul style="text-align: left; list-style-type: disc;">
                                        <li>Free</li>
                                        <li>Main story</li>
                                        <li>Absolute Reason</li>
                                        <li>Extend Archive 1:visions</li>
                                        <li>Memory Archive 中5首曲目：
                                            <ul>
                                                <li>Be there</li>
                                                <li>Heavenly caress</li>
                                                <li>Altale</li>
                                                <li>Libertas</li>
                                                <li>Einherjar joker</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </template>
                            </Message>
                            <Message severity="warn" :closable="true">
                                <p>八強比賽時選曲在<b>匹配對手的共有曲庫</b>中選擇</p>
                            </Message>
                        </div>
                        <div class="songs-section">
                            <div class="songs-grid">
                                <Card v-for="(song, sIndex) in currentSongs" :key="sIndex" class="song-card">
                                    <template #header>
                                        <img :src="song.image" alt="Song Artwork" class="song-image"/>
                                    </template>
                                    <template #title>
                                        <div class="truncate-text" v-tooltip="song.title">{{ song.title }}</div>
                                    </template>
                                    <template #subtitle>
                                        <div class="truncate-text" v-tooltip="song.artist">{{ song.artist }}</div>
                                    </template>
                                    <template #content>
                                        <p>{{ song.diff }}</p>
                                    </template>
                                </Card>
                                <p v-if="currentSongs.length === 0" class="no-songs">此項目無指定課題曲。</p>
                            </div>
                        </div>

                        <DataTable :value="currentPlayers" stripedRows responsiveLayout="scroll"
                                   :tableStyle="{'table-layout': 'fixed'}">
                            <template #empty>此項目尚無參賽者名單。</template>
                            <Column field="rank" header="順序" style="width: 10%"></Column>
                            <Column field="player" header="參賽者"></Column>
                            <Column v-for="(song, sIndex) in currentSongs" :key="sIndex">
                                <template #header>
                                    <div class="truncate-text" v-tooltip="song.title">{{ song.title }}</div>
                                </template>
                                <template #body="slotProps">
                                    {{ formatSingleScore(slotProps.data.score[sIndex], currentGameId) }}
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </TabPanel>
            </TabPanels>
        </Tabs>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
}

.songs-section {
    margin-bottom: 2rem;
}

.songs-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
}

.song-card {
    width: 190px;
    display: flex;
    flex-direction: column;
}

.song-image {
    width: 100%;
    height: 190px;
    object-fit: cover;
}

.no-songs {
    width: 100%;
    text-align: center;
    color: var(--subtitle-color, #666);
}


.p-tablist {
    display: flex;
    justify-content: space-between;
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

.truncate-text {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.message-margin {
    margin-bottom: 1.5rem;
}
</style>
