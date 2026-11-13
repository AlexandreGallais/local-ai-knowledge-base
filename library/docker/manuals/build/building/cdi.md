---
title: "Container Device Interface (CDI) (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/building/cdi.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

The Container Device Interface (CDI)
is a specification designed to standardize how devices (like GPUs, FPGAs, and
other hardware accelerators) are exposed to and used by containers. The aim is
to provide a more consistent and secure mechanism for using hardware devices in
containerized environments, addressing the challenges associated with
device-specific setups and configurations.

In addition to enabling the container to interact with the device node, CDI also
lets you specify additional configuration for the device, such as environment
variables, host mounts (such as shared objects), and executable hooks.

## Getting started

To get started with CDI, you need to have a compatible environment set up. This
includes having Docker v27+ installed with CDI configured
and Buildx v0.22+.

You also need to create the device specifications using JSON or YAML files
in one of the following locations:

* `/etc/cdi`
* `/var/run/cdi`
* `/etc/buildkit/cdi`

> **Note:**
> Location can be changed by setting the `specDirs` option in the `cdi` section
> of the `buildkitd.toml` configuration file if you
> are using BuildKit directly. If you're building using the Docker Daemon with
> the `docker` driver, see Configure CDI devices
> documentation.

> **Note:**
> If you are creating a container builder on WSL, you need to ensure that
> Docker Desktop is installed and WSL 2 GPU Paravirtualization
> is enabled. Buildx v0.27+ is also required to mount the WSL libraries in the
> container.

## Building with a simple CDI specification

Let's start with a simple CDI specification that injects an environment variable
into the build environment and write it to `/etc/cdi/foo.yaml`:

```yaml
cdiVersion: "0.6.0"
kind: "vendor1.com/device"
devices:
- name: foo
  containerEdits:
    env:
    - FOO=injected
```

Inspect the `default` builder to verify that `vendor1.com/device` is detected
as a device:

```console
$ docker buildx inspect
Name:   default
Driver: docker

Nodes:
Name:             default
Endpoint:         default
Status:           running
BuildKit version: v0.23.2
Platforms:        linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/amd64/v4, linux/386
Labels:
 org.mobyproject.buildkit.worker.moby.host-gateway-ip: 172.17.0.1
Devices:
 Name:                  vendor1.com/device=foo
 Automatically allowed: false
GC Policy rule#0:
 All:            false
 Filters:        type==source.local,type==exec.cachemount,type==source.git.checkout
 Keep Duration:  48h0m0s
 Max Used Space: 658.9MiB
GC Policy rule#1:
 All:            false
 Keep Duration:  1440h0m0s
 Reserved Space: 4.657GiB
 Max Used Space: 953.7MiB
 Min Free Space: 2.794GiB
GC Policy rule#2:
 All:            false
 Reserved Space: 4.657GiB
 Max Used Space: 953.7MiB
 Min Free Space: 2.794GiB
GC Policy rule#3:
 All:            true
 Reserved Space: 4.657GiB
 Max Used Space: 953.7MiB
 Min Free Space: 2.794GiB
```

Now let's create a Dockerfile to use this device:

```dockerfile
# syntax=docker/dockerfile:1-labs
FROM busybox
RUN --device=vendor1.com/device \
  env | grep ^FOO=
```

Here we use the `RUN --device` command
and set `vendor1.com/device` which requests the first device available in the
specification. In this case it uses `foo`, which is the first device in
`/etc/cdi/foo.yaml`.

> **Note:**
> `RUN --device` command is only
> featured in `labs` channel since
> Dockerfile frontend v1.14.0-labs
> and not yet available in stable syntax.

Now let's build this Dockerfile:

```console
$ docker buildx build .
[+] Building 0.4s (5/5) FINISHED                                                                                                        docker:default
 => [internal] load build definition from Dockerfile                                                                                    0.0s 
 => => transferring dockerfile: 155B                                                                                                    0.0s
 => resolve image config for docker-image://docker/dockerfile:1-labs                                                                    0.1s 
 => CACHED docker-image://docker/dockerfile:1-labs@sha256:9187104f31e3a002a8a6a3209ea1f937fb7486c093cbbde1e14b0fa0d7e4f1b5              0.0s
 => [internal] load metadata for docker.io/library/busybox:latest                                                                       0.1s 
 => [internal] load .dockerignore                                                                                                       0.0s
 => => transferring context: 2B                                                                                                         0.0s 
ERROR: failed to build: failed to solve: failed to load LLB: device vendor1.com/device=foo is requested by the build but not allowed
```

It fails because the device `vendor1.com/device=foo` is not automatically
allowed by the build as shown in the `buildx inspect` output above:

```text
Devices:
 Name:                  vendor1.com/device=foo
 Automatically allowed: false
```

To allow the device, you can use the `--allow` flag
with the `docker buildx build` command:

```console
$ docker buildx build --allow device .
```

Or you can set the `org.mobyproject.buildkit.device.autoallow` annotation in
the CDI specification to automatically allow the device for all builds:

