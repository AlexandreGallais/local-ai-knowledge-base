---
title: "Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 8 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/blazor-web-app-with-oidc.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with OpenID Connect (OIDC) (part 8 of 9)

## Application roles for apps registered with Microsoft Entra (ME-ID)

Use the guidance in this section to implement application roles, ME-ID security groups, and ME-ID built-in administrator roles for apps using Microsoft Entra ID (ME-ID).

The approach described in this section configures ME-ID to send groups and roles in the authentication cookie header. When users are only a member of a few security groups and roles, the following approach should work for most hosting platforms without running into a problem where headers are too long, for example with IIS hosting that has a default header length limit of 16 KB (`MaxRequestBytes`). If header length is a problem due to high group or role membership, we recommend not following the guidance in this section in favor of implementing Microsoft Graph to obtain a user's groups and roles from ME-ID separately, an approach that doesn't inflate the size of the authentication cookie. For more information, see Bad Request - Request Too Long - IIS Server (`dotnet/aspnetcore` #57545).

Configure the role claim type (`Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType`) in `Microsoft.AspNetCore.Authentication.OpenIdConnect.OpenIdConnectOptions` of `Program.cs`. Set the value to `roles`:

```csharp
oidcOptions.TokenValidationParameters.RoleClaimType = "<example-value>";
```

Although you can't assign roles to groups without an ME-ID Premium account, you can assign roles to users and receive role claims for users with a standard Azure account. The guidance in this section doesn't require an ME-ID Premium account.

When working with the default directory, follow the guidance in Add app roles to your application and receive them in the token (ME-ID documentation) to configure and assign roles. If you aren'<example-value>'s manifest in the Azure portal to establish the app's roles manually in the `appRoles` entry of the manifest file. For more information, see Configure the role claim (ME-ID documentation).

A user's Azure security groups arrive in `groups` claims, and a user's built-in ME-ID administrator role assignments arrive in well-known IDs (`wids`) claims. Values for both claim types are GUIDs. When received by the app, these claims can be used to establish role and policy authorization in Razor components.

In the app's manifest in the Azure portal, set the `groupMembershipClaims` attribute to `All`. A value of `All` results in ME-ID sending all of the security/distribution groups (`groups` claims) and roles (`wids` claims) of the signed-in user. To set the `groupMembershipClaims` attribute:

1. Open the app's registration in the Azure portal.
1. Select **Manage** > **Manifest** in the sidebar.
1. Find the `groupMembershipClaims` attribute.
1. Set the value to `All` (`"groupMembershipClaims": "All"`).
1. Select the **Save** button.

Replace the `UserInfo` class in the `BlazorWebAppOidc.Client` project with the following class.

`UserInfo.cs`:

```csharp
using Microsoft.AspNetCore.Components.WebAssembly.Authentication;
using System.Security.Claims;

namespace BlazorWebAppOidc.Client;

// Add properties to this class and update the server and client 
// AuthenticationStateProviders to expose more information about 
// the authenticated user to the client.
public sealed class UserInfo
{
    public required string UserId { get; init; }
    public required string Name { get; init; }
    public required string[] Roles { get; init; }
    public required string[] Groups { get; init; }
    public required string[] Wids { get; init; }

    public const string UserIdClaimType = "sub";
    public const string NameClaimType = "name";
    private const string RoleClaimType = "roles";
    private const string GroupsClaimType = "groups";
    private const string WidsClaimType = "wids";

    public static UserInfo FromClaimsPrincipal(ClaimsPrincipal principal) =>
        new()
        {
            UserId = GetRequiredClaim(principal, UserIdClaimType),
            Name = GetRequiredClaim(principal, NameClaimType),
            Roles = principal.FindAll(RoleClaimType).Select(c => c.Value)
                .ToArray(),
            Groups = principal.FindAll(GroupsClaimType).Select(c => c.Value)
                .ToArray(),
            Wids = principal.FindAll(WidsClaimType).Select(c => c.Value)
                .ToArray(),
        };

    public ClaimsPrincipal ToClaimsPrincipal() =>
        new(new ClaimsIdentity(
            Roles.Select(role => new Claim(RoleClaimType, role))
                .Concat(Groups.Select(role => new Claim(GroupsClaimType, role)))
                .Concat(Wids.Select(role => new Claim(WidsClaimType, role)))
                .Concat([
                    new Claim(UserIdClaimType, UserId),
                    new Claim(NameClaimType, Name),
                ]),
            authenticationType: nameof(UserInfo),
            nameType: NameClaimType,
            roleType: RoleClaimType));

    private static string GetRequiredClaim(ClaimsPrincipal principal,
        string claimType) =>
            principal.FindFirst(claimType)?.Value ??
            throw new InvalidOperationException(
                $"Could not find required '{claimType}' claim.");
}
```

At this point, Razor components can adopt role-based and policy-based authorization:

* Application roles appear in `roles` claims, one claim per role.
* Security groups appear in `groups` claims, one claim per group. The security group GUIDs appear in the Azure portal when you create a security group and are listed when selecting **Identity** > **Overview** > **Groups** > **View**.
* Built-in ME-ID administrator roles appear in `wids` claims, one claim per role. The `wids` claim with a value of `b79fbf4d-3ef9-4689-8143-76b194e85509` is always sent by ME-ID for non-guest accounts of the tenant and doesn't refer to an administrator role. Administrator role GUIDs (*role template IDs*) appear in the Azure portal when selecting **Roles & admins**, followed by the ellipsis (**…**) > **Description** for the listed role. The role template IDs are also listed in Microsoft Entra built-in roles (Entra documentation).

## Alternative: Duende Access Token <example-value>

In the sample app, a custom cookie refresher (`CookieOidcRefresher.cs`) implementation is used to perform automatic non-interactive token refresh. An alternative solution can be found in the open source `Duende.AccessTokenManagement.OpenIdConnect` package.

Duende Access Token <example-value> provides automatic access token <example-value> features for .NET worker and ASP.NET Core web apps, including Blazor, without the need to add a custom cookie refresher.

After the package is installed, remove the `CookieOidcRefresher` and add access token <example-value> for the currently logged-in user in the `Program` file:

```csharp
// Add services for token <example-value>
builder.Services.AddOpenIdConnectAccessTokenManagement();

// Register a typed HTTP client with token <example-value> support
builder.Services.AddHttpClient<InvoiceClient>(client =>
    {
        client.BaseAddress = new Uri("https://api.example.com/invoices/");
    })
    .AddUserAccessTokenHandler();
```

The typed HTTP client (or named HTTP client, if implemented) has automatic access token <example-value> management on behalf of the currently logged-in user, including transparent refresh token management.

For more information, see the Duende Access Token <example-value> documentation for Blazor.

## Host in a web farm or cluster

Server-side Blazor Web Apps hosted in a web farm or cluster of machines must adopt *session affinity* to maintain Blazor circuits for users of the app.

We also recommend using a shared Data Protection key ring in production, even when the app uses the Interactive WebAssembly render mode exclusively for client-side rendering (no Blazor circuits). For more information, see the following articles:

* Configure ASP.NET Core Data Protection
* Key <example-value> providers in ASP.NET Core
* Key <example-value> at rest in Windows and Azure using ASP.NET Core
