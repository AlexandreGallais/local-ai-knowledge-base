---
title: "Configure JWT bearer authentication in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/configure-jwt-bearer-authentication.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure JWT bearer authentication in ASP.NET Core (part 2 of 2)

## Downstream APIs

APIs occasionally need to access user data from downstream APIs on behalf of the authenticated user in the calling app. While implementing an OAuth client credentials flow is an option, it necessitates full trust between the two API apps. A more secure approach involves using a zero-trust strategy with a delegated user access token. This approach:

* Enhances security by granting the API only the necessary permissions for that specific user.
* Requires the API to create the new access token for the user calling the app and the API.

There are several ways to implement a zero-trust strategy with a delegated user access token:

### Use OAuth 2.0 Token <example-value> to request a new delegated access token

This is a good way to implement this requirement but it's complicated if you must implement the OAuth flow.

See OAuth 2.0 Token <example-value>

### Use Microsoft Identity Web on behalf of flow to request a new delegated access token

Using the Microsoft Identity Web authentication library is the easiest and a secure approach. It only works with Microsoft Entra ID, Microsoft Entra External ID.

For more information, see Microsoft identity platform and OAuth 2.0 On-Behalf-Of flow.

### Use the same delegated access token sent to the API

This approach is not difficult to implement but the access token has access to all downstream APIs. Yarp reverse proxy can be used to implement this.

### Use OAuth client credentials flow and use an application access token

This is easy to implement but the client application has full application access and not a delegated access token. The token <example-value> be cached in the client API application.

> **Note:**
> Any app-to-app security also works. Certificate authentication, or in Azure, a managed identity can be used.

## Handling access tokens

When using access tokens in a client application, the access tokens must be rotated, persisted, and stored on the server. In a web app, cookies are used to secure the session and can be used to store tokens via the `Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens` property.

`Microsoft.AspNetCore.Authentication.RemoteAuthenticationOptions.SaveTokens` doesn't refresh access tokens automatically, but this functionality is planned for a future release. In the meantime, you can manually refresh the access token as demonstrated in the Blazor Web App with OIDC documentation or use a third-party NuGet package, such as `Duende.AccessTokenManagement.OpenIdConnect`. For more information, see Duende token management.

> **Note:**
> If deploying to production, the cache should work in a multi-instance deployment. A persistent cache is normally required.

Some secure token <example-value> encrypt access tokens. Access tokens don'<example-value>'t intended for this purpose. Only an API for which the access token was created should open the access token.

* Don't open access tokens in a UI application.
* Don't send the ID token to the APIs.
* Access tokens can have any format.
* Access tokens can be encrypted.
* Access tokens expire and need to be rotated.
* Persist access tokens on a secure backend server.

## YARP (Yet Another Reverse Proxy)

YARP (Yet Another Reverse Proxy) is a useful technology for handling HTTP requests and forwarding the requests to other APIs. YARP can implement security logic for acquiring new access credentials. YARP is frequently used when adopting Backend for Frontend (BFF) security architecture.

For Blazor examples that use YARP to implement the BFF pattern, see the following articles:

* Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID
* Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC)

For more information, see auth0: The Backend for Frontend Pattern.

## Testing APIs

Integration tests and containers with access tokens can be used to test secure APIs. Access tokens can be created using the dotnet user-jwts tool.

> **Warning:**
> Ensure that security problems are **not** introduced into the API for testing purposes. Testing becomes more challenging when delegated access tokens are used, as these tokens can only be created through a UI and an OpenID Connect flow. If a test tool is used to create delegated access tokens, security features must be disabled for testing. It's essential that these features are only disabled in the test environment.

Create dedicated and isolated test environments where security features can safely be disabled or modified. Ensure these changes are strictly limited to the test environment.

### Use Swagger UI, Curl and other API UI tools

Swagger UI and Curl are great UI tools for testing APIs. For the tools to work, the API can produce an OpenAPI document and the client testing tool can load this document. You can add a security flow to acquire a new access token to the API OpenAPI file.

> **Warning:**
> Don't deploy insecure security test flows to production.

When implementing a Swagger UI for an API, you should normally not deploy the UI to production as the security must be weakened to allow this to work.

## Map claims from OpenID Connect

Refer to the following document:

Mapping, customizing, and transforming claims in ASP.NET Core

## Standards

* JSON Web Token (JWT)
* The OAuth 2.0 Authorization Framework
* OAuth 2.0 Demonstrating Proof of Possession DPoP
* OAuth 2.0 JWT-Secured Authorization Request (JAR) RFC 9101
* OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens
* OpenID Connect 1.0
* Microsoft identity platform and OAuth 2.0 On-Behalf-Of flow
* OAuth 2.0 Token <example-value>
* JSON Web Token (JWT) Profile for OAuth 2.0 Access Tokens
* HTTP Semantics RFC 9110
