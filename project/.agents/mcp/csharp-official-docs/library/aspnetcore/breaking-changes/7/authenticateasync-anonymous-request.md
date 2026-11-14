---
title: "Breaking change: AuthenticateAsync for remote auth providers"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/7/authenticateasync-anonymous-request.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# AuthenticateAsync for remote auth providers

Remote authentication providers like OpenIdConnect, WsFederation, and OAuth have been updated to avoid unnecessary errors when there's no user information available on the request.

## Version introduced

.NET 7

## Previous behavior

Previously, when `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*` was called on a remote authentication provider and there was no current user, the call failed with a message similar to `OpenIdConnect was not authenticated. Failure message: Not authenticated`.

## New behavior

Starting in .NET 7, `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*` returns `Microsoft.AspNetCore.Authentication.AuthenticateResult.NoResult`, an anonymous identity.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The previous behavior:

- Was inconsistent with `Cookie` and `Negotiate` authentication, which return `Microsoft.AspNetCore.Authentication.AuthenticateResult.NoResult`.
- Caused excess failure logs, especially if the remote authentication handler was set as the default handler and invoked per request.

## Recommended action

If you have code that directly invokes `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*`, check it to ensure it properly handles `Microsoft.AspNetCore.Authentication.AuthenticateResult.NoResult` and anonymous or empty `System.Security.Claims.ClaimsIdentity` instances.

## Affected APIs

- `Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.AuthenticateAsync*`
