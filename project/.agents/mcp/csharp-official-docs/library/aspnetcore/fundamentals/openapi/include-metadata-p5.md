---
title: "Include OpenAPI metadata in an ASP.NET Core app (part 5 of 6)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/openapi/include-metadata.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Include OpenAPI metadata in an ASP.NET Core app (part 5 of 6)

## Include OpenAPI metadata for data types

C# classes or records used in request or response bodies are represented as schemas
in the generated OpenAPI document.
By default, only `public` properties are represented in the schema, but there are
`System.Text.Json.JsonSerializerOptions` to also create schema properties for fields.

When the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` is set to camel-case (this is the default
in ASP.NET web applications), property names in a schema are the camel-case form
of the class or record property name.
The `[JsonPropertyName]` can be used on an individual property to specify the name
of the property in the schema.

### type and format

#### Numeric types

The JSON Schema library maps standard C# numeric types to OpenAPI `type` and `format` based on the
`System.Text.Json.JsonSerializerOptions.NumberHandling` property of the `System.Text.Json.JsonSerializerOptions`
used in the app. In ASP.NET Core Web API apps, the default value of this property is `JsonNumberHandling.AllowReadingFromString`.

When the `System.Text.Json.JsonSerializerOptions.NumberHandling` property is set to `JsonNumberHandling.AllowReadingFromString`, the numeric types are mapped as follows:

| C# Type        | OpenAPI `type`   | OpenAPI `format` | Other assertions               |
| -------------- | ---------------- | ---------------- | ------------------------------ |
| int            | [integer,string] | int32            | pattern `<digits>` |
| long           | [integer,string] | int64            | pattern `<digits>` |
| short          | [integer,string] | int16            | pattern `<digits>` |
| byte           | [integer,string] | uint8            | pattern `<digits>` |
| float          | [number,string]  | float            | pattern `<digits with decimal >` |
| double         | [number,string]  | double           | pattern `<digits with decimal >` |
| decimal        | [number,string]  | double           | pattern `<digits with decimal >` |

If the app is configured to produce OpenAPI 3.0 or OpenAPI v2 documents, where the `type` field cannot have an array value, the `type` field is dropped.

When the `System.Text.Json.JsonSerializerOptions.NumberHandling` property is set to `JsonNumberHandling.Strict`, the numeric types are mapped as follows:

| C# Type        | OpenAPI `type` | OpenAPI `format` |
| -------------- | -------------- | ---------------- |
| int            | integer        | int32            |
| long           | integer        | int64            |
| short          | integer        | int16            |
| byte           | integer        | uint8            |
| float          | number         | float            |
| double         | number         | double           |
| decimal        | number         | double           |

#### String types

The following table shows how C# types map to `string` type properties in the generated OpenAPI document.

| C# Type        | OpenAPI `type` | OpenAPI `format` | Other assertions               |
| -------------- | -------------- | ---------------- | ------------------------------ |
| string         | string         |                  | |
| char           | string         | char             | minLength: 1, maxLength: 1 |
| byte[]         | string         | byte             | |
| DateTimeOffset | string         | date-time        | |
| DateOnly       | string         | date             | |
| TimeOnly       | string         | time             | |
| Uri            | string         | uri              | |
| Guid           | string         | uuid             | |

#### Other types

Other C# types are represented in the generated OpenAPI document as shown in the following table.

| C# Type        | OpenAPI `type` | OpenAPI `format` |
| -------------- | -------------- | ---------------- |
| bool           | boolean        |                  |
| object         | _omitted_      |                  |
| dynamic        | _omitted_      |                  |

### Use attributes to add metadata

ASP.NET uses metadata from attributes on class or record properties to set metadata on the corresponding properties of the generated schema.

The following table summarizes attributes from the `System.ComponentModel` namespace that provide metadata for the generated schema.

| Attribute                    | Description |
| ---------------------------- | ----------- |
| `[Description]` | Sets the `description` of a property in the schema. |
| `[Required]` | Marks a property as `required` in the schema. |
| `[DefaultValue]` | Sets the `default` value of a property in the schema. |
| `[Range]` | Sets the `minimum` and `maximum` value of an integer or number. |
| `[MinLength]` | Sets the `minLength` of a string or `minItems` of an array. |
| `[MaxLength]` | Sets the `maxLength` of a string or `maxItems` of an array. |
| `[RegularExpression]` | Sets the `pattern` of a string. |

Note that in controller-based apps, these attributes add filters to the operation to validate that any incoming data satisfies the constraints. In Minimal APIs, these attributes set the metadata in the generated schema but validation must be performed explicitly via an endpoint filter, in the route handler's logic, or via a third-party package.

Attributes can also be placed on parameters in the parameter list of a record definition but must include the `property` modifier. For example:

```csharp
public record Todo(
    [property: Required]
    [property: Description("The unique identifier for the todo")]
    int Id,
    [property: Description("The title of the todo")]
    [property: MaxLength(120)]
    string Title,
    [property: Description("Whether the todo has been completed")]
    bool Completed
) {}
```

### Other sources of metadata for generated schemas

#### required

In a class, struct, or record, properties with the `[Required]` attribute or `required` modifier are always `required` in the corresponding schema.

Other properties may also be required based on the constructors (implicit and explicit) for the class, struct, or record.

* For a class or record class with a single public constructor, any property with the same type and name (case-insensitive match) as a parameter to the constructor is required in the corresponding schema.
* For a class or record class with multiple public constructors, no other properties are required.
* For a struct or record struct, no other properties are required since C# always defines an implicit parameterless constructor for a struct.

#### enum

Enum types in C# are integer-based, but can be represented as strings in JSON with a  `[JsonConverter]` and a `System.Text.Json.Serialization.JsonStringEnumConverter`. When an enum type is represented as a string in JSON, the generated schema will have an `enum` property with the string values of the enum.

The following example demonstrates how to use a `JsonStringEnumConverter` to represent an enum as a string in JSON:

```csharp
[JsonConverter(typeof(JsonStringEnumConverter<DayOfTheWeekAsString>))]
public enum DayOfTheWeekAsString
{
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
}
```

A special case is when an enum type has the `[Flags]` attribute, which indicates that the enum can be treated as a bit field; that is, a set of flags. A flags `enum` with a `[JsonConverterAttribute]` is defined as `type: string` in the generated schema with no `enum` property. No `enum` property is generated because the value could be any combination of the enum values. For example, the following `enum` could have values such as `"Pepperoni, Sausage"` or `"Sausage, Mushrooms, Anchovies"`:

```csharp
[Flags, JsonConverter(typeof(JsonStringEnumConverter<PizzaToppings>))]
public enum PizzaToppings { 
    Pepperoni = 1,
    Sausage = 2,
    Mushrooms = 4,
    Anchovies = 8
}
```

An enum type without a  `[JsonConverter]` will be defined as `type: integer` in the generated schema.

**Note:** The `[AllowedValues]` attribute does not set the `enum` values of a property.

A `System.Text.Json.Serialization.JsonStringEnumConverter` naming policy applies only to values that are serialized as JSON. Enum parameters bound from the query string, route, headers, or a form are parsed with `System.Enum.TryParse*`, which does not apply JSON naming policies. The generated schema reflects that difference: the `enum` values and the `default` value of a non-body parameter schema use the original C# member names, even when a naming policy is configured.

Consider the following kebab-case naming policy configured globally:

```csharp
builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter(JsonNamingPolicy.KebabCaseLower));
});

