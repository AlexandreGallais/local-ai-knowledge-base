---
title: "Breaking change: Output caching API changes"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/7/output-caching-renames.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Output caching API changes

Some APIs in the `Microsoft.AspNetCore.OutputCaching` namespace have changed to better represent their intent.

The following APIs were removed:

- `OutputCachePolicyBuilder.#ctor`
- `OutputCachePolicyBuilder.Clear`

The following APIs were renamed:

| Previous name | New name |
| - | - |
| `AllowLocking(System.Boolean)` | `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetLocking(System.Boolean)` |
| `VaryByRouteValue(System.String[])` | `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByRouteValue(System.String[])` |
| `VaryByQuery(System.String[])` | `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery(System.String[])` |
| `VaryByHeader(System.String[])` | `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByHeader(System.String[])` |

The following APIs were added:

- `Microsoft.AspNetCore.OutputCaching.CacheVaryByRules.VaryByHost`
- `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.AddPolicy(System.String,System.Action{Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder},System.Boolean)`
- `Microsoft.AspNetCore.OutputCaching.OutputCacheOptions.AddBasePolicy(System.Action{Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder},System.Boolean)`
- `Microsoft.Extensions.DependencyInjection.OutputCacheConventionBuilderExtensions.CacheOutput``1(``0,System.Action{Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder},System.Boolean)`

## Version introduced

ASP.NET Core 7.0 RC 2

## Previous behavior

`OutputCachePolicyBuilder.VaryByQuery(System.String[])` was additive: every call added more query string keys.

## New behavior

The `OutputCachePolicyBuilder.VaryByQuery(System.String[])` method is now named `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.SetVaryByQuery(System.String[])`, and each call replaces existing query string keys.

For other changes, see the first section of this article.

## Type of breaking change

This change affects source compatibility and binary compatibility.

## Reason for change

This change was made to improve the consistency of method names and to remove ambiguity in their behavior.

## Recommended action

Recompile any projects built with an earlier SDK. If you referenced any of these method names directly, update the source to reflect the new names.

## Affected APIs

- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.#ctor`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.Clear`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.AllowLocking(System.Boolean)`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByRouteValue(System.String[])`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByQuery(System.String[])`
- `Microsoft.AspNetCore.OutputCaching.OutputCachePolicyBuilder.VaryByHeader(System.String[])`
