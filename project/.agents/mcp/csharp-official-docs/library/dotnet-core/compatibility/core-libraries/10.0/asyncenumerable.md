---
title: "Breaking change - System.Linq.AsyncEnumerable in .NET 10"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/10.0/asyncenumerable.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.Linq.AsyncEnumerable in .NET 10

.NET 10 introduces the `System.Linq.AsyncEnumerable` class, which provides a full set of LINQ extension methods for the `System.Collections.Generic.IAsyncEnumerable`1` type. This class replaces the community-maintained `System.Linq.Async` NuGet library, potentially causing compilation errors due to ambiguities.

## Version introduced

.NET 10

## Previous behavior

Previously, the `AsyncEnumerable` class in the community-maintained `System.Linq.Async` package provided LINQ support for `System.Collections.Generic.IAsyncEnumerable`1`.

## New behavior

The `System.Linq.AsyncEnumerable` class in .NET 10, and in the `System.Linq.AsyncEnumerable` NuGet package, provides LINQ support for `System.Collections.Generic.IAsyncEnumerable`1`.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

`System.Collections.Generic.IAsyncEnumerable`1` is a commonly used interface, so the platform itself should provide LINQ support for the type. Maintainers of `System.Linq.Async` and other community members petitioned for inclusion directly in the platform.

## Recommended action

If you're upgrading to .NET 10 and your code includes a direct package reference to `System.Linq.Async`, remove that package reference or upgrade to version 7.0.0. For multitargeting both .NET 10 and a previous version, add a package reference to `System.Linq.AsyncEnumerable` instead.

If `System.Linq.Async` is consumed indirectly via another package, avoid ambiguity errors by adding `<ExcludeAssets>` metadata with a value of `compile` or `all`:

- To allow transitive use of `System.Linq.Async`, set `<ExcludeAssets>` to `compile`:

  ```xml
  <PackageReference Include="System.Linq.Async" Version="6.0.1">
    <ExcludeAssets>compile</ExcludeAssets>
  </PackageReference>
  ```

  This configuration prevents direct usage in your code while allowing other packages to continue using System.Linq.Async internally.

- For complete exclusion, set `<ExcludeAssets>` to `all`:

  ```xml
  <PackageReference Include="System.Linq.Async" Version="6.0.1">
    <ExcludeAssets>all</ExcludeAssets>
  </PackageReference>
  ```

  Use this configuration only if you're certain no dependencies require System.Linq.Async at runtime.

Most consuming code should be compatible without changes, but some call sites might need updates to refer to newer names and signatures. For example, a `Select` call like `e.Select(i => i * 2)` works the same before and after. However, the call `e.SelectAwait(async (int i, CancellationToken ct) => i * 2)` needs to be changed to use `Select` instead of `SelectAwait`, as in `e.Select(async (int i, CancellationToken ct) => i * 2)`.

For the full set of LINQ extension methods available for `System.Collections.Generic.IAsyncEnumerable`1`, see the System.Linq.AsyncEnumerable API documentation.

## Affected APIs

- `System.Linq.AsyncEnumerable`
- `System.Collections.Generic.IAsyncEnumerable`1`
- System.Linq.Async package (community-maintained)
- Ix.NET v7.0: .NET 10 and LINQ for IAsyncEnumerable\<T>
