---
title: "How to use Utf8JsonReader in System.Text.Json (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/use-utf8jsonreader.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use Utf8JsonReader in System.Text.Json (part 2 of 2)

## Read multiple JSON documents

In .NET 9 and later versions, you can read multiple, white space–separated JSON documents from a single buffer or stream. By default, `Utf8JsonReader` throws an exception if it detects any non-white-space characters that trail the first top-level document. However, you can configure that behavior using the `System.Text.Json.JsonReaderOptions.AllowMultipleValues` flag.

```csharp
JsonReaderOptions options = new() { AllowMultipleValues = true };
Utf8JsonReader reader = new("null {} 1 \r\n [1,2,3]"u8, options);

reader.Read();
Console.WriteLine(reader.TokenType); // Null

reader.Read();
Console.WriteLine(reader.TokenType); // StartObject
reader.Skip();

reader.Read();
Console.WriteLine(reader.TokenType); // Number

reader.Read();
Console.WriteLine(reader.TokenType); // StartArray
reader.Skip();

Console.WriteLine(reader.Read()); // False
```
When `System.Text.Json.JsonReaderOptions.AllowMultipleValues` is set to `true`, you can also read JSON from payloads that contain trailing data that's invalid JSON.

```csharp
JsonReaderOptions options = new() { AllowMultipleValues = true };
Utf8JsonReader reader = new("[1,2,3]    <NotJson/>"u8, options);

reader.Read();
reader.Skip(); // Succeeds.
reader.Read(); // Throws JsonReaderException.
```
To stream multiple top-level values, use the `System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable``1(System.IO.Stream,System.Boolean,System.Text.Json.JsonSerializerOptions,System.Threading.CancellationToken)` or `System.Text.Json.JsonSerializer.DeserializeAsyncEnumerable``1(System.IO.Stream,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0},System.Boolean,System.Threading.CancellationToken)` overload. By default, `DeserializeAsyncEnumerable` attempts to stream elements that are contained in a single, top-level JSON array. Pass `true` for the `topLevelValues` parameter to stream multiple top-level values.

```csharp
ReadOnlySpan<byte> utf8Json = """[0] [0,1] [0,1,1] [0,1,1,2] [0,1,1,2,3]"""u8;
using var stream = new MemoryStream(utf8Json.ToArray());

var items = JsonSerializer.DeserializeAsyncEnumerable<int[]>(stream, topLevelValues: true);
await foreach (int[] item in items)
{
    Console.WriteLine(item.Length);
}

/* This snippet produces the following output:
 * 
 * 1
 * 2
 * 3
 * 4
 * 5
 */
```
## Property name lookups

To look up property names, don't use `System.Text.Json.Utf8JsonReader.ValueSpan*` to do byte-by-byte comparisons by calling `System.MemoryExtensions.SequenceEqual*`. Instead, call `System.Text.Json.Utf8JsonReader.ValueTextEquals*`, because this method unescapes any characters that are escaped in the JSON. Here's an example that shows how to search for a property that's named "name":

```csharp
private static readonly byte[] s_nameUtf8 = Encoding.UTF8.GetBytes("name");
```
```csharp
while (reader.Read())
{
    switch (reader.TokenType)
    {
        case JsonTokenType.StartObject:
            total++;
            break;
        case JsonTokenType.PropertyName:
            if (reader.ValueTextEquals(s_nameUtf8))
            {
                count++;
            }
            break;
    }
}
```
## Read null values into nullable value types

The built-in `System.Text.Json` APIs return only non-nullable value types. For example, `System.Text.Json.Utf8JsonReader.GetBoolean*` returns a `bool`. It throws an exception if it finds `Null` in the JSON. The following examples show two ways to handle nulls, one by returning a nullable value type and one by returning the default value:

```csharp
public bool? ReadAsNullableBoolean()
{
    _reader.Read();
    if (_reader.TokenType == JsonTokenType.Null)
    {
        return null;
    }
    if (_reader.TokenType != JsonTokenType.True && _reader.TokenType != JsonTokenType.False)
    {
        throw new JsonException();
    }
    return _reader.GetBoolean();
}
```

```csharp
public bool ReadAsBoolean(bool defaultValue)
{
    _reader.Read();
    if (_reader.TokenType == JsonTokenType.Null)
    {
        return defaultValue;
    }
    if (_reader.TokenType != JsonTokenType.True && _reader.TokenType != JsonTokenType.False)
    {
        throw new JsonException();
    }
    return _reader.GetBoolean();
}
```

## Skip children of token

