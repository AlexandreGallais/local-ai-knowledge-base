---
title: "What's new in ASP.NET Core in .NET 11 (part 8 of 9)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# What's new in ASP.NET Core in .NET 11 (part 8 of 9)

## Authentication and authorization

This section describes new features for authentication and authorization.

### `TimeProvider` support in ASP.NET Core Identity

ASP.NET Core Identity now uses `TimeProvider` instead of `DateTime` and `DateTimeOffset` for all time-related operations. This change makes Identity components more testable and provides better control over time in tests and specialized scenarios.

The following example shows how to use a fake `TimeProvider` for testing Identity features:

```csharp
// In tests
var fakeTimeProvider = new FakeTimeProvider(
    new DateTimeOffset(2024, 1, 1, 0, 0, 0, TimeSpan.Zero));

services.AddSingleton<TimeProvider>(fakeTimeProvider);
services.AddIdentity<IdentityUser, IdentityRole>();

// Identity will now use the fake time provider
```

By using `TimeProvider`, you can more easily write deterministic tests for time-sensitive Identity features such as token <example-value>, lockout durations, and security stamp validation.

### Infer passkey <example-value> name from authenticator

ASP.NET Core Identity now automatically infers friendly display names for passkeys based on their AAGUID (Authenticator Attestation GUID). Built-in mappings are included for the most commonly used passkey <example-value>, including Google Password <example-value>, iCloud Keychain, Windows Hello, 1Password, and Bitwarden.

For known authenticators, the name is automatically assigned without prompting the user. For unknown authenticators, the user is redirected to a rename page. Extend the mappings by adding entries to the `PasskeyAuthenticators` dictionary in the project.

### `dotnet user-jwts` supports file-based apps

The `dotnet user-jwts` tool creates signed development JWTs so you can call an app'<example-value>'s user secrets, and prints the token to use as a bearer token. It now works with file-based apps (a single `app.cs` with no project file) through the new `--file` option:

```bash
dotnet user-jwts create --file app.cs
```

### Consistent authorization metadata across the stack

Authorization metadata can be expressed as `Microsoft.AspNetCore.Authorization.IAuthorizeData`, an `Microsoft.AspNetCore.Authorization.AuthorizationPolicy`, or an `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` attribute. MVC filters, SignalR hub methods, and Blazor's `AuthorizeView` and `AuthorizeRouteView` apply all three forms consistently.

A new `AuthorizationPolicy.CombineAsync` overload is the shared implementation:

```csharp
public class AuthorizationPolicy
{
    public static Task<AuthorizationPolicy?> CombineAsync(
        IAuthorizationPolicyProvider policyProvider,
        IEnumerable<object> metadata);
}
```

MVC, SignalR, and Blazor use this overload internally. A custom attribute that implements both `Microsoft.AspNetCore.Authorization.IAuthorizeData` and `Microsoft.AspNetCore.Authorization.IAuthorizationRequirementData` contributes to the decision once. The legacy MVC path with `EnableEndpointRouting = false` is unchanged.

### Negotiate authentication uses TLS channel binding

Negotiate authentication on Kestrel uses the TLS endpoint channel binding token for HTTPS connections. The authentication handler supplies the token to the underlying Kerberos or NTLM exchange and retains it across multi-round authentication.

No configuration changes are required. Non-HTTPS connections and HTTPS connections where a channel binding token isn't available continue to use the existing behavior.

### Experimental Device Bound Session Credentials <example-value>

> **Important:**
> The `Microsoft.AspNetCore.Authentication.DeviceBoundSessions` package is experimental and remains prerelease throughout .NET 11 and until the specification stabilizes.

The Device Bound Session Credentials (DBSC) specification defines a protocol that binds session refresh to a private key held by the browser. The app issues a short-lived session cookie, and the browser must provide a signed proof of possession to refresh it. A copied session cookie might remain usable until it expires, but an attacker without the device key can't use it to extend the session.

ASP.NET Core adds an experimental server-side DBSC implementation in the `Microsoft.AspNetCore.Authentication.DeviceBoundSessions` package. The authentication component layers over an existing cookie authentication scheme and manages the registration and refresh endpoints, a path-scoped refresh cookie, and the short-lived session cookie.

After adding the `Microsoft.AspNetCore.Authentication.DeviceBoundSessions` package, configure DBSC over an existing cookie authentication scheme:

```csharp
builder.Services
    .AddAuthentication("Application")
    .AddCookie("Application")
    .AddDeviceBoundSession("Application", options =>
    {
        options.ShortLivedCookieExpiration = TimeSpan.FromMinutes(10);
    });
```

Browser support currently requires an experimental DBSC implementation. For more information, see Chrome's DBSC documentation.
