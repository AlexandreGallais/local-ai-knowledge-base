---
title: "Build a .NET MAUI Blazor Hybrid app with a Blazor Web App (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hybrid/tutorials/maui-blazor-web-app.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Build a .NET MAUI Blazor Hybrid app with a Blazor Web App (part 3 of 3)

## Using interfaces to support different device implementations

The following example demonstrates how to use an interface to call into different implementations across the web app and the native (MAUI) app. The following example creates a component that displays the device form factor. Use the MAUI abstraction layer for native apps and provide an implementation for the web app.

In the Razor class library (RCL), a `Services` folder contains an `IFormFactor` interface.

`Services/IFormFactor.cs`:

_Code sample not included: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Shared/Services/IFormFactor.cs._
The `Home` component (`Components/Pages/Home.razor`) of the RCL displays the form factor and platform.

`Components/Pages/Home.razor`:

```razor
@page "/"
@using MauiBlazorWeb.Shared.Services
@inject IFormFactor FormFactor

<PageTitle>Home</PageTitle>

<h1>Hello, world!</h1>

Welcome to your new app running on <em>@factor</em> using <em>@platform</em>.

@code {
    private string factor => FormFactor.GetFormFactor();
    private string platform => FormFactor.GetPlatform();
}
```

The web and native apps contain the implementations for `IFormFactor`.

In the Blazor Web App, a folder named `Services` contains the following `FormFactor.cs` file with the `FormFactor` implementation for web app use.

`Services/FormFactor.cs` (`MauiBlazorWeb.Web` project):

_Code sample not included: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb.Web/Services/FormFactor.cs._
In the MAUI project, a folder named `Services` contains the following `FormFactor.cs` file with the `FormFactor` implementation for native use. The MAUI abstractions layer is used to write code that works on all native device platforms.

`Services/FormFactor.cs` (`MauiBlazorWeb` project):

_Code sample not included: ~/../blazor-samples/9.0/MauiBlazorWeb/MauiBlazorWeb/Services/FormFactor.cs._
Dependency injection is used to obtain the implementations of these services.

In the MAUI project, the `MauiProgram.cs` file has following `using` statements at the top of the file:

```csharp
using MauiBlazorWeb.Services;
using MauiBlazorWeb.Shared.Interfaces;
```

Immediately before the call to `builder.Build()`, `FormFactor` is registered to add device-specific services used by the RCL:

```csharp
builder.Services.AddSingleton<IFormFactor, FormFactor>();
```

In the Blazor Web App, the `Program` file has the following `using` statements at the top of the file:

```csharp
using MauiBlazorWeb.Shared.Interfaces;
using MauiBlazorWeb.Web.Services;  
```

Immediately before the call to `builder.Build()`, `FormFactor` is registered to add device-specific services used by the Blazor Web App:

```csharp
builder.Services.AddScoped<IFormFactor, FormFactor>();
```

If the solution also targets WebAssembly via a `.Web.Client` project, an implementation of the preceding API is also required in the `.Web.Client` project.

You can also use compiler preprocessor directives in your RCL to implement different UI depending on the device the app is running on. For this scenario, the app must multi-target the RCL just like the MAUI app does. For an example, see the `BethMassi/BethTimeUntil` GitHub repository.

## Related content

* ASP.NET Core Blazor Hybrid authentication and authorization
* ASP.NET Core Blazor render modes
* Reuse Razor components in ASP.NET Core Blazor Hybrid apps
