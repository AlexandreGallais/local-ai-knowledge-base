---
title: "Char struct (part 3 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 3 of 9)

## Char.IsAsciiLetterOrDigit(Char) method

```csharp
public static bool IsAsciiLetterOrDigit (char c);
```

Indicates whether a character is categorized as an ASCII letter or digit.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is an ASCII letter or digit; otherwise, `false`.

#### Remarks

This determines whether the character is in the range 'A' through 'Z', inclusive, 'a' through 'z', inclusive, or '0' through '9', inclusive.

## Char.IsAsciiLetterUpper(Char) method

```csharp
public static bool IsAsciiLetterUpper (char c);
```

Indicates whether a character is categorized as an uppercase ASCII letter.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is an uppercase ASCII letter; otherwise, `false`.

#### Remarks

This determines whether the character is in the range 'A' through 'Z', inclusive.

## Char.IsBetween(Char, Char, Char) method

```csharp
public static bool IsBetween (char c, char minInclusive, char maxInclusive);
```

Indicates whether a character is within the specified inclusive range.

Parameters:

- `c`: The character to evaluate.
- `minInclusive`: The lower bound, inclusive.
- `maxInclusive`: The upper bound, inclusive.

Returns: `true` if `c` is within the specified range; otherwise, `false`.

#### Remarks

The method does not validate that `maxInclusive` is greater than or equal
to `minInclusive`.  If `maxInclusive` is less than
`minInclusive`, the behavior is undefined.

## Char.IsControl(Char) method

```csharp
public static bool IsControl (char c);
```

Indicates whether the specified Unicode character is categorized as a control character.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a control character; otherwise, `false`.

#### Examples
The following example lists the Unicode code point of each of the control characters.

_Code sample not included: ~/snippets/csharp/System/Char/IsControl/IsControl1.cs._

## Char.IsControl(String, Int32) method

