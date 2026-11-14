---
title: "MediaTypeHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/MediaTypeHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MediaTypeHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class MediaTypeHeaderValue : ICloneable
```

Represents a media type used in a Content-Type header as defined in the RFC 2616.

#### Remarks
The `MediaTypeHeaderValue` class provides support for the media type used in a Content-Type header as defined in RFC 2616 by the IETF.

An example of a media-type would be "text/plain; charset=iso-8859-5".

## MediaTypeHeaderValue.MediaTypeHeaderValue(MediaTypeHeaderValue) constructor

```csharp
protected MediaTypeHeaderValue (System.Net.Http.Headers.MediaTypeHeaderValue source);
```

Initializes a new instance of the `MediaTypeHeaderValue` class.

Parameters:

- `source`: A `MediaTypeHeaderValue` object used to initialize the new instance.

To be added.

## MediaTypeHeaderValue.MediaTypeHeaderValue(String) constructor

```csharp
public MediaTypeHeaderValue (string mediaType);
```

Initializes a new instance of the `MediaTypeHeaderValue` class.

Parameters:

- `mediaType`: The source represented as a string to initialize the new instance.

To be added.

## MediaTypeHeaderValue.MediaTypeHeaderValue(String, String) constructor

```csharp
public MediaTypeHeaderValue (string mediaType, string? charSet);
```

Initializes a new instance of the `MediaTypeHeaderValue` class.

Parameters:

- `mediaType`: The source represented as a string to initialize the new instance.
- `charSet`: The value to use for the character set.

To be added.

## MediaTypeHeaderValue.CharSet property

```csharp
public string? CharSet { get; set; }
```

Gets or sets the character set.

Returns: The character set.

To be added.

## MediaTypeHeaderValue.MediaType property

```csharp
public string? MediaType { get; set; }
```

Gets or sets the media-type header value.

Returns: The media-type header value.

#### Remarks
The media-type is used in the Content-Type and Accept header fields in order to provide open and extensible data typing and type negotiation.

## MediaTypeHeaderValue.Parameters property

```csharp
public System.Collections.Generic.ICollection<System.Net.Http.Headers.NameValueHeaderValue> Parameters { get; }
```

Gets or sets the media-type header value parameters.

Returns: The media-type header value parameters.

To be added.

## MediaTypeHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `MediaTypeHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## MediaTypeHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `MediaTypeHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `MediaTypeHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## MediaTypeHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.MediaTypeHeaderValue Parse (string input);
```

Converts a string to an `MediaTypeHeaderValue` instance.

Parameters:

- `input`: A string that represents media type header value information.

Returns: A `MediaTypeHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid media type header value information.

To be added.

## MediaTypeHeaderValue.System.ICloneable.Clone() method

```csharp
object? ICloneable.Clone ();
```

Creates a new object that is a copy of the current `MediaTypeHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `MediaTypeHeaderValue` instance is cast to an `ICloneable` interface.

## MediaTypeHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `MediaTypeHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## MediaTypeHeaderValue.TryParse(String, MediaTypeHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.MediaTypeHeaderValue? parsedValue);
```

Determines whether a string is valid `MediaTypeHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `MediaTypeHeaderValue` version of the string.

Returns: `true` if `input` is valid `MediaTypeHeaderValue` information; otherwise, `false`.

To be added.
