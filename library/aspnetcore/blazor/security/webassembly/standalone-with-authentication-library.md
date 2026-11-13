---
title: "Secure an ASP.NET Core Blazor WebAssembly standalone app with the Authentication library (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/standalone-with-authentication-library.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor WebAssembly standalone app with the Authentication library

-->
-->

This article explains how to secure an ASP.NET Core Blazor WebAssembly standalone app with the Blazor WebAssembly Authentication library.

The Blazor WebAssembly Authentication library (`Authentication.js`) only supports the Proof Key for Code Exchange (PKCE) authorization code flow via the Microsoft Authentication Library (MSAL, `msal.js`). To implement other grant flows, access the MSAL guidance to implement MSAL directly, but we don't support or recommend the use of grant flows other than PKCE for Blazor apps.

*For Microsoft Entra (ME-ID) guidance, don't follow the guidance in this topic. See Secure an ASP.NET Core Blazor WebAssembly standalone app with Microsoft Entra ID.*

For additional security scenario coverage after reading this article, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Walkthrough

The subsections of the walkthrough explain how to:

* Register an app
* Create the Blazor app
* Run the app

### Register an app

Register an app with an OpenID Connect (OIDC) Identity Provider (IP) following the guidance provided by the maintainer of the IP.

Record the following information:

* Authority (for example, `https://accounts.google.com/`).
* Application (client) ID (for example, `2...7-e...q.apps.googleusercontent.com`).
* Additional IP configuration (see the IP's documentation).

> **Note:**
> The IP must use OIDC. For example, Facebook's IP isn't an OIDC-compliant provider, so the guidance in this topic doesn't work with the Facebook IP. For more information, see Secure ASP.NET Core Blazor WebAssembly.

### Create the Blazor app

To create a standalone Blazor WebAssembly app that uses the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` library, follow the guidance for your choice of tooling. If adding support for authentication, see the Parts of the app section of this article for guidance on setting up and configuring the app.

# Visual Studio

To create a new Blazor WebAssembly project with an authentication mechanism:

After choosing the **Blazor WebAssembly App** template, set the **Authentication type** to **Individual Accounts**.

The **Individual Accounts** selection uses ASP.NET Core's Identity system. This selection adds authentication support and doesn't result in storing users in a database. The following sections of this article provide further details.

# Visual Studio Code / .NET CLI

Create a new Blazor WebAssembly project with an authentication mechanism in an empty folder. Specify the `Individual` authentication mechanism with the `-au|--auth` option to use ASP.NET Core's Identity system. This selection adds authentication support and doesn't result in storing users in a database. The following sections of this article provide further details.

```dotnetcli
dotnet new blazorwasm -au Individual -o {PROJECT NAME}
```

| Placeholder      | Example        |
| ---------------- | -------------- |
| `{PROJECT NAME}` | `BlazorSample` |

The output location specified with the `-o|--output` option creates a project folder if it doesn't exist and becomes part of the project's name.

For more information, see the `dotnet new` command in the .NET Guide.

---

### Configure the app

Configure the app following the IP's guidance. At a minimum, the app requires the `Local:Authority` and `Local:ClientId` configuration settings in the app's `wwwroot/appsettings.json` file:

```json
{
  "Local": {
    "Authority": "{AUTHORITY}",
    "ClientId": "{CLIENT ID}"
  }
}
```

Google OAuth 2.0 OIDC example for an app that runs on the `localhost` address at port 5001:

```json
{
  "Local": {
    "Authority": "https://accounts.google.com/",
    "ClientId": "2...7-e...q.apps.googleusercontent.com",
    "PostLogoutRedirectUri": "https://localhost:5001/authentication/logout-callback",
    "RedirectUri": "https://localhost:5001/authentication/login-callback",
    "ResponseType": "code"
  }
}
```

The redirect URI (`https://localhost:5001/authentication/login-callback`) is registered in the Google APIs console in **Credentials** > **`{NAME}`** > **Authorized redirect URIs**, where `{NAME}` is the app's client name in the **OAuth 2.0 Client IDs** app list of the Google APIs console.

> **Note:**
> Supplying the port number for a `localhost` redirect URI isn't required for some OIDC IPs per the OAuth 2.0 specification. Some IPs permit the redirect URI for loopback addresses to omit the port. Others allow the use of a wildcard for the port number (for example, `*`). For additional information, see the IP's documentation.

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
