---
title: "Device Mapper storage driver (deprecated) (part 2 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/device-mapper-driver.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Device Mapper storage driver (deprecated) (part 2 of 4)

## Configure Docker with the `devicemapper` storage driver

Before following these procedures, you must first meet all the
prerequisites.

### Configure `loop-lvm` mode for testing

This configuration is only appropriate for testing. The `loop-lvm` mode makes
use of a 'loopback' mechanism that allows files on the local disk to be
read from and written to as if they were an actual physical disk or block
device.
However, the addition of the loopback mechanism, and interaction with the OS
filesystem layer, means that IO operations can be slow and resource-intensive.
Use of loopback devices can also introduce race conditions.
However, setting up `loop-lvm` mode can help identify basic issues (such as
missing user space packages, kernel drivers, etc.) ahead of attempting the more
complex set up required to enable `direct-lvm` mode. `loop-lvm` mode should
therefore only be used to perform rudimentary testing prior to configuring
`direct-lvm`.

For production systems, see
Configure direct-lvm mode for production.

1. Stop Docker.

   ```console
   $ sudo systemctl stop docker
   ```

2.  Edit `/etc/docker/daemon.json`. If it does not yet exist, create it. Assuming
    that the file was empty, add the following contents.

    ```json
    {
      "storage-driver": "devicemapper"
    }
    ```

    See all storage options for each storage driver in the
    daemon reference documentation

    Docker does not start if the `daemon.json` file contains badly-formed JSON.

3.  Start Docker.

    ```console
    $ sudo systemctl start docker
    ```

4.  Verify that the daemon is using the `devicemapper` storage driver. Use the
    `docker info` command and look for `Storage Driver`.

    ```console
    $ docker info

      Containers: 0
        Running: 0
        Paused: 0
        Stopped: 0
      Images: 0
      Server Version: 17.03.1-ce
      Storage Driver: devicemapper
      Pool Name: docker-202:1-8413957-pool
      Pool Blocksize: 65.54 kB
      Base Device Size: 10.74 GB
      Backing Filesystem: xfs
      Data file: /dev/loop0
      Metadata file: /dev/loop1
      Data Space Used: 11.8 MB
      Data Space Total: 107.4 GB
      Data Space Available: 7.44 GB
      Metadata Space Used: 581.6 KB
      Metadata Space Total: 2.147 GB
      Metadata Space Available: 2.147 GB
      Thin Pool Minimum Free Space: 10.74 GB
      Udev Sync Supported: true
      Deferred Removal Enabled: false
      Deferred Deletion Enabled: false
      Deferred Deleted Device Count: 0
      Data loop file: /var/lib/docker/devicemapper/data
      Metadata loop file: /var/lib/docker/devicemapper/metadata
      Library Version: 1.02.135-RHEL7 (2016-11-16)
    <...>
    ```

  This host is running in `loop-lvm` mode, which is **not** supported on
  production systems. This is indicated by the fact that the `Data loop file`
  and a `Metadata loop file` are on files under
  `/var/lib/docker/devicemapper`. These are loopback-mounted
  sparse files. For production systems, see
  Configure direct-lvm mode for production.

### Configure direct-lvm mode for production

Production hosts using the `devicemapper` storage driver must use `direct-lvm`
mode. This mode uses block devices to create the thin pool. This is faster than
using loopback devices, uses system resources more efficiently, and block
devices can grow as needed. However, more setup is required than in `loop-lvm`
mode.

After you have satisfied the prerequisites, follow the steps
below to configure Docker to use the `devicemapper` storage driver in
`direct-lvm` mode.

> **Warning:**
> Changing the storage driver makes any containers you have already
> created inaccessible on the local system. Use `docker save` to save containers,
> and push existing images to Docker Hub or a private repository, so you do not
> need to recreate them later.

#### Allow Docker to configure direct-lvm mode

Docker can manage the block device for you, simplifying configuration of `direct-lvm`
mode. **This is appropriate for fresh Docker setups only.** You can only use a
single block device. If you need to use multiple block devices,
configure direct-lvm mode manually instead.
The following new configuration options are available:

| Option                          | Description                                                                                                                                                                        | Required? | Default | Example                            |
|:--------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------|:--------|:-----------------------------------|
| `dm.directlvm_device`           | The path to the block device to configure for `direct-lvm`.                                                                                                                        | Yes       |         | `dm.directlvm_device="/dev/xvdf"`  |
| `dm.thinp_percent`              | The percentage of space to use for storage from the passed in block device.                                                                                                        | No        | 95      | `dm.thinp_percent=95`              |
| `dm.thinp_metapercent`          | The percentage of space to use for metadata storage from the passed-in block device.                                                                                                   | No        | 1       | `dm.thinp_metapercent=1`           |
| `dm.thinp_autoextend_threshold` | The threshold for when lvm should automatically extend the thin pool as a percentage of the total storage space.                                                                   | No        | 80      | `dm.thinp_autoextend_threshold=80` |
| `dm.thinp_autoextend_percent`   | The percentage to increase the thin pool by when an autoextend is triggered.                                                                                                       | No        | 20      | `dm.thinp_autoextend_percent=20`   |
| `dm.directlvm_device_force`     | Whether to format the block device even if a filesystem already exists on it. If set to `false` and a filesystem is present, an error is logged and the filesystem is left intact. | No        | false   | `dm.directlvm_device_force=true`   |

Edit the `daemon.json` file and set the appropriate options, then restart Docker
for the changes to take effect. The following `daemon.json` configuration sets all of the
options in the table above.

```json
{
  "storage-driver": "devicemapper",
  "storage-opts": [
    "dm.directlvm_device=/dev/xdf",
    "dm.thinp_percent=95",
    "dm.thinp_metapercent=1",
    "dm.thinp_autoextend_threshold=80",
    "dm.thinp_autoextend_percent=20",
    "dm.directlvm_device_force=false"
  ]
}
```

See all storage options for each storage driver in the
daemon reference documentation

Restart Docker for the changes to take effect. Docker invokes the commands to
configure the block device for you.

> **Warning:**
> Changing these values after Docker has prepared the block device for you is
> not supported and causes an error.

You still need to perform periodic maintenance tasks.

#### Configure direct-lvm mode manually

The procedure below creates a logical volume configured as a thin pool to
use as backing for the storage pool. It assumes that you have a spare block
device at `/dev/xvdf` with enough free space to complete the task. The device
identifier and volume sizes may be different in your environment and you
should substitute your own values throughout the procedure. The procedure also
assumes that the Docker daemon is in the `stopped` state.

1.  Identify the block device you want to use. The device is located under
    `/dev/` (such as `/dev/xvdf`) and needs enough free space to store the
    images and container layers for the workloads that host runs.
    A solid state drive is ideal.

2.  Stop Docker.

    ```console
    $ sudo systemctl stop docker
    ```

3.  Install the following packages:

    - **RHEL / CentOS**: `device-mapper-persistent-data`, `lvm2`, and all
      dependencies

    - **Ubuntu / Debian / SLES 15**: `thin-provisioning-tools`, `lvm2`, and all
      dependencies

4.  Create a physical volume on your block device from step 1, using the
    `pvcreate` command. Substitute your device name for `/dev/xvdf`.

    > **Warning:**
    > The next few steps are destructive, so be sure that you have specified
    > the correct device.

    ```console
    $ sudo pvcreate /dev/xvdf

    Physical volume "/dev/xvdf" successfully created.
    ```

5.  Create a `docker` volume group on the same device, using the `vgcreate`
    command.

    ```console
    $ sudo vgcreate docker /dev/xvdf

    Volume group "docker" successfully created
    ```

6.  Create two logical volumes named `thinpool` and `thinpoolmeta` using the
    `lvcreate` command. The last parameter specifies the amount of free space
    to allow for automatic expanding of the data or metadata if space runs low,
    as a temporary stop-gap. These are the recommended values.

    ```console
    $ sudo lvcreate --wipesignatures y -n thinpool docker -l 95%VG

    Logical volume "thinpool" created.

    $ sudo lvcreate --wipesignatures y -n thinpoolmeta docker -l 1%VG

    Logical volume "thinpoolmeta" created.
    ```

7.  Convert the volumes to a thin pool and a storage location for metadata for
    the thin pool, using the `lvconvert` command.

    ```console
    $ sudo lvconvert -y \
    --zero n \
    -c 512K \
    --thinpool docker/thinpool \
    --poolmetadata docker/thinpoolmeta

    WARNING: Converting logical volume docker/thinpool and docker/thinpoolmeta to
    thin pool's data and metadata volumes with metadata wiping.
    THIS WILL DESTROY CONTENT OF LOGICAL VOLUME (filesystem etc.)
    Converted docker/thinpool to thin pool.
    ```

