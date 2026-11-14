---
title: "Create Protobuf messages for .NET apps (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/grpc/protobuf.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Create Protobuf messages for .NET apps (part 2 of 2)

## Unstructured and conditional messages

Protobuf is a contract-first messaging format. An app's messages, including its fields and types, must be specified in `.proto` files when the app is built. Protobuf's contract-first design is great at enforcing message content but can limit scenarios where a strict contract isn't required:

* Messages with unknown payloads. For example, a message with a field that could contain any message.
* Conditional messages. For example, a message returned from a gRPC service might be a success result or an error result.
* Dynamic values. For example, a message with a field that contains an unstructured collection of values, similar to JSON.

Protobuf offers language features and types to support these scenarios.

### Any

The `Any` type lets you use messages as embedded types without having their `.proto` definition. To use the `Any` type, import `any.proto`.

```protobuf
import "google/protobuf/any.proto";

message Status {
    string message = 1;
    google.protobuf.Any detail = 2;
}
```

```csharp
// Create a status with a Person message set to detail.
var status = new ErrorStatus();
status.Detail = Any.Pack(new Person { FirstName = "James" });

// Read Person message from detail.
if (status.Detail.Is(Person.Descriptor))
{
    var person = status.Detail.Unpack<Person>();
    // ...
}
```

### Oneof

`oneof` fields are a language feature. The compiler handles the `oneof` keyword when it generates the message class. Using `oneof` to specify a response message that could either return a `Person` or `Error` might look like this:

```protobuf
message Person {
    // ...
}

message Error {
    // ...
}

message ResponseMessage {
  oneof result {
    Error error = 1;
    Person person = 2;
  }
}
```

Fields within the `oneof` set must have unique field numbers in the overall message declaration.

When using `oneof`, the generated C# code includes an enum that specifies which of the fields has been set. You can test the enum to find which field is set. Fields that aren't set return `null` or the default value, rather than throwing an exception.

```csharp
var response = await client.GetPersonAsync(new RequestMessage());

switch (response.ResultCase)
{
    case ResponseMessage.ResultOneofCase.Person:
        HandlePerson(response.Person);
        break;
    case ResponseMessage.ResultOneofCase.Error:
        HandleError(response.Error);
        break;
    default:
        throw new ArgumentException("Unexpected result.");
}
```

### Value

The `Value` type represents a dynamically typed value. It can be either `null`, a number, a string, a boolean, a dictionary of values (`Struct`), or a list of values (`ValueList`). `Value` is a Protobuf Well-Known Type that uses the previously discussed `oneof` feature. To use the `Value` type, import `struct.proto`.

```protobuf
import "google/protobuf/struct.proto";

message Status {
    // ...
    google.protobuf.Value data = 3;
}
```

```csharp
// Create dynamic values.
var status = new Status();
status.Data = Value.ForStruct(new Struct
{
    Fields =
    {
        ["enabled"] = Value.ForBool(true),
        ["metadata"] = Value.ForList(
            Value.ForString("value1"),
            Value.ForString("value2"))
    }
});

// Read dynamic values.
switch (status.Data.KindCase)
{
    case Value.KindOneofCase.StructValue:
        foreach (var field in status.Data.StructValue.Fields)
        {
            // Read struct fields...
        }
        break;
    // ...
}
```

Using `Value` directly can be verbose. An alternative way to use `Value` is with Protobuf's built-in support for mapping messages to JSON. Protobuf's `JsonFormatter` and `JsonWriter` types can be used with any Protobuf message. `Value` is particularly well suited to being converted to and from JSON.

This is the JSON equivalent of the previous code:

```csharp
// Create dynamic values from JSON.
var status = new Status();
status.Data = Value.Parser.ParseJson(@"{
    ""enabled"": true,
    ""metadata"": [ ""value1"", ""value2"" ]
}");

// Convert dynamic values to JSON.
// JSON can be read with a library like System.Text.Json or Newtonsoft.Json
var json = JsonFormatter.Default.Format(status.Data);
var document = JsonDocument.Parse(json);
```

## Related content

* Protobuf language guide
* Versioning gRPC services
