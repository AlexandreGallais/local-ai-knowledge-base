---
title: "Breaking change: Localization: Obsolete constructor removed in request localization middleware"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/localization-requestlocalizationmiddleware-constructor-removed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Localization: Obsolete constructor removed in request localization middleware

The `Microsoft.AspNetCore.Localization.RequestLocalizationMiddleware` constructor that lacks an `Microsoft.Extensions.Logging.ILoggerFactory` parameter was marked as obsolete in this commit. In ASP.NET Core 5.0, the obsolete constructor was removed. For discussion, see dotnet/aspnetcore#23785.

## Version introduced

5.0 Preview 8

## Old behavior

The obsolete `RequestLocalizationMiddleware.ctor(RequestDelegate, IOptions<RequestLocalizationOptions>)` constructor exists.

## New behavior

The obsolete `RequestLocalizationMiddleware.ctor(RequestDelegate, IOptions<RequestLocalizationOptions>)` constructor doesn't exist.

## Reason for change

This change ensures that the request localization middleware always has access to a logger.

## Recommended action

When manually constructing an instance of `RequestLocalizationMiddleware`, pass an `ILoggerFactory` instance in the constructor. If a valid `ILoggerFactory` instance isn't available in that context, consider passing the middleware constructor a `Microsoft.Extensions.Logging.Abstractions.NullLoggerFactory` instance.

## Affected APIs

RequestLocalizationMiddleware.ctor(RequestDelegate, IOptions\<RequestLocalizationOptions>)
