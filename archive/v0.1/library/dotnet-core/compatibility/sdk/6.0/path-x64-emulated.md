---
title: "Breaking change: Install location for x64 emulated on Arm64"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/6.0/path-x64-emulated.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Install location for x64 emulated on Arm64

We've moved the install location of the x64 version of the .NET SDK and runtime on Arm64 hardware.

Previously, the x64 and Arm64 versions installed to the same location, leading to a broken state. In addition, the `PATH` environment variable value was being set for both installations, so depending on install order, you might have an unexpected version of the `dotnet` command used by default.

## Version introduced

.NET 6 RC 2

## Previous behavior

In previous versions, both the Arm64 and x64 versions of .NET SDK and runtime installed to the same location on Arm64 hardware:

- macOS: */usr/local/share/dotnet*
- Windows: *%ProgramFiles%\dotnet*

This worked if only one version was installed, but was completely broken if both were installed.

## New behavior

In .NET 6, the x64 version of .NET installs to a subfolder named *x64* on Arm64 hardware:

- macOS: */usr/local/share/dotnet/x64*
- Windows: *%ProgramFiles%\dotnet\x64*

For more information, see Install location.

## Change category

This change might affect *source compatibility*.

## Reason for change

Without this change, the x64 and Arm64 versions of the .NET SDK and .NET runtime install to the same location on Arm64 hardware. This leads to being in a completely broken state. This change allows customers to develop for both x64 and Arm64 at the same time.

## Recommended action

If you need to use the x64 version of the `dotnet` command, manually add that file path to the `PATH` environment variable.

## Affected APIs

N/A

## See also

- x64 emulation model
