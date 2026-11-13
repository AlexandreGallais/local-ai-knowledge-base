---
title: "dotnet run command (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-run.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet run

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet run` - Runs source code without any explicit compile or launch commands.

## Synopsis

```dotnetcli
dotnet run [<applicationArguments>]
  [-a|--arch <ARCHITECTURE>] [--artifacts-path <ARTIFACTS_DIR>]
  [-c|--configuration <CONFIGURATION>] [--disable-build-servers]
  [-e|--environment <KEY=VALUE>] [--file <FILE_PATH>]
  [-f|--framework <FRAMEWORK>] [--force] [--interactive]
  [-lp|--launch-profile <NAME>] [--no-build] [--no-cache]
  [--no-dependencies] [--no-launch-profile] [--no-restore] [--os <OS>]
  [-p|--property:<PROPERTYNAME>=<VALUE>]
  [--project <PATH>] [-r|--runtime <RUNTIME_IDENTIFIER>]
  [--sc|--self-contained] [--tl:[auto|on|off]] [-v|--verbosity <LEVEL>]
  [[--] [application arguments]]

dotnet run -h|--help
```

## Description

The `dotnet run` command provides a convenient option to run your application from the source code with one command. It's useful for fast iterative development from the command line. The command depends on the `dotnet build` command to build the code. Any requirements for the build apply to `dotnet run` as well.

Output files are written into the default location, which is `bin/<configuration>/<target>`. For example if you have a `netcoreapp2.1` application and you run `dotnet run`, the output is placed in `bin/Debug/netcoreapp2.1`. Files are overwritten as needed. Temporary files are placed in the `obj` directory.

If the project specifies multiple frameworks, executing `dotnet run` results in an error unless the `-f|--framework <FRAMEWORK>` option is used to specify the framework.

The `dotnet run` command is used in the context of projects, not built assemblies. If you're trying to run a framework-dependent application DLL instead, you must use dotnet without a command. For example, to run `myapp.dll`, use:

```dotnetcli
dotnet myapp.dll
```

For more information on the `dotnet` driver, see .NET CLI overview.

To run the application, the `dotnet run` command resolves the dependencies of the application that are outside of the shared runtime from the NuGet cache. Because it uses cached dependencies, it's not recommended to use `dotnet run` to run applications in production. Instead, create a deployment using the `dotnet publish` command and deploy the published output.

### Implicit restore

You don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the `dotnet restore` documentation.

This command supports the `dotnet restore` options when passed in the long form (for example, `--source`). Short form options, such as `-s`, are not supported.

### Workload manifest downloads

When you run this command, it initiates an asynchronous background download of advertising manifests for workloads. If the download is still running when this command finishes, the download is stopped. For more information, see Advertising manifests.

## Launch profiles

Launch profiles configure how `dotnet run` starts an app during development. For an SDK-style project, put the settings in `Properties/launchSettings.json`. Visual Basic projects use `My Project/launchSettings.json` instead.

File-based apps can use an `[ApplicationName].run.json` file next to the source file. For the file lookup order and examples, see Launch profiles for file-based apps.

The launch settings file contains a top-level `profiles` object. Each property in `profiles` defines a named profile:

```json
{
  "profiles": {
    "Local": {
      "commandName": "Project",
      "commandLineArgs": "--input sample.txt",
      "dotnetRunMessages": true,
      "environmentVariables": {
        "APP_MODE": "local"
      }
    }
  }
}
```

The .NET SDK launch settings parser accepts JSON comments and trailing commas.

### Select a profile

Use `--launch-profile <NAME>` to select a named profile. The name match is case-insensitive. Profile names that differ only by case are ambiguous and produce an error.

If you don't specify a name, `dotnet run` selects the first profile in file order whose `commandName` it supports. Use `--no-launch-profile` to skip the launch settings file.

When `dotnet run` applies a profile, it sets `DOTNET_LAUNCH_PROFILE` to the selected profile name in the launched process. A later environment-variable source can override the value.

### Supported profile types

The .NET SDK supports these `commandName` values for `dotnet run`. The values are case-sensitive.

| `commandName` | Behavior |
| --- | --- |
| `Project` | Builds the project and starts the command produced by the project. |
| `Executable` | Starts the command specified by `executablePath`. Unless you specify `--no-build`, `dotnet run` still builds the project first. |

### Common properties

`dotnet run` recognizes these properties for both supported profile types:

`dotnet run` expands `%NAME%` environment-variable references in supported string values. In .NET 11 and later versions, it also expands MSBuild property references in values that it uses to launch the process, using the same token replacement as Visual Studio. It doesn't expand shell-style `$NAME` references.

| Property | Behavior |
| --- | --- |
| `commandLineArgs` | Specifies arguments for the launched process. Explicit application arguments on the command line take precedence. For a `Project` profile, arguments supplied by the project also take precedence. |
| `environmentVariables` | Specifies environment variables for the launched process. Profile values override inherited and SDK-generated environment variables, and `-e\|--environment` values override profile values. |
| `dotnetRunMessages` | When `true`, prints `Building...` before `dotnet run` builds the project. The default is `false`. This property doesn't control the message that identifies the launch settings file. |

Use `environmentVariables` to apply development-time runtime configuration settings that have an environment-variable form. For example, a profile can set GC settings such as `DOTNET_gcServer`. For the available settings, environment-variable names, and precedence rules, see .NET runtime configuration settings and Runtime configuration options for garbage collection.

Not every runtime setting has an environment-variable form. To configure an app independently of its launch profile, use an MSBuild property or `RuntimeHostConfigurationOption` item in the project, or use a `runtimeconfig.template.json` file. Some settings can also be changed in code with `System.AppContext.SetSwitch*`. These mechanisms produce or modify the app's runtime configuration; they aren't additional `launchSettings.json` properties.

### `Project` properties

`dotnet run` recognizes these additional properties when `commandName` is `Project`:

| Property | Behavior |
| --- | --- |
| `applicationUrl` | Sets `ASPNETCORE_URLS` in the launched process. An `ASPNETCORE_URLS` value in `environmentVariables` or from `-e\|--environment` takes precedence. |
| `launchBrowser` | Tells launch tooling whether to open a browser. `dotnet run` retains this property in the parsed profile but doesn't open a browser. |
| `launchUrl` | Tells launch tooling which URL to open. `dotnet run` retains this property in the parsed profile but doesn't open a browser or use the URL. |

The `applicationUrl` behavior supports ASP.NET Core, but launch profiles and the other common properties apply to any runnable SDK-style .NET project.

### `Executable` properties

`dotnet run` recognizes these additional properties when `commandName` is `Executable`:

| Property | Behavior |
| --- | --- |
| `executablePath` | Required. Specifies the process to start. The SDK expands supported variable references, but it doesn't resolve a relative value against the launch settings file. Use an absolute path or a command that the operating system can locate. |
| `workingDirectory` | Optional. Specifies the working directory for the launched process. The SDK expands supported variable references and resolves a relative path against the directory that contains the launch settings file. If you omit the property, the working directory defaults to the directory that contains the project or file-based app. |

### Visual Studio and debugger extensions

`launchSettings.json` is a shared input format, but each consumer decides which values to support and how to interpret them. Visual Studio, debuggers, and other tools can recognize more `commandName` values and properties than `dotnet run`.

The following table compares the `dotnet run` contract with the common .NET project-system behavior in Visual Studio:

| Setting or behavior | `dotnet run` | Visual Studio |
| --- | --- | --- |
| Supported profile types | Supports `Project` and `Executable`. | Supports `Project`, `Executable`, and an empty `commandName`. Installed project-system extensions can add other profile types. |
| Variable expansion | Expands `%NAME%` environment-variable references. In .NET 11 and later versions, also expands MSBuild property references in values that it uses to launch the process. | Expands environment variables and MSBuild properties in `executablePath`, `commandLineArgs`, `workingDirectory`, `launchUrl`, environment-variable values, and string-valued extension settings. |
| `commandLineArgs` for `Project` | Uses the profile value only when the project doesn't provide run arguments and you don't pass application arguments on the command line. | Appends the profile value to the run arguments from the project. |
| `workingDirectory` for `Project` | Ignores the property. | Supports the property. A relative path is relative to the project directory. |
| `workingDirectory` for `Executable` | A relative path is relative to the directory that contains the launch settings file. If omitted, the path defaults to the project or file-based app directory. | A relative path is relative to the project directory. If omitted, the path defaults to the output directory when that directory exists, or to the project directory otherwise. |
| Relative `executablePath` | Passes the value to the operating system without rebasing it. | Resolves a value with path components from the profile's working directory. For a bare executable name, Visual Studio checks its own current directory and then `PATH`. |
| `launchBrowser` and `launchUrl` | Retains the values in the parsed profile but doesn't open a browser. | Makes the values available to a launch provider. For example, ASP.NET Core tooling can open a browser. |
| `applicationUrl` | Sets `ASPNETCORE_URLS`. | Makes the value available to installed launch providers, such as ASP.NET Core tooling. |
| `dotnetRunMessages` | Controls the `Building...` message. | Doesn't use the property to control Visual Studio output. |
| Debugger properties | Ignores debugger-specific properties. | Uses properties such as `nativeDebugging`, `sqlDebugging`, `jsWebView2Debugging`, `remoteDebugEnabled`, and `hotReloadEnabled` when the project and debugger support the feature. |

In .NET 11 and later versions, both consumers expand `"$(ProjectDir)"`. In earlier versions, no single `workingDirectory` value identifies the project directory for both consumers. Visual Studio expands `"$(ProjectDir)"`, while `dotnet run` treats it as literal text and resolves relative paths from the directory that contains the launch settings file. Therefore, use `".."` for `dotnet run` with a conventional `Properties/launchSettings.json` or `My Project/launchSettings.json` file. Visual Studio resolves the same value to the parent of the project directory.

Windows Forms and WPF apps don't add another `dotnet run` profile type. Use a `Project` profile with common settings such as `commandLineArgs` and `environmentVariables`. In Visual Studio, these desktop project types can also use applicable debugger properties, such as `nativeDebugging` for mixed managed and native debugging or `jsWebView2Debugging` for WebView2. Browser and URL properties only have an effect when a launch provider or the application consumes them.

Other project types and Visual Studio workloads can install launch providers that add profile types or interpret extra properties. Those extensions don't add support to `dotnet run`: the CLI skips unsupported profile types during default selection and reports an error when you select one explicitly.

For Visual Studio's supported debugger settings and project UI, see Project settings for a .NET C# debug configuration.

## Arguments

  `<applicationArguments>`

  Arguments passed to the application that is being run.

  Any arguments that aren't recognized by `dotnet run` are passed to the application. To separate arguments for `dotnet run` from arguments for the application, use the `--` option.

## Forward arguments to the application

`dotnet run` forwards any token it doesn't recognize to the application. The forwarded tokens keep their original order, but `dotnet run` first removes the options it understands. When a recognized option appears between an unrecognized option name and its value, removing the recognized option can change the meaning of the leftover tokens.

For example, the following command interleaves the recognized option `--project` between tokens the application is meant to receive:

```dotnetcli
dotnet run --app-flag --app-name --project ConsoleApp.csproj A.txt
```

After `dotnet run` consumes `--project ConsoleApp.csproj`, the application receives `--app-flag --app-name A.txt`. The application then treats `A.txt` as the value of `--app-name`, which doesn't match the original command line.

To avoid this ambiguity, place application arguments after a literal `--`:

```dotnetcli
dotnet run --project ConsoleApp.csproj -- --app-flag --app-name A.txt
```

The `--` separator marks every following token as an application argument, so `dotnet run` doesn't reorder or reinterpret them. The separator also future-proofs scripts against new `dotnet run` options that might later match a token previously forwarded to the application.

> **Note:**
> The same behavior applies to `dotnet build` and to `dotnet test` in Microsoft.Testing.Platform (MTP) mode, which forward unrecognized tokens to MSBuild or to the test application respectively. For more information about `dotnet test`, see Forward arguments to the test application.
