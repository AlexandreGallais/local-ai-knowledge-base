---
title: "Containerize an app with Docker tutorial (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/docker/build-container.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Containerize a .NET app

In this tutorial, you learn how to containerize a .NET application with Docker. Containers have many features and benefits, such as being an immutable infrastructure, providing a portable architecture, and enabling scalability. The image can be used to create containers for your local development environment, private cloud, or public cloud.

In this tutorial, you:

>
> - Create and publish a simple .NET app
> - Create and configure a Dockerfile for .NET
> - Build a Docker image
> - Create and run a Docker container

You explore the Docker container build and deploy tasks for a .NET application. The _Docker platform_ uses the _Docker engine_ to quickly build and package apps as _Docker images_. These images are written in the _Dockerfile_ format to be deployed and run in a layered container.

> **Tip:**
> If you're interested in publishing your .NET app as a container without the need for Docker or Podman, see Containerize a .NET app with dotnet publish.

> **Note:**
> This tutorial **is not** for ASP.NET Core apps. If you're using ASP.NET Core, see the Learn how to containerize an ASP.NET Core application tutorial.

## Prerequisites

Install the following prerequisites:

**dotnet-11-0:**

- .NET 11+ SDK.\
If you have .NET installed, use the `dotnet --info` command to determine which SDK you're using.

**dotnet-10-0:**

- .NET 10+ SDK.\
If you have .NET installed, use the `dotnet --info` command to determine which SDK you're using.

**dotnet-9-0:**

- .NET 9+ SDK.\
If you have .NET installed, use the `dotnet --info` command to determine which SDK you're using.

**dotnet-8-0:**

- .NET 8+ SDK.\
If you have .NET installed, use the `dotnet --info` command to determine which SDK you're using.

- Docker Community Edition.
- A temporary working folder for the _Dockerfile_ and .NET example app. In this tutorial, the name _docker-working_ is used as the working folder.

## Create .NET app

You need a .NET app that the Docker container runs. Open your terminal, create a working folder if you haven't already, and enter it. In the working folder, run the following command to create a new project in a subdirectory named _App_:

```dotnetcli
dotnet new console -o App -n DotNet.Docker
```

Your folder tree looks similar to the following directory structure:

```directory
📁 docker-working
    └──📂 App
        ├──DotNet.Docker.csproj
        ├──Program.cs
        └──📂 obj
            ├── DotNet.Docker.csproj.nuget.dgspec.json
            ├── DotNet.Docker.csproj.nuget.g.props
            ├── DotNet.Docker.csproj.nuget.g.targets
            ├── project.assets.json
            └── project.nuget.cache
```

The `dotnet new` command creates a new folder named _App_ and generates a "Hello World" console application. Now, you change directories and navigate into the _App_ folder from your terminal session. Use the `dotnet run` command to start the app. The application runs, and prints `Hello World!` below the command:

```dotnetcli
cd App
dotnet run
Hello World!
```

The default template creates an app that prints to the terminal and then immediately terminates. For this tutorial, you use an app that loops indefinitely. Open the _Program.cs_ file in a text editor.

> **Tip:**
> If you're using Visual Studio Code, from the previous terminal session type the following command:
>
> ```console
> code .
> ```
>
> This command opens the _App_ folder that contains the project in Visual Studio Code.

The _Program.cs_ should look like the following C# code:

```csharp
Console.WriteLine("Hello World!");
```

Replace the file with the following code that counts numbers every second:

```csharp
﻿var counter = 0;
var max = args.Length is not 0 ? Convert.ToInt32(args[0]) : -1;

while (max is -1 || counter < max)
{
    Console.WriteLine($"Counter: {++counter}");

    await Task.Delay(TimeSpan.FromMilliseconds(1_000));
}
```
Save the file and test the program again with `dotnet run`. Remember that this app runs indefinitely. Use the cancel command `Ctrl+C` to stop it. Consider the following example output:

