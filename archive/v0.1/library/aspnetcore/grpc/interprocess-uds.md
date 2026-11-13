---
title: "Inter-process communication with gRPC and Unix domain sockets"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/interprocess-uds.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Inter-process communication with gRPC and Unix domain sockets

-->
-->

By James Newton-King

.NET supports inter-process communication (IPC) using gRPC. For more information about getting started with using gRPC to communicate between processes, see Inter-process communication with gRPC.

Unix domain sockets (UDS) is a widely supported IPC transport that's more efficient than TCP when the client and server are on the same machine. This article discusses how to configure gRPC communication over UDS.

## Prerequisites

* .NET 5 or later
* Linux, macOS, or Windows 10/Windows Server 2019 or later

## Server configuration

Unix domain sockets are supported by Kestrel, which is configured in `Program.cs`:

```csharp
var socketPath = Path.Combine(Path.GetTempPath(), "socket.tmp");

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.ConfigureKestrel(serverOptions =>
{
    serverOptions.ListenUnixSocket(socketPath, listenOptions =>
    {
        listenOptions.Protocols = HttpProtocols.Http2;
    });
});
```

The preceding example:

* Configures Kestrel's endpoints in `Microsoft.AspNetCore.Hosting.WebHostBuilderKestrelExtensions.ConfigureKestrel*`.
* Calls `Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions.ListenUnixSocket*` to listen to a UDS with the specified path.
* Creates a UDS endpoint that isn't configured to use HTTPS. For information about enabling HTTPS, see Kestrel HTTPS endpoint configuration.

## Client configuration

`GrpcChannel` supports making gRPC calls over custom transports. When a channel is created, it can be configured with a `System.Net.Http.SocketsHttpHandler` that has a custom `System.Net.Http.SocketsHttpHandler.ConnectCallback`. The callback allows the client to make connections over custom transports and then send HTTP requests over that transport.

> **Note:**
> Some connectivity features of `GrpcChannel`, such as client side load balancing and channel status, can't be used together with Unix domain sockets.

Unix domain sockets connection factory example:

```csharp
public class UnixDomainSocketsConnectionFactory
{
    private readonly EndPoint endPoint;

    public UnixDomainSocketsConnectionFactory(EndPoint endPoint)
    {
        this.endPoint = endPoint;
    }

    public async ValueTask<Stream> ConnectAsync(SocketsHttpConnectionContext _,
        CancellationToken <example-value> = default)
    {
        var socket = new Socket(AddressFamily.Unix, SocketType.Stream, ProtocolType.Unspecified);

        try
        {
            await socket.ConnectAsync(this.endPoint, cancellationToken).ConfigureAwait(false);
            return new NetworkStream(socket, true);
        }
        catch
        {
            socket.Dispose();
            throw;
        }
    }
}
```

Using the custom connection factory to create a channel:

```csharp
public static readonly string SocketPath = Path.Combine(Path.GetTempPath(), "socket.tmp");

public static GrpcChannel CreateChannel()
{
    var udsEndPoint = new UnixDomainSocketEndPoint(SocketPath);
    var connectionFactory = new UnixDomainSocketsConnectionFactory(udsEndPoint);
    var socketsHttpHandler = new SocketsHttpHandler
    {
        ConnectCallback = connectionFactory.ConnectAsync
    };

    return GrpcChannel.ForAddress("http://localhost", new GrpcChannelOptions
    {
        HttpHandler = socketsHttpHandler
    });
}
```

Channels created using the preceding code send gRPC calls over Unix domain sockets.
