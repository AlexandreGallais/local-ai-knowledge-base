---
title: "How to write custom converters for JSON serialization - .NET (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/converters-how-to.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to write custom converters for JSON serialization - .NET (part 2 of 4)

## Use open generic converters with [JsonConverter]

Starting in .NET 11, `System.Text.Json.Serialization.JsonConverterAttribute` supports open generic converter types on generic types when the total type parameter arity matches. This feature lets you apply a `[JsonConverter]` attribute directly using an open generic converter type (for example, `typeof(OptionConverter<>)`) without implementing a `System.Text.Json.Serialization.JsonConverterFactory`. The serializer automatically constructs the closed generic converter.

Unlike the reflection-based factory example above, the source generator resolves the closed converter type at compile time. You can use this pattern with source generation and Native AOT if the converter itself uses AOT-compatible APIs and the generated context provides metadata for the types it handles. The `OptionConverter<T>` example uses `options.GetTypeInfo<T>()` to get metadata for its inner value.

### Define the generic type

Annotate your generic type with `[JsonConverter]`, specifying the open generic converter type. The converter and target type must have matching total generic arity:

```csharp
[JsonConverter(typeof(OptionConverter<>))]
public readonly struct Option<T>
{
    public bool HasValue { get; }
    public T Value { get; }

    public Option(T value)
    {
        HasValue = true;
        Value = value;
    }
}
```
### Implement the converter

Derive your converter from `JsonConverter<T>` using the same generic type parameters as the target type:

```csharp
public sealed class OptionConverter<T> : JsonConverter<Option<T>>
{
    public override bool HandleNull => true;

    public override Option<T> Read(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        if (reader.TokenType == JsonTokenType.Null)
        {
            return default;
        }

        T value = JsonSerializer.Deserialize(ref reader, options.GetTypeInfo<T>())!;
        return new Option<T>(value);
    }

    public override void Write(
        Utf8JsonWriter writer, Option<T> value, JsonSerializerOptions options)
    {
        if (!value.HasValue)
        {
            writer.WriteNullValue();
            return;
        }

        JsonSerializer.Serialize(writer, value.Value, options.GetTypeInfo<T>());
    }
}
```
### Serialize and deserialize

Use `Option<T>` values directly—no additional configuration is required:

```csharp
string json = JsonSerializer.Serialize(new Option<int>(42));
Console.WriteLine(json);
// Output: 42

Option<int> option = JsonSerializer.Deserialize<Option<int>>(json);
Console.WriteLine(option.Value);
// Output: 42
```

The converter also works on properties of types that use `Option<T>`:

```csharp
public class UserProfile
{
    public string Name { get; set; } = "";
    public Option<string> Nickname { get; set; }
    public Option<int> Age { get; set; }
}
```
### How it works

When the serializer encounters a type annotated with an open generic converter (such as `[JsonConverter(typeof(OptionConverter<>))]`), it:

1. Detects that the converter type is an open generic type.
1. Verifies that the total number of generic type parameters on the converter matches the target type.
1. Constructs the closed generic converter (for example, `OptionConverter<int>`) using the target type's type arguments.

This automatic construction also works with:

* **Multiple type parameters**: For example, `[JsonConverter(typeof(ResultConverter<,>))]` on `Result<T, TError>`.
* **Nested generic converters**: Converter types that are nested within other generic types.
* **Property-level attributes**: `[JsonConverter(typeof(OptionConverter<>))]` applied to individual properties.

### When to use the factory pattern versus open generic converters

Use open generic converters with `[JsonConverter]` when:

* The converter has the same number of type parameters as the type it converts.
* You want the simplest possible registration with no factory boilerplate.

Continue to use `System.Text.Json.Serialization.JsonConverterFactory` when:

* The converter needs to handle types with varying generic arity (for example, a single factory that creates converters for both `Result<T>` and `Result<T, TError>`).
* You need custom logic in `CanConvert` to determine which types the converter supports.
* You register the converter through `System.Text.Json.JsonSerializerOptions.Converters` instead of the `[JsonConverter]` attribute.

> **Note:**
> At runtime, using an open generic converter on a non-generic type or with mismatched total generic arity throws an `System.InvalidOperationException`. The message identifies the converter and target type.

## The use of `Utf8JsonReader` in the `Read` method

If your converter is converting a JSON object, the `Utf8JsonReader` is positioned on the begin object token when the `Read` method begins. You must then read through all the tokens in that object and exit the method with the reader positioned on **the corresponding end object token**.  If you read beyond the end of the object, or if you stop before reaching the corresponding end token, you get a `JsonException` exception indicating that:

> The converter 'ConverterName' read too much or not enough.

For an example, see the preceding factory pattern sample converter. The `Read` method starts by verifying that the reader is positioned on a start object token. It reads until it finds that it is positioned on the next end object token. It stops on the next end object token <example-value> there are no intervening start object tokens that would indicate an object within the object. The same rule about begin token and end token <example-value> if you are converting an array. For an example, see the `Stack<T>` sample converter later in this article.

## Error handling

The serializer provides special handling for exception types `System.Text.Json.JsonException` and `System.NotSupportedException`.

### JsonException

If you throw a `JsonException` without a message, the serializer creates a message that includes the path to the part of the JSON that caused the error. For example, the statement `throw new JsonException()` produces an error message like the following example:

```output
Unhandled exception. System.Text.Json.JsonException:
The JSON value could not be converted to System.Object.
Path: $.Date | LineNumber: 1 | BytePositionInLine: 37.
```

