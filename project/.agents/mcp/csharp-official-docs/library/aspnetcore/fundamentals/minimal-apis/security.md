---
title: "Authentication and authorization in Minimal APIs"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/security.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Authentication and authorization in Minimal APIs

Minimal APIs support all authentication and authorization options available in ASP.NET Core, and provide extra functionality to improve the experience for managing authentication.

This article describes the support for authentication and authorization in Minimal API applications, and how to configure and test the functionality.

## Review authentication and authorization concepts

Authentication is the process of determining a user's identity while authorization is the process of determining whether a user has access to a resource. Both authentication and authorization scenarios share similar implementation semantics in ASP.NET Core.

* The authentication service, `Microsoft.AspNetCore.Authentication.IAuthenticationService`, handles all authentication and is used by authentication middleware.
* The authorization service, `Microsoft.AspNetCore.Authorization.IAuthorizationService`, manages all authorization and is used by the authorization middleware.

### Authentication service

The authentication service uses registered authentication handlers to complete authentication-related actions. For example, an authentication-related action is authenticating a user or signing out a user. Authentication schemes are names that are used to uniquely identify an authentication handler and its configuration options. Authentication handlers are responsible for implementing the strategies for authentication and generating a user's claims given a particular authentication strategy, such as OAuth or OIDC. The configuration options are unique to the strategy as well and provide the handler with configuration that affects authentication behavior, such as redirect URIs.

### Authorization service

In the authorization layer, there are two strategies for determining user access to resources:

* **Role-based strategies** determine a user's access based on their assigned role, such as `Administrator` or `User`. For more information, see Role-based authorization in ASP.NET Core.

* **Claim-based strategies** determine a user's access based on claims issued by a central authority. For more information, see Claim-based authorization in ASP.NET Core.

In ASP.NET Core, both strategies are captured into an authorization requirement. The authorization service uses authorization handlers to determine whether or not a particular user meets the authorization requirements for a resource.

## Enable authentication in minimal apps

To enable authentication, call the AddAuthentication method to register the required authentication services on the app's service provider.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.Run();
```
Typically, a specific authentication strategy is used. In the following sample, the app is configured with support for JSON Web Token (JWT) bearer-based authentication. This example makes use of the APIs available in the Microsoft.AspNetCore.Authentication.JwtBearer NuGet package.

```csharp
var builder = WebApplication.CreateBuilder(args);
// Requires Microsoft.AspNetCore.Authentication.JwtBearer
builder.Services.AddAuthentication().AddJwtBearer();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.Run();
```
By default, the WebApplication automatically registers the authentication and authorization middleware if certain authentication and authorization services are enabled. In the following sample, it's not necessary to invoke the UseAuthentication or UseAuthorization methods to register the middleware. WebApplication automatically completes the registration after calling the `AddAuthentication` or `AddAuthorization` method.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.Run();
```
In some cases, such as controlling middleware order, it's necessary to explicitly register authentication and authorization. In the following sample, the authentication middleware runs _after_ the CORS middleware runs. For more information on middleware and this automatic behavior, see Middleware in ASP.NET Core apps.

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddAuthentication().AddJwtBearer();
builder.Services.AddAuthorization();

var app = builder.Build();

app.UseCors();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/", () => "Hello World!");
app.Run();
```
### Configure authentication strategy

Authentication strategies typically support various configurations that are loaded via options. Minimal apps support loading options from configuration for the following authentication strategies:

* JWT bearer-based authentication
* OpenID Connect-based authentication

The ASP.NET Core framework expects to find these options under the `Authentication:Schemes:{SchemeName}` section in the configuration. In the following sample, two different schemes, `Bearer` and `LocalAuthIssuer`, are defined with their respective options. The `Authentication:DefaultScheme` option can be used to configure the default authentication strategy.

```json
{
  "Authentication": {
    "DefaultScheme":  "LocalAuthIssuer",
    "Schemes": {
      "Bearer": {
        "ValidAudiences": [
          "https://localhost:7259",
          "http://localhost:5259"
        ],
        "ValidIssuer": "dotnet-user-jwts"
      },
      "LocalAuthIssuer": {
        "ValidAudiences": [
          "https://localhost:7259",
          "http://localhost:5259"
        ],
        "ValidIssuer": "local-auth"
      }
    }
  }
}
```

In the _Program.cs_ file, two JWT bearer-based authentication strategies are registered with the following scheme names:

* "Bearer"
* "LocalAuthIssuer"

"Bearer" is the typical default scheme in JWT-bearer based enabled apps. However, you can override the default scheme by setting the `DefaultScheme` property as shown in the previous example.

The scheme name is used to uniquely identify an authentication strategy. The name is also used as the lookup key when resolving authentication options from config, as shown in the following example:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthentication()
  .AddJwtBearer()
  .AddJwtBearer("LocalAuthIssuer");
  
var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.Run();
```
## Configure authorization policies in minimal apps

Authentication identifies and validates the identity of users against an API. Authorization validates and verifies access to resources in an API. The `IAuthorizationService` service registered by the `AddAuthorization` extension method facilitates the authorization. In the following scenario, a `/hello` resource is added that requires a user to present an `admin` role claim with a `greetings_api` scope claim.

Configuration of the authorization requirements on a resource is a two-step process:

1. Define the authorization requirements in a policy globally.
1. Apply individual policies to resources.

In the following code, the `Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorizationBuilder*` method is invoked, which:

* Adds authorization-related services to the DI container.
* Returns an `Microsoft.AspNetCore.Authorization.AuthorizationBuilder` object that can be used to directly register authorization policies.

The code creates a new authorization policy named `admin_greetings` that encapsulates two authorization requirements:

* A role-based requirement via the `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireRole*` for users with an `admin` role.
* A claim-based requirement via the `Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder.RequireClaim*` for which the user must provide a `greetings_api` scope claim.

The `admin_greetings` policy is provided as a required policy to the `/hello` endpoint:

```csharp
using Microsoft.Identity.Web;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorizationBuilder()
  .AddPolicy("admin_greetings", policy =>
        policy
            .RequireRole("admin")
            .RequireClaim("scope", "greetings_api"));

var app = builder.Build();

app.MapGet("/hello", () => "Hello world!")
  .RequireAuthorization("admin_greetings");

app.Run();
```
## Use 'dotnet user-jwts' for development testing

The examples in this article use an app configured with JWT-bearer based authentication. JWT bearer-based authentication requires clients to present a token in the request header, which is used to validate their identity and claims. Typically, a central authority like an identity server issues the tokens.

For development on the local machine, the dotnet user-jwts command-line tool can be used to create bearer tokens.

```dotnetcli
dotnet user-jwts create
```

> **Note:**
> When invoked on a project, the tool automatically adds the authentication options that match the generated token to the _appsettings.json_ file.

Tokens can be configured with various customizations. For example, to create a token for the `admin` role and `greetings_api` scope expected by the authorization policy in the preceding code, run the tool as follows:

```dotnetcli
dotnet user-jwts create --scope "greetings_api" --role "admin"
```

The generated token can then be sent as part of the header in the testing tool of choice. For example, to send the token with curl:

```dotnetcli
curl -i -H "<example-value>" https://localhost:{port}/hello
```

## Related content

* The authentication service (`IAuthenticationService`)
* The authorization service (`IAuthorizationService`)
* ASP.NET Core middleware
* Generate tokens with dotnet user-jwts
