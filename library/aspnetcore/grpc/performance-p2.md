---
title: "Performance best practices with gRPC (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/grpc/performance.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# Performance best practices with gRPC (part 2 of 2)

## Replace unary calls with streaming

gRPC bidirectional streaming can be used to replace unary gRPC calls in high-performance scenarios. Once a bidirectional stream has started, streaming messages back and forth is faster than sending messages with multiple unary gRPC calls. Streamed messages are sent as data on an existing HTTP/2 request and eliminates the overhead of creating a new HTTP/2 request for each unary call.

Example service:

```csharp
public override async Task SayHello(IAsyncStreamReader<HelloRequest> requestStream,
    IServerStreamWriter<HelloReply> responseStream, ServerCallContext context)
{
    await foreach (var request in requestStream.ReadAllAsync())
    {
        var helloReply = new HelloReply { Message = "Hello " + request.Name };

        await responseStream.WriteAsync(helloReply);
    }
}
```

Example client:

```csharp
var client = new Greet.GreeterClient(channel);
using var call = client.SayHello();

Console.WriteLine("Type a name then press enter.");
while (true)
{
    var text = Console.ReadLine();

    // Send and receive messages over the stream
    await call.RequestStream.WriteAsync(new HelloRequest { Name = text });
    await call.ResponseStream.MoveNext();

    Console.WriteLine($"Greeting: {call.ResponseStream.Current.Message}");
}
```

Replacing unary calls with bidirectional streaming for performance reasons is an advanced technique and is not appropriate in many situations.

Using streaming calls is a good choice when:

1. High throughput or low latency is required.
2. gRPC and HTTP/2 are identified as a performance bottleneck.
3. A worker in the client is sending or receiving regular messages with a gRPC service.

Be aware of the additional complexity and limitations of using streaming calls instead of unary:

1. A stream can be interrupted by a service or connection error. Logic is required to restart stream if there is an error.
2. `RequestStream.WriteAsync` is not safe for multi-threading. Only one message can be written to a stream at a time. Sending messages from multiple threads over a single stream requires a producer/consumer queue like `System.Threading.Channels.Channel`1` to marshall messages.
3. A gRPC streaming method is limited to receiving one type of message and sending one type of message. For example, `rpc StreamingCall(stream RequestMessage) returns (stream ResponseMessage)` receives `RequestMessage` and sends `ResponseMessage`. Protobuf's support for unknown or conditional messages using `Any` and `oneof` can work around this limitation.

## Binary payloads

Binary payloads are supported in Protobuf with the `bytes` scalar value type. A generated property in C# uses `ByteString` as the property type.

```protobuf
syntax = "proto3";

message PayloadResponse {
    bytes data = 1;
}  
```

Protobuf is a binary format that efficiently serializes large binary payloads with minimal overhead.  Text based formats like JSON require encoding bytes to base64 and add 33% to the message size.

When working with large `ByteString` payloads there are some best practices to avoid unnecessary copies and allocations that are discussed below.

### Send binary payloads

`ByteString` instances are normally created using `ByteString.CopyFrom(byte[] data)`. This method allocates a new `ByteString` and a new `byte[]`. Data is copied into the new byte array.

Additional allocations and copies can be avoided by using `UnsafeByteOperations.UnsafeWrap(ReadOnlyMemory<byte> bytes)` to create `ByteString` instances.

```csharp
var data = await File.ReadAllBytesAsync(path);

var payload = new PayloadResponse();
payload.Data = UnsafeByteOperations.UnsafeWrap(data);
```

Bytes are not copied with `UnsafeByteOperations.UnsafeWrap` so they must not be modified while the `ByteString` is in use.

`UnsafeByteOperations.UnsafeWrap` requires Google.Protobuf version 3.15.0 or later.

### Read binary payloads

Data can be efficiently read from `ByteString` instances by using `ByteString.Memory` and `ByteString.Span` properties.

```csharp
var byteString = UnsafeByteOperations.UnsafeWrap(new byte[] { 0, 1, 2 });
var data = byteString.Span;

for (var i = 0; i < data.Length; i++)
{
    Console.WriteLine(data[i]);
}
```

These properties allow code to read data directly from a `ByteString` without allocations or copies.

Most .NET APIs have `ReadOnlyMemory<byte>` and `byte[]` overloads, so `ByteString.Memory` is the recommended way to use the underlying data. However, there are circumstances where an app might need to get the data as a byte array. If a byte array is required then the `System.Runtime.InteropServices.MemoryMarshal.TryGetArray*` method can be used to get an array from a `ByteString` without allocating a new copy of the data.

```csharp
var byteString = GetByteString();

ByteArrayContent content;
if (MemoryMarshal.TryGetArray(byteString.Memory, out var segment))
{
    // Success. Use the ByteString's underlying array.
    content = new ByteArrayContent(segment.Array, segment.Offset, segment.Count);
}
else
{
    // TryGetArray didn't succeed. Fall back to creating a copy of the data with ToByteArray.
    content = new ByteArrayContent(byteString.ToByteArray());
}

var httpRequest = new HttpRequestMessage();
httpRequest.Content = content;
```

The preceding code:

* Attempts to get an array from `ByteString.Memory` with `System.Runtime.InteropServices.MemoryMarshal.TryGetArray*`.
* Uses the `ArraySegment<byte>` if it was successfully retrieved. The segment has a reference to the array, offset and count.
* Otherwise, falls back to allocating a new array with `ByteString.ToByteArray()`.

### gRPC services and large binary payloads

gRPC and Protobuf can send and receive large binary payloads. Although binary Protobuf is more efficient than text-based JSON at serializing binary payloads, there are still important performance characteristics to keep in mind when working with large binary payloads.

gRPC is a message-based RPC framework, which means:

* The entire message is loaded into memory before gRPC can send it.
* When the message is received, the entire message is deserialized into memory.

Binary payloads are allocated as a byte array. For example, a 10 MB binary payload allocates a 10 MB byte array. Messages with large binary payloads can allocate byte arrays on the large object heap. Large allocations impact server performance and scalability.

Advice for creating high-performance applications with large binary payloads:

* **Avoid** large binary payloads in gRPC messages. A byte array larger than 85,000 bytes is considered a large object. Keeping below that size avoids allocating on the large object heap.
* **Consider** splitting large binary payloads using gRPC streaming. Binary data is chunked and streamed over multiple messages. For more information on how to stream files, see examples in the grpc-dotnet repository:
  *  gRPC streaming file download.
  *  gRPC streaming file upload.
* **Consider** not using gRPC for large binary data. In ASP.NET Core, web APIs can be used alongside gRPC services. An HTTP endpoint can access the request and response stream body directly:
  * Read the request body in a Minimal API
  * Return stream response in a Minimal API
