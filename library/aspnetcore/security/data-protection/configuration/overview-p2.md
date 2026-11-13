---
title: "Configure ASP.NET Core Data Protection (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/data-protection/configuration/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Data Protection (part 2 of 3)

## Unprotect keys with any certificate (`UnprotectKeysWithAnyCertificate`)

You can rotate certificates and decrypt keys at rest using an array of `System.Security.Cryptography.X509Certificates.X509Certificate2` certificates with `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.UnprotectKeysWithAnyCertificate*`:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"\\server\share\directory\"))
    .ProtectKeysWithCertificate(
        new X509Certificate2("certificate.pfx", builder.Configuration["CertificatePassword"]))
    .UnprotectKeysWithAnyCertificate(
        new X509Certificate2("certificate_1.pfx", builder.Configuration["CertificatePassword_1"]),
        new X509Certificate2("certificate_2.pfx", builder.Configuration["CertificatePassword_2"]));
```
## Set the default key lifetime (`SetDefaultKeyLifetime`)

To configure the system to use a key lifetime of 14 days instead of the default 90 days, use `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetDefaultKeyLifetime*`:

```csharp
builder.Services.AddDataProtection()
    .SetDefaultKeyLifetime(TimeSpan.FromDays(14));
```
## Set the application name (`SetApplicationName`)

By default, the Data Protection system isolates apps from one another based on their content root paths, even if they share the same physical key repository. This isolation prevents the apps from understanding each other's protected payloads.

To share protected payloads among apps:

* Configure `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` in each app with the same value.
* Use the same version of the Data Protection API stack across the apps. Perform **either** of the following in the apps' project files:
  * Reference the same shared framework version via the Microsoft.AspNetCore.App metapackage.
  * Reference the same Data Protection package version.

```csharp
builder.Services.AddDataProtection()
    .SetApplicationName("<sharedApplicationName>");
```
`Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` internally sets `Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`. For troubleshooting purposes, the value assigned to the discriminator by the framework can be logged with the following code placed after the `Microsoft.AspNetCore.Builder.WebApplication` is built in `Program.cs`:

```csharp
var discriminator = app.Services.GetRequiredService<IOptions<DataProtectionOptions>>()
    .Value.ApplicationDiscriminator;
app.Logger.LogInformation("ApplicationDiscriminator: {ApplicationDiscriminator}", discriminator);
```

For more information on how the discriminator is used, see the following sections later in this article:

* Per-application isolation
* Data Protection and app isolation

> **Warning:**
> In .NET 6, `Microsoft.AspNetCore.Builder.WebApplicationBuilder` normalizes the content root path to end with a `System.IO.Path.DirectorySeparatorChar`. For example, on Windows the content root path ends in `\` and on Linux `/`. Other hosts don't normalize the path. Most apps migrating from `Microsoft.Extensions.Hosting.HostBuilder` or  `Microsoft.AspNetCore.Hosting.WebHostBuilder` won't share the same app name because they won't have the terminating `DirectorySeparatorChar`. To work around this issue, remove the directory separator character and set the app name manually, as shown in the following code:
>
> ```csharp
> using System.Reflection;
> using Microsoft.AspNetCore.DataProtection;
>
> var builder = WebApplication.CreateBuilder(args);
>
> var trimmedContentRootPath =
>     builder.Environment.ContentRootPath.TrimEnd(Path.DirectorySeparatorChar);
>
> builder.Services.AddDataProtection().SetApplicationName(trimmedContentRootPath);
>
> var app = builder.Build();
>
> app.MapGet("/", () => Assembly.GetEntryAssembly()!.GetName().Name);
>
> app.Run();
> ```

## Disable automatic key generation (`DisableAutomaticKeyGeneration`)

You may have a scenario where you don't want an app to automatically roll keys (create new keys) as they approach expiration. One example of this scenario might be apps set up in a primary/secondary relationship, where only the primary app is responsible for key management concerns and secondary apps simply have a read-only view of the key ring. The secondary apps can be configured to treat the key ring as read-only by configuring the system with `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.DisableAutomaticKeyGeneration*`:

```csharp
builder.Services.AddDataProtection()
    .DisableAutomaticKeyGeneration();
