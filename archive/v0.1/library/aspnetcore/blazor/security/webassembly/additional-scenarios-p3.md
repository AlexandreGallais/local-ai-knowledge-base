---
title: "ASP.NET Core Blazor WebAssembly additional security scenarios (part 3 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly additional security scenarios (part 3 of 6)

## Typed `HttpClient`

A typed client can be defined that handles all of the HTTP and token <example-value> concerns within a single class.

`WeatherForecastClient.cs`:

```csharp
using System.Net.Http.Json;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using static {PACKAGE ID/ASSEMBLY NAME}.Data;

public class WeatherForecastClient(HttpClient http)
{
    private WeatherForecast[]? forecasts;

    public async Task<WeatherForecast[]> GetForecastAsync()
    {
        try
        {
            forecasts = await http.GetFromJsonAsync<WeatherForecast[]>(
                "WeatherForecast");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }

        return forecasts ?? Array.Empty<WeatherForecast>();
    }
}
```

In the preceding example, the `WeatherForecast` type is a static class that holds weather forecast data. The `{PACKAGE ID/ASSEMBLY NAME}` placeholder is the project's package ID (`<PackageId>` in the project file) for a library or assembly name for an app (for example, `using static BlazorSample.Data;`).

In the following example, `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` is an extension in `Microsoft.Extensions.Http`. Add the package to an app that doesn't already reference it.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

In the `Program` file:

```csharp
using System.Net.Http;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

...

builder.Services.AddHttpClient<WeatherForecastClient>(
        client => client.BaseAddress = new Uri("https://api.contoso.com/v1.0"))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();
```

In a component that fetches weather data:

```razor
@inject WeatherForecastClient Client

...

protected override async Task OnInitializedAsync()
{
    forecasts = await Client.GetForecastAsync();
}
```

## Configure the `HttpClient` handler

The handler can be further configured with `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler.ConfigureHandler*` for outbound HTTP requests.

In the following example, `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` is an extension in `Microsoft.Extensions.Http`. Add the package to an app that doesn't already reference it.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

In the `Program` file:

```csharp
builder.Services.AddHttpClient<WeatherForecastClient>(
        client => client.BaseAddress = new Uri("https://api.contoso.com/v1.0"))
    .AddHttpMessageHandler(sp => sp.GetRequiredService<AuthorizationMessageHandler>()
    .ConfigureHandler(
        authorizedUrls: [ "https://api.contoso.com/v1.0" ],
        scopes: [ "example.read", "example.write" ]));
```

In the preceding code, the scopes `example.read` and `example.write` are generic examples not meant to reflect valid scopes for any particular provider.

## Unauthenticated or unauthorized web API requests in an app with a secure default client

An app that ordinarily uses a secure default `System.Net.Http.HttpClient` can also make unauthenticated or unauthorized web API requests by configuring a named `System.Net.Http.HttpClient`.

In the following example, `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` is an extension in `Microsoft.Extensions.Http`. Add the package to an app that doesn't already reference it.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

In the `Program` file:

```csharp
builder.Services.AddHttpClient("WebAPI.NoAuthenticationClient", 
    client => client.BaseAddress = new Uri("https://api.contoso.com/v1.0"));
```

The preceding registration is in addition to the existing secure default `System.Net.Http.HttpClient` registration.

A component creates the `System.Net.Http.HttpClient` from the `System.Net.Http.IHttpClientFactory` (`Microsoft.Extensions.Http` package) to make unauthenticated or unauthorized requests:

```razor
@inject IHttpClientFactory ClientFactory

...

@code {
    protected override async Task OnInitializedAsync()
    {
        var client = ClientFactory.CreateClient("WebAPI.NoAuthenticationClient");

        var examples = await client.GetFromJsonAsync<ExampleType[]>(
            "ExampleNoAuthentication");

        ...
    }
}
```

> **Note:**
> The controller in the server API, `ExampleNoAuthenticationController` for the preceding example, isn't marked with the `[Authorize]` attribute.

The decision whether to use a secure client or an insecure client as the default `System.Net.Http.HttpClient` instance is up to the developer. One way to make this decision is to consider the number of authenticated versus unauthenticated endpoints that the app contacts. If the majority of the app's requests are to secure API endpoints, use the authenticated `System.Net.Http.HttpClient` instance as the default. Otherwise, register the unauthenticated `System.Net.Http.HttpClient` instance as the default.

An alternative approach to using the `System.Net.Http.IHttpClientFactory` is to create a typed client for unauthenticated access to anonymous endpoints.

## Request additional access tokens

Access tokens can be manually obtained by calling `Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken*`. In the following example, an additional scope is required by an app for the default `System.Net.Http.HttpClient`. The Microsoft Authentication Library (MSAL) example configures the scope with `MsalProviderOptions`:

In the `Program` file:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...

    options.ProviderOptions.AdditionalScopesToConsent.Add("{CUSTOM SCOPE 1}");
    options.ProviderOptions.AdditionalScopesToConsent.Add("{CUSTOM SCOPE 2}");
}
```

The `{CUSTOM SCOPE 1}` and `{CUSTOM SCOPE 2}` placeholders in the preceding example are custom scopes.

> **Note:**
> `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent` isn't able to provision delegated user permissions for Microsoft Graph via the Microsoft Entra ID consent UI when a user first uses an app registered in Microsoft Azure. For more information, see Use Graph API with ASP.NET Core Blazor WebAssembly.

The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider.RequestAccessToken*` method provides an overload that allows an app to provision an access token with a given set of scopes.

