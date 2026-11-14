---
title: "CookieContainer class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/CookieContainer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CookieContainer class

Namespace: `System.Net`

```csharp
public class CookieContainer
```

Provides a container for a collection of `CookieCollection` objects.

#### Remarks
A `CookieContainer` is a data structure that provides storage for instances of the `Cookie` class, and which is accessed in a database-like manner. The `CookieContainer` has a capacity limit that is set when the container is created or changed by a property.

An instance of the `Cookie` class is added to the container based on its originating URI. It is added to an internal `CookieCollection` associated with the URI. A `Cookie` is retrieved from the container based on the URI as a `CookieCollection`, or as a string that can be used to submit HTTP WebRequests.

The `CookieContainer` has three properties that govern the volume of the content of the container: `CookieContainer.Capacity`, `CookieContainer.MaxCookieSize`, and `CookieContainer.PerDomainCapacity`. These values have the default settings of 300, 4096, and 20 respectively. When a `Cookie` is added to the container, these properties are used to determine whether a `Cookie` already contained in the `CookieContainer` should be discarded to make room for the new one. The `CookieContainer` keeps track of each addition to ensure that neither the `CookieContainer.Capacity` nor the `CookieContainer.PerDomainCapacity` limits are exceeded. If one or both are exceeded, then `Cookie` instances held by the `CookieContainer` are removed. First, any expired `Cookie` is removed. If further capacity must be recaptured, then the least-recently used `CookieCollection` is purged.

#### Thread Safety

The methods for adding and retrieving `Cookie` instances to and from a `CookieContainer` are thread-safe and can be used concurrently from multiple threads.

> **Note:**
> Regardless of thread-safety, unanticipated sharing of `CookieContainer` instances can lead to issues when working with `HttpClient` and `HttpClientHandler` or `SocketsHttpHandler`, since parts of the application that aren't intended to share cookies with each other might inadvertently do so.
> It is not recommended to use cookies together with `IHttpClientFactory`.

## CookieContainer.CookieContainer() constructor

```csharp
public CookieContainer ();
```

Initializes a new instance of the `CookieContainer` class.

#### Remarks
The parameterless constructor initializes all fields to their default values. `DefaultCookieLimit` is used to initialize `CookieContainer.Capacity`, `DefaultCookieLengthLimit` is used for `CookieContainer.MaxCookieSize`, and `DefaultPerDomainCookieLimit` is used for `CookieContainer.PerDomainCapacity`.

## CookieContainer.CookieContainer(Int32) constructor

```csharp
public CookieContainer (int capacity);
```

Initializes a new instance of the `CookieContainer` class with a specified value for the number of `Cookie` instances that the container can hold.

Parameters:

- `capacity`: The number of `Cookie` instances that the `CookieContainer` can hold.

Exceptions:

- `ArgumentException`: `capacity` is less than or equal to zero.

#### Remarks
`CookieContainer.PerDomainCapacity` is initialized to 20, and `CookieContainer.MaxCookieSize` is initialized to 4096.

## CookieContainer.CookieContainer(Int32, Int32, Int32) constructor

```csharp
public CookieContainer (int capacity, int perDomainCapacity, int maxCookieSize);
```

Initializes a new instance of the `CookieContainer` class with specific properties.

Parameters:

- `capacity`: The number of `Cookie` instances that the `CookieContainer` can hold.
- `perDomainCapacity`: The number of `Cookie` instances per domain.
- `maxCookieSize`: The maximum size in bytes for any single `Cookie` in a `CookieContainer`.

Exceptions:

- `ArgumentOutOfRangeException`: `perDomainCapacity` is not equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

and

`perDomainCapacity` is less than or equal to zero or greater than `capacity`.
- `ArgumentException`: `maxCookieSize` is less than or equal to zero.

#### Remarks
The parameters specify values for `CookieContainer.Capacity`, `CookieContainer.MaxCookieSize`, and `CookieContainer.PerDomainCapacity`.

## CookieContainer.Capacity property

```csharp
public int Capacity { get; set; }
```

Gets or sets the number of `Cookie` instances that a `CookieContainer` can hold.

Returns: The number of `Cookie` instances that a `CookieContainer` can hold. This is a hard limit and cannot be exceeded by adding a `Cookie`.

Exceptions:

- `ArgumentOutOfRangeException`: The capacity to set is less than or equal to zero or (value is less than `CookieContainer.PerDomainCapacity` and `CookieContainer.PerDomainCapacity` is not equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>).

#### Remarks
If `CookieContainer.Count` equals or exceeds `CookieContainer.Capacity`, one or more `Cookie` instances are removed from the container. Enough instances are removed to bring `CookieContainer.Count` below `CookieContainer.Capacity` as follows: if there are expired `Cookie` instances in scope, they are cleaned up. If not, then the least recently used `CookieCollection` is found and removed from the container.

`CookieContainer.Capacity` must be greater than or equal to `CookieContainer.PerDomainCapacity`.

## CookieContainer.Count property

```csharp
public int Count { get; }
```

Gets the number of `Cookie` instances that a `CookieContainer` currently holds.

Returns: The number of `Cookie` instances that a `CookieContainer` currently holds. This is the total of `Cookie` instances in all domains.

#### Remarks
The default value of this property is `DefaultCookieLimit`. If `CookieContainer.Count` equals or exceeds `CookieContainer.Capacity`, one or more `Cookie` instances are removed from the container. Enough instances are removed to bring `CookieContainer.Count` below `CookieContainer.Capacity` as follows: if there are expired `Cookie` instances in scope, they are cleaned up. If not, then the least recently used `CookieCollection` is found and removed from the container.

## CookieContainer.MaxCookieSize property

```csharp
public int MaxCookieSize { get; set; }
```

Represents the maximum allowed length of a `Cookie`.

Returns: The maximum allowed length, in bytes, of a `Cookie`.

Exceptions:

- `ArgumentOutOfRangeException`: The size to set is less than or equal to zero.

#### Remarks
If the new value of `CookieContainer.MaxCookieSize` is less than the current value, any `Cookie` with a length that exceeds the new value will be truncated.

## CookieContainer.PerDomainCapacity property

```csharp
public int PerDomainCapacity { get; set; }
```

Gets or sets the number of `Cookie` instances that a `CookieContainer` can hold per domain.

Returns: The number of `Cookie` instances that are allowed per domain.

Exceptions:

- `ArgumentOutOfRangeException`: The value to set is less than or equal to zero.

-or-

The value to set is greater than the maximum allowable number of cookies instances, 300, and is not equal to <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
If the new `CookieContainer.PerDomainCapacity` value is less than the current value, and if any of the domain collections contain more `Cookie` instances than the new value, the collections are pruned to fit. This uses the same basic rules as described in the `Capacity` property. However, this does the cleanup only on the collection for this domain.

## CookieContainer.Add(Cookie) method

```csharp
public void Add (System.Net.Cookie cookie);
```

Adds a `Cookie` to a `CookieContainer`. This method uses the domain from the `Cookie` to determine which domain collection to associate the `Cookie` with.

Parameters:

- `cookie`: The `Cookie` to be added to the `CookieContainer`.

Exceptions:

- `ArgumentNullException`: `cookie` is `null`.
- `ArgumentException`: The domain for `cookie` is `null` or the empty string ("").
- `CookieException`: `cookie` is larger than `maxCookieSize`.

-or-

the domain for `cookie` is not a valid URI.

#### Remarks
If the `Count` property equals or exceeds the `Capacity` property, one or more `Cookie` instances are removed from the container before adding the `cookie` parameter. Enough `Cookie` instances are removed to bring `CookieContainer.Count` below `CookieContainer.Capacity` as follows: if there are expired instances in the given scope, they are cleaned up. If not, then the least recently used `CookieCollection` is found and removed from the container.

## CookieContainer.Add(CookieCollection) method

```csharp
public void Add (System.Net.CookieCollection cookies);
```

Adds the contents of a `CookieCollection` to the `CookieContainer`.

Parameters:

- `cookies`: The `CookieCollection` to be added to the `CookieContainer`.

Exceptions:

- `ArgumentNullException`: `cookies` is `null`.

#### Remarks
If the `Count` property equals the `Capacity` property, one or more `Cookie` instances are removed from the container before adding the contents of the `cookies` parameter. Enough `Cookie` instances are removed to make room for `cookies` as follows: if there are expired instances, they are cleaned up. If not, or if more room is needed, then the least recently used `CookieCollection` is found and removed from the container.

## CookieContainer.Add(Uri, Cookie) method

```csharp
public void Add (Uri uri, System.Net.Cookie cookie);
```

