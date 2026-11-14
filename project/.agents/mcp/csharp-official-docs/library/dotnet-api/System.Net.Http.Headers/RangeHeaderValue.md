---
title: "RangeHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/RangeHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RangeHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class RangeHeaderValue : ICloneable
```

Represents a Range header value.

#### Remarks
The `RangeHeaderValue` class provides support for the Range header as defined in RFC 2616 by the IETF.

Since all HTTP entities are represented in HTTP messages as sequences of bytes, the concept of a byte range is meaningful for any HTTP entity. However, not all clients and servers need to support byte-range operations.

The Range header on a request allows a client to request that it only wants to receive some part of the specified range of bytes in an HTTP entity. Servers are not required to support Range header requests.

An example of a Range header in an HTTP protocol request that requests the first 100 bytes would be would be the following:

`Range: bytes=0-99\r\n\r\n`

A HTTP server indicates support for Range headers with the Accept-Ranges header. An example of the Accept-Ranges header from a server that supports byte-ranges would be as follows:

`Accept-Ranges: bytes\r\n\r\n`

If an Accept-Ranges header is not received in the header of the response from the server, then the server does not support Range headers. An example of the Accept-Ranges header from a server that does not support ranges, but recognizes the Accept-Ranges header, would be as follows:

`Accept-Ranges: none\r\n\r\n`

## RangeHeaderValue.RangeHeaderValue() constructor

```csharp
public RangeHeaderValue ();
```

Initializes a new instance of the `RangeHeaderValue` class.

To be added.

## RangeHeaderValue.RangeHeaderValue(Int64>, Int64>) constructor

```csharp
public RangeHeaderValue (long? from, long? to);
```

Initializes a new instance of the `RangeHeaderValue` class with a byte range.

Parameters:

- `from`: The position at which to start sending data.
- `to`: The position at which to stop sending data.

Exceptions:

- `ArgumentOutOfRangeException`: `from` is greater than `to`

-or-

`from` or `to` is less than 0.

#### Remarks
This  constructor initializes a new instance of the `RangeHeaderValue` class with a Range header containing a specified byte range.

An example of a Range header with a byte range in an HTTP protocol request that requests the first 100 bytes would be would be the following:

`Range: bytes=0-99\r\n\r\n`

For this example, the `from` parameter would be specified as 0 and the `to` parameter would be specified as 99.

## RangeHeaderValue.Ranges property

```csharp
public System.Collections.Generic.ICollection<System.Net.Http.Headers.RangeItemHeaderValue> Ranges { get; }
```

Gets the ranges specified from the `RangeHeaderValue` object.

Returns: The ranges from the `RangeHeaderValue` object.

To be added.

## RangeHeaderValue.Unit property

```csharp
public string Unit { get; set; }
```

Gets the unit from the `RangeHeaderValue` object.

Returns: The unit from the `RangeHeaderValue` object.

To be added.

## RangeHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `RangeHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## RangeHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `RangeHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `RangeHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## RangeHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.RangeHeaderValue Parse (string input);
```

Converts a string to an `RangeHeaderValue` instance.

Parameters:

- `input`: A string that represents range header value information.

Returns: A `RangeHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid range header value information.

To be added.

## RangeHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `RangeHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `RangeHeaderValue` instance is cast to an `ICloneable` interface.

## RangeHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `RangeHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## RangeHeaderValue.TryParse(String, RangeHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.RangeHeaderValue? parsedValue);
```

Determines whether a string is valid `RangeHeaderValue` information.

Parameters:

- `input`: he string to validate.
- `parsedValue`: The `RangeHeaderValue` version of the string.

Returns: `true` if `input` is valid `AuthenticationHeaderValue` information; otherwise, `false`.

To be added.
