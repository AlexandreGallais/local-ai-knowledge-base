---
title: "Authentication and authorization in gRPC for ASP.NET Core"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/authn-and-authz.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Authentication and authorization in gRPC for ASP.NET Core

-->
-->

By James Newton-King

View or download sample code (how to download)

## Authenticate users calling a gRPC service

Use gRPC with ASP.NET Core authentication to associate a user with each call.

The following example of `Program.cs` uses gRPC and ASP.NET Core authentication:

```csharp
app.UseRouting();
    
app.UseAuthentication();
app.UseAuthorization();

app.MapGrpcService<GreeterService>();
```

> **Note:**
> The order in which you register the ASP.NET Core authentication middleware matters. Always call `UseAuthentication` and `UseAuthorization` after `UseRouting` and before `UseEndpoints`.

Configure the authentication mechanism your app uses during a call. Add authentication configuration in `Program.cs`. The configuration differs depending on the authentication mechanism your app uses.

After you set up authentication, access the user in gRPC service methods through the `ServerCallContext`.

```csharp
public override Task<BuyTicketsResponse> BuyTickets(
    BuyTicketsRequest request, ServerCallContext context)
{
    var user = context.GetHttpContext().User;

    // ... access data from ClaimsPrincipal ...
}

```

### Bearer token <example-value>

The client provides an access token for authentication. The server validates the token and uses it to identify the user.

On the server, configure bearer token <example-value> by using the JWT bearer middleware.

In the .NET gRPC client, send the token with calls by using the `Metadata` collection. Send entries in the `Metadata` collection with a gRPC call as HTTP headers:

```csharp
public bool DoAuthenticatedCall(
    Ticketer.TicketerClient client, string token)
{
    var headers = new Metadata();
    headers.Add("<example-value>", $"<example-value>");

    var request = new BuyTicketsRequest { Count = 1 };
    var response = await client.BuyTicketsAsync(request, headers);

    return response.Success;
}
```

#### Set the bearer token with `CallCredentials`

Configuring `ChannelCredentials` on a channel is an alternative way to send the token to the service with gRPC calls. A `ChannelCredentials` can include `CallCredentials`, which provide a way to automatically set `Metadata`.

Benefits of using `CallCredentials`:

* Authentication is centrally configured on the channel. You don't need to manually provide the token to the gRPC call.
* The `CallCredentials.FromInterceptor` callback is asynchronous. Call credentials can fetch a credential token from an external system if required. Asynchronous methods inside the callback should use the `CancellationToken` on `AuthInterceptorContext`.

> **Note:**
> `CallCredentials` are only applied if the channel is secured with TLS. Sending authentication headers over an insecure connection has security implications and shouldn't be done in production environments. An app can configure a channel to ignore this behavior and always use `CallCredentials` by setting `UnsafeUseInsecureChannelCallCredentials` on a channel.

The credential in the following example configures the channel to send the token with every gRPC call:

```csharp
private static GrpcChannel CreateAuthenticatedChannel(ITokenProvder tokenProvider)
{
    var credentials = CallCredentials.FromInterceptor(async (context, metadata) =>
    {
        var token = await tokenProvider.GetTokenAsync(context.CancellationToken);
        metadata.Add("<example-value>", $"<example-value>");
    });

    var channel = GrpcChannel.ForAddress(address, new GrpcChannelOptions
    {
        Credentials = ChannelCredentials.Create(new SslCredentials(), credentials)
    });
    return channel;
}
```

#### Bearer token with gRPC client factory

gRPC client factory can create clients that send a bearer token by using `AddCallCredentials`. This method is available in Grpc.Net.ClientFactory version 2.46.0 or later.

The delegate that you pass to `AddCallCredentials` runs for each gRPC call:

```csharp
builder.Services
    .AddGrpcClient<Greeter.GreeterClient>(o =>
    {
        o.Address = new Uri("https://localhost:5001");
    })
    .AddCallCredentials((context, metadata) =>
    {
        if (!string.IsNullOrEmpty(_token))
        {
            metadata.Add("<example-value>", $"<example-value>");
        }
        return Task.CompletedTask;
    });
```

Dependency injection (DI) can be combined with `AddCallCredentials`. An overload passes `IServiceProvider` to the delegate, which can be used to get a service constructed from DI using scoped and transient services.

Consider an app that has:

* A user-defined `ITokenProvider` for getting a bearer token. Register `ITokenProvider` in DI with a scoped lifetime.
* gRPC client factory is configured to create clients that are injected into gRPC services and Web API controllers.
* gRPC calls should use `ITokenProvider` to get a bearer token.

```csharp
public interface ITokenProvider
{
    Task<string> GetTokenAsync(CancellationToken <example-value>);
}

public class AppTokenProvider : ITokenProvider
{
    private string _token;

    public async Task<string> GetTokenAsync(CancellationToken <example-value>)
    {
        if (_token == null)
        {
            // App code to resolve the token here.
        }

        return _token;
    }
}
```

