---
title: "Manage swarm service networks (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/networking.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage swarm service networks (part 2 of 2)

## Customize the ingress network {#customize-ingress}

Most users never need to configure the `ingress` network, but Docker allows you
to do so. This can be useful if the automatically-chosen subnet
conflicts with one that already exists on your network, or you need to customize
other low-level network settings such as the MTU, or if you want to
enable encryption.

Customizing the `ingress` network involves removing and recreating it. This is
usually done before you create any services in the swarm. If you have existing
services which publish ports, those services need to be removed before you can
remove the `ingress` network.

During the time that no `ingress` network exists, existing services which do not
publish ports continue to function but are not load-balanced. This affects
services which publish ports, such as a WordPress service which publishes port
80.

1.  Inspect the `ingress` network using `docker network inspect ingress`, and
    remove any services whose containers are connected to it. These are services
    that publish ports, such as a WordPress service which publishes port 80. If
    all such services are not stopped, the next step fails.

2.  Remove the existing `ingress` network:

    ```console
    $ docker network rm ingress

    WARNING! Before removing the routing-mesh network, make sure all the nodes
    in your swarm run the same docker engine version. Otherwise, removal may not
    be effective and functionality of newly created ingress networks will be
    impaired.
    Are you sure you want to continue? [y/N]
    ```

3.  Create a new overlay network using the `--ingress` flag, along  with the
    custom options you want to set. This example sets the MTU to 1200, sets
    the subnet to `10.11.0.0/16`, and sets the gateway to `10.11.0.2`.

    ```console
    $ docker network create \
      --driver overlay \
      --ingress \
      --subnet=10.11.0.0/16 \
      --gateway=10.11.0.2 \
      --opt com.docker.network.driver.mtu=1200 \
      my-ingress
    ```

    > **Note:**
    >
    > You can name your `ingress` network something other than
    > `ingress`, but you can only have one. An attempt to create a second one
    > fails.

4.  Restart the services that you stopped in the first step.

## Customize the docker_gwbridge

The `docker_gwbridge` is a virtual bridge that connects the overlay networks
(including the `ingress` network) to an individual Docker daemon's physical
network. Docker creates it automatically when you initialize a swarm or join a
Docker host to a swarm, but it is not a Docker device. It exists in the kernel
of the Docker host. If you need to customize its settings, you must do so before
joining the Docker host to the swarm, or after temporarily removing the host
from the swarm.

You need to have the `brctl` application installed on your operating system in
order to delete an existing bridge. The package name is `bridge-utils`.

1.  Stop Docker.

2.  Use the `brctl show docker_gwbridge` command to check whether a bridge
    device exists called `docker_gwbridge`. If so, remove it using
    `brctl delbr docker_gwbridge`.

3.  Start Docker. Do not join or initialize the swarm.

4.  Create or re-create the `docker_gwbridge` bridge with your custom settings.
    This example uses the subnet `10.11.0.0/16`. For a full list of customizable
    options, see Bridge driver options.

    ```console
    $ docker network create \
    --subnet 10.11.0.0/16 \
    --opt com.docker.network.bridge.name=docker_gwbridge \
    --opt com.docker.network.bridge.enable_icc=false \
    --opt com.docker.network.bridge.enable_ip_masquerade=true \
    docker_gwbridge
    ```

5.  Initialize or join the swarm.

## Use a separate interface for control and data traffic

By default, all swarm traffic is sent over the same interface, including control
and management traffic for maintaining the swarm itself and data traffic to and
from the service containers.

You can separate this traffic by passing
the `--data-path-addr` flag when initializing or joining the swarm. If there are
multiple interfaces, `--advertise-addr` must be specified explicitly, and
`--data-path-addr` defaults to `--advertise-addr` if not specified. Traffic about
joining, leaving, and managing the swarm is sent over the
`--advertise-addr` interface, and traffic among a service's containers is sent
over the `--data-path-addr` interface. These flags can take an IP address or
a network device name, such as `eth0`.

This example initializes a swarm with a separate `--data-path-addr`. It assumes
that your Docker host has two different network interfaces: 10.0.0.1 should be
used for control and management traffic and 192.168.0.1 should be used for
traffic relating to services.

```console
$ docker swarm init --advertise-addr 10.0.0.1 --data-path-addr 192.168.0.1
```

This example joins the swarm managed by host `192.168.99.100:2377` and sets the
`--advertise-addr` flag to `eth0` and the `--data-path-addr` flag to `eth1`.

```console
$ docker swarm join \
  --token <example-value> \
  --advertise-addr eth0 \
  --data-path-addr eth1 \
  192.168.99.100:2377
```

## Publish ports on an overlay network

Swarm services connected to the same overlay network effectively expose all
ports to each other. For a port to be accessible outside of the service, that
port must be _published_ using the `-p` or `--publish` flag on `docker service
create` or `docker service update`. Both the legacy colon-separated syntax and
the newer comma-separated value syntax are supported. The longer syntax is
preferred because it is somewhat self-documenting.

 | Flag value
 | Description

 | <tt>-p 8080:80</tt> or<tt>-p published=8080,target=80</tt>
 | Map TCP port 80 on the service to port 8080 on the routing mesh.

 | <tt>-p 8080:80/udp</tt> or<tt>-p published=8080,target=80,protocol=udp</tt>
 | Map UDP port 80 on the service to port 8080 on the routing mesh.

 | <tt>-p 8080:80/tcp -p 8080:80/udp</tt> or <tt>-p published=8080,target=80,protocol=tcp -p published=8080,target=80,protocol=udp</tt>
 | Map TCP port 80 on the service to TCP port 8080 on the routing mesh, and map UDP port 80 on the service to UDP port 8080 on the routing mesh.

## Learn more

* Deploy services to a swarm
* Swarm administration guide
* Swarm mode tutorial
* Networking overview
* Docker CLI reference
