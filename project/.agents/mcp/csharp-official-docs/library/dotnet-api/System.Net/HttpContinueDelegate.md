---
title: "HttpContinueDelegate delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpContinueDelegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpContinueDelegate delegate

Namespace: `System.Net`

```csharp
public delegate void HttpContinueDelegate(int StatusCode, WebHeaderCollection httpHeaders);
```

Represents the method that notifies callers when a continue response is received by the client.

Parameters:

- `StatusCode`: The numeric value of the HTTP status from the server.
- `httpHeaders`: The headers returned with the 100-continue response from the server.

#### Remarks
Use `HttpContinueDelegate` to specify the callback method to be called when an HTTP 100-continue response is received from the server. When set, the delegate is called whenever the first protocol response of type `Continue` is received. This is a change from the behavior of the version 1.1 Framework.

Your event handler must declare the same parameters as the `HttpContinueDelegate`.

> **Note:**
>  `StatusCode` is always `Continue`.

This is useful when the client wants to display the status of data being received from the server.
