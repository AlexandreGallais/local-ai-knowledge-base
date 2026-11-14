---
title: "dotnet msbuild command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-msbuild.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet msbuild

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet msbuild` - Builds a project and all of its dependencies. Note: A solution or project file may need to be specified if there are multiple.

## Synopsis

```dotnetcli
dotnet msbuild <MSBUILD_ARGUMENTS>

dotnet msbuild -h
```

## Description

The `dotnet msbuild` command allows access to a fully functional MSBuild.

The command has the exact same capabilities as the existing MSBuild command-line client for SDK-style projects only. The options are all the same. For more information about the available options, see the MSBuild command-line reference.

The dotnet build command is equivalent to `dotnet msbuild -restore`.

## Examples

- Build a project and its dependencies:

  ```dotnetcli
  dotnet msbuild
  ```

- Build a project and its dependencies using Release configuration:

  ```dotnetcli
  dotnet msbuild -property:Configuration=Release
  ```

- Run the publish target and publish for the `osx-x64` RID:

  ```dotnetcli
  dotnet msbuild -target:Publish -property:RuntimeIdentifiers=osx-x64
  ```

- See the whole project with all targets included by the SDK:

  ```dotnetcli
  dotnet msbuild -preprocess
  dotnet msbuild -preprocess:<fileName>.xml
  ```
