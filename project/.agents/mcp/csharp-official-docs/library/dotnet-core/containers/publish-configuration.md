---
title: "Containerize a .NET app reference (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/containers/publish-configuration.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Containerize a .NET app reference

In this reference article, you learn how to configure the container image generated when you publish a .NET app as a container. This article covers the various properties that you can set to control the image, the execution environment, and the commands that are run when the container starts.

The following MSBuild properties and items are available for container configuration:

| Property or item | Description |
|---|---|
| `ContainerAppCommand` | The logical entry point of the app. |
| `ContainerAppCommandArgs` | Logically required arguments for the app. |
| `ContainerAppCommandInstruction` | Controls how the entrypoint and command are combined. |
| `ContainerArchiveOutputPath` | Path to write the container image as a _tar.gz_ archive. |
| `ContainerBaseImage` | The base image to use for the container. |
| `ContainerDefaultArgs` | User-overridable default arguments for the app. |
| `ContainerEntrypoint` | (**Deprecated**) The binary run when the container starts. |
| `ContainerEntrypointArgs` | (**Deprecated**) Default arguments for `ContainerEntrypoint`. |
| `ContainerEnvironmentVariable` | Environment variables added to the container. |
| `ContainerFamily` | The family variant of the base image, for example `alpine`. |
| `ContainerImageFormat` | The image format: `Docker` or `OCI`. |
| `ContainerImageTag` | The tag or tags generated for the image. |
| `ContainerLabel` | Metadata labels added to the container image. |
| `ContainerPort` | TCP or UDP ports exposed by the container. |
| `ContainerPublishInParallel` | Controls whether multi-RID publishing runs in parallel. |
| `ContainerRegistry` | The destination registry for the published image. |
| `ContainerRepository` | The name of the container image. |
| `ContainerRuntimeIdentifier(s)` | The OS and architecture for the container. |
| `ContainerUser` | The default user the container runs as. |
| `ContainerWorkingDirectory` | The working directory inside the container. |
| `LocalRegistry` | The local container tool to use, such as Docker, Podman, `wslc`, or Apple's `container` CLI. |

## Configure container properties

You can control many aspects of the generated container through MSBuild properties. In general, if you can use a command in a _Dockerfile_ to set some configuration, you can do the same via MSBuild.

> **Note:**
> The only exceptions to this are `RUN` commands. Due to the way containers are built, those commands can't be emulated. If you need this functionality, consider using a _Dockerfile_ to build your container images.

There's no way of performing `RUN` commands with the .NET SDK. These commands are often used to install some OS packages or create a new OS user, or any number of arbitrary things. If you would like to keep using the .NET SDK container building feature, you can instead create a custom base image with these changes and then using this base image. For more information, see `ContainerBaseImage`.

## Flags that control the base image

The following properties control which base image is used for your container and how it's selected:

- `ContainerBaseImage`
- `ContainerFamily`
- `ContainerRuntimeIdentifier(s)`

### `ContainerBaseImage`

The container base image property controls the image used as the basis for your image. By default, the following values are inferred based on the properties of your project:

- If your project is self-contained, the `mcr.microsoft.com/dotnet/runtime-deps` image is used as the base image.
- If your project is an ASP.NET Core project, the `mcr.microsoft.com/dotnet/aspnet` image is used as the base image.
- Otherwise the `mcr.microsoft.com/dotnet/runtime` image is used as the base image.

The tag of the image is inferred to be the numeric component of your chosen `TargetFramework`. For example, a project targeting `net6.0` results in the `6.0` tag of the inferred base image, and a `net7.0-linux` project uses the `7.0` tag, and so on.

If you set a value here, you should set the fully qualified name of the image to use as the base, including any tag you prefer:

```xml
<PropertyGroup>
    <ContainerBaseImage>mcr.microsoft.com/dotnet/runtime:8.0</ContainerBaseImage>
</PropertyGroup>
```

Starting with .NET SDK version 8.0.200, the `ContainerBaseImage` inference is improved to optimize the size and security:

- Targeting the `linux-musl-x64` or `linux-musl-arm64` Runtime Identifiers, automatically chooses the `alpine` image variants to ensure your project runs:
  - If the project uses `PublishAot=true` then the `nightly/runtime-deps` `jammy-chiseled-aot` variant of the base image for best size and security.
  - If the project uses `InvariantGlobalization=false` then the `-extra` variants is used to ensure localization still works.

