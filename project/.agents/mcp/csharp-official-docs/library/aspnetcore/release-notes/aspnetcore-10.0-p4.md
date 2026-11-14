---
title: "What's new in ASP.NET Core in .NET 10 (part 4 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-10.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 10 (part 4 of 9)

### Support for Not Found responses in apps without Blazor's router

Apps that implement a custom router can use `Microsoft.AspNetCore.Components.NavigationManager.NotFound*`. There are two ways to inform the renderer what page should be rendered when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called.

The recommended approach that works regardless of the response state is to call `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`. When `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called, the middleware renders the path passed to the method:

```csharp
app.UseStatusCodePagesWithReExecute(
    "/not-found", createScopeForStatusCodePages: true);
```

If you don't want to use `Microsoft.AspNetCore.Builder.StatusCodePagesExtensions.UseStatusCodePagesWithReExecute*`, the app can still support `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` for responses that have already started. Subscribe to `OnNotFoundEvent` in the router and assign the Not Found page path to `NotFoundEventArgs.Path` to inform the renderer what content to render when `Microsoft.AspNetCore.Components.NavigationManager.NotFound*` is called.

`CustomRouter.razor`:

```razor
@using Microsoft.AspNetCore.Components
@using Microsoft.AspNetCore.Components.Routing
@using Microsoft.AspNetCore.Http
@implements IDisposable
@inject NavigationManager NavigationManager

@code {
    protected override void OnInitialized() =>
        NavigationManager.OnNotFound += OnNotFoundEvent;

    [CascadingParameter]
    public HttpContext? HttpContext { get; set; }

    private void OnNotFoundEvent(object sender, NotFoundEventArgs e)
    {
        // Only execute the logic if HTTP response has started
        // because setting NotFoundEventArgs.Path blocks re-execution
        if (HttpContext?.Response.HasStarted == false)
        {
            return;
        }

        e.Path = GetNotFoundRoutePath();
    }

    // Return the path of the Not Found page that you want to display
    private string GetNotFoundRoutePath()
    {
        ...
    }

    public void Dispose() => NavigationManager.OnNotFound -= OnNotFoundEvent;
}
```

If you use both approaches in your app, the Not Found path specified in the `OnNotFoundEvent` handler takes precedence over the path configured in the re-execution middleware.

### Metrics and tracing

This release introduces comprehensive metrics and tracing capabilities for Blazor apps, providing detailed observability of the component lifecycle, navigation, event handling, and circuit management.

For more information, see ASP.NET Core Blazor performance best practices.

### JavaScript bundler support

Blazor's build output isn't compatible with JavaScript bundlers, such as Gulp, Webpack, and Rollup. Blazor can now produce bundler-friendly output during publish by setting the `WasmBundlerFriendlyBootConfig` MSBuild property to `true`.

For more information, see Host and deploy ASP.NET Core Blazor.

### Blazor WebAssembly static asset preloading in Blazor Web Apps

We replaced `<link>` headers with a `ResourcePreloader` component (`<ResourcePreloader />`) for preloading WebAssembly assets in Blazor Web Apps. This permits the app base path configuration (`<base href="..." />`) to correctly identify the app's root.

Removing the component disables the feature if the app is using a `loadBootResource` callback to modify URLs.

The Blazor Web App template adopts the feature by default in .NET 10, and apps upgrading to .NET 10 can implement the feature by placing the `ResourcePreloader` component after the base URL tag (`<base>`) in the `App` component's head content (`App.razor`):

```diff
<head>
    ...
    <base href="/" />
+   <ResourcePreloader />
    ...
</head>
```

For more information, see Host and deploy ASP.NET Core server-side Blazor apps.

### Improved form validation

Blazor now has improved form validation capabilities, including support for validating properties of nested objects and collection items.

To create a validated form, use a `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component inside an `Microsoft.AspNetCore.Components.Forms.EditForm` component, just as before.

To opt into the new validation feature:

1. Call the `AddValidation` extension method in the `Program` file where services are registered.
2. Declare the form model types in a C# class file, not in a Razor component (`.razor`).
3. Annotate the root form model type with the `[ValidatableType]` attribute.

