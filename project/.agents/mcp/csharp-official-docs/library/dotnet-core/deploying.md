---
title: ".NET application publishing overview (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/deploying/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET application publishing overview

This article explains the different ways to publish a .NET application. It covers publishing modes, how to produce executables and cross-platform binaries, and the impact of each approach on deployment and runtime environments. You can publish .NET applications using either the .NET CLI or Visual Studio.

**vscode:**

For a short tutorial on publishing, see Tutorial: Publish a .NET console application.

**visualstudio:**

For a short tutorial on publishing, see Tutorial: Publish a .NET console application.

## What is publishing

Publishing a .NET app means compiling source code to create an executable or binary, along with its dependencies and related files, for distribution. After publishing, you deploy the app to a server, distribution platform, container, or cloud environment. The publishing process prepares an app for deployment and use outside of a development environment.

## Publishing modes

There are two primary ways to publish an app. Some factors that influence this decision include whether the deployment environment has the appropriate .NET Runtime installed and whether you need specific compilation features that require bundling the runtime with your app. The two publishing modes are:

- **Publish self-contained**\
This mode produces a publishing folder that includes a platform-specific executable used to start the app, a compiled binary containing app code, any app dependencies, and the .NET runtime required to run the app. The environment that runs the app doesn't need to have the .NET runtime preinstalled.

- **Publish framework-dependent**\
This mode produces a publishing folder that includes an optional platform-specific executable used to start the app, a compiled binary containing app code, and any app dependencies. The environment that runs the app must have a version of the .NET runtime installed that the app can use.

> **Important:**
> You specify the target platform with a runtime identifier (RID). For more information about RIDs, see .NET RID Catalog.

## Publishing basics

The `<TargetFramework>` setting of the project file specifies the default target framework when you publish your app. You can change the target framework to any valid Target Framework Moniker (TFM). For example, if your project uses `<TargetFramework>net9.0</TargetFramework>`, a binary that targets .NET 9 is created.

If you want to target more than one framework, you can set the `<TargetFrameworks>` setting to multiple TFM values, separated by a semicolon. When you build your app, your app is built for each target framework defined by your project. However, when you publish your app, you must specify the target framework:

**cli,vscode:**

The default build configuration mode is **Release**, unless changed with the `-c` parameter.

```dotnet
dotnet publish -c Release -f net9.0
```

The default output directory of the `dotnet publish` command is `./bin/<BUILD-CONFIGURATION>/<TFM>/publish/`. For example, `dotnet publish -c Release -f net9.0` publishes to `./bin/Release/net9.0/publish/`. However, you can opt in to a simplified output path and folder structure for all build outputs. For more information, see Artifacts output layout.

> **Important:**
> When you skip the build step during publish by passing the `--no-build` parameter, use the same options you used when you built the app, including target framework and build mode. For example, don't build as a framework-dependent app and then publish as a self-contained app.

**visualstudio:**

In Visual Studio, create separate publishing profiles for each target framework.

### Portable binaries

When you publish a .NET app, you can target a specific platform or create a portable binary. By default, even when creating a portable binary, .NET publishes a platform-specific executable ("apphost") alongside the portable DLL unless you explicitly disable this behavior.

The platform-specific executable is created because of the `UseAppHost` property, which defaults to `true`. To publish only the portable DLL without the platform-specific executable, set `UseAppHost` to `false` either on the command line (`-p:UseAppHost=false`) or as a project property.

The benefit of targeting a specific platform is that it can handle native dependencies that your app might require, ensuring compatibility with the target platform's specific requirements.

### Native dependencies

If your app has native dependencies, it might not run on a different operating system if published as a portable binary. For example, apps that depend on the Windows API don't natively run on macOS or Linux. You would need to provide platform-specific code and compile an executable for each platform.

Consider also, if a library you referenced provides platform-specific dependencies, your app might not run on every platform. However, when you publish and target a specific platform, the platform-specific dependencies of a NuGet package are copied to the publish folder.

To ensure that your app is published with its native dependencies, publish for a specific platform:

**cli,vscode:**

