---
title: "Runtime metrics (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/containers/runmetrics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Runtime metrics (part 2 of 3)

## Control groups

Linux Containers rely on control groups
which not only track groups of processes, but also expose metrics about
CPU, memory, and block I/O usage. You can access those metrics and
obtain network usage metrics as well. This is relevant for "pure" LXC
containers, as well as for Docker containers.

Control groups are exposed through a pseudo-filesystem. In modern distributions, you
should find this filesystem under `/sys/fs/cgroup`. Under that directory, you
see multiple sub-directories, called `devices`, `freezer`, `blkio`, and so on.
Each sub-directory actually corresponds to a different cgroup hierarchy.

On older systems, the control groups might be mounted on `/cgroup`, without
distinct hierarchies. In that case, instead of seeing the sub-directories,
you see a bunch of files in that directory, and possibly some directories
corresponding to existing containers.

To figure out where your control groups are mounted, you can run:

```console
$ grep cgroup /proc/mounts
```

### Enumerate cgroups

The file layout of cgroups is significantly different between v1 and v2.

If `/sys/fs/cgroup/cgroup.controllers` is present on your system, you are using v2,
otherwise you are using v1.
Refer to the subsection that corresponds to your cgroup version.

cgroup v2 is used by default on the following distributions:

- Fedora (since 31)
- Debian GNU/Linux (since 11)
- Ubuntu (since 21.10)

> **Important:**
>
> The detailed metrics examples later in this page describe the cgroup v1 file
> layout. On cgroup v2 hosts, use this page to find the container's cgroup
> directory and then inspect the controller files in that directory (for
> example, `memory.*`, `cpu.*`, and `io.*`). For controller semantics, refer to
> the cgroup v2 kernel documentation.

#### cgroup v1

You can look into `/proc/cgroups` to see the different control group subsystems
known to the system, the hierarchy they belong to, and how many groups they contain.

You can also look at `/proc/<pid>/cgroup` to see which control groups a process
belongs to. The control group is shown as a path relative to the root of
the hierarchy mountpoint. `/` means the process hasn't been assigned to a
group, while `/lxc/pumpkin` indicates that the process is a member of a
container named `pumpkin`.

#### cgroup v2

On cgroup v2 hosts, the content of `/proc/cgroups` isn't meaningful.
See `/sys/fs/cgroup/cgroup.controllers` to the available controllers.

### Changing cgroup version

Changing cgroup version requires rebooting the entire system.

On systemd-based systems, cgroup v2 can be enabled by adding `systemd.unified_cgroup_hierarchy=1`
to the kernel command line.
To revert the cgroup version to v1, you need to set `systemd.unified_cgroup_hierarchy=0` instead.

If `grubby` command is available on your system (e.g. on Fedora), the command line can be modified as follows:

```console
$ sudo grubby --update-kernel=ALL --args="systemd.unified_cgroup_hierarchy=1"
```

If `grubby` command isn't available, edit the `GRUB_CMDLINE_LINUX` line in `/etc/default/grub`
and run `sudo update-grub`.

### Running Docker on cgroup v2

Docker supports cgroup v2 since Docker 20.10.
Running Docker on cgroup v2 also requires the following conditions to be satisfied:

- containerd: v1.4 or later
- runc: v1.0.0-rc91 or later
- Kernel: v4.15 or later (v5.2 or later is recommended)

Note that the cgroup v2 mode behaves slightly different from the cgroup v1 mode:

- The default cgroup driver (`dockerd --exec-opt native.cgroupdriver`) is `systemd` on v2, `cgroupfs` on v1.
- The default cgroup namespace mode (`docker run --cgroupns`) is `private` on v2, `host` on v1.
- The `docker run` flag `--oom-kill-disable` is discarded on v2.

### Find the cgroup for a given container

For each container, one cgroup is created in each hierarchy. On
older systems with older versions of the LXC userland tools, the name of
the cgroup is the name of the container. With more recent versions
of the LXC tools, the cgroup is `lxc/<container_name>.`

For Docker containers using cgroups, the cgroup name is the full
ID or long ID of the container. If a container shows up as ae836c95b4c3
in `docker ps`, its long ID might be something like
`ae836c95b4c3c9e9179e0e91015512da89fdec91612f63cebae57df9a5444c79`. You can
look it up with `docker inspect` or `docker ps --no-trunc`.

