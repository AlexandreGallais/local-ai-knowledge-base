---
title: "Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/migrate-from-newtonsoft.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 2 of 4)

## Scenarios using JsonSerializer

Some of the following scenarios aren't supported by built-in functionality, but workarounds are possible. The workarounds are custom converters, which may not provide complete parity with `Newtonsoft.Json` functionality. For some of these, sample code is provided as examples. If you rely on these `Newtonsoft.Json` features, migration will require modifications to your .NET object models or other code changes.

For some of the following scenarios, workarounds are not practical or possible. If you rely on these `Newtonsoft.Json` features, migration will not be possible without significant changes.

### Allow or write numbers in quotes

`Newtonsoft.Json` can serialize or deserialize numbers represented by JSON strings (surrounded by quotes). For example, it can accept: `{"DegreesCelsius":"23"}` instead of `{"DegreesCelsius":23}`. To enable that behavior in `System.Text.Json`, set `System.Text.Json.JsonSerializerOptions.NumberHandling*` to `System.Text.Json.Serialization.JsonNumberHandling.WriteAsString` or `System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString`, or use the [JsonNumberHandling] attribute.

If you're using `System.Text.Json` indirectly by using ASP.NET Core, you don't need to do anything to get behavior like `Newtonsoft.Json`. ASP.NET Core specifies web defaults when it uses `System.Text.Json`, and web defaults allow quoted numbers.

For more information, see Allow or write numbers in quotes.

### Specify constructor to use when deserializing

The `Newtonsoft.Json` `[JsonConstructor]` attribute lets you specify which constructor to call when deserializing to a POCO.

`System.Text.Json` also has a [JsonConstructor] attribute. For more information, see Immutable types and Records.

### Conditionally ignore a property

`Newtonsoft.Json` has several ways to conditionally ignore a property on serialization or deserialization:

* `DefaultContractResolver` lets you select properties to include or ignore, based on arbitrary criteria.
* The `NullValueHandling` and `DefaultValueHandling` settings on `JsonSerializerSettings` let you specify that all null-value or default-value properties should be ignored.
* The `NullValueHandling` and `DefaultValueHandling` settings on the `[JsonProperty]` attribute let you specify individual properties that should be ignored when set to null or the default value.

`System.Text.Json` provides the following ways to ignore properties or fields while serializing:

* The [JsonIgnore] attribute on a property causes the property to be omitted from the JSON during serialization.
* The IgnoreReadOnlyProperties global option lets you ignore all read-only properties.
* If you're including fields, the `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*` global option lets you ignore all read-only fields.
* The `DefaultIgnoreCondition` global option lets you ignore all value type properties that have default values, or ignore all reference type properties that have null values.

In addition, in .NET 7 and later versions, you can customize the JSON contract to ignore properties based on arbitrary criteria. For more information, see Custom contracts.

### Public and non-public fields

`Newtonsoft.Json` can serialize and deserialize fields as well as properties.

In `System.Text.Json`, use the `System.Text.Json.JsonSerializerOptions.IncludeFields` global setting or the [JsonInclude] attribute to include public fields when serializing or deserializing. For an example, see Include fields.

### Preserve object references and handle loops

By default, `Newtonsoft.Json` serializes by value. For example, if an object contains two properties that contain a reference to the same `Person` object, the values of that `Person` object's properties are duplicated in the JSON.

`Newtonsoft.Json` has a `PreserveReferencesHandling` setting on `JsonSerializerSettings` that lets you serialize by reference:

* An identifier metadata is added to the JSON created for the first `Person` object.
* The JSON that is created for the second `Person` object contains a reference to that identifier instead of property values.

`Newtonsoft.Json` also has a `ReferenceLoopHandling` setting that lets you ignore circular references rather than throw an exception.

To preserve references and handle circular references in `System.Text.Json`, set `System.Text.Json.JsonSerializerOptions.ReferenceHandler*` to `System.Text.Json.Serialization.ReferenceHandler.Preserve*`. The `ReferenceHandler.Preserve` setting is equivalent to `PreserveReferencesHandling` = `PreserveReferencesHandling.All` in `Newtonsoft.Json`.

The `ReferenceHandler.IgnoreCycles` option has behavior similar to Newtonsoft.Json `ReferenceLoopHandling.Ignore`. One difference is that the System.Text.Json implementation replaces reference loops with the `null` JSON token <example-value> of ignoring the object reference. For more information, see Ignore circular references.

Like the Newtonsoft.Json ReferenceResolver, the `System.Text.Json.Serialization.ReferenceResolver` class defines the behavior of preserving references on serialization and deserialization. Create a derived class to specify custom behavior. For an example, see GuidReferenceResolver.

Some related `Newtonsoft.Json` features aren't supported:

* JsonPropertyAttribute.IsReference
* JsonPropertyAttribute.ReferenceLoopHandling

For more information, see Preserve references and handle circular references.

### Dictionary with non-string key

Both `Newtonsoft.Json` and `System.Text.Json` support collections of type `Dictionary<TKey, TValue>`. For information about supported key types, see Supported key types.

> **Caution:**
> Deserializing to a `Dictionary<TKey, TValue>` where `TKey` is typed as anything other than `string` could introduce a security vulnerability in the consuming application. For more information, see dotnet/runtime#4761.

### Types without built-in support

`System.Text.Json` doesn't provide built-in support for the following types:

* `System.Data.DataTable` and related types (for more information, see Supported types)
* `System.Dynamic.ExpandoObject`
* `System.TimeZoneInfo`
* `System.Numerics.BigInteger`
* `System.DBNull`
* `System.Type`
* `System.ValueTuple` and its associated generic types

