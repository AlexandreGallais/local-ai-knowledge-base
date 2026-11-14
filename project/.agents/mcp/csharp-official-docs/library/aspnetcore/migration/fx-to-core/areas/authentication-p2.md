---
title: "ASP.NET Framework to Core Authentication Migration (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/migration/fx-to-core/areas/authentication.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Framework to Core Authentication Migration (part 2 of 3)

## Remote authentication

> **Note:**
> This makes use of the System.Web Adapters to simplify migration.

Choose this approach when you need to share authentication between your ASP.NET Framework and ASP.NET Core applications during incremental migration, or when you have complex authentication that's difficult to migrate.

The System.Web adapters' remote authentication feature allows an ASP.NET Core app to determine a user's identity by deferring to an ASP.NET app. This enables gradual migration while maintaining a single authentication system.

### How remote authentication works

1. When requests are processed by the ASP.NET Core app, if remote app authentication is the default scheme or specified by the request's endpoint, the `RemoteAuthenticationAuthHandler` will attempt to authenticate the user.
2. The handler makes an HTTP request to the ASP.NET app's authenticate endpoint, forwarding configured headers from the current request (by default, `Authorization` and `Cookie` headers).
3. The ASP.NET app processes the authentication and returns either a serialized `ClaimsPrincipal` or an HTTP status code indicating failure.
4. The ASP.NET Core app uses the result to establish the user's identity or handle authentication challenges.

### Remote authentication pros and cons

| Pros | Cons |
|------|------|
| Minimal code changes required | Additional HTTP request overhead |
| Works with any Framework auth type | Network dependency between apps |
| Gradual migration capability | More complex debugging |
| Preserves existing auth logic | Requires both apps to be running |
| Handles complex auth scenarios | Limited Windows auth support |

### When to choose remote authentication

**Choose Remote Authentication when:**
* Your ASP.NET app doesn't use `Microsoft.Owin` cookie authentication
* You want a flexible solution that works with various authentication mechanisms
* You need to gradually migrate authentication logic to ASP.NET Core
* You have complex custom authentication that's difficult to rewrite
* You're doing an incremental migration and need shared authentication state

### Remote authentication configuration

There are just a few small code changes needed to enable remote authentication in a solution that's already set up according to the Getting Started.

First, follow the remote app setup instructions to connect the ASP.NET Core and ASP.NET apps. Then, there are just a couple extra extension methods to call to enable remote app authentication.

**manual:**

#### ASP.NET app configuration

The ASP.NET app needs to be configured to add the authentication endpoint. Adding the authentication endpoint is done by calling the `AddAuthenticationServer` extension method to set up the HTTP module that watches for requests to the authentication endpoint. Note that remote authentication scenarios typically want to add proxy support as well, so that any authentication related redirects correctly route to the ASP.NET Core app rather than the ASP.NET one.

```csharp
HttpApplicationHost.RegisterHost(builder =>
{
    builder.AddSystemWebAdapters()
        .AddProxySupport(options => options.UseForwardedHeaders = true)
        .AddRemoteAppServer(options =>
        {
            options.ApiKey = ConfigurationManager.AppSettings["<example-value>"];
        })
        .AddAuthenticationServer();
});
```
#### ASP.NET Core app configuration

Next, the ASP.NET Core app needs to be configured to enable the authentication handler that will authenticate users by making an HTTP request to the ASP.NET app. Again, this is done by calling `AddAuthenticationClient` when registering System.Web adapters services:

```csharp
builder.Services.AddSystemWebAdapters()
    .AddRemoteAppClient(options =>
    {
        options.RemoteAppUrl = new Uri(builder.Configuration
            ["ReverseProxy:Clusters:fallbackCluster:Destinations:fallbackApp:Address"]);
        options.ApiKey = builder.Configuration["<example-value>"];
    })
    .AddAuthenticationClient(true);
```
The boolean that is passed to the `AddAuthenticationClient` call specifies whether remote app authentication should be the default authentication scheme. Passing `true` will cause the user to be authenticated via remote app authentication for all requests, whereas passing `false` means that the user will only be authenticated with remote app authentication if the remote app scheme is specifically requested (with `[Authorize(AuthenticationSchemes = RemoteAppAuthenticationDefaults.AuthenticationScheme)]` on a controller or action method, for example). Passing false for this parameter has the advantage of only making HTTP requests to the original ASP.NET app for authentication for endpoints that require remote app authentication but has the disadvantage of requiring annotating all such endpoints to indicate that they will use remote app auth.

**aspire:**
When using Aspire, the configuration will be done via environment variables and are set by the AppHost. To enable remote session, the option must be enabled:

```csharp
...

var coreApp = builder.AddProject<Projects.AuthRemoteIdentityCore>("core")
    .WithHttpHealthCheck()
    .WaitFor(frameworkApp)
    .WithIncrementalMigrationFallback(frameworkApp, options => options.RemoteAuthentication = RemoteAuthentication.DefaultScheme);

...
```

Once this is done, it will be automatically hooked up in both the framework and core applications.

#### Remote authentication with YARP fallback

When using remote authentication with YARP-based fallback to the ASP.NET Framework app, make sure that fallback requests don't invoke remote authentication. If remote authentication runs during fallback, the app makes unnecessary extra calls back to the Framework app and can lead to confusing behavior.

To avoid running remote authentication for fallback requests, use one of these approaches:

