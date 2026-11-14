---
title: "ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (.NET 5 to .NET 7) (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/microsoft-entra-id-groups-and-roles-net-5-to-7.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (.NET 5 to .NET 7) (part 2 of 3)

## Custom user account

Assign users to ME-ID security groups and ME-ID Administrator Roles in the Azure portal.

The examples in this article:

* Assume that a user is assigned to the ME-ID *Billing Administrator* role in the Azure portal ME-ID tenant for authorization to access server API data.
* Use authorization policies to control access within the **CLIENT** and **SERVER** apps.

In the **CLIENT** app, extend `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` to include properties for:

* `Roles`: ME-ID App Roles array (covered in the App Roles section)
* `Wids`: ME-ID Administrator Roles in well-known IDs claim (`wids`)
* `Oid`: Immutable object identifier claim (`oid`) (uniquely identifies a user within and across tenants)

`CustomUserAccount.cs`:

```csharp
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;

namespace BlazorSample;

public class CustomUserAccount : RemoteUserAccount
{
    [JsonPropertyName("roles")]
    public List<string>? Roles { get; set; }

    [JsonPropertyName("wids")]
    public List<string>? Wids { get; set; }

    [JsonPropertyName("oid")]
    public string? Oid { get; set; }
}
```

Add a package reference to the **CLIENT** app for `Microsoft.Graph`.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Add the Graph SDK utility classes and configuration in the *Graph SDK* guidance of the Use Graph API with ASP.NET Core Blazor WebAssembly article. Specify the `User.Read` scope for the access token as the article shows in its example `wwwroot/appsettings.json` file.

Add the following custom user account factory to the **CLIENT** app. The custom user factory is used to establish:

* App Role claims (`appRole`) (covered in the App Roles section).
* ME-ID Administrator Role claims (`directoryRole`).
* Example user profile data claims for the user's mobile phone number (`mobilePhone`) and office location (`officeLocation`).
* ME-ID Group claims (`directoryGroup`).
* An `Microsoft.Extensions.Logging.ILogger` (`logger`) for convenience in case you wish to log information or errors.

`CustomAccountFactory.cs`:

**graph-sdk-5:**

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;
using Microsoft.Graph;
using Microsoft.Kiota.Abstractions.Authentication;

namespace BlazorSample;

