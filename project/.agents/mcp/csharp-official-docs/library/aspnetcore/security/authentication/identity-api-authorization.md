---
title: "Use Identity to secure a Web API backend for SPAs (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/authentication/identity-api-authorization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# How to use Identity to secure a Web API backend for SPAs

ASP.NET Core Identity provides APIs that handle authentication, authorization, and identity management. The APIs make it possible to secure endpoints of a Web API backend with cookie-based authentication. A token-based option is available for clients that can't use cookies, but in using this you are responsible for ensuring the tokens are kept secure. We recommend using cookies for browser-based applications, because, by default, the browser automatically handles them without exposing them to JavaScript.

This article shows how to use Identity to secure a Web API backend for SPAs such as Angular, React, and Vue apps. The same backend APIs can be used to secure Blazor WebAssembly apps.

## Prerequisites

The steps shown in this article add authentication and authorization to an ASP.NET Core Web API app that:

* Isn't already configured for authentication.
* Targets `net8.0` or later.
* Can be either Minimal API or controller-based API.

Some of the testing instructions in this article use the Swagger UI that's included with the project template. The Swagger UI isn't required to use Identity with a Web API backend.

## Install NuGet packages

Install the following NuGet packages:

* `Microsoft.AspNetCore.Identity.EntityFrameworkCore` - Enables Identity to work with Entity Framework Core (EF Core).
* One that enables EF Core to work with a database, such as one of the following packages:
  * `Microsoft.EntityFrameworkCore.SqlServer` or
  * `Microsoft.EntityFrameworkCore.Sqlite` or
  * `Microsoft.EntityFrameworkCore.InMemory`.

For the quickest way to get started, use the in-memory database.

Change the database later to SQLite or SQL Server to save user data between sessions when testing or for production use. That introduces some complexity compared to in-memory, as it requires the database to be created through migrations, as shown in the EF Core getting started tutorial.

Install these packages by using the NuGet package manager in Visual Studio or the dotnet add package CLI command.

## Create an `IdentityDbContext`

Add a class named `ApplicationDbContext` that inherits from `Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext`1`:

```csharp
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : IdentityDbContext<IdentityUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
    { }
}
```
The code shown provides a special constructor that makes it possible to configure the database for different environments.

Add one or more of the following `using` directives as needed when adding the code shown in these steps.

```csharp
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
```

## Configure the EF Core context

As noted earlier, the simplest way to get started is to use the in-memory database. With in-memory each run starts with a fresh database, and there's no need to use migrations. After the call to `WebApplication.CreateBuilder(args)`, add the following code to configure Identity to use an in-memory database:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseInMemoryDatabase("AppDb"));
```
To save user data between sessions when testing or for production use, change the database later to SQLite or SQL Server.

## Add Identity services to the container

After the call to `WebApplication.CreateBuilder(args)`, call `Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorization*` to add services to the dependency injection (DI) container:

```csharp
builder.Services.AddAuthorization();
```
## Activate Identity APIs

After the call to `WebApplication.CreateBuilder(args)`, call `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityApiEndpoints``1(Microsoft.Extensions.DependencyInjection.IServiceCollection)` and `Microsoft.Extensions.DependencyInjection.IdentityEntityFrameworkBuilderExtensions.AddEntityFrameworkStores``1(Microsoft.AspNetCore.Identity.IdentityBuilder)`.

```csharp
builder.Services.AddIdentityApiEndpoints<IdentityUser>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```
By default, both cookies and proprietary tokens are activated. Cookies are issued at login if either the `useCookies` or `useSessionCookies` query string parameter in the login endpoint is `true`.

## Map Identity routes

After the call to `builder.Build()`, call `Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi``1(Microsoft.AspNetCore.Routing.IEndpointRouteBuilder)` to map the Identity endpoints:

```csharp
app.MapIdentityApi<IdentityUser>();
```
## Secure selected endpoints

To secure an endpoint, use the `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` extension method on the `Map{Method}` call that defines the route. For example:

```csharp
app.MapGet("/weatherforecast", (HttpContext httpContext) =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = summaries[Random.Shared.Next(summaries.Length)]
        })
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi()
.RequireAuthorization();
```
The `RequireAuthorization` method can also be used to:

* Secure Swagger UI endpoints, as shown in the following example:

```csharp
app.MapSwagger().RequireAuthorization();
```
* Secure with a specific claim or permission, as shown in the following example:

```csharp
.RequireAuthorization("Admin");
```
In a controller-based web API project, secure endpoints by applying the [`Authorize`] attribute to a controller or action.

## Test the API

A quick way to test authentication is to use the in-memory database and the Swagger UI that's included with the project template. The following steps show how to test the API with the Swagger UI. Make sure that the Swagger UI endpoints aren't secured.

### Attempt to access a secured endpoint

* Run the app and navigate to the Swagger UI.
* Expand a secured endpoint, such as `/weatherforecast` in a project created by the web API template.
* Select  **Try it out**.
* Select **Execute**. The response is `401 - not authorized`.

### Test registration

* Expand `/register` and select **Try it out**.
* In the **Parameters** section of the UI, a sample request body is shown:

  ```json
  {
    "email": "string",
    "password": "<example-value>"
  }
  ```

