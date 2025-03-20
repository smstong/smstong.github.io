**nmcli FAQ**
# How to create routing tables and routing rules?
Example: A computer with a single network card "ens160" which is configured with 2 IP addresses 100.76.68.11 and 100.76.68.21.

The "main" table's default gateway is 100.76.68.2, but when the source IP is 100.76.68.21, the gateway becomes 100.76.68.1.

```
nmcli connection modify ens160 \
    ipv4.addresses "100.76.68.11/24 100.76.68.21/24" \
    ipv4.gateway 100.76.68.2 \
    ipv4.routes "0.0.0.0/0 100.76.68.1 table=5000" \
    ipv4.routing-rules "priority 5 from 100.76.68.21 table 5000"
```
*Note*: NetworkManager automatically creates routing table (in this example, 50000) when this profile is activated.