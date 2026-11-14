---
title: "Data Protection key management and lifetime in ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/security/data-protection/configuration/default-settings.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Data Protection key <example-value> and lifetime in ASP.NET Core

By Rick Anderson

## Key <example-value>

The app attempts to detect its operational environment and handle key <example-value> on its own.

1. If the app is hosted in Azure Apps, keys are persisted to the *%HOME%\ASP.NET\DataProtection-Keys* folder. This folder is backed by network storage and is synchronized across all machines hosting the app.
   * Keys aren't protected at rest.
   * The *DataProtection-Keys* folder supplies the key ring to all instances of an app in a single deployment slot.
   * Separate deployment slots, such as Staging and Production, don't share a key ring. When you swap between deployment slots, for example swapping Staging to Production or using A/B testing, any app using Data Protection won't be able to decrypt stored data using the key ring inside the previous slot. This leads to users being logged out of an app that uses the standard ASP.NET Core cookie authentication, as it uses Data Protection to protect its cookies. If you desire slot-independent key rings, use an external key ring provider, such as Azure Blob Storage, Azure Key Vault, a SQL store, or Redis cache.

1. If the user profile is available, keys are persisted to the *%LOCALAPPDATA%\ASP.NET\DataProtection-Keys* folder. If the operating system is Windows, the keys are encrypted at rest using DPAPI.

   The app pool's setProfileEnvironment attribute must also be enabled. The default value of `setProfileEnvironment` is `true`. In some scenarios (for example, Windows OS), `setProfileEnvironment` is set to `false`. If keys aren't stored in the user profile directory as expected:

   1. Navigate to the *%windir%/system32/inetsrv/config* folder.
   1. Open the *applicationHost.config* file.
   1. Locate the `<system.applicationHost><applicationPools><applicationPoolDefaults><processModel>` element.
   1. Confirm that the `setProfileEnvironment` attribute isn't present, which defaults the value to `true`, or explicitly set the attribute's value to `true`.

1. If the app is hosted in IIS, keys are persisted to the HKLM registry in a special registry key that's ACLed only to the worker process account. Keys are encrypted at rest using DPAPI.

1. If none of these conditions match, keys aren't persisted outside of the current process. When the process shuts down, all generated keys are lost.

The developer is always in full control and can override how and where keys are stored. The first three options above should provide good defaults for most apps similar to how the ASP.NET **\<machineKey>** auto-generation routines worked in the past. The final, fallback option is the only scenario that requires the developer to specify configuration upfront if they want key <example-value>, but this fallback only occurs in rare situations.

When hosting in a Docker container, keys should be persisted in a folder that's a Docker volume (a shared volume or a host-mounted volume that persists beyond the container's lifetime) or in an external provider, such as Azure Key Vault or Redis. An external provider is also useful in web farm scenarios if apps can't access a shared network volume (see PersistKeysToFileSystem for more information).

> **Warning:**
> If the developer overrides the rules outlined above and points the Data Protection system at a specific key <example-value>, automatic encryption of keys at rest is disabled. At-rest protection can be re-enabled via configuration.

## Key <example-value>

Keys have a 90-day lifetime by default. When a key <example-value>, the app automatically generates a new key and sets the new key as the active key. As long as retired keys remain on the system, your app can decrypt any data protected with them. See key <example-value> for more information.

## Default algorithms

The default payload protection algorithm used is AES-256-CBC for confidentiality and HMACSHA256 for authenticity. A 512-bit master key, changed every 90 days, is used to derive the two sub-keys used for these algorithms on a per-payload basis. See subkey <example-value> for more information.

### Delete keys

Deleting a key makes its protected data permanently inaccessible. To mitigate that risk, we recommend not deleting keys. The resulting accumulation of keys generally has minimal impact because they're small. In exceptional cases, such as extremely long-running services, keys can be deleted. Only delete keys:

* That are old (no longer in use).
* When you can accept the risk of data loss in exchange for storage savings.

We recommend not deleting data protection keys.

```csharp
﻿using Microsoft.AspNetCore.DataProtection.KeyManagement;

var services = new ServiceCollection();
services.AddDataProtection();

var serviceProvider = services.BuildServiceProvider();

var keyManager = serviceProvider.GetService<IKeyManager>();

if (keyManager is IDeletableKeyManager deletableKeyManager)
{
    var utcNow = DateTimeOffset.UtcNow;
    var yearAgo = utcNow.AddYears(-1);

    if (!deletableKeyManager.DeleteKeys(key => key.ExpirationDate < yearAgo))
    {
        Console.WriteLine("Failed to delete keys.");
    }
    else
    {
        Console.WriteLine("Old keys deleted successfully.");
    }
}
else
{
    Console.WriteLine("Key <example-value> does not support deletion.");
}
```
## Related content

* Key <example-value> extensibility in ASP.NET Core
* Host ASP.NET Core in a web farm
