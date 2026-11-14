---
title: "Containerize a .NET app reference (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/containers/publish-configuration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Containerize a .NET app reference (part 2 of 3)

## Flags that control execution metadata

The following properties control runtime-specific execution behavior and multi-architecture image generation:

- `ContainerAppCommand`
- `ContainerAppCommandArgs`
- `ContainerAppCommandInstruction`
- `ContainerDefaultArgs`
- `ContainerEntrypoint` (deprecated)
- `ContainerEntrypointArgs` (deprecated)
- `ContainerEnvironmentVariable`
- `ContainerPort`
- `ContainerPublishInParallel`
- `ContainerUser`
- `ContainerWorkingDirectory`

### `ContainerAppCommand`

The app command configuration item is the logical entry point of your app. For most apps, this is the AppHost, the generated executable binary for your app. If your app doesn't generate an AppHost, then this command is typically `dotnet <your project dll>`. These values are applied after any `ENTRYPOINT` in your base container, or directly if no `ENTRYPOINT` is defined.

The `ContainerAppCommand` configuration has a single `Include` property, which represents the command, option, or argument to use in the entrypoint command:

```xml
<ItemGroup Label="ContainerAppCommand Assignment">
  <!-- This is how you would start the dotnet ef tool in your container -->
  <ContainerAppCommand Include="dotnet" />
  <ContainerAppCommand Include="ef" />

  <!-- This shorthand syntax means the same thing, note the semicolon separating the tokens. -->
  <ContainerAppCommand Include="dotnet;ef" />
</ItemGroup>
```

### `ContainerAppCommandArgs`

This app command args configuration item represents any logically required arguments for your app that should be applied to the `ContainerAppCommand`. By default, none are generated for an app. When present, the args are applied to your container when it runs.

The `ContainerAppCommandArgs` configuration has a single `Include` property, which represents the option or argument to apply to the `ContainerAppCommand` command.

```xml
<ItemGroup>
  <!-- Assuming the ContainerAppCommand defined above,
       this would be the way to force the database to update.
  -->
  <ContainerAppCommandArgs Include="database" />
  <ContainerAppCommandArgs Include="update" />

  <!-- This is the shorthand syntax for the same idea -->
  <ContainerAppCommandArgs Include="database;update" />
</ItemGroup>
```

### `ContainerAppCommandInstruction`

The app command instruction configuration helps control the way the `ContainerEntrypoint`, `ContainerEntrypointArgs`, `ContainerAppCommand`, `ContainerAppCommandArgs`, and `ContainerDefaultArgs` are combined to form the final command that is run in the container. This depends greatly on if an `ENTRYPOINT` is present in the base image. This property takes one of three values: `"DefaultArgs"`, `"Entrypoint"`, or `"None"`.

- `Entrypoint`:
  - In this mode, the entrypoint is defined by `ContainerAppCommand`, `ContainerAppCommandArgs`, and `ContainerDefaultArgs`.
- `None`:
  - In this mode, the entrypoint is defined by `ContainerEntrypoint`, `ContainerEntrypointArgs`, and `ContainerDefaultArgs`.
- `DefaultArgs`:
  - This is the most complex mode—if none of the `ContainerEntrypoint[Args]` items are present, the `ContainerAppCommand[Args]` and `ContainerDefaultArgs` are used to create the entrypoint and command. The base image entrypoint for base images that have it hard-coded to `dotnet` or `/usr/bin/dotnet` is skipped so that you have complete control.
  - If both `ContainerEntrypoint` and `ContainerAppCommand` are present, then `ContainerEntrypoint` becomes the entrypoint, and `ContainerAppCommand` becomes the command.

> **Note:**
> The `ContainerEntrypoint` and `ContainerEntrypointArgs` configuration items are deprecated as of .NET 8.

> **Important:**
> This is for advanced users-most apps shouldn't need to customize their entrypoint to this degree. For more information and if you'd like to provide use cases for your scenarios, see GitHub: .NET SDK container builds discussions.

### `ContainerDefaultArgs`

This default args configuration item represents any user-overridable arguments for your app. This is a good way to provide defaults that your app might need to run in a way that makes it easy to start, yet still easy to customize.

The `ContainerDefaultArgs` configuration has a single `Include` property, which represents the option or argument to apply to the `ContainerAppCommand` command.