public class CustomAccountFactory() 
    : AccountClaimsPrincipalFactory<CustomUserAccount>
{
    private readonly ILogger<CustomAccountFactory> logger;
    private readonly IServiceProvider serviceProvider;
    private readonly string? baseUrl =
        string.Join("/",
            config.GetSection("MicrosoftGraph")["BaseUrl"] ??
                "https://graph.microsoft.com",
            config.GetSection("MicrosoftGraph")["Version"] ??
                "v1.0");

    public CustomAccountFactory(IAccessTokenProviderAccessor accessor,
        IServiceProvider serviceProvider,
        ILogger<CustomAccountFactory> logger)
        : base(accessor)
    {
        this.serviceProvider = serviceProvider;
        this.logger = logger;
    }

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        CustomUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null &&
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null && !string.IsNullOrEmpty(baseUrl))
            {
                account?.Roles?.ForEach((role) =>
                {
                    userIdentity.AddClaim(new Claim("appRole", role));
                });

                account?.Wids?.ForEach((wid) =>
                {
                    userIdentity.AddClaim(new Claim("directoryRole", wid));
                });

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

                    var requestMemberOf = client.Users[account?.Oid].MemberOf;
                    var graphGroups = await requestMemberOf.GraphGroup.GetAsync();

                    if (graphGroups?.Value is not null)
                    {
                        foreach (var entry in graphGroups.Value)
                        {
                            if (entry.Id is not null)
                            {
                                userIdentity.AddClaim(
                                    new Claim("directoryGroup", entry.Id));
                            }
                        }
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

**graph-sdk-4:**

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using Microsoft.AspNetCore.Components.WebAssembly.Authentication.Internal;
using Microsoft.Graph;

namespace BlazorSample;

public class CustomAccountFactory() 
    : AccountClaimsPrincipalFactory<CustomUserAccount>(accessor)
{
    private readonly ILogger<CustomAccountFactory> logger;
    private readonly IServiceProvider serviceProvider;

    public CustomAccountFactory(IAccessTokenProviderAccessor accessor,
        IServiceProvider serviceProvider,
        ILogger<CustomAccountFactory> logger)
        : base(accessor)
    {
        this.serviceProvider = serviceProvider;
        this.logger = logger;
    }

    public override async ValueTask<ClaimsPrincipal> CreateUserAsync(
        CustomUserAccount account,
        RemoteAuthenticationUserOptions options)
    {
        var initialUser = await base.CreateUserAsync(account, options);

        if (initialUser.Identity is not null &&
            initialUser.Identity.IsAuthenticated)
        {
            var userIdentity = initialUser.Identity as ClaimsIdentity;

            if (userIdentity is not null)
            {
                account?.Roles?.ForEach((role) =>
                {
                    userIdentity.AddClaim(new Claim("appRole", role));
                });

                account?.Wids?.ForEach((wid) =>
                {
                    userIdentity.AddClaim(new Claim("directoryRole", wid));
                });

                try
                {
                    var client = ActivatorUtilities
                        .CreateInstance<GraphServiceClient>(serviceProvider);
                    var request = client.Me.Request();
                    var user = await request.GetAsync();

                    if (user is not null)
                    {
                        userIdentity.AddClaim(new Claim("mobilephone",
                            user.MobilePhone ?? "(000) 000-0000"));
                        userIdentity.AddClaim(new Claim("officelocation",
                            user.OfficeLocation ?? "Not set"));
                    }

                    var requestMemberOf = client.Users[account?.Oid].MemberOf;
                    var memberships = await requestMemberOf.Request().GetAsync();

                    if (memberships is not null)
                    {
                        foreach (var entry in memberships)
                        {
                            if (entry.ODataType == "#microsoft.graph.group")
                            {
                                userIdentity.AddClaim(
                                    new Claim("directoryGroup", entry.Id));
                            }
                        }
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

The preceding code doesn't include transitive memberships. If the app requires direct and transitive group membership claims, replace the `MemberOf` property (`IUserMemberOfCollectionWithReferencesRequestBuilder`) with `TransitiveMemberOf` (`IUserTransitiveMemberOfCollectionWithReferencesRequestBuilder`).

**graph-sdk-4:**

The preceding code ignores group membership claims (`groups`) that are ME-ID Administrator Roles (`#microsoft.graph.directoryRole` type) because the GUID values returned by ME-ID are Administrator Role **entity IDs** and not role **Template IDs**. Entity IDs aren't stable across tenants and shouldn't be used to create authorization policies for users in apps. Always use **Template IDs** for ME-ID Administrator Roles provided by `wids` claims.

The `wids` claim (and thus `directoryRole` claim) with a value of `b79fbf4d-3ef9-4689-8143-76b194e85509` exists for non-guest accounts of the tenant. It doesn't refer to an ME-ID Administrator Role Template ID.

In the **CLIENT** app, configure the MSAL authentication to use the custom user account factory.

Confirm that the `Program` file uses the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` namespace:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
```

Update the `Microsoft.Extensions.DependencyInjection.MsalWebAssemblyServiceCollectionExtensions.AddMsalAuthentication*` call to the following. Note that the Blazor framework's `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` is replaced by the app's `CustomUserAccount` for the MSAL authentication and account claims principal factory:

```csharp
builder.Services.AddMsalAuthentication<RemoteAuthenticationState,
    CustomUserAccount>(options =>
    {
        builder.Configuration.Bind("AzureAd",
            options.ProviderOptions.Authentication);
    })
    .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, CustomUserAccount,
        CustomAccountFactory>();
```

**graph-sdk-5:**

Confirm the presence of the *Graph SDK* code described by the Use Graph API with ASP.NET Core Blazor WebAssembly article and that the `wwwroot/appsettings.json` configuration is correct per the *Graph SDK* guidance:

```csharp
var baseUrl = 
    string.Join("/",
        builder.Configuration.GetSection("MicrosoftGraph")["BaseUrl"] ??
            "https://graph.microsoft.com",
        builder.Configuration.GetSection("MicrosoftGraph")["Version"] ??
            "v1.0");
var scopes = builder.Configuration.GetSection("MicrosoftGraph:Scopes")
    .Get<List<string>>() ?? [ "user.read" ];

builder.Services.AddGraphClient(baseUrl, scopes);
```

`wwwroot/appsettings.json`:

```json
{
  "MicrosoftGraph": {
    "BaseUrl": "https://graph.microsoft.com",
    "Version": "v1.0",
    "Scopes": [
      "user.read"
    ]
  }
}
```

## Authorization configuration

In the **CLIENT** app, create a policy for each App Role, ME-ID Administrator Role, or security group in the `Program` file. The following example creates a policy for the ME-ID built-in *Billing Administrator* role:

```csharp
builder.Services.AddAuthorizationCore(options =>
{
    options.AddPolicy("BillingAdministrator", policy => 
        policy.RequireClaim("directoryRole", 
            "b0f54661-2d74-4c50-afa3-1ec803f12efe"));
});
```

For the complete list of IDs for ME-ID Administrator Roles, see Role template IDs in the Entra documentation. For more information on authorization policies, see Policy-based authorization in ASP.NET Core.

In the following examples, the **CLIENT** app uses the preceding policy to authorize the user.

The `AuthorizeView` component works with the policy:

```razor
<AuthorizeView Policy="BillingAdministrator">
    <Authorized>
        <p>
            The user is in the 'Billing Administrator' ME-ID Administrator Role
            and can see this content.
        </p>
    </Authorized>
    <NotAuthorized>
        <p>
            The user is NOT in the 'Billing Administrator' role and sees this
            content.
        </p>
    </NotAuthorized>
</AuthorizeView>
```

Access to an entire component can be based on the policy using an `[Authorize]` attribute directive (`Microsoft.AspNetCore.Authorization.AuthorizeAttribute`):

```razor
@page "/"
@using Microsoft.AspNetCore.Authorization
@attribute [Authorize(Policy = "BillingAdministrator")]
```

If the user isn't authorized, they're redirected to the ME-ID sign-in page.

A policy check can also be performed in code with procedural logic.

`CheckPolicy.razor`:

```razor
@page "/checkpolicy"
@using Microsoft.AspNetCore.Authorization
@inject IAuthorizationService AuthorizationService

<h1>Check Policy</h1>

<p>This component checks a policy in code.</p>

<button @onclick="CheckPolicy">Check 'BillingAdministrator' policy</button>

<p>Policy Message: @policyMessage</p>

@code {
    private string policyMessage = "Check hasn't been made yet.";

    [CascadingParameter]
    private Task<AuthenticationState> authenticationStateTask { get; set; }

    private async Task CheckPolicy()
    {
        var user = (await authenticationStateTask).User;

        if ((await AuthorizationService.AuthorizeAsync(user, 
            "BillingAdministrator")).Succeeded)
        {
            policyMessage = "Yes! The 'BillingAdministrator' policy is met.";
        }
        else
        {
            policyMessage = "No! 'BillingAdministrator' policy is NOT met.";
        }
    }
}
```

Using the preceding approaches, you can also create policy-based access for app roles, where the GUID used for the policy is set in the `appRoles` element of the app's manifest in the Azure portal, and security groups, where the GUID used for the policy matches the group **Object Id** in the Azure portal **Groups** pane.
