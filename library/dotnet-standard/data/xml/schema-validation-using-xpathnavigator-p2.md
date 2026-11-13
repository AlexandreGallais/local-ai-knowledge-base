---
title: "Schema Validation using XPathNavigator (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/schema-validation-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Schema Validation using XPathNavigator (part 2 of 3)

## Validating XML Data

 The `System.Xml.XmlDocument` class does not validate an XML document using either DTD or XML schema definition language (XSD) schema validation by default. It only verifies that the XML document is well formed.

 The first way to validate an XML document is to validate the document as it is loaded into an `System.Xml.XmlDocument` object using a validating `System.Xml.XmlReader` object. The second way is to validate a previously untyped XML document using the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class. In both cases, changes to the validated XML document can be revalidated using the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class.

### Validating a Document as it is Loaded

 A validating `System.Xml.XmlReader` object is created by passing an `System.Xml.XmlReaderSettings` object to the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` class that takes an `System.Xml.XmlReaderSettings` object as a parameter. The `System.Xml.XmlReaderSettings` object passed as a parameter has a `System.Xml.XmlReaderSettings.ValidationType` property set to `Schema` and an XML Schema for the XML document contained in the `System.Xml.XmlDocument` object added to its `System.Xml.XmlReaderSettings.Schemas` property. The validating `System.Xml.XmlReader` object is then used to create the `System.Xml.XmlDocument` object.

 The following example validates the `contosoBooks.xml` file as it is loaded into the `System.Xml.XmlDocument` object by creating the `System.Xml.XmlDocument` object using a validating `System.Xml.XmlReader` object. Because the XML document is valid according to its schema, no schema validation errors or warnings are generated.

```vb
Imports System
Imports System.Xml
Imports System.Xml.Schema
Imports System.Xml.XPath

Class ValidatingReaderExample

    Shared Sub Main(ByVal args() As String)

        Try
            Dim settings As XmlReaderSettings = New XmlReaderSettings()
            settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd")
            settings.ValidationType = ValidationType.Schema

            Dim reader As XmlReader = XmlReader.Create("contosoBooks.xml", settings)

            Dim document As XmlDocument = New XmlDocument()
            document.Load(reader)
            Dim navigator As XPathNavigator = document.CreateNavigator()

        Catch e As Exception
            Console.WriteLine("ValidatingReaderExample.Exception: {0}", e.Message)
        End Try

    End Sub

    Shared Sub SchemaValidationHandler(ByVal sender As Object, ByVal e As ValidationEventArgs)

        Select Case e.Severity
            Case XmlSeverityType.Error
                Console.WriteLine("Schema Validation Error: {0}", e.Message)
                Exit Sub
            Case XmlSeverityType.Warning
                Console.WriteLine("Schema Validation Warning: {0}", e.Message)
                Exit Sub
        End Select

    End Sub

End Class
```

```csharp
using System;
using System.Xml;
using System.Xml.Schema;
using System.Xml.XPath;

class ValidatingReaderExample
{
    static void Main(string[] args)
    {
        try
        {
            XmlReaderSettings settings = new XmlReaderSettings();
            settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");
            settings.ValidationType = ValidationType.Schema;

            XmlReader reader = XmlReader.Create("contosoBooks.xml", settings);

            XmlDocument document = new XmlDocument();
            document.Load(reader);
            XPathNavigator navigator = document.CreateNavigator();
        }
        catch (Exception e)
        {
            Console.WriteLine("ValidatingReaderExample.Exception: {0}", e.Message);
        }
    }