```xml
<ItemGroup>
  <!-- Assuming the ContainerAppCommand defined above,
       this would be the way to force the database to update.
  -->
  <ContainerDefaultArgs Include="database" />
  <ContainerDefaultArgs Include="update" />

  <!-- This is the shorthand syntax for the same idea -->
  <ContainerDefaultArgs Include="database;update" />
</ItemGroup>
```

### `ContainerEntrypoint`

> **Note:**
> This item is deprecated as of .NET 8. Use `ContainerAppCommand` instead, with `ContainerAppCommandInstruction` set to `Entrypoint` or `DefaultArgs`.

The container entrypoint controls the binary that runs by default when the container starts. By default, for builds that create an executable binary, that binary is set as the `ContainerEntrypoint`. For builds that don't create an executable binary, `dotnet path/to/application.dll` is used.

The `ContainerEntrypoint` configuration has a single `Include` property, which represents the command, option, or argument to use in the entrypoint command:

```xml
<ItemGroup>
  <ContainerEntrypoint Include="dotnet" />
  <ContainerEntrypoint Include="ef" />

  <!-- This shorthand syntax means the same thing, note the semicolon separating the tokens. -->
  <ContainerEntrypoint Include="dotnet;ef" />
</ItemGroup>
```

### `ContainerEntrypointArgs`

> **Note:**
> This item is deprecated as of .NET 8. Use `ContainerAppCommandArgs` instead, with `ContainerAppCommandInstruction` set to `Entrypoint` or `DefaultArgs`.

The container entrypoint args item controls the default arguments provided to the `ContainerEntrypoint`. Use this when the `ContainerEntrypoint` is a program the user might want to use on its own.

The `ContainerEntrypointArgs` configuration has a single `Include` property, which represents the option or argument to apply to the `ContainerEntrypoint` command:

```xml
<ItemGroup>
  <ContainerEntrypointArgs Include="database" />
  <ContainerEntrypointArgs Include="update" />

  <!-- This is the shorthand syntax for the same idea -->
  <ContainerEntrypointArgs Include="database;update" />
</ItemGroup>
```

### `ContainerEnvironmentVariable`

The container environment variable node allows you to add environment variables to the container. Environment variables are accessible to the app running in the container immediately, and are often used to change the runtime behavior of the running app.

The `ContainerEnvironmentVariable` node has two attributes:

- `Include`: The name of the environment variable.
- `Value`: The value of the environment variable.

```xml
<ItemGroup>
  <ContainerEnvironmentVariable Include="LOGGER_VERBOSITY" Value="Trace" />
</ItemGroup>
```

For more information, see .NET environment variables.

> **Note:**
> It's currently not possible to set environment variables from the .NET CLI when publishing a container image. For more information, see GitHub: .NET SDK container builds.

### `ContainerPort`

The container port adds Transmission Control Protocol (TCP) or User Datagram Protocol (UDP) ports to the list of known ports for the container. This enables container runtimes like Docker to map these ports to the host machine automatically. This is often used as documentation for the container, but can also be used to enable automatic port mapping.

The `ContainerPort` node has two attributes:

- `Include`: The port number to expose.
- `Type`: Defaults to `tcp`, valid values are either `tcp` or `udp`.

```xml
<ItemGroup>
    <ContainerPort Include="80" Type="tcp" />
</ItemGroup>
```

Starting with .NET 8, the `ContainerPort` is inferred when not explicitly provided based on several well-known ASP.NET environment variables:

- `ASPNETCORE_URLS`
- `ASPNETCORE_HTTP_PORTS`
- `ASPNETCORE_HTTPS_PORTS`

If these environment variables are present, their values are parsed and converted to TCP port mappings. These environment variables are read from your base image, if present, or from the environment variables defined in your project through `ContainerEnvironmentVariable` items. For more information, see ContainerEnvironmentVariable.

### `ContainerPublishInParallel`

For multi-RID containers, certain project types (like Blazor WebAssembly) might encounter build race conditions. To address this, starting with .NET SDK versions 8.0.408, 9.0.300, and 10.0, you can control the parallelism of the publish process using the `ContainerPublishInParallel` property. By default, publishing occurs in parallel for each Runtime Identifier (RID). Setting this property to `false` ensures sequential publishing, which increases stability but might take longer.

```xml
<PropertyGroup>
  <ContainerPublishInParallel>false</ContainerPublishInParallel>
</PropertyGroup>
```

For more information on multi-RID publishing, see ContainerRuntimeIdentifier(s).

### `ContainerUser`

The user configuration property controls the default user that the container runs as. This is often used to run the container as a non-root user, which is a best practice for security. There are a few constraints for this configuration to be aware of:

