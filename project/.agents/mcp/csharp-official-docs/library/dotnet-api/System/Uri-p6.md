---
title: "Uri class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Uri.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Uri class (part 6 of 7)

## Uri.IsWellFormedUriString(String, UriKind) method

```csharp
public static bool IsWellFormedUriString (string? uriString, UriKind uriKind);
```

Indicates whether the string is well-formed by attempting to construct a URI with the string and ensures that the string does not require further escaping.

Parameters:

- `uriString`: The string used to attempt to construct a `Uri`.
- `uriKind`: The type of the `Uri` in `uriString`.

Returns: `true` if the string was well-formed; otherwise, `false`.

#### Remarks
In versions of .NET before version 4.5, by default the string is considered well-formed in accordance with RFC 2396 and RFC 2732. If International Resource Identifiers (IRIs) or Internationalized Domain Name (IDN) parsing are enabled, the string is considered well-formed in accordance with RFC 3986 and RFC 3987.

Beginning in .NET 4.5, strings are always considered well-formed in accordance with RFC 3986 and RFC 3987, whether or not IRI or IDN are enabled. Note, however, that this is only true for apps that target .NET 4.5 or later. Apps that target .NET 4.0 invoke compatibility code, and experience the old (pre-4.5) behavior.

The string is considered poorly formed, causing the method to return false, if any of the following conditions occur

|Error|Example|
|-----------|-------------|
|The string is not correctly escaped.|`http://www.contoso.com/path???/file name`|
|The string is an absolute `Uri` that represents an implicit file `Uri`.|`c:\\directory\filename`|
|The string is an absolute URI that is missing a slash before the path.|`file://c:/directory/filename`|
|The string contains unescaped backslashes even if they will be treated as forward slashes|`http:\\\host/path/file`|
|The string represents a hierarchical absolute `Uri` and does not contain "://"|`www.contoso.com/path/file`|
|The parser for the `Uri.Scheme` indicates that the original string was not well-formed.|The example depends on the scheme of the URI.|
|Beginning with .NET 4.5, relative URIs with a colon (':') in their first segment are not considered well-formed.|`2013.05.29_14:33:41`|

For more information on IRI support, see the Remarks section for the `Uri` class.

## Uri.MakeRelative(Uri) method

```csharp
public string MakeRelative (Uri toUri);
```

Determines the difference between two `Uri` instances.

Parameters:

- `toUri`: The URI to compare to the current URI.

Returns: If the hostname and scheme of this URI instance and `toUri` are the same, then this method returns a `String` that represents a relative URI that, when appended to the current URI instance, yields the `toUri` parameter.

If the hostname or scheme is different, then this method returns a `String` that represents the `toUri` parameter.

Exceptions:

- `ArgumentNullException`: `toUri` is `null`.
- `InvalidOperationException`: This instance represents a relative URI, and this method is valid only for absolute URIs.

To be added.

## Uri.MakeRelativeUri(Uri) method

```csharp
public Uri MakeRelativeUri (Uri uri);
```

Determines the difference between two `Uri` instances.

Parameters:

- `uri`: The URI to compare to the current URI.

Returns: If the hostname and scheme of this URI instance and `uri` are the same, then this method returns a relative `Uri` that, when appended to the current URI instance, yields `uri`.

If the hostname or scheme is different, then this method returns a `Uri` that represents the `uri` parameter.

Exceptions:

- `ArgumentNullException`: `uri` is `null`.
- `InvalidOperationException`: This instance represents a relative URI, and this property is valid only for absolute URIs.

#### Remarks
The following table shows the URI instance, `toUri`, and the results of calling `Uri.MakeRelativeUri`.

|Current URI instance|`toUri`|Return value|
|--------------------------|-------------|------------------|
|`http://www.contoso.com/`|`http://www.contoso.com/test/test.htm`|`test/test.htm`|
|`http://www.contoso.com/test1/`|`http://www.contoso.com/`|`../`|
|`http://www.contoso.com:8000/`|`http://www.contoso.com/test/test.htm`|`http://www.contoso.com/test/test.htm`|
|`http://user@example.com/`|`http://www.contoso.com/test1/test1.txt`|`test1/test1.txt`|

