---
title: "How to write custom converters for JSON serialization - .NET (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/converters-how-to.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to write custom converters for JSON serialization - .NET (part 4 of 4)

### Support round trip for `Stack` types

If you deserialize a JSON string into a `Stack` object and then serialize that object, the contents of the stack are in reverse order. This behavior applies to the following types and interfaces, and user-defined types that derive from them:

* `System.Collections.Stack`
* `System.Collections.Generic.Stack`1`
* `System.Collections.Concurrent.ConcurrentStack`1`
* `System.Collections.Immutable.ImmutableStack`1`
* `System.Collections.Immutable.IImmutableStack`1`

To support serialization and deserialization that retains the original order in the stack, a custom converter is required.

The following code shows a custom converter that enables round-tripping to and from `Stack<T>` objects:

```csharp
﻿using System.Diagnostics;
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    public class JsonConverterFactoryForStackOfT : JsonConverterFactory
    {
        public override bool CanConvert(Type typeToConvert)
            => typeToConvert.IsGenericType
            && typeToConvert.GetGenericTypeDefinition() == typeof(Stack<>);

        public override JsonConverter CreateConverter(
            Type typeToConvert, JsonSerializerOptions options)
        {
            Debug.Assert(typeToConvert.IsGenericType &&
                typeToConvert.GetGenericTypeDefinition() == typeof(Stack<>));

            Type elementType = typeToConvert.GetGenericArguments()[0];

            JsonConverter converter = (JsonConverter)Activator.CreateInstance(
                typeof(JsonConverterForStackOfT<>)
                    .MakeGenericType(new Type[] { elementType }),
                BindingFlags.Instance | BindingFlags.Public,
                binder: null,
                args: null,
                culture: null)!;

            return converter;
        }
    }

    public class JsonConverterForStackOfT<T> : JsonConverter<Stack<T>>
    {
        public override Stack<T> Read(
            ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.StartArray)
            {
                throw new JsonException();
            }
            reader.Read();

            var elements = new Stack<T>();

            while (reader.TokenType != JsonTokenType.EndArray)
            {
                elements.Push(JsonSerializer.Deserialize<T>(ref reader, options)!);

                reader.Read();
            }

            return elements;
        }

        public override void Write(
            Utf8JsonWriter writer, Stack<T> value, JsonSerializerOptions options)
        {
            writer.WriteStartArray();

            var reversed = new Stack<T>(value);

            foreach (T item in reversed)
            {
                JsonSerializer.Serialize(writer, item, options);
            }

            writer.WriteEndArray();
        }
    }
}
```
The following code registers the converter:

```csharp
var options = new JsonSerializerOptions();
options.Converters.Add(new JsonConverterFactoryForStackOfT());
```
### Use default system converter

In some scenarios, you might want to use the default system converter in a custom converter. To do that, get the system converter from the `System.Text.Json.JsonSerializerOptions.Default` property, as shown in the following example:

```csharp
public class MyCustomConverter : JsonConverter<int>
{
    private readonly static JsonConverter<int> s_defaultConverter = 
        (JsonConverter<int>)JsonSerializerOptions.Default.GetConverter(typeof(int));

    // Custom serialization logic
    public override void Write(
        Utf8JsonWriter writer, int value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }

    // Fall back to default deserialization logic
    public override int Read(
        ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return s_defaultConverter.Read(ref reader, typeToConvert, options);
    }
}
```
## Handle null values

By default, the serializer handles null values as follows:

* For reference types and `System.Nullable`1` types:

  * It doesn't pass `null` to custom converters on serialization.
  * It doesn't pass `JsonTokenType.Null` to custom converters on deserialization.
  * It returns a `null` instance on deserialization.
  * It writes `null` directly with the writer on serialization.

* For non-nullable value types:

  * It passes `JsonTokenType.Null` to custom converters on deserialization. (If no custom converter is available, a `JsonException` exception is thrown by the internal converter for the type.)

This null-handling behavior is primarily to optimize performance by skipping an extra call to the converter. In addition, it avoids forcing converters for nullable types to check for `null` at the start of every `Read` and `Write` method override.

To enable a custom converter to handle `null` for a reference or value type, override `System.Text.Json.Serialization.JsonConverter`1.HandleNull` to return `true`, as shown in the following example:

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace CustomConverterHandleNull
{
    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }

        [JsonConverter(typeof(DescriptionConverter))]
        public string? Description { get; set; }
    }

    public class DescriptionConverter : JsonConverter<string>
    {
        public override bool HandleNull => true;

        public override string Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options) =>
            reader.GetString() ?? "No description provided.";

        public override void Write(
            Utf8JsonWriter writer,
            string value,
            JsonSerializerOptions options) =>
            writer.WriteStringValue(value);
    }

    public class Program
    {
        public static void Run()
        {
            string json = @"{""x"":1,""y"":2,""Description"":null}";

            Point point = JsonSerializer.Deserialize<Point>(json)!;
            Console.WriteLine($"Description: {point.Description}");
        }
    }
}

// Produces output like the following example:
//
//Description: No description provided.
```
## Preserve references

By default, reference data is only cached for each call to `System.Text.Json.JsonSerializer.Serialize*` or `System.Text.Json.JsonSerializer.Deserialize*`. To persist references from one `Serialize`/`Deserialize` call to another one, root the `System.Text.Json.Serialization.ReferenceResolver` instance in the call site of `Serialize`/`Deserialize`. The following code shows an example for this scenario:

* You write a custom converter for the `Company` type.
* You don't want to manually serialize the `Supervisor` property, which is an `Employee`. You want to delegate that to the serializer and you also want to preserve the references that you have already saved.

Here are the `Employee` and `Company` classes:

```csharp
public class Employee
{
    public string? Name { get; set; }
    public Employee? Manager { get; set; }
    public List<Employee>? DirectReports { get; set; }
    public Company? Company { get; set; }
}

public class Company
{
    public string? Name { get; set; }
    public Employee? Supervisor { get; set; }
}
```
The converter looks like this:

```csharp
class CompanyConverter : JsonConverter<Company>
{
    public override Company Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        throw new NotImplementedException();
    }

    public override void Write(Utf8JsonWriter writer, Company value, JsonSerializerOptions options)
    {
        writer.WriteStartObject();

        writer.WriteString("Name", value.Name);

        writer.WritePropertyName("Supervisor");
        JsonSerializer.Serialize(writer, value.Supervisor, options);

        writer.WriteEndObject();
    }
}
```
A class that derives from `System.Text.Json.Serialization.ReferenceResolver` stores the references in a dictionary:

```csharp
class MyReferenceResolver : ReferenceResolver
{
    private uint _referenceCount;
    private readonly Dictionary<string, object> _referenceIdToObjectMap = new ();
    private readonly Dictionary<object, string> _objectToReferenceIdMap = new (ReferenceEqualityComparer.Instance);

    public override void AddReference(string referenceId, object value)
    {
        if (!_referenceIdToObjectMap.TryAdd(referenceId, value))
        {
            throw new JsonException();
        }
    }

    public override string GetReference(object value, out bool alreadyExists)
    {
        if (_objectToReferenceIdMap.TryGetValue(value, out string? referenceId))
        {
            alreadyExists = true;
        }
        else
        {
            _referenceCount++;
            referenceId = _referenceCount.ToString();
            _objectToReferenceIdMap.Add(value, referenceId);
            alreadyExists = false;
        }

        return referenceId;
    }

    public override object ResolveReference(string referenceId)
    {
        if (!_referenceIdToObjectMap.TryGetValue(referenceId, out object? value))
        {
            throw new JsonException();
        }

        return value;
    }
}
```
A class that derives from `System.Text.Json.Serialization.ReferenceHandler` holds an instance of `MyReferenceResolver` and creates a new instance only when needed (in a method named `Reset` in this example):

```csharp
class MyReferenceHandler : ReferenceHandler
{
    public MyReferenceHandler() => Reset();

    private ReferenceResolver? _rootedResolver;
    public override ReferenceResolver CreateResolver() => _rootedResolver!;
    public void Reset() => _rootedResolver = new MyReferenceResolver();
}
```
When the sample code calls the serializer, it uses a `System.Text.Json.JsonSerializerOptions` instance in which the `System.Text.Json.JsonSerializerOptions.ReferenceHandler` property is set to an instance of `MyReferenceHandler`. When you follow this pattern, be sure to reset the `ReferenceResolver` dictionary when you're finished serializing, to keep it from growing forever.

```csharp
var options = new JsonSerializerOptions();

options.Converters.Add(new CompanyConverter());
var myReferenceHandler = new MyReferenceHandler();
options.ReferenceHandler = myReferenceHandler;
options.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
options.WriteIndented = true;

string str = JsonSerializer.Serialize(tyler, options);

// Reset after serializing to avoid out of bounds memory growth in the resolver.
myReferenceHandler.Reset();
```
The preceding example only does serialization, but a similar approach can be adopted for deserialization.

### ReferenceResolver limitations with custom converters

When you use `System.Text.Json.Serialization.ReferenceHandler.Preserve*`, be aware that reference handling state isn't preserved when the serializer calls into a custom converter. This means that if you have a custom converter for a type that's part of an object graph being serialized or deserialized with reference preservation enabled, the converter and any nested serialization calls won't have access to the current `System.Text.Json.Serialization.ReferenceResolver` instance.

## Other custom converter samples

The Migrate from Newtonsoft.Json to System.Text.Json article contains additional samples of custom converters.

The unit tests folder in the `System.Text.Json.Serialization` source code includes other custom converter samples, such as:

* Int32 converter that converts null to 0 on deserialize
* Int32 converter that allows both string and number values on deserialize
* Enum converter
* List\<T> converter that accepts external data
* Long[] converter that works with a comma-delimited list of numbers

If you need to make a converter that modifies the behavior of an existing built-in converter, you can get the source code of the existing converter to serve as a starting point for customization.

## Additional resources

* Source code for built-in converters
* System.Text.Json overview
* How to serialize and deserialize JSON
