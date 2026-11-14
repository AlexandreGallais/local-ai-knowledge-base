---
title: "How to customize property names and values with System.Text.Json (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/customize-properties.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to customize property names and values with System.Text.Json

By default, property names and dictionary keys are unchanged in the JSON output, including case. Enum values are represented as numbers. And properties are serialized in the order they're defined. However, you can customize these behaviors by:

- Specifying specific serialized property and enum member names.
- Using a built-in naming policy, such as camelCase, PascalCase, snake_case, or kebab-case, for property names and dictionary keys.
- Applying a naming policy to a type or member.
- Using a custom naming policy for property names and dictionary keys.
- Serializing enum values as strings, with or without a naming policy.
- Configuring the order of serialized properties.

> **Note:**
> The web default naming policy is camel case.

For other scenarios that require special handling of JSON property names and values, you can implement custom converters.

## Customize individual property names

To set the name of individual properties, use the [JsonPropertyName] attribute.

Here's an example type to serialize and resulting JSON:

```csharp
public class WeatherForecastWithPropertyName
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
    [JsonPropertyName("Wind")]
    public int WindSpeed { get; set; }
}
```
```vb
Public Class WeatherForecastWithPropertyName
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String

    <JsonPropertyName("Wind")>
    Public Property WindSpeed As Integer

End Class
```
```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
  "Wind": 35
}
```

The property name set by this attribute:

- Applies in both directions, for serialization and deserialization.
- Takes precedence over property naming policies.
- Doesn't affect parameter name matching for parameterized constructors.

## Use a built-in naming policy

The following table shows the built-in naming policies and how they affect property names.

| Naming policy                                             | Description | Original property name | Converted property name |
|-----------------------------------------------------------|-|-----------------------|-------------------------|
| `System.Text.Json.JsonNamingPolicy.CamelCase`        | First word starts with a lower case character.Successive words start with an uppercase character. | `TempCelsius`          | `tempCelsius`           |
| `System.Text.Json.JsonNamingPolicy.PascalCase`\*\*   | First word starts with an uppercase character.Successive words start with an uppercase character. | `tempCelsius`          | `TempCelsius`           |
| `System.Text.Json.JsonNamingPolicy.KebabCaseLower`\* | Words are separated by hyphens.All characters are lowercase. | `TempCelsius`          | `temp-celsius`          |
| `System.Text.Json.JsonNamingPolicy.KebabCaseUpper`\* | Words are separated by hyphens.All characters are uppercase. | `TempCelsius`          | `TEMP-CELSIUS`          |
| `System.Text.Json.JsonNamingPolicy.SnakeCaseLower`\* | Words are separated by underscores.All characters are lowercase. | `TempCelsius`          | `temp_celsius`          |
| `System.Text.Json.JsonNamingPolicy.SnakeCaseUpper`\* | Words are separated by underscores.All characters are uppercase. |`TempCelsius`          | `TEMP_CELSIUS`          |

\* Available in .NET 8 and later versions.

\*\* Available in .NET 11 and later versions.

The following example shows how to use camel case for all JSON property names by setting `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` to `System.Text.Json.JsonNamingPolicy.CamelCase`:

```csharp
var serializeOptions = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};
jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions);
```
```vb
Dim serializeOptions As JsonSerializerOptions = New JsonSerializerOptions With {
    .PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    .WriteIndented = True
}
jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions)
```
Here's an example class to serialize and JSON output:

```csharp
public class WeatherForecastWithPropertyName
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
    [JsonPropertyName("Wind")]
    public int WindSpeed { get; set; }
}
```
```vb
Public Class WeatherForecastWithPropertyName
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String

    <JsonPropertyName("Wind")>
    Public Property WindSpeed As Integer

End Class
```
```json
{
  "date": "2019-08-01T00:00:00-07:00",
  "temperatureCelsius": 25,
  "summary": "Hot",
  "Wind": 35
}
```

The naming policy:

- Applies to serialization and deserialization.
- Is overridden by `[JsonPropertyName]` attributes. This is why the JSON property name `Wind` in the example is not camel case.

> **Note:**
> None of the built-in naming policies support letters that are surrogate pairs. For more information, see dotnet/runtime issue 90352.

## Apply a naming policy to a type or member

Starting in .NET 11, apply `System.Text.Json.Serialization.JsonNamingPolicyAttribute` to a class, struct, interface, property, or field. Pass a `System.Text.Json.Serialization.JsonKnownNamingPolicy` value to select a built-in policy. A type-level attribute sets the naming policy for the type's properties and fields. A member-level attribute sets the policy for one property or field.

The following example sets a type-level policy and overrides it for one property:

```csharp
[JsonNamingPolicy(JsonKnownNamingPolicy.CamelCase)]
public class WeatherForecast
{
    public int TemperatureCelsius { get; set; }
    [JsonNamingPolicy(JsonKnownNamingPolicy.SnakeCaseLower)] public string? SummaryText { get; set; }
}
```

```vb
<JsonNamingPolicy(JsonKnownNamingPolicy.CamelCase)>
Public Class WeatherForecast
    Public Property TemperatureCelsius As Integer
    <JsonNamingPolicy(JsonKnownNamingPolicy.SnakeCaseLower)> Public Property SummaryText As String
End Class
```

For `TemperatureCelsius = 25` and `SummaryText = "Hot"`, the resulting JSON is `{"temperatureCelsius":25,"summary_text":"Hot"}`.

The serializer selects a JSON property name in this order, from highest to lowest precedence:

- A `System.Text.Json.Serialization.JsonPropertyNameAttribute` on the property or field.
- A member-level `System.Text.Json.Serialization.JsonNamingPolicyAttribute`.
- A type-level `System.Text.Json.Serialization.JsonNamingPolicyAttribute`.
- `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy`.
- The original member name.

The protected constructor lets a derived attribute supply a custom `System.Text.Json.JsonNamingPolicy`. Reflection-based serialization evaluates the custom policy at run time.

Source generation can't execute a custom policy at compile time. For affected members, it uses the original CLR name and doesn't apply the global `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy`.

## Use a custom JSON property naming policy

To use a custom JSON property naming policy, create a class that derives from `System.Text.Json.JsonNamingPolicy` and override the `System.Text.Json.JsonNamingPolicy.ConvertName*` method, as shown in the following example:

```csharp
﻿using System.Text.Json;

namespace SystemTextJsonSamples
{
    public class UpperCaseNamingPolicy : JsonNamingPolicy
    {
        public override string ConvertName(string name) =>
            name.ToUpper();
    }
}
```
```vb
﻿Imports System.Text.Json

Namespace SystemTextJsonSamples

    Public Class UpperCaseNamingPolicy
        Inherits JsonNamingPolicy

        Public Overrides Function ConvertName(name As String) As String
            Return name.ToUpper()
        End Function

    End Class

End Namespace
```
Then set the `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` property to an instance of your naming policy class:

```csharp
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = new UpperCaseNamingPolicy(),
    WriteIndented = true
};
jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
```vb
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .PropertyNamingPolicy = New UpperCaseNamingPolicy,
    .WriteIndented = True
}
jsonString = JsonSerializer.Serialize(weatherForecast1, options)
```
Here's an example class to serialize and JSON output:

```csharp
public class WeatherForecastWithPropertyName
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
    [JsonPropertyName("Wind")]
    public int WindSpeed { get; set; }
}
```
```vb
Public Class WeatherForecastWithPropertyName
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String

    <JsonPropertyName("Wind")>
    Public Property WindSpeed As Integer

End Class
```
```json
{
  "DATE": "2019-08-01T00:00:00-07:00",
  "TEMPERATURECELSIUS": 25,
  "SUMMARY": "Hot",
  "Wind": 35
}
```

The JSON property naming policy:

- Applies to serialization and deserialization.
- Is overridden by `[JsonPropertyName]` attributes. This is why the JSON property name `Wind` in the example is not upper case.

## Use a naming policy for dictionary keys

If a property of an object to be serialized is of type `Dictionary<string,TValue>`, the `string` keys can be converted using a naming policy, such as camel case. To do that, set `System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy` to your desired naming policy. The following example uses the `CamelCase` naming policy:

```csharp
var options = new JsonSerializerOptions
{
    DictionaryKeyPolicy = JsonNamingPolicy.CamelCase,
    WriteIndented = true
};
jsonString = JsonSerializer.Serialize(weatherForecast, options);
```
```vb
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .DictionaryKeyPolicy = JsonNamingPolicy.CamelCase,
    .WriteIndented = True
}
jsonString = JsonSerializer.Serialize(weatherForecast, options)
```
Serializing an object with a dictionary named `TemperatureRanges` that has key-value pairs `"ColdMinTemp", 20` and `"HotMinTemp", 40` would result in JSON output like the following example:

```json
{
  "Date": "2019-08-01T00:00:00-07:00",
  "TemperatureCelsius": 25,
  "Summary": "Hot",
  "TemperatureRanges": {
    "coldMinTemp": 20,
    "hotMinTemp": 40
  }
}
```

Naming policies for dictionary keys apply to serialization only. If you deserialize a dictionary, the keys will match the JSON file even if you set `System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy` to a non-default naming policy.
