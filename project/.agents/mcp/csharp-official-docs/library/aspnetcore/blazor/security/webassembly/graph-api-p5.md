---
title: "Use Graph API with ASP.NET Core Blazor WebAssembly (part 5 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/graph-api.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Use Graph API with ASP.NET Core Blazor WebAssembly (part 5 of 5)

## `DefaultAccessTokenScopes` versus `AdditionalScopesToConsent`

The examples in this article provision Graph API scopes with `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes`, not `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent`.

`Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent` isn't used because it's unable to provision Graph API scopes for users when they sign in to the app for the first time with MSAL via the Azure consent UI. When the user attempts to access Graph API for the first time with the Graph SDK, they're confronted with an exception:

> :::no-loc text="Microsoft.Graph.Models.ODataErrors.ODataError: Access token is empty.":::

After a user provisions Graph API scopes provided via `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes`, the app can use `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent` for a subsequent user sign in. However, changing app code makes no sense for a production app that requires the periodic addition of new users with delegated Graph scopes or adding new delegated Graph API scopes to the app.

The preceding discussion of how to provision scopes for Graph API access when the user first signs into the app only applies to:

* Apps that adopt the Graph SDK.
* Apps that use a named `System.Net.Http.HttpClient` for Graph API access that asks users to consent to Graph scopes on their first sign in to the app.

When using a named `System.Net.Http.HttpClient` that doesn'<example-value>'t consented initially with the named `System.Net.Http.HttpClient` approach, neither `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes` nor `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.AdditionalScopesToConsent` are called by the app. For more information, see the named `HttpClient` coverage in this article.

## Related content

### General guidance

* Microsoft Graph documentation
* Microsoft Graph sample Blazor WebAssembly app: This sample demonstrates how to use the Microsoft Graph .NET SDK to access data in Office 365 from Blazor WebAssembly apps.
* Build .NET apps with Microsoft Graph tutorial and Microsoft Graph sample ASP.NET Core app: Although these resources don't directly apply to calling Graph from *client-side* Blazor WebAssembly apps, the ME-ID app configuration and Microsoft Graph coding practices in the linked resources are relevant for standalone Blazor WebAssembly apps and should be consulted for general best practices.

### Security guidance

* Microsoft Graph auth overview
* Overview of Microsoft Graph permissions
* Microsoft Graph permissions reference
* Overview of permissions and consent in the Microsoft identity platform
* Enhance security with the principle of least privilege
* Azure privilege escalation articles on the Internet (Google search result)
* Microsoft Security Best Practices: Securing privileged access
