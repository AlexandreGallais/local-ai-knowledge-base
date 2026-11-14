---
title: "Boolean struct (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Boolean.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Boolean struct (part 3 of 3)

## Boolean.TryParse(Char>, Boolean) method

```csharp
public static bool TryParse (ReadOnlySpan<char> value, out bool result);
```

Tries to convert the specified span representation of a logical value to its `Boolean` equivalent.

Parameters:

- `value`: A span containing the characters representing the value to convert.
- `result`: When this method returns, if the conversion succeeded, contains `true` if `value` is equal to `Boolean.TrueString` or `false` if `value` is equal to `Boolean.FalseString`. If the conversion failed, contains `false`. The conversion fails if `value` is `null` or is not equal to the value of either the `Boolean.TrueString` or `Boolean.FalseString` field.

Returns: `true` if `value` was converted successfully; otherwise, `false`.

To be added.

## Boolean.TryParse(String, Boolean) method

```csharp
public static bool TryParse (string? value, out bool result);
```

Tries to convert the specified string representation of a logical value to its `Boolean` equivalent.

Parameters:

- `value`: A string containing the value to convert.
- `result`: When this method returns, if the conversion succeeded, contains `true` if `value` is equal to `Boolean.TrueString` or `false` if `value` is equal to `Boolean.FalseString`. If the conversion failed, contains `false`. The conversion fails if `value` is `null` or is not equal to the value of either the `Boolean.TrueString` or `Boolean.FalseString` field.

Returns: `true` if `value` was converted successfully; otherwise, `false`.

#### Remarks

The `Boolean.TryParse` method is like the `Boolean.Parse` method, except the `Boolean.TryParse` method does not throw an exception if the conversion fails.

The `value` parameter can be preceded or followed by white space. The comparison is ordinal and case-insensitive.

#### Examples

The following example calls the `Boolean.TryParse` method to parse an array of strings. Note that the parse operation succeeds only if the string to be parsed is "True" (the value of the `TrueString` field) or "False" (the value of the `FalseString` field) in a case-insensitive comparison.

_Code sample not included: ~/snippets/csharp/System/Boolean/TryParse/tryparseex.cs._

## Boolean.FalseString field

```csharp
public static readonly string FalseString;
```

Represents the Boolean value `false` as a string. This field is read-only.

#### Remarks

This field is equal to the string `"False"`.

The `FalseString` property defines the string representation of a `false` `Boolean` value in formatting and parsing operations.

## Boolean.TrueString field

```csharp
public static readonly string TrueString;
```

Represents the Boolean value `true` as a string. This field is read-only.

#### Remarks

This field is equal to the string `"True"`.

The `TrueString` property defines the string representation of a `true` `Boolean` value in formatting and parsing operations.
