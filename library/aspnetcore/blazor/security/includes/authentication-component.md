---
title: "authentication-component"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/includes/authentication-component.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# authentication-component

The page produced by the `Authentication` component (`Pages/Authentication.razor`) defines the routes required for handling different authentication stages.

The `Microsoft.AspNetCore.Components.WebAssembly.Authentication.RemoteAuthenticatorView` component:

* Is provided by the `Microsoft.AspNetCore.Components.WebAssembly.Authentication` package.
* Manages performing the appropriate actions at each stage of authentication.

```razor
@page "/authentication/{action}"
@using Microsoft.AspNetCore.Components.WebAssembly.Authentication

<RemoteAuthenticatorView Action="@Action" />

@code {
    [Parameter]
    public string? Action { get; set; }
}
```

> **Note:**
> Nullable reference types (NRTs) and .NET compiler null-state static analysis is supported in ASP.NET Core in .NET 6 or later. Prior to the release of ASP.NET Core in .NET 6, the `string` type appears without the null type designation (`?`).
