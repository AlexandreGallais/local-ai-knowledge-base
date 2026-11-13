---
title: "Deploy services to a swarm (part 2 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/services.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deploy services to a swarm (part 2 of 4)

## Service configuration details

The following sections provide details about service configuration. This topic
does not cover every flag or scenario. In almost every instance where you can
define a configuration at service creation, you can also update an existing
service's configuration in a similar way.

See the command-line references for
`docker service create` and
`docker service update`, or run
one of those commands with the `--help` flag.

### Configure the runtime environment

You can configure the following options for the runtime environment in the
container:

* Environment variables using the `--env` flag
* The working directory inside the container using the `--workdir` flag
* The username or UID using the `--user` flag

The following service's containers have an environment variable `$MYVAR`
set to `myvalue`, run from the `/tmp/` directory, and run as the
`my_user` user.

```console
$ docker service create --name helloworld \
  --env MYVAR=myvalue \
  --workdir /tmp \
  --user my_user \
  alpine ping docker.com
```

### Update the command an existing service runs

To update the command an existing service runs, you can use the `--args` flag.
The following example updates an existing service called `helloworld` so that
it runs the command `ping docker.com` instead of whatever command it was running
before:

```console
$ docker service update --args "ping docker.com" helloworld
```

### Specify the image version a service should use

When you create a service without specifying any details about the version of
the image to use, the service uses the version tagged with the `latest` tag.
You can force the service to use a specific version of the image in a few
different ways, depending on your desired outcome.

An image version can be expressed in several different ways:

- If you specify a tag, the manager (or the Docker client, if you use
  content trust) resolves that tag to a digest.
  When the request to create a container task is received on a worker node, the
  worker node only sees the digest, not the tag.

  ```console
  $ docker service create --name="myservice" ubuntu:16.04
  ```

  Some tags represent discrete releases, such as `ubuntu:16.04`. Tags like this
  almost always resolve to a stable digest over time. It is recommended
  that you use this kind of tag when possible.

  Other types of tags, such as `latest` or `nightly`, may resolve to a new
  digest often, depending on how often an image's author updates the tag. It is
  not recommended to run services using a tag which is updated frequently, to
  prevent different service replica tasks from using different image versions.

- If you don't specify a version at all, by convention the image's `latest` tag
  is resolved to a digest. Workers use the image at this digest when creating
  the service task.

  Thus, the following two commands are equivalent:

  ```console
  $ docker service create --name="myservice" ubuntu

  $ docker service create --name="myservice" ubuntu:latest
  ```

- If you specify a digest directly, that exact version of the image is always
  used when creating service tasks.

  ```console
  $ docker service create \
      --name="myservice" \
      ubuntu:16.04@sha256:35bc48a1ca97c3971611dc4662d08d131869daa692acb281c7e9e052924e38b1
  ```

When you create a service, the image's tag is resolved to the specific digest
the tag points to **at the time of service creation**. Worker nodes for that
service use that specific digest forever unless the service is explicitly
updated. This feature is particularly important if you do use often-changing tags
such as `latest`, because it ensures that all service tasks use the same version
of the image.

> [!NOTE]>
>
> If content trust is
> enabled, the client actually resolves the image's tag to a digest before
> contacting the swarm manager, to verify that the image is signed.
> Thus, if you use content trust, the swarm manager receives the request
> pre-resolved. In this case, if the client cannot resolve the image to a
> digest, the request fails.

If the manager can't resolve the tag to a digest, each worker
node is responsible for resolving the tag to a digest, and different nodes may
use different versions of the image. If this happens, a warning like the
following is logged, substituting the placeholders for real information.

```text
unable to pin image <IMAGE-NAME> to digest: <REASON>
```

To see an image's current digest, issue the command
`docker inspect <IMAGE>:<TAG>` and look for the `RepoDigests` line. The
following is the current digest for `ubuntu:latest` at the time this content
was written. The output is truncated for clarity.

```console
$ docker inspect ubuntu:latest
```

