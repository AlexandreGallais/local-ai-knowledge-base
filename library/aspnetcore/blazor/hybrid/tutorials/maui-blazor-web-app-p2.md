---
title: "Build a .NET MAUI Blazor Hybrid app with a Blazor Web App (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a .NET MAUI Blazor Hybrid app with a Blazor Web App (part 2 of 3)

## Use Blazor render modes

Use the guidance in one of the following subsections that matches your app's specifications for applying Blazor render modes in the Blazor Web App but ignore the render mode assignments in the MAUI project.

Render mode specification subsections:

* Global Server interactivity
* Global Auto or WebAssembly interactivity
* Per-page/component Server interactivity
* Per-page/component Auto interactivity
* Per-page/component WebAssembly interactivity

### Global Server interactivity

* Interactive render mode: **Server**
* Interactivity location: **Global**
* Solution projects
  * MAUI (`MauiBlazorWeb`)
  * Blazor Web App (`MauiBlazorWeb.Web`)
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components without setting render modes in each component.

Project references: `MauiBlazorWeb` and `MauiBlazorWeb.Web` have a project reference to `MauiBlazorWeb.Shared`.

### Global Auto or WebAssembly interactivity

* Interactive render mode: **Auto** or **WebAssembly**
* Interactivity location: **Global**
* Solution projects
  * MAUI (`MauiBlazorWeb`)
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components without setting render modes in each component.

Project references:

* `MauiBlazorWeb`, `MauiBlazorWeb.Web`, and `MauiBlazorWeb.Web.Client` projects have a project reference to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.

### Per-page/component Server interactivity

* Interactive render mode: **Server**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb`): Calls `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` in `MauiProgram.cs`.
  * Blazor Web App (`MauiBlazorWeb.Web`): Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components that set the `InteractiveServer` render mode in each component.

`MauiBlazorWeb` and `MauiBlazorWeb.Web` have a project reference to `MauiBlazorWeb.Shared`.

Add the following `InteractiveRenderSettings` class to the RCL. The class properties are used to set component render modes.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from `Microsoft.AspNetCore.Components.Web.RenderMode`. When the components are loaded into a `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs`:

_Code sample not included: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs._
In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared` RCL, replace the `@using` statement for `Microsoft.AspNetCore.Components.Web.RenderMode` with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by `Microsoft.AspNetCore.Components.Web.RenderMode` in the Blazor Web App's `_Import` file.

### Per-page/component Auto interactivity

* Interactive render mode: **Auto**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb`): Calls `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` in `MauiProgram.cs`.
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`: Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCL (`MauiBlazorWeb.Shared`): Contains the shared Razor components that set the `InteractiveAuto` render mode in each component.

Project references:

* `MauiBlazorWeb`, `MauiBlazorWeb.Web`, and `MauiBlazorWeb.Web.Client` have a project reference to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.

Add the following `InteractiveRenderSettings` class is added to the RCL. The class properties are used to set component render modes.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from `Microsoft.AspNetCore.Components.Web.RenderMode`. When the components are loaded into a `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs`:

_Code sample not included: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs._
In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared.Client` RCL, replace the `@using` statement for `Microsoft.AspNetCore.Components.Web.RenderMode` with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by `Microsoft.AspNetCore.Components.Web.RenderMode` in the Blazor Web App's `_Import` file.

### Per-page/component WebAssembly interactivity

* Interactive render mode: **WebAssembly**
* Interactivity location: **Per-page/component**
* Solution projects
  * MAUI (`MauiBlazorWeb`)
  * Blazor Web App
    * Server project: `MauiBlazorWeb.Web`: Doesn't set an `@rendermode` directive attribute on the `HeadOutlet` and `Routes` components of the `App` component (`Components/App.razor`).
    * Client project: `MauiBlazorWeb.Web.Client`
  * RCLs
    * `MauiBlazorWeb.Shared`
    * `MauiBlazorWeb.Shared.Client`: Contains the shared Razor components that set the `InteractiveWebAssembly` render mode in each component. The `.Shared.Client` RCL is maintained separately from the `.Shared` RCL because the app should maintain the components that are required to run on WebAssembly separately from the components that run on server and that stay on the server.

Project references:

* `MauiBlazorWeb` and `MauiBlazorWeb.Web` have project references to `MauiBlazorWeb.Shared`.
* `MauiBlazorWeb.Web` has a project reference to `MauiBlazorWeb.Web.Client`.
* `MauiBlazorWeb.Web.Client` and `MauiBlazorWeb.Shared` have a project reference to `MauiBlazorWeb.Shared.Client`.

Add the following `Microsoft.AspNetCore.Components.Routing.Router.AdditionalAssemblies` parameter to the `Router` component instance for the `MauiBlazorWeb.Shared.Client` project assembly (via its imports file, `_Imports.razor`) in the `MauiBlazorWeb.Shared` project's `Routes.razor` file:

```razor
<Router AppAssembly="@typeof(Routes).Assembly" NotFoundPage="typeof(Pages.NotFound)" 
        AdditionalAssemblies="new [] { typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly }">
    <Found Context="routeData">
        <RouteView RouteData="@routeData" DefaultLayout="@typeof(Components.Layout.MainLayout)" />
        <FocusOnNavigate RouteData="@routeData" Selector="h1" />
    </Found>
