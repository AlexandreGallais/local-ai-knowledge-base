---
title: ".NET 8 breaking change: GC.GetGeneration might return Int32.MaxValue"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/getgeneration-return-value.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# GC.GetGeneration might return Int32.MaxValue

Starting in .NET 8, `System.GC.GetGeneration*` might return `System.Int32.MaxValue` for objects allocated on non-GC heaps (also referred as "frozen" heaps), where previously it returned 2. When and how the runtime allocates objects on non-GC heaps is an internal implementation detail. String literals, for example, are allocated on a non-GC heap, and the following method call might return `System.Int32.MaxValue`.

```csharp
int gen = GC.GetGeneration("string");
```

## Previous behavior

Previously, `System.GC.GetGeneration*` returned integer values in the range of 0-2.

## New behavior

Starting in .NET 8, `System.GC.GetGeneration*` can return a value of 0, 1, 2, or `System.Int32.MaxValue`.

## Version introduced

.NET 8 Preview 4

## Type of breaking change

This change is a behavioral change.

## Reason for change

.NET introduced a new, non-GC kind of heap that's slightly different from the existing heaps, which are large object heap (LOH), small object heap (SOH), and pinned object heap (POH).

## Recommended action

Make sure you're not using the return value from `GC.GetGeneration()` as an array indexer or for anything else where `System.Int32.MaxValue` is unexpected.

## Affected APIs

- `System.GC.GetGeneration(System.Object)`
- `System.GC.GetGeneration(System.WeakReference)`
