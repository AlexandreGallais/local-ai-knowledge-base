---
title: "Building XML Schemas (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/building-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Building XML Schemas (part 3 of 3)

### Creating and Compiling Schemas

 At this point, the child elements and attributes, their corresponding types, and the top-level `Customer` element have been created in-memory using the SOM API. In the following code example, the schema element is created using the `System.Xml.Schema.XmlSchema` class, the top-level elements and types are added to it using the `System.Xml.Schema.XmlSchema.Items` property and the complete schema is compiled using the `System.Xml.Schema.XmlSchemaSet` class and written to the console.
 ```csharp
using System;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaCreateExample
{
    static void Main(string[] args)
    {
        // Create the FirstName and LastName elements.
        XmlSchemaElement firstNameElement = new XmlSchemaElement();
        firstNameElement.Name = "FirstName";
        XmlSchemaElement lastNameElement = new XmlSchemaElement();
        lastNameElement.Name = "LastName";

        // Create CustomerId attribute.
        XmlSchemaAttribute idAttribute = new XmlSchemaAttribute();
        idAttribute.Name = "CustomerId";
        idAttribute.Use = XmlSchemaUse.Required;

        // Create the simple type for the LastName element.
        XmlSchemaSimpleType lastNameType = new XmlSchemaSimpleType();
        lastNameType.Name = "LastNameType";
        XmlSchemaSimpleTypeRestriction lastNameRestriction =
            new XmlSchemaSimpleTypeRestriction();
        lastNameRestriction.BaseTypeName =
            new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");
        XmlSchemaMaxLengthFacet maxLength = new XmlSchemaMaxLengthFacet();
        maxLength.Value = "20";
        lastNameRestriction.Facets.Add(maxLength);
        lastNameType.Content = lastNameRestriction;

        // Associate the elements and attributes with their types.
        // Built-in type.
        firstNameElement.SchemaTypeName =
            new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");
        // User-defined type.
        lastNameElement.SchemaTypeName =
            new XmlQualifiedName("LastNameType", "http://www.tempuri.org");
        // Built-in type.
        idAttribute.SchemaTypeName = new XmlQualifiedName("positiveInteger",
            "http://www.w3.org/2001/XMLSchema");

        // Create the top-level Customer element.
        XmlSchemaElement customerElement = new XmlSchemaElement();
        customerElement.Name = "Customer";

        // Create an anonymous complex type for the Customer element.
        XmlSchemaComplexType customerType = new XmlSchemaComplexType();
        XmlSchemaSequence sequence = new XmlSchemaSequence();
        sequence.Items.Add(firstNameElement);
        sequence.Items.Add(lastNameElement);
        customerType.Particle = sequence;

        // Add the CustomerId attribute to the complex type.
        customerType.Attributes.Add(idAttribute);

        // Set the SchemaType of the Customer element to
        // the anonymous complex type created above.
        customerElement.SchemaType = customerType;

        // Create an empty schema.
        XmlSchema customerSchema = new XmlSchema();
        customerSchema.TargetNamespace = "http://www.tempuri.org";

        // Add all top-level element and types to the schema
        customerSchema.Items.Add(customerElement);
        customerSchema.Items.Add(lastNameType);

        // Create an XmlSchemaSet to compile the customer schema.
        XmlSchemaSet schemaSet = new XmlSchemaSet();
        schemaSet.ValidationEventHandler += new ValidationEventHandler(ValidationCallback);
        schemaSet.Add(customerSchema);
        schemaSet.Compile();

        foreach (XmlSchema schema in schemaSet.Schemas())
        {
            customerSchema = schema;
        }

        // Write the complete schema to the Console.
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

 The `System.Xml.Schema.XmlSchemaSet.Compile*` method validates the customer schema against the rules for an XML schema and makes post-schema-compilation properties available.

> **Note:**
> All post-schema-compilation properties in the SOM API differ from the Post-Schema-Validation-Infoset.

 The `System.Xml.Schema.ValidationEventHandler` added to the `System.Xml.Schema.XmlSchemaSet` is a delegate that calls the callback method `ValidationCallback` to handle schema validation warnings and errors.

 The following is the complete code example, and the customer schema written to the console.
 ```csharp
