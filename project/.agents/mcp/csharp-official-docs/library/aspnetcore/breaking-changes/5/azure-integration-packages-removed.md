---
title: "Breaking change: Azure: Microsoft-prefixed Azure integration packages removed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/azure-integration-packages-removed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Azure: Microsoft-prefixed Azure integration packages removed

The following `Microsoft.*` packages that provide integration between ASP.NET Core and Azure SDKs aren't included in ASP.NET Core 5.0:

* Microsoft.Extensions.Configuration.AzureKeyVault, which integrates Azure Key Vault into the Configuration system.
* Microsoft.AspNetCore.DataProtection.AzureKeyVault, which integrates Azure Key Vault into the ASP.NET Core Data Protection system.
* Microsoft.AspNetCore.DataProtection.AzureStorage, which integrates Azure Blob Storage into the ASP.NET Core Data Protection system.

For discussion on this issue, see dotnet/aspnetcore#19570.

## Version introduced

5.0 Preview 1

## Old behavior

The `Microsoft.*` packages integrated Azure services with the Configuration and Data Protection APIs.

## New behavior

New `Azure.*` packages integrate Azure services with the Configuration and Data Protection APIs.

## Reason for change

The change was made because the `Microsoft.*` packages were:

* Using outdated versions of the Azure SDK. Simple updates weren't possible because the new versions of the Azure SDK included breaking changes.
* Tied to the .NET Core release schedule. Transferring ownership of the packages to the Azure SDK team enables package updates as the Azure SDK is updated.

## Recommended action

In ASP.NET Core 2.1 or later projects, replace the old `Microsoft.*` with the new `Azure.*` packages.

| Old | New |
|--|--|
| `Microsoft.AspNetCore.DataProtection.AzureKeyVault` | Azure.Extensions.AspNetCore.DataProtection.Keys |
| `Microsoft.AspNetCore.DataProtection.AzureStorage` | Azure.Extensions.AspNetCore.DataProtection.Blobs |
| `Microsoft.Extensions.Configuration.AzureKeyVault` | Azure.Extensions.AspNetCore.Configuration.Secrets |

The new packages use a new version of the Azure SDK that includes breaking changes. The general usage patterns are unchanged. Some overloads and options may differ to adapt to changes in the underlying Azure SDK APIs.

The old packages will:

* Be supported by the ASP.NET Core team for the lifetime of .NET Core 2.1 and 3.1.
* Not be included in .NET 5.

When upgrading your project to .NET 5, transition to the `Azure.*` packages to maintain support.

## Affected APIs

- `Microsoft.Extensions.Configuration.AzureKeyVaultConfigurationExtensions.AddAzureKeyVault*`
- `Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.ProtectKeysWithAzureKeyVault*`
- `Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage*`
