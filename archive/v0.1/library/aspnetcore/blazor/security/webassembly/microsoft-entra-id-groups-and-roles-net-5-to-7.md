---
title: "ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles (.NET 5 to .NET 7) (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/microsoft-entra-id-groups-and-roles-net-5-to-7.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Microsoft Entra (ME-ID) groups, Administrator Roles, and App Roles (.NET 5 to .NET 7)

> **Important:**
> This isn't the latest version of this article. For the current ASP.NET Core release, see the latest version of ASP.NET Core Blazor WebAssembly with Microsoft Entra ID groups and roles.

> **Important:**
> The Hosted Blazor WebAssembly project template was removed from the framework with the release of .NET 8 (November, 2023). The guidance in this article is only supported for .NET 7 or earlier. Hosted Blazor WebAssembly apps that are upgraded each release continue to receive product support. Alternatively, refactor the app into either a standalone Blazor WebAssembly app or a Blazor Web App.

This article explains how to configure Blazor WebAssembly to use Microsoft Entra ID groups and roles.

Microsoft Entra (ME-ID) provides several authorization approaches that can be combined with ASP.NET Core Identity:

* Groups
  * Security
  * Microsoft 365
  * Distribution
* Roles
  * ME-ID Administrator Roles
  * App Roles

The guidance in this article applies to the Blazor WebAssembly ME-ID deployment scenarios described in the following articles:

* Standalone with Microsoft Accounts
* Standalone with ME-ID
* Hosted with ME-ID

The article's guidance provides instructions for client and server apps:

* **CLIENT**: Standalone Blazor WebAssembly apps or the **:::no-loc text="Client":::** app of a hosted Blazor solution.
* **SERVER**: ASP.NET Core server API/web API apps or the **:::no-loc text="Server":::** app of a hosted Blazor solution. You can ignore the **SERVER** guidance throughout the article for a standalone Blazor WebAssembly app.

The examples in this article take advantage of new .NET/C# features. When using the examples with .NET 7 or earlier, minor modifications are required. However, the text and code examples that pertain to interacting with ME-ID and Microsoft Graph are the same for all versions of ASP.NET Core.

## Prerequisite

The guidance in this article implements the Microsoft Graph API per the *Graph SDK* guidance in Use Graph API with ASP.NET Core Blazor WebAssembly. Follow the *Graph SDK* implementation guidance to configure the app and test it to confirm that the app can obtain Graph API data for a test user account. Additionally, see the Graph API article's security article cross-links to review Microsoft Graph security concepts.

When testing with the Graph SDK locally, we recommend using a new in-private/incognito browser session for each test to prevent lingering cookies from interfering with tests. For more information, see Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.

## Scopes

To permit Microsoft Graph API calls for user profile, role assignment, and group membership data:

* A **CLIENT** app is configured with the ***delegated*** `User.Read` scope (`https://graph.microsoft.com/User.Read`) in the Azure portal because access to read user data is determined by the scopes granted (delegated) to individual users.
* A **SERVER** app is configured with the ***application*** `GroupMember.Read.All` scope (`https://graph.microsoft.com/GroupMember.Read.All`) in the Azure portal because access is for the app to obtain information about group membership, not based on individual user authorization to access data about group members.

The preceding scopes are required in addition to the scopes required in ME-ID deployment scenarios described by the articles listed earlier (*Standalone with Microsoft Accounts*, *Standalone with ME-ID*, and *Hosted with ME-ID*).

For more information, see Overview of permissions and consent in the Microsoft identity platform and Overview of Microsoft Graph permissions.

*Permissions* and *scopes* mean the same thing and are used interchangeably in security documentation and the Azure portal. Unless the text is referring to the Azure portal, this article uses *scope*/*scopes* when referring to Graph permissions.

Scopes are case insensitive, so `User.Read` is the same as `user.read`. Feel free to use either format, but we recommend a consistent choice across application code.

## Group Membership Claims attribute

**graph-sdk-5:**

In the app's manifest in the Azure portal for **CLIENT** and **SERVER** apps, set the `groupMembershipClaims` attribute to `DirectoryRole`. A value of `DirectoryRole` results in ME-ID sending all of the roles of the signed-in user in the well-known IDs claim (`wids`):

1. Open the app's Azure portal registration.
1. Select **Manage** > **Manifest** in the sidebar.
1. Find the `groupMembershipClaims` attribute.
1. Set the value to `DirectoryRole` (`"groupMembershipClaims": "DirectoryRole"`).
1. Select the **Save** button if you made changes.

**graph-sdk-4:**

In the app's manifest in the Azure portal for **CLIENT** and **SERVER** apps, set the `groupMembershipClaims` attribute to `All`. A value of `All` results in ME-ID sending all of the security groups, distribution groups, and roles of the signed-in user in the well-known IDs claim (`wids`):

1. Open the app's Azure portal registration.
1. Select **Manage** > **Manifest** in the sidebar.
1. Find the `groupMembershipClaims` attribute.
1. Set the value to `All` (`"groupMembershipClaims": "All"`).
1. Select the **Save** button if you made changes.
