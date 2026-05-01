<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// PlayerRecord 介面調整為更彈性，以支援動態 songX 屬性
interface PlayerRecord {
  player: string;
  total: number;
  [key: string]: any; // 允許動態屬性，例如 song1, song2, song3, ...
}

// --- Hardcoded Tournament Data ---
const tournamentData = {
  arcaea: [
      { "player": "CLH", "song1": 10001046, "song2": 10001036, "song3": 10001330, "total": 30003412 },
      { "player": "關注永雛塔菲謝謝喵", "song1": 9996364, "song2": 10001017, "song3": 9997597, "total": 29994978 },
      { "player": "拉格蘭我婆", "song1": 9991737, "song2": 10001029, "song3": 9997592, "total": 29990358 },
      { "player": "Bot14", "song1": 9977716, "song2": 10001012, "song3": 9978959, "total": 29957687 },
      { "player": "咖啡", "song1": 9898550, "song2": 10000985, "song3": 9852486, "total": 29752021 },
      { "player": "拉格蘭我婆", "song1": 9996385, "song2": 9996240, "song3": 10001314, "total": 29993939 },
      { "player": "咖啡", "song1": 9949768, "song2": 9991431, "song3": 9952902, "total": 29894101 },
      { "player": "七尾", "song1": 9968435, "song2": 9991453, "song3": 9986395, "total": 29946283 },
      { "player": "三木", "song1": 9982384, "song2": 10001022, "song3": 9986391, "total": 29969797 },
      { "player": "想睡覺", "song1": 9968422, "song2": 9938811, "song3": 9926921, "total": 29834154 },
      { "player": "爺家森測試", "song1": 10001046, "song2": 10001036, "song3": 9993895, "total": 29995977 },
      { "player": "XiaoHong", "song1": 10001064, "song2": 10001041, "song3": 10001340, "total": 30003445 },
      { "player": "niniagibye ", "song1": 0, "song2": 10001035, "song3": 0, "total": 10001035 },
      { "player": "郝鎊謗", "song1": 9987057, "song2": 10001008, "song3": 9986430, "total": 29974495 }
  ],
  maimai: [
      { "player": "ax_eri.a", "song1": 100.92, "song2": 100.932, "song3": 100.9793, "total": 302.8313 },
      { "player": "meikungloveayame", "song1": 100.924, "song2": 100.9761, "song3": 100.884, "total": 302.7841 },
      { "player": "dontfightthees", "song1": 100.5856, "song2": 100.3488, "song3": 100.7698, "total": 301.7042 },
      { "player": "tailcoat_", "song1": 100.9359, "song2": 101.0, "song3": 100.9876, "total": 302.9235 },
      { "player": "j4safaq", "song1": 100.9046, "song2": 100.8561, "song3": 100.97, "total": 302.7307 },
      { "player": "p72toast", "song1": 100.9838, "song2": 100.9242, "song3": 100.9907, "total": 302.8987 },
      { "player": "ying_145", "song1": 100.6017, "song2": 100.549, "song3": 100.8658, "total": 302.0165 },
      { "player": "crimsrk", "song1": 100.9838, "song2": 101.0, "song3": 100.9855, "total": 302.9693 },
      { "player": "blackpeaktw", "song1": 100.9516, "song2": 100.944, "song3": 100.9679, "total": 302.8635 },
      { "player": "loin0201", "song1": 100.9435, "song2": 100.9523, "song3": 100.9246, "total": 302.8204 },
      { "player": "loin0201", "song1": 100.9838, "song2": 100.988, "song3": 100.9552, "total": 302.927 },
      { "player": "wei03_29", "song1": 100.8641, "song2": 100.8647, "song3": 100.9614, "total": 302.6902 },
      { "player": "manju9487", "song1": 100.9198, "song2": 100.988, "song3": 100.9896, "total": 302.8974 },
      { "player": "halcybody", "song1": 100.8643, "song2": 100.8042, "song3": 100.7412, "total": 302.4097 },
      { "player": "maimai__0528", "song1": 101.0, "song2": 101.0, "song3": 100.9834, "total": 302.9834 },
      { "player": "bobo08040804", "song1": 101.0, "song2": 100.9761, "song3": 100.9948, "total": 302.9709 },
      { "player": "jacowo.", "song1": 100.9121, "song2": 100.837, "song3": 100.9586, "total": 302.7077 },
      { "player": "cadoea", "song1": 100.8608, "song2": 100.8649, "song3": 100.9129, "total": 302.6386 },
      { "player": "blackcatt._72", "song1": 100.9435, "song2": 100.9761, "song3": 100.969, "total": 302.8886 },
      { "player": "gdren.", "song1": 100.9838, "song2": 100.988, "song3": 100.9896, "total": 302.9614 },
      { "player": "yangqizhong32", "song1": 91.2342, "song2": 83.8991, "song3": 93.0038, "total": 268.1371 },
      { "player": "strwng", "song1": 100.9838, "song2": 100.9523, "song3": 100.9865, "total": 302.9226 },
      { "player": "moyu5945", "song1": 100.9919, "song2": 101.0, "song3": 100.9907, "total": 302.9826 },
      { "player": "heter1", "song1": 100.2442, "song2": 100.7365, "song3": 100.9439, "total": 301.9246 },
      { "player": "foam_0.0", "song1": 100.9838, "song2": 101.0, "song3": 100.9824, "total": 302.9662 },
      { "player": "shiang.04_", "song1": 100.6736, "song2": 100.8042, "song3": 100.8515, "total": 302.3293 },
      { "player": "_tiansky", "song1": 100.6811, "song2": 100.8641, "song3": 100.8393, "total": 302.3845 },
      { "player": "stitch_0412", "song1": 99.9422, "song2": 100.2606, "song3": 100.5479, "total": 300.7507 },
      { "player": "strwng", "song1": 100.9919, "song2": 100.988, "song3": 100.9783, "total": 302.9582 },
      { "player": "kkkmr45322", "song1": 101.0, "song2": 100.984, "song3": 100.9855, "total": 302.9695 },
      { "player": "blackcatt._72", "song1": 100.9838, "song2": 100.988, "song3": 100.9793, "total": 302.9511 }
  ],
  chunithm: [
      { "player": "halcybody", "song1": 1009905, "song2": 1009961, "song3": 1009963, "total": 3029829 },
      { "player": "thaumaturxy", "song1": 1009690, "song2": 1009975, "song3": 1009983, "total": 3029648 },
      { "player": "sean6095", "song1": 1009920, "song2": 1009951, "song3": 1009737, "total": 3029608 },
      { "player": "ric3cat", "song1": 1009905, "song2": 1009961, "song3": 1009561, "total": 3029427 },
      { "player": "xv16_tensixho", "song1": 1009965, "song2": 1009449, "song3": 1009942, "total": 3029356 },
      { "player": "thomas86llk", "song1": 1009645, "song2": 1009922, "song3": 1009721, "total": 3029288 },
      { "player": "meikungloveayame", "song1": 1009960, "song2": 1009217, "song3": 1009942, "total": 3029119 },
      { "player": "magnet_.", "song1": 1009145, "song2": 1009966, "song3": 1009942, "total": 3029053 },
      { "player": "dddayo_1", "song1": 1009915, "song2": 1009937, "song3": 1009138, "total": 3028990 },
      { "player": "coffee0929", "song1": 1009065, "song2": 1009971, "song3": 1009893, "total": 3028929 },
      { "player": "_justinchang_", "song1": 1009430, "song2": 1009739, "song3": 1009741, "total": 3028910 },
      { "player": "boxes1010", "song1": 1009665, "song2": 1009705, "song3": 1009491, "total": 3028861 },
      { "player": "shoyu.1217", "song1": 1009390, "song2": 1009961, "song3": 1009483, "total": 3028834 },
      { "player": "mary_1108_chunithmplayer", "song1": 1009140, "song2": 1009971, "song3": 1009290, "total": 3028401 },
      { "player": "joleehigh", "song1": 1009930, "song2": 1009966, "song3": 1008252, "total": 3028148 },
      { "player": "xxancken_87xx", "song1": 1009400, "song2": 1009179, "song3": 1009474, "total": 3028053 },
      { "player": "yukura_0916", "song1": 1008065, "song2": 1009647, "song3": 1008995, "total": 3026707 },
      { "player": "pisces314", "song1": 1009505, "song2": 1009690, "song3": 1007321, "total": 3026516 },
      { "player": "jackyang0623", "song1": 1008350, "song2": 1009145, "song3": 1008076, "total": 3025571 },
      { "player": "lyc_1234", "song1": 1005020, "song2": 1006784, "song3": 1002370, "total": 3014174 }
  ],
  'ProjectSakai-jp': [],
  'ProjectSakai-in': []
};
// --- End of Hardcoded Data ---

