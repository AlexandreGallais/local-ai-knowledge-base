---
title: "Join nodes to a swarm"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/join-nodes.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Join nodes to a swarm

When you first create a swarm, you place a single Docker Engine into
Swarm mode. To take full advantage of Swarm mode you can add nodes to the swarm:

* Adding worker nodes increases capacity. When you deploy a service to a swarm,
the engine schedules tasks on available nodes whether they are worker nodes or
manager nodes. When you add workers to your swarm, you increase the scale of
the swarm to handle tasks without affecting the manager raft consensus.
* Manager nodes increase fault-tolerance. Manager nodes perform the
orchestration and cluster management functions for the swarm. Among manager
nodes, a single leader node conducts orchestration tasks. If a leader node
goes down, the remaining manager nodes elect a new leader and resume
orchestration and maintenance of the swarm state. By default, manager nodes
also run tasks.

Docker Engine joins the swarm depending on the **join-token** you provide to
the `docker swarm join` command. The node only uses the token at join time. If
you subsequently rotate the token, it doesn't affect existing swarm nodes. Refer
to Run Docker Engine in swarm mode.

## Join as a worker node

To retrieve the join command including the join token for worker nodes, run the
following command on a manager node:

```console
$ docker swarm join-token <example-value>

To add a worker to this swarm, run the following command:

    docker swarm join \
    --token <example-value> \
    192.168.99.100:2377
```

Run the command from the output on the worker to join the swarm:

```console
$ docker swarm join \
  --token <example-value> \
  192.168.99.100:2377

This node joined a swarm as a worker.
```

The `docker swarm join` command does the following:

* Switches Docker Engine on the current node into Swarm mode.
* Requests a TLS certificate from the manager.
* Names the node with the machine hostname.
* Joins the current node to the swarm at the manager listen address based upon the swarm token.
* Sets the current node to `Active` availability, meaning it can receive tasks
from the scheduler.
* Extends the `ingress` overlay network to the current node.

## Join as a manager node

When you run `docker swarm join` and pass the manager token, Docker Engine
switches into Swarm mode the same as for workers. Manager nodes also participate
in the raft consensus. The new nodes should be `Reachable`, but the existing
manager remains the swarm `Leader`.

Docker recommends three or five manager nodes per cluster to implement high
availability. Because Swarm-mode manager nodes share data using Raft, there
must be an odd number of managers. The swarm can continue to function after as
long as a quorum of more than half of the manager nodes are available.

For more detail about swarm managers and administering a swarm, see
Administer and maintain a swarm of Docker Engines.

To retrieve the join command including the join token for manager nodes, run the
following command on a manager node:

```console
$ docker swarm join-token <example-value>

To add a manager to this swarm, run the following command:

    docker swarm join \
    --token <example-value> \
    192.168.99.100:2377
```

Run the command from the output on the new manager node to join it to the swarm:

```console
$ docker swarm join \
  --token <example-value> \
  192.168.99.100:2377

This node joined a swarm as a manager.
```

## Learn More

* `swarm join` command line reference
* Swarm mode tutorial
