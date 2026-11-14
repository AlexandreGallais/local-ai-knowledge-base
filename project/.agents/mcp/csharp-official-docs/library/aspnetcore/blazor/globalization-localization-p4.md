---
title: "ASP.NET Core Blazor globalization and localization (part 4 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/globalization-localization.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor globalization and localization (part 4 of 6)

## Dynamically set the culture in a Blazor Web App by user preference

*This section applies to Blazor Web Apps that adopt per-page/component interactivity.*

Examples of locations where an app might store a user's preference include in browser local storage (common for client-side scenarios), in a localization cookie or database (common for server-side scenarios), both local storage and a localization cookie (Blazor Web Apps with server and WebAssembly components), or in an external service attached to an external database and accessed by a web API. The following example demonstrates how to use browser local storage for client-side rendered (CSR) components and a localization cookie for server-side rendered (SSR) components. The guidance in this section also works for components in apps that adopt per-page/component rendering and specify the Interactive Auto render mode (`@rendermode InteractiveAuto`).

### Updates to the `.Client` project

Add the `Microsoft.Extensions.Localization` package to the `.Client` project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Set the `BlazorWebAssemblyLoadAllGlobalizationData` property to `true` in the `.Client` project file:

```xml
<PropertyGroup>
  <BlazorWebAssemblyLoadAllGlobalizationData>true</BlazorWebAssemblyLoadAllGlobalizationData>
</PropertyGroup>
```

Add the namespaces for `System.Globalization` and `Microsoft.JSInterop` to the top of the `.Client` project's `Program` file:

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

Add the following `CultureSelector` component to the `.Client` project in a `Shared` folder. If a `Shared` folder doesn't exist in the `.Client` project, create one to hold shared components.

When the user changes the culture, JS interop sets the culture in local browser storage and a Minimal API endpoint updates the localization cookie with the culture. The Minimal API endpoint is added to the app later in the Server project updates section.

`Shared/CultureSelector.razor`:

```razor
@using System.Globalization
@inject IJSRuntime JS
@inject NavigationManager Navigation

<p>
    <label>
        Select your locale:
        <select @bind="@selectedCulture" @bind:after="ApplySelectedCultureAsync">
            @foreach (var culture in supportedCultures)
            {
                <option value="@culture">@culture.DisplayName</option>
            }
        </select>
    </label>
</p>

@code
{
    private CultureInfo[] supportedCultures = 
        [ 
            new CultureInfo("en-US"), 
            new CultureInfo("es-CR"),
        ];

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

> **Note:**
> For more information on `Microsoft.JSInterop.IJSInProcessRuntime`, see Call JavaScript functions from .NET methods in ASP.NET Core Blazor.

In the server project's imports file (`_Imports.razor`), add the namespace for the `.Client` project's `Shared` folder (update the namespace to match your app):

```razor
@using BlazorSample.Client.Shared
```

Place the following markup in the header content of the `Components/Layout/MainLayout.razor` file:

```razor
<CultureSelector @rendermode="InteractiveAuto" />
```

In the `.Client` project, place the following `CultureClient` component to study how globalization works for CSR components.

`Pages/CultureClient.razor`:

```razor
@page "/culture-client"
@rendermode InteractiveWebAssembly
@using System.Globalization

<PageTitle>Culture Client</PageTitle>

<h1>Culture Client</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Rendered values</h2>

<ul>
    <li><b>Date</b>: @dt</li>
    <li><b>Number</b>: @number.ToString("N2")</li>
</ul>

<h2><code>&lt;input&gt;</code> elements that don't set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.CurrentCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input @bind="number" /></label></li>
</ul>

<h2><code>&lt;input&gt;</code> elements that set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.InvariantCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input type="date" @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input type="number" @bind="number" /></label></li>
</ul>

@code {
    private DateTime dt = DateTime.Now;
    private double number = 1999.69;
}
```

In the `.Client` project, place the following `CultureServer` component to study how globalization works for SSR components.

`Pages/CultureServer.razor`:

```razor
@page "/culture-server"
@rendermode InteractiveServer
@using System.Globalization

<PageTitle>Culture Server</PageTitle>

<h1>Culture Server</h1>

<ul>
    <li><b>CurrentCulture</b>: @CultureInfo.CurrentCulture</li>
    <li><b>CurrentUICulture</b>: @CultureInfo.CurrentUICulture</li>
</ul>

<h2>Rendered values</h2>

<ul>
    <li><b>Date</b>: @dt</li>
    <li><b>Number</b>: @number.ToString("N2")</li>
</ul>

<h2><code>&lt;input&gt;</code> elements that don't set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.CurrentCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input @bind="number" /></label></li>
</ul>

<h2><code>&lt;input&gt;</code> elements that set a <code>type</code></h2>

<p>
    The following <code>&lt;input&gt;</code> elements use
    <code>CultureInfo.InvariantCulture</code>.
</p>

<ul>
    <li><label><b>Date:</b> <input type="date" @bind="dt" /></label></li>
    <li><label><b>Number:</b> <input type="number" @bind="number" /></label></li>
</ul>

@code {
    private DateTime dt = DateTime.Now;
    private double number = 1999.69;
}
```

Use the `CultureExample1` component shown in the Demonstration component section to study how globalization works for a component that inherits the global Auto render mode. Add the `CultureExample1` component to the `.Client` project's `Pages` folder. At the top of the component, specify the Interactive Auto render mode:

```razor
@rendermode InteractiveAuto
```

Add the `CultureClient`, `CultureServer`, and `CultureExample1` components to the sidebar navigation in `Components/Layout/NavMenu.razor` of the server project:

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="culture-server">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Culture (Server)
    </NavLink>
</div>
<div class="nav-item px-3">
    <NavLink class="nav-link" href="culture-client">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Culture (Client)
    </NavLink>
</div>
<div class="nav-item px-3">
    <NavLink class="nav-link" href="culture-example-1">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> Culture (Auto)
    </NavLink>
</div>
```

### Server project updates

Add the `Microsoft.Extensions.Localization` package to the server project.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Server-side apps are localized using localization middleware. Add localization services to the app with `Microsoft.Extensions.DependencyInjection.LocalizationServiceCollectionExtensions.AddLocalization*`.

In the server project's `Program` file where services are registered:

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

The following example shows how to set the current culture in a cookie that can be read by the localization middleware.

Add the `System.Globalization` and `Microsoft.AspNetCore.Localization` namespaces to the top of the `App` component (`Components/App.razor`):

```razor
@using System.Globalization
@using Microsoft.AspNetCore.Localization
```

The app's culture for client-side rendering is set using the Blazor framework's API. A user's culture selection can be persisted in browser local storage for CSR components.

After the Blazor `<script>` tag, provide JS functions to get and set the user's culture selection with browser local storage:

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
