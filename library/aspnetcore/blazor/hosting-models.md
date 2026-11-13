---
title: "ASP.NET Core Blazor hosting models (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hosting-models.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor hosting models

-->
-->

This article explains Blazor hosting models, primarily focused on Blazor Server and Blazor WebAssembly apps in versions of .NET earlier than .NET 8. The guidance in this article is relevant under all .NET releases for Blazor Hybrid apps that run on native mobile and desktop platforms. Blazor Web Apps in .NET 8 or later are better conceptualized by how Razor components are rendered, which is described as their *render mode*. Render modes are briefly touched on in the *Fundamentals* overview article and covered in detail in ASP.NET Core Blazor render modes of the *Components* node.

Blazor is a web framework for building web UI components (Razor components) that can be hosted in different ways. Razor components can run server-side in ASP.NET Core (*Blazor Server*) versus client-side in the browser on a WebAssembly-based .NET runtime (*Blazor WebAssembly*, *Blazor Wasm*). You can also host Razor components in native mobile and desktop apps that render to an embedded Web View control (*Blazor Hybrid*). Regardless of the hosting model, the way you build Razor components *is the same*. The same Razor components can be used with any of the hosting models unchanged.

## Blazor Server

With the Blazor Server hosting model, components are executed on the server from within an ASP.NET Core app. UI updates, event handling, and JavaScript calls are handled over a SignalR connection using the WebSockets protocol. The state on the server associated with each connected client is called a *circuit*. Circuits aren't tied to a specific network connection and can tolerate temporary network interruptions and attempts by the client to reconnect to the server when the connection is lost.

In a traditional server-rendered app, opening the same app in multiple browser screens (tabs or `iframes`) typically doesn't translate into additional resource demands on the server. For the Blazor Server hosting model, each browser screen requires a separate circuit and separate instances of server-managed component state. Blazor considers closing a browser tab or navigating to an external URL a *graceful* termination. In the event of a graceful termination, the circuit and associated resources are immediately released. A client may also disconnect non-gracefully, for instance due to a network interruption. Blazor Server stores disconnected circuits for a configurable interval to allow the client to reconnect.

On the client, the Blazor script establishes the SignalR connection with the server. The script is served as a static web asset with automatic compression and fingerprinting.

The Blazor Server hosting model offers several benefits:

* Download size is significantly smaller than when the Blazor WebAssembly hosting model is used, and the app loads much faster.
* The app takes full advantage of server capabilities, including the use of .NET APIs.
* .NET on the server is used to run the app, so existing .NET tooling, such as debugging, works as expected.
* Thin clients are supported. For example, Blazor Server works with browsers that don't support WebAssembly and on resource-constrained devices.
* The app's .NET/C# code base, including the app's component code, isn't served to clients.

The Blazor Server hosting model has the following limitations:

* Higher latency usually exists. Every user interaction involves a network hop.
* There's no offline support. If the client connection fails, interactivity fails.
* Scaling apps with many users requires server resources to handle multiple client connections and client state.
* An ASP.NET Core server is required to serve the app. Serverless deployment scenarios aren't possible, such as serving the app from a Content Delivery Network (CDN).

We recommend using the Azure SignalR Service for apps that adopt the Blazor Server hosting model. The service allows for scaling up a Blazor Server app to a large number of concurrent SignalR connections.

## Blazor WebAssembly

The Blazor WebAssembly hosting model runs components client-side in the browser on a WebAssembly-based .NET runtime. Razor components, their dependencies, and the .NET runtime are downloaded to the browser. Components are executed directly on the browser UI thread. UI updates and event handling occur within the same process. Assets are deployed as static files to a web server or service capable of serving static content to clients.

Blazor Web Apps can use the Blazor WebAssembly hosting model to enable client-side interactivity. When an app is created that exclusively runs on the Blazor WebAssembly hosting model without server-side rendering and interactivity, the app is called a *standalone* Blazor WebAssembly app.

