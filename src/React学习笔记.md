# React



## HOOKS

由于我学习的时候已经是增加了hooks了，所以我的学习方式按照有hooks来做时，就没有学习class模式了。class的方式我一直都不怎么习惯，你总是需要自己手动的实现`constructor()`，而且由于他是子类所以你还需要手动实现下`super() `。

### useState	

hooks的state，与原来的方式不同，的调用方式是this.state.xxx(Vue: 这个我熟，我太熟了），setState的时候还需要手动描述格式

### useRef

与Vue中相似的用法，在React中由于更加轻量级，用的时候要更多一些（其实Vue中也用的也多，所以上文是个废话。。



## Class 语法

用了hooks就不需要使用Class语法了，所以我压根就没学



## 组件

### 函数式组件

React默认要求组件首字母需要大写，如果写了小写将会不生效(我这看起来那就是不生效)

函数式组件的写法很优雅，符合我内心中的高级写法



# 新的学习方法

使用React去实现VUE中实现的东西



例如v-if是再写一个组件然后通过return来判断

v-model 可以自己实现 onChange 事件

v-for 也是同样的思路

