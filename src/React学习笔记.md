# React



## HOOKS

由于我学习的时候已经是增加了hooks了，所以我的学习方式按照有hooks来做时，就没有学习class模式了。class的方式我一直都不怎么习惯，你总是需要自己手动的实现`constructor()`，而且由于他是子类所以你还需要手动实现下`super() `。

在React官方对Hooks的描述中，将Hook分为两种: 基础Hook`useState` ,`useEffect`，`useContext`三个，将其他的内置Hook称作“额外的Hook”如`useCallback`

### useState	

hooks的state，与原来的方式不同，的调用方式是this.state.xxx(Vue: 这个我熟，我太熟了），setState的时候还需要手动描述格式

### useContext

 如果想要组件之间共享状态，可以使用`useContext`。
 React 的 `Context API` 是一种在应用程序中深入传递数据的方法，而无需手动一个一个在多个父子孙之间传递 `prop`。当咱们需要的只是传递数据时，它可以作为像`Redux`这样的工具的一个很好的替代。
 使用 `Context` ,首先顶层先声明 `Provier` 组件，并声明 `value`属性，接着在后代组件中声明 `Consumer` 组件，这个 `Consumer`子组件，只能是唯一的一个函数，函数参数即是 `Context` 的负载。如果有多个 `Context` ,`Provider` 和 `Consumer`任意的顺序嵌套即可。

此外我们还可以针对任意一个 `Context` 使用 `contextType` 来简化对这个 `Context` 负载的获取。但在一个组件中，即使消费多个 `Context`,`contextType` 也只能指向其中一个。
 在 Hooks 环境中，依旧可以使用 `Consumer`，但是 `ContextType` 作为类静态成员肯定是用不了。Hooks 提供了 `useContext`,不但解决了 Consumer 难用的问题同时也解决了　`contextType` 只能使用一个 `context`的问题。



### useRef

与Vue中相似的用法，在React中由于更加轻量级，用的时候要更多一些，（其实Vue中也用的也多，所以上文是个废话)。



### useMemo

``` jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

直白的描述是`useMemo`就是React版本`computed`或者`watch`(如果你提供了依赖数组项目，他就是`computed`一样有缓存。如果你提供了空数组，它就会在每次渲染时重新计算) 
### 自定义Hook 
看了官方提供的这么多Hook，我们也肯定想自己实现一个，下面这个hook是个非常简单的例子 使用了`useEffect`和`useState`来组合。用来实现远程获取Select的数据。
```jsx
import React, {useEffect,useState} from 'react'
import request from '@/utils/request';

const useFetchSelect = (url) => {
  const [value,setValue] = useState([]);
    async function getData(){
      const res = await request(url, {
 	method: 'POST'
      })
      // 替换为你需要的判断条件
      if (res.data.length) {
	setValue(res.data)	
      }
  }
	
  useEffect(() => {
    getData();
  },[])
  // 如何在 useEffect中使用 async 
  // https://q.shanyue.tech/fe/react/236.html
  return value;
}
export default useFetchSelect

```
这里的自定义Hooks有几个问题，第一个就是`useEffect`目前是不支持异步操作，也就是 `useEffect(async () => await xxx,[])`这种不能生效。在React17版本中是支持了异步操作。

第二个问题就是，它目前不支持参数，有那种需要筛选，例如 A关联B，B关联C，(省市区) 又不能做成级联选择的那种

我们需要一个父级标志来获取。于是我们修改代码成下面的样子

``` tsx	
import {useEffect,useState} from 'react'
import request from '@/utils/request';

const useFetchSelect = <T>(url: string, queryName?: string, queryValue?: any)  => {
  const [value,setValue] = useState<T[]>([]);
	const [query,setQuery] = useState(queryValue);
	async function getData(){
		if (query === -99) {
			return
		}
		const data = {};
		if (queryName) {
			data[queryName] = query
		}
		const res = await request(url, {
			method: 'GET',
			params: data,
			requestType: 'form',
		})
		if (res.data?.length) {
			setValue([...res.data])	
		}
	}
	
	useEffect(() => {
	 	getData();
	},[url,query,queryName])
	return {value,setQuery};
}
export default useFetchSelect

