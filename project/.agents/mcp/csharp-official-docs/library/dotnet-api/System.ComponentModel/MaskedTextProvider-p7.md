---
title: "MaskedTextProvider class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextProvider class (part 7 of 7)

## MaskedTextProvider.VerifyEscapeChar(Char, Int32) method

```csharp
public bool VerifyEscapeChar (char input, int position);
```

Tests whether the specified character would be escaped at the specified position.

Parameters:

- `input`: The `Char` value to test.
- `position`: The position in the mask to test the input character against.

Returns: `true` if the specified character would be escaped at the specified position; otherwise, `false`.

#### Remarks
A character is said to be *escaped* if it is valid input, but is not assigned to that position in the formatted string. Escaped characters fall into the following three categories:

- Prompt characters are escaped if the `AllowPromptAsInput` property is `true`.

- Input characters are escaped if they have the same value as the literal in the mask, and if the `SkipLiterals` property is `true`.

- Space characters are escaped if the `ResetOnSpace` property is `true`.

The `MaskedTextProvider.VerifyEscapeChar` method will also return `false` if the `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the `MaskedTextProvider.Mask`.

## MaskedTextProvider.VerifyString(String) method

```csharp
public bool VerifyString (string input);
```

Tests whether the specified string could be set successfully.

Parameters:

- `input`: The `String` value to test.

Returns: `true` if the specified string represents valid input; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.VerifyString` applies the `input` string against the mask, without actually changing the formatted string, to test whether `input` would be valid in a corresponding `MaskedTextProvider.Set` operation. This method also returns `true` if input is `null` or has zero length.

## MaskedTextProvider.VerifyString(String, Int32, MaskedTextResultHint) method

```csharp
public bool VerifyString (string input, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Tests whether the specified string could be set successfully, and then outputs position and descriptive information.

Parameters:

- `input`: The `String` value to test.
- `testPosition`: If successful, the zero-based position of the last character actually tested; otherwise, the first position where the test failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the test operation. An output parameter.

Returns: `true` if the specified string represents valid input; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.VerifyString` applies the `input` string against the mask, without actually changing the formatted string, to test whether `input` would be valid in a corresponding `MaskedTextProvider.Set` operation. This method also returns `true` if input is `null` or has zero length.

This version of `MaskedTextProvider.VerifyString` provides two additional output parameters to convey more information about the operation of the method.
