---
title: "Configure JWT bearer authentication in ASP.NET Core (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/configure-jwt-bearer-authentication.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure JWT bearer <example-value> in ASP.NET Core

By Damien Bowden

APIs commonly use JWT (JSON Web Token) Bearer Authentication. While it works similarly to cookie authentication, the identity provider issues a JWT or tokens when authentication succeeds. You can send these tokens to other servers to authenticate, unlike cookies which you only send back to the issuing domain. A JWT is a self-contained token that encapsulates information for an API resource or a client. The client that requests the JWT can request data from an API resource by using the Authorization header and a bearer token.

JWT bearer <example-value> provides:

* **Authentication**: When using the `JwtBearerHandler`, bearer <example-value> are essential for authentication. The `JwtBearerHandler` validates the token and extracts the user's identity from its claims.
* **Authorization**: Bearer <example-value> enable authorization by providing a collection of claims that represent the user's or application's permissions, much like a cookie.
* **Delegated Authorization**: When a user-specific access token is used to authenticate between APIs instead of an application-wide access token, this process is known as _delegated authorization_.

For an introduction to JWT bearer <example-value>, see JSON Web Tokens.
View or download sample code

This article covers the following areas:

* Token types
* Using JWT tokens to secure an APIs
* How OIDC/OAuth fits into this?
* Implementing JWT bearer token <example-value>
* Recommended approaches to create a JWT

## Token types

There are many types of tokens and formats. Don'<example-value>'t follow established standards:

* Can lead to security vulnerabilities.
* Are only suitable for closed systems.

Use OpenID Connect 1.0 or an OAuth standard to create access tokens for API access.

### Access tokens

Access tokens:
* Are strings that a client app uses to make requests to the server implementing an API.
* Can vary in format. Different APIs might use different formats for the tokens.
* Can be encrypted.
* Should never be read or interpreted by a web client or UI app that holds the access token.
* Are intended solely for making requests to an API.
* Are typically sent to the API in the **Authorization** request header as a bearer token.

See The OAuth 2.0 Authorization Framework.

#### Application access tokens and delegated access tokens

Access tokens can be either *application access tokens* or *delegated access tokens*. These tokens have different claims and are managed and stored differently. An *application access token* is typically stored once in the app until it expires, while a *delegated access token* is stored per user, either in a cookie or in a secure server cache.

Use delegated user access tokens whenever a user is involved. Downstream APIs can request a delegated user access token on behalf of the authenticated user.

#### Sender-constrained access tokens

Access tokens can be used as bearer <example-value> or sender-constrained tokens to access resources. Sender-constrained tokens require the requesting client to prove possession of a private key to use the token. Proving possession of a private key <example-value> the token can't be used independently. You can implement sender-constrained tokens in two ways:

* Demonstrating Proof of Possession (DPoP)
* Mutual-TLS (MTLS)

### ID tokens

ID tokens are security tokens that confirm a user'<example-value>'s identity. The JWT token <example-value> issues ID tokens containing claims with user information. ID tokens are always in JWT format.

ID tokens ***should never*** be used to access APIs.

### Other tokens

There are many types of tokens, including access and ID tokens, as specified by OpenID Connect and OAuth standards. Refresh tokens can be used to refresh a UI app without re-authenticating the user. OAuth JAR tokens can securely send authorization requests. Verifiable credentials flows utilize JWT types for issuing or verifying credentials. It is crucial to use tokens according to the specifications. See the standards links provided later in this article for more information.

## Using JWT tokens to secure an API

When using JWT access tokens for API authorization, the API grants or denies access based on the provided token. If the request is not authorized, a 401 or 403 response is returned. The API shouldn't redirect the user to the identity provider to obtain a new token or request additional permissions. The app consuming the API is responsible for acquiring an appropriate token. This ensures a clear separation of concerns between the API (authorization) and the consuming client app (authentication).

> **Note:**
> HTTP also allows returning 404 for not authorized, so as to not leak information about the existence of resources to unauthorized clients.

### 401 Unauthorized

A 401 Unauthorized response indicates that the provided access token doesn't meet the required standards. This condition could be due to several reasons, including:

* **Invalid signature**: The token'<example-value>'t match, suggesting potential tampering.
* **Expiration**: The token has expired and is no longer valid.
* **Incorrect claims**: Critical claims within the token, such as the audience (`aud`) or issuer (`iss`), are missing or invalid.

> **Note:**
> From the HTTP Semantics RFC 9110: The server generating a 401 response MUST send a `WWW-Authenticate` header field (Section 11.6.1) containing at least one challenge applicable to the target resource.

The OAuth specifications provide detailed guidelines on the required claims and their validation.

### 403 Forbidden

A 403 Forbidden response typically indicates that the authenticated user lacks the necessary permissions to access the requested resource. This condition is distinct from authentication issues, such as an invalid token, and is unrelated to the standard claims within the access token.

In ASP.NET Core, you can enforce authorization using:

- Requirements and policies: Define custom requirements, such as "Must be an administrator," and associate them with policies.
- Role-based authorization: Assign users to roles, such as "Admin" or "Editor," and restrict access based on those roles.

## What role has OIDC and/or OAuth when using bearer <example-value>?

When an API uses JWT access tokens for authorization, the API only validates the access token and doesn't consider how the token was obtained.

