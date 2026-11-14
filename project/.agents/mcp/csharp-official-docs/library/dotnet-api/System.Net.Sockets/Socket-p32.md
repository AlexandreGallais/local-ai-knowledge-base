---
title: "Socket class (part 32 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 32 of 33)

## Socket.SendToAsync(Byte>, SocketFlags, EndPoint) method

```csharp
public System.Threading.Tasks.Task<int> SendToAsync (ArraySegment<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP);
```

Sends data to the specified remote host.

Parameters:

- `buffer`: The buffer for the data to send.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when sending the data.
- `remoteEP`: The remote host to which to send the data.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

To be added.

## Socket.SendToAsync(Byte>, EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendToAsync (ReadOnlyMemory<byte> buffer, System.Net.EndPoint remoteEP, System.Threading.CancellationToken <example-value> = default);
```

Sends data to the specified remote host.

Parameters:

- `buffer`: The buffer for the data to send.
- `remoteEP`: The remote host to which to send the data.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.SendToAsync(Byte>, SocketFlags, EndPoint, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendToAsync (ReadOnlyMemory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.EndPoint remoteEP, System.Threading.CancellationToken <example-value> = default);
```

Sends data to the specified remote host.

Parameters:

- `buffer`: The buffer for the data to send.
- `socketFlags`: A bitwise combination of SocketFlags values that will be used when sending the data.
- `remoteEP`: The remote host to which to send the data.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `remoteEP` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.SendToAsync(Byte>, SocketFlags, SocketAddress, CancellationToken) method

```csharp
public System.Threading.Tasks.ValueTask<int> SendToAsync (ReadOnlyMemory<byte> buffer, System.Net.Sockets.SocketFlags socketFlags, System.Net.SocketAddress socketAddress, System.Threading.CancellationToken <example-value> = default);
```

Sends data to a specific endpoint using the specified `SocketFlags`.

Parameters:

- `buffer`: The buffer for the data to send.
- `socketFlags`: A bitwise combination of `SocketFlags` values that will be used when sending the data.
- `socketAddress`: The `SocketAddress` that represents the destination for the data.
- `cancellationToken`: A cancellation token that can be used to cancel the asynchronous operation.

Returns: An asynchronous task that completes with the number of bytes sent.

Exceptions:

- `ArgumentNullException`: `socketAddress` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## Socket.SetIPProtectionLevel(IPProtectionLevel) method

```csharp
public void SetIPProtectionLevel (System.Net.Sockets.IPProtectionLevel level);
```

Sets the IP protection level on a socket.

Parameters:

- `level`: The IP protection level to set on this socket.

Exceptions:

- `ArgumentException`: The `level` argument is set to `IPProtectionLevel.Unspecified`.
- `NotSupportedException`: The socket is not in the `AddressFamily.InterNetworkV6` or `AddressFamily.InterNetwork` address families.

#### Remarks
The `Socket.SetIPProtectionLevel` method enables restricting an a IPv6 or IP socket to listen on a specified scope, such as addresses with the same link local or site local prefix. This socket option enables applications to place access restrictions on IPv6 or IP sockets. Such restrictions enable an application running on a private LAN to simply and robustly harden itself against external attacks. This socket option can also be used to remove access restrictions if the `level` parameter is set to `Unrestricted`. This socket option widens or narrows the scope of a listening socket, enabling unrestricted access from public and private users when appropriate, or restricting access only to the same site, as required.

This socket option has defined protection levels specified in the `IPProtectionLevel` enumeration.

The `Socket.SetIPProtectionLevel` method is used to enable or disable Network Address Traversal (NAT) for a `Socket` instance. NAT traversal may be provided using Teredo, 6to4, or an ISATAP tunnel.

When the `level` parameter is set to `EdgeRestricted`, or `Restricted`, this explicitly disables NAT traversal for a `Socket` instance.

When the `level` parameter is set to `EdgeRestricted`, this may allow NAT traversal for a `Socket` depending on firewall rules in place on the system.

## Socket.SetRawSocketOption(Int32, Int32, Byte>) method

```csharp
public void SetRawSocketOption (int optionLevel, int optionName, ReadOnlySpan<byte> optionValue);
```

Sets a socket option value using platform-specific level and name identifiers.

Parameters:

- `optionLevel`: The platform-defined option level.
- `optionName`: The platform-defined option name.
- `optionValue`: The value to which the option should be set.

Exceptions:

- `ObjectDisposedException`: The `Socket` has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks

In general, the `SetSocketOption` method should be used whenever setting a `Socket` option.

The `SetRawSocketOption` method should be used only when `SocketOptionLevel` and `SocketOptionName` do not expose the required option.

## Socket.SetSocketOption(SocketOptionLevel, SocketOptionName, Boolean) method

```csharp
public void SetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName, bool optionValue);
```

Sets the specified `Socket` option to the specified `Boolean` value.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.
- `optionValue`: The value of the option, represented as a `Boolean`.

Exceptions:

