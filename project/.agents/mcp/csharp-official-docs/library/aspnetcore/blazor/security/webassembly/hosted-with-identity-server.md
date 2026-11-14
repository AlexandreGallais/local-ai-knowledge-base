---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/webassembly/hosted-with-identity-server.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server

> **Important:**
> The Hosted Blazor WebAssembly project template was removed from the framework with the release of .NET 8 (November, 2023). The guidance in this article is only supported for .NET 7 or earlier. Hosted Blazor WebAssembly apps that are upgraded each release continue to receive product support. Alternatively, refactor the app into either a standalone Blazor WebAssembly app or a Blazor Web App.

This article explains how to create a hosted Blazor WebAssembly solution that uses Duende Identity Server to authenticate users and API calls.

> **Important:**
> Duende Software might require you to pay a license fee for production use of Duende Identity Server. For more information, see Migrate from ASP.NET Core in .NET 5 to .NET 6.

> **Note:**
> To configure a standalone or hosted Blazor WebAssembly app to use an existing, external Identity Server instance, follow the guidance in Secure an ASP.NET Core Blazor WebAssembly standalone app with the Authentication library.

For additional security scenario coverage after reading this article, see ASP.NET Core Blazor WebAssembly additional security scenarios.

## Walkthrough

The subsections of the walkthrough explain how to:

* Create the Blazor app
* Run the app

# Visual Studio

To create a new Blazor WebAssembly project with an authentication mechanism:

1. Create a new project.

1. Choose the **Blazor WebAssembly App** template. Select **Next**.

1. Provide a **Project name** without using dashes. Confirm that the **Location** is correct. Select **Next**.

   Avoid using dashes (`-`) in the project name that break the formation of the OIDC app identifier. Logic in the Blazor WebAssembly project template uses the project name for an OIDC app identifier in the solution's configuration, and dashes aren't permitted in an OIDC app identifier. Pascal case (`BlazorSample`) or underscores (`Blazor_Sample`) are acceptable alternatives.

1. In the **Additional information** dialog, select **Individual Accounts** as the **Authentication type** to store users within the app using ASP.NET Core's Identity system.

1. Select the **ASP.NET Core Hosted** checkbox.

1. Select the **Create** button to create the app.

# Visual Studio Code / .NET CLI

To create a new Blazor WebAssembly project with an authentication mechanism in an empty folder, specify the `Individual` authentication mechanism with the `-au|--auth` option to store users within the app using ASP.NET Core's Identity system:

```dotnetcli
dotnet new blazorwasm -au Individual -ho -o {PROJECT NAME}
```

| Placeholder      | Example        |
| ---------------- | -------------- |
| `{PROJECT NAME}` | `BlazorSample` |

The output location specified with the optional `-o|--output` option creates a project folder if it doesn't exist and becomes part of the project's name.

Avoid using dashes (`-`) in the project name that break the formation of the OIDC app identifier. Logic in the Blazor WebAssembly project template uses the project name for an OIDC app identifier in the solution's configuration, and dashes aren't permitted in an OIDC app identifier. Pascal case (`BlazorSample`) or underscores (`Blazor_Sample`) are acceptable alternatives.

For more information, see the `dotnet new` command in the .NET Guide.

---

### Run the app

Run the app from the **`Server`** project. When using Visual Studio, either:

* Select the dropdown arrow next to the **Run** button. Open **Configure Startup Projects** from the dropdown list. Select the **Single startup project** option. Confirm or change the project for the startup project to the **`Server`** project.

* Confirm that the **`Server`** project is highlighted in **Solution Explorer** before you start the app with any of the following approaches:

  * Select the **Run** button.
  * Use **Debug** > **Start Debugging** from the menu.
  * Press `F5`.

* In a command shell, navigate to the **`Server`** project folder of the solution. Execute the `dotnet watch` (or `dotnet run`) command.

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
