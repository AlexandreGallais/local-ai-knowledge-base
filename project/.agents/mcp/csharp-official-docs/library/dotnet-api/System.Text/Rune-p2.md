---
title: "Rune struct (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/Rune.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Rune struct (part 2 of 4)

## Rune.DecodeFromUtf16(Char>, Rune, Int32) method

```csharp
public static System.Buffers.OperationStatus DecodeFromUtf16 (ReadOnlySpan<char> source, out System.Text.Rune result, out int charsConsumed);
```

Decodes the `Rune` at the beginning of the provided UTF-16 source buffer.

Parameters:

- `source`: A read-only UTF-16 character span.
- `result`: When this method returns, the decoded rune.
- `charsConsumed`: When this method returns, the number of characters read to create the rune.

Returns: `OperationStatus.Done` if the source buffer begins with a valid UTF-16 encoded scalar value. `result` then contains the decoded `Rune`, and `charsConsumed` contains the number of `Char` values used in the input buffer to encode the `Rune`.

`OperationStatus.NeedMoreData` if the source buffer is empty or contains only a standalone UTF-16 high surrogate character. `result` then contains `Rune.ReplacementChar`, and `charsConsumed` contains the length of the input buffer.

`OperationStatus.InvalidData` if the source buffer begins with an ill-formed UTF-16 encoded scalar value. `result` then contains `Rune.ReplacementChar`, and `charsConsumed` contains the number of `Char` values used to encode the ill-formed sequence.
.

#### Remarks

The general convention is to call this method in a loop, slicing the `source` buffer by `charsConsumed` elements on each iteration of the loop. On each iteration of the loop, `result` contains the real scalar value if the data was successfully decoded, or it contains `ReplacementChar` if the data was not successfully decoded. This pattern provides convenient automatic U+FFFD substitution of invalid sequences while iterating through the loop.

## Rune.DecodeFromUtf8(Byte>, Rune, Int32) method

```csharp
public static System.Buffers.OperationStatus DecodeFromUtf8 (ReadOnlySpan<byte> source, out System.Text.Rune result, out int bytesConsumed);
```

Decodes the `Rune` at the beginning of the provided UTF-8 source buffer.

Parameters:

- `source`: A read-only UTF-8 encoded byte span.
- `result`: When this method returns, the decoded rune.
- `bytesConsumed`: When this method returns, the number of bytes read to create the rune.

Returns: `OperationStatus.Done` if the source buffer begins with a valid UTF-8 encoded scalar value. `result` then contains the decoded `Rune`, and `bytesConsumed` contains the number of `Byte` values used in the input buffer to encode the `Rune`.

`OperationStatus.NeedMoreData` if the source buffer is empty or contains only a standalone UTF-8 high surrogate character. `result` then contains `Rune.ReplacementChar`, and `bytesConsumed` contains the length of the input buffer.

`OperationStatus.InvalidData` if the source buffer begins with an ill-formed UTF-8 encoded scalar value. `result` then contains `Rune.ReplacementChar`, and `bytesConsumed` contains the number of `Byte` values used in the input buffer to encode the ill-formed sequence.
.

#### Remarks

The general convention is to call this method in a loop, slicing the `source` buffer by `bytesConsumed` elements on each iteration of the loop. On each iteration of the loop, `result` contains the real scalar value if successfully decoded, or it contains `ReplacementChar` if the data could not be successfully decoded. This pattern provides convenient automatic U+FFFD substitution of invalid sequences while iterating through the loop.

## Rune.DecodeLastFromUtf16(Char>, Rune, Int32) method

```csharp
public static System.Buffers.OperationStatus DecodeLastFromUtf16 (ReadOnlySpan<char> source, out System.Text.Rune result, out int charsConsumed);
```

Decodes the `Rune` at the end of the provided UTF-16 source buffer.

Parameters:

- `source`: A read-only UTF-16 encoded character span.
- `result`: When this method returns, the decoded rune.
- `charsConsumed`: When this method returns, the number of bytes read to create the rune.

