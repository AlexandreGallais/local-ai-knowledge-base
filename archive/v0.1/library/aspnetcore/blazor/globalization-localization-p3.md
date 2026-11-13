---
title: "ASP.NET Core Blazor globalization and localization (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/globalization-localization.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor globalization and localization (part 3 of 6)

## Dynamically set the server-side culture by user preference

*This section applies to Blazor Web Apps adopting the global Interactive Server render mode and Blazor Server apps. For guidance that covers a Blazor Web App adopting per-page/component interactivity, see the Dynamically set the culture in a Blazor Web App by user preference section.*

Examples of locations where an app might store a user's preference include in browser local storage (common for client-side scenarios), in a localization cookie or database (common for server-side scenarios), or in an external service attached to an external database and accessed by a web API. The following example demonstrates how to use a localization cookie.

Add the `Microsoft.Extensions.Localization` package to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Server-side apps are localized using localization middleware. Add localization services to the app with `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*`.

In the `Program` file:

```csharp
builder.Services.AddLocalization();
```

Set the app's default and supported cultures with `Microsoft.AspNetCore.Builder.RequestLocalizationOptions`.

Before the call to `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` in the request processing pipeline, place the following code:

```csharp
var supportedCultures = new[] { "en-US", "es-CR" };
var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(supportedCultures[0])
    .AddSupportedCultures(supportedCultures)
    .AddSupportedUICultures(supportedCultures);

app.UseRequestLocalization(localizationOptions);
```

For information on ordering the localization middleware in the middleware pipeline, see ASP.NET Core middleware.

The following example shows how to set the current culture in a cookie that can be read by the localization middleware.

The following namespaces are required for the `App` component:

* `System.Globalization`
* `Microsoft.AspNetCore.Localization`

Add the `System.Globalization` and `Microsoft.AspNetCore.Localization` namespaces to the top of the `App` component file (`Components/App.razor`):

```razor
@using System.Globalization
@using Microsoft.AspNetCore.Localization
```

Add the following `@code` block to the bottom of the `App` component file:

```razor
@code {
    [CascadingParameter]
    private HttpContext? HttpContext { get; set; }

    protected override void OnInitialized()
    {
        HttpContext?.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(
                new RequestCulture(
                    CultureInfo.CurrentCulture,
                    CultureInfo.CurrentUICulture)));
    }
}
```

For information on ordering the localization middleware in the middleware pipeline, see ASP.NET Core middleware.

To provide UI to allow a user to select a culture, use a *redirect-based approach* with a localization cookie. The app persists the user's selected culture via a redirect to a Minimal API endpoint. The endpoint sets the user's selected culture into a cookie and redirects the user back to the original URI. The process is similar to what happens in a web app when a user attempts to access a secure resource, where the user is redirected to a sign-in page and then redirected back to the original resource.

At the top of the `Program` file, add the following `using` statement for the required namespace:

```csharp
using Microsoft.AspNetCore.Localization;
```

In the request processing pipeline of the app's `Program` file after the call to `Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization*`:

```csharp
app.MapGet("/Culture/Set", (string? culture, string redirectUri = "/",
    HttpContext context) =>
{
    if (!string.IsNullOrWhiteSpace(culture))
    {
        context.Response.Cookies.Append(
            CookieRequestCultureProvider.DefaultCookieName,
            CookieRequestCultureProvider.MakeCookieValue(
                new RequestCulture(culture, culture)));
    }

    return Results.LocalRedirect(redirectUri);
});
```

> **Warning:**
> Use the `Microsoft.AspNetCore.Http.Results.LocalRedirect*` result, as shown in the preceding example, to prevent open redirect attacks. For more information, see Prevent open redirect attacks in ASP.NET Core.

The following `CultureSelector` component shows how to call the `Set` endpoint with the new culture. The component is placed in the `Components` folder for use throughout the app.

`Components/CultureSelector.razor`:

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select @bind="selectedCulture" @bind:after="ApplySelectedCultureAsync">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = new[]
    {
        new CultureInfo("en-US"),
        new CultureInfo("es-CR"),
    };

    private CultureInfo? selectedCulture;

    protected override void OnInitialized()
    {
        selectedCulture = CultureInfo.CurrentCulture;
    }

    private async Task ApplySelectedCultureAsync()
    {
        if (selectedCulture is not null &&
            CultureInfo.CurrentCulture != selectedCulture)
        {
            var uri = new Uri(Navigation.Uri)
                .GetComponents(UriComponents.PathAndQuery, UriFormat.Unescaped);
            var cultureEscaped = Uri.EscapeDataString(selectedCulture.Name);
            var uriEscaped = Uri.EscapeDataString(uri);
    
            Navigation.NavigateTo(
                $"Culture/Set?culture={cultureEscaped}&redirectUri={uriEscaped}",
                forceLoad: true);
        }
    }
}
```

Add the `CultureSelector` component to the `MainLayout` component.

In the header markup of `Components/Layout/MainLayout.razor`:

```razor
<CultureSelector />
```

Use the `CultureExample1` component shown in the Demonstration component section to study how the preceding example works.

The preceding example assumes that the app adopts ***global*** interactivity by specifying the Interactive Server render mode on the `Routes` component in the `App` component (`Components/App.razor`):

```razor
<Routes @rendermode="InteractiveServer" />
```

If the app adopts ***per-page/component*** interactivity and only server-side components provide culture selection UI, make the following changes:

* Add the Interactive Server render mode to the top of the `CultureExample1` component file (`Components/Pages/CultureExample1.razor`):

  ```razor
  @rendermode InteractiveServer
  ```

* In the app's main layout (`Components/Layout/MainLayout.razor`), apply the Interactive Server render mode to the `CultureSelector` component:

  ```razor
  <CultureSelector @rendermode="InteractiveServer" />
  ```
