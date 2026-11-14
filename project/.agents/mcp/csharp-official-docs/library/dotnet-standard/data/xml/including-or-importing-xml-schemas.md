---
title: "Including or Importing XML Schemas"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/including-or-importing-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Include or import XML schemas

An XML schema may contain `<xs:import />`, `<xs:include />`, and `<xs:redefine />` elements. These schema elements refer to other XML schemas that can be used to supplement the structure of the schema that includes or imports them. The `System.Xml.Schema.XmlSchemaImport`, `System.Xml.Schema.XmlSchemaInclude` and `System.Xml.Schema.XmlSchemaRedefine` classes, map to these elements in the Schema Object Model (SOM) API.

## Including or Importing an XML Schema

 The following code example supplements the customer schema created in the Building XML Schemas topic with the address schema. Supplementing the customer schema with the address schema makes address types available in the customer schema.

 The address schema can be incorporated using either `<xs:include />` or `<xs:import />` elements to use the components of the address schema as-is, or using an `<xs:redefine />` element to modify any of its components to suit the need of the customer schema. Because the address schema has a `targetNamespace` that is different from that of the customer schema, the `<xs:import />` element and therefore import semantics is used.

 The code example includes the address schema in the following steps.

1. Adds the customer schema and the address schema to a new `System.Xml.Schema.XmlSchemaSet` object and then compiles them. Any schema validation warnings and errors encountered reading or compiling the schemas are handled by the `System.Xml.Schema.ValidationEventHandler` delegate.

2. Retrieves the compiled `System.Xml.Schema.XmlSchema` objects for both the customer and address schemas from the `System.Xml.Schema.XmlSchemaSet` by iterating over the `System.Xml.Schema.XmlSchemaSet.Schemas` property. Because the schemas are compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Creates an `System.Xml.Schema.XmlSchemaImport` object, sets the `System.Xml.Schema.XmlSchemaImport.Namespace` property of the import to the namespace of the address schema, sets the `System.Xml.Schema.XmlSchemaExternal.Schema` property of the import to the `System.Xml.Schema.XmlSchema` object of the address schema, and adds the import to the `System.Xml.Schema.XmlSchema.Includes` property of the customer schema.

4. Reprocesses and compiles the modified `System.Xml.Schema.XmlSchema` object of the customer schema using the `System.Xml.Schema.XmlSchemaSet.Reprocess*` and `System.Xml.Schema.XmlSchemaSet.Compile*` methods of the `System.Xml.Schema.XmlSchemaSet` class and writes it to the console.

5. Finally, recursively writes all of the schemas imported into the customer schema to the console using the `System.Xml.Schema.XmlSchema.Includes` property of the customer schema. The `System.Xml.Schema.XmlSchema.Includes` property provides access to all the includes, imports, or redefines added to a schema.

 The following is the complete code example and the customer and address schemas written to the console.
 ```csharp
using System;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaImportExample
{
    static void Main(string[] args)
    {
        // Add the customer and address schemas to a new XmlSchemaSet and compile them.
        // Any schema validation warnings and errors encountered reading or
        // compiling the schemas are handled by the ValidationEventHandler delegate.
        XmlSchemaSet schemaSet = new XmlSchemaSet();
        schemaSet.ValidationEventHandler += new ValidationEventHandler(ValidationCallback);
        schemaSet.Add("http://www.tempuri.org", "customer.xsd");
        schemaSet.Add("http://www.example.com/IPO", "address.xsd");
        schemaSet.Compile();

        // Retrieve the compiled XmlSchema objects for the customer and
        // address schema from the XmlSchemaSet by iterating over
        // the Schemas property.
        XmlSchema customerSchema = null;
        XmlSchema addressSchema = null;
        foreach (XmlSchema schema in schemaSet.Schemas())
        {
            if (schema.TargetNamespace == "http://www.tempuri.org")
                customerSchema = schema;
            else if (schema.TargetNamespace == "http://www.example.com/IPO")
                addressSchema = schema;
        }

        // Create an XmlSchemaImport object, set the Namespace property
        // to the namespace of the address schema, the Schema property
        // to the address schema, and add it to the Includes property
        // of the customer schema.
        XmlSchemaImport import = new XmlSchemaImport();
        import.Namespace = "http://www.example.com/IPO";
        import.Schema = addressSchema;
        customerSchema.Includes.Add(import);

        // Reprocess and compile the modified XmlSchema object
        // of the customer schema and write it to the console.
        schemaSet.Reprocess(customerSchema);
        schemaSet.Compile();
        customerSchema.Write(Console.Out);

        // Recursively write all of the schemas imported into the
        // customer schema to the console using the Includes
        // property of the customer schema.
        RecurseExternals(customerSchema);
    }

    static void RecurseExternals(XmlSchema schema)
    {
        foreach (XmlSchemaExternal external in schema.Includes)
        {
            if (external.SchemaLocation != null)
            {
                Console.WriteLine($"External SchemaLocation: {external.SchemaLocation}");
            }

            if (external is XmlSchemaImport)
            {
                XmlSchemaImport import = external as XmlSchemaImport;
                Console.WriteLine($"Imported namespace: {import.Namespace}");
            }

            if (external.Schema != null)
            {
                external.Schema.Write(Console.Out);
                RecurseExternals(external.Schema);
            }
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

```xml
<?xml version="1.0" encoding="utf-8"?>
<xs:schema xmlns:tns="http://www.tempuri.org" targetNamespace="http://www.tempuri.org" xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:import namespace="http://www.example.com/IPO" />
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
<schema targetNamespace="http://www.example.com/IPO" xmlns="http://www.w3.org/2001/XMLSchema" xmlns:ipo="http://www.example.com/IPO">
  <annotation>
    <documentation xml:lang="en">
      Addresses for International Purchase order schema
      Copyright 2000 Example.com. All rights reserved.
    </documentation>
  </annotation>
  <complexType name="Address">
    <sequence>
      <element name="name"   type="string"/>
      <element name="street" type="string"/>
      <element name="city"   type="string"/>
    </sequence>
  </complexType>
  <complexType name="USAddress">
    <complexContent>
      <extension base="ipo:Address">
        <sequence>
          <element name="state" type="ipo:USState"/>
          <element name="zip"   type="positiveInteger"/>
        </sequence>
      </extension>
    </complexContent>
  </complexType>
  <!-- other Address derivations for more countries or regions -->
  <simpleType name="USState">
    <restriction base="string">
      <enumeration value="AK"/>
      <enumeration value="AL"/>
      <enumeration value="AR"/>
      <!-- and so on ... -->
    </restriction>
  </simpleType>
</schema>
```

 For more information about the `<xs:import />`, `<xs:include />`, and `<xs:redefine />` elements and the `System.Xml.Schema.XmlSchemaImport`, `System.Xml.Schema.XmlSchemaInclude` and `System.Xml.Schema.XmlSchemaRedefine` classes, see the W3C XML Schema and the `System.Xml.Schema` namespace class reference documentation.

## See also

- XML Schema Object Model Overview
- Reading and Writing XML Schemas
- Building XML Schemas
- Traversing XML Schemas
- Editing XML Schemas
- XmlSchemaSet for Schema Compilation
