---
title: "JSON schema exporter (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/extract-schema.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# JSON schema exporter (part 2 of 2)

## Transform the generated schema

You can apply your own transformations to generated schema nodes by specifying a `System.Text.Json.Schema.JsonSchemaExporterOptions.TransformSchemaNode` delegate. The following example incorporates text from `System.ComponentModel.DescriptionAttribute` annotations into the generated schema.

```csharp
﻿using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Schema;

class TransformSchema
{
    public static void RunIt()
    {
        JsonSchemaExporterOptions exporterOptions = new()
        {
            TransformSchemaNode = (context, schema) =>
            {
                // Determine if a type or property and extract the relevant attribute provider.
                ICustomAttributeProvider? attributeProvider = context.PropertyInfo is not null
                    ? context.PropertyInfo.AttributeProvider
                    : context.TypeInfo.Type;

                // Look up any description attributes.
                DescriptionAttribute? descriptionAttr = attributeProvider?
                    .GetCustomAttributes(inherit: true)
                    .Select(attr => attr as DescriptionAttribute)
                    .FirstOrDefault(attr => attr is not null);

                // Apply description attribute to the generated schema.
                if (descriptionAttr != null)
                {
                    if (schema is not JsonObject jObj)
                    {
                        // Handle the case where the schema is a Boolean.
                        JsonValueKind valueKind = schema.GetValueKind();
                        Debug.Assert(valueKind is JsonValueKind.True or JsonValueKind.False);
                        schema = jObj = new JsonObject();
                        if (valueKind is JsonValueKind.False)
                        {
                            jObj.Add("not", true);
                        }
                    }

                    jObj.Insert(0, "description", descriptionAttr.Description);
                }

                return schema;
            }
        };

        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person), exporterOptions);
        Console.WriteLine(schema.ToString());
        //{
        //  "description": "A person",
        //  "type": ["object", "null"],
        //  "properties": {
        //    "Name": { "description": "The name of the person", "type": "string" }
        //  },
        //  "required": ["Name"]
        //}
    }

    [Description("A person")]
    record Person([property: Description("The name of the person")] string Name);
}
```
The following code example generates a schema that incorporates `description` keyword source from `System.ComponentModel.DescriptionAttribute` annotations:

```csharp
﻿using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Schema;

class TransformSchema
{
    public static void RunIt()
    {
        JsonSchemaExporterOptions exporterOptions = new()
        {
            TransformSchemaNode = (context, schema) =>
            {
                // Determine if a type or property and extract the relevant attribute provider.
                ICustomAttributeProvider? attributeProvider = context.PropertyInfo is not null
                    ? context.PropertyInfo.AttributeProvider
                    : context.TypeInfo.Type;

                // Look up any description attributes.
                DescriptionAttribute? descriptionAttr = attributeProvider?
                    .GetCustomAttributes(inherit: true)
                    .Select(attr => attr as DescriptionAttribute)
                    .FirstOrDefault(attr => attr is not null);

                // Apply description attribute to the generated schema.
                if (descriptionAttr != null)
                {
                    if (schema is not JsonObject jObj)
                    {
                        // Handle the case where the schema is a Boolean.
                        JsonValueKind valueKind = schema.GetValueKind();
                        Debug.Assert(valueKind is JsonValueKind.True or JsonValueKind.False);
                        schema = jObj = new JsonObject();
                        if (valueKind is JsonValueKind.False)
                        {
                            jObj.Add("not", true);
                        }
                    }

                    jObj.Insert(0, "description", descriptionAttr.Description);
                }

                return schema;
            }
        };

        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person), exporterOptions);
        Console.WriteLine(schema.ToString());
        //{
        //  "description": "A person",
        //  "type": ["object", "null"],
        //  "properties": {
        //    "Name": { "description": "The name of the person", "type": "string" }
        //  },
        //  "required": ["Name"]
        //}
    }

    [Description("A person")]
    record Person([property: Description("The name of the person")] string Name);
}
```
```csharp
﻿using System;
using System.ComponentModel;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Schema;

class TransformSchema
{
    public static void RunIt()
    {
        JsonSchemaExporterOptions exporterOptions = new()
        {
            TransformSchemaNode = (context, schema) =>
            {
                // Determine if a type or property and extract the relevant attribute provider.
                ICustomAttributeProvider? attributeProvider = context.PropertyInfo is not null
                    ? context.PropertyInfo.AttributeProvider
                    : context.TypeInfo.Type;

                // Look up any description attributes.
                DescriptionAttribute? descriptionAttr = attributeProvider?
                    .GetCustomAttributes(inherit: true)
                    .Select(attr => attr as DescriptionAttribute)
                    .FirstOrDefault(attr => attr is not null);

                // Apply description attribute to the generated schema.
                if (descriptionAttr != null)
                {
                    if (schema is not JsonObject jObj)
                    {
                        // Handle the case where the schema is a Boolean.
                        JsonValueKind valueKind = schema.GetValueKind();
                        Debug.Assert(valueKind is JsonValueKind.True or JsonValueKind.False);
                        schema = jObj = new JsonObject();
                        if (valueKind is JsonValueKind.False)
                        {
                            jObj.Add("not", true);
                        }
                    }

                    jObj.Insert(0, "description", descriptionAttr.Description);
                }

                return schema;
            }
        };

        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person), exporterOptions);
        Console.WriteLine(schema.ToString());
        //{
        //  "description": "A person",
        //  "type": ["object", "null"],
        //  "properties": {
        //    "Name": { "description": "The name of the person", "type": "string" }
        //  },
        //  "required": ["Name"]
        //}
    }

    [Description("A person")]
    record Person([property: Description("The name of the person")] string Name);
}
```
