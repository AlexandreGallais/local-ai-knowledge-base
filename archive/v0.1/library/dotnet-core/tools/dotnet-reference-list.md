---
title: "dotnet reference list command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/dotnet-reference-list.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet reference list

**This article applies to:** ✔️ .NET 6 SDK and later versions

## Name

`dotnet reference list` - Lists project-to-project references.

> **Note:**
> If you're using .NET 9 SDK or earlier, use the "verb first" form (`dotnet list reference`) instead. The "noun first" form was introduced in .NET 10. For more information, see More consistent command order.

## Synopsis

```dotnetcli
dotnet reference list [--project <PROJECT>]

dotnet reference list -h|--help
```

## Description

The `dotnet reference list` command provides a convenient option to list project references for a given project.

## Arguments

* **`PROJECT`**

  The project file to operate on. If a file is not specified, the command will search the current directory for one.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

## Examples

* List the project references for the specified project:

  ```dotnetcli
  dotnet reference list --project app/app.csproj
  ```

* List the project references for the project in the current directory:

  ```dotnetcli
  dotnet reference list
  ```
