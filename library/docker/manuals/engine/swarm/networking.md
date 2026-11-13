---
title: "Manage swarm service networks (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/networking.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage swarm service networks

This page describes networking for swarm services.

## Swarm and types of traffic

A Docker swarm generates two different kinds of traffic:

- Control and management plane traffic: This includes swarm management
  messages, such as requests to join or leave the swarm. This traffic is
  always encrypted.

- Application data plane traffic: This includes container traffic and
  traffic to and from external clients.

## Key <example-value> concepts

The following three network concepts are important to swarm services:

- Overlay networks manage communications among the Docker daemons
  participating in the swarm. You can create overlay networks, in the same way
  as user-defined networks for standalone containers. You can attach a service
  to one or more existing overlay networks as well, to enable service-to-service
  communication. Overlay networks are Docker networks that use the `overlay`
  network driver.

- The ingress network is a special overlay network that facilitates
  load balancing among a service's nodes. When any swarm node receives a
  request on a published port, it hands that request off to a module called
  `IPVS`. `IPVS` keeps track of all the IP addresses participating in that
  service, selects one of them, and routes the request to it, over the
  `ingress` network.

  The `ingress` network is created automatically when you initialize or join a
  swarm. Most users do not need to customize its configuration, but Docker allows
  you to do so.

- The docker_gwbridge is a bridge network that connects the overlay
  networks (including the `ingress` network) to an individual Docker daemon's
  physical network. By default, each container a service is running is connected
  to its local Docker daemon host's `docker_gwbridge` network.

  The `docker_gwbridge` network is created automatically when you initialize or
  join a swarm. Most users do not need to customize its configuration, but
  Docker allows you to do so.

> **Tip:**
>
> See also Networking overview for more details about Swarm networking in general.

## Firewall considerations

Docker daemons participating in a swarm need the ability to communicate with
each other over the following ports:

* Port `7946` TCP/UDP for container network discovery.
* Port `4789` UDP (configurable) for the overlay network (including ingress) data path.

When setting up networking in a Swarm, special care should be taken. Consult
the tutorial
for an overview.

## Overlay networking

When you initialize a swarm or join a Docker host to an existing swarm, two
new networks are created on that Docker host:

- An overlay network called `ingress`, which handles the control and data traffic
  related to swarm services. When you create a swarm service and do not
  connect it to a user-defined overlay network, it connects to the `ingress`
  network by default.
- A bridge network called `docker_gwbridge`, which connects the individual
  Docker daemon to the other daemons participating in the swarm.

### Create an overlay network

To create an overlay network, specify the `overlay` driver when using the
`docker network create` command:

```console
$ docker network create \
  --driver overlay \
  my-network
```

The above command doesn't specify any custom options, so Docker assigns a
subnet and uses default options. You can see information about the network using
`docker network inspect`.

When no containers are connected to the overlay network, its configuration is
not very exciting:

```console
$ docker network inspect my-network
[
    {
        "Name": "my-network",
        "Id": "fsf1dmx3i9q75an49z36jycxd",
        "Created": "0001-01-01T00:00:00Z",
        "Scope": "swarm",
        "Driver": "overlay",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": []
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "Containers": null,
        "Options": {
            "com.docker.network.driver.overlay.vxlanid_list": "4097"
        },
        "Labels": null
    }
]
```

In the above output, notice that the driver is `overlay` and that the scope is
`swarm`, rather than `local`, `host`, or `global` scopes you might see in
other types of Docker networks. This scope indicates that only hosts which are
participating in the swarm can access this network.

The network's subnet and gateway are dynamically configured when a service
connects to the network for the first time. The following example shows
the same network as above, but with three containers of a `redis` service
connected to it.

```console
$ docker network inspect my-network
[
    {
        "Name": "my-network",
        "Id": "fsf1dmx3i9q75an49z36jycxd",
        "Created": "2017-05-31T18:35:58.877628262Z",
        "Scope": "swarm",
        "Driver": "overlay",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "10.0.0.0/24",
                    "Gateway": "10.0.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "Containers": {
            "0e08442918814c2275c31321f877a47569ba3447498db10e25d234e47773756d": {
                "Name": "my-redis.1.ka6oo5cfmxbe6mq8qat2djgyj",
                "EndpointID": "950ce63a3ace13fe7ef40724afbdb297a50642b6d47f83a5ca8636d44039e1dd",
                "MacAddress": "02:42:0a:00:00:03",
                "IPv4Address": "10.0.0.3/24",
                "IPv6Address": ""
            },
            "88d55505c2a02632c1e0e42930bcde7e2fa6e3cce074507908dc4b827016b833": {
                "Name": "my-redis.2.s7vlybipal9xlmjfqnt6qwz5e",
                "EndpointID": "dd822cb68bcd4ae172e29c321ced70b731b9994eee5a4ad1d807d9ae80ecc365",
                "MacAddress": "02:42:0a:00:00:05",
                "IPv4Address": "10.0.0.5/24",
                "IPv6Address": ""
            },
            "9ed165407384f1276e5cfb0e065e7914adbf2658794fd861cfb9b991eddca754": {
                "Name": "my-redis.3.hbz3uk3hi5gb61xhxol27hl7d",
                "EndpointID": "f62c686a34c9f4d70a47b869576c37dffe5200732e1dd6609b488581634cf5d2",
                "MacAddress": "02:42:0a:00:00:04",
                "IPv4Address": "10.0.0.4/24",
                "IPv6Address": ""
            }
        },
        "Options": {
            "com.docker.network.driver.overlay.vxlanid_list": "4097"
        },
        "Labels": {},
        "Peers": [
            {
                "Name": "moby-e57c567e25e2",
                "IP": "192.168.65.2"
            }
        ]
    }
]
```

