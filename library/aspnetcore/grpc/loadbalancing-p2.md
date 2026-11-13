---
title: "gRPC client-side load balancing (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/loadbalancing.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# gRPC client-side load balancing (part 2 of 2)

## Write custom resolvers and load balancers

Client-side load balancing is extensible:

* Implement `Resolver` to create a custom resolver and resolve addresses from a new data source.
* Implement `LoadBalancer` to create a custom load balancer with new load balancing behavior.

> **Important:**
> The APIs used to extend client-side load balancing are experimental. They can change without notice.

### Create a custom resolver

A resolver:

* Implements `Resolver` and is created by a `ResolverFactory`. Create a custom resolver by implementing these types.
* Is responsible for resolving the addresses a load balancer uses.
* Can optionally provide a service configuration.

```csharp
public class FileResolver : PollingResolver
{
    private readonly Uri _address;
    private readonly int _port;

    public FileResolver(Uri address, int defaultPort, ILoggerFactory loggerFactory)
        : base(loggerFactory)
    {
        _address = address;
        _port = defaultPort;
    }

    public override async Task ResolveAsync(CancellationToken cancellationToken)
    {
        // Load JSON from a file on disk and deserialize into endpoints.
        var jsonString = await File.ReadAllTextAsync(_address.LocalPath);
        var results = JsonSerializer.Deserialize<string[]>(jsonString);
        var addresses = results.Select(r => new BalancerAddress(r, _port)).ToArray();

        // Pass the results back to the channel.
        Listener(ResolverResult.ForResult(addresses));
    }
}

public class FileResolverFactory : ResolverFactory
{
    // Create a FileResolver when the URI has a 'file' scheme.
    public override string Name => "file";

    public override Resolver Create(ResolverOptions options)
    {
        return new FileResolver(options.Address, options.DefaultPort, options.LoggerFactory);
    }
}
```

In the preceding code:

* `FileResolverFactory` implements `ResolverFactory`. It maps to the `file` scheme and creates `FileResolver` instances.
* `FileResolver` implements `PollingResolver`. `PollingResolver` is an abstract base type that makes it easy to implement a resolver with asynchronous logic by overriding `ResolveAsync`.
* In `ResolveAsync`:
  * The file URI is converted to a local path. For example, `file:///c:/addresses.json` becomes `c:\addresses.json`.
  * JSON is loaded from disk and converted into a collection of addresses.
  * Listener is called with results to let the channel know that addresses are available.

### Create a custom load balancer

A load balancer:

* Implements `LoadBalancer` and is created by a `LoadBalancerFactory`. Create a custom load balancer and factory by implementing these types.
* Is given addresses from a resolver and creates `Subchannel` instances.
* Tracks state about the connection and creates a `SubchannelPicker`. The channel internally uses the picker to pick addresses when making gRPC calls.

The `SubchannelsLoadBalancer` is:

* An abstract base class that implements `LoadBalancer`.
* Manages creating `Subchannel` instances from addresses.
* Makes it easy to implement a custom picking policy over a collection of subchannels.

```csharp
public class RandomBalancer : SubchannelsLoadBalancer
{
    public RandomBalancer(IChannelControlHelper controller, ILoggerFactory loggerFactory)
        : base(controller, loggerFactory)
    {
    }

    protected override SubchannelPicker CreatePicker(List<Subchannel> readySubchannels)
    {
        return new RandomPicker(readySubchannels);
    }

    private class RandomPicker : SubchannelPicker
    {
        private readonly List<Subchannel> _subchannels;

        public RandomPicker(List<Subchannel> subchannels)
        {
            _subchannels = subchannels;
        }

        public override PickResult Pick(PickContext context)
        {
            // Pick a random subchannel.
            return PickResult.ForSubchannel(_subchannels[Random.Shared.Next(0, _subchannels.Count)]);
        }
    }
}

public class RandomBalancerFactory : LoadBalancerFactory
{
    // Create a RandomBalancer when the name is 'random'.
    public override string Name => "random";

    public override LoadBalancer Create(LoadBalancerOptions options)
    {
        return new RandomBalancer(options.Controller, options.LoggerFactory);
    }
}
```

In the preceding code:

* `RandomBalancerFactory` implements `LoadBalancerFactory`. It maps to the `random` policy name and creates `RandomBalancer` instances.
* `RandomBalancer` implements `SubchannelsLoadBalancer`. It creates a `RandomPicker` that randomly picks a subchannel.

## Configure custom resolvers and load balancers

Custom resolvers and load balancers need to be registered with dependency injection (DI) when they are used. There are a couple of options:

* If an app is already using DI, such as an ASP.NET Core web app, they can be registered with the existing DI configuration. An `System.IServiceProvider` can be resolved from DI and passed to the channel using `GrpcChannelOptions.ServiceProvider`.
* If an app isn't using DI then create:
  * A `Microsoft.Extensions.DependencyInjection.ServiceCollection` with types registered with it.
  * A service provider using `Microsoft.Extensions.DependencyInjection.ServiceCollectionContainerBuilderExtensions.BuildServiceProvider*`.

```csharp
var services = new ServiceCollection();
services.AddSingleton<ResolverFactory, FileResolverFactory>();
services.AddSingleton<LoadBalancerFactory, RandomLoadBalancerFactory>();

var channel = GrpcChannel.ForAddress(
    "file:///c:/data/addresses.json",
    new GrpcChannelOptions
    {
        Credentials = ChannelCredentials.Insecure,
        ServiceConfig = new ServiceConfig { LoadBalancingConfigs = { new LoadBalancingConfig("random") } },
        ServiceProvider = services.BuildServiceProvider()
    });
var client = new Greet.GreeterClient(channel);
```

The preceding code:

* Creates a `ServiceCollection` and registers new resolver and load balancer implementations.
* Creates a channel configured to use the new implementations:
  * `ServiceCollection` is built into an `IServiceProvider` and set to `GrpcChannelOptions.ServiceProvider`.
  * Channel address is `file:///c:/data/addresses.json`. The `file` scheme maps to `FileResolverFactory`.
  * `service config` load balancer name is `random`. Maps to `RandomLoadBalancerFactory`.

## Why load balancing is important

HTTP/2 multiplexes multiple calls on a single TCP connection. If gRPC and HTTP/2 are used with a network load balancer (NLB), the connection is forwarded to a server, and all gRPC calls are sent to that one server. The other server instances on the NLB are idle.

Network load balancers are a common solution for load balancing because they are fast and lightweight. For example, Kubernetes by default uses a network load balancer to balance connections between pod instances. However, network load balancers are not effective at distributing load when used with gRPC and HTTP/2.

### Proxy or client-side load balancing?

gRPC and HTTP/2 can be effectively load balanced using either an application load balancer proxy or client-side load balancing. Both of these options allow individual gRPC calls to be distributed across available servers. Deciding between proxy and client-side load balancing is an architectural choice. There are pros and cons for each.

* **Proxy**: gRPC calls are sent to the proxy, the proxy makes a load balancing decision, and the gRPC call is sent on to the final endpoint. The proxy is responsible for knowing about endpoints. Using a proxy adds:

  * An additional network hop to gRPC calls.
  * Latency and consumes additional resources.
  * Proxy server must be setup and configured correctly.

* **Client-side load balancing**: The gRPC client makes a load balancing decision when a gRPC call is started. The gRPC call is sent directly to the final endpoint. When using client-side load balancing:

  * The client is responsible for knowing about available endpoints and making load balancing decisions.
  * Additional client configuration is required.
  * High-performance, load balanced gRPC calls eliminate the need for a proxy.

## Related content

* Call gRPC services with the .NET client