```csharp
public static bool IsControl (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a control character.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a control character; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Examples
The following example enumerates the characters in a string and determines whether any are control characters.

_Code sample not included: ~/snippets/csharp/System/Char/IsControl/IsControl2.cs._

## Char.IsDigit(Char) method

```csharp
public static bool IsDigit (char c);
```

Indicates whether the specified Unicode character is categorized as a decimal digit.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a decimal digit; otherwise, `false`.

#### Remarks
This method determines whether a `Char` is a radix-10 digit. This contrasts with `Char.IsNumber`, which determines whether a `Char` is of any numeric Unicode category. Numbers include characters such as fractions, subscripts, superscripts, Roman numerals, currency numerators, encircled numbers, and script-specific digits.

Valid digits are members of the `DecimalDigitNumber` category.

## Char.IsDigit(String, Int32) method

```csharp
public static bool IsDigit (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a decimal digit.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a decimal digit; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
This method determines whether a `Char` is a radix-10 digit. This contrasts with `Char.IsNumber`, which determines whether a `Char` is of any numeric Unicode category. Numbers include characters such as fractions, subscripts, superscripts, Roman numerals, currency numerators, encircled numbers, and script-specific digits.

Character positions in a string are indexed starting from zero.

Valid digits are members of the `DecimalDigitNumber` category.

## Char.IsHighSurrogate(Char) method

```csharp
public static bool IsHighSurrogate (char c);
```

Indicates whether the specified `Char` object is a high surrogate.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if the numeric value of the `c` parameter ranges from U+D800 through U+DBFF; otherwise, `false`.

#### Remarks
In addition to representing single characters using a 16-bit code point, UTF-16 encoding allows abstract characters to be represented using two 16-bit code points, which is known as a surrogate pair. The first element in this pair is the high surrogate. Its code point can range from U+D800 to U+DBFF. An individual surrogate has no interpretation of its own; it is meaningful only when used as part of a surrogate pair.

## Char.IsHighSurrogate(String, Int32) method

```csharp
public static bool IsHighSurrogate (string s, int index);
```

Indicates whether the `Char` object at the specified position in a string is a high surrogate.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the numeric value of the specified character in the `s` parameter ranges from U+D800 through U+DBFF; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is not a position within `s`.

#### Remarks
The `index` parameter is zero-based.

In addition to representing single characters using a 16-bit code point, UTF-16 encoding allows abstract characters to be represented using two 16-bit code points, which is known as a surrogate pair. The first element in this pair is the high surrogate. Its code point can range from U+D800 to U+DBFF. An individual surrogate has no interpretation of its own; it is meaningful only when used as part of a surrogate pair.

## Char.IsLetter(Char) method

```csharp
public static bool IsLetter (char c);
```

Indicates whether the specified Unicode character is categorized as a Unicode letter.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a letter; otherwise, `false`.

#### Remarks
This method determines whether a `Char` is a member of any category of Unicode letter. Unicode letters include the following:

- Uppercase letters, such as U+0041 (LATIN CAPITAL LETTER A) through U+005A (LATIN CAPITAL LETTER Z), or U+0400 (CYRILLIC CAPITAL LETTER IE WITH GRAVE) through U+042F (CYRILLIC CAPITAL LETTER YA). These characters are members of the `UppercaseLetter` category.

- Lowercase letters, such as U+0061 (LATIN SMALL LETTER A) through U+007A (LATIN SMALL LETTER Z), or U+03AC (GREEK SMALL LETTER ALPHA WITH TONOS) through U+03CE (GREEK SMALL LETTER OMEGA WITH TONOS). These characters are members of the `LowercaseLetter` category.

- Title case letters, such as U+01C5 (LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON) or U+1FFC (GREEK CAPITAL LETTER OMEGA WITH PROSGEGRAMMENI). These characters are members of the `TitlecaseLetter` category.

- Modifiers, such as U+02B0 (MODIFIER LETTER SMALL H) through U+02C1 (MODIFIER LETTER REVERSED GLOTTAL STOP), or U+1D2C (MODIFIER LETTER CAPITAL A) through U+1D61 (MODIFIER LETTER SMALL CHI). These characters are members of the `ModifierLetter` category.

- Other letters, such as U+05D0 (HEBREW LETTER ALEF) through U+05EA (HEBREW LETTER TAV), U+0621 (ARABIC LETTER HAMZA) through U+063A (ARABIC LETTER GHAIN), or U+4E00 (\<CJK Ideograph, First>) through U+9FC3 (\<CJK Ideograph, Last>). These characters are members of the `OtherLetter` category.

## Char.IsLetter(String, Int32) method

```csharp
public static bool IsLetter (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a Unicode letter.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a letter; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

This method determines whether the character at a specified index position in a string is a member of any category of Unicode letter. Unicode letters include the following:

- Uppercase letters, such as U+0041 (LATIN CAPITAL LETTER A) through U+005A (LATIN CAPITAL LETTER Z), or U+0400 (CYRILLIC CAPITAL LETTER IE WITH GRAVE) through U+042F (CYRILLIC CAPITAL LETTER YA). These characters are members of the `UppercaseLetter` category.

- Lowercase letters, such as U+0061 (LATIN SMALL LETTER A) through U+007A (LATIN SMALL LETTER Z), or U+03AC (GREEK SMALL LETTER ALPHA WITH TONOS) through U+03CE (GREEK SMALL LETTER OMEGA WITH TONOS). These characters are members of the `LowercaseLetter` category.

- Title case letters, such as U+01C5 (LATIN CAPITAL LETTER D WITH SMALL LETTER Z WITH CARON) or U+1FFC (GREEK CAPITAL LETTER OMEGA WITH PROSGEGRAMMENI). These characters are members of the `TitlecaseLetter` category.

- Modifiers, such as U+02B0 (MODIFIER LETTER SMALL H) through U+02C1 (MODIFIER LETTER REVERSED GLOTTAL STOP), or U+1D2C (MODIFIER LETTER CAPITAL A) through U+1D61 (MODIFIER LETTER SMALL CHI). These characters are members of the `ModifierLetter` category.

- Other letters, such as U+05D0 (HEBREW LETTER ALEF) through U+05EA (HEBREW LETTER TAV), U+0621 (ARABIC LETTER HAMZA) through U+063A (ARABIC LETTER GHAIN), or U+4E00 (\<CJK Ideograph, First>) through U+9FC3 (\<CJK Ideograph, Last>). These characters are members of the `OtherLetter` category.

## Char.IsLetterOrDigit(Char) method

```csharp
public static bool IsLetterOrDigit (char c);
```

Indicates whether the specified Unicode character is categorized as a letter or a decimal digit.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a letter or a decimal digit; otherwise, `false`.

#### Remarks
Valid letters and decimal digits are members of the following categories in `UnicodeCategory`: `UppercaseLetter`, `LowercaseLetter`, `TitlecaseLetter`, `ModifierLetter`, `OtherLetter`, or `DecimalDigitNumber`.

## Char.IsLetterOrDigit(String, Int32) method

```csharp
public static bool IsLetterOrDigit (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a letter or a decimal digit.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a letter or a decimal digit; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

Valid letters and decimal digits are members of the following categories in `UnicodeCategory`: `UppercaseLetter`, `LowercaseLetter`, `TitlecaseLetter`, `ModifierLetter`, `OtherLetter`, or `DecimalDigitNumber`.

## Char.IsLower(Char) method

```csharp
public static bool IsLower (char c);
```

Indicates whether the specified Unicode character is categorized as a lowercase letter.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a lowercase letter; otherwise, `false`.

#### Remarks
Valid lowercase letters are members of the following category in `UnicodeCategory`: `LowercaseLetter`.

## Char.IsLower(String, Int32) method

```csharp
public static bool IsLower (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a lowercase letter.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a lowercase letter; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

Valid lowercase letters are members of the following category in `UnicodeCategory`: `LowercaseLetter`.

## Char.IsLowSurrogate(Char) method

```csharp
public static bool IsLowSurrogate (char c);
```

Indicates whether the specified `Char` object is a low surrogate.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if the numeric value of the `c` parameter ranges from U+DC00 through U+DFFF; otherwise, `false`.

#### Remarks
In addition to representing single characters using a 16-bit code point, UTF-16 encoding allows abstract characters to be represented using two 16-bit code points, which is known as a surrogate pair. The second element in this pair is the low surrogate. Its code point can range from U+DC00 to U+DFFF. An individual surrogate has no interpretation of its own; it is meaningful only when used as part of a surrogate pair.

## Char.IsLowSurrogate(String, Int32) method

```csharp
public static bool IsLowSurrogate (string s, int index);
```

Indicates whether the `Char` object at the specified position in a string is a low surrogate.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the numeric value of the specified character in the `s` parameter ranges from U+DC00 through U+DFFF; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is not a position within `s`.

#### Remarks
The `index` parameter is zero-based.

In addition to representing single characters using a 16-bit code point, UTF-16 encoding allows abstract characters to be represented using two 16-bit code points, which is known as a surrogate pair. The second element in this pair is the low surrogate. Its code point can range from U+DC00 to U+DFFF. An individual surrogate has no interpretation of its own; it is meaningful only when used as part of a surrogate pair.
