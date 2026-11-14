---
title: "MaskedTextProvider class (part 2 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextProvider class (part 2 of 7)

## MaskedTextProvider.InvalidIndex property

```csharp
public static int InvalidIndex { get; }
```

Gets the upper bound of the range of invalid indexes.

Returns: A value representing the largest invalid index, as determined by the provider implementation. For example, if the lowest valid index is 0, this property will return -1.

#### Remarks
The `InvalidIndex` property is used to represent a result that is not valid for indexing operations, such as the `MaskedTextProvider.LastAssignedPosition` method.

When you use the provider or implement your own, you should use this property to decide if an index is invalid, rather than hard-coding knowledge of invalid values.

## MaskedTextProvider.IsPassword <example-value>

```csharp
public bool IsPassword { get; set; }
```

Gets or sets a value that determines whether password <example-value> should be applied to the formatted string.

Returns: `true` if the input string is to be treated as a password <example-value>; otherwise, `false`. The default is `false`.

#### Remarks
Password <example-value> can be initiated using one of the following two ways:

- Setting the `PasswordChar` property to a non-`null` value.

- Setting the `IsPassword` property to `true`, which also sets the `PasswordChar` property to the `MaskedTextProvider.DefaultPasswordChar` value.

`MaskedTextProvider.IsPassword` is used by the `MaskedTextProvider.ToDisplayString` and `MaskedTextProvider.ToString` methods to determine whether to reveal the actual input characters or obscure them with `MaskedTextProvider.PasswordChar`.

## MaskedTextProvider.Item property

```csharp
public char this[int index] { get; }
```

Gets the element at the specified position in the formatted string.

Parameters:

- `index`: A zero-based index of the element to retrieve.

Returns: The `Char` at the specified position in the formatted string.

Exceptions:

- `IndexOutOfRangeException`: `index` is less than zero or greater than or equal to the `MaskedTextProvider.Length` of the mask.

#### Remarks
The `MaskedTextProvider.Item` property is the standard indexer for the `MaskedTextProvider` class.

## MaskedTextProvider.LastAssignedPosition property

```csharp
public int LastAssignedPosition { get; }
```

Gets the index in the mask of the rightmost input character that has been assigned to the mask.

Returns: If at least one input character has been assigned to the mask, an `Int32` containing the index of rightmost assigned position; otherwise, if no position has been assigned, `MaskedTextProvider.InvalidIndex`.

#### Remarks
The `LastAssignedPosition` property represents the farthest edit position in the mask, relative to the origin, that has been assigned an input character. For languages read left-to-right (LTR), such as English, this is the rightmost assigned position; for languages read right-to-left (RTL), this would be the leftmost position.

## MaskedTextProvider.Length property

```csharp
public int Length { get; }
```

Gets the length of the mask, absent any mask modifier characters.

Returns: An `Int32` containing the number of positions in the mask, excluding characters that modify mask input.

#### Remarks
The `Length` property represents the total number of characters in the mask, including both the literal and editable characters. The number of literal characters can be determined by subtracting the value of the `MaskedTextProvider.EditPositionCount` from the `MaskedTextProvider.Length`.

`MaskedTextProvider.Length` also describes the length of the formatted string, including input characters, literals, and prompt characters.

## MaskedTextProvider.Mask property

```csharp
public string Mask { get; }
```

Gets the input mask.

Returns: A `String` containing the full mask.

#### Remarks
The `Mask` property is set in the `MaskedTextProvider.%23ctor` constructor. This mask must contain only valid characters as defined by the masking language.

## MaskedTextProvider.MaskCompleted property

```csharp
public bool MaskCompleted { get; }
```

Gets a value indicating whether all required inputs have been entered into the formatted string.

Returns: `true` if all required input has been entered into the mask; otherwise, `false`.

#### Remarks
The `MaskCompleted` property checks only required input elements. To determine whether all required and optional input elements have been entered, use the `MaskFull` property of the `MaskedTextBox` class instead.

