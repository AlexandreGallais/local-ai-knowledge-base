---
title: "XmlNamespaceManager class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/XmlNamespaceManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XmlNamespaceManager class

Namespace: `System.Xml`

```csharp
public class XmlNamespaceManager : System.Collections.IEnumerable, System.Xml.IXmlNamespaceResolver
```

Resolves, adds, and removes namespaces to a collection and provides scope management for these namespaces.

#### Remarks
For general information about how namespaces are declared and used in XML documents, see Managing Namespaces in an XML Document.

`XmlNamespaceManager` stores prefixes and namespaces as strings. Here's a summary of management and lookup tasks you can perform with this class. For more information and examples, follow the links to the reference page for each method or property.

|To|Use|
|--------|---------|
|Add a namespace|`XmlNamespaceManager.AddNamespace` method|
|Remove a namespace|`XmlNamespaceManager.RemoveNamespace` method|
|Find the URI for the default namespace|`DefaultNamespace` property|
|Find the URI for a namespace prefix|`XmlNamespaceManager.LookupNamespace` method|
|Find the prefix for a namespace URI|`XmlNamespaceManager.LookupPrefix` method|
|Get a list of namespaces in the current node|`XmlNamespaceManager.GetNamespacesInScope` method|
|Scope a namespace|`XmlNamespaceManager.PushScope` and `XmlNamespaceManager.PopScope` methods|
|Check whether a prefix is defined in the current scope|`XmlNamespaceManager.HasNamespace` method|
|Get the name table used to look up prefixes and URIs|`NameTable` property|

To add namespaces to the namespace manager, you create a `XmlNamespaceManager` object and then use the `XmlNamespaceManager.AddNamespace` method. Default prefix and namespace pairs are automatically added to the namespace manager on creation.

When you create the namespace manager, you can specify a name table from the `XmlReader`, `XsltContext`, or `XmlDocument` class, and then use the `XmlNamespaceManager.AddNamespace` method to add the namespaces.

You can supply the `XmlNamespaceManager` object as a parameter to the `XmlNode.SelectNodes` or `XmlNode.SelectSingleNode` method of the `XmlDocument` class to execute XPath query expressions that reference namespace-qualified element and attribute names.

The namespace manager assumes that prefixes and namespaces have already been verified and conform to the W3C Namespaces specification. The namespace manager does not perform any validation.

The namespace manager atomizes the strings when they are added by using the `XmlNamespaceManager.AddNamespace` method and when a lookup is performed by using the `XmlNamespaceManager.LookupNamespace` or `XmlNamespaceManager.LookupPrefix` method.

The namespace manager implements enumeration support in addition to adding and retrieving namespaces. You can loop through the information saved in the namespace manager by using the `foreach` construct. For example, if you create a namespace manager with the name `nsmanager`, you can iterate through the table by using `foreach (String prefix in nsmanager)`.

Because the namespace manager provides a string comparison with the prefix and namespaces as objects, there is a performance improvement when using the namespace manager over the direct comparison of a string.

The following code example shows how to bind the prefix `xsd` with the namespace URI of <http://www.w3.org/2001/XMLSchema> and add it to the namespace manager:

```vb
nsmgr.AddNamespace("xsd", "http://www.w3.org/2001/XMLSchema")
```

```csharp
nsmgr.AddNamespace("xsd", "http://www.w3.org/2001/XMLSchema");
```

You can then find the namespace by using the `XmlNamespaceManager.LookupNamespace` method:

```vb
nsmgr.LookupNamespace("xsd")
```

```csharp
nsmgr.LookupNamespace("xsd");
```

The following example creates an `XmlNamespaceManager` by using the name table from an XML reader:

```vb
Dim reader As New XmlTextReader("myfile.xml")
Dim nsmanager As New XmlNamespaceManager(reader.NameTable)
nsmanager.AddNamespace("msbooks", "www.microsoft.com/books")
nsmanager.PushScope()
nsmanager.AddNamespace("msstore", "www.microsoft.com/store")
While reader.Read()
    Console.WriteLine("Reader Prefix:{0}", reader.Prefix)
    Console.WriteLine("XmlNamespaceManager Prefix:{0}",
     nsmanager.LookupPrefix(nsmanager.NameTable.Get(reader.NamespaceURI)))
End While
```

```csharp
XmlTextReader reader = new XmlTextReader("myfile.xml");
XmlNamespaceManager nsmanager = new XmlNamespaceManager(reader.NameTable);
nsmanager.AddNamespace("msbooks", "www.microsoft.com/books");
nsmanager.PushScope();
nsmanager.AddNamespace("msstore", "www.microsoft.com/store");
while (reader.Read())
{
    Console.WriteLine("Reader Prefix:{0}", reader.Prefix);
    Console.WriteLine("XmlNamespaceManager Prefix:{0}",
    nsmanager.LookupPrefix(nsmanager.NameTable.Get(reader.NamespaceURI)));
}
```

