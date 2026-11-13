---
title: "ASP.NET Core Blazor hosting models (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hosting-models.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor hosting models (part 2 of 2)

## Which Blazor hosting model should I choose?

A component's hosting model is set by its *render mode*, either at compile time or runtime, which is described with examples in ASP.NET Core Blazor render modes. The following table shows the primary considerations for setting the render mode to determine a component's hosting model. For standalone Blazor WebAssembly apps, all of the app's components are rendered on the client with the Blazor WebAssembly hosting model.

Blazor Hybrid apps include .NET MAUI, WPF, and Windows Forms framework apps.

Feature | Blazor Server | Blazor WebAssembly (Wasm) | Blazor Hybrid
--- | :---: | :---: | :---:
Complete .NET API compatibility | ✔️Supported | ❌Not supported | ✔️Supported
Direct access to server and network resources | ✔️Supported | ❌Not supported&dagger; | ❌Not supported&dagger;
Small payload size with fast initial load time | ✔️Supported | ❌Not supported | ❌Not supported
Near native execution speed | ✔️Supported | ✔️Supported&Dagger; | ✔️Supported
App code secure and private on the server | ✔️Supported | ❌Not supported&dagger; | ❌Not supported&dagger;
Run apps offline once downloaded | ❌Not supported | ✔️Supported | ✔️Supported
Static site hosting | ❌Not supported | ✔️Supported | ❌Not supported
Offloads processing to clients | ❌Not supported | ✔️Supported | ✔️Supported
Full access to native client capabilities | ❌Not supported | ❌Not supported | ✔️Supported
Web-based deployment | ✔️Supported | ✔️Supported | ❌Not supported

&dagger;Blazor WebAssembly and Blazor Hybrid apps can use server-based APIs to access server/network resources and access private and secure app code.
&Dagger;Blazor WebAssembly only reaches near-native performance with ahead-of-time (AOT) compilation.

After you choose the app's hosting model, you can generate a Blazor Server or Blazor WebAssembly app from a Blazor project template. For more information, see Tooling for ASP.NET Core Blazor.

To create a Blazor Hybrid app, see the articles under ASP.NET Core Blazor Hybrid tutorials.

### Complete .NET API compatibility

Components rendered for the Blazor Server hosting model and Blazor Hybrid apps have complete .NET API compatibility, while components rendered for Blazor WebAssembly are limited to a subset of .NET APIs. When an app's specification requires one or more .NET APIs that are unavailable to WebAssembly-rendered components, then choose to render components for Blazor Server or use Blazor Hybrid.

### Direct access to server and network resources

Components rendered for the Blazor Server hosting model have direct access to server and network resources where the app is executing. Because components hosted using Blazor WebAssembly or Blazor Hybrid execute on a client, they don't have direct access to server and network resources. Components can access server and network resources *indirectly* via protected server-based APIs. Server-based APIs might be available via third-party libraries, packages, and services. Take into account the following considerations:

* Third-party libraries, packages, and services might be costly to implement and maintain, weakly supported, or introduce security risks.
* If one or more server-based APIs are developed internally by your organization, additional resources are required to build and maintain them.

Use the Blazor Server hosting model to avoid the need to expose APIs from the server environment.

### Small payload size with fast initial load time

Rendering components from the server reduces the app payload size and improves initial load times. When a fast initial load time is desired, use the Blazor Server hosting model or consider static server-side rendering.

### Near native execution speed

Blazor Hybrid apps run using the .NET runtime natively on the target platform, which offers the best possible speed.

Components rendered for the Blazor WebAssembly hosting model, including Progressive Web Apps (PWAs), and standalone Blazor WebAssembly apps run using the .NET runtime for WebAssembly, which is slower than running directly on the platform. Consider using ahead-of-time (AOT) compiled to improve runtime performance when using Blazor WebAssembly.

### App code secure and private on the server

Maintaining app code securely and privately on the server is a built-in feature of components rendered for the Blazor Server hosting model. Components rendered using the Blazor WebAssembly or Blazor Hybrid hosting models can use server-based APIs to access functionality that must be kept private and secure. The considerations for developing and maintaining server-based APIs described in the Direct access to server and network resources section apply. If the development and maintenance of server-based APIs isn't desirable for maintaining secure and private app code, render components for the Blazor Server hosting model.

### Run apps offline once downloaded

Standalone Blazor WebAssembly apps built as Progressive Web Apps (PWAs) and Blazor Hybrid apps can run offline, which is particularly useful when clients aren't able to connect to the Internet. Components rendered for the Blazor Server hosting model fail to run when the connection to the server is lost. If an app must run offline, standalone Blazor WebAssembly and Blazor Hybrid are the best choices.

### Static site hosting

Static site hosting is possible with standalone Blazor WebAssembly apps because they're downloaded to clients as a set of static files. Standalone Blazor WebAssembly apps don't require a server to execute server-side code in order to download and run and can be delivered via a Content Delivery Network (CDN) (for example, Azure CDN).

Although Blazor Hybrid apps are compiled into one or more self-contained deployment assets, the assets are usually provided to clients through a third-party app store. If static hosting is an app requirement, select standalone Blazor WebAssembly.

### Offloads processing to clients

Blazor WebAssembly and Blazor Hybrid apps execute on clients and thus offload processing to clients. Blazor Server apps execute on a server, so server resource demand typically increases with the number of users and the amount of processing required per user. When it's possible to offload most or all of an app's processing to clients and the app processes a significant amount of data, Blazor WebAssembly or Blazor Hybrid is the best choice.

### Full access to native client capabilities

Blazor Hybrid apps have full access to native client API capabilities via .NET native app frameworks. In Blazor Hybrid apps, Razor components run directly in the native app, not on WebAssembly. When full client capabilities are a requirement, Blazor Hybrid is the best choice.

### Web-based deployment

Blazor Web Apps are updated on the next app refresh from the browser.

Blazor Hybrid apps are native client apps that typically require an installer and platform-specific deployment mechanism.

## Setting a component's hosting model

To set a component's hosting model to Blazor Server or Blazor WebAssembly at compile-time or dynamically at runtime, you set its *render mode*. Render modes are fully explained and demonstrated in the ASP.NET Core Blazor render modes article. We don't recommend that you jump from this article directly to the *Render modes* article without reading the content in the articles between these two articles. For example, render modes are more easily understood by looking at Razor component examples, but basic Razor component structure and function isn't covered until the ASP.NET Core Blazor fundamentals article is reached. It's also helpful to learn about Blazor's project templates and tooling before working with the component examples in the *Render modes* article.
