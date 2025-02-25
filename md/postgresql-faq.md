**PostgreSQL FAQ**
# How to create a standby server?
**Step 1** Make a backup from the primary server
```
# -R write replication config into postgresql.auto.conf, automatically create standby.signal file
# -X enable record-based log shipping (streaming) 
# -C create replication slot 
# -S name the replication slot
# -D target dir to save the backup

pg_basebackup -R -X stream -C -S standby_1 -D standby_1
```

**Step 2** Prepare the standby server
```
# copy the backup folder "standby_1" into standby server
# create recovery.signal file into "standby_1"
# start standby server, e.g.
postgres -D standby_1 -k .
```

# How to promte a standby server to primary?
```
# this will delte the file standby_1/standby.signal automatically
pg_ctl -D standby_1 promote
```

# How to list foreign servers/tables..?
```
  \dE[S+] [PATTERN]      list foreign tables
  \des[+] [PATTERN]      list foreign servers
  \det[+] [PATTERN]      list foreign tables
  \deu[+] [PATTERN]      list user mappings
  \dew[+] [PATTERN]      list foreign-data wrappers
```
# How to describe a table?
```
\d+ table_name
```
# How to connect a remote PostgreSQL server with psql command?
```bash
PGPASSWORD=your-password psql -h your-server-ip -U your-username
```

# How to quit from psql?
```bash
\q
```
# What are internal(meta) commands in psql?
psql can run two categories of commands:
* SQL command
* internal commands, also named meta commands, all of them start with backslash \.

# How to list all databases?
```bash
\l
```

# How to connect to / use / make current a database?
```bash
\c your-db-name
```

# How to list all tables?
```bash
\dt
```

# How to show table data in a better way as \G in MySQL?
```bash
\x
select * from your-table-name;
```

# How to know the data directory?
```bash
show data_directory;
```

# What's the difference between single quotes and double quotes?
Single quotes are used to indicate string literals.
double quotes are used to indicate case-sensitive identifiers.
e.g.
```sql
CREATE ROLE "user1" WITH LOGIN PASSWORD 'secretpassword';
```

# How to backup and restore a database?

```bash
# backup on server1
pg_dump -h server1 -U login-name -d db-name > db-name.bk

# transfer db-name.bk to server2
# restore on server2
createdb -h server2 -U login-name db-name
psql -h server2 -U login-name --file db-name.bk
```

# How to list schemas under current database?
```
\dn
```

# How to list tables under non public schema?
By default, psql search tables contained in the default "public" schema.
To list tables in other schemas, e.g. "myschema",
```
\dt myschema.*
```