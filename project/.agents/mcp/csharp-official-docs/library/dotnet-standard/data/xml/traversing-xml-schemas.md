---
title: "Traversing XML Schemas"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/traversing-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Traverse XML schemas

Traversing an XML schema using the Schema Object Model (SOM) API provides access to the elements, attributes, and types stored in the SOM. Traversing an XML schema loaded into the SOM is also the first step in editing an XML schema using the SOM API.

## Traversing an XML Schema

The following properties of the `System.Xml.Schema.XmlSchema` class provide access to the collection of all global items added to the XML schema.

|Property|Object type stored in the collection or array|
|--------------|---------------------------------------------------|
|`System.Xml.Schema.XmlSchema.Elements*`|`System.Xml.Schema.XmlSchemaElement`|
|`System.Xml.Schema.XmlSchema.Attributes*`|`System.Xml.Schema.XmlSchemaAttribute`|
|`System.Xml.Schema.XmlSchema.AttributeGroups*`|`System.Xml.Schema.XmlSchemaAttributeGroup`|
|`System.Xml.Schema.XmlSchema.Groups*`|`System.Xml.Schema.XmlSchemaGroup`|
|`System.Xml.Schema.XmlSchema.Includes*`|`System.Xml.Schema.XmlSchemaExternal`, `System.Xml.Schema.XmlSchemaInclude`, `System.Xml.Schema.XmlSchemaImport`, or `System.Xml.Schema.XmlSchemaRedefine`|
|`System.Xml.Schema.XmlSchema.Items*`|`System.Xml.Schema.XmlSchemaObject` (provides access to all global level elements, attributes, and types).|
|`System.Xml.Schema.XmlSchema.Notations*`|`System.Xml.Schema.XmlSchemaNotation`|
|`System.Xml.Schema.XmlSchema.SchemaTypes*`|`System.Xml.Schema.XmlSchemaType`, `System.Xml.Schema.XmlSchemaSimpleType`, `System.Xml.Schema.XmlSchemaComplexType`|
|`System.Xml.Schema.XmlSchema.UnhandledAttributes*`|`System.Xml.XmlAttribute` (provides access to attributes that do not belong to the schema namespace)|

> **Note:**
> All of the properties listed in the table above, except for the `System.Xml.Schema.XmlSchema.Items` property, are Post-Schema-Compilation-Infoset (PSCI) properties that are not available until the schema has been compiled. The `System.Xml.Schema.XmlSchema.Items` property is a pre-schema-compilation property that can be used before the schema has been compiled to access and edit all global level elements, attributes, and types.
>
> The `System.Xml.Schema.XmlSchema.UnhandledAttributes` property provides access to all the attributes that do not belong to the schema namespace. These attributes are not processed by the schema processor.

The code example that follows demonstrates traversing the customer schema created in the Building XML Schemas topic. The code example demonstrates traversing the schema using the collections described above and writes all the elements and attributes in the schema to the console.

The sample traverses the customer schema in the following steps.

1. Adds the customer schema to a new `System.Xml.Schema.XmlSchemaSet` object and then compiles it. Any schema validation warnings and errors encountered reading or compiling the schema are handled by the `System.Xml.Schema.ValidationEventHandler` delegate.

2. Retrieves the compiled `System.Xml.Schema.XmlSchema` object from the `System.Xml.Schema.XmlSchemaSet` by iterating over the `System.Xml.Schema.XmlSchemaSet.Schemas` property. Because the schema is compiled, Post-Schema-Compilation-Infoset (PSCI) properties are accessible.

3. Iterates over each `System.Xml.Schema.XmlSchemaElement` in the `System.Xml.Schema.XmlSchemaObjectTable.Values*` collection of the post-schema-compilation `System.Xml.Schema.XmlSchema.Elements*` collection writing the name of each element to the console.

4. Gets the complex type of the `Customer` element using the `System.Xml.Schema.XmlSchemaComplexType` class.

5. If the complex type has any attributes, gets an `System.Collections.IDictionaryEnumerator` to enumerate over each `System.Xml.Schema.XmlSchemaAttribute` and writes its name to the console.

6. Gets the sequence particle of the complex type using the `System.Xml.Schema.XmlSchemaSequence` class.

7. Iterates over each `System.Xml.Schema.XmlSchemaElement` in the `System.Xml.Schema.XmlSchemaSequence.Items*` collection writing the name of each child element to the console.

The following is the complete code example.
```csharp
using System;
using System.Collections;
using System.Xml;
using System.Xml.Schema;

class XmlSchemaTraverseExample
{
    static void Main()
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

        // Iterate over each XmlSchemaElement in the Values collection
        // of the Elements property.
        foreach (XmlSchemaElement element in customerSchema.Elements.Values)
        {

            Console.WriteLine($"Element: {element.Name}");

            // Get the complex type of the Customer element.
            XmlSchemaComplexType complexType = element.ElementSchemaType as XmlSchemaComplexType;

            // If the complex type has any attributes, get an enumerator
            // and write each attribute name to the console.
            if (complexType.AttributeUses.Count > 0)
            {
                IDictionaryEnumerator enumerator =
                    complexType.AttributeUses.GetEnumerator();

                while (enumerator.MoveNext())
                {
                    XmlSchemaAttribute attribute =
                        (XmlSchemaAttribute)enumerator.Value;

                    Console.WriteLine($"Attribute: {attribute.Name}");
                }
            }

            // Get the sequence particle of the complex type.
            XmlSchemaSequence sequence = complexType.ContentTypeParticle as XmlSchemaSequence;

            // Iterate over each XmlSchemaElement in the Items collection.
            foreach (XmlSchemaElement childElement in sequence.Items)
            {
                Console.WriteLine($"Element: {childElement.Name}");
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

The `System.Xml.Schema.XmlSchemaElement.ElementSchemaType` property can be `System.Xml.Schema.XmlSchemaSimpleType`, or `System.Xml.Schema.XmlSchemaComplexType` if it is a user-defined simple type or a complex type. It can also be `System.Xml.Schema.XmlSchemaDatatype` if it is one of the built-in datatypes defined in the W3C XML Schema Recommendation. In the customer schema, the `System.Xml.Schema.XmlSchemaElement.ElementSchemaType*` of the `Customer` element is `System.Xml.Schema.XmlSchemaComplexType`, and the `FirstName` and `LastName` elements are `System.Xml.Schema.XmlSchemaSimpleType`.

The code example in the Building XML Schemas topic used the `System.Xml.Schema.XmlSchemaComplexType.Attributes*` collection to add the attribute `CustomerId` to the `Customer` element. This is a pre-schema-compilation property. The corresponding Post-Schema-Compilation-Infoset property is the `System.Xml.Schema.XmlSchemaComplexType.AttributeUses*` collection, which holds all the attributes of the complex type, including the ones that are inherited through type derivation.

## See also

- XML Schema Object Model Overview
- Reading and Writing XML Schemas
- Building XML Schemas
- Editing XML Schemas
- Including or Importing XML Schemas
- XmlSchemaSet for Schema Compilation
- Post-Schema Compilation Infoset
