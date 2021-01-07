<template>
  <div id="grouped-column"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { GroupColumn } from '@antv/g2plot'
import Analysis from '../../../model/analysis'

const dataInfo = []
export default {
  name: 'GroupedColumn',
  data() {
    return {
      data: [
        { title: '杨枝甘露胖胖杯', month: '2021-1', value: 90 },
        { title: '合情咖啡', month: '2020-12', value: 192 },
        { title: '杨枝甘露胖胖杯', month: '2020-12', value: 90 },
        { title: '合情咖啡', month: '2021-1', value: 64 },
        { title: '奥特曼与怪兽', month: '2020-12', value: 450 },
        { title: '淤泥巴斯克', month: '2020-12', value: 480 },
        { title: '香蕉可可', month: '2020-12', value: 240 },
        { title: '温暖城堡', month: '2020-12', value: 960 },
        { title: '烛火', month: '2020-12', value: 800 },
        { title: '烛火', month: '2021-1', value: 200 },
        { title: '奥特曼与怪兽', month: '2021-1', value: 90 },
        { title: '千层蜜柚', month: '2021-1', value: 25 },
        { title: '好吃', month: '2021-1', value: 56 },
        { title: '桃胶玫瑰', month: '2020-12', value: 352 },
      ],
    }
  },

  async mounted() {
    // this.getData()
    this.paintChart()
  },

  methods: {
    async paintChart() {
      const canvas = new GroupColumn('grouped-column', {
        title: {
          text: '各商品每月销售额对比',
          visible: true,
        },
        data: await Analysis.getSalesInfo(),
        groupField: 'month',
        xField: 'title',
        yField: 'value',
        meta: {
          title: {
            alias: '甜品名称',
          },
          value: {
            alias: '销售额',
          },
        },
        forceFit: true,
        color: ['#4577FF', '#00C292', '#234DFD'],
        columnSize: 12,
        xAxis:{
          label:{
            visible:true,
            offsetX:-10,
            rotate:45
          }
        },
        legend: {
          visible: true,
          position: 'top-right',
        },
        scrollBar:{
          interactions: [
            {
              type: 'scrollbar',
            },
          ],
        }
      })
      canvas.render()
    },
  },
}
</script>
<style scoped></style>