```json
"RepoDigests": [
    "ubuntu@sha256:35bc48a1ca97c3971611dc4662d08d131869daa692acb281c7e9e052924e38b1"
],
```

After you create a service, its image is never updated unless you explicitly run
`docker service update` with the `--image` flag as described below. Other update
operations such as scaling the service, adding or removing networks or volumes,
renaming the service, or any other type of update operation do not update the
service's image.

### Update a service's image after creation

Each tag represents a digest, similar to a Git hash. Some tags, such as
`latest`, are updated often to point to a new digest. Others, such as
`ubuntu:16.04`, represent a released software version and are not expected to
update to point to a new digest often if at all. When you create a service, it
is constrained to create tasks using a specific digest of an image until you
update the service using `service update` with the `--image` flag.

When you run `service update` with the `--image` flag, the swarm manager queries
Docker Hub or your private Docker registry for the digest the tag currently
points to and updates the service tasks to use that digest.

> **Note:**
>
> If you use content trust, the Docker
> client resolves image and the swarm manager receives the image and digest,
>  rather than a tag.

Usually, the manager can resolve the tag to a new digest and the service
updates, redeploying each task to use the new image. If the manager can't
resolve the tag or some other problem occurs, the next two sections outline what
to expect.

#### If the manager resolves the tag

If the swarm manager can resolve the image tag to a digest, it instructs the
worker nodes to redeploy the tasks and use the image at that digest.

- If a worker has cached the image at that digest, it uses it.

- If not, it attempts to pull the image from Docker Hub or the private registry.

  - If it succeeds, the task is deployed using the new image.

  - If the worker fails to pull the image, the service fails to deploy on that
    worker node. Docker tries again to deploy the task, possibly on a different
    worker node.

#### If the manager cannot resolve the tag

If the swarm manager cannot resolve the image to a digest, all is not lost:

- The manager instructs the worker nodes to redeploy the tasks using the image
  at that tag.

- If the worker has a locally cached image that resolves to that tag, it uses
  that image.

- If the worker does not have a locally cached image that resolves to the tag,
  the worker tries to connect to Docker Hub or the private registry to pull the
  image at that tag.

  - If this succeeds, the worker uses that image.

  - If this fails, the task fails to deploy and the manager tries again to deploy
    the task, possibly on a different worker node.

### Publish ports

When you create a swarm service, you can publish that service's ports to hosts
outside the swarm in two ways:

- You can rely on the routing mesh.
  When you publish a service port, the swarm makes the service accessible at the
  target port on every node, regardless of whether there is a task for the
  service running on that node or not. This is less complex and is the right
  choice for many types of services.

- You can publish a service task's port directly on the swarm node
  where that service is running. This bypasses the routing mesh and provides the
  maximum flexibility, including the ability for you to develop your own routing
  framework. However, you are responsible for keeping track of where each task is
  running and routing requests to the tasks, and load-balancing across the nodes.

Keep reading for more information and use cases for each of these methods.

#### Publish a service's ports using the routing mesh

To publish a service's ports externally to the swarm, use the
`--publish <PUBLISHED-PORT>:<SERVICE-PORT>` flag. The swarm makes the service
accessible at the published port on every swarm node. If an external host
connects to that port on any swarm node, the routing mesh routes it to a task.
The external host does not need to know the IP addresses or internally-used
ports of the service tasks to interact with the service. When a user or process
connects to a service, any worker node running a service task may respond. For
more details about swarm service networking, see
Manage swarm service networks.

##### Example: Run a three-task Nginx service on 10-node swarm

Imagine that you have a 10-node swarm, and you deploy an Nginx service running
three tasks on a 10-node swarm:

```console
$ docker service create --name my_web \
                        --replicas 3 \
                        --publish published=8080,target=80 \
                        nginx
```

