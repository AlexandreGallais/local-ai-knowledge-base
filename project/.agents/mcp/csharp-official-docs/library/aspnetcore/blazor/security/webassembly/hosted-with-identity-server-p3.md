---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 3 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/hosted-with-identity-server.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 3 of 5)

### `Authentication` component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The page produced by the `Authentication` component (`Pages/Authentication.razor`) defines the routes required for handling different authentication stages.

The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticatorView` component:

* Is provided by the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package.
* Manages performing the appropriate actions at each stage of authentication.

```razor
@page "/authentication/{action}"
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication

<RemoteAuthenticatorView Action="@Action" />

@code {
    [Parameter]
    public string? Action { get; set; }
}
```

> **Note:**
> Nullable reference types (NRTs) and .NET compiler null-state static analysis is supported in ASP.NET Core in .NET 6 or later. Prior to the release of ASP.NET Core in .NET 6, the `string` type appears without the null type designation (`?`).

### `FetchData` component

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

The `FetchData` component shows how to:

* Provision an access token.
* Use the access token to call a protected resource API in the *Server* app.

The `@attribute [Authorize]` directive indicates to the Blazor WebAssembly authorization system that the user must be authorized in order to visit this component. The presence of the attribute in the **`Client`** app doesn't prevent the API on the server from being called without proper credentials. The **`Server`** app also must use `[Authorize]` on the appropriate endpoints to correctly protect them.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken*` takes care of requesting an access token that can be added to the request to call the API. If the token is cached or the service is able to provision a new access token <example-value> user interaction, the token <example-value> succeeds. Otherwise, the token <example-value> fails with an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException`, which is caught in a `try-catch` statement.

In order to obtain the actual token to include in the request, the app must check that the request succeeded by calling `tokenResult.TryGetToken(out var token)`.

If the request was successful, the token <example-value> is populated with the access token. The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessToken.Value` property of the token <example-value> the literal string to include in the `Authorization` request header.

If the token <example-value>'t be provisioned without user interaction resulting in a failed request:

* ASP.NET Core in .NET 7 or later: The app navigates to `AccessTokenResult.InteractiveRequestUrl` using the given `AccessTokenResult.InteractionOptions` to allow refreshing the access token.
* ASP.NET Core in .NET 6 or earlier: The token <example-value> contains a redirect URL. Navigating to this URL takes the user to the login page and back to the current page after a successful authentication.

```razor
@page "/fetchdata"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@using {APP NAMESPACE}.Shared
@attribute [Authorize]
@inject HttpClient Http

...

@code {
    private WeatherForecast[] forecasts;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            forecasts = await Http.GetFromJsonAsync<WeatherForecast[]>("WeatherForecast");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
    }
}
```

## Azure App Service on Linux

Specify the issuer explicitly when deploying to Azure App Service on Linux. For more information, see Use Identity to secure a Web API backend for SPAs.

## Name and role claim with API authorization

### Custom user factory

In the **:::no-loc text="Client":::** app, create a custom user factory. Identity Server sends multiple roles as a JSON array in a single `role` claim. A single role is sent as a string value in the claim. The factory creates an individual `role` claim for each of the user's roles.

`CustomUserFactory.cs`:

```csharp
using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;

public class CustomUserFactory(IAccessTokenProviderAccessor accessor)
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var user = await base.CreateUserAsync(account, options);

        if (user.Identity is not null && user.Identity.IsAuthenticated)
        {
            var identity = (ClaimsIdentity)user.Identity;
            var roleClaims = identity.FindAll(identity.RoleClaimType).ToArray();

            if (roleClaims.Any())
            {
                foreach (var existingClaim in roleClaims)
                {
                    identity.RemoveClaim(existingClaim);
                }

                var rolesElem = 
                    account.AdditionalProperties[identity.RoleClaimType];

                if (options.RoleClaim is not null && rolesElem is JsonElement roles)
                {
                    if (roles.ValueKind == JsonValueKind.Array)
                    {
                        foreach (var role in roles.EnumerateArray())
                        {
                            var roleValue = role.GetString();

                            if (!string.IsNullOrEmpty(roleValue))
                            {
                                identity.AddClaim(
                                  new Claim(options.RoleClaim, roleValue));
                            }
        
                        }
                    }
                    else
                    {
                        var roleValue = roles.GetString();

                        if (!string.IsNullOrEmpty(roleValue))
                        {
                            identity.AddClaim(
                              new Claim(options.RoleClaim, roleValue));
                        }
                    }
                }
            }
        }

        return user;
    }
}
```

In the **:::no-loc text="Client":::** app, register the factory in the `Program` file:

```csharp
builder.Services.AddApiAuthorization()
    .AddAccountClaimsPrincipalFactory<CustomUserFactory>();
```

