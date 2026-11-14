---
title: "Multiple hosted ASP.NET Core Blazor WebAssembly apps (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/host-and-deploy/webassembly/multiple-hosted-webassembly.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Multiple hosted ASP.NET Core Blazor WebAssembly apps (part 2 of 3)

## Configuration

Select the version of this article that matches your hosting requirements, either port/domain hosting (for example, `:5001`/`:5002` or `firstapp.com`/`secondapp.com`) or route subpath hosting (for example, `/FirstApp` and `/SecondApp`).

**port-domain:**

With the current hosting selection, this article covers port/domain hosting (for example, `:5001`/`:5002` or `firstapp.com`/`secondapp.com`).

In the following examples:

* The project name of the hosted Blazor WebAssembly app is `MultipleBlazorApps` in a folder named `MultipleBlazorApps`.
* The three projects in the solution before a second client app is added are `MultipleBlazorApps.Client` in the `Client` folder, `MultipleBlazorApps.Server` in the `Server` folder, and `MultipleBlazorApps.Shared` in the `Shared` folder.
* The initial (first) client app is the default client project of the solution created from the Blazor WebAssembly project template.
* A second client app is added to the solution, `MultipleBlazorApps.SecondClient` in a folder named `SecondClient`.
* Optionally, the server project (`MultipleBlazorApps.Server`) can serve pages or views as a Razor Pages or MVC app.
* The first client app is accessible in a browser at port 5001 or with a host of `firstapp.com`. The second client app is accessible in a browser at port 5002 or with a host of `secondapp.com`.

**route-subpath:**

With the current selection, this article covers route subpath hosting (for example, `/FirstApp` and `/SecondApp`).

In the following examples:

* The project name of the hosted Blazor WebAssembly app is `MultipleBlazorApps` in a folder named `MultipleBlazorApps`.
* The three projects in the solution before a second client app is added are `MultipleBlazorApps.Client` in the `Client` folder, `MultipleBlazorApps.Server` in the `Server` folder, and `MultipleBlazorApps.Shared` in the `Shared` folder.
* The initial (first) client app is the default client project of the solution created from the Blazor WebAssembly project template.
* A second client app is added to the solution, `MultipleBlazorApps.SecondClient` in a folder named `SecondClient`.
* Optionally, the server project (`MultipleBlazorApps.Server`) can serve pages or views as a formal Razor Pages or MVC app.
* Both client apps use the default port defined by the `MultipleBlazorApps.Server` project's `Properties/launchSettings.json` file in its `applicationUrl` value. The first client app is accessible in a browser at the `/FirstApp` subpath. The second client app is accessible in a browser at the `/SecondApp` subpath.

The examples shown in this article require additional configuration for:

* Accessing the apps directly at the example host domains, `firstapp.com` and `secondapp.com`.
* Certificates for the client apps to enable TLS/HTTPS security.
* Configuring the server app as a Razor Pages app for the following features:
  * Integration of Razor components into pages or views.
  * Prerendering Razor components.

The preceding configurations are beyond the scope of this article. For more information, see the following resources:

* Host and deploy ASP.NET Core
* Enforce HTTPS in ASP.NET Core
* Integrate ASP.NET Core Razor components with MVC or Razor Pages in hosted Blazor WebAssembly solutions

Use an existing hosted Blazor WebAssembly solution or create a new hosted Blazor WebAssembly solution from the Blazor WebAssembly project template by passing the `-ho|--hosted` option if using the .NET CLI or selecting the **ASP.NET Core Hosted** checkbox in Visual Studio when the project is created in the IDE.

Use a folder for the solution named `MultipleBlazorApps` and name the project `MultipleBlazorApps`.

Create a new folder in the solution named `SecondClient`. In the new folder, add a second Blazor WebAssembly client app named `MultipleBlazorApps.SecondClient`. Add the project as a standalone Blazor WebAssembly app. To create a standalone Blazor WebAssembly app, don't pass the `-ho|--hosted` option if using the .NET CLI or don't use the **ASP.NET Core Hosted** checkbox if using Visual Studio.

Make the following changes to the `MultipleBlazorApps.SecondClient` project:

* Copy the `FetchData` component (`Pages/FetchData.razor`) from the `Client/Pages` folder to the `SecondClient/Pages` folder. This step is required because a standalone Blazor WebAssembly app doesn't call a **:::no-loc text="Server":::** project's controller for weather data, it uses a static data file. By copying the `FetchData` component to the added project, the second client app also makes a web API call to the server API for weather data.
* Delete the `SecondClient/wwwroot/sample-data` folder, as the `weather.json` file in the folder isn't used.

