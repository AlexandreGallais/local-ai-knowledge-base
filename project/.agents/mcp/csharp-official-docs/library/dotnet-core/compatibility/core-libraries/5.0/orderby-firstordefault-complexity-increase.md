---
title: "Breaking change: Complexity of LINQ OrderBy.First{OrDefault} increased"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/5.0/orderby-firstordefault-complexity-increase.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Complexity of LINQ OrderBy.First{OrDefault} increased

The implementation of `System.Linq.Enumerable.OrderBy*``.``System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` and `System.Linq.Enumerable.OrderBy*``.``System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` has changed, resulting in increased complexity for the operation.

## Change description

In .NET Core 1.x - 3.x, calling `System.Linq.Enumerable.OrderBy*` or `System.Linq.Enumerable.OrderByDescending*` followed by `System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` or `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` operates with `O(N)` complexity. Since only the first (or default) element is required, only one enumeration is required to find it. However, the predicate that's supplied to `System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` or `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` is invoked exactly `N` times, where `N` is the length of the sequence.

In .NET 5 and later versions, a change was made such that calling `System.Linq.Enumerable.OrderBy*` or `System.Linq.Enumerable.OrderByDescending*` followed by `System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` or `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` operates with `O(N log N)` complexity instead of `O(N)` complexity. However, the predicate that's supplied to `System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` or `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})` may be invoked *less* than `N` times, which is more important for overall performance.

> **Note:**
> This change matches the implementation and complexity of the operation in .NET Framework.

## Reason for change

The benefit of invoking the predicate fewer times outweighs a lower overall complexity, so the implementation that was introduced in .NET Core 1.0 was reverted. For more information, see this dotnet/runtime issue.

## Version introduced

5.0

## Recommended action

No action is required on the developer's part.

## Affected APIs

- `System.Linq.Enumerable.OrderBy*`
- `System.Linq.Enumerable.OrderByDescending*`
- `System.Linq.Enumerable.First``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})`
- `System.Linq.Enumerable.FirstOrDefault``1(System.Collections.Generic.IEnumerable{``0},System.Func{``0,System.Boolean})`
