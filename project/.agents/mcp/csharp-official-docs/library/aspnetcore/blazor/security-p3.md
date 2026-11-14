---
title: "ASP.NET Core Blazor authentication and authorization (part 3 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/index.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor authentication and authorization (part 3 of 7)

### Inject `AuthenticationStateProvider` for services scoped to a component

Don't attempt to resolve `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` within a custom scope because it results in the creation of a new instance of the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` that isn't correctly initialized.

To access the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` within a service scoped to a component, inject the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` into the component and pass it to the service as a parameter. This approach ensures that the correct, initialized instance of the `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` is used for each user app instance.

`ExampleService.cs`:

```csharp
public class ExampleService
{
    public async Task<string> ExampleMethod(AuthenticationStateProvider authStateProvider)
    {
        var authState = await authStateProvider.GetAuthenticationStateAsync();
        var user = authState.User;

        if (user.Identity is not null && user.Identity.IsAuthenticated)
        {
            return $"{user.Identity.Name} is authenticated.";
        }
        else
        {
            return "The user is NOT authenticated.";
        }
    }
}
```

Register the service as scoped. In a server-side Blazor app, scoped services have a lifetime equal to the duration of the client connection circuit.

In the `Program` file:

```csharp
builder.Services.AddScoped<ExampleService>();
```

In the following `InjectAuthStateProvider` component:

* The component inherits `Microsoft.AspNetCore.Components.OwningComponentBase`.
* The `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` is injected and passed to `ExampleService.ExampleMethod`.
* `ExampleService` is resolved with `Microsoft.AspNetCore.Components.OwningComponentBase.ScopedServices` and `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService*`, which returns the correct, initialized instance of `ExampleService` that exists for the lifetime of the user's circuit.

`InjectAuthStateProvider.razor`:

```razor
@page "/inject-auth-state-provider"
@inherits OwningComponentBase
@inject AuthenticationStateProvider AuthenticationStateProvider

<h1>Inject <code>AuthenticationStateProvider</code> Example</h1>

<p>@message</p>

@code {
    private string? message;
    private ExampleService? ExampleService { get; set; }

    protected override async Task OnInitializedAsync()
    {
        ExampleService = ScopedServices.GetRequiredService<ExampleService>();

        message = await ExampleService.ExampleMethod(AuthenticationStateProvider);
    }
}
```

For more information, see the guidance on `Microsoft.AspNetCore.Components.OwningComponentBase` in ASP.NET Core Blazor dependency injection.

### Unauthorized content display while prerendering with a custom `AuthenticationStateProvider`

To avoid showing unauthorized content, for example content in an `AuthorizeView` component, while prerendering with a custom `AuthenticationStateProvider`, adopt ***one*** of the following approaches:

* Implement `Microsoft.AspNetCore.Components.Authorization.IHostEnvironmentAuthenticationStateProvider` for the custom `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` to support prerendering: For an example implementation of `Microsoft.AspNetCore.Components.Authorization.IHostEnvironmentAuthenticationStateProvider`, see the Blazor framework's `Microsoft.AspNetCore.Components.Server.ServerAuthenticationStateProvider` implementation in `ServerAuthenticationStateProvider.cs` (reference source).

  > **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

* Disable prerendering: Indicate the render mode with the `prerender` parameter set to `false` at the highest-level component in the app's component hierarchy that isn't a root component.

  > **Note:**
  > Making a root component interactive, such as the `App` component, isn't supported. Therefore, prerendering can't be disabled directly by the `App` component.

  For apps based on the Blazor Web App project template, prerendering is typically disabled where the `Routes` component is used in the `App` component (`Components/App.razor`) :

  ```razor
  <Routes @rendermode="new InteractiveServerRenderMode(prerender: false)" />
  ```

  Also, disable prerendering for the `HeadOutlet` component:

  ```razor
  <HeadOutlet @rendermode="new InteractiveServerRenderMode(prerender: false)" />
  ```

  You can also selectively control the render mode applied to the `Routes` component instance. For example, see ASP.NET Core Blazor render modes.

* Authenticate the user on the server before the app starts: To adopt this approach, the app must respond to a user's initial request with the Identity-based sign-in page or view and prevent any requests to Blazor endpoints until they're authenticated. For more information, see Require global user authentication. After authentication, unauthorized content in prerendered Razor components is only shown when the user is truly unauthorized to view the content.

### User state management

In spite of the word "state" in the name, `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` isn't for storing *general user state*. `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` only indicates the user's authentication state to the app, whether they are signed into the app and who they are signed in as.

Authentication uses the same ASP.NET Core Identity authentication as Razor Pages and MVC apps. The user state stored for ASP.NET Core Identity flows to Blazor without adding additional code to the app. Follow the guidance in the ASP.NET Core Identity articles and tutorials for the Identity features to take effect in the Blazor parts of the app.

For guidance on general state management outside of ASP.NET Core Identity, see ASP.NET Core Blazor state management overview.

### Additional security abstractions

Two additional abstractions participate in managing authentication state:

* `Microsoft.AspNetCore.Components.Server.ServerAuthenticationStateProvider` (reference source): An `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` used by the Blazor framework to obtain authentication state from the server.

* `Microsoft.AspNetCore.Components.Server.RevalidatingServerAuthenticationStateProvider` (reference source): A base class for `Microsoft.AspNetCore.Components.Authorization.AuthenticationStateProvider` services used by the Blazor framework to receive an authentication state from the host environment and revalidate it at regular intervals, 30 minutes by default.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.
