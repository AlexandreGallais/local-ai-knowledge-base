---
title: "Device Mapper storage driver (deprecated) (part 3 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/device-mapper-driver.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Device Mapper storage driver (deprecated) (part 3 of 4)

## Manage devicemapper

### Monitor the thin pool

Do not rely on LVM auto-extension alone. The volume group
automatically extends, but the volume can still fill up. You can monitor
free space on the volume using `lvs` or `lvs -a`. Consider using a monitoring
tool at the OS level, such as Nagios.

To view the LVM logs, you can use `journalctl`:

```console
$ sudo journalctl -fu dm-event.service
```

If you run into repeated problems with thin pool, you can set the storage option
`dm.min_free_space` to a value (representing a percentage) in
`/etc/docker/daemon.json`. For instance, setting it to `10` ensures
that operations fail with a warning when the free space is at or near 10%.
See the
storage driver options in the Engine daemon reference.

### Increase capacity on a running device

You can increase the capacity of the pool on a running thin-pool device. This is
useful if the data's logical volume is full and the volume group is at full
capacity. The specific procedure depends on whether you are using a
loop-lvm thin pool or a
direct-lvm thin pool.

#### Resize a loop-lvm thin pool

The easiest way to resize a `loop-lvm` thin pool is to
use the device_tool utility,
but you can use operating system utilities
instead.

##### Use the device_tool utility

A community-contributed script called `device_tool.go` is available in the
moby/moby
Github repository. You can use this tool to resize a `loop-lvm` thin pool,
avoiding the long process above. This tool is not guaranteed to work, but you
should only be using `loop-lvm` on non-production systems.

If you do not want to use `device_tool`, you can resize the thin pool manually instead.

1.  To use the tool, clone the Github repository, change to the
    `contrib/docker-device-tool`, and follow the instructions in the `README.md`
    to compile the tool.

2.  Use the tool. The following example resizes the thin pool to 200GB.

    ```console
    $ ./device_tool resize 200GB
    ```

##### Use operating system utilities

If you do not want to use the device-tool utility,
you can resize a `loop-lvm` thin pool manually using the following procedure.

In `loop-lvm` mode, a loopback device is used to store the data, and another
to store the metadata. `loop-lvm` mode is only supported for testing, because
it has significant performance and stability drawbacks.

If you are using `loop-lvm` mode, the output of `docker info` shows file
paths for `Data loop file` and `Metadata loop file`:

```console
$ docker info |grep 'loop file'

 Data loop file: /var/lib/docker/devicemapper/data
 Metadata loop file: /var/lib/docker/devicemapper/metadata
```

Follow these steps to increase the size of the thin pool. In this example, the
thin pool is 100 GB, and is increased to 200 GB.

1.  List the sizes of the devices.

    ```console
    $ sudo ls -lh /var/lib/docker/devicemapper/

    total 1175492
    -rw------- 1 root root 100G Mar 30 05:22 data
    -rw------- 1 root root 2.0G Mar 31 11:17 metadata
    ```

2.  Increase the size of the `data` file to 200 G using the `truncate` command,
    which is used to increase **or** decrease the size of a file. Note that
    decreasing the size is a destructive operation.

    ```console
    $ sudo truncate -s 200G /var/lib/docker/devicemapper/data
    ```

3.  Verify the file size changed.

    ```console
    $ sudo ls -lh /var/lib/docker/devicemapper/

    total 1.2G
    -rw------- 1 root root 200G Apr 14 08:47 data
    -rw------- 1 root root 2.0G Apr 19 13:27 metadata
    ```

4.  The loopback file has changed on disk but not in memory. List the size of
    the loopback device in memory, in GB. Reload it, then list the size again.
    After the reload, the size is 200 GB.

    ```console
    $ echo $[ $(sudo blockdev --getsize64 /dev/loop0) / 1024 / 1024 / 1024 ]

    100

    $ sudo losetup -c /dev/loop0

    $ echo $[ $(sudo blockdev --getsize64 /dev/loop0) / 1024 / 1024 / 1024 ]

    200
    ```