## XmlNamespaceManager.XmlNamespaceManager(XmlNameTable) constructor

```csharp
public XmlNamespaceManager (System.Xml.XmlNameTable nameTable);
```

Initializes a new instance of the `XmlNamespaceManager` class with the specified `XmlNameTable`.

Parameters:

- `nameTable`: The `XmlNameTable` to use.

Exceptions:

- `NullReferenceException`: `null` is passed to the constructor.

#### Remarks
The name table is used to look up prefixes and namespaces. An existing name table with pre-atomized strings can be specified in the constructor. There are several advantages in doing so. For example, if the name table of an `XmlReader` object is used, after each read, any namespace and prefix strings pushed into the name table can be re-used by `XmlNamespaceManager`.

For more information on atomized strings, see `XmlNameTable`.

> **Note:**
> If you specify an existing name table, any namespaces in the name table are not automatically added to `XmlNamespaceManager`. You must use `XmlNamespaceManager.AddNamespace` and `XmlNamespaceManager.RemoveNamespace` to add or remove namespaces.

#### Examples
The following example creates an `XmlNamespaceManager` using the name table of the reader.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/.ctor/source.cs._

## XmlNamespaceManager.DefaultNamespace property

```csharp
public virtual string DefaultNamespace { get; }
```

Gets the namespace URI for the default namespace.

Returns: The namespace URI for the default namespace, or an empty string if there is no default namespace.

#### Remarks
This method is equivalent to calling LookupNamespace(String.Empty).

#### Examples
The following example displays the default namespace, if one exists.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/DefaultNamespace/source.cs._

## XmlNamespaceManager.NameTable property

```csharp
public virtual System.Xml.XmlNameTable? NameTable { get; }
```

Gets the `XmlNameTable` associated with this object.

Returns: The `XmlNameTable` used by this object.

#### Remarks
The name table is used to look up prefixes and namespace URIs.

## XmlNamespaceManager.AddNamespace(String, String) method

```csharp
public virtual void AddNamespace (string prefix, string uri);
```

Adds the given namespace to the collection.

Parameters:

- `prefix`: The prefix to associate with the namespace being added. Use String.Empty to add a default namespace.

**Note** If the `XmlNamespaceManager` will be used for resolving namespaces in an XML Path Language (XPath) expression, a prefix must be specified. If an XPath expression does not include a prefix, it is assumed that the namespace Uniform Resource Identifier (URI) is the empty namespace. For more information about XPath expressions and the `XmlNamespaceManager`, refer to the `XmlNode.SelectNodes` and `XPathExpression.SetContext` methods.
- `uri`: The namespace to add.

Exceptions:

- `ArgumentException`: The value for `prefix` is "xml" or "xmlns".
- `ArgumentNullException`: The value for `prefix` or `uri` is `null`.

#### Remarks
`XmlNamespaceManager` does not check `prefix` and `uri` for conformance.

`XmlReader` checks names, including prefixes and namespaces, to ensure they are valid XML names according to the World Wide Web Consortium (W3C) Namespaces specification. `XmlNamespaceManager` is used internally by `XmlReader`, so to avoid a duplication of efforts, `XmlNamespaceManager` assumes all prefixes and namespaces are valid.

If the prefix and namespace already exist within the current scope, the new prefix and namespace pair will replace the existing prefix/namespace combination. The same prefix and namespace combination can exist across different scopes.

The following prefix/namespace pairs are added by default to the `XmlNamespaceManager`. They can be determined at any scope.

|Prefix|Namespace|
|------------|---------------|
|xmlns| (the xmlns prefix namespace)|
|xml|<http://www.w3.org/XML/1998/namespace> (the XML namespace)|
|String.Empty|String.Empty (the empty namespace). This value can be reassigned a different prefix. For example, xmlns="" defines the default namespace to be the empty namespace|

#### Examples
The following example uses `XmlNamespaceManager` to resolve namespaces in an XML fragment.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/AddNamespace/source.cs._

## XmlNamespaceManager.GetEnumerator() method

```csharp
public virtual System.Collections.IEnumerator GetEnumerator ();
```

Returns an enumerator to use to iterate through the namespaces in the `XmlNamespaceManager`.

Returns: An `IEnumerator` containing the prefixes stored by the `XmlNamespaceManager`.

#### Remarks
The following code shows how to use the `IEnumerator` to view all the namespace pairs stored in the `XmlNamespaceManager` object.

```vb
Dim nsEnum As IEnumerator = nsmgr.GetEnumerator()
Do While nsEnum.MoveNext
  If nsEnum.Current <> "" Then
    MsgBox("xmlns:" + nsEnum.Current + "=" + nsmgr.LookupNamespace(nsEnum.Current))
  End If
Loop
```

