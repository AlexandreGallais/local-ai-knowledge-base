---
title: "Breaking change: HTTP logging middleware requires AddHttpLogging()"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/8/httplogging-addhttplogging-requirement.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# HTTP logging middleware requires AddHttpLogging()

ASP.NET Core HTTP logging middleware has been updated with extra functionality. The middleware now requires services registered with `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging*`.

## Version introduced

ASP.NET Core 8.0

## Previous behavior

Previously, you could call just `app.UseHttpLogging();` to activate HTTP logging.

## New behavior

Starting in .NET 8, if you don't also call `Microsoft.Extensions.DependencyInjection.HttpLoggingServicesExtensions.AddHttpLogging*`, an error is raised:

> System.InvalidOperationException: Unable to resolve service for type 'Microsoft.Extensions.ObjectPool.ObjectPool`1[Microsoft.AspNetCore.HttpLogging.HttpLoggingInterceptorContext]' while attempting to activate 'Microsoft.AspNetCore.HttpLogging.HttpLoggingMiddleware'.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Additional features were added to the HttpLogging middleware that are registered (and configurable) via the `Microsoft.AspNetCore.Telemetry.HttpLoggingServiceExtensions.AddHttpLogging*` method.

## Recommended action

Call `services.AddHttpLogging()` during host construction.

## Affected APIs

None.
