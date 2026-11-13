---
title: "File-based apps (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/sdk/file-based-apps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# File-based apps

**This article applies to:** ✔️ .NET 10 SDK and later versions

File-based apps let you build, run, and publish .NET applications from a single C# file without creating a traditional project file. They offer a lightweight alternative to traditional .NET projects. This approach simplifies development for scripts, utilities, and small applications. The .NET SDK automatically generates the necessary project configuration based on the directives in your source file.

Key <example-value> include:

- Reduced boilerplate for simple applications.
- Self-contained source files with embedded configuration.
- Native AOT publishing enabled by default.
- Automatic packaging as .NET tools.

In this article, learn how to create, configure, and work with file-based apps effectively.

## Supported directives

File-based apps use directives prefixed with `#:` to configure the build and run the application. Supported directives are: `#:include`, `#:package`, `#:project`, `#:property`, and `#:sdk`. Place these directives at the top of the C# file.

### `#:include`

> **Note:**
> This directive is available in .NET 11 and .NET SDK 10.0.300 and later.

Includes another file in the file-based app.

The SDK maps included files to item types based on file extension:

- `*.cs` to `Compile`
- `*.resx` to `EmbeddedResource`
- `*.json` to `None`
- `*.razor` to `Content`
- `*.dll` to `Reference`

The compiler includes `.cs` files as part of app compilation. These files can add types, methods, namespaces, and other declarations, but they cannot add top-level statements.

```csharp
#:include helpers.cs
#:include models/customer.cs
#:include shared/**/*.cs
#:include $(MSBuildProjectName).*.cs
```

The `#:include` directive supports literal paths, glob patterns, and MSBuild properties. When you use glob patterns, file-based app build caching is currently disabled. For more information about available properties, see MSBuild reserved and well-known properties.

> **Note:**
> Referencing a compiled DLL with `#:include` is available in .NET 11 and later.

You can also use `#:include` to reference a compiled DLL directly, without a feature flag:

```csharp
#:include ./libs/MyLibrary.dll
```

`#:sdk`, `#:property`, and `#:package` directives can appear as duplicates across included files as long as their values match. This support enables self-contained library files that declare their own dependencies without conflicting when multiple entry points include them.

### `#:package`

Adds a NuGet package reference to your application.

```csharp
#:package Newtonsoft.Json
#:package user@example.com
#:package Spectre.Console@*
```

> **Note:**
> Omitting the version number after the package name currently only works when you use central package management with a `Directory.Packages.props` file. Otherwise, specify the version number explicitly, or add `@*` after the package name to use the latest version.

### `#:project`

References another project file or directory that contains a project file.

```csharp
#:project ../SharedLibrary/SharedLibrary.csproj
```

Instead of manually editing `#:project` directives, you can use the `dotnet reference` command to manage project references in a file-based app. Use the `--file` option to specify the file-based app:

> **Note:**
> `dotnet reference` support for file-based apps is available in .NET 11 and later.

```dotnetcli
dotnet reference add --file app.cs ../SharedLibrary/SharedLibrary.csproj
dotnet reference list --file app.cs
dotnet reference remove --file app.cs ../SharedLibrary/SharedLibrary.csproj
```

The `dotnet reference add` command adds a `#:project` directive to the top of the file, and the `remove` command removes it.

### `#:property`

Sets an MSBuild property value.

```csharp
#:property TargetFramework=net10.0
#:property PublishAot=false
```

#### Conditional property values

Property directives support MSBuild properties and expressions, so you can set conditional property values based on environment variables or other MSBuild properties. Use this capability to read environment variables with sensible defaults, or to set different MSBuild property values based on conditions.

**Use environment variables with defaults:**

```csharp
#:property LogLevel=$([MSBuild]::ValueOrDefault('$(LOG_LEVEL)', 'Information'))
```

The `ValueOrDefault` function provides a default value when an environment variable isn't set. Alternatively, you can reference environment variables directly using `$(VARIABLE_NAME)` syntax, but this doesn't provide a fallback value if the variable is missing.

