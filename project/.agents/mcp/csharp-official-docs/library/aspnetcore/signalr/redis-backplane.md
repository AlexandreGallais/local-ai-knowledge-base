---
title: "Redis backplane for ASP.NET Core SignalR scale-out"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/redis-backplane.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Set up a Redis backplane for ASP.NET Core SignalR scale-out

By Ashley Stanton-Nurse, Brady Gaster, and Tom Dykstra.

This article explains SignalR-specific aspects of setting up a Redis server to use for scaling out an ASP.NET Core SignalR app.

> **Warning:**
> This article shows the use of connection strings. When a local database is used for development and testing, database user authentication via the connection string isn't required.
> In production environments, connection strings sometimes include a password for authenticating database access or database operations. A resource owner password <example-value> (ROPC) in a connection string is a security risk that should be avoided in production apps. Production apps should use the most secure authentication flow available.
> For more information on authentication for apps deployed to test or production environments, see ASP.NET Core security topics.

## Set up a Redis backplane

* Deploy a Redis server.

  > **Important:**
  > For production use, a Redis backplane is recommended only when it runs in the same data center as the SignalR app. Otherwise, network latency degrades performance. If your SignalR app is running in the Azure cloud, we recommend Azure SignalR Service instead of a Redis backplane.

  For more information, see the following resources:

  * ASP.NET Core SignalR production hosting and scaling
  * Redis documentation
  * Azure Redis Cache documentation

* In the SignalR app, install the following NuGet package:

  * `Microsoft.AspNetCore.SignalR.StackExchangeRedis`

* Call `Microsoft.Extensions.DependencyInjection.StackExchangeRedisDependencyInjectionExtensions.AddStackExchangeRedis*` by adding the following line before the line that calls `builder.Build()`) in the `Program.cs` file.

  ```csharp
  builder.Services.AddSignalR().AddStackExchangeRedis("<your_Redis_connection_string>");
  ```

* Configure options as needed:

  Most options can be set in the connection string or in the `ConfigurationOptions` object. Options specified in `ConfigurationOptions` override the ones set in the connection string.

  The following example shows how to set options in the `ConfigurationOptions` object. This example adds a channel prefix so that multiple apps can share the same Redis instance, as explained in the following step.

  ```csharp
  builder.Services.AddSignalR()
    .AddStackExchangeRedis(connectionString, options => {
        options.Configuration.ChannelPrefix = RedisChannel.Literal("MyApp");
    });
  ```

  In the preceding code, `options.Configuration` is initialized with whatever was specified in the connection string.

  For information about Redis options, see the StackExchange Redis documentation.

* If you're using one Redis server for multiple SignalR apps, use a different channel prefix for each SignalR app.

  Setting a channel prefix isolates one SignalR app from others that use different channel prefixes. If you don't assign different prefixes, a message sent from one app to all of its own clients will go to all clients of all apps that use the Redis server as a backplane.

* Configure your server farm load balancing software for sticky sessions. Here are some examples of documentation on how to do that:

  * IIS
  * HAProxy
  * Nginx

## Redis server errors

When a Redis server goes down, SignalR throws exceptions that indicate messages won't be delivered. Some typical exception messages:

* *Failed writing message*
* *Failed to invoke hub method 'MethodName'*
* *Connection to Redis failed*

SignalR doesn't buffer messages to send them when the server comes back up. Any messages sent while the Redis server is down are lost.

SignalR automatically reconnects when the Redis server is available again.

### Custom behavior for connection failures

Here's an example that shows how to handle Redis connection failure events.

```csharp
services.AddSignalR()
        .AddMessagePackProtocol()
        .AddStackExchangeRedis(o =>
        {
            o.ConnectionFactory = async writer =>
            {
                var config = new ConfigurationOptions
                {
                    AbortOnConnectFail = false
                };
                config.EndPoints.Add(IPAddress.Loopback, 0);
                config.SetDefaultPorts();
                var connection = await ConnectionMultiplexer.ConnectAsync(config, writer);
                connection.ConnectionFailed += (_, e) =>
                {
                    Console.WriteLine("Connection to Redis failed.");
                };

                if (!connection.IsConnected)
                {
                    Console.WriteLine("Did not connect to Redis.");
                }

                return connection;
            };
        });
```

## Redis Cluster

Redis Cluster utilizes multiple simultaneously active Redis servers to achieve high availability. When Redis Cluster is used as the backplane for SignalR, messages are delivered to all of the nodes of the cluster without code modifications to the app.

There's a tradeoff between the number of nodes in the cluster and the throughput of the backplane. Increasing the number of nodes increases the availability of the cluster but decreases the throughput because messages must be transmitted to all of the nodes in the cluster.

In the SignalR app, include all of the possible Redis nodes using either of the following approaches:

* List the nodes in the connection string delimited with commas.
* If using custom behavior for connection failures, add the nodes to `ConfigurationOptions.Endpoints`.

## Next steps

For more information, see the following resources:

* ASP.NET Core SignalR production hosting and scaling
* Redis documentation
* StackExchange Redis documentation
* Azure Redis Cache documentation
