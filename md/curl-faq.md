**CURL FAQ**
# How to cusotmize DNS resolving for a single curl run?
```
curl --resolve google.com:443:192.168.0.100 https://google.com
```
This works like using a customized /etc/hosts file for each run.
It's useful when testing backend web servers behind a L4 load balancer.

e.g.
```
# testing the load balancer
curl https://myserver.com

# testing a backend server
curl --resolve myserver:443:192.168.0.101 https://myserver.com

# testing another backend server
curl --resolve myserver:443:192.168.0.102 https://myserver.com
```