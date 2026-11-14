---
title: "BuildCheck rule list"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/buildcheck-rules/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# BuildCheck rule list

**This article applies to:** ✔️ .NET 9 SDK and later versions

The following list includes all build-check warnings that you might get from the .NET SDK.

| Rule                |  Default Severity | Message                                                                             |
|---------------------|-------------------|-------------------------------------------------------------------------------------|
| BC0101 | Warning | Two projects should not share their OutputPath or IntermediateOutputPath locations. |
| BC0102 | Warning | Two tasks should not write the same file. |
| BC0103 | Suggestion | Environment variables should not be used as a value source for the properties. |
| BC0201 | Warning | A property that is accessed should be declared first. |
| BC0202 | Warning | A property should be declared before it is first used. |
| BC0203 | None | A property that is not used should not be declared. |
