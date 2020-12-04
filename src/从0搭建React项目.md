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

新增@type文件

``` powershell
yarn add @types/node @types/react @types/react-dom @types/webpack @types/webpack-dev-server @types/webpack-merge -D
```



使用ts也不是安装之后就直接OK的，需要配置tsconfig.json



#### 配置tsconfig.json

``` powershell
tsc --init 
```

会自动创建一个 `tsconfig.json`

### 安装babel

``` powershell
yarn add @babel/core -D
yarn add  @babel/preset-react @babel/preset-react babel-loader @babel/preset-typescript @babel/register @babel/runtime @babel/preset-env @babel/plugin-transform-runtime -D
yarn add thread-loader -D
```

提示: 在babel7之后，配置文件由`.babelrc` 变更为了`babel.config.js`,如过想了解更多区别可以看这个[升级你的babel](https://www.cnblogs.com/Molyp/p/13693718.html) 。

由于babel会自动寻找对应的项目跟目录的`babel.config.js`来进行配置，接下来我们新建 并编写以下代码

``` javascript
const envConfig = {
  modules: isTest && 'auto',
};
module.exports = {
	presets: [['@babel/preset-env', envConfig], '@babel/preset-typescript', '@babel/preset-react'], /** 编译预设*/
	plugins: [], /*  插件，暂时先不配置**/
}
```

`plugins` 我们暂时先不配置，等到我们需要时再做处理

### 安装Webpack

``` powershell
yarn add webpack -D
```

#### 配置webpack.config.js 

由于`webpack`也(我为什么要说也)会自动寻找对应的`webpack.config.js `文件，所以我们也需要像上面`babel.config.js`的创建此文件并编辑内容

```javascript
import { resolve } from 'path';
import webpack from 'webpack';
// env
export const isWindows = process.platform === 'win32';
const isDev = process.env.NODE_ENV === 'development';
const isPrd = process.env.NODE_ENV === 'production';
const deployEnv = process.env.DELOY_ENV || 'prd';

// config
const additionHash = isPrd ? '.[hash]' : '';
export const PUBLIC_PATH = `/db/${deployEnv}/`;
export const BUILD_RESOURCE_NAME = 'resources';
export default {
  entry: {
    app: './src/index.tsx',
  }, // 入口
  output: {
    path: resolve(__dirname, 'build'),
    publicPath: PUBLIC_PATH,
    filename: `${BUILD_RESOURCE_NAME}/js/[name]${additionHash}.js`,
	}, // 产出
	module: {
		rules: [
			{
        test: /\.[jt]sx?$/,
        include: resolve(__dirname, 'src'),
        use: ['thread-loader', 'babel-loader?cacheDirectory=true'],
			},
			{
        test: /\.(jpe?g|png|gif|webp)$/,
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `${BUILD_RESOURCE_NAME}/images/[hash].[ext]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)($|\?)/,
        loader: 'url-loader',
        options: {
          limit: 1,
          size: 16,
          hash: 'sha512',
          digest: 'hex',
          name: `${BUILD_RESOURCE_NAME}/fonts/[hash].[ext]`,
        },
      },
		] //  使用模块 ，注意rules的规则是从下到上执行的
	}
}

```

// todo: 添加插件



#### 继续添加Resolve

Webpack 在启动后会从配置的入口模块出发找出所有依赖的模块，Resolve 配置 Webpack 如何寻找模块所对应的文件。 Webpack 内置 JavaScript 模块化语法解析功能，默认会采用模块化标准里约定好的规则去寻找，但你也可以根据自己的需要修改默认的规则。

``` javascript
{
  /** ...前略 */,
  module: {/** ...略*/},  
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'],
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },  
}
```

#### 把打包的生成js文件都丢一起

了解webpack的知道，刚才的配置只是做了一些微小的工作，例如只是将`jsx/tsx`文件翻译成浏览器能看懂的js，但是实际上的js还是没有引入`index.html` 这时候我们的webpack插件就该出马了

``` powershell
yarn add html-webpack-plugin -D
```



#### 把项目运行起来: devServer

所有的 plugin 和 loader 已经加载完了（并不，sass，less与各种其他），为了方便我们开发，还需要 webpack 开发服务器，这样我们就可以实时查看代码修改的效果了。

``` powershell
yarn add  webpack-cli webpack-dev-server -D
```

接下来将devServer配置到webpack.config.ts

``` typescript
{
  /** 前略*/
  plugin: [ /** 略*/],
  devServer: {
    host: 'localhost',
    port: 3000,
    open: true
  }
}
```

为了方便运行，可以将 webpack-dev-server 命令添加到 package.json 中：

``` json
{
  /** 前略*/
  "scripts": {
    "start": "webpack-dev-server",
  },
}
```





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
- [webpack学习笔记--配置resolve](https://www.cnblogs.com/joyco773/p/9049760.html)

# TODO

- ~~devServer 妹写完，ts的配置没有配~~ 由于webpack-dev-server与webpack5不兼容
- 分不清楚webpack到底是在哪个环境的我，是真的傻逼，看着module.export都没看明白
- cssloader没有设置，可以第一次run起来之后再搞s

*  `@types`系列怎么这么多
* resolutions在package.json是什么
* package.json都有什么属性?