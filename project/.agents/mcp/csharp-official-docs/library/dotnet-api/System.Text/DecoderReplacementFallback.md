---
title: "DecoderReplacementFallback class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderReplacementFallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderReplacementFallback class

Namespace: `System.Text`

```csharp
public sealed class DecoderReplacementFallback : System.Text.DecoderFallback
```

Provides a failure-handling mechanism, called a fallback, for an encoded input byte sequence that cannot be converted to an output character. The fallback emits a user-specified replacement string instead of a decoded input byte sequence. This class cannot be inherited.

#### Remarks
A common reason for an encoding or decoding operation to fail is if the underlying encoding class does not provide a mapping between a character and an equivalent byte sequence. For example, an `ASCIIEncoding` object cannot decode a byte value greater than 0x7F. If an input byte sequence cannot be converted to an output character, a `DecoderReplacementFallback` object emits a replacement string into the output to represent the original input byte sequence. The conversion process then continues to decode the remainder of the original input.

The replacement string used by a `DecoderReplacementFallback` object is determined by the call to its class constructor. Two options are available:

- Replacement with the default character. If you call the `%23ctor` constructor, the replacement character is "?" (U+003F).
- Replacement with a string of your choice. If you call the `%23ctor` constructor, you provide the replacement string.

This class is one of two .NET classes that implement different fallback strategies for handling decoding conversion failures. The other class is the `DecoderExceptionFallback` class, which throws a `DecoderFallbackException` when an invalid byte sequence is encountered.

#### Examples
The following code example demonstrates the `DecoderReplacementFallback` class.

_Code sample not included: ~/snippets/csharp/System.Text/DecoderReplacementFallback/Overview/fallDecRpl.cs._

## DecoderReplacementFallback.DecoderReplacementFallback() constructor

```csharp
public DecoderReplacementFallback ();
```

Initializes a new instance of the `DecoderReplacementFallback` class.

#### Remarks
By default, the replacement string that is the value of this `DecoderReplacementFallback` object is "?".

## DecoderReplacementFallback.DecoderReplacementFallback(String) constructor

```csharp
public DecoderReplacementFallback (string replacement);
```

Initializes a new instance of the `DecoderReplacementFallback` class using a specified replacement string.

Parameters:

- `replacement`: A string that is emitted in a decoding operation in place of an input byte sequence that cannot be decoded.

Exceptions:

- `ArgumentNullException`: `replacement` is `null`.
- `ArgumentException`: `replacement` contains an invalid surrogate pair. In other words, the surrogate pair does not consist of one high surrogate component followed by one low surrogate component.

#### Remarks
The `replacement` parameter initializes the replacement string that is the value of the `DecoderReplacementFallback` object. A commonly used value is the Unicode "Replacement Character" (U+FFFD), which is specifically intended to replace an incoming character having a value that is unknown or unrepresentable in Unicode.

## DecoderReplacementFallback.DefaultString property

```csharp
public string DefaultString { get; }
```

Gets the replacement string that is the value of the `DecoderReplacementFallback` object.

Returns: A substitute string that is emitted in place of an input byte sequence that cannot be decoded.

To be added.

## DecoderReplacementFallback.MaxCharCount property

```csharp
public override int MaxCharCount { get; }
```

Gets the number of characters in the replacement string for the `DecoderReplacementFallback` object.

Returns: The number of characters in the string that is emitted in place of a byte sequence that cannot be decoded, that is, the length of the string returned by the `DecoderReplacementFallback.DefaultString` property.

To be added.

## DecoderReplacementFallback.CreateFallbackBuffer() method

```csharp
public override System.Text.DecoderFallbackBuffer CreateFallbackBuffer ();
```

Creates a `DecoderFallbackBuffer` object that is initialized with the replacement string of this `DecoderReplacementFallback` object.

Returns: A `DecoderFallbackBuffer` object that specifies a string to use instead of the original decoding operation input.

To be added.

## DecoderReplacementFallback.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether the value of a specified object is equal to the `DecoderReplacementFallback` object.

Parameters:

- `value`: A `DecoderReplacementFallback` object.

Returns: `true` if `value` is a `DecoderReplacementFallback` object having a `DecoderReplacementFallback.DefaultString` property that is equal to the `DecoderReplacementFallback.DefaultString` property of the current `DecoderReplacementFallback` object; otherwise, `false`.

To be added.

## DecoderReplacementFallback.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Retrieves the hash code for the value of the `DecoderReplacementFallback` object.

Returns: The hash code of the value of the object.

#### Remarks
The value of a `DecoderReplacementFallback` object is the value of its `DefaultString` property.
