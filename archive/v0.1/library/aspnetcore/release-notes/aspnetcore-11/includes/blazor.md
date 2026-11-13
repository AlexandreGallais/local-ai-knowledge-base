---
title: "blazor (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/blazor.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# blazor

### New `DisplayName` component and support for `[Display]` and `[DisplayName]` attributes

The `DisplayName` component can be used to display property names from metadata attributes:

```csharp
[Required, DisplayName("Production Date")]
public DateTime ProductionDate { get; set; }
```

The `[Display]` attribute on the model class property is supported:

```csharp
[Required, Display(Name = "Production Date")]
public DateTime ProductionDate { get; set; }
```

Of the two approaches, the `[Display]` attribute is recommended, which makes additional properties available. The `[Display]` attribute also enables assigning a resource type for localization. When both attributes are present, `[Display]` takes precedence over `[DisplayName]`. If neither attribute is present, the component falls back to the property name.

Use the `DisplayName` component in labels or table headers:

```razor
<label>
    <DisplayName For="@(() => Model!.ProductionDate)" />
    <InputDate @bind-Value="Model!.ProductionDate" />
</label>
```

### Blazor Web script startup options format now supported for Blazor Server and Blazor WebAssembly scripts

The Blazor Web App script (`blazor.web.js`) options object passed to `Blazor.start()` uses the following format since the release of .NET 8:

```javascript
Blazor.start({
  ssr: { ... },
  circuit: { ... },
  webAssembly: { ... },
});
```

Now, Blazor Server (`blazor.server.js`) and Blazor WebAssembly (`blazor.webassembly.js`) scripts can use the same options format.

The following example shows the prior options format, which remains supported:

```javascript
Blazor.start({
  loadBootResource: function (...) {
      ...
    },
  });
```

The newly supported options format for the preceding example:

```javascript
Blazor.start({
  webAssembly: {
    loadBootResource: function (...) {
      ...
    },
  },
});
```

For more information, see ASP.NET Core Blazor startup.

### New `BasePath` component

Blazor Web Apps can use the new `BasePath` component (`<BasePath />`) to render the app's app base path (`<base href>`) HTML tag automatically. For more information, see ASP.NET Core Blazor app base path.

### Inline JS event handler removed from the `NavMenu` component

The inline JS event handler that toggles the display of navigation links is no longer present in the `NavMenu` component of the Blazor Web App project template. Apps generated from the project template now use a collocated JS module approach to show or hide the navigation bar on the rendered page. The new approach improves Content Security Policy (CSP) compliance because it doesn't require the CSP to include an unsafe hash for the inline JS.

To migrate an existing app to .NET 11, including adopting the new JS module approach for the navigation bar toggler, see Migrate from ASP.NET Core in .NET 10 to ASP.NET Core in .NET 11.

### `NavigateTo` and `NavLink` support for relative navigation

The new `RelativeToCurrentUri` parameter (default: `false`) for `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` and the `NavLink` component allows you to navigate to URIs relative to the current page path rather than the app's base URI.

Consider the following nested endpoints:

* `/docs`
  * `/getting-started`
    * `/installation`
    * `/configuration`

When the browser's URI is `/docs/getting-started/installation` and you want to navigate the user to `/docs/getting-started/configuration`, `NavigateTo("/configuration")` redirects to `/configuration` at the app's root instead of the relative path at `/docs/getting-started/configuration`. Set the `RelativeToCurrentUri` with `Microsoft.AspNetCore.Components.NavigationManager.NavigateTo*` or the `NavLink` component for the desired navigation:

```csharp
Navigation.NavigateTo("/configuration", new NavigationOptions
{
    RelativeToCurrentUri = true
});
```

```razor
<NavLink href="configuration" RelativeToCurrentUri="true">Configuration</NavLink>
```

### Persist temporary data between HTTP requests during static server-side rendering (static SSR)

To persist temporary data between HTTP requests during static server-side rendering (static SSR), Blazor supports TempData. TempData is ideal for scenarios such as flash messages after form submissions, passing data during redirects (POST-Redirect-GET pattern), and one-time notifications.

