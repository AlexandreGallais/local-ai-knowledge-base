---
title: "Editing XML Schemas (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/editing-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Editing XML Schemas (part 3 of 3)

### Title Attribute Example

This second code example, adds a new `Title` attribute to the `FirstName` element of the customer schema. In the first code example, the type of the `FirstName` element is `xs:string`. For the `FirstName` element to have an attribute along with string content, its type must be changed to a complex type with a simple content extension content model.

The code example edits the customer schema in the following steps.

1. Adds the customer schema to a new `System.Xml.Schema.XmlSchemaSet` object and then compiles it. Any schema validation warnings and errors encountered reading or compiling the schema are handled by the `System.Xml.Schema.ValidationEventHandler` delegate.

2. Retrieves the compiled `System.Xml.Schema.XmlSchema` object from the `System.Xml.Schema.XmlSchemaSet` by iterating over the `System.Xml.Schema.XmlSchemaSet.Schemas` property. Because the schema is compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Creates a new complex type for the `FirstName` element using the `System.Xml.Schema.XmlSchemaComplexType` class.

4. Creates a new simple content extension, with a base type of `xs:string`, using the `System.Xml.Schema.XmlSchemaSimpleContent` and `System.Xml.Schema.XmlSchemaSimpleContentExtension` classes.

5. Creates the new `Title` attribute using the `System.Xml.Schema.XmlSchemaAttribute` class, with a `System.Xml.Schema.XmlSchemaAttribute.SchemaTypeName*` of `xs:string` and adds the attribute to the simple content extension.

6. Sets the content model of the simple content to the simple content extension and the content model of the complex type to the simple content.

7. Adds the new complex type to the pre-schema-compilation `System.Xml.Schema.XmlSchema.Items*` collection.

8. Iterates over each `System.Xml.Schema.XmlSchemaObject` in the pre-schema-compilation `System.Xml.Schema.XmlSchema.Items*` collection.

> **Note:**
> Because the `FirstName` element is not a global element in the schema, it is not available in the `System.Xml.Schema.XmlSchema.Items*` or `System.Xml.Schema.XmlSchema.Elements*` collections. The code example locates the `FirstName` element by first locating the `Customer` element.
>
> The first code example traversed the schema using the post-schema-compilation `System.Xml.Schema.XmlSchema.Elements*` collection. In this sample, the pre-schema-compilation `System.Xml.Schema.XmlSchema.Items*` collection is used to traverse the schema. While both collections provide access to the global elements in the schema, iterating through the `System.Xml.Schema.XmlSchema.Items*` collection is more time consuming because you must iterate over all global elements in the schema and it does not have any PSCI properties. The PSCI collections (`System.Xml.Schema.XmlSchema.Elements*`, `System.Xml.Schema.XmlSchema.Attributes*`, `System.Xml.Schema.XmlSchema.SchemaTypes*`, and so on) provide direct access to their global elements, attributes, and types and their PSCI properties.

1. If the `System.Xml.Schema.XmlSchemaObject` is an element, whose `System.Xml.Schema.XmlSchemaElement.QualifiedName*` is `"Customer"`, gets the complex type of the `Customer` element using the `System.Xml.Schema.XmlSchemaComplexType` class and the sequence particle of the complex type using the `System.Xml.Schema.XmlSchemaSequence` class.

2. Iterates over each `System.Xml.Schema.XmlSchemaParticle` in the pre-schema-compilation `System.Xml.Schema.XmlSchemaSequence.Items*` collection.

3. If the `System.Xml.Schema.XmlSchemaParticle` is an element, who's `System.Xml.Schema.XmlSchemaElement.QualifiedName*` is `"FirstName"`, sets the `System.Xml.Schema.XmlSchemaElement.SchemaTypeName*` of the `FirstName` element to the new `FirstName` complex type.

