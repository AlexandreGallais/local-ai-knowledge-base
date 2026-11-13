---
title: "Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/migrate-from-newtonsoft.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 3 of 4)

### Specify date format

`Newtonsoft.Json` provides several ways to control how properties of `DateTime` and `DateTimeOffset` types are serialized and deserialized:

* The `DateTimeZoneHandling` setting can be used to serialize all `DateTime` values as UTC dates.
* The `DateFormatString` setting and `DateTime` converters can be used to customize the format of date strings.

`System.Text.Json` supports ISO 8601-1:2019, including the RFC 3339 profile. This format is widely adopted, unambiguous, and makes round trips precisely. To use any other format, create a custom converter. For example, the following converters serialize and deserialize JSON that uses Unix epoch format with or without a time zone offset (values such as `/Date(1590863400000-0700)/` or `/Date(1590863400000)/`):

```csharp
sealed class UnixEpochDateTimeOffsetConverter : System.Text.Json.Serialization.JsonConverter<DateTimeOffset>
{
    static readonly DateTimeOffset s_epoch = new(1970, 1, 1, 0, 0, 0, TimeSpan.Zero);
    static readonly Regex s_regex = new(
        "^/Date\\(([+-]*\\d+)([+-])(\\d{2})(\\d{2})\\)/$",
        RegexOptions.CultureInvariant);

    public override DateTimeOffset Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        string formatted = reader.GetString()!;
        Match match = s_regex.Match(formatted);

        if (
                !match.Success
                || !long.TryParse(match.Groups[1].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out long unixTime)
                || !int.TryParse(match.Groups[3].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out int hours)
                || !int.TryParse(match.Groups[4].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out int minutes))
        {
            throw new System.Text.Json.JsonException();
        }

        int sign = match.Groups[2].Value[0] == '+' ? 1 : -1;
        TimeSpan utcOffset = new(hours * sign, minutes * sign, 0);

        return s_epoch.AddMilliseconds(unixTime).ToOffset(utcOffset);
    }

    public override void Write(
        Utf8JsonWriter writer,
        DateTimeOffset value,
        JsonSerializerOptions options)
    {
        long unixTime = value.ToUnixTimeMilliseconds();

        TimeSpan utcOffset = value.Offset;

        string formatted = string.Create(
            CultureInfo.InvariantCulture,
            $"/Date({unixTime}{(utcOffset >= TimeSpan.Zero ? "+" : "-")}{utcOffset:hhmm})/");

        writer.WriteStringValue(formatted);
    }
}
```
```csharp
sealed class UnixEpochDateTimeConverter : System.Text.Json.Serialization.JsonConverter<DateTime>
{
    static readonly DateTime s_epoch = new(1970, 1, 1, 0, 0, 0);
    static readonly Regex s_regex = new(
        "^/Date\\(([+-]*\\d+)\\)/$",
        RegexOptions.CultureInvariant);

    public override DateTime Read(
        ref Utf8JsonReader reader,
        Type typeToConvert,
        JsonSerializerOptions options)
    {
        string formatted = reader.GetString()!;
        Match match = s_regex.Match(formatted);

        if (
            !match.Success
            || !long.TryParse(match.Groups[1].Value, NumberStyles.Integer, CultureInfo.InvariantCulture, out long unixTime))
        {
            throw new System.Text.Json.JsonException();
        }

        return s_epoch.AddMilliseconds(unixTime);
    }

    public override void Write(
        Utf8JsonWriter writer,
        DateTime value,
        JsonSerializerOptions options)
    {
        long unixTime = (value - s_epoch).Ticks / TimeSpan.TicksPerMillisecond;

        string formatted = string.Create(CultureInfo.InvariantCulture, $"/Date({unixTime})/");
        writer.WriteStringValue(formatted);
    }
}
```
For more information, see DateTime and DateTimeOffset support in System.Text.Json.

### Callbacks

`Newtonsoft.Json` lets you execute custom code at several points in the serialization or deserialization process:

* OnDeserializing (when beginning to deserialize an object)
* OnDeserialized (when finished deserializing an object)
* OnSerializing (when beginning to serialize an object)
* OnSerialized (when finished serializing an object)

System.Text.Json exposes the same notifications during serialization and deserialization. To use them, implement one or more of the following interfaces from the `System.Text.Json.Serialization` namespace:

* `System.Text.Json.Serialization.IJsonOnDeserializing`
* `System.Text.Json.Serialization.IJsonOnDeserialized`
* `System.Text.Json.Serialization.IJsonOnSerializing`
* `System.Text.Json.Serialization.IJsonOnSerialized`

Here's an example that checks for a null property and writes messages at start and end of serialization and deserialization:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace Callbacks
{
    public class WeatherForecast : 
        IJsonOnDeserializing, IJsonOnDeserialized, 
        IJsonOnSerializing, IJsonOnSerialized
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }

        void IJsonOnDeserializing.OnDeserializing() => Console.WriteLine("\nBegin deserializing");
        void IJsonOnDeserialized.OnDeserialized()
        {
            Validate();
            Console.WriteLine("Finished deserializing");
        }
        void IJsonOnSerializing.OnSerializing()
        {
            Console.WriteLine("Begin serializing");
            Validate();
        }
        void IJsonOnSerialized.OnSerialized() => Console.WriteLine("Finished serializing");

        private void Validate()
        {
            if (Summary is null)
            {
                Console.WriteLine("The 'Summary' property is 'null'.");
            }
        }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
            };

            string jsonString = JsonSerializer.Serialize(weatherForecast);
            Console.WriteLine(jsonString);

            weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString);
            Console.WriteLine($"Date={weatherForecast?.Date}");
            Console.WriteLine($"TemperatureCelsius={weatherForecast?.TemperatureCelsius}");
            Console.WriteLine($"Summary={weatherForecast?.Summary}");
        }
    }
}
// output:
//Begin serializing
//The 'Summary' property is 'null'.
//Finished serializing
//{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":null}

//Begin deserializing
//The 'Summary' property is 'null'.
//Finished deserializing
//Date=8/1/2019 12:00:00 AM
//TemperatureCelsius = 25
//Summary=
```
The `OnDeserializing` code doesn't have access to the new POCO instance. To manipulate the new POCO instance at the start of deserialization, put that code in the POCO constructor.

### Non-public property setters and getters

`Newtonsoft.Json` can use private and internal property setters and getters via the `JsonProperty` attribute.

`System.Text.Json` supports private and internal property setters and getters via the [JsonInclude] attribute. For sample code, see Non-public property accessors.

### Populate existing objects

The `JsonConvert.PopulateObject` method in `Newtonsoft.Json` deserializes a JSON document to an existing instance of a class, instead of creating a new instance. `System.Text.Json` always creates a new instance of the target type by using the default public parameterless constructor. Custom converters can deserialize to an existing instance.

### Reuse rather than replace properties

Starting in .NET 8, System.Text.Json supports reusing initialized properties rather than replacing them. There are some differences in behavior, which you can read about in the API proposal.

For more information, see Populate initialized properties.

### Populate properties without setters

Starting in .NET 8, System.Text.Json supports populating properties, including those that don't have a setter. For more information, see Populate initialized properties.

### Snake case naming policy

System.Text.Json includes a built-in naming policy for snake case. However, there are some behavior differences with `Newtonsoft.Json` for some inputs. The following table shows some of these differences when converting input using the `System.Text.Json.JsonNamingPolicy.SnakeCaseLower` policy.

| Input           | Newtonsoft.Json result | System.Text.Json result |
|-----------------|------------------------|-------------------------|
| "AB1"           | "a_b1"                 | "ab1"                   |
| "SHA512Managed" | "sh_a512_managed"      | "sha512_managed"        |
| "abc123DEF456"  | "abc123_de_f456"       | "abc123_def456"         |
| "KEBAB-CASE"    | "keba_b-_case"         | "kebab-case"            |

### System.Runtime.Serialization attributes

`System.Runtime.Serialization` attributes such as `System.Runtime.Serialization.DataContractAttribute`, `System.Runtime.Serialization.DataMemberAttribute`, and `System.Runtime.Serialization.IgnoreDataMemberAttribute` let you define a *data contract*. A data contract is a formal agreement between a service and a client that abstractly describes the data to be exchanged. The data contract precisely defines which properties are serialized for exchange.

System.Text.Json doesn't have built-in support for these attributes. However, starting in .NET 7, you can use a custom type resolver to add support. For a sample, see ZCS.DataContractResolver.

### Octal numbers

`Newtonsoft.Json` treats numbers with a leading zero as octal numbers. `System.Text.Json` doesn't allow leading zeroes because the RFC 8259 specification doesn't allow them.

### Handle missing members

If the JSON that's being deserialized includes properties that are missing in the target type, `Newtonsoft.Json` can be configured to throw exceptions. By default, `System.Text.Json` ignores extra properties in the JSON, except when you use the [JsonExtensionData] attribute.

In .NET 8 and later versions, you can set your preference for whether to skip or disallow unmapped JSON properties using one of the following means:

* Apply the `System.Text.Json.Serialization.JsonUnmappedMemberHandlingAttribute` attribute to the type you're deserializing to.
* To set your preference globally, set the `System.Text.Json.JsonSerializerOptions.UnmappedMemberHandling` property. Or, for source generation, set the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.UnmappedMemberHandling` property and apply the attribute to your `System.Text.Json.Serialization.JsonSerializerContext` class.
* Customize the `System.Text.Json.Serialization.Metadata.JsonTypeInfo.UnmappedMemberHandling` property.

### JsonObjectAttribute

`Newtonsoft.Json` has an attribute, `JsonObjectAttribute`, that can be applied at the *type level* to control which members are serialized, how `null` values are handled, and whether all members are required. System.Text.Json has no equivalent attribute that can be applied on a type. For some behaviors, such as `null` value handling, you can configure the same behavior either on the global `System.Text.Json.JsonSerializerOptions` or individually on each property using `System.Text.Json.Serialization.JsonIgnoreAttribute`.

Consider the following example that uses `Newtonsoft.Json.JsonObjectAttribute` to specify that all `null` properties should be ignored:

```csharp
[JsonObject(ItemNullValueHandling = NullValueHandling.Ignore)]
public class Person { ... }
```

In System.Text.Json, you can set the behavior for all types and properties:

```csharp
JsonSerializerOptions options = new()
{
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
};

string json = JsonSerializer.Serialize<Person>(person, options);
```

Or you can set the behavior on each property separately:

```csharp
public class Person
{
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Name { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public int? Age { get; set; }
}
```

Next, consider the following example that uses `Newtonsoft.Json.JsonObjectAttribute` to specify that all member properties must be present in the JSON:

```csharp
[JsonObject(ItemRequired = Required.Always)]
public class Person { ... }
```

You can achieve the same behavior in System.Text.Json by adding the C# `required` modifier or the `System.Text.Json.Serialization.JsonRequiredAttribute` *to each property*. For more information, see Required properties.

```csharp
public class Person
{
    [JsonRequired]
    public string? Name { get; set; }

    public required int? Age { get; set; }
}
```

Finally, consider the following example that uses `Newtonsoft.Json.JsonObjectAttribute` to specify a title for JSON schema generation:

```csharp
[JsonObject(Title = "PersonTitle")]
public class Person { ... }
```

The `Title` property is used for JSON schema metadata and doesn't have a direct equivalent in System.Text.Json. Starting in .NET 9, you can use the `System.Text.Json.Schema.JsonSchemaExporter` to generate JSON schemas and customize the schema title using the `System.Text.Json.Schema.JsonSchemaExporterOptions.TransformSchemaNode` delegate. For an example, see Transform the generated schema.

### TraceWriter

`Newtonsoft.Json` lets you debug by using a `TraceWriter` to view logs that are generated by serialization or deserialization. `System.Text.Json` doesn't do logging.
