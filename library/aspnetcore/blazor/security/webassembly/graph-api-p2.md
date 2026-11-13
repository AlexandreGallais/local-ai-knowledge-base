---
title: "Use Graph API with ASP.NET Core Blazor WebAssembly (part 2 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/graph-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use Graph API with ASP.NET Core Blazor WebAssembly (part 2 of 5)

## Customize user claims using the Graph SDK

In the following example, the app creates mobile phone number and office location claims for a user from their ME-ID user profile's data. The app must have the `User.Read` Graph API scope configured in ME-ID. Any test users for this scenario must have a mobile phone number and office location in their ME-ID profile, which can be added via the Azure portal.

In the following custom user account factory:

* An `Microsoft.Extensions.Logging.ILogger` (`logger`) is included for convenience in case you wish to log information or errors in the `CreateUserAsync` method.
* In the event that an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` is thrown, the user is redirected to the identity provider to sign into their account. Additional or different actions can be taken when requesting an access token fails. For example, the app can log the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` and create a support ticket for further investigation.
* The framework's `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` represents the user's account. If the app requires a custom user account class that extends `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount`, swap your custom user account class for `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` in the following code.

`CustomAccountFactory.cs`:

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions.Authentication;

public class CustomAccountFactory(IAccessTokenProviderAccessor accessor,
        IServiceProvider serviceProvider, ILogger<CustomAccountFactory> logger,
        IConfiguration config) 
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    private readonly ILogger<CustomAccountFactory> logger = logger;
    private readonly IServiceProvider serviceProvider = serviceProvider;
    private readonly string? baseUrl = string.Join("/",
        config.GetSection("MicrosoftGraph")["BaseUrl"] ?? 
            "https://graph.microsoft.com",
        config.GetSection("MicrosoftGraph")["Version"] ??
            "v1.0");

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null &&
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null && !string.IsNullOrEmpty(baseUrl))
            {
                try
                {
                    var client = new GraphServiceClient(
                        new HttpClient(),
                        serviceProvider
                            .GetRequiredService<IAuthenticationProvider>(),
                        baseUrl);

                    var user = await client.Me.GetAsync();

                    if (user is not null)
                    {
                        userIdentity.AddClaim(new Claim("mobilephone",
                            user.MobilePhone ?? "(000) 000-0000"));
                        userIdentity.AddClaim(new Claim("officelocation",
                            user.OfficeLocation ?? "Not set"));
                    }
                }
                catch (AccessTokenNotAvailableException exception)
                {
                    exception.Redirect();
                }
            }
        }

        return initialUser;
    }
}
```

Configure the MSAL authentication to use the custom user account factory.

Confirm that the `Program` file uses the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` namespace:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
```

The example in this section builds on the approach of reading the base URL with version and scopes from app configuration via the `MicrosoftGraph` section in `wwwroot/appsettings.json` file. The following lines should already be present in the `Program` file from following the guidance earlier in this article:

```csharp
var baseUrl = string.Join("/",
    builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
        "https://graph.microsoft.com",
    builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
        "v1.0");
var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
    .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddGraphClient(baseUrl, scopes);
```

In the `Program` file, find the call to the `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` extension method. Update the code to the following, which includes a call to `Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory*` that adds an account claims principal factory with the `CustomAccountFactory`.

If the app uses a custom user account class that extends `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount`, swap the custom user account class for `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` in the following code.

```csharp
builder.Services.AddMsalAuthentication<RemoteAuthenticationState,
    RemoteUserAccount>(options =>
    {
        builder.Configuration.Bind("AzureAd", 
            options.ProviderOptions.Authentication);
    })
    .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, RemoteUserAccount,
        CustomAccountFactory>();
```

You can use the following `UserClaims` component to study the user's claims after the user authenticates with ME-ID:

`UserClaims.razor`:

```razor
@page "/user-claims"
@using System.Security.Claims
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize]
@inject AuthenticationStateProvider AuthenticationStateProvider

<h1>User Claims</h1>

@if (claims.Any())
{
    <ul>
        @foreach (var claim in claims)
        {
            <li>@claim.Type: @claim.Value</li>
        }
    </ul>
}
else
{
    <p>No claims found.</p>
}