Returns: `OperationStatus.Done` if the source buffer begins with a valid UTF-16 encoded scalar value. `result` then contains the decoded `Rune`, and `charsConsumed` contains the number of `Char` values used in the input buffer to encode the `Rune`.

`OperationStatus.NeedMoreData` if the source buffer is empty or contains only a standalone UTF-16 high surrogate character. `result` then contains `Rune.ReplacementChar`, and `charsConsumed` contains the length of the input buffer.

`OperationStatus.InvalidData` if the source buffer begins with an ill-formed UTF-16 encoded scalar value. `result` then contains `Rune.ReplacementChar`, and `charsConsumed` contains the number of `Char` values used to encode the ill-formed sequence.
.

#### Remarks

This method is very similar to `DecodeFromUtf16`, except it allows the caller to loop backward instead of forward. The typical calling convention is that on each iteration of the loop, the caller should slice off the final `charsConsumed` elements of the `source` buffer.

## Rune.DecodeLastFromUtf8(Byte>, Rune, Int32) method

```csharp
public static System.Buffers.OperationStatus DecodeLastFromUtf8 (ReadOnlySpan<byte> source, out System.Text.Rune value, out int bytesConsumed);
```

Decodes the `Rune` at the end of the provided UTF-8 source buffer.

Parameters:

- `source`: A read-only UTF-8 encoded byte span.
- `value`: When this method returns, the decoded rune.
- `bytesConsumed`: When this method returns, the number of bytes read to create the rune.

Returns: `OperationStatus.Done` if the source buffer ends with a valid UTF-8 encoded scalar value. `value` then contains the decoded `Rune`, and `bytesConsumed` contains the number of `Byte` values used in the input buffer to encode the `Rune`.

`OperationStatus.NeedMoreData` if the source buffer is empty or contains only a standalone UTF-8 high surrogate character. `value` then contains `Rune.ReplacementChar`, and `bytesConsumed` contains the length of the input buffer.

`OperationStatus.InvalidData` if the source buffer ends with an ill-formed UTF-8 encoded scalar value. `value` then contains `Rune.ReplacementChar`, and `bytesConsumed` contains the number of `Byte` values used in the input buffer to encode the ill-formed sequence.

#### Remarks

This method is very similar to `DecodeFromUtf8`, except it allows the caller to loop backward instead of forward. The typical calling convention is that on each iteration of the loop, the caller should slice off the final `bytesConsumed` elements of the `source` buffer.

## Rune.EncodeToUtf16(Char>) method

```csharp
public int EncodeToUtf16 (Span<char> destination);
```

Encodes this `Rune` to a UTF-16 destination buffer.

Parameters:

- `destination`: The buffer to which to write this value as UTF-16.

Returns: The number of `Char` values written to `destination`.

Exceptions:

- `ArgumentException`: `destination` is not large enough to hold the output.

To be added.

## Rune.EncodeToUtf8(Byte>) method

```csharp
public int EncodeToUtf8 (Span<byte> destination);
```

Encodes this `Rune` to a UTF-8 destination buffer.

Parameters:

- `destination`: The buffer to which to write this value as UTF-8.

Returns: The number of `Byte` values written to `destination`.

Exceptions:

- `ArgumentException`: `destination` is not large enough to hold the output.

To be added.

## Rune.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether the current instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if `obj` is of type `Rune` and is equal to the current instance; otherwise, `false`.

To be added.

## Rune.Equals(Rune) method

```csharp
public bool Equals (System.Text.Rune other);
```

Returns a value that indicates whether the current instance and a specified rune are equal.

Parameters:

- `other`: The object to compare with the current instance.

Returns: `true` if the current instance and `other` are equal; otherwise, `false`.

To be added.

## Rune.Equals(Rune, StringComparison) method

```csharp
public bool Equals (System.Text.Rune other, StringComparison comparisonType);
```

To be added.

Parameters:

- `other`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## Rune.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code for this instance.

To be added.

## Rune.GetNumericValue(Rune) method

```csharp
public static double GetNumericValue (System.Text.Rune value);
```

