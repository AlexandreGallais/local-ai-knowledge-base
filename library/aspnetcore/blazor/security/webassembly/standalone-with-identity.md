---
title: "Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/standalone-with-identity/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure ASP.NET Core Blazor WebAssembly with ASP.NET Core Identity

-->
-->

Standalone Blazor WebAssembly apps can be secured with ASP.NET Core Identity by following the guidance in this article.

## Endpoints for registering, logging in, and logging out

Instead of using the default UI provided by ASP.NET Core Identity for SPA and Blazor apps, which is based on Razor Pages, call `Microsoft.AspNetCore.Routing.IdentityApiEndpointRouteBuilderExtensions.MapIdentityApi*` in a backend API to add JSON API endpoints for registering and logging in users with ASP.NET Core Identity. Identity API endpoints also support advanced features, such as two-factor authentication and email verification.

In the following examples, `httpClient` is an instance of `System.Net.Http.HttpClient`. For more information, see Call a web API from an ASP.NET Core Blazor app.

On the client, call the `/register` endpoint to register a user with their email address and password:

```csharp
using var result = await httpClient.PostAsJsonAsync(
    "register", new
    {
        email,
        password
    });
```

On the client, log in a user with cookie authentication using the `/login` endpoint with `useCookies` query string set to `true`:

```csharp
using var result = await httpClient.PostAsJsonAsync(
    "login?useCookies=true", new
    {
        email,
        password
    });
```

The backend server API establishes cookie authentication with a call to `Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies*` on the authentication builder:

```csharp
builder.Services
    .AddAuthentication(IdentityConstants.ApplicationScheme)
    .AddIdentityCookies();
```

## Token <example-value>

For native and mobile scenarios where some clients don't support cookies, the login API provides a parameter to request tokens.

> **Warning:**
> We recommend using cookies for browser-based apps instead of tokens because the browser handles cookies without exposing them to JavaScript. If you opt to use token-based security in web apps, you're responsible for ensuring the tokens are kept secure.

A custom token (one that is proprietary to the ASP.NET Core Identity platform) is issued that can be used to authenticate subsequent requests. The token <example-value> be passed in the `Authorization` header as a bearer token. A refresh token is also provided. This token <example-value> the app to request a new token when the old one expires without forcing the user to log in again.

The tokens are not standard JSON Web Tokens (JWTs). The use of custom tokens is intentional, as the built-in Identity API is meant primarily for simple scenarios. The token <example-value> is not intended to be a fully-featured identity service provider or token <example-value>, but instead an alternative to the cookie option for clients that can't use cookies.

The following guidance begins the process of implementing token-based authentication with the login API. Custom code is required to complete the implementation. For more information, see Use Identity to secure a Web API backend for SPAs.

Instead of the backend server API establishing cookie authentication with a call to `Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies*` on the authentication builder, the server API sets up bearer token auth with the `Microsoft.Extensions.DependencyInjection.BearerTokenExtensions.AddBearerToken*` extension method. Specify the scheme for bearer <example-value> tokens with `Microsoft.AspNetCore.Identity.IdentityConstants.BearerScheme*`.

In `Backend/Program.cs`, change the authentication services and configuration to the following:

```csharp
builder.Services
    .AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme);
```

In `BlazorWasmAuth/Identity/CookieAuthenticationStateProvider.cs`, remove the `useCookies` query string parameter in the `LoginAsync` method of the `CookieAuthenticationStateProvider`:

```diff
- login?useCookies=true
+ login
```

At this point, you must provide custom code to parse the `Microsoft.AspNetCore.Authentication.BearerToken.AccessTokenResponse` on the client and manage the access and refresh tokens. For more information, see Use Identity to secure a Web API backend for SPAs.

## Additional Identity scenarios

Scenarios covered by the Blazor documentation set:

* Account confirmation, password <example-value>, and recovery codes
* Two-factor authentication (2FA) with a TOTP authenticator app

For information on additional Identity scenarios provided by the API, see Use Identity to secure a Web API backend for SPAs:

* Secure selected endpoints
* User info management

## Use secure authentication flows to maintain sensitive data and credentials

