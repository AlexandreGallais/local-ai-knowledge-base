---
title: "C# LINQ Sample"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/tutorials/snippets/console-linq/README.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# LINQ Sample

This sample is created during the Working with LINQ tutorial for learning C# features. Please see that topic for detailed steps on the code for this sample.

## Key <example-value>

This sample demonstrates querying data sources and processing them using Language Integrated Query (LINQ) in C#.

## Build and Run

To build and run the sample, type the following two commands:

```dotnetcli
dotnet restore
dotnet run
```

`dotnet restore` restores the dependencies for this sample.

`dotnet run` builds the sample and runs the output assembly.

**Note:** Starting with .NET Core 2.0 SDK, you don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build` and `dotnet run`.
It's still a valid command in certain scenarios where doing an explicit restore makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control the time at which the restore occurs.
