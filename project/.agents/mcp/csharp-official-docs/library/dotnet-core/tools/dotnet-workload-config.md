---
title: "dotnet workload config command"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-workload-config.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet workload config

**This article applies to:** ✔️ .NET 8.0.400 SDK and later versions

## Name

`dotnet workload config` - Enables or disables workload-set update mode.

## Synopsis

```dotnetcli
dotnet workload config
[--update-mode [<workload-set>|<manifests>]]

dotnet workload config -?|-h|--help
```

## Description

For more information about the `dotnet workload config` command, see .NET SDK workload sets.

## Options

- **`-?|-h|--help`**

Prints out a description of how to use the command.

- **`--update-mode [<workload-set>|<manifests>]`**

  Controls whether updates look for workload set versions or individual manifest versions. To display the current mode, specify this option without an argument. For more information, see .NET SDK workload sets.

## Examples

- Enable workload-set update mode:

  ```dotnetcli
  dotnet workload config --update-mode workload-set
  ```

- Disable workload-set update mode:

  ```dotnetcli
  dotnet workload config --update-mode manifests
  ```
