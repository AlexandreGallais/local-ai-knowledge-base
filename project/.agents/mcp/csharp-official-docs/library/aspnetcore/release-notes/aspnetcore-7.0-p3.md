---
title: "What's new in ASP.NET Core in .NET 7 (part 3 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-7.0.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 7 (part 3 of 4)

## Blazor

### Handle location changing events and navigation state

In .NET 7, Blazor supports location changing events and maintaining navigation state. This allows you to warn users about unsaved work or to perform related actions when the user performs a page navigation.

For more information, see the following sections of the *Routing and navigation* article:

* Navigation options
* Handle/prevent location changes

### Empty Blazor project templates

Blazor has two new project templates for starting from a blank slate. The new **Blazor Server App Empty** and **Blazor WebAssembly App Empty** project templates are just like their non-empty counterparts but without example code. These empty templates only include a basic home page, and we've removed Bootstrap so that you can start with a different CSS framework.

For more information, see the following articles:

* Tooling for ASP.NET Core Blazor
* ASP.NET Core Blazor project structure

### Blazor custom elements

The `Microsoft.AspNetCore.Components.CustomElements` package enables building standards based custom DOM elements using Blazor.

For more information, see ASP.NET Core Razor components.

### Bind modifiers (`@bind:after`, `@bind:get`, `@bind:set`)

