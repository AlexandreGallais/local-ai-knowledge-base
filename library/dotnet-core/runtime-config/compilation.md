---
title: "Compilation config settings"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/runtime-config/compilation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Runtime configuration options for compilation

This article details the settings you can use to configure .NET compilation.

## Tiered compilation

- Configures whether the just-in-time (JIT) compiler uses tiered compilation. Tiered compilation transitions methods through two tiers:
  - The first tier generates code more quickly (quick JIT) or loads pre-compiled code (ReadyToRun).
  - The second tier generates optimized code in the background ("optimizing JIT").
- In .NET Core 3.0 and later, tiered compilation is enabled by default.
- In .NET Core 2.1 and 2.2, tiered compilation is disabled by default.
- For more information, see the Tiered compilation guide.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Runtime.TieredCompilation` | `true` - enabled`false` - disabled |
| **MSBuild property** | `TieredCompilation` | `true` - enabled`false` - disabled |
| **Environment variable** | `DOTNET_TieredCompilation` | `1` - enabled`0` - disabled |

### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.Runtime.TieredCompilation": false
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.Runtime.TieredCompilation": false
   }
}
```

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TieredCompilation>false</TieredCompilation>
  </PropertyGroup>

</Project>
```

## Quick JIT

- Configures whether the JIT compiler uses *quick JIT*. For methods that don't contain loops and for which pre-compiled code is not available, quick JIT compiles them more quickly but without optimizations.
- Enabling quick JIT decreases startup time but can produce code with degraded performance characteristics. For example, the code may use more stack space, allocate more memory, and run slower.
- If quick JIT is disabled but tiered compilation is enabled, only pre-compiled code participates in tiered compilation. If a method is not pre-compiled with ReadyToRun, the JIT behavior is the same as if tiered compilation were disabled.
- In .NET Core 3.0 and later, quick JIT is enabled by default.
- In .NET Core 2.1 and 2.2, quick JIT is disabled by default.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Runtime.TieredCompilation.QuickJit` | `true` - enabled`false` - disabled |
| **MSBuild property** | `TieredCompilationQuickJit` | `true` - enabled`false` - disabled |
| **Environment variable** | `DOTNET_TC_QuickJit` | `1` - enabled`0` - disabled |

### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.Runtime.TieredCompilation.QuickJit": false
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.Runtime.TieredCompilation.QuickJit": false
   }
}
```

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TieredCompilationQuickJit>false</TieredCompilationQuickJit>
  </PropertyGroup>

</Project>
```

## Quick JIT for loops

- Configures whether the JIT compiler uses quick JIT on methods that contain loops.
- Enabling quick JIT for loops may improve startup performance. However, long-running loops can get stuck in less-optimized code for long periods.
- If quick JIT is disabled, this setting has no effect.
- If you omit this setting, quick JIT is not used for methods that contain loops. This is equivalent to setting the value to `false`.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Runtime.TieredCompilation.QuickJitForLoops` | `false` - disabled`true` - enabled |
| **MSBuild property** | `TieredCompilationQuickJitForLoops` | `false` - disabled`true` - enabled |
| **Environment variable** | `DOTNET_TC_QuickJitForLoops` | `0` - disabled`1` - enabled |

### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.Runtime.TieredCompilation.QuickJitForLoops": false
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.Runtime.TieredCompilation.QuickJitForLoops": false
   }
}
```

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TieredCompilationQuickJitForLoops>true</TieredCompilationQuickJitForLoops>
  </PropertyGroup>

</Project>
```

## ReadyToRun

- Configures whether the .NET runtime uses pre-compiled code for images with available ReadyToRun data. Disabling this option forces the runtime to JIT-compile framework code.
- For more information, see Ready to Run.
- If you omit this setting, .NET uses ReadyToRun data when it's available. This is equivalent to setting the value to `1`.

|                          | Setting name        | Values                           |
|--------------------------|---------------------|----------------------------------|
| **Environment variable** | `DOTNET_ReadyToRun` | `1` - enabled`0` - disabled |

## Dynamic code

Set this option to `false` to test fallback code that you need when dynamic code isn't supported, such as in Native AOT apps, without publishing with Native AOT. The option causes `System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported` to return `false`.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported` | `true` - supported`false` - not supported |
| **MSBuild property** | `DynamicCodeSupport` | `true` - supported`false` - not supported |

### Example

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <DynamicCodeSupport>false</DynamicCodeSupport>
  </PropertyGroup>

</Project>
```

## Profile-guided optimization

This setting enables dynamic (tiered) profile-guided optimization (PGO) in .NET 6 and later versions.

|                          | Setting name       | Values                                  |
|--------------------------|--------------------|-----------------------------------------|
| **Environment variable** | `DOTNET_TieredPGO` | `1` - enabled`0` - disabled        |
| **MSBuild property**     | `TieredPGO`        | `true` - enabled`false` - disabled |

Profile-guided optimization (PGO) is where the JIT compiler generates optimized code in terms of the types and code paths that are most frequently used. *Dynamic* PGO works hand-in-hand with tiered compilation to further optimize code based on additional instrumentation that's put in place during tier 0.

### Examples

Project file:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TieredPGO>true</TieredPGO>
  </PropertyGroup>

</Project>
```
