**OpenLDAP FAQ**

# What's slapd-config?
OpenLDAP 2.3 and later versions have transistioned to using LDIF database to save their configurations.

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