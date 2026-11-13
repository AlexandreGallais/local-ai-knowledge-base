---
title: "The char type"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/char.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# char (C# reference)

The `char` type keyword is an alias for the .NET `System.Char` structure type. It represents a Unicode UTF-16 code unit, typically a UTF-16 character.

| Type   | Range            | Size   | .NET type                                       |
|--------|------------------|--------|-------------------------------------------------|
| `char` | U+0000 to U+FFFF | 16 bit | `System.Char` |

The default value of the `char` type is `\0`, which is U+0000.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The `char` type supports comparison, equality, increment, and decrement operators. For `char` operands, arithmetic and bitwise logical operators perform an operation on the corresponding code points and produce the result as an `int` value.

The string type represents text as a sequence of `char` values.

## Literals

You can specify a `char` value by using:

- a character literal.
- a Unicode escape sequence, which is `\u` followed by the four-symbol hexadecimal representation of a character code.
- a hexadecimal escape sequence, which is `\x` followed by the hexadecimal representation of a character code.

```csharp
﻿namespace builtin_types;

public static class CharType
{
    public static void Examples()
    {
        Literals();
    }

    private static void Literals()
    {
        var chars = new[]
        {
            'j',
            '\u006A',
            '\x006A',
            (char)106,
        };
        Console.WriteLine(string.Join(" ", chars));  // output: j j j j
    }
}
```
As the preceding example shows, you can also cast the value of a character code into the corresponding `char` value.

> **Note:**
> In a Unicode escape sequence, you must specify all four hexadecimal digits. That is, `\u006A` is a valid escape sequence, while `\u06A` and `\u6A` are invalid.
>
> In a hexadecimal escape sequence, you can omit the leading zeros. That is, the `\x006A`, `\x06A`, and `\x6A` escape sequences are valid and correspond to the same character.

## Conversions

The `char` type implicitly converts to the following integral types: `ushort`, `int`, `uint`, `long`, `ulong`, `nint`, and `nuint`. It also implicitly converts to the built-in floating-point numeric types: `float`, `double`, and `decimal`. It explicitly converts to `sbyte`, `byte`, and `short` integral types.

No implicit conversions exist from other types to the `char` type. However, you can explicitly convert any integral or floating-point numeric type to `char`.

## C# language specification

For more information, see the Integral types section of the C# language specification.

## See also

- Value types
- Strings
- `System.Text.Rune`
- Character encoding in .NET
