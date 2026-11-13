---
title: "Restart service when sleep finishes (part 11 of 11)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-systemd.unit.5.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# Restart service when sleep finishes (part 11 of 11)

## EXAMPLES

Example `test.container`:

```
[Unit]
Description=A minimal container

[Container]
# Use the centos image
Image=quay.io/centos/centos:latest

# Use volume and network defined below
Volume=test.volume:/data
Network=test.network

# In the container we just run sleep
Exec=sleep 60

[Service]
# Restart service when sleep finishes
Restart=always
# Extend Timeout to allow time to pull the image
TimeoutStartSec=900
# ExecStartPre flag and other systemd commands can go here, see systemd.unit(5) man page.
ExecStartPre=/usr/share/mincontainer/setup.sh

[Install]
# Start by default on boot
WantedBy=multi-user.target default.target
```

Example `test.kube`:
```
[Unit]
Description=A kubernetes yaml based service
Before=local-fs.target

[Kube]
Yaml=/opt/k8s/deployment.yml

[Install]
# Start by default on boot
WantedBy=multi-user.target default.target
```

Example for locally built image to be used in a container with build-specific arguments:

`test.build`
```
[Build]
# Tag the image to be built
ImageTag=localhost/imagename

# Set the working directory to the path of the unit file,
# expecting to find a Containerfile/Dockerfile
# + other files needed to build the image
SetWorkingDirectory=unit
# Set build arguments VERSION and DEBUG
BuildArg=VERSION=1.0 \
          DEBUG=false
```

`test.container`
```
[Container]
Image=test.build
```

Example `test.volume`:

```
[Volume]
User=root
Group=root
Label=org.test.Key=value
```

Example `test.network`:
```
[Network]
Subnet=172.16.0.0/24
Gateway=172.16.0.1
IPRange=172.16.0.0/28
Label=org.test.Key=value
```

Example `test.artifact` to only pull the artifact using one auth file:
```
[Artifact]
Artifact=quay.io/example/my-artifact:latest
AuthFile=/etc/registry/auth.json
TLSVerify=false
```

Example usage where a container depends on an artifact:

`my-artifact.artifact`:
```
[Artifact]
Artifact=quay.io/example/my-config:latest
```

`my-app.container`:
```
[Container]
Image=quay.io/example/my-app:latest
Mount=type=artifact,source=my-artifact.artifact,destination=/etc/config
```

Example for a container in a Pod:

`test.pod`
```
[Pod]
PodName=test
```

`centos.container`
```
[Container]
Image=quay.io/centos/centos:latest
Exec=sh -c "sleep inf"
Pod=test.pod
```

Example for a Pod with a one-shot startup task:

`test.pod`
```
[Pod]
PodName=test
ExitPolicy=continue
```

`startup-task.container`
```
[Service]
Type=oneshot
RemainAfterExit=yes

[Container]
Pod=test.pod
Image=quay.io/centos/centos:latest
Exec=sh -c "echo 'setup starting'; sleep 2; echo 'setup complete'"
```

`app.container`
```
[Unit]
Requires=startup-task.container
After=startup-task.container

[Container]
Pod=test.pod
Image=quay.io/centos/centos:latest
Exec=sh -c "echo 'app running.'; sleep 30"
```

Example `s3fs.volume`:

For further details, please see the s3fs-fuse project.
Remember to read the FAQ

> NOTE: Enabling the cache massively speeds up access and write times on static files/objects.

> However, `use_cache` is UNBOUNDED!

> Be careful, it will fill up with any files accessed on the s3 bucket through the file system.

Please remember to set `S3_BUCKET`, `PATH`, `AWS_REGION`. `CACHE_DIRECTORY` should be set up by systemd

```
[Service]
CacheDirectory=s3fs
ExecStartPre=/usr/local/bin/aws s3api put-object --bucket ${S3_BUCKET} --key ${PATH}/

[Volume]
Device=${S3_BUCKET}:/${PATH}
Type=fuse.s3fs
VolumeName=s3fs-volume
Options=iam_role,endpoint=${AWS_REGION},use_xattr,listobjectsv2,del_cache,use_cache=${CACHE_DIRECTORY}
# `iam_role` assumes inside EC2, if not, Use `profile=` instead
```

For more examples, please see the podman-quadlet-basic-usage.7.

## SEE ALSO
- **podman-auto-update(1)**
- **podman-build.unit(5),**
- **podman-container.unit(5),**
- **podman-image.unit(5),**
- **podman-kube.unit(5),**
- **podman-network-create(1)**,
- **podman-network.unit(5),**
- **podman-pod.unit(5),**
- **podman-quadlet-basic-usage.7,**
- **podman-run(1)**,
- **podman-volume.unit(5),**
- **systemd-analyze(1)**,
- **systemd.service(5)**,
- **systemd.unit(5)**
