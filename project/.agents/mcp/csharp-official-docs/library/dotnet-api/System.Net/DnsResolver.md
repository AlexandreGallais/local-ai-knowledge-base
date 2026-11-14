---
title: "DnsResolver class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/DnsResolver.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DnsResolver class

Namespace: `System.Net`

```csharp
public sealed class DnsResolver : IAsyncDisposable, IDisposable
```

To be added.

To be added.

## DnsResolver.DnsResolver() constructor

```csharp
public DnsResolver ();
```

To be added.

To be added.

## DnsResolver.DnsResolver(DnsResolverOptions) constructor

```csharp
public DnsResolver (System.Net.DnsResolverOptions options);
```

To be added.

Parameters:

- `options`: To be added.

To be added.

## DnsResolver.Dispose() method

```csharp
public void Dispose ();
```

To be added.

To be added.

## DnsResolver.DisposeAsync() method

```csharp
public System.Threading.Tasks.ValueTask DisposeAsync ();
```

To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveAddresses(String) method

```csharp
public System.Net.DnsResult<System.Net.AddressRecord> ResolveAddresses (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveAddresses(String, AddressFamily) method

```csharp
public System.Net.DnsResult<System.Net.AddressRecord> ResolveAddresses (string name, System.Net.Sockets.AddressFamily addressFamily);
```

To be added.

Parameters:

- `name`: To be added.
- `addressFamily`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveAddressesAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.AddressRecord>> ResolveAddressesAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveAddressesAsync(String, AddressFamily, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.AddressRecord>> ResolveAddressesAsync (string name, System.Net.Sockets.AddressFamily addressFamily, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `addressFamily`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveCName(String) method

```csharp
public System.Net.DnsResult<System.Net.CNameRecord> ResolveCName (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveCNameAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.CNameRecord>> ResolveCNameAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveMx(String) method

```csharp
public System.Net.DnsResult<System.Net.MxRecord> ResolveMx (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveMxAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.MxRecord>> ResolveMxAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveNs(String) method

```csharp
public System.Net.DnsResult<System.Net.NsRecord> ResolveNs (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveNsAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.NsRecord>> ResolveNsAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolvePtr(IPAddress) method

```csharp
public System.Net.DnsResult<System.Net.PtrRecord> ResolvePtr (System.Net.IPAddress address);
```

To be added.

Parameters:

- `address`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolvePtr(String) method

```csharp
public System.Net.DnsResult<System.Net.PtrRecord> ResolvePtr (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolvePtrAsync(IPAddress, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.PtrRecord>> ResolvePtrAsync (System.Net.IPAddress address, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `address`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolvePtrAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.PtrRecord>> ResolvePtrAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveSrv(String) method

```csharp
public System.Net.DnsResult<System.Net.SrvRecord> ResolveSrv (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveSrvAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.SrvRecord>> ResolveSrvAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveTxt(String) method

```csharp
public System.Net.DnsResult<System.Net.TxtRecord> ResolveTxt (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## DnsResolver.ResolveTxtAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.TxtRecord>> ResolveTxtAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
