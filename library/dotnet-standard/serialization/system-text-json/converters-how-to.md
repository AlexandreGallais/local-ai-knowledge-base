---
title: "How to write custom converters for JSON serialization - .NET (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/converters-how-to.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to write custom converters for JSON serialization (marshalling) in .NET

This article shows how to create custom converters for the JSON serialization classes that are provided in the `System.Text.Json` namespace. For an introduction to `System.Text.Json`, see How to serialize and deserialize JSON in .NET.

A *converter* is a class that converts an object or a value to and from JSON. The `System.Text.Json` namespace has built-in converters for most primitive types that map to JavaScript primitives. You can write custom converters to override the default behavior of a built-in converter. For example:

- You might want `DateTime` values to be represented by mm/dd/yyyy format. By default, ISO 8601-1:2019 is supported, including the RFC 3339 profile. For more information, see DateTime and DateTimeOffset support in System.Text.Json.
- You might want to serialize a POCO as JSON string, for example, with a `PhoneNumber` type.

You can also write custom converters to customize or extend `System.Text.Json` with new functionality. The following scenarios are covered later in this article:

* Deserialize inferred types to object properties.
* Support polymorphic deserialization.
* Support round trip for `Stack` types.
* Use default system converter.

Visual Basic can't be used to write custom converters but can call converters that are implemented in C# libraries. For more information, see Visual Basic support.

## Custom converter patterns

There are two patterns for creating a custom converter: the basic pattern and the factory pattern. The factory pattern is for converters that handle type `Enum` or open generics. The basic pattern is for non-generic and closed generic types. For example, converters for the following types require the factory pattern:

* `System.Collections.Generic.Dictionary`2`
* `System.Enum`
* `System.Collections.Generic.List`1`

Some examples of types that can be handled by the basic pattern include:

* `Dictionary<int, string>`
* `WeekdaysEnum`
* `List<DateTimeOffset>`
* `System.DateTime`
* `System.Int32`

The basic pattern creates a class that can handle one type. The factory pattern creates a class that determines, at runtime, which specific type is required and dynamically creates the appropriate converter.

Starting in .NET 11, you can also use open generic converters directly with `[JsonConverter]` on a generic type, without the factory pattern. For more information, see Use open generic converters with \[JsonConverter\].

## Sample basic converter

The following sample is a converter that overrides default serialization for an existing data type. The converter uses mm/dd/yyyy format for `DateTimeOffset` properties.

```csharp
﻿using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    public class DateTimeOffsetJsonConverter : JsonConverter<DateTimeOffset>
    {
        public override DateTimeOffset Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options) =>
                DateTimeOffset.ParseExact(reader.GetString()!,
                    "MM/dd/yyyy", CultureInfo.InvariantCulture);

        public override void Write(
            Utf8JsonWriter writer,
            DateTimeOffset dateTimeValue,
            JsonSerializerOptions options) =>
                writer.WriteStringValue(dateTimeValue.ToString(
                    "MM/dd/yyyy", CultureInfo.InvariantCulture));
    }
}
```
## Sample factory pattern converter

The following code shows a custom converter that works with `Dictionary<Enum,TValue>`. The code follows the factory pattern because the first generic type parameter is `Enum` and the second is open. The `CanConvert` method returns `true` only for a `Dictionary` with two generic parameters, the first of which is an `Enum` type. The inner converter gets an existing converter to handle whichever type is provided at runtime for `TValue`.

