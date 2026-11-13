---
title: "How to use source generation in System.Text.Json (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/source-generation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use source generation in System.Text.Json (part 2 of 3)

## Specify source-generation mode

You can specify metadata-based mode or serialization-optimization mode for an entire context, which might include multiple types. Or you can specify the mode for an individual type. If you do both, the mode specification for a type wins.

- For an entire context, use the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.GenerationMode` property.
- For an individual type, use the `System.Text.Json.Serialization.JsonSerializableAttribute.GenerationMode` property.

### Serialization-optimization (fast path) mode example

- For an entire context:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SerializeOnlyNoOptions
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Serialization)]
    [JsonSerializable(typeof(WeatherForecast))]
    internal partial class SerializeOnlyContext : JsonSerializerContext
    {
    }
    
    [JsonSerializable(typeof(WeatherForecast), GenerationMode = JsonSourceGenerationMode.Serialization)]
    internal partial class SerializeOnlyWeatherForecastOnlyContext : JsonSerializerContext
    {
    }

     public class Program
    {
        public static void Main()
        {
            string jsonString;
            WeatherForecast weatherForecast = new()
                { Date = DateTime.Parse("2019-08-01"), TemperatureCelsius = 25, Summary = "Hot" };

            // Use context that selects Serialization mode only for WeatherForecast.
            jsonString = JsonSerializer.Serialize(weatherForecast,
                SerializeOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}

            // Use a context that selects Serialization mode.
            jsonString = JsonSerializer.Serialize(weatherForecast,
                SerializeOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}
        }
    }
}
```
- For an individual type:

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SerializeOnlyNoOptions
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Serialization)]
    [JsonSerializable(typeof(WeatherForecast))]
    internal partial class SerializeOnlyContext : JsonSerializerContext
    {
    }
    
    [JsonSerializable(typeof(WeatherForecast), GenerationMode = JsonSourceGenerationMode.Serialization)]
    internal partial class SerializeOnlyWeatherForecastOnlyContext : JsonSerializerContext
    {
    }

     public class Program
    {
        public static void Main()
        {
            string jsonString;
            WeatherForecast weatherForecast = new()
                { Date = DateTime.Parse("2019-08-01"), TemperatureCelsius = 25, Summary = "Hot" };

            // Use context that selects Serialization mode only for WeatherForecast.
            jsonString = JsonSerializer.Serialize(weatherForecast,
                SerializeOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}

            // Use a context that selects Serialization mode.
            jsonString = JsonSerializer.Serialize(weatherForecast,
                SerializeOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}
        }
    }
}
```
- Complete program example

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SerializeOnlyNoOptions
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Serialization)]
    [JsonSerializable(typeof(WeatherForecast))]
    internal partial class SerializeOnlyContext : JsonSerializerContext
    {
    }
    
    [JsonSerializable(typeof(WeatherForecast), GenerationMode = JsonSourceGenerationMode.Serialization)]
    internal partial class SerializeOnlyWeatherForecastOnlyContext : JsonSerializerContext
    {
    }

     public class Program
    {
        public static void Main()
        {
            string jsonString;
            WeatherForecast weatherForecast = new()
                { Date = DateTime.Parse("2019-08-01"), TemperatureCelsius = 25, Summary = "Hot" };

            // Use context that selects Serialization mode only for WeatherForecast.
            jsonString = JsonSerializer.Serialize(weatherForecast,
                SerializeOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}

            // Use a context that selects Serialization mode.
            jsonString = JsonSerializer.Serialize(weatherForecast,
                SerializeOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}
        }
    }
}
```
### Metadata-based mode example

- For an entire context:

```csharp
[JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Metadata)]
[JsonSerializable(typeof(WeatherForecast))]
internal partial class MetadataOnlyContext : JsonSerializerContext
{
}
```
```csharp
jsonString = JsonSerializer.Serialize(
    weatherForecast, MetadataOnlyContext.Default.WeatherForecast);
```
```csharp
weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(
    jsonString, MetadataOnlyContext.Default.WeatherForecast);
```
- For an individual type:

```csharp
[JsonSerializable(typeof(WeatherForecast), GenerationMode = JsonSourceGenerationMode.Metadata)]
internal partial class MetadataOnlyWeatherForecastOnlyContext : JsonSerializerContext
{
}
```
```csharp
jsonString = JsonSerializer.Serialize(
    weatherForecast,
    MetadataOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
```
```csharp
weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(
    jsonString, MetadataOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
```
- Complete program example

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;