Putting everything together to look at the memory metrics for a Docker
container, take a look at the following paths:

- `/sys/fs/cgroup/memory/docker/<longid>/` on cgroup v1, `cgroupfs` driver
- `/sys/fs/cgroup/memory/system.slice/docker-<longid>.scope/` on cgroup v1, `systemd` driver
- `/sys/fs/cgroup/docker/<longid>/` on cgroup v2, `cgroupfs` driver
- `/sys/fs/cgroup/system.slice/docker-<longid>.scope/` on cgroup v2, `systemd` driver

### Metrics from cgroups: memory, CPU, block I/O (cgroup v1)

> **Note:**
>
> This section documents the cgroup v1 metric files and formats.
> For cgroup v2, inspect the relevant controller files in the container's
> cgroup directory and refer to
> the kernel documentation.

For each subsystem (memory, CPU, and block I/O), one or
more pseudo-files exist and contain statistics.

#### Memory metrics: `memory.stat`

Memory metrics are found in the `memory` cgroup. The memory
control group adds a little overhead, because it does very fine-grained
accounting of the memory usage on your host. Therefore, many distributions
chose to not enable it by default. Generally, to enable it, all you have
to do is to add some kernel command-line parameters:
`cgroup_enable=memory swapaccount=1`.

The metrics are in the pseudo-file `memory.stat`.
Here is what it looks like:

    cache 11492564992
    rss 1930993664
    mapped_file 306728960
    pgpgin 406632648
    pgpgout 403355412
    swap 0
    pgfault 728281223
    pgmajfault 1724
    inactive_anon 46608384
    active_anon 1884520448
    inactive_file 7003344896
    active_file 4489052160
    unevictable 32768
    hierarchical_memory_limit 9223372036854775807
    hierarchical_memsw_limit 9223372036854775807
    total_cache 11492564992
    total_rss 1930993664
    total_mapped_file 306728960
    total_pgpgin 406632648
    total_pgpgout 403355412
    total_swap 0
    total_pgfault 728281223
    total_pgmajfault 1724
    total_inactive_anon 46608384
    total_active_anon 1884520448
    total_inactive_file 7003344896
    total_active_file 4489052160
    total_unevictable 32768

The first half (without the `total_` prefix) contains statistics relevant
to the processes within the cgroup, excluding sub-cgroups. The second half
(with the `total_` prefix) includes sub-cgroups as well.

Some metrics are "gauges", or values that can increase or decrease. For instance,
`swap` is the amount of swap space used by the members of the cgroup.
Some others are "counters", or values that can only go up, because
they represent occurrences of a specific event. For instance, `pgfault`
indicates the number of page faults since the creation of the cgroup.

`cache`
: The amount of memory used by the processes of this control group that can be
associated precisely with a block on a block device. When you read from and
write to files on disk, this amount increases. This is the case if you use
"conventional" I/O (`open`, `read`, `write` syscalls) as well as mapped files
(with `mmap`). It also accounts for the memory used by `tmpfs` mounts, though
the reasons are unclear.

`rss`
: The amount of memory that doesn't correspond to anything on disk: stacks,
heaps, and anonymous memory maps.

`mapped_file`
: Indicates the amount of memory mapped by the processes in the control group.
It doesn't give you information about how much memory is used; it rather
tells you how it's used.

`pgfault`, `pgmajfault`
: Indicate the number of times that a process of the cgroup triggered a "page
fault" and a "major fault", respectively. A page fault happens when a process
accesses a virtual memory page that is not currently mapped to a physical
memory frame. This is a normal part of memory management. For example, a page
fault occurs when the process reads from a memory zone that has been swapped
out, or that corresponds to a memory-mapped file: in that case, the kernel
loads the page from disk and lets the CPU complete the memory access. It also
happens when the process writes to a copy-on-write memory zone: the kernel
duplicates the memory page and resumes the write operation on the process's
own copy of the page. "Major" faults happen when the kernel needs to read
data from disk. When it duplicates an existing page, or allocates an empty
page, it's a regular (or "minor") fault.

`swap`
: The amount of swap currently used by the processes in this cgroup.