5.  Reload the devicemapper thin pool.

    a. Get the pool name first. The pool name is the first field, delimited by
    `:`. This command extracts it.

    ```console
    $ sudo dmsetup status | grep ' thin-pool ' | awk -F ': ' {'print $1'}
    docker-8:1-123141-pool
    ```

    b. Dump the device mapper table for the thin pool.

    ```console
    $ sudo dmsetup table docker-8:1-123141-pool
    0 209715200 thin-pool 7:1 7:0 128 32768 1 skip_block_zeroing
    ```

    c. Calculate the total sectors of the thin pool using the second field
    of the output. The number is expressed in 512-k sectors. A 100G file has
    209715200 512-k sectors. If you double this number to 200G, you get
    419430400 512-k sectors.

    d. Reload the thin pool with the new sector number, using the following
    three `dmsetup`  commands.

    ```console
    $ sudo dmsetup suspend docker-8:1-123141-pool
    $ sudo dmsetup reload docker-8:1-123141-pool --table '0 419430400 thin-pool 7:1 7:0 128 32768 1 skip_block_zeroing'
    $ sudo dmsetup resume docker-8:1-123141-pool
    ```

#### Resize a direct-lvm thin pool

To extend a `direct-lvm` thin pool, you need to first attach a new block device
to the Docker host, and make note of the name assigned to it by the kernel. In
this example, the new block device is `/dev/xvdg`.

Follow this procedure to extend a `direct-lvm` thin pool, substituting your
block device and other parameters to suit your situation.

1.  Gather information about your volume group.

    Use the `pvdisplay` command to find the physical block devices currently in
    use by your thin pool, and the volume group's name.

    ```console
    $ sudo pvdisplay |grep 'VG Name'

    PV Name               /dev/xvdf
    VG Name               docker
    ```

    In the following steps, substitute your block device or volume group name as
    appropriate.

2.  Extend the volume group, using the `vgextend` command with the `VG Name`
    from the previous step, and the name of your **new** block device.

    ```console
    $ sudo vgextend docker /dev/xvdg

    Physical volume "/dev/xvdg" successfully created.
    Volume group "docker" successfully extended
    ```

3.  Extend the `docker/thinpool` logical volume. This command uses 100% of the
    volume right away, without auto-extend. To extend the metadata thinpool
    instead, use `docker/thinpool_tmeta`.

    ```console
    $ sudo lvextend -l+100%FREE -n docker/thinpool

    Size of logical volume docker/thinpool_tdata changed from 95.00 GiB (24319 extents) to 198.00 GiB (50688 extents).
    Logical volume docker/thinpool_tdata successfully resized.
    ```

4.  Verify the new thin pool size using the `Data Space Available` field in the
    output of `docker info`. If you extended the `docker/thinpool_tmeta` logical
    volume instead, look for `Metadata Space Available`.

    ```bash
    Storage Driver: devicemapper
     Pool Name: docker-thinpool
     Pool Blocksize: 524.3 kB
     Base Device Size: 10.74 GB
     Backing Filesystem: xfs
     Data file:
     Metadata file:
     Data Space Used: 212.3 MB
     Data Space Total: 212.6 GB
     Data Space Available: 212.4 GB
     Metadata Space Used: 286.7 kB
     Metadata Space Total: 1.07 GB
     Metadata Space Available: 1.069 GB
    <...>
    ```

### Activate the `devicemapper` after reboot

If you reboot the host and find that the `docker` service failed to start,
look for the error, "Non existing device". You need to re-activate the
logical volumes with this command:

```console
$ sudo lvchange -ay docker/thinpool
```

## How the `devicemapper` storage driver works

> **Warning:**
> Do not directly manipulate any files or directories within
> `/var/lib/docker/`. These files and directories are managed by Docker.

Use the `lsblk` command to see the devices and their pools, from the operating
system's point of view:

```console
$ sudo lsblk

NAME                    MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT
xvda                    202:0    0    8G  0 disk
└─xvda1                 202:1    0    8G  0 part /
xvdf                    202:80   0  100G  0 disk
├─docker-thinpool_tmeta 253:0    0 1020M  0 lvm
│ └─docker-thinpool     253:2    0   95G  0 lvm
└─docker-thinpool_tdata 253:1    0   95G  0 lvm
  └─docker-thinpool     253:2    0   95G  0 lvm
```

Use the `mount` command to see the mount-point Docker is using:

```console
$ mount |grep devicemapper
/dev/xvda1 on /var/lib/docker/devicemapper type xfs (rw,relatime,seclabel,attr2,inode64,noquota)
```

