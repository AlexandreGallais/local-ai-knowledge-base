---
title: "WebHeaderCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/WebHeaderCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# WebHeaderCollection class

Namespace: `System.Net`

```csharp
public class WebHeaderCollection : System.Collections.Specialized.NameValueCollection, System.Runtime.Serialization.ISerializable
```

Contains protocol headers associated with a request or response.

#### Remarks

The `WebHeaderCollection` class is generally accessed through `WebRequest.Headers` or `WebResponse.Headers`.

## WebHeaderCollection.WebHeaderCollection() constructor

```csharp
public WebHeaderCollection ();
```

Initializes a new instance of the `WebHeaderCollection` class.

To be added.

## WebHeaderCollection.WebHeaderCollection(SerializationInfo, StreamingContext) constructor

```csharp
protected WebHeaderCollection (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Initializes a new instance of the `WebHeaderCollection` class from the specified instances of the `SerializationInfo` and `StreamingContext` classes.

Parameters:

- `serializationInfo`: A `SerializationInfo` containing the information required to serialize the `WebHeaderCollection`.
- `streamingContext`: A `StreamingContext` containing the source of the serialized stream associated with the new `WebHeaderCollection`.

Exceptions:

- `ArgumentException`: The header name contains invalid characters.
- `ArgumentNullException`: The header name is a null reference or `String.Empty`.

To be added.

## WebHeaderCollection.AllKeys property

```csharp
public override string[] AllKeys { get; }
```

Gets all header names (keys) in the collection.

Returns: An array of type `String` containing all header names in a Web request.

#### Examples
The following code example uses the `AllKeys` property to get the header names a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/AllKeys/webheadercollection_newprops.cs._
## WebHeaderCollection.Count property

```csharp
public override int Count { get; }
```

Gets the number of headers in the collection.

Returns: An `Int32` indicating the number of headers in a request.

#### Examples
The following code example uses the `Count` property to iterate through a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/AllKeys/webheadercollection_newprops.cs._
## WebHeaderCollection.Item property

```csharp
public string? this[System.Net.HttpRequestHeader header] { get; set; }
```

Gets or sets the specified request header.

Parameters:

- `header`: The request header value.

Returns: A `String` instance containing the specified header value.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpRequestHeader`.

To be added.

## WebHeaderCollection.Item property

```csharp
public string? this[System.Net.HttpResponseHeader header] { get; set; }
```

Gets or sets the specified response header.

Parameters:

- `header`: The response header value.

Returns: A `String` instance containing the specified header.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpResponseHeader`.

#### Remarks

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.Keys property

```csharp
public override System.Collections.Specialized.NameObjectCollectionBase.KeysCollection Keys { get; }
```

Gets the collection of header names (keys) in the collection.

Returns: A `KeysCollection` containing all header names in a Web request.

To be added.

## WebHeaderCollection.Add(String) method

```csharp
public void Add (string header);
```

Inserts the specified header into the collection.

Parameters:

- `header`: The header to add, with the name and value separated by a colon.

Exceptions:

- `ArgumentNullException`: `header` is `null` or `String.Empty`.
- `ArgumentException`: `header` does not contain a colon (:) character.

-or-

The length of the value portion of `header` is greater than 65535.

-or-

The name part of `header` is `String.Empty` or contains invalid characters.

-or-

`header` is a restricted header that should be set with a property.

-or-

The value part of `header` contains invalid characters.

#### Remarks
The `header` parameter must be specified in the format "name:value". If the specified header does not exist in the collection, a new header is added to the collection.

If the header specified in `header` is already present in the collection, the value part of the `header` is concatenated with the existing value.

#### Examples
The following example adds a name/value pair to a `WebHeaderCollection` using the `WebHeaderCollection.Add` Method.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/Add/webheadercollection_add.cs._

> **Note:**
> `WebHeaderCollection` accepts a *value* of any length.

## WebHeaderCollection.Add(HttpRequestHeader, String) method

```csharp
public void Add (System.Net.HttpRequestHeader header, string? value);
```

Inserts the specified header with the specified value into the collection.

Parameters:

- `header`: The header to add to the collection.
- `value`: The content of the header.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpRequestHeader`.

#### Remarks
If the specified header does not exist, the `WebHeaderCollection.Add` method inserts a new header into the list of header name/value pairs.

If the specified header is already present, `value` is added to the comma-separated list of values associated with the header.

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.Add(HttpResponseHeader, String) method

```csharp
public void Add (System.Net.HttpResponseHeader header, string? value);
```

Inserts the specified header with the specified value into the collection.

Parameters:

- `header`: The header to add to the collection.
- `value`: The content of the header.

Exceptions:

- `InvalidOperationException`: This `WebHeaderCollection` instance does not allow instances of `HttpResponseHeader`.

#### Remarks
If the specified header does not exist, the `WebHeaderCollection.Add` method inserts a new header into the list of header name/value pairs.

If the specified header is already present, `value` is added to the comma-separated list of values associated with the header.

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.Add(String, String) method

```csharp
public override void Add (string name, string? value);
```

Inserts a header with the specified name and value into the collection.

Parameters:

- `name`: The header to add to the collection.
- `value`: The content of the header.

Exceptions:

- `ArgumentException`: `name` is `null`, `String.Empty`, or contains invalid characters.

-or-

`name` is a restricted header that must be set with a property setting.

-or-

`value` contains invalid characters.

#### Remarks
If the header specified in `name` does not exist, the `WebHeaderCollection.Add` method inserts a new header into the list of header name/value pairs.

If the header specified in `name` is already present, `value` is added to the existing comma-separated list of values associated with `name`.

#### Examples
The following example adds a name/value pair to a `WebHeaderCollection` using the `WebHeaderCollection.Add` Method.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/Add/webheadercollection_add.cs._

> **Note:**
> `WebHeaderCollection` accepts a `value` of any length.

## WebHeaderCollection.AddWithoutValidate(String, String) method

```csharp
protected void AddWithoutValidate (string headerName, string? headerValue);
```

Inserts a header into the collection without checking whether the header is on the restricted header list.

Parameters:

- `headerName`: The header to add to the collection.
- `headerValue`: The content of the header.

Exceptions:

- `ArgumentException`: `headerName` is `null`, `String.Empty`, or contains invalid characters.

-or-

`headerValue` contains invalid characters.

#### Remarks
The `WebHeaderCollection.AddWithoutValidate` method adds a header to the collection without checking whether the header is on the restricted header list.

> **Note:**
> `WebHeaderCollection` accepts a `headerValue` of any length.

## WebHeaderCollection.Clear() method

```csharp
public override void Clear ();
```

Removes all headers from the collection.

#### Examples
The following code example clears the headers in a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/AllKeys/webheadercollection_newprops.cs._
## WebHeaderCollection.Get(Int32) method

```csharp
public override string? Get (int index);
```

Gets the value of a particular header in the collection, specified by an index into the collection.

Parameters:

- `index`: The zero-based index of the key to get from the collection.

Returns: A `String` containing the value of the specified header.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is negative.

-or-

`index` exceeds the size of the collection.

#### Examples
The following code example uses the `WebHeaderCollection.Get` method to retrieve a header value in a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/AllKeys/webheadercollection_newprops.cs._
## WebHeaderCollection.Get(String) method

```csharp
public override string? Get (string? name);
```

Gets the value of a particular header in the collection, specified by the name of the header.

Parameters:

- `name`: The name of the Web header.

Returns: A `String` holding the value of the specified header.

#### Remarks
This method returns `null` if there is no `name` header in the collection.

#### Examples
The following code example uses the `WebHeaderCollection.Get` property to retrieve header values in a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/AllKeys/webheadercollection_newprops.cs._
## WebHeaderCollection.GetEnumerator() method

```csharp
public override System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator that can iterate through the `WebHeaderCollection` instance.

Returns: An `IEnumerator` for the `WebHeaderCollection`.

To be added.

## WebHeaderCollection.GetKey(Int32) method

```csharp
public override string GetKey (int index);
```

Gets the header name at the specified position in the collection.

Parameters:

- `index`: The zero-based index of the key to get from the collection.

Returns: A `String` holding the header name.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is negative.

-or-

`index` exceeds the size of the collection.

#### Examples
The following code example uses `WebHeaderCollection.GetKey` to get a header name in a `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/AllKeys/webheadercollection_newprops.cs._
## WebHeaderCollection.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Populates a `SerializationInfo` with the data needed to serialize the target object.

Parameters:

- `serializationInfo`: The `SerializationInfo` to populate with data.
- `streamingContext`: A `StreamingContext` that specifies the destination for this serialization.

To be added.

## WebHeaderCollection.GetValues(Int32) method

```csharp
public override string[]? GetValues (int index);
```

Gets an array of header values stored in the `index` position of the header collection.

Parameters:

- `index`: The header index to return.

Returns: An array of header strings.

#### Remarks
`WebHeaderCollection.GetValues` returns the contents of the specified header as an array.

## WebHeaderCollection.GetValues(String) method

```csharp
public override string[]? GetValues (string header);
```

Gets an array of header values stored in a header.

Parameters:

- `header`: The header to return.

Returns: An array of header strings.

#### Remarks
`WebHeaderCollection.GetValues` returns the contents of the specified header as an array.

#### Examples
The following example uses the `WebHeaderCollection.GetValues` method to retrieve an array of values for each header in the `WebHeaderCollection`.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/GetValues/webheadercollection_getvalues_1.cs._

## WebHeaderCollection.IsRestricted(String) method

```csharp
public static bool IsRestricted (string headerName);
```

Tests whether the specified HTTP header can be set for the request.

Parameters:

- `headerName`: The header to test.

Returns: `true` if the header is restricted; otherwise `false`.

Exceptions:

- `ArgumentNullException`: `headerName` is `null` or `String.Empty`.
- `ArgumentException`: `headerName` contains invalid characters.

#### Remarks
The `WebHeaderCollection.IsRestricted` method returns `true` to indicate that a header is restricted and must be set using properties instead of directly or is set by the system. The restricted headers are:

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
The following example checks the `WebHeaderCollection.IsRestricted` property to see if any headers are prohibited from being set.

_Code sample not included: ~/snippets/csharp/System.Net/WebHeaderCollection/IsRestricted/webheadercollection_isrestricted.cs._
