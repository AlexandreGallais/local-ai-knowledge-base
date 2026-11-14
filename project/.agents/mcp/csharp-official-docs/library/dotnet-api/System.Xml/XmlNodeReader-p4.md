---
title: "XmlNodeReader class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeReader class (part 4 of 4)

## XmlNodeReader.ResolveEntity() method

```csharp
public override void ResolveEntity ();
```

Resolves the entity reference for `EntityReference` nodes.

Exceptions:

- `InvalidOperationException`: The reader is not positioned on an `EntityReference` node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

If the reader is positioned on an `EntityReference` node (`XmlNodeType.EntityReference`), if `XmlNodeReader.Read` is called after calling this method, the entity replacement text is parsed. When the entity replacement text is finished, an `EndEntity` node is returned to close the entity reference scope.

> **Note:**
> After calling this method, if the entity is part of an attribute value, you must call `XmlNodeReader.ReadAttributeValue` to step into the entity.

#### Examples
The following example uses `ResolveEntity` to expand a general entity.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/ResolveEntity/source.cs._

## XmlNodeReader.Skip() method

```csharp
public override void Skip ();
```

Skips the children of the current node.

#### Remarks

> **Note:**
> To take advantage of newer features, the recommended practice is to create `XmlReader` instances using the `XmlReaderSettings` class and the `XmlReader.Create` method. For more information, see the Remarks section in the `XmlReader` reference page.

For example, suppose you have the following XML input:

```xml
<a name="bob" age="123">
   abc
 </a>
 
...
 
```

If the reader is positioned on the "\" node or any of its attributes, calling `Skip` positions the reader to the "\" node.

If the reader is positioned on a leaf node already (such as element "x" or the text node "abc"), calling `Skip` is the same as calling `XmlNodeReader.Read`.

This method checks for well-formed XML.

#### Examples
The following example reads the price element node in the XML document.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeReader/Skip/source.cs._

## XmlNodeReader.System.Xml.IXmlNamespaceResolver.GetNamespacesInScope(XmlNamespaceScope) method

```csharp
System.Collections.Generic.IDictionary<string,string> IXmlNamespaceResolver.GetNamespacesInScope (System.Xml.XmlNamespaceScope scope);
```

For a description of this member, see `IXmlNamespaceResolver.GetNamespacesInScope`.

Parameters:

- `scope`: `XmlNamespaceScope` object.

Returns: `IDictionary` object that contains the namespaces that are in scope.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlNodeReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlNodeReader.System.Xml.IXmlNamespaceResolver.LookupNamespace(String) method

```csharp
string IXmlNamespaceResolver.LookupNamespace (string prefix);
```

For a description of this member, see `IXmlNamespaceResolver.LookupNamespace`.

Parameters:

- `prefix`: `String` that contains the namespace prefix.

Returns: `String` that contains the namespace name.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlNodeReader` instance is cast to an `IXmlNamespaceResolver` interface.

## XmlNodeReader.System.Xml.IXmlNamespaceResolver.LookupPrefix(String) method

```csharp
string IXmlNamespaceResolver.LookupPrefix (string namespaceName);
```

For a description of this member, see `IXmlNamespaceResolver.LookupPrefix`.

Parameters:

- `namespaceName`: `String` object that identifies the namespace.

Returns: `String` object that contains the namespace prefix.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `XmlNodeReader` instance is cast to an `IXmlNamespaceResolver` interface.
