---
title: "Legacy container links (part 2 of 2)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/network/links.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Legacy container links (part 2 of 2)

## Communication across links

Links allow containers to discover each other and securely transfer information
about one container to another container. When you set up a link, you create a
conduit between a source container and a recipient container. The recipient can
then access select data about the source. To create a link, you use the `--link`
flag. First, create a new container, this time one containing a database.

```console
$ docker run -d --name db training/postgres
```

This creates a new container called `db` from the `training/postgres`
image, which contains a PostgreSQL database.

Now, you need to delete the `web` container you created previously so you can replace it
with a linked one:

```console
$ docker container rm -f web
```

Now, create a new `web` container and link it with your `db` container.

```console
$ docker run -d -P --name web --link db:db training/webapp python app.py
```

This links the new `web` container with the `db` container you created
earlier. The `--link` flag takes the form:

    --link <name or id>:alias

Where `name` is the name of the container we're linking to and `alias` is an
alias for the link name. That alias is used shortly.
The `--link` flag also takes the form:

    --link <name or id>

In this case the alias matches the name. You could write the previous
example as:

```console
$ docker run -d -P --name web --link db training/webapp python app.py
```

Next, inspect your linked containers with `docker inspect`:

```console
$ docker inspect -f "{{ .HostConfig.Links }}" web

[/db:/web/db]
```

You can see that the `web` container is now linked to the `db` container
`web/db`. Which allows it to access information about the `db` container.

So what does linking the containers actually do? You've learned that a link allows a
source container to provide information about itself to a recipient container. In
our example, the recipient, `web`, can access information about the source `db`. To do
this, Docker creates a secure tunnel between the containers that doesn't need to
expose any ports externally on the container; when we started the
`db` container we did not use either the `-P` or `-p` flags. That's a big benefit of
linking: we don't need to expose the source container, here the PostgreSQL database, to
the network.

Docker exposes connectivity information for the source container to the
recipient container in two ways:

* Environment variables,
* Updating the `/etc/hosts` file.

### Environment variables

> **Warning:**
>
> Legacy-link environment variables were deprecated in Docker Engine 28.4, are
> disabled by default in Docker Engine 29.0, and are scheduled for removal in
> Docker Engine 30.0. In Docker Engine 29.x, set
> `DOCKER_KEEP_DEPRECATED_LEGACY_LINKS_ENV_VARS=1` in the `dockerd` process
> environment and restart the daemon to temporarily re-enable them.

Docker creates several environment variables when you link containers. Docker
automatically creates environment variables in the target container based on
the `--link` parameters. It also exposes all environment variables
originating from Docker from the source container. These include variables from:

* the `ENV` commands in the source container's Dockerfile
* the `-e`, `--env`, and `--env-file` options on the `docker run`
command when the source container is started

These environment variables enable programmatic discovery from within the
target container of information related to the source container.

> **Warning:**
>
> It is important to understand that all environment variables originating
> from Docker within a container are made available to any container
> that links to it. This could have serious security implications if sensitive
> data is stored in them.

Docker sets an `<alias>_NAME` environment variable for each target container
listed in the `--link` parameter. For example, if a new container called
`web` is linked to a database container called `db` via `--link db:webdb`,
then Docker creates a `WEBDB_NAME=/web/webdb` variable in the `web` container.

Docker also defines a set of environment variables for each port exposed by the
source container. Each variable has a unique prefix in the form `<name>_PORT_<port>_<protocol>`

The components in this prefix are:

* the alias `<name>` specified in the `--link` parameter (for example, `webdb`)
* the `<port>` number exposed
* a `<protocol>` which is either TCP or UDP

Docker uses this prefix format to define three distinct environment variables:

* The `prefix_ADDR` variable contains the IP Address from the URL, for
example `WEBDB_PORT_5432_TCP_ADDR=172.17.0.82`.
* The `prefix_PORT` variable contains just the port number from the URL of
example `WEBDB_PORT_5432_TCP_PORT=5432`.
* The `prefix_PROTO` variable contains just the protocol from the URL of
example `WEBDB_PORT_5432_TCP_PROTO=tcp`.

