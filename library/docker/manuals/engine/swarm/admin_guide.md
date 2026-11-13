---
title: "Administer and maintain a swarm of Docker Engines (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/admin_guide.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Administer and maintain a swarm of Docker Engines

When you run a swarm of Docker Engines, manager nodes are the key components
for managing the swarm and storing the swarm state. It is important to
understand some key features of manager nodes to properly deploy and
maintain the swarm.

Refer to How nodes work
for a brief overview of Docker Swarm mode and the difference between manager and
worker nodes.

## Operate manager nodes in a swarm

Swarm manager nodes use the Raft Consensus Algorithm to manage the
swarm state. You only need to understand some general concepts of Raft in
order to manage a swarm.

There is no limit on the number of manager nodes. The decision about how many
manager nodes to implement is a trade-off between performance and
fault-tolerance. Adding manager nodes to a swarm makes the swarm more
fault-tolerant. However, additional manager nodes reduce write performance
because more nodes must acknowledge proposals to update the swarm state.
This means more network round-trip traffic.

Raft requires a majority of managers, also called the quorum, to agree on
proposed updates to the swarm, such as node additions or removals. Membership
operations are subject to the same constraints as state replication.

### Maintain the quorum of managers

If the swarm loses the quorum of managers, the swarm cannot perform management
tasks. If your swarm has multiple managers, always have more than two.
To maintain quorum, a majority of managers must be available. An odd number of
managers is recommended, because the next even number does not make the quorum
easier to keep. For instance, whether you have 3 or 4 managers, you can still
only lose 1 manager and maintain the quorum. If you have 5 or 6 managers, you
can still only lose two.

Even if a swarm loses the quorum of managers, swarm tasks on existing worker
nodes continue to run. However, swarm nodes cannot be added, updated, or
removed, and new or existing tasks cannot be started, stopped, moved, or
updated.

See Recovering from losing the quorum for
troubleshooting steps if you do lose the quorum of managers.

## Configure the manager to advertise on a static IP address

When initiating a swarm, you must specify the `--advertise-addr` flag to
advertise your address to other manager nodes in the swarm. For more
information, see Run Docker Engine in swarm mode. Because manager nodes are
meant to be a stable component of the infrastructure, you should use a *fixed
IP address* for the advertise address to prevent the swarm from becoming
unstable on machine reboot.

If the whole swarm restarts and every manager node subsequently gets a new IP
address, there is no way for any node to contact an existing manager. Therefore
the swarm is hung while nodes try to contact one another at their old IP addresses.

Dynamic IP addresses are OK for worker nodes.

## Add manager nodes for fault tolerance

You should maintain an odd number of managers in the swarm to support manager
node failures. Having an odd number of managers ensures that during a network
partition, there is a higher chance that the quorum remains available to process
requests if the network is partitioned into two sets. Keeping the quorum is not
guaranteed if you encounter more than two network partitions.

| Swarm Size |  Majority  |  Fault Tolerance  |
|:------------:|:----------:|:-----------------:|
|      1       |     1      |         0         |
|      2       |     2      |         0         |
|    **3**     |     2      |       **1**       |
|      4       |     3      |         1         |
|    **5**     |     3      |       **2**       |
|      6       |     4      |         2         |
|    **7**     |     4      |       **3**       |
|      8       |     5      |         3         |
|    **9**     |     5      |       **4**       |

For example, in a swarm with *5 nodes*, if you lose *3 nodes*, you don't have a
quorum. Therefore you can't add or remove nodes until you recover one of the
unavailable manager nodes or recover the swarm with disaster recovery
commands. See Recover from disaster.

While it is possible to scale a swarm down to a single manager node, it is
impossible to demote the last manager node. This ensures you maintain access to
the swarm and that the swarm can still process requests. Scaling down to a
single manager is an unsafe operation and is not recommended. If
the last node leaves the swarm unexpectedly during the demote operation, the
swarm becomes unavailable until you reboot the node or restart with
`--force-new-cluster`.

You manage swarm membership with the `docker swarm` and `docker node`
subsystems. Refer to Add nodes to a swarm for more information
on how to add worker nodes and promote a worker node to be a manager.

### Distribute manager nodes

In addition to maintaining an odd number of manager nodes, pay attention to
datacenter topology when placing managers. For optimal fault-tolerance, distribute
manager nodes across a minimum of 3 availability-zones to support failures of an
entire set of machines or common maintenance scenarios. If you suffer a failure
in any of those zones, the swarm should maintain the quorum of manager nodes
available to process requests and rebalance workloads.

| Swarm manager nodes |  Repartition (on 3 Availability zones) |
|:-------------------:|:--------------------------------------:|
| 3                   |                  1-1-1                 |
| 5                   |                  2-2-1                 |
| 7                   |                  3-2-2                 |
| 9                   |                  3-3-3                 |

### Run manager-only nodes

By default manager nodes also act as a worker nodes. This means the scheduler
can assign tasks to a manager node. For small and non-critical swarms
assigning tasks to managers is relatively low-risk as long as you schedule
services using resource constraints for cpu and memory.

