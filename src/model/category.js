import { post, get, put, _delete } from '../lin/plugin/axios'

class Category {
  static async addCategory(data) {
    const res = await post('v1/category', data)
    return res
  }

  static async getCategory(id) {
    const res = await get(`v1/category/${id}`)
    return res
  }

  static async editCategory(id, data) {
    const res = await put(`v1/category/${id}`, data)
    return res
  }

  static async deleteCategory(id) {
    const res = await _delete(`v1/category/${id}`)
    return res
  }

  static async getCategories(page = 0, count = 10) {
    const res = await get('v1/category/page', {
      page,
      count,
    })

    return res
  }

  static async getList() {
    const res = await get('v1/category/categories')
    return res
  }
}

export default Category
