---
title: "What's new in .NET libraries for .NET 10 (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-10/libraries.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 10 (part 2 of 3)

## Collections

- Additional `TryAdd` and `TryGetValue` overloads for `OrderedDictionary<TKey, TValue>`

### Additional `TryAdd` and `TryGetValue` overloads for `OrderedDictionary<TKey, TValue>`

`System.Collections.Generic.OrderedDictionary`2` provides `TryAdd` and `TryGetValue` for addition and retrieval like any other `IDictionary<TKey, TValue>` implementation. However, there are scenarios where you might want to perform more operations, so new overloads are added that return an index to the entry:

- `System.Collections.Generic.OrderedDictionary`2.TryAdd(`0,`1,System.Int32@)`
- `System.Collections.Generic.OrderedDictionary`2.TryGetValue(`0,`1@,System.Int32@)`

This index can then be used with `System.Collections.Generic.OrderedDictionary`2.GetAt*` and `System.Collections.Generic.OrderedDictionary`2.SetAt*` for fast access to the entry. An example usage of the new `TryAdd` overload is to add or update a key-value pair in the ordered dictionary:

```csharp
// Try to add a new key with value 1.
if (!orderedDictionary.TryAdd(key, 1, out int index))
{
    // Key was present, so increment the existing value instead.
    int value = orderedDictionary.GetAt(index).Value;
    orderedDictionary.SetAt(index, value + 1);
}
```
This new API is already used in `System.Text.Json.Nodes.JsonObject` and improves the performance of updating properties by 10-20%.

## Serialization

- Allow specifying ReferenceHandler in `JsonSourceGenerationOptions`
- Option to disallow duplicate JSON properties
- Strict JSON serialization options
- PipeReader support for JSON serializer

### Allow specifying ReferenceHandler in `JsonSourceGenerationOptions`

When you use source generators for JSON serialization, the generated context throws when cycles are serialized or deserialized. Now you can customize this behavior by specifying the `System.Text.Json.Serialization.ReferenceHandler` in the `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute`. Here's an example using `JsonKnownReferenceHandler.Preserve`:

```csharp
public static void MakeSelfRef()
{
    SelfReference selfRef = new SelfReference();
    selfRef.Me = selfRef;

    Console.WriteLine(JsonSerializer.Serialize(selfRef, ContextWithPreserveReference.Default.SelfReference));
    // Output: {"$id":"1","Me":{"$ref":"1"}}
}

[JsonSourceGenerationOptions(ReferenceHandler = JsonKnownReferenceHandler.Preserve)]
[JsonSerializable(typeof(SelfReference))]
internal partial class ContextWithPreserveReference : JsonSerializerContext
{
}

internal class SelfReference
{
    public SelfReference Me { get; set; } = null!;
}
```
### Option to disallow duplicate JSON properties

The JSON specification doesn't specify how to handle duplicate properties when deserializing a JSON payload. This can lead to unexpected results and security vulnerabilities. .NET 10 introduces the `System.Text.Json.JsonSerializerOptions.AllowDuplicateProperties` option to disallow duplicate JSON properties:

```csharp
string json = """{ "Value": 1, "Value": -1 }""";
Console.WriteLine(JsonSerializer.Deserialize<MyRecord>(json).Value); // -1

JsonSerializerOptions options = new() { AllowDuplicateProperties = false };
JsonSerializer.Deserialize<MyRecord>(json, options);                // throws JsonException
JsonSerializer.Deserialize<JsonObject>(json, options);              // throws JsonException
JsonSerializer.Deserialize<Dictionary<string, int>>(json, options); // throws JsonException

JsonDocumentOptions docOptions = new() { AllowDuplicateProperties = false };
JsonDocument.Parse(json, docOptions);   // throws JsonException

