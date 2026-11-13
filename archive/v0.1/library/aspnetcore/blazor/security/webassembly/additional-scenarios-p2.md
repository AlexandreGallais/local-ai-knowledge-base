---
title: "ASP.NET Core Blazor WebAssembly additional security scenarios (part 2 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly additional security scenarios (part 2 of 6)

## Custom authentication request scenarios

The following scenarios demonstrate how to customize authentication requests and how to obtain the login path from authentication options.

### Customize the login process

Manage additional parameters to a login request with the following methods one or more times on a new instance of `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions`:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryAddAdditionalParameter*`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryRemoveAdditionalParameter*`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryGetAdditionalParameter*`

In the following `LoginDisplay` component example, additional parameters are added to the login request:

* `prompt` is set to `login`: Forces the user to enter their credentials on that request, negating single sign on.
* `loginHint` is set to `user@example.com`: Pre-fills the username/email address field of the sign-in page for the user to `user@example.com`. Apps often use this parameter during re-authentication, having already extracted the username from a previous sign in using the `preferred_username` claim.

`Shared/LoginDisplay.razor`:

```csharp
@using Microsoft.AspNetCore.Components.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject NavigationManager Navigation

<AuthorizeView>
    <Authorized>
        Hello, @context.User.Identity?.Name!
        <button @onclick="BeginLogOut">Log out</button>
    </Authorized>
    <NotAuthorized>
        <button @onclick="BeginLogIn">Log in</button>
    </NotAuthorized>
</AuthorizeView>

@code{
    public void BeginLogOut()
    {
        Navigation.NavigateToLogout("authentication/logout");
    }

    public void BeginLogIn()
    {
        InteractiveRequestOptions requestOptions =
            new()
            {
                Interaction = InteractionType.SignIn,
                ReturnUrl = Navigation.Uri,
            };

        requestOptions.TryAddAdditionalParameter("prompt", "login");
        requestOptions.TryAddAdditionalParameter("loginHint", "user@example.com");

        Navigation.NavigateToLogin("authentication/login", requestOptions);
    }
}
```

For more information, see the following resources:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions`
* Popup request parameter list

### Customize options before obtaining a token <example-value>

If an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` occurs, manage additional parameters for a new identity provider access token <example-value> with the following methods one or more times on a new instance of `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions`:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryAddAdditionalParameter*`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryRemoveAdditionalParameter*`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryGetAdditionalParameter*`

In the following example that obtains JSON data via web API, additional parameters are added to the redirect request if an access token isn't available (`Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` is thrown):

* `prompt` is set to `login`: Forces the user to enter their credentials on that request, negating single sign on.
* `loginHint` is set to `user@example.com`: Pre-fills the username/email address field of the sign-in page for the user to `user@example.com`. Apps often use this parameter during re-authentication, having already extracted the username from a previous sign in using the `preferred_username` claim.

```csharp
try
{
    var examples = await Http.GetFromJsonAsync<ExampleType[]>("ExampleAPIMethod");

    ...
}
catch (AccessTokenNotAvailableException ex)
{
    ex.Redirect(requestOptions => {
        requestOptions.TryAddAdditionalParameter("prompt", "login");
        requestOptions.TryAddAdditionalParameter("loginHint", "user@example.com");
    });
}
```

The preceding example assumes that:

* The presence of an `@using`/`using` statement for API in the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` namespace.
* `HttpClient` injected as `Http`.

For more information, see the following resources:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions`
* Redirect request parameter list

### Customize options when using an `IAccessTokenProvider`

If obtaining a token fails when using an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider`, manage additional parameters for a new identity provider access token <example-value> with the following methods one or more times on a new instance of `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions`:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryAddAdditionalParameter*`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryRemoveAdditionalParameter*`
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions.TryGetAdditionalParameter*`

In the following example that attempts to obtain an access token for the user, additional parameters are added to the login request if the attempt to obtain a token fails when `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenResult.TryGetToken*` is called:

* `prompt` is set to `login`: Forces the user to enter their credentials on that request, negating single sign on.
* `loginHint` is set to `user@example.com`: Pre-fills the username/email address field of the sign-in page for the user to `user@example.com`. Apps often use this parameter during re-authentication, having already extracted the username from a previous sign in using the `preferred_username` claim.

```csharp
var tokenResult = await TokenProvider.RequestAccessToken(
    new AccessTokenRequestOptions
    {
        Scopes = [ ... ]
    });

if (!tokenResult.TryGetToken(out var token))
{
    tokenResult.InteractionOptions.TryAddAdditionalParameter("<example-value>", "<example-value>");
    tokenResult.InteractionOptions.TryAddAdditionalParameter("<example-value>", 
        "user@example.com");

    Navigation.NavigateToLogin(accessTokenResult.InteractiveRequestUrl, 
        accessTokenResult.InteractionOptions);
}
```

The preceding example assumes:

* The presence of an `@using`/`using` statement for API in the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` namespace.
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider` injected as `TokenProvider`.

For more information, see the following resources:

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.InteractiveRequestOptions`
* Popup request parameter list

### Logout with a custom return URL

The following example logs out the user and returns the user to the `/goodbye` endpoint:

```csharp
Navigation.NavigateToLogout("authentication/logout", "goodbye");
```

### Obtain the login path from authentication options

Obtain the configured login path from `Microsoft.AspNetCore.Builder.RemoteAuthenticationOptions`:

```csharp
var loginPath = 
    RemoteAuthOptions.Get(Options.DefaultName).AuthenticationPaths.LogInPath;
