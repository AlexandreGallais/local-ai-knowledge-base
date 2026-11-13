---
title: "WebSockets support in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/fundamentals/websockets.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# WebSockets support in ASP.NET Core (part 2 of 2)

## WebSocket origin restriction

The protections provided by CORS don't apply to WebSockets. Browsers do **not**:

* Perform CORS pre-flight requests.
* Respect the restrictions specified in `Access-Control` headers when making WebSocket requests.

However, browsers do send the `Origin` header when issuing WebSocket requests. Applications should be configured to validate these headers to ensure that only WebSockets coming from the expected origins are allowed.

If you're hosting your server on "https://server.com" and hosting your client on "https://client.com", add "https://client.com" to the `Microsoft.AspNetCore.Builder.WebSocketOptions.AllowedOrigins` list for WebSockets to verify.

```csharp
var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(2)
};

webSocketOptions.AllowedOrigins.Add("https://client.com");
webSocketOptions.AllowedOrigins.Add("https://www.client.com");

app.UseWebSockets(webSocketOptions);
```
> **Note:**
> The `Origin` header is controlled by the client and, like the `Referer` header, can be faked. Do **not** use these headers as an authentication mechanism.

### IIS/IIS Express support

Windows Server 2012 or later and Windows 8 or later with IIS/IIS Express 8 or later has support for the WebSocket protocol, but not for WebSockets over HTTP/2.

> **Note:**
> WebSockets are always enabled when using IIS Express.

### Enabling WebSockets on IIS

To enable support for the WebSocket protocol on Windows Server 2012 or later:

> **Note:**
> These steps are not required when using IIS Express

1. Use the **Add Roles and Features** wizard from the **Manage** menu or the link in **Server Manager**.
1. Select **Role-based or Feature-based Installation**. Select **Next**.
1. Select the appropriate server (the local server is selected by default). Select **Next**.
1. Expand **Web Server (IIS)** in the **Roles** tree, expand **Web Server**, and then expand **Application Development**.
1. Select **WebSocket Protocol**. Select **Next**.
1. If additional features aren't needed, select **Next**.
1. Select **Install**.
1. When the installation completes, select **Close** to exit the wizard.

To enable support for the WebSocket protocol on Windows 8 or later:

> **Note:**
> These steps are not required when using IIS Express

1. Navigate to **Control Panel** > **Programs** > **Programs and Features** > **Turn Windows features on or off** (left side of the screen).
1. Open the following nodes: **Internet Information Services** > **World Wide Web Services** > **Application Development Features**.
1. Select the **WebSocket Protocol** feature. Select **OK**.

### Disable WebSocket when using socket.io on Node.js

If using the WebSocket support in socket.io on Node.js, disable the default IIS WebSocket module using the `webSocket` element in *web.config* or *applicationHost.config*. If this step isn't performed, the IIS WebSocket module attempts to handle the WebSocket communication rather than Node.js and the app.

```xml
<system.webServer>
  <webSocket enabled="false" />
</system.webServer>
```

## Sample app

The sample app that accompanies this article is an echo app. It has a webpage that makes WebSocket connections, and the server resends any messages it receives back to the client. The sample app supports WebSockets over HTTP/2 when using a targeted framework of .NET 7 or later.

Run the app:

* To run app in Visual Studio: Open the sample project in Visual Studio, and press Ctrl+F5 to run without the debugger.
* To run the app in a command shell: Run the command `dotnet run` and navigate in a browser to `http://localhost:<port>`.

The webpage shows the connection status:

Select **Connect** to send a WebSocket request to the URL shown. Enter a test message and select **Send**. When done, select **Close Socket**. The **Communication Log** section reports each open, send, and close action as it happens.
