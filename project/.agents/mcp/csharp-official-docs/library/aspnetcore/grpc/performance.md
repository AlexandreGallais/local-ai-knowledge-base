---
title: "Performance best practices with gRPC (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/performance.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Performance best practices with gRPC

By James Newton-King

gRPC is designed for high-performance services. This document explains how to get the best performance possible from gRPC.

## Reuse gRPC channels

A gRPC channel should be reused when making gRPC calls. Reusing a channel allows calls to be multiplexed through an existing HTTP/2 connection.

If a new channel is created for each gRPC call then the amount of time it takes to complete can increase significantly. Each call will require multiple network round-trips between the client and the server to create a new HTTP/2 connection:

1. Opening a socket
2. Establishing TCP connection
3. Negotiating TLS
4. Starting HTTP/2 connection
5. Making the gRPC call

Channels are safe to share and reuse between gRPC calls:

* gRPC clients are created with channels. gRPC clients are lightweight objects and don't need to be cached or reused.
* Multiple gRPC clients can be created from a channel, including different types of clients.
* A channel and clients created from the channel can safely be used by multiple threads.
* Clients created from the channel can make multiple simultaneous calls.

gRPC client factory offers a centralized way to configure channels. It automatically reuses underlying channels. For more information, see gRPC client factory integration in .NET.

## Connection concurrency

HTTP/2 connections typically have a limit on the number of maximum concurrent streams (active HTTP requests) on a connection at one time. By default, most servers set this limit to 100 concurrent streams.

A gRPC channel uses a single HTTP/2 connection, and concurrent calls are multiplexed on that connection. When the number of active calls reaches the connection stream limit, additional calls are queued in the client. Queued calls wait for active calls to complete before they are sent. Applications with high load, or long running streaming gRPC calls, could see performance issues caused by calls queuing because of this limit.

.NET 5 introduces the `System.Net.Http.SocketsHttpHandler.EnableMultipleHttp2Connections` property. When set to `true`, additional HTTP/2 connections are created by a channel when the concurrent stream limit is reached. When a `GrpcChannel` is created its internal `SocketsHttpHandler` is automatically configured to create additional HTTP/2 connections. If an app configures its own handler, consider setting `EnableMultipleHttp2Connections` to `true`:

```csharp
var channel = GrpcChannel.ForAddress("https://localhost", new GrpcChannelOptions
{
    HttpHandler = new SocketsHttpHandler
    {
        EnableMultipleHttp2Connections = true,

        // ...configure other handler settings
    }
});
```

.NET Framework apps that make gRPC calls must be configured to use `WinHttpHandler`. .NET Framework apps can set the `System.Net.Http.WinHttpHandler.EnableMultipleHttp2Connections` property to `true` to create additional connections.

There are a couple of workarounds for .NET Core 3.1 apps:

* Create separate gRPC channels for areas of the app with high load. For example, the `Logger` gRPC service might have a high load. Use a separate channel to create the `LoggerClient` in the app.
* Use a pool of gRPC channels, for example,  create a list of gRPC channels. `Random` is used to pick a channel from the list each time a gRPC channel is needed. Using `Random` randomly distributes calls over multiple connections.

> **Important:**
> Increasing the maximum concurrent stream limit on the server is another way to solve this problem. In Kestrel this is configured with `Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.MaxStreamsPerConnection`.
>
> Increasing the maximum concurrent stream limit is not recommended. Too many streams on a single HTTP/2 connection introduces new performance issues:
>
> * Thread contention between streams trying to write to the connection.
> * Connection packet loss causes all calls to be blocked at the TCP layer.

## `ServerGarbageCollection` in client apps

The .NET garbage collector has two modes: workstation garbage collection (GC) and server garbage collection. Each is each tuned for different workloads. ASP.NET Core apps use server GC by default.

Highly concurrent apps generally perform better with server GC. If a gRPC client app is sending and receiving a high number of gRPC calls at the same time, then there may be a performance benefit in updating the app to use server GC.

To enable server GC, set `<ServerGarbageCollection>` in the app's project file:

```xml
<PropertyGroup>
  <ServerGarbageCollection>true</ServerGarbageCollection>
</PropertyGroup>
```

For more information about garbage collection, see Workstation and server garbage collection.

