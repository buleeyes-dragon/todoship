<p align="center">
  <a href="https://todoship.netlify.app/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/tslogo-22.png">
      <img src="https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/tslogo-22.png" height="128">
    </picture>
    <h1 align="center">Todoship</h1>
  </a>
</p>

> 如果你喜欢这个项目，请在左上角给我一个 Star ！  

## 介绍

Todoship是一个基于 [Next.js](https://nextjs.org/) 和 [MongoDB](https://www.mongodb.com/) 的轻量级任务管理应用，支持多日程和工作流功能，可以帮助你更好地管理你的任务。  

## 安装

访问 [Todoship](https://todoship.netlify.app/) 网站。你可以在线访问Todoship，也可以作为应用安装到你的设备上。  

- Microsoft Edge 浏览器：点击右上角的“...”按钮，选择“应用-将此站点作为应用安装”。（尽管你平时不使用Edge，但是Todoship可作为独立的应用，所以你可以在Edge上安装Todoship。）
![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666796460867.png)
- 其他浏览器。不建议安装，建议固定标签页**在浏览器中使用**。经验证，谷歌浏览器应用模式 cookie 不生效。

## 打开 Todoship

你将看到下面的界面：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221026230614.png)

界面要求输入 MongoDB 数据库的连接地址（URI），因为本网站不提供数据库服务，所以你需要自己搭建数据库。（但是很简单，接着往下看）  

## 注册 MongoDB 数据库

MongoDB 数据库为每个用户提供了 512MB 的免费存储空间，你可以在 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 上注册一个免费的数据库。（用来存储你的任务数据完全足够了）  
Mongo Atlas 提供云数据库服务，这意味着你可以在远程访问你的数据库，而不需要在本地搭建数据库，TodoShip 也是基于这个原理。  

### 账号注册

你首先需要注册一个 MongoDB 账号，点击 [这里](https://www.mongodb.com/cloud/atlas/register) 注册。这可能需要你提供邮箱等个人信息。  

### 创建数据库

登陆后，你将看到下面的界面：  

![1](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027084814.png)  

点击右上角 Create 。  

选择 **shared** 类型的集群，接着选择一家服务提供商，这里是亚马逊，当然，可以试一下微软的 Azure ，说不定国内访问更快。然后选择一个离你最近的地区，比如中国香港，点击 **Create Cluster** 。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027085107.png)  

点击右下角的 **Create Cluster** 。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027085308.png)  

在出现的窗口中，添加连接 IP 地址。我们需要允许从任何地方访问。因此，单击“允许从任何地方访问”按钮，然后单击“添加 IP 地址”进行设置。选择云环境，即Cloud Environment，IP 地址填写为 `0.0.0.0`。  

接下来，我们需要创建一个用户来连接到此数据库。在“创建数据库用户”窗体上，输入自定义用户名、密码，然后单击“创建数据库用户”。请记住这个密码。

### 连接数据库

点击 **Connect**按钮，连接数据库。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832058438.png)  

选择 **Connect your application** ，然后选择 **Node.js** ，接着选择 **4.1 or later** 。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832119979.png)  

接着，出现了一个连接地址，不勾选 "Include full example" 这个地址就是你的数据库连接地址，你需要将它复制下来，稍后会用到。（请一定妥善保存）

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832198649.png)

链接格式如下：  

```md
mongodb+srv://YourName:<password>@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority
```

将其中的 `<password>` 替换为刚刚你输入的自定义密码。这个才是需要用到的代码，请妥善保存。  

举例：  

```md
mongodb+srv://inannan:12345678@cluster0.xxxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 创建数据集

点击集群名 Cluster0 进入集群。点击添加数据库：  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832678590.png)  

填写数据库名为 `todoship` ，数据集为 `post` ，请确保一致。  

创建好后，点击加号创建下一个数据集，取名 `workflow`。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666832908792.png)

至此，数据库就创建完成了。  

## 登入 Todoship

保存你的登入字符串。在 Todoship 登入窗口填写这个字符串。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666833098560.png)  

你就可以登录成功啦！  

## 基本使用

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027091304.png)

在左下角可以设置语言、设置深色模式。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027091511.png)  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027091534.png)  

点击单选框即清除任务，表示任务完成，点击任务可进入详情界面。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027091605.png)

工作流是满足一系列任务需要而产生的，可以创建一个集合下多个任务。  

![3](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027091815.png)

![4](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/20221027091911.png)

## 自己部署（可选）

你也可以尝试自己部署，Fork 本仓库。将 `pages/index.js`中的 `MY_SITE` 字段替换为你部署后的域名即可。  

```js
/**
 * MY_SITE 部署后的网址
 */
const MY_SITE = "https://todoship.netlify.app";
```

## 应急处置

本项目未能全面检验鲁棒性。当出现其他我未考虑到的 Bug 时，请清除浏览器 Cookie，重新登录网站。按键盘 F12-应用程序-Cookie-删除。  

![2](https://jetzihan-img.oss-cn-beijing.aliyuncs.com/blog/1666833965627.png)

## TODO

[ ] 日程和工作流互联  
[ ] 优化刷新逻辑  
[ ] 状态存储  
[ ] 用 electron 部署桌面端，创建离线版  
[ ] 适配移动端  
[ ] 使用 TypeScript 重构  
