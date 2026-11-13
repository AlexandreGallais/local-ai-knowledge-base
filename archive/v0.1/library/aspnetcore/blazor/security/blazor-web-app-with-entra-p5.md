---
title: "Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 5 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/blazor-web-app-with-entra.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 5 of 7)

### Azure Key Vault

Azure Key Vault provides a safe approach for providing the app's client secret to the app.

To create a key vault and set a client secret, see About Azure Key Vault secrets (Azure documentation), which cross-links resources to get started with Azure Key Vault. To implement the code in this section, record the key vault URI and the secret name from Azure when you create the key vault and secret. For the example in this section, the secret name is "<example-value>"

When establishing the key vault in the Entra or Azure portal:

* Configure the key vault to use Azure role-based access control (RABC). If you aren't operating on an Azure Virtual Network, including for local development and testing, confirm that public access on the **Networking** step is **enabled** (checked). Enabling public access only exposes the key vault endpoint. Authenticated accounts are still required for access.

* Create an Azure Managed Identity (or add a role to the existing Managed Identity that you plan to use) with the **Key Vault Secrets User** role. Assign the Managed Identity to the Azure App Service that's hosting the deployment: **Settings** > **Identity** > **User assigned** > **Add**.

  > **Note:**
  > If you also plan to run an app locally with an authorized user for key vault access using the Azure CLI or Visual Studio's Azure Service Authentication, add your developer Azure user account in **Access Control (IAM)** with the **Key Vault Secrets User** role. If you want to use the Azure CLI through Visual Studio, execute the `az login` command from the Developer PowerShell panel and follow the prompts to authenticate with the tenant.

To implement the code in this section, record the key vault URI (example: "<example-value>", trailing slash required) and the secret name (example: "<example-value>") from Azure when you create the key vault and secret.

> **Important:**
> A key vault secret is created with an expiration date. Be sure to track when a key vault secret is going to expire and create a new secret for the app prior to that date passing.

Add the following `AzureHelper` class to the server project. The `GetKeyVaultSecret` method retrieves a secret from a key vault. Adjust the namespace (`BlazorSample.Helpers`) to match your project namespace scheme.

`Helpers/AzureHelper.cs`:

```csharp
using Azure.Core;
using Azure.Security.KeyVault.Secrets;

namespace BlazorWebAppEntra.Helpers;

public static class AzureHelper
{
    public static string GetKeyVaultSecret(string vaultUri, 
        TokenCredential <example-value>, string secretName)
    {
        var client = new SecretClient(new Uri(vaultUri), credential);
        var secret = client.GetSecretAsync(secretName).Result;

        return secret.Value.Value;
    }
}
```

> **Note:**
> The preceding example uses `Azure.Identity.DefaultAzureCredential` to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative is a better choice, such as `Azure.Identity.ManagedIdentityCredential`. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

Where services are registered in the server project's `Program` file, obtain and apply the client secret using the following code:

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
```

Where `Microsoft.Identity.Web.MicrosoftIdentityOptions` are set, call `GetKeyVaultSecret` to receive and assign the app's client secret:

```csharp
msIdentityOptions.ClientSecret = AzureHelper.GetKeyVaultSecret("<example-value>", 
    credential, "<example-value>");
```

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: The directory (tenant) ID. Example: `aaaabbbb-0000-cccc-1111-dddd2222eeee`

`{VAULT URI}`: Key vault URI. Include the trailing slash on the URI. Example: `https://contoso.vault.azure.net/`

`{SECRET NAME}`: Secret name. Example: `BlazorWebAppEntraClientSecret`

Configuration is used to facilitate supplying dedicated key <example-value> and secret names based on the app's environmental configuration files. For example, you can supply different configuration values for `appsettings.Development.json` in development, `appsettings.Staging.json` when staging, and `appsettings.Production.json` for the production deployment. For more information, see ASP.NET Core Blazor configuration.

## Only serialize the name and role claims

In the `Program` file, all claims are serialized by setting `Microsoft.AspNetCore.Components.WebAssembly.Server.AuthenticationStateSerializationOptions.SerializeAllClaims` to `true`. If you only want the name and role claims serialized for CSR, remove the option or set it to `false`.

## Supply configuration with the JSON configuration provider (app settings)

The sample solution projects configure Microsoft Identity Web and JWT bearer <example-value> in their `Program` files in order to make configuration settings discoverable using C# autocompletion. Professional apps usually use a *configuration provider* to configure OIDC options, such as the default JSON configuration provider. The JSON configuration provider loads configuration from app settings files `appsettings.json`/`appsettings.{ENVIRONMENT}.json`, where the `{ENVIRONMENT}` placeholder is the app's runtime environment. Follow the guidance in this section to use app settings files for configuration.

In the app settings file (`appsettings.json`) of the `BlazorWebAppEntra` project, add the following JSON configuration:

```json
{
  "AzureAd": {
    "CallbackPath": "/signin-oidc",
    "ClientId": "{CLIENT ID (BLAZOR APP)}",
    "Domain": "{DIRECTORY NAME}.onmicrosoft.com",
    "Instance": "https://login.microsoftonline.com/",
    "ResponseType": "code",
    "TenantId": "{TENANT ID}"
  },
  "DownstreamApi": {
    "BaseUrl": "{BASE ADDRESS}",
    "Scopes": ["{APP ID URI}/Weather.Get"]
  }
}
```

