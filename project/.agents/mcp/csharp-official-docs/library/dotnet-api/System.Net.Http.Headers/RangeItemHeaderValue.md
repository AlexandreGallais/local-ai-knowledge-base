---
title: "RangeItemHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/RangeItemHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RangeItemHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class RangeItemHeaderValue : ICloneable
```

Represents a byte range in a Range header value.

#### Remarks
The `RangeHeaderValue` class provides support for a byte range in a Range header as defined in RFC 2616 by the IETF.

A Range header can specify multiple byte ranges.

An example of a byte-range in a Range header in an HTTP protocol request that requests the first 100 bytes would be would be the following:

`Range: bytes=0-99\r\n\r\n`

A HTTP server indicates support for Range headers with the Accept-Ranges header. An example of the Accept-Ranges header from a server that supports byte-ranges would be as follows:

`Accept-Ranges: bytes\r\n\r\n`

If an Accept-Ranges header is not received in the header of the response from the server, then the server does not support Range headers. An example of the Accept-Ranges header from a server that does not support ranges, but recognizes the Accept-Ranges header, would be as follows:

`Accept-Ranges: none\r\n\r\n`

## RangeItemHeaderValue.RangeItemHeaderValue(Int64>, Int64>) constructor

```csharp
public RangeItemHeaderValue (long? from, long? to);
```

Initializes a new instance of the `RangeItemHeaderValue` class.

Parameters:

- `from`: The position at which to start sending data.
- `to`: The position at which to stop sending data.

Exceptions:

- `ArgumentOutOfRangeException`: `from` is greater than `to`

-or-

`from` or `to` is less than 0.

#### Remarks
An example of a byte-range in a Range header in an HTTP protocol request that requests the first 100 bytes would be would be the following:

`Range: bytes=0-99\r\n\r\n`

For this example, the `from` parameter would be specified as 0 and the `to` parameter would be specified as 99.

## RangeItemHeaderValue.From property

```csharp
public long? From { get; }
```

Gets the position at which to start sending data.

Returns: The position at which to start sending data.

To be added.

## RangeItemHeaderValue.To property

```csharp
public long? To { get; }
```

Gets the position at which to stop sending data.

Returns: The position at which to stop sending data.

To be added.

## RangeItemHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `RangeItemHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## RangeItemHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `RangeItemHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `RangeItemHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## RangeItemHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `RangeItemHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `RangeItemHeaderValue` instance is cast to an `ICloneable` interface.

## RangeItemHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `RangeItemHeaderValue` object.

Returns: A string that represents the current object.

To be added.
