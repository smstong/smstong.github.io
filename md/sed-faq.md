**SED FAQ**
# What are "pattern space" and "hold space"?
- "Pattern Space" is cleared at the beginning of each sed cycle
- "Hold Space" is NOT cleared at the begging of each sed cycle

# How sed append content to a space?
When appending, sed alwasy inserts a "\n" between the existing content and the content to be appended.
```
dst += "\n" + src 
```

# How to read a whole file into pattern space?

```bash
cat /etc/passwd | sed ':a;$!{N;ba}'
```

# How to join all lines into a single line?
```bash
cat /etc/passwd | sed -ne ':a;$!{N;ba};${s:\n: :g;p}'
```

# How to insert line number at the beginning of each line?
```bash
cat /etc/passwd | sed  '=' | sed 'N;s:\n: :'
```

# How to insert a string at the beginning of each line?
```bash
cat /etc/passwd | sed 's:^:string-to-insert:'
```

# How to append a string to the end of each line?
```bash
cat /etc/passwd | sed 's:$:string-to-append:'
```

# How to print a file last line first?
```bash
cat demo.txt | sed  -ne '1!G; h; $p'
```
