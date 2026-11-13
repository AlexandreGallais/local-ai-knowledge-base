---
title: "ASP.NET Core SignalR .NET client (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/dotnet-client.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR .NET client (part 2 of 2)

## Call client methods from hub

Define the methods that the hub calls by using `connection.On`. Typically, handlers are registered after building the connection and before starting it:

```csharp
connection.On<string, string>("ReceiveMessage", (user, message) =>
{
    this.Dispatcher.Invoke(() =>
    {
       var newMessage = $"{user}: {message}";
       messagesList.Items.Add(newMessage);
    });
});
```

The preceding code in `connection.On` runs when server-side code calls it by using the `SendAsync` method:

```csharp
public async Task SendMessage(string user, string message)
{
    await Clients.All.SendAsync("ReceiveMessage", user, message);
}
```

Registering handlers before calling `StartAsync` is recommended to avoid missing incoming messages that the server may send immediately upon connecting. However, handlers can also be registered dynamically after the connection has already started.

To unregister a handler:

* Call `System.IDisposable.Dispose*` on the `IDisposable` returned by `connection.On`:

  ```csharp
  IDisposable handler = connection.On<string, string>("ReceiveMessage", (user, message) =>
  {
      // ...
  });

  // Later, stop listening for messages:
  handler.Dispose();
  ```

* In ASP.NET Core 2.2 and later, call `Microsoft.AspNetCore.SignalR.Client.HubConnection.Remove*` with the method name to remove all handlers registered for that method:

  ```csharp
  connection.Remove("ReceiveMessage");
  ```

> **Note:**
> While the hub side of the connection supports strongly typed messaging, the client must register by using the generic method `Microsoft.AspNetCore.SignalR.Client.HubConnection.On*` with the method name. For an example, see Host ASP.NET Core SignalR in background services.

## Error handling and logging

Handle errors with a `try...catch` statement. Inspect the `Exception` object to determine the proper action to take after an error occurs:

```csharp
try
{
    await connection.InvokeAsync("SendMessage", 
        userTextBox.Text, messageTextBox.Text);
```

## Refresh authentication without reconnecting

When the server enables authentication refresh, the .NET client can replace the credentials on an open connection instead of letting the connection close when its access token expires. Automatic refresh is enabled by default, and `Microsoft.AspNetCore.SignalR.Client.HubConnection` exposes a `RefreshAuthenticationAsync` method that requests an immediate refresh. To change the refresh timing or turn automatic refresh off, call `WithAuthenticationRefresh` when building the connection. For the client options, the refresh events, and the server options that enable the feature, see SignalR authentication and authorization.

## Related content

* Hubs
* JavaScript client
* Publish to Azure
* Azure Functions development and configuration with Azure SignalR Service
