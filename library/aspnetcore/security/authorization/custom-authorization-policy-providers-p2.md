---
title: "Custom authorization policy providers in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authorization/custom-authorization-policy-providers.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Custom authorization policy providers in ASP.NET Core (part 2 of 2)

## Use policies from a custom policy provider

To use custom policies:

* As with all policy-based authorization scenarios, create a requirement and an authorization handler for the policy. Register the handler in the app's service container.

  For examples that work with the custom policy provider in this article, see the parameterized `MinimumAgeRequirement` and `MinimumAgeHandler` code in the *Policy-based authorization* article, which work with the `MinimumAgePolicyProvider` demonstrated in this article:

  * `MinimumAgeRequirement(int)` parameterized class that accepts a minimum age
  * `MinimumAgeHandler` class for one requirement
  * Register the `MinimumAgeHandler`

* Register the custom policy provider type to replace the default policy provider.

  In the app's `Program` file:

  ```csharp
  builder.Services.AddSingleton<IAuthorizationPolicyProvider, MinimumAgePolicyProvider>();
  ```

The sample app institutes application cookie redirect mapping with the following code:

* Anonymous Users: When an unauthenticated user requests a protected endpoint, the cookie handler issues a challenge and redirects to `Microsoft.AspNetCore.Builder.CookieAuthenticationOptions.LoginPath` with a return URL parameter.
* Underage Users: When an authenticated user fails the custom minimum age policy, the handler issues a forbid response and redirects to `Microsoft.AspNetCore.Builder.CookieAuthenticationOptions.AccessDeniedPath` instead of the login page.

```csharp
builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
});
```

For demonstration purposes, an `AuthorizeView` component can specify the weakly-typed `MinimumAge21` (`"MinimumAge" + Age`) policy, as the following sample Razor component demonstrates. Using a weakly-typed policy name isn't the best approach for applying a custom authorization policy. After the following example, a strongly-typed `Microsoft.AspNetCore.Authorization.AuthorizeAttribute` is demonstrated using the `MinimumAgeAuthorizeAttribute` implementation described in the Custom authorization attribute section.

`Components/Pages/PassMinimumAge21Policy.razor`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Components/Pages/PassMinimumAge21Policy.razor._
The following component uses the strongly-typed custom `MinimumAgeAuthorizeAttribute` implementation described in the Custom authorization attribute section. Using a strongly-typed attribute is recommended for production apps.

`Components/Pages/PassMinimumAge21PolicyWithAttribute.razor`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/security/authorization/BlazorWebAppAuthorization/Components/Pages/PassMinimumAge21PolicyWithAttribute.razor._
The same approach is useful for securing Minimal API endpoints:

```csharp
app.MapGet("/must-be-21", [MinimumAgeAuthorize(21)] () => 
    "This endpoint requires a 21-year-old birthdate claim.");
```

## Related content

* Complete custom 'IAuthorizationPolicyProvider' sample (`dotnet/aspnetcore` GitHub repository)
* Policy-based authorization in ASP.NET Core
* Policy-based authorization in ASP.NET Core Razor Pages
* Policy-based authorization in ASP.NET Core MVC
