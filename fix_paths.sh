#!/bin/bash

# 进入html目录
cd html

# 修复HTML文件中的CSS路径
find . -type f -name "*.html" -exec sed -i '' 's|href="css/|href="../css/|g' {} \;

# 修复HTML文件中的JS路径
find . -type f -name "*.html" -exec sed -i '' 's|src="js/|src="../js/|g' {} \;

# 修复HTML文件中的图片路径
find . -type f -name "*.html" -exec sed -i '' 's|src="images/|src="../images/|g' {} \;

# 修复指向其他HTML文件的链接
find . -type f -name "*.html" -exec sed -i '' 's|href="../index/|href="|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="index.html|href="index.html|g' {} \;

# 修复特定的路径问题
find . -type f -name "*.html" -exec sed -i '' 's|src="../images/logo.png|src="../images/logo.png|g' {} \;

echo "路径修复完成！" 