---
title: "Garbage collector config settings (part 4 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/garbage-collector.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage collector config settings (part 4 of 5)

## Manage resource usage for Server GC

The following settings affect the number of Server GC threads and if/how they are affinitized to cores. They have no effect on Workstation GC.

- Heap count
- Affinitize
- Affinitize mask
- Affinitize ranges
- CPU groups
- DATAS

For more information about the first 3 settings, see the Middle ground between workstation and server GC blog entry.

### Heap count

- Limits the number of heaps created by the garbage collector.
- Applies to server garbage collection only.
- If GC processor affinity is enabled, which is the default, the heap count setting affinitizes `n` GC heaps/threads to the first `n` processors. (Use the affinitize mask or affinitize ranges settings to specify exactly which processors to affinitize.)
- If GC processor affinity is disabled, this setting limits the number of GC heaps.
- For more information, see the GCHeapCount remarks.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapCount` | *decimal value* | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCHeapCount` | *hexadecimal value* | .NET 6 |
| **app.config for .NET Framework** | GCHeapCount | *decimal value* | .NET Framework 4.6.2 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.HeapCount": 16
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.HeapCount": 16
   }
}
```

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to limit the number of heaps to 16, the values would be 16 for the JSON file and 0x10 or 10 for the environment variable.

### Affinitize

- Specifies whether to *affinitize* garbage collection threads with processors. To affinitize a GC thread means that it can only run on its specific CPU. A heap is created for each GC thread.
- Applies to server garbage collection only.
- Default: Affinitize garbage collection threads with processors. This is equivalent to setting the value to `false`.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.NoAffinitize` | `false` - affinitize`true` - don't affinitize | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCNoAffinitize` | `0` - affinitize`1` - don't affinitize | .NET 6 |
| **app.config for .NET Framework** | GCNoAffinitize | `false` - affinitize`true` - don't affinitize | .NET Framework 4.6.2 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.NoAffinitize": true
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.NoAffinitize": true
   }
}
```

### Affinitize mask

- Specifies the exact processors that garbage collector threads should use.
- If GC processor affinity is disabled, this setting is ignored.
- Applies to server garbage collection only.
- The value is a bit mask that defines the processors that are available to the process. For example, a decimal value of 1023 (or a hexadecimal value of 0x3FF or 3FF if you're using the environment variable) is 0011 1111 1111 in binary notation. This specifies that the first 10 processors are to be used. To specify the next 10 processors, that is, processors 10-19, specify a decimal value of 1047552 (or a hexadecimal value of 0xFFC00 or FFC00), which is equivalent to a binary value of <example-card-number> 0000.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapAffinitizeMask` | *decimal value* | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCHeapAffinitizeMask` | *hexadecimal value* | .NET 6 |
| **app.config for .NET Framework** | GCHeapAffinitizeMask | *decimal value* | .NET Framework 4.6.2 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.HeapAffinitizeMask": 1023
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.HeapAffinitizeMask": 1023
   }
}
```

### Affinitize ranges

- Specifies the list of processors to use for garbage collector threads.
- This setting is similar to System.GC.HeapAffinitizeMask, except it allows you to specify more than 64 processors.
- For Windows operating systems, prefix the processor number or range with the corresponding CPU group, for example, "0:1-10,0:12,1:50-52,1:7". If you don't actually have more than 1 CPU group, you can't use this setting. You must use the Affinitize mask setting. And the numbers you specify are within that group, which means it cannot be >= 64.
- For Linux operating systems, where the CPU group concept doesn't exist, you can use both this setting and the Affinitize mask setting to specify the same ranges. And instead of "0:1-10", specify "1-10" because you don't need to specify a group index.
- If GC processor affinity is disabled, this setting is ignored.
- Applies to server garbage collection only.
- For more information, see Making CPU configuration better for GC on machines with > 64 CPUs on Maoni Stephens' blog.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapAffinitizeRanges` | Comma-separated list of processor numbers or ranges of processor numbers.Unix example: "1-10,12,50-52,70"Windows example: "0:1-10,0:12,1:50-52,1:7" | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCHeapAffinitizeRanges` | Comma-separated list of processor numbers or ranges of processor numbers.Unix example: "1-10,12,50-52,70"Windows example: "0:1-10,0:12,1:50-52,1:7" | .NET 6 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.HeapAffinitizeRanges": "0:1-10,0:12,1:50-52,1:7"
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.HeapAffinitizeRanges": "0:1-10,0:12,1:50-52,1:7"
   }
}
```

### CPU groups

- Configures whether the garbage collector uses CPU groups or not.

  When a 64-bit Windows computer has multiple CPU groups, that is, there are more than 64 processors, enabling this element extends garbage collection across all CPU groups. The garbage collector uses all cores to create and balance heaps.

  > **Note:**
  > This is a Windows-only concept. In older Windows versions, Windows limited a process to one CPU group. Thus, GC only used one CPU group unless you used this setting to enable multiple CPU groups. This OS limitation was lifted in Windows 11 and Server 2022. Also, starting in .NET 7, GC by default uses all CPU groups when running on Windows 11 or Server 2022.

- Applies to server garbage collection on 64-bit Windows operating systems only.
- Default: GC does not extend across CPU groups. This is equivalent to setting the value to `0`.
- For more information, see Making CPU configuration better for GC on machines with > 64 CPUs on Maoni Stephens' blog.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.CpuGroup` | `false` - disabled`true` - enabled | .NET 5 |
| **Environment variable** | `DOTNET_GCCpuGroup` | `0` - disabled`1` - enabled | .NET 6 |
| **app.config for .NET Framework** | GCCpuGroup | `false` - disabled`true` - enabled |  |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

> **Note:**
> To configure the common language runtime (CLR) to also distribute threads from the thread pool across all CPU groups, enable the Thread_UseAllCpuGroups element option. For .NET Core apps, you can enable this option by setting the value of the `DOTNET_Thread_UseAllCpuGroups` environment variable to `1`.
