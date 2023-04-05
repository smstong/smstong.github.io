**GUN Assembler FAQ**

# Linux x64 "hello world" in pure gas
```assembly
###############################################################################
# gcc -c hello.s && ld hello.o && ./a.out
# OR
# gcc -nostdlib hello.s && ./a.out
###############################################################################

.global _start

.text

_start:
        mov $1, %rax
        mov $1, %rdi
        mov $message, %rsi
        mov $13, %rdx
        syscall

        mov $60, %rax
        xor %rdi, %rdi
        syscall


message:
        .ascii "Hello, world\n"

```