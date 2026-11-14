---
title: "endpoint-filters-binding-failures"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/endpoint-filters-binding-failures.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# endpoint-filters-binding-failures

### Endpoint filters observe parameter-binding failures

When a Minimal API endpoint has any filters or filter factories configured, the filter pipeline now runs even if parameter binding fails. Filters can read `HttpContext.Response.StatusCode == 400` and substitute their own response body.

In the `Development` environment, set `RouteHandlerOptions.ThrowOnBadRequest = false` so the framework returns a 400 that the filter can observe instead of throwing `Microsoft.AspNetCore.Http.BadHttpRequestException` to the developer exception page. This is already the default in non-`Development` environments.

Thank you @marcominerva for this contribution!
