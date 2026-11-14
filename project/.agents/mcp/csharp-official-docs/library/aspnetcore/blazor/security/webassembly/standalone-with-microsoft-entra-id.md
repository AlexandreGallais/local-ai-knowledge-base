---
title: "Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/standalone-with-microsoft-entra-id.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID

This article explains how to create a standalone Blazor WebAssembly app that uses Microsoft Entra ID (ME-ID) for authentication.

For additional security scenario coverage after reading this article, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Walkthrough

The subsections of the walkthrough explain how to:

* Create a tenant in Azure
* Register an app in Azure
* Create the Blazor app
* Run the app

### Create a tenant in Azure

Follow the guidance in Quickstart: Set up a tenant to create a tenant in ME-ID.

### Register an app in Azure

Register an ME-ID app:

1. Navigate to **Microsoft Entra ID** in the Azure portal. Select **Applications** > **App registrations** in the sidebar. Select the **New registration** button.
1. Provide a **Name** for the app (for example, **Blazor Standalone ME-ID**).
1. Choose a **Supported account types**. You may select **Accounts in this organizational directory only** for this experience.
1. Set the **Redirect URI** dropdown list to **Single-page application (SPA)** and provide the following redirect URI: `https://localhost/authentication/login-callback`. If you know the production redirect URI for the Azure default host (for example, `azurewebsites.net`) or the custom domain host (for example, `contoso.com`), you can also add the production redirect URI at the same time that you're providing the `localhost` redirect URI. Be sure to include the port number for non-`:443` ports in any production redirect URIs that you add.
1. If you're using an unverified publisher domain, clear the **Permissions** > **Grant admin consent to openid and offline_access permissions** checkbox. If the publisher domain is verified, this checkbox isn't present.
1. Select **Register**.

> **Note:**
> Supplying the port number for a `localhost` ME-ID redirect URI isn't required. For more information, see Redirect URI (reply URL) restrictions and limitations: Localhost exceptions (Entra documentation).

Record the following information:

* Application (client) ID (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`)
* Directory (tenant) ID (for example, `aaaabbbb-0000-cccc-1111-dddd2222eeee`)

In **Authentication** > **Platform configurations** > **Single-page application**:

1. Confirm the redirect URI of `https://localhost/authentication/login-callback` is present.
1. In the **Implicit grant** section, ensure that the checkboxes for **Access tokens** and **ID tokens** aren'<example-value>'t recommended for Blazor apps using MSAL v2.0 or later.** For more information, see Secure ASP.NET Core Blazor WebAssembly.
1. The remaining defaults for the app are acceptable for this experience.
1. Select the **Save** button if you made changes.

### Create the Blazor app

Create the app in an empty folder. Replace the placeholders in the following command with the information recorded earlier and execute the command in a command shell:

```dotnetcli
dotnet new blazorwasm -au SingleOrg --client-id "{CLIENT ID}" -o {PROJECT NAME} --tenant-id "{TENANT ID}"
```

| Placeholder      | Azure portal name       | Example                                |
| ---------------- | ----------------------- | -------------------------------------- |
| `{PROJECT NAME}` | —                 | `BlazorSample`                         |
| `{CLIENT ID}`    | Application (client) ID | `00001111-aaaa-2222-bbbb-3333cccc4444` |
| `{TENANT ID}`    | Directory (tenant) ID   | `aaaabbbb-0000-cccc-1111-dddd2222eeee` |

The output location specified with the `-o|--output` option creates a project folder if it doesn't exist and becomes part of the project's name.

Add a `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions` for `User.Read` permission with `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes`:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.DefaultAccessTokenScopes
        .Add("https://graph.microsoft.com/User.Read");
});
```

### Run the app

Use one of the following approaches to run the app:

* Visual Studio
  * Select the **Run** button.
  * Use **Debug** > **Start Debugging** from the menu.
  * Press `F5`.
* .NET CLI command shell: Execute the `dotnet watch` (or `dotnet run`) command from the app's folder.

## Remote authentication paths

Remote authentication paths are customized using `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationApplicationPathsOptions` on the `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions`1.AuthenticationPaths` property in the app's `Program` file. For the framework's default path values, see the `dotnet/aspnetcore` reference source.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

If an app customizes a remote authentication path, take either of the following approaches:

* Match the path in hard-coded strings around the app.

* Inject `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticationOptions`1` to obtain the configured value around the app. The following example demonstrates the approach for the `RedirectToLogin` component.

  Add the following Razor directives to the top of the component's Razor file:

  ```razor
  @using Microsoft.Extensions.Options
  @inject IOptionsSnapshot<RemoteAuthenticationOptions<ApiAuthorizationProviderOptions>> RemoteOptions
  ```

  Modify the component's redirect in the `OnInitialized` method:

  ```diff
  - Navigation.NavigateToLogin("authentication/login");
  + Navigation.NavigateToLogin(RemoteOptions.Get(Options.DefaultName)
  +     .AuthenticationPaths.LogInPath);
  ```

  > **Note:**
  > If other paths differ from the project template's paths or framework's default paths, manage them in the same fashion.