const activeTab = ref('0');
const games = [
    { id: 'arcaea', name: 'Arcaea', columns: ['Altale', 'Sulfur', 'Pentiment'] },
    { id: 'maimai', name: 'maimai', columns: ['蒼穹舞楽', '儚きもの人間', 'あつすぎの歌'] },
    { id: 'chunithm', name: 'Chunithm', columns: ['Fidget dancer', 'nightwave fragment', "大鬥士"] },
    { id: 'ProjectSakai-jp', name: 'Project Sakai 日服', columns: ['ココロ', 'いかないで', 'サラマンダー', 'とうほう☆ワンダーランド'] },
    { id: 'ProjectSakai-in', name: 'Project Sakai 台/國際服', columns: ['88☆彡', 'Help me ERINNNNNN!!', 'SnowMix♪', '一千光年', 'DNA'] }
];

const records = ref<PlayerRecord[]>([]);
const lastUpdated = ref<string>(new Date().toISOString()); // Set a static update time

const currentColumns = ref<string[]>(games[0].columns);
const currentGameId = ref<string>(games[0].id);

const updateRecords = (gameId: string) => {
  const data = (tournamentData as any)[gameId] || [];
  // Sort data by total descending
  data.sort((a: PlayerRecord, b: PlayerRecord) => b.total - a.total);

  currentColumns.value = games.find(g => g.id === gameId)?.columns || [];
  currentGameId.value = gameId;
  records.value = data;
};

