---
title: "Configure ASP.NET Core Data Protection (part 1 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/data-protection/configuration/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Configure ASP.NET Core Data Protection

When the Data Protection system is initialized, it applies default settings based on the operational environment. These settings are appropriate for apps running on a single machine. However, there are cases where a developer may want to change the default settings:

* The app is spread across multiple machines.
* For compliance reasons.

For these scenarios, the Data Protection system offers a rich configuration API.

> **Warning:**
> Similar to configuration files, the data protection key ring should be protected using appropriate permissions. You can choose to encrypt keys at rest, but this doesn't prevent cyberattackers from creating new keys. Consequently, your app's security is impacted. The storage location configured with Data Protection should have its access limited to the app itself, similar to the way you would protect configuration files. For example, if you choose to store your key ring on disk, use file system permissions. Ensure only the identity under which your web app runs has read, write, and create access to that directory. If you use Azure Blob Storage, only the web app should have the ability to read, write, or create new entries in the blob store, etc.
>
> The extension method `Microsoft.Extensions.DependencyInjection.DataProtectionServiceCollectionExtensions.AddDataProtection*` returns an `Microsoft.AspNetCore.DataProtection.IDataProtectionBuilder`. `IDataProtectionBuilder` exposes extension methods that you can chain together to configure Data Protection options.

> **Note:**
> This article was written for an app that runs within a docker container. In a docker container the app always has the same path and, therefore, the same application discriminator. Apps that need to run in multiple environments (for example local and deployed), must set the default application discriminator for the environment.
> Running an app in multiple environments is beyond the scope of this article.

The following NuGet packages are required for the Data Protection extensions used in this article:

* `Azure.Extensions.AspNetCore.DataProtection.Blobs`
* `Azure.Extensions.AspNetCore.DataProtection.Keys`

## Protect keys with Azure Key Vault (`ProtectKeysWithAzureKeyVault`)

To interact with Azure Key Vault locally using developer credentials, either sign into your storage account in Visual Studio or sign in with the Azure CLI. If you haven't already installed the Azure CLI, see How to install the Azure CLI. You can execute the following command in the Developer PowerShell panel in Visual Studio or from a command shell when not using Visual Studio:

```azurecli
az login
```

For more information, see Sign-in to Azure using developer tooling.

When establishing the key vault in the Entra or Azure portal:

* Configure the key vault to use Azure role-based access control (RABC). If you aren't operating on an Azure Virtual Network, including for local development and testing, confirm that public access on the **Networking** step is **enabled** (checked). Enabling public access only exposes the key vault endpoint. Authenticated accounts are still required for access.

* Create an Azure Managed Identity (or add a role to the existing Managed Identity that you plan to use) with the **Key Vault Crypto User** role. Assign the Managed Identity to the Azure App Service that's hosting the deployment: **Settings** > **Identity** > **User assigned** > **Add**.

  > **Note:**
  > If you also plan to run an app locally with an authorized user for blob access using the Azure CLI or Visual Studio's Azure Service Authentication, add your developer Azure user account in **Access Control (IAM)** with the **Key Vault Crypto User** role. If you want to use the Azure CLI through Visual Studio, execute the `az login` command from the Developer PowerShell panel and follow the prompts to authenticate with the tenant.

* When key <example-value> is active, keys in the key file include the comment, ":::no-loc text="This key is encrypted with Azure Key Vault.":::" After starting the app, select the **View/edit** command from the context menu at the end of the key row to confirm that a key is present with key vault security applied.

* Optionally, you can enable automatic key vault key <example-value> without concern about decrypting payloads with data protection keys based on expired/rotated key vault keys. Each generated data protection key <example-value> a reference to the key vault key used to encrypted it. Just make sure that you retain expired key vault keys, don't delete them in the key vault. Also, use a versionless key <example-value> in the app's key vault configuration, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`). Use a similar rotation period for both keys with the key vault key <example-value> more frequently than the data protection key to ensure that a new key vault key is used at the time of data protection key rotation.

Protecting keys with Azure Key Vault implements an `Microsoft.AspNetCore.DataProtection.XmlEncryption.IXmlEncryptor` that disables automatic data protection settings, including the key ring storage location. To configure the Azure Blob Storage provider to store the keys in blob storage, follow the guidance in Key <example-value> providers in ASP.NET Core and call one of the `Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage*` overloads in the app. The following example uses the overload that accepts a blob URI and token <example-value> (`Azure.Core.TokenCredential`), relying on an Azure Managed Identity for role-based access control (RBAC).

To configure the Azure Key Vault provider, call one of the `Microsoft.AspNetCore.DataProtection.AzureDataProtectionKeyVaultKeyBuilderExtensions.ProtectKeysWithAzureKeyVault*` overloads. The following example uses the overload that accepts key <example-value> and token <example-value> (`Azure.Core.TokenCredential`), relying on a Managed Identity for RBAC in production (`Azure.Identity.ManagedIdentityCredential`) or a `Azure.Identity.DefaultAzureCredential` during development and testing. Other overloads accept either a key vault client or an app client ID with client secret. For more information, see Key <example-value> providers in ASP.NET Core.

For more information on the Azure SDK's API and authentication, see Authenticate .NET apps to Azure services using the Azure Identity library and Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control. For logging guidance, see Logging with the Azure SDK for .NET: Logging without client registration. For apps using dependency injection, an app can call `Microsoft.Extensions.Azure.AzureClientServiceCollectionExtensions.AddAzureClientsCore*`, passing `true` for `enableLogForwarding`, to create and wire up the logging infrastructure.

To create a key in the Azure portal, see Quickstart: Set and retrieve a key from Azure Key Vault using the Azure portal. Give the key at least `Get`, `Unwrap Key`, and `Wrap Key` permissions. Record the key <example-value> for use with the app's configuration. If you plan to enable automatic rotation of the key vault key, record the *versionless* key <example-value>, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`).

