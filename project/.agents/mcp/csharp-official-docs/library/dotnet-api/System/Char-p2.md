---
title: "Char struct (part 2 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 2 of 9)

## Char.ConvertFromUtf32(Int32) method

```csharp
public static string ConvertFromUtf32 (int utf32);
```

Converts the specified Unicode code point into a UTF-16 encoded string.

Parameters:

- `utf32`: A 21-bit Unicode code point.

Returns: A string consisting of one `Char` object or a surrogate pair of `Char` objects equivalent to the code point specified by the `utf32` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `utf32` is not a valid 21-bit Unicode code point ranging from U+0 through U+10FFFF, excluding the surrogate pair range from U+D800 through U+DFFF.

#### Remarks
Use this method to convert a 21-bit Unicode code point to a UTF-16 encoded string before testing the string with methods such as `IsLowSurrogate` and `IsHighSurrogate`.

A valid code point outside the Basic <example-value> Plane (BMP) always yields a valid surrogate pair. However, a valid code point within the BMP might not yield a valid result according to the Unicode standard because no linguistic processing is used in the conversion. For that reason, use the `UTF32Encoding` class to convert bulk UTF-32 data into bulk UTF-16 data.

#### Examples
The following code example demonstrates the `Char.ConvertToUtf32` and `Char.ConvertFromUtf32` methods.

_Code sample not included: ~/snippets/csharp/System/Char/ConvertFromUtf32/utf.cs._

## Char.ConvertToUtf32(Char, Char) method

```csharp
public static int ConvertToUtf32 (char highSurrogate, char lowSurrogate);
```

Converts the value of a UTF-16 encoded surrogate pair into a Unicode code point.

Parameters:

- `highSurrogate`: A high surrogate code unit (that is, a code unit ranging from U+D800 through U+DBFF).
- `lowSurrogate`: A low surrogate code unit (that is, a code unit ranging from U+DC00 through U+DFFF).

Returns: The 21-bit Unicode code point represented by the `highSurrogate` and `lowSurrogate` parameters.

Exceptions:

- `ArgumentOutOfRangeException`: `highSurrogate` is not in the range U+D800 through U+DBFF, or `lowSurrogate` is not in the range U+DC00 through U+DFFF.

#### Remarks
Use this method to convert a surrogate pair into a 21-bit Unicode code point. To convert UTF-16 data into UTF-32 data, use the `UTF32Encoding` class.

Ordinarily, UTF-16 encoding represents a single Unicode character as a 16-bit code unit. However, it also supports surrogate pairs, which allow a single abstract character to be represented as two 16-bit code units. These two `Char` objects must have code units that range from U+D800 to U+DBFF for the first (high) surrogate and from U+DC00 to U+DFFF for the second (low) surrogate. Surrogate pairs are supported only by UTF-16 encoding. This method allows a character represented by a UTF-16 surrogate pair to be converted to a character using UTF-32 encoding.

## Char.ConvertToUtf32(String, Int32) method

```csharp
public static int ConvertToUtf32 (string s, int index);
```

Converts the value of a UTF-16 encoded character or surrogate pair at a specified position in a string into a Unicode code point.

Parameters:

- `s`: A string that contains a character or surrogate pair.
- `index`: The index position of the character or surrogate pair in `s`.

Returns: The 21-bit Unicode code point represented by the character or surrogate pair at the position in the `s` parameter specified by the `index` parameter.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is not a position within `s`.
- `ArgumentException`: The specified index position contains a surrogate pair, and either the first character in the pair is not a valid high surrogate or the second character in the pair is not a valid low surrogate.

#### Remarks
Use this method to convert a character or surrogate pair into a 21-bit Unicode code point. To convert UTF-16 data into UTF-32 data, use the `UTF32Encoding` class.

## Char.Equals(Char) method

```csharp
public bool Equals (char obj);
```

Returns a value that indicates whether this instance is equal to the specified `Char` object.

Parameters:

- `obj`: An object to compare to this instance.

Returns: `true` if the `obj` parameter equals the value of this instance; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than `Equals` because it does not need to unbox the `obj` parameter.

## Char.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance or `null`.

Returns: `true` if `obj` is an instance of `Char` and equals the value of this instance; otherwise, `false`.

