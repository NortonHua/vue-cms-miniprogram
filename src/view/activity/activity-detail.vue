<template>
  <div>
    <sticky-top>
      <div class="title">
        <span>{{ isCreate ? '创建活动' : '更新活动' }}</span>
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
                <el-input size="medium" v-model="form.title" placeholder="请填活动标题"></el-input>
              </el-form-item>

              <el-form-item label="名称" prop="name">
                <el-input size="medium" v-model="form.name" placeholder="请填写活动名称"></el-input>
              </el-form-item>

              <el-form-item label="提示" prop="remark">
                <el-input size="medium" v-model="form.remark" placeholder="请填写活动提示"></el-input>
              </el-form-item>

              <el-form-item label="状态" prop="online">
                <el-select v-model="form.online" placeholder="请填写状态">
                  <el-option v-for="(item, index) in types" :key="item" :label="item" :value="index"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="时间">
                <el-date-picker
                  v-model="range"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>

              <el-form-item label="主图" prop="cover_img">
                <upload-imgs :max-num="maxNum" ref="uploadCoverEle" :rules="rules" :value="initCoverData" />
              </el-form-item>

              <el-form-item label="描述" prop="description">
                <el-input size="medium" v-model="form.description" placeholder="请填写活动描述"></el-input>
              </el-form-item>

              <el-form-item class="submit">
                <el-button
                  v-permission="{ permission: ['创建活动', '更新活动'], type: 'disabled' }"
                  type="primary"
                  @click="submitForm('form')"
                  >保 存</el-button
                >
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
import dayjs from 'dayjs'
import Activity from '../../model/activity'
import UploadImgs from '../../component/base/upload-image'
import { post } from '../../lin/plugin/axios'

export default {
  components: { UploadImgs },
  props: {
    isCreate: {
      type: Boolean,
      default: false,
    },
    activityId: {
      type: String,
      default: null,
    },
  },

  data() {
    return {
      form: {
        id: null,
        name: '',
        title: '',
        description: '',
        online: 1,
        remark: '',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      types: ['下线', '上线'],
      range: '',
      rules: {
        minWidth: 10,
        minHeight: 10,
        maxSize: 5,
      },
      initCoverData: [],
      initTopData: [],
      maxNum: 1,
    }
  },

  async mounted() {
    if (!this.isCreate) {
      const res = await Activity.getActivity(this.activityId)
      this.form = res
      const end = new Date(res.end_time)
      const start = new Date(res.start_time)
      this.range = [start, end]
      this.initCoverData = [
        {
          id: res.id,
          display: res.entrance_img,
        },
      ]
    }
  },

  methods: {
    async submitForm(formName) {
      await this.getValue()
      try {
        const postData = { ...this.form }
        // if (this.form.activity_cover_id === 0) {
        //   this.form.activity_cover_id = null
        // }
        if (!postData.title || !postData.name) {
          this.$message.error('请填写标题、名称！')
          return
        }
        if (!this.range) {
          this.$message.error('请选择活动开始结束时间')
          return
        }
        if (!postData.entrance_img) {
          this.$message.error('请选择图片！')
          return
        }
        postData.start_time = new Date(this.dateFormat(this.range[0]))
        postData.end_time = new Date(this.dateFormat(this.range[1]))
        console.log(postData)
        let res
        if (this.isCreate) {
          res = await Activity.addActivity(postData)
        } else {
          res = await Activity.editActivity(this.activityId, postData)
        }
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.$confirm('是否返回上一页？', '提示', {
            confirmButtonText: '是',
            cancelButtonText: '否',
            type: 'info',
          }).then(async () => {
            this.$emit('editClose')
          })
        }
      } catch (error) {
        console.error(error)
      }
    },

    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },

    dateFormat(val) {
      return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
    },

    async getValue() {
      const val = await this.$refs.uploadCoverEle.getValue()
      if (val && val.length > 0) {
        this.form.entrance_img = val[0].display
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