In the **:::no-loc text="Server":::** app, call `Microsoft.AspNetCore.Identity.IdentityBuilder.AddRoles*` on the Identity builder, which adds role-related services.

In the `Program` file:

```csharp
using Microsoft.AspNetCore.Identity;

...

builder.Services.AddDefaultIdentity<ApplicationUser>(options => 
    options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();
```

### Configure Identity Server

Use **one** of the following approaches:

* API authorization options
* Profile Service

#### API authorization options

In the **:::no-loc text="Server":::** app:

* Configure Identity Server to put the `name` and `role` claims into the ID token and access token.
* Prevent the default mapping for roles in the JWT token handler.

In the `Program` file:

```csharp
using System.IdentityModel.Tokens.Jwt;

...

builder.Services.AddIdentityServer()
    .AddApiAuthorization<ApplicationUser, ApplicationDbContext>(options => {
        options.IdentityResources["openid"].UserClaims.Add("name");
        options.ApiResources.Single().UserClaims.Add("name");
        options.IdentityResources["openid"].UserClaims.Add("role");
        options.ApiResources.Single().UserClaims.Add("role");
    });

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("<example-value>");
```

#### Profile Service

In the **:::no-loc text="Server":::** app, create a `ProfileService` implementation.

`ProfileService.cs`:

```csharp
using IdentityModel;
using Duende.IdentityServer.Models;
using Duende.IdentityServer.Services;

public class ProfileService : IProfileService
{
    public ProfileService()
    {
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var nameClaim = context.Subject.FindAll(JwtClaimTypes.Name);
        context.IssuedClaims.AddRange(nameClaim);

        var roleClaims = context.Subject.FindAll(JwtClaimTypes.Role);
        context.IssuedClaims.AddRange(roleClaims);

        await Task.CompletedTask;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
        await Task.CompletedTask;
    }
}
```

In the **:::no-loc text="Server":::** app, register the Profile Service in the `Program` file:

```csharp
using Duende.IdentityServer.Services;

...

builder.Services.AddTransient<IProfileService, ProfileService>();

JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Remove("<example-value>");
```

### Use authorization mechanisms

In the **:::no-loc text="Client":::** app, component authorization approaches are functional at this point. Any of the authorization mechanisms in components can use a role to authorize the user:

* `AuthorizeView` component (Example: `<AuthorizeView Roles="Admin">`)
* `[Authorize]` attribute directive (`Microsoft.AspNetCore.Authorization.AuthorizeAttribute`) (Example: `@attribute [Authorize(Roles = "Admin")]`)
* Procedural logic (Example: `if (user.IsInRole("Admin")) { ... }`)

  Multiple role tests are supported:

  ```csharp
  if (user.IsInRole("Admin") && user.IsInRole("Developer"))
  {
      ...
  }
  ```

`User.Identity.Name` is populated in the **:::no-loc text="Client":::** app with the user's user name, which is usually their sign-in email address.

## `UserManager` and `SignInManager`

Set the user identifier claim type when a Server app requires:

* `Microsoft.AspNetCore.Identity.UserManager`1` or `Microsoft.AspNetCore.Identity.SignInManager`1` in an API endpoint.
* `Microsoft.AspNetCore.Identity.IdentityUser` details, such as the user's name, email address, or lockout end time.

In `Program.cs` for ASP.NET Core in .NET 6 or later:

```csharp
using System.Security.Claims;

...

builder.Services.Configure<IdentityOptions>(options => 
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier);
```

In `Startup.ConfigureServices` for .NET 5 or earlier:

```csharp
using System.Security.Claims;

...

services.Configure<IdentityOptions>(options => 
    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier);
```

The following `WeatherForecastController` logs the `Microsoft.AspNetCore.Identity.IdentityUser`1.UserName` when the `Get` method is called.

> **Note:**
> The following example uses:
>
> * A file-scoped namespace, which is a C# 10 or later (.NET 6 or later) feature.
> * A primary constructor, which is a C# 12 or later (.NET 8 or later) feature.

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using BlazorSample.Server.Models;
using BlazorSample.Shared;

namespace BlazorSample.Server.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class WeatherForecastController(ILogger<WeatherForecastController> logger, 
        UserManager<ApplicationUser> userManager) : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", 
        "Balmy", "Hot", "Sweltering", "Scorching"
    };

    [HttpGet]
    public async Task<IEnumerable<WeatherForecast>> Get()
    {
        var rng = new Random();

        var user = await userManager.GetUserAsync(User);

        if (user != null)
        {
            logger.LogInformation("User.Identity.Name: {UserIdentityName}", user.UserName);
        }

        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = rng.Next(-20, 55),
            Summary = Summaries[rng.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
```

In the preceding example:

* The **`Server`** project's namespace is `BlazorSample.Server`.
* The **`Shared`** project's namespace is `BlazorSample.Shared`.
