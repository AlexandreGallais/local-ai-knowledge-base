---
title: "How to use a JSON DOM in System.Text.Json (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/use-dom.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use a JSON DOM in System.Text.Json (part 2 of 4)

## Use `JsonNode`

The following example shows how to use `System.Text.Json.Nodes.JsonNode` and the other types in the `System.Text.Json.Nodes` namespace to:

* Create a DOM from a JSON string
* Write JSON from a DOM.
* Get a value, object, or array from a DOM.

```csharp
﻿using System.Text.Json;
using System.Text.Json.Nodes;

namespace JsonNodeFromStringExample;

public class Program
{
    public static void Main()
    {
        string jsonString = """
            {
              "Date": "2019-08-01T00:00:00",
              "Temperature": 25,
              "Summary": "Hot",
              "DatesAvailable": [
                "2019-08-01T00:00:00",
                "2019-08-02T00:00:00"
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
              }
            }
            """;
        // Create a JsonNode DOM from a JSON string.
        JsonNode forecastNode = JsonNode.Parse(jsonString)!;

        // Write JSON from a JsonNode
        var options = new JsonSerializerOptions { WriteIndented = true };
        Console.WriteLine(forecastNode!.ToJsonString(options));
        // output:
        //{
        //  "Date": "2019-08-01T00:00:00",
        //  "Temperature": 25,
        //  "Summary": "Hot",
        //  "DatesAvailable": [
        //    "2019-08-01T00:00:00",
        //    "2019-08-02T00:00:00"
        //  ],
        //  "TemperatureRanges": {
        //    "Cold": {
        //      "High": 20,
        //      "Low": -10
        //    },
        //    "Hot": {
        //      "High": 60,
        //      "Low": 20
        //    }
        //  }
        //}

        // Get value from a JsonNode.
        JsonNode temperatureNode = forecastNode!["Temperature"]!;
        Console.WriteLine($"Type={temperatureNode.GetType()}");
        Console.WriteLine($"JSON={temperatureNode.ToJsonString()}");
        //output:
        //Type = System.Text.Json.Nodes.JsonValue`1[System.Text.Json.JsonElement]
        //JSON = 25

        // Get a typed value from a JsonNode.
        int temperatureInt = (int)forecastNode!["Temperature"]!;
        Console.WriteLine($"Value={temperatureInt}");
        //output:
        //Value=25

        // Get a typed value from a JsonNode by using GetValue<T>.
        temperatureInt = forecastNode!["Temperature"]!.GetValue<int>();
        Console.WriteLine($"TemperatureInt={temperatureInt}");
        //output:
        //Value=25

        // Get a JSON object from a JsonNode.
        JsonNode temperatureRanges = forecastNode!["TemperatureRanges"]!;
        Console.WriteLine($"Type={temperatureRanges.GetType()}");
        Console.WriteLine($"JSON={temperatureRanges.ToJsonString()}");
        //output:
        //Type = System.Text.Json.Nodes.JsonObject
        //JSON = { "Cold":{ "High":20,"Low":-10},"Hot":{ "High":60,"Low":20} }

        // Get a JSON array from a JsonNode.
        JsonNode datesAvailable = forecastNode!["DatesAvailable"]!;
        Console.WriteLine($"Type={datesAvailable.GetType()}");
        Console.WriteLine($"JSON={datesAvailable.ToJsonString()}");
        //output:
        //datesAvailable Type = System.Text.Json.Nodes.JsonArray
        //datesAvailable JSON =["2019-08-01T00:00:00", "2019-08-02T00:00:00"]

        // Get an array element value from a JsonArray.
        JsonNode firstDateAvailable = datesAvailable[0]!;
        Console.WriteLine($"Type={firstDateAvailable.GetType()}");
        Console.WriteLine($"JSON={firstDateAvailable.ToJsonString()}");
        //output:
        //Type = System.Text.Json.Nodes.JsonValue`1[System.Text.Json.JsonElement]
        //JSON = "2019-08-01T00:00:00"

        // Get a typed value by chaining references.
        int coldHighTemperature = (int)forecastNode["TemperatureRanges"]!["Cold"]!["High"]!;
        Console.WriteLine($"TemperatureRanges.Cold.High={coldHighTemperature}");
        //output:
        //TemperatureRanges.Cold.High = 20

        // Parse a JSON array
        var datesNode = JsonNode.Parse(@"[""2019-08-01T00:00:00"",""2019-08-02T00:00:00""]");
        JsonNode firstDate = datesNode![0]!.GetValue<DateTime>();
        Console.WriteLine($"firstDate={ firstDate}");
        //output:
        //firstDate = "2019-08-01T00:00:00"
    }
}
```
### Create a JsonNode DOM with object initializers and make changes

The following example shows how to:

* Create a DOM by using object initializers.
* Make changes to a DOM.

```csharp
﻿using System.Text.Json;
using System.Text.Json.Nodes;

