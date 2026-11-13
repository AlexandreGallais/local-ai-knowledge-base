---
title: "Azure Key Vault configuration provider (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/security/key-vault-configuration.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use Azure Key Vault configuration provider in ASP.NET Core

This article explains how to use the Azure Key Vault configuration provider to load app configuration values from Key Vault secrets. Key Vault is a cloud-based service that helps safeguard cryptographic keys and secrets used by apps and services. Common scenarios for using Key Vault with ASP.NET Core apps include:

* Controlling access to sensitive configuration data.
* Meeting the requirement for FIPS 140-2 Level 2 validated Hardware Security Modules (HSMs) when storing configuration data.

## Packages

Add package references for the following packages:

* Azure.Extensions.AspNetCore.Configuration.Secrets
* Azure.Identity

## Sample app

The sample app runs in either of two modes determined by the `#define` preprocessor directive at the top of the _Program.cs_ file:

* `Certificate`: Demonstrates how to use a Key Vault Client ID and X.509 certificate to access secrets stored in a key vault. You can run the sample from any location, whether deployed to Azure App Service or any host that can serve an ASP.NET Core app.

* `Managed`: Demonstrates how to use Managed identities for Azure resources. The managed identity authenticates the app to Key Vault with Managed identities for Azure resources without storing credentials in the application code or configuration. The `Managed` version of the sample must be deployed to Azure. Follow the guidance in the Use the managed identities for Azure resources section.

For more information about configuring a sample app by using `#define`, see Preprocessor directives in sample code.

View or download sample code (how to download)

## Secret storage in the Development environment

Set secrets locally by using the Secret Manager tool. When the sample app runs on the local machine in the `Development` environment, secrets are loaded from the local user secrets store.

Secret Manager requires a `<UserSecretsId>` property in the application project file. Set the property value (`{GUID}`) to any unique GUID:

```xml
<PropertyGroup>
  <UserSecretsId>{GUID}</UserSecretsId>
</PropertyGroup>
```

Secrets are created as name-value pairs. Hierarchical values (configuration sections) use colons (`:`) as separators in ASP.NET Core configuration key names.

Secret Manager is used in a command shell (or terminal) opened to the project's content root, where `{SECRET NAME}` is the name and `{SECRET VALUE}` is the value:

```dotnetcli
dotnet user-secrets set "{SECRET NAME}" "{SECRET VALUE}"
```

Run the following commands in a command shell from the project's content root. The commands set the secrets for the sample app:

```dotnetcli
dotnet user-secrets set "SecretName" "secret_value_1_dev"
dotnet user-secrets set "Section:SecretName" "secret_value_2_dev"
```

When these secrets are stored in Key Vault, as described in the Secret storage in the Production environment with Key Vault section, the `_dev` suffix changes to `_prod`. The suffix provides a visual cue in the application output indicating the source of the configuration values.

## Secret storage in the Production environment with Key Vault

Create an Azure key vault and store the sample application secrets by completing the following steps. For more information, see Quickstart: Set and retrieve a secret from Key Vault with the Azure CLI.

1. Open Azure Cloud Shell by using any one of the following methods in the Azure portal:

   * Select **Try It** in the upper-right corner of a code block. Use the search string "Azure CLI" in the text box.
   * Open Cloud Shell in your browser with the **Launch Cloud Shell** button.
   * Select the **Cloud Shell** button on the menu in the upper-right corner of the Azure portal.

   For more information, see the Azure CLI documentation and Overview of Azure Cloud Shell.

1. If you aren't already authenticated, sign in with the `az login` command.

1. Create a resource group with the following command, where `{RESOURCE GROUP NAME}` is the name for the new resource group and `{LOCATION}` is the Azure region:

   ```azurecli
   az group create --name "{RESOURCE GROUP NAME}" --location {LOCATION}
   ```

1. Create an Azure key vault in the resource group with the following command, where `{KEY VAULT NAME}` is the name for the new vault and `{LOCATION}` is the Azure region:

   ```azurecli
   az keyvault create --name {KEY VAULT NAME} --resource-group "{RESOURCE GROUP NAME}" --location {LOCATION}
   ```

