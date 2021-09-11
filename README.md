# zbc_votes

## 介绍

投票系统

## 项目目录

- assets：静态资源目录
- components：公共组件目录
- pages：路由页面组件
- request：请求后端接口函数
- router：路由配置
- store：全局状态管理
- utils：工具类
- App.vue：根组建
- main.js：项目入口文件

## 开发模式启动项目

```npm
npm run dev  或者  yarn dev
```

## git 流程

1. git add .
2. git commit -m "feat: xxxxx"
3. git pull (此过程可能存在代码冲突)
4. git push

### git commit 提交规范

commit 的内容，只允许使用下面 7 个标识。

- feat: 新功能
- fix: 修补 bug
- docs: 文档（documentation）
- style: 样式/格式（不影响代码运行的变动）
- refactor: 重构（即不是新增功能，也不是修改 bug 的代码变动）
- test: 增加测试
- chore: 构建过程或辅助工具的变动

## 注意事项

- assets 中的 less 文件夹下的切记不要修改，只能在 variable.less 文件添加一些可复用的变量
- 如果在合并代码时有冲突，在一定要在群里沟通一下
