---
title: "How to deserialize JSON in C#"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/deserialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to read JSON as .NET objects (deserialize)

This article shows how to use the `System.Text.Json` namespace to deserialize from JavaScript Object Notation (JSON). If you're porting existing code from `Newtonsoft.Json`, see How to migrate to `System.Text.Json`.

A common way to deserialize JSON is to have (or create) a .NET class with properties and fields that represent one or more of the JSON properties. Then, to deserialize from a string or a file, call the `System.Text.Json.JsonSerializer.Deserialize*` method. For the generic overloads, the generic type parameter is the .NET class. For the non-generic overloads, you pass the type of the class as a method parameter. You can deserialize either synchronously or asynchronously.

> **Tip:**
> You can use AI assistance to deserialize a JSON string.

Any JSON properties that aren't represented in your class are ignored by default. Also, if any properties on the type are required but not present in the JSON payload, deserialization will fail.

## Examples

The following example shows how to deserialize a JSON string that contains collections and nested objects:

```csharp
﻿using System.Text.Json;

namespace DeserializeExtra
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
            string jsonString =
                """
                {
                  "Date": "2019-08-01T00:00:00-07:00",
                  "TemperatureCelsius": 25,
                  "Summary": "Hot",
                  "DatesAvailable": [
                    "2019-08-01T00:00:00-07:00",
                    "2019-08-02T00:00:00-07:00"
                  ],
                  "TemperatureRanges": {
                    "Cold": {
                      "High": 20,
                      "Low": -10
                    },
                    "Hot": {
                      "High": 60,
                      "Low": 20
                    }
                  },
                  "SummaryWords": [
                    "Cool",
                    "Windy",
                    "Humid"
                  ]
                }
                """;
                
            WeatherForecast? weatherForecast = 
                JsonSerializer.Deserialize<WeatherForecast>(jsonString);

            Console.WriteLine($"Date: {weatherForecast?.Date}");
            Console.WriteLine($"TemperatureCelsius: {weatherForecast?.TemperatureCelsius}");
            Console.WriteLine($"Summary: {weatherForecast?.Summary}");

            if (weatherForecast?.DatesAvailable != null)
            {
                foreach (DateTimeOffset dateTimeOffset in weatherForecast.DatesAvailable)
                {
                    Console.WriteLine($"DateAvailable: {dateTimeOffset}");
                }
            }

            if (weatherForecast?.TemperatureRanges != null)
            {
                foreach (KeyValuePair<string, HighLowTemps> temperatureRange in weatherForecast.TemperatureRanges)
                {
                    Console.WriteLine($"TemperatureRange: {temperatureRange.Key} is {temperatureRange.Value.Low} to {temperatureRange.Value.High}");
                }
            }

            if (weatherForecast?.SummaryWords != null)
            {
                foreach (string summaryWord in weatherForecast.SummaryWords)
                {
                    Console.WriteLine($"SummaryWord: {summaryWord}");
                }
            }
        }
    }
}

/* Output:
 * 
 * Date: 8/1/2019 12:00:00 AM -07:00
 * TemperatureCelsius: 25
 * Summary: Hot
 * DateAvailable: 8/1/2019 12:00:00 AM -07:00
 * DateAvailable: 8/2/2019 12:00:00 AM -07:00
 * TemperatureRange: Cold is -10 to 20
 * TemperatureRange: Hot is 20 to 60
 * SummaryWord: Cool
 * SummaryWord: Windy
 * SummaryWord: Humid
 * */
```
```vb
Imports System.Text.Json

Namespace DeserializeExtra

    Public Class WeatherForecast
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

    Public NotInheritable Class Program

        Public Shared Sub Run()
            Dim jsonString As String =
                "{
                  ""Date"": ""2019-08-01T00:00:00-07:00"",
                  ""TemperatureCelsius"": 25,
                  ""Summary"": ""Hot"",
                  ""DatesAvailable"": [
                    ""2019-08-01T00:00:00-07:00"",
                    ""2019-08-02T00:00:00-07:00""
                  ],
                  ""TemperatureRanges"": {
                    ""Cold"": {
                      ""High"": 20,
                      ""Low"": -10
                    },
                    ""Hot"": {
                      ""High"": 60,
                      ""Low"": 20
                    }
                  },
                  ""SummaryWords"": [
                    ""Cool"",
                    ""Windy"",
                    ""Humid""
                  ]
                }"

            Dim weatherForecast As WeatherForecast =
                JsonSerializer.Deserialize(Of WeatherForecast)(jsonString)

            Console.WriteLine($"Date: {weatherForecast?.Date}")
            Console.WriteLine($"TemperatureCelsius: {weatherForecast?.TemperatureCelsius}")
            Console.WriteLine($"Summary: {weatherForecast?.Summary}")

            If weatherForecast?.DatesAvailable IsNot Nothing Then
                For Each dateTimeOffset As DateTimeOffset In weatherForecast.DatesAvailable
                    Console.WriteLine($"DateAvailable: {dateTimeOffset}")
                Next
            End If

            If weatherForecast?.TemperatureRanges IsNot Nothing Then
                For Each temperatureRange As KeyValuePair(Of String, HighLowTemps) In weatherForecast.TemperatureRanges
                    Console.WriteLine($"TemperatureRange: {temperatureRange.Key} is {temperatureRange.Value.Low} to {temperatureRange.Value.High}")
                Next
            End If

            If weatherForecast?.SummaryWords IsNot Nothing Then
                For Each summaryWord As String In weatherForecast.SummaryWords
                    Console.WriteLine($"SummaryWord: {summaryWord}")
                Next
            End If
        End Sub

    End Class

End Namespace

' Output:
'
'Date: 8/1/2019 12:00:00 AM -07:00
'TemperatureCelsius: 25
'Summary: Hot
'DateAvailable: 8/1/2019 12:00:00 AM -07:00
'DateAvailable: 8/2/2019 12:00:00 AM -07:00
'TemperatureRange: Cold is -10 to 20
'TemperatureRange: Hot is 20 to 60
'SummaryWord: Cool
'SummaryWord: Windy
'SummaryWord: Humid
```
To deserialize from a file by using synchronous code, read the file into a string, as shown in the following example:

```csharp
﻿using System.Text.Json;

namespace DeserializeFromFile
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
            string fileName = "WeatherForecast.json";
            string jsonString = File.ReadAllText(fileName);
            WeatherForecast weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString)!;

            Console.WriteLine($"Date: {weatherForecast.Date}");
            Console.WriteLine($"TemperatureCelsius: {weatherForecast.TemperatureCelsius}");
            Console.WriteLine($"Summary: {weatherForecast.Summary}");
        }
    }
}
// output:
//Date: 8/1/2019 12:00:00 AM -07:00
//TemperatureCelsius: 25
//Summary: Hot
```
```vb
jsonString = File.ReadAllText(fileName)
weatherForecast1 = JsonSerializer.Deserialize(Of WeatherForecast)(jsonString)
```
To deserialize from a file by using asynchronous code, call the `System.Text.Json.JsonSerializer.DeserializeAsync*` method:

```csharp
﻿using System.Text.Json;

namespace DeserializeFromFileAsync
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
            string fileName = "WeatherForecast.json";
            using FileStream openStream = File.OpenRead(fileName);
            WeatherForecast? weatherForecast = 
                await JsonSerializer.DeserializeAsync<WeatherForecast>(openStream);

            Console.WriteLine($"Date: {weatherForecast?.Date}");
            Console.WriteLine($"TemperatureCelsius: {weatherForecast?.TemperatureCelsius}");
            Console.WriteLine($"Summary: {weatherForecast?.Summary}");
        }
    }
}
// output:
//Date: 8/1/2019 12:00:00 AM -07:00
//TemperatureCelsius: 25
//Summary: Hot
```
```vb
Dim openStream As FileStream = File.OpenRead(fileName)
weatherForecast1 = Await JsonSerializer.DeserializeAsync(Of WeatherForecast)(openStream)
```
## Deserialization behavior

