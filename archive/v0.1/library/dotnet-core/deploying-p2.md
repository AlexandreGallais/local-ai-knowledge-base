---
title: ".NET application publishing overview (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/deploying/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET application publishing overview (part 2 of 2)

## Publish as self-contained

When you publish a self-contained deployment (SCD), the publishing process creates a platform-specific executable. Publishing an SCD includes all required .NET files to run your app but it doesn't include the native dependencies of .NET. These dependencies must be present on the environment before the app runs.

Publishing an SCD creates an app that doesn't roll forward to the latest available .NET security patch. For more information on version binding at compile time, see Select the .NET version to use.

**Advantages**

- **Control .NET version**: Control which version of .NET is deployed with the app.
- **Platform-specific targeting**: Because the app must be published for each platform, it's clear where the app runs.

**Disadvantages**

- **Larger deployments**: Because the app includes the .NET runtime and all dependencies, the download size and hard drive space required is greater than a **framework-dependent deployment**.
- **Harder to update the .NET version**: The .NET Runtime can only be upgraded by releasing a new version of the app.

> **Tip:**
> You can reduce the total size of compatible self-contained apps by publishing trimmed or by enabling **globalization invariant mode**. For more information about globalization invariant mode, see .NET Globalization Invariant Mode.

### Publish

**cli,vscode:**

```dotnetcli
dotnet publish -c Release -r <RID> --self-contained true
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

- `--self-contained true`

  This switch tells the .NET SDK to create an executable as a self-contained deployment (SCD).

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Self-contained**.
01. Set **Target Runtime** to your desired platform (for example, **win-x64** for 64-bit Windows).
01. Select **Save** and then **Publish**.

## Publish as single-file

When you publish your app as a single-file deployment, all application-dependent files are bundled into a single binary. This deployment model is available for both framework-dependent and self-contained applications, providing an attractive option to deploy and distribute your application as a single file.

Single-file apps are always OS and architecture specific. You need to publish for each configuration, such as Linux x64, Linux Arm64, Windows x64, and so forth.

**Advantages**

- **Simplified distribution**: Deploy and distribute your application as a single executable file.
- **Reduced file clutter**: All dependencies are bundled, eliminating the need to manage multiple files.
- **Easy deployment**: Copy a single file to deploy the application.

**Disadvantages**

- **Larger file size**: The single file includes all dependencies, making it larger than individual files.
- **Slower startup**: Files must be extracted at runtime, which can impact startup performance.
- **Platform-specific**: Must publish separate files for each target platform.

Single-file deployment can be combined with other optimizations like trimming and ReadyToRun compilation for further optimization.

For more information about single-file deployment, see Single-file deployment.

### Publish

**cli,vscode:**

```dotnetcli
dotnet publish -c Release -r <RID> -p:PublishSingleFile=true
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

- `-p:PublishSingleFile=true`

  This property bundles all application-dependent files into a single binary.

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Self-contained** or **Framework-dependent**.
01. Set **Target Runtime** to your desired platform (for example, **win-x64** for 64-bit Windows).
01. Check **Produce single file**.
01. Select **Save** and then **Publish**.

## Publish as native AOT

Native AOT deployment compiles your app directly to native code, eliminating the need for a runtime. This publishing option uses **self-contained deployment** mode, as the compiled native code must include everything needed to run the application. This results in faster startup times and reduced memory usage, but comes with some limitations on supported features.

**Advantages**

- **Fast startup**: No JIT compilation needed at runtime, leading to faster application startup.
- **Reduced memory usage**: Lower memory footprint compared to traditional .NET applications.
- **No runtime dependency**: The application runs without requiring .NET runtime installation.
- **Smaller deployment size**: Often smaller than **self-contained deployment** with the full runtime.

**Disadvantages**

- **Limited framework support**: Not all .NET features and libraries are compatible with Native AOT.
- **Longer build times**: Compilation to native code takes longer than regular builds.
- **Platform-specific**: Must compile separately for each target platform and architecture.
- **Debugging limitations**: More complex debugging experience compared to regular .NET applications.

For more information about Native AOT deployment, see Native AOT deployment.

### Publish

**cli,vscode:**

