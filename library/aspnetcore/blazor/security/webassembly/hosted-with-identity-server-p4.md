---
title: "Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 4 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/webassembly/hosted-with-identity-server.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure a hosted ASP.NET Core Blazor WebAssembly app with Identity Server (part 4 of 5)

## Host in Azure App Service with a custom domain and certificate

The following guidance explains:

* How to deploy a hosted Blazor WebAssembly app with Identity Server to Azure App Service with a custom domain.
* How to create and use a TLS certificate for HTTPS protocol communication with browsers. Although the guidance focuses on using the certificate with a custom domain, the guidance is equally applicable to using a default Azure Apps domain, for example `contoso.azurewebsites.net`.

For this hosting scenario, do **not** use the same certificate for Duende Identity Server's token signing key and the site's HTTPS secure communication with browsers:

* Using different certificates for these two requirements is a good security practice because it isolates private keys for each purpose.
* TLS certificates for communication with browsers is managed independently without affecting Identity Server's token signing.
* When Azure Key Vault supplies a certificate to an App Service app for custom domain binding, Identity Server can't obtain the same certificate from Azure Key Vault for token signing. Although configuring Identity Server to use the same TLS certificate from a physical path is possible, placing security certificates into source control is a **poor practice and should be avoided in most scenarios**.

In the following guidance, a self-signed certificate is created in Azure Key Vault solely for Identity Server token signing. The Identity Server configuration uses the key vault certificate via the app's `CurrentUser` > `My` certificate store. Other certificates used for HTTPS traffic with custom domains are created and configured separately from the Identity Server signing certificate.

To configure an app, Azure App Service, and Azure Key Vault to host with a custom domain and HTTPS:

1. Create an App Service plan with an plan level of `Basic B1` or higher. App Service requires a `Basic B1` or higher service tier to use custom domains.
1. Create a PFX certificate for the site's secure browser communication (HTTPS protocol) with a common name of the site's fully qualified domain name (FQDN) that your organization controls (for example, `www.contoso.com`). Create the certificate with:
   * Key uses
     * Digital signature validation (`digitalSignature`)
     * Key encipherment (`keyEncipherment`)
   * Enhanced/extended key uses
     * Client Authentication (1.3.6.1.5.5.7.3.2)
     * Server Authentication (1.3.6.1.5.5.7.3.1)

   To create the certificate, use one of the following approaches or any other suitable tool or online service:

   * Azure Key Vault
   * MakeCert on Windows
   * OpenSSL

   Make note of the password, which is used later to import the certificate into Azure Key Vault.

   For more information on Azure Key Vault certificates, see Azure Key Vault: Certificates.
1. Create a new Azure Key Vault or use an existing key vault in your Azure subscription.
1. In the key vault's **Certificates** area, import the PFX site certificate. Record the certificate's thumbprint, which is used in the app's configuration later.
1. In Azure Key Vault, generate a new self-signed certificate for Identity Server token signing. Give the certificate a **Certificate Name** and **Subject**. The **Subject** is specified as `CN={COMMON NAME}`, where the `{COMMON NAME}` placeholder is the certificate's common name. The common name can be any alphanumeric string. For example, `CN=IdentityServerSigning` is a valid certificate **Subject**. In **Issuance Policy** > **Advanced Policy Configuration**, use the default settings. Record the certificate's thumbprint, which is used in the app's configuration later.
1. Navigate to Azure App Service in the Azure portal and create a new App Service with the following configuration:
   * **Publish** set to `Code`.
   * **Runtime stack** set to the app's runtime.
   * For **Sku and size**, confirm that the App Service tier is `Basic B1` or higher.  App Service requires a `Basic B1` or higher service tier to use custom domains.
1. After Azure creates the App Service, open the app's **Configuration** and add a new application setting specifying the certificate thumbprints recorded earlier. The app setting key is `WEBSITE_LOAD_CERTIFICATES`. Separate the certificate thumbprints in the app setting value with a comma, as the following example shows:
   * Key: `WEBSITE_LOAD_CERTIFICATES`
   * Value: `57443A552A46DB...D55E28D412B943565,29F43A772CB6AF...1D04F0C67F85FB0B1`

   In the Azure portal, saving app settings is a two-step process: Save the `WEBSITE_LOAD_CERTIFICATES` key-value setting, then select the **Save** button at the top of the blade.
