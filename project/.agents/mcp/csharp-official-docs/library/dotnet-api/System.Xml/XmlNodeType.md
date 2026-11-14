---
title: "XmlNodeType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeType enum

Namespace: `System.Xml`

```csharp
public enum XmlNodeType
```

Specifies the type of node.

#### Remarks

The following table provides additional information about XML nodes, as well as their parent and child nodes.

| Field | Description | Can have child nodes: | Can be a child node of: |
|---|---|---|---|
|`Attribute`| |`EntityReference`, `Text`|None. It is not considered a child node of an `Element`.|
|`CDATA`| CDATA sections are used to escape blocks of text that would otherwise be recognized as markup.|None.|`DocumentFragment`, `EntityReference`, and `Element`|
|`Comment`| | None. |`Document`, `DocumentFragment`, `EntityReference`|
|`Document`| |`XmlDeclaration`, `Element` (a maximum of one), `ProcessingInstruction`, `Comment`, `DocumentType`|None|
|`DocumentFragment`|Associates a node or subtree with a document without actually being contained within the document.|`Element`, `ProcessingInstruction`, `Comment`, `Text`, `CDATA`, `EntityReference`|None.
|`DocumentType`| |`Notation`, `Entity`|None|
|`Element`| |`Element`, `Text`, `Comment`, `ProcessingInstruction`, `CDATA`, `EntityReference`| `Document`, `DocumentFragment`, `EntityReference`, `Element`|
|`EndElement`|Returned when the `XmlReader` gets to the end of an element.| | |
|`EndEntity`| | | |
|`Entity`| |Child nodes that represent the expanded entity (for example, `Text` and `EntityReference` nodes) |`DocumentType`|
|`EntityReference`| |`Element`, `ProcessingInstruction`, `Comment`, `Text`, `CDATA`, `EntityReference` |`Attribute`, `DocumentFragment`, `Element`, `EntityReference` |
|`None`| | | |
|`Notation`| | None | `DocumentType`|
|`ProcessingInstruction`| | None | `Document`, `DocumentFragment`, `Element`, `EntityReference`|
|`SignificantWhitespace`| | | |
|`Text`| | None | `Attribute`, `DocumentFragment`, `Element`, `EntityReference` |
|`Whitespace`| | | |
|`XmlDeclaration`| Must be the first node in the document. It can have attributes that provide version and encoding information. |None|`Document`|

## XmlNodeType.Attribute field

```csharp
Attribute
```

An attribute (for example, `id='123'` ).

## XmlNodeType.CDATA field

```csharp
CDATA
```

A CDATA section (for example, `<![CDATA[my escaped text]]>` ).

## XmlNodeType.Comment field

```csharp
Comment
```

A comment (for example, `` ).

## XmlNodeType.Document field

```csharp
Document
```

A document object that, as the root of the document tree, provides access to the entire XML document.

## XmlNodeType.DocumentFragment field

```csharp
DocumentFragment
```

A document fragment.

## XmlNodeType.DocumentType field

```csharp
DocumentType
```

The document type declaration, indicated by the following tag (for example, `<!DOCTYPE...>` ).

## XmlNodeType.Element field

```csharp
Element
```

An element (for example, `<item>` ).

## XmlNodeType.EndElement field

```csharp
EndElement
```

An end element tag (for example, `</item>` ).

## XmlNodeType.EndEntity field

```csharp
EndEntity
```

Returned when `XmlReader` gets to the end of the entity replacement as a result of a call to `XmlReader.ResolveEntity`.

## XmlNodeType.Entity field

```csharp
Entity
```

An entity declaration (for example, `<!ENTITY...>` ).

## XmlNodeType.EntityReference field

```csharp
EntityReference
```

A reference to an entity (for example, `&num;` ).

## XmlNodeType.None field

```csharp
None
```

This is returned by the `XmlReader` if a `Read` method has not been called.

## XmlNodeType.Notation field

```csharp
Notation
```

A notation in the document type declaration (for example, `<!NOTATION...>` ).

## XmlNodeType.ProcessingInstruction field

```csharp
ProcessingInstruction
```

A processing instruction (for example, `<?pi test?>` ).

## XmlNodeType.SignificantWhitespace field

```csharp
SignificantWhitespace
```

White space between markup in a mixed content model or white space within the `xml:space="preserve"` scope.

## XmlNodeType.Text field

```csharp
Text
```

The text content of a node.

A `XmlNodeType.Text` node cannot have any child nodes. It can appear as the child node of the `XmlNodeType.Attribute`, `XmlNodeType.DocumentFragment`, `XmlNodeType.Element`, and `XmlNodeType.EntityReference` nodes.

## XmlNodeType.Whitespace field

```csharp
Whitespace
```

White space between markup.

## XmlNodeType.XmlDeclaration field

```csharp
XmlDeclaration
```

The XML declaration (for example, `<?xml version='1.0'?>` ).

The `XmlNodeType.XmlDeclaration` node must be the first node in the document. It cannot have children. It is a child of the `XmlNodeType.Document` node. It can have attributes that provide version and encoding information.
