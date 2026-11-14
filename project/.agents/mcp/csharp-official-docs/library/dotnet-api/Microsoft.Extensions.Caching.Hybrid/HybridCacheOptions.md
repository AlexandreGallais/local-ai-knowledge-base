---
title: "HybridCacheOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Hybrid/HybridCacheOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HybridCacheOptions class

Namespace: `Microsoft.Extensions.Caching.Hybrid`

```csharp
public class HybridCacheOptions
```

Options for configuring the default `HybridCache` implementation.

To be added.

## HybridCacheOptions.HybridCacheOptions() constructor

```csharp
public HybridCacheOptions ();
```

To be added.

To be added.

## HybridCacheOptions.DefaultEntryOptions property

```csharp
public Microsoft.Extensions.Caching.Hybrid.HybridCacheEntryOptions? DefaultEntryOptions { get; set; }
```

Gets or sets the default global options to be applied to `HybridCache` operations.

Returns: To be added.

If options are specified at the individual call level, the non-null values are merged
(with the per-call options being used in preference to the global options). If no value is
specified for a given option (globally or per-call), the implementation can choose a reasonable default.

## HybridCacheOptions.DisableCompression property

```csharp
public bool DisableCompression { get; set; }
```

Gets or sets a value indicating whether compression for this `HybridCache` instance is disabled.

Returns: To be added.

To be added.

## HybridCacheOptions.DistributedCacheServiceKey <example-value>

```csharp
public object? DistributedCacheServiceKey { get; set; }
```

Gets or sets the key used to resolve the distributed cache service from the `IServiceProvider`.

Returns: To be added.

To be added.

## HybridCacheOptions.MaximumKeyLength property

```csharp
public int MaximumKeyLength { get; set; }
```

Gets or sets the maximum permitted length (in characters) of keys.

Returns: The maximum permitted length of keys, in characters. The default value is 1024 characters.

Attempts to use keys over this size are logged.

## HybridCacheOptions.MaximumPayloadBytes property

```csharp
public long MaximumPayloadBytes { get; set; }
```

Gets or sets the maximum size of cache items.

Returns: The maximum size of cache items. The default value is 1 MiB.

Attempts to store values over this size are logged,
and the value isn't stored in the cache.

## HybridCacheOptions.ReportTagMetrics property

```csharp
public bool ReportTagMetrics { get; set; }
```

Gets or sets a value indicating whether to use "tags" data as dimensions on metric reporting.

Returns: `true` to use "tags" data as dimensions on metric reporting; otherwise, `false`.

If enabled, take care to ensure that tags don't contain data that
should not be visible in metrics systems.
