---
title: "How to allow some kinds of invalid JSON with System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/invalid-json.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to allow some kinds of invalid JSON with System.Text.Json

In this article, you will learn how to allow comments, trailing commas, and quoted numbers in JSON, and how to write numbers as strings.

## Allow comments and trailing commas

By default, comments and trailing commas are not allowed in JSON. To allow comments in the JSON, set the `System.Text.Json.JsonSerializerOptions.ReadCommentHandling` property to `JsonCommentHandling.Skip`.
And to allow trailing commas, set the `System.Text.Json.JsonSerializerOptions.AllowTrailingCommas` property to `true`. The following example shows how to allow both:

```csharp
var options = new JsonSerializerOptions
{
    ReadCommentHandling = JsonCommentHandling.Skip,
    AllowTrailingCommas = true,
};
WeatherForecast weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(
    jsonString,
    options
    )!;
```
```vb
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .ReadCommentHandling = JsonCommentHandling.Skip,
    .AllowTrailingCommas = True
}
Dim weatherForecast1 = JsonSerializer.Deserialize(Of WeatherForecast)(jsonString, options)
```
Here's example JSON with comments and a trailing comma:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25, // Fahrenheit 77
  "Summary": "Hot", /* Zharko */
  // Comments on
  /* separate lines */
}
```

## Allow or write numbers in quotes

Some serializers encode numbers as JSON strings (surrounded by quotes).

For example:

```json
{
    "DegreesCelsius": "23"
}
```

Instead of:

```json
{
    "DegreesCelsius": 23
}
```

To serialize numbers in quotes or accept numbers in quotes across the entire input object graph, set `System.Text.Json.JsonSerializerOptions.NumberHandling*` as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace QuotedNumbers
{
    public class Forecast
    {
        public DateTime Date { get; init; }
        public int TemperatureC { get; set; }
        public string? Summary { get; set; }
    };

    public class Program
    {
        public static void Run()
        {
            Forecast forecast = new()
            {
                Date = DateTime.Now,
                TemperatureC = 40,
                Summary = "Hot"
            };

            JsonSerializerOptions options = new()
            {
                NumberHandling =
                    JsonNumberHandling.AllowReadingFromString |
                    JsonNumberHandling.WriteAsString,
                WriteIndented = true
            };

            string forecastJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);

            Console.WriteLine($"Output JSON:\n{forecastJson}");

            Forecast forecastDeserialized =
                JsonSerializer.Deserialize<Forecast>(forecastJson, options)!;

            Console.WriteLine($"Date: {forecastDeserialized.Date}");
            Console.WriteLine($"TemperatureC: {forecastDeserialized.TemperatureC}");
            Console.WriteLine($"Summary: {forecastDeserialized.Summary}");
        }
    }
}

// Produces output like the following example:
//
//Output JSON:
//{
//  "Date": "2020-10-23T12:27:06.4017385-07:00",
//  "TemperatureC": "40",
//  "Summary": "Hot"
//}
//Date: 10/23/2020 12:27:06 PM
//TemperatureC: 40
//Summary: Hot
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace QuotedNumbers

    Public Class Forecast
        Public Property [Date] As Date
        Public Property TemperatureC As Integer
        Public Property Summary As String
    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim forecast1 As New Forecast() With {
                .[Date] = Date.Now,
                .TemperatureC = 40,
                .Summary = "Hot"
                }

            Dim options As New JsonSerializerOptions() With {
                .NumberHandling = JsonNumberHandling.AllowReadingFromString Or
                        JsonNumberHandling.WriteAsString,
                .WriteIndented = True
                }

            Dim forecastJson As String = JsonSerializer.Serialize(forecast1, options)

            Console.WriteLine($"Output JSON:{forecastJson}")

            Dim forecastDeserialized As Forecast = JsonSerializer.Deserialize(Of Forecast)(forecastJson, options)

            Console.WriteLine($"Date: {forecastDeserialized.[Date]}")
            Console.WriteLine($"TemperatureC: {forecastDeserialized.TemperatureC}")
            Console.WriteLine($"Summary: {forecastDeserialized.Summary}")
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'Output JSON:
'{
'  "Date": "2020-10-23T12:27:06.4017385-07:00",
'  "TemperatureC": "40",
'  "Summary": "Hot"
'}
'Date: 10/23/2020 12:27:06 PM
'TemperatureC: 40
'Summary: Hot
```
When you use `System.Text.Json` indirectly through ASP.NET Core, quoted numbers are allowed when deserializing because ASP.NET Core specifies web default options.

To allow or write quoted numbers for specific properties, fields, or types, use the [JsonNumberHandling] attribute.

## See also

* System.Text.Json overview
* How to serialize and deserialize JSON
