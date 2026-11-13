---
title: "Unit testing using MSTest sample"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/snippets/unit-testing-using-mstest/csharp/README.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unit testing using MSTest sample

This sample is part of the unit testing tutorial for creating applications with unit tests included. See that topic for detailed steps on the code for this sample.

## Key <example-value>

This sample demonstrates creating a library and writing effective unit tests that validate the features in that library. The example provides a service that indicates whether a number is prime.

## Restore and test

To run the tests, navigate to the *PrimeService.Tests* directory and type the following commands:

```dotnetcli
dotnet restore
dotnet test
```

`dotnet restore` restores the packages of both projects.

`dotnet test` builds both projects and runs all of the configured tests.

**Note:** Starting with .NET Core 2.0 SDK, you don't have to run `dotnet restore` because it's run implicitly by all commands that require a restore to occur, such as `dotnet new`, `dotnet build` and `dotnet run`.
It's still a valid command in certain scenarios where doing an explicit restore makes sense, such as continuous integration builds in Azure DevOps Services or in build systems that need to explicitly control the time at which the restore occurs.
