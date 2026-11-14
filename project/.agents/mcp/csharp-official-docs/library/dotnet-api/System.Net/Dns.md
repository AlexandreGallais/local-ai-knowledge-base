---
title: "Dns class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/Dns.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Dns class

Namespace: `System.Net`

```csharp
public static class Dns
```

Provides simple domain name resolution functionality.

#### Remarks
The `Dns` class is a static class that retrieves information about a specific host from the Internet Domain Name System (DNS).

The host information from the DNS query is returned in an instance of the `IPHostEntry` class. If the specified host has more than one entry in the DNS database, `IPHostEntry` contains multiple IP addresses and aliases.

#### Examples
The following example queries the DNS database for information on the host `www.contoso.com`.

_Code sample not included: ~/snippets/csharp/System.Net/Dns/Overview/source.cs._

## Dns.BeginGetHostAddresses(String, AsyncCallback, Object) method

```csharp
public static IAsyncResult BeginGetHostAddresses (string hostNameOrAddress, AsyncCallback? requestCallback, object? state);
```

Asynchronously returns the Internet Protocol (IP) addresses for the specified host.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `state`: A user-defined object that contains information about the operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` instance that references the asynchronous request.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null`.
- `ArgumentOutOfRangeException`: The length of `hostNameOrAddress` is greater than 255 characters.
- `SocketException`: An error is encountered when resolving `hostNameOrAddress`.
- `ArgumentException`: `hostNameOrAddress` is an invalid IP address.

#### Remarks
The `Dns.BeginGetHostAddresses` method asynchronously queries a DNS server for the IP addresses that are associated with a host name. If `hostNameOrAddress` is an IP address, this address is returned without querying the DNS server.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

If an empty string is passed as the `hostNameOrAddress` argument, then this method returns the IPv4 and IPv6 addresses of the local host.

The asynchronous `Dns.BeginGetHostAddresses` operation must be completed by calling the `Dns.EndGetHostAddresses` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation is complete. To block until the operation is complete, use the `Dns.GetHostAddresses` method.

For more information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

## Dns.BeginGetHostByName(String, AsyncCallback, Object) method

```csharp
public static IAsyncResult BeginGetHostByName (string hostName, AsyncCallback? requestCallback, object? stateObject);
```

Begins an asynchronous request for `IPHostEntry` information about the specified DNS host name.

Parameters:

- `hostName`: The DNS name of the host.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `stateObject`: A user-defined object that contains information about the operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` instance that references the asynchronous request.

Exceptions:

- `ArgumentNullException`: `hostName` is `null`.
- `SocketException`: An error was encountered executing the DNS query.

To be added.

## Dns.BeginGetHostEntry(IPAddress, AsyncCallback, Object) method

```csharp
public static IAsyncResult BeginGetHostEntry (System.Net.IPAddress address, AsyncCallback? requestCallback, object? stateObject);
```

Asynchronously resolves an IP address to an `IPHostEntry` instance.

Parameters:

- `address`: The IP address to resolve.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `stateObject`: A user-defined object that contains information about the operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` instance that references the asynchronous request.

Exceptions:

- `ArgumentNullException`: `address` is `null`.
- `SocketException`: An error is encountered when resolving `address`.
- `ArgumentException`: `address` is an invalid IP address.

#### Remarks
The `Dns.BeginGetHostEntry` method asynchronously queries a DNS server for the IP addresses and aliases associated with an IP address.

**Note** This member emits trace information when you enable network tracing in your application.

The asynchronous `Dns.BeginGetHostEntry` operation must be completed by calling the `Dns.EndGetHostEntry` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation is complete. To block until the operation is complete, use the `Dns.GetHostEntry` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously

#### Examples
The following code example uses the `Dns.BeginGetHostEntry` method to resolve an IP address to an `IPHostEntry` instance.

_Code sample not included: ~/snippets/csharp/System.Net/Dns/BeginGetHostEntry/dnsnewmethods.cs._

## Dns.BeginGetHostEntry(String, AsyncCallback, Object) method

```csharp
public static IAsyncResult BeginGetHostEntry (string hostNameOrAddress, AsyncCallback? requestCallback, object? stateObject);
```

Asynchronously resolves a host name or IP address to an `IPHostEntry` instance.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `stateObject`: A user-defined object that contains information about the operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` instance that references the asynchronous request.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null`.
- `ArgumentOutOfRangeException`: The length of `hostNameOrAddress` is greater than 255 characters.
- `SocketException`: An error is encountered when resolving `hostNameOrAddress`.
- `ArgumentException`: `hostNameOrAddress` is an invalid IP address.

#### Remarks
The `Dns.BeginGetHostEntry` method queries a DNS server for the IP address that is associated with a host name or IP address.

**Note** This member emits trace information when you enable network tracing in your application.

The asynchronous `Dns.BeginGetHostEntry` operation must be completed by calling the `Dns.EndGetHostEntry` method. Typically, the method is invoked by the `requestCallback` delegate.

This method does not block until the operation is complete. To block until the operation is complete, use the `Dns.GetHostEntry` method.

For detailed information about using the asynchronous programming model, see Calling Synchronous Methods Asynchronously.

#### Examples
The following code example uses the `Dns.BeginGetHostEntry` method to resolve an IP address to an `IPHostEntry` instance.

_Code sample not included: ~/snippets/csharp/System.Net/Dns/BeginGetHostEntry/dnsnewmethods.cs._

## Dns.BeginResolve(String, AsyncCallback, Object) method

