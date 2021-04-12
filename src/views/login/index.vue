<template>
  <div class="login-container">
    <van-nav-bar title="登录" class="page-nav-bar">
      <van-icon slot="left" name="cross" @click="$router.go(-1)" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="submitRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji icon-fontSize"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userRules.code"
      >
        <i
          slot="left-icon"
          class="toutiao toutiao-yanzhengma icon-fontSize"
        ></i>
        <template #button>
          <van-count-down
            :time="1000 * 5"
            format="sss"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          ></van-count-down>
          <!-- 发送验证码的类型改成button，不然button默认会提交 -->
          <van-button
            size="mini"
            round
            class="yanzhengma"
            native-type="button"
            @click="onSendSms"
            v-else
          >
            发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'loginPage',
  components: {},
  props: {},
  data () {
    return {
      // 倒计时显示与否的flag
      isCountDownShow: false,
      user: {
        mobile: '',
        code: ''
      },
      userRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 给发送验证码按钮绑定手机号验证事件
    async onSendSms () {
      try {
        await this.$refs.submitRef.validate('mobile')
        console.log('验证成功')
        this.isCountDownShow = true
      } catch (err) {
        return console.log('验证失败')
      }
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    },
    // 定义登录按钮
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const res = await login(user)
        console.log('登陆成功', res)
        this.$toast.success('登陆成功')
        this.$router.back()
        this.$store.commit('setUserToken', res.data.data)
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后重试')
        }
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang = 'less'>
/* 验证码 */
.yanzhengma {
  background-color: #ededed;
}
/* 登录 */
.login-btn {
  background-color: #6db4fb;
  border-color: #6db4fb;
}
.van-icon-cross{
  color: #fff;
  font-size: 30px;
}
</style>
