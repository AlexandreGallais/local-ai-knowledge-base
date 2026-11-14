---
title: "Editing XML Schemas (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/editing-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Editing XML Schemas (part 2 of 3)

## Editing an XML Schema

In this section, two code examples are provided, both of which edit the customer schema created in the Building XML Schemas topic. The first code example adds a new `PhoneNumber` element to the `Customer` element and the second code example adds a new `Title` attribute to the `FirstName` element. The first sample also uses the post-schema-compilation `System.Xml.Schema.XmlSchema.Elements*` collection as the means of traversing the customer schema while the second code example uses the pre-schema-compilation `System.Xml.Schema.XmlSchema.Items*` collection.

### PhoneNumber Element Example

This first code example adds a new `PhoneNumber` element to the `Customer` element of the customer schema. The code example edits the customer schema in the following steps.

1. Adds the customer schema to a new `System.Xml.Schema.XmlSchemaSet` object and then compiles it. Any schema validation warnings and errors encountered reading or compiling the schema are handled by the `System.Xml.Schema.ValidationEventHandler` delegate.

2. Retrieves the compiled `System.Xml.Schema.XmlSchema` object from the `System.Xml.Schema.XmlSchemaSet` by iterating over the `System.Xml.Schema.XmlSchemaSet.Schemas` property. Because the schema is compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Creates the `PhoneNumber` element using the `System.Xml.Schema.XmlSchemaElement` class, the `xs:string` simple type restriction using the `System.Xml.Schema.XmlSchemaSimpleType` and `System.Xml.Schema.XmlSchemaSimpleTypeRestriction` classes, adds a pattern facet to the `System.Xml.Schema.XmlSchemaSimpleTypeRestriction.Facets` property of the restriction, and adds the restriction to the `System.Xml.Schema.XmlSchemaSimpleType.Content` property of the simple type and the simple type to the `System.Xml.Schema.XmlSchemaElement.SchemaType*` of the `PhoneNumber` element.

4. Iterates over each `System.Xml.Schema.XmlSchemaElement` in the `System.Xml.Schema.XmlSchemaObjectTable.Values*` collection of the post-schema-compilation `System.Xml.Schema.XmlSchema.Elements*` collection.

5. If the `System.Xml.Schema.XmlSchemaElement.QualifiedName*` of the element is `"Customer"`, gets the complex type of the `Customer` element using the `System.Xml.Schema.XmlSchemaComplexType` class and the sequence particle of the complex type using the `System.Xml.Schema.XmlSchemaSequence` class.

6. Adds the new `PhoneNumber` element to the sequence containing the existing `FirstName` and `LastName` elements using the pre-schema-compilation `System.Xml.Schema.XmlSchemaSequence.Items*` collection of the sequence.

7. Finally, reprocesses and compiles the modified `System.Xml.Schema.XmlSchema` object using the `System.Xml.Schema.XmlSchemaSet.Reprocess*` and `System.Xml.Schema.XmlSchemaSet.Compile*` methods of the `System.Xml.Schema.XmlSchemaSet` class and writes it to the console.

The following is the complete code example.
```csharp
using System;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaEditExample
{
    static void Main(string[] args)
    {
        // Add the customer schema to a new XmlSchemaSet and compile it.
        // Any schema validation warnings and errors encountered reading or
        // compiling the schema are handled by the ValidationEventHandler delegate.
        XmlSchemaSet schemaSet = new XmlSchemaSet();
        schemaSet.ValidationEventHandler += new ValidationEventHandler(ValidationCallback);
        schemaSet.Add("http://www.tempuri.org", "customer.xsd");
        schemaSet.Compile();

        // Retrieve the compiled XmlSchema object from the XmlSchemaSet
        // by iterating over the Schemas property.
        XmlSchema customerSchema = null;
        foreach (XmlSchema schema in schemaSet.Schemas())
        {
            customerSchema = schema;
        }

        // Create the PhoneNumber element.
        XmlSchemaElement phoneElement = new XmlSchemaElement();
        phoneElement.Name = "PhoneNumber";

        // Create the xs:string simple type restriction.
        XmlSchemaSimpleType phoneType = new XmlSchemaSimpleType();
        XmlSchemaSimpleTypeRestriction restriction =
            new XmlSchemaSimpleTypeRestriction();
        restriction.BaseTypeName = new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");

        // Add a pattern facet to the restriction.
        XmlSchemaPatternFacet phonePattern = new XmlSchemaPatternFacet();
        phonePattern.Value = "\\d{3}-\\d{3}-\\d(4)";
        restriction.Facets.Add(phonePattern);

        // Add the restriction to the Content property of the simple type
        // and the simple type to the SchemaType of the PhoneNumber element.
        phoneType.Content = restriction;
        phoneElement.SchemaType = phoneType;

        // Iterate over each XmlSchemaElement in the Values collection
        // of the Elements property.
        foreach (XmlSchemaElement element in customerSchema.Elements.Values)
        {
            // If the qualified name of the element is "Customer",
            // get the complex type of the Customer element
            // and the sequence particle of the complex type.
            if (element.QualifiedName.Name.Equals("Customer"))
            {
                XmlSchemaComplexType customerType =
                    element.ElementSchemaType as XmlSchemaComplexType;
                XmlSchemaSequence sequence =
                    customerType.Particle as XmlSchemaSequence;

                // Add the new PhoneNumber element to the sequence.
                sequence.Items.Add(phoneElement);
            }
        }

        // Reprocess and compile the modified XmlSchema object and write it to the console.
        schemaSet.Reprocess(customerSchema);
        schemaSet.Compile();
        customerSchema.Write(Console.Out);
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

The following is the modified customer schema created in the Building XML Schemas topic.

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Customer">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="FirstName" type="xs:string" />
        <xs:element name="LastName" type="tns:LastNameType" />
        <xs:element name="PhoneNumber">           <xs:simpleType>             <xs:restriction base="xs:string">               <xs:pattern value="\d{3}-\d{3}-\d(4)" />             </xs:restriction>           </xs:simpleType>         </xs:element>
      </xs:sequence>
      <xs:attribute name="CustomerId" type="xs:positiveInteger" use="required" />
    </xs:complexType>
  </xs:element>
  <xs:simpleType name="LastNameType">
    <xs:restriction base="xs:string">
      <xs:maxLength value="20" />
    </xs:restriction>
  </xs:simpleType>
</xs:schema>
```
