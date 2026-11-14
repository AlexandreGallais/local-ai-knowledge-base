---
title: "Breaking change: .NET can't be installed to custom location"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/6.0/install-location.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET can't be installed to custom location

You can no longer change the installation path of .NET with the Windows Installer package. To install .NET to a different path, use the dotnet-install scripts.

## Version introduced

.NET 6

## Old behavior

Previously, you could set `DOTNET_HOME` prior to running the Windows MSI installer to install to a location other than *Program Files\dotnet*.

## New behavior

Starting in .NET 6, `DOTNET_HOME` is ignored and the SDK and runtime will always install under *Program Files\dotnet* on Windows. This impacts all .NET installers, including all three runtimes, the hosting bundle, and the SDK installer. It also impacts all architectures, even though the driver of the change was ARM64 support.

## Reason for change

To support SxS architecture installs on ARM64, the x64 version of dotnet must be installed to a location known to the ARM64 dotnet. This means that the native architecture version of dotnet goes in *Program Files\dotnet*. And on ARM64, the x64 version is installed to *Program Files\dotnet\x64*, so it can be found when multiple platforms are targeted.

## Recommended action

To install to a custom location, use install scripts instead.

## Affected APIs

N/A
