**OpenSSH FAQ**
# How to enable rsa keytype?
```bash
ssh -o PubkeyAcceptedKeyTypes +ssh-rsa username@server
```

# How to check key type?
```bash
ssh-keygen -l -f ~/.ssh/id_rsa
ssh-keygen -l -f ~/.ssh/id_rsa.pub
```
