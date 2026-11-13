---
title: "dotnet publish command (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-publish.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet publish command (part 2 of 2)

## Options

- **`-a|--arch <ARCHITECTURE>`**

Specifies the target architecture. This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--arch x86` sets the RID to `win-x86`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6 Preview 7.

- **`--artifacts-path <ARTIFACTS_DIR>`**

All build output files from the executed command will go in subfolders under the specified path, separated by project. For more information see Artifacts Output Layout. This option and the value provided must be explicitly cascaded in any `dotnet` command that depends on the output of another `dotnet` command, for example, when using `dotnet build --no-restore` and `dotnet publish --no-build`. Available since .NET 8 SDK.

- **`-c|--configuration <CONFIGURATION>`**

Defines the build configuration. If you're developing with the .NET 8 SDK or a later version, the command uses the `Release` configuration by default for projects whose TargetFramework is set to `net8.0` or a later version. The default build configuration is `Debug` for earlier versions of the SDK and for earlier target frameworks. You can override the default in project settings or by using this option. For more information, see 'dotnet publish' uses Release configuration and 'dotnet pack' uses Release configuration.

- **`--disable-build-servers`**

Forces the command to ignore any persistent build servers. This option provides a consistent way to disable all use of build caching, which forces a build from scratch. A build that doesn't rely on caches is useful when the caches might be corrupted or incorrect for some reason. Available since .NET 7 SDK.

- **`-f|--framework <FRAMEWORK>`**

  Publishes the application for the specified target framework. You must specify the target framework in the project file.

- **`--force`**

  Forces all dependencies to be resolved even if the last restore was successful. Specifying this flag is the same as deleting the *project.assets.json* file.

- **`--interactive`**

Allows the command to stop and wait for user input or action. For example, to complete authentication.

- **`--manifest <PATH_TO_MANIFEST_FILE>`**

  Specifies one or several target manifests to use to trim the set of packages published with the app. The manifest file is part of the output of the `dotnet store` command. To specify multiple manifests, add a `--manifest` option for each manifest.

- **`--no-build`**

  Doesn't build the project before publishing. It also implicitly sets the `--no-restore` flag.

- **`--no-dependencies`**

  Ignores project-to-project references and only restores the root project.

- **`--nologo`**

  Doesn't display the startup banner or the copyright message.

- **`--no-restore`**

  Doesn't execute an implicit restore when running the command.

- **`-o|--output <OUTPUT_DIRECTORY>`**

  Specifies the path for the output directory.

  If not specified, it defaults to *[project_file_folder]/bin/[configuration]/[framework]/publish/* for a framework-dependent executable and cross-platform binaries. It defaults to *[project_file_folder]/bin/[configuration]/[framework]/[runtime]/publish/* for a self-contained executable.

  In a web project, if the output folder is in the project folder, successive `dotnet publish` commands result in nested output folders. For example, if the project folder is *myproject*, and the publish output folder is *myproject/publish*, and you run `dotnet publish` twice, the second run puts content files such as *.config* and *.json* files in *myproject/publish/publish*. To avoid nesting publish folders, specify a publish folder that isn't **directly** under the project folder, or exclude the publish folder from the project. To exclude a publish folder named *publishoutput*, add the following element to a `PropertyGroup` element in the *.csproj* file:

  ```xml
  <DefaultItemExcludes>$(DefaultItemExcludes);publishoutput**</DefaultItemExcludes>
  ```

  - .NET 7.0.200 SDK and later

    If you specify the `--output` option when running this command on a solution, the CLI will emit a warning (an error in 7.0.200) due to the unclear semantics of the output path. The `--output` option is disallowed because all outputs of all built projects would be copied into the specified directory, which isn't compatible with multi-targeted projects, as well as projects that have different versions of direct and transitive dependencies. For more information, see Solution-level `--output` option no longer valid for build-related commands.

  - .NET Core 3.x SDK and later

    If you specify a relative path when publishing a project, the generated output directory is relative to the current working directory, not to the project file location.

    If you specify a relative path when publishing a solution, all output for all projects goes into the specified folder relative to the current working directory. To make publish output go to separate folders for each project, specify a relative path by using the msbuild `PublishDir` property instead of the `--output` option. For example, `dotnet publish -p:PublishDir=.\publish` sends publish output for each project to a `publish` folder under the folder that contains the project file.

- **`--os <OS>`**

Specifies the target operating system (OS). This is a shorthand syntax for setting the Runtime Identifier (RID), where the provided value is combined with the default RID. For example, on a `win-x64` machine, specifying `--os linux` sets the RID to `linux-x64`. If you use this option, don't use the `-r|--runtime` option. Available since .NET 6.

- **`--sc|--self-contained`**

Publish the .NET runtime with your application so the runtime doesn't need to be installed on the target machine.

- **`-p|--property:<PROPERTYNAME>=<VALUE>`**

  Sets one or more MSBuild properties. Specify multiple properties delimited by semicolons or by repeating the option:

  ```dotnetcli
  --property:<NAME1>=<VALUE1>;<NAME2>=<VALUE2>
  --property:<NAME1>=<VALUE1> --property:<NAME2>=<VALUE2>
  ```

- **`--no-self-contained`**

Publish your application as a framework-dependent application. A compatible .NET runtime must be installed on the target machine to run your application.

- **`--source `**

  The URI of the NuGet package source to use during the restore operation.

- **`-r|--runtime <RUNTIME_IDENTIFIER>`**

  Publishes the application for a given runtime. For a list of Runtime Identifiers (RIDs), see the RID catalog. For more information, see .NET application publishing overview. If you use this option, use `--self-contained` or `--no-self-contained` also.

  > **Note:**
  > Publishing can be done on the *solution* level and on the single *project* level. When publishing from the *solution* level by specifying the optional `<SOLUTION>` parameter or leaving it default, MSBuild first compiles the output into the `publish` directory **without** any symbols. This means that later compilations done by MSBuild, based on the initial compilation, will still not include any details for specified `<RUNTIME_IDENTIFIER>`.
  >
  > This is expected behavior. To avoid this behavior either publish for a single project by specifying the optional `<PROJECT>` parameter for your RID or specify RIDs directly in the project config by adding the `<RuntimeIdentifiers>` property.

- **`--tl:[auto|on|off]`**

Specifies whether *Terminal Logger* should be used for the build output. The default is `auto`, which first verifies the environment before enabling terminal logging. The environment check verifies that the terminal is capable of using modern output features and isn't using a redirected standard output before enabling the new logger. `on` skips the environment check and enables terminal logging. `off` skips the environment check and uses the default console logger.

Terminal Logger shows you the restore phase followed by the build phase. During each phase, the currently building projects appear at the bottom of the terminal. Each project that's building outputs both the MSBuild target currently being built and the amount of time spent on that target. You can search this information to learn more about the build. When a project is finished building, a single "build completed" section is written that captures:

- The name of the built project.
- The target framework (if multi-targeted).
- The status of that build.
- The primary output of that build (which is hyperlinked).
- Any diagnostics generated for that project.

This option is available starting in .NET 8.

- **`--ucr|--use-current-runtime`**

Use the current runtime as the target runtime.

- **`-v|--verbosity <LEVEL>`**

Sets the verbosity level of the command. Allowed values are `q[uiet]`, `m[inimal]`, `n[ormal]`, `d[etailed]`, and `diag[nostic]`. The default is `minimal`. For more information, see `Microsoft.Build.Framework.LoggerVerbosity`.

- **`--version-suffix <VERSION_SUFFIX>`**

  Defines the version suffix to replace the asterisk (`*`) in the version field of the project file.

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

- Create a framework-dependent cross-platform binary for the project in the current directory:

  ```dotnetcli
  dotnet publish
  ```

  Starting with .NET Core 3.0 SDK, this example also creates a framework-dependent executable for the current platform.

- Create a self-contained executable for the project in the current directory, for a specific runtime:

  ```dotnetcli
  dotnet publish --runtime osx-x64
  ```

  The RID must be in the project file.

- Create a framework-dependent executable for the project in the current directory, for a specific platform:

  ```dotnetcli
  dotnet publish --runtime osx-x64 --self-contained false
  ```

  The RID must be in the project file. This example applies to .NET Core 3.0 SDK and later versions.

- Publish the project in the current directory, for a specific runtime and target framework:

  ```dotnetcli
  dotnet publish --framework net8.0 --runtime osx-x64
  ```

- Publish the specified project file:

  ```dotnetcli
  dotnet publish ~/projects/app1/app1.csproj
  ```

- Publish the current application but don't restore project-to-project (P2P) references, just the root project during the restore operation:

  ```dotnetcli
  dotnet publish --no-dependencies
  ```

- Publish the file-based C# program *app.cs* in the current directory:

  ```dotnetcli
  dotnet publish app.cs
  ```

  File-based program support was added in .NET SDK 10.0.100.

## See also

- .NET application publishing overview
- Target frameworks
- Runtime Identifier (RID) catalog
- Containerize a .NET app with dotnet publish
- Working with macOS Catalina Notarization
- Directory structure of a published application
- MSBuild command-line reference
- Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment
- dotnet msbuild
- Trim self-contained deployments