namespace JsonNodeFromObjectExample;

public class Program
{
    public static void Main()
    {
        // Create a new JsonObject using object initializers.
        var forecastObject = new JsonObject
        {
            ["Date"] = new DateTime(2019, 8, 1),
            ["Temperature"] = 25,
            ["Summary"] = "Hot",
            ["DatesAvailable"] = new JsonArray(
                new DateTime(2019, 8, 1), new DateTime(2019, 8, 2)),
            ["TemperatureRanges"] = new JsonObject
            {
                ["Cold"] = new JsonObject
                {
                    ["High"] = 20,
                    ["Low"] = -10
                }
            },
            ["SummaryWords"] = new JsonArray("Cool", "Windy", "Humid")
        };

        // Add an object.
        forecastObject!["TemperatureRanges"]!["Hot"] =
            new JsonObject { ["High"] = 60, ["Low"] = 20 };

        // Remove a property.
        forecastObject.Remove("SummaryWords");

        // Change the value of a property.
        forecastObject["Date"] = new DateTime(2019, 8, 3);

        var options = new JsonSerializerOptions { WriteIndented = true };
        Console.WriteLine(forecastObject.ToJsonString(options));
        //output:
        //{
        //  "Date": "2019-08-03T00:00:00",
        //  "Temperature": 25,
        //  "Summary": "Hot",
        //  "DatesAvailable": [
        //    "2019-08-01T00:00:00",
        //    "2019-08-02T00:00:00"
        //  ],
        //  "TemperatureRanges": {
        //    "Cold": {
        //      "High": 20,
        //      "Low": -10
        //    },
        //    "Hot": {
        //      "High": 60,
        //      "Low": 20
        //    }
        //  }
        //}
    }
}
```
### Deserialize subsections of a JSON payload

The following example shows how to use JsonNode to navigate to a subsection of a JSON tree and deserialize a single value, a custom type, or an array from that subsection.

```csharp
﻿using System.Text.Json;
using System.Text.Json.Nodes;

namespace JsonNodePOCOExample;

public class TemperatureRanges : Dictionary<string, HighLowTemps>
{
}

public class HighLowTemps
{
    public int High { get; set; }
    public int Low { get; set; }
}

public class Program
{
    public static DateTime[]? DatesAvailable { get; set; }

    public static void Main()
    {
        string jsonString = """
            {
              "Date": "2019-08-01T00:00:00",
              "Temperature": 25,
              "Summary": "Hot",
              "DatesAvailable": [
                "2019-08-01T00:00:00",
                "2019-08-02T00:00:00"
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
              }
            }
            """;
        // Parse all of the JSON.
        JsonNode forecastNode = JsonNode.Parse(jsonString)!;

        // Get a single value
        int hotHigh = forecastNode["TemperatureRanges"]!["Hot"]!["High"]!.GetValue<int>();
        Console.WriteLine($"Hot.High={hotHigh}");
        // output:
        //Hot.High=60

        // Get a subsection and deserialize it into a custom type.
        JsonObject temperatureRangesObject = forecastNode!["TemperatureRanges"]!.AsObject();
        using var stream = new MemoryStream();
        using var writer = new Utf8JsonWriter(stream);
        temperatureRangesObject.WriteTo(writer);
        writer.Flush();
        TemperatureRanges? temperatureRanges = 
            JsonSerializer.Deserialize<TemperatureRanges>(stream.ToArray());
        Console.WriteLine($"Cold.Low={temperatureRanges!["Cold"].Low}, Hot.High={temperatureRanges["Hot"].High}");
        // output:
        //Cold.Low=-10, Hot.High=60

        // Get a subsection and deserialize it into an array.
        JsonArray datesAvailable = forecastNode!["DatesAvailable"]!.AsArray()!;
        Console.WriteLine($"DatesAvailable[0]={datesAvailable[0]}");
        // output:
        //DatesAvailable[0]=8/1/2019 12:00:00 AM
    }
}
```
### JsonNode average grade example

The following example selects a JSON array that has integer values and calculates an average value:

```csharp
﻿using System.Text.Json.Nodes;

