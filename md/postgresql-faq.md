**PostgreSQL FAQ**
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
