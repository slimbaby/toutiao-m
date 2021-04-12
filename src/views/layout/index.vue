<template>
  <div>
    <!-- 子路由模块 -->
    <router-view></router-view>
    <!-- 标签导航栏开始 -->
    <van-tabbar route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye icon-fontSize"></i>
        首页</van-tabbar-item
      >
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda icon-fontSize"></i>
        问答</van-tabbar-item
      >
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin icon-fontSize"></i>
        视频</van-tabbar-item
      >
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode icon-fontSize"></i>
        {{$store.state.user?'我的':'未登录'}}</van-tabbar-item
      >
    </van-tabbar>
    <!-- 标签导航栏结束 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang='less'>
/deep/ .van-tabbar-item__text{
  font-size: 20px;
}
</style>
