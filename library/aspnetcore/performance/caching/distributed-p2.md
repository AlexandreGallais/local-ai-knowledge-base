---
title: "Distributed caching in ASP.NET Core (part 2 of 3)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/performance/caching/distributed.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Distributed caching in ASP.NET Core (part 2 of 3)

## Establish distributed caching services

Register an implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` in the _Program.cs_ file. The following framework-provided implementations are described in this article:

* Distributed Redis cache
* Distributed memory cache
* Distributed SQL Server cache
* Distributed Postgres cache
* Distributed NCache cache
* Distributed Azure Cosmos DB cache

### Distributed Redis cache

The distributed Redis cache delivers the best performance and is recommended for production apps. Redis is an open source in-memory data store, which is often used as a distributed cache. You can configure an Azure Cache for Redis for an Azure-hosted ASP.NET Core app, and use an Azure Cache for Redis for local development. For more information, see Review cache recommendations.

An app configures the cache implementation with a `Microsoft.Extensions.Caching.StackExchangeRedis.RedisCache` instance by calling the `Microsoft.Extensions.DependencyInjection.StackExchangeRedisCacheServiceCollectionExtensions.AddStackExchangeRedisCache*` method. For output caching, use the `Microsoft.Extensions.DependencyInjection.StackExchangeRedisOutputCacheServiceCollectionExtensions.AddStackExchangeRedisOutputCache*` method.

1. Create an instance of Azure Cache for Redis.

1. Copy the primary connection string (StackExchange.Redis) to Configuration.

   - **For local development**: Save the connection string with Secret Manager.

   - **For Azure**: Save the connection string in a secure store such as Azure Key Vault.

The following code enables the Azure Cache for Redis:

```csharp
builder.Services.AddStackExchangeRedisCache(options =>
 {
     options.Configuration = builder.Configuration.GetConnectionString("MyRedisConStr");
     options.InstanceName = "SampleInstance";
 });
```

The preceding code assumes the primary connection string (StackExchange.Redis) is saved in configuration with the key name `MyRedisConStr`.

For more information, see Azure Managed Redis.

For a discussion on alternative approaches to a local Redis cache, see GitHub /dotnet/aspnetcore issue #19542.

### Distributed memory cache

The distributed memory cache (`Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddDistributedMemoryCache*`) is a framework-provided implementation of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` that stores items in memory. However, the distributed memory cache isn't an actual distributed cache. The app instance stores the cached items on the server where the app is running.

The distributed memory cache is a useful implementation for development and testing scenarios. It's also useful for a single server in a production scenario where memory consumption isn't an issue. Implementing the distributed memory cache abstracts cached data storage. It allows for implementing a true distributed caching solution in the future if multiple nodes or fault tolerance become necessary.

The sample app makes use of the distributed memory cache when the app runs in the `Development` environment in the _Program.cs_ file.

```csharp
builder.Services.AddDistributedMemoryCache();
```

### Distributed SQL Server cache

The distributed SQL Server cache implementation (`Microsoft.Extensions.DependencyInjection.SqlServerCachingServicesExtensions.AddDistributedSqlServerCache*`) allows the distributed cache to use a SQL Server database as its backing store. To create a SQL Server cached item table in a SQL Server instance, you can use the `sql-cache` tool. The tool creates a table with the name and schema that you specify.

Create a table in SQL Server by running the `sql-cache create` command. Provide the SQL Server instance (`Data Source`), database (`Initial Catalog`), schema (for example, `dbo`), and table name (for example, `TestCache`):

```dotnetcli
dotnet sql-cache create "Data Source=(localdb)/MSSQLLocalDB;Initial Catalog=DistCache;Integrated Security=True;" dbo TestCache
```

When the tool succeeds, a message is logged:

```console
Table and index were created successfully.
```

The table created by the `sql-cache` tool has the following schema:

> **Note:**
> An app should manipulate cache values by using an instance of `Microsoft.Extensions.Caching.Distributed.IDistributedCache`, not an instance of `Microsoft.Extensions.Caching.SqlServer.SqlServerCache`.

The sample app implements the `Microsoft.Extensions.Caching.SqlServer.SqlServerCache` class in a nondevelopment (`Development`) environment in the _Program.cs_ file:

```csharp
builder.Services.AddDistributedSqlServerCache(options =>
{
    options.ConnectionString = builder.Configuration.GetConnectionString(
        "DistCache_ConnectionString");
    options.SchemaName = "dbo";
    options.TableName = "TestCache";
});
```

