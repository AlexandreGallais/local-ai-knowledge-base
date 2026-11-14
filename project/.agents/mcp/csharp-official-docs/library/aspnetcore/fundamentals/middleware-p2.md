---
title: "ASP.NET Core middleware (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/middleware/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core middleware (part 2 of 3)

## Middleware added automatically by `WebApplication`

WebApplication automatically adds the following middleware in ASP.NET Core apps depending on certain conditions:

* UseDeveloperExceptionPage is added first when the HostingEnvironment is `"Development"`.

* UseRouting is added second, if the user code didn't already call `UseRouting` and endpoints are configured, for example `app.MapGet`.

* UseEndpoints is added at the end of the middleware pipeline if endpoints are configured.

* UseAuthentication is added immediately after `UseRouting`, if user code didn't already call `UseAuthentication` and if IAuthenticationSchemeProvider can be detected in the service provider. `IAuthenticationSchemeProvider` is added by default when you use AddAuthentication, and services are detected by using IServiceProviderIsService.

* UseAuthorization is added next, if user code didn't already call `UseAuthorization` and if IAuthorizationHandlerProvider can be detected in the service provider. `IAuthorizationHandlerProvider` is added by default when you use AddAuthorization, and services are detected by using `IServiceProviderIsService`.

* User configured middleware and endpoints are added between `UseRouting` and `UseEndpoints`.

The following code is effectively what the automatic middleware being added to the app produces:

```csharp
if (isDevelopment)
{
    app.UseDeveloperExceptionPage();
}

app.UseRouting();

if (isAuthenticationConfigured)
{
    app.UseAuthentication();
}

if (isAuthorizationConfigured)
{
    app.UseAuthorization();
}

// User middleware/endpoints
app.CustomMiddleware(...);
app.MapGet("/", () => "hello world");
// End user middleware/endpoints

app.UseEndpoints(e => {});
```

In some cases, the default middleware configuration isn't correct for the app and requires modification. For example, `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` should be called before `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`. The app needs to call `UseAuthentication` and `UseAuthorization` if `UseCors` is called:

```csharp
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
```

If middleware should run before route matching occurs, `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*` should be called and the middleware should be placed before the call to `UseRouting`. `Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseEndpoints*` isn't required in this case because it's automatically added as described earlier:

```csharp
app.Use((context, next) =>
{
    return next(context);
});

app.UseRouting();

// Other middleware and endpoints
```

When adding a terminal middleware:

* The middleware must be added after `UseEndpoints`.

* The app needs to call `UseRouting` and `UseEndpoints` so the terminal middleware can be placed at the correct location.

```csharp
app.UseRouting();

app.MapGet("/", () => "hello world");

app.UseEndpoints(e => {});

app.Run(context =>
{
    context.Response.StatusCode = 404;
    return Task.CompletedTask;
});
```

Terminal middleware is middleware that runs if no endpoint handles the request.

For information on antiforgery middleware in Minimal APIs, see Prevent Cross-Site Request Forgery (XSRF/CSRF) attacks in ASP.NET Core.

## Middleware order

The order that middleware appears in the app's `Program` file defines the order in which middleware are invoked on a request with the reverse order for the response.

You have full control over the order of middleware and the ability to add custom middleware for request processing scenarios, keeping in mind that the order of middleware can be critical for security, performance, and functionality.

The following examples demonstrate middleware order for common app scenarios. Each middleware extension method is exposed on `Microsoft.AspNetCore.Builder.WebApplicationBuilder` through the `Microsoft.AspNetCore.Builder` namespace:

1. Exception and error handling
   * When the app runs in the `Development` environment:
     * Developer exception page middleware (`Microsoft.AspNetCore.Builder.DeveloperExceptionPageExtensions.UseDeveloperExceptionPage*`) reports app runtime errors.
     * Database error page middleware (`Microsoft.AspNetCore.Builder.DatabaseErrorPageExtensions.UseDatabaseErrorPage*`) reports database runtime errors.
   * When the app runs in the `Production` environment:
     * Exception handler middleware (`Microsoft.AspNetCore.Builder.ExceptionHandlerExtensions.UseExceptionHandler*`) catches exceptions thrown in the following middlewares.
     * HTTP Strict Transport Security (HSTS) protocol middleware (`Microsoft.AspNetCore.Builder.HstsBuilderExtensions.UseHsts*`) adds the `Strict-Transport-Security` header.
