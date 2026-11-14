---
title: "Garbage collector config settings (part 3 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/garbage-collector.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage collector config settings (part 3 of 5)

### Retain VM

- Configures whether segments that should be deleted are put on a standby list for future use or are released back to the operating system (OS).
- Default: Release segments back to the operating system. This is equivalent to setting the value to `false`.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.RetainVM` | `false` - release to OS`true` - put on standby | .NET Core 1.0 |
| **MSBuild property** | `RetainVMGarbageCollection` | `false` - release to OS`true` - put on standby | .NET Core 1.0 |
| **Environment variable** | `DOTNET_GCRetainVM` | `0` - release to OS`1` - put on standby | .NET 6 |

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.RetainVM": true
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.RetainVM": true
   }
}
```

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <RetainVMGarbageCollection>true</RetainVMGarbageCollection>
  </PropertyGroup>

</Project>
```

### Conserve memory

- Configures the garbage collector to conserve memory at the expense of more frequent garbage collections and possibly longer pause times.
- Default value is 0 - this implies no change.
- Besides the default value 0, values between 1 and 9 (inclusive) are valid. The higher the value, the more the garbage collector tries to conserve memory and thus to keep the heap small.
- If the value is non-zero, the large object heap will be compacted automatically if it has too much fragmentation.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.ConserveMemory` | `0` - `9` | .NET 6 |
| **Environment variable** | `DOTNET_GCConserveMemory` | `0` -`9` | .NET 6 |
| **app.config for .NET Framework** | GCConserveMemory | `0` -`9` | .NET Framework 4.8 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

Example *app.config* file:

```xml

<configuration>
  <runtime>
    <GCConserveMemory enabled="5"/>
  </runtime>
</configuration>
```

> **Tip:**
> Experiment with different numbers to see which value works best for you. Start with a value between 5 and 7.