Gets the numeric value associated with the specified rune.

Parameters:

- `value`: The rune for which to get the numeric value.

Returns: The numeric value associated with `value`, or -1 if `value` doesn't represent a numeric character.

#### Remarks

This method has behavior equivalent to `CharUnicodeInfo.GetNumericValue`. Refer to that documentation for more information.

## Rune.GetRuneAt(String, Int32) method

```csharp
public static System.Text.Rune GetRuneAt (string input, int index);
```

Gets the `Rune` that begins at a specified position in a string.

Parameters:

- `input`: The string from which to create the rune.
- `index`: The starting position in `input` at which to create the rune.

Returns: The rune obtained from `input` at the specified `index`.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentException`: `index` does not reference the start of a valid scalar value in `input`.
- `ArgumentOutOfRangeException`: `index` is outside the range of `input`.

#### Remarks

Throws an exception if `input` is `null`, `index` is out of range, or `index` does not reference the start of a valid scalar value within `input`.

## Rune.GetUnicodeCategory(Rune) method

```csharp
public static System.Globalization.UnicodeCategory GetUnicodeCategory (System.Text.Rune value);
```

Gets the Unicode category associated with the specified rune.

Parameters:

- `value`: The rune for which to get the Unicode category.

Returns: The Unicode category associated with `value`.

#### Remarks

This method has behavior equivalent to `CharUnicodeInfo.GetUnicodeCategory`. Refer to that documentation for more information.

## Rune.IsControl(Rune) method

```csharp
public static bool IsControl (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a control character.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a control character; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against `Control`.

Per Unicode stability policies, the set of control characters is permanently fixed to be the union of `[ U+0000..U+001F ]` and `[ U+007F..U+009F ]`.

For more information, see `Char.IsControl`.

## Rune.IsDigit(Rune) method

```csharp
public static bool IsDigit (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a decimal digit.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a decimal digit; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against `DecimalDigitNumber`.

For more information, see `Char.IsDigit`.

## Rune.IsLetter(Rune) method

```csharp
public static bool IsLetter (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a letter.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a letter; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `UppercaseLetter`, `LowercaseLetter`, `TitlecaseLetter`, `ModifierLetter`, and `OtherLetter`.

For more information, see `Char.IsLetter`.

## Rune.IsLetterOrDigit(Rune) method

```csharp
public static bool IsLetterOrDigit (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a letter or a decimal digit.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a letter or a decimal digit; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `UppercaseLetter`, `LowercaseLetter`, `TitlecaseLetter`, `ModifierLetter`, `OtherLetter`, and `DecimalDigitNumber`.

For more information, see `Char.IsLetterOrDigit`.

## Rune.IsLower(Rune) method

```csharp
public static bool IsLower (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a lowercase letter.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a lowercase letter; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory`
and comparing the result against `LowercaseLetter`.

For more information, see `Char.IsLower`.

## Rune.IsNumber(Rune) method

```csharp
public static bool IsNumber (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a number.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a number; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `DecimalDigitNumber`, `LetterNumber`, and `OtherNumber`.

For more information, see `Char.IsNumber`.

## Rune.IsPunctuation(Rune) method

```csharp
public static bool IsPunctuation (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a punctuation mark.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a punctuation mark; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `ConnectorPunctuation`, `DashPunctuation`, `OpenPunctuation`, `ClosePunctuation`, `InitialQuotePunctuation`, `FinalQuotePunctuation`, and `OtherPunctuation`.

For more information, see `Char.IsPunctuation`.

## Rune.IsSeparator(Rune) method

```csharp
public static bool IsSeparator (System.Text.Rune value);
```

Returns a value that indicates whether the specified rune is categorized as a separator character.

Parameters:

- `value`: The rune to evaluate.

Returns: `true` if `value` is a separator character; otherwise, `false`.

#### Remarks

This method is equivalent to querying `GetUnicodeCategory` and comparing the result against any of the values `SpaceSeparator`, `LineSeparator`, and `ParagraphSeparator`.

For more information, see `Char.IsSeparator`.