```

这个版本也是有一些问题，相信大家看到了这个 `query === -99`这个操作，这个操作很脏，为了阻止默认就会发送请求占用网络。也许我们可以再增加一个参数用来标志是否立即请求的flag。

返回结果从单独的`value` 变成了 `{value,setQuery}`,多了个切换参数，来触发其他Select的联动。

用法：

``` tsx
import  useFetchSelect  from '@/utils/hooks';

 // 供应商类型
 const { value: supplierList } = useFetchSelect<TYPE>('/api/supplier/list');
  
  // 数据类型
 const { value: dataTypeList, setQuery: setSupplierId } = useFetchSelect<TYPE>('/api/data/type/list','supplierId', -99); 

```





## Class 语法

用了hooks就不需要使用Class语法了，所以我压根就没学



## 组件

### 函数式组件

React默认要求组件首字母需要大写，如果写了小写将会不生效(我这看起来那就是不生效)

函数式组件的写法很优雅，符合我内心中的高级写法



# 新的学习方法

使用React去实现VUE中实现的东西



例如v-if是再写一个组件然后通过return来判断，简单的使用我们可以使用 a&&(组件)这种方式当时带替代v-if，v-else的话只能选择刚说的再写一个组件判断了

v-model 可以自己实现 onChange 事件

v-for 也是同样的思路，由于jsx本身的灵活，我们不需要这个指令，直接使用js语法就可以，更加直观

v-show 自己手动控制style或者写一个class



# 使用React去实现Vue中的指令

Vue是非常好用的前端框架，快捷开发。但是对我来说不太舒服的地方是，模板语法，我个人觉得这个东西不合胃口，当然也可以选择Vue + Tsx的方式，不过官方建议的就是这个。



# 一点思考

>  在这段学习React的过程中，产生了很多想法

## 比起语法，想法上的区别才是最大的

由于在写React之前写了三年的Vue，对于自己来说上手React的时候，总会下意识的去想“使用React的方式去实现Vue” ,"Vue中的XX在这怎么实现来着？"。这种解决问题的方式，然后发现了二者不同之处

在一次和秃秃聊天的时候，又谈到这个问题，React是非常灵活的，遇到问题的解法不唯一，导致一千个人写React就有一千种风格，而Vue这个我们一致认为Vue做出来的东西有 唯一解/最优解。可是另一方面我发现自己在写React的时候写出来的总是有一种Vue的影子，“我被Vue的思路驯化了”（这不是说vue不好，我在解决工作问题尤其是后台管理系统的时候总是会怀念Vue）



## 我该怎样控制组件的粒度

在Hooks没出现前，函数式组件又称无状态组件，因为他们不在状态(不能控制State)，后来Hooks来了 于是拆分组件变得非常容易。于是这产生了另一个思考："怎么控制粒度呢?" 这个过度灵活的设计，可能会带来无尽的粒度拆分。过于细化，组件之间的传值会变得极为恶心。而不去做组件拆分选择一把梭，又会堆出来大几百行代码，成为一个后续难以维护的面条，在此我想用一个简单的行数限制，300行，这不是什么高深测算出的结果，只是我前段开发的经验谈，你也可以当成我拍脑袋说了个数。


# 配套生态

>  

## UI组件

老早之前听说React的配套生态极其丰富，但就我目前的状态其实没有感受到太多。可能是我比较肤浅，讨论生态的时候喜欢用组件库来衡量。在我个人浅薄的前端开发经历中，使用Vue你可能遇到Element和Iview二选一，也有浅尝辄止过Vuetify，但当我接触到React，去看实际上开发项目时，发现中文前端React圈只有antd，他的占有量超过了一切。

## 路由: React-Router

### react-router-dom



## 状态管理

:shark:

## 脚手架