> **Note:**
> ASP.NET Core apps use server GC by default. Enabling `<ServerGarbageCollection>` is only useful in non-server gRPC client apps, for example in a gRPC client console app.

## Asynchronous calls in client apps

Prefer using asynchronous programming with async and await when calling gRPC methods. Making gRPC calls with blocking, such as using `Task.Result` or `Task.Wait()`, prevents other tasks from using a thread. This can lead to thread pool starvation, poor performance, and the app to hang with a deadlock.

All gRPC method types generate asynchronous APIs on gRPC clients. The exception is unary methods, which generate both async _and_ blocking methods.

Consider the following gRPC service defined in a *.proto* file:

```protobuf
service Greeter {
  rpc SayHello (HelloRequest) returns (HelloReply);
}
```

Its generated `GreeterClient` type has two .NET methods for calling `SayHello`:

* `GreeterClient.SayHelloAsync` - calls the `Greeter.SayHello` service asynchronously. Can be awaited.
* `GreeterClient.SayHello` - calls the `Greeter.SayHello` service and blocks until complete.

The blocking `GreeterClient.SayHello` method shouldn't be used in asynchronous code. It can cause performance and reliability issues.

## Load balancing

Some load balancers don't work effectively with gRPC. L4 (transport) load balancers operate at a connection level, by distributing TCP connections across endpoints. This approach works well for loading balancing API calls made with HTTP/1.1. Concurrent calls made with HTTP/1.1 are sent on different connections, allowing calls to be load balanced across endpoints.

Because L4 load balancers operate at a connection level, they don't work well with gRPC. gRPC uses HTTP/2, which multiplexes multiple calls on a single TCP connection. All gRPC calls over that connection go to one endpoint.

There are two options to effectively load balance gRPC:

* Client-side load balancing
* L7 (application) proxy load balancing

> **Note:**
> Only gRPC calls can be load balanced between endpoints. Once a streaming gRPC call is established, all messages sent over the stream go to one endpoint.

### Client-side load balancing

With client-side load balancing, the client knows about endpoints. For each gRPC call, it selects a different endpoint to send the call to. Client-side load balancing is a good choice when latency is important. There's no proxy between the client and the service, so the call is sent to the service directly. The downside to client-side load balancing is that each client must keep track of the available endpoints that it should use.

Lookaside client load balancing is a technique where load balancing state is stored in a central location. Clients periodically query the central location for information to use when making load balancing decisions.

For more information, see gRPC client-side load balancing.

### Proxy load balancing

An L7 (application) proxy works at a higher level than an L4 (transport) proxy. L7 proxies understand HTTP/2. The proxy receives gRPC calls multiplexed on one HTTP/2 connection and distributes them across multiple backend endpoints. Using a proxy is simpler than client-side load balancing, but adds extra latency to gRPC calls.

There are many L7 proxies available. Some options are:

* Envoy - A popular open source proxy.
* Linkerd - Service mesh for Kubernetes.
* YARP: Yet Another Reverse Proxy - An open source proxy written in .NET.

## Inter-process communication

gRPC calls between a client and service are usually sent over TCP sockets. TCP is great for communicating across a network, but inter-process communication (IPC) is more efficient when the client and service are on the same machine.

Consider using a transport like Unix domain sockets or named pipes for gRPC calls between processes on the same machine. For more information, see Inter-process communication with gRPC.

## Keep alive pings

> **Important:**
> Keep alive pings require the cooperation of the server. Do not enable keep alive pings in the client without verifying that the server supports them. A server which does not support keep alive pings will usually ignore the first few pings, and will then send a `GOAWAY` message, closing the active HTTP/2 connection.

Keep alive pings can be used to keep HTTP/2 connections alive during periods of inactivity. Having an existing HTTP/2 connection ready when an app resumes activity allows for the initial gRPC calls to be made quickly, without a delay caused by the connection being reestablished.

Keep alive pings are configured on `System.Net.Http.SocketsHttpHandler`:

```csharp
var handler = new SocketsHttpHandler
{
    PooledConnectionIdleTimeout = Timeout.InfiniteTimeSpan,
    KeepAlivePingDelay = TimeSpan.FromSeconds(60),
    KeepAlivePingTimeout = TimeSpan.FromSeconds(30),
    EnableMultipleHttp2Connections = true
};

var channel = GrpcChannel.ForAddress("https://localhost:5001", new GrpcChannelOptions
{
    HttpHandler = handler
});
```

