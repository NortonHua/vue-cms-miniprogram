<template>
  <div>
    <sticky-top>
      <div class="title">
        <span>{{ isCreate ? '创建商品' : '更新商品' }}</span>
        <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
        <el-divider></el-divider>
      </div>
    </sticky-top>
    <div class="container">
      <div class="wrap">
        <el-row>
          <el-col :lg="16" :md="20" :sm="24" :xs="24">
            <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
              <el-form-item label="标题" prop="title">
                <el-input size="medium" v-model="form.title" placeholder="请填写标题"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="subtitle">
                <el-input size="medium" v-model="form.subtitle" placeholder="请填写副标题"></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="price">
                <el-input size="medium" v-model="form.price" placeholder="请填写价格"></el-input>
              </el-form-item>
              <el-form-item label="折扣" prop="discount_price">
                <el-input size="medium" v-model="form.discount_price" placeholder="请填写折扣"></el-input>
              </el-form-item>
              <el-form-item label="分类" prop="category_id">
                <el-autocomplete
                  @focus="loadCategorySuggestions"
                  popper-class="my-autocomplete"
                  class="inline-input"
                  v-model="categoryState"
                  :fetch-suggestions="queryCategorySearch"
                  placeholder="请填写所属分类"
                  @select="handleCategorySelect"
                >
                  <template slot-scope="{ item }">
                    <span class="id">{{ item.id }}</span>
                    <span class="name">{{ item.name }}</span>
                  </template>
                </el-autocomplete>
              </el-form-item>

              <el-form-item label="是否上架">
                <el-switch
                  size="medium"
                  v-model="saled"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="上架"
                  inactive-text="下架"
                ></el-switch>
              </el-form-item>

              <el-form-item label="主图" prop="img">
                <el-tooltip class="item" effect="dark" content="主图，前端展示图片" placement="top-start">
                  <upload-imgs multiple :max-num="mainMaxNun" ref="uploadEle" :value="initData" />
                </el-tooltip>
              </el-form-item>

              <el-form-item label="描述" prop="description">
                <el-input size="medium" v-model="form.description" placeholder="请填写描述"></el-input>
              </el-form-item>

              <el-form-item class="submit">
                <el-button
                  v-permission="{ permission: ['创建SPU', '更新SPU'], type: 'disabled' }"
                  type="primary"
                  @click="submitForm('form')"
                  >保 存
                </el-button>
                <el-button @click="resetForm('form')">重 置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import Spu from '../../model/spu'
import Category from '../../model/category'
import UploadImgs from '../../component/base/upload-image'

export default {
  components: {
    UploadImgs,
  },
  name: 'spu-edit',
  props: {
    isCreate: {
      type: Boolean,
      default: false,
    },

    spuId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      form: {
        title: '',
        subtitle: '',
        category_id: null,
        online: 1,
        price: null,
        discount_price: null,
        img: null,
        description: null,
      },
      rules: {
        minWidth: 100,
        minHeight: 100,
        maxSize: 5,
      },
      initData: [],
      maxNum: 5,
      mainMaxNun: 1,
      saled: true,
      categorySuggestions: [],
      categoryState: '',
    }
  },

  watch: {
    saled(val) {
      this.form.online = val ? 1 : 0
    },
  },

  async mounted() {
    if (!this.isCreate) {
      const res = await Spu.getSpu(this.spuId)
      this.form = res
      const initData = [
        {
          id: res.id,
          display: res.img,
        },
      ]
      this.saled = res.online === 1
      this.initData = initData
      const category = await Category.getCategory(res.category_id)
      this.categoryState = category.name
    }
  },

  methods: {
    async submitForm(formName) {
      await this.getValue()
      const postData = { ...this.form }
      if (!postData.title) {
        this.$message.error('请填写标题！')
        return
      }
      if (!postData.price) {
        this.$message.error('请填写价格信息！')
        return
      }
      if (!postData.category_id) {
        this.$message.error('请选择分类！')
        return
      }
      if (!postData.img) {
        this.$message.error('请添加图片信息！')
        return
      }

      let res
      if (this.isCreate) {
        res = await Spu.addSpu(postData)
      } else {
        res = await Spu.editSpu(this.spuId, postData)
      }
      console.log(res)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        // this.resetForm(formName)
        this.$confirm('是否返回上一页', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          this.$emit('editClose')
        })
      }
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    queryCategorySearch(queryString, cb) {
      // eslint-disable-next-line
      const suggestions = this.categorySuggestions
      const results = queryString ? suggestions.filter(this.createCategoryFilter(queryString)) : suggestions
      cb(results)
    },
    createCategoryFilter(queryString) {
      // eslint-disable-next-line
      return suggestion => {
        return suggestion.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    handleCategorySelect(item) {
      this.categoryState = item.name
      this.form.category_id = item.id
    },
    async getValue() {
      const val = await this.$refs.uploadEle.getValue()
      if (val && val.length > 0) this.form.img = val[0].display
    },

    back() {
      this.$emit('editClose')
    },
    async loadCategorySuggestions() {
      if (this.categorySuggestions.length > 0) {
        return
      }
      try {
        this.categorySuggestions = await Category.getList()
        if (this.categorySuggestions.length === 0) {
          this.$message.error('暂无分类，请先添加')
        }
      } catch (error) {
        this.$message.error('获取分类建议信息失败')
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}

.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;
    display: inline-flex;
    align-content: space-around;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .id {
      margin-right: 15px;
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