User information, if present in the URI, is ignored.

#### Examples
The following example creates 2 `Uri` instances. The difference in the path information is written to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.op_Equality(Uri, Uri) method

```csharp
public static bool operator == (Uri? uri1, Uri? uri2);
```

Determines whether two `Uri` instances have the same value.

Parameters:

- `uri1`: A URI to compare with `uri2`.
- `uri2`: A URI to compare with `uri1`.

Returns: `true` if the `Uri` instances are equivalent; otherwise, `false`.

#### Remarks
This overload uses the `Uri.Equals` method to determine whether the two `Uri` instances are equivalent. `Uri.UserInfo` and `Uri.Fragment` content is ignored when making this comparison.

#### Examples
This example creates three `Uri` instances from strings and compares them to determine whether they represent the same value. `Address1` and `Address2` are the same because the `Uri.Fragment` portion is ignored for this comparison. The outcome is written to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/nclurienhancements.cs._

## Uri.op_Inequality(Uri, Uri) method

```csharp
public static bool operator != (Uri? uri1, Uri? uri2);
```

Determines whether two `Uri` instances do not have the same value.

Parameters:

- `uri1`: A URI to compare with `uri2`.
- `uri2`: A URI to compare with `uri1`.

Returns: `true` if the two `Uri` instances are not equal; otherwise, `false`. If either parameter is `null`, this method returns `true`.

#### Remarks
This overload uses the `Uri.Equals` method to determine whether the two `Uri` instances are not equivalent. `Uri.UserInfo` and `Uri.Fragment` content is ignored when making this comparison.

#### Examples
This example creates three `Uri` instances from strings and compares them to determine whether they represent the same value. `Address2` and `Address3` are not the same because `Address3` contains a `Uri.Query` that is not found in `Address2`. The outcome is written to the console.

_Code sample not included: ~/snippets/csharp/System/Uri/.ctor/nclurienhancements.cs._

## Uri.Parse() method

```csharp
protected virtual void Parse ();
```

Parses the URI of the current instance to ensure it contains all the parts required for a valid URI.

Exceptions:

- `UriFormatException`: The Uri passed from the constructor is invalid.

To be added.

