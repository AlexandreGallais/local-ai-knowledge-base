---
title: "How to serialize JSON in C#"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/how-to.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to write .NET objects as JSON (serialize)

This article shows how to use the `System.Text.Json` namespace to serialize to JavaScript Object Notation (JSON). If you're porting existing code from `Newtonsoft.Json`, see How to migrate to `System.Text.Json`.

> **Tip:**
> You can use AI assistance to serialize to JSON.

To write JSON to a string or to a file, call the `System.Text.Json.JsonSerializer.Serialize*` method.

## Serialization examples

The following example creates JSON as a string:

```csharp
using System.Text.Json;

namespace SerializeBasic
{
    public class WeatherForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot"
            };

            string jsonString = JsonSerializer.Serialize(weatherForecast);

            Console.WriteLine(jsonString);
        }
    }
}
// output:
//{"Date":"2019-08-01T00:00:00-07:00","TemperatureCelsius":25,"Summary":"Hot"}
```
```vb
Dim jsonString As String
```
The JSON output is *minified* (whitespace, indentation, and new-line characters are removed) by default.

The following example uses synchronous code to create a JSON file:

```csharp
﻿using System.Text.Json;

namespace SerializeToFile
{
    public class WeatherForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot"
            };

            string fileName = "WeatherForecast.json"; 
            string jsonString = JsonSerializer.Serialize(weatherForecast);
            File.WriteAllText(fileName, jsonString);

            Console.WriteLine(File.ReadAllText(fileName));
        }
    }
}
// output:
//{"Date":"2019-08-01T00:00:00-07:00","TemperatureCelsius":25,"Summary":"Hot"}
```
```vb
jsonString = JsonSerializer.Serialize(weatherForecast1)
File.WriteAllText(fileName, jsonString)
```
The following example uses asynchronous code to create a JSON file:

```csharp
﻿using System.Text.Json;

namespace SerializeToFileAsync
{
    public class WeatherForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    public class Program
    {
        public static async Task Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot"
            };

            string fileName = "WeatherForecast.json";
            await using FileStream createStream = File.Create(fileName);
            await JsonSerializer.SerializeAsync(createStream, weatherForecast);

            Console.WriteLine(File.ReadAllText(fileName));
        }
    }
}
// output:
//{"Date":"2019-08-01T00:00:00-07:00","TemperatureCelsius":25,"Summary":"Hot"}
```
```vb
Dim createStream As FileStream = File.Create(fileName)
Await JsonSerializer.SerializeAsync(createStream, weatherForecast1)
```
The preceding examples use type inference for the type being serialized. An overload of `Serialize()` takes a generic type parameter:

```csharp
﻿using System.Text.Json;

namespace SerializeWithGenericParameter
{
    public class WeatherForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot"
            };

            string jsonString = JsonSerializer.Serialize<WeatherForecast>(weatherForecast);

            Console.WriteLine(jsonString);
        }
    }
}
// output:
//{"Date":"2019-08-01T00:00:00-07:00","TemperatureCelsius":25,"Summary":"Hot"}
```
```vb
jsonString = JsonSerializer.Serialize(Of WeatherForecastWithPOCOs)(weatherForecast)
```
You can also use AI to generate serialization code for you. For instructions, see the Use AI section in this article.

## Serialization behavior

* By default, all public properties are serialized. You can specify properties to ignore. You can also include private members.
* The default encoder escapes non-ASCII characters, HTML-sensitive characters within the ASCII-range, and characters that must be escaped according to the RFC 8259 JSON spec.
* By default, JSON is minified. You can pretty-print the JSON.
* By default, casing of JSON names matches the .NET names. You can customize JSON name casing.
* By default, circular references are detected and exceptions thrown. You can preserve references and handle circular references.
* By default, fields are ignored. You can include fields.

When you use System.Text.Json indirectly in an ASP.NET Core app, some default behaviors are different. For more information, see Web defaults for JsonSerializerOptions.

Supported types include:

* .NET primitives that map to JavaScript primitives, such as numeric types, strings, and Boolean.
* User-defined plain old CLR objects (POCOs).
* One-dimensional and jagged arrays (`T[][]`).
* Collections and dictionaries from the following namespaces:

  * `System.Collections`
  * `System.Collections.Generic`
  * `System.Collections.Immutable`
  * `System.Collections.Concurrent`
  * `System.Collections.Specialized`
  * `System.Collections.ObjectModel`

  For more information, see Supported types in System.Text.Json.

You can implement custom converters to handle additional types or to provide functionality that isn't supported by the built-in converters.

Here's an example showing how a class that contains collection properties and a user-defined type is serialized:

```csharp
﻿using System.Text.Json;

namespace SerializeExtra
{
    public class WeatherForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
        public string? SummaryField;
        public IList<DateTimeOffset>? DatesAvailable { get; set; }
        public Dictionary<string, HighLowTemps>? TemperatureRanges { get; set; }
        public string[]? SummaryWords { get; set; }
    }

    public class HighLowTemps
    {
        public int High { get; set; }
        public int Low { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot",
                SummaryField = "Hot",
                DatesAvailable = [DateTime.Parse("2019-08-01"), DateTime.Parse("2019-08-02")],
                TemperatureRanges = new Dictionary<string, HighLowTemps>
                    {
                        ["Cold"] = new HighLowTemps { High = 20, Low = -10 },
                        ["Hot"] = new HighLowTemps { High = 60 , Low = 20 }
                    },
                SummaryWords = ["Cool", "Windy", "Humid"]
            };

            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(weatherForecast, options);

            Console.WriteLine(jsonString);
        }
    }
}

// Output:
//{
//  "Date": "2019-08-01T00:00:00-07:00",
//  "TemperatureCelsius": 25,
//  "Summary": "Hot",
//  "DatesAvailable": [
//    "2019-08-01T00:00:00-07:00",
//    "2019-08-02T00:00:00-07:00"
//  ],
//  "TemperatureRanges": {
//    "Cold": {
//      "High": 20,
//      "Low": -10
//    },
//    "Hot": {
//    "High": 60,
//      "Low": 20
//    }
//  },
//  "SummaryWords": [
//    "Cool",
//    "Windy",
//    "Humid"
//  ]
//}
```
```vb
Public Class WeatherForecastWithPOCOs
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String
    Public SummaryField As String
    Public Property DatesAvailable As IList(Of DateTimeOffset)
    Public Property TemperatureRanges As Dictionary(Of String, HighLowTemps)
    Public Property SummaryWords As String()
End Class

Public Class HighLowTemps
    Public Property High As Integer
    Public Property Low As Integer
End Class

' serialization output formatted (pretty-printed with whitespace and indentation):
' {
'   "Date": "2019-08-01T00:00:00-07:00",
'   "TemperatureCelsius": 25,
'   "Summary": "Hot",
'   "DatesAvailable": [
'     "2019-08-01T00:00:00-07:00",
'     "2019-08-02T00:00:00-07:00"
'   ],
'   "TemperatureRanges": {
'     "Cold": {
'       "High": 20,
'       "Low": -10
'     },
'     "Hot": {
'       "High": 60,
'       "Low": 20
'     }
'   },
'   "SummaryWords": [
'     "Cool",
'     "Windy",
'     "Humid"
'   ]
' }
```
## Serialize to UTF-8

It's 5-10% faster to serialize to a UTF-8 byte array than to use the string-based methods. That's because the bytes (as UTF-8) don't need to be converted to strings (UTF-16).

To serialize to a UTF-8 byte array, call the `System.Text.Json.JsonSerializer.SerializeToUtf8Bytes*` method:

```csharp
byte[] jsonUtf8Bytes = JsonSerializer.SerializeToUtf8Bytes(weatherForecast);
```
```vb
Dim jsonUtf8Bytes As Byte()
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .WriteIndented = True
}
jsonUtf8Bytes = JsonSerializer.SerializeToUtf8Bytes(weatherForecast1, options)
```
A `System.Text.Json.JsonSerializer.Serialize*` overload that takes a `System.Text.Json.Utf8JsonWriter` is also available.

## Serialize to formatted JSON

To pretty-print the JSON output, set `System.Text.Json.JsonSerializerOptions.WriteIndented` to `true`:

```csharp
﻿using System.Text.Json;

namespace SerializeWriteIndented
{
    public class WeatherForecast
    {
        public DateTimeOffset Date { get; set; }
        public int TemperatureCelsius { get; set; }
        public string? Summary { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot"
            };

            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(weatherForecast, options);

            Console.WriteLine(jsonString);
        }
    }
}
// output:
//{
//  "Date": "2019-08-01T00:00:00-07:00",
//  "TemperatureCelsius": 25,
//  "Summary": "Hot"
//}
```
```vb
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .WriteIndented = True
}
jsonString = JsonSerializer.Serialize(weatherForecast, options)
```
Starting in .NET 9, you can also customize the indent character and size using `System.Text.Json.JsonSerializerOptions.IndentCharacter` and `System.Text.Json.JsonSerializerOptions.IndentSize`.

> **Tip:**
> If you use `JsonSerializerOptions` repeatedly with the same options, don't create a new `JsonSerializerOptions` instance each time you use it. Reuse the same instance for every call. For more information, see Reuse JsonSerializerOptions instances.

## Use AI to serialize to JSON

You can use AI tools, such as GitHub Copilot, to generate code that uses `System.Text.Json` to serialize to JSON. You can customize the prompt to fit your object fields and serialization needs.

Here's an example prompt you can use to generate serialization code:

```copilot-prompt
I have a variable named weatherForecast of type WeatherForecast.
Serialize the variable using System.Text.Json and write the result directly to a file named "output.json" with the JSON indented for pretty formatting.
Ensure the code includes all necessary using directives and compiles without errors.
```

Review Copilot's suggestions before applying them.

For more information about GitHub Copilot, see GitHub's FAQs.

## See also

- GitHub Copilot in Visual Studio
- GitHub Copilot in Visual Studio Code
