---
title: "ContentDispositionHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/ContentDispositionHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContentDispositionHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class ContentDispositionHeaderValue : ICloneable
```

Represents the value of the Content-Disposition header.

#### Remarks
The Content-Disposition header is normally used for working with file uploads and downloads. The format differs from other headers in that it is a single header with a disposition type followed by a list of parameters, some of which are well defined.

This header is used in two different contexts:

1.  A MIME header for nested body content in the `MultipartFormDataContent` class. For more information, see IETF RFC 2183.

2.  An HTTP header in `HttpContentHeaders` class. For more information, see IETF RFC 6266.

## ContentDispositionHeaderValue.ContentDispositionHeaderValue(ContentDispositionHeaderValue) constructor

```csharp
protected ContentDispositionHeaderValue (System.Net.Http.Headers.ContentDispositionHeaderValue source);
```

Initializes a new instance of the `ContentDispositionHeaderValue` class.

Parameters:

- `source`: A `ContentDispositionHeaderValue`.

To be added.

## ContentDispositionHeaderValue.ContentDispositionHeaderValue(String) constructor

```csharp
public ContentDispositionHeaderValue (string dispositionType);
```

Initializes a new instance of the `ContentDispositionHeaderValue` class.

Parameters:

- `dispositionType`: A string that contains a `ContentDispositionHeaderValue`.

To be added.

## ContentDispositionHeaderValue.CreationDate property

```csharp
public DateTimeOffset? CreationDate { get; set; }
```

Gets or sets the date on which the file was created.

Returns: The file creation date.

To be added.

## ContentDispositionHeaderValue.DispositionType property

```csharp
public string DispositionType { get; set; }
```

Gets or sets the disposition type for a content body part.

Returns: The disposition type.

#### Remarks
A body part should be marked with a `DispositionType` property of "inline" if it is intended to be   displayed automatically upon display of the message. A body part can be designated with a `DispositionType` property of "attachment" to indicate that they are   separate from the main body of the HTTP request or response.

## ContentDispositionHeaderValue.FileName property

```csharp
public string? FileName { get; set; }
```

A suggestion for how to construct a filename for   storing the message payload to be used if the entity is   detached and stored in a separate file.

Returns: A suggested filename.

#### Remarks
The  `FileName` property uses MIME encoding for non-ascii characters.

## ContentDispositionHeaderValue.FileNameStar property

```csharp
public string? FileNameStar { get; set; }
```

A suggestion for how to construct filenames for   storing message payloads to be used if the entities are    detached and stored in a separate files.

Returns: A suggested filename of the form filename*.

#### Remarks
The  `FileNameStar` property uses IETF RFC 5987 encoding. The `ContentDispositionHeaderValue.FileName` and  `ContentDispositionHeaderValue.FileNameStar` properties differ only in that `ContentDispositionHeaderValue.FileNameStar` uses the encoding defined in IETF RFC 5987, allowing the use   of characters not present in the ISO-8859-1 character set.

## ContentDispositionHeaderValue.ModificationDate property

```csharp
public DateTimeOffset? ModificationDate { get; set; }
```

Gets or sets the date when the file was last modified.

Returns: The file modification date.

To be added.

## ContentDispositionHeaderValue.Name property

```csharp
public string? Name { get; set; }
```

Gets or sets the name for a content body part.

Returns: The name for the content body part.

To be added.

## ContentDispositionHeaderValue.Parameters property

```csharp
public System.Collections.Generic.ICollection<System.Net.Http.Headers.NameValueHeaderValue> Parameters { get; }
```

A set of parameters included the Content-Disposition header.

Returns: A collection of parameters.

To be added.

## ContentDispositionHeaderValue.ReadDate property

```csharp
public DateTimeOffset? ReadDate { get; set; }
```

Gets or sets the date the file was last read.

Returns: The last read date.

To be added.

## ContentDispositionHeaderValue.Size property

```csharp
public long? Size { get; set; }
```

Gets or sets the approximate size, in bytes, of the file.

Returns: The approximate size, in bytes.

To be added.

## ContentDispositionHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `ContentDispositionHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## ContentDispositionHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an  `ContentDispositionHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `ContentDispositionHeaderValue` method is suitable for use in hashing algorithms and data structures such as a hash table.

## ContentDispositionHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.ContentDispositionHeaderValue Parse (string input);
```

Converts a string to an `ContentDispositionHeaderValue` instance.

Parameters:

- `input`: A string that represents content disposition header value information.

Returns: An `ContentDispositionHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid content disposition header value information.

To be added.

## ContentDispositionHeaderValue.System.ICloneable.Clone() method

```csharp
object? ICloneable.Clone ();
```

Creates a new object that is a copy of the current `ContentDispositionHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ContentDispositionHeaderValue` instance is cast to an `ICloneable` interface.

## ContentDispositionHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `ContentDispositionHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## ContentDispositionHeaderValue.TryParse(String, ContentDispositionHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.ContentDispositionHeaderValue? parsedValue);
```

Determines whether a string is valid `ContentDispositionHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `ContentDispositionHeaderValue` version of the string.

Returns: `true` if `input` is valid `ContentDispositionHeaderValue` information; otherwise, `false`.

To be added.
