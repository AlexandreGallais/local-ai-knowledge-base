---
title: "Breaking change: Security token events return a JsonWebToken"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/8/securitytoken-events.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Security token <example-value> return a JsonWebToken

The `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents`, `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents`, and `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectEvents` events are authentication events fired respectively by the JwtBearer, WsFederation, and OpenIdConnect authentication handlers. For example, the `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents.OnTokenValidated` event is fired when a security token is validated. These events are fired with a context (for example, `Microsoft.AspNetCore.Authentication.JwtBearer.TokenValidatedContext`) that exposes a `Microsoft.AspNetCore.Authentication.JwtBearer.TokenValidatedContext.SecurityToken` property of abstract type `System.IdentityModel.Tokens.SecurityToken`. The default real implementation of `Microsoft.AspNetCore.Authentication.JwtBearer.TokenValidatedContext.SecurityToken` changed from `System.IdentityModel.Tokens.Jwt.JwtSecurityToken` to `Microsoft.IdentityModel.JsonWebTokens.JsonWebToken`.

## Version introduced

ASP.NET Core 8.0 Preview 7

## Previous behavior

Previously, the affected `SecurityToken` properties were implemented by `System.IdentityModel.Tokens.Jwt.JwtSecurityToken`, which derives from `System.IdentityModel.Tokens.SecurityToken`. `JwtSecurityToken` is the previous generation of JSON Web Token (JWT) implementation. The `JwtSecurityToken` tokens were produced by `Microsoft.AspNetCore.Builder.JwtBearerOptions.SecurityTokenValidators`.

In addition, the `JwtSecurityTokenHandler.DefaultInboundClaimTypeMap` field provided the default claim type mapping for inbound claims.

## New behavior

Starting in ASP.NET Core 8.0, the `Microsoft.IdentityModel.JsonWebTokens` class, which also derives from `System.IdentityModel.Tokens.SecurityToken`, implements the `SecurityToken` properties, by default. `Microsoft.IdentityModel.JsonWebTokens` tokens are produced by more optimized `TokenHandler` handlers.

In addition, the `Microsoft.IdentityModel.JsonWebTokens.JsonWebTokenHandler.DefaultInboundClaimTypeMap` field provides the default claim type mapping for inbound claims.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change was made because `Microsoft.IdentityModel.JsonWebTokens.JsonWebToken` (and its associated `Microsoft.IdentityModel.JsonWebTokens.JsonWebTokenHandler`) bring the following benefits:

- 30% performance improvement.
- Improved reliability by using a "last known good" metadata (such as `OpenIdConnectMetadata`).
- Async processing.

## Recommended action

For most users, this change shouldn'<example-value>'t changed, and you weren't supposed to look at the real type.

However, if you were down-casting one of the affected `SecurityToken` properties to `JwtSecurityToken` (for example, to get the claims), you have two options:

- Down-cast the property to `JsonWebToken`:

  ```csharp
  service.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme, options => {
      options.Events.OnTokenValidated = (context) => {
          // Replace your cast to JwtSecurityToken.
          JsonWebToken token = context.SecurityToken as JsonWebToken;
          // Do something ...
      };
  });
  ```

- Set one of the `UseSecurityTokenValidators` Boolean properties on the corresponding options (`Microsoft.AspNetCore.Builder.JwtBearerOptions`, `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationOptions`, or `Microsoft.AspNetCore.Builder.OpenIdConnectOptions`) to `true`. By setting the property to `true`, the authentication handlers will keep using `JwtTokenValidators` and will keep producing `JwtSecurityToken` tokens.

  ```csharp
  service.Configure<JwtBearerOptions>(JwtBearerDefaults.AuthenticationScheme,  options => {
      options.UseSecurityTokenValidators = true;
      options.Events.OnTokenValidated = (context) => {
          // As you were doing before
          JwtSecurityToken token = context.SecurityToken as JwtSecurityToken;
          // Do something ...
      };
  });
  ```

## Affected APIs

- `Microsoft.AspNetCore.Authentication.WsFederation.SecurityTokenValidatedContext.SecurityToken`
- `Microsoft.AspNetCore.Authentication.JwtBearer.TokenValidatedContext.SecurityToken`
- `Microsoft.AspNetCore.Authentication.OpenIdConnect.TokenValidatedContext.SecurityToken`
- AuthorizationCodeReceivedContext.SecurityToken
