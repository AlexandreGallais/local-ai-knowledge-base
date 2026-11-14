---
title: "Configure ASP.NET Core Data Protection (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/data-protection/configuration/overview.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Data Protection (part 3 of 3)

## Changing algorithms with `UseCryptographicAlgorithms`

The Data Protection stack allows you to change the default algorithm used by newly generated keys. The simplest way to do this is to call `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.UseCryptographicAlgorithms*` from the configuration callback:

```csharp
builder.Services.AddDataProtection()
    .UseCryptographicAlgorithms(new AuthenticatedEncryptorConfiguration
    {
        EncryptionAlgorithm = EncryptionAlgorithm.AES_256_CBC,
        ValidationAlgorithm = ValidationAlgorithm.HMACSHA256
    });
```
The default EncryptionAlgorithm is AES-256-CBC, and the default ValidationAlgorithm is HMACSHA256. The default policy can be set by a system administrator via a machine-wide policy, but an explicit call to `UseCryptographicAlgorithms` overrides the default policy.

Calling `UseCryptographicAlgorithms` allows you to specify the desired algorithm from a predefined built-in list. You don't need to worry about the implementation of the algorithm. In the scenario above, the Data Protection system attempts to use the CNG implementation of AES if running on Windows. Otherwise, it falls back to the managed `System.Security.Cryptography.Aes` class.

You can manually specify an implementation via a call to `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.UseCustomCryptographicAlgorithms*`.

> **Tip:**
> Changing algorithms doesn't affect existing keys in the key ring. It only affects newly-generated keys.

### Specifying custom managed algorithms

To specify custom managed algorithms, create a `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel.ManagedAuthenticatedEncryptorConfiguration` instance that points to the implementation types:

```csharp
builder.Services.AddDataProtection()
    .UseCustomCryptographicAlgorithms(new ManagedAuthenticatedEncryptorConfiguration
    {
        // A type that subclasses SymmetricAlgorithm
        EncryptionAlgorithmType = typeof(Aes),

        // Specified in bits
        EncryptionAlgorithmKeySize = 256,

        // A type that subclasses KeyedHashAlgorithm
        ValidationAlgorithmType = typeof(HMACSHA256)
    });
```
Generally the \*Type properties must point to concrete, instantiable (via a public parameterless ctor) implementations of `System.Security.Cryptography.SymmetricAlgorithm` and `System.Security.Cryptography.KeyedHashAlgorithm`, though the system special-cases some values like `typeof(Aes)` for convenience.

> **Note:**
> The SymmetricAlgorithm must have a key <example-value> of ≥ 128 bits and a block size of ≥ 64 bits, and it must support CBC-mode encryption with PKCS #7 padding. The KeyedHashAlgorithm must have a digest size of >= 128 bits, and it must support keys of length equal to the hash algorithm's digest length. The KeyedHashAlgorithm isn't strictly required to be HMAC.

### Specifying custom Windows CNG algorithms

To specify a custom Windows CNG algorithm using CBC-mode encryption with HMAC validation, create a `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel.CngCbcAuthenticatedEncryptorConfiguration` instance that contains the algorithmic information:

```csharp
builder.Services.AddDataProtection()
    .UseCustomCryptographicAlgorithms(new CngCbcAuthenticatedEncryptorConfiguration
    {
        // Passed to BCryptOpenAlgorithmProvider
        EncryptionAlgorithm = "AES",
        EncryptionAlgorithmProvider = null,

        // Specified in bits
        EncryptionAlgorithmKeySize = 256,

        // Passed to BCryptOpenAlgorithmProvider
        HashAlgorithm = "SHA256",
        HashAlgorithmProvider = null
    });
```
> **Note:**
> The symmetric block cipher algorithm must have a key <example-value> of >= 128 bits, a block size of >= 64 bits, and it must support CBC-mode encryption with PKCS #7 padding. The hash algorithm must have a digest size of >= 128 bits and must support being opened with the BCRYPT\_ALG\_HANDLE\_HMAC\_FLAG flag. The \*Provider properties can be set to null to use the default provider for the specified algorithm. For more information, see the BCryptOpenAlgorithmProvider documentation.

To specify a custom Windows CNG algorithm using Galois/Counter Mode encryption with validation, create a `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel.CngGcmAuthenticatedEncryptorConfiguration` instance that contains the algorithmic information:

```csharp
builder.Services.AddDataProtection()
    .UseCustomCryptographicAlgorithms(new CngGcmAuthenticatedEncryptorConfiguration
    {
        // Passed to BCryptOpenAlgorithmProvider
        EncryptionAlgorithm = "AES",
        EncryptionAlgorithmProvider = null,

        // Specified in bits
        EncryptionAlgorithmKeySize = 256
    });
```
> **Note:**
> The symmetric block cipher algorithm must have a key <example-value> of >= 128 bits, a block size of exactly 128 bits, and it must support GCM encryption. You can set the `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel.CngCbcAuthenticatedEncryptorConfiguration.EncryptionAlgorithmProvider` property to null to use the default provider for the specified algorithm. For more information, see the BCryptOpenAlgorithmProvider documentation.

### Specifying other custom algorithms

Though not exposed as a first-class API, the Data Protection system is extensible enough to allow specifying almost any kind of algorithm. For example, it's possible to keep all keys contained within a Hardware Security Module (HSM) and to provide a custom implementation of the core encryption and decryption routines. For more information, see `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptor` in Core cryptography extensibility.

## Persisting keys when hosting in a Docker container

When hosting in a Docker container, keys should be maintained in either:

* A folder that's a Docker volume that persists beyond the container's lifetime, such as a shared volume or a host-mounted volume.
* An external provider, such as Azure Blob Storage (shown in the `ProtectKeysWithAzureKeyVault` section) or Redis.

## Persisting keys with Redis

Only Redis versions supporting Redis Data Persistence should be used to store keys. Azure Blob storage is persistent and can be used to store keys. For more information, see this GitHub issue.

## Logging

Enable the `Information` or lower level of logging to diagnose problems. The following `appsettings.json` file enables information logging of the Data Protection API:

```csharp
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "Microsoft.AspNetCore.DataProtection": "Information"
    }
  },
  "AllowedHosts": "*"
}
```
For more information on logging, see Logging in .NET and ASP.NET Core.

## Additional resources

* Non-DI aware scenarios for Data Protection in ASP.NET Core
* Data Protection machine-wide policy support in ASP.NET Core
* Host ASP.NET Core in a web farm
* Key <example-value> providers in ASP.NET Core
