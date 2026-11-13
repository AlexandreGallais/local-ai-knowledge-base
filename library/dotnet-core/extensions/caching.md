---
title: "Caching in .NET (part 1 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/extensions/caching.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Caching in .NET

In this article, you learn about various caching mechanisms. Caching is the act of storing data in an intermediate-layer, making subsequent data retrievals faster. Conceptually, caching is a performance optimization strategy and design consideration. Caching can significantly improve app performance by making infrequently changing (or expensive to retrieve) data more readily available. This article introduces three caching approaches and provides sample source code for each:

- Microsoft.Extensions.Caching.Memory: In-memory caching for single-server scenarios
- Microsoft.Extensions.Caching.Hybrid: Hybrid caching that combines in-memory and distributed caching with additional features
- Microsoft.Extensions.Caching.Distributed: Distributed caching for multi-server scenarios

> **Important:**
> There are two `MemoryCache` classes within .NET, one in the `System.Runtime.Caching` namespace and the other in the `Microsoft.Extensions.Caching` namespace:
>
> - `System.Runtime.Caching.MemoryCache`
> - `Microsoft.Extensions.Caching.Memory.MemoryCache`
>
> While this article focuses on caching, it doesn't include the `System.Runtime.Caching` NuGet package. All references to `MemoryCache` are within the `Microsoft.Extensions.Caching` namespace.

All of the `Microsoft.Extensions.*` packages come dependency injection (DI) ready. The `Microsoft.Extensions.Caching.Memory.IMemoryCache`, `Microsoft.Extensions.Caching.Hybrid.HybridCache`, and `Microsoft.Extensions.Caching.Distributed.IDistributedCache` interfaces can be used as services.

## In-memory caching

In this section, you learn about the Microsoft.Extensions.Caching.Memory package. The current implementation of the `Microsoft.Extensions.Caching.Memory.IMemoryCache` is a wrapper around the `System.Collections.Concurrent.ConcurrentDictionary`2`, exposing a feature-rich API. Entries within the cache are represented by the `Microsoft.Extensions.Caching.Memory.ICacheEntry` and can be any `object`. The in-memory cache solution is great for apps that run on a single server, where the cached data rents memory in the app's process.

> **Tip:**
> For multi-server caching scenarios, consider the Distributed caching approach as an alternative to in-memory caching.

### In-memory caching API

The consumer of the cache has control over both sliding and absolute expirations:

- `Microsoft.Extensions.Caching.Memory.ICacheEntry.AbsoluteExpiration`
- `Microsoft.Extensions.Caching.Memory.ICacheEntry.AbsoluteExpirationRelativeToNow`
- `Microsoft.Extensions.Caching.Memory.ICacheEntry.SlidingExpiration`

Setting an expiration causes entries in the cache to be *evicted* if they're not accessed within the expiration time allotment. Consumers have additional options for controlling cache entries, through `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions`. Each `Microsoft.Extensions.Caching.Memory.ICacheEntry` is paired with `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions`, which exposes expiration eviction functionality with `Microsoft.Extensions.Primitives.IChangeToken`, priority settings with `Microsoft.Extensions.Caching.Memory.CacheItemPriority`, and controlling the `Microsoft.Extensions.Caching.Memory.ICacheEntry.Size`. The relevant extension methods are:

- `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.AddExpirationToken*`
- `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.RegisterPostEvictionCallback*`
- `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetSize*`
- `Microsoft.Extensions.Caching.Memory.MemoryCacheEntryExtensions.SetPriority*`

### In-memory cache example

To use the default `Microsoft.Extensions.Caching.Memory.IMemoryCache` implementation, call the `Microsoft.Extensions.DependencyInjection.MemoryCacheServiceCollectionExtensions.AddMemoryCache*` extension method to register all the required services with DI. In the following code sample, the generic host is used to expose DI functionality:

```csharp
﻿using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddMemoryCache();
using IHost host = builder.Build();
```
Depending on your .NET workload, you might access the `IMemoryCache` differently, such as constructor injection. In this sample, you use the `IServiceProvider` instance on the `host` and call generic `Microsoft.Extensions.DependencyInjection.ServiceProviderServiceExtensions.GetRequiredService``1(System.IServiceProvider)` extension method:

```csharp
IMemoryCache cache =
    host.Services.GetRequiredService<IMemoryCache>();
