**OpenSSH FAQ**
# Client side
## How to enable rsa keytype?
```bash
ssh -o PubkeyAcceptedKeyTypes=+ssh-rsa username@server
```

## How to check key type?
```bash
ssh-keygen -l -f ~/.ssh/id_rsa
ssh-keygen -l -f ~/.ssh/id_rsa.pub
```

# Server side
## How to customize before login and after login message?

/etc/ssh/sshd_config
```
Banner /etc/issue   # send /etc/issue to remote user before login, default is "None".
PrintMotd yes       # print /etc/motd after a user logs in interactively, default is "yes"
```