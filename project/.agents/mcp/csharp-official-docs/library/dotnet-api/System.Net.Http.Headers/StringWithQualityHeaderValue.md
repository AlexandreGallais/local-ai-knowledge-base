---
title: "StringWithQualityHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/StringWithQualityHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringWithQualityHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class StringWithQualityHeaderValue : ICloneable
```

Represents a string header value with an optional quality.

#### Remarks
The `StringWithQualityHeaderValue` class provides support for strings with a quality factor used in some headers as defined in RFC 2616 by the IETF.

Quality factors allow the user agent to indicate the relative degree of preference for various options in various headers including the Accept, Accept-Charset, Accept-Encoding, and Accept-Language headers. Quality uses a scale from 0 to 1. The default value is q=1.

## StringWithQualityHeaderValue.StringWithQualityHeaderValue(String) constructor

```csharp
public StringWithQualityHeaderValue (string value);
```

Initializes a new instance of the `StringWithQualityHeaderValue` class.

Parameters:

- `value`: The string used to initialize the new instance.

To be added.

## StringWithQualityHeaderValue.StringWithQualityHeaderValue(String, Double) constructor

```csharp
public StringWithQualityHeaderValue (string value, double quality);
```

Initializes a new instance of the `StringWithQualityHeaderValue` class.

Parameters:

- `value`: A string used to initialize the new instance.
- `quality`: A quality factor used to initialize the new instance.

To be added.

## StringWithQualityHeaderValue.Quality property

```csharp
public double? Quality { get; }
```

Gets the quality factor from the `StringWithQualityHeaderValue` object.

Returns: The quality factor from the `StringWithQualityHeaderValue` object.

To be added.

## StringWithQualityHeaderValue.Value property

```csharp
public string Value { get; }
```

Gets the string value from the `StringWithQualityHeaderValue` object.

Returns: The string value from the `StringWithQualityHeaderValue` object.

To be added.

## StringWithQualityHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified Object is equal to the current `StringWithQualityHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## StringWithQualityHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `StringWithQualityHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `StringWithQualityHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## StringWithQualityHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.StringWithQualityHeaderValue Parse (string input);
```

Converts a string to an `StringWithQualityHeaderValue` instance.

Parameters:

- `input`: A string that represents quality header value information.

Returns: A `StringWithQualityHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid string with quality header value information.

To be added.

## StringWithQualityHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `StringWithQualityHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `StringWithQualityHeaderValue` instance is cast to an `ICloneable` interface.

## StringWithQualityHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `StringWithQualityHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## StringWithQualityHeaderValue.TryParse(String, StringWithQualityHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.StringWithQualityHeaderValue? parsedValue);
```

Determines whether a string is valid `StringWithQualityHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `StringWithQualityHeaderValue` version of the string.

Returns: `true` if `input` is valid `StringWithQualityHeaderValue` information; otherwise, `false`.

To be added.
