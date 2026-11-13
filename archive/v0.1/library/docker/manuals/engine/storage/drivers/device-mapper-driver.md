---
title: "Device Mapper storage driver (deprecated) (part 1 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/device-mapper-driver.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Device Mapper storage driver (deprecated)

> **Deprecated**
>
> The Device Mapper driver has been deprecated,
> and is removed in Docker Engine v25.0. If you are using Device Mapper,
> you must migrate to a supported storage driver before upgrading to Docker
> Engine v25.0. Read the Docker storage drivers
> page for supported storage drivers.

Device Mapper is a kernel-based framework that underpins many advanced
volume management technologies on Linux. Docker's `devicemapper` storage driver
leverages the thin provisioning and snapshotting capabilities of this framework
for image and container management. This article refers to the Device Mapper
storage driver as `devicemapper`, and the kernel framework as _Device Mapper_.

For the systems where it is supported, `devicemapper` support is included in
the Linux kernel. However, specific configuration is required to use it with
Docker.

The `devicemapper` driver uses block devices dedicated to Docker and operates at
the block level, rather than the file level. These devices can be extended by
adding physical storage to your Docker host, and they perform better than using
a filesystem at the operating system (OS) level.

## Prerequisites

- `devicemapper` is supported on Docker Engine - Community running on CentOS, Fedora,
  SLES 15, Ubuntu, Debian, or RHEL.
- `devicemapper` requires the `lvm2` and `device-mapper-persistent-data` packages
  to be installed.
- Changing the storage driver makes any containers you have already
  created inaccessible on the local system. Use `docker save` to save containers,
  and push existing images to Docker Hub or a private repository, so you do
  not need to recreate them later.
