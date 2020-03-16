<!--
 * @Author: CollapseNav
 * @Date: 2020-02-17 17:22:43
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-16 17:47:01
 * @Description:
 -->

# AYunPan

## 前言

前段时间搞了一下 **angualr** + **dotnet core** ，来了点感觉，所以准备整个简单的网盘项目。
打算是先把目前能做的东西先慢慢做出来，期间继续熟悉 angular 和 dotnet core ，这两个东西对我来说还算是新的东西了。

项目的UI部分是拿 [Creative Tim](https://www.creative-tim.com/) 上面的 [Paper Dashboard](https://www.creative-tim.com/product/paper-dashboard-angular) 改的

## 现有的和未来可能会有的东西

### 正在做的

- [ ] 文件上传
  - 上传部分现在还没保存文件，仅用于向数据库里插数据
- [ ] 分享文件

### 功能

- [X] 简单登陆注册
  - 真.简单的登陆注册，后续可能会加验证什么的
- [X] 登陆注册的翻转效果
  - 我还是挺喜欢翻转效果的
- [X] token的发放
  - 暂时还真.就是发放，具体使用我之前的[demo](https://github.com/CollapseNav/Angular-DotnetCore-Demo)写过一点
- [X] Update用户数据
  - 说实话对于account能不能改我还在纠结
- [X] 文件目录获取
  - 直接把文件的目录结构读出来了
  - 主要是为了方便后续的使用
- [ ] 修改头像
- [ ] 删除文件
- [ ] 文件分类
- [ ] 文件搜索
- [ ] 文件排序
- [ ] 文件下载

## Init

前端在 `WebUi` 里，进入之后 `npm install` 或者 `yarn` 都行

dotnet 的 startup 在 `Api` 中，进入之后 `dotnet restore` `dotnet build` 即可

全用默认的端口 `4200` `5000`

## 还在做……

还在做……