- `ObjectDisposedException`: The `Socket` object has been closed.
- `SocketException`: An error occurred when attempting to access the socket.

#### Remarks
`Socket` options determine the behavior of the current `Socket`. Set `optionValue` to `true` to enable the option, or to `false` to disable the option.

`Socket` options are grouped by level of protocol support.

Listed below are the various `Socket` options that can be set using this overload. These options are grouped by the appropriate `SocketOptionLevel` value. If you intend to set any of these options, be sure to use the appropriate `SocketOptionLevel` value for the `optionLevel` parameter. The option you choose to set must be specified in the `optionName` parameter. If you want to get the current value of any of the options listed, use the `Socket.GetSocketOption` method.

`Socket` options that can be set using this overload.

- `AcceptConnection`
- `Broadcast`
- `DontLinger`
- `Debug`
- `KeepAlive`
- `OutOfBandInline`
- `ReuseAddress`

`IP` options that can be set using this overload.

- `HeaderIncluded`
- `MulticastLoopback`
- `UseLoopback`

`Tcp` options that can be set using this overload.

- `BsdUrgent`
- `Expedited`
- `NoDelay`

`Udp` options that can be set using this overload.

- `NoChecksum`

For more information on these options, refer to the `SocketOptionName` enumeration.

> **Note:**
> If you receive a `SocketException` exception, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example opens a socket and enables the `DontLinger` and the `OutOfBandInline` socket options.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginAccept/nclsocketenhancements.cs._
## Socket.SetSocketOption(SocketOptionLevel, SocketOptionName, Byte[]) method

```csharp
public void SetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName, byte[] optionValue);
```

Sets the specified `Socket` option to the specified value, represented as a byte array.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.
- `optionValue`: An array of type `Byte` that represents the value of the option.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket` options determine the behavior of the current `Socket`. Use this overload to set those `Socket` options that require a byte array as an option value.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example sets the `LingerOption` and `Socket.Send` time-out values.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.SetSocketOption(SocketOptionLevel, SocketOptionName, Int32) method

```csharp
public void SetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName, int optionValue);
```

Sets the specified `Socket` option to the specified integer value.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.
- `optionValue`: A value of the option.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket` options determine the behavior of the current `Socket`. For an option with a `Boolean` data type, specify a nonzero value to enable the option, and a zero value to disable the option. For an option with an integer data type, specify the appropriate value. `Socket` options are grouped by level of protocol support.

Listed below are the various `Socket` options that can be set using this overload. These options are grouped by the appropriate `SocketOptionLevel`. If you intend to set any of these options, be sure to use the appropriate `SocketOptionLevel` for the `optionLevel` parameter. The option you choose to set must be specified in the `optionName` parameter. If you want to get the current value of any of the options listed, use the `Socket.GetSocketOption` method.

`Socket` options that can be set using this overload.

- `Broadcast`
- `DontLinger`
- `Debug`
- `Error`
- `KeepAlive`
- `OutOfBandInline`
- `ReceiveBuffer`
- `ReceiveTimeout`
- `ReuseAddress`
- `SendBuffer`
- `SendTimeout`
- `Type`

`IP` options that can be set using this overload.

- `HeaderIncluded`
- `IPOptions`
- `IpTimeToLive`
- `MulticastInterface`
- `MulticastLoopback`
- `MulticastTimeToLive`
- `TypeOfService`
- `UseLoopback`

`Tcp` options that can be set using this overload.

- `BsdUrgent`
- `Expedited`
- `NoDelay`

`Udp` options that can be set using this overload.

- `ChecksumCoverage`
- `NoChecksum`

`IPv6` options that can be set using this overload.

- `HopLimit`

For more information about these options, refer to the `SocketOptionName` enumeration.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example sets the `LingerOption` and `Socket.Send` time-out values.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._

## Socket.SetSocketOption(SocketOptionLevel, SocketOptionName, Object) method

```csharp
public void SetSocketOption (System.Net.Sockets.SocketOptionLevel optionLevel, System.Net.Sockets.SocketOptionName optionName, object optionValue);
```

Sets the specified `Socket` option to the specified value, represented as an object.

Parameters:

- `optionLevel`: One of the `SocketOptionLevel` values.
- `optionName`: One of the `SocketOptionName` values.
- `optionValue`: A `LingerOption` or `MulticastOption` that contains the value of the option.

Exceptions:

- `ArgumentNullException`: `optionValue` is `null`.
- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
`Socket` options determine the behavior of the current `Socket`. Use this overload to set the `Linger`, `AddMembership`, and `DropMembership``Socket` options. For the `Linger` option, use `Socket` for the `optionLevel` parameter. For `AddMembership` and `DropMembership`, use `IP`. If you want to get the current value of any of the options listed above, use the `Socket.GetSocketOption` method.

> **Note:**
> If you receive a `SocketException`, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

#### Examples
The following code example sets the `LingerOption` and `Socket.Send` time out values.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/LingerOption/LingerTime/source.cs._
