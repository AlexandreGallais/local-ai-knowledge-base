---
title: "XmlNodeList class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNodeList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNodeList class

Namespace: `System.Xml`

```csharp
public abstract class XmlNodeList : IDisposable, System.Collections.IEnumerable
```

Represents an ordered collection of nodes.

#### Remarks
Changes to the children of the node object that the `XmlNodeList` collection was created from are immediately reflected in the nodes returned by the `XmlNodeList` properties and methods. `XmlNodeList` supports iteration and indexed access.

`XmlNodeList` is returned by the following properties and methods.

-   `ChildNodes` - Returns an `XmlNodeList` containing all the children of the node.

-   `XmlNode.SelectNodes` - Returns an `XmlNodeList` containing a collection of nodes matching the XPath query.

-   `GetElementsByTagName` - Returns an `XmlNodeList` containing a list of all descendant elements that match the specified name. This method is available in both the `XmlDocument` and `XmlElement` classes.

## XmlNodeList.XmlNodeList() constructor

```csharp
protected XmlNodeList ();
```

Initializes a new instance of the `XmlNodeList` class.

To be added.

## XmlNodeList.Count property

```csharp
public abstract int Count { get; }
```

Gets the number of nodes in the `XmlNodeList`.

Returns: The number of nodes in the `XmlNodeList`.

#### Examples
The following example creates a `XmlDocument` object and uses the `XmlDocument.GetElementsByTagName` method and the resulting `XmlNodeList` to display all the book titles.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/GetElementsByTagName/source.cs._

The example uses the file `2books.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlElement.GetElementsByTagName Example/XML/source.xml._
## XmlNodeList.ItemOf property

```csharp
public virtual System.Xml.XmlNode? this[int i] { get; }
```

Gets a node at the given index.

Parameters:

- `i`: The zero-based index into the list of nodes.

Returns: The `XmlNode` with the specified index in the collection. If index is greater than or equal to the number of nodes in the list, this returns `null`.

#### Examples
The following example creates an `XmlDocument` object and uses the `XmlDocument.GetElementsByTagName` method and the resulting `XmlNodeList` to display all the book titles.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlElement/GetElementsByTagName/source.cs._

The example uses the file `2books.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlElement.GetElementsByTagName Example/XML/source.xml._
## XmlNodeList.GetEnumerator() method

```csharp
public abstract System.Collections.IEnumerator GetEnumerator ();
```

Gets an enumerator that iterates through the collection of nodes.

Returns: An enumerator used to iterate through the collection of nodes.

#### Remarks
Provides a simple "foreach" style iteration over the collection of nodes in the `XmlNodeList`.

#### Examples
The following example displays all the book titles.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeList/GetEnumerator/source.cs._

The example uses the file `2books.xml` as input.

_Code sample not included: ~/snippets/xml/VS_Snippets_Data/Classic WebData XmlNodeList.GetEnumerator Example/XML/source.xml._
## XmlNodeList.Item(Int32) method

```csharp
public abstract System.Xml.XmlNode? Item (int index);
```

Retrieves a node at the given index.

Parameters:

- `index`: The zero-based index into the list of nodes.

Returns: The `XmlNode` with the specified index in the collection. If `index` is greater than or equal to the number of nodes in the list, this returns `null`.

#### Examples
The following example gets and displays the second node in the `XmlNodeList`.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNodeList/Item/source.cs._

## XmlNodeList.PrivateDisposeNodeList() method

```csharp
protected virtual void PrivateDisposeNodeList ();
```

Disposes resources in the node list privately.

To be added.

## XmlNodeList.System.IDisposable.Dispose() method

```csharp
void IDisposable.Dispose ();
```

Releases all resources used by the `XmlNodeList` class.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `XmlNodeList` instance is cast to an `IDisposable` interface.