**Use conditional expressions:**

```csharp
#:property EnableLogging=$([System.Convert]::ToBoolean($([MSBuild]::ValueOrDefault('$(ENABLE_LOGGING)', 'true'))))
```

For more information about MSBuild property functions, see Property functions.

### `#:sdk`

Specifies the SDK to use. Defaults to `Microsoft.NET.Sdk`.

```csharp
#:sdk Microsoft.NET.Sdk.Web
#:sdk user@example.com
```

## CLI commands

The .NET CLI provides full support for file-based apps through familiar commands.

### Run applications

Run a file-based app by using the `dotnet run` command with the `--file` option:

```dotnetcli
dotnet run --file file.cs
```

Or use the `dotnet run` command followed by the name of the file:

```dotnetcli
dotnet run file.cs
```

> **Note:**
> When a project file exists in the current working directory, `dotnet run file.cs` without the `--file` option runs that project and passes `file.cs` as an argument to the target app to preserve backwards compatibility.

Or use the shorthand syntax:

```dotnetcli
dotnet file.cs
```

#### Pass <example-value>

Pass <example-value> to your application by placing them after `--`:

```dotnetcli
dotnet run file.cs -- arg1 arg2
```

#### Pipe code from stdin

Pipe C# code directly to `dotnet run` by using standard input with the `-` argument. The `-` argument indicates that `dotnet run` reads the code from standard input instead of a file. With the `-` argument, `dotnet run` doesn't search the current working directory for other files, such as launch profiles. The current directory is still the working directory to build and run the program.

**PowerShell:**

```powershell
'Console.WriteLine("hello from stdin!");' | dotnet run -
```

**Bash:**

```bash
echo 'Console.WriteLine("hello from stdin!");' | dotnet run -
```

This approach is useful for quick testing, running one-off commands, or integrating with shell scripts that generate C# code dynamically.

### Build applications

Compile your file-based app by using the `dotnet build` command:

```dotnetcli
dotnet build file.cs
```

The SDK generates a virtual project and builds your application. By default, the build output goes to the system's temporary directory under `<temp>/dotnet/runfile/<appname>-<appfilesha>/bin/<configuration>/`.

Use the `--output` option with the `dotnet build` command to specify a different path. To define a new default output path, set the `OutputPath` property at the top of your file by using the directive: `#:property OutputPath=./output`.

### Clean build outputs

Remove build artifacts by using the `dotnet clean` command:

```dotnetcli
dotnet clean file.cs
```

Delete cache for file-based apps in a directory:

```dotnetcli
dotnet clean file-based-apps
```

Use the `--days` option with the preceding command to specify how many days an artifact folder needs to be unused before removal. The default number of days is 30.

### Publish applications

File-based apps enable native AOT publishing by default, producing optimized, self-contained executables. Disable this feature by adding `#:property PublishAot=false` at the top of your file.

Use the `dotnet publish` command to create an independent executable:

```dotnetcli
dotnet publish file.cs
```

The default location of the executable is an `artifacts` directory next to the `.cs` file, with a subdirectory named after the application. Use the `--output` option with the `dotnet publish` command to specify a different path.

### Package as tool

Package your file-based app as a .NET tool by using the `dotnet pack` command:

```dotnetcli
dotnet pack file.cs
```

File-based apps set `PackAsTool=true` by default. Disable this setting by adding `#:property PackAsTool=false` at the top of your file.

### Convert to project

Convert your file-based app to a traditional project by using the `dotnet project convert` command:

```dotnetcli
dotnet project convert file.cs
```

This command makes a copy of the `.cs` file and creates a `.csproj` file with equivalent SDK items, properties, and package references based on the original file's `#:` directives.  Both files are placed in a directory named for the application next to the original `.cs` file, which is left untouched.

### Restore dependencies

Restore NuGet packages referenced in your file by using the `dotnet restore` command:

```dotnetcli
dotnet restore file.cs
```

By default, restore runs implicitly when you build or run your application. However, you can pass `--no-restore` to both the `dotnet build` and `dotnet run` commands to build or run without implicitly restoring.

