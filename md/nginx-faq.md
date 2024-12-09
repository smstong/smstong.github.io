**Nginx FAQ**
# What's the cert order in file specified by ssl_certificate?
The server certificate must appear before the chained certificates in the combined file.
```
server cert
intermediate cert
root cert
```

# Does nginx.conf interpolate environment variables?
No.

However, the [official docker image of nginx](https://hub.docker.com/_/nginx) interpolate environment variables before nginx starts.

# Why doesn't nginx.conf have a "location" directive in "main" context?
nginx configuration has several different contexts for main, http, server, upstream, location (and also mail for mail proxy) blocks of directives. 
Contexts **never overlap**. For instance, there is no such thing as putting a location block in the main block of directives. 
Also, to avoid unnecessary ambiguity there isn't anything like a "global web server" configuration. 
nginx configuration is meant to be clean and logical, allowing users to maintain complicated configuration files that comprise thousands of directives. 
In a private conversation, Sysoev said, "Locations, directories, and other blocks in the global server configuration are the features I never liked in Apache, so this is the reason why they were never implemented in nginx."