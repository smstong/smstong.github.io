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
openssl s_client -connect server.example.com:port

```
