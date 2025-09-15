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

# How to clone and restore a database from clone?
Database clone can only happen on the same postgres instance, and when ther are no active db connections.
```bash
# stop all database connections

# clone
createdb -T my_db_name my_db_name-20250925

# drop db
dropdb my_db_name

# restore from clone
createdb -T my_db_name-20250925 my_db_name

```
# How to logical backup and restore a database?
Logical backup exports current database as sql statements applied to **template0**.
The custom format (-Fc) backup file is way smaller than plain text file while taking a little more processing time.

```bash
# run as "postgres" account
su - postgres

# backup 
pg_dump -d my_db_name -Fc -f my_db_name.2025-09-15.bk

# delete db
dropdb my_db_name

# create db from template0 
createdb -T template0 my_db_name

# restore
pg_restore -d my_db_name mb_db_name.2025-09-15.bk
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