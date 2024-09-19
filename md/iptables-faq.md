**iptables**
# What does "table" in "iptables" mean?
A table is a set of rules that work together to reach a goal.
Tables are orgnized by *area of concern*.

For example, "nat" table focuses on NAT implementation. 

# What's a CHAIN?
A chain of rules. 
The 5 builtin chains are corresponding to netfilter's 5 hook points.

To reach its goal, a table sets up some netfilter hooks (CHAINS). Based on the goal, maybe only part of the hook points are used by a certain table. 

Different tables may share same hook points. E.g. Both "filter" and "nat" tables put rules into INPUT chain.

# What's the relation between iptables and netfilter?
Netfilter is a kernel network module providing HOOKS.
Iptables has two parts, the kernel part fills in netfilter's hooks, while the userspace part (the iptables command) tells the kernel part what to do.

# What's the "Filter" table?
The **filter** table is used decide wheter to let a packet continue to its intended destination or to deny its request.
When people think of firewalls, this table provides most functionalities.

# What's the "NAT" table?
The **NAT** table is used to modify packets' source or destination in order to change their routing.

# What's the "Mangle" table?
THe **Mangle** table isused to alter the IP headers. E.g. TTL of a packet can be changed by this table.

# What's the "Raw" table?
The **raw** table has a very narrowly defined function. Its only purpose is to provide a mechanism for marking packets in order to opt-out of connection tracking.

# What's the "Security" table?
This table is used to set internal SELinux security context marks on packets.

# Differences between builtin CHAINS and user defined CHAINS?
Builtin chains are tied to netfilter's hooks, while user defined chains don't.

Builtin chains are executed by netfilter's hooks, while user defined chains must be "jumped" into from a rule.

# What's conntrack?
Connection tracking is applied very soon after packets enter the negtworking stack. The **raw** table chains are the only logic that is performed on packets prior to associating a packet with a connection.

A packet can be in different "state" in the context of conntrack.
- **NEW**: When a packet arrives that is not associated with an existing connection, and is valid as a first packet, a new connection will be added to the system with this label.

- **ESTABLISHED**: A connection is changed from NEW to ESTABLISHED when it receives a valid response packet in the opposite directions.

- **RELATED**: Packets that are not part of an existing connection, but are associated with a connection.

- **INVALID**: Packets are not assiociated with existing connections and are not valid as first packet.

- **UNTRACKED**: Packets marked "UNTRACKED" by the RAW table.

- **SNAT**: When the source address has been altered by NAT table.

- **DNAT**: When the destination address has been altered by NAT rules.

# Common rules