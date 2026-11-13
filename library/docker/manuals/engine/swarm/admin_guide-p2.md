---
title: "Administer and maintain a swarm of Docker Engines (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/admin_guide.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Administer and maintain a swarm of Docker Engines (part 2 of 2)

## Recover from disaster

### Restore from a backup

After backing up the swarm as described in
Back up the swarm, use the following procedure to
restore the data to a new swarm.

1.  Shut down Docker on the target host machine for the restored swarm.

2.  Remove the contents of the `/var/lib/docker/swarm` directory on the new
    swarm.

3.  Restore the `/var/lib/docker/swarm` directory with the contents of the
    backup.

    > **Note:**
    >
    > The new node uses the same encryption key for on-disk
    > storage as the old one. It is not possible to change the on-disk storage
    > encryption keys at this time.
    >
    > In the case of a swarm with auto-lock enabled, the unlock key is also the
    > same as on the old swarm, and the unlock key is needed to restore the
    > swarm.

4.  Start Docker on the new node. Unlock the swarm if necessary. Re-initialize
    the swarm using the following command, so that this node does not attempt
    to connect to nodes that were part of the old swarm, and presumably no
    longer exist.

    ```console
    $ docker swarm init --force-new-cluster
    ```

5.  Verify that the state of the swarm is as expected. This may include
    application-specific tests or simply checking the output of
    `docker service ls` to be sure that all expected services are present.

6.  If you use auto-lock,
    rotate the unlock key.

7.  Add manager and worker nodes to bring your new swarm up to operating
    capacity.

8.  Reinstate your previous backup regimen on the new swarm.

### Recover from losing the quorum

Swarm is resilient to failures and can recover from any number
of temporary node failures (machine reboots or crash with restart) or other
transient errors. However, a swarm cannot automatically recover if it loses a
quorum. Tasks on existing worker nodes continue to run, but administrative
tasks are not possible, including scaling or updating services and joining or
removing nodes from the swarm. The best way to recover is to bring the missing
manager nodes back online. If that is not possible, continue reading for some
options for recovering your swarm.

In a swarm of `N` managers, a quorum (a majority) of manager nodes must always
be available. For example, in a swarm with five managers, a minimum of three must be
operational and in communication with each other. In other words, the swarm can
tolerate up to `(N-1)/2` permanent failures beyond which requests involving
swarm management cannot be processed. These types of failures include data
corruption or hardware failures.

If you lose the quorum of managers, you cannot administer the swarm. If you have
lost the quorum and you attempt to perform any management operation on the swarm,
an error occurs:

```text
Error response from daemon: rpc error: code = 4 desc = context deadline exceeded
```

The best way to recover from losing the quorum is to bring the failed nodes back
online. If you can't do that, the only way to recover from this state is to use
the `--force-new-cluster` action from a manager node. This removes all managers
except the manager the command was run from. The quorum is achieved because
there is now only one manager. Promote nodes to be managers until you have the
desired number of managers.

From the node to recover, run:

```console
$ docker swarm init --force-new-cluster --advertise-addr node01:2377
```

When you run the `docker swarm init` command with the `--force-new-cluster`
flag, the Docker Engine where you run the command becomes the manager node of a
single-node swarm which is capable of managing and running services. The manager
has all the previous information about services and tasks, worker nodes are
still part of the swarm, and services are still running. You need to add or
re-add  manager nodes to achieve your previous task distribution and ensure that
you have enough managers to maintain high availability and prevent losing the
quorum.

## Force the swarm to rebalance

Generally, you do not need to force the swarm to rebalance its tasks. When you
add a new node to a swarm, or a node reconnects to the swarm after a
period of unavailability, the swarm does not automatically give a workload to
the idle node. This is a design decision. If the swarm periodically shifted tasks
to different nodes for the sake of balance, the clients using those tasks would
be disrupted. The goal is to avoid disrupting running services for the sake of
balance across the swarm. When new tasks start, or when a node with running
tasks becomes unavailable, those tasks are given to less busy nodes. The goal
is eventual balance, with minimal disruption to the end user.

You can use the `--force` or `-f` flag with the `docker service update` command
to force the service to redistribute its tasks across the available worker nodes.
This causes the service tasks to restart. Client applications may be disrupted.
If you have configured it, your service uses a rolling update.

If you use an earlier version and you want to achieve an even balance of load
across workers and don't mind disrupting running tasks, you can force your swarm
to re-balance by temporarily scaling the service upward. Use
`docker service inspect --pretty <servicename>` to see the configured scale
of a service. When you use `docker service scale`, the nodes with the lowest
number of tasks are targeted to receive the new workloads. There may be multiple
under-loaded nodes in your swarm. You may need to scale the service up by modest
increments a few times to achieve the balance you want across all the nodes.

When the load is balanced to your satisfaction, you can scale the service back
down to the original scale. You can use `docker service ps` to assess the current
balance of your service across nodes.

See also
`docker service scale` and
`docker service ps`.
