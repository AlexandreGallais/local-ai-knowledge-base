---
title: "How to ignore properties with System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/ignore-properties.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to ignore properties with System.Text.Json

When serializing C# objects to JavaScript Object Notation (JSON), by default, all public properties are serialized. If you don't want some of them to appear in the resulting JSON, you have several options. In this article, you learn how to ignore properties based on various criteria:

* Individual properties
* Properties based on a type-level condition
* All read-only properties
* All null-value properties
* All default-value properties

## Ignore individual properties

To ignore individual properties, use the [JsonIgnore] attribute.

The following example shows a type to serialize. It also shows the JSON output:

```csharp
public class WeatherForecastWithIgnoreAttribute
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    [JsonIgnore]
    public string? Summary { get; set; }
}
```
```vb
Public Class WeatherForecastWithIgnoreAttribute
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer

    <JsonIgnore>
    Public Property Summary As String

End Class
```
```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
}
```

You can specify conditional exclusion by setting the [JsonIgnore] attribute's `Condition` property. The `System.Text.Json.Serialization.JsonIgnoreCondition` enum provides the following options:

* `Always` - The property is always ignored. If no `Condition` is specified, this option is assumed.
* `Never` - The property is always serialized and deserialized, regardless of the `DefaultIgnoreCondition`, `IgnoreReadOnlyProperties`, and `IgnoreReadOnlyFields` global settings.
* `WhenWritingDefault` - The property is ignored on serialization if it's a reference type `null`, a nullable value type `null`, or a value type `default`.
* `WhenWritingNull` - The property is ignored on serialization if it's a reference type `null`, or a nullable value type `null`.

The following example illustrates the use of the [JsonIgnore] attribute's `Condition` property:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace JsonIgnoreAttributeExample
{
    public class Forecast
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
        public DateTime Date { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.Never)]
        public int TemperatureC { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string? Summary { get; set; }
    };

    public class Program
    {
        public static void Run()
        {
            Forecast forecast = new()
            {
                Date = default,
                Summary = null,
                TemperatureC = default
            };

            JsonSerializerOptions options = new()
            {
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
            };

            string forecastJson =
                JsonSerializer.Serialize<Forecast>(forecast,options);

            Console.WriteLine(forecastJson);
        }
    }
}