```yaml
cdiVersion: "0.6.0"
kind: "vendor1.com/device"
devices:
- name: foo
  containerEdits:
    env:
    - FOO=injected
annotations:
  org.mobyproject.buildkit.device.autoallow: true
```

Now running the build again with the `--allow device` flag:

```console
$ docker buildx build --progress=plain --allow device .
#0 building with "default" instance using docker driver

#1 [internal] load build definition from Dockerfile
#1 transferring dockerfile: 159B done
#1 DONE 0.0s

#2 resolve image config for docker-image://docker/dockerfile:1-labs
#2 DONE 0.1s

#3 docker-image://docker/dockerfile:1-labs@sha256:9187104f31e3a002a8a6a3209ea1f937fb7486c093cbbde1e14b0fa0d7e4f1b5
#3 CACHED

#4 [internal] load metadata for docker.io/library/busybox:latest
#4 DONE 0.1s

#5 [internal] load .dockerignore
#5 transferring context: 2B done
#5 DONE 0.0s

#6 [1/2] FROM docker.io/library/busybox:latest@sha256:f85340bf132ae937d2c2a763b8335c9bab35d6e8293f70f606b9c6178d84f42b
#6 CACHED

#7 [2/2] RUN --device=vendor1.com/device   env | grep ^FOO=
#7 0.155 FOO=injected
#7 DONE 0.2s
```

The build is successful and the output shows that the `FOO` environment variable
was injected into the build environment as specified in the CDI specification.

## Set up a container builder with GPU support

In this section, we will show you how to set up a container builder
using NVIDIA GPUs. Since Buildx v0.22, when creating a new container builder, a
GPU request is automatically added to the container builder if the host has GPU
drivers installed in the kernel. This is similar to using `--gpus=all` with the `docker run`
command.

Now let's create a container builder named `gpubuilder` using Buildx:

```console
$ docker buildx create --name gpubuilder --driver-opt "image=moby/buildkit:buildx-stable-1-gpu" --bootstrap
#1 [internal] booting buildkit
#1 pulling image moby/buildkit:buildx-stable-1-gpu
#1 pulling image moby/buildkit:buildx-stable-1-gpu 1.0s done
#1 creating container buildx_buildkit_gpubuilder0
#1 creating container buildx_buildkit_gpubuilder0 8.8s done
#1 DONE 9.8s
gpubuilder
```

> **Note:**
> We made a specially crafted BuildKit image because the current BuildKit
> release image is based on Alpine that doesn't support NVIDIA drivers. The
> following image is based on Ubuntu and installs the NVIDIA client libraries
> and generates the CDI specification for your GPU in the container builder if
> a device is requested during a build.

Let's inspect this builder:

```console
$ docker buildx inspect gpubuilder
Name:          gpubuilder
Driver:        docker-container
Last Activity: 2025-07-10 08:18:09 +0000 UTC

Nodes:
Name:                  gpubuilder0
Endpoint:              unix:///var/run/docker.sock
Driver Options:        image="moby/buildkit:buildx-stable-1-gpu"
Status:                running
BuildKit daemon flags: --allow-insecure-entitlement=network.host
BuildKit version:      v0.26.2
Platforms:             linux/amd64, linux/amd64/v2, linux/amd64/v3, linux/arm64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
Labels:
 org.mobyproject.buildkit.worker.executor:         oci
 org.mobyproject.buildkit.worker.hostname:         d6aa9cbe8462
 org.mobyproject.buildkit.worker.network:          host
 org.mobyproject.buildkit.worker.oci.process-mode: sandbox
 org.mobyproject.buildkit.worker.selinux.enabled:  false
 org.mobyproject.buildkit.worker.snapshotter:      overlayfs
Devices:
 Name:      nvidia.com/gpu
 On-Demand: true
GC Policy rule#0:
 All:            false
 Filters:        type==source.local,type==exec.cachemount,type==source.git.checkout
 Keep Duration:  48h0m0s
 Max Used Space: 488.3MiB
GC Policy rule#1:
 All:            false
 Keep Duration:  1440h0m0s
 Reserved Space: 9.313GiB
 Max Used Space: 93.13GiB
 Min Free Space: 188.1GiB
GC Policy rule#2:
 All:            false
 Reserved Space: 9.313GiB
 Max Used Space: 93.13GiB
 Min Free Space: 188.1GiB
GC Policy rule#3:
 All:            true
 Reserved Space: 9.313GiB
 Max Used Space: 93.13GiB
 Min Free Space: 188.1GiB
```

We can see `nvidia.com/gpu` vendor is detected as a device in the builder which
means that drivers were detected.

Optionally you can check if NVIDIA GPU devices are available in the container
using `nvidia-smi`:

```console
$ docker exec -it buildx_buildkit_gpubuilder0 nvidia-smi -L
GPU 0: Tesla T4 (UUID: GPU-6cf00fa7-59ac-16f2-3e83-d24ccdc56f84)
```