* Use routing short-circuit metadata on the YARP fallback route so that the route bypasses the rest of the middleware pipeline. For example, call `ShortCircuit` on the fallback endpoint as shown in the remote app setup guidance and in Short-circuit middleware after routing.
* Don't use remote authentication as the default authentication scheme. Instead, configure remote authentication only for the endpoints that need it. For example, pass `false` to `AddAuthenticationClient` and specify the remote authentication scheme explicitly on those endpoints.

#### Using Remote Authentication with Specific Endpoints

When you set the default scheme to `false`, you can specify remote authentication for specific controllers or actions:

```csharp
[Authorize(AuthenticationSchemes = RemoteAppAuthenticationDefaults.AuthenticationScheme)]
public class SecureController : Controller
{
    // This controller uses remote authentication
    public IActionResult Index()
    {
        return View();
    }
}

// Or on specific actions
public class HomeController : Controller
{
    [Authorize(AuthenticationSchemes = RemoteAppAuthenticationDefaults.AuthenticationScheme)]
    public IActionResult SecureAction()
    {
        return View();
    }
}
```

#### Implementing Custom Authentication Result Processors

You can implement custom processors to modify authentication results before they are used:

```csharp
public class CustomAuthResultProcessor : IRemoteAuthenticationResultProcessor
{
    public Task ProcessAsync(RemoteAuthenticationResult result, HttpContext context)
    {
        // Custom logic to process authentication results
        if (result.Headers.ContainsKey("Location"))
        {
            // Modify redirect URLs or other logic
        }
        
        return Task.CompletedTask;
    }
}

// Register the custom processor
builder.Services.AddScoped<IRemoteAuthenticationResultProcessor, CustomAuthResultProcessor>();
```

Finally, if the ASP.NET Core app didn't previously include authentication middleware, that will need to be enabled (after routing middleware, but before authorization middleware). For more information about middleware ordering, see ASP.NET Core middleware:

```csharp
app.UseAuthentication();
```
#### Security Considerations

When implementing remote authentication, consider the following security aspects:

* **API Key <example-value>**: The API key used for communication between the ASP.NET Core and ASP.NET apps should be stored securely using configuration providers and not hardcoded.
* **Network Security**: Communication between the apps should occur over secure channels (HTTPS) in production environments.
* **Header Forwarding**: Be cautious about which headers you forward to avoid exposing sensitive information. Only forward headers that are necessary for authentication.
* **Endpoint Protection**: The authentication endpoint on the ASP.NET app should only be accessible to the ASP.NET Core app, not external clients.

#### Troubleshooting

Common issues when configuring remote authentication:

* **Authentication failures**: Verify that the API keys match between both applications and that the authentication endpoint path is correctly configured.
* **Redirect loops**: Ensure that the `RedirectUrlProcessor` is properly configured to redirect to the ASP.NET Core app rather than the ASP.NET app.
* **Missing claims**: Verify that the ASP.NET app is properly serializing the `ClaimsPrincipal` and that all required claims are included.

#### Design

1. When requests are processed by the ASP.NET Core app, if remote app authentication is the default scheme or specified by the request's endpoint, the `RemoteAuthenticationAuthHandler` will attempt to authenticate the user.
    1. The handler will make an HTTP request to the ASP.NET app's authenticate endpoint. It will copy configured headers from the current request onto this new one in order to forward auth-relevant data. As mentioned above, default behavior is to copy the `Authorization` and `Cookie` headers. The API key <example-value> is also added for security purposes.
1. The ASP.NET app will serve requests sent to the authenticate endpoint. As long as the API keys match, the ASP.NET app will return either the current user's `System.Security.Claims.ClaimsPrincipal` serialized into the response body or it will return an HTTP status code (like 401 or 302) and response headers indicating failure.
1. When the ASP.NET Core app's `RemoteAuthenticationAuthHandler` receives the response from the ASP.NET app:
    1. If a ClaimsPrincipal was successfully returned, the auth handler will deserialize it and use it as the current user's identity.
    1. If a ClaimsPrincipal was not successfully returned, the handler will store the result and if authentication is challenged (because the user is accessing a protected resource, for example), the request's response will be updated with the status code and selected response headers from the response from the authenticate endpoint. This enables challenge responses (like redirects to a login page) to be propagated to end users.
        1. Because results from the ASP.NET app's authenticate endpoint may include data specific to that endpoint, users can register `IRemoteAuthenticationResultProcessor` implementations with the ASP.NET Core app which will run on any authentication results before they are used. As an example, the one built-in `IRemoteAuthenticationResultProcessor` is `RedirectUrlProcessor` which looks for `Location` response headers returned from the authenticate endpoint and ensures that they redirect back to the host of the ASP.NET Core app and not the ASP.NET app directly.

#### Known limitations

This remote authentication approach has a couple known limitations:

1. **Windows Authentication**: Because Windows authentication depends on a handle to a Windows identity, Windows authentication is not supported by this feature. Future work is planned to explore how shared Windows authentication might work. See dotnet/systemweb-adapters#246 for more information. For Windows authentication scenarios, consider using Configure Windows Authentication in ASP.NET Core in your ASP.NET Core application instead.
1. **User Management Actions**: This feature allows the ASP.NET Core app to make use of an identity authenticated by the ASP.NET app, but all actions related to users (logging on, logging off, etc.) still need to be routed through the ASP.NET app.
1. **Performance Considerations**: Each authentication request requires an HTTP call to the ASP.NET app, which may impact performance. Consider using shared cookie authentication (described in the Alternatives section) if performance is critical.