```dotnetcli
dotnet publish -c Release -r <RID>
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Target Runtime** to your desired platform (for example, **win-x64** for 64-bit Windows).
01. Select **Save** and then **Publish**.

For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

## Quick reference

The following table provides quick examples of how to publish your app with the `dotnet` CLI:

| Publish mode | Command |
|--|--|
| Framework-dependent deployment | `dotnet publish -c Release [-r <RID>]` |
| Framework-dependent deployment (DLL) | `dotnet publish -c Release -p:UseAppHost=false` |
| Self-contained deployment | `dotnet publish -c Release [-r <RID>] --self-contained true` |
| Single-file deployment | `dotnet publish -c Release [-r <RID>] -p:PublishSingleFile=true` |
| Native AOT deployment | `dotnet publish -c Release [-r <RID>] -p:PublishAot=true` |
| ReadyToRun deployment | `dotnet publish -c Release [-r <RID>] -p:PublishReadyToRun=true` |
| Container deployment | `dotnet publish -c Release [-r <RID>] -t:PublishContainer` |

## Publish as framework-dependent

Framework-dependent deployment is the default mode when you publish from either the CLI or Visual Studio. In this mode, a platform-specific executable is created that can be used to start your app. The platform-specific executable is named something similar to `myapp.exe` on Windows or just `myapp` on other platforms.

Your app is configured to target a specific version of .NET. That targeted .NET runtime is required to be on the environment where your app runs. For example, if your app targets .NET 9, any environment that your app runs on must have the .NET 9 runtime installed.

Publishing a framework-dependent deployment creates an app that automatically rolls forward to the latest .NET security patch available on the environment that runs the app. For more information on version binding at compile time, see Select the .NET version to use.

**Advantages**

- **Small deployment**: Only the app and its dependencies are distributed. The environment where the app is run must already have the .NET runtime installed.
- **Cross-platform**: The app and any .NET-based library runs on other operating systems.
- **Uses the latest patched runtime**: The app uses the latest runtime installed in the environment.

**Disadvantages**

- **Requires pre-installing the runtime**: The app can run only if the version of .NET it targets is already installed in the environment.
- **.NET might change**: The environment where the app is run might use a newer .NET runtime, which could change app behavior.

### Launch framework-dependent apps

There are two ways to run framework-dependent apps: through the platform-specific executable ("apphost") and via `dotnet myapp.dll`. You can run the apphost executable directly instead of calling `dotnet myapp.dll`, which is still an acceptable way to run the app. Whenever possible, it's recommended to use the apphost. There are a number of advantages to using the apphost:

- Executables appear like standard native platform executables.
- Executable names are preserved in the process names, meaning apps can be easily recognized based on their names.
- Because the apphost is a native binary, native assets like manifests can be attached to them.
- Apphost has available low-level security mitigations applied by default that makes it more secure. For example, Control-flow Enforcement Technology (CET) shadow stack is enabled by default starting with .NET 9. Mitigations applied to `dotnet` are the lowest common denominator of all supported runtimes.

### Publish

**cli,vscode:**

```dotnetcli
dotnet publish -c Release [-r <RID>]
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-r <RID>`

This switch uses a runtime identifier (RID) to specify the target platform and ensures native dependencies are included (if required). For a list of runtime identifiers, see Runtime Identifier (RID) catalog.

Or explicitly:

```dotnetcli
dotnet publish -c Release [-r <RID>] --self-contained false
```

- `--self-contained false`

  This switch explicitly tells the .NET SDK to create a framework-dependent deployment.

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Framework-dependent** (this is the default).
01. Set **Target Runtime** to your desired platform (for example, **win-x64** for 64-bit Windows).
01. Select **Save** and then **Publish**.

### Configure .NET install search behavior

By default, the apphost discovers and uses a globally installed .NET runtime, with install locations varying by platform. For more information about runtime discovery and install locations, see Troubleshoot app launch failures.

The .NET runtime path can also be customized on a per-execution basis. The `DOTNET_ROOT` environment variable can be used to point to the custom location. For more information about all `DOTNET_ROOT` configuration options, see .NET environment variables.

In general, the best practice for using `DOTNET_ROOT` is to:

1. Clear `DOTNET_ROOT` environment variables first, meaning all environment variables that start with the text `DOTNET_ROOT`.
1. Set `DOTNET_ROOT`, and only `DOTNET_ROOT`, to the target path.
1. Execute the target apphost.

In .NET 9 and later versions, you can configure the .NET installation search paths of the published executable via the `AppHostDotNetSearch` and `AppHostRelativeDotNet` properties.

`AppHostDotNetSearch` allows specifying one or more locations where the executable will look for a .NET installation:

- `AppLocal`: app executable's folder
- `AppRelative`: path relative to the app executable
- `EnvironmentVariable`: value of `DOTNET_ROOT[_<arch>]` environment variables
- `Global`: registered and default global install locations

`AppHostRelativeDotNet` specifies the path relative to the executable that will be searched when `AppHostDotNetSearch` contains `AppRelative`.

For more information, see `AppHostDotNetSearch`, `AppHostRelativeDotNet`, and install location options in apphost.

### Cross-platform DLL deployment

Alternatively, you can publish your app as a cross-platform DLL without a platform-specific executable. In this mode, a `myapp.dll` file is created in the publish output folder. To run your app, navigate to the output folder and use the `dotnet myapp.dll` command.

To publish as a cross-platform DLL:

**cli,vscode:**

```dotnetcli
dotnet publish -c Release -p:UseAppHost=false
```

- `-c Release`

This switch sets the build configuration to Release, which is optimized for production deployment.

- `-p:UseAppHost=false`

  This property disables the creation of a platform-specific executable, producing only the portable DLL.

**visualstudio:**

01. Right-click on the project in **Solution Explorer** and select **Publish**.
01. If this is your first time publishing, select **Folder** as the publish target and select **Next**.
01. Choose a folder location or accept the default, then select **Finish**.
01. In the publish profile, select **Show all settings**.
01. Set **Deployment Mode** to **Framework-dependent**.
01. Uncheck **Produce single file**.
01. Set **Target Runtime** to **Portable** (or leave blank).
01. Select **Save** and then **Publish**.
