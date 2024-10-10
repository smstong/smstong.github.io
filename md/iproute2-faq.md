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
# An example of policy routing for a Linux machine with two networks connected
The Linux machine has two network cards,

* 182.150.151.109/24 ( gateway 182.150.151.1 )
* 182.150.183.109/25 ( gateway 182.150.183.1 )

Based on the source IP, different routing table is selected.
```
# ip rule
0:      from all lookup local
32764:  from 182.150.151.109 lookup management
32765:  from 182.150.183.109 lookup apps
32766:  from all lookup main
32767:  from all lookup default
```

Table "apps" is used for packets with source IP 182.150.183.109.
```
# ip route list table apps
default via 182.150.183.1 dev ens160
182.150.183.0/25 dev ens160 scope link
```

Table "management" is used for packets with source IP 182.150.151.109.
```
# ip route list table apps
default via 182.150.151.1 dev ens160
182.150.151.0/24 dev ens160 scope link
```