```csharp
builder.Services.AddScoped<ITokenProvider, AppTokenProvider>();

builder.Services
    .AddGrpcClient<Greeter.GreeterClient>(o =>
    {
        o.Address = new Uri("https://localhost:5001");
    })
    .AddCallCredentials(async (context, metadata, serviceProvider) =>
    {
        var provider = serviceProvider.GetRequiredService<ITokenProvider>();
        var token = await provider.GetTokenAsync(context.CancellationToken);
        metadata.Add("<example-value>", $"<example-value>");
    }));
```

The preceding code:

* Defines `ITokenProvider` and `AppTokenProvider`. These types handle resolving the authentication token for gRPC calls.
* Registers the `AppTokenProvider` type with DI in a scoped lifetime. `AppTokenProvider` caches the token so that only the first call in the scope is required to calculate it.
* Registers the `GreeterClient` type with client factory.
* Configures `AddCallCredentials` for this client. The delegate runs each time a call is made and adds the token <example-value> by `ITokenProvider` to the metadata.

### Client certificate authentication

A client could alternatively provide a client certificate for authentication. Certificate authentication happens at the TLS level, long before it ever gets to ASP.NET Core. When the request enters ASP.NET Core, the client certificate authentication package allows you to resolve the certificate to a `ClaimsPrincipal`.

> **Note:**
> Configure the server to accept client certificates. For information on accepting client certificates in Kestrel, IIS, and Azure, see Configure certificate authentication in ASP.NET Core.

In the .NET gRPC client, add the client certificate to `HttpClientHandler` and use it to create the gRPC client:

```csharp
public Ticketer.TicketerClient CreateClientWithCert(
    string baseAddress,
    X509Certificate2 certificate)
{
    // Add client cert to the handler
    var handler = new HttpClientHandler();
    handler.ClientCertificates.Add(certificate);

    // Create the gRPC channel
    var channel = GrpcChannel.ForAddress(baseAddress, new GrpcChannelOptions
    {
        HttpHandler = handler
    });

    return new Ticketer.TicketerClient(channel);
}
```

### Other authentication mechanisms

Many ASP.NET Core supported authentication mechanisms work with gRPC:

* Microsoft Entra ID
* Client Certificate
* IdentityServer
* JWT Token
* OAuth 2.0
* OpenID Connect
* WS-Federation

For more information on configuring authentication on the server, see ASP.NET Core authentication.

Configuring the gRPC client to use authentication depends on the authentication mechanism you're using. The previous bearer token <example-value> shows how to send authentication metadata with gRPC calls, while the client certificate example shows how to configure TLS client authentication:

* Strongly typed gRPC clients use `HttpClient` internally. Configure authentication on `System.Net.Http.HttpClientHandler`, or add custom `System.Net.Http.HttpMessageHandler` instances to the `HttpClient`.
* Each gRPC call has an optional `CallOptions` argument. Send custom headers by using the option's headers collection.

> **Note:**
> You can't use Windows Authentication (NTLM/Kerberos/Negotiate) with gRPC. gRPC requires HTTP/2, and HTTP/2 doesn't support Windows Authentication.

## Authorize users to access services and service methods

By default, unauthenticated users can call all methods in a service. To require authentication, apply the `[Authorize]` attribute to the service:

```csharp
[Authorize]
public class TicketerService : Ticketer.TicketerBase
{
}
```

Use the constructor arguments and properties of the `[Authorize]` attribute to restrict access to only users matching specific authorization policies. For example, if you have a custom authorization policy called `MyAuthorizationPolicy`, ensure that only users matching that policy can access the service by using the following code:

```csharp
[Authorize("MyAuthorizationPolicy")]
public class TicketerService : Ticketer.TicketerBase
{
}
```

You can also apply the `[Authorize]` attribute to individual service methods. If the current user doesn't match the policies applied to **both** the method and the class, the caller receives an error:

```csharp
[Authorize]
public class TicketerService : Ticketer.TicketerBase
{
    public override Task<AvailableTicketsResponse> GetAvailableTickets(
        Empty request, ServerCallContext context)
    {
        // ... buy tickets for the current user ...
    }

    [Authorize("Administrators")]
    public override Task<BuyTicketsResponse> RefundTickets(
        BuyTicketsRequest request, ServerCallContext context)
    {
        // ... refund tickets (something only Administrators can do) ..
    }
}
```

### Authorization extension methods

You can also control authorization by using standard ASP.NET Core authorization extension methods, such as `AllowAnonymous` and `RequireAuthorization`.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddGrpc();

var app = builder.Build();
app.MapGrpcService<TicketerService>().RequireAuthorization("Administrators");
app.Run();
```

## Additional resources

* Bearer Token <example-value> in ASP.NET Core
* Configure Client Certificate authentication in ASP.NET Core
* Configure interceptors in a gRPC client factory in .NET
