---
title: "Use hubs in ASP.NET Core SignalR (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/hubs.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Use hubs in ASP.NET Core SignalR

By Rachel Appel and Kevin Griffin

The SignalR Hubs API enables connected clients to call methods on the server, facilitating real-time communication. The server defines methods that are called by the client, and the client defines methods that are called by the server. SignalR also enables indirect client-to-client communication, where the SignalR Hub provides the mediation. This approach allows sending messages between individual clients, groups, or to all connected clients. SignalR takes care of everything required to make real-time client-to-server and server-to-client communication possible.

This article describes how to configure hubs, send messages to clients, and allow servers to handle results from clients.

## Configure SignalR hubs

Register the services required by SignalR hubs by calling the `Microsoft.Extensions.DependencyInjection.SignalRDependencyInjectionExtensions.AddSignalR*` method in the `Program` file:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Program.cs._
Configure SignalR endpoints by calling the `Microsoft.AspNetCore.Builder.HubEndpointRouteBuilderExtensions.MapHub*` method in the `Program` file:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Program.cs._
> **Note:**
> ASP.NET Core SignalR server-side assemblies are now installed with the .NET Core SDK. For more information, see SignalR assemblies in shared framework.

## Create and use hubs

Create a hub by declaring a class that inherits from `Microsoft.AspNetCore.SignalR.Hub`. Add `public` methods to the class to make them callable from clients:

```csharp
public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
        => await Clients.All.SendAsync("ReceiveMessage", user, message);
}
```

You can specify a return type and parameters, including complex types and arrays, as you would in any C# method. SignalR handles the serialization and deserialization of complex objects and arrays in your parameters and return values. Hub method parameters, return values, and stream items can be C# union types only with the default `JsonHubProtocol`. The MessagePack and `Newtonsoft.Json` hub protocols don't support unions.

### Accept cancellation in a hub method

Any hub method can declare a `System.Threading.CancellationToken`. The server supplies the token, so clients don't send an argument for it. The token is canceled when the client cancels the invocation or when the connection closes:

```csharp
public class ReportHub : Hub
{
    public async Task<Report> GenerateReport(
        int reportId, CancellationToken <example-value>)
    {
        // Pass <example-value> to the work being performed.
    }
}
```

Cancellation is cooperative. The hub method decides whether and how quickly to stop, and SignalR sends a completion message for the invocation either way. Letting an `System.OperationCanceledException` propagate out of the hub method completes the invocation with an error.

A client can cancel any invocation that has an invocation ID. For how a client requests cancellation, see ASP.NET Core SignalR .NET client.

## Use 'Context' object properties and methods

The `Microsoft.AspNetCore.SignalR.Hub` class includes a `Microsoft.AspNetCore.SignalR.Hub.Context` property that contains the following properties with information about the connection.

| Property | Description |
|--|--|
| `Microsoft.AspNetCore.SignalR.HubCallerContext.ConnectionId` | Gets the unique ID for the connection, assigned by SignalR. There's one connection ID for each connection. |
| `Microsoft.AspNetCore.SignalR.HubCallerContext.UserIdentifier` | Gets the user identifier. By default, SignalR uses the `System.Security.Claims.ClaimTypes.NameIdentifier` property from the `System.Security.Claims.ClaimsPrincipal` associated with the connection as the user identifier. |
| `Microsoft.AspNetCore.SignalR.HubCallerContext.User` | Gets the `System.Security.Claims.ClaimsPrincipal` associated with the current user. |
| `Microsoft.AspNetCore.SignalR.HubCallerContext.Items` | Gets a key/value collection that can be used to share data within the scope of this connection. Data can be stored in this collection and it persists for the connection across different hub method invocations. |
| `Microsoft.AspNetCore.SignalR.HubCallerContext.Features` | Gets the collection of features available on the connection. This collection isn't currently needed in most scenarios, so detailed documentation isn't yet available. |
| `Microsoft.AspNetCore.SignalR.HubCallerContext.ConnectionAborted` | Gets a `System.Threading.CancellationToken` that notifies when the connection is aborted. |

The `Microsoft.AspNetCore.SignalR.Hub.Context` property also contains the following methods:

| Method | Description |
|--|--|
| `Microsoft.AspNetCore.SignalR.GetHttpContextExtensions.GetHttpContext*` | Returns the `Microsoft.AspNetCore.Http.HttpContext` for the connection, or `null` if the connection isn't associated with an HTTP request. For HTTP connections, use this method to get information such as HTTP headers and query strings. |
| `Microsoft.AspNetCore.SignalR.HubCallerContext.Abort*` | Aborts the connection. |

## Use 'Clients' object properties and methods

The `Microsoft.AspNetCore.SignalR.Hub` class includes a `Microsoft.AspNetCore.SignalR.Hub.Clients` property that contains the following properties for communication between server and client:

