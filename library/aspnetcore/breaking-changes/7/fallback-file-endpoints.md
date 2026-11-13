---
title: "Breaking change: Fallback file endpoints"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/7/fallback-file-endpoints.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Fallback file endpoints

The `Microsoft.AspNetCore.Mvc.ConsumesAttribute` attribute allows controller actions to specify their supported content types. Starting in .NET 6, if a fallback file endpoint was configured, it could match routes that were discarded because the request had a different content type than what was specified in an action's `Microsoft.AspNetCore.Mvc.ConsumesAttribute`. The .NET 6 behavior was an undesirable change from the .NET 5 behavior. This breaking change partially addresses the issue by making fallback file endpoints only match `GET` and `HEAD` requests.

## Version introduced

ASP.NET Core 7.0 RC 2

## Previous behavior

Endpoints configured with `Microsoft.AspNetCore.Builder.StaticFilesEndpointRouteBuilderExtensions.MapFallbackToFile*` matched requests made with any request method.

## New behavior

Endpoints configured with `Microsoft.AspNetCore.Builder.StaticFilesEndpointRouteBuilderExtensions.MapFallbackToFile*` only match `HEAD` and `GET` requests.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

This change partially reverts a larger breaking change accidentally introduced in .NET 6. Since it's highly unusual to expect a fallback file response when making a request with a method other than `HEAD` or `GET`, the impact of this breaking change should be minimal.

## Recommended action

If you want fallback file endpoints to match requests with methods other than HEAD or GET, you can specify additional HTTP request methods using `WithMetadata()`. For example:

```csharp
endpoints.MapFallbackToFile("index.html")
    .WithMetadata(new HttpMethodMetadata(new[] { /* List supported methods here */ }));
```

## Affected APIs

- `Microsoft.AspNetCore.Builder.StaticFilesEndpointRouteBuilderExtensions.MapFallbackToFile*`
