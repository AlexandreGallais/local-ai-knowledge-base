---
title: "ASP.NET Core Blazor additional server-side security scenarios (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor additional server-side security scenarios (part 3 of 4)

## Opaque (reference) access token support

The guidance in this section explains how to implement opaque (reference) access token support, which offers the following advantages over JSON Web Tokens (JWTs):

* Strict revocation: Invalidate access tokens at any time before they naturally expire.
* Token size limits: Store a large number of user claims in the token to avoid a prohibitively large JWT.
* Security: Prevent API consumers or third parties from reading access token claims.

> **Note:**
> The following guidance requires an authentication server that supports opaque (reference) access tokens. Currently, Microsoft Entra doesn't support opaque access token validation. Keycloak and Okta issue JWT access tokens by default. The opaque token handler in this section still works against Keycloak and Okta because it relies only on RFC 7662 introspection. "Opaque" in this section describes how the client treats the token rather than how the server mints it. Alternatively, Duende IdentityServer can be configured to only issue opaque tokens.
>
> When testing this pattern against Keycloak, the API's introspection client must be a different OIDC client than the one that issued the user's access token. Introspecting a token using the client that minted it returns `{"active": false}` with "`Access token JWT check failed`" in the server's log. This doesn't happen naturally for the following scenario because the Blazor Web App and the Minimal API (`MinimalApiJwt`) are separate clients.

`Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*` supports opaque tokens because it doesn't perform access token validation when configured for Proof Key for Code Exchange (PKCE) authorization code flow. It relies on the ASP.NET Core server's HTTPS backchannel to the OIDC authentication service to obtain the ID token using the authorization code received when the user redirects back to the ASP.NET Core app after signing in. If the app is only required to log a user in with OIDC to get a valid authentication cookie, opaque access tokens are supported without modifying the app.

A failure occurs only when the opaque token acquired by `Microsoft.Extensions.DependencyInjection.OpenIdConnectExtensions.AddOpenIdConnect*` is passed to another service that attempts to validate it with `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*`. Unlike self-contained JWTs, opaque tokens require a request to an authorization server to validate the status and to retrieve the claims. To work around this limitation, either use a third-party API, such as the Duende Introspection Authentication Handler, or create a custom `AuthenticationHandler` to validate the token.

> **Important:**
> Duende Software and Okta aren't owned or controlled by Microsoft and might require you to pay a license fee for production use of their services and libraries.

The following `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1` and associated configuration and helper code is provided as a general approach, which might require further development to suit a specific authorization server's requirements. The following handler extracts the opaque token from the `Authorization` header for an HTTP call to an authorization server's introspection endpoint and creates an `Microsoft.AspNetCore.Authentication.AuthenticationTicket` containing the user's claims.

Calling an authorization server's introspection endpoint requires authentication. The following example relies on setting the client secret for authentication in the request's Authorization header (base64 encoded credentials) using the Secret Manager tool for local development and testing.

> **Warning:**
> Don't store app secrets, connection strings, credentials, passwords, personal identification numbers (PINs), private C#/.NET code, or private keys/tokens in client-side code, which is ***always insecure***. In test/staging and production environments, server-side Blazor code and web APIs should use secure authentication flows that avoid maintaining credentials within project code or configuration files. Outside of local development testing, we recommend avoiding the use of environment variables to store sensitive data, as environment variables aren't the most secure approach. For local development testing, the Secret Manager tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

In the following handler, the authorization server's introspection endpoint client secret uses the configuration key `Authentication:Schemes:OpaqueTokenAuthentication:ClientSecret`. For production apps, consider using *client assertions*. For more information, see Confidential client assertions (Microsoft Entra documentation).

