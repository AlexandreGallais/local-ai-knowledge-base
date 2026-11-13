---
title: "BinaryFormatter migration guide: Migrate to System.Text.Json (JSON)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/binaryformatter-migration-guide/migrate-to-system-text-json.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Migrate to System.Text.Json (JSON)

The `System.Text.Json` library defaults to emphasizing literal, deterministic behavior and avoids any guessing or interpretation on the caller's behalf. The library is intentionally designed this way for security and performance. While `System.Text.Json` is highly configurable and its features can be used to minimize changes needed to serialized types, it's important to consider the trade-offs between handling existing types with as few changes as possible vs. refactoring types to enable idiomatic and secure serialization.

When migrating from BinaryFormatter to `System.Text.Json`, it's crucial to note the following behaviors and options:

- By default, **fields are not serialized or deserialized** by `System.Text.Json`, but they can be annotated for serialization. Alternatively, `JsonSerializerOptions.IncludeFields` can be cautiously set to `true` to include all public fields for the types being serialized.

  ```csharp
  JsonSerializerOptions options = new()
  {
      IncludeFields = true
  };
  ```

- By default, System.Text.Json **ignores private fields and properties**. You can enable use of a non-public accessor on a property by using the `[JsonInclude]` attribute. Including private fields requires some non-trivial extra work.

- System.Text.Json **cannot deserialize read-only fields** or properties, but the `[JsonConstructor]` attribute can be used to indicate that the specified constructor should be used to create instances of the type on deserialization. The constructor can set the read-only fields and properties.

- To override the default serialization behavior for a specific type, you can write custom converters.

- It supports serialization and deserialization of many collections, but there are limitations. See the supported types documentation for details on which types and collections are supported for serialization and deserialization.

- Under certain conditions, it supports serialization and deserialization of custom generic collections.

- Other types without built-in support are: `DataSet`, `DataTable`, `DBNull`, `TimeZoneInfo`, `Type`, `ValueTuple`. However, you can write a custom converter to support these types.

- It supports polymorphic type hierarchy serialization and deserialization where the types have been explicitly opted in via the `[JsonDerivedType]` attribute or custom converter. Open inheritance hierarchies are not supported, and round-tripping with polymorphism requires type discriminator identifiers for all known derived types.

- The `[JsonIgnore]` attribute on a property causes the property to be omitted from the JSON during serialization.

- To preserve references and handle circular references in `System.Text.Json`, set `JsonSerializerOptions.ReferenceHandler` to `ReferenceHandler.Preserve`.

- Serialization can be extensively customized with custom contracts, unblocking many scenarios while minimizing changes to serialized types.
