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

# How to fsck a PV of longhorn?

If a PV runs into file system issues, it can cause the Pod which mounted it fail, or it cannot be mounted during pod starting. The pod log shows errors and asks to run "fsck".
To solve this issues, follow steps below.

- From the longhorn UI, locate the node where the PV is mounted.
- Find the pod named "instance-manager-xxxxxx" running on the node above.
- kubectl exec into the pod above, the PV is located as /dev/longhorn/pvc-xxxxxx. Run "fsck /dev/longhorn/pvc-xxxx".
- Restart the pod which mounts the PV

e.g.
```bash
[user@rke]$ kubectl -n longhorn-system exec -it instance-manager-577d8a16bf21658e19e12288c6a17d2f -- bash
instance-manager-577d8a16bf21658e19e12288c6a17d2f:/ # ls /dev/longhorn/pvc-f0ed85cd-d236-4d32-86c4-0a53565740ac
/dev/longhorn/pvc-f0ed85cd-d236-4d32-86c4-0a53565740ac
instance-manager-577d8a16bf21658e19e12288c6a17d2f:/ # fsck /dev/longhorn/pvc-f0ed85cd-d236-4d32-86c4-0a53565740ac
```
