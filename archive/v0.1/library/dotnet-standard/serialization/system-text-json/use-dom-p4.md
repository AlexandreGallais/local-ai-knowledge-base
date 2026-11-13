---
title: "How to use a JSON DOM in System.Text.Json (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/use-dom.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use a JSON DOM in System.Text.Json (part 4 of 4)

## Use `JsonDocument`

The following example shows how to use the `System.Text.Json.JsonDocument` class for random access to data in a JSON string:

```csharp
double sum = 0;
int count = 0;

using (JsonDocument document = JsonDocument.Parse(jsonString))
{
    JsonElement root = document.RootElement;
    JsonElement studentsElement = root.GetProperty("Students");
    foreach (JsonElement student in studentsElement.EnumerateArray())
    {
        if (student.TryGetProperty("Grade", out JsonElement gradeElement))
        {
            sum += gradeElement.GetDouble();
        }
        else
        {
            sum += 70;
        }
        count++;
    }
}

double average = sum / count;
Console.WriteLine($"Average grade : {average}");
```
```vb
Dim sum As Double = 0
Dim count As Integer = 0
Using document As JsonDocument = JsonDocument.Parse(jsonString)
    Dim root As JsonElement = document.RootElement
    Dim studentsElement As JsonElement = root.GetProperty("Students")
    For Each student As JsonElement In studentsElement.EnumerateArray()
        Dim gradeElement As JsonElement = Nothing
        If student.TryGetProperty("Grade", gradeElement) Then
            sum += gradeElement.GetDouble()
        Else
            sum += 70
        End If
        count += 1
    Next
End Using

Dim average As Double = sum / count
Console.WriteLine($"Average grade : {average}")
```
The preceding code:

* Assumes the JSON to analyze is in a string named `jsonString`.
* Calculates an average grade for objects in a `Students` array that have a `Grade` property.
* Assigns a default grade of 70 for students who don't have a grade.
* Creates the `JsonDocument` instance in a `using` statement because `JsonDocument` implements `IDisposable`. After a `JsonDocument` instance is disposed, you lose access to all of its `JsonElement` instances also. To retain access to a `JsonElement` instance, make a copy of it before the parent `JsonDocument` instance is disposed. To make a copy, call `System.Text.Json.JsonElement.Clone*`. For more information, see JsonDocument is IDisposable.

The preceding example code counts students by incrementing a `count` variable with each iteration. An alternative is to call `System.Text.Json.JsonElement.GetArrayLength*`, as shown in the following example:

```csharp
double sum = 0;
int count = 0;

using (JsonDocument document = JsonDocument.Parse(jsonString))
{
    JsonElement root = document.RootElement;
    JsonElement studentsElement = root.GetProperty("Students");

    count = studentsElement.GetArrayLength();

    foreach (JsonElement student in studentsElement.EnumerateArray())
    {
        if (student.TryGetProperty("Grade", out JsonElement gradeElement))
        {
            sum += gradeElement.GetDouble();
        }
        else
        {
            sum += 70;
        }
    }
}

double average = sum / count;
Console.WriteLine($"Average grade : {average}");
```
```vb
Dim sum As Double = 0
Dim count As Integer = 0
Using document As JsonDocument = JsonDocument.Parse(jsonString)
    Dim root As JsonElement = document.RootElement
    Dim studentsElement As JsonElement = root.GetProperty("Students")

    count = studentsElement.GetArrayLength()

    For Each student As JsonElement In studentsElement.EnumerateArray()
        Dim gradeElement As JsonElement = Nothing
        If student.TryGetProperty("Grade", gradeElement) Then
            sum += gradeElement.GetDouble()
        Else
            sum += 70
        End If
    Next
End Using

Dim average As Double = sum / count
Console.WriteLine($"Average grade : {average}")
```
Here's an example of the JSON that this code processes:

```json
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
```
For a similar example that uses `JsonNode` instead of `JsonDocument`, see JsonNode average grade example.

### How to search a JsonDocument and JsonElement for sub-elements

Searches on `JsonElement` require a sequential search of the properties and hence are relatively slow (for example when using `TryGetProperty`). `System.Text.Json` is designed to minimize initial parse time rather than lookup time. Therefore, use the following approaches to optimize performance when searching through a `JsonDocument` object:

* Use the built-in enumerators (`System.Text.Json.JsonElement.EnumerateArray*` and `System.Text.Json.JsonElement.EnumerateObject*`) rather than doing your own indexing or loops.
* Don't do a sequential search on the whole `JsonDocument` through every property by using `RootElement`. Instead, search on nested JSON objects based on the known structure of the JSON data. For example, the preceding code examples look for a `Grade` property in `Student` objects by looping through the `Student` objects and getting the value of `Grade` for each, rather than searching through all `JsonElement` objects looking for `Grade` properties. Doing the latter would result in unnecessary passes over the same data.

### Compare JsonElements

To compare two `JsonElement` objects for equality, including their descendant elements, use the `System.Text.Json.JsonElement.DeepEquals(System.Text.Json.JsonElement,System.Text.Json.JsonElement)` method.

```csharp
JsonElement left = JsonDocument.Parse("10e-3").RootElement;
JsonElement right = JsonDocument.Parse("0.01").RootElement;
bool equal = JsonElement.DeepEquals(left, right);
Console.WriteLine(equal); // True.
```
### Use `JsonDocument` to write JSON

The following example shows how to write JSON from a `System.Text.Json.JsonDocument`:

```csharp
string jsonString = File.ReadAllText(inputFileName);

var writerOptions = new JsonWriterOptions
{
    Indented = true
};

var documentOptions = new JsonDocumentOptions
{
    CommentHandling = JsonCommentHandling.Skip
};

using FileStream fs = File.Create(outputFileName);
using var writer = new Utf8JsonWriter(fs, options: writerOptions);
using JsonDocument document = JsonDocument.Parse(jsonString, documentOptions);

JsonElement root = document.RootElement;

if (root.ValueKind == JsonValueKind.Object)
{
    writer.WriteStartObject();
}
else
{
    return;
}

foreach (JsonProperty property in root.EnumerateObject())
{
    property.WriteTo(writer);
}

writer.WriteEndObject();

writer.Flush();
```
```vb
Dim jsonString As String = File.ReadAllText(inputFileName)

Dim writerOptions As JsonWriterOptions = New JsonWriterOptions With {
    .Indented = True
}

Dim documentOptions As JsonDocumentOptions = New JsonDocumentOptions With {
    .CommentHandling = JsonCommentHandling.Skip
}

Dim fs As FileStream = File.Create(outputFileName)
Dim writer As Utf8JsonWriter = New Utf8JsonWriter(fs, options:=writerOptions)
Dim document As JsonDocument = JsonDocument.Parse(jsonString, documentOptions)

Dim root As JsonElement = document.RootElement

If root.ValueKind = JsonValueKind.[Object] Then
    writer.WriteStartObject()
Else
    Return
End If

For Each [property] As JsonProperty In root.EnumerateObject()
    [property].WriteTo(writer)
Next

writer.WriteEndObject()

writer.Flush()
```
The preceding code:

* Reads a JSON file, loads the data into a `JsonDocument`, and writes formatted (pretty-printed) JSON to a file.
* Uses `System.Text.Json.JsonDocumentOptions` to specify that comments in the input JSON are allowed but ignored.
* When finished, calls `System.Text.Json.Utf8JsonWriter.Flush*` on the writer. An alternative is to let the writer auto-flush when it's disposed.

Here's an example of JSON input to be processed by the example code:

```json
﻿{"Class Name": "Science","Teacher's Name": "Jane","Semester": "2019-01-01","Students": [{"Name": "John","Grade": 94.3},{"Name": "James","Grade": 81.0},{"Name": "Julia","Grade": 91.9},{"Name": "Jessica","Grade": 72.4},{"Name": "Johnathan"}],"Final": true}
```
The result is the following pretty-printed JSON output:

```json
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
```
### JsonDocument is IDisposable

`JsonDocument` builds an in-memory view of the data into a pooled buffer. Therefore the `JsonDocument` type implements `IDisposable` and needs to be used inside a `using` block.

Only return a `JsonDocument` from your API if you want to transfer lifetime ownership and dispose responsibility to the caller. In most scenarios, that isn't necessary. If the caller needs to work with the entire JSON document, return the `System.Text.Json.JsonElement.Clone*` of the `System.Text.Json.JsonDocument.RootElement*`, which is a `System.Text.Json.JsonElement`. If the caller needs to work with a particular element within the JSON document, return the `System.Text.Json.JsonElement.Clone*` of that `System.Text.Json.JsonElement`. If you return the `RootElement` or a sub-element directly without making a `Clone`, the caller won't be able to access the returned `JsonElement` after the `JsonDocument` that owns it is disposed.

Here's an example that requires you to make a `Clone`:

```csharp
public JsonElement LookAndLoad(JsonElement source)
{
    string json = File.ReadAllText(source.GetProperty("fileName").GetString());

    using (JsonDocument doc = JsonDocument.Parse(json))
    {
        return doc.RootElement.Clone();
    }
}
```

The preceding code expects a `JsonElement` that contains a `fileName` property. It opens the JSON file and creates a `JsonDocument`. The method assumes that the caller wants to work with the entire document, so it returns the `Clone` of the `RootElement`.

If you receive a `JsonElement` and are returning a sub-element, it's not necessary to return a `Clone` of the sub-element. The caller is responsible for keeping alive the `JsonDocument` that the passed-in `JsonElement` belongs to. For example:

```csharp
public JsonElement ReturnFileName(JsonElement source)
{
   return source.GetProperty("fileName");
}
```

### `JsonDocument` with `JsonSerializerOptions`

You can use `JsonSerializer` to serialize and deserialize an instance of `JsonDocument`. However, the implementation for reading and writing `JsonDocument` instances by using `JsonSerializer` is a wrapper over the `System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader@)` and `System.Text.Json.JsonDocument.WriteTo(System.Text.Json.Utf8JsonWriter)`. This wrapper does not forward any `JsonSerializerOptions` (serializer features) to `Utf8JsonReader` or `Utf8JsonWriter`. For example, if you set `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition*` to `System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull` and call `JsonSerializer` with an overload that takes `JsonSerializerOptions`, null properties won't be ignored.

The following example illustrates the result of using methods that take a `JsonSerializerOptions` parameter and serialize a `JsonDocument` instance:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace JsonDocumentWithJsonSerializerOptions;

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

        // Ignore null properties doesn't work when serializing JsonDocument instance
        // by using JsonSerializer.
        // Output: {"Name":"Nancy","Address":null}
        JsonDocument? personJsonDocument = JsonSerializer.Deserialize<JsonDocument>(personJsonWithNull);
        personJsonWithNull = JsonSerializer.Serialize(personJsonDocument, options);
        Console.WriteLine(personJsonWithNull);
    }
}
public class Person
{
    public string? Name { get; set; }
    public string? Address { get; set; }
}
```
If you need features of `JsonSerializerOptions`, use `JsonSerializer` with strongly typed targets (such as the `Person` class in this example) rather than `JsonDocument`.

## See also

* System.Text.Json overview
* System.Text.Json API reference
* System.Text.Json.Serialization API reference
