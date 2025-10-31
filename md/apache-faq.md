**Apache FAQ**

# What's the cert order of SSLCertificateFile?
The cert file may also include intermediate CA certificates, sorted from **leaf** to **root**.
```
server cert
intermediate cert
root cert
```

# How environment variables are used in httpd.conf?

There are TWO types of environment variables in httpd.conf,
- shell environment variables (process env variables)
- internal variables defined and used only for httpd

[Environment Variables in Apache](https://httpd.apache.org/docs/2.4/env.html) has more details.

Shell env variables can be used in http.conf as ```${VAR_NAME}```.

**CAUTION**: The curly braces cannot be ignored, ```$VAR_NAME``` does NOT work.
e.g. 

In httpd.conf
```
...
Listen ${PORT}
...

```

Run httpd with below command, httpd will listen on port 81 in the container.
```
 docker run --rm -e PORT=81 -e SERVER_NAME=grouper.com httpd

```

# Difference between shell env variables and apache internal env variables?

Shell env variables are used to pass arguments from shell to apache.

Apache internal env variables are used to pass data from httpd to CGI scripts.
e.g.
httpd.conf
```
SetEnv APP_ENV production
```

php script
```
echo $_SERVER['APP_ENV']
```

# What's PassEnv?

```
PassEnv MY_VAR
```

is a simpler form of

```
SetEnv MY_VAR ${MY_VAR}
```

# How to let mod_proxy_http reserve the original http header "Host"?
```
ProxyPreserveHost On
```
Belive or not, by defaut Apache http reverse proxy does NOT reserve the original http header "Host".
The reason is by default this mod sends "X-Forwarded-Host" header to the backend to inform the original http header "Host".
Unfortunately, not all backend servers honor "X-Forwarded-Host". For example, Tomcat just ignores it by default.
To let Tomcat work with it, you have to configure RemoteIpValve.