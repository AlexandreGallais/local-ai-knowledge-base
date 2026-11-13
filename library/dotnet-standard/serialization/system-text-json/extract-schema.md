---
title: "JSON schema exporter (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/extract-schema.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# JSON schema exporter

The `System.Text.Json.Schema.JsonSchemaExporter` class, introduced in .NET 9, lets you extract JSON schema documents from .NET types using either a `System.Text.Json.JsonSerializerOptions` or `System.Text.Json.Serialization.Metadata.JsonTypeInfo` instance. The resultant schema provides a specification of the JSON serialization contract for the .NET type. The schema describes the shape of what would be serialized and what can be deserialized.

The following code snippet shows an example.

```csharp
﻿using System.Text.Json.Nodes;
using System.Text.Json;
using System;
using System.Text.Json.Schema;
using System.Text.Json.Serialization;
using System.Runtime.Serialization;

public class ExtractExample1
{
    public static void SimpleExtraction()
    {
        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person));
        Console.WriteLine(schema.ToString());
        //{
        //  "type": ["object", "null"],
        //  "properties": {
        //    "Name": { "type": "string" },
        //    "Age": { "type": "integer" },
        //    "Address": { "type": ["string", "null"], "default": null }
        //  },
        //  "required": ["Name", "Age"]
        //}
    }

    record Person(string Name, int Age, string? Address = null);
}

public class ExtractExample2
{
    public static void CustomExtraction()
    {
        JsonSerializerOptions options = new(JsonSerializerOptions.Default)
        {
            PropertyNamingPolicy = JsonNamingPolicy.KebabCaseUpper,
            NumberHandling = JsonNumberHandling.WriteAsString,
            UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,
        };

        JsonNode schema = options.GetJsonSchemaAsNode(typeof(MyPoco));
        Console.WriteLine(schema.ToString());
        //{
        //  "type": ["object", "null"],
        //  "properties": {
        //    "NUMERIC-VALUE": {
        //      "type": ["string", "integer"],
        //      "pattern": "^-?(?:0|[1-9]\\d*)$"
        //    }
        //  },
        //  "additionalProperties": false
        //}
    }

    class MyPoco
    {
        public int NumericValue { get; init; }
    }
}

public class ExtractExample3
{
    public static void CustomExtraction()
    {
        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonSchemaExporterOptions exporterOptions = new()
        {
            TreatNullObliviousAsNonNullable = true,
        };

        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person), exporterOptions);
        Console.WriteLine(schema.ToString());
        //{
        //  "type": "object",
        //  "properties": {
        //    "Name": { "type": "string" }
        //  },
        //  "required": ["Name"]
        //}
    }

    record Person(string Name);
}
```
As can be seen in this example, the exporter distinguishes between nullable and non-nullable properties, and it populates the `required` keyword by virtue of a constructor parameter being optional or not.

Starting in .NET 11, the exporter recognizes the `System.Numerics.BFloat16`, `System.Numerics.Decimal32`, `System.Numerics.Decimal64`, and `System.Numerics.Decimal128` types. It exports schemas for their nullable forms and for named literals when you enable `System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals`.

## Schemas for union types

Starting in .NET 11, `System.Text.Json.Schema.JsonSchemaExporter` describes a C# union with an untagged `anyOf` schema that has a branch for each case. The union adds no discriminator because `System.Text.Json.JsonSerializer` writes only the active case. By contrast, when you enable inference for a closed hierarchy, JSON serialized as the closed base type includes a `$type` discriminator that identifies the derived type. The `anyOf` described here is `JsonSchemaExporter` output; ASP.NET Core generates OpenAPI documents separately.

## Configure the schema output

You can influence the schema output by configuration specified in the `System.Text.Json.JsonSerializerOptions` or `System.Text.Json.Serialization.Metadata.JsonTypeInfo` instance that you call the `System.Text.Json.Schema.JsonSchemaExporter.GetJsonSchemaAsNode*` method on. The following example sets the naming policy to `System.Text.Json.JsonNamingPolicy.KebabCaseUpper`, writes numbers as strings, and disallows unmapped properties.

