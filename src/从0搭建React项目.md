# 从0搭建React项目

## 开篇

大家在刚学习前端新框架的时候，都是使用官方提供的脚手架工具例如 `create-react-app`，但是当自己有特殊的需求时，还需要先eJect，再进行修改，这就显得十分麻烦，而且时间长了也只是会用webpack，遇到情况也只是现查，本文期望通过文章来一步步的搭建一个 React  + Tsx的后端框架，并加上单元测试与mock等功能，也借此机会去了解前端工程化配置的一切，提高自己的水平

## 准备 

所需要的框架包括但不限于: babel react less typeSctipt，工具有 google 必应  

## 起步

首先 我们要先准备一个 空的文件夹，然后进入文件夹执行命令 `yarn init`,获得`package.json`。 然后我们来创建文件 `index.html`

``` html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>从0开始的前端搭建</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

然后再先创建个空文件夹

最后的结果是这个样子：

![文件初始结构](D:\Code\Git\article\images\从0开始React\初始结构.png "文件初始结构")

不用担心`index.html` 的位置，在webpack下只要还在项目里就行

## 引入开发组件

由于我们的目标是使用 React + Tsx

### 编写第一个组件App.ts/js

```tsx
import react from 'react'
const App = () => {
  return <> 
       <p>hello,world!</p>
  </>
}

export default App;

```



App.ts是我们在这项目中写的第一个react组件，

### 编写入口文件index.ts/js



### 安装React 

``` powershell
yarn add react react-dom
```

### 安装typeScript

``` powershell
yarn add typescript -D
```

使用ts也不是安装之后就直接OK的，需要配置tsconfig.json

#### 配置tsconfig.json



### 安装babel

``` powershell
yarn add @babel/core -D
yarn add  @babel/preset-react @babel/preset-react babel-loader @babel/preset-typescript -D
```

提示: 在babel7之后，配置文件由`.babelrc` 变更为了`babel.config.js`,如过想了解更多区别可以看这个[升级你的babel](https://www.cnblogs.com/Molyp/p/13693718.html) 。

### 安装Webpack

``` powershell
yarn add webpack -D
```

#### 配置webpack.config.js 

由于webpack会自动寻找对应的`webpack.config.js `文件，所以我们需要先创建此文件



## 规范化开发

### mock.js

### 规范化提交： git-cz

### 本地npm配置：npmrc



### npm检查更新工具

 `.ncurc` 

// Todo:  :eye:https://www.cnblogs.com/vickylinj/p/12230374.html

## 附加内容

### package.json都有什么?

// TODO：



## 参考链接

- [使用 webpack 搭建 React 项目](https://www.cnblogs.com/jpush88/p/9435277.html)