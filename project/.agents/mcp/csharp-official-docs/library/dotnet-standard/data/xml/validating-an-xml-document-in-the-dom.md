---
title: "Validating an XML Document in the DOM"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/validating-an-xml-document-in-the-dom.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Validate an XML document in the DOM

The`System.Xml.XmlDocument` class does not validate the XML in the Document Object Model (DOM) against an XML Schema definition language (XSD) schema or document type definition (DTD) by default; the XML is only verified to be well-formed.

To validate the XML in the DOM, you can validate the XML as it is loaded into the DOM by passing a schema-validating `System.Xml.XmlReader` to the `System.Xml.XmlDocument.Load*` method of the `System.Xml.XmlDocument` class, or validate a previously unvalidated XML document in the DOM using the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class.

## Validating an XML Document As It Is Loaded into the DOM

The `System.Xml.XmlDocument` class validates the XML data as it is loaded into the DOM when a validating `System.Xml.XmlReader` is passed to the `System.Xml.XmlDocument.Load*` method of the `System.Xml.XmlDocument` class.

After successful validation, schema defaults are applied, text values are converted to atomic values as necessary, and type information is associated with validated information items. As a result, typed XML data replaces previously untyped XML data.

### Creating an XML Schema-Validating XmlReader

To create an XML schema-validating `System.Xml.XmlReader`, follow these steps.

1. Construct a new `System.Xml.XmlReaderSettings` instance.

2. Add an XML schema to the `System.Xml.XmlReaderSettings.Schemas` property of the `System.Xml.XmlReaderSettings` instance.

3. Specify `Schema` as the `System.Xml.XmlReaderSettings.ValidationType*`.

4. Optionally specify `System.Xml.XmlReaderSettings.ValidationFlags*` and a `System.Xml.XmlReaderSettings.ValidationEventHandler` to handle schema validation errors and warnings encountered during validation.

5. Finally, pass the `System.Xml.XmlReaderSettings` object to the `System.Xml.XmlReader.Create*` method of the `System.Xml.XmlReader` class along with the XML document, creating a schema-validating `System.Xml.XmlReader`.

### Example

In the code example that follows, a schema-validating `System.Xml.XmlReader` validates the XML data loaded into the DOM. Invalid modifications are made to the XML document and the document is then revalidated, causing schema validation errors. Finally, one of the errors is corrected, and then part of the XML document is partially validated.
```csharp
using System;
using System.Xml;
using System.Xml.Schema;

class XmlDocumentValidationExample
{
    static void Main(string[] args)
    {
        try
        {
            // Create a schema validating XmlReader.
            XmlReaderSettings settings = new XmlReaderSettings();
            settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");
            settings.ValidationEventHandler += new ValidationEventHandler(ValidationEventHandler);
            settings.ValidationFlags = settings.ValidationFlags | XmlSchemaValidationFlags.ReportValidationWarnings;
            settings.ValidationType = ValidationType.Schema;

            XmlReader reader = XmlReader.Create("contosoBooks.xml", settings);

            // The XmlDocument validates the XML document contained
            // in the XmlReader as it is loaded into the DOM.
            XmlDocument document = new XmlDocument();
            document.Load(reader);

            // Make an invalid change to the first and last
            // price elements in the XML document, and write
            // the XmlSchemaInfo values assigned to the price
            // element during load validation to the console.
            XmlNamespaceManager manager = new XmlNamespaceManager(document.NameTable);
            manager.AddNamespace("bk", "http://www.contoso.com/books");

            XmlNode priceNode = document.SelectSingleNode(@"/bk:bookstore/bk:book/bk:price", manager);

            Console.WriteLine($"SchemaInfo.IsDefault: {priceNode.SchemaInfo.IsDefault}");
            Console.WriteLine($"SchemaInfo.IsNil: {priceNode.SchemaInfo.IsNil}");
            Console.WriteLine($"SchemaInfo.SchemaElement: {priceNode.SchemaInfo.SchemaElement}");
            Console.WriteLine($"SchemaInfo.SchemaType: {priceNode.SchemaInfo.SchemaType}");
            Console.WriteLine($"SchemaInfo.Validity: {priceNode.SchemaInfo.Validity}");

            priceNode.InnerXml = "A";

            XmlNodeList priceNodes = document.SelectNodes(@"/bk:bookstore/bk:book/bk:price", manager);
            XmlNode lastprice = priceNodes[priceNodes.Count - 1];

            lastprice.InnerXml = "B";

            // Validate the XML document with the invalid changes.
            // The invalid changes cause schema validation errors.
            document.Validate(ValidationEventHandler);

            // Correct the invalid change to the first price element.
            priceNode.InnerXml = "8.99";

            // Validate only the first book element. The last book
            // element is invalid, but not included in validation.
            XmlNode bookNode = document.SelectSingleNode(@"/bk:bookstore/bk:book", manager);
            document.Validate(ValidationEventHandler, bookNode);
        }
        catch (XmlException ex)
        {
            Console.WriteLine($"XmlDocumentValidationExample.XmlException: {ex.Message}");
        }
        catch(XmlSchemaValidationException ex)
        {
            Console.WriteLine($"XmlDocumentValidationExample.XmlSchemaValidationException: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"XmlDocumentValidationExample.Exception: {ex.Message}");
        }
    }

    static void ValidationEventHandler(object sender, System.Xml.Schema.ValidationEventArgs args)
    {
        if (args.Severity == XmlSeverityType.Warning)
            Console.Write("\nWARNING: ");
        else if (args.Severity == XmlSeverityType.Error)
            Console.Write("\nERROR: ");

        Console.WriteLine(args.Message);
    }
}
```

