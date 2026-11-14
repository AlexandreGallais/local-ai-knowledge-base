---
title: "XmlReader class (part 3 of 16)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlReader.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlReader class (part 3 of 16)

## XmlReader.CanResolveEntity property

```csharp
public virtual bool CanResolveEntity { get; }
```

Gets a value indicating whether this reader can parse and resolve entities.

Returns: `true` if the reader can parse and resolve entities; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property always returns `false` for implementations of `XmlReader` that do not support DTD information. In this case, calling `XmlReader.ResolveEntity` throws an exception.

## XmlReader.Depth property

```csharp
public abstract int Depth { get; }
```

When overridden in a derived class, gets the depth of the current node in the XML document.

Returns: The depth of the current node in the XML document.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
See `Depth` (in the `XmlTextReader` class) for an example using this property.

## XmlReader.EOF property

```csharp
public abstract bool EOF { get; }
```

When overridden in a derived class, gets a value indicating whether the reader is positioned at the end of the stream.

Returns: `true` if the reader is positioned at the end of the stream; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

To be added.

## XmlReader.HasAttributes property

```csharp
public virtual bool HasAttributes { get; }
```

Gets a value indicating whether the current node has any attributes.

Returns: `true` if the current node has attributes; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.HasValue property

```csharp
public virtual bool HasValue { get; }
```

When overridden in a derived class, gets a value indicating whether the current node can have a `XmlReader.Value`.

Returns: `true` if the node on which the reader is currently positioned can have a `Value`; otherwise, `false`. If `false`, the node has a value of `String.Empty`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
The following table lists node types that have a value to return.

|Node Type|Value|
|---------------|-----------|
|`Attribute`|The value of the attribute.|
|`CDATA`|The content of the CDATA section.|
|`Comment`|The content of the comment.|
|`DocumentType`|The internal subset.|
|`ProcessingInstruction`|The entire content, excluding the target.|
|`SignificantWhitespace`|The white space between markup in a mixed content model.|
|`Text`|The content of the text node.|
|`Whitespace`|The white space between markup.|
|`XmlDeclaration`|The content of the declaration.|

#### Examples
See `HasValue` (in the `XmlTextReader` class) for a sample using this method.

## XmlReader.IsDefault property

```csharp
public virtual bool IsDefault { get; }
```

When overridden in a derived class, gets a value indicating whether the current node is an attribute that was generated from the default value defined in the DTD or schema.

Returns: `true` if the current node is an attribute whose value was generated from the default value defined in the DTD or schema; `false` if the attribute value was explicitly set.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
`IsDefault` always returns `false` for implementations of `XmlReader` that do not support schema or DTD information. This property applies only to an attribute node.

#### Examples
The following example displays all attributes on the root element.

```csharp
using System;
using System.IO;
using System.Xml;

public class Sample
{
  public static void Main(){

    // Create the reader.
    XmlReader reader = XmlReader.Create("book4.xml");

    reader.MoveToContent();

    // Display each of the attribute nodes, including default attributes.
    while (reader.MoveToNextAttribute()){
        if (reader.IsDefault)
          Console.Write("(default attribute) ");
        Console.WriteLine("{0} = {1}", reader.Name, reader.Value);
    }

    //Close the reader.
    reader.Close();

  }
} // End class
```

The example uses the following files as input.

`book4.xml`

```xml
<!DOCTYPE book SYSTEM 'book.dtd'>
<book ISBN = '1-861001-57-5'>
  <title>Pride And Prejudice</title>
  <price>19.95</price>
</book>
```

`book.dtd`

```dtd
<!ELEMENT book (title,price)>
<!ATTLIST book
   genre CDATA "novel"
   ISBN CDATA #REQUIRED>
<!ELEMENT title (#PCDATA)>
<!ELEMENT price (#PCDATA)>
```

## XmlReader.IsEmptyElement property

```csharp
public abstract bool IsEmptyElement { get; }
```

When overridden in a derived class, gets a value indicating whether the current node is an empty element (for example, `<MyElement/>`).

Returns: `true` if the current node is an element (`XmlReader.NodeType` equals `XmlNodeType.Element`) that ends with `/>`; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property enables you to determine the difference between the following:

`` (`IsEmptyElement` is `true`).

`` (`IsEmptyElement` is `false`, although element content is empty).

A corresponding `EndElement` node is not generated for empty elements.

