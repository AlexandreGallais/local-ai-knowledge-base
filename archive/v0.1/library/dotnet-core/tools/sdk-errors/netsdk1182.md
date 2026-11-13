---
title: "NETSDK1182: Targeting .NET 6.0 or higher in Visual Studio 2019 is not supported."
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1182.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1182: Targeting .NET 6.0 or higher in Visual Studio 2019 is not supported

NETSDK1182 indicates that you're trying to open a .NET 6+ project in Visual Studio 2019. Or you might be trying to build from the command line using MSBuild from Visual Studio 2019. The full error message is similar to the following example:

> Targeting .NET 6.0 or higher in Visual Studio 2019 is not supported.

To resolve this error, switch to Visual Studio 2022 or later, or change your project to target .NET 5 or earlier.

## See also

* Overview of .NET, MSBuild, and Visual Studio versioning
