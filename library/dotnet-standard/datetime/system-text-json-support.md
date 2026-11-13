---
title: "DateTime and DateTimeOffset support in System.Text.Json (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/system-text-json-support.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# DateTime and DateTimeOffset support in System.Text.Json

The `System.Text.Json` library parses and writes `System.DateTime` and `System.DateTimeOffset` values according to the ISO 8601-1:2019 extended profile.
Converters provide custom support for serializing and deserializing with `System.Text.Json.JsonSerializer`. You can also use `System.Text.Json.Utf8JsonReader` and `System.Text.Json.Utf8JsonWriter` to implement custom support.

## Support for the ISO 8601-1:2019 format

The `System.Text.Json.JsonSerializer`, `System.Text.Json.Utf8JsonReader`, `System.Text.Json.Utf8JsonWriter`,
and `System.Text.Json.JsonElement` types parse and write `System.DateTime` and `System.DateTimeOffset`
text representations according to the extended profile of the ISO 8601-1:2019 format, for example, `2019-07-26T16:59:57-05:00`.

`System.DateTime` and `System.DateTimeOffset` data can be serialized with `System.Text.Json.JsonSerializer`:

```csharp
﻿using System.Text.Json;

public class Example
{
    private class Product
    {
        public string? Name { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

    public static void Main(string[] args)
    {
        Product p = new Product();
        p.Name = "Banana";
        p.ExpiryDate = new DateTime(2019, 7, 26);

        string json = JsonSerializer.Serialize(p);
        Console.WriteLine(json);
    }
}

// The example displays the following output:
// {"Name":"Banana","ExpiryDate":"2019-07-26T00:00:00"}
```
`System.DateTime` and `System.DateTimeOffset` can also be deserialized with `System.Text.Json.JsonSerializer`:

```csharp
﻿using System.Text.Json;

public class Example
{
    private class Product
    {
        public string? Name { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

    public static void Main(string[] args)
    {
        string json = @"{""Name"":""Banana"",""ExpiryDate"":""2019-07-26T00:00:00""}";
        Product p = JsonSerializer.Deserialize<Product>(json)!;
        Console.WriteLine(p.Name);
        Console.WriteLine(p.ExpiryDate);
    }
}

// The example displays output similar to the following:
// Banana
// 7/26/2019 12:00:00 AM
```
With default options, input `System.DateTime` and `System.DateTimeOffset` text representations must conform to the extended ISO 8601-1:2019 profile. If you attempt to deserialize representations that don't conform to the profile, `System.Text.Json.JsonSerializer` throws a `System.Text.Json.JsonException`:

```csharp
﻿using System.Text.Json;

public class Example
{
    private class Product
    {
        public string? Name { get; set; }
        public DateTime ExpiryDate { get; set; }
    }

    public static void Main(string[] args)
    {
        string json = @"{""Name"":""Banana"",""ExpiryDate"":""26/07/2019""}";
        try
        {
            Product _ = JsonSerializer.Deserialize<Product>(json)!;
        }
        catch (JsonException e)
        {
            Console.WriteLine(e.Message);
        }
    }
}

// The example displays the following output:
// The JSON value could not be converted to System.DateTime. Path: $.ExpiryDate | LineNumber: 0 | BytePositionInLine: 42.
```
`System.Text.Json.JsonDocument` provides structured access to the contents of a JSON payload, including `System.DateTime` and `System.DateTimeOffset` representations. The following example shows how to calculate the average
temperature on Mondays from a collection of temperatures:

```csharp
﻿using System.Text.Json;

public class Example
{
    private static double ComputeAverageTemperatures(string json)
    {
        JsonDocumentOptions options = new JsonDocumentOptions
        {
            AllowTrailingCommas = true
        };

        using (JsonDocument document = JsonDocument.Parse(json, options))
        {
            int sumOfAllTemperatures = 0;
            int count = 0;

            foreach (JsonElement element in document.RootElement.EnumerateArray())
            {
                DateTimeOffset date = element.GetProperty("date").GetDateTimeOffset();

                if (date.DayOfWeek == DayOfWeek.Monday)
                {
                    int temp = element.GetProperty("temp").GetInt32();
                    sumOfAllTemperatures += temp;
                    count++;
                }
            }

            double averageTemp = (double)sumOfAllTemperatures / count;
            return averageTemp;
        }
    }

    public static void Main(string[] args)
    {
        string json =
                @"[" +
                    @"{" +
                        @"""date"": ""2013-01-07T00:00:00Z""," +
                        @"""temp"": 23," +
                    @"}," +
                    @"{" +
                        @"""date"": ""2013-01-08T00:00:00Z""," +
                        @"""temp"": 28," +
                    @"}," +
                    @"{" +
                        @"""date"": ""2013-01-14T00:00:00Z""," +
                        @"""temp"": 8," +
                    @"}," +
                @"]";

        Console.WriteLine(ComputeAverageTemperatures(json));
    }
}

// The example displays the following output:
// 15.5
```
If you attempt to compute the average temperature given a payload with non-compliant `System.DateTime` representations, `System.Text.Json.JsonDocument` throws a `System.FormatException`:

```csharp
﻿using System.Text.Json;

public class Example
{
    private static double ComputeAverageTemperatures(string json)
    {
        JsonDocumentOptions options = new JsonDocumentOptions
        {
            AllowTrailingCommas = true
        };

        using (JsonDocument document = JsonDocument.Parse(json, options))
        {
            int sumOfAllTemperatures = 0;
            int count = 0;

            foreach (JsonElement element in document.RootElement.EnumerateArray())
            {
                DateTimeOffset date = element.GetProperty("date").GetDateTimeOffset();

                if (date.DayOfWeek == DayOfWeek.Monday)
                {
                    int temp = element.GetProperty("temp").GetInt32();
                    sumOfAllTemperatures += temp;
                    count++;
                }
            }

            double averageTemp = (double)sumOfAllTemperatures / count;
            return averageTemp;
        }
    }

    public static void Main(string[] args)
    {
        // Computing the average temperatures will fail because the DateTimeOffset
        // values in the payload do not conform to the extended ISO 8601-1:2019 profile.
        string json =
                @"[" +
                    @"{" +
                        @"""date"": ""2013/01/07 00:00:00Z""," +
                        @"""temp"": 23," +
                    @"}," +
                    @"{" +
                        @"""date"": ""2013/01/08 00:00:00Z""," +
                        @"""temp"": 28," +
                    @"}," +
                    @"{" +
                        @"""date"": ""2013/01/14 00:00:00Z""," +
                        @"""temp"": 8," +
                    @"}," +
                @"]";

        Console.WriteLine(ComputeAverageTemperatures(json));
    }
}

// The example displays the following output:
// Unhandled exception.System.FormatException: One of the identified items was in an invalid format.
//    at System.Text.Json.JsonElement.GetDateTimeOffset()
```
The lower level `System.Text.Json.Utf8JsonWriter` writes `System.DateTime` and `System.DateTimeOffset` data:

```csharp
﻿using System.Text;
using System.Text.Json;

public class Example
{
    public static void Main(string[] args)
    {
        JsonWriterOptions options = new JsonWriterOptions
        {
            Indented = true
        };

        using (MemoryStream stream = new MemoryStream())
        {
            using (Utf8JsonWriter writer = new Utf8JsonWriter(stream, options))
            {
                writer.WriteStartObject();
                writer.WriteString("date", DateTimeOffset.UtcNow);
                writer.WriteNumber("temp", 42);
                writer.WriteEndObject();
            }

            string json = Encoding.UTF8.GetString(stream.ToArray());
            Console.WriteLine(json);
        }
    }
}

// The example output similar to the following:
// {
//     "date": "2019-07-26T00:00:00+00:00",
//     "temp": 42
// }
```
`System.Text.Json.Utf8JsonReader` parses `System.DateTime` and `System.DateTimeOffset` data:

```csharp
﻿using System.Text;
using System.Text.Json;

public class Example
{
    public static void Main(string[] args)
    {
        byte[] utf8Data = Encoding.UTF8.GetBytes(@"""2019-07-26T00:00:00""");

        Utf8JsonReader json = new Utf8JsonReader(utf8Data);
        while (json.Read())
        {
            if (json.TokenType == JsonTokenType.String)
            {
                Console.WriteLine(json.TryGetDateTime(out DateTime datetime));
                Console.WriteLine(datetime);
                Console.WriteLine(json.GetDateTime());
            }
        }
    }
}

// The example displays output similar to the following:
// True
// 7/26/2019 12:00:00 AM
// 7/26/2019 12:00:00 AM
```
If you attempt to read non-compliant formats with `System.Text.Json.Utf8JsonReader`, it throws a `System.FormatException`:

```csharp
﻿using System.Text;
using System.Text.Json;

public class Example
{
    public static void Main(string[] args)
    {
        byte[] utf8Data = Encoding.UTF8.GetBytes(@"""2019/07/26 00:00:00""");

        Utf8JsonReader json = new Utf8JsonReader(utf8Data);
        while (json.Read())
        {
            if (json.TokenType == JsonTokenType.String)
            {
                Console.WriteLine(json.TryGetDateTime(out DateTime datetime));
                Console.WriteLine(datetime);

                DateTime _ = json.GetDateTime();
            }
        }
    }
}

// The example displays the following output:
// False
// 1/1/0001 12:00:00 AM
// Unhandled exception. System.FormatException: The JSON value is not in a supported DateTime format.
//     at System.Text.Json.Utf8JsonReader.GetDateTime()
```
## Serialize DateOnly and TimeOnly properties

Starting in .NET 7, `System.Text.Json` supports serializing and deserializing `System.DateOnly` and `System.TimeOnly` types. Consider the following object:

```csharp
sealed file record Appointment(
    Guid Id,
    string Description,
    DateOnly Date,
    TimeOnly StartTime,
    TimeOnly EndTime);
```
The following example serializes an `Appointment` object, displays the resulting JSON, and then deserializes it back into a new instance of the `Appointment` type. Finally, the original and newly deserialized instances are compared for equality and the results are written to the console:

```csharp
Appointment originalAppointment = new(
    Id: Guid.NewGuid(),
    Description: "Take dog to veterinarian.",
    Date: new DateOnly(2002, 1, 13),
    StartTime: new TimeOnly(5,15),
    EndTime: new TimeOnly(5, 45));
string serialized = JsonSerializer.Serialize(originalAppointment);

Console.WriteLine($"Resulting JSON: {serialized}");

Appointment deserializedAppointment =
    JsonSerializer.Deserialize<Appointment>(serialized)!;

bool valuesAreTheSame = originalAppointment == deserializedAppointment;
Console.WriteLine($"""
    Original record has the same values as the deserialized record: {valuesAreTheSame}
    """);
```
In the preceding code:

- An `Appointment` object is instantiated and assigned to the `appointment` variable.
- The `appointment` instance is serialized to JSON using `System.Text.Json.JsonSerializer.Serialize*`.
- The resulting JSON is written to the console.
- The JSON is deserialized back into a new instance of the `Appointment` type using `System.Text.Json.JsonSerializer.Deserialize*`.
- The original and newly deserialized instances are compared for equality.
- The result of the comparison is written to the console.