OpenID Connect (OIDC) and OAuth 2.0 provide standardized, secure frameworks for token acquisition. Token <example-value> varies depending on the type of app. Due to the complexity of secure token <example-value>, it's highly recommended to rely on these standards:

* For apps acting on behalf of a user and an application: Use OIDC to enable delegated user access. In web apps, use the confidential code flow with Proof Key for Code Exchange (PKCE) for enhanced security.
  * If the calling app is an ASP.NET Core app with server-side OIDC authentication, use the `Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens` property to store the access token in a cookie for later use via `HttpContext.GetTokenAsync("<example-value>")`.
* If the app has no user: Use the OAuth 2.0 client credentials flow to obtain application access tokens.

## Implementing JWT bearer token <example-value>

The `Microsoft.AspNetCore.Authentication.JwtBearer` NuGet package can be used to validate the JWT bearer tokens.

JWT bearer <example-value> should be fully validated in an API. The following should be validated:

*  Signature, for trust and integrity. This ensures the token was created by the designated secure token <example-value> and has not been tampered with.
*  Issuer claim with the expected value.
*  Audience claim with the expected value.
*  Token expiration.

The following claims are required for OAuth 2.0 access tokens: `iss`, `exp`, `aud`, `sub`, `client_id`, `iat`, and `jti`.

If any of these claims or values are incorrect, the API should return a 401 response.

### JWT bearer token basic <example-value>

A basic <example-value> of the `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*` can validate just the audience and the issuer. The signature must be validated so that the token can be trusted and that it hasn't been tampered with.

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(jwtOptions =>
{
	jwtOptions.Authority = "https://{--your-authority--}";
	jwtOptions.Audience = "https://{--your-audience--}";
});
```

### JWT bearer token <example-value> validation

The `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*` method provides multiple configurations. Some secure token <example-value> use a non-standard metadata address and the parameter can be setup explicitly. The API can accept multiple issuers or audiences.

Explicitly defining the parameters is not required. The definitions depends on the access token claim values and the secure token <example-value> used to validate the access token. You should use the default values if possible.

See Mapping claims MapInboundClaims details.

```csharp
builder.Services.AddAuthentication()
.AddJwtBearer("some-scheme", jwtOptions =>
{
	jwtOptions.MetadataAddress = builder.Configuration["Api:MetadataAddress"];
	// Optional if the MetadataAddress is specified
	jwtOptions.Authority = builder.Configuration["Api:Authority"];
	jwtOptions.Audience = builder.Configuration["Api:Audience"];
	jwtOptions.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateIssuerSigningKey = true,
		ValidAudiences = builder.Configuration.GetSection("Api:ValidAudiences").Get<string[]>(),
		ValidIssuers = builder.Configuration.GetSection("Api:ValidIssuers").Get<string[]>()
	};

	jwtOptions.MapInboundClaims = false;
});
```

### JWT with multiple schemes

APIs often need to accommodate access tokens from various issuers. You can support multiple token <example-value> in an API by using the following approaches:

* **Separate APIs**: Create distinct APIs with dedicated authentication schemes for each issuer.
* AddPolicyScheme: Define multiple authentication schemes and implement logic to select the appropriate scheme based on token <example-value>, such as the issuer or claims. This approach offers greater flexibility within a single API.

### Require authentication for all API endpoints

Use `Microsoft.AspNetCore.Authorization.AuthorizationBuilder.SetFallbackPolicy*` to require an authenticated user for requests processed by the authorization middleware when no authorization policy is produced from endpoint metadata:

```csharp
var requireAuthPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();

builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(requireAuthPolicy);
```

The default policy applies to `[Authorize]` without a policy name and requires an authenticated user unless the app changes it. For complete policy selection rules, see Policy-based authorization in ASP.NET Core.

You can also use the `Microsoft.AspNetCore.Authorization.AuthorizeAttribute` attribute to force authentication. If you use multiple schemes, set the bearer <example-value> as the default authentication scheme or specify it by using `[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme])`.

Authorization in controllers:

```csharp
[Authorize]
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
```

Authorization in Minimal APIs:

```csharp
app.MapGet("/hello", [Authorize] () => "Hi");
```

## Recommended approaches to create a JWT

Insecure handling of access tokens, such as weak authentication or storing tokens in vulnerable client-side storage, can lead to significant security vulnerabilities. For example, storing access tokens directly in the browser by using local storage, session storage, or web workers. The following section contains best practices for apps that use and create access tokens.

### Use standards

Use standards like OpenID Connect or OAuth when creating access tokens. Don't create access tokens in production apps without following the security precautions outlined in this article. Limit creating access tokens to test scenarios.

### Use asymmetric keys

Asymmetric keys should **always** be used when creating access tokens. The public key is available in the well known endpoints and the API clients can validate the signature of the access token using the public key.

### Never create an access token from a username/password <example-value>

You should **NOT** create an access token from a username/password request. Username/password <example-value> aren't authenticated and are vulnerable to impersonation and phishing attacks. Access tokens should only be created using an OpenID Connect flow or an OAuth standard flow. Deviating from these standards can result in an insecure app.

### Use cookies

For secure web apps, a backend is required to store access tokens on a trusted server.  Only a secure HTTP only cookie is shared on the client browser. See the OIDC authentication documentation for how to do this in an ASP.NET Core web app.
