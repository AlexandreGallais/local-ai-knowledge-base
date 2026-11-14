---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Azure Active Directory B2C (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/hosted-with-azure-active-directory-b2c.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Azure Active Directory B2C

> **Important:**
> The Hosted Blazor WebAssembly project template was removed from the framework with the release of .NET 8 (November, 2023). The guidance in this article is only supported for .NET 7 or earlier. Hosted Blazor WebAssembly apps that are upgraded each release continue to receive product support. Alternatively, refactor the app into either a standalone Blazor WebAssembly app or a Blazor Web App.

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

This article explains how to create a hosted Blazor WebAssembly solution that uses Azure Active Directory (AAD) B2C for authentication.

For additional security scenario coverage after reading this article, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Walkthrough

The subsections of the walkthrough explain how to:

* Create a tenant in Azure
* Register a server API app in Azure
* Register a client app in Azure
* Create the Blazor app
* Modify the default access token scope scheme
* Run the app

### Create a tenant in Azure

Follow the guidance in Tutorial: Create an Azure Active Directory B2C tenant to create an AAD B2C tenant.

Before proceeding with this article's guidance, confirm that you've selected the correct directory for the AAD B2C tenant.

### Register a server API app in Azure

Register an AAD B2C app for the *Server API app*:

1. Navigate to **Azure AD B2C** in the Azure portal. Select **App registrations** in the sidebar. Select the **New registration** button.
1. Provide a **Name** for the app (for example, **Blazor Server AAD B2C**).
1. For **Supported account types**, select the multi-tenant option: **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**
1. The *Server API app* doesn't require a **Redirect URI** in this scenario, so leave the **Select a platform** dropdown list unselected and don't enter a redirect URI.
1. Confirm that **Permissions** > **Grant admin consent to openid and offline_access permissions** is selected.
1. Select **Register**.

Record the following information:

* *Server API app* Application (client) ID (for example, `00001111-aaaa-2222-bbbb-3333cccc4444`)
* AAD B2C instance (for example, `https://contoso.b2clogin.com/`, which includes the trailing slash). The instance is the scheme and host of an Azure B2C app registration, which can be found by opening the **Endpoints** window from the **App registrations** page in the Azure portal.
* Primary/Publisher/Tenant domain (for example, `contoso.onmicrosoft.com`): The domain is available as the **Publisher domain** in the **Branding** blade of the Azure portal for the registered app.

Select **Expose an API** from the sidebar and follow these steps:

1. Select **Add a scope**.
1. Select **Save and continue**.
1. Provide a **Scope name** (for example, `API.Access`).
1. Provide an **Admin consent display name** (for example, `Access API`).
1. Provide an **Admin consent description** (for example, `Allows the app to access server app API endpoints.`).
1. Confirm that the **State** is set to **Enabled**.
1. Select **Add scope**.

Record the following information:

* App ID URI GUID (for example, record `00001111-aaaa-2222-bbbb-3333cccc4444` from `https://contoso.onmicrosoft.com/00001111-aaaa-2222-bbbb-3333cccc4444`)
* Scope name (for example, `API.Access`)

### Register a client app in Azure

Register an AAD B2C app for the *Client app*:

1. Navigate to **Azure AD B2C** in the Azure portal. Select **App registrations** in the sidebar. Select the **New registration** button.
1. Provide a **Name** for the app (for example, **Blazor Client AAD B2C**).
1. For **Supported account types**, select the multi-tenant option: **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**
1. Set the **Redirect URI** dropdown list to **Single-page application (SPA)** and provide a redirect URI value of `https://localhost/authentication/login-callback`. If you know the production redirect URI for the Azure default host (for example, `azurewebsites.net`) or the custom domain host (for example, `contoso.com`), you can also add the production redirect URI at the same time that you're providing the `localhost` redirect URI. Be sure to include the port number for non-`:443` ports in any production redirect URIs that you add.
1. Confirm that **Permissions** > **Grant admin consent to openid and offline_access permissions** is selected.
1. Select **Register**.

> **Note:**
> Supplying the port number for a `localhost` AAD B2C redirect URI isn't required. For more information, see Redirect URI (reply URL) restrictions and limitations: Localhost exceptions (Entra documentation).

Record the *Client app* Application (client) ID (for example, `11112222-bbbb-3333-cccc-4444dddd5555`).

In **Authentication** > **Platform configurations** > **Single-page application**:

1. Confirm the redirect URI of `https://localhost/authentication/login-callback` is present.
1. In the **Implicit grant** section, ensure that the checkboxes for **Access tokens** and **ID tokens** aren'<example-value>'t recommended for Blazor apps using MSAL v2.0 or later.** For more information, see Secure ASP.NET Core Blazor WebAssembly.
1. The remaining defaults for the app are acceptable for this experience.
1. Select the **Save** button if you made changes.

In **API permissions** from the sidebar:

1. Select **Add a permission** followed by **My APIs**.
1. Select the *Server API app* from the **Name** column (for example, **Blazor Server AAD B2C**). You must be an owner of the app registration (and the API app registration if it's a separate app) in order to see the API in the **My APIs** area of the Azure portal. For more information, see Assign application owner (Microsoft Entra documentation).
1. Open the **API** list if it isn't already open.
1. Enable access to the API (for example, `API.Access`) with the checkbox.
1. Select **Add permissions**.
1. Select the **Grant admin consent for {TENANT NAME}** button. Select **Yes** to confirm.

> **Important:**
> If you don't have the authority to grant admin consent to the tenant in the last step of **API permissions** configuration because consent to use the app is delegated to users, then you must take the following additional steps:
>
> * The app must use a trusted publisher domain.
> * In the **`Server`** app's configuration in the Azure portal, select **Expose an API**. Under **Authorized client applications**, select the button to **Add a client application**. Add the **`Client`** app's Application (client) ID (for example, `11112222-bbbb-3333-cccc-4444dddd5555`).

Return to **Azure AD B2C** in the Azure portal. Select **User flows** and use the following guidance: Create a sign-up and sign-in user flow. At a minimum, select **Application claims** for the sign-up/sign-in user flow and then the **Display Name** user attribute checkbox to populate the `context.User.Identity?.Name`/`context.User.Identity.Name` in the `LoginDisplay` component (`Shared/LoginDisplay.razor`).

Record the sign-up and sign-in user flow name created for the app (for example, `B2C_1_signupsignin1`).

### Create the Blazor app

Replace the placeholders in the following command with the information recorded earlier and execute the command in a command shell:

```dotnetcli
dotnet new blazorwasm -au IndividualB2C --aad-b2c-instance "{AAD B2C INSTANCE}" --api-client-id "{SERVER API APP CLIENT ID}" --app-id-uri "{SERVER API APP ID URI GUID}" --client-id "{CLIENT APP CLIENT ID}" --default-scope "{DEFAULT SCOPE}" --domain "{TENANT DOMAIN}" -ho -o {PROJECT NAME} -ssp "{SIGN UP OR SIGN IN POLICY}"
```

> **Warning:**
> **Avoid using dashes (`-`) in the app name `{PROJECT NAME}` that break the formation of the OIDC app identifier.** Logic in the Blazor WebAssembly project template uses the project name for an OIDC app identifier in the solution's configuration. Pascal case (`BlazorSample`) or underscores (`Blazor_Sample`) are acceptable alternatives. For more information, see Dashes in a hosted Blazor WebAssembly project name break OIDC security (dotnet/aspnetcore #35337).

| Placeholder | Azure portal name | Example |
| --- | --- | --- |
| `{AAD B2C INSTANCE}` | Instance | `https://contoso.b2clogin.com/` (includes the trailing slash) |
| `{PROJECT NAME}` | — | `BlazorSample` |
| `{CLIENT APP CLIENT ID}` | Application (client) ID for the **:::no-loc text="Client":::** app | `11112222-bbbb-3333-cccc-4444dddd5555` |
| `{DEFAULT SCOPE}` | Scope name | `API.Access` |
| `{SERVER API APP CLIENT ID}` | Application (client) ID for the **:::no-loc text="Server":::** app | `00001111-aaaa-2222-bbbb-3333cccc4444` |
| `{SERVER API APP ID URI GUID}` | Application ID URI GUID | `00001111-aaaa-2222-bbbb-3333cccc4444` (GUID ONLY, matches the `{SERVER API APP CLIENT ID}`) |
| `{SIGN UP OR SIGN IN POLICY}` | Sign-up/sign-in user flow | `B2C_1_signupsignin1` |
| `{TENANT DOMAIN}` | Primary/Publisher/Tenant domain | `contoso.onmicrosoft.com` |

The output location specified with the `-o|--output` option creates a project folder if it doesn't exist and becomes part of the project's name. **Avoid using dashes (`-`) in the app name that break the formation of the OIDC app identifier (see the earlier WARNING).**

### Run the app

Run the app from the **`Server`** project. When using Visual Studio, either:

* Select the dropdown arrow next to the **Run** button. Open **Configure Startup Projects** from the dropdown list. Select the **Single startup project** option. Confirm or change the project for the startup project to the **`Server`** project.

* Confirm that the **`Server`** project is highlighted in **Solution Explorer** before you start the app with any of the following approaches:

  * Select the **Run** button.
  * Use **Debug** > **Start Debugging** from the menu.
  * Press `F5`.

* In a command shell, navigate to the **`Server`** project folder of the solution. Execute the `dotnet watch` (or `dotnet run`) command.

## Custom policies

The Microsoft Authentication Library (`Microsoft.Authentication.WebAssembly.Msal`, NuGet package) doesn't support AAD B2C custom policies.

## Configure `User.Identity.Name`

*The guidance in this section covers optionally populating `User.Identity.Name` with the value from the `name` claim.*

The **:::no-loc text="Server":::** app API populates `User.Identity.Name` with the value from the `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name` claim type (for example, `user@example.com`).

To configure the app to receive the value from the `name` claim type:

* Add a namespace for `Microsoft.AspNetCore.Authentication.JwtBearer` to the `Program` file:

  ```csharp
  using Microsoft.AspNetCore.Authentication.JwtBearer;
  ```

* Configure the `Microsoft.IdentityModel.Tokens.TokenValidationParameters.NameClaimType` of the `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions` in the `Program` file:

  ```csharp
  builder.Services.Configure<JwtBearerOptions>(
      JwtBearerDefaults.AuthenticationScheme, options =>
      {
          options.TokenValidationParameters.NameClaimType = "<example-value>";
      });
  ```

## Remote authentication paths

*This section pertains to the solution's **:::no-loc text="Client":::** app.*

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
