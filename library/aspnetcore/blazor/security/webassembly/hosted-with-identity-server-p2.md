---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/hosted-with-identity-server.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 2 of 5)

## Parts of the solution

This section describes the parts of a solution generated from the Blazor WebAssembly project template and describes how the solution's **:::no-loc text="Client":::** and **:::no-loc text="Server":::** projects are configured for reference. There's no specific guidance to follow in this section for a basic <example-value> application if you created the app using the guidance in the Walkthrough section. The guidance in this section is helpful for updating an app to authenticate and authorize users. However, an alternative approach to updating an app is to create a new app from the guidance in the Walkthrough section and moving the app's components, classes, and resources to the new app.

### **:::no-loc text="Server":::** app services

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The following services are registered.

* In the `Program` file:

  * Entity Framework Core and ASP.NET Core Identity:

    ```csharp
    builder.Services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlite( ... ));
    builder.Services.AddDatabaseDeveloperPageExceptionFilter();

    builder.Services.AddDefaultIdentity<ApplicationUser>(options => 
            options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();
    ```

  * Identity Server with an additional `Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization*` helper method that sets up default ASP.NET Core conventions on top of Identity Server:

    ```csharp
    builder.Services.AddIdentityServer()
        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();
    ```

  * Authentication with an additional `Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt*` helper method that configures the app to validate JWT tokens produced by Identity Server:

    ```csharp
    builder.Services.AddAuthentication()
        .AddIdentityServerJwt();
    ```