The following table describes the solution's folders and project names after the `SecondClient` folder and `MultipleBlazorApps.SecondClient` project are added.

Physical folder | Project name | Description
--- | --- | ---
`Client` | `MultipleBlazorApps.Client` | Blazor WebAssembly client app
`SecondClient` | `MultipleBlazorApps.SecondClient` | Blazor WebAssembly client app
`Server` | `MultipleBlazorApps.Server` | ASP.NET Core server app
`Shared` | `MultipleBlazorApps.Shared` | Shared resources project

The `MultipleBlazorApps.Server` project serves the two Blazor WebAssembly client apps and provides weather data to the client apps' `FetchData` components via an MVC controller. Optionally, the `MultipleBlazorApps.Server` project can also serve pages or views, as a traditional Razor Pages or MVC app. Steps to enable serving pages or views are covered later in this article.

**port-domain:**

> **Note:**
> The demonstration in this article uses static web asset path names of `FirstApp` for the `MultipleBlazorApps.Client` project and `SecondApp` for the `MultipleBlazorApps.SecondClient` project. The names "`FirstApp`" and "`SecondApp`" are merely for demonstration purposes. Other names are acceptable to distinguish the client apps, such as `App1`/`App2`, `Client1`/`Client2`, `1`/`2`, or any similar naming scheme.
>
> When routing requests to the client apps by a port or a domain, "`FirstApp`" and "`SecondApp`" are used ***internally*** to route requests and serve responses for static assets and aren't seen in the browser's address bar.

**route-subpath:**

> **Note:**
> The demonstration in this article uses static web asset path names of `FirstApp` for the `MultipleBlazorApps.Client` project and `SecondApp` for the `MultipleBlazorApps.SecondClient` project. The names "`FirstApp`" and "`SecondApp`" are merely for demonstration purposes. Other names are acceptable to distinguish the client apps, such as `App1`/`App2`, `Client1`/`Client2`, `1`/`2`, or any similar naming scheme.
>
> "`FirstApp`" and "`SecondApp`" also appear in the browser's address bar because requests are routed to the two client apps using these names. Other valid URL route segments are supported, and the route segments don't strictly need to match the names used to route static web assets internally. Using "`FirstApp`" and "`SecondApp`" for both the internal static asset routing and app request routing is merely for convenance in this article's examples.

In the first client app's project file (`MultipleBlazorApps.Client.csproj`), add a `<StaticWebAssetBasePath>` property to a `<PropertyGroup>` with a value of `FirstApp` to set the base path for the project's static assets:

```xml
<StaticWebAssetBasePath>FirstApp</StaticWebAssetBasePath>
```

In the `MultipleBlazorApps.SecondClient` app's project file (`MultipleBlazorApps.SecondClient.csproj`):

* Add a `<StaticWebAssetBasePath>` property to a `<PropertyGroup>` with a value of `SecondApp`:

  ```xml
  <StaticWebAssetBasePath>SecondApp</StaticWebAssetBasePath>
  ```

* Add a project reference for the `MultipleBlazorApps.Shared` project to an `<ItemGroup>`:

  ```xml
  <ItemGroup>
    <ProjectReference Include="..\Shared\MultipleBlazorApps.Shared.csproj" />
  </ItemGroup>
  ```

In the server app's project file (`Server/MultipleBlazorApps.Server.csproj`), create a project reference for the added `MultipleBlazorApps.SecondClient` client app in an `<ItemGroup>`:

```xml
<ProjectReference Include="..\SecondClient\MultipleBlazorApps.SecondClient.csproj" />
```

**port-domain:**

In the server app's `Properties/launchSettings.json` file, configure the `applicationUrl` of the Kestrel profile (`MultipleBlazorApps.Server`) to access the client apps at ports 5001 and 5002. If you configure your local environment to use the example domains, URLs for `applicationUrl` can use `firstapp.com` and `secondapp.com` and not use the ports.

> **Note:**
> The use of ports in this demonstration allows access to the client projects in a local browser without the need to configure a local hosting environment so that web browsers can access the client apps via the host configurations, `firstapp.com` and `secondapp.com`. In production scenarios, a typical configuration is to use subdomains to distinguish the client apps.
>
> For example:
>
> * The ports are dropped from the configuration of this demonstration.
> * The hosts are changed to use subdomains, such as `www.contoso.com` for site visitors and `admin.contoso.com` for administrators.
> * Additional hosts can be included for additional client apps, and at least one more host is required if the server app is also a Razor Pages or MVC app that serves pages or views.

