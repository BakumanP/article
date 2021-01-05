# 阴间代码

有时候会觉得自己写代码，有一股整活的味道，但是一看也挺有意思的。于是就记录下来，有些比较奇思妙想，当然更多的时候我会觉得自己写的比较阴间。



## 多用三目

>  单一取值字典比switch强，单一状态判断三目比if强，三目，永远的神！

我们来看这么一段代码

``` javascript
let msg = ''
if(code === 200 ){
    msg = 'success'
}else{
    msg = 'fail'
}
```

这种情况就是简单的直接的`const msg = code === 200?'success':'fail'` ;这种肯定会有人去说“就这?”

``` javascript
const category = msg==='success'?arr[index + 1]: arr[index -1];
```

这种其实也写很好的，但是我们来让这行代码更短一些

``` javascript 
const category = arr[index +( msg==='success' ? 1: -1 )];
```

是不是更短了? 有没有感觉到不利于阅读？

这就是我把这步骤称为阴间的原因，虽然这么写节省了一些东西，却让代码的可读性下降了。这点是好是坏诸君自辨。

## 拿副作用当正作用

> 万艾可的故事。

我们来预设一个场景,有字段`commnet_A_wechat`，需求是取出最后一段`_`后的字符`wechat`，咱们正常的思路就是先分割，然后将返回的数组取最后一段。如下面这段代码：

``` javascript
const getLastSegment = (str) => {
    const arr = str.split('_');
    return arr[arr.length - 1];
}
```

那我们有没有比较阴间的写法呢? 有

``` javascript
const getLastSegment = (str) => str.split('_').pop();
```



## 运用新Api

提问：怎么将 ` [{value:number,title:string}]` 这样的数组变成 `{value:title}`

eg: `[value:1,title:'高中数学']; ` => `{175:'高中数学'}`

常见解法：Map

``` javascript
let arr = [{value:1,title:'高中数学'}]
const flat = (arr) => {
    let obj = {}; 
    arr.map(x => obj[x.value] = x.title);
    return obj
}
```

这么解很直观，但是我们为此声明了一个临时变量来处理，显得不怎么好看。于是我该用下面这种写法；

``` javascript
// 没写单独的方法
let arr = [value:1,title:'高中数学'];
arr.reduce((accumulator,currentValue) => {
    accumulator[currentValue.value] = currentValue.title; 
    return accumulator 
},{});
```

这种方式我认为阴间的点是，reduce 相较于 map之流并不是大家所熟知的 api ，使用这种容易为难你的同事。



## 取出csv文件中文件中的第X列数据是否相同

``` javascript
// code 前略
const { result } = file;
result.split('\r')/* 使用 \r 切换回车切割成一行数组  **/
	.filter((x,i) => i > 0) /* 去掉第一行数据（列头） **/
    .map((x,i) => (x.split(','))[0] )/* 取出逗号分割，拿出第一列 **/
    .every((item,index,array) => (item === array[1] ));/* 判断每一格是否相同（与第一格相同） **/
```

这行代码其实没有什么参考性，此代码的目的是灵活使用Array提供的方法进行链式调用

参考:

* [MDN上reduce文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

