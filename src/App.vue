<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

interface PlayerRecord {
  player: string;
  song1: number;
  song2: number;
  song3?: number;
  total: number;
}

interface TournamentDocument {
  records: PlayerRecord[];
  lastUpdated: string;
}

const activeTab = ref('0');
const games = [
  { id: 'arcaea', name: 'Arcaea', columns: ['指定曲一', '指定曲二', '指定曲三'] },
  { id: 'maimai', name: 'maimai', columns: ['穹蒼', '夢人', '好熟'] },
  { id: 'chunithm', name: 'Chunithm', columns: ['Fidget dancer', 'nightwave fragment', "大鬥士"] },
  { id: 'game4', name: '預留項目 (game4)', columns: ['指定曲一', '指定曲二'] },
];

const records = ref<PlayerRecord[]>([]);
const lastUpdated = ref<string>('');
const loading = ref(false);

const currentColumns = ref<string[]>(games[0].columns);
const hasSong3 = ref<boolean>(games[0].columns.length > 2);

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
  hasSong3.value = game.columns.length > 2;
  fetchRecords(game.id);
});

onMounted(() => {
  fetchRecords(games[0].id);
});

const formatDecimal = (value: number) => {
  if (value === undefined || value === null) return '-';

  // 檢查目前是否為 maimai 項目 (透過 activeTab)
  const isMaimai = games[parseInt(activeTab.value)].id === 'maimai';

  if (isMaimai) {
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
          <!-- 移除了 paginator 與 rows 設定以取消分頁 -->
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

            <Column :header="currentColumns[0]">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.song1) }}
              </template>
            </Column>

            <Column :header="currentColumns[1]">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.song2) }}
              </template>
            </Column>

            <Column v-if="hasSong3" :header="currentColumns[2]">
              <template #body="slotProps">
                {{ formatDecimal(slotProps.data.song3) }}
              </template>
            </Column>

            <Column field="total" header="總分" sortable>
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
.last-updated {
  text-align: center;
  color: #666;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}
</style>
