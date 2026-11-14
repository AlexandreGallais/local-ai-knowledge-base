---
title: "signalr-trimming-aot"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-9/includes/signalr-trimming-aot.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# signalr-trimming-aot

### SignalR supports trimming and Native AOT

Continuing the Native AOT journey started in .NET 8, we have enabled trimming and native ahead-of-time (AOT) compilation support for both SignalR client and server scenarios. You can now take advantage of the performance benefits of using Native AOT in applications that use SignalR for real-time web communications.

#### Getting started

Install the latest .NET 9 SDK.

Create a solution from the `webapiaot` template in a command shell using the following command:

```dotnetcli
dotnet new webapiaot -o SignalRChatAOTExample
```

Replace the contents of the `Program.cs` file with the following SignalR code:

```csharp
using Microsoft.AspNetCore.SignalR;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateSlimBuilder(args);

builder.Services.AddSignalR();
builder.Services.Configure<JsonHubProtocolOptions>(o =>
{
    o.PayloadSerializerOptions.TypeInfoResolverChain.Insert(0, AppJsonSerializerContext.Default);
});

var app = builder.Build();

app.MapHub<ChatHub>("/chatHub");
app.MapGet("/", () => Results.Content("""
<!DOCTYPE html>
<html>
<head>
    <title>SignalR Chat</title>
</head>
<body>
    <input id="userInput" placeholder="Enter your name" />
    <input id="messageInput" placeholder="Type a message" />
    <button onclick="sendMessage()">Send</button>
    <ul id="messages"></ul>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js"></script>
    <script>
        const connection = new signalR.HubConnectionBuilder()
            .withUrl("/chatHub")
            .build();

        connection.on("ReceiveMessage", (user, message) => {
            const li = document.createElement("li");
            li.textContent = `${user}: ${message}`;
            document.getElementById("messages").appendChild(li);
        });

        async function sendMessage() {
            const user = document.getElementById("userInput").value;
            const message = document.getElementById("messageInput").value;
            await connection.invoke("SendMessage", user, message);
        }

        connection.start().catch(err => console.error(err));
    </script>
</body>
</html>
""", "text/html"));

app.Run();

[JsonSerializable(typeof(string))]
internal partial class AppJsonSerializerContext : JsonSerializerContext { }

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

The preceding example produces a native Windows executable of 10 MB and a Linux executable of 10.9 MB.

#### Limitations

* Only the JSON protocol is currently supported:
  * As shown in the preceding code, apps that use JSON serialization and Native AOT must use the `System.Text.Json` Source Generator.
  * This follows the same approach as Minimal APIs.
* On the SignalR server, Hub method parameters of type `IAsyncEnumerable<T>` and `ChannelReader<T>` where `T` is a ValueType (`struct`) aren't supported. Using these types results in a runtime exception at startup in development and in the published app. For more information, see SignalR: Using IAsyncEnumerable<T> and ChannelReader<T> with ValueTypes in native AOT (`dotnet/aspnetcore` #56179).
* Strongly typed hubs aren't supported with Native AOT (`PublishAot`). Using strongly typed hubs with Native AOT will result in warnings during build and publish, and a runtime exception. Using strongly typed hubs with trimming (`PublishedTrimmed`) is supported.
  * Make sure to copy the names from `[HubMethodName(...)]` applied to the strongly typed hub interface methods into the `SendAsync` calls.
* Only `Task`, `Task<T>`, `ValueTask`, or `ValueTask<T>` are supported for async return types.
