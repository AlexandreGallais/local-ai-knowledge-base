---
title: "How to enable case-insensitive property name matching with System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/character-casing.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to enable case-insensitive property name matching with System.Text.Json

In this article, you learn how to enable case-insensitive property name matching with the `System.Text.Json` namespace.

## Case-insensitive property matching

By default, deserialization looks for case-sensitive property name matches between JSON and the target object properties. To change that behavior, set `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive` to `true`:

> **Note:**
> The web default is case-insensitive.

```csharp
var options = new JsonSerializerOptions
{
    PropertyNameCaseInsensitive = true
};
WeatherForecast? weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString, options);
```
```vb
Dim options As JsonSerializerOptions = New JsonSerializerOptions With {
    .PropertyNameCaseInsensitive = True
}
Dim weatherForecast1 = JsonSerializer.Deserialize(Of WeatherForecast)(jsonString, options)
```
Here's example JSON with camel case property names. It can be deserialized into the following type that has Pascal case property names.

```json
{
  "date": "2019-08-01T00:00:00-07:00",
  "temperatureCelsius": 25,
  "summary": "Hot"
}
```

```csharp
public class WeatherForecast
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}
```
```vb
Public Class WeatherForecast
    Public Property [Date] As DateTimeOffset
    Public Property TemperatureCelsius As Integer
    Public Property Summary As String
End Class
```
## See also

* System.Text.Json overview
* How to serialize and deserialize JSON
