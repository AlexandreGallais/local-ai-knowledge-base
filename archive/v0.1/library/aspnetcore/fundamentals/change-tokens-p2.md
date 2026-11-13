---
title: "Detect changes with change tokens in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/change-tokens.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Detect changes with change tokens in ASP.NET Core (part 2 of 2)

## Monitor cached file changes

File content can be cached in-memory using `Microsoft.Extensions.Caching.Memory.IMemoryCache`. In-memory caching is described in the Cache in-memory topic. Without taking additional steps, such as the implementation described below, *stale* (outdated) data is returned from a cache if the source data changes.

For example, not taking into account the status of a cached source file when renewing a sliding expiration period leads to stale cached file data. Each request for the data renews the sliding expiration period, but the file is never reloaded into the cache. Any app features that use the file's cached content are subject to possibly receiving stale content.

Using change tokens in a file caching scenario prevents the presence of stale file content in the cache. The sample app demonstrates an implementation of the approach.

The sample uses `GetFileContent` to:

* Return file content.
* Implement a retry algorithm with exponential back-off to cover cases where a file access problem temporarily delays reading the file's content.

`Utilities/Utilities.cs`:

```csharp
public async static Task<string> GetFileContent(string filePath)
{
    var runCount = 1;

    while(runCount < 4)
    {
        try
        {
            if (File.Exists(filePath))
            {
                using (var fileStreamReader = File.OpenText(filePath))
                {
                    return await fileStreamReader.ReadToEndAsync();
                }
            }
            else 
            {
                throw new FileNotFoundException();
            }
        }
        catch (IOException ex)
        {
            if (runCount == 3)
            {
                throw;
            }

            Thread.Sleep(TimeSpan.FromSeconds(Math.Pow(2, runCount)));
            runCount++;
        }
    }

    return null;
}
```

A `FileService` is created to handle cached file lookups. The `GetFileContent` method call of the service attempts to obtain file content from the in-memory cache and return it to the caller (`Services/FileService.cs`).

If cached content isn't found using the cache key, the following actions are taken:

1. The file content is obtained using `GetFileContent`.
1. A change token is obtained from the file provider with IFileProviders.Watch. The token's callback is triggered when the file is modified.
1. The file content is cached with a sliding expiration period. The change token is attached with MemoryCacheEntryExtensions.AddExpirationToken to evict the cache entry if the file changes while it's cached.

In the following example, files are stored in the app's content root. `IWebHostEnvironment.ContentRootFileProvider` is used to obtain an `Microsoft.Extensions.FileProviders.IFileProvider` pointing at the app's `IWebHostEnvironment.ContentRootPath`. The `filePath` is obtained with IFileInfo.PhysicalPath.

```csharp
public class FileService
{
    private readonly IMemoryCache _cache;
    private readonly IFileProvider _fileProvider;
    private List<string> _tokens = new List<string>();

    public FileService(IMemoryCache cache, IWebHostEnvironment env)
    {
        _cache = cache;
        _fileProvider = env.ContentRootFileProvider;
    }

    public async Task<string> GetFileContents(string fileName)
    {
        var filePath = _fileProvider.GetFileInfo(fileName).PhysicalPath;
        string fileContent;

        // Try to obtain the file contents from the cache.
        if (_cache.TryGetValue(filePath, out fileContent))
        {
            return fileContent;
        }

        // The cache doesn't have the entry, so obtain the file 
        // contents from the file itself.
        fileContent = await GetFileContent(filePath);

        if (fileContent != null)
        {
            // Obtain a change token from the file provider whose
            // callback is triggered when the file is modified.
            var changeToken = _fileProvider.Watch(fileName);

            // Configure the cache entry options for a five minute
            // sliding expiration and use the change token to
            // expire the file in the cache if the file is
            // modified.
            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetSlidingExpiration(TimeSpan.FromMinutes(5))
                .AddExpirationToken(changeToken);

            // Put the file contents into the cache.
            _cache.Set(filePath, fileContent, cacheEntryOptions);

            return fileContent;
        }

        return string.Empty;
    }
}
```

The `FileService` is registered in the service container along with the memory caching service.

In `Startup.ConfigureServices`:

```csharp
services.AddMemoryCache();
services.AddSingleton<FileService>();
```

The page model loads the file's content using the service.

In the Index page's `OnGet` method (`Pages/Index.cshtml.cs`):

```csharp
var fileContent = await _fileService.GetFileContents("poem.txt");
```

## CompositeChangeToken class

For representing one or more `IChangeToken` instances in a single object, use the `Microsoft.Extensions.Primitives.CompositeChangeToken` class.

```csharp
var firstCancellationTokenSource = new CancellationTokenSource();
var secondCancellationTokenSource = new CancellationTokenSource();

var firstCancellationToken = firstCancellationTokenSource.Token;
var secondCancellationToken = secondCancellationTokenSource.Token;

var firstCancellationChangeToken = new CancellationChangeToken(firstCancellationToken);
var secondCancellationChangeToken = new CancellationChangeToken(secondCancellationToken);

var compositeChangeToken = 
    new CompositeChangeToken(
        new List<IChangeToken> 
        {
            firstCancellationChangeToken, 
            secondCancellationChangeToken
        });
```

`HasChanged` on the composite token <example-value> `true` if any represented token `HasChanged` is `true`. `ActiveChangeCallbacks` on the composite token <example-value> `true` if any represented token `ActiveChangeCallbacks` is `true`. If multiple concurrent change events occur, the composite change callback is invoked one time.

## Related content

* Cache in-memory in ASP.NET Core
* Distributed caching in ASP.NET Core
* Response caching in ASP.NET Core
* Response caching middleware in ASP.NET Core
* Cache Tag Helper in ASP.NET Core MVC
* Distributed Cache Tag Helper in ASP.NET Core
