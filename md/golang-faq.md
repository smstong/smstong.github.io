**GOLANG FAQ**

# What's a module?
As long as a folder containing a file named "go.mod", it's treated as a module.

# Can a module name be different to its container folder?
Yes. But don't do that! Especially if your project is on remote git repo like github.
If a module name is URL, go tools fetch that URL. If your module name is not the same as the repo name, 
go can NOT find it.

# Does "import" support relative path?
No Relative Paths: Imports are always absolute paths relative to the module root.

# Why can constants be untyped?
Go is a strong typed language, but constants in Go can be untyped.
The main reason is FLEXIBILITY.

E.g.
numeric constants can have unlimited size.
```
// this is ok
const x =     999999999999999999999999999999999999999999999999999999999

// this triggers compiling error
const x int = 999999999999999999999999999999999999999999999999999999999
```
untyped constants are saved/calculated at compiling time by thie GO compiler.

Another example for untyped string.
```
const c = "hello"
v := "hello"

type MyString string
var MyString m 
m = c
m = v  // compiling error
```
More at [Go Blog](https://go.dev/blog/constants).

# Why does len("hello,世界") return 12?
In Go, string is slice of bytes. Any byte value can be saved in a string, the bytes are not necessary to be a valid UTF-8 bytes. 
That being said, in most cases, we should use string fro UTF-8 encoded characters.

# How to get each "rune" in a string?
for range takes care of UTF-8 encoding automatically for you.
Note: the index is still for the starting byte.
```
s := "hello,世界"
for i, r := range s {
	fmt.Printf("%d: %c", i, r)
}

$ go run hello.go
0: h
1: e
2: l
3: l
4: o
5: ,
6: 世
9: 界

```
More details at [Go Blog](https://go.dev/blog/strings)

# What's the default buffer size of a golang channel?
**0**, the default chan is unbuffered at all, which means the chan doesn't have a buffer, and data sent to it immediately appears on the other side.
The goroutine reading it blocks until another goroutine writes to the chan.
The goroutine writing it blocks until another goroutine reads from the chan.
So, unbuffered chan is a great choice for synchronization.

# How to detect if the http connection is closed or not within http.ServeHTTP()?
If the http.ServeHTTP() takes a long time to run, it need to detect if the underhood connection is still alive.
This can be done by read r.Context().Done() channel.

e.g. an example SSE server.

```go
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-store")

		for {
			select {
			case <-r.Context().Done():
				return
			default:
				fmt.Fprintf(w, "data: %s\n\n", time.Now())
				if f, ok := w.(http.Flusher); ok {
					f.Flush()
				}
			}
			time.Sleep(time.Second)
		}
	})
```
# How to guarantee writing exactly N bytes with io.Writer?
The golang doc says that "Write must return a non-nil error if it returns n < len(p)". That means as long as io.Write() returns 
nil error, it's assured that exactly N bytes were written.

```go
buf := make([]byte, n)
if _, err := x.Write(buf); err != nil {
    log.Fatal(err)
}
// if err == nil, it's guaranteed N bytes were successfully written.
```

# How to guarantee reading exactly N bytes with io.Reader?
Unlike io.Writer, io.Reader doesn't make sure reading N bytes even if it return a nil error.
To have the gurantee, io.ReadFull() should be used.
The official doc says about io.ReadFull() with "On return, n == len(buf) if and only if err == nil"
```go
buf := make([]byte, n)
if _, err := io.ReadFull(r, buf); err != nil {
	log.Fatal(err)
}
// if err == nil, it's guaranteed N bytes were successfully read out.
```

# Is net.Conn thread-safe?
Based on go.dev doc, "Multiple goroutines may invoke methods on a Conn simultaneously."
That means a single "conn.Write()" won't be intervened by another "conn.Write()". But it doesn't gurantee that 
consecutive "conn.Write()"s won't be interrupted.
e.g.
```go
func a(conn net.Conn){
   conn.Write(msg1_1)
   conn.Write(msg1_2)
}

func b(conn net.Conn){
   conn.Write(msg2_1)
   conn.Write(msg2_2)
}

go a()
go b()

```
The above code may run in an order that you don't want.
```
conn.Write(msg1_1)
conn.Write(msg2_1)
conn.Write(msg1_2)
conn.Write(msg2_2)
```
To make sure TCP frame is correctly sent, either a frame is sent by a single conn.Write(), or sync.Mutex is used to protect a frame's all "conn.Write()"s.

# Is channel thread-safe?
Yes, based on its official doc, "A single channel may be used in send statements, receive operations,
and calls to the built-in functions cap and len by any number of goroutines without further synchronization"

It's kind of obvious as channels themselves are used to sync go routines.

# How to statically build go code?

```bash
CGO_ENABLED=0 go build hello.go
```

# How to print a value's data type?
```go
var x int
fmt.Printf("%T", x)
```
# How to embed a folder of files into go app and access a sub tree in it?
Let's assume the folder layout is:
  ./ui/index.html
  ./ui/index.css
  ./ui/index.js

```go
...
//go:embed ui
var UI embed.FS
...

// used during development as the files will editable when debugging
http.Handle("/", http.FileServer(http.Dir("ui")))


// used in production as the files will be readonly
sub, err := fs.Sub(UI, "ui")
if err != nil {
    panic(err)
}
http.Handle("/", http.FileServer(http.FS(sub)))


```

# How to detect HTTP disconnection from http.Hanlder?
```go
http.HandleFunc("/sse", func(w http.ResponseWriter, r *http.Request) {
		log.Printf("%s", r.RequestURI)
		w.Header().Set("Content-Type", "text/event-stream")
		w.Header().Set("Cache-Control", "no-store")
		w.Header().Set("Connection", "keep-alive")

		msgChan := make(chan string, 10)
		users.Store(r, msgChan)
		defer func() {
			users.Delete(r)
			log.Printf("user %s left", r.RemoteAddr)
		}()

		ticker := time.NewTicker(time.Second)
		defer ticker.Stop()

		for {
			select {
			case <-ticker.C:
				fmt.Fprintf(w, ": nothing to sent\n\n\n")
			case e := <-msgChan:
				fmt.Fprintf(w, "data: %s\n", e)
				fmt.Fprintf(w, "\n\n")
			case <-r.Context().Done():
				return
			}
			if f, ok := w.(http.Flusher); ok {
				f.Flush()
			}
		}
	})
```
