<template>
  <div class="container">
    <DataTable v-if="tableData" :table-data="tableData"></DataTable>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRefreshTime } from '@/utils/refreshTime.js';
import DataTable from '@/components/DataTable/index.vue';
import { getDataTableData } from '@/api/dataTable.js';
let tableData = ref('');

// 取得 api
async function getAsyncDataAPI() {
  // 取得 data table api
  try {
    const newTableData = await getDataTableData();
    tableData.length = 0;
    tableData.value = newTableData.data;
  } catch (err) {
    console.log('err:', err);
  }
}

let { timer, refreshTime } = useRefreshTime();

onMounted(async () => {
  const getAPI = async () => {
    getAsyncDataAPI();

    // 刷新資料
    clearInterval(timer);
    timer = setInterval(async () => {
      getAPI();
    }, refreshTime);
  };
  await getAPI();
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  background-color: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
  width: 100%;
  height: auto;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
