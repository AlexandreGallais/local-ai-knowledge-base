---
title: ".NET 7 breaking change: Generic type constraint on PatternContext<T>"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/7.0/patterncontext-generic-constraint.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generic type constraint on PatternContext\<T>

As part of annotating the .NET library for nullable reference types, a new generic constraint was added to `Microsoft.Extensions.FileSystemGlobbing.Internal.PatternContexts.PatternContext`1`. If you're consuming this class directly, your code may break if the `TFrame` type is not a struct.

## Previous behavior

Previously, `Microsoft.Extensions.FileSystemGlobbing.Internal.PatternContexts.PatternContext`1` allowed any type to fill the `TFrame` type parameter.

## New behavior

Starting in .NET 7, the generic type parameter on `Microsoft.Extensions.FileSystemGlobbing.Internal.PatternContexts.PatternContext`1`, `TFrame`, is constrained to be a struct.

## Version introduced

.NET 7

## Type of breaking change

This change can affect source compatibility and binary compatibility.

## Reason for change

This change was necessary to annotate the type correctly for nullable contexts.

## Recommended action

If you're currently using this type in your code, we recommend that you remove it. This type supports infrastructure and is not intended to be used directly from your code.

## Affected APIs

- `Microsoft.Extensions.FileSystemGlobbing.Internal.PatternContexts.PatternContext`1`