```csharp
public static IAsyncResult BeginResolve (string hostName, AsyncCallback? requestCallback, object? stateObject);
```

Begins an asynchronous request to resolve a DNS host name or IP address to an `IPAddress` instance.

Parameters:

- `hostName`: The DNS name of the host.
- `requestCallback`: An `AsyncCallback` delegate that references the method to invoke when the operation is complete.
- `stateObject`: A user-defined object that contains information about the operation. This object is passed to the `requestCallback` delegate when the operation is complete.

Returns: An `IAsyncResult` instance that references the asynchronous request.

Exceptions:

- `ArgumentNullException`: `hostName` is `null`.
- `SocketException`: The caller does not have permission to access DNS information.

To be added.

## Dns.EndGetHostAddresses(IAsyncResult) method

```csharp
public static System.Net.IPAddress[] EndGetHostAddresses (IAsyncResult asyncResult);
```

Ends an asynchronous request for DNS information.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to the `Dns.BeginGetHostAddresses` method.

Returns: An array of type `IPAddress` that holds the IP addresses for the host specified by the `hostNameOrAddress` parameter of `Dns.BeginGetHostAddresses`.

#### Remarks
The `Dns.BeginGetHostAddresses` method queries a DNS server for the IP addresses associated with a host name. If `hostNameOrAddress` is an IP address, this address is returned without querying the DNS server.

If an empty string is passed as the `hostNameOrAddress` argument, then this method returns the IPv4 and IPv6 addresses of the local host.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

## Dns.EndGetHostByName(IAsyncResult) method

```csharp
public static System.Net.IPHostEntry EndGetHostByName (IAsyncResult asyncResult);
```

Ends an asynchronous request for DNS information.

Parameters:

- `asyncResult`: An `IAsyncResult` instance that is returned by a call to the `Dns.BeginGetHostByName` method.

Returns: An `IPHostEntry` object that contains DNS information about a host.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

To be added.

## Dns.EndGetHostEntry(IAsyncResult) method

```csharp
public static System.Net.IPHostEntry EndGetHostEntry (IAsyncResult asyncResult);
```

Ends an asynchronous request for DNS information.

Parameters:

- `asyncResult`: An `IAsyncResult` instance returned by a call to an `BeginGetHostEntry` method.

Returns: An `IPHostEntry` instance that contains address information about the host.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

#### Remarks
This method blocks until the operation is complete.

The `Aliases` property of the `IPHostEntry` instance returned is not populated by this method and will always be empty.

To perform this operation synchronously, use a `Dns.GetHostEntry` method.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

## Dns.EndResolve(IAsyncResult) method

```csharp
public static System.Net.IPHostEntry EndResolve (IAsyncResult asyncResult);
```

Ends an asynchronous request for DNS information.

Parameters:

- `asyncResult`: An `IAsyncResult` instance that is returned by a call to the `Dns.BeginResolve` method.

Returns: An `IPHostEntry` object that contains DNS information about a host.

Exceptions:

- `ArgumentNullException`: `asyncResult` is `null`.

To be added.

## Dns.GetHostAddresses(String) method

```csharp
public static System.Net.IPAddress[] GetHostAddresses (string hostNameOrAddress);
```

Returns the Internet Protocol (IP) addresses for the specified host.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.

Returns: An array of type `IPAddress` that holds the IP addresses for the host that is specified by the `hostNameOrAddress` parameter.

Exceptions:

- `ArgumentNullException`: `hostNameOrAddress` is `null`.
- `ArgumentOutOfRangeException`: The length of `hostNameOrAddress` is greater than 255 characters.
- `SocketException`: An error is encountered when resolving `hostNameOrAddress`.
- `ArgumentException`: `hostNameOrAddress` is an invalid IP address.

#### Remarks
The `Dns.GetHostAddresses` method queries the DNS subsystem for the IP addresses associated with a host name. If `hostNameOrAddress` is an IP address, this address is returned without querying the DNS server.

If an empty string is passed as the `hostNameOrAddress` argument, then this method returns the IPv4 and IPv6 addresses of the local host.

IPv6 addresses are filtered from the results of the `Dns.GetHostAddresses` method if the local computer does not have IPv6 installed. As a result, it is possible to get back an empty `IPAddress` instance if only IPv6 results were available for the `hostNameOrAddress` parameter.

This method is implemented using the underlying operating system's name resolution APIs (such as the Win32 API getaddrinfo on Windows, and equivalent APIs on other platforms).  If a host is described in the `hosts` file, the IP address or addresses there will be returned without querying the DNS server.

> **Note:**
> This member emits trace information when you enable network tracing in your application.

#### Examples
The following code example uses the `Dns.GetHostAddresses` method to resolve an IP address to an array of type `IPAddress`.

_Code sample not included: ~/snippets/csharp/System.Net/Dns/BeginGetHostEntry/dnsnewmethods.cs._

## Dns.GetHostAddresses(String, AddressFamily) method

```csharp
public static System.Net.IPAddress[] GetHostAddresses (string hostNameOrAddress, System.Net.Sockets.AddressFamily family);
```

Returns the Internet Protocol (IP) addresses for the specified host.

Parameters:

- `hostNameOrAddress`: The host name or IP address to resolve.
- `family`: The address family for which IPs should be retrieved. If `AddressFamily.Unspecified`, retrieve all IPs regardless of address family.

Returns: An array of type `IPAddress` that holds the IP addresses for the host that is specified by the `hostNameOrAddress` parameter.

To be added.
