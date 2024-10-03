**BASH FAQ**

# How to copy "contents" of a folder but not the folder itself?

The special "." lets cp to copy all contents including hidden files.
```bash
cp -a src/.  dest
```

OR use rsync instead,
```bash
rsync -a src/ dest
```

# How to understand "rsync"'s syntax about trailing slash?

```bash
# todir will always be created if not existed
# rsync is idempotent
rsync -a fromdir/ todir  # copy the "contents" inside fromdir as "contents" under todir
rsync -a fromdir todir   # copy the "directory" fromdir itself as "contents" under todir
```

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
$ curl "${CURL_OPTS[@]}" https://my.server.com/api/whatever
$ curl "${CURL_OPTS[@]}" https://my.server.com/api/other
```

# "set -e" exits immediately if any **UNTESTED** command fails
The Linux bash manpage is not clear.
```
 -e  Exit immediately if a command exits with a non-zero status.
```
In fact, this is not accurate, as only untested commands count.
e.g.
```
set -e
false || true
echo hello
```
The above script always prints "hello". The reason is "false" before "&&" is treated as TESTED command whose exit code doesn't matter.

```
set -e
true || false
echo hello
```
The above script also always prints "hello". The reason is the "false" never runs.

Try below and guess the output.
```
set -e
true && false
echo hello
```
```
set -e
false && true
echo hello
```
FreeBSD has a better manual,
```
 -e errexit
         Exit immediately if any untested command fails in non-interactive
         mode.  The exit status of a command is considered to be explicitly
         tested if the command is part of the list used to control an if,
         elif, while, or until; if the command is the left hand operand of
         an “&&” or “||” operator; or if the command is a pipeline preceded
         by the ! operator.  If a shell function is executed and its exit
         status is explicitly tested, all commands of the function are con‐
         sidered to be tested as well.
```
# How to stop MinGW and MSYS from mangling path names?
```
export MSYS_NO_PATHCONV=1
```

# Why bash has a colon (:) built-in command?
In the old days, shell didn't have "true" command, ```:``` was used instead. 
Nowadays, ```:``` is used for other purposes.

e.g.

Do nothing, as a placeholder.
```
if [[ $name == "John" ]]; then : ; else ...
```

Evaluate a express.
```
set -e
: ${MY_VAR:?}
```
if MY_VAR is not defined, then the shell exits. If MY_VAR is defined, nothing happens.