---
title: "Breaking change: OSPlatform attributes renamed or removed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/5.0/os-platform-attributes-renamed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# OSPlatform attributes renamed or removed

The following attributes that were introduced in .NET 5 Preview 8 have been removed or renamed: `MinimumOSPlatformAttribute`, `RemovedInOSPlatformAttribute`, and `ObsoletedInOSPlatformAttribute`.

## Change description

.NET 5 Preview 8 introduced the following attributes in the `System.Runtime.Versioning` namespace:

- `MinimumOSPlatformAttribute`
- `RemovedInOSPlatformAttribute`
- `ObsoletedInOSPlatformAttribute`

In .NET 5 Preview 8, when a project targets an OS-specific flavor of .NET 5 by using a target framework moniker such as `net5.0-windows`, the build adds an assembly-level `System.Runtime.Versioning.MinimumOSPlatformAttribute` attribute.

In .NET 5 RC1, the `ObsoletedInOSPlatformAttribute` has been removed, and `MinimumOSPlatformAttribute` and `RemovedInOSPlatformAttribute` have been renamed as follows:

| Preview 8 name | RC1 and later name |
| - | - |
| `MinimumOSPlatformAttribute` | `System.Runtime.Versioning.SupportedOSPlatformAttribute` |
| `RemovedInOSPlatformAttribute` | `System.Runtime.Versioning.UnsupportedOSPlatformAttribute` |

In .NET 5 RC1 and later, when a project targets an OS-specific flavor of .NET 5 by using a target framework moniker such as `net5.0-windows`, the build adds an assembly-level `System.Runtime.Versioning.SupportedOSPlatformAttribute` attribute.

## Reason for change

.NET 5 Preview 8 introduced attributes in `System.Runtime.Versioning` to specify supported platforms for APIs. The attributes are consumed by the Platform compatibility analyzer to produce build warnings when platform-specific APIs are consumed on platforms that don't support those APIs.

For .NET 5 RC1, an additional feature was added to the platform compatibility analyzer for platform exclusion. The feature allows APIs to be marked as entirely unsupported on OS platforms. That feature prompted changes to the attributes, including using more suitable names. The `ObsoletedInOSPlatformAttribute` was removed because it was no longer needed.

## Version introduced

5.0 RC1

## Recommended action

When you retarget your project from .NET 5 Preview 8 to .NET 5 RC1, you might encounter build or runtime errors due to these changes. For example, the renaming of `MinimumOSPlatformAttribute` is likely to produce errors, because the attribute is applied to platform-specific assemblies at build time, and old build artifacts will still reference the old API name.

Example build-time errors:

- **error CS0246: The type or namespace name 'MinimumOSPlatformAttribute' could not be found (are you missing a using directive or an assembly reference?)**
- **error CS0246: The type or namespace name 'RemovedInOSPlatformAttribute' could not be found (are you missing a using directive or an assembly reference?)**
- **error CS0246: The type or namespace name 'ObsoletedInOSPlatformAttribute' could not be found (are you missing a using directive or an assembly reference?)**

Example runtime error:

**Unhandled exception. System.TypeLoadException: Could not load type 'System.Runtime.Versioning.MinimumOSPlatformAttribute' from assembly 'System.Runtime, Version=5.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'.**

To resolve these errors:

- Update any references of `MinimumOSPlatformAttribute` to `System.Runtime.Versioning.SupportedOSPlatformAttribute`.
- Update any references of `RemovedInOSPlatformAttribute` to `System.Runtime.Versioning.UnsupportedOSPlatformAttribute`.
- Remove any references to `ObsoletedInOSPlatformAttribute`.
- Rebuild your project (or perform clean + build) to delete old build artifacts.

## Affected APIs

- `System.Runtime.Versioning.MinimumOSPlatformAttribute`
- `System.Runtime.Versioning.ObsoletedInOSPlatformAttribute`
- `System.Runtime.Versioning.RemovedInOSPlatformAttribute`
