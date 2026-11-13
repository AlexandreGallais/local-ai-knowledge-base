---
title: "Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 6 of 7)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/blazor/security/blazor-web-app-with-entra.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Secure an ASP.NET Core Blazor Web App with Microsoft Entra ID (part 6 of 7)

## Use a production distributed token cache provider

In-memory distributed token <example-value> are created when calling `Microsoft.Identity.Web.TokenCacheProviders.Distributed.DistributedTokenCacheAdapterExtension.AddDistributedTokenCaches*` to ensure that there's a base implementation available for distributed token caching.

Production web apps and web APIs should use a production distributed token cache (for example: Redis, Microsoft SQL Server, Microsoft Azure Cosmos DB).

> **Note:**
> For local development and testing on a single machine, you can use in-memory token <example-value> instead of distributed token <example-value>:
>
> ```csharp
> builder.Services.AddInMemoryTokenCaches();
> ```
>
> Later in the development and testing period, adopt a production distributed token cache provider.

`Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*` adds a default implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` that stores cache items in memory, which is used by Microsoft Identity Web for token caching.

The distributed token cache is configured by `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions`:

* In development for debugging purposes, you can disable the L1 cache by setting `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.DisableL1Cache` to `true`. ***Be sure to reset it back to `false` for production.***
* Set the maximum size of your L1 cache with `L1CacheOptions.SizeLimit` to prevent the cache from overrunning the server's memory. The default value is 500 MB.
* In development for debugging purposes, you can disable token <example-value> at rest by setting `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt` to `false`, which is the default value. ***Be sure to reset it back to `true` for production.***
* Set token <example-value> from the cache with `Microsoft.Extensions.Caching.Distributed.DistributedCacheEntryOptions.SlidingExpiration`. The default value is 1 hour.
* For more information, including guidance on the callback for L2 cache failures (`Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.OnL2CacheFailure`) and asynchronous L2 cache writes (`Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.EnableAsyncL2Write`), see `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions` and Token cache serialization: Distributed token caches.

```csharp
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

`Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*` requires a package reference to the `Microsoft.Extensions.Caching.Memory` NuGet package.

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

To configure a production distributed cache provider, see Distributed caching in ASP.NET Core.

> **Warning:**
> Always replace the in-memory distributed token <example-value> with a real token cache provider when deploying the app to a production environment. If you fail to adopt a production distributed token cache provider, the app may suffer significantly degraded performance.

For more information, see Token cache serialization: Distributed caches. However, the code examples shown don't apply to ASP.NET Core apps, which configure distributed caches via `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*`, not `Microsoft.Identity.Web.TokenCacheExtensions.AddDistributedTokenCache*`.

Use a shared Data Protection key ring in production so that instances of the app across servers in a web farm can decrypt tokens when `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt` is set to `true`.

> **Note:**
> For early development and local testing on a single machine, you can set `Microsoft.Identity.Web.TokenCacheProviders.Distributed.MsalDistributedTokenCacheAdapterOptions.Encrypt` to `false` and configure a shared Data Protection key ring later:
>
> ```csharp
> options.Encrypt = false;
> ```
>
> Later in the development and testing period, enable token <example-value> and adopt a shared Data Protection key ring.

The following example shows how to use Azure Blob Storage and Azure Key Vault (`PersistKeysToAzureBlobStorage`/`ProtectKeysWithAzureKeyVault`) for the shared key ring. The service configurations are base case scenarios for demonstration purposes. Before deploying production apps, familiarize yourself with the Azure services and adopt best practices using the Azure services' dedicated documentation sets, which are linked at the end of this section.

Confirm the presence of the following packages in the server project of the Blazor Web App:

* `Azure.Extensions.AspNetCore.DataProtection.Blobs`
* `Azure.Extensions.AspNetCore.DataProtection.Keys`

> **Note:**
> For guidance on adding packages to .NET apps, see the articles under *Install and manage packages* at Package consumption workflow (NuGet documentation). Confirm correct package versions at NuGet.org.

