---
title: "Manage sensitive data with Docker secrets (part 2 of 5)"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/engine/swarm/secrets.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# Manage sensitive data with Docker secrets (part 2 of 5)

## Examples

This section includes three graduated examples which illustrate how to use
Docker secrets. The images used in these examples have been updated to make it
easier to use Docker secrets. To find out how to modify your own images in
a similar way, see
Build support for Docker Secrets into your images.

> **Note:**
>
> These examples use a single-Engine swarm and unscaled services for
> simplicity. The examples use Linux containers, but Windows containers also
> support secrets. See Windows support.

### Simple example: Get started with secrets

This simple example shows how secrets work in just a few commands. For a
real-world example, continue to
Intermediate example: Use secrets with a Nginx service.

1.  Add a secret to Docker. The `docker secret create` command reads standard
    input because the last argument, which represents the file to read the
    secret from, is set to `-`.

    ```console
    $ printf "This is a secret" | docker secret create my_secret_data -
    ```

2.  Create a `redis` service and grant it access to the secret. By default,
    the container can access the secret at `/run/secrets/<secret_name>`, but
    you can customize the file name on the container using the `target` option.

    ```console
    $ docker service  create --name redis --secret my_secret_data redis:alpine
    ```

3.  Verify that the task is running without issues using `docker service ps`. If
    everything is working, the output looks similar to this:

    ```console
    $ docker service ps redis

    ID            NAME     IMAGE         NODE              DESIRED STATE  CURRENT STATE          ERROR  PORTS
    bkna6bpn8r1a  redis.1  redis:alpine  ip-172-31-46-109  Running        Running 8 seconds ago  
    ```

    If there were an error, and the task were failing and repeatedly restarting,
    you would see something like this:

    ```console
    $ docker service ps redis

    NAME                      IMAGE         NODE  DESIRED STATE  CURRENT STATE          ERROR                      PORTS
    redis.1.siftice35gla      redis:alpine  moby  Running        Running 4 seconds ago                             
     \_ redis.1.whum5b7gu13e  redis:alpine  moby  Shutdown       Failed 20 seconds ago      "task: non-zero exit (1)"  
     \_ redis.1.2s6yorvd9zow  redis:alpine  moby  Shutdown       Failed 56 seconds ago      "task: non-zero exit (1)"  
     \_ redis.1.ulfzrcyaf6pg  redis:alpine  moby  Shutdown       Failed about a minute ago  "task: non-zero exit (1)"  
     \_ redis.1.wrny5v4xyps6  redis:alpine  moby  Shutdown       Failed 2 minutes ago       "task: non-zero exit (1)"
    ```

4.  Get the ID of the `redis` service task container using `docker ps` , so that
    you can use `docker container exec` to connect to the container and read the contents
    of the secret data file, which defaults to being readable by all and has the
    same name as the name of the secret. The first command below illustrates
    how to find the container ID, and the second and third commands use shell
    completion to do this automatically.

    ```console
    $ docker ps --filter name=redis -q

    5cb1c2348a59

    $ docker container exec $(docker ps --filter name=redis -q) ls -l /run/secrets

    total 4
    -r--r--r--    1 root     root            17 Dec 13 22:48 my_secret_data

    $ docker container exec $(docker ps --filter name=redis -q) cat /run/secrets/my_secret_data

    This is a secret
    ```

5.  Verify that the secret is not available if you commit the container.

    ```console
    $ docker commit $(docker ps --filter name=redis -q) committed_redis

    $ docker run --rm -it committed_redis cat /run/secrets/my_secret_data

    cat: can't open '/run/secrets/my_secret_data': No such file or directory
    ```

6.  Try removing the secret. The removal fails because the `redis` service is
    running and has access to the secret.

    ```console
    $ docker secret ls

    ID                          NAME                CREATED             UPDATED
    wwwrxza8sxy025bas86593fqs   my_secret_data      4 hours ago         4 hours ago

    $ docker secret rm my_secret_data

    Error response from daemon: rpc error: code = 3 desc = secret
    'my_secret_data' is in use by the following service: redis
    ```

7.  Remove access to the secret from the running `redis` service by updating the
    service.

    ```console
    $ docker service update --secret-rm my_secret_data redis
    ```

8.  Repeat steps 3 and 4 again, verifying that the service no longer has access
    to the secret. The container ID is different, because the
    `service update` command redeploys the service.

    ```console
    $ docker container exec -it $(docker ps --filter name=redis -q) cat /run/secrets/my_secret_data

    cat: can't open '/run/secrets/my_secret_data': No such file or directory
    ```

9.  Stop and remove the service, and remove the secret from Docker.

    ```console
    $ docker service rm redis

    $ docker secret rm my_secret_data
    ```

### Simple example: Use secrets in a Windows service

This is a very simple example which shows how to use secrets with a Microsoft
IIS service running on Docker for Windows running Windows containers on
Microsoft Windows 10. It is a naive example that stores the webpage in a secret.

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

    ```console
    > docker swarm init
    ```

3.  Save the `index.html` file as a swarm secret named `homepage`.

    ```console
    > docker secret create homepage index.html
    ```

4.  Create an IIS service and grant it access to the `homepage` secret.

    ```console
    > docker service create `
        --name my-iis `
        --publish published=8000,target=8000 `
        --secret src=homepage,target="\inetpub\wwwroot\index.html" `
        microsoft/iis:nanoserver
    ```

    > **Note:**
    >
    > There is technically no reason to use secrets for this
    > example; configs are a better fit. This example is
    > for illustration only.

5.  Access the IIS service at `http://localhost:8000/`. It should serve
    the HTML content from the first step.

6.  Remove the service and the secret.

    ```console
    > docker service rm my-iis
    > docker secret rm homepage
    > docker image remove secret-test
    ```
