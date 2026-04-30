<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import Menubar from 'primevue/menubar';
import { ref } from 'vue';

const items = ref([
    {
        label: '預選賽成績',
        icon: 'pi pi-fw pi-list',
        to: '/'
    },
    {
        label: '十六強名單',
        icon: 'pi pi-fw pi-users',
        to: '/top16'
    },
    {
        label: '八強名單',
        icon: 'pi pi-fw pi-users',
        to: '/top8list'
    },
    {
        label: '八強淘汰賽',
        icon: 'pi pi-fw pi-sitemap',
        to: '/top8'
    }
]);
</script>

<template>
  <header>
    <Menubar :model="items">
      <template #item="{ item, props }">
        <RouterLink :to="item.to" class="flex items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </RouterLink>
      </template>
    </Menubar>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>
