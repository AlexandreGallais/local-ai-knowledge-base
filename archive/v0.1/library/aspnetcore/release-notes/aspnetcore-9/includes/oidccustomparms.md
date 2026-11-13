---
title: "oidccustomparms"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/oidccustomparms.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# oidccustomparms

### OIDC and OAuth Parameter Customization

The OAuth and OIDC authentication handlers now have an `AdditionalAuthorizationParameters` option to make it easier to customize authorization message parameters that are usually included as part of the redirect query string. In .NET 8 or earlier, this requires a custom `Microsoft.AspNetCore.Authentication.WsFederation.WsFederationEvents.OnRedirectToIdentityProvider` callback or overridden `Microsoft.AspNetCore.Authentication.OAuth.OAuthHandler`1.BuildChallengeUrl*` method in a custom handler. Here's an example of .NET 8 code:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.Events.OnRedirectToIdentityProvider = context =>
    {
        context.ProtocolMessage.SetParameter("prompt", "login");
        context.ProtocolMessage.SetParameter("audience", "https://api.example.com");
        return Task.CompletedTask;
    };
});
```

The preceding example can now be simplified to the following code:

```csharp
builder.Services.AddAuthentication().AddOpenIdConnect(options =>
{
    options.AdditionalAuthorizationParameters.Add("prompt", "login");
    options.AdditionalAuthorizationParameters.Add("audience", "https://api.example.com");
});
```