```dotnetcli
dotnet run
Counter: 1
Counter: 2
Counter: 3
Counter: 4
^C
```

If you pass a number on the command line to the app, it limits the count to that amount and then exits. Try it with `dotnet run -- 5` to count to five.

> **Important:**
> Any parameters after `--` aren't passed to the `dotnet run` command and instead are passed to your application.

## Publish .NET app

In order for the app to be suitable for an image creation it has to compile. The `dotnet publish` command is most apt for this, as it builds and publishes the app. For an in-depth reference, see dotnet build and dotnet publish commands documentation.

```dotnetcli
dotnet publish -c Release
```

> **Tip:**
> If you're interested in publishing your .NET app as a container without the need for Docker, see Containerize a .NET app with dotnet publish.

The `dotnet publish` command compiles your app to the _publish_ folder. The path to the _publish_ folder from the working folder should be _./App/bin/Release/\<TFM\>/publish/_:

#### Windows

From the _App_ folder, get a directory listing of the publish folder to verify that the _DotNet.Docker.dll_ file was created.

```powershell
dir .\bin\Release\net9.0\publish\

    Directory: C:\Users\default\docker-working\App\bin\Release\net9.0\publish

Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          1/6/2025  10:11 AM            431 DotNet.Docker.deps.json
-a----          1/6/2025  10:11 AM           6144 DotNet.Docker.dll
-a----          1/6/2025  10:11 AM         145408 DotNet.Docker.exe
-a----          1/6/2025  10:11 AM          11716 DotNet.Docker.pdb
-a----          1/6/2025  10:11 AM            340 DotNet.Docker.runtimeconfig.json
```

#### Linux

Use the `ls` command to get a directory listing and verify that the _DotNet.Docker.dll_ file was created.

```bash
me@DESKTOP:/docker-working/app$ ls bin/Release/net9.0/publish
DotNet.Docker.deps.json  DotNet.Docker.dll  DotNet.Docker.exe  DotNet.Docker.pdb  DotNet.Docker.runtimeconfig.json
```

---

## Create the Dockerfile

The _Dockerfile_ file is used by the `docker build` command to create a container image. This file is a text file named _Dockerfile_ that doesn't have an extension.

Create a file named _Dockerfile_ in the directory containing the _.csproj_ and open it in a text editor. This tutorial uses the ASP.NET Core runtime image (which contains the .NET runtime image) and corresponds with the .NET console application.

```docker
FROM mcr.microsoft.com/dotnet/sdk:9.0@sha256:3fcf6f1e809c0553f9feb222369f58749af314af6f063f389cbd2f913b4ad556 AS build
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:9.0@sha256:b4bea3a52a0a77317fa93c5bbdb076623f81e3e2f201078d89914da71318b5d8
WORKDIR /App
COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]
```
> **Note:**
> The ASP.NET Core runtime image is used intentionally here, although the `mcr.microsoft.com/dotnet/runtime:9.0` image could be used instead.

> **Important:**
> Including a secure hash algorithm (SHA) after the image tag in a _Dockerfile_ is a best practice. This ensures that the image is not tampered with and that the image is the same as the one you expect. The SHA is a unique identifier for the image. For more information, see Docker Docs: Pull an image by digest.

> **Tip:**
> This _Dockerfile_ uses multi-stage builds, which optimize the final size of the image by layering the build and leaving only required artifacts. For more information, see Docker Docs: multi-stage builds.

The `FROM` keyword requires a fully qualified Docker container image name. The Microsoft Container Registry (MCR, mcr.microsoft.com) is a syndicate of Docker Hub, which hosts publicly accessible containers. The `dotnet` segment is the container repository, whereas the `sdk` or `aspnet` segment is the container image name. The image is tagged with `9.0`, which is used for versioning. Thus, `mcr.microsoft.com/dotnet/aspnet:9.0` is the .NET 9.0 runtime. Make sure that you pull the runtime version that matches the runtime targeted by your SDK. For example, the app created in the previous section used the .NET 9.0 SDK, and the base image referred to in the _Dockerfile_ is tagged with **9.0**.