namespace JsonNodeAverageGradeExample;

public class Program
{
    public static void Main()
    {
        string jsonString = """
            {
              "Class Name": "Science",
              "Teacher\u0027s Name": "Jane",
              "Semester": "2019-01-01",
              "Students": [
                {
                  "Name": "John",
                  "Grade": 94.3
                },
                {
                  "Name": "James",
                  "Grade": 81.0
                },
                {
                  "Name": "Julia",
                  "Grade": 91.9
                },
                {
                  "Name": "Jessica",
                  "Grade": 72.4
                },
                {
                  "Name": "Johnathan"
                }
              ],
              "Final": true
            }
            """;
        double sum = 0;
        JsonNode document = JsonNode.Parse(jsonString)!;

        JsonArray studentsArray = document["Students"]!.AsArray();

        int count = studentsArray.Count;
        foreach (JsonNode? student in studentsArray)
        {
            if (student?["Grade"] is JsonNode gradeNode)
            {
                sum += (double)gradeNode;
            }
            else
            {
                sum += 70;
            }
        }

        double average = sum / count;
        Console.WriteLine($"Average grade : {average}");
    }
}
// output:
//Average grade : 81.92
```
The preceding code:

* Calculates an average grade for objects in a `Students` array that have a `Grade` property.
* Assigns a default grade of 70 for students who don't have a grade.
* Gets the number of students from the `Count` property of `JsonArray`.

### `JsonNode` with `JsonSerializerOptions`

You can use `JsonSerializer` to serialize and deserialize an instance of `JsonNode`. However, if you use an overload that takes `JsonSerializerOptions`, the options instance is only used to get custom converters. Other features of the options instance are not used. For example, if you set `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition*` to `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull` and call `JsonSerializer` with an overload that takes `JsonSerializerOptions`, null properties won't be ignored.

The same limitation applies to the `JsonNode` methods that take a `JsonSerializerOptions` parameter: `System.Text.Json.Nodes.JsonNode.WriteTo(System.Text.Json.Utf8JsonWriter,System.Text.Json.JsonSerializerOptions)` and `System.Text.Json.Nodes.JsonNode.ToJsonString(System.Text.Json.JsonSerializerOptions)`. These APIs use `JsonSerializerOptions` only to get custom converters.

The following example illustrates the result of using methods that take a `JsonSerializerOptions` parameter and serialize a `JsonNode` instance:

```csharp
﻿using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace JsonNodeWithJsonSerializerOptions;

public class Program
{
    public static void Main()
    {
        Person person = new() { Name = "Nancy" };

        // Default serialization - Address property included with null token.
        // Output: {"Name":"Nancy","Address":null}
        string personJsonWithNull = JsonSerializer.Serialize(person);
        Console.WriteLine(personJsonWithNull);

        // Serialize and ignore null properties - null Address property is omitted
        // Output: {"Name":"Nancy"}
        JsonSerializerOptions options = new()
        {
            DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
        };
        string personJsonWithoutNull = JsonSerializer.Serialize(person, options);
        Console.WriteLine(personJsonWithoutNull);

        // Ignore null properties doesn't work when serializing JsonNode instance
        // by using JsonSerializer.
        // Output: {"Name":"Nancy","Address":null}
        JsonNode? personJsonNode = JsonSerializer.Deserialize<JsonNode>(personJsonWithNull);
        personJsonWithNull = JsonSerializer.Serialize(personJsonNode, options);
        Console.WriteLine(personJsonWithNull);

        // Ignore null properties doesn't work when serializing JsonNode instance
        // by using JsonNode.ToJsonString method.
        // Output: {"Name":"Nancy","Address":null}
        personJsonWithNull = personJsonNode!.ToJsonString(options);
        Console.WriteLine(personJsonWithNull);

        // Ignore null properties doesn't work when serializing JsonNode instance
        // by using JsonNode.WriteTo method.
        // Output: {"Name":"Nancy","Address":null}
        using var stream = new MemoryStream();
        using var writer = new Utf8JsonWriter(stream);
        personJsonNode!.WriteTo(writer, options);
        writer.Flush();
        personJsonWithNull = Encoding.UTF8.GetString(stream.ToArray());
        Console.WriteLine(personJsonWithNull);
    }
}

public class Person
{
    public string? Name { get; set; }
    public string? Address { get; set; }
}
```
If you need features of `JsonSerializerOptions` other than custom converters, use `JsonSerializer` with strongly typed targets (such as the `Person` class in this example) rather than `JsonNode`.
