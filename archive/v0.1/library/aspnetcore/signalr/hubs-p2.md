---
title: "Use hubs in ASP.NET Core SignalR (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/hubs.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use hubs in ASP.NET Core SignalR (part 2 of 2)

## Inject services into a hub

SignalR registers an `Microsoft.AspNetCore.SignalR.IHubActivator`1` and creates an unregistered hub with `Microsoft.Extensions.DependencyInjection.ActivatorUtilities` for each invocation. Singleton services injected into a hub outlive the hub instance, and injected transient services have a lifetime that matches the lifetime of the hub instance. Scoped service instances are created for each hub invocation and also match the lifetime of the hub; therefore, scoped and transient services exhibit equivalent lifetimes.

Hub constructor service injection is supported. In the following example, `Microsoft.EntityFrameworkCore.IDbContextFactory`1` is injected into a hub using a primary constructor to save messages to a database when `SendMessage` is called.

In the app's `Program` file using SQL Server as the example database provider and a connection string from configuration:

```csharp
var connectionString = 
    builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContextFactory<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
```

An example hub class:

```csharp
public class ChatHub(IDbContextFactory<ApplicationDbContext> contextFactory) : Hub
{
    public async Task SendMessage(string user, string message)
    {
        using var context = await contextFactory.CreateDbContextAsync();

        var msgEntity = new Message { User = user, Content = message };
        context.Messages.Add(msgEntity);
        await context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

If you're unable to use a factory and must inject a scoped `Microsoft.EntityFrameworkCore.DbContext` directly, the framework automatically creates a dependency injection (DI) scope for the hub method invocation. The framework disposes the context as soon as the invocation/stream completes. ***However, you must ensure that the hub's methods don't execute concurrent database operations on the same context instance because `Microsoft.EntityFrameworkCore.DbContext` isn't thread-safe.***

Hub method service injection is also supported. In the following example, a scoped `Microsoft.EntityFrameworkCore.DbContext` (`ApplicationDbContext`) only used for a quick write operation is injected into the specific method that requires it:

```csharp
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message, 
        ApplicationDbContext context)
    {
        context.Messages.Add(new Message { User = user, Content = message });
        await context.SaveChangesAsync();

        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

To explicitly specify which parameters are resolved from DI in hub methods, specify the `[FromServices]` attribute or a custom attribute that implements `Microsoft.AspNetCore.Http.Metadata.IFromServiceMetadata` on the hub method parameters that should be resolved from DI.

Set the `Microsoft.AspNetCore.SignalR.HubOptions.DisableImplicitFromServicesParameters` property (ASP.NET Core documentation) in case some parameters might come from DI and you instead want them to come from the client.

In the app's `Program` file:

```csharp
builder.Services.AddSingleton<SomeCustomType>();
builder.Services.AddSingleton<IDatabaseService, DatabaseServiceImpl>();

builder.Services.AddSignalR(options =>
{
    options.DisableImplicitFromServicesParameters = true;
});
```

In the following hub method, only `IDatabaseService` is resolved from DI:

```csharp
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message,
        SomeCustomType type,
        [FromServices] IDatabaseService dbService)
    {
        await dbService.SaveMessageAsync(user, message, type);
        await Clients.All.SendAsync("ReceiveMessage", user, message, type);
    }
}
```

> **Note:**
> Implicit parameter inference makes use of `Microsoft.Extensions.DependencyInjection.IServiceProviderIsService`, which is optionally implemented in DI configurations. If the app's DI container doesn't support this feature, injecting services into hub methods using implicit parameter inference isn't supported.

For database operations, adopting the factory pattern is preferred for overlapping operations within one invocation:

* A direct scoped context can run into concurrency issues. Using a factory completely isolates each factory operation.
* For server-side Blazor apps, the factory pattern is recommended. For more information, see ASP.NET Core Blazor with Entity Framework Core (EF Core).

Because each hub method call is executed on a new hub instance, don't store state in a property of the hub class.

Don't instantiate a hub directly via DI. To send messages to a client from elsewhere in your app, use an `IHubContext`.

Use the `await` operator when calling an asynchronous method that depends on the hub staying alive. If you call an asynchronous method without `await`, the call can fail with the hub method completing before the asynchronous method finishes.

✔️Supported: `await Clients.All.SendAsync(...);`
❌Not supported: `Clients.All.SendAsync(...);` (missing `await`)

For general guidance on DI, see Dependency injection in ASP.NET Core and its linked additional resources.

## Keyed services support in dependency injection

The keyed services mechanism allows you to register and retrieve dependency injection services by using keys. A service is associated with a key by calling the  `Microsoft.Extensions.DependencyInjection.ServiceCollectionServiceExtensions.AddKeyedSingleton*` method to register it. As an alternative, you can call the `AddKeyedScoped` or `AddKeyedTransient` method.

You access a registered service by specifying the key with the [FromKeyedServices] attribute. The following code shows how to use keyed services:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/KeyedSvsHub/Program.cs._
## Limit per-connection streaming invocations

`Microsoft.AspNetCore.SignalR.HubOptions.MaximumParallelInvocationsPerClient` controls the number of non-streaming hub method invocations a client can run in parallel before they are queued. It does **not** apply to streaming hub invocations. Streaming invocations are intentionally excluded because they are expected to be long-running and concurrent, so a client can start any number of concurrent streams regardless of that setting.

To enforce a per-connection limit on streaming invocations, wrap the stream inside the hub method itself using a private helper that increments a counter before yielding items and decrements it in a `finally` block:

```csharp
using System.Collections.Concurrent;
using System.Runtime.CompilerServices;

public class StreamingHub : Hub
{
    private static readonly ConcurrentDictionary<string, int> _activeStreams = new();
    private const int MaxConcurrentStreams = 2;

    public IAsyncEnumerable<int> Counter(
        int count,
        int delay,
        CancellationToken <example-value>)
    {
        return WithLimit(Context.ConnectionId, GetCounter(count, delay, cancellationToken));
    }

    private async IAsyncEnumerable<int> GetCounter(
        int count,
        int delay,
        [EnumeratorCancellation] CancellationToken <example-value>)
    {
        for (var i = 0; i < count; i++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            yield return i;
            await Task.Delay(delay, cancellationToken);
        }
    }

    private async IAsyncEnumerable<T> WithLimit(
        string connectionId,
        IAsyncEnumerable<T> stream,
        [EnumeratorCancellation] CancellationToken <example-value> = default)
    {
        var current = _activeStreams.AddOrUpdate(
            connectionId,
            addValue: 1,
            updateValueFactory: (_, count) => count + 1);

        if (current > MaxConcurrentStreams)
        {
            Decrement(connectionId);
            throw new HubException(
                $"The connection is limited to {MaxConcurrentStreams} concurrent streaming invocations.");
        }

        try
        {
            await foreach (var item in stream.WithCancellation(cancellationToken))
            {
                yield return item;
            }
        }
        finally
        {
            Decrement(connectionId);
        }
    }

    private static void Decrement(string connectionId)
    {
        while (_activeStreams.TryGetValue(connectionId, out var current))
        {
            if (current <= 1)
            {
                if (_activeStreams.TryRemove(new KeyValuePair<string, int>(connectionId, current)))
                {
                    return;
                }
            }
            else if (_activeStreams.TryUpdate(connectionId, current - 1, current))
            {
                return;
            }
        }
    }
}
```

The key point is that `WithLimit` wraps the original `IAsyncEnumerable<T>` and holds the counter elevated for the *full lifetime of the stream*, not just until the first item is yielded.
The `finally` block runs only when the client finishes consuming the stream, cancels it, or the connection drops.

If your streaming hub methods return `ChannelReader<T>` instead of `IAsyncEnumerable<T>`, a similar wrapper can be applied. It should use the same `_activeStreams` dictionary so both stream types share a single connection-level limit rather than each maintaining their own independent count.

> **Note:**
> The `_activeStreams` dictionary is `static` so it is shared across all hub instances. If you prefer DI-managed state, register a singleton service that owns the dictionary and inject it into the hub constructor.

## Handle events for a connection

The SignalR Hubs API provides the `Microsoft.AspNetCore.SignalR.Hub.OnConnectedAsync*` and `Microsoft.AspNetCore.SignalR.Hub.OnDisconnectedAsync*` virtual methods to manage and track connections. Override the `OnConnectedAsync` virtual method to perform actions when a client connects to the hub, such as adding it to a group:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/ChatHub.cs._
Override the `OnDisconnectedAsync` virtual method to perform actions when a client disconnects. If the client disconnects intentionally, such as by calling `connection.stop()`, the `exception` parameter is set to `null`. However, if the client disconnects due to an error, such as a network failure, the `exception` parameter contains an exception that describes the failure:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/ChatHub.cs._
The `Microsoft.AspNetCore.SignalR.IGroupManager.RemoveFromGroupAsync*` method doesn't need to be called within the `Microsoft.AspNetCore.SignalR.Hub.OnDisconnectedAsync*` method because it's handled automatically.

A third virtual method, `OnAuthenticationRefreshedAsync`, runs when a connected client refreshes its authentication without reconnecting. Override it to perform actions after the refreshed principal is applied to the connection. `Context.User` reflects the refreshed principal when the method runs:

```csharp
public class ChatHub : Hub
{
    public override Task OnAuthenticationRefreshedAsync()
    {
        return Clients.Caller.SendAsync(
            "AuthenticationRefreshed", Context.UserIdentifier);
    }
}
```

The method runs only for hubs that enable authentication refresh. A refresh doesn't change `Context.UserIdentifier` or reroute messages sent with `Clients.User`.

Two behaviors differ from the other connection events:

* Client results aren't supported from this method, the same as in `OnConnectedAsync`. Send messages with `SendAsync` instead of requesting a result with `InvokeAsync`.
* An exception thrown by this method is logged and then discarded. The connection stays open, the client isn't notified, and the refresh isn't rejected.

For the full feature, including how to enable it and how clients request a refresh, see SignalR authentication and authorization.

## Handle errors

Exceptions thrown in your hub methods are sent to the client that invoked the method. On the JavaScript client, the `invoke` method returns a JavaScript `Promise`. When the client receives an error with a handler attached to the promise using `catch`, it's invoked and passed as a JavaScript `Error` object:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/wwwroot/chat.js._
If your Hub throws an exception, connections aren't closed. By default, SignalR returns a generic error message to the client. For example:

```output
Microsoft.AspNetCore.SignalR.HubException: An unexpected error occurred invoking 'MethodName' on the server.
```

Unexpected exceptions often contain sensitive information, such as the name of a database server in an exception triggered when the database connection fails. SignalR doesn't expose these detailed error messages by default as a security measure. For more information on why exception details are suppressed, see Security considerations in ASP.NET Core SignalR.

If you have an exceptional condition you *do* want to propagate to the client, you can use the `Microsoft.AspNetCore.SignalR.HubException` class. If you throw a `HubException` from your hub method, SignalR **will** send the entire message to the client, unmodified:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/ChatHub.cs._
> **Note:**
> SignalR only sends the `Message` property of the exception to the client. The stack trace and other properties on the exception aren't available to the client.

## Related content

* View or download sample code (how to download)
* Overview of ASP.NET Core SignalR
* ASP.NET Core SignalR JavaScript client
* Publish an ASP.NET Core SignalR app to Azure App Service
