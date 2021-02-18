const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons') //配置所有icon的地址
    //config就是vue把webpack的api给封装了
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() //包含icons目录
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({
        extract: false
      }).end()
      .use('svgo-loader').loader('svgo-loader').tap(options => ({
        ...options,
        plugins: [{
          removeAttrs: {
            attrs: 'fill'
          }
        }]
      })).end()
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{
      plainSprite: true
    }])
    config.module.rule('svg').exclude.add(dir) //其他svg loader排除icons目录
  }
}