#### Remarks
The comparison performed by this method is based on the encoded values of this instance and `obj`, not necessarily their lexicographical characteristics.

#### Examples
The following code example demonstrates `Char.Equals`.

_Code sample not included: ~/snippets/csharp/System/Char/Equals/equals.cs._

## Char.Equals(Char, StringComparison) method

```csharp
public bool Equals (char other, StringComparison comparisonType);
```

To be added.

Parameters:

- `other`: To be added.
- `comparisonType`: To be added.

Returns: To be added.

To be added.

## Char.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Char.GetNumericValue(Char) method

```csharp
public static double GetNumericValue (char c);
```

Converts the specified numeric Unicode character to a double-precision floating point number.

Parameters:

- `c`: The Unicode character to convert.

Returns: The numeric value of `c` if that character represents a number; otherwise, -1.0.

#### Remarks
The `c` parameter must be the `Char` representation of a numeric value. For example, if `c` is "5", the return value is 5. However, if `c` is "z", the return value is -1.0.

A character has an associated numeric value if and only if it is a member of one of the following `UnicodeCategory` categories: `DecimalDigitNumber`, `LetterNumber`, or `OtherNumber`.

The `Char.GetNumericValue` method assumes that `c` corresponds to a single linguistic character and checks whether that character can be converted to a decimal digit. However, some numbers in the Unicode standard are represented by two `Char` objects that form a surrogate pair. For example, the Aegean numbering system consists of code points U+10107 through U+10133. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents AEGEAN NUMBER ONE. As the output from the example shows, the `GetNumericValue` method returns -1 if it is passed either a high surrogate or a low surrogate of this character.

_Code sample not included: ~/snippets/csharp/System/Char/GetNumericValue/getnumericvalue1.cs._

#### Examples
The following example demonstrates `Char.GetNumericValue`.

_Code sample not included: ~/snippets/csharp/System/Char/GetNumericValue/getnumericvalue.cs._

## Char.GetNumericValue(String, Int32) method

```csharp
public static double GetNumericValue (string s, int index);
```

Converts the numeric Unicode character at the specified position in a specified string to a double-precision floating point number.

Parameters:

- `s`: A `String`.
- `index`: The character position in `s`.

Returns: The numeric value of the character at position `index` in `s` if that character represents a number; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
The `s` parameter must be the string representation of a numeric value. For example, if the character at position `index` in `s` is "5", the return value is 5. However, if the character at position `index` in `s` is "z", the return value is -1.

Character positions in a string are indexed starting from zero.

A character has an associated numeric value if and only if it is a member of one of the following `UnicodeCategory` categories: `DecimalDigitNumber`, `LetterNumber`, or `OtherNumber`.

If the `Char` object at position `index` is the first character of a valid surrogate pair, the `GetNumericValue` method determines whether the surrogate pair forms a numeric digit. For example, the Aegean numbering system consists of code points U+10107 through U+10133. The following example uses the `Char.ConvertFromUtf32` method to instantiate a string that represents each Aegean number. As the output from the example shows, the `GetNumericValue` method returns the correct numeric value if it is passed the high surrogate of an Aegean number. However, if it is passed the low surrogate, it considers only the low surrogate in isolation and returns -1.

_Code sample not included: ~/snippets/csharp/System/Char/GetNumericValue/getnumericvalue1.cs._

#### Examples
The following code example demonstrates `Char.GetNumericValue`.

_Code sample not included: ~/snippets/csharp/System/Char/GetNumericValue/getnumericvalue.cs._

## Char.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `Char`.

Returns: The enumerated constant, `TypeCode.Char`.

To be added.

## Char.GetUnicodeCategory(Char) method

```csharp
public static System.Globalization.UnicodeCategory GetUnicodeCategory (char c);
```

Categorizes a specified Unicode character into a group identified by one of the `UnicodeCategory` values.

Parameters:

- `c`: The Unicode character to categorize.

Returns: A `UnicodeCategory` value that identifies the group that contains `c`.

