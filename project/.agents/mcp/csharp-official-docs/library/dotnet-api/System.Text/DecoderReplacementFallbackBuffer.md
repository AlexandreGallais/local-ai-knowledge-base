---
title: "DecoderReplacementFallbackBuffer class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderReplacementFallbackBuffer.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderReplacementFallbackBuffer class

Namespace: `System.Text`

```csharp
public sealed class DecoderReplacementFallbackBuffer : System.Text.DecoderFallbackBuffer
```

Represents a substitute output string that is emitted when the original input byte sequence cannot be decoded. This class cannot be inherited.

#### Remarks
It might not be possible to convert an encoded byte sequence to an equivalent character if no suitable decoding exists. A common reason for a decoding to fail is that the conversion operation uses a code page that cannot represent the character to decode.

If the input byte sequence cannot be converted to an output character, a `DecoderReplacementFallback` object provides a replacement string that is substituted for the output character. The replacement string initializes the value of the `DecoderReplacementFallback` object, and the value of the `DecoderReplacementFallback` object initializes the value of a `DecoderReplacementFallbackBuffer` object. The value of a `DecoderReplacementFallbackBuffer` object is called the replacement fallback buffer. The conversion operation uses the replacement fallback buffer to emit a replacement string instead of a decoded character, then continues to process the remainder of the input.

## DecoderReplacementFallbackBuffer.DecoderReplacementFallbackBuffer(DecoderReplacementFallback) constructor

```csharp
public DecoderReplacementFallbackBuffer (System.Text.DecoderReplacementFallback fallback);
```

Initializes a new instance of the `DecoderReplacementFallbackBuffer` class using the value of a `DecoderReplacementFallback` object.

Parameters:

- `fallback`: A `DecoderReplacementFallback` object that contains a replacement string.

To be added.

## DecoderReplacementFallbackBuffer.Remaining property

```csharp
public override int Remaining { get; }
```

Gets the number of characters in the replacement fallback buffer that remain to be processed.

Returns: The number of characters in the replacement fallback buffer that have not yet been processed.

#### Remarks
The `DecoderReplacementFallbackBuffer.Fallback` method returns `true` if the `Remaining` property is nonzero.

## DecoderReplacementFallbackBuffer.Fallback(Byte[], Int32) method

```csharp
public override bool Fallback (byte[] bytesUnknown, int index);
```

Prepares the replacement fallback buffer to use the current replacement string.

Parameters:

- `bytesUnknown`: An input byte sequence. This parameter is ignored unless an exception is thrown.
- `index`: The index position of the byte in `bytesUnknown`. This parameter is ignored in this operation.

Returns: `true` if the replacement string is not empty; `false` if the replacement string is empty.

Exceptions:

- `ArgumentException`: This method is called again before the `DecoderReplacementFallbackBuffer.GetNextChar` method has read all the characters in the replacement fallback buffer.

#### Remarks
The `Encoding.GetBytes` and `Encoder.Convert` methods call `DecoderReplacementFallbackBuffer.Fallback` if they encounter an unknown input byte sequence that cannot be decoded. If the return value of `DecoderReplacementFallbackBuffer.Fallback` is `true`, the calling method can invoke the `DecoderReplacementFallbackBuffer.GetNextChar` method to obtain each character of the fallback buffer.

## DecoderReplacementFallbackBuffer.GetNextChar() method

```csharp
public override char GetNextChar ();
```

Retrieves the next character in the replacement fallback buffer.

Returns: The next character in the replacement fallback buffer.

#### Remarks
The `Encoding.GetBytes` and `Decoder.Convert` methods call `DecoderReplacementFallbackBuffer.Fallback` if they encounter an unknown surrogate pair or character in their input. If the return value of `DecoderReplacementFallbackBuffer.Fallback` is `true`, the calling method can invoke `DecoderReplacementFallbackBuffer.GetNextChar` to obtain each character of the replacement fallback buffer.

## DecoderReplacementFallbackBuffer.MovePrevious() method

```csharp
public override bool MovePrevious ();
```

Causes the next call to `DecoderReplacementFallbackBuffer.GetNextChar` to access the character position in the replacement fallback buffer prior to the current character position.

Returns: `true` if the `DecoderReplacementFallbackBuffer.MovePrevious` operation was successful; otherwise, `false`.

To be added.

## DecoderReplacementFallbackBuffer.Reset() method

```csharp
public override void Reset ();
```

Initializes all internal state information and data in the `DecoderReplacementFallbackBuffer` object.

#### Remarks
The `DecoderReplacementFallbackBuffer.Reset` method discards any persisted state information and data that govern the emitting of a replacement string. Unpredictable results occur if the decoding operation continues after the `DecoderReplacementFallbackBuffer.Reset` method is invoked.