For more information regarding the image variants sizes and characteristics, see .NET 8.0 Container Image Size Report.

### `ContainerFamily`

Starting with .NET 8, you can use the `ContainerFamily` MSBuild property to choose a different family of Microsoft-provided container images as the base image for your app. When set, this value is appended to the end of the selected TFM-specific tag, changing the tag provided. For example, to use the Alpine Linux variants of the .NET base images, you can set `ContainerFamily` to `alpine`:

```xml
<PropertyGroup>
    <ContainerFamily>alpine</ContainerFamily>
</PropertyGroup>
```

The preceding project configuration results in a final tag of `8.0-alpine` for a .NET 8-targeting app.

This field is free-form, and often can be used to select different operating system distributions, default package configurations, or any other _flavor_ of changes to a base image. This field is ignored when `ContainerBaseImage` is set. For more information, see .NET container images.

### `ContainerRuntimeIdentifier(s)`

The `ContainerRuntimeIdentifier` property specifies the OS and architecture for your container if the `ContainerBaseImage` supports multiple platforms. For example, the `mcr.microsoft.com/dotnet/runtime` image supports `linux-x64`, `linux-arm`, `linux-arm64`, and `win10-x64`. By default, this is set to the `RuntimeIdentifier` used when publishing the container. Typically, you don't need to set this property explicitly; instead, use the `-r` option with the `dotnet publish` command. If the chosen image doesn't support the specified `RuntimeIdentifier`, an error indicates the supported identifiers.

You can always set the `ContainerBaseImage` property to a fully qualified image name, including the tag, to avoid needing to use this property at all.

```xml
<PropertyGroup>
    <ContainerRuntimeIdentifier>linux-arm64</ContainerRuntimeIdentifier>
</PropertyGroup>
```

To specify multiple container runtime identifiers for multi-architecture images, use a semicolon-delimited set of runtime identifiers in the `ContainerRuntimeIdentifiers` property, similar to setting multiple `TargetFrameworks`:

```xml
<PropertyGroup>
    <ContainerRuntimeIdentifiers>linux-x64;linux-arm64</ContainerRuntimeIdentifiers>
</PropertyGroup>
```

> **Important:**
> The `ContainerRuntimeIdentifiers` property must be a subset of the `RuntimeIdentifiers` property. If this condition isn't met, critical parts of the build pipeline might fail.
>
> Setting multiple `ContainerRuntimeIdentifiers` results in a multi-architecture image being created. For more information, see Multi-architecture images.

> **Note:**
> Starting with .NET 8, Microsoft's container images no longer include Windows variants in the manifest list. To target Windows, use a specific image tag as your `ContainerBaseImage`, for example `mcr.microsoft.com/dotnet/aspnet:8.0-nanoserver-ltsc2022`.

For more information regarding the runtime identifiers supported by .NET, see RID catalog.

#### Multi-architecture images

Multi-architecture images enable a single container image to support multiple architectures, simplifying cross-platform development and deployment. The .NET SDK supports this through the `ContainerRuntimeIdentifiers` property.

Beginning with SDK versions 8.0.405, 9.0.102, and 9.0.2xx, multi-RID container publishing is supported. When publishing with `/t:PublishContainer`:

- If a single `RuntimeIdentifier` or `ContainerRuntimeIdentifier` is specified, a single-architecture container is generated as before.
- If no single `RuntimeIdentifier` is specified but multiple `RuntimeIdentifiers` or `ContainerRuntimeIdentifiers` are set, the SDK publishes the app for each specified RID and combines the resulting images into an OCI Image Index. This index allows multiple architecture-specific images to share a single name.

> **Note:**
> The `ContainerRuntimeIdentifiers` property must be a subset of the `RuntimeIdentifiers` property. For more information, see ContainerRuntimeIdentifiers.

This feature streamlines container workflows in mixed-architecture environments. For example, a developer on a `linux-x64` host can publish a container supporting both `linux-x64` and `linux-arm64`, enabling deployment to either architecture without changing image names or labels.