## Uri.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider formatProvider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `formatProvider`: The provider to use to format the value.
-or-
A `null` reference (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

To be added.

## Uri.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Uri.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo serializationInfo, System.Runtime.Serialization.StreamingContext streamingContext);
```

Returns the data needed to serialize the current instance.

Parameters:

- `serializationInfo`: The information required to serialize the `Uri`.
- `streamingContext`: An object containing the source and destination of the serialized stream associated with the `Uri`.

To be added.

## Uri.ToString() method

```csharp
public override string ToString ();
```

Gets a canonical string representation for the specified `Uri` instance.

Returns: The unescaped canonical representation of the `Uri` instance. All characters are unescaped except #, ?, and %.

#### Remarks
The string returned by this method does not contain port information when the port is the default port for the scheme.

> **Note:**
> The string returned by the `Uri.ToString` method may contain control characters, which can corrupt the state of a console application. You can use the `Uri.GetComponents` method with the `SafeUnescaped` format to remove control characters from the returned string.

#### Examples
The following example creates a new `Uri` instance from a string. It illustrates the difference between the value returned from `Uri.OriginalString`, which returns the string that was passed to the constructor, and from a call to `Uri.ToString`, which returns the canonical form of the string.

_Code sample not included: ~/snippets/csharp/System/Uri/CheckSchemeName/uriexamples.cs._

## Uri.TryCreate(String, UriCreationOptions, Uri) method

```csharp
public static bool TryCreate (string? uriString, in UriCreationOptions creationOptions, out Uri? result);
```

Creates a new `Uri` using the specified `String` instance and `UriCreationOptions`.

Parameters:

- `uriString`: The string representation of the `Uri`.
- `creationOptions`: Options that control how the `Uri` is created and behaves.
- `result`: When this method returns, contains the constructed `Uri`.

Returns: `true` if the `Uri` was successfully created; otherwise, `false`.

To be added.

## Uri.TryCreate(String, UriKind, Uri) method

```csharp
public static bool TryCreate (string? uriString, UriKind uriKind, out Uri? result);
```

Creates a new `Uri` using the specified `String` instance and a `UriKind`.

Parameters:

- `uriString`: The string representation of the `Uri`.
- `uriKind`: The type of the Uri.
- `result`: When this method returns, contains the constructed `Uri`.

Returns: `true` if the `Uri` was successfully created; otherwise, `false`.

#### Remarks
If this method returns `true`, the new `Uri` is in `result`.

## Uri.TryCreate(Uri, String, Uri) method

```csharp
public static bool TryCreate (Uri? baseUri, string? relativeUri, out Uri? result);
```

Creates a new `Uri` using the specified base and relative `String` instances.

Parameters:

- `baseUri`: The base URI.
- `relativeUri`: The string representation of the relative URI to add to the base `Uri`.
- `result`: When this method returns, contains a `Uri` constructed from `baseUri` and `relativeUri`. This parameter is passed uninitialized.

Returns: `true` if the `Uri` was successfully created; otherwise, `false`.

#### Remarks
If this method returns `true`, the new `Uri` is in `result`.

## Uri.TryCreate(Uri, Uri, Uri) method

```csharp
public static bool TryCreate (Uri? baseUri, Uri? relativeUri, out Uri? result);
```

Creates a new `Uri` using the specified base and relative `Uri` instances.

Parameters:

- `baseUri`: The base URI.
- `relativeUri`: The relative URI to add to the base `Uri`.
- `result`: When this method returns, contains a `Uri` constructed from `baseUri` and `relativeUri`. This parameter is passed uninitialized.

Returns: `true` if the `Uri` was successfully created; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `baseUri` is `null`.

#### Remarks
If this method returns `true`, the new `Uri` is in `result`.

This method constructs the URI, puts it in canonical form, and validates it. If an unhandled exception occurs, this method catches it. If you want to create a `Uri` and get exceptions use one of the `Uri.%23ctor` constructors.

## Uri.TryEscapeDataString(Char>, Char>, Int32) method

```csharp
public static bool TryEscapeDataString (ReadOnlySpan<char> charsToEscape, Span<char> destination, out int charsWritten);
```

Attempts to convert a span to its escaped representation.

Parameters:

- `charsToEscape`: The span to escape.
- `destination`: The output span that contains the escaped result of the operation.
- `charsWritten`: When this method returns, contains the number of chars that were written into `destination`.

Returns: `true` if the `destination` was large enough to hold the entire result; otherwise, `false`.

To be added.

## Uri.TryFormat(Char>, Int32) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten);
```

Attempts to format a canonical string representation for the `Uri` instance into the specified span.

Parameters:

- `destination`: The span into which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Uri.TryUnescapeDataString(Char>, Char>, Int32) method

```csharp
public static bool TryUnescapeDataString (ReadOnlySpan<char> charsToUnescape, Span<char> destination, out int charsWritten);
```

Attempts to convert a span to its unescaped representation.

Parameters:

- `charsToUnescape`: The span to unescape.
- `destination`: The output span that contains the unescaped result of the operation.
- `charsWritten`: When this method returns, contains the number of chars that were written into `destination`.

Returns: `true` if the `destination` was large enough to hold the entire result; otherwise, `false`.

To be added.

## Uri.Unescape(String) method

```csharp
protected virtual string Unescape (string path);
```

Converts the specified string by replacing any escape sequences with their unescaped representation.

Parameters:

- `path`: The string to convert.

Returns: The unescaped value of the `path` parameter.

To be added.

## Uri.UnescapeDataString(Char>) method

```csharp
public static string UnescapeDataString (ReadOnlySpan<char> charsToUnescape);
```

Converts a span to its unescaped representation.

Parameters:

- `charsToUnescape`: The span to unescape.

Returns: The unescaped representation of `charsToUnescape`.

To be added.