> **Note:**
> Before proceeding with the following steps, confirm that the app is registered with Microsoft Entra.

The following code is typically implemented at the same time that a production distributed token cache provider is implemented. Other options, both within Azure and outside of Azure, are available for managing data protection keys across multiple app instances, but the sample app demonstrates how to use Azure services.

Configure Azure Blob Storage to maintain data protection keys. Follow the guidance in Key <example-value> providers in ASP.NET Core.

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
        SharedTokenCacheTenantId = "<example-value>"
    };

    credential = new DefaultAzureCredential(options);
}

builder.Services.AddDataProtection()
    .SetApplicationName("BlazorWebAppEntra")
    .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential)
    .ProtectKeysWithAzureKeyVault(new Uri("{KEY <example-value>}"), credential);
```

You can pass any app name to `Microsoft.AspNetCore.DataProtection.DataProtectionBuilderExtensions.SetApplicationName*`. Just confirm that all app deployments use the same value.

`{MANAGED IDENTITY CLIENT ID}`: The Azure Managed Identity Client ID (GUID).

`{TENANT ID}`: Tenant ID.

`{BLOB URI}`: Full URI to the key file. The URI is generated by Azure Storage when you create the key file. Do not use a SAS.

`{KEY <example-value>}`: Azure Key Vault key <example-value> used for key encryption. An access policy allows the application to access the key vault with `Get`, `Unwrap Key`, and `Wrap Key` permissions. The version of the key is obtained from the key in the Entra or Azure portal after it's created. If you enable autorotation of the key vault key, make sure that you use a versionless key <example-value> in the app's key vault configuration, where no key GUID is placed at the end of the identifier (example: `https://contoso.vault.azure.net/keys/data-protection`).

> **Note:**
> In non-`Production` environments, the preceding example uses `Azure.Identity.DefaultAzureCredential` to simplify authentication while developing apps that deploy to Azure by combining credentials used in Azure hosting environments with credentials used in local development. For more information, see Authenticate Azure-hosted .NET apps to Azure resources using a system-assigned managed identity.

Alternatively, you can configure the app to supply the values from app settings files using the JSON Configuration Provider. Add the following to the app settings file:

```json
"DistributedTokenCache": {
  "DisableL1Cache": false,
  "L1CacheSizeLimit": 524288000,
  "Encrypt": true,
  "SlidingExpirationInHours": 1
},
"DataProtection": {
  "BlobUri": "{BLOB URI}",
  "KeyIdentifier": "{KEY <example-value>}"
}
```

Example `DataProtection` section:

```json
"DataProtection": {
  "BlobUri": "https://contoso.blob.core.windows.net/data-protection/keys.xml",
  "KeyIdentifier": "https://contoso.vault.azure.net/keys/data-protection"
}
```

> **Note:**
> The key <example-value> in the preceding example is *versionless*. There's no GUID key <example-value> on the end of the identifier. This is particularly important if you opt to configure automatic key <example-value> for the key. For more information, see Configure cryptographic key <example-value> in Azure Key Vault: Key <example-value> policy.

Make the following changes in the `Program` file:

```diff
builder.Services.Configure<MsalDistributedTokenCacheAdapterOptions>(
    options =>
    {
+       var config = builder.Configuration.GetSection("<example-value>");

-       options.DisableL1Cache = false;
+       options.DisableL1Cache = config.GetValue<bool>("DisableL1Cache");

-       options.L1CacheOptions.SizeLimit = 500 * 1024 * 1024;
+       options.L1CacheOptions.SizeLimit = config.GetValue<long>("L1CacheSizeLimit");

-       options.Encrypt = true;
+       options.Encrypt = config.GetValue<bool>("Encrypt");

-       options.SlidingExpiration = TimeSpan.FromHours(1);
+       options.SlidingExpiration = 
+           TimeSpan.FromHours(config.GetValue<int>("SlidingExpirationInHours"));
    });

- builder.Services.AddDataProtection()
-     .SetApplicationName("BlazorWebAppEntra")
-     .PersistKeysToAzureBlobStorage(new Uri("{BLOB URI}"), credential)
-     .ProtectKeysWithAzureKeyVault(new Uri("{KEY <example-value>}"), credential);
```