The following behaviors apply when deserializing JSON:

* By default, property name matching is case-sensitive. You can specify case-insensitivity.
* Non-public constructors are ignored by the serializer.
* Deserialization to immutable objects or properties that don't have public `set` accessors is supported but not enabled by default. See Immutable types and records.
* By default, enums are supported as numbers. You can deserialize string enum fields.
* By default, fields are ignored. You can include fields.
* By default, comments or trailing commas in the JSON throw exceptions. You can allow comments and trailing commas.
* The default maximum depth is 64.

When you use System.Text.Json indirectly in an ASP.NET Core app, some default behaviors are different. For more information, see Web defaults for JsonSerializerOptions.

You can implement custom converters to provide functionality that isn't supported by the built-in converters.

## Deserialize without a .NET class

If you have JSON that you want to deserialize, and you don't have the class to deserialize it into, you have options other than manually creating the class that you need:

* Use the Utf8JsonReader directly.

* Deserialize into a JSON DOM (document object model) and extract what you need from the DOM.

  The DOM lets you navigate to a subsection of a JSON payload and deserialize a single value, a custom type, or an array. For information about the `System.Text.Json.Nodes.JsonNode` DOM, see Deserialize subsections of a JSON payload. For information about the `System.Text.Json.JsonDocument` DOM, see How to search a JsonDocument and JsonElement for sub-elements.

* Use Visual Studio 2022 or later to automatically generate the class you need:

  * Copy the JSON that you need to deserialize.
  * Create a class file and delete the template code.
  * Choose **Edit** > **Paste Special** > **Paste JSON as Classes**.

  The result is a class that you can use for your deserialization target.

## Deserialize from UTF-8

To deserialize from UTF-8, call a `System.Text.Json.JsonSerializer.Deserialize*` overload that takes a `ReadOnlySpan<byte>` or a `Utf8JsonReader`, as shown in the following examples. The examples assume the JSON is in a byte array named jsonUtf8Bytes.

```csharp
var readOnlySpan = new ReadOnlySpan<byte>(jsonUtf8Bytes);
WeatherForecast deserializedWeatherForecast = 
    JsonSerializer.Deserialize<WeatherForecast>(readOnlySpan)!;
```
```vb
Dim jsonString = Encoding.UTF8.GetString(jsonUtf8Bytes)
weatherForecast1 = JsonSerializer.Deserialize(Of WeatherForecast)(jsonString)
```
```csharp
var utf8Reader = new Utf8JsonReader(jsonUtf8Bytes);
WeatherForecast deserializedWeatherForecast = 
    JsonSerializer.Deserialize<WeatherForecast>(ref utf8Reader)!;
```
```vb
' This code example doesn't apply to Visual Basic. For more information, go to the following URL:
' https://learn.microsoft.com/dotnet/standard/serialization/system-text-json-how-to#visual-basic-support
```
## Use AI to deserialize JSON

You can use AI tools, such as GitHub Copilot, to generate code that uses `System.Text.Json` to deserialize from JSON. For example, you can customize the prompt to demonstrate deserialization when the target class defines a property that's missing from the JSON input.

The following text shows an example prompt for Copilot Chat:

```copilot-prompt
Generate C# code to use System.Text.Json to deserialize a JSON string {"FirstName":"John","LastName":"Doe"} to an equivalent .NET object, where the class defines an Age property.
Show what happens when the JSON is missing a property defined in the class.
Provide example output.
```

Review Copilot's suggestions before applying them.

For more information about GitHub Copilot, see GitHub's FAQs.

## See also

- How to deserialize to an interface
- GitHub Copilot in Visual Studio
- GitHub Copilot in Visual Studio Code
