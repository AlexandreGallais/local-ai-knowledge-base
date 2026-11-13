---
title: "Building XML Schemas (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/building-xml-schemas.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Building XML Schemas (part 2 of 3)

## Building an XML Schema

 In the code examples that follow, the SOM API is used to build a customer XML schema in-memory.

### Creating Element and Attributes

 The code examples build the customer schema from the bottom up, creating the child elements, attributes, and their corresponding types first, and then the top-level elements.

 In the following code example, the `FirstName` and `LastName` elements, as well as the `CustomerId` attribute of the customer schema are created using the `System.Xml.Schema.XmlSchemaElement` and `System.Xml.Schema.XmlSchemaAttribute` classes of the SOM. Apart from the `System.Xml.Schema.XmlSchemaElement.Name` properties of the `System.Xml.Schema.XmlSchemaElement` and `System.Xml.Schema.XmlSchemaAttribute` classes, which correspond to the "name" attribute of the `<xs:element />` and `<xs:attribute />` elements in an XML schema, all other attributes allowed by the schema (`defaultValue`, `fixedValue`, `form`, and so on) have corresponding properties in the `System.Xml.Schema.XmlSchemaElement` and `System.Xml.Schema.XmlSchemaAttribute` classes.
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

### Creating Schema Types

 The content of elements and attributes is defined by their types. To create elements and attributes whose types are one of the built-in schema types, the `System.Xml.Schema.XmlSchemaElement.SchemaTypeName` property of the `System.Xml.Schema.XmlSchemaElement` or `System.Xml.Schema.XmlSchemaAttribute` classes are set with the corresponding qualified name of the built-in type using the `System.Xml.XmlQualifiedName` class. To create a user-defined type for elements and attributes, a new simple or complex type is created using the `System.Xml.Schema.XmlSchemaSimpleType` or `System.Xml.Schema.XmlSchemaComplexType` class.

> **Note:**
> To create unnamed simple or complex types that are anonymous children of an element or attribute (only simple types apply for attributes), set the `System.Xml.Schema.XmlSchemaElement.SchemaType` property of the `System.Xml.Schema.XmlSchemaElement` or `System.Xml.Schema.XmlSchemaAttribute` classes to the unnamed simple or complex type, instead of the `System.Xml.Schema.XmlSchemaElement.SchemaTypeName` property of the `System.Xml.Schema.XmlSchemaElement` or `System.Xml.Schema.XmlSchemaAttribute` classes.

 XML schemas allow both anonymous and named simple types to be derived by restriction from other simple types (built-in or user-defined) or constructed as a list or union of other simple types. The `System.Xml.Schema.XmlSchemaSimpleTypeRestriction` class is used to create a simple type by restricting the built-in `xs:string` type. You can also use the `System.Xml.Schema.XmlSchemaSimpleTypeList` or `System.Xml.Schema.XmlSchemaSimpleTypeUnion` classes to create list or union types. The `System.Xml.Schema.XmlSchemaSimpleType.Content` property denotes whether it is a simple type restriction, list, or union.

 In the following code example, the `FirstName` element's type is the built-in type `xs:string`, the `LastName` element's type is a named simple type that is a restriction of the built-in type `xs:string`, with a `MaxLength` facet value of 20, and the `CustomerId` attribute's type is the built-in type `xs:positiveInteger`. The `Customer` element is an anonymous complex type whose particle is the sequence of the `FirstName` and `LastName` elements and whose attributes contains the `CustomerId` attribute.

> **Note:**
> You can also use the `System.Xml.Schema.XmlSchemaChoice` or `System.Xml.Schema.XmlSchemaAll` classes as the particle of the complex type to replicate `<xs:choice />` or `<xs:all />` semantics.
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
