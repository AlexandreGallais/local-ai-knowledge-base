---
title: "podman-pod-create.1 (part 1 of 6)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-pod-create.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-pod-create.1

% podman-pod-create 1

## NAME
podman\-pod\-create - Create a new pod

## SYNOPSIS
**podman pod create** [*options*] [*name*]

## DESCRIPTION

Creates an empty pod, or unit of multiple containers, and prepares it to have
containers added to it. The pod can be created with a specific name. If a name
is not given a random name is generated. The pod ID is printed to STDOUT. You
can then use **podman create --pod `<pod_id|pod_name>` ...** to add containers
to the pod, and **podman pod start `<pod_id|pod_name>`** to start the pod.

The operator can identify a pod in three ways:
UUID long identifier (“f78375b1c487e03c9438c729345e54db9d20cfa2ac1fc3494b6eb60872e74778”)
UUID short identifier (“f78375b1c487”)
Name (“jonah”)

podman generates a UUID for each pod, and if a name is not assigned
to the container with **--name** then a random string name is generated
for it. This name is useful to identify a pod.

Note: resource limit related flags work by setting the limits explicitly in the pod's cgroup parent
for all containers joining the pod. A container can override the resource limits when joining a pod.
For example, if a pod was created via **podman pod create --cpus=5**, specifying **podman container create --pod=`<pod_id|pod_name>` --cpus=4** causes the container to use the smaller limit. Also, containers which specify their own cgroup, such as **--cgroupns=host**, do NOT get the assigned pod level cgroup resources.
