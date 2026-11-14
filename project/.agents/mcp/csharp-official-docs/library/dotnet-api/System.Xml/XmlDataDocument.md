---
title: "XmlDataDocument class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlDataDocument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlDataDocument class

Namespace: `System.Xml`

```csharp
public class XmlDataDocument : System.Xml.XmlDocument
```

Allows structured data to be stored, retrieved, and manipulated through a relational `DataSet`.

To be added.

## XmlDataDocument.XmlDataDocument() constructor

```csharp
public XmlDataDocument ();
```

Initializes a new instance of the `XmlDataDocument` class.

#### Remarks
An empty `DataSet` is created and associated with the `XmlDataDocument`.

## XmlDataDocument.XmlDataDocument(DataSet) constructor

```csharp
public XmlDataDocument (System.Data.DataSet dataset);
```

Initializes a new instance of the `XmlDataDocument` class with the specified `DataSet`.

Parameters:

- `dataset`: The `DataSet` to load into `XmlDataDocument`.

#### Remarks
The `XmlDataDocument` is synchronized with the specified `DataSet`. Any data in the `DataSet` is immediately available through the `XmlDataDocument`. Any changes in the `DataSet` are propagated in the `XmlDataDocument`. Any changes made in the `XmlDataDocument`, provided they match the `DataSet` schema, are propagated in the `DataSet`.

## XmlDataDocument.DataSet property

```csharp
public System.Data.DataSet DataSet { get; }
```

Gets a `DataSet` that provides a relational representation of the data in the `XmlDataDocument`.

Returns: A `DataSet` that can be used to access the data in the `XmlDataDocument` using a relational model.

#### Remarks
The `DataSet` enables you to access the data in the `XmlDataDocument` using a relational model. This means that you can handle the data as tables and views, rows and columns, relations, and so on. Changes made in the `DataSet` are immediately visible in the `XmlDataDocument`.

## XmlDataDocument.CloneNode(Boolean) method

```csharp
public override System.Xml.XmlNode CloneNode (bool deep);
```

Creates a duplicate of the current node.

Parameters:

- `deep`: `true` to recursively clone the subtree under the specified node; `false` to clone only the node itself.

Returns: The cloned node.

#### Remarks
Cloning the `XmlDataDocument` also clones the `DataSet` schema.

If `deep` is set to `false`, the cloned `DataSet` has no data; that is, no rows.

If `deep` is set to `true`, the cloned `DataSet` is set with the schema and then populated with the data.

See `XmlNode.CloneNode` in the `XmlNode` class to see a table describing how this method behaves with each of the different node types.

## XmlDataDocument.CreateElement(String, String, String) method

```csharp
public override System.Xml.XmlElement CreateElement (string? prefix, string localName, string? namespaceURI);
```

Creates an element with the specified `XmlNode.Prefix`, `XmlDocument.LocalName` , and `XmlNode.NamespaceURI`.

Parameters:

- `prefix`: The prefix of the new element. If String.Empty or `null`, there is no prefix.
- `localName`: The local name of the new element.
- `namespaceURI`: The namespace Uniform Resource Identifier (URI) of the new element. If String.Empty or `null`, there is no namespaceURI.

Returns: A new `XmlElement`.

To be added.

## XmlDataDocument.CreateEntityReference(String) method

```csharp
public override System.Xml.XmlEntityReference CreateEntityReference (string name);
```

Creates an `XmlEntityReference` with the specified name.

Parameters:

- `name`: The name of the entity reference.

Returns: An `XmlEntityReference` with the specified name.

Exceptions:

- `NotSupportedException`: Calling this method.

#### Remarks
`XmlEntityReference` nodes cannot be created for `XmlDataDocument` objects. Calling this method throws an exception.

## XmlDataDocument.CreateNavigator(XmlNode) method

```csharp
protected override System.Xml.XPath.XPathNavigator? CreateNavigator (System.Xml.XmlNode node);
```

Creates a new `XPathNavigator` object for navigating this document. The `XPathNavigator` is positioned on the node specified in the `node` parameter.

Parameters:

- `node`: The `XmlNode` you want the navigator initially positioned on.

Returns: An `XPathNavigator` used to navigate the document.

#### Remarks
The `XPathNavigator` provides read-only, random access to data. Because it is optimized for XSLT transformations, it provides performance benefits when used as an input mechanism to the `XslTransform.Transform` method.

#### Examples
To see an XSLT transformation using `XmlDataDocument` and an `XPathNavigator`, see the `XslTransform.Transform` method.

## XmlDataDocument.GetElementById(String) method

```csharp
public override System.Xml.XmlElement? GetElementById (string elemId);
```

Gets the `XmlElement` with the specified ID. This method is not supported by the `XmlDataDocument` class. Calling this method throws an exception.

Parameters:

- `elemId`: The attribute ID to match.

Returns: An `XmlElement` with the specified ID.

Exceptions:

- `NotSupportedException`: Calling this method.

#### Remarks
This method is not supported by the `XmlDataDocument` class.

## XmlDataDocument.GetElementFromRow(DataRow) method

```csharp
public System.Xml.XmlElement GetElementFromRow (System.Data.DataRow r);
```

