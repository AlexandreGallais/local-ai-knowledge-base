---
title: "Storage drivers (part 1 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

> **Note:**
> This page describes the classic storage drivers, such as `overlay2`. Docker
> Engine 29.0 and later uses the containerd image store by
> default for fresh installations, which uses snapshotters instead of classic
> storage drivers. If you're running a fresh installation of Docker Engine 29.0
> or later, or if you've migrated to the containerd image store, the concepts on
> this page still explain how image layers work, but the commands and examples
> won't reflect how your system stores images. For operational guidance, see
> containerd image store.

To use storage drivers effectively, you need to know how Docker builds and
stores images, and how these images are used by containers. You can use this
information to make informed choices about the best way to persist data from
your applications and avoid performance problems along the way.

## Storage drivers versus Docker volumes

Docker uses storage drivers to store image layers, and to store data in the
writable layer of a container. The container's writable layer doesn't persist
after the container is deleted, but is suitable for storing ephemeral data that
is generated at runtime. Storage drivers are optimized for space efficiency, but
(depending on the storage driver) write speeds are lower than native file system
performance, especially for storage drivers that use a copy-on-write filesystem.
Write-intensive applications, such as database storage, are impacted by a
performance overhead, particularly if pre-existing data exists in the read-only
layer.

Use Docker volumes for write-intensive data, data that must persist beyond the
container's lifespan, and data that must be shared between containers. Refer to
the volumes section to learn how to use volumes to persist data
and improve performance.

## Images and layers

A Docker image is built up from a series of layers. Each layer represents an
instruction in the image's Dockerfile. Each layer except the very last one is
read-only. Consider the following Dockerfile:

```dockerfile
# syntax=docker/dockerfile:1

FROM ubuntu:22.04
LABEL org.opencontainers.image.authors="org@example.com"
COPY . /app
RUN make /app
RUN rm -r $HOME/.cache
CMD python /app/app.py
```

This Dockerfile contains four commands. Commands that modify the filesystem create
a new layer. The `FROM` statement starts out by creating a layer from the `ubuntu:22.04`
image. The `LABEL` command only modifies the image's metadata, and doesn't produce
a new layer. The `COPY` command adds some files from your Docker client's current
directory. The first `RUN` command builds your application using the `make` command,
and writes the result to a new layer. The second `RUN` command removes a cache
directory, and writes the result to a new layer. Finally, the `CMD` instruction
specifies what command to run within the container, which only modifies the
image's metadata, which doesn't produce an image layer.

Each layer is only a set of differences from the layer before it. Note that both
_adding_, and _removing_ files will result in a new layer. In the example above,
the `$HOME/.cache` directory is removed, but will still be available in the
previous layer and add up to the image's total size. Refer to the
Best practices for writing Dockerfiles
and use multi-stage builds
sections to learn how to optimize your Dockerfiles for efficient images.

The layers are stacked on top of each other. When you create a new container,
you add a new writable layer on top of the underlying layers. This layer is often
called the "container layer". All changes made to the running container, such as
writing new files, modifying existing files, and deleting files, are written to
this thin writable container layer. The diagram below shows a container based
on an `ubuntu:15.04` image.

A storage driver handles the details about the way these layers interact with
each other. Different storage drivers are available, which have advantages
and disadvantages in different situations.

## Container and layers

The major difference between a container and an image is the top writable layer.
All writes to the container that add new or modify existing data are stored in
this writable layer. When the container is deleted, the writable layer is also
deleted. The underlying image remains unchanged.

Because each container has its own writable container layer, and all changes are
stored in this container layer, multiple containers can share access to the same
underlying image and yet have their own data state. The diagram below shows
multiple containers sharing the same Ubuntu 15.04 image.

Docker uses storage drivers to manage the contents of the image layers and the
writable container layer. Each storage driver handles the implementation
differently, but all drivers use stackable image layers and the copy-on-write
(CoW) strategy.

> **Note:**
>
> Use Docker volumes if you need multiple containers to have shared access to
> the exact same data. Refer to the volumes section to learn
> about volumes.

## Container size on disk

To view the approximate size of a running container, you can use the `docker ps -s`
command. Two different columns relate to size.

- `size`: the amount of data (on disk) that's used for the writable layer of
  each container.
- `virtual size`: the amount of data used for the read-only image data
  used by the container plus the container's writable layer `size`.
  Multiple containers may share some or all read-only
  image data. Two containers started from the same image share 100% of the
  read-only data, while two containers with different images which have layers
  in common share those common layers. Therefore, you can't just total the
  virtual sizes. This over-estimates the total disk usage by a potentially
  non-trivial amount.

The total disk space used by all of the running containers on disk is some
combination of each container's `size` and the `virtual size` values. If
multiple containers started from the same exact image, the total size on disk for
these containers would be SUM (`size` of containers) plus one image size
(`virtual size` - `size`).

This also doesn't count the following additional ways a container can take up
disk space:

- Disk space used for log files stored by the logging-driver.
  This can be non-trivial if your container generates a large amount of logging
  data and log rotation isn't configured.
- Volumes and bind mounts used by the container.
- Disk space used for the container's configuration files, which are typically
  small.
- Memory written to disk (if swapping is enabled).
- Checkpoints, if you're using the experimental checkpoint/restore feature.
