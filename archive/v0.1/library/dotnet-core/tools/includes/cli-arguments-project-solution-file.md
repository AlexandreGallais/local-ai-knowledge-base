---
title: "cli-arguments-project-solution-file"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/includes/cli-arguments-project-solution-file.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# cli-arguments-project-solution-file

`PROJECT | SOLUTION | FILE`

The project or solution or C# (file-based app) file to operate on. If a file isn't specified, MSBuild searches the current directory for a project or solution.

- `PROJECT` is the path and filename of a C#, F#, or Visual Basic <example-value> file, or the path to a directory that contains a C#, F#, or Visual Basic <example-value> file.

- `SOLUTION` is the path and filename of a solution file (*.sln* or *.slnx* extension), or the path to a directory that contains a solution file.

- `FILE` is an argument added in .NET 10. The path and filename of a file-based app. File-based apps are contained within a single file that is built and run without a corresponding project (*.csproj*) file. For more information, see Build file-based C# apps.
