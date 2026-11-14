---
title: "TransferCodingWithQualityHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/TransferCodingWithQualityHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransferCodingWithQualityHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public sealed class TransferCodingWithQualityHeaderValue : System.Net.Http.Headers.TransferCodingHeaderValue, ICloneable
```

Represents an Accept-Encoding header value with optional quality factor.

#### Remarks
The `TransferCodingWithQualityHeaderValue` class provides support for the Accept-Encoding header as defined in RFC 2616 by the IETF.

Quality factors allow a user agent to indicate the relative degree of preference for an Accept-Encoding header value, using the qvalue scale from 0 to 1. The default value is q=1.

This type derives from `TransferCodingHeaderValue`.

## TransferCodingWithQualityHeaderValue.TransferCodingWithQualityHeaderValue(String) constructor

```csharp
public TransferCodingWithQualityHeaderValue (string value);
```

Initializes a new instance of the `TransferCodingWithQualityHeaderValue` class.

Parameters:

- `value`: A string used to initialize the new instance.

To be added.

## TransferCodingWithQualityHeaderValue.TransferCodingWithQualityHeaderValue(String, Double) constructor

```csharp
public TransferCodingWithQualityHeaderValue (string value, double quality);
```

Initializes a new instance of the `TransferCodingWithQualityHeaderValue` class.

Parameters:

- `value`: A string used to initialize the new instance.
- `quality`: A value for the quality factor.

To be added.

## TransferCodingWithQualityHeaderValue.Quality property

```csharp
public double? Quality { get; set; }
```

Gets the quality factor from the `TransferCodingWithQualityHeaderValue`.

Returns: The quality factor from the `TransferCodingWithQualityHeaderValue`.

To be added.

## TransferCodingWithQualityHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.TransferCodingWithQualityHeaderValue Parse (string input);
```

Converts a string to an `TransferCodingWithQualityHeaderValue` instance.

Parameters:

- `input`: A string that represents transfer-coding value information.

Returns: A `TransferCodingWithQualityHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid transfer-coding with quality header value information.

To be added.

## TransferCodingWithQualityHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `TransferCodingWithQualityHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `TransferCodingWithQualityHeaderValue` instance is cast to an `ICloneable` interface.

## TransferCodingWithQualityHeaderValue.TryParse(String, TransferCodingWithQualityHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.TransferCodingWithQualityHeaderValue? parsedValue);
```

Determines whether a string is valid `TransferCodingWithQualityHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `TransferCodingWithQualityHeaderValue` version of the string.

Returns: `true` if `input` is valid `TransferCodingWithQualityHeaderValue` information; otherwise, `false`.

To be added.
