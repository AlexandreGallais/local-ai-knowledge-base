---
title: "podman.1 (part 3 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman.1.md"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman.1 (part 3 of 3)

## Rootless mode
Podman can also be used as non-root user. When podman runs in rootless mode, a user namespace is automatically created for the user, defined in `/etc/subuid` and `/etc/subgid`.

Containers created by a non-root user are not visible to other users and are not seen or managed by Podman running as root.

It is required to have multiple UIDS/GIDS set for a user.  Be sure the user is present in the files `/etc/subuid` and `/etc/subgid`.

Execute the following commands to add the ranges to the files

	$ sudo usermod --add-subuids 10000-75535 USERNAME
	$ sudo usermod --add-subgids 10000-75535 USERNAME

Or just add the content manually.

	$ echo USERNAME:10000:65536 >> /etc/subuid
	$ echo USERNAME:10000:65536 >> /etc/subgid

See the `subuid(5)` and `subgid(5)` man pages for more information.

Note: whitespace in any row of `/etc/subuid` or `/etc/subgid`, including trailing blanks, may result in no entry failures.

Images are pulled under `XDG_DATA_HOME` when specified, otherwise in the home directory of the user under `.local/share/containers/storage`.

Currently pasta is required to be installed to create a network
device, otherwise rootless containers need to run in the network namespace of
the host.

In certain environments like HPC (High Performance Computing), users cannot take advantage of the additional UIDs and GIDs from the `/etc/subuid` and `/etc/subgid` systems.  However, in this environment, rootless Podman can operate with a single UID.  To make this work, set the `ignore_chown_errors` option in the `containers-storage.conf(5)` file. This option tells Podman when pulling an image to ignore chown errors when attempting to change a file in a container image to match the non-root UID in the image. This means all files get saved as the user's UID. Note this can cause issues when running the container.

### **NOTE:** Unsupported file systems in rootless mode

The Overlay file system (OverlayFS) is not supported with kernels prior to 5.12.9 in rootless mode.  The fuse-overlayfs package is a tool that provides the functionality of OverlayFS in user namespace that allows mounting file systems in rootless environments.  It is recommended to install the fuse-overlayfs package.  In rootless mode, Podman automatically uses the fuse-overlayfs program as the mount_program if installed, as long as the `$HOME/.config/containers/storage.conf` file was not previously created.  If storage.conf exists in the homedir, add `mount_program = "/usr/bin/fuse-overlayfs"` under `[storage.options.overlay]` to enable this feature.

The Network File System (NFS) and other distributed file systems (for example: Lustre, Spectrum Scale, the General Parallel File System (GPFS)) are not supported when running in rootless mode as these file systems do not understand user namespace.  However, rootless Podman can make use of an NFS Homedir by modifying the `$HOME/.config/containers/storage.conf` to have the `graphroot` option point to a directory stored on local (Non NFS) storage.

## SEE ALSO
**containers-mounts.conf(5)**, **containers.conf(5)**, **containers-registries.conf(5)**, **containers-storage.conf(5)**, **buildah(1)**, **oci-hooks(5)**, **containers-policy.json(5)**, **crun(1)**, **runc(8)**, **subuid(5)**, **subgid(5)**, **pasta(1)**, **conmon(8)**, **podman-quadlet(1)**, **podman-systemd.unit(5)**

### Troubleshooting

See podman-troubleshooting(7)
for solutions to common issues.

See podman-rootless(7)
for rootless issues.

## HISTORY
Dec 2016, Originally compiled by Dan Walsh <dwalsh@redhat.com>