The example takes the `contosoBooks.xml` file as input.

_Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

The example also takes the `contosoBooks.xsd` file as input.

_Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd._

Consider the following when validating XML data as it is loaded into the DOM.

- In the above example, the `System.Xml.XmlReaderSettings.ValidationEventHandler` is called whenever an invalid type is encountered. If a `System.Xml.XmlReaderSettings.ValidationEventHandler` is not set on the validating `System.Xml.XmlReader`,an `System.Xml.Schema.XmlSchemaValidationException` is thrown when `System.Xml.XmlDocument.Load*` is called if any attribute or element type does not match the corresponding type specified in the validating schema.

- When an XML document is loaded into an `System.Xml.XmlDocument` object with an associated schema that defines default values, the `System.Xml.XmlDocument` treats these defaults as if they appeared in the XML document. This means that the `System.Xml.XmlReader.IsEmptyElement` property always returns `false` for an element that was defaulted from the schema. Even if in the XML document, it was written as an empty element.

## Validating an XML Document in the DOM

The `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class validates the XML data loaded in the DOM against the schemas in the `System.Xml.XmlDocument` object's `System.Xml.XmlDocument.Schemas` property. After successful validation, schema defaults are applied, text values are converted to atomic values as necessary, and type information is associated with validated information items. As a result, typed XML data replaces previously untyped XML data.

The example below is similar to the example in "Validating an XML Document As It Is Loaded into the DOM" above. In this example, the XML document is not validated as it is loaded into the DOM, but rather is validated after it has been loaded into the DOM using the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class. The `System.Xml.XmlDocument.Validate*` method validates the XML document against the XML schemas contained in the `System.Xml.XmlDocument.Schemas` property of the `System.Xml.XmlDocument`. Invalid modifications are then made to the XML document, and the document is then revalidated, causing schema validation errors. Finally, one of the errors is corrected, and then part of the XML document is partially validated.

```csharp
using System;
using System.Xml;
using System.Xml.Schema;

