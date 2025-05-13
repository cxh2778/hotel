#!/bin/bash

# 进入html目录
cd html

# 查找并替换logo路径
find . -type f -name "*.html" -exec sed -i '' 's|src="../images/logo.png"|src="../images/logo.png"|g' {} \;

# 特别修复从../index/引用的路径
find . -type f -name "*.html" -exec sed -i '' 's|src="../index/|src="../|g' {} \;
find . -type f -name "*.html" -exec sed -i '' 's|href="../index/|href="|g' {} \;

echo "Logo路径修复完成！" 