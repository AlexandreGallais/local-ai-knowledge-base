---
title: "File Providers in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/file-providers.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# File Providers in ASP.NET Core

-->
-->

By Steve Smith

ASP.NET Core abstracts file system access through the use of File Providers. File Providers are used throughout the ASP.NET Core framework. For example:

* `Microsoft.AspNetCore.Hosting.IWebHostEnvironment` exposes the app's content root and web root as `IFileProvider` types.
* Static file middleware uses File Providers to locate static files.
* Razor uses File Providers to locate pages and views.
* .NET tooling uses File Providers and glob patterns to specify which files should be published.

View or download sample code (how to download)

## File Provider interfaces

The primary interface is `Microsoft.Extensions.FileProviders.IFileProvider`. `IFileProvider` exposes methods to:

* Obtain file information (`Microsoft.Extensions.FileProviders.IFileInfo`).
* Obtain directory information (`Microsoft.Extensions.FileProviders.IDirectoryContents`).
* Set up change notifications (using an `Microsoft.Extensions.Primitives.IChangeToken`).

`IFileInfo` provides methods and properties for working with files:

* `Microsoft.Extensions.FileProviders.IFileInfo.Exists`
* `Microsoft.Extensions.FileProviders.IFileInfo.IsDirectory`
* `Microsoft.Extensions.FileProviders.IFileInfo.Name`
* `Microsoft.Extensions.FileProviders.IFileInfo.Length` (in bytes)
* `Microsoft.Extensions.FileProviders.IFileInfo.LastModified` date

You can read from the file using the `Microsoft.Extensions.FileProviders.IFileInfo.CreateReadStream*` method.

The `FileProviderSample` sample app demonstrates how to configure a File Provider in `Startup.ConfigureServices` for use throughout the app via dependency injection.

## File Provider implementations

The following table lists implementations of `IFileProvider`.

| Implementation | Description |
| -------------- | ----------- |
| Composite File Provider | Used to provide combined access to files and directories from one or more other providers. |
| Manifest Embedded File Provider | Used to access files embedded in assemblies. |
| Physical File Provider | Used to access the system's physical files. |

### Physical File Provider

The `Microsoft.Extensions.FileProviders.PhysicalFileProvider` provides access to the physical file system. `PhysicalFileProvider` uses the `System.IO.File` type (for the physical provider) and scopes all paths to a directory and its children. This scoping prevents access to the file system outside of the specified directory and its children. The most common scenario for creating and using a `PhysicalFileProvider` is to request an `IFileProvider` in a constructor through dependency injection.

> **Warning:**
> `PhysicalFileProvider` scopes access to its root directory and child paths, but this doesn't guarantee a security sandbox. Symbolic links under the root can still expose files outside the root directory.

When instantiating this provider directly, an absolute directory path is required and serves as the base path for all requests made using the provider. Glob patterns aren't supported in the directory path.

The following code shows how to use `PhysicalFileProvider` to obtain directory contents and file information:

```csharp
var provider = new PhysicalFileProvider(applicationRoot);
var contents = provider.GetDirectoryContents(string.Empty);
var filePath = Path.Combine("wwwroot", "js", "site.js");
var fileInfo = provider.GetFileInfo(filePath);
```

Types in the preceding example:

* `provider` is an `IFileProvider`.
* `contents` is an `IDirectoryContents`.
* `fileInfo` is an `IFileInfo`.

The File Provider can be used to iterate through the directory specified by `applicationRoot` or call `GetFileInfo` to obtain a file's information. Glob patterns can't be passed to the `GetFileInfo` method. The File Provider has no access outside of the `applicationRoot` directory.

The `FileProviderSample` sample app creates the provider in the `Startup.ConfigureServices` method using `Microsoft.Extensions.Hosting.IHostEnvironment.ContentRootFileProvider`:

```csharp
var physicalProvider = _env.ContentRootFileProvider;
```

### Manifest Embedded File Provider

The `Microsoft.Extensions.FileProviders.ManifestEmbeddedFileProvider` is used to access files embedded within assemblies. The `ManifestEmbeddedFileProvider` uses a manifest compiled into the assembly to reconstruct the original paths of the embedded files.

To generate a manifest of the embedded files:

1. Add the `Microsoft.Extensions.FileProviders.Embedded` NuGet package to your project.
1. Set the `<GenerateEmbeddedFilesManifest>` property to `true`. Specify the files to embed with `<EmbeddedResource>`:

    ```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <GenerateEmbeddedFilesManifest>true</GenerateEmbeddedFilesManifest>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.Extensions.FileProviders.Embedded" Version="3.1.0" />
  </ItemGroup>

  <ItemGroup>
    <EmbeddedResource Include="Resource.txt" />
  </ItemGroup>

</Project>
```

Use glob patterns to specify one or more files to embed into the assembly.

The `FileProviderSample` sample app creates an `ManifestEmbeddedFileProvider` and passes the currently executing assembly to its constructor.

