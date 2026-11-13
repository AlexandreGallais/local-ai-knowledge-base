---
title: "ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/microsoft-entra-id-groups-and-roles.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Microsoft Entra (ME-ID) groups, Administrator Roles, and App Roles

-->
-->

This article explains how to configure Blazor WebAssembly to use Microsoft Entra ID (ME-ID) groups and roles.

ME-ID provides several authorization approaches that can be combined with ASP.NET Core Identity:

* Groups
  * Security
  * Microsoft 365
  * Distribution
* Roles
  * ME-ID built-in Administrator Roles
  * App Roles

The guidance in this article applies to the Blazor WebAssembly ME-ID deployment scenarios described in the following articles:

* Standalone with Microsoft Accounts
* Standalone with ME-ID

The examples in this article take advantage of new .NET/C# features. When using the examples with .NET 7 or earlier, minor modifications are required. However, the text and code examples that pertain to interacting with ME-ID and Microsoft Graph are the same for all versions of ASP.NET Core.

## Sample app

Access the sample app, named `BlazorWebAssemblyEntraGroupsAndRoles`, through the latest version folder from the repository's root with the following link. The sample is provided for .NET 8 or later. See the sample app's `README` file for steps on how to run the app.

The sample app includes a `UserClaims` component for displaying a user's claims. The `UserData` component displays the user's basic account properties.

View or download sample code (how to download)

## Prerequisite

The guidance in this article implements the Microsoft Graph API per the *Graph SDK* guidance in Use Graph API with ASP.NET Core Blazor WebAssembly. Follow the *Graph SDK* implementation guidance to configure the app and test it to confirm that the app can obtain Graph API data for a test user account. Additionally, see the Graph API article's security article cross-links to review Microsoft Graph security concepts.

When testing with the Graph SDK locally, we recommend using a new in-private/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

## ME-ID app registration online tools

This article refers to the Azure portal throughout when prompting you to configure the app's ME-ID app registration, but the Microsoft Entra Admin Center is also a viable option for managing ME-ID app registrations. Either interface can be used, but the guidance in this article specifically covers gestures for the Azure portal.

## Scopes

