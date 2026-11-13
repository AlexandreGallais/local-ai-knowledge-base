---
title: "Enable Web Authentication API (WebAuthn) passkeys (part 1 of 4)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/authentication/passkeys/index.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Enable Web Authentication API (WebAuthn) passkeys

-->
-->

-->
-->

-->

Passkeys provide a modern, phishing-resistant authentication method based on the Web Authentication API (WebAuthn) and FIDO2 standards. They are a secure alternative to passwords, using public key cryptography and device-based authentication. This article explains how to configure an ASP.NET Core app to use passkeys to authenticate users.

For guidance specific to new and existing Blazor Web Apps, see Implement passkeys in ASP.NET Core Blazor Web Apps after reading this article.

## What are passkeys?

Passkeys are a replacement for passwords that use cryptographic key pairs. The private key is stored securely on the user's device, such as in a hardware security module, platform authenticator (examples: Windows Hello, Touch ID, Face ID), or a password manager, while the public key is stored by the web app. During authentication, the user proves possession of the private key without it ever leaving their device.

Key benefits of passkeys include:

* **Phishing resistance**: Passkeys are bound to specific websites and can't be used on fake sites.
* **No shared secrets**: The server only stores public keys, eliminating the risk of password database breaches.
* **User convenience**: Simple biometric or PIN verification replaces complex password requirements.
* **Cross-device synchronization**: Many passkey providers sync credentials across a user's devices.

For more information, see Web Authentication API (MDN documentation).

## Passkeys in ASP.NET Core Identity

ASP.NET Core Identity includes built-in support for passkey registration and authentication:

* Seamless integration with Identity infrastructure.
* User authentication support for the most common WebAuthn scenarios.
* Built into the Blazor Web App project template, so only developer configuration is required.

> **Important:**
> The passkey implementation in ASP.NET Core Identity is deliberately scoped to authentication scenarios. It isn't intended as a general-purpose WebAuthn library. Developers requiring full WebAuthn functionality should consider community libraries that provide comprehensive protocol support.

## Supported scenarios

The ASP.NET Core Identity passkey implementation supports the following primary scenarios:

* **Adding passkeys to existing accounts**: Users with password-based accounts can register passkeys as an additional authentication method.
* **Passwordless account creation**: Users can create accounts without a password by registering a passkey on account creation.
* **Passwordless sign-in**: Users can authenticate using only their passkey without entering a password.

## Limitations

The current implementation has the following limitations:

* **Scoped to ASP.NET Core Identity**: The APIs are designed specifically for Identity authentication scenarios.
* **No default attestation validation**: The implementation doesn't validate attestation statements by default.
* **Template support**: Only the Blazor Web App template includes passkey support.
* **No built-in 2FA support**: Passkeys are treated as a primary authentication factor, not as a second factor.

## Core concepts

Two fundamental processes underpin passkey operations: attestation and assertion.

### Attestation (registration)

*Attestation* is the process of creating and registering a new passkey. During attestation, the server generates a unique challenge that the authenticator must include in the returned credential. The authenticator creates a new key pair and returns the public key along with attestation data proving the key's origin. The server then verifies this attestation and stores the public key for future authentication attempts.

### Assertion (authentication)

*Assertion* is the process of authenticating with an existing passkey. The server generates a unique challenge, which the authenticator signs using the private key. The authenticator returns this signed assertion to the server, which verifies the signature using the previously stored public key. If the signature is valid, the user is authenticated.

## Prerequisites

* .NET SDK (.NET 10 or later)
* A modern web browser that supports WebAuthn.
* A device with a platform authenticator, such as Windows Hello or Apple secure enclave, or a security key.

## Security considerations

When implementing passkeys in ASP.NET Core Identity, ensure the app meets the security requirements described in this section.

### Host header validation

The implementation infers the Relying Party ID from the host header when `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain` isn't explicitly configured. The hosting environment must validate host headers to prevent credential-scoping attacks, which involve using compromised or stolen user credentials (usernames, passwords, tokens) to gain unauthorized access.

**Mitigation**: Either explicitly configure `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain` in `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions` or ensure that the hosting environment (Kestrel, IIS, reverse proxy) validates host headers. For configuration details, see your hosting platform's documentation. In addition to that, if you use forwarded headers middleware, explicitly configure `Microsoft.AspNetCore.Builder.ForwardedHeadersOptions.AllowedHosts`.

### Subdomain security

ASP.NET Core's passkeys implementation handles subdomain security through the `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain` configuration option. When `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain` isn't explicitly specified, the implementation uses the host header to determine the domain. This means that ***the page on which the passkey was registered controls the domain*** for that credential.

For example:

* If a passkey is registered on `app.contoso.com`, it also works on `*.app.contoso.com`.
* If registered on `contoso.com`, it also works on `*.contoso.com`.
* The browser enforces that passkeys can only be used on the domain (and subdomains) where they were registered.

**Requirement**: Apps requiring strict domain control should explicitly set `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain` rather than relying on the host header. Don't serve untrusted content on any subdomain within the `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain` scope. If you can't guarantee this, implement custom origin validation to restrict passkey usage to specific origins.

