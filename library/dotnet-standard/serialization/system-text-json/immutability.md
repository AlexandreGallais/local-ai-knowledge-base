---
title: "Use immutable types and properties"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/immutability.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Use immutable types and properties

An immutable *type* is one that prevents you from changing any property or field values of an object after it's instantiated. The type might be a record, have no public properties or fields, have read-only properties, or have properties with private or init-only setters. `System.String` is an example of an immutable type. `System.Text.Json` provides different ways that you can deserialize JSON to immutable types.

## Parameterized constructors

By default, `System.Text.Json` uses the default public parameterless constructor. However, you can tell it to use a parameterized constructor, which makes it possible to deserialize an immutable class or struct.

- For a class, if the only constructor is a parameterized one, that constructor will be used.
- For a struct, or a class with multiple constructors, specify the one to use by applying the [JsonConstructor] attribute. When the attribute is not used, a public parameterless constructor is always used if present.

  The following example uses the `[JsonConstructor]` attribute:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace ImmutableTypes
{
    public struct Forecast
    {
        public DateTime Date { get; }
        public int TemperatureC { get; }
        public string Summary { get; }

        [JsonConstructor]
        public Forecast(DateTime date, int temperatureC, string summary) =>
            (Date, TemperatureC, Summary) = (date, temperatureC, summary);
    }

    public class Program
    {
        public static void Run()
        {
            string json = """
                {
                    "date":"2020-09-06T11:31:01.923395-07:00",
                    "temperatureC":-1,
                    "summary":"Cold"
                }
                """;
            Console.WriteLine($"Input JSON: {json}");

            var options = JsonSerializerOptions.Web;

            Forecast forecast = JsonSerializer.Deserialize<Forecast>(json, options);

            Console.WriteLine($"forecast.Date: {forecast.Date}");
            Console.WriteLine($"forecast.TemperatureC: {forecast.TemperatureC}");
            Console.WriteLine($"forecast.Summary: {forecast.Summary}");

            string roundTrippedJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);

            Console.WriteLine($"Output JSON: {roundTrippedJson}");
        }
    }
}

// Produces output like the following example:
//
//Input JSON: { "date":"2020-09-06T11:31:01.923395-07:00","temperatureC":-1,"summary":"Cold"}
//forecast.Date: 9 / 6 / 2020 11:31:01 AM
//forecast.TemperatureC: -1
//forecast.Summary: Cold
//Output JSON: { "date":"2020-09-06T11:31:01.923395-07:00","temperatureC":-1,"summary":"Cold"}
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace ImmutableTypes

    Public Structure Forecast
        Public ReadOnly Property [Date] As Date
        Public ReadOnly Property TemperatureC As Integer
        Public ReadOnly Property Summary As String

        <JsonConstructor>
        Public Sub New([Date] As Date, TemperatureC As Integer, Summary As String)
            Me.Date = [Date]
            Me.TemperatureC = TemperatureC
            Me.Summary = Summary
        End Sub

    End Structure

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim json As String = "{""date"":""2020-09-06T11:31:01.923395-07:00"",""temperatureC"":-1,""summary"":""Cold""}"
            Console.WriteLine($"Input JSON: {json}")

            Dim forecast1 As Forecast = JsonSerializer.Deserialize(Of Forecast)(json, JsonSerializerOptions.Web)

            Console.WriteLine($"forecast.Date: {forecast1.[Date]}")
            Console.WriteLine($"forecast.TemperatureC: {forecast1.TemperatureC}")
            Console.WriteLine($"forecast.Summary: {forecast1.Summary}")

            Dim roundTrippedJson As String = JsonSerializer.Serialize(forecast1, JsonSerializerOptions.Web)

            Console.WriteLine($"Output JSON: {roundTrippedJson}")
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'Input JSON: { "date":"2020-09-06T11:31:01.923395-07:00","temperatureC":-1,"summary":"Cold"}
'forecast.Date: 9 / 6 / 2020 11:31:01 AM
'forecast.TemperatureC: -1
'forecast.Summary: Cold
'Output JSON: { "date":"2020-09-06T11:31:01.923395-07:00","temperatureC":-1,"summary":"Cold"}
```
  In .NET 7 and earlier versions, the `[JsonConstructor]` attribute can only be used with public constructors.

In .NET 8 and later versions, reflection mode supports non-public constructors marked with `[JsonConstructor]`. Starting in .NET 11, source-generation mode supports them too.

The parameter names of a parameterized constructor must match the property names and types. Matching is case-insensitive, and the constructor parameter must match the actual property name even if you use [JsonPropertyName] to rename a property. In the following example, the name for the `TemperatureC` property is changed to `celsius` in the JSON, but the constructor parameter is still named `temperatureC`:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace ImmutableTypesCtorParms
{
    public readonly struct Forecast
    {
        public DateTime Date { get; }
        [JsonPropertyName("celsius")]
        public int TemperatureC { get; }
        public string Summary { get; }

        [JsonConstructor]
        public Forecast(DateTime date, int temperatureC, string summary) =>
            (Date, TemperatureC, Summary) = (date, temperatureC, summary);
    }

    public class Program
    {
        public static void Run()
        {
            string json = """
                {
                    "date":"2020-09-06T11:31:01.923395-07:00",
                    "celsius":-1,
                    "summary":"Cold"
                }
                """;
            Console.WriteLine($"Input JSON: {json}");

            var options = JsonSerializerOptions.Web;

            Forecast forecast = JsonSerializer.Deserialize<Forecast>(json, options);

            Console.WriteLine($"forecast.Date: {forecast.Date}");
            Console.WriteLine($"forecast.TemperatureC: {forecast.TemperatureC}");
            Console.WriteLine($"forecast.Summary: {forecast.Summary}");

            string roundTrippedJson =
                JsonSerializer.Serialize<Forecast>(forecast, options);

            Console.WriteLine($"Output JSON: {roundTrippedJson}");

        }
    }
}

// Produces output like the following example:
//
//Input JSON: { "date":"2020-09-06T11:31:01.923395-07:00","celsius":-1,"summary":"Cold"}
//forecast.Date: 9 / 6 / 2020 11:31:01 AM
//forecast.TemperatureC: -1
//forecast.Summary: Cold
//Output JSON: { "date":"2020-09-06T11:31:01.923395-07:00","celsius":-1,"summary":"Cold"}
```
Besides `[JsonPropertyName]`, the following attributes support deserialization with parameterized constructors:

