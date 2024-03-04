**PYTHON FAQ**
# What is the status of Python's "cgi" module as of 2024?
Python's cgi module is deprecated since version 3.11, will be removed in version 3.13.

As a comprison, Perl's cgi module was removed since version v5.22 in 2015.

wsgi is the main replacement of CGI.

# What's line sperator in CGI?

It's "\n".

While the HTTP protocol has "\r\n", the CGI asks for "\n". Web server automatcially convert CGI's "\n" to HTTP's "\r\n". 

Even most web servers accept both "\n" and "\r\n", the offcial is "\n" for CGI.

# How CGI to return a binary file (e.g. images)?

```python
import sys

print("Content-Type: image/png", end="\n\n")

# headers must be written out before body
sys.stdout.flush()

# sys.stdout is TextIO, while sys.stdout.buffer is BinaryIO
with open("my.png", "rb") as f:
    sys.stdout.buffer.write(f.read())
```

# How to create an array a[3][4]?
```python
a = [[0 for _ in range(4)] for _ in range(3)]
```

# What's the most portable GUI module for Python?
```python
import tkinter as tk
root = tk.Tk()
tk.mainloop()
```
