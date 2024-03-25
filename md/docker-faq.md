
**Docker FAQ**
# What'are bad with podman?
- containers cannot automatically restarted when OS reboots. ( daemonless has a price!)
- complex settings to avoid "sudo" to run it. ( daemonless has a price again!)

# How to disable path convertion of Git-Bash, so it works for docker commands on windows?
```
export MSYS_NO_PATHCONV=1
docker run --rm -it -v ./mydata:/mydata alpine sh
```

# How to use a docker client to manage a remote dockerd server?
Dockerd can listen to unix/tcp socket, but the security considerations must be in place.
The simplest way is actually to leverage existing SSH. This way doesn't need any configuration at all as long as an key authoried SSH is ready.
```
docker -H ssh://your-remote-dockerd whatever-docker-command
```
example.
```
docker -H ssh://192.168.0.20 run --rm -it -v /app:/app bash ls /app
```
Please be noticed, containers are running on the server where dockerd is running. All volumes, networks are also refered to the dockerd server, not the docker client server.

Also, this is different than running 
```
ssh 192.168.0.20 'docker run --rm ...'
```
The docker client for the above is running on the remote server where dockerd is running.

# How docker -H ssh://remote-dockerd-server ... works?
Local docker client runs "ssh remote-dockerd-server docker system dial-stdio". Simply put, the remote docker client running as a proxy for local docker client.
```
local docker client --(ssh)-- remote docker client as a proxy  --(unix or tcp socket)-- remote dockerd 
```

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

# How to test docker default bridge network(docker0) ?
```
 docker run --rm alpine ping 172.17.0.1  # from container, ping host
 docker run --rm alpine ping 1.1.1.1     # from container, ping internet
```

# How to merge host folder with container folder?
Docker volume does NOT support merging. The workround is to run a cp in the startup script.
e.g.
Grouper is one of the images that do this actually. A simplified version is demostrated here.
The purpose is to merge the host's ***./slashRoot/opt/grouper*** to the container's ***/opt/grouper*** folder.

In Dokerfile:
```
RUN cp startup.sh /startup.sh
CMD /startup.sh
```

In startup.sh:
```
#!/bin/bash
# merge host and container
rsync -l -r -v /slashRoot/ /
/usr/bin/app
```

Run command:
```
docker run -v ./slashRoot:/slashRoot  myimage
```
