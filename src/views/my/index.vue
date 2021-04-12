<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="header login" v-if="user">
      <div class="top">
        <div class="left">
          <van-image round src="https://img01.yzcdn.cn/vant/cat.jpeg" />
          <span>用户名</span>
        </div>
        <div class="right">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="bottom">
        <div class="item">
          <span>0</span>
          <span>头条</span>
        </div>
        <div class="item">
          <span>0</span>
          <span>关注</span>
        </div>
        <div class="item">
          <span>0</span>
          <span>粉丝</span>
        </div>
        <div class="item">
          <span>0</span>
          <span>获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="inner" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <span>登录/注册</span>
      </div>
    </div>
    <van-grid :column-num="2" clickable>
      <van-grid-item icon="star-o" text="收藏" />
      <van-grid-item icon="underway-o" text="历史" />
    </van-grid>
    <van-cell style="margin-top: 6px" title="消息通知" is-link />
    <van-cell style="margin-bottom: 6px" title="小智同学" is-link />
    <van-cell
      style="text-align: center; color: #d86262"
      title="退出登录"
      center
      v-if="user"
      @click="logout"
    ></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 退出按钮点击事件
    logout () {
      this.$dialog.confirm({
        title: '确认退出？'
      })
        .then(() => {
          this.$store.commit('setUserToken', null)
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 361px;
  background: url("~@/assets/banner.png");
  background-size: cover;
}

.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 132px;
    height: 132px;
    margin-bottom: 8px;
    display: block;
  }

  span {
    font-size: 14px;
    color: #fff;
  }
}

.login .top {
  height: 231px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .van-image {
    width: 132px;
    height: 132px;
    margin-right: 20px;
  }
  .left {
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #fff;
  }
}
.bottom {
  height: 130px;
  display: flex;
  .item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 36px;
    color: #fff;
    span {
      &:last-child {
        font-size: 24px;
      }
    }
  }
}
/deep/.van-icon-star-o {
  color: #eb5253;
}
/deep/.van-icon-underway-o {
  color: #ff9d1d;
}
</style>
