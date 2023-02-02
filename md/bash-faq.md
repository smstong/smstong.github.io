**BASH FAQ**

# How to write an extra-long one-line literal string beautifully in multiple lines?

```bash
s="I am a super long one-line string, "
s+="so I can be split into multiple lines with += connected."
echo "$s"
```

# How to write a multiple lines literal string in bash? 

```bash
s=$(cat << EOF
int main()
{
    return 0;
}
EOF
)

echo "$s"
```

# How to get the current bash script file name?

```bash
# This works for both running the script directly and sourcing it.
echo $BASH_SOURCE
```

# How to treat one app's output as a file's content?

```bash
# This trick is super useful when working with vim/source
vim <(ps -ef)
source <(kubectl completion bash)
```

# How to get the current script's full path?
```bash
selfPath=$(realpath $BASH_SOURCE)
selfDir=$(dirname $selfPath)

echo ${selfPath}
echo ${selfDir}
```

# How to convert HEX letter format data to binary bytes, then encode with base64?
```bash
echo "12ABCDEF" | xxd -r -p | base64 
```