- [JsonConverter]
- [JsonIgnore]
- [JsonInclude]
- [JsonNumberHandling]

## By-reference constructor parameters

Starting in .NET 11, `JsonSerializer` deserializes types whose constructor parameters use the `in`, `ref`, `out`, and `ref readonly` modifiers.

| Parameter modifier | Deserialization behavior |
|--------------------|--------------------------|
| `in`, `ref`, and `ref readonly` | The serializer binds each parameter by name and uses its underlying element type for type matching. |
| `out` | The serializer doesn't bind the parameter to JSON. It discards the value that the constructor assigns. |

In the following constructor, the serializer binds `temperatureC` from JSON. It doesn't bind `isValid`:

```csharp
public Forecast(in int temperatureC, out bool isValid)
{
    TemperatureC = temperatureC;
    isValid = true;
}
```

In Visual Basic, a `ByRef` constructor parameter follows the `ref` behavior shown in the table:

```vb
Public Sub New(ByRef temperatureC As Integer)
    TemperatureC = temperatureC
End Sub
```

## Records

Records are also supported for both serialization and deserialization, as shown in the following example:

```csharp
﻿using System.Text.Json;

namespace Records
{
    public record Forecast(DateTime Date, int TemperatureC)
    {
        public string? Summary { get; init; }
    };

    public class Program
    {
        public static void Run()
        {
            Forecast forecast = new(DateTime.Now, 40)
            {
                Summary = "Hot!"
            };

            string forecastJson = JsonSerializer.Serialize<Forecast>(forecast);
            Console.WriteLine(forecastJson);
            Forecast? forecastObj = JsonSerializer.Deserialize<Forecast>(forecastJson);
            Console.WriteLine(forecastObj);
        }
    }
}

// Produces output like the following example:
//
//{ "Date":"2020-10-21T15:26:10.5044594-07:00","TemperatureC":40,"Summary":"Hot!"}
//Forecast { Date = 10 / 21 / 2020 3:26:10 PM, TemperatureC = 40, Summary = Hot! }
```
You can apply any of the attributes to the property names, using the `property:` target on the attribute. For more information on positional records, see the article on records in the C# language reference.

## Non-public members and property accessors