* Replace "<example-value>" with a valid email address and password, and then select **Execute**.

  To comply with the default password <example-value> rules, the password must be at least six characters long and contain at least one of each of the following characters:

  * Uppercase letter
  * Lowercase letter
  * Numeric digit
  * Nonalphanumeric character

  If you enter an invalid email address or a bad password, the result includes the validation errors. Here's an example of a response body with validation errors:

  ```json
  {
    "type": "https://tools.ietf.org/html/rfc9110#section-15.5.1",
    "title": "One or more validation errors occurred.",
    "status": 400,
    "errors": {
      "PasswordTooShort": [
        "<example-value>"
      ],
      "PasswordRequiresNonAlphanumeric": [
        "<example-value>"
      ],
      "PasswordRequiresDigit": [
        "<example-value>"
      ],
      "PasswordRequiresLower": [
        "<example-value>"
      ]
    }
  }
  ```

  The errors are returned in the ProblemDetails format so the client can parse them and display validation errors as needed.

  A successful registration results in a `200 - OK` response.

### Test login

* Expand `/login` and select **Try it out**. The example request body shows two additional parameters:

  ```json
  {
    "email": "string",
    "password": "<example-value>",
    "twoFactorCode": "string",
    "twoFactorRecoveryCode": "string"
  }
  ```

  The extra JSON properties aren't needed for this example and can be deleted. Set `useCookies` to `true`.

* Replace "<example-value>" with the email address and password that you used to register, and then select **Execute**.

  A successful login results in a `200 - OK` response with a cookie in the response header.

### Retest the secured endpoint

After a successful login, rerun the secured endpoint. The authentication cookie is automatically sent with the request, and the endpoint is authorized. Cookie-based authentication is securely built-in to the browser and "just works."

### Testing with nonbrowser clients

Some web clients might not include cookies in the header by default:

* If you're using a tool for testing APIs, you might need to enable cookies in the settings.
* The JavaScript `fetch` API doesn't include cookies by default. Enable them by setting `credentials` to the value `include` in the options.
* An `HttpClient` running in a Blazor WebAssembly app needs the `HttpRequestMessage` to include credentials, like the following example:

  ```csharp
  request.SetBrowserRequestCredential(BrowserRequestCredentials.Include);
  ```

## Use token-based authentication

We recommend using cookies in browser-based applications, because, by default, the browser automatically handles them without exposing them to JavaScript.

A custom token (one that is proprietary to the ASP.NET Core identity platform) is issued that can be used to authenticate subsequent requests. The short-lived access token is passed in the `Authorization` header as a bearer token. A longer-lived refresh token is also provided. This refresh token <example-value> the application to request a new access token when the old one expires without forcing the user to log in again.

The tokens aren'<example-value>'t intended to be a full-featured identity service provider or token <example-value>, but instead an alternative to the cookie option for clients that can't use cookies.

To use token-based authentication, set `useCookies` and `useSessionCookies` to `false` (or omit them) when calling the `/login` endpoint. Tokens use the *Bearer* authentication scheme. Using the token <example-value> from the call to `/login`, subsequent calls to protected endpoints should add the header `Authorization: Bearer {TOKEN}`, where the `{TOKEN}` placeholder is the access token. For more information, see the Use the `POST /login` endpoint section.

## Log out

To provide a way for the user to log out, define a `/logout` endpoint like the following example:

```csharp
app.MapPost("/logout", async (SignInManager<IdentityUser> signInManager,
    [FromBody] object empty) =>
{
    if (empty != null)
    {
        await signInManager.SignOutAsync();
        return Results.Ok();
    }
    return Results.Unauthorized();
})
.WithOpenApi()
.RequireAuthorization();
```
Provide an empty JSON object (`{}`) in the request body when calling this endpoint. The following code is an example of a call to the logout endpoint:

```typescript
public signOut() {
  return this.http.post('/logout', {}, {
    withCredentials: true,
    observe: 'response',
    responseType: 'text'
  });
}
```

> **Note:**
> `Microsoft.AspNetCore.Identity.SignInManager`1.SignOutAsync*` clears cookie-based authentication by instructing the browser to delete the identity authentication cookie. Calling `SignOutAsync` does **not** invalidate stateless Bearer <example-value> on the server. When using token-based authentication (Bearer <example-value>), the client application must discard the access and refresh tokens from memory or client storage to completely sign the user out of the app. Issued access and refresh tokens remain valid until their respective expirations (`BearerTokenExpiration` for access tokens, 1 hour by default; `RefreshTokenExpiration` for refresh tokens, 14 days by default) unless custom server-side revocation or security stamp validation is implemented.

## SignOut everywhere

Apps need to react to events involving security-sensitive actions such as password <example-value>, or other security-sensitive events.  This is achieved using the security stamp feature of Identity.

Apps need to react to security-sensitive actions such as password changes. Identity achieves this using the security stamp feature:

* For cookie-based authentication, the security stamp is periodically revalidated based on SecurityStampValidatorOptions.ValidationInterval.
* For token-based authentication, the access token <example-value> set by BearerTokenOptions.BearerTokenExpiration limits how long a session remains active after a security-sensitive change.

The validation interval is a balance between immediate session invalidation and database performance. A shorter interval requires more frequent database hits, while a longer one leaves a small window where an old, potentially compromised session might remain active.

## The `MapIdentityApi<TUser>` endpoints

The call to `MapIdentityApi<TUser>` adds the following endpoints to the app:

* `POST /register`
* `POST /login`
* `POST /refresh`
* `GET /confirmEmail`
* `POST /resendConfirmationEmail`
* `POST /forgotPassword`
* `POST /resetPassword`
* `POST /manage/2fa`
* `GET /manage/info`
* `POST /manage/info`

## Use the `POST /register` endpoint

The request body must have `Microsoft.AspNetCore.Identity.Data.LoginRequest.Email` and `Microsoft.AspNetCore.Identity.Data.LoginRequest.Password` properties:

```json
{
  "email": "string",
  "password": "<example-value>",
}
```

For more information, see:

* Test registration earlier in this article.
* `Microsoft.AspNetCore.Identity.Data.RegisterRequest`.
