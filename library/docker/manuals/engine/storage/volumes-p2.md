---
title: "Volumes (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/volumes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Volumes (part 2 of 2)

## Use a read-only volume

For some applications, the container needs to write to the volume. At other
times, the container only needs read access to the data. Multiple
containers can mount the same volume. You can simultaneously mount a
single volume as `read-write` for some containers and as `read-only` for others.

The following example changes the previous one. It mounts the directory as a read-only
volume, by adding `ro` to the (empty by default) list of options, after the
mount point within the container. Where multiple options are present, you can separate
them using commas.

The `--mount` and `-v` examples have the same result.

**`--mount`**

```console
$ docker run -d \
  --name=nginxtest \
  --mount source=nginx-vol,destination=/usr/share/nginx/html,readonly \
  nginx:latest
```

**`-v`**

```console
$ docker run -d \
  --name=nginxtest \
  -v nginx-vol:/usr/share/nginx/html:ro \
  nginx:latest
```

Use `docker inspect nginxtest` to verify that Docker created the read-only mount
correctly. Look for the `Mounts` section:

```json
"Mounts": [
    {
        "Type": "volume",
        "Name": "nginx-vol",
        "Source": "/var/lib/docker/volumes/nginx-vol/_data",
        "Destination": "/usr/share/nginx/html",
        "Driver": "local",
        "Mode": "",
        "RW": false,
        "Propagation": ""
    }
],
```

Stop and remove the container, and remove the volume. Volume removal is a
separate step.

```console
$ docker container stop nginxtest

$ docker container rm nginxtest

$ docker volume rm nginx-vol
```

## Mount a volume subdirectory

When you mount a volume to a container, you can specify a subdirectory of the
volume to use, with the `volume-subpath` parameter for the `--mount` flag. The
subdirectory that you specify must exist in the volume before you attempt to
mount it into a container; if it doesn't exist, the mount fails.

Specifying `volume-subpath` is useful if you only want to share a specific
portion of a volume with a container. Say for example that you have multiple
containers running and you want to store logs from each container in a shared
volume. You can create a subdirectory for each container in the shared volume,
and mount the subdirectory to the container.

The following example creates a `logs` volume and initiates the subdirectories
`app1` and `app2` in the volume. It then starts two containers and mounts one
of the subdirectories of the `logs` volume to each container. This example
assumes that the processes in the containers write their logs to
`/var/log/app1` and `/var/log/app2`.

```console
$ docker volume create logs
$ docker run --rm \
  --mount src=logs,dst=/logs \
  alpine mkdir -p /logs/app1 /logs/app2
$ docker run -d \
  --name=app1 \
  --mount src=logs,dst=/var/log/app1,volume-subpath=app1 \
  app1:latest
$ docker run -d \
  --name=app2 \
  --mount src=logs,dst=/var/log/app2,volume-subpath=app2 \
  app2:latest
```

With this setup, the containers write their logs to separate subdirectories of
the `logs` volume. The containers can't access the other container's logs.

## Share data between machines

When building fault-tolerant applications, you may need to configure multiple
replicas of the same service to have access to the same files.

There are several ways to achieve this when developing your applications.
One is to add logic to your application to store files on a cloud object
storage system like Amazon S3. Another is to create volumes with a driver that
supports writing files to an external storage system like NFS or Amazon S3.

Volume drivers let you abstract the underlying storage system from the
application logic. For example, if your services use a volume with an NFS
driver, you can update the services to use a different driver. For example, to
store data in the cloud, without changing the application logic.

## Use a volume driver

When you create a volume using `docker volume create`, or when you start a
container which uses a not-yet-created volume, you can specify a volume driver.
The following examples use the `rclone/docker-volume-rclone` volume driver, first when creating
a standalone volume, and then when starting a container which creates a new
volume.

> **Note:**
>
> If your volume driver accepts a comma-separated list as an option,
> you must escape the value from the outer CSV parser. To escape a `volume-opt`,
> surround it with double quotes (`"`) and surround the entire mount parameter
> with single quotes (`'`).
>
> For example, the `local` driver accepts mount options as a comma-separated
> list in the `o` parameter. This example shows the correct way to escape the list.
>
> ```console
> $ docker service create \
>  --mount 'type=volume,src=<VOLUME-NAME>,dst=<CONTAINER-PATH>,volume-driver=local,volume-opt=type=nfs,volume-opt=device=<nfs-server>:<nfs-path>,"volume-opt=o=addr=<nfs-address>,vers=4,soft,timeo=180,bg,tcp,rw"'
>  --name myservice \
>  <IMAGE>
> ```

