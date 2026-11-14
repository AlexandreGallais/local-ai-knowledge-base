---
title: "EncoderReplacementFallbackBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderReplacementFallbackBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderReplacementFallbackBuffer class

Namespace: `System.Text`

```csharp
public sealed class EncoderReplacementFallbackBuffer : System.Text.EncoderFallbackBuffer
```

Represents a substitute input string that is used when the original input character cannot be encoded. This class cannot be inherited.

#### Remarks
It might not be possible to convert a character to an equivalent encoded byte sequence if no suitable encoding exists. A common reason for an encoding to fail is if the conversion operation uses a code page that cannot represent the character to encode.

If the input character cannot be converted to an output byte sequence, a `EncoderReplacementFallback` object provides a replacement string that is substituted for the original input character. The replacement string initializes the value of the `EncoderReplacementFallback` object, and the value of the `EncoderReplacementFallback` object initializes the value of an `EncoderReplacementFallbackBuffer` object. The value of an `EncoderReplacementFallbackBuffer` object is called the replacement fallback buffer. The conversion operation encodes the replacement fallback buffer instead of the original input character, then continues to process the remainder of the input.

## EncoderReplacementFallbackBuffer.EncoderReplacementFallbackBuffer(EncoderReplacementFallback) constructor

```csharp
public EncoderReplacementFallbackBuffer (System.Text.EncoderReplacementFallback fallback);
```

Initializes a new instance of the `EncoderReplacementFallbackBuffer` class using the value of a `EncoderReplacementFallback` object.

Parameters:

- `fallback`: A `EncoderReplacementFallback` object.

To be added.

## EncoderReplacementFallbackBuffer.Remaining property

```csharp
public override int Remaining { get; }
```

Gets the number of characters in the replacement fallback buffer that remain to be processed.

Returns: The number of characters in the replacement fallback buffer that have not yet been processed.

#### Remarks
The `EncoderReplacementFallbackBuffer.Fallback` method returns `true` if the `Remaining` property is nonzero.

## EncoderReplacementFallbackBuffer.Fallback(Char, Int32) method

```csharp
public override bool Fallback (char charUnknown, int index);
```

Prepares the replacement fallback buffer to use the current replacement string.

Parameters:

- `charUnknown`: An input character. This parameter is ignored in this operation unless an exception is thrown.
- `index`: The index position of the character in the input buffer. This parameter is ignored in this operation.

Returns: `true` if the replacement string is not empty; `false` if the replacement string is empty.

Exceptions:

- `ArgumentException`: This method is called again before the `EncoderReplacementFallbackBuffer.GetNextChar` method has read all the characters in the replacement fallback buffer.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `EncoderReplacementFallbackBuffer.Fallback` if they encounter an unknown character in their input. If the return value of `EncoderReplacementFallbackBuffer.Fallback` is `true`, the calling method can invoke the `EncoderReplacementFallbackBuffer.GetNextChar` method to obtain each character in the replacement fallback buffer.

## EncoderReplacementFallbackBuffer.Fallback(Char, Char, Int32) method

```csharp
public override bool Fallback (char charUnknownHigh, char charUnknownLow, int index);
```

Indicates whether a replacement string can be used when an input surrogate pair cannot be encoded, or whether the surrogate pair can be ignored. Parameters specify the surrogate pair and the index position of the pair in the input.

Parameters:

- `charUnknownHigh`: The high surrogate of the input pair.
- `charUnknownLow`: The low surrogate of the input pair.
- `index`: The index position of the surrogate pair in the input buffer.

Returns: `true` if the replacement string is not empty; `false` if the replacement string is empty.

Exceptions:

- `ArgumentException`: This method is called again before the `EncoderReplacementFallbackBuffer.GetNextChar` method has read all the replacement string characters.
- `ArgumentOutOfRangeException`: The value of `charUnknownHigh` is less than U+D800 or greater than U+D8FF.

-or-

The value of `charUnknownLow` is less than U+DC00 or greater than U+DFFF.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `EncoderReplacementFallbackBuffer.Fallback` if they encounter an unknown character in their input. If the return value of `EncoderReplacementFallbackBuffer.Fallback` is `true`, the calling method can invoke the `EncoderReplacementFallbackBuffer.GetNextChar` method to obtain each character in the replacement fallback buffer.

## EncoderReplacementFallbackBuffer.GetNextChar() method

```csharp
public override char GetNextChar ();
```

Retrieves the next character in the replacement fallback buffer.

Returns: The next Unicode character in the replacement fallback buffer that the application can encode.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `EncoderReplacementFallbackBuffer.Fallback` if they encounter an unknown surrogate pair or character in their input. If the return value of `EncoderReplacementFallbackBuffer.Fallback` is `true`, the calling method can invoke `EncoderReplacementFallbackBuffer.GetNextChar` to obtain each character in the replacement fallback buffer.

## EncoderReplacementFallbackBuffer.MovePrevious() method

```csharp
public override bool MovePrevious ();
```

Causes the next call to the `EncoderReplacementFallbackBuffer.GetNextChar` method to access the character position in the replacement fallback buffer prior to the current character position.

Returns: `true` if the `EncoderReplacementFallbackBuffer.MovePrevious` operation was successful; otherwise, `false`.

To be added.

## EncoderReplacementFallbackBuffer.Reset() method

```csharp
public override void Reset ();
```

Initializes all internal state information and data in this instance of `EncoderReplacementFallbackBuffer`.

#### Remarks
The `EncoderReplacementFallbackBuffer.Reset` method discards any persisted state information and data that govern emitting a replacement string. Unpredictable results occur if the encoding operation continues after the `EncoderReplacementFallbackBuffer.Reset` method is invoked.
