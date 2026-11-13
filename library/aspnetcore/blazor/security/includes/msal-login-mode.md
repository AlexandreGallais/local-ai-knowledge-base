---
title: "msal-login-mode"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/includes/msal-login-mode.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# msal-login-mode

The framework defaults to pop-up login mode and falls back to redirect login mode if a pop-up can't be opened. Configure MSAL to use redirect login mode by setting the `LoginMode` property of `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions` to `redirect`:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.LoginMode = "redirect";
});
```

The default setting is `popup`, and the string value isn't case-sensitive.
