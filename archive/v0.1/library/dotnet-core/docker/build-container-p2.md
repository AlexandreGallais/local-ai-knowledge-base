---
title: "Containerize an app with Docker tutorial (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/docker/build-container.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Containerize an app with Docker tutorial (part 2 of 2)

## Create a container

Now that you have an image that contains your app, you can create a container. You can create a container in two ways. First, create a new container that is stopped.

```console
docker create --name core-counter counter-image
```

This `docker create` command creates a container based on the **counter-image** image. The output of the `docker create` command shows you the **CONTAINER ID** of the container (your identifier will be different):

```console
d0be06126f7db6dd1cee369d911262a353c9b7fb4829a0c11b4b2eb7b2d429cf
```

To see a list of _all_ containers, use the `docker ps -a` command:

```console
docker ps -a
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS    PORTS     NAMES
d0be06126f7d   counter-image   "dotnet DotNet.Docke…"   12 seconds ago   Created             core-counter
```

### Manage the container

The container was created with a specific name `core-counter`. This name is used to manage the container. The following example uses the `docker start` command to start the container, and then uses the `docker ps` command to only show containers that are running:

```console
docker start core-counter
core-counter

docker ps
CONTAINER ID   IMAGE           COMMAND                  CREATED          STATUS          PORTS     NAMES
cf01364df453   counter-image   "dotnet DotNet.Docke…"   53 seconds ago   Up 10 seconds             core-counter
```

Similarly, the `docker stop` command stops the container. The following example uses the `docker stop` command to stop the container, and then uses the `docker ps` command to show that no containers are running:

```console
docker stop core-counter
core-counter

docker ps
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

### Connect to a container

After a container is running, you can connect to it to see the output. Use the `docker start` and `docker attach` commands to start the container and peek at the output stream. In this example, the `Ctrl+C` keystroke is used to detach from the running container. This keystroke ends the process in the container unless otherwise specified, which would stop the container. The `--sig-proxy=false` parameter ensures that `Ctrl+C` doesn't stop the process in the container.

After you detach from the container, reattach to verify that it's still running and counting.

```console
docker start core-counter
core-counter

docker attach --sig-proxy=false core-counter
Counter: 7
Counter: 8
Counter: 9
^C

docker attach --sig-proxy=false core-counter
Counter: 17
Counter: 18
Counter: 19
^C
```

### Delete a container

For this article, you don't want containers hanging around that don't do anything. Delete the container you previously created. If the container is running, stop it.

```console
docker stop core-counter
```

The following example lists all containers. It then uses the `docker rm` command to delete the container and then checks a second time for any running containers.

```console
docker ps -a
CONTAINER ID    IMAGE            COMMAND                   CREATED          STATUS                        PORTS    NAMES
2f6424a7ddce    counter-image    "dotnet DotNet.Dock…"    7 minutes ago    Exited (143) 20 seconds ago            core-counter

docker rm core-counter
core-counter

docker ps -a
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

### Single run

Docker provides the `docker run` command to create and run the container as a single command. This command eliminates the need to run `docker create` and then `docker start`. You can also set this command to automatically delete the container when the container stops. For example, use `docker run -it --rm` to do two things, first, automatically use the current terminal to connect to the container, and then when the container finishes, remove it:

```console
docker run -it --rm counter-image
Counter: 1
Counter: 2
Counter: 3
Counter: 4
Counter: 5
^C
```

The container also passes parameters into the execution of the .NET app. To instruct the .NET app to count only to three, pass in 3.

```console
docker run -it --rm counter-image 3
Counter: 1
Counter: 2
Counter: 3
```

With `docker run -it`, the `Ctrl+C` command stops the process that's running in the container, which in turn, stops the container. Since the `--rm` parameter was provided, the container is automatically deleted when the process is stopped. Verify that it doesn't exist:

```console
docker ps -a
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

### Change the ENTRYPOINT

The `docker run` command also lets you modify the `ENTRYPOINT` command from the _Dockerfile_ and run something else, but only for that container. For example, use the following command to run `bash` or `cmd.exe`. Edit the command as necessary.

#### Windows

In this example, `ENTRYPOINT` is changed to `cmd.exe`. `Ctrl+C` is pressed to end the process and stop the container.

```console
docker run -it --rm --entrypoint "cmd.exe" counter-image

Microsoft Windows [Version 10.0.17763.379]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\>dir
 Volume in drive C has no label.
 Volume Serial Number is 3005-1E84

 Directory of C:\

04/09/2019  08:46 AM    <DIR>          app
03/07/2019  10:25 AM             5,510 License.txt
04/02/2019  01:35 PM    <DIR>          Program Files
04/09/2019  01:06 PM    <DIR>          Users
04/02/2019  01:35 PM    <DIR>          Windows
               1 File(s)          5,510 bytes
               4 Dir(s)  21,246,517,248 bytes free

C:\>^C
```

> **Note:**
> This example only works on Windows containers. Linux containers don't have `cmd.exe`.

#### Linux

In this example, `ENTRYPOINT` is changed to `bash`. The `exit` command is run which ends the process and stop the container.

```bash
docker run -it --rm --entrypoint "bash" counter-image
root@9f8de8fbd4a8:/App# ls
DotNet.Docker  DotNet.Docker.deps.json  DotNet.Docker.dll  DotNet.Docker.pdb  DotNet.Docker.runtimeconfig.json
root@9f8de8fbd4a8:/App# dotnet DotNet.Docker.dll 7
Counter: 1
Counter: 2
Counter: 3
^C
root@9f8de8fbd4a8:/App# exit
exit
```

> **Note:**
> This example only works on Linux containers. Windows containers don't have `bash`.

---

## Essential commands

Docker has many different commands that create, manage, and interact with containers and images. These Docker commands are essential to managing your containers:

- docker build
- docker run
- docker ps
- docker stop
- docker rm
- docker rmi
- docker image

## Clean up resources

During this tutorial, you created containers and images. If you want, delete these resources. Use the following commands to

01. List all containers

    ```console
    docker ps -a
    ```

02. Stop containers that are running by their name.

    ```console
    docker stop core-counter
    ```

03. Delete the container

    ```console
    docker rm core-counter
    ```

Next, delete any images that you no longer want on your machine. Delete the image created by your _Dockerfile_ and then delete the .NET image the _Dockerfile_ was based on. You can use the **IMAGE ID** or the **REPOSITORY:TAG** formatted string.

**dotnet-11-0:**

```console
docker rmi counter-image:latest
docker rmi mcr.microsoft.com/dotnet/aspnet:11.0
```

**dotnet-10-0:**

```console
docker rmi counter-image:latest
docker rmi mcr.microsoft.com/dotnet/aspnet:10.0
```

**dotnet-9-0:**

```console
docker rmi counter-image:latest
docker rmi mcr.microsoft.com/dotnet/aspnet:9.0
```

**dotnet-8-0:**

```console
docker rmi counter-image:latest
docker rmi mcr.microsoft.com/dotnet/aspnet:8.0
```

Use the `docker images` command to see a list of images installed.

> **Tip:**
> Image files can be large. Typically, you would remove temporary containers you created while testing and developing your app. You usually keep the base images with the runtime installed if you plan on building other images based on that runtime.

## Next steps

- Containerize a .NET app with dotnet publish
- .NET container images
- Containerize an ASP.NET Core application
- Azure services that support containers
- Dockerfile commands
- Container Tools for Visual Studio
