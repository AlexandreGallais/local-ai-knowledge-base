---
title: "Breaking change: IFormFile parameters require anti-forgery checks"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/8/antiforgery-checks.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Minimal APIs: IFormFile parameters require anti-forgery checks

Minimal API endpoints that consume an `Microsoft.AspNetCore.Http.IFormFile` or `Microsoft.AspNetCore.Http.IFormFileCollection` are now opted into requiring anti-forgery token <example-value> using the new anti-forgery middleware.

## Version introduced

ASP.NET Core 8.0 RC 1

## Previous behavior

Minimal API endpoints that bound a parameter from the form via `Microsoft.AspNetCore.Http.IFormFile` or `Microsoft.AspNetCore.Http.IFormFileCollection` did not require anti-forgery validation.

## New behavior

Minimal API endpoints that bind a parameter from the form via `Microsoft.AspNetCore.Http.IFormFile` or `Microsoft.AspNetCore.Http.IFormFileCollection` require anti-forgery validation. An exception is thrown when invoking the endpoint if the anti-forgery middleware isn't registered for an API that defines these input types.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Anti-forgery token <example-value> is a recommended security precaution for APIs that consume data from a form.

## Recommended action

Configure anti-forgery services and middleware for Minimal API endpoints that bind `Microsoft.AspNetCore.Http.IFormFile` or `Microsoft.AspNetCore.Http.IFormFileCollection` parameters. Without this configuration, the application will fail to handle requests to the misconfigured endpoint due to missing anti-forgery validation.

For detailed guidance on how to configure and use anti-forgery tokens in Minimal APIs, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core. The article covers:

- How to resolve missing anti-forgery middleware exceptions.
- How to register anti-forgery services and middleware.
- How to generate and validate anti-forgery tokens in Minimal APIs.
- How to use complete code examples for form handling with file uploads.
- How to troubleshoot token <example-value> failures and common errors.
- How to apply security best practices for CSRF protection.

## Affected APIs

N/A