If the container exposes multiple ports, an environment variable set is
defined for each one. This means, for example, if a container exposes 4 ports
that Docker creates 12 environment variables, 3 for each port.

Additionally, Docker creates an environment variable called `<alias>_PORT`.
This variable contains the URL of the source container's first exposed port.
The 'first' port is defined as the exposed port with the lowest number.
For example, consider the `WEBDB_PORT=tcp://172.17.0.82:5432` variable. If
that port is used for both tcp and udp, then the tcp one is specified.

Finally, Docker also exposes each Docker originated environment variable
from the source container as an environment variable in the target. For each
variable Docker creates an `<alias>_ENV_<name>` variable in the target
container. The variable's value is set to the value Docker used when it
started the source container.

Returning back to our database example, you can run the `env`
command to list the specified container's environment variables.

```console
$ docker run --rm --name web2 --link db:db training/webapp env

<...>
DB_NAME=/web2/db
DB_PORT=tcp://172.17.0.5:5432
DB_PORT_5432_TCP=tcp://172.17.0.5:5432
DB_PORT_5432_TCP_PROTO=tcp
DB_PORT_5432_TCP_PORT=5432
DB_PORT_5432_TCP_ADDR=172.17.0.5
<...>
```

You can see that Docker has created a series of environment variables with
useful information about the source `db` container. Each variable is prefixed
with
`DB_`, which is populated from the `alias` you specified above. If the `alias`
were `db1`, the variables would be prefixed with `DB1_`. You can use these
environment variables to configure your applications to connect to the database
on the `db` container. The connection is secure and private; only the
linked `web` container can communicate with the `db` container.

### Important notes on Docker environment variables

Unlike host entries in the `/etc/hosts` file,
IP addresses stored in the environment variables are not automatically updated
if the source container is restarted. We recommend using the host entries in
`/etc/hosts` to resolve the IP address of linked containers.

These environment variables are only set for the first process in the
container. Some daemons, such as `sshd`, scrub them when spawning shells
for connection.

### Updating the `/etc/hosts` file

In addition to the environment variables, Docker adds a host entry for the
source container to the `/etc/hosts` file. Here's an entry for the `web`
container:

```console
$ docker run -t -i --rm --link db:webdb training/webapp /bin/bash

root@aed84ee21bde:/opt/webapp# cat /etc/hosts
172.17.0.7  aed84ee21bde
<...>
172.17.0.5  webdb 6e5cdeb2d300 db
```

You can see two relevant host entries. The first is an entry for the `web`
container that uses the Container ID as a host name. The second entry uses the
link alias to reference the IP address of the `db` container. In addition to
the alias you provide, the linked container's name, if unique from the alias
provided to the `--link` parameter, and the linked container's hostname are
also added to `/etc/hosts` for the linked container's IP address. You can ping
that host via any of these entries:

```console
root@aed84ee21bde:/opt/webapp# apt-get install -yqq inetutils-ping
root@aed84ee21bde:/opt/webapp# ping webdb

PING webdb (172.17.0.5): 48 data bytes
56 bytes from 172.17.0.5: icmp_seq=0 ttl=64 time=0.267 ms
56 bytes from 172.17.0.5: icmp_seq=1 ttl=64 time=0.250 ms
56 bytes from 172.17.0.5: icmp_seq=2 ttl=64 time=0.256 ms
```

> **Note:**
>
> In the example, you had to install `ping` because it was not included
> in the container initially.

Here, you used the `ping` command to ping the `db` container using its host entry,
which resolves to `172.17.0.5`. You can use this host entry to configure an application
to make use of your `db` container.

> **Note:**
>
> You can link multiple recipient containers to a single source. For
> example, you could have multiple (differently named) web containers attached to your
>`db` container.

If you restart the source container, the `/etc/hosts` files on the linked containers
are automatically updated with the source container's new IP address,
allowing linked communication to continue.

```console
$ docker restart db
db

$ docker run -t -i --rm --link db:db training/webapp /bin/bash

root@aed84ee21bde:/opt/webapp# cat /etc/hosts
172.17.0.7  aed84ee21bde
<...>
172.17.0.9  db
```
