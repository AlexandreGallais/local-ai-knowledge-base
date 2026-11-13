---
title: "Reading and Writing XML Schemas"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/reading-and-writing-xml-schemas.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Read and write XML schemas

The Schema Object Model (SOM) API can be used to read and write XML Schema definition language (XSD) schemas from files or other sources and build XML schemas in-memory using the classes in the `System.Xml.Schema` namespace that map to the structures defined in the World Wide Web Consortium (W3C) XML Schema Recommendation.

## Reading and Writing XML Schemas

 The `System.Xml.Schema.XmlSchema` class provides the `System.Xml.Schema.XmlSchema.Read*` and `System.Xml.Schema.XmlSchema.Write*` methods to read and write XML schemas. The `System.Xml.Schema.XmlSchema.Read*` method returns an `System.Xml.Schema.XmlSchema` object representing the XML schema and takes an optional `System.Xml.Schema.ValidationEventHandler` as a parameter to handle schema validation warnings and errors encountered while reading an XML schema.

 The `System.Xml.Schema.XmlSchema.Write*` method writes XML schemas to `System.IO.Stream`, `System.IO.TextWriter` and `System.Xml.XmlWriter` objects and can take an optional `System.Xml.XmlNamespaceManager` object as a parameter. An `System.Xml.XmlNamespaceManager` is used to handle namespaces encountered in an XML schema. For more information about the `System.Xml.XmlNamespaceManager` class, see Managing Namespaces in an XML Document.

 The following code example illustrates reading and writing XML schemas from and to a file. The code example takes the `example.xsd` file, reads it into an `System.Xml.Schema.XmlSchema` object using the `static``System.Xml.Schema.XmlSchema.Read*` method, and then writes the file to the console and a new `new.xsd` file. The code example also provides a `System.Xml.Schema.ValidationEventHandler` as a parameter to the `static``System.Xml.Schema.XmlSchema.Read*` method to handle any schema validation warnings or errors encountered while reading the XML schema. If the `System.Xml.Schema.ValidationEventHandler` is not specified (`null`), no warnings or errors are reported.
 ```csharp
using System;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaReadWriteExample
{
    static void Main()
    {
        try
        {
            XmlTextReader reader = new XmlTextReader("example.xsd");
            XmlSchema schema = XmlSchema.Read(reader, ValidationCallback);
            schema.Write(Console.Out);
            FileStream file = new FileStream("new.xsd", FileMode.Create, FileAccess.ReadWrite);
            XmlTextWriter xwriter = new XmlTextWriter(file, new UTF8Encoding());
            xwriter.Formatting = Formatting.Indented;
            schema.Write(xwriter);
        }
        catch(Exception e)
        {
            Console.WriteLine(e);
        }
    }

    static void ValidationCallback(object sender, ValidationEventArgs args)
    {
        if (args.Severity == XmlSeverityType.Warning)
            Console.Write("WARNING: ");
        else if (args.Severity == XmlSeverityType.Error)
            Console.Write("ERROR: ");

        Console.WriteLine(args.Message);
    }
}
```

 The example takes the `example.xsd` as input.

```xml
<?xml version="1.0"?>
<xs:schema id="play" targetNamespace="http://tempuri.org/play.xsd" elementFormDefault="qualified" xmlns="http://tempuri.org/play.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name='myShoeSize'>
        <xs:complexType>
            <xs:simpleContent>
                <xs:extension base='xs:decimal'>
                    <xs:attribute name='sizing' type='xs:string' />
                </xs:extension>
            </xs:simpleContent>
        </xs:complexType>
    </xs:element>
</xs:schema>
```

## See also

- XML Schema Object Model Overview
- Building XML Schemas
- Traversing XML Schemas
- Editing XML Schemas
- Including or Importing XML Schemas
- XmlSchemaSet for Schema Compilation
- Post-Schema Compilation Infoset
- Managing Namespaces in an XML Document
