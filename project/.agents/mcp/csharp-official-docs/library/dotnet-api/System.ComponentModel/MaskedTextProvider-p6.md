---
title: "MaskedTextProvider class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextProvider class (part 6 of 7)

## MaskedTextProvider.ToDisplayString() method

```csharp
public string ToDisplayString ();
```

Returns the formatted string in a displayable form.

Returns: The formatted `String` that includes prompts and mask literals.

#### Remarks
The `MaskedTextProvider.ToDisplayString` method will always include prompt and literal characters in the return value, regardless of the value of the `MaskedTextProvider.IncludePrompt` or `MaskedTextProvider.IncludeLiterals` properties. This method will always display password <example-value> if the `PasswordChar` property is set to a character value other than `null`.

`MaskedTextProvider.ToDisplayString` is commonly used to obtain the string to display in associated user interface elements, such as `MaskedTextBox`.

## MaskedTextProvider.ToString() method

```csharp
public override string ToString ();
```

Returns the formatted string that includes all the assigned character values.

Returns: The formatted `String` that includes all the assigned character values.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method includes prompts and literals according to the current values of the `MaskedTextProvider.IncludePrompt` and `MaskedTextProvider.IncludeLiterals` properties, respectively. It will always return the original input characters, ignoring the value of the `PasswordChar` property.

> **Important:**
>  Because this method reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

## MaskedTextProvider.ToString(Boolean) method

```csharp
public string ToString (bool ignorePasswordChar);
```

Returns the formatted string, optionally including password characters.

Parameters:

- `ignorePasswordChar`: `true` to return the actual editable characters; otherwise, `false` to indicate that the `MaskedTextProvider.PasswordChar` property is to be honored.

Returns: The formatted `String` that includes literals, prompts, and optionally password characters.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method includes prompts and literals according to the current values of the `MaskedTextProvider.IncludePrompt` and `MaskedTextProvider.IncludeLiterals` properties, respectively. If the `ignorePasswordChar` parameter is `true`, it will return the original input characters, ignoring the value of the `PasswordChar` property. If this parameter is `false`, it will use the password <example-value> to obscure editable user input if the `PasswordChar` property is set to a value other than `null`.

> **Important:**
>  Because this method potentially reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

## MaskedTextProvider.ToString(Boolean, Boolean) method

```csharp
public string ToString (bool includePrompt, bool includeLiterals);
```

Returns the formatted string, optionally including prompt and literal characters.

Parameters:

- `includePrompt`: `true` to include prompt characters in the return string; otherwise, `false`.
- `includeLiterals`: `true` to include literal characters in the return string; otherwise, `false`.

Returns: The formatted `String` that includes all the assigned character values and optionally includes literals and prompts.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method includes prompts and literals according to the values of the `IncludePrompt` and `IncludeLiterals` parameters, respectively. Notice that these parameters override the values of the `MaskedTextProvider.IncludePrompt``MaskedTextProvider.IncludeLiterals` properties. This method will always return the original input characters, ignoring the value of the `PasswordChar` property.

> **Important:**
>  Because this method reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

## MaskedTextProvider.ToString(Int32, Int32) method

```csharp
public string ToString (int startPosition, int length);
```

Returns a substring of the formatted string.

Parameters:

- `startPosition`: The zero-based position in the formatted string where the output begins.
- `length`: The number of characters to return.

Returns: If successful, a substring of the formatted `String`, which includes all the assigned character values; otherwise the `String.Empty` string.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method returns a substring of the formatted string, starting at the position `startPos` and including the subsequent number of characters specified by the `length` parameter. The returned string includes prompts and literals according to the current values of the `MaskedTextProvider.IncludePrompt` and `MaskedTextProvider.IncludeLiterals` properties, respectively. The return string will contain the original input characters; the `PasswordChar` property is always ignored.

> **Important:**
>  Because this method reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

`MaskedTextProvider.ToString` performs the following actions when there are discrepancies in the input parameters:

- If `startPos` is less than zero, the starting position is set to zero.

- If `startPos` is greater than or equal to the actual `MaskedTextProvider.Length` of the formatted string, the `Empty` string is returned.

- If `length` is greater than the remaining number of characters past the starting position, only the remaining characters are returned.

- If `length` is less than or equal to zero, the `Empty` string is returned.

## MaskedTextProvider.ToString(Boolean, Int32, Int32) method

```csharp
public string ToString (bool ignorePasswordChar, int startPosition, int length);
```

Returns a substring of the formatted string, optionally including password characters.

Parameters:

- `ignorePasswordChar`: `true` to return the actual editable characters; otherwise, `false` to indicate that the `MaskedTextProvider.PasswordChar` property is to be honored.
- `startPosition`: The zero-based position in the formatted string where the output begins.
- `length`: The number of characters to return.

Returns: If successful, a substring of the formatted `String`, which includes literals, prompts, and optionally password <example-value>; otherwise the `String.Empty` string.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method returns a substring of the formatted string, starting at the position `startPos` and including the subsequent number of characters specified by the `length` parameter. The returned string includes prompts and literals according to the current values of the `MaskedTextProvider.IncludePrompt` and `MaskedTextProvider.IncludeLiterals` properties, respectively. If the `ignorePasswordChar` parameter is `true`, it will return the original input characters, ignoring the value of the `PasswordChar` property. If this parameter is `false`, it will use the password <example-value> to obscure editable user input if the `PasswordChar` property is set to a value other than `null`.

> **Important:**
>  Because this method potentially reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

