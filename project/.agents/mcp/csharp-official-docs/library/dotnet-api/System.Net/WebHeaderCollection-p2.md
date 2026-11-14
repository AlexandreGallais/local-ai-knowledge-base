---
title: "WebHeaderCollection class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebHeaderCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebHeaderCollection class (part 2 of 2)

## WebHeaderCollection.IsRestricted(String, Boolean) method

```csharp
public static bool IsRestricted (string headerName, bool response);
```

Tests whether the specified HTTP header can be set for the request or the response.

Parameters:

- `headerName`: The header to test.
- `response`: `true` to test the response; `false` to test the request.

Returns: `true` if the header is restricted; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `headerName` is `null` or `String.Empty`.
- `ArgumentException`: `headerName` contains invalid characters.

#### Remarks
The `WebHeaderCollection.IsRestricted` method returns `true` to indicate that a request or response header is restricted and must be set using properties instead of directly or is set by the system. The restricted headers are:

- Accept

- Connection

- Content-Length

- Content-Type

- Date

- Expect

- Host

- If-Modified-Since

- Range

- Referer

- Transfer-Encoding

- User-Agent

- Proxy-Connection

#### Examples
The following example checks the `WebHeaderCollection.IsRestricted` property to see if any request headers are prohibited from being set.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/IsRestricted/webheadercollection_isrestricted.cs._

## WebHeaderCollection.OnDeserialization(Object) method

```csharp
public override void OnDeserialization (object? sender);
```

Implements the `ISerializable` interface and raises the deserialization event when the deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

To be added.

## WebHeaderCollection.Remove(HttpRequestHeader) method

```csharp
public void Remove (System.Net.HttpRequestHeader header);
```

Removes the specified header from the collection.

Parameters:

- `header`: The `HttpRequestHeader` instance to remove from the collection.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpRequestHeader`.

#### Remarks
`WebHeaderCollection.Remove` deletes the specified header from the collection. If the specified header does not exist, the method does nothing.

## WebHeaderCollection.Remove(HttpResponseHeader) method

```csharp
public void Remove (System.Net.HttpResponseHeader header);
```

Removes the specified header from the collection.

Parameters:

- `header`: The `HttpResponseHeader` instance to remove from the collection.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpResponseHeader`.

#### Remarks
`WebHeaderCollection.Remove` deletes the specified header from the collection. If the specified header does not exist, the method does nothing.

## WebHeaderCollection.Remove(String) method

```csharp
public override void Remove (string name);
```

Removes the specified header from the collection.

Parameters:

- `name`: The name of the header to remove from the collection.

Exceptions:

- `ArgumentNullException`: `name` is `null``String.Empty`.
- `ArgumentException`: `name` is a restricted header.

-or-

`name` contains invalid characters.

#### Remarks
`WebHeaderCollection.Remove` deletes the specified header from the collection. If the specified header does not exist, the method returns.

#### Examples
The following example uses the `WebHeaderCollection.Remove` method to remove a header from the `WebHeaderCollection`. After the header is removed, this example prints all existing headers to the screen to prove that it has been removed.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/Remove/webheadercollection_remove.cs._

## WebHeaderCollection.Set(HttpRequestHeader, String) method

```csharp
public void Set (System.Net.HttpRequestHeader header, string? value);
```

Sets the specified header to the specified value.

Parameters:

- `header`: The `HttpRequestHeader` value to set.
- `value`: The content of the header to set.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpRequestHeader`.

#### Remarks
If the header specified in the header does not exist, the `WebHeaderCollection.Set` method inserts a new header into the list of header name/value pairs.

If the header specified in `header` is already present, `value` replaces the existing value.

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.Set(HttpResponseHeader, String) method

```csharp
public void Set (System.Net.HttpResponseHeader header, string? value);
```

Sets the specified header to the specified value.

Parameters:

- `header`: The `HttpResponseHeader` value to set.
- `value`: The content of the header to set.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpResponseHeader`.

#### Remarks
If the header specified in the header does not exist, the `WebHeaderCollection.Set` method inserts a new header into the list of header name/value pairs.

If the header specified in `header` is already present, `value` replaces the existing value.

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.Set(String, String) method

```csharp
public override void Set (string name, string? value);
```

Sets the specified header to the specified value.

Parameters:

- `name`: The header to set.
- `value`: The content of the header to set.

Exceptions:

- `ArgumentNullException`: `name` is `null` or `String.Empty`.
- `ArgumentException`: `name` is a restricted header.

-or-

`name` or `value` contain invalid characters.

#### Remarks
If the header specified in the header does not exist, the `WebHeaderCollection.Set` method inserts a new header into the list of header name/value pairs.

If the header specified in `header` is already present, `value` replaces the existing value.

#### Examples
The following example uses the `WebHeaderCollection.Set` method to set the value of an existing header.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/Set/webheadercollection_set.cs._

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Serializes this instance into the specified `SerializationInfo` object.

Parameters:

- `serializationInfo`: The object into which this `WebHeaderCollection` will be serialized.
- `streamingContext`: The destination of the serialization.

To be added.

## WebHeaderCollection.ToByteArray() method

```csharp
public byte[] ToByteArray ();
```

Converts the `WebHeaderCollection` to a byte array.

Returns: A `Byte` array holding the header collection.

To be added.

## WebHeaderCollection.ToString() method

```csharp
public override string ToString ();
```

This method is obsolete.

Returns: The `String` representation of the collection.

To be added.
