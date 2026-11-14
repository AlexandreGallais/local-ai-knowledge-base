---
title: "additional-scopes-standalone-nonMEID"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/includes/additional-scopes-standalone-nonMEID.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
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
