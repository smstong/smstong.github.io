**Apache FAQ**

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
