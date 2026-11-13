---
title: "How to use source generation in System.Text.Json (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/source-generation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use source generation in System.Text.Json

This article shows you how to use source-generation-backed System.Text.Json serialization in your apps.

For information about the different source-generation modes, see Source-generation modes.

## Use source-generation defaults

To use source generation with all defaults (both modes, default options):

1. Create a partial class that derives from `System.Text.Json.Serialization.JsonSerializerContext`.
1. Specify the type to serialize or deserialize by applying `System.Text.Json.Serialization.JsonSerializableAttribute` to the context class.
1. Call a `System.Text.Json.JsonSerializer` method that either:

   - Takes a `System.Text.Json.Serialization.Metadata.JsonTypeInfo`1` instance, or
   - Takes a `System.Text.Json.Serialization.JsonSerializerContext` instance, or
   - Takes a `System.Text.Json.JsonSerializerOptions` instance and you've set its `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` property to the `Default` property of the context type.

By default, both source generation modes (*metadata-based* and *serialization optimization*) are used if you don't specify one. For information about how to specify the mode to use, see Specify source generation mode later in this article.

Here's the type that's used in the following examples:

```csharp
public class WeatherForecast
{
    public DateTime Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}
```
Here's the context class configured to generate source for the preceding `WeatherForecast` class:

```csharp
[JsonSourceGenerationOptions(WriteIndented = true)]
[JsonSerializable(typeof(WeatherForecast))]
internal partial class SourceGenerationContext : JsonSerializerContext { }
```
The types of `WeatherForecast` members don't need to be explicitly specified with `[JsonSerializable]` attributes. Members declared as `object` are an exception to this rule. The runtime type for a member declared as `object` needs to be specified. For example, suppose you have the following class:

```csharp
public class WeatherForecast
{
    public object? Data { get; set; }
    public List<object>? DataList { get; set; }
}
```
And you know that at runtime it might have `boolean` and `int` objects:

```csharp
WeatherForecast wf = new() { Data = true, DataList = [true, 1] };
```
Then `boolean` and `int` have to be declared as `[JsonSerializable]`:

```csharp
[JsonSerializable(typeof(WeatherForecast))]
[JsonSerializable(typeof(bool))]
[JsonSerializable(typeof(int))]
public partial class WeatherForecastContext : JsonSerializerContext
{
}
```
To specify source generation for a collection, use `[JsonSerializable]` with the collection type. For example: `[JsonSerializable(typeof(List<WeatherForecast>))]`.

### `JsonSerializer` methods that use source generation

In the following examples, the static `Default` property of the context type provides an instance of the context type with default options. The context instance provides a `WeatherForecast` property that returns a `JsonTypeInfo<WeatherForecast>` instance. You can specify a different name for this property by using the `System.Text.Json.Serialization.JsonSerializableAttribute.TypeInfoPropertyName` property of the `[JsonSerializable]` attribute.

#### Serialization examples

Using `System.Text.Json.Serialization.Metadata.JsonTypeInfo`1`:

```csharp
jsonString = JsonSerializer.Serialize(
    weatherForecast!, SourceGenerationContext.Default.WeatherForecast);
```
Using `System.Text.Json.Serialization.JsonSerializerContext`:

```csharp
jsonString = JsonSerializer.Serialize(
    weatherForecast, typeof(WeatherForecast), SourceGenerationContext.Default);
```
Using `System.Text.Json.JsonSerializerOptions`:

```csharp
sourceGenOptions = new JsonSerializerOptions
{
    TypeInfoResolver = SourceGenerationContext.Default
};

jsonString = JsonSerializer.Serialize<WeatherForecast>(weatherForecast, sourceGenOptions);
```
#### Deserialization examples

Using `System.Text.Json.Serialization.Metadata.JsonTypeInfo`1`:

```csharp
weatherForecast = JsonSerializer.Deserialize(
    jsonString, SourceGenerationContext.Default.WeatherForecast);
```
Using `System.Text.Json.Serialization.JsonSerializerContext`:

```csharp
weatherForecast = JsonSerializer.Deserialize(
    jsonString, typeof(WeatherForecast), SourceGenerationContext.Default)
    as WeatherForecast;
```
Using `System.Text.Json.JsonSerializerOptions`:

```csharp
var sourceGenOptions = new JsonSerializerOptions
{
    TypeInfoResolver = SourceGenerationContext.Default
};
weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString, sourceGenOptions);
```
### Complete program example

Here are the preceding examples in a complete program:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace BothModesNoOptions
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    [JsonSourceGenerationOptions(WriteIndented = true)]
    [JsonSerializable(typeof(WeatherForecast))]
    internal partial class SourceGenerationContext : JsonSerializerContext { }

    public class Program
    {
        public static void Main()
        {
            string jsonString = """
                {
                    "Date": "2019-08-01T00:00:00",
                    "TemperatureCelsius": 25,
                    "Summary": "Hot"
                }
                """;
            WeatherForecast? weatherForecast;

            weatherForecast = JsonSerializer.Deserialize(
                jsonString, SourceGenerationContext.Default.WeatherForecast);
            Console.WriteLine($"Date={weatherForecast?.Date}");
            // output:
            //Date=8/1/2019 12:00:00 AM

            weatherForecast = JsonSerializer.Deserialize(
                jsonString, typeof(WeatherForecast), SourceGenerationContext.Default)
                as WeatherForecast;
            Console.WriteLine($"Date={weatherForecast?.Date}");
            // output:
            //Date=8/1/2019 12:00:00 AM

            var sourceGenOptions = new JsonSerializerOptions
            {
                TypeInfoResolver = SourceGenerationContext.Default
            };
            weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString, sourceGenOptions);
            Console.WriteLine($"Date={weatherForecast?.Date}");
            // output:
            //Date=8/1/2019 12:00:00 AM

            jsonString = JsonSerializer.Serialize(
                weatherForecast!, SourceGenerationContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}

            jsonString = JsonSerializer.Serialize(
                weatherForecast, typeof(WeatherForecast), SourceGenerationContext.Default);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}

            sourceGenOptions = new JsonSerializerOptions
            {
                TypeInfoResolver = SourceGenerationContext.Default
            };

            jsonString = JsonSerializer.Serialize<WeatherForecast>(weatherForecast, sourceGenOptions);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}
        }
    }
}
```
