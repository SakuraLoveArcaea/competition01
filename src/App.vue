<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Tag from 'primevue/tag';
import {ref, onMounted, watch} from 'vue';
import Message from "primevue/message";

const lastUpdated = ref<string>(new Date().toISOString()); // Set a static update time

const items = ref([
    {
        label: '預選賽成績',
        icon: 'pi pi-fw pi-list',
        to: '/'
    },
    {
        label: '十六強名單',
        icon: 'pi pi-fw pi-users',
        to: '/top16' // 要改
    },
    {
        label: '十六強成績(now)',
        icon: 'pi pi-fw pi-chart-bar',
        to: '/top16-result'
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

// --- Announcement Data ---
const announcementData = ref([
    {project: 'Arcaea', prelims: true, top16_list: true, top16: true, top8_list: false},
    {project: 'maimai', prelims: true, top16_list: true, top16: true, top8_list: false},
    {project: 'Chunithm', prelims: true, top16_list: true, top16: true, top8_list: false},
    {project: 'PJSK 日服', prelims: true, top16_list: true, top16: true, top8_list: false},
    {project: 'PJSK 國際/台服', prelims: true, top16_list: true, top16: true, top8_list: false},
]);
// --- End of Data ---

const showAnnouncement = ref(true);

onMounted(() => {
    const savedPreference = localStorage.getItem('showAnnouncement');
    if (savedPreference !== null) {
        showAnnouncement.value = JSON.parse(savedPreference);
    }
});

watch(showAnnouncement, (newValue) => {
    localStorage.setItem('showAnnouncement', JSON.stringify(newValue));
});

const getStatusSeverity = (status: boolean) => {
    return status ? 'success' : 'danger';
};
</script>

<template>
    <div class="app-wrapper">
        <header>
            <nav class="main-nav">
                <RouterLink v-for="item in items" :key="item.to" :to="item.to" class="nav-link">
                    <span :class="item.icon"/>
                    <span class="ml-2">{{ item.label }}</span>
                </RouterLink>
            </nav>
        </header>
        <div class="announcement-section">
            <Message severity="secondary">
                <div class="announcement-table">
                    <h3>各項目成績公布狀態</h3>
                    <DataTable :value="announcementData" size="small" stripedRows>
                        <Column field="project" header="項目"></Column>
                        <Column header="預選賽成績">
                            <template #body="slotProps">
                                <Tag :severity="getStatusSeverity(slotProps.data.prelims)"
                                     :value="slotProps.data.prelims ? '已公布' : '未公布'"></Tag>
                            </template>
                        </Column>
                        <Column header="十六強名單">
                            <template #body="slotProps">
                                <Tag :severity="getStatusSeverity(slotProps.data.top16_list)"
                                     :value="slotProps.data.top16_list ? '已公布' : '未公布'"></Tag>
                            </template>
                        </Column>
                        <Column header="十六強成績">
                            <template #body="slotProps">
                                <Tag
                                    :severity="getStatusSeverity(slotProps.data.top16) == 'success' ? 'warn' : 'danger'"
                                    :value="slotProps.data.top16 ? '進行中' : '已結束'"></Tag>
                            </template>
                        </Column>
                        <Column header="八強名單">
                            <template #body="slotProps">
                                <Tag :severity="getStatusSeverity(slotProps.data.top8_list)"
                                     :value="slotProps.data.top8_list ? '已公布' : '未公布'"></Tag>
                            </template>
                        </Column>
                    </DataTable>
                    <p>十六強名單將會合併至十六強成績</p>
                </div>
            </Message>
        </div>

        <main>
            <RouterView/>
        </main>

        <footer class="app-footer">
            <div v-if="lastUpdated" class="last-updated">
                最後更新時間: {{ new Date(lastUpdated).toLocaleString() }}
            </div>
            <p>
                如有問題請找 Discord: sakuralovearcaea<br>
                sakura的其他作品：<br>
                Arcaea PTT半手動查分表格<br>
                maimai判定區感應器（開發中）
            </p>

        </footer>
    </div>
</template>

<style scoped>
.app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex-grow: 1;
}

header {
    margin-bottom: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid var(--p-surface-border, #dee2e6);
}

.main-nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem; /* Row and column gap */
}

.nav-link {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    color: var(--p-text-color, #495057);
    transition: background-color 0.2s;
    font-weight: 500;
}

.nav-link:hover {
    background-color: var(--p-surface-hover, #e9ecef);
}

.nav-link .ml-2 {
    margin-left: 0.5rem;
}

/* Style for the active route */
.router-link-exact-active {
    background-color: var(--p-highlight-bg, #e3f2fd);
    color: var(--p-highlight-text-color, #1e88e5);
}

.announcement-section {
    max-width: 1200px;
    margin: 0 auto 2rem auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.announcement-toggle {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.9em;
    color: var(--subtitle-color, #666);
}

.announcement-table h3 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.2em;
}

.app-footer {
    text-align: center;
    padding: 2rem;
    margin-top: 2rem;
    color: var(--subtitle-color, #666);
    border-top: 1px solid var(--p-surface-border, #dee2e6);
    font-size: 0.9em;
}

@media (prefers-color-scheme: dark) {
    header, .app-footer {
        border-top-color: var(--p-surface-border, #495057);
        border-bottom-color: var(--p-surface-border, #495057);
    }

    .nav-link {
        color: var(--p-text-color, #ffffffde);
    }

    .nav-link:hover {
        background-color: var(--p-surface-hover, #3a3a3a);
    }

    .router-link-exact-active {
        background-color: var(--p-highlight-bg, #0c2d48);
        color: var(--p-highlight-text-color, #81d4fa);
    }

    .announcement-toggle, .app-footer {
        color: var(--subtitle-color, #aaa);
    }
}
</style>