1. HTTPS redirection middleware (`Microsoft.AspNetCore.Builder.HttpsPolicyBuilderExtensions.UseHttpsRedirection*`) redirects HTTP requests to HTTPS.
1. Static file middleware (if required, `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`) returns static files and short-circuits further request processing.
1. Cookie policy middleware (`Microsoft.AspNetCore.Builder.CookiePolicyAppBuilderExtensions.UseCookiePolicy*`) conforms the app to the EU General Data Protection Regulation (GDPR).
1. Routing middleware (`Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`) to route requests.
1. Authentication middleware (`Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`) attempts to authenticate the user before they're allowed access to secure resources.
1. Authorization middleware (`Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`) authorizes a user to access secure resources.
1. Antiforgery middleware (`Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*`) adds antiforgery middleware to the pipeline `Microsoft.AspNetCore.Builder.AntiforgeryApplicationBuilderExtensions.UseAntiforgery*` must be placed after calls to `Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*` and `Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`.
1. Session middleware (Razor Pages and MVC only, `Microsoft.AspNetCore.Builder.SessionMiddlewareExtensions.UseSession*`) establishes and maintains session state. If the app uses session state, call session middleware after cookie policy middleware and before Razor Pages/MVC middleware.
1. Endpoint routing middleware
  * `Microsoft.AspNetCore.Builder.RazorComponentsEndpointRouteBuilderExtensions.MapRazorComponents*` to add Razor component endpoints to the request pipeline.
  * `Microsoft.AspNetCore.Builder.RazorPagesEndpointRouteBuilderExtensions.MapRazorPages*` to add Razor Pages endpoints to the request pipeline.
  * `Microsoft.AspNetCore.Builder.ControllerEndpointRouteBuilderExtensions.MapControllerRoute*` to add controller endpoints to the request pipeline.

Typical Blazor Web App middleware pipeline:

```csharp
app.UseWebAssemblyDebugging(); // Development environment with client-side rendering
app.UseMigrationsEndPoint(); // Development environment with ASP.NET Core Identity

app.UseExceptionHandler("/Error", createScopeForErrors: true); // Non-Development environment
app.UseHsts(); // Non-Development environment with HTTPS protocol

app.UseStatusCodePagesWithReExecute("/not-found", createScopeForStatusCodePages: true);

app.UseHttpsRedirection(); // With HTTPS protocol

app.UseAntiforgery();

app.MapStaticAssets();

app.MapRazorComponents<App>(); // With additional extension methods for render modes

app.MapAdditionalIdentityEndpoints(); // With ASP.NET Core Identity

app.Run();
```

Typical Razor Pages/MVC middleware pipeline:

```csharp
app.UseMigrationsEndPoint(); // Development environment with ASP.NET Core Identity

app.UseExceptionHandler("/Error"); // Non-Development environment
app.UseHsts(); // Non-Development environment with HTTPS protocol

app.UseHttpsRedirection(); // With HTTPS protocol

// app.UseCookiePolicy();
app.UseRouting(); // If not called, runs at the beginning of the pipeline by default
// app.UseRateLimiter();
// app.UseRequestLocalization();
// app.UseCors();

// app.UseAuthentication(); // Called internally for ASP.NET Core Identity
app.UseAuthorization();
// app.UseSession();
// app.UseResponseCompression();
// app.UseResponseCaching();

app.MapStaticAssets();

app.MapControllerRoute(...); // For MVC controllers

app.MapRazorPages(); // For Razor Pages pages

app.MapControllers(); // With authentication in a Razor Pages app

app.Run();
```

In the preceding code:

* CORS middleware (`Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*`), authentication middleware (`Microsoft.AspNetCore.Builder.AuthAppBuilderExtensions.UseAuthentication*`), and authorization middleware (`Microsoft.AspNetCore.Builder.AuthorizationAppBuilderExtensions.UseAuthorization*`) must appear in the order shown.
* CORS middleware (`Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*`) must appear before response caching middleware (`Microsoft.AspNetCore.Builder.ResponseCachingExtensions.UseResponseCaching*`) to add CORS headers on every request, including cached responses. For more information, see It is not clear that UseCORS must come before UseResponseCaching (`dotnet/aspnetcore` #23218.
* Request localization middleware (`Microsoft.AspNetCore.Builder.ApplicationBuilderExtensions.UseRequestLocalization*`) must appear before any middleware that might check the request culture, for example, static file middleware (`Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`).
* Rate-limiting middleware (`Microsoft.AspNetCore.Builder.RateLimiterApplicationBuilderExtensions.UseRateLimiter*`) must be called after routing middleware (`Microsoft.AspNetCore.Builder.EndpointRoutingApplicationBuilderExtensions.UseRouting*`) when rate limiting endpoint-specific APIs are used. For example, if the `[EnableRateLimiting]` attribute is used, rate-limiting middleware must be called after routing middleware. When calling only global limiters, rate-limiting middleware can be called before routing middleware.

In some scenarios, middleware has different ordering. For example, caching and compression ordering depends on the app's specification. In the following order, CPU usage might be reduced by caching the compressed response, but the app might end up caching multiple representations of a resource using different compression algorithms, such as Gzip or Brotli:

```csharp
app.UseResponseCaching();
app.UseResponseCompression();
```

Static assets are typically served early in the pipeline so that the app can short-circuit request processing to improve performance.

Authentication doesn't short-circuit unauthenticated requests. Although authentication middleware authenticates requests, authorization occurs after the framework selects a Razor component in a Blazor Web App, a page in a Razor Pages app, or a controller and action in an MVC app.

For information about Single Page Applications, see the guides for the React and Angular project templates.

## `UseCors` and `UseStaticFiles` order

For more information on ordering `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` and `Microsoft.AspNetCore.Builder.StaticFileExtensions.UseStaticFiles*`, see Enable Cross-Origin Requests (CORS) in ASP.NET Core.

## Forwarded headers middleware order

Run forwarded headers middleware before other middleware to ensure that the middleware relying on forwarded headers information can consume the header values for processing. To run forwarded headers middleware after diagnostics and error handling middleware, see forwarded headers middleware order.
