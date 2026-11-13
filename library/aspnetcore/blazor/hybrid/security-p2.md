---
title: "ASP.NET Core Blazor Hybrid authentication and authorization (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/hybrid/security/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor Hybrid authentication and authorization (part 2 of 2)

## Create a custom `AuthenticationStateProvider` with user change updates

To update the user while the Blazor app is running, call `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged*` within the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` implementation using ***either*** of the following approaches:

* Signal an authentication update from outside of the `BlazorWebView`)
* Handle authentication within the `BlazorWebView`

### Signal an authentication update from outside of the `BlazorWebView` (Option 1)

A custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` can use a global service to signal an authentication update. We recommend that the service offer an event that the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` can subscribe to, where the event invokes `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged*`.

> **Note:**
> The following custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` doesn't declare a namespace in order to make the code example applicable to any Blazor Hybrid app. However, a best practice is to provide your app's namespace when you implement the example in a production app.

`ExternalAuthStateProvider.cs`:

```csharp
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Authorization;

public class ExternalAuthStateProvider : AuthenticationStateProvider
{
    private AuthenticationState currentUser;

    public ExternalAuthStateProvider(ExternalAuthService service)
    {
        currentUser = new AuthenticationState(service.CurrentUser);

        service.UserChanged += (newUser) =>
        {
            currentUser = new AuthenticationState(newUser);
            NotifyAuthenticationStateChanged(Task.FromResult(currentUser));
        };
    }

    public override Task<AuthenticationState> GetAuthenticationStateAsync() =>
        Task.FromResult(currentUser);
}

public class ExternalAuthService
{
    public event Action<ClaimsPrincipal>? UserChanged;
    private ClaimsPrincipal? currentUser;

    public ClaimsPrincipal CurrentUser
    {
        get { return currentUser ?? new(); }
        set
        {
            currentUser = value;

            if (UserChanged is not null)
            {
                UserChanged(currentUser);
            }
        }
    }
}
```

**maui:**

In the `MauiProgram.CreateMauiApp` method of `MauiProgram.cs`, add a namespace for `Microsoft.AspNetCore.Components.Authorization`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;
```

Add the authorization services and Blazor abstractions to the service collection:

```csharp
builder.Services.AddAuthorizationCore();
builder.Services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
builder.Services.AddSingleton<ExternalAuthService>();
```

**wpf:**

In the `MainWindow`'s constructor (`MainWindow.xaml.cs`), add a namespace for `Microsoft.AspNetCore.Components.Authorization`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;
```

Add the authorization services and the Blazor abstractions to the service collection:

```csharp
serviceCollection.AddAuthorizationCore();
serviceCollection.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
serviceCollection.AddSingleton<ExternalAuthService>();
```

**winforms:**

In the `Form1`'s constructor (`Form1.cs`), add a namespace for `Microsoft.AspNetCore.Components.Authorization`:

```csharp
using Microsoft.AspNetCore.Components.Authorization;
```

Add the authorization services and Blazor abstractions to the service collection:

```csharp
services.AddAuthorizationCore();
services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
services.AddSingleton<ExternalAuthService>();
```

Wherever the app authenticates a user, resolve the `ExternalAuthService` service:

```csharp
var authService = host.Services.GetRequiredService<ExternalAuthService>();
```

Execute your custom OpenID/MSAL code to authenticate the user. See your identity provider's documentation for details. The authenticated user (`authenticatedUser` in the following example) is a new `System.Security.Claims.ClaimsPrincipal` based on a new `System.Security.Claims.ClaimsIdentity`.

Set the current user to the authenticated user:

```csharp
authService.CurrentUser = authenticatedUser;
```

An alternative to the preceding approach is to set the user's principal on `System.Threading.Thread.CurrentPrincipal` instead of setting it via a service, which avoids use of the dependency injection container:

```csharp
public class CurrentThreadUserAuthenticationStateProvider : AuthenticationStateProvider
{
    public override Task<AuthenticationState> GetAuthenticationStateAsync() =>
        Task.FromResult(
            new AuthenticationState(Thread.CurrentPrincipal as ClaimsPrincipal ?? 
                new ClaimsPrincipal(new ClaimsIdentity())));
}
```

Using the alternative approach, only authorization services (`Microsoft.Extensions.DependencyInjection.AuthorizationServiceCollectionExtensions.AddAuthorizationCore*`) and `CurrentThreadUserAuthenticationStateProvider` (`.TryAddScoped<AuthenticationStateProvider, CurrentThreadUserAuthenticationStateProvider>()`) are added to the service collection.

### Handle authentication within the `BlazorWebView` (Option 2)

A custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` can include additional methods to trigger log in and log out and update the user.

> **Note:**
> The following custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` doesn't declare a namespace in order to make the code example applicable to any Blazor Hybrid app. However, a best practice is to provide your app's namespace when you implement the example in a production app.

`ExternalAuthStateProvider.cs`:

```csharp
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components.Authorization;

public class ExternalAuthStateProvider : AuthenticationStateProvider
{
    private ClaimsPrincipal currentUser = new ClaimsPrincipal(new ClaimsIdentity());

    public override Task<AuthenticationState> GetAuthenticationStateAsync() =>
        Task.FromResult(new AuthenticationState(currentUser));

    public Task LogInAsync()
    {
        var loginTask = LogInAsyncCore();
        NotifyAuthenticationStateChanged(loginTask);

        return loginTask;

        async Task<AuthenticationState> LogInAsyncCore()
        {
            var user = await LoginWithExternalProviderAsync();
            currentUser = user;

            return new AuthenticationState(currentUser);
        }
    }

    private Task<ClaimsPrincipal> LoginWithExternalProviderAsync()
    {
        /*
            Provide OpenID/MSAL code to authenticate the user. See your identity 
            provider's documentation for details.

            Return a new ClaimsPrincipal based on a new ClaimsIdentity.
        */
        var authenticatedUser = new ClaimsPrincipal(new ClaimsIdentity());

        return Task.FromResult(authenticatedUser);
    }

    public void Logout()
    {
        currentUser = new ClaimsPrincipal(new ClaimsIdentity());
        NotifyAuthenticationStateChanged(
            Task.FromResult(new AuthenticationState(currentUser)));
    }
}
```

In the preceding example:

* The call to `LogInAsyncCore` triggers the login process.
* The call to `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider.NotifyAuthenticationStateChanged*` notifies that an update is in progress, which allows the app to provide a temporary UI during the login or logout process.
* Returning `loginTask` returns the task so that the component that triggered the login can await and react after the task is complete.
* The `LoginWithExternalProviderAsync` method is implemented by the developer to log in the user with the identity provider's SDK. For more information, see your identity provider's documentation. The authenticated user (`authenticatedUser`) is a new `System.Security.Claims.ClaimsPrincipal` based on a new `System.Security.Claims.ClaimsIdentity`.

**maui:**

In the `MauiProgram.CreateMauiApp` method of `MauiProgram.cs`, add the authorization services and the Blazor abstraction to the service collection:

```csharp
builder.Services.AddAuthorizationCore();
builder.Services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
```

**wpf:**

In the `MainWindow`'s constructor (`MainWindow.xaml.cs`), add the authorization services and the Blazor abstraction to the service collection:

```csharp
serviceCollection.AddAuthorizationCore();
serviceCollection.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
```

**winforms:**

In the `Form1`'s constructor (`Form1.cs`), add the authorization services and the Blazor abstraction to the service collection:

```csharp
services.AddAuthorizationCore();
services.TryAddScoped<AuthenticationStateProvider, ExternalAuthStateProvider>();
```

The following `LoginComponent` component demonstrates how to log in a user. In a typical app, the `LoginComponent` component is only shown in a parent component if the user isn't logged into the app.

`Shared/LoginComponent.razor`:

```razor
@inject AuthenticationStateProvider AuthenticationStateProvider

<button @onclick="Login">Log in</button>

@code
{
    public async Task Login()
    {
        await ((ExternalAuthStateProvider)AuthenticationStateProvider)
            .LogInAsync();
    }
}
```

The following `LogoutComponent` component demonstrates how to log out a user. In a typical app, the `LogoutComponent` component is only shown in a parent component if the user is logged into the app.

`Shared/LogoutComponent.razor`:

```razor
@inject AuthenticationStateProvider AuthenticationStateProvider

<button @onclick="Logout">Log out</button>

@code
{
    public async Task Logout()
    {
        await ((ExternalAuthStateProvider)AuthenticationStateProvider)
            .Logout();
    }
}
```

## Accessing other authentication information

Blazor doesn'<example-value>'s guidance to manage the user'<example-value>'s SDK provides.

It'<example-value>'s token store primitive is added to the service container, consume the SDK's primitive within the app.

The Blazor framework isn't aware of a user's authentication credentials and doesn't interact with credentials in any way, so the app's code is free to follow whatever approach you deem most convenient. However, follow the general security guidance in the next section, Other authentication security considerations, when implementing authentication code in an app.

## Other authentication security considerations

The authentication process is external to Blazor, and we recommend that developers access the identity provider's guidance for additional security guidance.

When implementing authentication:

* Avoid authentication in the context of the Web View. For example, avoid using a JavaScript OAuth library to perform the authentication flow. In a single-page app, authentication tokens aren'<example-value>'t suffer this risk because native apps are only able to obtain tokens outside of the browser context, which means that rogue third-party scripts can't steal the tokens and compromise the app.
* Avoid implementing the authentication workflow yourself. In most cases, platform libraries securely handle the authentication workflow, using the system's browser instead of using a custom Web View that can be hijacked.
* Avoid using the platform's Web View control to perform authentication. Instead, rely on the system's browser when possible.
* Avoid passing the tokens to the document context (JavaScript). In some situations, a JavaScript library within the document is required to perform an authorized call to an external service. Instead of making the token <example-value> to JavaScript via JS interop:
  * Provide a generated temporary token to the library and within the Web View.
  * Intercept the outgoing network request in code.
  * Replace the temporary token with the real token and confirm that the destination of the request is valid.

## Related content

* ASP.NET Core Blazor authentication and authorization
* ASP.NET Core Blazor Hybrid security considerations
* Entra ID documentation for .NET MAUI
  * Tutorial: Register and configure .NET MAUI mobile app in an external tenant
  * Sign in users in a sample .NET MAUI Android application
  * Sign in users in a sample .NET MAUI desktop application
* Azure documentation for .NET MAUI
  * Add authentication to your .NET MAUI app
  * MAUI mobile or desktop application using Microsoft Entra ID for authentication
