---
title: "Garbage collector config settings (part 2 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/garbage-collector.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage collector config settings (part 2 of 5)

## Manage resource usage for all GC flavors

The following settings apply to all flavors of the GC:

- Heap hard limit
- Heap hard limit percent
- Per-object-heap hard limits
- Per-object-heap hard limit percents
- Large pages
- Region range
- Region size
- High memory percent
- Retain VM
- Conserve memory

### Heap hard limit

- The heap hard limit is defined as the maximum commit size, in bytes, for the GC heap and GC bookkeeping.
- This setting only applies to 64-bit computers.
- If running in a memory-constrained environment (e.g., a container) and this value is unset, the default value is either 20 MB or the heap hard limit percent of the container limit, whichever is larger.
- This setting is ignored if the Per-object-heap hard limits are configured.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimit` | *decimal value* | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCHeapHardLimit` | *hexadecimal value* | .NET 6 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.HeapHardLimit": 209715200
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.HeapHardLimit": 209715200
   }
}
```

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to specify a heap hard limit of 200 mebibytes (MiB), the values would be 209715200 for the JSON file and 0xC800000 or C800000 for the environment variable.

### Heap hard limit percent

- Specifies the heap hard limit as a percentage of total physical memory.
- If the process runs inside an environment with a set memory limit (for example, a container), that limit is treated as the total physical memory. In such environments, the default value is 75%.
- This setting only applies to 64-bit computers.
- This setting is ignored if the Per-object-heap hard limits are configured or the heap hard limit is configured.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitPercent` | *decimal value* | .NET Core 3.0 |
| **Environment variable** | `DOTNET_GCHeapHardLimitPercent` | *hexadecimal value* | .NET 6 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Examples

*runtimeconfig.json* file:

```json
{
   "runtimeOptions": {
      "configProperties": {
         "System.GC.HeapHardLimitPercent": 30
      }
   }
}
```

*runtimeconfig.template.json* file:

```json
{
   "configProperties": {
      "System.GC.HeapHardLimitPercent": 30
   }
}
```

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to limit the heap usage to 30%, the values would be 30 for the JSON file and 0x1E or 1E for the environment variable.

### Per-object-heap hard limits

You can specify the GC's heap hard limit on a per-object-heap basis. The different heaps are the large object heap (LOH), small object heap (SOH), and pinned object heap (POH).

- If you specify a value for any of the `DOTNET_GCHeapHardLimitSOH`, `DOTNET_GCHeapHardLimitLOH`, or `DOTNET_GCHeapHardLimitPOH` settings, you must also specify a value for `DOTNET_GCHeapHardLimitSOH` and `DOTNET_GCHeapHardLimitLOH`. If you don't, the runtime will fail to initialize.
- The default value for `DOTNET_GCHeapHardLimitPOH` is 0. `DOTNET_GCHeapHardLimitSOH` and `DOTNET_GCHeapHardLimitLOH` don't have default values.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitSOH` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHeapHardLimitSOH` | *hexadecimal value* | .NET 6 |

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitLOH` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHeapHardLimitLOH` | *hexadecimal value* | .NET 6 |

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitPOH` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHeapHardLimitPOH` | *hexadecimal value* | .NET 6 |

These configuration settings don't have specific MSBuild properties. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to specify a heap hard limit of 200 mebibytes (MiB), the values would be 209715200 for the JSON file and 0xC800000 or C800000 for the environment variable.

### Per-object-heap hard limit percents

You can specify the GC's heap hard limit on a per-object-heap basis. The different heaps are the large object heap (LOH), small object heap (SOH), and pinned object heap (POH).

- If you specify a value for any of the `DOTNET_GCHeapHardLimitSOHPercent`, `DOTNET_GCHeapHardLimitLOHPercent`, or `DOTNET_GCHeapHardLimitPOHPercent` settings, you must also specify a value for `DOTNET_GCHeapHardLimitSOHPercent` and `DOTNET_GCHeapHardLimitLOHPercent`. If you don't, the runtime will fail to initialize.
- These settings are ignored if `DOTNET_GCHeapHardLimitSOH`, `DOTNET_GCHeapHardLimitLOH`, and `DOTNET_GCHeapHardLimitPOH` are specified.
- A value of 1 means that GC uses 1% of total physical memory for that object heap.
- Each value must be greater than zero and less than 100. Additionally, the sum of the three percentage values must be less than 100. Otherwise, the runtime will fail to initialize.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitSOHPercent` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHeapHardLimitSOHPercent` | *hexadecimal value* | .NET 6 |

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitLOHPercent` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHeapHardLimitLOHPercent` | *hexadecimal value* | .NET 6 |

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HeapHardLimitPOHPercent` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHeapHardLimitPOHPercent` | *hexadecimal value* | .NET 6 |

These configuration settings don't have specific MSBuild properties. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to limit the heap usage to 30%, the values would be 30 for the JSON file and 0x1E or 1E for the environment variable.

### Large pages

