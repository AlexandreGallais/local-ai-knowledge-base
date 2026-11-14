---
title: "Char struct (part 4 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 4 of 9)

## Char.IsNumber(Char) method

```csharp
public static bool IsNumber (char c);
```

Indicates whether the specified Unicode character is categorized as a number.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a number; otherwise, `false`.

#### Remarks
This method determines whether a `Char` is of any numeric Unicode category. In addition to including digits, numbers include characters, fractions, subscripts, superscripts, Roman numerals, currency numerators, and encircled numbers. This method contrasts with the `Char.IsDigit` method, which determines whether a `Char` is a radix-10 digit.

> **Important:**
>  The `IsNumber` method is not intended to determine whether a string consists of numeric characters (for example, by calling the method for each character in a string). To determine whether a string consists of numeric characters, call one of the overloads of the `TryParse` method (such as `Int32.TryParse` or `Double.TryParse` of an integral or floating point type.

Valid numbers are members of the `DecimalDigitNumber`, `LetterNumber`, or `OtherNumber` category.

The `IsNumber` method assumes that `c` corresponds to a single linguistic character and checks whether that character represents a number. However, some numbers in the Unicode standard are represented by two `Char` objects that form a surrogate pair. For example, the Aegean numbering system consists of code points U+10107 through U+10133. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents AEGEAN NUMBER ONE. As the output from the example shows, the `IsNumber` method returns `false` if it is passed either a high surrogate or a low surrogate of this character.

_Code sample not included: ~/snippets/csharp/System/Char/IsNumber/isnumber1.cs._

#### Examples
The following example demonstrates `Char.IsNumber`.

_Code sample not included: ~/snippets/csharp/System/Char/IsNumber/isnumber.cs._

## Char.IsNumber(String, Int32) method

```csharp
public static bool IsNumber (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a number.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a number; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
This method determines whether a `Char` is of any numeric Unicode category. In addition to including digits, numbers include characters, fractions, subscripts, superscripts, Roman numerals, currency numerators, and encircled numbers. This method contrasts with the `Char.IsDigit` method, which determines whether a `Char` is a radix-10 digit.

Character positions in a string are indexed starting from zero.

> **Important:**
>  The `IsNumber` method is not intended to determine whether a string consists of numeric characters (for example, by calling the method for each character in a string). To determine whether a string consists of numeric characters, call one of the overloads of the `TryParse` method (such as `Int32.TryParse` or `Double.TryParse` of an integral or floating point type.

Valid numbers are members of the `DecimalDigitNumber`, `LetterNumber`, or `OtherNumber` category.

If the `Char` object at position `index` is the first character of a valid surrogate pair, the `IsNumber` method determines whether the surrogate pair forms a numeric digit. For example, the Aegean numbering system consists of code points U+10107 through U+10133. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents AEGEAN NUMBER ONE. As the output from the example shows, the `IsNumber` method returns `true` if it is passed the high surrogate of AEGEAN NUMBER ONE. However, if it is passed the low surrogate, it considers only the category of the low surrogate and returns `false`.

_Code sample not included: ~/snippets/csharp/System/Char/IsNumber/isnumber1.cs._

#### Examples
The following example demonstrates `Char.IsNumber`.

_Code sample not included: ~/snippets/csharp/System/Char/IsNumber/isnumber.cs._

## Char.IsPunctuation(Char) method

```csharp
public static bool IsPunctuation (char c);
```

Indicates whether the specified Unicode character is categorized as a punctuation mark.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a punctuation mark; otherwise, `false`.

#### Remarks
Valid punctuation marks are members of the following categories in `UnicodeCategory`: `ConnectorPunctuation`, `DashPunctuation`, `OpenPunctuation`, `ClosePunctuation`, `InitialQuotePunctuation`, `FinalQuotePunctuation`, or `OtherPunctuation`. They include characters with the following Unicode code points:

- U+0021 to U+0023
- U+060C and U+060D
- U+1800 to U+180A
- U+3014 to U+301F
- U+0025 to U+002A
- U+061B
- U+1944 and U+1945
- U+3030
- U+002C to U+002F
- U+061E and U+061F
- U+19DE and U+19DF
- U+303D
- U+003A and U+003B
- U+066A to U+066D
- U+1A1E and U+1A1F
- U+30A0
- U+003F and U+0040
- U+06D4
- U+1B5A to U+1B60
- U+30FB
- U+005B to U+005D
- U+0700 to U+070D
- U+2010 to U+2027
- U+A874 to U+A877
- U+005F
- U+07F7 to U+07F9
- U+2030 to U+2043
- U+FD3E and U+FD3F
- U+007B
- U+0964 and U+0965
- U+2045 to U+2051
- U+FE10 to U+FE19
- U+007D
- U+0970
- U+2053 to U+205E
- U+FE30 to U+FE52
- U+00A1
- U+0DF4
- U+207D and  U+207E
- U+FE54 to U+FE61
- U+00AB
- U+0E4F to U+0E5B
- U+208D and U+208E
- U+FE63
- U+00AD
- U+0F04 to U+0F12
- U+2329 and U+232A
- U+FE68
- U+00B7
- U+0F3A to U+0F3D
- U+2768 to U+2775
- U+FE6A and U+FE6B
- U+00BB
- U+0F85
- U+27C5 to U+27C6
- U+FF01 to U+FF03
- U+00BF
- U+0FD0 and U+0FD1
- U+27E6 to U+27EB
- U+FF05 to U+FF0A
- U+037E
- U+104A to U+104F
- U+2983 to U+2998
- U+FF0C to U+FF0F
- U+0387
- U+10FB
- U+29D8 to U+29DB
- U+FF1A and U+FF1B
- U+055A to U+055F
- U+1361 to U+1368
- U+29FC and U+29FD
- U+FF1F and U+FF20
- U+0589 and U+058A
- U+166D and U+166E
- U+2CF9 to U+2CFC
- U+FF3B to U+FF3D
- U+05BE
- U+169B and U+169C
- U+2CFE and U+2CFF
- U+FF3F
- U+05C0
- U+16EB to U+16ED
- U+2E00 to U+2E17
- U+FF5B
- U+05C3
- U+1735 and U+1736
- U+2E1C and U+2E1D
- U+FF5D
- U+05C6
- U+17D4 to U+17D6
- U+3001 to U+3003
- U+FF5F to U+FF65
- U+05F3 and U+05F4
- U+17D8 to U+17DA
- U+3008 to U+3011

## Char.IsPunctuation(String, Int32) method

```csharp
public static bool IsPunctuation (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a punctuation mark.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a punctuation mark; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

Valid punctuation marks are members of the following categories in `UnicodeCategory`: `ConnectorPunctuation`, `DashPunctuation`, `OpenPunctuation`, `ClosePunctuation`, `InitialQuotePunctuation`, `FinalQuotePunctuation`, or `OtherPunctuation`. They include characters with the following Unicode code points:

- U+0021 to U+0023
- U+060C and U+060D
- U+1800 to U+180A
- U+3014 to U+301F
- U+0025 to U+002A
- U+061B
- U+1944 and U+1945
- U+3030
- U+002C to U+002F
- U+061E and U+061F
- U+19DE and U+19DF
- U+303D
- U+003A and U+003B
- U+066A to U+066D
- U+1A1E and U+1A1F
- U+30A0
- U+003F and U+0040
- U+06D4
- U+1B5A to U+1B60
- U+30FB
- U+005B to U+005D
- U+0700 to U+070D
- U+2010 to U+2027
- U+A874 to U+A877
- U+005F
- U+07F7 to U+07F9
- U+2030 to U+2043
- U+FD3E and U+FD3F
- U+007B
- U+0964 and U+0965
- U+2045 to U+2051
- U+FE10 to U+FE19
- U+007D
- U+0970
- U+2053 to U+205E
- U+FE30 to U+FE52
- U+00A1
- U+0DF4
- U+207D and  U+207E
- U+FE54 to U+FE61
- U+00AB
- U+0E4F to U+0E5B
- U+208D and U+208E
- U+FE63
- U+00AD
- U+0F04 to U+0F12
- U+2329 and U+232A
- U+FE68
- U+00B7
- U+0F3A to U+0F3D
- U+2768 to U+2775
- U+FE6A and U+FE6B
- U+00BB
- U+0F85
- U+27C5 to U+27C6
- U+FF01 to U+FF03
- U+00BF
- U+0FD0 and U+0FD1
- U+27E6 to U+27EB
- U+FF05 to U+FF0A
- U+037E
- U+104A to U+104F
- U+2983 to U+2998
- U+FF0C to U+FF0F
- U+0387
- U+10FB
- U+29D8 to U+29DB
- U+FF1A and U+FF1B
- U+055A to U+055F
- U+1361 to U+1368
- U+29FC and U+29FD
- U+FF1F and U+FF20
- U+0589 and U+058A
- U+166D and U+166E
- U+2CF9 to U+2CFC
- U+FF3B to U+FF3D
- U+05BE
- U+169B and U+169C
- U+2CFE and U+2CFF
- U+FF3F
- U+05C0
- U+16EB to U+16ED
- U+2E00 to U+2E17
- U+FF5B
- U+05C3
- U+1735 and U+1736
- U+2E1C and U+2E1D
- U+FF5D
- U+05C6
- U+17D4 to U+17D6
- U+3001 to U+3003
- U+FF5F to U+FF65
- U+05F3 and U+05F4
- U+17D8 to U+17DA
- U+3008 to U+3011

## Char.IsSeparator(Char) method

```csharp
public static bool IsSeparator (char c);
```

Indicates whether the specified Unicode character is categorized as a separator character.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is a separator character; otherwise, `false`.

#### Remarks
The Unicode standard recognizes three subcategories of separators:

- Space separators (the `SpaceSeparator` category), which includes characters such as \u0020.

- Line separators (the `LineSeparator` category), which includes \u2028.

- Paragraph separators (the `ParagraphSeparator` category), which includes \u2029.

> **Note:**
>  The Unicode standard classifies the characters \u000A (LF), \u000C (FF), and \u000D (CR) as control characters (members of the `Control` category), not as separator characters.

#### Examples
The following example lists the `Char` objects that are classified as separator characters.

_Code sample not included: ~/snippets/csharp/System/Char/IsSeparator/isseparator1.cs._

## Char.IsSeparator(String, Int32) method

```csharp
public static bool IsSeparator (string s, int index);
```

Indicates whether the character at the specified position in a specified string is categorized as a separator character.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a separator character; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

The Unicode standard recognizes three subcategories of separators:

- Space separators (the `SpaceSeparator` category), which includes characters such as \u0020.

- Line separators (the `LineSeparator` category), which includes \u2028.

- Paragraph separators (the `ParagraphSeparator` category), which includes \u2029.

> **Note:**
>  The Unicode standard classifies the characters \u000A (LF), \u000C (FF), and \u000D (CR) as control characters (members of the `Control` category), not as separator characters.

#### Examples
The following example demonstrates `Char.IsSeparator`.

_Code sample not included: ~/snippets/csharp/System/Char/IsSeparator/isseparator.cs._

## Char.IsSurrogate(Char) method

```csharp
public static bool IsSurrogate (char c);
```

Indicates whether the specified character has a surrogate code unit.

Parameters:

- `c`: The Unicode character to evaluate.

Returns: `true` if `c` is either a high surrogate or a low surrogate; otherwise, `false`.

#### Remarks
A surrogate is a `Char` object with a UTF-16 code unit in the range from U+D800 to U+DFFF. Each character with a code unit in this range belongs to the `Surrogate` category. The individual surrogate code unit has no interpretation of its own, but has meaning only when used as part of a surrogate pair. For more information about surrogate pairs, see the Unicode Standard at the Unicode home page.

## Char.IsSurrogate(String, Int32) method

```csharp
public static bool IsSurrogate (string s, int index);
```

Indicates whether the character at the specified position in a specified string has a surrogate code unit.

Parameters:

- `s`: A string.
- `index`: The position of the character to evaluate in `s`.

Returns: `true` if the character at position `index` in `s` is a either a high surrogate or a low surrogate; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

A surrogate is a `Char` object with a UTF-16 code unit in the range from U+D800 to U+DFFF. Each character with a code unit in this range belongs to the `Surrogate` category. The individual surrogate code unit has no interpretation of its own, but has meaning only when used as part of a surrogate pair. For more information about surrogate pairs, see the Unicode Standard at the Unicode home page.

## Char.IsSurrogatePair(Char, Char) method

```csharp
public static bool IsSurrogatePair (char highSurrogate, char lowSurrogate);
```

Indicates whether the two specified `Char` objects form a surrogate pair.

Parameters:

- `highSurrogate`: The character to evaluate as the high surrogate of a surrogate pair.
- `lowSurrogate`: The character to evaluate as the low surrogate of a surrogate pair.

Returns: `true` if the numeric value of the `highSurrogate` parameter ranges from U+D800 through U+DBFF, and the numeric value of the `lowSurrogate` parameter ranges from U+DC00 through U+DFFF; otherwise, `false`.

#### Remarks
Ordinarily, a single character is represented by a single 16-bit Unicode code unit. UTF-16 encoding also supports surrogate pairs, which allow a single abstract character to be represented by two 16-bit code units. The first code unit, whose value can range from U+D800 to U+DBFF, is the high surrogate. The second code unit, whose value can range from U+DC00 to U+DFFF, is the low surrogate. Individual surrogate code points have no interpretation of their own. For more information about surrogates and the Unicode Standard, see the Unicode home page.
