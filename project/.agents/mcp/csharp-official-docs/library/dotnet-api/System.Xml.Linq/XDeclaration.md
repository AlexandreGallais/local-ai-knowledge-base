---
title: "XDeclaration class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDeclaration.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDeclaration class

Namespace: `System.Xml.Linq`

```csharp
public class XDeclaration
```

Represents an XML declaration.

#### Remarks
An XML declaration is used to declare the XML version, the encoding, and whether or not the XML document is standalone. This class represents the XML concept of an XML declaration.

Just as in the XML standard, declarations are associated with a document. When you create a document, you have the option to specify the declaration for the document. The `XDocument` class contains the `Declaration` property, which allows you to set or get the declaration. For information about how to serialize an XML tree with an XML declaration, see Serialize with an XML Declaration.

## XDeclaration.XDeclaration(XDeclaration) constructor

```csharp
public XDeclaration (System.Xml.Linq.XDeclaration other);
```

Initializes a new instance of the `XDeclaration` class from another `XDeclaration` object.

Parameters:

- `other`: The `XDeclaration` used to initialize this `XDeclaration` object.

#### Remarks
This constructor is primarily used internally to make a deep copy of an XML tree.

## XDeclaration.XDeclaration(String, String, String) constructor

```csharp
public XDeclaration (string? version, string? encoding, string? standalone);
```

Initializes a new instance of the `XDeclaration` class with the specified version, encoding, and standalone status.

Parameters:

- `version`: The version of the XML, usually "1.0".
- `encoding`: The encoding for the XML document.
- `standalone`: A string containing "yes" or "no" that specifies whether the XML is standalone or requires external entities to be resolved.

#### Examples
The following example creates a document that contains a declaration.

```csharp
XDocument doc = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XComment("This is a comment"),
    new XElement("Root", "content")
);
doc.Save("Root.xml");

Console.WriteLine(File.ReadAllText("Root.xml"));
```

```vb
Dim doc As XDocument = _
        <?xml version="1.0" encoding="utf-8" standalone="yes"?>
            <!--This is a comment-->
            <Root>content</Root>

doc.Save("Root.xml")

Console.WriteLine(File.ReadAllText("Root.xml"))
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<!--This is a comment-->
<Root>content</Root>
```

## XDeclaration.Encoding property

```csharp
public string? Encoding { get; set; }
```

Gets or sets the encoding for this document.

Returns: A `String` containing the code page name for this document.

#### Remarks
Any value returned by `Encoding.WebName` is a valid value.

If you read an encoded document, then this property will be set to the code page name.

If you set this property to a valid code page name, then when serializing, LINQ to XML will serialize with the specified encoding.

#### Examples
The following example creates two documents, one with utf-8 encoding, and one with utf-16 encoding. It then loads the documents and prints the encoding to the console.

```csharp
Console.WriteLine("Creating a document with utf-8 encoding");
XDocument encodedDoc8 = new XDocument(
    new XDeclaration("1.0", "utf-8", "yes"),
    new XElement("Root", "Content")
);
encodedDoc8.Save("EncodedUtf8.xml");
Console.WriteLine("Encoding is:{0}", encodedDoc8.Declaration.Encoding);
Console.WriteLine();

Console.WriteLine("Creating a document with utf-16 encoding");
XDocument encodedDoc16 = new XDocument(
    new XDeclaration("1.0", "utf-16", "yes"),
    new XElement("Root", "Content")
);
encodedDoc16.Save("EncodedUtf16.xml");
Console.WriteLine("Encoding is:{0}", encodedDoc16.Declaration.Encoding);
Console.WriteLine();

XDocument newDoc8 = XDocument.Load("EncodedUtf8.xml");
Console.WriteLine("Encoded document:");
Console.WriteLine(File.ReadAllText("EncodedUtf8.xml"));
Console.WriteLine();
Console.WriteLine("Encoding of loaded document is:{0}", newDoc8.Declaration.Encoding);
Console.WriteLine();

XDocument newDoc16 = XDocument.Load("EncodedUtf16.xml");
Console.WriteLine("Encoded document:");
Console.WriteLine(File.ReadAllText("EncodedUtf16.xml"));
Console.WriteLine();
Console.WriteLine("Encoding of loaded document is:{0}", newDoc16.Declaration.Encoding);
```

