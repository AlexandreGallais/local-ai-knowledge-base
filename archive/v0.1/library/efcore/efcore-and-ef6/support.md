---
title: "Entity Framework Support Policies"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7/entity-framework/efcore-and-ef6/support.md"
commit: "5fa9f7b63ae7ff93d631f4ddc47fdc9f72dcbdc7"
license: "CC-BY-4.0"
---

# Entity Framework Support Policies

Entity Framework was first released in 2008 as part of the .NET Framework. Since then it has gone through several evolutions:

- The first version of Entity Framework and Entity Framework 4 are fully contained in the .NET Framework
- Entity Framework 4.1, 4.2, 4.3, and 5.0 have some code in the .NET Framework, and some code shipped as NuGet packages
- Entity Framework 6.0, 6.1, 6.2, 6.3, 6.4, and 6.5 are shipped entirely as NuGet packages
- Entity Framework Core (all versions) is an entirely separate codebase and ships as NuGet packages

Support policies for each of these variations is described in this document. In all cases, the support policy applies to the latest patch of the given versions.

## Entity Framework Core

New versions of Entity Framework Core are shipped at the same time as new .NET versions. The Entity Framework Core support policy aligns with the .NET support policy. See current and planned releases for more information.

Entity Framework Core is the only actively developed version of Entity Framework and we recommend using it for all new code.

## Entity Framework 6.0, 6.1, 6.2, 6.3, 6.4, and 6.5

Entity Framework 6.x follows the Modern Lifecycle Policy. This means that only the latest patch of the latest released version is supported. At this time the latest version is 6.5. This version can always be found on NuGet.
Versions 6.0, 6.1, 6.2, 6.3, and 6.4 are no longer supported.

Although Entity Framework 6.x is still supported, it is no longer being developed and will only receive fixes for security issues. The Entity Framework 6.x codebase is very stable, and it is a priority to preserve this stability by not making any unnecessary changes to the code. It is strongly encouraged that new applications and existing applications that are in active development use Entity Framework Core.

Microsoft will provide a minimum of 12 months notification prior to ending support for Entity Framework 6. There are currently no plans to end support.

## Entity Framework 4.1, 4.2, 4.3, and 5.0

> **Warning:**
> Entity Framework 4.1, 4.2, 4.3, and 5.0 and all patches of these versions are out-of-support and should not be used.
The NuGet packages for Entity Framework 4.1, 4.2, 4.3, and 5.0 are no longer supported. Applications using these versions should be updated to use Entity Framework 6, or ported to use Entity Framework Core.

Some of the code for Entity Framework 4.x and 5.0 is contained in the .NET Framework. As such, this code is supported as long as .NET Framework is supported. However, note that this code is intended to be used in conjunction with the NuGet packages for these Entity Framework versions. The .NET Framework code should not be used independently.

## Entity Framework 1 and 4

> **Warning:**
> Entity Framework 1 and 4 are considered legacy and should not be used.
The first version of Entity Framework and Entity Framework 4 are fully contained in the .NET Framework. As such, these versions contained in the .NET Framework are supported as a part of the .NET Framework as long as .NET Framework is supported. However, only security bugs will be fixed. These versions are legacy code and should not be used.

Applications using these versions should be updated to use Entity Framework 6, or ported to use Entity Framework Core.