Adds a `Cookie` to the `CookieContainer` for a particular URI.

Parameters:

- `uri`: The URI of the `Cookie` to be added to the `CookieContainer`.
- `cookie`: The `Cookie` to be added to the `CookieContainer`.

Exceptions:

- `ArgumentNullException`: `uri` is `null` or `cookie` is `null`.
- `CookieException`: `cookie` is larger than `maxCookieSize`.

-or-

The domain for `cookie` is not a valid URI.

#### Remarks
If you add a `Cookie` instance for just one specific host, do not set the `Domain` property of the `Cookie` instance. This is set automatically, based on the URI.

If your URI corresponds to your local domain and sends to all the hosts on the local domain, set the `Domain` property equal to ".local". Otherwise, make sure it matches the host name used in the URI.

If the `Version` property of a `Cookie` is Netscape, the `Path` property of the `Cookie`, if not set explicitly, is derived from the URI and is the complete path from the URI, including the page name.

If the `Count` property equals the `Capacity` property, one or more `Cookie` instances are removed from the container before adding the `cookie` parameter. Enough `Cookie` instances are removed to bring `CookieContainer.Count` below `CookieContainer.Capacity` as follows: if there are expired instances in scope, they are cleaned up. If not, then the least recently used `CookieCollection` is found and removed from the container.

## CookieContainer.Add(Uri, CookieCollection) method

```csharp
public void Add (Uri uri, System.Net.CookieCollection cookies);
```

Adds the contents of a `CookieCollection` to the `CookieContainer` for a particular URI.

Parameters:

- `uri`: The URI of the `CookieCollection` to be added to the `CookieContainer`.
- `cookies`: The `CookieCollection` to be added to the `CookieContainer`.

Exceptions:

- `ArgumentNullException`: `cookies` is `null`.
- `ArgumentException`: The domain for one of the cookies in `cookies` is `null`.
- `CookieException`: One of the cookies in `cookies` contains an invalid domain.

#### Remarks
If you add a `Cookie` instance for just one specific host, do not set the `Domain` property of the `Cookie` instance. This is set automatically, based on the URI.

If your URI corresponds to your local domain and sends to all the hosts on the local domain, set the `Cookie` `Domain` property equal to ".local". Otherwise, make sure it matches the host name used in the URI.

If `CookieContainer.Count` equals `CookieContainer.Capacity`, one or more `Cookie` instances is removed from the container before adding the `cookie` parameter. Enough `Cookie` instances are removed to bring `CookieContainer.Count` below `CookieContainer.Capacity` as follows: if there are expired instances in scope they are cleaned up. If not, then the least recently used `CookieCollection` is found and removed from the container.

## CookieContainer.GetAllCookies() method

```csharp
public System.Net.CookieCollection GetAllCookies ();
```

Gets a `CookieCollection` that contains all of the `Cookie` instances in the container.

Returns: A `CookieCollection` that contains all of the `Cookie` instances in the container.

To be added.

## CookieContainer.GetCookieHeader(Uri) method

```csharp
public string GetCookieHeader (Uri uri);
```

Gets the HTTP cookie header that contains the HTTP cookies that represent the `Cookie` instances that are associated with a specific URI.

Parameters:

- `uri`: The URI of the `Cookie` instances desired.

Returns: An HTTP cookie header, with strings representing `Cookie` instances delimited by semicolons.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.

#### Remarks
`CookieContainer.GetCookieHeader` returns a string that holds the HTTP cookie header for the `Cookie` instances specified by `uri`. The HTTP header is built by adding a string representation of each `Cookie` associated with `uri`. Note that the exact format of the string depends on the RFC that the `Cookie` conforms to. The strings for all the `Cookie` instances that are associated with `uri` are combined and delimited by semicolons.

This string is not in the correct format for use as the second parameter of the `CookieContainer.SetCookies` method.

## CookieContainer.GetCookies(Uri) method

```csharp
public System.Net.CookieCollection GetCookies (Uri uri);
```

Gets a `CookieCollection` that contains the `Cookie` instances that are associated with a specific URI.

Parameters:

- `uri`: The URI of the `Cookie` instances desired.

Returns: A `CookieCollection` that contains the `Cookie` instances that are associated with a specific URI.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.

#### Remarks
A new instance of a `CookieCollection` is created. Then the `Cookie` instances in the internal collection that are associated with the specified URI are read out and added to the new `CookieCollection`.
