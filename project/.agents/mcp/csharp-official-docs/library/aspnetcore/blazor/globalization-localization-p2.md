---
title: "ASP.NET Core Blazor globalization and localization (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/globalization-localization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor globalization and localization (part 2 of 6)

## Dynamically set the culture from the `Accept-Language` header

*This section applies to server-side and client-side Blazor apps.*

Add the `Microsoft.Extensions.Localization` package to the app.

The `Accept-Language` header is set by the browser and controlled by the user's language preferences in browser settings. In browser settings, a user sets one or more preferred languages in order of preference. The order of preference is used by the browser to set quality values (`q`, 0-1) for each language in the header. The following example specifies United States English, English, and Costa Rican Spanish with a preference for United States English or English:

**Accept-Language**: en-US,en;q=0.9,es-CR;q=0.8

The app's culture is set by matching the first requested language that matches a supported culture of the app.

In ***client-side development***, set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the client-side app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

> **Note:**
> If the app's specification requires limiting the supported cultures to an explicit list, see the Dynamically set the client-side culture by user preference section of this article.

Apps are localized using localization middleware. Add localization services to the app with `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*`.

Add the following line to the `Program` file where services are registered:

```csharp
builder.Services.AddLocalization();
```

In ***server-side development***, specify the app's supported cultures before any middleware that might check the request culture. Generally, place localization middleware immediately before calling `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*`. The following example configures supported cultures for United States English and Costa Rican Spanish:

```csharp
app.UseRequestLocalization(new RequestLocalizationOptions()
    .AddSupportedCultures(new[] { "en-US", "es-CR" })
    .AddSupportedUICultures(new[] { "en-US", "es-CR" }));
```

In the preceding example, the same supported formatting cultures and UI cultures are specified in a narrow case where the app is only used in the United States and Costa Rica. Alternatively, an app can use a broader set of cultures for date, number, and currency formatting but only provide localized content for the United States and Costa Rica, as the following example demonstrates:

```csharp
var uiCultures = new[] { "en-US", "es-CR" };

var formattingCultures = CultureInfo
    .GetCultures(CultureTypes.SpecificCultures)
    .Select(c => c.Name)
    .ToArray();

var localizationOptions = new RequestLocalizationOptions()
    .SetDefaultCulture(uiCultures[0])
    .AddSupportedCultures(formattingCultures)
    .AddSupportedUICultures(uiCultures);

app.UseRequestLocalization(localizationOptions);
```

In the preceding example, `CultureTypes.SpecificCultures` returns only cultures that are specific to a country or region—such as `en-US` or `fr-FR`—which come with full, concrete globalization data (for dates, numbers, calendars, and other cultural UI) that .NET can use for accurate formatting and parsing. Neutral cultures, such as `en` or `fr`, may not have complete globalization data, so they aren't included in this list.

For information on ordering the localization middleware in the middleware pipeline of the `Program` file, see ASP.NET Core middleware.

Use the `CultureExample1` component shown in the Demonstration component section to study how globalization works. Issue a request with United States English (`en-US`). Switch to Costa Rican Spanish (`es-CR`) in the browser's language settings. Request the webpage again.

When the culture is United States English (`en-US`), the rendered component uses month/day date formatting (`6/7`), 12-hour time (`AM`/`PM`), and comma separators in numbers with a dot for the decimal value (`1,999.69`):

* **Date**: 6/7/2021 6:45:22 AM
* **Number**: 1,999.69

When the culture is Costa Rican Spanish (`es-CR`), the rendered component uses day/month date formatting (`7/6`), 24-hour time, and period separators in numbers with a comma for the decimal value (`1.999,69`):

* **Date**: 7/6/2021 6:49:38
* **Number**: 1.999,69

## Statically set the client-side culture

*This section applies to Blazor WebAssembly apps and Blazor Web App components that adopt the Interactive WebAssembly render mode.*

Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the app's project file (`.csproj`):

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

The app's culture can be set in JavaScript when Blazor starts with the `applicationCulture` Blazor start option. The following example configures the app to launch using the United States English (`en-US`) culture.

Prevent Blazor autostart by adding `autostart="false"` to the Blazor `<script>` tag:

```html
<script src="{BLAZOR SCRIPT}" autostart="false"></script>
```

**In the preceding example, the `{BLAZOR SCRIPT}` placeholder is the Blazor script path and file name.** For the location of the script, see ASP.NET Core Blazor project structure.

Add the following `<script>` block after the Blazor `<script>` tag and before the closing `</body>` tag:

```html
<script>
  Blazor.start({
    webAssembly: {
      applicationCulture: 'en-US'
    }
  });
</script>
```

The value for `applicationCulture` must conform to the BCP-47 language tag format. For more information on Blazor startup, see ASP.NET Core Blazor startup.

