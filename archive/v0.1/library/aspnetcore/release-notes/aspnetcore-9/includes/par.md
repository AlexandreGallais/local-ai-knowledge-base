---
title: "par"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/par.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# par

### OpenIdConnectHandler adds support for Pushed Authorization Requests (PAR)

We'd like to thank Joe DeCock from Duende Software for adding Pushed Authorization Requests (PAR) to ASP.NET Core's OpenIdConnectHandler. Joe described the background and motivation for enabling PAR in his API proposal as follows:

> Pushed Authorization Requests (PAR) is a relatively new OAuth standard that improves the security of OAuth and OIDC flows by moving authorization parameters from the front channel to the back channel. That is, moving authorization parameters from redirect URLs in the browser to direct machine to machine http calls on the back end.
>
> This prevents a cyberattacker in the browser from:
>
> * Seeing authorization parameters, which could leak PII.
> * Tampering with those parameters. For example, the cyberattacker could change the scope of access being requested.
>
> Pushing the authorization parameters also keeps request URLs short. Authorize parameters can get very long when using more complex OAuth and OIDC features such as Rich Authorization Requests. URLs that are long cause issues in many browsers and networking infrastructures.
>
> The use of PAR is encouraged by the FAPI working group within the OpenID Foundation. For example, the FAPI2.0 Security Profile requires the use of PAR. This security profile is used by many of the groups working on open banking (primarily in Europe), in health care, and in other industries with high security requirements.
>
> PAR is supported by a number of identity providers, including
>
> * Duende IdentityServer
> * Curity
> * Keycloak
> * Authlete

For .NET 9, we have decided to enable PAR by default if the identity provider's discovery document advertises support for PAR, since it should provide enhanced security for providers that support it. The identity provider's discovery document is usually found at `.well-known/openid-configuration`. If this causes problems, you can disable PAR via  OpenIdConnectOptions.PushedAuthorizationBehavior as follows:

```csharp
builder.Services
    .AddAuthentication(options =>
    {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
    })
    .AddCookie()
    .AddOpenIdConnect("oidc", oidcOptions =>
    {
        // Other provider-specific configuration goes here.

        // The default value is PushedAuthorizationBehavior.UseIfAvailable.

        // 'OpenIdConnectOptions' does not contain a definition for 'PushedAuthorizationBehavior'
        // and no accessible extension method 'PushedAuthorizationBehavior' accepting a first argument
        // of type 'OpenIdConnectOptions' could be found
        oidcOptions.PushedAuthorizationBehavior = PushedAuthorizationBehavior.Disable;
    });
```
To ensure that authentication only succeeds if PAR is used, use   PushedAuthorizationBehavior.Require instead. This change also introduces a new OnPushAuthorization event to OpenIdConnectEvents which can be used customize the pushed authorization request or handle it manually. See the API proposal for more details.
