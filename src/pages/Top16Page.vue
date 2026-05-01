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
  total: number;
}

const activeTab = ref('0');
const games = [
  { id: 'arcaea', name: 'Arcaea' },
  { id: 'maimai', name: 'maimai' },
  { id: 'chunithm', name: 'Chunithm' },
  { id: 'ProjectSakai-jp', name: 'Project Sakai 日服' },
  { id: 'ProjectSakai-in', name: 'Project Sakai 國際服' }
];

// Hardcoded placeholder data for the Top 16, structured by game ID
const top16PlayersData: { [key: string]: Top16Player[] } = {
  arcaea: Array.from({ length: 16 }, (_, i) => ({ seed: i + 1, player: `ArcaeaPlayer${i + 1}`, total: 29850000 - i * 50000 })),
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
  chunithm: Array.from({ length: 16 }, (_, i) => ({ seed: i + 1, player: `ChunithmPlayer${i + 1}`, total: 3029999 - i * 100 })),
  'ProjectSakai-jp': Array.from({ length: 16 }, (_, i) => ({ seed: i + 1, player: `PSJPPlayer${i + 1}`, total: 1000000 - i * 10000 })),
  'ProjectSakai-in': Array.from({ length: 16 }, (_, i) => ({ seed: i + 1, player: `PSINPlayer${i + 1}`, total: 1000000 - i * 10000 })),
};

const currentTop16Players = ref<Top16Player[]>(top16PlayersData[games[0].id]);

watch(activeTab, (newVal) => {
  const index = parseInt(newVal);
  const gameId = games[index].id;
  currentTop16Players.value = top16PlayersData[gameId] || [];
});

onMounted(() => {
  currentTop16Players.value = top16PlayersData[games[0].id];
});

const formatDecimal = (value: number) => {
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
