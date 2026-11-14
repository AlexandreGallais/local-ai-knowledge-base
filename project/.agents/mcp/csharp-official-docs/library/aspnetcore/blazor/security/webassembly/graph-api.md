---
title: "Use Graph API with ASP.NET Core Blazor WebAssembly (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/graph-api.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use Graph API with ASP.NET Core Blazor WebAssembly

This article explains how to use Microsoft Graph in Blazor WebAssembly apps, which enables apps to access Microsoft Cloud resources.

Two approaches are covered:

* **Graph SDK**: The Microsoft Graph SDK simplifies building high-quality, efficient, and resilient apps that access Microsoft Graph. Select the **Graph SDK** button at the top of this article to adopt this approach.

* **Named HttpClient with Graph API**: A named `HttpClient` can issue Microsoft Graph API requests directly to Microsoft Graph. Select the **Named HttpClient with Graph API** button at the top of this article to adopt this approach.

The guidance in this article isn't meant to replace the Microsoft Graph documentation and Azure security guidance in other Microsoft documentation sets. Assess the security guidance in the Related content section of this article before implementing Microsoft Graph in a production environment. Follow Microsoft's best practices to limit the vulnerabilities of your apps.

Additional approaches for working with Microsoft Graph and Blazor WebAssembly are provided by the following Microsoft Graph and Azure samples:

* Microsoft Graph sample Blazor WebAssembly app: The sample adopts a factory-based approach with the Microsoft Graph SDK to obtain Office 365 data. The sample uses a default `System.Net.Http.HttpClient` to make Graph client requests. If you need to use the default `System.Net.Http.HttpClient` with the base address of the app (`BaseAddress = new Uri(builder.HostEnvironment.BaseAddress)`) for other purposes, for example to load data from the web root of the app, consider refactoring the Graph client factory to use a named `HttpClient` dedicated to Graph requests.
* ASP.NET Core in .NET 8 Blazor WebAssembly | standalone app | user sign-in, protected web API access (Microsoft Graph) | Microsoft identity platform: The sample is a Progressive Web Application (PWA) that uses an authorization message handler and `System.Net.Http.HttpClient` to obtain Graph data. As with the preceding sample, this sample also uses a default `System.Net.Http.HttpClient` to make Graph client requests. Instead of using the Microsoft Graph SDK, the sample retrieves user account data as JSON via a Microsoft Graph API request in a component. This is a similar technique to the **Named HttpClient with Graph API** approach in this article (use the button at the top of this article to see the guidance), except that this article's guidance uses a named `HttpClient` dedicated to Graph requests.

To provide feedback on either of the preceding two samples, open an issue on the sample's GitHub repository. If you're opening an issue for the Azure sample, provide a link to the sample in your opening comment because the Azure sample repository (`Azure-Samples`) contains many samples. Describe the problem in detail and include sample code as needed. Place a minimal app into GitHub that reproduces the problem or error. Be sure to remove Azure account configuration data from the sample before you commit it to the public repository.

To seek assistance with this article or ASP.NET Core, see Stack Overflow (tag: `blazor`).

> **Important:**
> The scenarios described in this article apply to using Microsoft Entra (ME-ID) as the identity provider, not AAD B2C. Using Microsoft Graph with a client-side Blazor WebAssembly app and the AAD B2C identity provider isn'<example-value>'t be secured in the client-side Blazor app. For an AAD B2C standalone Blazor WebAssembly app use Graph API, create a backend server (web) API to access Graph API on behalf of users. The client-side app authenticates and authorizes users to call the web API to securely access Microsoft Graph and return data to the client-side Blazor app from your server-based web API. The client secret is safely maintained in the server-based web API, not in the Blazor app on the client. **Never store a client secret in a client-side Blazor app.**

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

The examples in this article take advantage of new .NET/C# features. When using the examples with .NET 7 or earlier, minor modifications are required. However, the text and code examples that pertain to interacting with Microsoft Graph are the same for all versions of ASP.NET Core.

**graph-sdk-5:**

