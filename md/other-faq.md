# Some faqs for random things

## Web Auth passing

* CGI        Meta-Variables ( e.g. Environment variables) AUTH_TYPE, REMOTE_USER
* AJP        {attributes: ?auth_type ?remote_user }
* FastCGI    {FCGI_PARAMS,          1, "REMOTE_USER...AUTH_TYPE..."}

## TLS connection trouble shooting steps

```bash
# make sure DNS resolution works
nslookup server.example.com

# IP layer connection test
ping server.example.com

# TCP layer connection test, common issues include 3-layer firewall rules
curl -v telnet://server.example.com:port
# or
netcat -v serer.example.com port

# TLS layer connection test, common issues include CA root certs are not installed on client side.
openssl s_client -showcerts -connect server.example.com:port

```

## how to run ldap client with specific trust anchors?
```
LDAPTLS_CACERT=/path/to/your/ca/file.crt ldapsearch -H ldaps://server.com ...
```

## Can I use key="this is a value" in Java properties file?
```
No.
Both single quotes and double quotes are considered part of the value. So the value here is 

"this is a value"

rather than 

this is a value.

```
