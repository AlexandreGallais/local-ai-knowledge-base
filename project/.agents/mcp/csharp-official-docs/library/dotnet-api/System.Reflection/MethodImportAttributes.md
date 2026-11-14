---
title: "MethodImportAttributes enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/MethodImportAttributes.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MethodImportAttributes enum

Namespace: `System.Reflection`

```csharp
public enum MethodImportAttributes
```

Specifies flags for the unmanaged method import attributes.

#### Remarks

Method import attributes are used with the `MethodImport` structure.

To check whether a value of this enumeration has the specific flag, combine that value with the corresponding mask constant using the bitwise AND operation (`&` in C#) and compare its result with the constant of the flag you need to check. For example, to check for CDecl calling convention, use a code like this:

```csharp
if((attributes & MethodImportAttributes.CallingConventionMask) == MethodImportAttributes.CallingConventionCDecl)
{
    // The calling convention is CDecl
}
```

For more information about the unmanaged method import and the meaning of these attributes, see `DllImportAttribute`.

## MethodImportAttributes.BestFitMappingDisable field

```csharp
BestFitMappingDisable
```

Specifies that the best-fit mapping behavior when converting Unicode characters to ANSI characters is disabled.

## MethodImportAttributes.BestFitMappingEnable field

```csharp
BestFitMappingEnable
```

Specifies that the best-fit mapping behavior when converting Unicode characters to ANSI characters is enabled.

## MethodImportAttributes.BestFitMappingMask field

```csharp
BestFitMappingMask
```

Specifies whether the best-fit mapping behavior when converting Unicode characters to ANSI characters is enabled or disabled.

## MethodImportAttributes.CallingConventionCDecl field

```csharp
CallingConventionCDecl
```

Specifies that the calling convention is CDecl.

## MethodImportAttributes.CallingConventionFastCall field

```csharp
CallingConventionFastCall
```

Specifies that the calling convention is FastCall.

## MethodImportAttributes.CallingConventionMask field

```csharp
CallingConventionMask
```

Specifies the calling convention.

## MethodImportAttributes.CallingConventionStdCall field

```csharp
CallingConventionStdCall
```

Specifies that the calling convention is StdCall.

## MethodImportAttributes.CallingConventionThisCall field

```csharp
CallingConventionThisCall
```

Specifies that the calling convention is ThisCall.

## MethodImportAttributes.CallingConventionWinApi field

```csharp
CallingConventionWinApi
```

Specifies that the default platform calling convention is used.

## MethodImportAttributes.CharSetAnsi field

```csharp
CharSetAnsi
```

Specifies that strings are marshalled as multiple-byte character strings: the system default Windows (ANSI) code page on Windows, and UTF-8 on Unix.

## MethodImportAttributes.CharSetAuto field

```csharp
CharSetAuto
```

Specifies that the character set is chosen automatically. See Charsets and marshaling for details.

## MethodImportAttributes.CharSetMask field

```csharp
CharSetMask
```

Specifies the character set used for string marshalling.

## MethodImportAttributes.CharSetUnicode field

```csharp
CharSetUnicode
```

Specifies that strings are marshalled as Unicode 2-byte character strings.

## MethodImportAttributes.ExactSpelling field

```csharp
ExactSpelling
```

Specifies that the Common Language Runtime should not try an entry-point names with charset-specific suffixes when searching for the imported method.

## MethodImportAttributes.None field

```csharp
None
```

Specifies default method import attributes.

## MethodImportAttributes.SetLastError field

```csharp
SetLastError
```

Specifies that the imported method calls the SetLastError Windows API function before returning.

## MethodImportAttributes.ThrowOnUnmappableCharDisable field

```csharp
ThrowOnUnmappableCharDisable
```

Specifies that an exception should not be thrown when an unmappable Unicode character is converted to an ANSI character.

## MethodImportAttributes.ThrowOnUnmappableCharEnable field

```csharp
ThrowOnUnmappableCharEnable
```

Specifies that an exception should be thrown when an unmappable Unicode character is converted to an ANSI character.

## MethodImportAttributes.ThrowOnUnmappableCharMask field

```csharp
ThrowOnUnmappableCharMask
```

Specifies whether an exception should be thrown when an unmappable Unicode character is converted to an ANSI character.
