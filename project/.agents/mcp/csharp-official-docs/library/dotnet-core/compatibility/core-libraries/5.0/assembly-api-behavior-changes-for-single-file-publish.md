---
title: "Breaking change: Assembly-related API behavior changes for single-file publishing format"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/assembly-api-behavior-changes-for-single-file-publish.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Assembly-related API behavior changes for single-file publishing format

Multiple APIs related to an assembly's file location have behavior changes when they're invoked in a single-file publishing format.

## Change description

In single-file publishing for .NET 5 and later versions, bundled assemblies are loaded from memory instead of extracted to disk. For single-file published apps, this means that certain location-related APIs return different values on .NET 5 and later than on previous versions of .NET. The changes are as follows:

| API | Previous versions | .NET 5 and later |
| - | - | - |
| `System.Reflection.Assembly.Location` | Returns extracted DLL file path | Returns empty string for bundled assemblies |
| `System.Reflection.Assembly.CodeBase` | Returns extracted DLL file path | Throws exception for bundled assemblies |
| `System.Reflection.Assembly.GetFile(System.String)` | Returns `null` for bundled assemblies | Throws exception for bundled assemblies |
| `Environment.GetCommandLineArgs()[0]` | Value is the name of the entry point DLL | In .NET 5 through .NET 10, value is the name of the host executable. Starting in .NET 11, the value preserves the invocation name supplied to the apphost. |
| `System.AppContext.BaseDirectory` | Value is the temporary extraction directory | Value is the containing directory of the host executable |

## Version introduced

5.0

## Recommended action

Avoid dependencies on the file location of assemblies when publishing as a single file.

## Affected APIs

- `System.Reflection.Assembly.Location`
- `System.Reflection.Assembly.CodeBase`
- `System.Reflection.Assembly.GetFile(System.String)`
- `System.Environment.GetCommandLineArgs`
- `System.AppContext.BaseDirectory`
