---
title: "HttpListenerPrefixCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/HttpListenerPrefixCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpListenerPrefixCollection class

Namespace: `System.Net`

```csharp
public class HttpListenerPrefixCollection : System.Collections.Generic.ICollection<string>, System.Collections.Generic.IEnumerable<string>
```

Represents the collection used to store Uniform Resource Identifier (URI) prefixes for `HttpListener` objects.

#### Remarks

The `Prefixes` property returns instances of this collection.

#### Examples
The following code example creates an `HttpListener` and adds user-specified prefixes to its `HttpListenerPrefixCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of prefixes contained in the collection.

Returns: An `Int32` that contains the number of prefixes in this collection.

#### Examples
The following code example displays the prefixes in a collection.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether access to the collection is read-only.

Returns: Always returns `false`.

To be added.

## HttpListenerPrefixCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to the collection is synchronized (thread-safe).

Returns: This property always returns `false`.

#### Remarks
Enumerating through a collection is intrinsically not a thread-safe procedure. Even when a collection is synchronized, other threads can still modify the collection, which causes the enumerator to throw an exception. To guarantee thread safety during enumeration, you can either lock the collection during the entire enumeration or catch the exceptions that result from changes made by other threads.

## HttpListenerPrefixCollection.Add(String) method

```csharp
public void Add (string uriPrefix);
```

Adds a Uniform Resource Identifier (URI) prefix to the collection.

Parameters:

- `uriPrefix`: A `String` that identifies the URI information that is compared in incoming requests. The prefix must be terminated with a forward slash ("/").

Exceptions:

- `ArgumentNullException`: `uriPrefix` is `null`.
- `ArgumentException`: `uriPrefix` does not use the http:// or https:// scheme. These are the only schemes supported for `HttpListener` objects.

-or-

`uriPrefix` is not a correctly formatted URI prefix. Make sure the string is terminated with a "/".
- `ObjectDisposedException`: The `HttpListener` associated with this collection is closed.
- `HttpListenerException`: A Windows function call failed. Check the exception's `HttpListenerException.ErrorCode` property to determine the cause of the exception. This exception is thrown if another `HttpListener` has already added the prefix `uriPrefix`.

#### Remarks
This method adds a URI prefix to the set of prefixes managed by the associated `HttpListener` object. When checking `uriPrefix` to ensure it is valid, case is ignored.

A URI prefix string is composed of a scheme (http or https), a host, an optional port, and an optional path, for example, "`http://www.contoso.com:8080/customerData/`". The prefix must be terminated with a forward slash ("/"). The `HttpListener` with the prefix that most closely matches a requested URI responds to the request. Multiple `HttpListener` objects cannot add the same prefix. An `HttpListenerException` exception is thrown if an `HttpListener` adds a prefix that is already in use.

When a port is specified, the host element can be replaced with "`*`" to indicate that the `HttpListener` accepts requests sent to the port if the requested URI does not match any other prefix. For example, to receive all requests sent to port 8080 when the requested URI is not handled by any other `HttpListener`, the prefix is "`http://*:8080/`". Similarly, to specify that the `HttpListener` accepts all requests sent to a port, replace the host element with the "`+`" character, "`https://+:8080/`". The "`*`" and "`+`" characters can be present in prefixes that include paths.

Starting with .NET 4.5.3 and Windows 10, wildcard subdomains are supported in URI prefixes that are managed by an `HttpListener` object. To specify a wildcard subdomain, use the "\*" character as part of the hostname in a URI prefix: for example, `http://*.foo.com/`, and pass this as the argument to the HttpListenerPrefixCollection.Add method. This will work on .NET 4.5.3 and Windows 10; in earlier versions, this would generate an `HttpListenerException`

#### Examples
The following code example creates an `HttpListener` and adds user-specified prefixes to its `HttpListenerPrefixCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.Clear() method

```csharp
public void Clear ();
```

Removes all the Uniform Resource Identifier (URI) prefixes from the collection.

Exceptions:

- `HttpListenerException`: A Windows function call failed. Check the exception's `HttpListenerException.ErrorCode` property to determine the cause of the exception.
- `ObjectDisposedException`: The `HttpListener` associated with this collection is closed.

#### Remarks
After calling this method, you cannot start the associated `HttpListener` without adding new prefixes; if you try to do so, an exception is thrown.

#### Examples
The following code example removes all prefixes in an `HttpListenerPrefixCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.Contains(String) method