> **Important:**
> When using Windows-based container images, you need to specify the image tag beyond simply `9.0`, for example, `mcr.microsoft.com/dotnet/aspnet:9.0-nanoserver-1809` instead of `mcr.microsoft.com/dotnet/aspnet:9.0`. Select an image name based on whether you're using Nano Server or Windows Server Core and which version of that OS. You can find a full list of all supported tags on .NET's Docker Hub page.

Save the _Dockerfile_ file. The directory structure of the working folder should look like the following. Some of the deeper-level files and folders are omitted to save space in the article:

```directory
📁 docker-working
    └──📂 App
        ├── Dockerfile
        ├── DotNet.Docker.csproj
        ├── Program.cs
        ├──📂 bin
        │   └───📂 Release
        │        └───📂 net9.0
        │             ├───📂 publish
        │             │    ├─── DotNet.Docker.deps.json
        │             │    ├─── DotNet.Docker.dll
        │             │    ├─── DotNet.Docker.exe
        │             │    ├─── DotNet.Docker.pdb
        │             │    └─── DotNet.Docker.runtimeconfig.json
        │             ├─── DotNet.Docker.deps.json
        │             ├─── DotNet.Docker.dll
        │             ├─── DotNet.Docker.exe
        │             ├─── DotNet.Docker.pdb
        │             └─── DotNet.Docker.runtimeconfig.json
        └──📁 obj
            └──...
```

The `ENTRYPOINT` instruction sets `dotnet` as the host for the `DotNet.Docker.dll`. However, it's possible to instead define the `ENTRYPOINT` as the app executable itself, relying on the OS as the app host:

```dockerfile
ENTRYPOINT ["./DotNet.Docker"]
```

This causes the app to be executed directly, without `dotnet`, and instead relies on the app host and the underlying OS. For more information on publishing cross-platform binaries, see Cross-platform DLL deployment.

To build the container, from your terminal, run the following command:

```console
docker build -t counter-image -f Dockerfile .
```

Docker processes each line in the _Dockerfile_. The `.` in the `docker build` command sets the build context of the image. The `-f` switch is the path to the _Dockerfile_. This command builds the image and creates a local repository named **counter-image** that points to that image. After this command finishes, run `docker images` to see a list of images installed:

```console
REPOSITORY       TAG       IMAGE ID       CREATED          SIZE
counter-image    latest    1c1f1433e51d   32 seconds ago   223MB
```

The `counter-image` repository is the name of the image. Additionally, the image tag, image identifier, size and when it was created are all part of the output. The final steps of the _Dockerfile_ are to create a container from the image and run the app, copy the published app to the container, and define the entry point:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /App
COPY --from=build /App/out .
ENTRYPOINT ["dotnet", "DotNet.Docker.dll"]
```

The `FROM` command specifies the base image and tag to use. The `WORKDIR` command changes the **current directory** inside of the container to _App_.

The `COPY` command tells Docker to copy the specified source directory to a destination folder. In this example, the _publish_ contents in the `build` layer are output into the folder named _App/out_, so it's the source to copy from. All of the published contents in the _App/out_ directory are copied into current working directory (_App_).

The next command, `ENTRYPOINT`, tells Docker to configure the container to run as an executable. When the container starts, the `ENTRYPOINT` command runs. When this command ends, the container automatically stops.

> **Tip:**
> Before .NET 8, containers configured to run as read-only might fail with `Failed to create CoreCLR, HRESULT: 0x8007000E`. To address this issue, specify a `DOTNET_EnableDiagnostics` environment variable as `0` (just before the `ENTRYPOINT` step):
>
> ```dockerfile
> ENV DOTNET_EnableDiagnostics=0
> ```
>
> For more information on various .NET environment variables, see .NET environment variables.
