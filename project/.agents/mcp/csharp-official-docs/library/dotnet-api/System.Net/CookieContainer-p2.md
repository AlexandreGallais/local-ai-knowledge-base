---
title: "CookieContainer class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/CookieContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CookieContainer class (part 2 of 2)

## CookieContainer.SetCookies(Uri, String) method

```csharp
public void SetCookies (Uri uri, string cookieHeader);
```

Adds `Cookie` instances for one or more cookies from an HTTP cookie header to the `CookieContainer` for a specific URI.

Parameters:

- `uri`: The URI of the `CookieCollection`.
- `cookieHeader`: The contents of an HTTP set-cookie header as returned by a HTTP server, with `Cookie` instances delimited by commas.

Exceptions:

- `ArgumentNullException`: `uri` or `cookieHeader` is `null`.
- `CookieException`: One of the cookies is invalid.

-or-

An error occurred while adding one of the cookies to the container.

#### Remarks
`CookieContainer.SetCookies` pulls all the HTTP cookies out of the HTTP cookie header, builds a `Cookie` for each one, and then adds each `Cookie` to the internal `CookieCollection` that is associated with the URI. The HTTP cookies in the `cookieHeader` string must be delimited by commas.

## CookieContainer.DefaultCookieLengthLimit field

```csharp
public const int DefaultCookieLengthLimit = 4096;
```

Represents the default maximum size, in bytes, of the `Cookie` instances that the `CookieContainer` can hold. This field is constant.

#### Remarks
The default maximum `Cookie` size is 4096.

## CookieContainer.DefaultCookieLimit field

```csharp
public const int DefaultCookieLimit = 300;
```

Represents the default maximum number of `Cookie` instances that the `CookieContainer` can hold. This field is constant.

#### Remarks
The default maximum number of `Cookie` instances is 300.

## CookieContainer.DefaultPerDomainCookieLimit field

```csharp
public const int DefaultPerDomainCookieLimit = 20;
```

Represents the default maximum number of `Cookie` instances that the `CookieContainer` can reference per domain. This field is constant.

#### Remarks
The default maximum number of `Cookie` instances per domain is 20.