namespace MetadataOnlyNoOptions
{
    public class WeatherForecast
    {
        public DateTime Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    [JsonSerializable(typeof(WeatherForecast), GenerationMode = JsonSourceGenerationMode.Metadata)]
    internal partial class MetadataOnlyWeatherForecastOnlyContext : JsonSerializerContext
    {
    }

    [JsonSourceGenerationOptions(GenerationMode = JsonSourceGenerationMode.Metadata)]
    [JsonSerializable(typeof(WeatherForecast))]
    internal partial class MetadataOnlyContext : JsonSerializerContext
    {
    }

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

            // Deserialize with context that selects metadata mode only for WeatherForecast only.
            weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(
                jsonString, MetadataOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
            Console.WriteLine($"Date={weatherForecast?.Date}");
            // output:
            //Date=8/1/2019 12:00:00 AM

            // Serialize with context that selects metadata mode only for WeatherForecast only.
            jsonString = JsonSerializer.Serialize(
                weatherForecast,
                MetadataOnlyWeatherForecastOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}

            // Deserialize with context that selects metadata mode only.
            weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(
                jsonString, MetadataOnlyContext.Default.WeatherForecast);
            Console.WriteLine($"Date={weatherForecast?.Date}");
            // output:
            //Date=8/1/2019 12:00:00 AM

            // Serialize with context that selects metadata mode only.
            jsonString = JsonSerializer.Serialize(
                weatherForecast, MetadataOnlyContext.Default.WeatherForecast);
            Console.WriteLine(jsonString);
            // output:
            //{"Date":"2019-08-01T00:00:00","TemperatureCelsius":25,"Summary":"Hot"}
        }
    }
}
```
## Source-generation support in ASP.NET Core

In Blazor apps, use overloads of `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*` and `System.Net.Http.Json.HttpClientJsonExtensions.PostAsJsonAsync*` extension methods that take a source generation context or `TypeInfo<TValue>`.

Starting with .NET 8, you can also use overloads of `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable*` extension methods that accept a source generation context or `TypeInfo<TValue>`.

In Razor Pages, MVC, SignalR, and Web API apps, use the `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` property to specify the context.

```csharp
[JsonSerializable(typeof(WeatherForecast[]))]
internal partial class MyJsonContext : JsonSerializerContext { }
```

```csharp
var serializerOptions = new JsonSerializerOptions
{
    TypeInfoResolver = MyJsonContext.Default
};

services.AddControllers().AddJsonOptions(
    static options =>
        options.JsonSerializerOptions.TypeInfoResolverChain.Add(MyJsonContext.Default));
```

> **Note:**
> `System.Text.Json.Serialization.JsonSourceGenerationMode.Serialization`, or *fast-path* serialization, isn't supported for asynchronous serialization. Even though streaming serialization requires metadata-based models, it falls back to fast-path if the payloads are known to be small enough to fit in the predetermined buffer size. For more information, see <https://devblogs.microsoft.com/dotnet/performance-improvements-in-net-8/#json>.

## Disable reflection defaults

Because System.Text.Json uses reflection by default, calling a basic serialization method can break Native AOT apps, which doesn't support all required reflection APIs. These breaks can be challenging to diagnose since they can be unpredictable, and apps are often debugged using the CoreCLR runtime, where reflection works. Instead, if you explicitly disable reflection-based serialization, breaks are easier to diagnose. Code that uses reflection-based serialization will cause an `System.InvalidOperationException` with a descriptive message to be thrown at runtime.

To disable default reflection in your app, set the `JsonSerializerIsReflectionEnabledByDefault` MSBuild property to `false` in your project file:

```xml
<PropertyGroup>
  <JsonSerializerIsReflectionEnabledByDefault>false</JsonSerializerIsReflectionEnabledByDefault>
</PropertyGroup>
```

- The behavior of this property is consistent regardless of runtime, either CoreCLR or Native AOT.
- If you don't specify this property and PublishTrimmed is enabled, reflection-based serialization is automatically disabled.

You can programmatically check whether reflection is disabled by using the `System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault` property. The following code snippet shows how you might configure your serializer depending on whether reflection is enabled:

```csharp
static JsonSerializerOptions CreateDefaultOptions()
{
    return new()
    {
        TypeInfoResolver = JsonSerializer.IsReflectionEnabledByDefault
            ? new DefaultJsonTypeInfoResolver()
            : MyContext.Default
    };
}
```

Because the property is treated as a link-time constant, the previous method doesn't root the reflection-based resolver in applications that run in Native AOT.
