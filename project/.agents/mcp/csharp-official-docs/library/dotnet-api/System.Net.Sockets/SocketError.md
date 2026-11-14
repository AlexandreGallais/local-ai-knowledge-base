---
title: "SocketError enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SocketError.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SocketError enum

Namespace: `System.Net.Sockets`

```csharp
public enum SocketError
```

Defines error codes for the `Socket` class.

#### Remarks
Most of these errors are returned by the underlying socket provider.

## SocketError.AccessDenied field

```csharp
AccessDenied
```

An attempt was made to access a `Socket` in a way that is forbidden by its access permissions.

## SocketError.AddressAlreadyInUse field

```csharp
AddressAlreadyInUse
```

Only one use of an address is normally permitted.

## SocketError.AddressFamilyNotSupported field

```csharp
AddressFamilyNotSupported
```

The address family specified is not supported. This error is returned if the IPv6 address family was specified and the IPv6 stack is not installed on the local machine. This error is returned if the IPv4 address family was specified and the IPv4 stack is not installed on the local machine.

## SocketError.AddressNotAvailable field

```csharp
AddressNotAvailable
```

The selected IP address is not valid in this context.

## SocketError.AlreadyInProgress field

```csharp
AlreadyInProgress
```

The nonblocking `Socket` already has an operation in progress.

## SocketError.ConnectionAborted field

```csharp
ConnectionAborted
```

The connection was aborted by .NET or the underlying socket provider.

## SocketError.ConnectionRefused field

```csharp
ConnectionRefused
```

The remote host is actively refusing a connection.

## SocketError.ConnectionReset field

```csharp
ConnectionReset
```

The connection was reset by the remote peer.

## SocketError.DestinationAddressRequired field

```csharp
DestinationAddressRequired
```

A required address was omitted from an operation on a `Socket`.

## SocketError.Disconnecting field

```csharp
Disconnecting
```

A graceful shutdown is in progress.

## SocketError.Fault field

```csharp
Fault
```

An invalid pointer address was detected by the underlying socket provider.

## SocketError.HostDown field

```csharp
HostDown
```

The operation failed because the remote host is down.

## SocketError.HostNotFound field

```csharp
HostNotFound
```

No such host is known. The name is not an official host name or alias.

## SocketError.HostUnreachable field

```csharp
HostUnreachable
```

There is no network route to the specified host.

## SocketError.InProgress field

```csharp
InProgress
```

A blocking operation is in progress.

## SocketError.Interrupted field

```csharp
Interrupted
```

A blocking `Socket` call was canceled.

## SocketError.InvalidArgument field

```csharp
InvalidArgument
```

An invalid argument was supplied to a `Socket` member.

## SocketError.IOPending field

```csharp
IOPending
```

The application has initiated an overlapped operation that cannot be completed immediately.

## SocketError.IsConnected field

```csharp
IsConnected
```

The `Socket` is already connected.

## SocketError.MessageSize field

```csharp
MessageSize
```

The datagram is too long.

## SocketError.NetworkDown field

```csharp
NetworkDown
```

The network is not available.

## SocketError.NetworkReset field

```csharp
NetworkReset
```

The application tried to set `SocketOptionName.KeepAlive` on a connection that has already timed out.

## SocketError.NetworkUnreachable field

```csharp
NetworkUnreachable
```

No route to the remote host exists.

## SocketError.NoBufferSpaceAvailable field

```csharp
NoBufferSpaceAvailable
```

No free buffer space is available for a `Socket` operation.

## SocketError.NoData field

```csharp
NoData
```

The requested name or IP address was not found on the name server.

## SocketError.NoRecovery field

```csharp
NoRecovery
```

The error is unrecoverable or the requested database cannot be located.

## SocketError.NotConnected field

```csharp
NotConnected
```

The application tried to send or receive data, and the `Socket` is not connected.

## SocketError.NotInitialized field

```csharp
NotInitialized
```

The underlying socket provider has not been initialized.

## SocketError.NotSocket field

```csharp
NotSocket
```

A `Socket` operation was attempted on a non-socket.

## SocketError.OperationAborted field

```csharp
OperationAborted
```

The overlapped operation was aborted due to the closure of the `Socket`.

## SocketError.OperationNotSupported field

```csharp
OperationNotSupported
```

The address family is not supported by the protocol family.

## SocketError.ProcessLimit field

```csharp
ProcessLimit
```

Too many processes are using the underlying socket provider.

## SocketError.ProtocolFamilyNotSupported field

```csharp
ProtocolFamilyNotSupported
```

The protocol family is not implemented or has not been configured.

## SocketError.ProtocolNotSupported field

```csharp
ProtocolNotSupported
```

The protocol is not implemented or has not been configured.

## SocketError.ProtocolOption field

```csharp
ProtocolOption
```

An unknown, invalid, or unsupported option or level was used with a `Socket`.

## SocketError.ProtocolType field

```csharp
ProtocolType
```

The protocol type is incorrect for this `Socket`.

## SocketError.Shutdown field

```csharp
Shutdown
```

A request to send or receive data was disallowed because the `Socket` has already been closed.

## SocketError.SocketError field

```csharp
SocketError
```

An unspecified `Socket` error has occurred.

## SocketError.SocketNotSupported field

```csharp
SocketNotSupported
```

The support for the specified socket type does not exist in this address family.

## SocketError.Success field

```csharp
Success
```

The `Socket` operation succeeded.

## SocketError.SystemNotReady field

```csharp
SystemNotReady
```

The network subsystem is unavailable.

## SocketError.TimedOut field

```csharp
TimedOut
```

The connection attempt timed out, or the connected host has failed to respond.

## SocketError.TooManyOpenSockets field

```csharp
TooManyOpenSockets
```

There are too many open sockets in the underlying socket provider.

## SocketError.TryAgain field

```csharp
TryAgain
```

The name of the host could not be resolved. Try again later.

## SocketError.TypeNotFound field

```csharp
TypeNotFound
```

The specified class was not found.

## SocketError.VersionNotSupported field

```csharp
VersionNotSupported
```

The version of the underlying socket provider is out of range.

## SocketError.WouldBlock field

```csharp
WouldBlock
```

An operation on a nonblocking socket cannot be completed immediately.
