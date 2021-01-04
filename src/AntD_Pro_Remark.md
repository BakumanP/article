# AntD Pro 的使用备注



## 路由

路由的配置在config下的`route.js`



## ProTable

看起来像是组件，实际上是组合了查询，新建，列表展示的一体化。你可以配置`HideInFrom`, `HideInSearch` ,`HideInTable` 来调整出现的位置，ProTable的请求的方式为在Request的属性中配置。



## Form

### 使用ref

``` jsx
const [formRef] = Form.useForms();
```



无论是 `StepForm` 还是 `ProForm` ，都是对`Form`的一个封装。你可以通过这个`formRef`来使用和AntD一样的api

### 清空

 `formRef.resetFields()`是用来清空值的方式，命名方式是和 `FormItem` 的`name` 是一致的

``` js 
formRef.resetFields('name') // 属性

formRef.resetFields(['obj','name']) // 对象中属性

formRef.resetFields(['objs',0,'name']) // 对象数组中属性
```

然后发现上面的方法不好用，改用set undefined

例如：

``` javascript
 form.setFieldsValue({apiDataSourceInVO: { apiDataTypeId: null, apiDataMediaArr: [], }})
```

上面的例子是用来对付嵌套的form结构。

如果要设置的类型为TimePiker等，需要将后端转发的string通过moment转化一下。

如果要设置select，要记得触发一次远程调用

### Rules







## 参考链接

* [ProComponents ](https://procomponents.ant.design/components/): ANTD Pro组件开发文档
* [Pro预览页面](https://preview.pro.ant.design/): 涵盖了绝大多数常用页面展示