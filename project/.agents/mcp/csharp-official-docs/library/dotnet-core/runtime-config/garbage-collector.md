---
title: "Garbage collector config settings (part 1 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/garbage-collector.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Runtime configuration options for garbage collection

This page contains information about settings for the .NET runtime garbage collector (GC). If you're trying to achieve peak performance of a running app, consider using these settings. However, the defaults provide optimum performance for most applications in typical situations.

Settings are arranged into groups on this page. The settings within each group are commonly used in conjunction with each other to achieve a specific result.

> **Note:**
>
> - These configurations are only read by the runtime when the GC is initialized (usually this means during the process startup time). If you change an environment variable when a process is already running, the change won't be reflected in that process. Settings that can be changed through APIs at runtime, such as latency level, are omitted from this page.
> - Because GC is per process, it rarely ever makes sense to set these configurations at the machine level. For example, you wouldn't want every .NET process on a machine to use server GC or the same heap hard limit.
> - For number values, use decimal notation for settings in the *runtimeconfig.json* or *runtimeconfig.template.json* file and hexadecimal notation for environment variable settings. For hexadecimal values, you can specify them with or without the "0x" prefix.
> - If you're using the environment variables, .NET 6 and later versions standardize on the prefix `DOTNET_` instead of `COMPlus_`. However, the `COMPlus_` prefix continues to work. If you're using a previous version of the .NET runtime, you should still use the `COMPlus_` prefix, for example, `COMPlus_gcServer`.

## Ways to specify the configuration

For different versions of the .NET runtime, there are different ways to specify the configuration values. The following table shows a summary.

| Config location      | .NET versions this location applies to | Formats  | How it's interpreted                                         |
| -------------------- | -------------------------------------- | -------- | ------------------------------------------------------------ |
| runtimeconfig.json file/</br>runtimeconfig.template.json file | .NET (Core)                           | n        | n is interpreted as a decimal value.                         |
| Environment variable | .NET Framework, .NET              | 0xn or n | n is interpreted as a hex value in either format             |
| app.config file      | .NET Framework                         | 0xn      | n is interpreted as a hex value1                  |

1 You can specify a value without the `0x` prefix for an app.config file setting, but it's not recommended. On .NET Framework 4.8+, due to a bug, a value specified without the `0x` prefix is interpreted as hexadecimal, but on previous versions of .NET Framework, it's interpreted as decimal. To avoid having to change your config, use the `0x` prefix when specifying a value in your app.config file.

For example, to specify 12 heaps for `GCHeapCount` for a .NET Framework app named *A.exe*, add the following XML to the *A.exe.config* file.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<configuration>
    ...
    <runtime>
        <gcServer enabled="true"/>
        <GCHeapCount>0xc</GCHeapCount>
    </runtime>
</configuration>
```

For both .NET (Core) and .NET Framework, you can use environment variables.

On Windows using .NET 6 or a later version:

```cmd
SET DOTNET_gcServer=1
SET DOTNET_GCHeapCount=c
```

On other operating systems using .NET 6 or a later version:

```bash
export DOTNET_gcServer=1
export DOTNET_GCHeapCount=c
```

If you're not using .NET Framework, you can also set the value in the *runtimeconfig.json* or *runtimeconfig.template.json* file.

*runtimeconfig.json* file:

```json
{
  "runtimeOptions": {
   "configProperties": {
      "System.GC.Server": true,
      "System.GC.HeapCount": 12
   }
  }
}
```

*runtimeconfig.template.json* file:

```json
{
  "configProperties": {
    "System.GC.Server": true,
    "System.GC.HeapCount": 12
  }
}
```

## Flavors of garbage collection

The two main flavors of garbage collection are workstation GC and server GC. For more information about differences between the two, see Workstation and server garbage collection.

The subflavors of garbage collection are background and non-concurrent.

Use the following settings to select flavors of garbage collection:

- Workstation vs. server GC
- Background GC

### Workstation vs. server

- Configures whether the application uses workstation garbage collection or server garbage collection.
- Default: Workstation garbage collection. This is equivalent to setting the value to `false`.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.Server` | `false` - workstation`true` - server | .NET Core 1.0 |
| **MSBuild property** | `ServerGarbageCollection` | `false` - workstation`true` - server | .NET Core 1.0 |
| **Environment variable** | `DOTNET_gcServer` | `0` - workstation`1` - server | .NET 6 |
| **app.config for .NET Framework** | GCServer | `false` - workstation`true` - server |  |

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.Server": true
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.Server": true
   }
}
```

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <ServerGarbageCollection>true</ServerGarbageCollection>
  </PropertyGroup>

</Project>
```