> **Note:**
> When a single authentication scheme is registered, the authentication scheme is automatically used as the app's default scheme, and it isn't necessary to state the scheme to `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` or via `Microsoft.AspNetCore.Authentication.AuthenticationOptions`. For more information, see Overview of ASP.NET Core Authentication and the ASP.NET Core announcement (aspnet/Announcements #490).

* In the `Program` file:

  * The Identity Server middleware exposes the OpenID Connect (OIDC) endpoints:

    ```csharp
    app.UseIdentityServer();
    ```

  * Authorization middleware enables authorization capabilities:

    ```csharp
    app.UseAuthorization();
    ```

### API authorization

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The `Microsoft.Extensions.DependencyInjection.IdentityServerBuilderConfigurationExtensions.AddApiAuthorization*` helper method configures Identity Server for ASP.NET Core scenarios. Identity Server is a powerful and extensible framework for handling app security concerns. Identity Server exposes unnecessary complexity for the most common scenarios. Consequently, a set of conventions and configuration options is provided that we consider a good starting point. Once your authentication needs change, the full power of Identity Server is available to customize authentication to suit an app's requirements.

### Add an authentication handler for an API that coexists with Identity Server

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

The `Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt*` helper method configures a policy scheme for the app as the default authentication handler. The policy is configured to allow Identity to handle all requests routed to any subpath in the Identity URL space under `/Identity`. The `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler` handles all other requests. Additionally, this method:

* Registers an API resource with Identity Server with a default scope of `{PROJECT NAME}API`, where the `{PROJECT NAME}` placeholder is the project's name at app creation.
* Configures the JWT bearer token <example-value> to validate tokens issued by Identity Server for the app.

### Weather forecast controller

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

In the `WeatherForecastController` (`Controllers/WeatherForecastController.cs`), the `[Authorize]` attribute is applied to the class. The attribute indicates that the user must be authorized based on the default policy to access the resource. The default authorization policy is configured to use the default authentication scheme, which is set up by `Microsoft.AspNetCore.Authentication.AuthenticationBuilderExtensions.AddIdentityServerJwt*`. The helper method configures `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerHandler` as the default handler for requests to the app.

### Application database context

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

In the `ApplicationDbContext` (`Data/ApplicationDbContext.cs`), `Microsoft.EntityFrameworkCore.DbContext` extends `Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiAuthorizationDbContext`1` to include the schema for Identity Server. `Microsoft.AspNetCore.ApiAuthorization.IdentityServer.ApiAuthorizationDbContext`1` is derived from `Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityDbContext`.

To gain full control of the database schema, inherit from one of the available Identity `Microsoft.EntityFrameworkCore.DbContext` classes and configure the context to include the Identity schema by calling `builder.ConfigurePersistedGrantContext(_operationalStoreOptions.Value)` in the `Microsoft.EntityFrameworkCore.DbContext.OnModelCreating*` method.

### OIDC configuration controller

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

In the `OidcConfigurationController` (`Controllers/OidcConfigurationController.cs`), the client endpoint is provisioned to serve OIDC parameters.

### App settings

*This section pertains to the solution's **:::no-loc text="Server":::** app.*

In the app settings file (`appsettings.json`) at the project root, the `IdentityServer` section describes the list of configured clients. In the following example, there's a single client. The client name corresponds to the **:::no-loc text="Client":::** app's assembly name and is mapped by convention to the OAuth `ClientId` parameter. The profile indicates the app type being configured. The profile is used internally to drive conventions that simplify the configuration process for the server.

```json
"IdentityServer": {
  "Clients": {
    "{ASSEMBLY NAME}": {
      "Profile": "IdentityServerSPA"
    }
  }
}
```

The `{ASSEMBLY NAME}` placeholder is the **:::no-loc text="Client":::** app's assembly name (for example, `BlazorSample.Client`).

### Authentication package

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

When an app is created to use Individual Accounts (`Individual`), the app automatically receives a package reference for the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package. The package provides a set of primitives that help the app authenticate users and obtain tokens to call protected APIs.

If adding authentication to an app, manually add the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

### `HttpClient` configuration

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

In the `Program` file, a named `System.Net.Http.HttpClient` is configured to supply `System.Net.Http.HttpClient` instances that include access tokens when making requests to the server API. At solution creation, the named `System.Net.Http.HttpClient` is `{PROJECT NAME}.ServerAPI`, where the `{PROJECT NAME}` placeholder is the project's name.

```csharp
builder.Services.AddHttpClient("{PROJECT NAME}.ServerAPI", 
        client => client.BaseAddress = new Uri(builder.HostEnvironment.BaseAddress))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>()
    .CreateClient("{PROJECT NAME}.ServerAPI"));
```

The `{PROJECT NAME}` placeholder is the project name at solution creation. For example, providing a project name of `BlazorSample` produces a named `System.Net.Http.HttpClient` of `BlazorSample.ServerAPI`.

> **Note:**
> If you're configuring a Blazor WebAssembly app to use an existing Identity Server instance that isn't part of a hosted Blazor solution, change the `System.Net.Http.HttpClient` base address registration from `Microsoft.AspNetCore.Components.WebAssembly.Hosting.IWebAssemblyHostEnvironment.BaseAddress` (`builder.HostEnvironment.BaseAddress`) to the server app's API authorization endpoint URL.

### API authorization support

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The support for authenticating users is plugged into the service container by the extension method provided inside the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package. This method sets up the services required by the app to interact with the existing authorization system.

```csharp
builder.Services.AddApiAuthorization();
```

Configuration for the app is loaded by convention from `_configuration/{client-id}`. By convention, the client ID is set to the app's assembly name. This URL can be changed to point to a separate endpoint by calling the overload with options.

### `Imports` file

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `Microsoft.AspNetCore.Components.Authorization` namespace is made available throughout the app via the imports file (`_Imports.razor`):

```razor
...
@using Microsoft.AspNetCore.Components.Authorization
...
```

### `Index` page

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The Index page (`wwwroot/index.html`) page includes a script that defines the `AuthenticationService` in JavaScript. `AuthenticationService` handles the low-level details of the OIDC protocol. The app internally calls methods defined in the script to perform the authentication operations.

```html
<script src="_content/Microsoft.AspNetCore.Components.WebAssembly.Authentication/AuthenticationService.js"></script>
```

### `App` component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `App` component (`App.razor`) is similar to the `App` component found in Blazor Server apps:

* The `Microsoft.AspNetCore.Components.Authorization.CascadingAuthenticationState` component manages exposing the `Microsoft.AspNetCore.Components.Authorization.AuthenticationState` to the rest of the app.
* The `Microsoft.AspNetCore.Components.Authorization.AuthorizeRouteView` component makes sure that the current user is authorized to access a given page or otherwise renders the `RedirectToLogin` component.
* The `RedirectToLogin` component manages redirecting unauthorized users to the login page.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `App` component (`App.razor`) isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `App` component (`App.razor`) in the generated app.
* Inspect the `App` component (`App.razor`) in reference source. Select the version from the branch selector, and search for the component in the `ProjectTemplates` folder of the repository because the `App` component's location has changed over the years.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

### `RedirectToLogin` component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `RedirectToLogin` component (`RedirectToLogin.razor`):

* Manages redirecting unauthorized users to the login page.
* The current URL that the user is attempting to access is maintained so that they can be returned to that page if authentication is successful using:
  * Navigation history state in ASP.NET Core in .NET 7 or later.
  * A query string in ASP.NET Core in .NET 6 or earlier.

Inspect the `RedirectToLogin` component in reference source. The location of the component changed over time, so use GitHub search tools to locate the component.

### `LoginDisplay` component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `LoginDisplay` component (`LoginDisplay.razor`) is rendered in the `MainLayout` component (`MainLayout.razor`) and manages the following behaviors:

* For authenticated users:
  * Displays the current user name.
  * Offers a link to the user profile page in ASP.NET Core Identity.
  * Offers a button to log out of the app.
* For anonymous users:
  * Offers the option to register.
  * Offers the option to log in.

Due to changes in the framework across releases of ASP.NET Core, Razor markup for the `LoginDisplay` component isn't shown in this section. To inspect the markup of the component for a given release, use ***either*** of the following approaches:

* Create an app provisioned for authentication from the default Blazor WebAssembly project template for the version of ASP.NET Core that you intend to use. Inspect the `LoginDisplay` component in the generated app.
* Inspect the `LoginDisplay` component in reference source. The location of the component changed over time, so use GitHub search tools to locate the component. The templated content for `Hosted` equal to `true` is used.

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
