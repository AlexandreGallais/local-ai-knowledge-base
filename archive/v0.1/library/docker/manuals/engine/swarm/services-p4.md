---
title: "Deploy services to a swarm (part 4 of 4)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/services.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Deploy services to a swarm (part 4 of 4)

### Automatically roll back if an update fails

You can configure a service in such a way that if an update to the service
causes redeployment to fail, the service can automatically roll back to the
previous configuration. This helps protect service availability. You can set
one or more of the following flags at service creation or update. If you do not
set a value, the default is used.

| Flag                           | Default | Description                                                                                                                                                                                                                                                                                                             |
|:-------------------------------|:--------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `--rollback-delay`             | `0s`    | Amount of time to wait after rolling back a task before rolling back the next one. A value of `0` means to roll back the second task immediately after the first rolled-back task deploys.                                                                                                                              |
| `--rollback-failure-action`    | `pause` | When a task fails to roll back, whether to `pause` or `continue` trying to roll back other tasks.                                                                                                                                                                                                                       |
| `--rollback-max-failure-ratio` | `0`     | The failure rate to tolerate during a rollback, specified as a floating-point number between 0 and 1. For instance, given 5 tasks, a failure ratio of `.2` would tolerate one task failing to roll back. A value of `0` means no failure are tolerated, while a value of `1` means any number of failure are tolerated. |
| `--rollback-monitor`           | `5s`    | Duration after each task rollback to monitor for failure. If a task stops before this time period has elapsed, the rollback is considered to have failed.                                                                                                                                                               |
| `--rollback-parallelism`       | `1`     | The maximum number of tasks to roll back in parallel. By default, one task is rolled back at a time. A value of `0` causes all tasks to be rolled back in parallel.                                                                                                                                                     |

The following example configures a `redis` service to roll back automatically
if a `docker service update` fails to deploy. Two tasks can be rolled back in
parallel. Tasks are monitored for 20 seconds after rollback to be sure they do
not exit, and a maximum failure ratio of 20% is tolerated. Default values are
used for `--rollback-delay` and `--rollback-failure-action`.

```console
$ docker service create --name=my_redis \
                        --replicas=5 \
                        --rollback-parallelism=2 \
                        --rollback-monitor=20s \
                        --rollback-max-failure-ratio=.2 \
                        redis:latest
```

### Give a service access to volumes or bind mounts

For best performance and portability, you should avoid writing important data
directly into a container's writable layer. You should instead use data volumes
or bind mounts. This principle also applies to services.

You can create two types of mounts for services in a swarm, `volume` mounts or
`bind` mounts. Regardless of which type of mount you use, configure it using the
`--mount` flag when you create a service, or the `--mount-add` or `--mount-rm`
flag when updating an existing service. The default is a data volume if you
don't specify a type.

#### Data volumes

Data volumes are storage that exist independently of a container. The
lifecycle of data volumes under swarm services is similar to that under
containers. Volumes outlive tasks and services, so their removal must be
managed separately. Volumes can be created before deploying a service, or if
they don't exist on a particular host when a task is scheduled there, they are
created automatically according to the volume specification on the service.

To use existing data volumes with a service use the `--mount` flag:

```console
$ docker service create \
  --mount src=<VOLUME-NAME>,dst=<CONTAINER-PATH> \
  --name myservice \
  <IMAGE>
```

If a volume with the name `<VOLUME-NAME>` doesn't exist when a task is
scheduled to a particular host, then one is created. The default volume
driver is `local`.  To use a different volume driver with this create-on-demand
pattern, specify the driver and its options with the `--mount` flag:

```console
$ docker service create \
  --mount type=volume,src=<VOLUME-NAME>,dst=<CONTAINER-PATH>,volume-driver=<DRIVER>,volume-opt=<KEY0>=<VALUE0>,volume-opt=<KEY1>=<VALUE1>
  --name myservice \
  <IMAGE>
```

For more information on how to create data volumes and the use of volume
drivers, see Use volumes.

#### Bind mounts

Bind mounts are file system paths from the host where the scheduler deploys
the container for the task. Docker mounts the path into the container. The
file system path must exist before the swarm initializes the container for the
task.

The following examples show bind mount syntax:

- To mount a read-write bind:

  ```console
  $ docker service create \
    --mount type=bind,src=<HOST-PATH>,dst=<CONTAINER-PATH> \
    --name myservice \
    <IMAGE>
  ```

- To mount a read-only bind:

  ```console
  $ docker service create \
    --mount type=bind,src=<HOST-PATH>,dst=<CONTAINER-PATH>,readonly \
    --name myservice \
    <IMAGE>
  ```

> **Important:**
>
> Bind mounts can be useful but they can also cause problems. In
> most cases, it is recommended that you architect your application such that
> mounting paths from the host is unnecessary. The main risks include the
> following:
>
> - If you bind mount a host path into your service’s containers, the path
>   must exist on every swarm node. The Docker swarm mode scheduler can schedule
>   containers on any machine that meets resource availability requirements
>   and satisfies all constraints and placement preferences you specify.
>
> - The Docker swarm mode scheduler may reschedule your running service
>   containers at any time if they become unhealthy or unreachable.
>
> - Host bind mounts are non-portable. When you use bind mounts, there is no
>   guarantee that your application runs the same way in development as it does
>   in production.

### Create services using templates

You can use templates for some flags of `service create`, using the syntax
provided by the Go's text/template
package.

The following flags are supported:

- `--hostname`
- `--mount`
- `--env`

Valid placeholders for the Go template are:

| Placeholder       | Description    |
|:------------------|:---------------|
| `.Service.ID`     | Service ID     |
| `.Service.Name`   | Service name   |
| `.Service.Labels` | Service labels |
| `.Node.ID`        | Node ID        |
| `.Node.Hostname`  | Node hostname  |
| `.Task.Name`      | Task name      |
| `.Task.Slot`      | Task slot      |

#### Template example

This example sets the template of the created containers based on the
service's name and the ID of the node where the container is running:

```console
$ docker service create --name hosttempl \
                        --hostname="{{.Node.ID}}-{{.Service.Name}}"\
                         busybox top
```

To see the result of using the template, use the `docker service ps` and
`docker inspect` commands.

```console
$ docker service ps va8ew30grofhjoychbr6iot8c

ID            NAME         IMAGE                                                                                   NODE          DESIRED STATE  CURRENT STATE               ERROR  PORTS
wo41w8hg8qan  hosttempl.1  busybox:latest@sha256:29f5d56d12684887bdfa50dcd29fc31eea4aaf4ad3bec43daf19026a7ce69912  2e7a8a9c4da2  Running        Running about a minute ago
```

```console
$ docker inspect --format="{{.Config.Hostname}}" hosttempl.1.wo41w8hg8qanxwjwsg4kxpprj
```

## Learn More

* Swarm administration guide
* Docker Engine command line reference
* Swarm mode tutorial