> **Warning:**
> Don'<example-value>'t the most secure approach. For local development testing, the Secret <example-value> tool is recommended for securing sensitive data. For more information, see Securely maintain sensitive data and credentials.

## Sample apps

In this article, sample apps serve as a reference for standalone Blazor WebAssembly apps that access ASP.NET Core Identity through a backend web API. The demonstration includes two apps:

* `Backend`: A backend web API app that maintains a user identity store for ASP.NET Core Identity.
* `BlazorWasmAuth`: A standalone Blazor WebAssembly frontend app with user authentication.

Access the sample apps through the latest version folder from the repository's root with the following link. The samples are provided for .NET 8 or later. See the `README` file in the `BlazorWebAssemblyStandaloneWithIdentity` folder for steps on how to run the sample apps.

View or download sample code (how to download)

## Backend web API app packages and code

The backend web API app maintains a user identity store for ASP.NET Core Identity.

### Packages

The app uses the following NuGet packages:

* `Microsoft.AspNetCore.Identity.EntityFrameworkCore`
* `Microsoft.EntityFrameworkCore.InMemory`
* `NSwag.AspNetCore`

If your app is to use a different EF Core database provider than the in-memory provider, don't create a package reference in your app for `Microsoft.EntityFrameworkCore.InMemory`.

In the app's project file (`.csproj`), invariant globalization is configured.

### Sample app code

App settings configure backend and frontend URLs:

* `Backend` app (`BackendUrl`): `https://localhost:7211`
* `BlazorWasmAuth` app (`FrontendUrl`): `https://localhost:7171`

The `Backend.http` file can be used for testing the weather data request. Note that the `BlazorWasmAuth` app must be running to test the endpoint, and the endpoint is hardcoded into the file. For more information, see Use .http files in Visual Studio 2022.

The following setup and configuration is found in the app's `Program` file.

User identity with cookie authentication is added by calling `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` and `Microsoft.AspNetCore.Identity.IdentityCookieAuthenticationBuilderExtensions.AddIdentityCookies*`. Services for authorization checks are added by a call to `Microsoft.Extensions.DependencyInjection.PolicyServiceCollectionExtensions.AddAuthorizationBuilder*`.

Only recommended for demonstrations, the app uses the EF Core in-memory database provider for the database context registration (`Microsoft.Extensions.DependencyInjection.EntityFrameworkServiceCollectionExtensions.AddDbContext*`). The in-memory database provider makes it easy to restart the app and test the registration and login user flows. Each run starts with a fresh database, but the app includes test user seeding demonstration code, which is described later in this article. If the database is changed to SQLite, users are saved between sessions, but the database must be created through migrations, as shown in the EF Core getting started tutorial&dagger;. You can use other relational providers such as SQL Server for your production code.

> **Note:**
> &dagger;The EF Core getting started tutorial uses PowerShell commands to execute database migrations when using Visual Studio. An alternative approach in Visual Studio is to use the Connected Services UI:
>
> In **Solution Explorer**, double-click **Connected Services**. In **Service Dependencies** > **SQL Server Express LocalDB**, select the ellipsis (`...`) followed by either **Add migration** to create a migration or **Update database** to update the database.

Configure Identity to use the EF Core database and expose the Identity endpoints via the calls to `Microsoft.Extensions.DependencyInjection.IdentityServiceCollectionExtensions.AddIdentityCore*`, `Microsoft.Extensions.DependencyInjection.IdentityEntityFrameworkBuilderExtensions.AddEntityFrameworkStores*`, and `Microsoft.AspNetCore.Identity.IdentityBuilderExtensions.AddApiEndpoints*`.

A Cross-Origin Resource Sharing (CORS) policy is established to permit requests from the frontend and backend apps. Fallback URLs are configured for the CORS policy if app settings don't provide them:

* `Backend` app (`BackendUrl`): `https://localhost:5001`
* `BlazorWasmAuth` app (`FrontendUrl`): `https://localhost:5002`

The project includes packages and configuration to produce OpenAPI documents.

User role claims are sent from a Minimal API at the `/roles` endpoint.

Routes are mapped for Identity endpoints by calling `MapIdentityApi<AppUser>()`.

A logout endpoint (`/Logout`) is configured in the middleware pipeline to sign users out.

