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