The preceding code configures a channel that sends a keep alive ping to the server every 60 seconds during periods of inactivity. The ping ensures the server and any proxies in use won't close the connection because of inactivity.

> **Note:**
> Keep alive pings only help keep the connection alive. Long-running gRPC calls on the connection may still be terminated by the server or intermediary proxies for inactivity.

## Flow control

HTTP/2 flow control is a feature that prevents apps from being overwhelmed with data. When using flow control:

* Each HTTP/2 connection and request has an available buffer window. The buffer window is how much data the app can receive at once.
* Flow control activates if the buffer window is filled up. When activated, the sending app pauses sending more data.
* Once the receiving app has processed data, then space in the buffer window is available. The sending app resumes sending data.

Flow control can have a negative impact on performance when receiving large messages. If the buffer window is smaller than incoming message payloads or there's latency between the client and server, then data can be sent in start/stop bursts.

Flow control performance issues can be fixed by increasing buffer window size. In Kestrel, this is configured with `Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialConnectionWindowSize` and `Microsoft.AspNetCore.Server.Kestrel.Core.Http2Limits.InitialStreamWindowSize` at app startup:

```csharp
builder.WebHost.ConfigureKestrel(options =>
{
    var http2 = options.Limits.Http2;
    http2.InitialConnectionWindowSize = 1024 * 1024 * 2; // 2 MB
    http2.InitialStreamWindowSize = 1024 * 1024; // 1 MB
});
```

Recommendations:

* If a gRPC service often receives messages larger than 768 KB, Kestrel's default stream window size, then consider increasing the connection and stream window size.
* The connection window size should always be equal to or greater than the stream window size. A stream is part of the connection, and the sender is limited by both.

For more information about how flow control works, see HTTP/2 Flow Control (blog post).

> **Important:**
> Increasing Kestrel's window size allows Kestrel to buffer more data on behalf of the app, which possibly increases memory usage. Avoid configuring an unnecessarily large window size.

## Gracefully complete streaming calls

Try to complete streaming calls gracefully. Gracefully completing calls avoids unnecessary errors and allow servers to reuse internal data structures between requests.

A call is completed gracefully when the client and server have finished sending messages and the peer has read all the messages.

Client request stream:

1. The client has finished writing messages to the request stream and completes the stream with `call.RequestStream.CompleteAsync()`.
2. The server has read all messages from the request stream. Depending on how you're reading messages, either `requestStream.MoveNext()` returns `false` or `requestStream.ReadAllAsync()` has finished.

Server response stream:

1. The server has finished writing messages to the response stream and the server method has exited.
2. The client has read all messages from the response stream. Depending on how you're reading messages, either `call.ResponseStream.MoveNext()` returns `false` or `call.ResponseStream.ReadAllAsync()` has finished.

For an example of gracefully completing a bi-direction streaming call, see making a bi-directional streaming call.

Server streaming calls don't have a request stream. This means that the only way a client can communicate to the server that the stream should stop is by canceling it. If the overhead from canceled calls is impacting the app then consider changing the server streaming call to a bi-directional streaming call. In a bi-directional streaming call the client completing the request stream can be a signal to the server to end the call.

## Dispose streaming calls

Always dispose streaming calls once they're no longer needed. The type returned when starting streaming calls implements `IDisposable`. Disposing a call once it is no longer needed ensures it is stopped and all resources are cleaned up.

In the following example, the using declaration on the `AccumulateCount()` call ensures it's always disposed if an unexpected error occurs.

```csharp
var client = new Counter.CounterClient(channel);
using var call = client.AccumulateCount();

for (var i = 0; i < 3; i++)
{
    await call.RequestStream.WriteAsync(new CounterRequest { Count = 1 });
}
await call.RequestStream.CompleteAsync();

var response = await call;
Console.WriteLine($"Count: {response.Count}");
// Count: 3
```

Ideally streaming calls should be completed gracefully. Disposing the call ensures the HTTP request between the client and the server is canceled if an unexpected error occurs. Streaming calls that are accidentally left running don't just leak memory and resources on the client, but are left running on the server as well. Many leaked streaming calls could impact the stability of the app.

Disposing of a streaming call that has already completed gracefully doesn't have any negative impact.
