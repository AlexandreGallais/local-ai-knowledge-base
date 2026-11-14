---
title: "HttpListener+ExtendedProtectionSelector delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListener+ExtendedProtectionSelector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListener+ExtendedProtectionSelector delegate

Namespace: `System.Net`

```csharp
public delegate System.Security.Authentication.ExtendedProtection.ExtendedProtectionPolicy HttpListener.ExtendedProtectionSelector(HttpListenerRequest request);
```

A delegate called to determine the `ExtendedProtectionPolicy` to use for each `HttpListener` request.

Parameters:

- `request`: The `HttpListenerRequest` to determine the extended protection policy that the `HttpListener` instance will use to provide extended protection.

Returns: An `ExtendedProtectionPolicy` object that specifies the extended protection policy to use for this request.

#### Remarks
The `ExtendedProtectionSelector` class is used with integrated Windows authentication to provide extended protection. For each request, the delegate can choose the settings that the `HttpListener` instance will use to provide extended protection.
