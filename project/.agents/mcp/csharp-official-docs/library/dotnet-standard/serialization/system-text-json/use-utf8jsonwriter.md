---
title: "How to use Utf8JsonWriter in System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/use-utf8jsonwriter.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use Utf8JsonWriter in System.Text.Json

This article shows how to use the `System.Text.Json.Utf8JsonWriter` type for building custom serializers.

`System.Text.Json.Utf8JsonWriter` is a high-performance way to write UTF-8 encoded JSON text from common .NET types like `String`, `Int32`, and `DateTime`. The writer is a low-level type that can be used to build custom serializers. The `System.Text.Json.JsonSerializer.Serialize*` method uses `Utf8JsonWriter` under the covers.

The following example shows how to use the `System.Text.Json.Utf8JsonWriter` class:

```csharp
var options = new JsonWriterOptions
{
    Indented = true
};

using var stream = new MemoryStream();
using var writer = new Utf8JsonWriter(stream, options);

writer.WriteStartObject();
writer.WriteString("date", DateTimeOffset.UtcNow);
writer.WriteNumber("temp", 42);
writer.WriteEndObject();
writer.Flush();

string json = Encoding.UTF8.GetString(stream.ToArray());
Console.WriteLine(json);
```
```vb
Dim options As JsonWriterOptions = New JsonWriterOptions With {
    .Indented = True
}

Dim stream As MemoryStream = New MemoryStream
Dim writer As Utf8JsonWriter = New Utf8JsonWriter(stream, options)

writer.WriteStartObject()
writer.WriteString("date", DateTimeOffset.UtcNow)
writer.WriteNumber("temp", 42)
writer.WriteEndObject()
writer.Flush()

Dim json As String = Encoding.UTF8.GetString(stream.ToArray())
Console.WriteLine(json)
```
## Reuse a writer

Starting in .NET 11, call `System.Text.Json.Utf8JsonWriter.Reset(System.IO.Stream,System.Text.Json.JsonWriterOptions)` or `System.Text.Json.Utf8JsonWriter.Reset(System.Buffers.IBufferWriter{System.Byte},System.Text.Json.JsonWriterOptions)` to reuse a writer. These overloads change the destination and options without allocating another `Utf8JsonWriter`.

Before you reset the writer, finish the current JSON payload and call `System.Text.Json.Utf8JsonWriter.Flush*`. `Reset` clears the writer state and doesn't flush pending output:

```csharp
writer.WriteEndObject();
writer.Flush();

writer.Reset(nextStream, new JsonWriterOptions { Indented = true });
```

```vb
writer.WriteEndObject()
writer.Flush()

writer.Reset(nextStream, New JsonWriterOptions With {.Indented = True})
```

## Write with UTF-8 text

To achieve the best possible performance while using the `Utf8JsonWriter`, write JSON payloads already encoded as UTF-8 text rather than as UTF-16 strings. Use `System.Text.Json.JsonEncodedText` to cache and pre-encode known string property names and values as statics, and pass those to the writer, rather than using UTF-16 string literals. This is faster than caching and using UTF-8 byte arrays.

This approach also works if you need to do custom escaping. `System.Text.Json` doesn't let you disable escaping while writing a string. However, you could pass in your own custom `System.Text.Encodings.Web.JavaScriptEncoder` as an option to the writer, or create your own `JsonEncodedText` that uses your `JavascriptEncoder` to do the escaping, and then write the `JsonEncodedText` instead of the string. For more information, see Customize character encoding.

## Write raw JSON

In some scenarios, you might want to write "raw" JSON to a JSON payload that you're creating with `Utf8JsonWriter`. You can use `System.Text.Json.Utf8JsonWriter.WriteRawValue*` to do that. Here are typical scenarios:

* You have an existing JSON payload that you want to enclose in new JSON.
* You want to format values differently from the default `Utf8JsonWriter` formatting.

  For example, you might want to customize number formatting. By default, System.Text.Json omits the decimal point for whole numbers, writing `1` rather than `1.0`, for example. The rationale is that writing fewer bytes is good for performance. But suppose the consumer of your JSON treats numbers with decimals as doubles, and numbers without decimals as integers. You might want to ensure that the numbers in an array are all recognized as doubles, by writing a decimal point and zero for whole numbers. The following example shows how to do that:

```csharp
﻿using System.Text;
using System.Text.Json;

namespace WriteRawJson;

public class Program
{
    public static void Main()
    {
        JsonWriterOptions writerOptions = new() { Indented = true, };

        using MemoryStream stream = new();
        using Utf8JsonWriter writer = new(stream, writerOptions);

        writer.WriteStartObject();

        writer.WriteStartArray("defaultJsonFormatting");
        foreach (double number in new double[] { 50.4, 51 })
        {
            writer.WriteStartObject();
            writer.WritePropertyName("value");
            writer.WriteNumberValue(number);
            writer.WriteEndObject();
        }
        writer.WriteEndArray();

        writer.WriteStartArray("customJsonFormatting");
        foreach (double result in new double[] { 50.4, 51 })
        {
            writer.WriteStartObject();
            writer.WritePropertyName("value");
            writer.WriteRawValue(
                FormatNumberValue(result), skipInputValidation: true);
            writer.WriteEndObject();
        }
        writer.WriteEndArray();

        writer.WriteEndObject();
        writer.Flush();

        string json = Encoding.UTF8.GetString(stream.ToArray());
        Console.WriteLine(json);
    }
    static string FormatNumberValue(double numberValue)
    {
        return numberValue == Convert.ToInt32(numberValue) ? 
            numberValue.ToString() + ".0" : numberValue.ToString();
    }
}
// output:
//{
//  "defaultJsonFormatting": [
//    {
//      "value": 50.4
//    },
//    {
//      "value": 51
//    }
//  ],
//  "customJsonFormatting": [
//    {
//      "value": 50.4
//    },
//    {
//      "value": 51.0
//    }
//  ]
//}
```
## Customize character escaping

The StringEscapeHandling setting of `JsonTextWriter` offers options to escape all non-ASCII characters **or** HTML characters. By default, `Utf8JsonWriter` escapes all non-ASCII **and** HTML characters. This escaping is done for defense-in-depth security reasons. To specify a different escaping policy, create a `System.Text.Encodings.Web.JavaScriptEncoder` and set `System.Text.Json.JsonWriterOptions.Encoder`. For more information, see Customize character encoding.

## Write null values

To write null values by using `Utf8JsonWriter`, call:

* `System.Text.Json.Utf8JsonWriter.WriteNull*` to write a key-value pair with null as the value.
* `System.Text.Json.Utf8JsonWriter.WriteNullValue*` to write null as an element of a JSON array.

For a string property, if the string is null, `System.Text.Json.Utf8JsonWriter.WriteString*` and `System.Text.Json.Utf8JsonWriter.WriteStringValue*` are equivalent to `WriteNull` and `WriteNullValue`.

## Write Timespan, Uri, or char values

To write `Timespan`, `Uri`, or `char` values, format them as strings (by calling `ToString()`, for example) and call `System.Text.Json.Utf8JsonWriter.WriteStringValue*`.

## See also

* How to use Utf8JsonReader in System.Text.Json