### HTTPS requirement

All passkey operations require HTTPS. The implementation stores authentication data in encrypted and signed cookies that could be intercepted over unencrypted connections.

**Requirement**: Always use HTTPS in production. Configure HTTP Strict Transport Security (HSTS) protocol to prevent protocol downgrade attacks.

### Account recovery

Account recovery is primarily a concern for apps that allow passkeys as the only authentication mechanism. The default Blazor Web App project template already requires users to set up a backup authentication method (password or external provider) when creating an account, so account recovery is handled through these existing mechanisms.

**Recommendations**:

For applications implementing passkey-only authentication, consider:

* Recovery codes generated during account creation.
* Email-based recovery flows.
* Mandatory registration of multiple passkeys.
* Monitoring the `Microsoft.AspNetCore.Identity.UserPasskeyInfo.IsBackedUp` flag on `Microsoft.AspNetCore.Identity.UserPasskeyInfo` to prompt users to add additional credentials.

### Administrative controls

When an authenticator model is discovered to have security vulnerabilities, you may need to revoke affected credentials. The implementation stores the complete attestation object with each credential, including the Authenticator Attestation GUID (AAGUID), which is a 128-bit identifier indicating the key type.

**Implementation**: Extract AAGUIDs from stored attestation objects, compare against known-compromised models, and revoke affected credentials. AAGUID reliability depends on whether your app validates attestation statements. To hook in custom attestation statement validation logic, see Custom attestation statement validation. Third-party libraries are available for attestation validation, such as the Passkeys - FIDO2 .NET Library (WebAuthn) (`passwordless-lib/fido2-net-lib` GitHub repository)&dagger;.

> **Warning:**
> &dagger;Third-party libraries, including `passwordless-lib/fido2-net-lib`, aren't owned or maintained by Microsoft and aren't covered by any Microsoft Support Agreement or license. Use caution when adopting a third-party library, especially for security features. Confirm that the library follows official specifications and adopts security best practices. Keep the library's version current to obtain the latest bug fixes.

### Resource limits

To prevent database exhaustion attacks, apps should enforce limits on passkey registration, such as:

* Maximum number of passkeys per user account.
* Maximum length for passkey display names.

The Blazor Web App template enforces these limits by default at the application level. For examples, see the following Razor components in the Blazor Web App project template:

* `Components/Account/Pages/Manage/Passkeys.razor`
* `Components/Account/Pages/Manage/RenamePasskey.razor`

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Configure passkey options

ASP.NET Core Identity provides various options to configure passkey behavior through the `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions` class, which include:

* `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.AuthenticatorTimeout`: Gets or sets the time that the browser should wait for the authenticator to provide a passkey as a `System.TimeSpan`. This option applies to both creating a new passkey and requesting an existing passkey. This option is treated as a hint to the browser, and the browser may ignore the option. The default value is 5 minutes.
* `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ChallengeSize`: Gets or sets the size of the challenge in bytes sent to the client during attestation and assertion. This option applies to both creating a new passkey and requesting an existing passkey. The default value is 32 bytes.
* `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions.ServerDomain`: Gets or sets the effective Relying Party ID (domain) of the server. This should be unique and will be used as the identity for the server. This option applies to both creating a new passkey and requesting an existing passkey. If `null`, which is the default value, the server's origin is used. For more information, see Relying Party Identifier RP ID.

Example configuration:

```csharp
builder.Services.Configure<IdentityPasskeyOptions>(options =>
{
    options.ServerDomain = "contoso.com";
    options.AuthenticatorTimeout = TimeSpan.FromMinutes(3);
    options.ChallengeSize = 64;
});
```

For a complete list of configuration options, see `Microsoft.AspNetCore.Identity.IdentityPasskeyOptions`. For the most up-to-date browser defaults, see the W3C WebAuthn specification.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next preview release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

## Custom attestation statement validation

By default, ASP.NET Core Identity doesn't validate attestation statements. This is suitable for most consumer authentication scenarios. If your app requires verification of authenticator properties or if you want to disallow specific authenticators from being used, for example, in enterprise environments that require a higher level of security, you can implement custom attestation validation:

```csharp
builder.Services.Configure<IdentityPasskeyOptions>(options =>
{
    options.VerifyAttestationStatement = async (context) =>
    {
        // Custom attestation validation logic
        // Return 'true' if the attestation is valid
        // Return 'false' if the attestation is invalid
        return true;
    };
});
```

> **Warning:**
> Attestation validation is complex and requires maintaining trust stores for authenticator certificates. Only implement custom validation if your app requires verification of specific authenticator properties.

## Custom origin validation

The default origin validation allows requests from subdomains and disallows cross-origin iframes. To customize this behavior:

```csharp
builder.Services.Configure<IdentityPasskeyOptions>(options =>
{
    options.ValidateOrigin = async (context) =>
    {
        // Custom origin validation logic
        //   Access the origin via 'context.Origin'
        //   Access the HTTP context via 'context.HttpContext'
        // Return 'true' if the origin is valid
        // Return 'false' if the origin is invalid
        return true;
    };
});
```
