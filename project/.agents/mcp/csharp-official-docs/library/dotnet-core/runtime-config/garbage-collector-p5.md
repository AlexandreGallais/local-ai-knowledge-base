---
title: "Garbage collector config settings (part 5 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/garbage-collector.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Garbage collector config settings (part 5 of 5)

### Dynamic adaptation to application sizes (DATAS)

#### Enabling or disabling DATAS

- Configures the garbage collector to use DATAS. DATAS adapts to application memory requirements, meaning the app heap size should be roughly proportional to the long-lived data size.
- Enabled by default starting in .NET 9.

|                          | Setting name               | Values    | Version introduced |
|--------------------------|----------------------------|-----------|--------------------|
| **Environment variable** | `DOTNET_GCDynamicAdaptationMode`  | `1` - enabled `0` - disabled | .NET 8 |
| **MSBuild property** | `GarbageCollectionAdaptationMode` | `1` - enabled `0` - disabled | .NET 8 |
| **runtimeconfig.json**   | `System.GC.DynamicAdaptationMode` | `1` - enabled `0` - disabled | .NET 8 |

#### Target TCP

DATAS uses the Throughput Cost Percentage (TCP) as the memory cost measurement on throughput. It takes into consideration both GC pauses and how much allocations have to wait. Usually, GC pauses dominates, so you can use the "% pause time in GC" to approximate this cost. There are two transient cases where the allocation wait time can dominate:

- When a process starts, DATAS always starts with one heap. So if there are enough threads allocating, they experience waits.
- When the workload changes from lighter to heavier, for example, when peak hours start, allocating threads might experience waits during that period of time. That's because it takes a few GCs before the number of heaps gets increased.

DATAS uses 2% as the default TCP, which you can adjust with this setting. It's an integer that is interpreted as a percentage, for example, 5 means the target TCP will be 5%.

|                          | Setting name               | Values    | Version introduced |
|--------------------------|----------------------------|-----------|--------------------|
| **runtimeconfig.json** | `System.GC.DTargetTCP` | *decimal value* | .NET 9 |
| **Environment variable** | `DOTNET_GCDTargetTCP` | *hexadecimal value* | .NET 9 |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

#### Gen0 max budget settings

Adjusting the gen0 budget is one of the key <example-value> DATAS uses to adapt to application sizes. DATAS defines an upper threshold called the BCD (Budget Computed via DATAS) for the total gen0 budget as a function of the application size. The formula to calculate a multiplier is as follows:

$$
f(\text{application\_size\_in\_MB}) = \frac{20 - \text{conserve\_memory}}{\sqrt{\text{application\_size\_in\_MB}}}
$$

The formula is then clamped by a maximum and minimum value before it's applied to the application size in MB. If the conserve memory setting isn't specified, DATAS uses 5 by default. The maximum and minimum value default to 10 and 0.1, respectively.

For example, if the application size is 1 GB, the formula calculates `(20 - 5) / sqrt (1000) = 0.474`. Since it's between 10 and 0.1, clamping has no effect. This means the total gen0 budget is 47.4% of 1 GB which is 474 MB. If the application size is 1 MB, the formula would calculate 15 which would then be adjusted to 10, meaning the total gen0 budget allowed is 10 MB.

Three settings are provided to adjust what the formula calculates and modify the clamping values:

- The percent that will be applied to what `f` calculates.

  |                          | Setting name               | Values    | Version introduced |
  |--------------------------|----------------------------|-----------|--------------------|
  | **runtimeconfig.json** | `System.GC.DGen0GrowthPercent` | *decimal value* | .NET 10 |
  | **Environment variable** | `DOTNET_GCDGen0GrowthPercent` | *hexadecimal value* | .NET 10 |

  This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

  So if `f` calculates 0.474 and this setting is 200, the multiplier becomes `0.474 * 200% = 0.948` before the clamping is applied.

- The maximum clamping value in permil.

  |                          | Setting name               | Values    | Version introduced |
  |--------------------------|----------------------------|-----------|--------------------|
  | **runtimeconfig.json** | `System.GC.DGen0GrowthMaxFactor` | *decimal value* | .NET 10 |
  | **Environment variable** | `DOTNET_GCDGen0GrowthMaxFactor` | *hexadecimal value* | .NET 10 |

  This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

  If this value is 20000, it means the maximum clamping value is `20000 * 0.001 = 20`.

- The minimum clamping value in permil.

  |                          | Setting name               | Values    | Version introduced |
  |--------------------------|----------------------------|-----------|--------------------|
  | **runtimeconfig.json** | `System.GC.DGen0GrowthMinFactor` | *decimal value* | .NET 10 |
  | **Environment variable** | `DOTNET_GCDGen0GrowthMinFactor` | *hexadecimal value* | .NET 10 |

  This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

  If this value is 200, the minimum clamping value is `200 * 0.001 = 0.2`.
