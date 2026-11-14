---
title: "TransferCodingHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/TransferCodingHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransferCodingHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class TransferCodingHeaderValue : ICloneable
```

Represents an accept-encoding header value.

#### Remarks
The `TransferCodingHeaderValue` class provides support for the Accept-Encoding header as defined in RFC 2616 by the IETF.

## TransferCodingHeaderValue.TransferCodingHeaderValue(TransferCodingHeaderValue) constructor

```csharp
protected TransferCodingHeaderValue (System.Net.Http.Headers.TransferCodingHeaderValue source);
```

Initializes a new instance of the `TransferCodingHeaderValue` class.

Parameters:

- `source`: A `TransferCodingHeaderValue` object used to initialize the new instance.

To be added.

## TransferCodingHeaderValue.TransferCodingHeaderValue(String) constructor

```csharp
public TransferCodingHeaderValue (string value);
```

Initializes a new instance of the `TransferCodingHeaderValue` class.

Parameters:

- `value`: A string used to initialize the new instance.

To be added.

## TransferCodingHeaderValue.Parameters property

```csharp
public System.Collections.Generic.ICollection<System.Net.Http.Headers.NameValueHeaderValue> Parameters { get; }
```

Gets the transfer-coding parameters.

Returns: The transfer-coding parameters.

To be added.

## TransferCodingHeaderValue.Value property

```csharp
public string Value { get; }
```

Gets the transfer-coding value.

Returns: The transfer-coding value.

To be added.

## TransferCodingHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified Object is equal to the current `TransferCodingHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## TransferCodingHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `TransferCodingHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `TransferCodingHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## TransferCodingHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.TransferCodingHeaderValue Parse (string input);
```

Converts a string to an `TransferCodingHeaderValue` instance.

Parameters:

- `input`: A string that represents transfer-coding header value information.

Returns: A `TransferCodingHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid transfer-coding header value information.

To be added.

## TransferCodingHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `TransferCodingHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `TransferCodingHeaderValue` instance is cast to an `ICloneable` interface.

## TransferCodingHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `TransferCodingHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## TransferCodingHeaderValue.TryParse(String, TransferCodingHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.TransferCodingHeaderValue? parsedValue);
```

Determines whether a string is valid `TransferCodingHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `TransferCodingHeaderValue` version of the string.

Returns: `true` if `input` is valid `TransferCodingHeaderValue` information; otherwise, `false`.

To be added.
