**k8s FAQ**

# what's the "root" account in k8s? 

Any account in group ```system:masters``` is treated as root. Roles and rolebindings don't affect this group at all.
K8s doesn't store user accounts, the O part in a x509 cert is treated as the user's group. e.g.

Below user's name is "kube-admin" and belongs to group "system:masters".
```
Data:
        Version: 3 (0x2)
        Serial Number: 5888449374278638037 (0x51b7f981efbfd9d5)
        Signature Algorithm: sha256WithRSAEncryption
        Issuer: CN = kube-ca
        Validity
            Not Before: Apr 30 19:39:41 2024 GMT
            Not After : Apr 28 19:45:23 2034 GMT
        Subject: O = system:masters, CN = kube-admin
        Subject Public Key Info:
            Public Key Algorithm: rsaEncryption
                Public-Key: (2048 bit)

```