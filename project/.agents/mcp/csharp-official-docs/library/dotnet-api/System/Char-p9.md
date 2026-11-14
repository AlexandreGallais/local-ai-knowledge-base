---
title: "Char struct (part 9 of 9)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Char.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Char struct (part 9 of 9)

## Char.TryParse(String, Char) method

```csharp
public static bool TryParse (string? s, out char result);
```

Converts the value of the specified string to its equivalent Unicode character. A return code indicates whether the conversion succeeded or failed.

Parameters:

- `s`: A string that contains a single character, or `null`.
- `result`: When this method returns, contains a Unicode character equivalent to the sole character in `s`, if the conversion succeeded, or an undefined value if the conversion failed. The conversion fails if the `s` parameter is `null` or the length of `s` is not 1. This parameter is passed uninitialized.

Returns: `true` if the `s` parameter was converted successfully; otherwise, `false`.

#### Remarks
The `Char.TryParse` method is like the `Char.Parse` method, except the `Char.TryParse` method does not throw an exception if the conversion fails.

#### Examples
The following code example demonstrates overloads of the `Char.TryParse` method for several base types, and the `DateTime.TryParseExact` method for the `DateTime` base type.

_Code sample not included: ~/snippets/csharp/System/Char/TryParse/tp.cs._

## Char.MaxValue field

```csharp
public const char MaxValue;
```

Represents the largest possible value of a `Char`. This field is constant.

#### Remarks
The value of this constant is hexadecimal 0xFFFF.

## Char.MinValue field

```csharp
public const char MinValue;
```

Represents the smallest possible value of a `Char`. This field is constant.

#### Remarks
The value of this constant is hexadecimal 0x00.
