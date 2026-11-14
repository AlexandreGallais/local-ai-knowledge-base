---
title: "MaskedTextResultHint enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextResultHint.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextResultHint enum

Namespace: `System.ComponentModel`

```csharp
public enum MaskedTextResultHint
```

Specifies values that succinctly describe the results of a masked text parsing operation.

#### Remarks
The `MaskedTextBox` control delegates the actual responsibility for parsing the input characters to the `MaskedTextProvider` class. Many of the methods of `MaskedTextProvider`, in addition to returning a `Boolean` success result, also provide an additional output parameter of type `MaskedTextResultHint`. This enumeration provides additional information about the operation of the method.

> **Note:**
>  The `MaskedTextProvider.GetOperationResultFromHint` method can be used to convert a `MaskedTextResultHint` value into a `Boolean` success value.

## MaskedTextResultHint.AlphanumericCharacterExpected field

```csharp
AlphanumericCharacterExpected
```

Operation did not succeed.An input character was encountered that was not alphanumeric. .

## MaskedTextResultHint.AsciiCharacterExpected field

```csharp
AsciiCharacterExpected
```

Operation did not succeed.An input character was encountered that was not a member of the ASCII character set.

## MaskedTextResultHint.CharacterEscaped field

```csharp
CharacterEscaped
```

Success. The operation succeeded because a literal, prompt or space character was an escaped character. For more information about escaped characters, see the `MaskedTextProvider.VerifyEscapeChar` method.

## MaskedTextResultHint.DigitExpected field

```csharp
DigitExpected
```

Operation did not succeed. An input character was encountered that was not a digit.

## MaskedTextResultHint.InvalidInput field

```csharp
InvalidInput
```

Operation did not succeed. The program encountered an input character that was not valid. For more information about characters that are not valid, see the `MaskedTextProvider.IsValidInputChar` method.

## MaskedTextResultHint.LetterExpected field

```csharp
LetterExpected
```

Operation did not succeed. An input character was encountered that was not a letter.

## MaskedTextResultHint.NoEffect field

```csharp
NoEffect
```

Success. The primary operation was not performed because it was not needed; therefore, no side effect was produced.

## MaskedTextResultHint.NonEditPosition field

```csharp
NonEditPosition
```

Operation did not succeed. The current position in the formatted string is a literal character.

## MaskedTextResultHint.PositionOutOfRange field

```csharp
PositionOutOfRange
```

Operation did not succeed. The specified position is not in the range of the target string; typically it is either less than zero or greater then the length of the target string.

## MaskedTextResultHint.PromptCharNotAllowed field

```csharp
PromptCharNotAllowed
```

Operation did not succeed. The prompt character is not valid at input, perhaps because the `MaskedTextProvider.AllowPromptAsInput` property is set to `false`.

## MaskedTextResultHint.SideEffect field

```csharp
SideEffect
```

Success. The primary operation was not performed because it was not needed, but the method produced a side effect. For example, the `RemoveAt` method can delete an unassigned edit position, which causes left-shifting of subsequent characters in the formatted string.

## MaskedTextResultHint.SignedDigitExpected field

```csharp
SignedDigitExpected
```

Operation did not succeed. An input character was encountered that was not a signed digit.

## MaskedTextResultHint.Success field

```csharp
Success
```

Success. The primary operation succeeded.

## MaskedTextResultHint.UnavailableEditPosition field

```csharp
UnavailableEditPosition
```

Operation did not succeed. There were not enough edit positions available to fulfill the request.

## MaskedTextResultHint.Unknown field

```csharp
Unknown
```

Unknown. The result of the operation could not be determined.