If the Blazor server project hasn't been initialized for the Secret Manager tool, use a command shell, such as the Developer PowerShell command shell in Visual Studio, to execute the following command. Before executing the command, change the directory with the `cd` command to the server project's directory. The command establishes a user secrets identifier (`<UserSecretsId>` in the server app's project file):

```dotnetcli
dotnet user-secrets init
```

Execute the following command to set the client secret for the authorization server. The `{SECRET}` placeholder is the client secret:

```dotnetcli
dotnet user-secrets set "Authentication:Schemes:OpaqueTokenAuthentication:ClientSecret" "{SECRET}"
```

If using Visual Studio, you can confirm the secret is set by right-clicking the server project in **Solution Explorer** and selecting **Manage User Secrets**.

`Extensions/HttpRequestExtensions.cs`:

```csharp
namespace MinimalApiJwt.Extensions;

public static class HttpRequestExtensions
{
    public static string? ExtractBearerToken(this HttpRequest request)
    {
        var authorizationHeader = request.Headers.Authorization.ToString();

        if (!string.IsNullOrEmpty(authorizationHeader) &&
            authorizationHeader.StartsWith("Bearer ",
            StringComparison.OrdinalIgnoreCase))
        {
            var token = authorizationHeader["Bearer ".Length..].Trim();

            if (!string.IsNullOrEmpty(token))
            {
                return token;
            }
        }

        return null;
    }
}
```

`Authentication/OpaqueTokenAuthenticationOptions.cs`:

```csharp
using Microsoft.AspNetCore.Authentication;

namespace MinimalApiJwt.Authentication;

public class OpaqueTokenAuthenticationOptions : AuthenticationSchemeOptions
{
    public const string DefaultScheme = "OpaqueTokenAuthentication";
    public string? IntrospectionEndpoint { get; set; }
    public string? ClientId { get; set; }
    public string? ClientSecret { get; set; }
}
```

The following handler attempts to validate an opaque (reference) access token. An HTTP call is made to the authorization server's introspection endpoint with the token and the API's credentials. The response is processed to determine if the token is valid:

* If the token is valid, an `Microsoft.AspNetCore.Authentication.AuthenticationTicket` is created containing the user's claims.
* If the token is invalid, a failed authorization result is returned.

The handler's options (`Options`) is an instance of `OpaqueTokenAuthenticationOptions` provided by the `Microsoft.AspNetCore.Authentication.AuthenticationHandler`1` base type, which is configured in the app's `Program` file with the authorization server's introspection endpoint and the API's client ID. The API's client secret is provided by the Secret Manager tool during development.

`IOptionsMonitor<OpaqueTokenAuthenticationOptions>` (`optionsMonitor`) isn't used directly by the handler, but it could be used to support dynamic configuration changes at runtime.

For the request's content in `System.Net.Http.FormUrlEncodedContent`, some servers require a token type hint (`token_type_hint`). For example, the required value might be `access_token`. See your authentication server's documentation for details.

`Authentication/OpaqueTokenAuthenticationHandler.cs`:

```csharp
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text.Encodings.Web;
using System.Text.Json;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using MinimalApiJwt.Extensions;

namespace MinimalApiJwt.Authentication;

public class OpaqueTokenAuthenticationHandler(
    IOptionsMonitor<OpaqueTokenAuthenticationOptions> optionsMonitor,
    ILoggerFactory logger,
    UrlEncoder encoder,
    IHttpClientFactory httpClientFactory)
    : AuthenticationHandler<OpaqueTokenAuthenticationOptions>(optionsMonitor,
        logger, encoder)
{
    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var opaqueToken = Request.ExtractBearerToken();

        if (opaqueToken is null)
        {
            var failedResult = AuthenticateResult.Fail(
                "Bearer token not found in Authorization header.");
            return failedResult;
        }

        var introspectionUri = Options.IntrospectionEndpoint;
        var clientId = Options.ClientId;
        var clientSecret = Options.ClientSecret;

        if (string.IsNullOrWhiteSpace(introspectionUri) ||
            string.IsNullOrWhiteSpace(clientId) ||
            string.IsNullOrWhiteSpace(clientSecret))
        {
            var failedResult = AuthenticateResult.Fail(
                "Opaque token authentication isn't fully configured.");
            return failedResult;
        }

        using var client = httpClientFactory.CreateClient();

        // Set the Authorization header (base64 encoded credentials)
        var authString = Convert.ToBase64String(
            System.Text.Encoding.ASCII.GetBytes($"{clientId}:{clientSecret}"));
        client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Basic", authString);

        // Prepare the form-encoded body containing the token
        var content = new FormUrlEncodedContent(
        [
            new KeyValuePair<string, string>("token", opaqueToken)
        ]);

        // Post to the introspection endpoint
        var response = await client.PostAsync(introspectionUri, content);

        if (!response.IsSuccessStatusCode)
        {
            var failedResult = AuthenticateResult.Fail(
                "Introspection endpoint failure.");

            return failedResult;
        }

        // Parse the JSON response
        var responseString = await response.Content.ReadAsStringAsync();
        using var doc = JsonDocument.Parse(responseString);

        // The 'active' property determines if the token is valid and not expired
        var tokenIsValid =
            doc.RootElement.TryGetProperty("active", out var activeProperty) &&
            activeProperty.ValueKind == JsonValueKind.True;

        if (tokenIsValid)
        {
            // Map standard introspection response fields onto claims.
            // Field names below match what Keycloak, Duende IdentityServer,
            // Auth0, and Okta return; adjust the role source for your provider.
            var claims = new List<Claim>();

            string? Get(string name) =>
                doc.RootElement.TryGetProperty(name, out var v) &&
                v.ValueKind == JsonValueKind.String ? v.GetString() : null;

            var sub = Get("sub");
            var username = Get("preferred_username") ?? Get("username") ?? sub;

            if (sub is not null) claims.Add(new Claim(ClaimTypes.NameIdentifier, sub));
            if (username is not null) claims.Add(new Claim(ClaimTypes.Name, username));
            if (Get("email") is { } email) claims.Add(new Claim(ClaimTypes.Email, email));
            if ((Get("client_id") ?? Get("azp")) is { } cid)
                claims.Add(new Claim("client_id", cid));
            if (Get("scope") is { } scope)
                foreach (var s in scope.Split(' ', StringSplitOptions.RemoveEmptyEntries))
                    claims.Add(new Claim("scope", s));

            // Keycloak surfaces realm roles under realm_access.roles.
            // Duende/IdentityServer uses a flat "role" claim; Auth0 uses a
            // configurable custom claim. Adjust for your authorization server.
            if (doc.RootElement.TryGetProperty("realm_access", out var ra) &&
                ra.ValueKind == JsonValueKind.Object &&
                ra.TryGetProperty("roles", out var roles) &&
                roles.ValueKind == JsonValueKind.Array)
            {
                foreach (var r in roles.EnumerateArray())
                    if (r.ValueKind == JsonValueKind.String)
                        claims.Add(new Claim(ClaimTypes.Role, r.GetString()!));
            }

            var identity = new ClaimsIdentity(claims,
                OpaqueTokenAuthenticationOptions.DefaultScheme,
                nameType: ClaimTypes.Name,
                roleType: ClaimTypes.Role);
            var principal = new ClaimsPrincipal(identity);
            var ticket = new AuthenticationTicket(principal,
                OpaqueTokenAuthenticationOptions.DefaultScheme);

            var result = AuthenticateResult.Success(ticket);

            return result;
        }
        else
        {
            var failedResult = AuthenticateResult.Fail("Bearer token invalid.");

            return failedResult;
        }
    }
}
```

> **Note:**
> The preceding approach can be further improved by using the OpenID Connect discovery endpoint and adding a cache for the client's `System.Net.Http.HttpClient` introspection requests.

In the `Program` file:

```csharp
using MinimalApiJwt.Authentication;

...

builder.Services.AddHttpClient();
builder.Services.AddAuthentication()
    .AddScheme<OpaqueTokenAuthenticationOptions, OpaqueTokenAuthenticationHandler>(
        OpaqueTokenAuthenticationOptions.DefaultScheme,
        options =>
        {
            options.IntrospectionEndpoint = "{AUTH SERVER INTROSPECTION URI}";
            options.ClientId = "{API CLIENT ID}";
            options.ClientSecret =
                builder.Configuration[
                    "Authentication:Schemes:OpaqueTokenAuthentication:ClientSecret"];
        });
```

The preceding example's placeholders:

* `{AUTH SERVER INTROSPECTION URI}`: Authentication server's introspection URI
* `{API CLIENT ID}`: API client ID

Values for the authentication server introspection URI (`{AUTH SERVER INTROSPECTION URI}`) and the API client ID (`{API CLIENT ID}`) can be supplied from app settings or any other configuration source.

Tokens are typically invalidated on a logout event using the revocation endpoint. The following example is a starting point for further development:
