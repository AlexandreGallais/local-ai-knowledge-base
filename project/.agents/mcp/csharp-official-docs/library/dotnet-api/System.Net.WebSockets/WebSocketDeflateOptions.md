---
title: "WebSocketDeflateOptions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.WebSockets/WebSocketDeflateOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebSocketDeflateOptions class

Namespace: `System.Net.WebSockets`

```csharp
public sealed class WebSocketDeflateOptions
```

Options to enable per-message deflate compression for `WebSocket`.

#### Remarks

Although the WebSocket spec allows window bits from 8 to 15, the current implementation doesn't support 8 bits.

## WebSocketDeflateOptions.WebSocketDeflateOptions() constructor

```csharp
public WebSocketDeflateOptions ();
```

Creates an instance of the `WebSocketDeflateOptions` class.

To be added.

## WebSocketDeflateOptions.ClientContextTakeover property

```csharp
public bool ClientContextTakeover { get; set; }
```

Gets or sets a value indicating whether the client-side of the connection indicates that it will persist the deflate context across messages.

Returns: `true` if the client-side of the connection indicates that it will persist the deflate context accross messages. The default is `true`.

#### Remarks

https://tools.ietf.org/html/rfc7692#section-7.1.1.2

## WebSocketDeflateOptions.ClientMaxWindowBits property

```csharp
public int ClientMaxWindowBits { get; set; }
```

This parameter indicates the base-2 logarithm for the LZ77 sliding window size used by the client to compress messages and by the server to decompress them.
Must be a value between 9 and 15. The default is 15.

Returns: To be added.

#### Remarks

https://tools.ietf.org/html/rfc7692#section-7.1.2.2

## WebSocketDeflateOptions.ServerContextTakeover property

```csharp
public bool ServerContextTakeover { get; set; }
```

Gets or sets a value indicating whether the server-side of the connection indicates that it will persist the deflate context across messages.

Returns: `true` if the server-side of the connection indicates that it will persist the deflate context across messages. The default is `true`.

#### Remarks

https://tools.ietf.org/html/rfc7692#section-7.1.1.1

## WebSocketDeflateOptions.ServerMaxWindowBits property

```csharp
public int ServerMaxWindowBits { get; set; }
```

This parameter indicates the base-2 logarithm for the LZ77 sliding window size used by the server to compress messages and by the client to decompress them.
Must be a value between 9 and 15. The default is 15.

Returns: To be added.

#### Remarks

https://tools.ietf.org/html/rfc7692#section-7.1.2.1
