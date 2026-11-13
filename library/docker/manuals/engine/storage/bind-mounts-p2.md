---
title: "Bind mounts (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/bind-mounts.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Bind mounts (part 2 of 2)

## Configure bind propagation

Bind propagation defaults to `rprivate` for both bind mounts and volumes. It is
only configurable for bind mounts, and only on Linux host machines. Bind
propagation is an advanced topic and many users never need to configure it.

Bind propagation refers to whether or not mounts created within a given
bind-mount can be propagated to replicas of that mount. Consider
a mount point `/mnt`, which is also mounted on `/tmp`. The propagation settings
control whether a mount on `/tmp/a` would also be available on `/mnt/a`. Each
propagation setting has a recursive counterpoint. In the case of recursion,
consider that `/tmp/a` is also mounted as `/foo`. The propagation settings
control whether `/mnt/a` and/or `/tmp/a` would exist.

> **Note:**
> Mount propagation doesn't work with Docker Desktop.

| Propagation setting | Description                                                                                                                                                                                                         |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `shared`            | Sub-mounts of the original mount are exposed to replica mounts, and sub-mounts of replica mounts are also propagated to the original mount.                                                                         |
| `slave`             | similar to a shared mount, but only in one direction. If the original mount exposes a sub-mount, the replica mount can see it. However, if the replica mount exposes a sub-mount, the original mount cannot see it. |
| `private`           | The mount is private. Sub-mounts within it are not exposed to replica mounts, and sub-mounts of replica mounts are not exposed to the original mount.                                                               |
| `rshared`           | The same as shared, but the propagation also extends to and from mount points nested within any of the original or replica mount points.                                                                            |
| `rslave`            | The same as slave, but the propagation also extends to and from mount points nested within any of the original or replica mount points.                                                                             |
| `rprivate`          | The default. The same as private, meaning that no mount points anywhere within the original or replica mount points propagate in either direction.                                                                  |

Before you can set bind propagation on a mount point, the host filesystem needs
to already support bind propagation.

For more information about bind propagation, see the
Linux kernel documentation for shared subtree.

The following example mounts the `target/` directory into the container twice,
and the second mount sets both the `ro` option and the `rslave` bind propagation
option.

The `--mount` and `-v` examples have the same result.

**`--mount`**

```console
$ docker run -d \
  -it \
  --name devtest \
  --mount type=bind,source="$(pwd)"/target,target=/app \
  --mount type=bind,source="$(pwd)"/target,target=/app2,readonly,bind-propagation=rslave \
  nginx:latest
```

**`-v`**

```console
$ docker run -d \
  -it \
  --name devtest \
  -v "$(pwd)"/target:/app \
  -v "$(pwd)"/target:/app2:ro,rslave \
  nginx:latest
```

Now if you create `/app/foo/`, `/app2/foo/` also exists.

## Configure the SELinux label

If you use SELinux, you can add the `z` or `Z` options to modify the SELinux
label of the host file or directory being mounted into the container. This
affects the file or directory on the host machine itself and can have
consequences outside of the scope of Docker.

- The `z` option indicates that the bind mount content is shared among multiple
  containers.
- The `Z` option indicates that the bind mount content is private and unshared.

Use extreme caution with these options. Bind-mounting a system directory
such as `/home` or `/usr` with the `Z` option renders your host machine
inoperable and you may need to relabel the host machine files by hand.

> **Important:**
>
> When using bind mounts with services, SELinux labels
> (`:Z` and `:z`), as well as `:ro` are ignored. See
> moby/moby #32579 for details.

This example sets the `z` option to specify that multiple containers can share
the bind mount's contents:

It is not possible to modify the SELinux label using the `--mount` flag.

```console
$ docker run -d \
  -it \
  --name devtest \
  -v "$(pwd)"/target:/app:z \
  nginx:latest
```

## Use a bind mount with Docker Compose

A single Docker Compose service with a bind mount looks like this:

```yaml
services:
  frontend:
    image: node:lts
    volumes:
      - type: bind
        source: ./static
        target: /opt/app/static
volumes:
  myapp:
```

For more information about using volumes of the `bind` type with Compose, see
Compose reference on the volumes top-level element.
and
Compose reference on the volume attribute.

## Next steps

- Learn about volumes.
- Learn about tmpfs mounts.
- Learn about image mounts.
- Learn about storage drivers.
