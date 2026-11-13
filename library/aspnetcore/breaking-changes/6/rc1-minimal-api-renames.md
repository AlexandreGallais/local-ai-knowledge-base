---
title: "Breaking change: Minimal API renames in RC 1"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/rc1-minimal-api-renames.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Minimal API renames in RC 1

Some APIs were renamed to improve the consistency of type names and to remove "minimal" and "action" from the API names.

## Version introduced

ASP.NET Core 6.0 RC 1

## Old and new behavior

- The `Microsoft.AspNetCore.Builder.MinimalActionEndpointConventionBuilder` class was renamed to `Microsoft.AspNetCore.Builder.DelegateEndpointConventionBuilder`.

  > **Note:**
  > This class was renamed again in RC 2 to `Microsoft.AspNetCore.Builder.RouteHandlerBuilder`.

- The `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions` class was renamed to `Microsoft.AspNetCore.Builder.DelegateEndpointRouteBuilderExtensions`.

  > **Note:**
  > This class was merged with `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions` in RC 2.

- The `Microsoft.AspNetCore.Http.RequestDelegate` parameter to `Map`, `MapGet`, `MapPost`, `MapPut`, `MapDelete`, `MapMethod`, `MapFallback`, and `Microsoft.AspNetCore.Http.RequestDelegateFactory.Create(System.Delegate,Microsoft.AspNetCore.Http.RequestDelegateFactoryOptions)` was renamed from `action` to `handler`.

## Change category

This change affects binary compatibility and source compatibility.

## Reason for change

This change was made to improve the consistency of type names and to remove "minimal" and "action" from the API names.

## Recommended action

Recompile any projects built with an earlier SDK. For most projects, this should be all that's necessary.

If your code references any of these type or parameter names directly by name, updated the code to reflect the new names.

## Affected APIs

- `Microsoft.AspNetCore.Builder.MinimalActionEndpointConventionBuilder`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.Map()`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.MapGet()`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.MapPost()`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.MapPut()`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.MapDelete()`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.MapMethod()`
- `Microsoft.AspNetCore.Builder.MinimalActionEndpointRouteBuilderExtensions.MapFallback()`
- `Microsoft.AspNetCore.Http.RequestDelegateFactory.Create(Delegate action, RequestDelegateFactoryOptions? options = null)`
