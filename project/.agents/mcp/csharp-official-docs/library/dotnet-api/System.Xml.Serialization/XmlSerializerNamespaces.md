---
title: "XmlSerializerNamespaces class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/XmlSerializerNamespaces.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlSerializerNamespaces class

Namespace: `System.Xml.Serialization`

```csharp
public class XmlSerializerNamespaces
```

Contains the XML namespaces and prefixes that the `XmlSerializer` uses to generate qualified names in an XML-document instance.

#### Remarks
The `XmlSerializerNamespaces` contains a collection of XML namespaces, each with an associated prefix. The `XmlSerializer` uses an instance of the `XmlSerializerNamespaces` class to create qualified names in an XML document.

XML namespaces contained by the `XmlSerializerNamespaces` must conform to the W3C specification named Namespaces in XML.

XML namespaces provide a way to qualify the names of XML elements and attributes in XML documents. A qualified name consists of a prefix and a local name, separated by a colon. The prefix functions only as a placeholder; it is mapped to a URI that specifies a namespace. The combination of the universally-managed URI namespace and the local name produces a name that is guaranteed to be universally unique.

To create qualified names in an XML document:

1.  Create an `XmlSerializerNamespaces` instance.

2.  `XmlSerializerNamespaces.Add` each prefix and namespace pair that you want to the instance.

3.  Apply the appropriate.NET attribute to each property or class that the `XmlSerializer` serializes into an XML document. The available attributes are:

-   `XmlArrayAttribute`

-   `XmlArrayItemAttribute`

-   `XmlAttributeAttribute`

-   `XmlElementAttribute`

-   `XmlRootAttribute`

-   `XmlTypeAttribute`

1.  Set the `Namespace` property of each attribute to one of the namespace values from the `XmlSerializerNamespaces` object.

2.  Pass the `XmlSerializerNamespaces` to the `XmlSerializer.Serialize` method of the `XmlSerializer`.

> **Note:**
> The creation of an empty namespace and prefix pair is not supported. That is, you cannot create a pair using the following code:

```csharp
XmlSerializerNamespaces ns = new XmlSerializerNamespaces();
ns.Add("", "");
```

```vb
Dim ns As XmlSerializerNamespaces ns = New XmlSerializerNamespaces()
ns.Add("", "")
```

#### Examples
The following example creates an `XmlSerializerNamespaces` object, and adds two prefix and namespace pairs to it. The example then passes the `XmlSerializerNamespaces` to the `XmlSerializer.Serialize` method, which serializes a `Books` object into an XML document. Using the `XmlSerializerNamespaces` object, the `XmlSerializer.Serialize` method qualifies each XML element and attribute with one of the two namespaces.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializerNamespaces/Overview/source.cs._

## XmlSerializerNamespaces.XmlSerializerNamespaces() constructor

```csharp
public XmlSerializerNamespaces ();
```

Initializes a new instance of the `XmlSerializerNamespaces` class.

#### Examples
The following example creates an instance of the `XmlSerializerNamespaces` class, and adds a prefix and namespace pair to the object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializerNamespaces/.ctor/xmlserializernamespaces_constructor.cs._

## XmlSerializerNamespaces.XmlSerializerNamespaces(XmlSerializerNamespaces) constructor

```csharp
public XmlSerializerNamespaces (System.Xml.Serialization.XmlSerializerNamespaces namespaces);
```

Initializes a new instance of the `XmlSerializerNamespaces` class, using the specified instance of `XmlSerializerNamespaces` containing the collection of prefix and namespace pairs.

Parameters:

- `namespaces`: An instance of the `XmlSerializerNamespaces` containing the namespace and prefix pairs.

#### Examples
The following example creates two `XmlQualifiedName` objects, and creates a new `XmlSerializerNamespaces` instance from them.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializerNamespaces/.ctor/source.cs._

## XmlSerializerNamespaces.XmlSerializerNamespaces(XmlQualifiedName[]) constructor

```csharp
public XmlSerializerNamespaces (System.Xml.XmlQualifiedName[] namespaces);
```

Initializes a new instance of the `XmlSerializerNamespaces` class.

Parameters:

- `namespaces`: An array of `XmlQualifiedName` objects.

To be added.

## XmlSerializerNamespaces.Count property

```csharp
public int Count { get; }
```

Gets the number of prefix and namespace pairs in the collection.

Returns: The number of prefix and namespace pairs in the collection.

To be added.

## XmlSerializerNamespaces.Add(String, String) method

```csharp
public void Add (string prefix, string? ns);
```

Adds a prefix and namespace pair to an `XmlSerializerNamespaces` object.

Parameters:

- `prefix`: The prefix associated with an XML namespace.
- `ns`: An XML namespace.

#### Remarks
If you want the `XmlSerializer` to qualify the element and attribute names in an XML document, you must `XmlSerializerNamespaces.Add` the prefix and namespace pairs to an `XmlSerializerNamespaces` object.

Any namespaces that you add must conform to the W3C Namespaces in XML specification.

#### Examples
The following example creates an `XmlSerializerNamespaces` object, and adds three prefix and namespace pairs to it by calling the `XmlSerializerNamespaces.Add` method.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializerNamespaces/Add/source.cs._

## XmlSerializerNamespaces.ToArray() method

```csharp
public System.Xml.XmlQualifiedName[] ToArray ();
```

Gets the array of prefix and namespace pairs in an `XmlSerializerNamespaces` object.

Returns: An array of `XmlQualifiedName` objects that are used as qualified names in an XML document.

#### Examples
The following example prints each `Name` and `Namespace` in an `XmlSerializerNamespaces` object.

_Code sample not included: ~/snippets/csharp/System.Xml.Serialization/XmlSerializerNamespaces/ToArray/source.cs._
