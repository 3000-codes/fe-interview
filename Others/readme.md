# Git

```bash

# 日常使用

## 拉取和推送

git pull # 拉取
git add . # 添加所有文件
git commit -m "提交信息" # 提交
git push # 推送

## 新增与合并分支

git checkout -b dev # 新建并切换到dev分支
git checkout dev # 切换到dev分支
git merge dev # 合并dev分支到当前分支
git branch -d dev # 删除dev分支

## rebase合并分支

git checkout dev # 切换到dev分支
git rebase master # 将dev分支合并到master分支
git checkout master # 切换到master分支
```

### rebase与merge合并分支的区别

`git merge` 将两个分支的更改合并到一起，创建一个新的提交对象，这个提交有两个父提交，分别是被合并的两个分支的最新提交。这种方式的优点是它保留了完整的提交历史和分支结构，但缺点是可能会导致提交历史复杂且难以理解

`git rebase` 的工作方式是将一系列提交“复制”到新的基础上，它会改变提交历史。在执行 `git rebase` 时，你在当前分支上的每个提交都会生成一个新的提交，并添加到目标分支的末尾。这种方式的优点是可以创建一个线性的提交历史，使得历史更加清晰，但缺点是它改变了提交历史，可能会导致理解困难。

```bash
# rebase合并分支
git checkout dev # 切换到dev分支
git rebase master # 将dev分支合并到master分支
git checkout master # 切换到master分支

# merge合并分支
git checkout master # 切换到master分支
git merge dev # 将dev分支合并到master分支
```

### 回滚提交

**使用git reset**：这是最直接的方式。你可以使用git reset --hard <commit_hash>来完全回滚到某个提交。这将丢弃所有后续的提交。如果你想保留更改，但取消提交，你可以使用git reset --soft <commit_hash>。

```bash
git reset --hard <commit_hash>
```

**使用git revert**：这个命令会创建一个新的提交，这个提交的更改与你想要回滚的提交的更改相反。这样，你的提交历史将保持不变，但你的代码将回滚到之前的状态。

```bash
git revert <commit_hash>
```

**使用git reflog和git reset**：如果你不小心使用git reset丢弃了一些提交，你可以使用git reflog来找到这些提交的哈希，然后再使用git reset来恢复它们。

```bash
git reflog
git reset --hard <commit_hash>
```

# 浏览器

### 浏览器的渲染过程

1. 浏览器获取到html代码，然后开始解析html代码构建DOM树
2. 解析过程中遇到css代码，开始构建CSSOM树
3. DOM树和CSSOM树构建完成后开始生成渲染树
4. 开始布局，计算每个节点的位置大小信息
5. 将渲染树绘制到屏幕上
6. 若解析过程中遇到script标签或link标签，则暂停解析html代码（阻塞），先执行js/css代码，js/css代码执行完毕后继续解析html代码

PS：为什么要将css代码放在head标签中，js代码放在body标签中？
* css代码放在head标签中，可以在页面渲染之前就加载css代码，这样可以避免页面渲染完成后再加载css代码导致页面闪烁的问题
* js代码放在body标签中，可以在页面渲染完成后再加载js代码，这样可以避免js代码阻塞页面渲染的问题

### 重排（回流, reflow）与重绘(repaint)

* 重排：当页面中的元素发生了尺寸、位置、内容等变化时，浏览器需要重新计算元素的几何属性（位置、大小等），然后再将元素绘制到屏幕上，这个过程称为重排（回流）
* 重绘：当页面中的元素发生了颜色、背景等变化时，浏览器只需要将元素绘制到屏幕上，这个过程称为重绘
* 重排一定会引起重绘，重绘不一定会引起重排
* 重排的代价比重绘的代价要高，因为重排需要重新计算元素的几何属性，而重绘只需要将元素绘制到屏幕上
* 导致重排的原因：
  + 页面首次渲染
  + 浏览器窗口大小发生改变
  + 元素尺寸、位置、内容发生改变
  + 元素字体大小、样式发生改变
  + 添加或删除可见的DOM元素
  + 激活CSS伪类（如:hover）
  + 查询某些属性或调用某些方法
    - clientWidth、clientHeight、clientTop、clientLeft
    - offsetWidth、offsetHeight、offsetTop、offsetLeft
    - scrollWidth、scrollHeight、scrollTop、scrollLeft
    - scrollIntoView()、scrollIntoViewIfNeeded()
    - getComputedStyle()
    - getBoundingClientRect()
    - scrollTo()
* 导致重绘的原因：
  + 元素的颜色、背景发生改变
  + 元素的可见性发生改变（visibility:hidden）
  + 元素的背景图片发生改变
  + 元素的轮廓发生改变（outline）
  + 元素的阴影发生改变（box-shadow）
  + 元素的透明度发生改变（opacity）
  + 元素的变换发生改变（transform）
  + 元素的过渡发生改变（transition）
  + 元素的动画发生改变（animation）