```dotnetcli
dotnet publish -c Release -r <RID> -p:PublishAot=true
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

- `-p:PublishAot=true`

  This property enables Native AOT compilation, which compiles the app directly to native code.

**visualstudio:**

Native AOT publishing must be configured in the project file. You can't enable it through the Visual Studio publishing UI.

01. In **Solution Explorer**, right-click on your project and select **Edit Project File**.
01. Add the following property to a `<PropertyGroup>`:

    ```xml
    <PublishAot>true</PublishAot>
    ```

01. Save the project file.
01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Self-contained**.
01. Set **Target Runtime** to your desired platform (for example, **win-x64** for 64-bit Windows).
01. Select **Save** and then **Publish**.

For more information about Native AOT deployment, see Native AOT deployment.

## Publish as ReadyToRun

When you publish your app with ReadyToRun compilation, your application assemblies are compiled as ReadyToRun (R2R) format. R2R is a form of ahead-of-time (AOT) compilation that improves startup performance by reducing the amount of work the just-in-time (JIT) compiler needs to do as your application loads. This publishing option can be used with both **framework-dependent** and **self-contained** deployment modes.

ReadyToRun binaries contain both intermediate language (IL) code and the native version of the same code. While R2R binaries are larger than regular assemblies, they provide better startup performance.

**Advantages**

- **Improved startup time**: The app spends less time running the JIT compiler during startup.
- **Better first-use performance**: Reduced latency for first-time execution of code paths.
- **Compatible with existing code**: Works with most .NET libraries and frameworks without modification.
- **Flexible deployment**: Can be combined with both **framework-dependent deployment** and **self-contained deployment** modes.

**Disadvantages**

- **Larger size**: The app is larger on disk due to including both IL and native code.
- **Longer build times**: Compilation takes more time than standard publishing.
- **Platform-specific optimizations**: Best performance gains require targeting specific platforms.

### Publish

**cli,vscode:**

```dotnetcli
dotnet publish -c Release -r <RID> -p:PublishReadyToRun=true
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

- `-p:PublishReadyToRun=true`

  This property enables ReadyToRun compilation, which improves startup performance by pre-compiling assemblies.

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Self-contained** or **Framework-dependent**.
01. Set **Target Runtime** to your desired platform (for example, **win-x64** for 64-bit Windows).
01. Check **Enable ReadyToRun compilation**.
01. Select **Save** and then **Publish**.

For more information about ReadyToRun deployment, see ReadyToRun compilation.

## Container deployment

When you publish your app as a container, the .NET SDK packages your application and its dependencies into a container image without requiring a separate Dockerfile. This deployment mode creates a complete container image that can be run on any container runtime, such as Docker or Podman. Container deployment simplifies the containerization process by eliminating the need to write and maintain Dockerfiles while providing optimized base images.

Starting with .NET SDK 8.0.200, container support is included by default and doesn't require extra NuGet packages. For console applications, you might need to enable container support explicitly by setting the `EnableSdkContainerSupport` property to `true`.

> **Tip:**
> For more information about project settings related to containers, see Containerize a .NET app reference.

**Advantages**

- **Simplified containerization**: No need to write or maintain Dockerfiles for basic scenarios.
- **Optimized base images**: Uses Microsoft-provided, optimized base images with the latest security updates.
- **Consistent environment**: Ensures consistent runtime environment across development, testing, and production.
- **Easy distribution**: Container images can be easily shared and deployed across different environments.
- **Platform isolation**: Applications run in isolated containers, reducing conflicts between applications.

**Disadvantages**

- **Container runtime dependency**: The target environment must have a container runtime installed.
- **Image size**: Container images are typically larger than other deployment methods.
- **Learning curve**: Requires understanding of container concepts and tooling.
- **Limited customization**: Less flexibility compared to custom Dockerfiles for complex scenarios.

### Publish

**cli,vscode:**

```dotnetcli
dotnet publish -c Release [-r <RID>] /t:PublishContainer
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

- `-t:PublishContainer`

  This target publishes the application as a container image.

You can also use the publish profile approach:

```dotnetcli
dotnet publish -c Release [-r <RID>] -p:PublishProfile=DefaultContainer
```

- `-p:PublishProfile=DefaultContainer`

  This profile triggers the container publishing process.

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. Select **Container Registry** as the publish target and select **Next**.
01. Choose your target container registry (such as **Azure Container Registry**, **Docker Hub**, or **Generic Registry**) and select **Next**.
01. Configure the registry connection details and authentication.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Self-contained** or **Framework-dependent** based on your needs.
01. Set **Target Runtime** to your desired platform (for example, **linux-x64** for Linux containers).
01. Configure container-specific settings like image name and tags.
01. Select **Save** and then **Publish**.

For more information about container deployment, see .NET SDK container creation overview.

## See also

- .NET Runtime Identifier (RID) catalog
- Select the .NET version to use
- Publishing for macOS
