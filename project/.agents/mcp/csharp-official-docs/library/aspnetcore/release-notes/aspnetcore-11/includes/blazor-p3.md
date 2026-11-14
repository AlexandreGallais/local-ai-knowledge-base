---
title: "blazor (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/blazor.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# blazor (part 3 of 4)

### `IComponentPropertyActivator`

Blazor now provides `IComponentPropertyActivator` for customizing how `[Inject]` properties are populated on components. This enables advanced scenarios such as:

* Providing additional context for property resolution.
* Support for custom DI containers that need to intercept property injection.
* Advanced scenarios requiring property injection customization.

```csharp
public interface IComponentPropertyActivator
{
    Action<IServiceProvider, IComponent> GetActivator(
        [DynamicallyAccessedMembers(Component)] Type componentType);
}
```

The default implementation caches activators per component type, supports keyed services via `[Inject(Key = "...")]`, integrates with Hot Reload for cache invalidation, and includes proper trimming annotations for AOT compatibility.

### SignalR `ConfigureConnection` for Interactive Server components

Blazor now provides access to configure the underlying SignalR connection options when using Interactive Server components through the new `ConfigureConnection` property on `ServerComponentsEndpointOptions`. This enables configuration of `HttpConnectionDispatcherOptions` properties that were previously only accessible through workarounds.

```csharp
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode(options =>
    {
        options.ConfigureConnection = dispatcherOptions =>
        {
            dispatcherOptions.CloseOnAuthenticationExpiration = true;
            dispatcherOptions.AllowStatefulReconnects = true;
            dispatcherOptions.ApplicationMaxBufferSize = 1024 * 1024;
        };
    });
```

This provides a clean, type-safe API for configuring SignalR connection settings without needing to inspect endpoint metadata.

### `IHostedService` support in Blazor WebAssembly

Blazor WebAssembly now supports `IHostedService` for running background services in the browser. This brings feature parity with Blazor Server and enables scenarios like periodic data refresh, real-time updates, and background processing.

```csharp
public class DataRefreshService : IHostedService
{
    private Timer? _timer;

    public Task StartAsync(CancellationToken <example-value>)
    {
        _timer = new Timer(RefreshData, null, TimeSpan.Zero, TimeSpan.FromMinutes(5));
        return Task.CompletedTask;
    }

    private void RefreshData(object? state)
    {
        // Refresh data periodically
    }

    public Task StopAsync(CancellationToken <example-value>)
    {
        _timer?.Dispose();
        return Task.CompletedTask;
    }
}

// Registration
builder.Services.AddHostedService<DataRefreshService>();
```

Hosted services are started when the app starts and stopped when it shuts down, providing a clean lifecycle for background operations in Blazor WebAssembly apps.

### Configure Blazor client behavior from the server

Blazor apps can now configure client-side startup behavior from the server in C# when mapping Razor components instead of hand-writing `Blazor.start` JavaScript. `WithBrowserOptions` sets options that the server serializes into the rendered page and the Blazor script applies in the browser, across the Server, WebAssembly, and Auto render modes. The options cover the client log level, interactive Server reconnection, whether enhanced navigation preserves the DOM, and a WebAssembly runtime's environment name, culture, and environment variables:

```csharp
app.MapRazorComponents<App>()
    .WithBrowserOptions(options =>
    {
        options.InteractiveServer.ReconnectionDialogId = "reconnect-dialog";
        options.InteractiveServer.ReconnectionMaxRetries = 10;
        options.InteractiveServer.ReconnectionRetryInterval = TimeSpan.FromSeconds(1.5);
        options.InteractiveWebAssembly.EnvironmentVariables["OTEL_EXPORTER_OTLP_ENDPOINT"] =
            "https://localhost:4318";
        options.StaticServer.CircuitInactivityTimeout = TimeSpan.FromSeconds(1.5);
        options.StaticServer.PreserveDom = true;
        options.InteractiveWebAssembly.ApplicationCulture = "en-ca";
        options.InteractiveWebAssembly.EnvironmentName = "Staging";
        options.LogLevel = LogLevel.Warning;
    });
```

You can also set the options in a Razor component with the `ConfigureBrowser` component:

```razor
<ConfigureBrowser Options="RequestBrowserOptions" />

...

@code {
    private BrowserOptions RequestBrowserOptions => new()
    {
        LogLevel = LogLevel.Trace,
        StaticServer = { PreserveDom = true }
    };
}
```

Read the resolved options from `HttpContext` with `GetBrowserOptions()`:

```razor
@BrowserOptions.GetBrowserOptions(HttpContext).LogLevel
```

For more information, see the following resources:

* API Proposal: BrowserOptions for server-to-client configuration (`dotnet/aspnetcore` #66393)
* Reshape BrowserConfiguration API per review (BrowserOptions) while preserving the JS wire format (`dotnet/aspnetcore` #67337)
* Reshape BrowserOptions server-to-client configuration API per review (`dotnet/aspnetcore` #67918)

Please don't comment on closed issues and PRs. Open a new issue to provide feedback on this API.

### Environment variables in Blazor WebAssembly configuration

Blazor WebAssembly applications can now access environment variables through `IConfiguration`. This enables runtime configuration without rebuilding the application, making it easier to deploy the same build to different environments.

In the following example, the `API_ENDPOINT` and `ENABLE_FEATURE_X` environment variables are automatically included in configuration:

```csharp
var builder = WebAssemblyHostBuilder.CreateDefault(args);

var apiEndpoint = builder.Configuration["API_ENDPOINT"];
var featureFlag = builder.Configuration["ENABLE_FEATURE_X"];
```

Environment variables are loaded into the configuration system alongside other configuration sources, such as app settings (`appsettings.json`), providing a unified way to access configuration values regardless of their source.

### Blazor WebAssembly component metrics and tracing

Blazor WebAssembly apps now provide component specific metrics and tracing when support for metrics has been enabled in the runtime.

### Enable container support in Blazor Web App template

The Blazor Web App project template now supports the **Enable container support** option in Visual Studio. This makes it easier to containerize Blazor Web Apps and deploy them to container orchestration platforms, such as Kubernetes or Azure Container Apps.

### Static SSR supports client-side validation

Blazor static server-side rendering (static SSR) forms now get instant, in-browser validation feedback without a server round-trip, matching the experience provided by interactive Blazor apps and MVC apps with unobtrusive validation. The .NET model remains the single source of truth for validation rules. The server renders metadata for the validation rules which are then enforced by the Blazor JS code on the client-side.

The feature is enabled by default for all static SSR forms that include the `DataAnnotationsValidator` component. Both enhanced and non-enhanced forms are supported.

Complete feature coverage is available in ASP.NET Core Blazor client-side form validation in static SSR.

For more information, see the following resources:

* Add .NET support for client-side validation in Blazor SSR (`dotnet/aspnetcore` #66441)
* Add JS library for client-side validation in Blazor SSR (`dotnet/aspnetcore` #66420)

Please don't comment on closed issues and PRs. If you have feedback on this feature, please open a new issue on the `dotnet/aspnetcore` GitHub repository.

### Asynchronous form validation support

Blazor forms receive support for async validation rules, such as database lookups or remote API calls. In any rendering mode, `EditForm` submit validation awaits async validators end-to-end.

The built-in `DataAnnotationsValidator` component runs the asynchronous `DataAnnotations` APIs (`AsyncValidationAttribute` and `IAsyncValidatableObject`), so asynchronous rules declared on the model work without additional configuration.

Validator components register asynchronous work with `ValidationRequestedEventArgs.AddAsyncValidator` for the whole form and `EditContext.RegisterAsyncFieldValidator` for a single field. The framework owns the cancellation token <example-value>, cancels superseded validations, and exposes progress with `IsValidationPending(field)` and `IsValidationFaulted(field)`.

```razor
<EditForm EditContext="editContext" OnValidSubmit="HandleSubmit">
    <InputText @bind-Value="model.Username" />
    @if (editContext.IsValidationPending(() => model.Username))
    {
        <span>Checking availability...</span>
    }
    <ValidationMessage For="() => model.Username" />
    <button type="submit">Register</button>
</EditForm>

@code {
    [Inject] public UserService Users { get; set; } = default!;

    private readonly RegistrationModel model = new();
    private EditContext editContext = default!;
    private ValidationMessageStore messages = default!;

    protected override void OnInitialized()
    {
        editContext = new EditContext(model);
        messages = new ValidationMessageStore(editContext);
        editContext.OnFieldChanged += (_, e) =>
        {
            if (e.FieldIdentifier.FieldName == nameof(model.Username))
            {
                editContext.RegisterAsyncFieldValidator(e.FieldIdentifier,
                    token => CheckAsync(e.FieldIdentifier, model.Username, token));
            }
        };
    }

    private async Task CheckAsync(FieldIdentifier field, string value, CancellationToken ct)
    {
        messages.Clear(field);
        if (await Users.IsUsernameTakenAsync(value, ct))
        {
            messages.Add(field, "Username is taken.");
        }
        editContext.NotifyValidationStateChanged();
    }

    private Task HandleSubmit() => RegisterAsync();
}
```

Complete feature coverage is available in ASP.NET Core Blazor advanced form validation.

For more information, see Add built-in support for async form validation in Blazor (`dotnet/aspnetcore` #66526).

Please don't comment on closed issues and PRs. If you have feedback on this feature, please open a new issue on the `dotnet/aspnetcore` GitHub repository.

### Fixes to TempData and `[SupplyParameterFromSession]` persistence for streaming SSR

When a page uses session-backed features, where a component has a `[SupplyParameterFromSession]` parameter (which creates a subscription) or the session-storage TempData provider is active, the session cookie (`.AspNetCore.Session`) is now issued before streaming begins, even if no value is ultimately written. Pages that don't use session-backed features are unaffected.

For more information, see Fix TempData and SupplyParameterFromSession persistence for streaming SSR case (`dotnet/aspnetcore` #66832). (Please don't comment on closed issues and PRs.)

### Antiforgery middleware (`app.UseAntiforgery()`) optional in Blazor Web Apps

CSRF protection is enabled by default via the auto-injected CSRF protection middleware, so an explicit `app.UseAntiforgery()` call in a Blazor Web App is usually unnecessary and should only be added for specific use cases. The call no longer appears in apps created from the Blazor Web App project template.

For more information, see the following resources:

* Migrate from ASP.NET Core in .NET 10 to ASP.NET Core in .NET 11
* Blazor server-side rendering defers antiforgery validation to middleware (breaking change announcement)

General coverage for the new automatic CSRF protection in ASP.NET Core:

* Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core
* ASP.NET Core Blazor forms overview
* ASP.NET Core Blazor authentication and authorization

### Blazor Virtualize can scroll to an item

The `Virtualize<TItem>` component can now open at a specific item and scroll to any item on demand. Two new public APIs make this possible:

* `InitialItemIndex` positions the list at a given item on the first interactive render, so the list opens at that item without a flash of the first item.
* `ScrollToItemAsync(int itemIndex, CancellationToken <example-value> = default)` scrolls to an item at any time after the first render and returns a `Task` that completes when the target is aligned to the top of the viewport.

```razor
<Virtualize TItem="Product" Items="products" InitialItemIndex="500" @ref="list">
    <div class="product">@context.Name</div>
</Virtualize>

<button @onclick="GoToTop">Back to top</button>

@code {
    private Virtualize<Product> list = default!;
    private List<Product> products = ProductCatalog.All;

    private async Task GoToTop() => await list.ScrollToItemAsync(0);
}
```

Out-of-range indexes are clamped to the valid range. If a second `ScrollToItemAsync` call starts while one is still in flight, the last call wins. Calling `ScrollToItemAsync` before the first interactive render throws `InvalidOperationException`; use `InitialItemIndex` to set the starting position instead.

For more information, see the following resources:

* ASP.NET Core Razor component virtualization
* Add `InitialIndex` (sic&dagger;) parameter and `ScrollToIndexAsync` (sic&dagger;) API to `Virtualize<TItem>` (`dotnet/aspnetcore` #66753). (Please don't comment on closed issues and PRs. *sic*&dagger;: API naming was changed without updating the title of the PR.)

### Automatic circuit pause on tab inactivity

Auto-pause can pause a circuit when the browser tab becomes hidden, freeing server memory and SignalR connections held by inactive users. It's an opt-in feature provided by the `Microsoft.AspNetCore.Components.Server.AutoPause` package. After adding a package reference, enable the feature by calling `AddAutoPause` when the app's root component is mapped:

```csharp
app.MapRazorComponents<App>()
    .WithBrowserOptions(options => options.AddAutoPause(p => p.HiddenDelay = TimeSpan.FromSeconds(30)));
```

After the tab is hidden for a configurable delay period (default: 2 minutes), the circuit pauses. If the user returns before the delay elapses, the pause doesn't occur.

For more information, see ASP.NET Core Blazor server-side state management.

### Wider support for `AuthorizationPolicy` and `IAuthorizationRequirementData`

Starting in .NET 11, you can apply `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` attributes to SignalR hubs and hub methods, MVC controllers and actions, and Blazor's `AuthorizeView` and `AuthorizeRouteView` components, not just to endpoints. For apps that target releases earlier than .NET 11, these attributes are only enforced on Minimal API and routed endpoints.

For more information, see Custom authorization policies with \`IAuthorizationRequirementData\`.