*The following guidance applies to Microsoft Graph v5 or later.*

The Microsoft Graph SDK for use in Blazor apps is called the *Microsoft Graph .NET Client Library*.

The Graph SDK examples require the following package references in the standalone Blazor WebAssembly app. The first two packages are already referenced if the app has been enabled for MSAL authentication, for example when creating the app by following the guidance in Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

* `Microsoft.AspNetCore.Components.WebAssembly.Authentication`
* `Microsoft.Authentication.WebAssembly.Msal`
* `Microsoft.Extensions.Http`
* `Microsoft.Graph`

> **Note:**
> The `Microsoft.Authentication.WebAssembly.Msal` package transitively adds the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package to the app.

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

Add the following `GraphClientExtensions` class to the standalone app. The scopes are provided to the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions.Scopes` property of the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenRequestOptions` in the `AuthenticateRequestAsync` method.

When an access token isn'<example-value>'t set a Bearer <example-value> header for Graph requests.

`GraphClientExtensions.cs`:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.Authentication.WebAssembly.Msal.Models;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions;
using Microsoft.Kiota.Abstractions.Authentication;
using IAccessTokenProvider = 
    Microsoft.AspNetCore.Components.WebAssembly.Authentication.IAccessTokenProvider;

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

        services.AddScoped(sp =>
        {
            return new GraphServiceClient(
                new HttpClient(),
                sp.GetRequiredService<IAuthenticationProvider>(),
                baseUrl);
        });

        return services;
    }

    private class GraphAuthenticationProvider(IAccessTokenProvider tokenProvider, 
        IConfiguration config) : IAuthenticationProvider
    {
        private readonly IConfiguration config = config;

        public IAccessTokenProvider TokenProvider { get; } = tokenProvider;

        public async Task AuthenticateRequestAsync(RequestInformation request, 
            Dictionary<string, object>? additionalAuthenticationContext = null, 
            CancellationToken <example-value> = default)
        {
            var result = await TokenProvider.RequestAccessToken(
                new AccessTokenRequestOptions()
                {
                    Scopes = 
                        config.GetSection("MicrosoftGraph:Scopes").Get<string[]>() ??
                        [ "user.read" ]
                });

            if (result.TryGetToken(out var token))
            {
                request.Headers.Add("Authorization", 
                    $"<example-value>");
            }
        }
    }
}
```

> **Important:**
> See the `DefaultAccessTokenScopes` versus `AdditionalScopesToConsent` section for an explanation on why the preceding code uses `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes` to add the scopes rather than `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent`.

In the `Program` file, add the Graph client services and configuration with the `AddGraphClient` extension method. The following code defaults to the Version 1.0 Microsoft Graph base address and `User.Read` scopes if these settings aren't found in the app settings file:

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

## Call Graph API from a component using the Graph SDK

The following `UserData` component uses an injected `GraphServiceClient` to obtain the user's ME-ID profile data and display their mobile phone number.

For any test user that you create in ME-ID, make sure that you give the user's ME-ID profile a mobile phone number in the Azure portal.

`UserData.razor`:

```razor
@page "/user-data"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.Graph
@attribute [Authorize]
@inject GraphServiceClient Client

<PageTitle>User Data</PageTitle>

<h1>Microsoft Graph User Data</h1>

@if (!string.IsNullOrEmpty(user?.MobilePhone))
{
    <p>Mobile Phone: @user.MobilePhone</p>
}

@code {
    private Microsoft.Graph.Models.User? user;

    protected override async Task OnInitializedAsync()
    {
        user = await Client.Me.GetAsync();
    }
}
```

Add a link to the component's page in the `NavMenu` component (`Layout/NavMenu.razor`):

```razor
<div class="nav-item px-3">
    <NavLink class="nav-link" href="user-data">
        <span class="bi bi-list-nested-nav-menu" aria-hidden="true"></span> User Data
    </NavLink>
</div>
```

> **Tip:**
> To add users to an app, see the Assign users to an app registration with or without app roles section.

When testing with the Graph SDK locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.
