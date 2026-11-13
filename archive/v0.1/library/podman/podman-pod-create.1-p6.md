---
title: "podman-pod-create.1 (part 6 of 6)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-create.1 (part 6 of 6)

## EXAMPLES

Create a named pod.
```
$ podman pod create --name test
```

Create a named pod.
```
$ podman pod create mypod
```

Create a pod without an infra container.
```
$ podman pod create --infra=false
```

Create a named pod with infra container command to run.
```
$ podman pod create --infra-command /top toppod
```

Create a pod with published ports on the host.
```
$ podman pod create --publish 8443:443
```

Create a pod with the specified network.
```
$ podman pod create --network pasta
```

Create a pod on two networks.
```
$ podman pod create --network net1:ip=10.89.1.5 --network net2:ip=10.89.10.10
```

Create a pod with shared CPU and memory limits for all containers.
```
$ podman pod create --cpus=2 --memory=512m mypod
```

Create a pod with shared volume mounts accessible to all containers.
```
$ podman pod create --volume /host/path:/container/path:Z mypod
```

Create a pod with shared resource limits and volume mounts for all containers.
```
$ podman pod create --volume /data:/data:Z --volume /config:/etc/config:ro --cpus=1.5 --memory=1g --cpu-shares=512 mypod
```

Create a pod with shared device access and resource limits.
```
$ podman pod create --device /dev/sda:/dev/sda:rw --cpus=4 --memory=2g --blkio-weight=500 mypod
```

Create a pod with shared CPU set limits and volumes from another container that will be shared to all containers in the pod.
```
$ podman pod create --cpuset-cpus=0,2 --volumes-from=source-container --memory=1g mypod
```

Create a pod with shared resources and add containers to it.
```
$ podman pod create --cpus=2 --memory=1g --volume /data:/data:Z mypod
$ podman create --pod mypod nginx
$ podman create --pod mypod redis
```

## SEE ALSO
**podman(1)**, **podman-pod(1)**, **podman-kube-play(1)**, **containers.conf(1)**, **cgroups(7)**

### Troubleshooting

See podman-troubleshooting(7)
for solutions to common issues.

## HISTORY
July 2018, Originally compiled by Peter Hunt <user@example.com>

## FOOTNOTES
1: The Podman project is committed to inclusivity, a core value of open source. The `master` and `slave` mount propagation terminology used here is problematic and divisive, and needs to be changed. However, these terms are currently used within the Linux kernel and must be used as-is at this time. When the kernel maintainers rectify this usage, Podman will follow suit immediately.