// Produces output like the following example:
//
//{"TemperatureC":0}
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace JsonIgnoreAttributeExample

    Public Class Forecast

        <JsonIgnore(Condition:=JsonIgnoreCondition.WhenWritingDefault)>
        Public Property [Date] As Date

        <JsonIgnore(Condition:=JsonIgnoreCondition.Never)>
        Public Property TemperatureC As Integer

        <JsonIgnore(Condition:=JsonIgnoreCondition.WhenWritingNull)>
        Public Property Summary As String

    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim forecast1 As New Forecast() With {
                .[Date] = CType(Nothing, Date),
                .Summary = Nothing,
                .TemperatureC = CType(Nothing, Integer)
                }

            Dim options As New JsonSerializerOptions() With {
                .DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
                }

            Dim forecastJson As String = JsonSerializer.Serialize(forecast1, options)

            Console.WriteLine(forecastJson)
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'{"TemperatureC":0}
```
## Ignore properties based on a type-level condition

Starting in .NET 11, apply `[JsonIgnore(Condition = ...)]` to a class, struct, or interface to set the default ignore condition for its properties and fields:

```csharp
[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
public class Forecast
{
    public string? Summary { get; set; }
}
```

```vb
<JsonIgnore(Condition:=JsonIgnoreCondition.WhenWritingNull)>
Public Class Forecast
    Public Property Summary As String
End Class
```

The serializer applies ignore settings in this order, from highest to lowest precedence:

* A member-level `System.Text.Json.Serialization.JsonIgnoreAttribute`.
* A type-level `System.Text.Json.Serialization.JsonIgnoreAttribute`.
* `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition`.

At the type level, `System.Text.Json.Serialization.JsonIgnoreCondition.Always` is invalid. Reflection-based serialization throws an `System.InvalidOperationException`, and source generation reports SYSLIB1226. Because `Always` is the default condition, specify `Condition` when you apply `[JsonIgnore]` to a type.

A type-level `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull` condition doesn't ignore non-nullable value-type members. The type-level condition still overrides the global `DefaultIgnoreCondition`, so those members remain in the JSON even when the global condition is `WhenWritingDefault`.

## Ignore all read-only properties

A property is read-only if it contains a public getter but not a public setter. To ignore all read-only properties when serializing, set the `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties` to `true`, as shown in the following example:

```csharp
var options = new JsonSerializerOptions
{
    IgnoreReadOnlyProperties = true,
    WriteIndented = true
};
jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
```vb
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .IgnoreReadOnlyProperties = True,
    .WriteIndented = True
}
jsonString = JsonSerializer.Serialize(weatherForecast, options)
```
The following example shows a type to serialize. It also shows the JSON output:

```csharp
public class WeatherForecastWithROProperty
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
    public int WindSpeedReadOnly { get; private set; } = 35;
}
```
```vb
Public Class WeatherForecastWithROProperty
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String
    Private _windSpeedReadOnly As Integer

    Public Property WindSpeedReadOnly As Integer
        Get
            Return _windSpeedReadOnly
        End Get
        Private Set(Value As Integer)
            _windSpeedReadOnly = Value
        End Set
    End Property

End Class
```
```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
}
```

This option applies only to properties. To ignore read-only fields when serializing fields, use the `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields*` global setting.

> **Note:**
> Read-only collection-type properties are still serialized even if `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties` is set to `true`.

## Ignore all null-value properties

To ignore all null-value properties, set the `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition` property to `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull`, as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace IgnoreNullOnSerialize
{
    public class Forecast
    {
        public DateTime Date { get; set; }
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
                Summary = null,
                TemperatureC = default
            };

            JsonSerializerOptions options = new()
            {
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
            };

            string forecastJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);
            
            Console.WriteLine(forecastJson);
        }
    }
}

// Produces output like the following example:
//
//{"Date":"2020-10-30T10:11:40.2359135-07:00","TemperatureC":0}
```
```vb
﻿Imports System.Text.Json

Namespace IgnoreNullOnSerialize

    Public Class Forecast
        Public Property [Date] As Date
        Public Property TemperatureC As Integer
        Public Property Summary As String
    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim forecast1 As New Forecast() With
            {
            .[Date] = Date.Now,
            .Summary = Nothing,
            .TemperatureC = CType(Nothing, Integer)
            }

            Dim options As New JsonSerializerOptions

            Dim forecastJson As String = JsonSerializer.Serialize(forecast1, options)

            Console.WriteLine(forecastJson)
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'{"Date":"2020-10-30T10:11:40.2359135-07:00","TemperatureC":0}
```
## Ignore all default-value properties

To prevent serialization of default values in value type properties, set the `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition` property to `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault`, as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace IgnoreValueDefaultOnSerialize
{
    public class Forecast
    {
        public DateTime Date { get; set; }
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
                Summary = null,
                TemperatureC = default
            };

            JsonSerializerOptions options = new()
            {
                DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
            };

            string forecastJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);

            Console.WriteLine(forecastJson);
        }
    }
}

// Produces output like the following example:
//
//{ "Date":"2020-10-21T15:40:06.8920138-07:00"}
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace IgnoreValueDefaultOnSerialize

    Public Class Forecast
        Public Property [Date] As Date
        Public Property TemperatureC As Integer
        Public Property Summary As String
    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim forecast1 As New Forecast() With
            {.[Date] = Date.Now,
              .Summary = Nothing,
              .TemperatureC = CType(Nothing, Integer)
            }

            Dim options As New JsonSerializerOptions() With {
                .DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingDefault
            }

            Dim forecastJson As String = JsonSerializer.Serialize(forecast1, options)

            Console.WriteLine(forecastJson)
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'{ "Date":"2020-10-21T15:40:06.8920138-07:00"}
```
The `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingDefault` setting also prevents serialization of null-value reference type and nullable value type properties.

## See also

* System.Text.Json overview
* How to serialize and deserialize JSON