```
## Per-application isolation

When the Data Protection system is provided by an ASP.NET Core host, it automatically isolates apps from one another, even if those apps are running under the same worker process account and are using the same master keying material. This is similar to the IsolateApps modifier from System.Web's `<machineKey>` element.

The isolation mechanism works by considering each app on the local machine as a unique tenant, thus the `Microsoft.AspNetCore.DataProtection.IDataProtector` rooted for any given app automatically includes the app ID as a discriminator (`Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`). The app's unique ID is the app's physical path:

* For apps hosted in IIS, the unique ID is the IIS physical path of the app. If an app is deployed in a web farm environment, this value is stable assuming that the IIS environments are configured similarly across all machines in the web farm.
* For self-hosted apps running on the Kestrel server, the unique ID is the physical path to the app on disk.

The unique identifier is designed to survive resets—both of the individual app and of the machine itself.

This isolation mechanism assumes that the apps aren't malicious. A malicious app can always impact any other app running under the same worker process account. In a shared hosting environment where apps are mutually untrusted, the hosting provider should take steps to ensure OS-level isolation between apps, including separating the apps' underlying key repositories.

If the Data Protection system isn't provided by an ASP.NET Core host (for example, if you instantiate it via the `DataProtectionProvider` concrete type) app isolation is disabled by default. When app isolation is disabled, all apps backed by the same keying material can share payloads as long as they provide the appropriate purposes. To provide app isolation in this environment, call the `SetApplicationName` method on the configuration object and provide a unique name for each app.

### Data Protection and app isolation

Consider the following points for app isolation:

* When multiple apps are pointed at the same key repository, the intention is that the apps share the same master key material. Data Protection is developed with the assumption that all apps sharing a key ring can access all items in that key ring. The application unique identifier is used to isolate application specific keys derived from the key ring provided keys. It doesn't expect item level permissions, such as those provided by Azure KeyVault to be used to enforce extra isolation. Attempting item level permissions generates application errors. If you don't want to rely on the built-in application isolation, separate key store locations should be used and not shared between applications.

* The application discriminator (`Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`) is used to allow different apps to share the same master key material but to keep their cryptographic payloads distinct from one another.  For the apps to be able to read each other's cryptographic payloads, they must have the same application discriminator, which can be set by calling `SetApplicationName`.

* If an app is compromised (for example, by an RCE attack), all master key material accessible to that app must also be considered compromised, regardless of its protection-at-rest state. This implies that if two apps are pointed at the same repository, even if they use different app discriminators, a compromise of one is functionally equivalent to a compromise of both.

  This "functionally equivalent to a compromise of both" clause holds even if the two apps use different mechanisms for key protection at rest. Typically, this isn't an expected configuration. The protection-at-rest mechanism is intended to provide protection in the event a cyberattacker gains read access to the repository. A cyberattacker who gains write access to the repository (perhaps because they attained code execution permission within an app) can insert malicious keys into storage. The Data Protection system intentionally doesn't provide protection against a cyberattacker who gains write access to the key repository.

* If apps need to remain truly isolated from one another, they should use different key repositories. This naturally falls out of the definition of "isolated". Apps are ***not*** isolated if they all have Read and Write access to each other's data stores.

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
> The SymmetricAlgorithm must have a key length of ≥ 128 bits and a block size of ≥ 64 bits, and it must support CBC-mode encryption with PKCS #7 padding. The KeyedHashAlgorithm must have a digest size of >= 128 bits, and it must support keys of length equal to the hash algorithm's digest length. The KeyedHashAlgorithm isn't strictly required to be HMAC.

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
> The symmetric block cipher algorithm must have a key length of >= 128 bits, a block size of >= 64 bits, and it must support CBC-mode encryption with PKCS #7 padding. The hash algorithm must have a digest size of >= 128 bits and must support being opened with the BCRYPT\_ALG\_HANDLE\_HMAC\_FLAG flag. The \*Provider properties can be set to null to use the default provider for the specified algorithm. For more information, see the BCryptOpenAlgorithmProvider documentation.

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
> The symmetric block cipher algorithm must have a key length of >= 128 bits, a block size of exactly 128 bits, and it must support GCM encryption. You can set the `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.ConfigurationModel.CngCbcAuthenticatedEncryptorConfiguration.EncryptionAlgorithmProvider` property to null to use the default provider for the specified algorithm. For more information, see the BCryptOpenAlgorithmProvider documentation.

### Specifying other custom algorithms

Though not exposed as a first-class API, the Data Protection system is extensible enough to allow specifying almost any kind of algorithm. For example, it's possible to keep all keys contained within a Hardware Security Module (HSM) and to provide a custom implementation of the core encryption and decryption routines. For more information, see `Microsoft.AspNetCore.DataProtection.AuthenticatedEncryption.IAuthenticatedEncryptor` in Core cryptography extensibility.
