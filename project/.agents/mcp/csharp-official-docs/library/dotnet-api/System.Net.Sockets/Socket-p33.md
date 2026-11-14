---
title: "Socket class (part 33 of 33)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/Socket.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Socket class (part 33 of 33)

## Socket.Shutdown(SocketShutdown) method

```csharp
public void Shutdown (System.Net.Sockets.SocketShutdown how);
```

Disables sends and receives on a `Socket`.

Parameters:

- `how`: One of the `SocketShutdown` values that specifies the operation that will no longer be allowed.

Exceptions:

- `SocketException`: An error occurred when attempting to access the socket.
- `ObjectDisposedException`: The `Socket` has been closed.

#### Remarks
When using a connection-oriented `Socket`, always call the `Socket.Shutdown` method before closing the `Socket`. This ensures that all data is sent and received on the connected socket before it is closed.

Call the `Socket.Close` method to free all managed and unmanaged resources associated with the `Socket`. Do not attempt to reuse the `Socket` after closing.

The following table shows the `SocketShutdown` enumeration values that are valid for the `how` parameter.

| Value   | Description                                                                  |
|---------|------------------------------------------------------------------------------|
| Send    | Disable sending on this `Socket`.                    |
| Receive | Disable receiving on this `Socket`.                  |
| Both    | Disable both sending and receiving on this `Socket`. |

Setting `how` to `Send` specifies that subsequent calls to `Socket.Send` are not allowed. If you are using a connectionless `Socket`, specifying `Send` will have no effect.

Setting `how` to `Receive` specifies that subsequent calls to `Socket.Receive` are not allowed. This has no effect on lower protocol layers. If you are using a connection-oriented protocol, the connection is terminated if either of the following conditions exist after a call to `Socket.Shutdown`:

- Data is in the incoming network buffer waiting to be received.
- More data has arrived.

If you are using a connectionless protocol, datagrams are accepted and queued. However, if no buffer space is available for additional incoming datagrams, they will be discarded and no error will be returned to the sender. Using `Socket.Shutdown` on a connectionless `Socket` is not recommended.

Setting `how` to `Both` disables both sends and receives as described above.

> **Note:**
> If you receive a `SocketException` when calling the `Socket.Shutdown` method, use the `ErrorCode` property to obtain the specific error code. After you have obtained this code, refer to the Windows Sockets version 2 API error code documentation for a detailed description of the error.

> **Note:**
> This member outputs trace information when you enable network tracing in your application.

#### Examples
The following code example uses `Socket.Shutdown` to disable the `Socket`.

_Code sample not included: ~/snippets/csharp/System.Net.Sockets/Socket/Close/source.cs._
