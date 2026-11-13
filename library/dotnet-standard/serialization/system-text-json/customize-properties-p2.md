---
title: "How to customize property names and values with System.Text.Json (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/customize-properties.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to customize property names and values with System.Text.Json (part 2 of 2)

## Enums as strings

By default, enums are serialized as numbers. To serialize enum names as strings, use the `System.Text.Json.Serialization.JsonStringEnumConverter` or `System.Text.Json.Serialization.JsonStringEnumConverter`1` converter. Only `System.Text.Json.Serialization.JsonStringEnumConverter`1` is supported by the Native AOT runtime.

For example, suppose you need to serialize the following class that has an enum:

```csharp
public class WeatherForecastWithEnum
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public Summary? Summary { get; set; }
}

public enum Summary
{
    Cold, Cool, Warm, Hot
}
```
```vb
Public Class WeatherForecastWithEnum
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As Summary
End Class

Public Enum Summary
    Cold
    Cool
    Warm
    Hot
End Enum
```
If the Summary is `Hot`, by default the serialized JSON has the numeric value 3:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": 3
}
```

The following sample code serializes the enum names instead of the numeric values, and converts the names to camel case:

```csharp
options = new JsonSerializerOptions
{
    WriteIndented = true,
    Converters =
    {
        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
    }
};
jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
```vb
options = New JsonSerializerOptions With {
    .WriteIndented = True
}
options.Converters.Add(New JsonStringEnumConverter(JsonNamingPolicy.CamelCase))
jsonString = JsonSerializer.Serialize(weatherForecast, options)
```
The resulting JSON looks like the following example:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "hot"
}
```

The built-in `System.Text.Json.Serialization.JsonStringEnumConverter` can deserialize string values as well. It works with or without a specified naming policy. The following example shows deserialization using `CamelCase`:

```csharp
options = new JsonSerializerOptions
{
    Converters =
    {
        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)
    }
};
weatherForecast = JsonSerializer.Deserialize<WeatherForecastWithEnum>(jsonString, options)!;
```
```vb
options = New JsonSerializerOptions
options.Converters.Add(New JsonStringEnumConverter(JsonNamingPolicy.CamelCase))
weatherForecast = JsonSerializer.Deserialize(Of WeatherForecastWithEnum)(jsonString, options)
```
### JsonConverterAttribute

You can also specify the converter to use by annotating your enum with `System.Text.Json.Serialization.JsonConverterAttribute`. The following example shows how to specify the `System.Text.Json.Serialization.JsonStringEnumConverter`1` (available in .NET 8 and later versions) by using the `System.Text.Json.Serialization.JsonConverterAttribute` attribute. For example, suppose you need to serialize the following class that has an enum:

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
The following sample code serializes the enum names instead of the numeric values:

```csharp
var options = new JsonSerializerOptions
{
    WriteIndented = true,
};
jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
The resulting JSON looks like this:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Precipitation": "Sleet"
}
```

### Custom enum member names

Starting in .NET 9, you can customize the names of individual enum members for types that are serialized as strings. To customize an enum member name, annotate it with the JsonStringEnumMemberName attribute.

For example, suppose you need to serialize the following class that has an enum with a custom member name:

```csharp
public class WeatherForecastWithEnumCustomName
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public CloudCover? Sky { get; set; }
}

[JsonConverter(typeof(JsonStringEnumConverter))]
public enum CloudCover
{
    Clear,
    [JsonStringEnumMemberName("Partly cloudy")]
    Partial,
    Overcast
}
```
The following sample code serializes the enum names instead of the numeric values:

```csharp
var options = new JsonSerializerOptions
{
    WriteIndented = true,
};
jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
The resulting JSON looks like this:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Sky": "Partly cloudy"
}
```

### Source generation

To use the converter with source generation, see Serialize enum fields as strings.

## Configure the order of serialized properties

By default, properties are serialized in the order in which they're defined in their class. The `[JsonPropertyOrder]` attribute lets you specify the order of properties in the JSON output from serialization. The default value of the `Order` property is zero. Set `Order` to a positive number to position a property after those that have the default value. A negative `Order` positions a property before those that have the default value. Properties are written in order from the lowest `Order` value to the highest. Here's an example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace PropertyOrder
{
    public class WeatherForecast
    {
        [JsonPropertyOrder(-5)]
        public DateTime Date { get; set; }
        public int TemperatureC { get; set; }
        [JsonPropertyOrder(-2)]
        public int TemperatureF { get; set; }
        [JsonPropertyOrder(5)]
        public string? Summary { get; set; }
        [JsonPropertyOrder(2)]
        public int WindSpeed { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureC = 25,
                TemperatureF = 25,
                Summary = "Hot",
                WindSpeed = 10
            };

            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(weatherForecast, options);
            Console.WriteLine(jsonString);
        }
    }
}
// output:
//{
//  "Date": "2019-08-01T00:00:00",
//  "TemperatureF": 25,
//  "TemperatureC": 25,
//  "WindSpeed": 10,
//  "Summary": "Hot"
//}
```
## See also

- System.Text.Json overview
- How to serialize and deserialize JSON
