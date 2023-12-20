**PostgreSQL FAQ**
# How to connect a remote PostgreSQL server with psql command?
```bash
PGPASSWORD=your-password psql -h your-server-ip -U your-username
```

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