#### Remarks
The `Char.GetUnicodeCategory` method does not always return the same `UnicodeCategory` value as the `GetUnicodeCategory` method when it is passed a particular character as a parameter. The `GetUnicodeCategory` method is designed to reflect the current version of the Unicode standard. In contrast, although the `Char.GetUnicodeCategory` method usually reflects the current version of the Unicode standard, it may return a character's category based on a previous version of the standard or it may return a category that differs from the current standard in order to preserve backward compatibility. As a result, we recommend that you use the `GetUnicodeCategory` method instead of `GetUnicodeCategory`.

Unicode characters are classified based on The Unicode Standard, Version 8.0.0.

## Char.GetUnicodeCategory(String, Int32) method

```csharp
public static System.Globalization.UnicodeCategory GetUnicodeCategory (string s, int index);
```

Categorizes the character at the specified position in a specified string into a group identified by one of the `UnicodeCategory` values.

Parameters:

- `s`: A `String`.
- `index`: The character position in `s`.

Returns: A `UnicodeCategory` enumerated constant that identifies the group that contains the character at position `index` in `s`.

Exceptions:

- `ArgumentNullException`: `s` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than zero or greater than the last position in `s`.

#### Remarks
Character positions in a string are indexed starting from zero.

The `Char.GetUnicodeCategory` method does not always return the same `UnicodeCategory` value as the `GetUnicodeCategory` method when it is passed a particular character as a parameter. The `GetUnicodeCategory` method is designed to reflect the current version of the Unicode standard. In contrast, although the `Char.GetUnicodeCategory` method usually reflects the current version of the Unicode standard, it may return a character's category based on a previous version of the standard or it may return a category that differs from the current standard in order to preserve backward compatibility. As a result, we recommend that you use the `GetUnicodeCategory` method instead of `GetUnicodeCategory`.

Unicode characters are classified based on The Unicode Standard, Version 8.0.0.

## Char.IsAscii(Char) method

```csharp
public static bool IsAscii (char c);
```

Returns `true` if `c` is an ASCII character ([ U+0000..U+007F ]).

Parameters:

- `c`: The character to analyze.

Returns: `true` if `c` is an ASCII character; `false` otherwise.

#### Remarks

Per http://www.unicode.org/glossary/#ASCII, ASCII is only U+0000..U+007F.

## Char.IsAsciiDigit(Char) method

```csharp
public static bool IsAsciiDigit (char c);
```

Indicates whether a character is categorized as an ASCII digit.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is an ASCII digit; otherwise, `false`.

#### Remarks

This method determines whether the character is in the range '0' through '9', inclusive.

## Char.IsAsciiHexDigit(Char) method

```csharp
public static bool IsAsciiHexDigit (char c);
```

Indicates whether a character is categorized as an ASCII hexadecimal digit.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is a hexadecimal digit; otherwise, `false`.

#### Remarks

This method determines whether the character is in the range '0' through '9', inclusive,
'A' through 'F', inclusive, or 'a' through 'f', inclusive.

## Char.IsAsciiHexDigitLower(Char) method

```csharp
public static bool IsAsciiHexDigitLower (char c);
```

Indicates whether a character is categorized as an ASCII lower-case hexadecimal digit.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is a lower-case hexadecimal digit; otherwise, `false`.

#### Remarks

This determines whether the character is in the range '0' through '9', inclusive,
or 'a' through 'f', inclusive.

## Char.IsAsciiHexDigitUpper(Char) method

```csharp
public static bool IsAsciiHexDigitUpper (char c);
```

Indicates whether a character is categorized as an ASCII upper-case hexadecimal digit.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is a hexadecimal digit; otherwise, `false`.

#### Remarks

This determines whether the character is in the range '0' through '9', inclusive,
or 'A' through 'F', inclusive.

## Char.IsAsciiLetter(Char) method

```csharp
public static bool IsAsciiLetter (char c);
```

Indicates whether a character is categorized as an ASCII letter.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is an ASCII letter; otherwise, `false`.

#### Remarks

This determines whether the character is in the range 'A' through 'Z', inclusive,
or 'a' through 'z', inclusive.

## Char.IsAsciiLetterLower(Char) method

```csharp
public static bool IsAsciiLetterLower (char c);
```

Indicates whether a character is categorized as a lowercase ASCII letter.

Parameters:

- `c`: The character to evaluate.

Returns: `true` if `c` is a lowercase ASCII letter; otherwise, `false`.

#### Remarks

This determines whether the character is in the range 'a' through 'z', inclusive.
