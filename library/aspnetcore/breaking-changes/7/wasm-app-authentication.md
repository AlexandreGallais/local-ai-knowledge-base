---
title: "Breaking change: Authentication in WebAssembly apps"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/breaking-changes/7/wasm-app-authentication.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Authentication in WebAssembly apps

We updated the support for authentication in Blazor WebAssembly apps to rely on the history state instead of query strings in the URL. As a result, existing applications that pass the return URL through the query string will fail to redirect back to the original page after a successful login.

Existing applications should use the new `Microsoft.AspNetCore.Components.WebAssembly.Authentication.NavigationManagerExtensions.NavigateToLogin*` extension method as it's able to flow the data to the login page correctly.

## Version introduced

.NET 7

## Previous behavior

The return URL was specified in the query string as `?returnUrl=<<return-url>>`.

## New behavior

Starting in .NET 7, the return URL and other parameters passed to the `authentication/login` page are passed via the `history.state` entry of the page.

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

We decided to switch to using `history.state` instead of the query string as it simplifies the implementation and removes the surface attack area associated with passing data through the query string.

## Recommended action

Most apps have a *RedirectToLogin.razor* file that you can update as follows:

```razor
@inject NavigationManager Navigation
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication
@using Microsoft.Extensions.Options

@inject IOptionsSnapshot<RemoteAuthenticationOptions<ApiAuthorizationProviderOptions>> Options
@code {

    protected override void OnInitialized()
    {
        Navigation.NavigateToLogin(Options.Get(Microsoft.Extensions.Options.Options.DefaultName).AuthenticationPaths.LogInPath);
    }
}
```

## Affected APIs

- `Microsoft.AspNetCore.Components.WebAssembly.Authentication.SignOutSessionStateManager` (obsoleted in favor of new `Microsoft.AspNetCore.Components.WebAssembly.Authentication.NavigationManagerExtensions.NavigateToLogout*` method)

## See also

- RedirectToLogin component - Blazor WebAssembly
