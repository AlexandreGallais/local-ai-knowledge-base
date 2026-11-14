---
title: "Breaking change: Blazor: JSObjectReference and JSInProcessObjectReference types changed to internal"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/blazor-jsobjectreference-to-internal.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Blazor: JSObjectReference and JSInProcessObjectReference types changed to internal

The new `Microsoft.JSInterop.JSObjectReference` and `Microsoft.JSInterop.JSInProcessObjectReference` types introduced in ASP.NET Core 5.0 RC1 have been marked as `internal`.

## Version introduced

5.0 RC2

## Old behavior

A `JSObjectReference` can be obtained from a JavaScript interop call via `IJSRuntime`. For example:

```csharp
var jsObjectReference = await JSRuntime.InvokeAsync<JSObjectReference>(...);
```

## New behavior

`JSObjectReference` uses the internal access modifier. The `public` `IJSObjectReference` interface must be used instead. For example:

```csharp
var jsObjectReference = await JSRuntime.InvokeAsync<IJSObjectReference>(...);
```

`JSInProcessObjectReference` was also marked as `internal` and was replaced by `IJSInProcessObjectReference`.

## Reason for change

The change makes the JavaScript interop feature more consistent with other patterns within Blazor. `IJSObjectReference` is analogous to `IJSRuntime` in that it serves a similar purpose and has similar methods and extensions.

## Recommended action

Replace occurrences of `JSObjectReference` and `JSInProcessObjectReference` with `IJSObjectReference` and `IJSInProcessObjectReference`, respectively.

## Affected APIs

- `Microsoft.JSInterop.JSObjectReference`
- `Microsoft.JSInterop.JSInProcessObjectReference`