### Initial setup

The following example assumes that you have two nodes, the first of which is a Docker
host and can connect to the second node using SSH.

On the Docker host, install the `rclone/docker-volume-rclone` plugin:

```console
$ docker plugin install --grant-all-permissions rclone/docker-volume-rclone --alias rclone
```

### Create a volume using a volume driver

This example mounts the `/remote` directory on host `1.2.3.4` into a
volume named `rclonevolume`. Each volume driver may have zero or more
configurable options, you specify each of them using an `-o` flag.

```console
$ docker volume create \
  -d rclone \
  --name rclonevolume \
  -o type=sftp \
  -o path=remote \
  -o sftp-host=1.2.3.4 \
  -o sftp-user=user \
  -o "sftp-password=$(cat file_containing_password_for_remote_host)"
```

This volume can now be mounted into containers.

### Start a container which creates a volume using a volume driver

> **Note:**
>
> If the volume driver requires you to pass any options,
> you must use the `--mount` flag to mount the volume, and not `-v`.

```console
$ docker run -d \
  --name rclone-container \
  --mount type=volume,volume-driver=rclone,src=rclonevolume,target=/app,volume-opt=type=sftp,volume-opt=path=remote, volume-opt=sftp-host=1.2.3.4,volume-opt=sftp-user=user,volume-opt=-o "sftp-password=$(cat file_containing_password_for_remote_host)" \
  nginx:latest
```

### Create a service which creates an NFS volume

The following example shows how you can create an NFS volume when creating a service.
It uses `10.0.0.10` as the NFS server and `/var/docker-nfs` as the exported directory on the NFS server.
Note that the volume driver specified is `local`.

#### NFSv3

```console
$ docker service create -d \
  --name nfs-service \
  --mount 'type=volume,source=nfsvolume,target=/app,volume-driver=local,volume-opt=type=nfs,volume-opt=device=:/var/docker-nfs,volume-opt=o=addr=10.0.0.10' \
  nginx:latest
```

#### NFSv4

```console
$ docker service create -d \
    --name nfs-service \
    --mount 'type=volume,source=nfsvolume,target=/app,volume-driver=local,volume-opt=type=nfs,volume-opt=device=:/var/docker-nfs,"volume-opt=o=addr=10.0.0.10,rw,nfsvers=4,async"' \
    nginx:latest
```

### Create CIFS/Samba volumes

You can mount a Samba share directly in Docker without configuring a mount point on your host.

```console
$ docker volume create \
	--driver local \
	--opt type=cifs \
	--opt device=//uxxxxx.your-server.de/backup \
	--opt o=addr=uxxxxx.your-server.de,username=uxxxxxxx,password=*****,file_mode=0777,dir_mode=0777 \
	--name cifs-volume
```

The `addr` option is required if you specify a hostname instead of an IP.
This lets Docker perform the hostname lookup.

### Block storage devices

You can mount a block storage device, such as an external drive or a drive partition, to a container.
The following example shows how to create and use a file as a block storage device,
and how to mount the block device as a container volume.

> **Important:**
>
> The following procedure is only an example.
> The solution illustrated here isn't recommended as a general practice.
> Don't attempt this approach unless you're confident about what you're doing.

#### How mounting block devices works

Under the hood, the `--mount` flag using the `local` storage driver invokes the
Linux `mount` syscall and forwards the options you pass to it unaltered.
Docker doesn't implement any additional functionality on top of the native mount features supported by the Linux kernel.

If you're familiar with the
Linux `mount` command,
you can think of the `--mount` options as forwarded to the `mount` command in the following manner:

```console
$ mount -t <mount.volume-opt.type> <mount.volume-opt.device> <mount.dst> -o <mount.volume-opts.o>
```

To explain this further, consider the following `mount` command example.
This command mounts the `/dev/loop5` device to the path `/external-drive` on the system.

