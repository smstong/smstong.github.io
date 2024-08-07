**OpenLDAP FAQ**

# What is the origin of the name "slapd"?
The name "sldapd" is extracted from (S)tandalone (L)D(AP) (d)aemon.
The word "standalone" means it's meant to run by itself, instead of being invoked by inetd service.

# How to run slapd in foreground?
Normally slapd forks and disassociates itself from the invoking tty.
If "-d" is given, even with a zero argument, slapd will not fork and disassociate from the invoking tty.

# What's slapd-config?
OpenLDAP 2.3 and later versions have transistioned to using LDIF database to save their configurations.

As slapd-config can be changed when slapd is running, it's also called **online config**.

This is a special database backend, e.g.
```
 # set a rootpw for the config database so we can bind.
 # deny access to everyone else.
 dn: olcDatabase=config,cn=config
 objectClass: olcDatabaseConfig
 olcDatabase: config
 olcRootPW: {SSHA}XKYnrjvGT3wZFQrDD5040US592LxsdLy
 olcAccess: to * by * none
```

This "config" db is special:

- it has hardcoded suffix of "cn=config"
- it has default RootDN as "cn=config"
- it's saved as LDIF files under the folder configured by -F when running slapd

# How to generate slapd-config directory slapd.d?
There two ways to do so.

- From slapd.ldif 
```
slapadd -n 0 -l /usr/local/etc/openldap/slapd.ldif -F /usr/local/etc/slapd.d 
```

- From slapd.conf
```
slaptest -f /usr/local/etc/openldap/slapd.conf -F /usr/local/etc/slapd.d
```

# What're special DB suffixex?
Some DB suffixes are hardcoded. e.g.
- "cn=config" for config database
- "cn=monitor" for monitor database
- "" for RootDSE

# What happends when both slapd.d and slapd.conf are provided?
slapd.d has higher proirity. More details from manual are listed below.
```
-f slapd-config-file
        Specifies   the   slapd   configuration  file.  The  default  is
        /usr/local/etc/openldap/slapd.conf.

-F slapd-config-directory
        Specifies the slapd  configuration  directory.  The  default  is
        /usr/local/etc/openldap/slapd.d.    If   both   -f  and  -F  are
        specified, the config file will be read and converted to  config
        directory  format  and  written  to the specified directory.  If
        neither option is specified, slapd  will  attempt  to  read  the
        default config directory before trying to use the default config
        file. If a valid config directory exists then the default config
        file  is  ignored.  All  of  the  slap tools that use the config
        options observe this same behavior.
```

# What's the difference between LDIF files and OpenLDAP's ldif backend database?
As far as I know, the biggest difference is OpenLDAP's [ldif backend database](https://www.openldap.org/doc/admin26/backends.html#LDIF) takes advantages of the hierarchy tree
character of file system.

The most apparent you can see is the "dn" attribute's literal value in ldif database is actually RDN.
When "dn" is searched, it's calculated by the ldif backend database engine at runtime.

e.g.

"dn" attribute in ldif database file is "cn=schema"
```
$ cat /usr/local/etc/slapd.d/cn=config/cn=schema.ldif
# dn here is RDN in ldif database's file
dn: cn=schema
objectClass: olcSchemaConfig
cn: schema
```

"dn" attribute calculated at runtime is "cn=schema,cn=config"
```
$ ldapsearch -H ldapi:/// -Y EXTERNAL -b cn=config 'cn=schema'
# The dn attribute is calculated at runtime by the ldif database engine
dn: cn=schema,cn=config
objectClass: olcSchemaConfig
cn: schema
...

```

# Why can NOT the output of "slapcat" be as input to "ldapadd"?
The output of "slapcat" is intended to be used as in put to "slapadd".
The output of "slapcat" cannot generally be used as input to "ldapadd" or other LDAP clients without
first editing the output. The editing would normally include 

* reordering the records into superior first order
* removing no-user-modification operational attributes.

# How to implement "Delete if exists, then add an entry"?
This can be done by "ldapmodify".
e.g.

user01.ldif:
```ldif
dn: cn=user01,dc=example,dc=org
changetype: delete

dn: cn=user01,dc=example,dc=org
changetype: add
cn: user01
objectClass: inetOrgPerson
sn: Smith
```
Then, run
```shell
# -c option let ldapmodify continues to run even if the delete change fails ( the entry doesn't exist yet ).
ldapmodify -c -f user01.ldif
```

# How to implement "add if not present, replace if present an Attribute"?
The "replace" operation just does it.
e.g.
```
dn: cn=config
changetype: modify
replace: olcTLSCACertificateFile
olcTLSCACertificateFile: $LDAP_TLS_CA_FILE
-
replace: olcTLSCertificateFile
olcTLSCertificateFile: $LDAP_TLS_CERT_FILE
-
replace: olcTLSCertificateKeyFile
olcTLSCertificateKeyFile: $LDAP_TLS_KEY_FILE
-
replace: olcTLSVerifyClient
olcTLSVerifyClient: $LDAP_TLS_VERIFY_CLIENTS
```
More details about "replace" can be found in RFC4511.
```
replace: replace all existing values of the modification
           attribute with the new values listed, creating the attribute
           if it did not already exist.  A replace with no value will
           delete the entire attribute if it exists, and it is ignored
           if the attribute does not exist.
```
