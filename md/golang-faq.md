**GOLANG FAQ**
# How to statically build go code?

```bash
CGO_ENABLED=1 go build hello.go
```

# How to print a value's data type?
```go
var x int
fmt.Printf("%T", x)
```
