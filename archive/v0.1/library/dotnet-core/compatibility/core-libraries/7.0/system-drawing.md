---
title: "Breaking change: System.Drawing.Common config switch removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/system-drawing.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.Drawing.Common config switch removed

The System.Drawing.Common NuGet package has been attributed as a Windows-specific library since .NET 6 and using it resulted in compile-time warnings and runtime exceptions. The runtime configuration switch to re-enable usage of the package on non-Windows operating systems has been removed in .NET 7.

## Old behavior

Prior to .NET 6, using the System.Drawing.Common package did not produce any compile-time warnings, and no runtime exceptions were thrown. In .NET 6, you could set the `System.Drawing.EnableUnixSupport` runtime configuration setting to re-enable non-Windows support.

## New behavior

Starting in .NET 7, the `System.Drawing.EnableUnixSupport` switch has been removed and you can no longer use the System.Drawing.Common package on non-Windows operating systems.

## Version introduced

.NET 7

## Type of breaking change

This change is a behavioral change.

## Reason for change

The switch to re-enable functionality on non-Windows operating systems was added in .NET 6 to give customers time to migrate to an alternative, modern library. Now that .NET 7 has been released, the switch has been removed. For more information, see Reason for change (.NET 6 breaking change).

## Recommended action

To use these APIs for cross-platform apps, migrate to an alternative library, such as one of the following:

- SkiaSharp
- ImageSharp (tiered license)
- Aspose.Drawing (commercial license)
- Microsoft.Maui.Graphics

## Affected APIs

See Affected APIs (.NET 6 breaking change).

## See also

- System.Drawing.Common only supported on Windows (.NET 6)
- `System.Drawing.Common` only supported on Windows - dotnet/designs
