---
title: "ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (.NET 5 to .NET 7) (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/microsoft-entra-id-groups-and-roles-net-5-to-7.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (.NET 5 to .NET 7) (part 3 of 3)

## Authorize server API/web API access

A **SERVER** API app can authorize users to access secure API endpoints with authorization policies for security groups, ME-ID Administrator Roles, and App Roles when an access token <example-value> `groups`, `wids`, and `role` claims. The following example creates a policy for the ME-ID *Billing Administrator* role in the `Program` file using the `wids` (well-known IDs/Role Template IDs) claims:

```csharp
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("BillingAdministrator", policy => 
        policy.RequireClaim("wids", "b0f54661-2d74-4c50-afa3-1ec803f12efe"));
});
```

For the complete list of IDs for ME-ID Administrator Roles, see Role template IDs in the Azure documentation. For more information on authorization policies, see Policy-based authorization in ASP.NET Core.

Access to a controller in the **SERVER** app can be based on using an `[Authorize]` attribute with the name of the policy (API documentation: `Microsoft.AspNetCore.Authorization.AuthorizeAttribute`).

The following example limits access to billing data from the `BillingDataController` to Azure Billing Administrators with a policy name of `BillingAdministrator`:

```csharp
using Microsoft.AspNetCore.Authorization;
```

```csharp
[Authorize(Policy = "BillingAdministrator")]
[ApiController]
[Route("[controller]")]
public class BillingDataController : ControllerBase
{
    ...
}
```

For more information, see Policy-based authorization in ASP.NET Core.

## App Roles

To configure the app in the Azure portal to provide App Roles membership claims, see Add app roles to your application and receive them in the token in the Entra documentation.

The following example assumes that the **CLIENT** and **SERVER** apps are configured with two roles, and the roles are assigned to a test user:

* `Admin`
* `Developer`

> **Note:**
> When developing a hosted Blazor WebAssembly app or a client-server pair of standalone apps (a standalone Blazor WebAssembly app and an ASP.NET Core server API/web API app), the `appRoles` manifest property of both the client and the server Azure portal app registrations must include the same configured roles. After establishing the roles in the client app'<example-value>'s manifest. If you don'<example-value>'t established for authenticated users of the server API/web API, even if their access token has the correct entries in the role claims.

Although you can't assign roles to groups without a Microsoft Entra ID Premium account, you can assign roles to users and receive role claims for users with a standard Azure account. The guidance in this section doesn't require an ME-ID Premium account.

When working with the default directory, follow the guidance in Add app roles to your application and receive them in the token to configure and assign roles. If you aren'<example-value>'s manifest in the Azure portal to establish the app'<example-value>'s example at the component level to implement access restrictions:

```json
"appRoles": [
  {
    "allowedMemberTypes": [
      "User"
    ],
    "description": "Administrators manage developers.",
    "displayName": "Admin",
    "id": "{ADMIN GUID}",
    "isEnabled": true,
    "lang": null,
    "origin": "Application",
    "value": "Admin"
  },
  {
    "allowedMemberTypes": [
      "User"
    ],
    "description": "Developers write code.",
    "displayName": "Developer",
    "id": "{DEVELOPER GUID}",
    "isEnabled": true,
    "lang": null,
    "origin": "Application",
    "value": "Developer"
  }
],
```

For the `{ADMIN GUID}` and `{DEVELOPER GUID}` placeholders in the preceding example, you can generate GUIDs with an online GUID generator (Google search result for "guid generator").

To assign a role to a user (or group if you have a Premium tier Azure account):

1. Navigate to **Enterprise applications** in the ME-ID area of the Azure portal.
1. Select the app. Select **Manage** > **Users and groups** from the sidebar.
1. Select the checkbox for one or more user accounts.
1. From the menu above the list of users, select **Edit assignment**.
1. For the **Select a role** entry, select **None selected**.
1. Choose a role from the list and use the **Select** button to select it.
1. Use the **Assign** button at the bottom of the screen to assign the role.

Multiple roles are assigned in the Azure portal by ***re-adding a user*** for each additional role assignment. Use the **Add user/group** button at the top of the list of users to re-add a user. Use the preceding steps to assign another role to the user. You can repeat this process as many times as needed to add additional roles to a user (or group).

The `CustomAccountFactory` shown in the Custom user account section is set up to act on a `role` claim with a JSON array value. Add and register the `CustomAccountFactory` in the **CLIENT** app as shown in the Custom user account section. There's no need to provide code to remove the original `role` claim because it's automatically removed by the framework.

In the `Program` file of a **CLIENT** app, specify the claim named "`appRole`" as the role claim for `System.Security.Claims.ClaimsPrincipal.IsInRole*` checks:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...

    options.UserOptions.RoleClaim = "appRole";
});
```

> **Note:**
> If you prefer to use the `directoryRoles` claim (ADD Administrator Roles), assign "`directoryRoles`" to the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationUserOptions.RoleClaim`.

In the `Program` file of a **SERVER** app, specify the claim named "`http://schemas.microsoft.com/ws/2008/06/identity/claims/role`" as the role claim for `System.Security.Claims.ClaimsPrincipal.IsInRole*` checks:

```csharp
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApi(options =>
    {
        Configuration.Bind("AzureAd", options);
        options.TokenValidationParameters.RoleClaimType = 
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    },
    options => { Configuration.Bind("AzureAd", options); });
```

