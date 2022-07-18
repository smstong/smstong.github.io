**OpenSSL FAQ**

# How to generate a self-signed certificate?
```bash
openssl req -x509 -newkey rsa:4096 -sha256 -days 365 \
        -subj '/C=CA/ST=Ontario/O=example/CN=example.com' \
        -keyout example.key -out example.crt
```

# How to list keys/certs in PKCS12 keystore?
```bash
openssl pkcs12 -info -nodes -password pass:pass123 \
        -in example.p12
```

# How to list certs only in a pkcs12 keystore?
```bash
openssl pkcs12 -nodes -nocerts -password pass:pass123 \
        -in example.p12
```

# How to list private keys only in a pkcs12 keystore?
```bash
openssl pkcs12 -nodes -nokeys -password pass:pass123 \
        -in example.p12
```

# How to convert private key to RSA format?
```bash
openssl pkcs12 -nodes -nocerts -password pass:pass123 \
        -in example.p12 | pkcs12 rsa
```

# How to create a pkcs12 keystore from a private key and its certs?
```bash
cat example.key example.crt | \
openssl pkcs12 -export -out example.p12 -password pass:pass123
```

# How to verify if a Private Key matches a Certificate?

```bash
# below two outputs are the same if matching.
openssl x509 -noout -modulus -in mycert.crt | openssl md5
openssl rsa  -noout -modulus -in mykey.key  | openssl md5
```
