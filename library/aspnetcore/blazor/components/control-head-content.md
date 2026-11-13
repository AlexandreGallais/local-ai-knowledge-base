---
title: "Control head content in ASP.NET Core Blazor apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/components/control-head-content.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Control `<head>` content in ASP.NET Core Blazor apps

-->
-->

Razor components can modify the HTML `<head>` element content of a page, including setting the page's title (`<title>` element) and modifying metadata (`<meta>` elements).

## Control `<head>` content in a Razor component

Specify the page's title with the `Microsoft.AspNetCore.Components.Web.PageTitle` component, which enables rendering an HTML `<title>` element to a `HeadOutlet` component.

Specify `<head>` element content with the `Microsoft.AspNetCore.Components.Web.HeadContent` component, which provides content to a `HeadOutlet` component.

The following example sets the page's title and description using Razor.

`ControlHeadContent.razor`:

_Code sample not included: ~/../blazor-samples/9.0/BlazorSample_BlazorWebApp/Components/Pages/ControlHeadContent.razor._
## Set a page title for components via a layout

Set the page title in a layout component:

```razor
@inherits LayoutComponentBase

<PageTitle>Page Title</PageTitle>

<div class="page">
    ...  
</div>
```

## `HeadOutlet` component

The `Microsoft.AspNetCore.Components.Web.HeadOutlet` component renders content provided by `Microsoft.AspNetCore.Components.Web.PageTitle` and `Microsoft.AspNetCore.Components.Web.HeadContent` components.

In a Blazor Web App created from the project template, the `Microsoft.AspNetCore.Components.Web.HeadOutlet` component in `App.razor` renders `<head>` content:

```razor
<head>
    ...
    <HeadOutlet />
</head>
```

In an app created from the Blazor WebAssembly project template, the `Microsoft.AspNetCore.Components.Web.HeadOutlet` component is added to the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder.RootComponents` collection of the `Microsoft.AspNetCore.Components.WebAssembly.Hosting.WebAssemblyHostBuilder` in the client-side `Program` file:

```csharp
builder.RootComponents.Add<HeadOutlet>("head::after");
```

When the `::after` pseudo-selector is specified, the contents of the root component are appended to the existing head contents instead of replacing the content. This allows the app to retain static head content in `wwwroot/index.html` without having to repeat the content in the app's Razor components.

## Set a default page title in a Blazor Web App

Set the page title in the `App` component (`App.razor`):

```razor
<head>
    ...
    <HeadOutlet />
    <PageTitle>Page Title</PageTitle>
</head>
```

## Not found page title in a Blazor WebAssembly app

In Blazor apps created from the Blazor WebAssembly Standalone App project template, the `NotFound` component template in the `App` component (`App.razor`) sets the page title to `Not found`.

`App.razor`:

```razor
<NotFound>
    <PageTitle>Not found</PageTitle>
    ...
</NotFound>
```

## Related content

* Control headers in C# code at startup
* Blazor samples GitHub repository (`dotnet/blazor-samples`) (how to download)

Mozilla MDN Web Docs documentation:

* What's in the head? Metadata in HTML
* `<head>`: The Document Metadata (Header) element
* `<title>`: The Document Title element
* `<meta>`: The metadata element
