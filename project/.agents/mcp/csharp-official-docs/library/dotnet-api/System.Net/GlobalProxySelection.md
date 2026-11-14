---
title: "GlobalProxySelection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/GlobalProxySelection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GlobalProxySelection class

Namespace: `System.Net`

```csharp
public class GlobalProxySelection
```

Contains a global default proxy instance for all HTTP requests.

To be added.

## GlobalProxySelection.GlobalProxySelection() constructor

```csharp
public GlobalProxySelection ();
```

Initializes a new instance of the `GlobalProxySelection` class.

To be added.

## GlobalProxySelection.Select property

```csharp
public static System.Net.IWebProxy Select { get; set; }
```

Gets or sets the global HTTP proxy.

Returns: An `IWebProxy` that every call to `HttpWebRequest.GetResponse` uses.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation was `null`.
- `SecurityException`: The caller does not have permission for the requested operation.

#### Remarks
The `Select` property sets the proxy that all `WebRequest` instances use if the request supports proxies and no proxy is set explicitly using the `Proxy` property. Proxies are currently supported by `FtpWebRequest` and `HttpWebRequest`.

## GlobalProxySelection.GetEmptyWebProxy() method

```csharp
public static System.Net.IWebProxy GetEmptyWebProxy ();
```

Returns an empty proxy instance.

Returns: An `IWebProxy` that contains no information.

#### Remarks

The `GlobalProxySelection.GetEmptyWebProxy` method returns a blank `IWebProxy` instance to indicate that no proxy is used to access an Internet resource.

Instead of calling the `GetEmptyWebProxy` method, you can assign `null` to members such as the `Proxy` property, which specifies the proxy that communicates with remote servers on behalf of the `WebClient` object.
