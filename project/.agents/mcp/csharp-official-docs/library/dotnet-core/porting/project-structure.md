---
title: "Organize projects for .NET Framework and .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/porting/project-structure.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Organize your project to support both .NET Framework and .NET

You can create a solution that compiles for both .NET Framework and .NET side by side. This article covers several project-organization options to help you achieve this goal. Here are some typical scenarios to consider when you're deciding how to set up your project layout with .NET. The list may not cover everything you want.

- Combine existing projects and .NET projects into a single project

  **Benefits**:

  - Simplifies your build process by compiling a single project rather than multiple projects that each target a different .NET Framework version or platform.
  - Simplifies source file management for multi-targeted projects because you must manage a single project file. When adding or removing source files, the alternatives require you to manually sync these files with your other projects.
  - Easily generate a NuGet package for consumption.
  - Allows you to write code for a specific .NET Framework version by using compiler directives.

  **Drawback**:

  - Requires developers to use Visual Studio 2019 or a later version to open existing projects. To support older versions of Visual Studio, keeping your project files in different folders is a better option.

- Keep all projects separate

  **Benefits**:

  - Supports development on existing projects for developers and contributors who may not have Visual Studio 2019 or a later version.
  - Lowers the possibility of creating new bugs in existing projects because no code churn is required in those projects.

Consider this example GitHub repository. The figure below shows how this repository is laid out:

The following sections describe several ways to add support for .NET based on the example repository.

## Replace existing projects with a multi-targeted .NET project

Reorganize the repository so that any existing *\*.csproj* files are removed and a single *\*.csproj* file is created that targets multiple frameworks. This is a great option, because a single project can compile for different frameworks. It also has the power to handle different compilation options and dependencies per targeted framework.

For example code, see GitHub.

Changes to note are:

- Replacement of *packages.config* and *\*.csproj* with a new .NET *\*.csproj*. NuGet packages are specified with `<PackageReference> ItemGroup`.

## Keep existing projects and create a .NET project

If there are existing projects that target older frameworks, you may want to leave these projects untouched and use a .NET project to target future frameworks.

For example code, see GitHub.

The .NET and existing projects are kept in separate folders. Keeping projects in separate folders avoids forcing you to have Visual Studio 2019 or later versions. You can create a separate solution that only opens the old projects.

## See also

- .NET porting documentation
