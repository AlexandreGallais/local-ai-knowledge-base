---
title: "Breaking change: Minimal API renames in RC 2"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/6/rc2-minimal-api-renames.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Minimal API renames in RC 2

To improve the consistency of type names, two classes were renamed, and one class was removed and its methods merged into the existing `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions` class.

## Version introduced

ASP.NET Core 6.0 RC 2

## Old and new behavior

- The `Microsoft.AspNetCore.Builder.DelegateEndpointConventionBuilder` class was renamed to `Microsoft.AspNetCore.Builder.RouteHandlerBuilder`.
- The `Microsoft.AspNetCore.Http.OpenApiDelegateEndpointConventionBuilderExtensions` class was renamed to `Microsoft.AspNetCore.Http.OpenApiRouteHandlerBuilderExtensions`.
- The `Microsoft.AspNetCore.Builder.DelegateEndpointRouteBuilderExtensions` class was removed and all of its methods were merged into the existing `Microsoft.AspNetCore.Builder.EndpointRouteBuilderExtensions` class.

## Change category

This change affects binary compatibility and source compatibility.

## Reason for change

This change was made to improve the consistency of type names. Now that there is a new `Microsoft.AspNetCore.Routing.RouteHandlerOptions` class, we wanted to replace `DelegateEndpoint` with `RouteHandler`.

## Recommended action

Recompile any projects built with an earlier SDK. For most projects, this should be all that's necessary.

If your code references any of these type names directly by name, updated the code to reflect the new names.

## Affected APIs

- `Microsoft.AspNetCore.Builder.DelegateEndpointConventionBuilder`
- `Microsoft.AspNetCore.Http.OpenApiDelegateEndpointConventionBuilderExtensions`
- `Microsoft.AspNetCore.Builder.DelegateEndpointRouteBuilderExtensions`