```

The preceding example assumes:

* The presence of an `@using`/`using` statement for API in the following namespaces:
  * `Microsoft.AspNetCore.Components.WebAssembly.Authentication`
  * `Microsoft.Extensions.Options`
* `IOptionsSnapshot<RemoteAuthenticationOptions<ApiAuthorizationProviderOptions>>` injected as `RemoteAuthOptions`.

### Custom `AuthorizationMessageHandler` class

*This guidance in this section is recommended for client apps that make outgoing requests to URIs that aren't within the app's base URI.*

In the following example, a custom class extends `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler` for use as the `System.Net.Http.DelegatingHandler` for an `System.Net.Http.HttpClient`. `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler.ConfigureHandler*` configures this handler to authorize outbound HTTP requests using an access token. The access token is only attached if at least one of the authorized URLs is a base of the request URI (`System.Net.Http.HttpRequestMessage.RequestUri`).

```csharp
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

public class CustomAuthorizationMessageHandler : AuthorizationMessageHandler
{
    public CustomAuthorizationMessageHandler(IAccessTokenProvider provider, 
        NavigationManager navigation)
        : base(provider, navigation)
    {
        ConfigureHandler(
            authorizedUrls: [ "https://api.contoso.com/v1.0" ],
            scopes: [ "example.read", "example.write" ]);
    }
}
```

> **Note:**
> In this section, the preceding message handler is used when a configured `System.Net.Http.HttpClient` is created from an injected `System.Net.Http.IHttpClientFactory`. If you don't use an `System.Net.Http.IHttpClientFactory`, you must create an `System.Net.Http.HttpClientHandler` instance and assign it to the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler`'s `System.Net.Http.DelegatingHandler.InnerHandler`:
>
> ```csharp
> InnerHandler = new HttpClientHandler();
> ```
>
> You don't need to make the preceding `System.Net.Http.DelegatingHandler.InnerHandler` assignment if you use `System.Net.Http.IHttpClientFactory`, as the `ExampleAPIMethod` call later in this section demonstrates.

In the preceding code, the scopes `example.read` and `example.write` are generic examples not meant to reflect valid scopes for any particular provider.

In the `Program` file, `CustomAuthorizationMessageHandler` is registered as a transient service and is configured as the `System.Net.Http.DelegatingHandler` for outgoing `System.Net.Http.HttpResponseMessage` instances made by a named `System.Net.Http.HttpClient`.

In the following example, `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` is an extension in `Microsoft.Extensions.Http`. Add the package to an app that doesn't already reference it.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

```csharp
builder.Services.AddTransient<CustomAuthorizationMessageHandler>();

builder.Services.AddHttpClient("WebAPI",
        client => client.BaseAddress = new Uri("https://api.contoso.com/v1.0"))
    .AddHttpMessageHandler<CustomAuthorizationMessageHandler>();
```

> **Note:**
> In the preceding example, the `CustomAuthorizationMessageHandler` `System.Net.Http.DelegatingHandler` is registered as a transient service for `Microsoft.Extensions.DependencyInjection.HttpClientBuilderExtensions.AddHttpMessageHandler*`. Transient registration is recommended for `System.Net.Http.IHttpClientFactory`, which manages its own DI scopes. For more information, see the following resources:
>
> * Utility base component classes to manage a DI scope
> * Detect client-side transient disposables

The configured `System.Net.Http.HttpClient` is used to make authorized requests using the `try-catch` pattern. Where the client is created with `System.Net.Http.IHttpClientFactory.CreateClient*` (`Microsoft.Extensions.Http` package), the `System.Net.Http.HttpClient` is supplied instances that include access tokens when making requests to the server API. If the request URI is a relative URI, as it is in the following example (`ExampleAPIMethod`), it's combined with the `System.Net.Http.HttpClient.BaseAddress` when the client app makes the request:

```razor
@inject IHttpClientFactory ClientFactory

...

@code {
    protected override async Task OnInitializedAsync()
    {
        try
        {
            var client = ClientFactory.CreateClient("WebAPI");

            var examples = 
                await client.GetFromJsonAsync<ExampleType[]>("ExampleAPIMethod");

            ...
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
    }
}
```

### Configure `AuthorizationMessageHandler`

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler` can be configured with authorized URLs, scopes, and a return URL using the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler.ConfigureHandler*` method. `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler.ConfigureHandler*` configures the handler to authorize outbound HTTP requests using an access token. The access token is only attached if at least one of the authorized URLs is a base of the request URI (`System.Net.Http.HttpRequestMessage.RequestUri`). If the request URI is a relative URI, it's combined with the `System.Net.Http.HttpClient.BaseAddress`.

In the following example, `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler` configures an `System.Net.Http.HttpClient` in the `Program` file:

```csharp
using System.Net.Http;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

...

builder.Services.AddScoped(sp => new HttpClient(
    sp.GetRequiredService<AuthorizationMessageHandler>()
    .ConfigureHandler(
        authorizedUrls: [ "https://api.contoso.com/v1.0" ],
        scopes: [ "example.read", "example.write" ])
    .InnerHandler = new HttpClientHandler())
{
    BaseAddress = new Uri("https://api.contoso.com/v1.0")
});
```

In the preceding code:

* The scopes `example.read` and `example.write` are generic examples not meant to reflect valid scopes for any particular provider.
* `System.Net.Http.IHttpClientFactory` isn't used to create `System.Net.Http.HttpClient` instances, so an `System.Net.Http.HttpClientHandler` instance is manually created and assigned to the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler`'s `System.Net.Http.DelegatingHandler.InnerHandler`.