If default content has been added to an element due to schema validation, `IsEmptyElement` still returns `true`. It has no bearing on whether or not the element has a default value. In other words, `IsEmptyElement` simply reports whether or not the element in the source document had an end element tag.

#### Examples
The following example displays the text content of each element.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, `elems.xml`, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/elems.xml._
## XmlReader.Item property

```csharp
public virtual string this[int i] { get; }
```

When overridden in a derived class, gets the value of the attribute with the specified index.

Parameters:

- `i`: The index of the attribute.

Returns: The value of the specified attribute.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property does not move the reader.

#### Examples
The following example displays all attributes on the current node.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.Item property

```csharp
public virtual string? this[string name] { get; }
```

When overridden in a derived class, gets the value of the attribute with the specified `XmlReader.Name`.

Parameters:

- `name`: The qualified name of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property does not move the reader.

If the reader is positioned on a `DocumentType` node, this method can be used to get the PUBLIC and SYSTEM literals, for example, `reader["PUBLIC"]`

#### Examples
The following example gets the value of the ISBN attribute.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

## XmlReader.Item property

```csharp
public virtual string? this[string name, string? namespaceURI] { get; }
```

When overridden in a derived class, gets the value of the attribute with the specified `XmlReader.LocalName` and `XmlReader.NamespaceURI`.

Parameters:

- `name`: The local name of the attribute.
- `namespaceURI`: The namespace URI of the attribute.

Returns: The value of the specified attribute. If the attribute is not found, `null` is returned.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property does not move the reader.

## XmlReader.LocalName property

```csharp
public abstract string LocalName { get; }
```

When overridden in a derived class, gets the local name of the current node.

Returns: The name of the current node with the prefix removed. For example, `LocalName` is `book` for the element `<bk:book>`.

For node types that do not have a name (like `Text`, `Comment`, and so on), this property returns `String.Empty`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example displays the local name of each node, and, if they exist, the prefix and namespace URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, book2.xml, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/book2.xml._
## XmlReader.Name property

```csharp
public virtual string Name { get; }
```

When overridden in a derived class, gets the qualified name of the current node.

Returns: The qualified name of the current node. For example, `Name` is `bk:book` for the element `<bk:book>`.

The name returned is dependent on the `XmlReader.NodeType` of the node. The following node types return the listed values. All other node types return an empty string.

- `Attribute`:  The name of the attribute.

- `DocumentType`:  The document type name.

- `Element`:  The tag name.

- `EntityReference`:  The name of the entity referenced.

- `ProcessingInstruction`:  The target of the processing instruction.

- `XmlDeclaration`:  The literal string `xml`.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example reads an XML file and displays each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The sample uses the `items.xml` file.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/items.xml._
## XmlReader.NamespaceURI property

```csharp
public abstract string NamespaceURI { get; }
```

When overridden in a derived class, gets the namespace URI (as defined in the W3C Namespace specification) of the node on which the reader is positioned.

Returns: The namespace URI of the current node; otherwise an empty string.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
This property is relevant to `Element` and `Attribute` nodes only.

#### Examples
The following example displays the local name of each node, and, if they exist, the prefix and namespace URI.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The example uses the file, book2.xml, as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/book2.xml._
## XmlReader.NameTable property

```csharp
public abstract System.Xml.XmlNameTable NameTable { get; }
```

When overridden in a derived class, gets the `XmlNameTable` associated with this implementation.

Returns: The `XmlNameTable` enabling you to get the atomized version of a string within the node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Remarks
All node and attribute names returned from `XmlReader` are atomized using the `NameTable`. When the same name is returned multiple times (for example, `Customer`), then the same `String` object will be returned for that name. This makes it possible for you to write efficient code that does object comparisons on these strings instead of expensive string comparisons.

## XmlReader.NodeType property

```csharp
public abstract System.Xml.XmlNodeType NodeType { get; }
```

When overridden in a derived class, gets the type of the current node.

Returns: One of the enumeration values that specify the type of the current node.

Exceptions:

- `InvalidOperationException`: An `XmlReader` method was called before a previous asynchronous operation finished. In this case, `InvalidOperationException` is thrown with the message "An asynchronous operation is already in progress."

#### Examples
The following example reads an XML file and displays each of the nodes.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlReader/Overview/XmlReader_Basic.cs._

The sample uses the `items.xml` file.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/XML_Core_Files/XML/items.xml._
