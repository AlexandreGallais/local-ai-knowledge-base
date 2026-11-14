---
title: "Dns class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/Dns.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dns class (part 3 of 3)

## Dns.GetHostEntryAsync(String) method

```csharp
public static System.Threading.Tasks.Task<System.Net.IPHostEntry> GetHostEntryAsync (string hostNameOrAddress);
```

Resolves a host name or IP address to an `IPHostEntry` instance as an asynchronous operation.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `IPHostEntry` instance that contains address information about the host specified in `hostNameOrAddress`.

Exceptions:

- `ArgumentNullException`: The `hostNameOrAddress` parameter is `null`.
- `ArgumentOutOfRangeException`: The length of `hostNameOrAddress` parameter is greater than 255 characters.
- `SocketException`: An error was encountered when resolving the `hostNameOrAddress` parameter.
- `ArgumentException`: The `hostNameOrAddress` parameter is an invalid IP address.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete after the `hostNameOrAddress` has been resolved.

This method queries a DNS server for the IP address that is associated with a host name or IP address.

If an empty string is passed as the `hostNameOrAddress` argument, then this method returns the IPv4 and IPv6 addresses of the local host.

If the host name could not be found, the `SocketException` exception is returned with a value of 11001 (Windows Sockets error WSAHOST_NOT_FOUND). This exception can be returned if the DNS server does not respond. This exception can also be returned if the name is not an official host name or alias, or it cannot be found in the database(s) being queried.

The `ArgumentException` exception is also returned if the `hostNameOrAddress` parameter contains `Any` or `IPv6Any`.

This method assumes that if an IP literal string is passed in the `hostNameOrAddress` parameter that the application wants an `IPHostEntry` instance returned with all of the properties set. These properties include the `IPHostEntry.AddressList`, `IPHostEntry.Aliases`, and `IPHostEntry.HostName`. As a result, the implementation of this method exhibits the following behavior when an IP string literal is passed:

1.  The method tries to parse the address. If the `hostNameOrAddress` parameter contains a legal IP string literal, then the first phase succeeds.

2.  A reverse lookup using the IP address of the IP string literal is attempted to obtain the host name. This result is set as the `HostName` property.

3.  The host name from this reverse lookup is used again to obtain all the possible IP addresses associated with the name and set as the `AddressList` property.

For an IPv4 string literal, all three steps above may succeed. But it is possible for a stale DNS record for an IPv4 address that actually belongs to a different host to be returned. This may cause step #3 to fail and throw an exception (there is a DNS PTR record for the IPv4 address, but no DNS A record for the IPv4 address).

For IPv6, step #2 above may fail, since most IPv6 deployments do not register the reverse (PTR) record for an IPv6 address. So this method may return the string IPv6 literal as the fully-qualified domain (FQDN) host name in the `HostName` property.

The `Dns.GetHostAddresses` method has different behavior with respect to IP literals. If step #1 above succeeds (it successfully parses as an IP address), that address is immediately returned as the result. There is no attempt at a reverse lookup.

IPv6 addresses are filtered from the results of this method if the local computer does not have IPv6 installed. As a result, it is possible to get back an empty `IPHostEntry` instance if only IPv6 results where available for the `hostNameOrAddress`.parameter.

The `Aliases` property of the `IPHostEntry` instance returned is not populated by this method and will always be empty.

This method is implemented using the underlying operating system's name resolution APIs (such as the Win32 API getaddrinfo on Windows, and equivalent APIs on other platforms).  If a host is described in the `hosts` file, the IP address or addresses there will be returned without querying the DNS server.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetHostEntry`.

## Dns.GetHostEntryAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.IPHostEntry> GetHostEntryAsync (string hostNameOrAddress, System.Threading.CancellationToken <example-value>);
```

Resolves a host name or IP address to an `IPHostEntry` instance as an asynchronous operation.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `IPHostEntry` instance that contains the address information about the host specified in `hostNameOrAddress`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Dns.GetHostEntry`.

