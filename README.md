# @xohu/vue-cli-plugin-create-router

> vue-cli3 的 create-router 插件

- **安装**

  ```
  vue add @xohu/create-router
  or
  npm install @xohu/vue-cli-plugin-create-router -D
  or
  cnpm install @xohu/vue-cli-plugin-create-router -D
  ```

## 注入的命令

- **`vue-cli-service createRouter`**

  ```
  使用：vue-cli-service createRouter [options]

  选项：
    --async 开启路由异步模式，实现路由组件的懒加载 (默认不开启)
  ```

  ```
  ## 注
  create-router 插件对 vue-cli-service serve 增加了 --watch 监听模式
  可以运行 npx vue-cli-service help serve 查看所有选项
  如有需要，可以监听模式运行 serve 服务，监听 projectPath 目录下文件的 created，removed，changed
  ```

## 配置
可以通过 `vue.config.js` > `pluginOptions.createRouterConfig` 进行配置

``` js
// vue.config.js
module.exports = {
  pluginOptions: {
       createRouterConfig: {
          // 工作目录（默认: src）
          cwd: path.resolve(process.cwd(), './src'),
          // 项目页面地址（默认: views）
          projectPath: `views`,
          // 生成路由文件的名称（默认: index）
          outputFileName: 'index',
          // 忽略的页面文件（不被写入 router 配置）（默认：[]）（例：['login', 'header.vue']）
          ignore: [],
          // 开启路由异步模式（默认: true）
          async: true,
          // 以监听模式运行 serve 服务，监听 projectPath 目录下文件的 created，removed，changed （默认: true）
          watch: true,
          // 以监听模式运行 serve 服务，监听 projectPath 目录下文件的 changed （默认: watch 的值）
          changeWatch: true
      }
   }
}
```

## 项目目录

```
.
├─assets
├─components
├─views
│  ├─layout
│  │   └─home.vue
│  └─layout.vue,
│  └─login.vue,
├─router
│  └─index.js
└─store
```

创建内嵌子路由，你需要添加一个 vue 文件，同时添加一个与该文件同名的目录用来存放子视图组件

使用 **`<router-config>`** 标签
可以对每个页面进行单独配置，并且会覆盖 createRouterConfig 中的全局配置，更多路由介绍请查看 [vue-router 官网](https://router.vuejs.org/zh/)
```
# views/layout.vue
<router-config>
{
    // 注释说明文字
    note: 'Layout 页面',
    // 是否忽略当前文件（写入 router 配置）（true：忽略，false：不忽略）
    ignore: false,
    // 开启路由异步模式（默认: true）
    async: true,
    // 监听当前页面内容的 changed （默认: watch 的值）
    changeWatch: true,

    // 以下参数请参考 vue-router 官网
    path: '/layout',
    alias: '',
    redirect: '',
    meta: {
        code...
    },
    beforeEnter: function(to, from, next) {
        code...
    }
}
</router-config>

<template>
    <div>
        hello
    </div>
</template>

<script>
export default {
    name: 'layout',
    mounted() {
        this.$nextTick(() => {
            // 获取 <router-config> 标签的内容
            console.log(this.$options._router)
        });
    }
}
</script>
```

`<route-config>` 包含一个 `json` 的内容, 其中字段会同步到生成的 `router/index.js` 路由配置文件

启动项目后生成文件`router/index.js`

```

// Layout 页面
const layout = () => import('@/views/layout')
// Home 页面
import layoutHome from '@/views/layout/home'
// 登录 页面
import login from '@/views/login'

const routes = [
    {
        name: "/layout",
        path: "/layout",
        component: layout,
        children: [
        {
            name: "/layout/home",
            path: "home",
            component: layoutHome
        }
        ],
        meta: {
            requiresAuth: true
        },
        redirect: {
            name: "/test"
        },
        beforeEnter: function(to, from, next) {
            next()
        }
    },
    {
        name: "/login",
        path: "/login",
        component: login
    }
]

export default routes
```

``` js
// main.js
import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router' 
Vue.use(Router) 

import routes from '@/router' // @：src

const router = new Router({
    routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

## 路由文件生成规则
``` js
路由 name 和 path 默认按照文件路径命名，例如 /layout/test1/test2/home
{
    name: "/layout/test1/test2/home",
    path: "/layout/test1/test2/home",
    component: layoutTest1Test2Home
}
```

## 注意事项
```
默认 <route-config> 标签的内容发生改变后自动触发更新路由配置文件.
可以在 createRouterConfig 全局或者单个文件上设置 changeWatch：true | false 开启或关闭.
```

```
[ ] { } # % $ ^ * + = - | ~ < > . , ? ! @ & ( ) : ; " & \\ @
以上关键字命名的 vue 文件，会自动过滤掉关键字
/layout/test1/test2/h@#$%~^&*ome = /layout/test1/test2/home
```