`active_anon`, `inactive_anon`
: The amount of anonymous memory that has been identified has respectively
_active_ and _inactive_ by the kernel. "Anonymous" memory is the memory that is
_not_ linked to disk pages. In other words, that's the equivalent of the rss
counter described above. In fact, the very definition of the rss counter is
`active_anon` + `inactive_anon` - `tmpfs` (where tmpfs is the amount of
memory used up by `tmpfs` filesystems mounted by this control group). Now,
what's the difference between "active" and "inactive"? Pages are initially
"active"; and at regular intervals, the kernel sweeps over the memory, and tags
some pages as "inactive". Whenever they're accessed again, they're
immediately re-tagged "active". When the kernel is almost out of memory, and
time comes to swap out to disk, the kernel swaps "inactive" pages.

`active_file`, `inactive_file`
: Cache memory, with _active_ and _inactive_ similar to the _anon_ memory
above. The exact formula is `cache` = `active_file` + `inactive_file` +
`tmpfs`. The exact rules used by the kernel to move memory pages between
active and inactive sets are different from the ones used for anonymous memory,
but the general principle is the same. When the kernel needs to reclaim memory,
it's cheaper to reclaim a clean (=non modified) page from this pool, since it
can be reclaimed immediately (while anonymous pages and dirty/modified pages
need to be written to disk first).

`unevictable`
: The amount of memory that cannot be reclaimed; generally, it accounts for
memory that has been "locked" with `mlock`. It's often used by crypto
frameworks to make sure that secret keys and other sensitive material never
gets swapped out to disk.

`memory_limit`, `memsw_limit`
: These aren't really metrics, but a reminder of the limits applied to this
cgroup. The first one indicates the maximum amount of physical memory that can
be used by the processes of this control group; the second one indicates the
maximum amount of RAM+swap.

Accounting for memory in the page cache is very complex. If two
processes in different control groups both read the same file
(ultimately relying on the same blocks on disk), the corresponding
memory charge is split between the control groups. It's nice, but
it also means that when a cgroup is terminated, it could increase the
memory usage of another cgroup, because they're not splitting the cost
anymore for those memory pages.

### CPU metrics: `cpuacct.stat`

Now that we've covered memory metrics, everything else is
simple in comparison. CPU metrics are in the
`cpuacct` controller.

For each container, a pseudo-file `cpuacct.stat` contains the CPU usage
accumulated by the processes of the container, broken down into `user` and
`system` time. The distinction is:

- `user` time is the amount of time a process has direct control of the CPU,
  executing process code.
- `system` time is the time the kernel is executing system calls on behalf of
  the process.

Those times are expressed in ticks of 1/100th of a second, also called "user
jiffies". There are `USER_HZ` _"jiffies"_ per second, and on x86 systems,
`USER_HZ` is 100. Historically, this mapped exactly to the number of scheduler
"ticks" per second, but higher frequency scheduling and
tickless kernels have made the number of
ticks irrelevant.

#### Block I/O metrics

Block I/O is accounted in the `blkio` controller.
Different metrics are scattered across different files. While you can
find in-depth details in the blkio-controller
file in the kernel documentation, here is a short list of the most
relevant ones:

`blkio.sectors`
: Contains the number of 512-bytes sectors read and written by the processes
member of the cgroup, device by device. Reads and writes are merged in a single
counter.

`blkio.io_service_bytes`
: Indicates the number of bytes read and written by the cgroup. It has 4
counters per device, because for each device, it differentiates between
synchronous vs. asynchronous I/O, and reads vs. writes.

`blkio.io_serviced`
: The number of I/O operations performed, regardless of their size. It also has
4 counters per device.

`blkio.io_queued`
: Indicates the number of I/O operations currently queued for this cgroup. In
other words, if the cgroup isn't doing any I/O, this is zero. The opposite is
not true. In other words, if there is no I/O queued, it doesn't mean that the
cgroup is idle (I/O-wise). It could be doing purely synchronous reads on an
otherwise quiescent device, which can therefore handle them immediately,
without queuing. Also, while it's helpful to figure out which cgroup is
putting stress on the I/O subsystem, keep in mind that it's a relative
quantity. Even if a process group doesn't perform more I/O, its queue size can
increase just because the device load increases because of other devices.
