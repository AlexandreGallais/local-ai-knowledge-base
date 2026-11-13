---
title: "Introduction to character encoding in .NET (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/character-encoding-introduction.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Character encoding in .NET

This article provides an introduction to character encoding systems that are used by .NET. The article explains how the `System.String`, `System.Char`, `System.Text.Rune`, and `System.Globalization.StringInfo` types work with Unicode, UTF-16, and UTF-8.

The term *character* is used here in the general sense of *what a reader perceives as a single display element*. Common examples are the letter "a", the symbol "@", and the emoji "🐂". Sometimes what looks like one character is actually composed of multiple independent display elements, as the section on grapheme clusters explains.

## The string and char types

An instance of the string class represents some text. A `string` is logically a sequence of 16-bit values, each of which is an instance of the char struct. The string.Length property returns the number of `char` instances in the `string` instance.

The following sample function prints out the values in hexadecimal notation of all the `char` instances in a `string`:

```csharp
void PrintChars(string s)
{
    Console.WriteLine($"\"{s}\".Length = {s.Length}");
    for (int i = 0; i < s.Length; i++)
    {
        Console.WriteLine($"s[{i}] = '{s[i]}' ('\\u{(int)s[i]:x4}')");
    }
    Console.WriteLine();
}
```
Pass the string "Hello" to this function, and you get the following output:

```csharp
PrintChars("Hello");
```

```output
"Hello".Length = 5
s[0] = 'H' ('\u0048')
s[1] = 'e' ('\u0065')
s[2] = 'l' ('\u006c')
s[3] = 'l' ('\u006c')
s[4] = 'o' ('\u006f')
```

Each character is represented by a single `char` value. That pattern holds true for most of the world's languages. For example, here's the output for two Chinese characters that sound like *nǐ hǎo* and mean *Hello*:

```csharp
PrintChars("你好");
```

```output
"你好".Length = 2
s[0] = '你' ('\u4f60')
s[1] = '好' ('\u597d')
```

However, for some languages and for some symbols and emoji, it takes two `char` instances to represent a single character. For example, compare the characters and `char` instances in the word that means *Osage* in the Osage language:

```csharp
PrintChars("𐓏𐓘𐓻𐓘𐓻𐓟 𐒻𐓟");
```

```output
"𐓏𐓘𐓻𐓘𐓻𐓟 𐒻𐓟".Length = 17
s[0] = '�' ('\ud801')
s[1] = '�' ('\udccf')
s[2] = '�' ('\ud801')
s[3] = '�' ('\udcd8')
s[4] = '�' ('\ud801')
s[5] = '�' ('\udcfb')
s[6] = '�' ('\ud801')
s[7] = '�' ('\udcd8')
s[8] = '�' ('\ud801')
s[9] = '�' ('\udcfb')
s[10] = '�' ('\ud801')
s[11] = '�' ('\udcdf')
s[12] = ' ' ('\u0020')
s[13] = '�' ('\ud801')
s[14] = '�' ('\udcbb')
s[15] = '�' ('\ud801')
s[16] = '�' ('\udcdf')
```

In the preceding example, each character except the space is represented by two `char` instances.

A single Unicode emoji is also represented by two `char`s, as seen in the following example showing an ox emoji:

```output
"🐂".Length = 2
s[0] = '�' ('\ud83d')
s[1] = '�' ('\udc02')
```

These examples show that the value of `string.Length`, which indicates the number of `char` instances, doesn't necessarily indicate the number of displayed characters. A single `char` instance by itself doesn't necessarily represent a character.

The `char` pairs that map to a single character are called *surrogate pairs*. To understand how they work, you need to understand Unicode and UTF-16 encoding.

## Unicode code points

Unicode is an international encoding standard for use on various platforms and with various languages and scripts.

The Unicode Standard defines over 1.1 million code points. A code point is an integer value that can range from 0 to `U+10FFFF` (decimal 1,114,111). Some code points are assigned to letters, symbols, or emoji. Others are assigned to actions that control how text or characters are displayed, such as advance to a new line. Many code points are not yet assigned.

Here are some examples of code point assignments, with links to Unicode charts in which they appear:

| Decimal | Hex       | Example | Description                                                                        |
|--------:|-----------|---------|------------------------------------------------------------------------------------|
| 10      | `U+000A`  | N/A     | LINE FEED                          |
| 97      | `U+0061`  | a       | LATIN SMALL LETTER A               |
| 562     | `U+0232`  | Ȳ       | LATIN CAPITAL LETTER Y WITH MACRON |
| 68,675  | `U+10C43` | 𐱃     | OLD TURKIC LETTER ORKHON AT       |
| 127,801 | `U+1F339` | 🌹     | ROSE emoji                        |

Code points are customarily referred to by using the syntax `U+xxxx`, where `xxxx` is the hex-encoded integer value.

Within the full range of code points there are two subranges:

* The **Basic <example-value> Plane (BMP)** in the range `U+0000..U+FFFF`. This 16-bit range provides 65,536 code points, enough to cover the majority of the world's writing systems.
* **Supplementary code points** in the range `U+10000..U+10FFFF`. This 21-bit range provides more than a million additional code points that can be used for less well-known languages and other purposes such as emojis.

The following diagram illustrates the relationship between the BMP and the supplementary code points.

## UTF-16 code units

16-bit Unicode Transformation Format (UTF-16) is a character encoding system that uses 16-bit *code units* to represent Unicode code points. .NET uses UTF-16 to encode the text in a `string`. A `char` instance represents a 16-bit code unit.

A single 16-bit code unit can represent any code point in the 16-bit range of the Basic <example-value> Plane. But for a code point in the supplementary range, two `char` instances are needed.

## Surrogate pairs

The translation of two 16-bit values to a single 21-bit value is facilitated by a special range called the *surrogate code points*, from `U+D800` to `U+DFFF` (decimal 55,296 to 57,343), inclusive.

The following diagram illustrates the relationship between the BMP and the surrogate code points.

When a *high surrogate* code point (`U+D800..U+DBFF`) is immediately followed by a *low surrogate* code point (`U+DC00..U+DFFF`), the pair is interpreted as a supplementary code point by using the following formula:

```
code point = 0x10000 +
  ((high surrogate code point - 0xD800) * 0x0400) +
  (low surrogate code point - 0xDC00)
```

Here's the same formula using decimal notation:

```
code point = 65,536 +
  ((high surrogate code point - 55,296) * 1,024) +
  (low surrogate code point - 56,320)
```

A *high* surrogate code point doesn't have a higher number value than a *low* surrogate code point. The high surrogate code point is called "high" because it's used to calculate the higher-order 10 bits of a 20-bit code point range. The low surrogate code point is used to calculate the lower-order 10 bits.

For example, the actual code point that corresponds to the surrogate pair `0xD83C` and `0xDF39`  is computed as follows:

```
actual = 0x10000 + ((0xD83C - 0xD800) * 0x0400) + (0xDF39 - 0xDC00)
       = 0x10000 + (          0x003C  * 0x0400) +           0x0339
       = 0x10000 +                      0xF000  +           0x0339
       = 0x1F339
```

Here's the same calculation using decimal notation:

```
actual =  65,536 + ((55,356 - 55,296) * 1,024) + (57,145 - 56320)
       =  65,536 + (              60  * 1,024) +             825
       =  65,536 +                     61,440  +             825
       = 127,801
```

The preceding example demonstrates that `"\ud83c\udf39"` is the UTF-16 encoding of the `U+1F339 ROSE ('🌹')` code point mentioned earlier.

## Unicode scalar values

The term Unicode scalar value refers to all code points other than the surrogate code points. In other words, a scalar value is any code point that is assigned a character or can be assigned a character in the future. "Character" here refers to anything that can be assigned to a code point, which includes such things as actions that control how text or characters are displayed.