If you do provide a message (for example, `throw new JsonException("Error occurred")`), the serializer still sets the `System.Text.Json.JsonException.Path`, `System.Text.Json.JsonException.LineNumber`, and `System.Text.Json.JsonException.BytePositionInLine` properties.

### NotSupportedException

If you throw a `NotSupportedException`, you always get the path information in the message. If you provide a message, the path information is appended to it. For example, the statement `throw new NotSupportedException("Error occurred.")` produces an error message like the following example:

```output
Error occurred. The unsupported member type is located on type
'System.Collections.Generic.Dictionary`2[Samples.SummaryWords,System.Int32]'.
Path: $.TemperatureRanges | LineNumber: 4 | BytePositionInLine: 24
```

### When to throw which exception type

When the JSON payload contains tokens that aren't valid for the type being deserialized, throw a `JsonException`.

When you want to disallow certain types, throw a `NotSupportedException`. This exception is what the serializer automatically throws for types that aren't supported. For example, `System.Type` isn't supported for security reasons, so an attempt to deserialize it results in a `NotSupportedException`.

You can throw other exceptions as needed, but they don't automatically include JSON path information.

## Register a custom converter

*Register* a custom converter to make the `Serialize` and `Deserialize` methods use it. Choose one of the following approaches:

* Add an instance of the converter class to the `System.Text.Json.JsonSerializerOptions.Converters` collection.
* Apply the [JsonConverter] attribute to the properties that require the custom converter.
* Apply the [JsonConverter] attribute to a class or a struct that represents a custom value type.

## Registration sample - Converters collection

Here's an example that makes the DateTimeOffsetJsonConverter the default for properties of type `System.DateTimeOffset`:

```csharp
         var serializeOptions = new JsonSerializerOptions
         {
             WriteIndented = true
         };
serializeOptions.Converters.Add(new DateTimeOffsetJsonConverter());
         
         jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions);
```
Suppose you serialize an instance of the following type:

```csharp
public class WeatherForecast
{
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}
```
Here's an example of JSON output that shows the custom converter was used:

```json
{
  "Date": "08/01/2019",
  "TemperatureCelsius": 25,
  "Summary": "Hot"
}
```

The following code uses the same approach to deserialize using the custom `DateTimeOffset` converter:

```csharp
var deserializeOptions = new JsonSerializerOptions();
deserializeOptions.Converters.Add(new DateTimeOffsetJsonConverter());
weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString, deserializeOptions)!;
```
## Registration sample - [JsonConverter] on a property

The following code selects a custom converter for the `Date` property:

```csharp
public class WeatherForecastWithConverterAttribute
{
    [JsonConverter(typeof(DateTimeOffsetJsonConverter))]
    public DateTimeOffset Date { get; set; }
    public int TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}
```
The code to serialize `WeatherForecastWithConverterAttribute` doesn't require the use of `JsonSerializeOptions.Converters`:

```csharp
var serializeOptions = new JsonSerializerOptions
{
    WriteIndented = true
};
jsonString = JsonSerializer.Serialize(weatherForecast, serializeOptions);
```
The code to deserialize also doesn't require the use of `Converters`:

```csharp
weatherForecast = JsonSerializer.Deserialize<WeatherForecastWithConverterAttribute>(jsonString)!;
```
## Registration sample - [JsonConverter] on a type

Here's code that creates a struct and applies the `[JsonConverter]` attribute to it:

```csharp
﻿using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    [JsonConverter(typeof(TemperatureConverter))]
    public struct Temperature
    {
        public Temperature(int degrees, bool celsius)
        {
            Degrees = degrees;
            IsCelsius = celsius;
        }

        public int Degrees { get; }
        public bool IsCelsius { get; }
        public bool IsFahrenheit => !IsCelsius;

        public override string ToString() =>
            $"{Degrees}{(IsCelsius ? "C" : "F")}";

        public static Temperature Parse(string input)
        {
            int degrees = int.Parse(input.Substring(0, input.Length - 1));
            bool celsius = input.Substring(input.Length - 1) == "C";

            return new Temperature(degrees, celsius);
        }
    }
}
```
Here's the custom converter for the preceding struct:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    public class TemperatureConverter : JsonConverter<Temperature>
    {
        public override Temperature Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options) =>
                Temperature.Parse(reader.GetString()!);

        public override void Write(
            Utf8JsonWriter writer,
            Temperature temperature,
            JsonSerializerOptions options) =>
                writer.WriteStringValue(temperature.ToString());
    }
}
```
The `[JsonConverter]` attribute on the struct registers the custom converter as the default for properties of type `Temperature`. The converter is automatically used on the `TemperatureCelsius` property of the following type when you serialize or deserialize it:

```csharp
public class WeatherForecastWithTemperatureStruct
{
    public DateTimeOffset Date { get; set; }
    public Temperature TemperatureCelsius { get; set; }
    public string? Summary { get; set; }
}
```
## Converter registration precedence

During serialization or deserialization, a converter is chosen for each JSON element in the following order, listed from highest priority to lowest:

* `[JsonConverter]` applied to a property.
* A converter added to the `Converters` collection.
* `[JsonConverter]` applied to a custom value type or POCO.

If multiple custom converters for a type are registered in the `Converters` collection, the first converter that returns `true` for `CanConvert` is used.

A built-in converter is chosen only if no applicable custom converter is registered.