### Background GC

- Configures whether background (concurrent) garbage collection is enabled.
- Default: Use background GC. This is equivalent to setting the value to `true`.
- For more information, see Background garbage collection.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.Concurrent` | `true` - background GC`false` - non-concurrent GC | .NET Core 1.0 |
| **MSBuild property** | `ConcurrentGarbageCollection` | `true` - background GC`false` - non-concurrent GC | .NET Core 1.0 |
| **Environment variable** | `DOTNET_gcConcurrent` | `1` - background GC`0` - non-concurrent GC | .NET 6 |
| **app.config for .NET Framework** | gcConcurrent | `true` - background GC`false` - non-concurrent GC |  |

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.Concurrent": false
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.Concurrent": false
   }
}
```

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <ConcurrentGarbageCollection>false</ConcurrentGarbageCollection>
  </PropertyGroup>

</Project>
```

## Standalone GC

To use a standalone garbage collector instead of the default GC implementation, you can specify either the *path* (in .NET 9 and later versions) or the *name* of a GC native library.

### Path

- Specifies the full path of a GC native library that the runtime loads in place of the default GC implementation. To be secure, this location should be protected from potentially malicious tampering.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.Path` | *string_path* | .NET 9 |
| **Environment variable** | `DOTNET_GCPath` | *string_path* | .NET 9 |

### Name

- Specifies the name of a GC native library that the runtime loads in place of the default GC implementation. The behavior changed in .NET 9 with the introduction of the Path config.

  In .NET 8 and previous versions:

  - If only a name of the library is specified, the library must reside in the same directory as the .NET runtime (*coreclr.dll* on Windows, *libcoreclr.so* on Linux, or *libcoreclr.dylib* on OSX).
  - The value can also be a relative path, for example, if you specify "..\clrgc.dll" on Windows, *clrgc.dll* is loaded from the parent directory of the .NET runtime directory.

  In .NET 9 and later versions, this value specifies a file name only (paths aren't allowed):

  - .NET searches for the name you specify in the directory where the assembly that contains your app's `Main` method resides.
  - If the file isn't found, the .NET runtime directory is searched.

- This configuration setting is ignored if the Path config is specified.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.Name` | *string_name* | .NET 7 |
| **Environment variable** | `DOTNET_GCName` | *string_name* | .NET 6 |

## LOH specific settings

### Allow very large objects

- Configures garbage collector support on 64-bit platforms for arrays that are greater than 2 gigabytes (GB) in total size.
- Default: GC supports arrays greater than 2-GB. This is equivalent to setting the value to `1`.
- This option may become obsolete in a future version of .NET.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | N/A | N/A | N/A |
| **Environment variable** | `DOTNET_gcAllowVeryLargeObjects` | `1` - enabled `0` - disabled | .NET 6 |
| **app.config for .NET Framework** | gcAllowVeryLargeObjects | `1` - enabled `0` - disabled | .NET Framework 4.5 |

### Large object heap threshold

- Specifies the threshold size, in bytes, that causes objects to go on the large object heap (LOH).
- The default threshold is 85,000 bytes.
- The value you specify must be larger than the default threshold.
- The value might be capped by the runtime to the maximum possible size for the current configuration. You can inspect the value in use at runtime through the `System.GC.GetConfigurationVariables` API.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.LOHThreshold` | *decimal value* | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCLOHThreshold` | *hexadecimal value* | .NET 6 |
| **app.config for .NET Framework** | GCLOHThreshold | *decimal value* | .NET Framework 4.8 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.LOHThreshold": 120000
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.LOHThreshold": 120000
   }
}
```

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to set a threshold size of 120,000 bytes, the values would be 120000 for the JSON file and 0x1D4C0 or 1D4C0 for the environment variable.
