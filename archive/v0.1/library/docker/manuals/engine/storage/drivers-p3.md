---
title: "Storage drivers (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/_index.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Storage drivers (part 3 of 3)

### Copying makes containers efficient

When you start a container, a thin writable container layer is added on top of
the other layers. Any changes the container makes to the filesystem are stored
here. Any files the container doesn't change don't get copied to this writable
layer. This means that the writable layer is as small as possible.

When an existing file in a container is modified, the storage driver performs a
copy-on-write operation. The specific steps involved depend on the specific
storage driver. For the `overlay2` driver, the copy-on-write operation follows
this rough sequence:

- Search through the image layers for the file to update. The process starts
  at the newest layer and works down to the base layer one layer at a time.
  When results are found, they're added to a cache to speed future operations.
- Perform a `copy_up` operation on the first copy of the file that's found, to
  copy the file to the container's writable layer.
- Any modifications are made to this copy of the file, and the container can't
  see the read-only copy of the file that exists in the lower layer.

Btrfs, ZFS, and other drivers handle the copy-on-write differently. You can
read more about the methods of these drivers later in their detailed
descriptions.

Containers that write a lot of data consume more space than containers
that don't. This is because most write operations consume new space in the
container's thin writable top layer. Note that changing the metadata of files,
for example, changing file permissions or ownership of a file, can also result
in a `copy_up` operation, therefore duplicating the file to the writable layer.

> **Tip:**
>
> Use volumes for write-heavy applications.
>
> Don't store the data in the container for write-heavy applications. Such
> applications, for example write-intensive databases, are known to be
> problematic particularly when pre-existing data exists in the read-only
> layer.
>
> Instead, use Docker volumes, which are independent of the running container,
> and designed to be efficient for I/O. In addition, volumes can be shared
> among containers and don't increase the size of your container's writable
> layer. Refer to the use volumes section to learn about
> volumes.

A `copy_up` operation can incur a noticeable performance overhead. This overhead
is different depending on which storage driver is in use. Large files,
lots of layers, and deep directory trees can make the impact more noticeable.
This is mitigated by the fact that each `copy_up` operation only occurs the first
time a given file is modified.

To verify the way that copy-on-write works, the following procedure spins up 5
containers based on the `acme/my-final-image:1.0` image we built earlier and
examines how much room they take up.

1. From a terminal on your Docker host, run the following `docker run` commands.
   The strings at the end are the IDs of each container.

   ```console
   $ docker run -dit --name my_container_1 acme/my-final-image:1.0 bash \
     && docker run -dit --name my_container_2 acme/my-final-image:1.0 bash \
     && docker run -dit --name my_container_3 acme/my-final-image:1.0 bash \
     && docker run -dit --name my_container_4 acme/my-final-image:1.0 bash \
     && docker run -dit --name my_container_5 acme/my-final-image:1.0 bash

   40ebdd7634162eb42bdb1ba76a395095527e9c0aa40348e6c325bd0aa289423c
   a5ff32e2b551168b9498870faf16c9cd0af820edf8a5c157f7b80da59d01a107
   3ed3c1a10430e09f253704116965b01ca920202d52f3bf381fbb833b8ae356bc
   939b3bf9e7ece24bcffec57d974c939da2bdcc6a5077b5459c897c1e2fa37a39
   cddae31c314fbab3f7eabeb9b26733838187abc9a2ed53f97bd5b04cd7984a5a
   ```

2. Run the `docker ps` command with the `--size` option to verify the 5 containers
   are running, and to see each container's size.

   ```console
   $ docker ps --size --format "table {{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Size}}"

   CONTAINER ID   IMAGE                     NAMES            SIZE
   cddae31c314f   acme/my-final-image:1.0   my_container_5   0B (virtual 7.75MB)
   939b3bf9e7ec   acme/my-final-image:1.0   my_container_4   0B (virtual 7.75MB)
   3ed3c1a10430   acme/my-final-image:1.0   my_container_3   0B (virtual 7.75MB)
   a5ff32e2b551   acme/my-final-image:1.0   my_container_2   0B (virtual 7.75MB)
   40ebdd763416   acme/my-final-image:1.0   my_container_1   0B (virtual 7.75MB)
   ```

   The output above shows that all containers share the image's read-only layers
   (7.75MB), but no data was written to the container's filesystem, so no additional
   storage is used for the containers.

   > **Note:**
   >
   > This step requires a Linux machine, and doesn't work on Docker Desktop, as
   > it requires access to the Docker Daemon's file storage.

   While the output of `docker ps` provides you information about disk space
   consumed by a container's writable layer, it doesn't include information
   about metadata and log-files stored for each container.

   More details can be obtained by exploring the Docker Daemon's storage
   location (`/var/lib/docker` by default).

   ```console
   $ sudo du -sh /var/lib/docker/containers/*

   36K  /var/lib/docker/containers/3ed3c1a10430e09f253704116965b01ca920202d52f3bf381fbb833b8ae356bc
   36K  /var/lib/docker/containers/40ebdd7634162eb42bdb1ba76a395095527e9c0aa40348e6c325bd0aa289423c
   36K  /var/lib/docker/containers/939b3bf9e7ece24bcffec57d974c939da2bdcc6a5077b5459c897c1e2fa37a39
   36K  /var/lib/docker/containers/a5ff32e2b551168b9498870faf16c9cd0af820edf8a5c157f7b80da59d01a107
   36K  /var/lib/docker/containers/cddae31c314fbab3f7eabeb9b26733838187abc9a2ed53f97bd5b04cd7984a5a
   ```

   Each of these containers only takes up 36k of space on the filesystem.

3. Per-container storage

   To demonstrate this, run the following command to write the word 'hello' to
   a file on the container's writable layer in containers `my_container_1`,
   `my_container_2`, and `my_container_3`:

   ```console
   $ for i in {1..3}; do docker exec my_container_$i sh -c 'printf hello > /out.txt'; done
   ```

   Running the `docker ps` command again afterward shows that those containers
   now consume 5 bytes each. This data is unique to each container, and not
   shared. The read-only layers of the containers aren't affected, and are still
   shared by all containers.

   ```console
   $ docker ps --size --format "table {{.ID}}\t{{.Image}}\t{{.Names}}\t{{.Size}}"

   CONTAINER ID   IMAGE                     NAMES            SIZE
   cddae31c314f   acme/my-final-image:1.0   my_container_5   0B (virtual 7.75MB)
   939b3bf9e7ec   acme/my-final-image:1.0   my_container_4   0B (virtual 7.75MB)
   3ed3c1a10430   acme/my-final-image:1.0   my_container_3   5B (virtual 7.75MB)
   a5ff32e2b551   acme/my-final-image:1.0   my_container_2   5B (virtual 7.75MB)
   40ebdd763416   acme/my-final-image:1.0   my_container_1   5B (virtual 7.75MB)
   ```

The previous examples illustrate how copy-on-write filesystems help make
containers efficient. Not only does copy-on-write save space, but it also
reduces container start-up time. When you create a container (or multiple
containers from the same image), Docker only needs to create the thin writable
container layer.

If Docker had to make an entire copy of the underlying image stack each time it
created a new container, container creation times and disk space used would be
significantly increased. This would be similar to the way that virtual machines
work, with one or more virtual disks per virtual machine. The `vfs` storage
doesn't provide a CoW filesystem or other optimizations. When using this storage
driver, a full copy of the image's data is created for each container.

## Related information

- Volumes
- Select a storage driver
