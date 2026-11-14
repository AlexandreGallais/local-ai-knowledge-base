---
title: "MetadataName class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/MetadataName.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MetadataName class

Namespace: `System.Threading.RateLimiting`

```csharp
public static class MetadataName
```

Contains some common metadata name-type pairs and helper method to create a metadata name.

To be added.

## MetadataName.ReasonPhrase property

```csharp
public static System.Threading.RateLimiting.MetadataName<string> ReasonPhrase { get; }
```

Metadata put on a failed lease acquisition to specify the reason the lease failed.

Returns: To be added.

To be added.

## MetadataName.RetryAfter property

```csharp
public static System.Threading.RateLimiting.MetadataName<TimeSpan> RetryAfter { get; }
```

Metadata put on a failed lease acquisition to specify when to retry acquiring a lease.
For example, used in `TokenBucketRateLimiter` which periodically replenishes leases.

Returns: To be added.

To be added.

## MetadataName.Create<T>(String) method

```csharp
public static System.Threading.RateLimiting.MetadataName<T> Create<T> (string name);
```

Create a strongly-typed metadata name.

Parameters:

- `T`: Type that the metadata will contain.
- `name`: Name of the metadata.

To be added.
