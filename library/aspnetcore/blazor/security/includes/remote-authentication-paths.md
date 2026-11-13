---
title: "remote-authentication-paths"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/includes/remote-authentication-paths.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# remote-authentication-paths

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
