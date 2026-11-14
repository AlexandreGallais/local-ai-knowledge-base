---
title: "Customize SNI in HTTP requests"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/httpclient-sni.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Customize SNI in HTTP requests

When a client and server negotiate an HTTPS connection, a TLS connection needs to be established first. As part of the TLS handshake, the client sends the domain name of the server it's connecting to in one of the TLS extensions. When multiple (virtual) servers are hosted on the same machine, this feature of the TLS protocol allows clients to distinguish which of these servers they're connecting to and to configure TLS settings, such as the server certificate, accordingly.

When an HTTP request using `HttpClient` is made, the implementation automatically selects a value for the server name indication (SNI) extension based on the URL the client is connecting to. For scenarios that require more manual control of the extension, you can use one of the following approaches.

## Host header

Host HTTP header performs a similar function as the SNI extension in TLS. It lets the target server distinguish among requests for multiple host names on a single IP address. `HttpClient` automatically fills in the Host header using the request URI. However, you can also set its value manually, and `HttpClient` will also use the new value in the SNI extension. You can use either `HttpRequestMessage.Headers.Host` or `HttpClient.DefaultRequestHeaders.Host` to achieve this effect.

```csharp
using HttpClient client = new();

client.DefaultRequestHeaders.Host = "www.microsoft.com";

using var response = await client.GetAsync("https://127.0.0.1:5001/");

System.Console.WriteLine(response);
```

> **Note:**
> This method doesn't allow you to avoid sending SNI altogether when connecting to a URL with a hostname. If the header is set to empty string, `HttpClient` uses the hostname from the URL instead.

> **Note:**
> Customizing the Host header affects server certificate validation. By default, client will expect the server certificate to match the hostname in the Host header.

## Manual SslStream authentication via ConnectCallback

A more complicated, but also more powerful, option is to use the `SocketsHttpHandler.ConnectCallback`. Since .NET 7, it's possible to return an authenticated `SslStream` and thus customize how the TLS connection is established. Inside the callback, arbitrary `SslClientAuthenticationOptions` options can be used to perform client-side authentication.

```csharp
var handler = new SocketsHttpHandler
{
    ConnectCallback = async (context, cancellationToken) =>
    {
        var socket = new Socket(SocketType.Stream, ProtocolType.Tcp) { NoDelay = true };
        try
        {
            await socket.ConnectAsync(context.DnsEndPoint, cancellationToken);

            var sslStream = new SslStream(new NetworkStream(socket, ownsSocket: true));

            // When using HTTP/2, you must also keep in mind to set options like ApplicationProtocols
            await sslStream.AuthenticateAsClientAsync(new SslClientAuthenticationOptions
            {
                TargetHost = context.DnsEndPoint.Host,

            }, cancellationToken);

            return sslStream;
        }
        catch
        {
            socket.Dispose();
            throw;
        }
    }
};

using HttpClient client = new(handler);

using var response = await client.GetAsync("https://www.microsoft.com");

System.Console.WriteLine(response);
```
