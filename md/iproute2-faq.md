**iproute2**

# What're routing rules and tables?
Rules are used to find tables where routes are saved.
e.g.
```bash
ip rule list
ip route list [ table main ]         # if not table specified, the default target is "main" table.
ip route list table routing_table1
```

# What's the default routing table?
If no table name is specified in ip command, the default routing table is "main".

*Note*: There is also a routing table named "default", but it's NOT the default table.

# How to print the route to a specific destination?
```bash
ip route get 1.1.1.1                    # get route to 1.1.1.1 
ip route get 1.1.1.1 from 192.168.0.1   # get route to 1.1.1.1 from specific local IP
```
