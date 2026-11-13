---
title: "Key encryption at rest in Windows and Azure using ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/data-protection/implementation/key-encryption-at-rest.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Key <example-value> at rest in Windows and Azure using ASP.NET Core

The data protection system employs a discovery mechanism by default to determine how cryptographic keys should be encrypted at rest. The developer can override the discovery mechanism and manually specify how keys should be encrypted at rest.

> **Warning:**
> If you specify an explicit key <example-value> location, the data protection system deregisters the default key <example-value> at rest mechanism. Consequently, keys are no longer encrypted at rest. We recommend that you specify an explicit key <example-value> mechanism for production deployments. The encryption-at-rest mechanism options are described in this topic.

## Azure Key Vault

For more information, see Configure ASP.NET Core Data Protection.

## Windows DPAPI

**Only applies to Windows deployments.**

When Windows DPAPI is used, key <example-value> is encrypted with CryptProtectData before being persisted to storage. DPAPI is an appropriate encryption mechanism for data that's never read outside of the current machine (though it's possible to back these keys up to Active Directory). To configure DPAPI key-at-rest encryption, call one of the `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithDpapi*`) extension methods:

```csharp
// Only the local user account can decrypt the keys
services.AddDataProtection()
    .ProtectKeysWithDpapi();
```

If `ProtectKeysWithDpapi` is called with no parameters, only the current Windows user account can decipher the persisted key ring. You can optionally specify that any user account on the machine (not just the current user account) be able to decipher the key ring:

```csharp
// All user accounts on the machine can decrypt the keys
services.AddDataProtection()
    .ProtectKeysWithDpapi(protectToLocalMachine: true);
```

## X.509 certificate

If the app is spread across multiple machines, it may be convenient to distribute a shared X.509 certificate (`.pfx` format) across the machines and configure the hosted apps to use the certificate for encryption of keys at rest.

In the following example, the certificate's thumbprint is passed to `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithCertificate*`:

```csharp
services.AddDataProtection()
    .ProtectKeysWithCertificate("{CERTIFICATE THUMBPRINT}");
```

In the following example, an `System.Security.Cryptography.X509Certificates.X509Certificate2` is passed to `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithCertificate*`:

```csharp
var cert = new X509Certificate2(...);

services.AddDataProtection()
    .ProtectKeysWithCertificate(cert);
```

To create the certificate, use one of the following approaches or any other suitable tool or online service:

* `dotnet dev-certs` command
* `New-SelfSignedCertificate` PowerShell command
* Azure Key Vault
* MakeCert on Windows
* OpenSSL

For more information, see Generate self-signed certificates with the .NET CLI.

Due to .NET Framework limitations, only certificates with CAPI private keys are supported. See the content below for possible workarounds to these limitations.

## Windows DPAPI-NG

**This mechanism is available only on Windows 8/Windows Server 2012 or later.**

Beginning with Windows 8, Windows OS supports DPAPI-NG (also called CNG DPAPI). For more information, see About CNG DPAPI.

The principal is encoded as a protection descriptor rule. In the following example that calls `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithDpapiNG*`, only the domain-joined user with the specified SID can decrypt the key ring:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Uses the descriptor rule "SID=S-1-5-21-..."
    services.AddDataProtection()
        .ProtectKeysWithDpapiNG("SID=S-1-5-21-...",
        flags: DpapiNGProtectionDescriptorFlags.None);
}
```

There's also a parameterless overload of `ProtectKeysWithDpapiNG`. Use this convenience method to specify the rule "SID={CURRENT_ACCOUNT_SID}", where *CURRENT_ACCOUNT_SID* is the SID of the current Windows user account:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // Use the descriptor rule "SID={current account SID}"
    services.AddDataProtection()
        .ProtectKeysWithDpapiNG();
}
```

In this scenario, the AD domain controller is responsible for distributing the encryption keys used by the DPAPI-NG operations. The target user can decipher the encrypted payload from any domain-joined machine (provided that the process is running under their identity).

## Certificate-based encryption with Windows DPAPI-NG

If the app is running on Windows 8.1/Windows Server 2012 R2 or later, you can use Windows DPAPI-NG to perform certificate-based encryption. Use the rule descriptor string "CERTIFICATE=HashId:{CERTIFICATE THUMBPRINT}", where the `{CERTIFICATE THUMBPRINT}` placeholder is the hex-encoded SHA1 thumbprint of the certificate:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddDataProtection()
        .ProtectKeysWithDpapiNG("CERTIFICATE=HashId:{CERTIFICATE THUMBPRINT}",
            flags: DpapiNGProtectionDescriptorFlags.None);
}
```

Any app pointed at this repository must be running on Windows 8.1/Windows Server 2012 R2 or later to decipher the keys.

## Custom key <example-value>

If the in-box mechanisms aren't appropriate, the developer can specify their own key <example-value> mechanism by providing a custom `Microsoft.AspNetCore.DataProtection.XmlEncryption.IXmlEncryptor`.
