---
title: GIT常用命令
abbrlink: 31cb03e9
date: 2019-01-11 14:57:44
tags:
    - Tools
categories:
    - Tools
    - Git
---

## 项目操作

```bash
git init # 初始化git项目
git add . # 将所有改动暂存
git commit -m "init project" # 将改动提交到本地仓库
git remote add origin <remote repository URL> # 绑定远程仓库地址
git remote -v # 验证远程仓库 url 有效性
git push -u origin master # 推送本地修改到远程仓库
```

## 分支操作

```bash
git branch #分支清单
git branch -v #查看各个分支最后一个提交对象的信息
git branch --merged #查看哪些分支已被并入当前分支（译注：也就是说哪些分支是当前分支的直接上游。）
git branch --no-merged #查看尚未合并的工作
git push origin --delete <branchName> # 删除远程分支
git branch -d <branch_name> #删除指定分支
git branch -D <branch_name> #强行删除指定分支
git fetch -p # 删除掉没有与远程分支对应的本地分支
git checkout -b newBrach origin/master # 在origin/master的基础上，创建一个新分支
git checkout . #放弃当前本地所有更改并回退到上一次pull时的状态
```

## 标签操作

```bash
git tag #列出当前tag
git tag -l 'v0.1.*'  #特定的搜索模式列出符合条件的标签
git tag v0.1.2-light #创建轻量标签
git tag -a v0.1.2 -m “0.1.2版本” #创建附注标签
git tag -d v0.1.2 # 删除指定tag
git push origin v0.1.2 # 发布指定tag
git push origin —tags  # 发布所有tag
git push origin --delete tag <tagname> # 删除远程tag
git ls-remote --tags # 查看远程tag
git checkout [tagname|branchname] # 切换tag或分支
git show v0.1.2 # 查看标签的版本信息

```

## 子项目

使用 subtree 模式可以很方便地将一个子项目绑定到当前项目中，并且能够实现同步。目前笔者在 hexo 博客中使用该方式进行主题管理。需要如下几个步骤：

1. fork 某个项目
2. 绑定子项目：

```bash
git remote add -f cactus git@github.com:HalZhan/hexo-theme-cactus.git
git subtree add --prefix=themes/cactus cactus master --squash
```

3. 更新子项目：

```bash
git fetch cactus master
git subtree pull --prefix=themes/cactus cactus master --squash
```

4. 推送子项目的修改到远程仓库：

```bash
git subtree push --prefix=themes/cactus cactus master
```

5. 提交本地的修改到远程仓库，以后的推送会同时将子项目的改动推送到对应的远程仓库中：

```bash
git add .
git commit -m "cactus theme"
git push
```