An alternative to setting the culture Blazor's start option is to set the culture in C# code. Set `System.Globalization.CultureInfo.DefaultThreadCurrentCulture` and `System.Globalization.CultureInfo.DefaultThreadCurrentUICulture` in the `Program` file to the same culture.

Add the `System.Globalization` namespace to the `Program` file:

```csharp
using System.Globalization;
```

Add the culture settings before the line that builds and runs the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder` (`await builder.Build().RunAsync();`):

```csharp
CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("en-US");
CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("en-US");
```

Use the `CultureExample1` component shown in the Demonstration component section to study how globalization works. Issue a request with United States English (`en-US`). Switch to Costa Rican Spanish (`es-CR`) in the browser's language settings. Request the webpage again. When the requested language is Costa Rican Spanish, the app's culture remains United States English (`en-US`).

## Statically set the server-side culture

*This section applies to Blazor Web App components that adopt the Interactive Server render mode and Blazor Server apps.*

Server-side apps are localized using localization middleware. Add localization services to the app with `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*`.

In the `Program` file:

```csharp
builder.Services.AddLocalization();
```

Specify the static culture in the `Program` file before any middleware that might check the request culture. Generally, place localization middleware immediately before `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*`. The following example configures United States English:

```csharp
app.UseRequestLocalization("en-US");
```

The culture value for `Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization*` must conform to the BCP-47 language tag format.

For information on ordering the localization middleware in the middleware pipeline of the `Program` file, see ASP.NET Core middleware.

Use the `CultureExample1` component shown in the Demonstration component section to study how globalization works. Issue a request with United States English (`en-US`). Switch to Costa Rican Spanish (`es-CR`) in the browser's language settings. Request the webpage again. When the requested language is Costa Rican Spanish, the app's culture remains United States English (`en-US`).

## Dynamically set the client-side culture by user preference

*This section applies to Blazor WebAssembly apps and Blazor Web App components that adopt the Interactive WebAssembly render mode.*

Examples of locations where an app might store a user's preference include in browser local storage (common for client-side scenarios), in a localization cookie or database (common for server-side scenarios), or in an external service attached to an external database and accessed by a web API. The following example demonstrates how to use browser local storage.

Add the `Microsoft.Extensions.Localization` package to the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the project file:

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

The app's culture for client-side rendering is set using the Blazor framework's API. A user's culture selection can be persisted in browser local storage.

Provide JS functions after the Blazor `<script>` tag to get and set the user's culture selection with browser local storage:

```html
<script>
  window.blazorCulture = {
    get: () => window.localStorage['BlazorCulture'],
    set: (value) => window.localStorage['BlazorCulture'] = value
  };
</script>
```

> **Note:**
> The preceding example pollutes the client with global functions. For a better approach in production apps, see JavaScript isolation in JavaScript modules.

Add the namespaces for `System.Globalization` and `Microsoft.JSInterop` to the top of the `Program` file:

```csharp
using System.Globalization;
using Microsoft.JSInterop;
```

Remove the following line:

```diff
- await builder.Build().RunAsync();
```

Replace the preceding line with the following code. The code adds Blazor's localization service to the app's service collection with `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*` and uses JS interop to call into JS and retrieve the user's culture selection from local storage. If local storage doesn't contain a culture for the user, the code sets a default value of United States English (`en-US`).

```csharp
builder.Services.AddLocalization();

var host = builder.Build();

const string defaultCulture = "en-US";

var js = host.Services.GetRequiredService<IJSRuntime>();
var result = await js.InvokeAsync<string>("blazorCulture.get");
var culture = CultureInfo.GetCultureInfo(result ?? defaultCulture);

if (result == null)
{
    await js.InvokeVoidAsync("blazorCulture.set", defaultCulture);
}

CultureInfo.DefaultThreadCurrentCulture = culture;
CultureInfo.DefaultThreadCurrentUICulture = culture;

await host.RunAsync();
```

The following `CultureSelector` component shows how to perform the following actions:

* Set the user's culture selection into browser local storage via JS interop.
* Reload the component that they requested (`forceLoad: true`), which uses the updated culture.

`CultureSelector.razor`:

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
            await JS.InvokeVoidAsync("blazorCulture.set", selectedCulture.Name);

            Navigation.NavigateTo(Navigation.Uri, forceLoad: true);
        }
    }
}
```

> **Note:**
> For more information on `Microsoft.JSInterop.IJSInProcessRuntime`, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

In the header markup of the `MainLayout` component (`MainLayout.razor`), add the `CultureSelector` component:

```razor
<CultureSelector />
```

Use the `CultureExample1` component shown in the Demonstration component section to study how the preceding example works.