You can enable use of a non-public *accessor* on a property by using the [JsonInclude] attribute, as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace NonPublicAccessors
{
    public class Forecast
    {
        public DateTime Date { get; init; }

        [JsonInclude]
        public int TemperatureC { get; private set; }

        [JsonInclude]
        public string? Summary { private get; set; }
    };

    public class Program
    {
        public static void Run()
        {
            string json = """
                {
                    "Date":"2020-10-23T09:51:03.8702889-07:00",
                    "TemperatureC":40,
                    "Summary":"Hot"
                }
                """;
            Console.WriteLine($"Input JSON: {json}");

            Forecast forecastDeserialized = JsonSerializer.Deserialize<Forecast>(json)!;
            Console.WriteLine($"Date: {forecastDeserialized.Date}");
            Console.WriteLine($"TemperatureC: {forecastDeserialized.TemperatureC}");

            json = JsonSerializer.Serialize<Forecast>(forecastDeserialized);
            Console.WriteLine($"Output JSON: {json}");
        }
    }
}

// Produces output like the following example:
//
//Input JSON: { "Date":"2020-10-23T09:51:03.8702889-07:00","TemperatureC":40,"Summary":"Hot"}
//Date: 10 / 23 / 2020 9:51:03 AM
//TemperatureC: 40
//Output JSON: { "Date":"2020-10-23T09:51:03.8702889-07:00","TemperatureC":40,"Summary":"Hot"}
```
```vb
﻿Imports System.Text.Json
Imports System.Text.Json.Serialization

Namespace NonPublicAccessors

    Public Class Forecast
        Public Property [Date] As Date

        Private _temperatureC As Integer

        <JsonInclude>
        Public Property TemperatureC As Integer
            Get
                Return _temperatureC
            End Get
            Private Set(Value As Integer)
                _temperatureC = Value
            End Set
        End Property

        Private _summary As String

        <JsonInclude>
        Public Property Summary As String
            Private Get
                Return _summary
            End Get
            Set(Value As String)
                _summary = Value
            End Set
        End Property

    End Class

    Public NotInheritable Class Program

        Public Shared Sub Main()
            Dim json As String = "{""Date"":""2020-10-23T09:51:03.8702889-07:00"",""TemperatureC"":40,""Summary"":""Hot""}"
            Console.WriteLine($"Input JSON: {json}")

            Dim forecastDeserialized As Forecast = JsonSerializer.Deserialize(Of Forecast)(json)
            Console.WriteLine($"Date: {forecastDeserialized.[Date]}")
            Console.WriteLine($"TemperatureC: {forecastDeserialized.TemperatureC}")

            json = JsonSerializer.Serialize(forecastDeserialized)
            Console.WriteLine($"Output JSON: {json}")
        End Sub

    End Class

End Namespace

' Produces output like the following example:
'
'Input JSON: { "Date":"2020-10-23T09:51:03.8702889-07:00","TemperatureC":40,"Summary":"Hot"}
'Date: 10 / 23 / 2020 9:51:03 AM
'TemperatureC: 40
'Output JSON: { "Date":"2020-10-23T09:51:03.8702889-07:00","TemperatureC":40,"Summary":"Hot"}
```
By including a property with a private setter, you can still deserialize that property.

In .NET 8 and later versions, you can also use the [JsonInclude] attribute to opt non-public *members* into the serialization contract for a given type.

Starting in .NET 11, source generation supports `private`, `internal`, and `protected` members that you mark with `[JsonInclude]`. It also supports `private`, `internal`, and `protected` accessors on properties that you mark with `[JsonInclude]`. Source generation also supports inaccessible constructors marked with [JsonConstructor].

> **Note:**
> In .NET 10 and earlier versions, source generation doesn't support `private` or `protected` members or accessors. Applying the [JsonInclude] attribute to the member or property doesn't remove this limitation. Source generation supports `internal` members and accessors only when they're in the same assembly as the generated `System.Text.Json.Serialization.JsonSerializerContext`. It doesn't support inaccessible constructors, even when you mark them with `[JsonConstructor]`.

## Init-only properties

`System.Text.Json` deserializes `init`-only properties like any other settable property. Starting in .NET 11, a source-generated setter runs only when the JSON payload contains the property. An omitted property retains its initializer value.

## Read-only properties

In .NET 8 and later versions, read-only properties, or those that have no setter either private or public, can also be deserialized. While you can't change the instance that the property references, if the type of the property is mutable, you can modify it. For example, you can add an element to a list. To deserialize a read-only property, you need to set its object creation handling behavior to *populate* instead of *replace*. For example, you can annotate the property with the `System.Text.Json.Serialization.JsonObjectCreationHandlingAttribute` attribute.

  ```csharp
  class A
  {
      [JsonObjectCreationHandling(JsonObjectCreationHandling.Populate)]
      public List<int> Numbers1 { get; } = new List<int>() { 1, 2, 3 };
  }
  ```

For more information, see Populate initialized properties.

## See also

- System.Text.Json overview
- How to serialize and deserialize JSON
