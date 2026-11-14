---
title: "gRPC client-side load balancing (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/loadbalancing.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# gRPC client-side load balancing

By James Newton-King

Client-side load balancing is a feature that allows gRPC clients to distribute load optimally across available servers. This article discusses how to configure client-side load balancing to create scalable, high-performance gRPC apps in .NET.

Client-side load balancing requires:

* .NET 5 or later.
* `Grpc.Net.Client` version 2.45.0 or later.

## Configure gRPC client-side load balancing

Client-side load balancing is configured when a channel is created. The two components to consider when using load balancing:

* The resolver, which resolves the addresses for the channel. Resolvers support getting addresses from an external source. This is also known as service discovery.
* The load balancer, which creates connections and picks the address that a gRPC call will use.

Built-in implementations of resolvers and load balancers are included in `Grpc.Net.Client`. Load balancing can also be extended by writing custom resolvers and load balancers.

Addresses, connections and other load balancing state is stored in a `GrpcChannel` instance. A channel must be reused when making gRPC calls for load balancing to work correctly.

> **Note:**
> Some load balancing configuration uses dependency injection (DI). Apps that don't use DI can create a `Microsoft.Extensions.DependencyInjection.ServiceCollection` instance.
>
> If an app already has DI setup, like an ASP.NET Core website, then types should be registered with the existing DI instance. `GrpcChannelOptions.ServiceProvider` is configured by getting an `System.IServiceProvider` from DI.

## Configure resolver

The resolver is configured using the address a channel is created with. The URI scheme of the address specifies the resolver.

| Scheme   | Type                    | Description |
| -------- | ----------------------- | ----------- |
| `dns`    | `DnsResolverFactory`    | Resolves addresses by querying the hostname for DNS address records. |
| `static` | `StaticResolverFactory` | Resolves addresses that the app has specified. Recommended if an app already knows the addresses it calls. |

A channel doesn't directly call a URI that matches a resolver. Instead, a matching resolver is created and used to resolve the addresses.

For example, using `GrpcChannel.ForAddress("dns:///my-example-host", new GrpcChannelOptions { Credentials = ChannelCredentials.Insecure })`:

* The `dns` scheme maps to `DnsResolverFactory`. A new instance of a DNS resolver is created for the channel.
* The resolver makes a DNS query for `my-example-host` and gets two results: `127.0.0.100` and `127.0.0.101`.
* The load balancer uses `127.0.0.100:80` and `127.0.0.101:80` to create connections and make gRPC calls.

#### DnsResolverFactory

The `DnsResolverFactory` creates a resolver designed to get addresses from an external source. DNS resolution is commonly used to load balance over pod instances that have a Kubernetes headless services.

```csharp
var channel = GrpcChannel.ForAddress(
    "dns:///my-example-host",
    new GrpcChannelOptions { Credentials = ChannelCredentials.Insecure });
var client = new Greet.GreeterClient(channel);

var response = await client.SayHelloAsync(new HelloRequest { Name = "world" });
```

The preceding code:

* Configures the created channel with the address `dns:///my-example-host`.
  * The `dns` scheme maps to `DnsResolverFactory`.
  * `my-example-host` is the hostname to resolve.
  * No port is specified in the address, so gRPC calls are sent to port 80. This is the default port for unsecured channels. A port can optionally be specified after the hostname. For example, `dns:///my-example-host:8080` configures gRPC calls to be sent to port 8080.
* Doesn't specify a load balancer. The channel defaults to a pick first load balancer.
* Starts the gRPC call `SayHello`:
  * DNS resolver gets addresses for the hostname `my-example-host`.
  * Pick first load balancer attempts to connect to one of the resolved addresses.
  * The call is sent to the first address the channel successfully connects to.

##### DNS address caching

Performance is important when load balancing. The latency of resolving addresses is eliminated from gRPC calls by caching the addresses. A resolver will be invoked when making the first gRPC call, and subsequent calls use the cache.

Addresses are automatically refreshed if a connection is interrupted. Refreshing is important in scenarios where addresses change at runtime. For example, in Kubernetes a restarted pod triggers the DNS resolver to refresh and get the pod's new address.

By default, a DNS resolver is refreshed if a connection is interrupted. The DNS resolver can also optionally refresh itself on a periodic interval. This can be useful for quickly detecting new pod instances.

```csharp
services.AddSingleton<ResolverFactory>(
    sp => new DnsResolverFactory(refreshInterval: TimeSpan.FromSeconds(30)));
```

The preceding code creates a `DnsResolverFactory` with a refresh interval and registers it with dependency injection. For more information on using a custom-configured resolver, see Configure custom resolvers and load balancers.

#### StaticResolverFactory

A static resolver is provided by `StaticResolverFactory`. This resolver:

* Doesn't call an external source. Instead, the client app configures the addresses.
* Is designed for situations where an app already knows the addresses it calls.