Without following the preceding steps, the validation behavior remains the same as in previous .NET releases.

The following example demonstrates customer orders with the improved form validation (details omitted for brevity):

In `Program.cs`, call `AddValidation` on the service collection to enable the new validation behavior:

```csharp
builder.Services.AddValidation();
```

In the following `Order` class, the `[ValidatableType]` attribute is required on the top-level model type. The other types are discovered automatically. `OrderItem` and `ShippingAddress` aren't shown for brevity, but nested and collection validation works the same way in those types if they were shown.

`Order.cs`:

```csharp
[ValidatableType]
public class Order
{
    public Customer Customer { get; set; } = new();
    public List<OrderItem> OrderItems { get; set; } = [];
}

public class Customer
{
    [Required(ErrorMessage = "Name is required.")]
    public string? FullName { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    public string? Email { get; set; }

    public ShippingAddress ShippingAddress { get; set; } = new();
}
```

In the following `OrderPage` component, the `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component is present in the `Microsoft.AspNetCore.Components.Forms.EditForm` component.

`OrderPage.razor`:

```razor
<EditForm Model="Model">
    <DataAnnotationsValidator />

    <h3>Customer Details</h3>
    <div class="mb-3">
        <label>
            Full Name
            <InputText @bind-Value="Model!.Customer.FullName" />
        </label>
        <ValidationMessage For="@(() => Model!.Customer.FullName)" />
    </div>

    @* ... form continues ... *@
</EditForm>

@code {
    public Order? Model { get; set; }

    protected override void OnInitialized() => Model ??= new();

    // ... code continues ...
}
```

The requirement to declare the model types outside of Razor components (`.razor` files) is due to the fact that both the new validation feature and the Razor compiler itself are using a source generator. Currently, output of one source generator can't be used as an input for another source generator.

Validation support now includes:

* Validation of nested complex objects and collections is now supported.
  * This includes validation rules defined by property attributes, class attributes, and the `System.ComponentModel.DataAnnotations.IValidatableObject` implementation.
  * The `[SkipValidation]` attribute can exclude properties or types from validation.
* Validation now uses a source generator-based implementation instead of reflection-based implementation for improved performance and compatibility with ahead-of-time (AOT) compilation.

The `Microsoft.AspNetCore.Components.Forms.DataAnnotationsValidator` component now has the same validation order and short-circuiting behavior as `System.ComponentModel.DataAnnotations.Validator`. The following rules are applied when validating an instance of type `T`:

1. Member properties of `T` are validated, including recursively validating nested objects.
1. Type-level attributes of `T` are validated.
1. The `System.ComponentModel.DataAnnotations.IValidatableObject.Validate*` method is executed, if `T` implements it.

If one of the preceding steps produces a validation error, the remaining steps are skipped.

### Use validation models from a different assembly

You can validate forms with models defined in a different assembly, such as a library or the `.Client` project of a Blazor Web App, by creating a method in the library or `.Client` project that receives an `Microsoft.Extensions.DependencyInjection.IServiceCollection` instance as an argument and calls `AddValidation` on it.
* In the app, call both the method and `AddValidation`.

For more information, see Validation in ASP.NET Core.

### Custom Blazor cache and `BlazorCacheBootResources` MSBuild property removed

Now that all Blazor client-side files are fingerprinted and cached by the browser, Blazor's custom caching mechanism and the `BlazorCacheBootResources` MSBuild property have been removed from the framework. If the client-side project's project file contains the MSBuild property, remove the property, as it no longer has any effect:

```diff
- <BlazorCacheBootResources>...</BlazorCacheBootResources>
```

For more information, see ASP.NET Core Blazor WebAssembly caching and integrity check failures.

### Web Authentication API (passkey) support for ASP.NET Core Identity

Web Authentication (WebAuthn) API support, known widely as *passkeys*, is a modern, phishing-resistant authentication method that improves security and user experience by leveraging public key <example-value> and device-based authentication. ASP.NET Core Identity now supports passkey <example-value> based on WebAuthn and FIDO2 standards. This feature allows users to sign in without passwords, using secure, device-based authentication methods, such as biometrics or security keys.

The Blazor Web App project template provides out-of-the-box passkey <example-value> and login functionality.

For more information, see the following articles:

* Enable Web Authentication API (WebAuthn) passkeys
* Implement passkeys in ASP.NET Core Blazor Web Apps

### Circuit state persistence

During server-side rendering, Blazor Web Apps can now persist a user's session (circuit) state when the connection to the server is lost for an extended period of time or proactively paused, as long as a full-page refresh isn't triggered. This allows users to resume their session without losing unsaved work in the following scenarios:

* Browser tab throttling
* Mobile device users switching apps
* Network interruptions
* Proactive resource management (pausing inactive circuits)
* Enhanced navigation

For more information, see ASP.NET Core Blazor server-side state management.

### Hot Reload for Blazor WebAssembly and .NET on WebAssembly

The SDK migrated to a general purpose Hot Reload for WebAssembly scenarios. There's a new MSBuild property `WasmEnableHotReload` that's `true` by default for the `Debug` configuration (`Configuration == "Debug"`) that enables Hot Reload.

For other configurations with custom configuration names, set the value to `true` in the app's project file to enable Hot Reload:

```xml
<PropertyGroup>
  <WasmEnableHotReload>true</WasmEnableHotReload>