1. Select the app's **TLS/SSL settings**. Select **Private Key Certificates (.pfx)**. Use the **Import Key Vault Certificate** process. **Use the process _twice_ to import both the site's certificate for HTTPS communication and the site's self-signed Identity Server token signing certificate.**
1. Navigate to the **Custom domains** blade. At your domain registrar's website, use the **IP address** and **Custom Domain Verification ID** to configure the domain. A typical domain configuration includes:
   * An **A Record** with a **Host** of `@` and a value of the IP address from the Azure portal.
   * A **TXT Record** with a **Host** of `asuid` and the value of the verification ID generated by Azure and provided by the Azure portal.

   Make sure that you save the changes at your domain registrar's website correctly. Some registrar websites require a two-step process to save domain records: One or more records are saved individually followed by updating the domain's registration with a separate button.
1. Return to the **Custom domains** blade in the Azure portal. Select **Add custom domain**. Select the **A Record** option. Provide the domain and select **Validate**. If the domain records are correct and propagated across the Internet, the portal allows you to select the **Add custom domain** button.

   It can take a few days for domain registration changes to propagate across Internet domain name servers (DNS) after they're processed by your domain registrar. If domain records aren't updated within three business days, confirm the records are correctly set with the domain registrar and contact their customer support.
1. In the **Custom domains** blade, the **SSL STATE** for the domain is marked `Not Secure`. Select the **Add binding** link. Select the site HTTPS certificate from the key vault for the custom domain binding.
1. In Visual Studio, open the *Server* project's app settings file (`appsettings.json` or `appsettings.Production.json`). In the Identity Server configuration, add the following `Key` section. Specify the self-signed certificate **Subject** for the `Name` key. In the following example, the certificate's common name assigned in the key vault is `IdentityServerSigning`, which yields a **Subject** of `CN=IdentityServerSigning`:

   ```json
   "IdentityServer": {

     ...

     "Key": {
       "Type": "Store",
       "StoreName": "My",
       "StoreLocation": "CurrentUser",
       "Name": "CN=IdentityServerSigning"
     }
   },
   ```

1. In Visual Studio, create an Azure App Service publish profile for the *Server* project. From the menu bar, select: **Build** > **Publish** > **New** > **Azure** > **Azure App Service** (Windows or Linux). When Visual Studio is connected to an Azure subscription, you can set the **View** of Azure resources by **Resource type**. Navigate within the **Web App** list to find the App Service for the app and select it. Select **Finish**.
1. When Visual Studio returns to the **Publish** window, the key vault and SQL Server database service dependencies are automatically detected.

   No configuration changes to the default settings are required for the key vault service.

   For testing purposes, an app's local SQLite database, which is configured by the Blazor template, can be deployed with the app without additional configuration. Configuring a different database for Identity Server in production is beyond the scope of this article. For more information, see the database resources in the following documentation sets:

   * App Service
   * Duende Identity Server

1. Select the **Edit** link under the deployment profile name at the top of the window. Change the destination URL to the site's custom domain URL (for example, `https://www.contoso.com`). Save the settings.
1. Publish the app. Visual Studio opens a browser window and requests the site at its custom domain.

The Azure documentation contains additional detail on using Azure services and custom domains with TLS binding in App Service, including information on using CNAME records instead of A records. For more information, see the following resources:

* App Service documentation
* Tutorial: Map an existing custom DNS name to Azure App Service
* Secure a custom DNS name with a TLS/SSL binding in Azure App Service
* Azure Key Vault

We recommend using a new private mode browser window (for example, Microsoft Edge InPrivate mode or Google Chrome Incognito mode) for each app test run after a change to the app, app configuration, or Azure services in the Azure portal. Lingering cookies from a previous test run can result in failed authentication or authorization when testing the site even when the site's configuration is correct. For more information on how to configure Visual Studio to open a new private browser window for each test run, see the Cookies and site data section.

When App Service configuration is changed in the Azure portal, the updates generally take effect quickly but aren't instant. Sometimes, you must wait a short period for an App Service to restart in order for a configuration change to take effect.

If troubleshooting an Identity Server key-signing certificate loading problem, execute the following command in an Azure portal Kudu PowerShell command shell. The command provides a list of certificates that the app can access from the `CurrentUser` > `My` certificate store. The output includes certificate subjects and thumbprints useful when debugging an app:

```powershell
Get-ChildItem -path Cert:\CurrentUser\My -Recurse | Format-List DnsNameList, Subject, Thumbprint, EnhancedKeyUsageList
```