If you plan to serve pages or views from the server app, use the following `applicationUrl` setting in the `Properties/launchSettings.json` file, which permits the following access:

* Optionally, the Razor Pages or MVC app (`MultipleBlazorApps.Server` project) responds to requests at port 5000.
* Responses to requests for the first client (`MultipleBlazorApps.Client` project) are at port 5001.
* Responses to requests for the second client (`MultipleBlazorApps.SecondClient` project) are at port 5002.

```json
"applicationUrl": "https://localhost:5000;https://localhost:5001;https://localhost:5002",
```

If you don't plan for the server app to serve pages or views and only serve the Blazor WebAssembly client apps, use the following setting, which permits the following access:

* The first client app responds on port 5001.
* The second client app responds on port 5002.

```json
"applicationUrl": "https://localhost:5001;https://localhost:5002",
```

In the server app's `Program.cs` file, remove the following code, which appears after the call to `Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*`:

* If you plan to serve pages or views from the server app, delete the following lines of code:

  ```diff
  - app.UseBlazorFrameworkFiles();
  ```

  ```diff
  - app.MapFallbackToFile("index.html");
  ```

* If you plan for the server app to only serve the Blazor WebAssembly client apps, delete the following code:

  ```diff
  - app.UseBlazorFrameworkFiles();
  
  ...

  - app.UseRouting();

  - app.MapRazorPages();
  - app.MapControllers();
  - app.MapFallbackToFile("index.html");
  ```

  Leave static file middleware in place:

  ```csharp
  app.UseStaticFiles();
  ```

**port-domain:**

* Add middleware that maps requests to the client apps. The following example configures the middleware to run when the request port is either 5001 for the first client app or 5002 for the second client app, or the request host is either `firstapp.com` for the first client app or `secondapp.com` for the second client app.

  > **Note:**
  > Use of the hosts (`firstapp.com`/`secondapp.com`) on a local system with a local browser requires additional configuration that's beyond the scope of this article. For local testing of this scenario, we recommend using ports. Typical production apps are configured to use subdomains, such as `www.contoso.com` for site visitors and `admin.contoso.com` for administrators. With the proper DNS and server configuration, which is beyond the scope of this article and depends on the technologies used, the app responds to requests at whatever hosts are named in the following code.

  Where you removed the `app.UseBlazorFrameworkFiles();` line from `Program.cs`, place the following code:

  ```csharp
  app.MapWhen(ctx => ctx.Request.Host.Port == 5001 || 
      ctx.Request.Host.Equals("firstapp.com"), first =>
  {
      first.Use((ctx, nxt) =>
      {
          ctx.Request.Path = "/FirstApp" + ctx.Request.Path;
          return nxt();
      });

      first.UseBlazorFrameworkFiles("/FirstApp");
      first.UseStaticFiles();
      first.UseStaticFiles("/FirstApp");
      first.UseRouting();

      first.UseEndpoints(endpoints =>
      {
          endpoints.MapControllers();
          endpoints.MapFallbackToFile("/FirstApp/{*path:nonfile}", 
              "FirstApp/index.html");
      });
  });
  
  app.MapWhen(ctx => ctx.Request.Host.Port == 5002 || 
      ctx.Request.Host.Equals("secondapp.com"), second =>
  {
      second.Use((ctx, nxt) =>
      {
          ctx.Request.Path = "/SecondApp" + ctx.Request.Path;
          return nxt();
      });

      second.UseBlazorFrameworkFiles("/SecondApp");
      second.UseStaticFiles();
      second.UseStaticFiles("/SecondApp");
      second.UseRouting();

      second.UseEndpoints(endpoints =>
      {
          endpoints.MapControllers();
          endpoints.MapFallbackToFile("/SecondApp/{*path:nonfile}", 
              "SecondApp/index.html");
      });
  });
  ```

  > **Warning:**
  > API that relies on the Host header, such as `Microsoft.AspNetCore.Http.HttpRequest.Host` and `Microsoft.AspNetCore.Builder.RoutingEndpointConventionBuilderExtensions.RequireHost*`, are subject to potential spoofing by clients.
>
> To prevent host and port spoofing, use one of the following approaches:
>
> * Use `Microsoft.AspNetCore.Http.HttpContext.Connection` (`Microsoft.AspNetCore.Http.ConnectionInfo.LocalPort`) where the ports are checked.
> * Employ Host filtering.

**route-subpath:**

* Add middleware that maps requests to the client apps. The following example configures the middleware to run when the request subpath is `/FirstApp` for the first client app or `/SecondApp` for the second client app.

  Where you removed the `app.UseBlazorFrameworkFiles();` line from `Program.cs`, place the following code:
