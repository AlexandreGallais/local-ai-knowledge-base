---
title: ".NET 7 breaking change: SerializationFormat.Binary is obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/7.0/serializationformat-binary.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# SerializationFormat.Binary is obsolete

`System.Data.SerializationFormat.Binary` is obsolete for `System.Data.DataTable` and `System.Data.DataSet`. Binary serialization relies on `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`, which is insecure. If you use `System.Data.SerializationFormat.Binary` in your code, obsoletion warning SYSLIB0038 will be generated at compile time.

In addition, an `System.ComponentModel.InvalidEnumArgumentException` is thrown at runtime if you:

- Set `System.Data.DataSet.RemotingFormat` or `System.Data.DataTable.RemotingFormat` to `System.Data.SerializationFormat.Binary`.
- Call one of the deserialization constructors for `System.Data.DataTable` or `System.Data.DataSet` with binary data.

## Previous behavior

Previously, `System.Data.DataTable` and `System.Data.DataSet` could be serialized and deserialized with their `System.Data.DataTable.RemotingFormat` property set to `System.Data.SerializationFormat.Binary`, which used `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter` under the hood.

## New behavior

Starting in .NET 7, if you attempt to serialize or deserialize `System.Data.DataTable` and `System.Data.DataSet` with their `System.Data.DataTable.RemotingFormat` property set to `System.Data.SerializationFormat.Binary`, an `System.ComponentModel.InvalidEnumArgumentException` is thrown.

## Version introduced

.NET 7

## Type of breaking change

This change can affect source compatibility and binary compatibility.

## Reason for change

`System.Data.SerializationFormat.Binary` is implemented via `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`, which is insecure and being obsoleted across the entire .NET stack.

## Recommended action

If your code uses `System.Data.SerializationFormat.Binary`, switch to using `System.Data.SerializationFormat.Xml` or use another method of serialization.

Otherwise, you can set the `Switch.System.Data.AllowUnsafeSerializationFormatBinary` `System.AppContext` switch. This switch lets you opt in to allowing the use of `System.Data.SerializationFormat.Binary`, so that code can work as before. However, this switch will be removed in .NET 8. For information about setting the switch, see AppContext for library consumers.

## Affected APIs

- `System.Data.SerializationFormat.Binary`
- `System.Data.DataSet.RemotingFormat`
- `System.Data.DataTable.RemotingFormat`
- `System.Data.DataSet.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Data.DataSet.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext,System.Boolean)`
- `System.Data.DataTable.#ctor(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`

## See also

- BinaryFormatter serialization methods are obsolete and prohibited in ASP.NET apps
