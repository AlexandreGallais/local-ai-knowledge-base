---
title: "How to write custom converters for JSON serialization - .NET (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/converters-how-to.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to write custom converters for JSON serialization - .NET (part 3 of 4)

## Converter samples for common scenarios

The following sections provide converter samples that address some common scenarios that built-in functionality doesn't handle.

* Deserialize inferred types to object properties.
* Support round trip for `Stack` types.
* Use default system converter.

For a sample `System.Data.DataTable` converter, see Supported types.

### Deserialize inferred types to object properties

When deserializing to a property of type `object`, a `JsonElement` object is created. The reason is that the deserializer doesn't know what CLR type to create, and it doesn't try to guess. For example, if a JSON property has "true", the deserializer doesn't infer that the value is a `Boolean`, and if an element has "01/01/2019", the deserializer doesn't infer that it's a `DateTime`.

Type inference can be inaccurate. If the deserializer parses a JSON number that has no decimal point as a `long`, that might result in out-of-range issues if the value was originally serialized as a `ulong` or `BigInteger`. Parsing a number that has a decimal point as a `double` might lose precision if the number was originally serialized as a `decimal`.

For scenarios that require type inference, the following code shows a custom converter for `object` properties. The code converts:

* `true` and `false` to `Boolean`
* Numbers without a decimal to `long`
* Numbers with a decimal to `double`
* Dates to `DateTime`
* Strings to `string`
* Everything else to `JsonElement`

```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace CustomConverterInferredTypesToObject
{
    public class ObjectToInferredTypesConverter : JsonConverter<object>
    {
        public override object Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options) => reader.TokenType switch
            {
                JsonTokenType.True => true,
                JsonTokenType.False => false,
                JsonTokenType.Number when reader.TryGetInt64(out long l) => l,
                JsonTokenType.Number => reader.GetDouble(),
                JsonTokenType.String when reader.TryGetDateTime(out DateTime datetime) => datetime,
                JsonTokenType.String => reader.GetString()!,
                _ => JsonDocument.ParseValue(ref reader).RootElement.Clone()
            };

        public override void Write(
            Utf8JsonWriter writer,
            object objectToWrite,
            JsonSerializerOptions options)
        {
            var runtimeType = objectToWrite.GetType();
            if (runtimeType == typeof(object))
            {
                writer.WriteStartObject();
                writer.WriteEndObject();
                return;
            }

            JsonSerializer.Serialize(writer, objectToWrite, runtimeType, options);
        }
    }

    public class WeatherForecast
    {
        public object? Date { get; set; }
        public object? TemperatureCelsius { get; set; }
        public object? Summary { get; set; }
    }

    public class Program
    {
        public static void Run()
        {
            string jsonString = """
                {
                  "Date": "2019-08-01T00:00:00-07:00",
                  "TemperatureCelsius": 25,
                  "Summary": "Hot"
                }
                """;

            WeatherForecast weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString)!;
            Console.WriteLine($"Type of Date property   no converter = {weatherForecast.Date!.GetType()}");

            var options = new JsonSerializerOptions();
            options.WriteIndented = true;
            options.Converters.Add(new ObjectToInferredTypesConverter());
            weatherForecast = JsonSerializer.Deserialize<WeatherForecast>(jsonString, options)!;
            Console.WriteLine($"Type of Date property with converter = {weatherForecast.Date!.GetType()}");

            Console.WriteLine(JsonSerializer.Serialize(weatherForecast, options));
        }
    }
}

// Produces output like the following example:
//
//Type of Date property   no converter = System.Text.Json.JsonElement
//Type of Date property with converter = System.DateTime
//{
//  "Date": "2019-08-01T00:00:00-07:00",
//  "TemperatureCelsius": 25,
//  "Summary": "Hot"
//}
```
The example shows the converter code and a `WeatherForecast` class with `object` properties. The `Main` method deserializes a JSON string into a `WeatherForecast` instance, first without using the converter, and then using the converter. The console output shows that without the converter, the runtime type for the `Date` property is `JsonElement`; with the converter, the runtime type is `DateTime`.

The unit tests folder in the `System.Text.Json.Serialization` namespace has more examples of custom converters that handle deserialization to `object` properties.

### Support polymorphic deserialization

.NET 7 provides support for both polymorphic serialization and deserialization. However, in previous .NET versions, there was limited polymorphic serialization support and no support for deserialization. If you're using .NET 6 or an earlier version, deserialization requires a custom converter.

Suppose, for example, you have a `Person` abstract base class, with `Employee` and `Customer` derived classes. Polymorphic deserialization means that at design time you can specify `Person` as the deserialization target, and `Customer` and `Employee` objects in the JSON are correctly deserialized at runtime. During deserialization, you have to find clues that identify the required type in the JSON. The kinds of clues available vary with each scenario. For example, a discriminator property might be available or you might have to rely on the presence or absence of a particular property. The current release of `System.Text.Json` doesn't provide attributes to specify how to handle polymorphic deserialization scenarios, so custom converters are required.

The following code shows a base class, two derived classes, and a custom converter for them. The converter uses a discriminator property to do polymorphic deserialization. The type discriminator isn't in the class definitions but is created during serialization and is read during deserialization.

> **Important:**
> The example code requires JSON object name/value pairs to stay in order, which isn't a standard requirement of JSON.

