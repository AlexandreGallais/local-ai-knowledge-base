---
title: "RateLimitLease class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading.RateLimiting/RateLimitLease.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RateLimitLease class

Namespace: `System.Threading.RateLimiting`

```csharp
public abstract class RateLimitLease : IDisposable
```

Abstraction for leases returned by `RateLimiter` implementations.
A lease represents the success or failure to acquire a resource and contains potential metadata that is relevant to the acquisition operation.

To be added.

## RateLimitLease.RateLimitLease() constructor

```csharp
protected RateLimitLease ();
```

To be added.

To be added.

## RateLimitLease.IsAcquired property

```csharp
public abstract bool IsAcquired { get; }
```

Represents whether lease acquisition was successful.

Returns: To be added.

To be added.

## RateLimitLease.MetadataNames property

```csharp
public abstract System.Collections.Generic.IEnumerable<string> MetadataNames { get; }
```

Gets a list of the metadata names that are available on the lease.

Returns: To be added.

To be added.

## RateLimitLease.Dispose() method

```csharp
public void Dispose ();
```

Dispose the lease. This may free up space on the limiter implementation the lease came from.

To be added.

## RateLimitLease.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Dispose method for implementations to write.

To be added.

## RateLimitLease.GetAllMetadata() method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,object?>> GetAllMetadata ();
```

Gets a list of all the metadata that is available on the lease.

Returns: List of key-value pairs of metadata name and metadata object.

To be added.

## RateLimitLease.TryGetMetadata(String, Object) method

```csharp
public abstract bool TryGetMetadata (string metadataName, out object? metadata);
```

Attempt to extract metadata for the lease.

Parameters:

- `metadataName`: The name of the metadata. Some common ones can be found in `MetadataName`.
- `metadata`: The metadata object if it exists.

Returns: True if the metadata exists, otherwise false.

To be added.

## RateLimitLease.TryGetMetadata<T>(MetadataName<T>, T) method

```csharp
public bool TryGetMetadata<T> (System.Threading.RateLimiting.MetadataName<T> metadataName, out T metadata);
```

Attempt to extract a strongly-typed metadata for the lease.

Parameters:

- `T`: Type of the expected metadata.
- `metadataName`: The name of the strongly-typed metadata. Some common ones can be found in `MetadataName`.
- `metadata`: The strongly-typed metadata object if it exists.

Returns: True if the metadata exists, otherwise false.

To be added.
