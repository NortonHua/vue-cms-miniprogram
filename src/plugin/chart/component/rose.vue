<template>
  <div id="rose"></div>
</template>

<script>
// eslint-disable-next-line import/no-extraneous-dependencies
import { Rose } from '@antv/g2plot'
import Analysis from '../../../model/analysis'

export default {
  name: 'Rose',
  data() {
    return {
      data: [
        {
          type: '蛋糕',
          value: 2700,
        },
        {
          type: '小甜品',
          value: 2500,
        },
        {
          type: '千层',
          value: 1898,
        },
        {
          type: '三明治',
          value: 2376,
        },
        {
          type: '团子',
          value: 1760,
        },
        {
          type: '吐司',
          value: 1500,
        },
      ],
    }
  },
  async mounted() {
    this.paintChart()
  },

  methods: {
    async paintChart() {
      console.log(await Analysis.getCategoryCountInfo())
      new Rose('rose', {
        title: {
          text: '品类订单数分析',
          visible: true,
        },
        data: await Analysis.getCategoryCountInfo(),
        radiusField: 'value',
        categoryField: 'category',
        colorField: 'category',
      }).render()
    },
  },
}
</script>

<style scoped></style>
