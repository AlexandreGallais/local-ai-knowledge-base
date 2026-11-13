---
title: "NETSDK1174: -p abbreviation for --project in dotnet run is deprecated"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/tools/sdk-errors/netsdk1174.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# NETSDK1174: -p abbreviation for --project in dotnet run is deprecated

The full error message is similar to the following example:

> The abbreviation of -p for --project is deprecated. Please use --project.

The use of `-p` in `dotnet run` is deprecated because of the close relationship `dotnet run` has with `dotnet build` and `dotnet publish`. In `dotnet build` and `dotnet publish`, `p` is used to set MSBuild properties. This deprecation is the first step in aligning abbreviations for these three commands.

For more information, see `-p` option for `dotnet run` is deprecated.
