---
title: "SignalR API design considerations"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/api-design.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# SignalR API design considerations

By Ashley Stanton-Nurse

This article provides guidance for building SignalR-based APIs.

## Use custom object parameters to ensure backwards-compatibility

Adding parameters to a SignalR hub method (on either the client or the server) is a *breaking change*. This means older clients/servers will get errors when they try to invoke the method without the appropriate number of parameters. However, adding properties to a custom object parameter is **not** a breaking change. This can be used to design compatible APIs that are resilient to changes on the client or the server.

For example, consider a server-side API like the following:

```csharp
public int GetTotalLength(string param1)
{
    return param1.Length;
}
```

The JavaScript client calls this method using `invoke` as follows:

```typescript
connection.invoke("GetTotalLength", "value1");
```

If you later add a second parameter to the server method, older clients won't provide this parameter value. For example:

```csharp
public int GetTotalLength(string param1, string param2)
{
    return param1.Length + param2.Length;
}
```

When the old client tries to invoke this method, it will get an error like this:

```
Microsoft.AspNetCore.SignalR.HubException: Failed to invoke 'GetTotalLength' due to an error on the server.
```

On the server, you'll see a log message like this:

```
System.IO.InvalidDataException: Invocation provides 1 argument(s) but target expects 2.
```

The old client only sent one parameter, but the newer server API required two parameters. Using custom objects as parameters gives you more flexibility. Let's redesign the original API to use a custom object:

```csharp
public class TotalLengthRequest
{
    public string Param1 { get; set; }
}

public int GetTotalLength(TotalLengthRequest req)
{
    return req.Param1.Length;
}
```

Now, the client uses an object to call the method:

```typescript
connection.invoke("GetTotalLength", { param1: "value1" });
```

Instead of adding a parameter, add a property to the `TotalLengthRequest` object:

```csharp
public class TotalLengthRequest
{
    public string Param1 { get; set; }
    public string Param2 { get; set; }
}

public int GetTotalLength(TotalLengthRequest req)
{
    var length = req.Param1.Length;
    if (req.Param2 != null)
    {
        length += req.Param2.Length;
    }
    return length;
}
```

When the old client sends a single parameter, the extra `Param2` property will be left `null`. You can detect a message sent by an older client by checking the `Param2` for `null` and apply a default value. A new client can send both parameters.

```typescript
connection.invoke("GetTotalLength", { param1: "value1", param2: "value2" });
```

The same technique works for methods defined on the client. You can send a custom object from the server side:

```csharp
public async Task Broadcast(string message)
{
    await Clients.All.SendAsync("ReceiveMessage", new
    {
        Message = message
    });
}
```

On the client side, you access the `Message` property rather than using a parameter:

```typescript
connection.on("ReceiveMessage", (req) => {
    appendMessageToChatWindow(req.message);
});
```

If you later decide to add the sender of the message to the payload, add a property to the object:

```csharp
public async Task Broadcast(string message)
{
    await Clients.All.SendAsync("ReceiveMessage", new
    {
        Sender = Context.User.Identity.Name,
        Message = message
    });
}
```

The older clients won't be expecting the `Sender` value, so they'll ignore it. A new client can accept it by updating to read the new property:

```typescript
connection.on("ReceiveMessage", (req) => {
    let message = req.message;
    if (req.sender) {
        message = req.sender + ": " + message;
    }
    appendMessageToChatWindow(message);
});
```

In this case, the new client is also tolerant of an old server that doesn't provide the `Sender` value. Since the old server won't provide the `Sender` value, the client checks to see if it exists before accessing it.

## Related content

* SignalR assemblies in shared framework