1. Create secrets in the vault as name-value pairs.

   Key Vault secret names can consist of alphanumeric characters and dashes (`-`). Hierarchical values (configuration sections) use two dashes or hyphens (`--`) as a delimiter. The colon character isn't allowed in Key Vault secret names. Colons delimit a section from a subkey in ASP.NET Core configuration. The two-dash sequence is replaced with a colon when the secrets are loaded into the application configuration.

   The following secrets are for use with the sample app. The values include a `_prod` suffix that distinguishes them from the `_dev` suffix values loaded in the `Development` environment via Secret Manager. Replace `{KEY VAULT NAME}` with the name of the key vault you created earlier:

   ```azurecli
   az keyvault secret set --vault-name {KEY VAULT NAME} --name "SecretName" --value "secret_value_1_prod"
   az keyvault secret set --vault-name {KEY VAULT NAME} --name "Section--SecretName" --value "secret_value_2_prod"
   ```

## Use Application ID and X.509 certificate for non-Azure-hosted apps

Configure Key Vault and the app to use a Microsoft Entra ID Application ID and X.509 certificate to authenticate to a vault **when the app is hosted outside of Azure**. For more information, see About keys, secrets, and certificates.

> **Note:**
> Although using an Application ID and X.509 certificate is supported for apps hosted in Azure, this approach isn't recommended. Instead, use Managed identities for Azure resources when hosting an app in Azure. Managed identities don't require storing a certificate in the app or in the `Development` environment.

The sample app uses an Application ID and X.509 certificate when the `#define` preprocessor directive at the top of the _Program.cs_ file is set to `Certificate`.

1. Create a PKCS#12 archive (*.pfx*) certificate. Options for creating certificates include New-SelfSignedCertificate on Windows and OpenSSL.

1. Install the certificate into the current user's personal certificate store. Marking the key as exportable is optional. Note the certificate's thumbprint, which is used later in this process.

1. Export the PKCS#12 archive (*.pfx*) certificate as a DER-encoded certificate (*.cer*).

1. Register the app with Microsoft Entra ID (**App registrations**).

1. Upload the DER-encoded certificate (*.cer*) to Microsoft Entra ID:
   1. Select the app in Microsoft Entra ID.
   1. Go to **Certificates & secrets**.
   1. Select **Upload certificate** to upload the certificate, which contains the public key. A *.cer*, *.pem*, or *.crt* certificate is acceptable.

1. Store the key vault name, Application ID, and certificate thumbprint in the application _appsettings.json_ file.

1. In the Azure portal, go to **Key Vaults**.

1. Select the key vault you created in the Secret storage in the Production environment with Azure Key Vault section.

1. Select **Access policies**, and then select **Add Access Policy**.

1. Open **Secret permissions** and provide the app with **Get** and **List** permissions.

1. Choose **Select principal**. Select the registered app by name, and then choose **Select**.

1. Select **OK**, and then select **Save**.

1. Deploy the app.

The `Certificate` sample app obtains its configuration values from `Microsoft.Extensions.Configuration.IConfigurationRoot` with the same name as the secret name:

* Nonhierarchical values: The value for `SecretName` is obtained with `config["SecretName"]`.
* Hierarchical values (sections): Use colon (`:`) notation or the `Microsoft.Extensions.Configuration.IConfiguration.GetSection*` method. Use one of the following approaches to obtain the configuration value:
  * `config["Section:SecretName"]`
  * `config.GetSection("Section")["SecretName"]`

The operating system manages the X.509 certificate. The app calls the `Microsoft.Extensions.Configuration.AzureKeyVaultConfigurationExtensions.AddAzureKeyVault*` method with values supplied by the _appsettings.json_ file:

```csharp

using System.Security.Cryptography.X509Certificates;
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsProduction())
{
    using var x509Store = new X509Store(StoreLocation.CurrentUser);

    x509Store.Open(OpenFlags.ReadOnly);

    var x509Certificate = x509Store.Certificates
        .Find(
            X509FindType.FindByThumbprint,
            builder.Configuration["AzureADCertThumbprint"],
            validOnly: false)
        .OfType<X509Certificate2>()
        .Single();

    builder.Configuration.AddAzureKeyVault(
        new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
        new ClientCertificateCredential(
            builder.Configuration["AzureADDirectoryId"],
            builder.Configuration["AzureADApplicationId"],
            x509Certificate));
}

var app = builder.Build();
```
Example values:

* Key vault name: `contosovault`
* Application ID: `00001111-aaaa-2222-bbbb-3333cccc4444`
* Certificate thumbprint: `fe14593dd66b2406c5269d742d04b6e1ab03adb1`

The values in the _appsettings.json_ file:

```json
{
  "KeyVaultName": "Key Vault Name",
  "AzureADApplicationId": "Azure AD Application ID",
  "AzureADCertThumbprint": "Azure AD Certificate Thumbprint",
  "AzureADDirectoryId": "Azure AD Directory ID"
}
```
When you run the app, a webpage shows the loaded secret values. In the `Development` environment, secret values load with the `_dev` suffix. In the `Production` environment, the values load with the `_prod` suffix.

## Use managed identities for Azure resources

**An app deployed to Azure** can take advantage of Managed identities for Azure resources. A managed identity allows the app to authenticate with Azure Key Vault by using Microsoft Entra ID authentication without storing credentials in the application code or configuration.

The sample app uses a system-assigned managed identity when the `#define` preprocessor directive at the top of the _Program.cs_ file is set to `Managed`. To create a managed identity for an Azure App Service app, see How to use managed identities for App Service and Azure Functions. After the managed identity is created, take note of the application Object ID shown in the Azure portal on the **Identity** panel of the App Service.

Enter the key vault name into the application _appsettings.json_ file. The sample app doesn't require an Application ID and Password (Client Secret) when set to the `Managed` version, so you can ignore those configuration entries. The app is deployed to Azure, and Azure authenticates the app to access Key Vault only by using the vault name stored in the _appsettings.json_ file.

Deploy the sample app to Azure App Service.

Using the Azure CLI and the app's Object ID, provide the app with `list` and `get` permissions to access the key vault:

```azurecli
az keyvault set-policy --name {KEY VAULT NAME} --object-id {OBJECT ID} --secret-permissions get list
```

**Restart the app** by using the Azure CLI, Azure PowerShell, or the Azure portal.

The sample app creates an instance of the `Azure.Identity.DefaultAzureCredential` class. The credential attempts to obtain an access token from environment for Azure resources:

```csharp
using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsProduction())
{
    builder.Configuration.AddAzureKeyVault(
        new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
        new DefaultAzureCredential());
}
```
> **Note:**
> The preceding example uses the `Azure.Identity.DefaultAzureCredential` class to simplify authentication when developing apps that deploy to Azure. This approach combines credentials used in Azure hosting environments with credentials used in local development. When you move the implementation to production, an alternative is a better choice, such as the `Azure.Identity.ManagedIdentityCredential` class. For more information, see Authenticate Azure-hosted .NET apps to Azure resources by using a system-assigned managed identity.

Example name for the key vault: `contosovault`

The name value in the _appsettings.json_ file:

```json
{
  "KeyVaultName": "Key Vault Name"
}
```

For apps that use a user-assigned managed identity, configure the managed identity's Client ID by using one of the following approaches:

* Set the `AZURE_CLIENT_ID` environment variable.

* Set the `Azure.Identity.DefaultAzureCredentialOptions.ManagedIdentityClientId` property when calling the `AddAzureKeyVault` method:

```csharp
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{builder.Configuration["KeyVaultName"]}.vault.azure.net/"),
    new DefaultAzureCredential(new DefaultAzureCredentialOptions
    {
        ManagedIdentityClientId = builder.Configuration["AzureADManagedIdentityClientId"]
    }));
```
When you run the app, a webpage shows the loaded secret values. In the `Development` environment, secret values have the `_dev` suffix because they're provided by Secret Manager. In the `Production` environment, the values load with the `_prod` suffix because they're provided by Azure Key Vault.

If you receive an `Access denied` error, confirm the app is registered with Microsoft Entra ID and has access to the vault. Confirm you restarted the service in Azure.

For information on using the provider with a managed identity and Azure Pipelines, see Connect to Azure with an Azure Resource Manager service connection.
