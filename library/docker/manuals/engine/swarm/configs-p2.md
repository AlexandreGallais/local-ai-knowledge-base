---
title: "Store configuration data using Docker Configs (part 2 of 3)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/configs.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Store configuration data using Docker Configs (part 2 of 3)

## Examples

This section includes graduated examples which illustrate how to use
Docker configs.

> **Note:**
>
> These examples use a single-engine swarm and unscaled services for
> simplicity. The examples use Linux containers, but Windows containers also
> support configs.

### Defining and using configs in compose files

The `docker stack` command supports defining configs in a Compose file.
However, the `configs` key is not supported for `docker compose`. See
the Compose file reference for details.

### Simple example: Get started with configs

This simple example shows how configs work in just a few commands. For a
real-world example, continue to
Advanced example: Use configs with a Nginx service.

1.  Add a config to Docker. The `docker config create` command reads standard
    input because the last argument, which represents the file to read the
    config from, is set to `-`.

    ```console
    $ echo "This is a config" | docker config create my-config -
    ```

2.  Create a `redis` service and grant it access to the config. By default,
    the container can access the config at `/my-config`, but
    you can customize the file name on the container using the `target` option.

    ```console
    $ docker service create --name redis --config my-config redis:alpine
    ```

3.  Verify that the task is running without issues using `docker service ps`. If
    everything is working, the output looks similar to this:

    ```console
    $ docker service ps redis

    ID            NAME     IMAGE         NODE              DESIRED STATE  CURRENT STATE          ERROR  PORTS
    bkna6bpn8r1a  redis.1  redis:alpine  ip-172-31-46-109  Running        Running 8 seconds ago
    ```

4.  Get the ID of the `redis` service task container using `docker ps`, so that
    you can use `docker container exec` to connect to the container and read the contents
    of the config data file, which defaults to being readable by all and has the
    same name as the name of the config. The first command below illustrates
    how to find the container ID, and the second and third commands use shell
    completion to do this automatically.

    ```console
    $ docker ps --filter name=redis -q

    5cb1c2348a59

    $ docker container exec $(docker ps --filter name=redis -q) ls -l /my-config

    -r--r--r--    1 root     root            12 Jun  5 20:49 my-config

    $ docker container exec $(docker ps --filter name=redis -q) cat /my-config

    This is a config
    ```

5.  Try removing the config. The removal fails because the `redis` service is
    running and has access to the config.

    ```console

    $ docker config ls

    ID                          NAME                CREATED             UPDATED
    fzwcfuqjkvo5foqu7ts7ls578   hello               31 minutes ago      31 minutes ago

    $ docker config rm my-config

    Error response from daemon: rpc error: code = 3 desc = config 'my-config' is
    in use by the following service: redis
    ```

6.  Remove access to the config from the running `redis` service by updating the
    service.

    ```console
    $ docker service update --config-rm my-config redis
    ```

7.  Repeat steps 3 and 4 again, verifying that the service no longer has access
    to the config. The container ID is different, because the
    `service update` command redeploys the service.

    ```console
    $ docker container exec -it $(docker ps --filter name=redis -q) cat /my-config

    cat: can't open '/my-config': No such file or directory
    ```

8.  Stop and remove the service, and remove the config from Docker.

    ```console
    $ docker service rm redis

    $ docker config rm my-config
    ```

### Simple example: Use configs in a Windows service

This is a very simple example which shows how to use configs with a Microsoft
IIS service running on Docker for Windows running Windows containers on
Microsoft Windows 10.  It is a naive example that stores the webpage in a config.

This example assumes that you have PowerShell installed.

1.  Save the following into a new file `index.html`.

    ```html
    <html lang="en">
      <head><title>Hello Docker</title></head>
      <body>
        <p>Hello Docker! You have deployed an HTML page.</p>
      </body>
    </html>
    ```

2.  If you have not already done so, initialize or join the swarm.

    ```powershell
    docker swarm init
    ```

3.  Save the `index.html` file as a swarm config named `homepage`.

    ```powershell
    docker config create homepage index.html
    ```

4.  Create an IIS service and grant it access to the `homepage` config.

    ```powershell
    docker service create
        --name my-iis
        --publish published=8000,target=8000
        --config src=homepage,target="\inetpub\wwwroot\index.html"
        microsoft/iis:nanoserver
    ```

5.  Access the IIS service at `http://localhost:8000/`. It should serve
    the HTML content from the first step.

6.  Remove the service and the config.

    ```powershell
    docker service rm my-iis

    docker config rm homepage
    ```

### Example: Use a templated config

To create a configuration in which the content will be generated using a
template engine, use the `--template-driver` parameter and specify the engine
name as its argument. The template will be rendered when container is created.

1.  Save the following into a new file `index.html.tmpl`.

    ```html
    <html lang="en">
      <head><title>Hello Docker</title></head>
      <body>
        <p>Hello {{ env "HELLO" }}! I'm service {{ .Service.Name }}.</p>
      </body>
    </html>
    ```

2.  Save the `index.html.tmpl` file as a swarm config named `homepage`. Provide
    parameter `--template-driver` and specify `golang` as template engine.

    ```console
    $ docker config create --template-driver golang homepage index.html.tmpl
    ```

3.  Create a service that runs Nginx and has access to the environment variable
    HELLO and to the config.

    ```console
    $ docker service create \
         --name hello-template \
         --env HELLO="Docker" \
         --config source=homepage,target=/usr/share/nginx/html/index.html \
         --publish published=3000,target=80 \
         nginx:alpine
    ```

4.  Verify that the service is operational: you can reach the Nginx server, and
    that the correct output is being served.

    ```console
    $ curl http://0.0.0.0:3000

    <html lang="en">
      <head><title>Hello Docker</title></head>
      <body>
        <p>Hello Docker! I'm service hello-template.</p>
      </body>
    </html>
    ```
