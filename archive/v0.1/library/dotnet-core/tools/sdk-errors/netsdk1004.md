---
title: "NETSDK1004: Assets file not found"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1004.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1004: Assets file not found

**This article applies to:** ✔️ .NET Core 2.1.100 SDK and later versions

NuGet writes a file named *project.assets.json* in the *obj* folder, and the .NET SDK uses it to get information about packages to pass into the compiler. This error occurs when the assets file *project.assets.json* is not found during build. The full error message is similar to the following example:

**NETSDK1004: Assets file 'C:\path\to\project.assets.json' not found. Run a NuGet package restore to generate this file.**

Here are some possible causes of the error:

* You are running the `dotnet build` command from a directory path that contains a `%` character. To resolve the error, remove the `%` from the folder name, and rerun `dotnet build`.
* A change to the project file wasn't automatically detected and restored by the project system. To resolve the error, open a command prompt and run `dotnet restore` on the project.
* A project was restored separately by an older version of Nuget.exe. To resolve the error, open a command prompt and run `dotnet restore` on the project.
* An earlier error, such as NETSDK1045 (the version of the SDK you're using doesn't support the project's target framework), prevented NuGet from creating the project assets file. To resolve the NETSDK1004 error, resolve the earlier error, and then run `dotnet restore` on the project.
* App Center CI is building a project that has an external assembly that is not in NuGet. To resolve the error, use a NuGet package for the assembly.
* You added a solution folder in Visual Studio with a name that starts with a period. To resolve the error, remove the leading period from the folder name.
* You have a source in the `<packageSources>` section in the *NuGet.Config* file with a path that doesn't exist. To resolve the error, edit the *NuGet.Config* file to correct the package source path.
