---
title: "What's new in .NET libraries for .NET 9 (part 4 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-9/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 9 (part 4 of 6)

## Regular expressions

- `[GeneratedRegex]` on properties
- `Regex.EnumerateSplits`

### `[GeneratedRegex]` on properties

.NET 7 introduced the `Regex` source generator and corresponding `System.Text.RegularExpressions.GeneratedRegexAttribute` attribute.

The following partial method will be source generated with all the code necessary to implement this `Regex`.

```csharp
[GeneratedRegex(@"\b\w{5}\b")]
private static partial Regex FiveCharWord();
```
C# 13 supports partial _properties_ in addition to partial methods, so starting in .NET 9 you can also use `[GeneratedRegex(...)]` on a property.

The following partial property is the property equivalent of the previous example.

```csharp
[GeneratedRegex(@"\b\w{5}\b")]
private static partial Regex FiveCharWordProperty { get; }
```
### `Regex.EnumerateSplits`

The `System.Text.RegularExpressions.Regex` class provides a `System.Text.RegularExpressions.Regex.Split*` method, similar in concept to the `System.String.Split*` method. With `String.Split`, you supply one or more `char` or `string` separators, and the implementation splits the input text on those separators. With `Regex.Split`, instead of specifying the separator as a `char` or `string`, it's specified as a regular expression pattern.

The following example demonstrates `Regex.Split`.

```csharp
foreach (string s in Regex.Split("Hello, world! How are you?", "[aeiou]"))
{
    Console.WriteLine($"Split: \"{s}\"");
}

// Output, split by all English vowels:
// Split: "H"
// Split: "ll"
// Split: ", w"
// Split: "rld! H"
// Split: "w "
// Split: "r"
// Split: " y"
// Split: ""
// Split: "?"
```
However, `Regex.Split` only accepts a `string` as input and doesn't support input being provided as a `ReadOnlySpan<char>`. Also, it outputs the full set of splits as a `string[]`, which requires allocating both the `string` array to hold the results and a `string` for each split. In .NET 9, the new `System.Text.RegularExpressions.Regex.EnumerateSplits*` method enables performing the same operation, but with a span-based input and without incurring any allocation for the results. It accepts a `ReadOnlySpan<char>` and returns an enumerable of `System.Range` objects that represent the results.

The following example demonstrates `Regex.EnumerateSplits`, taking a `ReadOnlySpan<char>` as input.

```csharp
ReadOnlySpan<char> input = "Hello, world! How are you?";
foreach (Range r in Regex.EnumerateSplits(input, "[aeiou]"))
{
    Console.WriteLine($"Split: \"{input[r]}\"");
}
```
## Serialization (System.Text.Json)

- Indentation options
- Default web options singleton
- JsonSchemaExporter
- Respect nullable annotations
- Require non-optional constructor parameters
- Order JsonObject properties
- Customize enum member names
- Stream multiple JSON documents

### Indentation options

`System.Text.Json.JsonSerializerOptions` includes new properties that let you customize the indentation character and indentation size of written JSON.

```csharp
var options = new JsonSerializerOptions
{
    WriteIndented = true,
    IndentCharacter = '\t',
    IndentSize = 2,
};

string json = JsonSerializer.Serialize(
    new { Value = 1 },
    options
    );
Console.WriteLine(json);
//{
//                "Value": 1
//}
```
### Default web options singleton

If you want to serialize with the default options that ASP.NET Core uses for web apps, use the new `System.Text.Json.JsonSerializerOptions.Web` singleton.

```csharp
string webJson = JsonSerializer.Serialize(
    new { SomeValue = 42 },
    JsonSerializerOptions.Web // Defaults to camelCase naming policy.
    );
Console.WriteLine(webJson);
// {"someValue":42}
```
### JsonSchemaExporter

JSON is frequently used to represent types in method signatures as part of remote procedure–calling schemes. It's used, for example, as part of OpenAPI specifications, or as part of tool calling with AI services like those from OpenAI. Developers can serialize and deserialize .NET types as JSON using `System.Text.Json`. But they also need to be able to get a JSON schema that describes the shape of the .NET type (that is, describes the shape of what would be serialized and what can be deserialized). `System.Text.Json` now provides the `System.Text.Json.Schema.JsonSchemaExporter` type, which supports generating a JSON schema that represents a .NET type.

For more information, see JSON schema exporter.

### Respect nullable annotations

`System.Text.Json` now recognizes nullability annotations of properties and can be configured to enforce those during serialization and deserialization using the `System.Text.Json.JsonSerializerOptions.RespectNullableAnnotations` flag.