4. Finally, reprocesses and compiles the modified `System.Xml.Schema.XmlSchema` object using the `System.Xml.Schema.XmlSchemaSet.Reprocess*` and `System.Xml.Schema.XmlSchemaSet.Compile*` methods of the `System.Xml.Schema.XmlSchemaSet` class and writes it to the console.

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

        // Create a complex type for the FirstName element.
        XmlSchemaComplexType complexType = new XmlSchemaComplexType();
        complexType.Name = "FirstNameComplexType";

        // Create a simple content extension with a base type of xs:string.
        XmlSchemaSimpleContent simpleContent = new XmlSchemaSimpleContent();
        XmlSchemaSimpleContentExtension simpleContentExtension =
            new XmlSchemaSimpleContentExtension();
        simpleContentExtension.BaseTypeName =
            new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");

        // Create the new Title attribute with a SchemaTypeName of xs:string
        // and add it to the simple content extension.
        XmlSchemaAttribute attribute = new XmlSchemaAttribute();
        attribute.Name = "Title";
        attribute.SchemaTypeName =
            new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");
        simpleContentExtension.Attributes.Add(attribute);

        // Set the content model of the simple content to the simple content extension
        // and the content model of the complex type to the simple content.
        simpleContent.Content = simpleContentExtension;
        complexType.ContentModel = simpleContent;

        // Add the new complex type to the pre-schema-compilation Items collection.
        customerSchema.Items.Add(complexType);

        // Iterate over each XmlSchemaObject in the pre-schema-compilation
        // Items collection.
        foreach (XmlSchemaObject schemaObject in customerSchema.Items)
        {
            // If the XmlSchemaObject is an element, whose QualifiedName
            // is "Customer", get the complex type of the Customer element
            // and the sequence particle of the complex type.
            if (schemaObject is XmlSchemaElement)
            {
                XmlSchemaElement element = schemaObject as XmlSchemaElement;

                if (element.QualifiedName.Name.Equals("Customer"))
                {
                    XmlSchemaComplexType customerType =
                        element.ElementSchemaType as XmlSchemaComplexType;

                    XmlSchemaSequence sequence =
                        customerType.Particle as XmlSchemaSequence;

                    // Iterate over each XmlSchemaParticle in the pre-schema-compilation
                    // Items property.
                    foreach (XmlSchemaParticle particle in sequence.Items)
                    {
                        // If the XmlSchemaParticle is an element, who's QualifiedName
                        // is "FirstName", set the SchemaTypeName of the FirstName element
                        // to the new FirstName complex type.
                        if (particle is XmlSchemaElement)
                        {
                            XmlSchemaElement childElement =
                                particle as XmlSchemaElement;

                            if (childElement.Name.Equals("FirstName"))
                            {
                                childElement.SchemaTypeName =
                                    new XmlQualifiedName("FirstNameComplexType",
                                    "http://www.tempuri.org");
                            }
                        }
                    }
                }
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
<?xml version="1.0" encoding=" utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="Customer">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="FirstName" type="tns:FirstNameComplexType" />
        <xs:element name="LastName" type="tns:LastNameType" />
      </xs:sequence>
      <xs:attribute name="CustomerId" type="xs:positiveInteger" use="required" />
    </xs:complexType>
  </xs:element>
  <xs:simpleType name="LastNameType">
    <xs:restriction base="xs:string">
      <xs:maxLength value="20" />
    </xs:restriction>
  </xs:simpleType>
  <xs:complexType name="FirstNameComplexType">     <xs:simpleContent>       <xs:extension base="xs:string">         <xs:attribute name="Title" type="xs:string" />       </xs:extension>     </xs:simpleContent>   </xs:complexType>
</xs:schema>
```

## See also

- XML Schema Object Model Overview
- Reading and Writing XML Schemas
- Building XML Schemas
- Traversing XML Schemas
- Including or Importing XML Schemas
- XmlSchemaSet for Schema Compilation
- Post-Schema Compilation Infoset
