<template>
  <div id="Radar"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Radar } from '@antv/g2plot'
import Analysis from '../../../model/analysis'

export default {
  name: 'Radar',
  data() {
    return {
      data: [
        // { type: '蛋糕', mark: '1月', value: 80 },
        // { type: '小甜品', mark: '1月', value: 20 },
        // { type: '千层', mark: '1月', value: 60 },
        // { type: '团子', mark: '1月', value: 40 },
        // { type: '三明治', mark: '1月', value: 70 },
        // { type: '三明治', mark: '11月', value: 84 },
        // { type: '蛋糕', mark: '12月', value: 70 },
        // { type: '小甜品', mark: '12月', value: 50 },
        // { type: '千层', mark: '12月', value: 90 },
        // { type: '团子', mark: '12月', value: 80 },
        // { type: '三明治', mark: '12月', value: 20 },
        // { type: '蛋糕', mark: '11月', value: 100 },
        // { type: '小甜品', mark: '11月', value: 40 },
        // { type: '千层', mark: '11月', value: 60 },
        // { type: '团子', mark: '11月', value: 90 },

        { title: '杨枝甘露胖胖杯', month: '2021-1', value: 3 },
        { title: '合情咖啡', month: '2020-12', value: 6 },
        { title: '杨枝甘露胖胖杯', month: '2020-12', value: 3 },
        { title: '合情咖啡', month: '2021-1', value: 2 },
        { title: '奥特曼与怪兽', month: '2020-12', value: 5 },
        { title: '淤泥巴斯克', month: '2020-12', value: 16 },
        { title: '香蕉可可', month: '2020-12', value: 8 },
        { title: '温暖城堡', month: '2020-12', value: 12 },
        { title: '烛火', month: '2020-12', value: 8 },
        { title: '烛火', month: '2021-1', value: 2 },
        { title: '奥特曼与怪兽', month: '2021-1', value: 1 },
        { title: '千层蜜柚', month: '2021-1', value: 1 },
        { title: '好吃', month: '2021-1', value: 1 },
        { title: '桃胶玫瑰', month: '2020-12', value: 11 },
      ],
    }
  },
  mounted() {
    this.paintChart()
  },
  methods: {
    async paintChart() {
      new Radar('Radar', {
        title: {
          text: '各商品每月销售量对比分析',
          visible: true,
        },
        data: await Analysis.getSalesCountInfo(),
        radiusField: 'value',
        angleField: 'type',
        seriesField: 'mark',
        color: ['#4577FF', '#FEC108', '#FF5733'],
        legend: {
          visible: true,
          position: 'top-right',
        },
      }).render()
    },
  },
}
</script>

<style scoped></style>
