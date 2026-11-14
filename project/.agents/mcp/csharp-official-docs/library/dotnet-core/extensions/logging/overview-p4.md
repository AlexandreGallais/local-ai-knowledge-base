---
title: "Logging in C# (part 4 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Logging in C# (part 4 of 4)

## NuGet packages

The `Microsoft.Extensions.Logging.ILogger`1` and `Microsoft.Extensions.Logging.ILoggerFactory` interfaces and implementations are included in most .NET SDKs as implicit package reference. They're also available explicitly in the following NuGet packages when not otherwise implicitly referenced:

- The interfaces are in Microsoft.Extensions.Logging.Abstractions.
- The default implementations are in Microsoft.Extensions.Logging.

For more information about which .NET SDK includes implicit package references, see .NET SDK: table to implicit namespace.

## See also

- Logging providers in .NET
- Implement a custom logging provider in .NET
- Console log formatting
- High-performance logging in .NET
- Logging guidance for .NET library authors
- Logging bugs should be created in the github.com/dotnet/runtime repo
