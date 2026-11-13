---
title: "How to use source generation in System.Text.Json (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/source-generation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use source generation in System.Text.Json (part 3 of 3)

## Specify options

In .NET 8 and later versions, most options that you can set using `System.Text.Json.JsonSerializerOptions` can also be set using the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute` attribute. The advantage to setting options via the attribute is that the configuration is specified at compile time, which ensures that the generated `MyContext.Default` property is preconfigured with all the relevant options set.

The following code shows how to set options using the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute` attribute.

```csharp
[JsonSourceGenerationOptions(
    WriteIndented = true,
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    GenerationMode = JsonSourceGenerationMode.Serialization)]
[JsonSerializable(typeof(WeatherForecast))]
internal partial class SerializationModeOptionsContext : JsonSerializerContext
{
}
```
When using `JsonSourceGenerationOptionsAttribute` to specify serialization options, call one of the following serialization methods:

- A `JsonSerializer.Serialize` method that takes a `TypeInfo<TValue>`. Pass it the `Default.<TypeName>` property of your context class:

```csharp
jsonString = JsonSerializer.Serialize(
    weatherForecast, SerializationModeOptionsContext.Default.WeatherForecast);
```
- A `JsonSerializer.Serialize` method that takes a context. Pass it the `Default` static property of your context class.

```csharp
jsonString = JsonSerializer.Serialize(
    weatherForecast, typeof(WeatherForecast), SerializationModeOptionsContext.Default);
```
If you call a method that lets you pass in your own instance of `Utf8JsonWriter`, the writer's `System.Text.Json.JsonWriterOptions.Indented` setting is honored instead of the `JsonSourceGenerationOptionsAttribute.WriteIndented` option.

If you create and use a context instance by calling the constructor that takes a `JsonSerializerOptions` instance, the supplied instance will be used instead of the options specified by `JsonSourceGenerationOptionsAttribute`.

The following code shows the preceding examples in a complete program:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SerializeOnlyWithOptions
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    [JsonSourceGenerationOptions(
        WriteIndented = true,
        PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
        GenerationMode = JsonSourceGenerationMode.Serialization)]
    [JsonSerializable(typeof(WeatherForecast))]
    internal partial class SerializationModeOptionsContext : JsonSerializerContext
    {
    }
    public class Program
    {
        public static void Main()
        {
            string jsonString;
            WeatherForecast weatherForecast = new()
                { Date = DateTime.Parse("2019-08-01"),
                  TemperatureCelsius = 25,
                  Summary = "Hot" };

            // Serialize using TypeInfo<TValue> provided by the context
            // and options specified by [JsonSourceGenerationOptions].
            jsonString = JsonSerializer.Serialize(
                weatherForecast, SerializationModeOptionsContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{
            //  "date": "2019-08-01T00:00:00",
            //  "temperatureCelsius": 0,
            //  "summary": "Hot"
            //}

            // Serialize using Default context
            // and options specified by [JsonSourceGenerationOptions].
            jsonString = JsonSerializer.Serialize(
                weatherForecast, typeof(WeatherForecast), SerializationModeOptionsContext.Default);
            Console.WriteLine(jsonString);
            // output:
            //{
            //  "date": "2019-08-01T00:00:00",
            //  "temperatureCelsius": 0,
            //  "summary": "Hot"
            //}
        }
    }
}
```
## Combine source generators

You can combine contracts from multiple source-generated contexts inside a single `System.Text.Json.JsonSerializerOptions` instance. Use the `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` property to chain multiple contexts that have been combined by using the `System.Text.Json.Serialization.Metadata.JsonTypeInfoResolver.Combine(System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver[])` method.

```csharp
var options = new JsonSerializerOptions
{
    TypeInfoResolver = JsonTypeInfoResolver.Combine(ContextA.Default, ContextB.Default, ContextC.Default),
};
```

Starting in .NET 8, if you later want to prepend or append another context, you can do so using the `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain` property. The ordering of the chain is significant: `System.Text.Json.JsonSerializerOptions` queries each of the resolvers in their specified order and returns the first result that's non-null.

```csharp
options.TypeInfoResolverChain.Add(ContextD.Default); // Append to the end of the list.
options.TypeInfoResolverChain.Insert(0, ContextE.Default); // Insert at the beginning of the list.
```

Any change made to the `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain` property is reflected by `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` and vice versa.

## Serialize enum fields as strings

By default, enums are serialized as numbers. To serialize a specific enum's fields as strings when using source generation, annotate it with the `System.Text.Json.Serialization.JsonStringEnumConverter`1` converter. Or to set a blanket policy for all enumerations, use the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute` attribute.

### `JsonStringEnumConverter<T>` converter

To serialize enum names as strings using source generation, use the `System.Text.Json.Serialization.JsonStringEnumConverter`1` converter. (The non-generic `System.Text.Json.Serialization.JsonStringEnumConverter` type is not supported by the Native AOT runtime.)

Annotate the enumeration type with the `System.Text.Json.Serialization.JsonStringEnumConverter`1` converter using the `System.Text.Json.Serialization.JsonConverterAttribute` attribute:

```csharp
public class WeatherForecastWithPrecipEnum
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public Precipitation? Precipitation { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter<Precipitation>))]
public enum Precipitation
{
    Drizzle, Rain, Sleet, Hail, Snow
}
```
Create a `System.Text.Json.Serialization.JsonSerializerContext` class and annotate it with the `System.Text.Json.Serialization.JsonSerializableAttribute` attribute:

```csharp
[JsonSerializable(typeof(WeatherForecastWithPrecipEnum))]
public partial class Context1 : JsonSerializerContext { }
```
The following code serializes the enum names instead of the numeric values:

```csharp
var weatherForecast = new WeatherForecastWithPrecipEnum
{
    Date = DateTime.Parse("2019-08-01"),
    TemperatureCelsius = 25,
    Precipitation = Precipitation.Sleet
};

var options = new JsonSerializerOptions
{
    WriteIndented = true,
    TypeInfoResolver = Context1.Default,
};
string? jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
The resulting JSON looks like the following example:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Precipitation": "Sleet"
}
```

### Blanket policy

Instead of using the `System.Text.Json.Serialization.JsonStringEnumConverter`1` type, you can apply a blanket policy to serialize enums as strings by using the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute`. Create a `System.Text.Json.Serialization.JsonSerializerContext` class and annotate it with the `System.Text.Json.Serialization.JsonSerializableAttribute` *and `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute`* attributes:

```csharp
[JsonSourceGenerationOptions(UseStringEnumConverter = true)]
[JsonSerializable(typeof(WeatherForecast2WithPrecipEnum))]
public partial class Context2 : JsonSerializerContext { }
```
Notice that the enum doesn't have the `System.Text.Json.Serialization.JsonConverterAttribute`:

```csharp
public class WeatherForecast2WithPrecipEnum
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public Precipitation2? Precipitation { get; set; }
}

public enum Precipitation2
{
    Drizzle, Rain, Sleet, Hail, Snow
}
```
### Custom enum member names

Starting in .NET 9, you can customize enum member names using the JsonStringEnumMemberName attribute. For more information, see Custom enum member names.

## See also

- JSON serialization and deserialization in .NET - overview
- How to use the library
