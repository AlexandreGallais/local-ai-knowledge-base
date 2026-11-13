---
title: "dotnet run command (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-run.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet run command (part 2 of 2)

## Options

- **`--`**

  Delimits arguments to `dotnet run` from arguments for the application being run. All arguments after this delimiter are passed to the application run.

- **`-a|--arch <ARCHITECTURE>`**

Specifies the target architecture. This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--arch x86` sets the RID to `win-x86`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6 Preview 7.

- **`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see Artifacts Output Layout. This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.

- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. The default for most projects is `Debug`, but you can override the build configuration settings in your project.

- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.

- **`-e|--environment <KEY=VALUE>`**

  Sets the specified environment variable in the process that will be run by the command. The specified environment variable is *not* applied to the `dotnet run` process.

  Environment variables passed through this option take precedence over ambient environment variables, System.CommandLine `env` directives, and `environmentVariables` from the chosen launch profile. For more information, see Environment variables.

  (This option was added in .NET SDK 9.0.200.)

- **`-f|--framework <FRAMEWORK>`**

  Builds and runs the app using the specified framework. The framework must be specified in the project file.

- **`--file <FILE_PATH>`**

  The path to the file-based app to run. If a path isn't specified, the current directory is used to find and run the file. For more information on file-based apps, see Build file-based C# apps.

  On Unix, execute file-based apps directly using the filename by adding a shebang (`#!`) directive and setting the execute permission. For more information, see Unix shebang (`#!`) support.

  Introduced in .NET SDK 10.0.100.

- **`--force`**

  Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the *project.assets.json* file.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`-lp|--launch-profile <NAME>`**

  The name of the launch profile to use when launching the application. For more information, see Launch profiles.

- **`--no-build`**

  Doesn't build the project before running. It also implicitly sets the `--no-restore` flag.

- **`--no-cache`**

  Skip up to date checks and always build the program before running.

- **`--no-dependencies`**

  When restoring a project with project-to-project (P2P) references, restores the root project and not the references.

- **`--no-launch-profile`**

  Doesn't try to use *launchSettings.json* to configure the application.

- **`--no-restore`**

  Doesn't execute an implicit restore when running the command.

- **`--no-self-contained`**

Publish your application as a framework-dependent application. A compatible .NET runtime must be installed on the target machine to run your application.

- **`--os <OS>`**

Specifies the target operating system (OS). This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6.

- **`--project `**

  Specifies the path of the project file to run (folder name or full path). If not specified, it defaults to the current directory.

  The `-p` abbreviation for `--project` is deprecated starting in .NET 6 SDK. For a limited time, `-p` can still be used for `--project` despite the deprecation warning. If the argument provided for the option doesn't contain `=`, the command accepts `-p` as short for `--project`. Otherwise, the command assumes that `-p` is short for `--property`. This flexible use of `-p` for `--project` will be phased out in .NET 7.

- **`--property:<NAME>=<VALUE>`**

  Sets one or more MSBuild properties. Specify multiple properties delimited by semicolons or by repeating the option:

  ```dotnetcli
  --property:<NAME1>=<VALUE1>;<NAME2>=<VALUE2>
  --property:<NAME1>=<VALUE1> --property:<NAME2>=<VALUE2>
  ```

  The short form `-p` can be used for `--property`. If the argument provided for the option contains `=`, `-p` is accepted as short for `--property`. Otherwise, the command assumes that `-p` is short for `--project`.

  To pass `--property` to the application rather than set an MSBuild property, provide the option after the `--` syntax separator, for example:

  ```dotnetcli
  dotnet run -- --property name=value
  ```

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  Specifies the target runtime to restore packages for. For a list of Runtime Identifiers (RIDs), see the RID catalog.

- **`--sc|--self-contained`**

Publish the .NET runtime with your application so the runtime doesn't need to be installed on the target machine.

- **`--tl:[auto|on|off]`**

Specifies whether *Terminal Logger* should be used for the build output. The default is `auto`, which first verifies the environment before enabling terminal logging. The environment check verifies that the terminal is capable of using modern output features and isn't using a redirected standard output before enabling the new logger. `on` skips the environment check and enables terminal logging. `off` skips the environment check and uses the default console logger.

Terminal Logger shows you the restore phase followed by the build phase. During each phase, the currently building projects appear at the bottom of the terminal. Each project that's building outputs both the MSBuild target currently being built and the amount of time spent on that target. You can search this information to learn more about the build. When a project is finished building, a single "build completed" section is written that captures:

- The name of the built project.
- The target framework (if multi-targeted).
- The status of that build.
- The primary output of that build (which is hyperlinked).
- Any diagnostics generated for that project.

This option is available starting in .NET 8.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Environment variables

The following sources apply environment variables to the launched application:

1. Ambient environment variables from the operating system when the command is run.
1. System.CommandLine `env` directives, like `[env:key=value]`. These apply to the entire `dotnet run` process, not just the project being run by `dotnet run`.
1. Values generated from the chosen launch profile. `dotnet run` sets `DOTNET_LAUNCH_PROFILE`, and `applicationUrl` in a `Project` profile sets `ASPNETCORE_URLS`.
1. `environmentVariables` from the chosen launch profile, if any. These apply to the project being run by `dotnet run`.
1. `-e|--environment` CLI option values (added in .NET SDK version 9.0.200). These apply to the project being run by `dotnet run`.

The environment is constructed in the same order as this list, so the `-e|--environment` option has the highest precedence.

## Examples

- Run the project in the current directory:

  ```dotnetcli
  dotnet run
  ```

- Run the specified file-based app in the current directory:

  ```dotnetcli
  dotnet run --file ConsoleApp.cs
  ```

  File-based app support was added in .NET SDK 10.0.100.

- Run the specified project:

  ```dotnetcli
  dotnet run --project ./projects/proj1/proj1.csproj
  ```

- Run the project in the current directory, specifying Release configuration:

  ```dotnetcli
  dotnet run --property:Configuration=Release
  ```

- Run the project in the current directory (the `--help` argument in this example is passed to the application, since the blank `--` option is used):

  ```dotnetcli
  dotnet run --configuration Release -- --help
  ```

- Restore dependencies and tools for the project in the current directory only showing minimal output and then run the project:

  ```dotnetcli
  dotnet run --verbosity m
  ```

- Run the project in the current directory using the specified framework and pass arguments to the application:

  ```dotnetcli
  dotnet run -f net6.0 -- arg1 arg2
  ```

  In the following example, three arguments are passed to the application. One argument is passed using `-`, and two arguments are passed after `--`:

  ```dotnetcli
  dotnet run -f net6.0 -arg1 -- arg2 arg3
  ```