class XmlDocumentValidationExample
{
    static void Main(string[] args)
    {
        try
        {
            // Create a new XmlDocument instance and load
            // the XML document into the DOM.
            XmlDocument document = new XmlDocument();
            document.Load("contosoBooks.xml");

            // Add the XML schema for the XML document to the
            // Schemas property of the XmlDocument.
            document.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");

            // Validate the XML document loaded into the DOM.
            document.Validate(ValidationEventHandler);

            // Make an invalid change to the first and last
            // price elements in the XML document, and write
            // the XmlSchemaInfo values assigned to the price
            // element during validation to the console.
            XmlNamespaceManager manager = new XmlNamespaceManager(document.NameTable);
            manager.AddNamespace("bk", "http://www.contoso.com/books");

            XmlNode priceNode = document.SelectSingleNode(@"/bk:bookstore/bk:book/bk:price", manager);

            Console.WriteLine($"SchemaInfo.IsDefault: {priceNode.SchemaInfo.IsDefault}");
            Console.WriteLine($"SchemaInfo.IsNil: {priceNode.SchemaInfo.IsNil}");
            Console.WriteLine($"SchemaInfo.SchemaElement: {priceNode.SchemaInfo.SchemaElement}");
            Console.WriteLine($"SchemaInfo.SchemaType: {priceNode.SchemaInfo.SchemaType}");
            Console.WriteLine($"SchemaInfo.Validity: {priceNode.SchemaInfo.Validity}");

            priceNode.InnerXml = "A";

            XmlNodeList priceNodes = document.SelectNodes(@"/bk:bookstore/bk:book/bk:price", manager);
            XmlNode lastprice = priceNodes[priceNodes.Count - 1];

            lastprice.InnerXml = "B";

            // Validate the XML document with the invalid changes.
            // The invalid changes cause schema validation errors.
            document.Validate(ValidationEventHandler);

            // Correct the invalid change to the first price element.
            priceNode.InnerXml = "8.99";

            // Validate only the first book element. The last book
            // element is invalid, but not included in validation.
            XmlNode bookNode = document.SelectSingleNode(@"/bk:bookstore/bk:book", manager);
            document.Validate(ValidationEventHandler, bookNode);
        }
        catch (XmlException ex)
        {
            Console.WriteLine($"XmlDocumentValidationExample.XmlException: {ex.Message}");
        }
        catch(XmlSchemaValidationException ex)
        {
            Console.WriteLine($"XmlDocumentValidationExample.XmlSchemaValidationException: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"XmlDocumentValidationExample.Exception: {ex.Message}");
        }
    }

    static void ValidationEventHandler(object sender, System.Xml.Schema.ValidationEventArgs args)
    {
        if (args.Severity == XmlSeverityType.Warning)
            Console.Write("\nWARNING: ");
        else if (args.Severity == XmlSeverityType.Error)
            Console.Write("\nERROR: ");

        Console.WriteLine(args.Message);
    }
}
```

The example takes as input the `contosoBooks.xml` and `contosoBooks.xsd` files referred to in "Validating an XML Document as it is Loaded into the DOM" above.

## Handling Validation Errors and Warnings

XML schema validation errors are reported when validating XML data loaded in the DOM. You are notified about all schema validation errors found while validating the XML data as it is being loaded, or when validating a previously unvalidated XML document.

Validation errors are handled by the `System.Xml.Schema.ValidationEventHandler`. If a `System.Xml.Schema.ValidationEventHandler` was assigned to the `System.Xml.XmlReaderSettings` instance, or passed to the `System.Xml.XmlDocument.Validate*` method of the `System.Xml.XmlDocument` class, the `System.Xml.Schema.ValidationEventHandler` will handle schema validation errors; otherwise an `System.Xml.Schema.XmlSchemaValidationException` is raised when a schema validation error is encountered.

> **Note:**
> The XML data is loaded into the DOM despite schema validation errors unless your `System.Xml.Schema.ValidationEventHandler` raises an exception to stop the process.
>
> Schema validation warnings are not reported unless the `System.Xml.Schema.XmlSchemaValidationFlags.ReportValidationWarnings` flag is specified to the `System.Xml.XmlReaderSettings` object.

 For examples illustrating the `System.Xml.Schema.ValidationEventHandler`, see "Validating an XML Document As It Is Loaded into the DOM" and "Validating an XML Document in the DOM" above.

## See also

- `System.Xml.XmlDocument`
- `System.Xml.XmlReader`
- `System.Xml.Schema.ValidationEventHandler`
- `System.Xml.XmlReaderSettings`
- Process XML Data Using the DOM Model
- Working with XML Schemas