```csharp
public bool Contains (string uriPrefix);
```

Returns a `Boolean` value that indicates whether the specified prefix is contained in the collection.

Parameters:

- `uriPrefix`: A `String` that contains the Uniform Resource Identifier (URI) prefix to test.

Returns: `true` if this collection contains the prefix specified by `uriPrefix`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `uriPrefix` is `null`.

#### Remarks
The specified prefix must exactly match an existing value.

#### Examples
The following code example checks to see whether a user-specified prefix is contained in the prefix collection of an `HttpListener`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int offset);
```

Copies the contents of an `HttpListenerPrefixCollection` to the specified array.

Parameters:

- `array`: The one dimensional `Array` that receives the Uniform Resource Identifier (URI) prefix strings in this collection.
- `offset`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentException`: `array` has more than one dimension.
- `ArgumentOutOfRangeException`: This collection contains more elements than can be stored in `array` starting at `offset`.
- `ObjectDisposedException`: The `HttpListener` associated with this collection is closed.
- `InvalidCastException`: `array` cannot store string values.

#### Remarks
The array must be able to contain strings and cannot be multidimensional.

#### Examples
The following code example copies the prefixes in a `HttpListenerPrefixCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.CopyTo(String[], Int32) method

```csharp
public void CopyTo (string[] array, int offset);
```

Copies the contents of an `HttpListenerPrefixCollection` to the specified string array.

Parameters:

- `array`: The one dimensional string array that receives the Uniform Resource Identifier (URI) prefix strings in this collection.
- `offset`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentException`: `array` has more than one dimension.
- `ArgumentOutOfRangeException`: This collection contains more elements than can be stored in `array` starting at `offset`.
- `ObjectDisposedException`: The `HttpListener` associated with this collection is closed.

#### Remarks
The array must be able to contain strings and cannot be multidimensional.

#### Examples
The following code example copies the prefixes in a `HttpListenerPrefixCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<string> GetEnumerator ();
```

Returns an object that can be used to iterate through the collection.

Returns: An object that implements the `IEnumerator` interface and provides access to the strings in this collection.

#### Remarks
The object that is returned by this method is initially positioned before the first element in this collection. You must call the `IEnumerator.MoveNext` method before you can access the first element. To access the element at the current position, call the `Current` property.

Do not modify the collection while using the enumerator. If the collection is modified while an enumerator is in use, an attempt to set the position by calling `IEnumerator.MoveNext` or `IEnumerator.Reset` causes an `InvalidOperationException`.

For a detailed description of enumerators, see the documentation for the `IEnumerator` class and the `IEnumerable.GetEnumerator` method.

#### Examples
The following code example demonstrates enumerating through a collection. Note that the Visual Basic and C# examples use language specific statements to enumerate through the collection instead of retrieving the enumerator.

_Code sample not included: ~/snippets/csharp/System.Net/HttpListener/Overview/test.cs._

## HttpListenerPrefixCollection.Remove(String) method

```csharp
public bool Remove (string uriPrefix);
```

Removes the specified Uniform Resource Identifier (URI) from the list of prefixes handled by the `HttpListener` object.

Parameters:

- `uriPrefix`: A `String` that contains the URI prefix to remove.

Returns: `true` if the `uriPrefix` was found in the `HttpListenerPrefixCollection` and removed; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `uriPrefix` is `null`.
- `HttpListenerException`: A Windows function call failed. To determine the cause of the exception, check the exception's error code.
- `ObjectDisposedException`: The `HttpListener` associated with this collection is closed.

#### Remarks
If `uriPrefix` is not in the collection, this method does nothing.

## HttpListenerPrefixCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an object that can be used to iterate through the collection.

Returns: An object that implements the `IEnumerator` interface and provides access to the strings in this collection.

#### Remarks
The object that is returned by this method is initially positioned before the first element in this collection. You must call the `IEnumerator.MoveNext` method before you can access the first element. To access the element at the current position, call the `Current` property.

Do not modify the collection while using the enumerator. If the collection is modified while an enumerator is in use, an attempt to set the position by calling `IEnumerator.MoveNext` or `IEnumerator.Reset` causes an `InvalidOperationException`.

For a detailed description of enumerators, see the documentation for the `IEnumerator` class and the `IEnumerable.GetEnumerator` method.