The following code shows how to set the option:

```csharp
public static void RunIt()
{
    JsonSerializerOptions options = new() { RespectNullableAnnotations = true };

    // Throws exception: System.Text.Json.JsonException: The property or field
    // 'Title' on type 'Serialization+Book' doesn't allow getting null values.
    // Consider updating its nullability annotation.
    JsonSerializer.Serialize(new Book { Title = null! }, options);

    // Throws exception: System.Text.Json.JsonException: The property or field
    // 'Title' on type 'Serialization+Book' doesn't allow setting null values.
    // Consider updating its nullability annotation.
    JsonSerializer.Deserialize<Book>("""{ "Title" : null }""", options);
}

public class Book
{
    public required string Title { get; set; }
    public string? Author { get; set; }
    public int PublishYear { get; set; }
}
```
For more information, see Respect nullable annotations.

### Require non-optional constructor parameters

Historically, `System.Text.Json` has treated non-optional constructor parameters as optional when using constructor-based deserialization. You can change that behavior using the new `System.Text.Json.JsonSerializerOptions.RespectRequiredConstructorParameters` flag.

The following code shows how to set the option:

```csharp
JsonSerializerOptions options = new() { RespectRequiredConstructorParameters = true };

// Throws exception: System.Text.Json.JsonException: JSON deserialization
// for type 'Serialization+MyPoco' was missing required properties including: 'Value'.
JsonSerializer.Deserialize<MyPoco>("""{}""", options);
```
The `MyPoco` type is defined as follows:

```csharp
record MyPoco(string Value);
```
For more information, see Non-optional constructor parameters.

### Order JsonObject properties

The `System.Text.Json.Nodes.JsonObject` type now exposes ordered dictionary–like APIs that enable explicit property order manipulation.

```csharp
JsonObject jObj = new()
{
    ["key1"] = true,
    ["key3"] = 3
};

Console.WriteLine(jObj is IList<KeyValuePair<string, JsonNode?>>); // True.

// Insert a new key-value pair at the correct position.
int key3Pos = jObj.IndexOf("key3") is int i and >= 0 ? i : 0;
jObj.Insert(key3Pos, "key2", "two");

foreach (KeyValuePair<string, JsonNode?> item in jObj)
{
    Console.WriteLine($"{item.Key}: {item.Value}");
}

// Output:
// key1: true
// key2: two
// key3: 3
```
For more information, see Manipulate property order.

### Customize enum member names

The new `System.Text.Json.Serialization.JsonStringEnumMemberNameAttribute` attribute can be used to customize the names of individual enum members for types that are serialized as strings:

```csharp
JsonSerializer.Serialize(MyEnum.Value1 | MyEnum.Value2); // "Value1, Custom enum value"

[Flags, JsonConverter(typeof(JsonStringEnumConverter))]
enum MyEnum
{
    Value1 = 1,
    [JsonStringEnumMemberName("Custom enum value")]
    Value2 = 2,
}
```

For more information, see Custom enum member names.

### Stream multiple JSON documents

`System.Text.Json.Utf8JsonReader` now supports reading multiple, whitespace-separated JSON documents from a single buffer or stream. By default, the reader throws an exception if it detects any non-whitespace characters that are trailing the first top-level document. You can change this behavior using the `System.Text.Json.JsonReaderOptions.AllowMultipleValues` flag.

For more information, see Read multiple JSON documents.

## Spans

In high-performance code, spans are often used to avoid allocating strings unnecessarily. `System.Span`1` and `System.ReadOnlySpan`1` continue to revolutionize how code is written in .NET, and every release more and more methods are added that operate on spans. .NET 9 includes the following span-related updates:

- File helpers
- `params ReadOnlySpan<T>` overloads
- Enumerate over ReadOnlySpan\<char>.Split() segments

### File helpers

The `System.IO.File` class now has new helpers to easily and directly write `ReadOnlySpan<char>`/`ReadOnlySpan<byte>` and `ReadOnlyMemory<char>`/`ReadOnlyMemory<byte>` to files.

The following code efficiently writes a `ReadOnlySpan<char>` to a file.

```csharp
ReadOnlySpan<char> text = ...;
File.WriteAllText(filePath, text);
```