## XmlNamespaceManager.GetNamespacesInScope(XmlNamespaceScope) method

```csharp
public virtual System.Collections.Generic.IDictionary<string,string> GetNamespacesInScope (System.Xml.XmlNamespaceScope scope);
```

Gets a collection of namespace names keyed by prefix, which can be used to enumerate the namespaces currently in scope.

Parameters:

- `scope`: An enumeration value that specifies the type of namespace nodes to return.

Returns: A collection of namespace and prefix pairs currently in scope.

#### Remarks
The dictionary consists of a collection of namespace names keyed by prefix. It can be used to enumerate the in-scope namespaces. The dictionary is a disconnected copy of the namespace list. It remains unchanged as the current in-scope namespace list changes.

The following table shows how `XmlNamespaceScope` values affect the namespaces returned by the `XmlNamespaceManager.GetNamespacesInScope` method.

|XmlNamespaceScope value|xmlns:xml|xmlns:xmlns|xmlns=""|
|-----------------------------|---------------|-----------------|---------------|
|`All`|Yes|No|No|
|`ExcludeXml`|No|No|No|
|`Local`|No|No|Yes|

## XmlNamespaceManager.HasNamespace(String) method

```csharp
public virtual bool HasNamespace (string prefix);
```

Gets a value indicating whether the supplied prefix has a namespace defined for the current pushed scope.

Parameters:

- `prefix`: The prefix of the namespace you want to find.

Returns: `true` if there is a namespace defined; otherwise, `false`.

#### Remarks
To determine whether there is a default empty namespace defined, set `prefix` to String.Empty. A return value of `true` indicates that there is a default namespace defined in the current scope; `false` indicates that no default namespace is defined.

> **Note:**
> xmlns:x= "" is illegal according to the W3C Namespaces recommendation.

#### Examples
The following example displays the default namespace, if one exists.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/DefaultNamespace/source.cs._

## XmlNamespaceManager.LookupNamespace(String) method

```csharp
public virtual string? LookupNamespace (string prefix);
```

Gets the namespace URI for the specified prefix.

Parameters:

- `prefix`: The prefix whose namespace URI you want to resolve. To match the default namespace, pass String.Empty.

Returns: The namespace URI for `prefix` or `null` if there is no mapped namespace. The returned string is atomized.

For more information on atomized strings, see the `XmlNameTable` class.

#### Examples
The following example adds prefix/namespace pairs to the `XmlNamespaceManager`, and then displays all the pairs in the collection.

_Code sample not included: ~/snippets/csharp/System.Xml/XmlNamespaceManager/LookupNamespace/source.cs._

## XmlNamespaceManager.LookupPrefix(String) method

```csharp
public virtual string? LookupPrefix (string uri);
```

Finds the prefix declared for the given namespace URI.

Parameters:

- `uri`: The namespace to resolve for the prefix.

Returns: The matching prefix. If there is no mapped prefix, the method returns String.Empty. If a null value is supplied, then `null` is returned.

#### Remarks
This method finds the mapped prefix by walking the stack (that is, it looks globally). The supplied string must be atomized for the lookup to succeed. In other words, the supplied string object must exist in the namespace manager's name table (`NameTable`).

The returned string is also atomized. For more information on atomized strings, see the `XmlNameTable` class.

#### Examples
The following example shows how to use the `XmlNamespaceManager.LookupPrefix` method when writing an attribute. It uses the `XmlWriter.WriteStartAttribute` method to start the attribute, looks up the prefix for the `urn:samples` namespace URI, and then uses that prefix in the `XmlWriter.WriteStartAttribute` when writing the `ISBN` attribute:

```vb
Dim prefix As String = nsMgr.LookupPrefix("urn:samples")
writer.WriteStartAttribute(prefix, "ISBN", "urn:samples")
```

```csharp
XmlNameTable nt = new XmlNameTable();
XmlNamespaceManager nsMgr = new XmlNamespaceManager(nt);
nsMgr.AddNamespace("bk","urn:samples");string prefix = writer nsMgr.LookupPrefix("urn:samples");
writer.WriteStartAttribute(prefix, "ISBN", "urn:samples");
```

The following example uses `XmlNamespaceManager.LookupPrefix` to find the prefix defined on an element.

```vb
writer.WriteStartElement("root", "book")
writer.WriteStartElement("x", "node", "author")
s = writer.LookupPrefix("author")
CError.Compare(s, "x", "Error in nested element")
writer.WriteEndElement()
s = writer.LookupPrefix("book")
CError.Compare(s, Nothing, "Error in root element")
writer.WriteEndElement()
```

**Output**

```xml
<root xmlns="book">
  
</root>
```
