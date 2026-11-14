---
title: "BestFitMappingAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/BestFitMappingAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BestFitMappingAttribute class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class BestFitMappingAttribute : Attribute
```

Controls whether Unicode characters are converted to the closest matching ANSI characters.

#### Remarks
You can apply this attribute to an assembly, interface, class, or structure.

> **Caution:**
>  Some characters lack a best-fit representation; these characters are called unmappable. Unmappable characters are usually converted to the default '?' ANSI character. Certain Unicode characters are converted to dangerous characters, such as the backslash '\\' character, which can inadvertently change a path.

`BestFitMappingAttribute` provides two parameters to control aspects of best-fit mapping. You use the first parameter to toggle best-fit mapping on and off. The default value is `true`, which enables best-fit mapping on the assembly, interface, and class levels. An attribute applied to an interface or class overrides an assembly-level attribute. You can likewise enable or disable best-fit mapping for platform invoke calls by using the `BestFitMapping` field. A value set by the platform invoke field overrides all levels of `BestFitMappingAttribute`.

You can use the second parameter to control throwing an exception on unmappable characters. The default value for the `ThrowOnUnmappableChar` field is `false`, which disables throwing an exception each time the runtime encounters a Unicode character that has to be converted to the '?' ANSI character. Even if best-fit mapping is `true`, unmappable characters generate an exception when the `ThrowOnUnmappableChar` field is `true`. To tighten security, you can toggle the first parameter to `false` and the second parameter to `true`. This combination of parameter settings turns best-fit mapping off, but enables the exception-throwing mechanism as a safety precaution.

> **Caution:**
>  You cannot change the default values provided by `BestFitMappingAttribute` when passing a managed array whose elements are ANSI Chars or LPSTRs to an unmanaged safe array. Best-fit mapping is always enabled and no exception can be thrown. Be aware that this combination can compromise your security model.

#### Examples
The following example shows how to disable best fit mapping and to throw an exception on the conversion of Unicode characters to the '?' ANSI character. Setting `BestFitMappingAttribute` parameters in this manner provides an added measure of security.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/BestFitMappingAttribute/Overview/source.cs._

## BestFitMappingAttribute.BestFitMappingAttribute(Boolean) constructor

```csharp
public BestFitMappingAttribute (bool BestFitMapping);
```

Initializes a new instance of the `BestFitMappingAttribute` class set to the value of the `BestFitMappingAttribute.BestFitMapping` property.

Parameters:

- `BestFitMapping`: `true` to indicate that best-fit mapping is enabled; otherwise, `false`. The default is `true`.

To be added.

## BestFitMappingAttribute.BestFitMapping property

```csharp
public bool BestFitMapping { get; }
```

Gets the best-fit mapping behavior when converting Unicode characters to ANSI characters.

Returns: `true` if best-fit mapping is enabled; otherwise, `false`. The default is `true`.

#### Remarks
If best-fit mapping is `false` and `ThrowOnUnmappableChar` is `true`, all Unicode characters that require conversion to ANSI format will generate an exception when passed to unmanaged code. Some characters are unmappable, even when best-fit mapping is `true`. Some characters lack a best-fit representation; these characters are called unmappable. Unmappable characters are usually converted to the default '?' ANSI character.

> **Caution:**
>  Certain Unicode characters are converted to dangerous characters, such as the backslash '\\' character, which can inadvertently change a path.

## BestFitMappingAttribute.ThrowOnUnmappableChar field

```csharp
public bool ThrowOnUnmappableChar;
```

Enables or disables the throwing of an exception on an unmappable Unicode character that is converted to an ANSI '?' character.

#### Remarks
If `false`, the `ThrowOnUnmappableChar` field is disabled; otherwise, an exception is thrown each time the interop marshaler encounters an unmappable character. The default `false`.
