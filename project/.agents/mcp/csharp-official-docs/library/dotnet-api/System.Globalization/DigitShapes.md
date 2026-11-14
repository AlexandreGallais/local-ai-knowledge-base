---
title: "DigitShapes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DigitShapes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DigitShapes enum

Namespace: `System.Globalization`

```csharp
public enum DigitShapes
```

Specifies the culture-specific display of digits.

#### Remarks
A `DigitShapes` value specifies that no digit shape is substituted for the Unicode input, a digit shape is substituted based on context, or a native national digit shape is substituted for the input.

The Arabic, Indic, and Thai languages have classical shapes for numbers that are different from the digits 0 through 9 (Unicode U+0030 through U+0039), which are most often used on computers. The application uses the `DigitShapes` enumeration with the `DigitSubstitution` property to specify how to display digits U+0030 through U+0039 in the absence of other formatting information.

The `DigitShapes` enumeration is primarily used by applications intended for cultures that use bidirectional scripts. For example, the reading order of Arabic and Indic scripts is bidirectional.

## DigitShapes.Context field

```csharp
Context
```

The digit shape depends on the previous text in the same output. European digits follow Latin scripts; Arabic-Indic digits follow Arabic text; and Thai digits follow Thai text.

## DigitShapes.NativeNational field

```csharp
NativeNational
```

The digit shape is the native equivalent of the digits from 0 through 9. ASCII digits from 0 through 9 are replaced by equivalent native national digits.

## DigitShapes.None field

```csharp
None
```

The digit shape is not changed. Full Unicode compatibility is maintained.
