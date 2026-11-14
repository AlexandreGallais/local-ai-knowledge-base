---
title: "CharSet enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CharSet.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CharSet enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CharSet
```

Dictates which character set marshaled strings should use.

#### Remarks
Because there are several unmanaged string types and only one managed string type, you must use a character set to specify how managed strings should be marshaled to unmanaged code. This enumeration, which provides character set options, is used by `DllImportAttribute` and `StructLayoutAttribute`. For a detailed description of the string marshaling and name matching behavior associated with this enumeration, see Specifying a Character Set.

#### Examples
The following code example shows how to specify a `CharSet` enumeration value when applying the `StructLayoutAttribute` to a managed definition.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/CharSet/Overview/source.cs._

## CharSet.Ansi field

```csharp
Ansi
```

Marshal strings as multiple-byte character strings: the system default Windows (ANSI) code page on Windows, and UTF-8 on Unix.

## CharSet.Auto field

```csharp
Auto
```

Automatically marshal strings appropriately for the target operating system. See Charsets and marshaling for details. Although the common language runtime default is `CharSet.Auto`, languages may override this default. For example, by default C# and Visual Basic mark all methods and types as `CharSet.Ansi`.

## CharSet.None field

```csharp
None
```

This value is obsolete and has the same behavior as `CharSet.Ansi`.

## CharSet.Unicode field

```csharp
Unicode
```

Marshal strings as Unicode 2-byte character strings.
