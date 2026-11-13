---
title: "dotnet publish command (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-publish.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet publish

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet publish` - Publishes the application and its dependencies to a folder for deployment to a hosting system.

## Synopsis

```dotnetcli
dotnet publish [<PROJECT>|<SOLUTION>|<FILE>] [-a|--arch <ARCHITECTURE>]
    [--artifacts-path <ARTIFACTS_DIR>]
    [-c|--configuration <CONFIGURATION>] [--disable-build-servers]
    [-f|--framework <FRAMEWORK>] [--force] [--interactive]
    [--manifest <PATH_TO_MANIFEST_FILE>] [--no-build] [--no-dependencies]
    [--no-restore] [--nologo] [-o|--output <OUTPUT_DIRECTORY>]
    [--os <OS>] [-p|--property:<PROPERTYNAME>=<VALUE>]
    [-r|--runtime <RUNTIME_IDENTIFIER>]
    [--sc|--self-contained] [--no-self-contained]
    [-s|--source <SOURCE>] [--tl:[auto|on|off]]
    [--ucr|--use-current-runtime]
    [-v|--verbosity <LEVEL>] [--version-suffix <VERSION_SUFFIX>]

dotnet publish -h|--help
```

## Description

`dotnet publish` compiles the application, reads through its dependencies specified in the project file, and publishes the resulting set of files to a directory. The output includes the following assets:

- Intermediate Language (IL) code in an assembly with a *dll* extension.
- A *.deps.json* file that includes all of the dependencies of the project.
- A *.runtimeconfig.json* file that specifies the shared runtime that the application expects, as well as other configuration options for the runtime (for example, garbage collection type).
- The application's dependencies, which are copied from the NuGet cache into the output folder.

The `dotnet publish` command's output is ready for deployment to a hosting system (for example, a server, PC, Mac, laptop) for execution. It's the only officially supported way to prepare the application for deployment. Depending on the type of deployment that the project specifies, the hosting system may or may not have the .NET shared runtime installed on it. For more information, see .NET application publishing overview.

### Implicit restore

You don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build`, `dotnet run`, `dotnet test`, `dotnet publish`, and `dotnet pack`. To disable implicit restore, use the `--no-restore` option.

The `dotnet restore` command is still useful in certain scenarios where explicitly restoring makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control when the restore occurs.

For information about how to manage NuGet feeds, see the `dotnet restore` documentation.

### MSBuild

The `dotnet publish` command calls MSBuild, which invokes the `Publish` target. If the `IsPublishable` property is set to `false` for a particular project, the `Publish` target can't be invoked, and the `dotnet publish` command only runs the implicit dotnet restore on the project.

Any parameters passed to `dotnet publish` are passed to MSBuild. The `-c` and `-o` parameters map to MSBuild's `Configuration` and `PublishDir` properties, respectively.

The `dotnet publish` command accepts MSBuild options, such as `-p` for setting properties and `-l` to define a logger. For example, you can set an MSBuild property by using the format: `-p:<NAME>=<VALUE>`.

### .pubxml files

You can also set publish-related properties by referring to a *.pubxml* file. For example:

```dotnetcli
dotnet publish -p:PublishProfile=FolderProfile
```

The preceding example uses the *FolderProfile.pubxml* file that is found in the *\<project_folder>/Properties/PublishProfiles* folder. If you specify a path and file extension when setting the `PublishProfile` property, they're ignored. MSBuild by default looks in the *Properties/PublishProfiles* folder and assumes the *pubxml* file extension. To specify the path and filename including extension, set the `PublishProfileFullPath` property instead of the `PublishProfile` property.

In the *.pubxml* file:

* `PublishUrl` is used by Visual Studio to denote the Publish target.
* `PublishDir` is used by the CLI to denote the Publish target.

If you want the scenario to work in all places, you can initialize both these properties to the same value in the *.pubxml* file. When GitHub issue dotnet/sdk#20931 is resolved, only one of these properties will need to be set.

Some properties in the *.pubxml* file are honored only by Visual Studio and have no effect on `dotnet publish`. We're working to bring the CLI more into alignment with Visual Studio's behavior. But some properties will never be used by the CLI. The CLI and Visual Studio both do the packaging aspect of publishing, and dotnet/sdk#29817 plans to add support for more properties related to that. But the CLI doesn't do the deployment automation aspect of publishing, and properties related to that aren't supported. The most notable *.pubxml* properties that aren't supported by `dotnet publish` are the following ones that impact the build:

* `LastUsedBuildConfiguration`
* `Configuration`
* `Platform`
* `LastUsedPlatform`
* `TargetFramework`
* `TargetFrameworks`
* `RuntimeIdentifier`
* `RuntimeIdentifiers`

### MSBuild properties

The following MSBuild properties change the output of `dotnet publish`.

- `PublishReadyToRun`

  Compiles application assemblies as ReadyToRun (R2R) format. R2R is a form of ahead-of-time (AOT) compilation. For more information, see ReadyToRun images.

  To see warnings about missing dependencies that could cause runtime failures, use `PublishReadyToRunShowWarnings=true`.

  We recommend that you specify `PublishReadyToRun` in a publish profile rather than on the command line.

- `PublishSingleFile`

  Packages the app into a platform-specific single-file executable. For more information about single-file publishing, see the single-file bundler design document. When this property is set to `true`, the `PublishSelfContained` property is implicitly set to `true`.

  We recommend that you specify this option in the project file rather than on the command line.

- `PublishTrimmed`

  Trims unused libraries to reduce the deployment size of an app when publishing a self-contained executable. For more information, see Trim self-contained deployments and executables. Available since .NET 6 SDK.

  We recommend that you specify this option in the project file rather than on the command line.

For more information, see the following resources:

- MSBuild command-line reference
- Visual Studio publish profiles (.pubxml) for ASP.NET Core app deployment
- dotnet msbuild

### Workload manifest downloads

When you run this command, it initiates an asynchronous background download of advertising manifests for workloads. If the download is still running when this command finishes, the download is stopped. For more information, see Advertising manifests.

## Arguments

`PROJECT | SOLUTION | FILE`

The project or solution or C# (file-based app) file to operate on. If a file isn't specified, MSBuild searches the current directory for a project or solution.

- `PROJECT` is the path and filename of a C#, F#, or Visual Basic project file, or the path to a directory that contains a C#, F#, or Visual Basic project file.

- `SOLUTION` is the path and filename of a solution file (*.sln* or *.slnx* extension), or the path to a directory that contains a solution file.

- `FILE` is an argument added in .NET 10. The path and filename of a file-based app. File-based apps are contained within a single file that is built and run without a corresponding project (*.csproj*) file. For more information, see Build file-based C# apps.