watch(activeTab, (newVal) => {
  const index = parseInt(newVal);
  const game = games[index];
  updateRecords(game.id);
});

onMounted(() => {
  updateRecords(games[0].id);
});

const formatDecimal = (value: number | undefined, gameId: string) => {
  if (value === undefined || value === null) return '-';

  if (gameId === 'maimai') {
    return value.toFixed(4);
  } else {
    return value % 1 === 0 ? value : value.toFixed(4);
  }
};
</script>

<template>
  <div class="container">
    <h1>音樂遊戲比賽 預選賽排名</h1>
    <h2>含重複提交紀錄</h2>
    <div v-if="lastUpdated" class="last-updated">
      最後更新時間: {{ new Date(lastUpdated).toLocaleString() }}
    </div>

    <Tabs v-model:value="activeTab">
      <TabList>
        <Tab v-for="(game, index) in games" :key="game.id" :value="index.toString()">
          {{ game.name }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="(game, index) in games" :key="game.id" :value="index.toString()">
          <DataTable
            :value="records"
            stripedRows
            responsiveLayout="scroll"
          >
            <template #empty> 尚無資料 </template>

            <Column header="排名" style="width: 10%">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>

            <Column field="player" header="玩家 ID" style="width: 25%"></Column>

            <Column v-for="(colName, colIndex) in currentColumns" :key="colIndex" :header="colName">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data['song' + (colIndex + 1)], currentGameId) }}
              </template>
            </Column>

            <Column field="total" header="總分" sortable>
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.total, currentGameId) }}
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
.last-updated {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}
</style>
