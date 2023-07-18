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

# How to continuously track a log file's changes?
```bash
# this is an example to track /var/log/message and forward new logs into a kafka broker
# see man pages for the difference between -f and -F.
tail -F /var/log/message  | kcat -b kafaka-server-ip:port -t logs
```

# How to save mulitple command line arguments/options in a variable and reuse it?
```bash
# quotation marks in the value of a variable cannot protect argument-with-spaces.
# the solution is to use bash array, more details at https://www.linuxexam.net/2023/07/how-bash-processes-command-args-with.html.

$ CURL_OPTS=('-H' 'Content-Type: application/json' -H "Authorization: BASIC $(echo -n $USERNAME:$PASSWORD | base64)")
$ curl "$CURL_OPTS" https://my.server.com/api/whatever
$ curl "$CURL_OPTS" https://my.server.com/api/other
```