*Permissions* and *scopes* mean the same thing and are used interchangeably in security documentation and the Azure portal. Unless the text is referring to the Azure portal, this article uses *scope*/*scopes* when referring to Graph permissions.

Scopes are case insensitive, so `User.Read` is the same as `user.read`. Feel free to use either format, but we recommend a consistent choice across application code.

To permit Microsoft Graph API calls for user profile, role assignment, and group membership data, the app is configured with the ***delegated*** `User.Read` scope (`https://graph.microsoft.com/User.Read`) in the Azure portal because access to read user data is determined by the scopes granted (delegated) to individual users. This scope is required in addition to the scopes required in ME-ID deployment scenarios described by the articles listed earlier (*Standalone with Microsoft Accounts* or *Standalone with ME-ID*).

Additional required scopes include:

* ***Delegated*** `RoleManagement.Read.Directory` scope (`https://graph.microsoft.com/RoleManagement.Read.Directory`): Allows the app to read the role-based access control (RBAC) settings for your company's directory, on behalf of the signed-in user. This includes reading directory role templates, directory roles, and memberships. Directory role memberships are used to create `directoryRole` claims in the app for ME-ID built-in Administrator Roles. Admin consent is required.
* ***Delegated*** `AdministrativeUnit.Read.All` scope (`https://graph.microsoft.com/AdministrativeUnit.Read.All`): Allows the app to read administrative units and administrative unit membership on behalf of the signed-in user. These memberships are used to create `administrativeUnit` claims in the app. Admin consent is required.

For more information, see Overview of permissions and consent in the Microsoft identity platform and Overview of Microsoft Graph permissions.

## Custom user account

Assign users to ME-ID security groups and ME-ID Administrator Roles in the Azure portal.

The examples in this article:

* Assume that a user is assigned to the ME-ID *Billing Administrator* role in the Azure portal ME-ID tenant for authorization to access server API data.
* Use authorization policies to control access within the app.

Extend `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteUserAccount` to include properties for:

* `Roles`: ME-ID App Roles array (covered in the App Roles section)
* `Oid`: Immutable object identifier claim (`oid`) (uniquely identifies a user within and across tenants)

`CustomUserAccount.cs`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorWebAssemblyEntraGroupsAndRoles/CustomUserAccount.cs._
Add a package reference to app for `Microsoft.Graph`.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

Add the Graph SDK utility classes and configuration in the *Graph SDK* guidance of the Use Graph API with ASP.NET Core Blazor WebAssembly article. Specify the `User.Read`, `RoleManagement.Read.Directory`, and `AdministrativeUnit.Read.All` scopes for the access token as the article shows in its example `wwwroot/appsettings.json` file.

Add the following custom user account factory to the app. The custom user factory is used to establish:

* App Role claims (`role`) (covered in the App Roles section).

* Example user profile data claims for the user's mobile phone number (`mobilePhone`) and office location (`officeLocation`).
* ME-ID Administrator Role claims (`directoryRole`).
* ME-ID Administrative Unit claims (`administrativeUnit`).
* ME-ID Group claims (`directoryGroup`).
* An `Microsoft.Extensions.Logging.ILogger` (`logger`) for convenience in case you wish to log information or errors.

`CustomAccountFactory.cs`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorWebAssemblyEntraGroupsAndRoles/CustomAccountFactory.cs._
The preceding code:

* Doesn't include transitive memberships. If the app requires direct and transitive group membership claims, replace the `MemberOf` property (`IUserMemberOfCollectionWithReferencesRequestBuilder`) with `TransitiveMemberOf` (`IUserTransitiveMemberOfCollectionWithReferencesRequestBuilder`).
* Sets GUID values in `directoryRole` claims are ME-ID Administrator Role *Template IDs* (`Microsoft.Graph.Models.DirectoryRole.RoleTemplateId`). Template IDs are stable identifiers for creating user authorization policies in apps, which is covered later in this article. Don't use `entry.Id` for directory role claim values, as they aren't stable across tenants.

Next, configure the MSAL authentication to use the custom user account factory.

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
        options.UserOptions.RoleClaim = "role";
    })
    .AddAccountClaimsPrincipalFactory<RemoteAuthenticationState, CustomUserAccount,
        CustomAccountFactory>();
```

Confirm the presence of the *Graph SDK* code in the `Program` file described by the Use Graph API with ASP.NET Core Blazor WebAssembly article:

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

> **Important:**
> Confirm in the app's registration in the Azure portal that the following permissions are granted:
>
> * `User.Read`
> * `RoleManagement.Read.Directory` (Requires admin consent)
> * `AdministrativeUnit.Read.All` (Requires admin consent)

Confirm that the `wwwroot/appsettings.json` configuration is correct per the *Graph SDK* guidance.

`wwwroot/appsettings.json`:

_Code sample not included: ~/../blazor-samples/8.0/BlazorWebAssemblyEntraGroupsAndRoles/wwwroot/appsettings.json._
Provide values for the following placeholders from the app's ME-ID registration in the Azure portal:

* `{TENANT ID}`: The Directory (Tenant) Id GUID value.
* `{CLIENT ID}`: The Application (Client) Id GUID value.

## Authorization configuration

Create a policy for each App Role (by role name), ME-ID built-in Administrator Role (by Role Template Id/GUID), or security group (by Object Id/GUID) in the `Program` file. The following example creates a policy for the ME-ID built-in *Billing Administrator* role:

```csharp
builder.Services.AddAuthorizationCore(options =>
{
    options.AddPolicy("BillingAdministrator", policy => 
        policy.RequireClaim("directoryRole", 
            "b0f54661-2d74-4c50-afa3-1ec803f12efe"));
});
```

For the complete list of IDs (GUIDs) for ME-ID Administrator Roles, see Role template IDs in the ME-ID documentation. For an Azure security or O365 group ID (GUID), see the **Object Id** for the group in the Azure portal **Groups** pane of the app's registration. For more information on authorization policies, see Policy-based authorization in ASP.NET Core.

In the following examples, the app uses the preceding policy to authorize the user.

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

Using the preceding approaches, you can also create policy-based access for security groups, where the GUID used for the policy matches the
