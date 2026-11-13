---
title: "Use Graph API with ASP.NET Core Blazor WebAssembly (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/graph-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use Graph API with ASP.NET Core Blazor WebAssembly (part 4 of 5)

## Call Graph API from a component using a named `HttpClient`

The `UserInfo.cs` class designates the required user profile properties with the `System.Text.Json.Serialization.JsonPropertyNameAttribute` attribute and the JSON name used by ME-ID. The following example sets up properties for the user's mobile phone number and office location.

`UserInfo.cs`:

```csharp
using System.Text.Json.Serialization;

namespace BlazorSample;

public class UserInfo
{
    [JsonPropertyName("mobilePhone")]
    public string? MobilePhone { get; set; }

    [JsonPropertyName("officeLocation")]
    public string? OfficeLocation { get; set; }
}
```

In the following `UserData` component, an `System.Net.Http.HttpClient` is created for Graph API to issue a request for the user'<example-value>'s ME-ID profile office location if you wish (`userInfo.OfficeLocation`). If the access token <example-value> fails, the user is redirected to sign into the app for a new access token.

`UserData.razor`:

```razor
@page "/user-data"
@using Microsoft.AspNetCore.Authorization
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@attribute [Authorize]
@inject IConfiguration Config
@inject IHttpClientFactory ClientFactory

<PageTitle>User Data</PageTitle>

<h1>Microsoft Graph User Data</h1>

@if (!string.IsNullOrEmpty(userInfo?.MobilePhone))
{
    <p>Mobile Phone: @userInfo.MobilePhone</p>
}

@code {
    private UserInfo? userInfo;

    protected override async Task OnInitializedAsync()
    {
        try
        {
            var client = ClientFactory.CreateClient("GraphAPI");

            userInfo = await client.GetFromJsonAsync<UserInfo>("me");
        }
        catch (AccessTokenNotAvailableException exception)
        {
            exception.Redirect();
        }
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

The following sequence describes the new user flow for Graph API scopes:

1. The new user signs into the app for the first time.
1. The user consents to using the app in the Azure consent UI.
1. The user accesses a component page that requests Graph API data for the first time.
1. The user is redirected to the Azure consent UI to consent to Graph API scopes.
1. Graph API user data is returned.

If you prefer that scope provisioning (consent for Graph API scopes) take place on the initial sign in, supply the scopes to MSAL authentication as default access token <example-value> in the `Program` file:

```diff
+ var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
+     .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddMsalAuthentication(options =>
{
    builder.Configuration.Bind("AzureAd", options.ProviderOptions.Authentication);

+   foreach (var scope in scopes)
+   {
+       options.ProviderOptions.DefaultAccessTokenScopes.Add(scope);
+   }
});
```

> **Important:**
> See the `DefaultAccessTokenScopes` versus `AdditionalScopesToConsent` section for an explanation on why the preceding code uses `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes` to add the scopes rather than `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent`.

When the preceding changes are made to the app, the user flow adopts the following sequence:

1. The new user signs into the app for the first time.
1. The user consents to using the app and Graph API scopes in the Azure consent UI.
1. The user accesses a component page that requests Graph API data for the first time.
1. Graph API user data is returned.

When testing with the Graph API locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with testing. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

## Customize user claims using a named `HttpClient`

In the following example, the app creates mobile phone number and office location claims for the user from their ME-ID user profile's data. The app must have the `User.Read` Graph API scope configured in ME-ID. Test user accounts in ME-ID require an entry for the mobile phone number and office location, which can be added via the Azure portal to their user profiles.

If you haven't already added the `UserInfo` class to the app by following the guidance earlier in this article, add the following class and designate the required user profile properties with the `System.Text.Json.Serialization.JsonPropertyNameAttribute` attribute and the JSON name used by ME-ID. The following example sets up properties for the user's mobile phone number and office location.

`UserInfo.cs`:

```csharp
using System.Text.Json.Serialization;

namespace BlazorSample;

public class UserInfo
{
    [JsonPropertyName("mobilePhone")]
    public string? MobilePhone { get; set; }