record MyRecord(int Value);
```

Duplicates are detected by checking if a value is assigned multiple times during deserialization, so it works as expected with other options like case-sensitivity and naming policy.

### Strict JSON serialization options

The JSON serializer accepts many options to customize serialization and deserialization, but the defaults might be too relaxed for some applications. .NET 10 adds a new `System.Text.Json.JsonSerializerOptions.Strict` preset that follows best practices by including the following options:

- Applies the `System.Text.Json.Serialization.JsonUnmappedMemberHandling.Disallow` policy.
- Disables `System.Text.Json.JsonSerializerOptions.AllowDuplicateProperties`.
- Preserves case sensitive property binding.
- Enables both `System.Text.Json.JsonSerializerOptions.RespectNullableAnnotations` and `System.Text.Json.JsonSerializerOptions.RespectRequiredConstructorParameters` settings.

These options are read-compatible with `System.Text.Json.JsonSerializerOptions.Default` - an object serialized with `System.Text.Json.JsonSerializerOptions.Default` can be deserialized with `System.Text.Json.JsonSerializerOptions.Strict`.

For more information about JSON serialization, see System.Text.Json overview.

### PipeReader support for JSON serializer

`System.Text.Json.JsonSerializer.Deserialize*` now supports `System.IO.Pipelines.PipeReader`, complementing the existing `System.IO.Pipelines.PipeWriter` support. Previously, deserializing from a `PipeReader` required converting it to a `System.IO.Stream`, but the new overloads eliminate that step by integrating `PipeReader` directly into the serializer. As a bonus, not having to convert from what you're already holding can yield some efficiency benefits.

This shows the basic usage:

```csharp
using System;
using System.IO.Pipelines;
using System.Text.Json;
using System.Threading.Tasks;

var pipe = new Pipe();

// Serialize to writer
await JsonSerializer.SerializeAsync(pipe.Writer, new Person("Alice"));
await pipe.Writer.CompleteAsync();

// Deserialize from reader
var result = await JsonSerializer.DeserializeAsync<Person>(pipe.Reader);
await pipe.Reader.CompleteAsync();

Console.WriteLine($"Your name is {result.Name}.");
// Output: Your name is Alice.

record Person(string Name);
```
Here is an example of a producer that produces tokens in chunks and a consumer that receives and displays them:

```csharp
using System;
using System.Collections.Generic;
using System.IO.Pipelines;
using System.Text.Json;
using System.Threading.Tasks;

var pipe = new Pipe();

// Producer writes to the pipe in chunks.
var producerTask = Task.Run(async () =>
{
    async static IAsyncEnumerable<Chunk> GenerateResponse()
    {
        yield return new Chunk("The quick brown fox", DateTime.Now);
        await Task.Delay(500);
        yield return new Chunk(" jumps over", DateTime.Now);
        await Task.Delay(500);
        yield return new Chunk(" the lazy dog.", DateTime.Now);
    }

    await JsonSerializer.SerializeAsync<IAsyncEnumerable<Chunk>>(pipe.Writer, GenerateResponse());
    await pipe.Writer.CompleteAsync();
});

// Consumer reads from the pipe and outputs to console.
var consumerTask = Task.Run(async () =>
{
    var thinkingString = "...";
    var clearThinkingString = new string("\b\b\b");
    var lastTimestamp = DateTime.MinValue;

    // Read response to end.
    Console.Write(thinkingString);
    await foreach (var chunk in JsonSerializer.DeserializeAsyncEnumerable<Chunk>(pipe.Reader))
    {
        Console.Write(clearThinkingString);
        Console.Write(chunk.Message);
        Console.Write(thinkingString);
        lastTimestamp = DateTime.Now;
    }

    Console.Write(clearThinkingString);
    Console.WriteLine($" Last message sent at {lastTimestamp}.");

    await pipe.Reader.CompleteAsync();
});

await producerTask;
await consumerTask;