app.MapGet("/orders", (OrderStatus status) => TypedResults.Ok(status));
```

The response body schema describes `OrderStatus.PendingReview` as `pending-review`, while the `status` query parameter schema describes the accepted value as `PendingReview`. Both are correct: they describe what the endpoint returns and what it accepts, respectively.

Set JSON options globally shows how to set the `JsonStringEnumConverter` globally.

#### nullable

Properties defined as a nullable value or reference type appear in the generated schema with a `type` keyword whose value is an array that includes `null` as one of the types. This is consistent with the default behavior of the `System.Text.Json` deserializer, which accepts `null` as a valid value for a nullable property.

For example, a C# property defined as `string?` is represented in the generated schema as:

```json
  "nullableString": {
    "description": "A property defined as string?",
    "type": [
      "null",
      "string"
    ]
  },
```

If the app is configured to produce OpenAPI v3.0 or OpenAPI v2 documents, nullable value or reference types have `nullable: true` in the generated schema because these OpenAPI versions do not allow the `type` field to be an array.

#### additionalProperties

Schemas are generated without an `additionalProperties` assertion by default, which implies the default of `true`. This is consistent with the default behavior of the `System.Text.Json` deserializer, which silently ignores additional properties in a JSON object.

If the additional properties of a schema should only have values of a specific type, define the property or class as a `Dictionary<string, type>`. The key type for the dictionary must be `string`. This generates a schema with `additionalProperties` specifying the schema for "type" as the required value types.

#### Polymorphic types

Use the `[JsonPolymorphic]` and `[JsonDerivedType]` attributes on a parent class to specify the discriminator field and subtypes for a polymorphic type.

The `[JsonDerivedType]` adds the discriminator field to the schema for each subclass, with an enum specifying the specific discriminator value for the subclass. This attribute also modifies the constructor of each derived class to set the discriminator value.

An abstract class with a `[JsonPolymorphic]` attribute has a `discriminator` field in the schema, but a concrete class with a `[JsonPolymorphic]` attribute doesn't have a `discriminator` field. OpenAPI requires that the discriminator property be a required property in the schema, but since the discriminator property isn't defined in the concrete base class, the schema cannot include a `discriminator` field.

### Add metadata with a schema transformer

A schema transformer can be used to override any default metadata or add additional metadata, such as `example` values, to the generated schema. See Use schema transformers for more information.

## Mark APIs as deprecated

Apply `System.ObsoleteAttribute` to an endpoint, a type, or a property, and OpenAPI generation sets `deprecated: true` on the corresponding operation, component schema, or schema property:

```csharp
app.MapGet("/catalog/{id}", (int id) => new CatalogItem(id, $"Product {id}", $"SKU-{id:D4}"));

