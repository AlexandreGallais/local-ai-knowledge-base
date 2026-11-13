---
title: "Handle errors in ASP.NET Core Blazor apps (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/fundamentals/handle-errors.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Handle errors in ASP.NET Core Blazor apps

-->
-->

This article describes how Blazor manages unhandled exceptions and how to develop apps that detect and handle errors.

## Detailed errors during development

When a Blazor app isn't functioning properly during development, receiving detailed error information from the app assists in troubleshooting and fixing the issue. When an error occurs, Blazor apps display a light yellow bar at the bottom of the screen:

* During development, the bar directs you to the browser console, where you can see the exception.
* In production, the bar notifies the user that an error has occurred and recommends refreshing the browser.

The UI for this error handling experience is part of the Blazor project templates. Not all versions of the Blazor project templates use the `data-nosnippet` attribute to signal to browsers not to cache the contents of the error UI, but all versions of the Blazor documentation apply the attribute.

In a Blazor Web App, customize the experience in the `MainLayout` component. Because the Environment Tag Helper (for example, `<environment include="Production">...</environment>`) isn't supported in Razor components, the following example injects `Microsoft.Extensions.Hosting.IHostEnvironment` to configure error messages for different environments.

At the top of `MainLayout.razor`:

```razor
@inject IHostEnvironment HostEnvironment
```

Create or modify the Blazor error UI markup:

```razor
<div id="blazor-error-ui" data-nosnippet>
    @if (HostEnvironment.IsProduction())
    {
        <span>An error has occurred.</span>
    }
    else
    {
        <span>An unhandled exception occurred.</span>
    }
    <a href="" class="reload">Reload</a>
    <a class="dismiss">🗙</a>
</div>
```

In a Blazor WebAssembly app, customize the experience in the `wwwroot/index.html` file:

```html
<div id="blazor-error-ui" data-nosnippet>
    An unhandled error has occurred.
    <a href="" class="reload">Reload</a>
    <a class="dismiss">🗙</a>
</div>
```

The `blazor-error-ui` element is normally hidden due to the presence of the `display: none` style of the `blazor-error-ui` CSS class in the app's auto-generated stylesheet. When an error occurs, the framework applies `display: block` to the element.

## Detailed circuit errors

*This section applies to Blazor Web Apps operating over a circuit.*

Client-side errors don't include the call stack and don't provide detail on the cause of the error, but server logs do contain such information. For development purposes, sensitive circuit error information can be made available to the client by enabling detailed errors.

Set `Microsoft.AspNetCore.Components.Server.CircuitOptions.DetailedErrors` to `true`. For more information and an example, see ASP.NET Core Blazor SignalR guidance.

An alternative to setting `Microsoft.AspNetCore.Components.Server.CircuitOptions.DetailedErrors` is to set the `DetailedErrors` configuration key to `true` in the app's `Development` environment settings file (`appsettings.Development.json`).  Additionally, set SignalR server-side logging (`Microsoft.AspNetCore.SignalR`) to Debug or Trace for detailed SignalR logging.

`appsettings.Development.json`:

```json
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.Hosting.Lifetime": "Information",
      "Microsoft.AspNetCore.SignalR": "Debug"
    }
  }
}
```

The `Microsoft.AspNetCore.Components.Server.CircuitOptions.DetailedErrors` configuration key can also be set to `true` using the `ASPNETCORE_DETAILEDERRORS` environment variable with a value of `true` on `Development`/`Staging` environment servers or on your local system.

> **Warning:**
> Always avoid exposing error information to clients on the Internet, which is a security risk.

## Detailed errors for Razor component server-side rendering

*This section applies to Blazor Web Apps.*

Use the `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.DetailedErrors` option to control producing detailed information on errors for Razor component server-side rendering. The default value is `false`.

The following example enables detailed errors:

```csharp
builder.Services.AddRazorComponents(options => 
    options.DetailedErrors = builder.Environment.IsDevelopment());
```

> **Warning:**
> **Only enable detailed errors in the `Development` environment.** Detailed errors may contain sensitive information about the app that malicious users can use in an attack.
>
> The preceding example provides a degree of safety by setting the value of `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.DetailedErrors` based on the value returned by `Microsoft.Extensions.Hosting.HostEnvironmentEnvExtensions.IsDevelopment*`. When the app is in the `Development` environment, `Microsoft.AspNetCore.Components.Endpoints.RazorComponentsServiceOptions.DetailedErrors` is set to `true`. This approach isn't foolproof because it's possible to host a production app on a public server in the `Development` environment.

## Manage unhandled exceptions in developer code

For an app to continue after an error, the app must have error handling logic. Later sections of this article describe potential sources of unhandled exceptions.

In production, don't render framework exception messages or stack traces in the UI. Rendering exception messages or stack traces could:

* Disclose sensitive information to end users.
* Help a malicious user discover weaknesses in an app that can compromise the security of the app, server, or network.

## Unhandled exceptions for circuits

*This section applies to server-side apps operating over a circuit.*

Razor components with server interactivity enabled are stateful on the server. While users interact with the component on the server, they maintain a connection to the server known as a *circuit*. The circuit holds active component instances, plus many other aspects of state, such as:

* The most recent rendered output of components.
* The current set of event-handling delegates that could be triggered by client-side events.

If a user opens the app in multiple browser tabs, the user creates multiple independent circuits.

Blazor treats most unhandled exceptions as fatal to the circuit where they occur. If a circuit is terminated due to an unhandled exception, the user can only continue to interact with the app by reloading the page to create a new circuit. Circuits outside of the one that's terminated, which are circuits for other users or other browser tabs, aren't affected. This scenario is similar to a desktop app that crashes. The crashed app must be restarted, but other apps aren't affected.

The framework terminates a circuit when an unhandled exception occurs for the following reasons:

* An unhandled exception often leaves the circuit in an undefined state.
* The app's normal operation can't be guaranteed after an unhandled exception.
* Security vulnerabilities may appear in the app if the circuit continues in an undefined state.

## Global exception handling

For approaches to handling exceptions globally, see the following sections:

* Error boundaries: Applies to all Blazor apps.
* Alternative global exception handling: Applies to Blazor Server, Blazor WebAssembly, and Blazor Web Apps (8.0 or later) that adopt a global interactive render mode.
