---
title: "ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/microsoft-entra-id-groups-and-roles.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (part 2 of 2)

## App Roles

To configure the app in the Azure portal to provide App Roles membership claims, see Add app roles to your application and receive them in the token in the ME-ID documentation.

The following example assumes that the app is configured with two roles, and the roles are assigned to a test user:

* `Admin`
* `Developer`

Although you can't assign roles to groups without an ME-ID Premium account, you can assign roles to users and receive role claims for users with a standard Azure account. The guidance in this section doesn't require an ME-ID Premium account.

Take either of the following approaches add app roles in ME-ID:

* When working with the ***default directory***, follow the guidance in Add app roles to your application and receive them in the token to create ME-ID roles.

* If you ***aren't working with the default directory***, edit the app's manifest in the Azure portal to establish the app's roles manually in the `appRoles` entry of the manifest file. The following is an example `appRoles` entry that creates `Admin` and `Developer` roles. These example roles are used later at the component level to implement access restrictions:

  > **Important:**
  > The following approach is only recommended for apps that aren't registered in the Azure account's default directory. For apps registered in the default directory, see the preceding bullet of this list.

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

The `CustomAccountFactory` shown in the Custom user account section is set up to act on a `role` claim with a JSON array value. Add and register the `CustomAccountFactory` in the app as shown in the Custom user account section. There's no need to provide code to remove the original `role` claim because it's automatically removed by the framework.

In the `Program` file, add or confirm the claim named "`role`" as the role claim for `System.Security.Claims.ClaimsPrincipal.IsInRole*` checks:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...

    options.UserOptions.RoleClaim = "role";
});
```

> **Note:**
> If you prefer to use the `directoryRoles` claim (ME-ID Administrator Roles), assign "`directoryRoles`" to the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationUserOptions.RoleClaim`.

After you've completed the preceding steps to create and assign roles to users (or groups if you have a Premium tier Azure account) and implemented the `CustomAccountFactory` with the Graph SDK, as explained earlier in this article and in Use Graph API with ASP.NET Core Blazor WebAssembly, you should see an `role` claim for each assigned role that a signed-in user is assigned (or roles assigned to groups that they are members of). Run the app with a test user to confirm the claims are present as expected. When testing with the Graph SDK locally, we recommend using a new in-private/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

Component authorization approaches are functional at this point. Any of the authorization mechanisms in components of the app can use the `Admin` role to authorize the user:

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

* Role template IDs (ME-ID documentation)
* `groupMembershipClaims` attribute (ME-ID documentation)
* Add app roles to your application and receive them in the token (ME-ID documentation)
* Application roles (Azure documentation)
* Claim-based authorization in ASP.NET Core
* Role-based authorization in ASP.NET Core
* ASP.NET Core Blazor authentication and authorization