- Specifies whether large pages should be used when a heap hard limit is set.
- Default: Don't use large pages when a heap hard limit is set. This is equivalent to setting the value to `0`.
- This is an experimental setting.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | N/A | N/A | N/A |
| **Environment variable** | `DOTNET_GCLargePages` | `0` - disabled`1` - enabled | .NET 6 |

### Region range

Starting in .NET 7, the GC heap switched its physical representation from segments to regions for 64-bit Windows and Linux. (For more information, see Maoni Stephens' blog article.) With this change, the GC reserves a range of virtual memory during initialization. Note that this is only reserving memory, not committing (the GC heap size is committed memory). It's merely a range to define the maximum range the GC heap can commit. Most applications don't need to commit nearly this much.

If you don't have any other configurations and aren't running in a memory-constrained environment (which would cause some GC configs to be set), by default 256 GB is reserved. If you have more than 256 GB physical memory available, it will be twice that amount.

If the per heap hard limits are set, the reserve range is the same as the total hard limit. If a single hard limit config is set, this range is five times that amount.

This range is limited by the amount of total virtual memory. Normally on 64-bit this is never a problem, but there could be a virtual memory limit set on a process. This range is limited by half that amount. For example, if you set the `HeapHardLimit` config to 1 GB and have a 4 GB virtual memory limit set on the process, this range is `min (5x1GB, 4GB/2)`, which is 2 GB.

You can use the `System.GC.GetConfigurationVariables` API to see the value of this range under the name `GCRegionRange`. If you do get `E_OUTOFMEMORY` during the runtime initialization and want to see if it's due to reserving this range, look at the `VirtualAlloc` call with `MEM_RESERVE` on Windows, or the `mmap` call with `PROT_NONE` on Linux, during GC initialization and see if the OOM is from that call. If this reserve call is failing, you can change it via the following configuration settings. The recommendation for the reservation amount is two to five times the committed size for your GC heap. If your scenario does not make many large allocations (this could be any allocations on UOH or larger than the UOH region size), twice the committed size should be safe. Otherwise, you might want to make it larger so you don't incur too frequent full-compacting GCs to make space for those larger regions. If you don't know your GC heap's committed size, you can set this to two times the amount of physical memory available to your process.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.RegionRange` | *decimal value* | .NET 10 |
| **Environment variable** | `DOTNET_GCRegionRange` | *hexadecimal value* | .NET 7 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

### Region size

Starting with .NET 7, the GC heap switched its physical representation from segments to regions for 64-bit Windows and Linux. (For more information, see Maoni Stephens' blog article.) By default, each region is 4 MB for SOH. For UOH (LOH and POH), it's eight times the SOH region size. You can use this config to change the SOH region size, and the UOH regions will be adjusted accordingly.

Regions are only allocated when needed, so in general you don't need to worry about the region size. However, there are two cases where you might want to adjust this size:

- For processes that have very small GC heaps, changing the region size to be smaller is beneficial for native memory usage from GC's own bookkeeping. The recommendation is 1 MB.
- On Linux, if you need to reduce the number of memory mappings, you can change the region size to be larger, for example, 32 MB.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.RegionSize` | *decimal value* | .NET 10 |
| **Environment variable** | `DOTNET_GCRegionSize` | *hexadecimal value* | .NET 7 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

### High memory percent

Memory load is indicated by the percentage of physical memory in use. By default, when the physical memory load reaches **90%**, garbage collection becomes more aggressive about doing full, compacting garbage collections to avoid paging. When memory load is below 90%, GC favors background collections for full garbage collections, which have shorter pauses but don't reduce the total heap size by much. On machines with a significant amount of memory (80GB or more), the default load threshold is between 90% and 97%.

The high memory load threshold can be adjusted by the `DOTNET_GCHighMemPercent` environment variable or `System.GC.HighMemoryPercent` JSON configuration setting. Consider adjusting the threshold if you want to control heap size. For example, for the dominant process on a machine with 64GB of memory, it's reasonable for GC to start reacting when there's 10% of memory available. But for smaller processes, for example, a process that only consumes 1GB of memory, GC can comfortably run with less than 10% of memory available. For these smaller processes, consider setting the threshold higher. On the other hand, if you want larger processes to have smaller heap sizes (even when there's plenty of physical memory available), lowering this threshold is an effective way for GC to react sooner to compact the heap down.

> **Note:**
> For processes running in a container, GC considers the physical memory based on the container limit.

| | Setting name | Values | Version introduced |
| - | - | - | - |
| **runtimeconfig.json** | `System.GC.HighMemoryPercent` | *decimal value* | .NET 5 |
| **Environment variable** | `DOTNET_GCHighMemPercent` | *hexadecimal value* | .NET 6 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

> **Tip:**
> If you're setting the option in *runtimeconfig.json*, specify a decimal value. If you're setting the option as an environment variable, specify a hexadecimal value. For example, to set the high memory threshold to 75%, the values would be 75 for the JSON file and 0x4B or 4B for the environment variable.