#pragma warning disable CS0618 // This example intentionally declares and maps obsolete APIs.
app.MapGet("/catalog/legacy/{id}", GetLegacyCatalogItem);

[Obsolete("Use /catalog/{id}.")]
static LegacyCatalogItem GetLegacyCatalogItem(int id) =>
    new(id, $"Product {id}", $"SKU-{id:D4}");

public sealed record CatalogItem(int Id, string Name, string StockKeepingUnit);

[Obsolete("Use CatalogItem.")]
public sealed record LegacyCatalogItem(
    int Id,
    string Name,
    [property: Obsolete("Use StockKeepingUnit.")] string Sku);
#pragma warning restore CS0618
```

The generated document marks the operation, its response schema, and the `Sku` property:

```json
{
  "paths": {
    "/catalog/legacy/{id}": {
      "get": {
        "deprecated": true
      }
    }
  },
  "components": {
    "schemas": {
      "LegacyCatalogItem": {
        "deprecated": true,
        "properties": {
          "sku": {
            "deprecated": true
          }
        }
      }
    }
  }
}
```

A deprecated property is marked even when its schema is emitted as a component and referenced with `$ref`.

Because the marker is derived from `[Obsolete]`, an app that already uses the attribute sees `deprecated: true` appear in its generated document.

To control the value for a specific API rather than deriving it, use a transformer: an `Microsoft.AspNetCore.OpenApi.IOpenApiOperationTransformer` can set or clear `operation.Deprecated`, and an `Microsoft.AspNetCore.OpenApi.IOpenApiSchemaTransformer` can do the same for a schema. For more information, see Use operation transformers and Use schema transformers.