```csharp
﻿using System.Text.Json.Nodes;
using System.Text.Json;
using System;
using System.Text.Json.Schema;
using System.Text.Json.Serialization;
using System.Runtime.Serialization;

public class ExtractExample1
{
    public static void SimpleExtraction()
    {
        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person));
        Console.WriteLine(schema.ToString());
        //{
        //  "type": ["object", "null"],
        //  "properties": {
        //    "Name": { "type": "string" },
        //    "Age": { "type": "integer" },
        //    "Address": { "type": ["string", "null"], "default": null }
        //  },
        //  "required": ["Name", "Age"]
        //}
    }

    record Person(string Name, int Age, string? Address = null);
}

public class ExtractExample2
{
    public static void CustomExtraction()
    {
        JsonSerializerOptions options = new(JsonSerializerOptions.Default)
        {
            PropertyNamingPolicy = JsonNamingPolicy.KebabCaseUpper,
            NumberHandling = JsonNumberHandling.WriteAsString,
            UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,
        };

        JsonNode schema = options.GetJsonSchemaAsNode(typeof(MyPoco));
        Console.WriteLine(schema.ToString());
        //{
        //  "type": ["object", "null"],
        //  "properties": {
        //    "NUMERIC-VALUE": {
        //      "type": ["string", "integer"],
        //      "pattern": "^-?(?:0|[1-9]\\d*)$"
        //    }
        //  },
        //  "additionalProperties": false
        //}
    }

    class MyPoco
    {
        public int NumericValue { get; init; }
    }
}

public class ExtractExample3
{
    public static void CustomExtraction()
    {
        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonSchemaExporterOptions exporterOptions = new()
        {
            TreatNullObliviousAsNonNullable = true,
        };

        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person), exporterOptions);
        Console.WriteLine(schema.ToString());
        //{
        //  "type": "object",
        //  "properties": {
        //    "Name": { "type": "string" }
        //  },
        //  "required": ["Name"]
        //}
    }

    record Person(string Name);
}
```
You can further control the generated schema using the `System.Text.Json.Schema.JsonSchemaExporterOptions` configuration type. The following example sets the `System.Text.Json.Schema.JsonSchemaExporterOptions.TreatNullObliviousAsNonNullable` property to `true` to mark root-level types as non-nullable.

```csharp
﻿using System.Text.Json.Nodes;
using System.Text.Json;
using System;
using System.Text.Json.Schema;
using System.Text.Json.Serialization;
using System.Runtime.Serialization;

public class ExtractExample1
{
    public static void SimpleExtraction()
    {
        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person));
        Console.WriteLine(schema.ToString());
        //{
        //  "type": ["object", "null"],
        //  "properties": {
        //    "Name": { "type": "string" },
        //    "Age": { "type": "integer" },
        //    "Address": { "type": ["string", "null"], "default": null }
        //  },
        //  "required": ["Name", "Age"]
        //}
    }

    record Person(string Name, int Age, string? Address = null);
}

public class ExtractExample2
{
    public static void CustomExtraction()
    {
        JsonSerializerOptions options = new(JsonSerializerOptions.Default)
        {
            PropertyNamingPolicy = JsonNamingPolicy.KebabCaseUpper,
            NumberHandling = JsonNumberHandling.WriteAsString,
            UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,
        };

        JsonNode schema = options.GetJsonSchemaAsNode(typeof(MyPoco));
        Console.WriteLine(schema.ToString());
        //{
        //  "type": ["object", "null"],
        //  "properties": {
        //    "NUMERIC-VALUE": {
        //      "type": ["string", "integer"],
        //      "pattern": "^-?(?:0|[1-9]\\d*)$"
        //    }
        //  },
        //  "additionalProperties": false
        //}
    }

    class MyPoco
    {
        public int NumericValue { get; init; }
    }
}

public class ExtractExample3
{
    public static void CustomExtraction()
    {
        JsonSerializerOptions options = JsonSerializerOptions.Default;
        JsonSchemaExporterOptions exporterOptions = new()
        {
            TreatNullObliviousAsNonNullable = true,
        };

        JsonNode schema = options.GetJsonSchemaAsNode(typeof(Person), exporterOptions);
        Console.WriteLine(schema.ToString());
        //{
        //  "type": "object",
        //  "properties": {
        //    "Name": { "type": "string" }
        //  },
        //  "required": ["Name"]
        //}
    }

    record Person(string Name);
}
```