> **Important:**
> The `@bind:after`/`@bind:get`/`@bind:set` features are receiving further updates at this time. To take advantage of the latest updates, confirm that you've installed the latest SDK.
>
> Using an event callback parameter (`[Parameter] public EventCallback<string> ValueChanged { get; set; }`) isn't supported. Instead, pass an `System.Action`-returning or `System.Threading.Tasks.Task`-returning method to `@bind:set`/`@bind:after`.
>
> For more information, see the following resources:
>
> * Blazor `@bind:after` not working on .NET 7 RTM release (dotnet/aspnetcore #44957)
> * `BindGetSetAfter701` sample app (javiercn/BindGetSetAfter701 GitHub repository)

In .NET 7, you can run asynchronous logic after a binding event has completed using the new `@bind:after` modifier. In the following example, the `PerformSearch` asynchronous method runs automatically after any changes to the search text are detected:

```razor
<input @bind="searchText" @bind:after="PerformSearch" />

@code {
    private string searchText;

    private async Task PerformSearch()
    {
        ...
    }
}
```

In .NET 7, it's also easier to set up binding for component parameters. Components can support two-way data binding by defining a pair of parameters:

* `@bind:get`: Specifies the value to bind.
* `@bind:set`: Specifies a callback for when the value changes.

The `@bind:get` and `@bind:set` modifiers are always used together.

Examples:

```razor
@* Elements *@

<input type="text" @bind="text" @bind:after="() => { }" />

<input type="text" @bind:get="text" @bind:set="(value) => { }" />

<input type="text" @bind="text" @bind:after="AfterAsync" />

<input type="text" @bind:get="text" @bind:set="SetAsync" />

<input type="text" @bind="text" @bind:after="() => { }" />

<input type="text" @bind:get="text" @bind:set="(value) => { }" />

<input type="text" @bind="text" @bind:after="AfterAsync" />

<input type="text" @bind:get="text" @bind:set="SetAsync" />

@* Components *@

<InputText @bind-Value="text" @bind-Value:after="() => { }" />

<InputText @bind-Value:get="text" @bind-Value:set="(value) => { }" />

<InputText @bind-Value="text" @bind-Value:after="AfterAsync" />

<InputText @bind-Value:get="text" @bind-Value:set="SetAsync" />

<InputText @bind-Value="text" @bind-Value:after="() => { }" />

<InputText @bind-Value:get="text" @bind-Value:set="(value) => { }" />

<InputText @bind-Value="text" @bind-Value:after="AfterAsync" />

<InputText @bind-Value:get="text" @bind-Value:set="SetAsync" />

@code {
    private string text = "";

    private void After(){}
    private void Set() {}
    private Task AfterAsync() { return Task.CompletedTask; }
    private Task SetAsync(string value) { return Task.CompletedTask; }
}
```

For more information on the `InputText` component, see ASP.NET Core Blazor input components.

### Hot Reload improvements

In .NET 7, Hot Reload support includes the following:

* Components reset their parameters to their default values when a value is removed.
* Blazor WebAssembly:
  * Add new types.
  * Add nested classes.
  * Add static and instance methods to existing types.
  * Add static fields and methods to existing types.
  * Add static lambdas to existing methods.
  * Add lambdas that capture `this` to existing methods that already captured `this` previously.

### Dynamic authentication requests with MSAL in Blazor WebAssembly

New in .NET 7, Blazor WebAssembly supports creating dynamic authentication requests at runtime with custom parameters to handle advanced authentication scenarios.

For more information, see the following articles:

* Secure ASP.NET Core Blazor WebAssembly
* ASP.NET Core Blazor WebAssembly additional security scenarios

### Blazor WebAssembly debugging improvements

Blazor WebAssembly debugging has the following improvements:

* Support for the **Just My Code** setting to show or hide type members that aren't from user code.
* Support for inspecting multidimensional arrays.
* **Call Stack** now shows the correct name for asynchronous methods.
* Improved expression evaluation.
* Correct handling of the `new` keyword on derived members.
* Support for debugger-related attributes in `System.Diagnostics`.

### `System.Security.Cryptography` support on WebAssembly

.NET 6 supported the SHA family of hashing algorithms when running on WebAssembly. .NET 7 enables more cryptographic algorithms by taking advantage of :::no-loc text="SubtleCrypto":::, when possible, and falling back to a .NET implementation when :::no-loc text="SubtleCrypto"::: can't be used. The following algorithms are supported on WebAssembly in .NET 7:

* SHA1
* SHA256
* SHA384
* SHA512
* HMACSHA1
* HMACSHA256
* HMACSHA384
* HMACSHA512
* AES-CBC
* PBKDF2
* HKDF

For more information, see Developers targeting browser-wasm can use Web Crypto APIs (dotnet/runtime #40074).

### Inject services into custom validation attributes

You can now inject services into custom validation attributes. Blazor sets up the `ValidationContext` so that it can be used as a service provider.

For more information, see ASP.NET Core Blazor forms validation.

### `Input*` components outside of an `EditContext`/`EditForm`

The built-in input components are now supported outside of a form in Razor component markup.

For more information, see ASP.NET Core Blazor input components.

### Project template changes

When .NET 6 was released last year, the HTML markup of the `_Host` page (`Pages/_Host.chstml`) was split between the `_Host` page and a new `_Layout` page (`Pages/_Layout.chstml`) in the .NET 6 Blazor Server project template.

In .NET 7, the HTML markup has been recombined with the `_Host` page in project templates.

Several additional changes were made to the Blazor project templates. It isn't feasible to list every change to the templates in the documentation. To migrate an app to .NET 7 in order to adopt all of the changes, see Migrate from ASP.NET Core in .NET 6 to .NET 7.

### Experimental `QuickGrid` component

The new `QuickGrid` component provides a convenient data grid component for most common requirements and as a reference architecture and performance baseline for anyone building Blazor data grid components.

For more information, see ASP.NET Core Blazor \`QuickGrid\` component.

Live demo: QuickGrid for Blazor sample app

### Virtualization enhancements

Virtualization enhancements in .NET 7:

* The `Virtualize` component supports using the document itself as the scroll root, as an alternative to having some other element with `overflow-y: scroll` applied.
* If the `Virtualize` component is placed inside an element that requires a specific child tag name, `SpacerElement` allows you to obtain or set the virtualization spacer tag name.

For more information, see the following sections of the *Virtualization* article:

* Root-level virtualization
* Control the spacer element tag name

### `MouseEventArgs` updates

`MovementX` and `MovementY` have been added to `MouseEventArgs`.

For more information, see ASP.NET Core Blazor event handling.

### New Blazor loading page

The Blazor WebAssembly project template has a new loading UI that shows the progress of loading the app.

For more information, see ASP.NET Core Blazor startup.

### Improved diagnostics for authentication in Blazor WebAssembly

To help diagnose authentication issues in Blazor WebAssembly apps, detailed logging is available.

For more information, see ASP.NET Core Blazor logging.

### JavaScript interop on WebAssembly

JavaScript `[JSImport]`/`[JSExport]` interop API is a new low-level mechanism for using .NET in Blazor WebAssembly and JavaScript-based apps. With this new JavaScript interop capability, you can invoke .NET code from JavaScript using the .NET WebAssembly runtime and call into JavaScript functionality from .NET without any dependency on the Blazor UI component model.

For more information:

* JavaScript JSImport/JSExport interop with ASP.NET Core Blazor: Pertains only to Blazor WebAssembly apps.
* JavaScript \`\[JSImport\]\`/\`\[JSExport\]\` interop in .NET WebAssembly: Pertains only to JavaScript apps that don't depend on the Blazor UI component model.

### Conditional registration of the authentication state provider

Prior to the release of .NET 7, `AuthenticationStateProvider` was registered in the service container with `AddScoped`. This made it difficult to debug apps, as it forced a specific order of service registrations when providing a custom implementation. Due to internal framework changes over time, it's no longer necessary to register `AuthenticationStateProvider` with `AddScoped`.

In developer code, make the following change to the authentication state provider service registration:

```diff
- builder.Services.AddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
+ builder.Services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
```

In the preceding example, `ExternalAuthStateProvider` is the developer's service implementation.

### Improvements to the .NET WebAssembly build tools

New features in the `wasm-tools` workload for .NET 7 that help improve performance and handle exceptions:

* WebAssembly Single Instruction, Multiple Data (SIMD) support (only with AOT, not supported by Apple Safari)
* WebAssembly exception handling support

For more information, see ASP.NET Core Blazor WebAssembly build tools and ahead-of-time (AOT) compilation.

## Blazor Hybrid

### External URLs

An option has been added that permits opening external webpages in the browser.

For more information, see ASP.NET Core Blazor Hybrid routing and navigation.

### Security

New guidance is available for Blazor Hybrid security scenarios. For more information, see the following articles:

* ASP.NET Core Blazor Hybrid authentication and authorization
* ASP.NET Core Blazor Hybrid security considerations