> **Note:**
> When a single authentication scheme is registered, the authentication scheme is automatically used as the app's default scheme, and it isn't necessary to state the scheme to `Microsoft.Extensions.DependencyInjection.AuthenticationServiceCollectionExtensions.AddAuthentication*` or via `Microsoft.AspNetCore.Authentication.AuthenticationOptions`. For more information, see Overview of ASP.NET Core Authentication and the ASP.NET Core announcement (aspnet/Announcements #490).

> **Note:**
> If you prefer to use the `wids` claim (ADD Administrator Roles), assign "<example-value>" to the `Microsoft.IdentityModel.Tokens.TokenValidationParameters.RoleClaimType`.

After you've completed the preceding steps to create and assign roles to users (or groups if you have a Premium tier Azure account) and implemented the `CustomAccountFactory` with the Graph SDK, as explained earlier in this article and in Use Graph API with ASP.NET Core Blazor WebAssembly, you should see an `appRole` claim for each assigned role that a signed-in user is assigned (or roles assigned to groups that they are members of). Run the app with a test user to confirm the claims are present as expected. When testing with the Graph SDK locally, we recommend using a new in-private/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

Component authorization approaches are functional at this point. Any of the authorization mechanisms in components of the **CLIENT** app can use the `Admin` role to authorize the user:

* `AuthorizeView` component

  ```razor
  <AuthorizeView Roles="Admin">
  ```

* `[Authorize]` attribute directive (`Microsoft.AspNetCore.Authorization.AuthorizeAttribute`)

  ```razor
  @attribute [Authorize(Roles = "Admin")]
  ```

* Procedural logic

  ```csharp
  var authState = await AuthenticationStateProvider.GetAuthenticationStateAsync();
  var user = authState.User;

  if (user.IsInRole("Admin")) { ... }
  ```

Multiple role tests are supported:

* Require that the user be in **either** the `Admin` **or** `Developer` role with the `AuthorizeView` component:

  ```razor
  <AuthorizeView Roles="Admin, Developer">
      ...
  </AuthorizeView>
  ```

* Require that the user be in **both** the `Admin` **and** `Developer` roles with the `AuthorizeView` component:

  ```razor
  <AuthorizeView Roles="Admin">
      <AuthorizeView Roles="Developer" Context="innerContext">
          ...
      </AuthorizeView>
  </AuthorizeView>
  ```

  For more information on the `Context` for the inner `Microsoft.AspNetCore.Components.Authorization.AuthorizeView`, see ASP.NET Core Blazor authentication and authorization.

* Require that the user be in **either** the `Admin` **or** `Developer` role with the `[Authorize]` attribute:

  ```razor
  @attribute [Authorize(Roles = "Admin, Developer")]
  ```

* Require that the user be in **both** the `Admin` **and** `Developer` roles with the `[Authorize]` attribute:

  ```razor
  @attribute [Authorize(Roles = "Admin")]
  @attribute [Authorize(Roles = "Developer")]
  ```

* Require that the user be in **either** the `Admin` **or** `Developer` role with procedural code:

  ```razor
  @code {
      private async Task DoSomething()
      {
          var authState = await AuthenticationStateProvider
              .GetAuthenticationStateAsync();
          var user = authState.User;

          if (user.IsInRole("Admin") || user.IsInRole("Developer"))
          {
              ...
          }
          else
          {
              ...
          }
      }
  }
  ```

* Require that the user be in **both** the `Admin` **and** `Developer` roles with procedural code by changing the conditional OR (`||`) to a conditional AND (`&&`) in the preceding example:

  ```csharp
  if (user.IsInRole("Admin") && user.IsInRole("Developer"))
  ```

Any of the authorization mechanisms in controllers of the **SERVER** app can use the `Admin` role to authorize the user:

* `[Authorize]` attribute directive (`Microsoft.AspNetCore.Authorization.AuthorizeAttribute`)

  ```csharp
  [Authorize(Roles = "Admin")]
  ```

* Procedural logic

  ```csharp
  if (User.IsInRole("Admin")) { ... }
  ```

Multiple role tests are supported:

* Require that the user be in **either** the `Admin` **or** `Developer` role with the `[Authorize]` attribute:

  ```csharp
  [Authorize(Roles = "Admin, Developer")]
  ```

* Require that the user be in **both** the `Admin` **and** `Developer` roles with the `[Authorize]` attribute:

  ```csharp
  [Authorize(Roles = "Admin")]
  [Authorize(Roles = "Developer")]
  ```

* Require that the user be in **either** the `Admin` **or** `Developer` role with procedural code:

  ```csharp
  static readonly string[] scopeRequiredByApi = new string[] { "API.Access" };

  ...

  [HttpGet]
  public IEnumerable<ReturnType> Get()
  {
      HttpContext.VerifyUserHasAnyAcceptedScope(scopeRequiredByApi);

      if (User.IsInRole("Admin") || User.IsInRole("Developer"))
      {
          ...
      }
      else
      {
          ...
      }

      return ...
  }
  ```

* Require that the user be in **both** the `Admin` **and** `Developer` roles with procedural code by changing the conditional OR (`||`) to a conditional AND (`&&`) in the preceding example:

  ```csharp
  if (User.IsInRole("Admin") && User.IsInRole("Developer"))
  ```

Role matching is typically case-sensitive because role names are stored and compared using .NET string comparisons. For example, `Admin` (uppercase `A`) isn't treated as the same role as `admin` (lowercase `a`). For more information, see Claim-based authorization in ASP.NET Core. By contrast, ASP.NET Core policy name lookup is typically case-insensitive, so `RequireAdministratorRole` and `requireadministratorrole` refer to the same policy.

## Related content

* Role template IDs (Entra documentation)
* `groupMembershipClaims` attribute (Entra documentation)
* Add app roles to your application and receive them in the token (Entra documentation)
* Application roles (Azure documentation)
* Claim-based authorization in ASP.NET Core
* Role-based authorization in ASP.NET Core
* ASP.NET Core Blazor authentication and authorization
