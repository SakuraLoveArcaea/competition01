<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Adjusted path for firebase
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

interface TournamentDocument {
  records: PlayerRecord[];
  lastUpdated: string;
}

const activeTab = ref('0');
const games = [
    { id: 'arcaea', name: 'Arcaea', columns: ['Altale', 'Sulfur', 'Pentiment'] },
    { id: 'maimai', name: 'maimai', columns: ['蒼穹舞楽', '儚きもの人間', 'あつすぎの歌'] },
    { id: 'chunithm', name: 'Chunithm', columns: ['Fidget dancer', 'nightwave fragment', "大鬥士"] },
    { id: 'ProjectSakai-jp', name: 'Project Sakai 日服', columns: ['指定曲一', '指定曲二', '指定曲三', '指定曲四', '指定曲五'] }, // 增加到五個欄位
    { id: 'ProjectSakai-in', name: 'Project Sakai 國際服', columns: ['88☆彡', '指定曲二', '指定曲三'] }
];

const records = ref<PlayerRecord[]>([]);
const lastUpdated = ref<string>('');
const loading = ref(false);

const currentColumns = ref<string[]>(games[0].columns);
const currentGameId = ref<string>(games[0].id); // 新增一個 ref 來追蹤當前遊戲 ID

const fetchRecords = async (gameId: string) => {
  loading.value = true;
  try {
    const docRef = doc(db, 'tournaments', gameId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as TournamentDocument;
      records.value = data.records;
      lastUpdated.value = data.lastUpdated;
    } else {
      records.value = [];
      lastUpdated.value = '';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    records.value = [];
    lastUpdated.value = '';
  } finally {
    loading.value = false;
  }
};

watch(activeTab, (newVal) => {
  const index = parseInt(newVal);
  const game = games[index];
  currentColumns.value = game.columns;
  currentGameId.value = game.id; // 更新當前遊戲 ID
  fetchRecords(game.id);
});

onMounted(() => {
  fetchRecords(games[0].id);
});

// formatDecimal 函式現在接收 gameId 作為第二個參數
const formatDecimal = (value: number | undefined, gameId: string) => {
  if (value === undefined || value === null) return '-';

  if (gameId === 'maimai') {
    // maimai 強制保留四位小數
    return value.toFixed(4);
  } else {
    // 其他項目如果是整數則不顯示小數點，否則最高顯示四位小數
    return value % 1 === 0 ? value : value.toFixed(4);
  }
};
</script>

<template>
  <div class="container">
    <h1>音樂遊戲比賽 預選賽排名</h1>
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
            :loading="loading"
            responsiveLayout="scroll"
          >
            <template #empty> 尚無資料 </template>
            <template #loading> 載入中... </template>

            <Column header="排名" style="width: 10%">
              <template #body="slotProps">
                {{ slotProps.index + 1 }}
              </template>
            </Column>

            <Column field="player" header="玩家 ID" style="width: 25%"></Column>

            <!-- 動態生成成績欄位 -->
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
