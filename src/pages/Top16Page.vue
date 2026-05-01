<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

interface Top16Player {
  seed: number;
  player: string;
  total: number | "-";
}

const activeTab = ref('0');
const games = [
  { id: 'arcaea', name: 'Arcaea' },
  { id: 'maimai', name: 'maimai' },
  { id: 'chunithm', name: 'Chunithm' },
  { id: 'ProjectSakai-jp', name: 'Project Sakai 日服' },
  { id: 'ProjectSakai-in', name: 'Project Sakai 台/國際服' }
];

// Hardcoded placeholder data for the Top 16, structured by game ID
const top16PlayersData: { [key: string]: Top16Player[] } = {
  arcaea: [
      { "seed": 1, "player": "XiaoHong", "total": 30003445 },
      { "seed": 2, "player": "CLH", "total": 30003412 },
      { "seed": 3, "player": "爺家森測試", "total": 29995977 },
      { "seed": 4, "player": "關注永雛塔菲謝謝喵", "total": 29994978 },
      { "seed": 5, "player": "拉格蘭我婆", "total": 29993939 },
      { "seed": 6, "player": "郝鎊謗", "total": 29974495 },
      { "seed": 7, "player": "三木", "total": 29969797 },
      { "seed": 8, "player": "Bot14", "total": 29957687 },
      { "seed": 9, "player": "七尾", "total": 29946283 },
      { "seed": 10, "player": "咖啡", "total": 29894101 },
      { "seed": 11, "player": "想睡覺", "total": 29834154 },
      { "seed": 12, "player": "niniagibye ", "total": 10001035 }
  ],
  maimai: [
      { "seed": 1, "player": "maimai__0528", "total": 302.9834 },
      { "seed": 2, "player": "moyu5945", "total": 302.9826 },
      { "seed": 3, "player": "bobo0804", "total": 302.9709 },
      { "seed": 4, "player": "kkkmr45322", "total": 302.9695 },
      { "seed": 5, "player": "crimsrk", "total": 302.9693 },
      { "seed": 6, "player": "foam_0.0", "total": 302.9662 },
      { "seed": 7, "player": "gdren.", "total": 302.9614 },
      { "seed": 8, "player": "strwng", "total": 302.9582 },
      { "seed": 9, "player": "blackcatt._72", "total": 302.9511 },
      { "seed": 10, "player": "loin0201", "total": 302.927 },
      { "seed": 11, "player": "tailcoat_", "total": 302.9235 },
      { "seed": 12, "player": "p72toast", "total": 302.8987 },
      { "seed": 13, "player": "manju9487", "total": 302.8974 },
      { "seed": 14, "player": "blackpeaktw", "total": 302.8635 },
      { "seed": 15, "player": "ax_eri.a", "total": 302.8313 },
      { "seed": 16, "player": "stitch_0412", "total": 300.7507 }
  ],
  chunithm: [
      { "seed": 1, "player": "halcybody", "total": 3029829 },
      { "seed": 2, "player": "thaumaturxy", "total": 3029648 },
      { "seed": 3, "player": "sean6095", "total": 3029608 },
      { "seed": 4, "player": "ric3cat", "total": 3029427 },
      { "seed": 5, "player": "xv16_tensixho", "total": 3029356 },
      { "seed": 6, "player": "thomas86llk", "total": 3029288 },
      { "seed": 7, "player": "meikungloveayame", "total": 3029119 },
      { "seed": 8, "player": "magnet_.", "total": 3029053 },
      { "seed": 9, "player": "dddayo_1", "total": 3028990 },
      { "seed": 10, "player": "coffee0929", "total": 3028929 },
      { "seed": 11, "player": "_justinchang_", "total": 3028910 },
      { "seed": 12, "player": "boxes1010", "total": 3028861 },
      { "seed": 13, "player": "shoyu.1217", "total": 3028834 },
      { "seed": 14, "player": "mary_1108_chunithmplayer", "total": 3028401 },
      { "seed": 15, "player": "joleehigh", "total": 3028148 },
      { "seed": 16, "player": "lyc_1234", "total": 3014174 }
  ],
  'ProjectSakai-jp': [],
  'ProjectSakai-in': [
      { "seed": 1, "player": "blackcatt._72", "total": "-" },
      { "seed": 2, "player": "rumi_0527", "total": "-" },
      { "seed": 3, "player": "jackyang0623", "total": "-" },
      { "seed": 4, "player": "105269", "total": "-" },
      { "seed": 5, "player": "ye_yu_940520", "total": "-" },
      { "seed": 6, "player": "dddayo_1", "total": "-" },
      { "seed": 7, "player": "pisces314", "total": "-" },
      { "seed": 8, "player": "n0359._86780", "total": "-" },
      { "seed": 9, "player": "lyc_1234", "total": "-" },
      { "seed": 10, "player": "choroowo", "total": "-" },
      { "seed": 11, "player": "samtsai0428", "total": "-" }
  ],
};

const currentTop16Players = ref<Top16Player[]>([]);

const updatePlayers = (gameId: string) => {
  currentTop16Players.value = top16PlayersData[gameId] || [];
};

watch(activeTab, (newVal) => {
  const index = parseInt(newVal);
  const gameId = games[index].id;
  updatePlayers(gameId);
});

onMounted(() => {
  updatePlayers(games[0].id);
});

const formatDecimal = (value: number | string) => {
  if (typeof value === 'string') return value;
  if (value === undefined || value === null) return '-';
  return value % 1 === 0 ? value : value.toFixed(4);
};
</script>

<template>
  <div class="container">
    <h1>十六強入圍名單</h1>
    <p>此為根據預選賽成績排出的十六強選手名單。</p>

    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab v-for="(game, index) in games" :key="game.id" :value="index.toString()">
          {{ game.name }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="(game, index) in games" :key="game.id" :value="index.toString()">
          <DataTable :value="currentTop16Players" stripedRows responsiveLayout="scroll">
            <template #empty> 尚無資料 </template>

            <Column field="seed" header="種子序" style="width: 15%"></Column>
            <Column field="player" header="玩家 ID"></Column>
            <Column field="total" header="總分">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.total) }}
              </template>
            </Column>
          </DataTable>
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
  margin-bottom: 0.5rem;
}
p {
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
}
</style>
