---
title: "Breaking change: Unlisted packages not installed by default for .NET tools"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/sdk/8.0/unlisted-versions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Unlisted packages not installed by default for .NET tools

The dotnet tool install commands no longer install tools from unlisted versions of NuGet packages by default. You can still force the install by specifying the unlisted version as an exact version surrounded with brackets, for example `--version [5.0.0]`.

## Previous behavior

Previously, when you installed a .NET tool, the .NET SDK installed tools (and versions of tools) without considering whether the tool package was unlisted.

## New behavior

Starting in .NET 8, unlisted tool versions aren't installed unless you specify the exact version using the `--version` option and brackets around the version number. For example, `--version [5.0.0]`.

## Version introduced

.NET 8 GA

## Type of breaking change

This change is a behavioral change.

## Reason for change

The correct default behavior is to ignore unlisted packages when installing tools. Unlisted versions are purposefully hidden from search on NuGet.org.

## Recommended action

To install an unlisted tool, specify the exact version of the tool surrounded with brackets, for example `--version [5.0.0]`.
