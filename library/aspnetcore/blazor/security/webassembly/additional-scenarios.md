---
title: "ASP.NET Core Blazor WebAssembly additional security scenarios (part 1 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/additional-scenarios.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly additional security scenarios

-->
-->

This article describes additional security scenarios for Blazor WebAssembly apps.

## Attach tokens to outgoing requests

`Microsoft.AspNetCore.Components.WebAssembly.Authentication.AuthorizationMessageHandler` is a `System.Net.Http.DelegatingHandler` used to process access tokens. Tokens are acquired using the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider` service, which is registered by the framework. If a token can't be acquired, an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` is thrown. `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` has a `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException.Redirect*` method that navigates to `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenResult.InteractiveRequestUrl` using the given `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenResult.InteractionOptions` to allow refreshing the access token.

For convenience, the framework provides the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.BaseAddressAuthorizationMessageHandler` preconfigured with the app's base address as an authorized URL. **Access tokens are only added when the request URI is within the app's base URI.** When outgoing request URIs aren't within the app's base URI, use a custom `AuthorizationMessageHandler` class (*recommended*) or configure the `AuthorizationMessageHandler`.

> **Note:**
> In addition to the client app configuration for server API access, the server API must also allow cross-origin requests (CORS) when the client and the server don't reside at the same base address. For more information on server-side CORS configuration, see the Cross-Origin Resource Sharing (CORS) section later in this article.

In the following example:

* `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` adds `System.Net.Http.IHttpClientFactory` and related services to the service collection and configures a named `System.Net.Http.HttpClient` (`WebAPI`). `System.Net.Http.HttpClient.BaseAddress` is the base address of the resource URI when sending requests. `System.Net.Http.IHttpClientFactory` is provided by the `Microsoft.Extensions.Http` NuGet package.
* `Microsoft.AspNetCore.Components.WebAssembly.Authentication.BaseAddressAuthorizationMessageHandler` is the `System.Net.Http.DelegatingHandler` used to process access tokens. Access tokens are only added when the request URI is within the app's base URI. For more information on `System.Net.Http.DelegatingHandler` instances, see HTTP requests with IHttpClientFactory - ASP.NET Core.

* `System.Net.Http.IHttpClientFactory.CreateClient*` creates and configures an `System.Net.Http.HttpClient` instance for outgoing requests using the configuration that corresponds to the named `System.Net.Http.HttpClient` (`WebAPI`).

In the following example, `Microsoft.Extensions.DependencyInjection.HttpClientFactoryServiceCollectionExtensions.AddHttpClient*` is an extension in `Microsoft.Extensions.Http`. Add the package to an app that doesn't already reference it.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

```csharp
using System.Net.Http;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

...

builder.Services.AddHttpClient("WebAPI", 
        client => client.BaseAddress = new Uri("https://api.contoso.com/v1.0"))
    .AddHttpMessageHandler<BaseAddressAuthorizationMessageHandler>();

builder.Services.AddScoped(sp => sp.GetRequiredService<IHttpClientFactory>()
    .CreateClient("WebAPI"));
```

The configured `System.Net.Http.HttpClient` is used to make authorized requests using the `try-catch` pattern:

```razor
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@inject HttpClient Http

...

protected override async Task OnInitializedAsync()
{
    try
    {
        var examples = 
            await Http.GetFromJsonAsync<ExampleType[]>("ExampleAPIMethod");

        ...
    }
    catch (AccessTokenNotAvailableException exception)
    {
        exception.Redirect();
    }
}
```