The generated OCI Image Index is widely supported with modern container tooling, enhancing compatibility and ease of use.

## Flags that control generated-image-independent metadata

The following properties control metadata and configuration that applies to the generated container image regardless of the target runtime identifier:

- `ContainerImageFormat`
- `ContainerImageTag`
- `ContainerLabel`
- `ContainerRepository`

### `ContainerImageFormat`

You can use the `ContainerImageFormat` MSBuild property to specify the image format as either `Docker` or `OCI`. By default, the .NET tooling infers the format from the base image. For example, .NET base images use the Docker-specific format `application/vnd.docker.distribution.manifest.v2+json`. However, many modern tools prefer the OCI format `application/vnd.oci.image.manifest.v1+json`. To force a specific format, set the property as shown:

```xml
<PropertyGroup>
  <ContainerImageFormat>OCI</ContainerImageFormat>
</PropertyGroup>
```

Both formats are largely interchangeable without loss of information.

> **Note:**
> When building a multi-architecture image, the resulting image format is always OCI.

### `ContainerImageTag`

The container image tag property controls the tags that are generated for the image. To specify a single tag use `ContainerImageTag` and for multiple tags use `ContainerImageTags`.

> **Important:**
> When you use `ContainerImageTags`, you end up with multiple images, one per unique tag.

Tags are often used to refer to different versions of an app, but they can also refer to different operating system distributions, or even different configurations.

Starting with .NET 8, when a tag isn't provided the default is `latest`. In prior versions, the default tag was the `Version` of the project.

To override the default, specify either of the following properties:

```xml
<PropertyGroup>
    <ContainerImageTag>1.2.3-alpha2</ContainerImageTag>
</PropertyGroup>
```

To specify multiple tags, use a semicolon-delimited set of tags in the `ContainerImageTags` property, similar to setting multiple `TargetFrameworks`:

```xml
<PropertyGroup>
    <ContainerImageTags>1.2.3-alpha2;latest</ContainerImageTags>
</PropertyGroup>
```

Tags can only contain up to 127 alphanumeric characters, periods, underscores, and dashes. They must start with an alphanumeric character or an underscore. Any other form results in an error being thrown.

> **Note:**
> When using `ContainerImageTags` or any MSBuild property requiring `;`-delimited values, ensure proper escaping when calling `dotnet publish` from the command line, especially in CI/CD environments. Escaping rules differ between PowerShell and Bash. For example:
>
> ```powershell
> dotnet publish --os linux --arch x64 /t:PublishContainer /p:ContainerImageTags=`"1.2.3-alpha2`;latest`"
> ```
>
> In PowerShell, both the `;` and `"` characters need to be escaped.
>
> ```bash
> dotnet publish --os linux --arch x64 /t:PublishContainer /p:ContainerImageTags='"1.2.3-alpha2;latest"'
> ```
>
> In Bash, only the `"` character needs to be escaped.
>
> This results in two images being generated: `my-app:1.2.3-alpha2` and `my-app:latest`.

> **Tip:**
> If you experience issues with the `ContainerImageTags` property, consider scoping an environment variable `ContainerImageTags` instead:
>
> ```powershell
> $Env:ContainerImageTags='1.2.3;latest'; dotnet publish --os linux --arch x64 /t:PublishContainer
> ```

### `ContainerLabel`

The container label adds a metadata label to the container. Labels have no impact on the container at runtime, but are often used to store version and authoring metadata for use by security scanners and other infrastructure tools. You can specify any number of container labels.

The `ContainerLabel` node has two attributes:

- `Include`: The key of the label.
- `Value`: The value of the label (this might be empty).

```xml
<ItemGroup>
    <ContainerLabel Include="org.contoso.businessunit" Value="contoso-university" />
</ItemGroup>
```

For a list of labels that are created by default, see default container labels.

### `ContainerRepository`

The container repository is the name of the image itself, for example, `dotnet/runtime` or `my-app`. By default, the `AssemblyName` of the project is used.

```xml
<PropertyGroup>
    <ContainerRepository>my-app</ContainerRepository>
</PropertyGroup>
```

Image names consist of one or more slash-delimited segments, each of which can only contain lowercase alphanumeric characters, periods, underscores, and dashes, and must start with a letter or number. Any other characters result in an error being thrown.
