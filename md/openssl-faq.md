**OpenSSL FAQ**

# How to get hash and keyed hash?
```bash
echo -n "hello" | openssl md5
echo -n "hello" | openssl md5 -hmac "key"
```

# How to view multiple certs in a bundle pem file?
```bash
openssl storeutl -noout -text -certs bundle.crt
```
# How to generate a private key?
```bash
openssl genrsa -out example.key 2048
```
# How to generate a CSR based on existing private key?
```bash
openssl req -key example.key -new -out example.csr
```

# How to generate a new cert by signing a csr?
```bash
openssl x509 -signkey example.key -in example.csr -req -days 3650 -out example.crt
```

# How to generate a new private key and self-signed certificate together?
```bash
openssl req -x509 -newkey rsa:4096 -nodes -sha256 -days 365 \
        -subj '/C=CA/ST=Ontario/O=example/CN=example.com' \
        -keyout example.key -out example.crt
```

# Is CSR's "req_extensions" copied into the generated Certificate's "x509_extensions"?
No by default. It means openssl does NOT honor the extensions in CSR by default.
To let openssl generate a certificate with extensions in the CSR file, below arg must be set.
```bash
-copy_extensions all
```

# How to generate a self-signed certificate (No CSR needed) with IP address as SAN?
Create a conf file named req.conf as below.
```
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = CA
ST = ON
L = Toronto
O = LinuxExam
OU = Office
CN = web1

[v3_req]
subjectAltName = @alt_names

[alt_names]
IP.0 = 192.168.0.101
IP.1 = 1.2.3.4
DNS.0 = app1.linuxexam.net
DNS.1 = app2.linuxexam.net

```
Note: the default section to use is "req". so ```-section req`` is optional.

```bash
openssl req -x509 -newkey rsa:4096 -nodes -sha256 \
        -days 365 \
        -config req.conf 'v3_req' -section req \
        -keyout server.key -out server.crt
```
# How to generate a CSR file with SAN?
Create a conf file named req.conf as below.
```
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req
prompt = no

[req_distinguished_name]
C = CA
ST = ON
L = Toronto
O = LinuxExam
OU = Office
CN = web1

[v3_req]
subjectAltName = @alt_names

[alt_names]
IP.0 = 192.168.0.101
IP.1 = 1.2.3.4
DNS.0 = app1.linuxexam.net
DNS.1 = app2.linuxexam.net

```
Note: the default section to use is "req". so ```-section req`` is optional.
```bash
openssl req  -newkey rsa:4096 -nodes -sha256 \
        -config req.conf -section req \
        -keyout server.key -out server.csr
```

# How to generate a CSR (certificate Signing Request) and a password-less key at the same time?
```bash
openssl req -nodes -newkey rsa:2048 \ 
        -subj '/C=CA/ST=Ontario/O=example/CN=example.com' \
        -keyout example.key -out example.csr
```

# How to list keys/certs in PKCS12 keystore?
```bash
openssl pkcs12 -info -nodes -password pass:pass123 \
        -in example.p12
```

# How to list certs only in a pkcs12 keystore?
```bash
openssl pkcs12 -nodes -nokeys -password pass:pass123 \
        -in example.p12
```

# How to list private keys only in a pkcs12 keystore?
```bash
openssl pkcs12 -nodes -nocerts -password pass:pass123 \
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

# How to create a pkcs12 keystore from a private key, cert and cert chain?
The cert chain must be in order that the cert comes first and root CA comes last.
```bash
cat example.key example.crt intermediateCA.crt RootCA.crt | \
openssl pkcs12 -export -out example.p12 -password pass:pass123
```

# How to verify if a Private Key matches a Certificate?

```bash
# below two outputs are the same if matching.
openssl x509 -noout -modulus -in mycert.crt | openssl md5
openssl rsa  -noout -modulus -in mykey.key  | openssl md5
```

# How to check the SSL/TLS cert of a website?
```bash
echo q | openssl s_client -connect google.ca:443 | sed -ne '/BEGIN/,/END/p' | openssl x509 -noout -text | less
```
