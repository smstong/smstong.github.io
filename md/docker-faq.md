
**Docker FAQ**

# How to let docker forcefully pull a image before running it?
Option "--pull always" can help.

```bash
docker run --pull always docker.io/image_name:latest
```
# How to run multiple processes in a docker container?
[Run multiple services in a container](https://docs.docker.com/config/containers/multi-service_container/)
## create a start script, my_wrapper_script.sh
```bash
#!/bin/bash

# Start the first process
./my_first_process &
  
# Start the second process
./my_second_process &
  
# Wait for any process to exit
wait -n
  
# Exit with status of process that exited first
exit $?
```
## set the start script as default command

```Dockerfile
FROM ubuntu:latest
COPY my_first_process my_first_process
COPY my_second_process my_second_process
COPY my_wrapper_script.sh my_wrapper_script.sh
CMD ./my_wrapper_script.sh
```