```csharp
﻿using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    public class DictionaryTKeyEnumTValueConverter : JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert)
        {
            if (!typeToConvert.IsGenericType)
            {
                return false;
            }

            if (typeToConvert.GetGenericTypeDefinition() != typeof(Dictionary<,>))
            {
                return false;
            }

            return typeToConvert.GetGenericArguments()[0].IsEnum;
        }

        public override JsonConverter CreateConverter(
            Type type,
            JsonSerializerOptions options)
        {
            Type[] typeArguments = type.GetGenericArguments();
            Type keyType = typeArguments[0];
            Type valueType = typeArguments[1];

            JsonConverter converter = (JsonConverter)Activator.CreateInstance(
                typeof(DictionaryEnumConverterInner<,>).MakeGenericType(
                    [keyType, valueType]),
                BindingFlags.Instance | BindingFlags.Public,
                binder: null,
                args: [options],
                culture: null)!;

            return converter;
        }

        private class DictionaryEnumConverterInner<TKey, TValue> :
            JsonConverter<Dictionary<TKey, TValue>> where TKey : struct, Enum
        {
            private readonly JsonConverter<TValue> _valueConverter;
            private readonly Type _keyType;
            private readonly Type _valueType;

            public DictionaryEnumConverterInner(JsonSerializerOptions options)
            {
                // For performance, use the existing converter.
                _valueConverter = (JsonConverter<TValue>)options
                    .GetConverter(typeof(TValue));

                // Cache the key and value types.
                _keyType = typeof(TKey);
                _valueType = typeof(TValue);
            }

            public override Dictionary<TKey, TValue> Read(
                ref Utf8JsonReader reader,
                Type typeToConvert,
                JsonSerializerOptions options)
            {
                if (reader.TokenType != JsonTokenType.StartObject)
                {
                    throw new JsonException();
                }

                var dictionary = new Dictionary<TKey, TValue>();

                while (reader.Read())
                {
                    if (reader.TokenType == JsonTokenType.EndObject)
                    {
                        return dictionary;
                    }

                    // Get the key.
                    if (reader.TokenType != JsonTokenType.PropertyName)
                    {
                        throw new JsonException();
                    }

                    string? propertyName = reader.GetString();

                    // For performance, parse with ignoreCase:false first.
                    if (!Enum.TryParse(propertyName, ignoreCase: false, out TKey key) &&
                        !Enum.TryParse(propertyName, ignoreCase: true, out key))
                    {
                        throw new JsonException(
                            $"Unable to convert \"{propertyName}\" to Enum \"{_keyType}\".");
                    }

                    // Get the value.
                    reader.Read();
                    TValue value = _valueConverter.Read(ref reader, _valueType, options)!;

                    // Add to dictionary.
                    dictionary.Add(key, value);
                }

                throw new JsonException();
            }

            public override void Write(
                Utf8JsonWriter writer,
                Dictionary<TKey, TValue> dictionary,
                JsonSerializerOptions options)
            {
                writer.WriteStartObject();

                foreach ((TKey key, TValue value) in dictionary)
                {
                    string propertyName = key.ToString();
                    writer.WritePropertyName
                        (options.PropertyNamingPolicy?.ConvertName(propertyName) ?? propertyName);

                    _valueConverter.Write(writer, value, options);
                }

                writer.WriteEndObject();
            }
        }
    }
}
```
## Steps to follow the basic pattern

The following steps explain how to create a converter by following the basic pattern:

* Create a class that derives from `System.Text.Json.Serialization.JsonConverter`1` where `T` is the type to be serialized and deserialized.
* Override the `Read` method to deserialize the incoming JSON and convert it to type `T`. Use the `System.Text.Json.Utf8JsonReader` that's passed to the method to read the JSON. You don't have to worry about handling partial data, as the serializer passes all the data for the current JSON scope. So it isn't necessary to call `System.Text.Json.Utf8JsonReader.Skip*` or `System.Text.Json.Utf8JsonReader.TrySkip*` or to validate that `System.Text.Json.Utf8JsonReader.Read*` returns `true`.
* Override the `Write` method to serialize the incoming object of type `T`. Use the `System.Text.Json.Utf8JsonWriter` that is passed to the method to write the JSON.
* Override the `CanConvert` method only if necessary. The default implementation returns `true` when the type to convert is of type `T`. Therefore, converters that support only type `T` don't need to override this method. For an example of a converter that does need to override this method, see the polymorphic deserialization section later in this article.

You can refer to the built-in converters source code as reference implementations for writing custom converters.

## Steps to follow the factory pattern

The following steps explain how to create a converter by following the factory pattern:

* Create a class that derives from `System.Text.Json.Serialization.JsonConverterFactory`.
* Override the `CanConvert` method to return `true` when the type to convert is one that the converter can handle. For example, if the converter is for `List<T>`, it might only handle `List<int>`, `List<string>`, and `List<DateTime>`.
* Override the `CreateConverter` method to return an instance of a converter class that will handle the type-to-convert that is provided at runtime.
* Create the converter class that the `CreateConverter` method instantiates.

The factory pattern is required for open generics in .NET 10 and earlier because the code to convert an object to and from a string isn't the same for all types. A converter for an open generic type (`List<T>`, for example) has to create a converter for a closed generic type (`List<DateTime>`, for example) behind the scenes. Code must be written to handle each closed-generic type that the converter can handle. Starting in .NET 11, you can use open generic converters directly with `[JsonConverter]` for simpler cases. For more information, see Use open generic converters with \[JsonConverter\].

The `Enum` type is similar to an open generic type: a converter for `Enum` has to create a converter for a specific `Enum` (`WeekdaysEnum`, for example) behind the scenes.
