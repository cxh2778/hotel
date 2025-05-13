# 推送到GitHub的操作指南

请按照以下步骤将您的网站推送到GitHub并启用GitHub Pages：

## 1. 在GitHub上创建新仓库

1. 登录您的GitHub账号
2. 点击右上角的"+"图标，选择"New repository"
3. 输入仓库名称（例如：hotel-website）
4. 设置为公开（Public）
5. 不要初始化仓库，保持为空
6. 点击"Create repository"

## 2. 将本地仓库推送到GitHub

在您的终端中执行以下命令（请替换 `YOUR_USERNAME` 和 `YOUR_REPO` 为您的GitHub用户名和仓库名）：

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# 将main分支推送到GitHub
git push -u origin main
```

## 3. 启用GitHub Pages

1. 在GitHub上打开您的仓库
2. 点击"Settings"选项卡
3. 向下滚动到"GitHub Pages"部分
4. 在"Source"下拉菜单中，选择"main"分支和"/docs"文件夹
5. 点击"Save"

系统会显示您的网站URL，通常格式为：`https://YOUR_USERNAME.github.io/YOUR_REPO/`

## 4. 访问您的网站

等待几分钟让GitHub生成您的网站，然后访问提供的URL。您也可以通过根目录的index.html自动重定向到网站。 