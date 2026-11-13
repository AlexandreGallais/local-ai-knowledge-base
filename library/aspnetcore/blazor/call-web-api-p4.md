---
title: "Call a web API from an ASP.NET Core Blazor app (part 4 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/call-web-api.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Call a web API from an ASP.NET Core Blazor app (part 4 of 6)

## Microsoft identity platform for web API calls

Blazor Web Apps that use use Microsoft identity platform with Microsoft Identity Web packages for Microsoft Entra ID can make streamlined web API calls with API provided by the `Microsoft.Identity.Web.DownstreamApi` NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

In the app settings file (`appsettings.json`), provide a base URL and scopes. In the following example, the `{BASE ADDRESS}` placeholder is the base URL of the web API. A single scope is specified with an App ID URI (`{APP ID URI}` placeholder) and scope name (`{SCOPE NAME}` placeholder):

```json
"DownstreamApi": {
  "BaseUrl": "{BASE ADDRESS}",
  "Scopes": [ "{APP ID URI}/{SCOPE NAME}" ]
}
```

Example:

```json
"DownstreamApi": {
  "BaseUrl": "https://localhost:7277",
  "Scopes": [ "api://11112222-bbbb-3333-cccc-4444dddd5555/Weather.Get" ]
}
```

In the app's `Program` file, call:

* `Microsoft.Identity.Web.MicrosoftIdentityWebApiAuthenticationBuilder.EnableTokenAcquisitionToCallDownstreamApi*`: Enables token acquisition to call web APIs.
* `Microsoft.Identity.Web.DownstreamApiExtensions.AddDownstreamApi*`: Microsoft Identity Web packages provide API to create a named downstream web service for making web API calls. `Microsoft.Identity.Abstractions.IDownstreamApi` is injected into a server-side class, which is used to call `Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync*` to obtain weather data from an external web API (`MinimalApiJwt` project).
* `Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches*`: Adds the .NET distributed token caches to the service collection.
* `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*`: Adds a default implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` that stores cache items in memory.
* Configure the distributed token cache options (`Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions`):
  * In development for debugging purposes, you can disable the L1 cache by setting `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.DisableL1Cache` to `true`. ***Be sure to reset it back to `false` for production.***
  * Set the maximum size of your L1 cache with `L1CacheOptions.SizeLimit` to prevent the cache from overrunning the server's memory. The default value is 500 MB.
  * In development for debugging purposes, you can disable token encryption at rest by setting `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt` to `false`, which is the default value. ***Be sure to reset it back to `true` for production.***
  * Set token eviction from the cache with `Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions.SlidingExpiration`. The default value is 1 hour.
  * For more information, including guidance on the callback for L2 cache failures (`Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.OnL2CacheFailure`) and asynchronous L2 cache writes (`Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.EnableAsyncL2Write`), see `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions` and Token cache serialization: Distributed token caches.

You can choose to encrypt the cache and should always do so in production.

```csharp
builder.Services.AddAuthentication(OpenIdConnectDefaults.AuthenticationScheme)
    .AddMicrosoftIdentityWebApp(builder.Configuration.GetSection("AzureAd"))
    .EnableTokenAcquisitionToCallDownstreamApi()
    .AddDownstreamApi("DownstreamApi", 
        builder.Configuration.GetSection("DownstreamApi"))
    .AddDistributedTokenCaches();

// Requires the 'Microsoft.Extensions.Caching.Memory' NuGet package
builder.Services.AddDistributedMemoryCache();

builder.Services.Configure<MsalDistributedTokenCacheAdapterOptions>(
    options => 
    {
        // The following lines that are commented out reflect
        // default values. We recommend overriding the default
        // value of Encrypt to encrypt tokens at rest.

        //options.DisableL1Cache = false;
        //options.L1CacheOptions.SizeLimit = 500 * 1024 * 1024;
        options.Encrypt = true;
        //options.SlidingExpiration = TimeSpan.FromHours(1);
    });
```

In-memory distributed token caches are created when calling `Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches*` to ensure that there's a base implementation available for distributed token caching.

Production web apps and web APIs should use a production distributed token cache (for example: Redis, Microsoft SQL Server, Microsoft Azure Cosmos DB).

> **Note:**
> For local development and testing on a single machine, you can use in-memory token caches instead of distributed token caches:
>
> ```csharp
> builder.Services.AddInMemoryTokenCaches();
> ```
>
> Later in the development and testing period, adopt a production distributed token cache provider.

`Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*` adds a default implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` that stores cache items in memory, which is used by Microsoft Identity Web for token caching.

`Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*` requires a package reference to the `Microsoft.Extensions.Caching.Memory` NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

