---
title: "ASP.NET Core SignalR JavaScript client (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/signalr/javascript-client.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core SignalR JavaScript client

The ASP.NET Core SignalR JavaScript client library enables developers to call server-side SignalR hub code. This article describes how to use the APIs to connect to a SignalR hub, and call the JavaScript hub and client methods.

View or download sample code (how to download)

## Install the SignalR client package

The SignalR JavaScript client library is delivered as an npm package. There are several ways to install the client library:

- Run `npm` commands in Visual Studio **Package Manager Console**.
- Run `npm` commands in the integrated terminal in Visual Studio Code.
- Reference a copy of the client library hosted on a Content Delivery Network (CDN).
- Use LibMan and install specific client library files from a CDN-hosted client library.

# Visual Studio

Run the following `npm` commands in the **Package Manager Console** window:

```bash
npm init -y
npm install @microsoft/signalr
```

# Visual Studio Code

Open an integrated terminal and run the following `npm` commands:

```bash
npm init -y
npm install @microsoft/signalr
```

---

npm installs the package contents in the *node_modules\\@microsoft\signalr\dist\browser* folder.

Complete the setup:

1. Create the *wwwroot/lib/signalr* folder.

1. Copy the _signalr.js_ file to the *wwwroot/lib/signalr* folder.

Now you can reference the installed SignalR JavaScript client in the `<script>` element. For example:

```html
<script src="~/lib/signalr/signalr.js"></script>
```

### Use a CDN

To use the client library without the npm prerequisite, reference a CDN-hosted copy of the client library. For example:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/6.0.1/signalr.js"></script>
```

The code example specifies version 6.0.1. To get the latest client library version, choose one of the following CDNs:

* cdnjs
* jsDelivr
* unpkg

### Install with LibMan

Another approach is to use LibMan and install only specific client library files from the CDN-hosted client library. For example, you can add only the minified JavaScript file to the project.

For details on this approach, see Add the SignalR client library.

## Connect to a hub

The following code creates and starts a connection. The hub name is case insensitive:

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();

async function start() {
    try {
        await connection.start();
        console.log("SignalR Connected.");
    } catch (err) {
        console.log(err);
        setTimeout(start, 5000);
    }
};

connection.onclose(async () => {
    await start();
});

// Start the connection.
start();
```

### Cross-origin connections (CORS)

Typically, browsers load connections from the same domain as the requested page. However, there are occasions when a connection to another domain is required.

For cross domain requests, the client code ***must*** use an absolute URL rather than a relative URL. When you use cross domain requests, change `.withUrl("/chathub")` to `.withUrl("https://{App domain name}/chathub")`.

To prevent a malicious site from reading sensitive data from another site, cross-origin connections are disabled by default. To allow a cross-origin request, enable CORS:

```csharp
using SignalRChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("https://example.com")
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
                .AllowCredentials();
        });
});

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// UseCors must be called before MapHub.
app.UseCors();

app.MapRazorPages();
app.MapHub<ChatHub>("/chatHub");

app.Run();
```

The `Microsoft.AspNetCore.Builder.CorsMiddlewareExtensions.UseCors*` method must be called before calling the `Microsoft.AspNetCore.Builder.HubEndpointRouteBuilderExtensions.MapHub*` method.

## Call hub methods from the client

JavaScript clients call public methods on hubs via the invoke method of the HubConnection. The `invoke` method accepts:

* The name of the hub method.
* Any arguments defined in the hub method.

In the following highlighted code, the method name on the hub is `SendMessage`. The second and third arguments passed to `invoke` map to the hub method's `user` and `message` arguments:

```javascript
try {
    await connection.invoke("SendMessage", user, message);
} catch (err) {
    console.error(err);
}
```

Calling hub methods from a client is supported only when using the Azure SignalR Service in *Default* mode.

The `invoke` method returns a JavaScript Promise object. The `Promise` object is resolved with the return value (if any) when the method on the server returns. If the method on the server throws an error, the `Promise` object is rejected with the error message. To handle these cases, use `async` and `await` or the `Promise` object's `then` and `catch` methods.

JavaScript clients can also call public methods on hubs via the send method of the `HubConnection`. Unlike the `invoke` method, the `send` method doesn't wait for a response from the server. The `send` method returns a JavaScript `Promise` object. The `Promise` object is resolved when the message is sent to the server. If an error occurs when sending the message, the `Promise` object is rejected with the error message. To handle these cases, use `async` and `await` or the `Promise` object's `then` and `catch` methods.

Using `send` ***doesn't*** wait until the server receives the message, so it isn't possible to return data or errors from the server.

## Call client methods from the hub

To receive messages from the hub, define a method by using the on method of the `HubConnection`. The `on` method accepts:

* The name of the JavaScript client method.
* Arguments the hub passes to the method.

In the following example, the method name is `ReceiveMessage`. The argument names are `user` and `message`:

```javascript
connection.on("ReceiveMessage", (user, message) => {
    const li = document.createElement("li");
    li.textContent = `${user}: ${message}`;
    document.getElementById("messageList").appendChild(li);
});
```

The preceding code in `connection.on` runs when server-side code calls it by using the `Microsoft.AspNetCore.SignalR.ClientProxyExtensions.SendAsync*` method:

```csharp
﻿using Microsoft.AspNetCore.SignalR;
namespace SignalRChat.Hubs;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
```

SignalR determines which client method to call by matching the method name and arguments defined in `SendAsync` and `connection.on`.

A **best practice** is to call the start method on the `HubConnection` after `on`. This approach ensures the handlers are registered before any messages are received.

## Error handling and logging

Use `console.error` to output errors to the browser's console when the client can't connect or send a message:

```javascript
try {
    await connection.invoke("SendMessage", user, message);
} catch (err) {
    console.error(err);
}
```

Set up client-side log tracing by passing a logger and type of event to log when the connection is made. Messages are logged with the specified log level and higher. Available log levels are as follows:

| Log level                      | Logged data | Description |
| ------------------------------ | ----------- | ----------- |
| `signalR.LogLevel.Error`       | Error messages | Logs `Error` messages only. |
| `signalR.LogLevel.Warning`     | Warning messages about potential errors | Logs `Warning` and `Error` messages. |
| `signalR.LogLevel.Information` | Status messages without errors | Logs `Information`, `Warning`, and `Error` messages. |
| `signalR.LogLevel.Trace`       | Trace messages |  Logs everything, including data transported between hub and client. |

Use the configureLogging method on HubConnectionBuilder to configure the log level. Messages are logged to the browser console:

```javascript
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
```
