---
title: "How to instantiate JsonSerializerOptions with System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/configure-options.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to instantiate JsonSerializerOptions instances with System.Text.Json

This article explains how to avoid performance problems when you use `System.Text.Json.JsonSerializerOptions`. It also shows how to use the parameterized constructors that are available.

## Reuse JsonSerializerOptions instances

If you use `JsonSerializerOptions` repeatedly with the same options, don't create a new `JsonSerializerOptions` instance each time you use it. Reuse the same instance for every call. This guidance applies to code you write for custom converters and when you call `System.Text.Json.JsonSerializer.Serialize*` or `System.Text.Json.JsonSerializer.Deserialize*`. It's safe to use the same instance across multiple threads. The metadata caches on the options instance are thread-safe, and the instance is immutable after the first serialization or deserialization.

## The `JsonSerializerOptions.Default` property

If the instance of `JsonSerializerOptions` that you need to use is the default instance (has all of the default settings and the default converters), use the `System.Text.Json.JsonSerializerOptions.Default` property rather than creating an options instance. For more information, see Use default system converter.

## Copy JsonSerializerOptions

There is a JsonSerializerOptions constructor) that lets you create a new instance with the same options as an existing instance, as shown in the following example:

```csharp
﻿using System.Text.Json;

namespace CopyOptions
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
                WriteIndented = true
            };

            JsonSerializerOptions optionsCopy = new(options);
            string forecastJson =
                JsonSerializer.Serialize<Forecast>(forecast, optionsCopy);

            Console.WriteLine($"Output JSON:\n{forecastJson}");
        }
    }
}

// Produces output like the following example:
//
//Output JSON:
//{
//  "Date": "2020-10-21T15:40:06.8998502-07:00",
//  "TemperatureC": 40,
//  "Summary": "Hot"
//}
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace CopyOptions

    Public Class Forecast
        Public Property [Date] As Date
        Public Property TemperatureC As Integer
        Public Property Summary As String
    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim forecast1 As New Forecast() With {
                .[Date] = Date.Now,
                .Summary = Nothing,
                .TemperatureC = CType(Nothing, Integer)
            }

            Dim options As New JsonSerializerOptions() With {
                .DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
            }

            Dim optionsCopy As New JsonSerializerOptions
            Dim forecastJson As String = JsonSerializer.Serialize(forecast1, optionsCopy)

            Console.WriteLine($"Output JSON:{forecastJson}")
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'Output JSON:
'{
'  "Date": "2020-10-21T15:40:06.8998502-07:00",
'  "TemperatureC": 40,
'  "Summary": "Hot"
'}
```
The metadata cache of the existing `JsonSerializerOptions` instance isn't copied to the new instance. So using this constructor is not the same as reusing an existing instance of `JsonSerializerOptions`.

## Web defaults for JsonSerializerOptions

The following options have different defaults for web apps:

* `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive*` = `true`
* `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` = `System.Text.Json.JsonNamingPolicy.CamelCase`
* `System.Text.Json.JsonSerializerOptions.NumberHandling*` = `System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString`

In .NET 9 and later versions, you can use the `System.Text.Json.JsonSerializerOptions.Web` singleton to serialize with the default options that ASP.NET Core uses for web apps. In earlier versions, call the JsonSerializerOptions constructor) to create a new instance with the web defaults, as shown in the following example:

```csharp
﻿using System.Text.Json;

namespace OptionsDefaults
{
    public class Forecast
    {
        public DateTime? Date { get; init; }
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

            JsonSerializerOptions options = new(JsonSerializerDefaults.Web)
            {
                WriteIndented = true
            };

            Console.WriteLine(
                $"PropertyNameCaseInsensitive: {options.PropertyNameCaseInsensitive}");
            Console.WriteLine(
                $"JsonNamingPolicy: {options.PropertyNamingPolicy}");
            Console.WriteLine(
                $"NumberHandling: {options.NumberHandling}");

            string forecastJson = JsonSerializer.Serialize<Forecast>(forecast, options);
            Console.WriteLine($"Output JSON:\n{forecastJson}");

            Forecast? forecastDeserialized =
                JsonSerializer.Deserialize<Forecast>(forecastJson, options);

            Console.WriteLine($"Date: {forecastDeserialized?.Date}");
            Console.WriteLine($"TemperatureC: {forecastDeserialized?.TemperatureC}");
            Console.WriteLine($"Summary: {forecastDeserialized?.Summary}");
        }
    }
}

// Produces output like the following example:
//
//PropertyNameCaseInsensitive: True
//JsonNamingPolicy: System.Text.Json.JsonCamelCaseNamingPolicy
//NumberHandling: AllowReadingFromString
//Output JSON:
//{
//  "date": "2020-10-21T15:40:06.9040831-07:00",
//  "temperatureC": 40,
//  "summary": "Hot"
//}
//Date: 10 / 21 / 2020 3:40:06 PM
//TemperatureC: 40
//Summary: Hot
```
```vb
﻿Imports System.Text.Json

Namespace OptionsDefaults

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

            Dim options As New JsonSerializerOptions(JsonSerializerDefaults.Web) With {
                .WriteIndented = True
                }

            Console.WriteLine(
                $"PropertyNameCaseInsensitive: {options.PropertyNameCaseInsensitive}")
            Console.WriteLine(
                $"JsonNamingPolicy: {options.PropertyNamingPolicy}")
            Console.WriteLine(
                $"NumberHandling: {options.NumberHandling}")

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
'PropertyNameCaseInsensitive: True
'JsonNamingPolicy: System.Text.Json.JsonCamelCaseNamingPolicy
'NumberHandling: AllowReadingFromString
'Output JSON:
'{
'  "date": "2020-10-21T15:40:06.9040831-07:00",
'  "temperatureC": 40,
'  "summary": "Hot"
'}
'Date: 10 / 21 / 2020 3:40:06 PM
'TemperatureC: 40
'Summary: Hot
```
