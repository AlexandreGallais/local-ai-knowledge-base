---
title: "TransmitFileOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/TransmitFileOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransmitFileOptions enum

Namespace: `System.Net.Sockets`

```csharp
public enum TransmitFileOptions
```

The `TransmitFileOptions` enumeration defines values used in file transfer requests.

#### Remarks

> **Note:**
> The flags `Disconnect` and `ReuseSocket` return the socket to a disconnected, reusable state after the file has been transmitted. These flags should not be used on a socket where quality of service (QOS) has been requested, because the service provider might immediately delete any quality of service associated with the socket before the file transfer has completed. The best approach for a QOS-enabled socket is to call `Socket.Close` when the file transfer has completed, rather than relying on these flags.

#### Examples
The following example demonstrates the use of `TransmitFileOptions` in a call to `Socket.SendFile`. The file "test.txt" is located in the root directory of the local machine. In this example, a prebuffer and postbuffer of data are created and sent to the remote host with the file. To use the system's default thread, `UseDefaultWorkerThread` is specified.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/BeginAccept/nclsocketenhancements.cs._
## TransmitFileOptions.Disconnect field

```csharp
Disconnect
```

Start a transport-level disconnect after all the file data has been queued for transmission. When used with `TransmitFileOptions.ReuseSocket`, these flags return the socket to a disconnected, reusable state after the file has been transmitted.

## TransmitFileOptions.ReuseSocket field

```csharp
ReuseSocket
```

The socket handle may be reused when the request completes. This flag is valid only if `TransmitFileOptions.Disconnect` is also specified. When used with `TransmitFileOptions.Disconnect`, these flags return the socket to a disconnected, reusable state after the file has been transmitted.

## TransmitFileOptions.UseDefaultWorkerThread field

```csharp
UseDefaultWorkerThread
```

Use the default thread to process long file transfer requests.

## TransmitFileOptions.UseKernelApc field

```csharp
UseKernelApc
```

Use kernel asynchronous procedure calls (APCs) instead of worker threads to process long file transfer requests. Long requests are defined as requests that require more than a single read from the file or a cache; the request therefore depends on the size of the file and the specified length of the send packet.

## TransmitFileOptions.UseSystemThread field

```csharp
UseSystemThread
```

Use system threads to process long file transfer requests.

## TransmitFileOptions.WriteBehind field

```csharp
WriteBehind
```

Complete the file transfer request immediately, without pending. If this flag is specified and the file transfer succeeds, the data has been accepted by the system but not necessarily acknowledged by the remote end. Do not use this flag with the `TransmitFileOptions.Disconnect` and `TransmitFileOptions.ReuseSocket` flags.
