---
title: "Azure Key Vault configuration provider (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/key-vault-configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Azure Key Vault configuration provider (part 2 of 2)

## Configuration options

The `AddAzureKeyVault` method can accept an `Azure.Extensions.AspNetCore.Configuration.Secrets.AzureKeyVaultConfigurationOptions` object:

```csharp
// using Azure.Extensions.AspNetCore.Configuration.Secrets;

builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
    new DefaultAzureCredential(),
    new AzureKeyVaultConfigurationOptions
    {
        // ...
    });
```
The `AzureKeyVaultConfigurationOptions` object contains the following properties:

| Property | Description |
|---|---|
| `Azure.Extensions.AspNetCore.Configuration.Secrets.AzureKeyVaultConfigurationOptions.Manager` | Specifies a `Azure.Extensions.AspNetCore.Configuration.Secrets.KeyVaultSecretManager` instance used to control secret loading.               |
| `Azure.Extensions.AspNetCore.Configuration.Secrets.AzureKeyVaultConfigurationOptions.ReloadInterval` | Specifies the `TimeSpan` to wait between attempts at polling the key vault for changes. The default value is `null` (configuration isn't reloaded). |

## Use a key name prefix

The `AddAzureKeyVault` method provides an overload that accepts an implementation of `Azure.Extensions.AspNetCore.Configuration.Secrets.KeyVaultSecretManager`, which allows you to control how Key Vault secrets are converted into configuration keys. For example, you can implement the interface to load secret <example-value> based on a prefix value you provide at app startup. This technique allows you, for example, to load secrets based on the version of the app.

> **Important:**
> Don't use prefixes on Key Vault secrets to:
>
> * Place secrets for multiple apps into the same key vault.
> * Place environmental secrets (for example, `Development` versus `Production` secrets) into the same key vault.
>
> Different apps and development/production environments should use separate key <example-value> to isolate app environments for the highest level of security.

In the following example, a secret is established in Key Vault (by using Secret <example-value> for the `Development` environment) for `5000-AppSecret` (periods aren't allowed in Key Vault secret names). This secret <example-value> an app secret for version 5.0.0.0 of the app. For another version of the app, 5.1.0.0, a secret is added to the same key vault (by using Secret <example-value>) for `5100-AppSecret`. Each app version loads its versioned secret value into its configuration as `AppSecret`, removing the version as it loads the secret.

The `AddAzureKeyVault` method is called with a custom `KeyVaultSecretManager` implementation:

```csharp
// using Azure.Extensions.AspNetCore.Configuration.Secrets;

builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
    new DefaultAzureCredential(),
    new SamplePrefixKeyVaultSecretManager("<example-value>"));
```
The implementation reacts to the version prefixes of secrets to load the proper secret into configuration:

* The `Load` method loads a secret when its name starts with the prefix. Other secrets aren't loaded.
* The `GetKey` method:
  * Removes the prefix from the secret name.
  * Replaces two dashes (`--`) in any name with the `KeyDelimiter`. This delimiter (usually a colon `:`) is used in configuration because Key Vault doesn't allow a colon (`:`) in secret names.

```csharp
public class SamplePrefixKeyVaultSecretManager : KeyVaultSecretManager
{
    private readonly string _prefix;

    public SamplePrefixKeyVaultSecretManager(string prefix)
        => _prefix = $"{prefix}-";

    public override bool Load(SecretProperties properties)
        => properties.Name.StartsWith(_prefix);

    public override string GetKey(KeyVaultSecret <example-value>)
        => secret.Name[_prefix.Length..].Replace("<example-value>", ConfigurationPath.KeyDelimiter);
}
```
A provider algorithm calls the `Load` method and iterates through the key vault secrets to find the version-prefixed secrets. When a version prefix is found with `Load`, the algorithm uses the `GetKey` method to return the configuration name of the secret name. It removes the version prefix from the secret's name. The rest of the secret name is returned for loading into the application configuration name-value pairs.

When you implement this approach, complete the following steps:

1. Specify the application version in the application project file. In the following example, the application version is set to `5.0.0.0`:

   ```xml
   <PropertyGroup>
     <Version>5.0.0.0</Version>
   </PropertyGroup>
   ```

1. Confirm the `<UserSecretsId>` property is defined in the application project file, where `{GUID}` is a user-supplied GUID:

   ```xml
   <PropertyGroup>
     <UserSecretsId>{GUID}</UserSecretsId>
   </PropertyGroup>
   ```

   Save the following secrets locally by using Secret <example-value>:

   ```dotnetcli
   dotnet user-secrets set "<example-value>" "<example-value>"
   dotnet user-secrets set "<example-value>" "<example-value>"
   ```

1. Save the secrets in Azure Key Vault by using the following Azure CLI commands:

   ```azurecli
   az keyvault secret set --vault-name {KEY VAULT NAME} --name "<example-value>" <example-value> "<example-value>"
   az keyvault secret set --vault-name {KEY VAULT NAME} --name "<example-value>" <example-value> "<example-value>"
   ```

The process completes the following tasks:

* When the app runs, the implementation loads the key vault secrets. The string secret for `5000-AppSecret` is matched to the application version specified in the app's project file (`5.0.0.0`).

* The version, `5000` (with the dash), is stripped from the key name. Throughout the app, reading configuration with the key `AppSecret` loads the secret value.

* If the application version is changed in the project file to `5.1.0.0` and the app is run again, the secret value returned is `5.1.0.0_secret_value_dev` in the `Development` environment and `5.1.0.0_secret_value_prod` in `Production`.

> **Note:**
> You can also provide your own `Azure.Security.KeyVault.Secrets.SecretClient` implementation to the `AddAzureKeyVault` method. A custom client enables sharing a single instance of the client across the app.

## Bind an array to a class

The provider can read configuration values into an array for binding to a POCO array.

When reading from a configuration source that allows keys to contain colon (`:`) separators, a numeric key <example-value> is used to distinguish the keys that make up an array (`:0:`, `:1:`, … `:{n}:`). For more information, see Configuration: Bind an array to a class.

Key Vault keys can't use a colon (`:`) as a separator. The approach described in this article uses double dashes (`--`) as a separator for hierarchical values (sections). Array keys are stored in Key Vault with double dashes and numeric key <example-value> (`--0--`, `--1--`, … `--{n}--`).

Examine the following Serilog logging provider configuration supplied in a JSON file. There are two object literals defined in the `WriteTo` array that reflect two Serilog *sinks*, which describe destinations for logging output:

```json
"Serilog": {
  "WriteTo": [
    {
      "Name": "AzureTableStorage",
      "Args": {
        "storageTableName": "logs",
        "connectionString": "DefaultEnd...ountKey=Eby8...GMGw=="
      }
    },
    {
      "Name": "AzureDocumentDB",
      "Args": {
        "endpointUrl": "https://contoso.documents.azure.com:443",
        "authorizationKey": "Eby8...GMGw=="
      }
    }
  ]
}
```

The configuration in the JSON file is stored in Key Vault by using double dash (`--`) notation and numeric segments:

| Key                                           | Value                                     |
|-----------------------------------------------|-------------------------------------------|
| `Serilog--WriteTo--0--Name`                   | `AzureTableStorage`                       |
| `Serilog--WriteTo--0--Args--storageTableName` | `logs`                                    |
| `Serilog--WriteTo--0--Args--connectionString` | `DefaultEnd...ountKey=Eby8...GMGw==`      |
| `Serilog--WriteTo--1--Name`                   | `AzureDocumentDB`                         |
| `Serilog--WriteTo--1--Args--endpointUrl`      | `https://contoso.documents.azure.com:443` |
| `Serilog--WriteTo--1--Args--authorizationKey` | `Eby8...GMGw==`                           |

## Reload secrets

By default, the configuration provider caches secrets for the application lifetime. The app ignores secrets that are later disabled or updated in the key vault.

To reload secrets, call the `Microsoft.Extensions.Configuration.IConfigurationRoot.Reload*` method:

```csharp
config.Reload();
```

To reload secrets periodically, at a specified interval, set the `Azure.Extensions.AspNetCore.Configuration.Secrets.AzureKeyVaultConfigurationOptions.ReloadInterval` property. For more information, see Configuration options.

## Disabled and expired secrets

Expired secrets are included by default in the configuration provider. To exclude values for these secrets in app configuration, update the expired secret or provide the configuration by using a custom configuration provider:

```csharp
class SampleKeyVaultSecretManager : KeyVaultSecretManager
{
  public override bool Load(SecretProperties properties) =>
    properties.ExpiresOn.HasValue &&
    properties.ExpiresOn.Value > DateTimeOffset.Now;
}
```

Pass this custom `KeyVaultSecretManager` provider to the `AddAzureKeyVault` method:

```csharp
// using Azure.Extensions.AspNetCore.Configuration.Secrets;

builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
    new DefaultAzureCredential(),
    new SampleKeyVaultSecretManager());
```

Disabled secrets can't be retrieved from Key Vault and are never included.

> **Note:**
> The preceding example uses the `Azure.Identity.DefaultAzureCredential` class to simplify authentication when developing apps that deploy to Azure. This approach combines credentials used in Azure hosting environments with credentials used in local development. When you move the implementation to production, an alternative is a better choice, such as the `Azure.Identity.ManagedIdentityCredential` class. For more information, see Authenticate Azure-hosted .NET apps to Azure resources by using a system-assigned managed identity.

## Troubleshoot configuration load issues

When the app fails to load configuration by using the provider, an error message is written to the ASP.NET Core logging infrastructure.

The following conditions can prevent configuration from loading:

* The app or certificate isn't configured correctly in Microsoft Entra ID.
* The vault doesn't exist in Azure Key Vault.
* The app isn't authorized to access the vault.
* The access policy doesn't include `Get` and `List` permissions.
* In the vault, the configuration data (name-value pair) is incorrectly named, missing, or disabled.
* The app has the wrong key vault name (`KeyVaultName`), Microsoft Entra ID Application ID (`AzureADApplicationId`), Microsoft Entra ID certificate thumbprint (`AzureADCertThumbprint`), or Microsoft Entra ID Directory ID (`AzureADDirectoryId`).
* When the Key Vault access policy is added for the app, the policy is successfully created, but the user didn't select **Save** in the **Access policies** dialog.

## Related content

* View or download sample code (how to download)
* Configuration in ASP.NET Core
* Azure Key Vault documentation
* Import HSM-protected keys to Azure Key Vault
* Quickstart: Azure Key Vault secret <example-value> library for .NET
* Tutorial: Use Azure Key Vault with a virtual machine in .NET