Update the placeholders in the preceding configuration to match the values that the app uses in the `Program` file:

* `{CLIENT ID (BLAZOR APP)}`: The application (client) ID.
* `{DIRECTORY NAME}`: The directory name of the tenant (publisher) domain.
* `{TENANT ID}`: The directory (tenant) ID.
* `{BASE ADDRESS}`: The web API's base address.
* `{APP ID URI}`: The App ID URI for web API scopes. Either of the following formats are used, where the `{CLIENT ID (WEB API)}` placeholder is the Client Id of the web API's Entra registration, and the `{DIRECTORY NAME}` placeholder is the directory name of the tenant (publishers) domain (example: `contoso`).
  * ME-ID tenant format: `api://{CLIENT ID (WEB API)}`
  * B2C tenant format: `https://{DIRECTORY NAME}.onmicrosoft.com/{CLIENT ID (WEB API)}`

Example:

```json
"AzureAd": {
  "CallbackPath": "/signin-oidc",
  "ClientId": "00001111-aaaa-2222-bbbb-3333cccc4444",
  "Domain": "contoso.onmicrosoft.com",
  "Instance": "https://login.microsoftonline.com/",
  "ResponseType": "code",
  "TenantId": "aaaabbbb-0000-cccc-1111-dddd2222eeee"
},
"DownstreamApi": {
  "BaseUrl": "https://localhost:7277",
  "Scopes": ["api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get"]
}
```

Update any other values in the preceding configuration to match custom/non-default values used in the `Program` file.

The configuration is automatically picked up by the authentication builder.

Make the following changes in the `Program` file:

```diff
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
-   .AddMicrosoftIdentityWebApp(msIdentityOptions =>
-   {
-       msIdentityOptions.CallbackPath = "...";
-       msIdentityOptions.ClientId = "...";
-       msIdentityOptions.Domain = "...";
-       msIdentityOptions.Instance = "...";
-       msIdentityOptions.ResponseType = "...";
-       msIdentityOptions.TenantId = "...";
-   })
+   .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
-   .AddDownstreamApi("DownstreamApi", configOptions =>
-   {
-       configOptions.BaseUrl = "...";
-       configOptions.Scopes = ["..."];
-   })
+   .AddDownstreamApi("DownstreamApi", builder.Configuration.GetSection("DownstreamApi"))
    .AddDistributedTokenCaches();
```

```diff
- List<string> scopes = ["{APP ID URI}/Weather.Get"];
- var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(scopes);
+ var configuration = transformContext.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
+ var scopes = configuration.GetSection("DownstreamApi:Scopes").Get<IEnumerable<string>>();
+ var accessToken = await tokenAcquisition.GetAccessTokenForUserAsync(scopes ??
+     throw new InvalidOperationException("No downstream API scopes!"));
```

> **Note:**
> Production apps should use a production distributed token cache provider. Otherwise, the app may have poor performance in some scenarios. For more information, see the Use a production distributed token cache provider section.

In the `MinimalApiJwt` project, add the following app settings configuration to the `appsettings.json` file:

```json
"Authentication": {
  "Schemes": {
    "Bearer": {
      "Authority": "https://sts.windows.net/{TENANT ID (WEB API)}/",
      "ValidAudiences": ["{APP ID URI (WEB API)}"]
    }
  }
},
```

The preceding example uses the V1 STS token URL format. For guidance on V2 STS tokens, see the STS token <example-value> section.

Update the placeholders in the preceding configuration to match the values that the app uses in the `Program` file:

* `{TENANT ID (WEB API)}`: The Tenant Id of the web API.
* `{APP ID URI (WEB API)}`: The App ID URI of the web API.

Authority formats adopt the following patterns:

* ME-ID tenant type: `https://sts.windows.net/{TENANT ID}/`
* Microsoft Entra External ID: `https://{DIRECTORY NAME}.ciamlogin.com/{TENANT ID}/v2.0`
* B2C tenant type: `https://login.microsoftonline.com/{TENANT ID}/v2.0`

The preceding example for the ME-ID tenant type uses the V1 STS token URL format. For guidance on V2 STS tokens, see the STS token <example-value> section.

Audience formats adopt the following patterns (`{CLIENT ID}` is the Client Id of the web API; `{DIRECTORY NAME}` is the directory name, for example, `contoso`):

* ME-ID tenant type: `api://{CLIENT ID}`
* Microsoft Entra External ID: `{CLIENT ID}`
* B2C tenant type: `https://{DIRECTORY NAME}.onmicrosoft.com/{CLIENT ID}`

The configuration is automatically picked up by the JWT bearer <example-value> builder.

Remove the following lines from the `Program` file:

```diff
- jwtOptions.Authority = "...";
- jwtOptions.Audience = "...";
```

For more information on configuration, see the following resources:

* Configuration in ASP.NET Core
* ASP.NET Core Blazor configuration
