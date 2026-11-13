---
title: "OverlayFS storage driver (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/storage/drivers/overlayfs-driver.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# OverlayFS storage driver (part 2 of 2)

## How container reads and writes work with `overlay2`

### Reading files

Consider three scenarios where a container opens a file for read access with
overlay.

#### The file does not exist in the container layer

If a container opens a file for read access and the file does not already exist
in the container (`upperdir`) it is read from the image (`lowerdir`). This
incurs very little performance overhead.

#### The file only exists in the container layer

If a container opens a file for read access and the file exists in the
container (`upperdir`) and not in the image (`lowerdir`), it's read directly
from the container.

#### The file exists in both the container layer and the image layer

If a container opens a file for read access and the file exists in the image
layer and the container layer, the file's version in the container layer is
read. Files in the container layer (`upperdir`) obscure files with the same
name in the image layer (`lowerdir`).

### Modifying files or directories

Consider some scenarios where files in a container are modified.

#### Writing to a file for the first time

The first time a container writes to an existing file, that file does not
exist in the container (`upperdir`). The `overlay2` driver performs a
`copy_up` operation to copy the file from the image (`lowerdir`) to the
container (`upperdir`). The container then writes the changes to the new copy
of the file in the container layer.

However, OverlayFS works at the file level rather than the block level. This
means that all OverlayFS `copy_up` operations copy the entire file, even if
the file is large and only a small part of it's being modified. This can have
a noticeable impact on container write performance. However, two things are
worth noting:

- The `copy_up` operation only occurs the first time a given file is written
  to. Subsequent writes to the same file operate against the copy of the file
  already copied up to the container.

- OverlayFS works with multiple layers. This means that performance can be
  impacted when searching for files in images with many layers.

#### Deleting files and directories

- When a _file_ is deleted within a container, a _whiteout_ file is created in
  the container (`upperdir`). The version of the file in the image layer
  (`lowerdir`) is not deleted (because the `lowerdir` is read-only). However,
  the whiteout file prevents it from being available to the container.

- When a _directory_ is deleted within a container, an _opaque directory_ is
  created within the container (`upperdir`). This works in the same way as a
  whiteout file and effectively prevents the directory from being accessed,
  even though it still exists in the image (`lowerdir`).

#### Renaming directories

Calling `rename(2)` for a directory is allowed only when both the source and
the destination path are on the top layer. Otherwise, it returns `EXDEV` error
("cross-device link not permitted"). Your application needs to be designed to
handle `EXDEV` and fall back to a "copy and unlink" strategy.

## OverlayFS and Docker Performance

`overlay2` may perform better than `btrfs`. However, be aware of the following details:

### Page caching

OverlayFS supports page cache sharing. Multiple containers accessing the same
file share a single page cache entry for that file. This makes the `overlay2`
drivers efficient with memory and a good option for high-density use cases such
as PaaS.

### Copyup

As with other copy-on-write filesystems, OverlayFS performs copy-up operations
whenever a container writes to a file for the first time. This can add latency
into the write operation, especially for large files. However, once the file
has been copied up, all subsequent writes to that file occur in the upper
layer, without the need for further copy-up operations.

### Performance best practices

The following generic performance best practices apply to OverlayFS.

#### Use fast storage

Solid-state drives (SSDs) provide faster reads and writes than spinning disks.

#### Use volumes for write-heavy workloads

Volumes provide the best and most predictable performance for write-heavy
workloads. This is because they bypass the storage driver and don't incur any
of the potential overheads introduced by thin provisioning and copy-on-write.
Volumes have other benefits, such as allowing you to share data among
containers and persisting your data even if no running container is using them.

## Limitations on OverlayFS compatibility

To summarize the OverlayFS's aspect which is incompatible with other
filesystems:

`open(2)`
: OverlayFS only implements a subset of the POSIX standards.
This can result in certain OverlayFS operations breaking POSIX standards. One
such operation is the copy-up operation. Suppose that your application calls
`fd1=open("foo", O_RDONLY)` and then `fd2=open("foo", O_RDWR)`. In this case,
your application expects `fd1` and `fd2` to refer to the same file. However, due
to a copy-up operation that occurs after the second calling to `open(2)`, the
descriptors refer to different files. The `fd1` continues to reference the file
in the image (`lowerdir`) and the `fd2` references the file in the container
(`upperdir`). A workaround for this is to `touch` the files which causes the
copy-up operation to happen. All subsequent `open(2)` operations regardless of
read-only or read-write access mode reference the file in the
container (`upperdir`).

`yum` is known to be affected unless the `yum-plugin-ovl` package is installed.
If the `yum-plugin-ovl` package is not available in your distribution such as
RHEL/CentOS prior to 6.8 or 7.2, you may need to run `touch /var/lib/rpm/*`
before running `yum install`. This package implements the `touch` workaround
referenced above for `yum`.

`rename(2)`
: OverlayFS does not fully support the `rename(2)` system call. Your
application needs to detect its failure and fall back to a "copy and unlink"
strategy.
