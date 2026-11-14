---
title: "WindowsProxyUsePolicy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/WindowsProxyUsePolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WindowsProxyUsePolicy enum

Namespace: `System.Net.Http`

```csharp
public enum WindowsProxyUsePolicy
```

This enumeration provides available options for the proxy settings used by an `HttpClient` when running on Windows.

To be added.

## WindowsProxyUsePolicy.DoNotUseProxy field

```csharp
DoNotUseProxy
```

This value indicates that a proxy will not be used.

## WindowsProxyUsePolicy.UseCustomProxy field

```csharp
UseCustomProxy
```

This value indicates that a custom proxy is used by specifying an object that implements the `IWebProxy` interface.

## WindowsProxyUsePolicy.UseWinHttpProxy field

```csharp
UseWinHttpProxy
```

This value indicates that the current proxy configuration of the WinHTTP API on the machine is used.

## WindowsProxyUsePolicy.UseWinInetProxy field

```csharp
UseWinInetProxy
```

This value indicates that the current proxy configuration of the WinINet API on the machine is used. The proxy settings can be configured using Internet options and supports WPAD and PAC files.