New `System.MemoryExtensions.StartsWith``1(System.ReadOnlySpan{``0},``0)` and `System.MemoryExtensions.EndsWith``1(System.ReadOnlySpan{``0},``0)` extension methods have also been added for spans, making it easy to test whether a `System.ReadOnlySpan`1` starts or ends with a specific `T` value.

The following code uses these new convenience APIs.

```csharp
ReadOnlySpan<char> text = "some arbitrary text";
return text.StartsWith('"') && text.EndsWith('"'); // false
```
### `params ReadOnlySpan<T>` overloads

C# has always supported marking array parameters as `params`. This keyword enables a simplified calling syntax. For example, the `System.String.Join(System.String,System.String[])` method's second parameter is marked with `params`. You can call this overload with an array or by passing the values individually:

```csharp
string result = string.Join(", ", new string[3] { "a", "b", "c" });
string result = string.Join(", ", "a", "b", "c");
```

Prior to .NET 9, when you pass the values individually, the C# compiler emits code identical to the first call by producing an implicit array around the three arguments.

Starting in C# 13, you can use `params` with any argument that can be constructed via a collection expression, including spans (`System.Span`1` and `System.ReadOnlySpan`1`). That's beneficial for usability and performance. The C# compiler can store the arguments on the stack, wrap a span around them, and pass that off to the method, which avoids the implicit array allocation that would have otherwise resulted.

.NET 9 includes over 60 methods with a `params ReadOnlySpan<T>` parameter. Some are brand new overloads, and some are existing methods that already took a `ReadOnlySpan<T>` but now have that parameter marked with `params`. The net effect is if you upgrade to .NET 9 and recompile your code, you'll see performance improvements without making any code changes. That's because the compiler prefers to bind to span-based overloads than to the array-based overloads.

For example, `String.Join` now includes the following overload, which implements the new pattern: `System.String.Join(System.String,System.ReadOnlySpan{System.String})`

Now, a call like `string.Join(", ", "a", "b", "c")` is made without allocating an array to pass in the `"a"`, `"b"`, and `"c"` arguments.

### Enumerate over ReadOnlySpan\<char>.Split() segments

`string.Split` is a convenient method for quickly partitioning a string with one or more supplied separators. For code focused on performance, however, the allocation profile of `string.Split` can be prohibitive, because it allocates a string for each parsed component and a `string[]` to store them all. It also doesn't work with spans, so if you have a `ReadOnlySpan<char>`, you're forced to allocate yet another string when you convert it to a string to be able to call `string.Split` on it.

In .NET 8, a set of `Split` and `SplitAny` methods were introduced for `ReadOnlySpan<char>`. Rather than returning a new `string[]`, these methods accept a destination `Span<Range>` into which the bounding indices for each component are written. This makes the operation fully allocation-free. These methods are appropriate to use when the number of ranges is both known and small.

In .NET 9, new overloads of `Split` and `SplitAny` have been added to allow incrementally parsing a `ReadOnlySpan<T>` with an _a priori_ unknown number of segments. The new methods enable enumerating through each segment, which is similarly represented as a `Range` that can be used to slice into the original span.

```csharp
public static bool ListContainsItem(ReadOnlySpan<char> span, string item)
{
    foreach (Range segment in span.Split(','))
    {
        if (span[segment].SequenceEquals(item))
        {
            return true;
        }
    }

    return false;
}
```

## System.Formats

The position or offset of the data in the enclosing stream for a `System.Formats.Tar.TarEntry` object is now a public property. `System.Formats.Tar.TarEntry.DataOffset` returns the position in the entry's archive stream where the entry's first data byte is located. The entry's data is encapsulated in a substream that you can access via `System.Formats.Tar.TarEntry.DataStream`, which hides the real position of the data relative to the archive stream. That's enough for most users, but if you need more flexibility and want to know the real starting position of the data in the archive stream, the new `System.Formats.Tar.TarEntry.DataOffset` API makes it easy to support features like concurrent access with very large TAR files.

```csharp
// Create stream for tar ball data in Azure Blob Storage.
BlobClient blobClient = new(connectionString, blobContainerName, blobName);
Stream blobClientStream = await blobClient.OpenReadAsync(options, cancellationToken);

// Create TarReader for the stream and get a TarEntry.
TarReader tarReader = new(blobClientStream);
System.Formats.Tar.TarEntry? tarEntry = await tarReader.GetNextEntryAsync();

if (tarEntry is null)
    return;

// Get position of TarEntry data in blob stream.
long entryOffsetInBlobStream = tarEntry.DataOffset;
long entryLength = tarEntry.Length;

// Create a separate stream.
Stream newBlobClientStream = await blobClient.OpenReadAsync(options, cancellationToken);
newBlobClientStream.Seek(entryOffsetInBlobStream, SeekOrigin.Begin);

// Read tar ball content from separate BlobClient stream.
byte[] bytes = new byte[entryLength];
await newBlobClientStream.ReadExactlyAsync(bytes, 0, (int)entryLength);
```