8.  Configure autoextension of thin pools via an `lvm` profile.

    ```console
    $ sudo vi /etc/lvm/profile/docker-thinpool.profile
    ```

9.  Specify `thin_pool_autoextend_threshold` and `thin_pool_autoextend_percent`
    values.

    `thin_pool_autoextend_threshold` is the percentage of space used before `lvm`
    attempts to autoextend the available space (100 = disabled, not recommended).

    `thin_pool_autoextend_percent` is the amount of space to add to the device
    when automatically extending (0 = disabled).

    The example below adds 20% more capacity when the disk usage reaches
    80%.

    ```text
    activation {
      thin_pool_autoextend_threshold=80
      thin_pool_autoextend_percent=20
    }
    ```

    Save the file.

10. Apply the LVM profile, using the `lvchange` command.

    ```console
    $ sudo lvchange --metadataprofile docker-thinpool docker/thinpool

    Logical volume docker/thinpool changed.
    ```

11. Ensure monitoring of the logical volume is enabled.

    ```console
    $ sudo lvs -o+seg_monitor

    LV       VG     Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert Monitor
    thinpool docker twi-a-t--- 95.00g             0.00   0.01                             not monitored
    ```

    If the output in the `Monitor` column reports, as above, that the volume is
    `not monitored`, then monitoring needs to be explicitly enabled. Without
    this step, automatic extension of the logical volume will not occur,
    regardless of any settings in the applied profile.

    ```console
    $ sudo lvchange --monitor y docker/thinpool
    ```

    Double check that monitoring is now enabled by running the
    `sudo lvs -o+seg_monitor` command a second time. The `Monitor` column
    should now report the logical volume is being `monitored`.

12. If you have ever run Docker on this host before, or if `/var/lib/docker/`
    exists, move it out of the way so that Docker can use the new LVM pool to
    store the contents of image and containers.

    ```console
    $ sudo su -
    # mkdir /var/lib/docker.bk
    # mv /var/lib/docker/* /var/lib/docker.bk
    # exit
    ```

    If any of the following steps fail and you need to restore, you can remove
    `/var/lib/docker` and replace it with `/var/lib/docker.bk`.

13. Edit `/etc/docker/daemon.json` and configure the options needed for the
    `devicemapper` storage driver. If the file was previously empty, it should
    now contain the following contents:

    ```json
    {
        "storage-driver": "devicemapper",
        "storage-opts": [
        "dm.thinpooldev=/dev/mapper/docker-thinpool",
        "dm.use_deferred_removal=true",
        "dm.use_deferred_deletion=true"
        ]
    }
    ```

14. Start Docker.

    **systemd**:

    ```console
    $ sudo systemctl start docker
    ```

    **service**:

    ```console
    $ sudo service docker start
    ```

15. Verify that Docker is using the new configuration using `docker info`.

    ```console
    $ docker info

    Containers: 0
     Running: 0
     Paused: 0
     Stopped: 0
    Images: 0
    Server Version: 17.03.1-ce
    Storage Driver: devicemapper
     Pool Name: docker-thinpool
     Pool Blocksize: 524.3 kB
     Base Device Size: 10.74 GB
     Backing Filesystem: xfs
     Data file:
     Metadata file:
     Data Space Used: 19.92 MB
     Data Space Total: 102 GB
     Data Space Available: 102 GB
     Metadata Space Used: 147.5 kB
     Metadata Space Total: 1.07 GB
     Metadata Space Available: 1.069 GB
     Thin Pool Minimum Free Space: 10.2 GB
     Udev Sync Supported: true
     Deferred Removal Enabled: true
     Deferred Deletion Enabled: true
     Deferred Deleted Device Count: 0
     Library Version: 1.02.135-RHEL7 (2016-11-16)
    <...>
    ```

    If Docker is configured correctly, the `Data file` and `Metadata file` is
    blank, and the pool name is `docker-thinpool`.

16. After you have verified that the configuration is correct, you can remove the
    `/var/lib/docker.bk` directory which contains the previous configuration.

    ```console
    $ sudo rm -rf /var/lib/docker.bk
    ```
