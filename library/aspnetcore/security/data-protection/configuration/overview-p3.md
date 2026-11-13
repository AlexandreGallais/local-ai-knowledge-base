---
title: "Configure ASP.NET Core Data Protection (part 3 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/data-protection/configuration/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Data Protection (part 3 of 3)

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
* Key storage providers in ASP.NET Core
