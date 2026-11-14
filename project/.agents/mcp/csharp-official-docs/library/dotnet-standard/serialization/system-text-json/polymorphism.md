---
title: "How to serialize properties of derived classes with System.Text.Json (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/polymorphism.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to serialize properties of derived classes with System.Text.Json

In this article, you learn how to serialize properties of derived classes with the `System.Text.Json` namespace.

## Serialize properties of derived classes

Beginning with .NET 7, `System.Text.Json` supports polymorphic type hierarchy serialization and deserialization with attribute annotations.

| Attribute | Description |
|-----------|-------------|
| `System.Text.Json.Serialization.JsonDerivedTypeAttribute` | When placed on a type declaration, indicates that the specified subtype should be opted into polymorphic serialization. It also exposes the ability to specify a type discriminator. |
| `System.Text.Json.Serialization.JsonPolymorphicAttribute` | When placed on a type declaration, indicates that the type should be serialized polymorphically. It also exposes various options to configure polymorphic serialization and deserialization for that type. |

For example, suppose you have a `WeatherForecastBase` class and a derived class `WeatherForecastWithCity`:

```csharp
[JsonDerivedType(typeof(WeatherForecastWithCity))]
public class WeatherForecastBase
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}
```
```vb
<JsonDerivedType(GetType(WeatherForecastWithCity))>
Public Class WeatherForecastBase
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String
End Class
```
```csharp
public class WeatherForecastWithCity : WeatherForecastBase
{
    public string? City { get; set; }
}
```
```vb
Public Class WeatherForecastWithCity
    Inherits WeatherForecastBase
    Public Property City As String
End Class
```
And suppose the type argument of the `Serialize<TValue>` method at compile time is `WeatherForecastBase`:

```csharp
options = new JsonSerializerOptions
{
    WriteIndented = true
};
jsonString = JsonSerializer.Serialize<WeatherForecastBase>(weatherForecastBase, options);
```
```vb
options = New JsonSerializerOptions With {
    .WriteIndented = True
}
jsonString = JsonSerializer.Serialize(WeatherForecastBase, options)
```
In this scenario, the `City` property is serialized because the `weatherForecastBase` object is actually a `WeatherForecastWithCity` object. This configuration enables polymorphic serialization for `WeatherForecastBase`, specifically when the runtime type is `WeatherForecastWithCity`:

```json
{
  "City": "Milwaukee",
  "Date": "2022-09-26T00:00:00-05:00",
  "TemperatureCelsius": 15,
  "Summary": "Cool"
}
```

While round-tripping of the payload as `WeatherForecastBase` is supported, it won't materialize as a runtime type of `WeatherForecastWithCity`. Instead, it will materialize as a runtime type of `WeatherForecastBase`:

```csharp
WeatherForecastBase value = JsonSerializer.Deserialize<WeatherForecastBase>("""
    {
      "City": "Milwaukee",
      "Date": "2022-09-26T00:00:00-05:00",
      "TemperatureCelsius": 15,
      "Summary": "Cool"
    }
    """);

Console.WriteLine(value is WeatherForecastWithCity); // False
```

```vb
Dim value As WeatherForecastBase = JsonSerializer.Deserialize(@"
    {
      "City": "Milwaukee",
      "Date": "2022-09-26T00:00:00-05:00",
      "TemperatureCelsius": 15,
      "Summary": "Cool"
    }")

Console.WriteLine(value is WeatherForecastWithCity) // False
```

The following section describes how to add metadata to enable round-tripping of the derived type.
