---
title: "Breaking change - `dotnet new sln` defaults to SLNX file format"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/dotnet-new-sln-slnx-default.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# `dotnet new sln` defaults to SLNX file format

In .NET 10, `dotnet new sln` generates an SLNX-format solution file instead of an SLN-formatted solution file.

## Version introduced

.NET 10

## Previous behavior

Previously, `dotnet new sln` created a SLN-format solution file similar to:

```sln
# Visual Studio Version 17
VisualStudioVersion = 17.0.31903.59
MinimumVisualStudioVersion = 10.0.40219.1
Global
        GlobalSection(SolutionConfigurationPlatforms) = preSolution
                Debug|Any CPU = Debug|Any CPU
                Release|Any CPU = Release|Any CPU
        EndGlobalSection
        GlobalSection(SolutionProperties) = preSolution
                HideSolutionNode = FALSE
        EndGlobalSection
EndGlobal
```

## New behavior

Starting in .NET 10, `dotnet new sln` creates a SLNX-format solution file similar to:

```xml
<Solution>
</Solution>
```

## Type of breaking change

This change is a behavioral change.

## Reason for change

The .NET SDK added support for SLNX files in version 9.0.200, and it's proven to be a stable, understandable format for developers. It's well-supported by all major .NET tooling and is much easier for developers to maintain. This breaking change aims to encourage the use of the SLNX format.

## Recommended action

If you desire an SLN-formatted solution file, pass the `--format sln` option to the command:

`dotnet new sln --format sln`

## Affected APIs

None.

## See also

- .NET default templates for dotnet new
