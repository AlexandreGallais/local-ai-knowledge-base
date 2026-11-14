---
title: "XmlNodeEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlNodeEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeEventArgs class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlNodeEventArgs : EventArgs
```

Provides data for the `XmlSerializer.UnknownNode` event.

#### Remarks
For more information about how to handle events, see Handling and Raising Events.

The `UnknownNode` event can occur only when you call the `XmlSerializer.Deserialize` method.

#### Examples
The following example uses the `UnknownNode` event of the `XmlSerializer` to print various properties of an unknown XML node that is encountered when calling the `XmlSerializer` class's `XmlSerializer.Deserialize` method.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/Overview/source.cs._

## XmlNodeEventArgs.LineNumber property

```csharp
public int LineNumber { get; }
```

Gets the line number of the unknown XML node.

Returns: The line number of the unknown XML node.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/Overview/source.cs._

## XmlNodeEventArgs.LinePosition property

```csharp
public int LinePosition { get; }
```

Gets the position in the line of the unknown XML node.

Returns: The position number of the unknown XML node.

#### Examples
_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/Overview/source.cs._

## XmlNodeEventArgs.LocalName property

```csharp
public string LocalName { get; }
```

Gets the XML local name of the XML node being deserialized.

Returns: The XML local name of the node being deserialized.

#### Remarks
The `LocalName` property returns the local name (also known as a local part) of an XML qualified name. The `LocalName` property conforms to the 1999 http://www.w3.org specification `Namespaces in XML`.

#### Examples
The following example prints the `LocalName` of an unknown XML node that is encountered when calling the `XmlSerializer` class's `XmlSerializer.Deserialize` method.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/LocalName/source.cs._

## XmlNodeEventArgs.Name property

```csharp
public string Name { get; }
```

Gets the name of the XML node being deserialized.

Returns: The name of the node being deserialized.

#### Examples
The following example prints the name of the unknown node that caused the `UnknownNode` event to occur.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/Name/source.cs._

## XmlNodeEventArgs.NamespaceURI property

```csharp
public string NamespaceURI { get; }
```

Gets the namespace URI that is associated with the XML node being deserialized.

Returns: The namespace URI that is associated with the XML node being deserialized.

#### Examples
The following example prints the URI of the unknown XML node that caused the `UnknownNode` event to occur.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/NamespaceURI/source.cs._

## XmlNodeEventArgs.NodeType property

```csharp
public System.Xml.XmlNodeType NodeType { get; }
```

Gets the type of the XML node being deserialized.

Returns: The `XmlNodeType` that represents the XML node being deserialized.

#### Remarks
The `XmlNodeType` enumeration returns a description of the node being deserialized. For example, it returns "Comment" if the node is a comment.

#### Examples
The following example prints a description of the unknown node that caused the `UnknownNode` event to occur.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/NodeType/source.cs._

## XmlNodeEventArgs.ObjectBeingDeserialized property

```csharp
public object? ObjectBeingDeserialized { get; }
```

Gets the object being deserialized.

Returns: The `Object` being deserialized.

#### Examples
The following example prints the value returned by the `Object.ToString` method when the `XmlSerializer.Deserialize` method encounters an unknown XML node.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/ObjectBeingDeserialized/source.cs._

## XmlNodeEventArgs.Text property

```csharp
public string? Text { get; }
```

Gets the text of the XML node being deserialized.

Returns: The text of the XML node being deserialized.

#### Examples
The following example prints the text of the unknown XML node that caused the `UnknownNode` event to occur.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlNodeEventArgs/Text/source.cs._