`Startup.cs`:

```csharp
var manifestEmbeddedProvider =
    new ManifestEmbeddedFileProvider(typeof(Program).Assembly);
```

Additional overloads allow you to:

* Specify a relative file path.
* Scope files to a last modified date.
* Name the embedded resource containing the embedded file manifest.

| Overload | Description |
| -------- | ----------- |
| `ManifestEmbeddedFileProvider(Assembly, String)` | Accepts an optional `root` relative path parameter. Specify the `root` to scope calls to `Microsoft.Extensions.FileProviders.IFileProvider.GetDirectoryContents*` to those resources under the provided path. |
| `ManifestEmbeddedFileProvider(Assembly, String, DateTimeOffset)` | Accepts an optional `root` relative path parameter and a `lastModified` date (`System.DateTimeOffset`) parameter. The `lastModified` date scopes the last modification date for the `Microsoft.Extensions.FileProviders.IFileInfo` instances returned by the `Microsoft.Extensions.FileProviders.IFileProvider`. |
| `ManifestEmbeddedFileProvider(Assembly, String, String, DateTimeOffset)` | Accepts an optional `root` relative path, `lastModified` date, and `manifestName` parameters. The `manifestName` represents the name of the embedded resource containing the manifest. |

### Composite File Provider

The `Microsoft.Extensions.FileProviders.CompositeFileProvider` combines `IFileProvider` instances, exposing a single interface for working with files from multiple providers. When creating the `CompositeFileProvider`, pass one or more `IFileProvider` instances to its constructor.

In the `FileProviderSample` sample app, a `PhysicalFileProvider` and a `ManifestEmbeddedFileProvider` provide files to a `CompositeFileProvider` registered in the app's service container. The following code is found in the project's `Startup.ConfigureServices` method:

```csharp
var physicalProvider = _env.ContentRootFileProvider;
var manifestEmbeddedProvider = 
    new ManifestEmbeddedFileProvider(typeof(Program).Assembly);
var compositeProvider = 
    new CompositeFileProvider(physicalProvider, manifestEmbeddedProvider);

services.AddSingleton<IFileProvider>(compositeProvider);
```

## Watch for changes

The `Microsoft.Extensions.FileProviders.IFileProvider.Watch*` method provides a scenario to watch one or more files or directories for changes. The `Watch` method:

* Accepts a file path string, which can use glob patterns to specify multiple files.
* Returns an `Microsoft.Extensions.Primitives.IChangeToken`.

The resulting change token exposes:

* `Microsoft.Extensions.Primitives.IChangeToken.HasChanged`: A property that can be inspected to determine if a change has occurred.
* `Microsoft.Extensions.Primitives.IChangeToken.RegisterChangeCallback*`: Called when changes are detected to the specified path string. Each change token only calls its associated callback in response to a single change. To enable constant monitoring, use a `System.Threading.Tasks.TaskCompletionSource`1` (shown below) or recreate `IChangeToken` instances in response to changes.

The `WatchConsole` sample app writes a message whenever a `.txt` file in the `TextFiles` directory is modified:

```csharp
private static readonly string _fileFilter = Path.Combine("TextFiles", "*.txt");

public static void Main(string[] args)
{
    Console.WriteLine($"Monitoring for changes with filter '{_fileFilter}' (Ctrl + C to quit)...");

    while (true)
    {
        MainAsync().GetAwaiter().GetResult();
    }
}

private static async Task MainAsync()
{
    var fileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
    IChangeToken token = fileProvider.Watch(_fileFilter);
    var tcs = new TaskCompletionSource<object>();

    token.RegisterChangeCallback(state =>
        ((TaskCompletionSource<object>)state).TrySetResult(null), tcs);

    await tcs.Task.ConfigureAwait(false);

    Console.WriteLine("file changed");
}
```

Some file systems, such as Docker containers and network shares, may not reliably send change notifications. Set the `DOTNET_USE_POLLING_FILE_WATCHER` environment variable to `1` or `true` to poll the file system for changes every four seconds (not configurable).

### Glob patterns

File system paths use wildcard patterns called *glob (or globbing) patterns*. Specify groups of files with these patterns. The two wildcard characters are `*` and `**`:

**`*`**
Matches anything at the current folder level, any filename, or any file extension. Matches are terminated by `/` and `.` characters in the file path.

**`**`**
Matches anything across multiple directory levels. Can be used to recursively match many files within a directory hierarchy.

The following table provides common examples of glob patterns.

| Pattern                        | Description |
| ------------------------------ | ----------- |
| `directory/file.txt`           | Matches a specific file in a specific directory.|
| `directory/*.txt`              | Matches all files with `.txt` extension in a specific directory.|
| `directory/*/appsettings.json` | Matches all `appsettings.json` files in directories exactly one level below the `directory` folder.|
| `directory/**/*.txt`           | Matches all files with a `.txt` extension found anywhere under the `directory` folder.|
