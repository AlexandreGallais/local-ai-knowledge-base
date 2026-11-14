---
title: "Configure OpenID Connect Web (UI) authentication in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/configure-oidc-web-authentication.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Configure OpenID Connect Web (UI) authentication in ASP.NET Core (part 2 of 2)

## Backend for frontend (BFF) security architecture

It is no longer recommended to implement OpenID Connect public clients for any web apps.

For more information, see the draft OAuth 2.0 for Browser-Based Applications.

If implementing **web** applications which have no independent backend, we recommend using the Backend for Frontend (BFF) pattern security architecture. This pattern can be implemented in different ways, but the authentication is always implemented in the backend, and no sensitive data is sent to the web client for further authorization or authentication flows.

## Advanced features, standards, extending the OIDC client

### Logging

Debugging OpenID Connect clients can be hard. Personally identifiable information (PII) data is not logged by default. If debugging in development mode, the `IdentityModelEventSource.ShowPII` can be used to log sensitive personal data. Don't deploy an app with `IdentityModelEventSource.ShowPII` to productive servers.

```csharp
//using ...

using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);

//... code 

var app = builder.Build();

IdentityModelEventSource.ShowPII = true;

//... code 

app.Run();
```

For more information, see Logging.

> **Note:**
> You may want to lower the configured log level to see all the required logs.

### OIDC and OAuth Parameter Customization

The OAuth and OIDC authentication handlers (`Microsoft.AspNetCore.Authentication.OAuth.OAuthOptions.AdditionalAuthorizationParameters`) option allows customization of authorization message parameters that are usually included as part of the redirect query string.

## Map claims from OpenID Connect

For more information, see Map, customize, transform claims in ASP.NET Core.

## Blazor OpenID Connect

For more information, see Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC).

## Standards

* OpenID Connect 1.0
* Proof Key for Code Exchange by OAuth Public Clients
* OAuth 2.0 for Browser-Based Applications
* The OAuth 2.0 Authorization Framework
* OAuth 2.0 Pushed Authorization Requests (PAR) RFC 9126
