---
title: "Char struct (part 8 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 8 of 9)

## Char.System.Numerics.INumberBase<System.Char>.TryConvertToSaturating<TOther>(Char, TOther) method

```csharp
static bool INumberBase<char>.TryConvertToSaturating<TOther> (char value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, saturating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryConvertToTruncating<TOther>(Char, TOther) method

```csharp
static bool INumberBase<char>.TryConvertToTruncating<TOther> (char value, out TOther result) where TOther : System.Numerics.INumberBase<TOther>;
```

Tries to convert an instance of the the current type to another type, truncating any values that fall outside the representable range of the current type.

Parameters:

- `TOther`: The type to which `value` should be converted.
- `value`: The value that's used to create the instance of `TOther`.
- `result`: When this method returns, contains an instance of `TOther` converted from `value`.

Returns: `false` if `TOther` is not supported; otherwise, `true`.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryConvertFromChecked<TOther>(TOther, Char) method

```csharp
static bool INumberBase<char>.TryConvertFromChecked<TOther> (TOther value, out char result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryConvertFromSaturating<TOther>(TOther, Char) method

```csharp
static bool INumberBase<char>.TryConvertFromSaturating<TOther> (TOther value, out char result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryConvertFromTruncating<TOther>(TOther, Char) method

```csharp
static bool INumberBase<char>.TryConvertFromTruncating<TOther> (TOther value, out char result) where TOther : System.Numerics.INumberBase<TOther>;
```

To be added.

Parameters:

- `TOther`: To be added.
- `value`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryParse(Char>, NumberStyles, IFormatProvider, Char) method

```csharp
static bool INumberBase<char>.TryParse (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider provider, out char result);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryParse(String, NumberStyles, IFormatProvider, Char) method

```csharp
static bool INumberBase<char>.TryParse (string s, System.Globalization.NumberStyles style, IFormatProvider provider, out char result);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryParsePartial(Byte>, NumberStyles, IFormatProvider, Char, Int32) method

```csharp
static bool INumberBase<char>.TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider provider, out char result, out int bytesConsumed);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `bytesConsumed`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryParsePartial(Char>, NumberStyles, IFormatProvider, Char, Int32) method

