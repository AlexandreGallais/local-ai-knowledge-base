---
title: "Include fields in serialization"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/fields.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Include fields

By default, fields aren't serialized. Use the `System.Text.Json.JsonSerializerOptions.IncludeFields` global setting or the [JsonInclude] attribute to include fields when serializing or deserializing, as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace Fields
{
    public class Forecast
    {
        public DateTime Date;
        public int TemperatureC;
        public string? Summary;
    }

    public class Forecast2
    {
        [JsonInclude]
        public DateTime Date;
        [JsonInclude]
        public int TemperatureC;
        [JsonInclude]
        public string? Summary;
    }

    public class Program
    {
        public static void Run()
        {
            string json = """
                {
                    "Date":"2020-09-06T11:31:01.923395",
                    "TemperatureC":-1,
                    "Summary":"Cold"
                }
                """;
            Console.WriteLine($"Input JSON: {json}");

            var options = new JsonSerializerOptions
            {
                IncludeFields = true,
            };
            Forecast forecast = JsonSerializer.Deserialize<Forecast>(json, options)!;

            Console.WriteLine($"forecast.Date: {forecast.Date}");
            Console.WriteLine($"forecast.TemperatureC: {forecast.TemperatureC}");
            Console.WriteLine($"forecast.Summary: {forecast.Summary}");

            string roundTrippedJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);

            Console.WriteLine($"Output JSON: {roundTrippedJson}");

            Forecast2 forecast2 = JsonSerializer.Deserialize<Forecast2>(json)!;

            Console.WriteLine($"forecast2.Date: {forecast2.Date}");
            Console.WriteLine($"forecast2.TemperatureC: {forecast2.TemperatureC}");
            Console.WriteLine($"forecast2.Summary: {forecast2.Summary}");

            roundTrippedJson = JsonSerializer.Serialize<Forecast2>(forecast2);
            
            Console.WriteLine($"Output JSON: {roundTrippedJson}");
        }
    }
}

// Produces output like the following example:
//
//Input JSON: { "Date":"2020-09-06T11:31:01.923395","TemperatureC":-1,"Summary":"Cold"}
//forecast.Date: 9/6/2020 11:31:01 AM
//forecast.TemperatureC: -1
//forecast.Summary: Cold
//Output JSON: { "Date":"2020-09-06T11:31:01.923395","TemperatureC":-1,"Summary":"Cold"}
//forecast2.Date: 9/6/2020 11:31:01 AM
//forecast2.TemperatureC: -1
//forecast2.Summary: Cold
//Output JSON: { "Date":"2020-09-06T11:31:01.923395","TemperatureC":-1,"Summary":"Cold"}
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace Fields

    Public Class Forecast
        Public [Date] As Date
        Public TemperatureC As Integer
        Public Summary As String
    End Class

    Public Class Forecast2

        <JsonInclude>
        Public [Date] As Date

        <JsonInclude>
        Public TemperatureC As Integer

        <JsonInclude>
        Public Summary As String

    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim json As String = "{""Date"":""2020-09-06T11:31:01.923395"",""TemperatureC"":-1,""Summary"":""Cold""}"
            Console.WriteLine($"Input JSON: {json}")

            Dim options As New JsonSerializerOptions With {
                .IncludeFields = True
            }
            Dim forecast1 As Forecast = JsonSerializer.Deserialize(Of Forecast)(json, options)

            Console.WriteLine($"forecast.Date: {forecast1.[Date]}")
            Console.WriteLine($"forecast.TemperatureC: {forecast1.TemperatureC}")
            Console.WriteLine($"forecast.Summary: {forecast1.Summary}")

            Dim roundTrippedJson As String = JsonSerializer.Serialize(forecast1, options)

            Console.WriteLine($"Output JSON: {roundTrippedJson}")

            Dim forecast21 As Forecast2 = JsonSerializer.Deserialize(Of Forecast2)(json)

            Console.WriteLine($"forecast2.Date: {forecast21.[Date]}")
            Console.WriteLine($"forecast2.TemperatureC: {forecast21.TemperatureC}")
            Console.WriteLine($"forecast2.Summary: {forecast21.Summary}")

            roundTrippedJson = JsonSerializer.Serialize(forecast21)

            Console.WriteLine($"Output JSON: {roundTrippedJson}")
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'Input JSON: { "Date":"2020-09-06T11:31:01.923395","TemperatureC":-1,"Summary":"Cold"}
'forecast.Date: 9/6/2020 11:31:01 AM
'forecast.TemperatureC: -1
'forecast.Summary: Cold
'Output JSON: { "Date":"2020-09-06T11:31:01.923395","TemperatureC":-1,"Summary":"Cold"}
'forecast2.Date: 9/6/2020 11:31:01 AM
'forecast2.TemperatureC: -1
'forecast2.Summary: Cold
'Output JSON: { "Date":"2020-09-06T11:31:01.923395","TemperatureC":-1,"Summary":"Cold"}
```
To ignore read-only fields, use the `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*` global setting.