```console
$ mount -t ext4 /dev/loop5 /external-drive
```

The following `docker run` command achieves a similar result, from the point of view of the container being run.
Running a container with this `--mount` option sets up the mount in the same way as if you had executed the
`mount` command from the previous example.

```console
$ docker run \
  --mount='type=volume,dst=/external-drive,volume-driver=local,volume-opt=device=/dev/loop5,volume-opt=type=ext4'
```

You can't run the `mount` command inside the container directly,
because the container is unable to access the `/dev/loop5` device.
That's why the `docker run` command uses the `--mount` option.

#### Example: Mounting a block device in a container

The following steps create an `ext4` filesystem and mounts it into a container.
The filesystem support of your system depends on the version of the Linux kernel you are using.

1. Create a file and allocate some space to it:

   ```console
   $ fallocate -l 1G disk.raw
   ```

2. Build a filesystem onto the `disk.raw` file:

   ```console
   $ mkfs.ext4 disk.raw
   ```

3. Create a loop device:

   ```console
   $ losetup -f --show disk.raw
   /dev/loop5
   ```

   > **Note:**
   >
   > `losetup` creates an ephemeral loop device that's removed after
   > system reboot, or manually removed with `losetup -d`.

4. Run a container that mounts the loop device as a volume:

   ```console
   $ docker run -it --rm \
     --mount='type=volume,dst=/external-drive,volume-driver=local,volume-opt=device=/dev/loop5,volume-opt=type=ext4' \
     ubuntu bash
   ```

   When the container starts, the path `/external-drive` mounts the
   `disk.raw` file from the host filesystem as a block device.

5. When you're done, and the device is unmounted from the container,
   detach the loop device to remove the device from the host system:

   ```console
   $ losetup -d /dev/loop5
   ```

## Back up, restore, or migrate data volumes

Volumes are useful for backups, restores, and migrations.
Use the `--volumes-from` flag to create a new container that mounts that volume.

### Back up a volume

For example, create a new container named `dbstore`:

```console
$ docker run -v /dbdata --name dbstore ubuntu /bin/bash
```

In the next command:

- Launch a new container and mount the volume from the `dbstore` container
- Mount a local host directory as `/backup`
- Pass a command that tars the contents of the `dbdata` volume to a `backup.tar` file inside the `/backup` directory.

```console
$ docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata
```

When the command completes and the container stops, it creates a backup of
the `dbdata` volume.

### Restore volume from a backup

With the backup just created, you can restore it to the same container,
or to another container that you created elsewhere.

For example, create a new container named `dbstore2`:

```console
$ docker run -v /dbdata --name dbstore2 ubuntu /bin/bash
```

Then, un-tar the backup file in the new container’s data volume:

```console
$ docker run --rm --volumes-from dbstore2 -v $(pwd):/backup ubuntu bash -c "cd /dbdata && tar xvf /backup/backup.tar --strip 1"
```

You can use these techniques to automate backup, migration, and restore
testing using your preferred tools.

## Remove volumes

A Docker data volume persists after you delete a container. There are two types
of volumes to consider:

- Named volumes have a specific name, for example, `awesome:/bar`, where `awesome` is the name.
- Anonymous volumes have no specific name. Therefore, when the container is deleted, you can instruct the Docker Engine daemon to remove them.

### Remove anonymous volumes

To automatically remove anonymous volumes, use the `--rm` option. For example,
this command creates an anonymous `/foo` volume. When you remove the container,
the Docker Engine removes the `/foo` volume but not the `awesome` volume.

The `--rm` option works with both foreground and detached (`-d`) containers.
The anonymous volumes are cleaned up when the container exits.

```console
$ docker run --rm -v /foo -v awesome:/bar busybox top
```

> **Note:**
>
> If another container binds the volumes with
> `--volumes-from`, the volume definitions are _copied_ and the
> anonymous volume also stays after the first container is removed.

### Remove all volumes

To remove all unused volumes and free up space:

```console
$ docker volume prune
```

## Next steps

- Learn about bind mounts.
- Learn about tmpfs mounts.
- Learn about image mounts.
- Learn about storage drivers.
- Learn about third-party volume driver plugins.
