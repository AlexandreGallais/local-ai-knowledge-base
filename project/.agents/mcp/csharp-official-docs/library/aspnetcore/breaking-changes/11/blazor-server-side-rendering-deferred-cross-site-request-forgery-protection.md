---
title: "Breaking change: Blazor server-side rendering defers antiforgery validation to middleware"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/blazor-server-side-rendering-deferred-cross-site-request-forgery-protection.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Blazor server-side rendering defers antiforgery validation to middleware

In ASP.NET Core 11, Blazor static server-side rendering (SSR) endpoints no longer validate antiforgery tokens themselves. They rely on the antiforgery middleware to record a validation result, and they generate antiforgery tokens only when the token-based antiforgery middleware is present in the pipeline.

## Version introduced

.NET 11

## Previous behavior

Previously, when a Blazor SSR endpoint handled a form `POST`, the Razor Components endpoint validated the request itself. If the upstream antiforgery middleware hadn'<example-value>'s antiforgery token. The endpoint also always generated and stored antiforgery tokens for rendered forms, whether or not `app.UseAntiforgery()` was in the pipeline.

As a result, a Blazor SSR app that didn't call `app.UseAntiforgery()` still had its form posts validated against antiforgery tokens by the endpoint, and still emitted tokens for its forms.

## New behavior

Starting in ASP.NET Core 11, the Razor Components endpoint trusts the antiforgery verdict recorded on the request'<example-value>'t present, the endpoint skips token generation.

The verdict can be recorded by either of two middleware components:

* The token-based antiforgery middleware that `app.UseAntiforgery()` adds.
* The automatic cross-origin CSRF protection middleware that's injected by default in apps built with `WebApplication.CreateBuilder` (new in .NET 11).

The impact depends on the app's configuration:

* Apps that call `app.UseAntiforgery()` are unaffected. Requests are validated against antiforgery tokens, and tokens are generated for forms, exactly as before.
* Apps that don't call `app.UseAntiforgery()` are now protected by the automatic CSRF protection middleware instead of by token <example-value> in the endpoint. These apps no longer emit antiforgery tokens for their forms.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The token-based antiforgery system and the new cross-origin CSRF protection now record a single validation result on the shared `IAntiforgeryValidationFeature`, which form-consuming components read to decide whether to reject a request. Having the Razor Components endpoint validate the request a second time duplicated that work and could produce a result that differed from the middleware's. Generating tokens when no antiforgery middleware was present produced tokens that nothing validated.

For more information, see dotnet/aspnetcore#67082.

## Recommended action

If your Blazor SSR app relies on antiforgery tokens — for example, to validate form posts or to render tokens into forms — make sure it calls `app.UseAntiforgery()`:

```csharp
var app = builder.Build();

app.UseAntiforgery();
```

Apps that call `app.UseAntiforgery()`, directly or implicitly through `AddRazorComponents`, require no changes.

If you intentionally removed `app.UseAntiforgery()` and want to rely on the automatic cross-origin CSRF protection instead, no action is required. Be aware that antiforgery tokens are no longer generated for your forms, and cross-origin form posts are rejected based on `Sec-Fetch-Site` and `Origin` rather than tokens. For more information, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core and Migrate from ASP.NET Core in .NET 10 to ASP.NET Core in .NET 11.

## Affected APIs

None. No public API surface changed. The change affects the behavior of Blazor static server-side rendering endpoints and the antiforgery state provider that generates tokens.