## Default included items

File-based apps automatically include specific file types for compilation and packaging.

By default, the single C# file is included.

Different SDKs include other file types:

- `Microsoft.NET.Sdk.Web` includes `*.json` configuration files.
- Non-default SDKs include ResX resource files.

## Native AOT publishing

File-based apps enable native ahead-of-time (AOT) compilation by default. This feature produces optimized, self-contained executables with faster startup and a smaller memory footprint.

If you need to disable native AOT, use the following setting:

```csharp
#:property PublishAot=false
```

For more information about native AOT, see Native AOT deployment.

### Reuse Native AOT build outputs

> **Note:**
> This behavior is available in .NET 11 and later.

The native AOT command-line path can reuse existing build outputs when it runs an unchanged file-based app. Supported cached launches include `dotnet run --file app.cs`, `dotnet run app.cs`, and `dotnet app.cs`. If the cached output doesn't match the current command arguments, the CLI falls back to the managed path.

`dotnet format` also accepts a file-based app:

```dotnetcli
dotnet format app.cs
```

When a repository enables the SDK artifacts layout, file-based app outputs are placed under that repository's artifacts directory instead of the default per-user cache.

## User secrets

File-based apps generate a stable user secrets ID based on a hash of the full file path. This ID lets you store sensitive configuration separately from your source code.

Access user secrets the same way as traditional projects:

```dotnetcli
dotnet user-secrets set "<example-value>" "<example-value>" --file file.cs
```

List user secrets for file-based apps:

```dotnetcli
dotnet user-secrets list --file file.cs
```

The `dotnet user-secrets list` command prints the value of your secrets. Don't put this command in scripts that run in public contexts.

For more information, see Safe storage of app secrets in development.

## Launch profiles

File-based apps support launch profiles for configuring how the application runs during development. Instead of placing launch profiles in `Properties/launchSettings.json`, file-based apps can use a flat launch settings file named `[ApplicationName].run.json` in the same directory as the source file.

For the general profile format and properties that `dotnet run` supports, see Launch profiles.

### Flat launch settings file

Create a launch settings file named after your application. For example, if your file-based app is `app.cs`, create `app.run.json` in the same directory:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:5001;http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

### Multiple file-based apps

When you have multiple file-based apps in the same directory, each app can have its own launch settings file:

```directory
📁 myapps/
├── foo.cs
├── foo.run.json
├── bar.cs
└── bar.run.json
```

### Profile selection

The .NET CLI selects launch profiles using the following priority:

1. The profile specified by the `--launch-profile` option.
1. The profile specified by the `DOTNET_LAUNCH_PROFILE` environment variable.
1. The first profile defined in the launch settings file.

To run with a specific profile:

```dotnetcli
dotnet run app.cs --launch-profile https
```

### Traditional launch settings

File-based apps also support the traditional `Properties/launchSettings.json` file. If both files exist, the traditional location takes priority. If both files are present, the .NET CLI logs a warning to clarify which file is used.

## Shell execution

Enable direct execution of file-based apps on Unix-like systems by using a shebang line and executable permissions.

Add a shebang at the top of your file:

```csharp
#!/usr/bin/env -S dotnet --
#:package Spectre.Console

using Spectre.Console;

AnsiConsole.MarkupLine("[green]Hello, World![/]");
```

Make the file executable:

```bash
chmod +x file.cs
```

Run directly:

```bash
./file.cs
```

> **Note:**
> Use `LF` line endings instead of `CRLF` when you add a shebang. Don't include a BOM in the file.

To prevent `dotnet` from consuming arguments that match its own parameters (such as `--help`), the shebang uses `--` as a separator. The `--` separator tells `dotnet` to forward all subsequent command-line arguments directly to your app. The `-S` flag lets `env` split the remaining text into separate arguments so you can include `--` in the shebang.

> **Note:**
> If `-S` isn't supported on your system, use `#!/usr/bin/env dotnet` instead. With this shebang, `dotnet` might consume arguments that match its own CLI parameters.