Custom converters can be implemented for types that don't have built-in support.

### Polymorphic serialization

`Newtonsoft.Json` automatically does polymorphic serialization. Starting in .NET 7, `System.Text.Json` supports polymorphic serialization through the `System.Text.Json.Serialization.JsonDerivedTypeAttribute` attribute. For more information, see Serialize properties of derived classes.

### Polymorphic deserialization

`Newtonsoft.Json` has a `TypeNameHandling` setting that adds type-name metadata to the JSON while serializing. It uses the metadata while deserializing to do polymorphic deserialization. Starting in .NET 7, `System.Text.Json` relies on type discriminator information to perform polymorphic deserialization. This metadata is emitted in the JSON and then used during deserialization to determine whether to deserialize to the base type or a derived type. For more information, see Serialize properties of derived classes.

To support polymorphic deserialization in older .NET versions, create a converter like the example in How to write custom converters.

### Deserialize string enum values

By default, System.Text.Json doesn't support deserializing string enum values, whereas `Newtonsoft.Json` does. For example, the following code throws a `System.Text.Json.JsonException`:

```csharp
string json = "{ \"Text\": \"Hello\", \"Enum\": \"Two\" }";
var _ = JsonSerializer.Deserialize<MyObj>(json); // Throws exception.

class MyObj
{
    public string Text { get; set; } = "";
    public MyEnum Enum { get; set; }
}

enum MyEnum
{
    One,
    Two,
    Three
}
```

However, you can enable deserialization of string enum values by using the `System.Text.Json.Serialization.JsonStringEnumConverter` converter. For more information, see Enums as strings.

### Deserialization of object properties

When `Newtonsoft.Json` deserializes to `System.Object`, it:

* Infers the type of primitive values in the JSON payload (other than `null`) and returns the stored `string`, `long`, `double`, `boolean`, or `DateTime` as a boxed object. *Primitive values* are single JSON values such as a JSON number, string, `true`, `false`, or `null`.
* Returns a `JObject` or `JArray` for complex values in the JSON payload. *Complex values* are collections of JSON key-value pairs within braces (`{}`) or lists of values within brackets (`[]`). The properties and values within the braces or brackets can have additional properties or values.
* Returns a null reference when the payload has the `null` JSON literal.

`System.Text.Json` stores a boxed `JsonElement` for both primitive and complex values whenever deserializing to `System.Object`, for example:

* An `object` property.
* An `object` dictionary value.
* An `object` array value.
* A root `object`.

However, `System.Text.Json` treats `null` the same as `Newtonsoft.Json` and returns a null reference when the payload has the `null` JSON literal in it.

To implement type inference for `object` properties, create a converter like the example in How to write custom converters.

### Deserialize null to non-nullable type

`Newtonsoft.Json` doesn't throw an exception in the following scenario:

* `NullValueHandling` is set to `Ignore`, and
* During deserialization, the JSON contains a null value for a non-nullable value type.

In the same scenario, `System.Text.Json` does throw an exception. (The corresponding null-handling setting in `System.Text.Json` is `System.Text.Json.JsonSerializerOptions.IgnoreNullValues` = `true`.)

If you own the target type, the best workaround is to make the property in question nullable (for example, change `int` to `int?`).

Another workaround is to make a converter for the type, such as the following example that handles null values for `DateTimeOffset` types:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    public class DateTimeOffsetNullHandlingConverter : JsonConverter<DateTimeOffset>
    {
        public override DateTimeOffset Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options) =>
            reader.TokenType == JsonTokenType.Null
                ? default
                : reader.GetDateTimeOffset();

        public override void Write(
            Utf8JsonWriter writer,
            DateTimeOffset dateTimeValue,
            JsonSerializerOptions options) =>
            writer.WriteStringValue(dateTimeValue);
    }
}
```
Register this custom converter by using an attribute on the property or by adding the converter to the `System.Text.Json.JsonSerializerOptions.Converters` collection.

**Note:** The preceding converter **handles null values differently** than `Newtonsoft.Json` does for POCOs that specify default values. For example, suppose the following code represents your target object:

```csharp
public class WeatherForecastWithDefault
{
    public WeatherForecastWithDefault()
    {
        Date = DateTimeOffset.Parse("2001-01-01");
        Summary = "No summary";
    }
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string Summary { get; set; }
}
```
And suppose the following JSON is deserialized by using the preceding converter:

```json
{
  "Date": null,
  "TemperatureCelsius": 25,
  "Summary": null
}
```

After deserialization, the `Date` property has 1/1/0001 (`default(DateTimeOffset)`), that is, the value set in the constructor is overwritten. Given the same POCO and JSON, `Newtonsoft.Json` deserialization would leave 1/1/2001 in the `Date` property.

### Deserialize to immutable classes and structs

`Newtonsoft.Json` can deserialize to immutable classes and structs because it can use constructors that have parameters.

In `System.Text.Json`, use the [JsonConstructor] attribute to specify use of a parameterized constructor. Records in C# 9 are also immutable and are supported as deserialization targets. For more information, see Immutable types and Records.

### Required properties

In `Newtonsoft.Json`, you specify that a property is required by setting `Required` on the `[JsonProperty]` attribute. `Newtonsoft.Json` throws an exception if no value is received in the JSON for a property marked as required.

Starting in .NET 7, you can use the C# `required` modifier or the `System.Text.Json.Serialization.JsonRequiredAttribute` attribute on a required property. System.Text.Json throws an exception if the JSON payload doesn't contain a value for the marked property. For more information, see Required properties.
