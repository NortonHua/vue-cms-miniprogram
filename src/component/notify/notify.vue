<template>
  <el-dropdown :trigger="trigger" :placement="placement" :hide-on-click="hideOnClick">
    <div class="notify">
      <el-badge :value="value" class="item" :hidden="hidden" :max="max" :is-dot="isDot">
        <i :class="icon"></i>
      </el-badge>
    </div>
    <el-dropdown-menu slot="dropdown">
      <div class="notify-title">
        <p>消息提醒</p>
        <p class="button" @click="readAll">全部已读</p>
      </div>
      <div class="content" :style="{ 'min-height': height + 'px', 'max-height': height + 'px' }">
        11
        <div
          class="css-nomessage"
          v-if="messages.length === 0"
          :style="{ 'min-height': height + 'px', 'max-height': height + 'px' }"
        >
          <div class="css-sumlaa">
            <svg width="150" height="120" viewBox="0 0 150 120" fill="currentColor">
              <!-- eslint-disable-next-line -->
              <path
                fill="#EBEEF5"
                d="M46.76 78.71a1.895 1.895 0 0 0-1.378 2.092c.13.948.94 1.648 1.904 1.635h55.468a1.882 1.882 0 0 0 1.884-1.635c.13-.95-.46-1.846-1.367-2.09a8.61 8.61 0 0 1-6.4-7.872l-2.473-20.928c-.96-7.872-6.567-14.37-14.178-16.435l-.986-.267-.113-1.014c-.24-2.106-2.01-3.696-4.11-3.696s-3.87 1.59-4.104 3.696l-.114 1.014-.98.267c-7.61 2.063-13.22 8.563-14.18 16.43L53.15 70.84c-.2 3.74-2.79 6.926-6.393 7.87zm50.61-29.155l2.482 20.982c.127 2.562 1.817 4.654 4.19 5.276a4.895 4.895 0 0 1 3.568 5.397c-.336 2.446-2.434 4.26-4.876 4.227H47.306a4.883 4.883 0 0 1-4.896-4.227 4.897 4.897 0 0 1 3.58-5.4 5.614 5.614 0 0 0 4.17-5.168l2.49-21.093c1.068-8.77 7.135-16.06 15.46-18.7.807-3.11 3.615-5.35 6.9-5.35s6.094 2.24 6.9 5.35c8.325 2.64 14.393 9.93 15.46 18.7zm-16.417 38.91c-.288 3.184-3.007 5.36-5.943 5.36-2.936 0-5.655-2.176-5.943-5.36l-2.988.27c.43 4.82 4.52 8.09 8.93 8.09s8.49-3.27 8.93-8.09l-2.99-.27z"
              ></path>
            </svg>
            <div>还没有消息</div>
          </div>
        </div>
        <el-dropdown-item v-for="(msg, index) in messages" :key="index" @click.native="readMessages(msg, index)">
          <slot :row="msg">
            <p :class="msg[props.is_read] ? 'read-messages' : 'unread-messages'">{{ msg[props.content] }}</p>
            <div class="sketchynformation">
              <p class="user">{{ msg[props.user] }}</p>
              <p class="date-time">{{ msg[props.time] }}</p>
            </div>
          </slot>
        </el-dropdown-item>
      </div>
      <div class="notify-footer">
        <p class="viewAll" @click="viewAll">查看全部 &gt;</p>
      </div>
      <audio id="notice">
        <source src="../../assets/music/pikaqiu.mp3" type="audio/mpeg" />
      </audio>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  props: {
    height: {
      type: [String, Number],
      default: 200,
    },
    trigger: {
      type: String,
    },
    placement: {
      type: String,
    },
    hideOnClick: {
      type: Boolean,
    },
    max: {
      type: Number,
    },
    isDot: Boolean,
    hidden: {
      type: Boolean,
    },
    value: {
      type: [String, Number],
    },
    icon: {
      type: String,
      default: 'el-icon-bell',
    },
    props: {
      default() {
        return {
          user: 'user',
          is_read: 'is_read',
          content: 'content',
          time: 'time',
        }
      },
    },
    messages: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {}
  },
  mounted() {
    // webSocket
    if ('WebSocket' in window) {
      this.websocket = new WebSocket('WS://localhost:5000/ws/message')
      this.initWebSocket()
    } else {
      this.$message.error('当前浏览器不支持WebSocket')
    }
  },
  beforeDestroy() {
    this.onbeforeunload()
  },
  methods: {
    readMessages(msg, index) {
      this.$emit('readMessages', msg, index)
    },
    readAll() {
      this.$emit('readAll')
    },
    viewAll() {
      this.$emit('viewAll')
    },
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage
      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage
      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage
      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，服务端会报异常
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      this.$message.error(`WebSocket连接发生错误   状态码：${this.websocket.readyState}`)
    },
    setOnopenMessage() {
      this.$message.success('WebSocket连接成功')
    },
    setOnmessageMessage() {
      // 根据服务端推送的消息做自己的业务逻辑
      this.$message.warning('您有新的订单来啦！')
      document.getElementById('notice').play()
    },
    setOncloseMessage() {
      this.$message.warning('WebSocket连接已关闭')
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.notify {
  font-size: 18px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.content {
  overflow-y: auto;
}

.css-nomessage {
  box-sizing: border-box;
  min-width: 0px;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  display: flex;
  margin: 0px;
  flex: 1 1 0%;
}

.css-sumlaa {
  box-sizing: border-box;
  min-width: 0px;
  text-align: center;
  color: rgb(133, 144, 166);
  margin: 0px;
}

.nomessages {
  padding: 20px 0px;
  text-align: center;
}

.sketchynformation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.unread-messages {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    background: #f4516c;
  }
}

.read-messages {
  position: relative;

  &:before {
    content: '';
    position: absolute;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    top: 50%;
    left: -15px;
    transform: translateY(-50%);
    background: #ebedf2;
  }
}

.notify-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #45526b;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 8px;
  height: 50px;
  font-weight: 500;
  min-width: 386px;
  border-bottom: 1px solid #dee2e6;

  .button {
    font-size: 12px;
    border: 1px solid #596c8e;
    border-radius: 2px;
    cursor: pointer;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    padding-right: 5px;
  }
}

.notify-footer {
  padding: 19px 0px;
  border-top: solid 1px #dee2e6;

  .viewAll {
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    font-size: #45526b;
  }
}

.el-dropdown-menu__item {
  padding: 0 35px;
}
</style>