```
With in-memory caching services registered, and resolved through DI, you're ready to start caching. This sample iterates through the letters in the English alphabet 'A' through 'Z'. The `record AlphabetLetter` type holds the reference to the letter, and generates a message.

```csharp
file record AlphabetLetter(char Letter)
{
    internal string Message =>
        $"The '{Letter}' character is the {Letter - 64} letter in the English alphabet.";
}
```
> **Tip:**
> The `file` access modifier is used on the `AlphabetLetter` type, as it's defined within and only accessed from the _Program.cs_ file. For more information, see file (C# Reference). To see the full source code, see the Program.cs section.

The sample includes a helper function that iterates through the alphabet letters:

```csharp
static async ValueTask IterateAlphabetAsync(
    Func<char, Task> asyncFunc)
{
    for (char letter = 'A'; letter <= 'Z'; ++letter)
    {
        await asyncFunc(letter);
    }

    Console.WriteLine();
}
```
In the preceding C# code:

- The `Func<char, Task> asyncFunc` is awaited on each iteration, passing the current `letter`.
- After all letters have been processed, a blank line is written to the console.

To add items to the cache call one of the `Create`, or `Set` APIs:

```csharp
var addLettersToCacheTask = IterateAlphabetAsync(letter =>
{
    MemoryCacheEntryOptions options = new()
    {
        AbsoluteExpirationRelativeToNow =
            TimeSpan.FromMilliseconds(MillisecondsAbsoluteExpiration)
    };

    _ = options.RegisterPostEvictionCallback(OnPostEviction);

    AlphabetLetter alphabetLetter =
        cache.Set(
            letter, new AlphabetLetter(letter), options);

    Console.WriteLine($"{alphabetLetter.Letter} was cached.");

    return Task.Delay(
        TimeSpan.FromMilliseconds(MillisecondsDelayAfterAdd));
});
await addLettersToCacheTask;
```
In the preceding C# code:

- The variable `addLettersToCacheTask` delegates to `IterateAlphabetAsync` and is awaited.
- The `Func<char, Task> asyncFunc` is argued with a lambda.
- The `MemoryCacheEntryOptions` is instantiated with an absolute expiration relative to now.
- A post eviction callback is registered.
- An `AlphabetLetter` object is instantiated, and passed into `Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*` along with `letter` and `options`.
- The letter is written to the console as being cached.
- Finally, a `System.Threading.Tasks.Task.Delay*` is returned.

For each letter in the alphabet, a cache entry is written with an expiration and post-eviction callback.

The post-eviction callback writes the details of the value that was evicted to the console:

```csharp
static void OnPostEviction(
    object key, object? letter, EvictionReason reason, object? state)
{
    if (letter is AlphabetLetter alphabetLetter)
    {
        Console.WriteLine($"{alphabetLetter.Letter} was evicted for {reason}.");
    }
};
```
Now that the cache is populated, another call to `IterateAlphabetAsync` is awaited, but this time you call `Microsoft.Extensions.Caching.Memory.IMemoryCache.TryGetValue*`:

```csharp
var readLettersFromCacheTask = IterateAlphabetAsync(letter =>
{
    if (cache.TryGetValue(letter, out object? value) &&
        value is AlphabetLetter alphabetLetter)
    {
        Console.WriteLine($"{letter} is still in cache. {alphabetLetter.Message}");
    }

    return Task.CompletedTask;
});
await readLettersFromCacheTask;
```
If the `cache` contains the `letter` key, and the `value` is an instance of an `AlphabetLetter` it's written to the console. When the `letter` key isn't in the cache, it was evicted and its post eviction callback was invoked.

#### Additional extension methods

The `IMemoryCache` comes with many convenience-based extension methods, including an asynchronous `GetOrCreateAsync`:

- `Microsoft.Extensions.Caching.Memory.CacheExtensions.Get*`
- `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreate*`
- `Microsoft.Extensions.Caching.Memory.CacheExtensions.GetOrCreateAsync*`
- `Microsoft.Extensions.Caching.Memory.CacheExtensions.Set*`
- `Microsoft.Extensions.Caching.Memory.CacheExtensions.TryGetValue*`

#### Put it all together

The entire sample app source code is a top-level program and requires two NuGet packages:

- `Microsoft.Extensions.Caching.Memory`
- `Microsoft.Extensions.Hosting`

```csharp
﻿using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

