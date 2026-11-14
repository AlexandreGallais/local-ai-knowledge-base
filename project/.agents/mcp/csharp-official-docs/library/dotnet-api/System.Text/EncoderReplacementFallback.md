---
title: "EncoderReplacementFallback class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderReplacementFallback.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderReplacementFallback class

Namespace: `System.Text`

```csharp
public sealed class EncoderReplacementFallback : System.Text.EncoderFallback
```

Provides a failure handling mechanism, called a fallback, for an input character that cannot be converted to an output byte sequence. The fallback uses a user-specified replacement string instead of the original input character. This class cannot be inherited.

#### Remarks
A common reason for an encoding or decoding operation to fail is if the underlying encoding class does not provide a mapping between a character and an equivalent byte sequence. For example, an `ASCIIEncoding` object cannot encode a character having a Unicode code point value that is outside the range U+0000 to U+007F. If the input character cannot be converted to an output byte sequence, a `EncoderReplacementFallback` object substitutes a specified replacement string for the original input character. The conversion process encodes the replacement string and then continues to process the remainder of the original input.

The replacement string used by an `EncoderReplacementFallback` object is determined by the call to its class constructor. Two options are available:

- Replacement with the default character. If you call the `%23ctor` constructor, the replacement character is "?" (U+003F).
- Replacement with a string of your choice. If you call the `%23ctor` constructor, you provide the replacement string.

If you choose a fallback string to use with this class, make sure that the string is composed entirely of characters that can be encoded in the target encoding. Otherwise, a recursive fallback results, causing an `ArgumentException`.

This class is one of two .NET classes that implement different fallback strategies for handling encoding conversion failures. The other class is the `EncoderExceptionFallback` class, which throws an `EncoderFallbackException` when an invalid character is encountered.

#### Examples
The following example demonstrates the `EncoderReplacementFallback` class.

_Code sample not included: ~/snippets/csharp/System.Text/EncoderReplacementFallback/Overview/fallEncRpl.cs._

## EncoderReplacementFallback.EncoderReplacementFallback() constructor

```csharp
public EncoderReplacementFallback ();
```

Initializes a new instance of the `EncoderReplacementFallback` class.

#### Remarks
By default, the replacement string that is the value of this `EncoderReplacementFallback` object is "?".

## EncoderReplacementFallback.EncoderReplacementFallback(String) constructor

```csharp
public EncoderReplacementFallback (string replacement);
```

Initializes a new instance of the `EncoderReplacementFallback` class using a specified replacement string.

Parameters:

- `replacement`: A string that is converted in an encoding operation in place of an input character that cannot be encoded.

Exceptions:

- `ArgumentNullException`: `replacement` is `null`.
- `ArgumentException`: `replacement` contains an invalid surrogate pair. In other words, the surrogate does not consist of one high surrogate component followed by one low surrogate component.

#### Remarks
The `replacement` parameter initializes the replacement string that is the value of this `EncoderReplacementFallback` object. You application must provide a `replacement` value that contains only characters that can be encoded in the target encoding. Otherwise, a recursive fallback results, causing an `ArgumentException`. For example, the fallback provided for an `ASCIIEncoding` object cannot include the character "¿" (U+00BF) because that character is itself not a valid ASCII character.

As a result of this, U+FFFD, which is a good choice for a fallback string for `DecoderExceptionFallback`, is not generally a good choice for this class. Also, the null character (U+0000) cannot be used in the fallback string.

## EncoderReplacementFallback.DefaultString property

```csharp
public string DefaultString { get; }
```

Gets the replacement string that is the value of the `EncoderReplacementFallback` object.

Returns: A substitute string that is used in place of an input character that cannot be encoded.

To be added.

## EncoderReplacementFallback.MaxCharCount property

```csharp
public override int MaxCharCount { get; }
```

Gets the number of characters in the replacement string for the `EncoderReplacementFallback` object.

Returns: The number of characters in the string used in place of an input character that cannot be encoded.

To be added.

## EncoderReplacementFallback.CreateFallbackBuffer() method

```csharp
public override System.Text.EncoderFallbackBuffer CreateFallbackBuffer ();
```

Creates a `EncoderFallbackBuffer` object that is initialized with the replacement string of this `EncoderReplacementFallback` object.

Returns: A `EncoderFallbackBuffer` object equal to this `EncoderReplacementFallback` object.

To be added.

## EncoderReplacementFallback.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether the value of a specified object is equal to the `EncoderReplacementFallback` object.

Parameters:

- `value`: A `EncoderReplacementFallback` object.

Returns: `true` if the `value` parameter specifies an `EncoderReplacementFallback` object and the replacement string of that object is equal to the replacement string of this `EncoderReplacementFallback` object; otherwise, `false`.

#### Remarks
The value of a `EncoderReplacementFallback` object is the value of its `DefaultString` property.

## EncoderReplacementFallback.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Retrieves the hash code for the value of the `EncoderReplacementFallback` object.

Returns: The hash code of the value of the object.

#### Remarks
The value of a `EncoderReplacementFallback` object is the value of its `DefaultString` property.