`MaskedTextProvider.ToString` performs the following actions when there are discrepancies in the input parameters:

- If `startPos` is less than zero, the starting position is set to zero.

- If `startPos` is greater than or equal to the actual `MaskedTextProvider.Length` of the formatted string, the `Empty` string is returned.

- If `length` is greater than the remaining number of characters past the starting position, only the remaining characters are returned.

- If `length` is less than or equal to zero, the `Empty` string is returned.

## MaskedTextProvider.ToString(Boolean, Boolean, Int32, Int32) method

```csharp
public string ToString (bool includePrompt, bool includeLiterals, int startPosition, int length);
```

Returns a substring of the formatted string, optionally including prompt and literal characters.

Parameters:

- `includePrompt`: `true` to include prompt characters in the return string; otherwise, `false`.
- `includeLiterals`: `true` to include literal characters in the return string; otherwise, `false`.
- `startPosition`: The zero-based position in the formatted string where the output begins.
- `length`: The number of characters to return.

Returns: If successful, a substring of the formatted `String`, which includes all the assigned character values and optionally includes literals and prompts; otherwise the `String.Empty` string.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method returns a substring of the formatted string, starting at the position `startPos` and including the subsequent number of characters specified by the `length` parameter. The return string includes prompts and literals according to the values of the `IncludePrompt` and `IncludeLiterals` parameters, respectively. Notice that these parameters override the values of the `MaskedTextProvider.IncludePrompt``MaskedTextProvider.IncludeLiterals` properties. This method will always return the original input characters, ignoring the value of the `PasswordChar` property.

> **Important:**
>  Because this method reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

`MaskedTextProvider.ToString` performs the following actions when there are discrepancies in the input parameters:

- If `startPos` is less than zero, the starting position is set to zero.

- If `startPos` is greater than or equal to the actual `MaskedTextProvider.Length` of the formatted string, the `Empty` string is returned.

- If `length` is greater than the remaining number of characters past the starting position, only the remaining characters are returned.

- If `length` is less than or equal to zero, the `Empty` string is returned.

## MaskedTextProvider.ToString(Boolean, Boolean, Boolean, Int32, Int32) method

```csharp
public string ToString (bool ignorePasswordChar, bool includePrompt, bool includeLiterals, int startPosition, int length);
```

Returns a substring of the formatted string, optionally including prompt, literal, and password characters.

Parameters:

- `ignorePasswordChar`: `true` to return the actual editable characters; otherwise, `false` to indicate that the `MaskedTextProvider.PasswordChar` property is to be honored.
- `includePrompt`: `true` to include prompt characters in the return string; otherwise, `false`.
- `includeLiterals`: `true` to return literal characters in the return string; otherwise, `false`.
- `startPosition`: The zero-based position in the formatted string where the output begins.
- `length`: The number of characters to return.

Returns: If successful, a substring of the formatted `String`, which includes all the assigned character values and optionally includes literals, prompts, and password <example-value>; otherwise the `String.Empty` string.

#### Remarks
This version of the overloaded `MaskedTextProvider.ToString` method returns a substring of the formatted string, starting at the position `startPos` and including the subsequent number of characters specified by the `length` parameter. The return string includes prompts and literals according to the values of the `IncludePrompt` and `IncludeLiterals` parameters, respectively. Notice that these parameters override the values of the `MaskedTextProvider.IncludePrompt` and  `MaskedTextProvider.IncludeLiterals` properties. If the `ignorePasswordChar` parameter is `true`, it will return the original input characters, ignoring the value of the `PasswordChar` property. If this parameter is `false`, it will use the password <example-value> to obscure editable user input if the `PasswordChar` property is set to a value other than `null`.

> **Important:**
>  Because this method potentially reveals information that is usually protected in the user interface by password <example-value>, it should be used with extreme caution to avoid accidentally revealing sensitive user data.

`MaskedTextProvider.ToString` performs the following actions when there are discrepancies in the input parameters:

- If `startPos` is less than zero, the starting position is set to zero.

- If `startPos` is greater than or equal to the actual `MaskedTextProvider.Length` of the formatted string, the `Empty` string is returned.

- If `length` is greater than the remaining number of characters past the starting position, only the remaining characters are returned.

- If `length` is less than or equal to zero, the `Empty` string is returned.

## MaskedTextProvider.VerifyChar(Char, Int32, MaskedTextResultHint) method

```csharp
public bool VerifyChar (char input, int position, out System.ComponentModel.MaskedTextResultHint hint);
```

Tests whether the specified character could be set successfully at the specified position.

Parameters:

- `input`: The `Char` value to test.
- `position`: The position in the mask to test the input character against.
- `hint`: A `MaskedTextResultHint` that succinctly describes the result of the operation. An output parameter.

Returns: `true` if the specified character is valid for the specified position; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.VerifyChar` method tests whether a single character value represents valid input at the specified position in the formatted string. This method will return `false` for the following reasons:

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the `MaskedTextProvider.Mask`.

- The character `input` is not a valid input character, as determined by the `MaskedTextProvider.IsValidInputChar` method.

- The `input` is not compatible with the mask element at the specified position, `pos`.

The last condition may depend on the current value of the `MaskedTextProvider.AllowPromptAsInput`, `MaskedTextProvider.AsciiOnly`, `MaskedTextProvider.PasswordChar`, `MaskedTextProvider.PromptChar` and `MaskedTextProvider.SkipLiterals` properties.

To test an entire input string against the mask, use one of the `MaskedTextProvider.VerifyString` methods instead.
