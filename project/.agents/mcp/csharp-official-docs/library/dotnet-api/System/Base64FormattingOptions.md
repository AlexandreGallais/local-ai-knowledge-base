---
title: "Base64FormattingOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Base64FormattingOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Base64FormattingOptions enum

Namespace: `System`

```csharp
public enum Base64FormattingOptions
```

Specifies whether relevant `ToBase64CharArray` and `ToBase64String` methods insert line breaks in their output.

#### Remarks
The `Convert.ToBase64CharArray` and `Convert.ToBase64String` methods convert the value of an array of 8-bit unsigned integers to an equivalent string representation that consists of base 64 digits. The string representation can contain one or more line breaks, where a line break is defined as a carriage return character (U+000D) followed by a line feed character (U+000A). Because line breaks are considered white-space characters in a base-64 encoding, they are ignored when converting a base-64 encoded string back to a byte array. The line breaks are simply convenient when displaying the encoded string to a control or a device such as a console window.

The `None` and `InsertLineBreaks` values are mutually exclusive. Therefore, although the `Base64FormattingOptions` enumeration is marked with the `FlagsAttribute` attribute, it makes no sense to perform a bitwise combination of these two values.

#### Examples
The following example calls the `ToBase64String` method with a `InsertLineBreaks` argument to insert line breaks in the string that is produced by encoding a 100-element byte array:

_Code sample not included: ~/snippets/csharp/System/Base64FormattingOptions/Overview/ToBase64String3.cs._

As the output from the example shows, the `Convert.FromBase64String` succeeds in restoring the original byte array; the line break characters are ignored during the conversion.

## Base64FormattingOptions.InsertLineBreaks field

```csharp
InsertLineBreaks
```

Inserts line breaks after every 76 characters in the string representation.

## Base64FormattingOptions.None field

```csharp
None
```

Does not insert line breaks after every 76 characters in the string representation.
