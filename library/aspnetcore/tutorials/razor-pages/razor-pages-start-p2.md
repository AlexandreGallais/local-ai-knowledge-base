---
title: "Tutorial: Get started with Razor Pages in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/tutorials/razor-pages/razor-pages-start.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Tutorial: Get started with Razor Pages in ASP.NET Core (part 2 of 2)

## Examine the project files

The following sections contain an overview of the main project folders and files that you'll work with in later tutorials.

### Pages folder

Contains Razor pages and supporting files. Each Razor page is a pair of files:

* A `.cshtml` file that has HTML markup with C# code using Razor syntax.
* A `.cshtml.cs` file that has C# code that handles page events.

Supporting files have names that begin with an underscore. For example, the `_Layout.cshtml` file configures UI elements common to all pages. `_Layout.cshtml` sets up the navigation menu at the top of the page and the copyright notice at the bottom of the page. For more information, see Layout in ASP.NET Core.

### wwwroot folder

Contains static assets, like HTML files, JavaScript files, and CSS files. For more information, see Serve static files in ASP.NET Core apps.

### `appsettings.json`

Contains configuration data, like connection strings. For more information, see Configuration in ASP.NET Core.

### Program.cs

Contains the following code:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();
app.MapRazorPages()
   .WithStaticAssets();

app.Run();
```

The following lines of code in this file create a `WebApplicationBuilder` with preconfigured defaults, add Razor Pages support to the Dependency Injection (DI) container, and builds the app:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

var app = builder.Build();
```

The developer exception page is enabled by default and provides helpful information on exceptions. Production apps should not be run in development mode because the developer exception page can leak sensitive information.

The following code sets the exception endpoint to `/Error` and enables HTTP Strict Transport Security (HSTS) protocol when the app is ***not*** running in development mode:

```csharp
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
```

For example, the preceding code runs when the app is in production or test mode. For more information, see Use multiple environments in ASP.NET Core.

The following code enables various Middleware:

* `app.UseHttpsRedirection();` : Redirects HTTP requests to HTTPS.
* `app.UseRouting();` : Adds route matching to the middleware pipeline. For more information, see Routing in ASP.NET Core.
* `app.UseAuthorization();` : Authorizes a user to access secure resources. This app doesn't use authorization, therefore this line could be removed.
* `app.MapStaticAssets();` : Maps endpoints for static assets (such as HTML, CSS, images, and JavaScript) to optimize their delivery with build-time compression and fingerprinting. For more information, see What's new in ASP.NET Core in .NET 9.
* `app.MapRazorPages().WithStaticAssets();`: Configures endpoint routing for Razor Pages and opts them into the static assets optimization system, allowing Tag Helpers to generate fingerprinted URLs, such as `/css/site.<hash>.css` (the `<hash>` placeholder is the file hash), for cache-busting.
* `app.Run();` : Runs the app.

## Troubleshooting with the completed sample

If you run into a problem you can't resolve, compare your code to the completed project. View or download completed project (how to download).

## Next steps

> Next: Add a model
