---
title: "ASP.NET Core Blazor additional server-side security scenarios (part 2 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor additional server-side security scenarios (part 2 of 4)

## Circuit handler to capture users for custom services

Use a `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler` to capture a user from the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` and set the user in a service. If you want to update the user, register a callback to `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.AuthenticationStateChanged` and enqueue a `System.Threading.Tasks.Task` to obtain the new user and update the service. The following example demonstrates the approach.

In the following example:

* `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler.OnConnectionUpAsync*` is called every time the circuit reconnects, setting the user for the lifetime of the connection. Only the `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler.OnConnectionUpAsync*` method is required unless you implement updates via a handler for authentication changes (`AuthenticationChanged` in the following example).
* `Microsoft.AspNetCore.Components.Server.Circuits.CircuitHandler.OnCircuitOpenedAsync*` is called to attach the authentication changed handler, `AuthenticationChanged`, to update the user.
* The `catch` block of the `UpdateAuthentication` task takes no action on exceptions because there's no way to report the exceptions at this point in code execution. If an exception is thrown from the task, the exception is reported elsewhere in app.

`UserService.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server.Circuits;

public class UserService
{
    private ClaimsPrincipal currentUser = new(new ClaimsIdentity());

    public ClaimsPrincipal GetUser() => currentUser;

    internal void SetUser(ClaimsPrincipal user)
    {
        if (currentUser != user)
        {
            currentUser = user;
        }
    }
}

internal sealed class UserCircuitHandler(
        AuthenticationStateProvider authenticationStateProvider,
        UserService userService)
        : CircuitHandler, IDisposable
{
    public override Task OnCircuitOpenedAsync(Circuit circuit,
        CancellationToken cancellationToken)
    {
        authenticationStateProvider.AuthenticationStateChanged +=
            AuthenticationChanged;

        return base.OnCircuitOpenedAsync(circuit, cancellationToken);
    }

    private void AuthenticationChanged(Task<AuthenticationState> task)
    {
        _ = UpdateAuthentication(task);

        async Task UpdateAuthentication(Task<AuthenticationState> task)
        {
            try
            {
                var state = await task;
                userService.SetUser(state.User);
            }
            catch
            {
            }
        }
    }

    public override async Task OnConnectionUpAsync(Circuit circuit,
        CancellationToken cancellationToken)
    {
        var state = await authenticationStateProvider.GetAuthenticationStateAsync();
        userService.SetUser(state.User);
    }

    public void Dispose()
    {
        authenticationStateProvider.AuthenticationStateChanged -=
            AuthenticationChanged;
    }
}
```

In the `Program` file:

```csharp
using Microsoft.AspNetCore.Components.Server.Circuits;
using Microsoft.Extensions.DependencyInjection.Extensions;

...

builder.Services.AddScoped<UserService>();
builder.Services.TryAddEnumerable(
    ServiceDescriptor.Scoped<CircuitHandler, UserCircuitHandler>());
```

Use the service in a component to obtain the user:

```razor
@inject UserService UserService

<h1>Hello, @(UserService.GetUser().Identity?.Name ?? "world")!</h1>
```

To set the user in middleware for MVC, Razor Pages, and in other ASP.NET Core scenarios, call `SetUser` on the `UserService` in custom middleware after the authentication middleware runs, or set the user with an `Microsoft.AspNetCore.Authentication.IClaimsTransformation` implementation. The following example adopts the middleware approach.

`UserServiceMiddleware.cs`:

```csharp
public class UserServiceMiddleware
{
    private readonly RequestDelegate next;

    public UserServiceMiddleware(RequestDelegate next)
    {
        this.next = next ?? throw new ArgumentNullException(nameof(next));
    }

    public async Task InvokeAsync(HttpContext context, UserService service)
    {
        service.SetUser(context.User);
        await next(context);
    }
}
```

Immediately before the call to `app.MapRazorComponents<App>()` in the `Program` file, call the middleware:

```csharp
app.UseMiddleware<UserServiceMiddleware>();
```

## Access `AuthenticationStateProvider` in outgoing request middleware

`System.Net.Http.IHttpClientFactory` creates `System.Net.Http.DelegatingHandler` instances in a separate dependency injection (DI) scope from the app. If you inject `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` into a derived `System.Net.Http.DelegatingHandler` type, the handler doesn't have access to the current user's authentication state from the Blazor circuit.

Use either of the following approaches to address this scenario:

* Application scope handler (*Recommended*)
* Circuit activity handler

> **Note:**
> For general guidance on defining delegating handlers for HTTP requests by `System.Net.Http.HttpClient` instances created using `System.Net.Http.IHttpClientFactory`, see the following sections of HTTP requests with IHttpClientFactory - ASP.NET Core:
>
> * Outgoing request middleware
> * Use DI in outgoing request middleware

The examples in the following subsections attach a custom user name header for authenticated users to outgoing requests.

### Application scope handler (*Recommended*)

The approach in this section uses a keyed service to register a custom `System.Net.Http.HttpClient` that wraps the base client with an application scope handler resolved from the current application scope to access `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider`.

Overview of the approach:

* Base client configuration: `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` is called to register a named client with `System.Net.Http.IHttpClientFactory`.
* Keyed registration: A custom `AddApplicationScopeHandler` extension method registers a keyed `System.Net.Http.HttpClient` with the same client name.
* Scope-aware handler: The application scope handler is resolved from the current scope, giving it access to `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider`.
* Handler caching: The application scope handler uses `System.Net.Http.IHttpMessageHandlerFactory` to get the cached `System.Net.Http.HttpMessageHandler`, which preserves connection pooling.
* Configuration reuse: The application scope handler applies the same `Microsoft.Extensions.Http.HttpClientFactoryOptions` configuration to its `System.Net.Http.HttpClient` as the base client.

Create the following methods and classes:

* `AddApplicationScopeHandler`: An extension method to add the application scope handler and a keyed `System.Net.Http.HttpClient` service to the DI container.
* `ApplicationScopeHandler`: The application scope handler class.
* `AuthenticationStateHandler`: A `System.Net.Http.DelegatingHandler` that attaches a custom user name header for authenticated users to outgoing requests.

`Services/ApplicationScopeHttpClientExtensions.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.Http;
using Microsoft.Extensions.Options;

