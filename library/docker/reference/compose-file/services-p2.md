---
title: "Define services in Docker Compose (part 2 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/compose-file/services.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Define services in Docker Compose (part 2 of 7)

## Attributes

### `annotations`

`annotations` defines annotations for the container. `annotations` can use either an array or a map.

```yml
annotations:
  com.example.foo: bar
```

```yml
annotations:
  - com.example.foo=bar
```

### `attach`

When `attach` is defined and set to `false` Compose does not collect service logs,
until you explicitly request it to.

The default service configuration is `attach: true`.

### `build`

`build` specifies the build configuration for creating a container image from source, as defined in the Compose Build Specification.

### `blkio_config`

`blkio_config` defines a set of configuration options to set block I/O limits for a service.

```yml
services:
  foo:
    image: busybox
    blkio_config:
       weight: 300
       weight_device:
         - path: /dev/sda
           weight: 400
       device_read_bps:
         - path: /dev/sdb
           rate: '12mb'
       device_read_iops:
         - path: /dev/sdb
           rate: 120
       device_write_bps:
         - path: /dev/sdb
           rate: '1024k'
       device_write_iops:
         - path: /dev/sdb
           rate: 30
```

#### `device_read_bps`, `device_write_bps`

Set a limit in bytes per second for read / write operations on a given device.
Each item in the list must have two keys:

- `path`: Defines the symbolic path to the affected device.
- `rate`: Either as an integer value representing the number of bytes or as a string expressing a byte value.

#### `device_read_iops`, `device_write_iops`

Set a limit in operations per second for read / write operations on a given device.
Each item in the list must have two keys:

- `path`: Defines the symbolic path to the affected device.
- `rate`: As an integer value representing the permitted number of operations per second.

#### `weight`

Modify the proportion of bandwidth allocated to a service relative to other services.
Takes an integer value between 10 and 1000, with 500 being the default.

#### `weight_device`

Fine-tune bandwidth allocation by device. Each item in the list must have two keys:

- `path`: Defines the symbolic path to the affected device.
- `weight`: An integer value between 10 and 1000.

### `cpu_count`

`cpu_count` defines the number of usable CPUs for service container.

### `cpu_percent`

`cpu_percent` defines the usable percentage of the available CPUs.

### `cpu_shares`

`cpu_shares` defines, as integer value, a service container's relative CPU weight versus other containers.

### `cpu_period`

`cpu_period` configures CPU CFS (Completely Fair Scheduler) period when a platform is based
on Linux kernel.

### `cpu_quota`

`cpu_quota` configures CPU CFS (Completely Fair Scheduler) quota when a platform is based
on Linux kernel.

### `cpu_rt_runtime`

`cpu_rt_runtime` configures CPU allocation parameters for platforms with support for real-time scheduler. It can be either
an integer value using microseconds as unit or a duration.

```yml
 cpu_rt_runtime: '400ms'
 cpu_rt_runtime: '95000'
```

### `cpu_rt_period`

`cpu_rt_period` configures CPU allocation parameters for platforms with support for real-time scheduler. It can be either
an integer value using microseconds as unit or a duration.

```yml
 cpu_rt_period: '1400us'
 cpu_rt_period: '11000'
```

### `cpus`

`cpus` define the number of (potentially virtual) CPUs to allocate to service containers. This is a fractional number.
`0.000` means no limit.

When set, `cpus` must be consistent with the `cpus` attribute in the Deploy Specification.

### `cpuset`

`cpuset` defines the explicit CPUs in which to permit execution. Can be a range `0-3` or a list `0,1`

### `cap_add`

`cap_add` specifies additional container capabilities
as strings.

```yaml
cap_add:
  - ALL
```

### `cap_drop`

`cap_drop` specifies container capabilities to drop
as strings.

```yaml
cap_drop:
  - NET_ADMIN
  - SYS_ADMIN
```

### `cgroup`

`cgroup` specifies the cgroup namespace to join. When unset, it is the container runtime's decision to
select which cgroup namespace to use, if supported.

- `host`: Runs the container in the Container runtime cgroup namespace.
- `private`: Runs the container in its own private cgroup namespace.

### `cgroup_parent`

`cgroup_parent` specifies an optional parent cgroup for the container.

```yaml
cgroup_parent: m-executor-abcd
```

### `command`