</Router>
```

Add the `MauiBlazorWeb.Shared.Client` project assembly (via its imports file, `_Imports.razor`) with the following `Microsoft.AspNetCore.Builder.RazorComponentsEndpointConventionBuilderExtensions.AddAdditionalAssemblies*` call in the `MauiBlazorWeb.Web` project's `Program.cs` file:

```csharp
app.MapRazorComponents<App>()    
    .AddInteractiveWebAssemblyRenderMode()
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared._Imports).Assembly)
    .AddAdditionalAssemblies(typeof(MauiBlazorWeb.Shared.Client._Imports).Assembly); 
```

Add the following `InteractiveRenderSettings` class is added to the `.Shared.Client` RCL. The class properties are used to set component render modes for server-based components.

The MAUI project is interactive by default, so no action is taken at the project level in the MAUI project other than calling `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes`.

For the Blazor Web App on the web client, the property values are assigned from `Microsoft.AspNetCore.Components.Web.RenderMode`. When the components are loaded into a `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` for the MAUI project's native client, the render modes are unassigned (`null`) because the MAUI project explicitly sets the render mode properties to `null` when `ConfigureBlazorHybridRenderModes` is called.

`InteractiveRenderSettings.cs` (`.Shared.Client` RCL):

_Code sample not included: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/InteractiveRenderSettings.cs._
A slightly different version of the `InteractiveRenderSettings` class is added to the `.Shared` RCL. In the class added to the `.Shared` RCL, `InteractiveRenderSettings.ConfigureBlazorHybridRenderModes` of the `.Shared.Client` RCL is called. This ensures that the render mode of WebAssembly components rendered on the MAUI client are unassigned (`null`) because they're interactive by default on the native client.

`InteractiveRenderSettings.cs` (`.Shared` RCL):

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;

namespace MauiBlazorWeb.Shared
{
    public static class InteractiveRenderSettings
    {
        public static IComponentRenderMode? InteractiveServer { get; set; } = 
            RenderMode.InteractiveServer;
        public static IComponentRenderMode? InteractiveAuto { get; set; } = 
            RenderMode.InteractiveAuto;
        public static IComponentRenderMode? InteractiveWebAssembly { get; set; } = 
            RenderMode.InteractiveWebAssembly;

        public static void ConfigureBlazorHybridRenderModes()
        {
            InteractiveServer = null;
            InteractiveAuto = null;
            InteractiveWebAssembly = null;
            MauiBlazorWeb.Shared.Client.InteractiveRenderSettings
                .ConfigureBlazorHybridRenderModes();
        }
    }
}
```

In `MauiProgram.CreateMauiApp` of `MauiProgram.cs`, call `ConfigureBlazorHybridRenderModes`:

```csharp
InteractiveRenderSettings.ConfigureBlazorHybridRenderModes();
```

In the imports file (`_Imports.razor`) of the `.Shared.Client` RCL, replace the `@using` statement for `Microsoft.AspNetCore.Components.Web.RenderMode` with an `@using` statement for `InteractiveRenderSettings` to make the properties of the `InteractiveRenderSettings` class available to components:

```diff
- @using static Microsoft.AspNetCore.Components.Web.RenderMode
+ @using static InteractiveRenderSettings
```

> **Note:**
> The assignment of render modes via the RCL's `InteractiveRenderSettings` class properties differs from a typical standalone Blazor Web App. In a Blazor Web App, the render modes are normally provided by `Microsoft.AspNetCore.Components.Web.RenderMode` in the Blazor Web App's `_Import` file.