```vb
Console.WriteLine("Creating a document with utf-8 encoding")
Dim encodedDoc8 As XDocument = _
        <?xml version="1.0" encoding="utf-8" standalone="yes"?>
            <Root>Content</Root>
encodedDoc8.Save("EncodedUtf8.xml")
Console.WriteLine("Encoding is:{0}", encodedDoc8.Declaration.Encoding)
Console.WriteLine()

Console.WriteLine("Creating a document with utf-16 encoding")
Dim encodedDoc16 As XDocument = _
        <?xml version="1.0" encoding="utf-16" standalone="yes"?>
            <Root>Content</Root>

encodedDoc16.Save("EncodedUtf16.xml")
Console.WriteLine("Encoding is:{0}", encodedDoc16.Declaration.Encoding)
Console.WriteLine()

Dim newDoc8 As XDocument = XDocument.Load("EncodedUtf8.xml")
Console.WriteLine("Encoded document:")
Console.WriteLine(File.ReadAllText("EncodedUtf8.xml"))
Console.WriteLine()
Console.WriteLine("Encoding of loaded document is:{0}", newDoc8.Declaration.Encoding)
Console.WriteLine()

Dim newDoc16 As XDocument = XDocument.Load("EncodedUtf16.xml")
Console.WriteLine("Encoded document:")
Console.WriteLine(File.ReadAllText("EncodedUtf16.xml"))
Console.WriteLine()
Console.WriteLine("Encoding of loaded document is:{0}", newDoc16.Declaration.Encoding)
```

This example produces the following output:

```
Creating a document with utf-8 encoding
Encoding is:utf-8

Creating a document with utf-16 encoding
Encoding is:utf-16

Encoded document:
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<Root>Content</Root>

Encoding of loaded document is:utf-8

Encoded document:
<?xml version="1.0" encoding="utf-16" standalone="yes"?>
<Root>Content</Root>

Encoding of loaded document is:utf-16
```

## XDeclaration.Standalone property

```csharp
public string? Standalone { get; set; }
```

Gets or sets the standalone property for this document.

Returns: A `String` containing the standalone property for this document.

#### Remarks
The valid values for standalone are "yes" or "no". These values are not enforced.

#### Examples
The following example uses this property to print the standalone property of a declaration.

```csharp
XDeclaration xd = new XDeclaration("1.0", "utf-8", "yes");
Console.WriteLine(xd.Version);
Console.WriteLine(xd.Encoding);
Console.WriteLine(xd.Standalone);
```

```vb
Dim xd As XDeclaration = New XDeclaration("1.0", "utf-8", "yes")
Console.WriteLine(xd.Version)
Console.WriteLine(xd.Encoding)
Console.WriteLine(xd.Standalone)
```

This example produces the following output:

```
1.0
utf-8
yes
```

## XDeclaration.Version property

```csharp
public string? Version { get; set; }
```

Gets or sets the version property for this document.

Returns: A `String` containing the version property for this document.

#### Remarks
The value is usually "1.0". This value is not enforced.

#### Examples
The following example uses this property to print the version property of a declaration.

```csharp
XDeclaration xd = new XDeclaration("1.0", "utf-8", "yes");
Console.WriteLine(xd.Version);
Console.WriteLine(xd.Encoding);
Console.WriteLine(xd.Standalone);
```

```vb
Dim xd As XDeclaration = New XDeclaration("1.0", "utf-8", "yes")
Console.WriteLine(xd.Version)
Console.WriteLine(xd.Encoding)
Console.WriteLine(xd.Standalone)
```

This example produces the following output:

```
1.0
utf-8
yes
```

## XDeclaration.ToString() method

```csharp
public override string ToString ();
```

Provides the declaration as a formatted string.

Returns: A `String` that contains the formatted XML string.

To be added.
