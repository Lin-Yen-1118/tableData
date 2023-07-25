<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-space vertical :size="12">
      <n-data-table
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="tableData"
        :row-class-name="rowClassName"
        :max-height="250"
        virtual-scroll
      />
    </n-space>
  </n-config-provider>
</template>
<script setup>
import { ref, reactive, h, onMounted, onUnmounted } from 'vue';
import { NButton, useMessage, useDialog } from 'naive-ui';

const props = defineProps({
  tableData: { type: Object, required: true, default: undefined },
});

//naive ui 客製化樣式
const themeOverrides = {
  DataTable: {
    borderColor: '#CCCCCC',
    tdColor: '#fff',
  },
};
const theme = null;

const columns = reactive([
  {
    title: '種類',
    key: 'title',
    className: 'title',
  },
  {
    title: '數量',
    key: 'amount',
    className: 'amount',
  },
  {
    title: '電量<70',
    key: 'power70',
    className: 'power70',
  },
  {
    title: '電量<40',
    key: 'power40',
    className: 'power40',
  },
  {
    title: '關機或消失',
    key: 'powerDown',
    className: 'powerDown',
  },
]);

// setting style
function rowClassName(row) {
  if (props.tableData.indexOf(row) % 2 === 0) {
    return 'theme_td';
  }
}
</script>
<style scoped>
:deep(.n-data-table-table) {
  border-top: 1px solid #cccccc;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
}

:deep(.n-data-table-td) {
  /* padding-left: 2rem;
  padding-right: 2rem; */
  text-align: center;
  min-height: 48px;
  min-width: 30px;
  padding: 10px;
}

:deep(.n-data-table-th) {
  /* padding-left: 2rem;
  padding-right: 2rem; */
  font-weight: 900;
  text-align: center;
  padding: 10px;
}
:deep(.theme_td td) {
  background-color: #ebebeb;
}
</style>
