---
title: "Breaking change: DirectoryServices package no longer references System.Security.Permissions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/extensions/8.0/directoryservices-package.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# DirectoryServices package no longer references System.Security.Permissions

The `System.DirectoryServices` package no longer references the `System.Security.Permissions` package.

## Version introduced

.NET 8 Preview 3

## Previous behavior

The `System.DirectoryServices` package referenced the `System.Security.Permissions` package.

## New behavior

Starting in .NET 8, the `System.DirectoryServices` package *does not* reference the `System.Security.Permissions` package.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change avoids a dependency on `System.Drawing.Common` when `System.DirectoryServices` is referenced, which is primarily an issue for non-Windows operating systems.

The dependency on `System.Drawing.Common` was caused by the following package dependencies:

```txt
System.DirectoryServices
 └──System.Security.Permissions
      └──System.Windows.Extensions
           └──System.Drawing.Common
```

## Recommended action

If your app references the `System.DirectoryServices` package and you also have a dependency on `System.Security.Permissions` or any of its dependencies, which might include `System.Windows.Extensions` or `System.Drawing.Common`, you'll need to reference those packages either directly or indirectly.

## Affected APIs

N/A
