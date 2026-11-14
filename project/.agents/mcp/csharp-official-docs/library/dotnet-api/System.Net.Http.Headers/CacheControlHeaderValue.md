---
title: "CacheControlHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/CacheControlHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CacheControlHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class CacheControlHeaderValue : ICloneable
```

Represents the value of the Cache-Control header.

To be added.

## CacheControlHeaderValue.CacheControlHeaderValue() constructor

```csharp
public CacheControlHeaderValue ();
```

Initializes a new instance of the `CacheControlHeaderValue` class.

To be added.

## CacheControlHeaderValue.Extensions property

```csharp
public System.Collections.Generic.ICollection<System.Net.Http.Headers.NameValueHeaderValue> Extensions { get; }
```

Cache-extension tokens, each with an optional assigned value.

Returns: A collection of cache-extension tokens each with an optional assigned value.

#### Remarks
This property represents the "cache-extension" directive in a cache-control header field on an HTTP request or HTTP response.

## CacheControlHeaderValue.MaxAge property

```csharp
public TimeSpan? MaxAge { get; set; }
```

The maximum age, specified in seconds, that the HTTP client is willing to accept a response.

Returns: The time in seconds.

#### Remarks
This property represents the "max-age" directive in a cache-control header field on an HTTP request or HTTP response.

Unless the `MaxStale` property is also set, the client is not willing to accept a stale response.

## CacheControlHeaderValue.MaxStale property

```csharp
public bool MaxStale { get; set; }
```

Whether an HTTP client is willing to accept a response that has exceeded its expiration time.

Returns: `true` if the HTTP client is willing to accept a response that has exceed the expiration time; otherwise, `false`.

#### Remarks
This property represents if the "max-stale" directive is present in a cache-control header field on an HTTP request.

## CacheControlHeaderValue.MaxStaleLimit property

```csharp
public TimeSpan? MaxStaleLimit { get; set; }
```

The maximum time, in seconds, an HTTP client is willing to accept a response that has exceeded its expiration time.

Returns: The time in seconds.

#### Remarks
This property represents the value assigned to "max-stale" directive in a cache-control header field on an HTTP request.

If the `MaxStaleLimit` property is assigned a value other than zero, then the client is willing to accept a response that has exceeded its expiration time by no more than the specified number of seconds. If a value of zero is assigned to the `MaxStaleLimit` property, then the client is willing to accept a stale response of any age.

## CacheControlHeaderValue.MinFresh property

```csharp
public TimeSpan? MinFresh { get; set; }
```

The freshness lifetime, in seconds, that an HTTP client is willing to accept a response.

Returns: The time in seconds.

#### Remarks
This property represents the "min-fresh" directive in a cache-control header field on an HTTP request.

The property indicates that the HTTP client is willing to accept a response whose freshness lifetime is no less than its current age plus the freshness lifetime specified time in seconds. The client wants a response that will still be fresh for at least the current age plus the freshness lifetime.

## CacheControlHeaderValue.MustRevalidate property

```csharp
public bool MustRevalidate { get; set; }
```

Whether the origin server require revalidation of a cache entry on any subsequent use when the cache entry becomes stale.

Returns: `true` if the origin server requires revalidation of a cache entry on any subsequent use when the entry becomes stale; otherwise, `false`.

#### Remarks
This property represents the "must-revalidate" directive in a cache-control header field on an HTTP response.

## CacheControlHeaderValue.NoCache property

```csharp
public bool NoCache { get; set; }
```

Whether an HTTP client is willing to accept a cached response.

Returns: `true` if the HTTP client is not willing to accept a cached response; otherwise, `false`.

#### Remarks
This property represents the "no-cache" directive in a cache-control header field on an HTTP request or HTTP response.

When the `NoCache` property is set to `true` present in a HTTP request message, an application should forward the request toward the origin server even if it has a cached copy of what is being requested.

## CacheControlHeaderValue.NoCacheHeaders property

```csharp
public System.Collections.Generic.ICollection<string> NoCacheHeaders { get; }
```

A collection of fieldnames in the "no-cache" directive in a cache-control header field on an HTTP response.

Returns: A collection of fieldnames.

#### Remarks
This property represents fieldnames in the "no-cache" directive in a cache-control header field on an HTTP response.

## CacheControlHeaderValue.NoStore property

```csharp
public bool NoStore { get; set; }
```

Whether a cache must not store any part of either the HTTP request message or any response.

Returns: `true` if a cache must not store any part of either the HTTP request message or any response; otherwise, `false`.

#### Remarks
This property represents the "no-store" directive in a cache-control header field on an HTTP request or HTTP response.

The purpose of the `NoStore` property is to prevent the inadvertent release or retention of sensitive information. This property applies to the entire message, and may be sent either in an HTTP request or a response.

## CacheControlHeaderValue.NoTransform property

```csharp
public bool NoTransform { get; set; }
```

Whether a cache or proxy must not change any aspect of the entity-body.

Returns: `true` if a cache or proxy must not change any aspect of the entity-body; otherwise, `false`.

#### Remarks
This property represents the "no-transform" directive in a cache-control header field on an HTTP request or HTTP response.

When the `CacheControlHeaderValue.NoTransform` is set to `true`, intermediate caches or proxies must not change any aspect of the entity body. Implementors of intermediate caches and proxies have found it useful to convert the media type of certain entity bodies. A non-transparent proxy might, for example, convert between image formats in order to save cache space or to reduce the amount of traffic on a slow link. Serious operational problems occur, however, when these transformations are applied to entity bodies intended for certain kinds of applications.

## CacheControlHeaderValue.OnlyIfCached property

```csharp
public bool OnlyIfCached { get; set; }
```

Whether a cache should either respond using a cached entry that is consistent with the other constraints of the HTTP request, or respond with a 504 (Gateway Timeout) status.

Returns: `true` if a cache should either respond using a cached entry that is consistent with the other constraints of the HTTP request, or respond with a 504 (Gateway Timeout) status; otherwise, `false`.

#### Remarks
This property represents the "only-if-cached" directive in a cache-control header field on an HTTP request.

## CacheControlHeaderValue.Private property

```csharp
public bool Private { get; set; }
```

Whether all or part of the HTTP response message is intended for a single user and must not be cached by a shared cache.

Returns: `true` if the HTTP response message is intended for a single user and must not be cached by a shared cache; otherwise, `false`.

#### Remarks
This property represents the "private" directive in a cache-control header field on an HTTP response.

## CacheControlHeaderValue.PrivateHeaders property

```csharp
public System.Collections.Generic.ICollection<string> PrivateHeaders { get; }
```

A collection fieldnames in the "private" directive in a cache-control header field on an HTTP response.

Returns: A collection of fieldnames.

#### Remarks
This property represents fieldnames in the "private" directive in a cache-control header field on an HTTP response.

## CacheControlHeaderValue.ProxyRevalidate property

```csharp
public bool ProxyRevalidate { get; set; }
```

Whether the origin server require revalidation of a cache entry on any subsequent use when the cache entry becomes stale for shared user agent caches.

Returns: `true` if the origin server requires revalidation of a cache entry on any subsequent use when the entry becomes stale for shared user agent caches; otherwise, `false`.

#### Remarks
This property represents the "proxy-revalidate" directive in a cache-control header field on an HTTP response.

This property does not affect  non-shared user agent caches.

## CacheControlHeaderValue.Public property

```csharp
public bool Public { get; set; }
```

Whether an HTTP response may be cached by any cache, even if it would normally be non-cacheable or cacheable only within a non- shared cache.

Returns: `true` if the HTTP response may be cached by any cache, even if it would normally be non-cacheable or cacheable only within a non- shared cache; otherwise, `false`.

#### Remarks
This property represents the "public" directive in a cache-control header field on an HTTP response.

## CacheControlHeaderValue.SharedMaxAge property

```csharp
public TimeSpan? SharedMaxAge { get; set; }
```

The shared maximum age, specified in seconds, in an HTTP response that overrides the "max-age" directive in a cache-control header or an Expires header for a shared cache.

Returns: The time in seconds.

#### Remarks
This property represents the "s-max-age" directive in a cache-control header field on an HTTP response.

## CacheControlHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `CacheControlHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## CacheControlHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for a  `CacheControlHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `CacheControlHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## CacheControlHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.CacheControlHeaderValue Parse (string? input);
```

Converts a string to an `CacheControlHeaderValue` instance.

Parameters:

- `input`: A string that represents cache-control header value information.

Returns: A `CacheControlHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid cache-control header value information.

To be added.

## CacheControlHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `CacheControlHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `CacheControlHeaderValue` instance is cast to an `ICloneable` interface.

## CacheControlHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `CacheControlHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## CacheControlHeaderValue.TryParse(String, CacheControlHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.CacheControlHeaderValue? parsedValue);
```

Determines whether a string is valid `CacheControlHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `CacheControlHeaderValue` version of the string.

Returns: `true` if `input` is valid `CacheControlHeaderValue` information; otherwise, `false`.

To be added.
