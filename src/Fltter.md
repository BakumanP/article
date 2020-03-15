# 01  使用flutter 开发 

## 介绍 & 前言

 内容免了，如果你是熟手就会在谷歌必应搜狗上面了解到关于flutter的足够多的东西，所以我认为打开文章的你不需要介绍

## 前篇

### 准备工作

0. 首先你需要准备一个梯子，

1. 一个安卓模拟器

   1.1 如果你又**准备使用模拟器**又曾经**装过windows版的docker** 请务必关了  `Hyper－V`  ，还不明白你就你就[点击这个](<https://bbs.yeshen.com/forum.php?mod=viewthread&tid=5573&extra=page%3D1>)

   1.2 如果你关了 `Hyper－V` 还是蓝屏的话，请打开  **Windows Defender —  设备安全性 — 关闭内存完整性** 

2. 如果你使用真机开发，请打开你的手机 -> 设置 -> 点击版本号 -> 开发者模式 

### 获取Flutter SDK

​	 [点击这里](<https://flutter.dev/docs/development/tools/sdk/releases#windows>)跳转到Flutter官网下载SDK，笔者选择了**Stable channel (Windows)** 也就是 稳定版 ,作为初学者也没有必要使用Beta版本 点击最新的稳定版下载就OK了。要提一句的是：下载的Flutter开发环境的是**免安装**的，我将其解压到了 `D:\flutter`下，它最后的地址是`D:\flutter\flutter`。

​	注意，**不要**将flutter安装到需要一些高权限的路径如`C:\Program Files\` 



### 配置环境变量

1. 在环境变量中的`Path`中添加路径`你的路径\flutter\bin`
2. 去用户变量增加`PUB_HOSTED_URL`  地址为`https://pub.flutter-io.cn`
3.  增加变量`FLUTTER_STORAGE_BASE_URL`地址为`https://storage.flutter-io.cn`
4. 2和3 如果你梯子猛











## 参考文章

1. [flutter中文网的安装教程](<https://flutterchina.club/setup-windows/>)
2. 
