---
title: "Define services in Docker Compose (part 6 of 7)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/reference/compose-file/services.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Define services in Docker Compose (part 6 of 7)

### pre_start

`pre_start` defines a sequence of init containers to run before the service container is started. Each step runs to completion, in declared order, and the service container only starts once every step has exited `0`. A non-zero exit fails the bring-up of the service and its dependents.

Unlike `post_start` and `pre_stop`, which run a command inside the running service container, each `pre_start` step runs in its own ephemeral container, created after the service container is created but before it is started. Possible values are:

- `command`: The command to run. Optional when the chosen image's entrypoint already runs the intended command.
- `image`: The image used for the ephemeral container. If omitted, the parent service's image is used.
- `user`: The user to run the command. If not set, defaults to the user declared in `image` (or to the main service command's user when `image` is omitted).
- `privileged`: Lets the `pre_start` command run with privileged access.
- `working_dir`: The working directory in which to run the command. If not set, it is run in the same working directory as the main service command.
- `environment`: Sets the environment variables to run the `pre_start` command. The command inherits the `environment` set for the service's main command, and this section lets you append or override values.
- `per_replica: false`: Whether the step runs once for the service as a whole before any replica starts.

`pre_start` steps only run once the service's `depends_on` conditions have been satisfied, so a step can rely on those dependencies the same way the main service command does. A`pre_start` container joins the same networks as the service, so it can reach services declared in `depends_on`, and shares the service's declared volume mounts so files it produces in a shared volume are visible to the service.

With `per_replica: false` and a scaled service, only mounts that are shared across replicas (named volumes, bind mounts) are usable. Per-instance mounts (`tmpfs`, anonymous volumes) cannot be addressed by a single run. This is not an error. The steps run without access to per-instance mounts. Data a `per_replica: false` step must share with the service belongs in a named volume or bind mount.

A `pre_start` step that has already succeeded for its current definition is not re-run on a subsequent `up`, nor when the service container restarts under its `restart` policy. A step runs again when its definition changes, when the previous run did not succeed, or when the service is recreated. For example, after a change to the service configuration or an explicit forced recreation.

```yaml
services:
  app:
    image: myapp:latest
    depends_on:
      db:
        condition: service_healthy
    pre_start:
      - command: ["./manage.py", "migrate"]
      - image: busybox
        command: sh -c 'chown -R 1000:1000 /data'
    volumes:
      - data:/data

  db:
    image: postgres:16

volumes:
  data:
```

### `pre_stop`

`pre_stop` defines a sequence of lifecycle hooks to run before the container is stopped. These hooks won't run if the container stops by itself or is terminated suddenly.

Configuration is equivalent to `post_start`.

### `privileged`

`privileged` configures the service container to run with elevated privileges. Support and actual impacts are platform specific.

### `profiles`

`profiles` defines a list of named profiles for the service to be enabled under. If unassigned, the service is always started but if assigned, it is only started if the profile is activated.

If present, `profiles` follow the regex format of `a-zA-Z0-9+`.

```yaml
services:
  frontend:
    image: frontend
    profiles: ["frontend"]

  phpmyadmin:
    image: phpmyadmin
    depends_on:
      - db
    profiles:
      - debug
```

### `provider`

`provider` can be used to define a service that Compose won't manage directly. Compose delegated the service lifecycle to a dedicated or third-party component.

```yaml
  database:
    provider:
      type: awesomecloud
      options:
        type: mysql
        foo: bar
  app:
    image: myapp
    depends_on:
       - database
```

As Compose runs the application, the `awesomecloud` binary is used to manage the `database` service setup.
Dependent service `app` receives additional environment variables prefixed by the service name so it can access the resource.

For illustration, assuming `awesomecloud` execution produced variables `URL` and `API_KEY`, the `app` service
runs with environment variables `DATABASE_URL` and `DATABASE_API_KEY`.

As Compose stops the application, the `awesomecloud` binary is used to manage the `database` service tear down.

The mechanism used by Compose to delegate the service lifecycle to an external binary is described in the Compose extensibility documentation.

For more information on using the `provider` attribute, see Use provider services.

#### `type`

`type` attribute is required. It defines the external component used by Compose to manage setup and tear down lifecycle
events.

#### `options`

`options` are specific to the selected provider and not validated by the compose specification

### `pull_policy`

`pull_policy` defines the decisions Compose makes when it starts to pull images. Possible values are:

- `always`: Compose always pulls the image from the registry.
- `never`: Compose doesn't pull the image from a registry and relies on the platform cached image.
   If there is no cached image, a failure is reported.
- `missing`: Compose pulls the image only if it's not available in the platform cache.
   This is the default option if you are not also using the Compose Build Specification.
  `if_not_present` is considered an alias for this value for backward compatibility. The `latest` tag is always pulled even when the `missing` pull policy is used.
- `build`: Compose builds the image. Compose rebuilds the image if it's already present.
- `daily`: Compose checks the registry for image updates if the last pull took place more than 24 hours ago.
- `weekly`: Compose checks the registry for image updates if the last pull took place more than 7 days ago.
- `every_<duration>`: Compose checks the registry for image updates if the last pull took place before `<duration>`. Duration can be expressed in weeks (`w`), days (`d`), hours (`h`), minutes (`m`), seconds (`s`) or a combination of these.

```yaml
services:
  test:
    image: nginx
    pull_policy: every_12h
```

### `read_only`

`read_only` configures the service container to be created with a read-only filesystem.

### `restart`

`restart` defines the policy that the platform applies on container termination.

- `no`: The default restart policy. It does not restart the container under any circumstances.
- `always`: The policy always restarts the container until its removal.
- `on-failure[:max-retries]`: The policy restarts the container if the exit code indicates an error.
Optionally, limit the number of restart retries the Docker daemon attempts.
- `unless-stopped`: The policy restarts the container irrespective of the exit code but stops
  restarting when the service is stopped or removed.

```yml
    restart: "no"
    restart: always
    restart: on-failure
    restart: on-failure:3
    restart: unless-stopped
```

You can find more detailed information on restart policies in the
Restart Policies (--restart)
section of the Docker run reference page.

### `runtime`

`runtime` specifies which runtime to use for the service’s containers.

For example, `runtime` can be the name of an implementation of OCI Runtime Spec, such as "runc".

```yml
web:
  image: busybox:latest
  command: true
  runtime: runc
```

The default is `runc`. To use a different runtime, see Alternative runtimes.

### `scale`

`scale` specifies the default number of containers to deploy for this service.
When both are set, `scale` must be consistent with the `replicas` attribute in the Deploy Specification.

### `secrets`

The `secrets` attribute grants access to sensitive data defined by the secrets top-level element on a per-service basis. Services can be granted access to multiple secrets.

Two different syntax variants are supported; the short syntax and the long syntax. Long and short syntax for secrets may be used in the same Compose file.

Compose reports an error if the secret doesn'<example-value>'t defined in the
`secrets` top-level section of the Compose file.

Defining a secret in the top-level `secrets` must not imply granting any service access to it.
Such grant must be explicit within service specification as secrets service element.

#### Short syntax

The short syntax variant only specifies the secret name. This grants the
container access to the secret and mounts it as read-only to `/run/secrets/<secret_name>`
within the container. The source name and destination mountpoint are both set
to the secret name.

The following example uses the short syntax to grant the `frontend` service
access to the `server-certificate` secret. The value of `server-certificate` is set
to the contents of the file `./server.cert`.

```yml
services:
  frontend:
    image: example/webapp
    secrets:
      - server-certificate
secrets:
  server-certificate:
    file: ./server.cert
```

#### Long syntax

The long syntax provides more granularity in how the secret is created within
the service's containers.

- `source`: The name of the secret as it exists on the platform.
- `target`: The name of the file to be mounted in `/run/secrets/` in the
  service's task container, or absolute path of the file if an alternate location is required. Defaults to `source` if not specified.
- `uid` and `gid`: The numeric uid or gid that owns the file within
  `/run/secrets/` in the service's task containers.
- `mode`: The permissions for the file to be mounted in `/run/secrets/`
  in the service's task containers, in octal notation.
  The default value is world-readable permissions (mode `0444`).
  The writable bit must be ignored if set. The executable bit may be set.

Note that support for `uid`, `gid`, and `mode` attributes are only implemented in Docker Compose when the source of the secret is `environment`. When the source is a `file`, Compose uses a bind-mount under the hood which doesn't allow `uid` remapping, and these attributes are silently ignored.

The following example sets the name of the `my-token` secret file within the container,
sets the mode to `0440` (group-readable), and sets the user and group to `103`.
The value of `my-token` is read from the `MY_TOKEN` environment variable.

```yml
services:
  frontend:
    image: example/webapp
    secrets:
      - source: my-token
        uid: "103"
        gid: "103"
        mode: 0o440
secrets:
  my-token:
    environment: "MY_TOKEN"
```

### `security_opt`

`security_opt` overrides the default labeling scheme for each container.

Options accept either `option=value` or `option:value` syntax. For boolean options
such as `no-new-privileges`, the value may be omitted entirely, in which case the
option is treated as enabled. The following syntaxes are all equivalent:

```yml
security_opt:
  - no-new-privileges
  - no-new-privileges=true
  - no-new-privileges:true
```

```yml
security_opt:
  - label=user:USER
  - label=role:ROLE
```

For further default labeling schemes you can override, see Security configuration.

### `shm_size`

`shm_size` configures the size of the shared memory (`/dev/shm` partition on Linux) allowed by the service container.
It's specified as a byte value.

### `stdin_open`

`stdin_open` configures a service's container to run with an allocated stdin. This is the same as running a container with the
`-i` flag. For more information, see Keep stdin open.

Supported values are `true` or `false`.

### `stop_grace_period`

`stop_grace_period` specifies how long Compose must wait when attempting to stop a container if it doesn't
handle SIGTERM (or whichever stop signal has been specified with
`stop_signal`), before sending SIGKILL. It's specified
as a duration.

```yml
    stop_grace_period: 1s
    stop_grace_period: 1m30s
```

Default value is 10 seconds for the container to exit before sending SIGKILL.

### `stop_signal`

`stop_signal` defines the signal that Compose uses to stop the service containers.
If unset containers are stopped by Compose by sending `SIGTERM`.

```yml
stop_signal: SIGUSR1
```

### `storage_opt`

`storage_opt` defines storage driver options for a service.

```yml
storage_opt:
  size: '1G'
```

### `sysctls`

`sysctls` defines kernel parameters to set in the container. `sysctls` can use either an array or a map.

```yml
sysctls:
  net.core.somaxconn: 1024
  net.ipv4.tcp_syncookies: 0
```

```yml
sysctls:
  - net.core.somaxconn=1024
  - net.ipv4.tcp_syncookies=0
```

You can only use sysctls that are namespaced in the kernel. Docker does not
support changing sysctls inside a container that also modify the host system.
For an overview of supported sysctls, refer to configure namespaced kernel
parameters (sysctls) at runtime.

### `tmpfs`

`tmpfs` mounts a temporary file system inside the container. It can be a single value or a list.

```yml
tmpfs:
 - <path>
 - <path>:<options>
```

- `path`: The path inside the container where the tmpfs will be mounted.
- `options`: Comma-separated list of options for the tmpfs mount.

Available options:

- `mode`: Sets the file system permissions.
- `uid`: Sets the user ID that owns the mounted tmpfs.
- `gid`: Sets the group ID that owns the mounted tmpfs.

```yml
services:
  app:
    tmpfs:
      - /data:mode=755,uid=1009,gid=1009
      - /run
```

### `tty`

`tty` configures a service's container to run with a TTY. This is the same as running a container with the
`-t` or `--tty` flag. For more information, see Allocate a pseudo-TTY.

Supported values are `true` or `false`.

### `ulimits`

`ulimits` overrides the default `ulimits` for a container. It's specified either as an integer for a single limit
or as mapping for soft/hard limits.

```yml
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000
```

### `use_api_socket`

When `use_api_socket` is set, the container is able to interact with the underlying container engine through the API socket.
Your credentials are mounted inside the container so the container acts as a pure delegate for your commands relating to the container engine.
Typically, commands ran by container can `pull` and `push` to your registry.

### `user`

`user` overrides the user used to run the container process. The default is set by the image, for example Dockerfile `USER`. If it's not set, then `root`.

### `userns_mode`

`userns_mode` sets the user namespace for the service. Supported values are platform specific and may depend
on platform configuration.

```yml
userns_mode: "host"
```