> **Note:**
> Properties like `Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.ConnectionString` (and optionally, `Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.SchemaName` and `Microsoft.Extensions.Caching.SqlServer.SqlServerCacheOptions.TableName`) are typically stored outside of source control. For example, the Secret Manager or the _appsettings.json_ or _appsettings.{Environment}.json_ file might store the properties. The connection string can contain credentials that should be kept out of source control systems.

For more information, see SQL Database on Azure.

### Distributed Postgres cache

Azure Database for PostgreSQL can be used as a distributed cache backing store via the `IDistributedCache` interface. Azure Database for PostgreSQL is a fully managed, AI-ready Database-as-a-Service (DBaaS) offering built on the open-source PostgreSQL engine. The design supports mission-critical workloads with predictable performance, robust security, high availability, and seamless scalability.

After installing the Microsoft.Extensions.Caching.Postgres NuGet package, configure your distributed cache as follows:

1. Register the Service.

   ```csharp
   using Microsoft.Extensions.DependencyInjection;

   var builder = WebApplication.CreateBuilder(args);

   // Register the Postgres distributed cache.
   builder.Services.AddDistributedPostgresCache(options => {
      options.ConnectionString = builder.Configuration.GetConnectionString("PostgresCache");
      options.SchemaName = builder.Configuration.GetValue<string>("PostgresCache:SchemaName", "public");
      options.TableName = builder.Configuration.GetValue<string>("PostgresCache:TableName", "cache");
      options.CreateIfNotExists = builder.Configuration.GetValue<bool>("PostgresCache:CreateIfNotExists", true);
      options.UseWAL = builder.Configuration.GetValue<bool>("PostgresCache:UseWAL", false);

      // Optional: Configure expiration settings.

      var expirationInterval = builder.Configuration.GetValue<string>("PostgresCache:ExpiredItemsDeletionInterval");
      if (!string.IsNullOrEmpty(expirationInterval) && TimeSpan.TryParse(expirationInterval, out var interval)) {
          options.ExpiredItemsDeletionInterval = interval;
      }

      var slidingExpiration = builder.Configuration.GetValue<string>("PostgresCache:DefaultSlidingExpiration");
      if (!string.IsNullOrEmpty(slidingExpiration) && TimeSpan.TryParse(slidingExpiration, out var sliding)) {
          options.DefaultSlidingExpiration = sliding;
      }
   });

   var app = builder.Build();
   ```

1. Use the cache.

   ```csharp
   public class MyService {
       private readonly IDistributedCache _cache;

       public MyService(IDistributedCache cache) {
           _cache = cache;
       }

       public async Task<string> GetDataAsync(string key) {
           var cachedData = await _cache.GetStringAsync(key);

           if (cachedData == null) {

               // Fetch the data from source.
               var data = await FetchDataFromSource();

               // Cache the data with options.
               var options = new DistributedCacheEntryOptions {
                  AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30),
                  SlidingExpiration = TimeSpan.FromMinutes(5)
               };

               await _cache.SetStringAsync(key, data, options);
               return data;
           }

           return cachedData;
       }
   }
   ```

### Distributed NCache cache

NCache is an open source in-memory distributed cache developed natively in .NET. NCache works both locally and configured as a distributed cache cluster for an ASP.NET Core app running in Azure or on other hosting platforms.

To install and configure NCache on your local machine, see the Getting Started Guide.

To configure NCache:

1. Install the NCache SDK NuGet package, which supports NCache Opensource for .NET Framework and .NET Core apps.

1. Configure the cache cluster in the client configuration (the _client.ncconf_ file).

1. Add the following code to the _Program.cs_ file:

```csharp
builder.Services.AddNCacheDistributedCache(configuration =>
{
    configuration.CacheName = "democache";
    configuration.EnableLogs = true;
    configuration.ExceptionsEnabled = true;
});
```

### Distributed Azure Cosmos DB cache

Azure Cosmos DB can be configured in ASP.NET Core as a session state provider by using the `IDistributedCache` interface. Azure Cosmos DB is a fully managed NoSQL and relational database for modern app development that offers high availability, scalability, and low-latency access to data for mission-critical applications.

After you install the Microsoft.Extensions.Caching.Cosmos NuGet package, configure an Azure Cosmos DB distributed cache. You can use an existing Azure Cosmos DB client or create a new one, as described in the following sections.

For more information, see the Microsoft Caching Extension using Azure Cosmos DB, the GitHub repository README file for the NuGet package.