Add the following code where services are configured in the `Program` file:

```csharp
var config = builder.Configuration.GetSection("DataProtection");

builder.Services.AddDataProtection()
    .SetApplicationName("BlazorWebAppEntra")
    .PersistKeysToAzureBlobStorage(
        new Uri(config.GetValue<string>("BlobUri") ??
        throw new Exception("Missing Blob URI")),
        credential)
    .ProtectKeysWithAzureKeyVault(
        new Uri(config.GetValue<string>("KeyIdentifier") ?? 
        throw new Exception("Missing Key <example-value>")), 
        credential);
```

For more information on using a shared Data Protection key ring and key <example-value> providers, see the following resources:

* Key <example-value> providers in ASP.NET Core
* Configure ASP.NET Core Data Protection
* Use the Azure SDK for .NET in ASP.NET Core apps
* Host ASP.NET Core in a web farm: Data Protection
* Configure ASP.NET Core Data Protection
* Key <example-value> providers in ASP.NET Core
* Azure Key Vault documentation
* Azure Storage documentation
* Provide access to Key Vault keys, certificates, and secrets with Azure role-based access control

**with-yarp-and-aspire:**

## YARP forwarder destination prefix

The Blazor Web App server project'<example-value>'s access token is attached to the `MinimalApiJwt` web API call, specifies a destination prefix of `https://weatherapi`. This value matches the project name passed to `AddProject` in the `AppHost.cs` file of the `Aspire.AppHost` project.

Forwarder in the Blazor Web App server project (`BlazorWebAppEntra`):

```csharp
app.MapForwarder("/weather-forecast", "https://weatherapi", transformBuilder =>
{
    ...
}).RequireAuthorization();
```

Matching project name in the `AppHost.cs` file of the Aspire App Host project (`Aspire.AppHost`):

```csharp
var weatherApi = builder.AddProject<Projects.MinimalApiJwt>("weatherapi");
```

There'<example-value>'s access token.

## Redirect to the home page on logout

The `LogInOrOut` component (`Layout/LogInOrOut.razor`) sets a hidden field for the return URL (`ReturnUrl`) to the current URL (`currentURL`). When the user signs out of the app, the identity provider returns the user to the page from which they logged out. If the user logs out from a secure page, they're returned to the same secure page and sent back through the authentication process. This authentication flow is reasonable when users need to change accounts regularly.

Alternatively, use the following `LogInOrOut` component, which doesn't supply a return URL when logging out.

`Layout/LogInOrOut.razor`:

```razor
<div class="nav-item px-3">
    <AuthorizeView>
        <Authorized>
            <form action="authentication/logout" method="post">
                <AntiforgeryToken />
                <button type="submit" class="nav-link">
                    <span class="bi bi-arrow-bar-left-nav-menu" aria-hidden="true">
                    </span> Logout
                </button>
            </form>
        </Authorized>
        <NotAuthorized>
            <a class="nav-link" href="authentication/login">
                <span class="bi bi-person-badge-nav-menu" aria-hidden="true"></span>
                Login
            </a>
        </NotAuthorized>
    </AuthorizeView>
</div>
```

## Weather data security

For more information on how this app secures its weather data, see Secure data in Blazor Web Apps with Interactive Auto rendering.

## Host in a web farm or cluster

Server-side Blazor Web Apps hosted in a web farm or cluster of machines must adopt *session affinity* to maintain Blazor circuits for users of the app.

We also recommend using a shared Data Protection key ring in production, even when the app uses the Interactive WebAssembly render mode exclusively for client-side rendering (no Blazor circuits).
