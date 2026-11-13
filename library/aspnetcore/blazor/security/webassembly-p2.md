---
title: "Secure ASP.NET Core Blazor WebAssembly (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure ASP.NET Core Blazor WebAssembly (part 2 of 2)

## Use one identity provider app registration per app

Some of the articles under this *Overview* pertain to Blazor hosting scenarios that involve two or more apps. A standalone Blazor WebAssembly app uses web API with authenticated users to access server resources and data provided by a server app.

When this scenario is implemented in documentation examples, ***two*** identity provider registrations are used, one for the client app and one for the server app. Using separate registrations, for example in Microsoft Entra ID, isn't strictly required. However, using two registrations is a security best practice because it isolates the registrations by app. Using separate registrations also allows independent configuration of the client and server registrations.

## Refresh tokens

Although refresh tokens can't be secured in Blazor WebAssembly apps, they can be used if you implement them with appropriate security strategies.

For standalone Blazor WebAssembly apps in ASP.NET Core in .NET 6 or later, we recommend using:

* The OAuth 2.0 Authorization Code flow (Code) with Proof Key for Code Exchange (PKCE).
* A refresh token that has a short expiration.
* A rotated refresh token.
* A refresh token with an expiration after which a new interactive authorization flow is required to refresh the user's credentials.

For more information, see the following resources:

* Microsoft identity platform refresh tokens: Refresh token lifetime
* OAuth 2.0 for Browser-Based Apps (IETF specification)

## Establish claims for users

Apps often require claims for users based on a web API call to a server. For example, claims are frequently used to establish authorization in an app. In these scenarios, the app requests an access token to access the service and uses the token to obtain user data for creating claims.

For examples, see the following resources:

* Additional scenarios: Customize the user
* ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles

## Prerendering support

Prerendering isn't supported for authentication endpoints (`/authentication/` path segment).

For more information, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Azure App Service on Linux with Identity Server

Specify the issuer explicitly when deploying to Azure App Service on Linux with Identity Server.

For more information, see Use Identity to secure a Web API backend for SPAs.

## Windows Authentication

We don't recommend using Windows Authentication with Blazor Webassembly or with any other SPA framework. We recommend using token-based protocols instead of Windows Authentication, such as OIDC with Active Directory Federation Services (ADFS).

If Windows Authentication is used with Blazor Webassembly or with any other SPA framework, additional measures are required to protect the app from cross-site request forgery (CSRF) tokens. The same concerns that apply to cookies apply to Windows Authentication with the addition that Windows Authentication doesn't offer a mechanism to prevent sharing of the authentication context across origins. Apps using Windows Authentication without additional protection from CSRF should at least be restricted to an organization's intranet and not be used on the open Internet.

For more information, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core.

## Secure a SignalR hub

To secure a SignalR hub in the server API project, apply the `[Authorize]` attribute to the hub class or to methods of the hub class.

In a client project with prerendering, such as hosted Blazor WebAssembly (ASP.NET Core in .NET 7 or earlier) or a Blazor Web App (ASP.NET Core in .NET 8 or later), see the guidance in ASP.NET Core Blazor SignalR guidance.

In a client project component without prerendering, such as standalone Blazor WebAssembly, or non-browser apps, supply an access token to the hub connection, as the following example demonstrates. For more information, see SignalR authentication and authorization.

```razor
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject IAccessTokenProvider TokenProvider
@inject NavigationManager Navigation

...

var tokenResult = await TokenProvider.RequestAccessToken();

if (tokenResult.TryGetToken(out var token))
{
    hubConnection = new HubConnectionBuilder()
        .WithUrl(Navigation.ToAbsoluteUri("/chathub"), 
            options => { options.AccessTokenProvider = () => Task.FromResult(token?.Value); })
        .Build();

  ...
}
```

## Logging

*This section applies to Blazor WebAssembly apps in ASP.NET Core in .NET 7 or later.*

To enable debug or trace logging, see the *Authentication logging (Blazor WebAssembly)* section in a .NET 7 or later version of the ASP.NET Core Blazor logging article.

## The WebAssembly sandbox

The WebAssembly *sandbox* restricts access to the environment of the system executing WebAssembly code, including access to I/O subsystems, system storage and resources, and the operating system. The isolation between WebAssembly code and the system that executes the code makes WebAssembly a safe coding framework for systems. However, WebAssembly is vulnerable to side-channel attacks at the hardware level. Normal precautions and due diligence in sourcing hardware and placing limitations on accessing hardware apply.

*WebAssembly isn't owned or maintained by Microsoft.*

For more information, see the following W3C resources:

* WebAssembly: Security
* WebAssembly Specification: Security Considerations
* W3C WebAssembly Community Group: Feedback and issues: The W3C WebAssembly Community Group link is only provided for reference, making it clear that WebAssembly security vulnerabilities and bugs are patched on an ongoing basis, often reported and addressed by browser. ***Don't send feedback or bug reports on Blazor to the W3C WebAssembly Community Group.*** Blazor feedback should be reported to the Microsoft ASP.NET Core product unit. If the Microsoft product unit determines that an underlying problem with WebAssembly exists, they take the appropriate steps to report the problem to the W3C WebAssembly Community Group.

## Implementation guidance

Articles under this *Overview* provide information on authenticating users in Blazor WebAssembly apps against specific providers.

Standalone Blazor WebAssembly apps:

* General guidance for OIDC providers and the WebAssembly Authentication Library
* Microsoft Accounts
* Microsoft Entra ID (ME-ID)
* Azure Active Directory (AAD) B2C

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

Further configuration guidance is found in the following articles:

* ASP.NET Core Blazor WebAssembly additional security scenarios
* Use Graph API with ASP.NET Core Blazor WebAssembly

## Use the Authorization Code flow with PKCE

Microsoft identity platform's Microsoft Authentication Library for JavaScript (MSAL) v2.0 or later provides support for the Authorization Code flow with Proof Key for Code Exchange (PKCE) and Cross-Origin Resource Sharing (CORS) for single-page applications, including Blazor.

**Microsoft doesn't recommend using Implicit grant.**

For more information, see the following resources:

* Authentication flow support in MSAL: Implicit grant
* Microsoft identity platform and implicit grant flow: Prefer the auth code flow
* Microsoft identity platform and OAuth 2.0 authorization code flow

## Related content

* Microsoft identity platform documentation
  * General documentation
  * Access tokens
* Configure ASP.NET Core to work with proxy servers and load balancers
  * Using forwarded headers middleware to preserve HTTPS scheme information across proxy servers and internal networks.
  * Additional scenarios and use cases, including manual scheme configuration, request path changes for correct request routing, and forwarding the request scheme for Linux and non-IIS reverse proxies.
* Prerendering with authentication
* WebAssembly: Security
* WebAssembly Specification: Security Considerations
