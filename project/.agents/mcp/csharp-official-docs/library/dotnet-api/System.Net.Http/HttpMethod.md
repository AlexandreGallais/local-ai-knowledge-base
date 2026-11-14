---
title: "HttpMethod class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpMethod.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpMethod class

Namespace: `System.Net.Http`

```csharp
public class HttpMethod : IEquatable<System.Net.Http.HttpMethod>
```

A helper class for retrieving and comparing standard HTTP methods and for creating new HTTP methods.

#### Remarks
The most common usage of `HttpMethod` is to use one of the static properties on this class.  However, if an app needs a different value for the HTTP method, the `HttpMethod.%23ctor` constructor initializes a new instance of the `HttpMethod` with an HTTP method that the app specifies.

## HttpMethod.HttpMethod(String) constructor

```csharp
public HttpMethod (string method);
```

Initializes a new instance of the `HttpMethod` class with a specific HTTP method.

Parameters:

- `method`: The HTTP method.

#### Remarks
If an app needs a different value for the HTTP method from one of the static properties, the `HttpMethod.%23ctor` constructor initializes a new instance of the `HttpMethod` with an HTTP method that the app specifies.

## HttpMethod.Connect property

```csharp
public static System.Net.Http.HttpMethod Connect { get; }
```

Gets the HTTP CONNECT protocol method.

Returns: The HTTP CONNECT method.

To be added.

## HttpMethod.Delete property

```csharp
public static System.Net.Http.HttpMethod Delete { get; }
```

Represents an HTTP DELETE protocol method.

Returns: The HTTP DELETE method.

To be added.

## HttpMethod.Get property

```csharp
public static System.Net.Http.HttpMethod Get { get; }
```

Represents an HTTP GET protocol method.

Returns: The HTTP GET method.

To be added.

## HttpMethod.Head property

```csharp
public static System.Net.Http.HttpMethod Head { get; }
```

Represents an HTTP HEAD protocol method. The HEAD method is identical to GET except that the server only returns message-headers in the response, without a message-body.

Returns: The HTTP HEAD method.

To be added.

## HttpMethod.Method property

```csharp
public string Method { get; }
```

Gets an HTTP method.

Returns: An HTTP method represented as a `String`.

To be added.

## HttpMethod.Options property

```csharp
public static System.Net.Http.HttpMethod Options { get; }
```

Represents an HTTP OPTIONS protocol method.

Returns: The HTTP OPTIONS method.

To be added.

## HttpMethod.Patch property

```csharp
public static System.Net.Http.HttpMethod Patch { get; }
```

Gets the HTTP PATCH protocol method.

Returns: The HTTP PATCH protocol method.

To be added.

## HttpMethod.Post property

```csharp
public static System.Net.Http.HttpMethod Post { get; }
```

Represents an HTTP POST protocol method that is used to post a new entity as an addition to a URI.

Returns: The HTTP POST method.

To be added.

## HttpMethod.Put property

```csharp
public static System.Net.Http.HttpMethod Put { get; }
```

Represents an HTTP PUT protocol method that is used to replace an entity identified by a URI.

Returns: The HTTP PUT method.

To be added.

## HttpMethod.Query property

```csharp
public static System.Net.Http.HttpMethod Query { get; }
```

Gets the HTTP QUERY protocol method.

Returns: The HTTP QUERY method.

To be added.

## HttpMethod.Trace property

```csharp
public static System.Net.Http.HttpMethod Trace { get; }
```

Represents an HTTP TRACE protocol method.

Returns: The HTTP TRACE method.

To be added.

## HttpMethod.Equals(HttpMethod) method

```csharp
public bool Equals (System.Net.Http.HttpMethod? other);
```

Determines whether the specified `HttpMethod` is equal to the current `Object`.

Parameters:

- `other`: The HTTP method to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

To be added.

## HttpMethod.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `Object`.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified object is equal to the current object; otherwise, `false`.

To be added.

## HttpMethod.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for this type.

Returns: A hash code for the current `Object`.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection. The `HttpMethod.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## HttpMethod.op_Equality(HttpMethod, HttpMethod) method

```csharp
public static bool operator == (System.Net.Http.HttpMethod? left, System.Net.Http.HttpMethod? right);
```

The equality operator for comparing two `HttpMethod` objects.

Parameters:

- `left`: The left `HttpMethod` to an equality operator.
- `right`: The right  `HttpMethod` to an equality operator.

Returns: `true` if the specified `left` and `right` parameters are equal; otherwise, `false`.

To be added.

## HttpMethod.op_Inequality(HttpMethod, HttpMethod) method

```csharp
public static bool operator != (System.Net.Http.HttpMethod? left, System.Net.Http.HttpMethod? right);
```

The inequality operator for comparing two `HttpMethod` objects.

Parameters:

- `left`: The left `HttpMethod` to an inequality operator.
- `right`: The right  `HttpMethod` to an inequality operator.

Returns: `true` if the specified `left` and `right` parameters are inequal; otherwise, `false`.

To be added.

## HttpMethod.Parse(Char>) method

```csharp
public static System.Net.Http.HttpMethod Parse (ReadOnlySpan<char> method);
```

Parses the provided `method` into an `HttpMethod` instance.

Parameters:

- `method`: The method to parse.

Returns: An `HttpMethod` instance for the provided `method`.

This method may return a singleton instance for known methods; for example, it may return `HttpMethod.Get` if "GET" is specified. The parsing is performed in a case-insensitive manner, so it may also return `HttpMethod.Get` if "get" is specified. For unknown methods, a new `HttpMethod` instance is returned, with the same validation being performed as by the `HttpMethod.#ctor` constructor.

## HttpMethod.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string representing the current object.

To be added.
