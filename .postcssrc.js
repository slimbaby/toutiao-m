module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-pxtorem': {
      // vant组件需要的基准是37.5,但是我们ui提供的设计稿是75，所以不能写死
      rootValue: ({ file }) => file.includes('vant') ? 37.5 : 75,
      propList: ['*']
    }
  }
}