The current value of the `Mask` property determines which formatting elements are considered required and which are optional.

## MaskedTextProvider.MaskFull property

```csharp
public bool MaskFull { get; }
```

Gets a value indicating whether all required and optional inputs have been entered into the formatted string.

Returns: `true` if all required and optional inputs have been entered; otherwise, `false`.

#### Remarks
To verify if only required input elements have been entered, use the `MaskCompleted` property instead. The current value of the `Mask` property determines which formatting elements are considered required and which are optional.

## MaskedTextProvider.PasswordChar property

```csharp
public char PasswordChar { get; set; }
```

Gets or sets the character to be substituted for the actual input characters.

Returns: The `Char` value used as the password character.

Exceptions:

- `InvalidOperationException`: The password <example-value> specified when setting this property is the same as the current prompt character, `MaskedTextProvider.PromptChar`. The two are required to be different.
- `ArgumentException`: The character specified when setting this property is not a valid password <example-value>, as determined by the `MaskedTextProvider.IsValidPasswordChar` method.

#### Remarks
For sensitive user input, it is common practice to conceal the actual information entered by the user during output operations. If the `PasswordChar` property is set to a non-`null` character, output methods such as `MaskedTextProvider.ToDisplayString` and `MaskedTextProvider.ToString` will obscure the input characters with the specified password character. Setting this property to `null` will disable password <example-value> functionality.

## MaskedTextProvider.PromptChar property

```csharp
public char PromptChar { get; set; }
```

Gets or sets the character used to represent the absence of user input for all available edit positions.

Returns: The character used to prompt the user for input. The default is an underscore (_).

Exceptions:

- `InvalidOperationException`: The prompt character specified when setting this property is the same as the current password <example-value>, `MaskedTextProvider.PasswordChar`. The two are required to be different.
- `ArgumentException`: The character specified when setting this property is not a valid password <example-value>, as determined by the `MaskedTextProvider.IsValidPasswordChar` method.

#### Remarks
The `PromptChar` property represents the prompt character that is used by the `MaskedTextProvider.ToDisplayString` and `MaskedTextProvider.ToString` methods to represent the current state of the formatted input string. A prompt character is placed in editable positions that have not yet been assigned an input value. Some versions of the `MaskedTextProvider.ToString` method also depend on the value of the `IncludePrompt` property.

## MaskedTextProvider.ResetOnPrompt property

```csharp
public bool ResetOnPrompt { get; set; }
```

Gets or sets a value that determines how an input character that matches the prompt character should be handled.

Returns: `true` if the prompt character entered as input causes the current editable position in the mask to be reset; otherwise, `false` to indicate that the prompt character is to be processed as a normal input character. The default is `true`.

#### Remarks
`MaskedTextProvider` can treat two categories of characters, paces and prompt characters, in a special manner. Normally, each input character will be tested against the mask and either accepted or rejected. Operating on the assumption that the `PromptChar` property is set to a value other than `null`, then setting the `ResetOnPrompt` property to `true` will result in special processing for the prompt character. When a prompt character is added, it causes the current mask character position to be cleared and the current position to be advanced to the next editable character.

`MaskedTextProvider.ResetOnPrompt` takes precedence over the `AllowPromptAsInput` property as described in the following table.

|`MaskedTextProvider.ResetOnPrompt`|`MaskedTextProvider.AllowPromptAsInput`|Resulting behavior|
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
|`true`|`true`|The prompt character can be added and it causes the current mask position to be reset. The default.|
|`true`|`false`|The prompt character can be added and it causes the current mask position to be reset.|
|`false`|`true`|The prompt character is processed as a normal input character.|
|`false`|`false`|The prompt character is not valid and methods attempting to add the character will fail.|

## MaskedTextProvider.ResetOnSpace property

```csharp
public bool ResetOnSpace { get; set; }
```

Gets or sets a value that determines how a space input character should be handled.