</PropertyGroup>
```

To disable Hot Reload for the `Debug` configuration, set the value to `false`:

```xml
<PropertyGroup>
  <WasmEnableHotReload>false</WasmEnableHotReload>
</PropertyGroup>
```

### Updated PWA service worker registration to prevent caching issues

The service worker registration in the Blazor Progressive Web Application (PWA) project template now includes the `updateViaCache: 'none'` option, which prevents caching issues during service worker updates.

```diff
- navigator.serviceWorker.register('service-worker.js');
+ navigator.serviceWorker.register('service-worker.js', { updateViaCache: 'none' });
```

The option ensures that:

* The browser doesn't use cached versions of the service worker script.
* Service worker updates are applied reliably without being blocked by HTTP caching.
* PWA applications can update their service workers more predictably.

This addresses caching issues that can prevent service worker updates from being applied correctly, which is particularly important for PWAs that rely on service workers for offline functionality.

We recommend using the option set to `none` in all PWAs, including those that target .NET 9 or earlier.

### Serialization extensibility for persistent component state

Implement a custom serializer with `Microsoft.AspNetCore.Components.PersistentComponentStateSerializer`1`. Without a registered custom serializer, serialization falls back to the existing JSON serialization.

The custom serializer is registered in the app's `Program` file. In the following example, the `CustomUserSerializer` is registered for the `TUser` type:

```csharp
builder.Services.AddSingleton<PersistentComponentStateSerializer<TUser>, 
    CustomUserSerializer>();
```

The type is automatically persisted and restored with the custom serializer:

```razor
[PersistentState] 
public User? CurrentUser { get; set; } = new();
```

### `OwningComponentBase` now implements `IAsyncDisposable`

`OwningComponentBase` now includes support for asynchronous disposal, improving resource management. There are new `DisposeAsync` and `DisposeAsyncCore` methods with an updated `Dispose` method to handle both synchronous and asynchronous disposal of the service scope.

### New `InputHidden` component to handle hidden input fields in forms

The new `InputHidden` component provides a hidden input field for storing string values.

In the following example, a hidden input field is created for the form's `Parameter` property. When the form is submitted, the value of the hidden field is displayed:

```razor
<EditForm Model="Parameter" OnValidSubmit="Submit" FormName="InputHidden Example">
    <InputHidden id="hidden" @bind-Value="Parameter" />
    <button type="submit">Submit</button>
</EditForm>

@if (submitted)
{
    <p>Hello @Parameter!</p>
}

@code {
    private bool submitted;

    [SupplyParameterFromForm] 
    public string Parameter { get; set; } = "stranger";

    private void Submit() => submitted = true;
}
```
