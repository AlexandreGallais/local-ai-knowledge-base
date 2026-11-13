---
title: "Breaking change - project.json is no longer supported in dotnet restore"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/10.0/dotnet-restore-project-json-unsupported.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# project.json no longer supported in dotnet restore

Starting with .NET 10, the `dotnet restore` command no longer supports `project.json` based projects. Such projects are ignored during the restore operation.

## Version introduced

.NET 10

## Previous behavior

Previously, the `dotnet restore` command restored dependencies for `project.json` based projects.

## New behavior

The `dotnet restore` command ignores `project.json` based projects and no longer restores their dependencies.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

The `project.json` format was originally available only in .NET Core previews (through Preview 2 of .NET Core 1.0) and was completely replaced by PackageReference in 2017. The format has been marked as deprecated since 2017.

When the `project.json` format was replaced, users migrated these projects using the `dotnet migrate` command, but that command was removed from the CLI in the .NET Core 3.0 SDK.

The removal of `project.json` support completes this transition and allows the .NET team to focus on delivering a better experience for PackageReference-based projects.

## Recommended action

Migrate your `project.json` projects to use PackageReference format instead.

If you have .NET Core based `project.json` projects, you can use older versions of the .NET SDK that still include the `dotnet migrate` command to convert them to the modern project format.

For more information about migrating from `project.json`, see Migrating from project.json to .csproj.

## Affected APIs

None.