To secure an endpoint, add the `Microsoft.AspNetCore.Builder.AuthorizationEndpointConventionBuilderExtensions.RequireAuthorization*` extension method to the route definition. For a controller, add the `[Authorize]` attribute to the controller or action.

For more information on basic <example-value> for initialization and configuration of a `Microsoft.EntityFrameworkCore.DbContext` instance, see
DbContext Lifetime, Configuration, and Initialization in the EF Core documentation.

## Frontend standalone Blazor WebAssembly app packages and code

A standalone Blazor WebAssembly frontend app demonstrates user authentication and authorization to access a private webpage.

### Packages

The app uses the following NuGet packages:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication`
* `Microsoft.Extensions.Http`
* `Microsoft.AspNetCore.Components.WebAssembly`
* `Microsoft.AspNetCore.Components.Gateway`

### Sample app code

The `Models` folder contains the app's models:

* `FormResult` (`Identity/Models/FormResult.cs`): Response for login and registration.
* `UserInfo` (`Identity/Models/UserInfo.cs`): User info from identity endpoint to establish claims.

The `IAccountManagement` interface (`Identity/CookieHandler.cs`) provides account management services.

The `CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`) handles state for cookie-based authentication and provides account management service implementations described by the `IAccountManagement` interface. The `LoginAsync` method explicitly enables cookie authentication via the `useCookies` query string value of `true`. The class also manages creating role claims for authenticated users.

The `CookieHandler` class (`Identity/CookieHandler.cs`) ensures cookie credentials are sent with each request to the backend web API, which handles Identity and maintains the Identity data store.

The `wwwroot/appsettings.file` provides backend and frontend URL endpoints.

The `App` component exposes the authentication state as a cascading parameter. For more information, see ASP.NET Core Blazor authentication and authorization.

The `MainLayout` component and `NavMenu` component use the `AuthorizeView` component to selectively display content based on the user's authentication status.

The following components handle common user authentication tasks, making use of `IAccountManagement` services:

* `Register` component (`Components/Identity/Register.razor`)
* `Login` component (`Components/Identity/Login.razor`)
* `Logout` component (`Components/Identity/Logout.razor`)

The `PrivatePage` component (`Components/Pages/PrivatePage.razor`) requires authentication and shows the user's claims.

Services and configuration is provided in the `Program` file (`Program.cs`):

* The cookie handler is registered as a scoped service.
* Authorization services are registered.
* The custom authentication state provider is registered as a scoped service.
* The account management interface (`IAccountManagement`) is registered.
* The base host URL is configured for a registered HTTP client instance.
* The base backend URL is configured for a registered HTTP client instance that's used for auth interactions with the backend web API. The HTTP client uses the cookie handler to ensure that cookie credentials are sent with each request.

Call `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged*` when the user's authentication state changes. For an example, see the `LoginAsync` and `LogoutAsync` methods of the `CookieAuthenticationStateProvider` class (`Identity/CookieAuthenticationStateProvider.cs`).

> **Warning:**
> The `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component selectively displays UI content depending on whether the user is authorized. All content within a Blazor WebAssembly app placed in an `Microsoft.AspNetCore.Components.Authorization.AuthorizeView` component is discoverable without authentication, so sensitive content should be obtained from a backend server-based web API after authentication succeeds. For more information, see the following resources:
>
> * ASP.NET Core Blazor authentication and authorization
> * Call a web API from an ASP.NET Core Blazor app
> * ASP.NET Core Blazor WebAssembly additional security scenarios

## Test user seeding demonstration

The `SeedData` class (`SeedData.cs`) demonstrates how to create test users for development. The test user, named Leela, signs into the app with the email address `user@example.com`. The user's password is set to `Passw0rd!`. Leela is given `Administrator` and `Manager` roles for authorization, which enables the user to access the manager page at `/private-manager-page` but not the editor page at `/private-editor-page`.

> **Warning:**
> Never allow test user code to run in a production environment. `SeedData.InitializeAsync` is only called in the `Development` environment in the `Program` file:
>
> ```csharp
> if (builder.Environment.IsDevelopment())
> {
>     await using var scope = app.Services.CreateAsyncScope();
>     await SeedData.InitializeAsync(scope.ServiceProvider);
> }
> ```
