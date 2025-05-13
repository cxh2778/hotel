#!/bin/bash

# 定义文件夹路径
HTML_DIR="html"
CSS_DIR="css"
JS_DIR="js"
IMAGES_DIR="images"

echo "==== 检查HTML文件中的路径引用 ===="

# 检查CSS引用
echo "检查CSS引用..."
grep -r "href=\"css/" $HTML_DIR || echo "没有找到不正确的CSS路径引用"

# 检查JS引用
echo "检查JS引用..."
grep -r "src=\"js/" $HTML_DIR || echo "没有找到不正确的JS路径引用"

# 检查图片引用
echo "检查images引用..."
grep -r "src=\"images/" $HTML_DIR || echo "没有找到不正确的images路径引用"

# 检查特定的路径问题
echo "检查特定路径问题..."
grep -r "../index/" $HTML_DIR || echo "没有找到../index/引用"

echo "==== 检查完成 ====" 