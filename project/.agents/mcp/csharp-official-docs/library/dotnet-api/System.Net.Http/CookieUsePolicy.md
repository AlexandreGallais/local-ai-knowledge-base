---
title: "CookieUsePolicy enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/CookieUsePolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CookieUsePolicy enum

Namespace: `System.Net.Http`

```csharp
public enum CookieUsePolicy
```

This enumeration allows control of HTTP cookies when communicating with the server.

To be added.

## CookieUsePolicy.IgnoreCookies field

```csharp
IgnoreCookies
```

This value indicates that no cookies are sent to the server by the client.

## CookieUsePolicy.UseInternalCookieStoreOnly field

```csharp
UseInternalCookieStoreOnly
```

This value indicates that cookies are handled internally which optimizes performance. Accessing, adding and deleting cookies is not allowed when this value is used.

## CookieUsePolicy.UseSpecifiedCookieContainer field

```csharp
UseSpecifiedCookieContainer
```

This value indicates that cookies are managed manually using a `CookieContainer` type.
