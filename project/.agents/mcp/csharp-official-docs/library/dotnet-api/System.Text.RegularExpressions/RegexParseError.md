---
title: "RegexParseError enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/RegexParseError.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RegexParseError enum

Namespace: `System.Text.RegularExpressions`

```csharp
public enum RegexParseError
```

Specifies the detailed underlying reason why a `RegexParseException` is thrown when a
regular expression contains a parsing error.

This information is made available through `RegexParseException.Error`.

## RegexParseError.AlternationHasComment field

```csharp
AlternationHasComment
```

An alternation construct in a regular expression contains a comment.

## RegexParseError.AlternationHasMalformedCondition field

```csharp
AlternationHasMalformedCondition
```

An alternation in a regular expression has a malformed condition.

## RegexParseError.AlternationHasMalformedReference field

```csharp
AlternationHasMalformedReference
```

An alternation construct in a regular expression contains a malformed reference.

## RegexParseError.AlternationHasNamedCapture field

```csharp
AlternationHasNamedCapture
```

An alternation construct in a regular expression uses a named capture.

## RegexParseError.AlternationHasTooManyConditions field

```csharp
AlternationHasTooManyConditions
```

An alternation in a regular expression has too many conditions.

## RegexParseError.AlternationHasUndefinedReference field

```csharp
AlternationHasUndefinedReference
```

An alternation construct in a regular expression contains an undefined reference.

## RegexParseError.CaptureGroupNameInvalid field

```csharp
CaptureGroupNameInvalid
```

The group name of a captured group in a regular expression is invalid.

## RegexParseError.CaptureGroupOfZero field

```csharp
CaptureGroupOfZero
```

A regular expression defines a numbered subexpression named zero.

## RegexParseError.ExclusionGroupNotLast field

```csharp
ExclusionGroupNotLast
```

A character class in a regular expression with an exclusion group is not the last part of the character class.

## RegexParseError.InsufficientClosingParentheses field

```csharp
InsufficientClosingParentheses
```

A regular expression has a non-escaped left parenthesis, or misses a closing right parenthesis.

## RegexParseError.InsufficientOpeningParentheses field

```csharp
InsufficientOpeningParentheses
```

A regular expression has a non-escaped right parenthesis, or misses an opening left parenthesis.

## RegexParseError.InsufficientOrInvalidHexDigits field

```csharp
InsufficientOrInvalidHexDigits
```

A hexadecimal escape sequence in a regular expression does not have enough digits, or contains invalid digits.

## RegexParseError.InvalidGroupingConstruct field

```csharp
InvalidGroupingConstruct
```

A grouping construct in a regular expression is invalid or malformed.

## RegexParseError.InvalidUnicodePropertyEscape field

```csharp
InvalidUnicodePropertyEscape
```

A Unicode property escape in a regular expression is invalid or unknown.

## RegexParseError.MalformedNamedReference field

```csharp
MalformedNamedReference
```

A named reference in a regular expression is malformed.

## RegexParseError.MalformedUnicodePropertyEscape field

```csharp
MalformedUnicodePropertyEscape
```

A Unicode property escape is malformed.

## RegexParseError.MissingControlCharacter field

```csharp
MissingControlCharacter
```

A control character in a regular expression is missing.

## RegexParseError.NestedQuantifiersNotParenthesized field

```csharp
NestedQuantifiersNotParenthesized
```

Repeated quantifiers on another quantifier inside a regular expression are not grouped in parentheses.

## RegexParseError.QuantifierAfterNothing field

```csharp
QuantifierAfterNothing
```

A quantifier in a regular expression is in a position where it cannot quantify anything, like at the beginning of a regular expression or in a group.

## RegexParseError.QuantifierOrCaptureGroupOutOfRange field

```csharp
QuantifierOrCaptureGroupOutOfRange
```

A captured group or a quantifier in a regular expression is not within range, that is, it is larger than `Int32.MaxValue`.

## RegexParseError.ReversedCharacterRange field

```csharp
ReversedCharacterRange
```

A character class in a regular expression contains an inverse character range, like z-a instead of a-z.

## RegexParseError.ReversedQuantifierRange field

```csharp
ReversedQuantifierRange
```

A quantifier range in a regular expression is inverse, like `{10,1}` instead of `{1,10}`.

## RegexParseError.ShorthandClassInCharacterRange field

```csharp
ShorthandClassInCharacterRange
```

A character-class in a regular expression contains a short-hand class that is not allowed inside a character class.

## RegexParseError.UndefinedNamedReference field

```csharp
UndefinedNamedReference
```

A used named reference in a regular expression is not defined.

## RegexParseError.UndefinedNumberedReference field

```csharp
UndefinedNumberedReference
```

A used numbered reference in a regular expression is not defined.

## RegexParseError.UnescapedEndingBackslash field

```csharp
UnescapedEndingBackslash
```

A regular expression ends with a non-escaped ending backslash.

## RegexParseError.Unknown field

```csharp
Unknown
```

An unknown regular expression parse error.

## RegexParseError.UnrecognizedControlCharacter field

```csharp
UnrecognizedControlCharacter
```

A control character in a regular expression is not recognized.

## RegexParseError.UnrecognizedEscape field

```csharp
UnrecognizedEscape
```

An escape character or sequence in a regular expression is invalid.

## RegexParseError.UnrecognizedUnicodeProperty field

```csharp
UnrecognizedUnicodeProperty
```

A unicode property in a regular expression is not recognized, or invalid.

## RegexParseError.UnterminatedBracket field

```csharp
UnterminatedBracket
```

A regular expression has a non-escaped left square bracket, or misses a closing right square bracket.

## RegexParseError.UnterminatedComment field

```csharp
UnterminatedComment
```

A comment in a regular expression is not terminated.