`command` overrides the default command declared by the container image, for example by Dockerfile's `CMD`.

```yaml
command: bundle exec thin -p 3000
```

If the value is `null`, the default command from the image is used.

If the value is `[]` (empty list) or `''` (empty string), the default command declared by the image is ignored, or in other words overridden to be empty.

> **Note:**
>
> Unlike the `CMD` instruction in a Dockerfile, the `command` field doesn't automatically run within the context of the `SHELL` instruction defined in the image. If your `command` relies on shell-specific features, such as environment variable expansion, you need to explicitly run it within a shell. For example:
>
> ```yaml
> command: /bin/sh -c 'echo "hello $$HOSTNAME"'
> ```

The value can also be a list, similar to the exec-form syntax
used by the Dockerfile.

### `configs`

`configs` let services adapt their behaviour without the need to rebuild a Docker image.
Services can only access configs when explicitly granted by the `configs` attribute. Two different syntax variants are supported.

Compose reports an error if `config` doesn't exist on the platform or isn't defined in the
`configs` top-level element in the Compose file.

There are two syntaxes defined for configs: a short syntax and a long syntax.

You can grant a service access to multiple configs, and you can mix long and short syntax.

#### Short syntax

The short syntax variant only specifies the config name. This grants the
container access to the config and mounts it as files into a service’s container’s filesystem. The location of the mount point within the container defaults to `/<config_name>` in Linux containers, and `C:\<config-name>` in Windows containers.

The following example uses the short syntax to grant the `redis` service
access to the `my_config` and `my_other_config` configs. The value of
`my_config` is set to the contents of the file `./my_config.txt`, and
`my_other_config` is defined as an external resource, which means that it has
already been defined in the platform. If the external config does not exist,
the deployment fails.

```yml
services:
  redis:
    image: redis:latest
    configs:
      - my_config
      - my_other_config
configs:
  my_config:
    file: ./my_config.txt
  my_other_config:
    external: true
```

#### Long syntax

The long syntax provides more granularity in how the config is created within the service's task containers.

- `source`: The name of the config as it exists in the platform.
- `target`: The path and name of the file to be mounted in the service's
  task containers. Defaults to `/` if not specified.
- `uid` and `gid`: The numeric uid or gid that owns the mounted config file
  within the service's task containers.
- `mode`: The permissions for the file that is mounted within the service's
  task containers, in octal notation. Default value is world-readable (`0444`).
  Writable bit must be ignored. The executable bit can be set.

The following example sets the name of `my_config` to `redis_config` within the
container, sets the mode to `0440` (group-readable) and sets the user and group
to `103`. The `redis` service does not have access to the `my_other_config`
config.

```yml
services:
  redis:
    image: redis:latest
    configs:
      - source: my_config
        target: /redis_config
        uid: "103"
        gid: "103"
        mode: 0440
configs:
  my_config:
    external: true
  my_other_config:
    external: true
```

### `container_name`

`container_name` is a string that specifies a custom container name, rather than a name generated by default.

```yml
container_name: my-web-container
```

Compose does not scale a service beyond one container if the Compose file specifies a
`container_name`. Attempting to do so results in an error.

`container_name` follows the regex format of `a-zA-Z0-9+`

### `credential_spec`

`credential_spec` configures the credential spec for a managed service account.

If you have services that use Windows containers, you can use `file:` and
`registry:` protocols for `credential_spec`. Compose also supports additional
protocols for custom use-cases.

The `credential_spec` must be in the format `file://<filename>` or `registry://<value-name>`.

```yml
credential_spec:
  file: my-credential-spec.json
```

When using `registry:`, the credential spec is read from the Windows registry on
the daemon's host. A registry value with the given name must be located in:

```bash
HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Virtualization\Containers\CredentialSpecs
```

The following example loads the credential spec from a value named `my-credential-spec`
in the registry:

```yml
credential_spec:
  registry: my-credential-spec
```

#### Example gMSA configuration

When configuring a gMSA credential spec for a service, you only need
to specify a credential spec with `config`, as shown in the following example:

```yml
services:
  myservice:
    image: myimage:latest
    credential_spec:
      config: my_credential_spec

configs:
  my_credentials_spec:
    file: ./my-credential-spec.json
```

### `depends_on`

With the `depends_on` attribute, you can control the order of service startup and shutdown. It is useful if services are closely coupled, and the startup sequence impacts the application's functionality.

