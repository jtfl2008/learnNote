<template>
  <div ref="chartRef" class="chart"></div>
</template>

<script name="Chart" setup lang="ts">
// import * as echarts from 'echarts'
// import { ECharts, EChartsCoreOption } from 'echarts'

let props = defineProps({
  options: {
    type: Object as PropType<EChartsCoreOption>,
    required: true,
    default: () => ({}),
  },
});
let chartRef = $ref<HTMLElement | null>(null);
let chart = null;

let initChart = () => {
  if (props.options) {
    chart = echarts.init(chartRef);
    chart.setOption(props.options);
  }
};
onMounted(() => {
  initChart();
});
onUnmounted(() => {
  if (chart) {
    chart.dispose();
    chart = null;
  }
});
window.addEventListener('resize', () => {
  if (chart) {
    chart.resize();
  }
});
</script>
<style></style>
