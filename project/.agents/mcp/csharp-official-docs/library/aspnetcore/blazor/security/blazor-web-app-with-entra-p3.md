---
title: "Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 3 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/blazor/security/blazor-web-app-with-entra.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 3 of 7)

## Configure the backend web API project (`MinimalApiJwt`)

Configure the project in the `Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions` of the `Microsoft.Extensions.DependencyInjection.JwtBearerExtensions.AddJwtBearer*` call in the `MinimalApiJwt` project's `Program` file.

For the web API app's registration, the `Weather.Get` scope is configured in the Entra or Azure portal in **Expose an API**.

`Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Authority` sets the Authority for making OIDC calls.

```csharp
jwtOptions.Authority = "{AUTHORITY}";
```

The following examples use a Tenant ID of `aaaabbbb-0000-cccc-1111-dddd2222eeee` and a directory name of `contoso`.

If the app is registered in an ME-ID tenant, the authority should match the issuer (`iss`) of the JWT returned by the identity provider.

V1 STS token <example-value>:

```csharp
jwtOptions.Authority = "https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/";
```

V2 STS token <example-value>:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

For more information on V2 STS tokens, see the STS token <example-value> section.

If the app is registered in a Microsoft Entra External ID tenant:

```csharp
jwtOptions.Authority = "https://contoso.ciamlogin.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

If the app is registered in an AAD B2C tenant:

```csharp
jwtOptions.Authority = "https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/v2.0";
```

> **Note:**
> Azure Active Directory B2C is no longer available as a service to new customers as of May 1, 2025. AAD B2C tenants are supported for customers with accounts established prior to May 1, 2025 until 2030. For more information, see Azure AD B2C: Frequently asked questions (FAQ).

`Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerOptions.Audience` sets the Audience for any received JWT access token.

```csharp
jwtOptions.Audience = "{AUDIENCE}";
```

Match the value to just the path of the **Application ID URI** configured when adding the `Weather.Get` scope under **Expose an API** in the Entra or Azure portal. Don't include the scope name, "`Weather.Get`," in the value.

The following examples use an Application (Client) Id of `11112222-bbbb-3333-cccc-4444dddd5555`. The third example uses a tenant domain of `contoso.onmicrosoft.com`.

ME-ID tenant example:

```csharp
jwtOptions.Audience = "api://11112222-bbbb-3333-cccc-4444dddd5555";
```

Microsoft Entra External ID tenant:

```csharp
jwtOptions.Audience = "11112222-bbbb-3333-cccc-4444dddd5555";
```

AAD B2C tenant example:

```csharp
jwtOptions.Audience = "https://contoso.onmicrosoft.com/11112222-bbbb-3333-cccc-4444dddd5555";
```