To configure a production distributed cache provider, see Distributed caching in ASP.NET Core.

> **Warning:**
> Always replace the in-memory distributed token caches with a real token cache provider when deploying the app to a production environment. If you fail to adopt a production distributed token cache provider, the app may suffer significantly degraded performance.

For more information, see Token cache serialization: Distributed caches. However, the code examples shown don't apply to ASP.NET Core apps, which configure distributed caches via `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*`, not `Microsoft.Identity.Web.TokenCacheExtensions.AddDistributedTokenCache*`.

Use a shared Data Protection key ring in production so that instances of the app across servers in a web farm can decrypt tokens when `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt` is set to `true`.

> **Note:**
> For early development and local testing on a single machine, you can set `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt` to `false` and configure a shared Data Protection key ring later:
>
> ```csharp
> options.Encrypt = false;
> ```
>
> Later in the development and testing period, enable token encryption and adopt a shared Data Protection key ring.

The following example shows how to use Azure Blob Storage and Azure Key Vault (`PersistKeysToAzureBlobStorage`/`ProtectKeysWithAzureKeyVault`) for the shared key ring. The service configurations are base case scenarios for demonstration purposes. Before deploying production apps, familiarize yourself with the Azure services and adopt best practices using the Azure services' dedicated documentation sets, which are linked at the end of this section.

Add the following packages to the server project of the Blazor Web App:

* `Azure.Extensions.AspNetCore.DataProtection.Blobs`
* `Azure.Extensions.AspNetCore.DataProtection.Keys`

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

> **Note:**
> Before proceeding with the following steps, confirm that the app is registered with Microsoft Entra.

Configure Azure Blob Storage to maintain data protection keys. Follow the guidance in Key storage providers in ASP.NET Core.

Configure Azure Key Vault to encrypt the data protection keys at rest. Follow the guidance in Configure ASP.NET Core Data Protection.

Use the following code in the `Program` file where services are registered:

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
        SharedTokenCacheTenantId = "{TENANT ID}"
    };

    credential = new DefaultAzureCredential(options);
}

builder.Services.AddDataProtection()
    .SetApplicationName("{APPLICATION NAME}")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential)
    .ProtectKeysWithAzureKeyVault(new Uri("{KEY IDENTIFIER}"), credential);
```

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: Tenant ID.

`{APPLICATION NAME}`: `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*` sets the unique name of this app within the data protection system. The value should match across deployments of the app.

`{BLOB URI}`: Full URI to the key file. The URI is generated by Azure Storage when you create the key file. Do not use a SAS.

`{KEY IDENTIFIER}`: Azure Key Vault key identifier used for key encryption. An access policy allows the application to access the key vault with `Get`, `Unwrap Key`, and `Wrap Key` permissions. The key identifier is obtained from the key in the Entra or Azure portal after it's created. If you enable autorotation of the key vault key, make sure that you use a versionless key identifier in the app's key vault configuration, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`).

> **Note:**
> In non-`Production` environments, the preceding example uses `Azure.Identity.DefaultAzureCredential` to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. When moving to production, an alternative is a better choice, such as the `Azure.Identity.ManagedIdentityCredential` shown in the preceding example. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

Inject `Microsoft.Identity.Abstractions.IDownstreamApi` and call `Microsoft.Identity.Abstractions.IDownstreamApi.CallApiForUserAsync*` when calling on behalf of a user:

```csharp
internal sealed class ServerWeatherForecaster(IDownstreamApi downstreamApi) : IWeatherForecaster
{
    public async Task<IEnumerable<WeatherForecast>> GetWeatherForecastAsync()
    {
        var response = await downstreamApi.CallApiForUserAsync("DownstreamApi",
            options =>
            {
                options.RelativePath = "/weather-forecast";
            });

        return await response.Content.ReadFromJsonAsync<WeatherForecast[]>() ??
            throw new IOException("No weather forecast!");
    }
}
```

This approach is used by the `BlazorWebAppEntra` and `BlazorWebAppEntraBff` sample apps described in the *Sample apps* section of this article.

For more information, see the following resources:

* Key storage providers in ASP.NET Core
* Configure ASP.NET Core Data Protection
* Use the Azure SDK for .NET in ASP.NET Core apps
* Web API documentation | Microsoft identity platform
* A web API that calls web APIs: Call an API: Option 2: Call a downstream web API with the helper class
* `Microsoft.Identity.Abstractions.IDownstreamApi`
* *Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID*
  * With YARP and Aspire (Interactive Auto)
  * Without YARP and Aspire (Interactive Auto)
* Host ASP.NET Core in a web farm: Data Protection
* Azure Key Vault documentation
* Azure Storage documentation
* Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control