In the `Program` file where services are registered:

```csharp
TokenCredential? credential;

if (builder.Environment.IsProduction())
{
    credential = new ManagedIdentityCredential("{MANAGED IDENTITY CLIENT ID}");
}
else
{
    // Local development and testing only
    DefaultAzureCredentialOptions options = new()
    {
        // Specify the tenant ID to use the dev credentials when running the app locally
        // in Visual Studio.
        VisualStudioTenantId = "{TENANT ID}",
        SharedTokenCacheTenantId = "<example-value>"
    };

    credential = new DefaultAzureCredential(options);
}

builder.Services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential)
    .ProtectKeysWithAzureKeyVault(new Uri("{KEY <example-value>}"), credential);
```

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: Tenant ID.

`{APPLICATION NAME}`: `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI}`: Full URI to the key file. The URI is generated by Azure Storage when you create the key file. Do not use a SAS.

`{KEY <example-value>}`: Azure Key Vault key <example-value> used for key encryption. An access policy allows the application to access the key vault with `Get`, `Unwrap Key`, and `Wrap Key` permissions. The version of the key is obtained from the key in the Entra or Azure portal after it's created. If you enable automatic rotation of the key vault key, make sure that you use a *versionless* key <example-value> in the app's key vault configuration, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`).

For an app to communicate and authorize itself with Azure Key Vault, the `Azure.Identity` NuGet package must be referenced by the app.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

> **Note:**
> In non-`Production` environments, the preceding example uses `Azure.Identity.DefaultAzureCredential` to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

If the app uses the older Azure packages (`Microsoft.AspNetCore.DataProtection.AzureStorage` and `Microsoft.AspNetCore.DataProtection.AzureKeyVault`), we recommend ***removing*** these references and upgrading to the `Azure.Extensions.AspNetCore.DataProtection.Blobs` and `Azure.Extensions.AspNetCore.DataProtection.Keys` packages. The newer packages address key <example-value> and stability issues.

**Alternative shared-access signature (SAS) approach**: As an alternative to using a Managed Identity for access to the key blob in Azure Blob Storage, you can call the `Microsoft.AspNetCore.DataProtection.AzureDataProtectionBuilderExtensions.PersistKeysToAzureBlobStorage*` overload that accepts a blob URI with a SAS token. The following example continues to use either a `Azure.Identity.ManagedIdentityCredential` (production) or `Azure.Identity.DefaultAzureCredential` (development and testing) for its `Azure.Core.TokenCredential`, as seen in the preceding example:

```csharp
builder.Services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI WITH SAS}"))
    .ProtectKeysWithAzureKeyVault(new Uri("{KEY <example-value>}"), credential);
```

`{APPLICATION NAME}`: `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI WITH SAS}`: The full URI where the key file should be stored with the SAS token as a query string parameter. The URI is generated by Azure Storage when you request a SAS for the uploaded key file.

`{KEY <example-value>}`: Azure Key Vault key <example-value> used for key encryption. An access policy allows the application to access the key vault with `Get`, `Unwrap Key`, and `Wrap Key` permissions. The version of the key is obtained from the key in the Entra or Azure portal after it's created. If you enable automatic rotation of the key vault key, make sure that you use a versionless key <example-value> in the app's key vault configuration, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`).

## Persist keys to the file system (`PersistKeysToFileSystem`)

To store keys on a UNC share instead of at the *%LOCALAPPDATA%* default location, configure the system with `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.PersistKeysToFileSystem*`:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo(@"\\server\share\directory\"));
```
> **Warning:**
> If you change the key <example-value> location, the system no longer automatically encrypts keys at rest, since it doesn't know whether DPAPI is an appropriate encryption mechanism.

## Persist keys in a database (`PersistKeysToDbContext`)

To store keys in a database using EntityFramework, configure the system with the Microsoft.AspNetCore.DataProtection.EntityFrameworkCore package:

```csharp
builder.Services.AddDataProtection()
    .PersistKeysToDbContext<SampleDbContext>();
```
The preceding code stores the keys in the configured database. The database context being used must implement `IDataProtectionKeyContext`.  `IDataProtectionKeyContext` exposes the property `DataProtectionKeys`

```csharp
public DbSet<DataProtectionKey> DataProtectionKeys { get; set; } = null!;
```
This property represents the table in which the keys are stored. Create the table manually or with `DbContext` Migrations. For more information, see `Microsoft.AspNetCore.DataProtection.EntityFrameworkCore.DataProtectionKey`.
