---
title: "WebHostBuilder, IWebHost, and WebHost are obsolete"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/10/webhostbuilder-deprecated.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# WebHostBuilder, IWebHost, and WebHost are obsolete

`Microsoft.AspNetCore.Hosting.WebHostBuilder`, `Microsoft.AspNetCore.Hosting.IWebHost`, and `Microsoft.AspNetCore.WebHost` have been marked as obsolete in .NET 10. `WebHostBuilder` was replaced by `HostBuilder` (generic host) in ASP.NET Core 3.0, and `WebApplicationBuilder` was introduced in ASP.NET Core 6.0. These newer alternatives are where future investments will occur.

## Version introduced

.NET 10 RC 1

## Previous behavior

Previously, you could use `WebHostBuilder` to configure and build a web host without any compile-time warnings.

## New behavior

Starting in .NET 10, using `WebHostBuilder` produces a compiler warning with diagnostic ID `ASPDEPR004`:

> warning ASPDEPR004: WebHostBuilder is deprecated in favor of HostBuilder and WebApplicationBuilder. For more information, visit <https://aka.ms/aspnet/deprecate/004>.

Using `IWebHost` or `WebHost` produces a compiler warning with diagnostic ID `ASPDEPR008`:

> warning ASPDEPR008: WebHost is obsolete. Use HostBuilder or WebApplicationBuilder instead. For more information, visit <https://aka.ms/aspnet/deprecate/008>.

## Type of breaking change

This change can affect source compatibility.

## Reason for change

`HostBuilder` and `Microsoft.AspNetCore.Builder.WebApplication` have all the features of `WebHostBuilder` and are the focus of future investment. `WebHostBuilder` was replaced by the generic host in ASP.NET Core 3.0, and Minimal APIs with `Microsoft.AspNetCore.Builder.WebApplicationBuilder` were introduced in ASP.NET Core 6.0. These newer hosting models provide better integration with the .NET ecosystem and are the recommended approach for new applications.

## Recommended action

Migrate from `WebHostBuilder` to either `HostBuilder` or `WebApplication`:

- For applications that need the full hosting capabilities, migrate to `HostBuilder`:

  **Before:**

  ```csharp
  var hostBuilder = new WebHostBuilder()
      .UseContentRoot(Directory.GetCurrentDirectory())
      .UseStartup()
      .UseKestrel();
  // Test code might use TestServer:
  var testServer = new TestServer(hostBuilder);
  ```

  **After:**

  ```csharp
  using var host = new HostBuilder()
      .ConfigureWebHost(webHostBuilder =>
      {
          webHostBuilder
              .UseTestServer() // If using TestServer.
              .UseContentRoot(Directory.GetCurrentDirectory())
              .UseStartup()
              .UseKestrel();
      })
      .Build();
  await host.StartAsync();

  var testServer = host.GetTestServer();
  ```

- For new applications, especially those using Minimal APIs, migrate to `Microsoft.AspNetCore.Builder.WebApplicationBuilder`.

## Affected APIs

- `Microsoft.AspNetCore.Hosting.WebHostBuilder`
- `Microsoft.AspNetCore.Hosting.IWebHost`
- `Microsoft.AspNetCore.WebHost`

## See also

- Generic Host in ASP.NET Core
- Minimal APIs with WebApplication
- HostBuilder replaces WebHostBuilder
- Introducing WebApplication