When you use `devicemapper`, Docker stores image and layer contents in the
thinpool, and exposes them to containers by mounting them under
subdirectories of `/var/lib/docker/devicemapper/`.

### Image and container layers on-disk

The `/var/lib/docker/devicemapper/metadata/` directory contains metadata about
the Devicemapper configuration itself and about each image and container layer
that exist. The `devicemapper` storage driver uses snapshots, and this metadata
include information about those snapshots. These files are in JSON format.

The `/var/lib/docker/devicemapper/mnt/` directory contains a mount point for each image
and container layer that exists. Image layer mount points are empty, but a
container's mount point shows the container's filesystem as it appears from
within the container.

### Image layering and sharing

The `devicemapper` storage driver uses dedicated block devices rather than
formatted filesystems, and operates on files at the block level for maximum
performance during copy-on-write (CoW) operations.

#### Snapshots

Another feature of `devicemapper` is its use of snapshots (also sometimes called
_thin devices_ or _virtual devices_), which store the differences introduced in
each layer as very small, lightweight thin pools. Snapshots provide many
benefits:

- Layers which are shared in common between containers are only stored on disk
  once, unless they are writable. For instance, if you have 10 different
  images which are all based on `alpine`, the `alpine` image and all its
  parent images are only stored once each on disk.

- Snapshots are an implementation of a copy-on-write (CoW) strategy. This means
  that a given file or directory is only copied to the container's writable
  layer when it is modified or deleted by that container.

- Because `devicemapper` operates at the block level, multiple blocks in a
  writable layer can be modified simultaneously.

- Snapshots can be backed up using standard OS-level backup utilities. Just
  make a copy of `/var/lib/docker/devicemapper/`.

#### Devicemapper workflow

When you start Docker with the `devicemapper` storage driver, all objects
related to image and container layers are stored in
`/var/lib/docker/devicemapper/`, which is backed by one or more block-level
devices, either loopback devices (testing only) or physical disks.

- The _base device_ is the lowest-level object. This is the thin pool itself.
  You can examine it using `docker info`. It contains a filesystem. This base
  device is the starting point for every image and container layer. The base
  device is a Device Mapper implementation detail, rather than a Docker layer.

- Metadata about the base device and each image or container layer is stored in
  `/var/lib/docker/devicemapper/metadata/` in JSON format. These layers are
  copy-on-write snapshots, which means that they are empty until they diverge
  from their parent layers.

- Each container's writable layer is mounted on a mountpoint in
  `/var/lib/docker/devicemapper/mnt/`. An empty directory exists for each
  read-only image layer and each stopped container.

Each image layer is a snapshot of the layer below it. The lowest layer of each
image is a snapshot of the base device that exists in the pool. When you run a
container, it is a snapshot of the image the container is based on. The following
example shows a Docker host with two running containers. The first is a `ubuntu`
container and the second is a `busybox` container.

## How container reads and writes work with `devicemapper`

### Reading files

With `devicemapper`, reads happen at the block level. The diagram below shows
the high level process for reading a single block (`0x44f`) in an example
container.

An application makes a read request for block `0x44f` in the container. Because
the container is a thin snapshot of an image, it doesn't have the block, but it
has a pointer to the block on the nearest parent image where it does exist, and
it reads the block from there. The block now exists in the container's memory.

### Writing files

**Writing a new file**: With the `devicemapper` driver, writing new data to a
container is accomplished by an *allocate-on-demand* operation. Each block of
the new file is allocated in the container's writable layer and the block is
written there.

**Updating an existing file**: The relevant block of the file is read from the
nearest layer where it exists. When the container writes the file, only the
modified blocks are written to the container's writable layer.

**Deleting a file or directory**: When you delete a file or directory in a
container's writable layer, or when an image layer deletes a file that exists
in its parent layer, the `devicemapper` storage driver intercepts further read
attempts on that file or directory and responds that the file or directory does
not exist.

**Writing and then deleting a file**: If a container writes to a file and later
deletes the file, all of those operations happen in the container's writable
layer. In that case, if you are using `direct-lvm`, the blocks are freed. If you
use `loop-lvm`, the blocks may not be freed. This is another reason not to use
`loop-lvm` in production.