Use the `System.Text.Json.Utf8JsonReader.Skip` method to skip the children of the current JSON token. If the token type is `System.Text.Json.JsonTokenType.PropertyName`, the reader moves to the property value. The following code snippet shows an example of using `System.Text.Json.Utf8JsonReader.Skip` to move the reader to the value of a property.

```csharp
var weatherForecast = new WeatherForecast
{
    Date = DateTime.Parse("2019-08-01"),
    TemperatureCelsius = 25,
    Summary = "Hot"
};

byte[] jsonUtf8Bytes = JsonSerializer.SerializeToUtf8Bytes(weatherForecast);

var reader = new Utf8JsonReader(jsonUtf8Bytes);

int temp;
while (reader.Read())
{
    switch (reader.TokenType)
    {
        case JsonTokenType.PropertyName:
            {
                if (reader.ValueTextEquals("TemperatureCelsius"))
                {
                    reader.Skip();
                    temp = reader.GetInt32();

                    Console.WriteLine($"Temperature is {temp} degrees.");
                }
                continue;
            }
        default:
            continue;
    }
}
```
## Consume decoded JSON strings

Starting in .NET 7, you can use the `System.Text.Json.Utf8JsonReader.CopyString*` method instead of `System.Text.Json.Utf8JsonReader.GetString` to consume a decoded JSON string. Unlike `System.Text.Json.Utf8JsonReader.GetString`, which always allocates a new string, `System.Text.Json.Utf8JsonReader.CopyString*` lets you copy the unescaped string to a buffer that you own. The following code snippet shows an example of consuming a UTF-16 string using `System.Text.Json.Utf8JsonReader.CopyString*`.

```csharp
var reader = new Utf8JsonReader( /* jsonReadOnlySpan */ );

int valueLength = reader.HasValueSequence
    ? checked((int)reader.ValueSequence.Length)
    : reader.ValueSpan.Length;

char[] buffer = ArrayPool<char>.Shared.Rent(valueLength);
int charsRead = reader.CopyString(buffer);
ReadOnlySpan<char> source = buffer.AsSpan(0, charsRead);

// Handle the unescaped JSON string.
ParseUnescapedString(source);
ArrayPool<char>.Shared.Return(buffer, clearArray: true);

void ParseUnescapedString(ReadOnlySpan<char> source)
{
    // ...
}
```
## Related APIs

* To deserialize a custom type from a `Utf8JsonReader` instance, call `System.Text.Json.JsonSerializer.Deserialize``1(System.Text.Json.Utf8JsonReader@,System.Text.Json.JsonSerializerOptions)` or `System.Text.Json.JsonSerializer.Deserialize``1(System.Text.Json.Utf8JsonReader@,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0})`. For an example, see Deserialize from UTF-8.

* `System.Text.Json.Nodes.JsonNode` and the classes that derive from it provide the ability to create a mutable DOM. You can convert a `Utf8JsonReader` instance to a `JsonNode` by calling `System.Text.Json.Nodes.JsonNode.Parse(System.Text.Json.Utf8JsonReader@,System.Nullable{System.Text.Json.Nodes.JsonNodeOptions})`. The following code snippet shows an example.

```csharp
﻿using System.Text.Json;
using System.Text.Json.Nodes;

namespace Utf8ReaderToJsonNode
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
            var weatherForecast = new WeatherForecast
            {
                Date = DateTime.Parse("2019-08-01"),
                TemperatureCelsius = 25,
                Summary = "Hot"
            };

            byte[] jsonUtf8Bytes = JsonSerializer.SerializeToUtf8Bytes(weatherForecast);

            var utf8Reader = new Utf8JsonReader(jsonUtf8Bytes);
            JsonNode? node = JsonNode.Parse(ref utf8Reader);
            Console.WriteLine(node);
        }
    }
}
```
* `System.Text.Json.JsonDocument` provides the ability to build a read-only DOM by using `Utf8JsonReader`. Call the `System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader@)` method to parse a `JsonDocument` from a `Utf8JsonReader` instance. You can access the JSON elements that compose the payload via the `System.Text.Json.JsonElement` type. For example code that uses `System.Text.Json.JsonDocument.ParseValue(System.Text.Json.Utf8JsonReader@)`, see RoundtripDataTable.cs and the code snippet in Deserialize inferred types to object properties.

* You can also parse a `Utf8JsonReader` instance to a `System.Text.Json.JsonElement`, which represents a specific JSON value, by calling `System.Text.Json.JsonElement.ParseValue(System.Text.Json.Utf8JsonReader@)`.

## See also

* How to use Utf8JsonWriter in System.Text.Json
