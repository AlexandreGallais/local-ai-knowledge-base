---
title: "dotnet-core-uninstall list command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/additional-tools/uninstall-tool-cli-list.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# dotnet-core-uninstall list

**This article applies to:** ✔️ .NET Uninstall Tool 1.7.521001 and later versions

## Name

`dotnet-core-uninstall list` - List .NET SDKs or runtimes that can be removed with this tool.

## Synopsis

**os-windows:**

```dotnetcli
dotnet-core-uninstall list [--arm64] [--aspnet-runtime] [--hosting-bundle]
    [--runtime] [--sdk] [-v|--verbosity <LEVEL>] [--windows-desktop-runtime]
    [--x64] [--x86]

dotnet-core-uninstall list -?|-h|--help
```

**os-macos:**

```dotnetcli
dotnet-core-uninstall list [--preserve-vs-for-mac-sdks] [--runtime] [--sdk]
    [-v|--verbosity <LEVEL>]

dotnet-core-uninstall list -?|-h|--help
```

## Description

The `dotnet-core-uninstall list` command lists installed .NET SDKs or runtimes that can be removed with this tool. For more information about the limitations of this tool, see .NET uninstall tool overview.

## Options

**os-windows:**

- **`--arm64`**

  Lists all arm64 .NET SDKs and runtimes that can be uninstalled with this tool.

- **`--aspnet-runtime`**

  Lists all ASP.NET Core runtimes that can be uninstalled with this tool.

- **`--hosting-bundle`**

  Lists all .NET hosting bundles that can be uninstalled with this tool.

- **`--runtime`**

  Lists all .NET runtimes that can be uninstalled with this tool.

- **`--sdk`**

  Lists all .NET SDKs that can be uninstalled with this tool.

- **`-v, --verbosity <LEVEL>`**

  Sets the verbosity level. The default value is `normal`. Allowed values are:

  - `q[uiet]`
  - `m[inimal]`
  - `n[ormal]`
  - `d[etailed]`
  - `diag[nostic]`.

- **`--windows-desktop-runtime`**

  Lists all Windows Desktop runtimes that can be uninstalled with this tool.

- **`--x64`**

  Lists all x64 .NET SDKs and runtimes that can be uninstalled with this tool.

- **`--x86`**

  Lists all x86 .NET SDKs and runtimes that can be uninstalled with this tool.

- **`-?|-h|--help`**

  Shows help and usage information.

**os-macos:**

- **`--preserve-vs-for-mac-sdks`**

  Prevents removal of SDKs and runtimes that have a high probability of being used by Visual Studio for Mac.

  > **Note:**
  > Visual Studio for Mac is out of support.

- **`--runtime`**

  Lists all .NET runtimes that can be uninstalled with this tool.

- **`--sdk`**

  Lists all .NET SDKs that can be uninstalled with this tool.

- **`-v, --verbosity <LEVEL>`**

  Sets the verbosity level. The default value is `normal`. Allowed values are:

  - `q[uiet]`
  - `m[inimal]`
  - `n[ormal]`
  - `d[etailed]`
  - `diag[nostic]`.

- **`-?|-h|--help`**

  Shows help and usage information.

## Examples

- List all the .NET SDKs and runtimes that can be removed with this tool:

  ```console
  dotnet-core-uninstall list
  ```

- List all the x64 .NET SDKs and runtimes:

  ```console
  dotnet-core-uninstall list --x64
  ```

- List all the x86 .NET SDKs:

  ```console
  dotnet-core-uninstall list --sdk --x86
  ```

## See also

- .NET uninstall tool overview
- dotnet-core-uninstall dry-run
- dotnet-core-uninstall remove
