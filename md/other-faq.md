# Some faqs for random things
## How does http 1.0 frame TCP stream?

TCP disconnection. In HTTP 1.0, TCP closing is the only way to frame a request message or response message.
That means, for each single http request and response pair, a dedicated brand new TCP connection must be used.

The sending party will close its socket sending when wirting is done, which causes an EOF.

## How does http 1.1 frame TCP stream?

There are two ways.
* Content-Length header
* Chunked

For "Content-Length" header, the recipient has to read all headers first (ending with "\r\n\r\n"), then determines the body length
by the value of header "Content-Length", and reads that many more bytes as the http body. Since TCP disconnection is not necessary 
to frame http message now, it can keep alive and be reused for more http traffic.

For chunked encoding, the http header "Transfer-Encoding: chunked" exists, and it will take prioerity to "Content-Length" header if existing.
The http body then contains special formated frame, e.g.

```
HTTP/1.1 200 OK
Content-Type: text/plain
Transfer-Encoding: chunked

7\r\n
Mozilla\r\n
11\r\n
Developer Network\r\n
0\r\n
\r\n
```
## How does HTTP 2 frame TCP stream?
The biggest difference between http 1 and 2 is multiplexing. In http 1.1, even a TCP connection can be resused by multiple http request/response pairs, but
each pair must be done one by one, like req1 res1 req2 res2 req3 res3.....
One hanging response will delay all http traffic follwing it. e.g.
```
req1, res1 (this will take a long time), req2, res2, ....
```

In http 2, muliple http requests/responses can be on wire together. e.g.
```
req1, req2, req3, res1, res3, res2,
```
Note: res3 comes back earlier than res2. 
Then how to pair the req and res? Unlike http 1.0 1.1 that use pure **text-based** TCP framing,
HTTP 2 has its own **binary** TCP framing proto to tunnel http traffics.

## How does HTTP 3 frame TCP stream?
Hold on! HTTP 3 doesn't use TCP at all!

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

## Why ldapsearch doesn't return memberOf?
"memberOf" is treated as OPERATIONAL attributes, which will NOT be returned by "*" filter. "+" is used to return Operational attributes.
```bash
ldapsearch -o ldif-wrap=no -x -h example.net -p 389 -D "CN=Administrator,CN=Users,DC=example,DC=net" -W "passw" -b "CN=Computers,DC=example,DC=net" "(objectclass=computer)" '*' '+'
```
- -o ldif-wrap=no // Remove default line break of 79 characters
- '+' // to return ONLY operational attributes in ldapsearch
- '*' // to return ONLY non-operational (user) attributes in ldapsearch (default behavior)
- '*' '+' // to return user + operational attributes !

## Can I use key="this is a value" in Java properties file?
```
No.
Both single quotes and double quotes are considered part of the value. So the value here is 

"this is a value"

rather than 

this is a value.

```
## How to use "mailx" to send emails to a relay host?
```bash
mailx -S smtp=my-relay-host -s mySubject -r myFrom recipient
```
