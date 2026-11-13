---
title: "Breaking change: CA2015: Do not define finalizers for types derived from MemoryManager<T>"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/code-analysis/5.0/ca2015-finalizers-for-memorymanager-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Warning CA2015: Do not define finalizers for types derived from MemoryManager\<T>

.NET code analyzer rule CA2015 is enabled, by default, starting in .NET 5. It produces a build warning for any types that derive from `System.Buffers.MemoryManager`1` that define a finalizer.

## Change description

Starting in .NET 5, the .NET SDK includes .NET source code analyzers. Several of these rules are enabled, by default, including CA2015. If your project contains code that violates this rule and is configured to treat warnings as errors, this change could break your build.

Rule CA2015 flags types that derive from `System.Buffers.MemoryManager`1` that define a finalizer. Adding a finalizer to a type that derives from `System.Buffers.MemoryManager`1` is likely an indication of a bug. It suggests that a native resource that could have been obtained in a `System.Span`1` is getting cleaned up, potentially while it's still in use by the `System.Span`1`.

## Version introduced

5.0

## Recommended action

- Remove the finalizer definition. For more information, see CA2015.

- To disable code analysis completely, set `EnableNETAnalyzers` to `false` in your project file. For more information, see EnableNETAnalyzers.

## Affected APIs

Not detectable via API analysis.
