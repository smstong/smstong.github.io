**GIT FAQ**

# how to cancel a failed/conflict merge?

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
