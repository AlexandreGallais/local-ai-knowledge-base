---
title: "Breaking change: .NET 8 obsoletions with custom IDs (part 2 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/8.0/obsolete-apis-with-custom-diagnostics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Breaking change: .NET 8 obsoletions with custom IDs (part 2 of 6)

## Affected APIs

### SYSLIB0011

- `System.Resources.Extensions.PreserializedResourceWriter.AddBinaryFormattedResource(System.String,System.Byte[],System.String)`
- `System.Runtime.Serialization.Formatter`
- `System.Runtime.Serialization.IFormatter`
- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter`

### SYSLIB0048

- `System.Security.Cryptography.RSA.EncryptValue(System.Byte[])`
- `System.Security.Cryptography.RSA.DecryptValue(System.Byte[])`
- `System.Security.Cryptography.RSACryptoServiceProvider.EncryptValue(System.Byte[])`
- `System.Security.Cryptography.RSACryptoServiceProvider.DecryptValue(System.Byte[])`

### SYSLIB0049

- `System.Text.Json.JsonSerializerOptions.AddContext``1`

### SYSLIB0050

- `System.Runtime.Serialization.FormatterConverter`
- `System.Runtime.Serialization.FormatterServices`
- `System.Runtime.Serialization.IFormatterConverter`
- `System.Runtime.Serialization.IObjectReference`
- `System.Runtime.Serialization.ISafeSerializationData`
- `System.Runtime.Serialization.ISerializationSurrogate`
- `System.Runtime.Serialization.ISurrogateSelector`
- `System.Runtime.Serialization.ObjectIDGenerator`
- `System.Runtime.Serialization.ObjectManager`
- `System.Runtime.Serialization.SafeSerializationEventArgs`
- `System.Runtime.Serialization.SerializationObjectManager`
- `System.Runtime.Serialization.StreamingContextStates`
- `System.Runtime.Serialization.SurrogateSelector`
- `System.Runtime.Serialization.Formatters.FormatterAssemblyStyle`
- `System.Runtime.Serialization.Formatters.FormatterTypeStyle`
- `System.Runtime.Serialization.Formatters.IFieldInfo`
- `System.Runtime.Serialization.Formatters.TypeFilterLevel`
- `System.Type.IsSerializable`
- `System.Reflection.FieldAttributes.NotSerialized`
- `System.Reflection.FieldInfo.IsNotSerialized`
- `System.Reflection.TypeAttributes.Serializable`
- `System.Runtime.Serialization.ISerializable.GetObjectData(System.Runtime.Serialization.SerializationInfo,System.Runtime.Serialization.StreamingContext)`
- `System.Runtime.Serialization.SerializationInfo.#ctor(System.Type,System.Runtime.Serialization.IFormatterConverter,System.Boolean)`
- `System.Runtime.Serialization.SerializationInfo.#ctor(System.Type,System.Runtime.Serialization.IFormatterConverter)`
- `System.Runtime.Serialization.StreamingContext.#ctor(System.Runtime.Serialization.StreamingContextStates,System.Object)`
- `System.Runtime.Serialization.StreamingContext.#ctor(System.Runtime.Serialization.StreamingContextStates)`