using System;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaCreateExample
{
    static void Main(string[] args)
    {
        // Create the FirstName and LastName elements.
        XmlSchemaElement firstNameElement = new XmlSchemaElement();
        firstNameElement.Name = "FirstName";
        XmlSchemaElement lastNameElement = new XmlSchemaElement();
        lastNameElement.Name = "LastName";

        // Create CustomerId attribute.
        XmlSchemaAttribute idAttribute = new XmlSchemaAttribute();
        idAttribute.Name = "CustomerId";
        idAttribute.Use = XmlSchemaUse.Required;

        // Create the simple type for the LastName element.
        XmlSchemaSimpleType lastNameType = new XmlSchemaSimpleType();
        lastNameType.Name = "LastNameType";
        XmlSchemaSimpleTypeRestriction lastNameRestriction =
            new XmlSchemaSimpleTypeRestriction();
        lastNameRestriction.BaseTypeName =
            new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");
        XmlSchemaMaxLengthFacet maxLength = new XmlSchemaMaxLengthFacet();
        maxLength.Value = "20";
        lastNameRestriction.Facets.Add(maxLength);
        lastNameType.Content = lastNameRestriction;

        // Associate the elements and attributes with their types.
        // Built-in type.
        firstNameElement.SchemaTypeName =
            new XmlQualifiedName("string", "http://www.w3.org/2001/XMLSchema");
        // User-defined type.
        lastNameElement.SchemaTypeName =
            new XmlQualifiedName("LastNameType", "http://www.tempuri.org");
        // Built-in type.
        idAttribute.SchemaTypeName = new XmlQualifiedName("positiveInteger",
            "http://www.w3.org/2001/XMLSchema");

        // Create the top-level Customer element.
        XmlSchemaElement customerElement = new XmlSchemaElement();
        customerElement.Name = "Customer";

        // Create an anonymous complex type for the Customer element.
        XmlSchemaComplexType customerType = new XmlSchemaComplexType();
        XmlSchemaSequence sequence = new XmlSchemaSequence();
        sequence.Items.Add(firstNameElement);
        sequence.Items.Add(lastNameElement);
        customerType.Particle = sequence;

        // Add the CustomerId attribute to the complex type.
        customerType.Attributes.Add(idAttribute);

        // Set the SchemaType of the Customer element to
        // the anonymous complex type created above.
        customerElement.SchemaType = customerType;

        // Create an empty schema.
        XmlSchema customerSchema = new XmlSchema();
        customerSchema.TargetNamespace = "http://www.tempuri.org";

        // Add all top-level element and types to the schema
        customerSchema.Items.Add(customerElement);
        customerSchema.Items.Add(lastNameType);

        // Create an XmlSchemaSet to compile the customer schema.
        XmlSchemaSet schemaSet = new XmlSchemaSet();
        schemaSet.ValidationEventHandler += new ValidationEventHandler(ValidationCallback);
        schemaSet.Add(customerSchema);
        schemaSet.Compile();

        foreach (XmlSchema schema in schemaSet.Schemas())
        {
            customerSchema = schema;
        }

        // Write the complete schema to the Console.
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

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
   <xs:element name="Customer">
      <xs:complexType>
         <xs:sequence>
            <xs:element name="FirstName" type="xs:string" />
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
</xs:schema>
```

## See also

- XML Schema Object Model Overview
- Reading and Writing XML Schemas
- Traversing XML Schemas
- Editing XML Schemas
- Including or Importing XML Schemas
- XmlSchemaSet for Schema Compilation
- Post-Schema Compilation Infoset
