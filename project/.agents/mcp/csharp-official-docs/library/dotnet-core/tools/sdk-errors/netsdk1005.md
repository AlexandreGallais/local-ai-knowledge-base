---
title: "NETSDK1005 and NETSDK1047: Asset file is missing target"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1005.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1005 and NETSDK1047: Asset file is missing target

**This article applies to:** ✔️ .NET Core 2.1.100 SDK and later versions

When the .NET SDK issues error NETSDK1005 or NETSDK1047, the project's assets file is missing information on one of your target frameworks. NuGet writes a file named *project.assets.json* in the *obj* folder, and the .NET SDK uses it to get information about packages to pass into the compiler. In .NET 5, NuGet added a new field named `TargetFrameworkAlias`, so earlier versions of MSBuild or NuGet generate an assets file without the new field. For more information, see error NETSDK1005.

Here are some actions you can take that may resolve the error:

* Make sure that you're using MSBuild version 16.8 or later and NuGet version 5.8 or later, and restore the project (run `dotnet restore`) after updating your tools. When you're using NuGet version 5.8 or later, you should be using Visual Studio 2019 version 16.8 or later, MSBuild version 16.8 or later, and .NET 5 SDK or later.

* If you get the error while building a project in Visual Studio 2019 for the first time after installing version 16.8 or after changing the project's target framework, build the project a second time.

* Delete the *obj* folder before building the project.

* Make sure that the missing target value is included in the `TargetFrameworks` property of your project.

* If you're building a Docker image, make sure the *.dockerignore* file ignores the *bin* and *obj* directories. For more information, see GitHub pull request dotnet/docs #29530.

* If you're trying to run a Maui App on an Android Simulator, open the Android SDKs and Tools, and add the missing platforms under both the Platforms and the Tools tab.
