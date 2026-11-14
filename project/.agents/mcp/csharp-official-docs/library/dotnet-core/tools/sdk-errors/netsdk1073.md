---
title: "NETSDK1073: The FrameworkReference was not recognized"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1073.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1073: The FrameworkReference was not recognized

**This article applies to:** ✔️ .NET Core 2.1.100 SDK and later versions

This error typically means there is a version of a particular shared framework reference that the SDK cannot find. Try deleting your *obj* and *bin* folders and running `dotnet restore` to redownload the latest targeting packs.

Alternatively, there could be an issue with your install, so ensure you're on the latest versions of .NET and Visual Studio