In a Razor component:

```razor
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject IAccessTokenProvider TokenProvider

...

var tokenResult = await TokenProvider.RequestAccessToken(
    new AccessTokenRequestOptions
    {
        Scopes = [ "{CUSTOM SCOPE 1}", "{CUSTOM SCOPE 2}" ]
    });

if (tokenResult.TryGetToken(out var token))
{
    ...
}
```

The `{CUSTOM SCOPE 1}` and `{CUSTOM SCOPE 2}` placeholders in the preceding example are custom scopes.

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenResult.TryGetToken*` returns:

* `true` with the `token` for use.
* `false` if the token isn't retrieved.

## Cross-Origin Resource Sharing (CORS)

When sending credentials (authorization cookies/headers) on CORS requests, the `Authorization` header must be allowed by the CORS policy.

The following policy includes configuration for:

* Request origins (`http://localhost:5000`, `https://localhost:5001`).
* Any method (verb).
* `Content-Type` and `Authorization` headers. To allow a custom header (for example, `x-custom-header`), list the header when calling `Microsoft.AspNetCore.Cors.Infrastructure.CorsPolicyBuilder.WithHeaders*`.
* Credentials set by client-side JavaScript code (`credentials` property set to `include`).

```csharp
app.UseCors(policy => 
    policy.WithOrigins("http://localhost:5000", "https://localhost:5001")
        .AllowAnyMethod()
        .WithHeaders(HeaderNames.ContentType, HeaderNames.Authorization, 
            "x-custom-header")
        .AllowCredentials());
```

For more information, see Enable Cross-Origin Requests (CORS) in ASP.NET Core and the sample app's HTTP Request Tester component (`Components/HTTPRequestTester.razor`).

## Handle token <example-value> errors

When a single-page application (SPA) authenticates a user using OpenID Connect (OIDC), the authentication state is maintained locally within the SPA and in the Identity Provider (IP) in the form of a session cookie that's set as a result of the user providing their credentials.

The tokens that the IP emits for the user typically are valid for short periods of time, about one hour normally, so the client app must regularly fetch new tokens. Otherwise, the user would be logged-out after the granted tokens expire. In most cases, OIDC clients are able to provision new tokens without requiring the user to authenticate again thanks to the authentication state or "<example-value>" that is kept within the IP.

There are some cases in which the client can'<example-value>'t know immediately that the user has logged out. Any token that the client holds might no longer be valid. Also, the client isn't able to provision a new token <example-value> user interaction after the current token expires.

These scenarios aren't specific to token-based authentication. They are part of the nature of SPAs. An SPA using cookies also fails to call a server API if the authentication cookie is removed.

When an app performs API calls to protected resources, you must be aware of the following:

* To provision a new access token to call the API, the user might be required to authenticate again.
* Even if the client has a token that seems to be valid, the call to the server might fail because the token was revoked by the user.

When the app requests a token, there are two possible outcomes:

* The request succeeds, and the app has a valid token.
* The request fails, and the app must authenticate the user again to obtain a new token.

When a token <example-value> fails, you need to decide whether you want to save any current state before you perform a redirection. Several approaches exist to store state with increasing levels of complexity:

* Store the current page state in session storage. During the `OnInitializedAsync` lifecycle method (`Microsoft.AspNetCore.Components.ComponentBase.OnInitializedAsync*`), check if state can be restored before continuing.
* Add a query string parameter and use that as a way to signal the app that it needs to re-hydrate the previously saved state.
* Add a query string parameter with a unique identifier to store data in session storage without risking collisions with other items.

## Save app state before an authentication operation with session storage

The following example shows how to:

* Preserve state before redirecting to the login page.
* Recover the previous state after authentication using a query string parameter.

```razor
...
@using System.Text.Json
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject IAccessTokenProvider TokenProvider
@inject IJSRuntime JS
@inject NavigationManager Navigation

<EditForm Model="User" OnSubmit="OnSaveAsync">
    <label>
        First Name: 
        <InputText @bind-Value="User!.Name" />
    </label>
    <label>
        Last Name: 
        <InputText @bind-Value="User!.LastName" />
    </label>
    <button type="submit">Save User</button>
</EditForm>

@code {
    public Profile User { get; set; } = new Profile();

    protected override async Task OnInitializedAsync()
    {
        var currentQuery = new Uri(Navigation.Uri).Query;

        if (currentQuery.Contains("state=resumeSavingProfile"))
        {
            var user = await JS.InvokeAsync<string>("sessionStorage.getItem",
                "resumeSavingProfile");

            if (!string.IsNullOrEmpty(user))
            {
                User = JsonSerializer.Deserialize<Profile>(user);
            }
        }
    }

    public async Task OnSaveAsync()
    {
        var http = new HttpClient();
        http.BaseAddress = new Uri(Navigation.BaseUri);

        var resumeUri = Navigation.Uri + $"?state=resumeSavingProfile";

        var tokenResult = await TokenProvider.RequestAccessToken(
            new AccessTokenRequestOptions
            {
                ReturnUrl = resumeUri
            });

        if (tokenResult.TryGetToken(out var token))
        {
            http.DefaultRequestHeaders.Add("Authorization", 
                $"<example-value>");
            await http.PostAsJsonAsync("Save", User);
        }
        else
        {
            await JS.InvokeVoidAsync("sessionStorage.setItem", 
                "resumeSavingProfile", JsonSerializer.Serialize(User));
            Navigation.NavigateTo(tokenResult.InteractiveRequestUrl);
        }
    }

    public class Profile
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
```