#### Short syntax

The short syntax variant only specifies service names of the dependencies.
Service dependencies cause the following behaviors:

- Compose creates services in dependency order. In the following
  example, `db` and `redis` are created before `web`.

- Compose removes services in dependency order. In the following
  example, `web` is removed before `db` and `redis`.

Simple example:

```yml
services:
  web:
    build: .
    depends_on:
      - db
      - redis
  redis:
    image: redis
  db:
    image: postgres:18
```

Compose guarantees dependency services have been started before
starting a dependent service.
With short syntax, Compose does not wait for dependency services to be "healthy" before
starting a dependent service.

#### Long syntax

The long form syntax enables the configuration of additional fields that can't be
expressed in the short form.

- `restart`: When set to `true` Compose restarts this service after it updates the dependency service.
  This applies to an explicit restart controlled by a Compose operation, and excludes automated restart by the container runtime
  after the container dies. Introduced in Docker Compose version 2.17.0.

- `condition`: Sets the condition under which dependency is considered satisfied
  - `service_started`: An equivalent of the short syntax described previously
  - `service_healthy`: Specifies that a dependency is expected to be "healthy"
    (as indicated by `healthcheck`) before starting a dependent
    service.
  - `service_completed_successfully`: Specifies that a dependency is expected to run
    to successful completion before starting a dependent service.
- `required`: When set to `false` Compose only warns you when the dependency service isn't started or available. If it's not defined
    the default value of `required` is `true`. Introduced in Docker Compose version 2.20.0.

Service dependencies cause the following behaviors:

- Compose creates services in dependency order. In the following
  example, `db` and `redis` are created before `web`.

- Compose waits for healthchecks to pass on dependencies
  marked with `service_healthy`. In the following example, `db` is expected to
  be "healthy" before `web` is created.

- Compose removes services in dependency order. In the following
  example, `web` is removed before `db` and `redis`.

```yml
services:
  web:
    build: .
    depends_on:
      db:
        condition: service_healthy
        restart: true
      redis:
        condition: service_started
  redis:
    image: redis
  db:
    image: postgres:18
```

Compose guarantees dependency services are started before
starting a dependent service.
Compose guarantees dependency services marked with
`service_healthy` are "healthy" before starting a dependent service.

### `deploy`

`deploy` specifies the configuration for the deployment and lifecycle of services, as defined in the Compose Deploy Specification.

### `develop`

`develop` specifies the development configuration for maintaining a container in sync with source, as defined in the Development Section.

### `device_cgroup_rules`

`device_cgroup_rules` defines a list of device cgroup rules for this container.
The format is the same format the Linux kernel specifies in the Control Groups
Device Whitelist Controller.

```yml
device_cgroup_rules:
  - 'c 1:3 mr'
  - 'a 7:* rmw'
```

### `devices`

`devices` defines a list of device mappings for created containers in the form of
`HOST_PATH:CONTAINER_PATH[:CGROUP_PERMISSIONS]`.

```yml
devices:
  - "/dev/ttyUSB0:/dev/ttyUSB0"
  - "/dev/sda:/dev/xvda:rwm"
```

`devices` can also rely on the CDI syntax to let the container runtime select a device:

```yml
devices:
  - "vendor1.com/device=gpu"
```

### `dns`

`dns` defines custom DNS servers to set on the container network interface configuration. It can be a single value or a list.

```yml
dns: 8.8.8.8
```

```yml
dns:
  - 8.8.8.8
  - 9.9.9.9
```

### `dns_opt`

`dns_opt` list custom DNS options to be passed to the container’s DNS resolver (`/etc/resolv.conf` file on Linux).

```yml
dns_opt:
  - use-vc
  - no-tld-query
```

### `dns_search`

`dns_search` defines custom DNS search domains to set on container network interface configuration. It can be a single value or a list.

```yml
dns_search: example.com
```

```yml
dns_search:
  - dc1.example.com
  - dc2.example.com
```

### `domainname`

`domainname` declares a custom domain name to use for the service container. It must be a valid RFC 1123 hostname.

### `driver_opts`

`driver_opts` specifies a list of options as key-value pairs to pass to the driver. These options are
driver-dependent.

```yml
services:
  app:
    networks:
      app_net:
        driver_opts:
          com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
```

Consult the network drivers documentation for more information.
