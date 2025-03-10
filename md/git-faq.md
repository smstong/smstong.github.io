**GIT FAQ**
# How to show the differences between the working area and staged area?
```
git diff
```
# How to show the differences between the stagged area and the last commit?
```
git diff --staged
```

# How to show the differences between that last commit and the second last commit (i.e. the most recent change)?
```
git show
```

# How to cancel a failed/conflict merge?

A failed "conflict" merge changes the files in your working directory.

```bash
git reset --merge

# or

git reset --hard HEAD
```
# How to let git client cache login and password?
```bash
git config --global credential.helper store
```
Then you login/password will be saved at ~/.git-credentials.

# How to not track all subdirs except one?
```
/*
!subFolderToTrack/
```

# What's the difference between "/*" and "*" in .gitignore?
```
/* # ignore all files/folders directly under current dir.
*  # ignore all files/folders directly or undeirectly under current dir.
```
# Why doesn't below .gitignore work?
```
*
!subFolderToTrack/
```
The `*` line ignores everything.
The second line excludes "subFolderToTrack" folder. 
But everything under subFolderToTrack is still ignored by `*`, and git doesn't track empty folder, so ...
