<!-- 基本搭建 https://juejin.cn/post/7075136766428217358 -->


<!--  性能优化 https://juejin.cn/post/7083519723484708878 -->
<!--  https://juejin.cn/post/7142802292436598820 -->
### 1.优化时间
  1. thread-loader/HappyPack 多进程打包
  2. cache-loader 缓存资源
  3. DllPlugin 第三方包分离
  4. exclude & include 合理设置
  5. 构建区分环境
### 2.优化体积
  1. CSS代码压缩
  2. JS代码压缩
  3. tree-shaking 代码分割
  4. source-map
  5. 打包体积分析
### 3.优化体验
  1. 模块懒加载
  2. Gzip


#### loader  是一个转换器，用于对源代码进行转换
 
### plugin 在整个编译周期中会触发很多不同的事件，plugin 可以监听这些事件，并且可以调用 webpack 的 API 对输出资源进行处理
