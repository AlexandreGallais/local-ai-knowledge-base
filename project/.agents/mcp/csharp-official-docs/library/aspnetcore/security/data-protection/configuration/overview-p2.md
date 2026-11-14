---
title: "Configure ASP.NET Core Data Protection (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/data-protection/configuration/overview.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Data Protection (part 2 of 3)

## Protect keys configuration API (`ProtectKeysWith\*`)

You can configure the system to protect keys at rest by calling any of the `ProtectKeysWith\*` configuration APIs. Consider the example below, which stores keys on a UNC share and encrypts those keys at rest with a specific X.509 certificate.

You can provide an `System.Security.Cryptography.X509Certificates.X509Certificate2` to `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.ProtectKeysWithCertificate*` from a file by calling `System.Security.Cryptography.X509Certificates.X509CertificateLoader.LoadCertificateFromFile*`:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"\\server\share\directory\"))
    .ProtectKeysWithCertificate(
        new X509Certificate2("<example-value>", builder.Configuration["<example-value>"]));
```
The following code example demonstrates how to load a certificate using a thumbprint:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"\\server\share\directory\"))
    .ProtectKeysWithCertificate(builder.Configuration["CertificateThumbprint"]);
```
For examples and discussion on the built-in key <example-value> mechanisms, see Key <example-value> at rest in Windows and Azure using ASP.NET Core.

## Unprotect keys with any certificate (`UnprotectKeysWithAnyCertificate`)

You can rotate certificates and decrypt keys at rest using an array of `System.Security.Cryptography.X509Certificates.X509Certificate2` certificates with `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.UnprotectKeysWithAnyCertificate*`:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"\\server\share\directory\"))
    .ProtectKeysWithCertificate(
        new X509Certificate2("<example-value>", builder.Configuration["<example-value>"]))
    .UnprotectKeysWithAnyCertificate(
        new X509Certificate2("<example-value>", builder.Configuration["<example-value>"]),
        new X509Certificate2("<example-value>", builder.Configuration["<example-value>"]));
```
## Set the default key <example-value> (`SetDefaultKeyLifetime`)

To configure the system to use a key <example-value> of 14 days instead of the default 90 days, use `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetDefaultKeyLifetime*`:

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

## Disable automatic key <example-value> (`DisableAutomaticKeyGeneration`)

You may have a scenario where you don't want an app to automatically roll keys (create new keys) as they approach expiration. One example of this scenario might be apps set up in a primary/secondary relationship, where only the primary app is responsible for key <example-value> concerns and secondary apps simply have a read-only view of the key ring. The secondary apps can be configured to treat the key ring as read-only by configuring the system with `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.DisableAutomaticKeyGeneration*`:

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

* When multiple apps are pointed at the same key <example-value>, the intention is that the apps share the same master key material. Data Protection is developed with the assumption that all apps sharing a key ring can access all items in that key ring. The application unique identifier is used to isolate application specific keys derived from the key ring provided keys. It doesn't expect item level permissions, such as those provided by Azure KeyVault to be used to enforce extra isolation. Attempting item level permissions generates application errors. If you don't want to rely on the built-in application isolation, separate key store locations should be used and not shared between applications.

* The application discriminator (`Microsoft.AspNetCore.DataProtection.DataProtectionOptions.ApplicationDiscriminator`) is used to allow different apps to share the same master key <example-value> but to keep their cryptographic payloads distinct from one another.  For the apps to be able to read each other's cryptographic payloads, they must have the same application discriminator, which can be set by calling `SetApplicationName`.

* If an app is compromised (for example, by an RCE attack), all master key <example-value> accessible to that app must also be considered compromised, regardless of its protection-at-rest state. This implies that if two apps are pointed at the same repository, even if they use different app discriminators, a compromise of one is functionally equivalent to a compromise of both.

  This "functionally equivalent to a compromise of both" clause holds even if the two apps use different mechanisms for key <example-value> at rest. Typically, this isn't an expected configuration. The protection-at-rest mechanism is intended to provide protection in the event a cyberattacker gains read access to the repository. A cyberattacker who gains write access to the repository (perhaps because they attained code execution permission within an app) can insert malicious keys into storage. The Data Protection system intentionally doesn't provide protection against a cyberattacker who gains write access to the key repository.

* If apps need to remain truly isolated from one another, they should use different key repositories. This naturally falls out of the definition of "isolated". Apps are ***not*** isolated if they all have Read and Write access to each other's data stores.
