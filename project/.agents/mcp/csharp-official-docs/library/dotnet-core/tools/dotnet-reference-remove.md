---
title: "dotnet reference remove command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-reference-remove.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet reference remove

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet reference remove` - Removes project-to-project (P2P) references.

> **Note:**
> If you're using .NET 9 SDK or earlier, use the "verb first" form (`dotnet remove reference`) instead. The "noun first" form was introduced in .NET 10. For more information, see More consistent command order.

## Synopsis

```dotnetcli
dotnet reference remove [-f|--framework <FRAMEWORK>] [--project <PROJECT>]
     <PROJECT_REFERENCES>

dotnet reference remove -h|--help
```

## Description

The `dotnet reference remove` command provides a convenient option to remove project references from a project.

## Arguments

`PROJECT`

Target project file. If not specified, the command searches the current directory for one.

`PROJECT_REFERENCES`

Project-to-project (P2P) references to remove. You can specify one or multiple projects. Glob patterns are supported on Unix/Linux based terminals.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`-f|--framework <FRAMEWORK>`**

  Removes the reference only when targeting a specific framework using the TFM format.

## Examples

- Remove a project reference from the specified project:

  ```dotnetcli
  dotnet reference remove lib/lib.csproj --project app/app.csproj
  ```

- Remove multiple project references from the project in the current directory:

  ```dotnetcli
  dotnet reference remove lib1/lib1.csproj lib2/lib2.csproj
  ```

- Remove multiple project references using a glob pattern on Unix/Linux:

  ```dotnetcli
  dotnet reference remove **/*.csproj` --project app/app.csproj
  ```
