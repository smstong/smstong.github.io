**GOLANG FAQ**
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
http.Handle("/", http.FS(sub))


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