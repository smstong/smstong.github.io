**unix general**
# Is a process' stdin also its control terminal?
A process’s stdin file descriptor (fd 0) is **not** necessarily its control terminal. The control terminal is more specifically the terminal associated with the process group and session that the process is part of, which may or may not match its stdin.

For instance:

A process can have its stdin redirected to a file or a pipe, yet still maintain a controlling terminal.
The actual control terminal is typically the device associated with the session leader of the process's session. This relationship is established when the session leader opens a terminal device with the TIOCSCTTY ioctl command on Unix-like systems.