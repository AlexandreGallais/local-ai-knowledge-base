---
title: "EncodingInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncodingInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncodingInfo class

Namespace: `System.Text`

```csharp
public sealed class EncodingInfo
```

Provides basic <example-value> about an encoding.

#### Remarks
This class is primarily used by the `Encoding` class. The `Encoding.GetEncodings` method returns an array of this type.

This class is intended to provide minimal information about an encoding. To obtain additional information, the application should use the `EncodingInfo.GetEncoding` method to get an instance of the `Encoding` class, which contains more comprehensive information about the encoding it represents.

#### Examples
The following example uses the `Encoding.GetEncodings` method to retrieve an `EncodingInfo` object for each encoding supported by .NET. It then displays the value of each encoding's `EncodingInfo.CodePage`, `EncodingInfo.Name`, and `DisplayName` property and compares them with the corresponding `Encoding` names.

_Code sample not included: ~/snippets/csharp/System.Text/EncodingInfo/Overview/encodinginfo.cs._

## EncodingInfo.EncodingInfo(EncodingProvider, Int32, String, String) constructor

```csharp
public EncodingInfo (System.Text.EncodingProvider provider, int codePage, string name, string displayName);
```

Constructs an `EncodingInfo` object.

Parameters:

- `provider`: The provider that created this `EncodingInfo` object.
- `codePage`: The encoding codepage.
- `name`: The encoding name.
- `displayName`: The encoding display name.

To be added.

## EncodingInfo.CodePage property

```csharp
public int CodePage { get; }
```

Gets the code page identifier of the encoding.

Returns: The code page identifier of the encoding.

#### Remarks
This member is equivalent to `Encoding.CodePage`.

#### Examples
The following code example retrieves the different names for each encoding and compares them with the equivalent `Encoding` names.

_Code sample not included: ~/snippets/csharp/System.Text/EncodingInfo/Overview/encodinginfo.cs._

## EncodingInfo.DisplayName property

```csharp
public string DisplayName { get; }
```

Gets the human-readable description of the encoding.

Returns: The human-readable description of the encoding.

#### Remarks
This property defines a display name that is the same as the name represented by the `EncodingName` property. Your applications should use `EncodingInfo.Name` for a name to pass to `Encoding.GetEncoding`.

#### Examples
The following code example retrieves the different names for each encoding and compares them with the equivalent `Encoding` names.

_Code sample not included: ~/snippets/csharp/System.Text/EncodingInfo/Overview/encodinginfo.cs._

## EncodingInfo.Name property

```csharp
public string Name { get; }
```

Gets the name registered with the Internet Assigned Numbers Authority (IANA) for the encoding.

Returns: The IANA name for the encoding.

#### Remarks
This property defines the name that is appropriate for passing to `Encoding.GetEncoding`. This name is the same as the name represented by the `WebName` property. When its value is the name of a standard, the actual implementation of the encoding may not conform in full to that standard. Your applications should use `EncodingInfo.DisplayName` for a human-readable name.

The `Encoding.GetEncodings` method gets a complete list of supported encodings, uniquely distinguished by code page. If your application retrieves encodings using the `Name` property, note that some duplicate encodings are retrieved. For more about handling these duplicates, see the description of `Encoding.GetEncodings`.

For a list of supported names, see Character Sets on the IANA website.

#### Examples
The following code example retrieves the different names for each encoding and compares them with the equivalent `Encoding` names.

_Code sample not included: ~/snippets/csharp/System.Text/EncodingInfo/Overview/encodinginfo.cs._

## EncodingInfo.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Gets a value indicating whether the specified object is equal to the current `EncodingInfo` object.

Parameters:

- `value`: An object to compare to the current `EncodingInfo` object.

Returns: `true` if `value` is a `EncodingInfo` object and is equal to the current `EncodingInfo` object; otherwise, `false`.

#### Remarks
Two `EncodingInfo` objects are equal if their `EncodingInfo.CodePage` properties are equal.

## EncodingInfo.GetEncoding() method

```csharp
public System.Text.Encoding GetEncoding ();
```

Returns a `Encoding` object that corresponds to the current `EncodingInfo` object.

Returns: A `Encoding` object that corresponds to the current `EncodingInfo` object.

#### Examples
The following code example retrieves the different names for each encoding and compares them with the equivalent `Encoding` names.

_Code sample not included: ~/snippets/csharp/System.Text/EncodingInfo/Overview/encodinginfo.cs._

## EncodingInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `EncodingInfo` object.

Returns: A 32-bit signed integer hash code.

#### Remarks
The value returned by the `EncodingInfo.GetHashCode` method is not suitable for distinguishing one `EncodingInfo` object from another. If your application needs a unique hash code, it should override the `EncodingInfo.GetHashCode` method.
