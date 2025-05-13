#!/bin/bash

# 修复HTML文件中的特定路径问题
cd html

# 修复logo路径
find . -type f -name "*.html" -exec sed -i '' 's|src="../images/logo.png"|src="../images/logo.png"|g' {} \;

# 修复内部html链接路径
find . -type f -name "*.html" -exec sed -i '' 's|href="注册页面.html"|href="注册页面.html"|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="登录页面.html"|href="登录页面.html"|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="验证.html"|href="验证.html"|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="验证码.html"|href="验证码.html"|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="chengdu.html"|href="chengdu.html"|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="index.html"|href="index.html"|g' {} \;

# 如果有任何js文件引用，确保路径正确
find . -type f -name "*.html" -exec sed -i '' 's|src="js/|src="../js/|g' {} \;

# 确保所有css引用路径正确
find . -type f -name "*.html" -exec sed -i '' 's|href="css/|href="../css/|g' {} \;

echo "特定路径修复完成！" 