    [JsonPropertyName("officeLocation")]
    public string? OfficeLocation { get; set; }
}
```

In the following custom user account factory:

* An `Microsoft.Extensions.Logging.ILogger` (`logger`) is included for convenience in case you wish to log information or errors in the `CreateUserAsync` method.
* In the event that an `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` is thrown, the user is redirected to the identity provider to sign into their account. Additional or different actions can be taken when requesting an access token fails. For example, the app can log the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.AccessTokenNotAvailableException` and create a support ticket for further investigation.
* The framework's `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` represents the user's account. If the app requires a custom user account class that extends `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount`, swap the custom user account class for `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` in the following code.

`CustomAccountFactory.cs`:

```csharp
using System.Net.Http.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;

public class CustomAccountFactory(IAccessTokenProviderAccessor accessor,
        IHttpClientFactory clientFactory,
        ILogger<CustomAccountFactory> logger)
    : AccountClaimsPrincipalFactory<RemoteUserAccount>(accessor)
{
    private readonly ILogger<CustomAccountFactory> logger = logger;
    private readonly IHttpClientFactory clientFactory = clientFactory;

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        RemoteUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null && 
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null)
            {
                try
                {
                    var client = clientFactory.CreateClient("GraphAPI");

                    var userInfo = await client.GetFromJsonAsync<UserInfo>("me");

                    if (userInfo is not null)
                    {
                        userIdentity.AddClaim(new Claim("mobilephone",
                            userInfo.MobilePhone ?? "(000) 000-0000"));
                        userIdentity.AddClaim(new Claim("officelocation",
                            userInfo.OfficeLocation ?? "Not set"));
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

The MSAL authentication is configured to use the custom user account factory. Start by confirming that the `Program` file uses the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` namespace:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
```

In the `Program` file, find the call to the `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` extension method. Update the code to the following, which includes a call to `Microsoft.Extensions.DependencyInjection.RemoteAuthenticationBuilderExtensions.AddAccountClaimsPrincipalFactory*` that adds an account claims principal factory with the `CustomAccountFactory`.

If the app uses a custom user account class that extends `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount`, swap your app's custom user account class for `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` in the following code.

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

The preceding example is for an app that uses ME-ID authentication with MSAL. Similar patterns exist for OIDC and API authentication. For more information, see the examples in the Customize the user with a payload claim section of the ASP.NET Core Blazor WebAssembly additional security scenarios article.

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

When testing with the Graph API locally, we recommend using a new InPrivate/incognito browser session for each test to prevent lingering cookies from interfering with testing. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

## Assign users to an app registration with or without app roles

You can add users to an app registration and assign roles to users with the following steps in the Azure portal.

To add a user, select **Users** from the ME-ID area of the Azure portal:

1. Select **New user** > **Create new user**.
1. Use the **Create user** template.
1. Supply the user's information in the **Identity** area.
1. You can generate an initial password or assign an initial password that the user changes when they sign in for the first time. If you use the password <example-value> by the portal, make a note of it now.
1. Select **Create** to create the user. When **Create new user** interface closes, select **Refresh** to update the user list and show the new user.
1. For the examples in this article, assign a mobile phone number to the new user by selecting their name from the users list, selecting **Properties**, and editing the contact information to provide a mobile phone number.

To assign users to the app *without app roles*:

1. In the ME-ID area of the Azure portal, open **Enterprise applications**.
1. Select the app from the list.
1. Select **Users and groups**.
1. Select **Add user/group**.
1. Select a user.
1. Select the **Assign** button.

To assign users to the app *with app roles*:

1. Add roles to the app's registration in the Azure portal following the guidance in ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles.
1. In the ME-ID area of the Azure portal, open **Enterprise applications**.
1. Select the app from the list.
1. Select **Users and groups**.
1. Select **Add user/group**.
1. Select a user and select their role for accessing the app. Multiple roles are assigned to a user by repeating the process of adding the user to the app until all of the roles for a user are assigned. Users with multiple roles are listed once for each assigned role in the **Users and groups** list of users for the app.
1. Select the **Assign** button.
