---
title: "Legacy container links (part 1 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/links.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Legacy container links

> **Warning:**
>
> Links on the default `bridge` network are deprecated and scheduled for removal
> in Docker Engine 30.0. Starting with Docker Engine 29.6, Docker emits a
> deprecation warning when you create a container with these links. Links on
> non-default networks remain supported. Use user-defined networks instead of
> the legacy `--link` flag whenever possible.
>
> See Differences between user-defined bridges and the default bridge
> for some alternatives to using `--link`.

The information in this section explains legacy container links within the
Docker default `bridge` network which is created automatically when you install
Docker.

Before the Docker networks feature, you could use the
Docker link feature to allow containers to discover each other and securely
transfer information about one container to another container. With the
introduction of the Docker networks feature, you can still create links but they
behave differently between default `bridge` network and
user defined networks.

This section briefly discusses connecting via a network port and then goes into
detail on container linking in default `bridge` network.

## Connect using network port mapping

Publishing a port with `-p` or `-P` is not container linking. It exposes a
container port on the host. For the current reference, see
Published ports.

Let's say you used this command to run a simple Python Flask application:

```console
$ docker run -d -P training/webapp python app.py
```

When that container was created, the `-P` flag was used to automatically map
any network port inside it to a random high port within an *ephemeral port
range* on your Docker host. Next, when `docker ps` was run, you saw that port
5000 in the container was bound to port 49155 on the host.

```console
$ docker ps nostalgic_morse

CONTAINER ID  IMAGE                   COMMAND       CREATED        STATUS        PORTS                    NAMES
bc533791f3f5  training/webapp:latest  python app.py 5 seconds ago  Up 2 seconds  0.0.0.0:49155->5000/tcp  nostalgic_morse
```

You also saw how you can bind a container's ports to a specific port using
the `-p` flag. Here port 80 of the host is mapped to port 5000 of the
container:

```console
$ docker run -d -p 80:5000 training/webapp python app.py
```

And you saw why this isn't such a great idea because it constrains you to
only one container on that specific port.

Instead, you may specify a range of host ports to bind a container port to
that is different than the default *ephemeral port range*:

```console
$ docker run -d -p 8000-9000:5000 training/webapp python app.py
```

This would bind port 5000 in the container to a randomly available port
between 8000 and 9000 on the host.

There are also a few other ways you can configure the `-p` flag. By
default the `-p` flag binds the specified port to all interfaces on
the host machine. But you can also specify a binding to a specific
interface, for example only to the `localhost`.

```console
$ docker run -d -p 127.0.0.1:80:5000 training/webapp python app.py
```

This would bind port 5000 inside the container to port 80 on the
`localhost` or `127.0.0.1` interface on the host machine.

Or, to bind port 5000 of the container to a dynamic port but only on the
`localhost`, you could use:

```console
$ docker run -d -p 127.0.0.1::5000 training/webapp python app.py
```

You can also bind UDP and SCTP (typically used by telecom protocols such as SIGTRAN, Diameter, and S1AP/X2AP) ports by adding a trailing `/udp` or `/sctp`. For example:

```console
$ docker run -d -p 127.0.0.1:80:5000/udp training/webapp python app.py
```

You also learned about the useful `docker port` shortcut which showed us the
current port bindings. This is also useful for showing you specific port
configurations. For example, if you've bound the container port to the
`localhost` on the host machine, then the `docker port` output reflects that.

```console
$ docker port nostalgic_morse 5000

127.0.0.1:49155
```

> **Note:**
>
> The `-p` flag can be used multiple times to configure multiple ports.

## Connect with the linking system

> **Note:**
>
> This section covers the legacy link feature in the default `bridge` network.
> Refer to differences between user-defined bridges and the default bridge
> for more information on links in user-defined networks.

Network port mappings are not the only way Docker containers can connect to one
another. Docker also has a linking system that allows you to link multiple
containers together and send connection information from one to another. When
containers are linked, information about a source container can be sent to a
recipient container. This allows the recipient to see selected data describing
aspects of the source container.

### The importance of naming

To establish links, Docker relies on the names of your containers.
You've already seen that each container you create has an automatically
created name; indeed you've become familiar with our old friend
`nostalgic_morse` during this guide. You can also name containers
yourself. This naming provides two useful functions:

1. It can be useful to name containers that do specific functions in a way
   that makes it easier for you to remember them, for example naming a
   container containing a web application `web`.

2. It provides Docker with a reference point that allows it to refer to other
   containers, for example, you can specify to link the container `web` to container `db`.

You can name your container by using the `--name` flag, for example:

```console
$ docker run -d -P --name web training/webapp python app.py
```

This launches a new container and uses the `--name` flag to
name the container `web`. You can see the container's name using the
`docker ps` command.

```console
$ docker ps -l

CONTAINER ID  IMAGE                  COMMAND        CREATED       STATUS       PORTS                    NAMES
aed84ee21bde  training/webapp:latest python app.py  12 hours ago  Up 2 seconds 0.0.0.0:49154->5000/tcp  web
```

You can also use `docker inspect` to return the container's name.

> **Note:**
>
> Container names must be unique. That means you can only call
> one container `web`. If you want to reuse a container name you must delete
> the old container (with `docker container rm`) before you can create a new
> container with the same name. As an alternative you can use the `--rm`
> flag with the `docker run` command. This deletes the container
> immediately after it is stopped.
