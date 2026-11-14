---
title: "ServerOptionsSelectionCallback delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/ServerOptionsSelectionCallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServerOptionsSelectionCallback delegate

Namespace: `System.Net.Security`

```csharp
public delegate System.Threading.Tasks.ValueTask<System.Net.Security.SslServerAuthenticationOptions> ServerOptionsSelectionCallback(SslStream stream, SslClientHelloInfo clientHelloInfo, object? state, CancellationToken <example-value>);
```

Represents the asynchronous callback method that will select session properties based on the name requested by the client.

Parameters:

- `stream`: The TLS stream on which the authentication happens.
- `clientHelloInfo`: Information from the Client Hello message.
- `state`: The information that was passed when registering the callback.
- `cancellationToken`: The token to monitor for cancellation requests.

Returns: A server authentication property bag.

#### Remarks
This delegate provides authentication properties during the server authenticaton as an asynchronous operation.