record Chunk(string Message, DateTime Timestamp);
```
All of this is serialized as JSON in the `System.IO.Pipelines.Pipe` (formatted here for readability):

```json
[
    {
        "Message": "The quick brown fox",
        "Timestamp": "2025-08-01T18:37:27.2930151-07:00"
    },
    {
        "Message": " jumps over",
        "Timestamp": "2025-08-01T18:37:27.8594502-07:00"
    },
    {
        "Message": " the lazy dog.",
        "Timestamp": "2025-08-01T18:37:28.3753669-07:00"
    }
]
```

## System.Numerics

- More left-handed matrix transformation methods
- Tensor enhancements

### More left-handed matrix transformation methods

.NET 10 adds the remaining APIs for creating left-handed transformation matrices for billboard and constrained-billboard matrices. You can use these methods like their existing right-handed counterparts, for example, `System.Numerics.Matrix4x4.CreateBillboard(System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3)`, when using a left-handed coordinate system instead:

- `System.Numerics.Matrix4x4.CreateBillboardLeftHanded(System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3)`
- `System.Numerics.Matrix4x4.CreateConstrainedBillboardLeftHanded(System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3,System.Numerics.Vector3)`

### Tensor enhancements

The `System.Numerics.Tensors` namespace now includes a nongeneric interface, `System.Numerics.Tensors.IReadOnlyTensor`, for operations like accessing `System.Numerics.Tensors.IReadOnlyTensor.Lengths` and `System.Numerics.Tensors.IReadOnlyTensor.Strides`. Slice operations no longer copy data, which improves performance. Additionally, you can access data nongenerically by boxing to `object` when performance isn't critical.

The tensor APIs are now stable and no longer marked as experimental. While the APIs still require referencing the System.Numerics.Tensors NuGet package, they have been thoroughly reviewed and finalized for the .NET 10 release. The types take advantage of C# 14 extension operators to provide arithmetic operations when the underlying type `T` supports the operation. If `T` implements the relevant generic math interfaces, for example, `IAdditionOperators<TSelf, TOther, TResult>` or `INumber<TSelf>`, the operation is supported. For example, `tensor + tensor` is available for a `Tensor<int>`, but isn't available for a `Tensor<bool>`.

## Options validation

- New AOT-safe constructor for `ValidationContext`

### New AOT-safe constructor for `ValidationContext`

The `System.ComponentModel.DataAnnotations.ValidationContext` class, used during options validation, includes a new constructor overload that explicitly accepts the `displayName` parameter:

`System.ComponentModel.DataAnnotations.ValidationContext.#ctor(System.Object,System.String,System.IServiceProvider,System.Collections.Generic.IDictionary{System.Object,System.Object})`

The display name ensures AOT safety and enables its use in native builds without warnings.

## Diagnostics

- Support for telemetry schema URLs in `ActivitySource` and `Meter`
- Out-of-proc trace support for Activity events and links
- Rate-limit trace-sampling support

### Support for telemetry schema URLs in `ActivitySource` and `Meter`

`System.Diagnostics.ActivitySource` and `System.Diagnostics.Metrics.Meter` now support specifying a telemetry schema URL during construction, which aligns with OpenTelemetry specifications. The telemetry schema ensures consistency and compatibility for tracing and metrics data. Additionally, .NET 10 introduces `System.Diagnostics.ActivitySourceOptions`, which simplifies the creation of `System.Diagnostics.ActivitySource` instances with multiple configuration options (including the telemetry schema URL).

The new APIs are:

- `System.Diagnostics.ActivitySource.#ctor(System.Diagnostics.ActivitySourceOptions)`
- `System.Diagnostics.ActivitySource.TelemetrySchemaUrl`
- `System.Diagnostics.Metrics.Meter.TelemetrySchemaUrl`
- `System.Diagnostics.ActivitySourceOptions`

### Out-of-proc trace support for Activity events and links

The `System.Diagnostics.Activity` class enables distributed tracing by tracking the flow of operations across services or components. .NET supports serializing this tracing data out-of-process via the `Microsoft-Diagnostics-DiagnosticSource` event source provider. An `Activity` can include additional metadata such as `System.Diagnostics.ActivityLink` and `System.Diagnostics.ActivityEvent`. .NET 10 adds support for serializing these links and events, so out-of-proc trace data now includes that information. For example:

```txt
Events->"[(TestEvent1,​2025-03-27T23:34:10.6225721+00:00,​[E11:​EV1,​E12:​EV2]),​(TestEvent2,​2025-03-27T23:34:11.6276895+00:00,​[E21:​EV21,​E22:​EV22])]"
Links->"[(19b6e8ea216cb2ba36dd5d957e126d9f,​98f7abcb3418f217,​Recorded,​null,​false,​[alk1:​alv1,​alk2:​alv2]),​(2d409549aadfdbdf5d1892584a5f2ab2,​4f3526086a350f50,​None,​null,​false)]"
```

### Rate-limit trace-sampling support

When distributed tracing data is serialized out-of-process via the `Microsoft-Diagnostics-DiagnosticSource` event source provider, all recorded activities can be emitted, or sampling can be applied based on a trace ratio.

A new sampling option called **Rate Limiting Sampling** restricts the number of *root activities* serialized per second. This helps control data volume more precisely.

Out-of-proc trace data aggregators can enable and configure this sampling by specifying the option in `FilterAndPayloadSpecs`. For example, the following setting limits serialization to 100 root activities per second across all `ActivitySource` instances:

```txt
[AS]*/-ParentRateLimitingSampler(100)
```