HostApplicationBuilder builder = Host.CreateApplicationBuilder(args);
builder.Services.AddMemoryCache();
using IHost host = builder.Build();

IMemoryCache cache =
    host.Services.GetRequiredService<IMemoryCache>();

const int MillisecondsDelayAfterAdd = 50;
const int MillisecondsAbsoluteExpiration = 750;

static void OnPostEviction(
    object key, object? letter, EvictionReason reason, object? state)
{
    if (letter is AlphabetLetter alphabetLetter)
    {
        Console.WriteLine($"{alphabetLetter.Letter} was evicted for {reason}.");
    }
};

static async ValueTask IterateAlphabetAsync(
    Func<char, Task> asyncFunc)
{
    for (char letter = 'A'; letter <= 'Z'; ++letter)
    {
        await asyncFunc(letter);
    }

    Console.WriteLine();
}

var addLettersToCacheTask = IterateAlphabetAsync(letter =>
{
    MemoryCacheEntryOptions options = new()
    {
        AbsoluteExpirationRelativeToNow =
            TimeSpan.FromMilliseconds(MillisecondsAbsoluteExpiration)
    };

    _ = options.RegisterPostEvictionCallback(OnPostEviction);

    AlphabetLetter alphabetLetter =
        cache.Set(
            letter, new AlphabetLetter(letter), options);

    Console.WriteLine($"{alphabetLetter.Letter} was cached.");

    return Task.Delay(
        TimeSpan.FromMilliseconds(MillisecondsDelayAfterAdd));
});
await addLettersToCacheTask;

var readLettersFromCacheTask = IterateAlphabetAsync(letter =>
{
    if (cache.TryGetValue(letter, out object? value) &&
        value is AlphabetLetter alphabetLetter)
    {
        Console.WriteLine($"{letter} is still in cache. {alphabetLetter.Message}");
    }

    return Task.CompletedTask;
});
await readLettersFromCacheTask;

await host.RunAsync();

file record AlphabetLetter(char Letter)
{
    internal string Message =>
        $"The '{Letter}' character is the {Letter - 64} letter in the English alphabet.";
}
```
You can adjust the `MillisecondsDelayAfterAdd` and `MillisecondsAbsoluteExpiration` values to observe the changes in behavior to the expiration and eviction of cached entries. The following is sample output from running this code. (Due to the nondeterministic nature of .NET events, your output might be different.)

```console
A was cached.
B was cached.
C was cached.
D was cached.
E was cached.
F was cached.
G was cached.
H was cached.
I was cached.
J was cached.
K was cached.
L was cached.
M was cached.
N was cached.
O was cached.
P was cached.
Q was cached.
R was cached.
S was cached.
T was cached.
U was cached.
V was cached.
W was cached.
X was cached.
Y was cached.
Z was cached.

A was evicted for Expired.
C was evicted for Expired.
B was evicted for Expired.
E was evicted for Expired.
D was evicted for Expired.
F was evicted for Expired.
H was evicted for Expired.
K was evicted for Expired.
L was evicted for Expired.
J was evicted for Expired.
G was evicted for Expired.
M was evicted for Expired.
N was evicted for Expired.
I was evicted for Expired.
P was evicted for Expired.
R was evicted for Expired.
O was evicted for Expired.
Q was evicted for Expired.
S is still in cache. The 'S' character is the 19 letter in the English alphabet.
T is still in cache. The 'T' character is the 20 letter in the English alphabet.
U is still in cache. The 'U' character is the 21 letter in the English alphabet.
V is still in cache. The 'V' character is the 22 letter in the English alphabet.
W is still in cache. The 'W' character is the 23 letter in the English alphabet.
X is still in cache. The 'X' character is the 24 letter in the English alphabet.
Y is still in cache. The 'Y' character is the 25 letter in the English alphabet.
Z is still in cache. The 'Z' character is the 26 letter in the English alphabet.
```

Since the absolute expiration (`Microsoft.Extensions.Caching.Memory.MemoryCacheEntryOptions.AbsoluteExpirationRelativeToNow`) is set, all the cached items will eventually be evicted.