```csharp
public class Person
{
    public string? Name { get; set; }
}

public class Customer : Person
{
    public decimal CreditLimit { get; set; }
}

public class Employee : Person
{
    public string? OfficeNumber { get; set; }
}
```
```csharp
﻿using System.Text.Json;
using System.Text.Json.Serialization;

namespace SystemTextJsonSamples
{
    public class PersonConverterWithTypeDiscriminator : JsonConverter<Person>
    {
        enum TypeDiscriminator
        {
            Customer = 1,
            Employee = 2
        }

        public override bool CanConvert(Type typeToConvert) =>
            typeof(Person).IsAssignableFrom(typeToConvert);

        public override Person Read(
            ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        {
            if (reader.TokenType != JsonTokenType.StartObject)
            {
                throw new JsonException();
            }

            reader.Read();
            if (reader.TokenType != JsonTokenType.PropertyName)
            {
                throw new JsonException();
            }

            string? propertyName = reader.GetString();
            if (propertyName != "TypeDiscriminator")
            {
                throw new JsonException();
            }

            reader.Read();
            if (reader.TokenType != JsonTokenType.Number)
            {
                throw new JsonException();
            }

            TypeDiscriminator typeDiscriminator = (TypeDiscriminator)reader.GetInt32();
            Person person = typeDiscriminator switch
            {
                TypeDiscriminator.Customer => new Customer(),
                TypeDiscriminator.Employee => new Employee(),
                _ => throw new JsonException()
            };

            while (reader.Read())
            {
                if (reader.TokenType == JsonTokenType.EndObject)
                {
                    return person;
                }

                if (reader.TokenType == JsonTokenType.PropertyName)
                {
                    propertyName = reader.GetString();
                    reader.Read();
                    switch (propertyName)
                    {
                        case "CreditLimit":
                            decimal creditLimit = reader.GetDecimal();
                            ((Customer)person).CreditLimit = creditLimit;
                            break;
                        case "OfficeNumber":
                            string? officeNumber = reader.GetString();
                            ((Employee)person).OfficeNumber = officeNumber;
                            break;
                        case "Name":
                            string? name = reader.GetString();
                            person.Name = name;
                            break;
                    }
                }
            }

            throw new JsonException();
        }

        public override void Write(
            Utf8JsonWriter writer, Person person, JsonSerializerOptions options)
        {
            writer.WriteStartObject();

            if (person is Customer customer)
            {
                writer.WriteNumber("TypeDiscriminator", (int)TypeDiscriminator.Customer);
                writer.WriteNumber("CreditLimit", customer.CreditLimit);
            }
            else if (person is Employee employee)
            {
                writer.WriteNumber("TypeDiscriminator", (int)TypeDiscriminator.Employee);
                writer.WriteString("OfficeNumber", employee.OfficeNumber);
            }

            writer.WriteString("Name", person.Name);

            writer.WriteEndObject();
        }
    }
}
```
The following code registers the converter:

```csharp
var serializeOptions = new JsonSerializerOptions();
serializeOptions.Converters.Add(new PersonConverterWithTypeDiscriminator());
```
The converter can deserialize JSON that was created by using the same converter to serialize, for example:

```json
[
  {
    "TypeDiscriminator": 1,
    "CreditLimit": 10000,
    "Name": "John"
  },
  {
    "TypeDiscriminator": 2,
    "OfficeNumber": "555-1234",
    "Name": "Nancy"
  }
]
```

The converter code in the preceding example reads and writes each property manually. An alternative is to call `Deserialize` or `Serialize` to do some of the work. For an example, see this StackOverflow post.

### An alternative way to do polymorphic deserialization

You can call `Deserialize` in the `Read` method:

* Make a clone of the `Utf8JsonReader` instance. Since `Utf8JsonReader` is a struct, this just requires an assignment statement.
* Use the clone to read through the discriminator tokens.
* Call `Deserialize` using the original `Reader` instance once you know the type you need. You can call `Deserialize` because the original `Reader` instance is still positioned to read the begin object token.

A disadvantage of this method is you can't pass in the original options instance that registers the converter to `Deserialize`. Doing so would cause a stack overflow, as explained in Required properties. The following example shows a `Read` method that uses this alternative:

```csharp
public override Person Read(
    ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
{
    Utf8JsonReader readerClone = reader;

    if (readerClone.TokenType != JsonTokenType.StartObject)
    {
        throw new JsonException();
    }

    readerClone.Read();
    if (readerClone.TokenType != JsonTokenType.PropertyName)
    {
        throw new JsonException();
    }

    string? propertyName = readerClone.GetString();
    if (propertyName != "TypeDiscriminator")
    {
        throw new JsonException();
    }

    readerClone.Read();
    if (readerClone.TokenType != JsonTokenType.Number)
    {
        throw new JsonException();
    }

    TypeDiscriminator typeDiscriminator = (TypeDiscriminator)readerClone.GetInt32();
    Person person = typeDiscriminator switch
    {
        TypeDiscriminator.Customer => JsonSerializer.Deserialize<Customer>(ref reader)!,
        TypeDiscriminator.Employee => JsonSerializer.Deserialize<Employee>(ref reader)!,
        _ => throw new JsonException()
    };
    return person;
}
```
