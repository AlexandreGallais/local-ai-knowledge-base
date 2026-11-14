---
title: "BinaryFormatter migration guide: Choose a serializer"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/binaryformatter-migration-guide/choose-a-serializer.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Choose a serializer

There is no drop-in replacement for BinaryFormatter, but there are several serializers recommended for serializing .NET types. Regardless of which serializer you choose, changes will be needed for integration with the new serializer. During these migrations, it's important to consider the trade-offs between coercing the new serializer to handle existing types with as few changes as possible vs. refactoring types to enable idiomatic serialization with the chosen serializer. Once a serializer is chosen, its documentation should be studied for best practices.

If a binary serialization format is not a requirement, you can consider using JSON or XML serialization formats. These serializers are included in .NET and are officially supported.

1. JSON using System.Text.Json
2. XML using `System.Runtime.Serialization.DataContractSerializer`

If a compact binary representation is important for your scenarios, the following serialization formats and open-source serializers are recommended:

1. MessagePack using MessagePack for C#
2. Protocol Buffers using protobuf-net

Whether you have control to change the API shape of the serialized type will influence your direction and approach to serialization. Migration to these serializers may be more straightforward with the ability to annotate types with new attributes, add new constructors, make types/members public, and change fields to properties. Without that ability, using modern serializers might require implementation of custom converters or resolvers.

| Feature                                        | BinaryFormatter  | System.Text.Json        | DataContractSerializer | MessagePack for C#       | protobuf-net                      |
|------------------------------------------------|------------------|-------------------------|------------------------|--------------------------|-----------------------------------|
| Serialization format                           | binary (NRBF)    | JSON                    | XML                    | binary (MessagePack)     | binary (Protocol Buffers)         |
| Compact representation                         | ✔️              | ❌                      | ❌                    | ✔️                       | ✔️                               |
| Human-readable                                 | ❌️              | ✔️                      | ✔️                    | ❌️                       | ❌️                               |
| Performance                                    | ❌️              | ✔️                      | ❌                    | ✔️                       | ✔️                               |
| `[Serializable]` attribute support             | ✔️              | ❌                      | ✔️                    | ❌                       | ❌                               |
| Serializing public types                       | ✔️              | ✔️                      | ✔️                    | ✔️                       | ✔️                               |
| Serializing non-public types                   | ✔️              | ✔️                      | ✔️                    | ✔️ (resolver required)   | ✔️                               |
| Serializing fields                             | ✔️              | ✔️ (opt in)             | ✔️                    | ✔️ (attribute required)  | ✔️ (attribute required)          |
| Serializing non-public fields                  | ✔️              | ✔️ (resolver required)  | ✔️                    | ✔️ (resolver required)   | ✔️ (attribute required)          |
| Serializing properties                         | ✔️*  | ✔️                      | ✔️                    | ✔️ (attribute required)  | ✔️ (attribute required)          |
| Deserializing readonly members                 | ✔️              | ✔️ (attribute required) | ✔️                    | ✔️                       | ✔️ (parameterless ctor required) |
| Polymorphic type hierarchy                     | ✔️              | ✔️ (attribute required) | ✔️                    | ✔️ (attribute required)  | ✔️ (attribute required)          |
| AOT support                                    | ❌️              | ✔️                      | ❌                    | ✔️                       | ❌ (planned)                     |

## JSON using System.Text.Json

The `System.Text.Json` library is a modern serializer that emphasizes security, high performance, and low memory allocation for the JavaScript Object Notation (JSON) format. JSON is human-readable and has broad cross-platform support. While text-based format is not as compact as binary formats, it can be significantly reduced in size through compression.

Serialization excludes non-public and readonly members unless specifically handled through attributes and constructors. System.Text.Json also supports custom serialization and deserialization for more control over how types are converted into JSON and vice versa. System.Text.Json does not support the `[Serializable]` attribute.

Migrate to System.Text.Json (JSON).

## XML using DataContractSerializer

`System.Runtime.Serialization.DataContractSerializer` is used to serialize and deserialize data sent in Windows Communication Foundation (WCF) messages. `System.Runtime.Serialization.DataContractSerializer` is an XML serializer that **fully supports the serialization programming model that was used by the `BinaryFormatter`**, which means it honors the `[Serializable]` attribute and implementation of `System.Runtime.Serialization.ISerializable`. Hence, it's the serializer that requires the least amount of effort to migrate to. It does, however, require the known types to be specified up-front (but most .NET collections and primitive types are on a default allow-list and don't need to be specified).

While `DataContractSerializer` carries those functional benefits when migrating from BinaryFormatter, it is not as modern or performant as the other choices.

Migrate to DataContractSerializer (XML).

> **Warning:**
> Do not confuse `System.Runtime.Serialization.DataContractSerializer` with `System.Runtime.Serialization.NetDataContractSerializer`. `System.Runtime.Serialization.NetDataContractSerializer` is identified as a dangerous serializer.

## Binary using MessagePack

MessagePack is a compact binary serialization format, resulting in smaller message sizes compared to JSON and XML. The open source MessagePack for C# library is highly performant and offers built-in super-fast LZ4 compression for an even smaller data size. It works best when data types are annotated with either `DataContractSerializer` or the library's own attributes. It can be configured to support AOT environments, non-public types and members, and read-only types and members.

Migrate to MessagePack (binary).

## Binary using protobuf-net

The protobuf-net library is a contract-based serializer for .NET that uses the binary Protocol Buffers serialization format. The API follows typical .NET patterns and is broadly comparable to `XmlSerializer` and `DataContractSerializer`. This popular library is also feature-rich and can handle non-public types and fields, but many scenarios do require applying attributes to members.

Migrate to protobuf-net (binary).