Retrieves the `XmlElement` associated with the specified `DataRow`.

Parameters:

- `r`: The `DataRow` whose associated `XmlElement` you want to retrieve.

Returns: The `XmlElement` containing a representation of the specified `DataRow`.

To be added.

## XmlDataDocument.GetElementsByTagName(String) method

```csharp
public override System.Xml.XmlNodeList GetElementsByTagName (string name);
```

Returns an `XmlNodeList` containing a list of all descendant elements that match the specified `XmlDocument.Name`.

Parameters:

- `name`: The qualified name to match. It is matched against the `XmlDocument.Name` property of the matching node. The special value "*" matches all tags.

Returns: An `XmlNodeList` containing a list of all matching nodes.

#### Remarks

> **Note:**
> It is recommended that you use the `XmlNode.SelectNodes` or `XmlNode.SelectSingleNode` method instead of the `XmlDataDocument.GetElementsByTagName` method.

## XmlDataDocument.GetRowFromElement(XmlElement) method

```csharp
public System.Data.DataRow? GetRowFromElement (System.Xml.XmlElement? e);
```

Retrieves the `DataRow` associated with the specified `XmlElement`.

Parameters:

- `e`: The `XmlElement` whose associated `DataRow` you want to retrieve.

Returns: The `DataRow` containing a representation of the `XmlElement`; `null` if there is no `DataRow` associated with the `XmlElement`.

To be added.

## XmlDataDocument.Load(Stream) method

```csharp
public override void Load (System.IO.Stream inStream);
```

Loads the `XmlDataDocument` from the specified stream.

Parameters:

- `inStream`: The stream containing the XML document to load.

#### Remarks
`XmlDataDocument` does not support creating entity references. If the data includes entity references, the `Load` method resolves and expands any entity references.

> **Note:**
> In order to view the XML data relationally, you must first specify a schema to use for data mapping. This can be done either by calling the `DataSet.ReadXmlSchema` method or by creating the tables and columns within the `DataSet` manually. This step must be done before calling `Load`.

## XmlDataDocument.Load(TextReader) method

```csharp
public override void Load (System.IO.TextReader txtReader);
```

Loads the `XmlDataDocument` from the specified `TextReader`.

Parameters:

- `txtReader`: The `TextReader` used to feed the XML data into the document.

#### Remarks
`XmlDataDocument` does not support creating entity references. If the data includes entity references, the `Load` method resolves and expands any entity references.

> **Note:**
> In order to view the XML data relationally, you must first specify a schema to use for data mapping. This can be done either by calling the `DataSet.ReadXmlSchema` method or by creating the tables and columns within the `DataSet` manually. This step must be done before calling `Load`.

## XmlDataDocument.Load(String) method

```csharp
public override void Load (string filename);
```

Loads the `XmlDataDocument` using the specified URL.

Parameters:

- `filename`: The URL of the file containing the XML document to load.

#### Remarks
`XmlDataDocument` does not support creating entity references. If the data includes entity references, the `Load` method resolves and expands any entity references.

> **Note:**
> In order to view the XML data relationally, you must first specify a schema to use for data mapping. This can be done either by calling the `DataSet.ReadXmlSchema` method or by creating the tables and columns within the `DataSet` manually. This step must be done before calling `Load`.

## XmlDataDocument.Load(XmlReader) method

```csharp
public override void Load (System.Xml.XmlReader reader);
```

Loads the `XmlDataDocument` from the specified `XmlReader`.

Parameters:

- `reader`: The `XmlReader` containing the XML document to load.

Exceptions:

- `NotSupportedException`: The XML being loaded contains entity references, and the reader cannot resolve entities.

#### Remarks
`XmlDataDocument` does not support creating entity references. If the data source contains entity references, you must create an `XmlValidatingReader` with the `EntityHandling` property set to EntityHandling.ExpandEntities (this is the default behavior) and pass the `XmlValidatingReader` to the `Load` method. If you do not use an `XmlValidatingReader`, the `Load` method throws an exception.

The `Load` method always preserves significant white space. The `PreserveWhitespace` property determines whether or not white space is preserved. The default is `false`, white space is not preserved.

If the reader is in the initial state (that is, ReadState=ReadState.Initial), `Load` consumes the entire contents of the reader and builds the DOM from what it finds.

If the reader is already positioned on some node at depth "n", then this method loads that node and all subsequent siblings up to the end tag that closes depth "n". This has the following results.

If the current node and its following siblings look similar to the following:

```xml
<!--comment--><element1>one</element1><element2>two</element2>
```

`Load` throws an exception, because a document cannot have two root-level elements. If the current node and its following siblings look similar to the following:

```xml
<!--comment--><?process
    instruction?><!--comment--></endtag>
```

`Load` will succeed; however, you will have an incomplete DOM tree, because there is no root-level element. You have to add a root-level element before you save the document; otherwise, the `XmlDocument.Save` method throws an exception.

If the reader is positioned on a leaf node that is invalid for the root level of a document (for example, a white space or attribute node), the reader continues to read until it is positioned on a node that can be used for the root. The document begins loading at this point.
