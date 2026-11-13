---
title: "ASP.NET Core Blazor Hybrid"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hybrid/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor Hybrid

-->
-->

This article explains ASP.NET Core Blazor Hybrid, a way to build interactive client-side web UI with .NET in an ASP.NET Core app.

Use *Blazor Hybrid* to blend desktop and mobile native client frameworks with .NET and Blazor.

In a Blazor Hybrid app, Razor components run natively on the device. Components render to an embedded Web View control through a local interop channel. Components don't run in the browser, and WebAssembly isn't involved. Razor components load and execute code quickly, and components have full access to the native capabilities of the device through the .NET platform. Component styles rendered in a Web View are platform dependent and may require you to account for rendering differences across platforms using custom stylesheets.

Blazor Hybrid articles cover subjects pertaining to integrating Razor components into native client frameworks.

## Blazor Hybrid apps with .NET MAUI

Blazor Hybrid support is built into the .NET Multi-platform App UI (.NET MAUI) framework. .NET MAUI includes the `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` control that permits rendering Razor components into an embedded Web View. By using .NET MAUI and Blazor together, you can reuse one set of web UI components across mobile, desktop, and web.

## Blazor Hybrid apps with WPF and Windows Forms

Blazor Hybrid apps can be built with Windows Presentation Foundation (WPF) and Windows Forms. Blazor provides `BlazorWebView` controls for both of these frameworks (WPF `BlazorWebView`, Windows Forms  `BlazorWebView`). Razor components run natively in the Windows desktop and render to an embedded Web View. Using Blazor in WPF and Windows Forms enables you to add new UI to your existing Windows desktop apps that can be reused across platforms with .NET MAUI or on the web.

## Web View configuration

Blazor Hybrid exposes the underlying Web View configuration for different platforms through events of the `BlazorWebView` control:

* `BlazorWebViewInitializing` provides access to the settings used to create the Web View on each platform, if settings are available.
* `BlazorWebViewInitialized` provides access to the Web View to allow further configuration of the settings.

Use the preferred patterns on each platform to attach event handlers to the events to execute your custom code.

API documentation:

* .NET MAUI
  * `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.BlazorWebViewInitializing`
  * `Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView.BlazorWebViewInitialized`
* WPF
  * `Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.BlazorWebViewInitializing`
  * `Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.BlazorWebViewInitialized`
* Windows Forms
  * `Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.BlazorWebViewInitializing`
  * `Microsoft.AspNetCore.Components.WebView.WindowsForms.BlazorWebView.BlazorWebViewInitialized`

## Unhandled exceptions in Windows Forms and WPF apps

*This section only applies to Windows Forms and WPF Blazor Hybrid apps.*

Create a callback for `UnhandledException` on the `System.AppDomain.CurrentDomain` property. The following example uses a compiler directive to display a `System.Windows.Forms.MessageBox` that either alerts the user that an error has occurred or shows the error information to the developer. Log the error information in `error.ExceptionObject`.

```csharp
AppDomain.CurrentDomain.UnhandledException += (sender, error) =>
{
#if DEBUG
    MessageBox.Show(text: error.ExceptionObject.ToString(), caption: "Error");
#else
    MessageBox.Show(text: "An error has occurred.", caption: "Error");
#endif
    
    // Log the error information (error.ExceptionObject)
};
```

## Globalization and localization

*This section only applies to .NET MAUI Blazor Hybrid apps.*

.NET MAUI configures the `System.Globalization.CultureInfo.CurrentCulture` and `System.Globalization.CultureInfo.CurrentUICulture` based on the device's ambient information.

`Microsoft.Extensions.Localization.IStringLocalizer` and other API in the `Microsoft.Extensions.Localization` namespace generally work as expected, along with globalization formatting, parsing, and binding that relies on the user's culture.

When dynamically changing the app culture at runtime, the app must be reloaded to reflect the change in culture, which takes care of rerendering the root component and passing the new culture to rerendered child components.

.NET's resource system supports embedding localized images (as blobs) into an app, but Blazor Hybrid can't display the embedded images in Razor components at this time. Even if a user reads an image's bytes into a `System.IO.Stream` using `System.Resources.ResourceManager`, the framework doesn't currently support rendering the retrieved image in a Razor component.

For more information, see the following resources:

* Localization (.NET MAUI documentation)
* Blazor Image component to display images that are not accessible through HTTP endpoints (dotnet/aspnetcore #25274)

## Access scoped services from native UI

`Microsoft.AspNetCore.Components.WebView.Maui.BlazorWebView` has a `Microsoft.AspNetCore.Components.WebView.Wpf.BlazorWebView.TryDispatchAsync*` method that calls a specified `Action<ServiceProvider>` asynchronously and passes in the scoped services available in Razor components. This enables code from the native UI to access scoped services such as `Microsoft.AspNetCore.Components.NavigationManager`:

```csharp
private async void MyMauiButtonHandler(object sender, EventArgs e)
{
    var wasDispatchCalled = await _blazorWebView.TryDispatchAsync(sp =>
    {
        var navMan = sp.GetRequiredService<NavigationManager>();
        navMan.CallSomeNavigationApi(...);
    });

    if (!wasDispatchCalled)
    {
        ...
    }
}
```

When `wasDispatchCalled` is `false`, consider what to do if the call wasn't dispatched. Generally, the dispatch shouldn't fail. If it fails, OS resources might be exhausted. If resources are exhausted, consider logging a message, throwing an exception, and perhaps alerting the user.

## Related content

* ASP.NET Core Blazor Hybrid tutorials
* .NET Multi-platform App UI (.NET MAUI)
* Windows Presentation Foundation (WPF)
* Windows Forms
