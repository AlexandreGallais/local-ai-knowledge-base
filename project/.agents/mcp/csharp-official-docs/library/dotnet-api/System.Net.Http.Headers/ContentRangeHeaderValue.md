---
title: "ContentRangeHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/ContentRangeHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContentRangeHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class ContentRangeHeaderValue : ICloneable
```

Represents the value of the Content-Range header.

To be added.

## ContentRangeHeaderValue.ContentRangeHeaderValue(Int64) constructor

```csharp
public ContentRangeHeaderValue (long length);
```

Initializes a new instance of the `ContentRangeHeaderValue` class.

Parameters:

- `length`: The starting or ending point of the range, in bytes.

To be added.

## ContentRangeHeaderValue.ContentRangeHeaderValue(Int64, Int64) constructor

```csharp
public ContentRangeHeaderValue (long from, long to);
```

Initializes a new instance of the `ContentRangeHeaderValue` class.

Parameters:

- `from`: The position, in bytes, at which to start sending data.
- `to`: The position, in bytes, at which to stop sending data.

To be added.

## ContentRangeHeaderValue.ContentRangeHeaderValue(Int64, Int64, Int64) constructor

```csharp
public ContentRangeHeaderValue (long from, long to, long length);
```

Initializes a new instance of the `ContentRangeHeaderValue` class.

Parameters:

- `from`: The position, in bytes, at which to start sending data.
- `to`: The position, in bytes, at which to stop sending data.
- `length`: The starting or ending point of the range, in bytes.

To be added.

## ContentRangeHeaderValue.From property

```csharp
public long? From { get; }
```

Gets the position at which to start sending data.

Returns: The position, in bytes, at which to start sending data.

To be added.

## ContentRangeHeaderValue.HasLength property

```csharp
public bool HasLength { get; }
```

Gets whether the Content-Range header has a length specified.

Returns: `true` if the Content-Range has a length specified; otherwise, `false`.

To be added.

## ContentRangeHeaderValue.HasRange property

```csharp
public bool HasRange { get; }
```

Gets whether the Content-Range has a range specified.

Returns: `true` if the Content-Range has a range specified; otherwise, `false`.

To be added.

## ContentRangeHeaderValue.Length property

```csharp
public long? Length { get; }
```

Gets the length of the full entity-body.

Returns: The length of the full entity-body.

To be added.

## ContentRangeHeaderValue.To property

```csharp
public long? To { get; }
```

Gets the position at which to stop sending data.

Returns: The position at which to stop sending data.

To be added.

## ContentRangeHeaderValue.Unit property

```csharp
public string Unit { get; set; }
```

Gets or sets the range units used.

Returns: A `String` that contains range units.

#### Remarks
The only range unit defined by HTTP/1.1 is "bytes".

## ContentRangeHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified Object is equal to the current `ContentRangeHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## ContentRangeHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `ContentRangeHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `ContentRangeHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## ContentRangeHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.ContentRangeHeaderValue Parse (string input);
```

Converts a string to an `ContentRangeHeaderValue` instance.

Parameters:

- `input`: A string that represents content range header value information.

Returns: An `ContentRangeHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid content range header value information.

To be added.

## ContentRangeHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `ContentRangeHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ContentRangeHeaderValue` instance is cast to an `ICloneable` interface.

## ContentRangeHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `ContentRangeHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## ContentRangeHeaderValue.TryParse(String, ContentRangeHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.ContentRangeHeaderValue? parsedValue);
```

Determines whether a string is valid `ContentRangeHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `ContentRangeHeaderValue` version of the string.

Returns: `true` if `input` is valid `ContentRangeHeaderValue` information; otherwise, `false`.

To be added.