A Blazor WebAssembly app built as a Progressive Web App (PWA) uses modern browser APIs to enable many of the capabilities of a native client app, such as working offline, running in its own app window, launching from the host's operating system, receiving push notifications, and automatically updating in the background.

The Blazor script handles:

* Downloading the .NET runtime, Razor components, and dependencies.
* Runtime initialization.

The size of the published app, its *payload size*, is a critical performance factor for an app's usability. A large app takes a relatively long time to download to a browser, which diminishes the user experience. Blazor WebAssembly optimizes payload size to reduce download times:

* Unused code is stripped out of the app when it's published by the Intermediate Language (IL) Trimmer.
* HTTP responses are compressed.
* The .NET runtime and assemblies are cached in the browser.

The Blazor WebAssembly hosting model offers several benefits:

* For standalone Blazor WebAssembly apps, there's no .NET server-side dependency after the app is downloaded from the server, so the app remains functional if the server goes offline.
* Client resources and capabilities are fully leveraged.
* Work is offloaded from the server to the client.
* For standalone Blazor WebAssembly apps, an ASP.NET Core web server isn't required to host the app. Serverless deployment scenarios are possible, such as serving the app from a Content Delivery Network (CDN).

The Blazor WebAssembly hosting model has the following limitations:

* Razor components are restricted to the capabilities of the browser.
* Capable client hardware and software (for example, WebAssembly support) is required.
* Download size is larger, and components take longer to load.
* Code sent to the client can't be protected from inspection and tampering by users.

The .NET Intermediate Language (IL) interpreter includes partial just-in-time (JIT) runtime support to achieve improved runtime performance. The JIT interpreter optimizes execution of interpreter bytecodes by replacing them with tiny blobs of WebAssembly code. The JIT interpreter is automatically enabled for Blazor WebAssembly apps except when debugging.

Blazor supports ahead-of-time (AOT) compilation, where you can compile your .NET code directly into WebAssembly. AOT compilation results in runtime performance improvements at the expense of a larger app size. For more information, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

The same .NET WebAssembly build tools used for AOT compilation also relink the .NET WebAssembly runtime to trim unused runtime code. Blazor also trims unused code from .NET framework libraries. The .NET compiler further precompresses a standalone Blazor WebAssembly app for a smaller app payload.

WebAssembly-rendered Razor components can use native dependencies built to run on WebAssembly.

## Blazor Hybrid

Blazor can also be used to build native client apps using a hybrid approach. Hybrid apps are native apps that leverage web technologies for their functionality. In a Blazor Hybrid app, Razor components run directly in the native app (not on WebAssembly) along with any other .NET code and render web UI based on HTML and CSS to an embedded Web View control through a local interop channel.

Blazor Hybrid apps can be built using different .NET native app frameworks, including .NET MAUI, WPF, and Windows Forms. Blazor provides `BlazorWebView` controls for adding Razor components to apps built with these frameworks. Using Blazor with .NET MAUI offers a convenient way to build cross-platform Blazor Hybrid apps for mobile and desktop, while Blazor integration with WPF and Windows Forms can be a great way to modernize existing apps.

Because Blazor Hybrid apps are native apps, they can support functionality that isn't available with only the web platform. Blazor Hybrid apps have full access to native platform capabilities through normal .NET APIs. Blazor Hybrid apps can also share and reuse components with existing Blazor Server or Blazor WebAssembly apps. Blazor Hybrid apps combine the benefits of the web, native apps, and the .NET platform.

The Blazor Hybrid hosting model offers several benefits:

* Reuse existing components that can be shared across mobile, desktop, and web.
* Leverage web development skills, experience, and resources.
* Apps have full access to the native capabilities of the device.

The Blazor Hybrid hosting model has the following limitations:

* Separate native client apps must be built, deployed, and maintained for each target platform.
* Native client apps usually take longer to find, download, and install over accessing a web app in a browser.

For more information, see ASP.NET Core Blazor Hybrid.

For more information on Microsoft native client frameworks, see the following resources:

* .NET Multi-platform App UI (.NET MAUI)
* Windows Presentation Foundation (WPF)
* Windows Forms
