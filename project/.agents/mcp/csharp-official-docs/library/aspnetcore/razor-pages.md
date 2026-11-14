---
title: "Razor Pages architecture and concepts in ASP.NET Core (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/razor-pages/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Razor Pages architecture and concepts in ASP.NET Core

By Rick Anderson, Dave Brock, and Kirk Larkin

Razor Pages can make coding page-focused scenarios easier and more productive than using controllers and views.

If you're looking for a tutorial that uses the Model-View-Controller approach, see Get started with ASP.NET Core MVC.

This article covers the architecture, concepts, and patterns that make Razor Pages effective for building page-focused web applications. It explains how Razor Pages work, their key <example-value>, and best practices for implementation. If you prefer hands-on learning with step-by-step instructions, see Tutorial: Create a Razor Pages web app with ASP.NET Core. For an overview of ASP.NET Core, see the Introduction to ASP.NET Core.

# Visual Studio

* Visual Studio 2022 with the **ASP.NET and web development** workload.
* .NET 6 SDK

# Visual Studio Code

* Visual Studio Code
* C# for Visual Studio Code (latest version)
* .NET 6 SDK

The Visual Studio Code instructions use the .NET CLI for ASP.NET Core development functions such as project creation. You can follow these instructions on macOS, Linux, or Windows and with any code editor. Minor changes may be required if you use something other than Visual Studio Code.

---

# Visual Studio

See Get started with Razor Pages for detailed instructions on how to create a Razor Pages project.

# Visual Studio Code

Run `dotnet new webapp` from the command line.

---

## Razor Pages

Razor Pages is enabled in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
```

In the preceding code:

* `Microsoft.Extensions.DependencyInjection.MvcServiceCollectionExtensions.AddRazorPages*` adds services for Razor Pages to the app.
* `Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages*` adds endpoints for Razor Pages to the `Microsoft.AspNetCore.Routing.IEndpointRouteBuilder`.

Consider a basic page:

```cshtml
﻿@page

<h1>Hello, world!</h1>
<h2>The time on the server is @DateTime.Now</h2>
```

The preceding code looks a lot like a Razor view file used in an ASP.NET Core app with controllers and views. What makes it different is the `@page` directive. `@page` makes the file into an MVC action, which means that it handles requests directly, without going through a controller. `@page` must be the first Razor directive on a page. `@page` affects the behavior of other Razor constructs. Razor Pages file names have a `.cshtml` suffix.

A similar page, using a `PageModel` class, is shown in the following two files. The `Pages/Index2.cshtml` file:

```cshtml
﻿@page
@using RazorPagesIntro.Pages
@model Index2Model

<h2>Separate page model</h2>
<p>
    @Model.Message
</p>
```

The `Pages/Index2.cshtml.cs` page model:

```csharp
﻿using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using System;

namespace RazorPagesIntro.Pages
{
    public class Index2Model : PageModel
    {
        public string Message { get; private set; } = "PageModel in C#";

        public void OnGet()
        {
            Message += $" Server time is { DateTime.Now }";
        }
    }
}
```

By convention, the `PageModel` class file has the same name as the Razor Page file with `.cs` appended. For example, the previous Razor Page is `Pages/Index2.cshtml`. The file containing the `PageModel` class is named `Pages/Index2.cshtml.cs`.

The associations of URL paths to pages are determined by the page's location in the file system. The following table shows a Razor Page path and the matching URL.

| File name and path               | matching URL |
| ----------------- | ------------ |
| `/Pages/Index.cshtml` | `/` or `/Index` |
| `/Pages/Contact.cshtml` | `/Contact` |
| `/Pages/Store/Contact.cshtml` | `/Store/Contact` |
| `/Pages/Store/Index.cshtml` | `/Store` or `/Store/Index` |

Notes:

* The runtime looks for Razor Pages files in the *Pages* folder by default.
* `Index` is the default page when a URL doesn't include a page.