### Customize an overlay network

There may be situations where you don't want to use the default configuration
for an overlay network. For a full list of configurable options, run the
command `docker network create --help`. The following are some of the most
common options to change.

#### Configure the subnet and gateway

By default, the network's subnet and gateway are configured automatically when
the first service is connected to the network. You can configure these when
creating a network using the `--subnet` and `--gateway` flags. The following
example extends the previous one by configuring the subnet and gateway.

```console
$ docker network create \
  --driver overlay \
  --subnet 10.0.9.0/24 \
  --gateway 10.0.9.99 \
  my-network
```

##### Using custom default address pools

To customize subnet allocation for your Swarm networks, you can optionally configure them during `swarm init`.

For example, the following command is used when initializing Swarm:

```console
$ docker swarm init --default-addr-pool 10.20.0.0/16 --default-addr-pool-mask-length 26
```

Whenever a user creates a network, but does not use the `--subnet` command line option, the subnet for this network will be allocated sequentially from the next available subnet from the pool. If the specified network is already allocated, that network will not be used for Swarm.

Multiple pools can be configured if discontiguous address space is required. However, allocation from specific pools is not supported. Network subnets will be allocated sequentially from the IP pool space and subnets will be reused as they are deallocated from networks that are deleted.

The default mask length can be configured and is the same for all networks. It is set to `/24` by default. To change the default subnet mask length, use the `--default-addr-pool-mask-length` command line option.

> **Note:**
>
> Default address pools can only be configured on `swarm init` and cannot be altered after cluster creation.

##### Overlay network size limitations

Docker recommends creating overlay networks with `/24` blocks. The `/24` overlay network blocks limit the network to 256 IP addresses.

This recommendation addresses limitations with swarm mode.
If you need more than 256 IP addresses, do not increase the IP block size. You can either use `dnsrr`
endpoint mode with an external load balancer, or use multiple smaller overlay networks. See
Configure service discovery for more information about different endpoint modes.

#### Use direct server return

Direct server return (DSR) changes east-west overlay load balancing so that
IPVS routes packets by changing the destination MAC address. The source IP and
destination virtual IP (VIP) remain unchanged.

Create an overlay network that uses DSR:

```console
$ docker network create \
  --driver overlay \
  --opt dsr \
  dsr-net
```

> **Note:**
>
> DSR is supported only for traffic between services on Linux nodes. The
> ingress routing mesh does not use DSR.

#### Configure encryption of application data {#encryption}

Management and control plane data related to a swarm is always encrypted.
For more details about the encryption mechanisms, see the
Docker swarm mode overlay network security model.

Application data among swarm nodes is not encrypted by default. To encrypt this
traffic on a given overlay network, use the `--opt encrypted` flag on `docker
network create`. This enables IPSEC encryption at the level of the vxlan. This
encryption imposes a non-negligible performance penalty, so you should test this
option before using it in production.

> **Note:**
>
> You must customize the automatically created ingress
> to enable encryption. By default, all ingress traffic is unencrypted, as encryption
> is a network-level option.

## Attach a service to an overlay network

To attach a service to an existing overlay network, pass the `--network` flag to
`docker service create`, or the `--network-add` flag to `docker service update`.

```console
$ docker service create \
  --replicas 3 \
  --name my-web \
  --network my-network \
  nginx
```

Service containers connected to an overlay network can communicate with
each other across it.

To see which networks a service is connected to, use `docker service ls` to find
the name of the service, then `docker service ps <service-name>` to list the
networks. Alternately, to see which services' containers are connected to a
network, use `docker network inspect <network-name>`. You can run these commands
from any swarm node which is joined to the swarm and is in a `running` state.

### Configure service discovery

Service discovery is the mechanism Docker uses to route a request from your
service's external clients to an individual swarm node, without the client
needing to know how many nodes are participating in the service or their
IP addresses or ports. You don't need to publish ports which are used between
services on the same network. For instance, if you have a
WordPress service that stores its data in a MySQL service, and they are connected to the same overlay network, you do not need to publish
the MySQL port to the client, only the WordPress HTTP port.

Service discovery can work in two different ways: internal connection-based
load-balancing at Layers 3 and 4 using the embedded DNS and a virtual IP (VIP),
or external and customized request-based load-balancing at Layer 7 using DNS
round robin (DNSRR). You can configure this per service.

- By default, when you attach a service to a network and that service publishes
  one or more ports, Docker assigns the service a virtual IP (VIP), which is the
  "front end" for clients to reach the service. Docker keeps a list of all
  worker nodes in the service, and routes requests between the client and one of
  the nodes. Each request from the client might be routed to a different node.

- If you configure a service to use DNS round-robin (DNSRR) service discovery,
  there is not a single virtual IP. Instead, Docker sets up DNS entries for the
  service such that a DNS query for the service name returns a list of IP
  addresses, and the client connects directly to one of these.

  DNS round-robin is useful in cases where you want to use your own load
  balancer, such as HAProxy. To configure a service to use DNSRR, use the flag
  `--endpoint-mode dnsrr` when creating a new service or updating an existing
  one.

### Container discovery

For most situations, connect to the service name. Docker load-balances
requests across all running tasks ("containers") backing the service. To
resolve the IP addresses of all individual tasks backing a service directly,
perform a DNS lookup for `tasks.<service-name>`. Docker returns a list of
all task IP addresses for that service, one per running replica.
