---
title: "Breaking change: Rate-limiting middleware requires AddRateLimiter"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/8/addratelimiter-requirement.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Rate-limiting middleware requires AddRateLimiter

ASP.NET Core rate-limiting middleware has been updated with extra functionality. The middleware now requires services registered with `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*`.

## Version introduced

ASP.NET Core 8.0 Preview 5

## Previous behavior

Previously, rate limiting could be used without `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*`. For example, the middleware could be configured by calling `Configure<RateLimiterOptions>(o => { })`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<RateLimiterOptions>(o => o
    .AddFixedWindowLimiter(policyName: "fixed", options =>
    {
        // configuration
    }));

var app = builder.Build();
app.UseRateLimiter();
app.MapGet("/", () => Results.Ok($"Hello world")).RequireRateLimiting("fixed");
app.Run();
```

## New behavior

If `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*` is not called on app startup, ASP.NET Core throws an informative error:

> Unable to find the required services. Please add all the required services by calling 'IServiceCollection.AddRateLimiter' in the application startup code.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Rate-limiting middleware requires services that are only registered by calling `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*`.

## Recommended action

Ensure that `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*` is called at application startup.

For example, update `Configure<RateLimiterOptions>(o => { })` to use `Microsoft.AspNetCore.Builder.RateLimiterServiceCollectionExtensions.AddRateLimiter*`:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRateLimiter(o => o
    .AddFixedWindowLimiter(policyName: "fixed", options =>
    {
        // configuration
    }));

var app = builder.Build();
app.UseRateLimiter();
app.MapGet("/", () => Results.Ok($"Hello world")).RequireRateLimiting("fixed");
app.Run();
```

## Affected APIs

- `Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter*`
