---
title: "Breaking change: RuntimeInformation.OSArchitecture under emulation"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/interop/7.0/osarchitecture-emulation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# RuntimeInformation.OSArchitecture under emulation

`System.Runtime.InteropServices.RuntimeInformation.OSArchitecture` now returns the correct value under emulation.

## Previous behavior

Previously, `System.Runtime.InteropServices.RuntimeInformation.OSArchitecture` returned `System.Runtime.InteropServices.Architecture.X64` in emulated processes on Windows Arm 64-bit and macOS Apple Silicon systems.

## New behavior

Starting in .NET 7, `System.Runtime.InteropServices.RuntimeInformation.OSArchitecture` returns `System.Runtime.InteropServices.Architecture.Arm64` in emulated processes on Windows Arm 64-bit and macOS Apple Silicon systems.

## Version introduced

7 Preview 6

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The previous behavior was incorrect.

## Recommended action

Code that expects the process architecture should be changed to call `System.Runtime.InteropServices.RuntimeInformation.ProcessArchitecture` instead.

## Affected APIs

- `System.Runtime.InteropServices.RuntimeInformation.OSArchitecture`