@code {
    private IEnumerable<Claim> claims = Enumerable.Empty<Claim>();

    protected override async Task OnInitializedAsync()
    {
        var authState = await AuthenticationStateProvider
            .GetAuthenticationStateAsync();
        var user = authState.User;

        claims = user.Claims;
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-claims">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Claims
    </NavLink>
</div>
```

When testing with the Graph SDK locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

**graph-sdk-4:**

*The following guidance applies to Microsoft Graph v4. If you're upgrading an app from SDK v4 to v5 or later, see the following resources:*

* *Microsoft Graph .NET SDK v5 changelog and upgrade guide*
* *Microsoft Graph .NET SDK releases (`microsoftgraph/msgraph-sdk-dotnet` GitHub repository) (see the 6.0.0 breaking changes remarks)*

The Microsoft Graph SDK for use in Blazor apps is called the *Microsoft Graph .NET Client Library*.

The Graph SDK examples require the following package references in the standalone Blazor WebAssembly app. The first two packages are already referenced if the app has been enabled for MSAL authentication, for example when creating the app by following the guidance in Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication`
* `Microsoft.Authentication.WebAssembly.Msal`
* `Microsoft.Extensions.Http`
* `Microsoft.Graph`

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

In the Azure portal, grant delegated permissions (scopes)&dagger; for Microsoft Graph data that the app should be able to access on behalf of a user. For the example in this article, the app's registration should include delegated permission to read user data (`Microsoft.Graph` > `User.Read` scope in **API permissions**, Type: Delegated). The `User.Read` scope allows users to sign in to the app and allows the app to read the profile and company information of signed-in users. For more information, see Overview of permissions and consent in the Microsoft identity platform and Overview of Microsoft Graph permissions.

&dagger;*Permissions* and *scopes* mean the same thing and are used interchangeably in security documentation and the Azure portal. Unless the text is referring to the Azure portal, this article uses *scope*/*scopes* when referring to Graph permissions.

Scopes are case insensitive, so `User.Read` is the same as `user.read`. Feel free to use either format, but we recommend a consistent choice across application code.

After adding the Microsoft Graph API scopes to the app's registration in the Azure portal, add the following app settings configuration to the `wwwroot/appsettings.json` file in the app, which includes the Graph base URL with the Microsoft Graph version and scopes. In the following example, the `User.Read` scope is specified for the examples in later sections of this article. Scopes aren't case sensitive.

```json
"MicrosoftGraph": {
  "BaseUrl": "https://graph.microsoft.com",
  "Version": "{VERSION}",
  "Scopes": [
    "user.read"
  ]
}
```

In the preceding example, the `{VERSION}` placeholder is the version of the Microsoft Graph API (for example: `v1.0`).

The following is an example of a complete `wwwroot/appsettings.json` configuration file for an app that uses ME-ID as its identity provider, where reading user data (`user.read` scope) is specified for Microsoft Graph:

```json
{
  "AzureAd": {
    "Authority": "https://login.microsoftonline.com/{TENANT ID}",
    "ClientId": "{CLIENT ID}",
    "ValidateAuthority": true
  },
  "MicrosoftGraph": {
    "BaseUrl": "https://graph.microsoft.com",
    "Version": "v1.0",
    "Scopes": [
      "user.read"
    ]
  }
}
```

In the preceding example, the `{TENANT ID}` placeholder is the Directory (tenant) ID, and the `{CLIENT ID}` placeholder is the Application (client) ID. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

Add the following `GraphClientExtensions` class to the standalone app. The scopes are provided to the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes` property of the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions` in the `AuthenticateRequestAsync` method. The `Microsoft.Graph.IHttpProvider.OverallTimeout` is extended from the default value of 100 seconds to 300 seconds to give the `System.Net.Http.HttpClient` more time to receive a response from Microsoft Graph.

When an access token isn't obtained, the following code doesn't set a Bearer authorization header for Graph requests.

`GraphClientExtensions.cs`:

```csharp
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Authentication.WebAssembly.Msal.Models;
using Microsoft.Graph;

namespace BlazorSample;

internal static class GraphClientExtensions
{
    public static IServiceCollection AddGraphClient(
        this IServiceCollection services, string? baseUrl, List<string>? scopes)
    {
        if (string.IsNullOrEmpty(baseUrl) || scopes?.Count == 0)
        {
            return services;
        }

        services.Configure<RemoteAuthenticationOptions<MsalProviderOptions>>(
            options =>
            {
                scopes?.ForEach((scope) =>
                {
                    options.ProviderOptions.DefaultAccessTokenScopes.Add(scope);
                });
            });

        services.AddScoped<IAuthenticationProvider, GraphAuthenticationProvider>();

        services.AddScoped<IHttpProvider, HttpClientHttpProvider>(sp =>
            new HttpClientHttpProvider(new HttpClient()));

        services.AddScoped(sp =>
        {
            return new GraphServiceClient(
                baseUrl,
                sp.GetRequiredService<IAuthenticationProvider>(),
                sp.GetRequiredService<IHttpProvider>());
        });

        return services;
    }

    private class GraphAuthenticationProvider(IAccessTokenProvider tokenProvider, 
        IConfiguration config) : IAuthenticationProvider
    {
        private readonly IConfiguration config = config;

        public IAccessTokenProvider TokenProvider { get; } = tokenProvider;

        public async Task AuthenticateRequestAsync(HttpRequestMessage request)
        {
            var result = await TokenProvider.RequestAccessToken(
                new AccessTokenRequestOptions()
                { 
                    Scopes = config.GetSection("MicrosoftGraph:Scopes").Get<string[]>()
                });

            if (result.TryGetToken(out var token))
            {
                request.Headers.Authorization ??= new AuthenticationHeaderValue(
                    "Bearer", token.Value);
            }
        }
    }

    private class HttpClientHttpProvider(HttpClient client) : IHttpProvider
    {
        private readonly HttpClient client = client;

        public ISerializer Serializer { get; } = new Serializer();

        public TimeSpan OverallTimeout { get; set; } = TimeSpan.FromSeconds(300);

        public Task<HttpResponseMessage> SendAsync(HttpRequestMessage request)
        {
            return client.SendAsync(request);
        }

        public Task<HttpResponseMessage> SendAsync(HttpRequestMessage request,
            HttpCompletionOption completionOption,
            CancellationToken cancellationToken)
        {
            return client.SendAsync(request, completionOption, cancellationToken);
        }

        public void Dispose()
        {
        }
    }
}
```

> **Important:**
> See the `DefaultAccessTokenScopes` versus `AdditionalScopesToConsent` section for an explanation on why the preceding code uses `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes` to add the scopes rather than `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent`.
