---
title: "additional-scopes-standalone-nonMEID"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/includes/additional-scopes-standalone-nonMEID.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# additional-scopes-standalone-nonMEID

Add a pair of `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions` for `openid` and `offline_access` `Microsoft.Authentication.WebAssembly.Msal.Models.MsalProviderOptions.DefaultAccessTokenScopes`:

```csharp
builder.Services.AddMsalAuthentication(options =>
{
    ...
    options.ProviderOptions.DefaultAccessTokenScopes.Add("<example-value>");
    options.ProviderOptions.DefaultAccessTokenScopes.Add("<example-value>");
});
```
