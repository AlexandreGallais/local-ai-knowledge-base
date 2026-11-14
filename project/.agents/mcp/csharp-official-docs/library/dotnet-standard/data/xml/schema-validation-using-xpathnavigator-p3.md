---
title: "Schema Validation using XPathNavigator (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/schema-validation-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Schema Validation using XPathNavigator (part 3 of 3)

### Validating Modifications

 After modifications are made to an XML document, you can validate the modifications against the schema for the XML document using the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class.

 The following example validates the `contosoBooks.xml` file as it is loaded into the `System.Xml.XmlDocument` object by creating the `System.Xml.XmlDocument` object using a validating `System.Xml.XmlReader` object. The XML document is validated successfully as it is loaded without generating any schema validation errors or warnings. The example then makes two modifications to the XML document that are invalid according to the `contosoBooks.xsd` schema. The first modification inserts an invalid child element resulting in a schema validation error, and the second modification sets the value of a typed node to a value that is invalid according to the type of the node resulting in an exception.

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

            Dim validation As ValidationEventHandler = New ValidationEventHandler(AddressOf SchemaValidationHandler)

            navigator.MoveToChild("bookstore", "http://www.contoso.com/books")
            navigator.MoveToChild("book", "http://www.contoso.com/books")
            navigator.MoveToChild("author", "http://www.contoso.com/books")

            navigator.AppendChild("<title>Book Title</title>")

            document.Validate(validation)

            navigator.MoveToParent()
            navigator.MoveToChild("price", "http://www.contoso.com/books")
            navigator.SetTypedValue(DateTime.Now)
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

            ValidationEventHandler validation = new ValidationEventHandler(SchemaValidationHandler);

            navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
            navigator.MoveToChild("book", "http://www.contoso.com/books");
            navigator.MoveToChild("author", "http://www.contoso.com/books");

            navigator.AppendChild("<title>Book Title</title>");

            document.Validate(validation);

            navigator.MoveToParent();
            navigator.MoveToChild("price", "http://www.contoso.com/books");
            navigator.SetTypedValue(DateTime.Now);
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

 In the example above, two modifications are made to the XML document contained in the `System.Xml.XmlDocument` object. As the XML document was loaded, any schema validation errors encountered would have been handled by the validation event handler method and written to the console.

 In this example, the validation errors were introduced after the XML document was loaded and were found using the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class.

 Modifications made using the `System.Xml.XPath.XPathNavigator.SetTypedValue*` method of the `System.Xml.XPath.XPathNavigator` class resulted in an `System.InvalidCastException` because the new value was invalid according to the schema type of the node.

 For more information about modifying values using the `System.Xml.XPath.XPathNavigator.SetTypedValue*` method, see the Modify XML Data using XPathNavigator topic.

### Read-Only Validation

 The `System.Xml.XPath.XPathDocument` class is a read-only, in-memory representation of an XML document. Both the `System.Xml.XPath.XPathDocument` class and the `System.Xml.XmlDocument` class create `System.Xml.XPath.XPathNavigator` objects to navigate and edit XML documents. Because the `System.Xml.XPath.XPathDocument` class is a read-only class, `System.Xml.XPath.XPathNavigator` object's returned from `System.Xml.XPath.XPathDocument` objects cannot edit the XML document contained in the `System.Xml.XPath.XPathDocument` object.

 In the case of validation, you can create an `System.Xml.XPath.XPathDocument` object just like you create an `System.Xml.XmlDocument` object using a validating `System.Xml.XmlReader` object as described earlier in this topic. The `System.Xml.XPath.XPathDocument` object validates the XML document as it is loaded, but because you cannot edit the XML data in the `System.Xml.XPath.XPathDocument` object, you cannot revalidate the XML document.

 For more information about read-only and editable `System.Xml.XPath.XPathNavigator` objects, see the Reading XML Data using XPathDocument and XmlDocument topic.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XPath.XPathDocument`
- `System.Xml.XPath.XPathNavigator`
- Process XML Data Using the XPath Data Model
- Reading XML Data using XPathDocument and XmlDocument
- Selecting, Evaluating and Matching XML Data using XPathNavigator
- Accessing XML Data using XPathNavigator
- Editing XML Data using XPathNavigator
