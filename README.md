<!--
 * @Author: CollapseNav
 * @Date: 2020-02-17 17:22:43
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-05-12 12:42:44
 * @Description:
 -->

# AYunPan

## 前言

前段时间搞了一下 **angualr** + **dotnet core** ，来了点感觉，所以准备整个简单的网盘项目。
打算是先把目前能做的东西先慢慢做出来，期间继续熟悉 angular 和 dotnet core ，这两个东西对我来说还算是新的东西了。

项目的UI部分是拿 [Creative Tim](https://www.creative-tim.com/) 上面的 [Paper Dashboard](https://www.creative-tim.com/product/paper-dashboard-angular) 改的

## 现有的和未来可能会有的东西

### 正在做的

写注释

### 功能

- [X] 简单登陆注册
  - [X] 真.简单登陆注册
  - [X] 登陆注册的翻转效果
  - [X] token的发放
  - [X] 使用token验证
- [X] swagger
- [X] Update用户数据
  - [ ] 同时 updata 一些文件相关的数据
- [X] 文件目录获取
  - 直接把文件的目录结构读出来了
  - 主要是为了方便后续的使用
  - 一些操作直接放到前端运行
- [X] 分享文件
  - [X] 单文件分享
  - [X] 文件夹分享
- [X] 删除文件
  - [X] "假" 删除
  - [X] "真" 删除
- [X] 文件上传
  - [X] 单文件上传
  - [X] 多文件上传
  - [ ] 文件夹上传
  - [ ] 上传后修改容量
- [X] 文件下载
  - [X] 单文件下载
  - [ ] 多文件下载
  - [ ] 文件夹下载(感觉有点多余啊，实际上还是个多文件下载)
- [X] 文件搜索
  - [X] 用户当前目录下搜索
- [X] 用户数据展示
  - [X] 基本数据展示
  - [ ] 数据以chart形式展示
- [X] 公共分享部分
  - [X] 能用的分页
  - [X] "添加到我的文件" 功能
  - [ ] 自定义分页显示
  - [ ] 干掉 "Last" 按钮
- [ ] 用户输入验证
  - [ ] 登陆注册的验证
  - [ ] edit 的验证
  - [ ] 同名文件夹的验证
  - [ ] ......
- [ ] 将 table 部分做成一个模块
- [ ] 修改头像
- [ ] 文件分类
  - [ ] 多选分类
- [ ] 文件排序
  - [ ] 根据文件类型排序
  - [ ] 根据添加时间排序(这个大概是默认的排序方式)
- [ ] 优化后端的实现
  - [X] 任重而道远......
- [ ] 优化前端的实现
  - [X] 做点 component 还有 directive

## Init

前端在 `WebUi` 里，进入之后 `npm install` 或者 `yarn` 都行

dotnet 的 startup 在 `Api` 中，进入之后 `dotnet restore` `dotnet build` 即可

全用默认的端口 `4200` `5000`

## 还在做……

还在做……
