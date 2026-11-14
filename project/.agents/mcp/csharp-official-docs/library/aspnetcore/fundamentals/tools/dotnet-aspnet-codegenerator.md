---
title: "ASP.NET Core code generator tool (`aspnet-codegenerator`) (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/tools/dotnet-aspnet-codegenerator.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core code generator tool (`aspnet-codegenerator`)

The `dotnet aspnet-codegenerator` command runs the ASP.NET Core scaffolding engine. Running the `dotnet aspnet-codegenerator` command is required to scaffold from the command line or when using Visual Studio Code. The command isn't required to use scaffolding with Visual Studio, which includes the scaffolding engine by default.

## Install and update the code generator tool

Install the .NET SDK.

`dotnet aspnet-codegenerator` is a global tool that must be installed. The following command installs the latest stable version of the ASP.NET Core code generator tool:

```dotnetcli
dotnet tool install -g dotnet-aspnet-codegenerator
```

> **Note:**
> By default, the architecture of the .NET binaries to install represents the currently running operating system architecture.
> To specify a different architecture, review how to use the `dotnet tool install` command with the '--arch' option.
> For more information, see GitHub dotnet/aspnetcore.docs issue #29262 - _Add '-a arm64' on Apple Silicon_.

If the tool is already installed, the following command updates the tool to the latest stable version available from the installed .NET SDKs:

```dotnetcli
dotnet tool update -g dotnet-aspnet-codegenerator
```

## Uninstall the code generator tool

It may be necessary to uninstall the ASP.NET Core code generator tool to resolve problems. For example, if you installed a preview version of the tool, uninstall it before installing the released version.

The following commands uninstall the ASP.NET Core code generator tool and install the latest stable version:

```dotnetcli
dotnet tool uninstall -g dotnet-aspnet-codegenerator
dotnet tool install -g dotnet-aspnet-codegenerator
```

## Synopsis

```
dotnet aspnet-codegenerator [arguments] [-b|--build-base-path] [-c|--configuration] [-n|--nuget-package-dir] [--no-build] [-p|--project] [-tfm|--target-framework]
dotnet aspnet-codegenerator [-h|--help]
```

## Description

The `dotnet aspnet-codegenerator` global command runs the ASP.NET Core code generator and scaffolding engine.

## Arguments

`generator`

The code generator to run. The available generators are shown in the following table.

Generator         | Operation
----------------- | ---
`area`            | Scaffolds an area.
`blazor`          | Scaffolds Blazor create, read, update, delete, and list pages.
`blazor-identity` | Generates Blazor Identity files.
`controller`      | Scaffolds a controller.
`identity`        | Scaffolds Identity.
`minimalapi`      | Generates an endpoints file (with CRUD API endpoints) given a model and optional database context.
`razorpage`       | Scaffolds Razor Pages.
`view`            | Scaffolds a view.

## Options

`-b|--build-base-path`

The build base path.

`-c|--configuration {Debug|Release}`

Defines the build configuration. The default value is `Debug`.

`-h|--help`

Prints out a short help for the command.

`-n|--nuget-package-dir`

Specifies the NuGet package directory.

`--no-build`

Doesn't build the project before running. Passing `--no-build` also implicitly sets the `--no-restore` flag.

`-p|--project `

Specifies the path of the project file to run (folder name or full path). If not specified, the tool defaults to the current directory.

`-tfm|--target-framework`

The target framework to use.
