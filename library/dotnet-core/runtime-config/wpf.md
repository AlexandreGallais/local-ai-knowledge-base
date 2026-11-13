---
title: "WPF config settings"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/runtime-config/wpf.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Runtime configuration options for WPF

This article details the settings you can use to configure Windows Presentation Framework (WPF) in .NET.

## Hardware acceleration in RDP

- Configures whether hardware acceleration is used for WPF apps that are accessed through Remote Desktop Protocol (RDP). Hardware acceleration refers to the use of a computer's graphics processing unit (GPU) to speed up the rendering of graphics and visual effects in an application. This can result in improved performance and more seamless, responsive graphics.
- If you omit this setting, graphics are rendered by software instead. This is equivalent to setting the value to `false`.

| Setting type | Setting name | Values | Version introduced |
|--------------|--------------|--------|--------------------|
| **runtimeconfig.json** | `Switch.System.Windows.Media.EnableHardwareAccelerationInRdp` | `true` - enabled`false` - disabled | .NET 8 |
| **Environment variable** | N/A | | |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.