```csharp
var factory = new StaticResolverFactory(addr => new[]
{
    new BalancerAddress("localhost", 80),
    new BalancerAddress("localhost", 81)
});

var services = new ServiceCollection();
services.AddSingleton<ResolverFactory>(factory);

var channel = GrpcChannel.ForAddress(
    "static:///my-example-host",
    new GrpcChannelOptions
    {
        Credentials = ChannelCredentials.Insecure,
        ServiceProvider = services.BuildServiceProvider()
    });
var client = new Greet.GreeterClient(channel);
```

The preceding code:

* Creates a `StaticResolverFactory`. This factory knows about two addresses: `localhost:80` and `localhost:81`.
* Registers the factory with dependency injection (DI).
* Configures the created channel with:
  * The address `static:///my-example-host`. The `static` scheme maps to a static resolver.
  * Sets `GrpcChannelOptions.ServiceProvider` with the DI service provider.

This example creates a new `Microsoft.Extensions.DependencyInjection.ServiceCollection` for DI. Suppose an app already has DI setup, like an ASP.NET Core website. In that case, types should be registered with the existing DI instance. `GrpcChannelOptions.ServiceProvider` is configured by getting an `System.IServiceProvider` from DI.

## Configure load balancer

A load balancer is specified in a `service config` using the `ServiceConfig.LoadBalancingConfigs` collection. Two load balancers are built-in and map to load balancer config names:

| Name          | Type                            | Description |
| ------------- | ------------------------------- | ----------- |
| `pick_first`  | `PickFirstLoadBalancerFactory`  | Attempts to connect to addresses until a connection is successfully made. gRPC calls are all made to the first successful connection. |
| `round_robin` | `RoundRobinLoadBalancerFactory` | Attempts to connect to all addresses. gRPC calls are distributed across all successful connections using round-robin logic. |

`service config` is an abbreviation of service configuration and is represented by the `ServiceConfig` type. There are a couple of ways a channel can get a `service config` with a load balancer configured:

* An app can specify a `service config` when a channel is created using `GrpcChannelOptions.ServiceConfig`.
* Alternatively, a resolver can resolve a `service config` for a channel. This feature allows an external source to specify how its callers should perform load balancing. Whether a resolver supports resolving a `service config` is dependent on the resolver implementation. Disable this feature with `GrpcChannelOptions.DisableResolverServiceConfig`.
* If no `service config` is provided, or the `service config` doesn't have a load balancer configured, the channel defaults to `PickFirstLoadBalancerFactory`.

```csharp
var channel = GrpcChannel.ForAddress(
    "dns:///my-example-host",
    new GrpcChannelOptions
    {
        Credentials = ChannelCredentials.Insecure,
        ServiceConfig = new ServiceConfig { LoadBalancingConfigs = { new RoundRobinConfig() } }
    });
var client = new Greet.GreeterClient(channel);

var response = await client.SayHelloAsync(new HelloRequest { Name = "world" });
```

The preceding code:

* Specifies a `RoundRobinLoadBalancerFactory` in the `service config`.
* Starts the gRPC call `SayHello`:
  * `DnsResolverFactory` creates a resolver that gets addresses for the hostname `my-example-host`.
  * Round-robin load balancer attempts to connect to all resolved addresses.
  * gRPC calls are distributed evenly using round-robin logic.

## Configure channel credentials

A channel must know whether gRPC calls are sent using transport security. `http` and `https` are no longer part of the address, the scheme now specifies a resolver, so `Credentials` must be configured on channel options when using load balancing.

* `ChannelCredentials.SecureSsl` - gRPC calls are secured with Transport Layer Security (TLS). Equivalent to an `https` address.
* `ChannelCredentials.Insecure` - gRPC calls don't use transport security. Equivalent to an `http` address.

```csharp
var channel = GrpcChannel.ForAddress(
    "dns:///my-example-host",
    new GrpcChannelOptions { Credentials = ChannelCredentials.Insecure });
var client = new Greet.GreeterClient(channel);

var response = await client.SayHelloAsync(new HelloRequest { Name = "world" });
```

## Use load balancing with gRPC client factory

gRPC client factory can be configured to use load balancing:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddGrpcClient<Greeter.GreeterClient>(o =>
    {
        o.Address = new Uri("dns:///my-example-host");
    })
    .ConfigureChannel(o => o.Credentials = ChannelCredentials.Insecure);

builder.Services.AddSingleton<ResolverFactory>(
    sp => new DnsResolverFactory(refreshInterval: TimeSpan.FromSeconds(30)));

var app = builder.Build();
```

The preceding code:

* Configures the client with a load-balancing address.
* Specifies channel credentials.
* Registers DI types with the app's `Microsoft.Extensions.DependencyInjection.IServiceCollection`.
