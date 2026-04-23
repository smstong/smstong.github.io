**systemd**
# What's per-user instances of systemd?
There is ONE system-wide instancre of systemd which always runs with PID=1. Only an admin has the authority to control it.
There is a maximum of one systemd instance per user. The user or admin can control it.
```
# ps -ef | grep systemd
systemd --system  # this is system wide systemd, PID=1
systemd --user    # this is user systemd, PID!=1
```

# How to create an user systemd service?
## Step 0: enable linger for current user
```
loginctl enable-linger
```

## Step 1: create a service unit file as
```
~/.config/systemd/user/my.service
```
e.g.
```
[Unit]
Description=My Service

[Service]
ExecStart=/opt/apps/demo/start.sh

[Install]
WantedBy=default.target
```

## Step 2: reload systemd
```
systemctl --user daemon-reload
```

## Step 3: enable / start the service
```
systemctl --user enable my.service
systemctl --user start my.service
```

## Step 4: verify
```
systemctl --user status my
journalctl --user -u my
```
*Note*: For user with uid < 1000, journald will not write user journals. Instead directring everything to system journal.