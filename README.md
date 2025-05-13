# 酒店网页项目

这是一个酒店预订网页项目，文件结构已经整理如下：

## 文件夹结构

- `docs/` - 主要网站文件夹
  - `index.html` - 首页
  - `chengdu.html` - 成都页面
  - `登录页面.html` - 用户登录页面
  - `注册页面.html` - 用户注册页面
  - `验证.html` - 验证页面
  - `验证码.html` - 验证码页面
  - `css/` - 存放所有CSS样式表
    - `styles.css` - 主样式表
  - `js/` - 存放所有JavaScript文件
    - `main.js` - 主JavaScript文件
  - `images/` - 存放所有图片资源

## 使用说明

1. 打开 `docs/index.html` 可以访问网站首页
2. 所有页面通过链接相互关联

## GitHub Pages部署

本项目已配置为可直接部署到GitHub Pages：

1. 根目录的index.html自动重定向到docs目录下的网站
2. 所有网站文件存放在docs目录中，便于GitHub Pages直接使用

### 部署步骤

1. 在GitHub上创建新仓库
2. 将本项目推送到该仓库
3. 在仓库设置中启用GitHub Pages，配置为使用docs目录
4. 网站将自动部署并可通过GitHub Pages URL访问 