However, because manager nodes use the Raft consensus algorithm to replicate data
in a consistent way, they are sensitive to resource starvation. You should
isolate managers in your swarm from processes that might block swarm
operations like swarm heartbeat or leader elections.

To avoid interference with manager node operation, you can drain manager nodes
to make them unavailable as worker nodes:

```console
$ docker node update --availability drain <NODE>
```

When you drain a node, the scheduler reassigns any tasks running on the node to
other available worker nodes in the swarm. It also prevents the scheduler from
assigning tasks to the node.

## Add worker nodes for load balancing

Add nodes to the swarm to balance your swarm's
load. Replicated service tasks are distributed across the swarm as evenly as
possible over time, as long as the worker nodes are matched to the requirements
of the services. When limiting a service to run on only specific types of nodes,
such as nodes with a specific number of CPUs or amount of memory, remember that
worker nodes that do not meet these requirements cannot run these tasks.

## Monitor swarm health

You can monitor the health of manager nodes by querying the docker `nodes` API
in JSON format through the `/nodes` HTTP endpoint. Refer to the
nodes API documentation
for more information.

From the command line, run `docker node inspect <id-node>` to query the nodes.
For instance, to query the reachability of the node as a manager:

```console
$ docker node inspect manager1 --format "{{ .ManagerStatus.Reachability }}"
reachable
```

To query the status of the node as a worker that accept tasks:

```console
$ docker node inspect manager1 --format "{{ .Status.State }}"
ready
```

From those commands, we can see that `manager1` is both at the status
`reachable` as a manager and `ready` as a worker.

An `unreachable` health status means that this particular manager node is unreachable
from other manager nodes. In this case you need to take action to restore the unreachable
manager:

- Restart the daemon and see if the manager comes back as reachable.
- Reboot the machine.
- If neither restarting nor rebooting works, you should add another manager node or promote a worker to be a manager node. You also need to cleanly remove the failed node entry from the manager set with `docker node demote <NODE>` and `docker node rm <id-node>`.

Alternatively you can also get an overview of the swarm health from a manager
node with `docker node ls`:

```console
$ docker node ls
ID                           HOSTNAME  MEMBERSHIP  STATUS  AVAILABILITY  MANAGER STATUS
1mhtdwhvsgr3c26xxbnzdc3yp    node05    Accepted    Ready   Active
516pacagkqp2xc3fk9t1dhjor    node02    Accepted    Ready   Active        Reachable
9ifojw8of78kkusuc4a6c23fx *  node01    Accepted    Ready   Active        Leader
ax11wdpwrrb6db3mfjydscgk7    node04    Accepted    Ready   Active
bb1nrq2cswhtbg4mrsqnlx1ck    node03    Accepted    Ready   Active        Reachable
di9wxgz8dtuh9d2hn089ecqkf    node06    Accepted    Ready   Active
```

## Troubleshoot a manager node

You should never restart a manager node by copying the `raft` directory from another node. The data directory is unique to a node ID. A node can only use a node ID once to join the swarm. The node ID space should be globally unique.

To cleanly re-join a manager node to a cluster:

1. Demote the node to a worker using `docker node demote <NODE>`.
2. Remove the node from the swarm using `docker node rm <NODE>`.
3. Re-join the node to the swarm with a fresh state using `docker swarm join`.

For more information on joining a manager node to a swarm, refer to
Join nodes to a swarm.

## Forcibly remove a node

In most cases, you should shut down a node before removing it from a swarm with
the `docker node rm` command. If a node becomes unreachable, unresponsive, or
compromised you can forcefully remove the node without shutting it down by
passing the `--force` flag. For instance, if `node9` becomes compromised:

```console
$ docker node rm node9

Error response from daemon: rpc error: code = 9 desc = node node9 is not down and can't be removed

$ docker node rm --force node9

Node node9 removed from swarm
```

Before you forcefully remove a manager node, you must first demote it to the
worker role. Make sure that you always have an odd number of manager nodes if
you demote or remove a manager.

## Back up the swarm

Docker manager nodes store the swarm state and manager logs in the
`/var/lib/docker/swarm/` directory. This data includes the keys used to encrypt
the Raft logs. Without these keys, you cannot restore the swarm.

You can back up the swarm using any manager. Use the following procedure.

1.  If the swarm has auto-lock enabled, you need the unlock key
    to restore the swarm from backup. Retrieve the unlock key if necessary and
    store it in a safe location. If you are unsure, read
    Lock your swarm to protect its encryption key.

2.  Stop Docker on the manager before backing up the data, so that no data is
    being changed during the backup. It is possible to take a backup while the
    manager is running (a "hot" backup), but this is not recommended and your
    results are less predictable when restoring. While the manager is down,
    other nodes continue generating swarm data that is not part of this backup.

    > **Note:**
    >
    > Be sure to maintain the quorum of swarm managers. During the
    > time that a manager is shut down, your swarm is more vulnerable to
    > losing the quorum if further nodes are lost. The number of managers you
    > run is a trade-off. If you regularly take down managers to do backups,
    > consider running a five manager swarm, so that you can lose an additional
    > manager while the backup is running, without disrupting your services.

3.  Back up the entire `/var/lib/docker/swarm` directory.

4.  Restart the manager.

To restore, see Restore from a backup.
