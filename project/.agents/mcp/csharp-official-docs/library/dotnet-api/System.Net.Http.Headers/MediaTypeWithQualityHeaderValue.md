---
title: "MediaTypeWithQualityHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/MediaTypeWithQualityHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MediaTypeWithQualityHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public sealed class MediaTypeWithQualityHeaderValue : System.Net.Http.Headers.MediaTypeHeaderValue, ICloneable
```

Represents a media type with an additional quality factor used in a Content-Type header.

#### Remarks
The `MediaTypeWithQualityHeaderValue` class provides support for the media type and quality in a Content-Type header as defined in RFC 2616 by the IETF.

Quality factors allow the user agent to indicate the relative degree of preference for the media type in a Content-Type header. Quality uses a scale from 0 to 1. The default value is q=1.

This type derives from `MediaTypeHeaderValue`.

## MediaTypeWithQualityHeaderValue.MediaTypeWithQualityHeaderValue(String) constructor

```csharp
public MediaTypeWithQualityHeaderValue (string mediaType);
```

Initializes a new instance of the `MediaTypeWithQualityHeaderValue` class.

Parameters:

- `mediaType`: A `MediaTypeWithQualityHeaderValue` represented as string to initialize the new instance.

To be added.

## MediaTypeWithQualityHeaderValue.MediaTypeWithQualityHeaderValue(String, Double) constructor

```csharp
public MediaTypeWithQualityHeaderValue (string mediaType, double quality);
```

Initializes a new instance of the `MediaTypeWithQualityHeaderValue` class.

Parameters:

- `mediaType`: A `MediaTypeWithQualityHeaderValue` represented as string to initialize the new instance.
- `quality`: The quality associated with this header value.

To be added.

## MediaTypeWithQualityHeaderValue.Quality property

```csharp
public double? Quality { get; set; }
```

Gets or sets the quality value for the `MediaTypeWithQualityHeaderValue`.

Returns: The quality value for the `MediaTypeWithQualityHeaderValue` object.

To be added.

## MediaTypeWithQualityHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.MediaTypeWithQualityHeaderValue Parse (string input);
```

Converts a string to an `MediaTypeWithQualityHeaderValue` instance.

Parameters:

- `input`: A string that represents media type with quality header value information.

Returns: A `MediaTypeWithQualityHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid media type with quality header value information.

To be added.

## MediaTypeWithQualityHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `MediaTypeWithQualityHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MediaTypeWithQualityHeaderValue` instance is cast to an `ICloneable` interface.

## MediaTypeWithQualityHeaderValue.TryParse(String, MediaTypeWithQualityHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.MediaTypeWithQualityHeaderValue? parsedValue);
```

Determines whether a string is valid `MediaTypeWithQualityHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `MediaTypeWithQualityHeaderValue` version of the string.

Returns: `true` if `input` is valid `MediaTypeWithQualityHeaderValue` information; otherwise, `false`.

To be added.
