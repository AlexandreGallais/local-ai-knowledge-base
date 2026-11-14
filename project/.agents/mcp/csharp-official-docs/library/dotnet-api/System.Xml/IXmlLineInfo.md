---
title: "IXmlLineInfo interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IXmlLineInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IXmlLineInfo interface

Namespace: `System.Xml`

```csharp
public interface IXmlLineInfo
```

Provides an interface to enable a class to return line and position information.

#### Examples
The following example parses an XML fragment. Each node is displayed, including its depth, line number, and line position.

_Code sample not included: ~/snippets/csharp/System.Xml/IXmlLineInfo/Overview/lineinfo.cs._

## IXmlLineInfo.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the current line number.

Returns: The current line number or 0 if no line information is available (for example, `IXmlLineInfo.HasLineInfo` returns `false`).

#### Remarks
This property is used primarily for error reporting, but can be called at any time. The starting value is 1. Combined with `LinePosition`, a value of 1,1 indicates the start of a document.

## IXmlLineInfo.LinePosition property

```csharp
public int LinePosition { get; }
```

Gets the current line position.

Returns: The current line position or 0 if no line information is available (for example, `IXmlLineInfo.HasLineInfo` returns `false`).

#### Remarks
This property is used primarily for error reporting, but can be called at any time. The starting value is 1. Combined with `LineNumber`, a value of 1,1 indicates the start of a document.

## IXmlLineInfo.HasLineInfo() method

```csharp
public bool HasLineInfo ();
```

Gets a value indicating whether the class can return line information.

Returns: `true` if `IXmlLineInfo.LineNumber` and `IXmlLineInfo.LinePosition` can be provided; otherwise, `false`.

To be added.
