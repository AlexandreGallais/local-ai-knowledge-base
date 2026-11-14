---
title: "Post-Schema Compilation Infoset"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/post-schema-compilation-infoset.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Post-schema compilation infoset

The World Wide Web Consortium (W3C) XML Schema Recommendation discusses the information set (infoset) that must be exposed for pre-schema validation and post-schema compilation. The XML Schema Object Model (SOM) views this exposure before and after the `System.Xml.Schema.XmlSchemaSet.Compile*` method of the `System.Xml.Schema.XmlSchemaSet` is called.

 The pre-schema validation infoset is built during the editing of the schema. The post-schema compilation infoset is generated after the `System.Xml.Schema.XmlSchemaSet.Compile*` method of the `System.Xml.Schema.XmlSchemaSet` is called, during compilation of the schema, and is exposed as properties.

 The SOM is the object model that represents the pre-schema validation and post-schema compilation infosets; it consists of the classes in the `System.Xml.Schema` namespace. All read and write properties of classes in the `System.Xml.Schema` namespace belong to the pre-schema validation infoset, while all read-only properties of classes in the `System.Xml.Schema` namespace belong to the post-schema compilation infoset. The exception to this rule are the following properties, which are both pre-schema validation infoset and post-schema compilation infoset properties.

|Class|Property|
|-----------|--------------|
|`System.Xml.Schema.XmlSchemaObject`|`System.Xml.Schema.XmlSchemaObject.Parent*`|
|`System.Xml.Schema.XmlSchema`|`System.Xml.Schema.XmlSchema.AttributeFormDefault*`, `System.Xml.Schema.XmlSchema.BlockDefault*`, `System.Xml.Schema.XmlSchema.ElementFormDefault*`, `System.Xml.Schema.XmlSchema.FinalDefault*`, `System.Xml.Schema.XmlSchema.TargetNamespace*`|
|`System.Xml.Schema.XmlSchemaExternal`|`System.Xml.Schema.XmlSchemaExternal.Schema*`|
|`System.Xml.Schema.XmlSchemaAttributeGroup`|`System.Xml.Schema.XmlSchemaAttributeGroup.AnyAttribute*`|
|`System.Xml.Schema.XmlSchemaParticle`|`System.Xml.Schema.XmlSchemaParticle.MaxOccurs*`, `System.Xml.Schema.XmlSchemaParticle.MinOccurs*`|
|`System.Xml.Schema.XmlSchemaComplexType`|`System.Xml.Schema.XmlSchemaComplexType.AnyAttribute*`|

 For example, the `System.Xml.Schema.XmlSchemaElement` and `System.Xml.Schema.XmlSchemaComplexType` classes both have `BlockResolved` and `FinalResolved` properties. These properties are used to hold the values for the `Block` and `Final` properties after the schema has been compiled and validated. `BlockResolved` and `FinalResolved` are read-only properties that are part of the post-schema compilation infoset.

 The following example shows the `System.Xml.Schema.XmlSchemaElement.ElementSchemaType` property of the `System.Xml.Schema.XmlSchemaElement` class set after validating the schema. Before validation, the property contains a `null` reference, and the `System.Xml.Schema.XmlSchemaElement.SchemaTypeName*` is set to the name of the type in question. After validation, the `System.Xml.Schema.XmlSchemaElement.SchemaTypeName*` is resolved to a valid type, and the type object is available through the `System.Xml.Schema.XmlSchemaElement.ElementSchemaType` property.
 ```csharp
using System;
using System.Xml;
using System.Xml.Schema;

public class PsciSample
{
    public static void Main(string[] args)
    {
        XmlSchema schema = new XmlSchema();

        // Create an element of type integer and add it to the schema.
        XmlSchemaElement priceElem = new XmlSchemaElement();
        priceElem.Name = "Price";
        priceElem.SchemaTypeName = new XmlQualifiedName("integer", "http://www.w3.org/2001/XMLSchema");
        schema.Items.Add(priceElem);

        // Print the pre-compilation value of the ElementSchemaType property
        // of the XmlSchemaElement which is a PSCI property.
        Console.WriteLine("Before compilation the ElementSchemaType of Price is " + priceElem.ElementSchemaType);

        //Compile the schema which validates the schema and
        // if valid will place the PSCI values in certain properties.
        XmlSchemaSet schemaSet = new XmlSchemaSet();
        schemaSet.ValidationEventHandler += ValidationCallbackOne;
        schemaSet.Add(schema);
        schemaSet.Compile();

        foreach (XmlSchema compiledSchema in schemaSet.Schemas())
        {
            schema = compiledSchema;
        }

        // After compilation of the schema, the ElementSchemaType property of the
        // XmlSchemaElement will contain a reference to a valid object because the
        // SchemaTypeName referred to a valid type.
        Console.WriteLine("After compilation the ElementSchemaType of Price is "
           + priceElem.ElementSchemaType);
    }

    private static void ValidationCallbackOne(object sender, ValidationEventArgs args)
    {
        Console.WriteLine(args.Message);
    }
}
```

## See also

- XML Schema Object Model (SOM)
