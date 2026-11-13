---
title: ".NET 8 breaking change: RuntimeIdentifier returns platform for which the runtime was built"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/runtimeidentifier.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# RuntimeIdentifier returns platform for which the runtime was built

`System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier` returns the platform for which the runtime was built, rather than a value computed at runtime.

## Previous behavior

The value was a runtime identifier (RID) computed via OS files or APIs. This generally meant it was a version-specific and distro-specific RID. For example, when running an application on Windows 11, the value was `win10-x64` or, on Ubuntu 20.04, it could be `ubuntu.20.04-x64`.

## New behavior

Starting in .NET 8, the value is the RID for which the runtime was built. This means that for portable builds of the runtime (all Microsoft-provided builds), the value is non-version-specific and non-distro-specific. For example, the value on Windows 11 is `win-x64`, and on Ubuntu 20.04, it's `linux-x64`. For non-portable builds (source-build), the build sets a build RID that can have a version and distro, and that value is the RID that's returned.

## Version introduced

.NET 8 RC 1

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change is in line with a .NET 8 change to RID-specific asset resolution and the move away from a distro-aware runtime. `System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier` is an opaque value that should represent the platform on which the host or runtime considers itself to be running. In .NET 8, that corresponds to the platform for which the host or runtime is built, rather than an RID computed at runtime.

## Recommended action

`System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier` is an opaque value and not intended to be parsed into its component parts. For the OS version of the actual machine an application is running on, use `System.Environment.OSVersion`. For a description, use `System.Runtime.InteropServices.RuntimeInformation.OSDescription`. For a specific ID (distro) and corresponding version on Linux, you can read the os-release file.

## Affected APIs

- `System.Runtime.InteropServices.RuntimeInformation.RuntimeIdentifier`

## See also

- .NET SDK uses a smaller RID graph
- Host determines RID-specific assets