#### Reuse an existing client

The easiest way to configure a distributed cache is by reusing an existing Azure Cosmos DB client. In this case, the `CosmosClient` instance isn't disposed when the provider is disposed.

```csharp
services.AddCosmosCache((CosmosCacheOptions cacheOptions) =>
{
    cacheOptions.ContainerName = Configuration["CosmosCacheContainer"];
    cacheOptions.DatabaseName = Configuration["CosmosCacheDatabase"];
    cacheOptions.CosmosClient = existingCosmosClient;
    cacheOptions.CreateIfNotExists = true;
});
```

#### Create a new client

Alternatively, instantiate a new client. In this case, the `CosmosClient` instance is disposed when the provider is disposed.

```csharp
services.AddCosmosCache((CosmosCacheOptions cacheOptions) =>
{
    cacheOptions.ContainerName = Configuration["CosmosCacheContainer"];
    cacheOptions.DatabaseName = Configuration["CosmosCacheDatabase"];
    cacheOptions.ClientBuilder = new CosmosClientBuilder(Configuration["CosmosConnectionString"]);
    cacheOptions.CreateIfNotExists = true;
});
```

## Use the distributed cache

To use the `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interface, request an instance of `Microsoft.Extensions.Caching.Distributed.IDistributedCache` in the app. The instance is provided by dependency injection (DI).

When the sample app starts, the `Microsoft.Extensions.Caching.Distributed.IDistributedCache` instance is injected into the _Program.cs_ file. The current time is cached by using the `Microsoft.Extensions.Hosting.IHostApplicationLifetime` interface. (For more information, see .NET Generic Host: IHostApplicationLifetime.)

```csharp
app.Lifetime.ApplicationStarted.Register(() =>
{
    var currentTimeUTC = DateTime.UtcNow.ToString();
    byte[] encodedCurrentTimeUTC = System.Text.Encoding.UTF8.GetBytes(currentTimeUTC);
    var options = new DistributedCacheEntryOptions()
        .SetSlidingExpiration(TimeSpan.FromSeconds(20));
    app.Services.GetService<IDistributedCache>()
                              .Set("cachedTimeUTC", encodedCurrentTimeUTC, options);
});
```

The sample app injects the `Microsoft.Extensions.Caching.Distributed.IDistributedCache` instance into the `IndexModel` object for use by the Index page.

Each time the Index page loads, the cache is checked for the cached time by using the `OnGetAsync` method. If the cached time isn't expired, the time is displayed. If 20 seconds elapsed since the last time the cached time was accessed (the last time this page loaded), the page displays the message, _Cached Time Expired_.

Immediately update the cached time to the current time by selecting the **Reset Cached Time** option. This action triggers the `OnPostResetCachedTime` handler method.

```csharp
public class IndexModel : PageModel
{
    private readonly IDistributedCache _cache;

    public IndexModel(IDistributedCache cache)
    {
        _cache = cache;
    }

    public string? CachedTimeUTC { get; set; }
    public string? ASP_Environment { get; set; }

    public async Task OnGetAsync()
    {
        CachedTimeUTC = "Cached Time Expired";
        var encodedCachedTimeUTC = await _cache.GetAsync("cachedTimeUTC");

        if (encodedCachedTimeUTC != null)
        {
            CachedTimeUTC = Encoding.UTF8.GetString(encodedCachedTimeUTC);
        }

        ASP_Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        if (String.IsNullOrEmpty(ASP_Environment))
        {
            ASP_Environment = "Null, so Production";
        }
    }

    public async Task<IActionResult> OnPostResetCachedTime()
    {
        var currentTimeUTC = DateTime.UtcNow.ToString();
        byte[] encodedCurrentTimeUTC = Encoding.UTF8.GetBytes(currentTimeUTC);
        var options = new DistributedCacheEntryOptions()
            .SetSlidingExpiration(TimeSpan.FromSeconds(20));
        await _cache.SetAsync("cachedTimeUTC", encodedCurrentTimeUTC, options);

        return RedirectToPage();
    }
}
```

> **Note:**
> You don't need to use a Singleton or Scoped lifetime for `Microsoft.Extensions.Caching.Distributed.IDistributedCache` instances with a built-in implementation.
>
> You can also create an `Microsoft.Extensions.Caching.Distributed.IDistributedCache` instance wherever you might need one instead of using DI. However, creating an instance in code can make your code harder to test and violates the Explicit Dependencies Principle.
