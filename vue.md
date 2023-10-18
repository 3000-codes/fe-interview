# Vue相关面试题

## vue2与vue3区别

+ 增加了`Composition API`，可以更好的组织代码，采用函数式编程，可以更好的复用逻辑，更好的支持typescript和tree-shaking
+ 生命周期变化 （setup，onUpdated，onRenderTracked，onRenderTriggered，onUnmounted，调试钩子）
+ v-if与v-for优先级变化
+ 创建vue实例方法变化，全局注册变化
+ 新增`Teleport`组件，可以将组件渲染到任意位置
+ 新增`Suspense`组件，可以在异步组件中添加加载状态
+ 新增`Fragment`组件，可以在组件中使用多个根节点（vue2中只能有一个根节点）
+ 响应式系统变化，`Proxy`代替`Object.defineProperty`，可以监听数组的变化
    - 没有完全舍弃`Object.defineProperty`，ref的实现还是用的`Object.defineProperty`
+ 增加节点类型`Static`，`Static`节点不会变化，可以提高渲染性能