Returns: `true` if the space input character causes the current editable position in the mask to be reset; otherwise, `false` to indicate that it is to be processed as a normal input character. The default is `true`.

#### Remarks
`MaskedTextProvider` can treat two categories of characters, spaces and prompt characters, in a special manner. Normally, each input character will be tested against the mask and either accepted or rejected. Setting the `ResetOnSpace` property to `true` will result in the current mask character position being cleared and the current position being advanced to the next editable character.

`MaskedTextProvider.ResetOnSpace` is useful when assigning text that was saved excluding the prompt, where the prompt is replaced with a space. Before restoring such a string, setting `MaskedTextProvider.ResetOnSpace` to `true` will reset the prompt characters at the positions occupied by spaces in the input string.

## MaskedTextProvider.SkipLiterals property

```csharp
public bool SkipLiterals { get; set; }
```

Gets or sets a value indicating whether literal character positions in the mask can be overwritten by their same values.

Returns: `true` to allow literals to be added back; otherwise, `false` to not allow the user to overwrite literal characters. The default is `true`.

#### Remarks
Input masks can contain literal and editable characters. If an attempt is made to add an input character to the position in a mask occupied by a literal, the value of the `SkipLiterals` property determines the result.

- If this property is `true`, it is valid to overwrite a literal with the same value when adding input characters. For example, a forward slash character value, `'/'`, could be added to the third position of the mask `"00/00/000"`.

- If this property is `false`, it is not valid to assign any value to a mask position occupied by a literal character.

## MaskedTextProvider.Add(Char) method

```csharp
public bool Add (char input);
```

Adds the specified input character to the end of the formatted string.

Parameters:

- `input`: A `Char` value to be appended to the formatted string.

Returns: `true` if the input character was added successfully; otherwise `false`.

#### Remarks
The `Add` method adds the `input` character value to the first available position in the formatted string after the position that was last assigned, which is represented by the `LastAssignedPosition` property. This method will fail for any of the following reasons:

- The input value, `input`, is not printable, or it does not match its corresponding mask element.

- There are zero available edit positions in the formatted string, or there are no available edit positions after the last assigned position.

## MaskedTextProvider.Add(String) method

```csharp
public bool Add (string input);
```

Adds the characters in the specified input string to the end of the formatted string.

Parameters:

- `input`: A `String` containing character values to be appended to the formatted string.

Returns: `true` if all the characters from the input string were added successfully; otherwise `false` to indicate that no characters were added.

Exceptions:

- `ArgumentNullException`: The `input` parameter is `null`.

#### Remarks
The `Add` method adds the characters from the `input` string to the formatted string, starting with the first available position after `MaskedTextProvider.LastAssignedPosition`. This method will fail for any of the following reasons:

- Any of the characters in the input value, `input`, are not printable, or the input value does not match its corresponding mask element.

- There are not enough available edit positions in the formatted string after the last assigned position.

If this method fails, no additions are made and the method returns `false`.

## MaskedTextProvider.Add(Char, Int32, MaskedTextResultHint) method

```csharp
public bool Add (char input, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Adds the specified input character to the end of the formatted string, and then outputs position and descriptive information.

Parameters:

- `input`: A `Char` value to be appended to the formatted string.
- `testPosition`: The zero-based position in the formatted string where the attempt was made to add the character. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the operation. An output parameter.

Returns: `true` if the input character was added successfully; otherwise `false`.

#### Remarks
The `Add` method attempts to add the `input` character value to the first available position in the formatted string after the position that was last assigned, which is represented by the `LastAssignedPosition` property. This method will fail if all available positions are before the last assigned position. This method will fail for any of the following reasons:

- The input value, `input`, is not printable, or it does not match its corresponding mask element.

- There are zero available edit positions in the formatted string, or there are no available edit positions after the last assigned position.

This method functions the same as the overridden version taking a single `Char` parameter, `Add`, except that it outputs additional information.
