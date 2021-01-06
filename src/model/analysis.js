import { get } from '../lin/plugin/axios'

class Analysis {
  static async getThisMonthOrderCountInfo() {
    const res = await get('v1/analysis/this-month-orders')
    return res
  }

  static async getLastMonthOrderCountInfo() {
    const res = await get('v1/analysis/last-month-orders')
    return res
  }

  static async getSalesInfo() {
    const res = await get('v1/analysis/sales-comparision')
    return res
  }

  static async getSalesCountInfo() {
    const res = await get('v1/analysis/count-comparision')
    return res
  }

  static async getCategoryCountInfo() {
    const res = await get('v1/analysis/category-orders')
    return res
  }
}

export default Analysis
