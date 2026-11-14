---
title: "Breaking change: Version requirements for .NET 7 SDK"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/7.0/vs-msbuild-version.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Version requirements for .NET 7 SDK

Certain .NET SDK versions require newer versions of Visual Studio and MSBuild.

## Version introduced

.NET SDK 7

## Change description

The following table shows the minimum version of Visual Studio and MSBuild you need to use the .NET 7.0.100 or 7.0.200 SDK.

| NET SDK version   | Minimum Visual Studio and MSBuild version |
| ----------------- | ----------------------------------------- |
| 7.0.100           | 17.4                                      |
| 7.0.200           | 17.4                                      |

For more information about minimum supported versions, see Targeting and support rules.

## Reason for change

Changes were made to features within the SDK that aren't compatible with previous Visual Studio versions. In addition, it enables .NET SDK partners to have a reliable minimum version of Visual Studio that they can expect to work against.

## Recommended action

Upgrade your Visual Studio version to the required version. Alternatively, you can use a global.json file to pin to an older standalone SDK install.

## Affected APIs

N/A

## See also

- Targeting and support rules