TempData is available when `Microsoft.Extensions.DependencyInjection.RazorComponentsServiceCollectionExtensions.AddRazorComponents*` is called in the app's `Program` file and is provided as a cascading value with the `[CascadingParameter]` attribute.

```csharp
[CascadingParameter]
public ITempData? TempData { get; set; }
```

When supplied to a parameter for simple read/write of a single value, use the `[SupplyParameterFromTempData]` attribute:

```csharp
[SupplyParameterFromTempData]
public string? Message { get; set; }
```

For more information, see ASP.NET Core Blazor server-side state management.

### New Blazor Web Worker template (`blazorwebworker`)

The .NET Web Worker project template, which contains a Web Worker client for offloading long-running work to a background thread, has been renamed to the **Blazor Web Worker** project template (`blazorwebworker`). The name change makes it clearer that the template is part of the Blazor stack for use in Blazor WebAssembly and Blazor Web apps (for client-side rendering, CSR).

Two often-requested capabilities have been added to the generated `WebWorkerClient`:

* `InvokeVoidAsync` for fire-and-forget worker calls that don't return a value, mirroring the shape on `IJSRuntime`.
* Cancellation and timeout support on both worker creation and worker invocations, so callers can pass a `CancellationToken` and tear down a stuck worker cleanly.

Existing projects created with the old template continue to work. The rename only affects the template name shown in `dotnet new list` and in Visual Studio's list of **Create a new project** templates.

For more information, see the following resources:

* ASP.NET Core Blazor with .NET on Web Workers
* .NET Web Worker template update to Blazor Web Worker template (`dotnet/aspnetcore` #66070) (Please don't comment on closed issues and PRs.)

### Virtualization enhancements

* The `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1` component no longer assumes every item has the same height. Previously, the component disabled the browser's native scroll anchoring (to avoid an infinite rendering loop), which meant any height change above the viewport—item expansion, data updates, lazy-loaded content—caused visible items to jump on screen. The `Virtualize` component now adapts to measured item sizes at runtime, which reduces incorrect spacing and scrolling when item heights vary.

  The updates use a hybrid approach: native CSS scroll anchoring on browsers that support it for non-`` layouts with a manual `ResizeObserver`-based scroll-compensation fallback for `` layouts and Safari, where native anchoring miscalculates positions on `` elements.

  Apps using the `Virtualize` component receive the benefits of these updates automatically. No developer API changes are required.

  These updates include an update to the default value of `Microsoft.AspNetCore.Components.Web.Virtualization.Virtualize`1.OverscanCount`, which was `3` in .NET 10 or earlier and now changes to `15` in .NET 11 or later. The change in default value increases the precision of average item height calculations.

  For more information, see the following resources:

  * *Item size* section and *Overscan count* section of the *Virtualization* article.
  * [Virtualization] Visible content does not shift when in-DOM items above the viewport change height (`dotnet/aspnetcore` #65951) (Please don't comment on closed issues and PRs).

* Use the new `AnchorMode` parameter to control how the viewport behaves at list edges when items are dynamically added:

  * `None`: No edge pinning. The viewport stays at the current scroll position regardless of item changes.
  * `Start` (default): Pins the viewport to the beginning of the list. For example, this pinning behavior is useful for a news feed user experience.
  * `End`: Pins the viewport to the end of the list. For example, this pinning behavior is useful for a chat or logging user experience.

  In the following example, the virtualized content is pinned to the beginning of the list:

  ```razor
  <Virtualize AnchorMode="Start" ...>
      ...
  </Virtualize>
  ```

  For more information, see the following resources:

  * ASP.NET Core Razor component virtualization
  * [release/11.0-preview4] Virtualization AnchorMode with variable-height support (`dotnet/aspnetcore` #66521) (Please don't comment on closed issues and PRs.)

* Content Security Policy (CSP) compliance

  The `Virtualize` component renders dynamic inline `style` attributes on its spacer and placeholder elements (for example, `style="height: 478896px; flex-shrink: 0;"`) because spacer heights are calculated at runtime based on scroll position, item count, and average item size, which change on every scroll interaction. These are blocked by a Content Security Policy (CSP) when `style-src 'self'` is set, breaking virtualization entirely for apps with strict CSP policies.

  Now, CSP violations are avoided because `Virtualize` components:

  * Render calculated spacer and placeholder heights as numeric values in `data-blazor-virtualize-reserved-height` attributes.
  * When required, render the trailing spacer's vertical offset as a numeric value in a `data-blazor-virtualize-loop-breaker-transform` attribute to hide the spacer.

### New service defaults library project template for Blazor WebAssembly apps

The `blazor-wasm-servicedefaults` project template creates a service defaults library for Blazor WebAssembly apps with Aspire integration. For more information, see Tooling for ASP.NET Core Blazor.

### New development server for Blazor WebAssembly apps

`Microsoft.AspNetCore.Components.Gateway` is a lightweight ASP.NET Core host that replaces `Microsoft.AspNetCore.Components.WebAssembly.DevServer` for serving standalone Blazor WebAssembly apps during development and production.

To adopt the Gateway in an existing standalone Blazor WebAssembly app, reference the `Microsoft.AspNetCore.Components.Gateway` package in the app's project file.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Custom routing code and middleware aren't required by the app. Fallback endpoints come from the static web assets manifest the SDK emits when the `StaticWebAssetSpaFallbackEnabled` property is set in the app's project file, which is present by default in standalone Blazor WebAssembly apps created from the project template:

```xml
<StaticWebAssetSpaFallbackEnabled>true</StaticWebAssetSpaFallbackEnabled>
```

Prior to the release of .NET 11, the `inspectUri` property of the `Properties/launchSettings.json` file:

* Enables the IDE to detect that the app is a Blazor app.
* Instructs the script debugging infrastructure to connect to the browser through Blazor's debugging proxy.

The property is no longer required when using the new development server.

Open the `Properties/launchSettings.json` file of the startup project. Remove the `inspectUri` property in each launch profile of the file's `profiles` node:

```diff
- "inspectUri": "..."
```

For more information, see [Blazor] Replace DevServer with BlazorGateway for standalone WASM apps (`dotnet/aspnetcore` #65982) (Please don't comment on closed issues and PRs).

### Server-triggered circuit pause

*This feature applies to server-side Blazor apps.*

Blazor already supports graceful circuit pause and resume with `Blazor.pauseCircuit()` and `Blazor.resumeCircuit()`. .NET 11 introduces a symmetric server-side pause and resume capability, where the server can request that connected clients begin the graceful circuit-pause flow.

`Circuit.RequestCircuitPauseAsync(CancellationToken)` is used to request that the connected client begin the graceful circuit-pause flow. The `CancellationToken` cancels the request before it is accepted by the framework. The method returns `true` if the request was accepted and the client was asked to begin pausing.

This feature is useful in the following scenarios:

* Planned shutdowns and deployments.
* Instance draining.
* App maintenance windows.

For more information and an implementation example for server restarts, see ASP.NET Core Blazor server-side state management.

### Smaller Blazor WebAssembly publish output

Two trimming changes shrink published Blazor WebAssembly apps that don't use OpenTelemetry (OTEL) or Hot Reload:

* The `ComponentsMetrics` and `ComponentsActivitySource` types are now gated behind a `[FeatureSwitchDefinition]` attribute, so the trimmer can drop the metrics and tracing call paths from `Renderer` and friends when `System.Diagnostics.Metrics.Meter.IsSupported` is `false` (the default for trimmed apps) browser Implement IL trimming for OTEL (`dotnet/aspnetcore` #65901) (Please don't comment on closed issues and PRs).
* `HotReloadManager` now exposes a feature-switched `IsSupported` property tied to `System.Reflection.Metadata.MetadataUpdater.IsSupported`, so the trimmer can eliminate hot-reload caches and metadata-update handler registrations across the renderer when published blazor Fix hot reload IL trimming (`dotnet/aspnetcore` #65903) (Please don't comment on closed issues and PRs).

Apps that use OTEL or Hot Reload aren't affected by the preceding updates.
