---
title: "middleware8"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/middleware/includes/middleware8.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# middleware8

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