    static void SchemaValidationHandler(object sender, ValidationEventArgs e)
    {
        switch (e.Severity)
        {
            case XmlSeverityType.Error:
                Console.WriteLine("Schema Validation Error: {0}", e.Message);
                break;
            case XmlSeverityType.Warning:
                Console.WriteLine("Schema Validation Warning: {0}", e.Message);
                break;
        }
    }
}
```

 The example takes the `contosoBooks.xml` file as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

 The example also takes the `contosoBooks.xsd` as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd._

 In the above example, an `System.Xml.Schema.XmlSchemaValidationException` will be thrown when `System.Xml.XmlDocument.Load*` is called if any attribute or element type does not match the corresponding type specified in the validating schema. If a `System.Xml.XmlReaderSettings.ValidationEventHandler` is set on the validating `System.Xml.XmlReader`, the `System.Xml.XmlReaderSettings.ValidationEventHandler` will get called whenever an invalid type is encountered.

 An `System.Xml.Schema.XmlSchemaException` will be thrown when an attribute or element with `System.Xml.XPath.XPathNavigator.TypedValue*` set to `invalid` is accessed by the `System.Xml.XPath.XPathNavigator`.

 The `System.Xml.Schema.XmlSchemaInfo.Validity` property can be used to determine whether or not an individual attribute or element is valid when accessing attributes or elements with the `System.Xml.XPath.XPathNavigator`.

> **Note:**
> When an XML document is loaded into an `System.Xml.XmlDocument` object with an associated schema that defines default values, the `System.Xml.XmlDocument` object treats these defaults as if they appeared in the XML document. This means that the `System.Xml.XPath.XPathNavigator.IsEmptyElement` property  always returns `false` for an element that was defaulted from the schema, even if in the XML document it was written as an empty element.

### Validating a Document using the Validate Method

 The `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class validates the XML document contained in an `System.Xml.XmlDocument` object against the schemas specified in the `System.Xml.XmlDocument` object's `System.Xml.XmlDocument.Schemas` property and performs infoset augmentation. The result is a previously untyped XML document in the `System.Xml.XmlDocument` object replaced with a typed document.

 The `System.Xml.XmlDocument` object reports schema validation errors and warnings using the `System.Xml.Schema.ValidationEventHandler` delegate passed as a parameter to the `System.Xml.XmlDocument.Validate*` method.

 The following example validates the `contosoBooks.xml` file contained in the `System.Xml.XmlDocument` object against the `contosoBooks.xsd` schema contained in the `System.Xml.XmlDocument` object's `System.Xml.XmlDocument.Schemas` property.

```vb
Imports System
Imports System.Xml
Imports System.Xml.Schema
Imports System.Xml.XPath

Class ValidateExample

    Shared Sub Main(ByVal args() As String)

        Dim document As XmlDocument = New XmlDocument()
        document.Load("contosoBooks.xml")
        Dim navigator As XPathNavigator = document.CreateNavigator()

        document.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd")
        Dim validation As ValidationEventHandler = New ValidationEventHandler(AddressOf SchemaValidationHandler)

        document.Validate(validation)

    End Sub

    Shared Sub SchemaValidationHandler(ByVal sender As Object, ByVal e As ValidationEventArgs)

        Select Case e.Severity
            Case XmlSeverityType.Error
                Console.WriteLine("Schema Validation Error: {0}", e.Message)
                Exit Sub
            Case XmlSeverityType.Warning
                Console.WriteLine("Schema Validation Warning: {0}", e.Message)
                Exit Sub
        End Select

    End Sub

End Class
```

```csharp
using System;
using System.Xml;
using System.Xml.Schema;
using System.Xml.XPath;

class ValidateExample
{
    static void Main(string[] args)
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        document.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");
        ValidationEventHandler validation = new ValidationEventHandler(SchemaValidationHandler);

        document.Validate(validation);
    }

    static void SchemaValidationHandler(object sender, ValidationEventArgs e)
    {
        switch (e.Severity)
        {
            case XmlSeverityType.Error:
                Console.WriteLine("Schema Validation Error: {0}", e.Message);
                break;
            case XmlSeverityType.Warning:
                Console.WriteLine("Schema Validation Warning: {0}", e.Message);
                break;
        }
    }
}
```

 The example takes the `contosoBooks.xml` file as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

 The example also takes the `contosoBooks.xsd` as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd._
