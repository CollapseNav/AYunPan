<!--
 * @Author: CollapseNav
 * @Date: 2020-02-17 17:22:43
 * @LastEditors: CollapseNav
 * @LastEditTime: 2020-03-21 18:26:41
 * @Description:
 -->

# AYunPan

## 前言

前段时间搞了一下 **angualr** + **dotnet core** ，来了点感觉，所以准备整个简单的网盘项目。
打算是先把目前能做的东西先慢慢做出来，期间继续熟悉 angular 和 dotnet core ，这两个东西对我来说还算是新的东西了。

项目的UI部分是拿 [Creative Tim](https://www.creative-tim.com/) 上面的 [Paper Dashboard](https://www.creative-tim.com/product/paper-dashboard-angular) 改的

## 现有的和未来可能会有的东西

### 正在做的

- [ ] 公共分享部分
- [ ] 分享文件(文件夹))
  - ~~还没做取消分享~~X
- [ ] 删除文件(伪)(文件夹)
  - 真的删除需要做到trash里面

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
- [X] 分享文件(单)
  - ~~还没做取消分享~~
- [X] 删除文件(伪)(单)
  - 真的删除需要做到trash里面
- [X] 文件上传(单)
- [X] 文件下载(单)
- [X] 文件搜索
  - 由于一开始就读取了所有的文件信息，所以这部分不需要请求服务器
- [ ] 修改头像
- [ ] 文件分类
  - 由于一开始就读取了所有的文件信息，所以这部分不需要请求服务器
- [ ] 文件排序
  - 由于一开始就读取了所有的文件信息，所以这部分不需要请求服务器
- [ ] 用户输入验证
- [ ] 优化后端的实现
- [ ] 优化前端的实现

## Init

前端在 `WebUi` 里，进入之后 `npm install` 或者 `yarn` 都行

dotnet 的 startup 在 `Api` 中，进入之后 `dotnet restore` `dotnet build` 即可

全用默认的端口 `4200` `5000`

## 还在做……

还在做……