| Property | Description |
|--|--|
| `Microsoft.AspNetCore.SignalR.IHubClients`1.All` | Calls a method on all connected clients. |
| `Microsoft.AspNetCore.SignalR.IHubCallerClients`1.Caller` | Calls a method on the client that invoked the hub method. |
| `Microsoft.AspNetCore.SignalR.IHubCallerClients`1.Others` | Calls a method on all connected clients except the client that invoked the method. |

The `Microsoft.AspNetCore.SignalR.Hub.Clients` property also contains the following methods:

| Method | Description |
|--|--|
| `Microsoft.AspNetCore.SignalR.IHubClients`1.AllExcept*` | Calls a method on all connected clients except for the specified connections. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.Client*` | Calls a method on a specific connected client. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.Clients*` | Calls a method on specific connected clients. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.Group*` | Calls a method on all connections in the specified group. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.GroupExcept*` | Calls a method on all connections in the specified group, except the specified connections. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.Groups*` | Calls a method on multiple groups of connections. |
| `Microsoft.AspNetCore.SignalR.IHubCallerClients`1.OthersInGroup*` | Calls a method on a group of connections, excluding the client that invoked the hub method. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.User*` | Calls a method on all connections associated with a specific user. |
| `Microsoft.AspNetCore.SignalR.IHubClients`1.Users*` | Calls a method on all connections associated with the specified users. |

Each property or method returns an object with a `SendAsync` method. The `SendAsync` method receives the name of the client method to call and any parameters.

The object returned by the `Client` and `Caller` methods also contain an `InvokeAsync` method, which can be used to wait for a result from the client.

## Send messages to clients

To make calls to specific clients, use the properties of the `Clients` object. In the following example, there are three hub methods:

* The `SendMessage` method sends a message to all connected clients by using the `Clients.All` property.
* The `SendMessageToCaller` method sends a message back to the caller by using the `Clients.Caller` property.
* The `SendMessageToGroup` method sends a message to all clients in the `SignalR Users` group.

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/ChatHub.cs._
## Use strongly typed hubs

A drawback of using the `SendAsync` method is that it relies on a string to specify the client method to call. This design leaves code open to runtime errors if the method name is misspelled or missing from the client.

An alternative to using the `SendAsync` method is to strongly type the `Microsoft.AspNetCore.SignalR.Hub` class with `Microsoft.AspNetCore.SignalR.Hub`1`. In the following example, the `ChatHub` client method is extracted into an interface named `IChatClient`:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/IChatClient.cs._
The interface can be used to refactor the preceding `ChatHub` example to make it strongly typed:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/StronglyTypedChatHub.cs._
Using `Hub<IChatClient>` enables compile-time checking of the client methods. This approach prevents issues caused by using strings because `Hub<T>` can only provide access to the methods defined in the interface. Using a strongly typed `Hub<T>` disables the ability to use the `SendAsync` method.

> **Note:**
> The `Async` suffix isn't stripped from method names. Unless a client method is defined with `.on('MyMethodAsync')`, don't use `MyMethodAsync` as the name.

## Request client results

In addition to making calls to clients, the server can request a result from a client. In this scenario, the server uses the `ISingleClientProxy.InvokeAsync` method and the client returns a result from its `.On` handler. Pass a `System.Threading.CancellationToken` that limits how long the server waits for a result. The following examples use a 30-second cancellation token.

There are two ways to use the API on the server.

You can call `Client(...)` or `Caller` on the `Clients` property in a `Hub` method:

```csharp
public class ChatHub : Hub
{
    public async Task<string> WaitForMessage(string connectionId)
    {
        using var cancellationTokenSource =
            new CancellationTokenSource(TimeSpan.FromSeconds(30));

        var message = await Clients.Client(connectionId).InvokeAsync<string>(
            "<example-value>", cancellationTokenSource.Token);
        return message;
    }
}
```

Or, you can call `Client(...)` on an instance of IHubContext\<T>:

```csharp
async Task SomeMethod(IHubContext<MyHub> context)
{
    using var cancellationTokenSource =
        new CancellationTokenSource(TimeSpan.FromSeconds(30));

    string result = await context.Clients.Client(connectionID).InvokeAsync<string>(
        "<example-value>", cancellationTokenSource.Token);
}
```

Strongly typed hubs can also return values from interface methods:

```csharp
public interface IClient
{
    Task<string> GetMessage();
}

public class ChatHub : Hub<IClient>
{
    public async Task<string> WaitForMessage(string connectionId)
    {
        string message = await Clients.Client(connectionId).GetMessage();
        return message;
    }
}
```

Clients return results in their `.On(...)` handlers, as shown in the following sections.

#### .NET client

```csharp
hubConnection.On("GetMessage", async () =>
{
    Console.WriteLine("Enter message:");
    var message = await Console.In.ReadLineAsync();
    return message;
});
```

#### TypeScript client

```typescript
hubConnection.on("GetMessage", async () => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("message");
        }, 100);
    });
    return promise;
});
```

#### Java client

```java
hubConnection.onWithResult("GetMessage", () -> {
    return Single.just("message");
});
```

## Change the name of a hub method

By default, a server hub method name is the name of the .NET method. To change this default behavior for a specific method, use the HubMethodName attribute. The client should use this name instead of the .NET method name when invoking the method:

_Code sample not included: ~/../AspNetCore.Docs.Samples/signalr/hubs/samples/6.x/SignalRHubsSample/Snippets/Hubs/ChatHub.cs._