## Dns.GetHostEntryAsync(String, AddressFamily, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.IPHostEntry> GetHostEntryAsync (string hostNameOrAddress, System.Net.Sockets.AddressFamily family, System.Threading.CancellationToken <example-value> = default);
```

Resolves a host name or IP address to an `IPHostEntry` instance as an asynchronous operation.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.
- `family`: The address family for which IPs should be retrieved. If `AddressFamily.Unspecified`, retrieve all IPs regardless of address family.
- `cancellationToken`: A cancellation token that can be used to signal the asynchronous operation should be canceled.

Returns: The task object representing the asynchronous operation. The `Task<T>.Result` property on the task object returns an `IPHostEntry` instance that contains the address information about the host specified in `hostNameOrAddress`.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Dns.GetHostEntry`.

## Dns.GetHostName() method

```csharp
public static string GetHostName ();
```

Gets the host name of the local computer.

Returns: A string that contains the DNS host name of the local computer.

Exceptions:

- `SocketException`: An error is encountered when resolving the local host name.

#### Examples
The following example uses the `Dns.GetHostName` method to obtain the host name of the local computer.

_Code sample not included: ~/snippets/csharp/System.Net/Dns/GetHostName/dns_gethostname.cs._

## Dns.Resolve(String) method

```csharp
public static System.Net.IPHostEntry Resolve (string hostName);
```

Resolves a DNS host name or IP address to an `IPHostEntry` instance.

Parameters:

- `hostName`: A DNS-style host name or IP address.

Returns: An `IPHostEntry` instance that contains address information about the host specified in `hostName`.

Exceptions:

- `ArgumentNullException`: `hostName` is `null`.
- `ArgumentOutOfRangeException`: The length of `hostName` is greater than 255 characters.
- `SocketException`: An error is encountered when resolving `hostName`.

To be added.

## Dns.ResolveAddresses(String) method

```csharp
public static System.Net.DnsResult<System.Net.AddressRecord> ResolveAddresses (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveAddresses(String, AddressFamily) method

```csharp
public static System.Net.DnsResult<System.Net.AddressRecord> ResolveAddresses (string name, System.Net.Sockets.AddressFamily addressFamily);
```

To be added.

Parameters:

- `name`: To be added.
- `addressFamily`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveAddressesAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.AddressRecord>> ResolveAddressesAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveAddressesAsync(String, AddressFamily, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.AddressRecord>> ResolveAddressesAsync (string name, System.Net.Sockets.AddressFamily addressFamily, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `addressFamily`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveCName(String) method

```csharp
public static System.Net.DnsResult<System.Net.CNameRecord> ResolveCName (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveCNameAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.CNameRecord>> ResolveCNameAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveMx(String) method

```csharp
public static System.Net.DnsResult<System.Net.MxRecord> ResolveMx (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveMxAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.MxRecord>> ResolveMxAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveNs(String) method

```csharp
public static System.Net.DnsResult<System.Net.NsRecord> ResolveNs (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveNsAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.NsRecord>> ResolveNsAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolvePtr(IPAddress) method

```csharp
public static System.Net.DnsResult<System.Net.PtrRecord> ResolvePtr (System.Net.IPAddress address);
```

To be added.

Parameters:

- `address`: To be added.

Returns: To be added.

To be added.

## Dns.ResolvePtr(String) method

```csharp
public static System.Net.DnsResult<System.Net.PtrRecord> ResolvePtr (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolvePtrAsync(IPAddress, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.PtrRecord>> ResolvePtrAsync (System.Net.IPAddress address, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `address`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolvePtrAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.PtrRecord>> ResolvePtrAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveSrv(String) method

```csharp
public static System.Net.DnsResult<System.Net.SrvRecord> ResolveSrv (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveSrvAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.SrvRecord>> ResolveSrvAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveTxt(String) method

```csharp
public static System.Net.DnsResult<System.Net.TxtRecord> ResolveTxt (string name);
```

To be added.

Parameters:

- `name`: To be added.

Returns: To be added.

To be added.

## Dns.ResolveTxtAsync(String, CancellationToken) method

```csharp
public static System.Threading.Tasks.Task<System.Net.DnsResult<System.Net.TxtRecord>> ResolveTxtAsync (string name, System.Threading.CancellationToken <example-value> = default);
```

To be added.

Parameters:

- `name`: To be added.
- `cancellationToken`: To be added.

Returns: To be added.

To be added.