- It can take various forms—username, linux user IDs, group name, linux group ID, `username:groupname`, and other ID variants.
- There's no verification that the user or group specified exists on the image.
- Changing the user can alter the behavior of the app, especially in regards to things like _File System_ permissions.

The default value of this field varies by project TFM and target operating system:

- If you're targeting .NET 8 or higher and using the Microsoft runtime images, then:
  - on Linux, the rootless user `app` is used (though it's referenced by its user ID)
  - on Windows the rootless user `ContainerUser` is used
- Otherwise, no default `ContainerUser` is used

```xml
<PropertyGroup>
  <ContainerUser>my-existing-app-user</ContainerUser>
</PropertyGroup>
```

> **Tip:**
> The `APP_UID` environment variable is used to set user information in your container. This value can come from environment variables defined in your base image (like that Microsoft .NET images do), or you can set it yourself via the `ContainerEnvironmentVariable` syntax.

To configure your app to run as a root user, set the `ContainerUser` property to `root`. In your project file, add the following:

```xml
<PropertyGroup>
  <ContainerUser>root</ContainerUser>
</PropertyGroup>
```

Alternatively, you can set this value when calling `dotnet publish` from the command line:

```dotnetcli
dotnet publish -p ContainerUser=root
```

### `ContainerWorkingDirectory`

The container working directory node controls the working directory of the container, the directory that commands are executed within if not other command is run.

By default, the `/app` directory value is used as the working directory.

```xml
<PropertyGroup>
    <ContainerWorkingDirectory>/bin</ContainerWorkingDirectory>
</PropertyGroup>
```

## Flags that control the destination of the generated image

The following properties control where the generated container image is stored or published:

- `ContainerArchiveOutputPath`
- `ContainerRegistry`
- `LocalRegistry`

### `ContainerArchiveOutputPath`

To create a container image within a _tar.gz_ archive, use the `ContainerArchiveOutputPath` property. This feature is useful if your workflow isn't straightforward and requires that you, for example, run a scanning tool over your images before pushing them. Once the archive is created, you can move it, scan it, or load it into a local Docker toolchain.

To publish to an archive, add the `ContainerArchiveOutputPath` property to your `dotnet publish` command, for example:

```dotnetcli
dotnet publish \
  -p PublishProfile=DefaultContainer \
  -p ContainerArchiveOutputPath=./images/sdk-container-demo.tar.gz
```

You can specify either a folder name or a path with a specific file name. If you specify the folder name, the filename generated for the image archive file is named `$(ContainerRepository).tar.gz`. These archives can contain multiple tags inside them, only as single file is created for all `ContainerImageTags`.

### `ContainerRegistry`

The container registry property controls the destination registry, the place that the newly created image is to be pushed to. By default it's pushed to the local Docker daemon, but you can also specify a remote registry. When using a remote registry that requires authentication, you authenticate using the well-known `docker login` mechanisms. For more information, See authenticating to container registries for more details. For a concrete example of using this property, consider the following XML example:

```xml
<PropertyGroup>
    <ContainerRegistry>registry.mycorp.com:1234</ContainerRegistry>
</PropertyGroup>
```

This tooling supports publishing to any registry that supports the Docker Registry HTTP API V2. This includes the following registries explicitly (and likely many more implicitly):

- Azure Container Registry
- Amazon Elastic Container Registry
- Google Artifact Registry
- Docker Hub
- GitHub Packages
- GitLab-hosted Container Registry
- Quay.io

For notes on working with these registries, see the registry-specific notes.

### `LocalRegistry`

The `LocalRegistry` MSBuild property specifies the local container tooling to use when pushing to local sources. Supported values are `Docker`, `Podman`, `Wslc`, and `MacOSContainer`.

If not set, the SDK determines the tool based on availability. Starting in .NET 11, the SDK prefers platform-native tools before Docker and Podman:

- On Windows, if `wslc` exists and its service runs, `wslc` is used.
- On macOS, if Apple's `container` CLI exists and its service runs, `container` is used.
- If both `docker` and `podman` exist, and `docker` is an alias for `podman`, then `podman` is used.
- If only `docker` exists, `docker` is used.
- If only `podman` exists, `podman` is used.
- If no supported local tool exists, an error is thrown.

To explicitly set the local registry tool, use the following configuration:

```xml
<PropertyGroup>
  <LocalRegistry>Podman</LocalRegistry>
</PropertyGroup>
```