namespace BlazorSample.Services;

public static class ApplicationScopeHttpClientExtensions
{
    public static readonly HttpRequestOptionsKey<IServiceProvider> ScopeKey =
        new("ApplicationScope");

    public static IHttpClientBuilder AddApplicationScopeHandler(
        this IHttpClientBuilder builder)
    {
        var name = builder.Name;

        builder.Services.AddTransient<ApplicationScopeHandler>();

        builder.Services.AddKeyedScoped<HttpClient>(name, (sp, key) =>
        {
            var handler = sp.GetRequiredService<ApplicationScopeHandler>();
            handler.InnerHandler =
                sp.GetRequiredService<IHttpMessageHandlerFactory>()
                .CreateHandler(name);

            var client = new HttpClient(handler, disposeHandler: false);

            var options =
                sp.GetRequiredService<IOptionsMonitor<HttpClientFactoryOptions>>()
                .Get(name);

            foreach (var action in options.HttpClientActions)
            {
                action(client);
            }

            return client;
        });

        return builder;
    }
}

public class ApplicationScopeHandler(IServiceProvider serviceProvider)
    : DelegatingHandler
{
    protected override Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        request.Options.Set(ApplicationScopeHttpClientExtensions.ScopeKey,
            serviceProvider);
        return base.SendAsync(request, cancellationToken);
    }
}

public class AuthenticationStateHandler : DelegatingHandler
{
    private ClaimsPrincipal? user;

    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request,
        CancellationToken cancellationToken)
    {
        if (user is null)
        {
            if (request.Options.TryGetValue(
                ApplicationScopeHttpClientExtensions.ScopeKey, out var sp))
            {
                var authStateProvider = sp.GetService<AuthenticationStateProvider>();

                if (authStateProvider is not null)
                {
                    user = (await authStateProvider.GetAuthenticationStateAsync())
                        .User;
                }
            }
        }

        if (user?.Identity?.IsAuthenticated)
        {
            request.Headers.TryAddWithoutValidation("X-USER-IDENTITY-NAME",
                user.Identity.Name);
        }

        return await base.SendAsync(request, cancellationToken);
    }
}
```

The `AuthenticationStateHandler` in the preceding example caches the user for the lifetime of the `System.Net.Http.DelegatingHandler`. To fetch the user's current authentication state for each request, remove the `null` conditional check on the user.

Register the named client in the `Program` file, calling `AddApplicationScopeHandler` to add the application scope handler:

```csharp
builder.Services.AddHttpClient("ExternalApi", client =>
{
    client.BaseAddress = new Uri("{REQUEST URI}");
})
.AddApplicationScopeHandler()
.AddHttpMessageHandler<AuthenticationStateHandler>();
```

The `{REQUEST URI}` placeholder in the preceding example is the request URI (localhost example: `http://localhost:5209`).

Inject the client into components using the keyed service:

```razor
@using Microsoft.Extensions.DependencyInjection

@code {
    [Inject(Key = "ExternalApi")]
    public HttpClient Http { get; set; } = default!;

    private async Task CallApiAsync()
    {
        var response = await Http.GetAsync("/api/endpoint");
    }
}
```

### Circuit activity handler

The approach in this section uses a circuit activity handler to access the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider`, which is an alternative to the recommended application scope handler approach in the preceding section.

First, implement the `CircuitServicesAccessor` class in the following section of the Blazor dependency injection (DI) article:

Access server-side Blazor services from a different DI scope

Use the `CircuitServicesAccessor` to access the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` in the `System.Net.Http.DelegatingHandler` implementation.

`AuthenticationStateHandler.cs`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;

public class AuthenticationStateHandler(
    CircuitServicesAccessor circuitServicesAccessor)
    : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken cancellationToken)
    {
        var authStateProvider = circuitServicesAccessor.Services?
            .GetRequiredService<AuthenticationStateProvider>();

        if (authStateProvider is null)
        {
            throw new Exception("AuthenticationStateProvider not available");
        }

        var authState = await authStateProvider.GetAuthenticationStateAsync();

        var user = authState?.User;

        if (user?.Identity is not null && user.Identity.IsAuthenticated)
        {
            request.Headers.Add("X-USER-IDENTITY-NAME", user.Identity.Name);
        }

        return await base.SendAsync(request, cancellationToken);
    }
}
```

In the `Program` file, register the `AuthenticationStateHandler` and add the handler to the `System.Net.Http.IHttpClientFactory` that creates `System.Net.Http.HttpClient` instances:

```csharp
builder.Services.AddTransient<AuthenticationStateHandler>();

builder.Services.AddHttpClient("HttpMessageHandler")
    .AddHttpMessageHandler<AuthenticationStateHandler>();
```
