---
title: "BindIPEndPoint delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/BindIPEndPoint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BindIPEndPoint delegate

Namespace: `System.Net`

```csharp
public delegate System.Net.IPEndPoint BindIPEndPoint(ServicePoint servicePoint, IPEndPoint remoteEndPoint, int retryCount);
```

Represents the method that specifies a local Internet Protocol address and port number for a `ServicePoint`.

Parameters:

- `servicePoint`: The `ServicePoint` associated with the connection to be created.
- `remoteEndPoint`: The remote `IPEndPoint` that specifies the remote host.
- `retryCount`: The number of times this delegate was called for a specified connection.

Returns: The local `IPEndPoint` to which the `ServicePoint` is bound.

Exceptions:

- `OverflowException`: `retryCount` is equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>

#### Remarks
Specify that the `BindIPEndPoint` delegate is used by a `ServicePoint` by setting the `BindIPEndPointDelegate` property with the delegate as an argument. This delegate should specify a local IP address and port number in the returned `IPEndPoint`.

If .NET cannot bind the returned `IPEndPoint` to the `ServicePoint` after `MaxValue` attempts, an `OverflowException` is thrown.

If you want the delegate to give the service point control of the connection binding, the delegate should return `null`. If you want to abort the connection, the delegate must throw an exception.
