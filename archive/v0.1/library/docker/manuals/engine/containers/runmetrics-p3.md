---
title: "Runtime metrics (part 3 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/containers/runmetrics.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Runtime metrics (part 3 of 3)

### Network metrics

Network metrics aren't exposed directly by control groups. There is a
good explanation for that: network interfaces exist within the context
of _network namespaces_. The kernel could probably accumulate metrics
about packets and bytes sent and received by a group of processes, but
those metrics wouldn't be very useful. You want per-interface metrics
(because traffic happening on the local `lo`
interface doesn't really count). But since processes in a single cgroup
can belong to multiple network namespaces, those metrics would be harder
to interpret: multiple network namespaces means multiple `lo`
interfaces, potentially multiple `eth0`
interfaces, etc.; so this is why there is no easy way to gather network
metrics with control groups.

Instead you can gather network metrics from other sources.

#### iptables

iptables (or rather, the netfilter framework for which iptables is just
an interface) can do some serious accounting.

For instance, you can setup a rule to account for the outbound HTTP
traffic on a web server:

```console
$ iptables -I OUTPUT -p tcp --sport 80
```

There is no `-j` or `-g` flag,
so the rule just counts matched packets and goes to the following
rule.

Later, you can check the values of the counters, with:

```console
$ iptables -nxvL OUTPUT
```

Technically, `-n` isn't required, but it
prevents iptables from doing DNS reverse lookups, which are probably
useless in this scenario.

Counters include packets and bytes. If you want to setup metrics for
container traffic like this, you could execute a `for`
loop to add two `iptables` rules per
container IP address (one in each direction), in the `FORWARD`
chain. This only meters traffic going through the NAT
layer; you also need to add traffic going through the userland
proxy.

Then, you need to check those counters on a regular basis. If you
happen to use `collectd`, there is a nice plugin
to automate iptables counters collection.

#### Interface-level counters

Since each container has a virtual Ethernet interface, you might want to check
directly the TX and RX counters of this interface. Each container is associated
to a virtual Ethernet interface in your host, with a name like `vethKk8Zqi`.
Figuring out which interface corresponds to which container is, unfortunately,
difficult.

But for now, the best way is to check the metrics _from within the
containers_. To accomplish this, you can run an executable from the host
environment within the network namespace of a container using **ip-netns
magic**.

The `ip-netns exec` command allows you to execute any
program (present in the host system) within any network namespace
visible to the current process. This means that your host can
enter the network namespace of your containers, but your containers
can't access the host or other peer containers.
Containers can interact with their sub-containers, though.

The exact format of the command is:

```console
$ ip netns exec <nsname> <command...>
```

For example:

```console
$ ip netns exec mycontainer netstat -i
```

`ip netns` finds the `mycontainer` container by
using namespaces pseudo-files. Each process belongs to one network
namespace, one PID namespace, one `mnt` namespace,
etc., and those namespaces are materialized under
`/proc/<pid>/ns/`. For example, the network
namespace of PID 42 is materialized by the pseudo-file
`/proc/42/ns/net`.

When you run `ip netns exec mycontainer ...`, it
expects `/var/run/netns/mycontainer` to be one of
those pseudo-files. (Symlinks are accepted.)

In other words, to execute a command within the network namespace of a
container, we need to:

- Find out the PID of any process within the container that we want to investigate;
- Create a symlink from `/var/run/netns/<somename>` to `/proc/<thepid>/ns/net`
- Execute `ip netns exec <somename> ....`

Review Enumerate Cgroups for how to find
the cgroup of an in-container process whose network usage you want to measure.
From there, you can examine the pseudo-file named
`tasks`, which contains all the PIDs in the
cgroup (and thus, in the container). Pick any one of the PIDs.

Putting everything together, if the "short ID" of a container is held in
the environment variable `$CID`, then you can do this:

```console
$ TASKS=/sys/fs/cgroup/devices/docker/$CID*/tasks
$ PID=$(head -n 1 $TASKS)
$ mkdir -p /var/run/netns
$ ln -sf /proc/$PID/ns/net /var/run/netns/$CID
$ ip netns exec $CID netstat -i
```

## Tips for high-performance metric collection

Running a new process each time you want to update metrics is
(relatively) expensive. If you want to collect metrics at high
resolutions, and/or over a large number of containers (think 1000
containers on a single host), you don't want to fork a new process each
time.

Here is how to collect metrics from a single process. You need to
write your metric collector in C (or any language that lets you do
low-level system calls). You need to use a special system call,
`setns()`, which lets the current process enter any
arbitrary namespace. It requires, however, an open file descriptor to
the namespace pseudo-file (remember: that's the pseudo-file in
`/proc/<pid>/ns/net`).

However, there is a catch: you must not keep this file descriptor open.
If you do, when the last process of the control group exits, the
namespace isn't destroyed, and its network resources (like the
virtual interface of the container) stays around forever (or until
you close that file descriptor).

The right approach would be to keep track of the first PID of each
container, and re-open the namespace pseudo-file each time.

## Collect metrics when a container exits

Sometimes, you don't care about real time metric collection, but when a
container exits, you want to know how much CPU, memory, etc. it has
used.

Docker makes this difficult because it relies on `lxc-start`, which carefully
cleans up after itself. It is usually easier to collect metrics at regular
intervals, and this is the way the `collectd` LXC plugin works.

But, if you'd still like to gather the stats when a container stops,
here is how:

For each container, start a collection process, and move it to the
control groups that you want to monitor by writing its PID to the tasks
file of the cgroup. The collection process should periodically re-read
the tasks file to check if it's the last process of the control group.
(If you also want to collect network statistics as explained in the
previous section, you should also move the process to the appropriate
network namespace.)

When the container exits, `lxc-start` attempts to
delete the control groups. It fails, since the control group is
still in use; but that's fine. Your process should now detect that it is
the only one remaining in the group. Now is the right time to collect
all the metrics you need!

Finally, your process should move itself back to the root control group,
and remove the container control group. To remove a control group, just
`rmdir` its directory. It's counter-intuitive to
`rmdir` a directory as it still contains files; but
remember that this is a pseudo-filesystem, so usual rules don't apply.
After the cleanup is done, the collection process can exit safely.
