---
title: "File-based apps (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/sdk/file-based-apps.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# File-based apps (part 2 of 2)

## Implicit build files

File-based apps respect MSBuild and NuGet configuration files in the same directory or parent directories. These files affect how the SDK builds your application. Be mindful of these files when organizing your file-based apps.

### `Directory.Build.props`

Defines MSBuild properties that apply to all projects in a directory tree. File-based apps inherit these properties.

### `Directory.Build.targets`

Defines MSBuild targets and custom build logic. File-based apps execute these targets during build.

### `Directory.Packages.props`

Enables central package management for NuGet dependencies. File-based apps can use centrally managed package versions.

### `nuget.config`

Configures NuGet package sources and settings. File-based apps use these configurations when restoring packages.

### `global.json`

Specifies the .NET SDK version to use. File-based apps respect this version selection.

## Build caching

The .NET SDK caches build outputs to improve performance on subsequent invocations of `dotnet run`. This caching system is unique to file-based apps.

### Cache behavior

The SDK caches build outputs based on:

- Source file content.
- Directive configuration.
- SDK version.
- Implicit build file existence and content.

Caching improves build performance but can cause confusion when:

- Changes to implicit build files don't trigger rebuilds.
- Moving files to different directories doesn't invalidate cache.

> **Note:**
> Concurrent invocations of a file-based app (for example, running more than one instance of the same file-based app in parallel) can cause errors due to contention over the build output files. To avoid this, first build the file-based app via `dotnet build file.cs` before starting the concurrent instances via `dotnet run file.cs --no-build`.

### Workarounds

- Clear cache artifacts for file-based apps by using the following command:

  ```dotnetcli
  dotnet clean file-based-apps
  ```

- Force a clean build to bypass cache:

  ```dotnetcli
  dotnet clean file.cs
  dotnet build file.cs
  ```

## Folder layout recommendations

Organize your file-based apps carefully to avoid conflicts with traditional projects and implicit build files.

### Avoid project file cones

Don't place file-based apps within the directory structure of a `.csproj` project. The project file's implicit build files and settings can interfere with your file-based app.

❌ **Not recommended:**

```directory
📁 MyProject/
├── MyProject.csproj
├── Program.cs
└──📁 scripts/
    └── utility.cs  // File-based app - bad location
```

✅ **Recommended:**

```directory
📁 MyProject/
├── MyProject.csproj
└── Program.cs
📁 scripts/
└── utility.cs  // File-based app - good location
```

### Be mindful of implicit files

Implicit build files in parent directories affect all file-based apps in subdirectories. Create isolated directories for file-based apps when you need different build configurations.

❌ **Not recommended:**

```directory
📁 repo/
├── Directory.Build.props  // Affects everything below
├── app1.cs
└── app2.cs
```

✅ **Recommended:**

```directory
📁 repo/
├── Directory.Build.props
├──📁 projects/
│   └── MyProject.csproj
└──📁 scripts/
    ├── Directory.Build.props  // Isolated configuration
    ├── app1.cs
    └── app2.cs
```

## See also

- .NET SDK overview
- dotnet run command
- dotnet build command
- Native AOT deployment
