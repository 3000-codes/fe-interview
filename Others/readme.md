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