The following diagram illustrates the scalar value code points.

### The Rune type as a scalar value

> **Important:**
> The `Rune` type isn't available in .NET Framework.

In .NET, the `System.Text.Rune` type represents a Unicode scalar value.

The `Rune` constructors validate that the resulting instance is a valid Unicode scalar value, otherwise they throw an exception. The following example shows code that successfully instantiates `Rune` instances because the input represents valid scalar values:

```csharp
Rune a = new Rune('a');
Rune b = new Rune(0x0061);
Rune c = new Rune('\u0061');
Rune d = new Rune(0x10421);
Rune e = new Rune('\ud801', '\udc21');
```
The following example throws an exception because the code point is in the surrogate range and isn't part of a surrogate pair:

```csharp
Rune f = new Rune('\ud801');
```
The following example throws an exception because the code point is beyond the supplementary range:

```csharp
Rune g = new Rune(0x12345678);
```
### Rune usage example: changing letter case

An API that takes a `char` and assumes it is working with a code point that is a scalar value doesn't work correctly if the `char` is from a surrogate pair. For example, consider the following method that calls `System.Char.ToUpperInvariant*` on each char in a string:

```csharp
// THE FOLLOWING METHOD SHOWS INCORRECT CODE.
// DO NOT DO THIS IN A PRODUCTION APPLICATION.
static string ConvertToUpperBadExample(string input)
{
    StringBuilder builder = new StringBuilder(input.Length);
    for (int i = 0; i < input.Length; i++) /* or 'foreach' */
    {
        builder.Append(char.ToUpperInvariant(input[i]));
    }
    return builder.ToString();
}
```
If the `input` string contains the lowercase Deseret letter `er` (`𐑉`), this code won't convert it to uppercase (`𐐡`). The code calls `char.ToUpperInvariant` separately on each surrogate code point, `U+D801` and `U+DC49`. But `U+D801` doesn't have enough information by itself to identify it as a lowercase letter, so `char.ToUpperInvariant` leaves it alone. And it handles `U+DC49` the same way. The result is that lowercase '𐑉' in the `input` string doesn't get converted to uppercase '𐐡'.

Here are two options for correctly converting a string to uppercase:

* Call `System.String.ToUpperInvariant*` on the input string rather than iterating `char`-by-`char`. The `string.ToUpperInvariant` method has access to both parts of each surrogate pair, so it can handle all Unicode code points correctly.
* Iterate through the Unicode scalar values as `Rune` instances instead of `char` instances, as shown in the following example. Since a `Rune` instance is a valid Unicode scalar value, it can be passed to APIs that expect to operate on a scalar value. For example, calling `System.Text.Rune.ToUpperInvariant*` as shown in the following example gives correct results:

```csharp
static string ConvertToUpper(string input)
{
    StringBuilder builder = new StringBuilder(input.Length);
    foreach (Rune rune in input.EnumerateRunes())
    {
        builder.Append(Rune.ToUpperInvariant(rune));
    }
    return builder.ToString();
}
```
### Other Rune APIs

The `Rune` type exposes analogs of many of the `char` APIs. For example, the following methods mirror static APIs on the `char` type:

* `System.Text.Rune.IsLetter*`
* `System.Text.Rune.IsWhiteSpace*`
* `System.Text.Rune.IsLetterOrDigit*`
* `System.Text.Rune.GetUnicodeCategory*`

To get the raw scalar value from a `Rune` instance, use the `System.Text.Rune.Value` property.

To convert a `Rune` instance back to a sequence of `char`s, use `System.Text.Rune.ToString*` or the `System.Text.Rune.EncodeToUtf16*` method.

Since any Unicode scalar value is representable by a single `char` or by a surrogate pair, any `Rune` instance can be represented by at most 2 `char` instances. Use `System.Text.Rune.Utf16SequenceLength*` to see how many `char` instances are required to represent a `Rune` instance.

For more information about the .NET `Rune` type, see the `Rune` API reference.