```csharp
static bool INumberBase<char>.TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider provider, out char result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.INumberBase<System.Char>.TryParsePartial(String, NumberStyles, IFormatProvider, Char, Int32) method

```csharp
static bool INumberBase<char>.TryParsePartial (string s, System.Globalization.NumberStyles style, IFormatProvider provider, out char result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## Char.System.Numerics.IShiftOperators<System.Char,System.Int32,System.Char>.op_LeftShift(Char, Int32) method

```csharp
static char IShiftOperators<char,int,char>.operator << (char value, int shiftAmount);
```

Shifts a value left by a given amount.

Parameters:

- `value`: The value that is shifted left by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted left.

Returns: The result of shifting `value` left by `shiftAmount`.

To be added.

## Char.System.Numerics.IShiftOperators<System.Char,System.Int32,System.Char>.op_RightShift(Char, Int32) method

```csharp
static char IShiftOperators<char,int,char>.operator >> (char value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Char.System.Numerics.IShiftOperators<System.Char,System.Int32,System.Char>.op_UnsignedRightShift(Char, Int32) method

```csharp
static char IShiftOperators<char,int,char>.op_UnsignedRightShift (char value, int shiftAmount);
```

Shifts a value right by a given amount.

Parameters:

- `value`: The value that is shifted right by `shiftAmount`.
- `shiftAmount`: The amount by which `value` is shifted right.

Returns: The result of shifting `value` right by `shiftAmount`.

To be added.

## Char.System.Numerics.ISubtractionOperators<System.Char,System.Char,System.Char>.op_CheckedSubtraction(Char, Char) method

```csharp
static char ISubtractionOperators<char,char,char>.op_CheckedSubtraction (char left, char right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Char.System.Numerics.ISubtractionOperators<System.Char,System.Char,System.Char>.op_Subtraction(Char, Char) method

```csharp
static char ISubtractionOperators<char,char,char>.operator - (char left, char right);
```

Subtracts two values to compute their difference.

Parameters:

- `left`: The value from which `right` is subtracted.
- `right`: The value that's subtracted from `left`.

Returns: The value of `right` subtracted from `left`.

To be added.

## Char.System.Numerics.IUnaryNegationOperators<System.Char,System.Char>.op_CheckedUnaryNegation(Char) method

```csharp
static char IUnaryNegationOperators<char,char>.op_CheckedUnaryNegation (char value);
```

Computes the checked unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Char.System.Numerics.IUnaryNegationOperators<System.Char,System.Char>.op_UnaryNegation(Char) method

```csharp
static char IUnaryNegationOperators<char,char>.operator - (char value);
```

Computes the unary negation of a value.

Parameters:

- `value`: The value for which to compute the unary negation.

Returns: The unary negation of `value`.

To be added.

## Char.System.Numerics.IUnaryPlusOperators<System.Char,System.Char>.op_UnaryPlus(Char) method

```csharp
static char IUnaryPlusOperators<char,char>.operator + (char value);
```

Computes the unary plus of a value.

Parameters:

- `value`: The value for which to compute the unary plus.

Returns: The unary plus of `value`.

To be added.

## Char.ToLower(Char) method

```csharp
public static char ToLower (char c);
```

Converts the value of a Unicode character to its lowercase equivalent.

Parameters:

- `c`: The Unicode character to convert.

Returns: The lowercase equivalent of `c`, or the unchanged value of `c`, if `c` is already lowercase or not alphabetic.

#### Remarks
Casing rules are obtained from the current culture.

Use `String.ToLower` to convert a string to lowercase.

## Char.ToLower(Char, CultureInfo) method

```csharp
public static char ToLower (char c, System.Globalization.CultureInfo culture);
```

Converts the value of a specified Unicode character to its lowercase equivalent using specified culture-specific formatting information.

Parameters:

- `c`: The Unicode character to convert.
- `culture`: An object that supplies culture-specific casing rules.

Returns: The lowercase equivalent of `c`, modified according to `culture`, or the unchanged value of `c`, if `c` is already lowercase or not alphabetic.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.

#### Remarks
Use `String.ToLower` to convert a string to lowercase.

## Char.ToLowerInvariant(Char) method

```csharp
public static char ToLowerInvariant (char c);
```

Converts the value of a Unicode character to its lowercase equivalent using the casing rules of the invariant culture.

Parameters:

- `c`: The Unicode character to convert.

Returns: The lowercase equivalent of the `c` parameter, or the unchanged value of `c`, if `c` is already lowercase or not alphabetic.

#### Remarks
If your application is unaffected by the current culture and depends on the case of a character changing in a predictable way, then use the `Char.ToLowerInvariant` method. The `Char.ToLowerInvariant` method is equivalent to `ToLower(Char, CultureInfo.InvariantCulture)`.

Use `String.ToLowerInvariant` to convert a string to lowercase.

## Char.ToLowerOrdinal(Char) method

```csharp
public static char ToLowerOrdinal (char c);
```

To be added.

Parameters:

- `c`: To be added.

Returns: To be added.

To be added.

## Char.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to its equivalent string representation.

Returns: The string representation of the value of this instance.

## Char.ToString(Char) method

```csharp
public static string ToString (char c);
```

Converts the specified Unicode character to its equivalent string representation.

Parameters:

- `c`: The Unicode character to convert.

Returns: The string representation of the value of `c`.

## Char.ToString(IFormatProvider) method

```csharp
public string ToString (IFormatProvider? provider);
```

Converts the value of this instance to its equivalent string representation using the specified culture-specific format information.

Parameters:

- `provider`: (Reserved) An object that supplies culture-specific formatting information.

Returns: The string representation of the value of this instance as specified by `provider`.

#### Remarks
The `provider` parameter is ignored; it does not participate in this operation.

## Char.ToUpper(Char) method

```csharp
public static char ToUpper (char c);
```

Converts the value of a Unicode character to its uppercase equivalent.

Parameters:

- `c`: The Unicode character to convert.

Returns: The uppercase equivalent of `c`, or the unchanged value of `c` if `c` is already uppercase, has no uppercase equivalent, or is not alphabetic.

#### Remarks
Casing rules are obtained from the current culture.

Use `String.ToUpper` to convert a string to uppercase.

#### Examples
The following example converts each character in an array to its uppercase equivalent.

_Code sample not included: ~/snippets/csharp/System/Char/ToUpper/toupper1.cs._

## Char.ToUpper(Char, CultureInfo) method

```csharp
public static char ToUpper (char c, System.Globalization.CultureInfo culture);
```

Converts the value of a specified Unicode character to its uppercase equivalent using specified culture-specific formatting information.

Parameters:

- `c`: The Unicode character to convert.
- `culture`: An object that supplies culture-specific casing rules.

Returns: The uppercase equivalent of `c`, modified according to `culture`, or the unchanged value of `c` if `c` is already uppercase, has no uppercase equivalent, or is not alphabetic.

Exceptions:

- `ArgumentNullException`: `culture` is `null`.

#### Remarks
Use `String.ToUpper` to convert a string to uppercase.

#### Examples
The following example converts each character in an array to its uppercase equivalent for the en-US culture, the invariant culture, and the tr-TR culture. In this example, the uppercase equivalent of each lowercase letter is identical for all cultures except for one case. The lowercase "i" character (U+0069) converts to "I" (U+0049) in the en-US and invariant cultures, but to "İ" (U+0130) in the tr-TR culture.

_Code sample not included: ~/snippets/csharp/System/Char/ToUpper/toupper5.cs._

## Char.ToUpperInvariant(Char) method

```csharp
public static char ToUpperInvariant (char c);
```

Converts the value of a Unicode character to its uppercase equivalent using the casing rules of the invariant culture.

Parameters:

- `c`: The Unicode character to convert.

Returns: The uppercase equivalent of the `c` parameter, or the unchanged value of `c`, if `c` is already uppercase or not alphabetic.

#### Remarks
If your application is unaffected by the current culture and depends on the case of a character changing in a predictable way, use the `Char.ToUpperInvariant` method.  The `Char.ToUpperInvariant` method is equivalent to `ToUpper(Char, CultureInfo.InvariantCulture)`.

Use `String.ToUpperInvariant` to convert a string to uppercase.

## Char.ToUpperOrdinal(Char) method

```csharp
public static char ToUpperOrdinal (char c);
```

To be added.

Parameters:

- `c`: To be added.

Returns: To be added.

To be added.