Three tasks run on up to three nodes. You don't need to know which nodes
are running the tasks; connecting to port 8080 on any of the 10 nodes
connects you to one of the three `nginx` tasks. You can test this using `curl`.
The following example assumes that `localhost` is one of the swarm nodes. If
this is not the case, or `localhost` does not resolve to an IP address on your
host, substitute the host's IP address or resolvable host name.

The HTML output is truncated:

```console
$ curl localhost:8080

<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...truncated...
</html>
```

Subsequent connections may be routed to the same swarm node or a different one.

#### Publish a service's ports directly on the swarm node

Using the routing mesh may not be the right choice for your application if you
need to make routing decisions based on application state or you need total
control of the process for routing requests to your service's tasks. To publish
a service's port directly on the node where it is running, use the `mode=host`
option to the `--publish` flag.

> **Note:**
>
> If you publish a service's ports directly on the swarm node using
> `mode=host` and also set `published=<PORT>` this creates an implicit
> limitation that you can only run one task for that service on a given swarm
> node. You can work around this by specifying `published` without a port
> definition, which causes Docker to assign a random port for each task.
>
> In addition, if you use `mode=host` and you do not use the
> `--mode=global` flag on `docker service create`, it is difficult to know
> which nodes are running the service to route work to them.

##### Example: Run an `nginx` web server service on every swarm node

nginx is an open source reverse proxy, load
balancer, HTTP cache, and a web server. If you run nginx as a service using the
routing mesh, connecting to the nginx port on any swarm node shows you the
web page for (effectively) a random swarm node running the service.

The following example runs nginx as a service on each node in your swarm and
exposes nginx port locally on each swarm node.

```console
$ docker service create \
  --mode global \
  --publish mode=host,target=80,published=8080 \
  --name=nginx \
  nginx:latest
```

You can reach the nginx server on port 8080 of every swarm node. If you add a
node to the swarm, a nginx task is started on it. You cannot start another
service or container on any swarm node which binds to port 8080.

> **Note:**
>
> This is a purely illustrative example. Creating an application-layer
> routing framework for a multi-tiered service is complex and out of scope for
> this topic.

### Connect the service to an overlay network

You can use overlay networks to connect one or more services within the swarm.

First, create overlay network on a manager node using the `docker network create`
command with the `--driver overlay` flag.

```console
$ docker network create --driver overlay my-network
```

After you create an overlay network in swarm mode, all manager nodes have access
to the network.

You can create a new service and pass the `--network` flag to attach the service
to the overlay network:

```console
$ docker service create \
  --replicas 3 \
  --network my-network \
  --name my-web \
  nginx
```

The swarm extends `my-network` to each node running the service.

You can also connect an existing service to an overlay network using the
`--network-add` flag.

```console
$ docker service update --network-add my-network my-web
```

To disconnect a running service from a network, use the `--network-rm` flag.

```console
$ docker service update --network-rm my-network my-web
```

For more information on overlay networking and service discovery, refer to
Attach services to an overlay network and
Docker swarm mode overlay network security model.

### Grant a service access to secrets

To create a service with access to Docker-managed secrets, use the `--secret`
flag. For more information, see
Manage sensitive strings (secrets) for Docker services

### Customize a service's isolation mode

> **Important:**
>
> This setting applies to Windows hosts only and is ignored for Linux hosts.

Docker allows you to specify a swarm service's isolation
mode. The isolation mode can be one of the following:

- `default`: Use the default isolation mode configured for the Docker host, as
  configured by the `-exec-opt` flag or `exec-opts` array in `daemon.json`. If
  the daemon does not specify an isolation technology, `process` is the default
  for Windows Server, and `hyperv` is the default (and only) choice for
  Windows 10.

- `process`: Run the service tasks as a separate process on the host.

  > **Note:**
  >
  > `process` isolation mode is only supported on Windows Server.
  > Windows 10 only supports `hyperv` isolation mode.

- `hyperv`: Run the service tasks as isolated `hyperv` tasks. This increases
  overhead but provides more isolation.

You can specify the isolation mode when creating or updating a new service using
the `--isolation` flag.
